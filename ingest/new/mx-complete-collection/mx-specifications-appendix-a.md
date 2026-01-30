---
title: "MX Specifications: Appendix A"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "Quick Reference"
  author:
    "@type": Person
    name: Tom Ledger
  isPartOf:
    "@type": Book
    name: "MX: Specifications"
  inLanguage: en-GB
  mx:audience: human
  mx:status: draft
---

# Appendix A: Quick Reference

This appendix provides at-a-glance reference for the most commonly used MX properties across all specifications.

---

## Base Properties

These properties work in any MX specification.

### Core Properties

| Property | Values | Description |
|----------|--------|-------------|
| `mx:version` | "1.0" | MX specification version |
| `mx:status` | draft, review, approved, published, deprecated, archived | Lifecycle state |
| `mx:audience` | human, machine, both | Primary consumer |
| `mx:volatility` | stable, periodic, frequent | Change frequency |
| `mx:confidence` | 0.0–1.0 | Author certainty |
| `mx:accuracy` | 0.0–1.0 | Verified correctness |
| `mx:completeness` | 0.0–1.0 | How finished |

### Provenance

| Property | Values | Description |
|----------|--------|-------------|
| `mx:source` | human, ai-assisted, ai-generated | Creation method |
| `mx:verifiedBy` | Person object | Who verified |
| `mx:verifiedDate` | ISO date | When verified |

### Access

| Property | Values | Description |
|----------|--------|-------------|
| `mx:accessLevel` | public, authenticated, restricted | Who can access |
| `mx:licenseType` | open, attribution, no-training, no-reproduction, retrieval-only, restricted | Usage rights |
| `mx:citationRequired` | true, false | Must cite source |

### Inheritance

| Property | Values | Description |
|----------|--------|-------------|
| `mx:inheritable` | Array of property names | What children inherit |
| `mx:inherit` | true, false | Whether to inherit |
| `mx:inheritFrom` | Path | Override inheritance source |
| `mx:inherit_except` | Array of property names | Don't inherit these |

---

## Structured Data (ld block)

### Common Types

| Type | Use For |
|------|---------|
| `Article` | News, blog posts |
| `TechArticle` | Technical documentation |
| `HowTo` | Step-by-step instructions |
| `FAQPage` | Q&A pages |
| `Product` | Product pages |
| `Review` | Reviews |
| `Event` | Events |
| `Person` | People |
| `Organization` | Companies |

### Common Properties

| Property | Description |
|----------|-------------|
| `name` | Name of the thing |
| `description` | Description |
| `datePublished` | Publication date |
| `dateModified` | Last modified |
| `author` | Creator |
| `publisher` | Publisher |
| `image` | Associated image |

---

## Code Metadata

### Repository Level

```yaml
repository:
  name: string
  owner:
    team: string
    contact: string
  ai:
    read: boolean
    suggest: boolean
    edit: boolean
    generate: boolean
    training: boolean
```

### Stability Levels

| Level | Meaning |
|-------|---------|
| `stable` | Public API, won't change |
| `unstable` | May change without notice |
| `experimental` | Actively evolving |
| `deprecated` | Being phased out |
| `internal` | Not for external use |

### Inline Annotations

```
@mx:stability stable
@mx:owner team-name
@mx:ai.edit false
@mx:ai.context Free text context
@mx:tests file.test.ts#testName
```

---

## Media Metadata

### Asset Properties

```yaml
asset:
  title: string
  description: string
  alt_text: string
  type: image | video | audio | document
  format: string
```

### Technical (Images)

```yaml
technical:
  width: number
  height: number
  aspect_ratio: string
  color_space: string
  dpi: number
```

### Rights

```yaml
rights:
  owner: string
  copyright: string
  license:
    type: proprietary | creative-commons | royalty-free | rights-managed
```

### AI Permissions

```yaml
ai:
  training:
    permitted: boolean
  retrieval:
    permitted: boolean
  description:
    permitted: boolean
```

---

## Content Fragments

### Fragment Structure

```yaml
identity:
  id: string
  path: string
  model: string
  model_version: string

metadata:
  title: string
  status: string
  created: datetime
  modified: datetime

content:
  # Fields defined by model
```

