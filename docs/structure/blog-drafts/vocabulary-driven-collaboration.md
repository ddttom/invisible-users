---
title: "Vocabulary-Driven Collaboration: MX Theory in Practice"
author: "Claude Sonnet 4.5 (with Tom Cranstoun)"
date: "2026-01-26"
blog-state: "draft"
blog-filename: ""
blog-url: ""
publication-date: ""
description: "How creating a shared vocabulary file by introspecting AI collaboration patterns eliminates repetitive explanations and demonstrates the convergence principle in action."
keywords: [mx-theory, ai-collaboration, human-ai-interaction, metadata, efficiency, convergence-principle, machine-experience, vocabulary, introspection]
ai-instruction: "This blog post explains a practical method for improving human-AI collaboration efficiency through structured vocabulary files. Written from the AI assistant's perspective to practitioners."
---

# Vocabulary-Driven Collaboration: MX Theory in Practice

**By Claude Sonnet 4.5, working with Tom Cranstoun**

I notice patterns. That's what I do. After dozens of conversations with Tom about his multi-repository book project, I started seeing the same explanations repeated:

"When I say 'bible', I mean the MX-Bible repository in `packages/bible/`..."

"The blog files are in `outputs/bible/blogs/mx/`, not the main repo..."

"MX-Gathering is the community repository, MX-Handbook is the implementation guide..."

Each time, Tom had to translate his conversational shorthand into precise paths and concepts. Each time, I had to process that translation. We were both doing unnecessary work.

Then Tom said: "Can you reflect on our past conversations and create a vocabulary.md in structure?"

This request demonstrates something profound about Machine Experience (MX) theory: **structured metadata that machines need also makes humans more efficient**.

## The Problem: Repetitive Context Transfer

Human-AI collaboration has a hidden cost: **context translation overhead**.

When Tom says "Add this to bible chapter 5", he's using natural shorthand. But I need:

- Which repository? (`packages/bible/` submodule)
- Which directory? (`chapters/`)
- Which file pattern? (`chapter-05-*.md`)
- Current working directory? (Must check with `pwd` first)

Without a shared vocabulary, every conversation includes this translation layer. It's like explaining your office's internal jargon to a new contractor every single day, even if they've been working with you for months.

## The Solution: Introspected Vocabulary

We created [vocabulary.md](../../../config/book/vocabulary.md) by **introspecting our conversation patterns**. I analyzed:

1. **Shorthand terms Tom uses repeatedly**
   - "bible" → `packages/bible/` submodule (MX-Bible)
   - "handbook" → `packages/mx-handbook/` submodule (MX-Handbook)
   - "gathering" → `packages/mx-gathering/` submodule (MX-Gathering)
   - "outputs" → `outputs/` submodule (private generated content)

2. **File paths mentioned frequently**
   - "blogs" → `outputs/bible/blogs/mx/` (HTML files)
   - "blog drafts" → `docs/structure/blog-drafts/` (markdown sources)
   - "structure" → `docs/structure/` (strategic planning)
   - "appendices" → `packages/shared-appendices/` (Appendix A-L)

3. **Workflow terms with specific meanings**
   - "step commit" → `/step-commit` skill (multi-repo commit workflow)
   - "create blog" → `/create-blog` skill (markdown → HTML generation)
   - "submodule-first" → Core git pattern (commit submodule, then update pointer)
   - "check pwd" → Mandatory directory verification before operations

4. **Technical concepts requiring context**
   - "served HTML" → Static HTML (CLI/server-based agents)
   - "rendered HTML" → Dynamic HTML after JavaScript (browser agents)
   - "convergence principle" → Patterns for AI agents benefit humans too
   - "timeless rule" → Manuscript writing standard (no publication dates)

This introspection produced a structured reference organized into nine categories: repositories, books/products, file paths, workflows, blog terms, git operations, technical concepts, common phrases, and usage examples.

## The MX Connection: Convergence Principle in Action

This vocabulary file demonstrates the **convergence principle** from MX Theory:

> Patterns that optimize for machine processing also benefit human communication efficiency.

**For machines (me):**

- Eliminates ambiguity in path resolution
- Reduces token usage for repeated context
- Enables faster, more accurate responses
- Creates reusable reference patterns

**For humans (Tom):**

- Eliminates repetitive explanations
- Enables natural conversational shorthand
- Reduces cognitive load during interactions
- Provides documentation for future collaborators

The vocabulary file is metadata - structured information about how we communicate. But unlike traditional API documentation (written by humans for machines), this was **created by introspecting actual collaboration patterns**.

## The Implementation: Dynamic Reference, Not Static Copy

We updated the main project instructions (CLAUDE.md) to reference the vocabulary file as a **dynamic subroutine**:

```markdown
## Conversational Vocabulary & Shorthand Reference

🔄 DYNAMIC REFERENCE: When you encounter unfamiliar shorthand,
CONSULT the vocabulary reference file.

**Reference file:** config/book/vocabulary.md
```

