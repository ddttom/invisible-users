# How to Identify Silent Conversion Failures on Your Website

## Using the Web Audit Suite and Implementation Framework to Find Agent Compatibility Issues

**Important:** The scenarios in this document are illustrative examples to demonstrate the methodology, not validated case studies. The field is too new for proven ROI data. Treat these as frameworks for calculating your potential exposure, not as guaranteed outcomes.

---

## The Problem: Invisible Drop-Offs

Your website works perfectly. You've tested it across browsers. The design is clean. The conversion funnel is optimised. Your analytics show healthy traffic.

But here's what you don't see:

- AI agents browsing your product pages and giving up when pricing is hidden behind "Show more"
- Shopping assistants recommending competitors because your site's comparison tables are unreadable to agents
- Booking agents failing to complete transactions because your success confirmation vanishes after 3 seconds
- Research agents missing your best features because they're hidden in collapsed tabs

**These failures don't show up in your analytics.** They look like short sessions or bounces. You never see the lost sale.

## Illustrative Scenarios: Calculating Your Exposure

**Disclaimer:** These scenarios are illustrative examples demonstrating how to use the methodology and tools. They are not validated case studies or proven ROI figures. Use them as frameworks to calculate your own site's potential exposure.

### Scenario 1: E-commerce Site - Calculating Potential Loss

**Hypothetical Problem:**

- Product pricing shown as "from" price with final price revealed at checkout
- Multi-page product specifications with "Load more" pagination
- Toast notifications for cart updates (disappeared after 3 seconds)
- Success confirmation relied entirely on CSS colour changes

**What an Audit Might Find:**

A Web Audit Suite analysis could reveal:

- **LLM Suitability Score: Low** (failing threshold)
- **Agent Accessibility: Critical failures** in majority of key patterns
- **Data Extraction Issues:** Significant portion of product information invisible to served HTML
- **State Visibility: Minimal** explicit state attributes for form validation

**Potential Agent Behaviour:**

Testing with AI agents might show:

- Both agents reported the "from" display price as the actual price (real price was higher)
- Product specifications: Only first few features were visible
- Add-to-cart actions: Agents couldn't confirm success (no persistent feedback)
- Checkout completion: Complete failure (success state not machine-readable)

**Example Impact Calculation:**

```text
Hypothetical site metrics:
Current traffic: Substantial monthly visits
Estimated agent traffic: Small but growing percentage
Conversion rate (human): Standard e-commerce rate
If actual agent conversions: Complete failure
Average order value: Typical for category

Potential lost revenue = Could be significant over time

Note: These are illustrative calculations. Your actual exposure depends on your
specific traffic patterns, conversion rates, and agent compatibility issues.
```

**Example Fix Approach:**

Following the implementation cookbook from "MX-Bible":

1. **Priority 1 fixes**:
   - Displayed full pricing upfront (not "from £X")
   - Added "Show All" option to product specs
   - Replaced toast notifications with persistent alerts
   - Added explicit state attributes to forms

2. **Example post-fix LLM Suitability Score**: Good threshold
3. **Potential agent conversion success rate**: Significant improvement
4. **These changes can be implemented quickly with standard web development practices**

**Important:** These figures are illustrative examples, not proven results. Your actual costs and outcomes will vary based on your specific situation.

### Scenario 2: SaaS Platform - Free-to-Paid Conversion Gap

**Hypothetical Problem:**

- Pricing hidden behind "Request Demo" forms
- Feature comparison table using complex CSS Grid (unreadable to agents)
- Trial signup: Inline validation visible only through colour changes
- Success messages: JavaScript-rendered, not in DOM

**What the Audit Found:**

- **LLM Suitability Score: Critical** (failing threshold)
- **Semantic HTML Score: Poor** (forms used `<div>` buttons)
- **Structured Data: None** (no Schema.org markup)
- **State Attributes: Minimal** (all state conveyed through CSS classes)

**Agent Behaviour Testing:**

