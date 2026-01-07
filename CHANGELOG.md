# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
