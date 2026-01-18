# Chapter 3: Guiding Principles

## The don't make me think equivalent

Steve Krug's core principle was simple: make it obvious what things are and how to use them. For AI, we need something equally straightforward, but the "obvious" part works differently.

Humans rely on visual cues and learned patterns. AI relies on explicit structure and semantic meaning. The good news? You can serve both with the same HTML if you follow a few guiding principles.

Here are the four principles that underpin everything else in this book:

1. **Semantic clarity over visual clarity**
2. **Structure reveals intent**  
3. **Metadata makes promises explicit**
4. **Redundancy serves different consumers**

Let's look at what each means in practice.

## Principle 1: Semantic clarity over visual clarity

Visual clarity is making something look like what it is. A button looks clickable, a heading looks important, an error message looks urgent.

Semantic clarity is marking up something as what it is. A button uses `<button>`, a heading uses `<h1>`, an error message uses appropriate ARIA attributes.

The critical insight: you can have both. They're not competing approaches—they're complementary layers.

**Example: The pricing table**

I worked with a SaaS company whose pricing page was driving good conversion from humans but was invisible to AI. When users asked chatbots "What does CompanyX charge for their pro plan?" the AI couldn't answer, despite the information being prominently displayed.

Here's what they had:

```html
<div class="pricing-grid">
  <div class="plan-card plan-pro">
    <div class="plan-name">Professional</div>
    <div class="plan-price">£99<span class="period">/month</span></div>
    <div class="plan-features">
      <div class="feature">Up to 100 users</div>
      <div class="feature">Unlimited projects</div>
      <div class="feature">Priority support</div>
    </div>
    <div class="plan-cta">
      <a href="/signup?plan=pro" class="btn-primary">Get Started</a>
    </div>
  </div>
</div>
```

Visually: perfect. The price was large, the features were clearly listed, the call-to-action stood out.

Semantically: meaningless. The AI saw divs containing text strings. Nothing indicated that £99 was a price, that "Professional" was a plan tier, or that those features were a list of capabilities.

Here's the semantic version:

```html
<section aria-labelledby="pricing-heading">
  <h2 id="pricing-heading">Pricing Plans</h2>
  <article itemscope itemtype="https://schema.org/Product">
    <h3 itemprop="name">Professional</h3>
    <p>
      <data itemprop="price" value="99">£99</data>
      <span itemprop="priceCurrency" content="GBP"></span>
      <span>/month</span>
    </p>
    <h4>Features:</h4>
    <ul>
      <li>Up to 100 users</li>
      <li>Unlimited projects</li>
      <li>Priority support</li>
    </ul>
    <p>
      <a href="/signup?plan=pro">Get Started</a>
    </p>
  </article>
</section>
```

Now we have:

- `section` and `article` elements defining document structure
- `h2`, `h3`, `h4` creating a clear hierarchy
- `ul` indicating a list (not just vertical text)
- Schema.org markup making the price explicit
- Proper semantic elements throughout

The AI can now answer: "CompanyX's Professional plan costs £99 per month and includes up to 100 users, unlimited projects, and priority support."

And humans? With CSS, they see exactly the same visual design as before. Nothing changes for them.

## Principle 2: Structure reveals intent

Your HTML structure tells AI what matters and how things relate. This goes beyond just using semantic elements—it's about the relationships between them.

**Heading hierarchy as content outline**

Think of your heading levels (h1 through h6) as a table of contents that AI can parse. This isn't just good practice—it's how AI builds a mental model of your content.

**Bad structure:**

```html
<h1>Welcome to Our Site</h1>
<h3>Our Services</h3>
<h2>What We Do</h2>
<h3>Contact Information</h3>
<h2>About Us</h2>
```

The heading levels jump around without logic. AI can't tell what's a major section versus a subsection. The structure suggests chaos.

**Good structure:**

```html
<h1>Welcome to Our Site</h1>
<h2>Our Services</h2>
  <h3>Web Development</h3>
  <h3>Design Consulting</h3>
<h2>About Us</h2>
  <h3>Our Team</h3>
  <h3>Our History</h3>
<h2>Contact Information</h2>
```

Now there's a clear hierarchy. The h1 is the page title. Each h2 starts a major section. Each h3 is a subsection under its h2. AI can build a proper content outline.

This mirrors how a human would create a document outline—and that's not coincidental. Good document structure serves both audiences.

**Lists show relationships**

When you have related items, use list elements. This seems obvious, but you'd be surprised how often developers use div elements with CSS to create visual lists.

