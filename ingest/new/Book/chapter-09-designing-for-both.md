# Chapter 9 - Designing for Both

The patterns that break AI agents are the same patterns that have frustrated humans for years. This isn't coincidence. It's the key to solving both problems at once.

In Chapter 1, I mentioned that what agents need is mostly what everyone needs. Now let me show you exactly what that means - and why it creates a single design target rather than competing requirements.

## The Convergence Principle

Screen readers need semantic HTML to understand page structure. So do agents.

Keyboard users need clear focus states and explicit navigation. Agents need explicit state and clear action paths.

People with cognitive disabilities benefit from plain language and predictable layouts. Agents parse better when content is clear and consistent.

Users with motor impairments need forgiving inputs and clear error recovery. Agents need validation that explains what's wrong and how to fix it.

**These aren't four different problems. They're the same problem expressed differently.**

Consider a typical error pattern. Your form submission fails. The error appears in a toast notification that slides in from the corner, displays for three seconds, then vanishes.

**For agents:** The error is invisible by the time they check for it. They report success when the task failed.

**For screen reader users:** The error might be announced, but if they're navigating elsewhere when it appears, they miss it entirely.

**For people with ADHD:** Three seconds isn't enough time to read, understand, and act on the message whilst managing other cognitive demands.

**For stressed users:** A parent managing children whilst trying to complete a transaction might look away at exactly the wrong moment.

The toast notification fails everyone. It just affects different groups in different ways.

Now consider the alternative. The error appears at the top of the form, stays visible until resolved, and clearly states what's wrong and how to fix it.

**For agents:** The error is present in the DOM when they parse the page. They can read it and respond appropriately.

**For screen reader users:** The error is announced and remains available to review whilst correcting the problem.

**For people with ADHD:** The error stays visible as a reference whilst they locate and fix the issue.

**For stressed users:** The error is still there when they return their attention to the screen.

This single change helps everyone. Not perfectly - different users have different needs - but substantially.

### The Business Case

This convergence has commercial implications. In the UK, roughly 16 million people have some form of disability. Globally, the World Health Organisation estimates 1.3 billion people - 16% of the population - experience significant disability.

When you design for agents, you're simultaneously designing for this population. The return on investment doubles because each improvement serves multiple audiences.

Accessibility lawsuits are increasing. The Americans with Disabilities Act, the UK Equality Act, and the European Accessibility Act all create legal obligations. Agent-friendly design that improves accessibility helps you meet these requirements.

More pragmatically: the patterns that work for agents also work for everyone using your site under non-ideal conditions. Slow connections. Old devices. Bright sunlight making screens hard to read. Noisy environments. Distracted attention. These "situational disabilities" affect most users at some point.

**Solving for agents means solving for the edges. And the edges are where you lose customers.**

## Clear State, Always Visible

Traditional web design treats state as something users should infer from visual cues. A spinner means loading. A button turning grey means disabled. Content appearing means success.

This works when you're watching continuously. It fails when you look away, when visual cues are subtle, or when you're not human.

**The solution: Make state explicit and persistent.**

### Loading States

**Before - Ambiguous:**
```html
<div class="spinner"></div>
```

The spinner appears. Then it disappears. Was that success or failure? How long should you wait? Is it still loading or did it finish?

**After - Explicit:**
```html
<div class="loading-indicator" 
     data-state="loading"
     data-started="2024-12-21T10:30:00Z"
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
     data-loaded-at="2024-12-21T10:30:02Z">
  <!-- Product information -->
</div>
```

Everyone knows exactly what's happening. Agents can check the `data-state` attribute. Humans can read the text. Screen readers announce status changes. The `aria-live="polite"` ensures assistive technology users hear updates without being interrupted mid-task.

### Form States

**Before - Mysterious:**
```html
<button disabled>Submit</button>
```

Why is it disabled? What needs to change? Users are left guessing.

**After - Informative:**
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

The button explains why it's disabled. The form status shows exactly what's needed. Progress is measurable. Screen readers can announce the status. Agents can parse the requirements.

## Persistent Errors, Not Ephemeral Ones

Errors need to stick around until they're fixed.

### The Error Display Pattern

**Before - Toast that vanishes:**
```html
<div class="toast toast-error" style="animation: fadeOut 3s forwards;">
  Email address is invalid
</div>
```

