# AllAbout.Network Hosting Path Map

**Version:** 1.0
**Date:** January 2026
**Purpose:** Complete mapping of repository file paths to allabout.network hosting URLs

---

## Overview

This document maps the local repository structure to the live allabout.network hosting paths, showing where HTML files should be deployed and what their public URLs will be.

**Base Domain:** `https://allabout.network`

---

## Directory Structure

### Repository → Hosting Mapping

```text
Repository Path                          →  Web URL
============================================================================

## MAIN SITE ROOT
/                                        →  https://allabout.network/

## INVISIBLE USERS / MX SERIES SECTION
/packages/shared-appendices/web/         →  https://allabout.network/invisible-users/

## BLOG POSTS (MX SERIES)
/outputs/bible/blogs/mx/                 →  https://allabout.network/blogs/mx/

## MEDIA/ASSETS
[External/CDN]                           →  https://allabout.network/media_*
[External/CDN]                           →  https://allabout.network/images/
```

---

## Detailed Path Mappings

### 1. Appendices & Resources (Main Content)

**Local Repository:** `/packages/shared-appendices/web/`
**Web Root:** `https://allabout.network/invisible-users/`

| Local File | Web URL |
|-----------|---------|
| `index.html` | `https://allabout.network/invisible-users/` or `/invisible-users/index.html` |
| `appendix-a.html` | `https://allabout.network/invisible-users/appendix-a.html` |
| `appendix-b.html` | `https://allabout.network/invisible-users/appendix-b.html` |
| `appendix-c.html` | `https://allabout.network/invisible-users/appendix-c.html` |
| `appendix-d.html` | `https://allabout.network/invisible-users/appendix-d.html` |
| `appendix-e.html` | `https://allabout.network/invisible-users/appendix-e.html` |
| `appendix-f.html` | `https://allabout.network/invisible-users/appendix-f.html` |
| `appendix-g.html` | `https://allabout.network/invisible-users/appendix-g.html` |
| `appendix-h.html` | `https://allabout.network/invisible-users/appendix-h.html` |
| `appendix-i.html` | `https://allabout.network/invisible-users/appendix-i.html` |
| `appendix-j.html` | `https://allabout.network/invisible-users/appendix-j.html` |
| `appendix-k.html` | `https://allabout.network/invisible-users/appendix-k.html` |
| `appendix-l.html` | `https://allabout.network/invisible-users/appendix-l.html` |
| `appendix-index.html` | `https://allabout.network/invisible-users/appendix-index.html` |
| `news.html` | `https://allabout.network/invisible-users/news.html` |
| `faq.html` | `https://allabout.network/invisible-users/faq.html` |
| `book.html` | `https://allabout.network/invisible-users/book.html` |
| `book-product-page.html` | `https://allabout.network/invisible-users/book-product-page.html` |
| `back-cover.html` | `https://allabout.network/invisible-users/back-cover.html` |
| `for-reviewers.html` | `https://allabout.network/invisible-users/for-reviewers.html` |
| `llms.txt` | `https://allabout.network/invisible-users/llms.txt` |
| `sitemap.xml` | `https://allabout.network/invisible-users/sitemap.xml` |

**CSS Files (same directory):**

- `appendix.css` → `https://allabout.network/invisible-users/appendix.css`
- `book-product-page.css` → `https://allabout.network/invisible-users/book-product-page.css`
- `for-reviewers.css` → `https://allabout.network/invisible-users/for-reviewers.css`

### 2. Common Page Pattern Examples (Reference)

**Local Repository:** `/packages/shared-appendices/web/site/`
**Web Root:** `https://allabout.network/invisible-users/site/`

