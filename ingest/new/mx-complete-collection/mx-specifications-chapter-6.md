---
title: "MX Specifications: Chapter 6"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "Content Fragments"
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

# Chapter 6: Content Fragments

A product description appears on your website. The same description appears in your mobile app, slightly shorter. It appears again in your email campaigns, reformatted. It feeds into your chatbot's knowledge base. It populates your partner's marketplace listing.

One piece of content, five different channels — each with different constraints, different formats, different audiences.

This is the reality of modern content. It doesn't live in pages anymore. It lives in fragments — discrete, reusable units that get assembled, adapted, and delivered across an ever-growing landscape of touchpoints.

The MX Content Fragment Specification describes how to declare metadata for these fragments. It covers structure, variations, relationships, and the properties that enable multi-channel delivery while keeping machines informed about what each fragment is and how it should be used.

---

## What Makes a Fragment Different

Traditional content is page-centric. You write a document. It has a beginning, middle, and end. It lives at a URL. People read it.

Fragments break this model. A fragment is:

- **Structured** — defined by a schema, not free-form prose
- **Atomic** — a single unit of meaning, not a complete document
- **Reusable** — designed to appear in multiple contexts
- **Channel-agnostic** — no assumed presentation or layout

Think of the difference between a book and a recipe card. A book is complete in itself. A recipe card is a fragment — it might appear in a cookbook, on a website, in a meal-planning app, or printed on a shopping list. The content is the same; the delivery changes.

### Fragment vs Document

| Aspect | Document | Fragment |
|--------|----------|----------|
| Structure | Free-form, author-defined | Schema-defined, consistent |
| Scope | Complete work | Atomic unit |
| Presentation | Often embedded | Separate, channel-specific |
| Reuse | Copy or link | Reference and assemble |
| Delivery | Single output | Multi-channel |

---

## Fragment Structure

Every fragment has three parts: identity, metadata, and content.

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
  status: published
  version: 3
  tags:
    - product
    - electronics
    - featured

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

mx:status: published
mx:audience: both
mx:volatility: periodic
```

### Identity

Identity properties establish what this fragment is:

| Property | Description |
|----------|-------------|
| `id` | Globally unique identifier |
| `path` | Logical path in the content repository |
| `model` | Which fragment model this conforms to |
| `model_version` | Version of the model |

The `id` is permanent. Even if the fragment moves or gets renamed, the ID stays the same. Systems referencing this fragment use the ID, not the path.

### Metadata

Metadata describes the fragment's state and history:

| Property | Description |
|----------|-------------|
| `title` | Human-readable name |
| `created` | Creation timestamp |
| `modified` | Last modification |
| `created_by` | Who created it |
| `status` | Lifecycle state |
| `version` | Content version number |
| `tags` | Classification tags |
| `locale` | Primary language (BCP 47) |

### Content

Content holds the actual data, structured according to the fragment's model. The fields here — `name`, `sku`, `short_description`, etc. — are defined by the `product` model. Different models have different fields.

---

## Fragment Models

Models define the schema for fragments. They specify what fields exist, what types they have, and what constraints apply.

### Model Definition

```yaml
# /models/product.model.yaml
mx:
  version: "1.0"

model:
  name: product
  version: "2.0"
  description: "Product content fragment for e-commerce"

fields:
  - name: name
    type: text
    required: true
    constraints:
      max_length: 200
    mx:searchable: true

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
        constraints:
          min: 0
      - name: currency
        type: text
        constraints:
          enum: [GBP, USD, EUR]
    mx:facetable: true

  - name: features
    type: array
    items:
      type: text
    constraints:
      min_items: 1
      max_items: 10
    mx:searchable: true
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
| `object` | Nested structure |
| `array` | List of values |
| `reference` | Reference to another fragment |
| `media` | Reference to a media asset |

### Field MX Properties

Models can declare MX properties at the field level:

| Property | Description |
|----------|-------------|
| `mx:searchable` | Include in full-text search |
| `mx:facetable` | Use for filtering and facets |
| `mx:sortable` | Enable sorting by this field |
| `mx:summary_field` | Use in summaries and previews |
| `mx:unique` | Must be unique across fragments |
| `mx:sensitive` | Contains sensitive data |
| `mx:pii` | Contains personally identifiable information |

These properties tell machines how to index, search, and handle each field.

---

## Variations

A single fragment often needs different versions for different contexts. A product description might be shorter on mobile. A legal notice might differ by country. A headline might vary for A/B testing.

Variations handle this without duplicating fragments.

### Variation Structure

```yaml
identity:
  id: "frag-prod-widget-pro-001"
  model: product

content:
  # Master content (default)
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
        amount: 249.99  # B2B discount
        currency: GBP
```

### Variation Types

| Type | Purpose | Selection Criteria |
|------|---------|-------------------|
| `locale` | Language and region | User locale, Accept-Language header |
| `channel` | Delivery channel | Device type, platform, app |
| `audience` | User segment | User attributes, segment membership |
| `experiment` | A/B testing | Experiment assignment |
| `temporal` | Time-based | Date, time of day, season |
| `personalised` | Individual | User profile, behaviour history |

### Variation Resolution

When a system requests a fragment, it provides context — locale, channel, audience. The variation resolver selects the appropriate version.

```yaml
variations:
  resolution:
    strategy: cascade
    priority:
      - personalised
      - experiment
      - audience
      - channel
      - locale
    fallback: master
```

**Resolution strategies:**

| Strategy | Behaviour |
|----------|-----------|
| `cascade` | Apply variations in priority order, each extending the previous |
| `override` | Highest priority variation replaces master entirely |
| `merge` | Deep merge all applicable variations |

With `cascade`, if both a locale variation and a channel variation apply, the channel variation's fields override the locale variation's, which override the master's.

### Variation Metadata

Each variation can have its own metadata:

```yaml
variations:
  - id: "var-locale-de"
    type: locale
    locale: de-DE

    metadata:
      status: published
      created: 2026-01-16
      translator: translation-team@example.com
      translation_source: human
      translation_accuracy: 0.98

    mx:confidence: 0.95
    mx:completeness: 1.0
```

---

## Relationships

Fragments rarely exist in isolation. A product references a category. An article references an author. A recipe references ingredients.

### Reference Types

```yaml
relationships:
  # Reference to another fragment
  category:
    type: fragment_reference
    model: category
    target: frag-cat-electronics-001

  # Reference to multiple fragments
  related_products:
    type: fragment_reference
    model: product
    cardinality: many
    targets:
      - frag-prod-widget-basic-001
      - frag-prod-widget-plus-001

  # Reference to media
  hero_image:
    type: media_reference
    media_type: image
    target: /assets/products/widget-pro-hero.jpg

  # Reference to external resource
  manufacturer_page:
    type: external_reference
    url: https://manufacturer.com/widget-pro
```

### Relationship Properties

| Property | Description |
|----------|-------------|
| `type` | Reference type (fragment, media, external) |
| `model` | Target fragment model (for fragment refs) |
| `cardinality` | `one` or `many` |
| `target` / `targets` | Target identifier(s) |
| `bidirectional` | Whether the relationship goes both ways |
| `required` | Whether the reference must resolve |

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

| Property | Description |
|----------|-------------|
| `mx:semantic_relationship` | What the relationship means (related, parent, child, etc.) |
| `mx:relationship_strength` | How strongly related (0-1) |
| `mx:include_in_context` | Include target content when retrieving this fragment |
| `mx:traverse_depth` | How many levels to follow when including context |

These properties help AI systems understand not just that fragments are connected, but how and why.

---

## Collections

Sometimes fragments belong together — a curated list, a dynamic feed, a smart recommendation set.

### Curated Collections

