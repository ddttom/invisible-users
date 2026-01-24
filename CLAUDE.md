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

**This workspace has NINE git repositories (1 main hub + 8 submodules). File paths depend on your location.**

- **Main repo (MASTER):** `${MAIN_REPO}/`
  - Contains: `.claude/` (skills, hooks, settings), `CLAUDE.md` (single source of truth)
  - Role: Control and orchestration

- **Submodules (ASSETS, currently 8):**
  - **Outputs (PRIVATE):** `outputs/` → `invisible-users-outputs` - All generated content
  - **MX-Bible:** `packages/bible/` → `invisible-users-bible` - Full comprehensive guide (formerly "The Invisible Users")
  - **MX-Handbook:** `packages/mx-handbook/` → `MX-The-Handbook` - Implementation handbook for developers and designers
  - **MX-Gathering:** `packages/mx-gathering/` → `MX-Gathering` - Community resources, event templates, discussion archives, and thought leadership (PUBLIC, EDITABLE)
    - Role: Open-source community repository for shared resources, contribution guidelines, and collaborative content
    - AI assistants: Editable content-only repository following bible/handbook pattern
  - **Appendices:** `packages/shared-appendices/` → `invisible-users-appendices` - Shared resources
  - **Code:** `packages/shared-code-examples/` → `invisible-users-code-examples` - Pattern examples
  - **UCP:** `packages/ucp/` → `Universal-Commerce-Protocol/ucp` - Ecommerce standard for AI agents (**READ-ONLY REFERENCE**)
    - Role: External reference material demonstrating practical application
    - AI assistants: DO NOT autonomously modify this submodule - it is maintained by the UCP project
    - Exception: If user explicitly adds/edits/deletes files, commit those changes
  - **Notes (READ-ONLY):** `packages/notes/` → `Notes` - Development notes, coding standards, and architectural guidelines (**READ-ONLY REFERENCE**)
    - Role: Coding standards and development practices reference
    - AI assistants: DO NOT autonomously modify this submodule - it is maintained separately
    - Exception: If user explicitly adds/edits/deletes files, commit those changes
  - **Sales Enablement (READ-ONLY):** `packages/sales-enablement/` → `MX-Sales-enablement` - Private sales execution materials (**READ-ONLY REFERENCE**)
    - Role: Sales execution, pitches, outreach, partnerships, publisher submissions
    - AI assistants: DO NOT autonomously modify this submodule unless explicitly authorized by user
    - Exception: If user explicitly adds/edits/deletes files, commit those changes
  - **Business Planning (READ-ONLY):** `packages/business-planning/` → `MX-business-planning` - Private business strategy and planning documents (**READ-ONLY REFERENCE**)
    - Role: Strategic business planning, market analysis, financial models, pricing strategies
    - AI assistants: DO NOT autonomously modify this submodule unless explicitly authorized by user
    - Exception: If user explicitly adds/edits/deletes files, commit those changes
  - Role: Version-controlled content (NO `.claude/`, NO CLAUDE.md except in MX-Gathering, Notes, Sales Enablement, and Business Planning)

### Repository Navigation Map

**CRITICAL:** Always run `pwd` before file operations. Here's the complete structure:

