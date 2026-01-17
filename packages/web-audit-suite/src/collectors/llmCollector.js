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
   * @param {Object} pageData - Optional page data from caching.js (includes dynamicContent)
   * @returns {Object} Structured raw metrics data
   */
  static collect($, url, htmlSource = 'rendered', pageData = null) {
    return {
      url,
      htmlSource,
      semanticHTML: this.analyzeSemanticHTML($),
      formFields: this.analyzeFormFields($),
      structuredData: this.analyzeStructuredData($),
      faqSchema: this.analyzeFAQSchema($),
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
      socialMediaMeta: this.analyzeSocialMediaMeta($),
      seoMeta: this.analyzeSEOMeta($),
      readingTimeMeta: this.analyzeReadingTimeMeta($),
      htmlValidation: this.analyzeHTMLValidation($),
      schemaTypeDisambiguation: this.analyzeSchemaTypeDisambiguation($),
      inlineCSS: this.analyzeInlineCSS($),
      dynamicContent: this.analyzeDynamicContent($, pageData),
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

  static analyzeFAQSchema($) {
    const jsonLdScripts = $('script[type="application/ld+json"]');
    let hasFAQPage = false;
    let faqCount = 0;
    let hasMainEntity = false;
    let itemsWithAnswers = 0;
    let itemsWithoutAnswers = 0;
    let hasDuplicateMarkup = false;

    // Check for microdata duplication (itemtype containing "Question")
    const microdataItems = $('[itemtype*="Question"]').length;

    jsonLdScripts.each((_, script) => {
      try {
        const data = JSON.parse($(script).html());

        if (data['@type'] === 'FAQPage') {
          hasFAQPage = true;
          if (data.mainEntity) hasMainEntity = true;

          const items = Array.isArray(data.mainEntity) ? data.mainEntity : [data.mainEntity];

          items.forEach((item) => {
            if (item['@type'] === 'Question') {
              faqCount++;
              if (item.acceptedAnswer?.text) {
                itemsWithAnswers++;
              } else {
                itemsWithoutAnswers++;
              }
            }
          });
        }
      } catch (e) {
        // Invalid JSON-LD, skip
      }
    });

    // Detect duplication (JSON-LD + microdata)
    if (hasFAQPage && microdataItems > 0) {
      hasDuplicateMarkup = true;
    }

    return {
      importance: IMPORTANCE.ESSENTIAL_SERVED,
      metrics: {
        hasFAQPage,
        faqCount,
        hasMainEntity,
        itemsWithAnswers,
        itemsWithoutAnswers,
        completenessRatio: faqCount > 0 ? itemsWithAnswers / faqCount : 1,
        hasDuplicateMarkup,
        microdataCount: microdataItems,
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

  static analyzeSocialMediaMeta($) {
    // Open Graph tags
    const ogType = $('meta[property="og:type"]').attr('content');
    const ogUrl = $('meta[property="og:url"]').attr('content');
    const ogTitle = $('meta[property="og:title"]').attr('content');
    const ogDescription = $('meta[property="og:description"]').attr('content');
    const ogImage = $('meta[property="og:image"]').attr('content');
    const ogSiteName = $('meta[property="og:site_name"]').attr('content');
    const ogLocale = $('meta[property="og:locale"]').attr('content');

    const ogTagCount = [ogType, ogUrl, ogTitle, ogDescription, ogImage, ogSiteName, ogLocale]
      .filter((val) => val && val.trim().length > 0).length;
    const hasOpenGraph = ogTagCount >= 5; // Minimum 5 of 7 tags

    // Twitter Card tags
    const twitterCard = $('meta[name="twitter:card"]').attr('content');
    const twitterTitle = $('meta[name="twitter:title"]').attr('content');
    const twitterDescription = $('meta[name="twitter:description"]').attr('content');
    const twitterImage = $('meta[name="twitter:image"]').attr('content');

    const twitterTagCount = [twitterCard, twitterTitle, twitterDescription, twitterImage]
      .filter((val) => val && val.trim().length > 0).length;
    const hasTwitterCard = twitterTagCount >= 3; // Minimum 3 of 4 tags

    return {
      importance: IMPORTANCE.ESSENTIAL_SERVED,
      metrics: {
        hasOpenGraph,
        ogTagCount,
        hasOgType: !!ogType,
        hasOgUrl: !!ogUrl,
        hasOgTitle: !!ogTitle,
        hasOgDescription: !!ogDescription,
        hasOgImage: !!ogImage,
        hasOgLocale: !!ogLocale,
        hasTwitterCard,
        twitterTagCount,
        hasTwitterCardType: !!twitterCard,
        hasTwitterTitle: !!twitterTitle,
        hasTwitterDescription: !!twitterDescription,
        hasTwitterImage: !!twitterImage,
        completenessRatio: (ogTagCount + twitterTagCount) / 11, // 7 OG + 4 Twitter = 11 total
      },
    };
  }

  static analyzeSEOMeta($) {
    const robotsMeta = $('meta[name="robots"]').attr('content');
    const hasRobotsMeta = !!robotsMeta;

    const keywordsMeta = $('meta[name="keywords"]').attr('content');
    const hasKeywords = !!keywordsMeta && keywordsMeta.trim().length > 0;

    const themeColor = $('meta[name="theme-color"]').attr('content');
    const hasThemeColor = !!themeColor && themeColor.trim().length > 0;

    return {
      importance: IMPORTANCE.ESSENTIAL_SERVED,
      metrics: {
        hasRobotsMeta,
        robotsMetaContent: robotsMeta || '',
        hasKeywords,
        keywordsCount: hasKeywords ? keywordsMeta.split(',').length : 0,
        hasThemeColor,
        themeColorValue: themeColor || '',
        completenessRatio: [hasRobotsMeta, hasKeywords, hasThemeColor].filter(Boolean).length / 3,
      },
    };
  }

  static analyzeReadingTimeMeta($) {
    const jsonLdScripts = $('script[type="application/ld+json"]');
    let hasTimeRequired = false;
    let hasEducationalLevel = false;
    let hasInLanguage = false;
    let timeRequiredValue = null;
    let educationalLevelValue = null;
    let inLanguageValue = null;

    jsonLdScripts.each((_, script) => {
      try {
        const data = JSON.parse($(script).html());

        if (data.timeRequired) {
          hasTimeRequired = true;
          timeRequiredValue = data.timeRequired;
        }

        if (data.educationalLevel) {
          hasEducationalLevel = true;
          educationalLevelValue = data.educationalLevel;
        }

        if (data.inLanguage) {
          hasInLanguage = true;
          inLanguageValue = data.inLanguage;
        }
      } catch (e) {
        // Invalid JSON-LD, skip
      }
    });

    // Check for ISO 8601 format validation (PT\d+M pattern)
    const isValidISO8601 = timeRequiredValue ? /^PT\d+(M|H)$/.test(timeRequiredValue) : false;

    return {
      importance: IMPORTANCE.ESSENTIAL_SERVED,
      metrics: {
        hasTimeRequired,
        hasEducationalLevel,
        hasInLanguage,
        timeRequiredValue,
        educationalLevelValue,
        inLanguageValue,
        isValidISO8601,
        completenessRatio: [hasTimeRequired, hasEducationalLevel, hasInLanguage].filter(Boolean).length / 3,
      },
    };
  }

  /**
   * Analyze HTML validation issues that break AI agent parsing and accessibility
   * Based on patterns from Appendix D (AI-Friendly HTML Guide)
   *
   * IMPORTANT: Cheerio (like browser engines) automatically corrects some invalid HTML
   * during parsing. Unencoded ampersands (&) are automatically fixed to &amp; by both
   * Cheerio and browser parsers, so they won't be detected here. This matches real-world
   * behavior: browser-based AI agents see the corrected HTML, while CLI agents working
   * with raw HTML see the original errors. For comprehensive validation, use html-validate
   * or W3C Validator on the raw HTML source before browser processing.
   *
   * @param {CheerioAPI} $ - Cheerio instance
   * @returns {Object} HTML validation metrics
   */
  static analyzeHTMLValidation($) {
    const issues = {
      unencodedAmpersands: 0,
      redundantRoles: 0,
      ariaMisuse: 0,
      nonSemanticContainers: 0,
    };

    // Check for unencoded ampersands in HTML source
    // NOTE: Cheerio auto-corrects these during parsing, so this check may not detect
    // ampersands in the original source. It will catch any that remain after parsing.
    // Use .html() to get raw HTML with entities, not .text() which decodes them
    $('body *').each((_, el) => {
      const $el = $(el);
      // Only check content elements, skip script/style/svg
      if ($el.is('script, style, svg')) return;

      // Get the inner HTML (preserves entities)
      const html = $el.html();
      if (!html) return;

      // Match & not followed by valid entity pattern (amp;, lt;, gt;, quot;, apos;, #\d+;, or named entities)
      const unencodedMatches = html.match(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|[a-z]+;)/gi);
      if (unencodedMatches) {
        issues.unencodedAmpersands += unencodedMatches.length;
      }
    });

    // Check for redundant ARIA roles on semantic elements
    // Note: Some elements like <header> and <footer> only have implicit roles
    // when they are NOT nested in sectioning content (article, aside, main, nav, section)
    const semanticElementsWithImplicitRoles = {
      section: 'region', // when it has an accessible name
      nav: 'navigation',
      main: 'main',
      article: 'article',
      aside: 'complementary',
      header: 'banner', // only when NOT nested in sectioning content
      footer: 'contentinfo', // only when NOT nested in sectioning content
    };

    // Elements that scope <header>/<footer> roles
    const sectioningContent = ['article', 'aside', 'main', 'nav', 'section'];

    Object.keys(semanticElementsWithImplicitRoles).forEach((tag) => {
      const implicitRole = semanticElementsWithImplicitRoles[tag];

      $(`${tag}[role="${implicitRole}"]`).each((_, el) => {
        const $el = $(el);

        // For header/footer elements, check if they're nested in sectioning content
        if (tag === 'header' || tag === 'footer') {
          // Check if any ancestor is sectioning content
          const isNested = $el.parents(sectioningContent.join(',')).length > 0;

          if (!isNested) {
            // Not nested - implicit role applies, so explicit role is redundant
            issues.redundantRoles++;
          }
          // If nested, the explicit role IS needed (not redundant)
        } else {
          // For other elements (nav, main, article, aside, section), the role is always redundant
          issues.redundantRoles++;
        }
      });
    });

    // Check for ARIA misuse: aria-label on non-interactive elements without role
    // aria-label only works on:
    // - Interactive elements (button, a, input, select, textarea)
    // - Elements with explicit roles (role="img", role="region", etc.)
    $('[aria-label]').each((_, el) => {
      const $el = $(el);
      const tagName = el.name;
      const hasRole = $el.attr('role');

      // Interactive elements that support aria-label
      const interactiveElements = ['button', 'a', 'input', 'select', 'textarea', 'summary'];

      // Elements that have implicit roles
      const elementsWithImplicitRoles = ['nav', 'main', 'article', 'aside', 'header', 'footer', 'section', 'form'];

      // If element is not interactive, has no explicit role, and has no implicit role
      if (!interactiveElements.includes(tagName)
          && !hasRole
          && !elementsWithImplicitRoles.includes(tagName)) {
        issues.ariaMisuse++;
      }
    });

    // Check for non-semantic containers: divs with ARIA labels but no explicit role
    // These should probably be <section> elements instead
    $('div[aria-label]').each((_, el) => {
      const $el = $(el);
      // Only flag if div has NO role attribute (div with role="img" etc is fine)
      if (!$el.attr('role')) {
        issues.nonSemanticContainers++;
      }
    });

    // Calculate total issues and quality score
    const totalIssues = issues.unencodedAmpersands
                      + issues.redundantRoles
                      + issues.ariaMisuse
                      + issues.nonSemanticContainers;

    // Score inversely proportional to issues (0 issues = 100, 10+ issues = 0)
    const qualityScore = Math.max(0, Math.min(100, Math.round(100 - (totalIssues * 10))));

    return {
      importance: IMPORTANCE.ESSENTIAL_SERVED,
      metrics: {
        unencodedAmpersands: issues.unencodedAmpersands,
        redundantRoles: issues.redundantRoles,
        ariaMisuse: issues.ariaMisuse,
        nonSemanticContainers: issues.nonSemanticContainers,
        totalIssues,
        qualityScore,
        hasIssues: totalIssues > 0,
      },
    };
  }

  /**
   * Analyze Schema.org type disambiguation (Chapter 10)
   * Each JSON-LD block should have exactly ONE @type
   * Multiple @type values create ambiguity for AI agents trained on entertainment scripts
   *
   * Without explicit types, agents may confuse professional content with fictional dialogue
   * from films, TV shows, and scripted entertainment in their training data.
   *
   * @param {CheerioAPI} $ - Cheerio instance
   * @returns {Object} Schema type disambiguation metrics
   */
  static analyzeSchemaTypeDisambiguation($) {
    const jsonLdScripts = $('script[type="application/ld+json"]');
    const issues = [];
    let totalSchemas = 0;
    let schemasWithMultipleTypes = 0;

    jsonLdScripts.each((_, script) => {
      try {
        const data = JSON.parse($(script).html());
        totalSchemas++;

        // Check for multiple @type values (array with >1 element)
        if (Array.isArray(data['@type'])) {
          if (data['@type'].length > 1) {
            schemasWithMultipleTypes++;
            issues.push({
              schemaIndex: totalSchemas,
              problem: 'multiple_types_in_single_block',
              types: data['@type'],
            });
          }
        }
      } catch (e) {
        // Invalid JSON-LD, skip
      }
    });

    return {
      importance: IMPORTANCE.ESSENTIAL_SERVED, // Works for all agents
      metrics: {
        hasJsonLd: jsonLdScripts.length > 0,
        totalSchemas,
        schemasWithMultipleTypes,
        hasDisambiguation: schemasWithMultipleTypes === 0 && totalSchemas > 0,
        issues,
      },
    };
  }

  /**
   * Analyze inline CSS usage (Chapter 10)
   * Inline styles add noise for CLI agents that cannot execute them
   * External stylesheets are preferred (invisible to agents)
   *
   * CLI agents (Claude Code, Cline) and server-based agents cannot execute JavaScript
   * or process inline styles. Inline CSS adds noise to DOM without providing semantic value.
   *
   * @param {CheerioAPI} $ - Cheerio instance
   * @returns {Object} Inline CSS metrics
   */
  static analyzeInlineCSS($) {
    const elementsWithStyleAttr = $('[style]');
    const styleScripts = $('style').length;
    const externalSheets = $('link[rel="stylesheet"]').length;

    let inlineStyleCount = 0;

    elementsWithStyleAttr.each((_, el) => {
      const style = $(el).attr('style');
      if (style && style.trim().length > 0) {
        inlineStyleCount++;
      }
    });

    const totalElements = $('*').length;
    const inlineCSSRatio = totalElements > 0 ? (inlineStyleCount / totalElements) : 0;

    return {
      importance: IMPORTANCE.ESSENTIAL_SERVED, // CLI agents can't execute
      metrics: {
        hasInlineStyles: inlineStyleCount > 0,
        inlineStyleElementCount: inlineStyleCount,
        inlineStyleScriptCount: styleScripts,
        externalStylesheetCount: externalSheets,
        totalCSSVectors: inlineStyleCount + styleScripts,
        hasAnyCSS: inlineStyleCount > 0 || styleScripts > 0 || externalSheets > 0,
        inlineCSSRatio: Math.round(inlineCSSRatio * 1000) / 1000, // 3 decimal places
        totalElements,
      },
    };
  }

  /**
   * Analyze dynamic content patterns (carousels, animations, autoplay media)
   * Based on Chapter 2 "Dynamic Content Patterns" section
   *
   * Dynamic content poses timing challenges for AI agents that snapshot pages:
   * - Carousels: Agent only sees first slide (manual) or wrong slide (auto-advance)
   * - Animated text: Typewriter/ticker-tape effects incomplete at snapshot time
   * - Autoplay media: WCAG 2.2.2 compliance, stability detection
   * - Animated GIFs: No text alternative for motion-conveyed information
   *
   * NOTE: This method aggregates data collected during Puppeteer page.evaluate phase
   * in caching.js. It does not perform detection itself, only organizes the metrics.
   *
   * @param {CheerioAPI} $ - Cheerio instance (not used - data comes from pageData)
   * @param {Object} pageData - Page data from caching.js containing dynamicContent
   * @returns {Object} Dynamic content metrics
   */
  static analyzeDynamicContent($, pageData = null) {
    // NOTE: This method receives aggregated data from caching.js via pageData parameter
    // The actual detection happens in Puppeteer's page.evaluate block
    // If pageData is not provided, return empty metrics

    const dynamicData = pageData?.dynamicContent || {};

    const carousels = dynamicData.carousels || [];
    const animations = dynamicData.animations || {};
    const autoplayMedia = dynamicData.autoplayMedia || {};
    const animatedGifs = dynamicData.animatedGifs || {};
    const visualDynamism = dynamicData.visualDynamism || {};

    return {
      importance: IMPORTANCE.ESSENTIAL_RENDERED, // Browser agents can detect, CLI agents cannot
      metrics: {
        carousels: {
          count: carousels.length || 0,
          informationalCount: carousels.filter((c) => c.type === 'informational').length || 0,
          decorativeCount: carousels.filter((c) => c.type === 'decorative').length || 0,
          withProperAttributes: carousels.filter((c) => c.hasDataAttributes).length || 0,
          withAriaLabels: carousels.filter((c) => c.hasAriaLabels).length || 0,
          averageSlides: carousels.length > 0
            ? carousels.reduce((sum, c) => sum + (c.slideCount || 0), 0) / carousels.length
            : 0,
        },
        animations: {
          hasAnimations: animations.hasAnimations || false,
          hasCSSAnimations: animations.hasCSSAnimations || false,
          animatedElementCount: animations.animatedElementCount || 0,
          libraries: animations.libraries || {
            typedJs: false,
            typeIt: false,
            animateCSS: false,
            gsap: false,
            aos: false,
          },
        },
        autoplayMedia: {
          videoCount: autoplayMedia.videoCount || 0,
          audioCount: autoplayMedia.audioCount || 0,
          withControls: autoplayMedia.hasControls || 0,
          mutedCount: autoplayMedia.isMuted || 0,
        },
        animatedGifs: {
          count: animatedGifs.count || 0,
          withAltText: animatedGifs.hasAltText || 0,
          withDescriptions: animatedGifs.hasAriaDescribedBy || 0,
        },
        visualDynamism: {
          detected: visualDynamism.detected || false,
          uniqueStates: visualDynamism.uniqueStates || 0,
        },
      },
    };
  }
}
