# Agent-Ready Partner Toolkit Template

**Purpose:** This toolkit enables agencies and development partners to offer agent-readiness audits, training, and implementation services to their clients.

**Last updated:** 2026-01-17

---

## Toolkit Overview

This partner toolkit provides everything needed to:

- Audit client websites for agent compatibility
- Present findings to clients with business justification
- Propose remediation work with clear pricing
- Implement agent-ready patterns
- Position agency as agent-readiness expert

**Who this is for:**

- Digital agencies (web development, marketing, design)
- CMS implementation partners (Adobe, Kentico, Contentful, etc.)
- System integrators serving enterprise clients
- Consultancies offering digital strategy services

---

## Contents

1. **Discovery and Audit Templates** - Client questionnaires, audit checklists, scoring methodology
2. **Proposal Templates** - Business case, pricing models, scope of work
3. **Implementation Guides** - Pattern libraries, code examples, validation tools
4. **Training Materials** - Workshop curriculum, presentation decks, certification path
5. **Marketing Assets** - Service descriptions, case studies, positioning documents
6. **Pricing Guidance** - Benchmarks, value-based pricing, package structures

---

## Part 1: Discovery and Audit Templates

### 1.1 Client Discovery Questionnaire

**Purpose:** Understand client's current state and agent-readiness needs before audit

**Questions to ask:**

**Business Context:**

- What percentage of your traffic comes from search engines vs direct visits?
- How do customers currently discover your products/services?
- Do you track referrals from AI platforms (ChatGPT, Claude, Perplexity)?
- What's your primary revenue model? (E-commerce, advertising, subscriptions, lead generation)
- Are you experiencing unexplained traffic decline or conversion drops?

**Technical Context:**

- What CMS/platform powers your website? (AEM, Kentico, Contentful, custom)
- Is your site primarily server-rendered or client-side JavaScript (SPA)?
- Do you use structured data (Schema.org, JSON-LD)?
- Do you have a sitemap.xml and robots.txt?
- Do you track accessibility compliance (WCAG 2.1)?

**Competitive Context:**

- Are competitors appearing in AI-generated results when you're not?
- Do you know if competitors have implemented agent-friendly patterns?
- What would competitive advantage in agent discovery mean to your business?

**Resource Context:**

- What's your development team size and capability?
- What's your appetite for technical infrastructure changes?
- What's your timeline for improvements? (Immediate, 3-6 months, 12+ months)
- What budget range are you considering for agent-readiness work?

**Template download:** `partner-toolkit-templates/client-discovery-questionnaire.pdf`

---

### 1.2 Technical Audit Checklist

**Purpose:** Systematic evaluation of website against agent-compatibility criteria

**Scoring methodology:**

- Each category scored 0-100
- Overall score is weighted average
- Categories: Discoverability (30%), Structure (25%), State Management (20%), Transactions (15%), Content Quality (10%)

**Audit checklist:**

### Category 1: Discoverability (30% weight)

- [ ] robots.txt exists and allows agent access (10 points)
- [ ] robots.txt quality score >70/100 (10 points)
- [ ] llms.txt exists at root (10 points)
- [ ] llms.txt quality score >70/100 (10 points)
- [ ] Sitemap.xml exists and is current (10 points)
- [ ] Meta tags present (title, description, keywords) (10 points)
- [ ] Open Graph tags present (10 points)
- [ ] Twitter Card tags present (10 points)
- [ ] Canonical URLs properly configured (10 points)
- [ ] Schema.org JSON-LD present on key pages (10 points)

### Category 2: Semantic Structure (25% weight)

- [ ] HTML5 semantic elements used (`<main>`, `<nav>`, `<article>`, `<section>`) (20 points)
- [ ] Heading hierarchy logical (H1→H2→H3, no skips) (15 points)
- [ ] Navigation landmarks properly labeled (15 points)
- [ ] Skip links present for keyboard users (10 points)
- [ ] ARIA attributes used appropriately (not redundant) (10 points)
- [ ] Forms have proper labels and field names (15 points)
- [ ] Tables have proper headers and captions (10 points)
- [ ] Content readable without CSS (5 points)

### Category 3: State Management (20% weight)

