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
# You ran: cd packages/mx-the-bible && git add -A
# Error: "No such file or directory"
# Why: You were already inside packages/mx-outputs/ submodule
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
# If output: ${MAIN_REPO}/packages/mx-outputs
#   → You're in OUTPUTS SUBMODULE - use ../../.claude/skills/news/skill.md
# If output: ${MAIN_REPO}/packages/mx-the-bible
#   → You're in BIBLE SUBMODULE - use ../../.claude/skills/news/skill.md
```

### Repository Architecture

**This workspace has multiple git repositories (main hub + submodules). File paths depend on your location.**

- **Main repo (MASTER):** `${MAIN_REPO}/`
  - Contains: `.claude/` (skills, hooks, settings), `CLAUDE.md` (single source of truth)
  - Role: Control and orchestration

- **Submodules (ASSETS):**
  - **MX-Bible:** `packages/mx-the-bible/` → `invisible-users-manuscript` - Full comprehensive guide (formerly "The Invisible Users")
  - **MX-Handbook:** `packages/mx-handbook/` → `MX-The-Handbook` - Implementation handbook for developers and designers
  - **MX-Gathering:** `packages/mx-gathering/` → `MX-Gathering` - Community resources, event templates, discussion archives, and thought leadership (PUBLIC, EDITABLE)
    - Role: Open-source community repository for shared resources, contribution guidelines, and collaborative content
    - AI assistants: Editable content-only repository following bible/handbook pattern
  - **Appendices:** `packages/mx-appendices/` → `invisible-users-appendices` - Shared resources
  - **Code Examples:** `packages/mx-code-examples/` → `invisible-users-code-examples` - Pattern examples
  - **Outputs (PRIVATE):** `packages/mx-outputs/` → `invisible-users-outputs` - All generated content
  - **UCP (External Reference):** `packages/external/ucp/` → `Universal-Commerce-Protocol/ucp` - Universal Commerce Protocol standard
  - **Business Planning:** `packages/business/mx-business/` → `MX-business-planning` - Private business strategy and planning
  - **Sales Enablement:** `packages/business/mx-sales-enablement/` → `MX-Sales-enablement` - Sales and marketing resources (PRIVATE)
  - **Development Notes:** `packages/notes/` → `Notes` - Coding standards and development practices
  - Role: Version-controlled content (NO `.claude/`, NO CLAUDE.md except in MX-Gathering and Notes)

### Repository Navigation Map

**CRITICAL:** Always run `pwd` before file operations.

**📁 For complete folder structure:** See [config/system/folder-layout.md](config/system/folder-layout.md) - Single source of truth for repository structure across main repo and all submodules.

**Hub Repository Quick Reference:**

- **Main repo:** Controls and orchestrates the entire workspace
  - Contains: `.claude/` (skills, hooks, settings), `CLAUDE.md`, documentation, scripts
  - Role: Configuration hub, git workflow management, build tools

- **Submodules under packages/:**
  - `mx-the-bible/` - MX-Bible manuscript
  - `mx-handbook/` - MX-Handbook
  - `mx-gathering/` - Community resources (PUBLIC, EDITABLE)
  - `mx-appendices/` - Shared appendices (A-M)
  - `mx-code-examples/` - Pattern implementations
  - `mx-outputs/` - Generated content (PRIVATE)
  - `external/ucp/` - Universal Commerce Protocol reference
  - `business/mx-business/` - Business planning (PRIVATE)
  - `business/mx-sales-enablement/` - Sales enablement resources (PRIVATE)
  - `notes/` - Development practices

**Quick Navigation Paths:**

```text
Main repo root:     /Users/tomcranstoun/Documents/GitHub/invisible-users/
.claude/ config:    .claude/skills/, .claude/hooks/
Documentation:      docs/architecture/, docs/for-ai/, docs/structure/
Scripts:            scripts/
Submodules:         packages/[submodule-name]/
```

**Note on outputs submodule directory naming:**

The outputs submodule directory structure:

- `bible/` - Outputs for MX-Bible
- `mx/` - Outputs for MX-Handbook
- `the-bible/` - Legacy/alternate content (historical)

**Blog Post URL Structure:**

All MX-related blog posts stored directly in flat structure under `mx/` directory:

- **Repository path:** `packages/mx-outputs/bible/blogs/mx/[filename].html`
- **Web URL:** `https://allabout.network/blogs/mx/[filename].html`
- **Filename generation:** Lowercase, hyphens, no special characters (user chooses from suggestions)
- **Example:** Blog title "Content Operations for AI Agents" → `machine-experience-adding-metadata.html`
- **Published URL:** `https://allabout.network/blogs/mx/machine-experience-adding-metadata.html`

