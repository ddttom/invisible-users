# Developer Onboarding Guide

Welcome to The Invisible Users project! This guide will help you get up and running quickly.

## Overview

This repository contains two integrated projects:

1. **Book Manuscript** - "The Invisible Users: Designing the Web for AI Agents and Everyone Else" (~57,000 words)
2. **Web Audit Suite** - A production-ready Node.js tool that implements the book's AI agent compatibility patterns

## Prerequisites

Before you begin, ensure you have:

- **Node.js 20.0.0 or higher** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)
- **LaTeX distribution** (optional, for PDF generation) - See instructions below

### Verify Your Environment

```bash
# Check Node.js version (should be 20.0.0+)
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

## Quick Start (5 Minutes)

### 1. Clone the Repository

```bash
# Clone the main repository
git clone https://github.com/ddttom/invisible-users.git
cd invisible-users

# Initialize the manuscript submodule
git submodule update --init --recursive
```

**Important:** This repository uses a git submodule for the manuscript. The `git submodule update --init --recursive` command is required to fetch the book content.

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# This automatically runs `npm run init` as a postinstall hook,
# which verifies and creates necessary symlinks (blogs/, books/*)

# Install Web Audit Suite dependencies
cd packages/web-audit-suite
npm install
cd ../..
```

**What `npm run init` does:**

The postinstall hook runs automatically after `npm install` to verify repository structure:

- Creates `blogs -> outputs/bible/blogs` symlink (convenient blog access)
- Creates `books/` directory with symlinks to all book packages
- Reports "No changes needed" if structure is correct
- Reports "Repository structure reconstructed" if symlinks were created/fixed

### 3. Open in VS Code

```bash
# Open the project in VS Code
code .
```

VS Code will prompt you to install recommended extensions. Click "Install All" - this sets up:

- ESLint (code linting)
- Markdownlint (markdown linting)
- Prettier (code formatting)
- Claude Code (AI assistance)
- GitLens (Git visualization)
- And 19 other helpful extensions

### 4. Verify Everything Works

```bash
# Check manuscript word count
npm run wordcount

# Run Web Audit Suite tests
npm run audit:test

# Lint all markdown files
npm run lint:markdown
```

If all three commands complete successfully, you're ready to go!

## Repository Structure

```text
/
├── .vscode/                    # VS Code workspace configuration
├── packages/
│   ├── bible/                  # "The Invisible Users" (git submodule)
│   │   ├── chapters/           # 13 chapters
│   │   ├── illustrations/      # SVG and PNG images
│   │   └── README.md           # Book overview
│   │
│   ├── dont-make-ai-think/     # "Don't Make AI Think" (git submodule)
│   │   ├── chapters/           # 10 chapters
│   │   └── README.md           # Slim guide overview
│   │
│   ├── shared-appendices/      # Shared appendices (git submodule)
│   │   ├── appendix-*.md       # 12 appendices (A-L)
│   │   └── web/                # HTML versions
│   │
│   ├── shared-code-examples/   # Code patterns (git submodule)
│   │   ├── agent-friendly-starter-kit/
│   │   └── examples/
│   │
│   ├── web-audit-suite/        # Web analysis tool (NOT a submodule)
│   │   ├── index.js            # Entry point
│   │   ├── src/                # Source code
│   │   │   ├── main.js         # Orchestration
│   │   │   ├── config/         # Configuration
│   │   │   └── utils/          # Utilities
│   │   ├── test/               # Test suite
│   │   └── docs/               # Documentation
│   │
│   └── manuscript/             # Shared manuscript resources
│       └── book-svg-style.md   # SVG style guide
│
├── outputs/                    # Generated content (git submodule - PRIVATE)
│   ├── bible/blogs/            # Blog posts
│   └── the-bible/              # PDF and HTML builds
│
├── books/                      # Symlinks for convenience
│   ├── bible -> ../packages/bible
│   ├── dont-make-ai-think -> ../packages/dont-make-ai-think
│   ├── appendices -> ../packages/shared-appendices
│   └── outputs -> ../outputs
│
├── blogs -> outputs/bible/blogs  # Symlink to blog posts
├── docs/                       # Project documentation
├── scripts/                    # Build scripts
├── CLAUDE.md                   # AI agent instructions
└── README.md                   # Main documentation
```

## Understanding the Submodule

**This repository uses multiple git submodules** for content organization:

- **Main repo:** `https://github.com/ddttom/invisible-users`
- **Submodules:** outputs/, bible/, dont-make-ai-think/, shared-appendices/, shared-code-examples/

**Why submodules?**

- Content can be updated independently
- Main repo controls which version of each submodule is used
- Keeps content history clean and separate
- Allows different privacy settings (e.g., outputs is private)

**Key commands:**

