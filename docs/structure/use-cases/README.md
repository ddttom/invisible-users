---
title: "MX Compliance Use Cases"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Audience-specific guides for understanding and implementing MX compliance across different roles and organisations."
keywords: [mx-compliance, use-cases, audience-guides, implementation, ai-readiness]
ai-instruction: |
  This README indexes audience-specific MX compliance guides. Each guide is tailored
  to a specific role or organisation type, explaining MX compliance in terms relevant
  to their responsibilities and concerns.
---

# MX Compliance Use Cases

Audience-specific guides for implementing Machine Experience (MX) compliance.

## Overview

MX compliance means different things to different people. A CEO needs to understand strategic value; a developer needs code examples. These guides explain MX compliance for each audience in their own language.

## Audience Guides

### By Organisation Type

| Guide | Audience | Focus |
|-------|----------|-------|
| **[CMS Vendors](./cms-vendors.md)** | WordPress, Drupal, Ghost, etc. | Platform features, competitive positioning |
| **[CMS Agencies](./cms-agencies.md)** | Digital agencies, web shops | Service offerings, client delivery |
| **[Platform Creators](./platform-creators.md)** | SaaS, e-commerce platforms | Architecture, API design |
| **[Conference Organisers](./conference-organisers.md)** | Event planners, conference teams | Schema.org Event, discovery, registration |

### By Role

| Guide | Audience | Focus |
|-------|----------|-------|
| **[CEOs](./ceo.md)** | Executive leadership | Strategy, investment, competitive advantage |
| **[Product Owners](./product-owners.md)** | Product managers | User stories, roadmap, metrics |
| **[Developers](./developers.md)** | Software engineers | Code examples, implementation patterns |
| **[Designers](./designers.md)** | UX/UI designers | Visual patterns, accessibility, components |

## Quick Navigation

### "I want to understand the business case"
→ Start with **[CEO Guide](./ceo.md)**

### "I want to sell MX services to clients"
→ Start with **[CMS Agencies Guide](./cms-agencies.md)**

### "I want to build MX into my platform"
→ Start with **[Platform Creators Guide](./platform-creators.md)** or **[CMS Vendors Guide](./cms-vendors.md)**

### "I want to prioritise MX in my backlog"
→ Start with **[Product Owners Guide](./product-owners.md)**

### "I want to implement MX compliance"
→ Start with **[Developers Guide](./developers.md)**

### "I want to design MX-compliant interfaces"
→ Start with **[Designers Guide](./designers.md)**

### "I want my conference to be AI-discoverable"
→ Start with **[Conference Organisers Guide](./conference-organisers.md)**

## What Each Guide Contains

### CMS Vendors
- Why MX compliance is a platform feature
- Implementation roadmap (4 phases)
- Technical specifications
- Marketing and positioning
- Certification programme ideas

### CMS Agencies
- Service offering definitions (audit, implementation, migration, maintenance)
- Platform-specific implementation (WordPress, Drupal, headless)
- Client communication scripts
- Pricing guidance
- Quality assurance checklists

### Platform Creators
- Architecture principles (metadata-first, explicit state)
- Implementation patterns by platform type
- UI/UX patterns for MX metadata
- API design guidelines

### Conference Organisers
- Why AI discovery matters for events
- Schema.org Event implementation
- Schedule and session structured data
- Speaker profiles with Schema.org Person
- Registration form accessibility
- iCalendar integration
- Platform-specific guidance (WordPress, Squarespace, custom)
- Budget and timeline estimates
- Testing strategies

### CEOs
- One-minute summary
- Market shift analysis
- Investment rationale and ROI
- Risk assessment
- Decision framework
- Organisational implications

### Product Owners
- User stories with acceptance criteria
- Epic breakdown
- Sprint planning examples
- Metrics and KPIs
- Stakeholder communication templates
- Risk management

### Developers
- Quick start (minimum viable MX)
- TypeScript interfaces and schemas
- State machine implementation
- HTML generation code
- API endpoint patterns
- Testing examples
- Framework integration (React, Vue)

