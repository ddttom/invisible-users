# The Machine Experience Manifesto

We are establishing better ways to serve all users of the web - human and machine - by recognizing that machines are users with specific constraints, and providing everything they need to understand and use our websites. Through this work we have come to value:

**Machines as users** over machines as tools  
**Existing technology** over new standards  
**Explicit context** over forced inference  
**Everything machines need** over just what appears on screen  

That is, while there is value in the items on the right, we value the items on the left more.

---

## Principles of Machine Experience

We follow these principles:

1. **Recognize machines as users.** Common Crawl, AI agents, browser extensions, integration tools - these visit your site right now. They need more than just the text on screen. They need structure, context, metadata, and state.

2. **Use existing technology.** The web already has comprehensive tools for machine consumers: semantic HTML, ARIA, meta tags, JSON-LD, schema.org, structured data, comments, meaningful URLs. Use them.

3. **Expose sovereign data.** Make page state visible in HTML, not hidden in JavaScript variables or behind authentication walls. If the state matters to understanding the page, expose it where machines can see it.

4. **Don't make machines think.** Explicit context prevents hallucination. If your stock prices update every second, say so in meta tags. If your content has structure, mark it with semantic HTML. If you have metadata, expose it in JSON-LD. Don't force machines to infer what you can state explicitly.

5. **Distinguish sovereign from ephemeral data.** Content that changes slowly enough to be valid knowledge (product specifications, published rates, article content) is sovereign. Content that changes so rapidly snapshots become meaningless (live scores, stock prices updating every second) is ephemeral. Mark the difference.

6. **Semantic markup structures information.** Use `<article>`, `<nav>`, `<section>`, `<aside>` - not `<div>` for everything. Proper heading hierarchy (`<h1>` through `<h6>`) helps machines understand document structure. This isn't just accessibility - it's information architecture.

7. **Meta tags provide context.** Beyond `<title>` and `<description>`, use Open Graph tags, Twitter cards, ai-dynamic for temporal characteristics, viewport for layout expectations. Meta tags tell machines what the page is about and how to handle it.

8. **JSON-LD makes data machine-readable.** Schema.org vocabularies let you expose structured information - products, articles, events, breadcrumbs, FAQs. Machines can extract and use this data without parsing prose.

9. **Comments document intent.** Code comments aren't just for human developers. Well-documented code helps AI systems understand your implementation, debug issues, and integrate properly. Comment your architectural decisions.

10. **URLs should be semantic.** `/products/ipad-pro-2024` tells machines more than `/p?id=12847`. Meaningful URLs provide context before the page even loads. Structure your information architecture in the URL.

11. **Accessibility serves all non-visual users.** ARIA attributes help screen readers AND machine parsers. `aria-live` marks dynamic content for both. `role` attributes clarify purpose. One implementation serves multiple user types.

12. **Structure matters more than specific values.** Common Crawl wants to understand "this is a stock tracker with real-time data and company analysis" not capture "AAPL was £187.42 at 14:23:47". Provide context and structure in HTML that scrapers see.

13. **Server-side render for structure.** SSR ensures your information architecture, navigation, content hierarchy, and semantic markup exist in the HTML that gets scraped. You're not server-rendering to capture every dynamic value - you're rendering to expose structure.

14. **Provide APIs for real-time data.** If your data updates every second, an API serves machine users better than expecting them to scrape HTML. Document your APIs. Make them discoverable. Link to them in meta tags or JSON-LD.

15. **Default to sovereign.** Unless rapid change makes snapshots meaningless, expose your data. Product pricing, interest rates, article content, company information - this is knowledge worth capturing. Only mark as ephemeral when temporal volatility makes snapshots unreliable.

16. **Design for both audiences from the start.** Don't bolt on machine considerations as an afterthought. When you structure a page, think about both visual users and machine parsers. When you write content, provide both prose and structured data. When you build features, consider both human and machine interaction.

17. **Everything visible to humans should be understandable to machines.** If a human can see it, a machine should be able to parse it. If information exists on the page, expose its meaning through semantic markup, ARIA attributes, or structured data.

18. **Validate by serving users better.** The test isn't whether tools adopt your markup - it's whether machine users can correctly understand and use your content. Better AI integration, reduced hallucination, improved automation, richer search results - these outcomes validate the approach.

