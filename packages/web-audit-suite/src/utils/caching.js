// caching.js

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import axios from 'axios';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { calculateSeoScore } from './seoScoring.js';
import { isValidUrl } from './urlUtils.js';

// CACHE_DIR removed in favor of context.options.cacheDir
function generateCacheKey(url) {
  return crypto.createHash('md5').update(url).digest('hex');
}

async function ensureCacheDir(options, context) {
  const cacheDir = options.cacheDir || path.join(process.cwd(), '.cache');
  try {
    if (options.forceDeleteCache) {
      context.logger.debug(`Force delete cache option detected. Attempting to delete cache directory: ${cacheDir}`);
      try {
        await fs.rm(cacheDir, { recursive: true, force: true });
        context.logger.debug('Cache directory deleted successfully');
      } catch (deleteError) {
        context.logger.error(`Error deleting cache directory: ${deleteError.message}`);
        context.logger.debug('Delete error stack:', deleteError.stack);
      }
    }

    await fs.mkdir(cacheDir, { recursive: true });
    context.logger.debug(`Cache directory ensured: ${cacheDir}`);
  } catch (error) {
    context.logger.error('Error managing cache directory:', error.message);
    context.logger.debug('Error stack:', error.stack);
    throw error;
  }
}

/**
 * Check if cache is stale by comparing source Last-Modified with cache timestamp
 * @param {string} url - URL to check
 * @param {string} cacheTimestamp - ISO timestamp when cache was created
 * @param {Object} context - Audit context
 * @returns {Promise<boolean>} True if cache is stale and should be invalidated
 */
async function isCacheStale(url, cacheTimestamp, context) {
  try {
    // Make HEAD request to get Last-Modified header without downloading content
    const response = await axios.head(url, {
      timeout: 5000,
      validateStatus: (status) => status >= 200 && status < 500, // Accept any non-5xx response
    });

    const lastModified = response.headers['last-modified'];
    if (!lastModified) {
      // No Last-Modified header - can't determine staleness, assume fresh
      context.logger.debug(`No Last-Modified header for ${url}, assuming cache is fresh`);
      return false;
    }

    const sourceModifiedDate = new Date(lastModified);
    const cacheDate = new Date(cacheTimestamp);

    // Cache is stale if source was modified after cache was created
    const isStale = sourceModifiedDate > cacheDate;

    if (isStale) {
      context.logger.info(
        `Cache stale for ${url}: source modified ${sourceModifiedDate.toISOString()}, cache created ${cacheDate.toISOString()}`,
      );
    } else {
      context.logger.debug(`Cache fresh for ${url}`);
    }

    return isStale;
  } catch (error) {
    // If HEAD request fails, assume cache is fresh to avoid unnecessary re-fetches
    context.logger.debug(`HEAD request failed for ${url}: ${error.message}, assuming cache is fresh`);
    return false;
  }
}

/**
 * Invalidate (delete) cache files for a given URL
 * @param {string} url - URL to invalidate cache for
 * @param {Object} context - Audit context
 */
async function invalidateCache(url, context) {
  const cacheDir = context.options.cacheDir || path.join(process.cwd(), '.cache');
  const cacheKey = generateCacheKey(url);

  const filesToDelete = [
    path.join(cacheDir, `${cacheKey}.json`),
    path.join(cacheDir, 'served', `${cacheKey}.html`),
    path.join(cacheDir, 'rendered', `${cacheKey}.html`),
    path.join(cacheDir, 'rendered', `${cacheKey}.log`),
  ];

  for (const filePath of filesToDelete) {
    try {
      await fs.unlink(filePath);
      context.logger.debug(`Deleted stale cache file: ${filePath}`);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        context.logger.debug(`Could not delete ${filePath}: ${error.message}`);
      }
    }
  }
}

async function getCachedData(url, context) {
  const cacheDir = context.options.cacheDir || path.join(process.cwd(), '.cache');
  const cacheKey = generateCacheKey(url);
  const cachePath = path.join(cacheDir, `${cacheKey}.json`);
  context.logger.debug(`Attempting to read cache from: ${cachePath}`);
  try {
    const cachedData = await fs.readFile(cachePath, 'utf8');
    context.logger.debug(`Cache hit for ${url}`);
    const parsedData = JSON.parse(cachedData);

    // Ensure cached data has a status code
    if (!parsedData.statusCode) {
      parsedData.statusCode = 200;
    }

    // Validate URLs in cached data
    if (parsedData.pageData && parsedData.pageData.testUrl) {
      if (!isValidUrl(parsedData.pageData.testUrl, null, context)) {
        context.logger.warn(`Invalid URL in cached data: ${parsedData.pageData.testUrl}`);
        return null;
      }
    }

    // Check if cache is stale by comparing with source Last-Modified
    if (parsedData.lastCrawled) {
      const isStale = await isCacheStale(url, parsedData.lastCrawled, context);
      if (isStale) {
        context.logger.info(`Cache invalidated for ${url} - source has been modified`);
        // Delete stale cache files
        await invalidateCache(url, context);
        return null;
      }
    }

    return parsedData;
  } catch (error) {
    if (error.code !== 'ENOENT') {
      context.logger.error(`Error reading cache for ${url}:`, error);
    } else {
      context.logger.info(`Cache miss for ${url}`);
    }
    return null;
  }
}

