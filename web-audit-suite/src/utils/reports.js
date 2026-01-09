import fs from 'fs/promises';
import path from 'path';
import {
  generateSeoReport,
  generatePerformanceReport,
  generateSeoScores,
  generateAccessibilityReport,
  generateImageOptimizationReport,
  generateLinkAnalysisReport,
  generateContentQualityReport,
  generateSecurityReport,
} from './reportUtils/reportGenerators.js';
import {
  generateGeneralLLMReport,
  generateFrontendLLMReport,
  generateBackendLLMReport,
} from './reportUtils/llmReports.js';
import { generateExecutiveSummary } from './reportUtils/executiveSummary.js';
import { generateDashboard } from './reportUtils/dashboardGenerator.js';
import { compareWithPrevious, generateTrendData } from './historicalComparison.js';

/**
 * Main function to generate all reports
 */
/**
 * Main function to generate all reports
 */
export async function generateReports(results, urls, outputDir, context) {
  try {
    if (!results) {
      throw new Error('Invalid results structure');
    }

    context.logger.info('Starting report generation');

    // Generate standard reports
    await generateSeoReport(results, outputDir, context);
    await generatePerformanceReport(results, outputDir, context);
    await generateSeoScores(results, outputDir, context);
    await generateAccessibilityReport(results, outputDir, context);
    await generateImageOptimizationReport(results, outputDir, context);
    await generateLinkAnalysisReport(results, outputDir, context);
    await generateContentQualityReport(results, outputDir, context);
    await generateSecurityReport(results, outputDir, context);
    await generateGeneralLLMReport(results, outputDir, context);
    await generateFrontendLLMReport(results, outputDir, context);
    await generateBackendLLMReport(results, outputDir, context);

    // Check if enhanced features are enabled
    const { options } = context;
    let comparison = null;
    let trendData = null;

    // Generate comparison with previous run if historical tracking is enabled
    if (options.enableHistory) {
      try {
        comparison = await compareWithPrevious(results, outputDir, context);
        if (comparison) {
          context.logger.info('Generated comparison with previous run');
        }
      } catch (error) {
        context.logger.warn('Could not generate comparison:', error.message);
      }

      // Generate trend data from historical runs
      try {
        trendData = await generateTrendData(outputDir, context);
        if (trendData) {
          context.logger.info(`Generated trend data from ${trendData.timestamps.length} historical runs`);
        }
      } catch (error) {
        context.logger.warn('Could not generate trend data:', error.message);
      }
    }

    // Generate executive summary if enabled
    if (options.generateExecutiveSummary) {
      try {
        await generateExecutiveSummary(results, outputDir, context, comparison);
        context.logger.info('Executive summary generated');
      } catch (error) {
        context.logger.error('Error generating executive summary:', error);
      }
    }

    // Generate HTML dashboard if enabled
    if (options.generateDashboard) {
      try {
        await generateDashboard(results, outputDir, context, comparison, trendData);
        context.logger.info('HTML dashboard generated');
      } catch (error) {
        context.logger.error('Error generating dashboard:', error);
      }
    }

    // Save complete results as JSON
    await fs.writeFile(
      path.join(outputDir, 'results.json'),
      JSON.stringify(results, null, 2),
    );

    context.logger.info('All reports generated successfully');
  } catch (error) {
    context.logger.error('Error generating reports:', error);
    throw error;
  }
}

export {
  generateSeoReport,
  generatePerformanceReport,
  generateSeoScores,
  generateAccessibilityReport,
  generateImageOptimizationReport,
  generateLinkAnalysisReport,
  generateContentQualityReport,
  generateSecurityReport,
  generateGeneralLLMReport,
  generateFrontendLLMReport,
  generateBackendLLMReport,
};
