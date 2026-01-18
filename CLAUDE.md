# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## ⚠️ CRITICAL: Check Working Directory Before File Operations

**This workspace has TWO git repositories (main + submodule). File paths depend on your location.**

**MANDATORY: Run `pwd` before accessing `.claude/` files**

- Main repo: `/Users/tomcranstoun/Documents/GitHub/invisible-users/` (has `.claude/`)
- Submodule: `/Users/tomcranstoun/Documents/GitHub/invisible-users/packages/manuscript/the-bible-of-mx/` (NO `.claude/`)

**📖 See [GIT-README.md](GIT-README.md) for comprehensive git workflow guidance for AI agents.**

Also see `.claude/pwd-reminder.md` and "Git Directory Navigation" section below for details.

---

## Project Overview

This repository contains two integrated projects:

### 1. The Invisible Users (Book Manuscripts)

This project produces multiple books from a single manuscript repository, each targeting different audiences:

**"The Invisible Users: Designing the Web for AI Agents and Everyone Else"** (The Bible)

- Full comprehensive guide examining how modern web design optimized for human users fails for AI agents, and how fixing this benefits everyone
- 13 chapters covering business, legal, security, technical, and strategic perspectives
- 12 appendices with implementation guides, code examples, and resources
- ~78,000 words core manuscript + ~58,600 words appendices
- Location: `packages/manuscript/the-bible-of-mx/manuscripts/bible/`

**"Don't Make AI Think: Designing Web Interfaces for AI Agents"** (Slim Version)

- Focused practical implementation guide for developers and designers
- 10 chapters covering essential patterns and anti-patterns
- Streamlined for quick reference and immediate application
- Location: `packages/manuscript/the-bible-of-mx/manuscripts/dont-make-ai-think/`

**Future books:** The manuscript structure supports creating additional derivative works targeting specific audiences (e.g., executive summaries, industry-specific guides, technical deep-dives).

**Current status:** Both manuscripts complete and ready for publication (Due Q1 2026)

### Publication Status

Current Status: EDIT FOR PUBLICATION (Post-Review)

- Book manuscript has completed review phase
- Publication date: Due Q1 2026
- Do NOT assume published status based on current date
- User will explicitly confirm when published
- Until then, manuscript remains "Due Q1 2026"

**CRITICAL WRITING REQUIREMENT:**

When adding or modifying content in this repository, NEVER write narrative text that describes changes being made or features being added. Always write as if the feature or content has always existed in its current form.

**Examples of FORBIDDEN narrative writing:**

- ❌ "We have added meta tag validation"
- ❌ "This update includes new scoring"
- ❌ "Recently implemented social media tags"
- ❌ "Now includes support for..."
- ❌ "Has been enhanced to..."

**Examples of CORRECT writing:**

- ✅ "Meta tag validation provides scoring"
- ✅ "Social media tags contribute +20 points"
- ✅ "The Web Audit Suite validates meta tags"
- ✅ "Recipe 12 demonstrates social media integration"

