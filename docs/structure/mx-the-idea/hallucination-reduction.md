---
title: "Hallucination Reduction"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "How MX compliance eliminates AI hallucination by replacing inference with explicit, verifiable data."
keywords: [hallucination, ai-accuracy, structured-data, schema-org, verification, trust]
mx-content-type: "concept-document"
mx-state: "published"
ai-instruction: |
  This document explains why AI hallucination occurs and how structured
  data prevents it. The key insight: hallucination is a data problem,
  not purely an AI problem. When content is ambiguous, inference is
  required, and inference produces errors.
---

# Hallucination Reduction

**Why AI invents facts, and how explicit data prevents it.**

---

## The Hallucination Problem

AI hallucination occurs when a language model generates information that sounds plausible but is factually incorrect. Examples:

- Inventing business hours that don't exist
- Fabricating product features not mentioned
- Creating relationships between entities that aren't related
- Stating prices, dates, or quantities inaccurately
- Attributing statements to people who never made them

Hallucination isn't random malfunction. It's the predictable result of a system designed to produce coherent output from incomplete input.

---

## Why AI Hallucinates

Language models work by predicting the most likely next token given context. When the context is ambiguous, the model must infer - and inference can be wrong.

**The inference chain:**

```
Ambiguous content
      ↓
AI attempts to parse
      ↓
Multiple interpretations possible
      ↓
Model selects most probable
      ↓
Selection may be incorrect
      ↓
Hallucination
```

Every ambiguity is an opportunity for error. Every inference is a gamble.

---

## The Data Problem

Consider this typical website content:

```html
<div class="product">
  <h2>Premium Widget</h2>
  <p class="price">£99</p>
  <p>Our best-selling widget, now with improved features!</p>
  <button>Add to Cart</button>
</div>
```

An AI agent parsing this must infer:

| Question | Inference Required |
|----------|-------------------|
| Is £99 the price? | Probably (class name suggests it) |
| Is it in stock? | Unknown (button exists, so maybe?) |
| What are the "improved features"? | Unknown (must guess or omit) |
| Is this a product or a category? | Probably product (has price) |
| What's the currency? | Probably GBP (£ symbol) |

Five questions, five inferences. Each inference can fail.

---

## The Structured Data Solution

Now consider MX-compliant content:

```html
<div class="product" itemscope itemtype="https://schema.org/Product">
  <h2 itemprop="name">Premium Widget</h2>
  <p itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <span itemprop="priceCurrency" content="GBP">£</span>
    <span itemprop="price" content="99">99</span>
    <link itemprop="availability" href="https://schema.org/InStock">
  </p>
  <p itemprop="description">Our best-selling widget, now with improved features!</p>
  <button data-action="add-to-cart" data-product-id="widget-001">Add to Cart</button>
</div>
```

