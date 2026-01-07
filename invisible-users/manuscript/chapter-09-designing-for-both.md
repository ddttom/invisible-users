\newpage

# Chapter 9 - Designing for Both

Solutions that work for agents without degrading human experience.

## Introduction

The patterns that break AI agents are the same patterns that have frustrated humans for years. This isn't a coincidence. It's the key to solving both problems at once.

In Chapter 1, I mentioned that what agents need is mostly what everyone needs. Now let me show you precisely what that means - and why it creates a single design target rather than competing requirements.

**A note on universal patterns:** The solutions in this chapter work across the entire agent ecosystem - server-based agents, CLI agents, browser agents, browser extensions, IDE-integrated tools, and local agents. This is deliberate. We're not designing for a specific agent architecture; we're designing for a principle: explicit state, semantic structure, and persistent feedback. A pattern that requires JavaScript execution to work excludes half the ecosystem. A pattern that relies on session inheritance only helps browser extensions. Universal patterns benefit everyone - agents and humans alike - regardless of their technical constraints.

![Designing for Both - the convergence principle of accessibility and agent-friendly design](illustrations/chapter-09-convergence-principle.png)

## The Convergence Principle

Screen readers need semantic HTML to understand page structure. So do agents.

Keyboard users need clear focus states and explicit navigation. Agents need explicit state and clear action paths.

People with cognitive disabilities benefit from plain language and predictable layouts. Agents parse better when the content is clear and consistent.

Users with motor impairments need forgiving inputs and clear error recovery. Agents need validation that explains what's wrong and how to fix it.

**These aren't four different problems. They're the same problem expressed differently.**

Consider a typical error pattern. Your form submission fails. The error appears in a toast notification that slides in from the corner, displays for three seconds, then vanishes.

**For agents:** The error is invisible by the time they check. They report success when the task failed.

**For screen reader users:** The error might be announced, but if they're navigating elsewhere when it appears, they miss it entirely.

**For people with ADHD:** Three seconds isn't enough time to read, understand, and act on the message whilst managing other cognitive demands.

**For stressed users:** A parent managing children whilst trying to complete a transaction might look away at precisely the wrong moment.

The toast notification fails everyone. It just affects different groups in different ways.

Now consider the alternative. The error appears at the top of the form, stays visible until resolved, and clearly states what's wrong and how to fix it.

**For agents:** The error occurs in the DOM during page parsing. They can read it and respond appropriately.

**For screen reader users:** The error is announced and remains available to review whilst correcting the problem.

**For people with ADHD:** the error remains visible as a reference whilst they locate and fix the issue.

**For stressed users:** The error is still there when they return their attention to the screen.

This single change helps everyone. Not ideally - different users have different needs - but substantially.

### The Business Case

This convergence has commercial implications. In the UK, roughly 16 million people have some form of disability. Globally, the World Health Organisation estimates 1.3 billion people - 16% of the population - experience significant disability.

When you design for agents, you're simultaneously designing for this population. The return on investment doubles because each improvement serves multiple audiences.

Accessibility lawsuits are increasing. The Americans with Disabilities Act, the UK Equality Act, and the European Accessibility Act all create legal obligations. An agent-friendly design that improves accessibility helps you meet these requirements.

More pragmatically: the patterns that work for agents also work for everyone using your site under non-ideal conditions. Slow connections. Old devices. Bright sunlight makes screens hard to read. Noisy environments. Distracted attention. These "situational disabilities" affect most users at some point.

**Solving for agents means solving for the edges. And the edges are where you lose customers.**

## Clear State, Always Visible

Traditional web design treats state as something users should infer from visual cues. A spinner means loading. A button turning grey means it is disabled. Content appearing implies success.

This works when you're watching continuously. It fails when you look away, when visual cues are subtle, or when you're not human.

**The solution: Make state explicit and persistent.**

### Loading States

**Before - Ambiguous:**

```html
<div class="spinner"></div>
```

The spinner appears. Then it disappears. Was that success or failure? How long should you wait? Is it still loading, or did it finish?

**After - Explicit:**

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

