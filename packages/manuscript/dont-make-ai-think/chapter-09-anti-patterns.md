# Chapter 9: Common Anti-Patterns

## The invisible barriers

You can do everything right—semantic HTML, Schema.org markup, proper navigation—and still make your site invisible to AI with a few specific mistakes. These anti-patterns appear repeatedly in client work, often introduced with good intentions but catastrophic results for AI readability.

Let me show you the most common ones and how to fix them.

## Anti-pattern 1: Visual-only information

**The problem:**

Information conveyed purely through visual styling, without semantic backing.

**Real example:**

```html
<div class="pricing-tiers">
  <div class="tier tier-basic">
    <div class="tier-name">Basic</div>
    <div class="tier-price">£29</div>
  </div>
  
  <div class="tier tier-pro tier-featured">
    <div class="tier-name">Professional</div>
    <div class="tier-price">£99</div>
    <div class="tier-badge">Most Popular</div>
  </div>
  
  <div class="tier tier-enterprise">
    <div class="tier-name">Enterprise</div>
    <div class="tier-price">£299</div>
  </div>
</div>
```

```css
.tier-featured {
  border: 3px solid gold;
  background: #fffef0;
  transform: scale(1.05);
}

.tier-badge {
  background: gold;
  color: black;
  font-weight: bold;
}
```

Humans see: the Professional tier is highlighted with a gold border, larger size, and a "Most Popular" badge.

AI sees: three identical div structures. No indication that Professional is recommended.

**The fix:**

Make the recommendation explicit in HTML:

```html
<section class="pricing-tiers">
  <article class="tier tier-basic">
    <h3>Basic</h3>
    <data value="29">£29</data>
    <span class="period">/month</span>
  </article>
  
  <article class="tier tier-pro" aria-label="Recommended plan">
    <h3>Professional <span class="badge" aria-label="Most popular plan">Most Popular</span></h3>
    <data value="99">£99</data>
    <span class="period">/month</span>
    <p><strong>Recommended for most businesses</strong></p>
  </article>
  
  <article class="tier tier-enterprise">
    <h3>Enterprise</h3>
    <data value="299">£299</data>
    <span class="period">/month</span>
  </article>
</section>
```

Now:

- The recommendation is text content, not just styling
- ARIA labels provide additional context
- The `strong` element indicates emphasis
- AI can determine this is the recommended tier

**Other examples of visual-only information:**

```html
<!-- Bad: Urgency shown only through colour -->
<div class="message error">Payment failed</div>

<!-- Good: Urgency explicit -->
<div class="message error" role="alert" aria-live="assertive">
  <strong>Error:</strong> Payment failed. Please check your card details.
</div>

<!-- Bad: Status shown with icons only -->
<span class="icon-check"></span>
<span class="icon-cross"></span>

<!-- Good: Status in text -->
<span class="status">
  <span aria-hidden="true" class="icon-check"></span>
  Available
</span>
<span class="status">
  <span aria-hidden="true" class="icon-cross"></span>
  Out of stock
</span>
```

## Anti-pattern 2: Content in images

**The problem:**

Text embedded in images without proper alt text or supplementary HTML.

**Real example I encountered:**

A client had their entire service offering described in an infographic. Beautiful design, completely opaque to AI:

```html
<img src="our-services-infographic.png" alt="Our services">
```

The image contained:

- Web Development: Full-stack development with modern frameworks
- Mobile Apps: iOS and Android native applications
- Cloud Infrastructure: AWS and Azure deployment and management
- DevOps: CI/CD pipelines and containerization

AI saw: "Our services" - no detail whatsoever.

**The fix:**

Provide the information in both image and text:

```html
<section>
  <h2>Our Services</h2>
  
  <img src="our-services-infographic.png" 
       alt="Infographic showing four service categories: Web Development, Mobile Apps, Cloud Infrastructure, and DevOps">
  
  <div class="services-text">
    <article>
      <h3>Web Development</h3>
      <p>Full-stack development with modern frameworks including React, Vue, and Node.js</p>
    </article>
    
    <article>
      <h3>Mobile Apps</h3>
      <p>iOS and Android native applications built with Swift and Kotlin</p>
    </article>
    
    <article>
      <h3>Cloud Infrastructure</h3>
      <p>AWS and Azure deployment and management with infrastructure as code</p>
    </article>
    
    <article>
      <h3>DevOps</h3>
      <p>CI/CD pipelines and containerization with Docker and Kubernetes</p>
    </article>
  </div>
</section>
```

