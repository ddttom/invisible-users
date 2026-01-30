---
title: "MX Specifications: Chapter 9"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "Composition"
  author:
    "@type": Person
    name: Tom Ledger
  isPartOf:
    "@type": Book
    name: "MX: Specifications"
  inLanguage: en-GB
  mx:audience: human
  mx:status: draft
  mx:confidence: 0.85
---

# Chapter 9: Composition

You've now learned six domain specifications: Structured Data, Code, Media, Content Fragments, Data Lake, and Database. Each describes a different type of content for machines.

But real systems don't use one specification in isolation. A product page combines structured data with media references with content fragments with database queries. An API combines code metadata with documentation with database schemas.

This chapter covers composition — how specifications work together, how properties flow between them, and how to build coherent metadata strategies for complex systems.

---

## The Ensemble Principle

Remember the musical metaphor from Chapter 1. Notes are properties. Songs are specifications. But real music happens when musicians play together — the ensemble.

MX specifications are designed for ensemble playing. They share a common foundation (the Base Specification), use consistent patterns, and complement rather than conflict with each other.

When you compose specifications, you're not bolting separate systems together. You're writing for an ensemble where each part knows its role.

### Shared Foundation

Every specification inherits from the Base Specification. This means core properties work everywhere:

```yaml
# These properties mean the same thing in any specification
mx:status: published
mx:audience: both
mx:volatility: periodic
mx:confidence: 0.95
```

Whether you're describing a database table, a media asset, or a content fragment, `mx:status: published` means the same thing. The ensemble shares a vocabulary.

### Complementary Domains

Each specification covers a domain. The domains don't overlap — they complement:

| Specification | Domain | Answers |
|---------------|--------|---------|
| Structured Data | Web content semantics | What does this page mean? |
| Code | Source code context | How should AI handle this code? |
| Media | Binary assets | What can I do with this image? |
| Content Fragments | Headless content | How does this content vary? |
| Data Lake | AI infrastructure | How should this be indexed? |
| Database | Schema and queries | What does this data mean? |

A product page might use Structured Data for SEO, Media for images, Content Fragments for the description, and Data Lake for search indexing. Each specification handles its domain; together they describe the complete system.

---

## Composition Patterns

### Pattern 1: Layered Metadata

The most common pattern layers specifications on the same content:

```yaml
# A product page with layered metadata
mx:
  version: "1.0"

# Structured Data layer - for search engines and semantic understanding
ld:
  "@type": Product
  name: "Widget Pro"
  description: "Professional-grade widget"
  offers:
    "@type": Offer
    price: 299.99
    priceCurrency: GBP

# Content Fragment layer - for multi-channel delivery
fragment:
  id: "frag-prod-widget-pro-001"
  model: product
  variations:
    - type: locale
      locale: de-DE
    - type: channel
      channel: mobile

# Data Lake layer - for AI retrieval
datalake:
  partition:
    model: product
    locale: en-GB
  embeddings:
    - field: description
      model: text-embedding-ada-002

# RAG layer - for AI assistants
mx:
  rag:
    enabled: true
    hints:
      query_patterns:
        - "What is Widget Pro?"

# Base properties apply to all layers
mx:status: published
mx:audience: both
```

Each layer adds meaning without conflicting with others. A system that only understands structured data ignores the fragment layer. A RAG system uses the data lake layer. Everyone respects the base properties.

### Pattern 2: Referenced Composition

Sometimes content references other content that has its own metadata:

```yaml
# A content fragment referencing media
fragment:
  id: "frag-prod-widget-pro-001"
  
  content:
    name: "Widget Pro"
    hero_image: /assets/products/widget-pro-hero.jpg
    
  relationships:
    hero_image:
      type: media_reference
      target: /assets/products/widget-pro-hero.jpg
      mx:include_metadata: true
```

The media asset has its own sidecar metadata:

```yaml
# /assets/products/widget-pro-hero.jpg.mx.yaml
asset:
  title: "Widget Pro Hero"
  rights:
    license:
      type: proprietary
  ai:
    training:
      permitted: false
```

When the fragment references the image, both metadata sets apply. The fragment knows what the image is for; the media metadata knows what you can do with it.

### Pattern 3: Cross-Domain Queries

Database metadata can reference content fragments, and vice versa:

```yaml
# Database table metadata
table:
  name: products
  
  columns:
    - name: content_fragment_id
      description: "Reference to CMS content fragment"
      semantic:
        type: identifier
        entity: content_fragment
      ai:
        note: "Join with content API for full product details"
        
    - name: description
      description: "Product description (synced from CMS)"
      ai:
        source: "content_fragment.content.description"
        sync: "nightly"
```

```yaml
# Content fragment metadata
fragment:
  id: "frag-prod-widget-pro-001"
  
  data_lake:
    database_sync:
      table: products
      column_mapping:
        name: product_name
        description: description
        price.amount: price
```

The database knows its description comes from the CMS. The fragment knows it syncs to the database. AI understands the full picture.

---

## Inheritance Across Specifications

Properties can inherit not just within a specification, but across them.

