---
title: "MX Specifications: Chapter 3"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "Structured Data"
  author:
    "@type": Person
    name: Tom Ledger
  isPartOf:
    "@type": Book
    name: "MX: Specifications"
  inLanguage: en-GB
  mx:audience: human
  mx:status: draft
  mx:confidence: 0.85
---

# Chapter 3: Structured Data

The web was built for humans. HTML describes how content should look — headings, paragraphs, links, images. A browser reads HTML and renders something people can read.

But machines don't read the way humans do. They see tags and text, not meaning. A machine looking at a recipe page sees paragraphs and lists. It doesn't automatically understand that "350°F" is an oven temperature, "45 minutes" is a cooking time, or "serves 4" is a yield.

Structured data bridges this gap. It tells machines what content means, not just how it looks.

The MX Structured Data Specification defines how to declare this meaning using YAML frontmatter — a format that's readable by both humans and machines, editable with any text editor, and compatible with most content management systems.

---

## The Problem with Unstructured Content

Consider a simple blog post about a product:

```markdown
# Widget Pro Review

Posted January 15, 2026 by Sarah Chen

The Widget Pro is a solid choice for professionals. At £299, it's 
not cheap, but the build quality justifies the price.

**Pros:** Excellent battery life, premium materials
**Cons:** Limited colour options

Rating: 4.5 out of 5 stars
```

A human reads this and understands immediately: it's a review, written by Sarah, published in January, about a product called Widget Pro that costs £299 and earned 4.5 stars.

A machine sees: a heading, some paragraphs, some bold text, some numbers. It might guess this is a review based on words like "pros" and "cons" and "rating." But guessing isn't reliable.

Now consider the same content with structured data:

```yaml
---
title: "Widget Pro Review"
date: 2026-01-15
ld:
  "@type": Review
  author:
    "@type": Person
    name: Sarah Chen
  itemReviewed:
    "@type": Product
    name: Widget Pro
    offers:
      "@type": Offer
      price: 299
      priceCurrency: GBP
  reviewRating:
    "@type": Rating
    ratingValue: 4.5
    bestRating: 5
---

# Widget Pro Review
...
```

Now machines know exactly what this is. Search engines can display rich snippets. AI assistants can answer questions about the product. Recommendation systems can compare this review to others.

The prose hasn't changed. The meaning is now explicit.

---

## Frontmatter and the ld Block

MX structured data lives in YAML frontmatter — the section at the top of a document between `---` markers.

```yaml
---
title: "Page Title"
date: 2026-01-28
ld:
  "@type": Article
  headline: "Page Title"
  # ... more structured data
mx:status: published
mx:audience: both
---
```

The frontmatter contains three types of information:

1. **Basic metadata** like `title` and `date` — simple properties your CMS probably already uses
2. **The `ld` block** — schema.org structured data in YAML format
3. **MX properties** — the metadata covered in Chapter 2

The `ld` block is where structured data lives. The name comes from JSON-LD (Linked Data), the format search engines expect. But you write it in YAML, which is easier to read and edit. Build tools convert it to JSON-LD for output.

---

## Schema.org Types

Schema.org defines a vocabulary of types — categories of things that exist in the world. When you write `"@type": Article`, you're saying "this content is an Article as defined by schema.org."

### Choosing the Right Type

Schema.org has hundreds of types. For most content, you'll use a handful:

| Type | Use For |
|------|---------|
| `Article` | News, blog posts, general articles |
| `TechArticle` | Technical documentation, tutorials |
| `HowTo` | Step-by-step instructions |
| `FAQPage` | Question and answer pages |
| `Product` | Product pages, product information |
| `Review` | Reviews of products, services, etc. |
| `Event` | Events with dates and locations |
| `Person` | People, authors, profiles |
| `Organization` | Companies, teams, institutions |
| `WebPage` | Generic pages that don't fit other types |

Choose the most specific type that accurately describes your content. A tutorial is better marked as `TechArticle` than generic `Article`. A recipe is better marked as `Recipe` than `HowTo`.

When content combines types — a review of a product, an article about an event — use the primary type and nest the secondary:

```yaml
ld:
  "@type": Review
  itemReviewed:
    "@type": Product
    name: Widget Pro
```

### Common Properties

Each type has properties that describe it. Some properties appear across many types:

