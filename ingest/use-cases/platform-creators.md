---
title: "MX Compliance for Platform Creators"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Guide for platform creators (SaaS, e-commerce, app builders) on implementing MX compliance for AI agent interoperability."
keywords: [platform-creators, mx-compliance, saas, e-commerce, api-design, ai-agents]
audience: "Platform Creators"
ai-instruction: |
  This document is written for creators of SaaS platforms, e-commerce systems, app builders,
  and similar products. Focus on architecture decisions, API design, and enabling end-users
  to create MX-compliant content.
---

# MX Compliance for Platform Creators

A technical guide for SaaS and platform builders.

## Executive Summary

**The Opportunity:** Platforms that enable MX-compliant output attract businesses seeking AI-readiness. Your platform becomes infrastructure for the AI-agent era.

**The Architecture:** MX compliance requires metadata-first design, explicit state management, and structured output - principles that also improve API design and accessibility.

**The Moat:** Platforms with native MX support create ecosystem lock-in through content investment and workflow integration.

## What "Platform Creator" Means

This guide is for builders of:

- **E-commerce platforms** (Shopify-like, marketplace builders)
- **Website builders** (Squarespace-like, no-code tools)
- **SaaS applications** (any software with user-generated content)
- **App builders** (mobile app platforms, PWA generators)
- **Documentation platforms** (API docs, knowledge bases)
- **Marketing platforms** (landing page builders, email tools)

## Why MX Compliance is Platform Infrastructure

### The Shift in Value

```text
Web 1.0: Platform value = reach (eyeballs)
Web 2.0: Platform value = engagement (interactions)
AI Era: Platform value = interoperability (agent access)
```

Platforms that enable AI agent interaction become more valuable.

### Customer Demand Curve

```text
2024: "Can I export my data?"
2025: "Can AI agents read my content?"
2026: "Is your platform AI-agent compatible?"
2027: "We only use MX-compliant platforms"
```

Early implementation positions your platform ahead of this curve.

## Architecture Principles

### 1. Metadata-First Design

Every content object should have metadata as a first-class concern, not an afterthought.

**Anti-pattern:**
```javascript
// Metadata bolted on
const product = {
  name: "Widget",
  price: 29.99,
  // No structured metadata
};
```

**MX Pattern:**
```javascript
// Metadata-first
const product = {
  mx_metadata: {
    mx_id: "uuid",
    mx_version: 1,
    mx_content_type: "product",
    mx_state: "published",
    mx_description: "High-quality widget for professional use",
    mx_keywords: ["widget", "tool", "professional"],
    mx_schema_type: "Product"
  },
  content: {
    name: "Widget",
    price: 29.99
  }
};
```

### 2. Explicit State Management

All content must have explicit, machine-readable state.

```javascript
// State machine for content lifecycle
const validTransitions = {
  draft: ['edit', 'deleted'],
  edit: ['preview', 'draft'],
  preview: ['stage', 'edit'],
  stage: ['published', 'preview'],
  published: ['archived'],
  archived: [] // Terminal state
};

function transitionState(content, newState) {
  const currentState = content.mx_metadata.mx_state;
  if (!validTransitions[currentState].includes(newState)) {
    throw new Error(`Invalid transition: ${currentState} → ${newState}`);
  }
  content.mx_metadata.mx_state = newState;
  content.mx_metadata.mx_state_changed_at = new Date().toISOString();
  return content;
}
```

### 3. Structured Output

Platform output must be machine-parseable.

**API Response:**
```json
{
  "data": {
    "product": { /* content */ }
  },
  "mx_metadata": {
    "mx_compliant": true,
    "mx_version": "1.0",
    "mx_content_type": "product",
    "mx_state": "published"
  },
  "schema_org": {
    "@context": "https://schema.org",
    "@type": "Product",
    /* structured data */
  }
}
```

**HTML Output:**
```html
<head>
  <meta name="mx-compliant" content="true">
  <meta name="mx-version" content="1.0">
  <meta name="mx-content-type" content="product">
  <script type="application/ld+json">/* Schema.org */</script>
</head>
```

## Implementation by Platform Type

### E-commerce Platforms

