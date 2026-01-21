---
title: "The Invisible Users: Designing the Web for AI Agents and Everyone Else"
author: "Tom Cranstoun"
date: "2026-01-20"
version: "1.0.0"
description: "20-minute presentation for business leaders (CTOs, product owners) on AI agent compatibility"
audience: "Business leaders, CTOs, product owners"
duration: "20 minutes + Q&A"
format: "Conversational presentation with discussion prompts"
keywords: [ai-agents, web-accessibility, invisible-users, agent-compatibility]
purpose: "Educational presentation on making websites AI agent-friendly"
---

**Speaker:** Tom Cranstoun

**Duration:** 20 minutes + Q&A

**Audience:** Business leaders (CTOs, product owners)

**Format:** Conversational presentation with discussion prompts

---

## Understanding Invisible Users [TIME: 3 minutes]

AI agents are called "invisible users" for two reasons:

1. **Invisible to site owners** — They blend into analytics, come once and leave. Unless you're specifically tracking agent traffic (and most aren't), you have no idea how many agents visit your site or whether they succeed.
2. **Interface is invisible to them** — They can't see animations, color, toasts, spinners. They don't notice subtle color changes, miss three-second toast notifications, and don't understand that a loading spinner means "wait."

Not theoretical futures - happening today.

Same failures affect screen reader users (invisible to designers for many years).

Visual feedback invisible to AI agents AND blind users.

Sites that work get preferred by both - first-mover advantage that's hard to claw back.

---

## The Agent Journey [TIME: 3 minutes]

**AI Agents Are Buying Things Right Now**

Your website has machine readers right now:

- **Stage 1: Discovery (Training)** - If you're not in their knowledge base, you don't exist
- **Stage 2: Citation (Recommendation)** - Agents recommend sources they trust
- **Stage 3: Search & Compare** - Agents build comparison lists
- **Stage 4: Price Understanding** - Exact pricing or agents skip you
- **Stage 5: Purchase Confidence** - Can they complete checkout?

**Miss any stage → No commerce.** If agents can't find you, you don't get a look in.

---

## The AI Referral Surge and The £203,000 Mistake [TIME: 4 minutes]

**Adobe Holiday 2025 Data Meets Real-World Agent Failure**

Let me show you why this matters with real data and a real failure.

**The Adobe Data (Holiday 2025):**

- **Triple-Digit Growth:** AI referrals surged (Retail +700%, Travel +500%)
- **Conversion Flip:** AI referrals moved from lagging to leading (+30%)
- **Engagement:** AI users spend 50% longer on site, view more pages

**Real Example from January 2025:**

I was using Claude for Chrome to research Danube cruises. The agent came back with detailed information on three operators - departure dates, routes, ratings, all looked professional.

But one price caught my eye: **£203,000-£402,000** per person for a week-long river cruise.

The actual price was **£2,030-£4,020**.

This was a **100x multiplication error** - likely a decimal separator confusion where €2.030,00 (European format) became 2030, then got multiplied by 100 during currency conversion.

From experimental to revenue driver - but errors have consequences.

---

## What Caused This? [TIME: 2 minutes]

**The Error Chain**

This wasn't a reasoning failure. The AI didn't think £203,000 was reasonable. The error occurred during data extraction, and no validation layers caught it:

- Decimal separator confusion (€2.030,00 vs £2,030)
- No range validation (£203k > £15k maximum)
- No comparative checks (58x higher than peers)
- No cross-referencing against structured data
- No confidence scoring
- AI reformatting the content masked the problem
- Error presented with same confidence as verified data

**The business impact:** If this agent was making a booking rather than researching, this could have been a £201,000 mistake.

**Validation layers are essential, not optional.**

---

## Who Are The Invisible Users? [TIME: 2 minutes]

**AI Agents You Can't See or Track**

- Most companies don't track AI bot traffic
- Some prohibit AI bots (robots.txt), some block them (Cloudflare Identity checks)
- Modern AI browsers DO identify as bots (ChatGPT, BrowserOps, Comet, Neo, DIA)
- BUT: User-Agent strings cannot be trusted
- Some agents are browser extensions, others are Playwright-driven automation
- Site owners can no longer reliably tell what is human, what is AI

