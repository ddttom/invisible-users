import fs from 'fs/promises';
import path from 'path';
import { getUrlsFromSitemap, processSitemapUrls, fetchSiteLevelFiles } from './utils/sitemap.js';
import { generateReports } from './utils/reports.js';
import { setupShutdownHandler, updateCurrentResults } from './utils/shutdownHandler.js';
import { executeNetworkOperation } from './utils/networkUtils.js';
import { RESULTS_SCHEMA_VERSION } from './utils/schemaVersion.js';
import { storeHistoricalResult, detectRegressions } from './utils/historicalComparison.js';
import { extractPatterns } from './utils/patternExtraction.js';
import { fetchRobotsTxt } from './utils/robotsFetcher.js';
import BrowserPool from './utils/browserPool.js';
import { AdaptiveRateLimiter } from './utils/rateLimiter.js';
import {
  cleanupDirectories,
  loadExistingResults,
  logExecutionSummary,
} from './utils/executionHelpers.js';

/**
 * Main function to run accessibility and SEO tests on a sitemap or webpage
 *
 * This function orchestrates the entire testing process in three phases:
 * 1. URL Collection: Retrieves URLs from sitemap or processes single page
 * 2. URL Processing: Analyzes each URL for accessibility and SEO metrics
 * 3. Report Generation: Creates detailed reports from collected data
 *
 * @returns {Promise<Object|null>} Analysis results object containing:
 *   - urls: Array of processed URLs
 *   - contentAnalysis: Content quality metrics
 *   - performanceAnalysis: Performance metrics
 *   - seoScores: SEO scoring data
 *   - pa11y: Accessibility analysis results
 *   - internalLinks: Link analysis data
 * @throws {Error} If any phase fails
 * @example
 * // Run tests with default options
 * const results = await runTestsOnSitemap();
 *
 * // Results structure:
 * {
 *   urls: ['https://example.com'],
 *   contentAnalysis: [...],
 *   performanceAnalysis: [...],
 *   seoScores: [...],
 *   pa11y: [...],
 *   internalLinks: [...]
 * }
 */
/**
 * Main function to run accessibility and SEO tests on a sitemap or webpage
 */
