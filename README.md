# The Invisible Users

## Designing the Web for AI Agents and Everyone Else

A practical guide to the collision between modern web design and AI agents, with a production-ready implementation tool.

**New to this project?** Start with [ONBOARDING.md](ONBOARDING.md) for a complete setup guide.

## What Are AI Agents?

AI agents are **machines** with specific technical capabilities and limitations that process websites on behalf of users. They're not intelligent - they're statistical pattern-matching systems that convert HTML into mathematical representations.

**Four types of agents:**

- **Server-side** (ChatGPT, Claude) - See raw HTML only, no JavaScript execution
- **In-browser** (Copilot, extensions) - Full JavaScript execution, no visual perception
- **Browser automation** (Perplexity, Playwright) - Screenshot capability, computer vision
- **Local agents** (Ollama) - Limited resources, privacy-preserving

**The convergence principle:** Patterns that help AI agents are the same patterns that help users with disabilities. Both need semantic structure because both lack access to visual design cues.

**The agent journey:** Discovery (training) → Citation (recommendation) → Search (comparison) → Price understanding → Purchase confidence. Break any stage, lose the entire transaction.

## Industry Context

In January 2026, three major platforms launched AI agent commerce systems within seven days:

- **January 5:** Amazon Alexa+ (conversational commerce)
- **January 8:** Microsoft Copilot Checkout (proprietary ecosystem)
- **January 11:** Google UCP + Shopping Agent (open standard)

This convergence validates the book's central thesis: AI agents accessing websites is transitioning from experimental to infrastructure. The book documents these developments and provides implementation patterns that work regardless of which platforms dominate.

## About This Repository

This repository contains multiple integrated projects working together to address AI agent compatibility:

### Book Manuscripts

Two books with shared appendices and code examples:

- **[MX-Bible](packages/mx-the-bible/)** - Full comprehensive guide. Formerly "The Invisible Users".
- **[MX-Handbook](packages/mx-handbook/)** - Practical implementation guide (11 chapters)
- **[Shared Appendices](packages/mx-appendices/)** - Implementation guides and resources (12 appendices A-M)

See individual package READMEs for chapter lists, word counts, and build commands.

### Web Audit Suite

A production-ready Node.js website analysis tool implementing the book's patterns:

- **[Web Audit Suite](packages/web-audit-suite/)** - Complete documentation and usage guide

Features: SEO, accessibility (WCAG 2.1), performance, security, AI agent compatibility analysis.

### MX-Gathering

Community resources and thought leadership repository:

- **[MX-Gathering](packages/mx-gathering/)** - Open-source community repository for shared resources, contribution guidelines, and collaborative content

## Why Submodules Exist: Separation of Concerns

This repository uses git submodules to achieve **clean separation between content and orchestration**. Each submodule is an independent repository with its own version control, serving a specific purpose:

**Key principles:**

- **Main repository (`invisible-users`)** - Control hub containing build scripts, npm packages, configuration, and orchestration
- **Content submodules** - Pure content repositories (markdown, code examples) with no dependencies or build tooling
- **Outputs submodule** - Storage for generated materials, kept private and separate from source content

**Benefits of this architecture:**

1. **Independent version control** - Content changes don't pollute main repository history
2. **No dependency sprawl** - Content repositories have no package.json, no npm install, no node_modules
3. **Clean collaboration** - Writers work in content repos, developers work in main repo
4. **Reusability** - Content can be referenced by other projects without pulling in build tooling
5. **Access control** - Private outputs repository separate from public content
6. **Build isolation** - All build processes controlled from single location (main repo)

**Important:** Submodules cannot be built independently. All build commands, PDF generation, and linting run from the parent `invisible-users` repository. See individual submodule READMEs for details.

## Repository Structure

