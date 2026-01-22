# create-blog Skill

Transform markdown blog posts into semantic, AI-agent-friendly HTML with complete WCAG 2.1 AA accessibility compliance.

## Files

- **skill.md** - Main skill definition and workflow
- **blog-template.html** - HTML template with placeholders (populated for each blog)
- **blog-template.css** - WCAG 2.1 AA compliant CSS template (copied to each blog output)
- **README.md** - This file

## Usage

```bash
/create-blog outputs/bible/blogs/your-blog-post.md
```

## Templates

### HTML Template (`blog-template.html`)

The HTML skeleton with placeholders using `{{PLACEHOLDER}}` syntax:

- `{{TITLE}}` - Blog post title
- `{{AUTHOR}}` - Author name
- `{{DESCRIPTION}}` - Meta description
- `{{BIO_CATCH}}` - Blog introduction message (tagline/key message)
- `{{TOC_ITEMS}}` - Table of contents list items
- `{{ARTICLE_CONTENT}}` - Converted markdown content
- Plus 10 more placeholders for dates, URLs, keywords, etc.

**Note:** The placeholder name `{{BIO_CATCH}}` is maintained for backward compatibility with existing markdown files that use `| bio |` tables, but the output component is semantically correct as `blog-introduction` with `aria-label="Blog introduction"` (not author biography).

The skill reads this template, replaces all placeholders with actual values, and writes the populated HTML.

### CSS Template (`blog-template.css`)

The single source of truth for blog styling. It includes:

- Skip to content link (WCAG 2.4.1)
- Semantic landmarks styling
- Focus indicators (WCAG 2.4.7)
- Color contrast 4.58:1 (WCAG 1.4.3)
- Touch targets 44x44px mobile (WCAG 2.5.5)
- Reduced motion support (WCAG 2.3.3)
- Print styles
- Responsive design

**DO NOT modify individual blog CSS files.** All changes should be made to `blog-template.css` and then blogs regenerated.

## Output Structure

```text
outputs/bible/blogs/mx/[topic-slug]/
├── index.html (main blog post)
├── styles.css (copied from blog-template.css)
├── social-card.svg (social media card)
├── 5-stage-agent-journey.svg (semantic names, AI-friendly)
├── human-vs-agent-behavior.svg
└── content-pipeline.svg
```

**Path structure:**

- All MX-related blog posts stored under `outputs/bible/blogs/mx/[topic-slug]/`
- Topic slug generated from blog title (lowercase, hyphens, no special chars)
- Example: "Content Operations" → `outputs/bible/blogs/mx/content-operations/`
- Web URL: `https://allabout.network/blogs/mx/content-operations/`

**Note:** SVG files use semantic filenames (e.g., `5-stage-agent-journey.svg`) instead of generic numbered names (e.g., `blog-name-fig-1.svg`) for better AI agent discoverability.

## AI Agent Compatibility

Generated blogs are optimized for AI agent parsing:

- **SVG embedding via `<object>` tags**: AI agents can parse SVG content directly (unlike `<img>` tags which treat SVGs as opaque images)
- **Semantic SVG filenames**: Descriptive names like `5-stage-agent-journey.svg` help AI agents understand diagram content
- **Metadata table cleanup**: EDS directives and parsing tables stripped from final HTML
- **Clean semantic structure**: No visual-only elements like "Blogroll" labels that confuse AI parsing

## Accessibility Compliance

All generated blogs meet WCAG 2.1 AA standards:

| Criterion | Requirement | Implementation |
| --------- | ----------- | -------------- |
| **1.4.3** | Contrast 4.5:1 | #0066cc links (4.58:1) |
| **2.4.1** | Bypass Blocks | Skip link to #main |
| **2.4.7** | Focus Visible | 2px outline all interactive |
| **2.3.3** | Motion from Interactions | prefers-reduced-motion |
| **2.5.5** | Target Size | 44x44px mobile targets |

## Reference Documentation

- **Appendix D**: Complete blog accessibility pattern in `packages/shared-appendices/appendix-d-ai-friendly-html-guide.txt`
- **HTML Template**: Example structure in `packages/shared-appendices/web/site/blog-post.html`
