# Why Your Website Works Perfectly - And Fails Completely

I didn't set out to write a book about AI agents. I set out to book a holiday.

It was late 2024, and I was comparing tour operators for a trip through Southeast Asia. I'd delegated the research to an AI assistant, expecting it to save me hours of clicking through brochures. Instead, it gave me confident but wrong advice about which company had the better itinerary.

The agent had looked at one tour operator's paginated day-by-day breakdown, seen only Day 1, and concluded that was the entire trip. The competitor's single-page itinerary was readable in full. Based on this, my assistant recommended the wrong company.

I caught the error. But I wondered: how many people wouldn't?

That question led me down a path I hadn't anticipated. The same design choices that confused my AI assistant also confused screen reader users, people with cognitive disabilities, and anyone who processed pages sequentially rather than spatially.

We'd built a web that worked brilliantly for one specific type of user: someone with good vision, working on a desktop, with focused attention and plenty of time. Everyone else had been struggling quietly for years. Now AI agents were struggling loudly, and there was finally commercial pressure to fix the problems.

---

## The Invisible Visitors

Right now, AI agents are visiting your site. ChatGPT is browsing your product pages. Claude is reading your documentation. Autonomous shopping assistants are attempting to complete transactions.

And maybe they all fail.

Not failing loudly and not throwing errors. Just... silently giving up, reporting success when they've actually failed, or completing actions incorrectly with hallucinations about success.

You won't see it in your analytics. Your error logs won't catch it. Your monitoring won't alert you.

But it's happening, right now.

## The Pattern That Breaks Everything

Let me show you a simple example. You've probably built something like this:

**A form that looks perfect:**

- Clean design
- Helpful inline validation
- Clear error messages
- Button that lights up when complete

**What the human sees:**

1. Type email → green checkmark appears
2. Type name → green checkmark appears
3. Button changes from grey to blue
4. Click button → success!

**What the AI agent sees:**

