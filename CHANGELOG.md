# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed - Content Duplication Resolution (2026-01-10)

**Manuscript Structure Reorganization:**

- **New reading-guide.md file created:**
  - Extracted all navigation guidance from Preface into dedicated file
  - 148 lines of comprehensive reading paths for 5 audience types
  - Business Leaders, Product Managers/Designers, Developers, Agent System Developers, Small Business Owners
  - Includes "Other Navigation Aids" section with glossary and sequential reading guidance
- **Preface.md condensed:**
  - Reduced from 238 to 103 lines (135 lines removed)
  - Removed entire "How to Navigate This Book" section → moved to reading-guide.md
  - Condensed platform launch details (Claude for Chrome, Copilot Checkout) to single sentence
  - Replaced with brief reference: "For reading paths tailored to your role and time constraints, see the Reading Guide"
  - Kept: personal discovery story, "What This Book Is/Isn't", audience description, author bio, acknowledgements
- **Chapter 1 cross-references updated:**
  - Changed reference from "navigation guide in the Preface (page X)" to "see the Reading Guide"
  - Removed "14 paginated screens" specific detail from accessibility example
  - Added forward reference to Preface for discovery story
  - 221 lines (minimal change from 222)
- **Executive Summary verified clean:**
  - No duplication found (already clean from previous work)
  - No changes needed
- **Documentation updates:**
  - Added reading-guide.md to book-plan.md Front Matter table
  - Added reading-guide.md to repository structure diagram
  - All cross-references functional and tested

**Results:**
- All content preserved and relocated appropriately
- Clear purpose boundaries established between files
- Markdown linting passes for all modified files
- Total reduction: 135 lines removed through consolidation

**Commits:**
- 88197ad "Resolve content duplication across Preface, Executive Summary, and Chapter 1" (submodule)
- fa4809a "Update book-plan.md to include reading-guide.md"
- 4f12883 "Update manuscript submodule to latest version"

### Added - News Skill Ecosystem Signals and Documentation (2026-01-10)

**News Skill Enhancement and Documentation Quality:**

- **News skill scope expansion:**
  - Updated `/news` skill to understand book's broader scope includes ecosystem maturity signals
  - Enhanced `.claude/skills/news/relevance-checklist.md` with ecosystem signal examples throughout all 5 criteria
  - Added "Understanding the Book's Scope" section to `.claude/skills/news/skill.md`
  - Added Scenario 6 example: Stack Overflow decline as qualifying ecosystem maturity signal
  - Clarified two types of qualifying news: (1) Direct agent-website patterns, (2) Ecosystem maturity signals
  - Key insight: Developers experiencing AI-mediated workflows creates urgency for website owners
- **Manuscript updates:**
  - Added Stack Overflow 76% decline entry to blog and Appendix J (developers shifting to AI tools)
  - Blog entry: Narrative style focused on developers experiencing the shift they're designing for
  - Appendix J entry: Technical 12-section analysis validating Chapter 1 urgency, Chapter 8 capability gaps, 2-year timeline
  - Demonstrates adoption velocity creating indirect commercial pressure
- **Documentation quality improvements:**
  - Fixed CHANGELOG.md duplicate heading errors (MD024: "Added - 2026-01-10" appeared twice)
  - Changed to unique headings with context: "Publication Status and Documentation" and "Web Pages and HTML Enhancement Pipeline"
  - Added duplicate heading guidance to LEARNINGS.md (MD024 cannot be disabled, must fix by adding context)
  - Enhanced CLAUDE.md markdown linting section with MD024 guidance and concrete examples
  - Created `.claude/pwd-reminder.md` for working directory reference
  - Added `.claude/hooks/pre-tool-use.sh` for pwd checking reminders
  - Enhanced CLAUDE.md with prominent pwd checking warning box at top
  - Enhanced LEARNINGS.md with "CRITICAL AVOIDANCE TACTIC" section for pwd checking

**Commits:**

- 96691da "Update /news skill to include ecosystem maturity signals and fix duplicate headings"
- c7dab97 "Add Stack Overflow usage decline as ecosystem maturity signal" (submodule)
- 49c1801 "Update manuscript submodule (Stack Overflow ecosystem signal entry)"
- 2024192 "Fix markdown linting error in LEARNINGS.md (MD032)"

### Added - Publication Status and Documentation (2026-01-10)

**Publication Status and Documentation Improvements:**

- **Publication status clarification:**
  - Added explicit "Publication Status" sections to CLAUDE.md (main and manuscript)
  - Status: "IN REVIEW (Pre-Publication)"
  - Clearly states publication date as "Due Q1 2026"
  - Prevents AI assistants from assuming published status based on current date
  - User will explicitly confirm when published
- **Git directory navigation guidance:**
  - Added "Git Directory Navigation: Always Check pwd First" rule to LEARNINGS.md
  - Added "Common Mistakes to Avoid" section to README.md with git navigation guidance
  - Added "Git Directory Navigation" sections to CLAUDE.md (main and manuscript)
  - Documents the submodule navigation issue: always check `pwd` before attempting directory changes
  - Prevents "No such file or directory" errors when already inside submodule
- **News propagation strategy:**
  - Updated `/news` skill documentation with "Publication Status and Propagation Strategy"
  - Pre-publication: News updates propagate to manuscript files (blog/book-updates.md, appendix-j-industry-developments.md)
  - Post-publication: News updates propagate to online appendices only (via `npm run pdf:appendix`)
  - Ensures online appendices remain current without requiring book republication

