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
- `{{BIO_CATCH}}` - Bio section catch text
- `{{TOC_ITEMS}}` - Table of contents list items
- `{{ARTICLE_CONTENT}}` - Converted markdown content
- Plus 10 more placeholders for dates, URLs, keywords, etc.

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
outputs/bible/blogs/published/YYYY-MM-DD/
├── blog-name.html
├── blog-name.css (copied from blog-template.css)
├── blog-name-social.svg
├── blog-name-fig-1.svg
└── blog-name-fig-2.svg
```

## Accessibility Compliance

All generated blogs meet WCAG 2.1 AA standards:

| Criterion | Requirement | Implementation |
|-----------|-------------|----------------|
| **1.4.3** | Contrast 4.5:1 | #0066cc links (4.58:1) |
| **2.4.1** | Bypass Blocks | Skip link to #main |
| **2.4.7** | Focus Visible | 2px outline all interactive |
| **2.3.3** | Motion from Interactions | prefers-reduced-motion |
| **2.5.5** | Target Size | 44x44px mobile targets |

## Reference Documentation

- **Appendix D**: Complete blog accessibility pattern in `packages/shared-appendices/appendix-d-ai-friendly-html-guide.txt`
- **HTML Template**: Example structure in `packages/shared-appendices/web/site/blog-post.html`
