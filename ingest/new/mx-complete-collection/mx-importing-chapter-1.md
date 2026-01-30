---
title: "MX Importing: Chapter 1"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "The Migration Opportunity"
  author:
    "@type": Person
    name: Tom Ledger
  isPartOf:
    "@type": Book
    name: "MX: Importing"
  inLanguage: en-GB
  mx:audience: human
  mx:status: draft
  mx:confidence: 0.85
---

# Chapter 1: The Migration Opportunity

Somewhere in your organisation, there's a content management system holding years of carefully crafted content. Product descriptions refined through dozens of iterations. Articles that still draw traffic. Images shot by professional photographers. Documentation that customers depend on.

That content has value. Significant value.

But the system holding it? That's a different story.

Legacy CMS platforms come with legacy costs. Licensing fees that climb every year. Specialist developers who command premium rates. Infrastructure that demands constant attention. Upgrade cycles that consume months of effort.

And increasingly, a fundamental problem: these systems weren't designed for how content is consumed today.

When that CMS was chosen, content went to websites. Perhaps email. Maybe a mobile app. The system's job was to manage pages and publish them to a web server.

Now content feeds AI assistants. It populates recommendation engines. It gets chunked into vector databases for semantic search. It trains models. It appears in places the original architects never imagined.

The old CMS doesn't understand this world. It has no concept of embeddings. No vocabulary for AI permissions. No way to declare how content should be chunked for retrieval. The metadata it captured — publication dates, authors, categories — tells machines almost nothing about how to use the content.

This book is about moving forward. It's about extracting content from legacy systems and transforming it into something machines can truly understand. It's about MX-native content that carries its meaning wherever it goes.

---

## The Case for Migration

Migration is disruptive. It costs money, consumes time, and carries risk. Why bother?

### The Licensing Arithmetic

Enterprise CMS platforms charge enterprise prices. Adobe Experience Manager, Sitecore, Episerver — they all follow similar models. Per-user licensing. Per-site fees. Support contracts. Implementation partner costs.

A mid-sized AEM deployment might cost:

- Licensing: £200,000-500,000 per year
- Infrastructure: £50,000-150,000 per year (or cloud equivalent)
- Support and maintenance: £100,000-200,000 per year
- Specialist developers: £600-1,200 per day

That's real money. Every year.

A file-based, MX-native system changes this arithmetic dramatically. No per-user licensing. Standard infrastructure. Developers who work with familiar technologies. The ongoing cost might be 10-20% of the legacy system.

But cost alone rarely justifies migration. The business case needs more.

### The AI Readiness Gap

Here's where legacy systems truly fall short.

Your marketing team wants to deploy an AI assistant that can answer product questions. The content exists — product descriptions, specifications, FAQs. But the AI can't use it effectively because:

- There's no indication of content confidence or accuracy
- No declaration of what's authoritative versus illustrative
- No chunking guidance for retrieval
- No AI permission metadata
- No quality signals to filter unreliable content

The AI hallucinates because it can't distinguish your official product specs from a blog post opinion. It cites outdated content because nothing indicates freshness. It exposes information you'd rather keep internal because there's no access level metadata.

MX-native content solves this. Every piece of content declares its status, confidence, audience, and AI permissions. RAG hints tell retrieval systems how to chunk and what queries the content answers. The AI gets context, not just text.

### The Multi-Channel Reality

Content doesn't stay on websites anymore. It appears in:

- Mobile apps (native, not just responsive web)
- Voice assistants
- Chat interfaces
- Email campaigns
- Partner feeds
- Printed materials
- Digital signage
- API responses

Legacy CMS platforms struggle with this. They were built around the page metaphor. Extracting clean, structured content for other channels requires workarounds — APIs bolted on, custom integrations, content duplication.

MX content fragments are channel-agnostic by design. Variations handle channel-specific needs. The content model separates meaning from presentation. Multi-channel delivery becomes straightforward because the content was designed for it.

### The Talent Market

Finding AEM developers is hard. Finding good ones is harder. Finding them at reasonable rates is nearly impossible.

The specialist skills required for legacy platforms — AEM's OSGi and Sling, Sitecore's .NET stack, Episerver's architecture — create talent bottlenecks. Your team becomes dependent on expensive contractors or niche agencies.

Modern, file-based systems use technologies developers already know. JavaScript, YAML, Markdown, Git. The talent pool is vast. New team members become productive quickly. You're not locked into specialist markets.

### The Upgrade Treadmill

Legacy platforms demand constant attention. Security patches. Version upgrades. Compatibility fixes. Each AEM service pack requires testing. Each major version requires migration effort.

You're not building new capabilities. You're just keeping the lights on.

File-based systems with clean separation of concerns don't have this problem. Content is just files. They don't need upgrading. The tools that process them can evolve independently. A Markdown file written today will be readable in twenty years.

