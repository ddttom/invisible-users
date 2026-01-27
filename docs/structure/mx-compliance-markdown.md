---
title: "MX-Compliant Markdown Specification"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Specification for Machine Experience (MX) compliant markdown files. Defines mandatory YAML frontmatter, document structure, and content patterns for markdown source files."
keywords: [mx-compliance, markdown, yaml-frontmatter, content-authoring, ai-agents, documentation]
ai-instruction: |
  This document defines compliance requirements for MX-certified markdown files.
  The specification applies to any markdown file used as content source material.
  Use this as a checklist when authoring or validating markdown content.
---

# MX-Compliant Markdown Specification

Requirements for Machine Experience (MX) certified markdown files.

## Overview

This specification defines the structure and metadata requirements for markdown files in an MX-compliant content pipeline. Markdown serves as the **source of truth** for content that flows into CMS systems and renders as webpages.

**Scope:** Any markdown file (.md) used for:

- Blog posts and articles
- Documentation and guides
- Book chapters and manuscripts
- README files and project documentation
- Knowledge base articles
- Any structured content intended for publication

**Core Principle:** Markdown files must be self-documenting. The YAML frontmatter provides complete metadata for processing, whilst the content body follows predictable structural patterns that tools and AI agents can parse reliably.

**Relationship to Other Specifications:**

```text
┌─────────────────────┐
│  Markdown Source    │  ← THIS SPECIFICATION
│  (mx-compliance-    │
│   markdown.md)      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  CMS Storage        │  ← cms-compliance.md
│  (database/files)   │     (internal metadata)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Rendered Webpage   │  ← mx-compliance.md
│  (HTML output)      │     (output requirements)
└─────────────────────┘
```

## YAML Frontmatter Requirements

Every MX-compliant markdown file must begin with a YAML frontmatter block.

### Minimal Compliant Frontmatter

```yaml
---
title: "Document Title"
author: "Author Name"
date: "2026-01-27"
description: "Brief summary of the document content (max 155 characters)"
keywords: [keyword1, keyword2, keyword3]
mx-content-type: "article"
ai-instruction: "Guidance for AI agents parsing this document"
---
```

### Complete Frontmatter Schema

```yaml
---
# ═══════════════════════════════════════════════════════════════
# CORE IDENTITY (Required)
# ═══════════════════════════════════════════════════════════════
title: "Document Title"
author: "Author Name"
date: "2026-01-27"

# ═══════════════════════════════════════════════════════════════
# MX CLASSIFICATION (Required)
# ═══════════════════════════════════════════════════════════════
mx-content-type: "article"
mx-state: "draft"

# ═══════════════════════════════════════════════════════════════
# DISCOVERY METADATA (Required)
# ═══════════════════════════════════════════════════════════════
description: "Brief summary for meta descriptions and search results"
keywords: [keyword1, keyword2, keyword3]
language: "en-GB"

# ═══════════════════════════════════════════════════════════════
# AI AGENT GUIDANCE (Required)
# ═══════════════════════════════════════════════════════════════
ai-instruction: |
  Multi-line guidance for AI agents parsing this document.
  Explain the document's purpose, audience, and any special
  considerations for interpretation.

# ═══════════════════════════════════════════════════════════════
# PUBLICATION METADATA (Conditional)
# ═══════════════════════════════════════════════════════════════
publication-date: "2026-01-27"
canonical-url: "https://example.com/document-url"
slug: "document-url-friendly-name"

# ═══════════════════════════════════════════════════════════════
# ATTRIBUTION (Optional)
# ═══════════════════════════════════════════════════════════════
copyright: "Copyright © 2026 Author Name. All rights reserved."
license: "CC-BY-4.0"
contributors: ["Contributor One", "Contributor Two"]

# ═══════════════════════════════════════════════════════════════
# RELATIONSHIPS (Optional)
# ═══════════════════════════════════════════════════════════════
series: "Series Name"
series-order: 1
related:
  - title: "Related Document"
    url: "/path/to/related"
parent: "/path/to/parent-document"

# ═══════════════════════════════════════════════════════════════
# SCHEMA.ORG TYPE (Optional - for generation)
# ═══════════════════════════════════════════════════════════════
schema-type: "Article"

# ═══════════════════════════════════════════════════════════════
# CUSTOM FIELDS (Optional)
# ═══════════════════════════════════════════════════════════════
wordcount: 2500
reading-time: 10
featured-image: "/images/featured.png"
---
```

