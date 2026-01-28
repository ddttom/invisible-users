# AI-Dynamic Meta Tag: Examples and Implementation

This document expands on the `ai-dynamic` meta tag proposal with concrete examples across different domains and implementation considerations.

## Machine Users Need User Experience Design

You already have machine users visiting your website. They're not hypothetical future visitors - they're accessing your site right now:
- Common Crawl building training datasets
- AI browsers helping users accomplish tasks
- Browser extensions extracting information
- Integration tools connecting services

These users have constraints just like human users do. Good UX means understanding those constraints and designing accordingly.

**Human users with visual impairments:** Can't see rapid visual changes, need screen readers
**Machine users:** Can't execute JavaScript, can't consume second-by-second updates, need explicit context

The constraints are remarkably similar. The solutions are too.

## Using Existing Technology

MX doesn't require inventing new standards. The web already has technology for marking content that updates too rapidly for non-visual consumption:

**ARIA live regions** - Developed for screen readers, work for machine users:
```html
<div aria-live="polite">Content updates here</div>
```

**Meta tags** - Provide page-level context:
```html
<meta name="ai-dynamic" content="partial" 
      data-reason="Stock prices update every second">
```

**The ai-dynamic meta tag isn't new technology** - it's applying an existing pattern (meta tags for page-level signals) to a new class of user (machines).

Just as `<meta name="viewport">` tells mobile browsers how to handle layout, `<meta name="ai-dynamic">` tells machine users how to handle temporal data.

Machine Experience means designing for both human and machine users:
- Human users with assistive technology (screen readers, voice control)
- Machine users (AI agents, training pipelines, browser extensions)

Use the technology that already exists to serve both.

## Concrete Examples Across Domains

### E-commerce

**Product page** (pricing changes slowly - not ephemeral):
```html
<!-- No tag needed - even if price changes weekly, snapshots are valid knowledge -->
<h1>Ergonomic Office Chair</h1>
<p>Adjustable height, lumbar support, breathable mesh...</p>
<p>Price: £299</p>
```

"This chair cost £299 in January 2025" is valid information worth training on. The price might change, but slowly enough that snapshots have lasting value.

**Real-time inventory dashboard** (all ephemeral):
```html
<meta name="ai-dynamic" content="true" 
      data-reason="Inventory counts update in real-time across warehouses">
```

This is ephemeral because the specific counts change too rapidly to be meaningful knowledge.

### News and Media

**News article** (static once published):
```html
<!-- No tag needed - content is sovereign -->
<article>
  <h1>New Climate Policy Announced</h1>
  <p>The government today announced...</p>
</article>
```

**News article with dynamic widgets:**
```html
<head>
  <meta name="ai-dynamic" content="partial" 
        data-reason="Comment counts and reader indicators update continuously">
</head>

<body>
  <!-- Sovereign content -->
  <article>
    <h1>New Climate Policy Announced</h1>
    <p>The government today announced...</p>
  </article>
  
  <!-- Ephemeral widgets marked with aria-live -->
  <aside aria-live="off">
    <span class="comment-count">47 comments</span>
    <span class="readers">234 people reading</span>
  </aside>
</body>
```

**Live blog or ticker** (entirely ephemeral):
```html
<meta name="ai-dynamic" content="true" 
      data-reason="Live updates posted continuously during event coverage">
```

### User-Generated Content

**Product reviews section:**
```html
<head>
  <meta name="ai-dynamic" content="partial" 
        data-reason="Review count updates as new reviews posted">
</head>

<body>
  <!-- Sovereign: the actual reviews -->
  <div class="reviews">
    <div class="review">
      <p>"Great product, highly recommend..."</p>
      <span>Rating: 5/5</span>
    </div>
    <!-- More reviews... -->
  </div>
  
  <!-- Ephemeral: the count -->
  <div aria-live="off">
    <span class="count">47 reviews</span>
  </div>
</body>
```

Each individual review is sovereign data - stable once posted. But the collection count ("47 reviews") changes frequently. By tomorrow it might be 53. The count is ephemeral, the content isn't.

**Forum thread:**
```html
<head>
  <meta name="ai-dynamic" content="partial" 
        data-reason="New replies added continuously">
</head>

<body>
  <!-- Sovereign: existing posts -->
  <div class="thread">
    <!-- Thread content... -->
  </div>
  
  <!-- Ephemeral: reply count -->
  <div aria-live="off">
    <span>234 replies</span>
  </div>
</body>
```

