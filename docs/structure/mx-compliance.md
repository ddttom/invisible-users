---
title: "MX-Compliant Webpage Specification"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Specification for Machine Experience (MX) compliant webpages. Defines mandatory metadata, semantic structure, and accessibility requirements for pages served to browsers and AI agents."
keywords: [mx-compliance, webpage-metadata, semantic-html, schema-org, wcag, ai-agents]
ai-instruction: |
  This document defines compliance requirements for MX-certified webpages.
  The specification applies to any rendered HTML page regardless of how it was generated.
  Use this as a checklist when building or auditing webpage MX compliance.
---

# MX-Compliant Webpage Specification

Requirements for Machine Experience (MX) certified webpages.

## Overview

This specification defines what a compliant webpage must contain when served to browsers and AI agents. Unlike the CMS compliance specification (which addresses content storage and workflow), this document focuses on **rendered output** - the HTML that visitors receive.

**Scope:** Any HTML page served via HTTP/HTTPS, regardless of generation method:

- Static HTML files
- Server-rendered pages (PHP, Node.js, Python, Ruby)
- Client-rendered SPAs (React, Vue, Angular)
- Static site generator output (Hugo, Jekyll, Eleventy)
- CMS-generated pages (WordPress, Drupal, Ghost)

**Core Principle:** Every webpage must be self-describing. AI agents and assistive technologies should understand page purpose, content structure, and metadata without requiring external context.

## Document Structure Requirements

### Minimal Compliant Document

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- MX Metadata (Required) -->
  <meta name="mx-compliant" content="true">
  <meta name="mx-version" content="1.0">
  <meta name="mx-content-type" content="article">

  <!-- Core Metadata (Required) -->
  <title>Page Title - Site Name</title>
  <meta name="description" content="Page description (max 155 characters)">
  <meta name="author" content="Author Name">
  <meta name="keywords" content="keyword1, keyword2, keyword3">
  <link rel="canonical" href="https://example.com/page-url">

  <!-- Schema.org JSON-LD (Required) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Title",
    "description": "Page description"
  }
  </script>
</head>
<body>
  <header role="banner">
    <h1>Page Title</h1>
  </header>

  <main role="main">
    <article>
      <!-- Page content -->
    </article>
  </main>

  <footer role="contentinfo">
    <!-- Footer content -->
  </footer>
</body>
</html>
```

## Mandatory Elements

### 1. Document Declaration and Language

```html
<!DOCTYPE html>
<html lang="en-GB">
```

| Requirement | Description |
|-------------|-------------|
| DOCTYPE | Must be `<!DOCTYPE html>` (HTML5) |
| lang attribute | Required on `<html>` element, valid BCP 47 language tag |
| Character encoding | Must declare `<meta charset="UTF-8">` |

### 2. MX Meta Tags

These tags identify the page as MX-compliant and provide machine-readable classification:

```html
<!-- MX Compliance Declaration -->
<meta name="mx-compliant" content="true">
<meta name="mx-version" content="1.0">

<!-- Content Classification -->
<meta name="mx-content-type" content="article">
<meta name="mx-state" content="published">

