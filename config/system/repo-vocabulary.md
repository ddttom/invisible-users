# Vocabulary: Shorthand Reference

**Purpose:** Quick reference for conversational shorthand used between Tom and Claude Code. This eliminates repetitive explanations and makes communication more efficient.

---

## Repositories & Locations

| You say           | Claude understands                                                |
| ----------------- | ----------------------------------------------------------------- |
| **main repo**     | `/Users/tomcranstoun/Documents/GitHub/invisible-users/`           |
| **root**          | Main repo root (same as above)                                    |
| **outputs**       | `packages/mx-outputs/` submodule (invisible-users-outputs)        |
| **bible**         | `packages/mx-the-bible/` submodule (invisible-users-bible)        |
| **handbook**      | `packages/mx-handbook/` submodule (MX-The-Handbook)               |
| **slim**          | Same as handbook (synonym)                                        |
| **gathering**     | `packages/mx-gathering/` submodule (MX-Gathering)                 |
| **appendices**    | `packages/mx-appendices/` submodule                               |
| **code examples** | `packages/mx-code-examples/` submodule                            |
| **ucp**           | `packages/external/ucp/` submodule (Universal Commerce Protocol)  |
| **notes**         | `packages/notes/` submodule (development standards)               |
| **business**      | `packages/business/mx-business/` submodule (PRIVATE)              |

## Books & Products

| You say            | Claude understands                                               |
| ------------------ | ---------------------------------------------------------------- |
| **MX-Bible**       | The full comprehensive guide (official name, 13 chapters)        |
| **MX-Handbook**    | The implementation handbook (official name, 11 chapters)         |
| **MX-Gathering**   | Community resources repository (official name)                   |
| **books**          | Both MX-Bible and MX-Handbook                                    |
| **manuscript**     | Both books (when referring to content)                           |
| **project**        | Everything in workspace EXCEPT read-only repos (Notes, UCP)      |
| **workspace**      | Everything in workspace EXCEPT read-only repos                   |

## File Paths & Common Locations

| You say                  | Claude understands                                          |
| ------------------------ | ----------------------------------------------------------- |
| **blogs**                | `packages/mx-outputs/bible/blogs/mx/` (published HTML files)       |
| **blog drafts**          | `ingest/blog-drafts/` (markdown drafts)                    |
| **structure**            | `docs/structure/` (strategic planning docs)                        |
| **architecture**         | `docs/architecture/` (system design docs)                          |
| **skills**               | `.claude/skills/` (Claude Code custom skills)                      |
| **bible chapters**       | `packages/mx-the-bible/manuscripts/bible/` (chapter markdown files)|
| **handbook chapters**    | `packages/mx-handbook/chapters/` (chapter markdown files)          |
| **shared chapters**      | `docs/shared-chapters/` (Chapter 0)                                |
| **appendices**           | `packages/mx-appendices/` (Appendix A-M markdown files)            |
| **scrap**                | `scrap/` (temporary working files in main repo)                    |

## Workflows & Skills

| You say            | Claude understands                                                     |
| ------------------ | ---------------------------------------------------------------------- |
| **step commit**    | `/step-commit` skill (systematic multi-repo commit workflow)           |
| **create blog**    | `/create-blog` skill (markdown → HTML blog generation)                 |
| **news**           | `/news` skill (add verified industry news)                             |
| **review docs**    | `/review-docs` skill (check writing style compliance)                  |
| **humanizer**      | `/humanizer` skill (remove AI writing patterns)                        |
| **md fix**         | `/md-fix` skill (markdown linting and auto-fix)                        |
| **learnings**      | `/learnings-review` skill (update LEARNINGS.md)                        |
| **opportunity**    | `/opportunity` skill (analyze business opportunities)                  |
| **audit site**     | `/audit-site` skill (run Web Audit Suite + generate sales report)      |

## Blog Workflow Terms

