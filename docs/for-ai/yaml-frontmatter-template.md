# YAML Frontmatter Template for Book Manuscripts

## Standard Template for All Book Chapters

```yaml
---
author: "Tom Cranstoun"
date: "YYYY-MM-DD"
description: "Brief chapter summary (1-2 sentences)"
keywords: [keyword1, keyword2, keyword3]
book: "The MX Bible"  # or "Don't Make the AI Think" or "The MX Handbook"
chapter: N
wordcount: NNNN
ai-instruction: |
  This is a book manuscript chapter. Write as if it has always existed.
  NEVER include: publication dates, "we added", "new feature", "launching",
  "this update", or any meta-commentary about the book's development.
  Write definitive present tense. Historical context about subject matter
  (industry events, product launches) is allowed.
---

# Chapter N: Chapter Title
```

**Note:** The H1 heading stays in the markdown content, NOT in the YAML frontmatter. This avoids MD025 (multiple H1) linting errors.

## Field Descriptions

### Required Fields

**author:** Always `"Tom Cranstoun"`

**date:** Last modification date in ISO format

- Format: `"YYYY-MM-DD"`
- Example: `"2026-01-22"`
- Update whenever file content changes

**description:** Brief chapter summary

- 1-2 sentences
- Describes chapter purpose and scope
- Example: `"Explores patterns that need optimization for AI agents and shows how these same patterns affect users with disabilities"`

**keywords:** Array of relevant topics

- 3-8 keywords
- Lowercase unless proper nouns
- Example: `[ai-agents, web-accessibility, semantic-html, schema-org]`

**book:** Which book this chapter belongs to

- Values: `"The MX Bible"`, `"Don't Make the AI Think"`, or `"The MX Handbook"`
- Use exact book title
- Use `"Shared"` for Chapter 0 and shared content

**chapter:** Chapter number (integer or letter)

- Examples: `0`, `1`, `2`, `3`, or `"A"`, `"B"` for appendices
- Use `0` for preface/Chapter 0

**wordcount:** Approximate word count (integer)

- Update after major edits
- Use `wc -w filename.md` to calculate
- Example: `4750`

**ai-instruction:** **CRITICAL - MUST BE INCLUDED**

- Multi-line string using `|` YAML syntax
- Contains the timeless manuscript rule
- Copy exactly from template above
- This field ensures AI systems understand writing constraints

### Optional Fields

**longdescription:** Extended chapter summary (paragraph length)

- Use for complex chapters needing more context
- Example: See Chapter 0 frontmatter

**purpose:** Intended use or goal of the chapter

- Example: `"Educational content introducing AI agents concept"`

**status:** Draft status indicator

- Values: `draft`, `review`, `ready`, `published`
- Omit if not tracking status

## Examples

### Chapter 0 (Shared across books)

```yaml
---
author: "Tom Cranstoun"
date: "2026-01-22"
description: "Understanding AI agents as machines with technical capabilities and limitations that parallel human disabilities"
keywords: [ai-agents, web-accessibility, metadata, semantic-html]
book: "Shared"
chapter: 0
wordcount: 4750
ai-instruction: |
  This is a book manuscript chapter. Write as if it has always existed.
  NEVER include: publication dates, "we added", "new feature", "launching",
  "this update", or any meta-commentary about the book's development.
  Write definitive present tense. Historical context about subject matter
  (industry events, product launches) is allowed.
longdescription: "This introductory chapter traces the journey from observing AI failures to understanding the solution: fixing websites rather than fixing models. Through personal narrative and concrete examples (Danube cruise pricing errors, Ally McBeal legal citations), it introduces the concept of \"invisible users\" - AI agents operating on behalf of humans - and establishes the convergence principle: patterns that help AI agents are the same patterns that help users with disabilities."
purpose: "This chapter serves as the book's anchor, explaining what AI agents are through the lens of personal discovery and establishing the core principle that designing for AI agents means designing for accessibility."
---

# Chapter 0 - What Are AI Agents?
```

### Bible Chapter Example

