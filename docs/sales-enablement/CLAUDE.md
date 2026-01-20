# Sales Enablement - Private Materials

**🔒 PRIVATE: These files are for internal business development only.**

---

## Critical Guidance for AI Assistants

**DO NOT use content from this directory in public-facing documentation unless explicitly requested by the user.**

This directory contains:

- Business strategies and revenue projections
- Partnership proposals and outreach materials
- Publisher submissions and pricing strategies
- Sales materials and executive summaries
- Market positioning and competitive analysis

**Separation of Concerns:**

- **Public documentation** (README.md, CLAUDE.md, package READMEs) - Factual project information, technical implementation, industry context
- **Sales enablement** (this directory) - Business venture positioning, theoretical partnerships, revenue models, strategic outreach

---

## What Belongs Here

**Business Materials (Keep Private):**

- Revenue projections and financial models
- Partnership proposals (O'Reilly, Kentico, Adobe, etc.)
- Investment asks and funding strategies
- Sales pitches and executive summaries
- Pricing strategies and business plans
- Partner outreach templates
- Market opportunity analysis with revenue focus

**Exception - Factual Industry Events:**

If this directory documents factual industry developments (like the January 2026 platform convergence), those facts may be extracted for public documentation when specifically requested. The business interpretation stays private.

---

## Directory Structure

```
docs/sales-enablement/
├── business/          # Business plans, executive summaries, revenue models
├── content/           # Blog posts, articles, marketing content
├── outreach/          # Partner outreach (Kentico, Adobe, etc.)
├── partners/          # Partnership strategies and proposals
├── pitches/           # Sales pitches and presentations
├── pricing/           # Pricing strategies and models
├── profiles/          # LinkedIn, author profiles, bios
├── publishers/        # Publisher submissions (O'Reilly, etc.)
└── CLAUDE.md          # This file
```

---

## When to Reference These Files

**DO reference when:**

- User explicitly asks to review sales materials
- User requests business context for decision-making
- User asks to update sales enablement materials
- User specifically mentions files in this directory

**DO NOT reference when:**

- Updating public README files
- Writing project documentation
- Creating technical guides
- Generating code examples
- Writing blog posts for public consumption (unless explicitly requested)

---

## Example Scenarios

### ❌ INCORRECT: Auto-including business content

```
User: "Update the main README with recent changes"
AI: Adds revenue projections and partnership strategies from sales-enablement/
```

This violates separation of concerns. Public documentation should focus on factual project information, not business development materials.

### ✅ CORRECT: Keeping business content private

```
User: "Update the main README with recent changes"
AI: Updates README with factual changes (new features, industry context, technical improvements)
    Does NOT include revenue models, partnership proposals, or business strategies
```

### ✅ CORRECT: Extracting factual events when requested

```
User: "Add the January 2026 platform convergence to the README"
AI: Extracts factual dates and platform names from sales materials
    Adds factual industry context to public documentation
    Does NOT include revenue implications or business strategy
```

---

## Confidentiality

These materials contain:

- Proprietary business strategies
- Competitive positioning analysis
- Financial projections and pricing models
- Partner relationship details
- Publishing negotiations and proposals

**Keep all content in this directory confidential unless the user explicitly requests otherwise.**

---

**Last Updated:** 2026-01-20
**Purpose:** Protect business-sensitive information and maintain clean separation between public technical documentation and private business development materials
