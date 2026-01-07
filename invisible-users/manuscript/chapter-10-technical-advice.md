\newpage

# Chapter 10 - Technical Advice

Implementation code, testing strategies, and practical tools.

## Introduction

I've spent nine chapters explaining what's broken and why it matters. Now let me show you how to fix it.

This chapter provides code you can use tomorrow. Not theoretical patterns or abstract principles - practical implementations you can copy into your projects. I'll start with the simplest improvements and build towards more complex solutions, including the identity delegation system that solves the customer relationship problem we identified in Chapter 4.

**A note on code complexity:** The examples in this chapter are simplified for clarity and learning. They demonstrate the core concepts without the complete hardening you'll need for comprehensive implementations.

**A note on standards:** This chapter presents both deployed patterns (currently working in production) and proposed extensions (logical extrapolations of existing conventions).

When you see:

- **llms.txt, robots.txt, Schema.org** - these are real, use them today
- **ai-\* meta tags** - these are proposed patterns that may become standards
- **data-agent-visible** - this is an experimental pattern, not yet widely adopted

All patterns shown are designed to be forward-compatible - they won't break anything if agents don't recognise them. Think of them as progressive enhancement for AI. The speculative elements follow existing conventions (like the robots meta tag or viewport meta tag) and represent logical extensions that may standardise as the ecosystem matures.

**A note on agent architecture diversity:** The implementations below work across different agent types because they follow a fundamental principle: rely on what's visible in the HTML DOM, not what requires specific execution environments. Server-based agents (ChatGPT, Claude) fetch and parse HTML remotely. CLI agents (Claude Code, Cline) access web content without browser sessions. Browser agents (Playwright, Selenium) can execute JavaScript but benefit from explicit state regardless. Browser extension assistants (ChatGPT sidebar, Claude extension) run in your authenticated browser and inherit your sessions. The patterns here serve all of them because they make state explicit, structure semantic, and feedback persistent - universally parseable properties that don't depend on JavaScript execution, session inheritance, or specific agent capabilities.

![Technical Advice - practical implementation patterns and code examples](illustrations/chapter-10-technical-advice.png)

## Critical Distinction: Served vs Rendered HTML

Before implementing any patterns, you must understand the single most important concept in AI agent compatibility: **the two states of HTML**.

### Two HTML States

AI agents operate in two fundamentally different modes that most developers don't consider:

#### Served HTML (Static State)

What it is: The HTML document as sent from the server before JavaScript execution

Who sees it: CLI agents (Claude Code, Cline), server-based agents (ChatGPT, Claude API), web scrapers

Characteristics:

- No JavaScript execution
- No dynamic updates
- No client-side state changes
- Exactly what `curl` or `wget` retrieves

#### Rendered HTML (Dynamic State)

What it is: The HTML document after JavaScript execution and all dynamic updates

Who sees it: Browser-based agents (Playwright, Selenium), browser extension assistants

Characteristics:

- Full JavaScript execution
- Dynamic content loaded
- State changes applied
- What humans see in DevTools

### The Compatibility Problem

**Example:** A product page with client-side price loading:

```html
<!-- Served HTML (what most agents see) -->
<div id="product-price">Loading...</div>
<script>
  fetch('/api/price').then(r => r.json()).then(data => {
    document.getElementById('product-price').textContent = data.price;
  });
</script>
```

CLI agents, API agents, and server-based agents see: "Loading..." (useless)

Browser agents with JavaScript see: "£149.99" (correct)

**This means:**

- SPA (Single Page Application) sites are largely invisible to most agents
- Client-side rendering breaks agent access
- JavaScript-dependent features fail
- Progressive enhancement is critical

### The Solution: Server-Side Truth

Serve HTML that works without JavaScript, then enhance with JavaScript:

```html
<!-- Works for ALL agents (served HTML contains the data) -->
<div id="product-price" data-price="149.99">
  £149.99
</div>

<!-- Enhances for browsers (rendered HTML gets real-time updates) -->
<script>
  fetch('/api/price').then(r => r.json()).then(data => {
    const el = document.getElementById('product-price');
    el.textContent = data.price;
    el.dataset.price = data.price;
  });
</script>
```

Now served-only agents see "£149.99" in the initial HTML, and browser agents get real-time updates.

### Agent Type Distribution

Understanding which agents access which HTML state helps you prioritize:

**Served HTML Access (Majority):**

- CLI agents (Claude Code, Cline, cursor)
- Server-based agents (ChatGPT, Claude API, Perplexity)
- Web scrapers and crawlers
- Search engine bots

**Rendered HTML Access (Smaller segment):**

- Browser automation (Playwright, Selenium, Puppeteer)
- Browser extension assistants (ChatGPT sidebar, Claude extension)

**Implication:** Optimizing served HTML provides complete coverage. Optimizing only rendered HTML excludes the majority of agents.

### Testing Both States

**Test served HTML (what most agents see):**

```bash
# Fetch as an agent without JavaScript
curl https://example.com/product/123

# Check if price is visible in source
curl https://example.com/product/123 | grep -i "price"
```

**Test rendered HTML (browser agents):**

```javascript
const { test, expect } = require('@playwright/test');

test('price visible in both states', async ({ page }) => {
  // Disable JavaScript - test served HTML
  await page.setJavaScriptEnabled(false);
  await page.goto('/product/123');

  const servedPrice = await page.textContent('#product-price');
  expect(servedPrice).toContain('£149.99');

  // Enable JavaScript - test rendered HTML
  await page.setJavaScriptEnabled(true);
  await page.reload();

  const renderedPrice = await page.textContent('#product-price');
  expect(renderedPrice).toContain('£149.99');
});
```

### Business Impact

**Sites with high served HTML scores:**

- Work for ALL agent types
- Accessible to CLI tools
- Compatible with API-based agents
- Future-proof as new agent types emerge

**Sites with low served HTML scores (JavaScript-dependent):**

- Work for only browser-based agents (smaller segment)
- Invisible to CLI and API agents
- Require expensive browser automation
- Fragile as JavaScript patterns change

**This is the foundational concept:** Everything in this chapter builds on ensuring your served HTML contains complete, actionable information. If your served HTML is empty or incomplete, no other optimization matters.

## Measuring Your Progress: Web Audit Suite

