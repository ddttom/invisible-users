# Appendix HTML Enhancement Script

## Overview

The `pdf:appendix` npm script now generates Pandoc-based HTML pages enhanced with Chapter 10 technical patterns for AI agent compatibility.

## What Gets Enhanced

### 1. British English Language Attribute

```html
<html lang="en-GB" xml:lang="en-GB">
```

### 2. AI-Specific Meta Tags (Chapter 10 Proposed Pattern)

```html
<meta name="ai-preferred-access" content="html">
<meta name="ai-content-policy" content="summaries-allowed, full-extraction-allowed">
<meta name="ai-freshness" content="monthly">
<meta name="ai-structured-data" content="json-ld">
<meta name="ai-attribution" content="required">
```

### 3. Schema.org JSON-LD Structured Data

```javascript
{
  "@context": "https://schema.org",
  "@type": "TechArticle", // or "CollectionPage" for index
  "name": "Appendix A: Implementation Cookbook",
  "description": "Practical guidance from The Invisible Users book...",
  "author": {
    "@type": "Person",
    "name": "Tom Cranstoun",
    "email": "tom.cranstoun@gmail.com",
    "url": "https://allabout.network"
  },
  "inLanguage": "en-GB",
  "datePublished": "2026-01-10",
  "dateModified": "2026-01-10",
  "isPartOf": {
    "@type": "Book",
    "name": "The Invisible Users"
  },
  "position": 1 // Appendix letter position (A=1, B=2, etc.)
}
```

### 4. Semantic HTML Enhancements

- `role="main"` and `data-load-state="complete"` on main content
- `role="navigation"` with `aria-label` on navigation elements
- `role="contentinfo"` on footer elements
- `data-language` attributes on code blocks

## Pipeline Flow

```text
Markdown → Pandoc HTML → Enhancement Script → Final HTML
```

1. **Pandoc Conversion** (`generate-appendix-html.sh`)
   - Converts appendix markdown to HTML
   - Adds TOC, metadata, navigation footer
   - Provides British English metadata to Pandoc

2. **Post-Processing** (`enhance-appendix-html.js`)
   - Adds AI-specific meta tags
   - Injects Schema.org JSON-LD
   - Updates lang attributes to en-GB
   - Adds semantic roles and data attributes

## Usage

### Generate All Appendices

```bash
npm run pdf:appendix
```

This will:

1. Process all `appendix-*.md` files
2. Generate HTML with Pandoc
3. Enhance each file with Chapter 10 patterns
4. Generate appendix-index.html and llms.txt

### Enhance Individual File

```bash
node scripts/enhance-appendix-html.js path/to/file.html
```

### Enhance Multiple Files

```bash
node scripts/enhance-appendix-html.js appendix-a.html appendix-b.html appendix-index.html
```

## Files Modified

### Scripts

- `scripts/generate-appendix-html.sh` - Bash script orchestrating generation
- `scripts/enhance-appendix-html.js` - Node.js post-processor (NEW)
- `scripts/README-appendix-enhancements.md` - This file (NEW)

### Generated Files (in `packages/manuscript/the-bible-of-mx/web/`)

- `appendix-index.html` - Landing page with TOC
- `appendix-a.html` through `appendix-j.html` - Individual appendices
- `llms.txt` - AI agent discovery file

## Technical Details

### Why Post-Processing?

Pandoc's metadata system doesn't support:

- Custom meta tags (ai-* namespace)
- JSON-LD injection
- Conditional attribute injection (role, data-*)
- Complex semantic HTML enhancements

Post-processing with Node.js allows surgical DOM manipulation while preserving Pandoc's excellent markdown-to-HTML conversion.

### Idempotency

The enhancement script is idempotent - running it multiple times on the same file won't create duplicates. It:

- Replaces existing lang attributes
- Inserts meta tags before `</head>` (only if not present)
- Adds roles and data attributes to specific elements

## Alignment with Chapter 10

All enhancements follow Chapter 10's technical advice:

✅ **Semantic HTML** - `<main>`, `<nav>`, `<footer>` with roles
✅ **Explicit State** - `data-load-state="complete"`
✅ **AI Meta Tags** - Proposed pattern from lines 1186-1214
✅ **Schema.org** - JSON-LD structured data (lines 541-564)
✅ **British English** - `lang="en-GB"` throughout
✅ **Accessibility** - ARIA roles and labels

## Testing

Test on a single file:

```bash
# Create test copy
cp packages/manuscript/the-bible-of-mx/web/appendix-a.html /tmp/test.html

# Enhance
node scripts/enhance-appendix-html.js /tmp/test.html

# Verify lang attribute
grep 'lang="en-GB"' /tmp/test.html

# Verify AI meta tags
grep 'ai-preferred-access' /tmp/test.html

# Verify JSON-LD
grep '@context' /tmp/test.html
```

## Future Enhancements

Potential additions:

- Breadcrumb navigation markup
- WebPage/Article markup for better SEO
- OpenGraph tags for social sharing
- Twitter Card metadata
- More granular data attributes on specific content types

## Maintenance

When updating:

1. Modify `enhance-appendix-html.js` for new patterns
2. Run `npm run pdf:appendix` to regenerate all files
3. Test with sample files to verify enhancements
4. Update this README with new patterns

## Contact

Questions about the enhancement pipeline:

- Email: <tom.cranstoun@gmail.com>
- Context: Chapter 10 of "The Invisible Users"
