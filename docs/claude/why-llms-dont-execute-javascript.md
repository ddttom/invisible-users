# Why LLMs Don't Execute JavaScript (But Google Does)

If you've noticed that AI assistants struggle with modern single-page applications, you might assume they just haven't invested in JavaScript rendering yet. That's not quite right. The real reason reveals something more interesting about how LLMs acquire knowledge versus how search engines index the web.

The difference isn't about technology - it's about purpose. And understanding this reveals that you already have a new class of users visiting your website: machines.

## Machines Are Users Too

Your website has always had both human and machine visitors. Search engine crawlers have been users for decades. Now that population includes:
- AI training pipelines (Common Crawl)
- AI browsers (Claude in Chrome, Arc)
- AI agents accomplishing tasks
- Browser extensions extracting data
- Integration tools

These machine users have different constraints than human users:
- They can't execute JavaScript
- They can't consume updates that happen too rapidly
- They need explicit context rather than visual cues
- They visit once and cache what they see

**Machine Experience is recognizing these users exist and designing for them using technology we already have.**

## How LLMs Actually Learn About the Web

LLMs don't build their knowledge by visiting your website. They train on datasets like Common Crawl - a simple scraper that periodically grabs HTML from billions of pages. No JavaScript execution. No browser rendering. Just the raw HTML text.

When Common Crawl encounters your React or Vue application, it gets the skeleton - the bare `<div id="app"></div>` and your JavaScript bundle references. That's it. No rendered content, no populated data, no actual information about what your site does.

But here's the thing: Common Crawl isn't trying to capture your current data. It's trying to understand what your site *is*.

## The Snapshot Problem

Consider a stock tracking website. If Google visits it, Googlebot renders the JavaScript and indexes the current stock prices. That makes sense for search - someone searching for "AAPL stock price" wants today's value, and Google needs to index current state.

But what would an LLM do with that snapshot? Train on the fact that Apple's stock was £187.42 on 15 March 2024? That's worthless knowledge. By the time the model is deployed, that price is historical noise.

Even if you server-rendered your stock tracker, you'd just be feeding Common Crawl different snapshots. If your stock prices update every second, you'd be generating server-rendered pages continuously - massive effort, no benefit. Common Crawl would catch one snapshot anyway, containing one moment's worth of data that's immediately outdated.

The same applies to weather sites, countdown timers, calendar applications, live sports scores - anything where the specific values change constantly.

## What Common Crawl Actually Wants

Common Crawl wants context and structure. It wants to understand:
- This is a financial website
- It tracks technology stocks
- It has company profiles and analysis sections
- It provides market commentary

It doesn't care what Apple's stock price is right now. It cares that this site *tracks* stock prices.

When you server-render your Vue application, you're not helping Common Crawl capture your dynamic data - you're helping it understand your site's purpose and structure. The content in your HTML provides context: navigation labels, section headings, explanatory text, metadata.

A client-side rendered app gives Common Crawl almost nothing to work with. A server-rendered version gives it the information architecture, the content categories, the relationships between sections - the stuff that actually matters for understanding what the site does.

## Why Google Takes a Different Approach

Google visits sites on a schedule - more important sites get crawled more frequently. It renders JavaScript because its business is returning current results for search queries. When someone searches for something, Google needs to show what exists *now*, not what existed when Common Crawl last passed by.

That's a fundamentally different goal from building training data. Google is indexing current state for retrieval. Common Crawl is capturing structure and context for understanding.

Google creates snapshots too - public-facing versions of sites without logins or session state, the kind of thing a first-time visitor would see. But those snapshots feed a search index that gets updated regularly, not a language model trained once on historical data.

## The Machine Experience Angle

This is where Machine Experience becomes relevant. If you want AI systems to understand your site, you need to give them context and structure, not dynamic values.

Server-side rendering helps because it puts your information architecture into the HTML. Your navigation structure, content hierarchy, section purposes, metadata - all the stuff that helps a scraper understand what your site is about.

But you don't need to server-render every dynamic value. If your countdown timer shows "23 days, 4 hours, 17 minutes" - Common Crawl doesn't need that precision. It needs to understand "this site has event countdown functionality."

If your stock tracker shows live prices - Common Crawl doesn't need those specific numbers. It needs to understand "this is a financial site focused on technology sector equities."

## What Actually Matters for AI Consumption

For sites that AI systems need to understand - documentation, product information, company websites, technical references - think about what knowledge you want to convey:

**Not this:** The current price is £187.42
**But this:** We provide real-time stock market data for technology companies