Remember the tour company that split its 14-day itinerary across 14 pages? They lost business because my agent couldn't navigate the pagination. But they also lost business from humans who wanted to compare the whole journey at a glance.

The solution isn't complicated. Provide complete information on a single page with clear organisation.

### The Tour Itinerary Pattern

**Before - Forced pagination:**

```text
Day 1: Bangkok (see full details)
[Next →]
```

Fourteen pages. Fourteen clicks. Context is lost between each page.

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

**What about engagement metrics?** You get one page view instead of 14. However, you receive actual bookings rather than abandoned browsing. Measure what matters.

## Semantic Structure with JSON-LD

HTML specifies how browsers display content. JSON-LD tells machines what content means.

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

An agent can guess this is a product with a price. Is £149.99 the final price, excluding VAT? Is "In stock" binary, or are there three left? What happens when you click the button?

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
- The price is £149.99 GBP, valid until the end of 2025
- 23 units are in stock
- Shipping is free, takes 2-5 days total
- Customers rate it 4.3/5 based on 127 reviews

This same structured data helps Google display rich snippets. It allows price comparison sites. It helps develop future tools we have not yet imagined.

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

### The Structured Data Dilemma

Here's the irony that Chapter 5 documented: the same Schema.org markup that improves search rankings makes content trivially extractable by agents. Recipe sites added structured data to rank higher on Google. News sites marked up articles to earn rich snippets. Tutorial creators added how-to schemas to increase visibility. They optimised for search engines. Now they're facing agent extraction without ad revenue.

An agent doesn't need to render your page, scroll through your "life story before the recipe", or view your advertisements. It reads the Recipe schema, extracts the ingredients and instructions, and moves on. The entire economic structure that made ad-funded content viable - scroll depth, time on page, multiple ad impressions - becomes irrelevant when agents bypass the page entirely and consume only the structured data.

**Content type determines risk.** For transactional sites - e-commerce, booking platforms, service providers - Schema.org is beneficial. Agents need structured product data, pricing information, and availability to complete purchases. Your revenue comes from transactions, not pageviews. An agent that correctly understands your product and completes a purchase is the desired outcome. The structured data serves your business model.

For creative and informational content - recipes, news articles, tutorials, product reviews - the risk is higher. Revenue depends on pageviews and ad impressions. Agent extraction bypasses your monetisation model entirely. The content creator invested time and resources producing something valuable. The agent platform extracts that value, serves it to users, and the creator receives nothing. No traffic. No ad revenue. No attribution in many cases.

**Strategic decision framework.** Use Schema.org when your business model depends on transactions rather than pageviews, when you want agents to recommend and complete purchases on your site, and when you have alternative revenue streams beyond advertising. Consider the trade-offs more carefully when revenue depends entirely on ad impressions, when content is easily extractable and summarisable, and when there's no clear path to alternative monetisation.

**Mitigation strategies exist, though none is perfect.** Mark up products and services but not full content text. Paywall critical information whilst leaving summaries accessible for discovery. Provide API access with licensing terms for high-volume agent platforms. Explore agent-friendly monetisation models: per-extraction fees, partnership arrangements with agent platforms, or subscription models that charge users directly rather than advertisers.

This tension will drive the evolution of web monetisation. Schema.org enables the agent ecosystem but requires new business models to sustain content creation. Early adopters who solve this - who find ways to serve both human browsers and AI agents whilst maintaining viable revenue - will have a competitive advantage. It's not a binary choice between "optimise for agents" or "protect content". It's a strategic decision based on your business model, content type, and willingness to experiment with new approaches.

The web has survived similar transitions before. When Google began showing answers directly in search results, content creators adapted. Some put more content behind paywalls. Others focused on building direct relationships with readers. Still others found value in the visibility even without the click. Agent extraction is a more fundamental shift, but the principle remains: understand your business model, recognise how agents interact with your content, and make informed decisions about what to expose and what to protect.

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

## Identity Delegation Patterns

Chapter 4 described how agents sever customer relationships. When designing agent-friendly interfaces, you'll need to consider identity delegation.

### The pattern

Agents should be able to present authorisation tokens that identify the actual customer. This allows:

