---
title: "MX Importing: Chapter 3"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "The MX Target"
  author:
    "@type": Person
    name: Tom Ledger
  isPartOf:
    "@type": Book
    name: "MX: Importing"
  inLanguage: en-GB
  mx:audience: human
  mx:status: draft
  mx:confidence: 0.85
---

# Chapter 3: The MX Target

You've examined the source. Now examine the destination.

MX-native content isn't just content in a different format. It's content with machine understanding built in. The target architecture shapes how you transform legacy content, what you add during migration, and what capabilities you gain.

This chapter describes the MX content store — the file structures, metadata patterns, and organisational principles that make content machine-ready.

---

## Design Principles

The MX content store follows principles that differ from traditional CMS architecture.

### Files Over Database

Traditional CMS platforms store content in databases. Queries retrieve it. Caches speed access. Backup systems protect it.

MX content lives in files. Plain text. Human-readable. Version-controlled in Git.

Why?

**Portability.** Files copy anywhere. No database migration, no schema conversion. Content on a laptop works the same as content on a server.

**Transparency.** You can read the content. Open a file, see what's there. No query language, no admin interface required.

**Version Control.** Git tracks every change. Branch for experiments. Merge when ready. Full history without CMS-specific versioning systems.

**Simplicity.** No database to manage, tune, or recover. The file system is your database.

This doesn't mean databases disappear. Search indexes, embedding stores, caches — these still use databases. But the content itself is files.

### Content and Metadata Together

In legacy systems, content and metadata often separate. The CMS database holds properties; the file system holds binaries; the search index holds derived data.

MX keeps content and metadata together:

```yaml
# The content file itself
---
title: "Widget Pro"
mx:status: published
mx:audience: both
---

# Widget Pro

Professional-grade widget for demanding users.
```

Or with sidecars for binary files:

```
widget-hero.jpg          # The image
widget-hero.jpg.mx.yaml  # Its metadata
```

Content and metadata travel together. Move the file, the metadata moves. Delete the file, the metadata goes.

### Explicit Over Implicit

Legacy systems infer meaning. A page under `/products/` is probably a product. A file named `hero.jpg` is probably a hero image. Templates imply structure.

MX makes meaning explicit:

```yaml
ld:
  "@type": Product    # Explicitly a product
  
mx:audience: both     # Explicitly for humans and machines
mx:status: published  # Explicitly published
```

No guessing. Machines know what content is because content declares what it is.

### Composition Over Complexity

Rather than one monolithic system, MX uses composed layers:

- **Storage** — Git repository with files
- **Validation** — Tools that check correctness
- **Indexing** — Search and embedding systems
- **Delivery** — APIs and CDN
- **Authoring** — Editors and interfaces

Each layer does one thing. Replace any layer without touching others. The file format is the integration point.

---

## Directory Structure

An MX content store organises content by purpose:

```
mx-content/
├── content/
│   ├── pages/              # Web pages (Markdown + frontmatter)
│   │   ├── products/
│   │   │   ├── widget-pro.md
│   │   │   └── widget-basic.md
│   │   └── about/
│   │       └── company.md
│   └── fragments/          # Content fragments (YAML)
│       ├── products/
│       │   ├── widget-pro.fragment.yaml
│       │   └── widget-basic.fragment.yaml
│       └── articles/
├── assets/
│   ├── images/
│   │   └── products/
│   │       ├── widget-hero.jpg
│   │       └── widget-hero.jpg.mx.yaml
│   ├── videos/
│   └── documents/
├── models/
│   ├── product.model.yaml
│   └── article.model.yaml
├── taxonomies/
│   ├── categories.yaml
│   └── tags.yaml
├── database/               # Database metadata (if applicable)
│   ├── schemas/
│   └── tables/
└── .mx/
    ├── config.yaml         # Repository configuration
    └── defaults.yaml       # Default properties
```

### The content Directory

Authored content lives here. Two main patterns:

**Pages** — Markdown files with YAML frontmatter:

```markdown
---
title: "Widget Pro"
ld:
  "@type": Product
  name: "Widget Pro"
mx:status: published
---

# Widget Pro

Professional-grade widget for demanding users.
```

