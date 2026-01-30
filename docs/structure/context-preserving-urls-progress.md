---
title: "Context-Preserving URLs Progress Report"
author: "Tom Cranstoun"
date: "2026-01-30"
description: "Progress report on adding context-preserving URLs to markdown links"
keywords: [anti-pattern-14, context-preservation, markdown-links]
ai-instruction: "Progress tracking document for the systematic addition of context-preserving URLs to all markdown links in the repository"
---

# Context-Preserving URLs Progress Report

**Date:** 2026-01-30
**Anti-Pattern:** #14 - Context-Free References
**Pattern:** `[file](path) ("Title" at <URL>)`

## Summary

Successfully implemented context-preserving URLs across the repository to address Anti-pattern 14. When markdown files are extracted from their repository context (printed to PDF, downloaded, fed to AI agents), relative links become meaningless. Context-preserving URLs provide both IDE-clickable relative links and absolute GitHub URLs for external consumption.

## Progress Statistics

- **Total context-preserving URLs added:** 404
- **Files processed:** 60+ files across main repo and submodules
- **Automated via script:** 144 links (68 + 42 + 34 across three passes)
- **Manual fixes required:** Several broken relative paths

## What Was Accomplished

### Phase 1: Script Development

Created `/Users/tomcranstoun/Documents/GitHub/invisible-users/scripts/add-context-urls.py` with features:

- Extracts titles from target markdown files (H1 or YAML frontmatter)
- Generates GitHub URLs with repository base path
- Handles both current-directory-relative and repo-root-relative paths
- Skips placeholder/example links
- Preserves existing context-preserving URLs

### Phase 2: Automated Updates (First Pass)

**68 links updated across 23 files:**

- Main repository: 46 files
- Submodules:
  - mx-handbook: 1 file
  - mx-gathering: 1 file
  - mx-appendices: 2 files
  - mx-code-examples: 1 file
  - mx-outputs: 1 file
  - external/ucp: 5 files

**Files updated:**

- README.md
- CLAUDE.md
- ONBOARDING.md
- config/system/ (GIT-README.md, HOSTING-*.md, doc-architecture.md, folder-layout.md, etc.)
- docs/structure/ (multiple planning and compliance files)
- packages/web-audit-suite/ (documentation)

### Phase 3: Script Enhancement

Enhanced script to handle repo-root-relative paths (e.g., `docs/for-ai/writing-style.md` without leading `../`). These links start from repository root rather than current directory.

### Phase 4: Automated Updates (Second Pass)

**42 links updated across 21 files:**

- .claude/commands/review-docs.md
- .claude/skills/ (humanizer, review-docs)
- config/system/doc-architecture.md
- packages/web-audit-suite/ documentation
- Submodules: external/ucp (11 files), mx-appendices (1 file), mx-gathering (1 file)

### Phase 5: Manual Path Corrections

Fixed broken relative paths that prevented script processing:

1. **.claude/skills/create-blog/skill.md:**
   - Changed `../../docs/structure/blog-metadata-schema.md` → `../../../docs/structure/blog-metadata-schema.md`
   - Changed `../../config/system/doc-architecture.md` → `../../../config/system/doc-architecture.md`
   - Issue: From `.claude/skills/create-blog/` requires 3 levels up to repo root, not 2

2. **.claude/skills/md-workflow/skill.md:**
   - Changed `../../CLAUDE.md` → `../../../CLAUDE.md`
   - Changed `../../docs/for-ai/writing-style.md` → `../../../docs/for-ai/writing-style.md`
   - Same issue: 3 levels needed, not 2

3. **docs/structure/adr-transformation-guide.md:**
   - Changed `../../packages/shared-appendices/` → `../../packages/mx-appendices/`
   - Issue: Directory was renamed, links not updated

### Phase 6: Automated Updates (Third Pass)

**34 links updated across 16 files** after fixing broken paths:

- .claude/skills/create-blog/skill.md
- .claude/skills/md-workflow/skill.md
- docs/structure/adr-transformation-guide.md
- packages/web-audit-suite/docs/

## Remaining Work

### Broken Links (90 remaining)

These links point to files that don't exist or have incorrect paths. They need manual review:

**Categories:**

1. **Example/Placeholder Links:**
   - docs/for-ai/context-preserving-references-guide.md (contains pattern examples)
   - docs/structure/context-preserving-refs-implementation-plan.md (contains examples)
   - docs/structure/mx-compliance-markdown.md (contains template examples)