**After - Persistent and connected:**
```html
<form id="booking-form">
  <!-- Error summary at top, always visible when errors exist -->
  <div class="error-summary" 
       role="alert" 
       aria-live="assertive">
    <h2>Please fix the following errors</h2>
    <ul id="error-list">
      <li><a href="#email">Email address format is invalid</a></li>
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

When an error occurs:
1. The error summary becomes visible with links to each problematic field
2. The specific field shows its error with `aria-invalid="true"`
3. Both remain visible until fixed
4. Screen readers announce errors via `role="alert"`
5. Keyboard users can jump directly to problematic fields

No toasts. No auto-dismissing messages. No information loss.

## Complete Information, No Forced Pagination

Remember the tour company that split their 14-day itinerary across 14 pages? They lost business because my agent couldn't navigate the pagination. But they also lost business from humans who wanted to compare the full journey at a glance.

The solution isn't complicated. Show complete information on one page with good organisation.

### The Tour Itinerary Pattern

**Before - Forced pagination:**
```
Day 1: Bangkok (see full details)
[Next →]
```

Fourteen pages. Fourteen clicks. Context lost between each page.

**After - Complete with navigation:**
```html
<article class="tour-itinerary">
  <h1>14-Day Southeast Asia Adventure</h1>
  
  <nav class="day-navigation" aria-label="Jump to day">
    <a href="#day-1">Day 1: Bangkok</a>
    <a href="#day-2">Day 2: Ayutthaya</a>
    <!-- ... through Day 14 -->
  </nav>

  <section id="day-1" class="day-detail">
    <h2>Day 1 - Bangkok</h2>
    <p>Arrive in Bangkok. Airport transfer to hotel...</p>
    <dl>
      <dt>Accommodation</dt>
      <dd>Grande Centre Point Hotel</dd>
      <dt>Meals</dt>
      <dd>Dinner included</dd>
      <dt>Activities</dt>
      <dd>Welcome reception, orientation walk</dd>
    </dl>
  </section>

  <section id="day-2" class="day-detail">
    <h2>Day 2 - Ayutthaya</h2>
    <!-- Day 2 content -->
  </section>

  <!-- Days 3-14 follow the same pattern -->
</article>
```

**Benefits for everyone:**
- Agents see everything in one request
- Humans can scan the full itinerary
- Jump navigation provides quick access to specific days
- Printable as a single document
- Searchable with browser find function (Ctrl+F)
- Screen readers can navigate by heading
- Comparison with other tours becomes possible

**What about engagement metrics?** You get one page view instead of 14. But you get actual bookings instead of abandoned browsing. Measure what matters.

## Semantic Structure with JSON-LD

HTML tells browsers how to display content. JSON-LD tells machines what content means.

### Product Information

**Before - Visual only:**
```html
<div class="product">
  <h1>Wireless Headphones</h1>
  <p class="price">£149.99</p>
  <p class="stock">In stock</p>
  <button>Add to basket</button>
</div>
```

An agent can guess this is a product with a price. But is £149.99 the final price or before VAT? Is "In stock" binary or are there 3 left? What happens when you click the button?

**After - Semantically rich:**
```html
<div class="product" itemscope itemtype="https://schema.org/Product">
  <h1 itemprop="name">Wireless Headphones</h1>
  
  <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <p class="price">
      <span itemprop="priceCurrency" content="GBP">£</span>
      <span itemprop="price" content="149.99">149.99</span>
      <span class="price-note">(includes VAT)</span>
    </p>
    <p class="stock">
      <link itemprop="availability" href="https://schema.org/InStock"/>
      In stock: <span itemprop="inventoryLevel">23</span> available
    </p>
  </div>
  
  <button>Add to basket</button>
