---
title: "MX Content Fragment Specification"
date: 2026-01-28
ld:
  "@type": TechArticle
  headline: "MX Content Fragment Specification"
  proficiencyLevel: Intermediate
  author:
    "@type": Person
    name: Tom Ledger
    jobTitle: Principal Consultant
    worksFor:
      "@type": Organization
      name: Digital Domain Technologies Ltd
  publisher:
    "@type": Organization
    name: MX Community
  isPartOf:
    "@type": CreativeWorkSeries
    name: "MX: The Bible"
  inLanguage: en-GB
  mx:audience: both
  mx:status: draft
  mx:source: ai-assisted
  mx:verifiedBy:
    "@type": Person
    name: Tom Ledger
  mx:volatility: periodic
  mx:reviewDate: 2026-04-02
  mx:chunkBoundary: heading
  mx:chunkSize: 500
  mx:standalone: true
  mx:canonicalFor: https://mx.community/spec/content-fragments
  mx:accessLevel: public
  mx:licenseType: attribution
  mx:citationRequired: true
  mx:completeness: 0.9
  mx:accuracy: 0.85
  mx:confidence: 0.8
  mx:prerequisites:
    - /spec/base/
    - /spec/structured-data/
  mx:inheritable:
    - author
    - publisher
    - inLanguage
    - mx:accessLevel
    - mx:licenseType
---

# MX Content Fragment Specification

Version: 1.0.0-draft
Status: Draft
Last Updated: January 2026

---

## Introduction

This specification defines how content fragments — discrete, reusable units of content — declare metadata for machine processors. Content fragments are the atomic units of headless content management, designed for assembly, reuse, and delivery across multiple channels.

This specification extends the **MX Base Specification** (`mx.community/spec/base`) and inherits all core properties defined there.

The specification covers:

- Fragment structure and identification
- Fragment models and schemas
- Variation and localisation
- Relationships and references
- Fragment collections
- AI agent interpretation guidance
- Inheritance and extensions

For data lake integration, RAG optimisation, and analytics metadata, see the **MX Data Lake Specification** (`mx.community/spec/data-lake`).

### Relationship to Base Specification

This specification inherits from MX Base:

- All core properties (`mx:audience`, `mx:status`, `mx:volatility`, etc.)
- All inheritance properties (`mx:inheritable`, `mx:inherit`, etc.)
- All AI properties (`ai.training`, `ai.extraction`, etc.)
- All classification properties
- Extension framework

This specification adds:

- Fragment identity and model structures
- Variation framework (locale, channel, audience, experiment)
- Fragment relationship types
- Field-level MX properties (`mx:searchable`, `mx:facetable`)
- Fragment collection types (curated, dynamic, smart)

---

## Content Fragment Fundamentals

### What is a Content Fragment?

A content fragment is a discrete unit of structured content, independent of presentation. Unlike pages or documents, fragments:

- Have no inherent layout or design
- Are defined by a schema (model)
- Can be assembled into multiple outputs
- Support variations for different contexts
- Are addressable and referenceable

### Fragment vs Document

| Aspect | Document | Fragment |
|--------|----------|----------|
| Structure | Fixed, hierarchical | Schema-defined, flexible |
| Presentation | Embedded or implied | Separate, channel-specific |
| Granularity | Complete unit | Atomic, composable |
| Reuse | Copy or link | Reference and assemble |
| Delivery | Single output | Multi-channel |

### Fragment Anatomy

```
┌─────────────────────────────────────────┐
│ Fragment                                │
├─────────────────────────────────────────┤
│ Identity                                │
│   - ID, path, model reference           │
├─────────────────────────────────────────┤
│ Metadata                                │
│   - MX properties, lifecycle, rights    │
├─────────────────────────────────────────┤
│ Content                                 │
│   - Fields defined by model             │
├─────────────────────────────────────────┤
│ Variations                              │
│   - Locale, channel, audience variants  │
├─────────────────────────────────────────┤
│ Relationships                           │
│   - References to other fragments       │
└─────────────────────────────────────────┘
```

---

## Fragment Structure

### Basic Fragment

