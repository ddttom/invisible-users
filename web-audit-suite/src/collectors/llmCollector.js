
/**
 * LLM Collector
 * 
 * Responsible for extracting raw LLM compatibility metrics from a Cheerio instance.
 * Pure data extraction only - no scoring or feedback logic.
 */

// Constants for importance levels used in data structure
// These are kept attached to data to indicate *intent* of the data point, 
// even if scoring happens elsewhere.
const IMPORTANCE = {
  ESSENTIAL_SERVED: 'essential_served',
  ESSENTIAL_RENDERED: 'essential_rendered',
  NICE_TO_HAVE: 'nice_to_have',
};

export class LLMCollector {
  /**
   * Collect all LLM metrics from a page
   * @param {CheerioAPI} $ - Cheerio instance of the page
   * @param {string} url - The URL being analyzed
   * @param {string} htmlSource - 'served' or 'rendered'
   * @returns {Object} Structured raw metrics data
   */
  static collect($, url, htmlSource = 'rendered') {
    return {
      url,
      htmlSource,
      semanticHTML: this.analyzeSemanticHTML($),
      formFields: this.analyzeFormFields($),
      structuredData: this.analyzeStructuredData($),
      llmsTxt: this.analyzeLLMsTxt($),
      robotsTxt: this.analyzeRobotsTxt($),
      formAutocomplete: this.analyzeFormAutocomplete($),
      dataAttributes: this.analyzeDataAttributes($),
      errorHandling: this.analyzeErrorHandling($),
      tableData: this.analyzeTableData($),
      buttonStates: this.analyzeButtonStates($),
      authenticationState: this.analyzeAuthenticationState($),
      captchaProtection: this.analyzeCaptchaAndBotProtection($),
      apiEndpoints: this.analyzeApiEndpoints($),
    };
  }

  static analyzeSemanticHTML($) {
    return {
      importance: IMPORTANCE.ESSENTIAL_SERVED,
      metrics: {
        hasMain: $('main').length > 0,
        hasNav: $('nav').length > 0,
        hasHeader: $('header').length > 0,
        hasFooter: $('footer').length > 0,
        hasArticle: $('article').length > 0,
        hasSection: $('section').length > 0,
        navCount: $('nav').length,
        articleCount: $('article').length,
        sectionCount: $('section').length,
        divCount: $('div').length,
      },
    };
  }

  static analyzeFormFields($) {
    const forms = $('form');
    const inputs = $('input, select, textarea');

    const standardNames = [
      'email', 'firstName', 'first_name', 'lastName', 'last_name',
      'fullName', 'full_name', 'phone', 'telephone',
      'postcode', 'postal_code', 'address1', 'street_address',
      'address2', 'city', 'county', 'state', 'country', 'country_code',
      'cardNumber', 'card_number', 'expiryDate', 'expiry',
      'cvv', 'cvc', 'password', 'username',
      'dateOfBirth', 'date_of_birth', 'company', 'company_name', 'quantity',
    ];

    let standardNamedFields = 0;
    let nonStandardNamedFields = 0;
    let fieldsWithLabels = 0;
    let fieldsWithType = 0;
    let fieldsWithRequired = 0;

    inputs.each((_, el) => {
      const $input = $(el);
      const name = $input.attr('name') || '';
      const id = $input.attr('id') || '';
      const type = $input.attr('type');

      if (standardNames.some((std) => name === std || id === std)) {
        standardNamedFields++;
      } else if (name) {
        nonStandardNamedFields++;
      }

      if ($input.attr('aria-label') || $(`label[for="${id}"]`).length > 0) {
        fieldsWithLabels++;
      }

      if (type) {
        fieldsWithType++;
      }

      if ($input.attr('required') || $input.attr('aria-required') === 'true') {
        fieldsWithRequired++;
      }
    });

    return {
      importance: IMPORTANCE.ESSENTIAL_SERVED,
      metrics: {
        formCount: forms.length,
        totalInputs: inputs.length,
        standardNamedFields,
        nonStandardNamedFields,
        fieldsWithLabels,
        fieldsWithType,
        fieldsWithRequired,
        standardNameRatio: inputs.length > 0 ? standardNamedFields / inputs.length : 1,
        labelRatio: inputs.length > 0 ? fieldsWithLabels / inputs.length : 1,
      },
    };
  }

