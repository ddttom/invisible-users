---
title: "MX Specifications: Chapter 7"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "Data Lake"
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

# Chapter 7: Data Lake

Content doesn't just serve users anymore. It feeds recommendation engines. It trains search systems. It populates vector databases for AI retrieval. It flows into analytics pipelines that track engagement and effectiveness.

The same product description that appears on your website also lives in a data warehouse, broken into embeddings in a vector store, chunked for RAG retrieval, and aggregated for business intelligence dashboards.

This is the data lake reality — content as data, flowing through pipelines, transformed and indexed and queried by systems that were never part of the original content management workflow.

The MX Data Lake Specification describes how content declares its data lake properties. It covers partitioning, lineage, quality metrics, embeddings, chunking strategies, and the metadata that enables AI-ready data infrastructure.

---

## Content as Data

When content enters a data lake, it transforms. A product fragment becomes a row in a table. A blog post becomes chunks in a vector index. An image becomes embeddings with associated metadata.

This transformation needs guidance. Without metadata, data engineers make assumptions. They guess at partition keys. They infer quality thresholds. They decide chunking strategies based on what seems reasonable.

MX data lake metadata makes these decisions explicit. Content authors and data engineers speak the same language about how content should be stored, indexed, and retrieved.

### The Data Lake Layer

Data lake metadata sits alongside other MX metadata:

```yaml
# A content fragment with data lake properties
mx:
  version: "1.0"

identity:
  id: "frag-prod-widget-pro-001"
  model: product

content:
  name: "Widget Pro"
  description: "Professional-grade widget..."

# Standard MX properties
mx:status: published
mx:audience: both

# Data lake properties
datalake:
  partition:
    year: 2026
    month: 1
    model: product
    
  quality:
    completeness: 0.95
    accuracy: 0.98
    
  embeddings:
    - field: description
      model: text-embedding-ada-002
      vector_id: "emb-prod-001"
```

---

## Partitioning

Partitioning determines how data is organised in storage. Good partitioning enables efficient queries; poor partitioning creates bottlenecks.

### Partition Keys

```yaml
datalake:
  partition:
    year: 2026
    month: 1
    day: 28
    model: product
    locale: en-GB
    tenant: acme-corp
```

Common partition keys:

| Key | Purpose | Example |
|-----|---------|---------|
| `year/month/day` | Time-based queries | `2026/01/28` |
| `model` | Content type filtering | `product`, `article` |
| `locale` | Language-specific access | `en-GB`, `de-DE` |
| `status` | Lifecycle filtering | `published`, `archived` |
| `tenant` | Multi-tenant isolation | `acme-corp` |
| `region` | Geographic partitioning | `eu-west`, `us-east` |

### Partition Templates

Define how partition paths are constructed:

```yaml
datalake:
  partition:
    template: "{tenant}/{model}/{year}/{month}/{day}"
    example: "acme-corp/product/2026/01/28"
```

### Partition Strategy

Different content types may need different strategies:

```yaml
datalake:
  partition:
    strategy: time-model
    
    # For time-series queries
    time_granularity: day
    
    # For content type queries
    model_first: false  # time/model vs model/time
```

---

## Lineage

Lineage tracks where data came from, how it was transformed, and where it goes. This is essential for debugging, compliance, and understanding data flow.

### Source Tracking

```yaml
datalake:
  lineage:
    source:
      system: cms
      id: "cms-prod-12345"
      version: 3
      
    ingestion:
      timestamp: 2026-01-28T03:00:00Z
      pipeline: content-sync-daily
      pipeline_version: "2.1.0"
```

### Transformation History

When content is transformed through a pipeline:

```yaml
datalake:
  lineage:
    transformations:
      - step: extract
        timestamp: 2026-01-28T03:00:00Z
        tool: content-extractor
        version: "1.5.0"
        input_hash: "abc123"
        output_hash: "def456"

      - step: enrich
        timestamp: 2026-01-28T03:01:00Z
        tool: entity-enricher
        version: "2.0.0"
        enrichments:
          - type: embedding
            model: text-embedding-ada-002
            fields: [description]
          - type: classification
            model: category-classifier-v3

      - step: validate
        timestamp: 2026-01-28T03:02:00Z
        tool: schema-validator
        version: "1.0.0"
        result: passed

      - step: load
        timestamp: 2026-01-28T03:03:00Z
        tool: lake-loader
        version: "3.0.0"
        destination: s3://data-lake/content/
```

### Downstream Dependencies

Track what systems consume this data:

