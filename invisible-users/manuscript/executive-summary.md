# Executive Summary: The Invisible Users

## What Is Happening

AI agents are no longer just chat interfaces that fetch web pages. Browser extensions like Claude for Chrome and Microsoft Copilot now work directly alongside users within their actual browsers, seeing what you see, clicking what needs clicking, logged in with your credentials, and acting on your behalf across multiple tabs. These agents operate in your context, with your permissions, on websites you use every day.

This represents a fundamental shift: agents aren't just reading static HTML anymore. They navigate interfaces visually, maintain context across sessions, fill forms, click buttons, and execute multi-step workflows whilst you work on something else. They struggle with common web design patterns that work well for human visual browsing but fail for sequential, programmatic interaction. The same patterns that break for agents also create accessibility problems for disabled users, but until now there's been insufficient commercial pressure to fix them.

## Why It Matters to Business

**Your conversion funnel has invisible drop-offs.** When agents fail to read your pricing, miss content hidden behind pagination, or can't tell if a form submission succeeded, the human user goes to a competitor. This doesn't show up in your analytics as a failed conversion - it shows as a short session or a bounce. You never see the lost sale.

**The impact varies by business model:**

- **Ad-funded content:** Agent extraction threatens the core revenue model. When agents read and summarise without driving page views, ad revenue disappears.
- **E-commerce and bookings:** Agent compatibility is an opportunity. Sites that work well for agents capture sales from competitors whose sites don't.
- **SaaS and subscriptions:** Pricing transparency and clear information become competitive advantages when agents evaluate options.
- **Local businesses:** Most relationship-based businesses can deprioritise this, but those competing on search visibility or price should pay attention.

## Who Is Most Affected

**High priority:**

- E-commerce sites with complex product catalogues
- Travel and hospitality booking platforms
- Financial services with online applications
- Content publishers dependent on advertising
- Any business competing primarily on price

**Medium priority:**

- SaaS platforms with self-service sign-up
- Professional services firms found through search
- Retail sites with online and offline presence

**Low priority:**

- Relationship-based local businesses
- Services requiring in-person consultation
- Businesses with established customer bases not dependent on discovery

## What to Do About It

### Priority 1: Quick Assessment

- Audit your site for the six critical failures: disappearing notifications, hidden content (pagination, tabs, below-the-fold), single-page applications without URL state, delayed form validation, unclear pricing, and ambiguous loading states
- Test your checkout flow with a screen reader (if it fails for screen readers, it fails for agents)
- Check whether agents can find your pricing, understand your offering, and determine if actions succeeded

### Priority 2: High-Impact Fixes

- Replace toast notifications with persistent messages
- Add "Show All" options to paginated content
- Display full pricing upfront
- Ensure URLs reflect current state
- Use semantic HTML and clear text labels

### Priority 3: Strategic Decisions (ongoing)

- Decide on your agent access policy: permit, restrict, or selectively allow?
- Consider whether to offer agent-specific APIs or interfaces
- Evaluate business model resilience to agent-mediated commerce
- Review liability and terms of service for agent interactions

### Priority 4: Advanced Implementation

- Implement identity delegation patterns for agent-mediated purchases
- Develop comprehensive agent compatibility testing
- Create governance frameworks for agent access policies

## Navigate This Book

This book addresses different audiences with different needs:

**Business Decision-Makers**: Chapters 1, 4, 5, 7, 8, and first half of Chapter 9 (Focused reading). Delegate Chapter 11 to teams evaluating agent partnerships.

**Product & Design**: Chapters 1-5, 9-11 (Comprehensive coverage)

**Developers**: Start with Chapters 10-11, then work backwards through Chapters 2, 6, 9 for context (Technical focus)

**Agent System Developers**: Chapter 11 (core focus on validation layers and guardrails), Chapters 2-3 (failure modes), Chapter 10 (website patterns your agents will encounter) (Targeted reading)

**Small Business Owners**: Chapters 1, 4, small business sections in Chapter 9 (Quick overview)

For detailed reading paths with chapter-by-chapter guidance, see the navigation guide in the Preface (page X).

## One-Page Decision Tree: Should You Prioritise Agent Compatibility?

![Decision tree flowchart showing five questions to assess agent compatibility priority level](illustrations/executive-summary-decision-tree.png)

**How to use this decision tree:**

Start at Q1 and follow the YES/NO arrows through five key questions. Each path leads to one of four priority levels:

- **LOW PRIORITY:** Monitor the situation but don't invest heavily
- **MEDIUM PRIORITY:** Start with Priority 1 assessment and monitor agent traffic
- **HIGH PRIORITY:** Agents excel at comparison shopping - fix agent-hostile patterns urgently
- **CRITICAL PRIORITY:** Structural threat to ad-dependent revenue - diversify urgently

## Key Limitation: What This Book Is Not

This book offers frameworks for thinking about an emerging problem, not proven solutions backed by peer-reviewed research. The field is too new for that level of validation. The figures are illustrative, the patterns are observed but not statistically validated, and the recommendations represent best current thinking rather than established fact.

Use this book to structure your thinking, evaluate your exposure, and make informed decisions. Don't cite the figures as research findings. Don't assume the patterns described will remain optimal as the technology evolves. Do treat this as a framework for navigating uncertainty while standards are still forming.

---

**The core insight:** The patterns that break AI agents also break human users. We've tolerated accessibility problems for years because they affected minorities without commercial power. Agents represent potential customers with spending power. Commercial pressure might finally drive the improvements that benefit everyone.

For detailed chapter summaries and content overview, see Chapter 1.