Before implementing patterns, you need a way to measure your starting point and track improvements. Web Audit Suite (<https://github.com/ddttom/invisible-users/tree/main/web-audit-suite>) provides automated analysis of AI agent compatibility.

### What It Measures

Web Audit Suite generates comprehensive reports covering:

**Core Reports (15):**

- SEO analysis: seo_report.csv, seo_scores.csv
- Performance: performance_analysis.csv
- Accessibility: accessibility_report.csv, wcag_report.md
- Content: content_quality.csv, image_optimization.csv, link_analysis.csv
- Security: security_report.csv
- LLM compatibility: llm_general_suitability.csv, llm_frontend_suitability.csv, llm_backend_suitability.csv
- AI files: robots_txt_quality.csv, llms_txt_quality.csv, ai_files_summary.md

**Enhanced Reports (3):**

- executive_summary.md, executive_summary.json (with --generate-executive-summary)
- dashboard.html (with --generate-dashboard)

### Quick Start

```bash
# Install
git clone https://github.com/ddttom/invisible-users.git
cd invisible-users/web-audit-suite
npm install

# Audit your homepage
npm start -- -s https://example.com -c 10

# Full site audit from sitemap
npm start -- -s https://example.com/sitemap.xml -c -1

# With all reports
npm start -- -s https://example.com \
  --enable-history \
  --generate-dashboard \
  --generate-executive-summary
```

### Understanding Your Scores

**LLM General Suitability Report** shows your overall AI agent compatibility:

- **served_score**: Works for ALL agent types (weighted higher)
- **rendered_score**: Works for browser agents (weighted lower)
- **overall_score**: Weighted average emphasizing served HTML

**Interpreting scores:**

- Low scores: Critical issues, agents will fail frequently
- Moderate-low scores: Basic functionality, many problems remain
- Moderate-high scores: Good implementation, minor improvements needed
- High scores: Excellent, professional-grade AI readiness

**robots.txt Quality Report** evaluates your robots.txt file:

- Overall quality score out of 100
- AI user agent declarations
- Sitemap presence
- Sensitive path protection
- llms.txt references

Use these scores to prioritize improvements. The remainder of this chapter explains how to fix what the audit identifies.

## Starting Simple

The quickest improvement costs nothing and requires no code. Review your site with these questions:

**Do your error messages persist?** If they appear in toasts that vanish, move them to permanent locations. A `<div>` at the top of your form that stays visible until the user fixes the problem.

**Is your pricing complete?** If you show "From £99" but the actual price is £149, you're setting yourself up for failure. Show the full price upfront, with a breakdown if needed.

**Can someone see your full catalogue without pagination?** If you're splitting product listings across 20 pages when they could fit on one scrollable page, you're making everyone work harder than necessary.

These aren't technical challenges. They're choices. Make different ones.

### Pattern Comparison: Before and After

Here's how common patterns compare when designed for agents versus humans-only:

| Category | Problematic Pattern | Why It Fails | Better Approach | Benefits |
| -------- | ------------------- | ------------ | --------------- | -------- |
| **Feedback** | Toast notification (3 seconds) | Missed by agents, elderly users, distracted users | Persistent message in DOM until acknowledged | Visible to all users, remains until resolved, clear state change |
| **Navigation** | Pagination (10 items per page) | Content hidden, requires multiple clicks, breaks screen readers | Single scrollable page or 'Show All' option | All content accessible, find-in-page works, no artificial fragmentation |
| **State** | JavaScript updates without URL change | Can't bookmark state, browser history breaks, agents confused | URL reflects current state (`?page=checkout&step=payment`) | Bookmarkable, shareable, clear state tracking for all |
| **Validation** | Error appears only on submit | Agent submits repeatedly, users frustrated by sequential reveals | Inline validation with clear requirements upfront | Immediate feedback, all errors visible, reduces failed submissions |
| **Pricing** | "From £99" with hidden fees | Agent compares wrong prices, users experience price surprise | Total price displayed prominently with breakdown | Accurate comparisons, transparent costs, builds trust |
| **Loading** | Spinner with no context | Agent doesn't know how long to wait or if stuck | `data-state="loading"` with expected duration | Clear progress indication, timeout handling, accessible status |

**Key insight:** Every "agent-friendly" pattern in the right column also improves human experience. You're not optimising for machines at the expense of humans - you're fixing patterns that broke for everyone.

## Detection - Knowing Your Audience

Before you can serve agents well, you need to know when you're dealing with one. Here's a simple client-side detector:

```javascript
class AgentDetector {
  constructor() {
    this.signals = {
      timing: 0,
      interaction: 0,
      technical: 0
    };
  }
  
  checkFormSpeed() {
    const form = document.querySelector('form');
    if (!form) return;
    
    const fieldTimes = [];
    
    form.querySelectorAll('input').forEach(input => {
      input.addEventListener('focus', () => {
        input.dataset.focusTime = Date.now();
      });
      
      input.addEventListener('blur', () => {
        const duration = Date.now() - input.dataset.focusTime;
        fieldTimes.push(duration);
        
        if (duration < 100) this.signals.timing++;
      });
    });
  }
  
  checkMouseBehavior() {
    let mouseMoves = 0;
    let clicks = 0;
    
    document.addEventListener('mousemove', () => mouseMoves++);
    document.addEventListener('click', () => clicks++);
    
    setTimeout(() => {
      if (clicks > 0 && mouseMoves < 10) {
        this.signals.interaction++;
      }
    }, 5000);
  }
  
  checkTechnicalMarkers() {
    if (navigator.webdriver) {
      this.signals.technical++;
    }
    
    if (!window.chrome && navigator.userAgent.includes('Chrome')) {
      this.signals.technical++;
    }
  }
  
  isLikelyAgent() {
    const total = this.signals.timing + 
                  this.signals.interaction + 
                  this.signals.technical;
    return total >= 3;
  }
}

const detector = new AgentDetector();
detector.checkFormSpeed();
detector.checkMouseBehavior();
detector.checkTechnicalMarkers();

setTimeout(() => {
  if (detector.isLikelyAgent()) {
    document.body.classList.add('agent-mode');
  }
}, 3000);
```

This checks for patterns agents exhibit: completing forms impossibly fast, clicking without mouse movement, and technical signatures that reveal automation frameworks. When detected, it adds an `agent-mode` class to the body element, which you can use to adjust behaviour.

Server-side detection complements this:

```javascript
function analyzeRequest(req) {
  const signals = [];
  
  const suspiciousAgents = [
    'headless', 'phantomjs', 'selenium', 
    'webdriver', 'bot', 'crawler'
  ];
  
  const ua = req.headers['user-agent']?.toLowerCase() || '';
  if (suspiciousAgents.some(pattern => ua.includes(pattern))) {
    signals.push('suspicious_ua');
  }
  
  if (!req.headers['accept-language']) {
    signals.push('no_language');
  }
  
  const sessionRequests = getSessionRequests(req.sessionID);
  const timespan = sessionRequests[sessionRequests.length - 1].time - 
                   sessionRequests[0].time;
  
  if (sessionRequests.length > 10 && timespan < 5000) {
    signals.push('rapid_requests');
  }
  
  return {
    isLikelyAgent: signals.length >= 2,
    signals: signals
  };
}
```

Once you know you're dealing with an agent, you can adapt, not by blocking them, but by serving content that works for both audiences.

## Forms That Work

Most form failures come from validation happening too late. Here's a form that validates immediately and shows exactly what's wrong:

```html
<form id="booking-form" data-state="incomplete">
  <div class="form-state" role="status" aria-live="polite">
    <p>Completion: <span id="completion-pct">0%</span></p>
    <p>Errors: <span id="error-count">3</span></p>
  </div>
  
  <div class="field">
    <label for="email">Email address</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      required
      data-validation-state="empty"
    >
    <output for="email" class="field-status">
      <span class="status-text">Required field, not yet filled</span>
    </output>
  </div>
  
  <div class="field">
    <label for="date">Appointment date</label>
    <input 
      type="date" 
      id="date" 
      name="date" 
      required
      min="2025-12-22"
      data-validation-state="empty"
    >
    <output for="date" class="field-status">
      <span class="status-text">Required: must be future date</span>
    </output>
  </div>
  
  <button type="submit" id="submit-btn" disabled>
    Book appointment (3 fields incomplete)
  </button>
</form>
```

The JavaScript validates on every change:

```javascript
class SynchronousValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.fields = this.form.querySelectorAll('[data-validation-state]');
    this.submitBtn = this.form.querySelector('[type="submit"]');
    
    this.fields.forEach(field => {
      field.addEventListener('input', () => this.validateField(field));
      field.addEventListener('blur', () => this.validateField(field));
    });
    
    this.validateAll();
  }
  
  validateField(field) {
    const output = field.parentElement.querySelector('output');
    const statusText = output.querySelector('.status-text');
    
    let state = 'valid';
    let message = 'Valid';
    
    if (field.value.trim() === '') {
      state = 'empty';
      message = 'Required field, not yet filled';
    } else if (field.hasAttribute('required') && !field.value) {
      state = 'invalid';
      message = 'This field is required';
    } else if (field.hasAttribute('pattern')) {
      const pattern = new RegExp(field.getAttribute('pattern'));
      if (!pattern.test(field.value)) {
        state = 'invalid';
        message = 'Format is incorrect';
      }
    } else if (field.type === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        state = 'invalid';
        message = 'Invalid email format';
      }
    } else if (field.type === 'date') {
      const selectedDate = new Date(field.value);
      const minDate = field.hasAttribute('min') ? 
        new Date(field.getAttribute('min')) : null;
      
      if (minDate && selectedDate < minDate) {
        state = 'invalid';
        message = 'Date must be in the future';
      }
    }
    
    field.dataset.validationState = state;
    statusText.textContent = message;
    
    this.updateFormState();
  }
  
  validateAll() {
    this.fields.forEach(field => this.validateField(field));
  }
  
  updateFormState() {
    const states = Array.from(this.fields)
      .map(f => f.dataset.validationState);
    
    const emptyCount = states.filter(s => s === 'empty').length;
    const invalidCount = states.filter(s => s === 'invalid').length;
    const validCount = states.filter(s => s === 'valid').length;
    const totalCount = states.length;
    
    document.getElementById('completion-pct').textContent = 
      Math.round((validCount / totalCount) * 100) + '%';
    document.getElementById('error-count').textContent = 
      emptyCount + invalidCount;
    
    const canSubmit = emptyCount === 0 && invalidCount === 0;
    this.submitBtn.disabled = !canSubmit;
    
    if (canSubmit) {
      this.submitBtn.textContent = 'Book appointment';
      this.form.dataset.state = 'complete';
    } else {
      const reason = `${emptyCount + invalidCount} fields incomplete`;
      this.submitBtn.textContent = `Book appointment (${reason})`;
      this.form.dataset.state = 'incomplete';
    }
  }
}

new SynchronousValidator('booking-form');
```

Every field shows its status immediately. The submit button explains exactly why it's disabled. No surprises in the submission because all validation occurred beforehand. This works for humans who detect errors as they go and for agents that can read the current state at any time.

## Structured Data and Traditional Patterns

Agents need explicit information about what's possible and what's required. This involves both structured metadata and clear HTTP patterns.

### JSON-LD for Product Information

Add this to your product pages:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Wireless Headphones",
  "offers": {
    "@type": "Offer",
    "price": "149.99",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock",
    "inventoryLevel": 23,
    "priceValidUntil": "2025-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.3",
    "reviewCount": "127"
  }
}
</script>

<!-- Experimental pattern: Hidden metadata for agents -->
<div class="agent-metadata" data-agent-visible="true" style="display: none;">
  <h2>Purchase Information</h2>
  <dl>
    <dt>Action:</dt>
    <dd>POST to /cart/add</dd>

    <dt>Required parameters:</dt>
    <dd>product_id=12345, quantity (1-10)</dd>

    <dt>Prerequisites:</dt>
    <dd>
      <ul>
        <li>Authentication: Required (status: <span id="auth-status">not authenticated</span>)</li>
        <li>Payment method: Required (status: <span id="payment-status">not configured</span>)</li>
        <li>Shipping address: Required (status: <span id="shipping-status">not set</span>)</li>
      </ul>
    </dd>

    <dt>Expected response:</dt>
    <dd>Success: 302 redirect to /cart | Error: 400 with JSON details</dd>
  </dl>
</div>
```

**Note on data-agent-visible:** This is an experimental pattern for providing hidden metadata to AI agents whilst keeping it invisible to human users. The attribute acts as a semantic marker that agents can search for in the DOM. This pattern is not standardised but follows the convention of data-\* attributes for custom metadata.

The JSON-LD provides structured data that search engines and agents can parse reliably. The hidden agent metadata gives step-by-step instructions that a machine can follow. Humans never see this div, but agents can read it to understand precisely what's needed.

### Traditional Page Patterns

Single-page applications create ambiguity about state changes. Traditional multi-page patterns provide clarity that both humans and agents appreciate.

**The Form-Redirect-Confirmation Pattern:**

```javascript
// Server-side route handling
app.post('/cart/add', (req, res) => {
  const { product_id, quantity } = req.body;
  
  // Validate
  if (!req.session.authenticated) {
    return res.redirect(303, '/login?return_to=/cart');
  }
  
  if (!req.session.paymentMethod) {
    return res.redirect(303, '/account/payment?return_to=/cart');
  }
  
  // Process
  try {
    const result = addToCart(req.session.userId, product_id, quantity);
    
    // Clear redirect to confirmation - URL changes, state is explicit
    res.redirect(303, `/cart/added?product=${product_id}&order=${result.orderId}`);
    
  } catch (error) {
    // Error page with clear explanation
    res.status(400).render('error', {
      title: 'Could not add to cart',
      message: error.message,
      code: error.code,
      returnUrl: `/product/${product_id}`
    });
  }
});

