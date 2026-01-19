/* eslint-disable consistent-return */
/**
 * Network utilities for handling HTTP requests with robust error handling
 *
 * This module provides comprehensive network operation capabilities including:
 * - Retry mechanisms with exponential backoff
 * - Puppeteer integration for bypassing restrictions
 * - Cloudflare challenge handling
 * - Request throttling and rate limiting
 * - Advanced error detection and handling
 */

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { throttle } from './rateLimiter.js';

// Add stealth plugin to avoid detection
puppeteer.use(StealthPlugin());

/**
 * Set up stealth configuration on a Puppeteer page
 * @param {Page} page - Puppeteer page instance
 * @private
 */
async function setupStealthPage(page) {
  // Randomize browser fingerprint
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
    Object.defineProperty(navigator, 'languages', {
      get: () => ['en-US', 'en'],
    });
    Object.defineProperty(navigator, 'plugins', {
      get: () => [1, 2, 3],
    });
  });

  // Set realistic headers and settings
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    Referer: 'https://www.google.com/',
    Connection: 'keep-alive',
  });

  // Randomize viewport
  await page.setViewport({
    width: 1920 + Math.floor(Math.random() * 100),
    height: 1080 + Math.floor(Math.random() * 100),
    deviceScaleFactor: 1,
    hasTouch: false,
    isLandscape: false,
  });
}

/**
 * Checks if error is a Cloudflare challenge
 *
 * @param {Error} error - Error to check
 * @returns {boolean} True if error is a Cloudflare challenge
 */
function isCloudflareChallenge(error) {
  return error.response?.status === 403
         && error.response?.headers['cf-ray']
         && error.response?.data?.includes('Cloudflare');
}

/**
 * Checks if error indicates a blocked request
 *
 * @param {Error} error - Error to check
 * @returns {boolean} True if request was blocked
 */
function isBlockedError(error) {
  return error.response?.status === 403 // Forbidden
         || error.response?.status === 429 // Too Many Requests
         || error.message.includes('blocked')
         || error.message.includes('denied')
         || error.message.includes('restricted')
         || error.message.includes('rate limit')
         || error.message.includes('captcha');
}

/**
 * Checks if error is a network-related error
 *
 * @param {Error} error - Error to check
 * @returns {boolean} True if error is network-related
 */
function isNetworkError(error) {
  const networkErrorCodes = [
    'ENOTFOUND', // DNS lookup failed
    'ECONNRESET', // Connection reset
    'ECONNREFUSED', // Connection refused
    'ETIMEDOUT', // Connection timed out
    'EHOSTUNREACH', // Host unreachable
    'ENETUNREACH', // Network unreachable
    'EAI_AGAIN', // Temporary DNS failure
  ];

  return networkErrorCodes.includes(error.code)
         || error.message.includes('net::ERR_INTERNET_DISCONNECTED')
         || error.message.includes('net::ERR_NETWORK_CHANGED')
         || error.message.includes('net::ERR_CONNECTION_RESET')
         || error.message.includes('net::ERR_CONNECTION_REFUSED')
         || error.message.includes('net::ERR_CONNECTION_TIMED_OUT');
}

/**
 * Executes a Puppeteer operation with enhanced configuration
 *
 * Implements:
 * - Stealth mode to avoid detection
 * - Randomized browser fingerprint
 * - Realistic user behavior simulation
 * - Browser pool usage (if available) or fallback to direct launch
 *
 * @param {Function} operation - Puppeteer operation to execute
 * @param {string} operationName - Name of operation for logging
 * @param {Object} options - Puppeteer launch options
 * @returns {Promise<any>} Operation result
 * @throws {Error} If operation fails
 */
