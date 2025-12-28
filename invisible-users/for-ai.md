# HTML Patterns for AI Agents

> Quick reference for AI assistants generating HTML that works for both humans and AI agents.
> Use explicit state, semantic markup, and machine-readable data attributes.

**Important:** This guide uses both established standards (Schema.org, semantic HTML, ARIA) and proposed patterns (ai-* meta tags, data-agent-visible) that are not yet standardised. All patterns are forward-compatible and won't break if ignored by agents.

## Core Rules

1. State goes in data attributes, not just CSS classes
2. Errors persist until fixed — no toast notifications
3. All information on one page — avoid pagination
4. Prices shown are complete and upfront — no "from £X"
5. Forms validate synchronously — show all errors at once
6. Use semantic HTML elements — nav, main, article, section, dialog

---

## Data Attributes Reference

Use these consistently:

| Attribute | Values | Use On |
| --------- | ------ | ------ |
| data-state | loading, loaded, error, empty | Containers |
| data-validation-state | valid, invalid, pending | Form fields |
| data-authenticated | true, false | Auth status container |
| data-product-id | SKU or ID | Product elements |
| data-price | Numeric (149.99) | Price displays |
| data-currency | GBP, USD, EUR | Price displays |
| data-quantity | Numeric | Stock, cart items |
| data-in-stock | true, false | Product availability |
| data-page | Numeric | Pagination |
| data-total-pages | Numeric | Pagination |
| data-total-results | Numeric | Search results |
| data-sort | relevance, price-asc, date-desc | Result listings |
| data-error-code | ERROR_TYPE | Error messages |
| data-step | Numeric | Multi-step forms |
| data-total-steps | Numeric | Multi-step forms |

---

## Form Field Names

Use standard names:

| Data | Name |
| ---- | ---- |
| Email | email |
| First name | firstName |
| Last name | lastName |
| Phone | phone |
| Postcode | postcode |
| Address line 1 | address1 |
| Address line 2 | address2 |
| City | city |
| Country | country |
| Card number | cardNumber |
| Expiry | expiryDate |
| CVV | cvv |
| Password | password |
| Quantity | quantity |

---

## HTML Patterns

### Authentication State

```html
<!-- Logged in -->
<div id="auth-status" 
     data-authenticated="true"
     data-user-id="user-456">
  Signed in as tom@example.com
  <a href="/account">Account</a>
  <form action="/logout" method="POST">
    <button type="submit">Sign out</button>
  </form>
</div>

<!-- Logged out -->
<div id="auth-status" data-authenticated="false">
  <a href="/login">Sign in</a>
  <a href="/register">Create account</a>
</div>
```

### Loading State

```html
<div data-state="loading"
     role="status"
     aria-live="polite">
  Loading product information...
</div>

<!-- When loaded -->
<div data-state="loaded">
  <!-- Content -->
</div>
```

### Form with Validation

```html
<form action="/checkout" method="POST"
      data-state="incomplete"
      data-errors="2">
  
  <div class="error-summary" role="alert">
    <h2>2 errors need fixing</h2>
    <ul>
      <li><a href="#email">Email: Enter a valid email</a></li>
      <li><a href="#postcode">Postcode: Required</a></li>
    </ul>
  </div>

  <div class="field">
    <label for="email">Email</label>
    <input type="email" 
           id="email" 
           name="email"
           aria-invalid="true"
           aria-describedby="email-error"
           data-validation-state="invalid">
    <div id="email-error" role="alert">
      Enter a valid email (example: name@company.com)
    </div>
  </div>

  <div class="field">
    <label for="name">Name</label>
    <input type="text" 
           id="name" 
           name="firstName"
           data-validation-state="valid">
  </div>

  <button type="submit" 
          disabled
          aria-disabled="true"
          data-disabled-reason="2 fields incomplete">
    Submit (fix 2 errors first)
  </button>
</form>
```

### Disabled Button with Reason

```html
<button disabled
        aria-disabled="true"
        aria-describedby="submit-status"
        data-disabled-reason="3 fields incomplete">
  Submit (3 errors remaining)
</button>

<div id="submit-status" role="status">
  Required fields remaining:
  <ul>
    <li>Email address</li>
    <li>Postcode</li>
    <li>Payment method</li>
  </ul>
</div>
```

### Price Display