- Loyalty points to accrue to the right person
- Warranty registration against the purchaser
- Order history in the customer's account
- Personalisation based on customer preferences

### Detection and handling

```javascript
// Detect if request includes delegation token
if (request.headers['x-delegation-token']) {
  // Verify token and extract customer identity
  const customerIdentity = await verifyDelegationToken(
    request.headers['x-delegation-token']
  );

  // Process order with customer identity preserved
  await processOrder({
    items: cart.items,
    customer: customerIdentity,
    agent: request.headers['user-agent']
  });
}
```

### UI considerations

If you present an authorisation flow for delegation:

- Make it clear what the agent will access
- Show explicit permission grants
- Provide revocation mechanisms
- Display active delegations for customer review

Standards for delegation tokens are still emerging. OAuth-style patterns are likely, but watch for industry standardisation efforts.

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

An agent interacting with Stripe uses the API directly. No screen scraping needed. No ambiguity about the state. Every response is structured and parseable.

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
- Reviews in a structured format
- Predictable checkout flow

An agent can reliably parse Amazon product pages. So can search engines. So can price comparison tools.

### Calendly - Explicit Wizard Flow

Calendly's booking flow is a model of clarity.

**What makes it work:**

- Step 1: Select event type
- Step 2: Select date
- Step 3: Select time
- Step 4: Enter details
- Step 5: Confirm

Each step has clear inputs and outputs. Progress is visible. Available times are unambiguous. Confirmation is explicit.

An agent can navigate this flow because there's no guesswork about what's required or the booking's current state.

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

This requires no JavaScript, no frameworks, no APIs—just semantic HTML with schema.org microdata.

**What this enables:**

- Agents can find your address and phone number
- They can determine if you're open now
- They can read your menu with prices
- Search engines display rich snippets
- Voice assistants can answer "What's on the menu at Luigi's?"

Total implementation effort: straightforward, especially if you're learning as you go.

> **Hands-On: The Agent-Friendly Starter Kit**
>
> To see these principles in action, check the `agent-friendly-starter-kit/` directory included with this book. We've built two versions of the same site so you can compare them side-by-side:
>
> - **`bad/`**: The "Before" state. A typical modern small business site that relies on JavaScript, hides content, and breaks agents.
> - **`good/`**: The "After" state. The same site was refactored using the semantic HTML and Schema.org patterns described above.
>
> Try running both to see the difference in how agents interpret them.

## What Good Looks Like at Different Scales

### Solo Developer / Small Business

**Do this:**

- One piece of structured data (address, menu, or products)
- Clear contact information
- Complete pricing (no hidden fees)
- Forms with immediate validation
- One-page content (no forced pagination)

**Effort:** Minimal

**Benefit:** Visible to agents, better search results, clearer for all humans

### Medium Business

**Do this:**

- Structured data across the product catalogue
- API for common operations (check stock, get pricing)
- Clear error messages throughout
- Multi-step processes with progress indicators
- Basic agent detection and analytics

**Effort:** Moderate development work

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

The web needs standardisation around agent interaction. Here's what's developing.

### Standards Maturity Framework

Throughout this chapter and Chapter 10, you'll encounter various approaches to AI agent guidance. They exist at different levels of maturity:

**Established Standards** (use with confidence):

- robots.txt with AI-specific user-agents
- Schema.org JSON-LD structured data
- HTTP Link headers (RFC 8288)
- Standard HTML semantic elements

**Emerging Conventions** (early adoption phase):

- llms.txt (community-driven, not formal standard)
- OASF - Open Agentic Schema Framework
- AI-specific robots.txt directives
- HTTP headers with rel="llms-txt"

**Proposed Patterns** (experimental, forward-compatible):

- ai-* meta tag namespace
- data-agent-visible attribute pattern
- Three-layer guidance system (llms.txt + meta + JSON-LD)

**Speculative** (may emerge, may not):

- Standardised agent identification headers
- Federated agent directories
- Agent Payment Protocol (AP2)

The book uses all categories to paint a complete picture of where we are and where we're heading. When implementing, start with established standards and emerging conventions, then add proposed patterns where they solve real problems.

