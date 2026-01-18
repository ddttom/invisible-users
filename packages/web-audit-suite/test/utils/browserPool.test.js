import { expect } from 'chai';
import sinon from 'sinon';
import winston from 'winston';
import BrowserPool from '../../src/utils/browserPool.js';

describe('Browser Pool', () => {
  let context;
  let browserPool;
  let mockBrowser;

  beforeEach(() => {
    // Create mock logger
    const logger = winston.createLogger({
      transports: [new winston.transports.Console({ silent: true })],
    });

    context = {
      logger,
      options: {},
    };

    // Create mock browser
    mockBrowser = {
      close: sinon.stub().resolves(),
      pages: sinon.stub().resolves([]),
      newPage: sinon.stub().resolves({
        close: sinon.stub().resolves(),
      }),
    };
  });

  afterEach(async () => {
    if (browserPool && !browserPool.isShuttingDown) {
      await browserPool.shutdown();
    }
    sinon.restore();
  });

  describe('Constructor', () => {
    it('should initialize with default pool size of 3', () => {
      browserPool = new BrowserPool(context);
      expect(browserPool.poolSize).to.equal(3);
      expect(browserPool.browsers).to.be.an('array').that.is.empty;
      expect(browserPool.availableBrowsers).to.be.an('array').that.is.empty;
    });

    it('should accept custom pool size', () => {
      browserPool = new BrowserPool(context, { poolSize: 5 });
      expect(browserPool.poolSize).to.equal(5);
    });

    it('should accept custom launch options', () => {
      const launchOptions = { headless: true, args: ['--no-sandbox'] };
      browserPool = new BrowserPool(context, { launchOptions });
      expect(browserPool.launchOptions).to.deep.equal(launchOptions);
    });

    it('should initialize with shutdown flag false', () => {
      browserPool = new BrowserPool(context);
      expect(browserPool.isShuttingDown).to.be.false;
    });
  });

  describe('Acquire and Release', () => {
    it('should throw error when acquiring from shut down pool', async () => {
      browserPool = new BrowserPool(context, { poolSize: 1 });
      browserPool.isShuttingDown = true;

      try {
        await browserPool.acquire();
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error.message).to.equal('Browser pool is shutting down');
      }
    });

    it('should handle acquire/release cycle correctly', async () => {
      browserPool = new BrowserPool(context, { poolSize: 1 });

      // Mock a browser object without actually launching
      const mockBrowserObj = {
        id: 0,
        instance: mockBrowser,
        inUse: false,
        pagesCreated: 0,
      };

      browserPool.browsers.push(mockBrowserObj);
      browserPool.availableBrowsers.push(mockBrowserObj);

      // Acquire browser
      const acquired = await browserPool.acquire();
      expect(acquired).to.equal(mockBrowserObj);
      expect(acquired.inUse).to.be.true;
      expect(browserPool.availableBrowsers).to.have.lengthOf(0);

      // Release browser
      await browserPool.release(acquired);
      expect(acquired.inUse).to.be.false;
      expect(browserPool.availableBrowsers).to.have.lengthOf(1);
    });

    it('should queue requests when no browsers available', (done) => {
      browserPool = new BrowserPool(context, { poolSize: 1 });

      const mockBrowserObj = {
        id: 0,
        instance: mockBrowser,
        inUse: false,
        pagesCreated: 0,
      };

      browserPool.browsers.push(mockBrowserObj);
      browserPool.availableBrowsers.push(mockBrowserObj);

      // Acquire first browser (should succeed immediately)
      browserPool.acquire().then((browser1) => {
        expect(browser1.inUse).to.be.true;

        // Try to acquire second browser (should queue)
        const acquirePromise = browserPool.acquire();

        // Release first browser after a delay
        setTimeout(async () => {
          await browserPool.release(browser1);
        }, 50);

        // Second acquire should resolve after release
        acquirePromise.then((browser2) => {
          expect(browser2.inUse).to.be.true;
          expect(browser2).to.equal(mockBrowserObj);
          done();
        });
      });
    });

    it('should handle gracefully when releasing null browser', async () => {
      browserPool = new BrowserPool(context);
      await browserPool.release(null);
      // Should not throw
    });

    it('should not release browser when pool is shutting down', async () => {
      browserPool = new BrowserPool(context, { poolSize: 1 });

      const mockBrowserObj = {
        id: 0,
        instance: mockBrowser,
        inUse: true,
        pagesCreated: 0,
      };

      browserPool.browsers.push(mockBrowserObj);
      browserPool.isShuttingDown = true;

      await browserPool.release(mockBrowserObj);
      expect(mockBrowserObj.inUse).to.be.true; // Should remain in use
      expect(browserPool.availableBrowsers).to.have.lengthOf(0);
    });
  });

  describe('Restart Mechanism', () => {
    it('should track pages created counter', async () => {
      browserPool = new BrowserPool(context, { poolSize: 1 });

      const mockBrowserObj = {
        id: 0,
        instance: mockBrowser,
        inUse: false,
        pagesCreated: 0,
      };

      browserPool.browsers.push(mockBrowserObj);
      browserPool.availableBrowsers.push(mockBrowserObj);

      // Acquire and release multiple times
      for (let i = 0; i < 5; i++) {
        const browser = await browserPool.acquire();
        await browserPool.release(browser);
      }

      expect(mockBrowserObj.pagesCreated).to.equal(5);
    });
  });

  describe('Error Handling', () => {
    it('should handle release without wait queue gracefully', async () => {
      browserPool = new BrowserPool(context, { poolSize: 1 });

      const mockBrowserObj = {
        id: 0,
        instance: mockBrowser,
        inUse: true,
        pagesCreated: 0,
      };

      browserPool.browsers.push(mockBrowserObj);
      browserPool.waitQueue = []; // Empty queue

      await browserPool.release(mockBrowserObj);
      expect(browserPool.availableBrowsers).to.have.lengthOf(1);
      expect(mockBrowserObj.inUse).to.be.false;
    });
  });

  describe('Statistics', () => {
    it('should track available browsers count correctly', async () => {
      browserPool = new BrowserPool(context, { poolSize: 2 });

      const browser1 = {
        id: 0,
        instance: mockBrowser,
        inUse: false,
        pagesCreated: 0,
      };

      const browser2 = {
        id: 1,
        instance: mockBrowser,
        inUse: false,
        pagesCreated: 0,
      };

      browserPool.browsers.push(browser1, browser2);
      browserPool.availableBrowsers.push(browser1, browser2);

      expect(browserPool.availableBrowsers).to.have.lengthOf(2);

      await browserPool.acquire();
      expect(browserPool.availableBrowsers).to.have.lengthOf(1);

      await browserPool.acquire();
      expect(browserPool.availableBrowsers).to.have.lengthOf(0);
    });
  });
});
