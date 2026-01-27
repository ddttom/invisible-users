---
author: "Tom Cranstoun"
date: "2026-01-23"
description: "Directory documentation for strategic planning documents, structural analysis, and high-level architectural decisions for the MX book series"
keywords: [strategic-planning, mx-framework, architecture, documentation, decision-log]
ai-instruction: |
  This README documents the docs/structure/ directory, which contains strategic
  planning documents for the MX (Machine Experience) book series project.

  Key files in this directory:
  - github-repositories.md: Auto-generated inventory of all GitHub repositories
  - steve-krug.md: Analysis of "Don't Make Me Think" from AI agent perspective
  - todo.txt: Task list and action items

  Note: Strategic business planning documents (including MX-plan.md) are maintained
  in the business-planning submodule (packages/business-planning/).

  When working on strategic decisions:
  1. Check packages/business-planning/strategy/MX-plan.md for current MX positioning
  2. Reference Decision Log section for past strategic decisions
  3. Follow "Usage Guidelines" when adding new planning documents
  4. Update this README when adding new strategic planning files

  Distinction from other docs/ directories:
  - docs/structure/ = Strategic planning and high-level decisions
  - docs/architecture/ = Technical implementation and build architecture
  - docs/for-ai/ = AI assistant writing guidance and style standards
  - docs/shared-chapters/ = Actual book content shared across both books
---

# Strategic Planning and MX Compliance Specifications

**Purpose:** This directory contains strategic planning documents, structural analysis, high-level architectural decisions, and **MX Compliance Specifications** for the MX book series and related projects.

---

## MX Compliance Specifications

### What is an MX Compliance Specification?

An **MX Compliance Specification** defines the metadata and structural requirements that content must meet to be considered "Machine Experience compliant." These specifications ensure content is equally accessible and understandable to both humans and AI agents.

**Core Principle:** Compliance specifications are **platform-agnostic** and **media-agnostic**. They define *what* must be present, not *how* it's implemented. A compliant system can use any technology stack as long as the required metadata and structure are present.

### The MX Compliance Trilogy

Three specifications cover the complete content lifecycle:

| Specification | Scope | Key Question Answered |
|---------------|-------|----------------------|
| **[cms-compliance.md](./cms-compliance.md)** | Internal CMS storage and workflow | "How should content be managed internally?" |
| **[mx-compliance.md](./mx-compliance.md)** | Rendered webpage output (HTML) | "What must the published page contain?" |
| **[mx-compliance-markdown.md](./mx-compliance-markdown.md)** | Source markdown files | "How should authors structure source content?" |

### How They Relate

```text
┌─────────────────────────────┐
│  AUTHOR CREATES             │
│  Markdown Source            │  ← mx-compliance-markdown.md
│  (YAML frontmatter +        │     defines source requirements
│   structured content)       │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  CMS STORES & MANAGES       │
│  Content Objects            │  ← cms-compliance.md
│  (database records,         │     defines internal metadata
│   file system, API)         │     and workflow states
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  SYSTEM PUBLISHES           │
│  Rendered Webpage           │  ← mx-compliance.md
│  (HTML with meta tags,      │     defines output requirements
│   Schema.org, semantic      │     for browsers and AI agents
│   structure)                │
└─────────────────────────────┘
```

### Why Three Specifications?

**Different audiences, different concerns:**

1. **Authors** need to know how to write source content (markdown spec)
2. **Developers** need to know how to store and process content (CMS spec)
3. **QA/Publishers** need to know what the output must contain (webpage spec)

**Separation enables flexibility:**

- Use any CMS (WordPress, Drupal, Contentful, custom)
- Use any static site generator (Hugo, Jekyll, Eleventy)
- Use any database (SQL, NoSQL, file-based)
- Use any templating system

As long as each layer meets its specification, the system is MX-compliant.

### Certification Levels

Each specification defines three certification levels:

| Level | Name | Description |
|-------|------|-------------|
| **1** | MX Basic | Minimum viable compliance - essential metadata present |
| **2** | MX Standard | Full compliance - complete metadata, accessibility, validation |
| **3** | MX Advanced | Excellence - AI optimisation, automation, API compliance |

### Quick Reference: What Each Spec Covers

**cms-compliance.md:**
- `mx_` prefixed metadata fields for content objects
- Five-stage lifecycle (draft → edit → preview → stage → publish)
- State transition rules and validation hooks
- Storage patterns (SQL, NoSQL, file-based, key-value)

**mx-compliance.md:**
- MX meta tags (`mx-compliant`, `mx-version`, `mx-content-type`, `mx-state`)
- SEO and Open Graph requirements
- Schema.org JSON-LD by content type
- Semantic HTML structure and ARIA landmarks
- WCAG 2.1 AA compliance