All patterns shown are designed to be forward-compatible - they won't break anything if agents don't recognise them. Think of them as progressive enhancement for AI.

### Schema.org Extensions

The Schema.org vocabulary keeps expanding. Recent additions cover:

- More detailed product specifications
- Service availability patterns
- Booking and reservation structures
- Delivery and fulfilment details

These weren't built specifically for AI agents, but they help tremendously.

### Global Privacy Control

The GPC specification lets users signal privacy preferences:

```text
Sec-GPC: 1
```

Agents should set this header. Sites should respect it. This could solve cookie consent for automated access: the agent signals the user's preference, the site respects it, and no banner interaction is required.

### llms.txt

An emerging convention for providing site-wide guidance to AI agents. Similar to robots.txt but designed for language models.

**Real-world example:** Digital Domain Technologies maintains a comprehensive llms.txt file (<https://allabout.network/llms.txt>) that demonstrates practical implementation. Their file organises 91 posts across 6 major categories (Developer Documentation, EDS & Integrations, Core AI/LLM Topics, AEM/CMS Focus, General Blog & Tools, Content Author Resources) with structured access guidelines, rate limits (100 requests per hour per IP), attribution requirements, and precise categorisation. This demonstrates how to structure technical documentation for AI agent consumption whilst maintaining human-readable form.

Chapter 10 covers implementation details and provides templates you can adapt.

### The Three-Layer Approach

The most effective agent compatibility combines three complementary systems:

**Layer 1 - llms.txt (site-wide defaults)** - Emerging Convention:

```text
# Example Shop - Electronics retailer
preferred-access: api
api-endpoint: https://api.example.com/v1
rate-limit: 100/minute
```

**Layer 2 - Meta tags (page-specific)** - Proposed Pattern:

Page-specific meta tags can override site-wide defaults from llms.txt. Whilst no formal standard yet exists for AI-specific meta tags, the pattern of using `<meta name="ai-*">` follows the same convention as existing standards such as the robots meta tags.

```html
<meta name="ai-api-endpoint" content="/api/v1/products/WH-1000">
<meta name="ai-freshness" content="hourly">
```

**Status:** Proposed pattern, not yet standardised. Use where it makes semantic sense, but prioritise llms.txt and Schema.org JSON-LD for broader compatibility.

**Layer 3 - JSON-LD (actual content)** - Established Standard:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Wireless Headphones",
  "offers": { "price": "149.99", "priceCurrency": "GBP" }
}
</script>
```

An agent visiting your page: (1) Checks llms.txt for site policy, (2) Reads meta tags for this specific page, (3) Fetches structured data, (4) Respects your rate limits and guidance.

**Implementation status:** Layer 1 (llms.txt) and Layer 3 (JSON-LD) are currently deployed in production environments. Layer 2 (meta tags) is a logical extension that may become standardised as the ecosystem matures.

### robots.txt, sitemap.xml, and llms.txt

These three files work together:

| File | Purpose | Audience |
| ---- | ------- | -------- |
| robots.txt | Access control | Search bots |
| sitemap.xml | Content discovery | Search engines |
| llms.txt | Interaction guidance | AI agents |

**robots.txt** specifies what crawlers may access. **sitemap.xml** helps them find your pages. **llms.txt** specifies how AI agents should interact appropriately. All three files complement one another: robots.txt enforces boundaries, sitemap.xml provides structure, and llms.txt offers context.

Reference your llms.txt in robots.txt:

```text
# robots.txt
User-agent: *
Disallow: /admin/

# AI agent guidance at /llms.txt