- [ ] Form validation errors persistent (not ephemeral) (25 points)
- [ ] Loading states explicit (aria-busy, data-loading-state) (20 points)
- [ ] Error messages have role="alert" (20 points)
- [ ] Success confirmations persistent (15 points)
- [ ] Navigation state clear (active page, breadcrumbs) (10 points)
- [ ] No toast notifications as only feedback mechanism (10 points)

### Category 4: Transactions (15% weight)

- [ ] Add-to-cart functionality works without JavaScript (20 points)
- [ ] Checkout process has clear multi-step indicators (20 points)
- [ ] Form field names use standard conventions (email, firstName, lastName) (20 points)
- [ ] Payment options explicit before checkout (15 points)
- [ ] Shipping/delivery information clear upfront (15 points)
- [ ] Order confirmation includes all details (10 points)

### Category 5: Content Quality (10% weight)

- [ ] Content structured with clear headings (20 points)
- [ ] Key information not hidden in images (20 points)
- [ ] Prices clearly displayed with currency symbols (20 points)
- [ ] Contact information in `<address>` element (15 points)
- [ ] Publication dates in machine-readable format (`<time>`) (15 points)
- [ ] No critical content dependent on JavaScript execution (10 points)

**Template download:** `partner-toolkit-templates/technical-audit-checklist.xlsx`

---

### 1.3 Agent Behavior Testing Protocol

**Purpose:** Test how real AI agents interact with client's website

**Testing scenarios:**

### Scenario 1: Product Discovery

- **Agent prompt:** "Find [specific product/service] on [client domain]"
- **Success criteria:** Agent locates correct page, extracts accurate information
- **Failure patterns:** Can't find product, extracts wrong price, misses key features
- **Test with:** ChatGPT, Claude, Perplexity

### Scenario 2: Comparison Shopping

- **Agent prompt:** "Compare [product A] and [product B] on [client domain]"
- **Success criteria:** Agent extracts accurate details for both, makes valid comparison
- **Failure patterns:** Compares wrong products, missing specifications, incorrect pricing
- **Test with:** ChatGPT, Claude

### Scenario 3: Transaction Initiation

- **Agent prompt:** "Help me buy [product] from [client domain]"
- **Success criteria:** Agent navigates to product, adds to cart, reaches checkout
- **Failure patterns:** Can't find add-to-cart, confused by multi-step process, abandons
- **Test with:** Browser automation agents (if available)

### Scenario 4: Customer Support

- **Agent prompt:** "What are [client's] shipping options and return policy?"
- **Success criteria:** Agent finds and accurately summarizes policies
- **Failure patterns:** Can't locate information, extracts from wrong section, hallucinates
- **Test with:** ChatGPT, Claude, Perplexly

**Documentation template:** Record agent responses, success/failure, specific issues encountered

**Template download:** `partner-toolkit-templates/agent-behavior-testing-template.docx`

---

### 1.4 Competitive Benchmarking Template

**Purpose:** Show client how competitors perform on agent compatibility

**Benchmarking approach:**

- Identify 3-5 direct competitors
- Run same audit checklist on competitor sites
- Compare scores across all categories
- Identify competitive advantages/disadvantages

**Presentation format:**

| Metric | Client | Competitor A | Competitor B | Competitor C | Industry Avg |
| ------ | ------ | ------------ | ------------ | ------------ | ------------ |
| Overall Score | 42/100 | 68/100 | 55/100 | 38/100 | 51/100 |
| Discoverability | 30/100 | 80/100 | 60/100 | 25/100 | 49/100 |
| Structure | 55/100 | 65/100 | 70/100 | 45/100 | 59/100 |
| State Management | 20/100 | 50/100 | 30/100 | 35/100 | 34/100 |
| Transactions | 45/100 | 75/100 | 60/100 | 40/100 | 55/100 |
| Content Quality | 65/100 | 70/100 | 75/100 | 50/100 | 65/100 |

**Key insights template:**

- "Competitor A is ahead on discoverability (llms.txt, Schema.org)"
- "All competitors struggle with state management (industry-wide issue)"
- "Client has content quality advantage but lacks structural patterns"
- "First-mover opportunity: None of your competitors have comprehensive agent-readiness"

**Template download:** `partner-toolkit-templates/competitive-benchmark-template.xlsx`

---

## Part 2: Proposal Templates

### 2.1 Executive Summary Template