  static analyzeStructuredData($) {
    const jsonLdScripts = $('script[type="application/ld+json"]');
    const schemaTypes = [];
    let hasSchemaOrg = false;

    jsonLdScripts.each((_, script) => {
      try {
        const data = JSON.parse($(script).html());
        if (data['@type']) {
          schemaTypes.push(data['@type']);
          if (data['@context'] && data['@context'].includes('schema.org')) {
            hasSchemaOrg = true;
          }
        }
      } catch (e) {
        // Invalid JSON-LD, skip
      }
    });

    return {
      importance: IMPORTANCE.ESSENTIAL_SERVED,
      metrics: {
        hasJsonLd: jsonLdScripts.length > 0,
        jsonLdCount: jsonLdScripts.length,
        schemaTypes,
        hasSchemaOrg,
        hasMicrodata: $('[itemscope]').length > 0,
        microdataCount: $('[itemscope]').length,
      },
    };
  }

  static analyzeLLMsTxt($) {
    const llmsTxtLink = $('link[href*="llms.txt"], a[href*="llms.txt"]').first();
    const hasLLMsTxtReference = llmsTxtLink.length > 0;
    const llmsTxtMeta = $('meta[name="llms-txt"], meta[property="llms:txt"]').first();
    const hasLLMsTxtMeta = llmsTxtMeta.length > 0;

    return {
      importance: IMPORTANCE.ESSENTIAL_SERVED,
      metrics: {
        hasLLMsTxtReference,
        hasLLMsTxtMeta,
        llmsTxtUrl: hasLLMsTxtReference ? llmsTxtLink.attr('href') : null,
      },
    };
  }

  static analyzeRobotsTxt($) {
    const robotsTxtLink = $('link[href*="robots.txt"], a[href*="robots.txt"]').first();
    const aiTxtLink = $('link[href*="ai.txt"], a[href*="ai.txt"]').first();
    
    const robotsMeta = $('meta[name="robots"]').attr('content');
    const hasRobotsMeta = !!robotsMeta;
    const robotsMetaContent = robotsMeta || '';

    const isNoIndex = robotsMetaContent.includes('noindex');
    const isNoFollow = robotsMetaContent.includes('nofollow');
    const isNoArchive = robotsMetaContent.includes('noarchive');
    const hasAgentRestrictions = isNoIndex || isNoFollow || isNoArchive;

    return {
      importance: IMPORTANCE.ESSENTIAL_SERVED,
      metrics: {
        hasRobotsTxtReference: robotsTxtLink.length > 0,
        hasAiTxtReference: aiTxtLink.length > 0,
        hasRobotsMeta,
        robotsMetaContent,
        isNoIndex,
        isNoFollow,
        isNoArchive,
        hasAgentRestrictions,
      },
    };
  }

  static analyzeFormAutocomplete($) {
    const inputs = $('input, select, textarea');
    let fieldsWithAutocomplete = 0;
    let fieldsWithoutAutocomplete = 0;
    const autocompleteValues = [];

    inputs.each((_, el) => {
      const $input = $(el);
      const autocomplete = $input.attr('autocomplete');
      const type = $input.attr('type');

      if (type === 'hidden' || type === 'submit' || type === 'button' || $input.is('button')) {
        return;
      }

      if (autocomplete) {
        fieldsWithAutocomplete++;
        if (!autocompleteValues.includes(autocomplete)) {
          autocompleteValues.push(autocomplete);
        }
      } else {
        fieldsWithoutAutocomplete++;
      }
    });

    const totalRelevantFields = fieldsWithAutocomplete + fieldsWithoutAutocomplete;
    const autocompleteRatio = totalRelevantFields > 0 ? fieldsWithAutocomplete / totalRelevantFields : 1;

    return {
      importance: IMPORTANCE.ESSENTIAL_SERVED,
      metrics: {
        totalFormFields: totalRelevantFields,
        fieldsWithAutocomplete,
        fieldsWithoutAutocomplete,
        autocompleteRatio,
        autocompleteValues,
        hasGoodAutocompleteCoverage: autocompleteRatio >= 0.7,
      },
    };
  }