Sitemap: https://example.com/sitemap.xml
```

### Structured Data Testing

Google's Rich Results Test and Schema Markup Validator help verify your structured data. They weren't built specifically for agent compatibility, but they ensure your markup is parseable by machines.

### Agent Identification

Discussion is happening around standardised ways for agents to identify themselves:

```text
User-Agent: ClaudeAgent/1.0 (authorised by user@example.com)
X-Agent-Principal: user@example.com
X-Agent-Authorisation: Bearer [delegation token]
```

Not standardised yet, but the pattern is emerging across platforms.

## Implementation Roadmap

Getting started with agent-friendly design doesn't require a complete rebuild. Focus on priority-based improvements:

### Priority 1: Critical Quick Wins

Highest impact with minimal effort - start here.

**Effort Level:** A single developer can implement these changes in a focused session. No architectural changes required, minimal risk, immediate deployment. Most changes involve replacing existing patterns with better alternatives rather than building new systems.

- **Replace toast notifications with persistent messages** - Change temporary notifications to remain visible until acknowledged or resolved
- **Add 'Show All' option to paginated content** - Allow users and agents to view complete datasets without forced pagination
- **Ensure URLs reflect current state** - Make page state bookmarkable and shareable through URL parameters
- **Add clear pricing to all product pages** - Display total costs upfront, not just base prices
- **Test with screen reader to find obvious issues** - Use NVDA (Windows) or VoiceOver (Mac) to experience your site as an assistive technology user would

### Priority 2: Essential Improvements

Important foundational work that builds on quick wins.

**Effort Level:** Requires coordinated work across multiple developers or sustained focus from a small team. Involves systematic changes to existing code, testing across multiple pages, and potentially updating design patterns. May require stakeholder buy-in for visible changes to user experience. Plan for iterative deployment with rollback capability.

- **Audit all form feedback mechanisms** - Ensure errors persist, are clearly labeled, and explain how to fix issues
- **Implement semantic HTML throughout** - Use proper heading hierarchy, landmark regions, and appropriate elements
- **Add agent detection and logging** - Track agent visits separately to measure impact and identify problems
- **Review checkout flow for agent compatibility** - Test critical paths with clear state indicators at each step
- **Create agent-friendly API documentation** - If offering API access, document it clearly in llms.txt

### Priority 3: Core Infrastructure

Systematic platform improvements for long-term benefits.

**Effort Level:** Multi-person project requiring planning, architectural decisions, and cross-functional collaboration. Involves changes to core application structure, integration with external systems, and potentially business model adjustments. Requires thorough testing, staged rollout, and ongoing monitoring. Budget for technical debt reduction and refactoring. Expect dependencies on legal, product, and business stakeholders.

- **Redesign SPA architecture for URL-based state** - Ensure JavaScript state changes update URLs appropriately
- **Implement identity delegation patterns** - Allow agents to act on behalf of users whilst preserving customer relationships
- **Develop agent-specific access policies** - Create clear terms of service that address automated access
- **Create comprehensive agent testing suite** - Build automated tests that simulate agent interactions
- **Review business model for agent-mediated commerce** - Assess how agent traffic affects revenue and adjust accordingly

**Implementation approach:** Start with Priority 1 items - they're designed for immediate deployment with minimal risk. Move to Priority 2 once you've measured the impact of initial changes. Priority 3 items are strategic investments that require planning but deliver long-term competitive advantage.

## The Convergence Continues

Every solution in this chapter helps multiple audiences:

**Clear state** - Helps agents, screen readers, and anxious humans who need reassurance

**Persistent errors** - Helps agents, people with attention difficulties, and anyone who might look away briefly

**Complete information** - Helps agents, researchers, and anyone comparing options

**Structured data** - Helps agents, search engines, and future interfaces we haven't imagined

**Identity delegation** - Helps agents preserve customer relationships, helps customers keep their benefits, and helps businesses maintain data

**API advertisement** - Helps agents find better interfaces, reduces server load from scraping, and enables innovation

The web works best when information is transparent, honest, complete, and accessible. These principles serve everyone - human or machine, able-bodied or disabled, focused or distracted, expert or novice.

Building for agents means building better. Not because agents matter more than humans, but because the problems agents expose were always there. We're finally fixing them.

**The complete solutions picture:** This chapter and Chapter 10 address what website builders should implement. **Chapter 11: What Agent Creators Must Build** addresses the other side - what validation layers and guardrails agent creators should implement. Neither side can fix the ecosystem alone. Perfect websites still fail if agents lack validation. Sophisticated agents still fail if websites hide information. Both sides must improve.

The next chapter provides the implementation code. But the philosophy matters more than the technology: design for clarity, and you design for everyone.
