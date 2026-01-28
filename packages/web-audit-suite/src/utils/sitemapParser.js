/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
// sitemapParser.js

import axios from 'axios';
import xml2js from 'xml2js';
import fs from 'fs/promises';
import zlib from 'zlib';
import { promisify } from 'util';

import { getRateLimiter } from './rateLimiter.js';
import { isValidUrl, normalizeUrl } from './urlUtils.js';

const gunzip = promisify(zlib.gunzip);

const axiosInstance = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  },
});

export async function fetchAndParseSitemap(sitemapPath, context) {
  context.logger.info(`Fetching content from: ${sitemapPath}`);
  try {
    const limiter = getRateLimiter(context, context.options?.rateLimit);
    await limiter.removeTokens(1);
    let content;
    let isCompressed = false;

    if (isValidUrl(sitemapPath, null, context)) {
      const response = await axiosInstance.get(sitemapPath, { responseType: 'arraybuffer' });
      content = response.data;
      isCompressed = response.headers['content-encoding'] === 'gzip' || sitemapPath.endsWith('.gz');
      context.logger.debug(`Successfully fetched sitemap from URL: ${sitemapPath}`);
    } else {
      content = await fs.readFile(sitemapPath);
      isCompressed = sitemapPath.endsWith('.gz');
      context.logger.debug(`Successfully read sitemap from file: ${sitemapPath}`);
    }

    if (isCompressed) {
      context.logger.debug('Decompressing gzipped content');
      content = await gunzip(content);
    }

    content = content.toString('utf-8');

    // Check if the content is XML or HTML
    if (content.trim().startsWith('<!DOCTYPE html>') || content.trim().startsWith('<html')) {
      context.logger.warn('Found HTML content instead of sitemap');
      return { html: content, url: sitemapPath };
    }

    context.logger.debug('Parsing sitemap XML');
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(content);
    context.logger.info('Sitemap parsed successfully');
    return { xml: result };
  } catch (error) {
    context.logger.error(`Error fetching or parsing content from ${sitemapPath}:`, error);
    throw error;
  }
}

export async function extractUrls(parsedContent, context) {
  if (parsedContent.html) {
    context.logger.debug('Extracting URL from HTML content');
    return [{ url: normalizeUrl(parsedContent.url), lastmod: null }];
  }
  if (parsedContent.xml) {
    if (parsedContent.xml.sitemapindex) {
      return processSitemapIndex(parsedContent.xml.sitemapindex, context);
    }

    if (parsedContent.xml.urlset) {
      return processUrlset(parsedContent.xml.urlset, context);
    }

    context.logger.error('Unknown sitemap format');
    throw new Error('Unknown sitemap format');
  }

  context.logger.error('Invalid parsed content');
  throw new Error('Invalid parsed content');
}

async function processSitemapIndex(sitemapindex, context) {
  context.logger.info('Found a sitemap index. Processing nested sitemaps...');
  const sitemapUrls = sitemapindex.sitemap.map((sitemap) => ({
    url: normalizeUrl(sitemap.loc?.[0] || ''),
    lastmod: sitemap.lastmod?.[0] || null,
  }));
  let allUrls = [];
  for (const sitemapUrl of sitemapUrls) {
    // Check if shutdown signal received (assuming global.isShuttingDown is replaced by context state or kept global if absolutely necessary, but we should try to avoid it. If not replaceable yet, keep global.isShuttingDown or pass cancel token?)
    // For now assuming we keep global.isShuttingDown for emergency stop, but we should use context logger.
    if (global.isShuttingDown) {
      context.logger.warn('Shutdown signal received. Stopping sitemap processing.');
      break;
    }
    if (!sitemapUrl.url) {
      context.logger.warn('Skipping sitemap with empty URL');
      continue;
    }
    context.logger.debug(`Processing nested sitemap: ${sitemapUrl.url}`);
    try {
      const limiter = getRateLimiter(context, context.options?.rateLimit);
      await limiter.removeTokens(1);
      const nestedParsedContent = await fetchAndParseSitemap(sitemapUrl.url, context);
      const nestedUrls = await extractUrls(nestedParsedContent, context);
      allUrls = allUrls.concat(nestedUrls);
    } catch (error) {
      context.logger.error(`Error processing nested sitemap ${sitemapUrl.url}:`, error);
    }
  }
  return allUrls;
}

function processUrlset(urlset, context) {
  context.logger.debug('Extracting URLs from sitemap');
  const urls = urlset.url
    .map((url) => ({
      url: normalizeUrl(url.loc?.[0] || ''),
      lastmod: url.lastmod?.[0] || null,
      changefreq: url.changefreq?.[0] || null,
      priority: url.priority?.[0] || null,
      // Support for image sitemaps
      images: url.image?.map((image) => ({
        loc: image.loc?.[0] || '',
        caption: image.caption?.[0] || '',
        title: image.title?.[0] || '',
      })) || [],
      // Support for news sitemaps
      news: url['news:news']?.map((newsItem) => ({
        publication: newsItem['news:publication']?.[0]['news:name']?.[0] || '',
        publicationDate: newsItem['news:publication_date']?.[0] || '',
        title: newsItem['news:title']?.[0] || '',
      })) || [],
    }))
    .filter((item) => item.url);
  context.logger.info(`Extracted ${urls.length} URLs from sitemap`);
  return urls;
}