**Commits:**

- fa9d5fb "Add publication status, propagation strategy, and git navigation guidance"
- ae3a4b8 "Fix markdown linting errors in CLAUDE.md"

### Added - Web Pages and HTML Enhancement Pipeline (2026-01-10)

**Web Pages and Appendix HTML Enhancement Pipeline:**

- **Project web pages created:**
  - `web/identity-layer.html` - Universal Identity Delegation Infrastructure project landing page with roadmap, technical details, collaboration opportunities
  - `web/news.html` - Project news and updates page with book announcement and identity delegation project roadmap
  - Both pages follow Chapter 10 technical patterns (British English, AI-specific meta tags, Schema.org JSON-LD, semantic HTML with ARIA roles)
  - Book website URL established: <https://allabout.network/invisible-users>
- **Appendix HTML enhancement pipeline:**
  - Created `scripts/enhance-appendix-html.js` (Node.js post-processor, ~140 lines) to add Chapter 10 patterns to Pandoc HTML
  - Updated `scripts/generate-appendix-html.sh` to call enhancement script after Pandoc conversion
  - Created `scripts/README-appendix-enhancements.md` documenting pipeline flow, usage, testing
  - Enhancement adds: AI-specific meta tags (ai-preferred-access, ai-content-policy, ai-freshness, ai-structured-data, ai-attribution), Schema.org JSON-LD (TechArticle, CollectionPage types), semantic HTML roles (role="main", role="navigation", role="contentinfo"), British English lang attributes (en-GB)
  - Pipeline is idempotent - can be run multiple times safely
  - Aligns with Chapter 10 technical patterns (lines 1186-1214 for AI meta tags, lines 541-564 for Schema.org)
- **Documentation updates:**
  - CLAUDE.md: Added web/ directory to repository structure, documented HTML appendix enhancement
  - README.md: Added "Project Web Pages" section with links and descriptions
  - PROJECTSTATE.md: Added web pages and HTML enhancement pipeline sections
- **Code examples updated:**
  - identity-delegation-worker.js and identity-delegation-README.md updated with correct book website URLs

**Commits:**

- 264af97 "Add Chapter 10 patterns to appendix HTML generation pipeline"
- b17c8c2 "Fix markdown linting issues in appendix enhancements README"
- d37ddb7 "Update documentation for web pages and appendix HTML enhancements"
- fff32bc "Update project state with web pages and appendix enhancement pipeline"

### Changed - 2026-01-10

**Book Restructured: Appendices Published Separately Online:**

- **Book structure change:** Book now ends with The-End.md directing readers to online appendices at <https://allabout.network/invisible-users/web/>
  - Core manuscript: ~57,000 words (preface + 11 chapters + The End + Glossary)
  - Web appendices: ~27,400 words (10 appendices: A-J) published separately online
  - Rationale: Fast-moving field requires appendices remain current; online publication allows updates without republishing book
- **HTML generation infrastructure added:**
  - Created `npm run pdf:appendix` command for generating HTML appendices
  - Added `scripts/generate-appendix-html.sh` bash script using Pandoc
  - Generates 12 files: index.html, llms.txt, and appendix-{a-j}.html
  - Each appendix page includes: navigation footer, TOC (2 levels), responsive design, semantic HTML
  - Added .gitignore entries for temporary template files (appendix-nav-footer.html, appendix-index-template.md)
- **PDF generation commands updated:**
  - All PDF commands (pdf:html, pdf:generate, pdf:kindle, pdf:simple) now exclude appendices
  - All commands now include The-End.md as final chapter
- **Manuscript updates (submodule commit 40a3c95):**
  - Added The-End.md: Final page with appendix descriptions, online URL, contact info, copyright
  - Added web/ directory with 12 generated HTML files
  - Updated chapter references: Chapters 4, 9, 10 now link to online Appendix J URLs
  - Updated blog files: blog.md, book-updates.md, agent-ecosystem-acceleration.md with online appendix references
- **Documentation updates:**
  - book-plan.md: Complete restructure showing web appendices section, updated word counts
  - CLAUDE.md: Added pdf:appendix command documentation
  - README.md: Added web appendices section with generation instructions
  - llms.txt: Added web appendices section with links to all 10 online pages
  - PROJECTSTATE.md: Updated to version 2.8.0 with new structure
- **Sales enablement updates:**
  - Updated word counts from "65,500-69,300" to "~57,000 core + 10 appendices online" across:
    - business-plan.md, PITCH.md (expanded to show all 10 appendices), executive-summary.md
    - plan-to-market.md, reviewer-email.md (all 4 email versions), new-blog.md
- **Consistency verification:** Ensured all references updated across book, tools, and documentation

**Commits:**

- Main repository: 659e1df "Restructure book to publish appendices separately online"
- Manuscript submodule: 40a3c95 "Add The-End.md and web appendices; update chapter references"
- Main repository: 4b2d154 "Update manuscript submodule to latest version with The-End.md and web appendices"
- Main repository: 24e499b "Fix markdown linting: wrap bare URLs in angle brackets"
- Main repository: 174b54d "Update PROJECTSTATE.md and remaining word count references"

### Changed - 2026-01-09 (Very Late Night)

**Platform Claims Qualified + /news Skill Documentation:**

