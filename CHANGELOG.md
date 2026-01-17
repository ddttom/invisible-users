# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Note:** Full detailed changelog with 57 entries archived in [CHANGELOG-FULL.md](CHANGELOG-FULL.md)

## [Unreleased]

### Added - Convergence Principle and Assistive Technology Themes (2026-01-17)

Enhanced manuscript with comprehensive convergence principle and assistive technology themes across multiple documents. Updated preface.md with specific assistive technology examples (keyboard users, screen readers, voice control, cognitive disabilities) and JSON-LD metadata importance for agent citations. Added new Skip Links section to Chapter 10 (lines 470-530) explaining convergence principle with complete HTML/CSS implementation and assistive technology context. Enhanced Chapter 13 with convergence principle in introduction, new Skip Links Recognition subsection with implementation pattern, citation context for structured data, and accessibility connection in conclusion. Added semantic HTML parsing with skip link recognition to transparency manifest example. Updated talk-slides.js with new "Citation Problem" slide and convergence principle references across multiple slides. Enhanced talk.md with expanded assistive technology specifics, citation problem section with JSON-LD example, reordered patterns to emphasize skip links, and universal design patterns throughout. Updated sales materials (EXECUTIVE_PITCH_DECK.md, executive-summary.md, PITCH.md) with skip links in agent-ready architecture and convergence principle references. Manuscript submodule commit: 60740e0.

### Added - Chapter 10 GEO and Complete Chapter Renumbering (2026-01-16)

Created new Chapter 10 "Generative Engine Optimization" (~3,113 words) bridging gap between commercial urgency (Ch 9) and technical implementation (Ch 11-13). Explains GEO vs SEO distinction (citation vs ranking), three discovery layers (site-wide guidance with robots.txt + llms.txt, page-level metadata with JSON-LD, content structure with semantic HTML), business decision framework for when to emphasize discoverability vs limit exposure, and measuring GEO success metrics. Renamed chapters sequentially: chapter-10-designing-for-both.md → chapter-11-designing-for-both.md, chapter-11-technical-advice.md → chapter-12-technical-advice.md, chapter-12-what-agent-creators-must-build.md → chapter-13-what-agent-creators-must-build.md. Updated 50+ chapter references across 7 appendix files (A, D, G, I, J, K, L), 6 manuscript repository files (reading-guide.md, executive-summary.md, blog/agent-ecosystem-acceleration.md, blog/blog.md, code-examples/html-examples/README.md, code-examples/identity-delegation-README.md, web/site/README.md), 15 HTML files (12 regenerated appendices + 3 manually maintained: index.html, book.html, faq.html), plus chapter files themselves (chapter-05, chapter-09, new chapter-10, chapter-11, chapter-12, chapter-13). Updated metadata.yaml and metadata-kindle.yaml with Chapter 10 information. Updated all documentation (CLAUDE.md, README.md, PROJECTSTATE.md, book-plan.md, docs/sales-enablement/executive-summary.md) to reflect 13-chapter structure. Manuscript submodule commit: c35075c.

### Changed - Removed allaboutV2 Auto-Copy Feature (2026-01-16)

Removed automatic copying to allaboutV2 directory from scripts/generate-appendix-html.sh (lines 314-322 removed). The npm run pdf:appendix command no longer attempts to copy generated web files to `/Users/tomcranstoun/Documents/GitHub/allaboutV2/invisible-users` directory. Updated documentation in README.md, CLAUDE.md, and PROJECTSTATE.md to remove mentions of auto-copying behavior. Historical entries in PROJECTSTATE.md preserved for reference (dated 2026-01-13) but feature no longer active.

### Added - Web Audit Suite HTML Validation and Enhanced Meta Tag Scoring (2026-01-16)

Added HTML validation analysis to llmCollector.js checking for patterns that break AI agent parsing and accessibility (unencoded ampersands, redundant ARIA roles, ARIA misuse, non-semantic containers). Enhanced scoring for social media meta tags (+20 points to ESSENTIAL_SERVED: Open Graph +8, Twitter Card +5, completeness +7). Added SEO meta tag scoring (+5 points for robots, keywords, theme-color). Added reading time metadata scoring (+10 points: timeRequired +5, completeness +5 for timeRequired/educationalLevel/inLanguage). Total ESSENTIAL_SERVED category increased from 70 to 105 points maximum. Added htmlValidation object to llmCollector metrics output. Updated scoringWeights.js and llmScorer.js with new scoring calculations. Added permissions to .claude/settings.local.json for HTML validation testing scripts (test-html-validation.js, debug-cheerio.js, test-complex-case.js).

