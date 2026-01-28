---
title: "ADR Transformation Guide for Appendix N Anti-Patterns"
author: "Tom Cranstoun"
date: "2026-01-26"
description: "Step-by-step guide for converting existing anti-pattern documentation to full ADR format with enhanced context, forces, and consequences"
keywords: [adr, anti-patterns, transformation, appendix-n, conversion]
ai-instruction: "This guide provides the transformation methodology for converting Appendix N anti-patterns to full ADR format. Follow the before/after examples exactly to maintain consistency across all conversions."
purpose: "Transformation methodology documentation"
status: "active"
---

# ADR Transformation Guide for Appendix N Anti-Patterns

## Purpose

This guide documents the methodology for converting existing anti-pattern documentation in Appendix N to the full ADR (Architectural Decision Record) format defined in Appendix O.

## Current vs Enhanced Format

### Current Format (Existing)

```markdown
## [Number]. [Pattern Name]

### The Problem
Description of what goes wrong

### Real Example
Code showing the anti-pattern

### The Fix
Code showing the corrected approach

**Chapter reference:** X, Y
```

### Enhanced Format (Target)

```markdown
## Anti-Pattern [Number]: [Pattern Name]

**Pattern ID:** `mx.anti-pattern.domain.name`
**Status:** active
**Intent:** One-sentence description of what this addresses

### Context

Where and when this anti-pattern appears:
- Industry context
- Technical context
- Common scenarios

### Problem

Detailed description of the anti-pattern.
- What goes wrong
- Why it's problematic
- Who is affected (agents, users, developers)

### Real Example

[Existing code example retained]

### Forces

Competing concerns that lead to this anti-pattern:
- Force 1: [e.g., developer convenience]
- Force 2: [e.g., design flexibility]
- Force 3: [e.g., time pressure]
- Force 4: [e.g., framework defaults]

### The Fix (Solution)

[Existing fix code retained]

### Resulting Context

What changes after implementing the fix:
- Outcome 1: [specific improvement]
- Outcome 2: [specific improvement]
- Outcome 3: [specific improvement]

### Consequences

**Positive:**
- Benefit 1: [specific advantage]
- Benefit 2: [specific advantage]

**Negative/Trade-offs:**
- Trade-off 1: [specific cost or limitation]
- Trade-off 2: [specific cost or limitation]

### Known Uses

Real-world examples of this anti-pattern:
- Framework/tool that promotes this pattern
- Common platform where it appears

### Related Patterns

**Fixes this anti-pattern:**
- Pattern name (Pattern X) - relationship

**Related anti-patterns:**
- Anti-pattern name (Anti-pattern Y) - relationship

**Chapter references:** Chapter X, Y
```

## Transformation Methodology

### Step 1: Add Pattern Metadata

Add structured metadata block after the title:

```markdown
**Pattern ID:** `mx.anti-pattern.[domain].[descriptive-name]`
**Status:** active
**Intent:** [One sentence describing what this anti-pattern addresses]
```

**Domain categories:**
- `html` - HTML structure issues
- `css` - CSS visual-only patterns
- `javascript` - Client-side rendering issues
- `content` - Content organization problems
- `metadata` - Structured data issues
- `navigation` - Navigation and discoverability
- `forms` - Form accessibility and semantics
- `media` - Images, video, audio issues

**Intent examples:**
- "Avoid conveying critical information through visual styling alone"
- "Prevent content from being trapped in non-text formats"
- "Ensure navigation is accessible without JavaScript execution"

### Step 2: Add Context Section

Insert before "Problem" section. Describe:

**Where this anti-pattern appears:**
- Specific industries or site types
- Common frameworks or tools that promote it
- Development practices that lead to it

**When it's introduced:**
- During initial development
- When adding features
- When optimizing for visual appeal
- When using specific frameworks

**Example:**
```markdown
### Context

This anti-pattern commonly appears in:
- E-commerce sites with pricing tiers
- SaaS products with feature comparisons
- Marketing sites with highlighted CTAs
- Dashboard interfaces with status indicators

It's typically introduced when:
- Designers specify visual emphasis without semantic backing
- Developers implement designs directly from visual mockups
- CSS frameworks encourage class-based styling
- Time pressure leads to visual-first implementation
```

### Step 3: Add Forces Section

Insert after "Real Example" and before "The Fix".

**Forces are competing concerns that lead to the anti-pattern:**