- **Qualified Google/Apple platform claims as expectations:** Changed all references from stating as verified fact ("Google and Apple building their own walled gardens") to qualifying as expected ("Google and Apple expected to build their own walled gardens"). Distinguishes between:
  - **Verified platforms:** Microsoft Copilot Checkout, Amazon Alexa+ (documented launches with dates and features)
  - **Expected platforms:** Google, Apple (logical inference but not yet verified)
- **Console capability corrections:** Updated from definitive "agents don't read console" to accurate "you cannot assume agents can read console" whilst noting Claude for Chrome CAN read console output but many agents cannot
- **Sales materials updated:**
  - EXECUTIVE_PITCH_DECK.md: Qualified platform claims, added multi-platform testing requirement
  - executive-summary.md: Added proprietary lock-in context with verified/expected distinction
  - PITCH.md: Fixed bare URL markdown linting issue
- **Manuscript submodule updated** (bed5610): Applied same platform claim qualifications and console capability corrections across 9 files (appendix-j, blog files, chapters 2-4, 9-10, preface)
- **CLAUDE.md documentation:** Added comprehensive /news skill documentation with usage guide, examples, verification workflow, and relevance criteria
- **/.claude/skills/news/ added:** Complete skill implementation files (skill.md, verification-guidelines.md, relevance-checklist.md, templates/)
- **PROJECTSTATE.md updated:** Corrected Claude Code configuration location, documented three custom skills, updated latest additions

**Rationale:**

User correctly identified that stating "Google and Apple building their own walled gardens" was unverified speculation. Platforms verified as building proprietary systems: Microsoft (Copilot Checkout, January 2026), Amazon (Alexa+, January 2026), Anthropic (Claude for Chrome session inheritance, August-December 2025). Google and Apple have logical incentive to follow but no verified launches yet.

Console capability correction addresses that some agents (Claude for Chrome) CAN read browser console whilst many cannot, requiring conditional language rather than definitive statements.

**Commits:**

- Manuscript submodule: bed5610 "Qualify Google/Apple walled garden claims as expectations"
- Parent repository: 96e9de9 "Qualify Google/Apple claims and document /news skill"
- Parent repository: ab6e697 "Fix markdown linting issues"
- Parent repository: cafb74d "Update PROJECTSTATE.md with latest changes"

### Added - 2026-01-09 (Late Night)

**Identity Layer and Agent Limitations Content:**

- Added "The Missing Identity Layer" section to Chapter 11 (~1,200 words, lines 693-794)
  - Explains why universal identity delegation layer is missing from AI agent ecosystem
  - Documents platform strategy: first-mover advantage through proprietary identity systems
  - Practical architecture guidance: support proprietary systems today whilst preparing for eventual standards
  - Code examples: Universal identity layer interface and abstraction pattern for agent creators
  - OAuth 2.0 delegation extension as standard specification reference
- Added agent limitation content distributed across four chapters (~800 words total):
  - **Chapter 4:** "The Location Detection Challenge" section - VPN/proxy implications for geolocation, fraud detection, pricing strategies
  - **Chapter 6:** "The System Prompt Illusion" section - Why hidden guardrails are necessary but insufficient, validation layers needed
  - **Chapter 9:** Professional responsibility paragraph - Clear obligation for designers/developers/product owners/executives
  - **Chapter 11:** Hallucinations paragraph in conclusion - Inherent characteristic of probabilistic systems, validation layers catch errors
- Updated blog post (agent-ecosystem-acceleration.md):
  - Added "VPNs and Hidden Guardrails" section
  - Added system prompts paragraph explaining limitations
- Updated presentation slides (talks/members-call/talk-slides.js):
  - Added "VPNs and Hidden Guardrails" slide
  - Added "Our Responsibility" slide

**Context:**

Platforms are racing to establish proprietary identity delegation systems before standards emerge, creating first-mover advantages through platform lock-in. When Microsoft establishes Copilot as the identity layer for e-commerce, or Apple builds agent authorization into their ecosystem, users face switching costs to move between competing agents. Agent creators need abstraction layers that support proprietary systems today whilst preparing for eventual open standards.

System prompts and guardrails exist in all agents but work at reasoning level, not data extraction. The £203,000 cruise pricing error occurred despite whatever guardrails the agent operated under. Validation layers (range checking, comparative analysis, cross-referencing) must be implemented as code, not just natural language instructions.

Browser extensions and smart AI browsers inherit user network configuration (VPNs, corporate proxies), making IP-based location detection unreliable. This affects fraud detection, pricing strategies, content delivery, and compliance requirements.

**Commits:**

- Manuscript submodule: 1320186 "Add identity layer section to Chapter 11"
- Manuscript submodule: 5e660a6 "Add VPN, system prompts, hallucinations, and responsibility content"
- Parent repository: Updated submodule pointers (319a697, 1136fd5)

### Added - 2026-01-09 (Night)

**Appendix J: Industry Developments - Major AI Agent Launches:**

- Added Appendix J: Industry Developments (~3,800 words) tracking major AI agent developments
  - **Claude for Chrome (20 December 2024):** Browser extension for complete web automation, available to all paid Claude subscribers. Particularly significant because it was used in the book's case studies whilst being written. Demonstrates session inheritance problem, prompt injection risks, makes agent detection nearly impossible.
  - **Microsoft Copilot Checkout (January 2025):** Complete purchase transactions within AI assistant. Partner retailers: Urban Outfitters, Anthropologie, Etsy, Shopify. Microsoft reports improved conversion rates (unvalidated by independent research).
