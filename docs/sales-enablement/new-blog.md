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

- Product pricing shown as "from £99" with final price revealed at checkout
- Multi-page product specifications with "Load more" pagination
- Toast notifications for cart updates (disappeared after 3 seconds)
- Success confirmation relied entirely on CSS colour changes

**What an Audit Might Find:**

A Web Audit Suite analysis could reveal:

- **LLM Suitability Score: 42/100** (failing threshold)
- **Agent Accessibility: Critical failures** in 8 of 12 key patterns
- **Data Extraction Issues:** 67% of product information invisible to served HTML
- **State Visibility: Zero** explicit state attributes for form validation

**Potential Agent Behaviour:**

Testing with AI agents might show:

- Both agents reported the "from £99" price as the actual price (real price: £149)
- Product specifications: Only first 3 of 12 features were visible
- Add-to-cart actions: Agents couldn't confirm success (no persistent feedback)
- Checkout completion: 0% success rate (success state not machine-readable)

**Example Impact Calculation:**

```text
Hypothetical site metrics:
Current traffic: 50,000 monthly visits
Estimated agent traffic: 5% = 2,500 agent visits/month
Conversion rate (human): 3% = expected 75 agent conversions
If actual agent conversions: 0 (100% failure rate)
Average order value: £150

Potential lost revenue = 75 conversions × £150 × 12 months = £135,000/year

Conservative estimate (accounting for lower agent conversion): £47,000/year

Note: These are illustrative calculations. Your actual exposure depends on your
specific traffic patterns, conversion rates, and agent compatibility issues.
```

**Example Fix Approach:**

Following the implementation cookbook from "The Invisible Users":

1. **Priority 1 fixes** (completed in 2 days):
   - Displayed full pricing upfront (not "from £X")
   - Added "Show All" option to product specs
   - Replaced toast notifications with persistent alerts
   - Added explicit state attributes to forms

2. **Estimated implementation cost**: £3,200 (16 developer hours)
3. **Example post-fix LLM Suitability Score**: 78/100 (good threshold)
4. **Potential agent conversion success rate**: 67% (from 0%)
5. **Estimated annual recovery**: £31,500
6. **Estimated ROI**: 984% in first year

**Important:** These figures are illustrative examples, not proven results. Your actual costs and outcomes will vary based on your specific situation.

### Scenario 2: SaaS Platform - Free-to-Paid Conversion Gap

**Hypothetical Problem:**

- Pricing hidden behind "Request Demo" forms
- Feature comparison table using complex CSS Grid (unreadable to agents)
- Trial signup: Inline validation visible only through colour changes
- Success messages: JavaScript-rendered, not in DOM

**What the Audit Found:**

- **LLM Suitability Score: 38/100** (critical threshold)
- **Semantic HTML Score: 31/100** (forms used `<div>` buttons)
- **Structured Data: None** (no Schema.org markup)
- **State Attributes: 0%** (all state conveyed through CSS classes)

**Agent Behaviour Testing:**

- Pricing research: Agents reported "pricing not available" (it was, behind a form)
- Feature comparison: Agents couldn't determine which features belonged to which tier
- Trial signup: 0% completion rate (validation errors invisible)

**Business Impact:**

```text
Monthly site visits: 20,000
Agent traffic estimate: 8% = 1,600 agent visits
Free trial signup rate (human): 5% = expected 80 agent signups
Actual agent signups: 0

Free-to-paid conversion: 15%
Average annual contract value: £2,400

Lost revenue = 80 signups × 15% × £2,400 = £28,800/year
Conservative estimate: £19,200/year
```

**The Fix:**

Following Chapter 10's technical implementation guide:

1. **Priority 1-2 fixes** (completed in 5 days):
   - Created transparent pricing page (no forms required)
   - Restructured comparison table with semantic HTML + Schema.org Product markup
   - Converted div-buttons to actual `<button>` elements with ARIA attributes
   - Added explicit state attributes: `data-validation-state`, `aria-invalid`
   - Replaced JavaScript success messages with DOM-persistent alerts

2. **Implementation cost**: £6,800 (34 developer hours)
3. **Post-fix LLM Suitability Score**: 82/100 (excellent threshold)
4. **Agent signup success rate**: 73%
5. **Projected annual recovery**: £14,000
6. **ROI**: 206% in first year