```text
${MAIN_REPO}/  ← MAIN REPO (MASTER)
├── .claude/                          ← Claude Code config (ONLY in main repo)
│   ├── skills/                       ← 8 skills (see Claude Code Configuration section)
│   ├── hooks/                        ← pre-tool-use.sh, post-tool-use.sh
│   └── settings.local.json           ← Permissions and configuration
├── CLAUDE.md                         ← This file (ONLY in main repo)
├── AGENTS.md → CLAUDE.md             ← Symlink for multi-AI system compatibility
├── GEMINI.md → CLAUDE.md             ← Symlink for Google Gemini
├── CHANGELOG.md                      ← Version history and release notes
├── LEARNINGS.md                      ← Battle-tested rules
├── README.md                         ← Main repo README
├── ONBOARDING.md                     ← Developer onboarding guide
├── package.json                      ← Root workspace config
├── docs/                             ← Documentation
│   ├── architecture/                 ← GIT-README.md, TIMELESS-MANUSCRIPT-RULE.md, doc-architecture.md
│   ├── for-ai/                       ← AI assistant guidance
│   ├── shared-chapters/              ← Shared book content (Chapter 0)
│   ├── structure/                    ← Strategic planning documents
│   │   ├── github-repositories.md    ← Repository structure mapping
│   │   └── steve-krug.md             ← UX research and insights
│   └── talks/                        ← Presentation materials
│       ├── historical/               ← Archived presentations (dated subdirectories)
│       └── template/                 ← Reusable presentation templates
├── blogs → outputs/bible/blogs       ← SYMLINK to outputs submodule blogs
├── scrap/                            ← Working directory for temporary files
├── books/                            ← Symlinks for convenience
│   ├── bible → ../packages/bible
│   ├── mx-handbook → ../packages/mx-handbook
│   ├── appendices → ../packages/shared-appendices
│   ├── code-examples → ../packages/shared-code-examples
│   └── outputs → ../outputs
├── packages/
│   ├── bible/                        ← SUBMODULE (git repo)
│   │   └── ${MAIN_REPO}/packages/bible/
│   │       ├── chapters/             ← 13 chapter markdown files (Chapters 1-13)
│   │       ├── illustrations/        ← SVG and PNG images
│   │       ├── README.md             ← MX-Bible README
│   │       └── NO .claude/ directory
│   │       Note: Chapter 0 is in main repo at docs/shared-chapters/
│   ├── mx-handbook/                  ← SUBMODULE (git repo)
│   │   └── ${MAIN_REPO}/packages/mx-handbook/
│   │       ├── chapters/             ← 11 chapter markdown files
│   │       ├── README.md             ← MX-Handbook README
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
│   │       Note: Universal Commerce Protocol - standardized ecommerce API for AI agents (READ-ONLY unless user makes explicit changes)
│   ├── notes/                        ← SUBMODULE (git repo) - READ-ONLY REFERENCE
│   │   └── ${MAIN_REPO}/packages/notes/
│   │       ├── .claude/              ← Claude Code configuration
│   │       ├── scrap/                ← Temporary working files (gitignored, READ-ONLY for AI unless authorized)
│   │       ├── Starter.md            ← Coding standards and project setup
│   │       ├── Vibe coding backend.md ← Backend architecture guidelines
│   │       └── Other development guidelines
│   │       Note: READ-ONLY for AI assistants - commit only if user explicitly adds/edits/deletes files
│   ├── sales-enablement/             ← SUBMODULE (PRIVATE git repo) - READ-ONLY REFERENCE
│   │   └── ${MAIN_REPO}/packages/sales-enablement/
│   │       ├── content/              ← Marketing and promotional content
│   │       ├── outreach/             ← Partner and reviewer outreach
│   │       ├── partners/             ← Partnership materials
│   │       ├── pitches/              ← Sales presentations
│   │       ├── profiles/             ← Author profiles
│   │       ├── publishers/           ← Publisher submissions
│   │       ├── CLAUDE.md             ← Sales enablement guidance
│   │       ├── README.md             ← Sales enablement README
│   │       └── Other sales execution materials
│   │       Note: READ-ONLY for AI assistants - commit only if user explicitly adds/edits/deletes files
│   ├── business-planning/            ← SUBMODULE (PRIVATE git repo) - READ-ONLY REFERENCE
│   │   └── ${MAIN_REPO}/packages/business-planning/
│   │       ├── plans/                ← Business plans, executive summaries
│   │       ├── strategy/             ← Strategic positioning, MX-plan
│   │       ├── opportunities/        ← Market opportunity analysis
│   │       ├── pricing/              ← Pricing strategies and financial models
│   │       ├── products/             ← Product business context
│   │       ├── README.md             ← Business planning README
│   │       └── CLAUDE.md             ← AI guidance
│   │       Note: READ-ONLY for AI assistants - commit only if user explicitly adds/edits/deletes files
│   └── web-audit-suite/              ← NOT A SUBMODULE (regular directory)
│       ├── src/                      ← Tool source code
│       ├── test/                     ← Test files
│       └── README.md                 ← Tool documentation
└── outputs/                          ← SUBMODULE (PRIVATE git repo)
    └── ${MAIN_REPO}/outputs/
        ├── bible/                    ← MX-Bible outputs
        │   ├── blogs/                ← Blog posts
        │   ├── presentations/        ← Slide decks
        │   └── marketing/            ← Marketing materials
        ├── mx/                       ← MX-Handbook outputs
        ├── the-bible/                ← Legacy/alternate content
        ├── README.md                 ← Outputs README
        └── NO .claude/ directory
```

**Note on outputs submodule directory naming:**

