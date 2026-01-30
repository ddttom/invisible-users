# LPC Print Website Audit - Findings Checklist

**Date:** 28 January 2026
**Website:** <https://www.lpcprint.co.uk/>

Use this checklist to track remediation progress.

---

## Priority 1: Critical Compliance Issues

- [ ] **Missing language declaration** - Add `lang="en-GB"` to `<html>` tag
  - WCAG: 3.1.1 Level A
  - Effort: 5 minutes
  - Impact: Screen readers, AI agents, translation tools

- [ ] **Missing semantic landmarks** - Replace `<div>` with `<header>`, `<main>`, `<nav>`, `<footer>`
  - WCAG: 1.3.1 Level A, 2.4.1 Level A
  - Effort: 2-4 hours
  - Impact: Screen reader navigation, AI agent structure understanding

- [ ] **No Schema.org structured data** - Add JSON-LD for LocalBusiness and Product
  - Impact: SEO, AI agents, voice assistants
  - Effort: 4-8 hours
  - Pages: All (especially homepage + product pages)

- [ ] **Hidden focus indicators** - Make CSS focus outlines visible
  - WCAG: 2.4.7 Level AA
  - Effort: 1-2 hours
  - Impact: Keyboard navigation visibility

---

## Priority 2: High Impact Improvements

- [ ] **Missing heading structure** - Convert styled `<div>` to `<h1>-<h6>` elements
  - WCAG: 1.3.1 Level A, 2.4.6 Level AA
  - Effort: 8-12 hours
  - Pages: All 81 pages

- [ ] **Image alt text infrastructure** - Audit all images, add descriptive alt text
  - WCAG: 1.1.1 Level A
  - Effort: 16-24 hours
  - Images: Product photos, logos, decorative images

- [ ] **Form accessibility gaps** - Add `<label>` elements, ARIA attributes, autocomplete
  - WCAG: 1.3.1 Level A, 3.3.2 Level A, 4.1.2 Level A
  - Effort: 12-16 hours
  - Forms: Contact forms, quote requests, order forms

- [ ] **Color contrast verification** - Test all text/background combinations
  - WCAG: 1.4.3 Level AA
  - Effort: 4-8 hours
  - Tool: WebAIM Contrast Checker

---

## Priority 3: Medium Priority Enhancements

- [ ] **Meta tags and Open Graph** - Add social sharing meta tags
  - Effort: 2-3 hours
  - Impact: Social media previews, messaging apps

- [ ] **Lazy loading optimization** - Verify implementation, add width/height
  - Effort: 2-4 hours
  - Impact: Page load performance, Core Web Vitals

---

## AI Agent Compatibility

- [ ] **Create llms.txt** - Add AI agent discovery file
  - Effort: 1-2 hours
  - Location: `/llms.txt`
  - Content: Business info, services, contact details, AI instructions

- [ ] **Update robots.txt** - Add AI agent directives (GPTBot, ChatGPT-User, Claude-Web)
  - Effort: 15 minutes
  - File: `/robots.txt`

- [ ] **Schema.org LocalBusiness** - Add organization-level structured data
  - Effort: 2-3 hours
  - Location: Homepage

- [ ] **Schema.org Product** - Add product markup to all product pages
  - Effort: 4-6 hours
  - Pages: All product pages (12+)

---

## Sitemap Cleanup

- [ ] **Remove deprecated pages** - Delete/redirect "nolongerrequired" and "copy-of-" pages
  - Effort: 2-3 hours
  - Pages: 15+ deprecated pages

- [ ] **Add priority tags** - Use `<priority>` in sitemap for main pages
  - Effort: 1 hour

- [ ] **Update lastmod dates** - Set accurate last modified dates (currently all 2026-01-20)
  - Effort: 30 minutes
  - Note: Automate if possible

---

## Testing & Validation

- [ ] **Run WAVE** - Browser extension accessibility scan
  - Tool: <https://wave.webaim.org/>
  - Target: All main pages

- [ ] **Run axe DevTools** - Automated accessibility testing
  - Tool: <https://www.deque.com/axe/devtools/>
  - Target: Homepage, products, forms

- [ ] **Test keyboard navigation** - Tab through entire site
  - Focus visible on all interactive elements
  - No keyboard traps
  - Logical tab order

- [ ] **Test with screen reader** - NVDA (Windows) or VoiceOver (Mac)
  - Landmarks navigable
  - Headings provide structure
  - Forms have labels
  - Images have alt text

- [ ] **Validate Schema.org** - Check JSON-LD markup
  - Tool: <https://validator.schema.org/>

- [ ] **Check color contrast** - All text meets WCAG AA
  - Tool: <https://webaim.org/resources/contrastchecker/>
  - Minimum: 4.5:1 for normal text, 3:1 for large text

- [ ] **Run Lighthouse** - Performance + Accessibility audit
  - Tool: Chrome DevTools
  - Target: All main page types

---

## Progress Tracking

**Date Started:** ___________

**Immediate Fixes Completed:** _____ / 5

**Short-term Priorities Completed:** _____ / 6

**AI Agent Compatibility Completed:** _____ / 4

**Testing Completed:** _____ / 7

**Total Progress:** _____ / 22 tasks

---

## Notes

Use this space to track blockers, questions, or implementation notes:

---

**Next Review Date:** ___________

**Reviewed By:** ___________