- Created blog post: "Two Weeks That Changed Everything" (~2,700 words)
  - Covers both launches as ecosystem tipping point
  - Browser automation + commerce integration = mainstream adoption
  - Practical action steps, security reality, timeline acceleration
- Updated manuscript chapters with real-world validation:
  - **Chapter 4:** Added "Real-World Validation: Microsoft Copilot Checkout" subsection (~300 words) after e-commerce section
  - **Chapter 9:** Added production validation paragraph referencing both launches (~150 words)
  - **Chapter 10:** Added real-world context introduction about both implementations (~100 words)
- Updated documentation:
  - Updated book-plan.md: Added Appendix J entry, updated word counts (~69,300 total)
  - Updated status: "Complete with Phase 1-2 Enhancements + Chapter 11 + Industry Developments"

**Context:**

These two launches within weeks validate the book's core thesis with production implementations. Claude for Chrome validates security concerns (session inheritance, prompt injection, agent detection challenges). Microsoft Copilot Checkout validates business model predictions (platform power shift, identity preservation). Together they demonstrate agent-mediated commerce and browser automation are happening now, not in the future.

**Metrics Removal (same day):** Removed all unvalidated Microsoft metrics (2x, 53%, 7x) from manuscript per CLAUDE.md guidelines. Replaced with "Microsoft reports improved conversion rates (though unvalidated)" and verifiable facts only. Even real company announcements feel like marketing hype without independent validation.

**Significance:** Claude for Chrome was used in the manuscript's case studies whilst the book was being written, making it especially relevant to the narrative. The tool demonstrates the exact patterns and challenges discussed throughout the manuscript because it encounters them in production, right now.

### Changed - 2026-01-09 (Late Evening)

**Manuscript Repository Organization:**

- Consolidated all manuscript-related content in manuscript submodule
  - Moved blog materials (blog.md, blog.svg, AI-Native.blog) from docs/ to manuscript/blog/
  - Moved presentation materials (talk.md, talk1.md, talk-slides.js) from docs/sales-enablement/ to manuscript/talks/members-call/
  - Code examples (agent-friendly-starter-kit/, code-examples/) already in manuscript from earlier consolidation
- Added Claude Code configuration to manuscript repository
  - Created .claude/ directory with hooks, commands, skills, and settings
  - Adapted hooks for submodule context (no package.json in manuscript)
  - pre-commit.sh lists staged markdown files
  - pre-push.sh warns about uncommitted changes and reminds to update parent submodule pointer
  - post-tool-use.sh reminds to update parent after git push
  - settings.local.json pre-approves git operations and file inspection commands
- Created comprehensive documentation in manuscript repository
  - README.md: Complete repository overview, structure, content summary, submodule workflow, key themes
  - CLAUDE.md: AI assistant guidance with file listings (word counts), writing style guidelines, terminology standards, .claude documentation
- Updated main repository documentation for manuscript organization
  - Updated llms.txt with explicit code-examples link
  - Updated CLAUDE.md repository structure to show blog/ and talks/ in submodule
  - Updated book-plan.md structure diagrams
  - Updated AI-Native.blog with 15 path references to manuscript/code-examples/
  - Updated PROJECTSTATE.md to reflect manuscript organization and moved files
- Benefits: All manuscript-related content now in single repository, clearer separation of manuscript vs. business materials

### Changed - 2026-01-09 (Evening)

**Repository Structure - Manuscript Submodule Integration:**

- Moved manuscript to separate repository and integrated as git submodule
  - Created new repository: <https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript>
  - Added as submodule at `invisible-users/manuscript/` path
  - Configured to track main branch for easy updates
  - All 50 manuscript files (chapters, appendices, illustrations, metadata) now managed independently
- Updated documentation for submodule workflow
  - Added "Working with the Manuscript Submodule" section to README.md
  - Added "Working with Submodules" section to CLAUDE.md
  - Updated repository structure diagrams to show submodule
  - Documented initialization: `git submodule update --init --recursive`
  - Documented updates: `git submodule update --remote invisible-users/manuscript`
- Updated CI/CD workflows to support submodules
  - Added `submodules: recursive` to checkout actions in ci.yml and quality-gate.yml
  - Excluded manuscript submodule from markdown linting (handled in manuscript repo)
  - Updated package.json lint scripts: `--ignore invisible-users/manuscript`
  - Made manuscript repository public for GitHub Actions access
  - Disabled quality-gate workflow on push events (now only runs on PRs and manual dispatch)
- Updated PROJECTSTATE.md with repository structure details
- All npm scripts continue to work unchanged (wordcount, pdf generation, status, illustrations)
- Benefits: Independent manuscript versioning, cleaner separation of concerns, standard git workflow

### Changed - 2026-01-09 (Afternoon)

**Manuscript Content Improvements:**

- Reduced content duplication across Preface, Chapter 1, and Executive Summary
  - Streamlined chapter descriptions in Preface to avoid repeating Chapter 1 content
  - Added cross-references directing readers to detailed content locations
  - Added "14-day tour" detail to tour operator story for consistency with Executive Summary
  - Added reference from Preface to Chapter 1's accessibility connection section
  - Added reference from Chapter 1 to Chapter 4 for business timing implications