**mx-compliance-markdown.md:**
- YAML frontmatter schema (required and optional fields)
- Document structure (heading hierarchy, title handling)
- Content patterns (code blocks, lists, links, images)
- File naming and organisation conventions
- Validation checklist and lint rules

### AI Assistant Guidance

For detailed guidance on MX concepts for AI assistants, see **[CLAUDE.md](./CLAUDE.md)** in this directory.

---

---

## Directory Contents

**Note:** Strategic business planning documents (including MX-plan.md) have been moved to the **business-planning** submodule at `packages/business-planning/` for improved separation of concerns.

### 1. github-repositories.md

Complete inventory of GitHub repositories from both organizations

**Organizations Covered:**

- `ddttom` - Personal GitHub account
- `Digital-Domain-Technologies-Ltd` - Company organization

**Key Contents:**

- Auto-generated repository list
- Repository names, descriptions, last modified dates
- Sorted by last updated (newest first)
- Owner identification (ddttom vs DDT)

**Generation Instructions:**

```bash
# Fetch repository data
gh repo list ddttom --json name,description,updatedAt --limit 100 > /tmp/ddttom-repos.json
gh repo list Digital-Domain-Technologies-Ltd --json name,description,updatedAt --limit 100 > /tmp/digital-domain-repos.json

# Process and format (see ai-instruction in YAML frontmatter for full script)
node -e "[see file for complete script]"
```

**When to reference:**

- Auditing active projects
- Tracking repository status
- Planning repository organization
- Identifying stale or deprecated repositories
- Cross-referencing submodules

**Last Updated:** 2026-01-21

---

### 2. steve-krug.md

Analysis of "Don't Make Me Think, Revisited" from AI agent perspective

**Key Contents:**

- Comprehensive analysis of Steve Krug's usability classic
- 19 sections covering all chapters
- AI agent context added to human usability principles
- Machine usability vs human usability insights
- How classic UX principles apply to AI agents

**Source Materials:**

- 19 report files
- 18 modified chapter files
- Complete book analysis

**When to reference:**

- Understanding usability principles for AI agents
- Drawing parallels between human and agent UX
- Citing established usability research
- Explaining why "obvious to humans" ≠ "obvious to agents"
- Supporting MX framework with established UX theory

**Generated:** 2026-01-22

---

### 3. todo.txt

Task list and action items

**Purpose:** Tracking outstanding tasks, decisions needed, and implementation steps for strategic plans.

**When to reference:**

- Checking status of planned changes
- Identifying next steps
- Tracking decisions made vs pending

---

## Relationship to Project Structure

### How These Files Connect to Main Project

```text
docs/structure/                         # Technical strategic planning (this directory)
│
├── github-repositories.md ─────────┐
│                                    │
│                                    ├──→ Maps to CLAUDE.md repository structure
│                                    │    (main repo + 7 submodules)
│                                    │
│                                    └──→ References in docs/architecture/
│                                         (GIT-README.md, doc-architecture.md)
│
├── steve-krug.md ──────────────────┐
│                                    │
│                                    ├──→ Research foundation for MX principles
│                                    │    (usability theory → agent behavior)
│                                    │
│                                    └──→ Supporting material for book arguments
│                                         (why UX principles apply to agents)
│
packages/business-planning/          # Business strategic planning (submodule)
│
└── strategy/MX-plan.md ────────────┐
                                     │
                                     ├──→ Informs Chapter 0 content
                                     │    (docs/shared-chapters/chapter-00-what-are-ai-agents.md)
                                     │
                                     ├──→ Defines MX messaging
                                     │    (used throughout both books)
                                     │
                                     └──→ Sets terminology standards
                                          (packages/bible/, packages/mx-handbook/)
```

---

## Usage Guidelines

### When to Add New Files Here

**Add strategic planning documents that:**

1. **Define high-level architecture** - Not implementation details, but structural decisions
2. **Document major pivots** - Significant changes in direction or approach
3. **Provide research foundations** - External analysis that informs project decisions
4. **Map organizational structure** - Repository inventories, team structures, process flows
5. **Plan cross-cutting changes** - Decisions affecting multiple parts of the project

**Example additions:**

- New strategic review of book structure
- Analysis of competitor books
- Repository reorganization plans
- Major terminology or positioning changes
- Research findings from external sources

### When NOT to Add Files Here

**Don't add:**

- Implementation details (use `docs/architecture/` instead)
- Writing style guides (use `docs/for-ai/` instead)
- Build scripts or technical docs (use `scripts/` or `docs/architecture/`)
- Chapter outlines (use `packages/*/chapters/` in respective book repos)
- Marketing content (use `packages/sales-enablement/`)

---

## Related Documentation

**Within This Repository:**

