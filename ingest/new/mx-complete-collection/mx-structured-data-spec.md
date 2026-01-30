---
title: "MX Structured Data Specification"
date: 2026-01-28
ld:
  "@type": TechArticle
  headline: "MX Structured Data Specification"
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
  mx:canonicalFor: https://mx.community/spec/structured-data
  mx:accessLevel: public
  mx:licenseType: attribution
  mx:citationRequired: true
  mx:completeness: 0.9
  mx:accuracy: 0.85
  mx:confidence: 0.8
  mx:inheritable:
    - author
    - publisher
    - inLanguage
    - mx:accessLevel
    - mx:licenseType
---

# MX Structured Data Specification

Version: 1.0.0-draft
Status: Draft
Last Updated: January 2026

---

## Introduction

This specification defines how Machine Experience (MX) content declares structured data using YAML frontmatter. The approach enables machine processors to extract semantic information without parsing document content, while maintaining human readability.

This specification extends the **MX Base Specification** (`mx.community/spec/base`) and inherits all core properties defined there.

The specification covers:

- Frontmatter format for structured data declaration
- Processing requirements for build systems
- Schema.org type guidance
- MX extension properties specific to content
- Error handling
- Interpretation by AI agents
- Migration from existing content
- Inheritance from parent pages

### Relationship to Base Specification

This specification inherits from MX Base:

- All core properties (`mx:audience`, `mx:status`, `mx:volatility`, etc.)
- All inheritance properties (`mx:inheritable`, `mx:inherit`, etc.)
- All AI properties (`ai.training`, `ai.extraction`, etc.)
- All classification properties
- Extension framework

This specification adds:

- Frontmatter `ld` block format
- Schema.org type guidance
- Content-specific properties (`mx:illustrative`, page-level inheritance)
- Breadcrumb and page hierarchy inheritance

---

## Structured Data in Frontmatter

Content authors declare schema.org structured data using the `ld` block in YAML frontmatter. This enables machine processors to extract semantic information without parsing document content.

### Format

The `ld` block contains schema.org properties in YAML syntax:

```yaml
---
title: "Chapter 3: Machine-Readable Intent"
ld:
  "@type": BlogPosting
  genre: [Technology, Illustrative Fiction]
  about: Machine Experience design patterns
  abstract: Uses fictionalised scenarios to illustrate real and emerging behaviours
---
```

Keys beginning with `@` (such as `@type` and `@id`) MUST be preserved exactly during processing.

### Processing Requirements

Build systems MUST:

1. Parse the `ld` block as a JSON object
2. Add `"@context": "https://schema.org"` as the first property
3. Output as `<script type="application/ld+json">` in the document `<head>`

Build systems SHOULD:

1. Validate output against schema.org vocabulary
2. Merge with any auto-generated properties (e.g. `datePublished`, `author`) where not explicitly declared
3. Report invalid or unrecognised schema.org types as warnings

### Multiple Types

A document may declare multiple schema.org types:

```yaml
ld:
  "@type": [BlogPosting, ShortStory]
  genre: Science Fiction
```

### Nested Structures

Complex structures use standard YAML nesting:

```yaml
ld:
  "@type": BlogPosting
  author:
    "@type": Person
    name: Tom Ledger
  isPartOf:
    "@type": CreativeWorkSeries
    name: "MX: The Handbook"
```

---

## Schema.org Type Guidance

Choose types based on content purpose, not format. A page rendered as HTML might be a `TechArticle`, `HowTo`, or `FAQPage` depending on what it communicates.

### Documentation Content

| Content | Type | When to Use |
|---------|------|-------------|
| API reference | `TechArticle` | Describes technical interfaces, methods, parameters |
| Tutorial | `HowTo` | Step-by-step instructions to achieve an outcome |
| Guide | `Article` or `TechArticle` | Explanatory content without step-by-step structure |
| FAQ | `FAQPage` | Question and answer format |
| Specification | `TechArticle` | Formal requirements or standards |

```yaml
ld:
  "@type": TechArticle
  proficiencyLevel: Beginner
  dependencies: Basic understanding of YAML
```

### Blog and Editorial Content

| Content | Type | When to Use |
|---------|------|-------------|
| Blog post | `BlogPosting` | Dated, informal, part of a blog |
| News | `NewsArticle` | Time-sensitive reporting |
| Opinion | `BlogPosting` | With `genre: Opinion` |
| Review | `Review` | Evaluates a product, service, or work |

```yaml
ld:
  "@type": BlogPosting
  genre: [Technology, Opinion]
  wordCount: 1200
```

### Illustrative and Fictional Content

For content that uses fictional scenarios to illustrate real patterns:

```yaml
ld:
  "@type": BlogPosting
  genre: [Technology, Illustrative Fiction]
  abstract: Uses fictionalised scenarios to illustrate real and emerging behaviours
```

For original short fiction:

```yaml
ld:
  "@type": [BlogPosting, ShortStory]
  genre: Science Fiction
  character:
    - "@type": Person
      name: Elena Ward
```

For content discussing existing fiction:

```yaml
ld:
  "@type": BlogPosting
  about:
    "@type": Book
    name: "1984"
    author:
      "@type": Person
      name: George Orwell
```

### Series and Collections

For content that forms part of a larger work:

```yaml
ld:
  "@type": BlogPosting
  isPartOf:
    "@type": CreativeWorkSeries
    name: "MX: The Handbook"
  position: 3
```

For the series landing page:

```yaml
ld:
  "@type": CreativeWorkSeries
  name: "MX: The Handbook"
  description: A practical guide to Machine Experience design
  hasPart:
    - "@type": Article
      name: "Chapter 1: What is MX?"
      url: /handbook/chapter-1
```

### Reference and Data Content

| Content | Type | When to Use |
|---------|------|-------------|
| Glossary entry | `DefinedTerm` | Single term with definition |
| Glossary page | `DefinedTermSet` | Collection of terms |
| Dataset | `Dataset` | Downloadable or queryable data |
| Code sample | `SoftwareSourceCode` | Standalone code examples |

