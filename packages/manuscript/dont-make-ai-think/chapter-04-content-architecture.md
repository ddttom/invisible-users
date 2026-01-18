# Chapter 4: Content Architecture for Machines

## The building blocks

If the previous chapter gave you principles, this one gives you patterns. These are the specific structural approaches that work for both human and AI readers across common page types.

I'm not going to show you every possible variation. Instead, I'll focus on the patterns I see most often in client work—the ones that, when done badly, cause the most AI-readability problems.

## Pattern 1: The article or blog post

Articles are where many sites get their first AI traffic. Someone asks a question, an AI searches for answers, and your article either gets recommended or doesn't.

**The structure that fails:**

```html
<div class="post">
  <div class="post-header">
    <div class="post-title">How to Choose the Right CMS</div>
    <div class="post-meta">Posted by John Smith on March 15, 2024</div>
  </div>
  <div class="post-body">
    <div class="intro">
      Choosing a content management system is one of the most important 
      decisions you'll make for your website...
    </div>
    <div class="section">
      <div class="section-title">Consider your requirements</div>
      <div class="section-content">...</div>
    </div>
    <!-- More sections -->
  </div>
</div>
```

This might look fine visually, but AI sees:

- No clear hierarchy (everything's a div)
- No indication of document structure
- No semantic metadata about authorship or publication date
- No way to distinguish the introduction from the main content

**The structure that works:**

```html
<article itemscope itemtype="https://schema.org/Article">
  <header>
    <h1 itemprop="headline">How to Choose the Right CMS</h1>
    <p>
      By <span itemprop="author">John Smith</span> | 
      <time itemprop="datePublished" datetime="2024-03-15">15 March 2024</time>
    </p>
  </header>
  
  <div itemprop="articleBody">
    <p class="lede">
      Choosing a content management system is one of the most important 
      decisions you'll make for your website...
    </p>
    
    <h2>Consider your requirements</h2>
    <p>Start by listing what you actually need...</p>
    
    <h3>Content authoring needs</h3>
    <p>How many people will create content?...</p>
    
    <h3>Technical requirements</h3>
    <p>What integrations do you need?...</p>
    
    <h2>Evaluate the options</h2>
    <p>Once you know what you need...</p>
    
    <h3>Traditional CMS platforms</h3>
    <p>WordPress, Drupal, and similar systems...</p>
    
    <h3>Headless CMS solutions</h3>
    <p>Modern headless systems like Contentful...</p>
    
    <h2>Making the decision</h2>
    <p>With your requirements clear and options evaluated...</p>
  </div>
</article>
```

What changed:

**Document structure:**

- `article` element wraps the entire post
- `header` contains metadata
- Proper `h1` through `h3` hierarchy creates an outline:
  - How to Choose the Right CMS
    - Consider your requirements
      - Content authoring needs
      - Technical requirements
    - Evaluate the options
      - Traditional CMS platforms
      - Headless CMS solutions
    - Making the decision

**Semantic metadata:**

- Schema.org Article type
- `headline` property for the title
- `author` and `datePublished` with proper datetime format
- `articleBody` wrapping the content

**For AI, this provides:**

- Clear topic from the h1
- Outline structure from headings
- Author attribution
- Publication date (useful for determining recency)
- Distinct introduction paragraph

**For humans:**

- Same visual presentation with CSS
- Better accessibility (screen readers can navigate by heading)
- Clearer document structure when styles fail

## Pattern 2: The product page

Product pages are where the economic stakes are highest. If AI can't parse your product information, it can't recommend your products.

**The common anti-pattern:**

```html
<div class="product-page">
  <div class="product-gallery">
    <img src="product-main.jpg">
    <div class="thumbnails">
      <img src="product-1.jpg">
      <img src="product-2.jpg">
    </div>
  </div>
  
  <div class="product-info">
    <div class="product-name">Wireless Keyboard</div>
    <div class="product-price">£79.99</div>
    <div class="product-rating">
      <span class="stars">★★★★★</span>
      <span class="review-count">127 reviews</span>
    </div>
  </div>
  
  <div class="product-details">
    <div class="tab-content" id="specs" style="display:none">
      Battery life: 6 months
      Connectivity: Bluetooth 5.0
      Layout: UK QWERTY
    </div>
  </div>
</div>
```

Problems:

- Product specs hidden in JavaScript tabs (display:none means parsers might skip it)
- No structured data about price or availability
- Rating shown visually but not semantically
- Images without descriptive alt text
- No clear indication this is a product

**The pattern that works:**

```html
<main>
  <article itemscope itemtype="https://schema.org/Product">
    <h1 itemprop="name">Wireless Keyboard</h1>
    
    <div class="product-images">
      <img itemprop="image" 
           src="product-main.jpg" 
           alt="Wireless keyboard with backlit keys in dark grey finish">
      <img src="product-1.jpg" 
           alt="Close-up view of keyboard keys showing backlighting">
      <img src="product-2.jpg" 
           alt="Side view showing keyboard profile and USB receiver">
    </div>
    
    <section>
      <h2>Overview</h2>
      <p itemprop="description">
        Professional wireless keyboard with LED backlighting, 
        six-month battery life, and Bluetooth 5.0 connectivity. 
        Features UK QWERTY layout with dedicated media keys.
      </p>
      
      <dl>
        <dt>Price</dt>
        <dd itemprop="offers" itemscope itemtype="https://schema.org/Offer">
          <data itemprop="price" value="79.99">£79.99</data>
          <meta itemprop="priceCurrency" content="GBP">
          <link itemprop="availability" href="https://schema.org/InStock">
          <span>In Stock</span>
        </dd>
        
        <dt>Customer Rating</dt>
        <dd itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
          <data itemprop="ratingValue" value="4.8">4.8</data> out of 5 stars
          (<data itemprop="reviewCount" value="127">127</data> reviews)
        </dd>
      </dl>
    </section>
    
    <section>
      <h2>Technical Specifications</h2>
      <dl>
        <dt>Battery Life</dt>
        <dd>6 months (typical use)</dd>
        
        <dt>Connectivity</dt>
        <dd>Bluetooth 5.0, 2.4GHz USB receiver included</dd>
        
        <dt>Layout</dt>
        <dd>UK QWERTY with number pad</dd>
        
        <dt>Dimensions</dt>
        <dd>440mm × 130mm × 25mm</dd>
        
        <dt>Weight</dt>
        <dd>600g (without batteries)</dd>
      </dl>
    </section>
    
    <section>
      <h2>Purchase</h2>
      <form action="/cart/add" method="post">
        <input type="hidden" name="product_id" value="WK-100">
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity" value="1" min="1">
        <button type="submit">Add to Cart</button>
      </form>
    </section>
  </article>
</main>
```

What this provides:

**For AI parsing:**

- Clear Product schema with name, description, image
- Structured pricing with currency and availability
- Rating as structured data, not just visual stars
- Specifications in definition lists (key-value pairs)
- All content visible regardless of JavaScript state

**For humans:**

- All the same information, styled however you want
- Tabs can still work (progressive enhancement)
- Same visual design achievable with CSS

**For search engines:**

- Rich snippets showing price, rating, availability
- Better understanding of product attributes
- Clear product identity

## Pattern 3: The navigation menu

Navigation is interesting because it serves multiple purposes: humans use it to move around, AI uses it to understand site structure.

**The problematic pattern:**

```html
<div class="nav">
  <a href="/">Home</a>
  <div class="dropdown">
    <a href="/services">Services</a>
    <div class="dropdown-content">
      <a href="/services/web">Web Development</a>
      <a href="/services/mobile">Mobile Apps</a>
      <a href="/services/consulting">Consulting</a>
    </div>
  </div>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</div>
```

Issues:

- Not marked as navigation
- Dropdown structure unclear (just nested divs)
- No indication which page you're on
- Relationship between parent and child items unclear

**The better pattern:**

```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li>
      <a href="/services" aria-expanded="false">Services</a>
      <ul>
        <li><a href="/services/web">Web Development</a></li>
        <li><a href="/services/mobile">Mobile Apps</a></li>
        <li><a href="/services/consulting">Consulting</a></li>
      </ul>
    </li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

Improvements:

**Semantic structure:**

- `nav` element marks this as navigation
- `aria-label` distinguishes this navigation from others (footer nav, breadcrumbs)
- Nested `ul` elements show hierarchical relationships
- `aria-current` indicates the current page
- `aria-expanded` shows dropdown state

**For AI:**

- Clear site structure (Services has three sub-areas)
- Navigation relationships explicit
- Current location indicated

**For humans:**

- Still works without JavaScript (nested lists)
- Progressive enhancement adds hover/click behaviour
- Screen readers can navigate effectively

**Bonus: Breadcrumbs**

While we're on navigation, breadcrumbs are particularly valuable for AI:

```html
<nav aria-label="Breadcrumb">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/">
        <span itemprop="name">Home</span>
      </a>
      <meta itemprop="position" content="1">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/services">
        <span itemprop="name">Services</span>
      </a>
      <meta itemprop="position" content="2">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span itemprop="name">Web Development</span>
      <meta itemprop="position" content="3">
    </li>
  </ol>
</nav>
```

This tells AI:

- Where this page sits in the hierarchy
- The path from homepage to current location
- The relationship between levels

Search engines often display this as breadcrumb navigation in results, and AI can use it to understand context.

## Pattern 4: The FAQ section

FAQ pages are goldmine content for AI. People ask questions, AI looks for answers—FAQ pages should be the perfect match.

**The missed opportunity:**

```html
<div class="faq-section">
  <div class="faq-item">
    <div class="question">How long does delivery take?</div>
    <div class="answer">Standard delivery takes 3-5 business days...</div>
  </div>
  <div class="faq-item">
    <div class="question">What payment methods do you accept?</div>
    <div class="answer">We accept all major credit cards...</div>
  </div>
</div>
```

This is readable but provides no semantic structure.

**The optimized pattern:**

```html
<section itemscope itemtype="https://schema.org/FAQPage">
  <h2>Frequently Asked Questions</h2>
  
  <article itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">How long does delivery take?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text">
        Standard delivery takes 3-5 business days. Express delivery 
        (next business day) is available for orders placed before 2pm.
      </p>
    </div>
  </article>
  
  <article itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">What payment methods do you accept?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text">
        We accept all major credit cards (Visa, Mastercard, American Express), 
        PayPal, and bank transfer for business accounts.
      </p>
    </div>
  </article>
  
  <article itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Can I return items?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text">
        Yes, we offer a 30-day return policy. Items must be unused and in 
        original packaging. Contact our support team to arrange a return.
      </p>
    </div>
  </article>
</section>
```

This pattern:

**Makes questions discoverable:**

- Each question is a proper heading (h3)
- Schema.org FAQPage type marks the section
- Each Question/Answer pair is structured

**Enables direct answers:**

- AI can extract question and answer pairs
- Answers are complete and self-contained
- Structure makes it clear which text answers which question

**Works for humans:**

- Visual styling unchanged
- Can add accordion JavaScript if desired
- Screen readers navigate by heading

When someone asks an AI "How long does delivery take from CompanyX?" the AI can find this FAQ, extract the answer, and respond confidently.

## Pattern 5: The contact page

Contact pages seem simple but often fail AI parsing because information is scattered or embedded in images.

**The common failure:**

```html
<div class="contact-page">
  <div class="contact-info">
    <div class="office">
      <div>Manchester Office</div>
      <div>123 Oxford Road</div>
      <div>Manchester M1 7ED</div>
      <div>0161 123 4567</div>
    </div>
  </div>
  <div class="contact-form">
    <input placeholder="Name">
    <input placeholder="Email">
    <textarea placeholder="Message"></textarea>
    <button>Send</button>
  </div>
</div>
```

Problems:

- No semantic markup for address components
- Phone number not marked as such
- Form fields lack proper labels
- No indication what the form does

**The structured approach:**

```html
<main>
  <h1>Contact Us</h1>
  
  <section itemscope itemtype="https://schema.org/LocalBusiness">
    <h2>Our Office</h2>
    <div itemprop="name">Digital Domain Technologies Ltd</div>
    <address itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
      <span itemprop="streetAddress">123 Oxford Road</span><br>
      <span itemprop="addressLocality">Manchester</span>
      <span itemprop="postalCode">M1 7ED</span><br>
      <span itemprop="addressCountry">United Kingdom</span>
    </address>
    
    <dl>
      <dt>Phone</dt>
      <dd><a href="tel:+441611234567" itemprop="telephone">0161 123 4567</a></dd>
      
      <dt>Email</dt>
      <dd><a href="mailto:info@digitaldomain.co.uk" itemprop="email">info@digitaldomain.co.uk</a></dd>
      
      <dt>Business Hours</dt>
      <dd itemprop="openingHours" content="Mo-Fr 09:00-17:00">
        Monday to Friday, 9am - 5pm
      </dd>
    </dl>
  </section>
  
  <section>
    <h2>Send us a message</h2>
    <form action="/contact/submit" method="post">
      <div>
        <label for="name">Your Name</label>
        <input type="text" id="name" name="name" required>
      </div>
      
      <div>
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" required>
      </div>
      
      <div>
        <label for="phone">Phone Number (optional)</label>
        <input type="tel" id="phone" name="phone">
      </div>
      
      <div>
        <label for="subject">Subject</label>
        <input type="text" id="subject" name="subject" required>
      </div>
      
      <div>
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="6" required></textarea>
      </div>
      
      <button type="submit">Send Message</button>
    </form>
  </section>
</main>
```

This provides:

**Structured contact information:**

- `address` element for the postal address
- Schema.org LocalBusiness with address components
- Phone as clickable link (works on mobile)
- Email as mailto link
- Opening hours in machine-readable format

**Proper form structure:**

- Every input has a `label` explicitly associated via `id`
- Input types match data (email, tel, text)
- Required fields marked
- Clear purpose for the form

**For AI:**

- Can extract phone number to answer "What's the phone number?"
- Can determine opening hours
- Can parse the complete address
- Understands what information the form collects

## Pattern 6: The data table

Tables are often misused (for layout) or under-marked (missing semantic information). When used correctly, they're brilliant for AI.

**The bare minimum:**

```html
<table>
  <tr>
    <td>Plan</td>
    <td>Price</td>
    <td>Users</td>
  </tr>
  <tr>
    <td>Basic</td>
    <td>£29/month</td>
    <td>5</td>
  </tr>
  <tr>
    <td>Professional</td>
    <td>£99/month</td>
    <td>25</td>
  </tr>
</table>
```

AI sees rows and cells but doesn't know which row is headers versus data.

**The semantic version:**

```html
<table>
  <caption>Pricing Plans Comparison</caption>
  <thead>
    <tr>
      <th scope="col">Plan</th>
      <th scope="col">Price</th>
      <th scope="col">Maximum Users</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Basic</th>
      <td>£29/month</td>
      <td>5</td>
    </tr>
    <tr>
      <th scope="row">Professional</th>
      <td>£99/month</td>
      <td>25</td>
    </tr>
    <tr>
      <th scope="row">Enterprise</th>
      <td>£299/month</td>
      <td>Unlimited</td>
    </tr>
  </tbody>
</table>
```

Now:

- `caption` provides context
- `thead` separates headers from data
- `th` elements with `scope` indicate what they describe
- `tbody` contains the actual data

AI can now answer: "How much is the Professional plan?" by finding the row where the row header equals "Professional" and extracting the price cell.

## Patterns vs. templates

These patterns aren't rigid templates. They're starting points. Your specific needs might require variations:

- Different Schema.org types
- Additional ARIA attributes
- More or less nesting
- Different heading levels

The key is understanding the principles behind each pattern:

1. **Use semantic elements** (`article`, `section`, `nav`, `header`, etc.)
2. **Create clear hierarchies** (proper heading levels)
3. **Make relationships explicit** (lists, definition lists, tables)
4. **Add structured data** where it provides value
5. **Label everything** properly (ARIA labels, form labels, image alt text)

## Testing these patterns

For each pattern, run the morning-after test:

1. View the page source
2. Copy the HTML
3. Paste into ChatGPT or Claude
4. Ask: "What information is on this page? What actions can I take?"

If the AI can extract the key information accurately, your structure works. If it misses things or gets confused, you've found problems to fix.

Next chapter, we'll move from content structure to metadata—the layer that makes promises explicit about what your content means and how it should be understood.

---

**Coming up in Chapter 5:** Metadata that works—Schema.org, JSON-LD, and making your content explicitly understandable to AI.
