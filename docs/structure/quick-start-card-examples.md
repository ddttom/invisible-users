---
title: "Quick Start Card Examples"
author: "Tom Cranstoun"
date: "2026-01-26"
description: "Three complete Quick Start Card examples demonstrating the YAML-based format for rapid implementation patterns"
keywords: [quick-start, cards, examples, patterns, implementation]
ai-instruction: "These are reference examples for Quick Start Cards. Use these as templates when creating new cards for Chapter 12. Maintain the YAML structure and follow the format exactly."
purpose: "Quick Start Card reference examples"
---

# Quick Start Card Examples

## Purpose

This document provides three complete Quick Start Card examples demonstrating the format defined in Appendix O. These examples can be used as references when creating pattern cards for Chapter 12 or other documentation.

## Example 1: Semantic HTML for Product Pages

### Pattern Quick Start: Semantic HTML for Product Pages

```yaml
card:
  id: mx.card.html.semantic-structure.product-pages
  pattern: mx.pattern.html.semantic-structure.product-pages
  title: "Semantic HTML for Product Pages"
  version: "1.0.0"
  authors:
    - "Tom Cranstoun"
  purpose: "Provide structured product information accessible to all agents and users"
  boundary: "page-level"
  tags:
    - html
    - semantic
    - ecommerce
    - product-pages
    - schema-org
  last_updated: "2026-01-26"
```

**Prerequisites:**
- Basic HTML knowledge
- Access to product page templates
- Understanding of semantic HTML5 elements

**Implementation Steps:**

1. **Use semantic HTML5 container elements**
   ```html
   <article itemscope itemtype="https://schema.org/Product">
     <header>
       <h1 itemprop="name">Product Name</h1>
     </header>
     <section class="product-details">
       <!-- Product content -->
     </section>
   </article>
   ```
   Wrap product content in `<article>` with Schema.org Product microdata

2. **Structure pricing with semantic markup**
   ```html
   <div class="pricing" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
     <data itemprop="price" value="99.00">£99.00</data>
     <meta itemprop="priceCurrency" content="GBP">
     <link itemprop="availability" href="https://schema.org/InStock">
     <span class="stock-status">In Stock</span>
   </div>
   ```
   Use `<data>` elements for prices and explicit availability states

3. **Add product attributes with definition lists**
   ```html
   <dl class="product-attributes">
     <dt>Brand</dt>
     <dd itemprop="brand">Acme Corp</dd>

     <dt>Colour</dt>
     <dd>Navy Blue</dd>

     <dt>Material</dt>
     <dd itemprop="material">100% Cotton</dd>
   </dl>
   ```
   Use `<dl>`, `<dt>`, `<dd>` for key-value pairs with Schema.org properties

**Expected Outcome:**
- AI agents can parse product name, price, availability, and attributes
- Screen readers announce proper structure and relationships
- Search engines correctly index product information
- Automated tests can verify product data presence