```text
/
├── packages/
│   ├── mx-the-bible/         # "MX-Bible" (full comprehensive guide) [SUBMODULE]
│   ├── mx-handbook/          # "MX-Handbook" (implementation handbook) [SUBMODULE]
│   ├── mx-gathering/         # "MX-Gathering" (community resources) [SUBMODULE]
│   ├── mx-appendices/        # Shared implementation guides (A-M) [SUBMODULE]
│   ├── mx-code-examples/     # Production-ready code examples [SUBMODULE]
│   ├── mx-outputs/           # Generated content [SUBMODULE - PRIVATE]
│   └── web-audit-suite/      # Website analysis tool (NOT a submodule)
├── books/                    # Convenience symlinks (reduces cognitive load when navigating)
│   ├── bible -> ../packages/mx-the-bible
│   ├── mx-handbook -> ../packages/mx-handbook
│   ├── appendices -> ../packages/mx-appendices
│   ├── code-examples -> ../packages/mx-code-examples
│   └── outputs -> ../packages/mx-outputs
│   # Note: Access books/bible instead of packages/mx-the-bible/ to reduce mental overhead
├── blogs -> packages/mx-outputs/bible/blogs  # Symlink to outputs submodule blogs
├── scrap/                    # Working directory for temporary files
├── docs/                     # Documentation (main repo only)
│   ├── architecture/         # Architecture documentation
│   ├── for-ai/               # AI assistant guidance files
│   ├── shared-chapters/      # Shared book content (Chapter 0)
│   ├── structure/            # Strategic planning documents
│   └── talks/                # Presentation materials
│       ├── historical/       # Archived presentations
│       └── template/         # Presentation templates
├── config/                   # Configuration files (main repo only)
├── scripts/                  # Build and deployment scripts (main repo only)
└── .claude/                  # Claude Code AI assistant configuration (main repo only)
```

## Quick Start

### Initial Setup

After cloning the repository and installing dependencies:

```bash
# Clone repository
git clone https://github.com/ddttom/invisible-users.git
cd invisible-users

# Initialize submodules
git submodule update --init --recursive

# Install dependencies
npm install

# The postinstall hook automatically runs `npm run init` to verify/create symlinks
# You can also run it manually anytime:
npm run init
```

The `npm run init` command verifies and creates necessary symlinks for easier navigation:

- `blogs -> packages/mx-outputs/bible/blogs` (convenient blog access)
- `books/bible -> ../packages/mx-the-bible` (convenient book access)
- `books/mx-handbook -> ../packages/mx-handbook`
- `books/appendices -> ../packages/mx-appendices`
- `books/code-examples -> ../packages/mx-code-examples`
- `books/outputs -> ../packages/mx-outputs`

**Why `books/` symlinks?** Reduces cognitive load when navigating. Access `books/bible/` instead of `packages/mx-the-bible/` - one less directory level to remember. These symlinks are tracked in git but the `books/` directory is in `.gitignore` to prevent accidental additions.

### Building Book Manuscripts

```bash
# View word counts
npm run wordcount

# Generate PNG illustrations from SVG sources
npm run illustrations:generate

# Lint all markdown files
npm run lint:markdown
npm run lint:markdown:fix

# Generate PDFs and HTML (see package READMEs for details)
npm run pdf:bible-all        # MX-Bible (all formats)
npm run pdf:mx-all           # MX-Handbook (all formats)
npm run pdf:appendix         # HTML appendix pages
```

See individual package READMEs for detailed build instructions and requirements.

### Running Web Audit Suite

```bash
# Install dependencies
cd packages/web-audit-suite && npm install

# Run analysis (from repository root)
npm run audit:start -- -s https://example.com/sitemap.xml

# Run with limited URLs for testing
npm run audit:start -- -s https://example.com/sitemap.xml -c 10
```

See [packages/web-audit-suite/README.md](packages/web-audit-suite/README.md) for complete documentation.

## Key Organizational Principles

### The Book is Authoritative

The book manuscripts are the authoritative source for all terminology, patterns, and concepts. If there's a conflict between the book and implementation, the implementation must be updated to match the book.

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

### Terminology Flow

Changes must flow: **book → tool → documentation**

1. Update book manuscript first
2. Update Web Audit Suite implementation
3. Update all documentation

## Documentation

### Getting Started

