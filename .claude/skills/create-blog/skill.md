# create-blog

Transform markdown blog posts into semantic, AI-agent-friendly HTML with separate CSS and extracted SVG files.

## When to Use

Use this skill when the user provides a markdown blog file path (typically in `outputs/bible/blogs/`) and wants to generate a complete HTML blog post following Machine Experience (MX) patterns.

## Arguments

- **Blog file path** (required): Path to markdown file containing blog post

## Workflow

When this skill is invoked, follow these steps systematically:

### Step 1: Read and Validate Input

1. Read the markdown file provided by the user
2. Verify the file exists and contains content
3. If file not found, report error and exit

### Step 2: Parse Metadata

**Parse YAML Frontmatter** (if present):
- Extract all key-value pairs between `---` markers at file start
- Store in `yamlMeta` object
- Common fields: author, date, description, keywords, excerpt

**Parse EDS Metadata Tables**:
- Look for pipe table with `| metadata |` header
- Extract all key-value pairs from two-column table
- Store in `tableMeta` object
- Common fields: title, description, author, author-name, jsonld, image, LinkedIn, publication-date, longdescription

**Parse Bio Table**:
- Look for pipe table with `| bio |` header
- Extract catch text from second column of first data row
- Store in `bioCatch` variable

**Load Author Profile Metadata** (for default values):

1. **Determine author name**:
   - Look for `author-name` field in metadata table
   - If not found, look for `author` field in YAML frontmatter
   - If not found, default to "Tom Cranstoun"

2. **Generate profile filename**:
   - Trim whitespace from author name
   - Convert to lowercase
   - Replace spaces with dots (`.`)
   - Add `.md` extension
   - Example: "Tom Cranstoun" → "tom.cranstoun.md"
   - Example: "John Smith" → "john.smith.md"

3. **Load profile file**:
   - Look in `packages/sales-enablement/profiles/` directory
   - If profile file exists, read it and extract YAML frontmatter metadata
   - If profile file not found, use `packages/sales-enablement/profiles/unknown.md` as fallback
   - Store profile metadata in `authorProfile` object

4. **Use author profile as defaults**:
   - Profile metadata provides default values for: `author`, `email`, `linkedin`, `image`, `organization`, `website`, `language`, `site_name`
   - These defaults are lowest priority in merge order (see below)

**Merge Metadata** (priority order):
1. Metadata table (highest priority)
2. YAML frontmatter
3. Author profile defaults
4. Hard-coded default values (lowest priority)

**Required final metadata**:
- `title`: From metadata, or extract from first H1 heading, or use filename
- `author`: From metadata, author profile, or default "Tom Cranstoun"
- `date`: Today's date in ISO format (YYYY-MM-DD)
- `description`: From metadata or generate from first paragraph
- `keywords`: Array of tags (default: ["machine-experience", "ai-agents"])
- `jsonld`: "article" (maps to BlogPosting)
- `linkedin`: From metadata, author profile, or default "https://www.linkedin.com/in/tom-cranstoun/"
- `image`: Author image URL from profile or default
- `language`: From author profile or default "en-GB"
- `organization`: From author profile or default "Digital Domain Technologies"
- `website`: From author profile or default "https://allabout.network"
- `site_name`: From author profile or default "AllAbout.Network"

### Step 2.5: Confirm Output Filename

**CRITICAL:** Ask user to confirm the HTML output filename before generating files.

**Generate filename suggestions from title:**

1. **Full slug** (from complete title, max 50 chars):
   - Convert title to lowercase
   - Remove special characters (keep letters, numbers, spaces)
   - Replace spaces with hyphens
   - Truncate to 50 characters
   - Example: "Machine Experience: Adding Metadata So AI Agents Don't Have to Think" → "machine-experience-adding-metadata-so-ai-agents-do"

2. **Medium slug** (first 3-4 key words, ~30 chars):
   - Extract key concepts from title
   - Example: "Machine Experience: Adding Metadata So AI Agents Don't Have to Think" → "machine-experience-adding-metadata"

