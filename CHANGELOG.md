# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2026-01-20b] - Multi-Repository Workflow Automation

### Added

- **Claude Code Permissions** (.claude/settings.local.json)
  - Added `git -C:*` wildcard permission for all submodule git operations
  - Added pipeline tools: xargs, sed, awk, sort, uniq, head, tail, cut
  - Added path utilities: basename, dirname, realpath
  - Added file inspection tools: file, stat, diff, comm, jq
  - Added git commands: show, rev-parse, describe, tag, fetch, pull, for-each-ref, symbolic-ref
  - Added GitHub CLI permissions: gh pr, gh issue, gh api
  - Enables streamlined multi-repo automation without constant permission prompts

- **Multi-Repository Permissions Documentation** (docs/for-ai/architecting-multi-repo-codebases.md)
  - New section "Claude Code Permissions for Multi-Repository Workflows"
  - Recommended permissions configuration with JSON examples
  - Security warnings and considerations (critical warning about understanding permissions)
  - Before/after workflow examples showing automation benefits
  - Maintenance guidelines for quarterly permission review
  - Clear guidance on permissions to keep in "ask" mode and never auto-approve

### Changed

- **package-lock.json**: Automatic dependency resolution updates

### Impact Notes

These permissions eliminate repetitive approval prompts for multi-repo automation (git -C commands, linting pipelines, text processing) while maintaining security through ask-mode for destructive operations (git restore, git reset, bash scripts). The documentation ensures users understand security implications before adoption.

## [2026-01-20] - Replace EDS Metadata with Pandoc YAML Frontmatter

### Changed

- **Appendix L Pattern 4** (shared-appendices submodule)
  - Complete rewrite from "EDS Markdown Metadata Tables" to "Pandoc YAML Frontmatter for Markdown Metadata"
  - Updated status from "Proposed - Adobe EDS" to "Established Standard - Universal markdown frontmatter"
  - Replaced all table examples with YAML frontmatter format
  - Updated rationale, use cases, benefits, forward compatibility, adoption considerations
  - Added Pandoc documentation reference: <https://www.codestudy.net/blog/what-can-i-control-with-yaml-header-options-in-pandoc/>
  - Updated cross-references throughout appendix (lines 30, 885, 974)

- **Chapter 10** (bible submodule)
  - Updated markdown converter solution to reference Pandoc YAML frontmatter instead of EDS metadata tables
  - Maintains problem description about HTML-to-markdown metadata loss
  - Solution now recommends universal Pandoc standard

- **Chapter 12** (bible submodule)
  - Removed Adobe Edge Delivery Services code example reference (non-existent directory)

- **Chapter 5** (dont-make-ai-think submodule)
  - Updated all JSON-LD examples to remove Adobe/EDS references
  - Organization description: "Enterprise content management and web development consultancy"
  - Article headline: "How to Migrate from Legacy CMS to Modern Web Architecture"
  - HowTo example: "How to Install Node.js CLI Tools"

- **CLAUDE.md** (main repository)
  - Replaced "Markdown Metadata Tables (EDS Standard)" section with "Markdown Metadata (Pandoc YAML Frontmatter)"
  - Removed MD060 linting exception (no longer needed)
  - Updated examples to show YAML frontmatter format
  - Added standard fields documentation

- **docs/for-ai/architecting-multi-repo-codebases.md** (main repository)
  - Rewrote Pattern 2 from "EDS Metadata Tables" to "Pandoc YAML Frontmatter"
  - Complete section rewrite with YAML examples
  - Added build system integration examples
  - Updated all references throughout document

- **docs/for-ai/writing-style.md** (main repository)
  - Updated metadata section from "EDS Markdown Metadata Tables" to "Pandoc YAML Frontmatter"
  - Replaced table example with YAML format
  - Removed MD060 linting reference

### Added

- **Appendix H** (shared-appendices submodule)
  - New section "Markdown Metadata Standards for AI Agents"
  - Explains how YAML frontmatter complements llms.txt (site-wide vs per-document metadata)
  - Provides standard Pandoc fields (title, author, date, abstract, keywords)
  - Provides custom AI agent fields (description, ai-instruction, purpose, context)
  - Includes platform support details (Hugo, Jekyll, Gatsby, Quarto, Pandoc)
  - Added build system integration examples showing YAML-to-HTML-meta transformation
  - Links to Pandoc, Hugo, and Jekyll documentation

### Removed

- All references to "EDS metadata tables" as a proposed pattern (except historical records in PROJECTSTATE.md)
- Adobe Edge Delivery Services mentions from book content (retained only in Appendix H author bio/expertise section)
- MD060 linting exception from config (was specific to EDS `:----` table alignment)

### Submodules Updated

- packages/shared-appendices: d11b36f → b2368e8 (Appendix L Pattern 4 + Appendix H YAML section)
- packages/bible: b2c266b → 592701e (Chapter 10 and 12 updates)
- packages/dont-make-ai-think: 9dfc864 → 78c716b (Chapter 5 JSON-LD examples)

### Notes (2026-01-20)

- This change replaces the proposed Adobe-specific EDS metadata table pattern with the universal Pandoc YAML frontmatter standard
- YAML frontmatter is supported by all major static site generators (Hugo, Jekyll, Gatsby, Quarto) and the Pandoc document converter
- Adobe EDS expertise remains documented in Appendix H author bio section
- All cross-references updated to point to Pattern 4 as "Pandoc YAML Frontmatter"
- Verification confirmed zero "EDS metadata" or "metadata table" references in book content (excluding historical changelog entries)

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