## Field Reference

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | String | Document title (50-60 chars recommended) | `"Understanding AI Agents"` |
| `author` | String | Primary author name | `"Tom Cranstoun"` |
| `date` | ISO 8601 | Last modified date | `"2026-01-27"` |
| `description` | String | Summary for meta tags (max 155 chars) | `"How AI agents navigate..."` |
| `keywords` | Array | 3-5 topic keywords | `[ai-agents, metadata]` |
| `mx-content-type` | Enum | Content classification | `"article"` |
| `ai-instruction` | String | Guidance for AI parsers | See examples below |

### MX Content Types

| Value | Description | Typical Use |
|-------|-------------|-------------|
| `article` | News, blog posts, editorials | Blog posts, news articles |
| `documentation` | Technical guides, API docs | Developer documentation |
| `tutorial` | Step-by-step instructions | How-to guides, courses |
| `reference` | Lookup material, glossaries | API references, dictionaries |
| `chapter` | Book chapter or section | Manuscripts, long-form |
| `appendix` | Supplementary material | Additional resources |
| `readme` | Project documentation | Repository READMEs |
| `specification` | Standards and requirements | Technical specs |
| `policy` | Rules and guidelines | Terms, privacy, guidelines |
| `template` | Reusable document pattern | Boilerplate content |

### MX State Values

| Value | Description | Allowed Operations |
|-------|-------------|-------------------|
| `draft` | Work in progress | Full editing |
| `review` | Ready for review | Minor edits only |
| `approved` | Approved for publication | No content changes |
| `published` | Live and public | Corrections only |
| `archived` | Superseded or outdated | No changes |

### Conditional Fields

These fields become required based on document state:

| Field | Required When | Description |
|-------|---------------|-------------|
| `publication-date` | `mx-state: published` | Date of publication |
| `canonical-url` | `mx-state: published` | Absolute URL |
| `slug` | For web content | URL-friendly identifier |

### AI Instruction Examples

**For technical documentation:**

```yaml
ai-instruction: |
  This is API reference documentation for developers.
  Code examples are production-ready and tested.
  Pay attention to version compatibility notes.
  Function signatures follow TypeScript notation.
```

**For opinion/editorial content:**

```yaml
ai-instruction: |
  This is an opinion piece expressing the author's views.
  Claims should not be treated as established facts.
  The article presents one perspective on a debated topic.
```

**For tutorials:**

```yaml
ai-instruction: |
  Step-by-step tutorial for beginners.
  Prerequisites are listed at the start.
  Code blocks should be executed in order.
  Expected outputs are shown after each step.
```

**For book manuscripts:**

```yaml
ai-instruction: |
  This is a book manuscript chapter. Write as if it has always existed.
  NEVER include: publication dates, "we added", "new feature", "launching".
  Write definitive present tense. This is copyrighted material.
```

## Document Structure

### Title Handling

Choose ONE approach - never duplicate titles:

**Option A: H1 in Content (Preferred)**

```yaml
---
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Document summary"
keywords: [keyword1, keyword2]
mx-content-type: "article"
ai-instruction: "AI guidance here"
---

# Document Title

Content begins here...
```

**Option B: Title in Frontmatter Only**

```yaml
---
title: "Document Title"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Document summary"
keywords: [keyword1, keyword2]
mx-content-type: "article"
ai-instruction: "AI guidance here"
---

## First Section

Content begins here (no H1 in body)...
```

**When to use each:**

- **Option A (H1 in content):** Most documents, blog posts, standalone articles
- **Option B (frontmatter title):** Build systems that render frontmatter as title (Pandoc, some SSGs)