3. **Short slug** (first 2-3 words, ~20 chars):
   - Use first significant words
   - Example: "Machine Experience: Adding Metadata So AI Agents Don't Have to Think" → "machine-experience"

**Ask user with AskUserQuestion:**

```
Question: "Choose HTML filename (without .html extension):"
Header: "Output filename"
Options:
1. [Full slug] - "machine-experience-adding-metadata-so-ai-agents-do" (Recommended)
   Description: "Generated from full title (50 char limit)"
2. [Medium slug] - "machine-experience-adding-metadata"
   Description: "First 3-4 key words from title"
3. [Short slug] - "machine-experience"
   Description: "Short, memorable filename"
4. Other - [User enters custom filename]
   Description: "Type your own filename (lowercase, hyphens only)"
```

**Store chosen filename** for use in Step 11 when writing output files.

### Step 3: Extract Blog Introduction Text

**Purpose:** Extract introductory tagline/message for the blog introduction section (displayed with author image).

**Note:** Markdown source may use `| bio |` table for backward compatibility, but the output component is semantically correct as "blog-introduction" not "author-bio".

**If bio table exists in markdown**:
- Use text from second column as blog introduction message
- Verify it doesn't repeat first paragraph of article
- This is typically a tagline or key message about the blog topic

**If bio table missing**:
- Generate introduction text based on title and description
- Pattern: "[Brief engaging statement about the blog topic]"
- Example: "Machine Experience (MX) is the practice of adding metadata and instructions to internet assets so AI agents don't have to guess."
- Keep it to 1-2 sentences

### Step 4: Generate Table of Contents

1. Scan markdown content for all H2 headings (`##`) - these are the top-level sections
2. Extract heading text
3. Generate anchor ID for each:
   - Lowercase all characters
   - Replace spaces with hyphens
   - Remove special characters except hyphens
   - Example: "The Pattern That Breaks" → "the-pattern-that-breaks"
4. Store array of `{text, id}` objects

**Note:** TOC includes only H2 headings for simplicity. H3-H5 headings will have anchor IDs for direct linking but won't appear in the collapsible TOC to avoid clutter.

### Step 5: Extract and Name SVGs Semantically

**CRITICAL:** Always extract inline SVGs to separate files with semantic names. This is essential for:
- AI agent compatibility (parseable via `<object>` tags)
- Performance (smaller HTML files)
- Reusability (SVGs can be referenced from multiple pages)
- Machine readability (semantic filenames help AI agents understand content)

**Extraction process:**

1. Scan markdown for SVG blocks (between `<svg>` and `</svg>` tags)
2. For each SVG found:
   - Extract complete SVG code (from `<svg` to `</svg>`)
   - Generate semantic filename (see naming strategy below)
   - Save to output directory
   - Replace in markdown with placeholder reference
3. Generate descriptive text for accessibility and AI agents:
   - Check for `<title>` element inside SVG
   - Check for descriptive text elements in SVG
   - Use surrounding markdown content as context
   - Extract figure caption from paragraph following SVG

**Semantic SVG filename generation:**

1. **Analyze SVG content and context:**
   - Extract `<title>` element if present in SVG
   - Read H2/H3 heading directly above the SVG
   - Identify key concepts from SVG text elements
   - Check paragraph following SVG (typically "Figure N: description")

2. **Generate semantic slug:**
   - Extract 2-4 key words describing the diagram
   - Convert to lowercase
   - Remove special characters (keep only letters, numbers, hyphens)
   - Replace spaces with hyphens
   - Limit to 30 characters maximum

3. **Naming examples:**
   - SVG title "The 5-Stage Agent Journey" → `5-stage-agent-journey.svg`
   - Heading "Human vs AI Agent Behavior" → `human-vs-agent-behavior.svg`
   - Caption "Content Pipeline Diagram" → `content-pipeline.svg`
   - Generic fallback if analysis fails → `figure-N.svg` (N = 1, 2, 3...)

**Example extraction:**