**Blog file naming pattern (all files at same level):**

```text
packages/mx-outputs/bible/blogs/mx/
├── [filename].html              # Main blog post
├── [filename].css               # WCAG 2.1 AA compliant styling (scoped to this blog)
├── [filename]-social.svg        # Social media card (1200x630px)
├── [filename]-[diagram-name].svg # Prefixed SVG diagrams
└── [filename]-[diagram-name].svg # Additional diagrams as needed
```

**Example for one blog post:**

```text
packages/mx-outputs/bible/blogs/mx/
├── machine-experience-adding-metadata.html
├── machine-experience-adding-metadata.css
├── machine-experience-adding-metadata-social.svg
├── machine-experience-adding-metadata-5-stage-agent-journey.svg
└── machine-experience-adding-metadata-human-vs-agent-behavior.svg
```

**Top-level convenience symlinks:**

- `AGENTS.md → CLAUDE.md` - Multi-AI system compatibility (allows agents to find guidance file as AGENTS.md)
- `GEMINI.md → CLAUDE.md` - Google Gemini compatibility
- `blogs → packages/mx-outputs/bible/blogs` - Direct access to blog content from repository root

**Key navigation rules:**

1. **Accessing .claude/ files:**
   - ✅ FROM MAIN: `.claude/skills/news/skill.md`
   - ✅ FROM SUBMODULE: `../../.claude/skills/news/skill.md`
   - ❌ NEVER: `cd packages/mx-the-bible && .claude/` (main .claude/ is at repo root, submodules have their own)

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

**Note:** Currently, all submodules in the packages/ directory are content repositories that can be edited. The READ-ONLY policy applies to external reference submodules only if they are added in the future.

**AI Assistant Behavior for future READ-ONLY submodules:**

1. **DO NOT autonomously modify** READ-ONLY submodules (no proactive edits, additions, or deletions)
2. **DO commit user changes** if the user explicitly:
   - Adds new files to these submodules
   - Edits existing files in these submodules
   - Deletes files from these submodules
   - Reorganizes structure within these submodules
3. When committing user changes in READ-ONLY submodules, use standard git workflow (commit to submodule first, then update pointer in main repo)

**Submodule Pointer Updates After Pulling:**

When you pull updates from a read-only submodule's remote repository, the main repository will show the submodule as "modified (new commits)". This is **expected git behavior** and is NOT a violation of the read-only policy.

**What happens:**

- Running `git submodule update --remote packages/mx-the-bible` or navigating into the submodule and running `git pull` updates the submodule's HEAD to a new commit
- The main repository detects that its stored pointer (SHA reference) no longer matches the submodule's current HEAD
- Git status shows: `modified: packages/mx-the-bible (new commits)`

**Required action:**

Update the main repository's pointer by committing the change:

```bash
# After pulling from a submodule
git add packages/mx-the-bible
git commit -m "Update mx-the-bible submodule pointer to latest version"
```

**Clarification:** This pointer update is reference maintenance, not content modification. The read-only policy applies to files *inside* the submodule, not to the main repository's pointer that tracks which commit the submodule should reference.

**📖 CRITICAL REFERENCES FOR AI ASSISTANTS:**

- **[LEARNINGS.md](LEARNINGS.md)** - Recent mistakes and battle-tested rules. **Read this file at the start of each session** to learn from documented errors and avoid repeating them.
- **[config/system/GIT-README.md](config/system/GIT-README.md)** - Comprehensive git workflow guidance for AI agents (multi-repository structure, submodule-first workflow, safe patterns)
- **[.claude/pwd-reminder.md](.claude/pwd-reminder.md)** - Working directory verification requirements

---

## Conversational Vocabulary & Shorthand Reference

**🔄 DYNAMIC REFERENCE: The user uses conversational shorthand to communicate efficiently. When you encounter unfamiliar shorthand or need to understand context-specific terminology, CONSULT the vocabulary reference file.**