```yaml
ld:
  "@type": DefinedTerm
  name: Machine Experience
  description: The practice of designing digital experiences that serve both human and machine users
  inDefinedTermSet:
    "@type": DefinedTermSet
    name: MX Glossary
```

### People and Organisations

```yaml
ld:
  "@type": Person
  name: Tom Ledger
  jobTitle: Principal Consultant
  worksFor:
    "@type": Organization
    name: Digital Domain Technologies Ltd
```

### Events

```yaml
ld:
  "@type": Event
  name: "MX Book Launch"
  startDate: 2026-04-02
  eventAttendanceMode: OnlineEventAttendanceMode
```

---

## Choosing the Right Type

1. **Start with purpose.** What does this content help someone do or understand?

2. **Check schema.org hierarchy.** More specific types inherit properties from general types. `TechArticle` is more specific than `Article` — use the specific type when it applies.

3. **Use multiple types when appropriate.** `["BlogPosting", "ShortStory"]` is valid when content genuinely serves both purposes.

4. **Don't overload.** Not every property needs a value. Include what's useful for machine processors; omit what adds no information.

5. **Test with validators.** Google's Rich Results Test and Schema.org's validator catch errors before they reach production.

---

## MX Extension Properties

Schema.org allows custom properties via the `additionalProperty` mechanism or by declaring a custom namespace. For MX-specific metadata that has no schema.org equivalent, use a namespaced approach.

### Namespace Convention

MX extensions use the `mx:` prefix within the `ld` block. Build systems MUST either:

1. Expand these into `additionalProperty` entries, or
2. Output them in a separate `<script type="application/ld+json">` block with a custom `@context`

### MX-Specific Properties

#### Core Properties

| Property | Type | Description |
|----------|------|-------------|
| `mx:audience` | Text or Array | Target processor type: `human`, `machine`, or `both` |
| `mx:processingHint` | Text | Guidance for machine processors on how to handle content |
| `mx:confidence` | Number | Author's confidence level in factual claims (0-1) |
| `mx:illustrative` | Boolean | Indicates content uses fictional scenarios to illustrate real patterns |
| `mx:volatility` | Text | How frequently content changes: `stable`, `periodic`, `frequent` |
| `mx:canonicalFor` | URL | This document is the authoritative source for the linked topic |
| `mx:inheritable` | Array | Properties that child pages should inherit |
| `mx:inheritFrom` | URL or `none` | Override default inheritance behaviour |

#### Content Lifecycle Properties

| Property | Type | Description |
|----------|------|-------------|
| `mx:status` | Text | Content state: `draft`, `review`, `published`, `deprecated`, `archived` |
| `mx:supersededBy` | URL | Location of replacement content |
| `mx:supersedes` | URL | Location of older content this replaces |
| `mx:reviewDate` | Date | When content should next be reviewed (ISO 8601) |

#### Provenance and Trust Properties

| Property | Type | Description |
|----------|------|-------------|
| `mx:source` | Text | Content origin: `human`, `ai-assisted`, `ai-generated` |
| `mx:verifiedBy` | Text or Object | Who or what validated the content |
| `mx:verifiedDate` | Date | When verification occurred (ISO 8601) |

#### Chunking and Retrieval Properties

| Property | Type | Description |
|----------|------|-------------|
| `mx:chunkBoundary` | Text | Where to split for RAG: `heading`, `paragraph`, `section`, `none` |
| `mx:chunkSize` | Number | Suggested token count per chunk |
| `mx:standalone` | Boolean | Whether chunks are self-contained or need surrounding context |

#### Relationship Properties

| Property | Type | Description |
|----------|------|-------------|
| `mx:relatedTo` | URL or Array | URLs of related content (weaker than `isPartOf`) |
| `mx:prerequisites` | URL or Array | Content that should be understood first |

#### Access and Permissions Properties

| Property | Type | Description |
|----------|------|-------------|
| `mx:accessLevel` | Text | Visibility: `public`, `authenticated`, `restricted` |
| `mx:licenseType` | Text | How AI agents may use the content (see License Types) |

#### Internationalisation Properties

| Property | Type | Description |
|----------|------|-------------|
| `mx:translationOf` | URL | URL of source language version |
| `mx:translationStatus` | Text | Translation state: `current`, `outdated`, `machine` |

#### Quality Signal Properties

| Property | Type | Description |
|----------|------|-------------|
| `mx:completeness` | Number | How finished the content is (0-1) |
| `mx:accuracy` | Number | Factual correctness (0-1), distinct from author confidence |
| `mx:citationRequired` | Boolean | Whether agents must cite when using this content |

### Usage Examples

**Dual-audience content:**

```yaml
ld:
  "@type": TechArticle
  name: "Structured Data for AI Agents"
  mx:audience: [human, machine]
  mx:processingHint: "Section headings indicate topic boundaries for chunking"
```

**Illustrative fiction:**

```yaml
ld:
  "@type": BlogPosting
  genre: [Technology, Illustrative Fiction]
  mx:illustrative: true
  mx:confidence: 0.8
  abstract: Fictionalised scenario. Plausible or already occurring. Specific details are illustrative but the pattern is real.
```

**Stable reference content:**

```yaml
ld:
  "@type": DefinedTerm
  name: Machine Experience
  mx:volatility: stable
  mx:canonicalFor: https://mx.community/glossary/machine-experience
```

**Machine-primary content:**

```yaml
ld:
  "@type": Dataset
  name: "MX Pattern Library"
  mx:audience: machine
  mx:processingHint: "Each entry is self-contained and suitable for RAG retrieval"
```

### Content Lifecycle Examples

**Draft content:**

```yaml
ld:
  "@type": TechArticle
  mx:status: draft
  mx:completeness: 0.6
  mx:reviewDate: 2026-02-15
```

**Deprecated content with replacement:**

```yaml
ld:
  "@type": TechArticle
  mx:status: deprecated
  mx:supersededBy: /docs/v2/authentication/
  mx:processingHint: "Direct users to superseding content"
```

