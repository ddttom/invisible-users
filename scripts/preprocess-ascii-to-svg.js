#!/usr/bin/env node
/**
 * ASCII Diagram to High-Quality SVG Preprocessor
 *
 * Intelligently parses ASCII diagrams and converts them to professional SVG
 * with boxes, arrows, and proper MX brand styling.
 *
 * Usage: node scripts/preprocess-ascii-to-svg.js <markdown-file>
 */

const fs = require('fs');

function detectAsciiDiagram(codeBlock) {
  const hasArrows = /[→↓↑←]/.test(codeBlock);
  const isMultiLine = codeBlock.split('\n').length > 1;
  return hasArrows && isMultiLine;
}

function parseAsciiStructure(asciiText) {
  const lines = asciiText.split('\n').filter(l => l.trim());
  const nodes = [];
  const arrows = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Detect arrows
    if (/^[→↓↑←\s]+$/.test(trimmed)) {
      const direction = trimmed.includes('→') ? 'right' :
                       trimmed.includes('↓') ? 'down' :
                       trimmed.includes('↑') ? 'up' : 'left';
      const count = (trimmed.match(/[→↓↑←]/g) || []).length;
      arrows.push({ direction, count, lineIndex: index });
    }
    // Detect text nodes (boxes)
    else if (trimmed.length > 0) {
      nodes.push({ text: trimmed, lineIndex: index });
    }
  });

  return { nodes, arrows };
}

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateHighQualitySVG(structure, index) {
  const { nodes, arrows } = structure;

  // Calculate layout
  const boxWidth = 400;
  const boxHeight = 50;
  const boxSpacing = 80;
  const padding = 50;

  const width = boxWidth + padding * 2;
  const height = nodes.length * (boxHeight + boxSpacing) - boxSpacing + padding * 2;

  // Generate title from first node
  const title = nodes.length > 0 ? nodes[0].text.substring(0, 60) : `Flow Diagram ${index}`;

  let svgContent = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <title>${escapeXml(title)}</title>
  <desc>Flow diagram showing process steps</desc>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="#f8f9fa"/>

  <!-- Arrow marker definition -->
  <defs>
    <marker id="arrowhead-${index}" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#0066cc"/>
    </marker>
  </defs>

`;

  // Generate boxes and arrows
  nodes.forEach((node, i) => {
    const y = padding + i * (boxHeight + boxSpacing);
    const x = padding;

    // Draw box
    svgContent += `  <!-- ${node.text} -->
  <rect x="${x}" y="${y}" width="${boxWidth}" height="${boxHeight}"
        fill="#ffffff" stroke="#0066cc" stroke-width="2" rx="4"/>
  <text x="${x + boxWidth/2}" y="${y + boxHeight/2 + 5}"
        font-family="Arial, sans-serif" font-size="14"
        text-anchor="middle" fill="#2c3e50">${escapeXml(node.text)}</text>

`;

    // Draw arrow to next node
    if (i < nodes.length - 1) {
      const arrowY = y + boxHeight + 10;
      const nextY = y + boxHeight + boxSpacing - 10;

      svgContent += `  <!-- Arrow from ${i} to ${i+1} -->
  <path d="M ${x + boxWidth/2} ${arrowY} L ${x + boxWidth/2} ${nextY}"
        stroke="#0066cc" stroke-width="2"
        marker-end="url(#arrowhead-${index})"/>

`;
    }
  });

  // Handle multi-branch arrows (↓ ↓ ↓ pattern)
  arrows.forEach((arrow) => {
    if (arrow.count > 1) {
      // Find the source node (node before this arrow)
      const sourceNodeIndex = nodes.findIndex(n => n.lineIndex < arrow.lineIndex);
      const targetNodes = nodes.filter(n => n.lineIndex > arrow.lineIndex);

      if (sourceNodeIndex >= 0 && targetNodes.length > 0) {
        const sourceY = padding + sourceNodeIndex * (boxHeight + boxSpacing) + boxHeight;
        const sourceX = padding + boxWidth/2;

        // Split into multiple branches
        const branchSpacing = boxWidth / (arrow.count + 1);
        for (let b = 1; b <= arrow.count; b++) {
          const branchX = padding + b * branchSpacing;
          svgContent += `  <!-- Multi-branch arrow ${b} -->
  <path d="M ${sourceX} ${sourceY + 10} L ${branchX} ${sourceY + 30}"
        stroke="#0066cc" stroke-width="2"
        marker-end="url(#arrowhead-${index})"/>

`;
        }
      }
    }
  });

  svgContent += `</svg>`;

  return svgContent;
}

function preprocessMarkdown(markdown) {
  let processed = markdown;
  const asciiRegex = /```(?:text|plaintext)?\n([\s\S]*?)\n```/g;
  let match;
  let index = 1;

  const matches = [];
  while ((match = asciiRegex.exec(markdown)) !== null) {
    matches.push(match);
  }

  // Process in reverse to avoid position shifts
  matches.reverse().forEach((match) => {
    const codeContent = match[1];

    if (detectAsciiDiagram(codeContent)) {
      // Parse ASCII structure
      const structure = parseAsciiStructure(codeContent);

      // Generate high-quality SVG
      const svg = generateHighQualitySVG(structure, index);

      // Replace in markdown
      processed = processed.replace(match[0], svg);
      console.log(`✓ Converted ASCII diagram ${index}: ${structure.nodes.length} nodes, ${structure.arrows.length} arrow lines`);
      index++;
    }
  });

  return processed;
}

// Main
function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node scripts/preprocess-ascii-to-svg.js <markdown-file>');
    process.exit(1);
  }

  const filePath = args[0];
  console.log('\n🔄 Pre-processing ASCII diagrams...\n');

  if (!fs.existsSync(filePath)) {
    console.error(`❌ ERROR: File not found: ${filePath}`);
    process.exit(1);
  }

  const markdown = fs.readFileSync(filePath, 'utf8');
  const processed = preprocessMarkdown(markdown);
  fs.writeFileSync(filePath, processed, 'utf8');

  console.log('\n✅ Pre-processing complete: ASCII diagrams converted to high-quality inline SVG\n');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { preprocessMarkdown, parseAsciiStructure, generateHighQualitySVG };