**Product Schema:**
```javascript
const productSchema = {
  mx_metadata: {
    mx_id: String,          // UUID
    mx_version: Number,
    mx_content_type: 'product',
    mx_state: Enum,         // draft, published, archived
    mx_description: String, // Max 155 chars
    mx_keywords: [String],  // Product tags
    mx_schema_type: 'Product'
  },
  content: {
    name: String,
    description: String,
    price: Number,
    currency: String,
    sku: String,
    availability: Enum,
    images: [Image]
  }
};
```

**Required Schema.org Output:**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "description": "Product description",
  "sku": "SKU123",
  "offers": {
    "@type": "Offer",
    "price": "29.99",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock"
  }
}
```

### Website Builders

**Page Schema:**
```javascript
const pageSchema = {
  mx_metadata: {
    mx_id: String,
    mx_version: Number,
    mx_content_type: Enum,  // landing, about, contact, etc.
    mx_state: Enum,
    mx_description: String,
    mx_keywords: [String],
    mx_ai_instruction: String,
    mx_schema_type: String
  },
  content: {
    title: String,
    sections: [Section],
    seo: {
      title: String,
      description: String,
      canonical: String
    }
  }
};
```

**Template Requirements:**
- Semantic HTML with ARIA landmarks
- Automatic heading hierarchy enforcement
- Schema.org injection based on page type
- WCAG 2.1 AA compliant themes only

### Documentation Platforms

**Article Schema:**
```javascript
const articleSchema = {
  mx_metadata: {
    mx_id: String,
    mx_version: Number,
    mx_content_type: 'documentation',
    mx_state: Enum,
    mx_description: String,
    mx_keywords: [String],
    mx_ai_instruction: String,  // Important for docs
    mx_schema_type: 'TechArticle'
  },
  content: {
    title: String,
    body: Markdown,
    code_examples: [CodeBlock],
    related: [Reference]
  }
};
```

**AI Instruction Defaults:**
```javascript
const defaultAiInstructions = {
  'api-reference': 'Technical API documentation. Code examples are production-ready.',
  'tutorial': 'Step-by-step guide. Follow instructions in order.',
  'concept': 'Conceptual explanation. Use for understanding, not implementation.',
  'troubleshooting': 'Problem-solution pairs. Match symptoms to solutions.'
};
```

## User Interface Patterns

### MX Metadata Panel

Provide a consistent metadata UI across content types:

```text
┌─────────────────────────────────────────┐
│ MX Metadata                        [▼]  │
├─────────────────────────────────────────┤
│ Description (SEO)                       │
│ ┌─────────────────────────────────────┐ │
│ │ Brief summary of this content...    │ │
│ └─────────────────────────────────────┘ │
│                               142/155   │
│                                         │
│ Keywords                                │
│ ┌─────────────────────────────────────┐ │
│ │ [keyword1] [keyword2] [+]           │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ AI Instructions (optional)              │
│ ┌─────────────────────────────────────┐ │
│ │ Guidance for AI agents...           │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Schema Type: [Article        ▼]         │
│                                         │
│ State: ● Draft ○ Published ○ Archived   │
└─────────────────────────────────────────┘
```

### Compliance Indicator

Show real-time compliance status:

```text
┌─────────────────────────────────────────┐
│ MX Compliance                     [72%] │
├─────────────────────────────────────────┤
│ ✓ Description present                   │
│ ✓ Keywords added                        │
│ ✗ AI instruction missing                │
│ ✓ Schema.org valid                      │
│ ✗ Image alt text missing (2 images)     │
└─────────────────────────────────────────┘
```

### Publish Gate

Enforce compliance before publishing:

```text
┌─────────────────────────────────────────┐
│         Ready to Publish?               │
├─────────────────────────────────────────┤
│                                         │
│ MX Compliance: 85% (Standard)           │
│                                         │
│ ⚠ Missing:                              │
│   • AI instruction (recommended)        │
│                                         │
│ [Publish Anyway]  [Complete MX First]   │
│                                         │
└─────────────────────────────────────────┘
```

## API Design for MX

### Content API Endpoints

```text
GET /api/content/:id
Response includes mx_metadata object

POST /api/content
Request must include mx_metadata (validated)

PATCH /api/content/:id
Can update mx_metadata fields