**Reference file:** [config/system/repo-vocabulary.md](config/system/repo-vocabulary.md)

**This file contains:**

- Repository shorthand ("main repo", "outputs", "bible", "handbook", "gathering")
- File path abbreviations ("blogs", "structure", "appendices")
- Workflow terms ("step commit", "create blog", "submodule-first")
- Technical concepts ("served HTML", "convergence principle", "UCP")
- Common conversational patterns and usage examples

**Usage pattern:**

1. User says: "Add this to bible chapter 5"
2. If unclear, consult vocabulary.md to understand "bible" → `packages/mx-the-bible/manuscripts/`
3. Proceed with full context

**Key official names (always use these in formal documentation):**

- **"MX-Bible"** - The full comprehensive guide
- **"MX-Handbook"** - The implementation handbook
- **"MX-Gathering"** - Community resources repository

**IMPORTANT:** Directory names and repository names remain unchanged. The vocabulary file maps conversational shorthand to actual paths and concepts for efficient communication.

---

## Project Overview

### 1. Book Manuscripts (MX Series)

Two books from modular repositories:

- **"MX-Bible"** - `packages/mx-the-bible/` - Full comprehensive guide. Formerly titled "The Invisible Users".
- **"MX-Handbook"** - `packages/mx-handbook/` - Practical implementation guide for developers and designers. Shorthand: **handbook** or **slim**
- **Shared Appendices** - `packages/mx-appendices/` - 12 appendices (A-M) shared across both books
- **Shared Code Examples** - `packages/mx-code-examples/` - Good vs bad pattern implementations

**Current status:** Publication-ready (Due Q1 2026, not yet published)

**Market context:** January 2026 saw three major platforms (Amazon, Microsoft, Google) launch agent commerce systems within seven days, accelerating the transition from experimental to infrastructure. The book documents this convergence and provides implementation patterns applicable across all platforms.

**CRITICAL WRITING REQUIREMENT - Timeless Manuscript Rule:**

Book manuscript files (.md files in `packages/mx-the-bible/manuscripts/`, `packages/mx-handbook/chapters/`, `packages/mx-appendices/`, `docs/shared-chapters/`) must be written as if they've always existed.

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

### 3. Web Audit Suite (Analysis Tool)

Comprehensive Node.js website analysis tool (`packages/web-audit-suite/`) implementing book's AI agent compatibility patterns. See package README for complete documentation.

## Repository Structure

**📁 Complete folder structure:** See [config/system/folder-layout.md](config/system/folder-layout.md) for the full repository structure including all submodules.

**Key directories (hub repository):**

- **Configuration & Documentation:**
  - `CLAUDE.md` - This file (single source of truth for AI assistants)
  - `.claude/` - Claude Code configuration (skills, hooks, settings)
  - `config/` - Project configuration (.markdownlint.json, book/, system/)
  - `docs/` - Documentation (architecture/, for-ai/, shared-chapters/, structure/, talks/)

- **Content & Tools:**
  - `packages/` - All submodules and tools
    - `mx-the-bible/` - MX-Bible manuscript (submodule)
    - `mx-handbook/` - MX-Handbook (submodule)
    - `mx-gathering/` - Community resources (submodule, PUBLIC)
    - `mx-appendices/` - Shared appendices (submodule)
    - `mx-code-examples/` - Pattern examples (submodule)
    - `mx-outputs/` - Generated content (submodule, PRIVATE)
    - `external/ucp/` - UCP reference (submodule)
    - `business/mx-business/` - Business planning (submodule, PRIVATE)
    - `notes/` - Development practices (submodule)
    - `web-audit-suite/` - Analysis tool (NOT a submodule)
  - `scripts/` - Build and generation scripts

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

**Blog Workflow and Metadata:**

All blog posts follow a state-tracked workflow with mandatory metadata:

1. **Draft Stage** - Create markdown in `docs/structure/` or `ingest/blog-drafts/`
   - Add YAML frontmatter with `blog-state: "draft"`
   - Required fields: title, author, date, blog-filename, blog-url, publication-date, description, keywords, ai-instruction

2. **Generate HTML** - Run `scripts/generate-blog-html.js` to create HTML/CSS/SVG files
   - Files created in `packages/mx-outputs/bible/blogs/mx/` (symlinked as `blogs/mx/`)
   - Update markdown to `blog-state: "in-review"`
   - HTML includes meta tags with `blog-state: "in-review"` and `blog-review-status: "final-committee-review"`

