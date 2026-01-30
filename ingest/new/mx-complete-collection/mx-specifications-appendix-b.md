---
title: "MX Specifications: Appendix B"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "Glossary"
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

# Appendix B: Glossary

Key terms used throughout the MX specifications.

---

## A

**Accuracy**
A quality metric (0–1) indicating how factually correct content is, typically assessed by a reviewer rather than the author.

**Audience**
The primary consumer of content: `human` (written for people), `machine` (structured for processing), or `both` (serves both purposes).

**Alt Text**
Alternative text describing an image for accessibility purposes, read by screen readers.

---

## B

**Base Specification**
The foundational MX specification that defines properties inherited by all domain specifications.

---

## C

**CDC (Change Data Capture)**
A pattern for tracking changes to data, enabling incremental processing and real-time synchronisation.

**Chunking**
The process of breaking content into smaller pieces for embedding and retrieval. Strategies include `semantic`, `fixed`, `sentence`, and `paragraph`.

**Collection**
A group of content fragments, either curated (explicit membership), dynamic (query-based), or smart (algorithm-driven).

**Completeness**
A quality metric (0–1) indicating how finished content is, with 1.0 meaning fully complete.

**Composition**
The practice of combining multiple MX specifications to describe complex content that spans domains.

**Confidence**
A quality metric (0–1) indicating how certain the author is about the content's claims.

**Content Fragment**
A discrete, reusable unit of structured content, independent of presentation, designed for multi-channel delivery.

---

## D

**Data Lake**
A storage system holding large amounts of raw data, often used for analytics and AI applications.

**Domain Specification**
An MX specification covering a specific content domain: Structured Data, Code, Media, Content Fragments, Data Lake, or Database.

---

## E

**Embedding**
A numerical vector representation of text, enabling semantic similarity search and AI retrieval.

**Extension**
Custom metadata properties added to MX using organisation-specific namespaces.

---

## F

**Facetable**
A field property indicating the field can be used for filtering and faceted navigation.

**Fragment Model**
A schema defining the structure, fields, and constraints for a type of content fragment.

**Frontmatter**
YAML metadata at the beginning of a document, delimited by `---` markers.

---

## H

**Headless Content**
Content managed separately from its presentation, delivered via APIs to multiple channels.

---

## I

**Inheritable**
Properties that automatically flow from parent content to child content unless overridden.

**Inheritance**
The mechanism by which child content receives properties from parent content, directories, or models.

**Inline Annotation**
MX metadata declared directly in source code using comments with `@mx:` prefixes.

---

## J

**JSON-LD**
JavaScript Object Notation for Linked Data, the format search engines use for structured data.

---

## L

**ld Block**
The section of YAML frontmatter containing schema.org structured data.

**Lineage**
Metadata tracking where data came from, how it was transformed, and where it flows to.

---

## M

**Model (Fragment)**
See Fragment Model.

**MX**
Machine Experience — the discipline of designing digital experiences for machine consumers.

---

## N

**Namespace**
A prefix distinguishing one set of properties from another. `mx:` is the core MX namespace.

---

## P

**Partition**
A strategy for organising data in storage to enable efficient queries, typically by time, type, or tenant.

**PII (Personally Identifiable Information)**
Data that can identify an individual, such as email, phone, or address.

**Provenance**
Metadata describing the origin and history of content, including who created it and how.

---

## Q

**Quality Metrics**
Numerical measures of content reliability: completeness, validity, accuracy, consistency, uniqueness, freshness.

---

## R

**RAG (Retrieval-Augmented Generation)**
An AI pattern that retrieves relevant content before generating responses.

**Relationship**
A connection between content items, such as fragment references, media references, or external links.

**Resolution**
The process of determining which property value applies when multiple sources could provide it.

---

## S

**Schema.org**
A vocabulary of types and properties for structured data, used by search engines.

**Searchable**
A field property indicating the field should be included in full-text search indexes.

**Semantic Type**
A classification of what kind of data a field contains (e.g., `email`, `money`, `timestamp`), beyond the technical data type.

**Sidecar File**
A metadata file that accompanies a content file, using the naming pattern `filename.ext.mx.yaml`.

**Stability**
An indicator of how much a code interface might change: `stable`, `unstable`, `experimental`, `deprecated`, `internal`.

**Status**
The lifecycle state of content: `draft`, `review`, `approved`, `published`, `deprecated`, `archived`.

**Structured Data**
Machine-readable information about content, typically using schema.org vocabulary.

---

## V

**Variation**
An alternative version of a content fragment for different contexts: locale, channel, audience, experiment, etc.

**Vector Store**
A database optimised for storing and querying embeddings, enabling semantic search.

**Volatility**
How frequently content changes: `stable` (rarely), `periodic` (scheduled), `frequent` (often).

---

## Y

**YAML**
YAML Ain't Markup Language — the data format used for MX metadata files.