The thread content itself is sovereign. The count of how many replies exist is ephemeral.

### Financial Services

**Stock tracker page:**
```html
<head>
  <meta name="ai-dynamic" content="partial" 
        data-reason="Stock prices update every second">
</head>

<body>
  <h1>Technology Stock Tracker</h1>
  <p>Real-time market data for major tech companies</p>
  
  <!-- Ephemeral part marked with aria-live -->
  <div aria-live="off">
    <span class="ticker">AAPL</span>
    <span class="price">£187.42</span>
    <span class="change">+2.3%</span>
  </div>
</body>
```

Both `<meta name="ai-dynamic" content="partial">` and `aria-live="off"` signal the same thing to different consumers: this specific data updates too rapidly to trust passively.

**Interest rate information page:**
```html
<!-- No tag needed - rates change daily but snapshots are valid knowledge -->
<h1>Current Savings Rates</h1>
<p>Easy access: 4.5% AER</p>
<p>Fixed 1 year: 5.2% AER</p>
```

Even though rates update daily, "Savings rates were 4.5% in January 2025" is useful information.

### Travel and Booking

**Flight search results** (all ephemeral):
```html
<meta name="ai-dynamic" content="true" 
      data-reason="Flight availability and pricing changes minute by minute">
```

**Hotel information page:**
```html
<head>
  <meta name="ai-dynamic" content="partial" 
        data-reason="Room availability updates in real-time">
</head>

<body>
  <!-- Sovereign content -->
  <h1>The Grand Hotel</h1>
  <p>Located in the heart of London, featuring spa, restaurant...</p>
  <ul class="amenities">
    <li>Free WiFi</li>
    <li>Swimming pool</li>
    <li>24-hour reception</li>
  </ul>
  
  <!-- Ephemeral availability marked with aria-live -->
  <div aria-live="off">
    <p>Rooms available tonight: 3</p>
  </div>
</body>
```

The hotel's facilities, location, description - sovereign. Real-time room availability - ephemeral. Note that the price itself might not be ephemeral if it's seasonal/published rates rather than dynamic pricing.

### Gaming and Entertainment

**Leaderboard** (changes continuously):
```html
<meta name="ai-dynamic" content="true" 
      data-reason="Player rankings and scores update after each match">
```

Leaderboard positions change constantly as matches complete. Snapshots are meaningless.

**Player profile page:**
```html
<!-- Probably no tag needed - stats are historical record -->
<h1>Player: TomTheAEMGuy</h1>
<p>Total wins: 234</p>
<p>Best score: 15,420</p>
<p>Achievement unlocked: Speed Demon (Jan 24, 2026)</p>
```

Player stats are a historical record. Even though the numbers increase over time, "Player had 234 wins in January 2026" is valid information. Changes slowly enough to be meaningful knowledge.

## The Three-State Model

Pages fall into three categories:

**1. Entirely sovereign** (`content="false"` or tag absent)
```html
<!-- No tag needed -->
<body>
  <h1>Company History</h1>
  <p>Founded in 1995...</p>
</body>
```

**2. Entirely ephemeral** (`content="true"`)
```html
<meta name="ai-dynamic" content="true" 
      data-reason="Stock prices update every second">
```

**3. Mixed content** (`content="partial"`)
```html
<head>
  <meta name="ai-dynamic" content="partial" 
        data-reason="Live scores update every second">
</head>

<body>
  <!-- Sovereign: match analysis and commentary -->
  <h1>Football Match Centre</h1>
  <p>Team news, formation analysis...</p>
  
  <!-- Ephemeral: marked with aria-live -->
  <div aria-live="off">
    <span>Arsenal 2 - 1 Chelsea</span>
    <span>67' - Match in progress</span>
  </div>
</body>
```

The relationship is clear:
- **Page-level meta tag** declares the category
- **Element-level aria-live** identifies which specific parts are ephemeral (only needed for `partial`)
- **No additional attributes needed** - ARIA already serves both screen readers and MX

This solves the granularity problem. You don't need to mark every dynamic element on a `content="true"` page - the meta tag says "all of this is ephemeral". You only use `aria-live` to distinguish sovereign from ephemeral on `content="partial"` pages.