```yaml
# /fragments/products/widget-pro.fragment.yaml
mx:
  version: "1.0"
  
identity:
  id: "frag-prod-widget-pro-001"
  path: /fragments/products/widget-pro
  model: product
  model_version: "2.0"
  
metadata:
  title: "Widget Pro"
  created: 2026-01-15T10:30:00Z
  modified: 2026-01-25T14:45:00Z
  created_by: jane.author@example.com
  modified_by: john.editor@example.com
  status: published
  version: 3
  tags:
    - product
    - electronics
    - featured
    
  mx:audience: both
  mx:volatility: periodic
  mx:confidence: 0.95
  mx:completeness: 1.0
  
content:
  name: "Widget Pro"
  sku: "WGT-PRO-001"
  short_description: "Professional-grade widget for demanding users"
  long_description: |
    The Widget Pro combines cutting-edge technology with intuitive design.
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
    battery_life: "12 hours"
  images:
    hero: /assets/products/widget-pro-hero.jpg
    gallery:
      - /assets/products/widget-pro-angle-1.jpg
      - /assets/products/widget-pro-angle-2.jpg
      - /assets/products/widget-pro-detail.jpg
      
variations:
  # See Variations section
  
relationships:
  # See Relationships section
```

### Identity Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | Text | Globally unique identifier |
| `path` | Text | Logical path in content repository |
| `model` | Text | Fragment model name |
| `model_version` | Text | Version of model this fragment conforms to |
| `slug` | Text | URL-safe identifier |
| `urn` | Text | Uniform Resource Name |

### Metadata Properties

| Property | Type | Description |
|----------|------|-------------|
| `title` | Text | Human-readable title |
| `created` | DateTime | Creation timestamp |
| `modified` | DateTime | Last modification timestamp |
| `created_by` | Text | Creator identifier |
| `modified_by` | Text | Last modifier identifier |
| `status` | Text | Lifecycle status |
| `version` | Number | Content version number |
| `tags` | Array | Classification tags |
| `locale` | Text | Primary locale (BCP 47) |

### Status Values

| Status | Description |
|--------|-------------|
| `draft` | Work in progress, not published |
| `review` | Awaiting review or approval |
| `approved` | Approved, ready for publication |
| `published` | Live, publicly accessible |
| `archived` | No longer active, retained for reference |
| `deprecated` | Superseded, scheduled for removal |

---

## Fragment Models

Fragment models define the schema for content fragments — the fields, types, and constraints that fragments must conform to.

### Model Definition

```yaml
# /models/product.model.yaml
mx:
  version: "1.0"
  
model:
  name: product
  version: "2.0"
  description: "Product content fragment for e-commerce"
  
  mx:audience: machine
  mx:stability: stable
  
fields:
  - name: name
    type: text
    required: true
    constraints:
      max_length: 200
    mx:searchable: true
    mx:facetable: false
    
  - name: sku
    type: text
    required: true
    constraints:
      pattern: "^[A-Z]{3}-[A-Z]+-[0-9]{3}$"
    mx:searchable: true
    mx:unique: true
    
  - name: short_description
    type: text
    required: true
    constraints:
      max_length: 500
    mx:searchable: true
    mx:summary_field: true
    
  - name: long_description
    type: richtext
    required: false
    mx:searchable: true
    
  - name: price
    type: object
    required: true
    fields:
      - name: amount
        type: number
        required: true
        constraints:
          min: 0
      - name: currency
        type: text
        required: true
        constraints:
          enum: [GBP, USD, EUR]
    mx:searchable: false
    mx:facetable: true
    
  - name: features
    type: array
    items:
      type: text
    constraints:
      min_items: 1
      max_items: 10
    mx:searchable: true
    
  - name: specifications
    type: object
    required: false
    dynamic: true
    mx:searchable: true
    
  - name: images
    type: object
    required: true
    fields:
      - name: hero
        type: reference
        reference_type: media
        required: true
      - name: gallery
        type: array
        items:
          type: reference
          reference_type: media
          
  - name: related_products
    type: array
    items:
      type: reference
      reference_type: fragment
      model: product
    mx:relationship: related
    
validation:
  rules:
    - name: price_consistency
      condition: "price.amount > 0"
      message: "Price must be greater than zero"
      
    - name: description_length
      condition: "len(long_description) > len(short_description)"
      message: "Long description should be longer than short description"
      
inheritance:
  extends: base-content
  overrides:
    - fields.status
```

### Field Types

| Type | Description |
|------|-------------|
| `text` | Plain text string |
| `richtext` | Formatted text (HTML/Markdown) |
| `number` | Numeric value |
| `boolean` | True/false |
| `date` | Date value |
| `datetime` | Date and time |
| `object` | Nested object |
| `array` | List of values |
| `reference` | Reference to another entity |
| `media` | Media asset reference |
| `json` | Raw JSON data |
| `markdown` | Markdown text |

