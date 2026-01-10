# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains two integrated projects:

### 1. The Invisible Users (Book Manuscript)

**"The Invisible Users: Designing the Web for AI Agents and Everyone Else"** - a practical guide examining how modern web design optimized for human users fails for AI agents, and how fixing this benefits everyone.

**Target length:** 30,000-50,000 words (11 chapters, 3,000-5,000 words each)
**Current status:** Chapters 1-11 complete, all illustrations complete

### 2. Web Audit Suite (Analysis Tool)

A comprehensive Node.js website analysis tool that implements the AI agent compatibility patterns described in the book. It crawls websites and generates detailed reports on:

- SEO performance
- Accessibility compliance (WCAG 2.1)
- Performance metrics
- Security headers
- Content quality
- AI agent compatibility (LLM suitability)

## Repository Structure

```text
/
├── README.md
├── CLAUDE.md                 # This file
├── CHANGELOG.md
├── PROJECTSTATE.md
├── PR_TEMPLATE.md
├── package.json              # Combined npm scripts for all projects
├── llms.txt                  # Repository llms.txt file
├── docs/                     # Business and sales materials
│   └── sales-enablement/     # Sales materials, pitch decks, business plan
├── web/                      # Public web pages
│   ├── identity-layer.html   # Identity delegation infrastructure project page
│   └── news.html             # Project news and updates
├── invisible-users/          # Book manuscript and materials
│   ├── book-plan.md          # Master plan with chapter outlines and status
│   ├── book-svg-style.md     # SVG illustration style guide
│   ├── manuscript/           # Complete manuscript content (git submodule)
│   │   ├── [chapters, appendices, illustrations in separate repository]
│   │   ├── agent-friendly-starter-kit/ # Code examples (good/ vs bad/)
│   │   ├── code-examples/    # Production-ready code implementations
│   │   ├── web/              # Generated HTML appendices for web publishing
│   │   └── blog/             # Blog and promotional materials (blog.md, blog.svg, AI-Native.blog)
│   └── llms.txt              # Repository llms.txt file
├── web-audit-suite/          # Web analysis tool (implements book's patterns)
│   ├── index.js              # Entry point, CLI parsing, logger setup
│   ├── package.json          # Tool-specific dependencies
│   ├── README.md             # Tool documentation
│   ├── QUICKSTART.md
│   ├── src/
│   │   ├── main.js           # Orchestrates 3-phase pipeline
│   │   ├── config/
│   │   │   └── defaults.js   # Default configuration values
│   │   └── utils/
│   │       ├── sitemap.js    # URL extraction (Phase 1)
│   │       ├── pageAnalyzer.js # Page content analysis
│   │       ├── pa11yRunner.js  # Accessibility testing
│   │       ├── llmMetrics.js   # LLM suitability metrics collection
│   │       ├── reports.js      # Report coordination (Phase 3)
│   │       └── reportUtils/
│   │           ├── reportGenerators.js  # All report generation
│   │           └── llmReports.js        # LLM suitability reports
│   ├── results/              # Generated output (gitignored)
│   ├── .cache/               # Puppeteer cache (auto-created, gitignored)
│   ├── docs/                 # Tool documentation
│   │   ├── usermanual.md
│   │   ├── CONFIGURATION.md
│   │   ├── FEATURES.md
│   │   └── AI-design-rules/  # AI assistant extension prompts
│   └── examples/             # Configuration examples
```

**Note:** PNG illustrations are generated from SVG sources using `npm run illustrations:generate` and are not tracked in version control.

**Appendix H Dual-File Structure:**

Appendix H uses two files to demonstrate an llms.txt example:

- **`appendix-live-llms.txt`** - The actual llms.txt content (source of truth, 20 curated links)
- **`appendix-live-llms.md`** - Markdown wrapper that displays the .txt content in a code block

**Why both files?**

The PDF generation command (`pdf:generate` in package.json) uses `appendix-*.md` pattern but excludes `.txt` files. The .md wrapper includes introduction text plus the .txt content in a markdown code block, allowing the PDF to show "here's what an llms.txt file looks like" as a formatted example. The .txt file remains the source of truth that can be edited independently.

## Essential Commands

### Book Manuscript Commands