| Local File | Web URL |
|-----------|---------|
| `index.html` | `https://allabout.network/invisible-users/site/index.html` |
| `about.html` | `https://allabout.network/invisible-users/site/about.html` |
| `article.html` | `https://allabout.network/invisible-users/site/article.html` |
| `author.html` | `https://allabout.network/invisible-users/site/author.html` |
| `blog-post.html` | `https://allabout.network/invisible-users/site/blog-post.html` |
| `checkout.html` | `https://allabout.network/invisible-users/site/checkout.html` |
| `collection.html` | `https://allabout.network/invisible-users/site/collection.html` |
| `consulting.html` | `https://allabout.network/invisible-users/site/consulting.html` |
| `contact.html` | `https://allabout.network/invisible-users/site/contact.html` |
| `event.html` | `https://allabout.network/invisible-users/site/event.html` |
| `faq.html` | `https://allabout.network/invisible-users/site/faq.html` |
| `login.html` | `https://allabout.network/invisible-users/site/login.html` |
| `portfolio.html` | `https://allabout.network/invisible-users/site/portfolio.html` |
| `pricing.html` | `https://allabout.network/invisible-users/site/pricing.html` |
| `privacy.html` | `https://allabout.network/invisible-users/site/privacy.html` |
| `product.html` | `https://allabout.network/invisible-users/site/product.html` |
| `sales.html` | `https://allabout.network/invisible-users/site/sales.html` |
| `search.html` | `https://allabout.network/invisible-users/site/search.html` |
| `team.html` | `https://allabout.network/invisible-users/site/team.html` |
| `testimonials.html` | `https://allabout.network/invisible-users/site/testimonials.html` |
| `404.html` | `https://allabout.network/invisible-users/site/404.html` |
| `llms.txt` | `https://allabout.network/invisible-users/site/llms.txt` |
| `sitemap.xml` | `https://allabout.network/invisible-users/site/sitemap.xml` |

**Purpose:** These are reference examples of AI-friendly HTML patterns for common page types (Appendix K content).

### 3. Blog Posts (MX Series)

**Local Repository:** `/outputs/bible/blogs/mx/`
**Web Root:** `https://allabout.network/blogs/mx/`

**Current Blog Posts:**

| Local File | Web URL |
|-----------|---------|
| `data-sovereignty.html` | `https://allabout.network/blogs/mx/data-sovereignty.html` |
| `what-is-machine-experience.html` | `https://allabout.network/blogs/mx/what-is-machine-experience.html` |
| `machine-experience-adding-metadata.html` | `https://allabout.network/blogs/mx/machine-experience-adding-metadata.html` |
| `mx-a-new-role.html` | `https://allabout.network/blogs/mx/mx-a-new-role.html` |
| `about.tom.cranstoun.html` | `https://allabout.network/blogs/mx/about.tom.cranstoun.html` |

**Blog Assets (same directory):**

Each blog post has associated files in the same directory:

| Asset Type | Pattern | Example |
|-----------|---------|---------|
| CSS | `[filename].css` | `data-sovereignty.css` |
| Social Card | `[filename]-social.svg` | `data-sovereignty-social.svg` |
| Diagrams | `[filename]-[diagram-name].svg` | `data-sovereignty-5-stage-agent-journey.svg` |

**Example for one blog post:**

```text
Repository:
/outputs/bible/blogs/mx/data-sovereignty.html
/outputs/bible/blogs/mx/data-sovereignty.css
/outputs/bible/blogs/mx/data-sovereignty-social.svg
/outputs/bible/blogs/mx/data-sovereignty-diagram-1.svg

Web URLs:
https://allabout.network/blogs/mx/data-sovereignty.html
https://allabout.network/blogs/mx/data-sovereignty.css
https://allabout.network/blogs/mx/data-sovereignty-social.svg
https://allabout.network/blogs/mx/data-sovereignty-diagram-1.svg
```

**URL Structure Rules:**

1. **Flat directory structure** - All MX blog files at same level
2. **Filename format** - Lowercase with hyphens (e.g., `machine-experience-adding-metadata.html`)
3. **Asset prefixing** - All assets prefixed with blog filename (e.g., `data-sovereignty-social.svg`)
4. **No subdirectories** - Keep all files in `/blogs/mx/` root

### 4. Media & Static Assets

**External hosting or CDN paths:**

