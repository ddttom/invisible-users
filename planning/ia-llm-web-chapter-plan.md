---
title: "Chapter Planning Document: The Information Architecture of the LLM Web"
author: "Tom Cranstoun"
date: "2026-01-25"
description: "Comprehensive planning document for a new MX Bible chapter on Information Architecture for LLM-readable websites"
keywords: [information-architecture, ia, llm-web, machine-experience, semantic-structure, ai-agents]
purpose: "Planning document to guide the creation of a new chapter addressing how to structure information on websites for optimal LLM parsing and understanding"
ai-instruction: |
  This is a planning document, not a book manuscript chapter. Time references and
  meta-commentary about the writing process are acceptable here. When the actual
  chapter is written, it must follow the Timeless Manuscript Rule.
---

## Executive Summary

This document outlines a comprehensive plan for a new chapter in the MX Bible titled **"The Information Architecture of the LLM Web"**. The chapter addresses a critical gap in the current book structure: whilst existing chapters cover semantic HTML (Chapter 3), technical implementation (Chapter 12), and agent behaviour patterns (Chapter 0), none systematically addresses **how to architect information for machine comprehension** at the strategic level.

Information Architecture (IA) for the LLM web is distinct from traditional IA. Traditional IA optimises for human navigation and wayfinding. LLM-focused IA optimises for machine parsing, context extraction, and knowledge graph construction. This chapter bridges that gap.

---

## Positioning Within the MX Bible

### Current Chapter Structure

| Chapter | Title | Focus |
|---------|-------|-------|
| 0 | What Are AI Agents? | Foundation, 5-stage journey, MX definition |
| 1 | Introduction | Urgency, business case |
| 2 | The Invisible Failure | Agent failures on websites |
| 3 | Semantic HTML Foundations | Markup patterns |
| 4 | The Business Reality | E-commerce, EAL patterns |
| 5 | AI-Mediated Discovery | Business model transformation |
| 6 | The Security Maze | Authentication, session inheritance |
| 7 | The Legal Landscape | GDPR, jurisdiction, copyright |
| 8 | [Content varies] | Ecosystem maturity |
| 9 | Designing for Both / Platform Race | Competitive dynamics |
| 10 | Schema.org & Technical Patterns | Structured data, AI meta tags |
| 11 | UI Design Guidance | Design decisions |
| 12 | Technical Advice | Deep implementation |
| 13 | What Agent Creators Must Build | Agent-side requirements |

### Proposed Placement Options

#### Option A: New Chapter 14

- Position: After Chapter 13 (agent creator requirements)
- Rationale: Completes the "full stack" by addressing how site structure enables agent success
- Concern: Book is already substantial

#### Option B: Expansion of Chapter 3

- Position: Within existing Semantic HTML chapter
- Rationale: IA is fundamentally about semantic structure
- Concern: Chapter 3 focuses on element-level patterns, not site-wide architecture

#### Option C: New Chapter between 10 and 11 (Recommended)

- Position: After Schema.org/technical patterns, before UI design
- Rationale: Bridges technical implementation (10) and design decisions (11)
- New numbering: Chapter 10.5 or renumber subsequent chapters

#### Recommendation

Option C - Place between current Chapters 10 and 11. IA serves as the bridge between "what technical patterns to use" (Chapter 10) and "how to design for both audiences" (Chapter 11).

---

## Chapter Outline

### Title Options

1. **The Information Architecture of the LLM Web** (primary)
2. **Structuring Information for Machine Comprehension**
3. **Architecture for Invisible Users**
4. **The Machine-Readable Web - Information Architecture**

### Proposed Sections

#### Section 1: Why Traditional IA Falls Short

##### Purpose

Establish that human-centred IA principles don't automatically translate to machine readability.

##### Key Points

- Traditional IA optimises for visual hierarchy, navigation patterns, and wayfinding
- LLM-focused IA optimises for token efficiency, context extraction, and semantic relationships
- The "Don't Make Me Think" principle applies to machines, but machines "think" differently
- Steve Krug's visual Table of Contents translates to sitemap.xml for machines

