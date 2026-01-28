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
    this.getSchemaDisambiguationFeedback(metrics, essentialIssues, recommendations);
    this.getInlineCSSFeedback(metrics, essentialIssues, recommendations);
    this.getDynamicContentFeedback(metrics, essentialIssues, niceToHaveIssues, recommendations);
    this.getHeadingHierarchyFeedback(metrics, essentialIssues, recommendations);
    this.getPrerenderingFeedback(metrics, essentialIssues, recommendations);
    this.getPDFContentFeedback(metrics, essentialIssues, recommendations);
    this.getSSRFrameworksFeedback(metrics, essentialIssues, recommendations);
    // Priority 2 patterns
    this.getDOMOrderFeedback(metrics, essentialIssues, recommendations);
    this.getPricingTablesFeedback(metrics, niceToHaveIssues, recommendations);
    this.getProductVariantsFeedback(metrics, niceToHaveIssues, recommendations);
    this.getAJAXNavigationFeedback(metrics, essentialIssues, recommendations);
    this.getTableAbuseFeedback(metrics, essentialIssues, recommendations);
    this.getIframeContentFeedback(metrics, essentialIssues, recommendations);
    // Priority 3 patterns
    this.getDefinitionListsFeedback(metrics, niceToHaveIssues, recommendations);
    this.getSkeletonContentFeedback(metrics, niceToHaveIssues, recommendations);
    this.getProgressiveEnhancementFeedback(metrics, niceToHaveIssues, recommendations);
    // Priority 4 patterns
    this.getMultipleAuthorsFeedback(metrics, niceToHaveIssues, recommendations);
    this.getContentSeparationFeedback(metrics, niceToHaveIssues, recommendations);

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

  /**
   * Get feedback for Schema.org type disambiguation
   */
  static getSchemaDisambiguationFeedback(metrics, essentialIssues, recommendations) {
    const schema = metrics.schemaTypeDisambiguation?.metrics;
    if (!schema) return;

    if (!schema.hasJsonLd) {
      // Already covered by existing structured data feedback
      return;
    }

    if (schema.schemasWithMultipleTypes > 0) {
      essentialIssues.push(
        `${schema.schemasWithMultipleTypes} of ${schema.totalSchemas} Schema.org blocks have multiple @type values`,
      );
      recommendations.push(
        'Each JSON-LD block should have exactly one @type to prevent agent confusion (see Chapter 10)',
      );
      recommendations.push(
        'Use specific Schema.org types like MedicalScholarlyArticle, AnalysisNewsArticle, TechArticle instead of multiple types',
      );
    }
  }

  /**
   * Get feedback for inline CSS usage
   */
  static getInlineCSSFeedback(metrics, essentialIssues, recommendations) {
    const css = metrics.inlineCSS?.metrics;
    if (!css) return;

    if (css.hasInlineStyles) {
      const percentage = Math.round(css.inlineCSSRatio * 100);
      essentialIssues.push(
        `${css.inlineStyleElementCount} elements have inline styles (${percentage}% of page)`,
      );

      if (css.inlineStyleScriptCount > 0) {
        essentialIssues.push(
          `${css.inlineStyleScriptCount} inline <style> tags add noise for CLI agents`,
        );
      }

      recommendations.push(
        'Move inline styles to external stylesheets - CLI agents cannot execute inline <style> tags or process style= attributes',
      );
      recommendations.push(
        'Use semantic HTML + external CSS for maximum agent compatibility',
      );

      if (css.externalStylesheetCount === 0) {
        recommendations.push(
          'Add external stylesheet references to separate styling from content',
        );
      }
    }
  }

  /**
   * Dynamic Content Feedback (Chapter 2)
   * Detects carousels, animations, autoplay media that confuse AI agents
   */
  static getDynamicContentFeedback(metrics, essentialIssues, niceToHaveIssues, recommendations) {
    const dynamic = metrics.dynamicContent?.metrics;

    if (!dynamic) return;

    // Carousel warnings (severity based on type)
    if (dynamic.carousels.count > 0) {
      const informationalCarousels = dynamic.carousels.informationalCount;
      const decorativeCarousels = dynamic.carousels.decorativeCount;
      const properCarousels = dynamic.carousels.withProperAttributes;

      // Informational carousels: high severity
      const improperInformational = Math.max(0, informationalCarousels - properCarousels);
      if (improperInformational > 0) {
        essentialIssues.push(
          `${improperInformational} informational carousel(s) hide content from agents`,
        );
        recommendations.push(
          'Add data-slide-index and aria-label attributes to carousel slides. Provide static "View all" alternative that shows all carousel items at once.',
        );
      }

      // Decorative carousels: medium severity
      const improperDecorative = Math.max(0, decorativeCarousels - (properCarousels - Math.min(properCarousels, informationalCarousels)));
      if (improperDecorative > 0) {
        niceToHaveIssues.push(
          `${improperDecorative} decorative carousel(s) lack accessibility attributes`,
        );
        recommendations.push(
          'Add aria-label="Decorative banner" and consider marking with aria-hidden="true" if purely visual.',
        );
      }
    }

    // Animation library warnings
    if (dynamic.animations.libraries) {
      const libs = dynamic.animations.libraries;

      if (libs.typedJs || libs.typeIt) {
        niceToHaveIssues.push(
          'Typewriter animation library detected (Typed.js or TypeIt)',
        );
        recommendations.push(
          'Ensure full text is present in served HTML with aria-live="off" during animation. Provide skip-animation control.',
        );
      }

      if (libs.gsap || libs.aos) {
        niceToHaveIssues.push(
          'Complex animation library detected (GSAP or AOS)',
        );
        recommendations.push(
          'Verify all animated content is accessible in served HTML before JavaScript enhancement.',
        );
      }
    }

    // Autoplay media warnings (WCAG 2.2.2 violation)
    if (dynamic.autoplayMedia.videoCount > 0) {
      const autoplayWithoutControls = dynamic.autoplayMedia.videoCount - dynamic.autoplayMedia.withControls;

      if (autoplayWithoutControls > 0) {
        essentialIssues.push(
          `${autoplayWithoutControls} autoplay video(s) lack pause controls`,
        );
        recommendations.push(
          'Add controls attribute to all autoplay videos. Consider removing autoplay entirely. WCAG 2.2.2 violation.',
        );
      }
    }

    // Animated GIF warnings
    if (dynamic.animatedGifs.count > 0) {
      const gifsWithoutAlt = dynamic.animatedGifs.count - dynamic.animatedGifs.withAltText;

      if (gifsWithoutAlt > 0) {
        niceToHaveIssues.push(
          `${gifsWithoutAlt} animated GIF(s) missing alt text`,
        );
        recommendations.push(
          'Add descriptive alt attributes to all informational GIFs. Use aria-describedby for longer descriptions.',
        );
      }
    }

    // Visual dynamism warnings (screenshot comparison detected changes)
    if (dynamic.visualDynamism && dynamic.visualDynamism.detected) {
      const { uniqueStates } = dynamic.visualDynamism;
      essentialIssues.push(
        `Visual content changes detected (${uniqueStates} unique states) - typewriter animations, tickers, or rotating content`,
      );
      recommendations.push(
        'Ensure all text variations are accessible in served HTML. Add data-content-complete="true" after animations finish. Provide static alternative with all content visible. Consider marking animated elements with data-animation-type="typewriter" or data-animation-type="ticker".',
      );
    }

    // JavaScript-dependent pricing warnings (critical for e-commerce)
    if (dynamic.pricing && dynamic.pricing.jsDependent) {
      essentialIssues.push(
        'Price information only appears after JavaScript execution - CLI agents and server-based agents cannot see pricing',
      );
      recommendations.push(
        'CRITICAL: Render price in served HTML using server-side templating. Add Schema.org Product with "price" property in JSON-LD. Include data-price attribute on price elements. Ensure <span itemprop="price"> or <meta itemprop="price"> exists before JavaScript loads. CLI agents (like ChatGPT Shopping) require prices in initial HTML to make recommendations.',
      );
    }
  }

  /**
   * Heading Hierarchy Feedback (Gap 3)
   * Validates logical heading progression (h1 → h2 → h3, not h1 → h3)
   */
  static getHeadingHierarchyFeedback(metrics, essentialIssues, recommendations) {
    const heading = metrics.headingHierarchy?.metrics;
    if (!heading) return;

    if (!heading.hasH1) {
      essentialIssues.push('Page missing <h1> heading - agents cannot identify primary topic');
      recommendations.push('Add exactly one <h1> element describing the page topic');
    }

    if (heading.multipleH1) {
      essentialIssues.push('Page has multiple <h1> headings - confuses content outline');
      recommendations.push('Use only one <h1> per page, use <h2>-<h6> for subsections');
    }

    if (heading.headingJumps > 0) {
      essentialIssues.push(
        `${heading.headingJumps} heading level jump(s) detected (e.g., h1 → h3, skipping h2)`,
      );
      recommendations.push(
        'Maintain logical heading hierarchy: h1 → h2 → h3 (never skip levels). This provides a clear document outline for agents.',
      );
      recommendations.push(
        'See Chapter 3 of "Don\'t Make AI Think" for heading hierarchy examples',
      );
    }
  }

  /**
   * Pre-rendering Feedback (Gap 9)
   * Detects SPA frameworks with/without server-side rendering
   */
  static getPrerenderingFeedback(metrics, essentialIssues, recommendations) {
    const prerender = metrics.prerendering?.metrics;
    if (!prerender) return;

    if (prerender.hasEmptySPARoot) {
      essentialIssues.push(
        'SPA framework detected but root element is empty - CLI agents see blank page',
      );
      recommendations.push(
        'CRITICAL: Enable server-side rendering (SSR) or pre-rendering. Next.js/Nuxt.js provide built-in SSR. For React, use react-snap or prerender.io.',
      );
      recommendations.push(
        'Without SSR, CLI agents (like Claude Code) cannot access your content because they don\'t execute JavaScript',
      );
      recommendations.push(
        'See Chapter 7 examples for SSR migration patterns',
      );
    } else if (prerender.hasSSRFramework && !prerender.hasPrerenderedContent) {
      essentialIssues.push(
        'SSR framework detected but content not rendering on server',
      );
      recommendations.push(
        'Verify SSR configuration: check getServerSideProps (Next.js) or asyncData (Nuxt.js) are populating content',
      );
    }
  }

  /**
   * PDF Content Feedback (Gap 12)
   * Warns about content only available as PDF downloads
   */
  static getPDFContentFeedback(metrics, essentialIssues, recommendations) {
    const pdf = metrics.pdfContent?.metrics;
    if (!pdf || pdf.pdfCount === 0) return;

    if (pdf.hasPDFOnly && pdf.pdfWithoutAlternatives > 0) {
      essentialIssues.push(
        `${pdf.pdfWithoutAlternatives} PDF link(s) without HTML alternatives - content hidden from agents`,
      );
      recommendations.push(
        'CRITICAL: Provide HTML versions of PDF content. Agents cannot extract text from PDFs reliably.',
      );
      recommendations.push(
        'Example: "Download PDF" + "Read online" links, or embed HTML content with "Print as PDF" option',
      );
      recommendations.push(
        'See Chapter 9 anti-patterns for PDF-only content examples',
      );
    }

    if (pdf.hasPDFWithHTML && pdf.pdfWithAlternatives > 0) {
      recommendations.push(
        `Good: ${pdf.pdfWithAlternatives} PDF(s) have HTML alternatives available`,
      );
    }
  }

  /**
   * SSR Framework Feedback (Gap 14)
   * Detects framework-specific SSR implementations
   */
  static getSSRFrameworksFeedback(metrics, essentialIssues, recommendations) {
    const ssr = metrics.ssrFrameworks?.metrics;
    if (!ssr || !ssr.hasSSRFramework) return;

    const framework = ssr.isNextJS ? 'Next.js' : ssr.isNuxtJS ? 'Nuxt.js' : 'Unknown SSR framework';

    if (ssr.ssrWithoutContent) {
      essentialIssues.push(
        `${framework} detected but <main> element is empty - SSR not working`,
      );
      recommendations.push(
        `Verify ${framework} SSR configuration: pages should export getServerSideProps (Next.js) or use asyncData (Nuxt.js)`,
      );
      recommendations.push(
        'Check build output: ensure pages are rendering on server, not client-only',
      );
      recommendations.push(
        'See Chapter 10 implementation examples for SSR setup patterns',
      );
    } else if (ssr.ssrWithContent) {
      recommendations.push(
        `Excellent: ${framework} SSR is working correctly - content visible in served HTML`,
      );
    }
  }

  /**
   * DOM Order Feedback (Gap 1)
   * Warns about sidebar/navigation appearing before main content
   */
  static getDOMOrderFeedback(metrics, essentialIssues, recommendations) {
    const dom = metrics.domOrder?.metrics;
    if (!dom) return;

    if (dom.sidebarBeforeMain) {
      essentialIssues.push(
        'Sidebar appears before <main> in DOM - agents read navigation before content',
      );
      recommendations.push(
        'Move <main> element before <aside> in DOM order. Use CSS (flexbox, grid) for visual layout, not DOM order.',
      );
      recommendations.push(
        'See Chapter 2 examples for DOM order vs visual layout patterns',
      );
    }

    if (dom.navBeforeMain) {
      essentialIssues.push(
        'Top-level <nav> appears before <main> in DOM - affects reading order',
      );
      recommendations.push(
        'Place primary navigation after <main> in DOM, or wrap in <header> element',
      );
    }

    if (dom.mainFirst) {
      recommendations.push(
        'Good: <main> element appears first in body - optimal reading order',
      );
    }
  }

  /**
   * Pricing Tables Feedback (Gap 2)
   * Validates pricing tables have Schema.org markup
   */
  static getPricingTablesFeedback(metrics, niceToHaveIssues, recommendations) {
    const pricing = metrics.pricingTables?.metrics;
    if (!pricing || pricing.pricingCount === 0) return;

    if (pricing.pricingWithoutSchema > 0) {
      niceToHaveIssues.push(
        `${pricing.pricingCount} pricing table(s) without Schema.org Product markup`,
      );
      recommendations.push(
        'Add Schema.org Product with offers array to pricing tables for agent extraction',
      );
      recommendations.push(
        'Example: { "@type": "Product", "offers": { "price": "9.99", "priceCurrency": "USD" } }',
      );
    }

    if (pricing.pricingWithSchema > 0) {
      recommendations.push(
        'Good: Pricing tables have Schema.org Product markup',
      );
    }
  }

  /**
   * Product Variants Feedback (Gap 6)
   * Validates Product schema with variant offers
   */
  static getProductVariantsFeedback(metrics, niceToHaveIssues, recommendations) {
    const variants = metrics.productVariants?.metrics;
    if (!variants || !variants.hasProductSchema) return;

    if (variants.hasVariants) {
      recommendations.push(
        `Excellent: Product schema has ${variants.variantCount} variant offers (sizes, colors, etc.)`,
      );
    } else {
      niceToHaveIssues.push(
        'Product schema has single offer - consider adding variants array for size/color options',
      );
      recommendations.push(
        'Use offers array in Product schema: "offers": [{ "size": "S", "price": "19.99" }, ...]',
      );
    }
  }

  /**
   * AJAX Navigation Feedback (Gap 10)
   * Validates AJAX-enhanced navigation uses real URLs
   */
  static getAJAXNavigationFeedback(metrics, essentialIssues, recommendations) {
    const ajax = metrics.ajaxNavigation?.metrics;
    if (!ajax || ajax.ajaxLinkCount === 0) return;

    if (ajax.hasHashBasedSPA) {
      essentialIssues.push(
        `${ajax.hashBasedLinks} AJAX link(s) use hash-based routing (#/page) - inaccessible without JavaScript`,
      );
      recommendations.push(
        'Use real URLs with AJAX enhancement: /page with data-ajax attribute, not #/page',
      );
      recommendations.push(
        'Example: <a href="/products" data-ajax="true"> (progressive enhancement)',
      );
    }

    if (ajax.hasAJAXWithRealURLs) {
      recommendations.push(
        `Good: ${ajax.realURLLinks} AJAX link(s) use real URLs with progressive enhancement`,
      );
    }
  }

  /**
   * Table Abuse Feedback (Gap 11)
   * Detects tables used for layout instead of data
   */
  static getTableAbuseFeedback(metrics, essentialIssues, recommendations) {
    const tables = metrics.tableAbuse?.metrics;
    if (!tables || tables.totalTables === 0) return;

    if (tables.hasLayoutTables) {
      essentialIssues.push(
        `${tables.layoutTables} table(s) used for layout (missing thead/tbody/th) - confuses agents`,
      );
      recommendations.push(
        'CRITICAL: Use CSS grid/flexbox for layout, not tables. Reserve <table> for data only.',
      );
      recommendations.push(
        'Data tables require: <thead>, <tbody>, <th> with scope attributes, <caption>',
      );
      recommendations.push(
        'See Chapter 9 anti-patterns for table abuse examples',
      );
    }

    if (tables.hasProperDataTables) {
      recommendations.push(
        `Good: ${tables.dataTables} data table(s) have proper semantic markup`,
      );
    }
  }

  /**
   * Iframe Content Feedback (Gap 13)
   * Warns about content in iframes without alternatives
   */
  static getIframeContentFeedback(metrics, essentialIssues, recommendations) {
    const iframe = metrics.iframeContent?.metrics;
    if (!iframe || iframe.iframeCount === 0) return;

    if (iframe.iframesWithoutAlternatives > 0) {
      essentialIssues.push(
        `${iframe.iframesWithoutAlternatives} iframe(s) without text alternatives - content hidden from agents`,
      );
      recommendations.push(
        'Provide HTML alternatives for iframe content. Example: Google Maps iframe + <address> with street address',
      );
      recommendations.push(
        'Agents cannot access iframe content - always provide equivalent text',
      );
      recommendations.push(
        'See Chapter 9 anti-patterns for iframe content examples',
      );
    }

    if (iframe.iframesWithAlternatives > 0) {
      recommendations.push(
        `Good: ${iframe.iframesWithAlternatives} iframe(s) have text alternatives`,
      );
    }
  }

  /**
   * Definition Lists Feedback (Gap 4)
   * Validates use of dl/dt/dd for product specs
   */
  static getDefinitionListsFeedback(metrics, niceToHaveIssues, recommendations) {
    const dl = metrics.definitionLists?.metrics;
    if (!dl) return;

    if (dl.hasProgressivePattern) {
      recommendations.push(
        `Good: ${dl.dlCount} definition list(s) used for product specifications`,
      );
    } else if (dl.hasProductSchema && dl.dlCount === 0) {
      niceToHaveIssues.push(
        'Product page without definition lists - consider using <dl> for specifications',
      );
      recommendations.push(
        'Use <dl><dt>Weight</dt><dd>1.5 kg</dd></dl> for product specs',
      );
    }
  }

  /**
   * Skeleton Content Feedback (Gap 7)
   * Validates loading states have meaningful placeholders
   */
  static getSkeletonContentFeedback(metrics, niceToHaveIssues, recommendations) {
    const skeleton = metrics.skeletonContent?.metrics;
    if (!skeleton || skeleton.loadingElementCount === 0) return;

    if (skeleton.emptyLoadingContainers > 0) {
      niceToHaveIssues.push(
        `${skeleton.emptyLoadingContainers} loading element(s) are empty - agents see nothing during load`,
      );
      recommendations.push(
        'Add skeleton content: <div data-state="loading">Loading products...</div>',
      );
      recommendations.push(
        'Provide structure even during loading: headings, placeholder text, loading messages',
      );
    }

    if (skeleton.hasSkeletonContent) {
      recommendations.push(
        'Good: Loading states have meaningful placeholder content',
      );
    }
  }

  /**
   * Progressive Enhancement Feedback (Gap 15)
   * Validates use of details/summary elements
   */
  static getProgressiveEnhancementFeedback(metrics, niceToHaveIssues, recommendations) {
    const pe = metrics.progressiveEnhancement?.metrics;
    if (!pe) return;

    if (pe.hasProgressiveAccordion) {
      recommendations.push(
        `Good: ${pe.detailsCount} <details> element(s) provide native accordion functionality`,
      );
    } else {
      niceToHaveIssues.push(
        'No <details>/<summary> elements detected - consider using for accordions',
      );
      recommendations.push(
        'Use <details><summary>Question</summary>Answer</details> for native accordions',
      );
      recommendations.push(
        'Progressive enhancement: works without JavaScript, enhanceable with CSS/JS',
      );
    }
  }

  /**
   * Multiple Authors Feedback (Gap 5)
   * Validates Article schema with author array
   */
  static getMultipleAuthorsFeedback(metrics, niceToHaveIssues, recommendations) {
    const authors = metrics.multipleAuthors?.metrics;
    if (!authors || !authors.hasArticleSchema) return;

    if (authors.hasMultipleAuthors) {
      recommendations.push(
        `Good: Article schema has ${authors.authorCount} authors in array`,
      );
    }
    // Not a warning if single author - that's normal
  }

  /**
   * Content Separation Feedback (Gap 8)
   * Validates separation of static/dynamic content
   */
  static getContentSeparationFeedback(metrics, niceToHaveIssues, recommendations) {
    const separation = metrics.contentSeparation?.metrics;
    if (!separation) return;

    if (separation.hasSeparation) {
      recommendations.push(
        'Good: Static product info separated from dynamic user context (data-authenticated)',
      );
    }
    // Not a warning if pattern not applicable
  }
}