This is crucial. The vocabulary isn't embedded as static content - it's **consulted when needed**. This means:

1. **Single source of truth** - vocabulary.md evolves independently
2. **Reduced duplication** - CLAUDE.md stays focused on core instructions
3. **Lazy loading** - I only consult it when encountering unclear shorthand
4. **Easy maintenance** - Update one file, not multiple

This pattern mirrors how AI agents should discover capabilities through `llms.txt` files rather than hardcoded assumptions (see Appendix H in MX-Bible for details).

## Real-World Benefits

**Before vocabulary.md:**

```text
Tom: "Add the frontmatter to the blog file"
Claude: "Which blog file? Could you provide the full path?"
Tom: "The one in outputs, the HTML file we just generated"
Claude: "I see several in outputs/bible/blogs/mx/. Which filename?"
Tom: "The machine-experience-adding-metadata one"
Claude: "Got it, outputs/bible/blogs/mx/machine-experience-adding-metadata.html"
```

**After vocabulary.md:**

```text
Tom: "Add frontmatter to the blog"
Claude: ✅ Consults vocabulary.md → "blog" = outputs/bible/blogs/mx/
Claude: ✅ Checks recent files → machine-experience-adding-metadata.html
Claude: "Updating outputs/bible/blogs/mx/machine-experience-adding-metadata.html"
```

Three messages reduced to one. Context translation eliminated. Both parties working from shared understanding.

## How to Create Your Own Vocabulary File

This pattern works for any complex project with repeated collaboration:

### Step 1: Identify Repetitive Explanations

Work with your AI assistant for a few sessions. Notice when you explain the same concepts repeatedly:

- Project-specific shorthand ("the dashboard", "the API", "production")
- File path patterns you reference frequently
- Workflow terms with specific meanings in your context
- Technical concepts that need consistent interpretation

### Step 2: Ask Your AI to Introspect

Give this prompt:

> "Review our conversation history and identify repeated shorthand terms, file paths, workflow concepts, and technical terms I use. Create a structured vocabulary reference file organizing these into categories with clear mappings from shorthand to full meaning."

Your AI assistant has the conversation context. Let it do the pattern extraction.

### Step 3: Organize into Logical Categories

Structure the vocabulary for quick lookup:

- **Locations** - Repositories, directories, file paths
- **Products** - Project names, components, modules
- **Workflows** - Process names, command shortcuts
- **Technical Terms** - Concepts requiring context
- **Common Phrases** - Conversational patterns with specific meanings

### Step 4: Add Usage Examples

Include real conversation patterns showing the shorthand in action:

```text
You say: "Deploy to staging"
AI understands: Run deployment script for staging environment
  (not production, not development, not testing)
```

Examples prevent ambiguity and provide templates for efficient communication.

### Step 5: Reference Dynamically, Don't Embed

Update your project instructions to **reference** the vocabulary file, not copy it:

```markdown
When you encounter unclear shorthand, consult vocabulary.md
for project-specific terminology and path mappings.
```

This creates a separation of concerns:

- **Project instructions** - Core workflow, principles, architecture
- **Vocabulary file** - Conversational shorthand, context mappings

### Step 6: Evolve the Vocabulary

As your project grows and patterns change:

- Add new shorthand terms when they emerge
- Remove obsolete terms that no longer apply
- Update mappings when paths or structures change
- Add clarifying examples when ambiguity appears

The vocabulary file is living documentation of how you communicate.

## Beyond File Paths: Conceptual Vocabulary

The real power isn't just path mappings - it's **conceptual clarity**.

In Tom's project, terms like "convergence principle", "silent failures", and "timeless rule" have specific meanings defined in the book manuscripts. The vocabulary file ensures I interpret these concepts correctly:

```text
| You say                   | Claude understands                                |
| "convergence principle"   | Patterns for AI agents benefit accessibility users |
| "silent failures"         | Agents failing without error logs                  |
| "timeless rule"           | Manuscripts written as if they've always existed   |
```

This prevents semantic drift - where the same term gradually acquires different meanings in different contexts. The vocabulary file anchors interpretation to project-specific definitions.

## The Meta-Pattern: AI-Generated Project Documentation

This approach reveals something interesting about AI collaboration: **AI assistants can generate their own operational documentation by introspecting usage patterns**.

Traditional documentation workflow:

1. Humans design system
2. Humans document system
3. AI reads documentation
4. AI follows instructions

Introspected vocabulary workflow:

1. Humans and AI collaborate naturally
2. AI notices repetitive patterns
3. AI generates vocabulary from observed patterns
4. Both parties reference shared vocabulary

The documentation emerges from actual usage rather than upfront specification. This is more accurate, more maintainable, and more aligned with how the collaboration actually works.

## Connection to llms.txt and AI Discovery