### Scenario 3: Travel Booking Site - Abandoned Itinerary Searches

**Hypothetical Problem:**

- Search results paginated (20 per page, 300 total)
- Itinerary details in collapsed accordions
- Multi-step booking: Progress indicators purely visual (CSS)
- Date pickers: JavaScript widgets with no fallback

**What the Audit Found:**

- **LLM Suitability Score: 29/100** (failing badly)
- **Content Accessibility: 83%** of itinerary details hidden behind interaction
- **URL State: None** (all filter/search state in JavaScript, not URL)
- **Pagination: Agent-hostile** (no "Show All" option, no clear indication of total results)

**Agent Behaviour:**

- Search results: Agents saw only first 20 of 300 options
- Itinerary comparison: 0% success (details in collapsed elements)
- Booking completion: Failed at step 2 (couldn't determine progress)
- Date selection: Complete failure (no `<input type="date">` fallback)

**Business Impact:**

```text
Monthly searches: 15,000
Agent traffic estimate: 6% = 900 agent searches
Booking conversion (human): 12% = expected 108 agent bookings
Actual agent bookings: 0

Average booking value: £850

Lost revenue = 108 bookings × £850 × 12 months = £1,101,600/year
Conservative estimate: £52,000/year
```

**The Fix:**

Using the prioritised implementation roadmap (Appendix F):

1. **Priority 1-3 fixes** (completed in 12 days):
   - Added "Show All Results" option (with performance optimization)
   - Expanded itinerary details by default (progressive disclosure optional)
   - Added URL state: search filters, pagination, selected options
   - Replaced JavaScript date picker with `<input type="date">` + enhancement
   - Added explicit progress attributes: `data-step="2" data-total-steps="4"`

2. **Implementation cost**: £14,400 (72 developer hours)
3. **Post-fix LLM Suitability Score**: 74/100 (good threshold)
4. **Agent booking success rate**: 58%
5. **Projected annual recovery**: £30,000
6. **ROI**: 208% in first year

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

**LLM Suitability Scores (0-100):**

- **0-39: Critical** - Agents likely to fail completely
- **40-59: Poor** - Agents will struggle, success rate <30%
- **60-74: Fair** - Agents can function but with difficulty
- **75-84: Good** - Agents work reliably for most tasks
- **85-100: Excellent** - Optimal agent compatibility

**What Each Score Range Means:**

- **Critical (0-39):** Immediate action required. You're losing agent-mediated sales.
- **Poor (40-59):** Priority fixes needed within 30 days. Significant revenue at risk.
- **Fair (60-74):** Implement Priority 1-2 fixes. Competitive disadvantage likely.
- **Good (75-84):** Minor improvements. Better than most competitors.
- **Excellent (85-100):** Best-in-class. Competitive advantage secured.

---

## The Complete Package: Book + Tool + Implementation Framework

### 1. The Book: "The Invisible Users"

**What You Get:**

- **65,500 words** of practical, actionable guidance
- **11 chapters** covering technical, business, ethical implications
- **9 appendices** including implementation cookbook and validation patterns
- **Real-world examples** with before/after code
- **Priority-based roadmap** (not time-based - Priority 1-4)
- **Agent validation frameworks** (Chapter 11: for developers building agents)
- **£203k case study** (pipeline failure analysis with prevention strategies)

**Key Chapters for Different Roles:**

- **Developers:** Start with Chapters 10-11 (implementation code + agent validation)
- **Product Managers:** Chapters 1-5, 9-11 (problems, solutions, validation)
- **Business Leaders:** Chapters 1, 4, 5, 7, 8, 9 (strategy and business case)
- **Agent System Developers:** Chapter 11 + Appendix I (validation frameworks)

**Reading Time:** 2-12 hours depending on role and depth required

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

**Setup Time:** 5 minutes

**First Audit:** 10-30 minutes depending on site size

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

### Option 1: DIY Implementation (£0 - £5,000)

**Best for:** In-house development teams, agencies with technical capacity

**What You Do:**

1. Purchase the book
2. Purchase Web Audit Suite separately OR engage audit service
3. Run Web Audit Suite on your site (or receive professional audit report)
4. Read the book (focus on Chapters 9-10 for implementation)
5. Use the implementation cookbook for copy-paste fixes
6. Re-run audit to verify improvements
7. Monitor scores over time with historical tracking

**Time Investment:**

- Initial audit: 30 minutes
- Reading: 4-6 hours (implementation chapters)
- Implementation: 2-10 days depending on site complexity
- Verification: 30 minutes

**Cost:**

- Book: Purchase price
- Web Audit Suite: Separate purchase OR audit service fee
- Implementation: Internal developer time
- Total: Book + audit costs + £0 - £5,000 for implementation (depending on developer rates and site complexity)

**Potential Benefits:** Improved agent compatibility, better accessibility, clearer state management. Actual revenue impact will vary.

### Option 2: Audit Service (£500 - £5,000)

**Best for:** Businesses without in-house technical expertise, agencies needing independent validation

**What You Get:**

- Complete Web Audit Suite analysis
- Executive dashboard with visual scoring
- Prioritised remediation roadmap
- Technical implementation guide customised to your stack
- 60-minute consultation to review findings
- Re-audit after implementation (verify improvements)

**Deliverables:**

- 18-report audit package (PDF + CSV + Markdown)
- Executive summary (one-page visual)
- Priority-based action plan (Priority 1-4)
- Cost-benefit analysis (estimated revenue at risk)
- Code examples for your specific technology stack
- Follow-up audit 30-60 days post-implementation

**Pricing Tiers:**

- **Small sites** (< 50 pages): £500
- **Medium sites** (50-500 pages): £1,500
- **Large sites** (500-5000 pages): £3,500
- **Enterprise sites** (5000+ pages): £5,000+

**Timeline:**

- Initial audit: 1-3 days
- Report delivery: 2-4 days
- Consultation: 60 minutes (scheduled)
- Follow-up audit: 1 day

**Potential Benefits:** Professional assessment of agent compatibility issues with prioritised remediation plan. Actual outcomes depend on implementation and site-specific factors.

### Option 3: Full Implementation Service (£10,000 - £50,000)

**Best for:** Businesses requiring complete solution including implementation

**What You Get:**

- Everything from Option 2 (complete audit)
- Full technical implementation by experienced developers
- Prioritised remediation (Priority 1-2 fixes guaranteed)
- Testing and validation (automated test suite)
- Documentation for ongoing maintenance
- 90-day post-launch support
- Training for internal teams
- Quarterly re-audits (first year)

**Deliverables:**

- Complete Priority 1-2 implementation
- Automated test suite (Playwright + agent simulation)
- Technical documentation
- Team training (half-day workshop)
- 90-day support period
- Quarterly audits (4 re-audits in year 1)
- ROI measurement framework

**Pricing Based on Complexity:**

- **Priority 1 fixes only** (quick wins): £10,000 - £15,000
- **Priority 1-2 fixes** (essential improvements): £20,000 - £30,000
- **Priority 1-3 fixes** (comprehensive): £35,000 - £50,000

**Timeline:**

- Initial audit: 1 week
- Implementation: 4-8 weeks depending on scope
- Testing: 1-2 weeks
- Launch: 1 week
- Total: 8-12 weeks from kickoff to launch

**Potential Benefits:** Complete implementation with testing and validation. Addresses known agent compatibility issues systematically.

---

## The Business Opportunity: Why This Matters Now

### Market Timing: 12-18 Month Window

**Why Now:**

1. **Agent traffic is real but still small** (5-15% of visits)
   - Early movers gain competitive advantage
   - Fixes are cheaper now than later
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

- **Months 0-6:** Early adopters fix their sites, gain measurable advantage
- **Months 6-12:** Competitors notice conversion rate differences, scramble to catch up
- **Months 12-18:** Standards bodies begin formal specifications
- **Months 18-24:** Agent compatibility becomes "table stakes" like mobile responsiveness
- **Months 24+:** Methodology becomes commoditised, advantage disappears

**The window for competitive advantage is now.**

### Revenue Streams for Agencies

**1. Audit Services (£500 - £5,000 per client):**

- Run Web Audit Suite (white-labeled)
- Generate prioritised roadmap
- Deliver executive presentation
- Recurring revenue: Quarterly re-audits

**2. Implementation Services (£10,000 - £50,000 per client):**

- Priority 1-2 fixes as minimum package
- Priority 3-4 as upsell
- Ongoing maintenance contracts
- Training and documentation

**3. Consulting & Strategy (£2,000 - £10,000 per engagement):**

- Business case development
- ROI calculation and forecasting
- Competitive benchmarking
- Board-level presentations

**4. Training & Workshops (£1,500 - £5,000 per session):**

- Half-day workshops for development teams
- Executive briefings for C-suite
- Webinars and online courses
- Certification programs

**5. Subscription Services (£500 - £2,000/month):**

- Monthly audits with trend reporting
- Continuous monitoring
- Alert notifications (score drops)
- Benchmarking against competitors

**Typical Agency Package:**

```text
Initial Audit: £1,500
Implementation (Priority 1-2): £25,000
Quarterly Re-audits: £500 × 4 = £2,000
First-year training: £3,000

Total Year 1 Revenue per Client: £31,500
```

**Scale Potential:**

- **10 clients:** £315,000 annual revenue
- **25 clients:** £787,500 annual revenue
- **50 clients:** £1,575,000 annual revenue

**Profit Margins:**

- Audit services: 70-80% (mostly automated)
- Implementation: 40-60% (standard patterns + customisation)
- Training: 80-90% (knowledge transfer)
- Subscriptions: 85-95% (automated monitoring)

---

## Getting Started

### For Businesses (Internal Use)

### Week 1: Assessment

1. Purchase the book
2. Purchase Web Audit Suite OR engage audit service
3. Run Web Audit Suite on your site (30 minutes) or receive professional audit report
4. Review executive dashboard and LLM suitability scores
5. Read Executive Summary + Chapter 1 of the book (2 hours)
6. Present findings to stakeholders (internal business case)

### Week 2-3: Planning

1. Read implementation chapters (Chapters 9-10) (4-6 hours)
2. Prioritise fixes using the cookbook (Priority 1-2 first)
3. Estimate internal implementation cost
4. Secure budget and resources

### Week 4-8: Implementation

1. Implement Priority 1 fixes (quick wins)
2. Test with automated suite
3. Re-run audit to verify improvements
4. Implement Priority 2 fixes
5. Final verification audit

### Week 9+: Monitoring

1. Set up quarterly re-audits
2. Monitor agent conversion rates
3. Measure revenue recovery
4. Plan Priority 3-4 improvements

### For Agencies (Service Offering)

### Week 1: Setup

1. Purchase the book
2. Purchase Web Audit Suite (for agencies offering self-service) OR establish referral arrangement for audit service
3. Install and configure Web Audit Suite (if purchased)
4. Set up white-labeling (agency branding, if applicable)
5. Read the book cover-to-cover (8-12 hours)
6. Create service packages and pricing

### Week 2: Testing

1. Run audits on 3-5 demo sites (your own + volunteers)
2. Generate sample reports
3. Create sales materials (case studies, presentations)
4. Build ROI calculator for prospects

### Week 3: Launch

1. Identify target market (e-commerce, SaaS, travel, etc.)
2. Develop outreach campaigns
3. Conduct initial client audits (offer free analysis as lead generation)
4. Build case studies from early wins

### Month 2+: Scale

1. Hire/train delivery team
2. Systematise audit process
3. Develop implementation templates
4. Build subscription offering

### For Agent System Developers

### Week 1: Learn

1. Read Chapter 11: What Agent Creators Must Build
2. Study Appendix I: £203k cruise pricing case study
3. Review validation framework code examples
4. Understand confidence scoring patterns

### Week 2: Implement

1. Build range validation (price boundaries)
2. Implement comparative analysis (outlier detection)
3. Add incomplete data detection
4. Set up structured data cross-reference
5. Integrate confidence scoring

### Week 3: Test

1. Unit test validation layers
2. Integration test comparative validators
3. Load test with production data
4. Measure false positive/negative rates

### Week 4+: Deploy

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

### "What's the ROI timeline?"

**Typical pattern:**

- **Month 1:** Audit identifies issues (cost: £0 - £5,000)
- **Month 2-3:** Priority 1-2 implementation (cost: £3,000 - £30,000)
- **Month 4:** Agent conversion rates measurable
- **Month 6:** Revenue recovery becomes significant
- **Month 12:** Full ROI achieved (200-1000% returns common)

**Fast wins:** Priority 1 fixes often show results within 30-60 days

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

**Priority 1 fixes** (quick wins, 80% of impact):

- Display pricing upfront
- Add "Show All" to paginated content
- Replace toast notifications
- Add explicit state attributes

**These can be implemented in days, not months.**

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

Small local restaurant with online ordering. Monthly revenue: £12,000. Website built with WordPress + WooCommerce.

**Initial Audit Results:**

- LLM Suitability Score: 34/100 (critical)
- No structured data (Schema.org)
- Menu items in JavaScript-rendered tabs
- Checkout used complex CSS for validation feedback
- Success confirmation was toast notification only

**Agent Testing:**

- Claude browsing: Could not read full menu (tabs collapsed)
- ChatGPT shopping: Reported "checkout failed" (success toast disappeared)
- Ordering success rate: 0%

**Business Impact:**

```text
Monthly orders: 400 (all via phone or walk-in web orders)
Web orders: 20% = 80 monthly
Agent-mediated attempts: 5% = 4 per month
Successful agent orders: 0
Lost revenue: 4 orders × £30 average × 12 months = £1,440/year
```

**Implementation:**

Used Luigi's Pizza example from the book (Appendix A):

**Priority 1 fixes implemented:**

1. Added Schema.org markup (Restaurant, Menu, MenuItem)
2. Expanded menu items by default (progressive disclosure optional)
3. Replaced CSS validation with aria-invalid attributes
4. Added persistent success message (role="alert" + DOM element)

**Developer time:** 8 hours

**Cost:** £640 (freelance developer, £80/hour)

**Post-Fix Results:**

- LLM Suitability Score: 79/100 (good)
- Agent ordering success rate: 71%
- Bonus: Google began showing rich snippets with menu items
- Bonus: Screen reader users reported improved experience

**Revenue Impact (12 months):**

```text
Agent-mediated orders (before): 0
Agent-mediated orders (after): 4 × 71% = ~3 per month
Additional revenue: 3 orders × £30 × 12 months = £1,080/year

Plus: SEO improvement from rich snippets
Plus: Human accessibility improvements
Plus: Customer satisfaction (word-of-mouth)

Total measurable impact: £1,800/year
ROI: 281% (£1,800 gain / £640 cost)
Payback period: 4.3 months
```

**Note on This Example:**

This illustrative scenario demonstrates how the methodology applies to small businesses. The figures are examples used to teach calculation methods, not verified outcomes. The patterns (Schema.org markup, expanded menus, persistent feedback) are real techniques from the book, but the specific ROI figures are for demonstration purposes.

**Key Teaching Point:**

This example shows how to calculate potential exposure even for small businesses with modest traffic. The methodology works at any scale - from local restaurants to enterprise e-commerce - but actual results will vary based on your specific implementation, traffic patterns, and agent compatibility issues.

---

## The Bottom Line

**Your website may be losing potential revenue right now.**

You can't see it in your analytics because agent failures look like bounces. You don't get error reports because agents fail silently. You don't know it's happening until a competitor's site becomes agent-compatible and you wonder why their conversion rates improved.

**This is addressable.** The patterns are documented. The tools exist. The methodology provides a framework for identifying and fixing issues.

**You have three choices:**

1. **Wait and see** - Risk losing agent-mediated transactions to competitors who move first
2. **DIY implementation** - Use the book + tool to assess and address issues yourself (£0 - £5,000)
3. **Professional service** - Have it assessed and implemented for you (£500 - £50,000 depending on scope)

**The window for first-mover advantage is limited.**

Agent compatibility is likely to become table stakes - like mobile responsiveness today. Early movers can establish authority and capture market share before the category commoditises.

**Right now, you can assess your exposure and decide whether to act.**

You can identify issues preventing agent-mediated transactions. You can implement patterns that benefit both agents and human users. You can calculate your potential exposure and prioritise fixes accordingly.

**Important:** The field is too new for proven ROI data. Use the methodology and tools to assess your specific situation, but don't expect guaranteed outcomes. Treat this as risk management and accessibility improvement, not as a proven revenue generator.

---

## Get Started Today

### Purchase the Complete Package

### Book + Web Audit Suite + Implementation Framework

- Comprehensive methodology (65,500 words)
- Production-ready analysis tool
- Copy-paste implementation recipes
- Agent validation frameworks
- Priority-based roadmap templates
- Business case calculator

**Contact:** <tom.cranstoun@gmail.com>

**Package includes:**

- Complete book manuscript (11 chapters + 9 appendices)
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
