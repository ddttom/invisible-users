# LPC Print Website Audit - 28 January 2026

This folder contains a comprehensive manual accessibility and AI agent compatibility audit of <https://www.lpcprint.co.uk/>.

---

## Files in This Report

### 1. SUMMARY.md

**Quick overview for decision-makers**

- Executive summary of key findings
- Critical issues identified
- Recommended action plan with timelines
- Quick statistics

**Read this first** if you need a high-level understanding of the audit results.

---

### 2. lpcprint-manual-audit-report.md

**Complete technical audit report**

- Detailed analysis of all findings
- Code examples (current HTML and recommended fixes)
- WCAG violation references
- robots.txt and llms.txt analysis
- Sitemap structure breakdown
- Implementation guidance

**Read this** for complete technical details and implementation instructions.

---

### 3. FINDINGS-CHECKLIST.md

**Progress tracking checklist**

- All issues organized by priority
- Checkboxes for tracking remediation progress
- Estimated effort for each fix
- Testing and validation checklist

**Use this** to track remediation work as you implement fixes.

---

### 4. README.md

This file - explains the contents of this audit folder.

---

## Audit Overview

**Website Audited:** <https://www.lpcprint.co.uk/>
**Audit Date:** 28 January 2026
**Audit Method:** Manual HTML analysis via WebFetch tool
**Pages Analyzed:** 4 core pages (Homepage, Products, About, Sitemap)
**Total Site Pages:** 81 pages
**Platform:** Wix (JavaScript-heavy, limited semantic HTML)

---

## Key Findings Summary

### Critical Issues (4)

1. Missing language declaration (`lang` attribute)
2. No semantic landmarks (`<main>`, `<nav>`, etc.)
3. Zero Schema.org structured data
4. Hidden focus indicators

### High Priority Issues (4)

1. Missing heading structure
2. Image alt text gaps
3. Form accessibility problems
4. Color contrast concerns

### AI Agent Compatibility

- No llms.txt file
- No Schema.org markup
- robots.txt present but needs AI agent directives
- Missing semantic HTML throughout

---

## Estimated Remediation Effort

**Immediate fixes (0-2 weeks):** 1-2 days
**Short-term priorities (2-8 weeks):** 4-6 weeks
**Long-term strategy:** 3-6 months (consider platform migration)

**Total comprehensive fix time:** 50-75 hours

---

## How to Use This Audit

### For Project Managers

1. Read [SUMMARY.md](SUMMARY.md) for business context
2. Review recommended action plan and timelines
3. Prioritize fixes based on business impact
4. Allocate development resources

### For Developers

1. Read [lpcprint-manual-audit-report.md](lpcprint-manual-audit-report.md) for technical details
2. Use code examples to implement fixes
3. Track progress with [FINDINGS-CHECKLIST.md](FINDINGS-CHECKLIST.md)
4. Run validation tests after each fix

### For Accessibility Specialists

1. Review WCAG violations in full report
2. Validate fixes with automated tools (WAVE, axe DevTools)
3. Conduct manual testing with screen readers
4. Verify keyboard navigation

### For SEO/Marketing Teams

1. Focus on Schema.org structured data recommendations
2. Review llms.txt implementation guidance
3. Understand AI agent compatibility benefits
4. Plan for improved search engine visibility

---

## Recommended Tools

### Automated Testing

- **WAVE:** <https://wave.webaim.org/> (browser extension)
- **axe DevTools:** <https://www.deque.com/axe/devtools/> (browser extension)
- **Lighthouse:** Built into Chrome DevTools
- **Pa11y:** <https://pa11y.org/> (command-line tool)

### Manual Testing

- **NVDA:** Free screen reader for Windows
- **VoiceOver:** Built into macOS
- **Keyboard:** Test with Tab, Enter, Escape, Arrow keys

### Validation

- **W3C HTML Validator:** <https://validator.w3.org/>
- **Schema.org Validator:** <https://validator.schema.org/>
- **WebAIM Contrast Checker:** <https://webaim.org/resources/contrastchecker/>

---

## Implementation Priority

### Week 1-2: Quick Wins

- Add `lang` attribute (5 min)
- Fix focus indicators (1-2 hrs)
- Add AI agent directives to robots.txt (15 min)
- Test color contrast (4-8 hrs)

**Total: 1-2 days**

### Week 3-8: Core Improvements

- Add semantic landmarks (2-4 hrs)
- Implement Schema.org markup (4-8 hrs)
- Fix heading structure (8-12 hrs)
- Audit images and add alt text (16-24 hrs)
- Fix form accessibility (12-16 hrs)

**Total: 4-6 weeks**

### Month 3-6: Strategic Enhancements

- Consider Wix platform migration
- Implement automated testing
- Add dark mode support
- Optimize images and performance

---

## Platform Consideration

**Current Platform:** Wix

**Limitations Identified:**

- Heavy JavaScript rendering obscures HTML from crawlers
- Limited control over semantic HTML structure
- Difficult to implement comprehensive ARIA attributes
- Performance overhead from framework code

**Recommendation:** For comprehensive accessibility and AI agent compatibility, consider migrating to:

- WordPress with accessible theme (Neve, Astra, GeneratePress)
- Craft CMS (excellent semantic HTML control)
- Custom build with semantic-first approach

**Migration Effort:** 3-6 months (includes content migration, testing, and training)

---

## Follow-Up Audit

**Recommended Timeline:** 8-12 weeks after implementing fixes

**Follow-up Will Include:**

- Automated Pa11y scan (accessibility issues)
- Lighthouse audit (performance + accessibility)
- Schema.org validation
- AI agent compatibility testing
- Comparison with baseline audit

---

## Questions?

**Report Author:** Tom Cranstoun
**Email:** <tom.cranstoun@gmail.com>
**Website:** <https://allabout.network>

---

## References

This audit follows standards and patterns from:

- **WCAG 2.1:** <https://www.w3.org/WAI/WCAG21/quickref/>
- **Schema.org:** <https://schema.org/>
- **llms.txt Standard:** <https://llmstxt.org/>
- **MX-Bible:** Machine Experience for AI Agents (publication pending)

---

**Document Version:** 1.0
**Last Updated:** 28 January 2026
