# create-blog (v2 - Efficient)

Transform markdown blog posts into semantic, AI-agent-friendly HTML using the automated build script.

## When to Use

Use this skill when the user provides a markdown blog file path (typically in `outputs/bible/blogs/`) and wants to generate a complete HTML blog post following Machine Experience (MX) patterns.

## Arguments

- **Blog file path** (required): Path to markdown file containing blog post

## Workflow

### Step 1: Pre-Process ASCII Diagrams (if present)

If the markdown contains ASCII diagrams in code blocks, run the preprocessor first:

```bash
node scripts/preprocess-ascii-to-svg.js <markdown-file-path>
```

**What this does:**

- Converts ASCII diagrams to high-quality inline SVG in the markdown source (in-place modification)
- Intelligently parses structure (text nodes and arrows)
- Generates professional SVG with boxes, arrows, and MX brand styling
- Detects diagrams by presence of arrow characters: `→`, `↓`, `↑`, `←`

### Step 2: Generate Blog HTML

Execute the automated blog generation script:

```bash
node scripts/generate-blog-html.js <markdown-file-path>
```

**What the script does automatically:**

- Parses YAML frontmatter and metadata tables
- Extracts bio catch text for blog introduction
- Strips metadata tables from output
- Extracts inline SVGs to separate files (including converted ASCII diagrams)
- Generates semantic HTML from markdown
- Creates table of contents from H2 headings
- Calculates word count and reading time
- Populates HTML template with all metadata
- Copies WCAG 2.1 AA compliant CSS template
- Validates output HTML
- Fixes invalid `<p>` tags inside SVG elements
- Removes duplicate table rendering
- Adds explicit width/height to SVG object tags

**Output location:**

- Directory: `outputs/bible/blogs/mx/[topic-slug]/`
- Files: `[topic-slug].html` (title-based), `styles.css`, SVG diagrams

### Step 3: Post-Processing (Manual Steps)

After script completes, perform these additional steps:

1. **Rename extracted inline SVGs** to semantic filenames:
   - Script extracts as `diagram-1.svg`, `diagram-2.svg`, `diagram-3.svg`
   - Identify SVG content by checking first text element
   - Rename to semantic names (e.g., `5-stage-agent-journey.svg`, `human-vs-agent-behavior.svg`)
   - Update HTML references: `sed -i '' 's/diagram-1\.svg/semantic-name.svg/g' [topic-slug].html`

2. **Generate social media card** (script doesn't do this):
   ```bash
   # Create social-card.svg with title, author, AllAbout.Network branding
   # 1200x630px, blue accent bar, wrapped title
   ```

3. **Validate HTML**:
   ```bash
   npx html-validate outputs/bible/blogs/mx/[topic-slug]/[topic-slug].html
   ```

4. **Rename for deployment** (if needed):
   ```bash
   # When deploying to web server, rename to index.html
   mv [topic-slug].html index.html
   ```

### Step 4: Report Completion

Report to user:

- Output directory path
- List of generated files with sizes
- Word count and reading time
- Published URL (`https://allabout.network/blogs/mx/[topic-slug]/`)
- Validation results (no title length warnings)

## Script Capabilities

The `scripts/generate-blog-html.js` script is **fully generic and reusable** for any markdown blog post following the MX pattern.

**Supported features:**

- YAML frontmatter (standard Pandoc format)
- EDS metadata tables (Adobe Experience Digital Services)
- Bio catch text extraction
- Inline SVG extraction to separate files
- Semantic HTML generation (H2-H6 get anchor IDs)
- TOC generation (H2 headings only)
- Template population (HTML + CSS)
- Output validation
- Title-based filename generation
- SVG markup cleanup (removes invalid `<p>` tags)
- Table duplicate removal
- Explicit SVG dimensions (width="800" height="400")

**ASCII Preprocessing** (`scripts/preprocess-ascii-to-svg.js`):

- Intelligent ASCII diagram parsing
- High-quality SVG generation with boxes and arrows
- MX brand styling (#0066cc, #ffffff, #2c3e50)
- In-place markdown modification
- Detects diagrams by arrow characters: `→`, `↓`, `↑`, `←`

**Dependencies:**

- `markdown-it` - Markdown parser
- `markdown-it-anchor` - Heading anchor generation
- `js-yaml` - YAML frontmatter parser

## Error Handling

The scripts handle these scenarios:

- File not found → Exit with error
- Missing metadata → Uses defaults
- No YAML frontmatter → Fallback to metadata table
- No bio table → Generates default introduction text
- Invalid markdown → Reports parsing error
- Validation failures → Exits with specific error messages
- Invalid SVG markup → Automatically cleaned
- Duplicate table rendering → Automatically removed

## Reference Files

- **Preprocessor Script:** `scripts/preprocess-ascii-to-svg.js`
- **Generation Script:** `scripts/generate-blog-html.js`
- **HTML Template:** `.claude/skills/create-blog/blog-template.html`
- **CSS Template:** `.claude/skills/create-blog/blog-template.css`
- **HTML Validation Config:** `.htmlvalidate.json`
- **Example Input:** `outputs/bible/blogs/MX-The-blog.md`

## Success Criteria

- [ ] ASCII preprocessing completes (if diagrams present)
- [ ] Generation script executes without errors
- [ ] All SVG files extracted/converted
- [ ] Inline SVGs renamed to semantic filenames
- [ ] Social media card generated
- [ ] HTML validates without warnings (title length rule disabled)
- [ ] All H2-H6 headings have anchor IDs
- [ ] TOC includes all H2 sections
- [ ] WCAG 2.1 AA compliant CSS applied
- [ ] SVGs display correctly in browser (no blue boxes)
- [ ] Tables render once only (no duplicates)
- [ ] Title-based filename generated
- [ ] AI agent compatibility (object tags with dimensions, semantic names, stripped metadata)

## Efficiency Comparison

**Old workflow (manual):** ~150 lines of step-by-step instructions → AI implements from scratch → error-prone

**New workflow (scripted):** Run 2 commands + 4 post-processing steps → consistent, validated output

**Improvements in v2.1:**

- HTML validation title length warnings eliminated (`.htmlvalidate.json`)
- SVG display issues fixed (invalid `<p>` tag cleanup)
- Table double rendering fixed (duplicate removal)
- Title-based filenames (easier file management)
- Intelligent ASCII preprocessing (high-quality SVG generation)
- Explicit SVG dimensions (improved rendering)

**Time saved:** ~90% reduction in implementation effort + improved output quality
