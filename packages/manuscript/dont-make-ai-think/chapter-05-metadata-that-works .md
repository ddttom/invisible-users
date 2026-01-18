# Chapter 5: Metadata That Works

## The promise layer

In the previous chapter, we looked at content structure—using semantic HTML to create clear hierarchies and relationships. But sometimes structure alone isn't enough. Sometimes you need to make explicit promises about what your content means.

That's what metadata does. It's a layer of explicit declarations: "This text string is a price in British pounds." "This date is when the article was published." "This person is the author, not just mentioned in passing."

Think of metadata as annotations in the margins of your HTML. The content is still there for humans to read, but the annotations help AI understand context and meaning that might otherwise be ambiguous.

## The metadata spectrum

Before we dive into implementation, let's acknowledge that metadata exists on a spectrum from "barely worth the effort" to "critical for function."

**Low value:**

- Metadata that duplicates obvious structure
- Over-specification that doesn't change AI behaviour
- Deprecated or ignored schemas

**Medium value:**

- Basic Schema.org for standard content types
- OpenGraph for social sharing
- Standard meta tags

**High value:**

- Structured data that enables rich results
- Metadata that disambiguates content
- Machine-readable formats for data AI needs to extract

I'll focus on the medium-to-high value range. There's no point implementing metadata that doesn't move the needle.

## Schema.org: The practical bits

Schema.org provides a shared vocabulary of types and properties. The full vocabulary contains hundreds of types—Organization, Person, Product, Event, Article, Recipe, Movie, and on and on.

You don't need most of them. Here are the types I actually use in client work, ranked by frequency:

**1. Organization / LocalBusiness**
For company information, contact details, locations.

**2. Article / BlogPosting / NewsArticle**  
For content marketing, blogs, news sections.

**3. Product / Offer**
For e-commerce or any product pages.

**4. FAQPage / Question / Answer**
For support content and FAQ sections.

**5. HowTo**
For tutorials and step-by-step guides.

**6. WebPage / WebSite**
General page metadata, site search.

These six types cover about 90% of what most sites need. If you're doing something more specialized—recipes, events, courses, job postings—there are types for those too. But start with these.

## JSON-LD vs. microdata vs. RDFa

There are three ways to add Schema.org markup to your pages. Let me save you some time: use JSON-LD.

**Microdata** embeds markup directly in your HTML attributes:

```html
<div itemscope itemtype="https://schema.org/Person">
  <span itemprop="name">Tom Harris</span>
  <span itemprop="jobTitle">Principal Consultant</span>
</div>
```

**RDFa** also embeds in HTML, with different attribute names:

```html
<div vocab="https://schema.org/" typeof="Person">
  <span property="name">Tom Harris</span>
  <span property="jobTitle">Principal Consultant</span>
</div>
```

**JSON-LD** separates structured data from your HTML:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Tom Harris",
  "jobTitle": "Principal Consultant"
}
</script>
```

Why JSON-LD wins:

- **Separation of concerns**: Your markup doesn't change
- **Easier to maintain**: Update JSON without touching HTML
- **Easier to generate**: Your CMS can output JSON from structured fields
- **Less error-prone**: Simpler syntax, easier to validate
- **Google's preference**: Explicitly recommended by Google

The only downside: you might duplicate information that's already in your HTML. But that redundancy is worthwhile for the maintainability gains.

## Pattern: Organization markup

Every site should have basic organization markup. This goes in your site-wide template, typically on the homepage:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Digital Domain Technologies Ltd",
  "url": "https://www.digitaldomain.co.uk",
  "logo": "https://www.digitaldomain.co.uk/logo.png",
  "description": "Adobe Experience Manager and Edge Delivery Services consultancy",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Oxford Road",
    "addressLocality": "Manchester",
    "postalCode": "M1 7ED",
    "addressCountry": "GB"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+44-161-123-4567",
    "contactType": "customer service",
    "email": "info@digitaldomain.co.uk",
    "availableLanguage": ["en"]
  },
  "sameAs": [
    "https://www.linkedin.com/in/tomharris",
    "https://twitter.com/digitaldomain"
  ]
}
</script>
```