POST /api/content/:id/transition
State transition endpoint with validation
```

### MX-Specific Endpoints

```text
GET /api/content/:id/mx-compliance
Returns compliance score and issues

GET /api/content/:id/schema-org
Returns generated Schema.org JSON-LD

POST /api/content/bulk-mx-audit
Audit multiple content items
```

### Webhook Events

```javascript
// State transition webhook
{
  "event": "mx.state.changed",
  "content_id": "uuid",
  "from_state": "preview",
  "to_state": "published",
  "mx_metadata": { /* full metadata */ },
  "timestamp": "2026-01-27T15:00:00Z"
}

// Compliance change webhook
{
  "event": "mx.compliance.changed",
  "content_id": "uuid",
  "previous_score": 72,
  "current_score": 95,
  "changes": ["description_added", "alt_text_added"],
  "timestamp": "2026-01-27T15:00:00Z"
}
```

## Testing and Validation

### Unit Tests for MX

```javascript
describe('MX Metadata', () => {
  it('requires mandatory fields', () => {
    const content = createContent({});
    expect(content.mx_metadata.mx_id).toBeDefined();
    expect(content.mx_metadata.mx_state).toBe('draft');
  });

  it('validates state transitions', () => {
    const content = createContent({ mx_state: 'draft' });
    expect(() => transitionState(content, 'published')).toThrow();
    expect(() => transitionState(content, 'edit')).not.toThrow();
  });

  it('generates valid Schema.org', () => {
    const content = createProduct({ name: 'Widget', price: 29.99 });
    const schemaOrg = generateSchemaOrg(content);
    expect(schemaOrg['@type']).toBe('Product');
    expect(schemaOrg.offers.price).toBe('29.99');
  });
});
```

### Integration Tests

```javascript
describe('MX Compliant Output', () => {
  it('includes MX meta tags in HTML', async () => {
    const html = await renderPage(publishedContent);
    expect(html).toContain('meta name="mx-compliant"');
    expect(html).toContain('meta name="mx-content-type"');
  });

  it('includes valid Schema.org JSON-LD', async () => {
    const html = await renderPage(publishedContent);
    const jsonLd = extractJsonLd(html);
    expect(jsonLd['@context']).toBe('https://schema.org');
    await expect(validateSchemaOrg(jsonLd)).resolves.toBe(true);
  });
});
```

## Migration Strategy

### For Existing Platforms

**Phase 1: Add Metadata Infrastructure**
- Add mx_metadata field to content schema
- Backfill with sensible defaults
- No user-facing changes yet

**Phase 2: Expose in UI**
- Add MX metadata panel
- Show compliance indicator
- Optional enforcement

**Phase 3: Enforce Compliance**
- Require minimum compliance for publish
- Add validation to API
- Migrate existing content

**Phase 4: Advanced Features**
- AI instruction templates
- Bulk compliance tools
- Analytics and reporting

## Success Metrics

### Platform Metrics

- MX metadata completion rate
- Average compliance score
- State transition patterns
- Schema.org validation pass rate

### Business Metrics

- Customer adoption of MX features
- Conversion impact of MX messaging
- Support ticket reduction (structured content)
- API usage patterns

## Next Steps

1. **Audit current architecture** - Identify metadata gaps
2. **Design MX schema** - Define platform-specific MX fields
3. **Build metadata infrastructure** - Database and API changes
4. **Create UI components** - Reusable MX editing interface
5. **Implement output generation** - HTML and API responses
6. **Test with AI agents** - Validate real-world compatibility

## Related Documentation

- [CMS Compliance Specification](../../docs/structure/cms-compliance.md) ("MX-Compliant CMS Metadata Specification" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/cms-compliance.md>) - Storage requirements
- [Webpage Compliance](../../docs/structure/mx-compliance.md) ("MX-Compliant Webpage Specification" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/mx-compliance.md>) - Output requirements
- [JavaScript Compliance](../../docs/structure/mx-compliance-javascript.md) ("MX-Compliant JavaScript Specification" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/mx-compliance-javascript.md>) - Code patterns
- [CLAUDE.md](../../CLAUDE.md) ("CLAUDE.md" at <https://github.com/ddttom/invisible-users/blob/main/CLAUDE.md>) - MX concepts overview