**Rationale:** The book is in final editing before publication. All documentation must read as authoritative reference material, not as a development log. Write in present tense as definitive statements of how things work, not how they were changed.

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
├── GIT-README.md             # Git workflow guide for AI agents
├── CHANGELOG.md
├── PROJECTSTATE.md
├── PR_TEMPLATE.md
├── package.json              # Monorepo workspace configuration
├── llms.txt                  # Repository llms.txt file
├── docs/                     # Documentation and architecture
│   ├── doc-architecture.md         # Repository restructure documentation with Mermaid diagrams
│   ├── web-audit-architecture.md   # Web Audit Suite architecture documentation
│   └── sales-enablement/           # Sales materials, pitch decks, business plan
│       ├── business/               # Business strategy documents
│       ├── pitches/                # Pitch materials and case studies
│       ├── publishers/             # O'Reilly submission materials
│       ├── partners/               # Partner-focused materials (Kentico, toolkit)
│       ├── outreach/               # Communication templates (Adobe, reviewers)
│       ├── content/                # Blog and promotional content
│       ├── profiles/               # Professional profiles (LinkedIn, general)
│       └── pricing/                # Pricing strategy
├── scripts/                  # Build scripts
│   └── download-cover-images.js    # Downloads cover images for illustrations
├── packages/                 # Monorepo packages
│   ├── manuscript/           # Book manuscript and materials
│   │   ├── book-svg-style.md # SVG illustration style guide (shared across all books)
│   │   └── the-bible-of-mx/  # Manuscript submodule (git submodule)
│   │       ├── manuscripts/        # All book manuscripts
│   │       │   ├── bible/          # "The Invisible Users" (full book)
│   │       │   │   ├── bible-plan.md      # Master plan with chapter outlines and status
│   │       │   │   ├── [13 chapters, 12 appendices, metadata, illustrations, web/]
│   │       │   └── dont-make-ai-think/    # "Don't Make AI Think" (slim version)
│   │       │       ├── [10 chapters focused on practical implementation]
│   │       ├── code/               # All code examples
│   │       │   ├── agent-friendly-starter-kit/  # Code examples (good/ vs bad/)
│   │       │   └── examples/       # Production-ready code implementations
│   │       ├── marketing/          # All promotional content
│   │       │   ├── blog/           # Blog and promotional materials
│   │       │   └── talks/          # Presentation materials
│   │       └── todo.txt            # Project task list (USER REFERENCE ONLY - see below)
│   ├── web-audit-suite/      # Web analysis tool (implements book's patterns)
│   ├── index.js              # Entry point, CLI parsing, logger setup
│   ├── package.json          # Tool-specific dependencies
│   ├── README.md             # Tool documentation
│   ├── QUICKSTART.md
│   ├── src/
│   │   ├── main.js           # Orchestrates 4-phase pipeline
│   │   ├── config/
│   │   │   └── defaults.js   # Default configuration values
│   │   └── utils/
│   │       ├── robotsFetcher.js    # Phase 0: robots.txt fetching
│   │       ├── robotsCompliance.js # Phase 0: Compliance checking
│   │       ├── robotsTxtParser.js  # Phase 0: Quality analysis
│   │       ├── sitemap.js          # Phase 1: URL extraction
│   │       ├── urlProcessor.js     # Phase 2: Concurrent URL processing
│   │       ├── browserPool.js      # Phase 2: Browser pooling
│   │       ├── rateLimiter.js      # Phase 2: Adaptive rate limiting
│   │       ├── pageAnalyzer.js     # Phase 2: Page content analysis
│   │       ├── pa11yRunner.js      # Phase 2: Accessibility testing
│   │       ├── llmMetrics.js       # Phase 2: LLM suitability metrics
│   │       ├── technologyDetection.js  # Phase 2: Technology detection
│   │       ├── caching.js          # Cache management with staleness checking
│   │       ├── metricsUpdater.js   # Phase 2: Results.json updates
│   │       ├── reports.js          # Phase 3a: Report coordination
│   │       ├── reportUtils/
│   │       │   ├── reportGenerators.js  # Phase 3a: All report generation
│   │       │   └── llmReports.js        # Phase 3a: LLM suitability reports
│   │       ├── patternExtraction.js    # Phase 3b: Pattern extraction
│   │       └── historicalComparison.js # Phase 3c: Regression detection
│   ├── results/              # Generated output (gitignored)
│   ├── .cache/               # Puppeteer cache (auto-created, gitignored)
│   ├── docs/                 # Tool documentation
│   │   ├── usermanual.md
│   │   ├── CONFIGURATION.md
│   │   ├── FEATURES.md
│   │   └── AI-design-rules/  # AI assistant extension prompts
│   ├── examples/             # Configuration examples
│   ├── LEARNINGS.md          # Battle-tested rules and patterns
│   ├── PROJECTSTATE.md       # Complete implementation snapshot
│   ├── IMPROVEMENT_PLAN.md   # Comprehensive improvement roadmap
│   └── CODE_REVIEW_CHECKLIST.md  # Quality assurance guide
```

**Note:** PNG illustrations are generated from SVG sources using `npm run illustrations:generate` and are not tracked in version control.

**Illustration Generation Process:**

The `npm run illustrations:generate` command performs these steps:

1. **Downloads cover images** (if missing): Profile.png, A4-Cover.png, Kindle-Cover.png
2. **Checks for back-cover.png**: This file must be generated manually by:
   - Opening [packages/manuscript/the-bible-of-mx/manuscripts/bible/web/back-cover.html](packages/manuscript/the-bible-of-mx/manuscripts/bible/web/back-cover.html) in a browser
   - Taking a full-page screenshot
   - Saving as `back-cover.png` in `packages/manuscript/the-bible-of-mx/manuscripts/bible/illustrations/`
3. **Converts SVG to PNG**: All .svg files in manuscripts/bible/illustrations/ are converted to .png using ImageMagick

**Note:** Each book can have its own illustrations folder. The command currently targets The Bible's illustrations.

## Project Task List (todo.txt)

**Location:** `packages/manuscript/the-bible-of-mx/todo.txt`

**CRITICAL: This file is the USER'S personal project task list and reference.**

**Purpose:**

- Contains URLs, notes, and reminders for various project tasks
- Used by the user for planning and tracking different aspects of the solution
- Content is ephemeral and changes frequently as the user works through different tasks
- May contain URLs for images, assets, documentation links, or other resources

**How Claude Code should interact with todo.txt:**

1. **NEVER execute tasks from todo.txt autonomously**
   - Claude must NOT treat items in todo.txt as automatic instructions
   - Claude must NOT implement tasks found in todo.txt without explicit user direction

2. **User must explicitly request action**
   - The user will provide clear, direct instructions for any task they want Claude to perform
   - If a task happens to be related to something in todo.txt, the user will specify it explicitly
   - Example: "Download the images referenced in todo.txt and add them to illustrations/"

3. **Reading todo.txt is informational only**
   - Claude may read todo.txt to understand context if explicitly asked
   - Claude should not proactively offer to complete tasks listed in todo.txt
   - Claude should not suggest implementing items from todo.txt unless directly asked

4. **todo.txt is user-owned**
   - This file belongs to the user's workflow
   - Claude should not modify todo.txt unless explicitly asked
   - Claude should not assume the file structure or content format is stable

**Example - Correct interaction:**

```text
User: "Download the cover images from the URLs in todo.txt"
Claude: [Reads todo.txt, extracts URLs, downloads images as instructed]
```

**Example - Incorrect interaction:**

```text
Claude: [Reads todo.txt] "I see you have some tasks listed. Would you like me to implement them?"
→ This is WRONG - Claude should not proactively suggest implementing todo.txt items
```

**Dual-File Appendix Structure:**

Some appendices use a dual-file structure where content is maintained separately from presentation:

**Appendix H (Example llms.txt):**

- **`manuscripts/bible/appendix-h-live-llms.txt`** - The actual llms.txt content (source of truth, 20 curated links)
- **`manuscripts/bible/appendix-h-live-llms.md`** - Markdown wrapper that displays the .txt content in a code block

**Appendix D (AI-Friendly HTML Guide):**

- **`manuscripts/bible/appendix-d-ai-friendly-html-guide.txt`** - The actual guide content (source of truth, ~3,000 lines)
- **`manuscripts/bible/appendix-d-ai-friendly-html-guide.md`** - Markdown wrapper with introduction and table of contents

**Why both files?**

The PDF generation command (`pdf:generate` in package.json) uses `appendix-*.md` pattern but excludes `.txt` files. The .md wrapper includes introduction text plus the .txt content in a markdown code block, allowing the PDF to show "here's a complete guide you can copy-paste" as a formatted example. The .txt file remains the source of truth that can be:

- Edited independently without Pandoc formatting concerns
- Copied directly into AI assistants (Claude Code, Cursor, GitHub Copilot) for implementation guidance
- Used as a reference without needing to parse code blocks

### CRITICAL: When Editing Dual-File Appendices

⚠️ **You MUST update BOTH the .txt and .md files when making content changes to Appendix D or Appendix H:**

**Workflow for ANY dual-file appendix:**

1. **Primary edit:** Make content changes to the `.txt` file (source of truth)
2. **Secondary update:** Update the `.md` file to reflect changes

**Which dual-file appendices exist:**

- **Appendix D** (AI-Friendly HTML Guide) - Has table of contents in .md file
- **Appendix H** (Example llms.txt) - Has introduction text in .md file

**Example - Adding a section to Appendix D:**

```bash
# Step 1: Edit the .txt file (add content)
Edit packages/manuscript/the-bible-of-mx/manuscripts/bible/appendix-d-ai-friendly-html-guide.txt
# Add new "Common Validation Pitfalls" section at line 2674

