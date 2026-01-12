/**
 * Schema.org Validation Reports
 * Generates CSV and markdown reports for Schema.org analysis
 */

const fs = require('fs').promises;
const path = require('path');

/**
 * Generate Schema.org validation CSV report
 * @param {Array} schemaValidation - Array of schema validation results
 * @param {string} outputDir - Output directory
 * @param {Object} context - Audit context
 */
async function generateSchemaValidationCSV(schemaValidation, outputDir, context) {
  try {
    const csvRows = [];
    csvRows.push([
      'URL',
      'Has Schemas',
      'Schema Count',
      'Valid Schemas',
      'Invalid Schemas',
      'Total Issues',
      'Total Warnings',
      'Schema Types',
      'Summary'
    ].join(','));

    schemaValidation.forEach(result => {
      const schemaTypes = result.schemas
        ? result.schemas.map(s => s.type).join('; ')
        : '';

      csvRows.push([
        `"${result.url}"`,
        result.hasSchemas ? 'Yes' : 'No',
        result.schemaCount || 0,
        result.validSchemas || 0,
        result.invalidSchemas || 0,
        result.totalIssues || 0,
        result.totalWarnings || 0,
        `"${schemaTypes}"`,
        `"${result.summary || ''}"`
      ].join(','));
    });

    const filePath = path.join(outputDir, 'schema-validation.csv');
    await fs.writeFile(filePath, csvRows.join('\n'));
    context.logger.info(`Schema validation CSV saved: ${filePath}`);

    return filePath;
  } catch (error) {
    context.logger.error(`Failed to generate schema validation CSV: ${error.message}`);
    throw error;
  }
}

/**
 * Generate detailed Schema.org validation CSV with all issues
 * @param {Array} schemaValidation - Array of schema validation results
 * @param {string} outputDir - Output directory
 * @param {Object} context - Audit context
 */
async function generateSchemaIssuesCSV(schemaValidation, outputDir, context) {
  try {
    const csvRows = [];
    csvRows.push([
      'URL',
      'Schema Type',
      'Schema Index',
      'Severity',
      'Issue Type',
      'Property',
      'Message'
    ].join(','));

    schemaValidation.forEach(result => {
      if (!result.schemas) return;

      result.schemas.forEach((schema, index) => {
        // Add errors
        if (schema.issues) {
          schema.issues.forEach(issue => {
            csvRows.push([
              `"${result.url}"`,
              `"${schema.type || 'Unknown'}"`,
              index + 1,
              'Error',
              'Validation',
              `"${issue.property || ''}"`,
              `"${issue.message || ''}"`
            ].join(','));
          });
        }

        // Add warnings
        if (schema.warnings) {
          schema.warnings.forEach(warning => {
            csvRows.push([
              `"${result.url}"`,
              `"${schema.type || 'Unknown'}"`,
              index + 1,
              'Warning',
              'Recommendation',
              `"${warning.property || ''}"`,
              `"${warning.message || ''}"`
            ].join(','));
          });
        }
      });
    });

    const filePath = path.join(outputDir, 'schema-issues.csv');
    await fs.writeFile(filePath, csvRows.join('\n'));
    context.logger.info(`Schema issues CSV saved: ${filePath}`);

    return filePath;
  } catch (error) {
    context.logger.error(`Failed to generate schema issues CSV: ${error.message}`);
    throw error;
  }
}

/**
 * Generate page type analysis CSV
 * @param {Array} pageTypes - Array of page type detection results
 * @param {string} outputDir - Output directory
 * @param {Object} context - Audit context
 */
async function generatePageTypeCSV(pageTypes, outputDir, context) {
  try {
    const csvRows = [];
    csvRows.push([
      'URL',
      'Primary Type',
      'All Types',
      'Schema Types',
      'Confidence',
      'Source',
      'Has Multiple Types'
    ].join(','));

    pageTypes.forEach(result => {
      csvRows.push([
        `"${result.url}"`,
        `"${result.primaryType || 'Unknown'}"`,
        `"${(result.allTypes || []).join('; ')}"`,
        `"${(result.schemaTypes || []).join('; ')}"`,
        result.confidence || 'none',
        result.source || 'unknown',
        result.hasMultipleTypes ? 'Yes' : 'No'
      ].join(','));
    });

    const filePath = path.join(outputDir, 'page-types.csv');
    await fs.writeFile(filePath, csvRows.join('\n'));
    context.logger.info(`Page type CSV saved: ${filePath}`);

    return filePath;
  } catch (error) {
    context.logger.error(`Failed to generate page type CSV: ${error.message}`);
    throw error;
  }
}

