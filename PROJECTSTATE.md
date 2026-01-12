# Project State

## Current Status

**Last Updated:** 2026-01-12 (Google UCP Platform Race + Chapter 9 + Sales Blog)

### Combined Repository

This repository contains two integrated projects:

1. **Book Manuscript** - Complete and publication-ready
2. **Web Audit Suite** - Production-ready implementation tool

### Book Manuscript Status

- **Version:** 2.9.0
- **Status:** Publication-ready (in review, due Q1 2026)
- **Word Count:** ~60,500 words (core manuscript: preface + 12 chapters + The End + Glossary)
- **Appendices:** 11 appendices (~42,000 words) published separately online at <https://allabout.network/invisible-users/web/>
- **Chapters:** 12 chapters complete (added NEW Chapter 9: The Platform Race)
- **Latest Change:** Platform race chapter and comprehensive Google UCP integration:
  - **NEW Chapter 9: The Platform Race** (~5,200 words) documents January 2026 seven-day acceleration (Amazon Jan 5, Microsoft Jan 8, Google Jan 11) when three major platforms launched agent commerce systems. Analyzes competitive landscape: two open protocols (ACP, UCP) vs Microsoft proprietary, fragmentation risk, Microsoft's isolation problem, timeline compression from 12 months to 6-9 months for meaningful adoption.
  - **Chapter Renumbering:** Previous Ch 9→10, Ch 10→11, Ch 11→12. Updated ALL cross-references across 60+ files (chapters, appendices, front matter, blog, sales materials).
  - **Google UCP Integration:** Added comprehensive entries to Appendix J (~280 lines, 12-section format) and blog/book-updates.md documenting Universal Commerce Protocol announcement, competitive positioning, and implications.
  - **Chapter Content Updates:** Added platform competition and protocol fragmentation sections to Chapters 10, 11, 12 with urgency messaging and Chapter 9 backward references.
  - **Glossary Expansion:** Added Agentic Commerce Protocol (ACP) and Universal Commerce Protocol (UCP) entries with Chapter 9 cross-references.
  - **Web Cleanup:** Deleted obsolete web/identity-layer.html (identity delegation project proposal page - superseded by real platform launches).
  - **Tone Corrections:** Fixed "Timeline update: This chapter was written before..." messaging to "As of January 2026:" (appropriate for pre-publication manuscript).
  - **Sales Materials:** Updated 6 sales enablement files with chapter renumbering, added platforms-blog.md for LinkedIn promotion and Boye & Company members call (January 21st, 2026).
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
  - **Appendix HTML** (`pdf:appendix`) - Individual HTML pages with automatic Chapter 10 pattern enhancement, generates 15 files (index.html, appendix-index.html, news.html, llms.txt, sitemap.xml, 10 appendix pages)
- **Web Pages:**
  - **News** (`web/news.html`) - Project news and updates
  - **FAQ** (`web/faq.html`) - Frequently asked questions about the book and project
  - All pages follow Chapter 10 technical patterns (AI meta tags, Schema.org JSON-LD, semantic HTML)
  - Book website URL: <https://allabout.network/invisible-users>
- **HTML Enhancement Pipeline:**
  - **Post-processor** (`scripts/enhance-appendix-html.js`) - Adds AI meta tags, Schema.org JSON-LD, semantic roles, responsive margin CSS, code block styling, and copy-to-clipboard functionality to Pandoc HTML
  - **Code Block Features** - Black 2px borders, light grey backgrounds, copy buttons with visual feedback, data-role attributes for semantic clarity
  - **Sitemap generator** (`scripts/generate-sitemap.js`) - Creates sitemap.xml with appropriate priorities and change frequencies
  - **Generation script** (`scripts/generate-appendix-html.sh`) - Orchestrates Pandoc conversion + enhancement + sitemap generation
  - **Documentation** (`scripts/README-appendix-enhancements.md`) - Complete pipeline documentation
  - Automatically applies British English, AI-specific meta tags, accessibility enhancements, and consistent styling matching web pages

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
