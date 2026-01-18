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

    // Social Media Meta Tags
    if (metrics.socialMediaMeta?.metrics) {
      const social = metrics.socialMediaMeta.metrics;
      if (social.hasOpenGraph) score += weights.SOCIAL_MEDIA_META.hasOpenGraph;
      if (social.hasTwitterCard) score += weights.SOCIAL_MEDIA_META.hasTwitterCard;
      score += social.completenessRatio * weights.SOCIAL_MEDIA_META.completenessRatio;
    }

    // SEO Meta Tags
    if (metrics.seoMeta?.metrics) {
      score += metrics.seoMeta.metrics.completenessRatio * weights.SEO_META.completenessRatio;
    }

    // Reading Time Metadata
    if (metrics.readingTimeMeta?.metrics) {
      const reading = metrics.readingTimeMeta.metrics;
      if (reading.hasTimeRequired && reading.isValidISO8601) {
        score += weights.READING_TIME_META.hasTimeRequired;
      }
      score += reading.completenessRatio * weights.READING_TIME_META.completenessRatio;
    }

    // HTML Validation
    if (metrics.htmlValidation?.metrics) {
      const validation = metrics.htmlValidation.metrics;
      if (!validation.hasIssues) {
        score += weights.HTML_VALIDATION.noIssuesBonus;
      } else {
        // Apply penalties for each type of issue
        score += validation.unencodedAmpersands * weights.HTML_VALIDATION.unencodedAmpersandPenalty;
        score += validation.redundantRoles * weights.HTML_VALIDATION.redundantRolePenalty;
        score += validation.ariaMisuse * weights.HTML_VALIDATION.ariaMisusePenalty;
        score += validation.nonSemanticContainers * weights.HTML_VALIDATION.nonSemanticContainerPenalty;
      }
    }

    // Schema Type Disambiguation
    if (metrics.schemaTypeDisambiguation?.metrics) {
      const schema = metrics.schemaTypeDisambiguation.metrics;
      if (schema.hasDisambiguation && schema.totalSchemas > 0) {
        score += weights.SCHEMA_TYPE_DISAMBIGUATION.proper;
      } else if (schema.schemasWithMultipleTypes > 0) {
        score += schema.schemasWithMultipleTypes * weights.SCHEMA_TYPE_DISAMBIGUATION.multiTypePenalty;
      }
    }

    // Inline CSS Penalties
    if (metrics.inlineCSS?.metrics) {
      const css = metrics.inlineCSS.metrics;
      if (!css.hasInlineStyles && css.externalStylesheetCount > 0) {
        score += weights.INLINE_CSS.externalOnlyBonus;
      } else if (css.hasInlineStyles) {
        // Penalty based on prevalence
        score += Math.round(css.inlineCSSRatio * weights.INLINE_CSS.inlineCSSPenalty);
      }
    }

    // Heading Hierarchy (Gap 3)
    if (metrics.headingHierarchy?.metrics) {
      const heading = metrics.headingHierarchy.metrics;
      if (heading.hasPerfectHierarchy) {
        score += weights.HEADING_HIERARCHY.perfectHierarchy;
      } else {
        score += heading.headingJumps * weights.HEADING_HIERARCHY.headingJumpPenalty;
        if (heading.multipleH1) score += weights.HEADING_HIERARCHY.multipleH1Penalty;
      }
    }

    // Pre-rendering (Gap 9)
    if (metrics.prerendering?.metrics) {
      const prerender = metrics.prerendering.metrics;
      if (prerender.hasPrerenderedContent) {
        score += weights.PRERENDERING.hasPrerenderedContent;
      }
      if (prerender.hasEmptySPARoot) {
        score += weights.PRERENDERING.emptySPARootPenalty;
      }
    }

    // PDF Content (Gap 12)
    if (metrics.pdfContent?.metrics) {
      const pdf = metrics.pdfContent.metrics;
      if (pdf.hasPDFWithHTML) {
        score += weights.PDF_CONTENT.pdfWithHTML;
      }
      score += pdf.pdfWithoutAlternatives * weights.PDF_CONTENT.pdfOnlyPenalty;
    }

    // SSR Frameworks (Gap 14)
    if (metrics.ssrFrameworks?.metrics) {
      const ssr = metrics.ssrFrameworks.metrics;
      if (ssr.ssrWithContent) {
        score += weights.SSR_FRAMEWORKS.ssrWithContent;
      }
      if (ssr.ssrWithoutContent) {
        score += weights.SSR_FRAMEWORKS.ssrWithoutContentPenalty;
      }
    }

    // DOM Order (Gap 1)
    if (metrics.domOrder?.metrics) {
      const dom = metrics.domOrder.metrics;
      if (dom.mainFirst) {
        score += weights.DOM_ORDER.mainFirst;
      }
      if (dom.sidebarBeforeMain) {
        score += weights.DOM_ORDER.sidebarBeforeMainPenalty;
      }
      if (dom.navBeforeMain) {
        score += weights.DOM_ORDER.navBeforeMainPenalty;
      }
    }

    // Pricing Tables (Gap 2)
    if (metrics.pricingTables?.metrics) {
      const pricing = metrics.pricingTables.metrics;
      if (pricing.pricingWithSchema > 0) {
        score += weights.PRICING_TABLES.withSchema;
      }
      if (pricing.pricingWithoutSchema > 0) {
        score += weights.PRICING_TABLES.withoutSchemaPenalty;
      }
    }

    // Product Variants (Gap 6)
    if (metrics.productVariants?.metrics) {
      const variants = metrics.productVariants.metrics;
      if (variants.hasVariants) {
        score += weights.PRODUCT_VARIANTS.hasVariants;
      }
    }

    // AJAX Navigation (Gap 10)
    if (metrics.ajaxNavigation?.metrics) {
      const ajax = metrics.ajaxNavigation.metrics;
      if (ajax.hasAJAXWithRealURLs) {
        score += weights.AJAX_NAVIGATION.withRealURLs;
      }
      if (ajax.hasHashBasedSPA) {
        score += weights.AJAX_NAVIGATION.hashBasedPenalty;
      }
    }

    // Table Abuse (Gap 11)
    if (metrics.tableAbuse?.metrics) {
      const tables = metrics.tableAbuse.metrics;
      score += tables.layoutTables * weights.TABLE_ABUSE.layoutTablePenalty;
      if (tables.hasProperDataTables) {
        score += weights.TABLE_ABUSE.properDataTable;
      }
    }

    // Iframe Content (Gap 13)
    if (metrics.iframeContent?.metrics) {
      const iframe = metrics.iframeContent.metrics;
      if (iframe.iframesWithAlternatives > 0) {
        score += weights.IFRAME_CONTENT.withAlternative;
      }
      score += iframe.iframesWithoutAlternatives * weights.IFRAME_CONTENT.withoutAlternativePenalty;
    }

    // Definition Lists (Gap 4)
    if (metrics.definitionLists?.metrics) {
      const dl = metrics.definitionLists.metrics;
      if (dl.hasProgressivePattern) {
        score += weights.DEFINITION_LISTS.progressivePattern;
      }
    }

    // Skeleton Content (Gap 7)
    if (metrics.skeletonContent?.metrics) {
      const skeleton = metrics.skeletonContent.metrics;
      if (skeleton.hasSkeletonContent) {
        score += weights.SKELETON_CONTENT.hasSkeletonContent;
      }
      score += skeleton.emptyLoadingContainers * weights.SKELETON_CONTENT.emptyContainerPenalty;
    }

    // Progressive Enhancement (Gap 15)
    if (metrics.progressiveEnhancement?.metrics) {
      const pe = metrics.progressiveEnhancement.metrics;
      if (pe.hasProgressiveAccordion) {
        score += weights.PROGRESSIVE_ENHANCEMENT.hasProgressiveAccordion;
      }
    }

    // Multiple Authors (Gap 5)
    if (metrics.multipleAuthors?.metrics) {
      const authors = metrics.multipleAuthors.metrics;
      if (authors.hasMultipleAuthors) {
        score += weights.MULTIPLE_AUTHORS.hasMultipleAuthors;
      }
    }

    // Content Separation (Gap 8)
    if (metrics.contentSeparation?.metrics) {
      const separation = metrics.contentSeparation.metrics;
      if (separation.hasSeparation) {
        score += weights.CONTENT_SEPARATION.hasSeparation;
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

    // Dynamic Content Patterns (Chapter 2)
    if (metrics.dynamicContent?.metrics) {
      const dynamic = metrics.dynamicContent.metrics;

      // Carousels without proper attributes (severity based on type)
      if (dynamic.carousels.count > 0) {
        const informationalCarousels = dynamic.carousels.informationalCount;
        const decorativeCarousels = dynamic.carousels.decorativeCount;
        const properCarousels = dynamic.carousels.withProperAttributes;

        // Informational carousels: high severity penalty
        const improperInformational = informationalCarousels - properCarousels;
        if (improperInformational > 0) {
          renderedBonus += improperInformational * weights.DYNAMIC_CONTENT.carouselInformationalPenalty;
        }

        // Decorative carousels: medium severity penalty
        const improperDecorative = Math.max(0, decorativeCarousels - (properCarousels - informationalCarousels));
        if (improperDecorative > 0) {
          renderedBonus += improperDecorative * weights.DYNAMIC_CONTENT.carouselDecorativePenalty;
        }
      }

      // Autoplay media without controls (WCAG 2.2.2 violation)
      if (dynamic.autoplayMedia.videoCount > 0) {
        const autoplayWithoutControls = dynamic.autoplayMedia.videoCount - dynamic.autoplayMedia.withControls;
        if (autoplayWithoutControls > 0) {
          renderedBonus += autoplayWithoutControls * weights.DYNAMIC_CONTENT.autoplayWithoutControlsPenalty;
        }
      }

      // Animated GIFs without alt text
      if (dynamic.animatedGifs.count > 0) {
        const gifsWithoutAlt = dynamic.animatedGifs.count - dynamic.animatedGifs.withAltText;
        if (gifsWithoutAlt > 0) {
          renderedBonus += gifsWithoutAlt * weights.DYNAMIC_CONTENT.animatedGifNoAltPenalty;
        }
      }

      // Animation library warnings (informational - lighter penalty)
      if (dynamic.animations.libraries) {
        const libs = dynamic.animations.libraries;
        if (libs.typedJs || libs.typeIt) {
          renderedBonus += weights.DYNAMIC_CONTENT.animationLibraryPenalty;
        }
      }

      // Visual dynamism penalty (screenshot comparison detected content changes)
      if (dynamic.visualDynamism && dynamic.visualDynamism.detected) {
        renderedBonus += weights.DYNAMIC_CONTENT.visualDynamismPenalty;
      }

      // JavaScript-dependent pricing penalty (critical for e-commerce)
      if (dynamic.pricing && dynamic.pricing.jsDependent) {
        renderedBonus += weights.DYNAMIC_CONTENT.jsDependentPricingPenalty;
      }
    }

    renderedBonus = Math.min(renderedBonus, weights.MAX_BONUS);
    return Math.min(score + renderedBonus, 100);
  }
}
