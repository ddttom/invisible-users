# Repository Architecture Documentation

## Overview

The `invisible-users` repository is a multi-project monorepo containing two book manuscripts (MX Series), a production-ready web analysis tool, and supporting infrastructure. The architecture uses git submodules for separation of concerns and npm workspaces for coordinated builds.

## High-Level Architecture

```text
                    ┌─────────────────────────────────────────┐
                    │   Main Repository (invisible-users)     │
                    │                                         │
                    │  • Configuration & Orchestration        │
                    │  • Build Scripts                        │
                    │  • Claude Code AI Config                │
                    │  • Documentation                        │
                    └──────────────┬──────────────────────────┘
                                   │
                    ┌──────────────┼──────────────┬───────────────┐
                    │              │              │               │
                    ↓              ↓              ↓               ↓
         ┌──────────────────┐  ┌─────────────────────┐  ┌──────────────────┐
         │ Book Manuscripts │  │ Code & Examples     │  │ Infrastructure   │
         │   (Submodules)   │  │   (Submodules)      │  │                  │
         ├──────────────────┤  ├─────────────────────┤  ├──────────────────┤
         │ • MX-Bible       │  │ • Code Examples     │  │ • Web Audit Suite│
         │   (13 chapters)  │  │ • UCP (READ-ONLY)   │  │   (NOT submodule)│
         │ • MX-Handbook    │  │ • MX-Gathering      │  └──────────────────┘
         │   (11 chapters)  │  │   (PUBLIC)          │
         │ • Appendices     │  └─────────────────────┘
         │   (12 appendices)│
         └──────────────────┘
                    │
         ┌──────────┴──────────┬────────────────────┐
         ↓                     ↓                    ↓
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ Generated Output │  │ Business/Notes   │  │ Build Process    │
│   (Submodule)    │  │  (Submodules)    │  │                  │
├──────────────────┤  ├──────────────────┤  │  Scripts  →      │
│ • Outputs        │  │ • mx-business    │  │  generate:       │
│   (PDFs, HTML,   │  │   (PRIVATE)      │  │  • PDFs          │
│    Marketing)    │  │ • Notes          │  │  • HTML          │
│   (PRIVATE)      │  │   (READ-ONLY)    │  │  • Appendices    │
└──────────────────┘  └──────────────────┘  └──────────────────┘

Total: 10 git repositories (1 main + 9 submodules)
```

## Repository Structure

**📁 Complete folder structure:** See [config/system/folder-layout.md](../../config/system/folder-layout.md) for the authoritative, detailed folder structure of the main repository and all 9 submodules.

This section focuses on architectural concepts and relationships rather than detailed directory listings.

### Main Repository (Control Hub)

**Purpose:** Orchestration, build processes, configuration, and documentation

**Key Architectural Components:**

- **`.claude/`** - Claude Code AI assistant configuration (skills, hooks, settings)
- **`config/`** - Project-wide configuration (markdown linting, book styles, system docs)
- **`scripts/`** - Build and generation automation
- **`docs/`** - Documentation hub (architecture, AI guidance, strategic planning, presentations)
- **`packages/`** - All submodules and tools (9 submodules + web-audit-suite)

**Critical Files:**

- `CLAUDE.md` - Single source of truth for AI assistant configuration
- `README.md` - Main project documentation
- `package.json` - npm workspace configuration and build commands
- `LEARNINGS.md` - Battle-tested rules from mistakes
- `CHANGELOG.md` - Project change history
- `llms.txt` - AI agent discovery file

### Book Manuscripts & Tools (Submodules)

**📁 For detailed folder structures:** See [config/system/folder-layout.md](../../config/system/folder-layout.md) - Complete structure of all 9 submodules.

**High-level overview:**

- **MX-Bible** (`packages/mx-the-bible/`) - Full comprehensive guide (13 chapters, ~78,000 words)
- **MX-Handbook** (`packages/mx-handbook/`) - Implementation handbook (11 chapters)
- **MX-Gathering** (`packages/mx-gathering/`) - Community resources (PUBLIC, EDITABLE)
- **Shared Appendices** (`packages/mx-appendices/`) - 12 appendices (A-M) shared across books
- **Code Examples** (`packages/mx-code-examples/`) - Good vs bad pattern implementations
- **Universal Commerce Protocol** (`packages/external/ucp/`) - READ-ONLY external reference
- **Business Planning** (`packages/business/mx-business/`) - PRIVATE business strategy
- **Notes** (`packages/notes/`) - Development practices and coding standards
- **Outputs** (`packages/mx-outputs/`) - PRIVATE generated content (PDFs, HTML, marketing)
- **Web Audit Suite** (`packages/web-audit-suite/`) - NOT a submodule, production analysis tool