##### Cross-references

- Chapter 0: "Don't Make the AI Think" concept
- docs/structure/steve-krug.md: Detailed analysis of Krug's principles for AI
- docs/claude/machine-experience-manifesto.md: Principle 6 (semantic markup structures information)

##### Examples needed

- Before/after comparison: Same content, different IA approaches
- Visual hierarchy vs semantic hierarchy diagram

---

#### Section 2: The Three Layers of LLM-Readable IA

##### Purpose

Introduce a framework for thinking about IA at different scales.

##### Key Points

##### Layer 1: Site-Level Architecture

- Sitemap structure and discovery
- URL semantics (Manifesto Principle 10: `/products/ipad-pro-2024` not `/p?id=12847`)
- Navigation hierarchy reflected in URL paths
- robots.txt and llms.txt as architectural signals
- Domain organisation and subdomain strategy

##### Layer 2: Page-Level Architecture

- Heading hierarchy (H1 → H2 → H3) as semantic outline
- Landmark roles (`<main>`, `<nav>`, `<aside>`, `<article>`)
- Content sections and their relationships
- Breadcrumb navigation as context signal
- Table of contents with anchor links

##### Layer 3: Content-Level Architecture

- Paragraph structure and information density
- Lists vs prose for structured information
- Data tables with proper headers
- Inline semantic elements (definitions, abbreviations, citations)
- Metadata blocks within content

##### Cross-references

- docs/claude/machine-experience-manifesto.md: Principles 6, 10, 13
- docs/for-ai/new-project/planned.md: Section 1.1 (Discovery) and 2.1 (Structure)
- Chapter 10: Schema.org patterns extend content-level architecture

##### Diagrams needed

- Three-layer pyramid diagram showing Site → Page → Content hierarchy
- URL structure as IA diagram (semantic vs opaque URLs)

---

#### Section 3: Discovery Architecture

**Purpose:** How agents find and traverse your information structure.

##### Key Points

##### Sitemap as Machine TOC

- sitemap.xml as the machine equivalent of a visual table of contents
- Priority attributes as importance signals
- lastmod as freshness indicator
- Sitemap index files for large sites

##### llms.txt as Architectural Guide

- Purpose and placement
- YAML frontmatter for metadata
- Relationship to sitemap.xml
- Common Crawl discovery problem (from why-llms-dont-execute-javascript.md)

##### robots.txt as Access Control

- Allowing/blocking specific agent types
- Crawl-delay for resource management
- The robots.txt / Common Crawl misconception

##### Semantic URL Structure

- URL paths as navigation hierarchy
- Category/subcategory patterns
- Canonical URL strategy
- URL slugs as content descriptors

##### Cross-references

- docs/claude/why-llms-dont-execute-javascript.md: Common Crawl discovery sections
- Chapter 10: llms.txt implementation patterns
- Appendix H: Example llms.txt files

##### Code samples needed

```xml
<!-- Sitemap structure reflecting IA -->
<urlset>
  <url>
    <loc>https://example.com/products/</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://example.com/products/category-name/</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://example.com/products/category-name/product-slug</loc>
    <priority>0.5</priority>
  </url>
</urlset>
```

---

#### Section 4: Page-Level Structure for Agent Comprehension

**Purpose:** How to structure individual pages for optimal machine parsing.

##### Key Points

##### Heading Hierarchy as Semantic Outline

- H1 as page identity (must match `<title>` and link text that led here)
- H2 as major sections (agents build mental model from these)
- H3-H6 as subsection granularity
- The heading hierarchy problem: visual styling vs semantic meaning

##### Landmark Roles

- `<main>` as primary content signal
- `<nav>` for navigation (multiple allowed, distinguish with aria-label)
- `<aside>` for supplementary content
- `<article>` for standalone, syndicatable content
- `<section>` for thematic groupings
- `<header>` and `<footer>` for page/section metadata

