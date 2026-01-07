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
  },
};