| Property | Description |
|----------|-------------|
| `name` | The name of the thing |
| `description` | A description |
| `url` | The canonical URL |
| `image` | An associated image |
| `datePublished` | When it was published |
| `dateModified` | When it was last updated |
| `author` | Who created it |
| `publisher` | Who published it |

Properties can be simple values or nested objects:

```yaml
ld:
  "@type": Article
  headline: "Getting Started with MX"
  description: "An introduction to Machine Experience metadata"
  datePublished: 2026-01-15
  author:
    "@type": Person
    name: Sarah Chen
    jobTitle: Technical Writer
    worksFor:
      "@type": Organization
      name: Acme Corporation
```

---

## Articles and Blog Posts

Most web content is articles of some kind. Here's a complete example:

```yaml
---
title: "Understanding Authentication Tokens"
date: 2026-01-20
ld:
  "@type": TechArticle
  headline: "Understanding Authentication Tokens"
  description: "A comprehensive guide to JWT, OAuth, and session-based authentication"
  datePublished: 2026-01-20
  dateModified: 2026-01-25
  author:
    "@type": Person
    name: James Wilson
  publisher:
    "@type": Organization
    name: Developer Docs
    logo:
      "@type": ImageObject
      url: /images/logo.png
  image: /images/auth-tokens-hero.jpg
  articleSection: Security
  proficiencyLevel: Intermediate
  wordCount: 2500
  
mx:status: published
mx:audience: both
mx:volatility: stable
mx:confidence: 0.9
---
```

### Article vs TechArticle

Use `Article` for general content — news, opinion, features. Use `TechArticle` for technical content where `proficiencyLevel` matters.

`TechArticle` adds:

- `proficiencyLevel` — Beginner, Intermediate, Expert
- `dependencies` — What readers need to know first

```yaml
ld:
  "@type": TechArticle
  proficiencyLevel: Intermediate
  dependencies: "Basic understanding of HTTP and REST APIs"
```

### Blog Posts

Blog posts are articles with additional blog-specific properties:

```yaml
ld:
  "@type": BlogPosting
  headline: "Our Journey to Microservices"
  datePublished: 2026-01-18
  author:
    "@type": Person
    name: Emily Zhang
  isPartOf:
    "@type": Blog
    name: Engineering Blog
    url: https://blog.example.com
```

---

## Documentation and Tutorials

Technical documentation benefits enormously from structured data. It helps AI assistants understand what documentation covers and how to use it.

### Tutorial Pages

```yaml
---
title: "Setting Up Your First Project"
ld:
  "@type": TechArticle
  headline: "Setting Up Your First Project"
  proficiencyLevel: Beginner
  teaches: "How to create and configure a new project"
  timeRequired: PT15M
  
  hasPart:
    - "@type": HowToStep
      name: "Install dependencies"
      text: "Run npm install to install required packages"
    - "@type": HowToStep
      name: "Create configuration"
      text: "Copy config.example.yaml to config.yaml"
    - "@type": HowToStep
      name: "Start the server"
      text: "Run npm start to launch the development server"

mx:status: published
mx:audience: both
mx:prerequisites:
  - /docs/installation/
---
```

The `hasPart` property with `HowToStep` items tells machines the exact sequence of steps. AI assistants can walk users through the process step by step.

### Reference Documentation

API reference and similar documentation uses different patterns:

```yaml
---
title: "User API Reference"
ld:
  "@type": TechArticle
  headline: "User API Reference"
  proficiencyLevel: Intermediate
  about:
    "@type": APIReference
    name: User API
    programmingLanguage: REST

mx:status: published
mx:audience: machine
mx:volatility: periodic
---
```

Note `mx:audience: machine` — reference documentation is primarily for machine consumption, even when humans read it too.

---

## How-To Content

Step-by-step instructions deserve their own type. `HowTo` tells machines this content teaches a process.