---

## What Migration Actually Means

Let's be clear about what we're proposing.

Migration is not:

- A weekend project
- Risk-free
- Just copying files
- Something to attempt without planning

Migration is:

- A strategic initiative requiring executive support
- A multi-month programme with dedicated resources
- An opportunity to improve, not just move, content
- A chance to add machine understanding that never existed

### The Three Migrations

Every CMS migration is actually three migrations:

**Content Migration** — The actual content. Text, images, videos, documents. This is what people usually think about.

**Structure Migration** — The content models, templates, taxonomies. How content is organised and related. Often more complex than the content itself.

**Capability Migration** — The features the old system provided. Workflows, personalisation, preview, versioning. What do you need to replicate?

MX adds a fourth dimension:

**Meaning Migration** — Adding the metadata that makes content machine-understandable. This didn't exist in the legacy system. You're not migrating it; you're creating it.

---

## The MX Advantage

Why migrate to MX-native content specifically? What does MX provide that other targets don't?

### Portability

MX metadata travels with content. It's not locked in a database schema or proprietary format. YAML frontmatter, sidecar files, inline annotations — all human-readable, all standard formats.

If you later decide to move to yet another system, your MX metadata comes along. You're never locked in again.

### AI-Native Design

MX was designed for the AI era. Every specification considers how machines will consume and process content:

- Audience declarations (human, machine, both)
- Confidence and accuracy metrics
- AI permission controls
- RAG optimisation hints
- Embedding configuration
- Retrieval guidance

This isn't bolted on. It's foundational.

### Specification Coverage

MX covers the content landscape:

- **Structured Data** for web semantics
- **Code Metadata** for software context
- **Media Metadata** for assets
- **Content Fragments** for headless delivery
- **Data Lake** for AI infrastructure
- **Database Metadata** for schema understanding

Whatever content you're migrating, there's an MX specification for it.

### Community and Tooling

MX isn't proprietary. It's community-developed, openly specified, with growing tooling support. Validators, generators, IDE extensions, build integrations — the ecosystem is developing.

You're joining a movement, not buying a product.

---

## Who Should Read This Book

This book is for:

**Content strategists** planning migration programmes. You'll understand what's involved, what decisions need making, and how to build a business case.

**Technical architects** designing migration systems. You'll get detailed mappings from legacy formats to MX, pipeline architectures, and implementation patterns.

**Developers** building import tools. You'll find code examples, API references, and practical guidance for extracting and transforming content.

**Operations teams** running migrations. You'll learn validation approaches, rollback strategies, and production cutover patterns.

The book assumes familiarity with MX specifications (covered in "MX: Specifications") and general CMS concepts. It doesn't assume expertise in any particular legacy platform, though Adobe Experience Manager receives the most detailed treatment given its market presence.

---

## What This Book Covers

**Part One: Foundations**

- Chapter 2: Understanding Legacy Systems — What you're migrating from
- Chapter 3: The MX Target — What you're migrating to
- Chapter 4: Migration Strategy — Planning the programme

**Part Two: Extraction**

- Chapter 5: AEM Content Extraction — Pages, fragments, assets from Adobe Experience Manager
- Chapter 6: Sitecore Extraction — Items, media, templates from Sitecore
- Chapter 7: WordPress Extraction — Posts, pages, media from WordPress
- Chapter 8: Generic Extraction — Patterns for other systems

**Part Three: Transformation**

- Chapter 9: Content Transformation — Converting content formats
- Chapter 10: Structure Transformation — Mapping models and relationships
- Chapter 11: Metadata Enrichment — Adding MX properties
- Chapter 12: AI Enhancement — Generating embeddings and RAG hints

**Part Four: Loading**

- Chapter 13: The MX Content Store — Target architecture
- Chapter 14: Validation and Quality — Ensuring correctness
- Chapter 15: Incremental Migration — Phased approaches
- Chapter 16: Cutover and Operation — Going live

**Part Five: Reference**

- Appendix A: AEM Property Mappings
- Appendix B: Sitecore Property Mappings
- Appendix C: WordPress Property Mappings
- Appendix D: MX Import Tool Reference

---

## The Journey Ahead

Migration is a journey. It starts with content trapped in a legacy system, understood only by that system's particular logic. It ends with content that's free — portable, machine-understandable, ready for whatever comes next.

The journey isn't always smooth. There will be content that doesn't map cleanly. Edge cases that require judgement. Quality issues that the migration exposes. Politics around what to keep, what to archive, what to delete.

But at the end, you'll have something valuable: content that works for the AI era. Content that carries its own meaning. Content that's truly yours, not rented from a vendor.

Let's begin.

---

*The following chapter examines legacy CMS architectures — what they store, how they store it, and what that means for extraction.*
