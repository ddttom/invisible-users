# The Invisible Users

## Designing the Web for AI Agents and Everyone Else

A practical guide to the collision between modern web design and AI agents, with a production-ready implementation tool.

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

## Who This Is For

This repository serves four distinct audiences:

1. **Web Professionals & Engineers**: Developers and QA specialists using the [Web Audit Suite](web-audit-suite/) to test and optimize sites for AI agent compatibility.
2. **Agent System Developers**: Developers building AI agents, browser extensions, and agentic systems. Chapter 11 provides validation frameworks, confidence scoring patterns, and guardrails for robust data quality.
3. **Business Leaders**: Executives and managers using the [Book](invisible-users/) to understand the strategic impact of AI agents on their digital business.
4. **Partners & Investors**: Agencies and investors using the [Business Model](docs/sales-enablement/business-plan.md) to evaluate the commercial potential of this new market category.

## Key Organizational Principles

This repository maintains strict cross-project consistency:

### The Book is Authoritative

The book manuscript (`invisible-users/`) is the authoritative source for all terminology, patterns, and concepts. If there's a conflict between the book and implementation, the implementation must be updated to match the book.

### The Tool Implements the Book

Web Audit Suite (`web-audit-suite/`) implements patterns from the book:

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
├── invisible-users/          # Book manuscript (~57,000 words)
│   ├── manuscript/           # Core manuscript files
│   │   ├── chapter-01-*.md through chapter-11-*.md
│   │   ├── preface.md
│   │   ├── executive-summary.md
│   │   ├── Glossary.md
│   │   ├── appendix-*.md
│   │   └── illustrations/    # SVG illustrations (PNG gitignored)
│   ├── book-plan.md
│   ├── implementation-checklist.md
│   ├── resource-links.md
│   ├── advice.md             # Standalone prescriptive guide
│   └── AI-design-rules.md    # AI patterns quick-reference
│
└── web-audit-suite/          # Production-ready analysis tool
    ├── src/                  # Source code
    ├── docs/                 # Documentation
    ├── examples/             # Configuration examples
    └── README.md             # Tool documentation
```

## Book Status

| Chapter | Title | Status | Words |
| --------- | ------- | -------- | ------- |
| Preface | Author's Journey | ✅ Complete | ~1,700 |
| 1 | What You Will Learn | ✅ Complete | ~3,200 |
| 2 | The Invisible Failure | ✅ Complete | ~4,500 |
| 3 | The Architectural Conflict | ✅ Complete | ~4,150 |
| 4 | The Business Reality | ✅ Complete | ~6,200 |
| 5 | The Content Creator's Dilemma | ✅ Complete | ~5,600 |
| 6 | The Security Maze | ✅ Complete | ~4,000 |
| 7 | The Legal Landscape | ✅ Complete | ~4,400 |
| 8 | The Human Cost | ✅ Complete | ~3,650 |
| 9 | Designing for Both | ✅ Complete | ~4,400 |
| 10 | Technical Advice | ✅ Complete | ~8,350 |
| 11 | What Agent Creators Must Build | ✅ Complete | ~4,700 |

**Core manuscript:** ~57,000 words

**Supporting materials:**

- Executive Summary: ~1,100 words
- Glossary (comprehensive): ~1,850 words
- Implementation Checklist: ~2,750 words
- Resource Links: ~1,950 words
- Advice (standalone): ~9,050 words
- AI Design Rules (quick reference): ~1,300 words

**Total content:** ~68,000 words

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
npm run pdf:generate       # Full PDF with professional book formatting
npm run pdf:simple         # Simplified PDF formatting
npm run pdf:html           # Generate HTML (print to PDF via browser ⌘+P)
```

**PDF Generation Requirements:**

To use `npm run pdf:generate` or `npm run pdf:simple`, you need a LaTeX distribution installed:

```bash
# Install BasicTeX (lightweight, ~100MB) via Homebrew
brew install --cask basictex

# After installation, reload your shell
source ~/.zshrc

# Verify installation
which xelatex
```

If you don't want to install LaTeX, use `npm run pdf:html` to generate an HTML file that you can print to PDF using your browser's print function (⌘+P).

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

See [web-audit-suite/README.md](web-audit-suite/README.md) for complete documentation.

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

### Identity Delegation

When AI agents transact on behalf of customers, the business-customer relationship breaks down. The book discusses identity delegation patterns as one emerging solution, acknowledging multiple approaches without prescribing a specific implementation.

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

## Documentation

### Book Documentation

- [invisible-users/book-plan.md](invisible-users/book-plan.md) - Master plan with chapter outlines
- [invisible-users/manuscript/Glossary.md](invisible-users/manuscript/Glossary.md) - Technical glossary
- [invisible-users/manuscript/appendix-implementation-roadmap.md](invisible-users/manuscript/appendix-implementation-roadmap.md) - Priority-based guide
- [invisible-users/manuscript/appendix-resource-directory.md](invisible-users/manuscript/appendix-resource-directory.md) - Curated resources

### Web Audit Suite Documentation

- [web-audit-suite/README.md](web-audit-suite/README.md) - Complete tool documentation
- [web-audit-suite/QUICKSTART.md](web-audit-suite/QUICKSTART.md) - 5-minute guide
- [web-audit-suite/docs/usermanual.md](web-audit-suite/docs/usermanual.md) - User guide
- [web-audit-suite/docs/CONFIGURATION.md](web-audit-suite/docs/CONFIGURATION.md) - Configuration reference
- [web-audit-suite/docs/FEATURES.md](web-audit-suite/docs/FEATURES.md) - Feature overview

## Writing Style

- British English throughout (organise, colour, whilst)
- Real, concrete examples over theoretical discussion
- Technical accuracy with practical implications
- Sequential reading — each chapter builds on previous concepts

## Licence

Copyright © Tom Cranstoun. All rights reserved.

This manuscript is not licensed for public use, reproduction, or distribution.
