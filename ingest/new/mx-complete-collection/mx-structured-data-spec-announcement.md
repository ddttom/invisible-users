---
title: "Introducing the MX Structured Data Specification"
date: 2026-01-28
ld:
  "@type": BlogPosting
  headline: "Introducing the MX Structured Data Specification"
  author:
    "@type": Person
    name: Tom Ledger
  publisher:
    "@type": Organization
    name: MX Community
  isPartOf:
    "@type": Blog
    name: MX Community Blog
  inLanguage: en-GB
  genre: [Technology, Announcement]
  mx:audience: both
  mx:status: published
  mx:source: human
  mx:volatility: stable
  mx:chunkBoundary: heading
  mx:standalone: true
  mx:accessLevel: public
  mx:licenseType: open
  mx:completeness: 1.0
  mx:relatedTo:
    - /spec/structured-data/
    - /handbook/chapter-2/
---

# Introducing the MX Structured Data Specification

The MX community has published a draft specification for structured data in content frontmatter. We're asking for your contributions to help shape it.

## What the specification covers

The MX Structured Data Specification defines how content authors declare schema.org metadata using YAML frontmatter. Rather than relying on build tools to infer structure, authors declare it explicitly in a format that's both human-readable and machine-parseable.

A simple example:

```yaml
---
title: "Getting Started with MX"
ld:
  "@type": TechArticle
  mx:audience: both
  mx:chunkBoundary: heading
---
```

The specification extends schema.org with MX-specific properties that help AI agents process content appropriately. These include guidance on chunking for retrieval, content lifecycle status, provenance tracking, and usage permissions.

## Why this matters

AI agents are increasingly consuming web content. They retrieve documentation to answer questions, summarise articles, and act on information. Yet most content lacks the metadata these agents need to process it well.

Consider a blog post that uses fictional scenarios to illustrate real patterns. Without metadata, an AI might cite the fiction as fact. With `mx:illustrative: true`, agents know to extract the principle, not the example.

Or technical documentation with prerequisites. Without metadata, an agent might serve advanced content to a beginner. With `mx:prerequisites`, agents can guide users through the right learning path.

The specification addresses gaps that schema.org doesn't cover: audience targeting, chunking guidance, content provenance, translation status, and quality signals.

## What we're asking for

This is a community specification. We've published a draft, but it needs input from practitioners who will use it.

**Content authors:** Does the frontmatter format work for your workflow? Are there properties you need that we haven't included?

**Build tool developers:** Can you implement the processing requirements? Are there edge cases we haven't considered?

**AI agent developers:** Will these properties help you process content better? How should agents interpret the signals we've defined?

**Standards folk:** Have we got the schema.org integration right? Are there existing vocabularies we should align with?

## How to contribute

The specification is available at [mx.community/spec/structured-data](/spec/structured-data/).

To contribute:

1. **Open an issue** on the MX community repository with your feedback, questions, or suggestions
2. **Submit a pull request** with proposed changes to the specification
3. **Join the discussion** in the MX community forums
4. **Implement and report** — try the specification in your own projects and tell us what works and what doesn't

We're particularly interested in:

- Real-world use cases we haven't covered
- Properties that are missing or redundant
- Edge cases in inheritance and processing
- AI agent behaviour that the specification should address

## Current status

The specification is at version 1.0.0-draft. We expect to iterate based on community feedback before publishing a stable release aligned with the MX book launch in April 2026.

The draft covers:

- Frontmatter format and processing requirements
- Schema.org type guidance
- MX extension properties for lifecycle, provenance, chunking, relationships, access, internationalisation, and quality
- AI agent interpretation guidance
- Inheritance from parent pages
- Migration from existing content

## A specification that demonstrates itself

The specification document itself uses the format it describes. Its frontmatter declares it as a TechArticle, marks it as AI-assisted with human verification, sets chunking boundaries for retrieval, and lists inheritable properties for child pages.

We think specifications should eat their own dog food.

## Get involved

Machine Experience is a young discipline. The practices we establish now will shape how humans and machines interact with content for years to come.

If you care about making content work for both audiences, we'd welcome your contribution.

Read the specification: [mx.community/spec/structured-data](/spec/structured-data/)

Join the community: [mx.community](/join/)