## Combining ARIA and AI-Dynamic

The patterns are complementary, not duplicative:

**ARIA live regions** tell screen readers how to handle updates:
- `aria-live="off"` - Don't announce, let user navigate when they want current value
- `aria-live="polite"` - Announce during pauses
- `aria-live="assertive"` - Interrupt immediately

**MX reads the same ARIA attributes** to understand data volatility:
- `aria-live="off"` on rapidly updating content signals: values change too quickly to trust from snapshots
- Combined with `<meta name="ai-dynamic" content="partial">` at page level

No additional attributes needed:

```html
<head>
  <meta name="ai-dynamic" content="partial" 
        data-reason="Live scores update every second">
</head>

<body>
  <h1>Match Centre</h1>
  <p>Team news and formation analysis...</p>
  
  <!-- aria-live serves both screen readers and MX -->
  <div aria-live="off" aria-atomic="true">
    Event starts in: <span class="time">23d 4h 17m</span>
  </div>
</body>
```

Screen reader users navigate to it when they want the current time. AI systems know not to cache the specific value. Both get the context they need from the same markup.

This is Machine Experience: designing for all consumers, not just visual browsers. If you're already implementing ARIA correctly for accessibility, you're halfway to MX compliance.

## Relationship to APIs

Sometimes the answer isn't better HTML metadata - it's providing an API.

If your stock tracker updates every second, expecting machines to curl your HTML page is inefficient. Better:

```html
<meta name="ai-dynamic" content="true" 
      data-reason="Stock prices update every second">
<link rel="api" href="https://api.example.com/stocks/AAPL" 
      type="application/json">
```

Signal both that the HTML is ephemeral AND where to get live data. This helps AI agents make the right architectural choice - use the API, not screen-scraping.

## Historical Parallel: SEO and Accessibility Evolution

Both search engines and assistive technology faced similar challenges as the web evolved.

**Search engines:**

Early crawlers only read static HTML. As sites became dynamic, several things happened:

1. **Server-side rendering became important** - Sites that rendered client-side were invisible
2. **Sitemaps emerged** - Helping crawlers understand site structure
3. **Robots.txt evolved** - Giving crawlers instructions
4. **Google invested in rendering** - Eventually executing JavaScript to see what users see

The key difference: Google had business incentive to adapt. LLMs don't have the same pressure to execute JavaScript, so the adaptation is happening on the content side.

**Assistive technology:**

Screen readers faced the same problem when sites started using JavaScript for dynamic updates. The solution:

1. **ARIA emerged as a W3C standard** - Giving developers ways to mark interactive content
2. **Browser vendors implemented support** - Before widespread adoption by sites
3. **Legal requirements created incentive** - ADA and disability laws made accessibility mandatory
4. **Developer tools validated implementation** - Making correct usage easier

ARIA succeeded because:
- Standards body (W3C) gave it authority
- Browsers implemented before sites needed it
- Legal framework created business incentive
- Moral imperative supported adoption

**MX is proposing the standards before the crisis, rather than after.**

The accessibility story offers a roadmap: establish the standard, get tool support, demonstrate value, build adoption. The difference is MX lacks the legal mandate that drove ARIA adoption - it must demonstrate practical value instead.

## The Business Case

Why should site owners implement this? Because **machines are users, and good UX serves all users**.

**Better service for machine users**
When AI assistants can correctly understand your site's data model, they serve your human users better. An AI helping someone track stocks knows to query your API rather than citing stale prices. That protects your reputation.

**Reduced hallucination about your content**
AI systems referencing your content won't confidently present three-hour-old data as current. That protects user trust and your credibility.

**Accessibility benefits human users**
ARIA implementation helps screen reader users navigate your site. The same markup serves machine users. One implementation, two user groups.

**Future-proofing**
As AI-mediated discovery becomes more common, sites that machine users can correctly interpret have an advantage. This is early UX thinking - design for your actual users before it becomes critical.

**Better automation and integration**
Browser extensions, scraping tools, integration frameworks - anything consuming your content benefits from understanding what data is time-sensitive. This helps the tools that help your users.

**Documentation value**
Even if machines don't read it today, `data-reason="Stock prices update every second"` documents your site's behaviour for human developers maintaining it.