export async function runTestsOnSitemap(context) {
  const { sitemap: sitemapUrl, output: outputDir, count } = context.options;

  // Setup shutdown handler at the start to ensure graceful termination
  setupShutdownHandler(context);

  context.logger.info(`Starting process for sitemap or page: ${sitemapUrl}`);
  context.logger.info(`Results will be saved to: ${outputDir}`);

  // Initialize browser pool for performance optimization
  if (context.options.browserPoolSize > 0) {
    try {
      context.logger.info(`Initializing browser pool with ${context.options.browserPoolSize} instances...`);
      context.browserPool = new BrowserPool(context, {
        poolSize: context.options.browserPoolSize,
        launchOptions: {
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      });
      await context.browserPool.initialize();
      context.logger.info('✓ Browser pool initialized successfully');
    } catch (error) {
      context.logger.warn(`Browser pool initialization failed: ${error.message}`);
      context.logger.warn('Falling back to direct browser launch mode');
      context.browserPool = null;
    }
  }

  // Initialize adaptive rate limiter for server-friendly crawling
  if (context.options.rateLimiting?.enabled) {
    context.logger.info('Initializing adaptive rate limiter...');
    context.rateLimiter = new AdaptiveRateLimiter(context, context.options.rateLimiting);
    context.logger.info('✓ Adaptive rate limiter initialized');
  }

  // Handle cleanups
  await cleanupDirectories(context.options, context);

  const resultsPath = path.join(outputDir, 'results.json');

  // Try to resume
  let results = await loadExistingResults(resultsPath, context.options, context);

  try {
    if (!results) {
      // Phase 0: Fetch robots.txt before any URL crawling
      context.logger.info('Phase 0: Fetching robots.txt...');
      try {
        context.robotsTxtData = await fetchRobotsTxt(sitemapUrl, context);
        if (context.robotsTxtData && context.robotsTxtData.exists) {
          context.logger.info('✓ robots.txt fetched and parsed successfully');
        } else {
          context.logger.info('No robots.txt found - allowing all URLs by default');
        }
      } catch (error) {
        context.logger.warn(`Error fetching robots.txt: ${error.message}`);
        context.logger.info('Proceeding without robots.txt validation');
        context.robotsTxtData = null;
      }
      // Phase 1: Get URLs from sitemap or process single page
      context.logger.info('Phase 1: Getting sitemap URLs...');
      const urls = await executeNetworkOperation(
        () => getUrlsFromSitemap(sitemapUrl, context, count), // PASS CONTEXT
        'sitemap URL retrieval',
        context, // Optional if executeNetworkOperation needs it
      );

      if (!urls || urls.length === 0) {
        context.logger.warn('No valid URLs found to process');
        return null;
      }

      context.logger.info(`Found ${urls.length} URLs to process`);

      // Fetch site-level files (llms.txt, robots.txt, ai.txt)
      context.logger.info('Fetching site-level files...');
      const siteFiles = await fetchSiteLevelFiles(sitemapUrl, context);

      // Phase 2: Process URLs through analysis pipeline
      context.logger.info('Phase 2: Processing URLs...');
      // Commander.js converts --no-recursive to recursive: false, defaults to true
      const { recursive = true } = context.options;

      results = await executeNetworkOperation(
        () => processSitemapUrls(
          urls.slice(0, count === -1 ? urls.length : count),
          context, // PASS CONTEXT
          recursive, // Pass recursive flag (default: true)
        ),
        'URL processing',
        context,
      );

      // Store original sitemap URLs for comparison with discovered URLs
      results.originalSitemapUrls = urls.map((u) => u.url);

      // Store site-level files detection results
      results.siteFiles = siteFiles;

      // Add schema version to results
      results.schemaVersion = RESULTS_SCHEMA_VERSION;

      // Save results for future use and resume capability
      await fs.writeFile(resultsPath, JSON.stringify(results));
    }

    // Update current results for shutdown handler to ensure data persistence
    updateCurrentResults(results);

    // Store historical result if enabled
    if (context.options.enableHistory) {
      try {
        await storeHistoricalResult(results, outputDir, context);
        context.logger.info('Historical result stored for future comparison');
      } catch (error) {
        context.logger.warn('Could not store historical result:', error.message);
      }
    }

    // Phase 3: Generate comprehensive reports from collected data
    context.logger.info('Phase 3: Generating reports...');
    await executeNetworkOperation(
      () => generateReports(results, results.urls || [], outputDir, context), // PASS CONTEXT
      'report generation',
      context,
    );

    // Pattern Extraction: Identify high-scoring pages and extract successful patterns
    if (context.options.extractPatterns && results.urls && results.urls.length > 0) {
      context.logger.info('Phase 3b: Extracting patterns from high-scoring pages...');
      try {
        const patternResults = await extractPatterns(results.urls, outputDir, context, {
          minServedScore: 70,
          minRenderedScore: 70,
          maxExamples: 5,
        });
        if (patternResults.success) {
          context.logger.info(`✓ Pattern extraction complete: analyzed ${patternResults.pagesAnalyzed} high-scoring pages`);
        } else {
          context.logger.info(patternResults.message);
        }
      } catch (error) {
        context.logger.warn(`Pattern extraction failed: ${error.message}`);
      }
    }

    // Regression Detection: Compare with baseline if enabled
    if (context.options.enableHistory) {
      context.logger.info('Phase 3c: Checking for regressions...');
      try {
        const regressionResults = await detectRegressions(results.urls, outputDir, context);
        if (regressionResults.hasBaseline) {
          const regressionCount = regressionResults.regressions.length;
          if (regressionCount > 0) {
            context.logger.warn(`⚠️  Found ${regressionCount} regressions (${regressionResults.hasCriticalRegressions ? 'CRITICAL' : 'warnings'})`);
            context.logger.info('See regression_report.md for details');

            // Exit with error code if critical regressions found (for CI/CD)
            if (regressionResults.hasCriticalRegressions) {
              context.logger.error('Critical regressions detected - review regression_report.md');
            }
          } else {
            context.logger.info('✓ No regressions detected - all metrics maintained or improved');
          }
        } else {
          context.logger.info('No baseline found - establishing baseline for future comparisons');
        }
      } catch (error) {
        context.logger.warn(`Regression detection failed: ${error.message}`);
      }
    }

    logExecutionSummary(results, context);

    return results;
  } catch (error) {
    context.logger.error('Error in runTestsOnSitemap:', error);
    throw error;
  } finally {
    // Cleanup: Shutdown browser pool
    if (context.browserPool) {
      context.logger.info('Shutting down browser pool...');
      try {
        await context.browserPool.shutdown();
        context.logger.info('✓ Browser pool shutdown complete');
      } catch (error) {
        context.logger.warn(`Error shutting down browser pool: ${error.message}`);
      }
    }

    // Log rate limiter statistics
    if (context.rateLimiter) {
      const stats = context.rateLimiter.getStatistics();
      context.logger.info('Rate limiter statistics:');
      context.logger.info(`  Final concurrency: ${stats.concurrency}`);
      context.logger.info(`  Rate limit responses: ${stats.rateLimitCount}`);
      context.logger.info(`  Total requests: ${stats.totalRequests}`);
    }
  }
}