async function setCachedData(url, data, context) {
  const cacheDir = context.options.cacheDir || path.join(process.cwd(), '.cache');
  const cacheKey = generateCacheKey(url);
  const cachePath = path.join(cacheDir, `${cacheKey}.json`);
  context.logger.debug(`Attempting to write cache to: ${cachePath}`);

  try {
    const jsonString = JSON.stringify(data, (key, value) => (typeof value === 'string' ? value.normalize('NFC') : value), 2);
    await fs.writeFile(cachePath, jsonString, 'utf8');
    context.logger.debug(`Cache written for ${url}`);
  } catch (error) {
    context.logger.error(`Error writing cache for ${url}:`, error);
    throw error;
  }
}

async function fetchDataWithoutPuppeteer(url, context) {
  const cacheDir = context.options.cacheDir || path.join(process.cwd(), '.cache');
  try {
    context.logger.debug(`Fetching data without Puppeteer for ${url}`);
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const extractDate = (selector) => {
      const element = $(selector);
      if (element.length) {
        const dateString = element.attr('content') || element.text();
        const parsedDate = new Date(dateString);
        return Number.isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
      }
      return null;
    };

    const lastModified = extractDate('meta[property="article:modified_time"]')
      || extractDate('meta[property="og:updated_time"]')
      || extractDate('time[itemprop="dateModified"]')
      || response.headers['last-modified']
      || null;

    // Improved link detection
    const links = $('a[href]');
    const internalLinks = links.filter((i, el) => {
      const href = $(el).attr('href');
      return (
        href.startsWith('/') // Relative paths
        || href.startsWith('./') // Relative paths
        || href.startsWith('../') // Relative paths
        || href.startsWith('#') // Anchors
        || href.startsWith(window.location.origin) // Same domain
        || href.startsWith(window.location.hostname) // Same domain without protocol
      );
    }).length;

    const pageData = {
      title: $('title').text(),
      metaDescription: $('meta[name="description"]').attr('content') || '',
      h1: $('h1').first().text(),
      wordCount: $('body').text().trim().split(/\s+/).length,
      hasResponsiveMetaTag: $('meta[name="viewport"]').length > 0,
      images: $('img')
        .map((i, el) => ({
          src: $(el).attr('src'),
          alt: $(el).attr('alt') || '',
        }))
        .get(),
      internalLinks,
      structuredData: $('script[type="application/ld+json"]')
        .map((i, el) => $(el).html())
        .get(),
      openGraphTags: $('meta[property^="og:"]')
        .map((i, el) => ({
          [$(el).attr('property')]: $(el).attr('content'),
        }))
        .get(),
      twitterTags: $('meta[name^="twitter:"]')
        .map((i, el) => ({
          [$(el).attr('name')]: $(el).attr('content'),
        }))
        .get(),
      h1Count: $('h1').length,
      h2Count: $('h2').length,
      h3Count: $('h3').length,
      h4Count: $('h4').length,
      h5Count: $('h5').length,
      h6Count: $('h6').length,
      scriptsCount: $('script').length,
      stylesheetsCount: $('link[rel="stylesheet"]').length,
      htmlLang: $('html').attr('lang'),
      canonicalUrl: $('link[rel="canonical"]').attr('href'),
      formsCount: $('form').length,
      tablesCount: $('table').length,
      pageSize: html.length,
      lastModified,
      testUrl: url,
    };

    const data = {
      html,
      jsErrors: [],
      statusCode: response.status,
      headers: response.headers,
      pageData,
      seoScore: calculateSeoScore({
        ...pageData,
        testUrl: url,
        jsErrors: [],
      }, context), // Pass context to calculateSeoScore if needed, or if it doesn't need it yet, we might need to update seoScoring.js next.
      lastCrawled: new Date().toISOString(),
    };

    // Save served HTML to .cache/served
    try {
      const cacheKey = generateCacheKey(url);
      const servedPath = path.join(cacheDir, 'served', `${cacheKey}.html`);
      // Ensure served directory exists
      await fs.mkdir(path.dirname(servedPath), { recursive: true });
      await fs.writeFile(servedPath, html, 'utf8');
      context.logger.debug(`Served HTML saved to: ${servedPath}`);
    } catch (error) {
      context.logger.error(`Error saving served HTML for ${url}:`, error);
    }

    context.logger.debug(`Successfully fetched, scored, and analyzed ${url} without Puppeteer`);
    return data;
  } catch (error) {
    context.logger.error(`Error fetching data without Puppeteer for ${url}:`, error);
    throw error;
  }
}

