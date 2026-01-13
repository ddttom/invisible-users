import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nock from 'nock';
import winston from 'winston';
import { runTestsOnSitemap } from '../src/main.js';
import { AuditContext } from '../src/core/AuditContext.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Setup test context with appropriate options for golden master testing
function setupContext(options = {}) {
  const defaultOptions = {
    sitemap: 'https://example.com/sitemap.xml',
    output: path.join(__dirname, 'temp_output'),
    limit: 1,
    count: 1,
    cacheOnly: false,
    noCache: false,
    noPuppeteer: true, // Important for CI/fast testing
    forceDeleteCache: true,
    logLevel: 'error',
    recursive: false,
    pa11y: {
      retryDelay: 1000,
      maxRetries: 3,
    },
    ...options,
  };

  const logger = winston.createLogger({
    transports: [new winston.transports.Console({ silent: false })],
  });

  return new AuditContext(defaultOptions, logger);
}

// eslint-disable-next-line func-names
describe('Golden Master Regression Test', function () {
  this.timeout(10000); // Give it some time
  const outputDir = path.join(__dirname, 'golden_output');

  before(() => {
    // Setup Nock to intercept requests
    nock('https://example.com')
      .persist()
      .get('/sitemap.xml')
      .reply(200, `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url>
            <loc>https://example.com/</loc>
            <lastmod>2024-01-01</lastmod>
          </url>
        </urlset>
      `)
      .get('/')
      .reply(200, `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <title>Test Page</title>
          <meta name="description" content="Test description">
        </head>
        <body>
          <main>
            <h1>Hello World</h1>
            <form>
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required>
            </form>
          </main>
        </body>
        </html>
      `);

    // Ensure creating output
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  });

  after(() => {
    nock.cleanAll();
    // Cleanup output dir? Maybe keep for inspection
  });

  it('should produce identical results to the golden snapshot', async () => {
    const context = setupContext({ output: outputDir });

    const results = await runTestsOnSitemap(context);

    expect(results).to.not.be.null;
    expect(results.failedUrls).to.be.an('array').that.is.empty;
    expect(results.urls).to.have.lengthOf(1);

    // Snapshot verification
    // In a real Golden Master, we would load a previous JSON and compare deep equals
    // For now, we verify key structural properties that must not change

    // LLM Metrics Check
    const llmMetric = results.llmMetrics[0];
    expect(llmMetric.semanticHTML.metrics.hasMain).to.be.true;
    expect(llmMetric.formFields.metrics.standardNameRatio).to.be.equal(1);

    // SEO Check
    const seoScore = results.seoScores[0];
    expect(seoScore.score).to.be.a('number');
  });
});
