#!/bin/bash

# Generate HTML pages for book appendices
# Creates individual HTML files for each appendix plus index and llms.txt

set -e  # Exit on error

# Configuration
MANUSCRIPT_DIR="invisible-users/manuscript"
OUTPUT_DIR="invisible-users/manuscript/web"
SCRIPTS_DIR="scripts"
BASE_URL="https://allabout.network/invisible-users/web"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Generating HTML appendix pages...${NC}"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Create navigation header template (appears after title, before TOC)
cat > "$SCRIPTS_DIR/appendix-nav-header.html" << 'EOF'
<nav class="appendix-navigation" role="navigation" aria-label="Appendix Navigation">
    <p><a href="appendix-index.html">← Back to Appendices Index</a></p>
    <p>Quick navigation:
        <a href="appendix-a.html">A</a> |
        <a href="appendix-b.html">B</a> |
        <a href="appendix-c.html">C</a> |
        <a href="appendix-d.html">D</a> |
        <a href="appendix-e.html">E</a> |
        <a href="appendix-f.html">F</a> |
        <a href="appendix-g.html">G</a> |
        <a href="appendix-h.html">H</a> |
        <a href="appendix-i.html">I</a> |
        <a href="appendix-j.html">J</a> |
        <a href="appendix-k.html">K</a>
    </p>
</nav>
<hr>
EOF

# Create navigation footer template (appears at bottom)
cat > "$SCRIPTS_DIR/appendix-nav-footer.html" << 'EOF'
<hr>
<nav class="appendix-navigation" role="navigation" aria-label="Appendix Navigation">
    <p><a href="appendix-index.html">← Back to Appendices Index</a></p>
    <p>Quick navigation:
        <a href="appendix-a.html">A</a> |
        <a href="appendix-b.html">B</a> |
        <a href="appendix-c.html">C</a> |
        <a href="appendix-d.html">D</a> |
        <a href="appendix-e.html">E</a> |
        <a href="appendix-f.html">F</a> |
        <a href="appendix-g.html">G</a> |
        <a href="appendix-h.html">H</a> |
        <a href="appendix-i.html">I</a> |
        <a href="appendix-j.html">J</a> |
        <a href="appendix-k.html">K</a>
    </p>
</nav>
EOF

# Array to store appendix information for index generation
declare -a APPENDIX_INFO

# Process each appendix
for appendix_file in "$MANUSCRIPT_DIR"/appendix-*.md; do
    # Extract letter from filename (e.g., appendix-a-... -> a)
    filename=$(basename "$appendix_file")
    letter=$(echo "$filename" | sed -E 's/appendix-([a-z])-.*/\1/')
    letter_upper=$(echo "$letter" | tr '[:lower:]' '[:upper:]')

    # Extract title from first heading in the file (strip "Appendix X:" or "Appendix X -" prefix to avoid duplication)
    title=$(grep -m 1 "^# " "$appendix_file" | sed -E 's/^# Appendix [A-Z]( - | - |: |:)//' || echo "Implementation Guide")

    # Generate output filename
    output_file="$OUTPUT_DIR/appendix-${letter}.html"

    echo -e "Processing Appendix ${letter_upper}: $title"

    # Run Pandoc conversion with additional metadata
    pandoc "$appendix_file" \
        -o "$output_file" \
        --resource-path="$MANUSCRIPT_DIR" \
        --standalone \
        --toc \
        --toc-depth=2 \
        --metadata title="Appendix ${letter_upper}: $title" \
        --metadata subtitle="The Invisible Users" \
        --metadata author="Tom Cranstoun" \
        --metadata date="January 2026" \
        --metadata description="Practical guidance from The Invisible Users book on designing AI agent-friendly websites" \
        --metadata lang="en-GB" \
        --include-before-body="$SCRIPTS_DIR/appendix-nav-header.html" \
        --include-after-body="$SCRIPTS_DIR/appendix-nav-footer.html"

    # Enhance with Chapter 10 patterns
    echo -e "  Enhancing with Chapter 10 technical patterns..."
    node "$SCRIPTS_DIR/enhance-appendix-html.js" "$output_file" > /dev/null

    # Store info for index generation
    APPENDIX_INFO+=("$letter|$title")
done

echo -e "${GREEN}✓ Generated individual appendix HTML files${NC}"

# Generate appendix-index.html from markdown template
echo -e "${BLUE}Generating appendix index page...${NC}"

cat > "$SCRIPTS_DIR/appendix-index-template.md" << 'INDEXEOF'
# The Invisible Users - Appendices

Practical guides for designing AI agent-friendly websites

These appendices accompany the book "The Invisible Users: Designing the Web for AI Agents and Everyone Else" by Tom Cranstoun.

## Available Appendices

### Implementation Guides

