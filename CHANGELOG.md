# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2026-01-19] - Humanizer Skill and AI Pattern Detection

### Added

- **Humanizer Skill**: New `/humanizer` skill removes AI-generated writing patterns and injects authentic human voice
  - Detects 24 AI pattern types across 5 categories
  - Content patterns: significance inflation, promotional language, vague attributions
  - Language/grammar patterns: AI vocabulary, copula avoidance, synonym cycling
  - Style patterns: em dash overuse, boldface abuse, emojis
  - Communication patterns: chatbot artifacts, disclaimers, sycophantic tone
  - Filler/hedging patterns: verbose constructions, excessive hedging
  - Based on Wikipedia's "Signs of AI writing" guide
  - Priority levels: Critical (communication) > High (content/language) > Medium (style) > Low (filler)

- **AI Pattern Detection in Review-Docs**: Enhanced `/review-docs` skill with Section 9 detection
  - New "AI Patterns (Should Fix)" category in review reports
  - Communication patterns treated as Critical severity
  - Cross-references with Sections 5-7 where patterns overlap

- **Writing Style Guide Enhancement**: Added Section 9 (AI Pattern Detection and Humanization)
  - 524 new lines documenting all 24 patterns with before/after examples
  - "Personality and Soul" guidance for authentic voice
  - Detection workflow and priority levels
  - Cross-references with existing sections
  - EDS metadata table documentation

- **Markdownlint Configuration Guidance**: Added critical reminder to CLAUDE.md
  - Documents correct usage: `npx markdownlint -c config/.markdownlint.json`
  - Lists disabled rules with rationale (MD013, MD041, MD051, MD060)
  - Provides correct/incorrect command examples

- **AI Tool Compatibility Symlinks**: Added GEMINI.md and AGENTS.md symlinks pointing to CLAUDE.md
  - Enables compatibility across different AI assistant ecosystems
  - Updated init-repo.js script to create symlinks automatically
  - Added to .gitignore

- **Sales Enablement Materials**: New pitch critique and meeting notes
  - docs/sales-enablement/pitches/critique.md - Analysis of pitch effectiveness
  - docs/sales-enablement/pitches/meet-with-matt.md - Conversation with Matt Bailey (CMS Critic)

### Changed

- **Chapter 0 Complete Rewrite**: Restructured with narrative-first approach
  - Reduced from ~277 lines to ~145 lines (more focused)
  - Opening changed from "They're Machines, Not Magic" to "The Journey"
  - Added personal narrative (CMS conferences, blog posts, conversations)
  - Added concrete examples upfront (Danube cruise pricing, Ally McBeal citations)
  - Introduced "invisible users" concept through discovery journey
  - Added publishing plans and broader CMS industry context
  - Maintained all technical accuracy while improving engagement
  - Bible submodule commit: f05c88e

- **llms.txt Enhancements**: Added machine-readable metadata table
  - Complete metadata table with title, author, dates, description
  - Updated repository architecture description (5-submodule structure)
  - Added "Don't Make AI Think" slim guide documentation
  - Enhanced getting started section with clear navigation
  - Wrapped bare URLs in angle brackets (markdown linting compliance)

- **Configuration Updates**:
  - Added `tac` command to allowed Bash commands (.claude/settings.local.json)
  - Updated .gitignore comments and added books/ and blogs symlink entries
  - Added hasInstallScript flag to package-lock.json

### Fixed

- **Markdown Linting Issues**:
  - Changed all 24 numbered pattern headings from h4 to h3 in writing-style.md (fixes MD001)
  - Made duplicate headings unique in critique.md (fixes MD024)
  - Wrapped bare URLs in llms.txt metadata table (fixes MD034)
  - All markdown files now pass linting with project config

### Documentation

- Updated CLAUDE.md with humanizer as 5th custom skill
- Updated PROJECTSTATE.md with latest change documentation
- Enhanced llms.txt with comprehensive project overview
- Added markdownlint configuration guidance across documentation

## [2026-01-19] - Commercial Disclosure and MD060 Linting

### Added

- Commercial purpose disclosure to Chapter 0
- Implementation Support section with professional services description
- MD060 rule disabled in .markdownlint.json for EDS metadata tables

### Changed

- Converted bold stage labels to proper headings in Chapter 0 (fixes MD036)
- Updated CLAUDE.md to document MD060 as justified exception
- Chapter 0 now passes all markdown linting checks

---

**Note**: This changelog tracks changes to the main repository. For bible submodule changes, see packages/bible repository. For Web Audit Suite changes, see packages/web-audit-suite/CHANGELOG.md.
