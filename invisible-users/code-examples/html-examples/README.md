# HTML Examples for AI-Native Web Design

This directory contains production-ready HTML patterns for building websites that work seamlessly for both human users and AI agents.

## Principles

All examples follow these core rules:

1. **Explicit state** in data attributes, not just CSS classes
2. **Persistent errors** that remain visible until fixed
3. **Complete information** on one page without pagination when possible
4. **Upfront pricing** with all costs shown
5. **Synchronous validation** showing all errors at once
6. **Semantic HTML** using native elements

## Directory Structure

### forms/

Form patterns with proper validation and state management:

- `validation-form.html` - Synchronous validation with error summary
- `multi-step-wizard.html` - Multi-step form with progress indication
- `disabled-button.html` - Disabled buttons with clear reasons

### state/

State management patterns for dynamic content:

- `authentication.html` - Authentication state (logged in/out)
- `loading-state.html` - Loading indicators with role="status"
- `error-display.html` - Persistent error messages with recovery options

### ecommerce/

E-commerce patterns with pricing and inventory:

- `product-page.html` - Product display with stock and pricing
- `shopping-cart.html` - Cart state with item management
- `order-confirmation.html` - Order success confirmation
- `shipping-options.html` - Delivery options with pricing

### navigation/

Navigation patterns with semantic markup:

- `breadcrumbs.html` - Schema.org breadcrumbs
- `search-results.html` - Search results with pagination
- `filters.html` - Active filters with removal links

### structured-data/

JSON-LD structured data examples:

- `product-schema.json` - Product Schema.org markup
- `local-business-schema.json` - LocalBusiness markup
- `event-schema.json` - Event markup
- `article-schema.json` - Article markup

### components/

Reusable component patterns:

- `dialog-modal.html` - Native dialog element usage
- `pricing-display.html` - Complete pricing with breakdowns
- `data-tables.html` - Tables with machine-readable attributes

## Data Attributes Reference

Use these consistently across all HTML:

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
| data-error-code | ERROR_TYPE | Error messages |

## Standards Used

- **Semantic HTML5** - nav, main, article, section, dialog elements
- **ARIA attributes** - role, aria-live, aria-invalid, aria-describedby
- **Schema.org** - JSON-LD structured data for products, events, articles
- **RFC 8288** - HTTP Link headers for AI discovery (see platform configs)

## Usage

These examples are complete HTML fragments that can be:

1. **Copied directly** into your templates
2. **Adapted** for your framework (React, Vue, etc.)
3. **Referenced** when implementing similar patterns

All examples work without JavaScript but can be progressively enhanced.

## Related Documentation

- **Prescriptive Guide**: `../appendix-ai-friendly-html-guide.md` - Comprehensive implementation guidance
- **Quick Reference**: `../appendix-ai-patterns-quick-reference.md` - Condensed patterns for AI assistants
- **Platform Configs**: `../apache/`, `../nginx/`, `../nextjs/`, `../wordpress/` - Server configuration
- **Validation**: `../validation/` - Scripts to verify AI-native implementation
- **Monitoring**: `../monitoring/` - Track AI agent traffic

## HTTP Link Headers

These HTML examples are enhanced by HTTP Link headers that point AI agents to manifest files. See platform-specific configurations for header implementation.

**RFC 8288 Format**: Angle brackets wrap URI only, parameters outside:

```http
Link: <https://yoursite.com/llms.txt>; rel="llms-txt", <https://yoursite.com/ai-agents.md>; rel="agent-manifest"
```
