# Appendix A: Implementation Cookbook

Quick-reference recipes for common AI agent compatibility patterns. Copy these implementations directly into your projects.

## Recipe 1: Persistent Error Messages

**Problem:** Errors vanish before agents can read them

**Score Impact:** +12 points (error persistence category)

**Implementation:**

```html
<form id="signup-form" data-state="incomplete">
  <!-- Error summary at top -->
  <div id="error-summary" role="alert" class="errors" style="display: none;">
    <h3>Please fix the following errors:</h3>
    <ul id="error-list"></ul>
  </div>

  <!-- Form fields with inline errors -->
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

  <button type="submit">Sign Up</button>
</form>

<script>
function showError(fieldId, message) {
  // Update field state
  const field = document.getElementById(fieldId);
  field.setAttribute('aria-invalid', 'true');
  field.classList.add('error');

  // Show inline error
  const errorEl = document.getElementById(`${fieldId}-error`);
  errorEl.textContent = message;
  errorEl.style.display = 'block';

  // Update summary
  const summary = document.getElementById('error-summary');
  const list = document.getElementById('error-list');
  const item = document.createElement('li');
  item.innerHTML = `<a href="#${fieldId}">${message}</a>`;
  list.appendChild(item);
  summary.style.display = 'block';

  // Errors persist until user fixes them (no auto-dismiss)
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  field.setAttribute('aria-invalid', 'false');
  field.classList.remove('error');

  const errorEl = document.getElementById(`${fieldId}-error`);
  errorEl.style.display = 'none';

  // Remove from summary
  const list = document.getElementById('error-list');
  const items = list.querySelectorAll('a');
  items.forEach(item => {
    if (item.getAttribute('href') === `#${fieldId}`) {
      item.parentElement.remove();
    }
  });

  // Hide summary if no errors remain
  if (list.children.length === 0) {
    document.getElementById('error-summary').style.display = 'none';
  }
}
</script>
```

## Recipe 2: Complete Pricing Display

**Problem:** Hidden fees, "From £99" pricing confuses agents

**Score Impact:** +8 points (pricing category)

**Implementation:**

```html
<!-- Bad: Incomplete pricing -->
<div class="product-price">
  From £99
</div>

<!-- Good: Complete pricing with breakdown -->
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
      <tr>
        <td>Product price:</td>
        <td>£99.00</td>
      </tr>
      <tr>
        <td>Delivery:</td>
        <td>£15.00</td>
      </tr>
      <tr>
        <td>Service fee:</td>
        <td>£5.00</td>
      </tr>
      <tr class="total">
        <td>Total (inc. VAT):</td>
        <td>£119.00</td>
      </tr>
    </table>
  </details>
</div>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "offers": {
    "@type": "Offer",
    "price": "119.00",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31"
  }
}
</script>
```

## Recipe 3: Explicit Loading States

**Problem:** Spinners with no context confuse agents

**Score Impact:** +6 points (state visibility category)

**Implementation:**

```html
<!-- Initial loading state -->
<div class="content-area"
     data-state="loading"
     data-load-started="2025-01-04T10:30:00Z"
     data-expected-duration="2000"
     role="status"
     aria-live="polite">
  <div class="loading-indicator">
    Loading product information (estimated 2 seconds)
  </div>
</div>

<script>
async function loadContent() {
  const container = document.querySelector('.content-area');
  const startTime = Date.now();

  try {
    const response = await fetch('/api/product/123');
    const data = await response.json();

    // Update to loaded state
    container.setAttribute('data-state', 'loaded');
    container.setAttribute('data-load-completed', new Date().toISOString());
    container.setAttribute('data-load-duration', Date.now() - startTime);

    // Replace loading indicator with content
    container.innerHTML = `
      <h2>${data.name}</h2>
      <p>${data.description}</p>
      <div class="price">£${data.price}</div>
    `;

  } catch (error) {
    // Update to error state
    container.setAttribute('data-state', 'error');
    container.setAttribute('data-error-type', error.name);
    container.innerHTML = `
      <div class="error-message" role="alert">
        Failed to load product information.
        <button onclick="loadContent()">Try again</button>
      </div>
    `;
  }
}

