import { expect } from 'chai';
import esmock from 'esmock';
import sinon from 'sinon';
import '../setup.js'; // Global mocks
import { resetRateLimiter } from '../../src/utils/rateLimiter.js';

describe('Integration: Full Pipeline', () => {
  let main;
  let fsMock;
  let networkUtilsMock;
  let pa11yRunnerMock;

  before(async () => {
    resetRateLimiter();

    // Mock fs
    fsMock = {
      writeFile: sinon.stub().resolves(),
      readFile: sinon.stub().rejects(new Error('ENOENT')), // No existing results
      mkdir: sinon.stub().resolves(),
      rm: sinon.stub().resolves(),
      access: sinon.stub().resolves(),
    };

    // Mock networkUtils
    networkUtilsMock = {
      executeNetworkOperation: async (fn) => fn(),
      executePuppeteerOperation: async (fn) => {
        // Mock page object
        const page = {
          goto: sinon.stub().resolves(),
          content: sinon.stub().resolves('<html><body><main><h1>Test</h1></main></body></html>'),
          evaluate: sinon.stub().resolves([]), // No links
          setRequestInterception: sinon.stub().resolves(),
          on: sinon.stub(),
          off: sinon.stub(),
          screenshot: sinon.stub().resolves(),
          close: sinon.stub().resolves(),
          setUserAgent: sinon.stub().resolves(),
          setExtraHTTPHeaders: sinon.stub().resolves(),
          setViewport: sinon.stub().resolves(),
          evaluateOnNewDocument: sinon.stub().resolves(),
        };
        return fn(page);
      },
      isCloudflareChallenge: () => false,
      isBlockedError: () => false,
      isNetworkError: () => false,
    };

    // Mock pa11yRunner
    pa11yRunnerMock = {
      runPa11yWithRetry: sinon.stub().resolves({
        documentTitle: 'Test Page',
        pageUrl: 'https://example.com/page1',
        issues: [],
      }),
    };

    // Mock global fetch for getUrlsFromSitemap
    global.fetch = sinon.stub().callsFake(async (url) => {
      if (url.includes('sitemap.xml')) {
        return {
          ok: true,
          status: 200,
          headers: new Map([['content-type', 'application/xml']]),
          arrayBuffer: async () => Buffer.from(`
                        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                            <url>
                                <loc>https://example.com/page1</loc>
                            </url>
                        </urlset>
                    `),
        };
      }
      // For other URLs (like html pages), return simple HTML
      return {
        ok: true,
        status: 200,
        headers: new Map([['content-type', 'text/html']]),
        arrayBuffer: async () => Buffer.from('<html><body><main><h1>Analyzed Page</h1><form><label for="email">Email</label><input name="email" id="email"></form></main></body></html>'),
      };
    });

    // Mock caching.js
    const cachingMock = {
      getOrRenderData: sinon.stub().callsFake(async () => ({
        html: '<html><body><main><h1>Analyzed Page</h1><form><label for="email">Email</label><input name="email" id="email"></form></main></body></html>',
        jsErrors: [],
        statusCode: 200,
        headers: {},
        pageData: {
          title: 'Analyzed Page',
          h1: 'Analyzed Page',
          images: [],
          internalLinks: 0,
        },
      })),
      setCachedData: sinon.stub().callsFake(async () => {}),
    };

    // Mock rateLimiter.js
    const rateLimiterMock = {
      throttle: sinon.stub().resolves(),
      getRateLimiter: sinon.stub().returns({ removeTokens: sinon.stub().resolves() }),
      resetRateLimiter: sinon.stub(),
    };

    // Import main with mocks
    // Note: we need to mock modules that are imported by the internal dependency chain
    // We mock rateLimiter to avoid actual delays
    main = await esmock('../../src/main.js', {
      'fs/promises': fsMock,
      '../../src/utils/networkUtils.js': networkUtilsMock,
      '../../src/utils/pa11yRunner.js': pa11yRunnerMock,
      '../../src/utils/caching.js': cachingMock,
      '../../src/utils/rateLimiter.js': rateLimiterMock,
    }, {
      limiter: { RateLimiter: class { constructor() { this.removeTokens = async () => {}; } } },
    });
  });

  after(() => {
    sinon.restore();
    if (global.fetch && global.fetch.restore) {
      delete global.fetch;
    }
  });


});
