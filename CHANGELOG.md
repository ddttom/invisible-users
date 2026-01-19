# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

- The `packages/manuscript/` directory still exists and contains `book-svg-style.md` (SVG illustration style guide)
- This cleanup removes confusion for contributors about the legacy manuscript structure
- All git workflow examples now use current submodule paths

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