| Asset Type | Web URL |
|-----------|---------|
| Author profile | `https://allabout.network/media_126e99d56f06caf788bee715aff92281d2e31a206.png` |
| OG Images | `https://allabout.network/images/invisible-users-og.jpg` |
| General media | `https://allabout.network/media_*` |
| General images | `https://allabout.network/images/*` |

**Note:** These assets are hosted externally or via CDN - exact paths may vary based on CMS/hosting platform configuration.

### 5. Root Site Files

**Root-level files:**

| File | Web URL |
|------|---------|
| Root llms.txt | `https://allabout.network/llms.txt` |
| Root sitemap | `https://allabout.network/sitemap.xml` |
| Root index | `https://allabout.network/` or `/index.html` |

---

## Content Type URL Patterns

### Appendices (Comprehensive Guides)

**Pattern:** `https://allabout.network/invisible-users/appendix-[letter].html`

**Example:** Appendix D (AI-Friendly HTML Guide)

- URL: `https://allabout.network/invisible-users/appendix-d.html`
- Repository: `/packages/shared-appendices/web/appendix-d.html`

### Blog Posts (Thought Leadership)

**Pattern:** `https://allabout.network/blogs/mx/[lowercase-title-with-hyphens].html`

**Example:** Blog post "Data Sovereignty and the Web We're Building"

- URL: `https://allabout.network/blogs/mx/data-sovereignty.html`
- Repository: `/outputs/bible/blogs/mx/data-sovereignty.html`

### Pattern Examples (Reference Material)

**Pattern:** `https://allabout.network/invisible-users/site/[page-type].html`

**Example:** Product page pattern

- URL: `https://allabout.network/invisible-users/site/product.html`
- Repository: `/packages/shared-appendices/web/site/product.html`

---

## Deployment Workflow

### 1. Generate Content (Local)

```bash
# Generate blog HTML from markdown
node scripts/generate-blog-html.js path/to/blog-post.md

# Generate appendix HTML
npm run pdf:appendix
```

**Output locations:**

- Blogs: `/outputs/bible/blogs/mx/`
- Appendices: `/packages/shared-appendices/web/`

### 2. Review Generated Files

Check that files are created in correct locations:

```bash
# Check blog files
ls -la outputs/bible/blogs/mx/

# Check appendix files
ls -la packages/shared-appendices/web/
```

### 3. Deploy to AllAbout.Network

**Upload paths:**

```text
Local Repository                         →  Server Path
===============================================================
/outputs/bible/blogs/mx/*                →  /public_html/blogs/mx/
/packages/shared-appendices/web/*        →  /public_html/invisible-users/
/packages/shared-appendices/web/site/*   →  /public_html/invisible-users/site/
```

**Deployment methods:**

- FTP/SFTP
- rsync
- Git deployment hook
- CI/CD pipeline
- CMS file upload

### 4. Verify Live URLs

After deployment, test URLs:

```bash
# Test appendix
curl -I https://allabout.network/invisible-users/appendix-d.html

# Test blog post
curl -I https://allabout.network/blogs/mx/data-sovereignty.html

# Test llms.txt
curl https://allabout.network/invisible-users/llms.txt
```

---

## Special Files

### llms.txt Files

**Purpose:** AI agent discovery files (as per llms.txt standard)

| Repository Path | Web URL | Scope |
|----------------|---------|-------|
| `/llms.txt` | `https://allabout.network/llms.txt` | Root site |
| `/packages/shared-appendices/web/llms.txt` | `https://allabout.network/invisible-users/llms.txt` | MX resources |
| `/packages/shared-appendices/web/site/llms.txt` | `https://allabout.network/invisible-users/site/llms.txt` | Pattern examples |

**Important:** Each llms.txt file has YAML frontmatter despite `.txt` extension.

### Sitemap Files

**Purpose:** SEO and agent discovery

| Repository Path | Web URL | Scope |
|----------------|---------|-------|
| Root sitemap (external) | `https://allabout.network/sitemap.xml` | Entire site |
| `/packages/shared-appendices/web/sitemap.xml` | `https://allabout.network/invisible-users/sitemap.xml` | MX section |
| `/packages/shared-appendices/web/site/sitemap.xml` | `https://allabout.network/invisible-users/site/sitemap.xml` | Examples |

