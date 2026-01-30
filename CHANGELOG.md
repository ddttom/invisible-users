# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed - 2026-01-30

#### SVG Illustration Requirements (commit 1eb8134)

**Updated config/book/book-svg-style.md:**

- Clarified that each chapter requires a minimum of one SVG illustration (not exactly one)
- Added requirement that SVG filenames must not clash across chapters
- Maintains flexibility for chapters that need multiple illustrations

### Added - 2026-01-30

#### Documentation Philosophy - Size-Neutral Principle (commits 1ea2d6b, 3173eb7, b069c96, 3feb6fa)

**New documentation standard added to repo-philosophy.md:**
- Establishes "Size-Neutral Documentation" principle to avoid hard-coded counts in documentation
- Eliminates maintenance burden when counts change (chapters, submodules, repositories, etc.)
- Provides clear examples of what to avoid and size-neutral alternatives
- Prevents documentation drift across multiple files

**Applied size-neutral documentation across repository:**
- Updated CLAUDE.md: Removed hard-coded repository, submodule, and chapter counts
- Updated README.md: Removed chapter counts from book descriptions
- Updated IP strategy document: Removed chapter counts from copyright section
- Changed "11 submodules" → "all submodules", "13 chapters" → removed counts
- Focused documentation on concepts rather than volatile numerical details

**Note:** Prospect/client documents in docs/structure/prospects/ retain historical chapter counts as records of communications at specific times.

### Added - 2026-01-29

#### New Submodules (commit c14d276)

**MX-Sales-enablement Repository:**
- Added packages/business/mx-sales-enablement/ submodule from https://github.com/ddttom/MX-Sales-enablement.git
- Private sales and marketing resources repository
- Updated CLAUDE.md repository count: 10 → 11 total repositories (1 main + 10 submodules)
- Added sales enablement entry to all submodule lists in documentation
- This is the 10th submodule in the workspace

#### Repository Structure - Ingest Directory (commits 0a3b4a3, 573f18f, a9c2432)

**Created ingest/ directory for content staging:**
- New top-level directory for draft content and AI assistant analysis documents
- Provides clear separation between strategic planning (docs/structure/) and content staging (ingest/)

**Moved blog-drafts to ingest/ (commit 0a3b4a3):**
- Relocated docs/structure/blog-drafts/ → ingest/blog-drafts/
- 16 markdown files moved including contrasts/ and joiners/ subdirectories
- Updated repo-vocabulary.md with new paths (commit b9d8aee)

**Moved mx-the-idea to ingest/ (commit 573f18f):**
- Relocated docs/structure/mx-the-idea/ → ingest/mx-the-idea/
- 5 files: README.md, energy-efficiency.md, hallucination-reduction.md, knowledge-distribution.md, manifesto.md
- No reference updates needed (no files referenced old path)

**Moved use-cases to ingest/ (commit a9c2432):**
- Relocated docs/structure/use-cases/ → ingest/use-cases/
- 9 files: README.md, ceo.md, cms-agencies.md, cms-vendors.md, conference-organisers.md, designers.md, developers.md, platform-creators.md, product-owners.md
- No reference updates needed (no files referenced old path)

### Changed - 2026-01-29

#### Documentation Updates (commit 9888a43)

**Updated folder-layout.md with current structure:**
- Removed blog-drafts/ from docs/structure/ listing
- Added new ingest/ directory section documenting three subdirectories:
  - blog-drafts/ (content drafts and ideas)
  - mx-the-idea/ (MX concept exploration documents)
  - use-cases/ (audience-specific use case documentation)
- Added mx-sales-enablement/ submodule to business/ directory listing
- Added detailed Submodule 10 section for mx-sales-enablement
- Updated repository count: 9 → 10 submodules (total 11 repositories)
- Brings folder-layout.md in sync with actual repository structure

#### MX Metadata Standardization

**AI Exclusion Patterns**

- Added `.mxignore` file (411 lines) with comprehensive AI agent exclusion patterns
  - Instructs AI agents which files to ignore unless explicitly requested
  - Filters infrastructure files, build artifacts, documentation boilerplate
  - Uses gitignore-style patterns with inheritance from .gitignore
  - Includes MX metadata header with YAML format
  - Purpose: Reduce AI context noise and focus on project content

