# Appendix D: AI-Friendly HTML Guide

A prescriptive guide for developers creating web interfaces that work for both humans and AI agents.

## Core Principle

Build web pages where state is explicit, information is complete, and structure is semantic. This isn't about accommodating AI as an afterthought — it's about building clearer interfaces that serve everyone better.

The patterns in this guide progress from quick fixes you can apply in minutes to architectural decisions that require more planning. Start wherever makes sense for your situation.

## Standards vs Proposed Patterns

This guide presents both established standards and proposed patterns:

**Established Standards** (use with confidence):

- Schema.org JSON-LD structured data
- HTML semantic elements (`<nav>`, `<main>`, `<dialog>`)
- ARIA attributes for accessibility
- HTTP status codes
- robots.txt

**Emerging Conventions** (early adoption):

- llms.txt for AI agent guidance

**Proposed Patterns** (experimental, forward-compatible):

- ai-* meta tag namespace
- data-agent-visible attribute pattern

All patterns shown are designed to be forward-compatible — they won't break anything if agents don't recognise them. Think of them as progressive enhancement for AI.

---

## Part 1 — Quick Reference Tables

These reference tables give you immediate answers to common questions.

### HTTP Status Codes That Matter

Use the correct status code. Agents rely on these to understand what happened.

| Code | Meaning | When to Use |
| ---- | ------- | ----------- |
| 200 | Success | GET requests returning content |
| 201 | Created | Successful POST creating a resource |
| 303 | See Other | After form submission (POST → redirect) |
| 400 | Bad Request | Validation failures, malformed input |
| 401 | Unauthorised | Login required |
| 403 | Forbidden | Authenticated but not permitted |
| 404 | Not Found | Resource doesn't exist |
| 422 | Unprocessable Entity | Valid syntax, invalid semantics |
| 429 | Too Many Requests | Rate limit exceeded (include Retry-After header) |
| 503 | Service Unavailable | Temporary downtime (include Retry-After header) |

### Standard Form Field Names

Use names that agents recognise. Pick one convention (camelCase or snake_case) and use it consistently.

| Data | Preferred Name | Avoid |
| ---- | -------------- | ----- |
| Email | email | e-mail, emailAddress, user_email |
| First name | firstName or first_name | fname, givenName |
| Last name | lastName or last_name | lname, surname, familyName |
| Full name | fullName or full_name | name, customerName |
| Phone | phone or telephone | tel, phoneNumber, mobile |
| Postcode | postcode or postal_code | zip, zipCode (UK sites) |
| Address line 1 | address1 or street_address | addr1, addressLine1 |
| Address line 2 | address2 | addr2, addressLine2 |
| City | city | town, locality |
| County/State | county or state | region, province |
| Country | country or country_code | nation, countryName |
| Card number | cardNumber or card_number | cc_number, pan, ccnum |
| Expiry date | expiryDate or expiry | exp, cardExpiry |
| CVV/CVC | cvv or cvc | securityCode, cv2 |
| Password | password | pass, pwd, passwd |
| Username | username | user, userName, login |
| Date of birth | dateOfBirth or date_of_birth | dob, birthday, birthDate |
| Company | company or company_name | organisation, businessName |
| Quantity | quantity | qty, amount, count |

### Date and Time Formats

Always use ISO 8601 in data attributes, even when displaying locally formatted dates:

```html
<time datetime="2025-03-15T14:30:00Z" 
      data-timezone="Europe/London">
  3:30 PM GMT
</time>
```

For date inputs, show the expected format:

```html
<div class="date-picker">
  <label for="departure-date">Departure date</label>
  <input type="date" 
         id="departure-date"
         name="departureDate"
         min="2025-01-01"
         max="2025-12-31"
         value="2025-03-15"
         data-format="YYYY-MM-DD"
         required>
  <p class="help-text">Format: YYYY-MM-DD (e.g., 2025-03-15)</p>
</div>
```

### Common Data Attributes

Use these consistently across your site:

| Attribute | Purpose | Example Values |
| --------- | ------- | -------------- |
| data-state | Current state of element | loading, loaded, error, empty |
| data-validation-state | Form field validity | valid, invalid, pending |
| data-authenticated | Login status | true, false |
| data-product-id | Product identifier | WH-1000, SKU-12345 |
| data-price | Numeric price | 149.99 |
| data-currency | Currency code | GBP, USD, EUR |
| data-quantity | Item count | 1, 23, 100 |
| data-in-stock | Availability | true, false |
| data-page | Current page number | 1, 2, 3 |
| data-total-pages | Total pages | 24 |
| data-sort | Sort order | relevance, price-asc, date-desc |
| data-error-code | Error identifier | PAYMENT_DECLINED, VALIDATION_ERROR |
| data-step | Wizard step number | 1, 2, 3 |
| data-total-steps | Total wizard steps | 4 |
| data-agent-visible | For AI agent metadata | true |

---

## Part 2 — Simple HTML Patterns

These patterns require minimal code changes and provide immediate benefit.

### Show Authentication State Explicitly

Make login status machine-readable:

```html
<!-- When logged in -->
<div id="auth-status" 
     data-authenticated="true"
     data-user-id="user-456"
     data-session-expires="2025-01-15T14:30:00Z">
  <p>Signed in as tom@example.com</p>
  <a href="/account">Account</a>
  <form action="/logout" method="POST">
    <button type="submit">Sign out</button>
  </form>
</div>

<!-- When logged out -->
<div id="auth-status" data-authenticated="false">
  <a href="/login">Sign in</a>
  <a href="/register">Create account</a>
</div>
```

An agent can immediately determine authentication state without parsing visual cues.

### Make State Explicit in Attributes

Don't rely on visual cues alone. Put state in the DOM where machines can read it.

**Bad — Visual only:**

```html
<div class="spinner"></div>
```

**Good — Explicit state:**

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

When loading completes:

```html
<div class="product-data"
     data-state="loaded"
     data-loaded-at="2025-12-21T10:30:02Z">
  <!-- Product information -->
</div>
```

Humans see the text. Screen readers announce changes via `aria-live`. Agents read the `data-state` attribute.

### Show Errors Persistently

Toast notifications that disappear break both agents and humans who read slowly.

**Bad — Vanishing error:**

```html
<div class="toast toast-error" style="animation: fadeOut 3s forwards;">
  Email address is invalid
</div>
```

**Good — Persistent, connected errors:**

```html
<form id="booking-form">
  <div class="error-summary" role="alert" aria-live="assertive">
    <h2>Please fix the following errors</h2>
    <ul id="error-list">
      <li><a href="#email">Email address format is invalid</a></li>
      <li><a href="#postcode">Postcode is required</a></li>
    </ul>
  </div>

  <div class="field">
    <label for="email">Email address</label>
    <input type="email"
           id="email"
           name="email"
           aria-invalid="true"
           aria-describedby="email-error">
    <div class="field-error"
         id="email-error"
         role="alert">
      Enter a valid email address (example: name@company.com)
    </div>
  </div>

  <button type="submit">Book appointment</button>
</form>
```

Errors stay visible until fixed. Each error links to its field. Screen readers announce changes.

### Make Table Data Machine-Readable

When displaying tabular data, put machine-readable values in data attributes:

```html
<table>
  <caption>Price comparison — Wireless headphones</caption>
  <thead>
    <tr>
      <th scope="col">Model</th>
      <th scope="col">Price</th>
      <th scope="col">Rating</th>
      <th scope="col">Stock</th>
    </tr>
  </thead>
  <tbody>
    <tr data-product-id="WH-1000">
      <td>AudioTech Pro</td>
      <td data-price="149.99" data-currency="GBP">£149.99</td>
      <td data-rating="4.3" data-review-count="127">4.3 (127 reviews)</td>
      <td data-in-stock="true" data-quantity="23">In stock</td>
    </tr>
  </tbody>
</table>
```

Use `scope` attributes on headers. Put numeric values in data attributes separate from formatted display text.

---

## Part 3 — Form Patterns

Forms are where most agent interactions fail. These patterns make forms work reliably.

### Disabled Buttons That Explain Themselves

Don't just disable buttons. Explain why they're disabled and what's needed.

**Bad — Mysterious:**

```html
<button disabled>Submit</button>
```

**Good — Informative:**

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

Everyone knows exactly what's needed to proceed. No guessing.

### Synchronous Form Validation

Validate as users type. Show all errors at once. Never wait until submission to reveal problems.