```bash
# Update all submodules to latest version
git submodule update --remote

# Update specific submodule
git submodule update --remote packages/bible

# Check all submodule status
git submodule status

# View changes in specific submodule
git -C packages/bible log --oneline -10
```

**Important:** Always check your working directory with `pwd` before git operations. See [docs/repo/GIT-README.md](GIT-README.md) for detailed multi-repository workflows.

## Common Development Tasks

### Working with the Book Manuscript

```bash
# View total word count across all chapters
npm run wordcount

# View detailed word count for all files
npm run wordcount:all

# Check chapter status
npm run status

# Lint markdown files
npm run lint:markdown

# Auto-fix markdown issues
npm run lint:markdown:fix

# Generate PNG illustrations from SVG sources
npm run illustrations:generate
# Note: This downloads missing cover images, checks for back-cover.png,
# and converts all SVG files to PNG. See details below.
```

**About Illustration Generation:**

The `npm run illustrations:generate` command:

1. **Downloads cover images** if missing (Profile.png, A4-Cover.png, Kindle-Cover.png)
2. **Checks for back-cover.png** - if missing, displays instructions to:
   - Open `packages/shared-appendices/web/back-cover.html` in a browser
   - Take a full-page screenshot
   - Save as `back-cover.png` in `packages/bible/illustrations/`
3. **Converts all SVG files** in illustrations/ to PNG using ImageMagick

**Note:** ImageMagick is required for SVG conversion. Install with `brew install imagemagick` if needed.

### Generating PDFs

**Install LaTeX first (optional, for PDF generation):**

```bash
# Install BasicTeX via Homebrew (lightweight, ~100MB)
brew install --cask basictex

# Reload shell to pick up new PATH
source ~/.zshrc

# Verify installation
which xelatex
```

**Generate PDFs:**

```bash
# Generate A4 PDF with professional formatting
npm run pdf:generate

# Generate 6"×9" Kindle Direct Publishing PDF
npm run pdf:kindle

# Generate simple PDF (no cover)
npm run pdf:simple

# Generate HTML (can print to PDF via browser ⌘+P)
npm run pdf:html

# Generate web appendices
npm run pdf:appendix
```

**If you don't want to install LaTeX:**
Use `npm run pdf:html` to generate HTML, then print to PDF using your browser (⌘+P).

### Working with Web Audit Suite

```bash
# Run with default settings (from repository root)
npm run audit:start

# Run with specific sitemap/URL
npm run audit:start -- -s https://example.com/sitemap.xml

# Run with limited pages (for testing)
npm run audit:start -- -s https://example.com -c 10

# Full analysis with all features
npm run audit:start -- -s https://example.com \
  --enable-history \
  --generate-dashboard \
  --generate-executive-summary

# Run tests
npm run audit:test

# Lint code
npm run audit:lint
```

## VS Code Integration

### Quick Tasks

Press **Cmd+Shift+P** → "Tasks: Run Task" to access:

**Most Common:**

- `Markdown: Lint and Fix` - Fix markdown issues (also: Cmd+Shift+B)
- `Web Audit Suite: Start` - Run analysis
- `Book: Generate PDF` - Create PDF from manuscript

**All Available Tasks:**

- Book: Word Count, Generate PDF, Generate Kindle PDF, Generate HTML Appendices, Generate Illustrations
- Code Quality: Markdown Lint, Web Audit Suite Lint
- Development: Web Audit Suite Start/Test
- Git: Commit and Push All

### Debugging

Press **F5** to start debugging with these configurations:

1. **Web Audit Suite: Debug** - Debug with example URL
2. **Web Audit Suite: Debug with Custom URL** - Prompts for URL input
3. **Web Audit Suite: Debug Tests** - Debug all tests
4. **Web Audit Suite: Debug Current Test File** - Debug open test file
5. **Node: Launch Current File** - Debug any Node.js file

**Debugging shortcuts:**

- **F5** - Start debugging
- **F9** - Toggle breakpoint
- **F10** - Step over
- **F11** - Step into
- **Shift+F5** - Stop debugging

### Auto-Formatting

Files automatically format on save:

- **JavaScript/JSON** - Prettier
- **Markdown** - Markdownlint
- **ESLint** - Auto-fix for Web Audit Suite code

## Understanding the Codebase

### Book Manuscript

The book is written in **British English** with these conventions:

- First-person narrative voice
- Real, concrete examples (not theoretical)
- Sequential chapters (each builds on previous)
- No colons in chapter titles
- Short dashes only (not em-dashes)

**Key files to read:**

1. [packages/bible/README.md](../../packages/bible/README.md) - The Bible book overview and chapter list
2. [packages/dont-make-ai-think/README.md](../../packages/dont-make-ai-think/README.md) - Slim guide overview
3. [packages/shared-appendices/README.md](../../packages/shared-appendices/README.md) - Appendices overview

