# Book Plan

**Title:** The Invisible Users: Designing the Web for AI Agents and Everyone Else

**Author:** Tom Cranstoun

**Target Length:** 30,000-50,000 words

**Current Status:** Complete with Phase 1-2 Enhancements + Chapter 11 + Web Appendices ✅ (~57,000 words core manuscript)

**Latest Update (January 2026):** Restructured book to publish appendices separately online:

- Book now ends with "The End" chapter directing readers to online appendices at <https://about.network/invisible-users/web/>
- All 10 appendices (A-J) published as individual HTML pages with navigation and llms.txt discovery
- Updated all manuscript references to appendices to point to online URLs
- Core manuscript: ~57,000 words (preface + 11 chapters + The End)
- Web appendices: ~20,000 words published separately
- Previous: Added Appendix J tracking Claude for Chrome (20 Dec 2024) and Microsoft Copilot Checkout (Jan 2025)
- Previous: Added Chapter 11 (~5,000 words), enhanced Chapter 10, enhanced Chapter 4 with ROI framework

---

## Thesis

The patterns that break AI agents also break humans. Toast notifications that vanish, pagination hiding content, single-page applications with invisible state changes — these have been creating accessibility problems for years. Now AI agents are struggling with the same patterns, and there's commercial pressure to fix them.

This book explores the technical, business, ethical, and human implications of this collision, and provides practical solutions that work for both humans and machines.

---

## Chapter Summary

| Chapter | Title | Words | Status |
| ------- | ----- | ----- | ------ |
| Preface | Author's Journey | ~1,700 | ✅ Complete |
| 1 | What You Will Learn | ~3,200 | ✅ Complete |
| 2 | The Invisible Failure | ~4,500 | ✅ Complete |
| 3 | The Architectural Conflict | ~4,150 | ✅ Complete |
| 4 | The Business Reality | ~7,350 | ✅ Complete + ROI Framework |
| 5 | The Content Creator's Dilemma | ~5,600 | ✅ Complete |
| 6 | The Security Maze | ~4,000 | ✅ Complete |
| 7 | The Legal Landscape | ~4,400 | ✅ Complete |
| 8 | The Human Cost | ~3,650 | ✅ Complete |
| 9 | Designing for Both | ~4,400 | ✅ Complete |
| 10 | Technical Advice | ~9,650 | ✅ Complete + Enhanced |
| 11 | What Agent Creators Must Build | ~5,000 | ✅ Complete |
| The End | Additional Resources Available Online | ~400 | ✅ Complete |

**Core Manuscript:** ~57,000 words (preface + 11 chapters + The End + Glossary)