The outputs submodule directory structure:

- `bible/` - Outputs for MX-Bible
- `mx/` - Outputs for MX-Handbook
- `the-bible/` - Legacy/alternate content (historical)

**Blog Post URL Structure:**

All MX-related blog posts stored directly in flat structure under `mx/` directory:

- **Repository path:** `outputs/bible/blogs/mx/[filename].html`
- **Web URL:** `https://allabout.network/blogs/mx/[filename].html`
- **Filename generation:** Lowercase, hyphens, no special characters (user chooses from suggestions)
- **Example:** Blog title "Content Operations for AI Agents" → `machine-experience-adding-metadata.html`
- **Published URL:** `https://allabout.network/blogs/mx/machine-experience-adding-metadata.html`

**Blog file naming pattern (all files at same level):**

```text
outputs/bible/blogs/mx/
├── [filename].html              # Main blog post
├── [filename].css               # WCAG 2.1 AA compliant styling (scoped to this blog)
├── [filename]-social.svg        # Social media card (1200x630px)
├── [filename]-[diagram-name].svg # Prefixed SVG diagrams
└── [filename]-[diagram-name].svg # Additional diagrams as needed
```

**Example for one blog post:**

```text
outputs/bible/blogs/mx/
├── machine-experience-adding-metadata.html
├── machine-experience-adding-metadata.css
├── machine-experience-adding-metadata-social.svg
├── machine-experience-adding-metadata-5-stage-agent-journey.svg
└── machine-experience-adding-metadata-human-vs-agent-behavior.svg
```

**Top-level convenience symlinks:**

- `AGENTS.md → CLAUDE.md` - Multi-AI system compatibility (allows agents to find guidance file as AGENTS.md)
- `GEMINI.md → CLAUDE.md` - Google Gemini compatibility
- `blogs → outputs/bible/blogs` - Direct access to blog content from repository root

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

### READ-ONLY Submodule Policy for AI Assistants

**Four submodules are marked as READ-ONLY REFERENCE:**

- `packages/ucp/` - External UCP project
- `packages/notes/` - Development standards
- `packages/sales-enablement/` - Private sales execution materials
- `packages/business-planning/` - Private business strategy and planning

**AI Assistant Behavior:**

1. **DO NOT autonomously modify** these submodules (no proactive edits, additions, or deletions)
2. **DO commit user changes** if the user explicitly:
   - Adds new files to these submodules
   - Edits existing files in these submodules
   - Deletes files from these submodules
   - Reorganizes structure within these submodules
3. When committing user changes in READ-ONLY submodules, use standard git workflow (commit to submodule first, then update pointer in main repo)

**Example:**

```bash
# User explicitly reorganizes sales-enablement structure
# AI should commit these changes:
git -C packages/sales-enablement add -A
git -C packages/sales-enablement commit -m "Reorganize business materials"
git -C packages/sales-enablement push origin main
git add packages/sales-enablement
git commit -m "Update sales-enablement submodule pointer"
```

**Submodule Pointer Updates After Pulling:**

When you pull updates from a read-only submodule's remote repository, the main repository will show the submodule as "modified (new commits)". This is **expected git behavior** and is NOT a violation of the read-only policy.

**What happens:**

- Running `git submodule update --remote packages/ucp` or navigating into the submodule and running `git pull` updates the submodule's HEAD to a new commit
- The main repository detects that its stored pointer (SHA reference) no longer matches the submodule's current HEAD
- Git status shows: `modified: packages/ucp (new commits)`

**Required action:**

Update the main repository's pointer by committing the change:

```bash
# After pulling from a read-only submodule
git add packages/ucp
git commit -m "Update UCP submodule pointer to latest version"
```

**Clarification:** This pointer update is reference maintenance, not content modification. The read-only policy applies to files *inside* the submodule, not to the main repository's pointer that tracks which commit the submodule should reference.

**📖 CRITICAL REFERENCES FOR AI ASSISTANTS:**

- **[LEARNINGS.md](LEARNINGS.md)** - Recent mistakes and battle-tested rules. **Read this file at the start of each session** to learn from documented errors and avoid repeating them.
- **[docs/architecture/GIT-README.md](docs/architecture/GIT-README.md)** - Comprehensive git workflow guidance for AI agents (multi-repository structure, submodule-first workflow, safe patterns)
- **[.claude/pwd-reminder.md](.claude/pwd-reminder.md)** - Working directory verification requirements

