/**
 * LLM Feedback Generator
 *
 * Generates human-readable feedback strings based on LLM metrics.
 */

export class LLMFeedback {
  /**
   * Generate actionable feedback based on metrics
   * @param {Object} metrics - Raw metrics from LLMCollector
   * @returns {Object} Object containing arrays of issues and recommendations
   */
  static generate(metrics) {
    const essentialIssues = [];
    const niceToHaveIssues = [];
    const recommendations = [];

    if (!metrics || metrics.error) {
      return {
        essentialIssues: ['Failed to collect LLM metrics'],
        niceToHaveIssues: [],
        recommendations: [],
      };
    }

    this.getSemanticHtmlFeedback(metrics, essentialIssues, recommendations);
    this.getFormFeedback(metrics, essentialIssues, recommendations);
    this.getMetadataFeedback(metrics, essentialIssues, niceToHaveIssues, recommendations);
    this.getFAQFeedback(metrics, essentialIssues, niceToHaveIssues, recommendations);
    this.getRenderedFeedback(metrics, niceToHaveIssues, recommendations);
    this.getNiceToHaveFeedback(metrics, niceToHaveIssues, recommendations);

    return { essentialIssues, niceToHaveIssues, recommendations };
  }

  static getSemanticHtmlFeedback(metrics, essentialIssues, recommendations) {
    if (!metrics.semanticHTML?.metrics.hasMain) {
      essentialIssues.push('No <main> element - agents cannot identify primary content');
      recommendations.push('Add <main> element around primary page content');
    }

    if (!metrics.semanticHTML?.metrics.hasNav) {
      essentialIssues.push('No <nav> element - agents cannot identify navigation');
      recommendations.push('Wrap navigation menus in <nav> elements');
    }
  }

  static getFormFeedback(metrics, essentialIssues, recommendations) {
    if (metrics.formFields?.metrics && metrics.formFields.metrics.totalInputs > 0) {
      const standardRatio = metrics.formFields.metrics.standardNameRatio;
      if (standardRatio < 0.5) {
        essentialIssues.push(`Only ${Math.round(standardRatio * 100)}% of form fields use standard names`);
        recommendations.push('Use standard field names: email, firstName, lastName, phone, etc.');
      }

      const { labelRatio } = metrics.formFields.metrics;
      if (labelRatio < 0.8) {
        essentialIssues.push(`${Math.round((1 - labelRatio) * 100)}% of form fields missing labels`);
        recommendations.push('Add <label> or aria-label to all form fields');
      }
    }

    if (metrics.formAutocomplete?.metrics && metrics.formAutocomplete.metrics.totalFormFields > 0) {
      const { autocompleteRatio } = metrics.formAutocomplete.metrics;
      if (autocompleteRatio < 0.5) {
        essentialIssues.push(`Only ${Math.round(autocompleteRatio * 100)}% of form fields have autocomplete attributes`);
        recommendations.push('Add autocomplete attributes to form fields (e.g., autocomplete="email", "name", "tel")');
      }
    }
  }

  static getMetadataFeedback(metrics, essentialIssues, niceToHaveIssues, recommendations) {
    if (!metrics.structuredData?.metrics.hasSchemaOrg) {
      essentialIssues.push('No Schema.org structured data');
      recommendations.push('Add JSON-LD with Schema.org vocabulary for key content');
    }

    if (!metrics.llmsTxt?.metrics.hasLLMsTxtReference && !metrics.llmsTxt?.metrics.hasLLMsTxtMeta) {
      essentialIssues.push('No llms.txt file detected');
      recommendations.push('Add llms.txt file at site root for LLM agent discovery (see llmstxt.org)');
    }

    if (metrics.robotsTxt?.metrics) {
      if (metrics.robotsTxt.metrics.hasAgentRestrictions) {
        essentialIssues.push('Page has robot restrictions (noindex/nofollow) that may block agents');
        recommendations.push('Review robots meta tags - consider allowing agent access where appropriate');
      }
      if (!metrics.robotsTxt.metrics.hasAiTxtReference) {
        niceToHaveIssues.push('No ai.txt file detected for AI-specific instructions');
        recommendations.push('Consider adding ai.txt file for AI agent-specific guidance');
      }
    }
  }

  static getFAQFeedback(metrics, essentialIssues, niceToHaveIssues, recommendations) {
    const faq = metrics.faqSchema?.metrics;

    if (!faq || !faq.hasFAQPage) {
      // FAQ is optional, so skip if not present
      return;
    }

    // FAQ present - validate quality
    if (faq.faqCount === 0) {
      essentialIssues.push('FAQPage markup present but contains no questions');
      recommendations.push('Add Question items to FAQPage mainEntity array');
    }

    if (faq.completenessRatio < 1.0 && faq.faqCount > 0) {
      const missingPercent = Math.round((1 - faq.completenessRatio) * 100);
      essentialIssues.push(`${missingPercent}% of FAQ items missing answers`);
      recommendations.push('Ensure all Question items have acceptedAnswer.text properties');
    }

    if (faq.hasDuplicateMarkup) {
      essentialIssues.push('FAQ uses dual-format markup (JSON-LD + microdata) creating redundancy');
      recommendations.push('Remove microdata markup, keep JSON-LD only (see Appendix D for guidance)');
    }
  }

  static getRenderedFeedback(metrics, niceToHaveIssues, recommendations) {
    if (metrics.htmlSource !== 'rendered') return;

    if (!metrics.dataAttributes?.metrics.hasDataState) {
      niceToHaveIssues.push('No data-state attributes for dynamic content');
      recommendations.push('Add data-state to loading indicators and dynamic content');
    }

    if (!metrics.dataAttributes?.metrics.hasAgentVisibilityControl) {
      niceToHaveIssues.push('No data-agent-visible attributes found');
      recommendations.push('Consider using data-agent-visible to explicitly control agent visibility');
    }

    if (!metrics.errorHandling?.metrics.hasPersistentErrors) {
      niceToHaveIssues.push('Error messages may not persist');
      recommendations.push('Use role="alert" and aria-live for persistent errors');
    }
  }

  static getNiceToHaveFeedback(metrics, niceToHaveIssues, recommendations) {
    if (metrics.captchaProtection?.metrics?.hasBotProtection) {
      niceToHaveIssues.push(`Bot protection detected: ${metrics.captchaProtection.metrics.captchaType}`);
      recommendations.push('Bot protection may prevent agent access - consider alternative verification for agents');
    }

    if (metrics.apiEndpoints?.metrics && metrics.apiEndpoints.metrics.apiDiscoverabilityScore < 25) {
      niceToHaveIssues.push('Low API endpoint discoverability');
      recommendations.push('Add API documentation links and OpenAPI/Swagger specifications for agent access');
    }

    if (metrics.tableData?.metrics && metrics.tableData.metrics.tableCount > 0) {
      if (metrics.tableData.metrics.tablesWithScope === 0) {
        niceToHaveIssues.push('Tables missing scope attributes');
        recommendations.push('Add scope="col" and scope="row" to table headers');
      }
    }
  }
}
