---
title: "MX Project Research - Pre-Meeting Background"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Consolidated research document for pre-meeting preparation with prospective MX community members and collaborators."
keywords: [mx, research, project-overview, pre-meeting, background]
mx-content-type: "research-document"
mx-state: "published"
ai-instruction: |
  This document consolidates research about the MX project for use in
  pre-meeting preparation materials. It provides background that helps
  prospects understand the project before meeting with Tom.
---

# MX Project Research

**Background material for pre-meeting preparation.**

This document consolidates key information about the MX (Machine Experience) project for sharing with prospective collaborators, community members, and partners.

---

## What is MX?

**Machine Experience (MX)** is a set of patterns that make web content understandable to AI assistants.

For thirty years, the web was built for human eyes - styled text, images, layouts optimised for visual consumption. Now AI agents (Claude, ChatGPT, Perplexity, Copilot) are visiting websites, trying to understand content to answer user questions. Most websites are largely illegible to them.

**The result:**

- Businesses are invisible to AI-assisted discovery
- AI hallucinates (makes up facts) when it can't find clear data
- Users get unreliable information
- Everyone loses

**MX fixes this** through established open standards:

- Schema.org structured data (standardised vocabulary for content typing)
- Semantic HTML (meaningful structure)
- Explicit state attributes (clear indication of dynamic content)
- Machine-readable metadata (no guesswork required)

---

## The Three Pillars

MX delivers three interconnected benefits:

### 1. Hallucination Reduction

When AI encounters ambiguous content, it guesses. Guesses become hallucinations - fabricated business hours, invented product features, incorrect prices.

**MX solution:** Structured, verifiable metadata eliminates guesswork. When data is explicit, AI doesn't need to infer, and inference errors disappear.

**Example:**

- Without MX: AI says "Smith's Bakery is typically open 8am-6pm Monday to Saturday" (hallucinated)
- With MX: AI says "According to their website, Smith's Bakery is open 7am-5pm Tuesday to Sunday, closed Mondays" (from Schema.org LocalBusiness)

### 2. Knowledge Distribution

Most human knowledge is trapped - in PDFs that can't be searched, in images that can't be parsed, in prose that requires human interpretation, in languages that limit audience.

**MX solution:** Machine-parseable content enables global distribution through AI intermediaries. A farmer in Kenya can access agricultural research synthesised from worldwide sources, delivered in Swahili, without needing to find and read English academic papers.

### 3. Energy Efficiency

AI inference is computationally expensive. Every ambiguity requires processing cycles. At billions of queries daily, this becomes environmentally significant.

**MX solution:** Explicit data reduces inference requirements. Parsing structured data takes a fraction of the energy required to interpret ambiguous prose.

---

## The Convergence Principle

The same patterns that help AI agents also help humans with disabilities:

- Semantic HTML helps screen readers and AI parsers
- Clear heading structure aids navigation for both
- Explicit state indicators serve keyboard users and automated agents
- Colour contrast requirements improve readability for all

**Optimising for machine comprehension simultaneously improves accessibility.** MX isn't a trade-off between human and machine experience - it's a convergence that improves both.

---

## Why Now?

### The January 2026 Inflection Point

In January 2026, three major platforms launched AI agent commerce systems within seven days:

- **January 5:** Amazon Alexa+ (conversational commerce)
- **January 8:** Microsoft Copilot Checkout (proprietary ecosystem)
- **January 11:** Google UCP + Shopping Agent (open standard)

AI-mediated interaction is becoming infrastructure, not novelty. The web is being rewritten for machines. Content that AI can parse will be recommended, purchased, acted upon. Content that AI cannot parse will be invisible.

---

## What Exists

### Two Books (Publication-Ready)

1. **MX-Bible** - The comprehensive guide (~78,000 words, 13 chapters)
   - Full explanation of AI agents and web interaction
   - Technical patterns and implementation guidance
   - Business case and strategic context

2. **MX-Handbook** - The practical implementation guide (11 chapters)
   - Developer and designer focused
   - Step-by-step implementation
   - Code examples and patterns

### Supporting Materials