// Confirmation page - distinct URL proves state changed
app.get('/cart/added', (req, res) => {
  res.render('cart-confirmation', {
    product: getProduct(req.query.product),
    orderId: req.query.order,
    nextActions: [
      { label: 'Continue shopping', url: '/' },
      { label: 'View cart', url: '/cart' },
      { label: 'Checkout now', url: '/checkout' }
    ]
  });
});
```

**The Confirmation Page:**

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <title>Item added to cart</title>
  <meta name="robots" content="noindex">
</head>
<body>
  <main>
    <h1>Successfully added to cart</h1>
    
    <div class="confirmation-details" 
         data-status="success"
         data-action-completed="add-to-cart">
      <p>Product: {{ product.name }}</p>
      <p>Quantity: {{ quantity }}</p>
      <p>Order reference: {{ orderId }}</p>
    </div>
    
    <div class="cart-summary">
      <h2>Current cart</h2>
      <p>Items: {{ cart.itemCount }}</p>
      <p>Total: £{{ cart.total }}</p>
    </div>
    
    <nav class="next-actions">
      <h2>What would you like to do next?</h2>
      <ul>
        {% for action in nextActions %}
        <li><a href="{{ action.url }}">{{ action.label }}</a></li>
        {% endfor %}
      </ul>
    </nav>
  </main>
</body>
</html>
```

This pattern provides:

- **Distinct URLs** for each state (agents can verify the state by checking the URL)
- **HTTP semantics** (303 See Other means "action completed, look here for result")
- **Explicit confirmation** (success message that persists)
- **Clear next steps** (no guessing what's possible)

### HTTP Status Codes That Mean Something

Use status codes correctly. Agents rely on them:

```javascript
// 200 OK - Request succeeded, here's the data
app.get('/products/:id', (req, res) => {
  const product = getProduct(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// 201 Created - Resource was created
app.post('/orders', (req, res) => {
  const order = createOrder(req.body);
  res.status(201)
     .location(`/orders/${order.id}`)
     .json(order);
});

// 303 See Other - Action completed, redirect to result
app.post('/cart/add', (req, res) => {
  addToCart(req.body);
  res.redirect(303, '/cart/added');
});

// 400 Bad Request - Client error, with details
app.post('/checkout', (req, res) => {
  const errors = validateCheckout(req.body);
  if (errors.length > 0) {
    res.status(400).json({
      error: 'Validation failed',
      details: errors.map(e => ({
        field: e.field,
        message: e.message,
        code: e.code
      }))
    });
  }
});

// 401 Unauthorized - Authentication required
app.get('/account', (req, res) => {
  if (!req.session.authenticated) {
    res.status(401).json({
      error: 'Authentication required',
      loginUrl: '/login'
    });
  }
});

// 409 Conflict - Action cannot complete due to current state
app.post('/cart/add', (req, res) => {
  if (getStock(req.body.product_id) < req.body.quantity) {
    res.status(409).json({
      error: 'Insufficient stock',
      available: getStock(req.body.product_id),
      requested: req.body.quantity
    });
  }
});
```

Each status code tells agents exactly what happened without parsing response bodies.

## Agent Communication Standards

Beyond structured data on individual pages, agents need site-wide guidance. Two files provide this: `robots.txt` (traditional) and `llms.txt` (emerging), along with page-specific meta tags.

### robots.txt: Beyond Basic Compliance

The robots.txt standard is well-known, but AI agent compliance requires more sophistication than traditional crawler respect.

#### The Compliance Spectrum

##### Level 0: No robots.txt

Most sites have no robots.txt file. This is permissive by default but provides no guidance for agents and misses optimization opportunities.

##### Level 1: Basic robots.txt

```text
User-agent: *
Disallow: /admin/
Disallow: /account/
```

Protects sensitive paths but provides no AI-specific guidance.

##### Level 2: AI-Aware robots.txt

```text
User-agent: *
Disallow: /admin/
Disallow: /account/

User-agent: GPTBot
Allow: /products/
Allow: /categories/
Disallow: /

User-agent: ClaudeBot
Allow: /
Disallow: /checkout/

Sitemap: https://example.com/sitemap.xml
```

Declares AI-specific user agents with tailored permissions. References sitemap for discovery.

##### Level 3: Comprehensive robots.txt

```text
# robots.txt - AI Agent Guidance
# See llms.txt for detailed agent policies
# Contact: api-support@example.com

User-agent: *
Disallow: /admin/
Disallow: /account/
Disallow: /cart/
Disallow: /checkout/

User-agent: GPTBot
Allow: /products/
Allow: /categories/
Disallow: /reviews/  # Prevent review scraping

User-agent: ClaudeBot
Allow: /products/
Allow: /categories/
Allow: /reviews/

User-agent: PerplexityBot
Disallow: /

User-agent: OAI-SearchBot
Allow: /products/
Disallow: /

Sitemap: https://example.com/sitemap.xml
```

Multiple AI agents declared, sensitive path protection, helpful comments, llms.txt reference, sitemap declaration.

#### Interactive Compliance: The User Choice Problem

When an agent encounters a robots.txt restriction, who decides what happens?

**Three Models:**

1. **Strict Compliance** (default): Agent obeys all restrictions, user has no override. Ethical but limiting.

2. **User Override** (recommended): Agent prompts user when blocked. User can allow, skip, or quit. Balances ethics with agency.

3. **Force-Scrape Mode** (use sparingly): Bypass all restrictions. User accepts responsibility. Required for some use cases.

**Implementation:** For agent-based tools, implement Model 2 with these options:

- **[y]** Override this URL only
- **[a]** Enable force-scrape mode for session
- **[n]** Skip this URL
- **[q]** Quit entire analysis

This preserves user agency whilst defaulting to ethical behaviour.

#### Quality Scoring: What Makes Good robots.txt?

**Scoring Criteria (100 points total):**

1. **AI User Agents (30 points)**
   - 0 agents: 0 points
   - 1-2 agents: 15 points
   - 3+ agents: 30 points

2. **Sitemap Declaration (20 points)**
   - Present: 20 points
   - Missing: 0 points

3. **Sensitive Path Protection (25 points)**
   - No protection: 0 points
   - 1-2 paths: 15 points
   - 3+ paths: 25 points

4. **llms.txt Reference (15 points)**
   - Present in comments: 15 points
   - Missing: 0 points

5. **Helpful Comments (10 points)**
   - 3+ explanatory comments: 10 points
   - 1-2 comments: 5 points
   - No comments: 0 points

**Common AI User Agents (2025):**

- GPTBot (OpenAI)
- ClaudeBot (Anthropic)
- PerplexityBot (Perplexity)
- OAI-SearchBot (OpenAI search)
- google-extended (Google Gemini)
- anthropic-ai (Anthropic)
- cohere-ai (Cohere)
- DeepSeek-Bot (DeepSeek)
- Gemini-Bot (Google)

**Why scoring matters:** Sites with high robots.txt scores demonstrate professional AI readiness, clear policies, and ethical stance. This correlates with higher agent trust and completion rates.

### The llms.txt File

Think of `llms.txt` as `robots.txt` for AI agents. It resides at the root of your site and instructs agents on how to interact with your content.

**Location:** `https://example.com/llms.txt`

**Real-world reference:** For a comprehensive production example, see Digital Domain Technologies' llms.txt at <https://allabout.network/llms.txt>, which demonstrates how to structure 91 posts across 6 categories with clear access guidelines, rate limits, and attribution requirements.

**Basic Structure:**

```text
# Example Shop

Technical documentation and product catalogue for Example Shop, electronics retailer.

**Last updated:** January 2025
**Contact:** agents@example.com

**Site Type:** E-Commerce, Product-Centric
**Purpose:** Product Sales and Customer Support
**Technology Stack:** RESTful API, Document-Based Architecture

## Access Guidelines

- Base Rate: 60 requests per hour per IP
- Burst Rate: Maximum 10 requests per minute
- Cache Retention: 24 hour maximum
- Content Usage: Attribution required
- Commercial Use: Requires written permission
- Training Usage: Permitted for public product data only
- Attribution Format: "Source: Example Shop (example.com)"

## Primary Documentation

Complete product catalogue and API documentation:

- [Product Catalogue](https://example.com/products/): Full product listings with specifications
- [API Reference](https://api.example.com/docs/): REST API documentation and endpoints
- [Help Centre](https://example.com/help/): Customer support articles
- [Store Locations](https://example.com/stores/): Physical store information

## Content Restrictions

- [Customer Accounts](https://example.com/account/): No AI access permitted
- [Order History](https://example.com/orders/): Authentication required
- [Admin Area](https://example.com/admin/): No AI access
- PII Handling: Do not extract or store personal information

## API Access

**Preferred access method:** API
**Endpoint:** https://api.example.com/v1
**Documentation:** https://developers.example.com/docs
**Authentication:** OAuth2
**Rate limits:** 200/minute for authenticated requests

### Identity Delegation

We support identity delegation for agent-mediated purchases:
- Delegation endpoint: /api/auth/delegate
- Documentation: https://developers.example.com/delegation
- Loyalty integration: Supported
- Warranty registration: Supported

## For Human Visitors

Looking for the full interactive experience?

- **Main Shop:** [https://example.com](https://example.com)
- **Contact:** [help@example.com](mailto:help@example.com)
- **About llms.txt:** [https://llmstxt.org](https://llmstxt.org)

## Version Information

**Version:** 1.0 (Updated: January 2025)
**Changelog:** example.com/llms-changelog
```

**E-commerce Example:**

```text
# RetailCo

Online retailer specialising in consumer electronics and home goods.

**Last updated:** January 2025
**Contact:** api-support@retailco.com

**Site Type:** E-Commerce, Product-Centric
**Purpose:** Product Sales, Reviews, and Customer Support

## Access Guidelines

- Base Rate: 100 requests per hour per IP
- Authenticated Rate: 500 requests per hour with API key
- Cache Retention: 24 hours for product data
- Attribution: Appreciated but not required
- Commercial Use: Permitted for price comparison and shopping agents
- Training Usage: Product specifications and reviews permitted

## Product Catalogue

Browse and search our full product range:

- [Products](https://retailco.com/products/): Complete product listings with specifications
- [Categories](https://retailco.com/categories/): Organised by department
- [Reviews](https://retailco.com/reviews/): Customer reviews and ratings
- [Availability](https://retailco.com/availability/): Stock levels and delivery times

## Content Restrictions

- [Shopping Cart](https://retailco.com/cart/): Authentication required
- [Checkout](https://retailco.com/checkout/): Authentication required
- [Account](https://retailco.com/account/): Authentication required
- Customer Data: Do not extract or store personal information

## API Access

**Preferred method:** API
**Endpoint:** https://api.retailco.com/v2
**Documentation:** https://developers.retailco.com
**Authentication:** OAuth2 or API key

### Identity Delegation

We support agent-mediated purchases with customer identity preservation:
- Delegation endpoint: /api/delegate
- Loyalty programme integration: Supported
- Warranty registration: Supported
- Order history: Links to customer account

## For Human Visitors

- **Shop:** [retailco.com](https://retailco.com)
- **Help:** [help@retailco.com](mailto:help@retailco.com)
```

**Content Publisher Example:**

```text
# NewsDaily

Independent news publication covering technology, business, and culture.

**Last updated:** January 2025
**Contact:** ai-policy@newsdaily.com

**Site Type:** Content-Driven, News Publication
**Purpose:** Journalism, Analysis, and Commentary

## Access Guidelines

- Base Rate: 20 requests per hour per IP
- Cache Retention: 6 hours maximum
- Content Usage: Attribution required
- Commercial Use: Prohibited without license
- Training Usage: Headlines and summaries only (max 100 words)
- Attribution Format: "Via NewsDaily: [article-title] ([url])"

## Available Content

Public articles and author profiles:

- [Articles](https://newsdaily.com/articles/): Current news and analysis (read-only)
- [Authors](https://newsdaily.com/authors/): Journalist profiles and archives
- [Topics](https://newsdaily.com/topics/): Organised by subject area

## Content Restrictions

- [Subscriber Content](https://newsdaily.com/subscriber-only/): No AI access
- [Archive](https://newsdaily.com/archive/): Pre-2020 content not available
- Full Text: Extraction prohibited
- Images: Extraction prohibited
- Commercial extraction: Requires licensing agreement

## Content Policy

Permitted uses:
- Answering questions about current news
- Generating article summaries (max 100 words)
- Providing headlines and links
- Attributing content to NewsDaily

Prohibited uses:
- Full-text extraction
- Commercial content aggregation
- Training on subscriber-only content
- Bypassing paywalls

## Licensing

For commercial licensing or content partnerships:
- Email: [licensing@newsdaily.com](mailto:licensing@newsdaily.com)
- Information: https://newsdaily.com/licensing

## For Human Visitors

- **News:** [newsdaily.com](https://newsdaily.com)
- **Subscribe:** [newsdaily.com/subscribe](https://newsdaily.com/subscribe)
```

**SaaS Application Example:**

```text
# ProjectManager Pro

Cloud-based project management platform for teams and organisations.

**Last updated:** January 2025
**Contact:** api@projectmanager.pro

**Site Type:** SaaS Application, Transactional
**Purpose:** Project Management, Team Collaboration, Task Tracking

## Access Guidelines

- Authentication: OAuth2 required for all non-public content
- Base Rate: 100 requests per minute per user
- Organisation Rate: 1000 requests per minute per organisation
- Cache Retention: Real-time data, no caching recommended
- Commercial Use: Permitted for authenticated users
- Training Usage: User data prohibited

## Public Resources

Documentation and templates available without authentication:

- [Templates](https://projectmanager.pro/public/templates/): Project templates
- [Guides](https://projectmanager.pro/public/guides/): How-to documentation
- [API Documentation](https://docs.projectmanager.pro/api): Complete API reference

## Authenticated Content

All project data requires OAuth2 authentication:

- [Projects](https://projectmanager.pro/projects/): User projects and details
- [Tasks](https://projectmanager.pro/tasks/): Task lists and assignments
- [Team](https://projectmanager.pro/team/): Team members and permissions
- [Reports](https://projectmanager.pro/reports/): Analytics and summaries

## API Access

**Required method:** API with OAuth2
**Endpoint:** https://api.projectmanager.pro/v1
**Documentation:** https://docs.projectmanager.pro/api
**Authentication:** OAuth2 only

### Identity Delegation

AI agents can act on behalf of users with appropriate OAuth2 scopes:
- Delegation endpoint: /oauth/delegate
- Available scopes: read-projects, write-tasks, read-reports, manage-team
- Token expiry: 1 hour (refresh tokens available)

## Privacy and Security

- User Data: Extraction prohibited
- Project Summaries: Permitted with authentication
- Personal Information: Never extract or store user PII
- GDPR Compliance: Full user control over data

## For Human Visitors

- **Platform:** [projectmanager.pro](https://projectmanager.pro)
- **Sign Up:** [projectmanager.pro/signup](https://projectmanager.pro/signup)
- **Support:** [help@projectmanager.pro](mailto:help@projectmanager.pro)
```

### Meta Tags for Page-Level Guidance

While `llms.txt` provides site-wide defaults, meta tags give page-specific instructions.

**Status: Proposed Pattern** - No formal standard exists yet for AI-specific meta tags, but a logical pattern is emerging based on existing conventions (like robots, viewport, and theme-color meta tags). The examples below show a consistent approach that:

- Uses the ai-\* namespace to avoid conflicts
- Provides machine-readable guidance that supplements llms.txt
- Remains harmless if agents don't recognise them

These patterns are proposed, not standardised. They work today because they're simply metadata - they don't break anything if ignored. Think of them as forward-compatible hints that may become standards as the ecosystem matures.

**Examples of proposed meta tags:**

```html
<head>
  <!-- Where the API equivalent of this page lives -->
  <meta name="ai-api-endpoint" content="https://api.example.com/v1/products/12345">

  <!-- API documentation -->
  <meta name="ai-api-docs" content="https://developers.example.com/docs">

  <!-- How agents should access this content -->
  <meta name="ai-preferred-access" content="api">

  <!-- Rate limits for this resource -->
  <meta name="ai-rate-limit" content="60/minute">

  <!-- Identity delegation endpoint -->
  <meta name="ai-identity-delegation" content="/api/auth/delegate">

  <!-- What extraction is permitted -->
  <meta name="ai-content-policy" content="summaries-allowed, prices-allowed">

  <!-- Structured data formats available -->
  <meta name="ai-structured-data" content="json-ld, microdata">

  <!-- How often this content changes -->
  <meta name="ai-freshness" content="daily">

  <!-- Attribution requirement -->
  <meta name="ai-attribution" content="required">
</head>
```

**Product Page Example:**

```html
<head>
  <title>Wireless Headphones - Example Shop</title>
  
  <meta name="ai-api-endpoint" content="/api/v1/products/WH-1000">
  <meta name="ai-preferred-access" content="api">
  <meta name="ai-structured-data" content="json-ld">
  <meta name="ai-freshness" content="hourly">
  <meta name="ai-content-policy" content="full-extraction-allowed">
  <meta name="ai-identity-delegation" content="/api/auth/delegate">
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Wireless Headphones",
    "sku": "WH-1000",
    ...
  }
  </script>
</head>
```

**Article Page Example:**

```html
<head>
  <title>Market Analysis: Q4 2025 - NewsDaily</title>
  
  <meta name="ai-preferred-access" content="html">
  <meta name="ai-content-policy" content="summary-only, max-words-150">
  <meta name="ai-attribution" content="required">
  <meta name="ai-freshness" content="static">
  <meta name="ai-commercial-use" content="prohibited">
  
  <link rel="alternate" type="application/json" 
        href="/api/articles/market-analysis-q4-2025.json">
</head>
```

### Combining Approaches

Use all three together for maximum clarity:

1. **llms.txt** - Site-wide defaults and policies
2. **Meta tags** - Page-specific overrides and details
3. **JSON-LD** - Semantic content description

**Decision Tree:**

```text
Is this a site-wide policy?
  YES → Put it in llms.txt
  NO → Continue

Is this about a specific page's content?
  YES → Use JSON-LD for the content itself
  NO → Continue

Is this about how agents should access/use this page?
  YES → Use meta tags
```

**Complete Implementation Example:**

```text
# /llms.txt
> Example Shop - Electronics retailer
preferred-access: api
api-endpoint: https://api.example.com/v1
rate-limit: 100/minute
identity-delegation: supported
extraction: product-data-allowed
```

```html
<!-- /products/wireless-headphones.html -->
<head>
  <!-- Page-specific overrides -->
  <meta name="ai-api-endpoint" content="/api/v1/products/WH-1000">
  <meta name="ai-freshness" content="hourly">
  <meta name="ai-structured-data" content="json-ld">
  
  <!-- Semantic content -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Wireless Headphones",
    "sku": "WH-1000",
    "offers": {
      "@type": "Offer",
      "price": "149.99",
      "priceCurrency": "GBP",
      "availability": "InStock"
    }
  }
  </script>
</head>
```

An agent visiting this page:

1. Checks `llms.txt` first - learns the site has an API, allows product extraction
2. Reads meta tags - discovers this specific product is at `/api/v1/products/WH-1000`
3. Fetches JSON-LD or calls API - gets structured product data
4. Respects rate limits and attribution requirements from `llms.txt`

### Content Policy Declarations

For content creators worried about extraction (Chapter 5's concerns), explicit policies help:

```html
<meta name="ai-content-policy" content="
  summaries: allowed (max 100 words);
  quotes: allowed (max 50 words, with attribution);
  full-text: prohibited;
  training-data: opt-out;
  commercial-use: prohibited without license
">

<meta name="ai-attribution" content="
  required: true;
  format: 'Source: [site-name] - [article-title] ([url])';
  link-back: required
">

<meta name="ai-licensing" content="
  personal-use: free;
  commercial-api: https://example.com/api-pricing;
  contact: licensing@example.com
">
```

This connects to the legal framework from Chapter 7. By explicitly stating what's permitted, you reduce ambiguity and establish expectations. An agent that violates explicitly stated policies has less legal cover than one operating in ambiguous territory.

### AI-Specific API Endpoints

For complex applications, consider dedicated API endpoints optimised for AI consumption. These differ from frontend-optimised APIs by including context and explicit instructions:

**Regular API (optimised for frontend):**

```javascript
GET /api/products/12345
{
  "id": 12345,
  "name": "Wireless Headphones",
  "price": 14999,  // Cents, frontend formats this
  "images": ["img1.jpg", "img2.jpg"]
}
```

**AI-optimised API (includes context):**

```javascript
GET /api/ai/products/12345
{
  "id": 12345,
  "name": "Wireless Headphones",
  "description": "Over-ear wireless headphones with noise cancellation",
  "price": {
    "amount": 149.99,
    "currency": "GBP",
    "formatted": "£149.99",
    "includes_vat": true
  },
  "availability": {
    "status": "in_stock",
    "quantity": 23,
    "ships_within": "1-2 days"
  },
  "purchase_instructions": {
    "endpoint": "POST /api/cart/add",
    "required_fields": ["product_id", "quantity"],
    "authentication": "required_for_checkout"
  },
  "related_products": [12346, 12347],
  "category_path": ["Electronics", "Audio", "Headphones"]
}
```

The AI endpoint includes:

- Pre-formatted values (no client-side transformation needed)
- Contextual information (VAT status, shipping time)
- Explicit instructions for actions
- Relationship data (categories, related items)

Document these endpoints in your llms.txt:

```text
## AI API Access
- [Product Data](https://api.example.com/ai/products/): AI-optimised product information
- [Search](https://api.example.com/ai/search/): Structured search results
- Rate limit: 60 requests per hour
- Authentication: API key required
```

## Identity Delegation

Chapter 4 described the customer relationship problem when agents make purchases. If you need to support identity delegation:

### Basic pattern

```javascript
// Verify delegation token in checkout
async function checkoutWithDelegation(cart, headers) {
  let customer = null;

  // Check for delegation token
  if (headers['x-delegation-token']) {
    try {
      // Verify token (implementation depends on token format)
      customer = await verifyToken(headers['x-delegation-token']);
    } catch (error) {
      // Invalid token - proceed as anonymous
      console.warn('Invalid delegation token:', error);
    }
  }

  // Process order
  const order = await createOrder({
    items: cart.items,
    customer: customer, // null if no valid token
    purchasingAgent: headers['user-agent']
  });

  // If customer identified, apply loyalty and warranty
  if (customer) {
    await applyLoyaltyPoints(customer.id, order.total);
    await registerWarranty(customer.id, order.items);
  }

  return order;
}
```

### Key principles

- Delegation tokens should be optional - agents can browse/purchase anonymously
- Token verification must be cryptographically secure
- Failed verification should not block the transaction
- Customer identity enables loyalty/warranty, not payment
- Payment processing is agent-handled separately

### Standardisation watch

No industry standard exists yet. Several approaches are being developed:

- OAuth2-based delegation flows
- JWT/JWS signed tokens
- Blockchain-based attestations
- Browser-native delegation APIs

For practical implementation, monitor emerging standards rather than building custom solutions. In the interim, design your checkout flow to accept optional identity tokens without requiring them.

## Testing and Analytics

Before deploying changes, test them from an agent's perspective. Then measure whether they work.

### Automated Agent Testing

```javascript
// Playwright test
const { test, expect } = require('@playwright/test');

test('agent can complete purchase', async ({ page }) => {
  // Emulate agent behaviour
  await page.emulateMedia({ reducedMotion: 'reduce' });
  
  await page.goto('/product/12345');
  
  // Check page state is explicit
  const pageState = await page.getAttribute(
    '[data-load-state]', 
    'data-load-state'
  );
  expect(pageState).toBe('complete');
  
  // Fill form instantly
  await page.fill('#quantity', '2');
  
  // Validation should be immediate
  const validationState = await page.getAttribute(
    '#quantity', 
    'data-validation-state'
  );
  expect(validationState).toBe('valid');
  
  // Submit button should be enabled
  const buttonText = await page.textContent('#submit-btn');
  expect(buttonText).not.toContain('disabled');
  
  await page.click('#submit-btn');
  
  // Should navigate to clear success page
  await page.waitForURL('**/cart/added**');
  
  const successMessage = await page.textContent('h1');
  expect(successMessage).toContain('added to cart');
});

test('errors are visible and persistent', async ({ page }) => {
  await page.goto('/checkout');
  
  // Submit with invalid data
  await page.fill('#email', 'not-an-email');
  await page.click('#submit-btn');
  
  // Error should be immediately visible
  const errorVisible = await page.isVisible('.error-summary');
  expect(errorVisible).toBe(true);
  
  // Wait to ensure error persists (no auto-dismiss)
  await page.waitForTimeout(5000);
  
  const stillVisible = await page.isVisible('.error-summary');
  expect(stillVisible).toBe(true);
  
  // Error should explain the problem
  const errorText = await page.textContent('.error-summary');
  expect(errorText).toContain('email');
});

test('no information disappears', async ({ page }) => {
  await page.goto('/booking');
  
  // Capture initial content
  const initialText = await page.textContent('body');
  
  // Wait for any animations or timed elements
  await page.waitForTimeout(10000);
  
  // Capture final content
  const finalText = await page.textContent('body');
  
  // Key information should still be present
  // (Toasts would fail this test)
  expect(finalText.length).toBeGreaterThanOrEqual(initialText.length * 0.95);
});

test('breadcrumbs have Schema.org markup', async ({ page }) => {
  await page.goto('/products/headphones/wh-1000');

  // Check for BreadcrumbList
  const breadcrumbList = await page.$('[itemtype="https://schema.org/BreadcrumbList"]');
  expect(breadcrumbList).toBeTruthy();

  // Check for position metadata
  const positions = await page.$$('[itemprop="position"]');
  expect(positions.length).toBeGreaterThan(0);
});

test('search results are machine-readable', async ({ page }) => {
  await page.goto('/search?q=headphones');

  // Check for result metadata
  const results = await page.$('.search-results');
  expect(results).toBeTruthy();

  const totalResults = await page.getAttribute('.search-results', 'data-total-results');
  expect(parseInt(totalResults)).toBeGreaterThan(0);

  // Check individual results have IDs
  const resultItems = await page.$$('[data-product-id]');
  expect(resultItems.length).toBeGreaterThan(0);
});

test('cart state is explicit', async ({ page }) => {
  await page.goto('/cart');

  // Check cart has state attributes
  const cart = await page.$('#shopping-cart');
  expect(cart).toBeTruthy();

  const itemCount = await page.getAttribute('#shopping-cart', 'data-item-count');
  expect(itemCount).toBeDefined();

  const subtotal = await page.getAttribute('#shopping-cart', 'data-subtotal');
  expect(subtotal).toBeDefined();
});

test('filter state reflected in URL and DOM', async ({ page }) => {
  await page.goto('/products?category=headphones&price_max=200');

  // Check URL parameters match displayed filters
  const activeFilters = await page.$('.active-filters');
  expect(activeFilters).toBeTruthy();

  // Check filter values are in data attributes
  const categoryFilter = await page.$('[data-filter="category"]');
  expect(categoryFilter).toBeTruthy();
});

test('llms.txt exists and is valid', async ({ page }) => {
  const response = await page.goto('/llms.txt');

  expect(response.status()).toBe(200);

  const content = await page.content();
  // Should start with H1 title
  expect(content).toMatch(/^#\s+.+/m);
  // Should have blockquote summary
  expect(content).toContain('>');
});
```

Run these tests on every deployment. If they start failing, you've broken agent compatibility.

### Segmented Analytics

Track agent and human sessions separately:

```javascript
class SegmentedAnalytics {
  constructor() {
    this.sessionType = this.detectSessionType();
  }
  
  detectSessionType() {
    // Check server hint
    const meta = document.querySelector('meta[name="interface-type"]');
    if (meta?.content === 'agent') return 'agent';
    
    // Check stored classification
    const stored = sessionStorage.getItem('session_type');
    if (stored) return stored;
    
    return 'human'; // Default
  }
  
  track(eventName, properties = {}) {
    const event = {
      name: eventName,
      sessionType: this.sessionType,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      ...properties
    };
    
    // Send to analytics
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
  }
  
  trackConversion(value, currency = 'GBP') {
    this.track('conversion', {
      value: value,
      currency: currency
    });
  }
  
  trackTaskCompletion(taskName, success, durationMs) {
    this.track('task_completion', {
      task: taskName,
      success: success,
      duration_ms: durationMs
    });
  }
}

// Usage
const analytics = new SegmentedAnalytics();

analytics.track('page_view');

document.querySelector('form').addEventListener('submit', () => {
  analytics.track('form_submit', { formId: 'checkout' });
});
```

**Database Schema for Segmented Data:**

```sql
CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  session_type VARCHAR(10) NOT NULL,  -- 'human' or 'agent'
  timestamp TIMESTAMP DEFAULT NOW(),
  user_agent TEXT,
  session_id VARCHAR(255),
  duration_ms INTEGER
);

CREATE TABLE task_completions (
  id SERIAL PRIMARY KEY,
  task_name VARCHAR(100) NOT NULL,
  session_type VARCHAR(10) NOT NULL,
  success BOOLEAN NOT NULL,
  duration_ms INTEGER,
  error_code VARCHAR(50),
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Query for comparison
SELECT 
  session_type,
  COUNT(*) as attempts,
  SUM(CASE WHEN success THEN 1 ELSE 0 END) as successes,
  ROUND(100.0 * SUM(CASE WHEN success THEN 1 ELSE 0 END) / COUNT(*), 2) as success_rate,
  AVG(duration_ms) as avg_duration_ms
FROM task_completions
WHERE task_name = 'checkout'
GROUP BY session_type;
```

This tells you whether agents are succeeding at the same rate as humans. Where are they failing? Which tasks take agents longer?

### Debugging Agent Failures

When agents fail, you need to understand why:

```javascript
// Structured error logging for agent debugging
class AgentErrorLogger {
  constructor() {
    this.errors = [];
  }
  
  logError(context, error, pageState) {
    const entry = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      context: context,
      error: {
        message: error.message,
        code: error.code,
        stack: error.stack
      },
      pageState: {
        formState: document.querySelector('form')?.dataset.state,
        loadState: document.querySelector('[data-load-state]')?.dataset.loadState,
        visibleErrors: Array.from(document.querySelectorAll('.error, [role="alert"]'))
          .map(el => el.textContent.trim()),
        disabledButtons: Array.from(document.querySelectorAll('button[disabled]'))
          .map(btn => ({
            text: btn.textContent.trim(),
            reason: btn.dataset.disabledReason
          }))
      },
      domSnapshot: this.getRelevantDOM()
    };
    
    this.errors.push(entry);
    this.send(entry);
  }
  
  getRelevantDOM() {
    // Capture form state, visible messages, key elements
    const form = document.querySelector('form');
    if (!form) return null;
    
    return {
      fields: Array.from(form.querySelectorAll('input, select, textarea')).map(f => ({
        name: f.name,
        type: f.type,
        value: f.type === 'password' ? '[redacted]' : f.value,
        validationState: f.dataset.validationState,
        error: document.getElementById(`${f.id}-error`)?.textContent
      })),
      submitButton: {
        disabled: form.querySelector('[type="submit"]')?.disabled,
        text: form.querySelector('[type="submit"]')?.textContent
      }
    };
  }
  
  send(entry) {
    fetch('/api/agent-errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });
  }
}

// Usage
const errorLogger = new AgentErrorLogger();

try {
  await submitForm();
} catch (error) {
  errorLogger.logError('form_submission', error);
}
```

**Server-Side Error Aggregation:**

```javascript
// Aggregate errors to identify patterns
app.get('/admin/agent-errors/summary', async (req, res) => {
  const summary = await db.query(`
    SELECT 
      context,
      error_code,
      COUNT(*) as occurrences,
      MAX(timestamp) as last_seen,
      array_agg(DISTINCT url) as affected_urls
    FROM agent_errors
    WHERE timestamp > NOW() - INTERVAL '7 days'
    GROUP BY context, error_code
    ORDER BY occurrences DESC
    LIMIT 20
  `);
  
  res.json({
    period: 'last_7_days',
    top_errors: summary.rows
  });
});
```

This helps you identify what's breaking most often. Which pages have problems? When did failures start occurring?

## Production Operations

The examples above work for learning, but production sites need robust validation and monitoring. The code-examples/ directory contains production-ready scripts for operational deployment.

### Validation Scripts

Two health check scripts are provided for different scenarios:

**Development Health Check**: Quick verification that manifest files are accessible (30 lines).

See [code-examples/validation/verify-ai-simple.js](../code-examples/validation/verify-ai-simple.js)

```bash
node code-examples/validation/verify-ai-simple.js
```

This checks basic file accessibility (llms.txt, robots.txt, sitemap.xml, query-index.json) without parsing content. Perfect for rapid development feedback.

**Production Health Check**: Comprehensive validation with content structure checks (115 lines).

See [code-examples/validation/verify-ai-production.js](../code-examples/validation/verify-ai-production.js)

```bash
node code-examples/validation/verify-ai-production.js
```

This validates markdown structure in llms.txt, JSON format in query-index.json, and XML structure in sitemap.xml. Returns detailed error reports with line numbers and specific failures.

**CI/CD Integration**: Add continuous validation to your deployment pipeline.

See [code-examples/validation/github-actions.yml](../code-examples/validation/github-actions.yml)

Copy to `.github/workflows/ai-health-check.yml` to run validation on every commit. Blocks deployment if AI manifest files are broken.

### Monitoring AI Traffic

Track which agents visit your site and what they access:

**Server Log Analysis**: Parse Apache/Nginx logs for AI bot patterns.

See [code-examples/monitoring/server-log-analysis.sh](../code-examples/monitoring/server-log-analysis.sh)

```bash
./code-examples/monitoring/server-log-analysis.sh /var/log/nginx/access.log
```

This bash script reports:

- Visits by AI bot type (OpenAI, Anthropic, Perplexity, Google Gemini, DeepSeek)
- Most accessed paths by AI bots
- 404 errors from AI bots

Run weekly to understand which agents are discovering your content and where they're encountering problems.

**Analytics Integration**: Track AI agent visits in Google Analytics 4.

See [code-examples/monitoring/analytics-tracking.js](../code-examples/monitoring/analytics-tracking.js)

This detects AI agents from user-agent strings and sends custom events to Google Analytics 4. Add to your JavaScript bundle to track:

- `ai_agent_visit` event with agent type
- Page paths accessed by agents
- Comparison between human and agent traffic patterns

### Platform-Specific Configurations

Production implementations for common platforms:

**Apache**: HTTP Link headers for AI discovery.

See [code-examples/apache/.htaccess](../code-examples/apache/.htaccess)

**Note on HTTP Link header syntax**: These headers use RFC 8288 format, not HTML/markdown syntax. The angle brackets `<>` wrap only the URI - link parameters like `rel` go outside the brackets, separated by semicolons. Example: `Link: <https://yoursite.com/llms.txt>; rel="llms-txt"`. This is a server response header format, different from HTML link syntax.

**Nginx**: HTTP headers and rate limiting configuration.

See [code-examples/nginx/ai-headers.conf](../code-examples/nginx/ai-headers.conf) and [code-examples/nginx/rate-limiting.conf](../code-examples/nginx/rate-limiting.conf)

The rate limiting config uses the `map` directive for reliable AI bot detection, avoiding the unreliable `if` directive in location context.

**Next.js**: Header configuration, React components, and API routes.

See [code-examples/nextjs/next.config.js](../code-examples/nextjs/next.config.js), [code-examples/nextjs/AIHandshake.jsx](../code-examples/nextjs/AIHandshake.jsx), and [code-examples/nextjs/dynamic-query-index.js](../code-examples/nextjs/dynamic-query-index.js)

**WordPress**: PHP functions for headers and query index generation.

See [code-examples/wordpress/functions-headers.php](../code-examples/wordpress/functions-headers.php) and [code-examples/wordpress/generate-query-index.php](../code-examples/wordpress/generate-query-index.php)

The WordPress examples use `posts_per_page` instead of the deprecated `numberposts` parameter.

**Adobe Edge Delivery Services**: Query index configuration.

See [code-examples/eds/helix-query.yaml](../code-examples/eds/helix-query.yaml)

**Static Site Generators**: Universal index generator for Hugo, Jekyll, Gatsby, or any markdown-based static site.

See [code-examples/static-site/generate-index.js](../code-examples/static-site/generate-index.js)

All code examples include fixes for deprecated functions and updated user-agent detection for 2025 AI agents (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, google-extended, anthropic-ai, cohere-ai, DeepSeek-Bot, Gemini-Bot).

## CSS for Agent Mode

When you detect an agent, disable animations and reveal hidden content:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

body.agent-mode * {
  animation-duration: 0ms !important;
  transition-duration: 0ms !important;
}

body.agent-mode [data-agent-visible] {
  display: block !important;
  position: static !important;
  clip: auto !important;
}

body.agent-mode details {
  display: block;
}

body.agent-mode details summary {
  display: none;
}
```

This removes the temporal dimension that agents can't handle, whilst keeping the visual design intact for humans.

## Operational Concerns

Running agent-compatible sites requires ongoing operational considerations.

### Rate Limiting by Session Type

Different limits for different traffic:

```javascript
const rateLimit = require('express-rate-limit');

// Detected agents get different limits
const agentLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: {
    error: 'Rate limit exceeded',
    limit: 100,
    window: '1 minute',
    retry_after: 60
  },
  headers: true
});

const humanLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 300,
  message: 'Too many requests'
});

// API endpoints get stricter limits
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  keyGenerator: (req) => req.headers['x-api-key'] || req.ip
});

// Apply based on detection
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return apiLimiter(req, res, next);
  }
  
  if (req.isAgent) {
    return agentLimiter(req, res, next);
  }
  
  return humanLimiter(req, res, next);
});
```

Communicate limits clearly in headers and responses:

```javascript
app.use((req, res, next) => {
  res.setHeader('X-RateLimit-Limit', req.rateLimit?.limit || 'unknown');
  res.setHeader('X-RateLimit-Remaining', req.rateLimit?.remaining || 'unknown');
  res.setHeader('X-RateLimit-Reset', req.rateLimit?.resetTime || 'unknown');
  next();
});
```

### Version Management

When you change your site, agents might break. Manage this carefully:

```javascript
// Maintain stable identifiers across redesigns
// OLD version
<input name="email_address" id="email-field">

// NEW version - keep old name as alias
<input name="email" 
       id="email-field" 
       data-legacy-name="email_address">

// Server accepts both
app.post('/submit', (req, res) => {
  const email = req.body.email || req.body.email_address;
  // Process...
});
```

**Version your HTML:**

```html
<html data-site-version="2.5" data-api-version="1.2">
```

**Provide changelog for agents:**

```text
# /agent-changelog.txt