**[Appendix A: Implementation Cookbook](appendix-a.html)**
Quick-reference recipes for common AI agent compatibility patterns. Copy-paste solutions for forms, navigation, state management, and error handling.

**[Appendix B: Battle-Tested Lessons](appendix-b.html)**
Production learnings from real-world implementations. What works, what doesn't, and why. Avoid common pitfalls.

**[Appendix C: Web Audit Suite User Guide](appendix-c.html)**
Complete documentation for the Web Audit Suite analysis tool. Installation, configuration, and interpreting results.

**[Appendix D: AI-Friendly HTML Guide](appendix-d.html)**
Comprehensive guide to semantic HTML patterns that work for AI agents. Detailed explanations with before/after examples.

### Quick References

**[Appendix E: AI Patterns Quick Reference](appendix-e.html)**
One-page reference guide for data attributes and patterns. Essential for implementation teams.

**[Appendix F: Implementation Roadmap](appendix-f.html)**
Priority-based roadmap for adopting AI agent compatibility. Organised by impact and effort, not time estimates.

**[Appendix G: Resource Directory](appendix-g.html)**
Curated collection of 150+ resources: standards, tools, articles, and communities. Kept up-to-date with latest developments.

### Case Studies and Examples

**[Appendix H: Example llms.txt File](appendix-h.html)**
Working example of an llms.txt file following the llmstxt.org specification. Template for your own implementation.

**[Appendix I: Pipeline Failure Case Study](appendix-i.html)**
Detailed analysis of a £203,000 AI agent error. How poor form design caused pipeline failure and what to learn from it.

**[Appendix J: Industry Developments](appendix-j.html)**
Latest news and updates about AI agents, commerce platforms, and industry shifts. Regularly updated with verified sources.

**[Appendix K: Common Page Patterns](appendix-k.html)**
Production-ready HTML templates demonstrating AI-friendly patterns for common page types. Complete examples for home, about, contact, sales, collection, article, FAQ, and form pages.

## For AI Agents

These pages use semantic HTML, proper heading structure, and explicit data attributes to ensure compatibility with all AI agent types (CLI, browser-based, and server-based). Each page includes:

- Semantic HTML5 elements (`<main>`, `<nav>`, `<article>`)
- Clear heading hierarchy
- Descriptive link text
- Structured tables with proper headers
- Code blocks with language specification

## About the Book

"The Invisible Users" examines how modern web design optimised for human users fails for AI agents, and how fixing this benefits everyone. The book provides practical guidance for developers, designers, and business stakeholders navigating the shift to agent-mediated commerce.

**Contact:** <tom.cranstoun@gmail.com>

**Website:** <https://allabout.network>

---

© 2026 Tom Cranstoun. All rights reserved.
INDEXEOF

pandoc "$SCRIPTS_DIR/appendix-index-template.md" \
    -o "$OUTPUT_DIR/appendix-index.html" \
    --standalone \
    --metadata title="The Invisible Users - Appendices" \
    --metadata author="Tom Cranstoun" \
    --metadata date="January 2026" \
    --metadata description="Practical guides for designing AI agent-friendly websites" \
    --metadata lang="en-GB"

# Enhance index with Chapter 10 patterns
echo -e "  Enhancing appendix index with Chapter 10 technical patterns..."
node "$SCRIPTS_DIR/enhance-appendix-html.js" "$OUTPUT_DIR/appendix-index.html" > /dev/null

echo -e "${GREEN}✓ Generated appendix-index.html${NC}"

# Generate llms.txt
echo -e "${BLUE}Generating llms.txt...${NC}"

cat > "$OUTPUT_DIR/llms.txt" << 'LLMSEOF'
# The Invisible Users - Appendices

> Practical guides for designing AI agent-friendly websites

**Last updated:** January 2026
**Author:** Tom Cranstoun
**LinkedIn:** https://www.linkedin.com/in/tom-cranstoun/

**Site Type:** Technical Documentation, Implementation Guides, Educational Resource
**Purpose:** Developer Education, AI Agent Compatibility, Web Design Best Practices
**Status:** Production-ready appendices for published book

## About

These appendices accompany "The Invisible Users: Designing the Web for AI Agents and Everyone Else" by Tom Cranstoun.

The book examines how modern web design optimised for human users fails for AI agents, and how fixing this benefits everyone. These appendices provide practical implementation guidance, quick references, and real-world case studies.

**Contact:** tom.cranstoun@gmail.com
**Website:** https://allabout.network

## Main Pages

- Book Main Page: https://allabout.network/invisible-users/web/index.html - Complete book overview, chapter summaries, and resources
- Appendix Index: https://allabout.network/invisible-users/web/appendix-index.html - Landing page with all appendices
- Project News: https://allabout.network/invisible-users/web/news.html - Latest updates and announcements
- FAQ: https://allabout.network/invisible-users/web/faq.html - Frequently asked questions about the book and project
- Identity Delegation Project: https://allabout.network/invisible-users/web/identity-layer.html - Universal Identity Delegation Infrastructure