# Step 2: Update the .md file (update TOC)
Edit packages/manuscript/the-bible-of-mx/manuscripts/bible/appendix-d-ai-friendly-html-guide.md
# Update Part 9 description from:
#   "Testing and Validation - Automated Playwright tests, manual validation"
# To:
#   "Testing and Validation - Automated Playwright tests, common validation pitfalls, manual validation tools"
```

**Example - Adding links to Appendix H:**

```bash
# Step 1: Edit the .txt file (add links)
Edit packages/manuscript/the-bible-of-mx/manuscripts/bible/appendix-h-live-llms.txt
# Add new curated links to the 20-link collection

# Step 2: Update the .md file (update count if changed)
Edit packages/manuscript/the-bible-of-mx/manuscripts/bible/appendix-h-live-llms.md
# Update link count in introduction if changed from 20 to a different number
```

**What needs updating in the .md file:**

- **Table of contents** - If you added/removed/renamed sections
- **Part descriptions** - Brief summary of what each part covers
- **Introduction text** - If the guide's purpose or scope changed

**What does NOT need updating in the .md file:**

- Detailed content (lives in .txt file only)
- Code examples (lives in .txt file only)
- Technical patterns (lives in .txt file only)

**Verification:**

After updating both files, verify consistency:

```bash
# Check that .md table of contents matches .txt structure
grep "^## Part" packages/manuscript/the-bible-of-mx/manuscripts/bible/appendix-d-ai-friendly-html-guide.txt
# Compare against .md table of contents (lines 14-24)
```

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
                            # Includes automatic Chapter 11 pattern enhancement
                            # Also generates sitemap.xml for search engine discovery

# Chapter status
npm run status              # Show all chapter files

# Commit and push all repositories
npm run commit-push         # Interactive commit and push for both main repo and submodule
```

