# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Note:** Full detailed changelog with 57 entries archived in [CHANGELOG-FULL.md](CHANGELOG-FULL.md)

## [Unreleased]

### Added - Professional Profile to Sales Enablement Materials (2026-01-17)

Created profile.md in docs/sales-enablement/ combining agent-ready infrastructure expertise with AEM/EDS strategic advisory positioning. Profile aligns with book's convergence principle (what AI agents need is mostly what everyone needs) while maintaining strategic advisor identity. Key elements: clarity infrastructure concept (explicit state, persistent feedback, complete information), agent-ready delivery architecture using Cloudflare edge network and Adobe EDS, strategic advisory services (plan reviews, architecture strategy, AI integration, team mentoring, audits), proven track record (Nissan-Renault 200+ sites, Ford, MediaMonks), industry authority signals (Boye & Company CMS Experts Group member, "The AEM Guy"). Profile positions work as universal design implementation serving both AI agents and humans through identical patterns, references January 2026 agent commerce launches (Amazon, Microsoft, Google) for business urgency context, and connects to Agent Ecosystem standardization efforts. Updated PROJECTSTATE.md to reflect new profile.md in sales enablement materials listing.

### Added - Article Integration: Multilingual Bias, AI Behavior, and RDF History (2026-01-17)

Integrated fresh material from three articles into manuscript (~2,800 words total, manuscript now 85,749 words): **Phase 1 - Multilingual Bias (CMS Summit 2025 article):** Added "The Double Extraction Problem for Non-English Content Creators" subsection to Chapter 5 (~800 words) documenting training data imbalance (44% English in Common Crawl, no other language exceeds 6%), Lars Trieloff and Angelika Gust observations on German language AI proficiency, systemic imbalances (English-centric RLHF, architectural bias in Common Crawl, cultural exclusion where models "think" in English, system-level constraints with English prompts and documentation), institutional contrast (UN 6 languages, EU 24 languages vs AI systems), and solution requirements (representative multilingual training datasets, evaluation frameworks accounting for linguistic diversity, inclusive governance, global human feedback systems). Enhanced Chapter 8 "Language Exclusion" section (~500 words) with concrete training data evidence, explanation of why bias exists and compounds, cross-reference to Chapter 5 double extraction problem. **Phase 2 - AI Behavior Framework (CMS Kickoff 2024 article):** Added eight-year-old analogy ("I WANT A TOY PLESIOSAURS") to Chapter 1 (~150 words) illustrating direct, goal-focused agent behavior that skips brand stories, promotional content, animations. Added AI-as-consumer framework to Chapter 4 (~550 words) with seven problems of AI-generated content (style guide enforcement, brand voice consistency, demographic bias avoidance, cultural nuance handling, training data limitations, incomplete responses, AI regulation navigation), Stack Overflow 28% workforce reduction example, traditional web analytics disruption. Added "AI Evangelist Role" subsection to Chapter 4 (~500 words) describing organizational coordination needs, responsibilities (champion AI adoption across departments, develop AI-centric content strategies, facilitate cross-team integration), skills required, strategic shift to designing for four device types (mobile, tablet, desktop, machine). **Phase 3 - RDF Historical Context (Janus Boye 1998 article):** Added "Historical Perspective: The 27-Year Pattern" subsection to Chapter 10 (~300 words) explaining RDF principles (explicit semantics, machine-readable relationships, standardised vocabularies) from 1998 directly underpin Schema.org structured data, JSON-LD as modern RDF implementation, theme that solution existed since 1998 but commercial pressure arrived with AI agents. Preface historical context section already corrected in previous session. **Additional updates:** geo-blog.md enhanced with eight-year-old analogy and multilingual dimension context (~230 words). Fixed duplicate heading in Chapter 4 (MD024 linting: renamed "Decision Framework" to "Protocol Integration Decision Framework" and "Priority Implementation Decision Framework"). All changes follow British English style, avoid superlatives, integrate naturally without narrative voice. Updated sales enablement documents (executive-summary.md, PITCH.md, book.md, business-plan.md, EXECUTIVE_PITCH_DECK.md, for-adobe.txt) with target audience messaging: book written for business leaders and managers (CEOs, product managers, marketing directors, technical managers like architects and lead developers), no programming knowledge required (code examples can be skipped), technical readers can read backwards (chapters 10-13 first for implementation patterns), convergence principle benefits both audiences. Updated platform launch information to reflect January 2026 launches (Amazon Alexa+, Microsoft Copilot Checkout, Google Universal Commerce Protocol). Added quick diagnostic for agent extraction (compare bounce rates for sessions under 10 seconds). Added first-mover citation advantage explanation (agents cite businesses they've successfully transacted with, successful interactions compound). Manuscript submodule commit: b748097. Main repository commits: 908674e (submodule pointer), a653bfe (sales docs and Web Audit Suite updates).

### Added - Web Audit Suite Schema Type Disambiguation and Inline CSS Detection (2026-01-17)

Added two new collectors to Web Audit Suite implementing Chapter 10 GEO patterns: Schema.org content type disambiguation and inline CSS detection. Schema Type Disambiguation collector validates that each JSON-LD block has exactly ONE @type value (multiple types create ambiguity for AI agents trained on entertainment scripts). Detects violations where blocks contain ["Article", "NewsArticle"] or similar multiple-type arrays. Scoring applies +5 bonus for proper disambiguation, -3 penalty per schema with multiple types. Inline CSS Detection collector identifies inline styles (style= attributes and `<style>` tags) that add noise for CLI agents (Claude Code, Cline) and server-based agents unable to execute JavaScript. Scoring applies +8 bonus for external-only stylesheets, ratio-based penalty (-10 × ratio) for inline styles prevalence. Both collectors integrated across complete three-phase pipeline: Phase 2 data collection (llmCollector.js analyzeSchemaTypeDisambiguation() and analyzeInlineCSS() methods), scoring configuration (scoringWeights.js SCHEMA_TYPE_DISAMBIGUATION and INLINE_CSS weights), score calculation (llmScorer.js calculateServedScore() applies weights), feedback generation (llmFeedback.js getSchemaDisambiguationFeedback() and getInlineCSSFeedback() methods with Chapter 10 references), and CSV reporting (llmReports.js general report adds 8 new columns: Schema Type Disambiguation, Total JSON-LD Schemas, Schemas With Multiple @types, Has Inline Styles, Elements With style= Attribute, `<style>` Tags, External Stylesheets, Inline CSS Ratio). All metrics stored in results.json with importance: ESSENTIAL_SERVED (works for all agents regardless of JavaScript execution capability). Implementation passes ESLint validation with no errors. Updated Appendix C (Web Audit Suite User Guide) with documentation for new columns in LLM General Suitability report, detailed explanations of scoring rules with code examples showing correct vs incorrect Schema.org type usage, inline CSS detection rationale, and two new sections in "Interpreting Specific Issues" covering multiple @type values and high inline CSS ratio with actionable fixes.

### Added - Content Type Disambiguation Guidance to Chapter 10 (2026-01-17)

Added new "Missing Content Type Disambiguation" section to Chapter 10 explaining how AI agents trained on entertainment scripts may confuse professional content with fictional dialogue. Section appears in "Common Implementation Mistakes" after "Incomplete Required Fields" (lines 596-693). Problem: AI systems trained on extensive scripted dialogue from films and TV episodes may treat legal arguments as fictional dialogue, academic papers as creative writing, or business analysis as entertainment scripts without explicit Schema.org type markup. Real examples include legal analysis confused with legal drama dialogue (Ally McBeal reference) and medical analysis misattributed to TV show scripts (Grey's Anatomy reference). Solution: Three complete JSON-LD examples demonstrating precise Schema.org types (legal content with Legislation type, medical/scientific content with MedicalScholarlyArticle type, business analysis with AnalysisNewsArticle type). Comprehensive list of 10 Schema.org types for disambiguation: Legislation, LegalDocument, ScholarlyArticle, MedicalScholarlyArticle, AnalysisNewsArticle, NewsArticle, TechArticle, Movie, TVSeries/TVEpisode, CreativeWork. Broader implication section explains AI training datasets include subtitles from DVDs, Blu-rays, and online streams uploaded to repositories like OpenSubtitles.org. Emphasizes using most specific type available (MedicalScholarlyArticle over Article, Legislation over CreativeWork). Fixed pre-existing markdown linting issues in Chapter 10: added language specification to code block (text), converted bold text emphasis to proper headings (#### level) for three "Issue:" subsections (Nested JSON-LD confusion, Currency symbol interpretation, Date format inconsistency). Manuscript submodule commits: 3e8b919 (content addition), d7f270b (linting fixes).

### Added - VAT Treatment and International Pricing Documentation (2026-01-17)

Updated comprehensive VAT treatment and international pricing documentation across manuscript with correct UK tax law implementation and multi-regional Schema.org patterns. Chapter 10: Added Regional Price Variations section (lines 833-992) demonstrating UK eBook pricing with 20% VAT included (£24.99 = £20.82 base + £4.17 VAT), UK printed book pricing zero-rated at 0% VAT (£34.99 with no VAT component per VAT Act 1994, Schedule 8, Group 3), USA pricing excluding sales tax (eBook $32.99, printed book $44.99), and complete multi-regional offer arrays using Schema.org eligibleRegion property. Enhanced Currency Handling section (lines 747-843) with multi-regional examples showing valueAddedTaxIncluded and eligibleRegion properties for proper international treatment. Appendix D: Replaced Honest Pricing Structure section (lines 1284-1365) with realistic pricing examples showing format-specific breakdowns using data-format, data-region, data-currency, and data-vat attributes for machine-readable pricing. Added complete VAT breakdown details element with separate eBook and paperback pricing structures. geo-blog.md: Updated pricing mismatch example (line 121) to use realistic eBook (£24.99) vs paperback (£34.99) pricing with emphasis on format clarity and eligibleRegion attributes for international treatment. book-product-page.html: Enhanced with international pricing section showing USA customers (eBook $32.99, paperback $44.99) and discovery precedes commerce principle documentation. Manuscript submodule commit: dc43402.

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