**Fragments** — Pure YAML for structured content:

```yaml
# widget-pro.fragment.yaml
mx:
  version: "1.0"

identity:
  id: "frag-prod-widget-pro-001"
  model: product

content:
  name: "Widget Pro"
  sku: "WGT-PRO-001"
  price:
    amount: 299.99
    currency: GBP

mx:status: published
```

Use pages when content has significant prose. Use fragments when content is purely structured.

### The assets Directory

Binary files with sidecar metadata:

```
assets/images/products/
├── widget-hero.jpg
├── widget-hero.jpg.mx.yaml
├── widget-gallery-1.jpg
├── widget-gallery-1.jpg.mx.yaml
└── .mx.yaml                    # Directory defaults
```

The directory `.mx.yaml` sets defaults for all assets within:

```yaml
# assets/images/products/.mx.yaml
defaults:
  asset:
    type: image
  rights:
    owner: "Acme Corporation"
  mx:status: published
```

### The models Directory

Fragment models define schemas:

```yaml
# models/product.model.yaml
mx:
  version: "1.0"

model:
  name: product
  version: "1.0"

fields:
  - name: name
    type: text
    required: true
  - name: sku
    type: text
    required: true
  - name: price
    type: object
    fields:
      - name: amount
        type: number
      - name: currency
        type: text

defaults:
  mx:audience: both
```

Models enable validation. A fragment claiming `model: product` must have the required fields.

### The taxonomies Directory

Taxonomies provide controlled vocabularies:

```yaml
# taxonomies/categories.yaml
taxonomy:
  name: categories
  
terms:
  - id: electronics
    name: "Electronics"
    children:
      - id: widgets
        name: "Widgets"
      - id: gadgets
        name: "Gadgets"
  - id: accessories
    name: "Accessories"
```

Content references taxonomy terms:

```yaml
content:
  name: "Widget Pro"
  categories:
    - electronics/widgets
```

### The .mx Directory

Repository-level configuration:

```yaml
# .mx/config.yaml
repository:
  name: acme-content
  version: "1.0"
  
validation:
  strict: true
  require_status: true
  
defaults:
  mx:licenseType: proprietary
  mx:accessLevel: public

indexing:
  search:
    enabled: true
    engine: meilisearch
  embeddings:
    enabled: true
    model: text-embedding-ada-002
```

---

## File Formats

### Markdown with Frontmatter

For prose content:

```markdown
---
title: "Getting Started with Widget Pro"
description: "Learn how to set up and use your Widget Pro"

ld:
  "@type": TechArticle
  headline: "Getting Started with Widget Pro"
  proficiencyLevel: Beginner

mx:status: published
mx:audience: both
mx:confidence: 0.95

import:
  source: aem
  path: /content/mysite/en/docs/getting-started
  imported: 2026-01-28T10:00:00Z
---

# Getting Started with Widget Pro

Welcome to Widget Pro. This guide walks you through initial setup.

## Unboxing

Your Widget Pro package contains:

- Widget Pro device
- Power adapter
- Quick start guide

## Initial Setup

1. Connect the power adapter
2. Press the power button
3. Follow on-screen instructions

![Setup Screen](/assets/images/docs/setup-screen.jpg)
```

The frontmatter is YAML. The body is Markdown. Together they form a complete, machine-readable document.

### Fragment YAML

For structured content:

