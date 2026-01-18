/**
 * Regression Detection Test Suite
 * Tests historical comparison and regression detection with CI/CD exit codes
 */

import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs/promises';
import {
  storeHistoricalResult,
  loadHistoricalResults,
  compareWithPrevious,
  compareResults,
} from '../../src/utils/historicalComparison.js';

describe('Regression Detection', () => {
  let mockContext;
  let mockOutputDir;
  let fsStubs;

  beforeEach(() => {
    mockContext = {
      logger: {
        info: sinon.spy(),
        warn: sinon.spy(),
        error: sinon.spy(),
        debug: sinon.spy(),
      },
    };

    mockOutputDir = '/fake/output';

    // Setup fs stubs
    fsStubs = {
      mkdir: sinon.stub(fs, 'mkdir').resolves(),
      writeFile: sinon.stub(fs, 'writeFile').resolves(),
      readdir: sinon.stub(fs, 'readdir').resolves([]),
      readFile: sinon.stub(fs, 'readFile').resolves('{}'),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Historical Storage', () => {
    it('should create history/ directory if missing', async () => {
      const mockResults = { summary: { totalUrls: 10 } };

      await storeHistoricalResult(mockResults, mockOutputDir, mockContext);

      expect(fsStubs.mkdir.called).to.be.true;
      const mkdirCall = fsStubs.mkdir.getCall(0);
      expect(mkdirCall.args[0]).to.include('history');
      expect(mkdirCall.args[1]).to.deep.equal({ recursive: true });
    });

    it('should store timestamped results-<timestamp>.json', async () => {
      const mockResults = { summary: { totalUrls: 10 } };

      await storeHistoricalResult(mockResults, mockOutputDir, mockContext);

      expect(fsStubs.writeFile.called).to.be.true;
      const writeCall = fsStubs.writeFile.getCall(0);
      expect(writeCall.args[0]).to.match(/history\/results-.*\.json$/);
    });

    it('should establish baseline if no history exists', async () => {
      fsStubs.readdir.rejects(new Error('ENOENT'));

      const historicalResults = await loadHistoricalResults(mockOutputDir, mockContext);

      expect(historicalResults).to.be.an('array').that.is.empty;
      expect(mockContext.logger.debug.called).to.be.true;
    });

    it('should preserve existing baseline', async () => {
      const mockHistoryFiles = [
        'results-2026-01-15T10-00-00-000Z.json',
        'results-2026-01-16T10-00-00-000Z.json',
      ];

      fsStubs.readdir.resolves(mockHistoryFiles);
      fsStubs.readFile
        .onFirstCall().resolves(JSON.stringify({ timestamp: '2026-01-15T10:00:00.000Z', results: {} }))
        .onSecondCall().resolves(JSON.stringify({ timestamp: '2026-01-16T10:00:00.000Z', results: {} }));

      const historicalResults = await loadHistoricalResults(mockOutputDir, mockContext);

      expect(historicalResults).to.have.length(2);
      expect(historicalResults[0].timestamp).to.equal('2026-01-15T10:00:00.000Z');
      expect(historicalResults[1].timestamp).to.equal('2026-01-16T10:00:00.000Z');
    });

    it('should handle file system errors gracefully', async () => {
      fsStubs.mkdir.rejects(new Error('Permission denied'));

      const mockResults = { summary: { totalUrls: 10 } };

      try {
        await storeHistoricalResult(mockResults, mockOutputDir, mockContext);
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error.message).to.equal('Permission denied');
      }
    });
  });

  describe('Baseline Comparison', () => {
    it('should load baseline from history directory', async () => {
      const mockBaseline = {
        timestamp: '2026-01-15T10:00:00.000Z',
        results: { summary: { averageLoadTime: 1200 } },
      };

      fsStubs.readdir.resolves(['results-2026-01-15T10-00-00-000Z.json']);
      fsStubs.readFile.resolves(JSON.stringify(mockBaseline));

      const historicalResults = await loadHistoricalResults(mockOutputDir, mockContext);

      expect(historicalResults).to.have.length(1);
      expect(historicalResults[0].timestamp).to.equal(mockBaseline.timestamp);
    });

    it('should compare against most recent baseline', async () => {
      const oldResults = createMockResults({ averageLoadTime: 1200 });
      const newResults = createMockResults({ averageLoadTime: 1800 });

      const comparison = compareResults(oldResults, newResults);

      expect(comparison.performance).to.exist;
      expect(comparison.performance.loadTime.percentChange).to.be.above(30);
    });

    it('should handle missing baseline gracefully', async () => {
      fsStubs.readdir.resolves([]);

      const currentResults = createMockResults();
      const comparison = await compareWithPrevious(currentResults, mockOutputDir, mockContext);

      expect(comparison).to.be.null;
    });

    it('should detect score increases (improvements)', () => {
      const oldResults = createMockResults({ averageSeoScore: 70 });
      const newResults = createMockResults({ averageSeoScore: 85 });

      const comparison = compareResults(oldResults, newResults);

      expect(comparison.seo.scoreChange).to.be.above(0);
      expect(comparison.seo.isImprovement).to.be.true;
    });

    it('should detect score decreases (regressions)', () => {
      const oldResults = createMockResults({ averageSeoScore: 85 });
      const newResults = createMockResults({ averageSeoScore: 70 });

      const comparison = compareResults(oldResults, newResults);

      expect(comparison.seo.scoreChange).to.be.below(0);
      expect(comparison.seo.isImprovement).to.be.false;
    });

    it('should calculate percentage changes accurately', () => {
      const oldResults = createMockResults({ averageLoadTime: 1000 });
      const newResults = createMockResults({ averageLoadTime: 1500 });

      const comparison = compareResults(oldResults, newResults);

      expect(comparison.performance.loadTime.percentChange).to.equal(50);
    });

    it('should compare URL counts', () => {
      const oldResults = createMockResults({ totalUrls: 100 });
      const newResults = createMockResults({ totalUrls: 85 });

      const comparison = compareResults(oldResults, newResults);

      expect(comparison.urlCount.old).to.equal(100);
      expect(comparison.urlCount.new).to.equal(85);
      expect(comparison.urlCount.change).to.equal(-15);
    });

    it('should handle new/removed URLs', () => {
      const oldResults = {
        pages: [
          { url: 'https://example.com/page1' },
          { url: 'https://example.com/page2' },
        ],
      };

      const newResults = {
        pages: [
          { url: 'https://example.com/page2' },
          { url: 'https://example.com/page3' },
        ],
      };

      const comparison = compareResults(oldResults, newResults);

      expect(comparison.urlChanges.removed).to.include('https://example.com/page1');
      expect(comparison.urlChanges.added).to.include('https://example.com/page3');
    });
  });

  describe('Regression Detection - Performance', () => {
    it('should detect CRITICAL >30% increase in load time', () => {
      const oldResults = createMockResults({ averageLoadTime: 1000 });
      const newResults = createMockResults({ averageLoadTime: 1400 });

      const comparison = compareResults(oldResults, newResults);
      const regressions = detectRegressions(comparison);

      const loadTimeRegression = regressions.critical.find((r) => r.metric === 'loadTime');

      expect(loadTimeRegression).to.exist;
      expect(loadTimeRegression.severity).to.equal('critical');
    });

    it('should detect CRITICAL >30% increase in LCP', () => {
      const oldResults = createMockResults({ averageLCP: 1100 });
      const newResults = createMockResults({ averageLCP: 1500 });

      const comparison = compareResults(oldResults, newResults);
      const regressions = detectRegressions(comparison);

      const lcpRegression = regressions.critical.find((r) => r.metric === 'largestContentfulPaint');

      expect(lcpRegression).to.exist;
      expect(lcpRegression.percentChange).to.be.above(30);
    });

    it('should detect WARNING 15-30% increase', () => {
      const oldResults = createMockResults({ averageLoadTime: 1000 });
      const newResults = createMockResults({ averageLoadTime: 1200 });

      const comparison = compareResults(oldResults, newResults);
      const regressions = detectRegressions(comparison);

      const loadTimeWarning = regressions.warnings.find((r) => r.metric === 'loadTime');

      expect(loadTimeWarning).to.exist;
      expect(loadTimeWarning.severity).to.equal('warning');
      expect(loadTimeWarning.percentChange).to.be.at.least(15);
      expect(loadTimeWarning.percentChange).to.be.below(30);
    });
  });

  describe('Regression Detection - Accessibility', () => {
    it('should detect CRITICAL ANY error count increase', () => {
      const oldResults = createMockResults({ totalAccessibilityErrors: 5 });
      const newResults = createMockResults({ totalAccessibilityErrors: 6 });

      const comparison = compareResults(oldResults, newResults);
      const regressions = detectRegressions(comparison);

      const a11yRegression = regressions.critical.find((r) => r.category === 'accessibility');

      expect(a11yRegression).to.exist;
      expect(a11yRegression.severity).to.equal('critical');
    });

    it('should detect severity level changes', () => {
      const oldResults = {
        pa11y: [{ issues: { critical: 1, serious: 2, moderate: 3 } }],
      };

      const newResults = {
        pa11y: [{ issues: { critical: 2, serious: 2, moderate: 3 } }],
      };

      const comparison = compareResults(oldResults, newResults);
      const regressions = detectRegressions(comparison);

      const criticalIncrease = regressions.critical.find((r) => r.metric === 'criticalIssues');

      expect(criticalIncrease).to.exist;
    });
  });

  describe('Regression Detection - SEO', () => {
    it('should detect CRITICAL >10% score decrease', () => {
      const oldResults = createMockResults({ averageSeoScore: 90 });
      const newResults = createMockResults({ averageSeoScore: 78 });

      const comparison = compareResults(oldResults, newResults);
      const regressions = detectRegressions(comparison);

      const seoRegression = regressions.critical.find((r) => r.category === 'seo');

      expect(seoRegression).to.exist;
      expect(Math.abs(seoRegression.percentChange)).to.be.above(10);
    });

    it('should detect WARNING 5-10% score decrease', () => {
      const oldResults = createMockResults({ averageSeoScore: 90 });
      const newResults = createMockResults({ averageSeoScore: 84 });

      const comparison = compareResults(oldResults, newResults);
      const regressions = detectRegressions(comparison);

      const seoWarning = regressions.warnings.find((r) => r.category === 'seo');

      expect(seoWarning).to.exist;
      expect(seoWarning.severity).to.equal('warning');
    });

    it('should detect improvements (positive changes)', () => {
      const oldResults = createMockResults({ averageSeoScore: 70 });
      const newResults = createMockResults({ averageSeoScore: 85 });

      const comparison = compareResults(oldResults, newResults);
      const regressions = detectRegressions(comparison);

      const seoImprovement = regressions.improvements.find((r) => r.category === 'seo');

      expect(seoImprovement).to.exist;
      expect(seoImprovement.percentChange).to.be.above(0);
    });
  });

  describe('Exit Codes', () => {
    it('should return exit code 1 for critical regressions', () => {
      const oldResults = createMockResults({ averageLoadTime: 1000 });
      const newResults = createMockResults({ averageLoadTime: 1400 });

      const comparison = compareResults(oldResults, newResults);
      const regressions = detectRegressions(comparison);
      const exitCode = determineExitCode(regressions);

      expect(exitCode).to.equal(1);
      expect(regressions.critical.length).to.be.above(0);
    });

    it('should return exit code 0 for warnings only', () => {
      const oldResults = createMockResults({ averageLoadTime: 1000 });
      const newResults = createMockResults({ averageLoadTime: 1200 });

      const comparison = compareResults(oldResults, newResults);
      const regressions = detectRegressions(comparison);
      const exitCode = determineExitCode(regressions);

      expect(exitCode).to.equal(0);
      expect(regressions.critical.length).to.equal(0);
      expect(regressions.warnings.length).to.be.above(0);
    });

    it('should return exit code 0 for no regressions', () => {
      const oldResults = createMockResults({ averageLoadTime: 1000 });
      const newResults = createMockResults({ averageLoadTime: 1000 });

      const comparison = compareResults(oldResults, newResults);
      const regressions = detectRegressions(comparison);
      const exitCode = determineExitCode(regressions);

      expect(exitCode).to.equal(0);
      expect(regressions.critical.length).to.equal(0);
      expect(regressions.warnings.length).to.equal(0);
    });
  });
});