### Vertical Inheritance

Within a single domain, properties flow down:

```
Repository .mx.yaml
  → Directory .mx.yaml
    → File metadata
      → Inline annotation
```

### Horizontal Inheritance

Across domains, properties can flow between related content:

```yaml
# A content fragment can inherit from its media assets
fragment:
  id: "frag-gallery-001"
  
  inheritance:
    from_relationships:
      - relationship: images
        inherit:
          - rights.license
          - ai.training
        strategy: most_restrictive
```

If any image in a gallery prohibits AI training, the gallery inherits that restriction.

### Inheritance Resolution

When the same property could come from multiple sources:

1. Explicit declaration (highest priority)
2. Horizontal inheritance from relationships
3. Vertical inheritance from parent
4. Specification defaults
5. Base specification defaults (lowest priority)

```yaml
# Explicit declaration always wins
mx:status: draft  # This value is used

# Even if the parent says published
# Even if related content says published
# Even if the default is published
```

---

## Conflict Resolution

What happens when specifications disagree?

### The Most Restrictive Rule

For permissions and restrictions, the most restrictive value wins:

```yaml
# Content fragment allows AI training
fragment:
  ai:
    training:
      permitted: true

# But a referenced image prohibits it
# /assets/hero.jpg.mx.yaml
asset:
  ai:
    training:
      permitted: false

# Result: AI training is not permitted for content that includes this image
```

This prevents accidentally granting permissions that a component restricts.

### The Most Specific Rule

For descriptive properties, the most specific value wins:

```yaml
# Database table says column is "User email"
table:
  columns:
    - name: email
      ai:
        display_name: "User email"

# But a view built on this table says "Customer email"  
view:
  columns:
    - name: email
      ai:
        display_name: "Customer email"

# Result: In the view context, "Customer email" is used
```

The more specific context provides more specific meaning.

### Explicit Conflict Handling

When automatic resolution isn't right, declare it:

```yaml
fragment:
  relationships:
    hero_image:
      target: /assets/hero.jpg
      
      conflict_resolution:
        rights.license:
          strategy: override
          value: "inherited-with-modification"
          reason: "Licensed specifically for this use"
```

---

## Building a Metadata Strategy

For real implementations, you need a coherent strategy — not just individual metadata files.

### Step 1: Identify Your Content Types

What kinds of content does your system have?

- Web pages (→ Structured Data)
- Product information (→ Content Fragments)
- Images and video (→ Media)
- Source code (→ Code)
- Database tables (→ Database)
- AI-indexed content (→ Data Lake)

### Step 2: Map the Relationships

How do content types relate?

```
Product Page
├── uses → Product Fragment
│   ├── references → Hero Image
│   ├── references → Gallery Images
│   └── syncs to → Database Table
├── indexed by → Search System (Data Lake)
└── rendered with → Page Template (Structured Data)
```

### Step 3: Define Inheritance Chains

What properties should flow automatically?

```yaml
# Organisation-wide defaults
mx:
  defaults:
    ai:
      training:
        permitted: false  # Default: don't train on our content
    rights:
      owner: "Acme Corporation"
      
# Product content defaults  
products:
  defaults:
    mx:audience: both
    mx:volatility: periodic
    
# Individual products inherit these
```

### Step 4: Establish Governance

Who can change what?

```yaml
governance:
  base_properties:
    # Only admins can change AI training permissions
    ai.training:
      change_requires: admin_approval
      
  content_fragments:
    # Content team can modify content
    content:
      change_requires: content_team
    # But classification needs data governance
    classification:
      change_requires: data_governance
```

### Step 5: Validate Composition

Build validation that checks cross-specification consistency:

```bash
# Example validation rules
mx-validate composition \
  --check "fragments reference valid media" \
  --check "database tables match fragment models" \
  --check "ai permissions are consistent across references" \
  --check "all required properties are set"
```

---

## Real-World Example: E-Commerce Product

Here's how specifications compose for a complete e-commerce product:

### The Product Fragment

```yaml
# /fragments/products/widget-pro.fragment.yaml
mx:
  version: "1.0"

identity:
  id: "frag-prod-widget-pro-001"
  model: product

metadata:
  title: "Widget Pro"
  status: published

content:
  name: "Widget Pro"
  sku: "WGT-PRO-001"
  short_description: "Professional-grade widget"
  long_description: "The Widget Pro combines..."
  price:
    amount: 299.99
    currency: GBP
  features:
    - "Advanced processing"
    - "Premium build"
    - "5-year warranty"

relationships:
  hero_image:
    type: media_reference
    target: /assets/products/widget-pro/hero.jpg
  gallery:
    type: media_reference
    cardinality: many
    targets:
      - /assets/products/widget-pro/angle-1.jpg
      - /assets/products/widget-pro/angle-2.jpg
  category:
    type: fragment_reference
    target: frag-cat-electronics-001

variations:
  - type: locale
    locale: de-DE
    content:
      short_description: "Professionelles Widget"

# Structured Data for the product page
ld:
  "@type": Product
  name: "Widget Pro"
  sku: "WGT-PRO-001"
  offers:
    "@type": Offer
    price: 299.99
    priceCurrency: GBP
    availability: InStock

# Data Lake configuration
datalake:
  partition:
    model: product
  embeddings:
    - field: long_description
      model: text-embedding-ada-002
  quality:
    completeness: 1.0

# RAG configuration
mx:
  rag:
    enabled: true
    priority: high
    hints:
      query_patterns:
        - "Widget Pro"
        - "professional widget"
      qa_pairs:
        - question: "What does Widget Pro cost?"
          answer_location: content.price

mx:status: published
mx:audience: both
mx:volatility: periodic
```