You can style `.services-text` to be visually hidden if you want users to see only the infographic, but the content exists for AI and screen readers.

**Other common cases:**

```html
<!-- Bad: Screenshot of pricing table -->
<img src="pricing-screenshot.png" alt="Pricing">

<!-- Good: Actual HTML table -->
<table>
  <caption>Pricing Plans</caption>
  <thead>
    <tr>
      <th>Plan</th>
      <th>Price</th>
      <th>Features</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Basic</th>
      <td>£29/month</td>
      <td>Up to 5 users, 10GB storage</td>
    </tr>
    <!-- More rows -->
  </tbody>
</table>

<!-- Bad: Company info in image -->
<img src="contact-card.png" alt="Contact us">

<!-- Good: Structured contact info -->
<address>
  <strong>Digital Domain Technologies Ltd</strong><br>
  123 Oxford Road<br>
  Manchester M1 7ED<br>
  <a href="tel:+441611234567">0161 123 4567</a><br>
  <a href="mailto:info@example.com">info@example.com</a>
</address>
```

## Anti-pattern 3: Generic link text

**The problem:**

Links with meaningless text like "click here", "read more", "learn more".

**Real example:**

```html
<section>
  <h3>Edge Delivery Services Migration</h3>
  <p>
    We help companies migrate from traditional CMS platforms to Adobe's 
    Edge Delivery Services. Our proven methodology ensures minimal downtime 
    and maximum performance gains.
  </p>
  <a href="/services/eds-migration">Learn more</a>
</section>

<section>
  <h3>AEM Consulting</h3>
  <p>
    Strategic advisory for Adobe Experience Manager implementations. 
    From architecture to deployment, we guide your team through the process.
  </p>
  <a href="/services/aem-consulting">Learn more</a>
</section>

<section>
  <h3>Training and Support</h3>
  <p>
    Hands-on training programmes for development teams. Customized to your 
    specific needs and technical background.
  </p>
  <a href="/services/training">Learn more</a>
</section>
```

AI sees three "Learn more" links. Which is which? When extracted from context, they're indistinguishable.

**The fix:**

Make link text self-descriptive:

```html
<section>
  <h3>Edge Delivery Services Migration</h3>
  <p>
    We help companies migrate from traditional CMS platforms to Adobe's 
    Edge Delivery Services. Our proven methodology ensures minimal downtime 
    and maximum performance gains.
  </p>
  <a href="/services/eds-migration">Explore our EDS migration services</a>
</section>

<section>
  <h3>AEM Consulting</h3>
  <p>
    Strategic advisory for Adobe Experience Manager implementations. 
    From architecture to deployment, we guide your team through the process.
  </p>
  <a href="/services/aem-consulting">Learn about AEM consulting and advisory</a>
</section>

<section>
  <h3>Training and Support</h3>
  <p>
    Hands-on training programmes for development teams. Customized to your 
    specific needs and technical background.
  </p>
  <a href="/services/training">View training programmes and support options</a>
</section>
```

Each link now describes its destination clearly.

**Alternative approach:**

If you must use short link text for design reasons, use `aria-label`:

```html
<a href="/services/eds-migration" 
   aria-label="Learn more about Edge Delivery Services migration">
  Learn more
</a>
```

But descriptive link text is better—it helps everyone, not just AI and screen reader users.

## Anti-pattern 4: Broken heading hierarchy

**The problem:**

Headings used for styling rather than structure, creating illogical hierarchies.

**Real example:**

```html
<h1>Welcome to Digital Domain</h1>

<div class="services-section">
  <h3>Our Services</h3>  <!-- Skipped h2 -->
  
  <div class="service">
    <h2>Web Development</h2>  <!-- h2 under h3 -->
    <p>We build modern web applications...</p>
  </div>
  
  <div class="service">
    <h2>Consulting</h2>  <!-- Another h2 under h3 -->
    <p>Strategic guidance for your projects...</p>
  </div>
</div>

<div class="about-section">
  <h4>About Us</h4>  <!-- h4 without h2 or h3 -->
  <p>Founded in 1999...</p>
</div>
```