/**
 * Generate page type statistics CSV
 * @param {Object} stats - Page type statistics from pageTypeDetector
 * @param {string} outputDir - Output directory
 * @param {Object} context - Audit context
 */
async function generatePageTypeStatsCSV(stats, outputDir, context) {
  try {
    const csvRows = [];
    csvRows.push([
      'Page Type',
      'Count',
      'Total Schemas',
      'Total Issues',
      'Total Warnings',
      'Schema Types Used',
      'Example URLs'
    ].join(','));

    Object.entries(stats).forEach(([pageType, data]) => {
      const exampleUrls = data.urls.slice(0, 3).join('; ');
      csvRows.push([
        `"${pageType}"`,
        data.count,
        data.totalSchemas,
        data.totalIssues,
        data.totalWarnings,
        `"${data.schemaTypes.join('; ')}"`,
        `"${exampleUrls}"`
      ].join(','));
    });

    const filePath = path.join(outputDir, 'page-type-stats.csv');
    await fs.writeFile(filePath, csvRows.join('\n'));
    context.logger.info(`Page type statistics CSV saved: ${filePath}`);

    return filePath;
  } catch (error) {
    context.logger.error(`Failed to generate page type stats CSV: ${error.message}`);
    throw error;
  }
}

/**
 * Generate comprehensive Schema.org markdown summary
 * @param {Array} schemaValidation - Schema validation results
 * @param {Array} pageTypes - Page type results
 * @param {Object} stats - Page type statistics
 * @param {string} outputDir - Output directory
 * @param {Object} context - Audit context
 */
