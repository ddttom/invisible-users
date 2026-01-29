---
title: "MX Compliance for Developers"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Technical implementation guide for developers building MX-compliant systems, APIs, and user interfaces."
keywords: [developers, mx-compliance, implementation, api, javascript, html, accessibility]
audience: "Developers"
ai-instruction: |
  This document is written for software developers implementing MX compliance.
  Focus on code examples, API patterns, data structures, and practical implementation
  details across different technology stacks.
---

# MX Compliance for Developers

A technical implementation guide.

## Quick Start

### Minimum Viable MX

The smallest change that makes content MX-compliant:

**HTML Head:**
```html
<head>
  <meta name="mx-compliant" content="true">
  <meta name="mx-version" content="1.0">
  <meta name="mx-content-type" content="article">
  <meta name="mx-state" content="published">
  <meta name="description" content="Page description here">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Page Title",
    "description": "Page description here",
    "datePublished": "2026-01-27T15:00:00Z"
  }
  </script>
</head>
```

**That's it.** Everything else builds on this foundation.

## Data Structures

### MX Metadata Object

```typescript
interface MXMetadata {
  // Required
  mx_id: string;           // UUID
  mx_version: number;      // Increments on save
  mx_content_type: MXContentType;
  mx_state: MXState;
  mx_created_at: string;   // ISO 8601
  mx_modified_at: string;  // ISO 8601
  mx_description: string;  // Max 155 chars
  mx_keywords: string[];   // 3-5 keywords

  // Conditional (required when published)
  mx_published_at?: string;
  mx_canonical_url?: string;

  // Optional
  mx_ai_instruction?: string;
  mx_schema_type?: string;
  mx_author_id?: string;
  mx_author_name?: string;
}

type MXContentType =
  | 'article' | 'product' | 'service' | 'landing'
  | 'documentation' | 'reference' | 'contact'
  | 'about' | 'legal' | 'navigation';

type MXState =
  | 'draft' | 'edit' | 'preview'
  | 'stage' | 'published' | 'archived';
```

### Content Object

```typescript
interface MXContent<T = unknown> {
  mx_metadata: MXMetadata;
  content: T;
}

// Example: Article
interface Article {
  title: string;
  body: string;
  author: Author;
  tags: string[];
}

const article: MXContent<Article> = {
  mx_metadata: {
    mx_id: crypto.randomUUID(),
    mx_version: 1,
    mx_content_type: 'article',
    mx_state: 'draft',
    mx_created_at: new Date().toISOString(),
    mx_modified_at: new Date().toISOString(),
    mx_description: 'Article about MX compliance',
    mx_keywords: ['mx', 'compliance', 'ai-agents']
  },
  content: {
    title: 'Understanding MX Compliance',
    body: '...',
    author: { name: 'Developer', id: 'dev-1' },
    tags: ['technical', 'guide']
  }
};
```

## State Management

### State Machine

```typescript
const MX_STATE_TRANSITIONS: Record<MXState, MXState[]> = {
  draft: ['edit', 'deleted'],
  edit: ['preview', 'draft'],
  preview: ['stage', 'edit'],
  stage: ['published', 'preview'],
  published: ['archived'],
  archived: []
};

function canTransition(from: MXState, to: MXState): boolean {
  return MX_STATE_TRANSITIONS[from]?.includes(to) ?? false;
}

function transitionState(
  content: MXContent,
  newState: MXState
): MXContent {
  const currentState = content.mx_metadata.mx_state;

  if (!canTransition(currentState, newState)) {
    throw new Error(
      `Invalid state transition: ${currentState} → ${newState}`
    );
  }

  return {
    ...content,
    mx_metadata: {
      ...content.mx_metadata,
      mx_state: newState,
      mx_modified_at: new Date().toISOString(),
      mx_version: content.mx_metadata.mx_version + 1,
      // Add published timestamp if transitioning to published
      ...(newState === 'published' && {
        mx_published_at: new Date().toISOString()
      })
    }
  };
}
```

### State Transition Hooks

```typescript
type TransitionHook = (
  content: MXContent,
  from: MXState,
  to: MXState
) => Promise<void> | void;

const transitionHooks: Record<string, TransitionHook[]> = {
  'edit→preview': [
    validateRequiredFields,
    generatePreview
  ],
  'preview→stage': [
    validateAccessibility,
    notifyReviewers
  ],
  'stage→published': [
    validateSchemaOrg,
    assignCanonicalUrl,
    invalidateCache
  ]
};

async function executeTransition(
  content: MXContent,
  newState: MXState
): Promise<MXContent> {
  const from = content.mx_metadata.mx_state;
  const hookKey = `${from}→${newState}`;

  const hooks = transitionHooks[hookKey] ?? [];
  for (const hook of hooks) {
    await hook(content, from, newState);
  }

  return transitionState(content, newState);
}
```

