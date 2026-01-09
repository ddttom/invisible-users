# Project State

## Current Status

**Last Updated:** 2026-01-09 (manuscript submodule integration)

### Combined Repository

This repository contains two integrated projects:

1. **Book Manuscript** - Complete and publication-ready
2. **Web Audit Suite** - Production-ready implementation tool

### Book Manuscript Status

- **Version:** 2.6.0
- **Status:** Publication-ready
- **Word Count:** ~55,000 words (core chapters)
- **Total Content:** ~65,500 words (including appendices)
- **Chapters:** 11 chapters complete (added Chapter 11: What Agent Creators Must Build)
- **Appendices:** 9 appendices (A-I) covering implementation guides, patterns, resources, LLM context, and pipeline failure case study
- **Illustrations:** 13 SVG illustrations complete (11 chapters + cover design + executive summary decision tree)
- **Target Audiences:** Four primary audiences - Web Professionals, Agent System Developers, Business Leaders, Partners & Investors
- **Structure:** Manuscript maintained in separate repository as git submodule
  - **Submodule:** `invisible-users/manuscript/` → <https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript>
  - Tracks main branch for easy updates
  - Core chapters (1-11), preface, executive summary in submodule
  - All nine appendices (implementation guides, pattern references, resource directory, DDT reference, pipeline failure case study) in submodule
  - Planning files (book-plan.md, book-svg-style.md) remain at main repository root level
- **PDF Generation:**
  - **A4 Format** (`pdf:generate`) - Professional review copy with footer "Review Copy not for publication/distribution"
  - **Kindle Format** (`pdf:kindle`) - 6"×9" KDP-ready paperback format, production-ready (no review footer)
  - **Simple Format** (`pdf:simple`) - Basic PDF without cover or footer
  - **HTML Format** (`pdf:html`) - Browser-printable HTML version

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
  - **talk.md** - Complete 20-minute talk script with concrete examples from book appendices
  - **talk-slides.js** - Google Apps Script to generate 19-slide presentation
  - **talk1.md** - Original outline reference
  - Additional materials: PITCH.md, business-plan.md, executive-summary.md, PARTNER_KIT.md, ROI_CASE_STUDIES.md
- **Target Audience:** Business leaders (CTOs, product owners)
- **Key Features:** Priority-based roadmap, real production examples, code samples with ROI implications

### Repository Structure

- **Main Repository:** <https://github.com/ddttom/invisible-users>
  - Contains Web Audit Suite, documentation, sales materials
  - Manuscript integrated as git submodule
- **Manuscript Repository:** <https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript>
  - Independent manuscript versioning and CI
  - Tracked as submodule at `invisible-users/manuscript/`
- **Submodule Initialization:** `git submodule update --init --recursive`
- **Submodule Updates:** `git submodule update --remote invisible-users/manuscript`

### Code Quality

- **Markdown Linting:** All markdown files pass validation (manuscript submodule excluded from linting)
- **ESLint:** Web Audit Suite configured with ESLint 8.57.0
- **Linting Commands:** `npm run lint:markdown`, `npm run lint:markdown:fix`, `npm run audit:lint`
- **CI/CD:** GitHub Actions workflows configured with submodule initialization
  - `ci.yml` - Main CI pipeline with markdown linting and audit tests
  - `quality-gate.yml` - Web Audit quality gates
  - `web-audit-suite-ci.yml` - Dedicated Web Audit Suite testing

## Next Steps

- No immediate action required
- Both projects are complete and ready for use
- Sales enablement materials ready for member talks and presentations
- Future updates will be tracked in CHANGELOG.md