async function getOrRenderData(url, context, options = {}) {
  const { noPuppeteer = false, cacheOnly = false, cache = true } = options;
  // If cache is false (from --no-cache), then noCache should be true
  const noCache = options.noCache || !cache;

  context.logger.debug(`getOrRenderData called for ${url} with options: ${JSON.stringify(options)}`);

  if (!noCache) {
    const cachedData = await getCachedData(url, context);
    if (cachedData) {
      cachedData.contentFreshness = analyzeContentFreshness(cachedData);
      context.logger.debug(`Returning cached data for ${url}`);
      return cachedData;
    }
  }

  if (cacheOnly) {
    context.logger.warn(`No cached data available for ${url} and cache-only mode is enabled. Skipping this URL.`);
    return { html: null, statusCode: null };
  }

  context.logger.debug(`No cache found or cache disabled, ${noPuppeteer ? 'fetching' : 'rendering'} data for ${url}`);
  try {
    const newData = noPuppeteer
      ? await fetchDataWithoutPuppeteer(url, context)
      : await renderAndCacheData(url, context);

    newData.contentFreshness = analyzeContentFreshness(newData);

    if (!noCache) {
      await setCachedData(url, newData, context);
    }

    return newData;
  } catch (error) {
    context.logger.error(`Error ${noPuppeteer ? 'fetching' : 'rendering'} data for ${url}:`, error);
    return { html: null, statusCode: null, error: error.message };
  }
}

