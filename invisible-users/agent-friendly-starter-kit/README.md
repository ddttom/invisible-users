# Agent-Friendly Starter Kit

This repository demonstrates the difference between a website that is hostile to AI agents and one that is optimized for them.

## Structure

- **bad/**: The "Before" state. A typical modern website that relies heavily on JavaScript, hides content, and uses ambiguous "human-centric" patterns that break agents.
- **good/**: The "After" state. The same site refactored to use semantic HTML, Schema.org structured data, and explicit state management.
- **DIFF_GUIDE.md**: A detailed breakdown of the changes and why they matter.

## How to Use

1. **Run the Bad Site**: Open `bad/index.html` in your browser. Notice the spinner, the toast notifications, and verify how an agent might struggle (e.g., try turning off JS).
2. **Run the Good Site**: Open `good/index.html`. Notice it loads instantly, works without JS, and contains rich structured data in the source.
3. **Compare**: Use a diff tool or simply toggle between the files to see the architectural shift from "Behavior" (JS) to "Structure" (HTML).

## AI-Native Patterns Demonstrated

The `good/` example demonstrates 10 key AI-native patterns:

1. **JSON-LD structured data** - Restaurant schema in `<head>`
2. **Schema.org microdata** - Inline semantic markup throughout HTML
3. **Explicit state** - All state in data attributes (data-in-stock, data-price, data-authenticated)
4. **Complete pricing** - No "from £X" or hidden costs, includes sale pricing
5. **Semantic HTML5** - Proper use of header, main, section, article, nav, footer
6. **Progressive enhancement** - Forms work without JavaScript
7. **Machine-readable formats** - ISO 8601 datetime, E.164 phone numbers
8. **Clear authentication state** - data-authenticated attribute
9. **Delivery options with pricing** - All costs visible upfront
10. **No hidden content** - All information in initial HTML response

## Quick Comparison

| Pattern          | Bad                       | Good                              |
| ---------------- | ------------------------- | --------------------------------- |
| Menu loading     | JavaScript required       | In HTML immediately               |
| Pricing          | "From £10"                | Exact: £12.99                     |
| Phone number     | Hidden in alert           | Visible tel: link                 |
| State            | CSS classes only          | data-* attributes                 |
| Delivery cost    | Hidden until checkout     | Shown upfront: £2.99              |
| Stock status     | Unknown                   | data-in-stock="true"              |
| Forms            | JavaScript handlers       | method="POST" works without JS    |
| Structured data  | None                      | JSON-LD + microdata               |

## Learn More

For comprehensive AI-native patterns:

- **HTML Examples**: `../code-examples/html-examples/` - 21 production-ready patterns
- **Quick Reference**: `../appendix-ai-patterns-quick-reference.md` - Pattern reference for AI assistants
- **Complete Guide**: `../appendix-ai-friendly-html-guide.md` - Comprehensive implementation guidance
- **Detailed Analysis**: `DIFF_GUIDE.md` - Line-by-line explanation of changes

## Key Takeaway

By moving from imperative code (JavaScript logic) to declarative code (HTML + Schema.org), we improved the experience for:

1. **AI Agents** - Can parse menu, prices, and availability deterministically
2. **Search Engines** - Can display rich results and knowledge panels
3. **Humans** - Faster load times, no layout shifts, works on all devices
4. **Screen Readers** - Semantic HTML provides clear navigation structure
5. **Low-Bandwidth Users** - Page works immediately without waiting for JavaScript

The "good" example demonstrates that **what agents need is mostly what everyone needs** - the convergence principle in action.
