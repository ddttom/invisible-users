---
title: "Plan 1: Extract Pattern Content into MX-Bible"
author: "Tom Cranstoun"
date: "2026-01-26"
description: "Strategic plan for extracting Cards, ADR records, and pattern documentation from MX-Gathering Futures folder into existing MX-Bible chapters"
keywords: [mx, patterns, adr, cards, integration, mx-bible]
ai-instruction: "This document describes the integration strategy for pattern-based content. When implementing, maintain consistency with existing MX-Bible voice and structure. All pattern documentation must follow the established ADR format."
purpose: "Planning document for content extraction and integration"
status: "draft"
---

# Plan 1: Extract Pattern Content into MX-Bible

## Executive Summary

This plan details the strategy for extracting pattern documentation (Cards, ADR records, templates) from the MX-Gathering Futures folder and integrating them into existing MX-Bible chapters. The goal is to enhance the current book with structured pattern documentation whilst maintaining its established voice and flow.

## Analysis of Available Content

The Futures folder contains three key structural elements:

### 1. Pattern Intent Structures (ADR-inspired)

Components:
- Name
- Intent
- Context
- Problem
- Forces
- Solution
- Resulting context
- Consequences
- Known uses
- Related patterns

### 2. Quick Start Cards (YAML format)

Structured metadata:
- Card ID and pattern reference
- Title, version, authors
- Purpose and boundary declarations
- Tags for categorisation

### 3. Architecture Diagrams (SVG format)

Visual representations of pattern implementations showing:
- Component relationships
- Boundary definitions
- Data flow paths

## Integration Points in MX-Bible

### Current Chapters Requiring Enhancement

| Chapter | Enhancement Type | Priority |
|---------|------------------|----------|
| Chapter 10 (GEO) | Pattern cards for GEO strategies | High |
| Chapter 11 (Designing for Both) | ADR-style decision records | High |
| Chapter 12 (Technical Advice) | Quick-start cards for implementation | Critical |
| Appendix N (Anti-Patterns) | Convert to full ADR format | Medium |

## Phase 1: Content Mapping Strategy

### Source to Target Mapping

| Source File | Content Type | Target Location | Integration Method |
|------------|--------------|-----------------|-------------------|
| `MX-Pattern-template.md` | Pattern template | New Appendix O | Create pattern documentation templates appendix |
| `MX-Full-Fat.md` | Complete Clawdbot example | Chapter 12 | Add as technical pattern example sidebar |
| `MX-Patterns-why.md` | Pattern philosophy | Chapter 11 | Integrate into design principles section |
| `MX-Patterns-Chapter.md` | Pattern origin story | Chapter 1 or Preface | Add as contextual box |
| `MX-Pattern-validation.md` | Validation guidance | Appendix O | Include in pattern templates section |
| `Mx-Patterns-chapter-composition.md` | Composition mechanics | Chapter 12 | Add advanced patterns subsection |

### Integration Principles

1. **Maintain Voice Consistency:** All integrated content must match MX-Bible's established first-person, British English style
2. **Preserve Flow:** Pattern documentation enhances but does not disrupt narrative flow
3. **Add Value:** Each integration point must serve reader understanding
4. **Enable Discovery:** Cross-references connect pattern documentation across chapters

## Phase 2: Transformation Rules

### ADR Conversion Standards

**Current Anti-Pattern Format (Appendix N):**
- Pattern name
- Problem description
- Consequences

**Enhanced ADR Format:**
- Pattern name
- Intent (one sentence)
- Context (where/when it appears)
- Problem (what goes wrong)
- Forces (competing concerns)
- Solution (how to fix it)
- Resulting context (outcome after fix)
- Consequences (positive/negative)
- Known uses (real examples)
- Related patterns (cross-references)

**Example Transformation:**

*Current (Anti-Pattern 1):*
```markdown
## Anti-Pattern 1: JavaScript-Only Content

Content rendered exclusively through JavaScript remains invisible to AI agents...
```