**Web Appendices** (published separately at <https://about.network/invisible-users/web/>):

| Appendix | Title | Words | Status |
| -------- | ----- | ----- | ------ |
| A | Implementation Cookbook | ~1,900 | ✅ Published |
| B | Battle-Tested Lessons | ~1,850 | ✅ Published |
| C | Web Audit Suite Guide | ~2,000 | ✅ Published |
| D | AI-Friendly HTML Guide | ~9,050 | ✅ Published |
| E | AI Patterns Quick Reference | ~1,300 | ✅ Published |
| F | Implementation Roadmap | ~2,750 | ✅ Published |
| G | Resource Directory | ~1,950 | ✅ Published |
| H | Example llms.txt File | ~300 | ✅ Published |
| I | Pipeline Failure Case Study | ~2,500 | ✅ Published |
| J | Industry Developments | ~3,800 | ✅ Published |

**Total Web Appendices:** ~27,400 words

---

## Chapter Outlines

### Chapter 1 — What You Will Learn

Introduction and the accessibility connection.

**Sections:**

- The agent that couldn't find the checkout button
- What this book covers (and doesn't)
- The accessibility parallel
- Who should read this
- How the book is structured
- The urgency of now

---

### Chapter 2 — The Invisible Failure

When websites break for AI agents.

**Sections:**

- The booking that never happened
- What agents actually see
- The five types of invisible failure
- Why developers don't notice
- The feedback loop that doesn't exist
- Measuring what you can't see

**Enhanced with:** Five failure patterns summary table showing Pattern/Problem/Agent Impact/Human Impact/Example

---

### Chapter 3 — The Architectural Conflict

How modern web architecture creates the problem.

**Sections:**

- The JavaScript execution problem
- Single-page applications and state management
- The hydration gap
- API-first versus page-first
- The mobile app parallel
- Progressive enhancement revisited
- Headless CMS and the missing context
- Server-side rendering for agents

---

### Chapter 4 — The Business Reality

The commercial implications of agent-mediated commerce.

**Sections:**

- When agents make purchases
- The brand visibility problem
- The price comparison acceleration
- Dark warehouses (brief speculative pattern)
- The recommendation influence
- The customer relationship question
- Identity delegation patterns (brief)
- Who wins, who loses
- The small business perspective

**Enhanced with:** Real-world cost impact table showing business scenarios with specific lost revenue (£2,000, £150, £50k)

---

### Chapter 5 — The Content Creator's Dilemma

How AI consumption threatens existing business models.

**Sections:**

- The attention economy under pressure
- When summarisation replaces visiting
- The advertising model collision
- The subscription alternative
- The micropayment dream
- What content creators can do now
- The uncomfortable middle ground
- Emerging licensing models

**Enhanced with:** Revenue impact calculator showing how agent traffic % affects viability (30% = marginal, 50% = unsustainable)

---

### Chapter 6 — The Security Maze

Security implications of AI agents acting on user behalf.

**Sections:**

- The session inheritance problem (key insight)
- When agents inherit authentication
- The bank that couldn't tell
- Liability questions without answers
- Agent identification challenges
- The verification paradox
- Rate limiting and abuse
- What security teams should consider

**Enhanced with:** Indistinguishability comparison table (Legitimate User vs Authorized Agent vs Malware Attack)

---

### Chapter 7 — The Legal Landscape

Legal frameworks struggling to keep pace.

**Sections:**

- Agency law meets AI agents
- Terms of service and automated access
- Copyright in the age of extraction
- Data protection complications
- The consent problem
- Cross-border enforcement
- What might change
- Practical legal considerations

**Enhanced with:** Legal grey zone scenarios table showing five situations with current status, unclear areas, and needed clarification

---

### Chapter 8 — The Human Cost

The digital divide implications.

**Sections:**

- The access problem (who has agents, who doesn't)
- The capability gap
- The language exclusion (English dominance)
- The age divide
- The disability question (benefits and harms)
- The education gap
- The economic divide
- Geographic and language complications
- What can be done (maintain human interfaces, support access, regulate)
- The uncomfortable reality about technology transitions

**Enhanced with:** Access barriers matrix showing five barrier types (Economic, Language, Technical Literacy, Infrastructure, Device Access) with exclusion impacts and gap-widening effects

---

### Chapter 9 — Designing for Both

Solutions that work for agents without degrading human experience. The convergence argument.

**Sections:**

- Clear state instead of implied state
- Persistent errors instead of ephemeral ones
- Explicit feedback instead of subtle cues
- Complete information instead of forced pagination
- Semantic structure and JSON-LD
- Advertising your API with meta tags
- Identity delegation patterns (brief)
- Real examples of good design (Stripe, GitHub, Amazon, Calendly, Wikipedia)
- The small business version
- What good looks like at different scales
- The standards that might emerge
- Success stories and patterns

**Enhanced with:** Priority-based implementation roadmap (Priority 1: Critical Quick Wins, Priority 2: Essential Improvements, Priority 3: Core Infrastructure)

---

### Chapter 10 — Technical Advice

Implementation code, testing strategies, and practical tools.

**Note:** Contains simplified, readable code examples optimised for learning.

**Sections:**

- Detection layer (client-side and server-side)
- Dual-interface architecture
- Agent-friendly form patterns
- Synchronous validation
- Agent-readable metadata layer
- Loading state clarity
- Traditional multi-page alternatives to SPAs
- Persistent error display
- CSS for disabling animations
- Analytics segmentation
- Honeypot fields
- Rate limiting by type
- API alternatives
- Identity delegation (basic pattern)
- Testing for agent compatibility
- Debugging agent failures
- Version management and breaking changes
- Design Patterns Reference (10 patterns)
- Common Mistakes to Avoid (6 mistakes)
- Implementation by Scale

**Enhanced with:** Pattern comparison table (before/after) showing six categories with problematic patterns vs better approaches, plus "Explore Further" sign-off section promoting interactive notebook

---

### Chapter 11 — What Agent Creators Must Build

Implementation patterns, validation layers, and guardrails for reliable agent systems.

**Sections:**

- The three failure types (website design, reasoning, pipeline failures)
- Anatomy of the £203k error (detailed case study)
- The validation gap (range validation, comparative analysis, incomplete data detection, structured data cross-reference)
- Confidence thresholds and decision points
- Guardrails agent creators should build (five specific guardrails with code examples)
- Agent architecture considerations (browser extensions, CLI agents, server-based agents)
- Learning from production failures
- The validation roadmap (priority-based implementation)
- Conclusion (completing the ecosystem view)

**Key insight:** Pipeline failures occur when agents fail to validate data during extraction. The £203,000 cruise pricing error wouldn't have occurred if either the website provided clear structured data (Chapter 10) or the agent had validation layers (Chapter 11). Both sides must improve.

**Enhanced with:** Complete validation pipeline code examples showing range checking, comparative analysis, incomplete data detection, confidence scoring, and graceful degradation patterns

---

## Supporting Materials

### Front Matter

| Material | Status | Description |
| -------- | ------ | ----------- |
| preface.md | ✅ | Book introduction with personal narrative, usage guide, acknowledgements, and author bio |

### Core Documentation

| Material | Status | Description |
| -------- | ------ | ----------- |
| README.md | ✅ | Project overview |
| CLAUDE.md | ✅ | AI assistant guidance |
| book-plan.md | ✅ | This file |
| book-svg-style.md | ✅ | SVG illustration specifications |
| CHANGELOG.md | ✅ | Version history |
| LEARNINGS.md | ✅ | Actionable guidance for AI assistants |
| PROJECTSTATE.md | ✅ | Current implementation status |

### Illustrations

All 11 chapter illustrations complete ✅

1. Chapter 1 — "Same Website, Different Reality"
2. Chapter 2 — "The Anatomy of Invisible Failure"
3. Chapter 3 — "The Architectural Conflict"
4. Chapter 4 — "The Business Model Collision"
5. Chapter 5 — "The Content Creator's Dilemma"
6. Chapter 6 — "The Security Maze"
7. Chapter 7 — "The Legal Landscape"
8. Chapter 8 — "The Human Cost"
9. Chapter 9 — "Designing for Both"
10. Chapter 10 — "Technical Advice"
11. Chapter 11 — "The Validation Pipeline"

### Reference Materials

| Material | Status | Description |
| -------- | ------ | ----------- |
| manuscript/Glossary.md | ✅ | 60+ technical terms with cross-references (included in book) |
| manuscript/The-End.md | ✅ | Final page directing readers to online appendices with full descriptions |
| cover-design.svg | ✅ | Professional book cover (600×900) |

### Web Appendices

Published separately at <https://about.network/invisible-users/web/> as this is a fast-moving field. Appendices are maintained online to ensure they remain current and relevant.

**Generated files** (via `npm run pdf:appendix`):

| File | Status | Description |
| ---- | ------ | ----------- |
| manuscript/web/index.html | ✅ | Landing page listing all appendices |
| manuscript/web/llms.txt | ✅ | AI agent discovery file (llmstxt.org format) with metadata, copyright, access guidelines |
| manuscript/web/appendix-a.html | ✅ | Implementation Cookbook (quick-reference recipes) |
| manuscript/web/appendix-b.html | ✅ | Battle-Tested Lessons (production learnings) |
| manuscript/web/appendix-c.html | ✅ | Web Audit Suite Guide (tool documentation) |
| manuscript/web/appendix-d.html | ✅ | AI-Friendly HTML Guide (comprehensive semantic HTML patterns) |
| manuscript/web/appendix-e.html | ✅ | AI Patterns Quick Reference (one-page data attribute reference) |
| manuscript/web/appendix-f.html | ✅ | Implementation Roadmap (priority-based adoption guide) |
| manuscript/web/appendix-g.html | ✅ | Resource Directory (150+ curated resources) |
| manuscript/web/appendix-h.html | ✅ | Example llms.txt File (working template) |
| manuscript/web/appendix-i.html | ✅ | Pipeline Failure Case Study (£203k error analysis) |
| manuscript/web/appendix-j.html | ✅ | Industry Developments (latest verified news) |

**Source files** (markdown):

| File | Status | Description |
| ---- | ------ | ----------- |
| manuscript/appendix-a-implementation-cookbook.md | ✅ | Implementation patterns source |
| manuscript/appendix-b-battle-tested-lessons.md | ✅ | Production learnings source |
| manuscript/appendix-c-web-audit-suite-guide.md | ✅ | Tool documentation source |
| manuscript/appendix-d-ai-friendly-html-guide.md | ✅ | HTML patterns guide source (~9,050 words) |
| manuscript/appendix-e-ai-patterns-quick-reference.md | ✅ | Quick reference source (~1,300 words) |
| manuscript/appendix-f-implementation-roadmap.md | ✅ | Priority roadmap source (~2,750 words) |
| manuscript/appendix-g-resource-directory.md | ✅ | Resources directory source (~1,950 words) |
| manuscript/appendix-h-live-llms.md | ✅ | llms.txt example wrapper |
| manuscript/appendix-h-live-llms.txt | ✅ | Digital Domain Technologies llms.txt reference (20 links) |
| manuscript/appendix-i-pipeline-failure-case-study.md | ✅ | £203k error analysis source (~2,500 words) |
| manuscript/appendix-j-industry-developments.md | ✅ | Industry news source (~3,800 words) |

Each HTML page includes:

- Standalone HTML with embedded CSS (Pandoc-generated)
- Table of contents (2 levels deep)
- Navigation footer with links to all appendices
- Responsive design (mobile-friendly)
- Proper semantic HTML for AI agent compatibility

### Interactive Materials

| Material | Status | Description |
| -------- | ------ | ----------- |

### Promotional Materials

| Material | Status | Description |
| -------- | ------ | ----------- |
| blog.md | ✅ | Broad-appeal blog post (~3,000 words) |
| blog.svg | ✅ | Visual illustration (900×600) |

### Sales & Partnership Materials

All materials located in `docs/sales-enablement/`:

| Material | Status | Words | Description |
| -------- | ------ | ----- | ----------- |
| business-plan.md | ✅ | ~18,000 | Complete business strategy document with 7 revenue streams, market analysis, financial projections (Year 1: £939k-£3.3M) |
| PITCH.md | ✅ | ~27,500 | Comprehensive partnership pitch combining methodology and measurement tool offering |
| executive-summary.md | ✅ | ~2,900 | Condensed partnership pitch (8 pages) with one-sentence opportunity, revenue model, 4 partnership models, investment ask options |
| plan-to-market.md | ✅ | ~8,500 | Go-to-market plan with launch timeline, target audience segmentation, channel strategy, 10 production-ready email templates, content calendar, partnership outreach strategy |
| reviews.md | ✅ | ~2,500 | Audience validation feedback from three key segments (engineers, leaders, partners) |
| EXECUTIVE_PITCH_DECK.md | ✅ | ~3,300 | Slide template for C-suite presentations |
| PARTNER_KIT.md | ✅ | ~4,400 | Outreach scripts and objection handling for agencies |
| ROI_CASE_STUDIES.md | ✅ | ~4,600 | Three financial case studies with concrete ROI examples |

### Web Presence

| Material | Status | Description |
| -------- | ------ | ----------- |
| llms.txt | ✅ | AI agent guidance file with repository documentation |

### Standalone Guides

| Material | Status | Words | Description |
| -------- | ------ | ----- | ----------- |
| manuscript/appendix-ai-friendly-html-guide.md | ✅ | ~9,050 | Comprehensive prescriptive guide for building AI-friendly HTML (Appendix D, referenced in Chapter 10) |
| manuscript/appendix-ai-patterns-quick-reference.md | ✅ | ~1,300 | Concise HTML patterns reference for AI assistants (Appendix E, referenced in Chapter 10) |

### Implementation Case Study

| Material | Status | Words | Description |
| -------- | ------ | ----- | ----------- |
| AI-Native.blog | ✅ | ~5,000 | Complete technical blueprint for building AI-native websites using 7-layer architecture (Network, Knowledge, Action, Data, Permission, Authority, Interaction layers) |

**Purpose:** This file demonstrates a complete production implementation based on Digital Domain Technologies (allabout.network). Whilst manuscript/appendix-ai-friendly-html-guide.md focuses on HTML patterns, this guide covers the full AI-native stack including llms.txt, OASF manifests, query indexes, HTTP headers, and JavaScript handshakes. Universal patterns applicable to any website platform.

---

## manuscript/appendix-ai-friendly-html-guide.md Structure

The standalone prescriptive guide has 12 parts:

1. **Quick Reference Tables** — HTTP status codes, form field names, date formats, data attributes
2. **Simple HTML Patterns** — Authentication state, explicit state, persistent errors, tables
3. **Form Patterns** — Disabled buttons, validation, multi-step wizards, modals
4. **Page Structure Patterns** — Navigation, breadcrumbs, search, filtering, pagination, cart, confirmation, currency, shipping
5. **Structured Data** — Schema.org reference, llms.txt template, robots.txt/sitemap.xml relationship
6. **Why Modern Architecture Confuses AI** — JavaScript execution, context separation, SSR, progressive enhancement
7. **Server-Side Patterns** — Agent detection, cookie consent, captcha, traditional HTTP, rate limiting, error handling
8. **Complete Examples** — Small business template, e-commerce product page
9. **Testing and Validation** — Playwright tests (14 tests), validation tools
10. **Implementation Priority** — Priority-based roadmap from critical quick wins to advanced features
11. **Why This Matters** — Accessibility connection
12. **Building for AI Development Assistants** — Skills pattern, semantic folders, modification boundaries

---

## Key Concepts

### The Convergence Principle

What AI agents need is mostly what everyone needs. Solutions that work for agents typically improve experiences for users with accessibility needs, people with ADHD, stressed parents, and others.

### Session Inheritance Problem

Key security insight (Chapter 6): In-browser agents inherit authenticated sessions rather than failing to authenticate. Banks cannot detect AI involvement because agents inherit proof-of-humanity tokens from the authenticated user's session.

### Identity Delegation

When agents make purchases, businesses lose customer identity. Mentioned briefly as one emerging solution pattern. Multiple approaches acknowledged (retailer-specific tokens, centralised repositories, blockchain attestations, browser-native delegation). Detailed technical specification moved to separate identity-layer repository.

---

## Writing Standards

- British English throughout
- First-person narrative voice
- No colons in chapter titles
- Short dashes only
- Avoid exaggeration words
- Follow Writing_Style_V2 guidelines
- All SVG illustrations use white (#ffffff) backgrounds
- Git commits without attribution

---

## Source Materials

Content for manuscript/appendix-ai-friendly-html-guide.md drawn from:

1. llmstxt.org specification
2. "Creating an llms.txt File" — allabout.network
3. "You Built Software for Humans, Now Build It for AI" — allabout.network
4. "Why Modern Web Architecture Confuses AI" — allabout.network
5. "AI Optimization Update" — allabout.network

Real-world llms.txt example:

- Digital Domain Technologies llms.txt — <https://allabout.network/llms.txt>
- Demonstrates comprehensive structure with 91 posts across 6 categories
- Used as production reference in Chapters 9, 10, and manuscript/appendix-ai-friendly-html-guide.md

---

## Development Process

1. Draft chapter content
2. User reviews and provides feedback
3. Revise until approved
4. Create chapter artefact (markdown)
5. Design and create SVG illustration
6. Move to next chapter
7. Final consistency pass when all chapters complete

---

## Version History

| Version | Date | Changes |
| ------- | ---- | ------- |
| 1.0.0 | 2025-12-22 | Complete manuscript (10 chapters, ~40,200 words) |
| 2.0.0 | 2025-12-23 | Identity layer expansion (centralised repository concept) |
| 3.0.0 | 2025-12-24 | Identity layer reduction (moved to separate repository) |
| 3.1.0 | 2025-12-24 | Design Patterns Reference added to Chapter 10, manuscript/appendix-ai-friendly-html-guide.md created |
| 3.2.0 | 2025-12-25 | manuscript/appendix-ai-friendly-html-guide.md expanded to ~8,400 words with 12 parts, manuscript/appendix-ai-patterns-quick-reference.md created |
| 3.3.0 | 2025-12-25 | Standalone guides integrated into book chapters 9 and 10 |
| 3.4.0 | 2025-12-25 | Dark warehouses section added to Chapter 4 (~1,900 words, total ~40,200 words) |
| 2.8.0 | 2025-12-31 | Sales infrastructure added: docs/sales-enablement/ folder with business-plan.md (~18,000 words), PITCH.md (~27,500 words), executive-summary.md (~2,900 words), plan-to-market.md (~8,500 words), reviews.md (~2,500 words), plus EXECUTIVE_PITCH_DECK.md, PARTNER_KIT.md, ROI_CASE_STUDIES.md, all following agent-friendly patterns from manuscript/appendix-ai-friendly-html-guide.md |

---

## Repository Structure

```text
/
├── README.md
├── CLAUDE.md
├── CHANGELOG.md
├── LEARNINGS.md
├── PROJECTSTATE.md
├── PR_TEMPLATE.md
├── package.json
├── llms.txt                     # Repository llms.txt file
├── docs/
│   └── sales-enablement/        # Sales and partnership materials
│       ├── business-plan.md     # Complete business strategy (~18,000 words)
│       ├── PITCH.md             # Combined partnership pitch (~27,500 words)
│       ├── executive-summary.md # Executive summary (~2,900 words)
│       ├── plan-to-market.md    # Go-to-market plan (~8,500 words)
│       ├── reviews.md           # Audience validation (~2,500 words)
│       ├── EXECUTIVE_PITCH_DECK.md # Slide template (~3,300 words)
│       ├── PARTNER_KIT.md       # Outreach scripts (~4,400 words)
│       ├── ROI_CASE_STUDIES.md  # Financial case studies (~4,600 words)
│       └── reviewer-email.md    # Reviewer outreach templates
└── invisible-users/             # Book manuscript and materials
    ├── book-plan.md             # Master plan with chapter outlines and status
    ├── book-svg-style.md        # SVG illustration style guide
    ├── manuscript/              # Complete manuscript content
    │   ├── executive-summary.md
    │   ├── preface.md
    │   ├── chapter-01-*.md through chapter-11-*.md
    │   ├── The-End.md           # Final page directing to online appendices
    │   ├── Glossary.md
    │   ├── appendix-a-implementation-cookbook.md      # Appendix A source
    │   ├── appendix-b-battle-tested-lessons.md        # Appendix B source
    │   ├── appendix-c-web-audit-suite-guide.md        # Appendix C source
    │   ├── appendix-d-ai-friendly-html-guide.md       # Appendix D source (~9,050 words)
    │   ├── appendix-e-ai-patterns-quick-reference.md  # Appendix E source (~1,300 words)
    │   ├── appendix-f-implementation-roadmap.md       # Appendix F source (~2,750 words)
    │   ├── appendix-g-resource-directory.md           # Appendix G source (~1,950 words)
    │   ├── appendix-h-live-llms.md                    # Appendix H wrapper
    │   ├── appendix-h-live-llms.txt                   # Appendix H content (DDT llms.txt reference)
    │   ├── appendix-i-pipeline-failure-case-study.md  # Appendix I source (~2,500 words)
    │   ├── appendix-j-industry-developments.md        # Appendix J source (~3,800 words)
    │   ├── web/                                       # Generated HTML appendices (published online)
    │   │   ├── index.html       # Appendices landing page
    │   │   ├── llms.txt         # AI agent discovery file
    │   │   └── appendix-{a-j}.html  # 10 individual appendix pages
    │   ├── agent-friendly-starter-kit/              # Code examples (good/ vs bad/)
    │   ├── code-examples/                           # Production-ready code implementations
    │   │   ├── html-examples/
    │   │   ├── apache/
    │   │   ├── nginx/
    │   │   ├── nextjs/
    │   │   ├── wordpress/
    │   │   ├── eds/
    │   │   ├── static-site/
    │   │   ├── monitoring/
    │   │   └── validation/
    │   ├── blog/                                    # Blog and promotional materials
    │   │   ├── blog.md                              # Promotional blog post
    │   │   ├── blog.svg                             # Blog post illustration
    │   │   └── AI-Native.blog                       # AI-native website guide (~38,000 words)
    │   └── illustrations/
    │       └── chapter-01-*.svg through chapter-11-*.svg
    └── llms.txt                 # Example llms.txt file from book content
```

---

## Licence

Copyright © Tom Cranstoun. All rights reserved.

This manuscript is not licensed for public use, reproduction, or distribution.

---

**Last updated:** 2026-01-10 — Restructured book to publish appendices separately online at <https://about.network/invisible-users/web/>; book now ends with The-End.md chapter; added npm run pdf:appendix command to generate HTML appendices with navigation and llms.txt discovery