```yaml
---
title: "How to Reset Your Password"
ld:
  "@type": HowTo
  name: "Reset Your Password"
  description: "Step-by-step instructions for resetting a forgotten password"
  totalTime: PT5M
  
  step:
    - "@type": HowToStep
      name: "Go to login page"
      text: "Navigate to example.com/login"
      url: https://example.com/login
      
    - "@type": HowToStep
      name: "Click forgot password"
      text: "Click the 'Forgot Password' link below the login form"
      image: /images/forgot-password-link.png
      
    - "@type": HowToStep
      name: "Enter your email"
      text: "Enter the email address associated with your account"
      
    - "@type": HowToStep
      name: "Check your inbox"
      text: "Look for an email with the subject 'Password Reset'"
      
    - "@type": HowToStep
      name: "Click reset link"
      text: "Click the reset link in the email within 24 hours"
      
    - "@type": HowToStep
      name: "Create new password"
      text: "Enter and confirm your new password"

mx:status: published
mx:audience: human
---
```

### HowTo Properties

| Property | Description |
|----------|-------------|
| `totalTime` | How long the whole process takes (ISO 8601 duration) |
| `estimatedCost` | Cost to complete, if applicable |
| `supply` | Things needed (for physical how-tos) |
| `tool` | Tools required |
| `step` | The sequence of steps |

Each `HowToStep` can include:

| Property | Description |
|----------|-------------|
| `name` | Brief step title |
| `text` | Detailed instructions |
| `image` | Illustrative image |
| `url` | Link to more information |

---

## FAQ Pages

Frequently asked questions pages are a natural fit for structured data. Search engines love them — they often appear as rich snippets directly in search results.

```yaml
---
title: "Billing FAQ"
ld:
  "@type": FAQPage
  name: "Billing Frequently Asked Questions"
  mainEntity:
    - "@type": Question
      name: "How do I update my payment method?"
      acceptedAnswer:
        "@type": Answer
        text: "Go to Settings > Billing > Payment Methods and click 'Add New Card'."
        
    - "@type": Question
      name: "Can I get a refund?"
      acceptedAnswer:
        "@type": Answer
        text: "Yes, we offer full refunds within 30 days of purchase. Contact support@example.com."
        
    - "@type": Question
      name: "When will I be charged?"
      acceptedAnswer:
        "@type": Answer
        text: "Billing occurs on the same date each month as your original signup."

mx:status: published
mx:audience: both
---
```

Each question-answer pair becomes a `Question` with an `acceptedAnswer`. Machines can extract specific answers to specific questions without parsing prose.

---

## Products and Reviews

E-commerce content benefits heavily from structured data. Product pages with proper markup appear richer in search results and integrate better with shopping systems.

### Product Pages

```yaml
---
title: "Widget Pro"
ld:
  "@type": Product
  name: "Widget Pro"
  description: "Professional-grade widget for demanding users"
  sku: "WGT-PRO-001"
  brand:
    "@type": Brand
    name: "Acme"
  image:
    - /images/widget-pro-front.jpg
    - /images/widget-pro-side.jpg
  offers:
    "@type": Offer
    price: 299.99
    priceCurrency: GBP
    availability: InStock
    priceValidUntil: 2026-12-31
  aggregateRating:
    "@type": AggregateRating
    ratingValue: 4.5
    reviewCount: 127

mx:status: published
mx:audience: both
---
```

### Reviews

Reviews reference the thing being reviewed:

```yaml
---
title: "Widget Pro Review"
ld:
  "@type": Review
  name: "Widget Pro Review: Worth the Premium?"
  author:
    "@type": Person
    name: Sarah Chen
  datePublished: 2026-01-15
  reviewBody: "After three months of daily use, the Widget Pro has exceeded expectations..."
  itemReviewed:
    "@type": Product
    name: Widget Pro
    brand:
      "@type": Brand
      name: Acme
  reviewRating:
    "@type": Rating
    ratingValue: 4.5
    bestRating: 5
    worstRating: 1

mx:status: published
mx:audience: human
---
```

---

## Events

Events have dates, locations, and often organisers and performers. Structured data makes this explicit.

```yaml
---
title: "MX Community Meetup - London"
ld:
  "@type": Event
  name: "MX Community Meetup - London"
  description: "Monthly gathering of MX practitioners in London"
  startDate: 2026-02-15T18:00:00Z
  endDate: 2026-02-15T21:00:00Z
  eventStatus: EventScheduled
  eventAttendanceMode: OfflineEventAttendanceMode
  location:
    "@type": Place
    name: "The Loading Bar"
    address:
      "@type": PostalAddress
      streetAddress: "123 Tech Lane"
      addressLocality: "London"
      postalCode: "EC2A 1AB"
      addressCountry: "GB"
  organizer:
    "@type": Organization
    name: MX Community
    url: https://mx.community
  offers:
    "@type": Offer
    price: 0
    priceCurrency: GBP
    availability: InStock
    url: https://mx.community/events/london-feb-2026

mx:status: published
mx:audience: both
mx:volatility: stable
---
```