**Validation:**
- [ ] HTML validates with no errors (use [W3C Validator](https://validator.w3.org/))
- [ ] Schema.org markup validates (use [Schema.org Validator](https://validator.schema.org/))
- [ ] Screen reader announces product details correctly (test with NVDA/JAWS)
- [ ] Pa11y shows no critical accessibility issues

**Troubleshooting:**
- **Issue:** Schema.org warnings about missing required properties
  **Solution:** Add `description`, `image`, and `offers` properties as minimum requirements

- **Issue:** Screen reader skips pricing information
  **Solution:** Ensure `<data>` element has readable fallback text and proper `itemprop` attribute

**Related Patterns:**
- Pattern 18: Schema.org Metadata ([mx.pattern.metadata.schema-org](link)) - Full Schema.org implementation guide
- Pattern 5: Semantic HTML Structure ([mx.pattern.html.semantic-structure](link)) - General semantic HTML principles

**Related Chapters:**
- [Chapter 11.2: Four Guiding Principles](link) - Semantic First principle
- [Chapter 12.5: Pattern 5 (Semantic HTML)](link) - Detailed semantic HTML guidance

---

## Example 2: Progressive Enhancement for Forms

### Pattern Quick Start: Progressive Enhancement for Forms

```yaml
card:
  id: mx.card.javascript.progressive-enhancement.forms
  pattern: mx.pattern.javascript.progressive-enhancement
  title: "Progressive Enhancement for Forms"
  version: "1.0.0"
  authors:
    - "Tom Cranstoun"
  purpose: "Ensure forms work without JavaScript whilst providing enhanced experiences when available"
  boundary: "page-level"
  tags:
    - javascript
    - progressive-enhancement
    - forms
    - accessibility
    - agents
  last_updated: "2026-01-26"
```

**Prerequisites:**
- Working HTML form
- Basic JavaScript knowledge
- Server-side form processing endpoint

**Implementation Steps:**

1. **Create functional HTML-only form**
   ```html
   <form action="/contact" method="POST">
     <label for="email">Email address</label>
     <input type="email" id="email" name="email" required>

     <label for="message">Message</label>
     <textarea id="message" name="message" required></textarea>

     <button type="submit">Send Message</button>
   </form>
   ```
   Ensure form works with standard HTML submission (no JavaScript required)

2. **Add client-side enhancement with feature detection**
   ```javascript
   if ('fetch' in window) {
     const form = document.querySelector('form');
     form.addEventListener('submit', async (e) => {
       e.preventDefault();

       const formData = new FormData(form);
       const response = await fetch(form.action, {
         method: form.method,
         body: formData
       });

       // Show inline success message
       if (response.ok) {
         showSuccessMessage();
       }
     });
   }
   ```
   Detect fetch API support before intercepting form submission

3. **Provide explicit state feedback**
   ```html
   <button type="submit" aria-live="polite" aria-busy="false">
     <span class="button-text">Send Message</span>
     <span class="button-spinner" hidden aria-label="Sending..."></span>
   </button>
   ```
   Use ARIA live regions and explicit state attributes for loading feedback

**Expected Outcome:**
- Form works without JavaScript (falls back to full page refresh)
- Enhanced experience when JavaScript available (inline submission)
- State changes are announced to screen readers
- AI agents can understand form purpose and fields

**Validation:**
- [ ] Form submits correctly with JavaScript disabled
- [ ] Form submits correctly with JavaScript enabled
- [ ] Loading states are announced by screen readers
- [ ] No console errors in browser developer tools
- [ ] Pa11y shows no form-related accessibility issues

**Troubleshooting:**
- **Issue:** Form submits twice (JavaScript and HTML)
  **Solution:** Ensure `e.preventDefault()` is called before fetch request

- **Issue:** Loading state not announced to screen readers
  **Solution:** Add `aria-live="polite"` to container and update `aria-busy` attribute during submission

- **Issue:** Error messages not accessible
  **Solution:** Use `aria-describedby` to link error messages to form fields and `role="alert"` for dynamic errors

**Related Patterns:**
- Pattern 23: Progressive Enhancement ([mx.pattern.javascript.progressive-enhancement](link)) - General progressive enhancement approach
- Pattern 12: Explicit State Management ([mx.pattern.html.explicit-state](link)) - State attribute patterns

**Related Chapters:**
- [Chapter 12.8: Pattern 8 (Client-Side JavaScript)](link) - JavaScript best practices
- [Chapter 12.17: Pattern 17 (Error Handling)](link) - Error message patterns

---

## Example 3: WCAG 2.1 AA Compliance Check

### Pattern Quick Start: WCAG 2.1 AA Compliance Check

```yaml
card:
  id: mx.card.accessibility.wcag-compliance.quick-check
  pattern: mx.pattern.accessibility.wcag-compliance
  title: "WCAG 2.1 AA Compliance Quick Check"
  version: "1.0.0"
  authors:
    - "Tom Cranstoun"
  purpose: "Rapidly verify essential WCAG 2.1 Level AA compliance for AI agent compatibility"
  boundary: "page-level"
  tags:
    - accessibility
    - wcag
    - compliance
    - testing
    - validation
  last_updated: "2026-01-26"
```

**Prerequisites:**
- Access to website or development environment
- Browser with developer tools
- Pa11y or similar accessibility testing tool

**Implementation Steps:**

1. **Run automated accessibility scan**
   ```bash
   # Install Pa11y globally
   npm install -g pa11y

   # Run scan on target page
   pa11y --standard WCAG2AA https://your-site.com/page
   ```
   Automated scan catches ~40% of accessibility issues

2. **Check colour contrast ratios**
   ```bash
   # Use browser DevTools Accessibility panel
   # Or: Install axe DevTools browser extension
   # Minimum ratios:
   # - Normal text: 4.5:1
   # - Large text (18pt+): 3:1
   # - UI components: 3:1
   ```
   Check all text and interactive elements meet minimum contrast requirements

3. **Verify keyboard navigation**
   ```text
   Manual test checklist:
   1. Tab through entire page
   2. Verify focus indicator visible on all interactive elements
   3. Ensure all functionality accessible via keyboard
   4. Test Escape key closes modals/dropdowns
   5. Verify Enter/Space activates buttons and links
   ```
   Test without mouse to ensure keyboard-only access works

4. **Validate semantic HTML**
   ```bash
   # Run HTML validator
   curl -H "Content-Type: text/html; charset=utf-8" \
        --data-binary @page.html \
        https://validator.w3.org/nu/?out=json

   # Check for:
   # - No duplicate IDs
   # - Proper heading hierarchy (h1 → h2 → h3)
   # - Form labels linked to inputs
   # - Alt text on images
   ```
   Validate HTML structure meets semantic requirements

5. **Test with screen reader**
   ```text
   Quick screen reader test (5 minutes):
   - Windows: NVDA (free)
   - macOS: VoiceOver (built-in, Cmd+F5)
   - Test:
     1. Page title announced
     2. Headings create proper outline
     3. Links have descriptive text
     4. Images have alt text
     5. Form labels announced
   ```
   Sample real user experience with assistive technology

**Expected Outcome:**
- Zero critical Pa11y issues
- All text meets contrast requirements
- Full keyboard navigation works
- HTML validates with no errors
- Screen reader announces content correctly

**Validation:**
- [ ] Pa11y scan returns zero WCAG2AA violations
- [ ] All colour contrast ratios meet or exceed minimums
- [ ] Keyboard-only navigation reaches all interactive elements
- [ ] HTML validator shows no errors
- [ ] Screen reader test completes without confusion

**Troubleshooting:**
- **Issue:** Pa11y reports "color-contrast" errors
  **Solution:** Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to find compliant colours

- **Issue:** Focus indicator invisible on some elements
  **Solution:** Add explicit focus styles in CSS: `button:focus { outline: 2px solid #0066cc; outline-offset: 2px; }`

- **Issue:** Screen reader announces redundant information
  **Solution:** Use `aria-label` or `aria-labelledby` to provide concise alternatives, hide decorative content with `aria-hidden="true"`

- **Issue:** Skip links not working
  **Solution:** Ensure target has `id` attribute and is programmatically focusable (use `tabindex="-1"` on target container)

**Related Patterns:**
- Pattern 12: WCAG 2.1 AA Compliance ([mx.pattern.accessibility.wcag-compliance](link)) - Full compliance implementation
- Pattern 24: Accessibility Testing ([mx.pattern.testing.accessibility](link)) - Comprehensive testing methodology

**Related Chapters:**
- [Chapter 11.3: The Convergence Principle](link) - How accessibility helps agents
- [Chapter 12.12: Pattern 12 (WCAG 2.1 AA)](link) - Complete compliance guidance

---

## Usage Guidelines

### When to Create Quick Start Cards

**Create cards for:**
- Common implementation patterns (semantic HTML, forms, navigation)
- Tool-specific procedures (testing, validation, scanning)
- Frequently-needed quick references (compliance checks, debugging)
- Patterns with clear step-by-step procedures

**Don't create cards for:**
- Complex architectural decisions (use full pattern documentation)
- Theoretical concepts (use chapter narrative)
- Rarely-used edge cases
- Patterns requiring extensive customisation

### Card Structure Best Practices

**YAML Metadata:**
- **ID:** Follow `mx.card.domain.purpose.context` convention
- **Pattern reference:** Link to full pattern documentation
- **Purpose:** Single sentence, action-oriented, specific outcome
- **Boundary:** `page-level`, `system-level`, `local-only`, `cloud`, etc.
- **Tags:** 3-7 relevant, searchable keywords

**Implementation Steps:**
- **3-7 steps maximum** for quick start (link to full pattern for more)
- **Each step is atomic** (one clear action)
- **Include code examples** for concrete guidance
- **Explain outcomes** (what each step accomplishes)

**Validation Checklist:**
- **Concrete checks** (not "ensure quality")
- **Measurable outcomes** (specific tools/tests)
- **Tool-based where possible** (automated validation preferred)

**Troubleshooting:**
- **2-4 common issues** (most frequent problems)
- **Clear solutions** (specific fixes, not general advice)
- **Tool references** (link to documentation)

### Customising for Different Contexts

**For simpler patterns:**
- Reduce to 3 steps
- Combine validation and outcome sections
- Minimal troubleshooting (1-2 issues)

**For tool-specific patterns:**
- Add installation/setup step
- Include tool version requirements
- Link to tool documentation
- Provide fallback alternatives

**For platform-specific patterns:**
- Add platform requirements to prerequisites
- Include platform-specific code examples
- Note cross-platform alternatives
- Document platform limitations

## Integration into Chapter 12

### Recommended Placement

Quick Start Cards should be integrated into Chapter 12 alongside detailed pattern documentation:

**Format:**
```markdown
### Pattern [Number]: [Pattern Name]

[Detailed pattern documentation...]

#### Quick Start Card

[Quick Start Card content...]
```

**Example Integration:**
```markdown
### Pattern 5: Semantic HTML Structure

Semantic HTML provides meaning through element choice rather than visual styling...

[Full pattern documentation continues...]

#### Quick Start Card: Semantic HTML for Product Pages

[Quick Start Card example 1 from this document]
```

### Cross-References

Link cards to:
- Full pattern documentation in same chapter
- Related anti-patterns in Appendix N
- Related chapters for context
- External tools and validators

## Quality Checklist

Before publishing a Quick Start Card:

- [ ] YAML metadata is valid and complete
- [ ] Card ID follows naming convention
- [ ] Purpose statement is clear and action-oriented
- [ ] Prerequisites list all requirements
- [ ] Implementation steps are tested and working
- [ ] Code examples use correct syntax and are functional
- [ ] Expected outcomes are specific and measurable
- [ ] Validation checklist includes concrete checks
- [ ] Troubleshooting addresses common real issues
- [ ] Related patterns are linked correctly
- [ ] British English used throughout
- [ ] Markdown linting passes
- [ ] All links resolve correctly

## References

- [Appendix O: Pattern Documentation Templates](../../packages/shared-appendices/appendix-o-pattern-templates.md) - Template definitions
- [Plan 1: Extract patterns to MX-Bible](plan-1-extract-patterns-to-bible.md) - Integration strategy
- [Project Roadmap](project-roadmap-mx-patterns.md) - Timeline and milestones

## Appendix: Card ID Registry

Track all created cards to avoid duplicates:

| Card ID | Pattern | Chapter | Status |
|---------|---------|---------|--------|
| `mx.card.html.semantic-structure.product-pages` | Pattern 5 | 12.5 | Example |
| `mx.card.javascript.progressive-enhancement.forms` | Pattern 23 | 12.8 | Example |
| `mx.card.accessibility.wcag-compliance.quick-check` | Pattern 12 | 12.12 | Example |

(Add rows as new cards are created)
