/**
 * Pattern Extraction Test Suite
 * Tests the extraction of successful patterns from high-scoring pages
 */

import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs/promises';
import { extractPatterns } from '../../src/utils/patternExtraction.js';

describe('Pattern Extraction', () => {
  let mockContext;
  let mockOutputDir;
  let fsStub;

  beforeEach(() => {
    // Setup mock context
    mockContext = {
      logger: {
        info: sinon.spy(),
        warn: sinon.spy(),
        error: sinon.spy(),
      },
    };

    mockOutputDir = '/fake/output';

    // Stub fs.writeFile to prevent actual file writes
    fsStub = sinon.stub(fs, 'writeFile').resolves();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Page Filtering', () => {
    it('should identify pages with served score ≥70', async () => {
      const mockResults = [
        createMockPage({ servedScore: 75, renderedScore: 75 }),
        createMockPage({ servedScore: 65, renderedScore: 80 }),
        createMockPage({ servedScore: 85, renderedScore: 90 }),
      ];

      const result = await extractPatterns(mockResults, mockOutputDir, mockContext);

      expect(result.success).to.be.true;
      expect(result.pagesAnalyzed).to.equal(2); // Only pages with both scores ≥70
    });

    it('should identify pages with rendered score ≥70', async () => {
      const mockResults = [
        createMockPage({ servedScore: 75, renderedScore: 75 }),
        createMockPage({ servedScore: 80, renderedScore: 65 }),
        createMockPage({ servedScore: 85, renderedScore: 90 }),
      ];

      const result = await extractPatterns(mockResults, mockOutputDir, mockContext);

      expect(result.success).to.be.true;
      expect(result.pagesAnalyzed).to.equal(2); // Both scores must be ≥70
    });

    it('should skip pages below threshold', async () => {
      const mockResults = [
        createMockPage({ servedScore: 60, renderedScore: 65 }),
        createMockPage({ servedScore: 65, renderedScore: 60 }),
        createMockPage({ servedScore: 50, renderedScore: 55 }),
      ];

      const result = await extractPatterns(mockResults, mockOutputDir, mockContext);

      expect(result.success).to.be.false;
      expect(result.message).to.include('No high-scoring pages found');
      expect(result.pagesAnalyzed).to.be.undefined;
    });

    it('should handle mixed scores (one above, one below)', async () => {
      const mockResults = [
        createMockPage({ servedScore: 75, renderedScore: 65 }), // Fail: rendered too low
        createMockPage({ servedScore: 65, renderedScore: 75 }), // Fail: served too low
        createMockPage({ servedScore: 80, renderedScore: 85 }), // Pass: both high
      ];

      const result = await extractPatterns(mockResults, mockOutputDir, mockContext);

      expect(result.success).to.be.true;
      expect(result.pagesAnalyzed).to.equal(1);
    });

    it('should handle missing score data gracefully', async () => {
      const mockResults = [
        { url: 'https://example.com/page1' }, // No llmMetrics
        createMockPage({ servedScore: 80, renderedScore: 85 }),
      ];

      const result = await extractPatterns(mockResults, mockOutputDir, mockContext);

      expect(result.success).to.be.true;
      expect(result.pagesAnalyzed).to.equal(1);
    });
  });

  describe('Pattern Category Extraction', () => {
    it('should extract Structured Data (JSON-LD) patterns', async () => {
      const mockResults = [
        createMockPage({
          servedScore: 80,
          renderedScore: 85,
          html: '<script type="application/ld+json">{"@type":"Product","name":"Test Product"}</script>',
        }),
      ];

      const result = await extractPatterns(mockResults, mockOutputDir, mockContext);

      expect(result.patterns.structuredData).to.exist;
      expect(result.patterns.structuredData.examples).to.be.an('array');
    });

    it('should extract Semantic HTML patterns', async () => {
      const mockResults = [
        createMockPage({
          servedScore: 80,
          renderedScore: 85,
          hasMain: true,
          hasNav: true,
          hasArticle: true,
        }),
      ];

      const result = await extractPatterns(mockResults, mockOutputDir, mockContext);

      expect(result.patterns.semanticHTML).to.exist;
      expect(result.patterns.semanticHTML.examples).to.be.an('array');
    });

    it('should limit to 5 examples per pattern', async () => {
      // Create 10 high-scoring pages
      const mockResults = Array.from({ length: 10 }, (_, i) => createMockPage({
        servedScore: 80,
        renderedScore: 85,
        url: `https://example.com/page${i}`,
      }));

      const result = await extractPatterns(mockResults, mockOutputDir, mockContext, {
        maxExamples: 5,
      });

      expect(result.success).to.be.true;
      // Each pattern category should have at most 5 examples
      Object.values(result.patterns).forEach((pattern) => {
        if (pattern.examples) {
          expect(pattern.examples.length).to.be.at.most(5);
        }
      });
    });
  });

  describe('Report Generation', () => {
    it('should generate pattern_library.md', async () => {
      const mockResults = [
        createMockPage({ servedScore: 80, renderedScore: 85 }),
      ];

      await extractPatterns(mockResults, mockOutputDir, mockContext);

      expect(fsStub.called).to.be.true;
      const calls = fsStub.getCalls();
      const patternLibraryCall = calls.find((call) => call.args[0].includes('pattern_library.md'));
      expect(patternLibraryCall).to.exist;
    });

    it('should include methodology section in report', async () => {
      const mockResults = [
        createMockPage({ servedScore: 80, renderedScore: 85 }),
      ];

      await extractPatterns(mockResults, mockOutputDir, mockContext);

      const reportContent = fsStub.getCall(0).args[1];
      expect(reportContent).to.include('Methodology');
      expect(reportContent).to.include('high-scoring pages');
    });
  });

  describe('Custom Options', () => {
    it('should accept custom minimum served score threshold', async () => {
      const mockResults = [
        createMockPage({ servedScore: 60, renderedScore: 75 }),
        createMockPage({ servedScore: 75, renderedScore: 80 }),
      ];

      const result = await extractPatterns(mockResults, mockOutputDir, mockContext, {
        minServedScore: 60,
        minRenderedScore: 70,
      });

      expect(result.success).to.be.true;
      expect(result.pagesAnalyzed).to.equal(2);
    });

    it('should accept custom maximum examples count', async () => {
      const mockResults = Array.from({ length: 10 }, (_, i) => createMockPage({
        servedScore: 80,
        renderedScore: 85,
        url: `https://example.com/page${i}`,
      }));

      const result = await extractPatterns(mockResults, mockOutputDir, mockContext, {
        maxExamples: 3,
      });

      expect(result.success).to.be.true;
      Object.values(result.patterns).forEach((pattern) => {
        if (pattern.examples) {
          expect(pattern.examples.length).to.be.at.most(3);
        }
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle empty results array', async () => {
      const result = await extractPatterns([], mockOutputDir, mockContext);

      expect(result.success).to.be.false;
      expect(result.message).to.include('No high-scoring pages found');
    });

    it('should log extraction progress', async () => {
      const mockResults = [
        createMockPage({ servedScore: 80, renderedScore: 85 }),
        createMockPage({ servedScore: 75, renderedScore: 80 }),
      ];

      await extractPatterns(mockResults, mockOutputDir, mockContext);

      expect(mockContext.logger.info.called).to.be.true;
      const logCalls = mockContext.logger.info.getCalls();
      const progressLog = logCalls.find((call) => call.args[0].includes('Found 2 high-scoring pages'));
      expect(progressLog).to.exist;
    });
  });
});

// Helper function to create mock page data
function createMockPage(overrides = {}) {
  const {
    url = 'https://example.com/test',
    servedScore = 75,
    renderedScore = 80,
    hasMain = true,
    hasNav = true,
    hasArticle = false,
    html = '<main><h1>Test</h1></main>',
  } = overrides;

  // Generate features to approximate target served score
  // Scoring: semantic(20) + structured(25) + forms(15) + llms.txt(10) + security(10) + robots(15) = 95 max

  // Strategy: Use threshold-based feature generation
  // Score ranges: <60: minimal, 60-69: moderate (need ~60-69 points), 70+: full (need 70+ points)
  const isHighServed = servedScore >= 70;
  const isModerateServed = servedScore >= 60;
  const isHighRendered = renderedScore >= 70;

  const semanticHTML = {
    metrics: {
      hasMain,
      hasNav,
      hasHeader: isModerateServed,
      hasFooter: isModerateServed,
      hasArticle,
      hasSection: isModerateServed,
    },
  };

  // For 60-69 range: need more structured data and better forms
  const structuredData = {
    metrics: {
      structuredDataCount: isHighServed ? 3 : (isModerateServed ? 2 : 0),
      structuredDataTypes: isHighServed ? ['Organization', 'WebPage', 'Article'] : (isModerateServed ? ['Organization', 'WebPage'] : []),
    },
  };

  const formPatterns = {
    metrics: {
      formCount: isModerateServed ? 1 : 0,
      standardFieldsCount: isHighServed ? 5 : (isModerateServed ? 5 : 0), // Changed from 3 to 5
      totalFieldsCount: isModerateServed ? 5 : 1,
      autocompleteFieldsCount: isHighServed ? 5 : (isModerateServed ? 5 : 0), // Changed from 3 to 5
      hasValidation: isHighRendered,
    },
  };

  // Include llms.txt for moderate scores too
  const llmsTxt = {
    metrics: {
      hasLLMsTxtReference: isModerateServed, // Changed from isHighServed
      hasLLMsTxtMeta: isModerateServed, // Changed from isHighServed
      llmsTxtUrl: isModerateServed ? '/llms.txt' : null,
    },
  };

  const securityHeaders = {
    metrics: {
      hasHsts: isHighServed,
      hasCSP: isHighServed,
      hasXFrameOptions: isHighServed,
      hasXContentTypeOptions: isHighServed,
    },
  };

  const dataAttributes = {
    metrics: {
      hasValidationState: isHighRendered,
      hasLoadingState: isHighRendered,
      hasAgentVisibilityControl: isHighRendered,
    },
  };

  const errorHandling = {
    metrics: {
      hasPersistentErrors: isHighRendered,
    },
  };

  const ariaAttributes = {
    metrics: {
      hasAriaLive: isHighRendered,
      hasAriaInvalid: isHighRendered,
      hasRoleAlert: isHighRendered,
    },
  };

  const robotsScore = isHighServed ? 85 : (isModerateServed ? 70 : 30); // Changed from 60 to 70

  return {
    url,
    html,
    llmMetrics: [{
      semanticHTML,
      structuredData,
      formPatterns,
      llmsTxt,
      securityHeaders,
      dataAttributes,
      errorHandling,
      ariaAttributes,
      robotsTxt: { score: robotsScore },
    }],
  };
}
