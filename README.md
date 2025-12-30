# The Invisible Users

## Designing the Web for AI Agents and Everyone Else

A practical guide to the collision between modern web design and AI agents. This book examines how interfaces optimised for human users fail for automated visitors — and argues that fixing this benefits everyone.

## About This Book

The patterns that break AI agents also break humans. Toast notifications that vanish, pagination hiding content, single-page applications with invisible state changes — these have been creating accessibility problems for years. Now AI agents are struggling with the same patterns, and there's commercial pressure to fix them.

This book explores the technical, business, ethical, and human implications of this collision, and provides practical solutions that work for both humans and machines.

## Current Status

| Chapter | Title | Status | Words |
| --------- | ------- | -------- | ------- |
| 1 | What You Will Learn | ✅ Complete | ~2,750 |
| 2 | The Invisible Failure | ✅ Complete | ~3,900 |
| 3 | The Architectural Conflict | ✅ Complete | ~3,850 |
| 4 | The Business Reality | ✅ Complete | ~5,150 |
| 5 | The Content Creator's Dilemma | ✅ Complete | ~4,400 |
| 6 | The Security Maze | ✅ Complete | ~3,700 |
| 7 | The Legal Landscape | ✅ Complete | ~3,100 |
| 8 | The Human Cost | ✅ Complete | ~3,200 |
| 9 | Designing for Both | ✅ Complete | ~3,900 |
| 10 | Technical Advice | ✅ Complete | ~7,800 |

**Total:** ~41,700 words

## Interactive Companion