- Improved document navigation with explicit pointers between related sections

**Web Audit Suite Code Quality:**

- Fixed ESLint errors across codebase (24 errors resolved, 0 remaining)
  - Fixed default-param-last errors by moving context parameter before optional parameters
  - Updated function signatures in 11 files: caching.js, networkUtils.js, pageAnalyzer.js, rateLimiter.js, sitemap.js, dashboardGenerator.js, executiveSummary.js
  - Updated all function call sites to match new parameter order
  - Removed unused variables: loggerOptions in main.js, duplicate performanceMetrics key in caching.js
  - Prefixed unused context parameters with underscore in metricsUpdater.js (9 functions)
  - Fixed undefined context reference in dashboardGenerator.js
- Updated test files to match refactored function signatures
  - Fixed parameter order in sitemap.test.js (3 test cases)
  - Added eslint-disable comments for Mocha test patterns (beforeEach, describe)
  - Marked intentionally unused test variables in pipeline.test.js
- All linting now passes: ESLint 0 errors, markdownlint 0 errors
- All tests passing: 22/22 tests

### Added - 2026-01-09

**A4 PDF Review Footer:**

- Added review copy footer to A4 PDF format (`pdf:generate`)
  - Footer text: "Review Copy not for publication/distribution" on every page
  - Centered footer in italic, small font
  - Page numbers on outer margins (left on even pages, right on odd pages)
  - Uses fancyhdr LaTeX package for custom page styling
  - Kindle PDF (`pdf:kindle`) remains without footer for production use

**Kindle PDF Generation:**

- Added `npm run pdf:kindle` command for Kindle Direct Publishing (KDP) paperback format
  - 6" × 9" (152.4 × 228.6 mm) trade paperback trim size
  - KDP-compliant margins: inner 0.625", outer 0.5", top/bottom 0.625"
  - Print-friendly styling: black links (not blue), chapters start on right pages
  - Simplified title page (no embedded cover - KDP requires separate cover file)
- Created `metadata-kindle.yaml` with KDP-specific LaTeX configuration
  - Removed eso-pic package (no full-page background image)
  - Updated code block arrow color to black for print compatibility
  - Uses openright class option for proper chapter pagination
- Updated documentation:
  - CLAUDE.md: Added pdf:kindle to Book Manuscript Commands section
  - README.md: Added pdf:kindle to PDF generation options with KDP cover creation instructions
  - .gitignore: Excluded the-invisible-users-kindle.pdf from version control

### Added - 2026-01-08 (Evening)

**Sales Enablement: 20-Minute Talk Materials:**

- Created comprehensive talk.md (11k) - Complete 20-minute presentation script
  - Opening hook: £203,000 cruise pricing error case study (from Appendix I)
  - Real production mistakes: toast notifications, hidden checkout state (from Appendix B)
  - Three implementation patterns with code samples (from Appendix A):
    - Pattern #1: Persistent error messages
    - Pattern #2: Complete pricing display
    - Pattern #3: Explicit state attributes
  - Priority-based action roadmap (Priority 1-3)
  - Discussion prompts for audience engagement
  - Speaker notes for timing and adaptation
  - Tailored for business leaders (CTOs, product owners)
  - Follows marketing guidelines (no specific monetary/time claims)
  - British English throughout
- Created talk-slides.js - Google Apps Script to generate presentation
  - 19 slides optimized for 20-minute delivery (~63 seconds per slide)
  - Removed "Breaking the Baseline", discussion interstitials, and priority framework slides per user feedback
  - Integrated business value directly into pattern slides (no separate slides)
  - Code examples with clear ROI implications
  - Sections: Opening Hook (2 slides), Problem (3 slides), Why (2 slides), Solution (6 slides), Action (3 slides), Closing (2 slides)
  - Run createInvisibleUsersDeck() in Google Apps Script to generate full deck
- Added talk1.md - Original outline for reference (1.9k)
- Updated PROJECTSTATE.md to document new sales enablement materials

### Changed - 2026-01-08 (Morning)

**PDF Generation Improvements and Appendix H Refinement:**

- Refined appendix-h-live-llms.txt from 91 links to 20 curated links (78% reduction)
  - Kept only the most representative resources from each category
  - Reduced Developer Documentation from 13 to 4 key links
  - Consolidated EDS & Integrations from 20 to 4 links
  - Reduced Core AI/LLM Topics from 18 to 5 key articles
  - Reduced AI Development Tools & Practices from 20 to 3 links
  - Reduced AEM/CMS Resources from 6 to 2 links
  - Reduced Content Author Resources from 3 to 2 links
  - Updated version to 2.0 (January 2026)
  - Restored full "For Human Visitors" section with all 5 contact links
  - Retained essential metadata (Site Type, Purpose, Technology Stack)
- Created appendix-h-live-llms.md wrapper file to display llms.txt as code example in PDF
  - Provides introduction text explaining the example
  - Wraps .txt content in markdown code block for proper formatting
  - Allows PDF to show "here's what an llms.txt file looks like" as formatted example
- Created metadata.yaml for PDF generation configuration
  - Added cover image (cover-design.png) as first page using eso-pic package
  - Configured title page with title, subtitle, author, date
  - Added listings package for code block line wrapping
  - Configured line breaking with red arrow indicators for long lines
