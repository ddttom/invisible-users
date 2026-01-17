/**
 * robots.txt Fetcher
 *
 * Fetches and processes robots.txt BEFORE any URL crawling begins.
 * This ensures compliance checking can happen for all URLs.
 */

import { processRobotsTxt } from './robotsTxtParser.js';

/**
 * Fetch robots.txt for a given site
 * @param {string} siteUrl - The base URL of the site (e.g., https://example.com)
 * @param {Object} context - Audit context
 * @returns {Promise<Object|null>} Parsed robots.txt data or null if not found
 */
export async function fetchRobotsTxt(siteUrl, context) {
  try {
    const urlObj = new URL(siteUrl);
    const robotsTxtUrl = `${urlObj.origin}/robots.txt`;

    context.logger.info(`Fetching robots.txt from: ${robotsTxtUrl}`);

    // Try fetch first (faster, no browser overhead)
    try {
      const response = await fetch(robotsTxtUrl, {
        headers: {
          'User-Agent': 'WebAuditSuite/1.0',
        },
        redirect: 'follow',
      });

      if (response.ok) {
        const content = await response.text();
        context.logger.info('✓ robots.txt fetched successfully via HTTP');

        const robotsData = await processRobotsTxt(robotsTxtUrl, content, context);

        // Log summary
        const summary = getRobotsSummary(robotsData);
        context.logger.info(summary);

        return robotsData;
      }

      if (response.status === 404) {
        context.logger.info('robots.txt not found (404) - allowing all URLs by default');
        return null;
      }

      context.logger.warn(`robots.txt returned status ${response.status}`);
      return null;
    } catch (fetchError) {
      context.logger.debug(`Fetch failed for robots.txt: ${fetchError.message}`);

      // Try with Puppeteer as fallback (for sites with Cloudflare, etc.)
      context.logger.info('Attempting to fetch robots.txt with Puppeteer...');

      const { executePuppeteerOperation } = await import('./networkUtils.js');

      const content = await executePuppeteerOperation(
        async (page) => {
          await page.goto(robotsTxtUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

          // Get the text content
          const textContent = await page.evaluate(() => document.body.textContent);

          return textContent;
        },
        'fetch robots.txt',
        context,
      );

      if (content && content.trim().length > 0) {
        context.logger.info('✓ robots.txt fetched successfully via Puppeteer');

        const robotsData = await processRobotsTxt(robotsTxtUrl, content, context);

        // Log summary
        const summary = getRobotsSummary(robotsData);
        context.logger.info(summary);

        return robotsData;
      }

      context.logger.info('robots.txt not accessible - allowing all URLs by default');
      return null;
    }
  } catch (error) {
    context.logger.warn(`Error fetching robots.txt: ${error.message}`);
    context.logger.info('Proceeding without robots.txt (allowing all URLs by default)');
    return null;
  }
}

/**
 * Get summary of robots.txt rules
 * @param {Object} robotsData - Parsed robots.txt data
 * @returns {string} Summary text
 */
function getRobotsSummary(robotsData) {
  if (!robotsData) {
    return 'No robots.txt found';
  }

  const { disallowedPaths = [], allowedPaths = [], specificRules = {} } = robotsData;

  let summary = '📋 robots.txt Summary:\n';
  summary += `  Disallowed paths: ${disallowedPaths.length}\n`;
  summary += `  Allowed paths: ${allowedPaths.length}\n`;
  summary += `  User-agent specific rules: ${Object.keys(specificRules).length}`;

  return summary;
}

/**
 * Extract base URL from a sitemap or page URL
 * @param {string} url - Any URL from the site
 * @returns {string} Base URL (origin)
 */
export function extractBaseUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.origin;
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }
}
