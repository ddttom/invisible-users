---
title: "MX-Compliant CMS Metadata Specification"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Platform-agnostic specification for Machine Experience (MX) compliant content management systems. Defines mandatory metadata requirements across all content lifecycle stages."
keywords: [cms-compliance, metadata-schema, content-lifecycle, mx-certification, ai-agents, platform-agnostic]
ai-instruction: |
  This document defines compliance requirements for MX-certified content management systems.
  The specification is platform-agnostic - it applies to any CMS, database, or file system.
  Use this as a checklist when evaluating or implementing MX-compliant content pipelines.
---

# MX-Compliant CMS Metadata Specification

Platform-agnostic requirements for Machine Experience (MX) certified content management.

## Overview

This specification defines the metadata requirements for any content management system seeking MX compliance certification. The requirements are **platform-agnostic** - they apply equally to:

- Traditional CMS platforms (WordPress, Drupal, Ghost)
- Headless CMS systems (Strapi, Contentful, Sanity)
- Static site generators (Hugo, Jekyll, Eleventy)
- Custom database-backed systems
- File-based content repositories
- AI-assisted content pipelines

**Core Principle:** Metadata is not decoration added after content creation. Metadata drives the content lifecycle from draft to publication, ensuring both humans and AI agents can understand content state, relationships, and context at every stage.

## Content Lifecycle Stages

MX-compliant systems must track content through five distinct stages:

```text
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌───────────┐
│  DRAFT  │ → │  EDIT   │ → │ PREVIEW │ → │  STAGE  │ → │  PUBLISH  │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └───────────┘
     ↑              │              │              │               │
     └──────────────┴──────────────┴──────────────┘               │
            (Content may return to earlier stages)                │
                                                                  ↓
                                                           ┌───────────┐
                                                           │  ARCHIVE  │
                                                           └───────────┘
```

### Stage Definitions

| Stage | Description | Content State | Visibility |
|-------|-------------|---------------|------------|
| **Draft** | Initial creation, incomplete content | Mutable | Author only |
| **Edit** | Active revision by author or editors | Mutable | Author + Editors |
| **Preview** | Review-ready content with rendered output | Frozen for review | Review team |
| **Stage** | Pre-production validation and testing | Frozen for QA | QA + Stakeholders |
| **Publish** | Live on production, accessible to public | Immutable | Public |
| **Archive** | Superseded or outdated, preserved for reference | Immutable | Public (marked) |

## Mandatory Metadata Fields

Every content object in an MX-compliant CMS must contain these fields regardless of storage mechanism.

### Core Identity Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `mx_id` | UUID | Yes | Unique identifier for the content object |
| `mx_version` | Integer | Yes | Version number (increments on each save) |
| `mx_content_type` | Enum | Yes | Type classification (article, blog, product, page, etc.) |
| `mx_title` | String | Yes | Human-readable title |
| `mx_slug` | String | Yes | URL-friendly identifier |

### Lifecycle State Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `mx_state` | Enum | Yes | Current lifecycle stage (draft, edit, preview, stage, published, archived) |
| `mx_created_at` | ISO 8601 | Yes | Initial creation timestamp |
| `mx_modified_at` | ISO 8601 | Yes | Last modification timestamp |
| `mx_state_changed_at` | ISO 8601 | Yes | Timestamp of last state transition |
| `mx_published_at` | ISO 8601 | Conditional | Publication timestamp (required when state = published) |
| `mx_archived_at` | ISO 8601 | Conditional | Archive timestamp (required when state = archived) |

### Attribution Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `mx_author_id` | UUID | Yes | Primary author identifier |
| `mx_author_name` | String | Yes | Human-readable author name |
| `mx_editor_ids` | Array[UUID] | No | List of editor identifiers |
| `mx_reviewer_ids` | Array[UUID] | No | List of reviewer identifiers |

### Discovery Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `mx_description` | String | Yes | Summary for meta description (max 155 chars) |
| `mx_keywords` | Array[String] | Yes | Topic keywords (3-5 recommended) |
| `mx_canonical_url` | URL | Conditional | Canonical URL (required when published) |
| `mx_language` | ISO 639-1 | Yes | Primary language code |

### AI Agent Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `mx_ai_instruction` | String | No | Guidance for AI agents parsing this content |
| `mx_ai_summary` | String | No | AI-generated or AI-optimised summary |
| `mx_schema_type` | String | Yes | Schema.org type (BlogPosting, Article, Product, etc.) |

## Storage Implementation Patterns

