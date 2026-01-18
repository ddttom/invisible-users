/**
 * robots.txt Quality Scoring Test Suite
 * Tests the 100-point quality scoring system for robots.txt files
 */

import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  parseRobotsTxt,
  analyzeRobotsTxtQuality,
} from '../../src/utils/robotsTxtParser.js';
import { fetchRobotsTxt } from '../../src/utils/robotsFetcher.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('robots.txt Quality Scoring', () => {
  let mockContext;
  let fetchStub;

  beforeEach(() => {
    mockContext = {
      logger: {
        info: sinon.spy(),
        warn: sinon.spy(),
        error: sinon.spy(),
        debug: sinon.spy(),
      },
    };

    // Mock global fetch
    fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Fetching and Parsing', () => {
    it('should fetch robots.txt from domain root', async () => {
      fetchStub.resolves({
        ok: true,
        status: 200,
        text: async () => 'User-agent: *\nDisallow: /admin/',
      });

      const result = await fetchRobotsTxt('https://example.com', mockContext);

      expect(fetchStub.calledWith('https://example.com/robots.txt')).to.be.true;
      expect(result).to.exist;
      expect(result.content).to.include('User-agent: *');
    });

    it('should handle HTTP fetch success', async () => {
      fetchStub.resolves({
        ok: true,
        status: 200,
        text: async () => 'User-agent: *\nAllow: /',
      });

      const result = await fetchRobotsTxt('https://example.com', mockContext);

      expect(result).to.exist;
      expect(result.success).to.be.true;
      expect(result.url).to.equal('https://example.com/robots.txt');
    });

    it('should handle missing robots.txt (404)', async () => {
      fetchStub.resolves({
        ok: false,
        status: 404,
      });

      const result = await fetchRobotsTxt('https://example.com', mockContext);

      expect(result).to.be.null;
    });

    it('should handle malformed robots.txt gracefully', () => {
      const malformedContent = 'This is not valid robots.txt\n!!!@#$%^&*()';

      const parsed = parseRobotsTxt(malformedContent);

      expect(parsed.valid).to.be.true; // Should still parse
      expect(parsed.userAgents).to.exist;
      expect(parsed.rules).to.exist;
    });
  });

  describe('AI User Agents Scoring', () => {
    it('should award 30 points for 3+ AI user agents', () => {
      const content = `
# AI Agents
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: GoogleBot-AI
Allow: /

User-agent: PerplexityBot
Allow: /
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.score).to.be.at.least(30);
      expect(quality.aiUserAgentCount).to.be.at.least(3);
    });

    it('should award 15 points for 1-2 AI user agents', () => {
      const content = `
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.aiUserAgentCount).to.equal(2);
      expect(quality.breakdown.aiUserAgents).to.equal(15);
    });

    it('should award 0 points for no AI user agents', () => {
      const content = `
User-agent: *
Disallow: /admin/
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.aiUserAgentCount).to.equal(0);
      expect(quality.breakdown.aiUserAgents).to.equal(0);
    });

    it('should detect GPTBot', () => {
      const content = 'User-agent: GPTBot\nAllow: /';

      const parsed = parseRobotsTxt(content);

      const hasGPTBot = parsed.userAgents.some((ua) => ua.includes('GPTBot'));
      expect(hasGPTBot).to.be.true;
    });

    it('should detect ClaudeBot', () => {
      const content = 'User-agent: ClaudeBot\nAllow: /';

      const parsed = parseRobotsTxt(content);

      const hasClaudeBot = parsed.userAgents.some((ua) => ua.includes('ClaudeBot'));
      expect(hasClaudeBot).to.be.true;
    });

    it('should detect other AI agents (GoogleBot-AI, etc.)', () => {
      const content = `
User-agent: GoogleBot-AI
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: cohere-ai
Allow: /
      `;

      const parsed = parseRobotsTxt(content);

      expect(parsed.userAgents).to.include('GoogleBot-AI');
      expect(parsed.userAgents).to.include('PerplexityBot');
      expect(parsed.userAgents).to.include('cohere-ai');
    });
  });

  describe('Sitemap Declaration Scoring', () => {
    it('should award 20 points for sitemap declaration', () => {
      const content = `
User-agent: *
Disallow: /admin/

Sitemap: https://example.com/sitemap.xml
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.breakdown.sitemap).to.equal(20);
      expect(quality.hasSitemap).to.be.true;
    });

    it('should detect multiple sitemap declarations', () => {
      const content = `
Sitemap: https://example.com/sitemap.xml
Sitemap: https://example.com/sitemap-news.xml
Sitemap: https://example.com/sitemap-products.xml
      `;

      const parsed = parseRobotsTxt(content);

      expect(parsed.sitemaps).to.have.length(3);
      expect(parsed.sitemaps).to.include('https://example.com/sitemap.xml');
    });

    it('should award 0 points for missing sitemap', () => {
      const content = `
User-agent: *
Disallow: /admin/
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.breakdown.sitemap).to.equal(0);
      expect(quality.hasSitemap).to.be.false;
    });
  });

  describe('Sensitive Path Protection Scoring', () => {
    it('should award 25 points for 3+ protected paths', () => {
      const content = `
User-agent: *
Disallow: /admin/
Disallow: /cart/
Disallow: /account/
Disallow: /checkout/
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.breakdown.pathProtection).to.equal(25);
      expect(quality.protectedPathCount).to.be.at.least(3);
    });

    it('should award 15 points for 1-2 protected paths', () => {
      const content = `
User-agent: *
Disallow: /admin/
Disallow: /cart/
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.breakdown.pathProtection).to.equal(15);
      expect(quality.protectedPathCount).to.equal(2);
    });

    it('should award 0 points for no protected paths', () => {
      const content = `
User-agent: *
Allow: /
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.breakdown.pathProtection).to.equal(0);
      expect(quality.protectedPathCount).to.equal(0);
    });

    it('should detect /admin, /cart, /account protection', () => {
      const content = `
User-agent: *
Disallow: /admin/
Disallow: /cart/
Disallow: /account/
      `;

      const parsed = parseRobotsTxt(content);

      const disallowedPaths = parsed.rules
        .filter((r) => r.directive === 'disallow')
        .map((r) => r.path);

      expect(disallowedPaths).to.include('/admin/');
      expect(disallowedPaths).to.include('/cart/');
      expect(disallowedPaths).to.include('/account/');
    });

    it('should detect wildcard patterns (e.g., /admin/*)', () => {
      const content = `
User-agent: *
Disallow: /admin/*
Disallow: /api/private/*
      `;

      const parsed = parseRobotsTxt(content);

      const wildcardRules = parsed.rules.filter((r) => r.path.includes('*'));
      expect(wildcardRules.length).to.be.above(0);
    });
  });

  describe('llms.txt Reference Scoring', () => {
    it('should award 15 points for llms.txt reference', () => {
      const content = `
# For AI agent guidance, see our llms.txt file
# llms.txt: https://example.com/llms.txt

User-agent: *
Disallow: /admin/
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.breakdown.llmsTxtReference).to.equal(15);
      expect(quality.hasLlmsTxtReference).to.be.true;
    });

    it('should detect llms.txt in comments', () => {
      const content = `
# See llms.txt for detailed AI agent policies
User-agent: GPTBot
Allow: /
      `;

      const parsed = parseRobotsTxt(content);

      const hasLlmsTxtComment = parsed.comments.some((c) => c.toLowerCase().includes('llms.txt'));
      expect(hasLlmsTxtComment).to.be.true;
    });

    it('should award 0 points for missing reference', () => {
      const content = `
User-agent: *
Disallow: /admin/
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.breakdown.llmsTxtReference).to.equal(0);
      expect(quality.hasLlmsTxtReference).to.be.false;
    });
  });

  describe('Helpful Comments Scoring', () => {
    it('should award 10 points for 3+ comments', () => {
      const content = `
# robots.txt for example.com
# This file controls web crawler access
# Updated: 2026-01-15
# For AI agents, see llms.txt

User-agent: *
Disallow: /admin/
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.breakdown.comments).to.equal(10);
      expect(quality.commentCount).to.be.at.least(3);
    });

    it('should award 5 points for 1-2 comments', () => {
      const content = `
# robots.txt for example.com

User-agent: *
Disallow: /admin/
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.breakdown.comments).to.equal(5);
      expect(quality.commentCount).to.be.at.most(2);
    });

    it('should award 0 points for no comments', () => {
      const content = `
User-agent: *
Disallow: /admin/
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.breakdown.comments).to.equal(0);
      expect(quality.commentCount).to.equal(0);
    });
  });

  describe('Quality Level Classification', () => {
    it('should classify 80-100 as Excellent', () => {
      // Load excellent fixture
      const excellentContent = fs.readFileSync(
        path.join(__dirname, '../fixtures/robots/excellent.txt'),
        'utf-8',
      );

      const quality = analyzeRobotsTxtQuality(excellentContent);

      expect(quality.score).to.be.at.least(80);
      expect(quality.level).to.equal('Excellent');
    });

    it('should classify 60-79 as Good', () => {
      const content = `
# Good robots.txt
# Updated regularly

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: *
Disallow: /admin/
Disallow: /cart/
Disallow: /account/

Sitemap: https://example.com/sitemap.xml
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.score).to.be.at.least(60);
      expect(quality.score).to.be.below(80);
      expect(quality.level).to.equal('Good');
    });

    it('should classify 40-59 as Fair', () => {
      const content = `
# robots.txt

User-agent: GPTBot
Allow: /

User-agent: *
Disallow: /admin/
Disallow: /cart/

Sitemap: https://example.com/sitemap.xml
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.score).to.be.at.least(40);
      expect(quality.score).to.be.below(60);
      expect(quality.level).to.equal('Fair');
    });

    it('should classify 0-39 as Poor', () => {
      // Load poor fixture
      const poorContent = fs.readFileSync(
        path.join(__dirname, '../fixtures/robots/poor.txt'),
        'utf-8',
      );

      const quality = analyzeRobotsTxtQuality(poorContent);

      expect(quality.score).to.be.below(40);
      expect(quality.level).to.equal('Poor');
    });
  });

  describe('Score Calculation', () => {
    it('should calculate total score correctly (100-point scale)', () => {
      const content = `
# Comprehensive robots.txt
# AI agent guidance: see llms.txt
# Updated: 2026-01-15

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: GoogleBot-AI
Allow: /

User-agent: *
Disallow: /admin/
Disallow: /cart/
Disallow: /account/
Disallow: /checkout/

Sitemap: https://example.com/sitemap.xml
      `;

      const quality = analyzeRobotsTxtQuality(content);

      // Verify breakdown
      expect(quality.breakdown.aiUserAgents).to.be.at.least(15);
      expect(quality.breakdown.sitemap).to.equal(20);
      expect(quality.breakdown.pathProtection).to.be.at.least(15);
      expect(quality.breakdown.llmsTxtReference).to.equal(15);
      expect(quality.breakdown.comments).to.be.at.least(5);

      // Verify total
      const expectedTotal = Object.values(quality.breakdown).reduce((a, b) => a + b, 0);
      expect(quality.score).to.equal(expectedTotal);
      expect(quality.score).to.be.at.most(100);
    });

    it('should not exceed 100 points', () => {
      const content = `
# Comprehensive robots.txt with all features
# AI agent guidance
# See llms.txt for detailed policies
# Updated regularly

User-agent: GPTBot
User-agent: ClaudeBot
User-agent: GoogleBot-AI
User-agent: PerplexityBot
User-agent: ChatGPT-User
Allow: /

User-agent: *
Disallow: /admin/
Disallow: /cart/
Disallow: /account/
Disallow: /checkout/
Disallow: /api/private/

Sitemap: https://example.com/sitemap.xml
Sitemap: https://example.com/sitemap-news.xml
      `;

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.score).to.be.at.most(100);
    });
  });

  describe('Priority Fixes', () => {
    it('should recommend sitemap for score <40', () => {
      const content = 'User-agent: *\nDisallow: /temp/';

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.score).to.be.below(40);
      expect(quality.recommendations).to.include('Add sitemap declaration');
    });

    it('should recommend AI user agents for score <40', () => {
      const content = 'User-agent: *\nDisallow: /temp/';

      const quality = analyzeRobotsTxtQuality(content);

      expect(quality.recommendations).to.include('Add AI-specific user agents');
    });

    it('should recommend path protection for score 40-60', () => {
      const content = `
User-agent: GPTBot
Allow: /

Sitemap: https://example.com/sitemap.xml
      `;

      const quality = analyzeRobotsTxtQuality(content);

      if (quality.score >= 40 && quality.score < 60) {
        expect(quality.recommendations).to.include('Add protected paths');
      }
    });
  });
});
