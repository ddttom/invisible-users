# The Invisible Users
## Designing the Web for AI Agents and Everyone Else

---

## Book Plan

### Overview

A practical guide to the collision between modern web design and AI agents. The book examines how interfaces optimised for human users fail for automated visitors - and argues that fixing this benefits everyone.

**Target length:** 30,000 - 50,000 words (10 chapters, 3,000-5,000 words each)

**Reading approach:** Sequential - each chapter builds on previous concepts

---

## Key Concept - The Missing Identity Layer

A recurring theme throughout the book. When agents act on behalf of customers, the relationship between business and customer breaks down. The solution is an identity delegation standard:

> "Agent X makes this purchase on behalf of Customer Y, who authorises the sharing of their identity for warranty registration and loyalty participation."

**The problem this solves:**
- Businesses lose customer identity when agents transact
- Loyalty programmes cannot function (agent earns no points)
- Warranty registration fails (who owns the product?)
- Customer relationship data disappears
- Retargeting and personalisation become impossible

**The proposed solution:**
- Standardised identity delegation protocol
- Customer authorises specific data sharing
- Agent carries identity token with purchase
- Business maintains customer relationship
- Everyone benefits: customer gets loyalty/warranty, business keeps data

**Chapters that must reference this concept:**
- Chapter 4 (Business Reality) - introduces the problem
- Chapter 6 (Security Maze) - authentication and delegation ✅
- Chapter 9 (Designing for Both) - design patterns for identity
- Chapter 10 (Technical Advice) - implementation code

---

## Chapter Structure

| # | Title | Status | Words | SVG |
|---|-------|--------|-------|-----|
| 1 | What You Will Learn | ✅ Complete | ~2,700 | ✅ |
| 2 | The Invisible Failure | ✅ Complete | ~3,800 | ✅ |
| 3 | The Architectural Conflict | ✅ Complete | ~3,700 | ✅ |
| 4 | The Business Reality | ✅ Complete | ~4,200 | ✅ |
| 5 | The Content Creator's Dilemma | ✅ Complete | ~4,100 | ✅ |
| 6 | The Security Maze | ✅ Complete | ~3,500 | 🔲 |
| 7 | The Legal Landscape | 🔲 To write | - | 🔲 |
| 8 | The Human Cost | 🔲 To write | - | 🔲 |
| 9 | Designing for Both | 🔲 To write | - | 🔲 |
| 10 | Technical Advice | 🔲 To write | - | 🔲 |

---

## SVG Illustration Requirements

Each chapter requires one SVG illustration following these specifications:

**Technical specifications:**
- Viewbox: 800x500 or 900x600 (consistent within book)
- Background: #ffffff (white) - mandatory for all illustrations
- Font family: system-ui, sans-serif (or Georgia for titles)
- Export format: SVG with embedded styles

**Visual style:**
- Clean, professional appearance
- Colour coding for concepts (green = working/good, amber/red = broken/problem)
- Dashed borders for failure states
- Solid borders for success states
- Clear labels and annotations
- No decorative elements - every visual serves a purpose

**Content approach:**
- Each illustration should capture the chapter's central concept
- Split-view comparisons work well (human vs agent, before vs after)
- Flow diagrams for processes
- Side-by-side contrasts for differences

**Completed illustrations:**
1. Chapter 1 - "Same Website, Different Reality" (human vs agent perception split)
2. Chapter 2 - "The Anatomy of Invisible Failure" (six failure pattern cards)
3. Chapter 3 - "The Architectural Conflict" (cognition vs parsing comparison)
4. Chapter 4 - "The Business Model Collision" (revenue and relationship breakdown)
5. Chapter 5 - "The Content Creator's Dilemma" (value extraction flow)

**Pending illustrations:**
6. Chapter 6 - "The Security Maze" (session inheritance and delegation concepts)

---

## Chapter Summaries