##### Content Ordering

- Critical information first (agents may not process entire page)
- Logical reading order (CSS can reorder visually, DOM order matters for agents)
- Summary/abstract patterns for long content

##### Breadcrumb Navigation

- Schema.org BreadcrumbList markup
- Position in DOM (early, within `<nav>`)
- Relationship to URL structure

##### Cross-references

- Chapter 3: Semantic HTML foundations
- docs/claude/machine-experience-manifesto.md: Principle 6 (semantic markup)
- docs/structure/steve-krug.md: Chapter 6 analysis (Street Signs and Breadcrumbs)

##### Code samples needed

```html
<!-- Page structure demonstrating IA principles -->
<body>
  <header>
    <nav aria-label="Main navigation">...</nav>
  </header>

  <nav aria-label="Breadcrumb">
    <ol itemscope itemtype="https://schema.org/BreadcrumbList">
      <!-- BreadcrumbList items -->
    </ol>
  </nav>

  <main>
    <article>
      <h1>Page Title Matching Title Tag</h1>
      <p class="summary">Article summary for quick extraction...</p>

      <section>
        <h2>Major Section</h2>
        <h3>Subsection</h3>
      </section>
    </article>

    <aside>
      <h2>Related Information</h2>
    </aside>
  </main>

  <footer>...</footer>
</body>
```

---

#### Section 5: Content Architecture Patterns

**Purpose:** How to structure content within pages for machine extraction.

##### Key Points

##### Information Density and Token Economics

- Agents have context window limits (token budgets)
- Front-load critical information
- Avoid "happy talk" and marketing fluff in key areas
- Strategic redundancy: same information in multiple formats

##### Lists vs Prose

- When to use lists: discrete items, steps, features
- When to use prose: relationships, context, narrative
- Definition lists for terminology
- Ordered vs unordered based on semantic relationship

##### Tables as Structured Data

- Proper table headers (`<thead>`, `<th>`)
- Caption for table identity
- Simple vs complex tables (avoid nested tables)
- Tables vs lists decision matrix

##### Inline Semantics

- `<dfn>` for definitions
- `<abbr>` for abbreviations
- `<cite>` for citations
- `<time>` for dates (machine-readable datetime attribute)
- `<data>` for machine-readable values

##### Cross-references

- docs/structure/steve-krug.md: Chapter 5 (Omit Needless Words) - token economics parallel
- Chapter 0: Strategic redundancy section
- Appendix D: AI-Friendly HTML Guide

##### Code samples needed

```html
<!-- Definition with machine-readable context -->
<p>
  <dfn id="mx-definition">Machine Experience (MX)</dfn> is the practice
  of adding metadata and instructions to web assets so AI agents don't
  have to think.
</p>

<!-- Time with machine-readable format -->
<p>Published on <time datetime="2026-01-25">25 January 2026</time></p>

<!-- Data with machine-readable value -->
<p>Price: <data value="2030">£2,030</data></p>
```

---

#### Section 6: Navigation Architecture

**Purpose:** How to structure navigation for agent traversal.

##### Key Points

##### Primary Navigation

- Consistent placement (agents learn from training data conventions)
- Semantic markup (`<nav>` with `<ul>`, not `<div>` soup)
- Clear, descriptive link text (no "Click here")
- aria-current for current page indication

##### Secondary Navigation

- Sidebar navigation patterns
- "In this section" navigation
- Related content links

##### Footer Navigation

- Utility links (privacy, terms, contact)
- Sitemap link
- Category/section links

##### Pagination

- rel="next" and rel="prev" for series
- Numbered pagination vs infinite scroll (agents struggle with infinite scroll)
- "View all" options for complete content access

##### Search as Navigation

- Search box with proper `role="search"`
- Semantic form markup
- Search results page structure

##### Cross-references

- docs/structure/steve-krug.md: Chapter 6 (Street Signs and Breadcrumbs)
- Chapter 3: Navigation semantic patterns
- Appendix K: Common Page Patterns

