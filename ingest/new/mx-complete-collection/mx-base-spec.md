---
title: "MX Base Specification"
date: 2026-01-28
ld:
  "@type": TechArticle
  headline: "MX Base Specification"
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
  mx:volatility: stable
  mx:reviewDate: 2026-04-02
  mx:chunkBoundary: heading
  mx:chunkSize: 500
  mx:standalone: true
  mx:canonicalFor: https://mx.community/spec/base
  mx:accessLevel: public
  mx:licenseType: attribution
  mx:citationRequired: true
  mx:completeness: 0.95
  mx:accuracy: 0.9
  mx:confidence: 0.85
  mx:inheritable:
    - author
    - publisher
    - inLanguage
    - mx:accessLevel
    - mx:licenseType
---

# MX Base Specification

Version: 1.0.0-draft
Status: Draft
Last Updated: January 2026

---

## Introduction

This specification defines the foundational vocabulary for all MX specifications. It establishes common properties, patterns, and conventions that domain-specific specifications inherit and extend.

The MX Base Specification provides:

- Core property definitions
- Inheritance mechanism
- Extension framework
- AI interpretation primitives
- Composition guidelines

All MX specifications MUST conform to this base specification. Domain specifications MAY extend but MUST NOT contradict these definitions.

---

## Specification Hierarchy

```
MX Base Specification
├── MX Structured Data Specification (content metadata)
├── MX Code Metadata Specification (source code)
├── MX Media Metadata Specification (images, video, audio, documents)
├── MX Content Fragment Specification (headless content)
├── MX Data Lake Specification (RAG, embeddings, analytics)
├── MX Database Metadata Specification (schemas, tables, queries)
└── [Domain Specifications] (API, Knowledge Base, Design System, etc.)
```

Domain specifications inherit from base and may compose properties from multiple sibling specifications.

---

## Namespace

All MX properties use the `mx:` namespace prefix to distinguish them from schema.org and other vocabularies.

```yaml
mx:audience: both
mx:status: published
mx:confidence: 0.9
```

When output as JSON-LD, MX properties use either:

**additionalProperty approach:**
```json
{
  "@context": "https://schema.org",
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "propertyID": "mx:audience",
      "value": "both"
    }
  ]
}
```

**Custom context approach:**
```json
{
  "@context": [
    "https://schema.org",
    {"mx": "https://mx.community/schema/"}
  ],
  "mx:audience": "both"
}
```

---

## Core Properties

These properties are available in all MX specifications.

### Identity Properties

| Property | Type | Description |
|----------|------|-------------|
| `mx:id` | Text | Unique identifier |
| `mx:version` | Text | Specification version conformance |
| `mx:canonicalFor` | URL | Authoritative source for this topic |

```yaml
mx:id: "doc-structured-data-001"
mx:version: "1.0"
mx:canonicalFor: https://mx.community/spec/structured-data
```

### Audience Properties

| Property | Type | Values | Description |
|----------|------|--------|-------------|
| `mx:audience` | Text/Array | `human`, `machine`, `both` | Primary consumer |

```yaml
mx:audience: both
mx:audience: [human, machine]
mx:audience: machine
```

**Interpretation:**

| Value | Meaning |
|-------|---------|
| `human` | Optimised for human consumption; structure is presentational |
| `machine` | Optimised for machine processing; structure is semantic |
| `both` | Serves both audiences; structure is meaningful and prose is important |

### Lifecycle Properties

| Property | Type | Values | Description |
|----------|------|--------|-------------|
| `mx:status` | Text | See values | Content lifecycle state |
| `mx:reviewDate` | Date | ISO 8601 | When content should be reviewed |
| `mx:supersededBy` | URL | | Replacement content location |
| `mx:supersedes` | URL | | Older content this replaces |

**Status values:**

| Value | Description |
|-------|-------------|
| `draft` | Work in progress |
| `review` | Awaiting review or approval |
| `approved` | Approved, ready for publication |
| `published` | Live, authoritative |
| `deprecated` | Superseded, scheduled for removal |
| `archived` | No longer active, retained for reference |

