# MX-Bible: Designing the Web for AI Agents and Everyone Else

## Complete Table of Contents

**Author:** Tom Cranstoun
**Format:** 465 pages, 6"×9" paperback
**Word Count:** ~78,000 words (core manuscript)

---

## Front Matter

### Preface (~2,678 words)

The author's journey discovering how modern web design patterns fail for AI agents whilst researching production systems across 25 years of web development.

**Key sections:**

- The booking that never happened
- Two years of investigation
- What this book covers
- Who should read this
- Acknowledgements
- About the author

### Reading Guide (~1,151 words)

Navigation guidance with tailored reading paths for five distinct audiences:

- Business leaders and decision-makers
- Product owners and managers
- UX designers and information architects
- Software developers and engineers
- Agent system developers

---

## Part I: The Problem

### Chapter 1: What You Will Learn (~2,894 words)

Introduction establishing the collision between human-optimised web design and AI agent compatibility, with the accessibility connection as the unifying principle.

**Sections:**

1. The agent that couldn't find the checkout button
2. What this book covers (and doesn't)
3. The accessibility parallel - Why fixing agent problems benefits everyone
4. Who should read this - Four primary audiences with distinct needs
5. How the book is structured - Three-part progression from problem to solution
6. The urgency of now - January 2025 platform convergence

**Key concepts introduced:**

- Invisible failure patterns
- The convergence principle
- Served HTML vs rendered HTML
- Agent diversity (CLI, browser, server-based)

### Chapter 2: The Invisible Failure (~5,760 words)

Detailed examination of five categories of failure patterns that affect agents but remain invisible to traditional analytics and human users.

**Sections:**

1. The booking that never happened - Real-world case study
2. What agents actually see - Technical perspective on HTML parsing
3. The five types of invisible failure:
   - State changes without explicit markers
   - Ephemeral feedback that disappears
   - JavaScript-dependent content
   - Pagination hiding information
   - Authentication barriers
4. Why developers don't notice - Analytics blind spots
5. The feedback loop that doesn't exist - Agents don't file bug reports
6. Measuring what you can't see - Detection strategies

**Key takeaway:** Failures are systematic, predictable, and measurable once you know what to look for.

### Chapter 3: The Architectural Conflict (~4,192 words)

How modern web architecture creates agent compatibility problems through patterns optimised exclusively for human visual parsing.

**Sections:**

1. The JavaScript execution problem - Static vs dynamic HTML
2. Single-page applications and state management - Context separation
3. The hydration gap - Server rendering vs client rendering
4. API-first versus page-first architecture
5. The mobile app parallel - Similar challenges, different solutions
6. Progressive enhancement revisited - Why it matters again
7. Headless CMS and the missing context
8. Server-side rendering for agents - Technical approaches

**Technical depth:** Explains architectural decisions and their implications for agent compatibility.

### Chapter 4: The Business Reality (~10,009 words)

Commercial implications of agent-mediated commerce, including customer relationship changes, competitive dynamics, and ROI frameworks.

**Sections:**

1. When agents make purchases - Transaction patterns
2. The brand visibility problem - Agents as intermediaries
3. The price comparison acceleration - Competitive pressure
4. Dark warehouses (brief speculative pattern) - Agent-optimised facilities
5. The recommendation influence - Platform power dynamics
6. The customer relationship question - Identity and loyalty
7. Identity delegation patterns (brief) - Emerging solutions
8. Who wins, who loses - Competitive implications
9. The small business perspective - Resource constraints and opportunities

**Enhanced content:**

- Real-world cost impact table showing business scenarios with specific lost revenue
- ROI framework for evaluating agent compatibility investments
- Decision matrix for prioritising implementation

**Key insight:** Agent compatibility shifts from optional enhancement to competitive infrastructure.

---

## Part II: The Context

### Chapter 5: The Content Creator's Dilemma (~6,129 words)

How AI summarisation and agent consumption threatens advertising-funded content business models.

**Sections:**

1. The attention economy under pressure - Traffic without ad impressions
2. When summarisation replaces visiting - Content extraction
3. The advertising model collision - Revenue implications
4. The subscription alternative - Paywall strategies
5. The micropayment dream - Transaction cost challenges
6. What content creators can do now - Practical responses
7. The uncomfortable middle ground - Living with uncertainty
8. Emerging licensing models - Commercial arrangements

**Enhanced content:**

- Revenue impact calculator showing how agent traffic percentage affects viability
- Threshold analysis: 30% agent traffic = marginal, 50% = unsustainable

**Tone:** Balanced exploration without prescribing specific business model solutions.

### Chapter 6: The Security Maze (~4,385 words)

Security implications when AI agents act on user behalf, particularly the session inheritance problem.

**Sections:**

1. The session inheritance problem (key insight) - Agents inherit authentication
2. When agents inherit authentication - Technical mechanism
3. The bank that couldn't tell - Detection impossibility
4. Liability questions without answers - Legal uncertainty
5. Agent identification challenges - Technical limitations
6. The verification paradox - Proof of humanity vs agent access
7. Rate limiting and abuse - Distinguishing legitimate from malicious
8. What security teams should consider - Practical guidance

**Enhanced content:**

- Indistinguishability comparison table (Legitimate User vs Authorised Agent vs Malware Attack)
- All three scenarios share identical characteristics from server perspective

**Critical insight:** In-browser agents inherit proof-of-humanity tokens, making detection fundamentally different from server-based agent access.

### Chapter 7: The Legal Landscape (~4,395 words)

Legal frameworks struggling to keep pace with agent-mediated commerce and automated access patterns.

**Sections:**

1. Agency law meets AI agents - Legal personhood questions
2. Terms of service and automated access - Enforceability challenges
3. Copyright in the age of extraction - Fair use debates
4. Data protection complications - GDPR and agent data processing
5. The consent problem - Who consents for agent actions?
6. Cross-border enforcement - Jurisdiction challenges
7. What might change - Regulatory evolution
8. Practical legal considerations - Risk mitigation

**Enhanced content:**

- Legal grey zone scenarios table showing five situations with current status, unclear areas, and needed clarification

**Approach:** Documents uncertainty without providing legal advice or predicting specific outcomes.

### Chapter 8: The Human Cost (~4,153 words)

Digital divide implications when agent access creates new barriers for populations without agent access.

**Sections:**

1. The access problem (who has agents, who doesn't) - Distribution inequality
2. The capability gap - Technical literacy requirements
3. The language exclusion (English dominance) - Linguistic barriers
4. The age divide - Generational adoption patterns
5. The disability question (benefits and harms) - Mixed implications
6. The education gap - Knowledge requirements
7. The economic divide - Cost barriers
8. Geographic and language complications - Global inequality
9. What can be done (maintain human interfaces, support access, regulate)
10. The uncomfortable reality about technology transitions

**Enhanced content:**

- Access barriers matrix showing five barrier types with exclusion impacts and gap-widening effects

**Tone:** Acknowledges problems without pretending to solve systemic inequality, focuses on mitigation strategies.

### Chapter 9: The Platform Race (~5,377 words)

Platform competition, urgency, and the open vs closed dynamic. This chapter bridges problems → solutions.

**Sections:**

1. The Seven-Day Acceleration (January 2025: Amazon, Microsoft, Google)
2. Open vs Closed Competition (ACP, UCP vs Copilot Checkout)
3. The Players and Their Strategies
4. Microsoft's Isolation - Proprietary approach
5. The Fragmentation Danger (ACP vs UCP compatibility)
6. Ecosystem Maturity Signal (20+ retailers endorsing common protocol)
7. What This Means for Different Audiences (businesses, agent creators, investors, users)
8. Timeline Urgency - Read This Book NOW

**Tone:** Urgent, immediate - "THIS IS HAPPENING NOW, not future speculation"

**Purpose:** Establishes commercial urgency that motivates why readers need the solutions in Chapters 10-13 immediately.

---

## Part III: The Solutions

### Chapter 10: Generative Engine Optimization (~13,076 words)

Discovery patterns that work for search engines and AI agents, establishing discoverability as unified strategy.

**Sections:**

1. The death of the click - How AI answer engines change discovery
2. GEO vs SEO - Citation vs ranking, the convergence principle
3. The three layers of discovery:
   - Site-wide guidance (robots.txt, llms.txt)
   - Page-level metadata (Schema.org, Open Graph, Twitter Cards)
   - Content structure (semantic HTML, headings, lists)
4. robots.txt + llms.txt - Parallel guidance systems
5. JSON-LD structured data - Serves both SEO and GEO
6. Business decision framework - When to emphasize discoverability vs protect content
7. Transaction-focused businesses vs ad-funded content
8. Measuring GEO success - Beyond clicks (citation frequency, traffic attribution, structured data validation)
9. Implementation priorities - Priority-based roadmap
10. The trust dividend - Platform citations compound over time
11. Real-world validation - Tailwind Labs case study
12. Content type disambiguation - Preventing confusion with entertainment scripts
13. VAT treatment and international pricing - Format-specific pricing structures
14. Connecting to Chapter 11 - Discovery leads to usability

**Key insight:** The patterns that help AI agents cite you correctly are the same patterns that improve traditional search ranking. GEO and SEO converge.

### Chapter 11: Designing for Both (~6,773 words)

Solutions that work for agents without degrading human experience. The convergence argument with real production examples.

**Sections:**

1. Clear state instead of implied state - Explicit state attributes
2. Persistent errors instead of ephemeral ones - Error message patterns
3. Explicit feedback instead of subtle cues - Validation patterns
4. Complete information instead of forced pagination - Content completeness
5. Semantic structure and JSON-LD - Structured data implementation
6. Advertising your API with meta tags - Discovery metadata
7. Identity delegation patterns (brief) - Forward-compatible mention
8. Real examples of good design:
   - Stripe: API documentation and form patterns
   - GitHub: Semantic HTML and explicit state
   - Amazon: Structured product data
   - Calendly: Clear booking confirmation
   - Wikipedia: Complete semantic structure
9. The small business version - Resource-appropriate patterns
10. What good looks like at different scales
11. The standards that might emerge - Future possibilities
12. Success stories and patterns - Production validation
13. Static alternatives for dynamic content - Carousel, animation, media patterns

**Enhanced content:**

- Priority-based implementation roadmap (Priority 1: Critical Quick Wins, Priority 2: Essential Improvements, Priority 3: Core Infrastructure)
- Pattern comparison table (before/after) showing six categories with problematic patterns vs better approaches

### Chapter 12: Technical Advice (~11,468 words)

Implementation code, testing strategies, and practical tools with production-ready examples.

**Note:** Contains simplified, readable code examples optimised for learning, not production copy-paste.

**Sections:**

1. Detection layer (client-side and server-side) - Identifying agent access
2. Dual-interface architecture - Serving appropriate HTML
3. Agent-friendly form patterns - Field naming and structure
4. Synchronous validation - Immediate feedback patterns
5. Agent-readable metadata layer - Data attributes and Schema.org
6. Loading state clarity - Explicit state management
7. Traditional multi-page alternatives to SPAs - Progressive enhancement
8. Persistent error display - Error message patterns
9. CSS for disabling animations - Respecting prefers-reduced-motion
10. Analytics segmentation - Distinguishing human from agent traffic
11. Honeypot fields - Bot detection
12. Rate limiting by type - Differential throttling
13. API alternatives - Structured data endpoints
14. Identity delegation (basic pattern) - Forward-compatible implementation
15. Testing for agent compatibility - Validation strategies
16. Debugging agent failures - Diagnostic approaches
17. Version management and breaking changes - API evolution
18. Design Patterns Reference (10 patterns) - Quick lookup
19. Common Mistakes to Avoid (6 mistakes) - Pitfall prevention
20. Implementation by Scale - Small business to enterprise
21. Carousel state attributes (2a) - Dynamic content pattern
22. Animation controls (2b) - Autoplay handling
23. Media role disambiguation (2c) - Background vs content video

**Code examples cover:**

- Apache, Nginx configuration
- Next.js implementation
- WordPress integration
- Adobe EDS patterns
- Static site generators
- Monitoring and validation

**Enhanced content:**

- Complete code examples with inline comments
- Platform-specific adaptations
- Testing patterns with example assertions

### Chapter 13: What Agent Creators Must Build (~9,440 words)

Implementation patterns, validation layers, and guardrails for reliable agent systems. The other side of the ecosystem.

**Sections:**

1. The three failure types - Website design, reasoning, pipeline failures
2. Anatomy of the £203k error - Detailed case study of pipeline failure
3. The validation gap:
   - Range validation (price reasonableness)
   - Comparative analysis (cross-reference checking)
   - Incomplete data detection (missing required fields)
   - Structured data cross-reference (Schema.org validation)
4. Confidence thresholds and decision points - When to proceed vs seek human input
5. Guardrails agent creators should build:
   - Price reasonableness checking
   - Comparative validation
   - Incomplete data detection
   - Confidence scoring
   - Graceful degradation
6. Agent architecture considerations - Browser extensions, CLI agents, server-based agents
7. Learning from production failures - Iterative improvement
8. The validation roadmap - Priority-based implementation
9. Conclusion - Completing the ecosystem view (both sides must improve)

**Key insight:** Pipeline failures occur when agents fail to validate data during extraction. The £203k cruise pricing error wouldn't have occurred if either the website provided clear structured data (Chapter 12) or the agent had validation layers (Chapter 13).

**Enhanced content:**

- Complete validation pipeline code examples
- Range checking algorithms
- Comparative analysis patterns
- Confidence scoring implementation
- Graceful degradation examples

---

## Back Matter

### The End (~570 words)

Final page directing readers to online appendices with full descriptions of each appendix and access URL.

**Content:**

- Brief explanation of why appendices are online (rapid field evolution)
- Description of all 12 appendices (A-L)
- URL for access: <https://allabout.network/invisible-users/web/>
- Invitation to join ongoing conversation

### Glossary (~2,350 words)

Comprehensive technical glossary with 60+ terms and cross-references.

**Categories:**

- AI agent types and architectures
- Web architecture terms
- Accessibility concepts
- Discovery and SEO terminology
- Security patterns
- Legal frameworks

**Format:** Alphabetical entries with clear definitions and chapter cross-references.

---

## Online Appendices (~58,600 words)

Published separately at <https://allabout.network/invisible-users/web/> and maintained as living documents.

### Appendix A: Implementation Cookbook (~3,082 words)

Quick-reference recipes for common patterns with before/after code examples.

**12 recipes covering:**

- Form field naming
- Error message persistence
- Loading state clarity
- Pagination alternatives
- Structured data implementation
- robots.txt configuration
- llms.txt creation
- Schema.org JSON-LD
- Meta tag validation
- Agent detection
- Rate limiting
- Testing strategies

### Appendix B: Battle-Tested Lessons (~2,301 words)

Production learnings from two years of research and real-world implementation.

**Lessons organized by category:**

- What worked immediately
- What needed iteration
- What failed and why
- Unexpected discoveries
- Platform-specific gotchas

### Appendix C: Web Audit Suite Guide (~3,782 words)

Documentation for the companion analysis tool implementing book's patterns.

**Content:**

- Installation and setup
- Running analysis
- Interpreting reports
- LLM suitability metrics
- Visual dynamism detection
- Custom configuration
- CI/CD integration

### Appendix D: AI-Friendly HTML Guide (~10,588 words)

Comprehensive prescriptive guide for building AI-friendly HTML with 13 parts.

**Structure:**

1. Quick reference tables
2. Simple HTML patterns
3. Form patterns
4. Page structure patterns
5. Structured data
6. Why modern architecture confuses AI
7. Server-side patterns
8. Complete examples
9. Testing and validation
10. Implementation priority
11. Why this matters
12. Building for AI development assistants
13. Dynamic content patterns

### Appendix E: AI Patterns Quick Reference (~1,394 words)

One-page data attribute reference for quick lookup during development.

**Format:** Table of data attributes with purpose and usage examples.

### Appendix F: Implementation Roadmap (~4,432 words)

Priority-based adoption guide with four priority levels.

**Structure:**

- Priority 1: Critical Quick Wins
- Priority 2: Essential Improvements
- Priority 3: Core Infrastructure
- Priority 4: Advanced Features

### Appendix G: Resource Directory (~2,120 words)

Curated directory of 150+ resources across 10 categories.

**Categories:**

- Standards and specifications
- Testing tools
- Monitoring services
- Documentation
- Case studies
- Community resources

### Appendix H: Example llms.txt File (~768 words)

Working template demonstrating llmstxt.org format with 20 curated links.

**Content:** Complete llms.txt file that can be copied and adapted.

### Appendix I: Pipeline Failure Case Study (~2,838 words)

Complete analysis of the £203k cruise pricing error with technical breakdown.

**Sections:**

- What happened
- Why it happened
- What should have prevented it
- Lessons for website owners
- Lessons for agent creators

### Appendix J: Industry Developments (~16,460 words)

Latest verified industry news tracking platform launches and protocol development.

**Format:** Chronological entries with verification sources.

**Status:** LIVE document updated as significant developments occur.

### Appendix K: Common Page Patterns (~12,517 words)

Production-ready HTML templates for 15 common page types with complete code.

**Page types:**

- Homepage
- Product page
- Article page
- Booking page
- Form page
- Search results
- Profile page
- Dashboard
- Documentation
- Checkout
- Confirmation
- Error page
- Login
- Contact
- FAQ

### Appendix L: Proposed AI Metadata Patterns (~2,956 words)

Formal W3C-style proposals for experimental patterns with specification format.

**Content:**

- Proposed data attributes
- Usage patterns
- Implementation examples
- Forward compatibility considerations

---

## Specifications

**Total Pages:** 465 (6"×9" format)
**Core Manuscript:** ~78,000 words
**Online Appendices:** ~58,600 words
**Total Comprehensive Content:** ~140,000 words
**Chapters:** 13 + preface + glossary
**Illustrations:** 13 custom SVG/PNG diagrams
**Code Examples:** 100+ production-ready patterns
**Platforms Covered:** Apache, Nginx, Next.js, WordPress, Adobe EDS, static sites

---

## Reading Paths

**For business leaders:** Chapters 1, 4, 5, 9, 11 + Executive Summary
**For developers:** Chapters 1, 2, 3, 11, 12 + Appendices D, E, K
**For architects:** Chapters 1, 3, 4, 6, 11, 12 + Appendices D, F
**For product managers:** Chapters 1, 4, 5, 9, 11 + Appendix F
**For agent creators:** Chapters 1, 2, 6, 13 + Appendix I

**Complete sequential reading:** All chapters build on previous concepts for comprehensive understanding.