2. **Missing Files:**
   - docs/structure/MX-plan.md (referenced in README.md but doesn't exist)
   - docs/vscode-extension-cleanup.md (referenced in ONBOARDING.md)
   - mx-card-system-patent-disclosure.md (referenced in multiple patent docs)
   - mx-card-patent-plan.md (referenced in multiple patent docs)
   - mx-card-nda-template.md (referenced in provisional application)

3. **Incorrect Relative Paths:**
   - config/system/GIT-README.md → `../repo/LEARNINGS.md` (should be `../../LEARNINGS.md`)
   - config/system/doc-architecture.md → `../structure/blog-metadata-schema.md` (should be `../../docs/structure/blog-metadata-schema.md`)

4. **External/HTTP Links:**
   - Several files link to `https://github.com/Digital-Domain-Technologies-Ltd/` URLs
   - These are external links, not local markdown files

5. **Use Case Files (ingest/use-cases/):**
   - Multiple broken links to CMS and MX compliance files
   - Need path corrections or file creation

### Recommended Next Steps

1. **Audit broken links:** Review all 90 broken links and categorize:
   - Delete if file was removed intentionally
   - Fix path if file exists elsewhere
   - Create file if it should exist
   - Keep as example if it's documentation about the pattern itself

2. **Fix incorrect relative paths:** Update paths in:
   - config/system/GIT-README.md
   - config/system/doc-architecture.md
   - ingest/use-cases/*.md files

3. **Remove or update missing file references:**
   - MX-plan.md (update README.md or create file)
   - Patent-related files (create templates or remove links)
   - VSCode extension cleanup doc

4. **Re-run script:** After fixing broken links, run script again to add context-preserving URLs

5. **Validate submodules:** Some submodules may have internal .md links that weren't processed

## Technical Details

### Pattern Format

```markdown
[file](relative-path) ("Document Title" at <absolute-github-url>)
```

**Example:**

```markdown
[README.md](../../README.md) ("MX-Gathering: Community Resources and Thought Leadership" at <https://github.com/Digital-Domain-Technologies-Ltd/MX-Gathering/blob/main/README.md>)
```

### Script Logic

1. Find all markdown links matching `[text](*.md)` without existing context-preserving URLs
2. Skip placeholder patterns (path/to/, http://, https://, example.md)
3. Resolve path (try current-dir-relative, then repo-root-relative)
4. Extract title from target file (YAML frontmatter or H1)
5. Generate GitHub URL: `https://github.com/ddttom/invisible-users/blob/main/{path}`
6. Append: ` ("Title" at <URL>)`

### Why This Matters (Anti-pattern 14)

**Problem:** Relative links break when files are:

- Printed to PDF
- Downloaded individually
- Copied into documentation
- Fed to AI agents
- Shared outside repository context

**Solution:** Dual-reference pattern:

- **For humans in IDEs:** Clickable relative link works normally
- **For external consumption:** Full title and absolute URL provide complete context
- **For AI agents:** Can understand relationships even when file is processed standalone

## Git Workflow

Followed submodule-first workflow:

1. Commit changes in submodules first
2. Update main repository with submodule pointer changes
3. Three separate commits for three passes
4. Manual fixes committed separately

## Validation

To verify context-preserving URLs:

```bash
# Count URLs with pattern
grep -r 'at <https://github.com' --include="*.md" | wc -l

# Find remaining links without URLs
grep -r '\[.*\](.*\.md)' --include="*.md" | grep -v 'at <https://github.com' | wc -l

# Check for broken links
python3 scripts/add-context-urls.py 2>&1 | grep "Warning: Linked file not found"
```

## References

- **Anti-pattern 14:** [packages/mx-appendices/appendix-n-anti-patterns-catalog.md](../../packages/mx-appendices/appendix-n-anti-patterns-catalog.md) ("Appendix N: Anti-Patterns Catalog" at <https://github.com/ddttom/invisible-users/blob/main/packages/mx-appendices/appendix-n-anti-patterns-catalog.md>)
- **Pattern Guide:** [docs/for-ai/context-preserving-references-guide.md](../for-ai/context-preserving-references-guide.md)
- **Implementation Script:** [scripts/add-context-urls.py](../../scripts/add-context-urls.py)

## Commits

1. **First pass:** `5e2ae00` - 68 links, 46 main repo files + submodules
2. **Second pass:** `1c8c317` - 42 links, repo-root-relative paths
3. **Manual fixes:** `23e7edb` - Fixed broken relative paths in skill files
4. **Third pass:** `8408a5b` - 34 links after fixing paths

**Total: 144 automated link additions + manual path corrections**
