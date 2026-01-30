# Developer Onboarding Guide

Welcome to the MX Series project! This guide will get you up and running in 10 minutes.

## What You're Building

This repository contains:

1. **Two Books (MX Series)** - Book manuscripts about AI agent compatibility
   - **MX-Bible** - Full comprehensive guide (~78,000 words, 13 chapters)
   - **MX-Handbook** - Practical implementation handbook (11 chapters)
2. **Web Audit Suite** - Production-ready Node.js tool implementing the book's patterns
3. **Shared Resources** - Appendices, code examples, and generated content

**For complete architecture details, see [config/system/doc-architecture.md](config/system/doc-architecture.md) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>)**

## Prerequisites

- **Node.js 20.0.0+** - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

Verify your environment:

```bash
node --version  # Should show 20.0.0 or higher
git --version
```

## Quick Start (5 Minutes)

### 1. Clone and Initialize

```bash
# Clone the repository
git clone https://github.com/ddttom/invisible-users.git
cd invisible-users

# Initialize all submodules (9 submodules)
git submodule update --init --recursive

# Install dependencies
npm install

# The postinstall hook runs npm run init automatically,
# which verifies and creates necessary symlinks
```

**Note:** This repository uses **9 git submodules** for content organization. The architecture documentation explains why: [config/system/doc-architecture.md](config/system/doc-architecture.md#separation-of-concerns) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md#separation-of-concerns>)

### 2. Verify Everything Works

```bash
# Check manuscript word count
npm run wordcount

# Run Web Audit Suite tests
npm run audit:test

# Lint all markdown files
npm run lint:markdown
```

If all three commands succeed, you're ready to go!

### 3. Open in VS Code

```bash
code .
```

Install recommended extensions when prompted (24 extensions for optimal development experience).

## Essential Commands

### Book Manuscripts

```bash
npm run wordcount              # Total words across all chapters
npm run status                 # Show all chapter files
npm run lint:markdown          # Check markdown
npm run lint:markdown:fix      # Auto-fix markdown issues
npm run illustrations:generate # Generate PNG from SVG (requires ImageMagick)
```

### PDF Generation

Requires LaTeX (install with `brew install --cask basictex`):

```bash
npm run pdf:bible-all          # All formats for MX-Bible
npm run pdf:dont-all           # All formats for MX-Don't Make the AI Think
npm run pdf:mx-all             # All formats for MX-Handbook
npm run pdf:appendix           # HTML appendices
```

Or use HTML fallback: `npm run pdf:bible-html` (print to PDF via browser ⌘+P)

### Web Audit Suite

```bash
npm run audit:start -- -s https://example.com/sitemap.xml
npm run audit:start -- -s https://example.com -c 10  # Limited pages
npm run audit:test             # Run tests
npm run audit:lint             # Lint code
```

See [packages/web-audit-suite/README.md](packages/web-audit-suite/README.md) ("Web Audit Suite Documentation" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/README.md>) for complete usage.

## VS Code Integration

### Quick Tasks (Cmd+Shift+B or Cmd+Shift+P → "Tasks: Run Task")

- `Markdown: Lint and Fix` - Fix markdown issues
- `Web Audit Suite: Start` - Run analysis
- `Book: Generate PDF` - Create PDF from manuscript

### Debugging (F5)

- **Web Audit Suite: Debug** - Debug with example URL
- **Web Audit Suite: Debug Tests** - Debug all tests
- **Node: Launch Current File** - Debug any Node.js file

**Shortcuts:** F9 (breakpoint), F10 (step over), F11 (step into), Shift+F5 (stop)

## Repository Structure

This is a **multi-repository monorepo with 10 git repositories** (1 main + 9 submodules):

**📁 Complete folder structure:** See [config/system/folder-layout.md](config/system/folder-layout.md) ("Complete Repository Folder Layout" at <https://github.com/ddttom/invisible-users/blob/main/config/system/folder-layout.md>) ("Complete Repository Folder Layout" at <https://github.com/ddttom/invisible-users/blob/main/config/system/folder-layout.md>) ("Complete Repository Folder Layout" at <https://github.com/ddttom/invisible-users/blob/main/config/system/folder-layout.md>) ("Complete Repository Folder Layout" at <https://github.com/ddttom/invisible-users/blob/main/config/system/folder-layout.md>) ("Complete Repository Folder Layout" at <https://github.com/ddttom/invisible-users/blob/main/config/system/folder-layout.md>) ("Complete Repository Folder Layout" at <https://github.com/ddttom/invisible-users/blob/main/config/system/folder-layout.md>) ("Complete Repository Folder Layout" at <https://github.com/ddttom/invisible-users/blob/main/config/system/folder-layout.md>) ("Complete Repository Folder Layout" at <https://github.com/ddttom/invisible-users/blob/main/config/system/folder-layout.md>) for the authoritative, detailed folder structure including all submodules.

**High-level overview:**

```text
invisible-users/                    # Main repository (control hub)
├── packages/
│   ├── mx-the-bible/               # MX-Bible [SUBMODULE]
│   ├── mx-handbook/                # MX-Handbook [SUBMODULE]
│   ├── mx-gathering/               # Community resources [SUBMODULE - PUBLIC]
│   ├── mx-appendices/              # Shared appendices [SUBMODULE]
│   ├── mx-code-examples/           # Code patterns [SUBMODULE]
│   ├── mx-outputs/                 # Generated content [SUBMODULE - PRIVATE]
│   ├── external/ucp/               # Universal Commerce Protocol [SUBMODULE - READ-ONLY]
│   ├── business/mx-business/       # Business planning [SUBMODULE - PRIVATE]
│   ├── notes/                      # Development notes [SUBMODULE]
│   └── web-audit-suite/            # Analysis tool [NOT a submodule]
├── docs/                           # Documentation
├── scripts/                        # Build scripts
├── config/                         # Configuration
│   ├── book/                       # Book-specific config
│   └── system/                     # System documentation
│       ├── folder-layout.md        # Complete structure reference
│       └── repo-philosophy.md      # Design principles
└── .claude/                        # Claude Code AI config
```

**Key documentation:**
- [config/system/folder-layout.md](config/system/folder-layout.md) - Complete folder structure (single source of truth)
- [config/system/repo-philosophy.md](config/system/repo-philosophy.md) ("Repository Philosophy & Design Principles" at <https://github.com/ddttom/invisible-users/blob/main/config/system/repo-philosophy.md>) - Design principles and technical philosophy
- [config/system/doc-architecture.md](config/system/doc-architecture.md) - Build systems, workflows, and architecture

## Understanding Submodules

**Why submodules?**

- Independent version control for content
- Clean separation between content and build processes
- Different privacy settings (outputs is private)
- No dependency sprawl in content repositories

**Key commands:**

```bash
# Update all submodules to latest
git submodule update --remote

# Check all submodule status
git submodule status

# View changes in specific submodule
git -C packages/bible log --oneline -10
```

**Critical:** Always check `pwd` before git operations. See [config/system/GIT-README.md](config/system/GIT-README.md) ("Git Workflow Guide for AI Agents" at <https://github.com/ddttom/invisible-users/blob/main/config/system/GIT-README.md>) ("Git Workflow Guide for AI Agents" at <https://github.com/ddttom/invisible-users/blob/main/config/system/GIT-README.md>) ("Git Workflow Guide for AI Agents" at <https://github.com/ddttom/invisible-users/blob/main/config/system/GIT-README.md>) ("Git Workflow Guide for AI Agents" at <https://github.com/ddttom/invisible-users/blob/main/config/system/GIT-README.md>) ("Git Workflow Guide for AI Agents" at <https://github.com/ddttom/invisible-users/blob/main/config/system/GIT-README.md>) ("Git Workflow Guide for AI Agents" at <https://github.com/ddttom/invisible-users/blob/main/config/system/GIT-README.md>) ("Git Workflow Guide for AI Agents" at <https://github.com/ddttom/invisible-users/blob/main/config/system/GIT-README.md>) ("Git Workflow for Multi-Repository Structure" at <https://github.com/ddttom/invisible-users/blob/main/config/system/GIT-README.md>) for comprehensive multi-repository workflow guidance.

## Code Quality Standards

### JavaScript (Web Audit Suite)

- ESLint with Airbnb base config
- Single quotes, 2-space indentation
- ES Modules (must include `.js` in imports)
- Run: `npm run audit:lint` and `npm run audit:test`

### Markdown (Book Manuscripts)

- British English throughout
- ATX-style headings (`###` not underlines)
- Blank lines around lists
- Run: `npm run lint:markdown:fix`

**For complete quality standards, see [config/system/doc-architecture.md](config/system/doc-architecture.md#version-control-strategy) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md#version-control-strategy>)**

## Writing Style (Book Manuscripts)

- **British English** (organise, colour, whilst)
- **First-person narrative**
- **Real examples only** (no theoretical scenarios)
- **Sequential chapters** (each builds on previous)
- **No colons in chapter titles**
- **Short dashes only** (not em-dashes)

**Timeless Manuscript Rule:** Write as if the book has always existed. Never include publication dates, "we added", or meta-commentary about the book's development.

**For complete style guide, see [docs/for-ai/writing-style.md](docs/for-ai/writing-style.md) ("Writing Style Guide for Book Manuscripts" at <https://github.com/ddttom/invisible-users/blob/main/docs/for-ai/writing-style.md>)**

## Common Issues and Solutions

### Submodule Issues

If submodules aren't initialized properly:

```bash
git submodule update --init --recursive
```

### Empty Submodules

```bash
git submodule update --init --recursive
```

### Missing Dependencies

```bash
cd packages/web-audit-suite && npm install && cd ../..
```

### PDF Generation Fails

```bash
brew install --cask basictex  # Install LaTeX
source ~/.zshrc               # Reload shell
# Or use HTML fallback: npm run pdf:bible-html
```

### VS Code Performance Issues

Disable unused extensions (Java, C#, PHP, Swift) for this workspace. See [docs/vscode-extension-cleanup.md](docs/vscode-extension-cleanup.md) for recommendations.

## Key Documentation

**Start here (in order):**

1. **[README.md](README.md) ("The Invisible Users" at <https://github.com/ddttom/invisible-users/blob/main/README.md>)** - Project overview
2. **[config/system/doc-architecture.md](config/system/doc-architecture.md)** - Complete architecture documentation (827 lines, comprehensive)
3. **[CLAUDE.md](CLAUDE.md) ("CLAUDE.md" at <https://github.com/ddttom/invisible-users/blob/main/CLAUDE.md>)** - AI agent instructions and project guide
4. **[config/system/GIT-README.md](config/system/GIT-README.md)** - Git workflow with submodules

**Book-specific:**

- [packages/mx-the-bible/README.md](packages/mx-the-bible/README.md) ("Invisible Users Manuscript" at <https://github.com/ddttom/invisible-users/blob/main/packages/mx-the-bible/README.md>) - MX-Bible contents
- [packages/mx-handbook/README.md](packages/mx-handbook/README.md) ("MX-Handbook: Designing Web Interfaces for AI Agents" at <https://github.com/ddttom/invisible-users/blob/main/packages/mx-handbook/README.md>) - MX-Handbook contents
- [packages/mx-appendices/README.md](packages/mx-appendices/README.md) ("Shared Appendices" at <https://github.com/ddttom/invisible-users/blob/main/packages/mx-appendices/README.md>) - Appendices overview

**Tool-specific:**

- [packages/web-audit-suite/README.md](packages/web-audit-suite/README.md) ("Web Audit Suite Documentation" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/README.md>) - Complete tool documentation
- [packages/web-audit-suite/QUICKSTART.md](packages/web-audit-suite/QUICKSTART.md) ("Web Audit Suite Quick Start" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/QUICKSTART.md>) - 5-minute guide

## Next Steps

1. **Explore the architecture:**

   ```bash
   code config/system/doc-architecture.md
   ```

2. **Read a book chapter:**

   ```bash
   code packages/bible/chapters/chapter-01-what-you-will-learn.md
   ```

3. **Run the Web Audit Suite:**

   ```bash
   npm run audit:start -- -s https://example.com -c 10
   ls packages/web-audit-suite/results/
   ```

4. **Try debugging:**
   - Open `packages/web-audit-suite/index.js`
   - Press F9 to set a breakpoint
   - Press F5 to start debugging

## Project Principles

1. **The Book is Authoritative** - Book manuscripts are the source of truth for terminology
2. **The Tool Implements the Book** - Web Audit Suite demonstrates book patterns
3. **Documentation Must Align** - Consistent terminology everywhere
4. **Quality Over Speed** - Code must pass linting and tests before commit

**For complete principles and architecture patterns, see [config/system/doc-architecture.md](config/system/doc-architecture.md#key-organizational-principles) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md#key-organizational-principles>)**

## Welcome Aboard

You're ready to contribute! Remember:

- **Read the architecture doc first** - [config/system/doc-architecture.md](config/system/doc-architecture.md) ("Repository Architecture Documentation" at <https://github.com/ddttom/invisible-users/blob/main/config/system/doc-architecture.md>)
- **Test your changes** - Run tests and linting before committing
- **Follow conventions** - British English for books, ES Modules for code
- **Ask questions** - Use documentation as your guide

Happy coding! 🚀