### Web Audit Suite Architecture

The tool uses a **three-phase processing pipeline:**

1. **URL Collection Phase** (`getUrlsFromSitemap`)
   - Extracts URLs from sitemap or HTML
   - Validates and normalizes URLs

2. **Data Collection Phase** (`processSitemapUrls`)
   - Analyzes each page with Puppeteer
   - Collects metrics, runs Pa11y tests
   - Stores all data in `results.json` (single source of truth)

3. **Report Generation Phase** (`generateReports`)
   - Reads from `results.json` only
   - Generates CSV and markdown reports
   - Never fetches new data

**Critical principle:** `results.json` is the single source of truth. All reports must be generated from this file.

**Key files to read:**

1. [packages/web-audit-suite/README.md](packages/web-audit-suite/README.md) - Tool overview
2. [packages/web-audit-suite/src/main.js](packages/web-audit-suite/src/main.js) - Pipeline orchestration
3. [packages/web-audit-suite/docs/web-audit-architecture.md](packages/web-audit-suite/docs/web-audit-architecture.md) - Architecture details

### Module System

The Web Audit Suite uses **ES Modules**:

- `"type": "module"` in package.json
- All imports must include `.js` extension: `import { foo } from './utils/bar.js'`
- Uses dependency injection via `AuditContext` object (no global state)

## Code Quality Standards

### JavaScript (Web Audit Suite)

- **Linter:** ESLint with Airbnb base config
- **Style:** Single quotes, 2-space indentation, 100-char line width
- **Testing:** Mocha with Chai assertions
- **Run checks:**

  ```bash
  npm run audit:lint        # Check
  npm run audit:test        # Test
  ```

### Markdown (Book Manuscript)

- **Linter:** Markdownlint
- **Style:** British English, ATX-style headings, blank lines around lists
- **Run checks:**

  ```bash
  npm run lint:markdown     # Check
  npm run lint:markdown:fix # Fix
  ```

**Common linting errors:**

- **MD024:** Duplicate headings (must make unique with context)
- **MD032:** Lists need blank lines before/after
- **MD040:** Code blocks must have language specified

### Git Commit Standards

When creating commits:

- Clear, descriptive commit messages
- No co-author attribution or "Generated with" messages
- Use `npm run commit-push` for interactive workflow
- Or use `/step-commit` skill if using Claude Code

## Testing Your Setup

Run this checklist to verify everything is working:

```bash
# 1. Check book packages are available
ls packages/bible/README.md
ls packages/dont-make-ai-think/README.md
ls packages/shared-appendices/README.md

# 2. Check dependencies are installed
npm run wordcount

# 3. Run Web Audit Suite tests
npm run audit:test

# 4. Lint markdown files
npm run lint:markdown

# 5. Try generating an illustration (requires ImageMagick)
npm run illustrations:generate
```

All commands should complete without errors.

## Performance Optimization

### Extension Cleanup (Recommended)

You likely have many VS Code extensions installed. This project only needs ~24 of them.

See [docs/vscode-extension-cleanup.md](docs/vscode-extension-cleanup.md) for:

- List of recommended extensions
- 100+ extensions to disable for better performance
- Performance impact details

**Quick wins:**

1. Open Extensions panel (Cmd+Shift+X)
2. Search for "Java" - right-click → "Disable (Workspace)"
3. Repeat for: C#, PHP, Swift, Python extensions
4. Reload VS Code

This can significantly improve startup time and responsiveness.

## Key Documentation Files

**Start here:**

1. [README.md](README.md) - Project overview
2. [CLAUDE.md](CLAUDE.md) - AI agent instructions (comprehensive project guide)
3. [GIT-README.md](GIT-README.md) - Git workflow with submodules

**Book-specific:**
4. [packages/bible/README.md](../../packages/bible/README.md) - The Bible contents and status
5. [packages/dont-make-ai-think/README.md](../../packages/dont-make-ai-think/README.md) - Slim guide contents
6. [packages/shared-appendices/README.md](../../packages/shared-appendices/README.md) - Appendices overview

**Tool-specific:**
7. [packages/web-audit-suite/README.md](../../packages/web-audit-suite/README.md) - Tool documentation
8. [packages/web-audit-suite/QUICKSTART.md](../../packages/web-audit-suite/QUICKSTART.md) - 5-minute guide
9. [packages/web-audit-suite/docs/usermanual.md](../../packages/web-audit-suite/docs/usermanual.md) - Complete user guide

**Development environment:**
10. [docs/vscode-extension-cleanup.md](../vscode-extension-cleanup.md) - Extension management
11. [.vscode/settings.json](../../.vscode/settings.json) - Workspace configuration

## Common Issues and Solutions

### Issue: "Missing symlinks or books/ directory"

**Error:** `blogs/` or `books/` directory doesn't exist, or symlinks are broken

