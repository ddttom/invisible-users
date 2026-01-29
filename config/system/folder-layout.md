# Complete Repository Folder Layout

---
mx:
  purpose: "Centralized reference for complete folder structure across main repository and all submodules"
  audience: both
  stability: stable
  version: "1.0.0"
  last_updated: "2026-01-29"
  ai:
    context_provides:
      - repository-structure
      - folder-hierarchy
      - submodule-layout
      - navigation-reference
    editable: true
    assistance: welcome
    context_required:
      - CLAUDE.md
  related_files:
    - ../../CLAUDE.md
    - ../../README.md
    - ../../docs/architecture/GIT-README.md
  see_also: "CLAUDE.md contains navigation rules and workflow guidance. This file provides the complete folder structure reference."
---

**Single source of truth for repository folder structure.**

This document consolidates all folder structure information from across the repository into one centralized reference. All other documentation files should reference this file rather than duplicating folder structures.

## Main Repository (Hub)

```text
invisible-users/  (Main Repository - Hub)
├── .claude/                          ← Claude Code configuration
│   ├── skills/                       ← 11 custom skills
│   │   ├── audit-site/
│   │   ├── blog-workflow/
│   │   ├── create-blog/
│   │   ├── humanizer/
│   │   ├── learnings-review/
│   │   ├── md-fix/
│   │   ├── md-workflow/
│   │   ├── news/
│   │   ├── opportunity/
│   │   ├── review-docs/
│   │   └── step-commit/
│   ├── hooks/                        ← Git hooks
│   │   ├── pre-tool-use.sh
│   │   ├── pre-commit.sh
│   │   ├── pre-push.sh
│   │   └── post-tool-use.sh
│   ├── settings.local.json           ← Local permissions and configuration
│   └── pwd-reminder.md               ← Working directory verification guide
├── .github/                          ← GitHub configuration
│   └── workflows/                    ← CI/CD workflows
├── .vscode/                          ← VS Code settings (recommended config)
│   ├── settings.json
│   ├── extensions.json
│   ├── tasks.json
│   └── launch.json
├── config/                           ← Project configuration
│   ├── .markdownlint.json            ← Markdown linting rules
│   ├── book/                         ← Book-specific configuration
│   │   ├── book-svg-style.md         ← SVG illustration style guide
│   │   └── vocabulary.md             ← Conversational shorthand reference
│   └── system/                       ← System documentation
│       ├── folder-layout.md          ← This file
│       └── repo-philosophy.md        ← Design principles and technical philosophy
├── docs/                             ← Documentation
│   ├── architecture/                 ← Architecture documentation
│   │   ├── GIT-README.md             ← Comprehensive git workflow guidance
│   │   ├── TIMELESS-MANUSCRIPT-RULE.md ← Writing standards
│   │   ├── doc-architecture.md       ← Repository structure design
│   │   ├── allabout-network-hosting-map.md ← Hosting path mapping
│   │   ├── HOSTING-SITEMAP-ASCII.md  ← ASCII visual sitemap
│   │   └── HOSTING-QUICK-REFERENCE.md ← Deployment reference
│   ├── for-ai/                       ← AI assistant guidance
│   │   ├── writing-style.md          ← Complete writing style guide
│   │   └── yaml-frontmatter-template.md ← YAML metadata templates
│   ├── shared-chapters/              ← Shared book content
│   │   └── chapter-00-what-are-ai-agents.md ← Chapter 0 (shared)
│   ├── structure/                    ← Strategic planning documents
│   │   ├── README.md                 ← Directory guide
│   │   ├── MX-plan.md                ← Machine Experience strategy
│   │   ├── github-repositories.md    ← Repository structure mapping
│   │   ├── steve-krug.md             ← UX research insights
│   │   ├── blog-metadata-schema.md   ← Blog metadata and state tracking
│   │   ├── todo.txt                  ← Private development tasks
│   │   └── blog-drafts/              ← Blog post drafts
│   └── talks/                        ← Presentation materials
│       ├── historical/               ← Archived presentations
│       └── template/                 ← Reusable templates
├── scripts/                          ← Build and generation scripts
│   ├── .mx.yaml                      ← MX metadata for scripts
│   ├── generate-blog-html.js         ← Blog generation (main)
│   ├── preprocess-ascii-to-svg.js    ← ASCII diagram conversion
│   └── [other scripts...]
├── packages/                         ← Book manuscripts, tools, and submodules
│   ├── mx-the-bible/                 ← SUBMODULE: MX-Bible (see below)
│   ├── mx-handbook/                  ← SUBMODULE: MX-Handbook (see below)
│   ├── mx-gathering/                 ← SUBMODULE: MX-Gathering (see below)
│   ├── mx-appendices/                ← SUBMODULE: Shared Appendices (see below)
│   ├── mx-code-examples/             ← SUBMODULE: Code Examples (see below)
│   ├── mx-outputs/                   ← SUBMODULE: Generated Content (see below)
│   ├── external/                     ← External reference submodules
│   │   └── ucp/                      ← SUBMODULE: UCP (see below)
│   ├── business/                     ← Business strategy submodules
│   │   └── mx-business/              ← SUBMODULE: Business Planning (see below)
│   ├── notes/                        ← SUBMODULE: Development Notes (see below)
│   └── web-audit-suite/              ← NOT A SUBMODULE (regular directory)
│       ├── .mx.yaml                  ← MX metadata
│       ├── src/                      ← Tool source code
│       │   ├── collectors/           ← Data collection modules
│       │   ├── core/                 ← Core functionality
│       │   ├── reporters/            ← Report generation
│       │   └── utils/                ← Utility functions
│       ├── test/                     ← Test files
│       ├── results/                  ← Analysis results (gitignored)
│       ├── package.json
│       └── README.md
├── .gitignore                        ← Git exclusions (with MX metadata v2.0.0)
├── .gitmodules                       ← Submodule configuration
├── .mxignore                         ← AI exclusion patterns
├── .markdownlintignore               ← Markdown linting exclusions
├── .htmlvalidate.json                ← HTML validation config
├── .mx.yaml                          ← Root MX metadata
├── AGENTS.md                         ← Symlink to CLAUDE.md (REMOVED)
├── GEMINI.md                         ← Symlink to CLAUDE.md (REMOVED)
├── CLAUDE.md                         ← Main project guidance (single source of truth)
├── CHANGELOG.md                      ← Version history and release notes
├── LEARNINGS.md                      ← Battle-tested rules from mistakes
├── README.md                         ← Project overview
├── ONBOARDING.md                     ← Developer onboarding guide
├── package.json                      ← Root workspace configuration
├── package-lock.json
├── llms.txt                          ← Root AI discovery file
├── foundation-statement.md           ← Project foundation principles
└── mx-founding-member-acceptance.md  ← MX community membership
```