```html
<form id="checkout-form" 
      action="/checkout" 
      method="POST"
      data-state="incomplete"
      data-errors="2"
      novalidate>
  
  <div class="error-summary" 
       role="alert" 
       aria-live="polite"
       data-visible="true">
    <h2>2 errors need fixing</h2>
    <ul>
      <li><a href="#email">Email: Enter a valid email address</a></li>
      <li><a href="#postcode">Postcode: Must be a valid UK postcode</a></li>
    </ul>
  </div>

  <div class="field" data-field-state="error">
    <label for="email">Email address</label>
    <input type="email" 
           id="email" 
           name="email"
           value="invalid-email"
           aria-invalid="true"
           aria-describedby="email-error"
           data-validation-state="invalid"
           data-error-type="format">
    <div id="email-error" class="field-error" role="alert">
      Enter a valid email address (example: name@company.com)
    </div>
  </div>

  <div class="field" data-field-state="valid">
    <label for="name">Full name</label>
    <input type="text" 
           id="name" 
           name="name"
           value="Jane Smith"
           aria-invalid="false"
           data-validation-state="valid">
  </div>

  <button type="submit" 
          disabled
          aria-disabled="true"
          data-submit-blocked="true"
          data-block-reason="2 validation errors">
    Complete order (fix 2 errors first)
  </button>
</form>
```

The submit button explains exactly why it's disabled. Agents can read the current validation state of every field.

### Multi-Step Wizard Pattern

For complex processes, show clear progress and make each step bookmarkable.

```html
<form action="/booking" method="POST" 
      data-step="2" 
      data-total-steps="4"
      data-can-proceed="true">
  
  <nav aria-label="Booking progress">
    <ol class="steps">
      <li data-step="1" data-status="complete">
        <a href="?step=1">Event type</a>
      </li>
      <li data-step="2" data-status="current" aria-current="step">
        Select date
      </li>
      <li data-step="3" data-status="pending">Your details</li>
      <li data-step="4" data-status="pending">Confirm</li>
    </ol>
  </nav>
  
  <div class="step-content">
    <!-- Current step content -->
  </div>
  
  <div class="step-navigation">
    <button type="button" formaction="?step=1">Back</button>
    <button type="submit" formaction="?step=3">Continue</button>
  </div>
</form>
```

Each step changes the URL (`/booking?step=2`). Progress is visible. State persists in the form or the session, not just JavaScript.

### Modal and Dialog Pattern

Modals break agents badly when implemented as JavaScript overlays. Use native HTML:

```html
<dialog id="confirm-delete" 
        open
        aria-labelledby="dialog-title"
        data-action="confirm-deletion"
        data-target-id="item-123">
  
  <h2 id="dialog-title">Delete this item?</h2>
  <p>This action cannot be undone.</p>
  
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm" formaction="/items/123/delete" formmethod="POST">
      Delete
    </button>
  </form>
</dialog>
```

Use native `<dialog>`. Expose the action in data attributes. Make form submission work without JavaScript.

---

## Part 4 — Page Structure Patterns

How you organise page content affects whether agents can find and use information.

### Navigation and Breadcrumbs

Make site structure explicit so agents understand where they are and where they can go.

**Breadcrumbs:**

```html
<nav aria-label="Breadcrumb">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/">
        <span itemprop="name">Home</span>
      </a>
      <meta itemprop="position" content="1">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/electronics">
        <span itemprop="name">Electronics</span>
      </a>
      <meta itemprop="position" content="2">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/electronics/headphones">
        <span itemprop="name">Headphones</span>
      </a>
      <meta itemprop="position" content="3">
    </li>
    <li aria-current="page">
      <span itemprop="name">Wireless Headphones WH-1000</span>
      <meta itemprop="position" content="4">
    </li>
  </ol>
</nav>
```

**Main Navigation:**

```html
<nav aria-label="Main navigation" data-nav-type="primary">
  <ul>
    <li data-section="products">
      <a href="/products">Products</a>
      <ul data-submenu="true">
        <li><a href="/products/headphones">Headphones</a></li>
        <li><a href="/products/speakers">Speakers</a></li>
      </ul>
    </li>
    <li data-section="support">
      <a href="/support">Support</a>
    </li>
    <li data-section="account">
      <a href="/account">Account</a>
    </li>
  </ul>
</nav>
```

Use `aria-label` to distinguish navigation types. Use `data-section` to indicate content areas. Include all navigation links in HTML, not JavaScript-generated menus.

### Search and Filtering

Make search results and filter states machine-readable.

**Search Results:**

```html
<div class="search-results" 
     data-query="wireless headphones"
     data-total-results="47"
     data-page="1"
     data-per-page="20"
     data-sort="relevance">
  
  <p class="results-summary">
    Showing 1-20 of 47 results for "wireless headphones"
  </p>
  
  <ol class="results-list">
    <li data-result-position="1" data-product-id="WH-1000">
      <a href="/products/wh-1000">Wireless Headphones WH-1000</a>
      <span data-price="149.99" data-currency="GBP">£149.99</span>
    </li>
    <!-- More results -->
  </ol>
  
  <nav aria-label="Search results pagination">
    <a href="?q=wireless+headphones&page=2" data-page="2">Next</a>
  </nav>
</div>
```

**Filter State:**

```html
<form class="filters" 
      action="/products" 
      method="GET"
      data-active-filters="3">
  
  <div class="active-filters" aria-live="polite">
    <p>Active filters:</p>
    <ul>
      <li>
        <span data-filter="category" data-value="headphones">Category: Headphones</span>
        <a href="?brand=sony&price_max=200" aria-label="Remove category filter">×</a>
      </li>
      <li>
        <span data-filter="brand" data-value="sony">Brand: Sony</span>
        <a href="?category=headphones&price_max=200" aria-label="Remove brand filter">×</a>
      </li>
      <li>
        <span data-filter="price_max" data-value="200">Max price: £200</span>
        <a href="?category=headphones&brand=sony" aria-label="Remove price filter">×</a>
      </li>
    </ul>
    <a href="/products" class="clear-all">Clear all filters</a>
  </div>
  
  <fieldset>
    <legend>Price range</legend>
    <label>
      <input type="radio" name="price" value="0-100" 
             data-result-count="12">
      Under £100 (12)
    </label>
    <label>
      <input type="radio" name="price" value="100-200" 
             checked
             data-result-count="23">
      £100-£200 (23)
    </label>
  </fieldset>
  
  <button type="submit">Apply filters</button>
</form>
```

Key points: filters reflected in URL parameters, active filters listed explicitly, result counts shown for each option, clear mechanism to remove individual filters.

### Pagination When Necessary

When pagination is unavoidable (thousands of products), make it agent-friendly:

```html
<nav aria-label="Pagination" class="pagination"
     data-current-page="3"
     data-total-pages="24"
     data-total-items="472"
     data-per-page="20">
  
  <a href="?page=1" data-page="1">First</a>
  <a href="?page=2" data-page="2" rel="prev">Previous</a>
  
  <span aria-current="page" data-page="3">Page 3 of 24</span>
  
  <a href="?page=4" data-page="4" rel="next">Next</a>
  <a href="?page=24" data-page="24">Last</a>
  
  <!-- Machine-readable summary -->
  <p class="pagination-summary">
    Showing items 41-60 of 472
  </p>
</nav>

<!-- Also add link elements in head -->
<head>
  <link rel="prev" href="?page=2">
  <link rel="next" href="?page=4">
  <link rel="first" href="?page=1">
  <link rel="last" href="?page=24">
</head>
```

Prefer: complete content on one page with anchor navigation. When paginating: include total counts, use `rel="prev/next"` link elements, keep items per page reasonable (20-50), and reflect page in URL.

### Cart and Basket State

Make shopping cart contents visible and machine-readable:

```html
<div id="shopping-cart" 
     data-cart-id="cart-abc123"
     data-item-count="3"
     data-subtotal="279.97"
     data-currency="GBP"
     data-last-updated="2025-01-15T10:30:00Z">
  
  <h2>Your basket (3 items)</h2>
  
  <ul class="cart-items">
    <li data-product-id="WH-1000" 
        data-quantity="1" 
        data-unit-price="149.99"
        data-line-total="149.99">
      <span class="product-name">Wireless Headphones WH-1000</span>
      <span class="quantity">Qty: 1</span>
      <span class="price">£149.99</span>
      <form action="/cart/update" method="POST">
        <input type="hidden" name="product_id" value="WH-1000">
        <input type="number" name="quantity" value="1" min="0" max="10">
        <button type="submit">Update</button>
      </form>
      <form action="/cart/remove" method="POST">
        <input type="hidden" name="product_id" value="WH-1000">
        <button type="submit">Remove</button>
      </form>
    </li>
    <!-- More items -->
  </ul>
  
  <div class="cart-summary">
    <dl>
      <dt>Subtotal</dt>
      <dd data-subtotal="279.97">£279.97</dd>
      <dt>Shipping</dt>
      <dd data-shipping="0.00">Free</dd>
      <dt>VAT (included)</dt>
      <dd data-vat="46.66">£46.66</dd>
      <dt>Total</dt>
      <dd data-total="279.97">£279.97</dd>
    </dl>
  </div>
  
  <a href="/checkout" class="checkout-button"
     data-checkout-ready="true">
    Proceed to checkout
  </a>
</div>
```

Include: item count, individual line items with quantities and prices, running totals, clear update/remove actions, and checkout readiness state.

### Success Confirmation Pattern

After a transaction completes, show clear confirmation:

```html
<div class="order-confirmation" 
     role="status"
     data-order-status="confirmed"
     data-order-id="ORD-2025-0115-7890">
  
  <h1>Order confirmed</h1>
  
  <div class="confirmation-details">
    <dl>
      <dt>Order number</dt>
      <dd data-order-id="ORD-2025-0115-7890">ORD-2025-0115-7890</dd>
      
      <dt>Order date</dt>
      <dd><time datetime="2025-01-15T10:35:00Z">15 January 2025, 10:35 AM</time></dd>
      
      <dt>Total paid</dt>
      <dd data-total="279.97" data-currency="GBP">£279.97</dd>
      
      <dt>Payment method</dt>
      <dd data-payment-method="card" data-card-last4="4242">Card ending 4242</dd>
      
      <dt>Estimated delivery</dt>
      <dd data-delivery-date="2025-01-17">17-18 January 2025</dd>
    </dl>
  </div>
  
  <div class="delivery-address">
    <h2>Delivering to</h2>
    <address>
      Jane Smith<br>
      123 Main Street<br>
      Manchester M1 1AA
    </address>
  </div>
  
  <div class="order-items">
    <h2>Items ordered</h2>
    <ul>
      <li data-product-id="WH-1000" data-quantity="1">
        Wireless Headphones WH-1000 × 1
      </li>
    </ul>
  </div>
  
  <div class="next-actions">
    <a href="/orders/ORD-2025-0115-7890">Track this order</a>
    <a href="/orders">View all orders</a>
    <a href="/">Continue shopping</a>
  </div>
</div>
```

Include: order reference, confirmation status, payment summary, delivery details, items ordered, and next actions. This page should be reachable via a stable URL for future reference.

### Currency and Locale

For multi-currency or multi-language sites, make the current context explicit:

```html
<html lang="en-GB" data-locale="en-GB" data-currency="GBP">
<head>
  <meta name="currency" content="GBP">
  <meta name="locale" content="en-GB">
  <link rel="alternate" hreflang="en-US" href="https://us.example.com/product">
  <link rel="alternate" hreflang="de-DE" href="https://de.example.com/produkt">
  <link rel="alternate" hreflang="x-default" href="https://example.com/product">
</head>
<body>
  <!-- Currency selector -->
  <form action="/set-currency" method="POST" class="currency-selector">
    <label for="currency">Currency</label>
    <select id="currency" name="currency" data-current="GBP">
      <option value="GBP" selected>£ GBP</option>
      <option value="USD">$ USD</option>
      <option value="EUR">€ EUR</option>
    </select>
    <button type="submit">Update</button>
  </form>
  
  <!-- Prices with explicit currency -->
  <span class="price" 
        data-amount="149.99" 
        data-currency="GBP"
        data-currency-symbol="£">
    £149.99
  </span>
</body>
</html>
```

Use `hreflang` links for language alternatives. Put currency and locale in data attributes. Show explicit currency symbols, not just numbers.

### Delivery and Shipping Options

Present shipping choices clearly:

```html
<fieldset class="shipping-options" 
          data-destination-country="GB"
          data-destination-postcode="M1 1AA">
  <legend>Choose delivery option</legend>
  
  <label class="shipping-option" data-shipping-id="standard">
    <input type="radio" 
           name="shipping" 
           value="standard"
           data-price="0.00"
           data-delivery-days-min="3"
           data-delivery-days-max="5"
           checked>
    <span class="option-name">Standard delivery</span>
    <span class="option-price" data-price="0.00">Free</span>
    <span class="option-time">3-5 working days</span>
    <span class="option-estimate">
      Estimated arrival: 
      <time datetime="2025-01-20">20 Jan</time> - 
      <time datetime="2025-01-22">22 Jan</time>
    </span>
  </label>
  
  <label class="shipping-option" data-shipping-id="express">
    <input type="radio" 
           name="shipping" 
           value="express"
           data-price="5.99"
           data-delivery-days-min="1"
           data-delivery-days-max="2">
    <span class="option-name">Express delivery</span>
    <span class="option-price" data-price="5.99">£5.99</span>
    <span class="option-time">1-2 working days</span>
    <span class="option-estimate">
      Estimated arrival: 
      <time datetime="2025-01-16">16 Jan</time> - 
      <time datetime="2025-01-17">17 Jan</time>
    </span>
  </label>
  
  <label class="shipping-option" data-shipping-id="next-day">
    <input type="radio" 
           name="shipping" 
           value="next-day"
           data-price="9.99"
           data-delivery-days-min="1"
           data-delivery-days-max="1"
           data-cutoff-time="14:00">
    <span class="option-name">Next day delivery</span>
    <span class="option-price" data-price="9.99">£9.99</span>
    <span class="option-time">Next working day</span>
    <span class="option-note">Order before 2pm</span>
    <span class="option-estimate">
      Estimated arrival: 
      <time datetime="2025-01-16">16 Jan</time>
    </span>
  </label>
</fieldset>
```

Include: price, delivery timeframe, estimated dates, any cutoff times, and destination context.

### Complete Content on One Page

Stop splitting content unnecessarily. Show everything with good organisation.

**Bad — Forced pagination:**

```text
Day 1: Bangkok details
[Page 1 of 14] [Next →]
```

**Good — Complete with navigation:**

```html
<article class="tour-itinerary">
  <h1>14-Day Southeast Asia Adventure</h1>

  <nav class="day-navigation" aria-label="Jump to day">
    <a href="#day-1">Day 1: Bangkok</a>
    <a href="#day-2">Day 2: Ayutthaya</a>
    <!-- Through day 14 -->
  </nav>

  <section id="day-1" class="day-detail">
    <h2>Day 1 — Bangkok</h2>
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

Agents see everything in one request. Humans can scan the full content. The browser find (Ctrl+F) works across all content. Screen readers navigate by heading.

### Honest Pricing Structure

Show complete costs upfront—no surprises at checkout.

**Bad — Hidden costs:**

```html
<p class="price">From £99</p>
```

**Good — Complete and honest:**

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

No deceptive "from" pricing. Complete costs are visible. Breakdown available but not intrusive.

### Error Recovery Pattern

When something fails mid-transaction, show clear recovery paths:

```html
<div class="transaction-error" role="alert" data-error-code="PAYMENT_DECLINED">
  <h2>Payment was declined</h2>
  <p>Your card ending 4242 was declined by your bank.</p>
  
  <div class="recovery-options">
    <h3>What you can do</h3>
    <ul>
      <li><a href="/checkout/payment">Try a different card</a></li>
      <li><a href="/checkout/payment?method=paypal">Pay with PayPal</a></li>
      <li><a href="/cart">Return to basket</a> (your items are saved)</li>
    </ul>
  </div>
  
  <details>
    <summary>Technical details</summary>
    <dl>
      <dt>Error code</dt>
      <dd>PAYMENT_DECLINED</dd>
      <dt>Transaction reference</dt>
      <dd>TXN-2025-0115-ABC123</dd>
      <dt>Time</dt>
      <dd><time datetime="2025-01-15T10:30:00Z">10:30 AM</time></dd>
    </dl>
  </details>
</div>
```

Clear error message. Explicit recovery paths. Technical details are available but not obstructing.

---

## Part 5 — Structured Data

Structured data tells machines what your content means, not just how to display it.

### Schema.org Quick Reference

The most useful schema types for different businesses:

**Product (E-commerce):**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Wireless Headphones",
  "description": "Over-ear wireless headphones with noise cancellation",
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
    "inventoryLevel": 23,
    "priceValidUntil": "2025-12-31"
  }
}
```

**Local Business (Shops, Restaurants):**

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Luigi's Pizza",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Manchester",
    "postalCode": "M1 1AA",
    "addressCountry": "GB"
  },
  "telephone": "0161-123-4567",
  "openingHours": "Mo-Su 11:00-22:00",
  "priceRange": "££",
  "servesCuisine": "Italian"
}
```

**Event (Conferences, Concerts):**

```json
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
      "addressLocality": "London",
      "addressCountry": "GB"
    }
  },
  "offers": {
    "@type": "Offer",
    "price": "299",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock"
  }
}
```

**Article (Blogs, News):**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Build Agent-Friendly Websites",
  "author": {
    "@type": "Person",
    "name": "Jane Developer"
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-20",
  "publisher": {
    "@type": "Organization",
    "name": "Tech Blog"
  }
}
```

Add to your page's `<head>` section wrapped in `<script type="application/ld+json">`.

### Agent-Readable Purchase Instructions

For e-commerce sites, tell agents exactly what to do.

**Status:** Experimental Pattern — The `data-agent-visible` attribute is not standardised but follows the convention of data-* attributes for custom metadata. Forward-compatible design.

