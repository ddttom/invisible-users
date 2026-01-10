#!/usr/bin/env node

/**
 * Post-process Pandoc-generated HTML to add Chapter 10 technical patterns
 *
 * Adds:
 * - AI-specific meta tags (proposed pattern)
 * - Schema.org JSON-LD structured data
 * - Semantic HTML enhancements (main, role attributes, data attributes)
 * - British English lang attribute
 *
 * Usage: node scripts/enhance-appendix-html.js <html-file>
 */

const fs = require('fs');
const path = require('path');

function enhanceHTML(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');

  // Extract title from existing title tag
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const pageTitle = titleMatch ? titleMatch[1] : 'The Invisible Users';

  // Extract appendix letter if present
  const appendixMatch = pageTitle.match(/Appendix ([A-J]):/i);
  const appendixLetter = appendixMatch ? appendixMatch[1] : null;

  // Determine content type for Schema.org
  const isIndex = filePath.includes('index.html');
  const schemaType = isIndex ? 'CollectionPage' : 'TechArticle';

  // Build AI meta tags
  const aiMetaTags = `
  <!-- AI-specific meta tags (proposed pattern from Chapter 10) -->
  <meta name="ai-preferred-access" content="html">
  <meta name="ai-content-policy" content="summaries-allowed, full-extraction-allowed">
  <meta name="ai-freshness" content="monthly">
  <meta name="ai-structured-data" content="json-ld">
  <meta name="ai-attribution" content="required">`;

  // Build Schema.org JSON-LD
  const jsonLD = `
  <!-- Schema.org structured data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "${schemaType}",
    "name": "${pageTitle.replace(/"/g, '\\"')}",
    "description": "Practical guidance from The Invisible Users book on designing AI agent-friendly websites",
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
      "name": "The Invisible Users",
      "author": {
        "@type": "Person",
        "name": "Tom Cranstoun"
      },
      "url": "https://allabout.network/invisible-users"
    }${appendixLetter ? `,
    "position": "${appendixLetter.charCodeAt(0) - 64}"` : ''}
  }
  </script>`;

  // Enhance HTML
  let enhanced = html;

  // 1. Change lang attribute to British English
  enhanced = enhanced.replace(
    /<html[^>]*>/,
    '<html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB" xml:lang="en-GB">'
  );

  // 2. Add CSS for proper margins (override Pandoc defaults)
  const customCSS = `
  <style>
    body {
      max-width: 900px !important;
      margin: 2rem auto !important;
      padding: 0 2rem !important;
      padding-left: 2rem !important;
      padding-right: 2rem !important;
      padding-top: 2rem !important;
      padding-bottom: 2rem !important;
      line-height: 1.6;
    }
    @media (max-width: 768px) {
      body {
        padding: 0 1rem !important;
        padding-left: 1rem !important;
        padding-right: 1rem !important;
        margin: 1rem auto !important;
      }
    }
  </style>`;

  // 3. Add meta tags and CSS before </head>
  enhanced = enhanced.replace(
    '</head>',
    `${aiMetaTags}${jsonLD}${customCSS}\n</head>`
  );

  // 4. Add semantic roles and data attributes
  // Add role="main" to main content div
  enhanced = enhanced.replace(
    /<div id="(TOC|main-content|content)"[^>]*>/,
    (match) => match.replace('>', ' role="main" data-load-state="complete">')
  );

  // Add role="navigation" to TOC nav
  enhanced = enhanced.replace(
    /<nav id="TOC"[^>]*>/,
    '<nav id="TOC" role="navigation" aria-label="Table of Contents">'
  );

  // Add role="contentinfo" to footer if present
  enhanced = enhanced.replace(
    /<footer[^>]*>/,
    '<footer role="contentinfo">'
  );

  // 5. Enhance appendix navigation with roles
  enhanced = enhanced.replace(
    /<nav class="appendix-navigation"[^>]*>/,
    '<nav class="appendix-navigation" role="navigation" aria-label="Appendix Navigation">'
  );

  // 6. Add data attributes to code blocks (if they have language classes)
  enhanced = enhanced.replace(
    /<pre class="([^"]+)"><code/g,
    (match, className) => {
      const lang = className.split(' ').find(c => c !== 'sourceCode');
      return lang ? `<pre class="${className}" data-language="${lang}"><code` : match;
    }
  );

  // Write enhanced HTML back
  fs.writeFileSync(filePath, enhanced, 'utf8');

  return {
    file: path.basename(filePath),
    title: pageTitle,
    appendix: appendixLetter,
    enhanced: true
  };
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node enhance-appendix-html.js <html-file> [html-file...]');
    process.exit(1);
  }

  const results = args.map(file => {
    try {
      return enhanceHTML(file);
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
      return { file: path.basename(file), error: error.message };
    }
  });

  // Summary
  console.log('\n✓ Enhanced HTML files with Chapter 10 patterns:\n');
  results.forEach(r => {
    if (r.enhanced) {
      console.log(`  ✓ ${r.file} - ${r.title}`);
    } else {
      console.log(`  ✗ ${r.file} - ${r.error}`);
    }
  });
  console.log('');
}

module.exports = { enhanceHTML };
