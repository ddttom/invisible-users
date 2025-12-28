#!/usr/bin/env node

/**
 * Generate query-index.json for Static Site Generators
 * Works with Hugo, Jekyll, Gatsby, or any static site with markdown files
 *
 * Usage: node generate-index.js
 */

const fs = require('fs');
const path = require('path');

// CONFIGURE THESE PATHS
const CONTENT_DIR = './content/posts'; // Change to your content directory
const OUTPUT_FILE = './public/query-index.json'; // Output location

// Helper: Parse frontmatter from markdown file
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return {};

  const frontmatter = {};
  const lines = match[1].split('\n');

  lines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');

      // Handle arrays (tags, categories)
      if (value.startsWith('[') && value.endsWith(']')) {
        frontmatter[key.trim()] = value
          .slice(1, -1)
          .split(',')
          .map(item => item.trim().replace(/^["']|["']$/g, ''));
      } else {
        frontmatter[key.trim()] = value;
      }
    }
  });

  return frontmatter;
}

// Main generation function
function generateIndex() {
  console.log('📚 Generating query-index.json for static site...\n');

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Error: Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));
  console.log(`Found ${files.length} markdown files\n`);

  const data = files.map(file => {
    const filePath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);

    // Generate slug from filename
    const slug = file.replace('.md', '');

    return {
      path: `/blog/${slug}`,
      title: frontmatter.title || slug,
      description: frontmatter.description || '',
      category: frontmatter.category || '',
      tags: frontmatter.tags || [],
      author: frontmatter.author || '',
      lastModified: frontmatter.date
        ? Math.floor(new Date(frontmatter.date).getTime() / 1000)
        : Math.floor(Date.now() / 1000),
      image: frontmatter.image || ''
    };
  });

  const output = {
    total: data.length,
    offset: 0,
    limit: data.length,
    data
  };

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

  console.log(`✅ Generated ${OUTPUT_FILE} with ${data.length} entries`);
  console.log(`   Total size: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2)} KB`);
}

// Run generator
try {
  generateIndex();
} catch (error) {
  console.error('Error generating index:', error.message);
  process.exit(1);
}