**Important Patterns:**

**Dual-File Pattern (Appendices):**
- **Appendix D & H:** `.txt` file is source of truth, `.md` file is wrapper
- **Critical:** Update BOTH files when making content changes

**Web Audit Suite Architecture:**
- Four-phase pipeline: (0) robots.txt compliance, (1) URL collection, (2) data collection, (3) report generation
- `results/results.json` is single source of truth
- Report generation NEVER fetches new data


## Build System Architecture

### PDF Generation Pipeline

```text
npm run pdf:bible-all
         │
         ↓
npm run illustrations:generate
         │
         ├─→ Download cover images
         │
         └─→ Convert SVG to PNG
         │
         ↓
npm run pdf:bible-html
         │
         ↓
npm run pdf:bible-kindle
         │
         ↓
npm run pdf:bible-generate
         │
         ↓
npm run pdf:appendix
         │
         ↓
generate-appendix-html.sh
         │
         ↓
Pandoc: Generate HTML
         │
         ↓
enhance-appendix-html.js
         │
         ├─→ Insert xml:lang="en-GB"
         ├─→ Remove embedded styles
         ├─→ Add canonical links
         ├─→ Inject AI meta tags
         ├─→ Add Schema.org JSON-LD
         ├─→ Link external CSS
         └─→ Add semantic roles
         │
         ↓
Generate sitemap.xml
         │
         ↓
Output to packages/shared-appendices/web/
```

### Appendix HTML Enhancement Process

**Script:** `scripts/enhance-appendix-html.js`

**Purpose:** Post-process Pandoc-generated HTML to add AI-friendly patterns, semantic structure, and Schema.org metadata

**Enhancements Applied:**

1. **Language Declaration:** `xml:lang="en-GB"`
2. **Style Removal:** Remove embedded Pandoc styles
3. **Canonical Links:** `<link rel="canonical">`
4. **AI Meta Tags:**
   - `<meta name="llms-txt" content="/llms.txt">`
   - Other AI-specific metadata
5. **Schema.org JSON-LD:** Structured data for search engines and AI agents
6. **External CSS:** Link to `appendix.css`
7. **Semantic Roles:** ARIA roles and data attributes for accessibility
8. **Validation:** HTML validation and link checking

**Input:** Raw HTML from Pandoc
**Output:** Enhanced HTML in `packages/shared-appendices/web/`

### News Update Workflow

```text
User
  │
  │  /news <industry_development>
  ├──────────────────────────────────────→ /news skill
  │                                             │
  │                                             │  Verify claims/dates
  │                                             ├──────────────→ Web Search
  │                                             │
  │                                             │  ← Verified info
  │                                             │
  │                                             │  Check relevance
  │                                             │  criteria
  │                                             │
  │  ← Present summary                          │
  │    and proposed entry                       │
  │                                             │
  │  Approve or request changes                 │
  ├──────────────────────────────────────────→ │
  │                                             │
  │                                             ├──→ blog.md
  │                                             │    (Add changelog entry)
  │                                             │
  │                                             ├──→ appendix-j-industry-developments.md
  │                                             │    (Add full 12-section entry)
  │                                             │
  │                                             ├──→ web/news.html
  │                                             │    (Add HTML article at top)
  │                                             │
  │                                             ├──→ web/news.html
  │                                             │    (Update footer date)
  │                                             │
  │                                             │  Run markdown and
  │                                             │  HTML validation
  │                                             │
  │  ← Present final diff for review            │
  │                                             │
  └─────────────────────────────────────────────┘
```

## Git Workflow Architecture

### Submodule-First Workflow

**Critical Principle:** Always commit and push submodules BEFORE updating pointers in main repository.

```text
Step 1: Work in Submodule
   │
   ├─→ Make changes in submodule
   │
   ├─→ cd submodule-directory
   │
   ├─→ git add -A
   │
   ├─→ git commit -m "message"
   │
   ├─→ git push  ← CRITICAL: Push submodule first!
   │
   ↓

Step 2: Update Main Repository
   │
   ├─→ cd back to main repo
   │
   ├─→ git add submodule-path
   │
   ├─→ git commit -m "Update submodule pointer"
   │
   └─→ git push main repo
```

### Multi-Repository Structure

**10 git repositories total:**