| You say                | Claude understands                                              |
| ---------------------- | --------------------------------------------------------------- |
| **blog file**          | Markdown file in `ingest/blog-drafts/` OR HTML in blogs |
| **blog markdown**      | Source markdown in `ingest/blog-drafts/*.md`            |
| **blog HTML**          | Generated HTML in `outputs/bible/blogs/mx/*.html`               |
| **blog CSS**           | Scoped stylesheet `outputs/bible/blogs/mx/*-style.css`          |
| **social card**        | SVG social media card `outputs/bible/blogs/mx/*-social.svg`     |
| **blog diagrams**      | SVG diagrams `outputs/bible/blogs/mx/*-[diagram-name].svg`      |
| **generate blog**      | Run `node scripts/generate-blog-html.js <markdown-file>`        |

## Git & Version Control

| You say                  | Claude understands                                            |
| ------------------------ | ------------------------------------------------------------- |
| **commit submodule**     | Commit changes inside submodule FIRST, then update pointer    |
| **update pointer**       | Commit submodule SHA reference change in main repo            |
| **submodule-first**      | Core workflow: commit submodule → push → update main pointer  |
| **git -C**               | Use `git -C <path>` to avoid navigation errors                |

## Technical Terms & Concepts

| You say                     | Claude understands                                         |
| --------------------------- | ---------------------------------------------------------- |
| **served HTML**             | Static HTML (CLI and server-based agents)                  |
| **rendered HTML**           | Dynamic HTML after JavaScript (browser-based agents)       |
| **llms.txt**                | AI agent discovery file (YAML frontmatter + markdown)      |
| **WCAG 2.1 AA**             | Web accessibility standard (4.5:1 contrast for text)       |
| **Schema.org**              | Structured data vocabulary for AI agents                   |
| **UCP**                     | Universal Commerce Protocol (ecommerce standard)           |
| **AI agent**                | Software that navigates websites autonomously              |
| **silent failures**         | Agents failing without error logs                          |
| **convergence principle**   | Patterns for AI agents benefit accessibility users         |

## Common Phrases & Context

| You say                           | Claude understands                                      |
| --------------------------------- | ------------------------------------------------------- |
| **"the blog"**                    | Usually means `outputs/bible/blogs/mx/` directory       |
| **"main repo path"**              | `/Users/tomcranstoun/.../invisible-users/`              |
| **"check pwd"**                   | Run `pwd` before EVERY file operation (mandatory)      |
| **"in outputs"**                  | Currently in `outputs/` submodule directory             |
| **"back to root"**                | Navigate to main repo root                              |
| **"the manuscript"**              | Both books' chapter content                             |
| **"frontmatter"**                 | YAML metadata block at top of markdown files            |
| **"timeless rule"**               | Book manuscripts written as if they've always existed   |

## Usage Examples

**Efficient conversation patterns:**

```text
You: "Add this to bible chapter 5"
Claude: ✅ Understands: packages/mx-the-bible/manuscripts/bible/chapter-05-*.md

You: "Generate the blog"
Claude: ✅ Understands: Run scripts/generate-blog-html.js on draft markdown

You: "Commit outputs"
Claude: ✅ Understands: Commit outputs/ submodule FIRST, then update pointer

You: "Check the handbook"
Claude: ✅ Understands: packages/mx-handbook/ submodule

You: "Update gathering"
Claude: ✅ Understands: packages/mx-gathering/ submodule (public, editable)

You: "In structure"
Claude: ✅ Understands: docs/structure/ directory

You: "The blog needs a social card"
Claude: ✅ Understands: Generate *-social.svg for outputs/bible/blogs/mx/
```

---

## Notes

- This vocabulary evolves with our working patterns
- When in doubt, Claude will ask for clarification
- File paths are always relative to main repo root unless specified
- All git operations follow submodule-first workflow
- Always `pwd` before file operations (non-negotiable)

---

**Last updated:** 2026-01-26