## Version 2.5 (2025-01-15)
- Renamed email_address field to email (old name still accepted)
- Added structured data for product availability
- New delegation endpoint at /api/auth/delegate

## Version 2.4 (2025-12-01)
- Updated checkout flow (now 3 steps instead of 5)
- Removed deprecated /api/v1 endpoints (use /api/v2)
```

## Quick Wins Checklist

If you can only make a few changes, prioritise these:

### Priority 1: Critical Quick Wins

**Effort Level:** A single developer can implement these changes in a focused session. No architectural changes required, minimal risk, immediate deployment.

- [ ] Make error messages persistent (remove toast notifications)
- [ ] Show complete pricing upfront (no hidden fees)
- [ ] Add one piece of JSON-LD structured data
- [ ] Check forms show validation errors immediately

### Priority 2: Essential Improvements

**Effort Level:** Requires coordinated work across multiple developers or sustained focus from a small team. Systematic changes to existing code, testing across multiple pages. Plan for iterative deployment.

- [ ] Add explicit state attributes to loading elements
- [ ] Provide complete information on single pages (reduce pagination)
- [ ] Implement synchronous form validation
- [ ] Add agent metadata to key pages
- [ ] Create basic llms.txt file

### Priority 3: Core Infrastructure

**Effort Level:** Multi-person project requiring planning, architectural decisions, and cross-functional collaboration. Changes to core application structure. Requires thorough testing, staged rollout, and ongoing monitoring.

- [ ] Implement agent detection
- [ ] Create agent-optimised view of forms
- [ ] Add meta tags to key pages
- [ ] Set up segmented analytics
- [ ] Implement proper HTTP status codes

### Priority 4: Advanced Features

**Effort Level:** Ongoing programme, not a one-time project. Requires dedicated resources, sustained organizational commitment, and strategic business alignment. Involves building new systems, establishing governance frameworks, and potentially partnering with external platforms. Plan for multi-phase delivery with measurable business outcomes at each stage.

- [ ] Build formal API alongside web interface
- [ ] Implement comprehensive structured data
- [ ] Create agent testing suite
- [ ] Add delegation token system for purchases
- [ ] Develop identity layer integration

Start at the top. Each improvement helps both agents and humans.

## Design Patterns Reference

The following patterns show you precisely what to build. These aren't workarounds - they're the correct way to design web interfaces that work for everyone.

### Pattern 1: Explicit State Attributes

Never rely on visual cues alone. Make state explicit in attributes.

**Bad - Visual only:**

```html
<div class="spinner"></div>
```

**Good - Explicit state:**

```html
<div class="loading-indicator"
     data-state="loading"
     data-started="2025-12-21T10:30:00Z"
     data-expected-duration="2000"
     role="status"
     aria-live="polite">
  Loading product information (estimated 2 seconds)
