# Markdown Workflow Skill

**Command:** `/md-workflow`

**Purpose:** Comprehensive workflow for creating, editing, and linting markdown files with YAML frontmatter awareness.

## What This Skill Does

This skill provides systematic guidance for working with markdown files in this repository, including:

1. **Create**: Set up new markdown files with proper structure
2. **Edit**: Modify existing markdown with correct patterns
3. **Lint**: Validate and auto-fix markdown formatting
4. **YAML Frontmatter**: Handle metadata correctly for different processing contexts

## Understanding YAML Frontmatter

**CRITICAL PRINCIPLE:** Avoid title duplication. If your markdown content has an H1 heading, do NOT include a `title:` field in YAML frontmatter.

### Two Patterns

**Pattern 1: H1 in Content (PREFERRED for most documents)**

Used for: Blog posts, documentation, most markdown files

```markdown
---
author: "Tom Cranstoun"
date: "2026-01-22"
description: "Summary of the document"
keywords: [topic1, topic2]
---

# Document Title  ← H1 in content (single source of truth)

## Section Heading  ← H2, normal hierarchy
```

No `title:` field in frontmatter - the H1 heading serves as the document title.

**Pattern 2: Title in Frontmatter Only (special build processes)**

Used for: Pandoc book chapter generation where frontmatter is rendered into document structure

```markdown
---
title: "Chapter 1: Introduction"  ← Used by Pandoc for chapter heading
author: "Tom Cranstoun"
---

## First Section  ← Starts at H2 (frontmatter title is rendered as H1)
```

No H1 in content - the frontmatter title is rendered by the build process.

### When to Use Each Pattern

**Use Pattern 1 (H1 in content, no title in frontmatter):**
- Blog posts (`outputs/bible/blogs/`)
- Documentation files
- Most markdown content
- When content should be readable without processing
- Avoids MD025 "multiple H1s" warnings

**Use Pattern 2 (title in frontmatter, no H1 in content):**

- Book chapters using Pandoc (`packages/bible/chapters/`, `packages/mx-handbook/chapters/`)
- Frontmatter title is rendered by build process as document structure
- Content starts at H2 level

### Avoiding MD025 Warnings

**OLD PATTERN (caused MD025 warnings):**

```markdown
---
title: "Document Title"  ← Creates duplication
---

# Document Title  ← MD025: Multiple top-level headings
```

**NEW PATTERN (no MD025 warnings):**

```markdown
---
author: "Tom Cranstoun"  ← No title field
---

# Document Title  ← Single H1, no duplication
```

By removing the `title:` field from frontmatter when you have an H1 in content, you avoid redundant duplication and MD025 warnings.

## Markdown Linting Rules

### Project Configuration

This project uses `config/.markdownlint.json` which:

- **Disables MD013**: Line length (prose can exceed 80 characters)
- **Disables MD041**: First line heading (LaTeX `\newpage` commands intentional)
- **Disables MD051**: Link fragments (forward references allowed)
- **Configures MD024**: Duplicate headings (siblings_only mode)

### Key Rules

