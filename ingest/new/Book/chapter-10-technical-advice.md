# Chapter 10 - Technical Advice

I've spent nine chapters explaining what's broken and why it matters. Now let me show you how to fix it.

This chapter provides code you can use tomorrow. Not theoretical patterns or abstract principles - actual implementations you can copy into your projects. I'll start with the simplest improvements and build towards more complex solutions, including the identity delegation system that solves the customer relationship problem we identified in Chapter 4.

## Starting Simple

The quickest improvement costs nothing and requires no code. Review your site with these questions:

**Do your error messages persist?** If they appear in toasts that vanish, move them to permanent locations. A `<div>` at the top of your form that stays visible until the user fixes the problem.

**Is your pricing complete?** If you show "From £99" but the real price is £149, you're setting up failure. Show the full price upfront, with a breakdown if needed.

**Can someone see your full catalogue without pagination?** If you're splitting product listings across 20 pages when they could fit on one scrollable page, you're making everyone work harder than necessary.

These aren't technical challenges. They're choices. Make different ones.

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

This checks for patterns agents exhibit: completing forms impossibly fast, clicking without mouse movement, technical signatures that reveal automation frameworks. When detected, it adds an `agent-mode` class to the body element, which you can use to adjust behaviour.

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

Once you know you're dealing with an agent, you can adapt. Not by blocking them, but by serving content that works for both audiences.

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

Every field shows its status immediately. The submit button explains exactly why it's disabled. No surprises on submission because all validation happened beforehand. This works for humans who see errors as they go, and agents who can read the current state at any time.

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

The JSON-LD provides structured data that search engines and agents can parse reliably. The hidden agent metadata gives step-by-step instructions that a machine can follow. Humans never see this div, but agents can read it to understand exactly what's needed.

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
- **Distinct URLs** for each state (agents can verify state by checking URL)
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

Beyond structured data on individual pages, agents need site-wide guidance. Two emerging patterns address this: `llms.txt` files and meta tags.

### The llms.txt File

Think of `llms.txt` as `robots.txt` for AI agents. It lives at the root of your site and tells agents how to interact with your content.

**Location:** `https://example.com/llms.txt`

**Basic Structure:**

```
# llms.txt - AI Agent Guidance for Example Shop
# Last updated: 2025-01-15

# Site description
> Example Shop sells electronics and home goods. 
> We welcome AI agents acting on behalf of authenticated customers.

# Preferred access method
preferred-access: api
api-endpoint: https://api.example.com/v1
api-docs: https://developers.example.com/docs

# Content that agents can freely access
allow: /products/*
allow: /categories/*
allow: /search
allow: /store-locations

# Content requiring authentication
auth-required: /account/*
auth-required: /orders/*
auth-required: /checkout

# Content agents should not access
disallow: /admin/*
disallow: /internal/*

# Rate limits
rate-limit: 60/minute for unauthenticated
rate-limit: 200/minute for authenticated

# Attribution requirements
attribution: required
attribution-format: "Source: Example Shop (example.com)"

# Content extraction policy
extraction: summaries-allowed
extraction: full-text-prohibited
extraction: prices-allowed
extraction: images-prohibited

# Contact for agent-related issues
agent-contact: agents@example.com

# Identity delegation support
identity-delegation: supported
delegation-endpoint: /api/auth/delegate
delegation-docs: https://developers.example.com/delegation
```

**E-commerce Example:**

```
# llms.txt for RetailCo

> RetailCo is an online retailer. AI agents may browse products, 
> compare prices, and complete purchases on behalf of customers
> with valid delegation tokens.

preferred-access: api
api-endpoint: https://api.retailco.com/v2
api-docs: https://developers.retailco.com

allow: /products/*
allow: /categories/*
allow: /reviews/*
allow: /availability/*

auth-required: /cart/*
auth-required: /checkout/*
auth-required: /account/*

rate-limit: 100/minute
rate-limit: 500/minute with-api-key

identity-delegation: supported
delegation-endpoint: /api/delegate
loyalty-integration: supported
warranty-registration: supported

extraction: product-data-allowed
extraction: review-summaries-allowed
extraction: pricing-allowed
attribution: appreciated but not required

agent-contact: api-support@retailco.com
```

**Content Publisher Example:**