</div>
```

When complete:

```html
<div class="product-data"
     data-state="loaded"
     data-loaded-at="2025-12-21T10:30:02Z">
  <!-- Content here -->
</div>
```

**Why this works:** Agents can check `data-state`. Humans see the text. Screen readers announce changes via `aria-live`. Everyone knows what's happening.

### Pattern 2: Disabled Buttons That Explain Themselves

Don't just disable buttons. Explain why they're disabled and what's needed.

**Bad - Mysterious:**

```html
<button disabled>Submit</button>
```

**Good - Informative:**

```html
<button disabled
        aria-disabled="true"
        aria-describedby="submit-status"
        data-disabled-reason="3 fields incomplete">
  Submit (3 errors remaining)
</button>

<div id="submit-status" class="form-status" role="status">
  Form completion: 60%
  Required fields remaining: 3
  <ul>
    <li>Email address required</li>
    <li>Postcode format incorrect</li>
    <li>Payment method not selected</li>
  </ul>
</div>
```

**Why this works:** Everyone knows precisely what's needed to proceed. No guessing.

### Pattern 3: Complete Content on One Page

Stop splitting content unnecessarily. Show everything with good organisation.

**Bad - Forced pagination:**

```text
Day 1: Bangkok details
[Page 1 of 14] [Next →]
```

**Good - Complete with navigation:**

```html
<article class="tour-itinerary">
  <h1>14-Day Southeast Asia Adventure</h1>

  <!-- Quick navigation -->
  <nav class="day-navigation" aria-label="Jump to day">
    <a href="#day-1">Day 1: Bangkok</a>
    <a href="#day-2">Day 2: Ayutthaya</a>
    <!-- Through day 14 -->
  </nav>

  <!-- All days on one page -->
  <section id="day-1" class="day-detail">
    <h2>Day 1 - Bangkok</h2>
    <p>Arrive in Bangkok...</p>
    <dl>
      <dt>Accommodation</dt>
      <dd>Grande Centre Point Hotel</dd>
      <dt>Meals</dt>
      <dd>Dinner included</dd>
    </dl>
  </section>

  <!-- Days 2-14 follow -->
</article>
```

**Benefits:** Agents can see everything in a single request. Humans can scan the full content. The browser find (Ctrl+F) works across all content. Screen readers can navigate by heading. Printable as single document.

### Pattern 4: Honest Pricing Structure

Show complete costs upfront—no surprises at checkout.

**Bad - Hidden costs:**

```html
<p class="price">From £99</p>
```

**Good - Complete and honest:**

```html
<div class="product-price">
  <span class="currency">£</span>
  <span class="amount">149.99</span>
  <span class="vat-status">inc. VAT</span>
</div>

<details class="price-breakdown">
  <summary>Price breakdown</summary>
  <dl>
    <dt>Product price</dt>
    <dd>£139.99</dd>
    <dt>Shipping</dt>
    <dd>£10.00</dd>
    <dt>VAT (included)</dt>
    <dd>£25.00</dd>
    <dt>Total</dt>
    <dd>£149.99</dd>
  </dl>
</details>
```

**Why this works:** No deceptive "from" pricing. Complete costs are visible. Breakdown available but not intrusive.

### Pattern 5: The Small Business Template

You don't need complex infrastructure. Here's a complete restaurant site that works perfectly for agents:

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <title>Luigi's Pizza - Manchester</title>
</head>
<body>

<div itemscope itemtype="https://schema.org/Restaurant">
  <h1 itemprop="name">Luigi's Pizza</h1>

  <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
    <p>
      <span itemprop="streetAddress">123 Main Street</span>,
      <span itemprop="addressLocality">Manchester</span>,
      <span itemprop="postalCode">M1 1AA</span>
    </p>
  </div>

  <p>Phone: <span itemprop="telephone">0161 123 4567</span></p>

  <p>Open:
    <time itemprop="openingHours" datetime="Mo-Su 11:00-22:00">
      11am - 10pm daily
    </time>
  </p>

  <div itemprop="menu" itemscope itemtype="https://schema.org/Menu">
    <h2>Menu</h2>

    <div itemprop="hasMenuSection" itemscope itemtype="https://schema.org/MenuSection">
      <h3 itemprop="name">Pizzas</h3>

      <div itemprop="hasMenuItem" itemscope itemtype="https://schema.org/MenuItem">
        <p>
          <span itemprop="name">Margherita</span> -
          <span itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <span itemprop="priceCurrency" content="GBP">£</span>
            <span itemprop="price">12.99</span>
          </span>
        </p>
        <p itemprop="description">Tomato sauce, mozzarella, fresh basil</p>
      </div>

      <!-- More items -->
    </div>
  </div>
</div>

</body>
</html>
```

**What this enables:**

- Agents find your address and phone number reliably
- They determine if you're open right now
- They read your menu with accurate prices
- Google displays rich snippets in search
- Voice assistants can answer questions about your business

**Implementation time:** Two hours including learning the schema markup.

**Cost:** Zero. No JavaScript, no frameworks, no APIs needed.

### Pattern 6: Schema.org Quick Reference

The most useful schema types for different businesses:

**Product (E-commerce):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Wireless Headphones",
  "sku": "WH-1000",
  "brand": {
    "@type": "Brand",
    "name": "AudioTech"
  },
  "offers": {
    "@type": "Offer",
    "price": "149.99",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock",
    "inventoryLevel": 23
  }
}
</script>
```

**Local Business (Shops, Restaurants):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Luigi's Pizza",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Manchester",
    "postalCode": "M1 1AA"
  },
  "telephone": "0161-123-4567",
  "openingHours": "Mo-Su 11:00-22:00"
}
</script>
```

**Event (Conferences, Concerts):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Tech Conference 2025",
  "startDate": "2025-06-15T09:00",
  "endDate": "2025-06-15T17:00",
  "location": {
    "@type": "Place",
    "name": "Conference Centre",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London"
    }
  },
  "offers": {
    "@type": "Offer",
    "price": "299",
    "priceCurrency": "GBP"
  }
}
</script>
```

**Article (Blogs, News):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Build Agent-Friendly Websites",
  "author": {
    "@type": "Person",
    "name": "Jane Developer"
  },
  "datePublished": "2025-01-15",
  "publisher": {
    "@type": "Organization",
    "name": "Tech Blog"
  }
}
</script>
```

Pick the type that matches your content. Add it to your `<head>` section. That's it.

### Pattern 7: Agent-Readable Purchase Instructions

For e-commerce sites, tell agents exactly what to do:

```html
<div class="agent-metadata" data-agent-visible="true" style="display: none;">
  <h2>Purchase Information</h2>
  <dl>
    <dt>Action</dt>
    <dd>POST to /cart/add</dd>

    <dt>Required parameters</dt>
    <dd>product_id=12345, quantity (1-10)</dd>

    <dt>Prerequisites</dt>
    <dd>
      <ul>
        <li>Authentication: Required (status: <span id="auth-status">authenticated</span>)</li>
        <li>Payment method: Required (status: <span id="payment-status">configured</span>)</li>
        <li>Shipping address: Required (status: <span id="shipping-status">set</span>)</li>
      </ul>
    </dd>

    <dt>Expected response</dt>
    <dd>Success: 303 redirect to /cart/added | Error: 400 with JSON error details</dd>
  </dl>
</div>
```

