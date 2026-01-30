# LPC Print Website Audit - Executive Summary

**Date:** 28 January 2026
**Website:** <https://www.lpcprint.co.uk/>
**Pages Analyzed:** 4 core pages (81 total pages on site)
**Audit Method:** Manual HTML analysis

---

## Overall Assessment

LPC Print operates a Wix-built website with significant accessibility barriers and AI agent compatibility issues. The platform's reliance on dynamic JavaScript rendering and non-semantic HTML creates challenges for both assistive technology users and AI agents.

---

## Critical Issues Found

### 1. Missing Language Declaration

- **Impact:** Screen readers can't select correct pronunciation
- **WCAG:** 3.1.1 Level A violation
- **Fix Time:** 5 minutes
- **Fix:** Add `lang="en-GB"` to `<html>` tag

### 2. No Semantic Landmarks

- **Impact:** Screen reader users can't navigate page regions
- **WCAG:** 1.3.1 Level A, 2.4.1 Level A violations
- **Fix Time:** 2-4 hours
- **Fix:** Replace generic `<div>` elements with `<header>`, `<main>`, `<nav>`, `<footer>`

### 3. Zero Structured Data (Schema.org)

- **Impact:** Search engines and AI agents can't understand business context
- **Fix Time:** 4-8 hours
- **Fix:** Add JSON-LD markup for LocalBusiness and Product data

### 4. Hidden Focus Indicators

- **Impact:** Keyboard users can't see which element has focus
- **WCAG:** 2.4.7 Level AA violation
- **Fix Time:** 1-2 hours
- **Fix:** Make focus outlines visible in CSS

---

## High Priority Issues

- **Missing heading structure:** Pages use styled `<div>` instead of `<h1>-<h6>` (8-12 hours to fix)
- **Image alt text gaps:** No systematic alt text implementation (16-24 hours to audit/fix)
- **Form accessibility problems:** Missing labels, ARIA attributes, autocomplete (12-16 hours to fix)
- **Color contrast concerns:** Light blue on white may fail WCAG AA (4-8 hours to test/fix)

---

## AI Agent Compatibility

### Current State

- ❌ No Schema.org structured data
- ❌ No llms.txt file
- ❌ Missing semantic HTML landmarks
- ❌ Heading hierarchy not implemented
- ✅ robots.txt present and functional
- ✅ Sitemap available (81 pages)

### Recommended Additions

1. **Create llms.txt:** AI agent discovery file (1-2 hours)
2. **Add Schema.org markup:** LocalBusiness + Product data (4-8 hours)
3. **Update robots.txt:** Add explicit AI agent directives (15 minutes)

---

## robots.txt Status

**Status:** Present and well-configured

**Key findings:**

- Blocks lightbox parameters (prevents duplicate content)
- Restricts Google Ads bots from galleries and partials
- Completely blocks PetalBot (aggressive crawler)
- Rate-limits DotBot and AhrefsBot (10-second crawl delay)
- Declares sitemap location

**Recommendation:** Add explicit AI agent directives (GPTBot, ChatGPT-User, Claude-Web)

---

## llms.txt Status

**Status:** Not found (404)

**Recommendation:** Create llms.txt with business information, services, and AI agent instructions. This emerging standard helps AI agents discover and recommend your business.

**Benefit:** First-mover advantage as MX practices spread in the industry.

---

## Sitemap Structure

- **Total pages:** 81
- **Last updated:** 2026-01-20
- **Categories:** Products (12), Services (6), Garments (5), Client-specific (20+), Business resources (8)
- **Issue:** 15+ deprecated pages marked "nolongerrequired" should be cleaned up

---

## Positive Patterns

- ✅ Lazy loading implementation present
- ✅ Security hardening (XSS protection)
- ✅ CSS variable system (enables theming)
- ✅ Well-organized sitemap

---

## Recommended Action Plan

### Immediate (0-2 weeks) - 1-2 days effort

1. Add `lang="en-GB"` attribute (5 min)
2. Fix CSS focus indicators (1-2 hrs)
3. Add AI agent directives to robots.txt (15 min)
4. Create and deploy llms.txt (1-2 hrs)
5. Test color contrast (4-8 hrs)

### Short-term (2-8 weeks) - 4-6 weeks effort

1. Add semantic landmarks (2-4 hrs)
2. Implement Schema.org JSON-LD (4-8 hrs)
3. Audit heading structure across all pages (8-12 hrs)
4. Fix form accessibility (12-16 hrs)
5. Audit and write image alt text (16-24 hrs)
6. Clean up sitemap (2-3 hrs)

### Long-term (3-6 months)

1. Consider platform migration from Wix (better semantic HTML control)
2. Implement automated accessibility testing
3. Add dark mode / high contrast theme
4. Optimize images (WebP, responsive, CDN)
5. Add PWA features

---

## Key Statistics

- **Critical violations:** 4 (WCAG Level A)
- **High priority issues:** 4 (WCAG Level AA)
- **Medium priority issues:** 3
- **Total estimated fix time:** 50-75 hours for comprehensive fixes
- **Quick wins time:** 6-12 hours for immediate compliance improvements

---

## Platform Limitation Note

Wix's architecture prioritizes visual design over semantic HTML, making comprehensive accessibility fixes challenging. The platform generates heavy JavaScript that obscures proper HTML structure from crawlers and assistive technology.

**Long-term recommendation:** Consider migrating to a more semantic-first platform (WordPress with accessible theme, Craft CMS, or custom build) for better control over HTML output and AI agent compatibility.

---

## Next Steps

1. Review this report with development team
2. Prioritize fixes based on business impact
3. Implement immediate fixes (1-2 days)
4. Schedule short-term improvements (4-6 weeks)
5. Conduct follow-up audit after fixes

---

**Full Report:** See `lpcprint-manual-audit-report.md` in this directory for detailed analysis with code examples, WCAG violations, and implementation guidance.

**Contact:** Tom Cranstoun | <tom.cranstoun@gmail.com> | <https://allabout.network>