**HTML Appendix Enhancement:** The `pdf:appendix` command automatically enhances Pandoc-generated HTML with Chapter 10 technical patterns via [scripts/enhance-appendix-html.js](scripts/enhance-appendix-html.js). It also generates a sitemap.xml file for search engine discovery via [scripts/generate-sitemap.js](scripts/generate-sitemap.js). See [scripts/README-appendix-enhancements.md](scripts/README-appendix-enhancements.md) for details.

### Accessibility Contrast Requirements

**CRITICAL:** All UI elements must meet WCAG 2.1 AA contrast requirements:

- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text (18pt+ or 14pt+ bold):** Minimum 3:1 contrast ratio
- **UI components and graphical objects:** Minimum 3:1 contrast ratio

**Common violations to avoid:**

- Black text on blue backgrounds (insufficient contrast)
- Light grey text on white backgrounds
- Blue links on blue backgrounds
- Disabled state with insufficient contrast

**Testing:** Use browser DevTools or online contrast checkers to verify all color combinations meet WCAG AA standards before deployment.

### Web Audit Suite Commands

```bash
# Run analysis with default settings (performance optimized)
npm run audit:start

# Run with custom sitemap/URL and output directory
npm run audit:start -- -s <url> -o <output-dir>

# Run with limited URLs for testing (e.g., 10 pages)
npm run audit:start -- -s <url> -c 10

# Performance-optimized for large sites
npm run audit:start -- -s <url> --browser-pool-size 5 --url-concurrency 5

# With pattern extraction from high-scoring pages
npm run audit:start -- -s <url> --extract-patterns

# With regression detection (CI/CD-ready)
npm run audit:start -- -s <url> --enable-history

# Force scrape (bypass robots.txt - use with caution)
npm run audit:start -- -s <url> --force-scrape

# Full featured analysis
npm run audit:start -- -s <url> --enable-history --extract-patterns --generate-dashboard --generate-executive-summary

# Run linting for Web Audit Suite code
npm run audit:lint

# Run tests for Web Audit Suite
npm run audit:test
```

**Performance Features (enabled by default):**

- **Browser pooling**: 97% reduction in browser launches (configurable via `--browser-pool-size`)
- **Concurrent URL processing**: 3 URLs simultaneously (configurable via `--url-concurrency`)
- **Adaptive rate limiting**: Server-friendly dynamic concurrency
- **Cache staleness checking**: Automatic validation with HTTP HEAD requests
- **Expected performance**: 3-5x faster (100 URLs in ~10 minutes vs ~45 minutes)

**Ethical Scraping (robots.txt compliance):**

- Phase 0 fetches robots.txt before crawling
- Interactive prompts for blocked URLs
- 100-point quality scoring system
- Use `--force-scrape` to bypass (requires explicit user action)

**Advanced Analysis Features:**

- **`--extract-patterns`**: Extract patterns from high-scoring pages (≥70 score)
- **`--enable-history`**: Regression detection with CI/CD exit codes
- **Technology detection**: Automatic CMS, framework, library detection

**Note on ESLint**: The Web Audit Suite uses ESLint 8.57.0 with `.eslintrc.cjs` configuration. Always use `npm run audit:lint` from the root, or `npm run lint` from within the `packages/web-audit-suite/` directory.

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
  - **CRITICAL:** MD024 cannot be disabled or suppressed - duplicate headings break CI/CD
  - Fix by making headings unique with descriptive context, not by adjusting lint configuration
  - Example: `### Added - 2026-01-10` appears twice → Add context: `### Added - Publication Status (2026-01-10)` and `### Added - Web Pages (2026-01-10)`
- **MD036:** Emphasis used instead of heading (e.g., `**Date**` as standalone should be `Date` or `## Date`)
- **MD022:** Headings must be surrounded by blank lines
- **MD040:** Code blocks must have language specified (use `text` for email templates)
- **MD047:** Files must end with single newline
- **MD060:** Table separators need proper spacing around pipes
- **MD031:** Code blocks must have blank lines before and after
- **MD034:** Bare URLs should be wrapped in angle brackets or markdown links

## Web Audit Suite Architecture

### Four-Phase Processing Pipeline

0. **robots.txt Compliance Phase** (`fetchRobotsTxt`):
   - Fetches robots.txt before any crawling begins
   - HTTP fetch with Puppeteer fallback for Cloudflare sites
   - Parses and validates robots.txt directives
   - 100-point quality scoring system (based on book guidance)
   - Interactive prompts for blocked URLs
   - Stores compliance rules in context for Phase 1