**Content replacing older version:**

```yaml
ld:
  "@type": TechArticle
  mx:status: published
  mx:supersedes: /docs/v1/authentication/
```

### Provenance Examples

**Human-authored content:**

```yaml
ld:
  "@type": Article
  mx:source: human
  mx:verifiedBy: Technical Review Board
  mx:verifiedDate: 2026-01-15
```

**AI-assisted content:**

```yaml
ld:
  "@type": Article
  mx:source: ai-assisted
  mx:verifiedBy:
    "@type": Person
    name: Tom Ledger
  mx:verifiedDate: 2026-01-20
  mx:processingHint: "Initial draft AI-generated, reviewed and edited by human author"
```

**AI-generated content:**

```yaml
ld:
  "@type": Article
  mx:source: ai-generated
  mx:confidence: 0.7
  mx:verifiedBy: automated-fact-check
  mx:verifiedDate: 2026-01-22
  mx:citationRequired: true
```

### Chunking and Retrieval Examples

**Documentation optimised for RAG:**

```yaml
ld:
  "@type": TechArticle
  mx:audience: machine
  mx:chunkBoundary: heading
  mx:chunkSize: 500
  mx:standalone: true
  mx:processingHint: "Each section answers a single question"
```

**Narrative content requiring context:**

```yaml
ld:
  "@type": Article
  mx:chunkBoundary: section
  mx:standalone: false
  mx:processingHint: "Sections build on each other; include previous section for context"
```

### Relationship Examples

**Content with prerequisites:**

```yaml
ld:
  "@type": TechArticle
  name: "Advanced MX Patterns"
  mx:prerequisites:
    - /handbook/chapter-1/
    - /handbook/chapter-2/
  mx:processingHint: "Users should understand basic concepts before this content"
```

**Related content:**

```yaml
ld:
  "@type": BlogPosting
  mx:relatedTo:
    - /blog/structured-data-basics/
    - /glossary/json-ld/
```

### Access and Permissions Examples

**Public content with liberal AI usage:**

```yaml
ld:
  "@type": Article
  mx:accessLevel: public
  mx:licenseType: open
  mx:citationRequired: false
```

**Restricted content:**

```yaml
ld:
  "@type": TechArticle
  mx:accessLevel: authenticated
  mx:licenseType: no-training
  mx:citationRequired: true
  mx:processingHint: "Do not include in training datasets"
```

### Internationalisation Examples

**Source language content:**

```yaml
ld:
  "@type": Article
  inLanguage: en-GB
```

**Translation:**

```yaml
ld:
  "@type": Article
  inLanguage: de
  mx:translationOf: /en/handbook/chapter-1/
  mx:translationStatus: current
```

**Outdated translation:**

```yaml
ld:
  "@type": Article
  inLanguage: fr
  mx:translationOf: /en/handbook/chapter-1/
  mx:translationStatus: outdated
  mx:processingHint: "Source content updated since translation; verify against English version"
```

### Quality Signal Examples

**High-quality reference content:**

```yaml
ld:
  "@type": DefinedTerm
  mx:completeness: 1.0
  mx:accuracy: 0.95
  mx:confidence: 0.9
  mx:citationRequired: true
```

**Work in progress:**

```yaml
ld:
  "@type": Article
  mx:status: draft
  mx:completeness: 0.4
  mx:accuracy: 0.7
  mx:processingHint: "Content incomplete; do not cite as authoritative"
```

### License Types

The `mx:licenseType` property indicates how AI agents may use the content:

| Value | Meaning |
|-------|---------|
| `open` | No restrictions on AI use, training, or reproduction |
| `attribution` | May use with attribution to source |
| `no-training` | May retrieve and cite but not include in training datasets |
| `no-reproduction` | May summarise but not quote directly |
| `retrieval-only` | May use for RAG retrieval but not store persistently |
| `restricted` | Do not process; respect access controls |

### Output Format

Build systems SHOULD output MX extensions using `additionalProperty`:

```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "name": "Structured Data for AI Agents",
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "propertyID": "mx:audience",
      "value": ["human", "machine"]
    },
    {
      "@type": "PropertyValue",
      "propertyID": "mx:processingHint",
      "value": "Section headings indicate topic boundaries for chunking"
    }
  ]
}
```

Alternatively, build systems MAY use a custom context:

```json
{
  "@context": [
    "https://schema.org",
    {"mx": "https://mx.community/schema/"}
  ],
  "@type": "TechArticle",
  "name": "Structured Data for AI Agents",
  "mx:audience": ["human", "machine"],
  "mx:processingHint": "Section headings indicate topic boundaries for chunking"
}
```

The custom context approach is cleaner but requires hosting the schema definition at the specified URL.

---

## Error Handling

Build systems MUST handle malformed or invalid `ld` blocks gracefully. Silent failures make debugging difficult and may result in pages with missing structured data.

### Validation Errors

| Error | Severity | Action |
|-------|----------|--------|
| Invalid YAML syntax | Error | Halt build, report line number |
| Unrecognised `@type` | Warning | Output as-is, log warning |
| Invalid property for type | Warning | Output as-is, log warning |
| Missing required `@type` | Error | Do not output JSON-LD, report error |
| Invalid nested structure | Error | Do not output JSON-LD, report error |
| Unrecognised `mx:` property | Info | Output as-is, log for review |

### Error Messages

Error messages MUST include:

1. File path
2. Line number (where determinable)
3. The invalid content
4. Suggested correction (where possible)

**Example:**

```
ERROR: docs/chapter-3.md:7
  Invalid @type: "Blogpost"
  Did you mean: "BlogPosting"?
```

### Fallback Behaviour

When an `ld` block cannot be processed:

1. Log the error with full context
2. Continue the build (do not fail entirely)
3. Output the page without JSON-LD
4. Include an HTML comment indicating the failure:

```html
<!-- JSON-LD generation failed: Invalid @type at line 7. See build log. -->
```

### Validation Tools

Build pipelines SHOULD integrate validation against:

1. **YAML syntax** — during frontmatter parsing
2. **Schema.org vocabulary** — using the schema.org JSON-LD context
3. **MX extensions** — against the MX schema definition

Recommended validators:

- Schema.org Validator: https://validator.schema.org/
- Google Rich Results Test: https://search.google.com/test/rich-results
- JSON-LD Playground: https://json-ld.org/playground/

### Strict Mode

Build systems MAY offer a strict mode that:

1. Treats warnings as errors
2. Requires all properties to be valid schema.org or declared MX extensions
3. Fails the build on any validation error

Enable for production builds; disable for development to allow experimentation.

```yaml
# build config
structured_data:
  strict: true
  warn_on_unknown_mx: true
  validate_urls: true
```

---

## Interpretation by AI Agents

This section describes how AI agents SHOULD interpret MX-decorated structured data when processing content for retrieval, summarisation, or action.

### Processing the `ld` Block

AI agents encountering JSON-LD with MX extensions SHOULD:

1. Parse the `@type` to understand content purpose
2. Check for `mx:` properties before processing content
3. Adjust behaviour based on declared metadata

### Audience Targeting

The `mx:audience` property indicates who the content serves:

| Value | Agent Behaviour |
|-------|-----------------|
| `human` | Content optimised for human reading. Extract meaning; don't rely on structure for parsing. |
| `machine` | Content structured for machine processing. Rely on headings, lists, and markup as semantic boundaries. |
| `both` | Content serves both audiences. Structure is meaningful but prose is also important. |

When `mx:audience` includes `machine`, agents MAY:

- Use section headings as chunk boundaries for RAG retrieval
- Treat lists as enumerable items
- Parse code blocks as executable or structured data

When `mx:audience` is `human` only, agents SHOULD:

- Treat structure as presentational, not semantic
- Focus on extracting meaning from prose
- Avoid over-relying on formatting for interpretation

### Handling Illustrative Content

When `mx:illustrative: true` or `genre` includes "Illustrative Fiction":

1. **Do not cite as fact.** The content describes plausible scenarios, not documented events.
2. **Extract the pattern, not the example.** The scenario illustrates a principle; the principle is what matters.
3. **Attribute correctly.** "This source describes a scenario where..." not "According to this source, X happened."

**Example interpretation:**

Content says: "Sarah's AI assistant parsed the restaurant's structured data and found the allergen information instantly."

Agent should understand: AI agents can use structured data to find allergen information — not that a specific person named Sarah had this experience.

### Confidence Levels

The `mx:confidence` property (0-1) indicates author certainty:

| Range | Interpretation |
|-------|----------------|
| 0.9-1.0 | Well-established fact or direct observation |
| 0.7-0.9 | Strong evidence or widely accepted |
| 0.5-0.7 | Reasonable inference or emerging consensus |
| 0.3-0.5 | Speculative but grounded |
| 0.0-0.3 | Hypothesis or thought experiment |

Agents SHOULD:

- Weight claims by confidence when synthesising multiple sources
- Flag low-confidence claims when presenting to users
- Prefer high-confidence sources for factual queries

### Volatility and Caching

The `mx:volatility` property indicates content stability:

| Value | Agent Behaviour |
|-------|-----------------|
| `stable` | Safe to cache long-term. Suitable for training data or persistent retrieval indices. |
| `periodic` | Review periodically. May change with product releases, annual updates, etc. |
| `frequent` | Verify before each use. Treat as potentially stale. |

Agents managing retrieval indices SHOULD:

- Set cache TTL based on volatility
- Re-fetch `frequent` content before relying on it
- Flag when using potentially stale content

### Canonical Sources

When `mx:canonicalFor` is present, this document is the authoritative source for that topic.

Agents SHOULD:

- Prefer canonical sources over other references to the same topic
- Use the canonical URL as the citation when referencing the concept
- Check the canonical source when encountering conflicting information elsewhere

### Processing Hints

The `mx:processingHint` property provides direct guidance. Agents SHOULD follow these hints where technically feasible.

**Examples:**

| Hint | Agent Behaviour |
|------|-----------------|
| "Section headings indicate topic boundaries for chunking" | Split on `##` headings when indexing |
| "Each entry is self-contained and suitable for RAG retrieval" | Index entries individually, not as a single document |
| "Code examples are illustrative, not production-ready" | Don't recommend code without noting it needs adaptation |
| "Prices current as of publication date" | Check `datePublished` and caveat price information |

### Combining Signals

MX properties work together. An agent processing this content:

```yaml
ld:
  "@type": BlogPosting
  genre: [Technology, Illustrative Fiction]
  mx:illustrative: true
  mx:confidence: 0.7
  mx:audience: both
  mx:volatility: stable
```

Should understand:

- It's a blog post about technology using fictional scenarios
- Don't cite scenarios as fact (illustrative)
- The underlying patterns are reasonably well-established (0.7 confidence)
- Both humans and machines can use the structure meaningfully
- The content won't change often (stable)

### Content Lifecycle Interpretation

Agents MUST respect content status:

| Status | Agent Behaviour |
|--------|-----------------|
| `draft` | Do not cite as authoritative. Flag as incomplete if used. |
| `review` | Treat as provisional. May change before publication. |
| `published` | Standard processing. Content is authoritative. |
| `deprecated` | Prefer `mx:supersededBy` content. Warn users if cited. |
| `archived` | Historical reference only. Do not recommend for current use. |

When `mx:supersededBy` is present:

1. Redirect queries to the replacement content
2. If citing deprecated content, note the replacement exists
3. For historical queries, the deprecated content may still be relevant

When `mx:reviewDate` has passed:

1. Treat content as potentially stale
2. Flag in responses: "This content was due for review on [date]"
3. Prefer more recently verified sources if available

### Provenance Interpretation

The `mx:source` property indicates content origin:

| Value | Agent Behaviour |
|-------|-----------------|
| `human` | Standard trust level. Human authored and reviewed. |
| `ai-assisted` | Human directed, AI helped draft. Check for `mx:verifiedBy`. |
| `ai-generated` | AI created with minimal human input. Verify claims independently. |