### Field MX Properties

| Property | Type | Description |
|----------|------|-------------|
| `mx:searchable` | Boolean | Include in full-text search |
| `mx:facetable` | Boolean | Use for filtering/faceting |
| `mx:sortable` | Boolean | Enable sorting |
| `mx:summary_field` | Boolean | Use in summaries |
| `mx:unique` | Boolean | Must be unique across fragments |
| `mx:sensitive` | Boolean | Contains sensitive data |
| `mx:pii` | Boolean | Contains personally identifiable information |

---

## Variations

Variations allow a single fragment to have multiple versions for different contexts — locales, channels, audiences, or A/B tests.

### Variation Structure

```yaml
# /fragments/products/widget-pro.fragment.yaml
identity:
  id: "frag-prod-widget-pro-001"
  model: product
  
content:
  # Master content (default variation)
  name: "Widget Pro"
  short_description: "Professional-grade widget for demanding users"
  price:
    amount: 299.99
    currency: GBP
    
variations:
  - id: "var-locale-de"
    type: locale
    locale: de-DE
    content:
      name: "Widget Pro"
      short_description: "Professionelles Widget für anspruchsvolle Anwender"
      price:
        amount: 349.99
        currency: EUR
        
  - id: "var-locale-fr"
    type: locale
    locale: fr-FR
    content:
      name: "Widget Pro"
      short_description: "Widget professionnel pour utilisateurs exigeants"
      price:
        amount: 349.99
        currency: EUR
        
  - id: "var-channel-mobile"
    type: channel
    channel: mobile
    content:
      short_description: "Pro-grade widget"  # Shorter for mobile
      
  - id: "var-audience-b2b"
    type: audience
    audience: b2b
    content:
      short_description: "Enterprise-grade widget for business deployment"
      price:
        amount: 249.99    # B2B discount
        currency: GBP
        
  - id: "var-test-headline"
    type: experiment
    experiment:
      id: "exp-headline-2026-01"
      variant: "b"
    content:
      short_description: "The widget trusted by professionals worldwide"
```

### Variation Types

| Type | Purpose | Selection Criteria |
|------|---------|-------------------|
| `locale` | Language/region | User locale, Accept-Language |
| `channel` | Delivery channel | Device, platform, touchpoint |
| `audience` | User segment | User attributes, segment membership |
| `experiment` | A/B testing | Experiment assignment |
| `temporal` | Time-based | Date/time conditions |
| `personalised` | Individual | User profile, behaviour |

### Variation Resolution

```yaml
variations:
  resolution:
    strategy: cascade      # cascade | override | merge
    priority:
      - personalised
      - experiment
      - audience
      - channel
      - locale
    fallback: master
```

| Strategy | Behaviour |
|----------|-----------|
| `cascade` | Apply variations in priority order, each extending previous |
| `override` | Highest priority variation replaces master entirely |
| `merge` | Deep merge all applicable variations |

### Variation Metadata

```yaml
variations:
  - id: "var-locale-de"
    type: locale
    locale: de-DE
    
    metadata:
      status: published
      created: 2026-01-16T09:00:00Z
      modified: 2026-01-20T11:30:00Z
      translator: translation-team@example.com
      translation_source: human
      translation_accuracy: 0.98
      
    mx:confidence: 0.95
    mx:completeness: 1.0
    mx:volatility: stable
```

---

## Relationships

Fragments can reference other fragments, media assets, and external resources.

### Reference Types

```yaml
relationships:
  # Fragment references
  related_products:
    type: fragment_reference
    model: product
    cardinality: many
    targets:
      - frag-prod-widget-basic-001
      - frag-prod-widget-plus-001
      
  parent_category:
    type: fragment_reference
    model: category
    cardinality: one
    target: frag-cat-electronics-001
    
  # Media references
  hero_image:
    type: media_reference
    media_type: image
    target: /assets/products/widget-pro-hero.jpg
    
  product_video:
    type: media_reference
    media_type: video
    target: /assets/videos/widget-pro-demo.mp4
    
  # External references
  manufacturer_page:
    type: external_reference
    url: https://manufacturer.com/widget-pro
    
  # Content references (within richtext)
  embedded_references:
    - type: fragment_reference
      model: testimonial
      target: frag-testimonial-jane-001
      context: "Embedded in long_description"
```