- [ONBOARDING.md](ONBOARDING.md) - Complete developer onboarding guide (start here!)
- [CLAUDE.md](CLAUDE.md) - AI agent instructions and comprehensive project guide
- [LEARNINGS.md](LEARNINGS.md) - Battle-tested rules from actual mistakes
- [GIT-README.md](docs/architecture/GIT-README.md) - Git workflow guide for submodule management

### Package-Specific Documentation

Each package has its own README with detailed information:

- [MX-Bible README](packages/mx-the-bible/README.md) - Full book contents, build commands, status
- [MX-Handbook README](packages/mx-handbook/README.md) - Implementation handbook contents
- [MX-Gathering README](packages/mx-gathering/README.md) - Community resources
- [Shared Appendices README](packages/mx-appendices/README.md) - Implementation guides
- [MX-Code Examples README](packages/mx-code-examples/README.md) - Pattern examples
- [MX-Outputs README](packages/mx-outputs/README.md) - Generated content
- [Web Audit Suite README](packages/web-audit-suite/README.md) - Complete tool documentation

### Architecture Documentation

- [Repository Architecture](docs/architecture/doc-architecture.md) - Repository structure and design decisions
- [Web Audit Suite Architecture](docs/architecture/web-audit-architecture.md) - Tool architecture and pipeline design

### Strategic Planning

- [MX Strategic Review](docs/structure/MX-plan.md) - Machine Experience positioning and strategy
- [Repository Mapping](docs/structure/github-repositories.md) - Complete repository structure
- [UX Research Insights](docs/structure/steve-krug.md) - Don't Make Me Think analysis

## Working with Git Submodules

**⚠️ CRITICAL: This repository uses git submodules that require careful handling.**

**📖 See [GIT-README.md](docs/architecture/GIT-README.md) for comprehensive git workflow guidance.**

This workspace contains multiple git repositories:

1. **Main repo:** Root directory
2. **MX-Bible submodule:** `packages/mx-the-bible/` (full comprehensive guide)
3. **MX-Handbook submodule:** `packages/mx-handbook/` (implementation handbook)
4. **MX-Gathering submodule:** `packages/mx-gathering/` (community resources)
5. **Appendices submodule:** `packages/mx-appendices/` (shared appendices)
6. **Code examples submodule:** `packages/mx-code-examples/` (pattern examples)
7. **Outputs submodule:** `packages/mx-outputs/` (private, generated content)

**Always check `pwd` before git operations.** The [LEARNINGS.md](LEARNINGS.md) file documents common mistakes and their fixes.

## Development Environment

This repository includes comprehensive VS Code workspace configuration:

- **[.vscode/settings.json](.vscode/settings.json)** - Workspace settings with ESLint, Markdownlint, Prettier
- **[.vscode/tasks.json](.vscode/tasks.json)** - Quick-access tasks for common operations
- **[.vscode/launch.json](.vscode/launch.json)** - Debug configurations

Press **Cmd+Shift+B** to lint markdown. Press **F5** to debug Web Audit Suite.

## Who This Is For

- **Web Developers & Designers:** Build AI-agent-compatible interfaces
- **Business Leaders:** Understand strategic implications of AI agents
- **Agent Developers:** Build robust, well-behaved agents
- **Partners & Investors:** Evaluate commercial opportunities

## Writing Style

- British English throughout (organise, colour, whilst)
- Real, concrete examples over theory
- Technical accuracy with practical implications
- Sequential reading — each chapter builds on previous concepts

## License and Attribution

**Book Manuscripts (MX-Bible, MX-Handbook, Appendices):**

Copyright © 2026 Tom Cranstoun. All rights reserved.

The book manuscripts in this repository are not licensed for public use, reproduction, or distribution.

**Open Source Components (Web Audit Suite, Code Examples):**

Licensed under MIT License. When using or adapting these tools and patterns, please provide attribution:

"Based on Machine Experience (MX) patterns by Tom Cranstoun 'The MX Guy'"

**Author:** Tom Cranstoun "The MX Guy"

All MX (Machine Experience) concepts, patterns, and methodologies are attributed to Tom Cranstoun.

## Contact

- Email: <tom.cranstoun@gmail.com>
- Website: <https://allabout.network>
- LinkedIn: <https://www.linkedin.com/in/tom-cranstoun/>