1. **Main repo:** `invisible-users` (control hub)
2. **MX-Bible:** `invisible-users-bible`
3. **MX-Don't Make the AI Think:** `invisible-users-slim`
4. **MX-Handbook:** `MX-The-Handbook`
5. **Appendices:** `invisible-users-appendices`
6. **Code Examples:** `invisible-users-code-examples`
7. **UCP:** `Universal-Commerce-Protocol/ucp` (READ-ONLY)
8. **Outputs:** `invisible-users-outputs` (PRIVATE)
9. **Notes:** `Notes` (READ-ONLY)

**Navigation Safety:**

- Always run `pwd` before file operations or git commands
- Use `git -C <submodule-path>` to avoid navigation errors
- Never assume current location in multi-repository workspace
- Use `git mv` for renaming tracked files (preserves history)

## Claude Code AI Integration

### Skill Architecture

**Location:** `.claude/skills/`

**Five Custom Skills:**

1. **`/step-commit`** - Systematic commit workflow for multi-repository structure
2. **`/md-fix`** - Markdown linting and auto-fix
3. **`/news`** - Add verified industry news with strict relevance criteria
4. **`/review-docs`** - Review documents against complete writing style guide
5. **`/humanizer`** - Remove AI-generated writing patterns

### Hook System

**Location:** `.claude/hooks/`

**Four Git Hooks:**

1. **`pre-tool-use.sh`** - Manuscript style reminders, directory navigation safety, pwd reminders
2. **`pre-commit.sh`** - Markdown linting checks
3. **`pre-push.sh`** - Documentation outdated warnings
4. **`post-tool-use.sh`** - `/step-commit` workflow reminders

### Configuration

**Location:** `.claude/settings.local.json`

**Contains:**

- Permissions for Bash commands
- Tool access configuration
- Session-scoped settings

## Book Naming Architecture

### Public Names (Official Titles)

- **"MX-Bible"** - Full comprehensive guide (formerly "The Invisible Users")
- **"MX-Don't Make the AI Think"** - Practical quick guide
- **"MX-Handbook"** - Implementation handbook

### Shorthand Reference System

**For use in AI assistant prompts:**

| Shorthand      | Refers to                                                   |
| -------------- | ----------------------------------------------------------- |
| **bible**      | MX-Bible (full comprehensive guide)                         |
| **dont**       | MX-Don't Make the AI Think (practical quick guide)          |
| **handbook**   | MX-Handbook (implementation handbook)                       |
| **slim**       | MX-Handbook (synonym for handbook)                          |
| **books**      | All three books                                             |
| **manuscript** | All three books                                             |
| **project**    | Everything in workspace EXCEPT read-only repos              |
| **workspace**  | Everything in workspace EXCEPT read-only repos              |

**Note:** Directory names and repository names remain unchanged. This mapping only affects how books are referenced in documentation and prompts.

## Separation of Concerns

### Principle

**Clean separation between content and orchestration:**

- **Main repository:** Control hub (build scripts, npm packages, configuration)
- **Content submodules:** Pure content (markdown, code examples, no dependencies)
- **Outputs submodule:** Generated materials (private, separate from source)

### Benefits

1. **Independent version control** - Content changes don't pollute main repository history
2. **No dependency sprawl** - Content repositories have no package.json, no npm install
3. **Clean collaboration** - Writers work in content repos, developers in main repo
4. **Reusability** - Content can be referenced by other projects without tooling
5. **Access control** - Private outputs repository separate from public content
6. **Build isolation** - All build processes controlled from single location

### Build Commands Location

**Critical:** Submodules cannot be built independently. All build commands run from parent `invisible-users` repository:

```bash
# ✅ CORRECT: Run from main repo
cd invisible-users
npm run pdf:bible-all

# ❌ WRONG: Cannot run from submodule
cd invisible-users/packages/bible
npm run pdf:generate  # No package.json in submodule
```

## Documentation Architecture

### Levels of Documentation

1. **Repository-level** (main repo root)
   - ONBOARDING.md - Developer onboarding
   - LEARNINGS.md - Battle-tested rules
   - CLAUDE.md - AI agent instructions and project guide
   - README.md - Project overview

2. **Package-level** (each submodule `README.md`)
   - Package-specific contents
   - Build instructions
   - Chapter lists
   - Word counts

3. **Architecture** (`docs/architecture/`)
   - TIMELESS-MANUSCRIPT-RULE.md - Writing guidelines for book manuscripts

   **Note:** Architecture documentation has been reorganized:
   - doc-architecture.md → config/system/doc-architecture.md
   - GIT-README.md → config/system/GIT-README.md
   - web-audit-architecture.md → packages/web-audit-suite/web-audit-architecture.md

