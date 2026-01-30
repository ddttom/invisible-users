# advice.md Updates — December 2024 Session

This document summarises the changes made to `advice.md` during the December 2024 expansion session. The document grew from approximately 1,200 words to over 8,400 words across 12 parts.

## Document Structure

The guide now follows this structure:

1. Quick Reference Tables
2. Simple HTML Patterns
3. Form Patterns
4. Page Structure Patterns
5. Structured Data
6. Why Modern Architecture Confuses AI
7. Server-Side Patterns
8. Complete Examples
9. Testing and Validation
10. Implementation Priority
11. Why This Matters
12. Building for AI Development Assistants

---

## New Sections Added

### Part 1 — Quick Reference Tables

**Expanded Form Field Names Table**

Added 12 new standard field names:

| Field | Preferred Name |
| ----- | -------------- |
| Full name | fullName |
| Address line 2 | address2 |
| County/State | county or state |
| Country | country or country_code |
| Expiry date | expiryDate |
| CVV/CVC | cvv or cvc |
| Password | password |
| Username | username |
| Date of birth | dateOfBirth |
| Company | company |
| Quantity | quantity |

**New: Common Data Attributes Table**

Reference table for consistent data attribute usage:

- data-state, data-validation-state
- data-authenticated, data-product-id
- data-price, data-currency, data-quantity
- data-in-stock, data-page, data-total-pages
- data-sort, data-error-code
- data-step, data-total-steps
- data-agent-visible

---

### Part 4 — Page Structure Patterns

**New: Navigation and Breadcrumbs**

- Breadcrumb markup with Schema.org BreadcrumbList
- Main navigation with semantic data attributes
- Proper use of aria-label and aria-current

**New: Search and Filtering**

- Search results with machine-readable metadata (data-query, data-total-results, data-page)
- Active filter state with explicit data attributes
- Filter removal patterns
- Result count per filter option

**New: Pagination When Necessary**

- When pagination is unavoidable, proper markup for:
  - Current page and total pages
  - Total item counts
  - rel="prev/next" link elements in head
  - Pagination summary text

**New: Cart and Basket State**

- Complete cart HTML with:
  - Cart ID, item count, subtotal, currency
  - Individual line items with quantities and prices
  - Update and remove forms
  - Cart summary with VAT breakdown
  - Checkout readiness state

**New: Success Confirmation Pattern**

- Order confirmation page structure
- Order reference, status, payment summary
- Delivery details and estimated dates
- Items ordered list
- Next action links

**New: Currency and Locale**

- HTML lang and data-locale attributes
- hreflang link elements for language alternatives
- Currency selector form
- Price display with explicit currency data

**New: Delivery and Shipping Options**

- Shipping option fieldset with radio buttons
- Price, delivery timeframe, and estimated dates
- Cutoff times for next-day delivery
- Destination context

---

### Part 5 — Structured Data

**New: robots.txt, sitemap.xml, and llms.txt Relationship**

Comparison table explaining how the three files work together:

| File | Purpose | Audience |
| ---- | ------- | -------- |
| robots.txt | Access control | Search bots |
| sitemap.xml | Content discovery | Search engines |
| llms.txt | Context and guidance | AI agents |

Includes:
- Example robots.txt with AI agent rules
- Example sitemap.xml structure
- How to reference llms.txt from robots.txt
- Workflow explanation for agent access

**Fixed: Duplicate Error Handling Section**

Removed duplicated error handling section from llms.txt template.

---

### Part 6 — Why Modern Architecture Confuses AI (New Part)

Entirely new section explaining the problem before presenting solutions:

**The JavaScript Execution Problem**
- AI cannot execute JavaScript
- SPAs appear as empty shells
- Content loaded asynchronously is invisible

**Context Separation**
- Headless architectures divorce content from presentation
- Visual hierarchy cues are lost
- Implicit information becomes inaccessible

**The Dual-Channel Solution**
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Structured Data (JSON-LD)
- AI-Specific APIs

**Server-Side Rendering for AI**
- Before/after HTML comparison
- Framework SSR solutions table (Next.js, Nuxt.js, Angular Universal, SvelteKit)

**Progressive Enhancement**
- Start with semantic HTML
- Add CSS
- Layer JavaScript

**AI-Specific API Endpoints**
- Regular API vs AI-optimised API comparison
- Pre-formatted values, contextual information
- Explicit instructions for actions
- Relationship data

---

### Part 7 — Server-Side Patterns

**New: Agent Detection**

- Common AI Agent User-Agents table (GPTBot, ClaudeBot, PerplexityBot, etc.)
- Express.js detection middleware
- Usage for analytics segmentation

**New: Cookie Consent and GDPR Banners**

- Consent state in HTML with data-consent-status
- Dialog element for consent banner
- Automatic minimal consent for AI agents
- Sec-GPC header support
- Key principle: never block content with consent dialogs

**New: Captcha and Bot Protection**

- Allow known AI agents pattern
- Verified agent IP checking
- Captcha fallback with API alternative
- Rate limiting instead of blocking
- Separate rate limits for agents vs humans
- Bot policy documentation for llms.txt

**New: Error Handling for AI Clients**

- 404 page with llms-section meta tag
- Nginx configuration for AI fallback
- Express.js error handling with X-llms-Section header
- API error responses with ai_guidance object

---

### Part 9 — Testing and Validation

**Expanded Playwright Tests**

Added 10 new tests:

1. Breadcrumbs have Schema.org markup
2. Search results are machine-readable
3. Cart state is explicit
4. Pagination includes total counts
5. Filter state reflected in URL and DOM
6. llms.txt exists and is valid
7. 404 page references llms.txt
8. Consent banner does not block content

Total: 14 automated tests covering all major patterns.

---

### Part 10 — Implementation Priority

**Updated Immediate (0-2 hours)**
- Added: breadcrumb navigation with Schema.org markup

**Updated This Week (2-8 hours)**
- Added: make cart state machine-readable
- Added: currency/locale data attributes

**Updated This Month (1-2 days)**
- Added: make search results and filters machine-readable
- Added: success confirmation pages with explicit order data
- Added: shipping options with explicit pricing and timeframes

**Updated This Quarter (1-2 weeks)**
- Added: implement agent detection middleware
- Added: create sitemap.xml if not present
- Added: review cookie consent for AI agent compatibility
- Added: document bot policy in llms.txt

---

### Part 12 — Building for AI Development Assistants

**Updated: Skills Pattern Connection**

- Renamed section to "Documentation for AI (Skills Pattern)"
- Added explanation of how docs/for-ai/ extends Claude's skills concept
- Added SKILL.md as entry point with template
- Added conventions.md to folder structure
- Updated implementation priorities to reference SKILL.md

---

## Resources Section

**New Guides Added:**

- Why Modern Web Architecture Confuses AI: `https://allabout.network/blogs/ddt/ai/why-modern-web-architecture-confuses-ai`
- AI Optimization Update: `https://allabout.network/blogs/ddt/ai/ai-optimization-update`

---

## Summary Statistics

| Metric | Before | After |
| ------ | ------ | ----- |
| Lines | ~1,200 | 2,687 |
| Words | ~4,000 | ~8,400 |
| Parts | 11 | 12 |
| Code examples | ~25 | ~50 |
| Reference tables | 4 | 10 |
| Playwright tests | 4 | 14 |

---

## Source Material

Content drawn from:

1. llmstxt.org specification
2. "Creating an llms.txt File" — allabout.network
3. "You Built Software for Humans, Now Build It for AI" — allabout.network
4. "Why Modern Web Architecture Confuses AI" — allabout.network
5. "AI Optimization Update" — allabout.network