## HTML Generation

### Meta Tags

```typescript
function generateMXMetaTags(metadata: MXMetadata): string {
  const tags = [
    `<meta name="mx-compliant" content="true">`,
    `<meta name="mx-version" content="1.0">`,
    `<meta name="mx-content-type" content="${metadata.mx_content_type}">`,
    `<meta name="mx-state" content="${metadata.mx_state}">`,
    `<meta name="mx-modified-at" content="${metadata.mx_modified_at}">`,
    `<meta name="description" content="${escapeHtml(metadata.mx_description)}">`,
    `<meta name="keywords" content="${metadata.mx_keywords.join(', ')}">`
  ];

  if (metadata.mx_published_at) {
    tags.push(
      `<meta name="mx-published-at" content="${metadata.mx_published_at}">`
    );
  }

  if (metadata.mx_canonical_url) {
    tags.push(
      `<link rel="canonical" href="${metadata.mx_canonical_url}">`
    );
  }

  return tags.join('\n  ');
}
```

### Schema.org JSON-LD

```typescript
interface SchemaOrgConfig {
  type: string;
  additionalFields?: Record<string, unknown>;
}

function generateSchemaOrg(
  content: MXContent,
  config: SchemaOrgConfig
): string {
  const { mx_metadata } = content;

  const schema = {
    '@context': 'https://schema.org',
    '@type': config.type,
    'headline': content.content.title,
    'description': mx_metadata.mx_description,
    'dateModified': mx_metadata.mx_modified_at,
    ...(mx_metadata.mx_published_at && {
      'datePublished': mx_metadata.mx_published_at
    }),
    ...(mx_metadata.mx_author_name && {
      'author': {
        '@type': 'Person',
        'name': mx_metadata.mx_author_name
      }
    }),
    'keywords': mx_metadata.mx_keywords.join(', '),
    'inLanguage': 'en-GB',
    ...config.additionalFields
  };

  return `<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>`;
}
```

### Complete Head Section

```typescript
function generateMXHead(
  content: MXContent,
  schemaConfig: SchemaOrgConfig
): string {
  const { mx_metadata } = content;

  return `
  <!-- MX Compliance Meta Tags -->
  ${generateMXMetaTags(mx_metadata)}

  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(content.content.title)}">
  <meta property="og:description" content="${escapeHtml(mx_metadata.mx_description)}">
  <meta property="og:type" content="article">
  ${mx_metadata.mx_canonical_url
    ? `<meta property="og:url" content="${mx_metadata.mx_canonical_url}">`
    : ''}

  <!-- Schema.org -->
  ${generateSchemaOrg(content, schemaConfig)}
  `;
}
```

## API Design

### RESTful Endpoints

```typescript
// Express.js example
import express from 'express';

const router = express.Router();

// Get content with MX metadata
router.get('/content/:id', async (req, res) => {
  const content = await getContent(req.params.id);
  res.json({
    data: content,
    mx_metadata: content.mx_metadata
  });
});

// Create content with MX metadata
router.post('/content', async (req, res) => {
  const { content, mx_metadata } = req.body;

  // Validate MX metadata
  const validation = validateMXMetadata(mx_metadata);
  if (!validation.valid) {
    return res.status(400).json({ errors: validation.errors });
  }

  const created = await createContent({ content, mx_metadata });
  res.status(201).json(created);
});

// Transition state
router.post('/content/:id/transition', async (req, res) => {
  const { newState } = req.body;
  const content = await getContent(req.params.id);

  try {
    const updated = await executeTransition(content, newState);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get MX compliance score
router.get('/content/:id/mx-compliance', async (req, res) => {
  const content = await getContent(req.params.id);
  const score = calculateComplianceScore(content);
  res.json(score);
});
```

### Response Format

```json
{
  "data": {
    "id": "content-123",
    "title": "Article Title",
    "body": "..."
  },
  "mx_metadata": {
    "mx_id": "uuid",
    "mx_version": 3,
    "mx_content_type": "article",
    "mx_state": "published",
    "mx_created_at": "2026-01-01T10:00:00Z",
    "mx_modified_at": "2026-01-27T15:00:00Z",
    "mx_published_at": "2026-01-27T15:00:00Z",
    "mx_description": "Article description",
    "mx_keywords": ["keyword1", "keyword2"],
    "mx_canonical_url": "https://example.com/article"
  },
  "mx_compliance": {
    "score": 95,
    "level": "standard",
    "issues": []
  }
}
```

## Validation

### Schema Validation (Zod)

