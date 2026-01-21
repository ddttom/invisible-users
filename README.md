# The Invisible Users

## Designing the Web for AI Agents and Everyone Else

A practical guide to the collision between modern web design and AI agents, with a production-ready implementation tool.

**New to this project?** Start with [docs/repo/ONBOARDING.md](docs/repo/ONBOARDING.md) for a complete setup guide.

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

Two book variants derived from a shared manuscript source:

- **[The Bible](packages/bible/)** - Full comprehensive guide (13 chapters + appendices)
- **[Don't Make AI Think](packages/dont-make-ai-think/)** - Slim practical guide (10 chapters)
- **[Shared Appendices](packages/shared-appendices/)** - Implementation guides and resources (13 appendices)

See individual package READMEs for chapter lists, word counts, and build commands.

### Web Audit Suite

A production-ready Node.js website analysis tool implementing the book's patterns:

- **[Web Audit Suite](packages/web-audit-suite/)** - Complete documentation and usage guide

Features: SEO, accessibility (WCAG 2.1), performance, security, AI agent compatibility analysis.

### Universal Commerce Protocol (UCP)

Reference implementation demonstrating how AI agents interact with ecommerce systems:

- **[UCP](packages/ucp/)** - Open standard for commerce interoperability enabling AI agents to discover, navigate, and complete purchases

UCP demonstrates the practical application of patterns from the book in a real-world ecommerce context, showing how standardized protocols enable autonomous agent interactions.

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
│   ├── bible/                # "The Invisible Users" (full book) [SUBMODULE]
│   ├── dont-make-ai-think/   # "Don't Make AI Think" (slim guide) [SUBMODULE]
│   ├── shared-appendices/    # Shared implementation guides (A-L) [SUBMODULE]
│   ├── shared-code-examples/ # Production-ready code examples [SUBMODULE]
│   ├── ucp/                  # Universal Commerce Protocol [SUBMODULE]
│   ├── manuscript/           # Original manuscript repository [SUBMODULE - legacy]
│   └── web-audit-suite/      # Website analysis tool (NOT a submodule)
├── books/                    # Convenience symlinks (reduces cognitive load when navigating)
│   ├── bible -> ../packages/bible
│   ├── dont-make-ai-think -> ../packages/dont-make-ai-think
│   ├── appendices -> ../packages/shared-appendices
│   ├── code-examples -> ../packages/shared-code-examples
│   └── outputs -> ../outputs
│   # Note: Access books/bible instead of packages/bible/ to reduce mental overhead
├── blogs -> outputs/bible/blogs  # Symlink to outputs submodule blogs
├── outputs/                  # Generated content [SUBMODULE - private]
│   ├── bible/                # PDFs, HTML, marketing materials
│   └── dont-make-ai-think/   # Build outputs for slim guide
├── docs/                     # Documentation (main repo only)
│   ├── architecture/         # Architecture documentation
│   ├── repo/                 # Repository-level docs (ONBOARDING, etc.)
│   └── sales-enablement/     # Business materials, pitches, partners
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

- `blogs -> outputs/bible/blogs` (convenient blog access)
- `books/bible -> ../packages/bible` (convenient book access)
- `books/dont-make-ai-think -> ../packages/dont-make-ai-think`
- `books/appendices -> ../packages/shared-appendices`
- `books/code-examples -> ../packages/shared-code-examples`
- `books/outputs -> ../outputs`

**Why `books/` symlinks?** Reduces cognitive load when navigating. Access `books/bible/` instead of `packages/bible/` - one less directory level to remember. These symlinks are tracked in git but the `books/` directory is in `.gitignore` to prevent accidental additions.

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
npm run pdf:bible-all        # The Bible (all formats)
npm run pdf:dont-all         # Don't Make AI Think (all formats)
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

- [ONBOARDING.md](docs/repo/ONBOARDING.md) - Complete developer onboarding guide (start here!)
- [CLAUDE.md](CLAUDE.md) - AI agent instructions and comprehensive project guide
- [LEARNINGS.md](LEARNINGS.md) - Battle-tested rules from actual mistakes
- [GIT-README.md](docs/repo/GIT-README.md) - Git workflow guide for submodule management

### Package-Specific Documentation

Each package has its own README with detailed information:

- [The Bible README](packages/bible/README.md) - Full book contents, build commands, status
- [Don't Make AI Think README](packages/dont-make-ai-think/README.md) - Slim guide contents
- [Shared Appendices README](packages/shared-appendices/README.md) - Implementation guides
- [Web Audit Suite README](packages/web-audit-suite/README.md) - Complete tool documentation

### Architecture Documentation

- [Repository Architecture](docs/architecture/doc-architecture.md) - Repository structure and design decisions
- [Web Audit Suite Architecture](docs/architecture/web-audit-architecture.md) - Tool architecture and pipeline design

### Business Materials

- [Business Plan](docs/sales-enablement/business/business-plan.md) - Complete business strategy
- [Partner Kit](docs/sales-enablement/partners/PARTNER_KIT.md) - Partner resources
- [Publisher Proposal](docs/sales-enablement/publishers/oreilly-proposal.md) - O'Reilly submission

## Working with Git Submodules

**⚠️ CRITICAL: This repository uses git submodules that require careful handling.**

**📖 See [GIT-README.md](docs/repo/GIT-README.md) for comprehensive git workflow guidance.**

This workspace contains multiple git repositories:

1. **Main repo:** Root directory
2. **Bible submodule:** `packages/bible/` (full manuscript)
3. **Slim guide submodule:** `packages/dont-make-ai-think/` (practical guide)
4. **Appendices submodule:** `packages/shared-appendices/` (shared appendices)
5. **Code examples submodule:** `packages/shared-code-examples/` (pattern examples)
6. **UCP submodule:** `packages/ucp/` (Universal Commerce Protocol - ecommerce standard for AI agents)
7. **Outputs submodule:** `outputs/` (private, generated content)

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

## License

Copyright © Tom Cranstoun. All rights reserved.

This manuscript is not licensed for public use, reproduction, or distribution.

## Contact

- Email: <tom.cranstoun@gmail.com>
- Website: <https://allabout.network>
- LinkedIn: <https://www.linkedin.com/in/tom-cranstoun/>
