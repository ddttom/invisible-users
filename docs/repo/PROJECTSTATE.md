# Project State

## Current Status

**Last Updated:** 2026-01-19 (Added commercial disclosure and disabled MD060 linting)

### Monorepo Structure

This repository is now structured as a monorepo with npm workspaces:

- **`packages/manuscript/`** - Book manuscript and materials (contains git submodule at `packages/manuscript/the-bible-of-mx/`)
- **`packages/web-audit-suite/`** - Web analysis tool
- **Root level** - Shared tooling, scripts, and documentation

All projects share dependency management and build scripts via npm workspaces.

### Book Manuscript Status

- **Version:** 2.9.1
- **Status:** Publication-ready (in review, due Q1 2026)
- **Word Count:** ~140,000 words total (core manuscript ~78,000 words + appendices ~58,600 words + supporting materials ~3,550 words)
- **Appendices:** 12 appendices (~58,600 words) published separately online at <https://allabout.network/invisible-users/web/>
- **Chapters:** 14 chapters complete (added NEW Chapter 0: What Are AI Agents? and Chapter 10: Generative Engine Optimization)
- **Latest Change:** Added commercial purpose disclosure to Chapter 0 and disabled MD060 linting (2026-01-19):
  - **Implementation Support Section:** Added reader-focused disclosure of professional services at end of Chapter 0
  - **Services Described:** Web Audit Suite consultation and implementation consulting for agent-ready patterns
  - **Commercial Context:** Transparent disclosure that book publicizes professional services without specific pricing
  - **Markdown Fixes:** Converted bold stage labels (Stage 1-5, Critical Insight) to proper `###` headings (fixed MD036 errors)
  - **Linting Configuration:** Disabled MD060 (table-column-style) in .markdownlint.json for EDS metadata tables
  - **Documentation Updates:** Updated CLAUDE.md to document MD060 as justified exception with rationale
  - **Zero Linting Errors:** Chapter 0 now passes all markdown linting checks
  - **Submodule commit:** d6f5d94 in manuscript repository
- **Previous Change:** Updated presentation materials with machine-focused messaging (2026-01-18):
  - **New Content:** Added chapter-00-what-are-ai-agents.md explaining four agent types (server-side, in-browser, browser automation, local) with technical capabilities and disability equivalents
  - **Presentation Updates:** Updated talk-slides.js and talk.md with "Design for Both" messaging (32 slides total, was 31)
  - **New Slides:** Added "What Are AI Agents? They're Machines", "The Ally McBeal Problem" (fiction vs professional content), "Mistake #2: Vague Button Text", "The Agent Journey Through Your Website" (6 stages)
  - **Combined Slides:** Merged slides 4 & 5 into single highlight slide for £203k cruise example
  - **Updated Messaging:** Changed from "Design for Machines First" to "Design for Both" throughout
  - **Citation Problem:** Added first-mover advantage messaging ("sites that work early get preferred")
  - **Documentation:** Created SLIDE-CONTENT-LIST.md documenting all 32 slides with complete content
  - **Submodule commit:** 7db8b34 in manuscript repository
- **Previous Change:** Fixed llms.txt detection with site-level file fetching (2026-01-17):
  - **Bug:** llms.txt file at <https://allabout.network/llms.txt> was not being detected despite existing
  - **Root Cause:** Detection logic only looked for HTML references (`<link>` or `<a>` tags), never fetched the actual file from site origin
  - **Fix:** Created `fetchSiteLevelFiles()` function in sitemap.js to fetch llms.txt, robots.txt, and ai.txt from site origin level
  - **Implementation:** main.js calls fetchSiteLevelFiles() during Phase 1 and stores results in `results.siteFiles`
  - **Report Updates:** executiveSummary.js and llmReports.js now use site-level detection instead of page-level HTML references
  - **Documentation:** Added 3 missing LLM suitability reports to report-layout.md (sections 8-10: general, frontend, backend)
  - **Documentation:** Added security_report.csv documentation (section 11)
  - **Documentation:** Renumbered all subsequent sections (12-21) and updated report count from "15+" to "19 reports"
  - **Documentation:** Added `llmsTxtUrl` field to executive summary JSON schema
  - **Impact:** llms.txt is now correctly detected for all pages when present at the site root, executive summary shows "Pages with llms.txt: 1" with correct URL
