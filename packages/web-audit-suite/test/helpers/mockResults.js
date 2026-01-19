/**
 * Test helper for creating mock results.json data
 */

export function createMockResults(options = {}) {
  const {
    urlCount = 3,
    servedScoreRange = [70, 90],
    renderedScoreRange = [75, 92],
    includeHtml = true,
    includeSchemaOrg = true,
    includeAccessibilityIssues = true,
  } = options;

  const pages = [];

  for (let i = 1; i <= urlCount; i++) {
    const page = {
      url: `https://example.com/page${i}`,
      servedScore: randomInRange(servedScoreRange[0], servedScoreRange[1]),
      renderedScore: randomInRange(renderedScoreRange[0], renderedScoreRange[1]),
      seoScore: randomInRange(70, 95),
      accessibilityScore: randomInRange(80, 98),
      performanceMetrics: {
        loadTime: randomInRange(1000, 2000),
        firstPaint: randomInRange(600, 1200),
        firstContentfulPaint: randomInRange(800, 1400),
        largestContentfulPaint: randomInRange(1000, 1800),
        timeToInteractive: randomInRange(1200, 2200),
        cumulativeLayoutShift: (Math.random() * 0.15).toFixed(2),
      },
      hasMain: Math.random() > 0.3,
      hasNav: Math.random() > 0.2,
      hasSchemaOrg: includeSchemaOrg && Math.random() > 0.4,
      structuredDataCount: includeSchemaOrg ? randomInRange(0, 3) : 0,
      formFieldsStandard: randomInRange(50, 100),
    };

    if (includeAccessibilityIssues) {
      page.accessibilityIssues = {
        total: randomInRange(0, 10),
        critical: randomInRange(0, 2),
        serious: randomInRange(0, 3),
        moderate: randomInRange(0, 3),
        minor: randomInRange(0, 2),
      };
    }

    if (includeHtml) {
      page.html = generateMockHtml(page);
    }

    pages.push(page);
  }

  return {
    metadata: {
      domain: 'example.com',
      timestamp: new Date().toISOString(),
      totalUrls: urlCount,
      version: '1.0.0',
    },
    pages,
    summary: calculateSummary(pages),
  };
}

function generateMockHtml(page) {
  let html = '';

  if (page.hasMain) {
    html += '<main>';
  } else {
    html += '<div>';
  }

  html += `<h1>${page.url}</h1>`;

  if (page.hasSchemaOrg && page.structuredDataCount > 0) {
    html += '<script type="application/ld+json">{"@type":"Article","headline":"Test Article"}</script>';
  }

  if (page.formFieldsStandard > 70) {
    html += '<form><input name="email" type="email"/><input name="firstName"/></form>';
  } else {
    html += '<form><input name="user_email"/><input name="user_first"/></form>';
  }

  if (page.hasMain) {
    html += '</main>';
  } else {
    html += '</div>';
  }

  return html;
}

function calculateSummary(pages) {
  const sum = (arr) => arr.reduce((a, b) => a + b, 0);
  const avg = (arr) => sum(arr) / arr.length;

  return {
    averageServedScore: avg(pages.map((p) => p.servedScore)),
    averageRenderedScore: avg(pages.map((p) => p.renderedScore)),
    averageSeoScore: avg(pages.map((p) => p.seoScore)),
    averageAccessibilityScore: avg(pages.map((p) => p.accessibilityScore)),
    averageLoadTime: avg(pages.map((p) => p.performanceMetrics.loadTime)),
    totalAccessibilityIssues: sum(pages.map((p) => p.accessibilityIssues?.total || 0)),
  };
}

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Create mock results with high scores for pattern extraction testing
 */
export function createHighScoringMockResults() {
  return createMockResults({
    urlCount: 5,
    servedScoreRange: [75, 95],
    renderedScoreRange: [80, 98],
    includeHtml: true,
    includeSchemaOrg: true,
  });
}

/**
 * Create mock results with mixed scores
 */
export function createMixedScoringMockResults() {
  return createMockResults({
    urlCount: 10,
    servedScoreRange: [40, 95],
    renderedScoreRange: [45, 92],
    includeHtml: true,
    includeSchemaOrg: true,
  });
}