**Purpose:** Business case for agent-readiness investment

**Template structure:**

```text
EXECUTIVE SUMMARY
Agent-Readiness Audit and Implementation Proposal

SITUATION
In January 2026, Amazon, Microsoft, and Google all launched agent commerce systems. AI agents now browse websites, compare products, and complete transactions on behalf of users. Sites that confuse agents lose sales before humans ever see them.

YOUR CURRENT STATE
Our audit of [client domain] identified these gaps:
- Overall agent-readiness score: [X]/100 (industry average: [Y]/100)
- [Number] critical issues preventing agent discovery
- [Number] structural problems causing agent failures
- [Number] transaction barriers blocking agent-mediated purchases

BUSINESS IMPACT
Based on industry data and your current traffic:
- Estimated [X]% of your target audience now uses AI agents for research
- Competitors with higher agent-readiness scores gain citation advantage
- Platform trust compounds: High success rate → more frequent citations → competitive moat
- Timeline: First movers establish patterns that become expectations

RECOMMENDED APPROACH
Priority-based implementation addressing highest-impact issues first:
- Priority 1 (Critical Quick Wins): [X] issues, [estimated effort]
- Priority 2 (Essential Improvements): [Y] issues, [estimated effort]
- Priority 3 (Core Infrastructure): [Z] issues, [estimated effort]
- Priority 4 (Advanced Features): [N] issues, [estimated effort]

INVESTMENT REQUIRED
- Phase 1 (Priority 1): £[amount]
- Phase 2 (Priority 2): £[amount]
- Phase 3 (Priority 3): £[amount]
- Optional Phase 4 (Priority 4): £[amount]

Total investment: £[amount]
Timeline: [X] months

EXPECTED OUTCOMES
- Agent-readiness score improvement: [X]/100 → [Y]/100
- Improved discovery in AI platform results
- Higher agent transaction success rates
- Competitive advantage vs [competitors]
- Future-proofed infrastructure as agent traffic grows
```

**Template download:** `partner-toolkit-templates/executive-summary-template.docx`

---

### 2.2 Pricing Models and Packages

**Purpose:** Flexible pricing structures for different client needs and budgets

### Model 1: Fixed-Price Audit Packages

**Basic Audit** - £2,000-5,000

- Technical audit checklist (all 5 categories)
- Agent behavior testing (4 scenarios)
- 20-page audit report
- Executive summary with key findings
- No implementation, audit only

**Comprehensive Audit** - £5,000-10,000

- Everything in Basic Audit
- Competitive benchmarking (3-5 competitors)
- Priority-based remediation roadmap
- Effort estimates for all recommendations
- 1-hour presentation to stakeholders

**Premium Audit** - £10,000-25,000

- Everything in Comprehensive Audit
- Custom agent testing scenarios (8-10 tests)
- Detailed implementation specifications
- Code examples for top 10 issues
- 3 months of quarterly monitoring

---

### Model 2: Implementation Packages

**Quick Wins Package** - £15,000-30,000

- Audit (Comprehensive level)
- Implementation of Priority 1 issues only
- Validation testing post-implementation
- Documentation of changes
- Timeline: 4-6 weeks

**Essential Transformation** - £40,000-80,000

- Audit (Premium level)
- Implementation of Priority 1 + Priority 2 issues
- Schema.org structured data implementation
- Form and transaction optimization
- Post-implementation validation
- Timeline: 8-12 weeks

**Complete Agent-Ready Overhaul** - £100,000-250,000

- Audit (Premium level)
- Implementation of Priority 1-3 issues
- Comprehensive structured data strategy
- Component library for agent-ready patterns
- Developer training (2-day workshop)
- 6 months quarterly monitoring and updates
- Timeline: 12-16 weeks

---

### Model 3: Retainer-Based Services

**Agent-Readiness Monitoring** - £2,000-5,000/month

- Monthly automated audits
- Quarterly comprehensive reviews
- Alert notifications for issues
- Trend analysis and reporting
- Access to audit platform

**Continuous Optimization** - £5,000-15,000/month

- Everything in Monitoring tier
- Monthly implementation of identified issues
- Ongoing pattern library updates
- Priority support for urgent fixes
- Quarterly strategic reviews

**Strategic Partnership** - £15,000-40,000/month