```yaml
mx:status: published
mx:reviewDate: 2026-07-01
mx:supersededBy: /docs/v2/authentication/
```

### Volatility Properties

| Property | Type | Values | Description |
|----------|------|--------|-------------|
| `mx:volatility` | Text | `stable`, `periodic`, `frequent` | Change frequency |

```yaml
mx:volatility: stable
```

**Interpretation:**

| Value | Meaning | Cache Guidance |
|-------|---------|----------------|
| `stable` | Rarely changes | Long-term cache safe |
| `periodic` | Changes on schedule (releases, reviews) | Medium-term cache |
| `frequent` | Changes often | Verify before each use |

### Quality Properties

| Property | Type | Range | Description |
|----------|------|-------|-------------|
| `mx:confidence` | Number | 0-1 | Author's certainty in claims |
| `mx:accuracy` | Number | 0-1 | Factual correctness (often reviewer-assessed) |
| `mx:completeness` | Number | 0-1 | How finished the content is |

```yaml
mx:confidence: 0.85
mx:accuracy: 0.95
mx:completeness: 1.0
```

**Confidence interpretation:**

| Range | Meaning |
|-------|---------|
| 0.9-1.0 | Well-established fact or direct observation |
| 0.7-0.9 | Strong evidence or widely accepted |
| 0.5-0.7 | Reasonable inference or emerging consensus |
| 0.3-0.5 | Speculative but grounded |
| 0.0-0.3 | Hypothesis or thought experiment |

### Provenance Properties

| Property | Type | Values | Description |
|----------|------|--------|-------------|
| `mx:source` | Text | `human`, `ai-assisted`, `ai-generated` | Content origin |
| `mx:verifiedBy` | Text/Object | | Who validated content |
| `mx:verifiedDate` | Date | ISO 8601 | When verification occurred |

```yaml
mx:source: ai-assisted
mx:verifiedBy:
  "@type": Person
  name: Tom Ledger
mx:verifiedDate: 2026-01-28
```

### Access Properties

| Property | Type | Values | Description |
|----------|------|--------|-------------|
| `mx:accessLevel` | Text | `public`, `authenticated`, `restricted` | Visibility level |
| `mx:licenseType` | Text | See values | Usage rights |
| `mx:citationRequired` | Boolean | | Must cite when referencing |

**License types:**

| Value | Description |
|-------|-------------|
| `open` | No restrictions |
| `attribution` | May use with attribution |
| `no-training` | May retrieve but not use for training |
| `no-reproduction` | May summarise but not quote |
| `retrieval-only` | RAG retrieval only, no persistent storage |
| `restricted` | Do not process |

```yaml
mx:accessLevel: public
mx:licenseType: attribution
mx:citationRequired: true
```

### Processing Hint Properties

| Property | Type | Description |
|----------|------|-------------|
| `mx:processingHint` | Text | Direct guidance for machine processors |
| `mx:illustrative` | Boolean | Uses fictional scenarios to illustrate real patterns |

```yaml
mx:processingHint: "Section headings indicate topic boundaries for chunking"
mx:illustrative: true
```

---

## Inheritance Properties

These properties control how metadata flows between levels.

| Property | Type | Description |
|----------|------|-------------|
| `mx:inheritable` | Array | Properties that children may inherit |
| `mx:inherit` | Boolean | Whether to inherit from parent (default: true) |
| `mx:inheritFrom` | URL/`none` | Override default inheritance source |
| `mx:inherit_except` | Array | Properties to exclude from inheritance |

```yaml
mx:inheritable:
  - mx:audience
  - mx:volatility
  - mx:accessLevel
  - mx:licenseType
  
mx:inherit: true
mx:inheritFrom: /handbook/
mx:inherit_except:
  - mx:status
```

### Array Inheritance

Arrays can be extended or modified during inheritance:

**Replace (default):**
```yaml
# Child replaces parent array
mx:tags: [new, tags]
```