```yaml
datalake:
  lineage:
    downstream:
      - system: search-index
        table: products
        sync: real-time
        last_sync: 2026-01-28T03:05:00Z

      - system: recommendation-engine
        table: product_features
        sync: hourly

      - system: analytics
        table: content_metrics
        sync: daily

      - system: vector-store
        collection: product_embeddings
        sync: real-time
```

When content changes, lineage metadata tells you what downstream systems need updating.

---

## Data Quality

Quality metadata enables trust. Before using data, systems can check whether it meets their requirements.

### Quality Metrics

```yaml
datalake:
  quality:
    completeness: 0.95    # Percentage of non-null required fields
    validity: 1.0         # Percentage passing validation rules
    accuracy: 0.98        # Estimated factual accuracy
    consistency: 1.0      # Cross-reference consistency
    uniqueness: 1.0       # No duplicate records
    freshness: 2026-01-28T03:00:00Z  # When last updated
```

| Metric | Description | Range |
|--------|-------------|-------|
| `completeness` | Required fields populated | 0-1 |
| `validity` | Passes schema validation | 0-1 |
| `accuracy` | Factually correct | 0-1 |
| `consistency` | Matches related records | 0-1 |
| `uniqueness` | No duplicates | 0-1 |
| `freshness` | Last update timestamp | DateTime |

### Quality Checks

Record what checks were performed:

```yaml
datalake:
  quality:
    checks:
      - name: required_fields
        type: completeness
        status: passed
        timestamp: 2026-01-28T03:02:00Z
        details:
          checked: 15
          passed: 15
          failed: 0

      - name: reference_integrity
        type: consistency
        status: passed
        details:
          references_checked: 8
          resolved: 8
          broken: 0

      - name: schema_validation
        type: validity
        status: passed
```

### Quality Issues

When issues exist, document them:

```yaml
datalake:
  quality:
    issues:
      - field: specifications.weight
        issue: missing_unit
        severity: warning
        detected: 2026-01-28T03:02:00Z
        suggested_fix: "Add unit suffix (e.g., '450g')"

      - field: long_description
        issue: below_minimum_length
        severity: info
        details:
          actual: 45
          minimum: 100
```

### Quality Thresholds

Define minimum quality for different use cases:

```yaml
datalake:
  quality:
    thresholds:
      search_index:
        completeness: 0.9
        validity: 0.99
        
      recommendation:
        completeness: 0.8
        accuracy: 0.95
        
      analytics:
        completeness: 0.7
```

A system can check whether content meets its threshold before including it.

---

## Classification

Data classification enables governance, compliance, and access control.

### Sensitivity Levels

```yaml
datalake:
  classification:
    sensitivity: internal  # public, internal, confidential, restricted
```

| Level | Description | AI Access |
|-------|-------------|-----------|
| `public` | Open to anyone | Full access |
| `internal` | Organisation only | Access with authentication |
| `confidential` | Need-to-know basis | Restricted access |
| `restricted` | Highly sensitive | No AI access by default |

### PII Identification

```yaml
datalake:
  classification:
    pii_fields:
      - field: customer_email
        pii_type: email
        masked: true
        mask_pattern: "***@***.***"

      - field: shipping_address
        pii_type: address
        masked: false
        retention_days: 365
```

### Regulatory Compliance

```yaml
datalake:
  classification:
    regulatory:
      gdpr: true
      ccpa: false
      hipaa: false
      
    retention:
      policy: standard
      days: 365
      archive_after: 180
      delete_after: 365
      legal_hold: false
```

---

## Embeddings

Embeddings enable semantic search, similarity matching, and RAG retrieval. Embedding metadata tracks what was embedded, how, and where the vectors live.

### Basic Embedding

```yaml
datalake:
  embeddings:
    - field: description
      model: text-embedding-ada-002
      dimensions: 1536
      vector_id: "emb-prod-001-desc"
      created: 2026-01-28T03:01:00Z
```

### Multiple Embeddings

Different fields may need different embeddings:

```yaml
datalake:
  embeddings:
    - field: short_description
      model: text-embedding-ada-002
      dimensions: 1536
      vector_id: "emb-prod-001-short"

    - field: long_description
      model: text-embedding-ada-002
      dimensions: 1536
      vector_id: "emb-prod-001-long"

    - field: features
      model: text-embedding-ada-002
      dimensions: 1536
      vector_id: "emb-prod-001-features"
      aggregation: concatenate  # How array fields are combined
```

### Chunked Embeddings

Long content needs chunking before embedding:

