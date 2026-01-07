# Diff Guide: From Blocking to Agent-Friendly

This guide explains the changes made to transform "Luigi's Pizza" from a blocker for AI agents into a machine-readable resource.

## 1. Structure & Semantics

**Before (`bad/index.html`):**

- Generic `<div>` elements used for everything.
- Content hidden in `display: none` containers.
- Reliance on JavaScript to populate the menu.

**After (`good/index.html`):**

- Semantic HTML5 structure (`header`, `main`, `section`, `article`, `footer`, `nav`).
- Schema.org microdata (`itemscope`, `itemtype`) explicitly defines the content as a `Restaurant`, `Menu`, and `Offer`.
- JSON-LD structured data in the `<head>` for comprehensive machine readability.
- Content is fully present in the initial HTML response.

## 2. Dependencies

**Before (`bad/script.js`):**

- Required JavaScript execution to see the menu.
- Simulated loading states (`spinner`) that confuse agents.
- Toast notifications for errors which are ephemeral and often missed by agents (and humans).

**After:**

- **Zero JavaScript required** for core information.
- `script.js` was deleted entirely.
- The page is fast, robust, and crawlable immediately.

## 3. Data Clarity

**Before:**

- "From £10" - Ambiguous pricing.
- "Call us!" alert - Action hidden behind interaction.
- No explicit stock status.
- Delivery costs hidden until checkout.

**After:**

- Explicit pricing (`12.99`) with currency (`GBP`) in both visible text and data attributes.
- Phone number visible in the DOM with `tel:` link.
- Opening hours defined in machine-readable `datetime` format.
- Stock status explicit with `data-in-stock` attributes.
- Complete delivery options with pricing upfront.
- Sale prices show original price and savings.

## 4. State Management

**Before:**

- State managed entirely in JavaScript.
- Authentication status invisible to agents.
- Form states hidden in CSS classes.

**After:**

- Authentication state explicit: `data-authenticated="false"`.
- Product state in data attributes: `data-product-id`, `data-price`, `data-in-stock`.
- Delivery options have `data-price` and `data-time` attributes.
- All state visible in HTML without JavaScript execution.

## 5. Progressive Enhancement

**Before:**

- Page completely broken without JavaScript.
- Forms depend on JavaScript handlers.

**After:**

- All forms use `method="POST"` and work without JavaScript.
- Progressive enhancement possible but not required.
- Semantic HTML provides baseline experience.
- ARIA labels for accessibility.

## 6. Structured Data

**Before:**

- No structured data.
- Search engines see generic HTML.
- AI agents must guess at data structure.

**After:**

**JSON-LD in `<head>`:**

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Luigi's Pizza",
  "telephone": "+441611234567",
  "openingHoursSpecification": [...],
  "address": {...}
}
```

**Microdata in HTML:**

- `itemscope itemtype="https://schema.org/Restaurant"`
- `itemscope itemtype="https://schema.org/MenuItem"`
- `itemscope itemtype="https://schema.org/Offer"`

Both formats work together - JSON-LD for comprehensive data, microdata for inline context.

## 7. Pricing Patterns

**Before:**

- "From £10" (ambiguous).
- Hidden delivery costs.

**After:**

- Exact pricing: `data-price="12.99" data-currency="GBP"`.
- Sale prices show before/after: `data-original-price="18.99" data-price="15.99"`.
- Delivery options explicit: "Free" vs "£2.99".
- Order totals in data attributes for machine readability.

## Key AI-Native Patterns Demonstrated

1. **JSON-LD structured data** - Comprehensive machine-readable metadata.
2. **Schema.org microdata** - Inline semantic markup.
3. **Explicit state** - All state in data attributes, not CSS classes.
4. **Complete pricing** - No "from £X" or hidden costs.
5. **Semantic HTML5** - Proper use of header, main, section, article, nav, footer.
6. **Progressive enhancement** - Forms work without JavaScript.
7. **Machine-readable formats** - ISO 8601 datetime, E.164 phone numbers.
8. **Clear authentication state** - `data-authenticated` attribute.
9. **Delivery options with pricing** - All costs visible upfront.
10. **No hidden content** - All information in initial HTML response.

## Key Takeaway

By moving from imperative code (JavaScript logic) to declarative code (HTML + Schema), we improved the experience for:

1. **AI Agents:** Can parse the menu, prices, and availability deterministically.
2. **Search Engines:** Can display rich results (snippets, knowledge panels).
3. **Humans:** Faster load times, no layout shifts, works on all devices.
4. **Screen Readers:** Semantic HTML provides clear navigation structure.
5. **Low-Bandwidth Users:** Page works immediately without waiting for JavaScript.

## Complete Pattern Reference

For more AI-native patterns, see:

- `../../code-examples/html-examples/` - Complete HTML pattern library
- `../../appendix-ai-patterns-quick-reference.md` - Quick reference guide
- `../../appendix-ai-friendly-html-guide.md` - Comprehensive implementation guide