**Extend:**
```yaml
# Child extends parent array
mx:tags:
  mx:extend: true
  values: [additional, tags]
```

**Remove:**
```yaml
# Child removes from parent array
mx:tags:
  mx:remove: [unwanted]
```

---

## Extension Properties

These properties enable custom extensions.

| Property | Type | Description |
|----------|------|-------------|
| `mx:extensions` | Array | Schema locations for extensions |

```yaml
mx:extensions:
  - .mx/extensions/acme-compliance.yaml
  - https://example.com/mx-extension.yaml
  - npm:@acme/mx-extension
```

### Reserved Namespaces

| Namespace | Owner | Purpose |
|-----------|-------|---------|
| `mx` | MX Community | Core specification |
| `ai` | MX Community | AI-specific properties |
| `schema` | Schema.org | Schema.org alignment |

### Extension Format

Custom extensions use namespaced properties:

```yaml
acme:compliance:
  pci_dss: true
  gdpr: true
  
security:classification: internal
```

---

## AI Properties

These properties guide AI agent behaviour. They appear in all specifications with context-appropriate semantics.

### Core AI Properties

| Property | Type | Description |
|----------|------|-------------|
| `mx:ai.training` | Text | Training permission: `permitted`, `prohibited`, `conditional` |
| `mx:ai.extraction` | Text | Information extraction: `permitted`, `prohibited` |
| `mx:ai.generation` | Text | Content generation: `permitted`, `prohibited`, `review_required` |

```yaml
ai:
  training: prohibited
  extraction: permitted
  generation: review_required
```

### Context-Dependent AI Properties

Different specifications define additional AI properties appropriate to their domain:

**Code:**
- `ai.editable` — Edit permission
- `ai.context_required` — Files to read before editing
- `ai.safe_to_call` — API call permission

**Media:**
- `ai.alt_text` — Alternative text
- `ai.description_confidence` — Confidence in description
- `ai.reproduction` — Reproduction permission

**Database:**
- `ai.query_allowed` — Query execution permission
- `ai.schema_visible` — Schema visibility
- `ai.mask_in_responses` — Value masking

**Content Fragments:**
- `ai.rag.enabled` — RAG indexing
- `ai.rag.chunking` — Chunking strategy
- `ai.rag.hints` — Retrieval hints

---

## Classification Properties

These properties enable data governance across specifications.

### Sensitivity

| Property | Type | Values | Description |
|----------|------|--------|-------------|
| `mx:classification.sensitivity` | Text | `public`, `internal`, `confidential`, `restricted` | Data sensitivity |

```yaml
classification:
  sensitivity: confidential
```

**AI behaviour by sensitivity:**

| Level | Query | Training | Schema Visible |
|-------|-------|----------|----------------|
| `public` | Yes | Yes | Yes |
| `internal` | Yes | No | Yes |
| `confidential` | No | No | Yes |
| `restricted` | No | No | No |

### PII Properties

| Property | Type | Description |
|----------|------|-------------|
| `mx:classification.pii` | Boolean | Contains personal data |
| `mx:classification.pii_type` | Text | Type of PII |
| `mx:classification.pii_fields` | Array | Fields containing PII |

```yaml
classification:
  pii: true
  pii_type: email
  pii_fields: [email, phone, name]
```

### Regulatory Properties

| Property | Type | Description |
|----------|------|-------------|
| `mx:classification.regulatory` | Array | Applicable regulations |
| `mx:classification.retention_days` | Number | Data retention period |

```yaml
classification:
  regulatory: [gdpr, pci-dss]
  retention_days: 2555
```

---

## Relationship Properties

These properties define connections between entities.

| Property | Type | Description |
|----------|------|-------------|
| `mx:relatedTo` | URL/Array | Related content (weak relationship) |
| `mx:prerequisites` | URL/Array | Required prior knowledge |
| `mx:isPartOf` | URL | Parent entity |
| `mx:hasPart` | URL/Array | Child entities |