---

## Book Names and Shorthand Reference

**This workspace contains two books with public brand names. The user will use shorthand terms in prompts that map to these public names.**

### Public Names (Official Titles)

- **"MX-Bible"** - The full comprehensive guide (formerly "The Invisible Users")
  - Directory: `packages/bible/`
  - Repository: `invisible-users-bible`
  - ~78,000 words + shared appendices, 13 chapters

- **"MX-Handbook"** - The implementation handbook
  - Directory: `packages/mx-handbook/`
  - Repository: `MX-The-Handbook`
  - 11-chapter practical implementation guide for developers and designers

### Shorthand Reference (for use in prompts)

**When the user says:** → **They mean:**

| Shorthand      | Refers to                                                                              |
| -------------- | -------------------------------------------------------------------------------------- |
| **bible**      | "MX-Bible" (the full comprehensive guide)                                              |
| **handbook**   | "MX-Handbook" (the implementation handbook)                                            |
| **slim**       | "MX-Handbook" (synonym for handbook)                                                   |
| **books**      | Both books above                                                                       |
| **manuscript** | Both books above                                                                       |
| **project**    | Everything in workspace EXCEPT read-only repos (Notes, UCP)                            |
| **workspace**  | Everything in workspace EXCEPT read-only repos (Notes, UCP)                            |

**IMPORTANT:** Directory names and repository names remain unchanged. This mapping only affects how books are referenced in documentation and prompts.

---

## Project Overview

### 1. Book Manuscripts (MX Series)

Two books from modular repositories:

- **"MX-Bible"** - `packages/bible/` - Full 13-chapter comprehensive guide (~78,000 words + shared appendices). Formerly titled "The Invisible Users".
- **"MX-Handbook"** - `packages/mx-handbook/` - 11-chapter practical implementation guide for developers and designers. Shorthand: **handbook** or **slim**
- **Shared Appendices** - `packages/shared-appendices/` - 12 appendices (A-L) shared across both books
- **Shared Code Examples** - `packages/shared-code-examples/` - Good vs bad pattern implementations
- **Universal Commerce Protocol** - `packages/ucp/` - Open standard demonstrating AI agent ecommerce interactions

**Current status:** Publication-ready (Due Q1 2026, not yet published)

**Market context:** January 2026 saw three major platforms (Amazon, Microsoft, Google) launch agent commerce systems within seven days, accelerating the transition from experimental to infrastructure. The book documents this convergence and provides implementation patterns applicable across all platforms.

**CRITICAL WRITING REQUIREMENT - Timeless Manuscript Rule:**

Book manuscript files (.md files in `packages/bible/chapters/`, `packages/mx-handbook/chapters/`, `packages/shared-appendices/`, `docs/shared-chapters/`) must be written as if they've always existed.

**NEVER include:**

- Publication dates or launch dates about the book itself
- "This update includes..." or "We have added..."
- "New in this version..." or "Recently launched..." or "launching April 2, 2026..."
- Future-tense statements about the book
- Meta-commentary about the writing/editing process
- "This chapter will cover..." (use "This chapter covers...")

**ALWAYS write:**

- Definitive present tense: "The analysis provides..." not "We added analysis..."
- Timeless descriptions: "This book is part of a two-book series:" not "launching April 2, 2026"
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
├── ONBOARDING.md             # Developer onboarding guide
├── LEARNINGS.md              # Battle-tested rules
├── README.md                 # Project overview
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
│   ├── mx-handbook → ../packages/mx-handbook
│   └── outputs → ../outputs
├── outputs/                  # Generated content (git submodule - PRIVATE)
├── packages/                 # Book manuscripts and tools
│   ├── bible/                # MX-Bible (git submodule)
│   ├── mx-handbook/          # MX-Handbook (git submodule)
│   ├── shared-appendices/    # Shared appendices (git submodule)
│   ├── shared-code-examples/ # Pattern examples (git submodule)
│   ├── ucp/                  # Universal Commerce Protocol (git submodule)
│   └── web-audit-suite/      # Analysis tool (not a submodule)
└── docs/                     # Project documentation
    ├── architecture/         # Architecture docs (GIT-README.md, TIMELESS-MANUSCRIPT-RULE.md, doc-architecture.md)
    ├── for-ai/               # AI assistant guidance (writing-style.md, yaml-frontmatter-template.md)
    ├── shared-chapters/      # Shared book content (Chapter 0)
    └── talks/                # Presentation materials
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