### Pattern 1: File-Based Systems (YAML Frontmatter)

For markdown files, static site generators, and file-based CMS:

```yaml
---
mx_id: "550e8400-e29b-41d4-a716-446655440000"
mx_version: 3
mx_content_type: "article"
mx_title: "Understanding AI Agent Behaviour"
mx_slug: "understanding-ai-agent-behaviour"
mx_state: "preview"
mx_created_at: "2026-01-15T09:00:00Z"
mx_modified_at: "2026-01-27T14:30:00Z"
mx_state_changed_at: "2026-01-26T10:00:00Z"
mx_published_at: ""
mx_author_id: "auth-001"
mx_author_name: "Tom Cranstoun"
mx_description: "How AI agents navigate websites and why structured metadata matters"
mx_keywords: [ai-agents, metadata, semantic-html, web-accessibility]
mx_canonical_url: ""
mx_language: "en-GB"
mx_schema_type: "Article"
mx_ai_instruction: "Technical article for web developers. Focus on practical implementation patterns."
---

# Understanding AI Agent Behaviour

Content begins here...
```

### Pattern 2: Relational Database Schema

For SQL-based CMS and custom database systems:

```sql
-- Core content table
CREATE TABLE mx_content (
    mx_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mx_version INTEGER NOT NULL DEFAULT 1,
    mx_content_type VARCHAR(50) NOT NULL,
    mx_title VARCHAR(255) NOT NULL,
    mx_slug VARCHAR(255) NOT NULL UNIQUE,
    mx_state VARCHAR(20) NOT NULL DEFAULT 'draft',
    mx_created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    mx_modified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    mx_state_changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    mx_published_at TIMESTAMP WITH TIME ZONE,
    mx_archived_at TIMESTAMP WITH TIME ZONE,
    mx_author_id UUID NOT NULL,
    mx_author_name VARCHAR(255) NOT NULL,
    mx_description TEXT,
    mx_canonical_url VARCHAR(500),
    mx_language VARCHAR(10) DEFAULT 'en-GB',
    mx_schema_type VARCHAR(50) NOT NULL,
    mx_ai_instruction TEXT,
    mx_ai_summary TEXT,
    content_body TEXT NOT NULL,

    CONSTRAINT valid_state CHECK (mx_state IN ('draft', 'edit', 'preview', 'stage', 'published', 'archived'))
);

-- Keywords junction table
CREATE TABLE mx_content_keywords (
    content_id UUID REFERENCES mx_content(mx_id) ON DELETE CASCADE,
    keyword VARCHAR(100) NOT NULL,
    PRIMARY KEY (content_id, keyword)
);

-- Editors junction table
CREATE TABLE mx_content_editors (
    content_id UUID REFERENCES mx_content(mx_id) ON DELETE CASCADE,
    editor_id UUID NOT NULL,
    PRIMARY KEY (content_id, editor_id)
);

-- State history for audit trail
CREATE TABLE mx_state_history (
    id SERIAL PRIMARY KEY,
    content_id UUID REFERENCES mx_content(mx_id) ON DELETE CASCADE,
    from_state VARCHAR(20),
    to_state VARCHAR(20) NOT NULL,
    changed_by UUID NOT NULL,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reason TEXT
);
```

### Pattern 3: Document Database (JSON/NoSQL)

For MongoDB, CouchDB, Firebase, or document-based CMS:

```json
{
  "_id": "550e8400-e29b-41d4-a716-446655440000",
  "mx_metadata": {
    "mx_id": "550e8400-e29b-41d4-a716-446655440000",
    "mx_version": 3,
    "mx_content_type": "article",
    "mx_title": "Understanding AI Agent Behaviour",
    "mx_slug": "understanding-ai-agent-behaviour",
    "mx_state": "preview",
    "mx_created_at": "2026-01-15T09:00:00Z",
    "mx_modified_at": "2026-01-27T14:30:00Z",
    "mx_state_changed_at": "2026-01-26T10:00:00Z",
    "mx_published_at": null,
    "mx_archived_at": null,
    "mx_author": {
      "mx_author_id": "auth-001",
      "mx_author_name": "Tom Cranstoun"
    },
    "mx_editors": [],
    "mx_reviewers": [],
    "mx_description": "How AI agents navigate websites and why structured metadata matters",
    "mx_keywords": ["ai-agents", "metadata", "semantic-html", "web-accessibility"],
    "mx_canonical_url": null,
    "mx_language": "en-GB",
    "mx_schema_type": "Article",
    "mx_ai_instruction": "Technical article for web developers. Focus on practical implementation patterns.",
    "mx_ai_summary": null
  },
  "content": {
    "body": "# Understanding AI Agent Behaviour\n\nContent begins here...",
    "format": "markdown"
  },
  "state_history": [
    {
      "from_state": null,
      "to_state": "draft",
      "changed_by": "auth-001",
      "changed_at": "2026-01-15T09:00:00Z"
    },
    {
      "from_state": "draft",
      "to_state": "edit",
      "changed_by": "auth-001",
      "changed_at": "2026-01-20T11:00:00Z"
    },
    {
      "from_state": "edit",
      "to_state": "preview",
      "changed_by": "auth-001",
      "changed_at": "2026-01-26T10:00:00Z"
    }
  ]
}
```