// Helper functions
function createMockResults(overrides = {}) {
  const {
    averageLoadTime = 1200,
    averageLCP = 1100,
    averageFCP = 900,
    averageCLS = 0.05,
    totalAccessibilityErrors = 5,
    averageSeoScore = 85,
    averageServedScore = 80,
    averageRenderedScore = 82,
    totalUrls = 10,
  } = overrides;

  return {
    summary: {
      totalUrls,
      averageLoadTime,
      averageLCP,
      averageFCP,
      averageCLS,
    },
    performanceAnalysis: [
      {
        loadTime: averageLoadTime,
        largestContentfulPaint: averageLCP,
        firstContentfulPaint: averageFCP,
        cumulativeLayoutShift: averageCLS,
      },
    ],
    pa11y: [
      {
        issues: {
          total: totalAccessibilityErrors,
          critical: 1,
          serious: 2,
          moderate: 1,
          minor: 1,
          types: ['color-contrast', 'missing-alt'],
        },
      },
    ],
    seoScores: {
      average: averageSeoScore,
    },
    llmMetrics: [
      {
        servedScore: averageServedScore,
        renderedScore: averageRenderedScore,
      },
    ],
    pages: Array.from({ length: totalUrls }, (_, i) => ({
      url: `https://example.com/page${i + 1}`,
    })),
  };
}

