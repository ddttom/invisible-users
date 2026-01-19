/**
 * Schema.org Analysis Integration
 * Integrates schema validation and page type detection into the analysis pipeline
 */

const schemaValidator = require('./schemaValidator.js');
const pageTypeDetector = require('./pageTypeDetector.js');

/**
 * Analyze Schema.org structured data for a page
 * @param {Object} page - Puppeteer page object
 * @param {string} url - Page URL
 * @param {Object} results - Results object to update
 * @param {Object} context - Audit context with logger
 * @returns {Promise<Object>} Analysis results
 */
async function analyzePageSchemas(page, url, results, context) {
  try {
    context.logger.debug(`Analyzing Schema.org for ${url}`);

    // Extract and validate schemas
    const schemaValidation = await schemaValidator.analyzeSchemas(page, url);

    // Detect page type from schemas
    const pageType = pageTypeDetector.analyzePageType(
      schemaValidation.schemas || [],
      url,
    );

    // Store results
    if (!results.schemaValidation) {
      results.schemaValidation = [];
    }
    results.schemaValidation.push(schemaValidation);

    if (!results.pageTypes) {
      results.pageTypes = [];
    }
    results.pageTypes.push({
      url,
      ...pageType,
    });

    context.logger.info(
      `Schema analysis for ${url}: ${schemaValidation.schemaCount} schemas, `
      + `type: ${pageType.primaryType}, ${schemaValidation.totalIssues} issues`,
    );

    return {
      schemaValidation,
      pageType,
    };
  } catch (error) {
    context.logger.error(`Schema analysis failed for ${url}: ${error.message}`);
    return {
      schemaValidation: {
        url,
        hasSchemas: false,
        schemaCount: 0,
        error: error.message,
      },
      pageType: {
        primaryType: 'Unknown',
        allTypes: [],
        confidence: 'none',
      },
    };
  }
}

/**
 * Update results with schema analysis data
 * For use in pageAnalyzer.js integration
 * @param {Object} page - Puppeteer page object
 * @param {string} url - Page URL
 * @param {Object} results - Results object
 * @param {Object} context - Audit context
 */
async function updateSchemaResults(page, url, results, context) {
  const analysis = await analyzePageSchemas(page, url, results, context);
  return analysis;
}

module.exports = {
  analyzePageSchemas,
  updateSchemaResults,
};