---

## The Full Scope of Machine Experience

Machine Experience encompasses everything machines need:

**Semantic HTML:**
- Proper elements: `<article>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<aside>`
- Heading hierarchy: `<h1>` through `<h6>` in logical order
- Lists: `<ul>`, `<ol>`, `<dl>` for structured content
- Data tables: `<table>` with `<thead>`, `<tbody>`, proper headers

**ARIA Attributes:**
- Live regions: `aria-live`, `aria-atomic` for dynamic content
- Roles: `role="navigation"`, `role="search"`, `role="main"`
- States: `aria-expanded`, `aria-selected`, `aria-current`
- Labels: `aria-label`, `aria-labelledby`, `aria-describedby`

**Meta Tags:**
- Standard: `<title>`, `<meta name="description">`
- Open Graph: `og:title`, `og:description`, `og:image`
- Twitter: `twitter:card`, `twitter:site`
- Temporal: `<meta name="ai-dynamic">` for ephemeral content
- Technical: `<meta name="viewport">`, `<meta charset>`

**JSON-LD Structured Data:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Understanding Machine Experience",
  "author": {
    "@type": "Person",
    "name": "Tom Cranstoun"
  },
  "datePublished": "2026-01-24"
}
</script>
```

**Schema.org Vocabularies:**
- Articles, blog posts, news
- Products, offers, prices
- Events, dates, locations
- Organizations, people
- Breadcrumbs, navigation
- FAQs, how-tos

**Semantic URLs:**
- `/blog/machine-experience-manifesto` not `/post?id=847`
- `/products/ipad-pro/specs` not `/p/12847/s`
- Structure reveals information architecture

**Sovereign Data Exposure:**
- Page state in HTML attributes: `data-state="active"`
- Form values visible: `<input value="current-value">`
- Application state in markup, not just JS
- No authentication walls hiding public information

**Code Comments:**
```html
<!-- Stock price updates every second via WebSocket -->
<!-- This component handles real-time data, see api/stocks for endpoints -->
```

**API Documentation:**
- Link to APIs in `<link rel="api">`
- Provide OpenAPI/Swagger specs
- Document rate limits, authentication
- Make APIs discoverable

**Document Structure:**
- Clear heading hierarchy
- Logical reading order
- Landmark roles (`main`, `navigation`, `complementary`)
- Breadcrumb navigation

---

## What This Means in Practice

**For temporal characteristics:**
```html
<meta name="ai-dynamic" content="partial" 
      data-reason="Live scores update every second">
```

**For structured content:**
```html
<article>
  <h1>Article Title</h1>
  <script type="application/ld+json">
  {
    "@type": "Article",
    "headline": "Article Title",
    "author": "Author Name"
  }
  </script>
  <p>Content...</p>
</article>
```

**For dynamic elements:**
```html
<div aria-live="off">
  <span class="score">Arsenal 2 - 1 Chelsea</span>
</div>
```

**For semantic structure:**
```html
<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li><a href="/products">Products</a></li>
  </ul>
</nav>

<main role="main">
  <article>
    <!-- Content -->
  </article>
</main>
```

**For state exposure:**
```html
<div data-state="active" data-user-count="234">
  <!-- Application content -->
</div>
```

---

## The Fundamental Shift

**Traditional web development:**  
"We build for people using browsers. The HTML is just a container for JavaScript. Everything important happens client-side. SEO is an afterthought."

**Machine Experience:**  
"We build for all users - visual human, non-visual human, and machine. The HTML contains structure, semantics, metadata, and state. Everything a machine needs to understand our content is explicitly provided using existing web standards."

This isn't about "AI optimization" or "preparing for the future." Machines are users of your website today. Machine Experience is the discipline of serving them properly by exposing everything they need to understand and use your content.

**Not just UX. Not just accessibility. Everything machines need:**
- Semantic markup for structure
- ARIA for dynamic content behaviour
- Meta tags for page-level context
- JSON-LD for structured data
- Comments for documentation
- APIs for real-time access
- Sovereign data exposure
- Meaningful URLs

Machine Experience is comprehensive. It's the entire practice of making the web work for machine users.

---

Signed,

The Machine Experience Community

*January 2026*

