#!/usr/bin/env node

/**
 * Generate sitemap.xml for book appendices
 * Creates XML sitemap following sitemaps.org protocol
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://allabout.network/invisible-users/web';
const OUTPUT_DIR = path.join(__dirname, '..', 'invisible-users', 'manuscript', 'web');
const SITEMAP_FILE = path.join(OUTPUT_DIR, 'sitemap.xml');

// Current date in ISO format (YYYY-MM-DD)
const lastmod = new Date().toISOString().split('T')[0];

// URL entries with priorities
// Priority: 1.0 = highest, 0.5 = medium, 0.0 = lowest
const urls = [
  {
    loc: `${BASE_URL}/`,
    priority: '1.0',
    changefreq: 'monthly',
    description: 'Main index page'
  },
  {
    loc: `${BASE_URL}/index.html`,
    priority: '1.0',
    changefreq: 'monthly',
    description: 'Book Main Page'
  },
  {
    loc: `${BASE_URL}/appendix-index.html`,
    priority: '1.0',
    changefreq: 'monthly',
    description: 'Appendix Index HTML'
  },
  {
    loc: `${BASE_URL}/news.html`,
    priority: '0.9',
    changefreq: 'weekly',
    description: 'Project News and Updates'
  },
  {
    loc: `${BASE_URL}/faq.html`,
    priority: '0.9',
    changefreq: 'monthly',
    description: 'Frequently Asked Questions'
  },
  {
    loc: `${BASE_URL}/appendix-a.html`,
    priority: '0.9',
    changefreq: 'monthly',
    description: 'Implementation Cookbook'
  },
  {
    loc: `${BASE_URL}/appendix-b.html`,
    priority: '0.9',
    changefreq: 'monthly',
    description: 'Battle-Tested Lessons'
  },
  {
    loc: `${BASE_URL}/appendix-c.html`,
    priority: '0.8',
    changefreq: 'monthly',
    description: 'Web Audit Suite User Guide'
  },
  {
    loc: `${BASE_URL}/appendix-d.html`,
    priority: '0.9',
    changefreq: 'monthly',
    description: 'AI-Friendly HTML Guide'
  },
  {
    loc: `${BASE_URL}/appendix-e.html`,
    priority: '0.9',
    changefreq: 'monthly',
    description: 'AI Patterns Quick Reference'
  },
  {
    loc: `${BASE_URL}/appendix-f.html`,
    priority: '0.8',
    changefreq: 'monthly',
    description: 'Implementation Roadmap'
  },
  {
    loc: `${BASE_URL}/appendix-g.html`,
    priority: '0.8',
    changefreq: 'weekly',
    description: 'Resource Directory (updated frequently)'
  },
  {
    loc: `${BASE_URL}/appendix-h.html`,
    priority: '0.7',
    changefreq: 'yearly',
    description: 'Example llms.txt File'
  },
  {
    loc: `${BASE_URL}/appendix-i.html`,
    priority: '0.7',
    changefreq: 'yearly',
    description: 'Pipeline Failure Case Study'
  },
  {
    loc: `${BASE_URL}/appendix-j.html`,
    priority: '0.9',
    changefreq: 'weekly',
    description: 'Industry Developments (updated frequently)'
  },
  {
    loc: `${BASE_URL}/appendix-k.html`,
    priority: '0.8',
    changefreq: 'monthly',
    description: 'Common Page Patterns'
  },
  {
    loc: `${BASE_URL}/appendix-l.html`,
    priority: '0.9',
    changefreq: 'monthly',
    description: 'Proposed AI Metadata Patterns'
  }
];

// Generate XML sitemap
function generateSitemap() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

  return xml;
}

// Write sitemap to file
function writeSitemap() {
  try {
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      console.error(`Error: Output directory does not exist: ${OUTPUT_DIR}`);
      process.exit(1);
    }

    const xml = generateSitemap();
    fs.writeFileSync(SITEMAP_FILE, xml, 'utf8');

    console.log(`✓ Generated sitemap.xml`);
    console.log(`  Location: ${SITEMAP_FILE}`);
    console.log(`  URLs: ${urls.length}`);
    console.log(`  Last modified: ${lastmod}`);

    return true;
  } catch (error) {
    console.error(`Error writing sitemap: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  writeSitemap();
}

module.exports = { generateSitemap, writeSitemap };