- Everything in Continuous Optimization
- Dedicated agent-readiness consultant
- Custom development and integration
- Executive advisory and roadmap planning
- Industry research and competitive intelligence

---

### Model 4: Value-Based Pricing

**Pricing calculation:**

```text
Audit fee: £5,000-10,000 (fixed)
Implementation fee: 10-20% of estimated business impact

Business impact calculation:
- Current monthly revenue: £[X]
- Estimated % improvement from agent optimization: 5-20%
- Annual impact: £[X] * [%] * 12
- Implementation fee: [Annual impact] * 0.10-0.20
```

**Example:**

- Client monthly revenue: £500,000
- Conservative improvement estimate: 10%
- Annual impact: £500,000 *0.10* 12 = £600,000
- Implementation fee (15%): £90,000
- Total project value: £10,000 audit + £90,000 implementation = £100,000

---

**Pricing Guidance Notes:**

**Adjust based on:**

- Client size (SMB, mid-market, enterprise)
- Site complexity (5 pages vs 500 pages)
- Technical debt level (modern stack vs legacy)
- Geographic market (UK, EU, US, APAC)
- Competitive positioning (premium vs value)

**Typical margins:**

- Audit work: 50-70% margin (mostly automated tooling + report writing)
- Implementation work: 30-50% margin (depends on developer rates)
- Retainer services: 40-60% margin (mix of automated + manual work)

**Template download:** `partner-toolkit-templates/pricing-calculator.xlsx`

---

### 2.3 Statement of Work Template

**Purpose:** Clear scope definition for implementation projects

**Template structure:**

```text
STATEMENT OF WORK
Agent-Readiness Implementation Services

1. PROJECT OVERVIEW
[Client name] engages [Agency name] to implement agent-readiness improvements identified in audit dated [date], improving website accessibility for AI agents and humans alike.

2. SCOPE OF WORK

Phase 1: Priority 1 - Critical Quick Wins (Weeks 1-4)
- Implement llms.txt file with curated resource links
- Optimize robots.txt for agent access
- Add Schema.org JSON-LD for Products/Services
- Fix semantic HTML structure issues (10 pages)
- Implement persistent error messaging patterns
Deliverables: Updated site files, validation report, documentation

Phase 2: Priority 2 - Essential Improvements (Weeks 5-10)
- Expand Schema.org coverage (50 pages)
- Refactor forms with proper field names and state management
- Implement skip links and navigation landmarks
- Optimize transaction flows (add-to-cart, checkout)
- Create agent-ready component library (20 components)
Deliverables: Updated site files, component library, developer guide, validation report

Phase 3: Priority 3 - Core Infrastructure (Weeks 11-16)
- Complete Schema.org coverage (all pages)
- Implement explicit state management site-wide
- Content restructuring for machine readability
- Progressive enhancement patterns (works without JavaScript)
- Automated testing suite for agent compatibility
Deliverables: Complete implementation, testing framework, documentation

3. OUT OF SCOPE
- Content writing/copywriting
- Visual design changes
- Performance optimization unrelated to agent compatibility
- Third-party integrations
- Ongoing maintenance (unless retainer agreed)

4. CLIENT RESPONSIBILITIES
- Provide CMS access and credentials
- Assign technical point of contact
- Review and approve deliverables within 5 business days
- Provide content and assets as needed
- Deploy changes to production (or authorize agency to deploy)

5. TIMELINE
Project start: [Date]
Phase 1 completion: [Date]
Phase 2 completion: [Date]
Phase 3 completion: [Date]
Project completion: [Date]

6. FEES AND PAYMENT TERMS
Phase 1: £[amount] - Due upon project start
Phase 2: £[amount] - Due upon Phase 1 completion
Phase 3: £[amount] - Due upon Phase 2 completion
Total: £[amount]

Payment terms: Net 30 days
Late payment: 1.5% monthly interest on overdue amounts

7. ACCEPTANCE CRITERIA
Work deemed complete when:
- All deliverables specified above provided
- Agent-readiness score improved from [X]/100 to [Y]/100
- Agent behavior testing shows [Z]% success rate
- Client signs off on completion

8. CHANGE MANAGEMENT
Changes to scope require written change order specifying:
- Description of change
- Impact on timeline
- Impact on budget
- Client approval signature

9. INTELLECTUAL PROPERTY
- Pre-existing agency IP (component library, patterns) remains agency property
- Custom work created for client becomes client property upon full payment
- Agency retains right to use anonymized case study

10. WARRANTIES AND LIMITATIONS
Agency warrants work performed professionally according to industry standards.
Agency does not warrant:
- Specific ranking improvements in AI platform results
- Specific traffic or revenue increases
- Third-party platform behavior beyond our control

Client accepts that agent technology evolves rapidly and future changes may require ongoing optimization.

Agreed and accepted:

[Client signature] _________________ Date: _________
[Agency signature] _________________ Date: _________
```