## Submodule 1: MX-Bible (packages/mx-the-bible/)

**Repository:** `invisible-users-manuscript`
**Purpose:** Full comprehensive guide (formerly "The Invisible Users")

```text
packages/mx-the-bible/
├── .claude/                          ← Claude Code configuration
│   ├── skills/                       ← Submodule-specific skills
│   └── settings.local.json
├── .git                              ← Git repository
├── .gitignore
├── CLAUDE.md                         ← Submodule guidance
├── CONTRIBUTING.md
├── LICENSE
├── README.md                         ← MX-Bible README
├── manuscripts/                      ← Manuscript files
│   ├── chapter-01-*.md               ← Chapter markdown files
│   ├── chapter-02-*.md
│   ├── [chapters 03-13...]
│   └── [YAML frontmatter in each]
├── code/                             ← Code examples
│   └── [implementation examples]
├── marketing/                        ← Marketing materials
│   └── [promotional content]
├── web/                              ← Web content
│   ├── index.html
│   └── [web assets]
└── todo.txt                          ← Task tracking
```

## Submodule 2: MX-Handbook (packages/mx-handbook/)

**Repository:** `MX-The-Handbook`
**Purpose:** Implementation handbook for developers and designers (11 chapters)

```text
packages/mx-handbook/
├── .git
├── .gitignore
├── README.md                         ← MX-Handbook README
├── chapters/                         ← 11 chapter markdown files
│   ├── chapter-01-*.md
│   ├── chapter-02-*.md
│   ├── [chapters 03-11...]
│   └── [YAML frontmatter in each]
└── [NO .claude/ directory]
```