**Common forces:**
- **Developer convenience:** Easier to add CSS class than semantic HTML
- **Design flexibility:** Visual styling is more flexible than semantic constraints
- **Framework defaults:** CSS frameworks encourage non-semantic approaches
- **Time pressure:** Semantic HTML takes more thought than divs + classes
- **Visual requirements:** Design specs focus on appearance, not semantics
- **Browser compatibility:** Visual approaches work everywhere
- **Performance:** Fear that semantic HTML adds weight (usually false)

**Example:**
```markdown
### Forces

- **Design flexibility:** CSS-only highlighting is faster to implement and easier to change
- **Developer convenience:** Adding a class is simpler than restructuring HTML
- **Framework habits:** Modern CSS frameworks encourage class-based styling
- **Visual requirements:** Design specifications focus on visual appearance
- **Time pressure:** Semantic HTML requires more planning than visual-only approaches
```

### Step 4: Add Resulting Context Section

Insert after "The Fix" code example.

**Describe specific outcomes after implementing the fix:**

**Focus on:**
- Agent accessibility improvements
- Human accessibility benefits
- Code maintainability changes
- Performance implications
- SEO benefits

**Example:**
```markdown
### Resulting Context

After implementing semantic fixes:
- **Agent understanding:** AI agents can identify recommended options without visual parsing
- **Screen reader clarity:** Screen reader users hear explicit recommendations
- **Search indexing:** Search engines understand content hierarchy and importance
- **Maintainability:** Semantic HTML is self-documenting and easier to update
- **Testing:** Automated tests can verify semantic structure
```

### Step 5: Add Consequences Section

Expand on resulting context with explicit benefits and trade-offs.

**Positive consequences:**
- Specific advantages for agents
- Specific advantages for accessibility
- Additional benefits (SEO, maintenance, testing)

**Negative/Trade-offs:**
- Implementation effort
- Code complexity
- Learning curve
- Framework compatibility

**Example:**
```markdown
### Consequences

**Positive:**
- **Universal accessibility:** Works for AI agents, screen readers, and visual users
- **WCAG 2.1 AA compliance:** Satisfies success criteria 1.3.1 (Info and Relationships)
- **Reduced CSS dependency:** Semantic HTML provides meaning without styling
- **Better SEO:** Search engines understand content importance
- **Easier testing:** Semantic structure enables automated accessibility testing

**Negative/Trade-offs:**
- **More HTML:** Semantic structure requires more markup than pure CSS
- **Upfront planning:** Requires thinking about semantics during design
- **Framework compatibility:** May conflict with CSS framework patterns
- **Learning curve:** Teams need training on semantic HTML patterns
```

### Step 6: Add Known Uses Section

Document real-world occurrences:

**Include:**
- Frameworks/tools that promote this anti-pattern
- Common platforms where it appears
- Industries that frequently encounter it
- Specific sites (anonymized if needed)

**Example:**
```markdown
### Known Uses

**Common in:**
- Bootstrap-based sites relying on `.btn-primary` classes for visual emphasis
- React applications using styled-components without semantic backing
- WordPress themes implementing visual-only featured content
- Tailwind CSS projects where utility classes replace semantic HTML

**Specific examples:**
- SaaS pricing pages with CSS-highlighted "recommended" tiers
- E-commerce category pages with visually emphasized "bestseller" badges
- Dashboard interfaces with colour-coded status (no text labels)
```

### Step 7: Add Related Patterns Section

Link to patterns that:
- Fix this anti-pattern
- Are related anti-patterns
- Provide alternatives
- Share context

**Format:**
```markdown
### Related Patterns

**Fixes this anti-pattern:**
- Pattern 5: Semantic HTML Structure - Provides semantic alternatives to visual-only patterns
- Pattern 18: Explicit State Attributes - Shows how to make state machine-readable

**Related anti-patterns:**
- Anti-pattern 6: Hidden Content Without Fallback - Similar CSS-dependence issue
- Anti-pattern 13: Auto-Playing Content - Also assumes visual presentation

**Related chapters:**
- Chapter 11.2: Four Guiding Principles (Semantic First)
- Chapter 12.5: Pattern 5 (Semantic HTML Structure)
```

### Step 8: Preserve Chapter References

Move existing chapter references to "Related Patterns" section under "Related chapters".

## Transformation Checklist

For each anti-pattern conversion:

- [ ] Add pattern metadata (ID, Status, Intent)
- [ ] Add Context section (where/when it appears)
- [ ] Retain existing Problem section (enhance if needed)
- [ ] Retain existing Real Example section (enhance if needed)
- [ ] Add Forces section (competing concerns)
- [ ] Retain existing Fix section (enhance if needed)
- [ ] Add Resulting Context section (specific outcomes)
- [ ] Add Consequences section (positive/negative)
- [ ] Add Known Uses section (real-world examples)
- [ ] Add Related Patterns section (links to patterns/chapters)
- [ ] Verify all code examples still render correctly
- [ ] Ensure British English throughout
- [ ] Check markdown linting passes