This hierarchy makes no sense:

- h1 (page title)
  - h3 (services) - skipped h2
    - h2 (web dev) - went backwards
    - h2 (consulting) - went backwards
  - h4 (about) - skipped h2 and h3

AI can't build a coherent outline from this.

**The fix:**

Use heading levels logically:

```html
<h1>Welcome to Digital Domain</h1>

<section>
  <h2>Our Services</h2>
  
  <article>
    <h3>Web Development</h3>
    <p>We build modern web applications...</p>
  </article>
  
  <article>
    <h3>Consulting</h3>
    <p>Strategic guidance for your projects...</p>
  </article>
</section>

<section>
  <h2>About Us</h2>
  <p>Founded in 1999...</p>
</section>
```

Now the hierarchy is logical:

- h1 (page title)
  - h2 (services)
    - h3 (web dev)
    - h3 (consulting)
  - h2 (about)

If you need different heading sizes for visual design, use CSS:

```css
.small-heading {
  font-size: 1.2rem; /* h3 size */
}

.large-heading {
  font-size: 2rem; /* h1 size */
}
```

```html
<h2 class="small-heading">This looks like h3 but is semantically h2</h2>
```

**Test your heading hierarchy:**

Use a browser extension like HeadingsMap or run this in the console:

```javascript
Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
  .forEach(h => {
    const level = h.tagName[1];
    const indent = '  '.repeat(parseInt(level) - 1);
    console.log(`${indent}${h.tagName}: ${h.textContent.trim()}`);
  });
```

The output should show a logical tree structure.

## Anti-pattern 5: JavaScript-only navigation

**The problem:**

Navigation menus that only exist after JavaScript executes.

**Real example:**

```html
<nav id="main-nav"></nav>

<script>
  const navItems = [
    { text: 'Home', url: '/' },
    { text: 'Services', url: '/services' },
    { text: 'About', url: '/about' }
  ];
  
  const navHTML = navItems.map(item => 
    `<a href="${item.url}">${item.text}</a>`
  ).join('');
  
  document.getElementById('main-nav').innerHTML = navHTML;
</script>
```

Parsers see: empty nav element.

**The fix:**

Put navigation in HTML, enhance with JavaScript if needed:

```html
<nav id="main-nav">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<script>
  // JavaScript can still enhance this (dropdowns, mobile menu, etc.)
  // But the base navigation works without it
</script>
```

## Anti-pattern 6: Hidden content with no fallback

**The problem:**

Content hidden behind interactions with no alternative access.

**Real example:**

```html
<div class="accordion">
  <button class="accordion-header">What are your opening hours?</button>
  <div class="accordion-content" style="display: none;">
    Monday to Friday, 9am to 5pm
  </div>
</div>

<div class="accordion">
  <button class="accordion-header">Do you offer consultations?</button>
  <div class="accordion-content" style="display: none;">
    Yes, we offer free 30-minute initial consultations
  </div>
</div>
```

If JavaScript fails or doesn't execute, the answers remain hidden forever.

**The fix:**

Make content visible by default, hide with JavaScript as enhancement:

```html
<section class="accordion-section">
  <article class="accordion-item">
    <h3>
      <button class="accordion-header" aria-expanded="true">
        What are your opening hours?
      </button>
    </h3>
    <div class="accordion-content">
      Monday to Friday, 9am to 5pm
    </div>
  </article>
  
  <article class="accordion-item">
    <h3>
      <button class="accordion-header" aria-expanded="true">
        Do you offer consultations?
      </button>
    </h3>
    <div class="accordion-content">
      Yes, we offer free 30-minute initial consultations
    </div>
  </article>
</section>

<script>
  // JavaScript collapses items after page load
  document.querySelectorAll('.accordion-item').forEach(item => {
    const button = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    // Collapse by default
    content.style.display = 'none';
    button.setAttribute('aria-expanded', 'false');
    
    // Add click handler to toggle
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !expanded);
      content.style.display = expanded ? 'none' : 'block';
    });
  });
</script>
```

