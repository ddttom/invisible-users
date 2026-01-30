# Repository Philosophy & Design Principles

---
mx:
  purpose: "Document core design principles and technical decisions governing repository structure, documentation standards, and tooling choices"
  audience: both
  stability: stable
  version: "1.0.0"
  last_updated: "2026-01-29"
  ai:
    context_provides:
      - design-principles
      - documentation-standards
      - technical-philosophy
      - architectural-decisions
    editable: true
    assistance: welcome
    context_required:
      - ../../CLAUDE.md
      - folder-layout.md
      - doc-architecture.md
  related_files:
    - ../../CLAUDE.md
    - folder-layout.md
    - doc-architecture.md
    - ../../LEARNINGS.md
  see_also: "CLAUDE.md contains operational guidance. This file documents the underlying philosophy and design decisions."
---

**Design principles and technical philosophy governing this repository.**

This document captures the "why" behind architectural decisions, establishing a foundation for consistent decision-making as the project evolves.

## Core Principles

### 1. Universal Accessibility First

**Principle:** All documentation and diagrams must be accessible in any environment without dependencies.

**Why:** The repository serves diverse users:
- Developers using terminals and CLI tools
- AI assistants processing plain text
- Contributors with varying toolchains
- Documentation readers on any platform

**Application:**
- ASCII diagrams over Mermaid/SVG
- Markdown over proprietary formats
- Plain text configuration where possible
- No JavaScript dependencies for viewing

### 2. Plain Text is Forever

**Principle:** Prefer plain text formats that remain readable without specialized tools.

**Why:**
- Text files survive format changes
- No vendor lock-in
- Version control optimized for text
- Accessible to all tools and systems

**Application:**
- Markdown for documentation
- YAML for metadata
- Text-based diagrams
- Human-readable configuration

### 3. Optimize for Change

**Principle:** Structure documentation and code to minimize the cost of changes.

**Why:**
- Single source of truth reduces update burden
- Centralized references prevent drift
- Clear ownership improves maintainability

**Application:**
- `config/system/folder-layout.md` - One canonical structure reference
- Cross-references instead of duplication
- Modular documentation architecture

## Documentation Standards

### ASCII Diagrams Philosophy

**Decision:** Use ASCII diagrams exclusively; no Mermaid, PlantUML, or graphical formats.

**Rationale:**

✅ **Universal Compatibility**
- Renders correctly in all environments (terminal, GitHub, text editors, IDEs)
- No rendering engine, browser, or JavaScript required
- Works in `cat`, `less`, `head`, `tail`, `grep`
- Perfect for SSH sessions and remote development

✅ **Zero Dependencies**
- Plain text - no processing pipeline needed
- No build step to convert formats
- No external libraries or rendering services
- Instant availability without installation

✅ **Performance**
- Instant display - no loading time
- No network requests for rendering
- Minimal file size
- No computational overhead

✅ **CLI-First Design**
- Terminal-native visualization
- Compatible with all CLI tools
- Readable in commit messages
- Works in documentation generators

✅ **Maintainability**
- Edit with any text editor
- No special tooling required
- Simple syntax - faster to create/modify
- Lower learning curve for contributors

✅ **Version Control Excellence**
- Text diffs show actual changes
- Merge conflicts easier to resolve
- No binary blob comparisons
- Git history remains meaningful

**Comparison:**

| Aspect | ASCII Diagrams | Mermaid/PlantUML |
|--------|----------------|------------------|
| Terminal viewing | ✅ Native | ❌ Requires rendering |
| Edit tools | ✅ Any text editor | ⚠️ Specialized editors better |
| Load time | ✅ Instant | ❌ Depends on renderer |
| Dependencies | ✅ None | ❌ JavaScript/Java |
| Version control | ✅ Clear diffs | ⚠️ Harder to read changes |
| AI agent friendly | ✅ Direct parsing | ⚠️ Requires interpretation |
| Cross-platform | ✅ Universal | ⚠️ Renderer-dependent |

**When to Break This Rule:** Never for repository documentation. External presentations or web content may use enhanced formats, but all repository documentation uses ASCII.

### Markdown Metadata Standards

**Decision:** All markdown files require YAML frontmatter with MX metadata.

**Rationale:**
- Machine-readable context for AI agents
- Consistent metadata across all files
- Self-documenting content
- Discoverable relationships between files

**Required Fields:**
- `purpose` - What this document does
- `audience` - Who uses it (human, machine, both)
- `stability` - Change frequency (experimental, stable, frozen)
- `ai.context_provides` - What context this file provides
- `related_files` - Cross-references

**See:** [docs/for-ai/yaml-frontmatter-template.md](../../docs/for-ai/yaml-frontmatter-template.md) for complete specification.