**Markdown Linting Configuration**

- Added `.markdownlintignore` file to exclude paths from markdown linting
  - Excludes .claude/ skills directory
  - Excludes node_modules/
  - Excludes all submodules (packages/*)

### Changed - 2026-01-29

#### Repository Structure Refactoring (commit d674b5c)

**Centralized Folder Structure Documentation:**

- Established config/system/folder-layout.md as single source of truth for complete repository structure
- All documentation now references centralized structure instead of duplicating folder trees
- Removed 178 lines from CLAUDE.md, 280 lines from doc-architecture.md

**Moved vocabulary.md to config/book/:**

- Relocated docs/structure/vocabulary.md → config/system/repo-vocabulary.md using git mv (preserved history)
- Groups with other book-specific configuration (book-svg-style.md)
- Updated all references:
  - CLAUDE.md line 269
  - config/system/folder-layout.md (added to config/book/ section, removed from docs/structure/)
  - docs/structure/blog-drafts/vocabulary-driven-collaboration.md (3 references)

**Updated llms.txt (AI Discovery File):**

- Fixed repository count: 11 → 10 (1 main + 9 submodules)
- Updated all outdated paths to current naming convention:
  - bible/ → packages/mx-the-bible/
  - shared-appendices/ → packages/mx-appendices/
  - shared-code-examples/ → packages/mx-code-examples/
  - outputs/ → packages/mx-outputs/
  - ucp/ → packages/external/ucp/
- Removed references to deleted symlinks (books/, blogs/, AGENTS.md, GEMINI.md)
- Added reference to config/system/folder-layout.md as authoritative source
- Updated doc-architecture.md description (now mentions ASCII diagrams, not Mermaid)
- Fixed appendix count: A-L → A-M (12 appendices)
- Updated all chapter paths to correct submodule locations
- Updated last-updated: 29/Jan/2026

**Updated Path References Across Documentation:**

- docs/for-ai/writing-style.md: Updated Glossary path to packages/mx-the-bible/Glossary.md
- .claude/skills/create-blog/skill.md: Updated template paths (mx-appendices, mx-outputs)
- config/system/repo-vocabulary.md: Updated internal path mappings for all shorthand terms

**Result:** All documentation uses current repository paths and references the centralized folder structure documentation as the single source of truth.

#### MX Configuration File Standardization

Renamed all `mx.yaml` files to `.mx.yaml` (dot prefix) for consistency with established conventions:

- Root: `mx.yaml` → `.mx.yaml`
- packages/web-audit-suite: `mx.yaml` → `.mx.yaml`
- scripts: `mx.yaml` → `.mx.yaml`

**Rationale:** Dot-prefix follows "design for both" principle:
- For humans: Hides configuration files from default directory listings (reduced clutter)
- For machines: Remains fully discoverable and machine-readable
- Consistency: Aligns with .gitignore, .env, .editorconfig conventions

#### .gitignore Comprehensive Update (v2.0.0)

**MX Metadata Enhancement:**
- Converted from `@mx:` annotation style to proper YAML structure within comments
- Updated version: 1.0.0 → 2.0.0
- Added `ai.editable: true` and `ai.assistance: welcome`
- Expanded `context_provides` to include cache-patterns and temporary-files

**Pattern Additions:**
- **OS files**: .AppleDouble, .LSOverride, ._*, Desktop.ini, $RECYCLE.BIN/
- **Editor files**: *.code-workspace, .fleet/, *.swo, *.sublime-*
- **Logs**: npm-debug.log*, yarn-debug.log*, yarn-error.log*
- **Cache directories**: .cache/, .npm/, .eslintcache, *.cache, .parcel-cache/
- **Test coverage**: coverage/, .nyc_output/, test-results/, *.lcov
- **Build artifacts**: dist/, build/, out/, .next/, *.tsbuildinfo
- **Build outputs**: *.tar.gz, *.tgz, package-lock.json.backup
- **Environment**: .env.*.local
- **Temporary files**: *.tmp, *.temp, *.bak, *~.backup, *.orig
- **Working directories**: scratch/, working/, temp/, tmp/

**Pattern Removals (Obsolete):**
- Removed symlink patterns (GEMINI.md, AGENTS.md, books/, blogs, .agents/)
- Removed non-existent directories (the-bible/, dont/)

#### Documentation Updates

**CLAUDE.md Enhancements:**
- Added comprehensive `.mxignore` documentation and usage patterns
- Added mandatory `.mx.yaml` filename specification section
- Added AI exclusion patterns guidance
- Updated MX specification path references (Downloads → mx-gathering/specifications/)
- Added reference to complete collection of 21 MX specification documents
- Updated repository navigation map to reflect current state
- Documented symlink removal and structure cleanup

**README.md Clarification:**
- Updated AI agent definition: "convert HTML into mathematical representations" → "convert HTML and text and images into mathematical representations"

**docs/for-ai/writing-style.md:**
- Minor formatting and content updates

### Removed - 2026-01-29

#### Repository Structure Cleanup

**Symlinks Removed:**
- Root level: AGENTS.md, GEMINI.md, blogs, scrap
- books/ directory: All convenience symlinks (bible, appendices, code-examples, dont-make-ai-think, outputs)

**Rationale:** Symlinks were convenience shortcuts but:
- Some pointed to non-existent paths (dont-make-ai-think, old package names)
- Created confusion in multi-repository navigation
- Not essential for development workflow
- Can be recreated if needed

**Documentation Removed:**
- docs/for-ai/architecting-multi-repo-codebases.md (1,724 lines)
  - Obsolete content superseded by config/system/GIT-README.md
  - Duplicate guidance consolidated into primary git workflow documentation

#### Submodule Updates

**packages/mx-the-bible (8422525):**
- Removed obsolete vdiff comparison file: invisible-users vs web.vdiff

**packages/notes (11cb757):**
- Removed unused scrap/ directory (contained only empty .gitkeep)
- Note: Local commits rebased on top of 5 remote commits (891d972..11cb757)

**packages/mx-gathering:**
- Pointer update to latest commit

### Added - 2026-01-28

#### Repository Restructure: New Submodule Architecture

Added six new git submodules under packages/ directory with new mx-* naming convention:

1. **packages/mx-the-bible/** (invisible-users-manuscript)
   - Full MX-Bible comprehensive guide
   - Replaces old packages/bible/ structure
   - Commit: cf81b8e

2. **packages/mx-appendices/** (invisible-users-appendices)
   - Shared appendices (A-M) for all books
   - Replaces old packages/shared-appendices/ structure
   - Commit: 13e0a4a

3. **packages/mx-outputs/** (invisible-users-outputs)
   - All generated content (PDFs, HTML, marketing)
   - Replaces old outputs/ structure
   - Moved from root to packages/ directory
   - Commit: 287294d

4. **packages/mx-handbook/** (MX-The-Handbook)
   - Implementation handbook (11 chapters)
   - Commit: eeaa92a

5. **packages/mx-gathering/** (MX-Gathering)
   - Community resources and thought leadership
   - Open-source public repository
   - Commit: a5f85ac

6. **packages/mx-code-examples/** (invisible-users-code-examples)
   - Good vs bad pattern implementations
   - Replaces old packages/shared-code-examples/ structure
   - Commit: 05efa2a

#### Additional Submodules Added

Three additional submodules were added after the initial restructure:

1. **packages/external/ucp/** (Universal-Commerce-Protocol/ucp)
   - Universal Commerce Protocol reference documentation
   - External project demonstrating AI agent ecommerce patterns
   - Commit: 28cf694

2. **packages/business/mx-business/** (MX-business-planning)
   - Private business strategy and planning documents
   - Strategic positioning, market analysis, financial models
   - Commit: 1c82d7a

3. **packages/notes/** (Notes)
   - Coding standards and development practices reference
   - Architecture guidelines and project setup documentation
   - Commit: 5360e80

**Removed Old Submodules:**

The following submodules from the old structure no longer exist:

- packages/bible/ (replaced by packages/mx-the-bible/)
- packages/shared-appendices/ (replaced by packages/mx-appendices/)
- packages/shared-code-examples/ (replaced by packages/mx-code-examples/)
- outputs/ (replaced by packages/mx-outputs/)
- packages/ucp/ (removed)
- packages/notes/ (removed)
- packages/sales-enablement/ (removed)
- packages/business-planning/ (removed)
- packages/mx-legal/ (removed)

**Repository Count Change:**

- Previous: 10 git repositories (1 main + 9 submodules)
- After initial restructure: 7 git repositories (1 main + 6 submodules)
- Current: 10 git repositories (1 main + 9 submodules)

### Changed - 2026-01-28

**Documentation Updates - Round 1** (Commit: a0ed8d2)

Updated CLAUDE.md and README.md to reflect new submodule structure:

- All path references updated from old to new convention
- Repository Architecture section updated (7 repos instead of 10)
- Repository Navigation Map completely revised
- Blog post paths updated (outputs/ → packages/mx-outputs/)
- Symlink references updated throughout
- Key navigation rules and examples updated
- Removed references to non-existent submodules
- Updated all example code blocks
- Fixed markdown linting issues

**Path Mapping:**

- `packages/bible/` → `packages/mx-the-bible/`
- `packages/shared-appendices/` → `packages/mx-appendices/`
- `packages/shared-code-examples/` → `packages/mx-code-examples/`
- `outputs/` → `packages/mx-outputs/`
- `blogs` symlink → now points to `packages/mx-outputs/bible/blogs`
- `books/bible` symlink → now points to `packages/mx-the-bible/`
- `books/appendices` symlink → now points to `packages/mx-appendices/`
- `books/code-examples` symlink → now points to `packages/mx-code-examples/`
- `books/outputs` symlink → now points to `packages/mx-outputs/`

**Documentation Updates - Round 2** (Commit: ce4fdde)

Updated CLAUDE.md and README.md to reflect all 9 submodules:

- Repository Architecture updated from 7 to 10 repositories (1 main + 9 submodules)
- Added external/ucp submodule to navigation map
- Added business/mx-business submodule to navigation map
- Added notes submodule to navigation map
- Updated README.md "Working with Git Submodules" section with complete list
- Documentation now accurately reflects current repository structure

**Commits in this session:**

1. cf81b8e - Add invisible-users-manuscript as submodule at packages/mx-the-bible
2. 13e0a4a - Add invisible-users-appendices as submodule at packages/mx-appendices
3. 287294d - Add invisible-users-outputs as submodule at packages/mx-outputs
4. eeaa92a - Add MX-The-Handbook as submodule at packages/mx-handbook
5. a5f85ac - Add MX-Gathering as submodule at packages/mx-gathering
6. 05efa2a - Add invisible-users-code-examples as submodule at packages/mx-code-examples
7. 7b86454 - Add invisible-users-manuscript as submodule at packages/mx-manuscript (temporary)
8. 4a83536 - Remove mx-manuscript submodule (duplicate of mx-the-bible)
9. a0ed8d2 - Update documentation to reflect new submodule structure
10. 28cf694 - Add Universal Commerce Protocol (UCP) as external submodule
11. 1c82d7a - Add MX-business-planning as submodule at packages/business/mx-business
12. 5360e80 - Add Notes as submodule at packages/notes
13. ce4fdde - Update documentation to reflect all 9 submodules

### Notes - 2026-01-28

**Naming Convention Rationale:**

The new mx-* naming convention was deliberately chosen for consistency and clarity:

- All MX-related submodules use "mx-" prefix
- Distinguishes project submodules from external tools (web-audit-suite)
- Makes submodule structure self-documenting

**Migration Impact:**

This restructure consolidates all project content into standardized submodules. Users cloning the repository for the first time will receive the new structure. Existing clones will need to:

1. Run `git submodule update --init --recursive` to initialize new submodules
2. Update any local scripts or workflows referencing old paths
3. Note that old submodule paths no longer exist

**Backward Compatibility:**

No backward compatibility is maintained for old submodule paths. All references have been updated to new paths throughout the codebase.