### Relationship Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | Text | Reference type |
| `model` | Text | Target fragment model (for fragment refs) |
| `cardinality` | Text | `one` or `many` |
| `target` / `targets` | Text/Array | Target identifier(s) |
| `bidirectional` | Boolean | Whether relationship is two-way |
| `cascade_delete` | Boolean | Delete target when source deleted |
| `required` | Boolean | Whether reference must resolve |

### Relationship MX Properties

```yaml
relationships:
  related_products:
    type: fragment_reference
    targets:
      - frag-prod-widget-basic-001
      
    mx:semantic_relationship: related
    mx:relationship_strength: 0.8
    mx:include_in_context: true
    mx:traverse_depth: 1
```

| Property | Type | Description |
|----------|------|-------------|
| `mx:semantic_relationship` | Text | Relationship meaning (related, parent, child, etc.) |
| `mx:relationship_strength` | Number | How strongly related (0-1) |
| `mx:include_in_context` | Boolean | Include target content when retrieving |
| `mx:traverse_depth` | Number | How many levels deep to traverse |

---

## Fragment Collections

### Collection Definition

```yaml
# /collections/featured-products.collection.yaml
mx:
  version: "1.0"
  
collection:
  id: "col-featured-products-2026-q1"
  name: "Featured Products Q1 2026"
  description: "Curated selection of featured products for Q1 2026"
  
  type: curated              # curated | dynamic | smart
  
  members:
    - fragment_id: frag-prod-widget-pro-001
      position: 1
      featured: true
      
    - fragment_id: frag-prod-widget-basic-001
      position: 2
      
    - fragment_id: frag-prod-gadget-x-001
      position: 3
      
  metadata:
    status: published
    created: 2026-01-10
    modified: 2026-01-25
    valid_from: 2026-01-01
    valid_until: 2026-03-31
    
  mx:audience: both
  mx:volatility: periodic
```

### Dynamic Collections

```yaml
collection:
  id: "col-new-products"
  name: "New Products"
  type: dynamic
  
  query:
    model: product
    filters:
      - field: metadata.created
        operator: gte
        value: "now-30d"
      - field: metadata.status
        operator: eq
        value: published
    sort:
      - field: metadata.created
        direction: desc
    limit: 20
    
  refresh:
    strategy: scheduled
    interval: 1h
```

### Smart Collections

```yaml
collection:
  id: "col-recommended-for-user"
  name: "Recommended Products"
  type: smart
  
  algorithm:
    type: recommendation
    model: product-recommender-v2
    
    inputs:
      - source: user_profile
        fields: [interests, purchase_history]
      - source: browsing_history
        fields: [viewed_products, search_queries]
        
    parameters:
      diversity: 0.3
      recency_weight: 0.2
      
  personalisation:
    enabled: true
    fallback: col-featured-products-2026-q1
```

---

## Inheritance

Fragment metadata supports inheritance from models, directories, and parent fragments.

### Model Inheritance

Fragments inherit default metadata from their model:

```yaml
# /models/product.model.yaml
model:
  name: product
  
  defaults:
    mx:audience: both
    mx:volatility: periodic
```

Fragments override as needed:

```yaml
# /fragments/products/widget-pro.fragment.yaml
identity:
  model: product
  
metadata:
  mx:volatility: stable    # Override model default
  # mx:audience inherited as "both"
```

### Directory Inheritance

```yaml
# /fragments/products/_mx.yaml
mx:
  defaults:
    metadata:
      tags: [product]
    classification:
      sensitivity: internal
      
  mx:inheritable:
    - metadata.tags
    - classification
```

### Fragment Inheritance

Fragments can inherit from other fragments:

```yaml
# /fragments/products/widget-pro-2026.fragment.yaml
identity:
  id: "frag-prod-widget-pro-2026-001"
  model: product
  
inheritance:
  parent: frag-prod-widget-pro-001
  strategy: extend           # extend | override
  
content:
  # Inherits all content from parent
  # Overrides:
  name: "Widget Pro 2026 Edition"
  price:
    amount: 349.99
    currency: GBP
  features:
    mx:extend: true          # Extend parent array
    values:
      - "2026 Edition improvements"
```

### Inheritance Resolution

```
Model defaults
  → Directory defaults
    → Parent fragment (if inherited)
      → Fragment declaration
        → Variation overrides
```