---

## Why Current Systems Fail [TIME: 2 minutes]

**The Markup Problem**

- Modern CMS creates divs without semantic meaning
- Content served as plain HTML - JavaScript decorates it later
- LLM Optimizer forks bot vs human experiences (WRONG approach)
- Bots see different pages than browser-based agents see
- Solution: Fix HTML for everyone together, not separate bot experiences
- We are many years behind the times - should have fixed this for accessibility

**Two real production mistakes...**

### Five Integration Patterns

The specific patterns that need optimization for AI agents:

### Mistake #1: Toast Notifications

**The Pattern That Keeps Returning:**

Team removed toast notifications from forms (good!) but they kept getting reintroduced in new features. Shopping cart still used `showToast('Item added!')`.

**Why this matters:**

- Toast notifications vanish before agents can read them
- Form submission appears to fail silently
- Agents abandon the flow

**Solution:** Persistent alerts that stay visible.

### Mistake #2: Hidden Checkout State

**State Invisible to Agents:**

```javascript
// JavaScript-only state
let currentStep = 1;

function nextStep() {
  currentStep++;
  updateUI();
}
```

**What happened:**

- No URL reflection
- No DOM attributes
- Agents can't track progress
- Refreshing loses state

**Solution:** data-state attributes in DOM.

**The commercial reality:** Sites that work well for agents are remembered and preferred. Sites that don't are quietly avoided. Checkout completion rates dropped for agent-assisted purchases. Sites with explicit state attributes in the DOM got the bookings instead.

---

## Why This Happens [TIME: 3 minutes]

**The convergence principle:** What machines need is exactly what screen reader users need.

These patterns have broken accessibility since the early 2000s. We've known the solutions since 1999 (semantic HTML, clear structure, explicit state). AI agents encounter identical barriers:

- Visual feedback is invisible to AI agents AND blind users
- Toast notifications vanish before screen readers AND agents can process them
- JavaScript-only state is inaccessible to CLI agents AND some assistive technology
- Missing semantic structure makes navigation impossible for both

**This isn't new. Commercial pressure from AI commerce adds urgency to long-standing accessibility obligations.**

Modern web design is optimised for visual feedback that humans interpret through a browser:

- Single-page applications
- Client-side state management
- Toast notifications and modals
- Loading spinners without context
- JavaScript-dependent navigation

These patterns break AI agents AND screen readers - same problems, same solutions.

### Two HTML States: The Gap

**Critical Distinction:**

1. **Served HTML** (static)
   - What server sends before JavaScript
   - Most agents see only this

2. **Rendered HTML** (dynamic)
   - After JavaScript execution
   - Only browser-based agents see this

**Example:**

```html
<!-- Served HTML: Empty -->
<div id='products'></div>

<!-- Rendered HTML: Populated after JavaScript -->
<script>
  fetch('/api/products').then(data => {
    renderProducts(data);
  });
</script>
```

To most agents, your product catalogue is invisible.

---

## Solution: Make Implicit State Explicit [TIME: 6 minutes]

The good news: fixing this doesn't require rebuilding your interfaces or creating special agent-only experiences. It requires making implicit state explicit.

Small, well-understood changes that improve accessibility for everyone.

**Three concrete patterns with code and business value.**

### Pattern #1: Persistent Errors

Instead of vanishing toast notifications:

```html
<form data-state='incomplete'>
  <div role='alert' aria-live='assertive'>
    Please complete required fields
  </div>
</form>
```

**How this helps multiple audiences:**

- **Screen readers:** Announce `role='alert'` immediately, stay in document for review
- **AI agents:** Persistent state in DOM allows validation of submission success
- **Keyboard users:** Can navigate to error without mouse
- **Everyone:** Clear, explicit feedback reduces confusion

Use `aria-invalid` and `aria-describedby` attributes.

**Business value:** Conversion rates improve for everyone.

### Pattern #2: Complete Pricing

Instead of "From £99":

