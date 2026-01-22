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
- Common fields: title, description, author, jsonld, image, LinkedIn, publication-date, longdescription

**Parse Bio Table**:
- Look for pipe table with `| bio |` header
- Extract catch text from second column of first data row
- Store in `bioCatch` variable

**Merge Metadata** (priority order):
1. Metadata table (highest priority)
2. YAML frontmatter
3. Default values (lowest priority)

**Required final metadata**:
- `title`: From metadata, or extract from first H1 heading, or use filename
- `author`: Default "Tom Cranstoun"
- `date`: Today's date in ISO format (YYYY-MM-DD)
- `description`: From metadata or generate from first paragraph
- `keywords`: Array of tags (default: ["machine-experience", "ai-agents"])
- `jsonld`: "article" (maps to BlogPosting)
- `LinkedIn`: "https://www.linkedin.com/in/tom-cranstoun/"

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
   <figure class="illustration">
     <object type="image/svg+xml" data="[semantic-filename].svg" aria-label="[descriptive text]">
       <!-- Fallback for browsers that don't support object -->
       <img src="[semantic-filename].svg" alt="[descriptive text]" width="800" height="600">
     </object>
     <figcaption>Figure N: [description]</figcaption>
   </figure>
   ```
   - **Why `<object>` instead of `<img>`:** AI agents can parse SVG content directly through `<object>` tags, unlike `<img>` which treats SVG as opaque image data
   - **Semantic filename:** Use the generated semantic name (e.g., `5-stage-agent-journey.svg` not `MX-The-blog-fig-1.svg`)
   - **Fallback:** Include `<img>` inside `<object>` for browser compatibility

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

1. **Create output directory**: `outputs/bible/blogs/mx/[topic-slug]/`
   - Generate topic slug from blog title (lowercase, hyphens, no special chars)
   - Example: "Content Operations for AI Agents" → `content-operations`
   - Create directory if it doesn't exist
   - **Path structure**: All MX-related blog posts stored under `outputs/bible/blogs/mx/[topic-slug]/`
   - **Web URL pattern**: `https://allabout.network/blogs/mx/[topic-slug]/`

2. **Write HTML file**: `[blog-basename].html`
3. **Copy CSS template**: Read `.claude/skills/create-blog/blog-template.css` and write to `[blog-basename].css`
4. **Write social media card**: `[blog-basename]-social.svg`
5. **Write content SVG files with semantic names**: `5-stage-agent-journey.svg`, `human-vs-agent-behavior.svg`, `content-pipeline.svg`, etc.
   - Use the semantic filenames generated in Step 5
   - NOT generic names like `[blog-basename]-fig-1.svg`

### Step 12: Report Completion

Report to user:

```text
Blog generated successfully!

Output files:
- outputs/bible/blogs/mx/content-operations/index.html
- outputs/bible/blogs/mx/content-operations/styles.css (WCAG 2.1 AA compliant)
- outputs/bible/blogs/mx/content-operations/social-card.svg (social media card)
- outputs/bible/blogs/mx/content-operations/5-stage-agent-journey.svg
- outputs/bible/blogs/mx/content-operations/human-vs-agent-behavior.svg
- outputs/bible/blogs/mx/content-operations/content-pipeline.svg

Published URL: <https://allabout.network/blogs/mx/content-operations>

Metadata:
- Title: [title]
- Word count: [count]
- Reading time: [minutes] min
- Content SVGs extracted: [number]

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
- [ ] SVGs extracted to separate files with semantic filenames
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
