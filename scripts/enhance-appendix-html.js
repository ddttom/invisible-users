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
  const appendixMatch = pageTitle.match(/Appendix ([A-K]):/i);
  const appendixLetter = appendixMatch ? appendixMatch[1] : null;

  // Determine content type for Schema.org
  const isIndex = filePath.includes('appendix-index.html');
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
    /* Pre-publication header banner */
    body::before {
      content: "PRE-PUBLICATION SAMPLE - FOR REVIEWERS";
      display: block;
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      background-color: #fff3cd;
      border-bottom: 2px solid #ff9800;
      color: #856404;
      text-align: center;
      font-weight: bold;
      font-size: 0.9rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 0.75rem 1rem;
      margin: -2rem -2rem 2rem -2rem;
      z-index: 1000;
    }
    @media (max-width: 768px) {
      body::before {
        font-size: 0.8rem;
        padding: 0.5rem 0.75rem;
        margin: -1rem -1rem 1rem -1rem;
      }
    }
    /* Link styling - override Pandoc's default black links */
    a:not(.floating-home-button):not(.floating-top-button):not(.copy-button) {
      color: #0066cc !important;
      text-decoration: underline !important;
    }
    a:not(.floating-home-button):not(.floating-top-button):not(.copy-button):visited {
      color: #551a8b !important;
      text-decoration: underline !important;
    }
    a:not(.floating-home-button):not(.floating-top-button):not(.copy-button):hover {
      color: #003d7a !important;
      text-decoration: underline !important;
    }
    a:not(.floating-home-button):not(.floating-top-button):not(.copy-button):active {
      color: #ff4500 !important;
      text-decoration: underline !important;
    }
    /* Floating navigation buttons */
    .floating-home-button {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white !important;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none !important;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .floating-home-button:hover {
      background-color: #003d7a !important;
      color: white !important;
      box-shadow: 0 6px 16px rgba(0, 102, 204, 0.4);
      transform: translateY(-2px);
    }
    .floating-home-button:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(0, 102, 204, 0.3);
    }
    .floating-home-button svg {
      fill: white;
    }
    .floating-top-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white !important;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none !important;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .floating-top-button:hover {
      background-color: #003d7a !important;
      color: white !important;
      box-shadow: 0 6px 16px rgba(0, 102, 204, 0.4);
      transform: translateY(-2px);
    }
    .floating-top-button:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(0, 102, 204, 0.3);
    }
    .floating-top-button svg {
      fill: white;
    }
    @media (max-width: 768px) {
      .floating-home-button {
        top: 15px;
        left: 15px;
        padding: 10px 16px;
        font-size: 0.85rem;
      }
      .floating-top-button {
        bottom: 15px;
        left: 15px;
        padding: 10px 16px;
        font-size: 0.85rem;
      }
    }
    /* Code block styling */
    div.sourceCode {
      position: relative !important;
      border: 2px solid #000000 !important;
      background-color: #f5f5f5 !important;
      border-radius: 4px !important;
      padding: 1rem !important;
      margin: 1.5rem 0 !important;
      overflow: visible !important;
    }
    pre.sourceCode {
      background-color: transparent !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    code.sourceCode {
      white-space: pre-wrap !important;
    }
    pre > code.sourceCode > span {
      display: inline-block !important;
      line-height: 1.25 !important;
    }
    /* Standalone code blocks (text, plain code without wrapper) */
    pre.text,
    pre[data-role="code-block"]:not(.sourceCode) {
      position: relative !important;
      border: 2px solid #000000 !important;
      background-color: #f5f5f5 !important;
      border-radius: 4px !important;
      padding: 1rem !important;
      margin: 1.5rem 0 !important;
      overflow: auto !important;
      white-space: pre-wrap !important;
    }
    /* Copy to clipboard button */
    .copy-button {
      position: absolute;
      top: 8px;
      right: 8px;
      background-color: #0066cc;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      z-index: 10;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .copy-button:hover {
      background-color: #003d7a;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    .copy-button:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    .copy-button.copied {
      background-color: #28a745;
    }
    .copy-button.copied::after {
      content: " ✓";
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

  // 6. Add data attributes to code blocks for AI agent clarity
  // Add data-role to div.sourceCode containers
  enhanced = enhanced.replace(
    /<div class="sourceCode" id="([^"]+)">/g,
    '<div class="sourceCode" id="$1" data-role="code-container">'
  );

  // Add data-role and data-language to pre.sourceCode elements
  enhanced = enhanced.replace(
    /<pre class="([^"]+)"><code/g,
    (match, className) => {
      const lang = className.split(' ').find(c => c !== 'sourceCode');
      const dataLang = lang ? ` data-language="${lang}"` : '';
      return `<pre class="${className}" data-role="code-block"${dataLang}><code`;
    }
  );

  // Add data-role to code.sourceCode elements
  enhanced = enhanced.replace(
    /<code class="sourceCode ([^"]+)">/g,
    '<code class="sourceCode $1" data-role="code-content">'
  );

  // 7. Add floating navigation buttons and copy-to-clipboard script before </body>
  const copyScript = `
  <script>
    // Add copy buttons to all code blocks
    document.addEventListener('DOMContentLoaded', function() {
      // Find both wrapped code blocks (div.sourceCode) and standalone pre blocks
      const wrappedBlocks = document.querySelectorAll('div.sourceCode');
      const standaloneBlocks = document.querySelectorAll('pre[data-role="code-block"]:not(.sourceCode)');

      // Process wrapped code blocks (HTML, JavaScript, etc.)
      wrappedBlocks.forEach(function(block) {
        addCopyButton(block, function(block) {
          const codeElement = block.querySelector('code');
          let text = '';
          const spans = codeElement.querySelectorAll('span[id^="cb"]');
          spans.forEach(function(span) {
            const nodes = Array.from(span.childNodes);
            nodes.forEach(function(node) {
              if (node.nodeType === Node.TEXT_NODE) {
                text += node.textContent;
              } else if (node.nodeName !== 'A') {
                text += node.textContent;
              }
            });
          });
          return text;
        });
      });

      // Process standalone pre blocks (text, robots.txt, etc.)
      standaloneBlocks.forEach(function(block) {
        addCopyButton(block, function(block) {
          const codeElement = block.querySelector('code');
          return codeElement ? codeElement.textContent : block.textContent;
        });
      });

      // Helper function to add copy button to any block
      function addCopyButton(block, extractTextFn) {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy code to clipboard');

        button.addEventListener('click', function() {
          const text = extractTextFn(block);

          navigator.clipboard.writeText(text).then(function() {
            button.textContent = 'Copied';
            button.classList.add('copied');
            setTimeout(function() {
              button.textContent = 'Copy';
              button.classList.remove('copied');
            }, 2000);
          }).catch(function(err) {
            console.error('Failed to copy:', err);
            button.textContent = 'Failed';
            setTimeout(function() {
              button.textContent = 'Copy';
            }, 2000);
          });
        });

        block.insertBefore(button, block.firstChild);
      }
    });
  </script>`;

  const floatingButtons = `
  <!-- Floating home button (top-left) -->
  <a href="index.html" class="floating-home-button" aria-label="Back to Home">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0L0 8h3v8h10V8h3L8 0zm0 2.5L13.5 8H11v6H5V8H2.5L8 2.5z"/>
    </svg>
    Home
  </a>
  <!-- Floating back to top button (bottom-left) -->
  <a href="#" class="floating-top-button" aria-label="Back to Top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 3.5l-5.5 5.5L4 10.5l3-3v8.5h2V7.5l3 3L13.5 9z"/>
    </svg>
    Top
  </a>
${copyScript}
</body>`;

  enhanced = enhanced.replace('</body>', floatingButtons);

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
