# The Invisible Users

## Designing the Web for AI Agents and Everyone Else

A practical guide to the collision between modern web design and AI agents, with a production-ready implementation tool.

**New to this project?** Start with [ONBOARDING.md](ONBOARDING.md) for a complete setup guide.

## About This Repository

This repository contains two integrated projects working together to address AI agent compatibility:

### 1. Book Manuscript

A practical guide examining how interfaces optimised for human users fail for automated visitors — and argues that fixing this benefits everyone.

The patterns that break AI agents also break humans. Toast notifications that vanish, pagination hiding content, single-page applications with invisible state changes — these have been creating accessibility problems for years. Now AI agents are struggling with the same patterns, and there's commercial pressure to fix them.

### 2. Web Audit Suite

A comprehensive Node.js website analysis tool that implements the AI agent compatibility patterns described in the book. It provides actionable insights into:

- SEO performance
- Accessibility compliance (WCAG 2.1)
- Performance metrics
- Security headers
- Content quality
- **AI agent compatibility (LLM suitability)**

**Performance Features:**

The tool includes production-tested performance optimizations:

- **3-5x faster execution**: 100 URLs analyzed in ~10 minutes (was ~45 minutes)
- **Browser pooling**: 97% reduction in browser launch overhead
- **Concurrent processing**: Multiple URLs analyzed simultaneously
- **Adaptive rate limiting**: Server-friendly dynamic concurrency
- **Automatic cache validation**: HTTP HEAD requests for staleness checking

**Ethical Scraping:**

The tool respects robots.txt by default with a complete compliance system:

- robots.txt fetching and parsing before crawling
- Interactive prompts for blocked URLs
- 100-point quality scoring for robots.txt files
- Quality recommendations based on "The Invisible Users" guidance

## Who This Is For

This repository serves four distinct audiences:

1. **Web Professionals & Engineers**: Developers and QA specialists using the [Web Audit Suite](packages/web-audit-suite/) to test and optimize sites for AI agent compatibility.
2. **Agent System Developers**: Developers building AI agents, browser extensions, and agentic systems. Chapter 13 provides validation frameworks, confidence scoring patterns, and guardrails for robust data quality.
3. **Business Leaders**: Executives and managers using the [Book](packages/manuscript/) to understand the strategic impact of AI agents on their digital business.
4. **Partners & Investors**: Agencies and investors using the [Business Model](docs/sales-enablement/business-plan.md) to evaluate the commercial potential of this new market category.

## Key Organizational Principles

This repository maintains strict cross-project consistency:

### The Book is Authoritative

The book manuscript (`packages/manuscript/`) is the authoritative source for all terminology, patterns, and concepts. If there's a conflict between the book and implementation, the implementation must be updated to match the book.

### The Tool Implements the Book

Web Audit Suite (`packages/web-audit-suite/`) implements patterns from the book:

- Detects patterns described in the book
- Uses terminology from the book
- Provides recommendations based on book guidance

### All Documentation Must Align

Consistency is mandatory across both projects:

- Same terms mean the same thing everywhere
- Examples are consistent
- Cross-references are accurate
- Contact information is synchronized

### Terminology Flow

Changes must flow in this order: **book → tool → documentation**

When updating terminology:

1. Update the book manuscript first
2. Update the Web Audit Suite implementation
3. Update all documentation

This ensures the book remains the single source of truth.

## Repository Structure