**Solution:**

```bash
# Run the init script to verify/recreate symlinks
npm run init

# If you see "Repository structure reconstructed", the symlinks were created
# If you see "No changes needed", everything was already correct
```

The init script is safe to run multiple times and will only make changes if needed.

### Issue: "Submodules not initialized"

**Error:** Submodule directories (packages/bible/, outputs/, etc.) are empty

**Solution:**

```bash
# Initialize all submodules
git submodule update --init --recursive
```

### Issue: "Cannot find module" errors

**Error:** Import errors when running Web Audit Suite

**Solution:**

```bash
cd packages/web-audit-suite
npm install
cd ../..
```

### Issue: "xelatex: command not found"

**Error:** PDF generation fails

**Solution:**

```bash
# Install LaTeX
brew install --cask basictex
source ~/.zshrc

# Or use HTML fallback
npm run pdf:html
```

### Issue: Markdown linting fails

**Error:** MD024, MD032, MD040 errors

**Solution:**

```bash
# Auto-fix most issues
npm run lint:markdown:fix

# Manually fix remaining issues (MD024 duplicate headings, MD036 emphasis)
```

### Issue: Git operations seem confusing

**Error:** Changes in wrong repository, submodule pointer issues

**Solution:**

- Always run `pwd` before git operations
- Read [GIT-README.md](GIT-README.md) for comprehensive workflow guide
- Use `npm run commit-push` for interactive commits

### Issue: VS Code is slow

**Error:** Startup takes >30 seconds, sluggish performance

**Solution:**

- Follow [docs/vscode-extension-cleanup.md](docs/vscode-extension-cleanup.md)
- Disable Java, C#, PHP, Swift extensions for this workspace
- Keep only the 24 recommended extensions enabled

## Getting Help

### Documentation Resources

- **Project overview:** [README.md](README.md)
- **AI agent instructions:** [CLAUDE.md](CLAUDE.md)
- **Git workflows:** [GIT-README.md](GIT-README.md)
- **Web Audit Suite:** [packages/web-audit-suite/docs/usermanual.md](packages/web-audit-suite/docs/usermanual.md)

### Code Exploration

Use VS Code search to find examples:

- **Cmd+Shift+F** - Search across all files
- **Cmd+P** - Quick file open
- **Cmd+T** - Go to symbol

### Understanding Patterns

**Best way to learn the codebase:**

1. Read [packages/bible/README.md](../../packages/bible/README.md) for book overview
2. Explore [packages/web-audit-suite/src/main.js](../../packages/web-audit-suite/src/main.js) for tool architecture
3. Run Web Audit Suite on a test site: `npm run audit:start -- -s https://example.com -c 5`
4. Read the generated reports in `packages/web-audit-suite/results/`

## Next Steps

Now that you're set up:

1. **Explore the book content:**

   ```bash
   # Open The Bible README to see chapter list
   code packages/bible/README.md

   # Open Slim guide README
   code packages/dont-make-ai-think/README.md
   ```

2. **Run the Web Audit Suite:**

   ```bash
   # Analyze a website
   npm run audit:start -- -s https://example.com -c 10

   # View results
   ls packages/web-audit-suite/results/
   ```

3. **Read the architecture:**
   - [docs/architecture/doc-architecture.md](../architecture/doc-architecture.md) - Repository structure
   - [docs/architecture/web-audit-architecture.md](../architecture/web-audit-architecture.md) - Tool architecture

4. **Try a task:**
   - Press **Cmd+Shift+P** → "Tasks: Run Task"
   - Try "Markdown: Lint and Fix"

5. **Set up debugging:**
   - Open [packages/web-audit-suite/index.js](packages/web-audit-suite/index.js)
   - Press **F9** to set a breakpoint
   - Press **F5** to start debugging

## Project Principles

Understanding these principles will help you contribute effectively:

### 1. The Book is Authoritative

The book manuscript is the source of truth for terminology and patterns. If there's a conflict between book and code, update the code.

### 2. The Tool Implements the Book

Web Audit Suite demonstrates the book's patterns in production code. Tool development should reference book chapters.

### 3. Documentation Must Align

All documentation uses consistent terminology. Changes flow: book → tool → documentation.

### 4. Quality Over Speed

- Code must pass linting before commit
- Tests must pass before merge
- Markdown must be clean
- No shortcuts on quality

### 5. Real Examples Only

The book uses concrete, real-world examples. Don't make up hypothetical scenarios - use existing source material.

## Welcome Aboard

You're now ready to contribute to The Invisible Users project. Remember:

- **Ask questions** - Use the documentation as your guide
- **Test your changes** - Run tests and linting before committing
- **Follow conventions** - British English for book, ES Modules for code
- **Keep it simple** - Prefer clarity over cleverness

Happy coding! 🚀