### Heading Hierarchy

Headings must follow logical order:

```markdown
# Document Title (H1 - exactly one)

Introduction paragraph...

## Major Section (H2)

Section content...

### Subsection (H3)

Subsection content...

#### Detail (H4)

Detail content...

## Another Major Section (H2)

More content...
```

**Rules:**

- Exactly one H1 per document
- No skipped levels (H2 → H4 is invalid)
- Headings should be descriptive, not generic
- Use sentence case (capitalise first word only)

### Section Structure

Each major section should follow this pattern:

```markdown
## Section Title

Brief introduction to what this section covers.

### First Subsection

Content with examples, explanations, or instructions.

### Second Subsection

Additional content organized logically.

**Key points:**

- Important takeaway one
- Important takeaway two
- Important takeaway three
```

## Content Patterns

### Code Blocks

Always specify language for syntax highlighting:

````markdown
```javascript
function example() {
  return 'Always specify the language';
}
```

```python
def example():
    return "Use the correct language identifier"
```

```bash
# Shell commands
npm install package-name
```

```text
Plain text without syntax highlighting
Use for logs, output, or generic text
```
````

**Common language identifiers:**

| Language | Identifier |
|----------|------------|
| JavaScript | `javascript` or `js` |
| TypeScript | `typescript` or `ts` |
| Python | `python` or `py` |
| Bash/Shell | `bash` or `shell` |
| HTML | `html` |
| CSS | `css` |
| JSON | `json` |
| YAML | `yaml` |
| SQL | `sql` |
| Plain text | `text` |

### Lists

**Unordered lists (use hyphens):**

```markdown
- First item
- Second item
  - Nested item
  - Another nested item
- Third item
```

**Ordered lists:**

```markdown
1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step
```

**Definition lists (for glossaries):**

```markdown
Term One
: Definition of term one with explanation.

Term Two
: Definition of term two with explanation.
```

### Links

**Internal links (relative):**

```markdown
See [Related Document](./related-document.md) for more details.

Refer to [Chapter 5](../chapters/chapter-05.md#section-name).
```

**External links (absolute):**

```markdown
Visit [Schema.org](https://schema.org) for vocabulary reference.

See the [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/).
```

**Reference-style links (for repeated URLs):**

```markdown
The [MX-Bible][bible] covers this topic in depth.
See also the [MX-Handbook][handbook] for implementation details.

[bible]: https://example.com/mx-bible
[handbook]: https://example.com/mx-handbook
```

### Images

**Basic image:**

```markdown
![Alt text describing the image](./images/diagram.png)
```

**Image with title:**

```markdown
![System architecture diagram](./images/architecture.png "Figure 1: Three-tier architecture")
```

**Image with figure caption (HTML allowed):**

```markdown
<figure>
  <img src="./images/workflow.svg" alt="Content workflow diagram">
  <figcaption>Figure 2: The five-stage content workflow from draft to publication.</figcaption>
</figure>
```

**Alt text guidelines:**

| Image Type | Alt Text Approach |
|------------|-------------------|
| Informative | Describe content and purpose |
| Decorative | Empty alt or omit from markdown |
| Chart/Graph | Summarise the data shown |
| Screenshot | Describe what's visible and relevant |
| Diagram | Explain the concept illustrated |

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

**With alignment:**

```markdown
| Left     | Centre   | Right    |
|:---------|:--------:|---------:|
| Text     | Text     | 123      |
| More     | More     | 456      |
```

**Table guidelines:**

- Include header row
- Use consistent column alignment
- Keep tables simple (avoid complex nesting)
- Consider lists for simple key-value data

### Blockquotes

**Simple quote:**

```markdown
> This is a quoted passage from another source.
> It can span multiple lines.
```

**Quote with attribution:**

```markdown
> The best way to predict the future is to invent it.
>
> — Alan Kay
```

**Callout boxes (admonitions):**