```text
/
├── packages/
│   ├── manuscript/           # Book manuscript (~93,649 words core)
│   │   ├── book-plan.md      # Master plan with chapter outlines
│   │   ├── book-svg-style.md # SVG illustration specifications
│   │   └── manuscript/       # Core manuscript files (git submodule)
│   │       ├── chapter-01-*.md through chapter-13-*.md  # 13 chapters
│   │       ├── preface.md
│   │       ├── executive-summary.md
│   │       ├── reading-guide.md
│   │       ├── rear-cover.md
│   │       ├── The-End.md
│   │       ├── Glossary.md
│   │       ├── appendix-a-*.md through appendix-l-*.md  # 12 appendices (A-L)
│   │       ├── appendix-h-live-llms.txt  # Appendix H source (llms.txt example)
│   │       ├── illustrations/    # SVG illustrations (PNG gitignored)
│   │       ├── web/              # Generated HTML appendices
│   │       │   ├── index.html
│   │       │   ├── llms.txt
│   │       │   ├── sitemap.xml
│   │       │   └── appendix-*.html  # 12 appendix pages
│   │       ├── agent-friendly-starter-kit/  # Code examples
│   │       ├── code-examples/    # Production-ready implementations
│   │       ├── blog/             # Promotional materials
│   │       └── talks/            # Presentation materials
│   │
│   └── web-audit-suite/      # Production-ready analysis tool
│       ├── src/              # Source code
│       │   ├── collectors/   # Data collection modules
│       │   ├── config/       # Configuration management
│       │   ├── core/         # Core utilities
│       │   └── utils/        # Helper functions
│       ├── docs/             # Documentation
│       ├── examples/         # Configuration examples
│       ├── test/             # Test suites
│       └── README.md         # Tool documentation
│
├── docs/                     # Documentation and architecture
│   ├── doc-architecture.md         # Repository restructure documentation
│   ├── web-audit-architecture.md   # Web Audit Suite architecture
│   └── sales-enablement/           # Business and sales materials
│       ├── business/               # Business strategy documents
│       │   ├── business-plan.md    # Complete business strategy (~18,000 words)
│       │   ├── business-opportunities.md
│       │   ├── executive-summary.md # Executive summary (~2,900 words)
│       │   └── plan-to-market.md   # Go-to-market plan (~8,500 words)
│       ├── pitches/                # Pitch materials
│       │   ├── PITCH.md            # Partnership pitch (~27,500 words)
│       │   ├── EXECUTIVE_PITCH_DECK.md
│       │   └── ROI_CASE_STUDIES.md
│       ├── publishers/             # O'Reilly submission materials
│       │   ├── oreilly-proposal.md
│       │   ├── oreilly-toc.md
│       │   ├── oreilly-author-bio.md
│       │   └── oreilly-sample-chapter.md
│       ├── partners/               # Partner-focused materials
│       │   ├── PARTNER_KIT.md
│       │   ├── kentico-pitch-one-pager.md
│       │   ├── kentico-email-templates.md
│       │   └── partner-toolkit-template.md
│       ├── outreach/               # Communication templates
│       │   ├── adobe-opportunity-analysis.md
│       │   ├── for-adobe.txt
│       │   ├── reviewer-email.md
│       │   └── reviews.md
│       ├── content/                # Blog and promotional content
│       │   ├── book.md
│       │   ├── new-blog.md
│       │   ├── platforms-blog.md
│       │   └── platforms-blog-teaser.md
│       ├── profiles/               # Professional profiles
│       │   ├── profile.md
│       │   └── linkedin-about.md
│       └── pricing/                # Pricing strategy
│           └── book-pricing.md
├── scripts/                  # Build scripts
│   ├── download-cover-images.js
│   ├── generate-appendix-html.sh
│   └── commit-and-push-all.sh
├── .claude/                  # Claude Code configuration
│   ├── skills/               # Custom skills
│   └── hooks/                # Git hooks
└── package.json              # Monorepo workspace configuration
```

**Note on Appendix H:** This appendix uses two files - `appendix-live-llms.txt` (the actual llms.txt content) and `appendix-live-llms.md` (markdown wrapper that displays it in a code block). The PDF includes the .md wrapper to show "here's what an llms.txt file looks like" as a formatted example, while the .txt file remains the editable source of truth.

## Working with the Manuscript Submodule

The book manuscript is maintained in a separate public repository and integrated as a git submodule. When you first clone this repository, you need to initialize the submodule:

```bash
# Clone the main repository
git clone https://github.com/ddttom/invisible-users.git
cd invisible-users

# Initialize and fetch the manuscript submodule
git submodule update --init --recursive
```

**Updating the manuscript to the latest version:**

Since the submodule is configured to track the main branch, updating is easy:

```bash
# Update submodule to latest commit on main branch
git submodule update --remote packages/manuscript/the-bible-of-mx

# Commit the submodule pointer update
git add packages/manuscript/the-bible-of-mx
git commit -m "Update manuscript submodule to latest version"
```

The `--remote` flag pulls the latest changes from the tracked branch (main).

**Making changes to the manuscript:**

The manuscript is maintained in its own repository at <https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript>. To contribute changes:

1. Navigate to the submodule: `cd packages/manuscript/the-bible-of-mx`
2. Create a branch: `git checkout -b your-feature-branch`
3. Make your changes and commit them
4. Push to the manuscript repository: `git push origin your-feature-branch`
5. Create a pull request in the manuscript repository