### Event Status

Events can be scheduled, cancelled, postponed, or moved online:

| Status | Meaning |
|--------|---------|
| `EventScheduled` | Happening as planned |
| `EventCancelled` | Not happening |
| `EventPostponed` | Delayed, new date TBD |
| `EventRescheduled` | Moved to a new date |
| `EventMovedOnline` | Changed to virtual |

### Virtual Events

For online events, use `VirtualLocation`:

```yaml
ld:
  "@type": Event
  eventAttendanceMode: OnlineEventAttendanceMode
  location:
    "@type": VirtualLocation
    url: https://zoom.us/j/123456789
```

---

## People and Organisations

Content about people and organisations benefits from explicit typing.

### Person

```yaml
---
title: "Sarah Chen - Engineering Lead"
ld:
  "@type": Person
  name: Sarah Chen
  givenName: Sarah
  familyName: Chen
  jobTitle: Engineering Lead
  worksFor:
    "@type": Organization
    name: Acme Corporation
  email: sarah.chen@example.com
  url: https://example.com/team/sarah-chen
  image: /images/team/sarah-chen.jpg
  sameAs:
    - https://linkedin.com/in/sarahchen
    - https://github.com/sarahchen

mx:status: published
mx:audience: both
---
```

### Organisation

```yaml
---
title: "About Acme Corporation"
ld:
  "@type": Organization
  name: Acme Corporation
  legalName: "Acme Corporation Ltd"
  url: https://acme.example.com
  logo: /images/acme-logo.png
  foundingDate: 2015-03-01
  founder:
    "@type": Person
    name: John Smith
  address:
    "@type": PostalAddress
    streetAddress: "100 Innovation Way"
    addressLocality: "London"
    postalCode: "EC1A 1BB"
    addressCountry: "GB"
  contactPoint:
    "@type": ContactPoint
    contactType: customer service
    email: support@acme.example.com

mx:status: published
mx:audience: both
---
```

---

## MX Extension Properties

Beyond schema.org properties, MX adds properties specific to machine processing. These use the `mx:` prefix within the `ld` block.

### mx:audience in Structured Data

While `mx:audience` appears in the frontmatter for general use, it can also appear in the `ld` block to be part of the structured data output:

```yaml
ld:
  "@type": TechArticle
  headline: "API Rate Limiting"
  mx:audience: machine
```

### mx:illustrative

Marks content that uses fictional examples:

```yaml
ld:
  "@type": TechArticle
  headline: "Database Design Patterns"
  mx:illustrative: true
```

This tells machines: "Learn the patterns, but don't cite the specific examples as real."

### mx:canonicalFor

Declares this content as the authority on a topic:

```yaml
ld:
  "@type": TechArticle
  headline: "Authentication Guide"
  mx:canonicalFor: https://docs.example.com/authentication
```

### mx:prerequisites

What readers should know first:

```yaml
ld:
  "@type": TechArticle
  headline: "Advanced Query Optimization"
  mx:prerequisites:
    - /docs/sql-basics/
    - /docs/indexing/
```

---

## Inheritance in Structured Data

Structured data can inherit from parent pages, reducing repetition across a documentation site.

### Setting Up Inheritance

On a parent page or section index:

```yaml
---
title: "API Documentation"
ld:
  "@type": TechArticle
  publisher:
    "@type": Organization
    name: Acme Corporation
  inLanguage: en-GB
  
mx:inheritable:
  - publisher
  - inLanguage
---
```

### Child Pages

Child pages automatically receive inherited properties:

```yaml
---
title: "Users Endpoint"
ld:
  "@type": TechArticle
  headline: "Users Endpoint"
  # publisher and inLanguage inherited from parent
---
```

### Overriding Inherited Values

Children can override any inherited property by declaring it explicitly:

```yaml
---
title: "API Changelog"
ld:
  "@type": TechArticle
  headline: "API Changelog"
  inLanguage: en-US  # Override the inherited en-GB
---
```