1. **URL Collection Phase** (`getUrlsFromSitemap`):
   - Processes sitemap XML or extracts links from HTML
   - Handles both XML sitemaps and regular webpages
   - Uses browser pool for Cloudflare-protected sites
   - Validates URLs against robots.txt rules
   - Normalizes URLs and applies count limit

2. **Data Collection Phase** (`processSitemapUrls`):
   - Initializes browser pool (3 reusable browsers by default)
   - Initializes adaptive rate limiter
   - Processes URLs concurrently (default: 3 simultaneous)
   - Collects performance metrics, SEO data, accessibility issues
   - Runs Pa11y for WCAG 2.1 compliance testing
   - Detects technology stack (CMS, frameworks, libraries)
   - Checks cache staleness with HTTP HEAD requests
   - Stores all data in `results.json` (single source of truth)
   - 3-5x faster than sequential processing

3. **Report Generation Phase** (`generateReports`):
   - Reads from `results.json` only
   - Phase 3a: Generates standard CSV and markdown reports
   - Phase 3b: Extracts patterns from high-scoring pages (if `--extract-patterns`)
   - Phase 3c: Detects regressions against baseline (if `--enable-history`)
   - Never fetches new data during report generation

### Key Design Principle: Single Source of Truth

**CRITICAL**: `packages/web-audit-suite/results/results.json` is the single source of truth. All reports MUST be generated from this file. Report generation functions should NEVER:

- Fetch URLs directly
- Make network requests
- Collect new data
- Use Puppeteer

If data is missing from `results.json`, re-run the analysis phase, don't add data collection to report generation.

### LLM Suitability Analysis

The Web Audit Suite implements the patterns from "The Invisible Users" book:

Reference Documentation:

- Book manuscripts: `packages/manuscript/the-bible-of-mx/manuscripts/` directory
- The Bible (full): `packages/manuscript/the-bible-of-mx/manuscripts/bible/`
- Don't Make AI Think (slim): `packages/manuscript/the-bible-of-mx/manuscripts/dont-make-ai-think/`
- Implementation guidance: `packages/manuscript/the-bible-of-mx/manuscripts/bible/chapter-12-technical-advice.md`
- Quick reference: `packages/manuscript/the-bible-of-mx/manuscripts/bible/appendix-e-ai-patterns-quick-reference.md`

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

A practical concern discussed briefly in Chapters 4, 6, 10, and 11: When agents make purchases, businesses lose customer identity. The book mentions identity delegation patterns as one emerging solution, without prescribing a specific implementation.

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

**When working with multiple books from the same manuscript repository:**

The repository contains multiple books targeting different audiences. Be aware of which book you're editing:

- **The Bible** (`manuscripts/bible/`) - Full comprehensive guide with all chapters and appendices
- **Don't Make AI Think** (`manuscripts/dont-make-ai-think/`) - Slim practical guide with focused content

**When asked to review or edit a chapter:**

1. Identify which book the chapter belongs to
2. Read the chapter file completely
3. Check the appropriate plan file:
   - The Bible: `packages/manuscript/the-bible-of-mx/manuscripts/bible/bible-plan.md`
   - Don't Make AI Think: `packages/manuscript/the-bible-of-mx/manuscripts/dont-make-ai-think/CHAPTERS-GUIDE.md`
4. Verify consistency with established themes for that book
5. Ensure British English and style guidelines
6. Confirm sequential flow - don't reference future chapters
7. Check that technical examples use simple JavaScript with minimal dependencies

### Web Audit Suite Development

When modifying the Web Audit Suite:

1. Check what data exists in `packages/web-audit-suite/results/results.json` structure
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
Read(file_path="packages/manuscript/book-plan.md")
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

### Skill Files Exclusion

**CRITICAL:** Never fix markdown linting issues in `.claude/skills/` files.

Skill files (`.claude/skills/*.md`) have their own formatting requirements that may conflict with standard markdown rules. Leave skill files as-is even if they trigger linting warnings like:

- MD032 (Lists should be surrounded by blank lines)
- MD034 (Bare URL used)
- Other markdown formatting rules

**Rationale:** Skills are consumed by Claude Code's skill system, which has specific parsing requirements. Standard markdown linting rules may break skill functionality.

**When running linting commands:** The npm scripts (`npm run lint:markdown` and `npm run lint:markdown:fix`) exclude `.claude/` directory from linting via `--ignore .claude` flag. If you encounter linting warnings in skill files during manual editing, ignore them.

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

## HTML Validation and AI-Friendly Patterns

### HTML Validation Tools

