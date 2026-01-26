# Web Audit Suite - Pattern Coverage Plan

## Purpose

This document tracks which AI-friendly HTML patterns from Appendix D are implemented in the Web Audit Suite's LLM suitability scoring, and which patterns need to be added.

**Reference documents:**

- Appendix D: `/packages/shared-appendices/appendix-d-ai-friendly-html-guide.txt`
- Don't Make AI Think: `/packages/dont-make-ai-think/`
- Current implementation: `/packages/web-audit-suite/src/utils/llmMetrics.js`

## Implementation Status

### ✅ Currently Implemented Patterns

These patterns are already detected and scored in the Web Audit Suite:

**Part 2 - Simple HTML Patterns:**

- Authentication state (`data-authenticated`)
- Explicit state attributes (`data-state`, `data-validation-state`)
- Persistent errors (`role="alert"`, `aria-live`)
- Table data attributes (`data-price`, `data-currency`)

**Part 3 - Form Patterns:**

- Form field labels (`<label>` associations)
- Disabled button explanations (`data-disabled-reason`)
- Form validation state (`data-validation-state`, `aria-invalid`)

**Part 4 - Page Structure Patterns:**

- Semantic HTML (`<main>`, `<nav>`, `<article>`, `<section>`)
- Breadcrumbs (`itemtype="BreadcrumbList"`)
- Search results metadata (`data-total-results`, `data-page`)
- Cart state (`data-item-count`, `data-subtotal`)

**Part 5 - Structured Data:**

- Schema.org JSON-LD presence
- Product schema
- LocalBusiness schema
- Article schema
- FAQPage schema
- BreadcrumbList schema

**Part 6 - JavaScript Patterns:**

- Server-side rendering detection
- Empty div detection (client-side rendering problems)

**Part 7 - Server-Side Patterns:**

- HTTP status codes (200, 404, etc.)
- Security headers (HSTS, CSP)

**Part 9 - Testing:**

- HTML validation
- WCAG compliance (via Pa11y)

**Part 13 - Dynamic Content:**

- Carousel metadata (`data-total-slides`, `data-current-slide`)
- Animation state (`data-animation-state`)

### ❌ Missing Patterns (Need Implementation)

These patterns from Appendix D are NOT currently detected or scored:

#### Gap 1: DOM Order Problems

**Pattern:** Content order in DOM vs visual layout
**Detection:** Analyze DOM order of `<main>`, `<aside>`, `<nav>` elements
**Scoring impact:** Medium (affects reading order)
**Implementation priority:** 2
**Source:** Don't Make AI Think Chapter 2, Examples 2.3-2.4

**Detection strategy:**

```javascript
// Check if sidebar appears before main content in DOM
const main = document.querySelector('main');
const aside = document.querySelector('aside');
if (aside && main && aside.compareDocumentPosition(main) === Node.DOCUMENT_POSITION_FOLLOWING) {
  // Sidebar before main - potential issue
}
```

**Scoring:**

- Penalty: -10 points if sidebar before main
- Bonus: +5 points if main appears first in DOM

---

#### Gap 2: Pricing Tables with Schema

**Pattern:** Pricing grids with Schema.org Product markup
**Detection:** Look for pricing tables with Schema.org offers
**Scoring impact:** Medium (helps AI extract pricing)
**Implementation priority:** 2
**Source:** Don't Make AI Think Chapter 3, Examples 3.1-3.2

**Detection strategy:**

```javascript
// Check for pricing tables with Schema.org
const pricingTables = document.querySelectorAll('[class*="pricing"], [class*="plan"]');
for (const table of pricingTables) {
  const hasSchema = document.querySelector('script[type="application/ld+json"]');
  const schemaContent = hasSchema ? JSON.parse(hasSchema.textContent) : null;
  const hasOffer = schemaContent && schemaContent['@type'] === 'Product' && schemaContent.offers;
}
```

**Scoring:**

- Bonus: +15 points for pricing table with Schema.org Product
- Penalty: -10 points for pricing table without semantic markup

---

