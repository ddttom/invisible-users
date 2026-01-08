# The Invisible Users: Designing the Web for AI Agents and Everyone Else

**Speaker:** Tom Cranstoun

**Duration:** 20 minutes + Q&A

**Audience:** Business leaders (CTOs, product owners)

**Format:** Conversational presentation with discussion prompts

---

## Opening Hook: The £203,000 Cruise [TIME: 3 minutes]

Let me start with a real example from December 2024. I was using an AI assistant to research Danube cruises for May 2026. The agent came back with detailed information on three operators - departure dates, routes, ratings, all looked professional.

But one price caught my eye: **£203,000-£402,000** per person for a week-long river cruise.

> **Discussion prompt:** Has anyone here seen AI agents make obvious errors like this? What was your reaction?

**[EXAMPLE: The Error Chain]**

This wasn't a reasoning failure. The AI didn't think £203,000 was reasonable. The error occurred during data extraction - likely a decimal separator confusion where €2.030,00 (European format) became 2030, then got multiplied by 100 during currency conversion.

The actual price was probably **£2,030-£4,020**.

**What's instructive here:** No validation layers caught this. The agent had:
- No range validation (£203k > £15k maximum for river cruises)
- No comparative checks (58x higher than peer average)
- No cross-referencing against structured data
- No confidence scoring to flag anomalies

The error was presented with the same confidence as verified data. Professional formatting masked the data quality issue.

**The business impact:** If this agent was making a booking rather than researching, this could have been a £201,000 mistake. More concerning - if the error had been plausible (20% too high instead of 100x), would anyone have caught it?

---

## The Problem: Invisible Failures [TIME: 5 minutes]

Websites can look polished and conversion-friendly, yet fail quietly for AI agents. Not just theoretical future agents - agents that are browsing, comparing, and transacting today.

**[EXAMPLE: Three Real Production Mistakes]**

### 1. Progressive Enhancement That Broke the Baseline

```javascript
// Server renders initial price
<div id="price">£149.99</div>

// JavaScript "enhancement" breaks it
<script>
  document.getElementById('price').innerHTML = 'Loading...';
  fetch('/api/price').then(r => r.json()).then(data => {
    document.getElementById('price').innerHTML = `£${data.price}`;
  });
</script>
```

**What happened:** Agents saw "Loading..." because JavaScript replaced server-rendered content before fetching completed. The enhancement destroyed the baseline.

**Business impact:** Product appeared unpurchasable. Agents moved to competitors.

### 2. Toast Notifications That Kept Returning

Team removed toast notifications from forms (good!) but they kept getting reintroduced in new features. Shopping cart still used `showToast('Item added!')`.

**Why this matters:** Toast notifications vanish before agents can read them. Form submission appears to fail silently. Agents abandon the flow.

### 3. Hidden Checkout State

```javascript
// Step tracked only in JavaScript
let currentStep = 1;

function nextStep() {
  currentStep++;
  updateUI();
}
```

**What happened:** Checkout progress invisible in URL and DOM. Agents couldn't tell which step they were on. Refreshing the page lost all progress.

**Business impact:** Checkout completion rates dropped for agent-assisted purchases. Sites with explicit state attributes in the DOM got the bookings instead.

> **Discussion prompt:** Have you noticed patterns in your analytics that might indicate agent failures? Unusually high abandonment rates at specific steps?

**The commercial reality:** Sites that work well for agents are remembered and preferred. Sites that don't are quietly avoided. This creates a first-mover advantage that's difficult to claw back later.

---

## Why This Happens [TIME: 4 minutes]

Modern web design is optimised for visual feedback that humans interpret through a browser. AI agents operate differently.

**[KEY CONCEPT: Served vs Rendered HTML]**

There are two fundamentally different HTML states:

1. **Served HTML** (static) - What server sends before JavaScript executes
   - CLI agents see only this
   - Server-based agents see only this
   - Most agents operate in this mode

2. **Rendered HTML** (dynamic) - After JavaScript execution
   - Browser-based agents can see this
   - Requires full browser automation
   - More resource-intensive for agents

**Example of the gap:**

```html
<!-- Served HTML: Empty container -->
<div id="products"></div>

<!-- Rendered HTML: Content appears after JavaScript -->
<script>
  fetch('/api/products').then(r => r.json()).then(data => {
    document.getElementById('products').innerHTML = renderProducts(data);
  });
</script>
```

To most agents, your product catalogue is invisible.

**The architectural conflict:** We've spent years optimising for:
- Single-page applications with client-side state
- Toast notifications and modal dialogs
- Loading spinners without context
- Visual-only feedback (colour changes, animations)
- JavaScript-dependent navigation