### Added - Back-Cover Generation Check and Profile Picture URL Documentation (2026-01-15)

Enhanced scripts/download-cover-images.js to check for back-cover.png after downloading cover images and display manual generation instructions if missing. back-cover.png must be generated by opening web/back-cover.html in browser and taking a full-page screenshot, saved to illustrations/. Added comprehensive "Illustration Generation Process" sections to CLAUDE.md (main repo and manuscript submodule), README.md (manuscript submodule), and ONBOARDING.md documenting the complete three-step workflow: download cover images → check back-cover.png → convert SVG to PNG. Updated all profile picture URL references to include .png extension (<https://allabout.network/media_126e99d56f06caf788bee715aff92281d2e31a206.png>). Added "Author Profile Resources" section to both CLAUDE.md files documenting profile picture location, format, and usage guidance for web pages and marketing materials. Updated back-cover.html with new profile picture URL. Manuscript submodule commit: 20aae80.

### Added - Cover Image Download Automation and todo.txt Documentation (2026-01-15)

Created scripts/download-cover-images.js to automatically download missing cover images (Profile.png, A4-Cover.png, Kindle-Cover.png) before SVG conversion. Script uses only Node.js built-in modules (fs, https, path) with no external dependencies, handles redirects and network errors gracefully, and safely skips existing files (idempotent operation). Enhanced illustrations:generate npm script to run download script first. Added comprehensive todo.txt usage guidelines to both CLAUDE.md files (main repo and manuscript submodule) explaining that todo.txt is user's personal task list and Claude must never execute tasks autonomously. Fixed all pre-existing markdown linting issues in manuscript CLAUDE.md (MD036, MD032). Submodule commit: 3dc05ff.

### Added - VS Code Workspace Configuration and Developer Onboarding (2026-01-15)

Created comprehensive VS Code workspace configuration for professional development environment. Added `.vscode/settings.json` with ESLint, Markdownlint, and Prettier integration plus auto-format on save. Added `.vscode/extensions.json` defining 24 recommended extensions (ESLint, Markdownlint, Prettier, Claude Code, GitLens, etc.) and marking 100+ unnecessary extensions as unwanted. Added `.vscode/tasks.json` with 15 quick-access tasks for book generation (PDF, Kindle, HTML appendices, illustrations), markdown linting, Web Audit Suite operations, and git workflow. Added `.vscode/launch.json` with 6 debug configurations for Web Audit Suite debugging (with example URL, custom URL input, test debugging). Added `.prettierrc` and `.prettierignore` for consistent code formatting (single quotes, 2-space tabs, 100-char line width). Added `.editorconfig` for cross-editor consistency. Created `ONBOARDING.md` (580 lines) as comprehensive developer onboarding guide covering 5-minute quickstart, repository structure, submodule workflows, common development tasks, VS Code integration, code quality standards, troubleshooting common issues, project principles, and next steps. Created `docs/vscode-extension-cleanup.md` identifying 100+ unnecessary extensions (Java, C#, PHP, Swift, Python, duplicate AI assistants) with performance optimization guidance. Updated README.md with Development Environment section explaining VS Code setup, quick task reference, debugging shortcuts, and extension management. Updated `.gitignore` to allow selective `.vscode/` configuration (commits recommended settings, ignores personal settings). Updated PROJECTSTATE.md documenting development environment setup.

### Changed - PDF Generation Uses Format-Specific Covers (2026-01-15)

Updated PDF generation metadata files to use appropriate cover images: A4 PDF (`npm run pdf:generate`) now uses A4-Cover.png (7.6MB), Kindle PDF (`npm run pdf:kindle`) now uses Kindle-Cover.png (231KB). Added eso-pic package and titlepage configuration to Kindle metadata for proper cover rendering. Submodule commit: 82195fd.

### Added - Commit and Push Command for All Repositories (2026-01-15)

Added `npm run commit-push` command with interactive script ([scripts/commit-and-push-all.sh](scripts/commit-and-push-all.sh)) to handle commits and pushes across both main repository and manuscript submodule. Script ensures proper workflow: commits and pushes submodule first, then updates submodule pointer in main repo. Interactive prompts for commit messages with "tidy" as default when Enter is pressed. Includes comprehensive documentation in CLAUDE.md with example usage.

### Added - Meta Tag Validation Scoring in Web Audit Suite (2026-01-15)

Web Audit Suite includes comprehensive meta tag validation and scoring in LLM suitability analysis. Social media meta tags (Open Graph, Twitter Card) contribute +20 points, SEO meta tags (robots, keywords, theme-color) contribute +5 points, and reading time metadata (timeRequired, educationalLevel, inLanguage) contributes +10 points to the ESSENTIAL_SERVED score. LLMCollector analyzes all meta tag types, scoring weights configure point allocation, LLMScorer calculates scores, and all three LLM reports (general, frontend, backend) include validation columns. Documentation covers Appendix A (Recipe 12 scoring breakdown), META-TAG-ENHANCEMENTS.md (section 11 with Web Audit Suite scoring details), IMPLEMENTATION-SUMMARY.md (scoring contribution summary), FEATURES.md (scoring categories), and README.md (feature list). ESSENTIAL_SERVED category: 105 points maximum.

### Added - Book Preview Page with Webinar Notice (2026-01-14)

Created new web/book.html as book teaser page featuring six chapter highlights with compelling excerpts, time-aware webinar announcement, Schema.org Book structured data, and AI-friendly meta tags. Updated navigation links in index.html, faq.html, and sitemap.xml. Page implements all Chapter 10 technical patterns with blue gradient design matching index.html and mobile responsiveness.

### Changed - Reviewer Notice on For Reviewers Page (2026-01-13)

Added "Review Copy Status" notice to for-reviewers.html informing reviewers that the PDF is frozen for review (except critical bugs). Directs them to news.html for industry updates and clarifies manuscript will be revised before publication.

### Changed - Git Workflow Guide for AI Agents (2026-01-13)

Created comprehensive GIT-README.md to help AI agents safely work with dual-repository structure (main repo + submodule). Addresses issues with agents corrupting git submodule pointers.

### Changed - Escaped HTML Tags in Code Examples (2026-01-13)

Fixed markdown code examples to prevent HTML rendering issues. Replaced literal `<details>` and `<summary>` tags with HTML entities in 6 files.

### Added - Automatic File Copying to Output Directory (2026-01-13)

Enhanced build scripts to automatically copy generated files to allaboutV2 output directory when it exists.

### Fixed - Code Review Issues (2026-01-13)

Fixed CI workflow paths, file count documentation, ESM/CommonJS conversion, regex bugs, and removed backwards compatibility code.

### Removed - Identity Delegation Project References (2026-01-13)

Removed all references to discontinued Identity Delegation Infrastructure Project.

### Changed - WCAG Accessibility Improvements (2026-01-13)

Fixed critical contrast violations in news.html - all UI elements now meet WCAG AA standards.

## Summary by Date

### January 15, 2026 (3 changes)

- PDF generation uses format-specific covers
- Commit and push command for all repositories
- Meta tag validation scoring in Web Audit Suite

### January 14, 2026 (1 change)

- Book preview page with webinar notice

### January 13, 2026 (7 changes)
- Reviewer notice on for-reviewers page
- Git workflow guide for AI agents
- HTML tag escaping
- Automatic file copying
- Code review fixes
- Identity Delegation removal
- WCAG accessibility improvements

### January 12, 2026 (19 changes)
Major repository restructure:
- Web files consolidation (for-reviewers, news, FAQ pages)
- Monorepo structure implementation
- Protocol landscape updates (ACP)
- HTML pattern audit tool
- Appendix L expansion
- CSS/meta tag standardization
- Platform vendor messaging

### January 11, 2026 (7 changes)
- `/news` skill with verification
- Perplexity Comet entry
- ACP additions
- Markdown linting
- Documentation updates

### January 10, 2026 (11 changes)
- Publication status corrections
- Git hooks enhancements
- New appendices (H: llms.txt, I: Darwin case study)
- Schema.org implementation
- FAQ improvements

### January 9, 2026 (8 changes)
- Chapter 9 "The Platform Race" (~5,700 words)
- Reading paths expansion
- Sitemap generation
- llms.txt additions

### January 8, 2026 (4 changes)
- Appendix automation
- HTML enhancement pipeline
- PDF improvements
- Chapter 11 refinements

### January 7, 2026 and earlier (2 changes)
- Chapter 10 restructure (~8,350 words)
- Initial repository setup

---

**For complete details, see [CHANGELOG-FULL.md](CHANGELOG-FULL.md) (108 KB, 1,890 lines)**