async function generateSchemaSummaryMarkdown(schemaValidation, pageTypes, stats, outputDir, context) {
  try {
    const lines = [];

    lines.push('# Schema.org Analysis Summary\n');
    lines.push(`Generated: ${new Date().toISOString()}\n`);

    // Overall statistics
    lines.push('## Overall Statistics\n');
    const totalPages = schemaValidation.length;
    const pagesWithSchemas = schemaValidation.filter(r => r.hasSchemas).length;
    const totalSchemas = schemaValidation.reduce((sum, r) => sum + (r.schemaCount || 0), 0);
    const totalIssues = schemaValidation.reduce((sum, r) => sum + (r.totalIssues || 0), 0);
    const totalWarnings = schemaValidation.reduce((sum, r) => sum + (r.totalWarnings || 0), 0);

    lines.push(`- **Total Pages Analyzed:** ${totalPages}`);
    lines.push(`- **Pages with Schema.org:** ${pagesWithSchemas} (${((pagesWithSchemas/totalPages) * 100).toFixed(1)}%)`);
    lines.push(`- **Total Schemas Found:** ${totalSchemas}`);
    lines.push(`- **Total Validation Issues:** ${totalIssues}`);
    lines.push(`- **Total Warnings:** ${totalWarnings}\n`);

    // Page type distribution
    lines.push('## Page Type Distribution\n');
    lines.push('| Page Type | Count | Schemas | Issues | Warnings |');
    lines.push('|-----------|-------|---------|--------|----------|');

    Object.entries(stats).sort((a, b) => b[1].count - a[1].count).forEach(([pageType, data]) => {
      lines.push(`| ${pageType} | ${data.count} | ${data.totalSchemas} | ${data.totalIssues} | ${data.totalWarnings} |`);
    });
    lines.push('');

    // Top issues
    lines.push('## Most Common Issues\n');
    const issueCount = {};
    schemaValidation.forEach(result => {
      if (!result.schemas) return;
      result.schemas.forEach(schema => {
        if (schema.issues) {
          schema.issues.forEach(issue => {
            const key = `${issue.message} (${issue.property || 'N/A'})`;
            issueCount[key] = (issueCount[key] || 0) + 1;
          });
        }
      });
    });

    const sortedIssues = Object.entries(issueCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    if (sortedIssues.length > 0) {
      lines.push('| Issue | Occurrences |');
      lines.push('|-------|-------------|');
      sortedIssues.forEach(([issue, count]) => {
        lines.push(`| ${issue} | ${count} |`);
      });
    } else {
      lines.push('No issues found.\n');
    }
    lines.push('');

    // Recommendations
    lines.push('## Recommendations\n');
    if (totalIssues > 0) {
      lines.push('### Critical Actions\n');
      lines.push('1. **Fix validation errors:** Address all required property issues');
      lines.push('2. **Add missing schemas:** Ensure all pages have appropriate Schema.org markup');
      lines.push('3. **Enhance Offer objects:** Add seller, itemCondition, and validity dates\n');
    }

    if (totalWarnings > 0) {
      lines.push('### Recommended Improvements\n');
      lines.push('1. **Add images:** Include image property on all schemas');
      lines.push('2. **Add temporal data:** Include datePublished and dateModified');
      lines.push('3. **Enhance completeness:** Add recommended properties for better search visibility\n');
    }

    // Pages without schemas
    const pagesWithoutSchemas = schemaValidation.filter(r => !r.hasSchemas);
    if (pagesWithoutSchemas.length > 0) {
      lines.push('## Pages Without Schema.org\n');
      pagesWithoutSchemas.slice(0, 10).forEach(result => {
        lines.push(`- ${result.url}`);
      });
      if (pagesWithoutSchemas.length > 10) {
        lines.push(`\n...and ${pagesWithoutSchemas.length - 10} more\n`);
      }
      lines.push('');
    }

    const filePath = path.join(outputDir, 'schema-summary.md');
    await fs.writeFile(filePath, lines.join('\n'));
    context.logger.info(`Schema summary markdown saved: ${filePath}`);

    return filePath;
  } catch (error) {
    context.logger.error(`Failed to generate schema summary markdown: ${error.message}`);
    throw error;
  }
}

/**
 * Generate all Schema.org reports
 * @param {Object} results - Results object with schemaValidation and pageTypes
 * @param {string} outputDir - Output directory
 * @param {Object} context - Audit context
 */
async function generateAllSchemaReports(results, outputDir, context) {
  try {
    context.logger.info('Generating Schema.org reports...');

    const schemaValidation = results.schemaValidation || [];
    const pageTypes = results.pageTypes || [];

    if (schemaValidation.length === 0) {
      context.logger.warn('No schema validation data found, skipping Schema.org reports');
      return [];
    }

    // Calculate page type statistics
    const pageTypeDetector = require('../pageTypeDetector.js');
    const stats = pageTypeDetector.getPageTypeStatistics(
      pageTypes.map((pt, index) => ({
        url: pt.url,
        pageType: pt,
        schemaValidation: schemaValidation[index]
      }))
    );

    const reportPaths = [];

    // Generate all reports
    reportPaths.push(await generateSchemaValidationCSV(schemaValidation, outputDir, context));
    reportPaths.push(await generateSchemaIssuesCSV(schemaValidation, outputDir, context));
    reportPaths.push(await generatePageTypeCSV(pageTypes, outputDir, context));
    reportPaths.push(await generatePageTypeStatsCSV(stats, outputDir, context));
    reportPaths.push(await generateSchemaSummaryMarkdown(schemaValidation, pageTypes, stats, outputDir, context));

    context.logger.info(`Generated ${reportPaths.length} Schema.org reports`);
    return reportPaths;
  } catch (error) {
    context.logger.error(`Failed to generate Schema.org reports: ${error.message}`);
    throw error;
  }
}

module.exports = {
  generateSchemaValidationCSV,
  generateSchemaIssuesCSV,
  generatePageTypeCSV,
  generatePageTypeStatsCSV,
  generateSchemaSummaryMarkdown,
  generateAllSchemaReports
};