async function executePuppeteerOperation(operation, operationName, context, options = {}) {
  // If browser pool is available, use it; otherwise fall back to direct launch
  if (context.browserPool) {
    return context.browserPool.execute(async (browser) => {
      const page = await browser.newPage();
      try {
        // Set up the page with stealth configuration
        await setupStealthPage(page);

        // Execute the operation with random delays
        const randomDelay = (min, max) => new Promise((resolve) => { setTimeout(resolve, Math.random() * (max - min) + min); });
        await randomDelay(500, 1500);
        const result = await operation(page);
        await randomDelay(500, 1500);

        return result;
      } finally {
        await page.close();
      }
    });
  }

  // Fallback: Launch browser directly (legacy behavior)
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080',
        '--disable-blink-features=AutomationControlled',
      ],
      ...options,
    });

    const page = await browser.newPage();

    // Set up stealth configuration
    await setupStealthPage(page);

    // Add random delays to mimic human behavior
    const randomDelay = (min, max) => new Promise((resolve) => { setTimeout(resolve, Math.random() * (max - min) + min); });

    // Execute the operation with random delays
    await randomDelay(500, 1500);
    const result = await operation(page);
    await randomDelay(500, 1500);

    return result;
  } catch (error) {
    context.logger.error(`Puppeteer operation failed during ${operationName}:`, error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Handles Cloudflare challenges using Puppeteer
 *
 * @param {Function} operation - Operation to execute
 * @param {string} operationName - Name of operation for logging
 * @param {Object} context - Audit context
 * @returns {Promise<any>} Operation result
 * @throws {Error} If challenge cannot be bypassed
 */
async function handleCloudflareChallenge(operation, operationName, context) {
  try {
    context.logger.info('Attempting to bypass Cloudflare challenge...');
    return await executePuppeteerOperation(operation, operationName, context, {
      headless: false, // Need visible browser for challenges
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080',
        '--disable-blink-features=AutomationControlled',
      ],
    });
  } catch (error) {
    context.logger.error('Failed to bypass Cloudflare challenge:', error);
    throw new Error('Unable to bypass Cloudflare protection. Please try again later or skip this site.');
  }
}

/**
 * Executes a network operation with robust error handling
 *
 * Implements:
 * - Retry mechanism with exponential backoff
 * - Automatic fallback to Puppeteer for blocked requests
 * - Cloudflare challenge handling
 * - Network error recovery
 *
 * @param {Function} operation - Network operation to execute
 * @param {string} operationName - Name of operation for logging
 * @param {Object} context - Audit context
 * @returns {Promise<any>} Operation result
 * @throws {Error} If operation fails after retries
 */
async function executeNetworkOperation(operation, operationName, context) {
  let retryCount = 0;
  const maxRetries = 3;
  const baseDelay = 1000;

  while (retryCount < maxRetries) {
    try {
      // Throttle request before execution
      await throttle(context);

      return await operation();
    } catch (error) {
      if (isCloudflareChallenge(error)) {
        return handleCloudflareChallenge(operation, operationName, context);
      }

      if (isBlockedError(error)) {
        retryCount++;
        if (retryCount >= maxRetries) {
          context.logger.warn('Falling back to Puppeteer for blocked request');
          return executePuppeteerOperation(operation, operationName, context, {});
        }

        const delay = baseDelay * 2 ** retryCount;
        context.logger.warn(`Blocked during ${operationName}, retrying in ${delay}ms...`);
        await new Promise((resolve) => { setTimeout(resolve, delay); });
        continue;
      }

      if (isNetworkError(error)) {
        retryCount++;
        if (retryCount >= maxRetries) {
          throw new Error(`Network operation failed after ${maxRetries} attempts: ${error.message}`);
        }

        const delay = baseDelay * 2 ** retryCount;
        context.logger.warn(`Network error during ${operationName}, retrying in ${delay}ms...`);
        await new Promise((resolve) => { setTimeout(resolve, delay); });
        continue;
      }

      throw error;
    }
  }
}

export {
  executeNetworkOperation,
  executePuppeteerOperation,
  isCloudflareChallenge,
  isBlockedError,
  isNetworkError,
};