#### Gap 3: Heading Hierarchy Validation

**Pattern:** Logical heading progression (h1 → h2 → h3, not h1 → h3)
**Detection:** Parse all headings, check for level jumps
**Scoring impact:** High (affects content outline)
**Implementation priority:** 1
**Source:** Don't Make AI Think Chapter 3, Examples 3.3-3.4

**Detection strategy:**

```javascript
// Check heading hierarchy
const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
const levels = headings.map(h => parseInt(h.tagName.substring(1)));
let errors = 0;
for (let i = 1; i < levels.length; i++) {
  const jump = levels[i] - levels[i-1];
  if (jump > 1) errors++; // Skipped heading level
}
```

**Scoring:**

- Penalty: -5 points per heading level jump
- Bonus: +10 points for perfect hierarchy

---

#### Gap 4: Definition Lists for Specs

**Pattern:** Using `<dl>`, `<dt>`, `<dd>` for key-value pairs
**Detection:** Check for product specs using definition lists
**Scoring impact:** Low (nice to have)
**Implementation priority:** 3
**Source:** Don't Make AI Think Chapter 3, Examples 3.8-3.9

**Detection strategy:**

```javascript
// Check for definition lists in product pages
const definitionLists = document.querySelectorAll('dl');
const hasProductSpec = definitionLists.length > 0 && document.querySelector('[itemtype*="Product"]');
```

**Scoring:**

- Bonus: +5 points for using `<dl>` in product/spec contexts
- Neutral: 0 points if not applicable

---

#### Gap 5: Multiple Authors in Article Schema

**Pattern:** Article schema with author array
**Detection:** Check Article schema for multiple authors
**Scoring impact:** Low (edge case)
**Implementation priority:** 4
**Source:** Don't Make AI Think Chapter 5, Example 5.7

**Detection strategy:**

```javascript
// Check for Article schema with author array
const schema = JSON.parse(document.querySelector('script[type="application/ld+json"]')?.textContent || '{}');
if (schema['@type'] === 'Article') {
  const hasMultipleAuthors = Array.isArray(schema.author) && schema.author.length > 1;
}
```

**Scoring:**

- Bonus: +3 points for multi-author support
- Neutral: 0 points if single author

---

#### Gap 6: Product Variants (Multiple Offers)

**Pattern:** Product schema with offers array for size/color variants
**Detection:** Check Product schema for multiple offers
**Scoring impact:** Medium (e-commerce specific)
**Implementation priority:** 2
**Source:** Don't Make AI Think Chapter 5, Example 5.9

**Detection strategy:**

```javascript
// Check for Product schema with variant offers
const schema = JSON.parse(document.querySelector('script[type="application/ld+json"]')?.textContent || '{}');
if (schema['@type'] === 'Product') {
  const hasVariants = Array.isArray(schema.offers) && schema.offers.length > 1;
}
```

**Scoring:**

- Bonus: +10 points for variant offers
- Neutral: 0 points if single offer

---

#### Gap 7: Skeleton Content Pattern

**Pattern:** Loading states with meaningful placeholders
**Detection:** Check for `data-state="loading"` with visible content
**Scoring impact:** Low (progressive enhancement)
**Implementation priority:** 3
**Source:** Don't Make AI Think Chapter 7, Example 7.5

**Detection strategy:**

```javascript
// Check for loading states with content
const loadingElements = document.querySelectorAll('[data-state="loading"]');
const hasSkeletonContent = Array.from(loadingElements).some(el => {
  return el.textContent.trim().length > 0; // Has visible content, not empty
});
```

**Scoring:**

- Bonus: +5 points for skeleton content pattern
- Penalty: -5 points for empty loading containers

---

#### Gap 8: Public vs Private Content Separation

**Pattern:** Static product info + dynamic user context
**Detection:** Check for mix of static content + user-specific elements
**Scoring impact:** Low (architectural pattern)
**Implementation priority:** 4
**Source:** Don't Make AI Think Chapter 7, Example 7.6

**Detection strategy:**

