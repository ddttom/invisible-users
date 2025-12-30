# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a book manuscript titled **"The Invisible Users: Designing the Web for AI Agents and Everyone Else"** - a practical guide examining how modern web design optimized for human users fails for AI agents, and how fixing this benefits everyone.

**Target length:** 30,000-50,000 words (10 chapters, 3,000-5,000 words each)
**Current status:** Chapters 1-10 complete, all illustrations complete

## Repository Structure

```text
/
├── README.md
├── CLAUDE.md                 # This file
├── CHANGELOG.md
├── LEARNINGS.md
├── PROJECTSTATE.md
├── PR_TEMPLATE.md
├── book-plan.md              # Master plan with chapter outlines and status
├── book-svg-style.md
├── package.json
├── llms.txt                  # Repository llms.txt file
├── blog.md                   # Promotional blog post
├── blog.svg
└── invisible-users/          # Book manuscript and materials
    ├── preface.md
    ├── chapter-XX-*.md       # Individual chapter files (01-10)
    ├── illustrations/        # Illustrations for each chapter (SVG + PNG)
    │   ├── chapter-XX-*.svg  # Source SVG files (tracked in git)
    │   └── chapter-XX-*.png  # PNG exports (gitignored, generated locally)
    ├── Glossary.md           # Comprehensive glossary
    ├── implementation-checklist.md
    ├── resource-links.md
    ├── advice.md             # Standalone prescriptive guide
    ├── for-ai.md             # AI patterns quick-reference
    ├── llms.txt              # Example llms.txt file from book content
    ├── AI-Native.blog
    ├── agent-friendly-starter-kit/ # Code examples (good/ vs bad/)
    └── code-examples/        # Production-ready code implementations
        ├── html-examples/
        ├── apache/
        ├── nginx/
        ├── nextjs/
        ├── wordpress/
        ├── eds/
        ├── static-site/
        ├── monitoring/
        └── validation/
```

**Note:** PNG illustrations are generated from SVG sources using `npm run illustrations:generate` and are not tracked in version control.

## Writing Style Guidelines (Critical)

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

When creating new markdown files, use the `/create-md` skill which ensures proper formatting from the start.

For editing existing files, follow these key rules:

- **Headings:** Blank lines before/after, ATX-style only (not setext-style underlined)
- **Lists:** Blank lines before/after
- **Code blocks:** Always specify language (`javascript`, `html`, `css`, `json`, `bash`, `text`)
- **Tables:** Proper spacing around pipes, aligned separators
- **MD036 Prevention:** Never use emphasis (bold/italic) for standalone lines
- **Spacing:** Consistent throughout document

**Common linting errors:**

- **MD036:** Emphasis used instead of heading (e.g., `*December 2025*` should be `December 2025`)
- **MD022:** Headings must be surrounded by blank lines
- **MD040:** Code blocks must have language specified
- **MD047:** Files must end with single newline

See `/create-md` skill for complete formatting guide and examples.

## Key Conceptual Themes

### Identity Delegation (Mentioned)

A practical concern discussed briefly in Chapters 4, 6, 9, and 10: When agents make purchases, businesses lose customer identity. The book mentions identity delegation patterns as one emerging solution, without prescribing a specific implementation.

**Chapters that mention this:**

- Chapter 4 (Business Reality) - introduces problem and multiple possible solutions
- Chapter 6 (Security Maze) - delegation token security principles
- Chapter 9 (Designing for Both) - basic delegation patterns
- Chapter 10 (Technical Advice) - simple implementation example

**Treatment:** Low-level practical mention, not a central theme. Multiple solution approaches acknowledged (retailer-specific tokens, centralised repositories, blockchain, browser-native). Standards still emerging.

### Session Inheritance Problem

Key security insight (Chapter 6): In-browser agents inherit authenticated sessions rather than failing to authenticate. Banks cannot detect AI involvement because agents inherit proof-of-humanity tokens from the authenticated user's session.

## Critical Implementation Guidelines

### Priority-Based Implementation (Not Time-Based)

**CRITICAL:** All implementation guidance uses priority levels, not time estimates:

- **Priority 1:** Critical Quick Wins - highest impact, minimal effort
- **Priority 2:** Essential Improvements - important foundational work
- **Priority 3:** Core Infrastructure - systematic platform improvements
- **Priority 4:** Advanced Features - comprehensive long-term enhancements

**Never use time references** (hours, days, weeks, months, quarters) when discussing implementation tasks. Use priority levels instead. This applies to all documents including implementation-checklist.md, chapter-10-technical-advice.md, advice.md, and AI-Native.blog.

### Word Count Management

When updating word counts:

- Always verify against actual files using `wc -w invisible-users/chapter-*.md`
- Round to nearest 50 for readability (e.g., 40,232 → ~40,200)
- Update all three files simultaneously: book-plan.md, README.md, PROJECTSTATE.md
- Don't trust documented counts without verification - they drift over time

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