### Single Source of Truth

**Decision:** Each type of information has exactly one authoritative source.

**Rationale:**
- Eliminates conflicting information
- Reduces maintenance burden
- Clear ownership and update responsibility
- Prevents documentation drift

**Examples:**
- **Folder structure:** `config/system/folder-layout.md`
- **Git workflows:** `config/system/GIT-README.md`
- **Writing style:** `docs/for-ai/writing-style.md`
- **AI guidance:** `CLAUDE.md`
- **Battle-tested rules:** `LEARNINGS.md`

**All other files reference these sources rather than duplicating content.**

### Size-Neutral Documentation

**Decision:** Avoid hard-coded counts in documentation; use size-neutral language instead.

**Rationale:**
- Eliminates maintenance burden when counts change
- Prevents documentation drift across multiple files
- Focuses on concepts rather than volatile details
- Reduces likelihood of outdated information

**Examples:**

❌ **Avoid:**
- "9 chapters in the book"
- "11 submodules in the workspace"
- "8 repositories to manage"
- "13 appendices available"

✅ **Use instead:**
- "All chapters" or "multiple chapters"
- "All submodules" or "the submodules"
- "All repositories" or "the repositories"
- "Appendices A-M" or "shared appendices"

**When counts ARE appropriate:**
- Technical specifications (e.g., "WCAG 2.1 requires 4.5:1 contrast ratio")
- Version numbers
- Standards references
- When the specific number is the key information

**When to break this rule:** If the count is critical to understanding (e.g., "both books in the series"), use it. Otherwise, prefer size-neutral phrasing.

## Repository Structure Philosophy

### Separation of Concerns

**Decision:** Use git submodules to separate content from tooling.

