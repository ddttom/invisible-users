/**
 * llms.txt Parser and Quality Analyzer
 * Parses and scores llms.txt files based on AI agent guidance quality
 *
 * Scoring System (0-105 points):
 * - Core Elements (40 points): title (10), description (10), contact (10), last updated (10)
 * - Sections (30 points): 5+ sections (30), 3-4 sections (20), 1-2 sections (10)
 * - Content Length (15 points): >2000 chars (15), 1000-2000 chars (10), <1000 chars (5)
 * - External Links (10 points): 3+ links (10), 1-2 links (5)
 * - Specificity (5 points): Detailed policies (5), Basic policies (3)
 * - Bonus Points (up to 5): Rate limits, API docs, attribution requirements
 */

/**
 * Parse llms.txt content into structured format
 * @param {string} content - Raw llms.txt content
 * @returns {Object} Parsed structure with sections, links, etc.
 */
export function parseLlmsTxt(content) {
  const lines = content.split('\n');
  const sections = [];
  const links = [];
  let currentSection = null;

  for (const line of lines) {
    // Detect headings
    const h1Match = line.match(/^# (.+)$/);
    const h2Match = line.match(/^## (.+)$/);
    const h3Match = line.match(/^### (.+)$/);

    if (h1Match) {
      currentSection = {
        level: 1,
        title: h1Match[1],
        content: [],
      };
      sections.push(currentSection);
    } else if (h2Match) {
      currentSection = {
        level: 2,
        title: h2Match[1],
        content: [],
      };
      sections.push(currentSection);
    } else if (h3Match) {
      currentSection = {
        level: 3,
        title: h3Match[1],
        content: [],
      };
      sections.push(currentSection);
    } else if (currentSection) {
      currentSection.content.push(line);
    }

    // Extract links
    const linkMatches = line.matchAll(/https?:\/\/[^\s)]+/g);
    for (const match of linkMatches) {
      links.push(match[0]);
    }
  }

  return {
    sections,
    links,
    content,
  };
}

/**
 * Analyze llms.txt quality and generate score
 * @param {string} content - Raw llms.txt content
 * @returns {Object} Quality analysis with score breakdown
 */
export function analyzeLlmsTxtQuality(content) {
  const parsed = parseLlmsTxt(content);
  const breakdown = {};
  const bonusPoints = {
    rateLimits: 0,
    apiDocs: 0,
    attribution: 0,
  };

  // Core Elements Scoring (40 points total)
  const hasTitle = parsed.sections.some((s) => s.level === 1);
  breakdown.title = hasTitle ? 10 : 0;

  const hasDescription = parsed.sections.some((s) => s.title && (s.title.toLowerCase().includes('overview')
                || s.title.toLowerCase().includes('description')));
  breakdown.description = hasDescription ? 10 : 0;

  const hasContact = content.toLowerCase().includes('contact')
                     || content.toLowerCase().includes('email:')
                     || content.toLowerCase().includes('support@');
  breakdown.contact = hasContact ? 10 : 0;

  const hasLastUpdated = /last updated:|updated:/i.test(content)
                         || /\d{4}-\d{2}-\d{2}/.test(content);
  breakdown.lastUpdated = hasLastUpdated ? 10 : 0;

  // Sections Scoring (30 points)
  const level2Sections = parsed.sections.filter((s) => s.level === 2);
  const sectionCount = level2Sections.length;
  if (sectionCount >= 5) {
    breakdown.sections = 30;
  } else if (sectionCount >= 3) {
    breakdown.sections = 20;
  } else if (sectionCount >= 1) {
    breakdown.sections = 10;
  } else {
    breakdown.sections = 0;
  }

  // Content Length Scoring (15 points)
  const contentLength = content.length;
  if (contentLength > 2000) {
    breakdown.contentLength = 15;
  } else if (contentLength >= 1000) {
    breakdown.contentLength = 10;
  } else {
    breakdown.contentLength = 5;
  }

  // External Links Scoring (10 points)
  const externalLinkCount = parsed.links.length;
  if (externalLinkCount >= 3) {
    breakdown.externalLinks = 10;
  } else if (externalLinkCount >= 1) {
    breakdown.externalLinks = 5;
  } else {
    breakdown.externalLinks = 0;
  }

  // Specificity Scoring (5 points)
  const hasDetailedPolicies = /rate limit|req\/sec|authentication|attribution/i.test(content)
                             && content.length > 1000;
  if (hasDetailedPolicies) {
    breakdown.specificity = 5;
  } else if (/rate limit|authentication|attribution/i.test(content)) {
    breakdown.specificity = 3;
  } else {
    breakdown.specificity = 0;
  }

  // Bonus Points (up to 5 total)
  if (/rate limit/i.test(content) && /\d+\s*(req|request)/i.test(content)) {
    bonusPoints.rateLimits = 2;
  }
  if (/api|endpoint|base url/i.test(content) && /documentation/i.test(content)) {
    bonusPoints.apiDocs = 2;
  }
  if (/attribution|cite|source:/i.test(content)) {
    bonusPoints.attribution = 1;
  }

  // Calculate total score
  const baseScore = Object.values(breakdown).reduce((sum, val) => sum + val, 0);
  const bonus = Object.values(bonusPoints).reduce((sum, val) => sum + val, 0);
  const score = Math.min(baseScore + bonus, 105);

  // Generate recommendations
  const recommendations = [];
  if (score < 40) {
    if (!hasTitle) recommendations.push('Add title and overview');
    if (!hasDescription) recommendations.push('Add access guidelines');
    if (!hasContact) recommendations.push('Add contact information');
  } else if (score < 70) {
    if (externalLinkCount < 3) recommendations.push('Add API information and external links');
    if (sectionCount < 3) recommendations.push('Add more sections');
  } else if (score < 90) {
    if (!hasDetailedPolicies) recommendations.push('Increase detail and specificity');
    if (contentLength < 2000) recommendations.push('Expand content');
  } else {
    recommendations.push('Maintain and update regularly');
  }

  return {
    score,
    breakdown,
    bonusPoints,
    sectionCount,
    contentLength,
    externalLinkCount,
    hasTitle,
    hasDescription,
    hasContact,
    hasLastUpdated,
    hasDetailedPolicies,
    recommendations,
  };
}

/**
 * Calculate llms.txt quality score
 * @param {Object} analysis - Analysis object from analyzeLlmsTxtQuality
 * @returns {number} Score (0-105)
 */
export function calculateLlmsTxtScore(analysis) {
  return analysis.score;
}
