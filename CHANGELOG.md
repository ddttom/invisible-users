# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2026-01-19g] - Fix PDF Footer and Update Step-Commit Workflow

### Fixed

- **PDF footer rendering** (dont-make-ai-think book)
  - The `-V footer-center` pandoc flag doesn't work with default LaTeX templates
  - Created metadata.yaml with fancyhdr LaTeX package configuration
  - Footer now displays: "Early Draft - Commercial Work - Do Not Distribute"
  - Page numbers appear on outer edges (left/right pages)
  - Same approach as Bible book for consistency

### Changed

- **PDF generation scripts** (main repository package.json)
  - Updated all four dont-make-ai-think scripts to include metadata.yaml
  - Removed redundant `-V footer-center` flags (don't work)
  - Removed redundant `--metadata` flags (now in YAML)
  - Cleaner, more maintainable script commands

- **Step-commit workflow** (.claude/commands/step-commit.md and .claude/skills/step-commit.json)
  - Removed Step 7 (Project State / PROJECTSTATE.md)
  - CHANGELOG.md now serves as both historical record AND current project state
  - Renumbered: Step 8 (Changelog) → Step 6, Step 9 (Final Steps) → Step 7
  - Enhanced Changelog step description with comprehensive entry guidelines

### Added

- **metadata.yaml** (dont-make-ai-think submodule)
  - LaTeX header configuration with fancyhdr and listings packages
  - Document metadata (title, subtitle, author, date)
  - Code listing formatting with automatic line breaks
  - Professional footer styling

### Submodules Updated

- packages/dont-make-ai-think: afd39a2 → 9dfc864 (metadata.yaml added)
- outputs: 5ba0746 → a2b6268 (regenerated PDFs with footer)

### Notes (2026-01-19g)

- PDFs now include proper footer on all pages
- Footer uses italic font styling for professional appearance
- Approach matches Bible book for consistency across publications
- Step-commit workflow simplified by eliminating redundant PROJECTSTATE.md

## [2026-01-19f] - Complete Don't Make AI Think Book

### Added

- **Preface for Don't Make AI Think book** (dont-make-ai-think submodule)
  - New preface: 684 words, practical tone matching slim book style
  - Two-directional reading guidance (business leaders start at back, developers at front)
  - Critical warning that developers must read Chapter 11 for justification
  - Cross-references to Bible and shared online resources
  - Role-based entry points (frontend dev, UX designer, QA, technical leads, business leaders)

- **Chapter 11: Business Imperative** (dont-make-ai-think submodule)
  - New chapter: 1,544 words abstracted from Bible's comprehensive Chapter 4
  - Platform race coverage (Amazon, Microsoft, Google - January 2026)
  - Revenue model collision mathematics (87% page view reduction)
  - Stack Overflow case study (28% workforce reduction)
  - E-commerce validation (Microsoft Copilot Checkout, 80%+ conversion)
  - First-mover advantage and network effects
  - Strategic assessment framework (4 exposure categories)
  - Implementation ROI with concrete 780% example
  - Protocol integration decisions (ACP vs UCP vs Copilot)
  - Industry-specific implications

- **Professional cover page** (dont-make-ai-think submodule)
  - LaTeX-formatted cover with title, subtitle, author, date
  - "EARLY DRAFT" notice and distribution warning
  - "Commercial Work - Do Not Distribute" footer

### Changed

- **Updated CHAPTERS-GUIDE.md** (dont-make-ai-think submodule)
  - Added Chapter 11 section with comprehensive bullet points
  - New "Reading Order" section emphasizing two-directional reading approach
  - Updated implementation paths for different roles (tech leads, developers, everyone)

- **Updated README.md** (dont-make-ai-think submodule)
  - Added "Front Matter" section (cover page, preface)
  - Added Chapter 11 to chapter list
  - New "Live Resources" section with allabout.network links
  - Expanded "Target Audience" with business leaders and reading guidance
  - Added two-directional reading concept to overview

- **PDF generation scripts** (main repository)
  - Updated all four dont-make-ai-think PDF scripts (generate, kindle, simple, all)
  - New file order: 00-cover.md → preface.md → chapter-*.md → CHAPTERS-GUIDE.md
  - Added universal footer: "Early Draft - Commercial Work - Do Not Distribute"
  - Updated chapter glob to include all 11 chapters

### Fixed

- **Unicode character replacements** (dont-make-ai-think submodule)
  - chapter-06-navigation.md: Box-drawing characters (├ └ │ ─) → ASCII (`+`, `-`, `|`)
  - chapter-08-testing.md: Checkmarks (✓ ✗) → `[PASS]` and `[FAIL]`
  - chapter-04-content-architecture.md: Stars (★★★★★) → "5 stars"
  - Result: Zero PDF font warnings, clean 587KB PDF generation

- **Documentation updates** (main repository)
  - docs/for-ai/writing-style.md: Added ASCII character guidelines (Section 8)
  - docs/for-ai/writing-style.md: Added "no time estimates" guidance
  - .claude/skills/review-docs/skill.md: Added special character check (item #11)
  - CLAUDE.md: Updated slim book description (10 → 11 chapters)

### Submodules Updated

- packages/dont-make-ai-think: c63fa7c → afd39a2
- packages/bible: 5ab5a86 → b2c266b (minor corrections)
- outputs: 7dc0705 → 5ba0746 (PDFs and blog rename)

### Notes (2026-01-19f)

- The slim book now has complete front matter, all 11 chapters, and professional formatting
- Two-directional reading approach serves both technical and business audiences
- ASCII-only approach eliminates PDF font warnings across all platforms
- Live resources at allabout.network provide continuously updated appendices and news

## [2026-01-19e] - Move SVG Style Guide and Complete Manuscript Cleanup

### Changed

- **Moved book-svg-style.md to config/ directory**
  - Relocated from `packages/manuscript/book-svg-style.md` to `config/book-svg-style.md`
  - The SVG style guide is a shared configuration resource used across multiple book submodules
  - Belongs in main repository's `config/` directory alongside `.markdownlint.json`

- **Updated all references to SVG style guide**
  - Updated CLAUDE.md: Repository structure diagrams and documentation reference list
  - Updated docs/repo/ONBOARDING.md: Directory tree structure
  - Updated .claude/commands/review-docs.md: Example paths updated to current submodules

- **Removed packages/manuscript/ directory**
  - Directory is now empty and has been removed
  - Completes the cleanup of legacy manuscript structure

### Notes

- All references to `packages/manuscript/` have been removed or updated
- SVG style guide is now in the correct location as a shared config file
- Legacy manuscript structure cleanup is complete

## [2026-01-19d] - Remove Legacy Manuscript Submodule References

### Changed

- **Documentation cleanup for current submodule structure**
  - Updated README.md: Replaced legacy `packages/manuscript/` reference with list of 5 current submodules (bible, dont-make-ai-think, shared-appendices, shared-code-examples, outputs)
  - Updated CLAUDE.md: Changed submodule update examples from `packages/manuscript/the-bible-of-mx` to `packages/bible`
  - Updated GIT-README.md: Replaced all 40+ occurrences of `packages/manuscript/the-bible-of-mx` with `packages/bible` in examples
  - Updated .claude/pwd-reminder.md: Replaced legacy example location with current submodule locations
  - Updated .claude/commands/step-commit.md: Generalized `packages/manuscript` references to generic `submodule`
  - Updated docs/sales-enablement/pitches/critique.md: Removed legacy archival recommendation, updated to reflect current structure

### Notes

- This cleanup removes confusion for contributors about the legacy manuscript structure
- All git workflow examples now use current submodule paths
- The `packages/manuscript/` directory was later removed completely in 2026-01-19e

## [2026-01-19c] - Chapter 8 Markdown Linting Fixes

### Fixed

- **Chapter 8 markdown linting errors** (dont-make-ai-think submodule)
  - Fixed MD040: Added language specification (`text`) to all 9 code blocks (conversation examples, error messages)
  - Fixed MD036: Converted 7 emphasis labels to proper headings (### Test 1-3, ### Phase 1-4)
  - Fixed MD034: Wrapped 3 bare URLs in angle brackets (auto-fixed)
  - Fixed MD032: Added blank lines around 6 lists (auto-fixed)
  - All 24 linting errors resolved, chapter now passes markdownlint validation

### Changed

- Updated dont-make-ai-think submodule pointer to commit a45fc8f

## [2026-01-19a] - Chapter 8 Addition and Git Workflow Enhancement

### Added

- **Chapter 8 to Don't Make AI Think book** (dont-make-ai-think submodule)
  - New chapter: "Testing with AI Agents" (785 lines)
  - Covers: morning-after test, testing with multiple AI tools, structured data validation, automated testing approaches, common testing mistakes, implementation roadmap
  - Updated README.md: Changed Chapter 8 from "(Chapter 8 content TBD)" to complete description
  - Updated CHAPTERS-GUIDE.md: Removed "(to be created)" marker and updated bullet points to match actual content
  - Updated chapters/README.md: Fixed author information (Tom Harris → Tom Cranstoun)

- **Git mv enforcement in CLAUDE.md**
  - Added rule #5 to Git Workflows: "Always use git mv for renaming tracked files"
  - Added file renaming examples showing correct (git mv) vs wrong (mv) approaches
  - Prevents loss of git history when renaming files
  - Includes examples for main repo and submodules using git -C

### Fixed

- **Chapter 5 filename** (dont-make-ai-think submodule)
  - Renamed 'chapter-05-metadata-that-works .md' to chapter-05-metadata-that-works.md
  - Removed trailing space from filename using git mv (preserves git history)

### Changed

- Updated .claude/settings.local.json with git mv permission patterns
- Fixed .claude/skills/humanizer/skill.md file permissions (mode change)
- Updated dont-make-ai-think submodule pointer to commit 74124a3 (later updated to a45fc8f after linting fixes)

## [2026-01-19b] - Repository Purpose Documentation

### Added

- **Repository Purpose Sections**: Added "Repository Purpose and Structure" sections to all five submodule READMEs
  - packages/bible/README.md - Clarifies content-only nature of manuscript repository
  - packages/dont-make-ai-think/README.md - Clarifies slim guide repository structure
  - packages/shared-appendices/README.md - Clarifies shared appendices repository purpose
  - packages/shared-code-examples/README.md - Emphasizes reference library nature
  - outputs/README.md - Clarifies storage-only purpose for generated content
  - All sections explain: no package.json, no dependencies, no scripts, no build tooling
  - Cross-references to parent repository CLAUDE.md and GIT-README.md

- **Main README Enhancement**: Added "Why Submodules Exist: Separation of Concerns" section
  - Documents key principles of multi-repository architecture
  - Lists 6 benefits: independent version control, no dependency sprawl, clean collaboration, reusability, access control, build isolation
  - Clarifies that submodules cannot be built independently
  - Updated repository structure diagram with [SUBMODULE] markers
  - Distinguishes between main repo only items (docs/, config/, scripts/, .claude/) and submodules

### Changed

- Repository structure diagram now clearly marks which directories are submodules
- Clarified that web-audit-suite/ is NOT a submodule
- Emphasized parent repository controls all build processes, PDF generation, and linting

### Documentation

- Enhanced understanding of separation of concerns across all repositories
- Improved clarity for both human contributors and AI assistants reading repository documentation
- All changes maintain British English style and professional tone

**Note**: This changelog tracks changes to the main repository. For bible submodule changes, see packages/bible repository. For Web Audit Suite changes, see packages/web-audit-suite/CHANGELOG.md.
