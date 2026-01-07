/**
 * LLM Suitability Metrics Collection
 *
 * Facade that delegates to the specialized modules:
 * - src/collectors/llmCollector.js
 * - src/scorers/llmScorer.js
 * - src/reporters/llmFeedback.js
 */

import { LLMCollector } from '../collectors/llmCollector.js';
import { LLMScorer } from '../scorers/llmScorer.js';
import { LLMFeedback } from '../reporters/llmFeedback.js';

/**
 * Main function to collect all LLM metrics
 */
export function collectLLMMetrics($, url, htmlSource = 'rendered') {
  return LLMCollector.collect($, url, htmlSource);
}

/**
 * Calculate criticality-weighted score for SERVED HTML
 */
export function calculateServedScore(metrics) {
  return LLMScorer.calculateServedScore(metrics);
}

/**
 * Calculate criticality-weighted score for RENDERED HTML
 */
export function calculateRenderedScore(metrics) {
  return LLMScorer.calculateRenderedScore(metrics);
}

/**
 * Generate actionable feedback based on metrics
 */
export function generateFeedback(metrics) {
  return LLMFeedback.generate(metrics);
}

/**
 * Updates the results object with LLM metrics
 */
export function updateLLMMetrics($, results, url, context, htmlSource = 'rendered') {
  if (!results.llmMetrics) {
    results.llmMetrics = [];
  }

  const metrics = collectLLMMetrics($, url, htmlSource);
  results.llmMetrics.push(metrics);

  context.logger.debug(`Updated LLM metrics for ${url} (${htmlSource} HTML)`);
}
