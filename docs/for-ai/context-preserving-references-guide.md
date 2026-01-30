# Context-Preserving References Implementation Guide

---
mx:
  purpose: "Quick reference guide for implementing context-preserving cross-document references (MX Principle 5)"
  audience: both
  stability: stable
  version: "1.0.0"
  last_updated: "2026-01-30"
  ai:
    context_provides:
      - context-preserving-references
      - implementation-guide
      - mx-principle-5
    editable: true
    assistance: welcome
    context_required:
      - mx-principles-for-repos.md
      - ../../CLAUDE.md
  related_files:
    - mx-principles-for-repos.md
    - ../../CLAUDE.md
    - ../structure/context-preserving-refs-implementation-plan.md
  see_also: "See context-preserving-refs-implementation-plan.md for complete implementation plan with phases and effort estimates"
---

## The Problem

Relative-only links break when documents are separated from their repository context:

```markdown
❌ [file.md](../../path/to/file.md)
```

**Why this fails:**
- Documents extracted to PDF lose context
- Files downloaded/copied can't resolve paths
- Humans struggle to parse complex relative paths
- AI agents burn tokens reconstructing structure

## The Solution

**Context-Preserving Pattern:**

```markdown
✅ [filename](relative/path/file.md) ("Document Title" at <https://github.com/org/repo/blob/main/relative/path/file.md>)
```

**What this provides:**
- IDE: Relative link works for navigation
- Extracted: Absolute URL provides full context
- Humans: Zero cognitive load with explicit title
- AI: Zero token cost - no path reconstruction needed

## Repository-Scoped References

**CRITICAL PRINCIPLE:** Each repository references only its own files.

**NOT cross-repository links:**
- Main repo → only main repo files
- Submodule → only files within that submodule
- Self-contained, no dependencies between repos

**Benefits:**
- Cleaner separation of concerns
- No broken cross-repo dependencies
- Each repo is independently understandable
- Extracted documents are self-sufficient

## Implementation Pattern

### For Main Repository

**Base URL:** `https://github.com/ddttom/invisible-users/blob/main/`

**Example:**
```markdown
See [repo-philosophy.md](config/system/repo-philosophy.md) ("Repository Philosophy & Design Principles" at <https://github.com/ddttom/invisible-users/blob/main/config/system/repo-philosophy.md>)
```

### For Submodules

Each submodule uses its own repository URL.

**Example for MX-Gathering:**
```markdown
Base URL: https://github.com/Digital-Domain-Technologies-Ltd/MX-Gathering/blob/main/

Reference:
[CONTRIBUTING.md](CONTRIBUTING.md) ("Contribution Guidelines" at <https://github.com/Digital-Domain-Technologies-Ltd/MX-Gathering/blob/main/CONTRIBUTING.md>)
```

**Example for MX-Bible:**
```markdown
Base URL: https://github.com/ddttom/invisible-users-manuscript/blob/main/

Reference:
[chapter-01.md](manuscripts/chapter-01.md) ("Chapter 1: Introduction" at <https://github.com/ddttom/invisible-users-manuscript/blob/main/manuscripts/chapter-01.md>)
```

## When to Apply

**✅ Apply pattern to:**
- All cross-document references within same repository
- README files referencing documentation
- Documentation referencing other docs
- YAML frontmatter `related_files`
- Any link to another markdown file in same repo

**❌ Do NOT apply to:**
- Internal section anchors (`#heading-id`)
- External links (already absolute)
- Code examples (non-navigable references)

## Step-by-Step Process

### 1. Find Cross-Document References

```bash
# In repository root
grep -r '\[.*\](.*\.md)' --include="*.md" . | grep -v '#' | grep -v 'http'
```

### 2. For Each Reference

1. **Identify target file:** Extract the relative path
2. **Read target file:** Get H1 heading or YAML `title:` field
3. **Construct absolute URL:** Repository URL + file path from repo root
4. **Apply pattern:** `[filename](rel-path) ("Title" at <absolute-url>)`
5. **Verify:** Test relative link works, absolute URL resolves

### 3. Commit Changes

