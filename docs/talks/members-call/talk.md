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

## Opening Hook: The £203,000 Cruise [TIME: 3 minutes]

Let me start with a real example from December 2024. I was using an AI assistant to research Danube cruises for May 2026. The agent came back with detailed information on three operators - departure dates, routes, ratings, all looked professional.

But one price caught my eye: **£203,000-£402,000** per person for a week-long river cruise.

The actual price was probably **£2,030-£4,020**.

This was a **100x multiplication error** - likely a decimal separator confusion where €2.030,00 (European format) became 2030, then got multiplied by 100 during currency conversion.

**What's instructive here:** This wasn't a reasoning failure. The AI didn't think £203,000 was reasonable. The error occurred during data extraction, and no validation layers caught it:

- No range validation (£203k > £15k maximum for river cruises)
- No comparative checks (58x higher than peer average)
- No cross-referencing against structured data
- No confidence scoring to flag anomalies

The error was presented with the same confidence as verified data. Professional formatting masked the data quality issue.

**The business impact:** If this agent was making a booking rather than researching, this could have been a £201,000 mistake. More concerning - if the error had been plausible (20% too high instead of 100x), would anyone have caught it?

**Validation layers are essential, not optional.**

---

## Understanding Invisible Users [TIME: 5 minutes]

Websites need optimization for AI agents. Not theoretical futures - this is happening today. Agents are browsing, comparing, and transacting now.

Sites that work get preferred. Sites that don't get quietly avoided.

This creates a first-mover advantage that's hard to claw back.

**Two real production mistakes...**

### Understanding Invisible Failures

**What Makes Users "Invisible"?**

AI agents are called "invisible users" for two reasons:

1. **They're invisible to site owners** — Unless you're specifically tracking agent traffic (and most aren't), you have no idea how many agents visit your site or whether they succeed. They blend into analytics as slightly unusual sessions.
2. **Your interface is partly invisible to them** — They can't see your beautiful animations, don't notice subtle color changes, miss three-second toast notifications, and don't understand that a loading spinner means "wait."

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

Modern web design is optimised for visual feedback that humans interpret through a browser. AI agents operate differently.

**The architectural conflict:** We've spent years optimising for:

- Single-page applications
- Client-side state management
- Toast notifications and modals
- Loading spinners without context
- JavaScript-dependent navigation

These patterns need optimization for agents and screen readers. AI agents encounter the same barriers as humans with accessibility needs.

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
  <div id='error-summary' role='alert'>
    <h3>Please fix the following:</h3>
    <ul id='error-list'></ul>
  </div>

  <input aria-invalid='false'
         aria-describedby='email-error'>
  <div id='email-error'></div>
</form>
```

**Business value:** Conversion rates improve for everyone.

- Errors persist until fixed (no vanishing)
- Screen readers can announce them
- Agents can read and act on them
- Users with cognitive disabilities have time to process

### Pattern #2: Complete Pricing

Instead of 'From £99':

```html
<div itemscope itemtype='schema.org/Offer'>
  <meta itemprop='price' content='119.00'>
  <meta itemprop='priceCurrency' content='GBP'>

  Total: £119.00 (inc. VAT)

  &lt;details&gt;
    &lt;summary&gt;See breakdown&lt;/summary&gt;
    Product: £99 | Delivery: £15 | Fee: £5
  &lt;/details&gt;
</div>
```

**Business value:** No hidden fees. Agent-readable. Builds trust.

- No hidden fees that break trust
- Agents extract accurate pricing
- Price comparison sites get correct data
- Reduces support queries about charges
- Improves conversion through transparency

### Pattern #3: Explicit State

Make cart state visible:

```html
<div id='shopping-cart'
     data-state='active'
     data-item-count='3'
     data-subtotal='247.97'
     data-currency='GBP'>

  <div role='status'>
    Items: <span>3</span>
    Subtotal: £<span>247.97</span>
  </div>
</div>
```

**Business value:** State persists. Debugging easier. Integration testing more reliable.

- Cart state visible in DOM, not just JavaScript
- Agents verify cart contents before checkout
- State persists through page refreshes
- Debugging easier for your own developers

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

## What Comes Next: Protocol Convergence [TIME: 2 minutes]

**Two open protocols launched simultaneously:**

1. **Agentic Commerce Protocol (ACP):** OpenAI/Stripe (Sept 2024), 1M+ merchants.
2. **Universal Commerce Protocol (UCP):** Google (Jan 2026), 20+ major retailers.

**Critical question:** Will they converge or fragment?

Beyond fixing websites and building validation layers, there's a critical infrastructure gap in the AI agent ecosystem.

**The Missing Piece:**

Every major platform is building proprietary identity delegation systems:

- Microsoft Copilot Checkout uses Microsoft's own identity layer
- Claude for Chrome inherits browser sessions through Anthropic
- Google and Apple are building their own walled gardens

**The problem:** Users face lock-in. Agent creators face fragmentation. Businesses face complexity.

**The Next Project:**

I'm considering building an open-source universal identity delegation framework that provides:

- Portable authorisation tokens that work across platforms and agents
- User-controlled permissions and auditable delegation trails
- OAuth 2.0 delegation extension support
- Abstraction layers for agent creators
- Community infrastructure before proprietary lock-in becomes entrenched

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