- Fixed PNG illustration format for XeLaTeX compatibility
  - Updated illustrations:generate script in package.json
  - Added ImageMagick parameters: -alpha remove -alpha off -depth 8
  - Converts PNG from 16-bit RGBA to 8-bit RGB format
  - Resolves XeLaTeX rendering issues with 16-bit PNG files
- Suppressed Glossary from table of contents
  - Added {.unnumbered .unlisted} pandoc attributes to Glossary heading
  - Added \addtocontents{toc}{\protect\setcounter{tocdepth}{0}} to suppress subsections
  - Keeps Glossary in PDF but excludes from TOC completely
- Updated package.json PDF generation commands
  - pdf:generate now uses metadata.yaml for title page and cover configuration
  - Excludes appendix-*.txt files (uses appendix-*.md instead)
  - Added --listings flag for enhanced code formatting
- Documented Appendix H dual-file structure
  - Updated README.md with explanation of .txt (source) and .md (wrapper) files
  - Updated CLAUDE.md with detailed explanation of why both files are needed
  - Clarified that .txt is source of truth, .md is PDF presentation wrapper

### Changed - 2026-01-07 (Late Evening)

**Time-Based Estimates Removed Across Documentation:**

- Systematically removed all time-based implementation estimates (hours, days, weeks, months) from documentation across 9 files
- Replaced specific time estimates with qualitative descriptions to avoid misleading claims (implementation time varies by site size and complexity)
- Book manuscript updates:
  - executive-summary.md: Removed time estimates from Priority headers (1-2 hours, days to weeks, months) and reading path guidance (3-4 hours → "Focused reading", etc.)
  - preface.md: Updated all reading path time estimates to qualitative descriptions (Expected time: 3-4 hours → Reading approach: Focused reading)
  - chapter-09-designing-for-both.md: Changed narrative time references (A few hours → Minimal, A developer-week or two → Moderate development work)
  - chapter-11-what-agent-creators-must-build.md: Replaced implementation time examples with scope descriptions (2-3 days → Quick prototype, 1-2 weeks → Core feature)
- Marketing materials updates:
  - docs/blog.md: Removed time claims about research savings and implementation effort
  - docs/sales-enablement/ROI_CASE_STUDIES.md: Changed "2 developer days" to "minimal development effort", "within 2 weeks" to "quickly after implementation"
  - docs/sales-enablement/reviews.md: Removed time duration claims (6 months, weeks, months)
  - docs/sales-enablement/reviewer-email.md: Replaced specific review time estimates with flexible language (2-3 hours → focused reading, 7-10 days → reasonable period)
- Tool documentation updates:
  - web-audit-suite/BLOG.md: Changed implementation time estimates to effort levels (1-2 hours → Minimal effort, 1-2 days → Moderate work, 1-2 weeks → Significant refactoring)
  - Removed "48 hours" delivery promise from contact section
- Rationale: Per CLAUDE.md guidelines, time estimates are misleading because implementation varies by site size, organizational context, and complexity
- Total: 36 time-based references removed/replaced across core documentation, marketing, and tool docs
- Business planning updates (additional 3 files):
  - docs/sales-enablement/executive-summary.md: Partnership timelines converted to phase-based language (Early profitability target → Early/Growth/Maturity phases), Success Metrics restructured, removed response time commitments (within 24 hours, within 30 days)
  - docs/sales-enablement/plan-to-market.md: Changed "within 3 weeks" delivery to comprehensive delivery, "< 1 hour implementation" to minimal effort (preserved operational sales cadences for process timing)
  - docs/sales-enablement/business-plan.md: Changed "2-3 week turnaround" to comprehensive timeframe for audit delivery
- **Final total: 47 time-based references removed/replaced across 12 files**
- All markdown linting passes

### Added - 2026-01-07 (Evening)

**Executive Summary Decision Tree Illustration:**

- Created professional SVG flowchart for agent compatibility assessment decision tree
- Visual diagram shows five-question decision path with YES/NO arrows
- Color-coded priority outcomes: LOW (green), MEDIUM (yellow), HIGH (red), CRITICAL (deep red)
- Replaced text-based decision tree in executive-summary.md with illustration reference
- Added usage instructions explaining how to follow the decision path
- Follows book illustration style guidelines (900x600 viewbox, white background, clear visual hierarchy)
- Updated illustration count from 11 to 13 (11 chapters + cover design + decision tree)
- Updated PITCH.md and PROJECTSTATE.md with accurate illustration inventory

### Changed - 2026-01-07 (Late PM)

**Marketing Materials Policy Documentation:**

- CLAUDE.md: Added "Marketing Materials Guidelines" section documenting policy against fixed costs, concrete percentages, and time commitments in marketing materials
- Rationale: Field too new for validated ROI data; every site is different
- Guidelines include what to avoid (£500, 67%, "2-3 weeks") and what to use instead (qualitative language, phase-based progression)
- All marketing materials previously updated to comply with this policy
- appendix-live-llms.txt: Enhanced with access guidelines, rate limits, attribution requirements, and author metadata

### Added - 2026-01-07 (PM)

**Agent System Developers as Fourth Primary Audience:**