**Template download:** `partner-toolkit-templates/statement-of-work-template.docx`

---

## Part 3: Implementation Guides

### 3.1 Pattern Library Quick Reference

**Purpose:** Common agent-ready patterns developers can implement immediately

### Pattern 1: Semantic HTML Structure

```html
<!-- BEFORE: Agent-hostile divs -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>
<div class="content">
  <div class="article">...</div>
</div>

<!-- AFTER: Agent-ready semantic HTML -->
<header>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
  </nav>
</header>
<main>
  <article>...</article>
</main>
```

---

### Pattern 2: Persistent Error Messages

```html
<!-- BEFORE: Ephemeral toast notification -->
<div class="toast" style="display:none">Error!</div>
<script>
  showToast("Error!", 3000); // Disappears after 3 seconds
</script>

<!-- AFTER: Persistent error with ARIA -->
<div role="alert" class="error-message" id="form-error">
  <strong>Error:</strong> Email address is required.
  Please enter a valid email address.
</div>
```

---

### Pattern 3: Schema.org Product Data

```html
<!-- BEFORE: No structured data -->
<div class="product">
  <h1>Premium Laptop</h1>
  <p>£999</p>
  <p>In stock</p>
</div>

<!-- AFTER: With Schema.org JSON-LD -->
<div class="product">
  <h1>Premium Laptop</h1>
  <p>£999</p>
  <p>In stock</p>
</div>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Premium Laptop",
  "offers": {
    "@type": "Offer",
    "price": "999.00",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

---

### Pattern 4: Explicit Form Field Names

```html
<!-- BEFORE: Custom field names -->
<input name="usr_email_addr" />
<input name="first_name_txt" />
<input name="contact_phone" />

<!-- AFTER: Standard conventions -->
<input name="email" type="email" autocomplete="email" />
<input name="firstName" autocomplete="given-name" />
<input name="telephone" type="tel" autocomplete="tel" />
```

---

### Pattern 5: Navigation State

```html
<!-- BEFORE: No explicit state -->
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>

<!-- AFTER: Explicit current page -->
<nav aria-label="Main navigation">
  <a href="/">Home</a>
  <a href="/about" aria-current="page">About</a>
  <a href="/contact">Contact</a>
</nav>
```

**Full pattern library:** `partner-toolkit-patterns/agent-ready-patterns-library.pdf` (50+ patterns)

---

### 3.2 llms.txt Best Practices

**Purpose:** Guide for creating effective llms.txt files

**Basic template:**

```text
# About [Company Name]
[2-3 sentence company description]

# Products and Services
- [Product/Service 1]: [Brief description and URL]
- [Product/Service 2]: [Brief description and URL]

# Key Resources
- Documentation: [URL]
- API Reference: [URL]
- Pricing: [URL]
- Support: [URL]