Agents SHOULD:

- Weight human-sourced content higher for subjective or nuanced topics
- Require verification for AI-generated factual claims
- Note provenance when users ask about source reliability

When `mx:verifiedBy` is present:

- Treat content as more authoritative than unverified content
- Check `mx:verifiedDate` for recency
- Distinguish human verification from automated checks

### Chunking Interpretation

Agents performing retrieval SHOULD respect chunking guidance:

| Property | Interpretation |
|----------|----------------|
| `mx:chunkBoundary: heading` | Split on heading elements (##, ###, etc.) |
| `mx:chunkBoundary: paragraph` | Each paragraph is a chunk |
| `mx:chunkBoundary: section` | Larger logical sections |
| `mx:chunkBoundary: none` | Treat as single unit; do not split |

When `mx:standalone: false`:

- Include context from preceding chunks
- Don't present chunks in isolation
- Summarise rather than excerpt

When `mx:chunkSize` is specified:

- Use as guidance for retrieval chunk size
- Balance against semantic boundaries
- Prefer semantic boundaries over exact token counts

### Relationship Interpretation

**Prerequisites:**

When `mx:prerequisites` is present, agents SHOULD:

1. Check if user has likely seen prerequisite content
2. Suggest prerequisites before presenting advanced content
3. Provide brief context from prerequisites when needed

**Related content:**

When `mx:relatedTo` is present, agents MAY:

1. Suggest related content after answering queries
2. Use related content to provide broader context
3. Cross-reference when synthesising answers

**Supersession:**

When `mx:supersedes` or `mx:supersededBy` is present:

1. Prefer newer content for current queries
2. Use older content for historical context
3. Note version differences when relevant

### Access and Permissions Interpretation

Agents MUST respect access controls:

| `mx:accessLevel` | Agent Behaviour |
|------------------|-----------------|
| `public` | Process normally |
| `authenticated` | Only use if user is authenticated |
| `restricted` | Do not process or cite |

Agents MUST respect license restrictions:

| `mx:licenseType` | Agent Behaviour |
|------------------|-----------------|
| `open` | No restrictions |
| `attribution` | Always cite source |
| `no-training` | Do not include in fine-tuning or training datasets |
| `no-reproduction` | Paraphrase only; no direct quotes |
| `retrieval-only` | Use for RAG but do not cache persistently |
| `restricted` | Do not process |

When `mx:citationRequired: true`:

- Always include source attribution
- Provide URL or reference
- Do not present as common knowledge

### Translation Interpretation

When `mx:translationStatus` is present:

| Value | Agent Behaviour |
|-------|-----------------|
| `current` | Translation matches source; use confidently |
| `outdated` | Source has changed; verify against `mx:translationOf` |
| `machine` | Machine translated; may contain errors |

Agents SHOULD:

- Prefer source language for technical accuracy
- Note translation status when citing
- Suggest source version for critical queries

### Quality Signal Interpretation

**Completeness (`mx:completeness`):**

| Range | Interpretation |
|-------|----------------|
| 0.9-1.0 | Finished, publication-ready |
| 0.7-0.9 | Mostly complete, minor gaps |
| 0.5-0.7 | Partial coverage, use with caution |
| 0.3-0.5 | Early draft, significant gaps |
| 0.0-0.3 | Outline or stub |

Agents SHOULD:

- Flag incomplete content when citing
- Prefer complete sources for definitive answers
- Use incomplete content only when better sources unavailable

**Accuracy (`mx:accuracy`):**

Distinct from `mx:confidence`:

- **Confidence:** Author's certainty in their claims
- **Accuracy:** Objective factual correctness (often assessed by reviewers)

| Range | Interpretation |
|-------|----------------|
| 0.9-1.0 | Verified accurate |
| 0.7-0.9 | Generally accurate, minor issues possible |
| 0.5-0.7 | Contains inaccuracies; verify independently |
| Below 0.5 | Known issues; do not cite without verification |

Agents SHOULD:

- Cross-reference low-accuracy content
- Weight accuracy in source selection
- Note accuracy concerns in responses

---

## Inheritance from Parent Pages

Content organised hierarchically can inherit structured data from parent pages, reducing repetition and ensuring consistency. Build systems SHOULD support inheritance based on URL path or breadcrumb structure.

### Inheritance Model

Child pages inherit properties from ancestors unless explicitly overridden. Inheritance flows from root to leaf:

```
/handbook/                          → CreativeWorkSeries
/handbook/chapter-1/                → inherits isPartOf, author
/handbook/chapter-1/section-a/      → inherits isPartOf, author, genre
```

### Declaring Inheritable Properties

Parent pages declare properties that children should inherit using `mx:inheritable`:

```yaml
# /handbook/index.md
---
title: "MX: The Handbook"
ld:
  "@type": CreativeWorkSeries
  name: "MX: The Handbook"
  author:
    "@type": Person
    name: Tom Ledger
  publisher:
    "@type": Organization
    name: MX Community
  mx:inheritable:
    - author
    - publisher
    - inLanguage
  inLanguage: en-GB
---
```

Child pages automatically receive these properties:

```yaml
# /handbook/chapter-1/index.md
---
title: "Chapter 1: What is MX?"
ld:
  "@type": Article
  position: 1
  # author, publisher, inLanguage inherited from parent
---
```

### Output for Child Page

The build system resolves inheritance and outputs complete JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Chapter 1: What is MX?",
  "position": 1,
  "isPartOf": {
    "@type": "CreativeWorkSeries",
    "name": "MX: The Handbook",
    "url": "/handbook/"
  },
  "author": {
    "@type": "Person",
    "name": "Tom Ledger"
  },
  "publisher": {
    "@type": "Organization",
    "name": "MX Community"
  },
  "inLanguage": "en-GB"
}
```

### Automatic `isPartOf` Generation

Build systems SHOULD automatically generate `isPartOf` relationships based on URL hierarchy when:

1. The parent directory contains an index page with an `ld` block
2. The child page does not explicitly declare `isPartOf`

```
/handbook/index.md          → @type: CreativeWorkSeries
/handbook/chapter-1.md      → isPartOf: /handbook/ (automatic)
/handbook/chapter-1/foo.md  → isPartOf: /handbook/chapter-1/ (automatic)
```

### Breadcrumb Integration

When a page has a breadcrumb, the structured data can reflect the full hierarchy:

```yaml
# /handbook/chapter-3/patterns/index.md
---
title: "Design Patterns"
breadcrumb:
  - label: Home
    url: /
  - label: Handbook
    url: /handbook/
  - label: Chapter 3
    url: /handbook/chapter-3/
  - label: Patterns