### Chapter 1 - What You Will Learn
**Status:** ✅ Complete

Opens with the accessibility connection - patterns that break agents also break humans. Introduces the holiday planning failure as a concrete example. Establishes what the book covers, who it's for, and what readers will be able to do. Sets up the uncomfortable truth about business tensions while highlighting the opportunity for early movers.

**Key themes:**
- The accessibility parallel
- Invisible failures happening at scale
- Commercial pressure creating change
- Building for machines means building for all humans

---

### Chapter 2 - The Invisible Failure
**Status:** ✅ Complete

Detailed examination of specific failure patterns. Real examples with technical explanation of why each breaks.

**Sections covered:**
- Toast notifications that vanish
- Pagination hiding content
- Single-page applications and invisible state changes
- Forms that validate only after submission
- Progressive pricing disclosure
- Loading states and spinners
- Hidden content behind tabs and accordions
- The false positive crisis - agents reporting success incorrectly

**Source material:** long_blog_part_1, Designing_for_AI

---

### Chapter 3 - The Architectural Conflict
**Status:** ✅ Complete

Deep dive into why this happens. The fundamental mismatch between human cognitive models and AI parsing needs.

**Sections covered:**
- Human cognitive patterns (7±2 items, chunking, spatial memory)
- AI parsing patterns (sequential DOM, single pass, no intuition)
- Why progressive disclosure works for humans, fails for agents
- The SPA navigation problem
- Validation and error feedback timing
- The console.log fallacy
- Why HATEOAS failed and what it teaches us
- The need for semantic meaning over visual inference

**Source material:** Architectural_Conflict, long_blog_part_1

---

### Chapter 4 - The Business Reality
**Status:** ✅ Complete

Economics of agent traffic. Who wins, who loses, and why incentives often conflict with user efficiency. **Introduces the Missing Identity Layer problem.**

**Sections covered:**
- The revenue model collision (advertising vs efficiency)
- Recipe sites as case study
- E-commerce aligned incentives
- The Amazon problem and price comparison death spiral
- SaaS pricing paradoxes
- Data collection collapse
- Customer acquisition cost dynamics
- The severed customer relationship (loyalty, warranty, identity)
- **The Missing Identity Layer** - proposed solution for agent-mediated transactions
- Competitive dynamics and winner-takes-all effects
- Platform power shifts
- The strategic positioning matrix

**Source material:** Business_implications

---

### Chapter 5 - The Content Creator's Dilemma
**Status:** ✅ Complete

Focus on ad-funded content creators. The existential threat and possible paths forward.

**Sections covered:**
- The business model under threat (with maths)
- Recipe sites in detail
- The ethical question - is extraction theft or progress?
- Publisher response options (blocking, paywalls, APIs, hybrid)
- The detection arms race
- Platform responsibility (attribution, compensation, opt-out)
- Possible future models (YouTube approach, Spotify approach, Library approach)
- The user perspective and sustainability
- Intermediate solutions while long-term models emerge

**Source material:** more_context_1

---

### Chapter 6 - The Security Maze
**Status:** ✅ Complete

Authentication, authorisation, and the hard problems of secure agent access. **Covers identity delegation for the Missing Identity Layer.** Introduces the session inheritance problem - agents that inherit authenticated sessions rather than failing to authenticate.

**Sections covered:**
- **Two distinct problems** - agents that can't authenticate vs agents that inherit authentication invisibly
- **Session inheritance** - browser extensions reading authenticated pages (bank balance example)
- Why detection fails (same device, same session, same behaviour)
- **The email command channel vulnerability** - spoofed emails triggering agent commands
- Liability uncertainty (bank, browser, extension, LLM provider, user)
- The credential dilemma for external agents
- The two-factor wall
- **Secure delegation model** - OAuth-style authorisation with scoped permissions
- **Missing Identity Layer integration** - delegation tokens carrying customer identity
- Cookie consent hell and GDPR irony
- Bot detection arms race and collateral damage
- Session inheritance bypassing all detection
- Privacy and sensitive data (gradient of sensitivity)
- Multi-step workflows and state management
- The path forward (short/medium/long-term)

