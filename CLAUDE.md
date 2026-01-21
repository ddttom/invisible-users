# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**🎯 SINGLE SOURCE OF TRUTH:** This main repository contains the ONLY CLAUDE.md and .claude/ configuration. Submodules are assets with no Claude Code configuration - they inherit guidance from this master repo.

---

## 🚨 CRITICAL: ALWAYS CHECK `pwd` BEFORE EVERY OPERATION

**YOU WILL GET LOST IN THIS MULTI-REPOSITORY WORKSPACE. This is guaranteed. The solution is mandatory `pwd` checks.**

### Setting Up Your Environment

Before working in this repository, determine the main repo path:

```bash
# Option 1: If you're already in the main repo root
pwd  # Should output: /path/to/invisible-users
MAIN_REPO=$(pwd)

# Option 2: Set absolute path explicitly
MAIN_REPO="/absolute/path/to/invisible-users"

# Verify it's set correctly
echo ${MAIN_REPO}  # Should show your main repo path
```

Throughout this document, `${MAIN_REPO}` represents your main repository path. Replace it with your actual path when using commands.

### THE GOLDEN RULE: Never Navigate Away Without Returning

**If you MUST use `cd` to enter a submodule:**

```bash
# ❌ WRONG: Staying in submodule after operation
cd ${MAIN_REPO}/outputs
git status
# Now you're lost in outputs/ for all future commands!

# ✅ CORRECT: Immediately return to main repo
cd ${MAIN_REPO}/outputs && git status && cd ${MAIN_REPO}
pwd  # Verify you're back in main repo

# ✅ BETTER: Use git -C to avoid navigation entirely
cd ${MAIN_REPO}
git -C outputs status
pwd  # Still in main repo, never left
```

**Enforce this rule:**

- Every `cd` command MUST include `&& cd ${MAIN_REPO}` at the end
- OR use `git -C <submodule-path>` commands instead of navigating
- After ANY directory change, immediately run `pwd` to verify location

### Common Navigation Mistakes (Learn from these errors)

### MISTAKE #1: Running `ls -la blogs` from wrong directory

```bash
# You ran: ls -la blogs
# Error: "blogs": No such file or directory
# Why: You were in /outputs/ subdirectory, not main repo root
# Fix: ALWAYS run pwd first to know where you are
```

### MISTAKE #2: Trying to `cd` into submodule during git operations

```bash
# You ran: cd packages/bible && git add -A
# Error: "No such file or directory"
# Why: You were already inside outputs/ submodule
# Fix: Check pwd, use git from current location
```

### MISTAKE #3: Assuming symlink location without verification

```bash
# You ran: test -L blogs && readlink blogs
# Output: "✗ blogs symlink broken"
# Why: Test syntax was wrong AND you were in wrong directory
# Fix: pwd first, then use correct test: file blogs
```

### CORRECT WORKFLOW FOR EVERY OPERATION

```bash
# Step 1: ALWAYS check location first (NOT OPTIONAL)
pwd

# Step 2: Based on output, construct correct path
# If output: ${MAIN_REPO}
#   → You're in MAIN REPO - use .claude/skills/news/skill.md
# If output: ${MAIN_REPO}/outputs
#   → You're in OUTPUTS SUBMODULE - use ../../.claude/skills/news/skill.md
# If output: ${MAIN_REPO}/packages/bible
#   → You're in BIBLE SUBMODULE - use ../../.claude/skills/news/skill.md
```

### Repository Architecture

**This workspace has EIGHT git repositories (1 main hub + 7 submodules). File paths depend on your location.**

- **Main repo (MASTER):** `${MAIN_REPO}/`
  - Contains: `.claude/` (skills, hooks, settings), `CLAUDE.md` (single source of truth)
  - Role: Control and orchestration