### The Hero Image

```yaml
# /assets/products/widget-pro/hero.jpg.mx.yaml
mx:
  version: "1.0"

asset:
  title: "Widget Pro Hero Image"
  alt_text: "Widget Pro device on white background"
  
  type: image
  format: jpeg
  
  technical:
    width: 2400
    height: 1600
    
  capture:
    photographer:
      name: "Sarah Chen"
    date: 2026-01-10
    
  rights:
    owner: "Acme Corporation"
    license:
      type: proprietary
      
  ai:
    training:
      permitted: false
    retrieval:
      permitted: true
      
  variants:
    - name: web
      path: hero-1200.jpg
      width: 1200
    - name: thumbnail
      path: hero-thumb.jpg
      width: 300

mx:status: published
```

### The Database Table

```yaml
# /database/tables/products.mx.yaml
mx:
  version: "1.0"

table:
  name: products
  description: "Product catalog"
  
  columns:
    - name: id
      type: uuid
      primary_key: true
      semantic:
        type: identifier
        entity: product
        
    - name: sku
      type: varchar(50)
      unique: true
      semantic:
        type: identifier
        role: external
        
    - name: content_fragment_id
      type: varchar(100)
      description: "Reference to CMS content fragment"
      ai:
        note: "Source of truth for content is the CMS"
        
    - name: price
      type: decimal(10,2)
      semantic:
        type: money
        role: price
        
    - name: stock_level
      type: integer
      description: "Current inventory"
      ai:
        note: "Real-time data not in CMS"

  ai:
    purpose: "Inventory and transactional product data"
    content_source: "CMS content fragments"
    
mx:status: published
```

### How They Work Together

When an AI assistant needs to answer "What's the Widget Pro and is it in stock?":

1. **RAG retrieval** uses Data Lake metadata to find the product fragment
2. **Content Fragment** provides the description, features, and price
3. **Structured Data** confirms the semantic type (Product) and availability
4. **Database** provides real-time stock level
5. **Media** metadata ensures images can be shown but not used for training

Each specification contributes its expertise. The AI assembles a complete answer from the ensemble.

---

## Anti-Patterns

### Anti-Pattern 1: Duplicate Declarations

Don't repeat the same information in multiple specifications:

```yaml
# BAD: Same description in three places
fragment:
  content:
    description: "Professional-grade widget"
    
ld:
  description: "Professional-grade widget"
  
datalake:
  content:
    description: "Professional-grade widget"
```

Instead, declare once and reference:

```yaml
# GOOD: Single source of truth
fragment:
  content:
    description: "Professional-grade widget"
    
ld:
  description: "{fragment.content.description}"
  
datalake:
  indexed_fields:
    - fragment.content.description
```

### Anti-Pattern 2: Conflicting Permissions

Don't grant permissions that components restrict:

```yaml
# BAD: Fragment allows training, but image prohibits it
fragment:
  ai:
    training:
      permitted: true
  relationships:
    hero_image:
      target: /assets/hero.jpg  # This image prohibits training!
```

Validate that permissions are consistent across the composition.

### Anti-Pattern 3: Orphaned Metadata

Don't create metadata for content that doesn't exist:

```yaml
# BAD: Media metadata for a file that was deleted
# /assets/old-hero.jpg.mx.yaml exists
# But /assets/old-hero.jpg was deleted

# Validation should catch this
```

Keep metadata and content in sync.

### Anti-Pattern 4: Over-Specification

Don't add metadata you don't need:

```yaml
# BAD: Full specification for a throwaway script
# /scripts/one-time-migration.js.mx.yaml with 200 lines of metadata
```

Match metadata investment to content importance.

---

## Composition Checklist

When composing specifications, verify:

- [ ] All referenced content exists
- [ ] Permissions are consistent (most restrictive applies)
- [ ] Single source of truth for shared properties
- [ ] Inheritance chains are clear
- [ ] Conflict resolution is explicit where needed
- [ ] Validation covers cross-specification rules
- [ ] Governance defines who can change what

---

## The Orchestra in Action

Composition is where MX specifications become powerful. Individual specifications describe individual content types. Composed specifications describe complete systems.

The orchestra metaphor holds: each instrument plays its part, but they follow the same conductor (the Base Specification), read from the same score (consistent patterns), and create music that's richer than any solo performance.

Your metadata strategy is the score. Write it well, and the ensemble plays beautifully.

---

*The following chapter covers the MX Ecosystem — tools, extensions, and the community that brings specifications to life.*