```html
<div class="agent-metadata" data-agent-visible="true" style="display: none;">
  <h2>Purchase Information</h2>
  <dl>
    <dt>Action</dt>
    <dd>POST to /cart/add</dd>

    <dt>Required parameters</dt>
    <dd>product_id=WH-1000, quantity (1-23)</dd>

    <dt>Prerequisites</dt>
    <dd>
      <ul>
        <li>Authentication: Required (status: <span id="auth-status">authenticated</span>)</li>
        <li>Payment method: Required (status: <span id="payment-status">configured</span>)</li>
        <li>Shipping address: Required (status: <span id="shipping-status">set</span>)</li>
      </ul>
    </dd>

    <dt>Expected response</dt>
    <dd>Success: 303 redirect to /cart/added | Error: 400 with JSON details</dd>
  </dl>
</div>
```

Hidden from humans with `display: none`, but visible to agents parsing the DOM. Update status spans with JavaScript based on the actual session state.

**Note:** This pattern provides hidden metadata to AI agents whilst keeping it invisible to human users. The attribute acts as a semantic marker that agents can search for. Not widely adopted yet, but designed to degrade gracefully.

### llms.txt File

Create a `/llms.txt` file at your site root to provide site-wide guidance to AI systems. This is similar to how robots.txt guides search engines.

**Real-world reference:** For a comprehensive production example, see Digital Domain Technologies' llms.txt at <https://allabout.network/llms.txt>, which demonstrates how to structure 91 posts across 6 categories with clear access guidelines and attribution requirements.

**Required elements:**

- Title (H1) — First element, identifies your site
- Description — Concise summary of your site's purpose
- Contact information — How to reach you regarding AI access

**Comprehensive template:**

```text
# TechStore

Electronics retailer serving the UK market with a focus on consumer tech and smart home products.

**Last updated:** January 2025
**Contact:** ai-policy@techstore.com

**Site Type:** E-Commerce, Product-Centric
**Purpose:** Product Sales and Customer Support
**Technology Stack:** RESTful API, Document-Based Architecture

## Access Guidelines

- Base Rate: 60 requests per hour per IP
- Burst Rate: Maximum 10 requests per minute
- Cooldown: 1 hour after exceeding rate limits
- Cache Retention: Maximum 24 hours
- Content Usage: Attribution required
- Commercial Use: Requires written permission
- Training Usage: Permitted for public product data only
- Attribution Format: "Source: TechStore (techstore.com)"

## Primary Documentation

Complete product catalogue and customer support:

- [Product Catalogue](https://techstore.com/products/): Full product listings with specifications
- [API Reference](https://api.techstore.com/docs/): REST API documentation and endpoints
- [Help Centre](https://techstore.com/help/): Customer support articles and guides
- [Store Locations](https://techstore.com/stores/): Physical store information

## Content Restrictions

- [Customer Accounts](https://techstore.com/account/): No AI access permitted
- [Order History](https://techstore.com/orders/): Authentication required
- [Admin Area](https://techstore.com/admin/): No AI access
- PII Handling: Do not extract or store personal information

## API Access

**Preferred method:** API
**Endpoint:** https://api.techstore.com/v1
**Documentation:** https://api.techstore.com/docs
**Authentication:** OAuth2 or API key
**Rate limits:** 200/minute for authenticated requests

## Training Guidelines

Permitted uses:
- Answering customer queries about products
- Generating product comparisons
- Creating purchase recommendations
- Summarising product specifications

Prohibited uses:
- Training on customer data or order history
- Extracting or storing customer PII
- Automated bulk scraping
- Price monitoring without permission
- Commercial aggregation without a license

## Error Handling

When encountering errors:
1. Cache error details, including timestamp and URL
2. Wait a minimum of 1 hour before retrying
3. Check system status at status.techstore.com
4. Contact api-support@techstore.com for persistent issues

Alternative access if page is unavailable:
- Product Search: /api/search?q=[query]
- Categories: /categories/
- Sitemap: /sitemap.xml

## For Human Visitors

Looking for the whole interactive experience?

- **Main Shop:** [techstore.com](https://techstore.com)
- **Customer Help:** [help@techstore.com](mailto:help@techstore.com)
- **About llms.txt:** [llmstxt.org](https://llmstxt.org)

## Contact

- General AI policy questions: [ai-policy@techstore.com](mailto:ai-policy@techstore.com)
- Abuse reports: [abuse@techstore.com](mailto:abuse@techstore.com)
- Technical API issues: [api-support@techstore.com](mailto:api-support@techstore.com)
- Privacy concerns: [privacy@techstore.com](mailto:privacy@techstore.com)

## Version Information

**Version:** 1.0 (Updated: January 2025)
**Changelog:** techstore.com/llms-changelog
**Next review:** Quarterly
```

**Site type categories to choose from:**

| Category | Description |
| -------- | ----------- |
| API-Driven | Technical documentation, service interfaces |
| Content-Driven | Blogs, news, informational sites |
| E-Commerce | Product and service sales |
| Document-Driven | Research, white papers, documentation |
| Informative | Educational platforms, learning resources |
| Entertainment | Media, games, leisure content |

**Functionality types:**

| Type | Description |
| ---- | ----------- |
| Static | Fixed content, minimal dynamic features |
| Dynamic | Content changes based on interaction |
| Interactive | Forms, calculators, user input |
| Transactional | Purchases, banking, data exchange |
| Community-Driven | User-generated content, forums |

Agents check this file first to understand how to interact with your site. Write it in English, as most LLMs translate content to English before processing.

For the full specification, see: <https://llmstxt.org>

### robots.txt, sitemap.xml, and llms.txt

These three files work together but serve different purposes:

| File | Purpose | Audience |
| ---- | ------- | -------- |
| robots.txt | Access control — what crawlers may access | Search engine bots |
| sitemap.xml | Content discovery — what pages exist | Search engines |
| llms.txt | Context and guidance — how to interact | AI/LLM agents |

**robots.txt — Access Control:**

```text
# robots.txt
User-agent: *
Disallow: /admin/
Disallow: /account/
Disallow: /cart/
Disallow: /checkout/

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Allow: /products/
Allow: /api/
Disallow: /

Sitemap: https://example.com/sitemap.xml
```

Note: robots.txt controls access, not usage rights. An AI agent respecting robots.txt may still be blocked from pages you'd want it to access. Use llms.txt for nuanced guidance.

**sitemap.xml — Content Discovery:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/products/wh-1000</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://example.com/products/wh-2000</loc>
    <lastmod>2025-01-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

The sitemap lists all indexable pages but provides no context on content types or interaction. AI agents can use it to discover pages, but need llms.txt for guidance.

**How They Work Together:**

```text
1. Agent checks robots.txt → "Am I allowed to access this site?"
2. Agent fetches llms.txt → "How should I interact? What are the rules?"
3. Agent consults sitemap.xml → "What pages exist?"
4. Agent accesses pages → Respects rate limits from llms.txt
```

**Reference llms.txt from robots.txt:**

```text
# robots.txt
User-agent: *
Disallow: /admin/

# AI agent guidance
# See /llms.txt for interaction policies

Sitemap: https://example.com/sitemap.xml
```

### The Three-Layer Approach

Use all three together for maximum clarity:

**Layer 1 — llms.txt (site-wide defaults)** — Emerging Convention:

```text
# /llms.txt
> Example Shop - Electronics retailer
preferred-access: api
api-endpoint: https://api.example.com/v1
rate-limit: 100/minute
extraction: product-data-allowed
```

**Layer 2 — Meta tags (page-specific)** — Proposed Pattern:

Page-specific meta tags can override site-wide defaults from llms.txt. Whilst no formal standard exists yet for AI-specific meta tags, the pattern of using `<meta name="ai-*">` follows established conventions, such as the robots meta tags.

```html
<head>
  <meta name="ai-api-endpoint" content="/api/v1/products/WH-1000">
  <meta name="ai-freshness" content="hourly">
  <meta name="ai-content-policy" content="full-extraction-allowed">
</head>
```

**Status:** Proposed pattern, not yet standardised. Forward-compatible - won't break if ignored.

**Layer 3 — JSON-LD (actual content)** — Established Standard:

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

1. Checks llms.txt — learns you have an API
2. Reads meta tags — finds this product's API endpoint
3. Fetches structured data — gets complete product information
4. Respects your rate limits and policies

---

## Part 6 — Why Modern Architecture Confuses AI

Before implementing solutions, it helps to understand why AI agents struggle with modern web architectures.

### The JavaScript Execution Problem

Most AI systems cannot execute JavaScript. This means:

- Content loaded asynchronously after the initial page load remains invisible
- Single Page Applications (SPAs) appear as empty shells
- Interactive elements that reveal content based on user actions are inaccessible
- React, Vue, and Angular components render to nothing

When an AI agent requests your SPA, it sees this:

```html
<div id="root"></div>
<script src="app.js"></script>
```

Not the rich content your users see after JavaScript executes.

### Context Separation

Headless architectures separate content from presentation. This creates problems:

- Content structure is divorced from visual presentation cues
- Spatial relationships that help humans understand hierarchy are lost
- Visual design elements that convey importance disappear
- Implicit information conveyed through design becomes inaccessible

For AI, accessing a headless website is like reading a document with no formatting, no headlines, and no visual organisation.

### The Dual-Channel Solution

