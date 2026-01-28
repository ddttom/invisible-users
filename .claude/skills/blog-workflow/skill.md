# Blog Workflow Skill

## Overview

This skill manages the complete blog post lifecycle from draft to publication, implementing the workflow documented in Appendix P. It reads metadata from blog post frontmatter, determines the current state, and progresses the content through the workflow states with validation at each step.

## Usage

```
/blog-workflow <blog-post-name-or-path>
```

**Examples:**

```
/blog-workflow machine-experience-adding-metadata
/blog-workflow docs/structure/blog-drafts/my-new-post.md
/blog-workflow outputs/bible/blogs/mx/existing-post.html
```

## Workflow States

The skill manages four states in the content lifecycle:

1. **Draft** - Work in progress, markdown only
   - Location: `docs/structure/` or `docs/structure/blog-drafts/`
   - Metadata: `blog-state: "draft"`

2. **In-Review** - HTML generated, ready for review
   - Location: `outputs/bible/blogs/mx/`
   - Metadata: `blog-state: "in-review"`

3. **Published** - Live on website
   - Location: `outputs/bible/blogs/mx/` (same as in-review)
   - Metadata: `blog-state: "published"`

4. **Archived** - No longer current
   - Location: `outputs/bible/blogs/mx/` (same location)
   - Metadata: `blog-state: "archived"`

## State Transitions

### Draft → In-Review

**Trigger:** User runs skill on draft markdown file

**Actions:**

1. Validate markdown frontmatter (all required fields present)
2. Run generation script: `node scripts/generate-blog-html.js <markdown-file>`
3. Verify HTML, CSS, SVG files generated in `outputs/bible/blogs/mx/`
4. Update markdown frontmatter: `blog-state: "in-review"`
5. Validate HTML: `npx html-validate <generated-html>`
6. Validate SVG: `xmllint --noout <generated-svgs>`
7. Report generation results to user

**Pause for user review:** User verifies HTML, checks accessibility, confirms quality

### In-Review → Published

**Trigger:** User runs skill on in-review HTML file (after approval)

**Actions:**

1. Verify HTML file exists in `outputs/bible/blogs/mx/`
2. Prompt user for publication date (default: today)
3. Construct canonical URL: `https://allabout.network/blogs/mx/<filename>.html`
4. Update markdown frontmatter:
   - `blog-state: "published"`
   - `blog-url: "<canonical-url>"`
   - `publication-date: "<date>"`
5. Update HTML meta tags:
   - `<meta name="blog-state" content="published">`
   - `<meta name="blog-publication-date" content="<date>">`
   - `<link rel="canonical" href="<url>">`
6. Update Schema.org JSON-LD with `datePublished`
7. Report publication metadata to user

**Pause for user review:** User deploys to web server, verifies live URL

### Published → Archived

**Trigger:** User runs skill on published content to mark as archived

**Actions:**

1. Verify current state is "published"
2. Update markdown frontmatter: `blog-state: "archived"`
3. Update HTML meta tag: `<meta name="blog-state" content="archived">`
4. Add archive notice to HTML (optional, prompt user)
5. Preserve canonical URL and publication date
6. Report archive status to user

**Pause for user review:** User verifies archive notice, confirms deployment

## Skill Behavior

### 1. Detect Input Type

The skill accepts three input formats:

**Blog filename only:**

```
/blog-workflow machine-experience-adding-metadata
```

Search strategy:
- Check `docs/structure/blog-drafts/<name>.md`
- Check `docs/structure/<name>.md`
- Check `outputs/bible/blogs/mx/<name>.html`
- Check `outputs/bible/blogs/mx/<name>.md`

**Relative path:**

```
/blog-workflow docs/structure/blog-drafts/my-post.md
```

Use path directly, verify file exists.

**Absolute path:**

```
/blog-workflow /Users/.../invisible-users/docs/structure/blog-drafts/my-post.md
```

Use path directly, verify file exists.

### 2. Read Current State

**For markdown files (.md):**

Parse YAML frontmatter to extract `blog-state` field:

```javascript
const matter = require('gray-matter');
const fs = require('fs');

const content = fs.readFileSync(markdownPath, 'utf8');
const { data } = matter(content);
const currentState = data['blog-state'];
```

**For HTML files (.html):**

Parse meta tag to extract state:

```html
<meta name="blog-state" content="in-review">
```

### 3. Validate Required Metadata

Before any state transition, verify required fields exist:

**Draft → In-Review requires:**

- `title` (string)
- `author` (string)
- `date` (ISO date)
- `blog-state` (must be "draft")
- `blog-filename` (string)
- `blog-url` (must be empty string)
- `publication-date` (must be empty string)
- `description` (string)
- `keywords` (array)

**In-Review → Published requires:**

- All fields from Draft → In-Review
- `blog-state` (must be "in-review")
- User confirmation that review is complete

**Published → Archived requires:**

- `blog-state` (must be "published")
- User confirmation to archive

### 4. Execute State Transition

Based on current state, execute appropriate transition actions.

### 5. Validate Output

After transition, validate:

**HTML validation:**

```bash
npx html-validate outputs/bible/blogs/mx/<filename>.html
```

**SVG validation:**

```bash
xmllint --noout outputs/bible/blogs/mx/<filename>-*.svg
```

**Metadata consistency:**

- Markdown and HTML states match
- Required fields populated correctly
- File locations correct

### 6. Report Results

Present clear summary to user:

```
✓ State Transition: Draft → In-Review

Generated Files:
  ✓ outputs/bible/blogs/mx/machine-experience-adding-metadata.html
  ✓ outputs/bible/blogs/mx/machine-experience-adding-metadata.css
  ✓ outputs/bible/blogs/mx/machine-experience-adding-metadata-social.svg

Validation:
  ✓ HTML validation passed
  ✓ SVG validation passed
  ✓ Metadata consistency verified

Updated Metadata:
  blog-state: "draft" → "in-review"

Next Steps:
  1. Review HTML in browser
  2. Check WCAG 2.1 AA compliance
  3. Run /blog-workflow again to publish
```

## Error Handling

### Missing Required Metadata

If required fields are missing, report error and stop:

```
✗ Cannot transition to in-review: Missing required fields

Missing fields:
  - blog-filename
  - description

Please add these fields to YAML frontmatter and try again.
```

### Invalid State Transition

If attempting invalid transition, report error:

```
✗ Cannot transition from "published" to "draft"

Valid transitions from "published":
  - published → archived

Current state: published
```

### Generation Script Failure

If `generate-blog-html.js` fails, report error and debug info:

```
✗ HTML generation failed

Error: Missing required field: title
Script: scripts/generate-blog-html.js
Input: docs/structure/blog-drafts/my-post.md

Please fix the error and try again.
```

### Validation Failure

If HTML or SVG validation fails, report errors:

```
✗ HTML validation failed

Errors in outputs/bible/blogs/mx/my-post.html:
  Line 42: Unclosed <div> tag
  Line 85: Invalid nesting: <p> inside <p>

Fix these errors before proceeding.
```

## User Prompts

### Confirm Publication

Before transitioning In-Review → Published, prompt user:

```
Ready to publish "Blog Post Title"?

Generated files verified:
  ✓ HTML validation passed
  ✓ SVG validation passed
  ✓ WCAG 2.1 AA compliant

Publication URL:
  https://allabout.network/blogs/mx/my-post.html

Publication date (default: 2026-01-26):
  [User can override date]

Confirm publication? (yes/no)
```

### Confirm Archive

Before transitioning Published → Archived, prompt user:

```
Archive "Blog Post Title"?

This will:
  - Mark content as archived
  - Add archive notice to HTML (optional)
  - Preserve canonical URL and publication date

Content will remain accessible but marked as outdated.

Confirm archive? (yes/no)
```

## Implementation Notes

### File System Operations

**Always run `pwd` first** to verify location in multi-repository workspace.

**Use absolute paths** for file operations to avoid navigation errors.

**Verify file existence** before reading or writing.

### Git Operations

**DO NOT automatically commit changes.** After state transition, report to user:

```
✓ State transition complete

Files modified:
  - docs/structure/blog-drafts/my-post.md (metadata updated)
  - outputs/bible/blogs/mx/my-post.html (generated)
  - outputs/bible/blogs/mx/my-post.css (generated)
  - outputs/bible/blogs/mx/my-post-social.svg (generated)

Run /step-commit to commit these changes to version control.
```

### Generation Script Integration

Call `scripts/generate-blog-html.js` using Bash tool:

```bash
node scripts/generate-blog-html.js docs/structure/blog-drafts/my-post.md
```

Capture output and parse for errors. Report generation results to user.

### Metadata Updates

When updating markdown frontmatter, use Edit tool to replace specific fields:

```yaml
# Old
blog-state: "draft"

# New
blog-state: "in-review"
```

When updating HTML meta tags, use Edit tool to replace meta tags:

```html
<!-- Old -->
<meta name="blog-state" content="in-review">

<!-- New -->
<meta name="blog-state" content="published">
```

## Related Skills

- **/step-commit** - Commit workflow changes to version control
- **/create-blog** - Transform markdown blog posts into WCAG 2.1 AA compliant HTML (legacy, now integrated into this workflow)

## Related Documentation

- **Appendix P** - Blog Generation Workflow (complete workflow documentation)
- **docs/structure/blog-metadata-schema.md** - Metadata schema and state tracking
- **docs/architecture/doc-architecture.md#blog-content-workflow** - Workflow architecture
- **.claude/skills/create-blog/skill.md** - Blog generation skill (legacy)

## Examples

### Example 1: Draft to In-Review

**Input:**

```
/blog-workflow machine-experience-adding-metadata
```

**Output:**

```
✓ Found draft: docs/structure/blog-drafts/machine-experience-adding-metadata.md

Current state: draft
Target state: in-review

Validating metadata... ✓
Running generation script...

✓ Generated outputs/bible/blogs/mx/machine-experience-adding-metadata.html
✓ Generated outputs/bible/blogs/mx/machine-experience-adding-metadata.css
✓ Generated outputs/bible/blogs/mx/machine-experience-adding-metadata-social.svg

Validating HTML... ✓
Validating SVG... ✓

Updated metadata:
  blog-state: "draft" → "in-review"

Next steps:
  1. Review HTML in browser: outputs/bible/blogs/mx/machine-experience-adding-metadata.html
  2. Check WCAG 2.1 AA compliance
  3. Run /blog-workflow machine-experience-adding-metadata to publish
```

### Example 2: In-Review to Published

**Input:**

```
/blog-workflow machine-experience-adding-metadata
```

**User prompt:**

```
Ready to publish "Machine Experience: Adding Metadata"?

Current state: in-review
Target state: published

Publication URL: https://allabout.network/blogs/mx/machine-experience-adding-metadata.html
Publication date (default: 2026-01-26): [press enter or type date]

Confirm publication? (yes/no): yes
```

**Output:**

```
✓ Published "Machine Experience: Adding Metadata"

Updated metadata:
  blog-state: "in-review" → "published"
  blog-url: "https://allabout.network/blogs/mx/machine-experience-adding-metadata.html"
  publication-date: "2026-01-26"

Updated files:
  ✓ docs/structure/blog-drafts/machine-experience-adding-metadata.md (metadata)
  ✓ outputs/bible/blogs/mx/machine-experience-adding-metadata.html (meta tags)

Next steps:
  1. Deploy HTML to web server
  2. Verify live URL: https://allabout.network/blogs/mx/machine-experience-adding-metadata.html
  3. Run /step-commit to commit changes
```

### Example 3: Published to Archived

**Input:**

```
/blog-workflow machine-experience-adding-metadata
```

**User prompt:**

```
Archive "Machine Experience: Adding Metadata"?

Current state: published
Target state: archived

This will mark content as outdated but preserve canonical URL.

Add archive notice to HTML? (yes/no): yes

Confirm archive? (yes/no): yes
```

**Output:**

```
✓ Archived "Machine Experience: Adding Metadata"

Updated metadata:
  blog-state: "published" → "archived"

Updated files:
  ✓ docs/structure/blog-drafts/machine-experience-adding-metadata.md (metadata)
  ✓ outputs/bible/blogs/mx/machine-experience-adding-metadata.html (meta tags + notice)

Archive notice added to HTML.

Next steps:
  1. Deploy updated HTML to web server
  2. Run /step-commit to commit changes
```

## Skill Activation

This skill is invoked using:

```
/blog-workflow <blog-post-name-or-path>
```

The skill will:

1. Locate the blog post file
2. Read current state from metadata
3. Determine valid next state
4. Execute state transition
5. Validate output
6. Report results to user
7. Pause for user review

After user reviews and confirms, they can run the skill again to progress to the next state.
