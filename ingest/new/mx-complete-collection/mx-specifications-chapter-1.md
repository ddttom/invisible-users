---
title: "MX Specifications: Opening Chapter"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "The Language Machines Understand"
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

# Chapter 1: The Language Machines Understand

When a musician sits down to write a song, they don't invent music from scratch. They reach for notes — the same twelve notes that every other musician uses. They combine those notes into chords, arrange those chords into progressions, and shape those progressions into something that moves people.

The notes themselves aren't the music. The song is the music. But without shared notes, there's no way for musicians to play together, no way to write sheet music others can read, no way to build on what came before.

Machine Experience specifications work the same way.

---

## Notes, Chords, and Songs

Think of MX as a musical system for describing digital content to machines.

**Notes** are individual properties — single pieces of information you can declare about any content. When you write `mx:confidence: 0.9`, you're playing a note. That note means "I'm fairly certain about this." When you write `mx:pii: true`, you're playing a different note: "This contains personal information."

Notes are simple. They're universal. The same note means the same thing whether you're describing a database, a photograph, or a blog post.

**Chords** are properties that work together. Just as a C major chord combines three notes into something richer than any single note, MX property groups combine related notes into meaningful clusters.

The "quality chord" combines `mx:confidence`, `mx:accuracy`, and `mx:completeness` — three notes that together describe how much you should trust a piece of content.

The "access chord" combines `mx:accessLevel`, `mx:licenseType`, and `mx:citationRequired` — three notes that together describe what you're allowed to do with something.

**Songs** are complete specifications. The MX Database Specification is a song. It tells you which notes matter for databases, which chords to use, and how to arrange them into something a machine can understand and act upon.

Different songs emphasise different things. A blues song and a pop song might share the same chords, but they use them differently. Similarly, the Database specification and the Media specification share many properties, but they emphasise different combinations for different purposes.

---

## Why Machines Need Sheet Music

When you look at a photograph, you understand it instantly. You see a product shot, recognise the lighting quality, notice it's professionally composed. You might think "this would work well on the homepage" without consciously analysing why.

Machines don't work that way.

An AI looking at that same photograph sees pixels. It can analyse those pixels remarkably well — identifying objects, reading text, describing scenes. But it cannot know that this image requires attribution to the photographer. It cannot know that using it for AI training would violate your licensing agreement. It cannot know that the marketing team prefers this shot over the nearly identical one next to it.

That knowledge lives in people's heads. In email threads. In approval workflows. In the institutional memory of organisations.

MX specifications are sheet music for machines. They capture the knowledge that humans accumulate about content — its purpose, its permissions, its relationships, its quality — and express that knowledge in a form machines can read.

When a content management system exports a photograph with MX metadata, it's not just moving pixels. It's moving meaning.

---

## The Base Specification: Learning the Notes

Before you can write songs, you need to learn the notes.

The MX Base Specification defines the fundamental vocabulary that all other specifications share. These are the notes every MX practitioner needs to know:

**Status notes** tell machines where content is in its lifecycle:

```yaml
mx:status: draft      # Not ready for use
mx:status: published  # Live and authoritative
mx:status: deprecated # Being phased out
```

**Audience notes** tell machines who content is for:

```yaml
mx:audience: human    # Written for people to read
mx:audience: machine  # Structured for processing
mx:audience: both     # Serves both purposes
```

**Quality notes** tell machines how much to trust content:

```yaml
mx:confidence: 0.9    # Author is fairly certain
mx:accuracy: 0.95     # Verified as factually correct
mx:completeness: 0.8  # Mostly finished
```

**Volatility notes** tell machines how often content changes:

```yaml
mx:volatility: stable    # Rarely changes
mx:volatility: periodic  # Changes on a schedule
mx:volatility: frequent  # Changes often
```

These notes appear across every MX specification. A database column can be `draft` or `published`. A video can have high or low `confidence`. An API endpoint can be `stable` or `frequent`. The notes mean the same thing everywhere.

---

## Domain Specifications: Different Songs, Same Notes

The Base Specification gives you notes. Domain specifications give you songs — complete arrangements suited to particular types of content.

**MX Structured Data** is a song for web content. It emphasises schema.org alignment, page hierarchy, and search engine optimisation. If you're adding metadata to blog posts, documentation, or marketing pages, this is your song.

**MX Code Metadata** is a song for source code. It emphasises repository structure, function-level annotations, and AI editing permissions. If you're helping AI assistants understand your codebase, this is your song.

**MX Media Metadata** is a song for images, video, and audio. It emphasises rights management, accessibility, and creative provenance. If you're managing a digital asset library, this is your song.

**MX Content Fragments** is a song for headless content. It emphasises variations, relationships, and multi-channel delivery. If you're building composable content systems, this is your song.

**MX Data Lake** is a song for AI infrastructure. It emphasises embeddings, chunking, and retrieval optimisation. If you're building RAG applications, this is your song.

**MX Database Metadata** is a song for data systems. It emphasises schemas, PII classification, and query documentation. If you're governing enterprise data, this is your song.

Each song has its own character. But they're all written in the same musical system. A property you learn in one specification transfers to others. A pattern you master in one domain applies elsewhere.

---

## Playing Together: Composition

Real music gets interesting when musicians play together. Jazz ensembles. Orchestras. Rock bands. Each musician plays their own part, but they're all playing the same song.

MX specifications compose the same way.

Consider a product page. It might need:

- **Structured Data** properties for search engines to understand the page
- **Content Fragment** properties for the CMS to manage variations
- **Media** properties for the product images
- **Data Lake** properties for recommendation engines

These aren't four separate systems with four separate metadata formats. They're four parts playing together. The same `mx:status: published` note appears in all of them, meaning the same thing. The same `mx:audience: both` chord shapes all of them.