The solution is "dual-channel content" — serving rich interactive experiences to humans while providing structured, accessible formats to AI systems that don't require JavaScript execution or visual interpretation.

This means:

1. **Server-Side Rendering (SSR)** — Pre-render JavaScript content on the server so AI receives complete HTML
2. **Static Site Generation (SSG)** — Generate static versions of dynamic content for AI consumption
3. **Structured Data** — Use JSON-LD to provide explicit relationship information (covered in Part 5)
4. **AI-Specific APIs** — Develop separate endpoints optimised for machine consumption

### Server-Side Rendering for AI

If you're using a JavaScript framework, enable SSR so the initial HTML response contains actual content:

**Without SSR (AI sees nothing):**

```html
<html>
<body>
  <div id="app"></div>
  <script src="bundle.js"></script>
</body>
</html>
```

**With SSR (AI sees content):**

```html
<html>
<body>
  <div id="app">
    <h1>Product Name</h1>
    <p class="price">£149.99</p>
    <p class="description">Product description here...</p>
    <!-- Full content rendered -->
  </div>
  <script src="bundle.js"></script>
</body>
</html>
```

Most modern frameworks support this:

| Framework | SSR Solution |
| --------- | ------------ |
| React | Next.js, Remix |
| Vue | Nuxt.js |
| Angular | Angular Universal |
| Svelte | SvelteKit |

### Progressive Enhancement

Build baseline experiences that work without JavaScript, then enhance for capable browsers:

1. **Start with semantic HTML** — Content readable without any JavaScript
2. **Add CSS** — Visual presentation that degrades gracefully
3. **Layer JavaScript** — Enhanced interactivity for capable clients

This approach serves everyone: AI agents, users with JavaScript disabled, users on slow connections, and screen readers.

### AI-Specific API Endpoints

For complex applications, consider dedicated API endpoints optimised for AI consumption:

```javascript
// Regular API (optimised for frontend)
GET /api/products/12345
{
  "id": 12345,
  "name": "Wireless Headphones",
  "price": 14999,  // Cents, frontend formats
  "images": ["img1.jpg", "img2.jpg"]
}

// AI-optimised API (includes context)
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

Document these endpoints in your llms.txt file:

```text
## AI API Access
- [Product Data](https://api.example.com/ai/products/): AI-optimised product information
- [Search](https://api.example.com/ai/search/): Structured search results
- Rate limit: 60 requests per hour
- Authentication: API key required
```

---

## Part 7 — Server-Side Patterns

Some patterns require server-side implementation.

### Agent Detection

Identify AI agents from request headers to serve appropriate responses or track usage separately.

**Common AI Agent User-Agents:**

| Agent | User-Agent Contains |
| ----- | ------------------- |
| OpenAI GPTBot | `GPTBot` |
| OpenAI ChatGPT | `ChatGPT-User` |
| Anthropic Claude | `ClaudeBot` or `Claude-Web` |
| Google Bard | `Google-Extended` |
| Bing/Copilot | `bingbot` |
| Perplexity | `PerplexityBot` |
| Common Crawl | `CCBot` |

**Express.js Detection Middleware:**

```javascript
function detectAgent(req, res, next) {
  const ua = req.headers['user-agent'] || '';
  
  const agentPatterns = {
    'gptbot': 'openai',
    'chatgpt': 'openai',
    'claudebot': 'anthropic',
    'claude-web': 'anthropic',
    'google-extended': 'google',
    'bingbot': 'microsoft',
    'perplexitybot': 'perplexity'
  };
  
  const lowerUA = ua.toLowerCase();
  
  for (const [pattern, provider] of Object.entries(agentPatterns)) {
    if (lowerUA.includes(pattern)) {
      req.isAIAgent = true;
      req.agentProvider = provider;
      req.agentUA = ua;
      break;
    }
  }
  
  req.isAIAgent = req.isAIAgent || false;
  next();
}

app.use(detectAgent);

// Use in routes
app.get('/products/:id', (req, res) => {
  if (req.isAIAgent) {
    // Log separately, serve JSON-LD enriched response
    logAgentAccess(req);
  }
  res.render('product', { product });
});
```

**Important:** Don't block agents unnecessarily. Use detection for analytics segmentation and serving appropriate content, not for denial of service.

### Cookie Consent and GDPR Banners

Cookie consent dialogs break AI agents when they overlay content or require interaction. Make consent state explicit and provide alternatives.

**Consent State in HTML:**

```html
<html data-consent-status="pending">
<body>
  <!-- Consent banner -->
  <dialog id="cookie-consent" 
          open
          aria-labelledby="consent-title"
          data-consent-required="true"
          data-consent-categories="necessary,analytics,marketing">
    
    <h2 id="consent-title">Cookie preferences</h2>
    <p>We use cookies to improve your experience.</p>
    
    <form action="/consent" method="POST">
      <fieldset>
        <label>
          <input type="checkbox" name="necessary" checked disabled>
          Necessary (required)
        </label>
        <label>
          <input type="checkbox" name="analytics" value="true">
          Analytics
        </label>
        <label>
          <input type="checkbox" name="marketing" value="true">
          Marketing
        </label>
      </fieldset>
      
      <button type="submit" name="action" value="accept-all">Accept all</button>
      <button type="submit" name="action" value="accept-selected">Accept selected</button>
      <button type="submit" name="action" value="reject-optional">Reject optional</button>
    </form>
  </dialog>
  
  <!-- Main content always accessible -->
  <main>
    <!-- Page content here -->
  </main>
</body>
</html>
```

**For AI Agents — Automatic Minimal Consent:**

```javascript
app.use((req, res, next) => {
  // AI agents get necessary-only cookies automatically
  if (req.isAIAgent) {
    req.consentLevel = 'necessary';
    res.locals.showConsentBanner = false;
  } else {
    req.consentLevel = req.cookies.consent || 'pending';
    res.locals.showConsentBanner = req.consentLevel === 'pending';
  }
  next();
});
```

**Consent via HTTP Header:**

AI agents can signal consent preferences:

```http
GET /products HTTP/1.1
Host: example.com
User-Agent: ClaudeBot/1.0
Sec-GPC: 1
```

The `Sec-GPC: 1` header (Global Privacy Control) signals do-not-track preference. Respect it for AI agents.

**Key principle:** Never let consent dialogs block page content. Use `<dialog>` that overlays but doesn't prevent DOM access. AI agents should receive page content regardless of consent state, with only necessary cookies set.

### Captcha and Bot Protection

Legitimate AI agents need access while blocking malicious bots—balance protection with accessibility.

**Allow Known AI Agents:**

```javascript
function botProtection(req, res, next) {
  // Known legitimate AI agents - allow through
  if (req.isAIAgent && isVerifiedAgent(req)) {
    return next();
  }
  
  // Suspicious patterns - challenge
  if (isSuspiciousRequest(req)) {
    return res.status(403).render('captcha-challenge');
  }
  
  next();
}

function isVerifiedAgent(req) {
  // Verify via reverse DNS for known providers
  const knownAgentIPs = {
    'openai': ['20.15.240.0/24', '20.171.206.0/24'],
    'anthropic': ['...'],
  };
  
  // Check if IP matches claimed provider
  const provider = req.agentProvider;
  const clientIP = req.ip;
  
  return verifyIPRange(clientIP, knownAgentIPs[provider]);
}
```

**Captcha Fallback for Agents:**

When you must use captcha, provide an alternative:

```html
<div class="bot-protection" data-protection-type="captcha">
  <p>Please verify you're human:</p>
  
  <!-- Standard captcha for browsers -->
  <div class="captcha-widget" id="recaptcha"></div>
  
  <!-- Alternative for AI agents -->
  <div class="agent-alternative" data-agent-visible="true" style="display: none;">
    <p>AI agents: Request API access instead.</p>
    <dl>
      <dt>API endpoint</dt>
      <dd>/api/v1/</dd>
      <dt>Authentication</dt>
      <dd>API key required</dd>
      <dt>Request access</dt>
      <dd>api-access@example.com</dd>
    </dl>
  </div>
</div>
```

**Rate Limiting Instead of Blocking:**

Prefer rate limiting over captcha for AI agents:

```javascript
const rateLimit = require('express-rate-limit');

// Separate limits for agents
const agentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // 100 requests per hour
  message: {
    error: 'rate_limit_exceeded',
    retry_after: 3600,
    llms_guidance: '/llms.txt'
  },
  skip: (req) => !req.isAIAgent
});

const humanLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  skip: (req) => req.isAIAgent
});

app.use('/products', agentLimiter, humanLimiter);
```

**Document your bot policy in llms.txt:**

```text
## Bot Protection