- **Headings**: Blank lines before/after, ATX-style (###), NOT bold text
- **Lists**: Blank lines before/after
- **Code blocks**: Always specify language (javascript, html, css, json, bash, text)
- **Tables**: Proper spacing around pipes
- **URLs**: Wrap in angle brackets or markdown links
- **MD036**: Never use emphasis for standalone lines (use proper headings)
- **MD024**: Duplicate headings MUST be made unique (cannot be disabled)

### Common Errors and Fixes

**MD024: Duplicate headings**
```markdown
❌ WRONG
## Added
## Added

✅ CORRECT
## Added - Initial Features
## Added - Recent Updates
```

**MD036: Emphasis as heading**
```markdown
❌ WRONG
**About the Author**

✅ CORRECT
## About the Author
```

**MD040: Missing code block language**
```markdown
❌ WRONG
```
npm install
```

✅ CORRECT
```bash
npm install
```
```

## Workflow Steps

### Creating New Markdown Files

**Step 1: Determine if YAML frontmatter is needed**

Add frontmatter for:
- Blog posts
- Documentation pages
- Files processed to HTML
- Files needing metadata tracking

**Step 2: Add appropriate frontmatter**

```yaml
---
title: "Document Title"
author: "Tom Cranstoun"
date: "2026-01-22"
description: "Brief description"
keywords: [keyword1, keyword2]
ai-instruction: |
  Instructions for AI agents parsing this document.
  Follow repository patterns and guidelines.
---
```

**Step 3: Start content with correct heading level**

- H1 (#) if frontmatter is metadata-only
- Check build process if unsure

**Step 4: Follow markdown linting rules**

- Blank lines around headings
- Blank lines around lists
- Specify code block languages
- Use proper heading syntax (not bold text)

### Editing Existing Markdown Files

**Step 1: Read the entire file first**

The Edit tool REQUIRES reading files before editing. Check for:
- Existing YAML frontmatter
- Current heading structure
- Markdown patterns in use

**Step 2: Identify frontmatter processing mode**

Check file location and purpose:
- Blog posts (`outputs/bible/blogs/`) → Metadata-only, use H1
- Book chapters (`packages/*/chapters/`) → Check build system
- Documentation (`docs/`) → Usually metadata-only, use H1

**Step 3: Make edits following existing patterns**

Maintain:
- YAML frontmatter format (if present)
- Heading hierarchy
- Code block language specifications
- British English spelling

**Step 4: Run markdown linting**

After edits:
```bash
npm run lint:markdown:fix
npm run lint:markdown
```

### Linting Markdown Files

**Quick lint and fix:**
```bash
npm run lint:markdown:fix  # Auto-fix issues
npm run lint:markdown      # Verify all issues resolved
```

**Lint specific file:**
```bash
npx markdownlint --config config/.markdownlint.json path/to/file.md
```

**Files excluded from linting:**
- `.claude/skills/` - Skills have own formatting requirements
- `packages/*/` - Submodules (linted in their own repos)
- `outputs/` - Submodule (not included in main repo linting)

## Important Exceptions

### Skill Files

NEVER fix markdown linting issues in `.claude/skills/` files. These are excluded from linting via `--ignore .claude` flag and have their own formatting requirements.

### Blog Posts

Files in `outputs/bible/blogs/` and other processed markdown:
- Use YAML frontmatter for metadata only
- First content heading MUST be H1
- MD025 warnings are expected and correct

### Book Chapters

Files with `ai-instruction` field in frontmatter:
- Follow timeless manuscript rule (see CLAUDE.md line 248)
- Never include publication dates about the book itself
- Use definitive present tense

## Integration with Other Skills

**Use `/review-docs` for style guide compliance**
```bash
/review-docs path/to/file.md
```

**Use `/md-fix` for quick linting**
```bash
/md-fix  # Runs npm run lint:markdown:fix
```

**Use `/step-commit` for systematic commits**
```bash
/step-commit  # Includes markdown linting as step 2
```

## Troubleshooting

### "Multiple top-level headings" (MD025)

If file has YAML frontmatter:
1. Check if frontmatter is metadata-only (blog, HTML generation)
2. If yes, first content heading MUST be H1 (warning is expected)
3. If no, consider starting at H2 (rare, check build process)

### "Emphasis used instead of a heading" (MD036)

Replace bold text with proper headings:
```markdown
❌ **Section Title**
✅ ## Section Title
```

### "Fenced code blocks should have a language"

Add language specification:
```markdown
❌ ```
    code here
   ```

✅ ```javascript
    code here
   ```
```

## Quick Reference

**Common npm commands:**
```bash
npm run lint:markdown          # Check markdown files
npm run lint:markdown:fix      # Auto-fix markdown files
npm run lint:markdown:all      # Check all markdown (including ignored)
```

**File patterns:**
```bash
# Blog posts - YAML + H1
outputs/bible/blogs/*.md

# Book chapters - Check build system
packages/*/chapters/*.md

# Documentation - Usually YAML + H1
docs/**/*.md
```

**Config files:**
```bash
config/.markdownlint.json      # Linting rules
docs/for-ai/writing-style.md   # Style guide
CLAUDE.md                       # Complete guidance
```

## See Also

- [CLAUDE.md](../../CLAUDE.md) - Complete repository guidance
- [docs/for-ai/writing-style.md](../../docs/for-ai/writing-style.md) - Writing style guide
- [config/.markdownlint.json](../../config/.markdownlint.json) - Linting configuration
- `/review-docs` skill - Style guide compliance
- `/md-fix` skill - Quick linting
- `/step-commit` skill - Systematic commits with linting