##### Diagrams needed

- Navigation hierarchy diagram showing primary, secondary, utility levels
- Agent traversal path diagram

---

#### Section 7: Metadata Architecture

**Purpose:** How metadata layers complement structural IA.

##### Key Points

##### JSON-LD as Structured IA

- Schema.org types as content classification
- Relationships between entities (@id references)
- Breadcrumb markup as navigation metadata
- WebPage, WebSite, and Organization as foundational types

##### Meta Tag Architecture

- Standard meta tags (description, author, keywords)
- Open Graph for social/sharing context
- ai-dynamic for temporal characteristics
- Proposed ai-* namespace patterns

##### YAML Frontmatter

- For markdown-based content systems
- Metadata that survives format conversion
- AI instruction patterns

##### Cross-references

- Chapter 10: Schema.org patterns in depth
- docs/claude/machine-experience-manifesto.md: Principles 7, 8
- Appendix L: Proposed AI Metadata Patterns
- docs/for-ai/writing-style.md: YAML frontmatter templates

##### Code samples needed

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://example.com/products/widget#webpage",
  "name": "Widget Product Page",
  "description": "Complete specifications for the Widget product",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://example.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://example.com/products/"
      }
    ]
  },
  "mainEntity": {
    "@type": "Product",
    "@id": "https://example.com/products/widget#product"
  }
}
```

---

#### Section 8: IA Anti-Patterns for Machine Readers

**Purpose:** Common IA mistakes that break agent comprehension.

##### Key Points

##### Anti-Pattern 1: Flat Structure

- Everything at same URL depth
- No category/subcategory hierarchy
- Agents cannot infer relationships

##### Anti-Pattern 2: Orphan Pages

- Pages not linked from navigation
- Not in sitemap
- Agents cannot discover them

##### Anti-Pattern 3: Misleading Hierarchy

- Visual hierarchy contradicts semantic hierarchy
- CSS makes H3 look like H1
- Agents trust semantic markup, not visual appearance

##### Anti-Pattern 4: Inconsistent Naming

- Link text doesn't match destination H1
- Category names differ between nav and breadcrumbs
- Agents lose confidence in navigation

##### Anti-Pattern 5: Deep Nesting

- Critical content buried 5+ clicks deep
- URL paths excessively long
- Agents may not traverse that deep

##### Anti-Pattern 6: Dynamic-Only Navigation

- Navigation requires JavaScript to render
- Mega-menus that don't exist in served HTML
- Server-side agents see no navigation

##### Cross-references

- Chapter 2: Invisible failures
- docs/structure/steve-krug.md: Various anti-patterns discussed
- Appendix I: Common Pitfalls

##### Diagrams needed

- Before/after diagrams for each anti-pattern
- "Agent sees this" vs "Human sees this" comparison

---

#### Section 9: Testing IA for Agent Comprehension

**Purpose:** How to validate that your IA works for machine readers.

##### Key Points

##### Manual Testing with LLMs

- Paste HTML into ChatGPT/Claude
- Ask it to describe the site structure
- Ask it to navigate to specific content
- Chain-of-thought prompting for debugging

##### Automated Testing

- Web Audit Suite sitemap analysis
- Heading hierarchy validation
- Internal link analysis
- Orphan page detection

##### Synthetic User Testing

- Using LLMs as "synthetic users" (from steve-krug.md Chapter 9)
- Task-based testing: "Find the price of X"
- Recording reasoning traces

##### Cross-references

- docs/structure/steve-krug.md: Chapter 9 (Usability Testing)
- packages/web-audit-suite/README.md: Sitemap and structure analysis features
- Chapter 12: Technical testing approaches

---

#### Section 10: IA for Different Content Types

**Purpose:** Applying IA principles to specific content categories.

##### Key Points

##### E-commerce Sites

- Category → Subcategory → Product hierarchy
- Faceted navigation and filtering
- Product listing pages vs product detail pages
- Shopping cart as transient content

##### Documentation Sites

- Version-aware structure
- API reference organisation
- Tutorial vs reference navigation
- Search-first patterns

##### News/Blog Sites

- Chronological vs categorical organisation
- Archive structure
- Tag and category architecture
- Series and related content

##### Corporate Sites

- About/Products/Services/Contact patterns
- Investor relations requirements
- Multiple audience navigation

##### Cross-references

- Chapter 4: E-commerce business reality
- Appendix K: Common Page Patterns
- Chapter 5: Content discovery transformation

---

## Key Themes Throughout

### Theme 1: "Don't Make the AI Think" Applied to IA

Every IA decision should reduce the cognitive load on machine parsers:

- Explicit structure over implied relationships
- Consistent patterns over clever variations
- Redundant signals over single points of truth

### Theme 2: The Convergence Principle

IA that works for machine readers also works better for:

- Screen reader users (same semantic structure)
- Search engines (same crawlability requirements)
- Mobile users (same content prioritisation)
- International users (same clear hierarchy)

### Theme 3: Existing Technology

IA for LLMs doesn't require new standards:

- sitemap.xml (decades old)
- Semantic HTML5 elements (established)
- Schema.org (mature vocabulary)
- ARIA landmark roles (accessibility standard)

---

## Dependencies and Prerequisites

### Reader Should Already Understand

From earlier chapters:

- What AI agents are and how they process websites (Chapter 0)
- Basic semantic HTML patterns (Chapter 3)
- The business case for MX (Chapters 1, 4, 5)

### Chapter Should Enable

For later chapters:

- Technical implementation details (Chapter 12)
- UI design decisions informed by IA (Chapter 11)
- Testing and validation (Chapter 12)

---

## Diagrams Required

| Diagram | Description | Format |
|---------|-------------|--------|
| Three-layer IA pyramid | Site → Page → Content hierarchy | SVG |
| URL structure as IA | Semantic vs opaque URL comparison | SVG |
| Navigation hierarchy | Primary, secondary, utility navigation | SVG |
| Agent traversal path | How an agent navigates through IA | SVG |
| Heading hierarchy | Visual vs semantic hierarchy comparison | SVG |
| Anti-pattern comparisons | Before/after for each anti-pattern | SVG (series) |
| Sitemap as TOC | Visual TOC vs XML sitemap parallel | SVG |

---

## Code Samples Required

| Sample | Purpose | Location in Chapter |
|--------|---------|---------------------|
| Sitemap reflecting IA | Show URL hierarchy in sitemap | Section 3 |
| Page structure template | Complete page with landmarks | Section 4 |
| Inline semantics | dfn, abbr, time, data elements | Section 5 |
| JSON-LD WebPage | Metadata architecture example | Section 7 |
| Navigation markup | Proper nav with aria patterns | Section 6 |
| BreadcrumbList | Schema.org breadcrumb example | Section 4 |

---

## Writing Considerations

### Audience Segmentation

##### Primary audience (business focus)

- Sections 1, 2, 8, 10 - Strategic understanding
- Emphasise the "why" and business impact

##### Secondary audience (implementation focus)

- Sections 3-7, 9 - Technical patterns
- Direct to Appendix D for deeper HTML guidance

### Depth Management

- Main chapter text: Strategic explanations, principles, patterns
- Code samples: Brief, illustrative examples only
- Deep technical details: Reference to Chapter 12 and Appendices

### Tone

- Expert-to-peer conversation
- Practical, not academic
- Avoid IA jargon without definition
- Follow AI Advocacy positioning (opportunity framing, not problem framing)

---

## Cross-Reference Matrix

| This Chapter Section | References | Referenced By |
|---------------------|------------|---------------|
| Section 1 (Traditional IA) | steve-krug.md, Chapter 0 | - |
| Section 2 (Three Layers) | manifesto.md, planned.md | Appendix K |
| Section 3 (Discovery) | why-llms.md, Chapter 10 | Appendix H |
| Section 4 (Page Structure) | Chapter 3, manifesto.md | Appendix D |
| Section 5 (Content) | steve-krug.md, Chapter 0 | Appendix D |
| Section 6 (Navigation) | steve-krug.md, Chapter 3 | Appendix K |
| Section 7 (Metadata) | Chapter 10, Appendix L | Appendix E |
| Section 8 (Anti-Patterns) | Chapter 2, Appendix I | - |
| Section 9 (Testing) | steve-krug.md, Chapter 12 | - |
| Section 10 (Content Types) | Chapters 4, 5, Appendix K | - |

---

## Estimated Scope

| Metric | Estimate |
|--------|----------|
| Word count | 6,000 - 8,000 words |
| Code samples | 8-10 examples |
| Diagrams | 7-10 SVG illustrations |
| Cross-references | 15-20 internal links |
| Appendix references | 6-8 appendices cited |

---

## Interview Results: Framework Terminology and Scope Clarification

**Date:** 2026-01-25
**Interviewer:** Claude Code
**Interviewee:** Tom Cranstoun (Author)

### Key Findings

##### 1. Correct Primary Framework

The **Three-Layer IA Framework** (Site → Page → Content) is the correct architectural model that should be used throughout the book. The "5-stage journey" terminology that currently appears scattered across multiple chapters should be deprecated or clarified in relation to the IA framework.

##### 2. Critical Technical Distinction Missing from Current Book

The book currently conflates two fundamentally different mechanisms of LLM access to web content:

- **Training-time ingestion:** LLMs learn about websites through **Common Crawl** datasets during training. This is indirect, historical, and subject to Common Crawl's crawling policies and robots.txt interpretation.
- **Inference-time direct access:** LLMs access websites **directly** during user queries through browser automation, API calls, or other real-time mechanisms. This bypasses Common Crawl entirely.

**Current book problem:** The manuscript alludes to "direct ingestion by LLMs" without clearly distinguishing between these two mechanisms. This creates confusion about:

- When robots.txt matters (training vs inference)
- How llms.txt is discovered (Common Crawl for training, direct fetch for inference)
- Why sitemap.xml works differently in each context
- The timeline difference (training data is months/years old, inference is real-time)

##### 3. Current "5-Stage Journey" Status

The "5-stage journey" (Discovery, Citation, Search & Compare, Pricing, Confidence) exists primarily in:

- Blog posts (outputs/bible/blogs/)
- Marketing materials
- NOT comprehensively documented in the book chapters themselves

The concept is **scattered across multiple chapters** without a cohesive framework, leading to:

- Inconsistent terminology (sometimes "step", sometimes "stage")
- Missing stages in some contexts
- No clear mapping to technical implementation

##### 4. Required Actions

✅ **Audit all stage references for consistency** across all chapters
✅ **Make training vs inference distinction crystal clear** in the new IA chapter

- Establish Three-Layer IA Framework as the technical architecture
- Clarify relationship between IA layers and Common Crawl ingestion
- Document how IA enables both training-time and inference-time agent access

---

## Remediation Plan: Fixing "5-Step/Stage" References Throughout Book

### Phase 1: Content Audit

**Objective:** Identify all references to steps, stages, journeys, and ingestion mechanisms.

##### Files to audit

```bash

