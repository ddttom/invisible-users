import { expect } from 'chai';
import * as cheerio from 'cheerio';
import {
  collectLLMMetrics,
  calculateServedScore,
  calculateRenderedScore,
  generateFeedback,
} from '../../src/utils/llmMetrics.js';
import '../setup.js'; // Ensure setup runs

describe('LLM Metrics Utils', () => {
  // Test Data for SERVED HTML (Static analysis)
  const servedHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Test Page</title>
        <meta name="description" content="Test description">
        <link rel="llms.txt" href="/llms.txt">
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Test Org"
        }
        </script>
    </head>
    <body>
        <header>Header</header>
        <nav>Nav</nav>
        <main>
            <h1>Start Here</h1>
            <article>
                <form action="/submit" method="post">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required autocomplete="email">
                    
                    <label for="first_name">First Name</label>
                    <input type="text" id="first_name" name="first_name" required>
                </form>
            </article>
        </main>
        <footer>Footer</footer>
    </body>
    </html>
  `;

  // Test Data for RENDERED HTML (Dynamic state)
  const renderedHtml = `
    ${servedHtml}
    <div data-state="loading">Loading...</div>
    <div data-agent-visible="true">Visible to Agents</div>
    <div role="alert" aria-live="assertive">Something went wrong</div>
    <div data-validation-state="error">Invalid input</div>
  `;

  describe('collectLLMMetrics', () => {
    it('should collect essential served metrics correctly', () => {
      const $ = cheerio.load(servedHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');

      // Semantic HTML
      expect(metrics.semanticHTML.metrics.hasMain).to.be.true;
      expect(metrics.semanticHTML.metrics.hasNav).to.be.true;
      expect(metrics.semanticHTML.metrics.hasHeader).to.be.true;

      // LLMs.txt
      expect(metrics.llmsTxt.metrics.hasLLMsTxtReference).to.be.true;
      expect(metrics.llmsTxt.metrics.llmsTxtUrl).to.equal('/llms.txt');

      // Structured Data
      expect(metrics.structuredData.metrics.hasSchemaOrg).to.be.true;
      expect(metrics.structuredData.metrics.jsonLdCount).to.equal(1);

      // Forms
      expect(metrics.formFields.metrics.totalInputs).to.equal(2);
      expect(metrics.formFields.metrics.standardNamedFields).to.equal(2); // email, first_name
      expect(metrics.formFields.metrics.fieldsWithLabels).to.equal(2);

      // Autocomplete
      expect(metrics.formAutocomplete.metrics.fieldsWithAutocomplete).to.equal(1); // One has autocomplete
    });

    it('should collect essential rendered metrics correctly', () => {
      const $ = cheerio.load(renderedHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'rendered');

      // Data Attributes
      expect(metrics.dataAttributes.metrics.hasDataState).to.be.true;
      expect(metrics.dataAttributes.metrics.hasValidationState).to.be.true;
      expect(metrics.dataAttributes.metrics.hasAgentVisibilityControl).to.be.true;

      // Error Handling
      expect(metrics.errorHandling.metrics.hasPersistentErrors).to.be.true; // role=alert + aria-live
    });
  });

  describe('calculateServedScore', () => {
    it('should calculate a high score for optimized served HTML', () => {
      const $ = cheerio.load(servedHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');
      const score = calculateServedScore(metrics);

      // Breakdown estimate:
      // Semantic HTML: ~20 (Main, Nav, Header, Footer, Article)
      // Forms: 25 (100% standard names + 100% labels)
      // Autocomplete: 7.5 (50% coverage * 15)
      // Schema: 15
      // llms.txt: 10
      // Tables: 10 (none exist, so full points)
      // Robots: 0 (undefined)
      // Total approx: 87.5
      expect(score).to.be.above(80);
    });

    it('should calculate a lower score for poor HTML', () => {
      const poorHtml = `
            <div>
                <div class="header">Header</div>
                <div class="content">
                    <form>
                        <input name="field1"> <!-- Non-standard name, no label -->
                    </form>
                </div>
            </div>
        `;
      const $ = cheerio.load(poorHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');
      const score = calculateServedScore(metrics);

      expect(score).to.be.below(50);
    });
  });

  describe('calculateRenderedScore', () => {
    it('should include rendered metrics in the score', () => {
      const $ = cheerio.load(renderedHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'rendered');
      const score = calculateRenderedScore(metrics);

      // Should be at least as high as served score (handles edge case where both = 100)
      const servedScore = calculateServedScore(metrics);

      // Rendered bonuses:
      // hasDataState: 7
      // hasValidationState: 5
      // hasLoadingIndicators: 3
      // hasPersistentErrors: 10
      // Total bonus: 25
      // Since servedScore + bonus exceeds 100, both scores hit the cap
      expect(score).to.be.at.least(servedScore); // Handles edge case where both = 100
      expect(score).to.equal(100); // Verify rendered score hits the cap
    });
  });

  describe('generateFeedback', () => {
    it('should generate recommendations for missing features', () => {
      const poorHtml = `
            <html><body><div>Content</div></body></html>
        `;
      const $ = cheerio.load(poorHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');
      const feedback = generateFeedback(metrics);

      expect(feedback.essentialIssues).to.include('No <main> element - agents cannot identify primary content');
      expect(feedback.recommendations).to.include('Add <main> element around primary page content');
      expect(feedback.recommendations).to.include('Add JSON-LD with Schema.org vocabulary for key content');
      expect(feedback.recommendations).to.include('Add llms.txt file at site root for LLM agent discovery (see llmstxt.org)');
    });
  });

  describe('Heading Hierarchy (Gap 3)', () => {
    it('should detect perfect heading hierarchy', () => {
      const perfectHtml = `
        <html><body>
          <h1>Main Title</h1>
          <h2>Section 1</h2>
          <h3>Subsection 1.1</h3>
          <h3>Subsection 1.2</h3>
          <h2>Section 2</h2>
        </body></html>
      `;
      const $ = cheerio.load(perfectHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');

      expect(metrics.headingHierarchy.metrics.hasH1).to.be.true;
      expect(metrics.headingHierarchy.metrics.multipleH1).to.be.false;
      expect(metrics.headingHierarchy.metrics.headingJumps).to.equal(0);
      expect(metrics.headingHierarchy.metrics.hasPerfectHierarchy).to.be.true;

      const score = calculateServedScore(metrics);
      expect(score).to.be.above(0);
    });

    it('should detect heading level jumps', () => {
      const jumpHtml = `
        <html><body>
          <h1>Main Title</h1>
          <h3>Skipped h2</h3>
          <h2>Back to h2</h2>
        </body></html>
      `;
      const $ = cheerio.load(jumpHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');

      expect(metrics.headingHierarchy.metrics.headingJumps).to.equal(1);
      expect(metrics.headingHierarchy.metrics.hasPerfectHierarchy).to.be.false;

      const feedback = generateFeedback(metrics);
      expect(feedback.essentialIssues.some((issue) => issue.includes('heading level jump'))).to.be.true;
    });

    it('should detect multiple h1 headings', () => {
      const multipleH1Html = `
        <html><body>
          <h1>First Title</h1>
          <h1>Second Title</h1>
        </body></html>
      `;
      const $ = cheerio.load(multipleH1Html);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');

      expect(metrics.headingHierarchy.metrics.multipleH1).to.be.true;
      expect(metrics.headingHierarchy.metrics.hasPerfectHierarchy).to.be.false;

      const feedback = generateFeedback(metrics);
      expect(feedback.essentialIssues.some((issue) => issue.includes('multiple <h1>'))).to.be.true;
    });
  });

  describe('Pre-rendering Detection (Gap 9)', () => {
    it('should detect Next.js with content', () => {
      const nextHtml = `
        <html><body>
          <script id="__NEXT_DATA__" type="application/json">{}</script>
          <main><div>Rendered content</div></main>
        </body></html>
      `;
      const $ = cheerio.load(nextHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');

      expect(metrics.prerendering.metrics.hasNextData).to.be.true;
      expect(metrics.prerendering.metrics.hasSSRFramework).to.be.true;
      expect(metrics.prerendering.metrics.hasPrerenderedContent).to.be.true;
      expect(metrics.prerendering.metrics.hasEmptySPARoot).to.be.false;

      const score = calculateServedScore(metrics);
      expect(score).to.be.above(0);
    });

    it('should detect empty SPA root', () => {
      const emptySPAHtml = `
        <html><body>
          <div id="root"></div>
        </body></html>
      `;
      const $ = cheerio.load(emptySPAHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');

      expect(metrics.prerendering.metrics.hasSPARoot).to.be.true;
      expect(metrics.prerendering.metrics.spaRootHasContent).to.be.false;
      expect(metrics.prerendering.metrics.hasEmptySPARoot).to.be.true;

      const feedback = generateFeedback(metrics);
      expect(feedback.essentialIssues.some((issue) => issue.includes('root element is empty'))).to.be.true;
    });

    it('should detect Nuxt.js', () => {
      const nuxtHtml = `
        <html><body>
          <div id="__NUXT__"></div>
          <main><div>Nuxt content</div></main>
        </body></html>
      `;
      const $ = cheerio.load(nuxtHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');

      expect(metrics.prerendering.metrics.hasNuxtData).to.be.true;
      expect(metrics.prerendering.metrics.hasSSRFramework).to.be.true;
    });
  });

  describe('PDF Content Detection (Gap 12)', () => {
    it('should detect PDF with HTML alternative', () => {
      const pdfWithAltHtml = `
        <html><body>
          <section>
            <h2>Annual Report</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p>
            <a href="/report.pdf">Download PDF</a>
          </section>
        </body></html>
      `;
      const $ = cheerio.load(pdfWithAltHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');

      expect(metrics.pdfContent.metrics.pdfCount).to.equal(1);
      expect(metrics.pdfContent.metrics.pdfWithAlternatives).to.equal(1);
      expect(metrics.pdfContent.metrics.hasPDFWithHTML).to.be.true;

      const score = calculateServedScore(metrics);
      expect(score).to.be.above(0);
    });

    it('should detect PDF-only content', () => {
      const pdfOnlyHtml = `
        <html><body>
          <a href="/report.pdf">Report</a>
        </body></html>
      `;
      const $ = cheerio.load(pdfOnlyHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');

      expect(metrics.pdfContent.metrics.pdfCount).to.equal(1);
      expect(metrics.pdfContent.metrics.pdfWithoutAlternatives).to.equal(1);
      expect(metrics.pdfContent.metrics.hasPDFOnly).to.be.true;

      const feedback = generateFeedback(metrics);
      expect(feedback.essentialIssues.some((issue) => issue.includes('PDF link(s) without HTML alternatives'))).to.be.true;
    });
  });

  describe('SSR Framework Detection (Gap 14)', () => {
    it('should detect Next.js with content', () => {
      const nextHtml = `
        <html><body>
          <script id="__NEXT_DATA__" type="application/json">{}</script>
          <main><article>Content</article></main>
        </body></html>
      `;
      const $ = cheerio.load(nextHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');

      expect(metrics.ssrFrameworks.metrics.isNextJS).to.be.true;
      expect(metrics.ssrFrameworks.metrics.hasSSRFramework).to.be.true;
      expect(metrics.ssrFrameworks.metrics.ssrWithContent).to.be.true;
      expect(metrics.ssrFrameworks.metrics.ssrWithoutContent).to.be.false;

      const score = calculateServedScore(metrics);
      expect(score).to.be.above(0);
    });

    it('should detect SSR framework without content', () => {
      const emptySSRHtml = `
        <html><body>
          <script id="__NEXT_DATA__" type="application/json">{}</script>
          <main></main>
        </body></html>
      `;
      const $ = cheerio.load(emptySSRHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');

      expect(metrics.ssrFrameworks.metrics.hasSSRFramework).to.be.true;
      expect(metrics.ssrFrameworks.metrics.ssrWithoutContent).to.be.true;

      const feedback = generateFeedback(metrics);
      expect(feedback.essentialIssues.some((issue) => issue.includes('but <main> element is empty'))).to.be.true;
    });

    it('should detect Next.js by script src', () => {
      const nextScriptHtml = `
        <html><body>
          <script src="/_next/static/chunks/main.js"></script>
          <main><div>Content</div></main>
        </body></html>
      `;
      const $ = cheerio.load(nextScriptHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');

      expect(metrics.ssrFrameworks.metrics.isNextJS).to.be.true;
    });

    it('should detect Nuxt.js', () => {
      const nuxtHtml = `
        <html><body>
          <div id="__NUXT__"></div>
          <main><div>Nuxt content</div></main>
        </body></html>
      `;
      const $ = cheerio.load(nuxtHtml);
      const metrics = collectLLMMetrics($, 'https://example.com', 'served');

      expect(metrics.ssrFrameworks.metrics.isNuxtJS).to.be.true;
      expect(metrics.ssrFrameworks.metrics.hasSSRFramework).to.be.true;
      expect(metrics.ssrFrameworks.metrics.ssrWithContent).to.be.true;
    });
  });
});