When working with HTML files (especially web appendices and marketing pages), use validation tools to catch common errors:

**html-validate (local CLI):**

```bash
npx html-validate path/to/file.html
```

Catches:

- Unencoded special characters (`&` must be `&amp;`)
- Redundant ARIA roles
- ARIA attribute misuse
- Non-semantic HTML structure
- Accessibility violations

**W3C Validator (online):**

Visit: <https://validator.w3.org/>

Checks:

- HTML5 spec compliance
- Well-formed markup
- Valid attributes
- Proper nesting

### Common HTML Validation Pitfalls

These issues often slip through but break both AI agent parsing and accessibility:

#### 1. Unencoded Special Characters

**Bad:**

```html
<div>Technical patterns & implementation</div>
```

**Good:**

```html
<div>Technical patterns &amp; implementation</div>
```

Always encode: `&` as `&amp;`, `<` as `&lt;`, `>` as `&gt;`, `"` as `&quot;` (in attributes)

#### 2. Redundant ARIA Roles

**Bad:**

```html
<section role="region" aria-label="Book review">
```

**Good:**

```html
<section aria-label="Book review">
```

Semantic elements have implicit roles:

- `<section>` = region (when it has an accessible name)
- `<nav>` = navigation
- `<main>` = main
- `<article>` = article
- `<footer>` = contentinfo (when top-level)

#### 3. ARIA Attributes on Non-Interactive Elements

**Bad:**

```html
<div class="stars" aria-label="Rating: 4 out of 5 stars">★★★★☆</div>
```

**Good:**

```html
<div class="stars" role="img" aria-label="Rating: 4 out of 5 stars">★★★★☆</div>
```

`aria-label` only works on:

- Interactive elements (buttons, links, inputs)
- Landmark roles (navigation, main, etc.)
- Elements with explicit `role="img"` or similar

#### 4. Missing Semantic Structure

**Bad:**

```html
<div class="content">
    <section>...</section>
</div>
```

**Good:**

```html
<div class="content">
    <main>
        <article>
            <section>...</section>
        </article>
    </main>
</div>
```

Every page should have:

- One `<main>` element containing primary content
- `<article>` for self-contained content
- `<section>` for thematic groupings within articles

#### 5. Inline Styles Warning

html-validate will warn about inline styles. This is acceptable for:

- Single-file HTML pages (email templates, design comps)
- Pages meant for screenshot generation (like back-cover.html)
- Marketing landing pages with unique designs

For production sites with separate CSS files, avoid inline styles.

### AI-Friendly HTML Patterns Reference

When creating web pages (appendices, marketing materials, documentation):

**Essential patterns:**

1. **Semantic HTML** - Use `<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`
2. **Schema.org JSON-LD** - Add structured data for book, person, organization
3. **Machine-readable dates** - Use `<time datetime="2026-03-31">` with ISO 8601 format
4. **Explicit locale** - Use `<html lang="en-GB" data-locale="en-GB">`
5. **Contact information** - Wrap URLs in `<address>` element

**Complete reference:** See [appendix-d-ai-friendly-html-guide.txt](packages/manuscript/the-bible-of-mx/manuscripts/bible/appendix-d-ai-friendly-html-guide.txt) for comprehensive patterns.

**Real-world example:** The [back-cover.html](packages/manuscript/the-bible-of-mx/manuscripts/bible/web/back-cover.html) demonstrates all patterns in production use.

### Pre-Deploy HTML Checklist

Before deploying HTML changes:

- [ ] All `&` characters encoded as `&amp;`
- [ ] No redundant `role` attributes on semantic elements
- [ ] `aria-label` only used on elements that support it
- [ ] Semantic elements used instead of divs where appropriate
- [ ] Document has `<main>` landmark
- [ ] Self-contained content wrapped in `<article>`
- [ ] Schema.org JSON-LD validates without errors (use <https://validator.schema.org>)
- [ ] Passes W3C HTML validator

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

- Repository structure diagrams: `CLAUDE.md`, `README.md`, `llms.txt`
- Book plan files: `packages/manuscript/the-bible-of-mx/manuscripts/bible/bible-plan.md`, `packages/manuscript/the-bible-of-mx/manuscripts/dont-make-ai-think/CHAPTERS-GUIDE.md`
- Cross-references: `packages/manuscript/the-bible-of-mx/marketing/blog/blog.md`, `PROJECTSTATE.md`

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

Four custom skills are available via the `/` command syntax:

1. **`/step-commit`** - Systematic commit workflow
   - **CRITICAL**: Checks BOTH main repository AND manuscript submodule for changes
   - If submodule has uncommitted changes, commits submodule FIRST, then updates pointer in main repo
   - Reviews all changes with git status and git diff
   - Commits code changes
   - Runs linting and fixes errors
   - Reviews and updates documentation (README, CLAUDE.md, CHANGELOG.md)
   - Does NOT add attribution or "Generated with" messages
   - **Dual-repository workflow**: Automatically handles submodule commits and pointer updates

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
   - Updates both `packages/manuscript/the-bible-of-mx/marketing/blog/book-updates.md` and `manuscripts/bible/appendix-j-industry-developments.md`
   - Includes qualifiers for unverified company-reported metrics
   - Only adds news that validates or challenges specific book chapters
   - **Usage:** `/news [paste news content or URL]`

4. **`/review-docs`** - Review documents against writing style guide
   - Loads complete writing style guide from [docs/for-ai/writing-style.md](docs/for-ai/writing-style.md)
   - Analyzes documents for style violations across all rule categories
   - Identifies issues by priority: Critical, Important, Style, Markdown
   - Checks forbidden vocabulary (23 words), forbidden constructs (14 patterns)
   - Validates British English spelling, heading format, voice and tone
   - Provides specific fixes with line numbers for all violations
   - Applies to any file (manuscript, documentation, HTML)
   - **Usage:** `/review-docs [file paths...]`
   - **Example:** `/review-docs packages/manuscript/the-bible-of-mx/chapter-01.md`

### Git Hooks

The `pre-tool-use.sh` hook provides automatic workflow reminders:

**Manuscript Style Enforcement:**

- Detects when editing manuscript files (`packages/manuscript/the-bible-of-mx/*.md`, `*.html`, `*.txt`)
- Displays writing style reminder with key requirements:
  - British English (organise, colour, whilst)
  - Forbidden vocabulary (delve, leverage, robust, seamless, etc.)
  - No colons in headings
  - Active voice, third person default
  - Concise, calm, concrete tone
- Suggests using `/review-docs` command for comprehensive review
- Non-blocking: reminder only, does not prevent edits

**Directory Navigation Safety:**

- Detects wrong-repository file path mistakes
- Prevents accessing `.claude/` from submodule directory
- Provides pwd reminders when navigating between main repo and submodule

**Additional Hooks:**

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

### Commit and Push All Repositories

**Use `npm run commit-push` for easy commits across both repositories.**

**Note:** This command is for human users of the repository. Claude Code should NOT use this command - Claude should use the `/step-commit` skill instead, which provides proper review and validation workflows.

This interactive command ([scripts/commit-and-push-all.sh](scripts/commit-and-push-all.sh)) handles the proper workflow:

1. **Checks manuscript submodule** for changes first
   - Shows status of any modified/untracked files
   - Prompts for commit message (press Enter to use "tidy")
   - Commits and pushes to submodule remote

2. **Checks main repository** for changes
   - Shows status including submodule pointer changes
   - Prompts for commit message (press Enter to use "tidy")
   - Commits and pushes to main remote

**Why this order matters:** The submodule must be committed and pushed FIRST. Then the main repository commits the updated submodule pointer. This ensures the main repo always points to commits that exist on the remote.

**Example usage:**

```bash
npm run commit-push

# Output:
# 🔍 Checking for changes...
# 📝 Submodule has changes:
#  M chapter-01-the-invisible-failure.md
# Enter commit message for manuscript submodule (or press Enter for 'tidy'): Fix typo in chapter 1
# 📦 Committing submodule changes...
# ⬆️  Pushing submodule to remote...
# ✅ Submodule committed and pushed
#
# 📝 Main repository has changes:
#  M packages/manuscript/the-bible-of-mx
# Enter commit message for main repository (or press Enter for 'tidy'): [Enter pressed]
# 📦 Committing main repository changes...
# ⬆️  Pushing main repository to remote...
# ✅ Main repository committed and pushed
```

### Git Directory Navigation

**⚠️ ABSOLUTE REQUIREMENT: Run `pwd` BEFORE EVERY file operation, directory navigation, or git command in this repository. NO EXCEPTIONS.**

This repository has a git submodule at `packages/manuscript/the-bible-of-mx/` which can be accessed from root, but if you're already inside the submodule directory, further `cd` attempts will fail with "No such file or directory" errors.

**TWO REPOSITORIES IN THIS WORKSPACE:**

1. **Main repo:** `/Users/tomcranstoun/Documents/GitHub/invisible-users/`
   - Contains: `.claude/`, `packages/web-audit-suite/`, `docs/`, `CLAUDE.md`, `LEARNINGS.md`
   - Project-level configuration and skills

2. **Submodule:** `/Users/tomcranstoun/Documents/GitHub/invisible-users/packages/manuscript/the-bible-of-mx/`
   - Contains: chapters, appendices, blog files
   - Does NOT contain `.claude/` directory

**MANDATORY WORKFLOW FOR ALL FILE OPERATIONS:**

```bash
# STEP 1: ALWAYS check location first - THIS IS NOT OPTIONAL
pwd

# STEP 2: Use correct path based on output
# If in main repo (/invisible-users/):
Read(file_path=".claude/skills/news/skill.md")

# If in submodule (/packages/manuscript/the-bible-of-mx/):
Read(file_path="../../.claude/skills/news/skill.md")
```

**MANDATORY WORKFLOW FOR GIT OPERATIONS:**

```bash
# STEP 1: ALWAYS check location first - THIS IS NOT OPTIONAL
pwd

# STEP 2: Use git commands from current location
# ❌ NEVER do: cd packages/manuscript/the-bible-of-mx && git add -A
# ✅ ALWAYS do: git add -A (from current location)

# Git knows about the submodule and will handle it correctly
# DO NOT attempt to navigate to the submodule directory
```

**Common mistake patterns (THESE ARE ERRORS - DO NOT DO THIS):**

```bash
# ❌ WRONG: Attempting to access .claude/ without checking pwd
Read(file_path=".claude/skills/news/skill.md")  # Fails if in submodule

# ❌ WRONG: Assuming you're in root when you're not
ls .claude/skills/news/  # "No such file or directory"

# ❌ WRONG: Attempting to navigate to submodule during git operations
cd packages/manuscript/the-bible-of-mx && git add -A  # "No such file or directory"

# ✅ CORRECT: Always start with pwd
pwd  # Check location FIRST - NOT OPTIONAL
# Then construct correct path or use git from current location
```

**CRITICAL REQUIREMENT:** Check `pwd` before EVERY file operation, EVERY directory navigation attempt, and EVERY git command in this repository. Never assume your current location. The submodule structure makes ALL path assumptions unreliable. This has been repeated multiple times and is documented in LEARNINGS.md as a recurring error. The `.claude/hooks/pre-tool-use.sh` hook provides automated enforcement for `.claude/` file access, but you must still check `pwd` manually before git operations.

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
git submodule update --remote packages/manuscript/the-bible-of-mx

# Commit the submodule pointer update
git add packages/manuscript/the-bible-of-mx
git commit -m "Update manuscript submodule to latest version"
```

## Documentation Structure

### Book Documentation

**The Bible (Full Book):**

- `packages/manuscript/the-bible-of-mx/manuscripts/bible/bible-plan.md` - Master plan with chapter outlines and status
- `packages/manuscript/the-bible-of-mx/manuscripts/bible/Glossary.md` - Comprehensive technical glossary
- `packages/manuscript/the-bible-of-mx/manuscripts/bible/appendix-f-implementation-roadmap.md` - Priority-based implementation guide
- `packages/manuscript/the-bible-of-mx/manuscripts/bible/appendix-g-resource-directory.md` - Curated resources and references

**Don't Make AI Think (Slim Version):**

- `packages/manuscript/the-bible-of-mx/manuscripts/dont-make-ai-think/README.md` - Book overview and structure
- `packages/manuscript/the-bible-of-mx/manuscripts/dont-make-ai-think/CHAPTERS-GUIDE.md` - Chapter organization guide

**Shared Resources:**

- `packages/manuscript/book-svg-style.md` - SVG illustration style guide (applies to all books)

### Web Audit Suite Documentation

- `packages/web-audit-suite/README.md` - Complete tool documentation
- `packages/web-audit-suite/QUICKSTART.md` - 5-minute getting started guide
- `packages/web-audit-suite/docs/usermanual.md` - Complete user guide
- `packages/web-audit-suite/docs/CONFIGURATION.md` - Configuration reference
- `packages/web-audit-suite/docs/FEATURES.md` - Feature overview
- `packages/web-audit-suite/docs/report-layout.md` - Report structure and data schema

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

The Invisible Users book (`packages/manuscript/` directory) is the authoritative source for:

- Terminology and definitions
- Pattern descriptions
- Conceptual frameworks
- Examples and use cases

If there's a conflict between the book and the tool, update the tool to match the book.

#### 2. The Tool Implements the Book

Web Audit Suite (`packages/web-audit-suite/` directory) implements the concepts from the book:

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

## Author Profile Resources

When creating web pages, marketing materials, or book covers that feature the author:

- **Profile picture URL:** `https://allabout.network/media_126e99d56f06caf788bee715aff92281d2e31a206.png`
- Used in: [back-cover.html](packages/manuscript/the-bible-of-mx/web/back-cover.html), marketing materials
- Format: Square profile image suitable for circular cropping
- Usage: Reference this URL directly in HTML `<img>` tags or download for local use

## Notes for Future Development

- Book manuscript: Publication-ready (v2.5.1)
- Web Audit Suite: Production-ready implementation of book's patterns
- Both projects cross-reference each other for coherent guidance
