---
title: "MX Concepts for AI Assistants"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Guidance for AI assistants on Machine Experience (MX) concepts, terminology, and compliance specifications"
keywords: [mx-framework, ai-assistant-guidance, machine-experience, compliance, metadata]
ai-instruction: |
  This file explains Machine Experience (MX) concepts specifically for AI assistants.
  Read this document to understand the MX framework before working with MX compliance
  specifications or MX-related content in this repository.
---

# MX Concepts for AI Assistants

This document explains Machine Experience (MX) concepts for AI assistants working with this repository.

## What is Machine Experience (MX)?

**Machine Experience (MX)** is a framework for designing digital content and interfaces that work equally well for both human users and AI agents.

**The core insight:** AI agents are now significant visitors to websites, APIs, and digital content. They navigate, parse, extract information, and take actions - just like human users, but with different capabilities and limitations.

**The problem MX solves:** Most digital content is designed exclusively for human consumption. When AI agents encounter this content, they face:

- Ambiguous navigation structures
- Implicit state that requires human intuition to understand
- Missing metadata that humans infer from visual context
- Dynamic content that changes without clear state signals
- Authentication and interaction patterns designed for human input

**The MX solution:** Design content with explicit metadata, semantic structure, and machine-readable state - making it accessible to AI agents while simultaneously improving experience for humans (especially those using assistive technologies).

## The Convergence Principle

**Key concept:** Patterns that work well for AI agents also work well for:

- Screen reader users
- Keyboard-only navigation
- Users with cognitive disabilities
- Search engine crawlers
- Content aggregators
- API consumers

This is called **convergence** - a single set of design patterns serves multiple audiences.

**Example:**

```html
<!-- Poor for both AI and accessibility -->
<div class="btn" onclick="buy()">
  <img src="cart.png">
</div>

<!-- Good for both AI and accessibility -->
<button type="button"
        aria-label="Add to cart"
        data-action="add-to-cart"
        data-product-id="SKU123">
  <img src="cart.png" alt="">
  Add to Cart
</button>
```

The second example:
- Has semantic meaning (`<button>`)
- Declares its purpose (`aria-label`, visible text)
- Exposes machine-readable data (`data-*` attributes)
- Works for screen readers, AI agents, and visual users

## Two Types of HTML

AI agents encounter HTML in two states:

### Served HTML (Static)

The raw HTML returned by a server before JavaScript execution.

**Who sees this:**
- CLI-based AI agents (curl, wget, httpie)
- Search engine crawlers
- Server-side AI tools
- Screen readers (initially)

**Characteristics:**
- No JavaScript execution
- Static content only
- `<noscript>` content visible
- Dynamic content appears as placeholders or loading states

### Rendered HTML (Dynamic)

The DOM after JavaScript has executed and modified the page.

**Who sees this:**
- Browser-based AI agents
- Headless browser tools (Puppeteer, Playwright)
- Full browser automation
- Screen readers (after page load)

**Characteristics:**
- JavaScript has executed
- Dynamic content populated
- Client-side routing resolved
- Interactive states established

**Why this matters:** MX-compliant content must work in BOTH states. Critical information should never be JavaScript-only.

## The Invisible Users

**"Invisible Users"** refers to AI agents visiting websites without site owners' awareness.

**Current reality:**
- Most analytics don't track AI agent visits
- Many AI agents identify as regular browsers
- Even when agents self-identify, they're often blocked or ignored
- Businesses lose potential conversions from agent-assisted commerce

**MX approach:** Design for AI agents proactively, treating them as a legitimate user segment rather than adversaries to block.

## MX Compliance Specifications

This repository contains three compliance specifications:

### 1. cms-compliance.md

**Scope:** How content management systems should store and manage content internally.

**Key concepts:**
- `mx_` prefixed metadata fields
- Five-stage lifecycle: draft → edit → preview → stage → publish
- State transition rules with validation
- Platform-agnostic storage patterns

**Use this when:** Building or evaluating CMS systems, designing content databases, implementing workflow management.

### 2. mx-compliance.md

**Scope:** What rendered webpages must contain when served to browsers and AI agents.

**Key concepts:**
- MX meta tags (`mx-compliant`, `mx-version`, `mx-content-type`, `mx-state`)
- Schema.org JSON-LD requirements
- Semantic HTML structure
- WCAG 2.1 AA accessibility

**Use this when:** Building webpage templates, validating published content, auditing websites for AI compatibility.

### 3. mx-compliance-markdown.md

**Scope:** How source markdown files should be structured.

**Key concepts:**
- YAML frontmatter schema
- Required metadata fields
- Document structure rules
- Content patterns and templates

**Use this when:** Authoring content, validating markdown files, setting up content pipelines.

## Key MX Metadata Fields

### Content Classification

```yaml
mx-content-type: "article"  # What kind of content this is
mx-state: "published"       # Where in the lifecycle
```

**Content types:** `article`, `documentation`, `tutorial`, `reference`, `chapter`, `appendix`, `readme`, `specification`, `policy`, `template`, `product`, `service`, `landing`, `contact`, `about`, `legal`, `navigation`

**States:** `draft`, `edit`, `review`, `preview`, `stage`, `approved`, `published`, `archived`

### AI Instruction Field

```yaml
ai-instruction: |
  Guidance for AI agents parsing this document.
  Explain purpose, audience, and special considerations.
```