```bash
# View word counts
npm run wordcount           # Total words across all chapters
npm run wordcount:all       # Detailed count for all markdown files

# Generate PNG illustrations from SVG sources
npm run illustrations:generate

# Markdown linting
npm run lint:markdown       # Check all markdown files
npm run lint:markdown:fix   # Fix all markdown files

# PDF generation
npm run pdf:generate        # Generate A4 PDF with cover (for review/distribution)
npm run pdf:kindle          # Generate 6"×9" PDF for Kindle Direct Publishing
npm run pdf:simple          # Generate simple PDF without cover

# HTML appendix generation
npm run pdf:appendix        # Generate individual HTML pages for each appendix
                            # Includes automatic Chapter 10 pattern enhancement

# Chapter status
npm run status              # Show all chapter files
```

**HTML Appendix Enhancement:** The `pdf:appendix` command automatically enhances Pandoc-generated HTML with Chapter 10 technical patterns via [scripts/enhance-appendix-html.js](scripts/enhance-appendix-html.js). See [scripts/README-appendix-enhancements.md](scripts/README-appendix-enhancements.md) for details.

### Web Audit Suite Commands

```bash
# Run analysis with default settings
npm run audit:start

# Run with custom sitemap/URL and output directory
npm run audit:start -- -s <url> -o <output-dir>

# Run with limited URLs for testing (e.g., 10 pages)
npm run audit:start -- -s <url> -c 10

# Full analysis with all enhanced features
npm run audit:start -- -s <url> --enable-history --generate-dashboard --generate-executive-summary

# Run linting for Web Audit Suite code
npm run audit:lint

# Run tests for Web Audit Suite
npm run audit:test
```

**Note on ESLint**: The Web Audit Suite uses ESLint 8.57.0 with `.eslintrc.cjs` configuration. Always use `npm run audit:lint` from the root, or `npm run lint` from within the `web-audit-suite/` directory.

## Writing Style Guidelines (Book Manuscript)

**Language and Voice:**

- British English throughout (organise, colour, whilst)
- First-person narrative voice
- No colons in chapter titles
- Short dashes only (not em-dashes)
- Avoid exaggeration words
- Professional tone without unnecessary superlatives or emotional validation

**Content Approach:**

- Real, concrete examples over theoretical discussion
- Technical accuracy with practical implications
- Sequential reading - each chapter builds on previous concepts
- Avoid making up examples - use the existing source material

## Markdown Formatting Rules

**CRITICAL: Always fix the root problem, never adjust lint configuration to suppress warnings.**

**Justified Exceptions:** Only three rules are disabled in `.markdownlint.json`:

- **MD013** (line-length): Not a quality issue, unnecessarily restrictive
- **MD041** (first-line-heading): Chapter files require `\newpage` for PDF formatting
- **MD051** (link-fragments): Reports false positives for valid internal links

For editing existing files, follow these key rules:

- **Headings:** Blank lines before/after, ATX-style only (not setext-style underlined)
  - Use proper heading levels (###) instead of bold text for numbered items
  - Example: Use `### 1. Title` not `**1. Title**`
- **Lists:** Blank lines before/after
- **Code blocks:** Always specify language (`javascript`, `html`, `css`, `json`, `bash`, `text`)
  - Email templates and plain text should use `text` language
- **Tables:** Proper spacing around pipes, aligned separators
  - Separator row must have spaces: `| ----- | ----- |` not `|-----|-----|`
- **MD036 Prevention:** Never use emphasis (bold/italic) for standalone lines
  - Dates and metadata should be plain text, not bold
  - Example: `Published: January 2025` not `**Published: January 2025**`
- **URLs:** Wrap bare URLs in angle brackets: `<https://example.com>` or use markdown links
- **Spacing:** Consistent throughout document

**Common linting errors:**

- **MD024:** Duplicate headings must be made unique by adding context prefixes
  - Example: Change duplicate "Example Row" to "1. SEO Report - Example Row", "2. Performance Analysis - Example Row"
- **MD036:** Emphasis used instead of heading (e.g., `**Date**` as standalone should be `Date` or `## Date`)
- **MD022:** Headings must be surrounded by blank lines
- **MD040:** Code blocks must have language specified (use `text` for email templates)
- **MD047:** Files must end with single newline
- **MD060:** Table separators need proper spacing around pipes
- **MD031:** Code blocks must have blank lines before and after
- **MD034:** Bare URLs should be wrapped in angle brackets or markdown links

## Web Audit Suite Architecture

### Three-Phase Processing Pipeline

1. **URL Collection Phase** (`getUrlsFromSitemap`):
   - Processes sitemap XML or extracts links from HTML
   - Handles both XML sitemaps and regular webpages
   - Uses Puppeteer fallback for Cloudflare-protected sites
   - Validates and normalizes URLs

2. **Data Collection Phase** (`processSitemapUrls`):
   - Analyzes each page using Puppeteer
   - Collects performance metrics, SEO data, accessibility issues
   - Runs Pa11y for WCAG 2.1 compliance testing
   - Stores all data in `results.json` (single source of truth)

3. **Report Generation Phase** (`generateReports`):
   - Reads from `results.json` only
   - Generates multiple CSV and markdown reports
   - Never fetches new data during report generation

### Key Design Principle: Single Source of Truth

**CRITICAL**: `web-audit-suite/results/results.json` is the single source of truth. All reports MUST be generated from this file. Report generation functions should NEVER:

- Fetch URLs directly
- Make network requests
- Collect new data
- Use Puppeteer

If data is missing from `results.json`, re-run the analysis phase, don't add data collection to report generation.

### LLM Suitability Analysis

The Web Audit Suite implements the patterns from "The Invisible Users" book:

Reference Documentation:

- Book manuscript: `invisible-users/manuscript/` directory
- Implementation guidance: `invisible-users/manuscript/chapter-10-technical-advice.md`
- Quick reference: `invisible-users/manuscript/appendix-ai-patterns-quick-reference.md`

### Two HTML States (Critical Distinction)

AI agents operate in two fundamentally different modes:

1. **SERVED HTML** (static) - What CLI agents and server-based agents see (no JavaScript execution)
2. **RENDERED HTML** (dynamic) - What browser-based agents see (after JavaScript execution)

Reports show BOTH states because different agents need different information.

**Metric Categories by Importance:**

**ESSENTIAL_SERVED (works for ALL agents):**

- Semantic HTML structure (`<main>`, `<nav>`, `<header>`, `<article>`)
- Form field naming (email, firstName, lastName vs custom names)
- Schema.org structured data (JSON-LD)
- llms.txt file presence (see <https://llmstxt.org/>)
- HTTP status codes (200, 404, etc.)
- Security headers (HSTS, CSP)

**ESSENTIAL_RENDERED (works for browser agents):**

- Explicit state attributes (data-state, data-validation-state)
- Agent visibility control (data-agent-visible attribute)
- Persistent error messages (role="alert", aria-live)
- Dynamic validation feedback

**NICE_TO_HAVE (speculative, not critical):**

- Table data attributes (data-price, data-currency)
- Button disabled explanations (data-disabled-reason)
- Auth state attributes (data-authenticated)

## Key Conceptual Themes (Book)

### Agent Diversity and Universal Patterns

The book addresses a diverse ecosystem of AI agents with varying capabilities:

- **CLI agents:** Command-line tools running locally (e.g., Claude Code, Cline)
- **Local (SMOL) agents:** Lightweight agents running on user devices
- **Server-based agents:** Cloud-hosted agents accessing websites remotely
- **Browser agents:** Full browser automation (e.g., Playwright, Selenium-based)
- **Browser extension assistants:** In-browser AI tools
- **IDE-integrated browser controls:** Development environments with browser integration

**Design implication:** The patterns aim for universal compatibility:

- **Semantic HTML:** Works for all agents, regardless of JavaScript execution
- **Explicit state attributes:** Visible in DOM for any parser
- **Structured data:** Machine-readable regardless of agent architecture
- **Clear feedback:** Persistent and unambiguous for all interaction models

### Identity Delegation (Mentioned)

A practical concern discussed briefly in Chapters 4, 6, 9, and 10: When agents make purchases, businesses lose customer identity. The book mentions identity delegation patterns as one emerging solution, without prescribing a specific implementation.

### Session Inheritance Problem

Key security insight (Chapter 6): In-browser agents inherit authenticated sessions rather than failing to authenticate. Banks cannot detect AI involvement because agents inherit proof-of-humanity tokens from the authenticated user's session.

## Critical Implementation Guidelines

### Priority-Based Implementation (Not Time-Based)

**CRITICAL:** All implementation guidance uses priority levels, not time estimates:

- **Priority 1:** Critical Quick Wins - highest impact, minimal effort
- **Priority 2:** Essential Improvements - important foundational work
- **Priority 3:** Core Infrastructure - systematic platform improvements
- **Priority 4:** Advanced Features - comprehensive long-term enhancements

**Never use time references** (hours, days, weeks, months, quarters) when discussing implementation tasks. Use priority levels instead.

### Marketing Materials Guidelines

**CRITICAL:** Marketing materials (docs/sales-enablement/) must avoid specific claims that cannot be validated:

**Do NOT use:**

- Fixed monetary amounts (£500, £5,000, £50,000, etc.)
- Concrete percentages (67%, 984% ROI, 70-80% margins, etc.)
- Specific time commitments (2-3 weeks, 6 months, etc.)
- Precise numeric scores (42/100, 78/100, etc.)

**Instead use:**

- General pricing language ("Contact for pricing", "varies by site")
- Qualitative descriptions ("significant improvement", "strong margins", "healthy margins")
- Phase-based progression ("Early Phase", "Growth Phase" not "6 months", "12 months")
- Qualitative score ranges ("Low", "Good", "Excellent" not specific numbers)

**Rationale:** The field is too new for validated ROI data. Every site is different, making fixed costs and time commitments misleading. Marketing materials must be honest about lack of proven data while demonstrating the methodology.

### Standards Classification

When presenting technical patterns, always label their maturity status:

- **Established Standards:** Schema.org, semantic HTML, ARIA - use with confidence
- **Emerging Conventions:** llms.txt - early adoption phase
- **Proposed Patterns:** ai-* meta tags, data-agent-visible - not yet standardised
- **Speculative:** Future possibilities, clearly marked as such

All proposed patterns must be explicitly noted as forward-compatible (won't break if agents don't recognise them).

### Universal Terminology

Use globally applicable terms, not region-specific:

- `postal_code` (not postcode, zip_code, Eircode, PLZ)
- `region` (not state, province, prefecture, county, Land)
- Phone numbers: E.164 format (`+442071234567`, not `+44 20 7123 4567`)

## Working with This Repository

### Book Manuscript Tasks

When asked to review or edit a chapter:

1. Read the chapter file completely
2. Check `invisible-users/book-plan.md` for chapter requirements and status
3. Verify consistency with established themes
4. Ensure British English and style guidelines
5. Confirm sequential flow - don't reference future chapters
6. Check that technical examples use simple JavaScript with minimal dependencies

### Web Audit Suite Development

When modifying the Web Audit Suite:

1. Check what data exists in `web-audit-suite/results/results.json` structure
2. Add data collection in Phase 2 (pageAnalyzer, metricsUpdater)
3. Update report generation in Phase 3 to read from `results.json`
4. Never fetch data during report generation

**Module System:**

- Uses ES Modules (`"type": "module"` in package.json)
- All imports must include `.js` extension: `import { foo } from './utils/bar.js'`

**Dependency Injection:**

The application avoids global state by using Dependency Injection. An `AuditContext` object is initialized in `index.js` and passed through the call stack:

```javascript
// Context passed to all functions
const context = {
  logger: winston.Logger,
  options: Object,
  // ... other shared state
}
```

Legacy `global.auditcore` usage has been removed. All utilities (`caching.js`, `networkUtils.js`, etc.) now accept `context` as an argument.

## Tool Usage Best Practices

### Jupyter Notebooks

**CRITICAL:** Use `NotebookEdit` tool for `.ipynb` files, not `Edit` tool.

Jupyter notebooks are JSON files with special structure. The `NotebookEdit` tool handles cell editing correctly:

```python
NotebookEdit(
    notebook_path="/path/to/file.ipynb",
    cell_id="cell-19",
    new_source="// Updated JavaScript code..."
)
```

Using the `Edit` tool on `.ipynb` files will fail with an error prompting you to use `NotebookEdit`.

### Read Before Edit Requirement

**CRITICAL:** The `Edit` tool requires reading a file before editing it. This is enforced, not optional.

**Correct workflow:**

1. `Read(file_path="path/to/file.md")`
2. Analyze content
3. `Edit(file_path="path/to/file.md", old_string="...", new_string="...")`

**Incorrect workflow:**

1. `Edit(file_path="path/to/file.md", ...)` ← Will fail with error

This prevents editing files blindly without understanding current state.

### Parallel Tool Calls

When multiple operations are independent, make parallel tool calls in a single message for efficiency:

**Example - Reading multiple files:**

```python
Read(file_path="README.md")
Read(file_path="CLAUDE.md")
Read(file_path="invisible-users/book-plan.md")
```

**Example - Searching multiple patterns:**

```python
Grep(pattern="FILENAME\\.md", output_mode="files_with_matches")
Grep(pattern="Web Audit Suite", -i=True, output_mode="files_with_matches")
```

## Enhanced Markdown Linting

### Running Linting Commands

**For all markdown files:**

```bash
npm run lint:markdown        # Check only
npm run lint:markdown:fix    # Fix automatically
```

**For specific files (using npx directly):**

```bash
npx markdownlint --fix path/to/file.md
```

**Important:** File-specific npm scripts like `npm run lint:md:fix:preface` do NOT exist. Use the commands above.

### Auto-fix Limitations

Some markdown issues cannot be auto-fixed and require manual correction:

- **MD001:** Heading level jumps (e.g., # to ###)
- **MD024:** Duplicate headings (must be made unique with context)
- **MD036:** Emphasis used instead of heading
- **MD060:** Complex table formatting issues

**Solution:** Read the error message, identify the line number in the linter output, and fix manually.

### Adding Tables to Chapters

When adding structured tables to book chapters:

1. **Read the chapter first** - Understand existing structure and find best insertion point
2. **Create contextual tables** - Adapt to chapter flow, don't just copy from notebooks
3. **Add summary paragraphs** - Every table needs a "Key insight" paragraph explaining implications
4. **Match chapter tone** - Maintain British English, professional tone, avoid superlatives

**Table structure pattern:**

```markdown
### Section Title

Explanatory paragraph introducing the table.

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Data 1   | Data 2   | Data 3   |

**Key insight:** Summary paragraph explaining what the table demonstrates and why it matters.
```

## Enhanced Git Workflows

### Commit Message Format with Heredoc

For multi-line commit messages, use heredoc format for clarity:

```bash
git commit -m "$(cat <<'EOF'
Summary line

- Bullet point 1
- Bullet point 2
- Bullet point 3
EOF
)"
```

The `'EOF'` syntax (with quotes) prevents variable expansion in commit messages.

### Systematic File Removal Process

When removing a file that's referenced in documentation:

1. **Find all references:**

   ```python
   Grep(pattern="FILENAME\\.md", output_mode="files_with_matches")
   ```

2. **Read referenced files in parallel** for efficiency
3. **Edit each file** to remove or update references
4. **Stage file deletion:** Use `git rm path/to/file.md` (not `git add`)
5. **Commit together:** Deletion + documentation updates in single commit

**Common reference locations to check:**

- Repository structure diagrams: `CLAUDE.md`, `README.md`, `invisible-users/book-plan.md`, `llms.txt`
- Supporting materials tables: `invisible-users/book-plan.md`
- Cross-references: `invisible-users/manuscript/blog/blog.md`, `resource-links.md`, `PROJECTSTATE.md`

## Cross-Document Update Patterns

### Web Audit Suite References

**Important**: The Web Audit Suite is now offered as a separate purchase or professional audit service, not included with the book.

When referencing the Web Audit Suite in documentation:

- Use: "The Web Audit Suite is available as a separate purchase or professional audit service"
- NOT: "included with this book", "included in the package", "free", "open-source"
- For agencies: Mention both self-service purchase option AND referral arrangement for audit service

### URL Consistency

All contact and website references must use consistent format:

- Website: `https://allabout.network`
- Email: `tom.cranstoun@gmail.com`
- No shortened URLs, www prefix, or trailing slash variations

This ensures all cross-references work correctly and maintain professional consistency.

## Claude Code Configuration

This project includes custom Claude Code configuration in the `.claude/` directory:

### Custom Skills

Three custom skills are available via the `/` command syntax:

1. **`/step-commit`** - Systematic commit workflow
   - Reviews all changes with git status and diff
   - Commits code changes
   - Runs linting and fixes errors
   - Reviews and updates documentation (README, CLAUDE.md, CHANGELOG.md)
   - Does NOT add attribution or "Generated with" messages

2. **`/md-fix`** - Markdown linting and auto-fix
   - Runs `npm run lint:markdown:fix` to auto-fix issues
   - Verifies all issues are resolved
   - Reports remaining issues requiring manual fixes
   - Shows modified files

3. **`/news`** - Add verified industry news to book documentation
   - Verifies all claims against official sources using WebSearch
   - Validates relevance using five strict criteria (all must pass)
   - Sequences entries chronologically
   - Creates properly formatted blog entries (narrative style)
   - Creates structured appendix entries (12-section technical format)
   - Updates both `invisible-users/manuscript/blog/book-updates.md` and `appendix-j-industry-developments.md`
   - Includes qualifiers for unverified company-reported metrics
   - Only adds news that validates or challenges specific book chapters
   - **Usage:** `/news [paste news content or URL]`

### Git Hooks

Three git hooks provide workflow reminders:

1. **`pre-commit.sh`** - Runs before commits
   - Checks staged markdown files for linting issues
   - Prompts to run `/md-fix` or `npm run lint:markdown:fix`
   - Allows bypassing with user confirmation

2. **`pre-push.sh`** - Runs before pushes
   - Warns about uncommitted changes
   - Checks if documentation is outdated vs code changes
   - Suggests using `/step-commit` workflow

3. **`post-tool-use.sh`** - Runs after git operations
   - Reminds about `/step-commit` workflow after manual commits
   - Ensures comprehensive commit practices

### Permissions

The `.claude/settings.local.json` file pre-approves common operations:

- Git operations (commit, add, push)
- Linting commands
- Project commands (npm start, npm run)
- Directory inspection (ls, tree, find)

### Using the `/news` Skill

The `/news` skill automates adding industry developments to the book's blog and appendix with strict verification.

**When to use:**

When you have industry news about:

- AI agent launches (browser automation, commerce agents)
- Agent-mediated commerce platforms
- Standards or protocols for agents
- Business model innovations in agent space
- Security or identity solutions for agents

**How it works:**

1. **Verification Phase** - Fact-checks all claims via WebSearch against official sources
2. **Relevance Check** - Must meet ALL five criteria:
   - Validates/challenges specific book chapters
   - Production reality (available NOW, not beta/research/future)
   - Commercial pressure (affects website owner decisions)
   - Timeline impact (accelerates adoption or validates projections)
   - Ecosystem shift (platform power dynamics or standards)
3. **User Approval** - Presents verification summary with ✓/⚠/✗ indicators
4. **Entry Creation** - Writes blog and appendix entries if approved
5. **Quality Check** - Validates markdown formatting and cross-references

**Examples:**

```bash
# Good candidates (likely to qualify)
/news Microsoft Copilot Checkout processes real transactions with retailers
/news Claude for Chrome browser automation launches to paid subscribers
/news Google Shopping Agent enables checkout within search interface

# Will be rejected (don't meet criteria)
/news Claude Desktop adds new keyboard shortcut
/news Research paper shows agents can navigate websites
/news ChatGPT announces features "coming soon in Q3"
```

**Skill files location:**

- Main workflow: `.claude/skills/news/skill.md`
- Verification rules: `.claude/skills/news/verification-guidelines.md`
- Relevance criteria: `.claude/skills/news/relevance-checklist.md`
- Templates: `.claude/skills/news/templates/`

**Note:** The skill is conservative by design - better to reject potentially relevant news than to add irrelevant content to the book documentation.

## Git Commit Guidelines

When creating git commits:

- **CRITICAL: Never add co-author attribution or "Generated with Claude Code" messages**
- Keep commit messages clear and professional
- Focus on describing the changes, not the tools used
- Standard commit message format: clear subject line, optional detailed body
- Example: "Fix markdown linting issues in all chapters" not "Generated with Claude Code"

## Working with Submodules

The manuscript directory is a git submodule pointing to:
<https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript>

**For Claude Code:**

- The submodule appears as a normal directory once initialized
- All npm scripts work normally with the submodule content
- Read operations work as expected
- Write operations to manuscript files should be done through the manuscript repository
- When reading manuscript content, be aware it's maintained separately

**Initialization:**

When working with a fresh clone, initialize submodules:

```bash
git submodule update --init --recursive
```

**Submodule updates are two-step:**

1. Changes are made in the manuscript repository
2. This repository's submodule pointer is updated to reference the new commit

**Updating to latest manuscript version:**

```bash
# Update submodule to latest from tracked branch (main)
git submodule update --remote invisible-users/manuscript

# Commit the submodule pointer update
git add invisible-users/manuscript
git commit -m "Update manuscript submodule to latest version"
```

## Documentation Structure

### Book Documentation

- `invisible-users/book-plan.md` - Master plan with chapter outlines and status
- `invisible-users/manuscript/Glossary.md` - Comprehensive technical glossary
- `invisible-users/manuscript/appendix-implementation-roadmap.md` - Priority-based implementation guide
- `invisible-users/manuscript/appendix-resource-directory.md` - Curated resources and references

### Web Audit Suite Documentation

- `web-audit-suite/README.md` - Complete tool documentation
- `web-audit-suite/QUICKSTART.md` - 5-minute getting started guide
- `web-audit-suite/docs/usermanual.md` - Complete user guide
- `web-audit-suite/docs/CONFIGURATION.md` - Configuration reference
- `web-audit-suite/docs/FEATURES.md` - Feature overview
- `web-audit-suite/docs/report-layout.md` - Report structure and data schema

## Cross-Project Consistency and Terminology

### Shared Terminology Standards

Ensure consistency across all projects (book, tools, documentation) for these key terms:

**AI Agent Concepts:**

- "AI agent" (not "AI bot" or "AI scraper")
- "served HTML" (static HTML before JavaScript execution)
- "rendered HTML" (dynamic HTML after JavaScript execution)
- "llms.txt" (lowercase, no capitalization)
- "robots.txt" (lowercase)
- "data-agent-visible" (attribute for explicit agent visibility control)
- "LLM suitability" (for scoring/analysis)

**Accessibility Terms:**

- "WCAG 2.1" (not "WCAG 2.1.0" or "WCAG2.1")
- "Pa11y" (capital P, lowercase a, double 1)
- "semantic HTML" (lowercase)
- "Schema.org" (capital S, lowercase org)

**Quality Metrics:**

- "robots.txt quality score" (0-100 scale)
- "llms.txt quality score" (0-100 scale)
- "accessibility compliance" (not "accessibility score")
- "SEO score" (uppercase)

### Project Relationships and Authoritative Sources

**CRITICAL PRINCIPLE:** The book is the authoritative source for all terminology, patterns, and concepts.

#### 1. The Book is Authoritative

The Invisible Users book (`invisible-users/` directory) is the authoritative source for:

- Terminology and definitions
- Pattern descriptions
- Conceptual frameworks
- Examples and use cases

If there's a conflict between the book and the tool, update the tool to match the book.

#### 2. The Tool Implements the Book

Web Audit Suite (`web-audit-suite/` directory) implements the concepts from the book:

- Detects patterns described in the book
- Uses terminology from the book
- Provides recommendations based on book guidance
- Validates examples from the book

#### 3. Documentation Must Align

All documentation must be aligned:

- Same terms mean the same thing across projects
- Examples are consistent
- Cross-references are accurate
- Status updates are synchronized

### Coordinating Cross-Project Changes

When making changes that affect multiple projects:

**Terminology Changes:**

1. Update the book first (authoritative source)
2. Update tool implementation to match
3. Update shared documentation

**New Patterns:**

1. Document pattern in the book with examples
2. Implement detection/analysis in the tool
3. Update documentation with pattern summary

**Tool Features:**

1. Implement feature in Web Audit Suite
2. Verify terminology matches the book
3. Document cross-references

### Quality Assurance for Cross-Project Work

Before committing cross-project changes:

1. **Consistency Check:**
   - Same terminology across all projects
   - Aligned examples and code samples
   - Updated documentation links

2. **Markdown Linting:**
   - No bare URLs
   - Unique headings
   - Proper code block languages

3. **Documentation:**
   - Updated README files
   - Updated CHANGELOG files (if applicable)
   - Cross-referenced related changes

## Contact Information

Maintain consistent contact information across all projects:

- Email: <tom.cranstoun@gmail.com>
- Website: <https://allabout.network>

## Notes for Future Development

- Book manuscript: Publication-ready (v2.5.1)
- Web Audit Suite: Production-ready implementation of book's patterns
- Both projects cross-reference each other for coherent guidance
