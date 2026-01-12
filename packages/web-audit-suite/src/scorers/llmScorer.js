import { SCORING_WEIGHTS } from '../config/scoringWeights.js';

export class LLMScorer {
  /**
   * Calculate score for SERVED HTML
   * @param {Object} metrics - Raw metrics from LLMCollector
   * @returns {number} Score (0-100)
   */
  static calculateServedScore(metrics) {
    if (!metrics || metrics.error) return 0;

    let score = 0;
    const weights = SCORING_WEIGHTS.SERVED;

    // Semantic HTML
    if (metrics.semanticHTML?.metrics) {
      const sem = metrics.semanticHTML.metrics;
      if (sem.hasMain) score += weights.SEMANTIC_HTML.hasMain;
      if (sem.hasNav) score += weights.SEMANTIC_HTML.hasNav;
      if (sem.hasHeader) score += weights.SEMANTIC_HTML.hasHeader;
      if (sem.hasFooter) score += weights.SEMANTIC_HTML.hasFooter;
      if (sem.hasArticle || sem.hasSection) score += weights.SEMANTIC_HTML.hasArticleOrSection;
    }

    // Form Fields
    if (metrics.formFields?.metrics) {
      const form = metrics.formFields.metrics;
      score += form.standardNameRatio * weights.FORM_FIELDS.standardNameRatio;
      score += form.labelRatio * weights.FORM_FIELDS.labelRatio;
    }

    // Form Autocomplete
    if (metrics.formAutocomplete?.metrics) {
      score += metrics.formAutocomplete.metrics.autocompleteRatio * weights.FORM_AUTOCOMPLETE.autocompleteRatio;
    }

    // Structured Data
    if (metrics.structuredData?.metrics) {
      if (metrics.structuredData.metrics.hasSchemaOrg) score += weights.STRUCTURED_DATA.hasSchemaOrg;
    }

    // FAQ Schema
    if (metrics.faqSchema?.metrics) {
      const faq = metrics.faqSchema.metrics;
      if (faq.hasFAQPage) {
        score += weights.FAQ_SCHEMA.hasFAQPage;
        score += faq.completenessRatio * weights.FAQ_SCHEMA.completenessRatio;
      }
      if (faq.hasDuplicateMarkup) {
        score += weights.FAQ_SCHEMA.duplicatePenalty; // Note: penalty is negative number in config
      }
    }

    // LLMs.txt
    if (metrics.llmsTxt?.metrics) {
      if (metrics.llmsTxt.metrics.hasLLMsTxtReference || metrics.llmsTxt.metrics.hasLLMsTxtMeta) {
        score += weights.LLMS_TXT.presence;
      }
    }

    // Robots/AI.txt
    if (metrics.robotsTxt?.metrics) {
      if (metrics.robotsTxt.metrics.hasAiTxtReference) score += weights.ROBOTS_TXT.hasAiTxt;
      if (metrics.robotsTxt.metrics.hasAgentRestrictions) score += weights.ROBOTS_TXT.agentRestrictions; // Note: restriction is negative number in config
    }

    // Tables
    if (metrics.tableData?.metrics) {
      if (metrics.tableData.metrics.tableCount > 0) {
        const hasProperMarkup = metrics.tableData.metrics.tablesWithScope > 0
                                && metrics.tableData.metrics.tablesWithCaption > 0;
        if (hasProperMarkup) score += weights.TABLES.properMarkup;
      } else {
        score += weights.TABLES.emptyBonus;
      }
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  /**
   * Calculate score for RENDERED HTML
   * @param {Object} metrics - Raw metrics from LLMCollector
   * @returns {number} Score (0-100)
   */
  static calculateRenderedScore(metrics) {
    if (!metrics || metrics.error) return 0;

    // Start with served score
    const score = this.calculateServedScore(metrics);
    const weights = SCORING_WEIGHTS.RENDERED;

    let renderedBonus = 0;

    // Explicit State
    if (metrics.dataAttributes?.metrics) {
      const data = metrics.dataAttributes.metrics;
      if (data.hasDataState) renderedBonus += weights.DATA_ATTRIBUTES.hasDataState;
      if (data.hasValidationState) renderedBonus += weights.DATA_ATTRIBUTES.hasValidationState;
      if (data.hasLoadingIndicators) renderedBonus += weights.DATA_ATTRIBUTES.hasLoadingIndicators;
    }

    // Error Handling
    if (metrics.errorHandling?.metrics) {
      const err = metrics.errorHandling.metrics;
      if (err.hasPersistentErrors) renderedBonus += weights.ERROR_HANDLING.hasPersistentErrors;
      if (err.hasAriaInvalid) renderedBonus += weights.ERROR_HANDLING.hasAriaInvalid;
    }

    renderedBonus = Math.min(renderedBonus, weights.MAX_BONUS);
    return Math.min(score + renderedBonus, 100);
  }
}
