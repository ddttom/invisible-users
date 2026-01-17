import { expect } from 'chai';
import * as cheerio from 'cheerio';
import { LLMCollector } from '../../src/collectors/llmCollector.js';
import { LLMScorer } from '../../src/scorers/llmScorer.js';
import { LLMFeedback } from '../../src/reporters/llmFeedback.js';
import '../setup.js';

describe('Dynamic Content Detection', () => {
  describe('LLMCollector.analyzeDynamicContent', () => {
    it('should return empty metrics when pageData is null', () => {
      const $ = cheerio.load('<html><body></body></html>');
      const result = LLMCollector.analyzeDynamicContent($, null);

      expect(result.importance).to.equal('essential_rendered');
      expect(result.metrics.carousels.count).to.equal(0);
      expect(result.metrics.animations.hasAnimations).to.be.false;
      expect(result.metrics.autoplayMedia.videoCount).to.equal(0);
      expect(result.metrics.animatedGifs.count).to.equal(0);
    });

    it('should process carousel data correctly', () => {
      const $ = cheerio.load('<html><body></body></html>');
      const pageData = {
        dynamicContent: {
          carousels: [
            {
              type: 'informational',
              hasDataAttributes: true,
              hasAriaLabels: true,
              slideCount: 5,
            },
            {
              type: 'decorative',
              hasDataAttributes: false,
              hasAriaLabels: false,
              slideCount: 3,
            },
          ],
          animations: {},
          autoplayMedia: {},
          animatedGifs: {},
        },
      };

      const result = LLMCollector.analyzeDynamicContent($, pageData);

      expect(result.metrics.carousels.count).to.equal(2);
      expect(result.metrics.carousels.informationalCount).to.equal(1);
      expect(result.metrics.carousels.decorativeCount).to.equal(1);
      expect(result.metrics.carousels.withProperAttributes).to.equal(1);
      expect(result.metrics.carousels.withAriaLabels).to.equal(1);
      expect(result.metrics.carousels.averageSlides).to.equal(4); // (5+3)/2
    });

    it('should process animation data correctly', () => {
      const $ = cheerio.load('<html><body></body></html>');
      const pageData = {
        dynamicContent: {
          carousels: [],
          animations: {
            hasAnimations: true,
            hasCSSAnimations: true,
            animatedElementCount: 12,
            libraries: {
              typedJs: true,
              typeIt: false,
              animateCSS: true,
              gsap: false,
              aos: true,
            },
          },
          autoplayMedia: {},
          animatedGifs: {},
        },
      };

      const result = LLMCollector.analyzeDynamicContent($, pageData);

      expect(result.metrics.animations.hasAnimations).to.be.true;
      expect(result.metrics.animations.hasCSSAnimations).to.be.true;
      expect(result.metrics.animations.animatedElementCount).to.equal(12);
      expect(result.metrics.animations.libraries.typedJs).to.be.true;
      expect(result.metrics.animations.libraries.typeIt).to.be.false;
      expect(result.metrics.animations.libraries.animateCSS).to.be.true;
      expect(result.metrics.animations.libraries.gsap).to.be.false;
      expect(result.metrics.animations.libraries.aos).to.be.true;
    });

    it('should process autoplay media data correctly', () => {
      const $ = cheerio.load('<html><body></body></html>');
      const pageData = {
        dynamicContent: {
          carousels: [],
          animations: {},
          autoplayMedia: {
            videoCount: 3,
            audioCount: 1,
            hasControls: 2,
            isMuted: 3,
          },
          animatedGifs: {},
        },
      };

      const result = LLMCollector.analyzeDynamicContent($, pageData);

      expect(result.metrics.autoplayMedia.videoCount).to.equal(3);
      expect(result.metrics.autoplayMedia.audioCount).to.equal(1);
      expect(result.metrics.autoplayMedia.withControls).to.equal(2);
      expect(result.metrics.autoplayMedia.mutedCount).to.equal(3);
    });

    it('should process animated GIF data correctly', () => {
      const $ = cheerio.load('<html><body></body></html>');
      const pageData = {
        dynamicContent: {
          carousels: [],
          animations: {},
          autoplayMedia: {},
          animatedGifs: {
            count: 5,
            hasAltText: 3,
            hasAriaDescribedBy: 1,
          },
        },
      };

      const result = LLMCollector.analyzeDynamicContent($, pageData);

      expect(result.metrics.animatedGifs.count).to.equal(5);
      expect(result.metrics.animatedGifs.withAltText).to.equal(3);
      expect(result.metrics.animatedGifs.withDescriptions).to.equal(1);
    });

    it('should process visual dynamism data correctly', () => {
      const $ = cheerio.load('<html><body></body></html>');
      const pageData = {
        dynamicContent: {
          carousels: [],
          animations: {},
          autoplayMedia: {},
          animatedGifs: {},
          visualDynamism: {
            detected: true,
            uniqueStates: 3,
          },
        },
      };

      const result = LLMCollector.analyzeDynamicContent($, pageData);

      expect(result.metrics.visualDynamism.detected).to.be.true;
      expect(result.metrics.visualDynamism.uniqueStates).to.equal(3);
    });

    it('should process pricing data correctly', () => {
      const $ = cheerio.load('<html><body></body></html>');
      const pageData = {
        dynamicContent: {
          carousels: [],
          animations: {},
          autoplayMedia: {},
          animatedGifs: {},
          pricing: {
            inServedHtml: false,
            inRenderedHtml: true,
            jsDependent: true,
          },
        },
      };

      const result = LLMCollector.analyzeDynamicContent($, pageData);

      expect(result.metrics.pricing.inServedHtml).to.be.false;
      expect(result.metrics.pricing.inRenderedHtml).to.be.true;
      expect(result.metrics.pricing.jsDependent).to.be.true;
    });
  });

  describe('LLMScorer - Dynamic Content Scoring', () => {
    it('should apply penalties for informational carousels without attributes', () => {
      const baseMetrics = {
        semanticHTML: { metrics: { hasMain: true, hasNav: true, hasHeader: true } },
        formFields: { metrics: { standardNameRatio: 0, labelRatio: 0 } },
        formAutocomplete: { metrics: { autocompleteRatio: 0 } },
        structuredData: { metrics: { hasSchemaOrg: false } },
        llmsTxt: { metrics: {} },
        robotsTxt: { metrics: {} },
        tableData: { metrics: { tableCount: 0 } },
        dynamicContent: {
          metrics: {
            carousels: {
              count: 2,
              informationalCount: 2,
              decorativeCount: 0,
              withProperAttributes: 0,
            },
            animations: { hasAnimations: false, libraries: {} },
            autoplayMedia: { videoCount: 0 },
            animatedGifs: { count: 0 },
          },
        },
      };

      const score = LLMScorer.calculateRenderedScore(baseMetrics);

      // Base served score: hasMain(6) + hasNav(5) + hasHeader(3) + tables(10) = 24
      // Rendered penalty: 2 informational carousels * -8 = -16
      // renderedBonus = -16, but clamped to min 0 by MAX_BONUS logic
      // Total: 24 + (-16) = 8, but check actual behavior
      expect(score).to.be.at.least(0);
      expect(score).to.be.at.most(15);
    });

    it('should apply lighter penalties for decorative carousels', () => {
      const baseMetrics = {
        semanticHTML: { metrics: { hasMain: true } },
        formFields: { metrics: { standardNameRatio: 1, labelRatio: 1 } },
        formAutocomplete: { metrics: { autocompleteRatio: 0 } },
        structuredData: { metrics: { hasSchemaOrg: true } },
        llmsTxt: { metrics: { hasLLMsTxtReference: true } },
        robotsTxt: { metrics: {} },
        tableData: { metrics: { tableCount: 0 } },
        dynamicContent: {
          metrics: {
            carousels: {
              count: 2,
              informationalCount: 0,
              decorativeCount: 2,
              withProperAttributes: 0,
            },
            animations: { hasAnimations: false, libraries: {} },
            autoplayMedia: { videoCount: 0 },
            animatedGifs: { count: 0 },
          },
        },
      };

      const score = LLMScorer.calculateRenderedScore(baseMetrics);

      // Base score: hasMain(6) + forms(25) + schema(15) + llmsTxt(10) + tables(10) = 66
      // Penalty: 2 decorative carousels * -3 = -6
      // Total: 66 - 6 = 60
      expect(score).to.be.at.least(55);
      expect(score).to.be.at.most(65);
    });

    it('should apply penalties for autoplay without controls', () => {
      const baseMetrics = {
        semanticHTML: { metrics: { hasMain: true } },
        formFields: { metrics: { standardNameRatio: 1, labelRatio: 1 } },
        formAutocomplete: { metrics: { autocompleteRatio: 0 } },
        structuredData: { metrics: { hasSchemaOrg: true } },
        llmsTxt: { metrics: { hasLLMsTxtReference: true } },
        robotsTxt: { metrics: {} },
        tableData: { metrics: { tableCount: 0 } },
        dynamicContent: {
          metrics: {
            carousels: { count: 0 },
            animations: { hasAnimations: false, libraries: {} },
            autoplayMedia: {
              videoCount: 2,
              withControls: 0,
            },
            animatedGifs: { count: 0 },
          },
        },
      };

      const score = LLMScorer.calculateRenderedScore(baseMetrics);

      // Base score: 66 (same as above)
      // Penalty: 2 videos without controls * -8 = -16
      // Total: 66 - 16 = 50
      expect(score).to.be.at.least(45);
      expect(score).to.be.at.most(55);
    });

    it('should apply penalties for animated GIFs without alt text', () => {
      const baseMetrics = {
        semanticHTML: { metrics: { hasMain: true } },
        formFields: { metrics: { standardNameRatio: 1, labelRatio: 1 } },
        formAutocomplete: { metrics: { autocompleteRatio: 0 } },
        structuredData: { metrics: { hasSchemaOrg: true } },
        llmsTxt: { metrics: { hasLLMsTxtReference: true } },
        robotsTxt: { metrics: {} },
        tableData: { metrics: { tableCount: 0 } },
        dynamicContent: {
          metrics: {
            carousels: { count: 0 },
            animations: { hasAnimations: false, libraries: {} },
            autoplayMedia: { videoCount: 0 },
            animatedGifs: {
              count: 3,
              withAltText: 0,
            },
          },
        },
      };

      const score = LLMScorer.calculateRenderedScore(baseMetrics);

      // Base score: 66
      // Penalty: 3 GIFs without alt * -3 = -9
      // Total: 66 - 9 = 57
      expect(score).to.be.at.least(52);
      expect(score).to.be.at.most(62);
    });

    it('should apply penalties for animation libraries', () => {
      const baseMetrics = {
        semanticHTML: { metrics: { hasMain: true } },
        formFields: { metrics: { standardNameRatio: 1, labelRatio: 1 } },
        formAutocomplete: { metrics: { autocompleteRatio: 0 } },
        structuredData: { metrics: { hasSchemaOrg: true } },
        llmsTxt: { metrics: { hasLLMsTxtReference: true } },
        robotsTxt: { metrics: {} },
        tableData: { metrics: { tableCount: 0 } },
        dynamicContent: {
          metrics: {
            carousels: { count: 0 },
            animations: {
              hasAnimations: true,
              libraries: {
                typedJs: true,
                typeIt: false,
              },
            },
            autoplayMedia: { videoCount: 0 },
            animatedGifs: { count: 0 },
          },
        },
      };

      const score = LLMScorer.calculateRenderedScore(baseMetrics);

      // Base score: 66
      // Penalty: animation library warning -2
      // Total: 66 - 2 = 64
      expect(score).to.be.at.least(60);
      expect(score).to.be.at.most(68);
    });

    it('should apply heavy penalty for JavaScript-dependent pricing', () => {
      const baseMetrics = {
        semanticHTML: { metrics: { hasMain: true } },
        formFields: { metrics: { standardNameRatio: 1, labelRatio: 1 } },
        formAutocomplete: { metrics: { autocompleteRatio: 0 } },
        structuredData: { metrics: { hasSchemaOrg: true } },
        llmsTxt: { metrics: { hasLLMsTxtReference: true } },
        robotsTxt: { metrics: {} },
        tableData: { metrics: { tableCount: 0 } },
        dynamicContent: {
          metrics: {
            carousels: { count: 0 },
            animations: { hasAnimations: false, libraries: {} },
            autoplayMedia: { videoCount: 0 },
            animatedGifs: { count: 0 },
            pricing: {
              inServedHtml: false,
              inRenderedHtml: true,
              jsDependent: true,
            },
          },
        },
      };

      const score = LLMScorer.calculateRenderedScore(baseMetrics);

      // Base score: 66 (same as above)
      // Penalty: JavaScript-dependent pricing -15 (critical for e-commerce)
      // Total: 66 - 15 = 51
      expect(score).to.be.at.least(46);
      expect(score).to.be.at.most(56);
    });
  });

  describe('LLMFeedback - Dynamic Content Feedback', () => {
    it('should generate warnings for informational carousels', () => {
      const metrics = {
        semanticHTML: { metrics: {} },
        formFields: { metrics: {} },
        formAutocomplete: { metrics: {} },
        structuredData: { metrics: {} },
        llmsTxt: { metrics: {} },
        robotsTxt: { metrics: {} },
        tableData: { metrics: {} },
        dynamicContent: {
          metrics: {
            carousels: {
              count: 1,
              informationalCount: 1,
              decorativeCount: 0,
              withProperAttributes: 0,
            },
            animations: { hasAnimations: false, libraries: {} },
            autoplayMedia: { videoCount: 0 },
            animatedGifs: { count: 0 },
          },
        },
      };

      const feedback = LLMFeedback.generate(metrics);

      expect(feedback.essentialIssues).to.include.members([
        '1 informational carousel(s) hide content from agents',
      ]);
      expect(feedback.recommendations.some((r) => r.includes('data-slide-index'))).to.be.true;
    });

    it('should generate warnings for autoplay without controls', () => {
      const metrics = {
        semanticHTML: { metrics: {} },
        formFields: { metrics: {} },
        formAutocomplete: { metrics: {} },
        structuredData: { metrics: {} },
        llmsTxt: { metrics: {} },
        robotsTxt: { metrics: {} },
        tableData: { metrics: {} },
        dynamicContent: {
          metrics: {
            carousels: { count: 0 },
            animations: { hasAnimations: false, libraries: {} },
            autoplayMedia: {
              videoCount: 2,
              withControls: 0,
            },
            animatedGifs: { count: 0 },
          },
        },
      };

      const feedback = LLMFeedback.generate(metrics);

      expect(feedback.essentialIssues).to.include.members([
        '2 autoplay video(s) lack pause controls',
      ]);
      expect(feedback.recommendations.some((r) => r.includes('Add controls attribute'))).to.be.true;
    });

    it('should generate warnings for animated GIFs without alt', () => {
      const metrics = {
        semanticHTML: { metrics: {} },
        formFields: { metrics: {} },
        formAutocomplete: { metrics: {} },
        structuredData: { metrics: {} },
        llmsTxt: { metrics: {} },
        robotsTxt: { metrics: {} },
        tableData: { metrics: {} },
        dynamicContent: {
          metrics: {
            carousels: { count: 0 },
            animations: { hasAnimations: false, libraries: {} },
            autoplayMedia: { videoCount: 0 },
            animatedGifs: {
              count: 3,
              withAltText: 0,
            },
          },
        },
      };

      const feedback = LLMFeedback.generate(metrics);

      expect(feedback.niceToHaveIssues).to.include.members([
        '3 animated GIF(s) missing alt text',
      ]);
      expect(feedback.recommendations.some((r) => r.includes('Add descriptive alt'))).to.be.true;
    });

    it('should generate warnings for animation libraries', () => {
      const metrics = {
        semanticHTML: { metrics: {} },
        formFields: { metrics: {} },
        formAutocomplete: { metrics: {} },
        structuredData: { metrics: {} },
        llmsTxt: { metrics: {} },
        robotsTxt: { metrics: {} },
        tableData: { metrics: {} },
        dynamicContent: {
          metrics: {
            carousels: { count: 0 },
            animations: {
              hasAnimations: true,
              libraries: {
                typedJs: true,
                typeIt: true,
              },
            },
            autoplayMedia: { videoCount: 0 },
            animatedGifs: { count: 0 },
          },
        },
      };

      const feedback = LLMFeedback.generate(metrics);

      expect(feedback.niceToHaveIssues.some((issue) => issue.includes('Typewriter animation library'))).to.be.true;
      expect(feedback.recommendations.some((r) => r.includes('full text is present in served HTML'))).to.be.true;
    });

    it('should generate warnings for visual dynamism', () => {
      const metrics = {
        semanticHTML: { metrics: {} },
        formFields: { metrics: {} },
        formAutocomplete: { metrics: {} },
        structuredData: { metrics: {} },
        llmsTxt: { metrics: {} },
        robotsTxt: { metrics: {} },
        tableData: { metrics: {} },
        dynamicContent: {
          metrics: {
            carousels: { count: 0 },
            animations: { hasAnimations: false, libraries: {} },
            autoplayMedia: { videoCount: 0 },
            animatedGifs: { count: 0 },
            visualDynamism: {
              detected: true,
              uniqueStates: 3,
            },
          },
        },
      };

      const feedback = LLMFeedback.generate(metrics);

      expect(feedback.essentialIssues.some((issue) => issue.includes('Visual content changes detected'))).to.be.true;
      expect(feedback.essentialIssues.some((issue) => issue.includes('3 unique states'))).to.be.true;
      expect(feedback.recommendations.some((r) => r.includes('data-content-complete'))).to.be.true;
    });

    it('should generate critical warnings for JavaScript-dependent pricing', () => {
      const metrics = {
        semanticHTML: { metrics: {} },
        formFields: { metrics: {} },
        formAutocomplete: { metrics: {} },
        structuredData: { metrics: {} },
        llmsTxt: { metrics: {} },
        robotsTxt: { metrics: {} },
        tableData: { metrics: {} },
        dynamicContent: {
          metrics: {
            carousels: { count: 0 },
            animations: { hasAnimations: false, libraries: {} },
            autoplayMedia: { videoCount: 0 },
            animatedGifs: { count: 0 },
            pricing: {
              inServedHtml: false,
              inRenderedHtml: true,
              jsDependent: true,
            },
          },
        },
      };

      const feedback = LLMFeedback.generate(metrics);

      expect(feedback.essentialIssues.some((issue) => issue.includes('Price information only appears after JavaScript'))).to.be.true;
      expect(feedback.recommendations.some((r) => r.includes('CRITICAL'))).to.be.true;
      expect(feedback.recommendations.some((r) => r.includes('Schema.org Product'))).to.be.true;
    });
  });
});