```javascript
// Check for separation pattern
const hasProductInfo = document.querySelector('[itemtype*="Product"]');
const hasUserContext = document.querySelector('[data-authenticated]');
const separation = hasProductInfo && hasUserContext;
```

**Scoring:**

- Bonus: +5 points for clear separation
- Neutral: 0 points if not applicable

---

#### Gap 9: Pre-rendering Detection

**Pattern:** Pre-rendered SPA content (react-snap, prerender.io)
**Detection:** Check for pre-render meta tags or complete HTML in SPA
**Scoring impact:** High (SPA accessibility)
**Implementation priority:** 1
**Source:** Don't Make AI Think Chapter 7, Example 7.10

**Detection strategy:**

```javascript
// Check for pre-rendering
const hasPrerender = document.querySelector('meta[name="prerender-status-code"]');
const hasSPARoot = document.querySelector('#root, #app, [data-reactroot]');
const hasContent = hasSPARoot && hasSPARoot.children.length > 0;
```

**Scoring:**

- Bonus: +20 points for pre-rendered SPA content
- Penalty: -20 points for empty SPA root

---

#### Gap 10: AJAX Navigation Pattern

**Pattern:** Real URLs with AJAX enhancement (not hash-based routing)
**Detection:** Check for `data-ajax` attributes on links
**Scoring impact:** Medium (progressive enhancement)
**Implementation priority:** 2
**Source:** Don't Make AI Think Chapter 7, Examples 7.15-7.16

**Detection strategy:**

```javascript
// Check for AJAX-enhanced navigation
const ajaxLinks = document.querySelectorAll('a[data-ajax]');
const hasRealURLs = Array.from(ajaxLinks).every(link => {
  return link.href && !link.href.includes('#');
});
```

**Scoring:**

- Bonus: +10 points for AJAX with real URLs
- Penalty: -10 points for hash-based SPA routing

---

#### Gap 11: Table Abuse Detection

**Pattern:** Tables used for layout vs data
**Detection:** Check for tables without `<thead>`, `<tbody>`, `<th>`
**Scoring impact:** Medium (semantic correctness)
**Implementation priority:** 2
**Source:** Don't Make AI Think Chapter 9, Examples 9.28-9.30

**Detection strategy:**

```javascript
// Detect table abuse
const tables = document.querySelectorAll('table');
for (const table of tables) {
  const hasTheadOrTbody = table.querySelector('thead, tbody');
  const hasTh = table.querySelector('th');
  const isLayoutTable = !hasTheadOrTbody && !hasTh;
}
```

**Scoring:**

- Penalty: -15 points per layout table
- Bonus: +5 points for proper data tables with `<caption>`, `scope`

---

#### Gap 12: PDF-Only Content

**Pattern:** Content only available as PDF
**Detection:** Check for PDF links without HTML alternatives
**Scoring impact:** High (content accessibility)
**Implementation priority:** 1
**Source:** Don't Make AI Think Chapter 9, Examples 9.34-9.35

**Detection strategy:**

```javascript
// Check for PDF-only content
const pdfLinks = document.querySelectorAll('a[href$=".pdf"]');
const hasHTMLAlternatives = Array.from(pdfLinks).some(link => {
  const parent = link.closest('section, article, div');
  const hasContent = parent && parent.textContent.trim().length > 200;
  return hasContent;
});
```

**Scoring:**

- Penalty: -20 points for PDF-only content
- Bonus: +10 points for HTML + PDF option

---

#### Gap 13: Content in Iframes

**Pattern:** Important content in external iframes
**Detection:** Check for iframes with content
**Scoring impact:** Medium (content accessibility)
**Implementation priority:** 2
**Source:** Don't Make AI Think Chapter 9, Examples 9.31-9.33

**Detection strategy:**

```javascript
// Check for content iframes
const iframes = document.querySelectorAll('iframe:not([data-video-role="decorative"])');
const hasContentIframes = iframes.length > 0;
const hasTextAlternatives = Array.from(iframes).some(iframe => {
  const parent = iframe.parentElement;
  return parent && parent.querySelector('address, article, section');
});
```

