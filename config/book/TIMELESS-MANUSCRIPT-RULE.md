# Timeless Manuscript Rule - Implementation Summary

## The Problem You Identified

Book manuscript files were incorrectly including temporal language like:

- "launching April 2, 2026"
- "We have added..."
- "This update includes..."
- Future-tense statements about the book itself

**Critical principle:** Book manuscripts must be written as if they've always existed, with no meta-commentary about publication dates or development process.

## Solution Implemented

### 1. Documentation Updated

#### [docs/for-ai/writing-style.md](../for-ai/writing-style.md) ("Writing Style Guide for MX Books" at <https://github.com/ddttom/invisible-users/blob/main/docs/for-ai/writing-style.md>)

Added **Section 3: Timeless Manuscript Rule** with explicit guidance:

**NEVER include:**

- Publication dates or launch dates about the book itself
- "This update includes..." or "We have added..."
- "New in this version..." or "Recently launched..."
- Future-tense statements about the book
- Meta-commentary about the writing process

**ALWAYS write:**

- Definitive present tense: "The analysis provides..." not "We added analysis..."
- Timeless descriptions: "This book is part of a two-book series:" not "launching April 2, 2026"
- Established fact tone: Features described as if they've always existed

**Exception:** Historical context about *subject matter* is allowed (e.g., "Google launched UCP in January 2026" describes an industry event, not the book)

#### [CLAUDE.md](../../CLAUDE.md) ("CLAUDE.md - AI Assistant Project Guide" at <https://github.com/ddttom/invisible-users/blob/main/CLAUDE.md>)

Added comprehensive **"CRITICAL WRITING REQUIREMENT - Timeless Manuscript Rule"** section:

- Lists all affected directories (`packages/bible/chapters/`, `packages/shared-appendices/`, `docs/shared-chapters/`)
- Specifies forbidden patterns
- Defines required present-tense writing style
- Requires YAML frontmatter with `ai-instruction` field

### 2. YAML Frontmatter Template Created

#### [docs/for-ai/yaml-frontmatter-template.md](../for-ai/yaml-frontmatter-template.md) ("YAML Frontmatter Template for Book Manuscripts" at <https://github.com/ddttom/invisible-users/blob/main/docs/for-ai/yaml-frontmatter-template.md>)

Complete template for book manuscript frontmatter with:

**Required fields:**

- `title` - Chapter title
- `author` - Always "Tom Cranstoun"
- `date` - Last modification date (YYYY-MM-DD)
- `description` - Brief chapter summary
- `keywords` - Array of relevant topics
- `book` - Which book (MX-Bible, MX-Don't Make the AI Think, MX-Handbook)
- `chapter` - Chapter number
- `wordcount` - Approximate word count
- **`ai-instruction`** - **CRITICAL FIELD** containing timeless manuscript rule

**Standard ai-instruction text:**

```yaml
ai-instruction: |
  This is a book manuscript chapter. Write as if it has always existed.
  NEVER include: publication dates, "we added", "new feature", "launching",
  "this update", or any meta-commentary about the book's development.
  Write definitive present tense. Historical context about subject matter
  (industry events, product launches) is allowed.
```

## Remaining Work

### Immediate (High Priority)

1. **Fix Chapter 0** - Remove "launching April 2, 2026" and similar language
   - [docs/shared-chapters/chapter-00-what-are-ai-agents.md](../../docs/shared-chapters/chapter-00-what-are-ai-agents.md) ("Chapter 0: What Are AI Agents?" at <https://github.com/ddttom/invisible-users/blob/main/docs/shared-chapters/chapter-00-what-are-ai-agents.md>) - Line 188

2. **Add YAML frontmatter to all book chapters** - Systematic rollout:
   - `packages/bible/chapters/*.md` (13 chapters)
   - `packages/shared-appendices/appendix-*.md` (12 appendices)
   - `docs/shared-chapters/chapter-00-what-are-ai-agents.md` (1 chapter)

### Secondary (Medium Priority)

1. **Update /review-docs skill** - Add check for timeless manuscript rule violations:
   - Scan for forbidden patterns ("launching", "we added", "this update")
   - Verify YAML frontmatter exists in book files
   - Check ai-instruction field is present

2. **Create pre-tool-use.sh hook reminder** - Add warning when editing book files:

   ```bash
   # If editing book manuscript file, remind about timeless rule
   if [[ "$file" =~ (packages/(bible|shared-appendices)/|docs/shared-chapters/) ]]; then
     echo "⚠️  BOOK MANUSCRIPT: Write as if it has always existed (no publication dates/launch dates)"
   fi
   ```

### Ongoing

1. **Audit existing chapters** - Search for and fix violations:

   ```bash
   # Find potential violations in book files
   grep -r "launching\|we added\|this update\|new feature\|recently launched" \
     packages/bible/chapters/ \
     packages/shared-appendices/ \
     docs/shared-chapters/
   ```

2. **Update related documentation**:
   - Add note to README files in each package
   - Update contribution guidelines if they exist
   - Add example to book-specific documentation

## Benefits

1. **Professional tone** - Books read as authoritative references, not work-in-progress
2. **Timeless content** - No dated references to make content feel stale
3. **AI-friendly metadata** - YAML frontmatter helps AI systems parse correctly
4. **Consistent enforcement** - Rule documented in multiple locations
5. **Automated validation** - Can be checked programmatically via hooks and skills

## Verification Commands

```bash
# Search for violation patterns in all book files
grep -rn "launching.*202[0-9]" packages/*/chapters/ docs/shared-chapters/
grep -rn "we.*added\|this update\|new feature" packages/*/chapters/ docs/shared-chapters/

# Count files with YAML frontmatter
find packages/*/chapters/ docs/shared-chapters/ -name "*.md" -exec grep -l "^---$" {} \; | wc -l
```

## Related Documentation

- [Writing Style Guide](../for-ai/writing-style.md) ("Writing Style Guide for MX Books" at <https://github.com/ddttom/invisible-users/blob/main/docs/for-ai/writing-style.md>) - Section 3: Core Writing Rules
- [YAML Frontmatter Template](../for-ai/yaml-frontmatter-template.md) ("YAML Frontmatter Template for Book Manuscripts" at <https://github.com/ddttom/invisible-users/blob/main/docs/for-ai/yaml-frontmatter-template.md>) - Complete template and examples
- [CLAUDE.md](../../CLAUDE.md) ("CLAUDE.md - AI Assistant Project Guide" at <https://github.com/ddttom/invisible-users/blob/main/CLAUDE.md>) - Section: CRITICAL WRITING REQUIREMENT
- [GIT-README.md](../system/GIT-README.md) ("Git Workflow Guide for AI Agents" at <https://github.com/ddttom/invisible-users/blob/main/config/system/GIT-README.md>) - Git workflow for multi-repository structure

## Questions?

If unclear about whether language violates the timeless manuscript rule, ask:

1. Does this reference when the book was written/published?
2. Does this describe the book's development process?
3. Could this become dated or outdated?

If yes to any question → rewrite in timeless present tense.

**Good:** "This book is part of a three-book series:"
**Bad:** "This book launches April 2, 2026 as part of a three-book series:"