## Submodule 3: MX-Gathering (packages/mx-gathering/)

**Repository:** `MX-Gathering`
**Purpose:** Community resources, event templates, discussion archives, and thought leadership (PUBLIC, EDITABLE)

```text
packages/mx-gathering/
├── .claude/                          ← Claude Code configuration
│   ├── skills/
│   └── settings.local.json
├── .git
├── .gitignore
├── CLAUDE.md                         ← Submodule guidance
├── README.md                         ← MX-Gathering README
├── TODO.txt                          ← Public task tracking
├── llms.txt                          ← AI discovery file
├── Futures/                          ← Future developments
│   └── [future planning documents]
├── contributors/                     ← Contributor information
│   └── [contributor profiles]
├── discussions/                      ← Discussion archives
│   └── [community discussions]
├── docs/                             ← Documentation
│   ├── development/
│   └── [other docs]
├── events/                           ← Event materials
│   ├── templates/
│   └── [event resources]
└── specifications/                   ← MX specifications (21 documents)
    ├── mx-code-metadata-spec.md      ← MX Code Metadata Specification
    ├── mx-base-spec.md
    ├── mx-content-fragment-spec.md
    ├── mx-data-lake-spec.md
    ├── mx-database-metadata-spec.md
    ├── mx-media-metadata-spec.md
    ├── mx-structured-data-spec.md
    ├── [10 chapter files for MX Specifications Book]
    ├── [3 appendix files]
    └── structured-data-spec-announcement.md
```

## Submodule 4: MX-Appendices (packages/mx-appendices/)

**Repository:** `invisible-users-appendices`
**Purpose:** Shared appendices (A-M) for all books

```text
packages/mx-appendices/
├── .git
├── .gitignore
├── README.md                         ← Appendices README
├── appendix-a-*.md                   ← Appendix A
├── appendix-b-*.md                   ← Appendix B
├── appendix-c-*.md                   ← Appendix C
├── appendix-d-ai-friendly-html-guide.txt ← Appendix D (TXT format)
├── appendix-d-ai-friendly-html-guide.md  ← Appendix D (MD wrapper)
├── appendix-e-*.md                   ← Appendix E
├── appendix-f-*.md                   ← Appendix F
├── appendix-g-*.md                   ← Appendix G
├── appendix-h-live-llms.txt          ← Appendix H (TXT format)
├── appendix-h-live-llms.md           ← Appendix H (MD wrapper)
├── appendix-i-*.md                   ← Appendix I
├── appendix-j-*.md                   ← Appendix J
├── appendix-k-*.md                   ← Appendix K
├── appendix-l-*.md                   ← Appendix L
└── appendix-m-*.md                   ← Appendix M
```

## Submodule 5: MX-Code-Examples (packages/mx-code-examples/)

**Repository:** `invisible-users-code-examples`
**Purpose:** Good vs bad pattern implementations

```text
packages/mx-code-examples/
├── .git
├── .gitignore
├── README.md                         ← Code examples README
├── agent-friendly-starter-kit/       ← Good vs bad patterns
│   ├── good/                         ← Correct implementations
│   │   └── [pattern examples]
│   └── bad/                          ← Anti-patterns
│       └── [pattern examples]
└── examples/                         ← Production code
    └── [real-world implementations]
```

## Submodule 6: MX-Outputs (packages/mx-outputs/)

**Repository:** `invisible-users-outputs` (PRIVATE)
**Purpose:** All generated content (PDFs, HTML, marketing)

```text
packages/mx-outputs/
├── .git
├── .gitignore
├── README.md                         ← Outputs README
├── bible/                            ← MX-Bible outputs
│   ├── blogs/                        ← Blog posts
│   │   └── mx/                       ← MX-related blog posts
│   │       ├── [filename].html       ← Blog post HTML
│   │       ├── [filename].css        ← WCAG 2.1 AA compliant styling
│   │       ├── [filename]-social.svg ← Social media card (1200x630px)
│   │       └── [filename]-[diagram].svg ← Prefixed SVG diagrams
│   ├── presentations/                ← Slide decks
│   └── marketing/                    ← Marketing materials
├── mx/                               ← MX-Handbook outputs
│   └── [generated files]
└── the-bible/                        ← Legacy/alternate content
    └── [historical outputs]
```