```bash
git add changed-files.md
git commit -m "Apply context-preserving references (MX Principle 5)

Update cross-document references to include document titles and
absolute URLs for context preservation when files are extracted.

Pattern: [file](path) (\"Title\" at <url>)

- Relative links work in IDE
- Absolute URLs work when extracted
- Zero cognitive load for humans
- Zero token cost for AI agents"
```

## Repository URLs Reference

**Main Repository:**
- `https://github.com/ddttom/invisible-users/blob/main/`

**Content Submodules:**
- MX-Bible: `https://github.com/ddttom/invisible-users-manuscript/blob/main/`
- MX-Handbook: `https://github.com/Digital-Domain-Technologies-Ltd/MX-The-Handbook/blob/main/`
- MX-Gathering: `https://github.com/Digital-Domain-Technologies-Ltd/MX-Gathering/blob/main/`
- MX-Appendices: `https://github.com/ddttom/invisible-users-appendices/blob/main/`
- MX-Code-Examples: `https://github.com/ddttom/invisible-users-code-examples/blob/main/`

**Private Submodules:**
- MX-Outputs: `https://github.com/ddttom/invisible-users-outputs/blob/main/`
- MX-Business: `https://github.com/Digital-Domain-Technologies-Ltd/MX-business-planning/blob/main/`
- MX-Sales-Enablement: `https://github.com/ddttom/MX-Sales-enablement/blob/main/`

**Reference Submodules:**
- Notes: `https://github.com/ddttom/Notes/blob/main/`

## Validation Checklist

After updating a file:

- [ ] Relative links still work in IDE (click to verify)
- [ ] Absolute URLs resolve correctly (test in browser)
- [ ] Document titles match target files
- [ ] Pattern syntax is correct
- [ ] No internal anchors accidentally modified
- [ ] No external links accidentally modified
- [ ] File still builds/generates correctly

## Common Pitfalls

**❌ Wrong:** Cross-repository reference
```markdown
[submodule-file](packages/mx-the-bible/chapter-01.md)
```

**✅ Correct:** Each repo references only itself
- Main repo: Don't reference submodule files
- Submodule: Don't reference main repo or other submodules

**❌ Wrong:** Missing document title
```markdown
[file.md](path/file.md) (<https://github.com/org/repo/blob/main/path/file.md>)
```

**✅ Correct:** Include explicit title
```markdown
[file.md](path/file.md) ("Document Title" at <https://github.com/org/repo/blob/main/path/file.md>)
```

## Benefits

**Spend tokens now to save tokens/CPU/energy later:**

- **For humans:** Zero cognitive load parsing paths
- **For AI:** Zero token cost reconstructing structure
- **For extraction:** Documents work outside repository
- **For maintenance:** Self-documenting references
- **For energy:** Less computation = less energy usage

## Related Documentation

- **MX Principle 5:** [mx-principles-for-repos.md](mx-principles-for-repos.md#5-context-preserving-references) ("MX Principles for Repositories" at <https://github.com/ddttom/invisible-users/blob/main/docs/for-ai/mx-principles-for-repos.md#5-context-preserving-references>) - Complete principle documentation
- **CLAUDE.md Guidance:** [CLAUDE.md](../../CLAUDE.md#context-preserving-cross-document-references) ("CLAUDE.md - AI Assistant Project Guide" at <https://github.com/ddttom/invisible-users/blob/main/CLAUDE.md#context-preserving-cross-document-references>) - Critical guidance for AI assistants
- **Full Implementation Plan:** [context-preserving-refs-implementation-plan.md](../structure/context-preserving-refs-implementation-plan.md) ("Context-Preserving References Implementation Plan" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/context-preserving-refs-implementation-plan.md>) - Detailed phases and effort estimates
- **Repository Philosophy:** [repo-philosophy.md](../../config/system/repo-philosophy.md) ("Repository Philosophy & Design Principles" at <https://github.com/ddttom/invisible-users/blob/main/config/system/repo-philosophy.md>) - Design principles and rationale

---

**Status:** Active implementation guidance
**Applies to:** All repositories in workspace (except external references)
**Enforcement:** Documented in CLAUDE.md as critical guidance