**Generation:** Sitemaps are auto-generated via `scripts/generate-sitemap.js`

---

## Canonical URL Guidelines

### Always Use Full Canonical URLs in HTML

**Example from blog post:**

```html
<link rel="canonical" href="https://allabout.network/blogs/mx/data-sovereignty.html">
```

**Example from appendix:**

```html
<link rel="canonical" href="https://allabout.network/invisible-users/appendix-d.html">
```

### URL Structure Rules

1. **Always include full domain** - `https://allabout.network`
2. **Use trailing `.html`** - Be explicit about file extension
3. **Lowercase only** - No uppercase letters in URLs
4. **Hyphens for spaces** - Use `-` not `_` or `%20`
5. **No trailing slashes** - Unless it's a directory index

**Examples:**

✅ **Correct:**

- `https://allabout.network/blogs/mx/machine-experience-adding-metadata.html`
- `https://allabout.network/invisible-users/appendix-k.html`
- `https://allabout.network/invisible-users/` (directory index)

❌ **Incorrect:**

- `https://allabout.network/blogs/mx/Machine-Experience-Adding-Metadata.html` (uppercase)
- `https://allabout.network/blogs/mx/machine_experience_adding_metadata.html` (underscores)
- `https://allabout.network/blogs/mx/machine-experience-adding-metadata` (no extension)
- `https://allabout.network/invisible-users/appendix-k.html/` (trailing slash on file)

---

## Common Deployment Scenarios

### Scenario 1: New Blog Post

**Steps:**

1. Write markdown in `/scrap/` or temporary location
2. Generate HTML: `node scripts/generate-blog-html.js path/to/blog.md`
3. Files created in `/outputs/bible/blogs/mx/`:
   - `[filename].html`
   - `[filename].css`
   - `[filename]-social.svg`
   - `[filename]-*.svg` (diagrams)
4. Review files locally
5. Deploy to: `https://allabout.network/blogs/mx/`
6. Verify live URL: `https://allabout.network/blogs/mx/[filename].html`

### Scenario 2: Update Appendix

**Steps:**

1. Edit markdown in `/packages/shared-appendices/appendix-[letter].md`
2. Generate HTML: `npm run pdf:appendix`
3. Files created in `/packages/shared-appendices/web/`:
   - `appendix-[letter].html`
4. Review file locally
5. Deploy to: `https://allabout.network/invisible-users/`
6. Verify live URL: `https://allabout.network/invisible-users/appendix-[letter].html`

### Scenario 3: New Pattern Example

**Steps:**

1. Create HTML in `/packages/shared-appendices/web/site/[page-type].html`
2. Review file locally
3. Deploy to: `https://allabout.network/invisible-users/site/`
4. Verify live URL: `https://allabout.network/invisible-users/site/[page-type].html`
5. Update Appendix K (Common Page Patterns) to reference new example

---

## File Permissions & Hosting Notes

### Recommended File Permissions

**HTML/CSS/TXT files:**

- Permissions: `644` (rw-r--r--)
- Owner: web server user
- Group: web server group

**Directories:**

- Permissions: `755` (rwxr-xr-x)
- Owner: web server user
- Group: web server group

### MIME Types

Ensure server is configured with correct MIME types:

```apache
# Apache .htaccess
AddType text/html .html
AddType text/css .css
AddType image/svg+xml .svg
AddType text/plain .txt
AddType application/xml .xml
```

### Caching Headers

**Recommended cache headers:**

```apache
# Static assets (CSS, SVG, images)
<FilesMatch "\.(css|svg|png|jpg)$">
  Header set Cache-Control "max-age=2592000, public"
</FilesMatch>

# HTML files (shorter cache)
<FilesMatch "\.html$">
  Header set Cache-Control "max-age=3600, must-revalidate"
</FilesMatch>

# llms.txt and sitemap.xml (frequently updated)
<FilesMatch "\.(txt|xml)$">
  Header set Cache-Control "max-age=3600, must-revalidate"
</FilesMatch>
```