```html
<div itemscope itemtype="https://schema.org/Offer">
  <meta itemprop="price" content="2030.00">
  <meta itemprop="priceCurrency" content="GBP">
  <details>
    <summary>Price breakdown</summary>
    Base fare: £1,800
    Port fees: £180
    Service charge: £50
  </details>
</div>
```

**How this helps multiple audiences:**

- **Voice assistants:** Read structured data (used by blind users for shopping)
- **AI agents:** Parse exact pricing without ambiguity
- **Humans:** `<details>` element provides expandable breakdown (keyboard accessible)
- **Price comparison tools:** Structured data enables accurate comparison

**Business value:** No hidden fees. Builds trust. Reduces cart abandonment for all users.

### Pattern #3: Explicit State

Make cart state visible:

```html
<div class="cart"
     data-state="active"
     data-item-count="3"
     data-total="156.50">
  <div role="status" aria-live="polite">
    3 items in cart, total £156.50
  </div>
</div>
```

**How this helps multiple audiences:**

- **Screen readers:** `role='status'` announces updates when cart changes
- **AI agents:** Data attributes provide explicit state without parsing UI
- **Developers:** Debugging easier with visible state in DOM
- **Automated testing:** Reliable integration tests without fragile selectors

**Business value:** State persists across sessions. Debugging easier. Works for everyone.

### The Small Business Case

You don't need complex infrastructure.

Simple restaurant site:

- Semantic HTML (`<nav>`, `<main>`, `<article>`)
- Schema.org markup (Restaurant, Menu, MenuItem)
- Minimal effort
- Completely agent-friendly

Quick wins, not expensive rebuilds.

---

## Taking Action [TIME: 3 minutes]

### Quick Wins: Start Here

**Critical Priority 1 Changes:**

- Add persistent error messages
- Display complete pricing (no hidden fees)
- Ensure served HTML contains core content
- Add basic Schema.org structured data

These changes benefit everyone immediately.

Start with highest impact, lowest effort.

### Web Audit Suite

Available as separate purchase or professional audit service.

- Implements patterns from the book
- Generates detailed reports
- Shows exactly where sites need optimization for agents
- Provides specific fix recommendations

Not included with book - separate offering.

**Measure what you can't see.**

### Call to Action

Start with one pattern:

1. Pick highest-impact, lowest-effort change
2. Implement it
3. Measure the improvement
4. Tackle the next one

Sites that adapt early gain advantage. Sites that don't get quietly bypassed.

**Questions? Let's discuss your specific challenges.**

---

## Major Developments [TIME: 3 minutes]

### The Seven-Day Platform Race (January 2026)

**Three major platforms in one week:**

- **Jan 5: Amazon Alexa+** (browser agent launch)
  - Reported 2x conversations, 3x purchases vs legacy Alexa
  - Partnerships: Expedia, Yelp, Uber, OpenTable, Square
- **Jan 8: Microsoft expands Copilot Checkout**
  - Shopify auto-enrollment (opt-out window provided)
  - Retail AI agents for operations, product management
- **Jan 11: Google Universal Commerce Protocol (UCP)**
  - 20+ retailers: Target, Walmart, Macy's, Best Buy, Home Depot
  - Open protocol competing with OpenAI/Stripe ACP
  - Timeline compressed: 12 months → 6-9 months

**The competitive landscape:**

Two platforms chose **open standards** (Google UCP, OpenAI/Stripe ACP). One chose **proprietary** (Microsoft Copilot).

Microsoft is now competing against TWO open protocols. Retailers and developers typically prefer open standards for interoperability and avoiding lock-in.

**Author perspective:** I hope open wins for ecosystem health. Proprietary approaches create dependency and limit innovation.

### VPNs and Hidden Guardrails

**Two realities affecting every agent:**

1. **Browser extensions inherit network configuration:**
    - User in Manchester appears in Amsterdam (VPN exit)
    - IP-based location detection becomes unreliable
    - Fraud systems may flag legitimate transactions
    - Affects all privacy-conscious users