<!-- Timestamps -->
<meta name="mx-published-at" content="2026-01-27T15:00:00Z">
<meta name="mx-modified-at" content="2026-01-27T14:30:00Z">
```

**MX Meta Tag Reference:**

| Tag | Required | Values | Description |
|-----|----------|--------|-------------|
| `mx-compliant` | Yes | `true` | Declares MX compliance |
| `mx-version` | Yes | `1.0` | MX specification version |
| `mx-content-type` | Yes | See below | Content classification |
| `mx-state` | Yes | `published`, `archived` | Publication state |
| `mx-published-at` | Yes | ISO 8601 | Publication timestamp |
| `mx-modified-at` | Yes | ISO 8601 | Last modification timestamp |

**Content Type Values:**

- `article` - News articles, blog posts, editorials
- `product` - Product pages, catalogue items
- `service` - Service descriptions, offerings
- `landing` - Marketing landing pages
- `documentation` - Technical documentation, guides
- `reference` - Reference material, glossaries
- `contact` - Contact pages, forms
- `about` - About pages, company information
- `legal` - Terms, privacy policy, legal notices
- `navigation` - Index pages, sitemaps, directories

### 3. Core SEO Meta Tags

```html
<title>Page Title - Site Name</title>
<meta name="description" content="Concise page summary (max 155 chars)">
<meta name="author" content="Author Name">
<meta name="keywords" content="keyword1, keyword2, keyword3">
<link rel="canonical" href="https://example.com/full-page-url">
```

| Tag | Required | Constraints |
|-----|----------|-------------|
| `<title>` | Yes | 50-60 characters recommended |
| `description` | Yes | Max 155 characters |
| `author` | Yes | Human-readable name |
| `keywords` | Yes | 3-5 comma-separated keywords |
| `canonical` | Yes | Absolute URL |

### 4. Open Graph Tags

Required for social media sharing and rich previews:

```html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description">
<meta property="og:type" content="article">
<meta property="og:url" content="https://example.com/page-url">
<meta property="og:image" content="https://example.com/social-card.png">
<meta property="og:site_name" content="Site Name">
<meta property="og:locale" content="en_GB">
```

| Property | Required | Description |
|----------|----------|-------------|
| `og:title` | Yes | Page title for social cards |
| `og:description` | Yes | Summary for social cards |
| `og:type` | Yes | `article`, `website`, `product` |
| `og:url` | Yes | Canonical URL |
| `og:image` | Yes | Social card image (1200×630px recommended) |
| `og:site_name` | Recommended | Website name |
| `og:locale` | Recommended | Locale code |

### 5. Schema.org JSON-LD

Every page must include at least one Schema.org type in JSON-LD format:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Article description",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://example.com/author"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Publisher Name",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "datePublished": "2026-01-27T15:00:00Z",
  "dateModified": "2026-01-27T14:30:00Z",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://example.com/page-url"
  },
  "image": "https://example.com/article-image.png",
  "keywords": "keyword1, keyword2, keyword3",
  "inLanguage": "en-GB"
}
</script>
```

**Schema.org Type by Content Type:**

| mx-content-type | Schema.org @type |
|-----------------|------------------|
| article | `Article`, `BlogPosting`, `NewsArticle` |
| product | `Product` |
| service | `Service` |
| landing | `WebPage` |
| documentation | `TechArticle`, `HowTo` |
| reference | `WebPage`, `DefinedTermSet` |
| contact | `ContactPage` |
| about | `AboutPage` |
| legal | `WebPage` |
| navigation | `CollectionPage`, `ItemList` |

## Semantic HTML Structure

### ARIA Landmarks

Every page must use semantic HTML5 elements with appropriate ARIA roles:

```html
<body>
  <header role="banner">
    <!-- Site header, logo, primary navigation -->
  </header>

  <nav role="navigation" aria-label="Main">
    <!-- Primary navigation -->
  </nav>

  <main role="main">
    <article>
      <!-- Primary content -->
    </article>

    <aside role="complementary">
      <!-- Related content, sidebar -->
    </aside>
  </main>

  <footer role="contentinfo">
    <!-- Site footer -->
  </footer>
</body>
```

**Required Landmarks:**

| Element | Role | Requirement |
|---------|------|-------------|
| `<header>` | banner | One per page (site header) |
| `<nav>` | navigation | At least one, labelled if multiple |
| `<main>` | main | Exactly one per page |
| `<footer>` | contentinfo | One per page (site footer) |

**Optional Landmarks:**

| Element | Role | Usage |
|---------|------|-------|
| `<article>` | article | Self-contained content |
| `<section>` | region | Thematic grouping (requires aria-label) |
| `<aside>` | complementary | Related but separate content |

### Heading Hierarchy

Headings must follow logical order without skipping levels:

```html
<!-- CORRECT: Logical hierarchy -->
<h1>Page Title</h1>
  <h2>Major Section</h2>
    <h3>Subsection</h3>
    <h3>Another Subsection</h3>
  <h2>Another Major Section</h2>
    <h3>Subsection</h3>
      <h4>Detail</h4>

<!-- WRONG: Skips H2 -->
<h1>Page Title</h1>
  <h3>Section</h3>  <!-- Error: Skipped H2 -->
```

**Rules:**

- Exactly one `<h1>` per page (matching page title)
- No skipped levels (H1 → H2 → H3, never H1 → H3)
- Headings must be in `<header>`, `<main>`, or `<article>` (not floating)

### Lists and Tables

**Lists:** Use semantic list elements:

```html
<!-- Unordered list -->
<ul>
  <li>Item one</li>
  <li>Item two</li>
</ul>

<!-- Ordered list -->
<ol>
  <li>First step</li>
  <li>Second step</li>
</ol>

<!-- Description list -->
<dl>
  <dt>Term</dt>
  <dd>Definition</dd>
</dl>
```

**Tables:** Must include proper structure and headers:

```html
<table>
  <caption>Table description</caption>
  <thead>
    <tr>
      <th scope="col">Column 1</th>
      <th scope="col">Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>
```

| Requirement | Description |
|-------------|-------------|
| `<caption>` | Required for data tables |
| `<thead>`, `<tbody>` | Required structure |
| `scope` attribute | Required on `<th>` elements |

### Links

Links must have clear, descriptive text:

```html
<!-- CORRECT: Purpose clear from link text -->
<a href="/guide">Read the implementation guide</a>
<a href="/contact">Contact our support team</a>

<!-- WRONG: Generic link text -->
<a href="/guide">Click here</a>
<a href="/contact">Learn more</a>
```

**Link Requirements:**

| Requirement | Description |
|-------------|-------------|
| Descriptive text | Purpose clear without surrounding context |
| `href` attribute | Must be present and valid |
| External links | Consider `rel="noopener"` for security |
| Skip links | Include "Skip to main content" for accessibility |

### Images

All images must have appropriate alt text:

```html
<!-- Informative image: Describe content -->
<img src="chart.png" alt="Sales increased 45% from Q1 to Q4 2025">

<!-- Decorative image: Empty alt -->
<img src="decoration.png" alt="">

<!-- Complex image: Extended description -->
<figure>
  <img src="diagram.svg" alt="System architecture diagram">
  <figcaption>
    Figure 1: The three-tier architecture showing client,
    API server, and database layers.
  </figcaption>
</figure>
```

| Image Type | Alt Text Approach |
|------------|-------------------|
| Informative | Describe the content and purpose |
| Decorative | Empty alt (`alt=""`) |
| Complex | Brief alt + detailed `<figcaption>` |
| Functional | Describe the action (button/link images) |

## WCAG 2.1 AA Compliance

### Colour Contrast

| Text Type | Minimum Contrast Ratio |
|-----------|----------------------|
| Normal text (< 18pt) | 4.5:1 |
| Large text (≥ 18pt or ≥ 14pt bold) | 3:1 |
| UI components | 3:1 |
| Graphics and icons | 3:1 |

**Compliant Colour Examples:**

```css
/* Body text: #1a1a1a on #ffffff = 16.7:1 ✓ */
body { color: #1a1a1a; background: #ffffff; }

/* Links: #0066cc on #ffffff = 7.3:1 ✓ */
a { color: #0066cc; }

/* Headings: #000000 on #ffffff = 21:1 ✓ */
h1, h2, h3 { color: #000000; }
```

### Keyboard Navigation

All interactive elements must be keyboard accessible:

```html
<!-- Focusable elements (automatic) -->
<a href="/page">Link</a>
<button type="button">Button</button>
<input type="text" name="field">
<select name="options">...</select>
<textarea name="message">...</textarea>

<!-- Custom interactive elements (require tabindex) -->
<div role="button" tabindex="0" onclick="action()">
  Custom Button
</div>
```

**Requirements:**

- Tab order follows visual order
- Focus indicator visible (never `outline: none` without replacement)
- No keyboard traps (user can always tab away)
- Skip links provided for main content

### Focus Management

```css
/* Visible focus indicator */
:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* Enhanced focus for better visibility */
:focus-visible {
  outline: 3px solid #0066cc;
  outline-offset: 3px;
  box-shadow: 0 0 0 6px rgba(0, 102, 204, 0.25);
}
```

## AI Agent Accessibility

### Machine-Readable State

Expose page state for AI agents:

```html
<!-- Page state metadata -->
<meta name="mx-state" content="published">
<meta name="mx-content-type" content="article">

<!-- Data attributes for dynamic state -->
<article data-state="published" data-content-type="article">
  ...
</article>

<!-- Form state -->
<form data-form-state="idle">
  <button type="submit" data-loading="false">Submit</button>
</form>
```

### Structured Data Completeness