Now:

- Content is in the HTML (AI can read it)
- JavaScript adds the accordion behaviour
- If JavaScript fails, content remains visible
- This is progressive enhancement

## Anti-pattern 7: No sitemap or outdated sitemap

**The problem:**

Missing sitemap, or sitemap that doesn't reflect actual site structure.

**Real examples I've seen:**

```xml
<!-- Sitemap last updated 2019, site extensively changed since -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/old-product-page</loc>
    <lastmod>2019-06-15</lastmod>
  </url>
  <!-- Links to pages that return 404 -->
</urlset>
```

Or sites with no sitemap at all, relying entirely on internal linking for discoverability.

**The fix:**

Generate sitemaps automatically:

```javascript
// Example: Dynamic sitemap generation
app.get('/sitemap.xml', async (req, res) => {
  const pages = await getAllPages();
  const posts = await getAllBlogPosts();
  const products = await getAllProducts();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add all pages
  [...pages, ...posts, ...products].forEach(item => {
    xml += '  <url>\n';
    xml += `    <loc>${item.url}</loc>\n`;
    xml += `    <lastmod>${item.updated.toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <priority>${item.priority || 0.8}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});
```

For static sites, regenerate during build:

```javascript
// build-sitemap.js
const fs = require('fs');
const globby = require('globby');

async function generateSitemap() {
  const pages = await globby([
    'dist/**/*.html',
    '!dist/404.html'
  ]);
  
  const urls = pages.map(page => {
    const path = page.replace('dist', '').replace('/index.html', '/');
    return `https://example.com${path}`;
  });
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;
  
  fs.writeFileSync('dist/sitemap.xml', xml);
}

generateSitemap();
```

## Anti-pattern 8: Inconsistent Schema.org

**The problem:**

Schema.org markup that contradicts visible content or is incomplete.

**Real example:**

```html
<h1>Professional Standing Desk - White Oak Finish</h1>
<p>Price: £599 (currently on sale for £499)</p>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Standing Desk",
  "offers": {
    "@type": "Offer",
    "price": "599",
    "priceCurrency": "GBP"
  }
}
</script>
```

Problems:

- Name in Schema doesn't match h1 ("Standing Desk" vs "Professional Standing Desk - White Oak Finish")
- Price in Schema is £599 but visible price is £499
- Sale price not reflected in Schema

**The fix:**

Make Schema.org match visible content exactly:

```html
<h1>Professional Standing Desk - White Oak Finish</h1>
<p>
  <span class="original-price">Was: £599</span>
  <strong class="sale-price">Now: £499</strong>