When you compose specifications, you're writing for an ensemble:

```yaml
mx:
  version: "1.0"
  
  # From Base
  mx:status: published
  mx:audience: both
  mx:confidence: 0.95
  
  # From Structured Data
  ld:
    "@type": Product
    name: "Widget Pro"
    
  # From Content Fragments
  variations:
    - type: locale
      locale: de-DE
      
  # From Data Lake
  rag:
    enabled: true
    priority: high
```

Each section plays its part. Together, they describe something richer than any single specification could express.

---

## Why This Matters Now

For decades, content and data have been things we create for humans and store for machines. We write documents people read. We capture photos people view. We build databases people query.

The machines were filing cabinets — storage and retrieval systems that didn't need to understand what they held.

That era is ending.

AI systems don't just store content. They interpret it. They reason about it. They generate responses based on it. They make decisions that affect what people see, what they can access, what they're told.

When an AI assistant answers a question by drawing on your company's documentation, it needs to know which documents are authoritative and which are drafts. It needs to know which contain sensitive information. It needs to know which supersede others.

When a recommendation engine suggests products, it needs to know which are available, which are appropriate for different audiences, which have strong reviews.

When a search system indexes your content, it needs to know what's public and what's private, what should rank highly and what should be suppressed, what's current and what's outdated.

Machines are becoming participants in the content ecosystem, not just infrastructure. They need the same contextual understanding that humans develop through experience.

MX specifications transfer that understanding from humans to machines — systematically, scalably, and in a form that's both human-readable and machine-processable.

---

## Reading This Book

This book is organised like learning music.

**Part One** covers fundamentals — the Base Specification and the core concepts that appear across all domain specifications. If you're new to MX, start here.

**Part Two** covers each domain specification in depth. Read the sections relevant to your work. Most practitioners won't need all of them, just as most musicians don't play every instrument.

**Part Three** covers composition — how to combine specifications for real-world implementations. This is where theory meets practice.

**Part Four** covers the ecosystem — tools, extensions, and the MX community. This is where you connect with others playing the same music.

Throughout, you'll find:

- **Examples** showing real metadata declarations
- **Patterns** describing common approaches
- **Guidance** explaining when and why to use specific properties

The specifications themselves are included as appendices. They're reference material — the sheet music you'll consult once you understand how to read it.

---

## A Note on Simplicity

Music theory can be intimidating. Time signatures, modes, counterpoint — it's easy to think you need years of study before you can play.

But people make music all the time without formal training. A few chords. A sense of rhythm. The willingness to try.

MX works the same way. The full specification suite is comprehensive — it has to be, to cover the range of content and use cases in modern organisations. But you don't need all of it.

Start with the notes you need. Add chords as they become useful. Compose with other specifications when your work demands it.

The goal isn't to master every property before you begin. The goal is to start describing your content in ways machines can understand, and to get better at it over time.

A simple declaration that tells a machine "this is a draft, don't show it to users" is more valuable than no metadata at all. A basic rights statement that tells a machine "don't use this for training" protects your content even if you haven't specified every possible property.

Begin where you are. Play the notes you know. The music will grow.

---

## The Choir and the Orchestra

This book is an orchestra — a formal arrangement where every part is written down, every section rehearsed, every movement planned. It gives you the complete score for MX specifications, from the foundational notes to the complex compositions.

But an orchestra isn't how most music happens.

The MX community is a choir. People join with different experience levels. Some have trained voices, some are finding their range. They learn from each other, support each other, occasionally improvise together. The music emerges from participation, not just performance.

The orchestra gives you precision. The choir gives you belonging.

You need both.

When you're implementing MX specifications in your organisation, you'll consult this book the way a musician consults a score — checking notation, confirming arrangements, ensuring you're playing the right notes in the right order. The specifications are precise because machines need precision.

But when you're figuring out *which* specifications matter for your situation, when you're solving problems no one has documented yet, when you're extending MX for your particular domain — that's when you need the choir.

The MX community at mx.community is where practitioners share patterns, debate approaches, and develop new specifications together. It's where edge cases get discussed, where implementations get reviewed, where the next version of the specifications takes shape.

The orchestra plays what's written. The choir writes what gets played.

This book will make you competent. The community will make you fluent.

---

## The MX Library

This book is one of three. Each serves a different purpose in your MX journey.

**MX: The Handbook** is where to start. It introduces Machine Experience as a discipline — the why before the how. If you're new to MX, or need to explain it to colleagues, the Handbook gives you the foundations: what machines need from content, how human-centred design principles apply to machine consumers, and why this matters now. It's the book that convinces.

**MX: The Bible** is the comprehensive reference. It covers every aspect of Machine Experience practice — strategy, implementation, governance, measurement. When you need depth on any MX topic, the Bible provides it. It's the book that guides.

**MX: Specifications** — this book — is the technical standard. It defines the exact properties, formats, and patterns for MX metadata. When you need to know precisely how to declare something, this book provides the answer. It's the book that specifies.

Think of them as:

| Book | Purpose | When to read |
|------|---------|--------------|
| The Handbook | Understanding | Starting out, persuading others |
| The Bible | Practice | Planning, implementing, governing |
| Specifications | Precision | Building, validating, integrating |

You don't need all three at once. Most practitioners start with the Handbook, move to relevant sections of the Bible as they implement, and consult Specifications when they need exact syntax.

But they work together. The Handbook explains *why* machines need metadata. The Bible explains *how* to provide it across your organisation. This book explains *what* that metadata looks like, property by property, specification by specification.

---

*The following chapters explain each specification in detail, starting with the foundations that all MX practitioners need to understand.*