AI agents rely on Schema.org data. Ensure completeness:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",

  /* Required fields */
  "headline": "Article Title",
  "description": "Article summary",
  "datePublished": "2026-01-27T15:00:00Z",
  "dateModified": "2026-01-27T14:30:00Z",

  /* Author information */
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://example.com/author",
    "sameAs": [
      "https://twitter.com/author",
      "https://linkedin.com/in/author"
    ]
  },

  /* Publisher information */
  "publisher": {
    "@type": "Organization",
    "name": "Publisher Name",
    "url": "https://example.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png",
      "width": 600,
      "height": 60
    }
  },

  /* Content metadata */
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://example.com/article-url"
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://example.com/article-image.png",
    "width": 1200,
    "height": 630
  },
  "wordCount": 2500,
  "keywords": "keyword1, keyword2, keyword3",
  "inLanguage": "en-GB",
  "isAccessibleForFree": true
}
</script>
```

### Navigation Clarity

Help AI agents understand site structure:

```html
<!-- Breadcrumb navigation -->
<nav aria-label="Breadcrumb">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/"><span itemprop="name">Home</span></a>
      <meta itemprop="position" content="1">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/articles"><span itemprop="name">Articles</span></a>
      <meta itemprop="position" content="2">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span itemprop="name">Current Article</span>
      <meta itemprop="position" content="3">
    </li>
  </ol>
</nav>
```

## Content Type Templates

### Article/Blog Post

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- MX Metadata -->
  <meta name="mx-compliant" content="true">
  <meta name="mx-version" content="1.0">
  <meta name="mx-content-type" content="article">
  <meta name="mx-state" content="published">
  <meta name="mx-published-at" content="2026-01-27T15:00:00Z">
  <meta name="mx-modified-at" content="2026-01-27T14:30:00Z">

  <!-- Core SEO -->
  <title>Article Title - Site Name</title>
  <meta name="description" content="Article summary in 155 characters or less">
  <meta name="author" content="Author Name">
  <meta name="keywords" content="keyword1, keyword2, keyword3">
  <link rel="canonical" href="https://example.com/article-url">

  <!-- Open Graph -->
  <meta property="og:title" content="Article Title">
  <meta property="og:description" content="Article summary">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://example.com/article-url">
  <meta property="og:image" content="https://example.com/article-social.png">
  <meta property="og:site_name" content="Site Name">
  <meta property="article:published_time" content="2026-01-27T15:00:00Z">
  <meta property="article:modified_time" content="2026-01-27T14:30:00Z">
  <meta property="article:author" content="Author Name">

  <!-- Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Article Title",
    "description": "Article summary",
    "author": {
      "@type": "Person",
      "name": "Author Name"
    },
    "datePublished": "2026-01-27T15:00:00Z",
    "dateModified": "2026-01-27T14:30:00Z",
    "publisher": {
      "@type": "Organization",
      "name": "Site Name",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://example.com/article-url"
    },
    "image": "https://example.com/article-image.png",
    "keywords": "keyword1, keyword2, keyword3",
    "wordCount": 2500,
    "inLanguage": "en-GB"
  }
  </script>

  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header role="banner">
    <nav role="navigation" aria-label="Main">
      <!-- Site navigation -->
    </nav>
  </header>

  <main id="main-content" role="main">
    <article>
      <header>
        <h1>Article Title</h1>
        <p class="meta">
          By <span class="author">Author Name</span> |
          <time datetime="2026-01-27">27 January 2026</time> |
          <span class="reading-time">10 min read</span>
        </p>
      </header>

      <nav aria-label="Table of Contents">
        <h2>Contents</h2>
        <ol>
          <li><a href="#section-1">Section 1</a></li>
          <li><a href="#section-2">Section 2</a></li>
        </ol>
      </nav>

      <section id="section-1">
        <h2>Section 1</h2>
        <p>Content...</p>
      </section>

      <section id="section-2">
        <h2>Section 2</h2>
        <p>Content...</p>
      </section>
    </article>
  </main>

  <footer role="contentinfo">
    <p>&copy; 2026 Site Name. All rights reserved.</p>
  </footer>
</body>
</html>
```

### Product Page

```html
<head>
  <!-- MX Metadata -->
  <meta name="mx-compliant" content="true">
  <meta name="mx-version" content="1.0">
  <meta name="mx-content-type" content="product">
  <meta name="mx-state" content="published">

  <!-- Schema.org Product -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Product Name",
    "description": "Product description",
    "image": "https://example.com/product.png",
    "brand": {
      "@type": "Brand",
      "name": "Brand Name"
    },
    "sku": "SKU12345",
    "offers": {
      "@type": "Offer",
      "price": "99.99",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock",
      "url": "https://example.com/product-url"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "127"
    }
  }
  </script>
</head>
```