- **Previous Change:** Organized sales-enablement directory into logical subfolders (2026-01-17):
  - **Reorganization:** Moved 25 files from flat structure into 8 organized categories (business, pitches, publishers, partners, outreach, content, profiles, pricing)
  - **Documentation Updates:** Updated README.md and CLAUDE.md with new folder structure showing complete file organization
  - **Skill Updates:** Updated /opportunity skill documentation (README.md and skill.md) with new file paths for generated materials
  - **Git Tracking:** All moves tracked as renames with 100% similarity preserved
  - **Improved Navigation:** Sales enablement materials now organized by purpose for easier discovery and management
- **Previous Change:** Fixed carousel array TypeError bug in Web Audit Suite (2026-01-17):
  - **Bug:** `TypeError: carousels.filter is not a function` during LLM metrics collection
  - **Root Cause:** Code assumed `dynamicData.carousels || []` would ensure array type, but property could exist with non-array value
  - **Fix:** Added explicit type check using `Array.isArray(dynamicData.carousels) ? dynamicData.carousels : []` in llmCollector.js:865
  - **Impact:** Prevents audit crashes when analyzing pages with non-standard carousel implementations
  - **Added npm script:** `audit:allabout` for quick allabout.network audits with cache clearing
  - **Documentation updates:** Updated word counts across all documentation files (~78,000 words core, ~140,000 total)
  - **Sales materials:** Added O'Reilly proposal documents (proposal, TOC, sample chapter, author bio, pricing strategy)
- **Previous Change:** Added visual dynamism detection to Web Audit Suite (2026-01-17):
  - **Screenshot-Based Detection (caching.js):** Takes 3 screenshots at random 2-5 second intervals, calculates MD5 hash of each, detects visual changes by comparing hashes (typewriter animations, rotating text, tickers)
  - **Metrics Collection (llmCollector.js):** New visualDynamism metrics (detected boolean, uniqueStates count)
  - **Scoring Penalty (llmScorer.js, scoringWeights.js):** -5 points for detected visual dynamism
  - **Feedback Generation (llmFeedback.js):** Essential issue warning with recommendations to expose all text in served HTML
  - **Comprehensive Testing (dynamicContent.test.js):** 16 tests covering visual dynamism detection, scoring penalties, and feedback generation
  - **Documentation (Appendix C):** Visual Dynamism Detection section with real-world Arbory Digital example (typewriter animation cycling through "AEM UPGRADE SPECIALISTS" → "AEM EXPERTS" → "SECURITY")
  - **Sales Materials Updates:** Added Case Study 4 (Professional Services Firm), updated business-opportunities.md and EXECUTIVE_PITCH_DECK.md with visual dynamism detection
  - **Submodule commit:** 958d99a in manuscript repository
- **Previous Change:** Added dynamic content patterns to book and Web Audit Suite (2026-01-17):
  - **Book Manuscript (7 files, 796 insertions):** Comprehensive coverage of UI patterns that confuse AI agents
  - **Chapter 2:** Added "Dynamic Content Patterns" subsection (~1,100 words) covering carousels (manual vs auto-advance), animated text (typewriter/ticker-tape), and background media
  - **Chapter 11:** Added "Static Alternatives for Dynamic Content" section (~1,300 words) with solution patterns for carousels, animations, media, and progressive disclosure
  - **Chapter 12:** Added three new pattern subsections (2a, 2b, 2c) with code examples for carousel state attributes, animation controls, and media role disambiguation
  - **Appendix D:** Added Part 13 "Dynamic Content Patterns" (~270 lines) to both .txt and .md files with problem/solution format
  - **Appendix E:** Updated data attributes table with 8 new carousel/animation attributes (data-total-slides, data-current-slide, data-slide-index, data-autoplay, data-animation-state, data-animation-duration, data-animation-control, data-video-role)
  - **Appendix F:** Added Priority 1 (GIFs/video text alternatives, pause controls) and Priority 2 (carousel alternatives, animation HTML completeness) dynamic content items
  - **Web Audit Suite (11 files, 386 insertions):** Full detection and reporting implementation
  - **Detection (caching.js):** Carousel type classification (informational vs decorative), animation library detection (Typed.js, TypeIt, GSAP, AOS, Animate.css), autoplay media validation, animated GIF alt text checking
  - **Collection (llmCollector.js):** New analyzeDynamicContent method aggregating metrics from Puppeteer page.evaluate phase
  - **Scoring (llmScorer.js, scoringWeights.js):** Severity-based penalties: informational carousels -8, decorative carousels -3, autoplay without controls -8 (WCAG 2.2.2), GIFs without alt -3, animation libraries -2
  - **Reporting (llmReports.js):** 9 new CSV columns tracking carousel counts, autoplay videos, animated GIFs, and animation libraries
  - **Feedback (llmFeedback.js):** Actionable recommendations distinguishing informational vs decorative content with specific fix guidance
  - **Documentation:** Updated FEATURES.md with dynamic content detection section, CONFIGURATION.md with scoring penalties, README.md with feature mention
  - **Submodule commit:** d5a4a63 in manuscript repository