An interactive Jupyter notebook version is available at **[allabout.network/invisible-users.html](https://allabout.network/invisible-users.html)**

The notebook presents key concepts through visual demonstrations, interactive data tables, and real-world calculations - perfect as both an introduction and a navigation tool for the full manuscript.

**Time to complete:** 60-75 minutes

## Repository Structure

```text
/
├── README.md                          # This file
├── CLAUDE.md                          # Guidance for Claude Code AI assistant
├── CHANGELOG.md                       # Version history and changes
├── LEARNINGS.md                       # Session documentation and insights
├── PROJECTSTATE.md                    # Current implementation status
├── PR_TEMPLATE.md                     # Pull request template
├── book-plan.md                       # Master plan with detailed chapter outlines
├── book-svg-style.md                  # SVG illustration specifications
├── package.json                       # npm scripts for manuscript management
├── llms.txt                           # Repository llms.txt file
├── blog.md                            # Broad-appeal blog post for general readers
├── blog.svg                           # Visual illustration for blog post
├── invisible-users.ipynb              # Interactive notebook with demonstrations
└── invisible-users/                   # Book manuscript and materials
    ├── preface.md                     # Book introduction and author bio
    ├── chapter-01-*.md through chapter-10-*.md  # Individual chapter files
    ├── illustrations/                 # SVG illustrations for each chapter
    ├── Glossary.md                    # Comprehensive glossary of terms
    ├── implementation-checklist.md    # Step-by-step implementation guide
    ├── resource-links.md              # Curated resources and references
    ├── advice.md                      # Standalone prescriptive guide (~8,400 words)
    ├── for-ai.md                      # HTML patterns quick-reference for AI assistants
    ├── llms.txt                       # Example llms.txt file from book content
    ├── AI-Native.blog                 # AI-native website implementation blueprint
    ├── IMPLEMENTATION-GUIDE.md        # Deployment guide for AI-native architecture
    ├── agent-friendly-starter-kit/    # Hands-on "Good vs Bad" code examples
    └── code-examples/                 # Production-ready code implementations
        ├── html-examples/             # Complete HTML pattern examples
        ├── apache/                    # Apache configuration
        ├── nginx/                     # Nginx configuration
        ├── nextjs/                    # Next.js implementations
        ├── wordpress/                 # WordPress implementations
        ├── eds/                       # Adobe Experience Manager implementations
        ├── static-site/               # Static site generators
        ├── monitoring/                # Analytics and monitoring
        └── validation/                # Testing and validation scripts
```

## Key Themes

### Identity Delegation

When AI agents transact on behalf of customers, the business-customer relationship breaks down. The book discusses identity delegation patterns as one emerging solution, acknowledging multiple approaches (retailer-specific tokens, centralised repositories, blockchain attestations, browser-native delegation) without prescribing a specific implementation.

**Mentioned in:** Chapters 4, 6, 9, and 10

### Session Inheritance

A critical security insight: in-browser agents inherit authenticated sessions rather than failing to authenticate. Banks cannot detect AI involvement because agents inherit proof-of-humanity tokens from the user's existing session.

**Explored in:** Chapter 6

## Working with This Manuscript

### View Word Counts

```bash
npm run wordcount      # Total words across all chapters
npm run wordcount:all  # Detailed count for all markdown files
```

### Generate Illustration PNGs

```bash
npm run illustrations:generate  # Convert all SVG illustrations to PNG
```

PNG files are generated locally from SVG sources and are not tracked in git. This command uses ImageMagick to convert all chapter SVG files to high-quality PNG format (300 DPI) for markdown compatibility.

### List Chapters

```bash
npm run status         # Show all chapter files
```

### View Changelog

```bash
# View version history
cat CHANGELOG.md
```

### For Claude Code Users

This repository includes guidance files for AI assistants:

- [CLAUDE.md](CLAUDE.md) - Writing style, markdown rules, git guidelines, conceptual themes
- [book-svg-style.md](book-svg-style.md) - SVG illustration specifications

## Chapter Overview

1. **What You Will Learn** - Introduction connecting accessibility and agent compatibility
2. **The Invisible Failure** - Specific failure patterns with technical explanations
3. **The Architectural Conflict** - Why human cognitive models clash with AI parsing
4. **The Business Reality** - Economics, incentives, and identity delegation patterns
5. **The Content Creator's Dilemma** - The existential threat to ad-funded content
6. **The Security Maze** - Authentication, session inheritance, and delegation
7. **The Legal Landscape** - Liability, copyright, and emerging regulations
8. **The Human Cost** - Digital divide and access implications
9. **Designing for Both** - Practical solutions and design patterns
10. **Technical Advice** - Implementation code and testing strategies

## Supporting Materials

### Illustrations

All 10 chapter illustrations complete ✅ ([book-svg-style.md](book-svg-style.md) for specifications)

1. Chapter 1 - "Same Website, Different Reality"
2. Chapter 2 - "The Anatomy of Invisible Failure"
3. Chapter 3 - "The Architectural Conflict"
4. Chapter 4 - "The Business Model Collision"
5. Chapter 5 - "The Content Creator's Dilemma"
6. Chapter 6 - "The Security Maze"
7. Chapter 7 - "The Legal Landscape"
8. Chapter 8 - "The Human Cost"
9. Chapter 9 - "Designing for Both"
10. Chapter 10 - "Technical Advice"

### Additional Materials

- [Glossary.md](invisible-users/Glossary.md) - 60+ technical terms with cross-references
- [implementation-checklist.md](invisible-users/implementation-checklist.md) - Priority-based implementation roadmap
- [resource-links.md](invisible-users/resource-links.md) - 150+ curated resources organized by category
- [advice.md](invisible-users/advice.md) - Standalone prescriptive guide (~8,400 words)
- [for-ai.md](invisible-users/for-ai.md) - HTML patterns quick-reference for AI assistants (~1,200 words)
- [Agent-Friendly Starter Kit](invisible-users/agent-friendly-starter-kit/) - Production-ready "Good vs Bad" comparison site implementation

### Promotional Materials

- [blog.md](blog.md) - Broad-appeal blog post targeting multiple audiences (designers, developers, PMs, content creators)
- [blog.svg](blog.svg) - Visual illustration demonstrating human vs agent perception

## Writing Style

- British English throughout (organise, colour, whilst)
- Real, concrete examples over theoretical discussion
- Technical accuracy with practical implications
- Sequential reading — each chapter builds on previous concepts

## Licence

Copyright © Tom Cranstoun. All rights reserved.

This manuscript is not licensed for public use, reproduction, or distribution.