### Contact Page

```html
<head>
  <!-- MX Metadata -->
  <meta name="mx-compliant" content="true">
  <meta name="mx-version" content="1.0">
  <meta name="mx-content-type" content="contact">
  <meta name="mx-state" content="published">

  <!-- Schema.org ContactPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Us",
    "description": "Get in touch with our team",
    "mainEntity": {
      "@type": "Organization",
      "name": "Company Name",
      "email": "contact@example.com",
      "telephone": "+44-20-1234-5678",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Business Street",
        "addressLocality": "London",
        "postalCode": "EC1A 1AA",
        "addressCountry": "GB"
      }
    }
  }
  </script>
</head>
```

## Validation Checklist

### Document Structure

- [ ] Valid HTML5 DOCTYPE
- [ ] `lang` attribute on `<html>` element
- [ ] `<meta charset="UTF-8">` present
- [ ] Viewport meta tag present

### MX Metadata

- [ ] `mx-compliant` meta tag = "true"
- [ ] `mx-version` meta tag present
- [ ] `mx-content-type` meta tag with valid value
- [ ] `mx-state` meta tag = "published" or "archived"
- [ ] `mx-published-at` with valid ISO 8601 timestamp
- [ ] `mx-modified-at` with valid ISO 8601 timestamp

### SEO Metadata

- [ ] `<title>` present (50-60 characters)
- [ ] `description` meta tag present (max 155 characters)
- [ ] `author` meta tag present
- [ ] `keywords` meta tag present (3-5 keywords)
- [ ] `canonical` link tag with absolute URL

### Open Graph

- [ ] `og:title` present
- [ ] `og:description` present
- [ ] `og:type` present
- [ ] `og:url` present (matches canonical)
- [ ] `og:image` present (1200×630px recommended)

### Schema.org

- [ ] JSON-LD script tag present
- [ ] Valid `@context` and `@type`
- [ ] `headline` or `name` present
- [ ] `description` present
- [ ] `datePublished` present (ISO 8601)
- [ ] `dateModified` present (ISO 8601)
- [ ] `author` object present
- [ ] Schema validates at schema.org/validate

### Semantic Structure

- [ ] `<header role="banner">` present
- [ ] `<nav role="navigation">` present with `aria-label`
- [ ] `<main role="main">` present (exactly one)
- [ ] `<footer role="contentinfo">` present
- [ ] Single `<h1>` matching page title
- [ ] Heading hierarchy (no skipped levels)
- [ ] Skip link to main content

### Accessibility

- [ ] All images have `alt` attributes
- [ ] Colour contrast meets WCAG 2.1 AA (4.5:1 / 3:1)
- [ ] Focus indicators visible
- [ ] Links have descriptive text
- [ ] Tables have `<caption>` and `scope` attributes
- [ ] Forms have associated labels

### Validation Tools

```bash
# HTML validation
npx html-validate page.html

# Accessibility scan
npx pa11y page.html

# Lighthouse audit
npx lighthouse https://example.com/page --only-categories=accessibility

# Schema.org validation
# Visit: https://validator.schema.org/
```

## Certification Levels

### Level 1: MX Basic

- MX meta tags present
- Core SEO metadata complete
- Valid HTML5 structure
- Single Schema.org type

### Level 2: MX Standard

- All Level 1 requirements
- Complete Open Graph tags
- Full semantic HTML structure
- WCAG 2.1 AA compliant
- Rich Schema.org with author/publisher

### Level 3: MX Advanced

- All Level 2 requirements
- Breadcrumb navigation with Schema.org
- Multiple Schema.org types (nested)
- AI-optimised content structure
- Performance optimised (Core Web Vitals pass)

## Related Documentation

- **CMS Compliance Specification** - Internal metadata and workflow requirements
- **Appendix D - AI-Friendly HTML Guide** - Detailed HTML patterns
- **Appendix P - Blog Generation Workflow** - Practical implementation example
- **WCAG 2.1 Guidelines** - https://www.w3.org/WAI/WCAG21/quickref/
- **Schema.org** - https://schema.org/docs/documents.html

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-27 | Initial specification |