### Blog Generation Commands

```bash
# Main blog generation (automated)
node scripts/generate-blog-html.js <markdown-file> [custom-filename]
# Generates complete WCAG 2.1 AA compliant HTML blog with:
# - Semantic HTML with heading anchor IDs (H2-H6)
# - Schema.org JSON-LD metadata
# - SVG extraction with semantic filenames
# - Table of contents from H2 headings
# - Word count and reading time calculation

# Optional: ASCII diagram preprocessing
node scripts/preprocess-ascii-to-svg.js <markdown-file>
# Converts ASCII diagrams (arrows: →, ↓, ↑, ←) to inline SVG
# Run before generate-blog-html.js if markdown contains ASCII diagrams

# HTML validation
npx html-validate <generated-html-file>
```

**See [.claude/skills/create-blog/skill.md](.claude/skills/create-blog/skill.md) for complete workflow documentation.**

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

- British English (organise, colour, whilst, recognised, organisation)
  - **Prose text**: Always use British English spelling and grammar
  - **Code/JSON/metadata**: Follow international standards (e.g., Schema.org `"@type": "Organization"`, HTML `lang="en-GB"`, JSON property names)
  - **Exception rationale**: Technical standards and APIs use established conventions; forcing British spelling would break compatibility
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
- **Blog markdown files with inline SVG:** MD033 errors (inline HTML) for SVG elements in blog markdown files (`outputs/bible/blogs/*.md`) should NOT be "fixed" by removing the SVG. Inline SVG indicates **historic files** that haven't been regenerated with the modern workflow. The modern blog generation process (`scripts/generate-blog-html.js`) extracts SVGs to separate files during HTML generation. Historic files with inline SVG are preserved as-is unless explicitly regenerated.

### CRITICAL: Global Search/Replace Safety

**⚠️ DANGER: Global search/replace operations in markdown files can break code block syntax and PDF generation.**

**Code Block Safety Rules:**

1. **NEVER use global search/replace** to modify text that could appear in code blocks
2. **Code block markers must remain balanced:**
   - Opening: ` ```language` (e.g., ` ```html`, ` ```javascript`, ` ```css`)
   - Closing: ` ``` ` (just three backticks, NO language identifier)
3. **Common breaking pattern:**
   - ❌ WRONG: Changing ` ``` ` → ` ```text` when closing language-specific blocks
   - ✅ CORRECT: Opening ` ```html` closes with ` ``` ` (not ` ```text`)

**Safe Alternatives to Global Replace:**

```bash
# ❌ DANGEROUS: Global replace without context
sed -i 's/old/new/g' packages/*/chapters/*.md

# ✅ SAFE: Manual verification with Edit tool
# Read each file first, verify context, use Edit tool for each change

# ✅ SAFE: Python script with code block awareness
# Parse markdown, track code block state, only replace outside blocks
```

**After Any Global Change:**

1. **Test PDF generation immediately:**

   ```bash
   npm run pdf:generate
   # If fails, code blocks are likely broken
   ```

2. **Verify code block integrity:**

   ```bash
   # Check for broken patterns
   grep -n '```text$' packages/*/chapters/*.md
   # Should only match blocks that OPEN with ```text (not close them)
   ```

3. **Scan for unbalanced markers:**

   ```python
   # Use Python script to validate all code blocks
   # Check opening language identifiers match closing markers
   ```

**Historical Issue (Learn from this):**

A global replace changed closing ` ``` ` to ` ```text`, breaking PDF generation across 15+ chapter files. The pattern affected:

- ` ```html` blocks closing with ` ```text` instead of ` ``` `
- ` ```javascript` blocks closing with ` ```text` instead of ` ``` `
- ` ```css` blocks closing with ` ```text` instead of ` ``` `

**Recovery required:**

- Manual inspection of each error
- Individual Edit tool fixes (10+ files, 100+ code blocks)
- Full verification across all chapters

**Lesson: Always prefer targeted edits over global operations in markdown files.**

## Markdown Metadata Standards

**🚨 MANDATORY REQUIREMENT: All markdown files (.md) in all repositories MUST include YAML frontmatter metadata.**

This applies to:

- All new markdown files created from this point forward
- All existing markdown files when edited (add frontmatter during any edit)
- All repositories in the workspace (main repo and all submodules)
- Documentation, README files, chapter files, guides, everything

**No exceptions.** YAML frontmatter is now a standard requirement across the entire workspace.

