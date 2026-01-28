---
title: "Blog Metadata Schema and State Tracking"
author: "Tom Cranstoun"
date: "2026-01-26"
description: "Metadata schema for tracking blog post states from draft to publication"
keywords: [blog-workflow, metadata, yaml-frontmatter, state-tracking]
ai-instruction: "This document defines the metadata schema for blog post state tracking. All blog files (markdown and HTML) must include this metadata."
---

# Blog Metadata Schema and State Tracking

## Overview

All blog posts (markdown drafts and HTML files) must include metadata to track their state through the workflow from draft to publication.

## Blog States

| State | Description | Location |
|-------|-------------|----------|
| **draft** | Work in progress, not ready for review | `docs/structure/` or `docs/structure/blog-drafts/` |
| **in-review** | HTML generated, undergoing review process | `outputs/bible/blogs/mx/` (symlinked as `blogs/mx/`) |
| **published** | Live on allabout.network website | `outputs/bible/blogs/mx/` + web server |
| **archived** | No longer current but preserved for reference | `outputs/bible/blogs/mx/` with archived state |

### Review Sub-States

When `blog-state` is "in-review", the `blog-review-status` field tracks the specific review stage:

| Review Status              | Description                                          |
| -------------------------- | ---------------------------------------------------- |
| **initial-review**         | First technical and editorial pass                   |
| **technical-review**       | Technical accuracy validation                        |
| **editorial-review**       | Writing quality and style review                     |
| **final-committee-review** | Final approval before publication (current default)  |
| **ready-for-publication**  | Approved and ready for deployment                    |

## Workflow

```text
draft (markdown) → generate HTML → in-review (HTML in blogs/) → publish to web → published
```

## Markdown Files - YAML Frontmatter Schema

All markdown blog files must include YAML frontmatter with the following fields:

```yaml
---
title: "Blog Post Title"
author: "Tom Cranstoun"
date: "YYYY-MM-DD"                    # Last modified date
blog-state: "draft"                   # Current state: draft | in-review | published | archived
blog-filename: "url-friendly-name"    # Target filename (without .html extension)
blog-url: ""                          # Full URL (empty until published)
publication-date: ""                  # Date published to web (YYYY-MM-DD, empty until published)
description: "Brief summary for meta description and social cards"
keywords: [keyword1, keyword2, keyword3]
ai-instruction: "Context for AI agents parsing this content"
---
```

### Field Descriptions

- **title** (required): The blog post title as it will appear in the H1 and meta tags
- **author** (required): Always "Tom Cranstoun" for this project
- **date** (required): Last modification date in ISO format (YYYY-MM-DD)
- **blog-state** (required): Current state (draft, in-review, published, archived)
- **blog-filename** (required): URL-friendly filename without extension (e.g., "machine-experience-adding-metadata")
- **blog-url** (optional): Full published URL (empty until published)
- **publication-date** (optional): Date published to web (empty until published)
- **description** (required): Brief summary (1-2 sentences) for meta description
- **keywords** (required): Array of relevant keywords/topics
- **ai-instruction** (optional): Guidance for AI agents parsing the content

## HTML Files - Meta Tags Schema

All HTML blog files must include meta tags for state tracking in the `<head>` section:

```html
<head>
  <!-- Blog State Tracking -->
  <meta name="blog-state" content="in-review">
  <meta name="blog-draft-date" content="2026-01-20">
  <meta name="blog-review-date" content="2026-01-25">
  <meta name="blog-publication-date" content="">
  <meta name="blog-last-modified" content="2026-01-25">
  <meta name="blog-review-status" content="final-committee-review">

  <!-- Standard metadata continues... -->
  <title>Blog Post Title</title>
  <meta name="description" content="Brief summary">
  <meta name="keywords" content="keyword1, keyword2, keyword3">
</head>
```

### HTML Meta Tag Descriptions

- **blog-state**: Current state (in-review, published, archived)
- **blog-draft-date**: Date the markdown draft was first created
- **blog-review-date**: Date the HTML was generated and moved to blogs/ folder
- **blog-publication-date**: Date published to web (empty until published)
- **blog-last-modified**: Last modification date
- **blog-review-status**: Sub-state when blog-state is "in-review" (values: "initial-review", "technical-review", "editorial-review", "final-committee-review", "ready-for-publication")

## CSS Files - Comment Header Schema

All CSS files should include a comment header with basic metadata:

```css
/**
 * Blog Post Styles
 * Title: Blog Post Title
 * Filename: blog-filename.css
 * Blog State: in-review
 * Last Modified: 2026-01-25
 * Author: Tom Cranstoun
 *
 * WCAG 2.1 AA compliant styling for blog post.
 * Scoped to this specific blog post.
 */
```

## State Transition Rules

### Draft → In Review
1. Markdown file has `blog-state: "draft"`
2. Generate HTML using `scripts/generate-blog-html.js`
3. HTML files created in `outputs/bible/blogs/mx/`
4. Update markdown to `blog-state: "in-review"`
5. Add `blog-review-date` to markdown and HTML

### In Review → Published
1. Review HTML in blogs/ folder
2. Publish to allabout.network
3. Update markdown and HTML to `blog-state: "published"`
4. Add `blog-publication-date` to both files
5. Add `blog-url` to markdown frontmatter

### Published → Archived
1. Update markdown and HTML to `blog-state: "archived"`
2. Keep files in place for reference
3. Consider adding archive notice to HTML

## File Organization

```text
docs/structure/
├── *.md                              # Top-level draft blogs (blog-state: "draft")
└── blog-drafts/                      # Organized draft blogs
    ├── *.md                          # Draft files (blog-state: "draft")
    ├── contrasts/                    # Draft series: contrasts
    └── joiners/                      # Draft series: joiners

outputs/bible/blogs/mx/
├── *.html                            # In review or published (blog-state: "in-review" or "published")
├── *.css                             # Scoped blog styles
└── *.svg                             # Blog diagrams and social cards
```

## Implementation Notes

1. **Mandatory Metadata**: All blog files must include metadata before being considered complete
2. **State Consistency**: Markdown and HTML files for the same blog must have matching states
3. **Date Tracking**: All state transitions must update the relevant date fields
4. **Review Process**: HTML files in `blogs/` folder are considered "in-review" by default
5. **Publication Workflow**: Only update to "published" state after content is live on web

## Related Documentation

- [Blog Generation Workflow](.claude/skills/create-blog/skill.md)
- [Blog Content Workflow](../architecture/doc-architecture.md#blog-content-workflow)
- [YAML Frontmatter Template](../for-ai/yaml-frontmatter-template.md)
