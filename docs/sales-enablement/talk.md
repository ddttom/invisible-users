# The Invisible Users: Designing the Web for AI Agents and Everyone Else

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

## The Problem: Invisible Failures [TIME: 5 minutes]

Websites fail quietly for AI agents. Not theoretical futures - this is happening today. Agents are browsing, comparing, and transacting now.

Sites that work get preferred. Sites that don't get quietly avoided.

This creates a first-mover advantage that's hard to claw back.

**Two real production mistakes...**

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

These patterns break agents and screen readers. AI agents face the same barriers humans with disabilities have encountered for years.

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

## The Solution: Make Implicit State Explicit [TIME: 6 minutes]

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

  <details>
    <summary>See breakdown</summary>
    Product: £99 | Delivery: £15 | Fee: £5
  </details>
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
- Shows exactly where sites break for agents
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

**Tom Cranstoun**

<tom.cranstoun@gmail.com>

<https://allabout.network>

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