### Cross-Chapter Consistency

When editing content that appears in multiple chapters, verify consistency across all locations:

- **Identity delegation:** Chapters 4, 6, 9, 10, plus book-plan.md
- **Session inheritance:** Chapters 6, 9, 10
- Always use grep to find all references before making changes

### File Operation Requirements

- **Edit tool requires Read first:** You must read a file before editing it - this is a tool requirement
- **Pattern:** Read → analyze → Edit

## SVG Illustration Specifications

All SVG illustration specifications are documented in `book-svg-style.md`. When creating or modifying illustrations, refer to that file for:

- Technical requirements (viewbox, background, fonts)
- Visual style guidelines (color coding, borders, labels)
- Content patterns (split-view comparisons, flow diagrams)

## Chapter Architecture

### Completed Chapters (1-10)

| # | Title | Focus |
| --- | ------- | ------- |
| 1 | What You Will Learn | Introduction and accessibility parallel |
| 2 | The Invisible Failure | Specific failure patterns with technical detail |
| 3 | The Architectural Conflict | Why human cognitive models vs AI parsing conflict |
| 4 | The Business Reality | Economics and incentives (mentions identity delegation) |
| 5 | The Content Creator's Dilemma | Ad-funded content under threat |
| 6 | The Security Maze | Authentication, session inheritance, delegation |
| 7 | The Legal Landscape | Liability, terms of service, copyright |
| 8 | The Human Cost | Digital divide and access implications |
| 9 | Designing for Both | Solution patterns |
| 10 | Technical Advice | Implementation code |

### Chapter Dependencies

- Chapters build sequentially - don't reference concepts not yet introduced
- Chapter 4 must precede chapters discussing business models
- Chapter 6 security concepts inform Chapter 10 implementations

## Working with This Repository

### Reviewing Chapters

When asked to review or edit a chapter:

1. Read the chapter file completely
2. Check book-plan.md for chapter requirements and status
3. Verify consistency with established themes (Session Inheritance)
4. Ensure British English and style guidelines
5. Confirm sequential flow - don't reference future chapters
6. Check that technical examples use simple JavaScript with minimal dependencies

### Creating or Modifying Illustrations

When working with SVG illustrations:

1. Read `book-svg-style.md` for complete specifications
2. Check existing illustrations in `invisible-users/illustrations/` for style consistency
3. Name files: `chapter-XX-[descriptive-name].svg`

### Adding or Editing Content

- **Code examples:** Simple JavaScript, minimal dependencies, clear comments
- **Technical accuracy:** Verify technical claims before including
- **Practical focus:** Concrete, implementable advice over theory
- **No invented content:** Use source material references in book-plan.md

## Common Tasks

### Check overall book status

Read `book-plan.md` - contains complete status, word counts, and pending work

### Review chapter consistency

Compare chapter against requirements in book-plan.md section for that chapter

### Update illustration requirements

Modify SVG Illustration Requirements section in book-plan.md

### Generate PNG illustrations

Run `npm run illustrations:generate` to convert all SVG files to PNG format. PNG files are gitignored and must be generated locally. Required for markdown previews to display illustrations.

### Cross-chapter concept check

Search for "session inheritance" across chapters to verify consistent treatment

### Markdown linting

IMPORTANT: File-specific npm scripts DO NOT EXIST.

Commands like `npm run lint:md:fix:preface` will fail. You have two options for linting:

#### Option 1: Use npx markdownlint for specific files

```bash
# Check specific file
npx markdownlint invisible-users/preface.md

# Fix specific file
npx markdownlint --fix invisible-users/preface.md
```

#### Option 2: Use npm scripts (processes ALL markdown files)

```bash
# Check all markdown files
npm run lint:markdown

# Fix all markdown files (this will also fix your specific file)
npm run lint:markdown:fix
```

#### WRONG: This will fail

```bash
npm run lint:md:fix:preface  # No file-specific scripts exist
```

**Common linting errors:**

- **MD036**: Emphasis used instead of heading - Remove italic/bold from standalone lines like dates
- **MD022**: Headings should be surrounded by blank lines
- **MD040**: Fenced code blocks must have a language specified
- **MD047**: Files should end with a single newline

## Git Commit Guidelines

When creating git commits:

- **CRITICAL: Never add co-author attribution or "Generated with Claude Code" messages**
- Keep commit messages clear and professional
- Focus on describing the changes, not the tools used
- Standard commit message format: clear subject line, optional detailed body
- Example: "Fix markdown linting issues in all chapters" not "Generated with Claude Code"

## Critical Learnings Reference

For comprehensive guidance on common mistakes, writing style, and tool usage patterns, see **LEARNINGS.md**. LEARNINGS.md is distilled from real project experience and provides actionable guidance, not historical changelog.

## Notes for Future Development

- All supporting materials complete (v2.5.1)
- All chapters should be read in sequence for full context
- Project status: Publication-ready