**Key new material from "Email Command Channel" article:**
- In-browser agents inherit proof-of-humanity tokens
- Banks cannot detect AI involvement in authenticated sessions
- Email spoofing enables command injection attacks
- No clear liability framework exists

**Source material:** more_context_1, more_context_2, "Email Command Channel" article

---

### Chapter 7 - The Legal Landscape
**Status:** 🔲 To write

Liability, terms of service, copyright, and regulatory frameworks still being defined.

**Sections to cover:**
- The liability question (wrong bookings, unauthorised purchases, data breaches)
- Terms of service conflicts
- The copyright question and fair use arguments
- Privacy regulations (GDPR, CCPA) and agent access
- The accessibility question and legal obligations
- Authentication and fraud considerations
- Algorithmic accountability
- Cross-border complexity
- What sites should do (updated terms, copyright guidance, privacy practices)
- What agent platforms should do
- What users should know

**Source material:** more_context_2

---

### Chapter 8 - The Human Cost
**Status:** 🔲 To write

Who benefits and who gets left behind. The digital divide implications.

**Sections to cover:**
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

**Source material:** more_context_3

---

### Chapter 9 - Designing for Both
**Status:** 🔲 To write

Solutions that work for agents without degrading human experience. The convergence argument. **Must include design patterns for identity delegation.**

**Sections to cover:**
- Clear state instead of implied state
- Persistent errors instead of ephemeral ones
- Explicit feedback instead of subtle cues
- Complete information instead of forced pagination
- Semantic structure and JSON-LD
- Advertising your API with meta tags
- **Identity layer design patterns** - UI for agent authorisation
- **Loyalty and warranty in agent flows** - preserving customer benefits
- Real examples of good design (Stripe, GitHub, Amazon, Calendly, Wikipedia)
- The small business version
- What good looks like at different scales
- The standards that might emerge
- Success stories and patterns

**Source material:** long_blog_part_1, long_blog_part_2, more_context_3

---

### Chapter 10 - Technical Advice
**Status:** 🔲 To write

Implementation code, testing strategies, and practical tools. **Must include complete identity layer implementation.**

**Sections to cover:**
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
- **Identity Layer Implementation:**
  - Agent authorisation token generation
  - Identity delegation endpoint
  - Loyalty programme integration
  - Warranty registration with agent purchases
  - Customer identity verification
  - Token scoping and expiry
  - Example: complete checkout with identity delegation
- Testing for agent compatibility
- Debugging agent failures
- Version management and breaking changes
- Implementation checklist

**Source material:** Tactical_1, Tactical_2

---

## Development Process

1. Draft chapter
2. User reviews and provides feedback
3. Revise until approved
4. Create chapter artifact (markdown)
5. Create illustration (SVG) - white background, consistent style
6. Move to next chapter
7. Final consistency pass when all chapters complete

---

## Supporting Materials (To Create)

- [ ] Cover design
- [x] Chapter illustrations (5 of 10 complete, 1 pending)
- [ ] Code examples repository
- [ ] Implementation checklist (standalone)
- [ ] Glossary of terms
- [ ] Resource links
- [ ] Identity Layer specification document

---

## Notes

- British English throughout
- No colons in titles
- Short dashes only
- First-person narrative voice
- Code examples: simple JavaScript, minimal dependencies
- Avoid exaggeration words
- Follow Writing_Style_V2 guidelines
- All SVG illustrations must use white (#ffffff) backgrounds
- Identity Layer concept threads through chapters 4, 6, 9, and 10
- Session inheritance concept (from "Email Command Channel") is key security insight in Chapter 6

---

*Last updated: Chapters 1-6 complete (Chapter 6 SVG pending)*
