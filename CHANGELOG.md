# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Note:** Full detailed changelog with 57 entries archived in [CHANGELOG-FULL.md](CHANGELOG-FULL.md)

## [Unreleased]

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