- **Shared Appendices** - 12 detailed reference documents (A-L)
- **Code Examples Repository** - Good vs bad pattern implementations
- **Web Audit Tool** - Analyses sites for MX compliance
- **Compliance Specifications** - For CMS, markdown, HTML, CSS, JavaScript

---

## The MX Community

A community of practitioners who:

- Understand MX principles
- Implement them in their work
- Help others understand the shift
- Contribute to the growing body of knowledge

**The goal:** Establish MX as the standard approach for AI-compatible web development before the market fragments into proprietary solutions.

---

## Open Standards Foundation

MX builds entirely on established, open standards:

| Standard | Purpose |
|----------|---------|
| **Schema.org** | Structured data vocabulary understood by all major platforms |
| **Semantic HTML** | Meaningful markup language |
| **ARIA** | Accessibility attributes that also serve machine comprehension |
| **WAI-WCAG** | Guidelines that align with machine readability requirements |

No proprietary formats. No platform lock-in. Open standards, universally applicable.

---

## Technical Overview

### Before MX

```html
<div class="business-info">
  <h2>Smith's Bakery</h2>
  <p>Open Monday to Saturday, 8am-6pm</p>
  <p>Call us: 020 7123 4567</p>
</div>
```

AI must infer: Is this a business? What type? Are those hours current? Is the phone number for orders or enquiries?

### After MX

```html
<div itemscope itemtype="https://schema.org/Bakery">
  <h2 itemprop="name">Smith's Bakery</h2>
  <div itemprop="openingHoursSpecification" itemscope
       itemtype="https://schema.org/OpeningHoursSpecification">
    <meta itemprop="dayOfWeek" content="Monday Tuesday Wednesday Thursday Friday Saturday">
    <meta itemprop="opens" content="08:00">
    <meta itemprop="closes" content="18:00">
    <p>Open Monday to Saturday, 8am-6pm</p>
  </div>
  <p itemprop="telephone">020 7123 4567</p>
</div>
```

AI knows exactly: This is a bakery, these are the hours, this is the phone number. No inference required.

**The human sees the same thing. The machine finally understands it.**

---

## Who This Is For

| Audience | Value Proposition |
|----------|-------------------|
| **Web Developers** | Build AI-agent-compatible interfaces using established patterns |
| **Designers** | Design for machine audiences alongside human audiences |
| **Business Leaders** | Ensure visibility in AI-assisted discovery and commerce |
| **CMS Vendors** | Differentiate platforms through AI-ready content delivery |
| **Agencies** | Offer new service category to clients |
| **Content Creators** | Ensure content reaches AI-mediated audiences |

---

## Author Background

**Tom Cranstoun** - "The MX Guy"

- 30+ years in web and CMS technologies
- Recognised expert in digital transformation
- Technical leadership at enterprise scale
- Author of MX framework and methodology

Contact:
- Email: tom.cranstoun@gmail.com
- Website: https://allabout.network
- LinkedIn: https://www.linkedin.com/in/tom-cranstoun/

---

## Key Messages

### For Technical Audiences

> "MX is the implementation framework for making web content AI-parseable. It's built on Schema.org, semantic HTML, and ARIA - open standards that work everywhere. No proprietary lock-in."

### For Business Audiences

> "When someone asks an AI assistant to recommend a product or service in your industry, will your business appear in that answer? MX compliance makes you visible to AI-assisted discovery."

### For CMS/Platform Audiences

> "Every CMS faces the AI discoverability challenge. MX provides vendor-neutral patterns that make content machine-readable. It's the kind of industry baseline the community should be discussing."

---

## The Opportunity

Websites that adopt MX compliance gain:

- **Visibility:** Appear in AI-assisted discovery and recommendations
- **Accuracy:** Be represented correctly, not hallucinated
- **Efficiency:** Serve AI agents without inference overhead
- **Future-proofing:** Ready for agent-mediated commerce and interaction

Websites that don't:

- Remain invisible to AI-assisted discovery
- Risk misrepresentation through hallucination
- Miss the shift to agent-mediated interaction

---

## Further Reading

For those who want to explore deeper:

- **MX Manifesto** - The full vision for web transformation
- **Hallucination Reduction** - The trust argument in detail
- **Knowledge Distribution** - The access argument
- **Energy Efficiency** - The sustainability argument

All available upon request or through the MX community.