Original markdown:
```markdown
## 5-Stage MX Framework

When AI agents interact with your website, they follow a predictable 5-stage journey...

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <title>5-Stage Agent Journey</title>
  <!-- SVG content with stages: Discovery, Citation, Compare, Pricing, Confidence -->
</svg>

Figure 1: The 5-Stage Agent Journey - miss any stage and the entire chain breaks
```

After extraction:
- **Filename:** `5-stage-agent-journey.svg` (semantic, AI-friendly)
- **Placeholder:** `[SVG:1:5-stage-agent-journey]`
- **Alt text:** "Diagram showing the 5-stage agent journey: Discovery, Citation, Compare, Pricing, and Confidence stages with warning that missing any stage breaks the entire chain"

### Step 5.5: Convert ASCII Diagrams to SVG

**CRITICAL:** Detect ASCII diagrams in code blocks and convert them to proper SVG visualizations for better accessibility and AI agent understanding.

**Detection criteria:**

1. **Scan for ASCII diagrams** in code blocks (language: `text`, `plaintext`, or no language specified)
2. **Identify diagram patterns:**
   - Flow arrows (→, ↓, ←, ↑, ↘, ↗, ↙, ↖)
   - Box-drawing characters (─, │, ┌, ┐, └, ┘, ├, ┤, ┬, ┴, ┼)
   - Multi-line structural content suggesting relationships
   - Hierarchical indentation patterns
   - Repetitive arrow patterns indicating flow

**ASCII diagram types to detect:**

- **Flow diagrams:** Vertical or horizontal flows with arrows
- **Hierarchical diagrams:** Tree structures with indentation
- **Sequence diagrams:** Step-by-step processes
- **Relationship diagrams:** Connections between entities

**Conversion process:**

1. **Analyze ASCII structure:**
   - Parse line-by-line content
   - Identify key entities (text blocks between arrows/lines)
   - Determine flow direction (vertical, horizontal, diagonal)
   - Extract relationships (what connects to what)