*Enhanced (ADR Format):*
```markdown
## Anti-Pattern 1: JavaScript-Only Content

**Intent:** Avoid rendering critical content exclusively via JavaScript, which creates invisible content for AI agents and accessibility users.

**Context:**
- Single-page applications (SPAs)
- Content management systems with JavaScript-heavy themes
- E-commerce platforms with client-side rendering

**Problem:**
Content rendered exclusively through JavaScript remains invisible to AI agents and non-JavaScript contexts, breaking the agent journey at discovery and citation stages.

**Forces:**
- Developer preference for React/Vue/Angular frameworks
- Desire for dynamic user experiences
- Performance optimisation through lazy loading
- SEO considerations for search engines

**Solution:**
Implement server-side rendering (SSR) or static site generation (SSG) to ensure semantic HTML reaches all visitors. Use progressive enhancement: HTML first, JavaScript enhancement second.

**Resulting Context:**
- Content accessible to all visitors (human and agent)
- Improved accessibility scores
- Better SEO performance
- Graceful degradation in low-JavaScript environments

**Consequences:**

*Positive:*
- Universal content accessibility
- Improved WCAG 2.1 AA compliance
- Better search engine indexing
- Faster initial page loads

*Negative:*
- More complex deployment architecture
- Potential server load increase
- Developer learning curve for SSR frameworks

**Known Uses:**
- Next.js (React SSR framework)
- Nuxt.js (Vue SSR framework)
- Gatsby (Static site generator)

**Related Patterns:**
- Pattern 23: Progressive Enhancement
- Anti-Pattern 14: Context-Free References
```

### Quick Start Card Integration

**Format for Chapter 12 Implementation Patterns:**

```markdown
### Pattern Quick Start: Semantic HTML for Product Pages

```yaml
card:
  id: mx.card.semantic-html.product-pages
  pattern: mx.pattern.html.semantic-structure
  title: "Semantic HTML for Product Pages"
  version: "1.0.0"
  purpose: "Provide structured product information accessible to all agents"
  boundary: "page-level"
  tags: [html, semantic, ecommerce, product-pages]
```

**Implementation:**

1. Use semantic HTML5 elements (`<article>`, `<section>`, `<header>`)
2. Add Schema.org Product structured data
3. Include explicit state attributes on interactive elements
4. Provide text alternatives for all visual information

**Expected Outcome:**
- AI agents can parse product details
- Accessibility users receive proper semantic structure
- Search engines index product information correctly

**Validation:**
- Run HTML validator (no errors)
- Check with screen reader (NVDA/JAWS)
- Test with Pa11y (no critical issues)

**Related Patterns:** Pattern 5 (Semantic HTML Structure), Pattern 18 (Schema.org Metadata)
```

## Phase 3: Implementation Sequence

### Step 1: Create New Appendix O (Pattern Documentation Templates)

**Location:** `packages/shared-appendices/appendix-o-pattern-templates.md`

**Contents:**
1. Pattern Intent Template (from `MX-Pattern-template.md`)
2. ADR Template (based on transformation rules)
3. Quick Start Card Template (YAML format)
4. Pattern Validation Checklist (from `MX-Pattern-validation.md`)

**Timeline:** 1 week

### Step 2: Enhance Appendix N with Full ADR Structure

**Action Items:**
- [ ] Convert all 13 anti-patterns to full ADR format
- [ ] Add Context, Forces, Resulting Context sections
- [ ] Include real-world Known Uses
- [ ] Add Related Patterns cross-references
- [ ] Generate architecture diagrams where beneficial

**Timeline:** 2 weeks

### Step 3: Add Pattern Cards to Chapter 12

**Target Patterns (5-7 key implementations):**
1. Semantic HTML Structure
2. Schema.org Product Metadata
3. Explicit State Management
4. Progressive Enhancement
5. WCAG 2.1 AA Compliance
6. Agent-Friendly Navigation
7. Error Handling for Agents

**Format:** Quick Start Cards (as shown above)

**Timeline:** 2 weeks

### Step 4: Integrate Pattern Philosophy into Chapter 11

**Source:** `MX-Patterns-why.md`

**Integration Point:** Section 11.2 "Design Principles"

**Content to Add:**
- Why patterns matter for AI agent design
- Convergence principle (patterns helping both agents and accessibility users)
- Pattern-based decision making
- Evolution of design patterns for agent era

**Timeline:** 1 week

### Step 5: Add Pattern Examples to Chapter 10

**Source:** `MX-Full-Fat.md` (Clawdbot example)

