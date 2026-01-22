#!/usr/bin/env node
/**
 * Blog HTML Generator (Without Pandoc)
 *
 * Converts markdown blog posts to semantic, AI-agent-friendly HTML
 * using markdown-it instead of pandoc to avoid artifacts and provide
 * better control over HTML output.
 *
 * Usage: node scripts/generate-blog-html.js <markdown-file-path>
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const MarkdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const yaml = require('js-yaml');

// Configuration
const TEMPLATES_DIR = path.join(__dirname, '../.claude/skills/create-blog');
const TEMPLATE_HTML = path.join(TEMPLATES_DIR, 'blog-template.html');
const TEMPLATE_CSS = path.join(TEMPLATES_DIR, 'blog-template.css');
const OUTPUT_BASE = path.join(__dirname, '../outputs/bible/blogs/mx');

//=============================================================================
// PHASE 1: Parse Markdown Source
//=============================================================================

function parseMarkdownFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ERROR: File not found: ${filePath}`);
    process.exit(1);
  }

  const markdown = fs.readFileSync(filePath, 'utf8');
  console.log(`✓ Read markdown file: ${path.basename(filePath)}`);
  return markdown;
}

//=============================================================================
// PHASE 2: Merge Metadata
//=============================================================================

function extractYAMLFrontmatter(markdown) {
  const yamlRegex = /^---\n([\s\S]*?)\n---/;
  const match = markdown.match(yamlRegex);

  if (!match) return {};

  try {
    const parsed = yaml.load(match[1]);
    console.log('✓ Extracted YAML frontmatter');
    return parsed;
  } catch (e) {
    console.warn('⚠ Warning: Could not parse YAML frontmatter');
    return {};
  }
}

function extractMetadataTable(markdown) {
  const metadataRegex = /\| metadata \|[\s\S]*?\n((?:\|[^\n]*\n)+)(?=\n##|\n\n[^|]|$)/;
  const match = markdown.match(metadataRegex);

  if (!match) return {};

  const lines = match[1].trim().split('\n');
  const metadata = {};

  // Skip separator row, parse data rows
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split('|').map(s => s.trim()).filter(s => s);
    if (cols.length >= 2) {
      metadata[cols[0]] = cols[1];
    }
  }

  console.log('✓ Extracted metadata table');
  return metadata;
}

function extractBioText(markdown) {
  const bioRegex = /\| bio \|[\s\S]*?\n\|[^\n]*\|[^\n]*\|\n\|[^|]*\|([^|]*)\|/;
  const match = markdown.match(bioRegex);

  if (match && match[1]) {
    const bio = match[1].trim();
    console.log('✓ Extracted bio catch text');
    return bio;
  }

  return null;
}

function extractFirstH1(markdown) {
  const h1Regex = /^#\s+(.+)$/m;
  const match = markdown.match(h1Regex);
  return match ? match[1] : null;
}

function convertDateToISO(dateString) {
  // Convert "22/Jan/2026" to "2026-01-22" for ISO 8601 compliance
  const ddMonYyyy = /^(\d{1,2})\/([A-Za-z]{3})\/(\d{4})$/;
  const match = dateString.match(ddMonYyyy);

  if (match) {
    const day = match[1].padStart(2, '0');
    const monthName = match[2];
    const year = match[3];

    const monthMap = {
      'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
      'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
      'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };

    const month = monthMap[monthName];
    if (month) {
      return `${year}-${month}-${day}`;
    }
  }

  // Return as-is if already ISO or unknown format
  return dateString;
}

function mergeMetadata(markdown) {
  const yamlMeta = extractYAMLFrontmatter(markdown);
  const tableMeta = extractMetadataTable(markdown);
  const bioCatch = extractBioText(markdown);
  const firstH1 = extractFirstH1(markdown);

  // Get raw date and LinkedIn values
  let rawDate = tableMeta['publication-date'] || yamlMeta.date || new Date().toISOString().split('T')[0];
  let rawLinkedIn = tableMeta.LinkedIn || 'https://www.linkedin.com/in/tom-cranstoun/';

  // Convert date to ISO 8601 format
  const isoDate = convertDateToISO(rawDate);

  // Strip angle brackets from URLs (markdown link syntax)
  const linkedInUrl = rawLinkedIn.replace(/^<|>$/g, '');

  // Merge with priority: table > yaml > defaults
  const metadata = {
    title: tableMeta.title || yamlMeta.title || firstH1 || 'Untitled Blog Post',
    author: tableMeta.author || yamlMeta.author || 'Tom Cranstoun',
    date: isoDate,
    description: tableMeta.description || yamlMeta.description || '',
    keywords: yamlMeta.keywords || ['machine-experience', 'ai-agents'],
    LinkedIn: linkedInUrl,
    bioCatch: bioCatch || tableMeta.longdescription || 'Machine Experience (MX) is the practice of adding metadata and instructions to internet assets so AI agents don\'t have to guess.'
  };

  console.log(`✓ Merged metadata: "${metadata.title}"`);
  return metadata;
}

//=============================================================================
// PHASE 3: Strip Metadata Tables
//=============================================================================

function stripMetadataTables(markdown) {
  let clean = markdown;

  // Remove YAML frontmatter
  clean = clean.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Remove metadata table variants
  const patterns = [
    /\| metadata \|[\s\S]*?\n(?:\|[^\n]*\n)*(?=\n##|\n\n[^|]|$)/g,
    /\| bio \|[\s\S]*?\n(?:\|[^\n]*\n)*(?=\n##|\n\n[^|]|$)/g,
    /\| index \|[\s\S]*?\n(?:\|[^\n]*\n)*(?=\n##|\n\n[^|]|$)/g,
    /\| returntotop \|[\s\S]*?\n(?:\|[^\n]*\n)*(?=\n##|\n\n[^|]|$)/g,
    /\| Blogroll \|[\s\S]*?\n(?:\|[^\n]*\n)*(?=\n##|\n\n[^|]|$)/g
  ];

  patterns.forEach(pattern => {
    clean = clean.replace(pattern, '');
  });

  // Remove trailing metadata after ---
  clean = clean.replace(/\n---\n+\|.*$/s, '');

  console.log('✓ Stripped metadata tables');
  return clean;
}

//=============================================================================
// PHASE 4-5: ASCII Diagram Conversion
//=============================================================================

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function convertAsciiToSVG(asciiText, filename) {
  const lines = asciiText.split('\n').filter(line => line.trim());
  const maxWidth = Math.max(...lines.map(l => l.length), 50);
  const lineHeight = 25;
  const padding = 40;
  const width = maxWidth * 10 + padding * 2;
  const height = lines.length * lineHeight + padding * 2;

  const svgLines = lines.map((line, i) => {
    const escapedLine = escapeHtml(line);
    const y = padding + (i + 1) * lineHeight;
    return `  <text x="50%" y="${y}" font-family="'Courier New', monospace" font-size="14" text-anchor="middle" fill="#2c3e50">${escapedLine}</text>`;
  });

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <title>${generateTitleFromFilename(filename)}</title>
  <desc>ASCII diagram showing workflow or hierarchy</desc>

  <!-- Background -->
  <rect width="100%" height="100%" fill="#f8f9fa"/>

  <!-- Text content -->
${svgLines.join('\n')}
</svg>`;
}

function generateTitleFromFilename(filename) {
  return filename
    .replace(/\.svg$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function generateSemanticFilename(asciiText, index) {
  // Extract key words from first line or context
  const firstLine = asciiText.split('\n')[0] || '';
  const keywords = firstLine
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2)
    .slice(0, 4)
    .join('-');

  return keywords || `diagram-flow-${index}`;
}

function convertAsciiDiagrams(markdown, outputDir) {
  let processed = markdown;
  const asciiRegex = /```text\n([\s\S]*?(?:→|↓|↑|←)[\s\S]*?)\n```/g;
  const svgFiles = [];
  let index = 1;

  let match;
  while ((match = asciiRegex.exec(markdown)) !== null) {
    const asciiText = match[1];
    const filename = generateSemanticFilename(asciiText, index);
    const svgFilename = `${filename}.svg`;
    const svgContent = convertAsciiToSVG(asciiText, svgFilename);

    // Write SVG file
    const svgPath = path.join(outputDir, svgFilename);
    fs.writeFileSync(svgPath, svgContent, 'utf8');
    svgFiles.push(svgFilename);

    // Replace in markdown with placeholder
    processed = processed.replace(match[0], `[SVG:${index}:${filename}]`);

    console.log(`✓ Converted ASCII diagram to: ${svgFilename}`);
    index++;
  }

  return { markdown: processed, svgFiles };
}

function extractInlineSVGs(markdown, outputDir) {
  let processed = markdown;
  const svgRegex = /<svg[\s\S]*?<\/svg>/g;
  const svgFiles = [];
  let index = 1;

  let match;
  const matches = [];
  while ((match = svgRegex.exec(markdown)) !== null) {
    matches.push(match);
  }

  // Process matches
  matches.forEach((match) => {
    const svgContent = match[0];

    // Extract title from SVG for semantic filename
    let title = null;

    // Try <title> tag first
    const titleMatch = svgContent.match(/<title>(.*?)<\/title>/);
    if (titleMatch) {
      title = titleMatch[1];
    } else {
      // Fallback: extract from first <text> element
      const textMatch = svgContent.match(/<text[^>]*>(.*?)<\/text>/);
      if (textMatch) {
        title = textMatch[1];
      }
    }

    // Final fallback to numbered name
    if (!title || title.trim().length === 0) {
      title = `diagram-${index}`;
    }

    // Generate semantic filename from title
    const filename = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50)
      .replace(/^-|-$/g, '');

    const svgFilename = `${filename}.svg`;

    // Write SVG file
    const svgPath = path.join(outputDir, svgFilename);
    fs.writeFileSync(svgPath, svgContent, 'utf8');
    svgFiles.push(svgFilename);

    // Replace in markdown with placeholder
    processed = processed.replace(match[0], `[SVG:${index}:${filename}]`);

    console.log(`✓ Extracted inline SVG to: ${svgFilename}`);
    index++;
  });

  return { markdown: processed, svgFiles };
}

//=============================================================================
// PHASE 6: Convert Markdown to HTML
//=============================================================================

function slugify(text) {
  let slug = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  // Ensure slug starts with a letter (fix IDs starting with numbers)
  if (slug && /^[0-9]/.test(slug)) {
    slug = 'section-' + slug;
  }

  return slug;
}

function convertMarkdownToHTML(markdown) {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: false
  }).use(markdownItAnchor, {
    level: [2, 3, 4, 5, 6],
    slugify: slugify,
    permalink: false
  });

  const html = md.render(markdown);
  console.log('✓ Converted markdown to HTML');
  return html;
}

//=============================================================================
// PHASE 7: Post-Process HTML
//=============================================================================

function postProcessHTML(html) {
  let processed = html;

  // Remove any H1 from article content (template has H1 in header)
  processed = processed.replace(/<h1[^>]*>.*?<\/h1>/gi, '');

  // Remove duplicate table content (paragraph before table)
  processed = processed.replace(/<p>([^<]*\|[^<]*)<\/p>\s*(<table[\s\S]*?<\/table>)/g, '$2');

  // Clean up invalid <p> tags inside SVG elements
  processed = processed.replace(/<svg[\s\S]*?<\/svg>/g, (svgBlock) => {
    // Remove <p> wrappers around SVG text elements
    return svgBlock
      .replace(/<p>(<text[\s\S]*?<\/text>)<\/p>/g, '$1')
      .replace(/<p>/g, '')  // Remove orphan <p> tags
      .replace(/<\/p>/g, ''); // Remove orphan </p> tags
  });

  // Replace SVG placeholders with <object> tags (WITH EXPLICIT DIMENSIONS)
  processed = processed.replace(/\[SVG:(\d+):([\w-]+)\]/g, (match, num, filename) => {
    const title = generateTitleFromFilename(filename);
    return `
<figure role="img" aria-label="${title}">
  <object type="image/svg+xml"
          data="${filename}.svg"
          width="800"
          height="400"
          class="diagram">
    <p>Your browser does not support SVG. <a href="${filename}.svg">View the diagram</a>.</p>
  </object>
  <figcaption>${title}</figcaption>
</figure>`;
  });

  // Remove <p> wrappers around <figure> elements (markdown-it artifact)
  processed = processed.replace(/<p>\s*(<figure[\s\S]*?<\/figure>)\s*<\/p>/g, '$1');

  console.log('✓ Post-processed HTML (cleaned SVG markup, removed table duplicates)');
  return processed;
}

//=============================================================================
// PHASE 8: Generate TOC
//=============================================================================

function generateTOC(markdown) {
  const h2Regex = /^## (.+)$/gm;
  const tocItems = [];
  let match;

  while ((match = h2Regex.exec(markdown)) !== null) {
    const text = match[1];
    const id = slugify(text);
    tocItems.push({ text, id });
  }

  const tocHTML = tocItems
    .map(item => `        <li><a href="#${item.id}">${item.text}</a></li>`)
    .join('\n');

  console.log(`✓ Generated TOC with ${tocItems.length} items`);
  return tocHTML;
}

//=============================================================================
// PHASE 9: Calculate Metadata
//=============================================================================

function calculateDerivedMetadata(metadata, articleHTML) {
  // Word count
  const textOnly = articleHTML.replace(/<[^>]*>/g, '').trim();
  const wordCount = textOnly.split(/\s+/).filter(w => w.length > 0).length;
  const readingTime = Math.ceil(wordCount / 200);

  // Date formatting
  const [year, month, day] = metadata.date.split('-');
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const displayDate = `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;

  // Topic slug and URLs
  const topicSlug = metadata.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50)
    .replace(/^-|-$/g, '');

  const ogUrl = `https://allabout.network/blogs/mx/${topicSlug}`;
  const socialImageUrl = `${ogUrl}/social-card.svg`;

  // Keywords formatting
  const keywordsArray = Array.isArray(metadata.keywords)
    ? metadata.keywords
    : [metadata.keywords];
  const keywordsString = keywordsArray.join(', ');
  const keywordsArrayString = keywordsArray.map(k => `"${k}"`).join(', ');

  console.log(`✓ Calculated metadata (${wordCount} words, ${readingTime} min read)`);

  return {
    wordCount,
    readingTime,
    displayDate,
    isoDate: metadata.date,
    topicSlug,
    ogUrl,
    socialImageUrl,
    keywordsString,
    keywordsArrayString
  };
}

//=============================================================================
// PHASE 10: Replace Template Placeholders
//=============================================================================

function replaceTemplatePlaceholders(template, metadata, derived, tocHTML, articleHTML) {
  let html = template;

  const replacements = {
    '{{TITLE}}': metadata.title,
    '{{AUTHOR}}': metadata.author,
    '{{DESCRIPTION}}': metadata.description,
    '{{KEYWORDS}}': derived.keywordsString,
    '{{KEYWORDS_ARRAY}}': derived.keywordsArrayString,
    '{{ISO_DATE}}': derived.isoDate,
    '{{DISPLAY_DATE}}': derived.displayDate,
    '{{WORD_COUNT}}': derived.wordCount.toString(),
    '{{READING_TIME}}': derived.readingTime.toString(),
    '{{BIO_CATCH}}': metadata.bioCatch,
    '{{TOC_ITEMS}}': tocHTML,
    '{{ARTICLE_CONTENT}}': articleHTML,
    '{{CSS_FILENAME}}': 'styles.css',
    '{{OG_URL}}': derived.ogUrl,
    '{{SOCIAL_IMAGE_URL}}': derived.socialImageUrl,
    '{{LINKEDIN_URL}}': metadata.LinkedIn
  };

  // Replace all placeholders (global regex)
  Object.keys(replacements).forEach(placeholder => {
    const escapedPlaceholder = placeholder.replace(/[{}]/g, '\\$&');
    const regex = new RegExp(escapedPlaceholder, 'g');
    html = html.replace(regex, replacements[placeholder]);
  });

  // Verify no unreplaced placeholders
  const unreplaced = html.match(/\{\{[A-Z_]+\}\}/g);
  if (unreplaced) {
    console.error('❌ ERROR: Unreplaced placeholders found:', unreplaced);
    process.exit(1);
  }

  console.log('✓ Replaced all template placeholders');
  return html;
}

//=============================================================================
// PHASE 11: Validate Output
//=============================================================================

function validateOutput(html) {
  // Check for metadata artifacts
  if (html.includes('Picture Here') || html.includes('| metadata |')) {
    console.error('❌ ERROR: Metadata table artifacts found in output');
    return false;
  }

  // Check H1 count
  const h1Matches = html.match(/<h1[^>]*>/g);
  const h1Count = h1Matches ? h1Matches.length : 0;
  if (h1Count !== 1) {
    console.error(`❌ ERROR: Found ${h1Count} H1 headings (expected exactly 1)`);
    return false;
  }

  // Check for ASCII diagrams in code blocks
  if (/<pre[^>]*class="text"[^>]*><code>.*→.*<\/code>/.test(html)) {
    console.error('❌ ERROR: ASCII diagrams still present in code blocks');
    return false;
  }

  console.log('✓ Validation passed');
  return true;
}

//=============================================================================
// Main Execution
//=============================================================================

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node scripts/generate-blog-html.js <markdown-file-path> [output-filename]');
    console.error('  output-filename: Optional HTML filename (without .html extension)');
    process.exit(1);
  }

  const markdownPath = args[0];
  const customFilename = args[1]; // Optional custom filename
  console.log('\n🚀 Starting blog HTML generation (without pandoc)\n');

  // PHASE 1: Parse markdown source
  const markdown = parseMarkdownFile(markdownPath);

  // PHASE 2: Merge metadata
  const metadata = mergeMetadata(markdown);

  // Calculate output directory
  const derived = {
    topicSlug: metadata.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50)
      .replace(/^-|-$/g, '')
  };
  const outputDir = path.join(OUTPUT_BASE, derived.topicSlug);

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`✓ Created output directory: ${outputDir}`);
  }

  // PHASE 3: Strip metadata tables
  let cleanMarkdown = stripMetadataTables(markdown);

  // PHASE 4-5: Convert ASCII diagrams and extract inline SVGs
  const asciiResult = convertAsciiDiagrams(cleanMarkdown, outputDir);
  cleanMarkdown = asciiResult.markdown;

  // Extract inline SVGs (from preprocessing or original markdown)
  const inlineSvgResult = extractInlineSVGs(cleanMarkdown, outputDir);
  cleanMarkdown = inlineSvgResult.markdown;

  // Merge SVG file lists
  const svgFiles = [...asciiResult.svgFiles, ...inlineSvgResult.svgFiles];

  // PHASE 6: Convert to HTML
  let articleHTML = convertMarkdownToHTML(cleanMarkdown);

  // PHASE 7: Post-process HTML
  articleHTML = postProcessHTML(articleHTML);

  // PHASE 8: Generate TOC
  const tocHTML = generateTOC(cleanMarkdown);

  // PHASE 9: Calculate derived metadata
  const derivedMeta = calculateDerivedMetadata(metadata, articleHTML);

  // PHASE 10: Replace template placeholders
  const template = fs.readFileSync(TEMPLATE_HTML, 'utf8');
  const finalHTML = replaceTemplatePlaceholders(template, metadata, derivedMeta, tocHTML, articleHTML);

  // PHASE 11: Validate output
  if (!validateOutput(finalHTML)) {
    console.error('\n❌ Generation failed validation\n');
    process.exit(1);
  }

  // Write output files
  // Use custom filename if provided, otherwise default to 'index.html'
  const htmlFilename = customFilename ? `${customFilename}.html` : 'index.html';
  const htmlPath = path.join(outputDir, htmlFilename);
  fs.writeFileSync(htmlPath, finalHTML, 'utf8');

  if (customFilename) {
    console.log(`✓ Wrote: ${htmlPath} (custom filename: ${customFilename})`);
  } else {
    console.log(`✓ Wrote: ${htmlPath} (default: index.html)`);
  }

  // Copy CSS template
  const cssContent = fs.readFileSync(TEMPLATE_CSS, 'utf8');
  const cssPath = path.join(outputDir, 'styles.css');
  fs.writeFileSync(cssPath, cssContent, 'utf8');
  console.log(`✓ Wrote: ${cssPath}`);

  console.log(`\n✅ Blog HTML generation complete!\n`);
  console.log(`Output directory: ${outputDir}`);
  console.log(`Generated files:`);
  console.log(`  - ${htmlFilename} (${derivedMeta.wordCount} words, ${derivedMeta.readingTime} min read)`);
  console.log(`  - styles.css`);
  svgFiles.forEach(svg => console.log(`  - ${svg}`));
  console.log(`\nPublic URL: ${derivedMeta.ogUrl}`);

  if (customFilename) {
    console.log(`Note: Using custom filename "${customFilename}.html" instead of default "index.html"\n`);
  } else {
    console.log(`Note: Using default filename "index.html"\n`);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
