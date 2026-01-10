# Project State

## Current Status

**Last Updated:** 2026-01-10 (Web Pages and Appendix Enhancement Pipeline Added)

### Combined Repository

This repository contains two integrated projects:

1. **Book Manuscript** - Complete and publication-ready
2. **Web Audit Suite** - Production-ready implementation tool

### Book Manuscript Status

- **Version:** 2.8.0
- **Status:** Publication-ready
- **Word Count:** ~57,000 words (core manuscript: preface + 11 chapters + The End + Glossary)
- **Appendices:** 10 appendices (~27,400 words) published separately online at <https://about.network/invisible-users/web/>
- **Chapters:** 11 chapters complete (added Chapter 11: What Agent Creators Must Build)
- **Latest Change:** Book restructured to end with The-End.md directing readers to online appendices. All appendices published as individual HTML pages with navigation, TOC, and llms.txt discovery. This allows appendices to remain current in fast-moving field without republishing core book.
- **Illustrations:** 13 SVG illustrations complete (11 chapters + cover design + executive summary decision tree)
- **Target Audiences:** Four primary audiences - Web Professionals, Agent System Developers, Business Leaders, Partners & Investors
- **Structure:** Manuscript maintained in separate repository as git submodule
  - **Submodule:** `invisible-users/manuscript/` → <https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript>
  - Tracks main branch for easy updates
  - Core chapters (1-11), preface, executive summary in submodule
  - All ten appendices (implementation guides, pattern references, resource directory, DDT reference, pipeline failure case study, industry developments) in submodule
  - Code examples (agent-friendly-starter-kit/, code-examples/) in submodule
  - Blog materials (blog/blog.md, blog/blog.svg, blog/AI-Native.blog) in submodule
  - Presentation materials (talks/members-call/) in submodule
  - Claude Code configuration in main repository (.claude/ with hooks, commands, three skills: /step-commit, /md-fix, /news)
  - Documentation (README.md, CLAUDE.md) in submodule with comprehensive guidance
  - Planning files (book-plan.md, book-svg-style.md) remain at main repository root level
- **PDF Generation:**
  - **A4 Format** (`pdf:generate`) - Professional review copy with footer "Review Copy not for publication/distribution"
  - **Kindle Format** (`pdf:kindle`) - 6"×9" KDP-ready paperback format, production-ready (no review footer)
  - **Simple Format** (`pdf:simple`) - Basic PDF without cover or footer
  - **HTML Format** (`pdf:html`) - Browser-printable HTML version
  - **Appendix HTML** (`pdf:appendix`) - Individual HTML pages with automatic Chapter 10 pattern enhancement
- **Web Pages:**
  - **Identity Layer** (`web/identity-layer.html`) - Universal Identity Delegation Infrastructure project landing page
  - **News** (`web/news.html`) - Project news and updates
  - All pages follow Chapter 10 technical patterns (AI meta tags, Schema.org JSON-LD, semantic HTML)
  - Book website URL: <https://allabout.network/invisible-users>
- **HTML Enhancement Pipeline:**
  - **Post-processor** (`scripts/enhance-appendix-html.js`) - Adds AI meta tags, Schema.org JSON-LD, semantic roles to Pandoc HTML
  - **Generation script** (`scripts/generate-appendix-html.sh`) - Orchestrates Pandoc conversion + enhancement
  - **Documentation** (`scripts/README-appendix-enhancements.md`) - Complete pipeline documentation
  - Automatically applies British English, AI-specific meta tags, and accessibility enhancements

### Web Audit Suite Status

- **Version:** 1.0.0
- **Status:** Production-ready
- **Features:** Full AI agent compatibility analysis, detailed SEO/Performance/Accessibility reports, Dashboard generation, Historical tracking, Rate Limiting, Flexible Configuration (CLI/Env), **Agency White-labeling**, **Bulk Audit**
- **Architecture:** Three-phase pipeline (URL collection, data collection, report generation), centralized configuration, modular utilities, **Dependency Injection (AuditContext)** for state management
- **Testing:** Comprehensive test coverage (unit and integration)

### Sales Enablement Materials

- **Location:** `docs/sales-enablement/`
- **Status:** Complete
- **Materials:**
  - Business and sales materials: PITCH.md, business-plan.md, executive-summary.md, PARTNER_KIT.md, ROI_CASE_STUDIES.md
  - Presentation materials (talk.md, talk-slides.js, talk1.md) moved to manuscript repository at `invisible-users/manuscript/talks/members-call/`
- **Target Audience:** Business leaders (CTOs, product owners)
- **Key Features:** Priority-based roadmap, real production examples, code samples with ROI implications

### Repository Structure

- **Main Repository:** <https://github.com/ddttom/invisible-users>
  - Contains Web Audit Suite, documentation, sales materials
  - Manuscript integrated as git submodule
- **Manuscript Repository:** <https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript>
  - Public repository for GitHub Actions access
  - Independent manuscript versioning and CI
  - Tracked as submodule at `invisible-users/manuscript/`
- **Submodule Initialization:** `git submodule update --init --recursive`
- **Submodule Updates:** `git submodule update --remote invisible-users/manuscript`

### Code Quality

- **Markdown Linting:** All markdown files pass validation (manuscript submodule excluded from linting)
- **ESLint:** Web Audit Suite configured with ESLint 8.57.0
- **Linting Commands:** `npm run lint:markdown`, `npm run lint:markdown:fix`, `npm run audit:lint`
- **CI/CD:** GitHub Actions workflows configured with submodule initialization
  - `ci.yml` - Main CI pipeline with markdown linting and audit tests (runs on all pushes)
  - `quality-gate.yml` - Web Audit quality gates (runs on PRs and manual dispatch only)
  - `web-audit-suite-ci.yml` - Dedicated Web Audit Suite testing (runs when web-audit-suite/ changes)

## Next Steps

- No immediate action required
- Both projects are complete and ready for use
- Sales enablement materials ready for member talks and presentations
- Future updates will be tracked in CHANGELOG.md