```yaml
mx:relatedTo:
  - /docs/authentication/
  - /docs/authorization/
mx:prerequisites:
  - /docs/getting-started/
mx:isPartOf: /handbook/
```

### Relationship Strength

| Property | Type | Range | Description |
|----------|------|-------|-------------|
| `mx:relationshipStrength` | Number | 0-1 | How strongly related |

```yaml
mx:relatedTo:
  - url: /docs/authentication/
    mx:relationshipStrength: 0.9
  - url: /docs/logging/
    mx:relationshipStrength: 0.3
```

---

## Semantic Properties

These properties define meaning across specifications.

| Property | Type | Description |
|----------|------|-------------|
| `mx:semantic.type` | Text | Semantic type (see Semantic Types) |
| `mx:semantic.entity` | Text | Entity this describes |
| `mx:semantic.role` | Text | Role in entity |
| `mx:semantic.standard` | Text | Standard conformed to |

```yaml
semantic:
  type: email
  entity: user
  role: contact
  standard: RFC 5322
```

### Common Semantic Types

| Type | Description |
|------|-------------|
| `identifier` | Unique identifier |
| `name` | Name field |
| `email` | Email address |
| `phone` | Phone number |
| `address` | Physical address |
| `url` | URL/URI |
| `date` | Date value |
| `timestamp` | Date and time |
| `currency` | Monetary value |
| `quantity` | Numeric quantity |
| `status` | Status/state |
| `category` | Classification |
| `description` | Free text |

---

## Chunking Properties

These properties guide content chunking for RAG and retrieval.

| Property | Type | Values | Description |
|----------|------|--------|-------------|
| `mx:chunkBoundary` | Text | `heading`, `paragraph`, `section`, `none` | Where to split |
| `mx:chunkSize` | Number | | Target chunk size in tokens |
| `mx:standalone` | Boolean | | Chunks are self-contained |

```yaml
mx:chunkBoundary: heading
mx:chunkSize: 500
mx:standalone: true
```

---

## Internationalisation Properties

| Property | Type | Description |
|----------|------|-------------|
| `mx:translationOf` | URL | Source language version |
| `mx:translationStatus` | Text | `current`, `outdated`, `machine` |
| `inLanguage` | Text | BCP 47 language tag |

```yaml
inLanguage: de-DE
mx:translationOf: /en/docs/getting-started/
mx:translationStatus: current
```

---

## Composition

Domain specifications compose properties from base and sibling specifications.

### Composition Declaration

```yaml
# api-metadata.spec.yaml
specification:
  name: MX API Metadata Specification
  version: "1.0"
  
  composes:
    - source: mx-base
      properties: all
      
    - source: mx-structured-data
      properties:
        - mx:status
        - mx:volatility
        - mx:confidence
        
    - source: mx-code-metadata
      properties:
        - mx:stability
        - ai.editable
        - extensions
        
    - source: mx-database-metadata
      properties:
        - mx:classification
        - mx:semantic.type
        - ai.query_allowed
```

### Property Precedence

When properties appear in multiple composed specifications:

1. Domain specification definition (highest)
2. Most specific sibling specification
3. Base specification (lowest)

### Composition Examples

**API Specification** might compose:

```yaml
# From Base
mx:audience: machine
mx:status: published
mx:volatility: stable

# From Code Metadata
mx:stability: stable
ai:
  editable: false
  
# From Database Metadata  
classification:
  sensitivity: internal
  pii_fields: []
  
# API-specific
api:
  method: GET
  path: /users/{id}
  rate_limit: 100/minute
```

**Knowledge Base Specification** might compose:

```yaml
# From Base
mx:audience: both
mx:confidence: 0.9

# From Structured Data
mx:rag:
  enabled: true
  chunking:
    strategy: semantic
    
# From Content Fragments
variations:
  - type: locale
    locale: de-DE
    
# Knowledge-base specific
kb:
  topic: authentication
  expertise_level: intermediate
```

---

## Validation

### Required Properties

All MX-conformant content MUST declare:

- `mx:version` — Specification version