Hidden from humans with `display: none`, but visible to agents parsing the DOM. Update the status spans with JavaScript based on actual session state.

### Pattern 8: Testing for Agent Compatibility

Verify your implementations work:

```javascript
const { test, expect } = require('@playwright/test');

test('form state is explicit', async ({ page }) => {
  await page.goto('/booking');

  // Form must have state attribute
  const formState = await page.getAttribute('form', 'data-state');
  expect(formState).toBeDefined();
  expect(['complete', 'incomplete']).toContain(formState);

  // Fields must have validation state
  const emailState = await page.getAttribute(
    '#email',
    'data-validation-state'
  );
  expect(emailState).toBeDefined();
  expect(['valid', 'invalid', 'empty']).toContain(emailState);
});

test('errors persist, never disappear', async ({ page }) => {
  await page.goto('/checkout');

  // Submit with invalid data
  await page.fill('#email', 'not-an-email');
  await page.click('[type="submit"]');

  // Error must appear
  const errorVisible = await page.isVisible('.error-summary');
  expect(errorVisible).toBe(true);

  // Wait 5 seconds - error must still be there
  await page.waitForTimeout(5000);
  const stillVisible = await page.isVisible('.error-summary');
  expect(stillVisible).toBe(true);
});

test('pricing is complete and honest', async ({ page }) => {
  await page.goto('/product/12345');

  // Must have structured price data
  const jsonLd = await page.textContent('script[type="application/ld+json"]');
  const data = JSON.parse(jsonLd);

  expect(data.offers.price).toBeDefined();
  expect(data.offers.priceCurrency).toBeDefined();

  // Visual price must match structured data
  const displayPrice = await page.textContent('[itemprop="price"]');
  expect(displayPrice).toBe(data.offers.price);
});

test('no information vanishes', async ({ page }) => {
  await page.goto('/booking');

  // Capture content
  const initialContent = await page.textContent('body');

  // Wait for any timed elements (toasts, etc)
  await page.waitForTimeout(10000);

  // Content must still be there
  const finalContent = await page.textContent('body');
  expect(finalContent.length).toBeGreaterThanOrEqual(
    initialContent.length * 0.95
  );
});
```

Run these tests on every deployment. If they fail, you've broken agent compatibility.

### Pattern 9: Validation Tools

Verify your implementations:

**Structured Data:**

- Google Rich Results Test: `https://search.google.com/test/rich-results`
- Schema Markup Validator: `https://validator.schema.org`

**HTML Quality:**

- W3C HTML Validator: `https://validator.w3.org`
- Check for semantic correctness

**Accessibility (which helps agents):**

- WAVE: `https://wave.webaim.org`
- axe DevTools browser extension
- Screen reader testing (helps identify structural issues)

### Pattern 10: The Three-Layer Approach

Use all three together for maximum clarity:

**Layer 1 - llms.txt (site-wide defaults):**

```text
# /llms.txt
> TechStore - Electronics retailer
preferred-access: api
api-endpoint: https://api.techstore.com/v1
rate-limit: 100/minute
extraction: product-data-allowed
```

**Layer 2 - Meta tags (page-specific):**

```html
<head>
  <meta name="ai-api-endpoint" content="/api/v1/products/WH-1000">
  <meta name="ai-freshness" content="hourly">
  <meta name="ai-content-policy" content="full-extraction-allowed">
</head>
```

**Layer 3 - JSON-LD (actual content):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Wireless Headphones",
  "offers": {
    "@type": "Offer",
    "price": "149.99",
    "priceCurrency": "GBP"
  }
}
</script>
```

An agent visiting your page:

1. Checks llms.txt - learns you have an API
2. Reads meta tags - finds this product's API endpoint
3. Fetches structured data - gets complete product information
4. Respects your rate limits and policies

## Common Mistakes to Avoid

### Mistake 1: Animations That Hide State

**Don't do this:**

```css
.toast {
  animation: slideIn 0.3s, fadeOut 2.7s 0.3s forwards;
}
```

**Do this instead:**

```css
.error-message {
  /* No animations */
  display: block;
  position: relative;
}

/* For agents, disable all animations */
body.agent-mode * {
  animation-duration: 0ms !important;
  transition-duration: 0ms !important;
}
```

### Mistake 2: Client-Side Validation Only

**Don't do this:**

```javascript
// Only validate on submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const errors = validate(form);
  if (errors.length > 0) showErrors(errors);
});
```

**Do this instead:**

```javascript
// Validate on every change
fields.forEach(field => {
  field.addEventListener('input', () => validateField(field));
  field.addEventListener('blur', () => validateField(field));
});

// Always show current validation state in DOM
function validateField(field) {
  const state = checkField(field);
  field.setAttribute('data-validation-state', state);
  updateFieldMessage(field, state);
}
```

### Mistake 3: Ambiguous Success

**Don't do this:**

```javascript
// POST returns 200, content updates, URL stays same
app.post('/cart/add', (req, res) => {
  addToCart(req.body);
  res.status(200).json({ success: true });
});
```

**Do this instead:**

```javascript
// POST returns 303, redirects to distinct confirmation URL
app.post('/cart/add', (req, res) => {
  const result = addToCart(req.body);
  res.redirect(303, `/cart/added?order=${result.orderId}`);
});
```

### Mistake 4: Visual Hierarchy Without Semantic Structure

**Don't do this:**

```html
<div class="big-text">Product Name</div>
<div class="medium-text">Description</div>
<div class="small-text">Price</div>
```

**Do this instead:**

```html
<h1>Product Name</h1>
<p>Description</p>
<div class="price">
  <span itemprop="priceCurrency" content="GBP">£</span>
  <span itemprop="price">149.99</span>
</div>
```

### Mistake 5: Inconsistent Field Names

**Don't do this:**

```html
<!-- Registration page -->
<input name="email_address">

<!-- Login page -->
<input name="user_email">

<!-- Profile page -->
<input name="email">
```

**Do this instead:**

```html
<!-- Consistent everywhere -->
<input name="email">
```

### Mistake 6: Hidden Required Information

**Don't do this:**

```html
<!-- Important info in closed accordion -->
<details>
  <summary>Shipping details</summary>
  <p>Free shipping on orders over £50</p>
</details>
```

**Do this instead:**

```html
<!-- Critical info always visible -->
<div class="shipping-info">
  <p>Free shipping on orders over £50</p>
  <details>
    <summary>Delivery times and restrictions</summary>
    <p>Additional details...</p>
  </details>
</div>
```

## What Good Looks Like at Scale

### Solo Developer / Small Business

**Your goal:** Basic agent compatibility in a few hours

**Implement:**

- One piece of structured data (address, menu, or products)
- Clear contact information
- Complete pricing with no hidden fees
- Forms with immediate validation
- Content on single pages (no forced pagination)

**Result:** Visible to agents, better search results, and more precise for everyone.

### Medium Business

**Your goal:** Systematic agent support

**Implement:**

- Structured data across the product catalogue
- Basic API for everyday operations
- Clear error messages throughout
- Multi-step processes with progress indicators
- Agent detection and segmented analytics

**Result:** Measurable improvement in agent conversion rates.

### Enterprise

**Your goal:** Competitive advantage in agent-mediated commerce

**Implement:**

- Full APIs with comprehensive documentation
- Agent-specific endpoints with appropriate rate limits
- Identity delegation support
- Complete structured data with full specifications
- Dedicated agent testing and monitoring
- Agent compatibility team

**Result:** Leadership position as agent traffic grows.

Don't let "we can't do everything" prevent you from doing something. Start at your scale.

## Further Resources

This chapter provided implementation guidance integrated with the book's narrative. For additional prescriptive reference material:

**Building HTML for AI Agents (appendix-ai-friendly-html-guide.md)** - A comprehensive 12-part builder's guide (~8,400 words) with quick reference tables, HTML patterns, server-side implementations, complete examples, and testing strategies. Organised by implementation complexity from immediate fixes to quarterly projects. Includes Luigi's Pizza template for small businesses and complete e-commerce product page patterns.

**HTML Patterns for AI Agents (appendix-ai-patterns-quick-reference.md)** - A concise, quick-reference guide (~1,200 words) for AI coding assistants. Contains data attribute standards, form field naming conventions, and ready-to-use HTML snippets for common patterns like authentication state, shopping carts, search results, and order confirmations.

Both guides complement this chapter with additional patterns and examples not covered in the main narrative. The appendix-ai-friendly-html-guide.md file provides the "how to build" prescriptive guidance, whilst appendix-ai-patterns-quick-reference.md serves as a rapid reference for code generation.

## The Path Forward

This chapter gave you concrete implementations. The code works - these patterns are foundational and practical. But implementation alone won't solve everything.

You also need to understand the business tensions from Chapter 4, the security challenges from Chapter 6, and the accessibility imperative from Chapter 1. Technical solutions work when they account for human reality.

The web is changing. Sites that adapt now will serve agents successfully while improving the experience for everyone. Sites that ignore this will watch conversion rates drop as agent traffic increases, never understanding why.

The choice is yours.

**What about agent creators?** This chapter addressed what website builders should implement. **Chapter 11: What Agent Creators Must Build** completes the picture by showing what validation layers, confidence scoring, and guardrails agent creators should implement to prevent pipeline failures like the £203,000 pricing error. Both sides - website builders and agent creators - must improve to create a reliable agent-mediated web.

---

## Explore Further

If you found this book valuable and need to assess your website's agent compatibility, the **Web Audit Suite** is available as a separate purchase or professional audit service. It provides comprehensive automated analysis with 18 detailed reports covering traditional web metrics and LLM suitability scoring.

**By building for machines, we might finally create the clearer, more honest web we should have built all along.**

---

December 2025
