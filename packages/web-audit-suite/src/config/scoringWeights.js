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
    },
  },
};