```markdown
> **Note:** Important information the reader should be aware of.

> **Warning:** Critical information about potential problems.

> **Tip:** Helpful suggestion for better results.
```

### Emphasis and Formatting

```markdown
*Italic text* for emphasis
**Bold text** for strong emphasis
***Bold italic*** for maximum emphasis (use sparingly)
`inline code` for code references, filenames, commands
~~Strikethrough~~ for deleted or deprecated content
```

## Metadata-Content Consistency

### Title Consistency

The document title must be consistent across:

1. YAML frontmatter `title` field (if used)
2. H1 heading in content (if used)
3. Any references to the document

### Date Accuracy

The `date` field must reflect the last meaningful content update:

```yaml
# Update date when:
# - Content is revised or expanded
# - Errors are corrected
# - Information is updated

# Do NOT update date for:
# - Formatting changes only
# - Typo fixes
# - Build system changes

date: "2026-01-27"  # Last content modification
```

### Keyword Relevance

Keywords must:

- Accurately reflect document content
- Be lowercase
- Use hyphens for multi-word terms
- Appear in the document body

```yaml
# Good keywords (appear in content, specific)
keywords: [semantic-html, wcag-compliance, ai-agents]

# Bad keywords (generic, not in content)
keywords: [web, internet, technology, stuff]
```

## File Organisation

### Naming Conventions

```text
# URL-friendly names
understanding-ai-agents.md        ✓
chapter-05-metadata-patterns.md   ✓
appendix-a-glossary.md            ✓

# Avoid
Understanding AI Agents.md        ✗ (spaces)
Chapter_5.md                      ✗ (underscores, no description)
doc.md                            ✗ (non-descriptive)
```

**Rules:**

- Lowercase letters only
- Hyphens for word separation
- No spaces or underscores
- Descriptive names
- Include sequence numbers where applicable

### Directory Structure

```text
content/
├── articles/
│   ├── understanding-ai-agents.md
│   └── metadata-best-practices.md
├── chapters/
│   ├── chapter-01-introduction.md
│   ├── chapter-02-fundamentals.md
│   └── chapter-03-implementation.md
├── appendices/
│   ├── appendix-a-glossary.md
│   └── appendix-b-resources.md
└── reference/
    ├── api-reference.md
    └── configuration-guide.md
```

## Validation Checklist

### Frontmatter Validation

- [ ] YAML block starts with `---` on line 1
- [ ] YAML block ends with `---`
- [ ] `title` present (or H1 in content)
- [ ] `author` present
- [ ] `date` present in ISO 8601 format
- [ ] `description` present (max 155 characters)
- [ ] `keywords` present (array, 3-5 items)
- [ ] `mx-content-type` present with valid value
- [ ] `ai-instruction` present
- [ ] No duplicate `title` and H1

### Structure Validation

- [ ] Exactly one H1 (either frontmatter title or content)
- [ ] Heading hierarchy (no skipped levels)
- [ ] Blank lines before and after headings
- [ ] Blank lines before and after code blocks
- [ ] Blank lines before and after lists

### Content Validation

- [ ] All code blocks specify language
- [ ] All images have alt text
- [ ] All links are valid (internal and external)
- [ ] Tables have header rows
- [ ] No trailing whitespace
- [ ] File ends with single newline

### Markdown Lint Rules

Run markdownlint with project configuration:

```bash
npx markdownlint -c config/.markdownlint.json document.md
```

**Key rules enforced:**

| Rule | Description |
|------|-------------|
| MD001 | Heading levels increment by one |
| MD003 | Heading style (ATX: `#` prefix) |
| MD009 | No trailing spaces |
| MD010 | No hard tabs |
| MD012 | No multiple consecutive blank lines |
| MD022 | Headings surrounded by blank lines |
| MD024 | No duplicate headings (same content) |
| MD031 | Fenced code blocks surrounded by blank lines |
| MD032 | Lists surrounded by blank lines |
| MD040 | Fenced code blocks should have language |
| MD047 | Files should end with single newline |

## Templates

### Article Template

