# MX Principles for Repositories

---
mx:
  purpose: "Define Machine Experience (MX) principles for repository design and establish standards for implementing MX metadata in code repositories"
  audience: both
  stability: stable
  version: "1.0.0"
  last_updated: "2026-01-30"
  ai:
    context_provides:
      - mx-principles
      - metadata-standards
      - design-for-both
      - ai-agent-optimization
    editable: true
    assistance: welcome
    context_required:
      - ../../packages/mx-gathering/specifications/mx-code-metadata-spec.md
      - ../../config/system/repo-philosophy.md
      - ../../CLAUDE.md
  related_files:
    - ../../packages/mx-gathering/specifications/mx-code-metadata-spec.md
    - ../../packages/mx-gathering/specifications/mx-base-spec.md
    - ../../config/system/repo-philosophy.md
    - ../../CLAUDE.md
  see_also: "MX Code Metadata Specification provides complete technical details. This document establishes principles and standards for applying MX to repositories."
---

**Machine Experience (MX) design principles for code repositories.**

This document defines what it means to design repositories for both human developers and AI agents, establishing standards that maximize comprehension and usability for machine processors whilst maintaining excellent human ergonomics.

## What is Machine Experience (MX)?

**Machine Experience** is the practice of designing systems, content, and interfaces to be maximally understandable and usable by AI agents and automated processors, without compromising human usability.

**Core philosophy:** Design for both audiences simultaneously, not one at the expense of the other.

## Core MX Principles

### 1. Design for Both (Humans + Machines)

**Principle:** Every design decision should optimize for both human developers and AI agents simultaneously.

**Why it matters:**
- Humans need intuitive, readable structures
- Machines need explicit, parseable metadata
- The best solutions serve both without compromise

**Examples in practice:**

✅ **Hidden configuration files** (`.mx.yaml`, `.gitignore`)
- **For humans:** Reduces visual clutter in directory listings
- **For machines:** Fully discoverable via standard filesystem APIs
- **Result:** Clean workspace + complete machine accessibility

✅ **YAML frontmatter in markdown**
- **For humans:** Readable content with clear document structure
- **For machines:** Structured metadata for context and relationships
- **Result:** Self-documenting files

✅ **ASCII diagrams over Mermaid**
- **For humans:** Instant viewing in terminal, no rendering needed
- **For machines:** Directly parseable text, no JavaScript execution
- **Result:** Universal accessibility

❌ **Anti-pattern:** Mermaid diagrams
- Requires rendering engine for humans
- Requires interpretation layer for machines
- Fails "design for both" test

### 2. Metadata-Driven Architecture

**Principle:** Use structured metadata to make content and code maximally machine-readable whilst remaining human-readable.

**Why it matters:**
- AI agents need context to understand purpose and relationships
- Humans benefit from explicit documentation
- Metadata enables discoverability and navigation

**Implementation layers:**

1. **Repository level** (`.mx.yaml` at root)
   - Project context and conventions
   - AI assistance preferences
   - Technology stack declarations

2. **Directory level** (`packages/*/.mx.yaml`)
   - Package-specific context
   - Override repository defaults
   - Declare provided context

3. **File level** (YAML frontmatter in markdown)
   - Document purpose and audience
   - Stability and version information
   - Context requirements and provisions

4. **Code level** (`@mx:` annotations)
   - Function behavior declarations
   - AI editing permissions
   - Context requirements

**Required metadata fields:**
- `purpose` - What this file/directory/function does
- `audience` - `human`, `machine`, or `both`
- `stability` - `experimental`, `unstable`, `stable`, `frozen`
- `ai.context_provides` - What context this provides to agents
- `related_files` - Cross-references to related content