```
# llms.txt for NewsDaily

> NewsDaily is a news publication. We permit limited access 
> for personal research but prohibit commercial extraction.

preferred-access: html
api-endpoint: none

allow: /articles/* (read-only)
allow: /authors/*
allow: /topics/*

disallow: /subscriber-only/*
disallow: /archive/* (pre-2020)

rate-limit: 20/minute

extraction: headlines-allowed
extraction: summaries-allowed (max 100 words)
extraction: full-text-prohibited
extraction: images-prohibited

attribution: required
attribution-format: "Via NewsDaily: [article-title] ([url])"

commercial-use: prohibited without license
licensing-contact: licensing@newsdaily.com
```

**SaaS Application Example:**

```
# llms.txt for ProjectManager Pro

> ProjectManager Pro is a project management SaaS. 
> AI agents require OAuth authentication for all access.

preferred-access: api
api-endpoint: https://api.projectmanager.pro/v1
api-docs: https://docs.projectmanager.pro/api
api-auth: oauth2

allow: /public/templates/*
allow: /public/guides/*

auth-required: /projects/*
auth-required: /tasks/*
auth-required: /team/*
auth-required: /reports/*

rate-limit: 100/minute per-user
rate-limit: 1000/minute per-organisation

identity-delegation: supported
delegation-scopes: read-projects, write-tasks, read-reports
delegation-endpoint: /oauth/delegate

extraction: user-data-prohibited
extraction: project-summaries-allowed (with auth)

agent-contact: api@projectmanager.pro
```

### Meta Tags for Page-Level Guidance

While `llms.txt` provides site-wide defaults, meta tags give page-specific instructions:

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

```
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

```
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

## The Identity Layer

This is where we solve the customer relationship problem from Chapter 4. When an agent makes a purchase, the business loses the connection to the actual customer. No loyalty points. No warranty registration. No personalisation data.

The solution is a delegation token that carries customer identity through the transaction:

```javascript
// Customer authorisation flow
class IdentityDelegation {
  constructor() {
    this.endpoint = '/api/agent/delegate';
  }
  
  async generateToken(userId, permissions, duration) {
    const payload = {
      customer_id: userId,
      permissions: permissions,
      expires_at: Date.now() + duration,
      issued_at: Date.now()
    };
    
    const signature = await this.sign(payload);
    
    return btoa(JSON.stringify({
      ...payload,
      signature: signature
    }));
  }
  
  async sign(payload) {
    // In production, use proper cryptographic signing
    // This is simplified for illustration
    const message = JSON.stringify(payload);
    const key = await this.getSigningKey();
    
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const keyData = encoder.encode(key);
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signature = await crypto.subtle.sign(
      'HMAC',
      cryptoKey,
      data
    );
    
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
  
  async getSigningKey() {
    // Fetch from secure storage
    return 'your-secret-key-here';
  }
}

// Usage in checkout flow
async function initiateAgentPurchase() {
  const delegation = new IdentityDelegation();
  
  const token = await delegation.generateToken(
    currentUser.id,
    ['purchase', 'loyalty', 'warranty'],
    3600000 // 1 hour
  );
  
  // Display to user
  document.getElementById('agent-token').textContent = token;
  
  // Or pass to agent platform via URL parameter
  const agentUrl = `https://agent-platform.com/execute?` +
    `task=purchase&` +
    `site=${encodeURIComponent(window.location.origin)}&` +
    `token=${encodeURIComponent(token)}`;
    
  return agentUrl;
}
```

The server validates and uses this token:

```javascript
// Server-side validation and processing
function verifyDelegationToken(token) {
  try {
    const decoded = JSON.parse(atob(token));
    
    // Check expiry
    if (decoded.expires_at < Date.now()) {
      return { valid: false, reason: 'Token expired' };
    }
    
    // Verify signature
    const { signature, ...payload } = decoded;
    const expectedSig = generateSignature(payload);
    
    if (signature !== expectedSig) {
      return { valid: false, reason: 'Invalid signature' };
    }
    
    return {
      valid: true,
      customerId: decoded.customer_id,
      permissions: decoded.permissions
    };
  } catch (error) {
    return { valid: false, reason: 'Malformed token' };
  }
}