  static analyzeDataAttributes($) {
    const elements = $('[data-state], [data-authenticated], [data-validation-state], [data-error-code], [data-loading]');
    const agentVisibleElements = $('[data-agent-visible]');
    
    const visibleToAgents = agentVisibleElements.filter((_, el) => {
      const value = $(el).attr('data-agent-visible');
      return value === 'true' || value === '';
    }).length;
    
    const hiddenFromAgents = agentVisibleElements.filter((_, el) => {
      const value = $(el).attr('data-agent-visible');
      return value === 'false';
    }).length;

    return {
      importance: IMPORTANCE.ESSENTIAL_RENDERED,
      metrics: {
        hasDataState: $('[data-state]').length > 0,
        dataStateCount: $('[data-state]').length,
        hasAuthState: $('[data-authenticated]').length > 0,
        hasValidationState: $('[data-validation-state]').length > 0,
        hasErrorCodes: $('[data-error-code]').length > 0,
        hasLoadingIndicators: $('[data-loading], [data-state="loading"]').length > 0,
        totalDataAttributes: elements.length,
        hasAgentVisibilityControl: agentVisibleElements.length > 0,
        agentVisibleCount: agentVisibleElements.length,
        visibleToAgents,
        hiddenFromAgents,
      },
    };
  }

  static analyzeErrorHandling($) {
    const hasAriaLive = $('[aria-live]').length > 0;
    const hasRoleAlert = $('[role="alert"]').length > 0;

    return {
      importance: IMPORTANCE.ESSENTIAL_RENDERED,
      metrics: {
        hasErrorSummary: hasRoleAlert,
        errorAlertCount: $('[role="alert"]').length,
        hasAriaLive,
        ariaLiveCount: $('[aria-live]').length,
        hasFieldErrors: $('.error, .field-error, [class*="error"]').length > 0,
        errorElementCount: $('.error, .field-error, [class*="error"]').length,
        hasAriaInvalid: $('[aria-invalid="true"]').length > 0,
        invalidFieldCount: $('[aria-invalid="true"]').length,
        hasPersistentErrors: hasRoleAlert && hasAriaLive,
      },
    };
  }

  static analyzeTableData($) {
    const tables = $('table');
    const tableCells = $('td');

    const cellsWithDataAttributes = tableCells.filter((_, el) => {
      const $el = $(el);
      return $el.attr('data-price') || $el.attr('data-currency')
             || $el.attr('data-quantity') || $el.attr('data-in-stock')
             || $el.attr('data-product-id') || $el.attr('data-rating');
    }).length;

    return {
      importance: IMPORTANCE.NICE_TO_HAVE,
      metrics: {
        tableCount: tables.length,
        tablesWithCaption: $('table caption').length,
        tablesWithScope: $('th[scope]').length > 0 ? tables.length : 0,
        cellsWithDataAttributes,
        totalCells: tableCells.length,
        machineReadableRatio: tableCells.length > 0 ? cellsWithDataAttributes / tableCells.length : 0,
      },
    };
  }

  static analyzeButtonStates($) {
    const disabledButtons = $('button[disabled], input[type="submit"][disabled]');
    const disabledWithExplanation = disabledButtons.filter((_, el) => {
      const $btn = $(el);
      return $btn.attr('aria-describedby') || $btn.attr('title') || $btn.attr('data-disabled-reason');
    }).length;

    return {
      importance: IMPORTANCE.NICE_TO_HAVE,
      metrics: {
        disabledButtonCount: disabledButtons.length,
        disabledWithExplanation,
        disabledWithoutExplanation: disabledButtons.length - disabledWithExplanation,
        explanationRatio: disabledButtons.length > 0 ? disabledWithExplanation / disabledButtons.length : 1,
      },
    };
  }