# Search all chapter files for stage/step references

packages/bible/chapters/*.md
packages/mx-handbook/chapters/*.md
docs/shared-chapters/*.md
```

##### Search patterns

- "5 step" / "five step"
- "5 stage" / "five stage"
- "agent journey"
- "ingestion" (with context)
- "Common Crawl"
- "training" + "inference"

##### Expected findings

- Chapter 0: Likely has partial journey framework
- Chapter 2-3: Probably references stages without definition
- Chapter 10: Schema.org patterns may reference discovery/citation stages
- Blog content: Complete 5-stage framework (reference model)

---

### Phase 2: Establish Correct Mental Model in New IA Chapter

##### New Section to Add: "Training-Time vs Inference-Time Architecture"

**Placement:** Section 1.5 (after "Why Traditional IA Falls Short", before "Three Layers")

##### Key points to establish

1. **Two distinct mechanisms of agent access:**

##### Training Phase (Historical)

   - LLMs ingest web content via **Common Crawl** datasets
   - Common Crawl respects robots.txt (with caveats)
   - Data is months/years out of date
   - No real-time interaction with your site
   - Your IA affects: discoverability, completeness of ingestion, semantic understanding

##### Inference Phase (Real-time)

   - LLMs access websites directly during user queries
   - Browser automation (Playwright, Selenium)
   - API calls to structured endpoints
   - Real-time content parsing
   - Your IA affects: navigation success, content extraction accuracy, task completion

2. **Why this matters for IA:**

   - **Sitemap.xml:** Common Crawl uses it (training), agents use it (inference)
   - **llms.txt:** Must be discoverable via Common Crawl AND directly fetchable
   - **robots.txt:** Affects training data availability, but agents may ignore during inference (ethical/legal issue)
   - **Semantic HTML:** Benefits both (knowledge graphs for training, parsing for inference)

3. **The Three-Layer IA Framework serves both:**

   - **Site layer:** Enables Common Crawl discovery (sitemap, robots.txt, llms.txt)
   - **Page layer:** Enables both historical ingestion and real-time navigation
   - **Content layer:** Enables knowledge extraction (training) and task completion (inference)

##### Diagram needed

```
[Common Crawl]  ──(months ago)──→  [LLM Training]  ──→  [Knowledge Base]
                                                              ↓
[Your Website]  ←──(real-time)───  [LLM Inference] ←─  [User Query]
     ↑
  Three-Layer IA
  (enables both paths)
```

---

### Phase 3: Terminology Standardization

##### Replace scattered "5-stage journey" references with

1. **Primary framework:** Three-Layer IA Framework (Site/Page/Content)
2. **User-facing journey:** Agent interaction lifecycle (if journey concept is needed)
3. **Technical stages:** Discovery, Parsing, Extraction, Navigation, Completion

##### Mapping (for reference, not primary framework)

| Old "5-Stage Journey" | Three-Layer IA Enabler | Access Mechanism |
|-----------------------|------------------------|------------------|
| 1. Discovery (Training) | Site layer (sitemap, robots.txt) | Common Crawl ingestion |
| 2. Citation | Site + Content layer (Schema.org, semantic HTML) | Training data knowledge graphs |
| 3. Search & Compare | Page + Content layer (structured data, tables) | Inference-time parsing |
| 4. Pricing | Content layer (machine-readable formats) | Inference-time extraction |
| 5. Confidence (Goal Completion) | All three layers working together | Inference-time navigation + extraction |

---

### Phase 4: Chapter-by-Chapter Remediation

##### Chapter 0 (What Are AI Agents?)

- Add clear section: "How Agents Access Websites: Training vs Inference"
- Replace scattered stage references with consistent framework
- Introduce Three-Layer IA concept as preview (detailed in new IA chapter)

##### Chapter 2 (The Invisible Failure)

- Frame failures in terms of IA layers:
  - Site-layer failures: sitemap missing, robots.txt blocks agents
  - Page-layer failures: poor heading hierarchy, missing landmarks
  - Content-layer failures: opaque data, missing semantic markup

##### Chapter 3 (Semantic HTML Foundations)

- Position semantic HTML as the **Content-Layer** implementation of IA framework
- Remove any "step N" references, replace with "enables [specific agent capability]"

##### Chapter 10 (Schema.org & Technical Patterns)

- Position Schema.org as Content-layer + Site-layer metadata
- Remove "stage" terminology, use "enables discovery" / "enables extraction"

##### Chapter 12 (Technical Advice)

- Add subsection: "Implementing IA for Training and Inference"
- Cross-reference new IA chapter
- Provide code samples showing both mechanisms

##### New IA Chapter (proposed Chapter 10.5)

- Comprehensive coverage of Training vs Inference distinction
- Three-Layer IA Framework as primary organizing principle
- Deprecate "5-stage journey" or clearly subordinate it to IA framework

---

### Phase 5: Blog Content Alignment

##### Blog posts currently using "5-Stage Journey"

- `outputs/bible/blogs/mx/machine-experience-adding-metadata.html`
- `outputs/bible/blogs/mx/mx-a-new-role.html`
- `outputs/bible/blogs/AI-Native.blog`

**Decision required:** Do we:

1. **Update blog posts** to align with Three-Layer IA Framework?
   - Pros: Consistency across all materials
   - Cons: Blog posts already published, may break external links/SEO

2. **Leave blog posts as-is** but add disclaimer?
   - Pros: Preserves existing content and SEO
   - Cons: Ongoing terminology confusion

3. **Create new blog post** introducing Three-Layer IA Framework?
   - Pros: Forward-looking content, establishes new terminology
   - Cons: Doesn't fix existing confusion

**Recommended:** Option 3 - Create new authoritative blog post, add footnotes to existing posts linking to it.

---

### Phase 6: Validation Checklist

After remediation, validate:

- [ ] No references to "5 stages" without clear definition and subordination to IA framework
- [ ] Training vs Inference distinction appears in at least 3 chapters
- [ ] Common Crawl mechanism explained clearly (not assumed)
- [ ] Three-Layer IA Framework is the primary organizing principle
- [ ] All diagrams show both training and inference paths
- [ ] Glossary includes: Training-time ingestion, Inference-time access, Common Crawl
- [ ] Cross-references between chapters use consistent terminology

---

## Next Steps

1. **Execute Phase 1 Audit** - Grep all chapters for stage/step/journey/ingestion references
2. **Validate positioning** - Confirm placement between Chapters 10 and 11
3. **Draft Section 1.5** - "Training-Time vs Inference-Time Architecture" (priority)
4. **Draft Section 2** - "Three Layers of LLM-Readable IA" with corrected framework
5. **Create training/inference diagram** - Visual representation of two access paths
6. **Review Chapter 0** - Add training vs inference distinction
7. **Execute Phase 4 remediation** - Update each chapter systematically
8. **Create key IA diagrams** - Three-layer pyramid, URL structure diagram
9. **Review with existing content** - Ensure no duplication with Chapter 3, 10, 12
10. **Write sections progressively** - Following the outline above
11. **Integrate code samples** - From existing manifesto and planned.md content
12. **Cross-reference pass** - Add links to and from other chapters
13. **Technical review** - Validate against Web Audit Suite capabilities
14. **Style review** - Apply humanizer pass, check forbidden vocabulary
15. **Final terminology audit** - Ensure complete consistency

---

## Document History

| Date | Action | Author |
|------|--------|--------|
| 2026-01-25 | Initial planning document created | Claude (planning session) |
| 2026-01-25 | Added interview results and remediation plan for "5-stage journey" framework correction | Claude (based on author interview) |

---

## Appendix: Source Files Consulted

| File | Relevance |
|------|-----------|
| docs/shared-chapters/chapter-00-what-are-ai-agents.md | Foundation concepts, 5-stage journey |
| docs/for-ai/writing-style.md | Writing standards, forbidden vocabulary |
| config/system/doc-architecture.md | Repository structure, chapter organisation |
| docs/claude/machine-experience-manifesto.md | Core MX principles, semantic patterns |
| docs/structure/steve-krug.md | IA analysis, navigation patterns, usability |
| docs/claude/why-llms-dont-execute-javascript.md | Discovery, Common Crawl, llms.txt |
| docs/for-ai/new-project/planned.md | Checklist patterns, structure requirements |
| CLAUDE.md | Project overview, cross-references, terminology |

---

*This planning document was created to guide the development of a new chapter for the MX Bible. It should be updated as the chapter development progresses.*