This field tells AI agents:
- What the document is for
- Who the intended audience is
- Any special parsing considerations
- How to interpret the content

**Always read and respect `ai-instruction` fields when present.**

## Schema.org Integration

MX-compliant content uses Schema.org vocabulary for structured data:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Article summary",
  "author": { "@type": "Person", "name": "Author Name" },
  "datePublished": "2026-01-27T15:00:00Z",
  "dateModified": "2026-01-27T14:30:00Z"
}
</script>
```

**Common Schema.org types in MX:**
- `Article`, `BlogPosting`, `NewsArticle` - Editorial content
- `TechArticle`, `HowTo` - Technical documentation
- `Product`, `Offer` - E-commerce
- `Organization`, `Person` - Entities
- `WebPage`, `ContactPage`, `AboutPage` - Page types
- `BreadcrumbList`, `ItemList` - Navigation

## WCAG 2.1 AA and MX

MX compliance includes WCAG 2.1 AA accessibility because:

1. **Convergence:** Accessible patterns work for AI agents
2. **Legal requirements:** Many jurisdictions require accessibility
3. **User benefit:** Helps all users, not just those with disabilities

**Key requirements:**
- Colour contrast: 4.5:1 (normal text), 3:1 (large text)
- Semantic HTML: Proper heading hierarchy, landmarks
- Keyboard navigation: All functions accessible via keyboard
- Alternative text: Images have descriptive alt attributes

## Working with MX Content

### When Parsing MX-Compliant Content

1. **Check for `mx-compliant` meta tag** - Confirms MX compliance
2. **Read `ai-instruction`** - Follow any specific guidance
3. **Use Schema.org data** - Structured data is authoritative
4. **Trust semantic structure** - Headings, landmarks, lists are meaningful
5. **Respect state metadata** - `mx-state` indicates content reliability

### When Creating MX-Compliant Content

1. **Start with frontmatter** - Metadata first, content second
2. **Include ai-instruction** - Guide future AI parsers
3. **Use semantic structure** - Headings, lists, code blocks
4. **Validate before publishing** - Check lint rules, accessibility

### When Auditing Content for MX Compliance

Use the checklists in each specification:
- Frontmatter validation
- Structure validation
- Content validation
- Output validation

## Certification Levels

MX defines three compliance levels:

| Level | Name | Description |
|-------|------|-------------|
| **1** | MX Basic | Essential metadata present, valid structure |
| **2** | MX Standard | Complete metadata, full accessibility, validation |
| **3** | MX Advanced | AI optimisation, automation, API compliance |

**For most content:** Level 2 (MX Standard) is the target.

**For AI-first content:** Level 3 (MX Advanced) adds explicit AI agent support.

## Common Patterns

### Good: Explicit State

```html
<form data-form-state="idle">
  <button type="submit" data-loading="false">Submit</button>
</form>
```

### Bad: Implicit State

```html
<form>
  <button type="submit">Submit</button>
  <!-- State only visible through CSS classes or visual changes -->
</form>
```

### Good: Semantic Structure

```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/products">Products</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

### Bad: Non-semantic Structure

```html
<div class="nav">
  <div class="nav-item" onclick="goto('/products')">Products</div>
  <div class="nav-item" onclick="goto('/about')">About</div>
</div>
```

### Good: Complete Metadata

```yaml
---
title: "Article Title"
author: "Author Name"
date: "2026-01-27"
description: "Article summary"
keywords: [topic1, topic2]
mx-content-type: "article"
ai-instruction: "Technical article for developers"
---
```

### Bad: Minimal Metadata

```yaml
---
title: "Article"
---
```

## Terminology Reference

| Term | Definition |
|------|------------|
| **MX** | Machine Experience - designing for AI agents and humans |
| **Convergence** | Principle that AI-friendly patterns benefit all users |
| **Served HTML** | Static HTML before JavaScript execution |
| **Rendered HTML** | DOM after JavaScript has modified the page |
| **Invisible Users** | AI agents visiting without site owner awareness |
| **Compliance Specification** | Document defining MX requirements for a content type |
| **Frontmatter** | YAML metadata at the start of markdown files |
| **Schema.org** | Vocabulary for structured data on the web |
| **WCAG** | Web Content Accessibility Guidelines |
| **ARIA** | Accessible Rich Internet Applications (accessibility attributes) |

## Related Files

- **[cms-compliance.md](./cms-compliance.md)** - CMS storage and workflow specification
- **[mx-compliance.md](./mx-compliance.md)** - Webpage output specification
- **[mx-compliance-markdown.md](./mx-compliance-markdown.md)** - Markdown source specification
- **[README.md](./README.md)** - Directory overview and file relationships
- **[../for-ai/writing-style.md](../for-ai/writing-style.md)** - Writing style guidelines

## Summary

**MX is about:**
1. Making content equally accessible to humans and AI agents
2. Using explicit metadata instead of implicit assumptions
3. Leveraging semantic structure for universal parsing
4. Following patterns that benefit accessibility users too
5. Treating AI agents as legitimate visitors, not adversaries

**When working with MX content:**
1. Read and respect frontmatter metadata
2. Follow ai-instruction guidance when present
3. Use semantic structure as the source of truth
4. Validate against the appropriate compliance specification
5. Remember: good for AI = good for accessibility = good for everyone