This tells AI (and search engines):

- Your official company name
- Your web address
- Where to find your logo
- Physical location with structured address
- How to contact you
- Social media profiles

If you're a local business (restaurant, shop, service provider), use `LocalBusiness` instead of `Organization` and add opening hours:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Manchester Motors",
  "image": "https://example.com/photo.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Oxford Road",
    "addressLocality": "Manchester",
    "postalCode": "M1 7ED",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 53.4808,
    "longitude": -2.2426
  },
  "telephone": "+44-161-123-4567",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "13:00"
    }
  ]
}
</script>
```

Now AI can answer: "What time does Manchester Motors close on Friday?" → "17:00" (5pm).

## Pattern: Article markup

For blog posts, articles, case studies—any editorial content:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Migrate from AEM Classic to Edge Delivery Services",
  "description": "A practical guide to migrating Adobe Experience Manager sites to Edge Delivery Services, including common pitfalls and solutions.",
  "image": "https://example.com/article-image.jpg",
  "author": {
    "@type": "Person",
    "name": "Tom Harris",
    "url": "https://www.digitaldomain.co.uk/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Digital Domain Technologies",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.digitaldomain.co.uk/logo.png"
    }
  },
  "datePublished": "2024-03-15T09:00:00Z",
  "dateModified": "2024-03-20T14:30:00Z"
}
</script>
```

Key points:

**Use proper ISO 8601 dates:** `2024-03-15T09:00:00Z` not "March 15, 2024"

**Include both datePublished and dateModified:** AI cares about recency

**Link author and publisher:** These can be full objects or just references

**Add an image:** Helps with social sharing and rich results

If your site has multiple authors, you can use an array:

```json
"author": [
  {
    "@type": "Person",
    "name": "Tom Harris"
  },
  {
    "@type": "Person",
    "name": "Jane Smith"
  }
]
```

## Pattern: Product markup

Product pages need the most detailed metadata because AI often makes purchasing recommendations:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Professional Standing Desk",
  "image": [
    "https://example.com/desk-1.jpg",
    "https://example.com/desk-2.jpg",
    "https://example.com/desk-3.jpg"
  ],
  "description": "Electric height-adjustable desk with memory presets, cable management, and whisper-quiet motor.",
  "sku": "SD-PRO-100",
  "mpn": "SD-PRO-100",
  "brand": {
    "@type": "Brand",
    "name": "OfficeElite"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/products/standing-desk",
    "priceCurrency": "GBP",
    "price": "599.00",
    "priceValidUntil": "2024-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "Organization",
      "name": "Digital Domain Technologies"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
}
</script>
```

The `offers` section is critical. Notice:

**price as a string:** "599.00" not 599  
**priceCurrency:** ISO 4217 code (GBP, USD, EUR)  
**availability:** Use Schema.org URLs (InStock, OutOfStock, PreOrder, etc.)  
**priceValidUntil:** When does this price expire?

If you have multiple offers (different sizes, colours, configurations), use an array:

```json
"offers": [
  {
    "@type": "Offer",
    "name": "120cm width",
    "price": "599.00",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock"
  },
  {
    "@type": "Offer",
    "name": "140cm width",
    "price": "699.00",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock"
  }
]
```

## Pattern: FAQ markup

FAQ pages are perfect for AI because they're already in question-and-answer format:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does delivery take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard delivery takes 3-5 business days. Express delivery (next business day) is available for orders placed before 2pm."
      }
    },
    {
      "@type": "Question",
      "name": "What payment methods do you accept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfer for business accounts."
      }
    },
    {
      "@type": "Question",
      "name": "Can I return items?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer a 30-day return policy. Items must be unused and in original packaging. Contact our support team to arrange a return."
      }
    }
  ]
}
</script>
```