All MX-conformant content SHOULD declare:

- `mx:audience` — Target consumer
- `mx:status` — Lifecycle state

### Validation Rules

1. Properties MUST use correct types
2. Enum values MUST match defined options
3. Ranges (0-1) MUST be respected
4. URLs MUST be valid
5. Dates MUST be ISO 8601
6. Extensions MUST use namespaced properties

### Validation Severity

| Severity | Action |
|----------|--------|
| Error | Halt processing, report |
| Warning | Continue, log warning |
| Info | Continue, log for review |

---

## Interpretation by AI Agents

### Property Resolution

AI agents MUST resolve properties in this order:

1. Check for explicit declaration
2. Check for inherited value
3. Apply specification default
4. Apply base specification default

### Permission Checking

Before any action, agents MUST check:

1. `mx:accessLevel` — Can this content be accessed?
2. `mx:ai.training` — Can this be used for training?
3. `mx:ai.extraction` — Can information be extracted?
4. `mx:classification.sensitivity` — What restrictions apply?

### Status Respect

| Status | Agent Behaviour |
|--------|-----------------|
| `draft` | Do not use |
| `review` | Do not use |
| `approved` | Use if published unavailable |
| `published` | Standard use |
| `deprecated` | Warn, suggest alternatives |
| `archived` | Historical queries only |

### Quality Weighting

When synthesising from multiple sources:

1. Prefer higher `mx:confidence` sources
2. Prefer higher `mx:accuracy` sources
3. Prefer higher `mx:completeness` sources
4. Note quality in responses when relevant

### Provenance Handling

| Source | Trust Level |
|--------|-------------|
| `human` | Standard |
| `ai-assisted` | Check for verification |
| `ai-generated` | Verify independently |

---

## Appendix A: Property Quick Reference

### Universal Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mx:version` | Text | Required | Spec version |
| `mx:id` | Text | | Unique identifier |
| `mx:audience` | Text | `both` | Target consumer |
| `mx:status` | Text | `draft` | Lifecycle state |
| `mx:volatility` | Text | `periodic` | Change frequency |
| `mx:confidence` | Number | | Author certainty |
| `mx:accuracy` | Number | | Factual correctness |
| `mx:completeness` | Number | | How finished |
| `mx:source` | Text | | Content origin |
| `mx:accessLevel` | Text | `public` | Visibility |
| `mx:licenseType` | Text | | Usage rights |

### Inheritance Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mx:inheritable` | Array | | Properties to inherit |
| `mx:inherit` | Boolean | `true` | Enable inheritance |
| `mx:inheritFrom` | Text | | Override parent |
| `mx:inherit_except` | Array | | Exclude from inheritance |

### AI Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ai.training` | Text | | Training permission |
| `ai.extraction` | Text | | Extraction permission |
| `ai.generation` | Text | | Generation permission |

### Classification Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `classification.sensitivity` | Text | | Data sensitivity |
| `classification.pii` | Boolean | | Contains PII |
| `classification.regulatory` | Array | | Regulations |

---

## Appendix B: Specification Registry

| Specification | Canonical URL | Status |
|---------------|---------------|--------|
| MX Base | https://mx.community/spec/base | Draft |
| MX Structured Data | https://mx.community/spec/structured-data | Draft |
| MX Code Metadata | https://mx.community/spec/code-metadata | Draft |
| MX Media Metadata | https://mx.community/spec/media-metadata | Draft |
| MX Content Fragment | https://mx.community/spec/content-fragments | Draft |
| MX Data Lake | https://mx.community/spec/data-lake | Draft |
| MX Database Metadata | https://mx.community/spec/database-metadata | Draft |

---

## Appendix C: References

- Schema.org: https://schema.org/
- JSON-LD: https://www.w3.org/TR/json-ld/
- BCP 47 Language Tags: https://www.rfc-editor.org/info/bcp47
- ISO 8601 Dates: https://www.iso.org/iso-8601-date-and-time-format.html

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0-draft | January 2026 | Initial draft |
