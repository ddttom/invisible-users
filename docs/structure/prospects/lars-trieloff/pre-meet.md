---
title: "Pre-Meeting Briefing - Lars Trieloff"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Pre-meeting document for Lars Trieloff providing background on MX and the technical opportunity for Edge Delivery Services integration."
keywords: [lars-trieloff, pre-meeting, adobe, edge-delivery-services, mx, structured-data]
mx-content-type: "pre-meeting-briefing"
mx-state: "published"
prospect:
  name: "Lars Trieloff"
  title: "Principal"
  company: "Adobe"
  relationship: "Professional friend"
ai-instruction: |
  This is a pre-meeting briefing document designed to be converted to PDF
  for sharing with Lars before a meeting. Focus is on the technical architecture
  opportunity: MX patterns integrated with Edge Delivery Services.
---

## Pre-Meeting Briefing

Prepared for Lars Trieloff

From Tom Cranstoun

Date: January 2026

---

## Purpose of This Document

This briefing outlines a technical opportunity I'd like to discuss: **integrating AI discoverability patterns with Edge Delivery Services.**

EDS solves performance. MX solves discoverability. There's an interesting architectural intersection.

---

## The Convergence

Edge Delivery Services optimises for **speed** - serverless functions, Fastly edge processing, performance-first architecture.

MX (Machine Experience) optimises for **AI discoverability** - structured data that AI agents can parse and understand.

**Combined:** Fast delivery AND AI-parseable content. The edge is actually the natural place to generate this structured data.

---

## Why AI Discoverability Matters

### The January 2026 Shift

Within seven days:

- Amazon launched Alexa+ (conversational commerce)
- Microsoft launched Copilot Checkout
- Google launched UCP + Shopping Agent

AI-mediated interaction is becoming infrastructure. Websites that AI can parse will be recommended and acted upon. Websites that AI can't parse will be invisible.

### The Current Gap

Most web content, including AEM-powered content, is:

- Optimised for visual consumption
- Missing structured metadata AI needs
- Invisible to AI-assisted discovery

When someone asks an AI "recommend a good enterprise CMS," does the AI recommend Adobe? It depends on whether it can parse the relevant content.

---

## The Technical Opportunity

### Edge as MX Layer

```text
Content authored in AEM
         ↓
Edge functions process content
         ↓
MX metadata generated/injected at edge
         ↓
Response includes Schema.org + semantic structure
         ↓
Fast delivery + AI parseable
```

**Why the edge is ideal:**

| Advantage | Benefit |
|-----------|---------|
| No origin overhead | MX generation doesn't impact AEM |
| Consistent application | Every response gets structured data |
| Cacheable | Structured data is highly cacheable |
| Configurable | Per-site or global toggle |

### Integration Points

### 1. Schema.org Generation

Edge functions detect content type and generate appropriate Schema.org:

```javascript
// Pseudocode
async function handleRequest(request, content) {
  const contentType = detectContentType(content);
  const schemaOrg = generateSchemaOrg(content, contentType);
  return injectStructuredData(content, schemaOrg);
}
```

Content type detection → Schema.org generation → injection. All at the edge.

### 2. Semantic HTML Transformation

EDS already transforms content. Adding semantic structure:

- Ensure `<main>`, `<article>`, `<section>` landmarks
- Validate heading hierarchy
- Add ARIA attributes where needed

### 3. MX Meta Tag Injection

```html
<meta name="mx-compliant" content="true">
<meta name="mx-version" content="1.0">
<meta name="mx-content-type" content="article">
```

### 4. State Exposure

For dynamic components:

```html
<div data-component="product-selector"
     data-state="ready"
     data-product-count="12"
     aria-live="polite">
```

---

## Content Type Mapping

Schema.org types map naturally to AEM content:

| AEM Content | Schema.org Type |
|-------------|-----------------|
| Page | WebPage |
| Article | Article |
| Product | Product |
| Event | Event |
| Person (author) | Person |
| Organisation | Organization |

The mapping is straightforward. The implementation question is where in the pipeline to apply it.

---

## Performance Considerations

**MX overhead is minimal:**

| Factor | Impact |
|--------|--------|
| Response size | +1-2KB for JSON-LD |
| Edge processing | Microseconds for generation |
| Caching | Highly cacheable |
| Core Web Vitals | Negligible impact |

The discoverability benefit significantly outweighs the performance cost.

---

## What MX Provides

I've developed:

**Framework:**

- MX patterns specification
- Implementation guidance for CMS platforms
- Audit methodology for AI readability

**Materials:**

- Two books (78,000+ words comprehensive guide, 11-chapter handbook)
- Code examples across platforms
- Working audit tool

**Open standards foundation:**

- Schema.org structured data
- Semantic HTML
- ARIA accessibility
- No proprietary components

---

## Questions Worth Exploring

### Architecture Questions

- Where in the EDS pipeline would Schema.org generation fit best?
- How does content type detection work with current EDS transforms?
- What's the caching strategy for structured data?
- How would per-site configuration work?

### Platform Questions

- Does this complement Adobe's AI strategy (Firefly, Sensei)?
- Is there appetite for AI discoverability as an EDS feature?
- How do customers currently handle structured data?

### Standards Questions

- Would Adobe contribute to MX specification development?
- Is there interest in industry-wide standards for AI-ready content?

---

## Competitive Context

**Current differentiation:** EDS leads on performance.

**Emerging differentiation:** AI discoverability.

If AEM sites are automatically MX-compliant through EDS, that's genuine competitive advantage:

> "Your content, delivered fast AND AI-discoverable."

Every DXP is chasing performance. AI discoverability is the next differentiator.

---

## What I'd Offer

### Technical Collaboration

- Architecture review of MX + EDS integration
- Prototype edge functions for Schema.org generation
- Content type mapping for AEM types
- Performance benchmarking methodology

### Documentation

- AEM-specific MX implementation guide
- Edge Delivery Services + MX patterns
- Migration path for existing AEM sites

### Visibility

- Case study if Adobe pilots MX in EDS
- Conference presentations (adaptTo(), Adobe Summit)
- Industry publication coverage

---

## The Conversation

When we meet, I'd like to:

1. Walk through the technical architecture in more detail
2. Hear your perspective on feasibility
3. Discuss what I might be missing from enterprise CMS standpoint
4. Explore whether this warrants deeper evaluation

Your experience with large-scale content systems will surface considerations I haven't thought of.

---

## About Me

**Tom Cranstoun** - "The MX Guy"

- 30+ years in web and CMS technologies
- Author of MX framework and methodology
- Technical leadership at enterprise scale

Contact:

- Email: <tom.cranstoun@gmail.com>
- Website: <https://allabout.network>
- LinkedIn: <https://www.linkedin.com/in/tom-cranstoun/>

---

## Looking Forward

EDS represents the future of content delivery. MX represents the future of content discoverability. The intersection is worth exploring.

I appreciate you taking time to consider this.