```html
<div class="price"
     data-price="149.99"
     data-currency="GBP">
  <span class="currency">£</span>
  <span class="amount">149.99</span>
  <span class="vat-status">inc. VAT</span>
</div>

<details class="price-breakdown">
  <summary>Price breakdown</summary>
  <dl>
    <dt>Product</dt>
    <dd>£124.99</dd>
    <dt>VAT</dt>
    <dd>£25.00</dd>
    <dt>Total</dt>
    <dd>£149.99</dd>
  </dl>
</details>
```

### Product with Stock

```html
<div class="product"
     data-product-id="WH-1000"
     data-in-stock="true"
     data-quantity="23">
  <h1>Wireless Headphones</h1>
  <p class="stock">In stock (23 available)</p>
  <p class="price" data-price="149.99" data-currency="GBP">£149.99</p>
  
  <form action="/cart/add" method="POST">
    <input type="hidden" name="product_id" value="WH-1000">
    <label for="qty">Quantity</label>
    <input type="number" id="qty" name="quantity" value="1" min="1" max="23">
    <button type="submit">Add to basket</button>
  </form>
</div>
```

### Breadcrumbs

```html
<nav aria-label="Breadcrumb">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/"><span itemprop="name">Home</span></a>
      <meta itemprop="position" content="1">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/electronics"><span itemprop="name">Electronics</span></a>
      <meta itemprop="position" content="2">
    </li>
    <li aria-current="page">
      <span itemprop="name">Headphones</span>
      <meta itemprop="position" content="3">
    </li>
  </ol>
</nav>
```

### Search Results

```html
<div class="search-results" 
     data-query="headphones"
     data-total-results="47"
     data-page="1"
     data-per-page="20">
  
  <p>Showing 1-20 of 47 results for "headphones"</p>
  
  <ol>
    <li data-product-id="WH-1000">
      <a href="/products/wh-1000">Wireless Headphones</a>
      <span data-price="149.99" data-currency="GBP">£149.99</span>
    </li>
  </ol>
  
  <nav aria-label="Pagination"
       data-current-page="1"
       data-total-pages="3">
    <span aria-current="page">Page 1 of 3</span>
    <a href="?q=headphones&page=2" rel="next">Next</a>
  </nav>
</div>
```

### Active Filters

```html
<div class="active-filters" data-active-filters="2">
  <p>Active filters:</p>
  <ul>
    <li>
      <span data-filter="category" data-value="headphones">Category: Headphones</span>
      <a href="?brand=sony" aria-label="Remove category filter">×</a>
    </li>
    <li>
      <span data-filter="brand" data-value="sony">Brand: Sony</span>
      <a href="?category=headphones" aria-label="Remove brand filter">×</a>
    </li>
  </ul>
  <a href="/products">Clear all</a>
</div>
```

### Shopping Cart

```html
<div id="shopping-cart" 
     data-item-count="2"
     data-subtotal="279.98"
     data-currency="GBP">
  
  <h2>Your basket (2 items)</h2>
  
  <ul>
    <li data-product-id="WH-1000" 
        data-quantity="1" 
        data-unit-price="149.99">
      <span>Wireless Headphones</span>
      <span>Qty: 1</span>
      <span data-price="149.99">£149.99</span>
      <form action="/cart/remove" method="POST">
        <input type="hidden" name="product_id" value="WH-1000">
        <button type="submit">Remove</button>
      </form>
    </li>
  </ul>
  
  <dl class="totals">
    <dt>Subtotal</dt>
    <dd data-subtotal="279.98">£279.98</dd>
    <dt>Shipping</dt>
    <dd data-shipping="0">Free</dd>
    <dt>Total</dt>
    <dd data-total="279.98">£279.98</dd>
  </dl>
  
  <a href="/checkout" data-checkout-ready="true">Checkout</a>
</div>
```

### Order Confirmation

```html
<div class="order-confirmation" 
     role="status"
     data-order-status="confirmed"
     data-order-id="ORD-2025-001">
  
  <h1>Order confirmed</h1>
  
  <dl>
    <dt>Order number</dt>
    <dd data-order-id="ORD-2025-001">ORD-2025-001</dd>
    
    <dt>Total paid</dt>
    <dd data-total="279.98" data-currency="GBP">£279.98</dd>
    
    <dt>Delivery</dt>
    <dd data-delivery-date="2025-01-20">20 January 2025</dd>
  </dl>
  
  <a href="/orders/ORD-2025-001">Track order</a>
</div>
```