```yaml
# /collections/featured-products.collection.yaml
mx:
  version: "1.0"

collection:
  id: "col-featured-products-2026-q1"
  name: "Featured Products Q1 2026"
  description: "Curated selection for Q1 2026 promotion"
  type: curated

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
    valid_from: 2026-01-01
    valid_until: 2026-03-31

mx:status: published
mx:audience: both
```

### Dynamic Collections

Dynamic collections are defined by queries, not explicit membership:

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

Smart collections use algorithms or AI to determine membership:

```yaml
collection:
  id: "col-recommended"
  name: "Recommended for You"
  type: smart

  algorithm:
    type: recommendation
    model: product-recommender-v2
    inputs:
      - source: user_profile
        fields: [interests, purchase_history]
      - source: browsing_history
        fields: [viewed_products]

  personalisation:
    enabled: true
    fallback: col-featured-products-2026-q1
```

---

## Inheritance

Fragment metadata can inherit from multiple sources, reducing repetition and ensuring consistency.

### Inheritance Sources

1. **Model defaults** — The fragment model can define default metadata
2. **Directory defaults** — A directory's `.mx.yaml` can set defaults for all fragments within
3. **Parent fragments** — A fragment can inherit from another fragment
4. **Explicit declaration** — The fragment's own metadata

### Model Defaults

```yaml
# /models/product.model.yaml
model:
  name: product

  defaults:
    mx:audience: both
    mx:volatility: periodic

    metadata:
      status: draft
```

### Directory Defaults

```yaml
# /fragments/products/.mx.yaml
mx:
  version: "1.0"

directory:
  defaults:
    metadata:
      tags: [product]
    mx:audience: both

  mx:inheritable:
    - metadata.tags
    - mx:audience
```

### Fragment Inheritance

```yaml
# /fragments/products/widget-pro-2026.fragment.yaml
identity:
  id: "frag-prod-widget-pro-2026-001"
  model: product

inheritance:
  parent: frag-prod-widget-pro-001
  strategy: extend

content:
  # Inherits all content from parent, overrides:
  name: "Widget Pro 2026 Edition"
  price:
    amount: 349.99
    currency: GBP
  features:
    mx:extend: true  # Add to parent's features
    values:
      - "2026 Edition improvements"
```

### Resolution Order

```
Model defaults
  → Directory defaults
    → Parent fragment
      → Fragment declaration
        → Variation overrides
```

Later sources override earlier ones. The most specific declaration wins.

---

## Fragment Status and Lifecycle

Fragments move through a lifecycle. Status determines what machines should do with them.

### Status Values

| Status | Meaning | Machine Behaviour |
|--------|---------|-------------------|
| `draft` | Work in progress | Do not use or display |
| `review` | Awaiting approval | Do not use publicly |
| `approved` | Ready for publication | May use if published unavailable |
| `published` | Live and authoritative | Standard use |
| `archived` | No longer active | Historical queries only |
| `deprecated` | Being phased out | Warn, suggest alternatives |

### Status in Variations

Variations can have independent status:

```yaml
content:
  # Master content
  name: "Widget Pro"

metadata:
  status: published

variations:
  - id: "var-locale-de"
    type: locale
    locale: de-DE
    metadata:
      status: review  # German version still in review
    content:
      name: "Widget Pro"
```

A system requesting the German locale would fall back to the master content until the German variation is published.

---

## AI Properties for Fragments

Fragments need AI-specific metadata just like other content types.

### Fragment-Level AI Properties

```yaml
mx:status: published
mx:audience: both

ai:
  # Can AI use this fragment in responses?
  retrieval:
    permitted: true
    priority: high

  # Can AI generate content based on this fragment?
  generation:
    permitted: true
    style_reference: true

  # Can this fragment be used for training?
  training:
    permitted: false

  # Context for AI processing
  context: |
    This is authoritative product information.
    Pricing is accurate as of the modified date.
    Features list is definitive - do not infer additional features.
```

### Field-Level AI Properties

In the model definition:

```yaml
fields:
  - name: price
    type: object
    mx:ai:
      include_in_summary: true
      confidence_required: 0.95
      verify_before_citing: true

  - name: internal_notes
    type: text
    mx:ai:
      include_in_summary: false
      retrieval_permitted: false
```

---

## Putting It Together

Here's a complete product fragment showing all the patterns:

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
  locale: en-GB
  tags:
    - product
    - electronics
    - featured
    - widget-family

content:
  name: "Widget Pro"
  sku: "WGT-PRO-001"
  short_description: "Professional-grade widget for demanding users"
  long_description: |
    The Widget Pro combines advanced technology with intuitive design.
    Built for professionals who demand reliability and performance,
    it features our most powerful processing unit and premium materials
    that stand up to daily use.
  price:
    amount: 299.99
    currency: GBP
  features:
    - "Advanced processing unit"
    - "Premium build quality"
    - "5-year warranty"
    - "24/7 support included"
  specifications:
    weight: "450g"
    dimensions: "120 x 80 x 25 mm"
    battery_life: "12 hours"

variations:
  - id: "var-locale-de"
    type: locale
    locale: de-DE
    metadata:
      status: published
      translator: de-team@example.com
    content:
      short_description: "Professionelles Widget für anspruchsvolle Anwender"
      long_description: |
        Das Widget Pro kombiniert fortschrittliche Technologie mit
        intuitivem Design. Entwickelt für Profis, die Zuverlässigkeit
        und Leistung verlangen.
      price:
        amount: 349.99
        currency: EUR

  - id: "var-channel-mobile"
    type: channel
    channel: mobile
    content:
      short_description: "Pro-grade widget"
      long_description: null  # Use short only on mobile

  - id: "var-audience-b2b"
    type: audience
    audience: b2b
    content:
      short_description: "Enterprise-grade widget for business deployment"
      price:
        amount: 249.99
        currency: GBP

relationships:
  category:
    type: fragment_reference
    model: category
    target: frag-cat-electronics-001
    mx:semantic_relationship: parent

  related_products:
    type: fragment_reference
    model: product
    cardinality: many
    targets:
      - frag-prod-widget-basic-001
      - frag-prod-widget-plus-001
    mx:semantic_relationship: related
    mx:relationship_strength: 0.8
    mx:include_in_context: true

  hero_image:
    type: media_reference
    media_type: image
    target: /assets/products/widget-pro/hero.jpg

collections:
  - name: "Widget Family"
    path: /collections/widget-family
  - name: "Featured Products Q1 2026"
    path: /collections/featured-q1-2026

mx:status: published
mx:audience: both
mx:volatility: periodic
mx:confidence: 0.95
mx:completeness: 1.0

ai:
  retrieval:
    permitted: true
    priority: high
  training:
    permitted: false
  context: |
    Authoritative product information for Widget Pro.
    Pricing accurate as of modified date.
    B2B pricing requires authenticated business account.
```

This fragment tells machines:

- What the content is and what model it follows
- Who created and modified it, and when
- The master content and all its variations
- How to select the right variation for a request
- What other content this relates to
- What collections it belongs to
- How to index and search the fields
- What AI is allowed to do with it

A content delivery system can assemble the right version for any channel. An AI assistant can retrieve accurate product information. A search engine can index the appropriate fields. All from a single, well-described fragment.

---

## From Fragments to Experiences

Content fragments are building blocks. The MX Content Fragment Specification describes those blocks in ways that enable assembly into experiences — websites, apps, emails, chatbots, voice assistants, and channels we haven't invented yet.

The key is that fragments carry their context with them. When a fragment moves from your CMS to a mobile app to an AI assistant, the metadata travels along. Every system that touches the fragment knows what it is, what variations exist, what it relates to, and how it should be used.

This is the foundation of headless content — content that's truly channel-agnostic because it brings its own meaning wherever it goes.

---

*The following chapter covers the Data Lake Specification — how to describe content for analytics, RAG systems, and AI infrastructure.*