### Pattern 4: Key-Value Store Attribute

For systems with flexible metadata attributes (WordPress post_meta, Drupal fields, custom CMS):

```text
Content Object: post_12345

Metadata Attribute: mx_metadata
Value (JSON):
{
  "mx_id": "550e8400-e29b-41d4-a716-446655440000",
  "mx_version": 3,
  "mx_content_type": "article",
  "mx_state": "preview",
  "mx_created_at": "2026-01-15T09:00:00Z",
  "mx_modified_at": "2026-01-27T14:30:00Z",
  "mx_state_changed_at": "2026-01-26T10:00:00Z",
  "mx_published_at": null,
  "mx_author_id": "auth-001",
  "mx_author_name": "Tom Cranstoun",
  "mx_description": "How AI agents navigate websites and why structured metadata matters",
  "mx_keywords": ["ai-agents", "metadata", "semantic-html"],
  "mx_canonical_url": null,
  "mx_language": "en-GB",
  "mx_schema_type": "Article",
  "mx_ai_instruction": "Technical article for web developers."
}
```

**WordPress Example:**

```php
// Store MX metadata
update_post_meta($post_id, 'mx_metadata', json_encode([
    'mx_id' => wp_generate_uuid4(),
    'mx_version' => 1,
    'mx_content_type' => 'article',
    'mx_state' => 'draft',
    'mx_created_at' => current_time('c'),
    'mx_modified_at' => current_time('c'),
    'mx_state_changed_at' => current_time('c'),
    'mx_author_id' => get_current_user_id(),
    'mx_author_name' => wp_get_current_user()->display_name,
    'mx_description' => '',
    'mx_keywords' => [],
    'mx_language' => 'en-GB',
    'mx_schema_type' => 'Article'
]));

// Retrieve MX metadata
$mx_metadata = json_decode(get_post_meta($post_id, 'mx_metadata', true), true);
```

## State Transition Rules

### Valid Transitions

```text
draft → edit
edit → preview
edit → draft (revision needed)
preview → stage
preview → edit (changes requested)
stage → published
stage → preview (QA failed)
published → archived
archived → (terminal state, no transitions)
```

### Transition Requirements

| From | To | Requirements |
|------|----|--------------|
| draft | edit | Content body not empty |
| edit | preview | All mandatory fields populated, mx_description present |
| preview | stage | Preview approved by reviewer, accessibility check passed |
| stage | published | QA sign-off, canonical URL assigned, schema validation passed |
| published | archived | Archive reason documented, archive notice prepared |

### Transition Hooks

MX-compliant systems must support hooks at each transition:

```javascript
// Example transition hook interface
const transitionHooks = {
  'edit→preview': async (content) => {
    // Validate mandatory fields
    validateMandatoryFields(content.mx_metadata);

    // Generate preview render
    await generatePreviewRender(content);

    // Update state timestamp
    content.mx_metadata.mx_state_changed_at = new Date().toISOString();

    return content;
  },

  'stage→published': async (content) => {
    // Assign canonical URL
    content.mx_metadata.mx_canonical_url = generateCanonicalUrl(content);

    // Set publication timestamp
    content.mx_metadata.mx_published_at = new Date().toISOString();

    // Validate Schema.org markup
    await validateSchemaOrg(content);

    // Generate and validate HTML output
    const html = await generatePublishableHtml(content);
    await validateHtml(html);
    await validateAccessibility(html);

    return content;
  }
};
```

## Output Requirements

### HTML Meta Tags

When content reaches the **published** state, the rendered HTML must include:

```html
<head>
  <!-- MX State Metadata -->
  <meta name="mx-state" content="published">
  <meta name="mx-version" content="3">
  <meta name="mx-content-type" content="article">
  <meta name="mx-published-at" content="2026-01-27T15:00:00Z">
  <meta name="mx-modified-at" content="2026-01-27T14:30:00Z">

  <!-- Standard SEO Metadata -->
  <title>Understanding AI Agent Behaviour</title>
  <meta name="description" content="How AI agents navigate websites and why structured metadata matters">
  <meta name="keywords" content="ai-agents, metadata, semantic-html, web-accessibility">
  <meta name="author" content="Tom Cranstoun">
  <link rel="canonical" href="https://example.com/articles/understanding-ai-agent-behaviour">

  <!-- Language -->
  <meta http-equiv="content-language" content="en-GB">

  <!-- Open Graph -->
  <meta property="og:title" content="Understanding AI Agent Behaviour">
  <meta property="og:description" content="How AI agents navigate websites and why structured metadata matters">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://example.com/articles/understanding-ai-agent-behaviour">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Understanding AI Agent Behaviour",
    "description": "How AI agents navigate websites and why structured metadata matters",
    "author": {
      "@type": "Person",
      "name": "Tom Cranstoun"
    },
    "datePublished": "2026-01-27T15:00:00Z",
    "dateModified": "2026-01-27T14:30:00Z",
    "keywords": "ai-agents, metadata, semantic-html, web-accessibility",
    "inLanguage": "en-GB"
  }
  </script>
</head>
```

### WCAG 2.1 AA Compliance

All published content must meet WCAG 2.1 AA standards:

- **Contrast:** 4.5:1 minimum for normal text, 3:1 for large text
- **Semantic Structure:** Proper heading hierarchy (H1 → H2 → H3, no skipping)
- **ARIA Landmarks:** header, nav, main, footer with appropriate roles
- **Link Purpose:** Clear from link text alone
- **Image Alt Text:** Descriptive alt attributes on all images

## Compliance Verification Checklist

### Metadata Completeness

- [ ] All mandatory fields present in content objects
- [ ] mx_state accurately reflects current lifecycle position
- [ ] Timestamps use ISO 8601 format with timezone
- [ ] UUID format validated for all ID fields
- [ ] Keywords array contains 3-5 relevant terms

### State Management

- [ ] State transitions follow valid paths
- [ ] State history maintained for audit trail
- [ ] Transition hooks execute validation logic
- [ ] Published state requires canonical URL
- [ ] Archive state requires archive timestamp

### Output Quality

- [ ] HTML includes MX meta tags
- [ ] Schema.org JSON-LD validates
- [ ] WCAG 2.1 AA compliance verified
- [ ] Canonical URLs resolve correctly
- [ ] Open Graph metadata complete

### API Compliance (if applicable)

- [ ] Content API returns mx_metadata object
- [ ] State transitions available via API
- [ ] Bulk operations preserve metadata integrity
- [ ] Version conflicts handled gracefully

## Certification Levels

### Level 1: MX Basic

- All mandatory metadata fields implemented
- State tracking (minimum: draft → published)
- HTML output includes basic MX meta tags

### Level 2: MX Standard

- Full five-stage lifecycle implemented
- State transition validation
- WCAG 2.1 AA compliance
- Schema.org JSON-LD output
- Audit trail for state changes

### Level 3: MX Advanced

- AI agent instruction fields
- Automated accessibility validation
- Content API with full MX metadata
- Real-time state synchronisation
- Multi-language support with proper language codes

## Implementation Guidance

### Retrofitting Existing Systems

For systems with existing content:

1. **Audit current metadata** - Identify what fields already exist
2. **Create mx_metadata attribute** - Add storage for MX fields
3. **Migrate existing data** - Map existing fields to MX equivalents
4. **Backfill missing fields** - Generate mx_id, set initial state
5. **Implement state tracking** - Add hooks for future transitions
6. **Update output templates** - Add MX meta tags to rendered HTML

### Greenfield Implementation

For new systems:

1. **Design schema first** - Include MX fields from the start
2. **Build state machine** - Implement transition logic early
3. **Create validation layer** - Enforce field requirements
4. **Test with AI agents** - Verify metadata accessibility
5. **Document API contracts** - Ensure consistent metadata exposure

## Related Documentation

- **Appendix P - Blog Generation Workflow** - Practical implementation example
- **Appendix D - AI-Friendly HTML Guide** - HTML output patterns
- **Chapter 10 - Metadata and Structured Data** - Conceptual foundations
- **Blog Metadata Schema** - Detailed field specifications

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-27 | Initial specification |