After the manuscript changes are merged, update this repository's submodule reference to point to the latest commit.

## Book Status

| Chapter | Title | Status | Words |
| --------- | ------- | -------- | ------- |
| Preface | Author's Journey | ✅ Complete | ~2,678 |
| 1 | What You Will Learn | ✅ Complete | ~2,894 |
| 2 | The Invisible Failure | ✅ Complete | ~5,760 |
| 3 | The Architectural Conflict | ✅ Complete | ~4,192 |
| 4 | The Business Reality | ✅ Complete | ~10,009 |
| 5 | The Content Creator's Dilemma | ✅ Complete | ~6,129 |
| 6 | The Security Maze | ✅ Complete | ~4,385 |
| 7 | The Legal Landscape | ✅ Complete | ~4,395 |
| 8 | The Human Cost | ✅ Complete | ~4,153 |
| 9 | The Platform Race | ✅ Complete | ~5,377 |
| 10 | Generative Engine Optimization | ✅ Complete | ~13,076 |
| 11 | Designing for Both | ✅ Complete | ~6,773 |
| 12 | Technical Advice | ✅ Complete | ~11,468 |
| 13 | What Agent Creators Must Build | ✅ Complete | ~9,440 |
| The End | Additional Resources | ✅ Complete | ~570 |
| Glossary | Technical Terms | ✅ Complete | ~2,350 |

**Core manuscript:** ~93,649 words (preface + 13 chapters + The End + glossary)