## Pattern ID Naming Convention

Format: `mx.anti-pattern.<domain>.<descriptive-name>`

**Current Anti-Pattern Mappings:**

| Number | Name | Proposed Pattern ID |
|--------|------|---------------------|
| 1 | Visual-Only Information | `mx.anti-pattern.css.visual-only-information` |
| 2 | Content in Images | `mx.anti-pattern.media.content-in-images` |
| 3 | Generic Link Text | `mx.anti-pattern.html.generic-link-text` |
| 4 | Broken Heading Hierarchy | `mx.anti-pattern.html.broken-heading-hierarchy` |
| 5 | JavaScript-Only Navigation | `mx.anti-pattern.javascript.client-only-navigation` |
| 6 | Hidden Content No Fallback | `mx.anti-pattern.css.hidden-content-no-fallback` |
| 7 | No/Outdated Sitemap | `mx.anti-pattern.navigation.missing-sitemap` |
| 8 | Inconsistent Schema.org | `mx.anti-pattern.metadata.inconsistent-schema` |
| 9 | Forms Without Labels | `mx.anti-pattern.forms.missing-labels` |
| 10 | Table Abuse | `mx.anti-pattern.html.table-for-layout` |
| 11 | Content in iframes | `mx.anti-pattern.html.iframe-content-trap` |
| 12 | PDF-Only Content | `mx.anti-pattern.content.pdf-only` |
| 13 | Auto-Playing Content | `mx.anti-pattern.media.auto-playing` |
| 14 | Context-Free References | `mx.anti-pattern.content.context-free-references` |

## Example: Complete Transformation

### Before (Current Format)

```markdown
## 1. Visual-Only Information

### The Problem

Information conveyed purely through visual styling (colour, size, position, borders) without semantic backing in HTML.

### Real Example

[code example]

### The Fix

[code example]

**Chapter reference:** 11, 12.5
```

### After (ADR Format)

