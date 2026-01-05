import fs from 'fs/promises';

import { RESULTS_SCHEMA_VERSION, areVersionsCompatible } from './schemaVersion.js';
import { getDiscoveredUrls } from './sitemapUtils.js';

/**
 * Handles the cleanup of output and cache directories based on options
 * @param {Object} options - Application options
 * @param {Object} context - Logger context
 */
export async function cleanupDirectories(options, context = global.auditcore) {
  const { output: outputDir, forceDeleteCache, cacheDir = '.cache' } = options;

  if (forceDeleteCache) {
    try {
      await fs.rm(outputDir, { recursive: true, force: true });
      context.logger.info('Force delete cache: Deleted results directory');
      // Recreate the output directory
      await fs.mkdir(outputDir, { recursive: true });

      await fs.rm(cacheDir, { recursive: true, force: true });
      context.logger.info(`Force delete cache: Deleted cache directory (${cacheDir})`);
      await fs.mkdir(cacheDir, { recursive: true });
      context.logger.info(`Recreated output directory: ${outputDir}`);
    } catch (error) {
      context.logger.debug('Error clearing results directory:', error.message);
    }
  }
}

/**
 * Attempts to load existing results for resuming execution
 * @param {string} resultsPath - Path to results.json
 * @param {Object} options - Application options
 * @param {Object} context - Logger context
 * @returns {Promise<Object|null>} existing results or null
 */
export async function loadExistingResults(resultsPath, options, context = global.auditcore) {
  const { cache = true, noCache: explicitNoCache = false, forceDeleteCache = false } = options;
  const noCache = explicitNoCache || !cache;

  if (noCache || forceDeleteCache) {
    return null;
  }

  try {
    const existingResults = await fs.readFile(resultsPath, 'utf-8');
    const parsedResults = JSON.parse(existingResults);

    // Check schema version compatibility
    const cachedVersion = parsedResults.schemaVersion || '1.0.0';

    if (!areVersionsCompatible(cachedVersion, RESULTS_SCHEMA_VERSION)) {
      context.logger.warn(`Schema version mismatch: cached=${cachedVersion}, current=${RESULTS_SCHEMA_VERSION}`);
      context.logger.warn('Cached results are incompatible with current schema. Reprocessing all URLs...');
      context.logger.info('Reason: New data fields have been added that require fresh analysis');
      return null;
    }

    context.logger.info(`Found existing results (schema v${cachedVersion}), using cached data`);
    return parsedResults;
  } catch (error) {
    context.logger.debug('No existing results found, starting fresh processing');
    return null;
  }
}

/**
 * Logs summary information after processing is complete
 * @param {Object} results - The analysis results
 * @param {Object} context - Logger context
 */
export function logExecutionSummary(results, context = global.auditcore) {
  // Specific URL Search Results
  if (results.specificUrlMetrics && results.specificUrlMetrics.length > 0) {
    context.logger.info(`\n=== Specific URL Search Results ===\nFound ${results.specificUrlMetrics.length} occurrences of the target URL.\nSee specific_url_report.csv for details.\n=====================================\n`);
  } else {
    context.logger.info('\n=== Specific URL Search Results ===\nNo occurrences of the target URL were found.\n=====================================\n');
  }

  // External Resources Summary
  if (results.externalResourcesAggregation && Object.keys(results.externalResourcesAggregation).length > 0) {
    const totalResources = Object.keys(results.externalResourcesAggregation).length;
    const totalReferences = Object.values(results.externalResourcesAggregation).reduce((sum, r) => sum + r.count, 0);

    // Count by type
    const typeBreakdown = Object.values(results.externalResourcesAggregation).reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {});

    const typeBreakdownStr = Object.entries(typeBreakdown)
      .map(([type, c]) => `${type}: ${c}`)
      .join(', ');

    context.logger.info(`\n=== All Resources Summary ===\nFound ${totalResources} unique resources (${totalReferences} total references)\nBreakdown: ${typeBreakdownStr}\nSee all_resources_report.csv for details.\n=====================================\n`);
  } else {
    context.logger.info('\n=== All Resources Summary ===\nNo resources found.\n=====================================\n');
  }

  // Missing sitemap URLs summary
  const discoveredUrls = getDiscoveredUrls(results);
  if (discoveredUrls.length > 0) {
    const urlList = discoveredUrls.map((url, index) => `  ${index + 1}. ${url}`).join('\n');
    context.logger.info(`\n=== Missing Sitemap URLs ===\nFound ${discoveredUrls.length} same-domain URLs not in original sitemap\nThese URLs were discovered during page analysis\n\nDiscovered URLs:\n${urlList}\n\nSee missing_sitemap_urls.csv for details\nPerfected sitemap saved as v-sitemap.xml\n=====================================\n`);
  } else {
    context.logger.info('\n=== Missing Sitemap URLs ===\nAll discovered URLs were in the original sitemap\nPerfected sitemap saved as v-sitemap.xml\n=====================================\n');
  }
}