function detectRegressions(comparison) {
  const critical = [];
  const warnings = [];
  const improvements = [];

  // Performance regressions
  if (comparison.performance?.loadTime?.percentChange > 30) {
    critical.push({
      category: 'performance',
      metric: 'loadTime',
      severity: 'critical',
      percentChange: comparison.performance.loadTime.percentChange,
    });
  } else if (comparison.performance?.loadTime?.percentChange > 15) {
    warnings.push({
      category: 'performance',
      metric: 'loadTime',
      severity: 'warning',
      percentChange: comparison.performance.loadTime.percentChange,
    });
  }

  if (comparison.performance?.largestContentfulPaint?.percentChange > 30) {
    critical.push({
      category: 'performance',
      metric: 'largestContentfulPaint',
      severity: 'critical',
      percentChange: comparison.performance.largestContentfulPaint.percentChange,
    });
  }

  // Accessibility regressions
  if (comparison.accessibility?.errorCountChange > 0) {
    critical.push({
      category: 'accessibility',
      metric: 'errorCount',
      severity: 'critical',
      change: comparison.accessibility.errorCountChange,
    });
  }

  if (comparison.accessibility?.criticalIssuesChange > 0) {
    critical.push({
      category: 'accessibility',
      metric: 'criticalIssues',
      severity: 'critical',
      change: comparison.accessibility.criticalIssuesChange,
    });
  }

  // SEO regressions
  const seoChange = Math.abs(comparison.seo?.scoreChange || 0);
  if (comparison.seo?.scoreChange < 0) {
    if (seoChange > 10) {
      critical.push({
        category: 'seo',
        metric: 'score',
        severity: 'critical',
        percentChange: seoChange,
      });
    } else if (seoChange > 5) {
      warnings.push({
        category: 'seo',
        metric: 'score',
        severity: 'warning',
        percentChange: seoChange,
      });
    }
  } else if (comparison.seo?.scoreChange > 0) {
    improvements.push({
      category: 'seo',
      metric: 'score',
      percentChange: seoChange,
    });
  }

  return { critical, warnings, improvements };
}

function determineExitCode(regressions) {
  return regressions.critical.length > 0 ? 1 : 0;
}
