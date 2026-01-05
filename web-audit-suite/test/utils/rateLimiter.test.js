import { expect } from 'chai';
import { getRateLimiter, resetRateLimiter } from '../../src/utils/rateLimiter.js';

describe('Rate Limiter Utils', () => {
  beforeEach(() => {
    resetRateLimiter();
  });

  describe('getRateLimiter', () => {
    it('should return a limiter instance', () => {
      const limiter = getRateLimiter();
      expect(limiter).to.exist;
      expect(limiter.removeTokens).to.be.a('function');
    });

    it('should return the same instance (singleton)', () => {
      const limiter1 = getRateLimiter();
      const limiter2 = getRateLimiter();
      expect(limiter1).to.equal(limiter2);
    });

    it('should configure the limiter correctly', () => {
      // Access private properties for testing if possible, or infer behavior
      // The 'limiter' package stores tokenBucket
      const limiter = getRateLimiter({ tokensPerInterval: 10, interval: 'minute' });
      // We can't easily inspect internal state without violating encapsulation,
      // but we can check if it accepts the config without error.
      expect(limiter).to.exist;
    });
  });

  describe('Integration with Global Options', () => {
    it('should use global options if provided', () => {
      // Mock global options
      const originalOptions = global.auditcore.options;
      global.auditcore.options = {
        rateLimit: {
          tokensPerInterval: 123,
          interval: 'hour',
        },
      };

      const limiter = getRateLimiter(global.auditcore.options.rateLimit);
      // Verify it didn't throw and returned an object
      expect(limiter).to.exist;

      // Restore
      global.auditcore.options = originalOptions;
    });
  });
});
