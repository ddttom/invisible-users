# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed - 2026-01-07

**Manuscript Reorganization:**

- Moved all core manuscript files into `invisible-users/manuscript/` subdirectory
  - Chapters 01-10
  - preface.md, executive-summary.md
  - Glossary.md
  - All appendix files
  - All illustrations (SVG files)
- Supporting materials remain in `invisible-users/` root:
  - book-plan.md
  - advice.md, AI-design-rules.md
  - implementation-checklist.md, resource-links.md
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