**Rationale:**
- Clean version history (content changes don't pollute tool history)
- Independent versioning
- Reusable content without build dependencies
- Clear ownership boundaries

**Architecture:**
- **Main repository:** Build tools, configuration, orchestration
- **Content submodules:** Pure markdown, no dependencies
- **Outputs submodule:** Generated materials (private)

### Configuration Organization

**Decision:** Organize config by domain: `config/book/`, `config/system/`

**Rationale:**
- Clear namespace separation
- Easier to find relevant configuration
- Logical grouping by purpose
- Scalable structure

**Structure:**
```text
config/
├── book/           ← Book-specific configuration
│   └── book-svg-style.md
└── system/         ← System-wide documentation
    ├── folder-layout.md
    └── repo-philosophy.md
```

### No Symlinks

**Decision:** Direct path references only; no convenience symlinks.

**Rationale:**
- Reduces navigation confusion in multi-repository workspace
- Eliminates broken symlink issues
- Clearer for AI agents and automated tools
- Simpler mental model

**History:** Symlinks (`AGENTS.md`, `GEMINI.md`, `blogs`, `books/`) were removed 2026-01-29 after causing confusion.

## Metadata Standards

### MX Code Metadata Specification

**Decision:** Implement MX Code Metadata Specification throughout repository.

**Rationale:**
- Maximizes AI agent comprehension
- Self-documenting codebase
- Clear context for all files
- Standard metadata patterns

**Implementation:**
- YAML frontmatter in markdown files
- `.mx.yaml` files for directories
- `.mxignore` for AI exclusion patterns
- Inline `@mx:` annotations in code

**Specification:** [packages/mx-gathering/specifications/mx-code-metadata-spec.md](../../packages/mx-gathering/specifications/mx-code-metadata-spec.md)

### AI Exclusion Patterns

**Decision:** Use `.mxignore` to exclude infrastructure files from AI context.

**Rationale:**
- Reduces AI context noise
- Focuses attention on actual project content
- Improves AI assistant efficiency
- Consistent exclusion patterns

**Pattern:** Inherits from `.gitignore` but focuses on content relevance rather than version control.

## File Naming Conventions

### Hidden Configuration Files

**Decision:** Prefix configuration files with dot (`.mx.yaml`, not `mx.yaml`).

**Rationale:**
- **For humans:** Reduces visual clutter in directory listings
- **For machines:** Remains fully discoverable via standard APIs
- **Consistency:** Aligns with `.gitignore`, `.env`, `.editorconfig` conventions

**"Design for Both" Principle:** Hidden files respect human cognitive load while maintaining complete machine accessibility.

### Descriptive Naming

**Decision:** Use clear, descriptive names over abbreviations.

**Examples:**
- `folder-layout.md` (not `structure.md`)
- `repo-philosophy.md` (not `principles.md`)
- `doc-architecture.md` (not `arch.md`)

**Rationale:**
- Immediately clear purpose
- No ambiguity
- Better for search and discovery
- Self-documenting file system

## Version Control Practices

### Submodule-First Workflow

**Decision:** Always commit and push submodules before updating main repository pointers.

**Rationale:**
- Prevents dangling references
- Ensures all commits are available remotely
- Maintains referential integrity
- Predictable behavior

**See:** [config/system/GIT-README.md](../../config/system/GIT-README.md) for complete workflow.

### Commit Message Standards

**Decision:** Clear, descriptive commits without tool attribution.

**Rationale:**
- Focus on changes, not tools
- Professional commit history
- Meaningful git log
- No noise from "Generated with X" messages

### Use `git mv` for Renaming

**Decision:** Always use `git mv` for renaming tracked files.

**Rationale:**
- Preserves file history
- Git tracks renames correctly
- Easier to trace changes
- Better diff visualization

### Pre-Push Workflow Validation

**Decision:** Validate GitHub Actions workflows before pushing to prevent CI failures.

**Rationale:**
- Catches configuration errors before they reach CI
- Prevents broken builds from blocking development
- Validates submodule paths against `.gitmodules`
- Detects outdated or incorrect workflow references
- Reduces debugging time and CI resource usage

**Implementation:**
- Pre-push hook at `.claude/hooks/pre-push.sh`
- Validates all workflow files in `.github/workflows/`
- Checks for outdated submodule paths (e.g., `packages/bible` → `packages/mx-the-bible`)
- Verifies referenced submodules exist in `.gitmodules`
- Validates YAML syntax using Python if available
- Blocks push with clear error messages if validation fails

**What it catches:**
- Non-existent submodule paths
- Outdated legacy paths from renamed repositories
- YAML syntax errors
- Mismatched workflow references

**Example error prevented:**
```bash
❌ ERROR: ci.yml contains outdated submodule paths
   Found old paths that should be updated:
     25:        git submodule update --init --depth 1 packages/bible
```

**History:** Added 2026-01-30 after CI failure caused by workflows referencing non-existent `packages/bible` instead of `packages/mx-the-bible`.

## Build System Philosophy

### Centralized Build Control

**Decision:** All build commands run from main repository only.

**Rationale:**
- Single source of truth for builds
- Consistent build environment
- Simplified dependency management
- Clear orchestration point

**Submodules cannot be built independently** - this is intentional.

### No Node Modules in Content

**Decision:** Content submodules have no `package.json` or dependencies.

**Rationale:**
- Pure content repositories
- No dependency sprawl
- Faster clones
- Clear separation of concerns

## Technology Choices

### Pandoc for Document Generation

**Decision:** Use Pandoc for markdown to HTML/PDF conversion.

**Rationale:**
- Industry-standard tool
- Extensive format support
- Stable, mature codebase
- Active maintenance

### British English

**Decision:** British English for prose, international standards for code/metadata.

**Rationale:**
- **Prose:** Author preference, consistency
- **Code/JSON:** Follow international standards (Schema.org uses "Organization")
- **Balance:** Readability for humans, compatibility for machines

**Examples:**
- Prose: "organise", "colour", "whilst"
- Code: `"@type": "Organization"` (Schema.org standard)
- HTML: `lang="en-GB"` (correct language declaration)

## Future Considerations

### Principles for New Decisions

When making architectural decisions, consider:

1. **Does it work in a terminal?** (CLI-first design)
2. **Is it plain text?** (Universal accessibility)
3. **Does it require dependencies?** (Minimize tooling)
4. **Is there a single source of truth?** (Avoid duplication)
5. **Will it work in 10 years?** (Long-term stability)

### Documenting New Philosophies

New principles should be:
- **Justified:** Clear rationale with examples
- **Consistent:** Align with existing principles
- **Actionable:** Specific guidance for implementation
- **Tested:** Proven through use

Add new sections to this file as architectural decisions solidify.

## Related Documentation

- **Folder Structure:** [folder-layout.md](folder-layout.md) - Complete repository structure
- **Architecture:** [docs/architecture/doc-architecture.md](doc-architecture.md) - Build systems and workflows
- **AI Guidance:** [CLAUDE.md](../../CLAUDE.md) - Operational guidance for AI assistants
- **Git Workflows:** [config/system/GIT-README.md](../../config/system/GIT-README.md) - Multi-repository git patterns
- **Writing Style:** [docs/for-ai/writing-style.md](../../docs/for-ai/writing-style.md) - Content standards
- **Lessons Learned:** [LEARNINGS.md](../../LEARNINGS.md) - Battle-tested rules from mistakes

## Maintenance

This file should be updated when:
- New architectural principles are established
- Technical decisions require documentation
- Design patterns change
- Philosophy evolves through experience

**Last comprehensive review:** 2026-01-29