We use rate limiting rather than captcha for verified AI agents.
- Verified agents: 100 requests/hour
- Unverified requests: May encounter captcha
- To verify your agent: Contact api-access@example.com with your IP ranges
- API access available for high-volume needs
```

### Traditional HTTP Patterns

Single-page applications create ambiguity. Traditional patterns provide clarity.

**Form submission flow:**

```text
1. User submits form (POST /checkout)
2. Server processes request
3. Server responds with 303 See Other, Location: /checkout/confirmation
4. Browser follows redirect (GET /checkout/confirmation)
5. Confirmation page displays
```

This gives agents clear signals:

- 303 response means "action completed, look here for result"
- New URL confirms state change
- GET request is safe to retry

**Implementation:**

```javascript
// Express.js example
app.post('/checkout', (req, res) => {
  const order = processOrder(req.body);
  
  if (order.success) {
    // 303 redirect after successful POST
    res.redirect(303, `/orders/${order.id}/confirmation`);
  } else {
    // Return to form with errors
    res.status(400).render('checkout', { 
      errors: order.errors,
      values: req.body 
    });
  }
});
```

### Rate Limit Communication

When rate limiting, tell agents exactly what happened and when to retry:

**HTTP Response:**

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1705329600
Content-Type: application/json

{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Try again in 60 seconds.",
  "retry_after": 60
}
```

**In page content when applicable:**

```html
<div role="alert" data-error-type="rate-limit" data-retry-after="60">
  <p>You're making requests too quickly. Please wait 60 seconds.</p>
</div>
```

Always include the `Retry-After` header. Agents can parse it and wait appropriately.

### Error Handling for AI Clients

When AI agents encounter errors, they need guidance on what to do next. Point them to your llms.txt file so they can find alternative resources or understand your site structure.

**404 Page with llms.txt Reference:**

Add a meta tag to your 404 page directing AI to your llms.txt:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="llms-section" content="/llms.txt">
  <title>404 Not Found</title>
</head>
<body>
  <h1>404</h1>
  <p>Page Not Found</p>
  <p><a href="/">Go back to Home</a></p>
</body>
</html>
```

The `llms-section` meta tag tells AI agents where to find site navigation guidance when a page doesn't exist.

**Nginx Configuration for AI Fallback:**

Configure your server to provide llms.txt as a fallback with appropriate headers:

```nginx
# Nginx configuration for AI error handling
location @llms_fallback {
    try_files /llms.txt =404;
    add_header Content-Type text/markdown;
    add_header X-Content-Section "optional-details";
}

error_page 404 = @llms_fallback;
```

**Express.js Error Handling:**

For Node.js applications, add the header to your 404 handler:

```javascript
// 404 handler - after all other routes
app.use((req, res, next) => {
  res.status(404)
     .setHeader('X-llms-Section', '/llms.txt')
     .sendFile(path.join(__dirname, '404.html'));
});

// General error handler - must be last
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status)
     .setHeader('X-llms-Section', '/llms.txt')
     .json({
       error: err.message,
       llms_guidance: '/llms.txt',
       status: status
     });
});
```

**API Error Responses for AI:**

When your API returns errors, include guidance for AI clients:

```json
{
  "error": "resource_not_found",
  "message": "Product ID 12345 does not exist",
  "status": 404,
  "ai_guidance": {
    "llms_txt": "/llms.txt",
    "search_endpoint": "/api/search",
    "suggestion": "Try searching for similar products",
    "categories": "/api/categories"
  }
}
```

This gives AI agents alternative paths when their initial request fails, rather than leaving them at a dead end.

### Production Deployment Examples

For production-ready implementations, see the `code-examples/` directory, which contains platform-specific configurations

**Platform Configurations:**

- **Apache**: [code-examples/apache/.htaccess](code-examples/apache/.htaccess) - HTTP Link headers for AI discovery
- **Nginx**: [code-examples/nginx/ai-headers.conf](code-examples/nginx/ai-headers.conf) and [rate-limiting.conf](code-examples/nginx/rate-limiting.conf) - Headers and rate limiting using `map` directive
- **Next.js**: [code-examples/nextjs/next.config.js](code-examples/nextjs/next.config.js), [AIHandshake.jsx](code-examples/nextjs/AIHandshake.jsx), [dynamic-query-index.js](code-examples/nextjs/dynamic-query-index.js) - Complete React integration
- **WordPress**: [code-examples/wordpress/functions-headers.php](code-examples/wordpress/functions-headers.php), [generate-query-index.php](code-examples/wordpress/generate-query-index.php) - PHP functions
- **Adobe EDS**: [code-examples/eds/helix-query.yaml](code-examples/eds/helix-query.yaml) - Query index configuration
- **Static Sites**: [code-examples/static-site/generate-index.js](code-examples/static-site/generate-index.js) - Universal generator for Hugo, Jekyll, Gatsby

**Validation Scripts:**

- **Development**: [code-examples/validation/verify-ai-simple.js](code-examples/validation/verify-ai-simple.js) - Quick file accessibility check (30 lines)
- **Production**: [code-examples/validation/verify-ai-production.js](code-examples/validation/verify-ai-production.js) - Comprehensive validation with structure checks (115 lines)
- **CI/CD**: [code-examples/validation/github-actions.yml](code-examples/validation/github-actions.yml) - Automated health checks on every commit

**Monitoring Tools:**

- **Log Analysis**: [code-examples/monitoring/server-log-analysis.sh](code-examples/monitoring/server-log-analysis.sh) - Parse Apache/Nginx logs for AI bot patterns, report visits by type, most accessed paths, 404 errors
- **Analytics**: [code-examples/monitoring/analytics-tracking.js](code-examples/monitoring/analytics-tracking.js) - Google Analytics 4 integration for tracking AI agent visits

All code examples include updated user-agent detection for 2025 AI agents (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, google-extended, anthropic-ai, cohere-ai, DeepSeek-Bot, Gemini-Bot)

**HTTP Link Header Syntax Note**: The configurations use RFC 8288 Link header format. Angle brackets `<>` wrap only the URI - link parameters like `rel` go outside the brackets, separated by semicolons. Example: `Link: <https://yoursite.com/llms.txt>; rel="llms-txt"`. This is the server response header format, different from HTML/markdown link syntax.

For complete implementation details and quick-start guides, see [code-examples/README.md](code-examples/README.md).

---

## Part 8 — Complete Examples

### Small Business Template

You don't need complex infrastructure. Here's a complete small business page:

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Luigi's Pizza - Manchester</title>
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Luigi's Pizza",
    "image": "https://luigis-pizza.example.com/storefront.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "Manchester",
      "postalCode": "M1 1AA",
      "addressCountry": "GB"
    },
    "telephone": "+44-161-123-4567",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "11:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "12:00",
        "closes": "23:00"
      }
    ],
    "priceRange": "££",
    "servesCuisine": "Italian",
    "menu": "https://luigis-pizza.example.com/menu",
    "acceptsReservations": "True"
  }
  </script>
</head>

<body>
  <header>
    <h1>Luigi's Pizza</h1>
    <p>Authentic Italian pizza in Manchester since 1985</p>
  </header>

  <main>
    <section id="contact">
      <h2>Find Us</h2>
      <address>
        123 Main Street<br>
        Manchester M1 1AA
      </address>
      <p>Phone: <a href="tel:+441611234567">0161 123 4567</a></p>
    </section>

    <section id="hours">
      <h2>Opening Hours</h2>
      <dl>
        <dt>Monday–Friday</dt>
        <dd>11:00 AM – 10:00 PM</dd>
        <dt>Saturday–Sunday</dt>
        <dd>12:00 PM – 11:00 PM</dd>
      </dl>
    </section>

    <section id="menu">
      <h2>Menu</h2>
      
      <article class="menu-item" itemscope itemtype="https://schema.org/MenuItem">
        <h3 itemprop="name">Margherita</h3>
        <p itemprop="description">Tomato sauce, mozzarella, fresh basil</p>
        <p class="price">
          <span itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <span itemprop="priceCurrency" content="GBP">£</span>
            <span itemprop="price" content="12.50">12.50</span>
          </span>
        </p>
      </article>

      <article class="menu-item" itemscope itemtype="https://schema.org/MenuItem">
        <h3 itemprop="name">Pepperoni</h3>
        <p itemprop="description">Tomato sauce, mozzarella, spicy pepperoni</p>
        <p class="price">
          <span itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <span itemprop="priceCurrency" content="GBP">£</span>
            <span itemprop="price" content="14.00">14.00</span>
          </span>
        </p>
      </article>
    </section>

    <section id="reservations">
      <h2>Book a Table</h2>
      <form action="/book" method="POST" data-state="incomplete">
        <div class="field">
          <label for="name">Your name</label>
          <input type="text" id="name" name="name" required
                 data-validation-state="pending">
        </div>
        
        <div class="field">
          <label for="phone">Phone number</label>
          <input type="tel" id="phone" name="phone" required
                 data-validation-state="pending">
        </div>
        
        <div class="field">
          <label for="date">Date</label>
          <input type="date" id="date" name="date" required
                 min="2025-01-01"
                 data-validation-state="pending">
        </div>
        
        <div class="field">
          <label for="time">Time</label>
          <select id="time" name="time" required>
            <option value="">Select a time</option>
            <option value="18:00">6:00 PM</option>
            <option value="18:30">6:30 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="19:30">7:30 PM</option>
            <option value="20:00">8:00 PM</option>
            <option value="20:30">8:30 PM</option>
          </select>
        </div>
        
        <div class="field">
          <label for="guests">Number of guests</label>
          <input type="number" id="guests" name="guests" 
                 min="1" max="12" value="2" required>
        </div>
        
        <button type="submit">Request Booking</button>
      </form>
    </section>
  </main>