```typescript
import { z } from 'zod';

const MXMetadataSchema = z.object({
  mx_id: z.string().uuid(),
  mx_version: z.number().int().positive(),
  mx_content_type: z.enum([
    'article', 'product', 'service', 'landing',
    'documentation', 'reference', 'contact',
    'about', 'legal', 'navigation'
  ]),
  mx_state: z.enum([
    'draft', 'edit', 'preview', 'stage', 'published', 'archived'
  ]),
  mx_created_at: z.string().datetime(),
  mx_modified_at: z.string().datetime(),
  mx_description: z.string().max(155),
  mx_keywords: z.array(z.string()).min(1).max(10),
  mx_published_at: z.string().datetime().optional(),
  mx_canonical_url: z.string().url().optional(),
  mx_ai_instruction: z.string().optional(),
  mx_schema_type: z.string().optional(),
  mx_author_id: z.string().optional(),
  mx_author_name: z.string().optional()
});

function validateMXMetadata(data: unknown) {
  return MXMetadataSchema.safeParse(data);
}
```

### Compliance Scoring

```typescript
interface ComplianceResult {
  score: number;
  level: 'basic' | 'standard' | 'advanced';
  issues: ComplianceIssue[];
}

interface ComplianceIssue {
  field: string;
  severity: 'error' | 'warning';
  message: string;
}

function calculateComplianceScore(content: MXContent): ComplianceResult {
  const issues: ComplianceIssue[] = [];
  let score = 100;

  const { mx_metadata } = content;

  // Required field checks
  if (!mx_metadata.mx_description) {
    issues.push({
      field: 'mx_description',
      severity: 'error',
      message: 'Description is required'
    });
    score -= 20;
  } else if (mx_metadata.mx_description.length > 155) {
    issues.push({
      field: 'mx_description',
      severity: 'warning',
      message: 'Description exceeds 155 characters'
    });
    score -= 5;
  }

  if (mx_metadata.mx_keywords.length < 3) {
    issues.push({
      field: 'mx_keywords',
      severity: 'warning',
      message: 'At least 3 keywords recommended'
    });
    score -= 5;
  }

  // Optional but recommended
  if (!mx_metadata.mx_ai_instruction) {
    issues.push({
      field: 'mx_ai_instruction',
      severity: 'warning',
      message: 'AI instruction recommended'
    });
    score -= 5;
  }

  // Published state requirements
  if (mx_metadata.mx_state === 'published') {
    if (!mx_metadata.mx_canonical_url) {
      issues.push({
        field: 'mx_canonical_url',
        severity: 'error',
        message: 'Canonical URL required for published content'
      });
      score -= 15;
    }
  }

  const level = score >= 90 ? 'advanced'
    : score >= 70 ? 'standard'
    : 'basic';

  return { score: Math.max(0, score), level, issues };
}
```

## Framework Integration

### React Component

```tsx
import { useMXMetadata } from './hooks/useMXMetadata';

interface MXMetadataPanelProps {
  contentId: string;
  onChange: (metadata: MXMetadata) => void;
}

export function MXMetadataPanel({ contentId, onChange }: MXMetadataPanelProps) {
  const { metadata, compliance, updateField } = useMXMetadata(contentId);

  return (
    <div className="mx-metadata-panel">
      <header>
        <h3>MX Metadata</h3>
        <ComplianceBadge score={compliance.score} level={compliance.level} />
      </header>

      <div className="field">
        <label htmlFor="mx-description">
          Description
          <span className="char-count">
            {metadata.mx_description?.length ?? 0}/155
          </span>
        </label>
        <textarea
          id="mx-description"
          value={metadata.mx_description ?? ''}
          onChange={(e) => updateField('mx_description', e.target.value)}
          maxLength={155}
          aria-describedby="desc-help"
        />
        <small id="desc-help">
          Brief summary for search results and AI agents
        </small>
      </div>

      <div className="field">
        <label htmlFor="mx-keywords">Keywords</label>
        <TagInput
          id="mx-keywords"
          value={metadata.mx_keywords ?? []}
          onChange={(tags) => updateField('mx_keywords', tags)}
          max={10}
        />
      </div>

      <div className="field">
        <label htmlFor="mx-ai-instruction">AI Instructions (optional)</label>
        <textarea
          id="mx-ai-instruction"
          value={metadata.mx_ai_instruction ?? ''}
          onChange={(e) => updateField('mx_ai_instruction', e.target.value)}
          aria-describedby="ai-help"
        />
        <small id="ai-help">
          Guidance for AI agents parsing this content
        </small>
      </div>

      <div className="field">
        <label htmlFor="mx-state">State</label>
        <StateSelector
          id="mx-state"
          value={metadata.mx_state}
          onChange={(state) => updateField('mx_state', state)}
          currentState={metadata.mx_state}
        />
      </div>

      {compliance.issues.length > 0 && (
        <ComplianceIssues issues={compliance.issues} />
      )}
    </div>
  );
}
```

### Vue Component

