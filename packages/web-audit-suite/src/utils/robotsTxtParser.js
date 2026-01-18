/**
 * robots.txt Parser and Quality Analyzer
 *
 * Evaluates robots.txt files for AI agent compatibility based on guidance from
 * "The Invisible Users" book (https://github.com/tomcranstoun/invisible-users)
 *
 * Quality Criteria:
 * - Specific user-agent declarations (GPTBot, ClaudeBot, etc.)
 * - Proper access control for sensitive paths
 * - Sitemap references
 * - Clear structure and formatting
 * - AI-specific guidance and llms.txt references
 */

/**
 * Known AI agent user-agent strings
 * Source: invisible-users repository, chapter-10-technical-advice.md
 */
const AI_USER_AGENTS = [
  'GPTBot', // OpenAI
  'ClaudeBot', // Anthropic
  'Claude-Web', // Anthropic web crawler
  'GoogleBot-AI', // Google AI services
  'PerplexityBot', // Perplexity AI
  'Bingbot', // Microsoft Bing (also used for AI)
  'Anthropic-AI', // Anthropic generic
  'cohere-ai', // Cohere
  'ChatGPT-User', // ChatGPT browsing
];

/**
 * Sensitive paths that should typically be disallowed for AI agents
 */
const SENSITIVE_PATHS = [
  '/admin',
  '/account',
  '/cart',
  '/checkout',
  '/login',
  '/auth',
  '/api/private',
  '/user',
  '/profile',
];

/**
 * Parse robots.txt content into structured data
 * @param {string} content - Raw robots.txt content
 * @returns {Object} Parsed robots.txt structure
 */
export function parseRobotsTxt(content) {
  if (!content || typeof content !== 'string') {
    return {
      valid: false,
      userAgents: [],
      rules: [],
      sitemaps: [],
      comments: [],
    };
  }

  const lines = content.split(/\r?\n/);
  const userAgents = [];
  const rules = [];
  const sitemaps = [];
  const comments = [];
  let currentUserAgent = null;

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) continue;

    // Comments
    if (trimmed.startsWith('#')) {
      comments.push(trimmed.substring(1).trim());
      continue;
    }

    // Sitemap declarations
    if (trimmed.toLowerCase().startsWith('sitemap:')) {
      const sitemapUrl = trimmed.substring(8).trim();
      sitemaps.push(sitemapUrl);
      continue;
    }

    // User-agent declarations
    if (trimmed.toLowerCase().startsWith('user-agent:')) {
      currentUserAgent = trimmed.substring(11).trim();
      if (!userAgents.includes(currentUserAgent)) {
        userAgents.push(currentUserAgent);
      }
      continue;
    }

    // Allow/Disallow rules
    if (trimmed.toLowerCase().startsWith('allow:') || trimmed.toLowerCase().startsWith('disallow:')) {
      const [directive, ...pathParts] = trimmed.split(':');
      const path = pathParts.join(':').trim();

      rules.push({
        userAgent: currentUserAgent || '*',
        directive: directive.toLowerCase(),
        path,
      });
    }
  }

  return {
    valid: true,
    userAgents,
    rules,
    sitemaps,
    comments,
  };
}

/**
 * Analyze robots.txt quality for AI agent compatibility
 * @param {string} content - Raw robots.txt content
 * @returns {Object} Quality analysis with score breakdown
 */