</div>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Wireless Headphones",
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
    "seller": {
      "@type": "Organization",
      "name": "TechStore Ltd"
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
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": 1,
          "maxValue": 3,
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
```

Now an agent knows:
- Exactly what the product is (name, SKU, brand)
- The price is £149.99 GBP, valid until end of 2025
- 23 units are in stock
- Shipping is free, takes 2-5 days total
- Customers rate it 4.3/5 based on 127 reviews

This same structured data helps Google display rich snippets. It helps price comparison sites. It helps future tools we haven't imagined yet.

### Schema.org Vocabulary

Schema.org provides vocabularies for most things you'd want to describe:

- **Products and offers** - prices, availability, shipping, reviews
- **Local businesses** - opening hours, location, contact details
- **Events** - dates, venues, ticket availability
- **Recipes** - ingredients, cooking time, nutrition
- **Articles** - author, publication date, word count
- **Services** - what's offered, pricing, availability
- **People** - job titles, affiliations, contact info

Use the vocabulary that matches your content. Start with one type and expand.

## Advertising Your API

If you have an API that's better for agents than scraping your HTML, tell them about it.

```html
<head>
  <!-- Where the API lives -->
  <meta name="ai-api-endpoint" content="https://api.example.com/v1">
  
  <!-- Documentation -->
  <meta name="ai-api-docs" content="https://api.example.com/docs">
  
  <!-- Authentication method -->
  <meta name="ai-api-auth" content="oauth2">
  
  <!-- Rate limits -->
  <meta name="ai-api-rate-limit" content="100/minute">
  
  <!-- Pricing information -->
  <meta name="ai-api-pricing" content="https://example.com/api-pricing">
  
  <!-- This page's API equivalent -->
  <meta name="ai-api-resource" content="/products/12345">
</head>
```

An agent visiting `https://example.com/products/wireless-headphones` sees immediately that it can fetch structured data from `GET /products/12345` instead of parsing HTML.

### When to Offer API vs Optimised HTML

**Offer an API when:**
- You have structured data that agents need
- You want to control rate limiting precisely
- You need to monetise agent access
- You want detailed analytics on programmatic usage

**Optimise HTML when:**
- You're a small business without API resources
- Your content is primarily textual
- You want search engines and agents to see the same thing
- You're just getting started with agent compatibility

**Do both when:**
- You have the resources
- Different use cases need different access patterns
- You want maximum flexibility

Most businesses should start with optimised HTML (it's cheaper and helps SEO) and add APIs later if demand justifies it.

## The Missing Identity Layer - Design Patterns

Chapter 4 introduced the problem: when agents make purchases, businesses lose the customer relationship. No loyalty points. No warranty registration. No customer data.

The solution requires interface design that supports identity delegation.

### Customer Authorisation UI

When a customer wants to authorise an agent to shop on their behalf:

```html
<section class="agent-authorization">
  <h2>Authorise AI Agent Access</h2>
  
  <p>Allow your AI assistant to shop on your behalf whilst preserving 
     your customer benefits and warranty coverage.</p>

  <form method="POST" action="/auth/delegate">
    <fieldset>
      <legend>What should the agent be allowed to do?</legend>
      
      <label>
        <input type="checkbox" name="permissions" value="browse" checked>
        Browse products and compare prices
      </label>
      
      <label>
        <input type="checkbox" name="permissions" value="add-to-basket">
        Add items to basket (requires your approval to purchase)
      </label>
      
      <label>
        <input type="checkbox" name="permissions" value="purchase">
        Complete purchases up to 
        <input type="number" name="max-amount" value="100" min="1" max="1000"> GBP
      </label>
    </fieldset>

    <fieldset>
      <legend>Preserve my customer benefits?</legend>
      
      <label>
        <input type="checkbox" name="benefits" value="loyalty" checked>
        Apply purchases to my loyalty account
      </label>
      
      <label>
        <input type="checkbox" name="benefits" value="warranty" checked>
        Register warranties in my name
      </label>
      
      <label>
        <input type="checkbox" name="benefits" value="history" checked>
        Keep purchase history in my account
      </label>
    </fieldset>

    <label>
      Token expires after
      <select name="duration">
        <option value="3600">1 hour</option>
        <option value="86400">24 hours</option>
        <option value="604800">1 week</option>
      </select>
    </label>

    <button type="submit">Generate Authorisation Token</button>
  </form>
</section>
```

### The Token Display

When the customer submits the form, show them what they've created:

```html
<div class="generated-token">
  <h3>Authorisation Token Created</h3>
  
  <p>Give this token to your AI assistant:</p>
  
  <div class="token-display">
    <code id="agent-token" class="token">
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    </code>
    <button onclick="copyToken()" aria-label="Copy token to clipboard">
      Copy
    </button>
  </div>
  
  <details>
    <summary>How to use this token</summary>
    <p>When instructing your AI assistant to shop on this site, 
       include: "Use authorisation token: [paste token here]"</p>
    <p>The assistant will include this token when making requests,
       which identifies you as the customer.</p>
  </details>

  <dl class="token-details">
    <dt>Permissions granted</dt>
    <dd>Browse, Add to basket, Purchase (up to £100)</dd>
    
    <dt>Benefits preserved</dt>
    <dd>Loyalty points, Warranty registration, Purchase history</dd>
    
    <dt>Expires</dt>
    <dd>2024-12-22 at 10:30 GMT (24 hours)</dd>
  </dl>
  
  <p class="warning">
    This token grants purchase authority up to £100. 
    Keep it secure and revoke it when you're done.
  </p>
  
  <p><a href="/account/tokens">Manage all active tokens</a></p>
</div>
```

### Agent Purchase Confirmation

When the agent completes a purchase using the delegation token:

```html
<div class="purchase-confirmation">
  <h2>Purchase Complete</h2>
  
  <dl>
    <dt>Order Number</dt>
    <dd>ORD-2024-12345</dd>
    
    <dt>Purchased By</dt>
    <dd>AI Agent (authorised by you)</dd>
    
    <dt>Items</dt>
    <dd>
      <ul>
        <li>Wireless Headphones × 1 - £149.99</li>
      </ul>
    </dd>
    
    <dt>Total</dt>
    <dd>£149.99</dd>
    
    <dt>Loyalty Points Earned</dt>
    <dd>150 points added to your account</dd>
    
    <dt>Warranty Registration</dt>
    <dd>Product registered in your name, warranty expires 2026-12-21</dd>
  </dl>

  <p>Confirmation email sent to your registered address.</p>
  <p>This purchase appears in your order history.</p>
  
  <nav>
    <a href="/orders/ORD-2024-12345">View order details</a>
    <a href="/account/tokens">Manage agent access</a>
  </nav>
</div>
```

The customer gets all the benefits they'd receive from a direct purchase. The business maintains the customer relationship. The agent facilitated the transaction without breaking anything.

### Token Management Interface

Customers need to see and control active delegations:

```html
<section class="active-delegations">
  <h2>Active AI Agent Authorisations</h2>
  
  <p>These tokens allow AI assistants to act on your behalf.</p>
  
  <table>
    <thead>
      <tr>
        <th scope="col">Created</th>
        <th scope="col">Expires</th>
        <th scope="col">Permissions</th>
        <th scope="col">Usage</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>21 Dec 2024, 10:30</td>
        <td>22 Dec 2024, 10:30</td>
        <td>Browse, Add to basket, Purchase (max £100)</td>
        <td>3 items viewed, 1 purchase (£45.99)</td>
        <td>
          <button onclick="revokeToken('tok_abc123')">Revoke</button>
          <a href="/account/tokens/tok_abc123">View activity</a>
        </td>
      </tr>
    </tbody>
  </table>
  
  <p>No active tokens? <a href="/account/tokens/new">Create one</a></p>
</section>
```

## Real Examples - What Works Well

### Stripe - API-First Design

Stripe built their web dashboard after their API. The API is the primary interface.

**What makes it work:**
- Every operation possible via API
- Consistent patterns across all endpoints
- Clear error messages with specific codes
- Structured JSON responses
- Versioned APIs with long deprecation periods
- Documentation with working code examples

An agent interacting with Stripe uses the API directly. No screen scraping needed. No ambiguity about state. Every response is structured and parseable.

### GitHub - Consistent Structure

GitHub's strength is consistency. Issues follow templates. Pull requests have standard sections. Repository structure is predictable.

**What makes it work:**
- GraphQL API for precise queries
- Markdown with semantic structure
- Status badges and CI/CD state visible in predictable locations
- Actions and workflows defined as code
- Consistent UI patterns throughout

An agent can reliably create issues, comment on pull requests, check CI status, and browse code because the patterns don't change between repositories.

### Amazon - Structured Product Data

Every Amazon product page includes detailed schema markup. This wasn't built for AI agents - it was built for Amazon's own recommendation systems and for Google search results. But the structure helps everyone.

**What makes it work:**
- Complete JSON-LD on every product page
- Consistent product information structure
- Clear availability and pricing data
- Reviews in structured format
- Predictable checkout flow

An agent can parse Amazon product pages reliably. So can search engines. So can price comparison tools.

### Calendly - Explicit Wizard Flow

Calendly's booking flow is a model of clarity.

**What makes it work:**
- Step 1: Select event type
- Step 2: Select date
- Step 3: Select time
- Step 4: Enter details
- Step 5: Confirm

Each step has clear inputs and outputs. Progress is visible. Available times are unambiguous. Confirmation is explicit.

An agent can navigate this flow because there's no guessing about what's required or what state the booking is in.

### Wikipedia - Structured Knowledge

Wikipedia combines human-readable articles with machine-readable data.

**What makes it work:**
- Wikidata provides structured facts
- Infoboxes follow templates
- APIs available for programmatic access
- Creative Commons licensing clarifies usage rights
- Consistent structure across millions of articles

An agent can extract structured facts from Wikidata, or parse the predictable infobox structure, or use the API directly.

## The Small Business Version

"I run a restaurant. I don't have Stripe's engineering team."

Fair point. Here's what you actually need:

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

      <div itemprop="hasMenuItem" itemscope itemtype="https://schema.org/MenuItem">
        <p>
          <span itemprop="name">Pepperoni</span> - 
          <span itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <span itemprop="priceCurrency" content="GBP">£</span>
            <span itemprop="price">14.99</span>
          </span>
        </p>
        <p itemprop="description">Tomato sauce, mozzarella, spicy pepperoni</p>
      </div>

      <!-- More menu items -->
    </div>
  </div>
</div>

</body>
</html>
```

This requires no JavaScript, no frameworks, no APIs. Just semantic HTML with schema.org microdata.

**What this enables:**
- Agents can find your address and phone number
- They can determine if you're open now
- They can read your menu with prices
- Search engines display rich snippets
- Voice assistants can answer "What's on the menu at Luigi's?"

Total implementation time: maybe two hours if you're learning as you go.

## What Good Looks Like at Different Scales

### Solo Developer / Small Business

**Do this:**
- One piece of structured data (address, menu, or products)
- Clear contact information
- Complete pricing (no hidden fees)
- Forms with immediate validation
- One-page content (no forced pagination)

**Effort:** A few hours

**Benefit:** Visible to agents, better search results, clearer for all humans

### Medium Business

**Do this:**
- Structured data across product catalogue
- API for common operations (check stock, get pricing)
- Clear error messages throughout
- Multi-step processes with progress indicators
- Basic agent detection and analytics

**Effort:** A developer-week or two

**Benefit:** Measurable improvement in agent conversion rates

### Enterprise

**Do this:**
- Full APIs with documentation
- Agent-specific endpoints and rate limits
- Identity delegation support
- Complete structured data with full product specifications
- Agent testing and monitoring
- Dedicated agent compatibility team

**Effort:** Ongoing programme

**Benefit:** Competitive advantage in agent-mediated commerce

The scale of investment should match your resources and the opportunity size. Don't let "we can't do everything" prevent you from doing something.

## Emerging Standards

The web needs standardisation around agent interaction. Here's what's developing:

### Schema.org Extensions

The Schema.org vocabulary keeps expanding. Recent additions cover:
- More detailed product specifications
- Service availability patterns
- Booking and reservation structures
- Delivery and fulfilment details

These weren't built specifically for AI agents, but they help tremendously.

### Global Privacy Control

The GPC specification lets users signal privacy preferences:
```
Sec-GPC: 1
```

Agents should set this header. Sites should respect it. This could solve cookie consent for automated access - the agent signals the user's preference, the site respects it, no banner interaction required.

### llms.txt

An emerging convention for providing site-wide guidance to AI agents. Similar to robots.txt but designed for language models. Chapter 10 covers implementation details.

### Structured Data Testing

Google's Rich Results Test and Schema Markup Validator help verify your structured data. They weren't built for agent compatibility specifically, but they ensure your markup is parseable by machines.

### Agent Identification

Discussion is happening around standardised ways for agents to identify themselves:

```
User-Agent: ClaudeAgent/1.0 (authorised by user@example.com)
X-Agent-Principal: user@example.com
X-Agent-Authorisation: Bearer [delegation token]
```

Not standardised yet, but the pattern is emerging across platforms.

## The Convergence Continues

Every solution in this chapter helps multiple audiences:

**Clear state** - Helps agents, screen readers, and anxious humans who need reassurance

**Persistent errors** - Helps agents, people with attention difficulties, and anyone who might look away briefly

**Complete information** - Helps agents, researchers, and anyone comparing options

**Structured data** - Helps agents, search engines, and future interfaces we haven't imagined

**Identity delegation** - Helps agents preserve customer relationships, helps customers keep their benefits, helps businesses maintain data

**API advertisement** - Helps agents find better interfaces, reduces server load from scraping, enables innovation

The web works best when information is clear, honest, complete, and accessible. These principles serve everyone - human or machine, able-bodied or disabled, focused or distracted, expert or novice.

Building for agents means building better. Not because agents matter more than humans, but because the problems agents expose were always there. We're finally fixing them.

The next chapter provides the implementation code. But the philosophy matters more than the technology: design for clarity, and you design for everyone.