```yaml
datalake:
  embeddings:
    - field: long_description
      model: text-embedding-ada-002
      dimensions: 1536

      chunking:
        strategy: semantic
        target_size: 500  # tokens
        overlap: 50

      chunks:
        - chunk_id: "emb-prod-001-long-001"
          start_char: 0
          end_char: 1250
          token_count: 487
          vector_id: "vec-prod-001-001"

        - chunk_id: "emb-prod-001-long-002"
          start_char: 1200
          end_char: 2480
          token_count: 492
          vector_id: "vec-prod-001-002"
```

### Vector Store Integration

```yaml
datalake:
  embeddings:
    vector_store:
      type: pinecone  # pinecone, weaviate, milvus, pgvector, qdrant
      index: product-embeddings
      namespace: en-GB

      metadata_fields:
        - id
        - model
        - status
        - price.amount
        - tags
```

---

## RAG Optimisation

Retrieval-Augmented Generation needs content optimised for retrieval. RAG metadata tells systems how to chunk, index, and retrieve content for AI applications.

### RAG Configuration

```yaml
mx:
  rag:
    enabled: true
    priority: high  # high, medium, low

    indexing:
      strategy: field_selective
      indexed_fields:
        - name
        - short_description
        - long_description
        - features
      excluded_fields:
        - internal_notes
        - sku
```

### Chunking Strategy

```yaml
mx:
  rag:
    chunking:
      strategy: semantic  # semantic, fixed, sentence, paragraph, section
      target_size: 500    # tokens
      overlap: 50         # tokens
      preserve_structure: true
      
      boundaries:
        - heading
        - paragraph
        - list
```

| Strategy | Description | Best For |
|----------|-------------|----------|
| `semantic` | Split at meaning boundaries | Long-form content |
| `fixed` | Fixed token count | Uniform processing |
| `sentence` | Split at sentences | Precise retrieval |
| `paragraph` | Split at paragraphs | Structured content |
| `section` | Split at headings | Documentation |
| `none` | No chunking | Short content |

### Retrieval Hints

Help retrieval systems find the right content:

```yaml
mx:
  rag:
    hints:
      # What queries this content answers
      query_patterns:
        - "What is Widget Pro?"
        - "Widget Pro features"
        - "Widget Pro price"
        - "professional widget"

      # Keywords for matching
      keywords:
        primary:
          - widget
          - professional
          - electronics
        secondary:
          - device
          - gadget
          - tool

      # Entities mentioned
      entities:
        products: [Widget Pro]
        companies: [Acme Corporation]

      # Semantic topics
      topics:
        - consumer-electronics
        - professional-tools
```

### Question-Answer Pairs

For content that answers specific questions:

```yaml
mx:
  rag:
    hints:
      qa_pairs:
        - question: "What are the main features of Widget Pro?"
          answer_location: content.features

        - question: "How much does Widget Pro cost?"
          answer_location: content.price

        - question: "What is the Widget Pro battery life?"
          answer_location: content.specifications.battery_life
```

### Context Assembly

How to build context for AI prompts:

```yaml
mx:
  rag:
    context_assembly:
      include:
        - self.content.name
        - self.content.short_description
        - self.content.long_description
        - self.content.features

      include_relationships:
        - relationship: category
          fields: [name, description]

        - relationship: related_products
          fields: [name, short_description]
          max_items: 3

      format: |
        # {self.content.name}

        {self.content.long_description}

        ## Features
        {self.content.features|join('\n- ')}

        ## Category
        {category.name}: {category.description}

      max_tokens: 2000
      truncation_strategy: end
```

---

## Change Data Capture

Change Data Capture (CDC) tracks what changed and when, enabling incremental processing and real-time sync.

### Delta Tracking

```yaml
datalake:
  delta:
    operation: update  # insert, update, delete
    timestamp: 2026-01-28T14:30:00Z
    previous_version: 2
    current_version: 3
    sequence_number: 1485923
```

### Changed Fields

```yaml
datalake:
  delta:
    operation: update
    timestamp: 2026-01-28T14:30:00Z

    changed_fields:
      - field: price.amount
        old_value: 279.99
        new_value: 299.99

      - field: features
        old_value: ["Advanced processing", "Premium quality"]
        new_value: ["Advanced processing unit", "Premium build quality", "5-year warranty"]
        change_type: array_modified
```

### Change Metadata

```yaml
datalake:
  delta:
    change_metadata:
      reason: "Price update for Q1 2026"
      changed_by: john.editor@example.com
      change_ticket: "CONTENT-1234"
      approved_by: jane.manager@example.com
```