- Pricing research: Agents reported "pricing not available" (it was, behind a form)
- Feature comparison: Agents couldn't determine which features belonged to which tier
- Trial signup: Complete failure (validation errors invisible)

**Business Impact:**

```text
Monthly site visits: Typical for SaaS platform
Agent traffic estimate: Small but growing percentage
Free trial signup rate (human): Standard for category
Actual agent signups: Complete failure

Free-to-paid conversion: Industry standard
Average annual contract value: Typical for category

Potential lost revenue: Could be substantial
```

**The Fix:**

Following Chapter 11's technical implementation guide:

1. **Priority 1-2 fixes**:
   - Created transparent pricing page (no forms required)
   - Restructured comparison table with semantic HTML + Schema.org Product markup
   - Converted div-buttons to actual `<button>` elements with ARIA attributes
   - Added explicit state attributes: `data-validation-state`, `aria-invalid`
   - Replaced JavaScript success messages with DOM-persistent alerts

2. **Post-fix LLM Suitability Score**: Excellent threshold
3. **Agent signup success rate**: Significant improvement
4. **These improvements can be implemented following standard web development practices**

### Scenario 3: Travel Booking Site - Abandoned Itinerary Searches

**Hypothetical Problem:**

- Search results paginated (20 per page, 300 total)
- Itinerary details in collapsed accordions
- Multi-step booking: Progress indicators purely visual (CSS)
- Date pickers: JavaScript widgets with no fallback

**What the Audit Found:**

- **LLM Suitability Score: Critical** (failing badly)
- **Content Accessibility: Majority** of itinerary details hidden behind interaction
- **URL State: None** (all filter/search state in JavaScript, not URL)
- **Pagination: Agent-hostile** (no "Show All" option, no clear indication of total results)

**Agent Behaviour:**