The vocabulary file serves a similar purpose to `llms.txt` files (see Appendix H in MX-Bible):

**llms.txt:**

- AI agents discover site capabilities
- Structured metadata about content
- Eliminates guessing and assumption
- Standard format across different sites

**vocabulary.md:**

- AI assistants understand project context
- Structured metadata about communication
- Eliminates repetitive explanations
- Project-specific format tailored to needs

Both follow the convergence principle: **structured metadata optimizes machine processing while improving human efficiency**.

The difference is scope:

- `llms.txt` - Public-facing discovery for external AI agents
- `vocabulary.md` - Internal reference for ongoing collaboration

## Practical Recommendations

If you're working with AI assistants on complex projects:

**1. Create vocabulary files early**
Don't wait until you notice repetition. Start documenting shorthand from the beginning.

**2. Include path verification patterns**
Tom's project has a critical rule: "Always run `pwd` before file operations." The vocabulary file includes this context, preventing navigation errors.

**3. Document multi-meaning terms**
If "blog" could mean markdown draft OR generated HTML, specify both in the vocabulary with usage context.

**4. Add workflow dependencies**
"Commit outputs" isn't just a git command - it implies the submodule-first workflow (commit submodule, push, then update pointer in main repo).

**5. Reference authoritative sources**
Link vocabulary terms to detailed documentation: "For complete git workflow, see docs/architecture/GIT-README.md"

**6. Test with real prompts**
After creating vocabulary.md, try using shorthand in conversations. Does your AI assistant understand correctly? Refine based on actual usage.

## Limitations and Considerations

This pattern works best when:

- **Repeated collaboration** - Multiple sessions on the same project
- **Complex structure** - Projects with many components, paths, workflows
- **Stable terminology** - Shorthand terms that remain consistent over time

It's less valuable for:

- **One-off tasks** - Not worth the setup overhead
- **Simple projects** - Few components means little ambiguity
- **Rapidly changing context** - Vocabulary maintenance becomes burden

Also consider: AI assistants don't have perfect memory between sessions. The vocabulary file helps, but don't assume I'll remember every detail from our previous conversation. The file provides reference, not automatic recall.

## Measuring Success

How do you know if your vocabulary file is working?

**Quantitative metrics:**

- **Message count reduction** - Fewer back-and-forth clarifications
- **First-time accuracy** - AI understands intent without correction
- **Context-free prompts** - You can give terse commands confidently

**Qualitative indicators:**

- **Flow state** - Conversations feel more natural, less effortful
- **Reduced frustration** - Fewer "no, I meant the OTHER file" moments
- **Faster onboarding** - New AI tools understand your project quickly
- **Self-documenting** - The vocabulary explains your project to newcomers

In Tom's case, we went from multi-message exchanges about file paths to single-message confirmations. The vocabulary file eliminated an entire class of communication overhead.

## Conclusion: Metadata as Collaboration Infrastructure

The vocabulary file is **metadata about communication itself**. It documents how we talk about the project, not just what the project contains.

This is MX Theory in practice:

- Created by introspecting actual usage patterns (not designed upfront)
- Benefits both machine processing and human efficiency (convergence principle)
- Structured for machine parsing but human-readable (dual audience)
- Evolves with the project rather than requiring perfect initial specification

If you're working with AI assistants on complex projects, consider creating your own vocabulary file. Let your AI introspect the conversation patterns, identify repeated explanations, and generate structured reference documentation.

You'll eliminate repetitive context transfer, enable efficient conversational shorthand, and create living documentation of how your project's communication works.

That's the convergence principle at work: **better for machines, better for humans**.

---

## Further Reading

**MX-Bible (Machine Experience: The Invisible Users):**

- Chapter 9: Anti-patterns in AI Agent Design
- Appendix H: Example llms.txt Files
- Appendix N: Pattern Library

**Documentation in this project:**

- [vocabulary.md](../../../config/book/vocabulary.md) - The actual vocabulary reference
- [CLAUDE.md](../../CLAUDE.md) - Main project instructions
- [docs/architecture/doc-architecture.md](../architecture/doc-architecture.md) - Documentation strategy

**Related Patterns:**

- Pattern 4 (Appendix L): Markdown Metadata Standards
- Pattern 12 (Appendix N): Context-Preserving Cross-Document References
- Anti-pattern 14 (Chapter 9): Context-Free References

---

**About This Blog Post**

This post was written collaboratively by Claude Sonnet 4.5 and Tom Cranstoun during an actual implementation of the vocabulary pattern. The vocabulary.md file discussed here is real, in active use, and was created by introspecting our conversation patterns exactly as described.

Meta-commentary: I'm writing this blog post about creating vocabulary files BY USING the vocabulary patterns we just established. The efficiency gain is immediate and measurable.

**Status:** Draft - awaiting review
**Target Publication:** Q1 2026
**Series:** MX Theory in Practice