- Updated manuscript to explicitly include Agent System Developers as distinct fourth audience alongside Web Professionals, Business Leaders, and Partners/Investors
- Executive Summary: Added Agent System Developers to "Navigate This Book" section with recommended reading path (Chapter 11 core focus, Chapters 2-3 for failure modes, Chapter 10 for website patterns, 2-3 hours)
- Preface: Updated "Who This Book Is For" from three to four audiences
- Preface: Created comprehensive "Reading Path for Agent System Developers" section highlighting Chapter 11 and Appendix I (£203k case study) as essential resources
- Blog: Updated audience section and chapter list to reflect 11 chapters and four audiences
- PITCH.md: Updated target audience from three to four segments
- reviews.md: Added comprehensive Agent System Developers persona review with technical reactions and suggested improvements
- README.md: Updated repository audience description to include Agent System Developers
- PROJECTSTATE.md: Updated to reflect v2.6.0, 11 chapters, 9 appendices, and four target audiences
- Focus: Chapter 11's validation frameworks, confidence scoring patterns, and guardrails are specifically designed for developers building AI agents and browser extensions

### Added - 2026-01-07 (AM)

**Chapter 11: What Agent Creators Must Build (~5,000 words):**

- New chapter completing the solutions arc by addressing agent creator responsibilities
- Establishes "Pipeline Failures" as seventh failure category (distinct from website design failures and reasoning failures)
- Detailed case study: £203,000 cruise pricing error showing data extraction/parsing failure
- Five specific guardrails with JavaScript code examples:
  - Multi-source verification
  - Audit trails for debugging
  - Comparative context and outlier detection
  - Graceful degradation patterns
  - Human-in-the-loop options
- Confidence scoring framework (0-100%) with action-dependent thresholds
- Validation layers: range validation, comparative analysis, incomplete data detection, structured data cross-reference
- Incomplete data detection pattern: validates data completeness when gathering comparative information (e.g., pricing for only 1 of 3 operators should reduce confidence)
- Agent architecture considerations: browser extensions, CLI agents, server-based agents
- Priority-based validation roadmap (4 priority levels)
- Chapter 11 SVG illustration: "The Validation Pipeline" showing multi-gate validation checkpoint
- Cross-references added in Chapters 1, 2, 9, 10
- Updated preface navigation paths for all reader types
- Updated book-plan.md with Chapter 11 outline and word counts
- Core manuscript now ~57,000 words (was ~52,000)
- With appendices: ~65,500 words total (was ~58,000)

**Appendix I: Pipeline Failure Case Study (~2,500 words):**

- Moved ai-error-analysis.md into manuscript as formal appendix
- Complete analysis of £203,000 cruise pricing error (six-stage error chain)
- Source attribution: Claude for Chrome (early beta version) error from December 2024
- Anonymized operator names (Saga Cruises, Uniworld River Cruises, Viking River Cruises)
- Actual agent output showing incomplete data pattern (pricing for 1 of 3 operators)
- Four failure scenarios: decimal separator confusion, number concatenation, wrong field extraction, HTML/CSS parsing error
- Prevention strategies with JavaScript code examples for AI systems
- Technical root cause analysis of number parsing in LLMs
- Seven lessons learned about data pipeline failures vs reasoning failures
- Critical teaching point: Incomplete data itself is a warning sign (integrated into Chapter 11)
- Cross-referenced with Chapter 11 validation framework
- Original file preserved as ai-error-analysis.md.original

**Web Audit Suite Improvements:**

- **Golden Master Test:** Added `test/goldenMaster.test.js` to ensure regression protection across the full audit pipeline.
- **Dependency Injection:** Implemented `AuditContext` pattern to replace global state.

**New Appendix H:**

- **appendix-live-llms.txt:** Added comprehensive Digital Domain Technologies (DDT) reference document for LLM context delivery. Contains author bio, Adobe EDS consulting resources, AI integration topics, and contact information. Formatted with proper markdown spacing for optimal LLM parsing.
- Integrated as Appendix H in manuscript structure
- Updated documentation: book-plan.md, CLAUDE.md, PROJECTSTATE.md
- Total appendices now: 8 (A-H)

### Changed - 2026-01-07

**Web Audit Suite Refactoring:**

- **Removed Global State:** Eliminated `global.auditcore` in favor of passing explicit `context` objects.
- **Updated Core Utilities:** Refactored `caching.js`, `networkUtils.js`, `seoScoring.js`, `sitemapUtils.js`, and `results.js` to accept `context`.
- **Main Entry Point:** Updated `index.js`, `main.js`, and `bulk-audit.js` to initialize and propagate `AuditContext`.

### Changed - 2026-01-22 (January 2026 AI Landscape Updates)

**Updated manuscript for current AI agent landscape:**

- **Appendix G (Resource Directory):**
  - Updated AI platforms: ChatGPT (GPT-5/o-series, native SearchGPT), Claude (Computer Use emphasis, Chrome extension), Gemini (2.0/Ultra)
  - Updated emerging standards: llms.txt (de facto standard), DPoP (recommended practice for high-security delegations)
  - Updated WCAG 3.0 to Provisional status with score-based conformance model
  - Added Agent-Specific Testing section: Agent Protocol, LangSmith, LangFuse
  - Updated EU AI Act to final legislation status (implementation phase 2026)
  - Added JSON-LD 1.1 specification notes
  - Added Baseline to Can I Use section for cross-browser support tracking
  - Added caveat to Amazon example about bot-blocking and WAF protection
  - Removed redundant headings, fixed duplicate GitHub headings with contextual prefixes
  - Updated verification date to 2026-01-22
- **Executive Summary:**
  - Added browser extension context (Claude for Chrome, Microsoft Copilot)
  - Emphasized shift from fetching pages to working within user's browser with credentials and permissions
  - Described visual interface navigation across multiple tabs in user's context
