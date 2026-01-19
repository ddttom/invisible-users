# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2026-01-19] - Repository Purpose Documentation

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