This enables:

- Direct answers when AI is queried
- Rich results in search showing expandable FAQs
- Clear question-answer pairing

Keep answers complete and self-contained. Don't say "See our returns policy" when you can state the policy directly.

## Pattern: HowTo markup

Step-by-step guides benefit from explicit structure:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Install Edge Delivery Services CLI",
  "description": "Step-by-step guide to installing and configuring the Adobe Edge Delivery Services command-line tools.",
  "totalTime": "PT10M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "GBP",
    "value": "0"
  },
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Node.js 16 or higher"
    },
    {
      "@type": "HowToTool",
      "name": "npm or yarn package manager"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Check Node.js version",
      "text": "Verify you have Node.js 16 or higher installed by running: node --version",
      "url": "https://example.com/guide#step1"
    },
    {
      "@type": "HowToStep",
      "name": "Install the CLI",
      "text": "Install the Adobe AEM CLI globally using: npm install -g @adobe/aem-cli",
      "url": "https://example.com/guide#step2"
    },
    {
      "@type": "HowToStep",
      "name": "Verify installation",
      "text": "Confirm successful installation by running: aem --version",
      "url": "https://example.com/guide#step3"
    }
  ]
}
</script>
```

The `totalTime` uses ISO 8601 duration format:

- PT10M = 10 minutes
- PT1H30M = 1 hour 30 minutes
- P2D = 2 days

This helps AI answer: "How long does it take to install the EDS CLI?" → "10 minutes"

## When NOT to use metadata

Metadata isn't always worthwhile. Skip it when:

**1. The content is already unambiguous**

If your heading hierarchy is clear and your semantic HTML is solid, adding metadata might be redundant:

```html
<!-- This doesn't need Schema.org -->
<article>
  <h1>Our Services</h1>
  <section>
    <h2>Web Development</h2>
    <p>We build fast, accessible websites...</p>
  </section>
</article>
```

The structure speaks for itself. Adding WebPage schema here adds no value.

**2. You can't maintain it**

Stale metadata is worse than no metadata. If your prices change frequently and you can't keep Schema.org in sync, skip it. Wrong information is worse than no explicit information.

**3. The content type doesn't matter for AI**

Not everything needs to be machine-readable. Your privacy policy? Probably fine without structured data. Your terms of service? Unlikely anyone's asking AI about it.

**4. You're adding metadata for metadata's sake**

I've seen sites with Person schema for every mentioned name, Place schema for every location reference, Thing schema for... well, things. This is overkill. Focus on content that answers user queries.

## The metadata generation problem

Here's a practical challenge: how do you actually add this metadata to your pages?

**Option 1: Manual JSON-LD**

Write it by hand, paste it in. Fine for static sites with few pages. Doesn't scale.

**Option 2: Template-based generation**

Your CMS or site generator creates JSON-LD from page fields:

```javascript
// Pseudo-code for a blog post template
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": page.title,
  "description": page.excerpt,
  "datePublished": page.publishDate.toISOString(),
  "dateModified": page.modifiedDate.toISOString(),
  "author": {
    "@type": "Person",
    "name": page.author.name
  }
};
```

This works well if your CMS has structured fields for metadata.

**Option 3: Build-time generation**

For static sites, generate JSON-LD during build:

```javascript
// Example using a simple builder
function generateArticleSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "datePublished": article.date,
    "author": {
      "@type": "Person",
      "name": article.author
    }
  };
}

// In your build script
const schema = generateArticleSchema(pageData);
const scriptTag = `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
```

**Option 4: Dynamic generation**

For sites with user-generated content or frequent updates, generate JSON-LD server-side on each request:

```javascript
// Express.js example
app.get('/products/:id', async (req, res) => {
  const product = await getProduct(req.params.id);
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "offers": {
      "@type": "Offer",
      "price": product.price.toString(),
      "priceCurrency": "GBP",
      "availability": product.inStock 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock"
    }
  };
  
  res.render('product', { product, schema });
});
```