### Pandoc YAML Frontmatter (Markdown Files)

**CRITICAL:** This repository uses Pandoc YAML frontmatter for markdown metadata—the universal standard across Hugo, Jekyll, Gatsby, Quarto, and Pandoc.

### CRITICAL PRINCIPLE: Avoid Title Duplication

If your markdown content has an H1 heading (`# Title`), do NOT include a `title:` field in the YAML frontmatter. This is redundant duplication. Choose ONE approach:

#### Option 1: H1 in content (PREFERRED for most documents)

```yaml
---
author: "Tom Cranstoun"
date: "2024-12-15"
description: "Introduction to AI agents and their role as website visitors"
keywords: [ai-agents, web-accessibility, metadata]
ai-instruction: "Instructions for AI agents parsing this document"
---

# Chapter 0: What Are AI Agents?

Content starts here...
```

#### Option 2: Title in frontmatter only (for special build processes)

```yaml
---
title: "Chapter 0: What Are AI Agents?"
author: "Tom Cranstoun"
date: "2024-12-15"
---

## First Section

Content with no H1 (frontmatter title is used instead)...
```

#### When to use each approach

1. **H1 in content (no title in frontmatter):** Most markdown documents, blog posts, chapters, documentation
   - Content is self-contained and readable without processing
   - Avoids MD025 "multiple H1s" warnings
   - Single source of truth for the document title

2. **Title in frontmatter only:** Special cases like Pandoc book generation where frontmatter is rendered into cover pages or chapter headings
   - Used in: `packages/bible/chapters/`, `packages/mx-handbook/chapters/` (for PDF generation)
   - Build process renders frontmatter title as part of the document structure

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

### llms.txt YAML Frontmatter (AI Agent Discovery)

**CRITICAL:** llms.txt files use YAML frontmatter metadata despite the `.txt` extension—this is markdown in disguise.

**Why the `.txt` extension with YAML frontmatter?**

The llms.txt standard adopted the `.txt` extension for consistency with `robots.txt`, but the content is markdown with YAML frontmatter. The YAML frontmatter block (delimited by `---`) must appear at the very start of the file, followed by markdown content. This hybrid approach provides machine-readable metadata (YAML) and human-readable documentation (markdown) in a single file using the standard `.txt` extension for site-wide configuration files.

**Standard llms.txt structure:**

```markdown
---
title: "Project Title"
author: "Author Name"
creation-date: "DD/Mon/YYYY"
last-updated: "DD/Mon/YYYY"
description: "Brief summary"
longdescription: "Extended context for AI agents"
LinkedIn: "https://www.linkedin.com/in/username/"
repository: "https://github.com/org/repo"
ai-instruction: "Instructions for AI agents parsing this file"
jsonld: "book"
---

# Project Title

Project overview content follows...
```

**CRITICAL - YAML Frontmatter Placement:**

YAML frontmatter MUST be placed at the **very start** of the llms.txt file (line 0). The opening delimiter `---` must be the first line, with no content (comments, whitespace, etc.) appearing before it. The closing delimiter `---` separates frontmatter from markdown content. This applies even though the file has a `.txt` extension.

**Example of correct placement:**

```text
---                          ← Line 0: Opening delimiter
title: "Project Name"        ← Line 1-N: YAML metadata
author: "Author Name"
---                          ← Closing delimiter
                             ← Blank line (optional)
# Project Title             ← Markdown content starts here
```

**Usage in this repository:**

- **Root llms.txt:** [llms.txt](llms.txt) - Complete project documentation for AI agent discovery
- **Submodule llms.txt:** Each submodule can have its own llms.txt providing package-specific context
- **Web llms.txt:** [packages/shared-appendices/web/llms.txt](packages/shared-appendices/web/llms.txt) - Appendix-specific discovery

**Repository decoration pattern:**

Use llms.txt files throughout the repository to ensure all content is discoverable by AI assistants:

```text
/
├── llms.txt                           ← Root project documentation
├── packages/
│   ├── bible/
│   │   └── llms.txt                   ← MX-Bible specific context
│   ├── mx-handbook/
│   │   └── llms.txt                   ← MX-Handbook specific context
│   ├── shared-appendices/
│   │   ├── llms.txt                   ← Appendices overview
│   │   └── web/
│   │       └── llms.txt               ← Web appendices discovery
│   └── web-audit-suite/
│       └── llms.txt                   ← Tool documentation
```