- Search results: Agents saw only first page of many options
- Itinerary comparison: Complete failure (details in collapsed elements)
- Booking completion: Failed partway through (couldn't determine progress)
- Date selection: Complete failure (no `<input type="date">` fallback)

**Business Impact:**

```text
Monthly searches: Substantial for travel booking site
Agent traffic estimate: Small but growing percentage
Booking conversion (human): Industry standard
Actual agent bookings: Complete failure

Average booking value: Typical for category

Potential lost revenue: Could be substantial
```

**The Fix:**

Using the prioritised implementation roadmap (Appendix F):

1. **Priority 1-3 fixes**:
   - Added "Show All Results" option (with performance optimization)
   - Expanded itinerary details by default (progressive disclosure optional)
   - Added URL state: search filters, pagination, selected options
   - Replaced JavaScript date picker with `<input type="date">` + enhancement
   - Added explicit progress attributes for multi-step processes

2. **Post-fix LLM Suitability Score**: Good threshold
3. **Agent booking success rate**: Significant improvement
4. **These improvements can be implemented following standard web development practices**

---

## How the Web Audit Suite Works

### Three-Phase Analysis Pipeline

#### Phase 1: URL Discovery

- Processes sitemap.xml or crawls site structure
- Validates and normalises all URLs
- Handles Cloudflare-protected sites automatically

#### Phase 2: Comprehensive Data Collection

**For Each Page:**

1. **Served HTML Analysis** (what all agents see):
   - Semantic structure (`<main>`, `<nav>`, `<article>`)
   - Form field naming conventions
   - Schema.org structured data (JSON-LD)
   - Meta tags and robots directives
   - HTTP status codes and security headers

2. **Rendered HTML Analysis** (what browser agents see):
   - JavaScript-generated content
   - Dynamic state attributes
   - Client-side form validation
   - Interactive element behaviours

3. **Accessibility Testing** (Pa11y + WCAG 2.1):
   - Screen reader compatibility
   - Keyboard navigation
   - ARIA attributes and roles
   - Contrast ratios and text alternatives

4. **Performance Metrics:**
   - Page load times
   - Resource sizes
   - Core Web Vitals

5. **LLM Suitability Scoring:**
   - Essential served patterns (semantic HTML, structured data)
   - Essential rendered patterns (explicit state, agent visibility)
   - Nice-to-have patterns (data attributes, metadata)
   - Weighted 100-point scale

#### Phase 3: Report Generation

**18 Detailed Reports:**

1. **Executive Dashboard** (one-page visual summary)
2. **LLM Suitability Overview** (served vs rendered scores)
3. **LLM Suitability Details** (pattern-by-pattern breakdown)
4. **Accessibility Report** (WCAG compliance)
5. **SEO Analysis** (meta tags, structured data)
6. **Performance Metrics** (load times, resource sizes)
7. **Security Headers** (HSTS, CSP, X-Frame-Options)
8. **Robots.txt Quality** (20-point scoring)
9. **LLMs.txt Quality** (emerging convention assessment)
10. **Structured Data Audit** (Schema.org validation)
11. **Form Analysis** (field naming, validation patterns)
12. **Navigation Structure** (semantic landmark analysis)
13. **Content Quality** (heading hierarchy, readability)
14. **URL Structure** (state visibility, RESTful patterns)
15. **Historical Tracking** (score trends over time)
16. **Competitive Benchmarking** (compare against peers)
17. **Priority-Based Roadmap** (what to fix first)
18. **Technical Implementation Guide** (code examples for your stack)

### Scoring System

**LLM Suitability Scores:**

- **Critical** - Agents likely to fail completely
- **Poor** - Agents will struggle, low success rate
- **Fair** - Agents can function but with difficulty
- **Good** - Agents work reliably for most tasks
- **Excellent** - Optimal agent compatibility

**What Each Score Range Means:**

- **Critical:** Immediate action required. You're losing agent-mediated transactions.
- **Poor:** Priority fixes needed. Significant transactions at risk.
- **Fair:** Implement Priority 1-2 fixes. Competitive disadvantage likely.
- **Good:** Minor improvements. Better than most competitors.
- **Excellent:** Best-in-class. Competitive advantage secured.

---

## The Complete Package: Book + Tool + Implementation Framework

### 1. The Book: "MX-Bible"

**What You Get:**

- **~57,000 words** of practical, actionable guidance
- **11 chapters** covering technical, business, ethical implications
- **10 appendices** (published online at <https://allabout.network/invisible-users/web/>) including implementation cookbook and validation patterns
- **Real-world examples** with before/after code
- **Priority-based roadmap** (not time-based - Priority 1-4)
- **Agent validation frameworks** (Chapter 12: for developers building agents)
- **Pipeline failure case study** (analysis with prevention strategies)

**Key Chapters for Different Roles:**

- **Developers:** Start with Chapters 10-11 (implementation code + agent validation)
- **Product Managers:** Chapters 1-5, 10-12 (problems, solutions, validation)
- **Business Leaders:** Chapters 1, 4, 5, 7, 8, 9, 10 (strategy and business case)
- **Agent System Developers:** Chapter 12 + Appendix I (validation frameworks)

### 2. The Web Audit Suite: Production-Ready Analysis Tool

**What You Get:**

- **Professional Node.js analysis tool**
- **Complete source code** with comprehensive documentation
- **CLI interface** with flexible configuration
- **18 report types** (CSV + Markdown)
- **Agency white-labeling** (rebrand for your clients)
- **Bulk audit capability** (analyze 50+ sites in one run)
- **Historical tracking** (monitor score changes over time)
- **Dashboard generation** (visual executive summaries)

**Technical Requirements:**

- Node.js 18+
- 512MB RAM minimum
- Works on macOS, Linux, Windows
- No external dependencies for basic operation

### 3. Implementation Framework

**What You Get:**

- **Agent-Friendly Starter Kit** (good vs bad examples)
- **10 copy-paste recipes** (implementation cookbook)
- **Playwright test suite** (14 automated agent compatibility tests)
- **Production code examples** (React, Vue, Next.js, vanilla JS)
- **Priority-based roadmap templates** (Excel + Markdown)
- **Business case calculator** (estimate your revenue at risk)
- **Professional services framework** (if you want to offer audit services)

---

## Three Ways to Use This

### Option 1: DIY Implementation

**Best for:** In-house development teams, agencies with technical capacity

**What You Do:**

1. Purchase the book
2. Purchase Web Audit Suite separately OR engage audit service
3. Run Web Audit Suite on your site (or receive professional audit report)
4. Read the book (focus on Chapters 9-10 for implementation)
5. Use the implementation cookbook for copy-paste fixes
6. Re-run audit to verify improvements
7. Monitor scores over time with historical tracking

**Cost:**

- Book: Purchase price
- Web Audit Suite: Separate purchase OR audit service fee
- Implementation: Internal developer time
- Total: Book + audit costs + implementation (varies by site complexity)

**Potential Benefits:** Improved agent compatibility, better accessibility, clearer state management. Actual revenue impact will vary.

### Option 2: Audit Service

**Best for:** Businesses without in-house technical expertise, agencies needing independent validation

**What You Get:**

- Complete Web Audit Suite analysis
- Executive dashboard with visual scoring
- Prioritised remediation roadmap
- Technical implementation guide customised to your stack
- Consultation to review findings
- Re-audit after implementation (verify improvements)

**Deliverables:**

- 18-report audit package (PDF + CSV + Markdown)
- Executive summary (one-page visual)
- Priority-based action plan (Priority 1-4)
- Cost-benefit analysis (estimated revenue at risk)
- Code examples for your specific technology stack
- Follow-up audit post-implementation

**Pricing:**

Contact for pricing based on site size and complexity.

**Potential Benefits:** Professional assessment of agent compatibility issues with prioritised remediation plan. Actual outcomes depend on implementation and site-specific factors.

### Option 3: Full Implementation Service

**Best for:** Businesses requiring complete solution including implementation

**What You Get:**

- Everything from Option 2 (complete audit)
- Full technical implementation by experienced developers
- Prioritised remediation (Priority 1-2 fixes guaranteed)
- Testing and validation (automated test suite)
- Documentation for ongoing maintenance
- Post-launch support
- Training for internal teams
- Quarterly re-audits (first year)

**Deliverables:**

- Complete Priority 1-2 implementation
- Automated test suite (Playwright + agent simulation)
- Technical documentation
- Team training workshop
- Extended support period
- Quarterly audits (re-audits in year 1)
- ROI measurement framework

**Pricing:**

Contact for pricing based on priority level and site complexity.

**Potential Benefits:** Complete implementation with testing and validation. Addresses known agent compatibility issues systematically.

---

## The Business Opportunity: Why This Matters Now

### Market Timing: Early Mover Advantage

**Why Now:**

1. **Agent traffic is real but still small**
   - Early movers gain competitive advantage
   - Fixes are more straightforward now than later
   - Standards haven't ossified yet

2. **No established market leaders** (yet)
   - First-mover advantage available
   - Category defining opportunity
   - Authority position open

3. **Clear technical solutions exist**
   - Not speculative or theoretical
   - Proven patterns work
   - Implementation is straightforward

4. **Commercial pressure is building**
   - Claude Code, Cursor, Windsurf, Anthropic Computer Use gaining adoption
   - Browser-based agents (Claude for Chrome, Microsoft Copilot) mainstream
   - Shopping and booking agents proliferating
   - Enterprise automation platforms integrating web agents

**What Happens Next:**

- **Phase 1:** Early adopters fix their sites, gain measurable advantage
- **Phase 2:** Competitors notice conversion rate differences, scramble to catch up
- **Phase 3:** Standards bodies begin formal specifications
- **Phase 4:** Agent compatibility becomes "table stakes" like mobile responsiveness
- **Phase 5:** Methodology becomes commoditised, advantage disappears

**The window for competitive advantage is now.**

### Revenue Streams for Agencies

**1. Audit Services:**

- Run Web Audit Suite (white-labeled)
- Generate prioritised roadmap
- Deliver executive presentation
- Recurring revenue: Quarterly re-audits

**2. Implementation Services:**

- Priority 1-2 fixes as minimum package
- Priority 3-4 as upsell
- Ongoing maintenance contracts
- Training and documentation

**3. Consulting & Strategy:**

- Business case development
- ROI calculation and forecasting
- Competitive benchmarking
- Board-level presentations

**4. Training & Workshops:**

- Workshops for development teams
- Executive briefings for C-suite
- Webinars and online courses
- Certification programs

**5. Subscription Services:**

- Monthly audits with trend reporting
- Continuous monitoring
- Alert notifications (score drops)
- Benchmarking against competitors

**Typical Agency Package Structure:**

```text
Initial Audit
Implementation (Priority-based)
Quarterly Re-audits
Training and support

Contact for pricing based on scope
```

**Scale Potential:**

Scalable business model with multiple revenue streams and high margins on audit and training services.

---

## Getting Started

### For Businesses (Internal Use)

### Phase 1: Assessment

1. Purchase the book
2. Purchase Web Audit Suite OR engage audit service
3. Run Web Audit Suite on your site or receive professional audit report
4. Review executive dashboard and LLM suitability scores
5. Read Executive Summary + Chapter 1 of the book
6. Present findings to stakeholders (internal business case)

### Phase 2: Planning

1. Read implementation chapters (Chapters 9-10)
2. Prioritise fixes using the cookbook (Priority 1-2 first)
3. Estimate internal implementation cost
4. Secure budget and resources

### Phase 3: Implementation

1. Implement Priority 1 fixes (quick wins)
2. Test with automated suite
3. Re-run audit to verify improvements
4. Implement Priority 2 fixes
5. Final verification audit

### Phase 4: Monitoring

1. Set up quarterly re-audits
2. Monitor agent conversion rates
3. Measure revenue recovery
4. Plan Priority 3-4 improvements

### For Agencies (Service Offering)

### Phase 1: Setup

1. Purchase the book
2. Purchase Web Audit Suite (for agencies offering self-service) OR establish referral arrangement for audit service
3. Install and configure Web Audit Suite (if purchased)
4. Set up white-labeling (agency branding, if applicable)
5. Read the book cover-to-cover
6. Create service packages and pricing

### Phase 2: Testing

1. Run audits on 3-5 demo sites (your own + volunteers)
2. Generate sample reports
3. Create sales materials (case studies, presentations)
4. Build ROI calculator for prospects

### Phase 3: Launch

1. Identify target market (e-commerce, SaaS, travel, etc.)
2. Develop outreach campaigns
3. Conduct initial client audits (offer free analysis as lead generation)
4. Build case studies from early wins

### Phase 4: Scale

1. Hire/train delivery team
2. Systematise audit process
3. Develop implementation templates
4. Build subscription offering

### For Agent System Developers

### Phase 1: Learn

1. Read Chapter 12: What Agent Creators Must Build
2. Study Appendix I: £203k cruise pricing case study
3. Review validation framework code examples
4. Understand confidence scoring patterns

### Phase 2: Implement

1. Build range validation (price boundaries)
2. Implement comparative analysis (outlier detection)
3. Add incomplete data detection
4. Set up structured data cross-reference
5. Integrate confidence scoring

### Phase 3: Test

1. Unit test validation layers
2. Integration test comparative validators
3. Load test with production data
4. Measure false positive/negative rates

### Phase 4: Deploy

1. Deploy to production with monitoring
2. Collect telemetry on validation effectiveness
3. Tune confidence thresholds based on real data
4. Iterate on validation rules

---

## Frequently Asked Questions

### "Isn't this just accessibility compliance rebranded?"

**No.** While there's significant overlap, agent compatibility requires patterns beyond WCAG:

- **Structured data** (Schema.org JSON-LD) - not required for accessibility
- **Explicit state attributes** (data-validation-state) - beyond ARIA
- **URL state persistence** - not an accessibility requirement
- **llms.txt** files - emerging agent-specific convention
- **Served vs rendered HTML distinction** - agents operate in both modes

**That said:** Fixing your site for agents simultaneously improves accessibility. The patterns that break agents also break screen readers. You're solving both problems at once.

### "Can't I just block agents and force them to use APIs?"

**You can, but:**

1. **Browser-based agents inherit your session** (Claude for Chrome, Copilot)
   - They're logged in as you
   - You can't distinguish them from human users
   - Session cookies authenticate them automatically

2. **API-only strategy creates friction**
   - Users expect agents to "just work" on regular sites
   - Competitors offering seamless agent access win transactions
   - API development and maintenance costs exceed simple HTML fixes

3. **The web is the interface**
   - Agent capabilities are evolving toward visual browsing
   - Blocking agents is blocking future customers
   - Commercial pressure favours access, not restrictions

### "What's the improvement pattern?"

**Typical pattern:**

- **Phase 1:** Audit identifies issues
- **Phase 2:** Priority 1-2 implementation
- **Phase 3:** Agent conversion rates measurable
- **Phase 4:** Revenue recovery becomes significant
- **Phase 5:** Full ROI achieved

**Fast wins:** Priority 1 fixes often show results quickly

**Long-term value:** Competitive advantage compounds as agent traffic grows

### "Will these patterns become obsolete?"

**Core patterns are stable:**

- Semantic HTML has been best practice since HTML5 (2014)
- Schema.org structured data has been stable since 2011
- ARIA attributes have been standard since 2014
- URL state persistence is REST fundamentals (decades old)

**What's new is the commercial pressure to actually implement them.**

**Emerging patterns** (like llms.txt) are clearly flagged in the book and tool. They're forward-compatible - they won't break anything if agents don't recognize them yet.

### "Do I need to rebuild my entire site?"

**No.** The methodology is specifically designed for incremental improvement:

**Priority 1 fixes** (quick wins, high impact):

- Display pricing upfront
- Add "Show All" to paginated content
- Replace toast notifications
- Add explicit state attributes

**These can be implemented quickly.**

Priority 2-4 fixes are deeper but still don't require rebuilds. You're enhancing existing HTML, not replacing your technology stack.

### "What if my site is built with [framework]?"

**The patterns work across all stacks:**

- React, Vue, Angular, Svelte
- Next.js, Nuxt, SvelteKit, Remix
- WordPress, Drupal, Django, Rails
- Hand-coded HTML

**The book provides examples for multiple frameworks.** The core principle is making implicit state explicit in the DOM - that works regardless of how you generate your HTML.

### "How do I measure success?"

**The Web Audit Suite tracks:**

- LLM suitability scores over time (historical tracking)
- Pattern adoption rates (% of pages with essential patterns)
- Accessibility compliance improvements
- Structured data coverage

**Your analytics should show:**

- Reduced bounce rates (agents completing tasks)
- Increased conversion rates from agent-mediated traffic
- Higher organic search rankings (structured data helps SEO)
- Improved accessibility metrics

**Business metrics:**

- Revenue recovery from agent-compatible improvements
- Competitive benchmarking (your score vs competitors)
- Customer satisfaction improvements (humans benefit too)

---

## Illustrative Example: Luigi's Pizza

**Important:** This is an illustrative example from the book's appendix, not a verified case study. Use it to understand the methodology, not as proof of guaranteed results.

**Hypothetical Background:**

Small local restaurant with online ordering. Monthly revenue: Typical for category. Website built with WordPress + WooCommerce.

**Initial Audit Results:**

- LLM Suitability Score: Critical
- No structured data (Schema.org)
- Menu items in JavaScript-rendered tabs
- Checkout used complex CSS for validation feedback
- Success confirmation was toast notification only

**Agent Testing:**

- Claude browsing: Could not read full menu (tabs collapsed)
- ChatGPT shopping: Reported "checkout failed" (success toast disappeared)
- Ordering success rate: Complete failure

**Business Impact:**

```text
Monthly orders: Typical for category (phone, walk-in, web)
Web orders: Standard percentage
Agent-mediated attempts: Small but growing percentage
Successful agent orders: Complete failure
Potential lost revenue: Could be significant as agent traffic grows
```

**Implementation:**

Used Luigi's Pizza example from the book (Appendix A):

**Priority 1 fixes implemented:**

1. Added Schema.org markup (Restaurant, Menu, MenuItem)
2. Expanded menu items by default (progressive disclosure optional)
3. Replaced CSS validation with aria-invalid attributes
4. Added persistent success message (role="alert" + DOM element)

**Post-Fix Results:**

- LLM Suitability Score: Good threshold
- Agent ordering success rate: Significant improvement
- Bonus: Google began showing rich snippets with menu items
- Bonus: Screen reader users reported improved experience

**Impact:**

```text
Agent-mediated orders: Improved from complete failure to significant success
Additional revenue: Measurable improvement

Plus: SEO improvement from rich snippets
Plus: Human accessibility improvements
Plus: Customer satisfaction (word-of-mouth)

Total impact: Substantial improvement across multiple metrics
```

**Note on This Example:**

This illustrative scenario demonstrates how the methodology applies to small businesses. The patterns (Schema.org markup, expanded menus, persistent feedback) are real techniques from the book demonstrating systematic improvement approaches.

**Key Teaching Point:**

This example shows how to calculate potential exposure even for small businesses with modest traffic. The methodology works at any scale - from local restaurants to enterprise e-commerce - but actual results will vary based on your specific implementation, traffic patterns, and agent compatibility issues.

---

## The Bottom Line

**Your website may be losing potential revenue right now.**

You can't see it in your analytics because agent failures look like bounces. You don't get error reports because agents fail silently. You don't know it's happening until a competitor's site becomes agent-compatible and you wonder why their conversion rates improved.

**This is addressable.** The patterns are documented. The tools exist. The methodology provides a framework for identifying and fixing issues.

**You have three choices:**

1. **Wait and see** - Risk losing agent-mediated transactions to competitors who move first
2. **DIY implementation** - Use the book + tool to assess and address issues yourself
3. **Professional service** - Have it assessed and implemented for you (contact for pricing)

**The window for first-mover advantage is limited.**

Agent compatibility is likely to become table stakes - like mobile responsiveness today. Early movers can establish authority and capture market share before the category commoditises.

**Right now, you can assess your exposure and decide whether to act.**

You can identify issues preventing agent-mediated transactions. You can implement patterns that benefit both agents and human users. You can calculate your potential exposure and prioritise fixes accordingly.

**Important:** The field is too new for proven ROI data. Use the methodology and tools to assess your specific situation, but don't expect guaranteed outcomes. Treat this as risk management and accessibility improvement, not as a proven revenue generator.

---

## Get Started Today

### Purchase the Complete Package

### Book + Web Audit Suite + Implementation Framework

- Comprehensive methodology (~57,000 words + 10 appendices online)
- Production-ready analysis tool
- Copy-paste implementation recipes
- Agent validation frameworks
- Priority-based roadmap templates
- Business case calculator

**Contact:** <tom.cranstoun@gmail.com>

**Package includes:**

- Complete book manuscript (11 chapters + 10 appendices online)
- Implementation cookbook with code examples
- Priority-based roadmap templates

**Web Audit Suite available as:**

- Separate purchase for self-service analysis
- Professional audit service (we run it for you)

**But don't wait.**

Your competitors aren't.

---

## About the Author

Tom Cranstoun has worked on web technology since the early days of the commercial internet. Over three decades, he's seen the web evolve from hand-coded HTML pages to sophisticated application platforms.

This book grew from patterns he noticed across projects: the same accessibility problems appearing in different contexts, the same design assumptions failing for unexpected user types, the same commercial pressures shaping what gets fixed and what gets ignored.

The Web Audit Suite is the tool he wished existed when debugging why agents were failing on client sites. Now it does.

He's based in the UK and works with organisations internationally.

**Contact:** <tom.cranstoun@gmail.com>

**Website:** <https://allabout.network>

---

**Published:** January 2026

**Copyright:** © Tom Cranstoun. All rights reserved.

**License:** The methodology (book) and Web Audit Suite (tool) are included in the purchased package. All rights reserved.