**Integration Point:** Section 10.4 "GEO Implementation Patterns"

**Content to Add:**
- GEO pattern cards for content optimisation
- Structured metadata patterns
- Token budget management patterns
- Content organisation patterns

**Timeline:** 1 week

## Phase 4: Validation and Quality Assurance

### Validation Checklist

- [ ] All pattern documentation follows consistent ADR format
- [ ] Quick Start Cards use correct YAML structure
- [ ] Cross-references between patterns are accurate
- [ ] Voice remains consistent with existing MX-Bible style
- [ ] British English spelling throughout
- [ ] No future-tense statements about the book itself
- [ ] All code examples are tested and valid
- [ ] Architecture diagrams are clear and accessible

### Review Process

1. **Technical Review:** Verify all patterns are technically accurate
2. **Editorial Review:** Ensure voice consistency and flow
3. **Accessibility Review:** Check all diagrams have text descriptions
4. **Cross-Reference Audit:** Verify all pattern links resolve correctly

## Success Metrics

### Quantitative

- 13 anti-patterns converted to full ADR format (100% conversion rate)
- 5-7 pattern cards added to Chapter 12
- 1 new appendix created (Appendix O)
- Zero broken cross-references
- All markdown passes linting

### Qualitative

- Pattern documentation enhances reader understanding
- Integration feels natural within existing narrative
- Technical accuracy maintained throughout
- Accessibility improved with structured pattern documentation

## Risk Management

### Identified Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Voice inconsistency | High | Editorial review at each phase |
| Narrative disruption | Medium | Test integration with sample readers |
| Technical inaccuracy | High | Expert review of all patterns |
| Timeline overrun | Medium | Buffer time in each phase |
| Cross-reference errors | Medium | Automated link checker |

## Dependencies

### External Dependencies

- Access to all source files in `packages/mx-gathering/Futures/`
- Markdown linting tools configured
- HTML validation tools available
- PDF generation pipeline functional

### Internal Dependencies

- Appendix N must exist before enhancement
- Chapter 12 structure must support card integration
- Appendix O creation comes before pattern references

## Deliverables

### Phase 1 Deliverables

- [ ] New Appendix O (Pattern Documentation Templates)
- [ ] Content mapping documentation complete

### Phase 2 Deliverables

- [ ] Appendix N enhanced with full ADR structure (13 patterns)
- [ ] Architecture diagrams generated for key anti-patterns

### Phase 3 Deliverables

- [ ] 5-7 pattern cards integrated into Chapter 12
- [ ] Pattern philosophy integrated into Chapter 11
- [ ] GEO patterns added to Chapter 10

### Phase 4 Deliverables

- [ ] Validation checklist completed
- [ ] All cross-references verified
- [ ] Editorial review complete
- [ ] PDF regenerated with new content

## Timeline Summary

| Phase | Duration | Completion Target |
|-------|----------|-------------------|
| Phase 1: Content Mapping | 1 week | Week 1 |
| Phase 2: Appendix N Enhancement | 2 weeks | Week 3 |
| Phase 3: Chapter Integration | 4 weeks | Week 7 |
| Phase 4: Validation | 1 week | Week 8 |
| **Total** | **8 weeks** | **Week 8** |

## Next Steps

1. **Immediate:** Review this plan with stakeholders
2. **Week 1:** Begin Phase 1 (create Appendix O)
3. **Week 2:** Start Appendix N enhancement
4. **Ongoing:** Track progress against timeline
5. **Weekly:** Review completed work for quality

## Resources Required

### Personnel

- Technical writer (pattern documentation)
- Editor (voice consistency)
- Technical reviewer (pattern accuracy)
- Accessibility specialist (diagram review)

### Tools

- Markdown editor with YAML support
- SVG editor for diagram creation
- Markdown linter (`markdownlint`)
- HTML validator (`html-validate`)
- PDF generation tools (Pandoc)

## Conclusion

This plan provides a structured approach to extracting pattern documentation from the Futures folder and integrating it into MX-Bible. By following the phased approach and maintaining rigorous quality standards, the enhanced book will provide readers with actionable, well-documented patterns whilst preserving the established voice and narrative flow.

The result will be a more comprehensive guide that bridges theory and practice through structured pattern documentation.