**Web appendices** (published separately at <https://allabout.network/invisible-users/web/>):

- Appendices A-L: ~63,238 words

**Supporting materials:**

- Executive Summary: ~1,815 words
- Reading Guide: ~1,151 words
- Rear Cover: ~598 words

**Total comprehensive content:** ~160,451 words

## Quick Start

### Book Manuscript

```bash
# View word counts
npm run wordcount

# Generate PNG illustrations from SVG sources
npm run illustrations:generate

# Lint all markdown files
npm run lint:markdown
npm run lint:markdown:fix

# Generate PDF (requires LaTeX - see below)
npm run pdf:generate       # Full PDF with professional book formatting (A4)
npm run pdf:kindle         # Kindle Direct Publishing format (6"×9" paperback)
npm run pdf:simple         # Simplified PDF formatting
npm run pdf:html           # Generate HTML (print to PDF via browser ⌘+P)
```

**PDF Generation Requirements:**

To use `npm run pdf:generate`, `npm run pdf:kindle`, or `npm run pdf:simple`, you need a LaTeX distribution installed:

```bash
# Install BasicTeX (lightweight, ~100MB) via Homebrew
brew install --cask basictex

# After installation, reload your shell
source ~/.zshrc

# Verify installation
which xelatex
```

If you don't want to install LaTeX, use `npm run pdf:html` to generate an HTML file that you can print to PDF using your browser's print function (⌘+P).

**Creating a KDP Cover for `pdf:kindle`:**

The Kindle PDF (`pdf:kindle`) generates a print-ready interior file only. KDP requires a separate cover file. To create your cover:

1. Generate the Kindle PDF first: `npm run pdf:kindle`
2. Check the page count in the generated PDF
3. Visit the [KDP Cover Calculator](https://kdp.amazon.com/cover-calculator)
4. Input your specifications:
   - Trim size: **6" × 9"**
   - Page count: (from your generated PDF)
   - Paper type: White or Cream
   - Binding: Paperback
5. Download the template with correct spine width
6. Create your cover design using the template dimensions
7. Export at **300 DPI** matching the exact template dimensions

The current cover design at `packages/manuscript/the-bible-of-mx/illustrations/cover-design.png` can be adapted, but you'll need to add the spine and back cover, sized according to the KDP template for your specific page count.

### Web Audit Suite

```bash
# Install dependencies
cd web-audit-suite && npm install

# Run analysis (from repository root)
npm run audit:start -- -s https://example.com/sitemap.xml

# Run with limited URLs for testing
npm run audit:start -- -s https://example.com/sitemap.xml -c 10

# Full analysis with dashboard and executive summary
npm run audit:start -- -s https://example.com/sitemap.xml \
  --enable-history \
  --generate-dashboard \
  --generate-executive-summary
```

See [packages/web-audit-suite/README.md](packages/web-audit-suite/README.md) for complete documentation.

## Web Appendices

Individual appendix pages are available online for easy reference and sharing:

**Online access:** <https://allabout.network/packages/manuscript/web/>

The appendices are published as separate HTML pages with full navigation:

- **Implementation Guides:** Appendices A-D (cookbooks, patterns, tools)
- **Quick References:** Appendices E-G (one-page guides, roadmaps, resources)
- **Case Studies & Templates:** Appendices H-K (examples, analysis, industry updates, page patterns)

**Generate locally:**

```bash
npm run pdf:appendix        # Generate HTML pages in packages/manuscript/the-bible-of-mx/web/
```

This creates 18 files in the manuscript submodule:

- `index.html` - Book main page with complete overview
- `appendix-index.html` - Appendix landing page
- `news.html` - Project news and updates
- `faq.html` - Frequently asked questions
- `llms.txt` - AI agent discovery file
- `sitemap.xml` - Search engine discovery file
- `appendix-a.html` through `appendix-l.html` - Individual appendix pages (12 files)

Each appendix page includes:

- Table of contents
- Full content with syntax highlighting
- Code blocks with copy-to-clipboard buttons
- Navigation footer linking to other appendices
- Responsive design (mobile-friendly)
- Chapter 10 technical patterns (AI meta tags, Schema.org JSON-LD, semantic HTML, data-role attributes)

## Key Themes

### Agent Diversity

The book addresses a diverse ecosystem of AI agents:

- **CLI agents:** Command-line tools running locally
- **Local (SMOL) agents:** Lightweight agents on user devices
- **Server-based agents:** Cloud-hosted agents accessing remotely
- **Browser agents:** Full browser automation
- **Browser extension assistants:** In-browser AI tools
- **IDE-integrated browser controls:** Development environments

### Universal Compatibility Patterns

The guidance focuses on patterns that work for all agent types:

- **Semantic HTML:** Works regardless of JavaScript execution
- **Explicit state attributes:** Visible in DOM for any parser
- **Structured data:** Machine-readable for all architectures
- **Clear feedback:** Persistent and unambiguous

### Identity Delegation Patterns

When AI agents transact on behalf of customers, the business-customer relationship can be affected. The book discusses identity delegation patterns as one emerging solution, acknowledging multiple approaches without prescribing a specific implementation.

**Mentioned in:** Chapters 4, 6, 9, and 10

### Session Inheritance

A critical security insight: in-browser agents inherit authenticated sessions rather than failing to authenticate. Banks cannot detect AI involvement because agents inherit proof-of-humanity tokens from the user's existing session.

**Explored in:** Chapter 6

## Web Audit Suite Features

### AI Agent Compatibility Analysis

- **llms.txt Detection:** Checks for AI agent guidance files
- **Served vs Rendered HTML Analysis:** Separates static and dynamic compatibility
- **Three Specialized Reports:**
  - General LLM Report: Overall compatibility scoring
  - Frontend LLM Report: Frontend-specific patterns
  - Backend LLM Report: Server-side patterns

### Comprehensive Website Analysis

- **SEO Analysis:** Detailed SEO metrics and scoring
- **Performance Metrics:** Page load analysis with Core Web Vitals
- **Accessibility Testing:** WCAG 2.1 compliance with Pa11y
- **Security Analysis:** Security headers and HTTPS configuration
- **Content Quality:** Structure and freshness analysis

### Advanced Features

- **Historical Tracking:** Compare changes over time
- **Executive Summary:** Single-page overview with key insights
- **Interactive Dashboard:** HTML dashboard with visual analytics
- **Configurable Thresholds:** Customize pass/fail criteria
- **Resume Capability:** Continue from existing results

## Development Environment

This repository includes comprehensive VS Code workspace configuration for an optimized development experience:

### VS Code Setup

The [.vscode/](.vscode/) directory contains:

- **[settings.json](.vscode/settings.json)** - Workspace settings with ESLint, Markdownlint, Prettier integration
- **[extensions.json](.vscode/extensions.json)** - Recommended extensions for this project
- **[tasks.json](.vscode/tasks.json)** - Quick-access tasks for common operations
- **[launch.json](.vscode/launch.json)** - Debug configurations for Web Audit Suite

### Quick Access Tasks

Press **Cmd+Shift+P** → "Tasks: Run Task" to access:

**Book/Manuscript:**

- Book: Word Count
- Book: Generate PDF
- Book: Generate Kindle PDF
- Book: Generate HTML Appendices
- Book: Generate Illustrations

**Code Quality:**

- Markdown: Lint and Fix (Cmd+Shift+B default)
- Web Audit Suite: Lint

**Development:**

- Web Audit Suite: Start
- Web Audit Suite: Start with URL (prompts for custom URL)
- Web Audit Suite: Test

**Git Workflow:**

- Git: Commit and Push All

### Debugging

Press **F5** to start debugging with these configurations:

- Web Audit Suite: Debug (with example URL)
- Web Audit Suite: Debug with Custom URL (prompts for input)
- Web Audit Suite: Debug Tests
- Web Audit Suite: Debug Current Test File
- Node: Launch Current File

Set breakpoints with **F9**, step over with **F10**, step into with **F11**.

### Formatting and Linting

- **Auto-formatting on save**: Prettier for JavaScript/JSON, Markdownlint for Markdown
- **ESLint**: Automatic linting for Web Audit Suite code
- **EditorConfig**: Cross-editor consistency ([.editorconfig](.editorconfig))

### Extension Management

See [docs/vscode-extension-cleanup.md](docs/vscode-extension-cleanup.md) for:

- List of 24 recommended extensions
- 100+ extensions to disable for better performance
- Performance optimization guide

First-time setup: VS Code will prompt to install recommended extensions automatically.

## Documentation

### Getting Started

- [ONBOARDING.md](ONBOARDING.md) - Complete developer onboarding guide (start here!)
- [CLAUDE.md](CLAUDE.md) - AI agent instructions and comprehensive project guide
- [GIT-README.md](GIT-README.md) - Git workflow guide for submodule management

### Book Documentation

- [packages/manuscript/book-plan.md](packages/manuscript/book-plan.md) - Master plan with chapter outlines
- [packages/manuscript/the-bible-of-mx/Glossary.md](packages/manuscript/the-bible-of-mx/Glossary.md) - Technical glossary
- [packages/manuscript/the-bible-of-mx/appendix-implementation-roadmap.md](packages/manuscript/the-bible-of-mx/appendix-implementation-roadmap.md) - Priority-based guide
- [packages/manuscript/the-bible-of-mx/appendix-resource-directory.md](packages/manuscript/the-bible-of-mx/appendix-resource-directory.md) - Curated resources

### Web Audit Suite Documentation

- [packages/web-audit-suite/README.md](packages/web-audit-suite/README.md) - Complete tool documentation
- [packages/web-audit-suite/QUICKSTART.md](packages/web-audit-suite/QUICKSTART.md) - 5-minute guide
- [packages/web-audit-suite/docs/usermanual.md](packages/web-audit-suite/docs/usermanual.md) - User guide
- [packages/web-audit-suite/docs/CONFIGURATION.md](packages/web-audit-suite/docs/CONFIGURATION.md) - Configuration reference
- [packages/web-audit-suite/docs/FEATURES.md](packages/web-audit-suite/docs/FEATURES.md) - Feature overview

### Development Environment Documentation

- [docs/vscode-extension-cleanup.md](docs/vscode-extension-cleanup.md) - Extension management guide
- [.vscode/settings.json](.vscode/settings.json) - Workspace configuration
- [.prettierrc](.prettierrc) - Code formatting rules
- [.editorconfig](.editorconfig) - Cross-editor settings

## Working with Git and Submodules

**⚠️ CRITICAL: This repository uses a git submodule structure that requires careful handling.**

**📖 See [GIT-README.md](GIT-README.md) for comprehensive git workflow guidance.**

This repository has TWO separate git repositories:

1. **Main repo:** `/Users/tomcranstoun/Documents/GitHub/invisible-users/`
2. **Submodule:** `/Users/tomcranstoun/Documents/GitHub/invisible-users/packages/manuscript/the-bible-of-mx/`

**Always check `pwd` before git operations.** If you're working with an AI agent that handles git commands, ensure it follows the workflows in [GIT-README.md](GIT-README.md) to avoid corrupting the submodule pointers.

## Writing Style

- British English throughout (organise, colour, whilst)
- Real, concrete examples over theoretical discussion
- Technical accuracy with practical implications
- Sequential reading — each chapter builds on previous concepts

## Licence

Copyright © Tom Cranstoun. All rights reserved.

This manuscript is not licensed for public use, reproduction, or distribution.