// Start loading
loadContent();
</script>
```

## Recipe 4: Inline Form Validation

**Problem:** Validation only on submit causes repeated failures

**Score Impact:** +10 points (validation category)

**Implementation:**

```javascript
class InlineValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.fields = this.form.querySelectorAll('[data-validation-required]');

    this.fields.forEach(field => {
      field.addEventListener('input', () => this.validateField(field));
      field.addEventListener('blur', () => this.validateField(field));
    });
  }

  validateField(field) {
    const rules = field.dataset.validationRules?.split(',') || [];
    let isValid = true;
    let message = '';

    // Required check
    if (rules.includes('required') && !field.value.trim()) {
      isValid = false;
      message = 'This field is required';
    }

    // Email check
    if (rules.includes('email') && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        message = 'Invalid email format';
      }
    }

    // Min length check
    const minLength = field.dataset.minLength;
    if (minLength && field.value.length < parseInt(minLength)) {
      isValid = false;
      message = `Must be at least ${minLength} characters`;
    }

    // Update field state
    field.setAttribute('data-validation-state', isValid ? 'valid' : 'invalid');
    field.setAttribute('aria-invalid', !isValid);

    // Update error message
    const errorId = `${field.id}-error`;
    let errorEl = document.getElementById(errorId);

    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.id = errorId;
      errorEl.className = 'field-error';
      field.parentNode.appendChild(errorEl);
    }

    errorEl.textContent = message;
    errorEl.style.display = isValid ? 'none' : 'block';
  }
}

// Usage
const validator = new InlineValidator('signup-form');
```

```html
<form id="signup-form">
  <div class="field">
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      data-validation-required="true"
      data-validation-rules="required,email">
  </div>

  <div class="field">
    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      data-validation-required="true"
      data-validation-rules="required"
      data-min-length="8">
  </div>

  <button type="submit">Sign Up</button>
</form>
```

## Recipe 5: Progressive Enhancement for Product Pages

**Problem:** JavaScript-dependent content invisible to most agents

**Score Impact:** +15 points (served HTML completeness)

**Implementation:**

```html
<!-- Server-rendered HTML (works for ALL agents) -->
<article class="product" data-product-id="12345">
  <h1>Wireless Headphones</h1>

  <div class="product-price" data-price="149.99">
    <span class="currency">£</span>
    <span class="amount">149.99</span>
    <span class="vat-status">(inc. VAT)</span>
  </div>

  <div class="product-availability" data-stock-level="23">
    <span class="status">In Stock</span>
    <span class="quantity">(23 available)</span>
  </div>

  <div class="product-description">
    <p>Over-ear wireless headphones with active noise cancellation...</p>
  </div>

  <!-- Structured data -->
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
      "availability": "https://schema.org/InStock",
      "inventoryLevel": 23
    }
  }
  </script>
</article>

<!-- Progressive enhancement (for browser agents) -->
<script>
// Enhance with real-time updates
async function enhanceProductPage() {
  const productId = document.querySelector('.product').dataset.productId;

  try {
    const response = await fetch(`/api/products/${productId}/live`);
    const data = await response.json();

    // Update price if changed
    if (data.price !== document.querySelector('.product-price').dataset.price) {
      document.querySelector('.amount').textContent = data.price;
      document.querySelector('.product-price').dataset.price = data.price;
    }

    // Update stock level
    document.querySelector('.product-availability').dataset.stockLevel = data.stockLevel;
    document.querySelector('.quantity').textContent = `(${data.stockLevel} available)`;

    // If low stock, add warning
    if (data.stockLevel < 5) {
      const warning = document.createElement('div');
      warning.className = 'low-stock-warning';
      warning.textContent = 'Low stock - order soon!';
      document.querySelector('.product-availability').appendChild(warning);
    }

  } catch (error) {
    // Fail gracefully - server-rendered content still works
    console.warn('Failed to enhance product page:', error);
  }
}

// Only enhance for browsers
if (window.fetch) {
  enhanceProductPage();
}
</script>
```

## Recipe 6: Explicit State Attributes

**Problem:** Visual-only state changes invisible to agents

**Score Impact:** +8 points (state explicitness)

**Implementation:**

```html
<!-- Shopping cart with explicit state -->
<div id="shopping-cart"
     data-state="active"
     data-item-count="3"
     data-subtotal="247.97"
     data-currency="GBP">

  <h2>Shopping Cart</h2>

  <div class="cart-summary" role="status">
    <p>Items: <span id="item-count">3</span></p>
    <p>Subtotal: £<span id="subtotal">247.97</span></p>
  </div>

  <div class="cart-items">
    <div class="cart-item"
         data-item-id="12345"
         data-quantity="2"
         data-unit-price="49.99"
         data-line-total="99.98">
      <!-- Item details -->
    </div>
  </div>
</div>