</p>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Professional Standing Desk - White Oak Finish",
  "offers": {
    "@type": "Offer",
    "price": "499",
    "priceCurrency": "GBP",
    "priceValidUntil": "2024-12-31",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

Better yet, generate Schema.org from the same data source as your visible content to guarantee consistency.

## Anti-pattern 9: Forms without proper labels

**The problem:**

Form inputs identified only by placeholder text.

**Real example:**

```html
<form>
  <input type="text" placeholder="Your name">
  <input type="email" placeholder="Email address">
  <input type="tel" placeholder="Phone number">
  <textarea placeholder="Your message"></textarea>
  <button>Send</button>
</form>
```

Problems:

- Placeholders disappear when user types
- No explicit label-input relationship
- AI can't determine required fields or field purpose with certainty

**The fix:**

Use proper label elements:

```html
<form>
  <div class="form-field">
    <label for="name">Your Name</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div class="form-field">
    <label for="email">Email Address</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div class="form-field">
    <label for="phone">Phone Number <span class="optional">(optional)</span></label>
    <input type="tel" id="phone" name="phone">
  </div>
  
  <div class="form-field">
    <label for="message">Your Message</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>
  
  <button type="submit">Send Message</button>
</form>
```

Now:

- Each input has an explicit label
- Required fields marked with `required` attribute
- Optional fields indicated in label
- AI can determine form purpose and structure

## Anti-pattern 10: Table abuse

**The problem:**

Tables used for layout or data tables without proper structure.

**Layout table example (don't do this):**

```html
<table>
  <tr>
    <td>
      <nav>
        <!-- Navigation -->
      </nav>
    </td>
    <td>
      <main>
        <!-- Main content -->
      </main>
    </td>
    <td>
      <aside>
        <!-- Sidebar -->
      </aside>
    </td>
  </tr>
</table>
```

This hasn't been acceptable since CSS gained layout capabilities. Use flexbox or grid instead.

**Data table without structure:**

```html
<table>
  <tr>
    <td>Plan</td>
    <td>Price</td>
    <td>Users</td>
  </tr>
  <tr>
    <td>Basic</td>
    <td>£29</td>
    <td>5</td>
  </tr>
  <tr>
    <td>Pro</td>
    <td>£99</td>
    <td>25</td>
  </tr>
</table>
```

AI can't distinguish headers from data.

**The fix:**

Use semantic table elements:

```html
<table>
  <caption>Pricing Plan Comparison</caption>
  <thead>
    <tr>
      <th scope="col">Plan Name</th>
      <th scope="col">Monthly Price</th>
      <th scope="col">Maximum Users</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Basic</th>
      <td>£29</td>
      <td>5</td>
    </tr>
    <tr>
      <th scope="row">Professional</th>
      <td>£99</td>
      <td>25</td>
    </tr>
    <tr>
      <th scope="row">Enterprise</th>
      <td>£299</td>
      <td>Unlimited</td>
    </tr>
  </tbody>
</table>
```

Now AI can answer: "What's the price of the Professional plan?" by finding the row where the row header is "Professional" and extracting the price cell.

## Anti-pattern 11: Content in iframes

**The problem:**

Important content loaded in iframes from external sources.

**Real example:**

```html
<h2>Our Latest News</h2>
<iframe src="https://news-widget.example.com/feed"></iframe>
```

AI sees: an iframe. The content inside is from a different domain, potentially inaccessible.

**The fix:**

Pull content server-side and render it in your HTML:

```html
<section>
  <h2>Our Latest News</h2>
  
  <article>
    <h3><a href="/news/new-service-launch">New Service Launch</a></h3>
    <time datetime="2024-03-20">20 March 2024</time>
    <p>We're introducing Edge Delivery Services consulting...</p>
  </article>
  
  <article>
    <h3><a href="/news/team-expansion">Team Expansion</a></h3>
    <time datetime="2024-03-15">15 March 2024</time>
    <p>Digital Domain welcomes three new consultants...</p>
  </article>
</section>
```

If you must use an iframe (embedded maps, video players), ensure critical information is also in HTML:

```html
<section>
  <h2>Our Location</h2>
  
  <address>
    Digital Domain Technologies Ltd<br>
    123 Oxford Road<br>
    Manchester M1 7ED<br>
    United Kingdom
  </address>
  
  <p>
    <a href="https://maps.google.com/?q=123+Oxford+Road+Manchester">View on Google Maps</a>
  </p>
  
  <!-- Map iframe as enhancement -->
  <iframe src="https://www.google.com/maps/embed?pb=..."
          width="600" height="450" 
          title="Map showing our office location at 123 Oxford Road, Manchester">
  </iframe>
</section>
```

## Anti-pattern 12: PDF-only content

**The problem:**

Important information only available as PDF downloads.

**Real example:**

```html
<h2>Our Services</h2>
<p>Download our services brochure to learn more.</p>
<a href="/brochure.pdf">Download PDF (2.3 MB)</a>
```

AI might not parse PDFs, or might parse them poorly if they're scanned images.

**The fix:**

Provide information in HTML, offer PDF as alternative:

```html
<section>
  <h2>Our Services</h2>
  
  <article>
    <h3>Edge Delivery Services</h3>
    <p>Modern web delivery using Adobe's Edge Delivery Services platform...</p>
    <ul>
      <li>Migration from legacy CMS platforms</li>
      <li>Custom block development</li>
      <li>Performance optimization</li>
    </ul>
  </article>
  
  <article>
    <h3>AEM Consulting</h3>
    <p>Strategic advisory for Adobe Experience Manager implementations...</p>
    <ul>
      <li>Architecture planning</li>
      <li>Implementation guidance</li>
      <li>Team training</li>
    </ul>
  </article>
  
  <aside>
    <p>
      <a href="/services-brochure.pdf">Download this information as PDF</a> 
      (2.3 MB)
    </p>
  </aside>
</section>
```

If you must publish content primarily as PDF, ensure the PDF has:

- Text layer (not scanned images)
- Proper document structure
- Meaningful alt text for images
- Metadata (title, author, subject)

## Anti-pattern 13: Auto-playing content

**The problem:**

Content that changes without user interaction, making specific information hard to reference.

**Real example:**

```html
<div class="testimonials-carousel" data-autoplay="3000">
  <div class="testimonial">
    <p>"Great service!" - Client A</p>
  </div>
  <div class="testimonial">
    <p>"Highly recommend" - Client B</p>
  </div>
  <div class="testimonial">
    <p>"Outstanding work" - Client C</p>
  </div>
</div>
```

The carousel auto-rotates every 3 seconds. AI fetching the page might only see one testimonial, missing the others.

**The fix:**

Show all content in HTML, add carousel as enhancement:

```html
<section class="testimonials">
  <h2>Client Testimonials</h2>
  
  <article class="testimonial">
    <blockquote>
      <p>Digital Domain transformed our web presence. The migration to Edge Delivery Services was seamless, and performance improved dramatically.</p>
    </blockquote>
    <figcaption>
      <cite>Sarah Johnson, CTO at AutoCorp</cite>
    </figcaption>
  </article>
  
  <article class="testimonial">
    <blockquote>
      <p>Tom's expertise in AEM saved us months of development time. His guidance on architecture was invaluable.</p>
    </blockquote>
    <figcaption>
      <cite>David Chen, Head of Digital at FinanceGroup</cite>
    </figcaption>
  </article>
  
  <article class="testimonial">
    <blockquote>
      <p>The training programme upskilled our entire team. We're now confident managing our EDS implementation independently.</p>
    </blockquote>
    <figcaption>
      <cite>Emma Williams, Development Manager at RetailHub</cite>
    </figcaption>
  </article>
</section>

<script>
  // JavaScript can add carousel functionality without hiding content
  // Use CSS to show one at a time visually while keeping all in DOM
</script>
```

## How to audit for anti-patterns

**Quick audit checklist:**

1. Disable CSS - does critical info disappear?
2. Disable JavaScript - is the site still usable?
3. View source - is content in HTML or generated?
4. Extract all links - are they descriptive?
5. Check heading hierarchy - does it make sense?
6. Look for images - do they have proper alt text?
7. Find forms - do inputs have labels?
8. Check tables - are they structured properly?
9. Review sitemap - is it current and complete?
10. Validate Schema.org - does it match visible content?

**Red flags:**

- Empty `<div id="app">` or `<div id="root">`
- Lots of `display: none` without semantic reason
- Navigation in JavaScript only
- "Learn more" and "Click here" everywhere
- Images with `alt=""` or `alt="image"`
- Placeholder text instead of labels
- Heading levels jumping around (h1 → h4 → h2)
- Sitemap.xml returning 404
- Forms submitting but no confirmation

## The quick wins

If you can only fix a few things, prioritize these:

**1. Add proper heading hierarchy** (30 minutes)  
Big impact on AI's ability to understand page structure.

**2. Fix link text** (1-2 hours)  
Replace "click here" with descriptive links.

**3. Add alt text to images** (2-3 hours)  
Describe what each image shows.

**4. Create or update sitemap** (1 hour)  
Ensure AI can discover all your pages.

**5. Add basic Schema.org to homepage** (1 hour)  
Organization/LocalBusiness markup gives AI your basic details.

These five fixes, taking 6-8 hours total, will solve 80% of common AI readability problems.

## What's next

You've learned what to avoid. Now let's bring everything together—the patterns to embrace, the anti-patterns to avoid, and the testing to validate.

The final chapter provides a practical implementation roadmap: how to actually do this work on a real site, with real constraints, in a realistic timeframe.

---

**Coming up in Chapter 10:** Implementation roadmap—from audit to deployment, making your site AI-readable without rebuilding everything.