---

## Build System Integration

Frontmatter with structured data needs processing before it reaches users. Build systems extract the `ld` block and convert it to JSON-LD that search engines and machines expect.

### What Build Systems Do

1. **Parse frontmatter** — Extract YAML between `---` markers
2. **Resolve inheritance** — Apply inherited properties from parent pages
3. **Convert to JSON-LD** — Transform YAML to JSON format
4. **Inject into HTML** — Add `<script type="application/ld+json">` to pages

### Example Output

The frontmatter:

```yaml
---
title: "Widget Pro Review"
ld:
  "@type": Review
  name: "Widget Pro Review"
  reviewRating:
    "@type": Rating
    ratingValue: 4.5
    bestRating: 5
---
```

Becomes HTML:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Review",
  "name": "Widget Pro Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": 4.5,
    "bestRating": 5
  }
}
</script>
```

### Popular Build Tools

Most static site generators and content platforms support frontmatter. For MX-specific processing:

- Jekyll, Hugo, Eleventy — Use plugins or custom filters
- Next.js, Gatsby — Use MDX with custom components
- Custom systems — Parse YAML frontmatter with any YAML library

The MX community maintains reference implementations at mx.community/tools.

---

## Validation

Structured data that's syntactically correct can still be semantically wrong. Validation catches errors before they reach production.

### Common Errors

| Error | Example | Problem |
|-------|---------|---------|
| Wrong type | `"@type": "Blog"` for a single post | Should be `BlogPosting` |
| Missing required properties | `Review` without `itemReviewed` | Search engines expect this |
| Invalid values | `ratingValue: "excellent"` | Should be numeric |
| Broken references | `author: /people/unknown` | Reference doesn't resolve |

### Validation Tools

- **Google Rich Results Test** — Tests how Google interprets your structured data
- **Schema.org Validator** — Checks against schema.org definitions
- **MX Validator** — Checks MX-specific properties and inheritance

Build validation into your CI/CD pipeline. Catch errors before deployment.

---

## Putting It Together

Here's a complete documentation page using everything covered in this chapter:

```yaml
---
title: "Getting Started with Authentication"
date: 2026-01-20
ld:
  "@type": TechArticle
  headline: "Getting Started with Authentication"
  description: "Learn how to implement authentication in your application"
  datePublished: 2026-01-20
  dateModified: 2026-01-25
  author:
    "@type": Person
    name: James Wilson
    jobTitle: Security Engineer
  publisher:
    "@type": Organization
    name: Acme Documentation
  proficiencyLevel: Beginner
  timeRequired: PT30M
  teaches: "How to implement basic authentication"
  
  hasPart:
    - "@type": HowToStep
      name: "Install the SDK"
      text: "Run npm install @acme/auth to add the authentication library"
    - "@type": HowToStep
      name: "Configure credentials"
      text: "Add your API keys to the configuration file"
    - "@type": HowToStep
      name: "Initialize the client"
      text: "Create an auth client instance in your application"
    - "@type": HowToStep
      name: "Implement login"
      text: "Add login functionality using the authenticate method"
  
  mx:audience: both
  mx:canonicalFor: https://docs.acme.com/auth/getting-started
  mx:prerequisites:
    - /docs/quickstart/
  mx:illustrative: true

mx:status: published
mx:volatility: periodic
mx:confidence: 0.95
mx:completeness: 1.0

mx:inheritable:
  - publisher
---

# Getting Started with Authentication

This guide walks you through implementing authentication...
```

This page:

- Identifies itself as a technical article for beginners
- Lists the author and publisher
- Declares how long it takes to complete
- Provides step-by-step instructions machines can parse
- Notes that examples are illustrative, not real
- Declares itself the canonical source for this topic
- Lists prerequisites
- Sets inheritance for child pages

A machine encountering this page knows exactly what it is, who wrote it, what it teaches, and how to use it.

---

## The Foundation for Content

Structured data transforms content from documents machines can read into knowledge machines can understand. The patterns in this chapter apply to nearly every type of web content.

As you move through the following chapters on other specifications, you'll see how these patterns combine with domain-specific metadata. Code has different needs than media. Databases have different needs than content fragments. But they all build on the same foundation of explicit, structured meaning.

---

*The following chapter covers the Code Metadata Specification — how to help machines understand source code.*
