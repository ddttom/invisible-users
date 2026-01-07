# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