**Scoring:**

- Penalty: -10 points per content iframe without alternatives
- Bonus: +5 points for iframe with text alternative (e.g., map + address)

---

#### Gap 14: SSR Migration Examples

**Pattern:** Framework-specific SSR implementations
**Detection:** Detect Next.js, Nuxt.js, etc. with proper SSR
**Scoring impact:** High (SPA accessibility)
**Implementation priority:** 1
**Source:** Don't Make AI Think Chapter 10, Examples 10.5-10.6

**Detection strategy:**

```javascript
// Detect SSR frameworks
const hasNextData = document.querySelector('#__NEXT_DATA__');
const hasNuxtData = document.querySelector('#__NUXT__');
const hasSSRContent = (hasNextData || hasNuxtData) && document.querySelector('main').children.length > 0;
```

**Scoring:**

- Bonus: +20 points for SSR framework with content
- Penalty: -20 points for SSR framework without content

---

#### Gap 15: Progressive Enhancement Accordion

**Pattern:** `<details>`/`<summary>` for accordions
**Detection:** Check for native HTML disclosure widgets
**Scoring impact:** Low (progressive enhancement)
**Implementation priority:** 3
**Source:** Don't Make AI Think Chapter 10, Examples 10.7-10.8

**Detection strategy:**

```javascript
// Check for details/summary elements
const detailsElements = document.querySelectorAll('details');
const hasProgressiveAccordion = detailsElements.length > 0;
```

**Scoring:**

- Bonus: +5 points for `<details>`/`<summary>` usage
- Neutral: 0 points if not applicable

---

## Priority Implementation Roadmap

### Priority 1 (Critical - High Impact)

1. **Heading Hierarchy Validation** (Gap 3)
2. **Pre-rendering Detection** (Gap 9)
3. **PDF-Only Content** (Gap 12)
4. **SSR Migration Examples** (Gap 14)

### Priority 2 (Important - Medium Impact)

1. **DOM Order Problems** (Gap 1)
2. **Pricing Tables with Schema** (Gap 2)
3. **Product Variants** (Gap 6)
4. **AJAX Navigation Pattern** (Gap 10)
5. **Table Abuse Detection** (Gap 11)
6. **Content in Iframes** (Gap 13)

### Priority 3 (Nice to Have - Low Impact)

1. **Definition Lists** (Gap 4)
2. **Skeleton Content Pattern** (Gap 7)
3. **Progressive Enhancement Accordion** (Gap 15)

### Priority 4 (Edge Cases)

1. **Multiple Authors** (Gap 5)
2. **Public vs Private Separation** (Gap 8)

## Implementation Notes

### Scoring Philosophy

The Web Audit Suite uses a 100-point scale for LLM suitability:

- **Essential patterns (high impact):** 15-20 points
- **Important patterns (medium impact):** 5-15 points
- **Nice to have (low impact):** 3-5 points
- **Edge cases:** 1-3 points

### Testing Strategy

For each new pattern:

1. Add detection logic to `llmMetrics.js`
2. Add test case to `tests/llmMetrics.test.js`
3. Update `FEATURES.md` with new pattern
4. Update report templates in `reportGenerators.js`

### Report Integration

New patterns should appear in:

- **LLM Suitability Report** (`llm-suitability-report.md`)
- **Executive Summary** (if high priority)
- **Pattern Extraction** (if `--extract-patterns` enabled)

## Cross-Reference

**Book chapters mapped to gaps:**

- Chapter 2 (How AI Reads) → Gaps 1
- Chapter 3 (Guiding Principles) → Gaps 2, 3, 4
- Chapter 5 (Metadata) → Gaps 5, 6
- Chapter 7 (JavaScript) → Gaps 7, 8, 9, 10
- Chapter 9 (Anti-patterns) → Gaps 11, 12, 13
- Chapter 10 (Implementation) → Gaps 14, 15

## Version History

- **v1.0** (2026-01-18): Initial audit plan created based on Appendix D gap analysis