### CDC Streams

For real-time consumers:

```yaml
datalake:
  delta:
    stream:
      enabled: true
      topic: content-changes
      format: avro

      consumers:
        - name: search-indexer
          group: search-team
          lag_threshold: 1000

        - name: cache-invalidator
          group: platform-team
          lag_threshold: 100
```

---

## Analytics Integration

Content feeds analytics systems. Analytics metadata describes how content should be measured and aggregated.

### Warehouse Sync

```yaml
datalake:
  analytics:
    warehouse:
      enabled: true
      destination: snowflake
      schema: content
      table: products
      schedule: "0 * * * *"  # hourly
```

### Dimensions and Measures

```yaml
datalake:
  analytics:
    dimensions:
      - name: product_category
        source: relationships.category.name

      - name: price_band
        source: content.price.amount
        buckets: [0, 100, 500, 1000]
        labels: [budget, mid-range, premium, luxury]

    measures:
      - name: word_count
        source: "LENGTH(content.long_description)"

      - name: feature_count
        source: "ARRAY_LENGTH(content.features)"
```

### Engagement Metrics

```yaml
datalake:
  analytics:
    metrics:
      views: 12450
      unique_visitors: 8920
      avg_time_on_content: 45.2
      bounce_rate: 0.32
      conversions: 234
      last_updated: 2026-01-28T00:00:00Z
```

---

## Putting It Together

Here's a complete example showing data lake metadata for a product fragment:

```yaml
# /fragments/products/widget-pro.fragment.yaml
mx:
  version: "1.0"

identity:
  id: "frag-prod-widget-pro-001"
  model: product

content:
  name: "Widget Pro"
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

# Data Lake Metadata
datalake:
  partition:
    year: 2026
    month: 1
    model: product
    locale: en-GB

  lineage:
    source:
      system: cms
      id: "cms-prod-12345"
      version: 3
    ingestion:
      timestamp: 2026-01-28T03:00:00Z
      pipeline: content-sync-daily
    downstream:
      - system: search-index
        sync: real-time
      - system: vector-store
        sync: real-time
      - system: analytics
        sync: daily

  quality:
    completeness: 0.95
    validity: 1.0
    accuracy: 0.98
    freshness: 2026-01-28T03:00:00Z

  classification:
    sensitivity: public
    regulatory:
      gdpr: false

  embeddings:
    - field: short_description
      model: text-embedding-ada-002
      dimensions: 1536
      vector_id: "emb-prod-001-short"
    - field: long_description
      model: text-embedding-ada-002
      dimensions: 1536
      vector_id: "emb-prod-001-long"
      chunking:
        strategy: semantic
        target_size: 500

  delta:
    operation: update
    timestamp: 2026-01-28T14:30:00Z
    previous_version: 2
    current_version: 3

# RAG Metadata
mx:
  rag:
    enabled: true
    priority: high

    chunking:
      strategy: semantic
      target_size: 500
      overlap: 50

    hints:
      query_patterns:
        - "What is Widget Pro?"
        - "Widget Pro features"
        - "Widget Pro price"
      keywords:
        primary: [widget, professional, pro]
      qa_pairs:
        - question: "What are Widget Pro's main features?"
          answer_location: content.features
        - question: "How much does Widget Pro cost?"
          answer_location: content.price

    context_assembly:
      include:
        - content.name
        - content.long_description
        - content.features
      max_tokens: 1500
```

This metadata tells data infrastructure:

- How to partition the data for efficient queries
- Where the data came from and what depends on it
- Whether the data quality meets requirements
- How to classify and govern the data
- What embeddings exist and where they're stored
- How to chunk content for RAG retrieval
- What queries this content answers
- How to assemble context for AI prompts
- What changed and when

Data engineers, ML engineers, and content teams share a common vocabulary. The content carries its data infrastructure requirements with it.

---

## The Bridge Between Content and AI

Data lake metadata bridges two worlds. Content creators think in terms of meaning, audience, and message. Data engineers think in terms of partitions, embeddings, and query patterns.

MX data lake metadata lets both sides express their needs in the same place. Content authors can declare "this answers questions about pricing." Data engineers can declare "partition by model and month, embed the description field, sync to the vector store in real-time."

The result is AI infrastructure that respects content intent, and content that's ready for AI from the moment it's created.

---

*The following chapter covers the Database Metadata Specification — how to describe schemas, tables, and queries for machine understanding.*
