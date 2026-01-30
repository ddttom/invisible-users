---
title: "MX Data Lake Specification"
date: 2026-01-28
ld:
  "@type": TechArticle
  headline: "MX Data Lake Specification"
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
  mx:canonicalFor: https://mx.community/spec/data-lake
  mx:accessLevel: public
  mx:licenseType: attribution
  mx:citationRequired: true
  mx:completeness: 0.9
  mx:accuracy: 0.85
  mx:confidence: 0.8
  mx:prerequisites:
    - /spec/base/
    - /spec/content-fragments/
  mx:inheritable:
    - author
    - publisher
    - inLanguage
    - mx:accessLevel
    - mx:licenseType
---

# MX Data Lake Specification

Version: 1.0.0-draft
Status: Draft
Last Updated: January 2026

---

## Introduction

This specification defines how content and data assets declare metadata for data lake storage, retrieval-augmented generation (RAG), and analytics pipelines. It bridges content management with data engineering, enabling AI-ready data architecture.

This specification extends the **MX Base Specification** (`mx.community/spec/base`) and inherits all core properties defined there.

The specification covers:

- Partition and storage metadata
- Data lineage tracking
- Data quality metadata
- Embedding and vector storage
- RAG optimisation
- Change data capture (CDC)
- Analytics integration
- AI agent interpretation guidance

This specification complements the **MX Content Fragment Specification** — fragments define content structure, this specification defines how that content integrates with data infrastructure.

### Relationship to Base Specification

This specification inherits from MX Base:

- All core properties (`mx:audience`, `mx:status`, `mx:volatility`, etc.)
- All inheritance properties (`mx:inheritable`, `mx:inherit`, etc.)
- All AI properties (`ai.training`, `ai.extraction`, etc.)
- All classification properties
- Extension framework

This specification adds:

- Partition strategy (`datalake.partition`)
- Lineage tracking (`datalake.lineage`)
- Quality metrics (`datalake.quality`)
- Embedding metadata (`datalake.embeddings`)
- RAG configuration (`mx:rag`)
- Delta/CDC tracking (`datalake.delta`)

---

## Data Lake Metadata

### Core Structure

```yaml
# Fragment or asset with data lake metadata
mx:
  version: "1.0"
  
identity:
  id: "frag-prod-widget-pro-001"
  
metadata:
  status: published
  
datalake:
  partition:
    # Partition strategy
    
  lineage:
    # Data provenance
    
  quality:
    # Quality metrics
    
  classification:
    # Data governance
    
  embeddings:
    # Vector storage
    
  delta:
    # Change tracking
```

---

## Partition Strategy

Partitioning determines how data is organised in storage for efficient query and retrieval.

### Partition Configuration

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

### Partition Keys

| Key | Purpose | Example |
|-----|---------|---------|
| `year/month/day` | Time-based partitioning | `2026/01/28` |
| `model` | Content type partitioning | `product`, `article` |
| `locale` | Language partitioning | `en-GB`, `de-DE` |
| `status` | Lifecycle partitioning | `published`, `archived` |
| `tenant` | Multi-tenant partitioning | `acme-corp` |
| `source` | Source system partitioning | `cms`, `crm` |
| `region` | Geographic partitioning | `eu-west`, `us-east` |

### Partition Path Template

```yaml
datalake:
  partition:
    template: "{tenant}/{model}/{year}/{month}/{day}"
    example: "acme-corp/product/2026/01/28"
```

### Custom Partition Functions

```yaml
datalake:
  partition:
    custom:
      - name: price_band
        function: "CASE WHEN price < 100 THEN 'low' WHEN price < 500 THEN 'mid' ELSE 'high' END"
      - name: content_hash
        function: "SUBSTRING(MD5(id), 1, 2)"
```

---

## Lineage Tracking

Lineage records where data came from, how it was transformed, and where it goes.

### Lineage Structure

```yaml
datalake:
  lineage:
    source_system: cms
    source_id: "cms-prod-12345"
    source_version: 3
    ingestion_timestamp: 2026-01-28T03:00:00Z
    pipeline_id: "pipeline-content-daily"
    pipeline_version: "2.1.0"
```

### Transformation History