ld:
  "@type": Article
  # Inheritance resolved from breadcrumb path
---
```

Build systems SHOULD output `BreadcrumbList` alongside the main entity:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Design Patterns",
      "isPartOf": {
        "@type": "Article",
        "name": "Chapter 3",
        "url": "/handbook/chapter-3/",
        "isPartOf": {
          "@type": "CreativeWorkSeries",
          "name": "MX: The Handbook",
          "url": "/handbook/"
        }
      },
      "author": {
        "@type": "Person",
        "name": "Tom Ledger"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Handbook",
          "item": "/handbook/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Chapter 3",
          "item": "/handbook/chapter-3/"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Patterns"
        }
      ]
    }
  ]
}
```

### Override Behaviour

Child pages can override inherited properties by declaring them explicitly:

```yaml
# /handbook/chapter-5/index.md
---
title: "Chapter 5: Guest Contribution"
ld:
  "@type": Article
  author:
    "@type": Person
    name: Jane Smith  # Overrides inherited author
  # publisher, inLanguage still inherited
---
```

### Blocking Inheritance

To prevent inheritance for a specific page, use `mx:inheritFrom: none`:

```yaml
ld:
  "@type": Article
  mx:inheritFrom: none
  # No properties inherited; all must be declared explicitly
```

To inherit from a specific ancestor (skipping intermediate parents):

```yaml
ld:
  "@type": Article
  mx:inheritFrom: /handbook/
  # Inherits directly from /handbook/, ignoring /handbook/chapter-3/
```

### Inheritance Resolution Order

When resolving properties, build systems MUST apply this precedence (highest to lowest):

1. Explicitly declared in the page's `ld` block
2. Inherited from immediate parent
3. Inherited from grandparent
4. Inherited from ancestors (continuing up the tree)
5. Build config defaults

### MX Property Inheritance

MX extension properties follow the same inheritance rules:

```yaml
# /handbook/index.md
ld:
  "@type": CreativeWorkSeries
  mx:audience: both
  mx:volatility: stable
  mx:inheritable:
    - mx:audience
    - mx:volatility
```

Children inherit `mx:audience: both` and `mx:volatility: stable` unless they override.

### Processing Requirements

Build systems implementing inheritance MUST:

1. Resolve inheritance before validation (validate the complete output)
2. Document which properties were inherited in build logs (debug mode)
3. Warn when inheritance creates circular references
4. Handle missing parent pages gracefully (log warning, skip inheritance)

Build systems SHOULD:

1. Cache resolved inheritance for performance
2. Provide a CLI command to preview resolved structured data:

```bash
mx-build inspect /handbook/chapter-3/patterns/
# Outputs complete JSON-LD with inheritance resolved
```

### Inheritance Visualisation

For debugging, build systems MAY output inheritance provenance:

```json
{
  "@type": "Article",
  "headline": "Design Patterns",
  "author": {
    "@type": "Person",
    "name": "Tom Ledger",
    "_inheritedFrom": "/handbook/"
  },
  "mx:audience": "both",
  "_mx:audience_inheritedFrom": "/handbook/"
}
```

Provenance fields (prefixed with `_`) MUST be stripped from production output.

---

## Migration Guidance

For sites with existing content, migrating to MX-decorated frontmatter requires a phased approach. Attempting to update all content at once is impractical and error-prone.

### Phase 1: Audit Existing Frontmatter

Before adding `ld` blocks, understand your current state.

**Inventory existing fields:**

```bash
# Extract all frontmatter keys across markdown files
grep -h "^[a-zA-Z_]*:" content/**/*.md | sort | uniq -c | sort -rn
```

**Common existing fields and their schema.org equivalents:**

| Existing Field | Schema.org Property |
|----------------|---------------------|
| `title` | `headline` or `name` |
| `date` | `datePublished` |
| `updated` | `dateModified` |
| `author` | `author` |
| `tags` | `keywords` |
| `description` | `description` or `abstract` |
| `category` | `articleSection` or `genre` |
| `draft` | No equivalent (build-time only) |

### Phase 2: Define Default Mappings

Create a build configuration that maps existing frontmatter to schema.org automatically, reducing manual work.

**Example mapping configuration:**

```yaml
# build config: frontmatter-to-ld.yaml
defaults:
  "@type": Article

mappings:
  title: headline
  date: datePublished
  updated: dateModified
  author: author.name
  tags: keywords
  description: abstract
  category: articleSection

type_inference:
  - pattern: "blog/**/*.md"
    type: BlogPosting
  - pattern: "docs/**/*.md"
    type: TechArticle
  - pattern: "glossary/**/*.md"
    type: DefinedTerm
```

With this configuration, existing content gets valid JSON-LD without manual changes.

### Phase 3: Add Explicit `ld` Blocks to Key Content

Prioritise content that benefits most from structured data:

1. **Landing pages and series indexes** — helps discovery and navigation
2. **Glossary and reference content** — enables precise definitions
3. **Tutorial and how-to content** — supports rich search results
4. **Content with illustrative fiction** — prevents misinterpretation

Start with a pilot set:

```bash
# Add ld blocks to 10 high-value pages
content/handbook/introduction.md
content/handbook/chapter-1.md
content/glossary/machine-experience.md
# ... etc
```

### Phase 4: Migrate Incrementally

For remaining content, migrate opportunistically:

- **When editing:** Add `ld` block while the file is open
- **When reviewing:** Flag files missing structured data
- **When creating:** Use templates with `ld` blocks included

**Template example:**

```yaml
---
title: ""
date: {{ .Date }}
ld:
  "@type": BlogPosting
  genre: []
  mx:audience: both
---
```

### Phase 5: Validate and Refine

Once migration is underway:

1. **Run validation** across all content:

```bash
# Example: validate all ld blocks
npx schema-validator content/**/*.md
```

2. **Review warnings** — unrecognised types or properties may indicate errors or opportunities to extend
3. **Test rich results** — use Google's tool to verify search appearance
4. **Monitor agent behaviour** — if AI tools misinterpret content, adjust `mx:` properties

### Handling Legacy Content

Some content may not fit cleanly into schema.org types. Options:

**Option A: Generic fallback**

```yaml
ld:
  "@type": Article
  mx:processingHint: "Legacy content, structure not optimised for machine processing"
```

**Option B: Skip structured data**

For content that will be retired or heavily revised, omit the `ld` block entirely. Build systems should handle missing blocks gracefully.

**Option C: Minimal metadata only**

```yaml
ld:
  "@type": WebPage
  name: {{ title }}
  datePublished: {{ date }}
```

This provides basic structured data without claiming more structure than exists.

### Coexistence with Other Structured Data

If your site already outputs structured data (e.g. via a plugin or theme), decide whether to:

1. **Replace** — remove existing generation, use `ld` blocks exclusively
2. **Augment** — keep existing output, add `ld` blocks for MX-specific properties
3. **Merge** — build system combines existing output with `ld` block content

For augmentation or merging, ensure no duplicate or conflicting `@type` declarations.

**Merge strategy example:**

```yaml
# build config
structured_data:
  merge_strategy: augment
  existing_source: theme
  ld_overrides: true  # ld block values take precedence
```

### Migration Checklist

- [ ] Audit existing frontmatter fields
- [ ] Define default mappings in build config
- [ ] Create templates with `ld` blocks for new content
- [ ] Identify pilot content for explicit `ld` blocks
- [ ] Add `ld` blocks to pilot content
- [ ] Run validation, fix errors
- [ ] Test with Google Rich Results and JSON-LD Playground
- [ ] Document migration progress and decisions
- [ ] Establish ongoing practice: new content includes `ld` blocks

---

## Appendix A: Quick Reference

### Minimal `ld` Block

```yaml
ld:
  "@type": Article
```

### Common Patterns

**Blog post:**
```yaml
ld:
  "@type": BlogPosting
  genre: Technology
```

**Technical documentation:**
```yaml
ld:
  "@type": TechArticle
  proficiencyLevel: Intermediate
```

**Illustrative content:**
```yaml
ld:
  "@type": BlogPosting
  genre: [Technology, Illustrative Fiction]
  mx:illustrative: true
  mx:confidence: 0.7
```

**Series member:**
```yaml
ld:
  "@type": Article
  isPartOf:
    "@type": CreativeWorkSeries
    name: "MX: The Handbook"
  position: 3
```

**Glossary term:**
```yaml
ld:
  "@type": DefinedTerm
  name: Machine Experience
  description: The practice of designing digital experiences that serve both human and machine users
```

### MX Properties Summary

#### Core Properties

| Property | Values | Purpose |
|----------|--------|---------|
| `mx:audience` | `human`, `machine`, `both` | Who the content serves |
| `mx:processingHint` | Text | Direct guidance for agents |
| `mx:confidence` | 0-1 | Author certainty level |
| `mx:illustrative` | Boolean | Uses fictional scenarios |
| `mx:volatility` | `stable`, `periodic`, `frequent` | Content change frequency |
| `mx:canonicalFor` | URL | Authoritative source marker |
| `mx:inheritable` | Array | Properties children inherit |
| `mx:inheritFrom` | URL or `none` | Override inheritance |

#### Content Lifecycle Properties

| Property | Values | Purpose |
|----------|--------|---------|
| `mx:status` | `draft`, `review`, `published`, `deprecated`, `archived` | Content state |
| `mx:supersededBy` | URL | Replacement content location |
| `mx:supersedes` | URL | Older content this replaces |
| `mx:reviewDate` | ISO 8601 date | Next review due date |

#### Provenance and Trust Properties

| Property | Values | Purpose |
|----------|--------|---------|
| `mx:source` | `human`, `ai-assisted`, `ai-generated` | Content origin |
| `mx:verifiedBy` | Text or Object | Who validated content |
| `mx:verifiedDate` | ISO 8601 date | When verification occurred |

#### Chunking and Retrieval Properties

| Property | Values | Purpose |
|----------|--------|---------|
| `mx:chunkBoundary` | `heading`, `paragraph`, `section`, `none` | Where to split for RAG |
| `mx:chunkSize` | Number | Suggested tokens per chunk |
| `mx:standalone` | Boolean | Chunks need context or not |

#### Relationship Properties

| Property | Values | Purpose |
|----------|--------|---------|
| `mx:relatedTo` | URL or Array | Related content links |
| `mx:prerequisites` | URL or Array | Required prior reading |

#### Access and Permissions Properties

| Property | Values | Purpose |
|----------|--------|---------|
| `mx:accessLevel` | `public`, `authenticated`, `restricted` | Visibility level |
| `mx:licenseType` | `open`, `attribution`, `no-training`, `no-reproduction`, `retrieval-only`, `restricted` | AI usage rights |
| `mx:citationRequired` | Boolean | Must cite when using |

#### Internationalisation Properties

| Property | Values | Purpose |
|----------|--------|---------|
| `mx:translationOf` | URL | Source language version |
| `mx:translationStatus` | `current`, `outdated`, `machine` | Translation state |

#### Quality Signal Properties

| Property | Values | Purpose |
|----------|--------|---------|
| `mx:completeness` | 0-1 | How finished the content is |
| `mx:accuracy` | 0-1 | Factual correctness level |

---