4. **AI Assistant Guidance** (`docs/for-ai/`)
   - writing-style.md - Complete style guide
   - yaml-frontmatter-template.md - Metadata template
   - architecting-multi-repo-codebases.md - Multi-repo patterns

5. **Strategic Planning** (`docs/structure/`)
   - Strategic planning documents (MX-plan.md, project roadmaps, analysis)
   - Blog drafts and work-in-progress content (`blog-drafts/` subdirectory)
   - Repository structure mapping
   - UX research and insights

6. **Business Materials** (`packages/sales-enablement/` - READ-ONLY private submodule)
   - Business plans
   - Partner kits
   - Publisher proposals
   - Pricing strategies
   - **Access Control:** AI assistants must have explicit authorization to access

### Documentation Flow

**Changes must flow:** book → tool → documentation

1. Update book manuscript first
2. Update Web Audit Suite implementation
3. Update all documentation

**Consistency Mandate:** Same terms mean the same thing everywhere.

## Key Organizational Principles

### The Book is Authoritative

Book manuscripts are the authoritative source for all terminology, patterns, and concepts. If conflict exists, implementation must be updated to match the book.

### The Tool Implements the Book

Web Audit Suite implements patterns from the book:

- Detects patterns described in the book
- Uses terminology from the book
- Provides recommendations based on book guidance

### All Documentation Must Align

Consistency is mandatory across all projects:

- Same terms mean the same thing everywhere
- Examples are consistent
- Cross-references are accurate

### Blog Content Workflow

Clear separation between draft and published blog content with mandatory metadata tracking at every stage.

#### File Locations and States

- **Draft Location:** `docs/structure/` and `docs/structure/blog-drafts/` - Work-in-progress markdown with `blog-state: "draft"`
- **Review Location:** `outputs/bible/blogs/mx/` (symlinked as `blogs/mx/`) - HTML files with `blog-state: "in-review"`
- **Published Location:** `outputs/bible/blogs/mx/` (same directory) - HTML files with `blog-state: "published"` and live on allabout.network
- **Critical Rule:** The `blogs/` directory is for ready-to-publish content only; no markdown drafts or work-in-progress files

#### Workflow Stages

1. **Draft (markdown)** - Create blog post in `docs/structure/` or `docs/structure/blog-drafts/`
   - Add YAML frontmatter with `blog-state: "draft"`
   - Include required fields: title, author, date, blog-filename, description, keywords

2. **Generate HTML** - Run `scripts/generate-blog-html.js` to create HTML/CSS/SVG
   - HTML files created in `outputs/bible/blogs/mx/`
   - Update markdown to `blog-state: "in-review"`
   - Add HTML meta tags with `blog-state: "in-review"` and `blog-review-date`

3. **Review** - Review HTML in blogs/ folder (this is the review stage)
   - HTML files remain in `outputs/bible/blogs/mx/` for review
   - Check WCAG 2.1 AA compliance, validate HTML, verify all assets

4. **Publish** - Deploy to allabout.network
   - Update both markdown and HTML to `blog-state: "published"`
   - Add `blog-publication-date` to both files
   - Add `blog-url` to markdown frontmatter
   - HTML files remain in `outputs/bible/blogs/mx/` (symlinked as `blogs/mx/`)

#### Metadata Requirements

**Markdown files** must include YAML frontmatter:

```yaml
---
title: "Blog Post Title"
author: "Tom Cranstoun"
date: "YYYY-MM-DD"
blog-state: "draft" | "in-review" | "published" | "archived"
blog-filename: "url-friendly-name"
blog-url: ""  # Empty until published
publication-date: ""  # Empty until published
description: "Brief summary"
keywords: [keyword1, keyword2, keyword3]
ai-instruction: "Context for AI agents"
---
```

**HTML files** must include meta tags in `<head>`:

```html
<!-- Blog State Tracking -->
<meta name="blog-state" content="in-review">
<meta name="blog-draft-date" content="YYYY-MM-DD">
<meta name="blog-review-date" content="YYYY-MM-DD">
<meta name="blog-publication-date" content="">
<meta name="blog-last-modified" content="YYYY-MM-DD">
```

**CSS files** should include comment header:

```css
/**
 * Blog Post Styles
 * Title: Blog Post Title
 * Blog State: in-review
 * Last Modified: YYYY-MM-DD
 * Author: Tom Cranstoun
 */
```

#### Complete Documentation

See [docs/structure/blog-metadata-schema.md](../structure/blog-metadata-schema.md) for:

- Complete metadata schema
- Field descriptions
- State transition rules
- File organization
- Implementation notes

## Repository Navigation (Historical: Symlinks Removed)

### Change History