// Process purchase with customer identity
app.post('/cart/add', (req, res) => {
  const token = req.body.delegation_token;
  
  if (!token) {
    return res.status(401).json({
      error: 'Agent purchases require delegation token'
    });
  }
  
  const verification = verifyDelegationToken(token);
  
  if (!verification.valid) {
    return res.status(403).json({
      error: 'Invalid token',
      reason: verification.reason
    });
  }
  
  // Process purchase with customer identity intact
  const customer = getCustomer(verification.customerId);
  
  const purchase = {
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    customer_id: customer.id,
    purchased_by: 'agent',
    agent_platform: req.headers['user-agent']
  };
  
  // Award loyalty points to actual customer
  if (verification.permissions.includes('loyalty')) {
    awardLoyaltyPoints(customer.id, purchase.total * 0.05);
  }
  
  // Register warranty to customer
  if (verification.permissions.includes('warranty')) {
    registerWarranty({
      product_id: purchase.product_id,
      customer_id: customer.id,
      purchase_date: new Date()
    });
  }
  
  processPurchase(purchase);
  
  res.json({
    success: true,
    order_id: purchase.id,
    customer_benefits: {
      loyalty_points_earned: Math.floor(purchase.total * 0.05),
      warranty_registered: true
    }
  });
});
```

This preserves the customer relationship. The business knows who made the purchase, can award loyalty points, register warranties, and maintain personalisation data. The customer gets their benefits. The agent platform just facilitates the transaction.

The UI for generating tokens should be simple:

```html
<div class="agent-authorization">
  <h3>Authorize Agent Purchase</h3>
  <p>Allow your AI assistant to make purchases on your behalf:</p>
  
  <form id="delegation-form">
    <label>
      <input type="checkbox" name="permission" value="purchase" checked disabled>
      Complete purchases
    </label>
    
    <label>
      <input type="checkbox" name="permission" value="loyalty" checked>
      Earn loyalty points in my account
    </label>
    
    <label>
      <input type="checkbox" name="permission" value="warranty">
      Register warranties to me
    </label>
    
    <label>
      Duration:
      <select name="duration">
        <option value="3600000">1 hour</option>
        <option value="86400000">24 hours</option>
        <option value="604800000">7 days</option>
      </select>
    </label>
    
    <button type="submit">Generate Token</button>
  </form>
  
  <div id="token-display" style="display: none;">
    <p>Provide this token to your agent:</p>
    <code id="agent-token"></code>
    <button onclick="copyToken()">Copy</button>
    <p class="warning">This token grants purchase authority. 
       Keep it secure and revoke when done.</p>
  </div>
</div>
```

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

This tells you: Are agents succeeding at the same rate as humans? Where are they failing? Which tasks take agents longer?

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

This helps you identify: What's breaking most often? Which pages have problems? When did failures start occurring?

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

```
# /agent-changelog.txt

## Version 2.5 (2025-01-15)
- Renamed email_address field to email (old name still accepted)
- Added structured data for product availability
- New delegation endpoint at /api/auth/delegate

## Version 2.4 (2024-12-01)
- Updated checkout flow (now 3 steps instead of 5)
- Removed deprecated /api/v1 endpoints (use /api/v2)
```

## Quick Wins Checklist

If you can only make a few changes, prioritise these:

**Immediate (0-2 hours):**
- [ ] Make error messages persistent (remove toast notifications)
- [ ] Show complete pricing upfront (no hidden fees)
- [ ] Add one piece of JSON-LD structured data
- [ ] Check forms show validation errors immediately

**This week (2-8 hours):**
- [ ] Add explicit state attributes to loading elements
- [ ] Provide complete information on single pages (reduce pagination)
- [ ] Implement synchronous form validation
- [ ] Add agent metadata to key pages
- [ ] Create basic llms.txt file

**This month (1-2 days):**
- [ ] Implement agent detection
- [ ] Create agent-optimised view of forms
- [ ] Add meta tags to key pages
- [ ] Set up segmented analytics
- [ ] Implement proper HTTP status codes

**This quarter (1-2 weeks):**
- [ ] Build formal API alongside web interface
- [ ] Implement comprehensive structured data
- [ ] Create agent testing suite
- [ ] Add delegation token system for purchases
- [ ] Develop identity layer integration

Start at the top. Each improvement helps both agents and humans.

## The Path Forward

This chapter gave you concrete implementations. The code works - I've tested these patterns on production sites. But implementation alone won't solve everything.

You also need to understand the business tensions from Chapter 4, the security challenges from Chapter 6, and the accessibility imperative from Chapter 1. Technical solutions work when they account for human reality.

The web is changing. Sites that adapt now will serve agents successfully whilst improving experiences for everyone. Sites that ignore this will watch conversion rates drop as agent traffic increases, never understanding why.

The choice is yours. The code is here. Use it.