```yaml
datalake:
  lineage:
    source_system: cms
    source_id: "cms-prod-12345"
    
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
            fields: [short_description, long_description]
          - type: classification
            model: category-classifier-v3
            fields: [long_description]
            
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

```yaml
datalake:
  lineage:
    downstream_dependencies:
      - system: search-index
        table: products
        sync: real-time
        last_sync: 2026-01-28T03:05:00Z
        
      - system: recommendation-engine
        table: product_features
        sync: hourly
        last_sync: 2026-01-28T03:00:00Z
        
      - system: analytics
        table: content_metrics
        sync: daily
        last_sync: 2026-01-28T00:00:00Z
        
      - system: vector-store
        collection: product_embeddings
        sync: real-time
        last_sync: 2026-01-28T03:05:00Z
```

### Upstream Sources

```yaml
datalake:
  lineage:
    upstream_sources:
      - system: product-service
        entity: products
        relationship: primary
        
      - system: pricing-service
        entity: prices
        relationship: enrichment
        join_key: sku
        
      - system: inventory-service
        entity: stock_levels
        relationship: enrichment
        join_key: sku
```

---

## Data Quality

Quality metadata enables trust and governance in data pipelines.

### Quality Metrics

```yaml
datalake:
  quality:
    completeness: 0.95         # Percentage of non-null required fields
    validity: 1.0              # Percentage passing validation rules
    freshness: 2026-01-28T03:00:00Z  # When data was last updated
    accuracy: 0.98             # Estimated accuracy score
    consistency: 1.0           # Cross-reference consistency
    uniqueness: 1.0            # No duplicate records
```

### Quality Checks

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
        timestamp: 2026-01-28T03:02:00Z
        details:
          references_checked: 8
          resolved: 8
          broken: 0
          
      - name: schema_validation
        type: validity
        status: passed
        timestamp: 2026-01-28T03:02:00Z
        
      - name: duplicate_check
        type: uniqueness
        status: passed
        timestamp: 2026-01-28T03:02:00Z
        details:
          key_field: id
          duplicates_found: 0
```

### Quality Issues

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
        detected: 2026-01-28T03:02:00Z
        details:
          actual: 45
          minimum: 100
```

### Quality SLA

```yaml
datalake:
  quality:
    sla:
      completeness_threshold: 0.95
      validity_threshold: 0.99
      max_staleness: 24h
      
    alerts:
      - condition: "completeness < 0.9"
        severity: critical
        channel: pagerduty
        
      - condition: "freshness > 6h"
        severity: warning
        channel: slack
```

---

## Data Classification

Classification enables governance, compliance, and access control.

### Classification Structure

```yaml
datalake:
  classification:
    sensitivity: internal      # public | internal | confidential | restricted
    
    pii_fields:
      - field: author_email
        pii_type: email
        masked: true
        mask_pattern: "***@***.***"
        
    data_categories:
      - product-information
      - pricing
      - marketing-content
      
    regulatory:
      gdpr_applicable: false
      ccpa_applicable: false
      hipaa_applicable: false
      pci_applicable: false
```

### Retention Policy

```yaml
datalake:
  classification:
    retention:
      policy: standard
      days: 365
      archive_after: 180
      delete_after: 365
      legal_hold: false
      
    lifecycle:
      - stage: hot
        duration: 30d
        storage_class: standard
        
      - stage: warm
        duration: 150d
        storage_class: infrequent-access
        
      - stage: cold
        duration: 185d
        storage_class: glacier
```

### Access Control

```yaml
datalake:
  classification:
    access_control:
      read: [analytics-team, ml-team, content-team]
      write: [content-team, etl-service]
      admin: [data-governance]
      
    row_level_security:
      enabled: true
      policy: "tenant_id = current_tenant()"
      
    column_masking:
      - column: email
        mask_for: [analytics-team]
        mask_function: hash
```

---

## Embedding Storage

Embeddings enable semantic search and RAG applications.

### Embedding Configuration

```yaml
datalake:
  embeddings:
    - field: short_description
      model: text-embedding-ada-002
      dimensions: 1536
      vector_id: "emb-prod-001-short"
      created: 2026-01-28T03:01:00Z
      
    - field: long_description
      model: text-embedding-ada-002
      dimensions: 1536
      vector_id: "emb-prod-001-long"
      created: 2026-01-28T03:01:00Z
      
    - field: features
      model: text-embedding-ada-002
      dimensions: 1536
      vector_id: "emb-prod-001-features"
      aggregation: concatenate
      created: 2026-01-28T03:01:00Z