2. **System prompts exist but are insufficient:**
    - All agents have hidden guardrails
    - They work at reasoning level, not data extraction
    - The £203k cruise error happened *despite* guardrails
    - Need programmatic validation: range checks, cross-referencing
    - Hallucinations will continue - validation catches them

### Why This Matters Now

**Timeline acceleration is dramatic:**

- **Dec 2024:** Claude for Chrome (browser automation)
- **Jan 2025:** ACP launches (1M+ merchants)
- **Jan 5-11, 2026:** Three platforms in seven days

**Key implications:**

- Amazon, Microsoft, Google all live simultaneously
- Timeline compressed from 12 months → 6-9 months
- Two open protocols (ACP + UCP) create urgency
- Non-optimised sites excluded from agent traffic

**Agent commerce isn't experimental. It's infrastructure.**

Test your site with Claude for Chrome immediately. Implement Priority 1-2 patterns urgently.

### Our Responsibility

**Clear professional obligation:**

As designers, developers, product owners, and executives:

- We have the responsibility to ensure agents navigate successfully
- This isn't optional - it's a professional obligation
- Parallels accessibility, security, user experience
- When agents encounter integration gaps, these affect everyone

**When agents encounter integration gaps, these often reveal issues that affect humans too.** We're finally fixing issues we should have fixed years ago.

---

## Open vs Closed Competition [TIME: 2 minutes]

**The strategic divide:**

- **Open:** OpenAI/Stripe (ACP, Sept 2024, 1M+ Shopify/Etsy merchants), Google (UCP, Jan 2026, 20+ major retailers)
- **Closed:** Microsoft (Copilot Checkout, proprietary integration)

**Microsoft's isolation:** Only major platform choosing proprietary. Enterprise leverage (Windows/Office) may not overcome consumer and SMB preference for portability.

**Fragmentation danger:** Two open protocols (ACP vs UCP) create integration burden. Both claim compatibility with A2A, AP2, MCP, but technical convergence unknown. Best outcome: ACP/UCP merge into unified standard.

**Identity delegation gap:** No platform offers portable identity yet. Consideration of open-source framework, but waiting to see if platforms solve this

**Unlike the book and Web Audit Suite** (which are professional offerings), **this would be open-source community infrastructure** - not a commercial product. It's infrastructure the ecosystem needs. If platforms won't build interoperability, perhaps an open community effort can.

**The challenge:** This requires collaboration across competing interests - building a coalition of agent creators, businesses, and users who recognise that interoperability serves everyone better than fragmentation.

**Future direction:** Identity delegation is an evolving area where multiple approaches are emerging. The book discusses these patterns conceptually without prescribing specific implementations, acknowledging that the market is still finding optimal solutions.

---

## Key Takeaways [TIME: Closing]

**Five Essential Messages:**

1. This is happening now (not speculative)
2. Commercial pressure exists (preference = advantage)
3. Solutions are accessible (small changes, big impact)
4. Universal benefit (humans and machines)
5. Start with quick wins (measure and iterate)

---

## Book & Contact

**The Invisible Users:** Designing the Web for AI Agents and Everyone Else

Due Q1 2026

Tom Cranstoun

<tom.cranstoun@gmail.com>

<https://allabout.network>

**Project Pages:**

- Book website: <https://allabout.network/invisible-users>
- Project news: <https://allabout.network/invisible-users/news.html>

**Questions? Discussion? Your challenges?**

---

## Speaker Notes

**Key messages to emphasise:**

1. **This is happening now** - not speculative futures
2. **Commercial pressure exists** - sites that work get preferred
3. **Solutions are accessible** - small changes, big impact
4. **Universal benefit** - helps humans and machines alike
5. **Priority-based action** - start with quick wins

**Adjust timing based on:**

- Group engagement level
- Questions during presentation
- Technical depth desired
- Specific industry concerns

**Be prepared to discuss:**

- Security implications (session inheritance problem)
- Legal landscape (web scraping, copyright)
- Content creator concerns (advertising model impact)
- Agency/consultancy opportunities
- Identity layer project (collaboration opportunities, technical challenges, regulatory outlook)