<script>
function updateCart(itemId, newQuantity) {
  const item = document.querySelector(`[data-item-id="${itemId}"]`);
  const unitPrice = parseFloat(item.dataset.unitPrice);
  const lineTotal = unitPrice * newQuantity;

  // Update item
  item.dataset.quantity = newQuantity;
  item.dataset.lineTotal = lineTotal.toFixed(2);

  // Recalculate cart totals
  const items = document.querySelectorAll('.cart-item');
  let totalItems = 0;
  let subtotal = 0;

  items.forEach(item => {
    totalItems += parseInt(item.dataset.quantity);
    subtotal += parseFloat(item.dataset.lineTotal);
  });

  // Update cart state
  const cart = document.getElementById('shopping-cart');
  cart.dataset.itemCount = totalItems;
  cart.dataset.subtotal = subtotal.toFixed(2);

  // Update visual display
  document.getElementById('item-count').textContent = totalItems;
  document.getElementById('subtotal').textContent = subtotal.toFixed(2);
}
</script>
```

## Recipe 7: robots.txt for E-commerce

**Problem:** No AI agent guidance

**Score Impact:** +25 points (robots.txt quality)

**Implementation:**

Create `/robots.txt`:

```text
# robots.txt - E-commerce AI Agent Guidance
# See llms.txt for detailed policies
# Contact: api-support@example.com

User-agent: *
Disallow: /admin/
Disallow: /account/
Disallow: /cart/
Disallow: /checkout/
Disallow: /api/

User-agent: GPTBot
Allow: /products/
Allow: /categories/
Allow: /reviews/
Disallow: /

User-agent: ClaudeBot
Allow: /products/
Allow: /categories/
Allow: /reviews/
Disallow: /

User-agent: PerplexityBot
Allow: /products/
Disallow: /

User-agent: OAI-SearchBot
Allow: /products/
Allow: /categories/
Disallow: /

Sitemap: https://example.com/sitemap.xml
```

## Recipe 8: Basic llms.txt

**Problem:** No structured agent guidance

**Score Impact:** +20 points (AI communication)

**Implementation:**

Create `/llms.txt`:

```text
# Example Shop

Technical documentation and product catalogue for Example Shop, electronics retailer.

Last updated: January 2026
Contact: agents@example.com

## Access Guidelines

- Rate: 100 requests per hour per IP
- Cache: 24 hours maximum
- Attribution: Required
- Commercial Use: Permitted for price comparison
- Training: Product data permitted

## Product Catalogue

Browse our full product range:

- [Products](https://example.com/products/): Complete product listings
- [Categories](https://example.com/categories/): Organised by department
- [Reviews](https://example.com/reviews/): Customer reviews

## Content Restrictions

- [Shopping Cart](https://example.com/cart/): Authentication required
- [Checkout](https://example.com/checkout/): Authentication required
- [Account](https://example.com/account/): Authentication required

## API Access

Preferred method: API
Endpoint: https://api.example.com/v1
Documentation: https://developers.example.com
Authentication: OAuth2 or API key

## For Human Visitors

- Shop: [example.com](https://example.com)
- Help: [help@example.com](mailto:help@example.com)
```

## Recipe 9: Disabled Button with Clear Reason

**Problem:** Disabled buttons don't explain why

**Score Impact:** +5 points (clarity category)

**Implementation:**

```html
<button id="submit-btn"
        type="submit"
        disabled
        aria-disabled="true"
        aria-describedby="submit-status"
        data-disabled-reason="3 fields incomplete">
  Submit (3 errors remaining)
</button>

<div id="submit-status" class="form-status" role="status">
  <p>Form completion: <span id="completion-pct">60%</span></p>
  <p>Required fields remaining: 3</p>
  <ul id="incomplete-fields">
    <li><a href="#email">Email address required</a></li>
    <li><a href="#postcode">Postcode format incorrect</a></li>
    <li><a href="#payment">Payment method not selected</a></li>
  </ul>
</div>

<script>
function updateSubmitButton() {
  const form = document.getElementById('checkout-form');
  const fields = form.querySelectorAll('[data-validation-state]');

  const incomplete = Array.from(fields).filter(f =>
    f.dataset.validationState !== 'valid'
  );

  const submitBtn = document.getElementById('submit-btn');
  const statusList = document.getElementById('incomplete-fields');

  if (incomplete.length === 0) {
    // Enable button
    submitBtn.disabled = false;
    submitBtn.removeAttribute('aria-disabled');
    submitBtn.removeAttribute('data-disabled-reason');
    submitBtn.textContent = 'Submit';
  } else {
    // Keep disabled, update reason
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-disabled', 'true');
    submitBtn.setAttribute('data-disabled-reason', `${incomplete.length} fields incomplete`);
    submitBtn.textContent = `Submit (${incomplete.length} errors remaining)`;

    // Update status list
    statusList.innerHTML = incomplete.map(field => {
      const label = field.labels[0]?.textContent || field.name;
      const error = document.getElementById(`${field.id}-error`)?.textContent || 'Required';
      return `<li><a href="#${field.id}">${label}: ${error}</a></li>`;
    }).join('');
  }

  // Update completion percentage
  const completionPct = Math.round((fields.length - incomplete.length) / fields.length * 100);
  document.getElementById('completion-pct').textContent = `${completionPct}%`;
}

// Call on every field change
document.querySelectorAll('[data-validation-state]').forEach(field => {
  field.addEventListener('input', updateSubmitButton);
  field.addEventListener('blur', updateSubmitButton);
});

// Initial update
updateSubmitButton();
</script>
```

## Recipe 10: Small Business Restaurant Template

**Problem:** Complex infrastructure not needed for simple sites

**Score Impact:** +30 points (complete semantic markup)

**Implementation:**

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Luigi's Pizza - Manchester</title>

  <style>
    body { font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    .menu-section { margin: 2em 0; }
    .menu-item { margin: 1em 0; }
    .price { font-weight: bold; color: #2c5282; }
  </style>
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

  <p>Phone: <a href="tel:+441611234567" itemprop="telephone">0161 123 4567</a></p>

  <p>Open:
    <time itemprop="openingHours" datetime="Mo-Su 11:00-22:00">
      11am - 10pm daily
    </time>
  </p>

  <div itemprop="menu" itemscope itemtype="https://schema.org/Menu">
    <h2>Menu</h2>

    <div class="menu-section" itemprop="hasMenuSection" itemscope itemtype="https://schema.org/MenuSection">
      <h3 itemprop="name">Pizzas</h3>

      <div class="menu-item" itemprop="hasMenuItem" itemscope itemtype="https://schema.org/MenuItem">
        <p>
          <span itemprop="name">Margherita</span> -
          <span itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <span class="price">
              <span itemprop="priceCurrency" content="GBP">£</span>
              <span itemprop="price">12.99</span>
            </span>
          </span>
        </p>
        <p itemprop="description">Tomato sauce, mozzarella, fresh basil</p>
      </div>

      <div class="menu-item" itemprop="hasMenuItem" itemscope itemtype="https://schema.org/MenuItem">
        <p>
          <span itemprop="name">Pepperoni</span> -
          <span itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <span class="price">
              <span itemprop="priceCurrency" content="GBP">£</span>
              <span itemprop="price">14.99</span>
            </span>
          </span>
        </p>
        <p itemprop="description">Tomato sauce, mozzarella, pepperoni</p>
      </div>
    </div>

    <div class="menu-section" itemprop="hasMenuSection" itemscope itemtype="https://schema.org/MenuSection">
      <h3 itemprop="name">Sides</h3>

      <div class="menu-item" itemprop="hasMenuItem" itemscope itemtype="https://schema.org/MenuItem">
        <p>
          <span itemprop="name">Garlic Bread</span> -
          <span itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <span class="price">
              <span itemprop="priceCurrency" content="GBP">£</span>
              <span itemprop="price">4.99</span>
            </span>
          </span>
        </p>
      </div>
    </div>
  </div>
</div>

</body>
</html>
```

**Implementation time:** Two hours including learning the schema markup.

**Cost:** Zero. No JavaScript, no frameworks, no APIs needed.

---

## Quick Reference: Scoring Impact

| Pattern | Score Impact | Priority |
| ------- | ------------ | -------- |
| Persistent errors | +12 points | Priority 1 |
| Served HTML completeness | +15 points | Priority 1 |
| Complete pricing | +8 points | Priority 1 |
| Inline validation | +10 points | Priority 2 |
| Explicit state attributes | +8 points | Priority 2 |
| Loading state clarity | +6 points | Priority 2 |
| robots.txt quality | +25 points | Priority 2 |
| llms.txt presence | +20 points | Priority 2 |
| Disabled button clarity | +5 points | Priority 3 |
| Small business markup | +30 points | Priority 1 |

Focus on patterns with highest score impact and lowest implementation effort first.

---

**Note:** These recipes are production-tested patterns. Copy them directly, adapting field names and styling to your needs. All patterns are forward-compatible and won't break if agents don't recognise them.