- **Previous Change:** Added professional profile to sales enablement materials (2026-01-17):
  - **profile.md:** Created integrated professional statement combining agent-ready infrastructure expertise with AEM/EDS strategic advisory
  - **Core Concepts:** Clarity infrastructure (explicit state, persistent feedback, complete information)
  - **Book Alignment:** Convergence principle - what agents need is what everyone needs
  - **Positioning:** Strategic advisor for Adobe EDS and agent readiness
  - **Services:** Plan reviews, architecture strategy, AI integration, team mentoring, audits
  - **Track Record:** Nissan-Renault (200+ sites), Ford, MediaMonks
  - **Authority Signals:** Boye & Company CMS Experts Group, "The AEM Guy"
- **Previous Change:** Added content type disambiguation guidance to Chapter 10 (2026-01-17):
  - **Chapter 10:** New "Missing Content Type Disambiguation" section in Common Implementation Mistakes
  - **Problem Addressed:** AI agents trained on entertainment scripts may confuse professional content with fictional dialogue
  - **Solution Provided:** Three complete JSON-LD examples (legal, medical, business analysis) with precise Schema.org types
  - **Schema.org Types:** Comprehensive list of 10 types for disambiguation (Legislation, ScholarlyArticle, MedicalScholarlyArticle, etc.)
  - **Real Examples:** Legal analysis vs legal drama (Ally McBeal), medical analysis vs TV scripts (Grey's Anatomy)
  - **Markdown Linting:** Fixed pre-existing issues (code block language, bold text used as headings)
- **Previous Change:** Updated VAT treatment and international pricing documentation (2026-01-17):
  - **Chapter 10:** Added comprehensive VAT guidance (UK eBooks 20% VAT, printed books zero-rated)
  - **Chapter 10:** Multi-regional offer arrays with eligibleRegion property for international pricing
  - **Appendix D:** Complete pricing structure examples with format-specific data attributes
  - **book-product-page.html:** Added "discovery precedes commerce" principle section
  - **book-product-page.html:** International pricing with USA customers (eBook $32.99, paperback $44.99)
  - **geo-blog.md:** Updated pricing example to emphasize format clarity and regional attributes
- **Previous Change:** Added Chapter 10 (GEO) and removed allaboutV2 auto-copy feature (2026-01-16):
  - **New Chapter 10:** Created "Generative Engine Optimization" chapter (~3,113 words) bridging gap between commercial urgency (Ch 9) and technical implementation (Ch 11-13)
  - **Chapter Renumbering:** Renamed chapters 10→11, 11→12, 12→13 for sequential numbering (1-13)
  - **Cross-Reference Updates:** Updated 50+ chapter references across chapters, appendices, documentation, and HTML files
  - **Build Script Modification:** Removed automatic copying to allaboutV2 directory from scripts/generate-appendix-html.sh
  - **Documentation Updates:** Updated README.md, CLAUDE.md, PROJECTSTATE.md to remove allaboutV2 references
- **Previous Change:** Added back-cover.png generation check and profile picture URL documentation (2026-01-15):
  - **Back-Cover Generation:** Enhanced scripts/download-cover-images.js to check for back-cover.png and display manual generation instructions if missing
  - **Manual Process:** back-cover.png must be generated by opening web/back-cover.html in browser and taking screenshot
  - **Documentation Updates:** Added "Illustration Generation Process" sections to CLAUDE.md (main + submodule), README.md (submodule), and ONBOARDING.md
  - **Profile Picture URL:** Updated all references to include .png extension (<https://allabout.network/media_126e99d56f06caf788bee715aff92281d2e31a206.png>)
  - **Three-Step Process:** Documented complete workflow: download covers → check back-cover.png → convert SVG to PNG
  - **Author Resources:** Added "Author Profile Resources" section to both CLAUDE.md files documenting profile picture location and usage
  - **Markdown Linting:** Fixed all pre-existing markdown linting issues in manuscript CLAUDE.md
  - **Submodule commit:** 3dc05ff in manuscript repository
- **Previous Change:** Added book preview page with webinar notice (2026-01-14):
  - **New Book Preview Page:** Created web/book.html featuring six chapter highlights with compelling excerpts from chapters 1, 2, 6, 9, 11, and 13
  - **Webinar Integration:** Added time-aware webinar notice for Boye & Co webinar "Websites That Work Perfectly - Until They Don't" (Jan 21, 2026, 14:00-14:30 London) that automatically hides after event date
  - **Visual Design:** Blue gradient header and design system matching index.html with full mobile responsiveness
  - **Schema.org Data:** Complete Book structured data with author, publisher, genre information
  - **AI-Friendly Patterns:** Implemented all Chapter 10 technical patterns (AI meta tags, semantic HTML, explicit state attributes)
  - **Navigation Updates:** Added links to book.html from index.html, faq.html, and sitemap.xml (priority 0.95)
  - **Contact Options:** Both mailto link with pre-filled message and visible email address for early access requests
  - **Submodule commit:** 687aa36 in manuscript repository
- **Previous Change:** Escaped HTML tags in markdown code examples (2026-01-13):
  - **HTML Tag Escaping:** Replaced literal `<details>` and `<summary>` tags with HTML entities (`&lt;` and `&gt;`) in markdown code blocks
  - **Files Updated:** 6 files across appendices, chapters, and presentation materials
  - **Purpose:** Prevents HTML tags from being rendered as actual HTML elements in documentation
  - **Submodule commit:** df8213e in manuscript repository
- **Previous Change:** Added automatic file copying to allaboutV2 output directory (2026-01-13):
  - **Build Scripts Enhancement:** Modified pdf:generate and pdf:appendix commands to automatically copy output files to `/Users/tomcranstoun/Documents/GitHub/allaboutV2/invisible-users` when directory exists
  - **PDF Generation:** pdf:generate now copies the-invisible-users.pdf to output directory after successful generation
  - **Web Files:** pdf:appendix copies all 18 generated web files (HTML appendices, index, news, FAQ, llms.txt, sitemap.xml) to output directory
  - **Graceful Fallback:** Both scripts check if output directory exists and provide informative messages without failing if directory is missing
  - **Documentation:** Updated README.md and CLAUDE.md to document the automatic copying behavior
- **Previous Change:** Removed Identity Delegation Infrastructure Project references and improved news.html accessibility (2026-01-13):
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
  - **Submodule:** `packages/manuscript/the-bible-of-mx/` → <https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript>
  - Tracks main branch for easy updates
  - Core chapters (1-13), preface, executive summary in submodule
  - All twelve appendices (implementation guides, pattern references, resource directory, DDT reference, pipeline failure case study, industry developments, common page patterns, proposed AI metadata patterns) in submodule
  - Code examples (agent-friendly-starter-kit/, code-examples/) in submodule
  - Blog materials (blog/blog.md, blog/blog.svg, blog/AI-Native.blog) in submodule
  - Presentation materials (talks/members-call/) in submodule
  - Claude Code configuration in main repository (.claude/ with hooks, commands, three skills: /step-commit, /md-fix, /news)
  - Documentation (README.md, CLAUDE.md) in submodule with comprehensive guidance
  - Planning files (book-plan.md, book-svg-style.md) remain at main repository root level
- **PDF Generation:**
  - **A4 Format** (`pdf:generate`) - Professional review copy with footer "Review Copy not for publication/distribution".
  - **Kindle Format** (`pdf:kindle`) - 6"×9" KDP-ready paperback format, production-ready (no review footer)
  - **Simple Format** (`pdf:simple`) - Basic PDF without cover or footer
  - **HTML Format** (`pdf:html`) - Browser-printable HTML version
  - **Appendix HTML** (`pdf:appendix`) - Individual HTML pages with automatic Chapter 11 pattern enhancement, generates 18 files (index.html, appendix-index.html, news.html, faq.html, llms.txt, sitemap.xml, 12 appendix pages A-L).
- **Web Pages:**
  - **Location** (`packages/manuscript/the-bible-of-mx/web/`) - Contains both manually maintained files and generated appendices
  - **News** (`web/news.html`) - Project news and updates (manually maintained)
  - **FAQ** (`web/faq.html`) - Frequently asked questions about the book and project (manually maintained)
  - **For Reviewers** (`web/for-reviewers.html`) - Reviewer acknowledgment page with NDA agreement and download access
  - **Generated files** - HTML appendices, llms.txt, sitemap.xml (created during build process)
  - All pages follow Chapter 11 technical patterns (AI meta tags, Schema.org JSON-LD, semantic HTML)
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
- **Features:** Full AI agent compatibility analysis (including meta tag validation), detailed SEO/Performance/Accessibility reports, Dashboard generation, Historical tracking, Rate Limiting, Flexible Configuration (CLI/Env), **Agency White-labeling**, **Bulk Audit**
- **Latest Change:** Meta tag validation scoring (2026-01-15):
  - **Social Media Meta Tags:** +20 points to ESSENTIAL_SERVED score (Open Graph +8, Twitter Card +5, completeness +7)
  - **SEO Meta Tags:** +5 points (robots, keywords, theme-color)
  - **Reading Time Metadata:** +10 points (timeRequired +5, completeness +5 for timeRequired/educationalLevel/inLanguage)
  - **LLM Reports:** 7 new CSV columns for meta tag validation metrics
  - **ESSENTIAL_SERVED Category:** 105 points maximum (increased from 70)
  - **Documentation:** Recipe 12 (Appendix A), FEATURES.md, README.md updated with scoring details
- **Architecture:** Three-phase pipeline (URL collection, data collection, report generation), centralized configuration, modular utilities, **Dependency Injection (AuditContext)** for state management
- **Testing:** Comprehensive test coverage (unit and integration)

### Sales Enablement Materials

- **Location:** `docs/sales-enablement/`
- **Status:** Complete
- **Materials:**
  - Business and sales materials: PITCH.md, business-plan.md, executive-summary.md, PARTNER_KIT.md, ROI_CASE_STUDIES.md, profile.md
  - Presentation materials (talk.md, talk-slides.js, talk1.md) moved to manuscript repository at `packages/manuscript/the-bible-of-mx/talks/members-call/`
- **Target Audience:** Business leaders (CTOs, product owners)
- **Key Features:** Priority-based roadmap, real production examples, code samples with ROI implications, professional profile combining agent-ready infrastructure with strategic advisory

### Repository Structure

- **Main Repository:** <https://github.com/ddttom/invisible-users>
  - Contains Web Audit Suite, documentation, sales materials
  - Manuscript integrated as git submodule
- **Manuscript Repository:** <https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript>
  - Public repository for GitHub Actions access
  - Independent manuscript versioning and CI
  - Tracked as submodule at `packages/manuscript/the-bible-of-mx/`
- **Submodule Initialization:** `git submodule update --init --recursive`
- **Submodule Updates:** `git submodule update --remote packages/manuscript/the-bible-of-mx`

### Development Environment

- **VS Code Workspace Configuration:** Complete professional setup in `.vscode/` directory
  - **Settings** (`.vscode/settings.json`) - ESLint, Markdownlint, Prettier integration with auto-format on save
  - **Extensions** (`.vscode/extensions.json`) - 24 recommended extensions (ESLint, Markdownlint, Prettier, Claude Code, GitLens, etc.)
  - **Tasks** (`.vscode/tasks.json`) - 15 quick-access tasks for book generation, linting, Web Audit Suite operations, git workflow
  - **Debug Configurations** (`.vscode/launch.json`) - 6 debug configurations for Web Audit Suite and Node.js debugging
- **Code Formatting:**
  - **Prettier** (`.prettierrc`) - Single quotes, 2-space tabs, 100-char line width
  - **EditorConfig** (`.editorconfig`) - Cross-editor consistency settings
  - **Prettier Ignore** (`.prettierignore`) - Excludes generated files and markdown
- **Developer Onboarding:**
  - **Onboarding Guide** (`ONBOARDING.md`) - 580-line comprehensive guide for new developers
    - 5-minute quickstart with verification checklist
    - Repository structure and submodule explanation
    - Common development tasks and VS Code integration
    - Troubleshooting common issues
    - Project principles and next steps
  - **Extension Management Guide** (`docs/vscode-extension-cleanup.md`) - Performance optimization guide identifying 100+ unnecessary extensions
- **Documentation Updates:**
  - README.md enhanced with Development Environment section
  - Quick reference for tasks and debugging shortcuts
  - Links to all configuration files and guides

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