**As of 2026-01-29:** All convenience symlinks were removed from the repository to reduce navigation confusion in the multi-repository workspace.

**Removed symlinks:**

- `AGENTS.md` → `CLAUDE.md`
- `GEMINI.md` → `CLAUDE.md`
- `blogs` → `packages/mx-outputs/bible/blogs`
- `books/` directory (all convenience symlinks)

**Rationale:** Symlinks created confusion in multi-repository navigation and some pointed to non-existent paths. Direct path references are now used throughout the documentation.

**See:** [config/system/folder-layout.md](../../config/system/folder-layout.md) for current repository structure

## Technology Stack

### Document Generation

- **Pandoc** - Markdown to HTML/PDF conversion
- **XeLaTeX** - PDF typesetting engine
- **ImageMagick** - SVG to PNG conversion

### Build System

- **npm** - Package management and script orchestration
- **npm workspaces** - Monorepo coordination
- **Bash scripts** - Build automation

### Web Analysis

- **Node.js** - Runtime environment
- **Pa11y** - Accessibility testing
- **Puppeteer** - Browser automation
- **Playwright** - Alternative browser automation

### Documentation

- **Markdown** - Content format
- **Mermaid** - Diagrams and flowcharts
- **YAML** - Frontmatter metadata

### Linting & Validation

- **markdownlint** - Markdown style checking
- **html-validate** - HTML validation
- **ESLint** - JavaScript linting

## Version Control Strategy

### Main Repository

- Branch: `main`
- Remote: `https://github.com/ddttom/invisible-users`
- Push after all submodules are pushed

### Submodules

- Branch: `main` (each has independent main branch)
- Push before updating main repository pointers
- Each submodule is an independent git repository

### Commit Guidelines

- Clear subject line (50 characters max recommended)
- Optional body for detailed explanation
- No co-author attribution or "Generated with Claude Code" messages
- Focus on changes, not tools used

## AI Agent Compatibility

### Discovery File

**Location:** `llms.txt` (root and in `packages/shared-appendices/web/`)

**Purpose:** Help AI agents discover and understand the project structure

**Format:** Markdown table with metadata and links

### Metadata Patterns

**YAML Frontmatter:** Used in all book manuscript files

**Required Fields:**

- `title` - Chapter/document title
- `author` - Always "Tom Cranstoun"
- `date` - Last modification date (YYYY-MM-DD)
- `description` - Brief summary
- `keywords` - Array of topics
- `book` - Which book (MX-Bible, MX-Don't Make the AI Think, MX-Handbook)
- `chapter` - Chapter number
- `wordcount` - Approximate word count
- `ai-instruction` - Instructions for AI agents parsing the document

### Timeless Manuscript Rule

**Critical Writing Requirement:** Book manuscripts must be written as if they've always existed.

**Never Include:**

- Publication dates or launch dates about the book itself
- "This update includes..." or "We have added..."
- "New in this version..." or "Recently launched..."
- Future-tense statements about the book
- Meta-commentary about the writing/editing process

**Always Write:**

- Definitive present tense: "The analysis provides..."
- Timeless descriptions: "This book is part of a three-book series:"
- Established fact tone: Features described as if they've always existed

**Exception:** Historical context about subject matter is allowed (e.g., "Google launched UCP in January 2026").

## Future Architecture Considerations

### Potential Enhancements

1. **Automated Testing** - Add test suite for build scripts
2. **CI/CD Pipeline** - GitHub Actions for automated builds
3. **Docker Support** - Containerized build environment
4. **API Documentation** - OpenAPI spec for Web Audit Suite
5. **Performance Monitoring** - Track build times and optimization

### Scalability Concerns

- Monorepo size growth as content increases
- Build time optimization for large PDF generation
- Submodule management complexity with more repositories
- Output storage in private submodule (may need CDN)

## Contact and Resources

- **Email:** <tom.cranstoun@gmail.com>
- **Website:** <https://allabout.network>
- **LinkedIn:** <https://www.linkedin.com/in/tom-cranstoun/>
- **Repository:** <https://github.com/ddttom/invisible-users>

## Related Documentation

- [README.md](../../README.md) - Main project documentation
- [CLAUDE.md](../../CLAUDE.md) - AI agent instructions
- [LEARNINGS.md](../../LEARNINGS.md) - Battle-tested rules
- [GIT-README.md](GIT-README.md) - Git workflow guide
- [ONBOARDING.md](../../ONBOARDING.md) - Developer onboarding
- [web-audit-architecture.md](../../packages/web-audit-suite/web-audit-architecture.md) - Web Audit Suite architecture
