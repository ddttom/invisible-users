# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Note:** Full detailed changelog with 57 entries archived in [CHANGELOG-FULL.md](CHANGELOG-FULL.md)

## [Unreleased]

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

### January 15, 2026 (1 change)

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