2. **Generate SVG representation:**
   - Create viewBox based on content complexity
   - Position text elements based on ASCII layout
   - Add arrow paths connecting elements
   - Use readable fonts (Arial, sans-serif, 14-16px)
   - Apply consistent spacing and alignment
   - Use MX brand colors (#0066cc for primary, #2d3748 for text)

3. **Create semantic filename:**
   - Analyze diagram content for key concepts
   - Generate descriptive slug (e.g., `entity-asset-layer-flow.svg`)
   - Fallback to `ascii-diagram-N.svg` if content unclear

4. **Add accessibility attributes:**
   - Include `<title>` element in SVG with diagram description
   - Add `<desc>` element explaining diagram structure
   - Generate alt text describing the flow/relationships
   - Use ARIA labels when embedded

5. **Replace in markdown:**
   - Remove original ASCII code block
   - Insert SVG placeholder: `[SVG:N:filename]`
   - Will be converted to `<object>` tag in Step 6

**Example conversion:**

Original ASCII diagram:
```markdown
```text
Entity Asset Layer (your sovereign database)
    ↓  ↓  ↓
Platforms consume your assets (not own them)
    ↓  ↓  ↓
MX publishes assets as portable HTML metadata
    ↓
AI agents read your assets regardless of platform
\`\`\`
```

Generated SVG structure:
```xml
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <title>Entity Asset Layer Flow Diagram</title>
  <desc>Vertical flow showing Entity Asset Layer as source, flowing through platforms and MX publication to AI agents</desc>

  <!-- Entity Asset Layer box -->
  <rect x="100" y="20" width="400" height="40" fill="#e8f4ff" stroke="#0066cc" stroke-width="2" rx="4"/>
  <text x="300" y="45" text-anchor="middle" font-size="14" font-family="Arial, sans-serif">Entity Asset Layer (your sovereign database)</text>

  <!-- Arrows down -->
  <path d="M 250 60 L 250 80" stroke="#0066cc" stroke-width="2" marker-end="url(#arrowhead)"/>
  <path d="M 300 60 L 300 80" stroke="#0066cc" stroke-width="2" marker-end="url(#arrowhead)"/>
  <path d="M 350 60 L 350 80" stroke="#0066cc" stroke-width="2" marker-end="url(#arrowhead)"/>

  <!-- Platforms box -->
  <rect x="100" y="90" width="400" height="40" fill="#f8f9fa" stroke="#2d3748" stroke-width="2" rx="4"/>
  <text x="300" y="115" text-anchor="middle" font-size="14" font-family="Arial, sans-serif">Platforms consume your assets (not own them)</text>

  <!-- More arrows and boxes... -->

  <!-- Arrow marker definition -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#0066cc"/>
    </marker>
  </defs>
</svg>
```

**Semantic filename:** `entity-asset-layer-flow.svg`

**Alt text:** "Flow diagram showing Entity Asset Layer as sovereign database at top, flowing through platforms that consume (not own) assets, then MX publishing as portable HTML metadata, finally reaching AI agents regardless of platform"

**Note:** If ASCII diagram conversion fails or structure is too complex, keep original code block and log warning.

### Step 6: Convert Markdown to HTML

**CRITICAL:** Strip metadata tables before conversion to prevent rendering in final HTML.

**Pre-conversion cleanup:**

1. **Remove metadata tables** (typically at end of document):
   - Pattern: Tables starting with `| metadata |` or `| bio |` or `| returntotop |` or `| Blogroll |` or `| code-expander |`
   - These are parsing instructions and EDS directives, not content
   - Delete entire table including headers and all rows
   - Use regex pattern: `^\|.*\|$` (lines starting and ending with pipes)

2. **Remove EDS fragment references:**
   - Pattern: Lines like `| :---- |` followed by `| /fragments/... |`
   - These are Adobe Experience Digital Services directives
   - Delete these lines completely

3. **Remove horizontal rules followed by metadata:**
   - Pattern: `---` followed by metadata tables
   - Common at document end after main content
   - Strip from first `---` after main article content through end of file

**Example markdown requiring cleanup:**

```markdown
[... main article content ...]

---

| metadata |
| :---- |
| title | Machine Experience... |
| description | ... |

| Blogroll |
| :---- |

| returntotop |
| :---- |
| Back to Top |
```

All of this should be stripped BEFORE markdown-to-HTML conversion.

**Convert markdown content following semantic HTML patterns:**

1. **Headings**:
   - H1 (`#`): Wrap in `<h1>` (article title only, no anchor ID)
   - H2 (`##`): Wrap in `<h2 id="[anchor-id]">` (section headings with anchor IDs, included in TOC)
   - H3 (`###`): Wrap in `<h3 id="[anchor-id]">` (subsections with anchor IDs)
   - H4 (`####`): Wrap in `<h4 id="[anchor-id]">` (sub-subsections with anchor IDs)
   - H5 (`#####`): Wrap in `<h5 id="[anchor-id]">` (deep subsections with anchor IDs)
   - H6 (`######`): Wrap in `<h6 id="[anchor-id]">` (deepest level with anchor IDs)
   - **Anchor ID generation:** Apply same slugification to all headings H2-H6 (lowercase, hyphens, no special chars)
   - **Example:** `#### Identity Evolves into Strategic Asset Vault` → `<h4 id="identity-evolves-into-strategic-asset-vault">Identity Evolves into Strategic Asset Vault</h4>`

2. **Paragraphs**:
   - Wrap text blocks in `<p>` tags
   - No orphan text nodes

3. **Lists**:
   - Unordered: `<ul>` with `<li>` items
   - Ordered: `<ol>` with `<li>` items
   - Nested lists preserved

4. **Code Blocks**:
   - Fenced blocks: `<pre><code class="language-[lang]">[code]</code></pre>`
   - Always specify language attribute
   - Preserve indentation
   - If no language specified, use "text"

5. **Inline Code**:
   - Wrap in `<code>` tags

6. **Links**:
   - External: `<a href="[url]" rel="external">[text]</a>`
   - Internal: `<a href="[url]">[text]</a>`

7. **Emphasis**:
   - Bold: `<strong>`
   - Italic: `<em>`

8. **SVG Placeholders**:
   - Replace `[SVG:N:filename]` placeholder with `<object>` tag (AI-parseable):
   ```html
   <figure>
     <object type="image/svg+xml"
             data="[semantic-filename].svg"
             width="800"
             height="400"
             class="diagram"
             title="[descriptive text]">
       <p>Diagram not available</p>
     </object>
     <figcaption>[description]</figcaption>
   </figure>
   ```
   - **Why `<object>` instead of `<img>`:** AI agents can parse SVG content directly through `<object>` tags, unlike `<img>` which treats SVG as opaque image data
   - **WCAG 2.1 Level A compliance:** The `title` attribute on the `<object>` element provides alternative text to satisfy Deque's `object-alt` accessibility rule (required for screen readers)
   - **Semantic filename:** Use the generated semantic name (e.g., `5-stage-agent-journey.svg` not `MX-The-blog-fig-1.svg`)
   - **Simple fallback:** Generic "Diagram not available" message displays only if SVG fails to load - doesn't duplicate figcaption content

### Step 7: Generate Social Media Image

Create an SVG social media card (1200x630px) with:
- Blog title (wrapped if long)
- Author name
- "AllAbout.Network" branding
- Clean, professional design with blue accent color (#3498db)

Save as `[blog-basename]-social.svg` in output directory.

**SVG Template**:
```svg
<svg viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1200" height="630" fill="#f8f9fa"/>

  <!-- Blue accent bar -->
  <rect x="0" y="0" width="8" height="630" fill="#3498db"/>

  <!-- Title (centered, wrapped) -->
  <text x="600" y="280" font-family="Arial, sans-serif" font-size="48"
        font-weight="bold" text-anchor="middle" fill="#1a202c">
    [Title line 1]
  </text>
  <text x="600" y="340" font-family="Arial, sans-serif" font-size="48"
        font-weight="bold" text-anchor="middle" fill="#1a202c">
    [Title line 2 if needed]
  </text>

  <!-- Author -->
  <text x="600" y="440" font-family="Arial, sans-serif" font-size="28"
        text-anchor="middle" fill="#555">
    By [Author Name]
  </text>

  <!-- Branding -->
  <text x="600" y="560" font-family="Arial, sans-serif" font-size="24"
        text-anchor="middle" fill="#3498db" font-weight="600">
    AllAbout.Network
  </text>
</svg>
```

### Step 8: Calculate Metadata

- **Word count**: Count words in converted HTML content (strip tags first)
- **Reading time**: `Math.ceil(wordCount / 200)` minutes

### Step 8.5: Identify Primary Question and Generate Schema.org Question Metadata

**CRITICAL:** Identify the main question this blog post answers to improve AI agent citation.

**Analysis process:**

1. **Identify the primary question:**
   - Analyze the blog title, description, and first 2-3 paragraphs
   - Determine the core question readers are asking that led them to this content
   - Question should be specific, searchable, and citation-worthy
   - Examples:
     - "How do AI agents discover and navigate websites?"
     - "What is Machine Experience (MX) and why does it matter?"
     - "How can I make my website compatible with AI agents?"
   - If title is already a question, use it directly
   - Otherwise, convert title/topic into a question format

2. **Extract the answer:**
   - Use the blog description as the primary answer
   - If description is too short, extract key points from first 2-3 paragraphs
   - Answer should be concise (2-4 sentences) but complete
   - Should directly address the question

3. **Generate Schema.org Question JSON-LD:**

```json
{
  "@context": "https://schema.org",
  "@type": "Question",
  "name": "[Primary question in short form]",
  "text": "[Full question text]",
  "answerCount": 1,
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "[Concise answer extracted from blog description and opening paragraphs]",
    "url": "[Blog URL]"
  }
}
```

**Example for a blog titled "Machine Experience: Adding Metadata So AI Agents Don't Have to Think":**

```json
{
  "@context": "https://schema.org",
  "@type": "Question",
  "name": "How do you optimize websites for AI agent compatibility?",
  "text": "What is Machine Experience (MX) and how can you add metadata to websites so AI agents can discover, cite, compare, understand pricing, and complete goals without guessing?",
  "answerCount": 1,
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Machine Experience (MX) enables AI agents to discover, cite, compare, understand pricing, and complete goals on your website through explicit metadata and semantic HTML. The 5-stage agent journey requires clear structure: discovery (via llms.txt and robots.txt), citation (with Schema.org metadata), comparison (explicit product attributes), pricing (machine-readable formats), and confidence (complete information in served HTML). Missing any stage breaks the entire chain.",
    "url": "https://allabout.network/blogs/mx/machine-experience-adding-metadata.html"
  }
}
```

**Store Question JSON-LD** for inclusion in HTML template (separate from BlogPosting JSON-LD).

### Step 9: Generate HTML File from Template

**IMPORTANT:** Do NOT construct HTML manually. Use the template file.

1. **Read template**: `.claude/skills/create-blog/blog-template.html`
2. **Replace placeholders** with actual values:

**Template Placeholders:**

| Placeholder | Value | Example |
|-------------|-------|---------|
| `{{TITLE}}` | Blog title | "Machine Experience - The 5-Stage Agent Journey" |
| `{{AUTHOR}}` | Author name | "Tom Cranstoun" |
| `{{DESCRIPTION}}` | Brief summary | "Machine Experience (MX) ensures AI agents..." |
| `{{KEYWORDS}}` | Comma-separated keywords | "machine-experience, mx, ai-agents" |
| `{{KEYWORDS_ARRAY}}` | JSON array of keywords | `"machine-experience", "mx", "ai-agents"` |
| `{{ISO_DATE}}` | ISO 8601 date | "2026-01-22" |
| `{{DISPLAY_DATE}}` | Formatted date | "22 January 2026" |
| `{{WORD_COUNT}}` | Article word count | 7200 |
| `{{READING_TIME}}` | Minutes to read | 36 |
| `{{BIO_CATCH}}` | Blog introduction message | "Machine Experience (MX) is the practice..." |
| `{{TOC_ITEMS}}` | TOC list items HTML | `<li><a href="#section">Section</a></li>` |
| `{{ARTICLE_CONTENT}}` | Converted markdown | Full article HTML |
| `{{CSS_FILENAME}}` | CSS filename | "MX-The-blog.css" |
| `{{OG_URL}}` | Canonical URL | "https://allabout.network/blogs/mx/content-operations" |
| `{{SOCIAL_IMAGE_URL}}` | Social media image | "https://allabout.network/blogs/mx/content-operations/MX-The-blog-social.svg" |
| `{{LINKEDIN_URL}}` | Author LinkedIn | "https://www.linkedin.com/in/tom-cranstoun/" |

3. **Write populated template** to output file: `[blog-basename].html`

### Step 10: Copy CSS Template

**IMPORTANT:** Do NOT generate CSS dynamically. Use the template file.

1. **Read template**: `.claude/skills/create-blog/blog-template.css`
2. **Copy template** to output directory: `[blog-basename].css`
3. **No modifications**: Template is complete and WCAG 2.1 AA compliant

The template includes all required styling:

1. **Skip Link**: Visually hidden, appears on keyboard focus (WCAG accessibility)
2. **Reset and Base Styles**: Body, typography, colors
3. **Blog Introduction**: Background, border, flexbox layout, author image
4. **Table of Contents**: Collapsible details/summary styling, arrow indicators
5. **Article Header**: H1 styling, article metadata
6. **Article Content**: H2/H3/H4/H5/H6 headings (all levels styled), paragraphs, lists
7. **Code Blocks**: Pre/code styling with syntax highlighting background
8. **Links**: Color, hover states, focus indicators
9. **Tables**: Borders, spacing, header styling
10. **Images and Figures**: Max-width, figcaption styling
11. **Floating Back to Top Button**: Fixed position (bottom-left), blue background, hover effects
12. **Footer**: Border, spacing
13. **Reduced Motion**: WCAG 2.3.3 support
14. **Print Styles**: Clean printout with visible URLs
15. **Responsive Design**: Mobile breakpoints with 44x44px touch targets

**Template CSS Requirements - WCAG 2.1 AA Compliance**:

- **Color contrast**: Use `#0066cc` for links (4.58:1 ratio on white) instead of `#3498db` (3.14:1 - fails AA)
- **Focus styles**: All interactive elements need visible focus indicators (2px solid outline)
- **Reduced motion**: Respect `prefers-reduced-motion` for users with vestibular disorders
- **Touch targets**: Minimum 44x44px on mobile (WCAG 2.5.5)
- **Print styles**: Hide decorative elements, show link URLs

**Skip link CSS:**

  ```css
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #0066cc;
    color: white;
    padding: 0.5rem 1rem;
    text-decoration: none;
    z-index: 100;
  }
  .skip-link:focus {
    top: 0;
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
  ```

**Focus styles for all interactive elements:**

  ```css
  a:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }

  .table-of-contents summary:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }

  .back-to-top:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
  ```

**Reduced motion support:**

  ```css
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

**Print styles:**

  ```css
  @media print {
    .skip-link,
    .back-to-top {
      display: none;
    }

    a[href^="http"]::after {
      content: " (" attr(href) ")";
      font-size: 0.8em;
      color: #666;
    }
  }
  ```

- Back to Top button: `position: fixed; bottom: 2rem; left: 2rem; background-color: #0066cc;`
- TOC markers: `▶` when closed, `▼` when open
- Blog introduction: Light gray background, blue left border
- Mobile touch targets: Minimum 44x44px for back-to-top button
- No inline CSS - all styling in separate file

### Step 11: Write Output Files

**Run the blog generation script with chosen filename:**

```bash
node scripts/generate-blog-html.js [markdown-file-path] [chosen-filename]
```

- `[markdown-file-path]`: Path to the markdown source file
- `[chosen-filename]`: The filename chosen by user in Step 2.5 (without .html extension)
  - If user chooses "Other", use their custom input
  - Pass as second argument to script
  - Example: `node scripts/generate-blog-html.js outputs/bible/blogs/MX-The-blog.md machine-experience`

**The script will automatically:**

1. **Output directly to mx/ directory**: All files placed in `outputs/bible/blogs/mx/` (flat structure, no subdirectories)
   - **Path structure**: All blog assets stored directly under `outputs/bible/blogs/mx/`
   - **Web URL pattern**: `https://allabout.network/blogs/mx/[filename].html`

2. **Write HTML file**: `[chosen-filename].html` (e.g., `machine-experience-adding-metadata.html`)
3. **Copy CSS template**: Write to `[chosen-filename].css` (e.g., `machine-experience-adding-metadata.css`)
4. **Write social media card**: `[chosen-filename]-social.svg` (e.g., `machine-experience-adding-metadata-social.svg`)
5. **Write content SVG files with prefixed names**: All SVG diagrams prefixed with blog filename
   - `[chosen-filename]-5-stage-agent-journey.svg`
   - `[chosen-filename]-human-vs-agent-behavior.svg`
   - `[chosen-filename]-content-pipeline.svg`
   - Ensures no filename conflicts between different blog posts

**Note:** Social media card generation is handled by a separate process (not yet automated).

### Step 12: Report Completion

Report to user:

```text
Blog generated successfully!

Output files:
- outputs/bible/blogs/mx/machine-experience-adding-metadata.html
- outputs/bible/blogs/mx/machine-experience-adding-metadata.css (WCAG 2.1 AA compliant)
- outputs/bible/blogs/mx/machine-experience-adding-metadata-social.svg (social media card)
- outputs/bible/blogs/mx/machine-experience-adding-metadata-5-stage-agent-journey.svg
- outputs/bible/blogs/mx/machine-experience-adding-metadata-human-vs-agent-behavior.svg
- outputs/bible/blogs/mx/machine-experience-adding-metadata-content-pipeline.svg

Published URL: <https://allabout.network/blogs/mx/machine-experience-adding-metadata.html>

Metadata:
- Title: [title]
- Word count: [count]
- Reading time: [minutes] min
- Inline SVGs extracted: [number]
- ASCII diagrams converted: [number]

Accessibility:
- WCAG 2.1 AA compliant CSS
- Skip to content link
- Focus indicators on all interactive elements
- Reduced motion support
- Print styles included

AI Agent Compatibility:
- SVGs use <object> tags (parseable by AI agents)
- Semantic SVG filenames (machine-readable)
- Metadata tables stripped from output
```

## Error Handling

Handle these error scenarios:

1. **File not found**: Report error with correct path suggestion
2. **Invalid markdown**: Report parsing error with line number
3. **Missing metadata**: Use defaults, warn user
4. **Output directory exists**: Overwrite with user confirmation
5. **SVG extraction fails**: Skip SVG, continue, warn user
6. **Malformed metadata table**: Use YAML or defaults, warn user

## Validation

After generation, validate:

1. **HTML syntax**: Use `npx html-validate [output-file].html`
2. **Schema.org JSON-LD**: Check valid JSON structure
3. **Anchor IDs**: Verify all H2-H6 headings have unique IDs
4. **CSS syntax**: Check no syntax errors
5. **File references**: Verify all image/SVG src paths exist

## Examples

### Basic Usage

```
User: /create-blog outputs/bible/blogs/MX-The-blog.md
```

### With Explicit Path

```
User: /create-blog /Users/tom/Documents/GitHub/invisible-users/outputs/bible/blogs/AI-Native.blog
```

## Implementation Notes

### Markdown Parsing

You can use basic string manipulation for markdown parsing:
- Headings: Lines starting with `##` or `###`
- Lists: Lines starting with `-` or `*` or numbers
- Code blocks: Between triple backticks
- Links: `[text](url)` pattern
- Emphasis: `**text**` for bold, `*text*` for italic

Or use a markdown library if available in the environment.

### Date Formatting

- **ISO format**: `2026-01-22` (for attributes and filenames)
- **Display format**: `22 January 2026` (for human-readable dates)

### Anchor ID Slug Generation

```javascript
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
```

### SVG Detection

Look for patterns like:
- `<svg` followed by attributes and closing `</svg>`
- Extract entire block including all nested elements

### Bio Catch Text Generation

If bio table missing, generate using pattern:
- Extract key topic from title
- Create engaging opening statement
- Examples:
  - "Exploring how Machine Experience transforms web design for AI agents."
  - "Understanding the five critical stages of agent interaction with websites."
  - "A practical guide to building web interfaces that work for both humans and machines."

## Reference Files

- **CSS Template**: `.claude/skills/create-blog/blog-template.css` (WCAG 2.1 AA compliant)
- **HTML Template**: `packages/shared-appendices/web/site/blog-post.html`
- **AI-Friendly Patterns**: `packages/shared-appendices/appendix-d-ai-friendly-html-guide.txt`
- **Example Blog**: `outputs/bible/blogs/published/blog.md`

## Success Criteria

- [ ] HTML file validates without errors
- [ ] CSS file has no syntax errors
- [ ] Inline SVGs extracted to separate files with semantic filenames
- [ ] ASCII diagrams converted to accessible SVG with proper ARIA labels
- [ ] Blog introduction renders with introduction message
- [ ] Index (TOC) is collapsible and pre-collapsed
- [ ] All H2-H6 headings have anchor IDs
- [ ] All heading levels (H2-H6) styled appropriately
- [ ] Back to Top button floats bottom-left
- [ ] Schema.org JSON-LD is valid
- [ ] Meta tags are complete
- [ ] Semantic HTML throughout
- [ ] Accessible (ARIA labels, alt text, proper structure)
- [ ] AI-agent compatible (data attributes, explicit state, correct aria-label usage)
