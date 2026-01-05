/**
 * Centralized Rate Limiter for the Web Audit Suite
 * Uses 'limiter' package (Token Bucket algorithm)
 */

import { RateLimiter } from 'limiter';

const Limiter = RateLimiter;

let instance = null;

/**
 * Initialize or return the existing rate limiter instance
 * @param {Object} options Configuration options
 * @param {number} options.tokensPerInterval Number of tokens to add per interval
 * @param {string} options.interval Interval for token addition ('second', 'minute', 'hour', 'day')
 * @returns {Object} Rate limiter instance
 */
export function getRateLimiter(options = {}) {
  if (!instance) {
    const {
      tokensPerInterval = 5,
      interval = 'second',
    } = options;

    global.auditcore.logger.info(`Initializing rate limiter: ${tokensPerInterval} requests per ${interval}`);
    instance = new Limiter({ tokensPerInterval, interval });
  }
  return instance;
}

/**
 * Resets the rate limiter instance (useful for testing)
 */
export function resetRateLimiter() {
  instance = null;
}

/**
 * Throttle execution based on rate limits
 * @returns {Promise<void>} Resolves when a token is removed
 */
export async function throttle() {
  const options = global.auditcore?.options?.rateLimit || {};
  if (options.enabled === false) {
    return;
  }
  const limiter = getRateLimiter(options);
  await limiter.removeTokens(1);
}
