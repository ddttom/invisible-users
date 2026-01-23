
# 📁 **Proposed `/docs` Folder Structure**

```
/docs
│
├── mx-overview.md
├── mx-checklist.md
├── mx-governance.md
├── mx-schema-examples.md
├── mx-writing-guide.md
├── mx-ucp-guide.md
│
├── examples/
│   ├── blogposting.json
│   ├── techarticle.json
│   ├── howto.json
│   ├── definedterm.json
│   └── comparison-table.html
│
├── templates/
│   ├── page-template.html
│   ├── jsonld-template.json
│   ├── toc-template.html
│   └── diagram-machine-readable.json
│
└── workflows/
    ├── publishing-workflow.md
    ├── review-checklist.md
    └── ai-indexing-process.md
```

Below are the contents for each file so you can paste them directly into your repo.

---

# 📄 **/docs/mx-overview.md**

## Machine Experience (MX): Overview

Machine Experience (MX) ensures your content is fully compatible with AI agents.
It covers five stages:

1. **Discovery** — Agents can find your content
2. **Citation** — Agents can quote your content
3. **Search & Compare** — Agents can extract attributes
4. **Price Understanding** — Agents can parse pricing (if relevant)
5. **Goal Completion** — Agents can act on your content

This document explains the purpose of MX and how it fits into your publishing workflow.

---

# 📄 **/docs/mx-checklist.md**

This file contains the full MX checklist — identical to your README version, but stored in `/docs` for reference.

(You can paste the full checklist from your README here.)

---

# 📄 **/docs/mx-governance.md**

## MX Governance

This document defines:

- Required MX levels
- Publishing rules
- Validation requirements
- Roles and responsibilities
- Update procedures

It ensures consistency and quality across all contributors.

---

# 📄 **/docs/mx-schema-examples.md**

## Schema Examples

This file contains annotated examples of:

- `BlogPosting`
- `TechArticle`
- `HowTo`
- `DefinedTerm`
- `BreadcrumbList`
- `ImageObject`
- `Offer` (if applicable)

Each example includes:

- Required fields
- Optional fields
- Common mistakes
- Validation notes

---

# 📄 **/docs/mx-writing-guide.md**

## Writing for AI Agents

This guide covers:

- Atomic sentence structure
- Avoiding ambiguous pronouns
- Using `<dfn>` and `<abbr>`
- Creating agent‑friendly summaries
- Structuring content for extraction
- Using lists instead of long paragraphs

---

# 📄 **/docs/mx-ucp-guide.md**

## Universal Commerce Protocol (UCP)

If your site includes actions (downloads, forms, purchases), this guide explains:

- UCP markers
- DOM state attributes
- Action affordances
- Agent‑safe CTA patterns

---

# 📁 **/docs/examples/**

This folder contains ready‑to‑use JSON‑LD and HTML examples.

### **blogposting.json**

A complete `BlogPosting` schema with placeholders.

### **techarticle.json**

A `TechArticle` schema for technical documentation.

### **howto.json**

A `HowTo` schema for tutorials.

### **definedterm.json**

A `DefinedTerm` schema for glossary entries.

### **comparison-table.html**

A structured comparison table with `itemprop` attributes.

---

# 📁 **/docs/templates/**

Templates for new pages.

### **page-template.html**

A semantic HTML scaffold with:

- `<main>`
- `<article>`
- ARIA roles
- TOC placeholder
- Metadata blocks

### **jsonld-template.json**

A minimal JSON‑LD scaffold with required fields.

### **toc-template.html**

A reusable table‑of‑contents block.

### **diagram-machine-readable.json**

A template for turning diagrams into machine‑readable JSON.

---

# 📁 **/docs/workflows/**

### **publishing-workflow.md**

Step‑by‑step instructions for publishing a new page.

### **review-checklist.md**

A reviewer‑focused version of the MX checklist.

### **ai-indexing-process.md**

How to submit pages to:

- OpenAI
- Anthropic
- Perplexity
- Bing
- Brave