  static analyzeAuthenticationState($) {
    return {
      importance: IMPORTANCE.NICE_TO_HAVE,
      metrics: {
        hasAuthStateAttribute: $('[data-authenticated]').length > 0,
        hasLoginLink: $('a[href*="login"], a[href*="signin"], a[href*="sign-in"]').length > 0,
        hasLogoutLink: $('a[href*="logout"], a[href*="signout"], a[href*="sign-out"], form[action*="logout"]').length > 0,
        hasAccountLink: $('a[href*="account"], a[href*="profile"]').length > 0,
        hasUserIdentifier: $('[data-user-id], [data-user-name], [data-user-email]').length > 0,
      },
    };
  }

  static analyzeCaptchaAndBotProtection($) {
    const hasRecaptcha = $('.g-recaptcha, [data-sitekey]').length > 0
                         || $('script[src*="recaptcha"]').length > 0;
    const hasHCaptcha = $('.h-captcha').length > 0
                        || $('script[src*="hcaptcha"]').length > 0;
    const hasTurnstile = $('[data-sitekey], script[src*="turnstile"]').length > 0
                         && $('script[src*="cloudflare"]').length > 0;

    const hasCaptchaKeyword = $('*').filter((_, el) => {
      const text = $(el).text().toLowerCase();
      return text.includes('captcha') || text.includes('verify you are human')
             || text.includes('security check') || text.includes('bot protection');
    }).length > 0;

    const hasCloudflareChallenge = $('script[src*="cloudflare"]').length > 0
                                    || $('.cf-browser-verification').length > 0;

    const hasCaptcha = hasRecaptcha || hasHCaptcha || hasTurnstile || hasCaptchaKeyword;
    const hasBotProtection = hasCaptcha || hasCloudflareChallenge;

    return {
      importance: IMPORTANCE.NICE_TO_HAVE,
      metrics: {
        hasCaptcha,
        hasRecaptcha,
        hasHCaptcha,
        hasTurnstile,
        hasCloudflareChallenge,
        hasBotProtection,
        captchaType: hasRecaptcha ? 'reCAPTCHA'
          : hasHCaptcha ? 'hCaptcha'
            : hasTurnstile ? 'Turnstile'
              : hasCaptcha ? 'Unknown' : 'None',
      },
    };
  }

  static analyzeApiEndpoints($) {
    const apiLinks = $('a[href*="/api"], a[href*="/docs"], a[href*="/swagger"], a[href*="/openapi"]');
    const hasApiDocs = apiLinks.length > 0;
    const hasApiMeta = $('meta[name*="api"], meta[property*="api"]').length > 0;

    const hasRestIndicators = $('script, link').filter((_, el) => {
      const src = $(el).attr('src') || $(el).attr('href') || '';
      return src.includes('/api/') || src.includes('/rest/');
    }).length > 0;

    const hasGraphQLIndicators = $('script, link').filter((_, el) => {
      const src = $(el).attr('src') || $(el).attr('href') || '';
      return src.includes('graphql');
    }).length > 0;

    const hasOpenApiSpec = $('link[rel="alternate"][type="application/json"]').filter((_, el) => {
      const href = $(el).attr('href') || '';
      return href.includes('openapi') || href.includes('swagger');
    }).length > 0;

    const apiEndpointScore = (hasApiDocs ? 25 : 0)
                             + (hasOpenApiSpec ? 25 : 0)
                             + (hasRestIndicators ? 15 : 0)
                             + (hasGraphQLIndicators ? 15 : 0);

    return {
      importance: IMPORTANCE.NICE_TO_HAVE,
      metrics: {
        hasApiDocs,
        hasApiMeta,
        hasRestIndicators,
        hasGraphQLIndicators,
        hasOpenApiSpec,
        apiDiscoverabilityScore: apiEndpointScore,
        apiLinksCount: apiLinks.length,
      },
    };
  }
}