```markdown
## Anti-Pattern 1: Visual-Only Information

**Pattern ID:** `mx.anti-pattern.css.visual-only-information`
**Status:** active
**Intent:** Avoid conveying critical information through visual styling alone, as it remains invisible to AI agents and accessibility users

### Context

This anti-pattern commonly appears in:
- E-commerce sites with pricing tiers and "recommended" plans
- SaaS products with feature comparisons
- Marketing sites with highlighted CTAs
- Dashboard interfaces with status indicators

It's typically introduced when:
- Designers specify visual emphasis without semantic requirements
- Developers implement designs directly from visual mockups without accessibility considerations
- CSS frameworks encourage class-based visual styling
- Time pressure leads to visual-first implementation without semantic planning

### Problem

Information conveyed purely through visual styling (colour, size, position, borders) without semantic backing in HTML.

Humans perceive visual cues immediately—a gold border indicates "recommended", larger size suggests importance, green means "success". AI agents and screen readers parse HTML structure and content, not CSS styling. When critical information exists only in CSS, it's invisible to these users.

**Impact:**
- AI agents cannot identify recommended products or important options
- Screen reader users miss visual emphasis and recommendations
- Search engines cannot understand content importance
- Automated testing cannot verify visual-only patterns

### Real Example

[existing code example retained]

### Forces

- **Design flexibility:** CSS-only highlighting is faster to implement and easier to change than semantic HTML
- **Developer convenience:** Adding a CSS class is simpler than restructuring HTML with semantic elements
- **Framework habits:** Modern CSS frameworks (Bootstrap, Tailwind) encourage class-based styling patterns
- **Visual requirements:** Design specifications focus on visual appearance without semantic considerations
- **Time pressure:** Semantic HTML requires more planning than adding visual-only classes
- **Browser compatibility:** Visual approaches work consistently across all browsers

### The Fix (Solution)

[existing fix code retained]

Make recommendations explicit in HTML structure and content, using semantic elements, ARIA attributes, and visible text to convey information that's currently visual-only.

### Resulting Context

After implementing semantic fixes:
- **Agent understanding:** AI agents can identify recommended options through HTML structure and explicit text
- **Screen reader clarity:** Screen reader users hear explicit recommendations and importance indicators
- **Search indexing:** Search engines understand content hierarchy and relative importance
- **Maintainability:** Semantic HTML is self-documenting and easier to update than CSS-dependent patterns
- **Testing:** Automated accessibility tests can verify semantic structure and ARIA attributes
- **SEO improvement:** Search engines give appropriate weight to recommended content

### Consequences

**Positive:**
- **Universal accessibility:** Pattern works for AI agents, screen readers, keyboard users, and visual users
- **WCAG 2.1 AA compliance:** Satisfies success criteria 1.3.1 (Info and Relationships) and 1.4.1 (Use of Colour)
- **Reduced CSS dependency:** Semantic HTML provides meaning even when CSS fails to load
- **Better SEO:** Search engines understand content importance and hierarchy
- **Easier testing:** Semantic structure enables automated accessibility testing with tools like Pa11y
- **Future-proof:** Pattern works across new AI systems and assistive technologies

**Negative/Trade-offs:**
- **More HTML markup:** Semantic structure requires additional elements and attributes
- **Upfront planning:** Requires thinking about semantics during design phase, not just visual implementation
- **Framework compatibility:** May conflict with CSS framework patterns that assume visual-only styling
- **Learning curve:** Development teams need training on semantic HTML patterns and ARIA attributes
- **Code complexity:** More complex HTML structure than simple div + CSS class pattern

### Known Uses

**Common in:**
- Bootstrap-based sites relying solely on `.btn-primary` classes for visual emphasis without semantic backing
- React applications using styled-components or CSS-in-JS without semantic HTML considerations
- WordPress themes implementing visual-only featured content indicators
- Tailwind CSS projects where utility classes replace semantic HTML structure

**Specific examples:**
- SaaS pricing pages with CSS-highlighted "recommended" tiers (gold borders, larger size) but no semantic indication
- E-commerce category pages with visually emphasized "bestseller" badges that are pure CSS ::before content
- Dashboard interfaces with colour-coded status indicators (red/yellow/green) without text labels
- Feature comparison tables using background colours to show "included" vs "not included" without checkmarks or text

### Related Patterns

**Fixes this anti-pattern:**
- Pattern 5: Semantic HTML Structure (Chapter 12.5) - Provides semantic alternatives to visual-only patterns
- Pattern 18: Explicit State Attributes (Appendix M) - Shows how to make application state machine-readable

**Related anti-patterns:**
- Anti-pattern 6: Hidden Content Without Fallback - Similar CSS-dependence issue where content is inaccessible
- Anti-pattern 13: Auto-Playing Content - Also assumes visual presentation without alternatives

**Related chapters:**
- Chapter 11.2: Four Guiding Principles (Semantic First principle)
- Chapter 11.3: The Convergence Principle (patterns helping both agents and accessibility users)
- Chapter 12.5: Pattern 5 (Semantic HTML Structure)
- Chapter 12.12: Pattern 12 (WCAG 2.1 AA Compliance)
```

## Quality Standards

### Voice and Style

- **British English:** organisation, colour, whilst (NOT organization, color, while)
- **Present tense:** "This anti-pattern appears" (NOT "appears commonly" or "has been appearing")
- **Professional tone:** No superlatives, no marketing language
- **First-person:** Can use "we" and "our" when appropriate
- **No future tense:** Avoid "will", "should", "must" about the documentation itself

### Technical Accuracy

- **Code examples tested:** All code must be valid and functional
- **Real examples:** Base Known Uses on actual observations, not hypotheticals
- **Accurate references:** All chapter and pattern references must resolve correctly
- **Tool names correct:** Bootstrap, Tailwind CSS, WordPress (proper capitalization)

### Markdown Quality

- **Linting:** Must pass markdownlint with project config
- **Code blocks:** Always specify language (```html, ```css, ```bash)
- **Headings:** Follow hierarchy (no skipped levels)
- **Lists:** Blank lines before and after
- **Links:** Use markdown format [text](url) or angle brackets for bare URLs

## Implementation Schedule

**Week 2-3 (Phase 2):**
- Week 2: Convert Anti-Patterns 1-7
- Week 3: Convert Anti-Patterns 8-14

**Time per pattern:** 2-3 hours (including research for Known Uses and testing code examples)

**Total effort:** 28-42 hours over 2 weeks

## References

- [Appendix O: Pattern Documentation Templates](../../packages/shared-appendices/appendix-o-pattern-templates.md)
- [Appendix N: Anti-Patterns Catalog (current)](../../packages/shared-appendices/appendix-n-anti-patterns-catalog.md)
- [Plan 1: Extract patterns to MX-Bible](plan-1-extract-patterns-to-bible.md)
- [Project Roadmap](project-roadmap-mx-patterns.md)