---

## Quick Reference

### Key Hosting Paths

| Content Type | Repository Location | Web URL Base |
|-------------|-------------------|--------------|
| **Appendices** | `/packages/shared-appendices/web/` | `/invisible-users/` |
| **Blog Posts** | `/outputs/bible/blogs/mx/` | `/blogs/mx/` |
| **Pattern Examples** | `/packages/shared-appendices/web/site/` | `/invisible-users/site/` |
| **Media Assets** | External/CDN | `/media_*` or `/images/` |

### File Naming Conventions

| File Type | Pattern | Example |
|----------|---------|---------|
| **Blog HTML** | `[lowercase-with-hyphens].html` | `data-sovereignty.html` |
| **Blog CSS** | `[blog-name].css` | `data-sovereignty.css` |
| **Social Card** | `[blog-name]-social.svg` | `data-sovereignty-social.svg` |
| **Diagrams** | `[blog-name]-[diagram-name].svg` | `data-sovereignty-5-stage-journey.svg` |
| **Appendix** | `appendix-[letter].html` | `appendix-d.html` |
| **Pattern** | `[page-type].html` | `product.html` |

### URL Checklist

When creating or deploying new content:

- [ ] URL uses lowercase only
- [ ] Spaces replaced with hyphens
- [ ] Full canonical URL in `<link rel="canonical">`
- [ ] Canonical matches actual deployment URL
- [ ] No trailing slash on files
- [ ] File extension included (`.html`)
- [ ] Assets prefixed with parent filename
- [ ] All assets in same directory as HTML

---

## Troubleshooting

### Issue: 404 Not Found

**Possible causes:**

1. File not uploaded to correct server directory
2. Incorrect file permissions
3. URL doesn't match actual filename (case sensitivity)
4. Missing file extension in URL

**Solution:**

```bash
# Check file exists on server
ssh user@server "ls -la /public_html/blogs/mx/"

# Check permissions
ssh user@server "stat /public_html/blogs/mx/[filename].html"

# Verify URL matches filename exactly
curl -I https://allabout.network/blogs/mx/[filename].html
```

### Issue: Assets Not Loading

**Possible causes:**

1. Asset files not uploaded
2. Incorrect paths in HTML
3. MIME type misconfiguration
4. CORS issues (for CDN assets)

**Solution:**

```bash
# Check asset exists
curl -I https://allabout.network/blogs/mx/[filename]-social.svg

# Check HTML references
grep "href=" outputs/bible/blogs/mx/[filename].html
grep "src=" outputs/bible/blogs/mx/[filename].html
```

### Issue: Canonical URL Mismatch

**Possible causes:**

1. Canonical URL still points to local/test domain
2. Canonical URL uses wrong path structure
3. Multiple canonical tags in HTML

**Solution:**

```bash
# Check canonical tag
curl -s https://allabout.network/blogs/mx/[filename].html | grep canonical

# Should output:
# <link rel="canonical" href="https://allabout.network/blogs/mx/[filename].html">
```

---

## Additional Resources

**Related Documentation:**

- [CLAUDE.md](/CLAUDE.md) - Complete project documentation
- [Blog Creation Skill](/.claude/skills/create-blog/skill.md) - Blog generation workflow
- [Appendix Generation Script](/scripts/generate-appendix-html.sh) - HTML generation
- [Sitemap Generator](/scripts/generate-sitemap.js) - Sitemap creation

**External Standards:**

- [llms.txt standard](https://llmstxt.org/) - AI discovery file format
- [Schema.org](https://schema.org/) - Structured data vocabulary
- [Sitemap Protocol](https://www.sitemaps.org/) - XML sitemap specification

---

**Document Version:** 1.0
**Last Updated:** January 2026
**Maintainer:** Tom Cranstoun

© 2026 Tom Cranstoun. All rights reserved.