export function analyzeRobotsTxtQuality(content) {
  const parsed = parseRobotsTxt(content);

  if (!parsed.valid) {
    return {
      score: 0,
      level: 'Poor',
      breakdown: {
        aiUserAgents: 0,
        sitemap: 0,
        pathProtection: 0,
        llmsTxtReference: 0,
        comments: 0,
      },
      aiUserAgentCount: 0,
      protectedPathCount: 0,
      hasSitemap: false,
      hasLlmsTxtReference: false,
      commentCount: 0,
      recommendations: ['Create a valid robots.txt file'],
    };
  }

  const breakdown = {
    aiUserAgents: 0,
    sitemap: 0,
    pathProtection: 0,
    llmsTxtReference: 0,
    comments: 0,
  };

  // 1. AI User Agents Scoring (30 points max)
  const aiAgentsFound = parsed.userAgents.filter((ua) => AI_USER_AGENTS.some((aiAgent) => ua.toLowerCase().includes(aiAgent.toLowerCase())));
  const aiUserAgentCount = aiAgentsFound.length;

  if (aiUserAgentCount >= 3) {
    breakdown.aiUserAgents = 30;
  } else if (aiUserAgentCount >= 1) {
    breakdown.aiUserAgents = 15;
  } else {
    breakdown.aiUserAgents = 0;
  }

  // 2. Sitemap Declaration Scoring (20 points)
  const hasSitemap = parsed.sitemaps.length > 0;
  breakdown.sitemap = hasSitemap ? 20 : 0;

  // 3. Sensitive Path Protection Scoring (25 points max)
  const protectedPaths = parsed.rules
    .filter((rule) => rule.directive === 'disallow')
    .filter((rule) => SENSITIVE_PATHS.some((sensitive) => rule.path.toLowerCase().startsWith(sensitive.toLowerCase())))
    .map((rule) => rule.path);

  // Remove duplicates
  const uniqueProtectedPaths = [...new Set(protectedPaths)];
  const protectedPathCount = uniqueProtectedPaths.length;

  if (protectedPathCount >= 3) {
    breakdown.pathProtection = 25;
  } else if (protectedPathCount >= 1) {
    breakdown.pathProtection = 15;
  } else {
    breakdown.pathProtection = 0;
  }

  // 4. llms.txt Reference Scoring (15 points)
  const hasLlmsTxtReference = parsed.comments.some((comment) => comment.toLowerCase().includes('llms.txt') || comment.toLowerCase().includes('llms-txt'));
  breakdown.llmsTxtReference = hasLlmsTxtReference ? 15 : 0;

  // 5. Helpful Comments Scoring (10 points max)
  const commentCount = parsed.comments.length;
  if (commentCount >= 3) {
    breakdown.comments = 10;
  } else if (commentCount >= 1) {
    breakdown.comments = 5;
  } else {
    breakdown.comments = 0;
  }

  // Calculate total score
  const score = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  // Determine quality level
  let level;
  if (score >= 80) {
    level = 'Excellent';
  } else if (score >= 60) {
    level = 'Good';
  } else if (score >= 40) {
    level = 'Fair';
  } else {
    level = 'Poor';
  }

  // Generate recommendations
  const recommendations = [];
  if (score < 40) {
    if (!hasSitemap) recommendations.push('Add sitemap declaration');
    if (aiUserAgentCount === 0) recommendations.push('Add AI-specific user agents');
  } else if (score >= 40 && score < 60) {
    if (protectedPathCount < 3) recommendations.push('Add protected paths');
  }

  return {
    score,
    level,
    breakdown,
    aiUserAgentCount,
    protectedPathCount,
    hasSitemap,
    hasLlmsTxtReference,
    commentCount,
    recommendations,
  };
}

/**
 * Calculate robots.txt quality score
 * @param {Object} analysis - Analysis object from analyzeRobotsTxtQuality
 * @returns {number} Score (0-100)
 */
export function calculateRobotsQualityScore(analysis) {
  return analysis.score;
}

/**
 * Process robots.txt URL and return quality analysis
 * @param {string} robotsTxtUrl - URL to robots.txt file
 * @param {string} content - Raw robots.txt content (if already fetched)
 * @param {Object} context - Audit context (optional, for future logging)
 * @returns {Promise<Object>} Quality analysis results
 */
export async function processRobotsTxt(robotsTxtUrl, content = null, context = null) {
  try {
    if (!content) {
      throw new Error('robots.txt content must be provided');
    }

    const analysis = analyzeRobotsTxtQuality(content);

    if (context?.logger) {
      context.logger.debug(`robots.txt quality score: ${analysis.score}/100 (${analysis.level})`);
    }

    return {
      success: true,
      url: robotsTxtUrl,
      exists: true,
      content,
      analysis,
    };
  } catch (error) {
    if (context?.logger) {
      context.logger.warn(`Error processing robots.txt: ${error.message}`);
    }

    return {
      success: false,
      url: robotsTxtUrl,
      exists: false,
      error: error.message,
      analysis: {
        score: 0,
        level: 'Poor',
        breakdown: {
          aiUserAgents: 0,
          sitemap: 0,
          pathProtection: 0,
          llmsTxtReference: 0,
          comments: 0,
        },
        recommendations: ['Fix robots.txt access or format issues'],
      },
    };
  }
}
