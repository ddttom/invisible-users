import { expect } from 'chai';
import sinon from 'sinon';
import esmock from 'esmock';
import winston from 'winston';

describe('Sitemap Utils', () => {
  let getUrlsFromSitemap;
  let networkUtilsMock; // Mock the ENTIRE networkUtils module
  let testContext;

  // eslint-disable-next-line prefer-arrow-callback, func-names
  beforeEach(async function () {
    // Setup global mock properly
    const auditContext = {
      options: {
        includeAllLanguages: true,
      },
      logger: winston.createLogger({
        transports: [new winston.transports.Console({ silent: true })],
      }),
    };
    testContext = auditContext;

    networkUtilsMock = {
      executeNetworkOperation: sinon.stub().callsFake(async (fn) => fn()),
      executePuppeteerOperation: sinon.stub().resolves([]),
      isCloudflareChallenge: sinon.stub().returns(false),
      // Add other exports if needed
    };

    const sitemapModule = await esmock('../../src/utils/sitemap.js', {
      '../../src/utils/networkUtils.js': networkUtilsMock,
    });

    getUrlsFromSitemap = sitemapModule.getUrlsFromSitemap;
  });

  afterEach(() => {
    sinon.restore();
    delete global.auditcore; // Just in case
  });

  it('should parse an XML sitemap correctly', async () => {
    // Mock fetch for XML content
    global.fetch = sinon.stub().resolves({
      ok: true,
      arrayBuffer: async () => Buffer.from(`
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url>
            <loc>https://example.com/page1</loc>
            <lastmod>2023-01-01</lastmod>
          </url>
        </urlset>
      `),
      headers: new Headers({ 'content-type': 'application/xml' }),
    });

    const urls = await getUrlsFromSitemap('https://example.com/sitemap.xml', testContext, -1);

    // Check that we found at least the one page + llms.txt auto-added
    expect(urls).to.be.an('array');
    const page1 = urls.find((u) => u.url === 'https://example.com/page1');
    expect(page1).to.exist;
  });

  it('should parse HTML links correctly', async () => {
    // Mock fetch for HTML content
    global.fetch = sinon.stub().resolves({
      ok: true,
      arrayBuffer: async () => Buffer.from(`
          <html><body>
            <a href="/internal-link">Internal</a>
            <a href="https://external.com">External</a>
          </body></html>
        `),
      headers: new Headers({ 'content-type': 'text/html' }),
    });

    const urls = await getUrlsFromSitemap('https://example.com/page', testContext, -1);
    const internal = urls.find((u) => u.url === 'https://example.com/internal-link');
    expect(internal).to.exist;
  });

  it('should auto-add llms.txt if not present', async () => {
    global.fetch = sinon.stub().resolves({
      ok: true,
      arrayBuffer: async () => Buffer.from('<html></html>'),
      headers: new Headers({ 'content-type': 'text/html' }),
    });

    const urls = await getUrlsFromSitemap('https://example.com', testContext, -1);
    const llms = urls.find((u) => u.url === 'https://example.com/llms.txt');
    expect(llms).to.exist;
  });
});