async function renderAndCacheData(url, context) {
  const cacheDir = context.options.cacheDir || path.join(process.cwd(), '.cache');
  context.logger.debug(`Rendering and caching data for ${url}`);
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Set viewport to iPad dimensions
    await page.setViewport({
      width: 1024,
      height: 768,
      deviceScaleFactor: 2,
    });

    const jsErrors = [];
    const consoleMessages = [];
    page.on('console', (msg) => {
      const timestamp = new Date().toISOString();
      const type = msg.type();
      const text = msg.text();

      // Capture all console messages with timestamp and type
      consoleMessages.push(`[${timestamp}] [${type.toUpperCase()}] ${text}`);

      // Also track errors separately for backward compatibility
      if (type === 'error') {
        jsErrors.push(text);
      }
    });

    let headers = {};
    page.on('response', (response) => {
      if (response.url() === url) {
        headers = response.headers();
      }
    });

    const response = await page.goto(url, { waitUntil: 'networkidle0' });
    const servedHtml = await response.text();
    const html = await page.content();
    const statusCode = response.status();

    const pageData = await page.evaluate(() => {
      const links = document.querySelectorAll('a[href]');
      const internalLinks = Array.from(links).filter((el) => {
        const href = el.getAttribute('href');
        return (
          href.startsWith('/') // Relative paths
          || href.startsWith('./') // Relative paths
          || href.startsWith('../') // Relative paths
          || href.startsWith('#') // Anchors
          || href.startsWith(window.location.origin) // Same domain
          || href.startsWith(window.location.hostname) // Same domain without protocol
        );
      }).length;

      // All resources extraction (internal + external)

      // Helper function to determine if URL is valid resource
      const isValidResourceUrl = (resourceUrl) => {
        // eslint-disable-next-line no-script-url
        if (!resourceUrl || resourceUrl.startsWith('#') || resourceUrl.startsWith('javascript:') || resourceUrl.startsWith('data:')) {
          return false;
        }
        return true;
      };

      // Helper to get absolute URL
      const getAbsoluteUrl = (relativeUrl) => {
        try {
          return new URL(relativeUrl, window.location.href).href;
        } catch (e) {
          return null;
        }
      };

      const allResources = [];

      // 1. JavaScript files (<script src="">)
      document.querySelectorAll('script[src]').forEach((el) => {
        const src = el.getAttribute('src');
        if (isValidResourceUrl(src)) {
          allResources.push({
            url: getAbsoluteUrl(src),
            type: 'javascript',
          });
        }
      });

      // 2. CSS files (<link rel="stylesheet">)
      document.querySelectorAll('link[rel="stylesheet"]').forEach((el) => {
        const href = el.getAttribute('href');
        if (isValidResourceUrl(href)) {
          allResources.push({
            url: getAbsoluteUrl(href),
            type: 'css',
          });
        }
      });

      // 3. Images - all formats
      // <img> tags
      document.querySelectorAll('img[src]').forEach((el) => {
        const src = el.getAttribute('src');
        if (isValidResourceUrl(src)) {
          allResources.push({
            url: getAbsoluteUrl(src),
            type: 'image',
          });
        }
      });

      // <picture><source> tags
      document.querySelectorAll('picture source[srcset]').forEach((el) => {
        const srcset = el.getAttribute('srcset');
        if (srcset) {
          // Parse srcset which can be: "url1 1x, url2 2x" or "url1 100w, url2 200w"
          srcset.split(',').forEach((entry) => {
            const resourceUrl = entry.trim().split(/\s+/)[0];
            if (isValidResourceUrl(resourceUrl)) {
              allResources.push({
                url: getAbsoluteUrl(resourceUrl),
                type: 'image',
              });
            }
          });
        }
      });

      // SVG images in <object> and <embed>
      document.querySelectorAll('object[data], embed[src]').forEach((el) => {
        const src = el.getAttribute('data') || el.getAttribute('src');
        if (src && isValidResourceUrl(src)) {
          const absUrl = getAbsoluteUrl(src);
          if (absUrl && (absUrl.endsWith('.svg') || el.type === 'image/svg+xml')) {
            allResources.push({
              url: absUrl,
              type: 'image',
            });
          }
        }
      });

      // 4. Fonts (from CSS)
      try {
        Array.from(document.styleSheets).forEach((sheet) => {
          try {
            Array.from(sheet.cssRules || []).forEach((rule) => {
              if (rule.cssText && rule.cssText.includes('@font-face')) {
                const urlMatches = rule.cssText.match(/url\(['"]?([^'"()]+)['"]?\)/g);
                if (urlMatches) {
                  urlMatches.forEach((match) => {
                    const resourceUrl = match.replace(/url\(['"]?|['"]?\)/g, '');
                    if (isValidResourceUrl(resourceUrl)) {
                      allResources.push({
                        url: getAbsoluteUrl(resourceUrl),
                        type: 'font',
                      });
                    }
                  });
                }
              }
            });
          } catch (e) {
            // CORS-blocked stylesheets will throw - skip them
          }
        });
      } catch (e) {
        // Stylesheet access error
      }

      // 5. Videos
      document.querySelectorAll('video source[src], video[src]').forEach((el) => {
        const src = el.getAttribute('src');
        if (isValidResourceUrl(src)) {
          allResources.push({
            url: getAbsoluteUrl(src),
            type: 'video',
          });
        }
      });

      // <video><source srcset>
      document.querySelectorAll('video source[srcset]').forEach((el) => {
        const srcset = el.getAttribute('srcset');
        if (srcset) {
          srcset.split(',').forEach((entry) => {
            const resourceUrl = entry.trim().split(/\s+/)[0];
            if (isValidResourceUrl(resourceUrl)) {
              allResources.push({
                url: getAbsoluteUrl(resourceUrl),
                type: 'video',
              });
            }
          });
        }
      });

      // 6. Iframes
      document.querySelectorAll('iframe[src]').forEach((el) => {
        const src = el.getAttribute('src');
        if (isValidResourceUrl(src)) {
          allResources.push({
            url: getAbsoluteUrl(src),
            type: 'iframe',
          });
        }
      });

      // 7. Audio
      document.querySelectorAll('audio source[src], audio[src]').forEach((el) => {
        const src = el.getAttribute('src');
        if (isValidResourceUrl(src)) {
          allResources.push({
            url: getAbsoluteUrl(src),
            type: 'audio',
          });
        }
      });

      // 8. Background images from inline styles
      document.querySelectorAll('[style*="background"]').forEach((el) => {
        const style = el.getAttribute('style');
        const urlMatches = style.match(/url\(['"]?([^'"()]+)['"]?\)/g);
        if (urlMatches) {
          urlMatches.forEach((match) => {
            const resourceUrl = match.replace(/url\(['"]?|['"]?\)/g, '');
            if (isValidResourceUrl(resourceUrl)) {
              allResources.push({
                url: getAbsoluteUrl(resourceUrl),
                type: 'image',
              });
            }
          });
        }
      });

      // 9. Preload/Prefetch resources
      document.querySelectorAll('link[rel="preload"], link[rel="prefetch"], link[rel="dns-prefetch"], link[rel="preconnect"]').forEach((el) => {
        const href = el.getAttribute('href');
        if (href && isValidResourceUrl(href)) {
          const asType = el.getAttribute('as') || 'other';
          let type = 'other';
          if (asType === 'script') type = 'javascript';
          else if (asType === 'style') type = 'css';
          else if (asType === 'image') type = 'image';
          else if (asType === 'font') type = 'font';
          else if (asType === 'video') type = 'video';
          else if (asType === 'audio') type = 'audio';

          allResources.push({
            url: getAbsoluteUrl(href),
            type,
          });
        }
      });

      // LLM Readability Metrics
      const llmReadability = {
        // Structural elements
        semanticElements: {
          article: document.querySelectorAll('article').length,
          section: document.querySelectorAll('section').length,
          nav: document.querySelectorAll('nav').length,
          header: document.querySelectorAll('header').length,
          footer: document.querySelectorAll('footer').length,
          aside: document.querySelectorAll('aside').length,
          main: document.querySelectorAll('main').length,
        },

        // Heading structure
        headings: {
          h1: document.querySelectorAll('h1').length,
          h2: document.querySelectorAll('h2').length,
          h3: document.querySelectorAll('h3').length,
          h4: document.querySelectorAll('h4').length,
          h5: document.querySelectorAll('h5').length,
          h6: document.querySelectorAll('h6').length,
        },

        // Content structure
        paragraphs: document.querySelectorAll('p').length,
        lists: {
          ul: document.querySelectorAll('ul').length,
          ol: document.querySelectorAll('ol').length,
          total: document.querySelectorAll('ul, ol').length,
        },
        tables: document.querySelectorAll('table').length,

        // Code and pre-formatted content
        codeBlocks: document.querySelectorAll('pre, code').length,

        // Metadata
        hasJsonLd: document.querySelectorAll('script[type="application/ld+json"]').length > 0,
        jsonLdCount: document.querySelectorAll('script[type="application/ld+json"]').length,

        // Schema.org microdata
        hasMicrodata: document.querySelectorAll('[itemscope]').length > 0,
        microdataCount: document.querySelectorAll('[itemscope]').length,

        // OpenGraph
        ogTags: {
          title: document.querySelector('meta[property="og:title"]')?.content || '',
          description: document.querySelector('meta[property="og:description"]')?.content || '',
          image: document.querySelector('meta[property="og:image"]')?.content || '',
          url: document.querySelector('meta[property="og:url"]')?.content || '',
          type: document.querySelector('meta[property="og:type"]')?.content || '',
        },

        // Text content analysis
        bodyText: document.body?.innerText || '',
        bodyTextLength: (document.body?.innerText || '').length,

        // Hidden content detection
        hiddenElements: document.querySelectorAll('[style*="display: none"], [style*="visibility: hidden"], [hidden]').length,

        // Main content detection
        hasMainElement: document.querySelector('main') !== null,
        hasArticleElement: document.querySelector('article') !== null,

        // Content extractability indicators
        totalElements: document.querySelectorAll('*').length,
        textNodes: Array.from(document.body?.childNodes || []).filter((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0).length,
      };

      // Dynamic Content Detection

      // Helper function to determine carousel type
      const determineCarouselType = (carouselEl) => {
        // Informational: product showcases, testimonials, portfolios
        const informationalClasses = ['product', 'testimonial', 'review', 'portfolio', 'gallery'];
        const decorativeClasses = ['hero', 'banner', 'masthead'];

        const className = carouselEl.className.toLowerCase();

        if (informationalClasses.some((cls) => className.includes(cls))) return 'informational';
        if (decorativeClasses.some((cls) => className.includes(cls))) return 'decorative';

        // Default to informational if uncertain (safer assumption)
        return 'informational';
      };

      // Carousel detection with type distinction
      const carousels = Array.from(document.querySelectorAll('[class*="carousel"], [class*="slider"], [class*="swiper"]'));
      const carouselData = carousels.map((el) => ({
        hasDataAttributes: el.hasAttribute('data-current-slide') || el.hasAttribute('data-slide-index'),
        hasAriaLabels: el.querySelector('[aria-label*="slide"]') !== null,
        slideCount: el.querySelectorAll('[class*="slide"]').length,
        hasStaticAlternative: false, // TODO: detect "view all" link
        type: determineCarouselType(el), // 'informational' or 'decorative'
        isHero: el.closest('.hero, [class*="hero"], header') !== null,
      }));

      // Animation detection with library-specific identification
      const animatedElements = Array.from(document.querySelectorAll('[style*="animation"], [class*="animate"]'));
      const hasAnimations = animatedElements.length > 0;
      let hasCSSAnimations = false;
      try {
        hasCSSAnimations = Array.from(document.styleSheets).some((sheet) => {
          try {
            return Array.from(sheet.cssRules).some((rule) => rule.cssText.includes('@keyframes'));
          } catch (e) {
            return false;
          }
        });
      } catch (e) {
        // Stylesheet access error
      }

      // Detect specific animation libraries
      const animationLibraries = {
        typedJs: typeof window.Typed !== 'undefined'
          || document.querySelector('script[src*="typed.js"], script[src*="typed.min.js"]') !== null,
        typeIt: typeof window.TypeIt !== 'undefined'
          || document.querySelector('script[src*="typeit"]') !== null,
        animateCSS: document.querySelector('link[href*="animate.css"]') !== null
          || Array.from(document.querySelectorAll('[class*="animate__"]')).length > 0,
        gsap: typeof window.gsap !== 'undefined'
          || document.querySelector('script[src*="gsap"]') !== null,
        aos: typeof window.AOS !== 'undefined'
          || document.querySelector('[data-aos]') !== null,
      };

      // Autoplay media detection
      const autoplayVideos = Array.from(document.querySelectorAll('video[autoplay]'));
      const autoplayAudios = Array.from(document.querySelectorAll('audio[autoplay]'));
      const autoplayData = {
        videoCount: autoplayVideos.length,
        audioCount: autoplayAudios.length,
        hasControls: autoplayVideos.filter((v) => v.hasAttribute('controls')).length,
        isMuted: autoplayVideos.filter((v) => v.hasAttribute('muted')).length,
      };

      // Animated GIF detection (approximation)
      const gifImages = Array.from(document.querySelectorAll('img[src$=".gif"]'));
      const gifData = {
        count: gifImages.length,
        hasAltText: gifImages.filter((img) => img.alt && img.alt.trim()).length,
        hasAriaDescribedBy: gifImages.filter((img) => img.hasAttribute('aria-describedby')).length,
      };

      const dynamicContent = {
        carousels: {
          count: carouselData.length,
          informationalCount: carouselData.filter((c) => c.type === 'informational').length,
          decorativeCount: carouselData.filter((c) => c.type === 'decorative').length,
          withProperAttributes: carouselData.filter((c) => c.hasDataAttributes).length,
          withAriaLabels: carouselData.filter((c) => c.hasAriaLabels).length,
          averageSlides: carouselData.length > 0
            ? carouselData.reduce((sum, c) => sum + c.slideCount, 0) / carouselData.length
            : 0,
        },
        animations: {
          hasAnimations,
          hasCSSAnimations,
          animatedElementCount: animatedElements.length,
          libraries: animationLibraries,
        },
        autoplayMedia: {
          videoCount: autoplayData.videoCount,
          audioCount: autoplayData.audioCount,
          withControls: autoplayData.hasControls,
          mutedCount: autoplayData.isMuted,
        },
        animatedGifs: {
          count: gifData.count,
          withAltText: gifData.hasAltText,
          withDescriptions: gifData.hasAriaDescribedBy,
        },
        visualDynamism: {
          detected: false, // Will be set after screenshot comparison
          uniqueStates: 0, // Will be set after screenshot comparison
        },
      };

      return {
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.content || '',
        h1: document.querySelector('h1')?.textContent || '',
        wordCount: document.body.innerText.trim().split(/\s+/).length,
        hasResponsiveMetaTag: !!document.querySelector('meta[name="viewport"]'),
        images: Array.from(document.images).map((img) => ({
          src: img.src,
          alt: img.alt || '',
        })),
        internalLinks,
        structuredData: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((script) => script.textContent),
        openGraphTags: Array.from(document.querySelectorAll('meta[property^="og:"]')).map((tag) => ({
          [tag.getAttribute('property')]: tag.getAttribute('content'),
        })),
        twitterTags: Array.from(document.querySelectorAll('meta[name^="twitter:"]')).map((tag) => ({
          [tag.getAttribute('name')]: tag.getAttribute('content'),
        })),
        h1Count: document.querySelectorAll('h1').length,
        h2Count: document.querySelectorAll('h2').length,
        h3Count: document.querySelectorAll('h3').length,
        h4Count: document.querySelectorAll('h4').length,
        h5Count: document.querySelectorAll('h5').length,
        h6Count: document.querySelectorAll('h6').length,
        scriptsCount: document.scripts.length,
        stylesheetsCount: document.styleSheets.length,
        htmlLang: document.documentElement.lang,
        canonicalUrl: document.querySelector('link[rel="canonical"]')?.href,
        formsCount: document.forms.length,
        tablesCount: document.querySelectorAll('table').length,
        pageSize: document.documentElement.outerHTML.length,
        allResources,
        llmReadability,
        dynamicContent,
      };
    });

    const performanceMetrics = await page.evaluate(() => {
      const navigationTiming = performance.getEntriesByType('navigation')[0];
      return {
        loadTime: navigationTiming.loadEventEnd - navigationTiming.startTime,
        domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime,
        firstPaint: performance.getEntriesByType('paint').find((entry) => entry.name === 'first-paint')?.startTime,
        firstContentfulPaint: performance.getEntriesByType('paint').find((entry) => entry.name === 'first-contentful-paint')?.startTime,
      };
    });

    // Take screenshot of the viewport
    const screenshotDir = path.join(process.cwd(), 'ss');
    try {
      await fs.access(screenshotDir);
      await fs.access(screenshotDir);
      context.logger.debug(`Screenshot directory already exists: ${screenshotDir}`);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.mkdir(screenshotDir, { recursive: true });
        context.logger.debug(`Created screenshot directory: ${screenshotDir}`);
      } else {
        context.logger.error(`Error checking/creating screenshot directory: ${error.message}`);
        throw error;
      }
    }

    const screenshotFilename = `${url.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_ipad.png`;
    await page.screenshot({ path: `./ss/${screenshotFilename}`, fullPage: false });

    // Visual dynamism detection: Take 3 screenshots at random intervals
    // and compare hashes to detect typewriter animations, carousels, tickers, etc.
    let visualDynamismDetected = false;
    const visualHashes = [];

    try {
      for (let i = 0; i < 3; i++) {
        // Wait random interval between 2-5 seconds
        const randomWait = 2000 + Math.floor(Math.random() * 3000);
        await new Promise((resolve) => {
          setTimeout(resolve, randomWait);
        });

        // Take screenshot to buffer
        const screenshot = await page.screenshot({ fullPage: false });

        // Calculate hash of screenshot
        const hash = crypto.createHash('md5').update(screenshot).digest('hex');
        visualHashes.push(hash);

        context.logger.debug(`Screenshot ${i + 1}/3 hash: ${hash}`);
      }

      // Compare hashes - if any differ, visual dynamism is present
      const uniqueHashes = new Set(visualHashes);
      visualDynamismDetected = uniqueHashes.size > 1;

      if (visualDynamismDetected) {
        context.logger.info(`Visual dynamism detected on ${url} (${uniqueHashes.size} unique states)`);
      } else {
        context.logger.debug(`No visual dynamism detected on ${url}`);
      }
    } catch (screenshotError) {
      context.logger.warn(`Error during visual dynamism detection: ${screenshotError.message}`);
      // Continue without failing - visual dynamism detection is optional
    }

    // Price detection: Check if price appears only in rendered HTML (JavaScript-dependent)
    // This is critical for e-commerce - CLI agents and server-based agents won't see prices
    const priceData = {
      inServedHtml: false,
      inRenderedHtml: false,
      jsDependent: false,
    };

    try {
      // Common price patterns: currency symbols, price classes, schema.org price properties
      const pricePatterns = [
        /\$\s*\d+(?:[.,]\d{2})?/, // $99.99, $99, $ 99.99
        /£\s*\d+(?:[.,]\d{2})?/, // £99.99
        /€\s*\d+(?:[.,]\d{2})?/, // €99.99
        /\d+(?:[.,]\d{2})?\s*(?:USD|GBP|EUR)/i, // 99.99 USD
        /<[^>]*class="[^"]*price[^"]*"/i, // class="price"
        /<[^>]*itemprop="price"/i, // itemprop="price"
        /"price":\s*"\d+/i, // JSON-LD price
        /data-price="/i, // data-price attribute
      ];

      // Check served HTML (before JavaScript execution)
      priceData.inServedHtml = pricePatterns.some((pattern) => pattern.test(servedHtml));

      // Check rendered HTML (after JavaScript execution)
      priceData.inRenderedHtml = pricePatterns.some((pattern) => pattern.test(html));

      // If price only appears after JS execution, it's JS-dependent
      priceData.jsDependent = !priceData.inServedHtml && priceData.inRenderedHtml;

      if (priceData.jsDependent) {
        context.logger.warn(`JavaScript-dependent pricing detected on ${url} - invisible to CLI agents`);
      }
    } catch (priceError) {
      context.logger.warn(`Error during price detection: ${priceError.message}`);
      // Continue without failing - price detection is optional
    }

    await browser.close();

    // Merge visual dynamism results into pageData's dynamicContent
    if (pageData.dynamicContent) {
      pageData.dynamicContent.visualDynamism = {
        detected: visualDynamismDetected,
        uniqueStates: new Set(visualHashes).size,
      };
      pageData.dynamicContent.pricing = priceData;
    }

    const data = {
      html,
      jsErrors,
      statusCode,
      headers,
      pageData: {
        ...pageData,
        testUrl: url,
      },
      performanceMetrics,
      seoScore: calculateSeoScore({
        ...pageData,
        testUrl: url,
        jsErrors,
        performanceMetrics,
      }, context), // Pass context
      lastCrawled: new Date().toISOString(),
      screenshot: screenshotFilename,
    };

    // Save rendered HTML to .cache/rendered
    try {
      const cacheKey = generateCacheKey(url);
      const renderedPath = path.join(cacheDir, 'rendered', `${cacheKey}.html`);
      // Ensure directory
      await fs.mkdir(path.dirname(renderedPath), { recursive: true });
      await fs.writeFile(renderedPath, html, 'utf8');
      context.logger.debug(`Rendered HTML saved to: ${renderedPath}`);
    } catch (error) {
      context.logger.error(`Error saving rendered HTML for ${url}:`, error);
    }

    // Save served HTML to .cache/served
    try {
      const cacheKey = generateCacheKey(url);
      const servedPath = path.join(cacheDir, 'served', `${cacheKey}.html`);
      // Ensure directory
      await fs.mkdir(path.dirname(servedPath), { recursive: true });
      await fs.writeFile(servedPath, servedHtml, 'utf8');
      context.logger.debug(`Served HTML saved to: ${servedPath}`);
    } catch (error) {
      context.logger.error(`Error saving served HTML for ${url}:`, error);
    }

    // Save console log output to .cache/rendered (same name as HTML with .log suffix)
    try {
      const cacheKey = generateCacheKey(url);
      const consoleLogPath = path.join(cacheDir, 'rendered', `${cacheKey}.log`);
      // Ensure directory
      await fs.mkdir(path.dirname(consoleLogPath), { recursive: true });
      const logContent = consoleMessages.length > 0
        ? consoleMessages.join('\n')
        : '// No console output captured';
      await fs.writeFile(consoleLogPath, logContent, 'utf8');
      context.logger.debug(`Console log saved to: ${consoleLogPath} (${consoleMessages.length} messages)`);
    } catch (error) {
      context.logger.error(`Error saving console log for ${url}:`, error);
    }

    context.logger.debug(`Successfully rendered, scored, and analyzed ${url}`);
    return data;
  } catch (error) {
    context.logger.error(`Error rendering data for ${url}:`, error);
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

function analyzeContentFreshness(data) {
  // Ensure data has the expected structure
  if (!data || typeof data !== 'object') {
    return {
      lastModifiedDate: 'Unknown',
      daysSinceLastModified: null,
      lastCrawledDate: new Date().toISOString(),
      daysSinceLastCrawled: 0,
      freshnessStatus: 'Unknown',
    };
  }

  const now = new Date();

  // Safely get lastModified date
  const lastModified = (data.pageData && data.pageData.lastModified)
    ? new Date(data.pageData.lastModified)
    : null;

  // Safely get lastCrawled date
  const lastCrawled = data.lastCrawled
    ? new Date(data.lastCrawled)
    : new Date();

  const freshness = {
    lastModifiedDate: lastModified ? lastModified.toISOString() : 'Unknown',
    daysSinceLastModified: lastModified
      ? Math.floor((now - lastModified) / (1000 * 60 * 60 * 24))
      : null,
    lastCrawledDate: lastCrawled.toISOString(),
    daysSinceLastCrawled: Math.floor(
      (now - lastCrawled) / (1000 * 60 * 60 * 24),
    ),
    freshnessStatus: 'Unknown',
  };

  if (freshness.daysSinceLastModified !== null) {
    if (freshness.daysSinceLastModified <= 7) {
      freshness.freshnessStatus = 'Very Fresh';
    } else if (freshness.daysSinceLastModified <= 30) {
      freshness.freshnessStatus = 'Fresh';
    } else if (freshness.daysSinceLastModified <= 90) {
      freshness.freshnessStatus = 'Moderately Fresh';
    } else {
      freshness.freshnessStatus = 'Stale';
    }
  } else {
    freshness.freshnessStatus = (() => {
      if (freshness.daysSinceLastCrawled <= 7) {
        return 'Potentially Fresh';
      }
      if (freshness.daysSinceLastCrawled <= 30) {
        return 'Potentially Moderately Fresh';
      }
      return 'Potentially Stale';
    })();
  }

  return freshness;
}

export {
  ensureCacheDir,
  getCachedData,
  setCachedData,
  getOrRenderData,
  renderAndCacheData,
  analyzeContentFreshness,
};