Choose based on your site architecture and update frequency.

## Validation and testing

Don't trust your Schema.org markup without validation. Use these tools:

**Google's Rich Results Test:**  
<https://search.google.com/test/rich-results>

Paste your URL or HTML and see if Google can parse your structured data. Shows warnings and errors.

**Schema.org Validator:**  
<https://validator.schema.org/>

More lenient than Google's tool. Good for checking if your JSON-LD is valid Schema.org, even if it won't trigger rich results.

**Your own AI test:**

The simplest check:

1. Copy your page HTML (including the JSON-LD script)
2. Paste into ChatGPT or Claude
3. Ask specific questions: "What's the price?" "Who's the author?" "When was this published?"

If the AI can extract the information correctly, your metadata works.

## Common mistakes

**Mistake 1: Invalid JSON**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Standing Desk",
  "price": "599"  // Missing comma
  "currency": "GBP"
}
```

JSON is strict. Missing commas, trailing commas, unescaped quotes all break parsing. Use a JSON validator or let your code editor highlight errors.

**Mistake 2: Wrong data types**

```json
{
  "price": 599,  // Should be string "599" or "599.00"
  "ratingValue": "4.8 stars",  // Should be number 4.8
  "reviewCount": "127"  // Should be number 127 or string "127"
}
```

Check Schema.org documentation for expected types. Price is text, ratings are numbers, dates are ISO strings.

**Mistake 3: Incomplete required properties**

For Product schema, you need:

- name
- image  
- offers (with price, priceCurrency, availability)

Missing any of these and Google won't show rich results. The validator will tell you what's required.

**Mistake 4: Mismatched content**

```html
<h1>Professional Standing Desk</h1>
<script type="application/ld+json">
{
  "@type": "Product",
  "name": "Adjustable Desk Pro"  // Doesn't match visible name
}
</script>
```

Your metadata should match your visible content. Google may ignore structured data that contradicts what's on the page.

**Mistake 5: Over-nesting**

```json
{
  "@type": "Product",
  "name": "Desk",
  "offers": {
    "@type": "Offer",
    "price": "599",
    "seller": {
      "@type": "Organization",
      "name": "Company",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main St",
        "addressLocality": "Manchester",
        "postalCode": "M1 7ED",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 53.4808,
          "longitude": -2.2426
        }
      }
    }
  }
}
```

This works but is unnecessarily complex for a product page. Keep it as simple as possible while including necessary information.

## Progressive implementation

You don't need to add metadata to every page tomorrow. Start with high-value pages:

**Week 1: Organization schema**  
Add to your homepage. One page, big impact.

**Week 2: Article schema**  
Add to your most-trafficked blog posts or articles.

**Week 3: Product schema**  
If you sell products, add to top-selling items.

**Week 4: FAQ schema**  
Add to your FAQ or support pages.

Then expand gradually. Track which pages get mentioned by AI, and prioritize adding metadata to those.

## The payoff

A client in the automotive sector added proper Schema.org markup to 20 high-traffic pages—product pages, service locations, FAQ section. Within three months:

- AI recommendations increased by 40% (tracked via referral sources)
- Google rich results appeared for 15 of the 20 pages
- Voice search traffic doubled (Alexa, Google Assistant queries)
- Support queries decreased as AI could answer common questions

The implementation took about a week of developer time. The ROI was clear.

## What's next

We've covered content structure (Chapter 4) and metadata (Chapter 5). Together, these give AI the information it needs. But there's still the question of navigation—how AI discovers content and understands site organization.

Next chapter tackles navigation patterns, sitemaps, internal linking, and the overall information architecture that helps AI understand the relationship between your pages.

---

**Coming up in Chapter 6:** The navigation problem—helping AI discover and understand your site structure.