</body>
</html>
```

No JavaScript required. Complete structured data. Clear forms with explicit state. Semantic HTML throughout.

**Cost:** Zero. No frameworks, no APIs, no build tools.

### E-commerce Product Page Template

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wireless Headphones - TechStore</title>
  
  <meta name="ai-api-endpoint" content="/api/v1/products/WH-1000">
  <meta name="ai-freshness" content="hourly">
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Wireless Headphones WH-1000",
    "description": "Over-ear wireless headphones with active noise cancellation",
    "sku": "WH-1000",
    "brand": {
      "@type": "Brand",
      "name": "AudioTech"
    },
    "offers": {
      "@type": "Offer",
      "price": "149.99",
      "priceCurrency": "GBP",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "inventoryLevel": {
        "@type": "QuantitativeValue",
        "value": 23
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "GBP"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          }
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.3",
      "reviewCount": "127"
    }
  }
  </script>
</head>

<body>
<main itemscope itemtype="https://schema.org/Product">
  <h1 itemprop="name">Wireless Headphones WH-1000</h1>
  
  <div class="product-price">
    <span class="currency">£</span>
    <span class="amount" itemprop="price" content="149.99">149.99</span>
    <span class="vat-status">inc. VAT</span>
  </div>

  <div class="stock-info" data-availability="in-stock" data-quantity="23">
    <p>In stock: 23 available</p>
    <p>Free delivery</p>
    <p>Ships within 1-2 days</p>
  </div>

  <form action="/cart/add" method="POST" data-state="complete">
    <input type="hidden" name="product_id" value="WH-1000">

    <div class="field">
      <label for="quantity">Quantity</label>
      <input type="number"
             id="quantity"
             name="quantity"
             min="1"
             max="23"
             value="1"
             data-validation-state="valid">
    </div>

    <button type="submit">Add to basket</button>
  </form>

  <div class="agent-metadata" data-agent-visible="true" style="display: none;">
    <h2>Purchase Information</h2>
    <dl>
      <dt>Action</dt>
      <dd>POST to /cart/add</dd>

      <dt>Required parameters</dt>
      <dd>product_id=WH-1000, quantity (1-23)</dd>

      <dt>Prerequisites</dt>
      <dd>
        <ul>
          <li>Authentication: Optional for cart, required for checkout</li>
          <li>Payment method: Required at checkout</li>
          <li>Shipping address: Required at checkout</li>
        </ul>
      </dd>

      <dt>Expected response</dt>
      <dd>Success: 303 redirect to /cart | Error: 400 with JSON details</dd>
    </dl>
  </div>
</main>
</body>
</html>
```

---

## Part 9 — Testing and Validation

### Automated Testing with Playwright

Test your implementations with automated tools:

```javascript
const { test, expect } = require('@playwright/test');

test('form has explicit state', async ({ page }) => {
  await page.goto('/booking');

  // Check form has state attribute
  const formState = await page.getAttribute('form', 'data-state');
  expect(formState).toBeDefined();

  // Check fields have validation state
  const emailState = await page.getAttribute('#email', 'data-validation-state');
  expect(emailState).toBeDefined();
});

test('errors persist after timeout', async ({ page }) => {
  await page.goto('/checkout');

  // Submit with invalid data
  await page.fill('#email', 'invalid');
  await page.click('[type="submit"]');

  // Error should be visible
  const errorVisible = await page.isVisible('.error-summary');
  expect(errorVisible).toBe(true);

  // Wait to verify it doesn't disappear
  await page.waitForTimeout(5000);
  const stillVisible = await page.isVisible('.error-summary');
  expect(stillVisible).toBe(true);
});

test('complete information visible on product page', async ({ page }) => {
  await page.goto('/product/12345');

  // Check for JSON-LD
  const jsonLd = await page.$('script[type="application/ld+json"]');
  expect(jsonLd).toBeTruthy();

  // Check for explicit pricing
  const price = await page.$('[data-price]');
  expect(price).toBeTruthy();
  
  // Check stock information is explicit
  const stockInfo = await page.$('[data-in-stock]');
  expect(stockInfo).toBeTruthy();
});

test('authentication state is explicit', async ({ page }) => {
  await page.goto('/');
  
  // Auth status should always be present
  const authStatus = await page.$('#auth-status');
  expect(authStatus).toBeTruthy();
  
  // Should have data-authenticated attribute
  const isAuthenticated = await page.getAttribute('#auth-status', 'data-authenticated');
  expect(['true', 'false']).toContain(isAuthenticated);
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

test('pagination includes total counts', async ({ page }) => {
  await page.goto('/products?page=2');
  
  // Check pagination has metadata
  const pagination = await page.$('.pagination');
  if (pagination) {
    const currentPage = await page.getAttribute('.pagination', 'data-current-page');
    const totalPages = await page.getAttribute('.pagination', 'data-total-pages');
    
    expect(currentPage).toBe('2');
    expect(parseInt(totalPages)).toBeGreaterThan(0);
  }
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

test('404 page references llms.txt', async ({ page }) => {
  await page.goto('/nonexistent-page-12345');
  
  // Check for llms-section meta tag
  const llmsSection = await page.$('meta[name="llms-section"]');
  expect(llmsSection).toBeTruthy();
  
  const content = await page.getAttribute('meta[name="llms-section"]', 'content');
  expect(content).toBe('/llms.txt');
});

test('consent banner does not block content', async ({ page }) => {
  await page.goto('/products/wh-1000');
  
  // Even with a consent banner, product info should be accessible
  const productName = await page.$('h1');
  expect(productName).toBeTruthy();
  
  const price = await page.$('[data-price]');
  expect(price).toBeTruthy();
});
```

If these tests fail, you've broken agent compatibility.

### Testing - Validation Tools

Verify your implementations with these tools:

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

---

## Part 10 — Implementation Priority

### For Web Interfaces (Parts 1-9)

#### Web Interfaces - Priority 1: Critical Quick Wins

1. Remove toast notifications
2. Make error messages persistent
3. Show complete pricing upfront
4. Add authentication state attributes
5. Add one piece of JSON-LD structured data
6. Add breadcrumb navigation with Schema.org markup

#### Web Interfaces - Priority 2: Essential Improvements

1. Add explicit state attributes (`data-state`, `data-validation-state`)
2. Implement synchronous form validation
3. Remove unnecessary pagination
4. Create a basic `llms.txt` file
5. Use standard form field names
6. Add `<meta name="llms-section" content="/llms.txt">` to your 404 page
7. Make cart state machine-readable
8. Add currency/locale data attributes

#### Web Interfaces - Priority 3: Core Infrastructure

1. Add JSON-LD to all page types
2. Implement traditional HTTP patterns (POST → 303 → confirmation)
3. Use proper HTTP status codes
4. Add meta tags for agent guidance
5. Add agent-readable purchase metadata
6. Add X-llms-Section headers to server error responses
7. Include ai_guidance object in API error JSON
8. Make search results and filters machine-readable
9. Add success confirmation pages with explicit order data
10. Implement shipping options with explicit pricing and timeframes

#### Priority 4: Advanced Features

1. Build or document API access
2. Add rate limit headers and communication
3. Implement multi-step wizard patterns
4. Create agent testing suite
5. Monitor agent traffic separately from human traffic
6. Evaluate SSR/SSG if using JavaScript frameworks
7. Consider AI-specific API endpoints for complex applications
8. Implement agent detection middleware
9. Create sitemap.xml if not present
10. Review cookie consent for AI agent compatibility
11. Document bot policy in llms.txt

### For Development Codebases (Part 12)

#### Development Codebases - Priority 1: Critical Quick Wins

1. Add generation markers to all generated files
2. Document your build pipeline in a single file
3. Create a `docs/for-ai/` folder with a SKILL.md entry point

#### Development Codebases - Priority 2: Essential Improvements

1. Rename folders to be semantic (describe purpose, not type)
2. Mark modification boundaries in your project structure
3. Create `docs/for-ai/debug.md` with transformation mappings
4. Add system-architecture.md and conventions.md

#### Development Codebases - Priority 3: Core Infrastructure

1. Document all code generation and transformation processes
2. Create `.ai-debug-config.yml` for distributed systems
3. Flatten deep hierarchies where possible
4. Complete the docs/for-ai/ skill set with data flow and component relationships

---

## Part 11 — Why This Matters

These patterns don't just help AI agents. They help:

- **Screen reader users** — semantic HTML, explicit state, persistent errors
- **Keyboard users** — clear focus states, explicit navigation
- **People with cognitive disabilities** — plain language, predictable layouts
- **Users with motor impairments** — forgiving inputs, clear error recovery
- **People with ADHD** — errors that persist, not vanishing toasts
- **Stressed users** — complete information visible, no guessing
- **Anyone on slow connections** — less JavaScript, clearer HTML