**See:** [MX Code Metadata Specification](../../packages/mx-gathering/specifications/mx-code-metadata-spec.md) ("MX Code Metadata Specification" at <https://github.com/ddttom/invisible-users/blob/main/packages/mx-gathering/specifications/mx-code-metadata-spec.md>) for complete technical specification.

### 3. Context Declaration

**Principle:** Files explicitly declare what context they provide and what context they require.

**Why it matters:**
- AI agents need to understand dependencies
- Prevents missing critical context
- Enables intelligent navigation
- Reduces errors from incomplete understanding

**Context provides** (`ai.context_provides`):
What this file defines or explains that other files might need.

```yaml
ai:
  context_provides:
    - git-workflows
    - submodule-patterns
    - multi-repository-structure
```

**Context required** (`ai.context_required`):
What files must be read before modifying this one.

```yaml
ai:
  context_required:
    - ../../CLAUDE.md
    - folder-layout.md
    - GIT-README.md
```

**Benefits:**
- AI agents know what to read first
- Reduces mistakes from incomplete context
- Creates self-documenting dependency graph
- Enables smarter tooling

### 4. Universal Accessibility

**Principle:** Content must be accessible to all types of AI agents regardless of their capabilities.

**Why it matters:**
- CLI agents (can't execute JavaScript)
- Browser agents (can render dynamic content)
- Server-based agents (no display capabilities)
- IDE-integrated agents (limited context windows)

All must be able to access and understand the content.

**Design implications:**

✅ **Plain text formats**
- Markdown over proprietary formats
- YAML/JSON over binary configuration
- ASCII diagrams over image-based
- Text-based documentation

✅ **Explicit over implicit**
- Semantic HTML with ARIA landmarks
- Schema.org structured data
- Declared relationships in metadata
- No hidden dependencies

✅ **Static over dynamic**
- Served HTML accessible to CLI agents
- Progressive enhancement, not requirement
- No JavaScript-only content
- Fallbacks for all features

❌ **Anti-patterns:**
- JavaScript-required content
- Binary-only documentation
- Implicit relationships
- Hidden configuration

### 5. Context-Preserving References

**Principle:** Links and references must remain meaningful when documents are separated from their repository context.

**Why it matters:**
- Documents get extracted (PDF, downloads, AI context windows)
- Relative paths break when files leave the repository
- Humans struggle to mentally map complex folder structures
- AI agents burn tokens reconstructing context
- References should work in all circumstances

**The problem with relative-only links:**

```markdown
❌ BAD: See [repo-philosophy.md](../../config/system/repo-philosophy.md) ("Repository Philosophy & Design Principles" at <https://github.com/ddttom/invisible-users/blob/main/config/system/repo-philosophy.md>)
```

**What breaks:**
- **Humans:** Cannot understand "../../config/system/" without visualizing folder tree
- **Machines:** Link is meaningless if document is copied, downloaded, or processed outside repository
- **Cost:** AI agents spend tokens figuring out repository structure
- **Fragility:** Links break if file is moved or viewed in different context

**The solution - context-preserving pattern:**

```markdown
✅ GOOD: See [repo-philosophy.md](../../config/system/repo-philosophy.md)
("Repository Philosophy & Design Principles" at
<https://github.com/user/repo/blob/main/config/system/repo-philosophy.md>)
```

**What this provides:**
- **For humans in IDEs:** Clickable relative link works normally
- **For humans reading extracted files:** Full document title and absolute URL
- **For machines:** Complete context even when file is processed outside repository
- **For AI agents:** No token cost reconstructing paths - all context is explicit

**Implementation examples:**

```markdown
**For complete overview, see:** [README.md](../../README.md)
("Project Overview" at <https://github.com/org/repo/blob/main/README.md>)

**For development workflow, see:** [CONTRIBUTING.md](../CONTRIBUTING.md)
("Contribution Guidelines" at <https://github.com/org/repo/blob/main/CONTRIBUTING.md>)
```

**When to apply:**
- ✅ All cross-document references (links to other files)
- ✅ Documentation that might be extracted (PDFs, blog posts, AI context)
- ✅ Any file referenced in YAML frontmatter (`related_files`)
- ❌ Internal section anchors within same document (like `#contents`)
- ❌ External links (already absolute)

**Benefits:**
- **Zero cognitive load:** Humans immediately know what's being referenced
- **Zero token cost:** AI agents don't need to reconstruct repository structure
- **Universal compatibility:** Works in repo, in PDFs, in AI chats, everywhere
- **Future-proof:** Documents remain useful even when separated from source

**This is Anti-pattern 14** from the book: Context-Free References. Relative-only links work in IDEs but fail everywhere else. Design for all circumstances.

## Implementation in invisible-users Repository

### Mandatory Requirements

**Every markdown file MUST include:**

```yaml
---
mx:
  purpose: "Brief description of what this file does"
  audience: both  # or human, or machine
  stability: stable  # or experimental, unstable, frozen
  ai:
    context_provides: [list, of, topics]
  related_files:
    - path/to/related/file.md
---
```

**Configuration files MUST:**
- Use `.mx.yaml` naming (dot-prefix for hidden files)
- Include MX metadata declaring purpose and audience
- Reference related configuration files

**Cross-document references MUST:**
- Use context-preserving pattern: `[filename](relative-path) ("Title" at <absolute-url>)`
- Include document title for human readability
- Include absolute GitHub URL for machine processing
- Apply to all `related_files` references and documentation links

**Code files SHOULD:**
- Include `@mx:` annotations for AI-critical functions
- Declare editing permissions (`ai.editable`)
- Specify context requirements for modifications

### Optional Enhancements

**Files MAY include:**
- `ai.confidence` - Confidence level in implementation (0-1)
- `ai.test_coverage` - Boolean indicating test presence
- `owner` - Team or person responsible
- `see_also` - Additional context for readers

### AI Exclusion Patterns

**Use `.mxignore` to exclude files from AI agent context:**

```text
# Infrastructure files AI agents should ignore
README.md
LICENSE
CHANGELOG.md
node_modules/
.git/
dist/
build/
```

**Pattern:** Inherits from `.gitignore` but focuses on content relevance rather than version control.

**Purpose:** Reduces AI context noise and focuses attention on actual project content.

### Cross-File Metadata Application

**Use `@mx:applies_to` for files that can't have sidecar metadata:**

```yaml
# In .mx.yaml or package.json
mx:
  applies_to:
    - "node_modules/"
    - "dist/"
  purpose: "Third-party dependencies and build artifacts"
  ai.editable: false
```

This enables metadata declaration for:
- `node_modules/` (cannot modify)
- `.git/` (should not modify)
- Generated directories (`dist/`, `build/`)
- Binary files

## Standards vs. Specifications

**This document (MX Principles for Repos):**
- Establishes standards for invisible-users repository
- Defines required vs. optional metadata
- Explains rationale and benefits
- Shows practical implementation

**MX Specifications (in mx-gathering):**
- Complete technical specifications
- Formal syntax and semantics
- Reference implementations
- Applicable to any project

**Relationship:**
- This document implements and extends the specifications
- Specifications define "what" and "how"
- This document defines "why" and "when"
- Both work together for complete guidance

## Benefits of MX-Compliant Repositories

### For AI Agents

✅ **Complete context** - Understand file purpose and relationships
✅ **Clear permissions** - Know what's editable and what's not
✅ **Reduced errors** - Context requirements prevent incomplete understanding
✅ **Faster navigation** - Metadata enables intelligent file discovery
✅ **Better assistance** - Clear guidelines for AI-assisted development

### For Human Developers

✅ **Self-documenting code** - Metadata serves as inline documentation
✅ **Clear structure** - Explicit relationships and dependencies
✅ **Reduced onboarding time** - New developers understand context quickly
✅ **Better tooling** - IDEs can leverage metadata for features
✅ **Clean workspaces** - Hidden config files reduce clutter

### For the Project

✅ **Maintainability** - Clear ownership and purpose
✅ **Discoverability** - Easy to find relevant code and docs
✅ **Consistency** - Standard patterns across all files
✅ **Future-proof** - Metadata makes content parseable by future tools
✅ **AI-ready** - Prepared for next generation of development tools

## Validation and Compliance

### Checking MX Compliance

**Repository level:**
- Root `.mx.yaml` exists and contains required fields
- `.mxignore` file excludes appropriate patterns
- All markdown files have YAML frontmatter

**Directory level:**
- Package directories have `.mx.yaml` files
- Metadata declares context provisions
- Related files are cross-referenced

**File level:**
- Required metadata fields present
- `purpose` and `audience` clearly stated
- Context declarations accurate

### Common Issues

❌ **Missing frontmatter** - Markdown files without YAML metadata
❌ **Incomplete metadata** - Missing required fields
❌ **Wrong audience** - Files marked `machine` that humans need to read
❌ **No context declaration** - Missing `context_provides` and `context_required`
❌ **Broken references** - `related_files` pointing to non-existent files

## Evolution and Maintenance

This document should be updated when:
- New MX principles are established
- Standards change based on experience
- Specifications evolve
- Repository adopts new MX patterns

**Last comprehensive review:** 2026-01-30

## Related Documentation

- **MX Code Metadata Specification:** [mx-code-metadata-spec.md](../../packages/mx-gathering/specifications/mx-code-metadata-spec.md) ("MX Code Metadata Specification" at <https://github.com/ddttom/invisible-users/blob/main/packages/mx-gathering/specifications/mx-code-metadata-spec.md>) - Complete technical specification
- **MX Base Specification:** [mx-base-spec.md](../../packages/mx-gathering/specifications/mx-base-spec.md) ("MX Base Specification" at <https://github.com/ddttom/invisible-users/blob/main/packages/mx-gathering/specifications/mx-base-spec.md>) - Foundation principles
- **Repository Philosophy:** [repo-philosophy.md](../../config/system/repo-philosophy.md) ("Repository Philosophy & Design Principles" at <https://github.com/ddttom/invisible-users/blob/main/config/system/repo-philosophy.md>) - Design decisions and rationale
- **AI Guidance:** [CLAUDE.md](../../CLAUDE.md) ("CLAUDE.md - AI Assistant Project Guide" at <https://github.com/ddttom/invisible-users/blob/main/CLAUDE.md>) - Operational guidance for AI assistants
- **Folder Structure:** [folder-layout.md](../../config/system/folder-layout.md) ("Complete Repository Folder Layout" at <https://github.com/ddttom/invisible-users/blob/main/config/system/folder-layout.md>) - Complete repository structure

## Quick Reference

### New File Checklist

When creating a new file in this repository:

- [ ] Add YAML frontmatter with MX metadata
- [ ] Declare `purpose` and `audience`
- [ ] Specify `stability` level
- [ ] List what context this file provides (`ai.context_provides`)
- [ ] Reference related files (`related_files`)
- [ ] Add to `.mxignore` if infrastructure/boilerplate
- [ ] Update related files to reference this one

### Editing Existing Files

Before modifying a file:

- [ ] Read the file's `ai.context_required` list
- [ ] Check `ai.editable` permission if present
- [ ] Understand the file's declared purpose
- [ ] Review related files for dependencies
- [ ] Update `last_updated` date after changes
- [ ] Update cross-references if structure changes

---

**This document establishes MX standards for the invisible-users repository whilst providing reusable principles for any repository adopting Machine Experience design.**
