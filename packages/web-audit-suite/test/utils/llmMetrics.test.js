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

      // Should be higher than just the served score because of data attributes and error handling
      const servedScore = calculateServedScore(metrics);
      expect(score).to.be.above(servedScore);

      // Rendered bonuses:
      // hasDataState: 7
      // hasValidationState: 5
      // hasLoadingIndicators: 3
      // hasPersistentErrors: 10
      // Total bonus: 25
      // Check that it's higher and hits the cap if applicable
      expect(score).to.be.above(servedScore);
      // Since servedScore is ~88 and bonus is 25, it hits the 100 cap
      expect(score).to.equal(100);
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
});