Building for AI agents means building better web interfaces for everyone.

---

---

## Part 12 — Building for AI Development Assistants

The patterns above focus on web interfaces for AI agents interacting with end users. This section covers building codebases that AI coding assistants can understand and work with effectively.

AI assistants learn through "skills" — structured documentation that teaches them how to work with specific technologies. You can extend this pattern to your own codebase, giving AI deep understanding of your architecture, conventions, and transformation processes.

### The Runtime Debugging Trap

AI assistants naturally debug what they can see, not what they should modify. In modern development, the code AI observes at runtime often bears little resemblance to your source code. Templates become components. Configuration generates routes. Build processes transform everything.

**The failure cycle:**

1. AI spots a bug in a generated component file
2. AI suggests a fix that resolves the runtime issue
3. Developer applies the fix — problem disappears
4. Next deployment regenerates the component from source templates
5. Bug returns, fix is gone, confusion ensues

**Solution:** Document your build pipeline and mark generated files clearly so AI debugs source templates, not runtime output.

### Semantic Folder Structure

Use folder names that encode meaning. AI can't interpret conventions the way humans do.

**Bad — Requires human interpretation:**

```text
project/
├── src/
│   ├── components/
│   ├── utils/
│   └── lib/
```

**Good — Self-documenting:**

```text
project/
├── user-management/
│   ├── authentication/
│   ├── profile-updates/
│   └── session-handling/
└── content-delivery/
    ├── static-assets/
    └── dynamic-generation/
```

A `user-authentication` directory communicates purpose; an `auth` folder requires human interpretation.

### Modification Boundaries

In codebases spanning multiple services, AI needs explicit guidance about what it can safely change:

```text
project/
├── core/                     # AI: Never modify
│   ├── framework/           # Protected framework files
│   └── vendor/              # Third-party dependencies
├── config/                   # AI: Modify with caution
│   ├── environment.yml      # Review required
│   └── deployment.yml       # Staging only
└── application/             # AI: Safe to modify
    ├── business-logic/      # Primary development area
    ├── integrations/        # Service connectors
    └── custom-components/   # User-defined functionality
```

### Documentation for AI (Skills Pattern)

AI coding assistants like Claude use "skills" — folders containing in-depth learning material that help them understand how to work with specific technologies. The `docs/for-ai/` pattern extends this concept to your own codebase.

Think of it as teaching material. Just as Claude reads skill files to learn how to create spreadsheets or presentations, it can read your `docs/for-ai/` folder to learn how your specific system works.

Create a `docs/for-ai/` folder with technical system documentation optimised for AI consumption. This is not project requirements or AI personas — it's architectural knowledge that helps AI assistants understand your codebase deeply:

```text
docs/
├── for-humans/
│   ├── getting-started.md
│   └── user-guides/
└── for-ai/
    ├── README.md                     # Entry point - overview and index
    ├── system-architecture.md        # How components connect
    ├── data-flow-mapping.md          # How data moves through system
    ├── component-relationships.md    # Dependencies and interactions
    ├── build-process-guide.md        # Source to runtime transformations
    ├── conventions.md                # Naming patterns, file organisation
    └── troubleshooting-guides/       # Framework-specific debugging
```

**README.md as entry point:**

```markdown
# Project Skills - [Your Project Name]

> [One-line description of what this codebase does]

This folder contains learning material for AI assistants working with this codebase.

## Read First
- system-architecture.md - understand how components connect
- conventions.md - naming patterns and organisation rules

## When Debugging
- build-process-guide.md - source to runtime transformations
- data-flow-mapping.md - trace data through the system

## Key Concepts
- [Concept 1]: See component-relationships.md
- [Concept 2]: See data-flow-mapping.md

## What Not To Do
- Never modify files in /core/ or /vendor/
- Never edit .generated.js files directly
- Always trace bugs to source templates, not build output
```

This separation allows you to optimise each documentation type for its intended audience — narrative explanations for humans, structured technical knowledge for AI. The AI can read these files to build deep understanding of your system before attempting any work.

### Runtime Transformation Documentation

When your system generates or transforms code dynamically, document the transformation process explicitly. This directly addresses the runtime debugging trap:

```markdown
# docs/for-ai/debug.md

## Runtime Code Transformations

### The Golden Rule
Never debug or modify generated files directly — always trace back to source.

### Template-to-Code Generation
- Source: `templates/component.hbs` 
- Runtime: `build/components/UserCard.js`
- Transformation: Handlebars → ES6 modules
- AI Pitfall: Changes to generated files get overwritten on next build
- Solution: Modify template, run `npm run generate`

### Dynamic Route Generation  
- Source: `config/routes.yml`
- Runtime: Express middleware registration
- Transformation: YAML → Express route handlers
- AI Pitfall: Route debugging requires checking both config and middleware logs
- Solution: Change YAML config, restart server for regeneration

### Debugging Strategy for AI
1. First: Identify if file is generated (check `/build/`, `/dist/`, `.generated` markers)
2. Then: Trace back to source templates/configs
3. Always: Check transformation logs in `/logs/build-process.log`
4. Never: Modify generated files directly
5. Instead: Use `npm run debug:transformations` to see source→runtime mapping
```

### Distributed System Debug Configuration

When your application flows across multiple cloud services, document the debugging interfaces:

```yaml
# .ai-debug-config.yml

touch-points:
  - service: user-auth
    debug-endpoint: /debug/trace
    logs: cloudwatch:auth-service
    safe-restart: true
  
  - service: payment-processing  
    debug-endpoint: /health/detailed
    logs: datadog:payments
    safe-restart: false  # Critical service - never restart

  - service: content-delivery
    debug-endpoint: /debug/cache-status
    logs: local:nginx.log
    safe-restart: true
```

This teaches AI where it can gather debugging information without disrupting critical services.

### Marking Generated Files

Add clear markers to generated files so AI knows not to modify them:

```javascript
/**
 * AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
 * 
 * Source: templates/api-client.hbs
 * Generated: 2025-01-15T10:30:00Z
 * Regenerate: npm run generate:api-client
 * 
 * Changes to this file will be lost on next build.
 */
```

Or use file naming conventions:

```text
build/
├── UserCard.generated.js
├── routes.generated.js
└── api-client.generated.js
```

### Priority Ranking for AI-Ready Architecture

| Priority | Action | Effort | Impact |
| -------- | ------ | ------ | ------ |
| 1 | Stop the runtime debugging trap — document build pipeline, mark generated files | Low | High |
| 2 | Semantic folder names, create docs/for-ai/, mark modification boundaries | Low | High |
| 3 | Adopt flat structures that both humans and AI can understand | Medium | Medium |
| 4 | Make build processes traceable from source to runtime | Medium | High |
| 5 | Implement distributed debug configuration for multi-service systems | High | High |

Start with priority 1 (costs nothing, saves time immediately), then implement priority 2 (low effort, high impact).

---

## Summary

**Build HTML where:**

- State is explicit in attributes, not inferred from visuals
- Errors persist until fixed, not disappear in toasts
- Forms validate synchronously and show all errors
- Information is complete on one page, not split unnecessarily
- Pricing is honest and upfront, not hidden until checkout
- Structure is semantic with JSON-LD markup
- URL changes reflect state changes
- HTTP status codes communicate accurately

This isn't accommodation. This is good design that serves everyone.

---

## Resources

### Standards

- **Schema.org**: `https://schema.org` — Structured data vocabulary
- **JSON-LD**: `https://json-ld.org` — Linked data format
- **WCAG**: `https://www.w3.org/WAI/WCAG21/quickref/` — Accessibility guidelines
- **WAI-ARIA**: `https://www.w3.org/WAI/ARIA/` — Accessible Rich Internet Applications
- **llms.txt**: `https://llmstxt.org` — Standard for AI content interaction

### Resources - Validation Tools

- **Google Rich Results Test**: `https://search.google.com/test/rich-results`
- **Schema Markup Validator**: `https://validator.schema.org`
- **HTML Validator**: `https://validator.w3.org`
- **WAVE**: `https://wave.webaim.org` — Accessibility testing

### Guides

- **Creating an llms.txt File**: `https://allabout.network/blogs/ddt/creating-an-llms-txt` — Practical implementation guide
- **Building Software for AI**: `https://allabout.network/blogs/ddt/ai/you-built-software-for-humans-now-build-it-for-ai` — Architecture patterns for AI coding assistants
- **Why Modern Web Architecture Confuses AI**: `https://allabout.network/blogs/ddt/ai/why-modern-web-architecture-confuses-ai` — Understanding the JavaScript execution problem
- **AI Optimization Update**: `https://allabout.network/blogs/ddt/ai/ai-optimization-update` — The evolving landscape of AI-web interaction

### Further Reading

For business implications, security considerations, and legal frameworks, see *The Invisible Users: Designing the Web for AI Agents and Everyone Else*.