---

## Extensions

### CMS Extensions

```yaml
mx:
  cms:
    workflow:
      current_stage: review
      assignee: editor@example.com
      due_date: 2026-02-01
      
    publishing:
      channels: [web, mobile, api]
      scheduled: 2026-02-01T09:00:00Z
      
    locks:
      locked: true
      locked_by: jane@example.com
      locked_at: 2026-01-28T10:00:00Z
```

### E-commerce Extensions

```yaml
mx:
  ecommerce:
    inventory:
      sku: "WGT-PRO-001"
      stock_level: 150
      warehouse: uk-central
      
    pricing:
      base_price: 299.99
      sale_price: 249.99
      sale_ends: 2026-02-14
      
    categories:
      primary: electronics/widgets
      secondary: [gifts, featured]
```

### Personalisation Extensions

```yaml
mx:
  personalisation:
    segments:
      - segment: high-value-customers
        score: 0.85
      - segment: tech-enthusiasts
        score: 0.92
        
    recommendations:
      model: content-recommender-v3
      score: 0.78
      
    targeting:
      include_audiences: [returning-visitors, cart-abandoners]
      exclude_audiences: [purchased-recently]
```

---

## Interpretation by AI Agents

### Fragment Processing

AI agents encountering content fragments SHOULD:

1. Check fragment status before using (only use `published` by default)
2. Respect variation resolution for user context
3. Follow relationship traversal limits
4. Apply field-level properties for search and display

### Status Interpretation

| Status | Agent Behaviour |
|--------|-----------------|
| `draft` | Do not use in responses |
| `review` | Do not use in responses |
| `approved` | May use if published content unavailable |
| `published` | Standard use |
| `archived` | Use only for historical queries |
| `deprecated` | Warn user, suggest alternatives |

### Variation Selection

Agents SHOULD select variations based on:

1. User locale (from request or profile)
2. Channel (device, platform)
3. Audience segment (if known)
4. Experiment assignment (if applicable)

When multiple variations match, apply resolution strategy.

### Relationship Traversal

When `mx:include_in_context: true`:

- Include related fragment content
- Respect `mx:traverse_depth` limit
- Prioritise by `mx:relationship_strength`

---

## Migration Guidance

### Phase 1: Model Definition

Define fragment models for your content types:

1. Audit existing content structures
2. Identify common patterns
3. Create model definitions
4. Add MX properties for search and retrieval

### Phase 2: Fragment Conversion

Convert existing content to fragments:

```bash
# Export from CMS
mx-fragment export --source cms --format yaml --output /fragments/

# Validate against models
mx-fragment validate /fragments/**/*.fragment.yaml
```

### Phase 3: Variation Setup

Configure variations:

1. Identify localisation requirements
2. Define channel-specific adaptations
3. Set up audience segmentation
4. Configure experiment framework

---

## Appendix A: Quick Reference

### Fragment File Naming

| Type | Pattern |
|------|---------|
| Fragment | `{name}.fragment.yaml` |
| Model | `{name}.model.yaml` |
| Collection | `{name}.collection.yaml` |
| Directory defaults | `_mx.yaml` |

### Status Lifecycle

```
draft → review → approved → published → archived
                    ↓
                deprecated
```

### Common MX Properties

| Property | Level | Description |
|----------|-------|-------------|
| `mx:audience` | Fragment | Target audience |
| `mx:volatility` | Fragment | Change frequency |
| `mx:confidence` | Fragment | Content confidence |
| `mx:completeness` | Fragment | Completeness score |
| `mx:searchable` | Field | Include in search |
| `mx:facetable` | Field | Use for filtering |
| `mx:sensitive` | Field | Contains sensitive data |

---

## Appendix B: Schema.org Alignment

| Fragment Model | Schema.org Type |
|----------------|-----------------|
| `product` | `Product` |
| `article` | `Article` |
| `event` | `Event` |
| `person` | `Person` |
| `organisation` | `Organization` |
| `faq` | `FAQPage` |
| `how-to` | `HowTo` |
| `recipe` | `Recipe` |
| `review` | `Review` |

---

## Appendix C: References

- MX Base Specification: https://mx.community/spec/base
- MX Structured Data Specification: https://mx.community/spec/structured-data
- MX Data Lake Specification: https://mx.community/spec/data-lake
- Schema.org: https://schema.org/

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0-draft | January 2026 | Initial draft |