```

### Chunked Embeddings

```yaml
datalake:
  embeddings:
    - field: long_description
      model: text-embedding-ada-002
      dimensions: 1536
      
      chunking:
        strategy: semantic
        target_size: 500
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
      type: pinecone           # pinecone | weaviate | milvus | pgvector | qdrant
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

RAG metadata optimises retrieval for AI applications.

### RAG Configuration

```yaml
mx:
  rag:
    enabled: true
    priority: high             # high | medium | low
    
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
      strategy: semantic        # semantic | fixed | sentence | paragraph | none
      target_size: 500          # tokens
      overlap: 50               # tokens
      preserve_structure: true
      boundaries:
        - heading
        - paragraph
        - list
```

| Strategy | Description | Best For |
|----------|-------------|----------|
| `semantic` | Split at semantic boundaries | Long-form content |
| `fixed` | Fixed token count | Uniform processing |
| `sentence` | Split at sentence boundaries | Precise retrieval |
| `paragraph` | Split at paragraph boundaries | Structured content |
| `section` | Split at section headings | Documentation |
| `none` | No chunking, use whole content | Short content |

### Retrieval Configuration

```yaml
mx:
  rag:
    retrieval:
      boost_fields:
        name: 2.0
        short_description: 1.5
        features: 1.2
        
      decay:
        field: metadata.modified
        scale: 30d
        decay: 0.5
        
      filters:
        - field: metadata.status
          value: published
        - field: metadata.locale
          value: "{user_locale}"
```

### Retrieval Hints

```yaml
mx:
  rag:
    hints:
      # What queries this content answers
      query_patterns:
        - "What is Widget Pro?"
        - "Widget Pro features"
        - "Widget Pro specifications"
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
        technologies: []
        
      # Semantic topics
      topics:
        - consumer-electronics
        - professional-tools
        - product-information
```

### Question-Answer Pairs

```yaml
mx:
  rag:
    hints:
      qa_pairs:
        - question: "What are the main features of Widget Pro?"
          answer_location: content.features
          
        - question: "How much does Widget Pro cost?"
          answer_location: content.price
          
        - question: "What are Widget Pro's dimensions?"
          answer_location: content.specifications.dimensions
          
        - question: "How long does the Widget Pro battery last?"
          answer_location: content.specifications.battery_life
```

### Context Assembly

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
        - relationship: parent_category
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
        {parent_category.name}: {parent_category.description}
        
      max_tokens: 2000
      truncation_strategy: end
```

---

## Change Data Capture

CDC enables incremental processing and real-time synchronisation.

### Delta Tracking

```yaml
datalake:
  delta:
    operation: update          # insert | update | delete
    timestamp: 2026-01-28T14:30:00Z
    previous_version: 2
    current_version: 3
    sequence_number: 1485923
```

### Change Details

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
        
      - field: metadata.modified
        old_value: 2026-01-25T14:45:00Z
        new_value: 2026-01-28T14:30:00Z
```

### Change Metadata

```yaml
datalake:
  delta:
    change_metadata:
      reason: "Price update and feature list refinement"
      changed_by: john.editor@example.com
      change_ticket: "CONTENT-1234"
      change_type: scheduled_update
      approved_by: jane.manager@example.com
```

### CDC Stream Configuration

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

Analytics metadata enables reporting and business intelligence.

### Analytics Configuration

```yaml
datalake:
  analytics:
    warehouse_sync:
      enabled: true
      destination: snowflake
      schema: content
      table: products
      schedule: "0 * * * *"
      
    dimensions:
      - name: product_category
        source: relationships.parent_category.name
        
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

### Usage Metrics

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
      
    engagement:
      shares: 156
      bookmarks: 423
      comments: 87
```

### A/B Test Results