### Shipping Options

```html
<fieldset class="shipping-options">
  <legend>Delivery</legend>
  
  <label>
    <input type="radio" name="shipping" value="standard"
           data-price="0" data-days="3-5" checked>
    <span>Standard — Free (3-5 days)</span>
  </label>
  
  <label>
    <input type="radio" name="shipping" value="express"
           data-price="5.99" data-days="1-2">
    <span>Express — £5.99 (1-2 days)</span>
  </label>
</fieldset>
```

### Dialog/Modal

```html
<dialog id="confirm-delete" 
        open
        aria-labelledby="dialog-title"
        data-action="confirm-deletion"
        data-target-id="item-123">
  
  <h2 id="dialog-title">Delete this item?</h2>
  <p>This cannot be undone.</p>
  
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm" formaction="/items/123/delete" formmethod="POST">
      Delete
    </button>
  </form>
</dialog>
```

### Error Recovery

```html
<div class="error" role="alert" data-error-code="PAYMENT_DECLINED">
  <h2>Payment declined</h2>
  <p>Your card ending 4242 was declined.</p>
  
  <ul class="recovery-options">
    <li><a href="/checkout/payment">Try different card</a></li>
    <li><a href="/checkout/payment?method=paypal">Use PayPal</a></li>
    <li><a href="/cart">Return to basket</a></li>
  </ul>
</div>
```

### Date/Time

```html
<time datetime="2025-01-15T14:30:00Z" data-timezone="Europe/London">
  15 January 2025, 2:30 PM
</time>
```

### Table with Data

```html
<table>
  <caption>Product comparison</caption>
  <thead>
    <tr>
      <th scope="col">Model</th>
      <th scope="col">Price</th>
      <th scope="col">Stock</th>
    </tr>
  </thead>
  <tbody>
    <tr data-product-id="WH-1000">
      <td>AudioTech Pro</td>
      <td data-price="149.99" data-currency="GBP">£149.99</td>
      <td data-in-stock="true" data-quantity="23">In stock</td>
    </tr>
  </tbody>
</table>
```

---

## JSON-LD Template

Include in `<head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Wireless Headphones",
  "description": "Over-ear headphones with noise cancellation",
  "sku": "WH-1000",
  "brand": {
    "@type": "Brand",
    "name": "AudioTech"
  },
  "offers": {
    "@type": "Offer",
    "price": "149.99",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

---

## Production Implementations

For production-ready code, see `code-examples/` directory:

**Platform Configurations:**

- Apache: `code-examples/apache/.htaccess` - HTTP Link headers
- Nginx: `code-examples/nginx/ai-headers.conf` + `rate-limiting.conf` - Headers and rate limiting
- Next.js: `code-examples/nextjs/` - Config, components, API routes
- WordPress: `code-examples/wordpress/` - PHP functions with `posts_per_page` (not deprecated `numberposts`)
- Adobe EDS: `code-examples/eds/helix-query.yaml` - Query index
- Static Sites: `code-examples/static-site/generate-index.js` - Universal generator

**Validation & Monitoring:**

- Development check: `code-examples/validation/verify-ai-simple.js`
- Production check: `code-examples/validation/verify-ai-production.js`
- CI/CD: `code-examples/validation/github-actions.yml`
- Log analysis: `code-examples/monitoring/server-log-analysis.sh`
- Analytics: `code-examples/monitoring/analytics-tracking.js`

All examples use 2025 AI agent user-agents: GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, google-extended, anthropic-ai, cohere-ai, DeepSeek-Bot, Gemini-Bot.

**HTTP Link Header Format (RFC 8288)**: Angle brackets wrap URI only - parameters go outside. Example: `Link: <https://site.com/llms.txt>; rel="llms-txt"`

---

## Do Not

- Use toast notifications that disappear
- Hide prices until checkout
- Require JavaScript for basic content
- Use CSS-only state indicators
- Split content across pages unnecessarily
- Disable buttons without explanation
- Show errors only on submit
- Use ambiguous field names (fname, addr1)
- Omit currency from prices
- Hide form validation until submission

---

## Always

- Put state in data attributes
- Show all errors persistently
- Include complete pricing
- Use semantic HTML elements
- Make forms work without JavaScript
- Include aria attributes for accessibility
- Use standard form field names
- Show stock/availability explicitly
- Include Schema.org markup
- Make dialogs with `<dialog>` element