**Not this:** Event starts in 23 days, 4 hours
**But this:** We help people track important dates and deadlines

**Not this:** Today's temperature is 18°C
**But this:** We provide weather forecasts and historical climate data

The static content - your explanatory text, navigation labels, product descriptions, documentation - that's what needs to be in the HTML. The dynamic values that change constantly aren't useful training data anyway.

## Learning from Accessibility: Screen Readers Face the Same Problem

This challenge isn't new. Screen readers have dealt with dynamic content for years, and the accessibility community developed solutions that apply directly to Machine Experience.

A screen reader is a non-visual consumer of content designed for visual, instantaneous perception. An AI system scraping a page is a non-interactive consumer of content designed for interactive, real-time engagement. Both face the same fundamental problem: **content that updates too rapidly to consume passively**.

**How screen readers handle dynamic content:**

Developers mark sections that update with ARIA live regions:
```html
<div aria-live="polite" aria-atomic="true">
  23 days, 4 hours, 17 minutes remaining
</div>
```

The `aria-live` attribute has three values:
- `off` - Don't announce updates (user navigates when they want the current value)
- `polite` - Announce when user is idle
- `assertive` - Interrupt immediately

**The countdown timer problem:**

If you set `aria-live="polite"` on a second-by-second countdown, the screen reader would constantly interrupt: "59 seconds... 58 seconds... 57 seconds..." Completely unusable.

The solution: mark it `aria-live="off"`. Let users navigate to the timer when they want the current value, rather than forcing continuous updates they can't keep up with.

**The parallel is exact:**

- Screen reader users *choose* when to check the timer by navigating to it
- AI systems need to *choose* when to query live data rather than trusting a snapshot

Both need signals about what updates too rapidly to consume passively.

This validates the MX approach - we're not inventing something new. We're applying proven accessibility patterns to machine consumers. The web already has mechanisms for marking dynamic content. MX extends that thinking.

## Common Crawl: Understanding How Training Data Actually Works

There's a widespread misconception about how Common Crawl operates. Understanding the reality is critical for Machine Experience.

**What people think:**
- "robots.txt blocks AI training" - **No, it doesn't**
- "Common Crawl respects robots.txt like Googlebot" - **No, it doesn't**
- "llms.txt will be automatically discovered and used" - **No, it won't**

**The reality:**

Common Crawl is not an AI agent. It's a simple scraper that grabs HTML from billions of pages. It does not read robots.txt the way search engine crawlers do. Your `Disallow: /` won't prevent your content from being scraped for LLM training datasets.

**The llms.txt problem:**

The llms.txt file is a proposed standard for declaring how LLMs should use your content. The problem: Common Crawl won't find it.

Why not?
- It's not HTML (Common Crawl primarily harvests HTML)
- It's not in your sitemap (typically)
- There's no standard discovery mechanism
- It's a `.txt` file that machines have no reason to look for

**The Machine Experience solution:**

If you want machines to actually find and use your llms.txt content, make it discoverable:

**1. Include llms.txt in your sitemap:**
```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/llms.txt</loc>
    <lastmod>2026-01-24</lastmod>
  </url>
</urlset>
```

**2. Set proper MIME type:**
Configure your server to declare llms.txt as markdown:
```
Content-Type: text/markdown
```

This signals it's content worth reading, not just a text file.

**3. Create llms.html as a shadow copy:**
```html
<!-- llms.html -->
<!DOCTYPE html>
<html>
<head>
  <title>LLM Usage Guidelines</title>
  <meta name="description" content="Guidelines for LLM usage of this site">
</head>
<body>
  <article>
    <h1>LLM Usage Guidelines</h1>
    <pre>
# Markdown Model
This site is optimized for LLM understanding...
    </pre>
  </article>
</body>
</html>
```

Include this in your sitemap. HTML will definitely be crawled.

**Why this matters:**

This is Machine Experience thinking: don't assume proposed standards will magically work. Understand how the actual infrastructure operates (Common Crawl scrapes HTML from sitemaps), and design accordingly.

If you want machines to consume your llms.txt guidelines:
- Make them discoverable (sitemap)
- Make them crawlable (HTML version)
- Signal their purpose (MIME type, semantic markup)

Don't just create llms.txt and hope. Machines are users - design for how they actually access content.

**Understanding llms.txt and robots.txt as ephemeral operational files:**

Here's an important distinction: llms.txt and robots.txt aren't static sovereign data - they're ephemeral operational instructions that change as your site evolves.