```markdown
---
title: "Article Title"
author: "Author Name"
date: "2026-01-27"
description: "Brief summary of the article content (max 155 characters)"
keywords: [keyword1, keyword2, keyword3]
mx-content-type: "article"
mx-state: "draft"
ai-instruction: |
  Brief guidance for AI agents about this article's purpose,
  audience, and any special considerations.
---

# Article Title

Introduction paragraph that hooks the reader and previews
what the article covers.

## First Major Section

Content for the first section with supporting details,
examples, and explanations.

### Subsection If Needed

More detailed content organised logically.

## Second Major Section

Continue with additional sections as needed.

## Conclusion

Summary of key points and any call to action.

## Related Resources

- [Related Article One](./related-one.md)
- [Related Article Two](./related-two.md)
```

### Documentation Template

```markdown
---
title: "Feature Documentation"
author: "Author Name"
date: "2026-01-27"
description: "Documentation for [feature] including usage, configuration, and examples"
keywords: [feature-name, documentation, configuration]
mx-content-type: "documentation"
mx-state: "draft"
ai-instruction: |
  Technical documentation for developers.
  Code examples are tested and production-ready.
  Version compatibility notes are important.
---

# Feature Documentation

Brief overview of what this feature does and why it matters.

## Prerequisites

- Requirement one
- Requirement two
- Minimum version X.Y.Z

## Installation

```bash
npm install package-name
```

## Basic Usage

```javascript
import { feature } from 'package-name';

const result = feature.doSomething();
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `option1` | string | `"default"` | Description |
| `option2` | boolean | `false` | Description |

## Examples

### Example One: Basic Use Case

```javascript
// Example code here
```

### Example Two: Advanced Use Case

```javascript
// Example code here
```

## Troubleshooting

### Common Issue One

**Problem:** Description of the problem.

**Solution:** How to fix it.

### Common Issue Two

**Problem:** Description of the problem.

**Solution:** How to fix it.

## API Reference

### `functionName(param1, param2)`

Description of the function.

**Parameters:**

- `param1` (string): Description
- `param2` (object): Description

**Returns:** Description of return value.

**Example:**

```javascript
const result = functionName('value', { key: 'value' });
```
```

### README Template

```markdown
---
title: "Project Name"
author: "Author/Team Name"
date: "2026-01-27"
description: "Brief project description (max 155 characters)"
keywords: [project-type, technology, domain]
mx-content-type: "readme"
mx-state: "published"
ai-instruction: |
  Project README providing overview, setup instructions, and usage.
  This is the entry point for developers exploring the repository.
---

# Project Name

Brief description of what this project does and why it exists.

## Features

- Feature one
- Feature two
- Feature three

## Quick Start

```bash
# Installation
npm install project-name

# Basic usage
npx project-name --option value
```

## Documentation

- [Getting Started](./docs/getting-started.md)
- [Configuration](./docs/configuration.md)
- [API Reference](./docs/api-reference.md)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

[MIT](./LICENSE) © Author Name
```

## Certification Levels

### Level 1: MX Basic

- YAML frontmatter present
- Required fields complete (title, author, date, description, keywords, mx-content-type, ai-instruction)
- Valid heading structure
- No markdown lint errors

### Level 2: MX Standard

- All Level 1 requirements
- `mx-state` field tracking document lifecycle
- All code blocks have language identifiers
- All images have descriptive alt text
- All links validated
- Consistent file naming

### Level 3: MX Advanced

- All Level 2 requirements
- Complete relationship metadata (series, related, parent)
- Schema.org type specified
- Publication metadata when published
- Cross-reference validation
- Automated validation in CI/CD

## Related Documentation

- **CMS Compliance** - [cms-compliance.md](./cms-compliance.md) - Internal storage requirements
- **Webpage Compliance** - [mx-compliance.md](./mx-compliance.md) - HTML output requirements
- **Appendix P** - Blog generation workflow using markdown source
- **Writing Style Guide** - [docs/for-ai/writing-style.md](../for-ai/writing-style.md)

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-27 | Initial specification |
