# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