### Variation Types

| Type | Selection By |
|------|--------------|
| `locale` | User language |
| `channel` | Device/platform |
| `audience` | User segment |
| `experiment` | A/B assignment |
| `temporal` | Date/time |
| `personalised` | User profile |

### Relationships

```yaml
relationships:
  name:
    type: fragment_reference | media_reference | external_reference
    cardinality: one | many
    target: string
    targets: array
```

---

## Data Lake

### Partition

```yaml
datalake:
  partition:
    year: number
    month: number
    day: number
    model: string
    locale: string
```

### Quality

```yaml
quality:
  completeness: 0.0–1.0
  validity: 0.0–1.0
  accuracy: 0.0–1.0
  consistency: 0.0–1.0
  freshness: datetime
```

### Embeddings

```yaml
embeddings:
  - field: string
    model: string
    dimensions: number
    vector_id: string
    chunking:
      strategy: semantic | fixed | sentence | paragraph
      target_size: number
      overlap: number
```

### RAG

```yaml
mx:
  rag:
    enabled: boolean
    priority: high | medium | low
    chunking:
      strategy: string
      target_size: number
    hints:
      query_patterns: array
      keywords:
        primary: array
        secondary: array
      qa_pairs:
        - question: string
          answer_location: string
```

---

## Database

### Table Structure

```yaml
table:
  name: string
  schema: string
  description: string
  owner:
    team: string
  classification:
    sensitivity: public | internal | confidential | restricted
    pii_present: boolean
```

### Column Properties

```yaml
columns:
  - name: string
    type: string
    nullable: boolean
    primary_key: boolean
    description: string
    semantic:
      type: string
      entity: string
      role: string
    classification:
      pii: boolean
      pii_type: string
    ai:
      display_name: string
      searchable: boolean
      include_in_results: boolean
      never_expose: boolean
```

### Semantic Types

| Type | Examples |
|------|----------|
| `identifier` | User ID, Order ID |
| `email` | Contact email |
| `phone` | Phone number |
| `money` | Price, total |
| `timestamp` | Created, modified |
| `status` | Order status |

---

## File Naming Conventions

| Content Type | Pattern |
|--------------|---------|
| Structured data | `*.md` (frontmatter) |
| Code repository | `.mx.yaml` (root) |
| Code directory | `.mx.yaml` (in directory) |
| Code file | `*.mx.yaml` (companion) |
| Media | `*.mx.yaml` (sidecar) |
| Fragment | `*.fragment.yaml` |
| Fragment model | `*.model.yaml` |
| Collection | `*.collection.yaml` |
| Database | `*.mx.yaml` |

---

## Status Lifecycle

```
draft → review → approved → published → deprecated → archived
                                ↓
                           superseded
```

---

## AI Permission Hierarchy

When checking permissions, apply the most restrictive:

1. Explicit declaration on this content
2. Inherited from parent/directory
3. Inherited from repository/database
4. Specification defaults

If any level says `false`, the answer is `false`.

---

## Inheritance Resolution

When looking for a property value:

1. Explicit declaration (highest priority)
2. Parent content
3. Grandparent content
4. Directory defaults
5. Model/schema defaults
6. Base specification defaults (lowest priority)

First value found wins.

---

## Common Validation Errors

| Error | Cause | Fix |
|-------|-------|-----|
| Missing required property | Required field not set | Add the property |
| Invalid enum value | Value not in allowed list | Use valid value |
| Reference not found | Target doesn't exist | Fix path or create target |
| Type mismatch | Wrong data type | Use correct type |
| Permission conflict | Inconsistent AI permissions | Apply most restrictive |
| Circular inheritance | A inherits from B inherits from A | Break the cycle |

---

## Quick Validation Commands

```bash
# Validate everything
mx-validate .

# Specific specification
mx-validate structured-data content/
mx-validate media assets/
mx-validate fragments fragments/
mx-validate database database/

# With composition checks
mx-validate . --composition

# Output for CI
mx-validate . --format junit > results.xml
```