- **Submodules (ASSETS, currently 7):**
  - **Outputs (PRIVATE):** `outputs/` → `invisible-users-outputs` - All generated content
  - **Bible:** `packages/bible/` → `invisible-users-bible` - Full book manuscript
  - **Slim:** `packages/dont-make-ai-think/` → `invisible-users-slim` - Practical guide
  - **MX Handbook:** `packages/mx-handbook/` → `MX-The-Handbook` - Rebranded practical guide
  - **Appendices:** `packages/shared-appendices/` → `invisible-users-appendices` - Shared resources
  - **Code:** `packages/shared-code-examples/` → `invisible-users-code-examples` - Pattern examples
  - **UCP:** `packages/ucp/` → `Universal-Commerce-Protocol/ucp` - Ecommerce standard for AI agents (**READ-ONLY REFERENCE**)
    - Role: External reference material demonstrating practical application
    - DO NOT modify this submodule - it is maintained by the UCP project
  - Role: Version-controlled content (NO `.claude/`, NO CLAUDE.md)

### Repository Navigation Map

**CRITICAL:** Always run `pwd` before file operations. Here's the complete structure:

```text
${MAIN_REPO}/  ← MAIN REPO (MASTER)
├── .claude/                          ← Claude Code config (ONLY in main repo)
│   ├── skills/                       ← /news, /review-docs, /step-commit
│   ├── hooks/                        ← pre-tool-use.sh, post-tool-use.sh
│   └── settings.local.json           ← Permissions and configuration
├── CLAUDE.md                         ← This file (ONLY in main repo)
├── LEARNINGS.md                      ← Battle-tested rules
├── README.md                         ← Main repo README
├── package.json                      ← Root workspace config
├── docs/                             ← Documentation
│   ├── repo/                         ← GIT-README.md, ONBOARDING.md
│   ├── architecture/                 ← doc-architecture.md
│   ├── sales-enablement/             ← Business materials
│   ├── shared-chapters/              ← Shared book content (Chapter 0)
│   └── for-ai/                       ← AI assistant guidance
├── blogs → outputs/bible/blogs       ← SYMLINK to outputs submodule blogs
├── books/                            ← Symlinks for convenience
│   ├── bible → ../packages/bible
│   ├── dont-make-ai-think → ../packages/dont-make-ai-think
│   ├── mx-handbook → ../packages/mx-handbook
│   ├── appendices → ../packages/shared-appendices
│   ├── code-examples → ../packages/shared-code-examples
│   └── outputs → ../outputs
├── packages/
│   ├── bible/                        ← SUBMODULE (git repo)
│   │   └── ${MAIN_REPO}/packages/bible/
│   │       ├── chapters/             ← 13 chapter markdown files (Chapters 1-13)
│   │       ├── illustrations/        ← SVG and PNG images
│   │       ├── README.md             ← Bible-specific README
│   │       └── NO .claude/ directory
│   │       Note: Chapter 0 is in main repo at docs/shared-chapters/
│   ├── dont-make-ai-think/           ← SUBMODULE (git repo)
│   │   └── ${MAIN_REPO}/packages/dont-make-ai-think/
│   │       ├── chapters/             ← 10 chapter markdown files
│   │       ├── README.md             ← Slim book README
│   │       └── NO .claude/ directory
│   ├── mx-handbook/                  ← SUBMODULE (git repo)
│   │   └── ${MAIN_REPO}/packages/mx-handbook/
│   │       ├── chapters/             ← 11 chapter markdown files
│   │       ├── README.md             ← MX Handbook README
│   │       └── NO .claude/ directory
│   ├── shared-appendices/            ← SUBMODULE (git repo)
│   │   └── ${MAIN_REPO}/packages/shared-appendices/
│   │       ├── appendix-*.md         ← 12 appendix files (A-L)
│   │       ├── web/                  ← HTML versions
│   │       ├── README.md             ← Appendices README
│   │       └── NO .claude/ directory
│   ├── shared-code-examples/         ← SUBMODULE (git repo)
│   │   └── ${MAIN_REPO}/packages/shared-code-examples/
│   │       ├── agent-friendly-starter-kit/  ← good/ vs bad/ patterns
│   │       ├── examples/             ← Production code
│   │       ├── README.md             ← Code examples README
│   │       └── NO .claude/ directory
│   ├── ucp/                          ← SUBMODULE (git repo)
│   │   └── ${MAIN_REPO}/packages/ucp/
│   │       ├── docs/                 ← UCP documentation
│   │       ├── generated/            ← Generated schemas and types
│   │       ├── main.py               ← Schema generator
│   │       ├── README.md             ← UCP overview
│   │       └── NO .claude/ directory
│   │       Note: Universal Commerce Protocol - standardized ecommerce API for AI agents
│   └── web-audit-suite/              ← NOT A SUBMODULE (regular directory)
│       ├── src/                      ← Tool source code
│       ├── test/                     ← Test files
│       └── README.md                 ← Tool documentation
└── outputs/                          ← SUBMODULE (PRIVATE git repo)
    └── ${MAIN_REPO}/outputs/
        ├── bible/                    ← Bible outputs
        │   ├── blogs/                ← Blog posts
        │   ├── presentations/        ← Slide decks
        │   └── marketing/            ← Marketing materials
        ├── dont-make-ai-think/       ← Slim book outputs
        ├── README.md                 ← Outputs README
        └── NO .claude/ directory
```