```vue
<template>
  <div class="mx-metadata-panel">
    <header>
      <h3>MX Metadata</h3>
      <compliance-badge :score="compliance.score" :level="compliance.level" />
    </header>

    <div class="field">
      <label for="mx-description">
        Description
        <span class="char-count">{{ metadata.mx_description?.length ?? 0 }}/155</span>
      </label>
      <textarea
        id="mx-description"
        v-model="metadata.mx_description"
        maxlength="155"
      />
    </div>

    <div class="field">
      <label for="mx-keywords">Keywords</label>
      <tag-input
        id="mx-keywords"
        v-model="metadata.mx_keywords"
        :max="10"
      />
    </div>

    <div class="field">
      <label for="mx-state">State</label>
      <state-selector
        id="mx-state"
        v-model="metadata.mx_state"
        :current-state="metadata.mx_state"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMXMetadata } from '@/composables/useMXMetadata';

const props = defineProps<{ contentId: string }>();
const { metadata, compliance } = useMXMetadata(props.contentId);
</script>
```

## Testing

### Unit Tests

```typescript
import { describe, it, expect } from 'vitest';

describe('MX State Machine', () => {
  it('allows valid transitions', () => {
    expect(canTransition('draft', 'edit')).toBe(true);
    expect(canTransition('edit', 'preview')).toBe(true);
    expect(canTransition('stage', 'published')).toBe(true);
  });

  it('blocks invalid transitions', () => {
    expect(canTransition('draft', 'published')).toBe(false);
    expect(canTransition('published', 'draft')).toBe(false);
    expect(canTransition('archived', 'published')).toBe(false);
  });

  it('updates metadata on transition', () => {
    const content = createTestContent({ mx_state: 'draft' });
    const updated = transitionState(content, 'edit');

    expect(updated.mx_metadata.mx_state).toBe('edit');
    expect(updated.mx_metadata.mx_version).toBe(2);
  });
});

describe('MX Compliance Scoring', () => {
  it('scores complete metadata highly', () => {
    const content = createTestContent({
      mx_description: 'Valid description',
      mx_keywords: ['one', 'two', 'three'],
      mx_ai_instruction: 'AI guidance here'
    });

    const result = calculateComplianceScore(content);
    expect(result.score).toBeGreaterThanOrEqual(90);
    expect(result.level).toBe('advanced');
  });

  it('penalises missing required fields', () => {
    const content = createTestContent({
      mx_description: '',
      mx_keywords: []
    });

    const result = calculateComplianceScore(content);
    expect(result.score).toBeLessThan(70);
    expect(result.issues.some(i => i.severity === 'error')).toBe(true);
  });
});
```

### Integration Tests

```typescript
describe('MX API Endpoints', () => {
  it('returns MX metadata with content', async () => {
    const response = await request(app)
      .get('/api/content/123')
      .expect(200);

    expect(response.body.mx_metadata).toBeDefined();
    expect(response.body.mx_metadata.mx_compliant).toBe(true);
  });

  it('validates MX metadata on create', async () => {
    const response = await request(app)
      .post('/api/content')
      .send({
        content: { title: 'Test' },
        mx_metadata: { /* missing required fields */ }
      })
      .expect(400);

    expect(response.body.errors).toContain('mx_description is required');
  });

  it('enforces state transition rules', async () => {
    // Create draft content
    const created = await createContent({ mx_state: 'draft' });

    // Try invalid transition
    const response = await request(app)
      .post(`/api/content/${created.id}/transition`)
      .send({ newState: 'published' })
      .expect(400);

    expect(response.body.error).toContain('Invalid state transition');
  });
});
```

## CLI Tools

### MX Validation CLI

```typescript
#!/usr/bin/env node
import { program } from 'commander';
import { validateMXFile, formatResults } from './lib/validate';

program
  .name('mx-validate')
  .description('Validate MX compliance of files')
  .argument('<files...>', 'Files to validate')
  .option('-f, --format <format>', 'Output format (text|json)', 'text')
  .option('--strict', 'Fail on warnings')
  .action(async (files, options) => {
    let hasErrors = false;

    for (const file of files) {
      const results = await validateMXFile(file);
      console.log(formatResults(results, options.format));

      if (results.errors.length > 0) hasErrors = true;
      if (options.strict && results.warnings.length > 0) hasErrors = true;
    }

    process.exit(hasErrors ? 1 : 0);
  });

program.parse();
```

**Usage:**
```bash
mx-validate content/*.html --strict
mx-validate page.html --format json
```

## Related Documentation

- [CMS Compliance Specification](../cms-compliance.md) - Data model requirements
- [Webpage Compliance](../mx-compliance.md) - HTML output requirements
- [JavaScript Compliance](../mx-compliance-javascript.md) - JS patterns
- [CSS Compliance](../mx-compliance-css.md) - Styling requirements