```html
<!-- Don't do this -->
<div class="feature-list">
  <div class="feature">Fast performance</div>
  <div class="feature">Secure by default</div>
  <div class="feature">Easy to integrate</div>
</div>

<!-- Do this -->
<ul>
  <li>Fast performance</li>
  <li>Secure by default</li>
  <li>Easy to integrate</li>
</ul>
```

The `ul` element tells AI: "these items are related members of a group." That's semantic information the div version doesn't convey.

When order matters, use `ol`:

```html
<ol>
  <li>Create an account</li>
  <li>Verify your email</li>
  <li>Complete your profile</li>
  <li>Start using the service</li>
</ol>
```

Now AI knows this is a sequence, not just a collection. If someone asks "What's the first step?" the AI can answer correctly.

**Definition lists for key-value pairs**

Here's an under-used HTML element that's perfect for certain content patterns:

```html
<dl>
  <dt>Location</dt>
  <dd>Manchester, UK</dd>
  
  <dt>Established</dt>
  <dd>1999</dd>
  
  <dt>Specialization</dt>
  <dd>Adobe Experience Manager consulting</dd>
  
  <dt>Day rate</dt>
  <dd>£800</dd>
</dl>
```

The `dl` (definition list) with `dt` (term) and `dd` (definition) creates explicit key-value relationships. AI can extract: "What's the location?" → "Manchester, UK". "When was it established?" → "1999".

Compare this to:

```html
<div class="info-grid">
  <div class="info-row">
    <span class="label">Location</span>
    <span class="value">Manchester, UK</span>
  </div>
  <!-- etc -->
</div>
```

Same visual result with CSS. Completely different semantic meaning.

## Principle 3: Metadata makes promises explicit

Sometimes content structure isn't enough. You need to make explicit promises about what content means and how it should be interpreted.

This is where metadata and structured data come in—not as SEO tricks, but as clear declarations of intent.

**Schema.org: The lingua franca**

Schema.org provides a shared vocabulary for describing content. When you mark up content with Schema.org terms, you're speaking a language AI already understands.

Here's a real example from a client in the automotive sector:

```html
<article itemscope itemtype="https://schema.org/LocalBusiness">
  <h1 itemprop="name">Manchester Motors</h1>
  <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
    <span itemprop="streetAddress">123 Oxford Road</span>,
    <span itemprop="addressLocality">Manchester</span>
    <span itemprop="postalCode">M1 7ED</span>
  </div>
  <p>
    Phone: <span itemprop="telephone">0161 123 4567</span><br>
    Email: <a href="mailto:info@manchestermotors.co.uk" itemprop="email">info@manchestermotors.co.uk</a>
  </p>
  <p itemprop="description">
    Authorized Land Rover service center specializing in maintenance and repairs.
  </p>
</article>
```

This microdata makes explicit promises:

- This is a local business
- The name is "Manchester Motors"  
- The address components are structured and labeled
- The phone and email are marked as contact information
- The description explains what the business does

When an AI encounters this, it doesn't have to guess or infer. The information is labeled and structured.

**JSON-LD: The AI-friendly format**

While microdata works, JSON-LD (JavaScript Object Notation for Linked Data) is often easier to implement and maintain:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Manchester Motors",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Oxford Road",
    "addressLocality": "Manchester",
    "postalCode": "M1 7ED"
  },
  "telephone": "0161 123 4567",
  "email": "info@manchestermotors.co.uk",
  "description": "Authorized Land Rover service center specializing in maintenance and repairs."
}
</script>
```

This sits in your page's `<head>` or anywhere in the `<body>`. It doesn't affect visual presentation at all. It's purely for machine readers.

The advantage? You can implement structured data without touching your existing HTML. Your developers can maintain it separately from your design system.

**Don't overdo it**

A word of caution: Schema.org has hundreds of types and properties. You don't need them all. Focus on:

- **Organization/LocalBusiness**: For company information
- **Product**: For products you sell
- **Article**: For blog posts and news
- **FAQPage**: For FAQ sections  
- **HowTo**: For step-by-step instructions
- **Event**: For events and webinars

These cover 90% of use cases. Adding more rarely helps and can clutter your code.

## Principle 4: Redundancy serves different consumers

Here's where dual-audience design gets interesting: sometimes you need to say the same thing in multiple ways because different consumers need different formats.

This feels wrong to developers trained in DRY (Don't Repeat Yourself), but remember—you're not serving just one consumer. You're serving humans who scan visually, screen readers that navigate by landmark, and AI that parses structure.

**Visual + semantic + metadata**

Consider a product page:

```html
<main>
  <article itemscope itemtype="https://schema.org/Product">
    <h1 itemprop="name">Professional Standing Desk</h1>
    
    <img src="desk.jpg" 
         alt="White adjustable standing desk with electric height control showing desk raised to standing position"
         itemprop="image">
    
    <p itemprop="description">
      Electric height-adjustable desk with memory presets, 
      cable management, and whisper-quiet motor. 
      Suitable for home offices and professional workspaces.
    </p>
    
    <dl>
      <dt>Price</dt>
      <dd>
        <data itemprop="price" value="599">£599</data>
        <meta itemprop="priceCurrency" content="GBP">
      </dd>
      
      <dt>Availability</dt>
      <dd itemprop="availability" content="https://schema.org/InStock">
        In Stock
      </dd>
      
      <dt>Dimensions</dt>
      <dd>120cm × 60cm (adjustable height 70cm - 120cm)</dd>
    </dl>
    
    <button type="button" aria-label="Add Professional Standing Desk to shopping cart">
      Add to Cart
    </button>
  </article>