## Submodule 7: UCP (packages/external/ucp/)

**Repository:** `Universal-Commerce-Protocol/ucp` (External Reference)
**Purpose:** Universal Commerce Protocol - standardized ecommerce API for AI agents

```text
packages/external/ucp/
├── .git
├── .gitignore
├── README.md                         ← UCP overview
├── docs/                             ← UCP documentation
│   └── [specification documents]
├── generated/                        ← Generated schemas and types
│   ├── schema.json
│   └── [type definitions]
├── main.py                           ← Schema generator
└── [NO .claude/ directory]
```

## Submodule 8: MX-Business (packages/business/mx-business/)

**Repository:** `MX-business-planning` (PRIVATE)
**Purpose:** Business strategy and planning documents

```text
packages/business/mx-business/
├── .git
├── .gitignore
├── CLAUDE.md                         ← AI guidance
├── README.md                         ← Business planning README
├── plans/                            ← Business plans
│   └── [executive summaries, business plans]
├── strategy/                         ← Strategic positioning
│   ├── MX-plan.md
│   └── [strategy documents]
├── opportunities/                    ← Market opportunity analysis
│   └── [opportunity assessments]
├── pricing/                          ← Pricing strategies
│   └── [financial models]
└── products/                         ← Product business context
    └── [product documentation]
```

## Submodule 9: Notes (packages/notes/)

**Repository:** `Notes`
**Purpose:** Coding standards and development practices reference

```text
packages/notes/
├── .claude/                          ← Claude Code configuration
│   ├── skills/
│   └── settings.local.json
├── .git
├── .gitignore
├── .markdownlint.json
├── .markdownlintignore
├── CHANGELOG.md
├── CLAUDE.md                         ← Submodule guidance
├── Starter.md                        ← Coding standards and project setup
├── Vibe coding backend.md            ← Backend architecture guidelines
├── markdown-lint.md                  ← Markdown linting guide
├── Todo.md                           ← Task tracking
├── urgent.md                         ← Urgent tasks
├── [other development guidelines...]
└── node_modules/                     ← Dependencies (gitignored)
```

## Navigation Notes

### Symlinks (REMOVED as of 2026-01-29)

The following symlinks were removed to reduce navigation confusion:

- `AGENTS.md` → `CLAUDE.md` (removed)
- `GEMINI.md` → `CLAUDE.md` (removed)
- `blogs` → `packages/mx-outputs/bible/blogs` (removed)
- `books/` directory with all convenience symlinks (removed)

### Key File References

- **For detailed architecture and workflows:** See [docs/architecture/doc-architecture.md](../../docs/architecture/doc-architecture.md) - Build systems, workflows, diagrams
- **For git workflows:** See [docs/architecture/GIT-README.md](../../docs/architecture/GIT-README.md)
- **For writing style:** See [docs/for-ai/writing-style.md](../../docs/for-ai/writing-style.md)
- **For navigation rules:** See [CLAUDE.md](../../CLAUDE.md) - Section "Repository Navigation Map"
- **For MX metadata specification:** See [packages/mx-gathering/specifications/mx-code-metadata-spec.md](../../packages/mx-gathering/specifications/mx-code-metadata-spec.md)

## Repository Count

- **Main repository:** 1 (invisible-users)
- **Submodules:** 9
  - mx-the-bible
  - mx-handbook
  - mx-gathering
  - mx-appendices
  - mx-code-examples
  - mx-outputs
  - external/ucp
  - business/mx-business
  - notes
- **Total git repositories:** 10

## Maintenance

This file should be updated whenever:

- New directories are added to main repository
- New submodules are added
- Significant folder structure changes occur in any repository
- Submodule purposes or contents change

**Last comprehensive review:** 2026-01-29
