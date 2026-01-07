# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