Plus JSON-LD in the head:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Premium Widget",
  "description": "Our best-selling widget, now with improved features!",
  "offers": {
    "@type": "Offer",
    "price": "99",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock"
  },
  "sku": "widget-001"
}
```

Now the AI has explicit answers:

| Question | Explicit Answer |
|----------|----------------|
| Is £99 the price? | Yes (`"price": "99"`) |
| Is it in stock? | Yes (`"availability": "InStock"`) |
| What are the features? | Description provided (limited, but honest) |
| Is this a product? | Yes (`"@type": "Product"`) |
| What's the currency? | GBP (`"priceCurrency": "GBP"`) |

**Zero inference required. Zero hallucination opportunity.**

---

## The Mechanism

Structured data prevents hallucination through three mechanisms:

### 1. Explicit Typing

Schema.org types tell AI exactly what something is:

```json
{"@type": "Product"}     // Not a category, not a review
{"@type": "Event"}       // Not an article about events
{"@type": "Person"}      // Not a fictional character
{"@type": "Organization"}// Not a product brand
```

No inference about entity type required.

### 2. Explicit Relationships

Schema.org properties define relationships:

```json
{
  "@type": "Product",
  "manufacturer": {"@type": "Organization", "name": "Acme Corp"},
  "offers": {"@type": "Offer", "seller": {"@type": "Organization"}}
}
```

The AI knows who makes it, who sells it, how they relate.

### 3. Explicit Values

Structured data provides unambiguous values:

```json
{
  "price": "99.00",           // Not "from £99" or "around £100"
  "priceCurrency": "GBP",     // Not inferred from symbol
  "validFrom": "2026-01-01",  // Not "available soon"
  "validThrough": "2026-12-31"// Not "limited time"
}
```

No interpretation of vague language required.

---

## Real-World Impact

### Scenario 1: Business Information

**Without MX:**
User: "What are the opening hours for Smith's Bakery?"
AI: "Smith's Bakery is typically open 8am-6pm Monday to Saturday." *(hallucinated)*

**With MX:**
User: "What are the opening hours for Smith's Bakery?"
AI: "According to their website, Smith's Bakery is open 7am-5pm Tuesday to Sunday, closed Mondays." *(from Schema.org LocalBusiness)*

### Scenario 2: Event Details

**Without MX:**
User: "When is the TechConf 2026 conference?"
AI: "TechConf 2026 is scheduled for March 2026 in London." *(partially hallucinated)*

**With MX:**
User: "When is the TechConf 2026 conference?"
AI: "TechConf 2026 runs March 15-17, 2026 at the ExCel Centre, London. Early bird tickets are £299 until February 1st." *(from Schema.org Event)*

### Scenario 3: Product Comparison

**Without MX:**
User: "Compare the Premium Widget and Standard Widget."
AI: "The Premium Widget costs more and has additional features." *(vague, potentially wrong)*

**With MX:**
User: "Compare the Premium Widget and Standard Widget."
AI: "The Premium Widget (£99) includes wireless connectivity and extended warranty. The Standard Widget (£59) has the base feature set. Both are currently in stock." *(from Schema.org Product with explicit properties)*

---

## The Trust Equation

Hallucination erodes trust in three directions:

1. **User → AI:** Users lose confidence in AI recommendations
2. **User → Business:** Incorrect information damages brand credibility
3. **AI → Web:** AI systems deprioritise unreliable sources

MX compliance reverses this:

1. **User → AI:** Accurate responses build confidence
2. **User → Business:** Correct representation builds credibility
3. **AI → Web:** Reliable sources are prioritised

**Structured data is the foundation of trustworthy AI.**

---

## Verification Pathways

MX compliance enables verification that unstructured content cannot:

### Machine Verification

```json
{
  "@type": "Product",
  "offers": {
    "@type": "Offer",
    "price": "99",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock"
  }
}
```

An AI can verify:
- Price is stated explicitly (not inferred)
- Currency is specified (not assumed)
- Availability uses standard vocabulary (not interpreted)

### Cross-Reference Verification

Structured data enables cross-referencing:

```json
{
  "@type": "Organization",
  "name": "Acme Corp",
  "sameAs": [
    "https://www.linkedin.com/company/acme-corp",
    "https://twitter.com/acmecorp"
  ]
}
```

AI can verify entity identity across platforms.

### Temporal Verification

```json
{
  "@type": "Offer",
  "validFrom": "2026-01-01",
  "validThrough": "2026-03-31"
}
```

AI knows whether information is current or expired.

---

## Implementation Priorities

To maximise hallucination reduction, prioritise:

### High Impact

1. **Business identity:** Organization, LocalBusiness with complete details
2. **Products/Services:** Product, Service with prices, availability
3. **Events:** Event with dates, location, pricing
4. **Contact information:** ContactPoint with explicit channels

### Medium Impact

5. **Content classification:** Article, BlogPosting, FAQPage
6. **People:** Person for team members, authors, speakers
7. **Locations:** Place with address and geo coordinates
8. **Reviews:** Review, AggregateRating with explicit scores

### Supporting Structure

9. **Breadcrumbs:** BreadcrumbList for navigation context
10. **FAQ:** FAQPage for common questions
11. **How-to:** HowTo for process documentation
12. **Actions:** Potential actions for interactive elements

---

## Measuring Success

Track hallucination reduction through:

1. **AI testing:** Query AI assistants about your content, verify accuracy
2. **Structured data validation:** Google Rich Results Test, Schema.org validator
3. **Coverage metrics:** Percentage of content with Schema.org markup
4. **Support tickets:** Reduction in "AI told me X" complaints

---

## The Bottom Line

**Hallucination is not an inevitable AI limitation. It's the predictable result of forcing AI to infer from ambiguous data.**

When you provide explicit, structured content:

- AI doesn't need to guess
- Guessing doesn't produce errors
- Errors don't become hallucinations
- Users get accurate information
- Trust in both AI and your content increases

**MX compliance doesn't just make you visible to AI. It makes you accurately represented by AI.**

That's the difference between being found and being understood.
