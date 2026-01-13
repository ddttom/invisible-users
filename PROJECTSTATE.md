# Project State

## Current Status

**Last Updated:** 2026-01-13 (Removed Identity Delegation Project references + news.html accessibility improvements)

### Monorepo Structure

This repository is now structured as a monorepo with npm workspaces:

- **`packages/manuscript/`** - Book manuscript and materials (contains git submodule at `packages/manuscript/manuscript/`)
- **`packages/web-audit-suite/`** - Web analysis tool
- **Root level** - Shared tooling, scripts, and documentation

All projects share dependency management and build scripts via npm workspaces.

### Book Manuscript Status

- **Version:** 2.9.1
- **Status:** Publication-ready (in review, due Q1 2026)
- **Word Count:** ~60,666 words (core manuscript: preface + 12 chapters + The End + Glossary) - increased by 166 words
- **Appendices:** 12 appendices (~44,600 words) published separately online at <https://allabout.network/invisible-users/web/>
- **Chapters:** 12 chapters complete (added NEW Chapter 9: The Platform Race)
- **Latest Change:** Removed Identity Delegation Infrastructure Project references and improved news.html accessibility (2026-01-13):
  - **Project References Removal:** Removed all references to the discontinued Identity Delegation Infrastructure Project and identity-layer.html page from:
    - Repository documentation (README.md, docs/sales-enablement/PITCH.md)
    - Web materials (web/news.html Related Resources)
    - Talk materials (talks/members-call/talk.md, talk-slides.js)
    - Code examples (code-examples/identity-delegation-README.md, identity-delegation-worker.js)
  - **Accessibility Improvements (web/news.html):** Fixed WCAG 2.1 AA contrast issues and aligned all colors with appendix.css design system:
    - Fixed critical tag contrast failure: 3.2:1 → 8.5:1 (light blue on dark blue → white on blue)
    - Improved news date contrast: 4.6:1 → 8.3:1 (lighter grey → darker grey)
    - Updated all blues to match appendix.css standard (#0066cc)
    - All UI elements now meet or exceed WCAG AA 4.5:1 minimum contrast
  - **Previous Change:** Removed Identity Delegation framework and GitHub repository links from web/index.html, web/faq.html, web/news.html (2026-01-12)
- **Illustrations:** 13 SVG illustrations complete (11 chapters + cover design + executive summary decision tree)
- **Target Audiences:** Four primary audiences with 7 distinct reading paths
  - **Web Professionals & Engineers:** Expanded to include product owners, project managers, UX designers, content strategists, and QA engineers
  - **Agent System Developers:** Browser extensions, CLI agents, agentic systems
  - **Business Leaders & Decision Makers:** CTOs, CMOs, executives
  - **Partners & Investors:** Agencies and investors
  - **Reading Paths:** Business Leaders, Product Owners, Content Managers/Strategists, UX Designers/Information Architects, Developers, Agent System Developers, Small Business Owners
- **Structure:** Manuscript maintained in separate repository as git submodule
  - **Submodule:** `packages/manuscript/manuscript/` → <https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript>
  - Tracks main branch for easy updates
  - Core chapters (1-11), preface, executive summary in submodule
  - All twelve appendices (implementation guides, pattern references, resource directory, DDT reference, pipeline failure case study, industry developments, common page patterns, proposed AI metadata patterns) in submodule
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
  - **Appendix HTML** (`pdf:appendix`) - Individual HTML pages with automatic Chapter 10 pattern enhancement, generates 16 files (index.html, appendix-index.html, news.html, faq.html, llms.txt, sitemap.xml, 11 appendix pages)
- **Web Pages:**
  - **Location** (`packages/manuscript/manuscript/web/`) - Contains both manually maintained files and generated appendices
  - **News** (`web/news.html`) - Project news and updates (manually maintained)
  - **FAQ** (`web/faq.html`) - Frequently asked questions about the book and project (manually maintained)
  - **For Reviewers** (`web/for-reviewers.html`) - Reviewer acknowledgment page with NDA agreement and download access
  - **Generated files** - HTML appendices, llms.txt, sitemap.xml (created during build process)
  - All pages follow Chapter 10 technical patterns (AI meta tags, Schema.org JSON-LD, semantic HTML)
  - Book website URL: <https://allabout.network/invisible-users>
- **HTML Enhancement Pipeline:**
  - **Post-processor** (`scripts/enhance-appendix-html.js`) - Adds AI meta tags (including llms-txt), Schema.org JSON-LD, semantic roles, and replaces embedded CSS with external stylesheet link
  - **External Stylesheet** (`appendix.css`) - 12KB shared CSS file containing all Pandoc base styles and custom enhancements (navigation buttons, code blocks, responsive design)
  - **Code Block Features** - Black 2px borders, light grey backgrounds, copy buttons with visual feedback, data-role attributes for semantic clarity
  - **Sitemap generator** (`scripts/generate-sitemap.js`) - Creates sitemap.xml with appropriate priorities and change frequencies (15 URLs including appendices)
  - **Generation script** (`scripts/generate-appendix-html.sh`) - Orchestrates Pandoc conversion + enhancement + sitemap generation
  - **Documentation** (`scripts/README-appendix-enhancements.md`) - Complete pipeline documentation
  - Automatically applies British English, AI-specific meta tags (including llms-txt), accessibility enhancements, and external CSS for performance
  - Removes ~220 lines of embedded CSS per page, improving caching and maintainability

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
  - Presentation materials (talk.md, talk-slides.js, talk1.md) moved to manuscript repository at `packages/manuscript/manuscript/talks/members-call/`
- **Target Audience:** Business leaders (CTOs, product owners)
- **Key Features:** Priority-based roadmap, real production examples, code samples with ROI implications

### Repository Structure

- **Main Repository:** <https://github.com/ddttom/invisible-users>
  - Contains Web Audit Suite, documentation, sales materials
  - Manuscript integrated as git submodule
- **Manuscript Repository:** <https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript>
  - Public repository for GitHub Actions access
  - Independent manuscript versioning and CI
  - Tracked as submodule at `packages/manuscript/manuscript/`
- **Submodule Initialization:** `git submodule update --init --recursive`
- **Submodule Updates:** `git submodule update --remote packages/manuscript/manuscript`

### Code Quality

- **Markdown Linting:** All markdown files pass validation (manuscript submodule excluded from linting)
- **ESLint:** Web Audit Suite configured with ESLint 8.57.0
- **Linting Commands:** `npm run lint:markdown`, `npm run lint:markdown:fix`, `npm run audit:lint`
- **CI/CD:** GitHub Actions workflows configured with submodule initialization
  - `ci.yml` - Main CI pipeline with markdown linting and audit tests (runs on all pushes)
  - `quality-gate.yml` - Web Audit quality gates (runs on PRs and manual dispatch only)
  - `web-audit-suite-ci.yml` - Dedicated Web Audit Suite testing (runs when packages/web-audit-suite/ changes)

## Next Steps

- No immediate action required
- Both projects are complete and ready for use
- Sales enablement materials ready for member talks and presentations
- Future updates will be tracked in CHANGELOG.md