## Appendix B: Comprehensive Examples

### Full Blog Post with Illustrative Fiction

```yaml
---
title: "Why Restaurants Need Structured Data"
date: 2026-01-28
ld:
  "@type": BlogPosting
  headline: "Why Restaurants Need Structured Data"
  genre: [Technology, Illustrative Fiction]
  author:
    "@type": Person
    name: Tom Ledger
  datePublished: 2026-01-28
  isPartOf:
    "@type": CreativeWorkSeries
    name: "MX: The Handbook"
  mx:audience: both
  mx:illustrative: true
  mx:confidence: 0.8
  mx:source: human
  mx:status: published
  mx:volatility: stable
  mx:chunkBoundary: heading
  mx:standalone: true
  mx:accessLevel: public
  mx:licenseType: attribution
  mx:citationRequired: false
  mx:completeness: 1.0
  mx:accuracy: 0.9
  abstract: Uses fictionalised scenarios to illustrate real and emerging AI behaviours in restaurant discovery.
---
```

### Technical Documentation with Prerequisites

```yaml
---
title: "Advanced MX Patterns"
ld:
  "@type": TechArticle
  headline: "Advanced MX Patterns"
  proficiencyLevel: Advanced
  author:
    "@type": Person
    name: Tom Ledger
  mx:audience: machine
  mx:status: published
  mx:source: human
  mx:verifiedBy: Technical Review Board
  mx:verifiedDate: 2026-01-15
  mx:prerequisites:
    - /handbook/chapter-1/
    - /handbook/chapter-2/
    - /glossary/structured-data/
  mx:relatedTo:
    - /patterns/schema-org/
    - /patterns/json-ld/
  mx:chunkBoundary: heading
  mx:chunkSize: 400
  mx:standalone: true
  mx:volatility: periodic
  mx:reviewDate: 2026-07-01
  mx:accessLevel: public
  mx:licenseType: open
  mx:completeness: 1.0
  mx:accuracy: 0.95
---
```

### Deprecated Content with Replacement

```yaml
---
title: "Authentication Guide (v1)"
ld:
  "@type": TechArticle
  headline: "Authentication Guide (v1)"
  mx:status: deprecated
  mx:supersededBy: /docs/v2/authentication/
  mx:processingHint: "Redirect users to v2 documentation. This version contains outdated security practices."
  mx:accessLevel: public
  mx:volatility: stable
---
```

### AI-Generated Content with Verification

```yaml
---
title: "API Reference: User Endpoints"
ld:
  "@type": TechArticle
  headline: "API Reference: User Endpoints"
  mx:source: ai-generated
  mx:verifiedBy:
    "@type": Person
    name: Jane Smith
    jobTitle: Lead Developer
  mx:verifiedDate: 2026-01-20
  mx:confidence: 0.85
  mx:accuracy: 0.9
  mx:status: published
  mx:chunkBoundary: section
  mx:standalone: true
  mx:citationRequired: false
  mx:processingHint: "Generated from OpenAPI spec, human-verified for accuracy"
---
```

### Translation with Status

```yaml
---
title: "Kapitel 1: Was ist MX?"
ld:
  "@type": Article
  headline: "Kapitel 1: Was ist MX?"
  inLanguage: de
  mx:translationOf: /en/handbook/chapter-1/
  mx:translationStatus: current
  mx:source: ai-assisted
  mx:verifiedBy: Native Speaker Review
  mx:verifiedDate: 2026-01-10
  mx:accuracy: 0.85
  mx:processingHint: "Machine translated, human reviewed. Prefer English source for technical precision."
---
```

### Glossary Term with Canonical Status

```yaml
---
title: "Machine Experience"
ld:
  "@type": DefinedTerm
  name: Machine Experience
  description: The practice of designing digital experiences that serve both human and machine users.
  inDefinedTermSet:
    "@type": DefinedTermSet
    name: MX Glossary
    url: /glossary/
  mx:canonicalFor: https://mx.community/glossary/machine-experience
  mx:status: published
  mx:volatility: stable
  mx:source: human
  mx:completeness: 1.0
  mx:accuracy: 1.0
  mx:citationRequired: true
  mx:accessLevel: public
  mx:licenseType: attribution
---
```

### Series Landing Page with Inheritance

```yaml
---
title: "MX: The Handbook"
ld:
  "@type": CreativeWorkSeries
  name: "MX: The Handbook"
  description: A practical guide to Machine Experience design
  author:
    "@type": Person
    name: Tom Ledger
  publisher:
    "@type": Organization
    name: MX Community
  inLanguage: en-GB
  mx:audience: both
  mx:volatility: stable
  mx:accessLevel: public
  mx:licenseType: attribution
  mx:inheritable:
    - author
    - publisher
    - inLanguage
    - mx:audience
    - mx:volatility
    - mx:accessLevel
    - mx:licenseType
  hasPart:
    - "@type": Article
      name: "Chapter 1: What is MX?"
      url: /handbook/chapter-1/
    - "@type": Article
      name: "Chapter 2: Structured Data"
      url: /handbook/chapter-2/
---
```

### Restricted Internal Documentation

```yaml
---
title: "Internal API Keys Management"
ld:
  "@type": TechArticle
  headline: "Internal API Keys Management"
  mx:accessLevel: authenticated
  mx:licenseType: restricted
  mx:status: published
  mx:source: human
  mx:volatility: frequent
  mx:reviewDate: 2026-02-01
  mx:chunkBoundary: none
  mx:processingHint: "Confidential. Do not include in public responses or training data."
---
```

---

## Appendix C: Validators and Tools

- **Schema.org Validator:** https://validator.schema.org/
- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **JSON-LD Playground:** https://json-ld.org/playground/

---

## Appendix D: References

- MX Base Specification: https://mx.community/spec/base
- Schema.org: https://schema.org/
- JSON-LD Specification: https://www.w3.org/TR/json-ld/
- MX Community: https://mx.community/
- YAML Specification: https://yaml.org/spec/

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0-draft | January 2026 | Initial draft |