```yaml
# widget-pro.fragment.yaml
mx:
  version: "1.0"

identity:
  id: "frag-prod-widget-pro-001"
  path: /content/fragments/products/widget-pro
  model: product
  model_version: "1.0"

metadata:
  title: "Widget Pro"
  created: 2026-01-15T10:00:00Z
  modified: 2026-01-28T14:30:00Z
  status: published

content:
  name: "Widget Pro"
  sku: "WGT-PRO-001"
  short_description: "Professional-grade widget for demanding users"
  long_description: |
    The Widget Pro combines advanced technology with intuitive design.
    Built for professionals who demand reliability and performance.
  price:
    amount: 299.99
    currency: GBP
  features:
    - "Advanced processing unit"
    - "Premium build quality"
    - "5-year warranty"
  specifications:
    weight: "450g"
    dimensions: "120 x 80 x 25 mm"

variations:
  - id: "var-locale-de"
    type: locale
    locale: de-DE
    content:
      short_description: "Professionelles Widget für anspruchsvolle Anwender"

relationships:
  category:
    type: fragment_reference
    target: frag-cat-electronics-001
  hero_image:
    type: media_reference
    target: /assets/images/products/widget-hero.jpg

ld:
  "@type": Product
  name: "Widget Pro"
  sku: "WGT-PRO-001"
  offers:
    "@type": Offer
    price: 299.99
    priceCurrency: GBP

mx:status: published
mx:audience: both
mx:confidence: 0.95
mx:volatility: periodic

mx:
  rag:
    enabled: true
    priority: high
    hints:
      query_patterns:
        - "Widget Pro"
        - "widget price"
        - "professional widget"

import:
  source: aem
  path: /content/dam/mysite/content-fragments/products/widget-pro
  model: /conf/mysite/dam/cfm/models/product
  imported: 2026-01-28T10:00:00Z
```

### Media Sidecar YAML

For binary assets:

```yaml
# widget-hero.jpg.mx.yaml
mx:
  version: "1.0"

asset:
  title: "Widget Pro Hero Image"
  description: "Product hero shot on white background"
  alt_text: "Widget Pro device displayed on clean white background"
  
  type: image
  format: jpeg

technical:
  width: 2400
  height: 1600
  aspect_ratio: "3:2"
  color_space: sRGB
  dpi: 300

capture:
  photographer:
    name: "Sarah Chen"
  date: 2026-01-10
  location: "London Studio"

rights:
  owner: "Acme Corporation"
  copyright: "© 2026 Acme Corporation"
  license:
    type: proprietary

variants:
  - name: web
    path: widget-hero-1200.jpg
    width: 1200
  - name: thumbnail
    path: widget-hero-thumb.jpg
    width: 300

ai:
  training:
    permitted: false
  retrieval:
    permitted: true
  description:
    permitted: true

mx:status: published

import:
  source: aem
  path: /content/dam/mysite/products/widget-hero.jpg
  imported: 2026-01-28T10:00:00Z
```

---

## Import Metadata

Every migrated piece of content carries import provenance:

```yaml
import:
  source: aem                   # Source system
  path: /content/mysite/...     # Original path
  imported: 2026-01-28T10:00:00Z # When imported
  version: 3                     # Source version (if applicable)
  batch: "migration-2026-01"     # Migration batch ID
  checksum: "abc123..."          # Content checksum for verification
```

This enables:

- **Traceability** — Where did this come from?
- **Re-import** — Has the source changed?
- **Validation** — Does migrated content match source?
- **Rollback** — What was the original?

---

## MX Properties Gained

Migrated content gains MX properties that didn't exist in the source system.

### From Base Specification

```yaml
mx:status: published      # Lifecycle state (mapped from CMS status)
mx:audience: both         # Declares machine readability
mx:volatility: periodic   # Change frequency
mx:confidence: 0.9        # Quality indicator
mx:source: human          # Provenance
```

### For AI Readiness

```yaml
mx:
  rag:
    enabled: true
    priority: high
    chunking:
      strategy: section
      target_size: 500
    hints:
      query_patterns:
        - "Widget Pro features"
        - "widget pricing"
      qa_pairs:
        - question: "What does Widget Pro cost?"
          answer_location: content.price

ai:
  training:
    permitted: false
  retrieval:
    permitted: true
```

### For Data Lake

```yaml
datalake:
  partition:
    model: product
    year: 2026
    locale: en-GB
  embeddings:
    - field: description
      model: text-embedding-ada-002
      vector_id: "emb-prod-001"
  quality:
    completeness: 0.95
    accuracy: 0.98
```

These properties transform content from "stuff in a CMS" to "machine-ready data."

---

## Validation

The target system validates all content:

```bash
mx-validate content/
mx-validate assets/
mx-validate models/
```

Validation checks:

