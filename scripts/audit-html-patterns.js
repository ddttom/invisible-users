#!/usr/bin/env node

/**
 * HTML Pattern Audit Script
 *
 * Scans all HTML files in repository to detect:
 * - AI meta tags (proposed patterns)
 * - data-agent-visible (proposed pattern)
 * - Schema.org JSON-LD (established)
 * - Semantic HTML5 elements (established)
 * - Data attributes (various)
 * - ARIA roles (established)
 *
 * Generates comprehensive markdown report.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Recursively find all HTML files
function findHTMLFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules, .git, and web-audit-suite
      if (file !== 'node_modules' && file !== '.git' && file !== 'web-audit-suite') {
        findHTMLFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Pattern definitions
const PATTERNS = {
  aiMeta: {
    name: 'AI Meta Tags',
    status: 'proposed',
    tags: [
      'ai-preferred-access',
      'ai-content-policy',
      'ai-freshness',
      'ai-structured-data',
      'ai-attribution',
      'llms-txt'
    ]
  },
  dataAgentVisible: {
    name: 'data-agent-visible',
    status: 'proposed',
    pattern: /data-agent-visible\s*=/g
  },
  schemaOrg: {
    name: 'Schema.org JSON-LD',
    status: 'established',
    pattern: /"@context"\s*:\s*"https:\/\/schema\.org"/g
  },
  semanticHTML: {
    name: 'Semantic HTML5',
    status: 'established',
    elements: ['<main', '<nav', '<article', '<aside', '<header', '<footer', '<section']
  },
  dataState: {
    name: 'Data State Attributes',
    status: 'established',
    attributes: [
      'data-state',
      'data-validation-state',
      'data-authenticated',
      'data-load-state'
    ]
  },
  dataProduct: {
    name: 'Data Product Attributes',
    status: 'established',
    attributes: [
      'data-product-id',
      'data-price',
      'data-currency',
      'data-in-stock',
      'data-quantity'
    ]
  },
  ariaRoles: {
    name: 'ARIA Roles',
    status: 'established',
    pattern: /role="(main|navigation|contentinfo|complementary|banner|alert|status)"/g
  },
  canonical: {
    name: 'Canonical URL',
    status: 'established',
    pattern: /<link\s+rel="canonical"/g
  }
};

// Scan single HTML file
function scanHTMLFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const results = {
    file: filePath,
    patterns: {}
  };

  // Check AI meta tags
  results.patterns.aiMeta = {
    present: false,
    tags: []
  };
  PATTERNS.aiMeta.tags.forEach(tag => {
    if (content.includes(`name="${tag}"`) || content.includes(`name='${tag}'`)) {
      results.patterns.aiMeta.present = true;
      results.patterns.aiMeta.tags.push(tag);
    }
  });

  // Check data-agent-visible
  const agentVisibleMatches = content.match(PATTERNS.dataAgentVisible.pattern) || [];
  results.patterns.dataAgentVisible = {
    present: agentVisibleMatches.length > 0,
    count: agentVisibleMatches.length
  };

  // Check Schema.org
  const schemaMatches = content.match(PATTERNS.schemaOrg.pattern) || [];
  results.patterns.schemaOrg = {
    present: schemaMatches.length > 0,
    count: schemaMatches.length
  };

  // Check semantic HTML
  results.patterns.semanticHTML = {
    present: false,
    elements: []
  };
  PATTERNS.semanticHTML.elements.forEach(element => {
    if (content.includes(element)) {
      results.patterns.semanticHTML.present = true;
      results.patterns.semanticHTML.elements.push(element.replace('<', ''));
    }
  });

  // Check data state attributes
  results.patterns.dataState = {
    present: false,
    attributes: []
  };
  PATTERNS.dataState.attributes.forEach(attr => {
    if (content.includes(attr)) {
      results.patterns.dataState.present = true;
      results.patterns.dataState.attributes.push(attr);
    }
  });

  // Check data product attributes
  results.patterns.dataProduct = {
    present: false,
    attributes: []
  };
  PATTERNS.dataProduct.attributes.forEach(attr => {
    if (content.includes(attr)) {
      results.patterns.dataProduct.present = true;
      results.patterns.dataProduct.attributes.push(attr);
    }
  });

  // Check ARIA roles
  const ariaMatches = content.match(PATTERNS.ariaRoles.pattern) || [];
  results.patterns.ariaRoles = {
    present: ariaMatches.length > 0,
    count: ariaMatches.length
  };

  // Check canonical
  results.patterns.canonical = {
    present: PATTERNS.canonical.pattern.test(content)
  };

  return results;
}

// Generate markdown report
function generateReport(scanResults) {
  let report = '# HTML Pattern Implementation Audit Report\n\n';
  report += `**Generated:** ${new Date().toISOString().split('T')[0]}\n\n`;
  report += `**Files Audited:** ${scanResults.length}\n\n`;

  // Executive summary
  report += '## Executive Summary\n\n';

  const summary = {
    aiMeta: 0,
    dataAgentVisible: 0,
    schemaOrg: 0,
    semanticHTML: 0,
    dataState: 0,
    dataProduct: 0,
    ariaRoles: 0,
    canonical: 0
  };

  scanResults.forEach(result => {
    if (result.patterns.aiMeta.present) summary.aiMeta++;
    if (result.patterns.dataAgentVisible.present) summary.dataAgentVisible++;
    if (result.patterns.schemaOrg.present) summary.schemaOrg++;
    if (result.patterns.semanticHTML.present) summary.semanticHTML++;
    if (result.patterns.dataState.present) summary.dataState++;
    if (result.patterns.dataProduct.present) summary.dataProduct++;
    if (result.patterns.ariaRoles.present) summary.ariaRoles++;
    if (result.patterns.canonical.present) summary.canonical++;
  });

  report += '| Pattern | Files Using | Percentage | Status |\n';
  report += '| ------- | ----------- | ---------- | ------ |\n';

  Object.keys(summary).forEach(pattern => {
    const count = summary[pattern];
    const percentage = ((count / scanResults.length) * 100).toFixed(1);
    const patternName = formatPatternName(pattern);
    const status = getPatternStatus(pattern);
    report += `| ${patternName} | ${count} | ${percentage}% | ${status} |\n`;
  });

  report += '\n';

  // Detailed analysis by location
  report += '## Detailed Analysis by Location\n\n';

  const locations = {
    appendices: scanResults.filter(r => r.file.includes('/web/appendix-')),
    starterKit: scanResults.filter(r => r.file.includes('/agent-friendly-starter-kit/')),
    codeExamples: scanResults.filter(r => r.file.includes('/code-examples/')),
    demoSite: scanResults.filter(r => r.file.includes('/web/site/')),
    mainRepo: scanResults.filter(r => r.file.includes('/web/') && !r.file.includes('/web/site/') && !r.file.includes('/web/appendix-'))
  };

  Object.keys(locations).forEach(location => {
    report += `### ${formatLocationName(location)}\n\n`;
    report += `**Files:** ${locations[location].length}\n\n`;

    if (locations[location].length === 0) {
      report += '*No files found in this location.*\n\n';
      return;
    }

    // Pattern presence table
    report += '| File | AI Meta | data-agent-visible | Schema.org | Semantic HTML |\n';
    report += '| ---- | ------- | ------------------ | ---------- | ------------- |\n';

    locations[location].forEach(result => {
      const fileName = path.basename(result.file);
      const aiMeta = result.patterns.aiMeta.present ? '✓' : '-';
      const agentVisible = result.patterns.dataAgentVisible.present ? '✓' : '-';
      const schema = result.patterns.schemaOrg.present ? '✓' : '-';
      const semantic = result.patterns.semanticHTML.present ? '✓' : '-';

      report += `| ${fileName} | ${aiMeta} | ${agentVisible} | ${schema} | ${semantic} |\n`;
    });

    report += '\n';
  });

  // Pattern documentation cross-reference
  report += '## Pattern Documentation Cross-Reference\n\n';

  report += '### AI Meta Tags (Proposed Pattern)\n\n';
  report += '**Documented in:**\n';
  report += '- Appendix L: Proposed AI Metadata Patterns (complete specification)\n';
  report += '- Appendix D: AI-Friendly HTML Guide (lines 1556-1568)\n';
  report += '- Chapter 11: Technical Advice\n\n';
  report += '**Implemented in:**\n';
  const aiMetaFiles = scanResults.filter(r => r.patterns.aiMeta.present);
  if (aiMetaFiles.length > 0) {
    aiMetaFiles.forEach(r => {
      const relPath = r.file.replace(/^.*invisible-users\//, '');
      report += `- ${relPath} (${r.patterns.aiMeta.tags.length} tags)\n`;
    });
  } else {
    report += '- None found\n';
  }
  report += '\n';

  report += '### data-agent-visible (Proposed Pattern)\n\n';
  report += '**Documented in:**\n';
  report += '- Appendix L: Proposed AI Metadata Patterns (complete specification)\n';
  report += '- Appendix D: AI-Friendly HTML Guide (lines 1294-1326)\n\n';
  report += '**Implemented in:**\n';
  const agentVisibleFiles = scanResults.filter(r => r.patterns.dataAgentVisible.present);
  if (agentVisibleFiles.length > 0) {
    agentVisibleFiles.forEach(r => {
      const relPath = r.file.replace(/^.*invisible-users\//, '');
      report += `- ${relPath} (${r.patterns.dataAgentVisible.count} occurrences)\n`;
    });
  } else {
    report += '- None found (opportunity for implementation)\n';
  }
  report += '\n';

  // Gaps and recommendations
  report += '## Implementation Gaps and Recommendations\n\n';

  report += '### Files with Documentation but No Implementation\n\n';
  const docsWithoutImpl = scanResults.filter(r =>
    (r.file.includes('/appendix-') || r.file.includes('/chapter-')) &&
    !r.patterns.aiMeta.present &&
    !r.patterns.dataAgentVisible.present
  );

  if (docsWithoutImpl.length > 0) {
    report += 'Documentation files that discuss patterns but don\'t implement them:\n\n';
    docsWithoutImpl.forEach(r => {
      report += `- ${path.basename(r.file)}\n`;
    });
  } else {
    report += 'All documentation files implement the patterns they describe. ✓\n';
  }
  report += '\n';

  report += '### Recommendations\n\n';
  report += '**Priority 1 (Critical):**\n';
  report += '1. Ensure all generated appendices have AI meta tags (automated by enhancement script)\n';
  report += '2. Add data-agent-visible to e-commerce examples with purchase flows\n';
  report += '3. Verify Schema.org JSON-LD in all product/article pages\n\n';

  report += '**Priority 2 (Important):**\n';
  report += '1. Add semantic HTML5 elements to all code examples\n';
  report += '2. Ensure data state attributes in all interactive examples\n';
  report += '3. Add ARIA roles to navigation and main content areas\n\n';

  report += '**Priority 3 (Nice to Have):**\n';
  report += '1. Standardise AI meta tag values across all files\n';
  report += '2. Add canonical URLs to all demo pages\n';
  report += '3. Document any custom data attributes not in Appendix E\n\n';

  return report;
}

// Helper functions
function getPatternStatus(pattern) {
  const statusMap = {
    aiMeta: 'Proposed',
    dataAgentVisible: 'Proposed',
    schemaOrg: 'Established',
    semanticHTML: 'Established',
    dataState: 'Established',
    dataProduct: 'Established',
    ariaRoles: 'Established',
    canonical: 'Established'
  };
  return statusMap[pattern] || 'Unknown';
}

function formatPatternName(pattern) {
  const names = {
    aiMeta: 'AI Meta Tags',
    dataAgentVisible: 'data-agent-visible',
    schemaOrg: 'Schema.org JSON-LD',
    semanticHTML: 'Semantic HTML5',
    dataState: 'Data State Attributes',
    dataProduct: 'Data Product Attributes',
    ariaRoles: 'ARIA Roles',
    canonical: 'Canonical URLs'
  };
  return names[pattern] || pattern;
}

function formatLocationName(location) {
  const names = {
    appendices: 'Generated Appendices (manuscript/web/appendix-*.html)',
    starterKit: 'Agent-Friendly Starter Kit (good vs bad examples)',
    codeExamples: 'Code Examples (teaching examples)',
    demoSite: 'Demo Site (production-ready pages)',
    mainRepo: 'Main Repository (news, FAQ, index)'
  };
  return names[location] || location;
}

// Main execution
function main() {
  console.log('Starting HTML pattern audit...\n');

  const repoRoot = path.resolve(__dirname, '..');

  // Find all HTML files
  const htmlFiles = findHTMLFiles(repoRoot);

  console.log(`Found ${htmlFiles.length} HTML files\n`);

  // Scan each file
  const scanResults = htmlFiles.map(file => scanHTMLFile(file));

  // Generate report
  const report = generateReport(scanResults);

  // Write report
  const reportPath = path.join(repoRoot, 'invisible-users/manuscript/PATTERN-AUDIT-REPORT.md');
  fs.writeFileSync(reportPath, report, 'utf8');

  console.log(`✓ Audit complete`);
  console.log(`✓ Report generated: ${reportPath}`);
  console.log(`\nSummary:`);
  console.log(`  - Files audited: ${htmlFiles.length}`);
  console.log(`  - Report length: ${report.split('\n').length} lines`);
}

// Run
main();