1. HTML input field (no indication it's for email)
2. HTML input field (no indication it's for name)
3. HTML button (disabled="false")
4. Click button → form submits

The agent doesn't see the green checkmarks. They're CSS. The button colour change? Also CSS. The inline validation? JavaScript that updates classes, not attributes.

Your form works perfectly for humans. For agents, it's a mysterious box with invisible rules.

## It's Not Just Forms

**Your product comparison table:**

- Humans see three columns, can scan and compare
- Agents see a flat list, can't determine which features belong to which product

**Your multi-step checkout:**

- Humans see "Step 2 of 3" with a progress bar
- Agents see a page that looks identical to the previous page, no idea they've progressed

**Your search results:**

- Humans see "Showing results 1-20 of 347"
- Agents see 20 results, no indication there are 327 more

**Your success confirmation:**

- Humans see a green banner that says "Order placed!"
- Agents see a page identical to the previous page, assume the action failed

This isn't about agents being stupid. It's about the fundamental mismatch between how we design for human cognition and how agents parse the web.

## Why This Matters Now

You might be thinking: "AI agents are a tiny fraction of my traffic. Why should I care?"

Three reasons:

### 1. The Commercial Pressure Is Already Here

Companies are building agent-first products right now:

- Shopping assistants that compare prices across retailers
- Booking agents that handle travel arrangements
- Research agents that gather information from multiple sources
- Task automation that completes repetitive web workflows

If your competitors make their sites agent-compatible first, they win those transactions. All of them. Because agents don't retry on sites that fail.

### 2. Your Human Users Need This Too

Every pattern that breaks agents also breaks humans:

- **Toast notifications** that vanish before screen readers announce them
- **Pagination** that hides content from search engines
- **SPAs** that break the back button
- **Progressive disclosure** that forces many clicks to see full pricing
- **Validation** that only works after submission

The patterns that confuse agents are the same patterns accessibility advocates have been complaining about for years. You're not building for agents. You're building for everyone.

### 3. The Relationship Is Breaking

Here's the bit nobody's talking about: when an agent buys something on your behalf, you lose your customer relationship with the retailer.

**What breaks:**

- Your loyalty points disappear (the agent earned them)
- Your warranty becomes unregistrable (who owns the product?)
- Your purchase history vanishes (you're not in the system)
- Your returns fail (you're not recorded as the buyer)

**What this means:**

- For retailers: Customer acquisition cost goes to zero value
- For customers: You lose all the benefits you've built up
- For agents: You become the intermediary everyone blames

## The Identity Challenge

One of the uncomfortable realities explored in the book: when agents make purchases on your behalf, the customer relationship between you and the retailer breaks down.

**Emerging solutions:**

The book mentions several approaches being explored:

- Retailer-specific delegation tokens
- Centralised identity repositories
- Blockchain-based attestations
- Browser-native delegation APIs

Standards are still emerging. The book doesn't prescribe a specific solution, but explains why the problem needs solving and what patterns might work. This isn't the main focus - it's one practical concern among many - but it's important context for understanding why agent-compatible design matters for both businesses and customers.

## About Standards and Patterns

The book presents both established standards and proposed patterns. When you see:

- **Schema.org, semantic HTML, ARIA** - these are established standards, use them with confidence
- **llms.txt** - this is an emerging convention in early adoption phase
- **ai-* meta tags, data-agent-visible** - these are proposed patterns, not yet standardised

All proposed patterns are designed to be forward-compatible - they won't break anything if agents don't recognise them. Think of them as progressive enhancement for AI. The book clearly distinguishes what's deployed in production today versus logical extensions that may become standards as the ecosystem matures.

## The Solutions Are Simpler Than You Think

You don't need to rebuild everything. You don't need to support a separate API. You don't need to detect and route agents differently.

**You need to make implicit state explicit.**

Instead of this:

```javascript
// Button colour changes from grey to blue via CSS class
<button className={isValid ? 'active' : 'inactive'}>Submit</button>
```

Do this:

```javascript
// Same visual result, but state is explicit in the DOM
<button
  className={isValid ? 'active' : 'inactive'}
  disabled={!isValid}
  data-form-state={isValid ? 'complete' : 'incomplete'}
>
  Submit
</button>
```

Same design. Same user experience. But now the state is machine-readable.

**Instead of toast notifications that vanish:**

```javascript
// Error appears for 3 seconds then disappears
showToast("Email is required", 3000);
```

Do this:

```javascript
// Error persists until user fixes it
<div className="error-summary" role="alert">
  <h2>There are problems with this form</h2>
  <ul>
    <li><a href="#email">Email is required</a></li>
  </ul>
</div>
```

Same information. Better for everyone. Screen readers can announce it. Agents can see it. Users have time to read it.

**Instead of hiding pricing behind clicks:**

- Show the complete price upfront
- Include all fees before checkout
- Make restrictions visible, not buried

This isn't about dumbing down your interface. It's about making your excellent design machine-readable.

## What You'll Learn

This book grew from that realisation. It's not a book about AI. It's a book about web design, and the assumptions we've embedded into it. AI agents are the lens, but the subject is broader: how do we build digital spaces that work for users we didn't anticipate?

**The first three chapters** establish what's breaking and why. These are the foundations. Skip them and you'll miss the context that makes solutions make sense.

**Chapters 4 through 8** address implications: business models, content economics, security concerns, legal landscape, and human costs. These might seem tangential to implementation, but they're not. The choices we make about agent compatibility are shaped by these pressures.

**Chapters 9 and 10** provide solutions. Strategic frameworks in Chapter 9. Working code in Chapter 10. If you're impatient to implement, you can start there and work backwards.

Throughout, I've tried to be honest about tensions that don't have clean resolutions. Some fixes for agent compatibility conflict with short-term business interests. Some accessibility improvements reduce engagement metrics. Some solutions create new problems. I've flagged these rather than pretending they don't exist.

## Who This Book Is For

**1. Web Professionals & Engineers (The Users)**
Developers and QA specialists who need the technical tools. You get production-ready code and testing strategies to solve immediate pipeline challenges. The **Web Audit Suite** is available as a separate purchase or professional audit service.

**2. Agent System Developers (The Builders)**
Developers building AI agents, browser extensions, and agentic systems. Chapter 11 is written specifically for you. You get **validation frameworks**, **confidence scoring patterns**, and **guardrails** that prevent pipeline failures like the £203,000 cruise pricing error.

**3. Business Leaders (The Buyers)**
Executives who need to understand the strategic risk. You get the **Business Case** to explain "silent conversion failures" and justify the investment in agent compatibility.

**4. Partners & Investors (The Scalers)**
Agencies and investors looking for the next growth category. You get the **Methodology** and **Business Model** to enable new professional service lines.

## The Chapters

1. **What You Will Learn** - The accessibility connection and why this matters
2. **The Invisible Failure** - Specific patterns that break, with examples
3. **The Architectural Conflict** - Why human cognition vs AI parsing creates problems
4. **The Business Reality** - Economics, incentives, and competitive dynamics
5. **The Content Creator's Dilemma** - The existential threat to ad-funded content
6. **The Security Maze** - Authentication, delegation, and session inheritance
7. **The Legal Landscape** - Liability, copyright, and emerging regulation
8. **The Human Cost** - Digital divide and access implications
9. **Designing for Both** - Practical solutions that work for everyone
10. **Technical Advice** - Implementation code and testing strategies
11. **What Agent Creators Must Build** - Validation layers, confidence scoring, and pipeline failure prevention

## What You'll Find Inside

**Concrete examples:**

- Real websites that fail in specific ways
- Exact patterns that break
- Why they break
- How to fix them

**Working code:**

- Practical design patterns with bad/good examples
- Synchronous form validation
- Explicit state management
- Agent-compatible loading indicators
- Structured data implementation (JSON-LD, schema.org)
- Luigi's Pizza small business template
- Playwright tests for agent compatibility
- **Agent-Friendly Starter Kit**: Hands-on "Good vs. Bad" site implementation you can run yourself

**Business context:**

- Which industries benefit
- Which face existential threats
- How competitive dynamics play out
- What the regulatory landscape looks like
- Where the commercial opportunities are

**Practical guidance:**

- Implementation checklist
- Testing strategies
- Phased rollout plans
- Success metrics
- Common pitfalls
- Standalone prescriptive guide (appendix-ai-friendly-html-guide.md, ~8,400 words) with 12-part builder's reference
- Quick-reference HTML patterns for AI assistants (appendix-ai-patterns-quick-reference.md, ~1,200 words)
- Complete AI-native website blueprint (AI-Native.blog, ~5,000 words) covering 7-layer architecture

## The Promise

By the end of this book, you'll be able to:

- **Identify** which patterns on your site break agents (and hurt accessibility)
- **Understand** why the simple solutions don't work at scale
- **Implement** fixes that benefit all users without rebuilding
- **Test** your changes with automated agent-simulation tests
- **Navigate** the business, legal, and ethical implications

You'll also understand:

- How session inheritance breaks traditional security
- What happens to customer relationships when agents transact
- Why some businesses benefit whilst others face existential threats
- Which emerging approaches to identity delegation show promise
- How to build websites that work for both humans and agents
- Your responsibilities as both a developer and an agent user

### Dual Responsibility

This book addresses two audiences with distinct responsibilities:

**For developers:** Fix the technical patterns you can control - clear state, persistent errors, semantic structure. These improvements benefit all users, not just AI agents.

**For users:** Not everything can be fixed with better HTML. When you instruct AI agents to interact with banking, legal services, or commercial transactions, you bear responsibility for the prompts you provide and the actions you authorise. The book explores why careful, considered use of agents is as important as agent-friendly design.

## The Window Is Small

Right now, agent traffic is tiny. Failures are isolated. The commercial pressure is just starting.

In two years:

- Agents will be mainstream user behaviour
- Your competitors will have made their sites compatible
- The patterns that break agents will be costing you real revenue
- Big Tech will have built proprietary solutions
- Standards bodies will still be debating specifications

Standards are still forming. Best practices are still contested. The businesses and developers who engage now will shape what becomes normal. In five years, agent compatibility will be as routine as mobile responsiveness. The transition period - which we're in - is when advantage is gained or lost.

You can wait. Or you can fix it now, whilst the changes are simple and the competitive advantage is real.

## The Uncomfortable Truth

Fixing your site for agents won't just help AI platforms. It won't even primarily help AI platforms.

It'll help:

- Blind users with screen readers
- Users on slow connections
- Users with cognitive disabilities
- Search engines
- Your own automation tools
- Future you, debugging production issues

The patterns that break agents are patterns we should have fixed years ago. We didn't, because the commercial pressure wasn't there. Now it is.

---

## The Book

"The Invisible Users: Designing the Web for AI Agents and Everyone Else"

- **11 chapters** covering technical, business, ethical, and human implications
- **~65,500 words** of practical, actionable guidance
- **Working code examples** you can implement tomorrow
- **10 practical design patterns** with bad/good examples showing correct HTML structure
- **Concrete examples** from websites demonstrating failures and fixes
- **Implementation checklist** for phased rollout
- **Dual responsibility framework** addressing both developers and users
- **British English** throughout, first-person narrative
- **No exaggeration** - just technical accuracy and practical implications
- **Web Audit Suite** available as separate purchase or professional audit service

Available now. Please read it before your competitors do.

### The Investment Case

Consider what this book helps you avoid:

**One lost sale from agent failure:** A tour operator loses £2,000 because an agent only saw Day 1 of their 14-day itinerary. The customer booked with a competitor whose itinerary was on a single page.

**One abandoned cart from hidden pricing:** An e-commerce site shows "from £99" but the real price is £150. The agent reports the lower price. Customer arrives expecting £99, sees £150, abandons cart. Lost revenue: £150. Lost customer trust: priceless.

**One failed form submission:** A SaaS platform uses toast notifications for errors. Agent misses them, reports success to the user. User assumes they're signed up. They're not. Support costs to fix: 30 minutes. Lost conversion: one annual contract.

**The cost of fixing one invisible failure is typically hours of developer time. The cost of NOT fixing it compounds daily across every agent-mediated interaction.**

This book identifies the patterns, explains why they break, and provides working solutions. The time saved researching, the mistakes avoided, and the competitive advantage gained make the investment trivial compared to the cost of staying in the dark whilst your competitors fix their sites first.

You can learn these lessons through months of failed conversions and support tickets. Or you can learn them from someone who's already documented the patterns.

**The market timing matters:** This knowledge is valuable now because it's scarce. You're reading this during the transition period - after the problem has emerged, before solutions have standardised. In two years, competitors will exist. In five years, agent compatibility will be as routine as mobile responsiveness, and this becomes commoditized knowledge. The window for gaining competitive advantage is limited.

The time saved researching these patterns yourself - weeks or months of experimentation and failed implementations - represents significant value.

---

## About the Author

Tom Cranstoun has worked on web technology since the early days of the commercial internet. Over three decades, he's seen the web evolve from hand-coded HTML pages to the sophisticated application platforms we rely on today.

His career spans technical implementation, strategic consulting, and the difficult work of translating between what engineers can build and what businesses need. He's worked with organisations ranging from startups to enterprises, across sectors including finance, media, and retail.

This book grew from patterns he noticed across projects: the same accessibility problems appearing in different contexts, the same design assumptions failing for unexpected user types, the same commercial pressures shaping what gets fixed and what gets ignored.

Tom writes at allabout.network and can be found on LinkedIn. He's based in the UK and works with organisations internationally.

He remains convinced that the web we've built is less accessible than it should be, and that AI agents - demanding clarity for their own reasons - might finally force us to fix it.

---

December 2025

York, England

---

Copyright © Tom Cranstoun. All rights reserved.
