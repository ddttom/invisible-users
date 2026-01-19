Review documents against the writing style guide and propose amendments.

**Usage:**

```bash
/review-docs [file paths...]
```

**What it does:**

1. Loads the complete writing style guide
2. Analyzes your documents against all style rules
3. Identifies violations by category (Critical, Important, Style, Markdown)
4. Proposes specific fixes with line numbers
5. Asks how you want to proceed

**Examples:**

```bash
# Review single file
/review-docs packages/bible/chapters/chapter-00-what-are-ai-agents.md

# Review multiple files
/review-docs chapter-01.md chapter-02.md chapter-03.md

# Review with glob patterns
/review-docs packages/bible/chapters/chapter-*.md

# Review any file (not limited to manuscript)
/review-docs docs/web-audit-architecture.md

# Review HTML files
/review-docs packages/shared-appendices/web/back-cover.html
```

**What it checks:**

- **Forbidden vocabulary** (23 words like "delve", "leverage", "robust")
- **Forbidden constructs** (14 patterns like "It's not just X, it's Y")
- **Heading format** (no colons, no "The..." prefix)
- **British English** (colour, organise, whilst)
- **Voice and tone** (active voice, no superlatives)
- **Markdown quality** (code block languages, duplicate headings, bare URLs)

**Priority levels:**

- **Critical** - Must fix (forbidden vocabulary, constructs, heading format)
- **Important** - Should fix (language, voice, terminology)
- **Style** - Recommend fix (tone, phrasing improvements)
- **Markdown** - Technical fixes (linting compliance)

**After review:**

You can choose to:

- Apply all fixes automatically
- Apply only Critical fixes
- Review specific categories before applying
- Skip files you don't want to change

**See also:**

- [docs/for-ai/writing-style.md](docs/for-ai/writing-style.md) - Complete style guide
- `.claude/skills/review-docs/checklist.md` - Quick reference of all rules
- `.claude/skills/review-docs/examples.md` - Before/after examples