| Check | Description |
|-------|-------------|
| Schema | Properties match specification |
| Required | Required fields present |
| Types | Values have correct types |
| References | Referenced content exists |
| Models | Fragments match their models |
| Taxonomy | Terms exist in taxonomies |
| Relationships | Targets exist and are correct type |

Failed validation blocks publishing. Content must be correct to proceed.

---

## Indexing

After content loads, indexing builds derived data:

### Search Index

Full-text search over content:

```yaml
# Indexed fields from content
- title
- description
- content body
- tags
- categories

# Facets
- mx:status
- mx:audience
- content type
- category
- date
```

### Embedding Index

Vector embeddings for semantic search:

```yaml
embeddings:
  - content_id: frag-prod-widget-pro-001
    field: description
    model: text-embedding-ada-002
    vector: [0.023, -0.041, 0.087, ...]
    
  - content_id: frag-prod-widget-pro-001
    field: features
    model: text-embedding-ada-002
    vector: [0.015, -0.033, 0.092, ...]
```

### RAG Index

Chunked content optimised for retrieval:

```yaml
chunks:
  - content_id: frag-prod-widget-pro-001
    chunk_id: chunk-001
    text: "The Widget Pro combines advanced technology..."
    start_char: 0
    end_char: 500
    vector_id: vec-001
    
  - content_id: frag-prod-widget-pro-001
    chunk_id: chunk-002
    text: "Built for professionals who demand..."
    start_char: 450
    end_char: 950
    vector_id: vec-002
```

---

## Delivery

Content serves via APIs:

### Content API

```bash
# Get a fragment
GET /api/fragments/frag-prod-widget-pro-001

# Query fragments
GET /api/fragments?model=product&status=published

# Get a page
GET /api/pages/products/widget-pro
```

### Search API

```bash
# Full-text search
GET /api/search?q=professional+widget

# Faceted search
GET /api/search?q=widget&category=electronics&status=published
```

### RAG API

```bash
# Semantic search for RAG
POST /api/rag/retrieve
{
  "query": "What are Widget Pro's main features?",
  "limit": 5,
  "filters": {
    "mx:status": "published",
    "mx:audience": ["both", "machine"]
  }
}
```

---

## Comparison: Before and After

### AEM Content

```xml
<!-- Before: AEM JCR -->
<jcr:root jcr:primaryType="cq:Page">
  <jcr:content
      jcr:primaryType="cq:PageContent"
      jcr:title="Widget Pro"
      jcr:description="Professional-grade widget"
      cq:template="/conf/mysite/templates/product-page"
      cq:tags="[mysite:products/electronics]"
      sling:resourceType="mysite/components/pages/product">
    <root>
      <hero sling:resourceType="mysite/components/hero"
          title="Widget Pro"
          image="/content/dam/mysite/products/widget-hero.jpg"/>
    </root>
  </jcr:content>
</jcr:root>
```

```yaml
# After: MX Content
---
title: "Widget Pro"
description: "Professional-grade widget"

ld:
  "@type": Product
  name: "Widget Pro"
  image: /assets/images/products/widget-hero.jpg

categories:
  - products/electronics

mx:status: published
mx:audience: both
mx:confidence: 0.9

mx:
  rag:
    enabled: true
    hints:
      query_patterns:
        - "Widget Pro"

import:
  source: aem
  path: /content/mysite/en/products/widget-pro
---

# Widget Pro

![Widget Pro Hero](/assets/images/products/widget-hero.jpg)

Professional-grade widget for demanding users.
```

The MX version:

- Is human-readable
- Has explicit semantic type
- Declares machine readiness
- Includes RAG hints
- Preserves import provenance
- Works outside any CMS

---

## The Migration Promise

When migration completes, you have:

1. **All content** — Pages, fragments, assets, taxonomies
2. **Full metadata** — Original properties plus MX enrichment
3. **Machine understanding** — AI-ready from day one
4. **Complete history** — Import provenance for every item
5. **Validated quality** — Everything passes specification checks
6. **Indexed access** — Search, embeddings, RAG retrieval ready

The content is free. It belongs to you, not a vendor. It's ready for whatever comes next.

---

*The following chapter covers migration strategy — planning the programme that gets you from source to target.*
