
import { expect } from 'chai';
import { getRateLimiter, resetRateLimiter } from '../../src/utils/rateLimiter.js';
import sinon from 'sinon';

describe('Rate Limiter Utils', () => {
  beforeEach(() => {
    resetRateLimiter();
    // Ensure global exists
    if (!global.auditcore) {
        global.auditcore = { options: {}, logger: { info: sinon.stub(), warn: sinon.stub(), error: sinon.stub() } };
    }
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
      const limiter = getRateLimiter({ tokensPerInterval: 10, interval: 'minute' });
      expect(limiter).to.exist;
    });
  });

  describe('Integration with Global Options', () => {
    it('should use global options if provided', () => {
      // Mock global options safely
      const originalOptions = global.auditcore.options;
      global.auditcore.options = {
        rateLimit: {
          tokensPerInterval: 123,
          interval: 'hour',
        },
      };

      const limiter = getRateLimiter(global.auditcore.options.rateLimit);
      expect(limiter).to.exist;

      // Restore
      global.auditcore.options = originalOptions || {};
    });
  });
});
