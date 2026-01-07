# Executive Summary: The Invisible Users

## What Is Happening

AI agents - assistants like ChatGPT, Claude, and similar tools - are visiting websites on behalf of human users to research products, compare options, check availability, and increasingly to complete transactions. These agents struggle with common web design patterns that work well for human visual browsing but fail for sequential, programmatic reading. The same patterns that break for agents also create accessibility problems for disabled users, but until now there's been insufficient commercial pressure to fix them.

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

### Priority 1: Quick Assessment (1-2 hours)

- Audit your site for the five critical failures: disappearing notifications, paginated content, unclear pricing, visual-only state indicators, forms with transient feedback
- Test your checkout flow with a screen reader (if it fails for screen readers, it fails for agents)
- Check whether agents can find your pricing, understand your offering, and determine if actions succeeded

### Priority 2: High-Impact Fixes (days to weeks)

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

### Priority 4: Advanced Implementation (months)

- Implement identity delegation patterns for agent-mediated purchases
- Develop comprehensive agent compatibility testing
- Create governance frameworks for agent access policies

## Navigate This Book

This book addresses different audiences with different needs:

**Business Decision-Makers**: Chapters 1, 4, 5, 7, 8, and first half of Chapter 9 (3-4 hours)

**Product & Design**: Chapters 1-5, 9-10 (5-6 hours)

**Developers**: Chapters 2, 6, 9-10, working backwards for context (4-5 hours)

**Small Business Owners**: Chapters 1, 4, small business sections in Chapter 9 (1-2 hours)

For detailed reading paths with chapter-by-chapter guidance, see the navigation guide in the Preface (page X).

Total reading time: 8-12 hours for complete coverage, depending on technical depth required.

## One-Page Decision Tree: Should You Prioritise Agent Compatibility?

**Start here: Is your business primarily local and relationship-based?**

- Yes → **Low priority.** Monitor the situation but don't invest heavily unless your competitive landscape changes.
- No → Continue.

**Do customers find you through search and compare multiple options?**

- No → **Low priority.** Established customer relationships reduce agent impact.
- Yes → Continue.

**Is your revenue model dependent on advertising?**

- Yes → **Critical priority.** Chapter 5 describes the structural threat. Consider revenue diversification urgently.
- No → Continue.

**Do you compete primarily on price or easily comparable features?**

- Yes → **High priority.** Agents excel at comparison shopping. Agent-friendly sites capture sales from competitors.
- No → Continue.

**Do you have complex product information, multi-step forms, or checkout flows?**

- Yes → **High priority.** These are where agents commonly fail. Fixing them improves conversions.
- No → **Medium priority.** Start with Priority 1 assessment and monitor agent traffic.

## Key Limitation: What This Book Is Not

This book offers frameworks for thinking about an emerging problem, not proven solutions backed by peer-reviewed research. The field is too new for that level of validation. The figures are illustrative, the patterns are observed but not statistically validated, and the recommendations represent best current thinking rather than established fact.

Use this book to structure your thinking, evaluate your exposure, and make informed decisions. Don't cite the figures as research findings. Don't assume the patterns described will remain optimal as the technology evolves. Do treat this as a framework for navigating uncertainty while standards are still forming.

---

**The core insight:** The patterns that break AI agents also break human users. We've tolerated accessibility problems for years because they affected minorities without commercial power. Agents represent potential customers with spending power. Commercial pressure might finally drive the improvements that benefit everyone.

For detailed chapter summaries and content overview, see Chapter 1.