### Designers
- Convergence principle (AI + accessibility)
- Semantic visual hierarchy
- Colour and contrast requirements
- Focus state patterns
- Touch target specifications
- Component design patterns
- Design handoff documentation

## How Guides Relate

```text
                    ┌─────────────────┐
                    │      CEO        │
                    │   (Strategy)    │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
      ┌───────────┐  ┌─────────────┐  ┌───────────┐
      │  CMS      │  │  Platform   │  │  Product  │
      │ Vendors   │  │  Creators   │  │  Owners   │
      │(Platform) │  │(Build SaaS) │  │(Features) │
      └─────┬─────┘  └──────┬──────┘  └─────┬─────┘
            │               │               │
            └───────────────┼───────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
      ┌───────────┐  ┌───────────┐  ┌───────────┐
      │   CMS     │  │Developers │  │ Designers │
      │ Agencies  │  │  (Code)   │  │  (Visual) │
      │(Services) │  │           │  │           │
      └───────────┘  └───────────┘  └───────────┘
```

## Common Questions by Audience

### CEOs Ask:
- "What's the ROI?" → [Investment Rationale](./ceo.md#investment-rationale)
- "What are competitors doing?" → [Competitive Intelligence](./ceo.md#competitive-intelligence)
- "What's the risk of not doing this?" → [Risk Assessment](./ceo.md#risk-assessment)

### Product Owners Ask:
- "What user stories do I write?" → [User Stories](./product-owners.md#user-stories)
- "How do I measure success?" → [Metrics and KPIs](./product-owners.md#metrics-and-kpis)
- "How do I communicate to stakeholders?" → [Stakeholder Communication](./product-owners.md#stakeholder-communication)

### Developers Ask:
- "What's the minimum I need to do?" → [Quick Start](./developers.md#quick-start)
- "What data structures do I use?" → [Data Structures](./developers.md#data-structures)
- "How do I test this?" → [Testing](./developers.md#testing)

### Designers Ask:
- "What contrast ratios do I need?" → [Colour and Contrast](./designers.md#colour-and-contrast)
- "How do I design focus states?" → [Focus States](./designers.md#focus-states)
- "What do I hand off to developers?" → [Design Handoff](./designers.md#design-handoff)

### Agencies Ask:
- "How do I price this?" → [Pricing Strategy](./cms-agencies.md#pricing-strategy)
- "How do I explain this to clients?" → [Client Communication](./cms-agencies.md#client-communication)
- "What platforms does this work with?" → [Implementation by CMS Platform](./cms-agencies.md#implementation-by-cms-platform)

### Vendors Ask:
- "What platform changes are needed?" → [What MX Compliance Requires](./cms-vendors.md#what-mx-compliance-requires)
- "How do I market this?" → [Marketing MX Compliance](./cms-vendors.md#marketing-mx-compliance)
- "What's the implementation timeline?" → [Implementation Roadmap](./cms-vendors.md#implementation-roadmap)

## Related Documentation

### Technical Specifications
- [CMS Compliance](../cms-compliance.md) - Internal storage requirements
- [Webpage Compliance](../mx-compliance.md) - HTML output requirements
- [Markdown Compliance](../mx-compliance-markdown.md) - Source file requirements
- [JavaScript Compliance](../mx-compliance-javascript.md) - Code patterns
- [CSS Compliance](../mx-compliance-css.md) - Styling requirements

### Conceptual Overview
- [CLAUDE.md](../CLAUDE.md) - MX concepts for AI assistants
- [README.md](../README.md) - Directory overview

## Contributing

When adding new use case guides:

1. **Identify the audience** - Who is this for?
2. **Use their language** - Avoid jargon they don't use
3. **Focus on their concerns** - What do they care about?
4. **Provide actionable guidance** - What should they do?
5. **Link to technical specs** - For those who want details

**Template structure:**
- Executive Summary (what, why, how)
- Why This Matters (to this audience)
- Key Concepts (in their terms)
- Practical Guidance (specific to their role)
- Checklist or Next Steps
- Related Documentation