- **Preface:**
  - Added paragraph describing browser extensions bringing agents into workflows
  - Explained scheduling, shortcuts, and context maintenance capabilities
  - Distinguished between remote page fetching and working alongside users
- **Removed amend.md** (no longer needed after consistency fixes)

### Fixed - 2026-01-07 (Manuscript Consistency)

**Resolved Internal Inconsistencies:**

- **Chapter 2:** Updated pattern count from five to six consolidated patterns
  - Changed heading to "The Six Types of Invisible Failure"
  - Updated figure caption to generic wording (no number until illustration regenerated)
  - Expanded summary table to include all 6 patterns:
    - Toast Notifications
    - Hidden Content (consolidated: pagination, tabs, below-the-fold)
    - Single-Page Applications
    - Delayed Validation (newly added to table)
    - Hidden Pricing
    - Loading States (newly added to table)
  - Updated Key Points section to reference six patterns
  - Added explanatory note about Hidden Content consolidation
- **Chapter 9:** Added comprehensive "The Structured Data Dilemma" section
  - Addresses contradiction between Schema.org benefits (Chapter 9) and extraction risks (Chapter 5)
  - Distinguishes transactional sites (beneficial) vs. content sites (risky)
  - Provides strategic decision framework for when to use Schema.org
  - Suggests mitigation strategies for content creators
  - 8 paragraphs, ~550 words
- **Appendix G:** Removed fictional Identity Layer version references
  - Removed "Identity Layer v2.0" from OAuth 2.0 entry
  - Removed "Identity Layer v2.5.1" from DPoP entry
  - Rewrote descriptions to reflect emerging/exploratory status
  - Now consistent with Chapter 4's "no standard exists yet" statement
- **Executive Summary:** Updated priority assessment to reference six patterns
- **amend.md:** Fixed markdown linting errors (duplicate headings, spacing)

### Changed - 2026-01-07 (Phase 2)

**Complete Manuscript Consolidation:**

- Moved reference materials into manuscript as appendices D-G
  - advice.md → appendix-ai-friendly-html-guide.md (Appendix D)
  - AI-design-rules.md → appendix-ai-patterns-quick-reference.md (Appendix E)
  - implementation-checklist.md → appendix-implementation-roadmap.md (Appendix F)
  - resource-links.md → appendix-resource-directory.md (Appendix G)
- Updated all documentation references (13 files):
  - CLAUDE.md, README.md, book-plan.md
  - Chapter 10, code examples, blog posts
  - agent-friendly-starter-kit documentation
- Fixed PDF build scripts:
  - Updated `--resource-path` from `invisible-users` to `invisible-users/manuscript`
  - Resolves illustration path errors (chapters now correctly find illustrations/ subdirectory)
- All manuscript content now in `invisible-users/manuscript/`:
  - Core chapters, preface, executive summary, glossary
  - Seven appendices (A-G)
  - Planning files (book-plan.md, book-svg-style.md) remain at root

### Changed - 2026-01-07 (Phase 1)

**Manuscript Reorganization:**

- Moved all core manuscript files into `invisible-users/manuscript/` subdirectory
  - Chapters 01-10
  - preface.md, executive-summary.md
  - Glossary.md
  - Appendices A-C (implementation-cookbook, battle-tested-lessons, web-audit-suite-guide)
  - All illustrations (SVG files)
- Planning materials remain in `invisible-users/` root:
  - book-plan.md, book-svg-style.md
  - agent-friendly-starter-kit/, code-examples/

**File Deletions:**

- Deleted `invisible-users/invisible-users.ipynb` (interactive notebook - no longer maintained)
- Deleted `invisible-users/glossary-simplified.md` (consolidated into main Glossary)

**Documentation Updates:**

- Updated all npm scripts in `package.json` to reference manuscript/ paths
- Updated repository structure diagrams in CLAUDE.md and README.md
- Updated llms.txt to remove interactive notebook references
- Updated book-plan.md to remove deleted file references
- Updated PROJECTSTATE.md with current structure

**Manuscript Improvements:**

- Enhanced navigation guide in preface.md with detailed reading paths for all audiences
- Streamlined navigation section in executive-summary.md
- Improved chapter flow in chapter-01-what-you-will-learn.md

### Changed - 2026-01-07 (Earlier)

- Renamed `invisible-users/for-ai.md` to `invisible-users/AI-design-rules.md` for clearer naming
- Updated all 12 files with references to the new filename:
  - CLAUDE.md (3 references in structure diagrams and documentation)
  - README.md (1 reference in repository structure)
  - llms.txt (1 reference in core guides section)
  - invisible-users/book-plan.md (3 references in materials table, changelog, and structure)
  - invisible-users/chapter-10-technical-advice.md (2 references in Further Resources section)
  - invisible-users/llms.txt (1 reference in blog post)
  - docs/blog.md (1 reference in practical guidance section)
  - web-audit-suite/README.md (1 reference in project structure)
  - invisible-users/agent-friendly-starter-kit/README.md (1 reference)
  - invisible-users/agent-friendly-starter-kit/DIFF_GUIDE.md (1 reference)
  - invisible-users/code-examples/html-examples/README.md (1 reference)
- Preserved generic folder pattern examples (`docs/for-ai/`) in advice.md as conceptual examples