**llms.txt is ephemeral:**
- You update it every time you add a page to your sitemap
- Changes when you reorganize content
- Evolves as you refine what machines should know about your site
- Reflects current site structure, not historical state

**robots.txt is ephemeral:**
- You modify it when visitor behaviour patterns change
- Updated when you discover unwanted crawling
- Changes as you add new sections or retire old ones
- Reflects current operational needs, not permanent rules

Both are operational configuration files, not content. A snapshot of robots.txt from January 2025 doesn't tell you about the site's state in January 2026. These files document "how to interact with this site right now" - that's ephemeral by definition.

**The MX solution: YAML frontmatter for metadata:**

Machine Experience books practice what they teach. The missing piece with llms.txt is metadata - machines need context about the file itself. Add YAML frontmatter:

```yaml
---
title: "LLM Usage Guidelines"
description: "Instructions for AI systems using this site"
version: "2.1.0"
last-updated: "2026-01-24"
update-frequency: "weekly"
ephemeral: true
reason: "Updated with each sitemap change"
author: "Tom Cranstoun"
site: "https://example.com"
---

# Markdown Model

This site is optimized for LLM understanding...
```

This provides everything machines need:
- **What this file is** (title, description)
- **When it was updated** (last-updated, version)
- **How often it changes** (update-frequency)
- **Whether to trust snapshots** (ephemeral: true)
- **Why it's ephemeral** (reason)
- **Who maintains it** (author)
- **What site it describes** (site)

YAML frontmatter is already understood by static site generators, markdown processors, and increasingly by AI systems. It's machine-readable metadata using existing technology.

**MX for the win** - don't just create llms.txt and hope machines understand its purpose. Give them the metadata they need to use it correctly.

**The implication:**

If Common Crawl scraped your llms.txt in March and you updated it in April, the training data contains stale instructions. The YAML frontmatter explicitly signals this with `ephemeral: true` and `update-frequency: weekly`. Machines know they should check for updates, not cache one version forever.

This is another reason to think of machines as active users, not one-time scrapers. They need current operational instructions, not historical snapshots. And they need metadata telling them how to handle those instructions.

## The Practical Outcome

Client-side rendering isn't inherently bad for AI consumption. A React app with good semantic HTML, clear navigation, descriptive text, and proper metadata can be perfectly understood by Common Crawl - if the meaningful content is in the initial HTML.

The problem is when all your content is generated client-side. When the only HTML is `<div id="app"></div>`, there's nothing for a scraper to find.

Server-side rendering helps not because it captures your dynamic data, but because it ensures your structure and context exist in the HTML that scrapers actually see.

## The MX Perspective: Serving Machine Users

Machine Experience isn't about inventing new standards - it's about recognizing that machines are users and applying the same UX thinking we use for human users.

**Who are your users?** Humans AND machines

**What are their constraints?**
- Humans with screen readers can't consume rapid visual updates
- Machines scraping pages can't execute JavaScript or consume second-by-second changes

**What technology exists to serve them?**
- ARIA already marks content for non-visual consumption
- Meta tags already provide page-level context
- Semantic HTML already structures information

**Use it.**

Machine Experience recognizes two types of dynamic content based on whether snapshots provide meaningful information:

- **Sovereign dynamic data**: Current state that's meaningful (product specifications, documentation versions, policy updates) - snapshots are valid knowledge
- **Ephemeral dynamic data**: Values that change so rapidly snapshots are meaningless (stock prices updating every second, live scores, countdown timers)

For sovereign data, expose the state. For ephemeral data, signal that snapshots can't be trusted.

This matters for every machine user visiting your site right now:
- **Training pipelines** (Common Crawl) - understand the site's purpose but don't train on ephemeral values
- **AI browsers** (Claude in Chrome, Arc) - know which data to cache vs query fresh
- **Browser extensions** - understand what data is reliable vs fleeting
- **AI agents** - recognize when to use live APIs instead of page snapshots
- **Scraping tools** - distinguish structural information from time-sensitive data
- **Integration frameworks** - know whether cached responses are valid
- **Training pipelines** (Common Crawl) - understand the site's purpose but don't train on ephemeral values
- **AI browsers** (Claude in Chrome, Arc) - know which data to cache vs query fresh
- **Browser extensions** - understand what data is reliable vs fleeting
- **AI agents** - recognise when to use live APIs instead of page snapshots
- **Scraping tools** - distinguish structural information from time-sensitive data
- **Integration frameworks** - know whether cached responses are valid

**Using existing technology to serve machine users:**

