# Appendix F: Implementation Roadmap

A practical guide to making your website work well for both AI agents and human users.

**Based on:** *The Invisible Users: Designing the Web for AI Agents and Everyone Else*

---

## Priority 1: Critical Quick Wins

These changes provide immediate benefit with minimal effort.

**Effort Level:** A single developer can implement these changes in a focused session. No architectural changes required, minimal risk, immediate deployment. Most changes involve replacing existing patterns with better alternatives rather than building new systems.

### Error Messages

- [ ] **Remove toast notifications** - Replace with persistent error messages that stay visible until resolved
- [ ] **Add error summary at top of forms** - List all validation errors in one place with links to problematic fields
- [ ] **Make errors specific** - "Email format invalid: expected <name@domain.com>" instead of "Invalid input"
- [ ] **Show errors immediately** - Don't wait for form submission to reveal validation problems

### Pricing and Information

- [ ] **Display complete pricing upfront** - Show total cost including all fees, not "From £99"
- [ ] **Break down pricing clearly** - If fees exist, show them: "Product: £99 + Delivery: £15 + Service: £5 = Total: £119"
- [ ] **State what's included** - "Price includes VAT" or "VAT will be added at checkout"
- [ ] **Avoid progressive disclosure of costs** - All fees visible before checkout begins

### Basic Structured Data

- [ ] **Add one piece of JSON-LD** - Start with your most important page type (product, business, event)
- [ ] **Use Schema.org vocabulary** - Follow standard types from schema.org
- [ ] **Include essential fields** - Name, price, availability for products; address, hours for businesses