## Technical Specifics

**Placement in head:**
```html
<head>
  <meta charset="utf-8">
  <title>Stock Tracker</title>
  <meta name="ai-dynamic" content="true" 
        data-reason="Stock prices update every second">
  <!-- Other meta tags -->
</head>
```

**Should this be schema.org instead?**

Perhaps. Schema.org has `temporalCoverage` for indicating time periods. Maybe extend that:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "temporalCoverage": "PT1S",
  "comment": "Data updates every second"
}
</script>
```

But schema.org is designed for describing content, not metadata about data volatility. A simple meta tag might be more appropriate.

**Interaction with robots.txt:**

These serve different purposes:
- `robots.txt` - "Don't crawl this at all"
- `ai-dynamic` - "Crawl this for structure, but don't trust the values"

They're complementary, not overlapping.

**Should there be ai-static?**

Probably not needed. The absence of `ai-dynamic` implies the content is stable. Explicit is better than implicit, but adding both tags creates confusion.

## Values for ai-dynamic

Three states cover all scenarios based on whether snapshots are meaningful:

**`content="true"`** - All content is ephemeral (snapshots meaningless)
```html
<meta name="ai-dynamic" content="true" 
      data-reason="Stock prices update every second">
```
Use when the entire page displays data that changes so rapidly snapshots become noise. Stock trackers where "AAPL was £187.42 at 14:23:47" is worthless knowledge. Live scores where minute-by-minute updates make any snapshot immediately stale.

**`content="partial"`** - Mix of sovereign and ephemeral
```html
<meta name="ai-dynamic" content="partial" 
      data-reason="Live scores update every second">
```
Use when some content provides lasting value (match analysis, team news) and some changes too rapidly (live score, current minute). Mark the ephemeral parts with `aria-live="off"`.

**`content="false"` or absent** - All content is sovereign (snapshots are valid knowledge)
```html
<!-- No tag needed - absence implies false -->
```
Use when content is stable OR changes slowly enough that snapshots remain meaningful. Product pages where "iPad Pro cost £799 in January 2025" is valid information. Interest rate pages where daily rates are useful historical data. If the meta tag doesn't exist, machines should assume content is sovereign.

**The distinction:**

It's not about whether content changes - it's about whether the rate of change makes snapshots meaningless:
- Stock prices every second → meaningless
- Product prices monthly → meaningful
- Live scores by the minute → meaningless  
- Published interest rates daily → meaningful

The `data-reason` attribute should explain the update frequency, helping machines understand why snapshots can't be trusted.

## Call to Action for Developers

**You already have machine users. Serve them properly.**

1. **Recognize your user base has changed** - It's not just humans with browsers anymore. Common Crawl, AI agents, browser extensions, integration tools - these are users visiting your site right now.

2. **Audit for truly ephemeral content** - Which pages have data that updates so rapidly snapshots become meaningless? Stock tickers, live scores, countdown timers. Not product pricing or interest rates that change slowly enough to be valid knowledge.

3. **Use ARIA correctly for all non-visual users** - If you're implementing `aria-live` regions for screen readers, you're already serving machine users. The same markup works for both.

4. **Add ai-dynamic meta tags where appropriate:**
   - `content="true"` for pure real-time dashboards
   - `content="partial"` for pages mixing analysis with live data
   - No tag for pages where content changes slowly enough to remain valid knowledge

5. **Don't create redundant markup** - You don't need special machine-only attributes. Use meta tags + ARIA. That's sufficient and it serves both human and machine non-visual users.

6. **Implement server-side rendering for structure** - If your site's purpose should be clear to machine users, make sure the HTML they see contains navigation, headings, and context. Not just `<div id="app"></div>`.

7. **Provide APIs for real-time data** - If your stock tracker updates every second, an API serves machine users better than expecting them to scrape HTML repeatedly.

8. **Think in terms of users, not machines** - Good UX means understanding user constraints and designing accordingly. Screen reader users can't consume rapid visual updates. Machine users can't execute JavaScript. Same UX thinking, different constraints.

**The principle:** You have a new class of users with specific needs and constraints. Use existing technology (ARIA, meta tags, semantic HTML) to serve them properly. That's not "optimizing for AI" - that's UX.