We already have the tools. Screen readers taught us how to mark content for non-visual users. ARIA live regions tell assistive technology which content updates too rapidly to announce continuously. Machine users have the same constraint - they can't consume second-by-second updates.

Use the same technology.

**Page-level signal** - meta tag (existing technology):

```html
<!-- All content is ephemeral -->
<meta name="ai-dynamic" content="true" 
      data-reason="Stock prices update every second">

<!-- Mixed content - some ephemeral, some sovereign -->
<meta name="ai-dynamic" content="partial" 
      data-reason="Live scores update every second">

<!-- All content is sovereign (or omit tag entirely) -->
<meta name="ai-dynamic" content="false">
```

**Element-level signal** - ARIA (existing technology):

When you declare `content="partial"`, ARIA attributes machine users exactly what updates:

```html
<head>
  <meta name="ai-dynamic" content="partial" 
        data-reason="Stock prices update every second">
</head>

<body>
  <!-- Sovereign data - no ARIA needed -->
  <h1>Stock Market Dashboard</h1>
  <p>Real-time tracking of technology sector equities</p>
  
  <!-- Ephemeral data - aria-live marks it -->
  <div aria-live="off">
    <span class="ticker">AAPL</span>
    <span class="price">£187.42</span>
    <span class="change">+2.3%</span>
  </div>
</body>
```

**This serves both classes of non-visual users:**
- Screen reader users navigate to the price when they want the current value
- Machine users know these specific values are ephemeral snapshots
- Both get context about update frequency from `data-reason`
- Both use the same ARIA markup

**No new technology. No additional attributes. Just applying UX thinking to machine users.**

The `data-reason` attribute is particularly important. It's not just a boolean flag - it's explicit, human-readable context that prevents AI hallucination.

Without this signal, an AI visiting your stock page might:
- See "AAPL: £187.42" in a cached snapshot
- User asks "what's Apple's stock price?"
- AI responds "£187.42" based on three-hour-old data
- That's hallucination - presenting stale information as current

With the explicit context:
- `data-reason="Stock prices update every second"`
- The AI knows: this is a stock tracker, these values are ephemeral, don't trust the snapshot
- Correct reasoning: "I need to query live data, not use this cached page"

This is core MX: **give machines the context they need to reason correctly, rather than forcing them to guess**. The tag provides sovereign data about the *page itself* - meta-information that prevents incorrect assumptions about data validity.

Don't make AI think. Give it the context.

**For a pure stock tracker** (all content ephemeral):
```html
<meta name="ai-dynamic" content="true" 
      data-reason="Stock prices update every second">
```

**For a weather site** (forecasts are analysis, temps are ephemeral):
```html
<meta name="ai-dynamic" content="partial" 
      data-reason="Temperature and conditions update hourly, forecasts updated twice daily">
```

**For a countdown timer page** (entire purpose is the timer):
```html
<meta name="ai-dynamic" content="true" 
      data-reason="Timer values change continuously based on target date">
```

**For a news article** (static once published):
```html
<!-- No tag needed - absence means content="false" -->
```

Whether browser extensions, AI browsers, training pipelines, or agent frameworks adopt this convention depends on the broader recognition of MX principles. The discipline proposes it because it addresses a real need: helping machines distinguish between data they can trust from a snapshot versus data they need to query live or ignore entirely.

This maintains MX principles while acknowledging that not all dynamic content has the same temporal validity. The page structure, navigation, metadata, and explanatory text remain valuable for understanding. The specific numbers at any given moment require different handling.

## Looking Forward

LLMs don't execute JavaScript because they don't learn about the web by visiting sites. They learn from datasets created by simple scrapers. Those scrapers need HTML that explains what your site is, not what values it happens to show at any given moment.

Google executes JavaScript because its business model requires indexing current state for search results. That's a different use case with different economics.

Understanding this distinction changes how you think about making sites AI-accessible. It's not about rendering every dynamic value server-side. It's about ensuring your site's purpose, structure, and context exist in the HTML - the part that actually gets scraped, archived, and used for training.

**Machine Experience is recognizing you have a new class of users - machines - and using existing technology to serve them properly.**

For pages with sovereign data, make that state visible. For pages with ephemeral values, use meta tags and ARIA to signal what updates too rapidly to trust from snapshots.

The technology already exists. ARIA already marks content for non-visual consumption. Meta tags already provide page-level context. You're not inventing new standards - you're recognizing that machines are users and applying the same UX thinking you use for humans.

That's Machine Experience: understanding what your machine users need, and using the tools you already have to serve them.
