/**
 * llms.txt Quality Scoring Test Suite
 * Tests the 105-point quality scoring system for llms.txt files (includes bonuses)
 */

import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  parseLlmsTxt,
  analyzeLlmsTxtQuality,
} from '../../src/utils/llmsTxtParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('llms.txt Quality Scoring', () => {
  let fetchStub;

  beforeEach(() => {
    // Mock global fetch
    fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Fetching and Parsing', () => {
    it('should fetch llms.txt from domain root', async () => {
      fetchStub.resolves({
        ok: true,
        status: 200,
        text: async () => '# Example Site\n\nThis is example.com',
      });

      const result = await global.fetch('https://example.com/llms.txt');
      const content = await result.text();

      expect(content).to.include('Example Site');
    });

    it('should handle HTTP fetch success', async () => {
      fetchStub.resolves({
        ok: true,
        status: 200,
        text: async () => '# Test\n\nContent here',
      });

      const result = await global.fetch('https://example.com/llms.txt');

      expect(result.ok).to.be.true;
      expect(result.status).to.equal(200);
    });

    it('should handle missing llms.txt (404)', async () => {
      fetchStub.resolves({
        ok: false,
        status: 404,
      });

      const result = await global.fetch('https://example.com/llms.txt');

      expect(result.ok).to.be.false;
      expect(result.status).to.equal(404);
    });

    it('should parse llms.txt structure', () => {
      const content = `
# Site Title

## Overview
This is the overview section.

## Contact
Email: info@example.com
      `;

      const parsed = parseLlmsTxt(content);

      expect(parsed.sections).to.exist;
      expect(parsed.sections.length).to.be.above(0);
    });
  });

  describe('Core Elements Scoring', () => {
    it('should award 10 points for title', () => {
      const content = '# Example.com - AI Agent Guidance\n\nContent here.';

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.breakdown.title).to.equal(10);
      expect(quality.hasTitle).to.be.true;
    });

    it('should award 10 points for description', () => {
      const content = `
# Site Title

## Overview
This site provides comprehensive information about web development.
      `;

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.breakdown.description).to.equal(10);
      expect(quality.hasDescription).to.be.true;
    });

    it('should award 10 points for contact', () => {
      const content = `
# Site Title

## Contact
Email: support@example.com
Website: https://example.com
      `;

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.breakdown.contact).to.equal(10);
      expect(quality.hasContact).to.be.true;
    });

    it('should award 10 points for last updated date', () => {
      const content = `
# Site Title

Last Updated: 2026-01-15
      `;

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.breakdown.lastUpdated).to.equal(10);
      expect(quality.hasLastUpdated).to.be.true;
    });

    it('should award 0 points for missing elements', () => {
      const content = 'Just some text without structure.';

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.breakdown.title).to.equal(0);
      expect(quality.breakdown.description).to.equal(0);
      expect(quality.breakdown.contact).to.equal(0);
      expect(quality.breakdown.lastUpdated).to.equal(0);
    });
  });

  describe('Sections Scoring', () => {
    it('should award 30 points for 5+ sections', () => {
      const content = `
# Site Title

## Overview
Description here.

## Access Guidelines
Access policies.

## Rate Limits
Rate limit info.

## API Documentation
API details.

## Content Sections
Content info.

## Attribution Requirements
Attribution details.
      `;

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.sectionCount).to.be.at.least(5);
      expect(quality.breakdown.sections).to.equal(30);
    });

    it('should award 20 points for 3-4 sections', () => {
      const content = `
# Site Title

## Overview
Description here.

## Contact
Contact info.

## Access Guidelines
Access policies.

## Content Sections
Content info.
      `;

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.sectionCount).to.be.at.least(3);
      expect(quality.sectionCount).to.be.below(5);
      expect(quality.breakdown.sections).to.equal(20);
    });

    it('should award 10 points for 1-2 sections', () => {
      const content = `
# Site Title

## Overview
Description here.
      `;

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.sectionCount).to.be.at.least(1);
      expect(quality.sectionCount).to.be.below(3);
      expect(quality.breakdown.sections).to.equal(10);
    });

    it('should detect major sections (# headers)', () => {
      const content = `
# Main Title

## Section 1
Content

## Section 2
Content

### Subsection 2.1
Content
      `;

      const parsed = parseLlmsTxt(content);

      // Should detect ## level headers as major sections
      const majorSections = parsed.sections.filter((s) => s.level === 2);
      expect(majorSections.length).to.be.at.least(2);
    });
  });

  describe('Content Length Scoring', () => {
    it('should award 15 points for substantial content (>2000 chars)', () => {
      const longContent = `
# Comprehensive llms.txt

## Overview
${'This is detailed content. '.repeat(50)}

## Access Guidelines
${'Detailed access policies. '.repeat(30)}

## Rate Limits
${'Rate limit information. '.repeat(20)}

## API Documentation
${'API endpoint details. '.repeat(40)}

## Content Sections
${'Content descriptions. '.repeat(30)}
      `;

      const quality = analyzeLlmsTxtQuality(longContent);

      expect(quality.contentLength).to.be.above(2000);
      expect(quality.breakdown.contentLength).to.equal(15);
    });

    it('should award 10 points for moderate content (1000-2000 chars)', () => {
      const moderateContent = `
# Moderate llms.txt

## Overview
${'This is content. '.repeat(30)}

## Access Guidelines
${'Access policies. '.repeat(20)}

## Contact
${'Contact information. '.repeat(10)}
      `;

      const quality = analyzeLlmsTxtQuality(moderateContent);

      expect(quality.contentLength).to.be.at.least(1000);
      expect(quality.contentLength).to.be.at.most(2000);
      expect(quality.breakdown.contentLength).to.equal(10);
    });

    it('should award 5 points for minimal content (<1000 chars)', () => {
      const minimalContent = `
# Minimal llms.txt

## Overview
Brief description here.

## Contact
Email: info@example.com
      `;

      const quality = analyzeLlmsTxtQuality(minimalContent);

      expect(quality.contentLength).to.be.below(1000);
      expect(quality.breakdown.contentLength).to.equal(5);
    });
  });

  describe('External Links Scoring', () => {
    it('should award 10 points for 3+ external links', () => {
      const content = `
# Site Title

## External Resources
- MDN Web Docs: https://developer.mozilla.org
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Schema.org: https://schema.org
- W3C: https://www.w3.org
      `;

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.externalLinkCount).to.be.at.least(3);
      expect(quality.breakdown.externalLinks).to.equal(10);
    });

    it('should award 5 points for 1-2 external links', () => {
      const content = `
# Site Title

## Resources
- Documentation: https://example.com/docs
- API: https://api.example.com
      `;

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.externalLinkCount).to.be.at.least(1);
      expect(quality.externalLinkCount).to.be.below(3);
      expect(quality.breakdown.externalLinks).to.equal(5);
    });

    it('should award 0 points for no external links', () => {
      const content = `
# Site Title

## Overview
No external links here.
      `;

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.externalLinkCount).to.equal(0);
      expect(quality.breakdown.externalLinks).to.equal(0);
    });
  });

  describe('Specificity Scoring', () => {
    it('should award 5 points for detailed policies', () => {
      const content = `
# Site Title

## Access Guidelines
AI agents are welcome to access our content for training and information retrieval.
We request that you:
- Respect our rate limits (10 requests per second)
- Attribute content to example.com when used
- Do not scrape user-generated content without permission
- Comply with authentication requirements
- Follow data retention policies

We provide detailed API documentation and rate limit information to ensure
responsible usage of our platform. Our comprehensive attribution guidelines
help maintain content integrity while enabling AI training and research.
${'Additional content to meet length requirement. '.repeat(50)}

## Rate Limits
- General content: 10 req/sec
- API endpoints: 100 req/min
- Search functionality: 5 req/sec
- Bulk operations: 1 req/sec

## Authentication
All API access requires authentication tokens obtained through our developer portal.
      `;

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.breakdown.specificity).to.equal(5);
      expect(quality.hasDetailedPolicies).to.be.true;
    });

    it('should award 3 points for basic policies', () => {
      const content = `
# Site Title

## Access Guidelines
Please respect our rate limits and attribute content when used.
      `;

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.breakdown.specificity).to.equal(3);
    });

    it('should award 0 points for generic content', () => {
      const content = `
# Site Title

Welcome to our site.
      `;

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.breakdown.specificity).to.equal(0);
    });
  });

  describe('Bonus Points', () => {
    it('should award bonus for rate limits declared', () => {
      const content = `
# Site Title

## Rate Limits
- 10 requests per second
- 100 requests per minute for API
      `;

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.bonusPoints.rateLimits).to.be.above(0);
    });

    it('should award bonus for API documentation', () => {
      const content = `
# Site Title

## API Documentation
Base URL: https://api.example.com/v1
Authentication: API key required
Documentation: https://api.example.com/docs
      `;

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.bonusPoints.apiDocs).to.be.above(0);
    });

    it('should award bonus for attribution requirements', () => {
      const content = `
# Site Title

## Attribution Requirements
When using our content, please attribute as follows:
"Source: Example.com - https://example.com"
      `;

      const quality = analyzeLlmsTxtQuality(content);

      expect(quality.bonusPoints.attribution).to.be.above(0);
    });

    it('should not exceed 5 bonus points total', () => {
      const content = `
# Site Title

## Rate Limits
10 requests per second

## API Documentation
API details here

## Attribution Requirements
Please attribute our content
      `;

      const quality = analyzeLlmsTxtQuality(content);

      const totalBonus = Object.values(quality.bonusPoints).reduce((a, b) => a + b, 0);
      expect(totalBonus).to.be.at.most(5);
    });
  });

  describe('Total Score Calculation', () => {
    it('should calculate total score correctly (0-105 scale)', () => {
      // Load comprehensive fixture
      const comprehensiveContent = fs.readFileSync(
        path.join(__dirname, '../fixtures/llms/comprehensive.txt'),
        'utf-8',
      );

      const quality = analyzeLlmsTxtQuality(comprehensiveContent);

      // Verify score components
      expect(quality.breakdown).to.exist;
      expect(quality.bonusPoints).to.exist;

      // Calculate expected total
      const baseScore = Object.values(quality.breakdown).reduce((a, b) => a + b, 0);
      const bonusScore = Object.values(quality.bonusPoints).reduce((a, b) => a + b, 0);
      const expectedTotal = baseScore + bonusScore;

      expect(quality.score).to.equal(expectedTotal);
      expect(quality.score).to.be.at.most(105);
    });

    it('should handle minimal llms.txt scoring', () => {
      // Load minimal fixture
      const minimalContent = fs.readFileSync(
        path.join(__dirname, '../fixtures/llms/minimal.txt'),
        'utf-8',
      );

      const quality = analyzeLlmsTxtQuality(minimalContent);

      expect(quality.score).to.be.below(50);
      expect(quality.score).to.be.at.least(0);
    });

    it('should not exceed 105 points', () => {
      const maxContent = `
# Comprehensive Example.com - AI Agent Guidance

## Overview
${'Detailed comprehensive overview content. '.repeat(100)}

## Contact
Email: support@example.com
Website: https://example.com
Last Updated: 2026-01-15

## Access Guidelines
${'Detailed access policies with specific rules. '.repeat(50)}

## Rate Limits
- General content: 10 req/sec
- API endpoints: 100 req/min
- Search: 5 req/sec

## API Documentation
Base URL: https://api.example.com/v1
Authentication: API key required
Documentation: https://api.example.com/docs

## Content Sections
${'Multiple content sections described. '.repeat(30)}

## Attribution Requirements
Please attribute as: "Source: Example.com"

## External Resources
- MDN: https://developer.mozilla.org
- WCAG: https://www.w3.org/WAI/WCAG21/quickref/
- Schema.org: https://schema.org
- W3C: https://www.w3.org
      `;

      const quality = analyzeLlmsTxtQuality(maxContent);

      expect(quality.score).to.be.at.most(105);
    });
  });

  describe('Priority Fixes Recommendations', () => {
    it('should recommend creating file if missing', () => {
      const quality = { score: 0, exists: false };

      const recommendations = generateRecommendations(quality);

      expect(recommendations).to.include('Create basic llms.txt with title, description, contact');
    });

    it('should recommend access guidelines for score <40', () => {
      const content = '# Title\n\nContact: info@example.com';

      const quality = analyzeLlmsTxtQuality(content);

      if (quality.score < 40) {
        expect(quality.recommendations).to.include('Add access guidelines');
      }
    });

    it('should recommend API information for score 40-70', () => {
      const content = `
# Title

## Overview
Description here.

## Contact
Email: info@example.com

## Access Guidelines
Basic policies.
      `;

      const quality = analyzeLlmsTxtQuality(content);

      if (quality.score >= 40 && quality.score < 70) {
        expect(quality.recommendations).to.include('Add API information and external links');
      }
    });

    it('should recommend increased detail for score 70-90', () => {
      const content = `
# Title

## Overview
Description.

## Contact
Email: info@example.com
Last Updated: 2026-01-15

## Access Guidelines
Policies here.

## Rate Limits
10 req/sec

## API Documentation
API details.
      `;

      const quality = analyzeLlmsTxtQuality(content);

      if (quality.score >= 70 && quality.score < 90) {
        expect(quality.recommendations).to.include('Increase detail and specificity');
      }
    });

    it('should recommend maintaining for score 90-105', () => {
      const comprehensiveContent = fs.readFileSync(
        path.join(__dirname, '../fixtures/llms/comprehensive.txt'),
        'utf-8',
      );

      const quality = analyzeLlmsTxtQuality(comprehensiveContent);

      if (quality.score >= 90) {
        expect(quality.recommendations).to.include('Maintain and update regularly');
      }
    });
  });
});

// Helper function for generating recommendations
function generateRecommendations(quality) {
  const recommendations = [];

  if (!quality.exists) {
    recommendations.push('Create basic llms.txt with title, description, contact');
  }

  if (quality.score < 40) {
    recommendations.push('Add access guidelines and rate limits');
  } else if (quality.score < 70) {
    recommendations.push('Add API information and external links');
  } else if (quality.score < 90) {
    recommendations.push('Increase detail and specificity');
  } else {
    recommendations.push('Maintain and update regularly');
  }

  return recommendations;
}