**Key navigation rules:**

1. **Accessing .claude/ files:**
   - ✅ FROM MAIN: `.claude/skills/news/skill.md`
   - ✅ FROM SUBMODULE: `../../.claude/skills/news/skill.md`
   - ❌ NEVER: `cd packages/bible && .claude/` (doesn't exist)

2. **Git operations:**
   - Run `pwd` first - ALWAYS
   - Commit submodule changes BEFORE committing main repo pointer updates
   - Use `git add .` from current location (don't try to cd during git commands)

3. **Path construction:**
   - Main repo files: Use relative paths from `${MAIN_REPO}/`
   - Submodule files: Check `pwd`, then construct correct relative path
   - When in doubt: Use absolute paths

**MANDATORY: Run `pwd` before accessing `.claude/` files**

**📖 CRITICAL REFERENCES FOR AI ASSISTANTS:**

- **[LEARNINGS.md](LEARNINGS.md)** - Recent mistakes and battle-tested rules. **Read this file at the start of each session** to learn from documented errors and avoid repeating them.
- **[docs/repo/GIT-README.md](docs/repo/GIT-README.md)** - Comprehensive git workflow guidance for AI agents (multi-repository structure, submodule-first workflow, safe patterns)
- **[.claude/pwd-reminder.md](.claude/pwd-reminder.md)** - Working directory verification requirements

---

## Project Overview

### 1. The Invisible Users (Book Manuscripts)

Multiple books from modular repositories:

- **"The Invisible Users"** (The Bible) - `packages/bible/` - Full 13-chapter guide (~78,000 words + shared appendices)
- **"Don't Make AI Think"** (Slim) - `packages/dont-make-ai-think/` - 11-chapter practical guide with business justification
- **"MX-The Handbook"** - `packages/mx-handbook/` - Practical implementation guide for developers and designers (rebranded from "Don't Make AI Think")
- **Shared Appendices** - `packages/shared-appendices/` - 12 appendices (A-L) shared across all books
- **Shared Code Examples** - `packages/shared-code-examples/` - Good vs bad pattern implementations
- **Universal Commerce Protocol** - `packages/ucp/` - Open standard demonstrating AI agent ecommerce interactions

**Current status:** Publication-ready (Due Q1 2026, not yet published)

**Market context:** January 2026 saw three major platforms (Amazon, Microsoft, Google) launch agent commerce systems within seven days, accelerating the transition from experimental to infrastructure. The book documents this convergence and provides implementation patterns applicable across all platforms.

**CRITICAL WRITING REQUIREMENT - Timeless Manuscript Rule:**

Book manuscript files (.md files in `packages/bible/chapters/`, `packages/dont-make-ai-think/chapters/`, `packages/mx-handbook/chapters/`, `packages/shared-appendices/`, `docs/shared-chapters/`) must be written as if they've always existed.

**NEVER include:**

- Publication dates or launch dates about the book itself
- "This update includes..." or "We have added..."
- "New in this version..." or "Recently launched..." or "launching April 2, 2026..."
- Future-tense statements about the book
- Meta-commentary about the writing/editing process
- "This chapter will cover..." (use "This chapter covers...")

**ALWAYS write:**

- Definitive present tense: "The analysis provides..." not "We added analysis..."
- Timeless descriptions: "This book is part of a three-book series:" not "launching April 2, 2026"
- Established fact tone: Features described as if they've always existed

**Exception:** Historical context about the *subject matter* is allowed (e.g., "Google launched UCP in January 2026" describes an industry event, not the book).

**Enforcement:** All book manuscript files MUST include YAML frontmatter with an `ai-instruction` field reminding AI systems of this rule. See [docs/for-ai/writing-style.md](docs/for-ai/writing-style.md) for the standard template.

### 2. Web Audit Suite (Analysis Tool)

Comprehensive Node.js website analysis tool (`packages/web-audit-suite/`) implementing book's AI agent compatibility patterns. See package README for complete documentation.

### 3. Universal Commerce Protocol (UCP)

**Universal Commerce Protocol (UCP)** - Read-only reference submodule demonstrating practical application of the book's patterns in real-world ecommerce contexts. UCP is an external project maintained separately; this repository includes it as reference material only.

Open standard for commerce interoperability (`packages/ucp/`) that enables AI agents to autonomously discover capabilities, navigate product catalogs, and complete purchases through standardized protocols. Key features include:

- **Composable Architecture:** Modular capabilities (Checkout, Order, Identity Linking) with optional extensions
- **Dynamic Discovery:** Standardized profiles allow autonomous agent configuration
- **Transport Agnostic:** Works via REST APIs, Model Context Protocol (MCP), or Agent-to-Agent (A2A)
- **Security-First:** Built-in support for advanced security patterns and verifiable credentials

UCP embodies the convergence principle from the book - patterns that work for AI agents also benefit human users through clear, semantic structure and explicit state management. See [packages/ucp/README.md](packages/ucp/README.md) and [ucp.dev](https://ucp.dev) for complete documentation.

## Repository Structure

**Key directories:**

```text
/
├── CLAUDE.md                 # This file (single source of truth)
├── docs/repo/                # Critical documentation
│   ├── GIT-README.md         # Git workflow guide for AI agents
│   ├── LEARNINGS.md          # Battle-tested rules
│   └── [CHANGELOG, PROJECTSTATE, etc.]
├── .claude/                  # Claude Code configuration (skills, hooks)
├── config/                   # Project configuration
│   ├── .markdownlint.json    # Markdown linting rules
│   └── book-svg-style.md     # SVG illustration style guide
├── scripts/                  # Build and generation scripts
├── blogs → outputs/bible/blogs  # SYMLINK to outputs submodule blogs directory
├── books/                    # Convenience symlinks (tracked, but directory ignored in .gitignore)
│   ├── appendices → ../packages/shared-appendices
│   ├── bible → ../packages/bible
│   ├── code-examples → ../packages/shared-code-examples
│   ├── dont-make-ai-think → ../packages/dont-make-ai-think
│   ├── mx-handbook → ../packages/mx-handbook
│   └── outputs → ../outputs
├── outputs/                  # Generated content (git submodule - PRIVATE)
├── packages/                 # Book manuscripts and tools
│   ├── bible/                # The Bible (git submodule)
│   ├── dont-make-ai-think/   # Slim book (git submodule)
│   ├── mx-handbook/          # MX Handbook (git submodule)
│   ├── shared-appendices/    # Shared appendices (git submodule)
│   ├── shared-code-examples/ # Pattern examples (git submodule)
│   ├── ucp/                  # Universal Commerce Protocol (git submodule)
│   └── web-audit-suite/      # Analysis tool (not a submodule)
└── docs/                     # Project documentation
    ├── architecture/         # Architecture diagrams
    ├── repo/                 # Repository-level docs
    ├── sales-enablement/     # Sales materials
    └── for-ai/               # AI assistant guidance
        └── writing-style.md  # Complete writing style guide
```

**See individual package READMEs for detailed contents, build commands, and usage.**

## Essential Commands

### Book Manuscript Commands

```bash
npm run wordcount              # Total words across all chapters
npm run wordcount:all          # Detailed count for all markdown files
npm run illustrations:generate # Generate PNG from SVG sources
npm run lint:markdown          # Check all markdown files
npm run lint:markdown:fix      # Fix all markdown files
npm run pdf:generate           # Generate A4 PDF with cover
npm run pdf:kindle             # Generate 6"×9" PDF for KDP
npm run pdf:appendix           # Generate HTML appendices + sitemap.xml
npm run status                 # Show all chapter files
npm run commit-push            # Interactive commit (for humans, not Claude)
```

### Web Audit Suite Commands

```bash
npm run audit:start            # Run analysis (default settings)
npm run audit:start -- -s <url> -c 10  # Limited URLs for testing
npm run audit:start -- -s <url> --extract-patterns  # Pattern extraction
npm run audit:start -- -s <url> --enable-history    # Regression detection
npm run audit:lint             # Run ESLint
npm run audit:test             # Run tests
```

**See [packages/web-audit-suite/README.md](packages/web-audit-suite/README.md) for complete usage details.**

## Writing Style Guidelines (Book Manuscript)

**Language and Voice:**

- British English (organise, colour, whilst)
- First-person narrative
- No colons in chapter titles
- Short dashes only (not em-dashes)
- Professional tone without superlatives or emotional validation

**Complete style guide:** [docs/for-ai/writing-style.md](docs/for-ai/writing-style.md)

**Use `/review-docs [file paths]` skill to check any document against writing style guide.**

## Markdown Formatting Rules

**CRITICAL: Always fix the root problem, never adjust lint configuration to suppress warnings.**

**CRITICAL: Always use the project config file when running markdownlint:**

```bash
# ✅ CORRECT: Use config file
npx markdownlint -c config/.markdownlint.json docs/shared-chapters/chapter-00-what-are-ai-agents.md

# ❌ WRONG: Running without config
npx markdownlint docs/shared-chapters/chapter-00-what-are-ai-agents.md
```

The config file (`config/.markdownlint.json`) disables rules that are intentional in this project:

- **MD013**: Line length (prose can exceed 80 characters)
- **MD041**: First line heading (LaTeX `\newpage` commands are intentional)
- **MD051**: Link fragments (forward references are allowed)

**Key rules:**

- Headings: Blank lines before/after, ATX-style (###), not bold text
- Lists: Blank lines before/after
- Code blocks: Always specify language (javascript, html, css, json, bash, text)
- Tables: Proper spacing around pipes
- MD036: Never use emphasis for standalone lines (dates should be plain text)
- URLs: Wrap in angle brackets or markdown links
- MD024: Duplicate headings MUST be made unique (cannot be disabled)

**Common errors:**

- MD024: Add context to duplicate headings ("Added - 2026-01-10" appears twice → "Added - Publication Status (2026-01-10)")
- MD036: Emphasis as heading (`**Date**` standalone → `Date` or `## Date`)
- MD040: Specify code block language (use `text` for email templates)

**Important exceptions:**

- **Skill files:** Never fix markdown linting issues in `.claude/skills/` files (excluded from linting via `--ignore .claude` flag)
- **Files with YAML frontmatter (MD025):** ANY markdown file with YAML frontmatter (in any directory - blogs, chapters, docs, etc.) may trigger MD025 warnings. When the YAML `title` field is used for metadata only (stripped during processing and NOT displayed as a heading), the first content heading MUST be H1 (#). Markdown linters may incorrectly flag this as "multiple H1s" - this is expected and correct for files where frontmatter is processed but not rendered as content.

## Markdown Metadata (Pandoc YAML Frontmatter)

**CRITICAL:** This repository uses Pandoc YAML frontmatter for markdown metadata—the universal standard across Hugo, Jekyll, Gatsby, Quarto, and Pandoc.

**Example:**

```yaml
---
title: "Chapter 0: What Are AI Agents?"
author: "Tom Cranstoun"
date: "2024-12-15"
description: "Introduction to AI agents and their role as website visitors"
keywords: [ai-agents, web-accessibility, metadata]
ai-instruction: "Instructions for AI agents parsing this document"
purpose: "Educational content introducing AI agents concept"
---
```

**YAML Frontmatter Processing:**

YAML frontmatter is processed differently depending on the build system:

1. **Metadata only (stripped from output):** When frontmatter is used purely for HTML meta tags, page titles, or build system configuration, it is NOT rendered as visible content. In these cases:
   - The YAML `title` field becomes HTML `<title>` and meta tags
   - The first content heading MUST be H1 (#)
   - Markdown linters may incorrectly flag MD025 (multiple H1s) - this is expected
   - Common in: blog posts, generated HTML pages, static site generators

2. **Included in output:** Some build processes (like Pandoc for PDFs) may include frontmatter data in the output. Context determines usage.

**When you encounter YAML frontmatter:**

1. Read and understand it (provides context about file's purpose)
2. Respect `ai-instruction` field if present
3. Use metadata to inform your approach
4. Check if file is processed (blog posts, HTML generation) to determine correct heading structure

**Standard fields:**

- `title`, `author`, `date` - Core metadata
- `description`, `abstract` - Summary information
- `keywords` - Topic tags (array format)
- `ai-instruction` - Agent parsing guidance
- `purpose` - Document intent

**Files using YAML frontmatter:** Can appear in ANY markdown file - blog posts (`outputs/bible/blogs/`), chapters (`docs/shared-chapters/`, `packages/*/chapters/`), documentation, or any other markdown file.

**Implementation reference:** Appendix L Pattern 4, Chapter 10, Appendix H

## Dual-File Appendix Structure

**Appendix D (AI-Friendly HTML Guide):**

- `.txt` file - Source of truth (~3,000 lines)
- `.md` file - Wrapper with table of contents

**Appendix H (Example llms.txt):**

- `.txt` file - Source of truth (20 curated links)
- `.md` file - Wrapper with introduction

**⚠️ CRITICAL: Update BOTH files when making content changes:**

1. Edit `.txt` file (primary)
2. Update `.md` file (TOC/intro if changed)

## Accessibility Requirements

**WCAG 2.1 AA contrast requirements:**

- Normal text: 4.5:1 minimum
- Large text (18pt+ or 14pt+ bold): 3:1 minimum
- UI components: 3:1 minimum

**Test before deployment using browser DevTools or online contrast checkers.**

## Web Audit Suite Architecture

**Four-phase pipeline:**

0. **robots.txt Compliance** - Fetch, parse, validate (100-point quality score)
1. **URL Collection** - Sitemap processing with robots.txt validation
2. **Data Collection** - Concurrent URL processing (3-5x faster), browser pooling, Pa11y, LLM metrics
3. **Report Generation** - CSV/markdown reports, pattern extraction, regression detection

**CRITICAL:** `packages/web-audit-suite/results/results.json` is single source of truth. Report generation NEVER fetches new data. See [packages/web-audit-suite/README.md](packages/web-audit-suite/README.md) for complete architecture.

## Key Conceptual Themes (Book)

**The Invisible Users:** AI agents visiting websites and performing actions without site owners' awareness. Most companies don't track AI bot traffic; some prohibit it entirely through robots.txt or block it via services like Cloudflare Identity checks. Modern AI browsers (ChatGPT, BrowserOps, Comet, Strawberry, Neo, DIA - see AI browser examples) identify as bots, but User-Agent strings cannot be trusted. Some agents are browser extensions, others are Playwright-driven automation scripts controlled by AI. Site owners can no longer reliably distinguish between human visitors and AI agents.

**Agent Diversity:** CLI agents, browser agents, server-based agents, IDE-integrated controls, browser extensions, automation frameworks

**Universal Patterns:** Semantic HTML (works for ALL agents), explicit state attributes, Schema.org structured data

**Two HTML States:**

- **SERVED HTML** (static) - CLI and server-based agents
- **RENDERED HTML** (dynamic) - Browser-based agents

**Silent Failures:** Agents failing on websites without error logs - businesses lose conversions without analytics visibility

**Platform Race:** January 2026 convergence (Amazon Alexa+, Microsoft Copilot Checkout, Google UCP) as competitive inflection point

**Convergence Principle:** Patterns optimising for AI agents also benefit accessibility users (accessibility 2.0)

**Ecommerce and AI Agents:** Universal Commerce Protocol demonstrates how standardised APIs enable autonomous agent interactions for product discovery, cart management, and checkout completion. UCP's composable architecture and dynamic capability discovery embody the book's principles for machine-readable interfaces.

**See book chapters for complete coverage of patterns, security insights, and implementation guidance.**

## Critical Implementation Guidelines

**Priority-Based (Not Time-Based):**

- Priority 1: Critical Quick Wins
- Priority 2: Essential Improvements
- Priority 3: Core Infrastructure
- Priority 4: Advanced Features

**Never use time references (hours, days, weeks, months).**

**Standards Classification:**

- Established: Schema.org, semantic HTML, ARIA
- Emerging: llms.txt
- Proposed: ai-* meta tags, data-agent-visible
- Speculative: Future possibilities (clearly marked)

**Universal Terminology:** Use `postal_code` (not postcode/zip_code), `region` (not state/province), E.164 phone format

## Tool Usage Best Practices

**Jupyter Notebooks:** Use `NotebookEdit` tool (not `Edit`) for `.ipynb` files

**Read Before Edit:** `Edit` tool REQUIRES reading file first (enforced). Exception: Files read during plan mode count as "already read" for implementation phase

**Parallel Tool Calls:** Make independent tool calls in single message for efficiency

## Git Workflows

**⚠️ CRITICAL:** See [docs/repo/GIT-README.md](docs/repo/GIT-README.md) for comprehensive multi-repository git workflow guidance.

**Essential rules:**

1. **Always run `pwd` first** - Before EVERY file operation or git command
2. **Submodule-first workflow** - Commit and push submodules BEFORE updating pointers in main repo
3. **Use `git -C <path>`** - Avoid navigation errors
4. **Never assume location** - Multi-repository structure makes path assumptions unreliable
5. **Always use `git mv` for renaming** - NEVER use regular `mv` command to rename tracked files. Use `git mv` or `git -C <path> mv` to preserve file history

**File renaming examples:**

```bash
# ✅ CORRECT: Use git mv to preserve history
git mv old-filename.md new-filename.md

# ✅ CORRECT: Use git -C for submodules
git -C packages/dont-make-ai-think mv "old name.md" "new-name.md"

# ❌ WRONG: Regular mv breaks git tracking
mv old-filename.md new-filename.md  # Git sees this as delete + add (loses history)
```

**Common mistakes documented in LEARNINGS.md - read before starting work.**

**Git ignore patterns:**

- `books/` directory is listed in `.gitignore` but the symlinks inside are tracked (committed before the ignore pattern was added)
- The gitignore pattern prevents accidental addition of new files to `books/` while preserving existing symlinks
- Git only ignores untracked files; already-tracked files remain tracked even if matching an ignore pattern
- Each submodule has its own `.gitignore` file for managing submodule-specific ignored files (e.g., `packages/bible/.gitignore` ignores generated PNG files)

## Claude Code Configuration

**Five custom skills (`.claude/skills/`):**

1. **`/step-commit`** - Systematic commit workflow for multi-repository structure
2. **`/md-fix`** - Markdown linting and auto-fix
3. **`/news`** - Add verified industry news with strict relevance criteria
4. **`/review-docs`** - Review documents against complete writing style guide
5. **`/humanizer`** - Remove AI-generated writing patterns and inject authentic human voice

**Git hooks:**

- `pre-tool-use.sh` - Manuscript style reminders, directory navigation safety, pwd reminders
- `pre-commit.sh` - Markdown linting checks
- `pre-push.sh` - Documentation outdated warnings
- `post-tool-use.sh` - `/step-commit` workflow reminders

**See `.claude/skills/*/skill.md` for complete skill documentation.**

## Git Commit Guidelines

**CRITICAL:**

- Never add co-author attribution or "Generated with Claude Code" messages
- Keep messages clear and professional
- Focus on changes, not tools used
- Standard format: clear subject, optional body

## Cross-Project Consistency

**Shared Terminology:**

- "AI agent" (not bot/scraper)
- "served HTML" / "rendered HTML"
- "llms.txt" / "robots.txt" (lowercase)
- "WCAG 2.1" / "Pa11y" / "Schema.org"

**Authoritative Source:** Book is authoritative for all terminology, patterns, concepts. If conflict exists, update tool to match book.

## Contact Information

- Email: <tom.cranstoun@gmail.com>
- Website: <https://allabout.network>
- Author profile picture: `https://allabout.network/media_126e99d56f06caf788bee715aff92281d2e31a206.png`

## Documentation Structure

**Package-specific documentation:** Each package has complete README with contents, build commands, usage

**Key reference files:**

- `packages/bible/chapters/bible-plan.md` - Master plan
- `packages/bible/chapters/Glossary.md` - Technical glossary
- `packages/shared-appendices/appendix-f-implementation-roadmap.md` - Priority-based roadmap
- `config/book-svg-style.md` - SVG illustration style guide
- `docs/for-ai/writing-style.md` - Complete writing style guide

**Web Audit Suite:** See [packages/web-audit-suite/README.md](packages/web-audit-suite/README.md) and subdirectory docs/

## HTML Validation

**Validation tools:**

- `npx html-validate path/to/file.html` (local CLI)
- <https://validator.w3.org/> (W3C online)

**Common pitfalls:**

1. Unencoded special characters (`&` → `&amp;`)
2. Redundant ARIA roles on semantic elements
3. `aria-label` on non-interactive elements (need `role="img"` or similar)
4. Missing semantic structure (`<main>`, `<article>`, `<section>`)

**AI-Friendly HTML patterns:** See [packages/shared-appendices/appendix-d-ai-friendly-html-guide.txt](packages/shared-appendices/appendix-d-ai-friendly-html-guide.txt)

**Real-world example:** [packages/shared-appendices/web/back-cover.html](packages/shared-appendices/web/back-cover.html)

## Working with Submodules

**Initialization:**

```bash
git submodule update --init --recursive
```

**Updating to latest:**

```bash
# Update a specific submodule
git submodule update --remote packages/bible
git add packages/bible
git commit -m "Update bible submodule to latest version"

# Or update all submodules
git submodule update --remote
```

**For comprehensive submodule workflows, see [docs/repo/GIT-README.md](docs/repo/GIT-README.md).**

## Notes for Future Development

- Book manuscript: Publication-ready (v2.5.1)
- Web Audit Suite: Production-ready implementation of book's patterns
- Both projects cross-reference each other for coherent guidance