3. **Review Stage** - HTML files remain in `packages/mx-outputs/bible/blogs/mx/` for committee review
   - Validate HTML, check WCAG 2.1 AA compliance, verify metadata completeness
   - Files stay in "final-committee-review" status until approved for publication

4. **Publish** - Deploy to allabout.network
   - Update both markdown and HTML to `blog-state: "published"`
   - Add `blog-publication-date` and `blog-url` to both files

**Complete Documentation:**

- [.claude/skills/create-blog/skill.md](.claude/skills/create-blog/skill.md) - Complete workflow
- [docs/structure/blog-metadata-schema.md](docs/structure/blog-metadata-schema.md) - Metadata schema and state tracking
- [config/system/doc-architecture.md](config/system/doc-architecture.md#blog-content-workflow) - Workflow architecture

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

- **CHANGELOG.md:** Never fix markdown linting errors in CHANGELOG.md. The changelog is a historical record and should not be retroactively edited for linting compliance.
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
   - Used in: `packages/mx-the-bible/manuscripts/`, `packages/mx-handbook/chapters/` (for PDF generation)
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
- **MX-Gathering llms.txt:** [packages/mx-gathering/llms.txt](packages/mx-gathering/llms.txt) - Community resources discovery

**Repository decoration pattern:**

Use llms.txt files throughout the repository to ensure all content is discoverable by AI assistants:

```text
/
├── llms.txt                           ← Root project documentation
├── packages/
│   ├── mx-the-bible/
│   │   └── llms.txt                   ← MX-Bible specific context
│   ├── mx-handbook/
│   │   └── llms.txt                   ← MX-Handbook specific context
│   ├── mx-gathering/
│   │   └── llms.txt                   ← Community resources discovery
│   ├── mx-appendices/
│   │   └── llms.txt                   ← Appendices overview
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

See [Appendix H - Example llms.txt](packages/mx-appendices/appendix-h-live-llms.md) for complete field reference and real-world examples.

### Context-Preserving Cross-Document References

**🚨 CRITICAL: Relative links lose context when files are extracted from repository structure.**

**⚠️ MX PRINCIPLE 5:** Context-Preserving References - links must remain meaningful when documents are separated from their repository context.

**The problem:**

Relative-only links like `[README.md](../../README.md)` break when:
- Files are printed to PDF
- Documents are downloaded or copied
- Content is fed to AI agents
- Files are processed outside repository structure

**The cost:**

- **For humans:** Cognitive load to mentally map complex folder structures (`../../config/system/` means what?)
- **For AI agents:** Token cost reconstructing repository structure from incomplete context
- **For machines:** Meaningless links when files are separated from source

**The solution - context-preserving pattern:**

```markdown
[filename](relative-path) ("Document Title" at <absolute-url>)
```

**Real examples:**

```markdown
**For complete overview, see:** [README.md](../../README.md) ("MX-Gathering: Community Resources and Thought Leadership" at <https://github.com/Digital-Domain-Technologies-Ltd/MX-Gathering/blob/main/README.md>)

**For development workflow, see:** [ENVIRONMENTS.md](../development/ENVIRONMENTS.md) ("MX-Gathering Development Environments" at <https://github.com/Digital-Domain-Technologies-Ltd/MX-Gathering/blob/main/docs/development/ENVIRONMENTS.md>)
```

**What this accomplishes:**

- **For humans in IDEs:** Clickable relative links work normally
- **For humans reading extracted files:** Zero cognitive load - document title is explicit
- **For AI agents:** Zero token cost - complete context without repository reconstruction
- **For machines/extracted files:** Full document title and absolute URL provide complete context
- **Universal compatibility:** Works in repo, in PDFs, in AI chats, everywhere

**Design for all circumstances:** Links should work regardless of whether the document is in a repository, IDE, PDF, web page, or AI agent context window.

**When to apply:**

- ✅ **Use this pattern:** All cross-document references (links to other files)
- ✅ **Mandatory:** All `related_files` references in YAML frontmatter
- ✅ **Required:** Documentation that might be extracted or shared
- ❌ **Not needed:** Internal section anchors within same document (like `#contents`)
- ❌ **Not needed:** External links (already absolute)

**This is Anti-pattern 14:** Context-Free References. See Chapter 9 and Appendix N for complete documentation. Also documented as **MX Principle 5** in [docs/for-ai/mx-principles-for-repos.md](docs/for-ai/mx-principles-for-repos.md).

## MX Code Metadata Specification

**🎯 REFERENCE IMPLEMENTATION:** This repository implements the MX Code Metadata Specification - a comprehensive framework for making codebases maximally understandable to AI agents.

**Specification Document:** [packages/mx-gathering/specifications/mx-code-metadata-spec.md](packages/mx-gathering/specifications/mx-code-metadata-spec.md)

**All MX Specifications:** Complete collection of 21 specification documents in [packages/mx-gathering/specifications/](packages/mx-gathering/specifications/) including:

- Core specifications: base, code-metadata, content-fragment, data-lake, database-metadata, media-metadata, structured-data
- MX Specifications Book: multiple chapters and appendices
- Announcement: structured-data-spec-announcement

### Overview

The MX Code Metadata Specification defines how code repositories, files, and inline code declare metadata for machine processors. This enables AI agents to understand code context, constraints, and intent without parsing implementation details.

### Filename Specification

**MANDATORY FILENAME: `.mx.yaml`**

MX Code Metadata configuration files MUST be named `.mx.yaml` (with dot prefix), not `mx.yaml`. This follows the "design for both" principle - a core tenet of machine experience design:

- **For humans:** Dot-prefix hides configuration files from default directory listings, decluttering the workspace
- **For machines:** Files remain fully discoverable and machine-readable through standard filesystem APIs
- **Consistency:** Aligns with established conventions (.gitignore, .env, .editorconfig, etc.)

The hidden file pattern respects human cognitive load while maintaining complete machine accessibility.

### AI Exclusion Patterns (.mxignore)

**BEST PRACTICE: `.mxignore` File**

The `.mxignore` file instructs AI agents (Claude, Copilot, Cursor, etc.) which files to ignore unless explicitly requested by the user. This prevents AI assistants from wasting context on infrastructure files, reducing noise and improving focus on actual project content.

**Purpose:**

- Filter out infrastructure files (READMEs, configuration, build artifacts)
- Exclude documentation boilerplate (LICENSE, CHANGELOG, CONTRIBUTING)
- Remove IDE and tooling files (.vscode/, .github/, node_modules/)
- Focus AI agent attention on primary project content

**Pattern Syntax:**

Uses gitignore-style patterns:

```text
README.md              # Exact filename
**/README.md          # Recursive match in any directory
*.png                 # Wildcard extension
node_modules/         # Directory exclusion
!.env.example         # Negation (include this file)
```

**Inheritance Model:**

The `.mxignore` file should inherit from `.gitignore` using the `@mx:inherits` attribute. Files excluded from version control should typically also be ignored by AI agents.

**Example .mxignore Header:**

```text
# .mxignore
# MX AI Instruction File
#
# @mx:purpose: Instruct AI agents to ignore these files unless specifically requested by user
# @mx:audience: ai-agents
# @mx:stability: stable
# @mx:inherits: .gitignore
# @mx:ai.context_provides: ["ai-exclusion-patterns", "infrastructure-patterns", "non-content-files"]
# @mx:related_files: [".gitignore"]
# @mx:see_also: ".gitignore defines patterns for version control exclusions (generated files)"
# @mx:version: 1.0.0
# @mx:last-updated: 2026-01-29
```

**Complementary Roles:**

- **`.gitignore`**: Excludes generated files, dependencies, and sensitive data from version control
- **`.mxignore`**: Excludes infrastructure and boilerplate from AI agent analysis

**Implementation Note:** AI agents should respect `.mxignore` patterns by default but allow explicit user overrides (e.g., "read the README file" or "show me the .github/workflows").

### Implementation Layers

**1. Repository-Level Metadata (`/.mx.yaml`):**

- Project context, constraints, and conventions
- AI assistance preferences and training conditions
- Technology stack and dependencies
- Inheritable properties for directory and file levels

**2. Directory-Level Metadata (`packages/*/.mx.yaml`):**

- Package-specific context and purpose
- Override repository defaults
- Declare what context this directory provides
- Control AI editability and generation permissions

**3. File-Level Annotations (`@mx` in JSDoc/docstrings):**

- Purpose, audience, stability
- Dependencies and ownership
- AI editing permissions and context requirements
- Test coverage and confidence levels

**4. Function-Level Metadata (`@mx` in function docs):**

- Pure/idempotent declarations
- Time complexity and error handling
- AI confidence and edge cases
- Context requirements for modifications

**5. Inline Annotations (`@mx:begin`, `@mx:end`, `@mx:ai`):**

- Security-critical code blocks
- Performance-critical sections
- Intentional workarounds
- AI-specific instructions

### Cross-File Metadata Application

**Problem:** Some files or directories cannot have sidecar `.mx.yaml` files due to structural constraints:

- **`node_modules/`**: Third-party dependencies (cannot modify)
- **`.git/`**: Version control internals (should not modify)
- **Generated directories**: Build artifacts like `dist/`, `build/`
- **Binary files**: Images, fonts, compiled assets

#### Solution: `@mx:applies_to` Attribute

Files that CAN contain MX metadata (like `package.json`, `.mx.yaml`, or source files with comments) can declare that their metadata applies to other paths using the `@mx:applies_to` attribute.

#### Syntax

```yaml
# In .mx.yaml file
mx:
  applies_to:
    - "node_modules/"
    - "dist/"
    - ".git/"
```

```javascript
// In package.json
{
  "mx": {
    "applies_to": ["node_modules/"],
    "purpose": "Third-party dependencies installed via npm",
    "ai.editable": false,
    "ai.context_provides": ["dependencies", "package-versions"]
  }
}
```

```javascript
// In source file comments
/**
 * @mx:applies_to ["./generated/", "./dist/"]
 * @mx:purpose: Build output generated from this source file
 * @mx:ai.editable: false
 */
```

#### Common Use Cases

1. **package.json → node_modules/**: Declare that dependency metadata applies to the entire dependencies directory
2. **build config → output dirs**: Webpack/Vite config declares metadata for `dist/` or `build/`
3. **.gitignore → ignored paths**: Declare why certain paths are ignored and how AI should treat them
4. **Source file → generated files**: Declare relationship between source and build artifacts

#### Inheritance Rules

- `@mx:applies_to` creates a metadata overlay for the target paths
- Target paths inherit metadata from the declaring file
- More specific metadata (closer to target) overrides less specific
- Local `.mx.yaml` files take precedence over remote `applies_to` declarations

#### Example: package.json with Cross-File Metadata

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "mx": {
    "applies_to": [
      "node_modules/",
      "package-lock.json"
    ],
    "purpose": "Dependency management for project",
    "ai.editable": false,
    "ai.assistance": "prohibited",
    "ai.context_provides": [
      "dependencies",
      "package-versions",
      "scripts"
    ],
    "stability": "stable"
  }
}
```

#### Discovery Pattern

When AI agents encounter a file/directory without a sidecar `.mx.yaml`, they should:

1. Check for local `.mx.yaml` first (highest priority)
2. Search parent directories for `.mx.yaml` with matching `applies_to` patterns
3. Search sibling files (like `package.json`) for `applies_to` declarations
4. Fall back to inherited metadata from parent directory

### Key Files

**Repository Configuration:**

```text
/.mx.yaml                                 # Root project metadata
/packages/web-audit-suite/.mx.yaml       # Audit suite context
/scripts/.mx.yaml                        # Build tools metadata
/package.json (mx property)              # Dependency metadata
```

**Annotated Source Files:**

```text
/scripts/generate-blog-html.js           # Blog generation with MX annotations
/packages/web-audit-suite/src/collectors/llmCollector.js  # Metrics extraction
/packages/web-audit-suite/src/core/AuditContext.js        # Context pattern
```

### Core MX Properties

**AI Properties:**

- `ai.assistance`: `welcome`, `cautious`, `prohibited`
- `ai.editable`: `true`, `false`, `cautious`
- `ai.training`: `permitted`, `conditional`, `prohibited`
- `ai.context_required`: Array of files to read first
- `ai.context_provides`: What this code defines for others
- `ai.confidence`: 0-1 scale of implementation correctness
- `ai.test_coverage`: Boolean indicating test presence

**Metadata Properties:**

- `audience`: `human`, `machine`, `both`
- `purpose`: What this code does
- `stability`: `experimental`, `unstable`, `stable`, `frozen`
- `owner`: Team or person responsible
- `dependencies`: Key dependencies

**Function Properties:**

- `pure`: Boolean (no side effects)
- `idempotent`: Boolean (repeated calls safe)
- `complexity`: Big O notation
- `throws`/`raises`: Possible exceptions

### Inheritance Model

Metadata flows downward through the hierarchy:

```text
/.mx.yaml (repository)
  → packages/web-audit-suite/.mx.yaml (directory)
    → src/collectors/llmCollector.js (file)
      → collect() method (function)
```

Child levels inherit from parents unless explicitly overridden. Use `mx:inheritable` to declare which properties children can inherit.

### Implementation Benefits

1. **First Reference Implementation**: Canonical example of MX Code Metadata
2. **AI Agent Friendly**: Maximally understandable to Claude, Copilot, Cursor, etc.
3. **Documentation as Code**: Metadata stays adjacent to code
4. **Inheritance**: Set defaults once, override where needed
5. **Discoverability**: AI agents understand constraints and permissions
6. **Alignment**: Embodies the book's theme (designing for AI agents)

### Extensions Framework

The specification supports custom extensions via namespaced properties:

- `{namespace}:{property}` format
- Organisation-specific metadata
- Tool-specific configuration
- Security/compliance classifications

### Related Documentation

- **MX Code Metadata Spec**: Complete specification document
- **Appendix L Pattern 4**: Function metadata patterns
- **Chapter 10**: Structured data for code
- **Appendix H**: llms.txt implementation examples

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

**⚠️ CRITICAL:** See [config/system/GIT-README.md](config/system/GIT-README.md) for comprehensive multi-repository git workflow guidance.

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
- Each submodule has its own `.gitignore` file for managing submodule-specific ignored files

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

**Eleven custom skills (`.claude/skills/`):**

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
11. **`/blog-workflow`** - Manage blog post lifecycle from draft to publication with metadata-driven state transitions (implements Appendix P workflow)

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

- `config/book/book-svg-style.md` - SVG illustration style guide
- `docs/for-ai/writing-style.md` - Complete writing style guide

**Strategic planning documents:**

- `docs/structure/README.md` - Directory guide to strategic planning documents
- `docs/structure/MX-plan.md` - Machine Experience (MX) strategic review and positioning
- `docs/structure/github-repositories.md` - Complete repository structure mapping
- `docs/structure/steve-krug.md` - UX research and insights from "Don't Make Me Think"

**Task tracking files:**

- `docs/structure/todo.txt` - Private development task tracking (internal, main repository only)
- `packages/mx-gathering/TODO.txt` - Public deployment and community task tracking (version controlled, visible to community)
- `packages/mx-the-bible/todo.txt` - Bible repository task tracking

**Important distinction:** The main repository todo file (`docs/structure/todo.txt`) is for private internal development tracking, whilst submodule todo files (like `packages/mx-gathering/TODO.txt`) are public-facing and committed to version control for community visibility.

**Architecture documentation:**

- `config/system/GIT-README.md` - Comprehensive git workflow guidance
- `config/system/allabout-network-hosting-map.md` - Complete hosting path mapping and deployment guide
- `config/system/HOSTING-SITEMAP-ASCII.md` - ASCII visual sitemap of hosting structure
- `config/system/HOSTING-QUICK-REFERENCE.md` - One-page deployment reference
- `config/book/TIMELESS-MANUSCRIPT-RULE.md` - Writing standards for book manuscripts
- `config/system/doc-architecture.md` - Repository structure and design decisions

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

**AI-Friendly HTML patterns:** See [packages/mx-appendices/appendix-d-ai-friendly-html-guide.txt](packages/mx-appendices/appendix-d-ai-friendly-html-guide.txt)

## Working with Submodules

**Initialization:**

```bash
git submodule update --init --recursive
```

**Updating to latest:**

```bash
# Update a specific submodule
git submodule update --remote packages/mx-the-bible
git add packages/mx-the-bible
git commit -m "Update mx-the-bible submodule to latest version"

# Or update all submodules
git submodule update --remote
```

**For comprehensive submodule workflows, see [config/system/GIT-README.md](config/system/GIT-README.md).**

## Notes for Future Development

- Book manuscript: Publication-ready (v2.5.1)
- Web Audit Suite: Production-ready implementation of book's patterns
- Both projects cross-reference each other for coherent guidance