These patterns break agents - and they've been breaking screen readers and accessibility tools for years. **This isn't new.** AI agents are encountering the same barriers that humans with disabilities have faced.

The difference? There's now commercial pressure to fix it.

---

## The Solution: Make Implicit State Explicit [TIME: 6 minutes]

The good news: fixing this doesn't require rebuilding your interfaces or creating special agent-only experiences. It requires making implicit state explicit.

**[CODE SAMPLE: Persistent Error Messages]**

Instead of toast notifications:

```html
<form id="signup-form" data-state="incomplete">
  <!-- Error summary that persists -->
  <div id="error-summary" role="alert" class="errors" style="display: none;">
    <h3>Please fix the following errors:</h3>
    <ul id="error-list"></ul>
  </div>

  <div class="form-group">
    <label for="email">Email address</label>
    <input
      type="email"
      id="email"
      name="email"
      aria-describedby="email-error"
      aria-invalid="false">
    <div id="email-error" class="field-error" style="display: none;"></div>
  </div>
</form>
```

**Business value:**
- Errors persist until fixed (no more vanishing feedback)
- Screen readers can announce them
- Agents can read and act on them
- Users with cognitive disabilities have time to process
- Conversion rates improve for everyone

**[CODE SAMPLE: Complete Pricing Display]**

Instead of "From £99":

```html
<div class="product-price" itemscope itemtype="https://schema.org/Offer">
  <meta itemprop="priceCurrency" content="GBP">
  <meta itemprop="price" content="119.00">

  <div class="price-total">
    Total: <span class="amount">£119.00</span>
    <span class="tax-status">(inc. VAT)</span>
  </div>

  <details class="price-breakdown">
    <summary>See breakdown</summary>
    <table>
      <tr><td>Product price:</td><td>£99.00</td></tr>
      <tr><td>Delivery:</td><td>£15.00</td></tr>
      <tr><td>Service fee:</td><td>£5.00</td></tr>
      <tr class="total"><td>Total (inc. VAT):</td><td>£119.00</td></tr>
    </table>
  </details>
</div>
```

**Business value:**
- No hidden fees that break trust
- Agents can extract accurate pricing
- Price comparison sites get correct data
- Reduces support queries about unexpected charges
- Improves conversion by being transparent

**[CODE SAMPLE: Explicit State Attributes]**

Make checkout state visible:

```html
<div id="shopping-cart"
     data-state="active"
     data-item-count="3"
     data-subtotal="247.97"
     data-currency="GBP">

  <div class="cart-summary" role="status">
    <p>Items: <span id="item-count">3</span></p>
    <p>Subtotal: £<span id="subtotal">247.97</span></p>
  </div>
</div>
```

**Business value:**
- Cart state visible in DOM, not just JavaScript
- Agents can verify cart contents before checkout
- State persists through page refreshes
- Debugging becomes easier for your own developers
- Integration testing more reliable

> **Discussion prompt:** Which of these patterns would have the biggest immediate impact on your site?

**The small business case:**

You don't need complex infrastructure. A simple restaurant site with semantic HTML and Schema.org markup can be completely agent-friendly with minimal effort. We're talking about Priority 1 quick wins, not expensive rebuilds.

---

## Taking Action [TIME: 2 minutes]

**Priority-based approach** (not time-based):

**Priority 1: Critical Quick Wins**
- Add persistent error messages
- Display complete pricing (no hidden fees)
- Ensure served HTML contains core content
- Add basic Schema.org structured data

**Priority 2: Essential Improvements**
- Explicit state attributes (data-state, data-validation-state)
- Create or improve robots.txt
- Add llms.txt file (structured guidance for agents)
- Fix progressive enhancement gaps

**Priority 3: Core Infrastructure**
- Review and fix all forms systematically
- Implement comprehensive structured data
- Add agent-specific communication patterns

**Web Audit Suite:**

Available as a separate purchase or professional audit service (not included with the book). It implements these patterns and generates detailed reports showing exactly where your site breaks for agents and how to fix it.

> **Discussion prompt:** What would you want to measure first on your own site?

**Call to action:**

Start with one pattern. Pick the highest-impact, lowest-effort change for your business. Implement it. Measure the improvement. Then tackle the next one.

The sites that adapt early gain advantage. The sites that don't get quietly bypassed.

---

## Q&A and Discussion [TIME: Remaining time]

Key themes to explore:
- What patterns have you already encountered?
- Where do you see the biggest risk in your business?
- What's stopping you from making these changes?
- How do you measure agent-friendliness today?

**Book availability:** "The Invisible Users: Designing the Web for AI Agents and Everyone Else" - Due Q1 2026

**Contact:** <tom.cranstoun@gmail.com> | <https://allabout.network>

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
