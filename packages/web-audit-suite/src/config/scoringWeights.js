export const SCORING_WEIGHTS = {
  SERVED: {
    SEMANTIC_HTML: {
      hasMain: 6,
      hasNav: 5,
      hasHeader: 3,
      hasFooter: 3,
      hasArticleOrSection: 3,
    },
    FORM_FIELDS: {
      standardNameRatio: 15,
      labelRatio: 10,
    },
    FORM_AUTOCOMPLETE: {
      autocompleteRatio: 15,
    },
    STRUCTURED_DATA: {
      hasSchemaOrg: 15,
    },
    FAQ_SCHEMA: {
      hasFAQPage: 8,
      completenessRatio: 5,
      duplicatePenalty: -3,
    },
    LLMS_TXT: {
      presence: 10,
    },
    ROBOTS_TXT: {
      hasAiTxt: 5,
      agentRestrictions: -5,
    },
    TABLES: {
      properMarkup: 10,
      emptyBonus: 10,
    },
    SOCIAL_MEDIA_META: {
      hasOpenGraph: 8,
      hasTwitterCard: 5,
      completenessRatio: 7,
    },
    SEO_META: {
      completenessRatio: 5,
    },
    READING_TIME_META: {
      hasTimeRequired: 5,
      completenessRatio: 5,
    },
    HTML_VALIDATION: {
      noIssuesBonus: 10,
      unencodedAmpersandPenalty: -1,
      redundantRolePenalty: -1,
      ariaMisusePenalty: -2,
      nonSemanticContainerPenalty: -1,
    },
    SCHEMA_TYPE_DISAMBIGUATION: {
      proper: 5,
      multiTypePenalty: -3,
    },
    INLINE_CSS: {
      externalOnlyBonus: 8,
      inlineCSSPenalty: -10,
    },
    HEADING_HIERARCHY: {
      perfectHierarchy: 10,
      headingJumpPenalty: -5, // Per heading level jump
      multipleH1Penalty: -5,
    },
    PRERENDERING: {
      hasPrerenderedContent: 20,
      emptySPARootPenalty: -20,
    },
    PDF_CONTENT: {
      pdfWithHTML: 10,
      pdfOnlyPenalty: -20, // Per PDF without HTML alternative
    },
    SSR_FRAMEWORKS: {
      ssrWithContent: 20,
      ssrWithoutContentPenalty: -20,
    },
    // Priority 2 patterns
    DOM_ORDER: {
      mainFirst: 5,
      sidebarBeforeMainPenalty: -10,
      navBeforeMainPenalty: -5,
    },
    PRICING_TABLES: {
      withSchema: 15,
      withoutSchemaPenalty: -10,
    },
    PRODUCT_VARIANTS: {
      hasVariants: 10,
    },
    AJAX_NAVIGATION: {
      withRealURLs: 10,
      hashBasedPenalty: -10,
    },
    TABLE_ABUSE: {
      layoutTablePenalty: -15, // Per layout table
      properDataTable: 5,
    },
    IFRAME_CONTENT: {
      withAlternative: 5,
      withoutAlternativePenalty: -10, // Per iframe
    },
    // Priority 3 patterns
    DEFINITION_LISTS: {
      progressivePattern: 5,
    },
    SKELETON_CONTENT: {
      hasSkeletonContent: 5,
      emptyContainerPenalty: -5,
    },
    PROGRESSIVE_ENHANCEMENT: {
      hasProgressiveAccordion: 5,
    },
    // Priority 4 patterns
    MULTIPLE_AUTHORS: {
      hasMultipleAuthors: 3,
    },
    CONTENT_SEPARATION: {
      hasSeparation: 5,
    },
  },
  RENDERED: {
    MAX_BONUS: 30,
    DATA_ATTRIBUTES: {
      hasDataState: 7,
      hasValidationState: 5,
      hasLoadingIndicators: 3,
    },
    ERROR_HANDLING: {
      hasPersistentErrors: 10,
      hasAriaInvalid: 5,
    },
    DYNAMIC_CONTENT: {
      carouselInformationalPenalty: -8, // High severity: hides content
      carouselDecorativePenalty: -3, // Medium severity: accessibility issue
      autoplayWithoutControlsPenalty: -8, // WCAG 2.2.2 violation
      animatedGifNoAltPenalty: -3, // Accessibility issue
      animationLibraryPenalty: -2, // Informational warning
      visualDynamismPenalty: -5, // Visual content changes detected (typewriters, tickers, etc.)
      jsDependentPricingPenalty: -15, // Critical: CLI agents cannot see pricing, blocks purchase decisions
    },
  },
};