- [docs/architecture/](../architecture/) - Technical architecture and implementation
  - `GIT-README.md` - Git workflow for multi-repository structure
  - `doc-architecture.md` - Repository structure and design decisions
  - `allabout-network-hosting-map.md` - Hosting paths and deployment
  - `HOSTING-SITEMAP-ASCII.md` - Visual sitemap of hosting structure

- [docs/for-ai/](../for-ai/) - AI assistant guidance
  - `writing-style.md` - Writing style guidelines
  - `yaml-frontmatter-template.md` - YAML frontmatter standards

- [docs/shared-chapters/](../shared-chapters/) - Content shared across both books
  - `chapter-00-what-are-ai-agents.md` - Shared introduction (informed by MX-plan.md)

- [docs/talks/](../talks/) - Presentation materials
  - `historical/` - Past presentations
  - `template/` - Presentation templates

**In Submodules:**

- `packages/bible/chapters/bible-plan.md` - Master plan for MX-Bible book
- `packages/mx-handbook/chapters/README.md` - MX-Handbook structure

**Business & Sales:**

- `packages/business-planning/` - Business strategy and planning (PRIVATE)
  - `plans/business-plan.md` - Complete business strategy
  - `pricing/book-pricing.md` - Book pricing strategy
  - `strategy/MX-plan.md` - Machine Experience strategic review
  - `strategy/strategy.md` - Comprehensive pricing and economics strategy
- `packages/sales-enablement/` - Sales execution materials (PRIVATE)
  - `pitches/` - Sales presentations
  - `outreach/` - Partner and reviewer engagement
  - `publishers/` - Publisher submissions

---

## File Maintenance

### Updating Files in This Directory

**github-repositories.md:**

- Regenerate monthly or when repositories change significantly
- Use GitHub CLI commands documented in file's YAML frontmatter
- Automated generation preferred (human editing should be minimal)
- Keep generation script up-to-date

**steve-krug.md:**

- Reference-only, rarely updated
- Add notes if new insights emerge from re-reading
- Link to specific sections when citing in book content

**todo.txt:**

- Update as tasks are completed
- Remove completed items or move to archive
- Add new strategic tasks as they emerge

---

## Decision Log

**Major Decisions Documented Here:**

| Date | Decision | File | Impact |
|------|----------|------|--------|
| 2026-01-23 | Separate business planning from sales execution | business-planning submodule created | Increased separation of concerns |
| 2026-01-22 | MX-first positioning (accessibility is bonus) | packages/business-planning/strategy/MX-plan.md | Terminology, messaging, Chapter 0 rewrite |
| 2026-01-22 | 5-stage agent journey framework | packages/business-planning/strategy/MX-plan.md | Core selling point, technical requirements |
| 2026-01-22 | Dual-audience strategy (Bible + Handbook) | packages/business-planning/strategy/MX-plan.md | Two books, shared Chapter 0, different depth |
| 2026-01-23 | Multi-repository structure via submodules | github-repositories.md | 1 main + 7 submodules |
| 2026-01-22 | Steve Krug analysis for agent UX | steve-krug.md | Research foundation |

---

## Quick Reference

### What Goes Where?

| Document Type | Location | Example |
|--------------|----------|---------|
| **Technical strategic planning** | `docs/structure/` | This directory (repository inventory, UX research) |
| **Business strategic planning** | `packages/business-planning/` | MX-plan.md, business-plan.md, pricing strategies |
| **Sales execution** | `packages/sales-enablement/` | Pitches, outreach, publisher submissions |
| **Technical architecture** | `docs/architecture/` | GIT-README.md, hosting maps |
| **Writing guidance** | `docs/for-ai/` | writing-style.md |
| **Shared content** | `docs/shared-chapters/` | Chapter 0 |
| **Book planning** | `packages/*/chapters/` | bible-plan.md |
| **Implementation guides** | `packages/shared-appendices/` | Appendices A-L |
| **Code examples** | `packages/shared-code-examples/` | Pattern implementations |

### Key Principles

1. **Strategic, not tactical** - High-level decisions, not implementation details
2. **Cross-cutting concerns** - Affects multiple parts of project
3. **Research and analysis** - External sources, competitor analysis, market research
4. **Decision documentation** - Why we chose this approach
5. **Reference material** - Foundation for arguments and decisions

---

## Contributing

When adding new strategic planning documents:

1. **Clear naming** - Use descriptive filenames (e.g., `mx-plan.md` not `plan.md`)
2. **YAML frontmatter** - Include title, author, date, description
3. **Update this README** - Add entry in "Directory Contents" section
4. **Date documents** - Include creation/last modified dates
5. **Link relationships** - Show how new document relates to existing materials
6. **Status tracking** - Mark planning vs ready vs implemented

---

**Last Updated:** January 2026
**Maintainer:** Tom Cranstoun
