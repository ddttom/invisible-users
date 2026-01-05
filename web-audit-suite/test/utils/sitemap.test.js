import { expect } from 'chai';
import esmock from 'esmock';
import sinon from 'sinon';
import '../setup.js'; // Ensure setup runs

describe('Sitemap Utils', () => {
  let getUrlsFromSitemap;
  let mockNetworkUtils;

  before(async () => {
    mockNetworkUtils = {
      executeNetworkOperation: sinon.stub(),
      executePuppeteerOperation: sinon.stub(),
    };

    // Use esmock to substitute dependencies
    const sitemapModule = await esmock('../../src/utils/sitemap.js', {
      '../../src/utils/networkUtils.js': mockNetworkUtils,
    });
    getUrlsFromSitemap = sitemapModule.getUrlsFromSitemap;
  });

  afterEach(() => {
    mockNetworkUtils.executeNetworkOperation.reset();
    mockNetworkUtils.executePuppeteerOperation.reset();
  });

  it('should parse an XML sitemap correctly', async () => {
    const xmlContent = `
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                    <loc>https://example.com/page1</loc>
                    <lastmod>2023-01-01</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>0.8</priority>
                </url>
            </urlset>
        `;

    mockNetworkUtils.executeNetworkOperation.resolves({
      data: Buffer.from(xmlContent),
      headers: { 'content-type': 'application/xml' },
    });

    const urls = await getUrlsFromSitemap('https://example.com/sitemap.xml');

    // It should contain the parsed URL and the auto-added llms.txt
    expect(urls).to.have.lengthOf(2);
    expect(urls[0].url).to.equal('https://example.com/page1');
    expect(urls[1].url).to.equal('https://example.com/llms.txt');
  });

  it('should parse HTML links correctly', async () => {
    const htmlContent = `
            <html>
                <body>
                    <a href="/link1">Link 1</a>
                    <a href="https://example.com/link2">Link 2</a>
                    <!-- External link should be ignored -->
                    <a href="https://other.com/external">External</a>
                </body>
            </html>
        `;

    mockNetworkUtils.executeNetworkOperation.resolves({
      data: Buffer.from(htmlContent),
      headers: { 'content-type': 'text/html' },
    });

    const urls = await getUrlsFromSitemap('https://example.com/page');

    const pageUrls = urls.filter((u) => u.url !== 'https://example.com/llms.txt');

    expect(pageUrls).to.have.lengthOf(2);
    expect(pageUrls.map((u) => u.url)).to.include('https://example.com/link1');
    expect(pageUrls.map((u) => u.url)).to.include('https://example.com/link2');
  });

  it('should auto-add llms.txt if not present', async () => {
    const xmlContent = `
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                    <loc>https://example.com/page1</loc>
                </url>
            </urlset>
        `;

    mockNetworkUtils.executeNetworkOperation.resolves({
      data: Buffer.from(xmlContent),
      headers: { 'content-type': 'application/xml' },
    });

    const urls = await getUrlsFromSitemap('https://example.com/sitemap.xml');
    const llmUrl = urls.find((u) => u.url === 'https://example.com/llms.txt');

    expect(llmUrl).to.not.be.undefined;
    expect(llmUrl.priority).to.equal(0.8);
  });
});