</main>
```

Look at what we're doing:

**For humans:**

- The image shows what it looks like
- The layout creates visual hierarchy
- The button is visually obvious

**For screen readers:**

- The `alt` text describes the image
- The `aria-label` makes the button action explicit
- The structure allows navigation by heading

**For AI parsers:**

- The Schema.org markup identifies this as a product
- The price is marked with actual value and currency
- The availability is explicitly stated
- The heading provides the product name

**For all audiences:**

- The semantic HTML creates clear structure
- The content is readable without CSS or JavaScript
- The information is complete and self-contained

This is redundancy with purpose. Each layer serves specific consumers without harming others.

**The alt text principle**

Alt text is a perfect example of useful redundancy. Visual users see the image. Screen reader users hear the alt text. AI parsers read the alt text.

Bad alt text treats this as a chore:

```html
<img src="product-001.jpg" alt="product">
```

Good alt text serves all audiences:

```html
<img src="product-001.jpg" 
     alt="Standing desk raised to maximum height showing the motor housing and control panel">
```

The visual user gets additional context if the image fails to load. The screen reader user understands what's depicted. The AI parser knows what the image shows even though it can't see it.

**Navigation patterns**

Navigation is another area where redundancy helps:

```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<!-- Later in page footer -->
<nav aria-label="Footer navigation">
  <h2>Quick Links</h2>
  <ul>
    <li><a href="/privacy">Privacy Policy</a></li>
    <li><a href="/terms">Terms of Service</a></li>
    <li><a href="/sitemap">Sitemap</a></li>
  </ul>
</nav>
```

Multiple navigation blocks? That's fine if they're labeled differently. The `aria-label` attributes distinguish them. AI can tell there's a main navigation and a footer navigation. Screen readers can jump between them. Visual users see them styled and positioned differently.

## When principles conflict with reality

I can hear the objections already:

"Our design system uses div elements for everything."  
"We can't change the HTML without breaking the CSS."  
"The framework we use generates the markup."  
"We don't have budget to rebuild everything."

All valid concerns. Here's the thing: you don't need perfection. You need improvement.

Start with high-value pages:

- Homepage
- Top landing pages
- Product/service pages
- Contact and about pages

Fix the most glaring issues:

- Add proper heading hierarchy
- Mark navigation with `nav` elements
- Use `main` for primary content
- Add alt text to images

Then incrementally improve:

- Add Schema.org to key content types
- Convert visual lists to semantic lists
- Improve link text ("click here" → "view pricing details")
- Add ARIA labels where needed

You don't need to touch every page. The 80/20 rule applies: fixing 20% of your pages (the high-traffic ones) solves 80% of the AI-readability problem.

## The testing mindset

These principles aren't rules to memorize—they're guidelines to test against. For each page you create or modify, ask:

1. **If I removed all CSS, would the structure still make sense?**
2. **Can I outline the page using just the headings?**
3. **Are relationships between items explicit? (lists, definition lists, semantic elements)**
4. **Would an AI know what the key information is? (Schema.org, metadata)**
5. **Does redundancy serve different consumers without creating confusion?**

If you can answer yes to most of these, you're on the right track.

## What's next

I've given you principles. Now you need patterns—specific implementations for common scenarios.

In the next chapter, we'll look at content architecture: how to structure different types of pages so that both humans and AI can navigate and understand them. We'll cover navigation patterns, article structure, product pages, and forms.

Each pattern will show you the before (what doesn't work) and after (what does), with real examples you can adapt to your own sites.

---

**Coming up in Chapter 4:** Content architecture patterns for common page types—the building blocks of AI-readable sites.