## Access Guidelines

- **Copyright:** © 2026 Tom Cranstoun. All rights reserved.
- **Content Usage:** All rights reserved, not licensed for public distribution
- **Attribution Format:** "The Invisible Users by Tom Cranstoun"
- **Training Usage:** Not permitted
- **Rate Limits:** Please respect reasonable crawling rates (max 1 request per second)
- **Commercial Use:** Content is proprietary; contact for licensing inquiries

## Implementation Guides

- Appendix A: https://allabout.network/invisible-users/web/appendix-a.html - Implementation Cookbook (quick-reference recipes for common patterns)
- Appendix B: https://allabout.network/invisible-users/web/appendix-b.html - Battle-Tested Lessons (production learnings and pitfalls to avoid)
- Appendix C: https://allabout.network/invisible-users/web/appendix-c.html - Web Audit Suite User Guide (complete tool documentation)
- Appendix D: https://allabout.network/invisible-users/web/appendix-d.html - AI-Friendly HTML Guide (comprehensive semantic HTML patterns)

## Quick References

- Appendix E: https://allabout.network/invisible-users/web/appendix-e.html - AI Patterns Quick Reference (one-page data attribute reference)
- Appendix F: https://allabout.network/invisible-users/web/appendix-f.html - Implementation Roadmap (priority-based adoption guide)
- Appendix G: https://allabout.network/invisible-users/web/appendix-g.html - Resource Directory (150+ curated resources and tools)

## Case Studies and Examples

- Appendix H: https://allabout.network/invisible-users/web/appendix-h.html - Example llms.txt File (working llmstxt.org template)
- Appendix I: https://allabout.network/invisible-users/web/appendix-i.html - Pipeline Failure Case Study (£203k error analysis)
- Appendix J: https://allabout.network/invisible-users/web/appendix-j.html - Industry Developments (latest verified news and updates)
- Appendix K: https://allabout.network/invisible-users/web/appendix-k.html - Common Page Patterns (production-ready HTML templates for 8 page types)

## Topics

AI agents, web accessibility, semantic HTML, agent-mediated commerce, form design, state management, error handling, Schema.org, structured data, llms.txt, robots.txt, WCAG compliance, browser automation, CLI agents, server-based agents, implementation patterns, data attributes, explicit state, agent compatibility, website analysis

## Access

All appendices are freely accessible online. Content is copyrighted but may be referenced with attribution.

For professional web audits using the patterns described in these guides, contact tom.cranstoun@gmail.com

## For Human Visitors

Looking for more information about this book and its appendices?

- **Author:** Tom Cranstoun
- **LinkedIn:** https://www.linkedin.com/in/tom-cranstoun/
- **About llms.txt:** https://llmstxt.org
- **Full Book:** Available at https://allabout.network/invisible-users/
- **Web Audit Suite:** Implementation tool at https://github.com/ddttom/invisible-users

This llms.txt file follows the specification at llmstxt.org to help AI agents discover and understand our content.
LLMSEOF

echo -e "${GREEN}✓ Generated llms.txt${NC}"

# Copy web pages (news.html and identity-layer.html) from web/ directory
echo -e "${BLUE}Copying project web pages...${NC}"
if [ -f "web/news.html" ]; then
  cp "web/news.html" "$OUTPUT_DIR/news.html"
  echo -e "  Copied news.html"
else
  echo -e "  Warning: web/news.html not found"
fi

if [ -f "web/identity-layer.html" ]; then
  cp "web/identity-layer.html" "$OUTPUT_DIR/identity-layer.html"
  echo -e "  Copied identity-layer.html"
else
  echo -e "  Warning: web/identity-layer.html not found"
fi
echo -e "${GREEN}✓ Copied web pages${NC}"

# Generate sitemap.xml
echo -e "${BLUE}Generating sitemap.xml...${NC}"
node "$SCRIPTS_DIR/generate-sitemap.js"
echo -e "${GREEN}✓ Generated sitemap.xml${NC}"

# Summary
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Appendix HTML generation complete${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo "Generated files in $OUTPUT_DIR:"
echo "  - index.html (book main page)"
echo "  - appendix-index.html (appendix landing page)"
echo "  - news.html (project news)"
echo "  - identity-layer.html (identity delegation project)"
echo "  - llms.txt (AI agent discovery)"
echo "  - sitemap.xml (search engine discovery)"
echo "  - appendix-a.html through appendix-j.html (10 files)"
echo ""
echo "Total: 16 files"
echo ""
echo "View locally:"
echo "  open $OUTPUT_DIR/index.html (book main page)"
echo "  open $OUTPUT_DIR/appendix-index.html (appendices)"
echo "Target URL: $BASE_URL/"