```yaml
---
author: "Tom Cranstoun"
date: "2026-01-22"
description: "Real examples of patterns that need optimization for AI agents and how these patterns also affect users with disabilities"
keywords: [web-patterns, ai-agents, accessibility, convergence-principle]
book: "The MX Bible"
chapter: 1
wordcount: 8200
ai-instruction: |
  This is a book manuscript chapter. Write as if it has always existed.
  NEVER include: publication dates, "we added", "new feature", "launching",
  "this update", or any meta-commentary about the book's development.
  Write definitive present tense. Historical context about subject matter
  (industry events, product launches) is allowed.
---

# Chapter 1: The Patterns That Need Optimization
```

### Don't Make the AI Think Chapter Example

```yaml
---
author: "Tom Cranstoun"
date: "2026-01-22"
description: "Technical explanation of how different AI agent types process HTML and why semantic structure matters"
keywords: [html-parsing, semantic-html, ai-agents, dom-structure]
book: "Don't Make the AI Think"
chapter: 2
wordcount: 3500
ai-instruction: |
  This is a book manuscript chapter. Write as if it has always existed.
  NEVER include: publication dates, "we added", "new feature", "launching",
  "this update", or any meta-commentary about the book's development.
  Write definitive present tense. Historical context about subject matter
  (industry events, product launches) is allowed.
---

# Chapter 2: How AI Reads HTML
```

### Preface Example

```yaml
---
author: "Tom Cranstoun"
date: "2026-01-22"
description: "Introduction to the book's purpose, structure, and how to use it effectively"
keywords: [preface, book-structure, reading-guide]
book: "Don't Make the AI Think"
chapter: 0
wordcount: 850
ai-instruction: |
  This is a book manuscript chapter. Write as if it has always existed.
  NEVER include: publication dates, "we added", "new feature", "launching",
  "this update", or any meta-commentary about the book's development.
  Write definitive present tense. Historical context about subject matter
  (industry events, product launches) is allowed.
---

# Preface
```

### Appendix Example

```yaml
---
author: "Tom Cranstoun"
date: "2026-01-22"
description: "Practical patterns for creating HTML that works optimally for AI agents and screen readers"
keywords: [html-patterns, semantic-html, accessibility, code-examples]
book: "Shared"
chapter: "A"
wordcount: 5200
ai-instruction: |
  This is a book manuscript chapter. Write as if it has always existed.
  NEVER include: publication dates, "we added", "new feature", "launching",
  "this update", or any meta-commentary about the book's development.
  Write definitive present tense. Historical context about subject matter
  (industry events, product launches) is allowed.
---

# Appendix A: AI-Friendly HTML Patterns Cookbook
```

## Implementation Checklist

When adding frontmatter to existing files:

1. **Place at very top** - Before any other content (before any `\newpage` commands)
2. **Include all required fields** - See list above
3. **Copy ai-instruction exactly** - From template
4. **Keep H1 in content** - Do NOT duplicate title in YAML frontmatter (avoids redundancy)
5. **Calculate wordcount** - Use `wc -w filename.md`
6. **Set correct book value** - Bible, MX-Don't Make the AI Think, or Handbook (or "Shared")
7. **Update date field** - Use ISO format (YYYY-MM-DD)
8. **Write clear description** - 1-2 sentences summarizing chapter
9. **Choose relevant keywords** - 3-8 keywords covering main topics

## Validation

After adding frontmatter:

```bash
# Verify YAML syntax is valid
npx js-yaml path/to/file.md

# Run markdown linting (should pass with frontmatter)
npx markdownlint -c config/.markdownlint.json path/to/file.md

# Check word count matches
wc -w path/to/file.md
```

## Related Documentation

- [Writing Style Guide](writing-style.md) - Complete writing guidelines
- [CLAUDE.md](../../CLAUDE.md) - Project-wide AI assistant guidance
- Appendix L (Pattern 4) - YAML frontmatter implementation guide
- Appendix H - Example llms.txt with YAML frontmatter