```yaml
datalake:
  analytics:
    experiments:
      - id: "exp-headline-2026-01"
        status: running
        started: 2026-01-15
        
        variants:
          - name: control
            traffic: 0.5
            conversions: 145
            conversion_rate: 0.032
            
          - name: variant_b
            traffic: 0.5
            conversions: 178
            conversion_rate: 0.039
            
        significance: 0.94
        winner: variant_b
```

---

## Interpretation by AI Agents

### Data Lake Metadata Usage

When processing content from data lakes, agents SHOULD:

1. Check `datalake.quality` scores before relying on data
2. Verify `datalake.lineage` for provenance
3. Respect `datalake.classification.sensitivity`
4. Use `datalake.embeddings` for similarity search

### Quality Interpretation

| Metric | Threshold | Agent Behaviour |
|--------|-----------|-----------------|
| `completeness` < 0.8 | Low | Flag as potentially incomplete |
| `validity` < 0.95 | Low | Verify claims independently |
| `freshness` > 7d | Stale | Note data age in response |
| `accuracy` < 0.9 | Low | Cross-reference with other sources |

### RAG Interpretation

Agents SHOULD:

1. Use `mx:rag.priority` for ranking results
2. Respect `mx:rag.chunking` for context assembly
3. Apply `mx:rag.retrieval.boost_fields` for relevance
4. Follow `mx:rag.context_assembly` for response formatting
5. Use `mx:rag.hints.qa_pairs` for direct question matching

### Embedding Usage

When using embeddings:

1. Verify embedding `model` matches query embedding model
2. Use `metadata_fields` for filtering
3. Respect `chunking` boundaries for context
4. Check embedding `created` date for freshness

### Classification Respect

| Sensitivity | Agent Behaviour |
|-------------|-----------------|
| `public` | Standard use |
| `internal` | Use but don't expose source details |
| `confidential` | Use only with authorisation |
| `restricted` | Do not access |

---

## Migration Guidance

### Phase 1: Inventory

Audit existing data assets:

1. Identify content in data lakes
2. Map current partition strategies
3. Document existing lineage
4. Assess quality monitoring

### Phase 2: Metadata Addition

Add MX metadata to existing assets:

```bash
# Generate metadata from existing partitions
mx-datalake infer --source s3://data-lake/content/ --output metadata/

# Validate metadata
mx-datalake validate metadata/**/*.yaml
```

### Phase 3: Pipeline Integration

Update ETL pipelines:

1. Add lineage tracking to transformations
2. Implement quality checks
3. Generate embeddings during processing
4. Configure CDC streams

### Phase 4: RAG Optimisation

Configure for retrieval:

1. Define chunking strategies
2. Generate embeddings
3. Add retrieval hints
4. Test retrieval quality

---

## Appendix A: Quick Reference

### Data Lake Properties

| Property | Purpose |
|----------|---------|
| `datalake.partition` | Storage organisation |
| `datalake.lineage` | Data provenance |
| `datalake.quality` | Quality metrics |
| `datalake.classification` | Data governance |
| `datalake.embeddings` | Vector storage |
| `datalake.delta` | Change tracking |
| `datalake.analytics` | BI integration |

### RAG Properties

| Property | Purpose |
|----------|---------|
| `mx:rag.enabled` | Enable RAG indexing |
| `mx:rag.priority` | Retrieval priority |
| `mx:rag.chunking` | Chunking configuration |
| `mx:rag.retrieval` | Search configuration |
| `mx:rag.hints` | Query matching hints |
| `mx:rag.context_assembly` | Response formatting |

### Quality Metrics

| Metric | Description | Range |
|--------|-------------|-------|
| `completeness` | Non-null required fields | 0-1 |
| `validity` | Passing validation rules | 0-1 |
| `accuracy` | Factual correctness | 0-1 |
| `consistency` | Cross-reference match | 0-1 |
| `uniqueness` | No duplicates | 0-1 |
| `freshness` | Last update timestamp | DateTime |

---

## Appendix B: References

- MX Base Specification: https://mx.community/spec/base
- MX Content Fragment Specification: https://mx.community/spec/content-fragments
- Apache Parquet: https://parquet.apache.org/
- Delta Lake: https://delta.io/
- Apache Iceberg: https://iceberg.apache.org/
- OpenLineage: https://openlineage.io/

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0-draft | January 2026 | Initial draft |
