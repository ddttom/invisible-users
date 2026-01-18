# Chapter 2: How AI Reads (vs. How Humans Read)

## The human reading experience

When you visit a website, you experience it holistically. Your eyes scan the page, picking up visual hierarchy from size, colour, and position. You notice the large image at the top, the three columns of features, the bright red call-to-action button. You understand layout: the stuff in the sidebar is supplementary, the content in the center is primary, the navigation at the top tells you where you can go.

This happens in milliseconds, unconsciously, aided by years of web browsing patterns. You know a logo usually links home. You know hamburger menus hide navigation on mobile. You know footers contain contact information and legal links.

Now forget all of that.

## The AI reading experience

When an AI agent visits your page, here's what happens:

1. **Fetch the HTML** - Just the raw source code, as delivered by the server
2. **Parse it into a tree structure** - The DOM (Document Object Model)
3. **Extract text and relationships** - Following the tree from top to bottom
4. **Tokenize the content** - Breaking it into chunks for processing
5. **Build understanding** - Using patterns learned from billions of web pages

Notice what's missing? Everything visual. The AI doesn't see your page. It reads your code.

Let me show you the difference with a real example.

## Example: The hero section

Here's what a human sees when visiting a typical corporate homepage:

**[Large background image of modern office]**  
**We Transform Businesses Through Innovation**  
Strategic consulting for the digital age  
[Learn More Button] [Contact Us Button]

Clean. Professional. Clear hierarchy. The large heading obviously matters most, the subheading provides context, the buttons show available actions.

Here's what the AI sees in the HTML:

```html
<div class="hero">
  <div class="hero-content">
    <div class="hero-text">
      <div class="heading-main">We Transform Businesses Through Innovation</div>
      <div class="heading-sub">Strategic consulting for the digital age</div>
    </div>
    <div class="hero-actions">
      <a href="/services" class="btn-primary">Learn More</a>
      <a href="/contact" class="btn-secondary">Contact Us</a>
    </div>
  </div>
</div>
```

The AI sees: four nested div elements with class names, two text strings of equal semantic weight, and two links. It has no idea which text is more important. The class names `heading-main` and `heading-sub` mean nothing—they're styling hooks for CSS, not semantic indicators.

Now watch what happens when we make it semantic:

```html
<section aria-label="Introduction">
  <h1>We Transform Businesses Through Innovation</h1>
  <p>Strategic consulting for the digital age</p>
  <nav aria-label="Main actions">
    <a href="/services">Learn More</a>
    <a href="/contact">Contact Us</a>
  </nav>
</section>
```

Same visual result with CSS. Completely different meaning to AI:

- The `h1` signals "this is the primary heading for this page"
- The `p` indicates "this is descriptive text"
- The `nav` element says "these links are navigation options"
- The `aria-label` attributes provide additional context

The AI now understands structure, hierarchy, and purpose.

## DOM order is reading order

Here's something that catches developers out constantly: AI reads your DOM in document order, top to bottom, regardless of how CSS positions elements visually.

Consider this common layout pattern:

**Visual layout (what humans see):**

```
+----------------------------------+
| [Navigation Menu]                |
+----------------------------------+
| Main Content      | Sidebar      |
|                   | - Related    |
|                   | - Ads        |
|                   | - Popular    |
+----------------------------------+
```

**HTML order (what AI reads):**

```html
<nav>Navigation Menu</nav>
<aside>
  <div>Related Articles</div>
  <div>Advertisements</div>
  <div>Popular Posts</div>
</aside>
<main>
  <h1>Main Article Title</h1>
  <p>Your actual content...</p>
</main>
```

The developer put the sidebar before the main content in the HTML because it was easier with their grid system. Visually, with CSS, this looks fine to humans. But AI reads:

1. Navigation (fine)
2. Sidebar content including ads (noise)
3. Finally the actual article

By the time the AI reaches your main content, it's already processed dozens of unrelated links and promotional material. For an LLM with a token budget, those sidebar items might crowd out the actual article content.

The fix is simple—put main content first in the DOM:

```html
<nav>Navigation Menu</nav>
<main>
  <h1>Main Article Title</h1>
  <p>Your actual content...</p>
</main>
<aside>
  <div>Related Articles</div>
  <div>Advertisements</div>
  <div>Popular Posts</div>
</aside>
```

Use CSS to position the sidebar where you want visually. The content order now matches the priority order.

## Token budgets and working memory

When an LLM processes your page, it has a working memory limit measured in tokens. Think of tokens as roughly chunks of text—a word might be one or two tokens, depending on length and language.

Current AI models typically have context windows of:

- GPT-4: 128,000 tokens
- Claude: 200,000 tokens  
- Gemini: 2,000,000 tokens

Sounds like plenty, right? Consider this: an average web page, with all its HTML, might use 10,000-50,000 tokens. But that's just the raw page. Add in:

- Navigation (repeated on every page)
- Footer content (copyright, links, legal)
- Headers and scripts (metadata, tracking codes)
- Advertisements and related content
- Comments sections

You can easily hit 100,000 tokens for a single article page when you include all the surrounding scaffolding.

Now the AI is making choices about what to pay attention to. If your main content is buried after 30,000 tokens of navigation, sidebar links, and ads, it's fighting for attention.

## What gets lost

Let me be specific about what AI agents typically cannot perceive:

**CSS-based information:**

```html
<div class="urgent">This requires immediate attention</div>
```

A human sees red text, bold weight, maybe a warning icon via CSS. The AI sees a div with some text. The urgency is invisible.

**JavaScript-rendered content:**

```html
<div id="product-details"></div>
<script>
  loadProductDetails(12345);
</script>
```

A parser fetching raw HTML gets an empty div. The actual product details never appear unless the JavaScript executes. Many AI agents don't execute JavaScript—they're reading the source as delivered.

**Visual hierarchy through styling:**

```html
<div style="font-size: 48px">Big Important Text</div>
<div style="font-size: 12px">Less important detail</div>
```

To AI, these are just two text strings. The size difference is meaningless. Use `h1` and `p` instead, and the hierarchy becomes semantic.

**Images without text alternatives:**

```html
<img src="process-diagram.png">
```

The AI knows an image exists. It doesn't know what the image shows. If that diagram explains your entire service process, the AI has no idea. Add `alt="Five-step service process: consultation, planning, implementation, testing, and launch"` and now it does.

**Content in canvas elements:**

```html
<canvas id="chart"></canvas>
<script>
  drawComplexChart(salesData);
</script>
```

The AI sees... a canvas element. Whatever chart you've drawn might as well not exist.

## The three types of AI readers

Understanding how AI reads requires recognizing there are actually three distinct approaches in use:

**1. Raw parsers (the minimalists)**

These fetch HTML and parse it without executing JavaScript or loading CSS. They're looking at your source code directly. Search engine crawlers often work this way for initial discovery. Many LLM-based tools fetch raw HTML to save processing costs.

What they see: Pure HTML structure  
What they miss: Anything requiring JavaScript, CSS-based visual cues  
Example: Early-stage web crawlers, some API-based tools

**2. Browser-based agents (the executors)**

These run full browsers—Chrome, Firefox, or headless versions. They execute JavaScript, load CSS, run animations. They can interact: clicking buttons, filling forms, scrolling pages. Some can even wait for content to load asynchronously.

What they see: The rendered page, as a human would  
What they miss: Nothing technical, but they still interpret via DOM, not visual perception  
Example: Browser automation tools, some AI assistants with web interaction

**3. Vision models (the screenshot readers)**

These take screenshots of rendered pages and use computer vision to extract information. They can see visual hierarchy, notice that red warning text, understand layout through spatial relationships.

What they see: The visual presentation  
What they miss: Links (can see buttons but not href values), underlying structure, non-visual metadata  
Example: GPT-4 Vision, Claude with image analysis, multimodal AI systems

## The practical implication

Your site needs to work for all three types. That sounds daunting, but there's good news: proper semantic HTML serves all three effectively.

The raw parser gets clear structure from semantic elements.  
The browser-based agent can execute your JavaScript but doesn't depend on it for basic content.  
The vision model sees proper visual hierarchy because you've styled semantic elements appropriately.

Here's a real example from my documentation work with Adobe Edge Delivery Services. I needed documentation that both developers could read and AI could parse.

**Bad approach (how many docs work):**

```html
<div class="doc-section">
  <div class="doc-title">Installation</div>
  <div class="doc-content">
    <div class="code-block">npm install @adobe/aem-cli</div>
    <div class="note">Requires Node.js 16 or higher</div>
  </div>
</div>
```

Humans could read this fine with CSS. AI just saw nested divs with no semantic meaning.

**Better approach (semantic structure):**

```html
<section>
  <h2>Installation</h2>
  <pre><code>npm install @adobe/aem-cli</code></pre>
  <aside role="note">
    <strong>Requirements:</strong> Node.js 16 or higher
  </aside>
</section>
```

Now:

- The `h2` signals a major section
- The `pre` and `code` elements identify executable code
- The `aside` with `role="note"` marks supplementary information
- The `strong` element indicates emphasis

All three AI reader types can extract meaningful information. And humans? Still see exactly what they saw before, because CSS still controls the presentation.

## The scanning pattern fallacy

Steve Krug taught us that humans scan in an F-pattern or Z-pattern, and we should design accordingly. But AI doesn't scan—it processes sequentially or uses attention mechanisms to focus on semantically marked content.

This creates an interesting design challenge. Humans benefit from visual patterns that guide the eye. AI benefits from semantic patterns that guide parsing. The solution isn't choosing one over the other—it's recognizing that they're implemented in different layers.

**Visual layer (CSS):** Create the F-pattern, guide the eye with colour and size, make buttons look clickable  
**Semantic layer (HTML):** Create clear hierarchy with headings, mark up navigation as `nav`, identify main content with `main`

The two layers work together. Remove the CSS and the semantic layer still makes sense. That's the test: does your content have meaning without styling?

## What's coming

I've shown you how AI reads. Now you might be thinking: "This means I need to rebuild everything!"

Not necessarily. In the next chapter, we'll look at the principles that guide AI-friendly design—the equivalent of Krug's usability heuristics, but for invisible users. You'll see that many of these principles align with accessibility, mobile-first design, and progressive enhancement.

Making your site AI-readable isn't a separate project. It's often just doing what we should have been doing anyway, but with renewed purpose now that the stakes are higher.

---

**Coming up in Chapter 3:** The guiding principles for dual-audience design—how to make sites that work for both humans and AI without compromise.