# Contact
- Website: https://example.com
- Email: contact@example.com
```

**Best practices:**

- Keep under 100 lines (curated, not comprehensive)
- Link to 15-25 most important pages
- Use clear hierarchical structure
- Update monthly as site evolves
- Include contact information
- Test with Web Audit Suite llms.txt validator

**Examples:** See book Appendix H for live example

---

### 3.3 Schema.org Implementation Guide

**Purpose:** Step-by-step guide for adding structured data

**Priority sequence:**

1. Organization (homepage)
2. Products/Services (product pages)
3. Articles (blog posts, news)
4. BreadcrumbList (navigation)
5. FAQPage (support content)

**Tools:**

- Google's Structured Data Testing Tool: <https://search.google.com/test/rich-results>
- Schema.org validator: <https://validator.schema.org/>
- Web Audit Suite structured data analysis

**Implementation checklist:**

- [ ] Identify page types needing structured data
- [ ] Generate JSON-LD for each type
- [ ] Validate with testing tools
- [ ] Insert in `<head>` or end of `<body>`
- [ ] Test agent behavior post-implementation
- [ ] Monitor for errors in search console

**Full guide:** `partner-toolkit-guides/schema-org-implementation-guide.pdf`

---

### 3.4 Validation and Testing Procedures

**Purpose:** Ensure implementations work correctly

**Automated testing:**

- Run Web Audit Suite before and after changes
- Compare scores across all categories
- Verify specific issues marked as resolved

**Manual testing:**

- Test with ChatGPT, Claude, Perplexity
- Use same prompts from initial audit
- Document success/failure for each scenario
- Screenshot agent responses for comparison

**Regression testing:**

- Ensure human user experience not degraded
- Check accessibility with screen readers
- Validate forms still work correctly
- Verify JavaScript enhancements still function

**Sign-off checklist:**

- [ ] All Priority 1 issues resolved
- [ ] Agent-readiness score improved by [X] points
- [ ] Agent testing shows [Y]% success rate
- [ ] No regressions in human UX
- [ ] Client approves changes
- [ ] Documentation updated

---

## Part 4: Training Materials

### 4.1 Two-Day Workshop Curriculum

**Purpose:** Train client development teams on agent-ready implementation

### Day 1: Foundations and Principles

**Morning Session (9:00-12:00)**

- Introduction: Why agent-readiness matters now (30 min)
- The convergence principle: Agents and accessibility (45 min)
- Common agent-hostile patterns (hands-on examples) (60 min)
- Break (15 min)
- Semantic HTML deep dive (60 min)

**Afternoon Session (13:00-17:00)**

- Schema.org structured data fundamentals (60 min)
- Break (15 min)
- Hands-on: Implementing structured data (90 min)
- State management patterns (60 min)
- Day 1 wrap-up and Q&A (15 min)

### Day 2: Implementation and Practice

**Morning Session (9:00-12:00)**

- Form optimization for agents and humans (60 min)
- Transaction flow patterns (45 min)
- Break (15 min)
- llms.txt and robots.txt best practices (45 min)
- Testing and validation tools (45 min)

**Afternoon Session (13:00-17:00)**

- Hands-on: Fix real client pages (120 min)
- Break (15 min)
- Priority-based implementation roadmapping (45 min)
- Ongoing maintenance and monitoring (30 min)
- Certification assessment (30 min)
- Wrap-up and certificates (15 min)

**Materials provided:**

- Workshop slides (PDF)
- Pattern library (50+ examples)
- Code examples (GitHub repository)
- Validation checklist
- Certificate of completion

---

### 4.2 Certification Program

**Purpose:** Credential team members as agent-readiness specialists

**Certification levels:**

### Level 1: Agent-Readiness Practitioner

- Requirements: Attend 2-day workshop, pass assessment
- Assessment: 20-question multiple choice + 1 practical exercise
- Pass score: 80%
- Validity: 2 years

### Level 2: Agent-Readiness Specialist

- Requirements: Level 1 certified + complete 3 client projects + peer review
- Assessment: Complex implementation challenge + portfolio review
- Pass score: 85%
- Validity: 2 years

### Level 3: Agent-Readiness Architect

- Requirements: Level 2 certified + 5 years experience + thought leadership contribution
- Assessment: Strategic case study + technical leadership interview
- Pass score: 90%
- Validity: 3 years

**Benefits:**

- Digital badge for LinkedIn
- Listed in agent-readiness specialist directory
- Access to advanced training and resources
- Peer network and community
- Priority support

---

### 4.3 Presentation Decks

### Deck 1: Executive Overview (15 slides)

- Why agent-readiness matters now
- Business impact and competitive advantage
- Investment required and expected ROI
- Case studies and success metrics
- Next steps

**Use case:** Board presentations, executive buy-in

---

### Deck 2: Technical Implementation (40 slides)

- Agent-hostile patterns and fixes
- Semantic HTML patterns
- Schema.org implementation
- State management approaches
- Testing and validation

**Use case:** Developer training, technical workshops

---

### Deck 3: Sales and Marketing (25 slides)

- Agent-readiness service offerings
- Competitive differentiation
- Pricing and packages
- Client success stories
- Objection handling

**Use case:** Agency sales teams, partner training

**Template downloads:** `partner-toolkit-presentations/` directory

---

## Part 5: Marketing Assets

### 5.1 Service Description Template

### Agent-Readiness Audit and Implementation Services

In January 2026, Amazon, Microsoft, and Google all launched agent commerce systems. AI agents now browse websites, compare products, and complete transactions. Sites that confuse agents lose sales before humans ever see them.

**Our Agent-Readiness Services:**

**Discovery and Audit**
We evaluate your website against agent-compatibility criteria across five categories: Discoverability, Structure, State Management, Transactions, and Content Quality. You receive a comprehensive audit report with priority-based recommendations and competitive benchmarking.

**Implementation and Remediation**
We implement agent-ready patterns systematically, starting with highest-impact quick wins. Our approach uses the convergence principle: patterns that help agents also help humans with disabilities, cognitive load, or non-ideal conditions. You get better websites for everyone.

**Training and Enablement**
We train your development teams on agent-ready implementation through hands-on workshops and certification programs. Your team gains expertise to maintain and expand agent-readiness independently.

**Ongoing Monitoring**
We provide continuous monitoring and optimization through retainer-based services, ensuring your site remains agent-ready as technology evolves.

**Why Choose Us:**

- Certified Agent-Readiness Partner
- Proven methodology from "The Invisible Users" book
- 50+ agent-ready patterns library
- Enterprise client experience
- Measurable outcomes (scoring improvement, success rates)

**Ready to ensure your website works for AI agents and everyone else?**
Contact us for a complimentary discovery consultation.

---

### 5.2 Case Study Template

**Case Study: [Client Name] - [Industry]**

**Challenge:**
[Client] faced [specific problem - e.g., declining organic traffic, competitors appearing in AI results, conversion drops]. Their [CMS/platform] site scored [X]/100 on agent-readiness, below industry average of [Y]/100.

**Approach:**
We conducted comprehensive agent-readiness audit identifying [N] critical issues. Implemented priority-based remediation:

- Priority 1: [Specific fixes implemented]
- Priority 2: [Specific fixes implemented]
- Training: [Team enablement activities]

**Results:**

- Agent-readiness score: [X]/100 → [Y]/100 ([Z]% improvement)
- Agent testing success rate: [X]% → [Y]%
- [Specific business metric improvement if available]
- Timeline: [X] weeks from audit to completion

**Client Quote:**
"[Quote from client about experience, outcomes, value delivered]"

**Key Learnings:**

- [Insight 1 applicable to other clients]
- [Insight 2 about implementation]
- [Insight 3 about business impact]

---

### 5.3 Social Media Content Templates

### LinkedIn Post Template 1: Thought Leadership

AI agents browsed your website this week. Did they succeed or fail?

In January 2026, Amazon, Microsoft, and Google all launched agent commerce systems. Your potential customers now use Claude, ChatGPT, and Perplexity to research products and make purchase decisions.

If your site confuses agents, you're invisible before humans ever see you.

Three patterns that break for agents (and humans):

1. Toast notifications that disappear
2. Pagination requiring JavaScript clicks
3. Add-to-cart buttons with hidden state

The fix? Semantic HTML, explicit state, structured data. Patterns that help agents help everyone.

Want to know if your site works for AI agents?
[Link to audit service]

---

### LinkedIn Post Template 2: Case Study Highlight

We helped [Industry] client improve their agent-readiness score from [X]/100 to [Y]/100 in [Z] weeks.

The result? Agents can now successfully:
✓ Discover their products
✓ Extract accurate pricing
✓ Complete transactions

How we did it:
→ Comprehensive audit (5 categories, 50+ data points)
→ Priority-based implementation (quick wins first)
→ Developer training (agent-ready patterns)
→ Validation testing (real agent behavior)

The convergence principle in action: Better for agents = better for everyone.

[Link to case study]

---

### Twitter/X Post Templates

"In January 2026, Amazon, Microsoft, and Google all launched agent commerce. Your website either works for AI agents or it doesn't. There's no middle ground. [Link]"

"Stack Overflow laid off 75% of staff. Why? Developers ask ChatGPT instead of visiting docs sites. Your traffic-dependent business model faces the same risk. [Link]"

"Three patterns that break for AI agents: 1) Toast notifications, 2) Pagination, 3) Hidden state. Same patterns that break accessibility. Fix once, help everyone. [Link]"

---

## Part 6: Implementation Tools

### 6.1 Web Audit Suite Integration

**Setup instructions:**

1. Clone Web Audit Suite repository
2. Configure for client domain
3. Run initial audit and generate baseline report
4. Implement fixes systematically
5. Re-run audit to verify improvements
6. Compare before/after scores

**Customization:**

- Add client-specific testing scenarios
- Configure scoring weights based on industry
- White-label reports with agency branding
- Automate via CI/CD for ongoing monitoring

**Documentation:** See Web Audit Suite `docs/usermanual.md`

---

### 6.2 Browser Extension (Planned)

**Purpose:** Real-time agent-readiness feedback during development

**Features:**

- Inline warnings for agent-hostile patterns
- Semantic HTML structure visualization
- Schema.org data validation
- Accessibility overlay showing convergence

**Status:** Development roadmap Q2 2026

---

### 6.3 IDE Plugin (Planned)

**Purpose:** Agent-ready pattern suggestions within development environment

**Features:**

- Code completion for semantic HTML
- Schema.org snippet library
- Validation warnings for anti-patterns
- Integration with Web Audit Suite

**Status:** Development roadmap Q3 2026

---

## Revenue Share and Partnership Terms

**Standard Partner Agreement:**

- Partner training fee: £2,000-5,000 per person (one-time)
- Toolkit license: £1,000-3,000 annually (includes updates)
- Revenue share: 20-30% of audit revenue using this toolkit
- White-label allowed: Yes (remove "Digital Domain Technologies" branding)
- Support: Email support, quarterly partner workshops, priority bug fixes

**Premium Partner Agreement:**

- Higher revenue share: 30-40%
- Co-marketing opportunities
- Joint case study development
- Early access to new tools and features
- Dedicated partner success manager

**Contact for partnership inquiries:**
Digital Domain Technologies Ltd
<tom.cranstoun@gmail.com>
<https://allabout.network>

---

## Appendix: Toolkit File Structure

```text
partner-toolkit/
├── README.md
├── templates/
│   ├── client-discovery-questionnaire.pdf
│   ├── technical-audit-checklist.xlsx
│   ├── agent-behavior-testing-template.docx
│   ├── competitive-benchmark-template.xlsx
│   ├── executive-summary-template.docx
│   ├── statement-of-work-template.docx
│   └── pricing-calculator.xlsx
├── patterns/
│   ├── agent-ready-patterns-library.pdf
│   ├── semantic-html-examples.html
│   ├── schema-org-examples.json
│   └── form-patterns.html
├── guides/
│   ├── llms-txt-best-practices.pdf
│   ├── schema-org-implementation-guide.pdf
│   ├── validation-testing-procedures.pdf
│   └── ongoing-maintenance-checklist.pdf
├── training/
│   ├── workshop-slides-day1.pdf
│   ├── workshop-slides-day2.pdf
│   ├── hands-on-exercises.zip
│   ├── certification-assessment.pdf
│   └── certification-guidelines.pdf
├── presentations/
│   ├── executive-overview-15slides.pptx
│   ├── technical-implementation-40slides.pptx
│   └── sales-marketing-25slides.pptx
├── marketing/
│   ├── service-description.docx
│   ├── case-study-template.docx
│   ├── social-media-templates.docx
│   └── email-templates.docx
└── tools/
    ├── web-audit-suite-setup.md
    └── integration-examples/
```

---

## Support and Updates

**Partner support channels:**

- Email: <partners@digitaldomain.tech> (response within 24 hours)
- Slack community: [invite link]
- Monthly office hours: First Wednesday, 3pm GMT
- Quarterly partner workshops: Virtual and in-person options

**Update schedule:**

- Toolkit updates: Quarterly
- Pattern library additions: Monthly
- Web Audit Suite releases: Continuous
- Training materials: Bi-annually

**Feedback welcome:**
This toolkit improves based on partner feedback. Please share:

- What works well in client engagements
- What clients ask that isn't covered
- New patterns you've discovered
- Tool enhancements you need

---

*Version 1.0 - January 2026*
*© 2026 Digital Domain Technologies Ltd. Licensed to certified partners.*