**Example:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Your Product Name",
  "offers": {
    "@type": "Offer",
    "price": "99.99",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

---

## Priority 2: Essential Improvements

**Effort Level:** Requires coordinated work across multiple developers or sustained focus from a small team. Involves systematic changes to existing code, testing across multiple pages, and potentially updating design patterns. May require stakeholder buy-in for visible changes to user experience. Plan for iterative deployment with rollback capability.

### Form Improvements

- [ ] **Implement synchronous validation** - Check fields as users complete them, not after submission
- [ ] **Add explicit state attributes** - `data-validation-state="valid|invalid|empty"` on form fields
- [ ] **Show completion percentage** - "Form 60% complete" helps agents and humans track progress
- [ ] **Disable submit with reason** - Button says "Submit (3 errors remaining)" not just "Submit"
- [ ] **Make field requirements visible** - Show what's required before users start typing

**Example:**

```html
<form data-state="incomplete">
  <div class="form-status">
    Completion: <span id="completion">40%</span>
    Errors: <span id="errors">2</span>
  </div>

  <input
    type="email"
    data-validation-state="invalid"
    aria-invalid="true"
    aria-describedby="email-error">
  <div id="email-error" role="alert">
    Email format invalid (expected: name@domain.com)
  </div>

  <button disabled data-disabled-reason="2 validation errors">
    Submit (2 errors remaining)
  </button>
</form>
```

### Content Organization

- [ ] **Reduce forced pagination** - Show complete information on single pages where practical
- [ ] **Add jump navigation** - For long pages, provide a table of contents with anchor links
- [ ] **Expand critical content** - Don't hide essential information behind tabs or accordions
- [ ] **Make search results complete** - Show all results or clearly indicate pagination

### Loading States

- [ ] **Add explicit state attributes** - `data-load-state="loading|complete|error"`
- [ ] **Provide expected duration** - "Loading (expected: ~3 seconds)" helps agents wait appropriately
- [ ] **Include timestamps** - `data-started="2025-01-15T10:30:00Z"` helps agents decide when to timeout
- [ ] **Show what's loading** - "Loading product information..." not just a spinner

**Example:**

```html
<div data-load-state="loading"
     data-started="2025-01-15T10:30:00Z"
     data-expected-duration="3000"
     role="status"
     aria-live="polite">
  Loading product information (estimated 3 seconds)
</div>
```

---

## Priority 3: Core Infrastructure

**Effort Level:** Multi-person project requiring planning, architectural decisions, and cross-functional collaboration. Involves changes to core application structure, integration with external systems, and potentially business model adjustments. Requires thorough testing, staged rollout, and ongoing monitoring. Budget for technical debt reduction and refactoring. Expect dependencies on legal, product, and business stakeholders.

### Agent Detection

- [ ] **Implement basic detection** - Check for patterns like rapid form completion, no mouse movement
- [ ] **Add server-side detection** - Analyse user-agent strings, request patterns, session behaviour
- [ ] **Create agent-mode CSS class** - Apply when agent detected to adjust presentation
- [ ] **Track agent sessions separately** - Segment analytics by session type

### Structured Data Expansion

- [ ] **Add JSON-LD to all key pages** - Products, services, locations, events
- [ ] **Include comprehensive fields** - Reviews, ratings, availability, specifications
- [ ] **Add breadcrumb markup** - Help agents understand site structure
- [ ] **Mark up search functionality** - Use SearchAction to advertise search capability

### Agent Metadata

- [ ] **Add meta tags for API endpoints** - `<meta name="ai-api-endpoint" content="/api/products/123">`
- [ ] **Declare rate limits** - `<meta name="ai-rate-limit" content="100/minute">`
- [ ] **State content policy** - `<meta name="ai-content-policy" content="summaries-allowed">`
- [ ] **Provide structured data format info** - `<meta name="ai-structured-data" content="json-ld">`

### HTTP Semantics

- [ ] **Use correct status codes** - 200 for success, 201 for created, 303 for redirect after POST, 400 for validation errors
- [ ] **Implement proper redirects** - POST → 303 redirect → confirmation page with new URL
- [ ] **Create distinct confirmation pages** - `/cart/added`, `/booking/confirmed` with explicit success messages
- [ ] **Include meaningful error responses** - JSON with field-level error details

**Example:**

```javascript
// Successful form submission
app.post('/cart/add', (req, res) => {
  addToCart(req.body);
  res.redirect(303, '/cart/added?product=123');
});

// Validation error
app.post('/checkout', (req, res) => {
  const errors = validate(req.body);
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
```

---

## Priority 4: Advanced Features

**Effort Level:** Ongoing programme, not a one-time project. Requires dedicated resources, sustained organizational commitment, and strategic business alignment. Involves building new systems, establishing governance frameworks, and potentially partnering with external platforms. Plan for multi-phase delivery with measurable business outcomes at each stage.

### API Development

- [ ] **Create formal API alongside web interface** - RESTful or GraphQL API for structured access
- [ ] **Document API comprehensively** - Clear documentation with examples
- [ ] **Implement authentication for API** - OAuth2 or API keys
- [ ] **Version your API** - Use `/api/v1/` and maintain backwards compatibility
- [ ] **Provide API discovery** - Advertise API availability in HTML meta tags and llms.txt

### Site-Wide Agent Guidance

- [ ] **Create llms.txt file** - Site-wide policy for AI agents (like robots.txt)
- [ ] **Declare preferred access method** - API vs HTML scraping
- [ ] **State content extraction policy** - What's allowed, what's prohibited
- [ ] **Specify rate limits** - Per minute limits for different access types
- [ ] **Provide contact for agent issues** - Email or support channel

**Example llms.txt:**

```text
# llms.txt - AI Agent Guidance

> RetailCo sells electronics. AI agents may browse products and
> complete purchases on behalf of customers with valid delegation tokens.

preferred-access: api
api-endpoint: https://api.retailco.com/v1
api-docs: https://developers.retailco.com

allow: /products/*
allow: /categories/*
allow: /reviews/*

auth-required: /cart/*
auth-required: /checkout/*
auth-required: /account/*

rate-limit: 100/minute
rate-limit: 500/minute with-api-key

extraction: product-data-allowed
extraction: pricing-allowed
attribution: appreciated

agent-contact: api-support@retailco.com
```

### Testing Infrastructure

- [ ] **Set up automated agent testing** - Playwright or Selenium tests simulating agent behaviour
- [ ] **Test with animations disabled** - `prefers-reduced-motion: reduce`
- [ ] **Verify errors persist** - Check error messages don't auto-dismiss
- [ ] **Test rapid form completion** - Submit forms instantly without delays
- [ ] **Check state visibility** - Ensure all state changes are explicit in DOM

### Analytics and Monitoring

- [ ] **Implement segmented analytics** - Track agent vs human sessions separately
- [ ] **Monitor agent success rates** - % of agent sessions that complete goals
- [ ] **Track agent task duration** - How long common tasks take for agents
- [ ] **Log agent errors** - Capture and analyse agent-specific failures
- [ ] **Create agent dashboard** - Monitor agent traffic and success metrics

### Identity and Delegation

- [ ] **Plan delegation token system** - How will agents authenticate on behalf of users?
- [ ] **Implement OAuth-style authorization** - Scoped, time-limited permissions
- [ ] **Create token management UI** - Let users view and revoke agent authorizations
- [ ] **Add audit logging** - Record what agents do on users' behalf
- [ ] **Consider identity repository integration** - For multi-retailer agent shopping

---

## Accessibility Alignment

These improvements help both agents and users with disabilities:

### Semantic HTML

- [ ] **Use proper heading hierarchy** - `<h1>` through `<h6>` in order
- [ ] **Mark up navigation** - `<nav>` for navigation sections
- [ ] **Identify main content** - `<main>` for primary content
- [ ] **Use `<article>` for independent content** - Blog posts, products, news items
- [ ] **Mark up forms properly** - `<label>` for every input, `<fieldset>` for groups

### ARIA Attributes

- [ ] **Add `role="alert"` to errors** - Screen readers announce immediately
- [ ] **Use `aria-live` for dynamic content** - Announce updates to screen readers
- [ ] **Include `aria-invalid` on error fields** - Mark which fields have errors
- [ ] **Add `aria-describedby` for error messages** - Connect errors to fields
- [ ] **Use `role="status"` for loading states** - Announce loading without interrupting

### Keyboard Navigation

- [ ] **Ensure all interactive elements are keyboard-accessible** - Tab through forms logically
- [ ] **Provide skip navigation links** - "Skip to main content"
- [ ] **Show focus indicators clearly** - Visible outline on focused elements
- [ ] **Don't trap keyboard focus** - Users can tab out of modal dialogues

---

## Performance and Operations

### Rate Limiting

- [ ] **Implement different limits by session type** - Stricter limits for agents
- [ ] **Return clear rate limit headers** - `X-RateLimit-Limit`, `X-RateLimit-Remaining`
- [ ] **Provide retry-after information** - Tell agents when to try again
- [ ] **Consider tiered access** - Higher limits for authenticated/paying agents

### CSS for Agent Mode

- [ ] **Disable animations for agents** - `animation-duration: 0ms` when agent detected
- [ ] **Respect prefers-reduced-motion** - Disable animations for this media query
- [ ] **Reveal hidden content** - Make agent-specific metadata visible
- [ ] **Expand collapsed sections** - Open accordions and tabs by default for agents

**Example:**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

body.agent-mode * {
  animation-duration: 0ms !important;
  transition-duration: 0ms !important;
}

body.agent-mode [data-agent-visible] {
  display: block !important;
}
```

### Version Management

- [ ] **Version your HTML** - `<html data-site-version="2.5">`
- [ ] **Maintain stable identifiers** - Keep field names consistent across redesigns
- [ ] **Provide changelog** - Document changes that affect agents
- [ ] **Support legacy field names** - Accept old names as aliases when you rename

---

## Advanced Implementation

### Identity Layer (for E-commerce)

If you sell products and want to preserve customer relationships when agents shop:

- [ ] **Implement delegation token acceptance** - Accept tokens from identity repositories
- [ ] **Query repository for customer identity** - Request verified customer data
- [ ] **Support two-tier sharing** - Handle both "favourite supplier" and "general" levels
- [ ] **Apply loyalty points correctly** - Credit to actual customer, not agent
- [ ] **Register warranties properly** - Record customer as owner, not agent
- [ ] **Maintain purchase history** - Associate agent purchases with customer account

### Security Considerations

- [ ] **Distinguish agent access from direct access** - Apply different security rules
- [ ] **Require explicit authorisation for sensitive actions** - Don't allow silent authentication inheritance
- [ ] **Implement scoped permissions** - Agents get limited access, not full account control
- [ ] **Provide revocation mechanism** - Users can cancel agent access instantly
- [ ] **Log agent activity** - Audit trail of what agents do

### Content Creator Protections

If you're an ad-funded content site:

- [ ] **Declare content extraction policy** - State what's allowed in llms.txt and meta tags
- [ ] **Require attribution** - Specify format: "Source: [site-name] ([url])"
- [ ] **Consider partial content** - Show summaries, require visit for full content
- [ ] **Implement opt-out mechanism** - Let agents know if you prohibit extraction
- [ ] **Monitor extraction volume** - Track how much content agents consume

---

## Testing Your Implementation

### Manual Tests

- [ ] **Disable animations in browser** - System preferences → reduce motion
- [ ] **Use keyboard only** - Navigate site without mouse
- [ ] **Check with screen reader** - VoiceOver (Mac), NVDA (Windows), JAWS
- [ ] **Look at page source** - Verify structured data is present and valid
- [ ] **Simulate rapid interaction** - Complete forms instantly without delays

### Automated Tests

- [ ] **Test form completion** - Can agent fill and submit forms successfully?
- [ ] **Test error persistence** - Do errors remain visible for 10+ seconds?
- [ ] **Test information completeness** - Is key information visible without interaction?
- [ ] **Test state changes** - Are state changes reflected in DOM attributes?
- [ ] **Test API responses** - Are structured responses parseable and complete?

### Validation Tools

- [ ] **Google Rich Results Test** - Verify structured data
- [ ] **Schema Markup Validator** - Check schema.org markup
- [ ] **WAVE Accessibility Tool** - Check accessibility
- [ ] **Lighthouse** - Test performance and best practices
- [ ] **W3C HTML Validator** - Verify valid HTML

---

## Maintenance

### Ongoing

- [ ] **Monitor agent success rates** - Are agents completing tasks successfully?
- [ ] **Review agent error logs** - What's breaking most often?
- [ ] **Test after design changes** - Verify agent compatibility isn't broken
- [ ] **Update structured data** - Keep JSON-LD current when content changes
- [ ] **Respond to agent issues** - Provide support channel for agent-related problems

### Quarterly Review

- [ ] **Analyse agent traffic trends** - Growing or declining?
- [ ] **Compare agent vs human conversion** - Are agents succeeding?
- [ ] **Review competitive positioning** - Are competitors more agent-friendly?
- [ ] **Update llms.txt** - Reflect any policy or access changes
- [ ] **Assess identity layer adoption** - Should you integrate with identity repositories?

---

## Success Metrics

Track these to measure progress:

**Agent Traffic:**

- % of total traffic from agents
- Growth rate month-over-month

**Agent Success:**

- Task completion rate for agents vs humans
- Error rate for agents vs humans
- Average task duration for agents vs humans

**Business Impact:**

- Conversion rate for agent sessions
- Revenue from agent-mediated transactions
- Customer acquisition cost for agent traffic

**Technical Health:**

- Structured data coverage (% of pages)
- API adoption rate
- Rate limit violations
- Agent-specific error volume

---

## Priority by Business Type

### E-commerce / Retail

**Priority 1:** Complete pricing, structured product data, checkout flow clarity
**Priority 2:** Identity layer integration, delegation tokens
**Priority 3:** API development, advanced analytics

### Content Publishers

**Priority 1:** Content extraction policy, attribution requirements
**Priority 2:** Partial content strategy, llms.txt
**Priority 3:** Licensing framework, platform partnerships

### SaaS / Applications

**Priority 1:** API development, OAuth delegation
**Priority 2:** Agent-specific pricing, usage tracking
**Priority 3:** Integration partnerships, agent SDKs

### Service Businesses

**Priority 1:** Structured business data (hours, location, services)
**Priority 2:** Booking/appointment clarity
**Priority 3:** Simple API for availability checks

### Small Businesses

**Priority 1:** Basic structured data, complete pricing
**Priority 2:** Form improvements, clear errors
**Priority 3:** One-page information display

---

## Getting Help

**Resources:**

- Schema.org documentation: <https://schema.org>
- Web Content Accessibility Guidelines: <https://www.w3.org/WAI/WCAG21/quickref/>
- Google Search Central: <https://developers.google.com/search>
- MDN Web Docs: <https://developer.mozilla.org>

**Community:**

- Share experiences with other implementers
- Report common agent failures to help build best practices
- Contribute to emerging standards like llms.txt

**Professional Support:**

- Hire accessibility consultants (benefits overlap with agent compatibility)
- Consider API development agencies if building formal APIs
- Engage security consultants for delegation token implementation

---

**Remember:** Every improvement helps both agents and humans. Start with quick wins, build momentum, and iterate based on insights from your analytics.

**Next steps:** Pick three items from Priority 1 and implement them. Track the impact. Build from there.