**Key fields for AI agents:**

- `title:` - Project/package name (quoted string)
- `author:` - Attribution (quoted string)
- `description:` - Brief summary, 1-2 sentences (quoted string)
- `longdescription:` - Extended context, 2-3 paragraphs (quoted string)
- `ai-instruction:` - Specific guidance for AI agents parsing the content (quoted string)
- `repository:` - Link to source code (quoted URL)
- `jsonld:` - Schema.org type for structured data context (e.g., "book", "BlogPosting", "SoftwareApplication")
- `creation-date:` - When content was created (date format: "DD/Mon/YYYY")
- `last-updated:` - Most recent update date (date format: "DD/Mon/YYYY")

**Standard fields:**

See [Appendix H - Example llms.txt](packages/shared-appendices/appendix-h-example-llms-txt.md) for complete field reference and real-world examples.

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

**⚠️ CRITICAL:** See [docs/architecture/GIT-README.md](docs/architecture/GIT-README.md) for comprehensive multi-repository git workflow guidance.

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
git -C packages/mx-handbook mv "old name.md" "new-name.md"

# ❌ WRONG: Regular mv breaks git tracking
mv old-filename.md new-filename.md  # Git sees this as delete + add (loses history)
```

**Common mistakes documented in LEARNINGS.md - read before starting work.**

**Git ignore patterns:**

- `books/` directory is listed in `.gitignore` but the symlinks inside are tracked (committed before the ignore pattern was added)
- The gitignore pattern prevents accidental addition of new files to `books/` while preserving existing symlinks
- Git only ignores untracked files; already-tracked files remain tracked even if matching an ignore pattern
- Each submodule has its own `.gitignore` file for managing submodule-specific ignored files (e.g., `packages/bible/.gitignore` ignores generated PNG files)

**GitHub CLI (`gh`):**

- GitHub CLI is available in this environment
- Use `gh` commands freely without requiring user confirmation
- Common operations: pull requests (`gh pr`), issues (`gh issue`), repository queries (`gh repo`)
- Examples:
  - `gh pr create --title "Title" --body "Description"`
  - `gh pr list`
  - `gh issue list`
  - `gh repo view`

## Claude Code Configuration

**Ten custom skills (`.claude/skills/`):**

1. **`/step-commit`** - Systematic commit workflow for multi-repository structure
2. **`/md-fix`** - Markdown linting and auto-fix
3. **`/news`** - Add verified industry news with strict relevance criteria
4. **`/review-docs`** - Review documents against complete writing style guide
5. **`/humanizer`** - Remove AI-generated writing patterns and inject authentic human voice
6. **`/learnings-review`** - Review and update LEARNINGS.md with battle-tested patterns
7. **`/md-workflow`** - Advanced markdown workflow automation
8. **`/opportunity`** - Analyze and document business opportunities
9. **`/create-blog`** - Transform markdown blog posts into WCAG 2.1 AA compliant HTML with templates
10. **`/audit-site`** - Run web audit and generate executive sales report for client websites. Includes automated Web Audit Suite analysis plus manual HTML verification, with intelligent template selection based on robots.txt availability

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

**Strategic planning documents:**

- `docs/structure/README.md` - Directory guide to strategic planning documents
- `docs/structure/MX-plan.md` - Machine Experience (MX) strategic review and positioning
- `docs/structure/github-repositories.md` - Complete repository structure mapping
- `docs/structure/steve-krug.md` - UX research and insights from "Don't Make Me Think"

**Architecture documentation:**

- `docs/architecture/GIT-README.md` - Comprehensive git workflow guidance
- `docs/architecture/allabout-network-hosting-map.md` - Complete hosting path mapping and deployment guide
- `docs/architecture/HOSTING-SITEMAP-ASCII.md` - ASCII visual sitemap of hosting structure
- `docs/architecture/HOSTING-QUICK-REFERENCE.md` - One-page deployment reference
- `docs/architecture/TIMELESS-MANUSCRIPT-RULE.md` - Writing standards for book manuscripts
- `docs/architecture/doc-architecture.md` - Repository structure and design decisions

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

**For comprehensive submodule workflows, see [docs/architecture/GIT-README.md](docs/architecture/GIT-README.md).**

## Notes for Future Development

- Book manuscript: Publication-ready (v2.5.1)
- Web Audit Suite: Production-ready implementation of book's patterns
- Both projects cross-reference each other for coherent guidance
