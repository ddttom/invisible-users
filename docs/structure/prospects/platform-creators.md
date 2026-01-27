---
title: "Platform Creator Outreach Templates"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Prompt templates for outreach to SaaS and platform creators about MX compliance as platform infrastructure."
keywords: [platform-creators, outreach, email-templates, saas, infrastructure, api-design]
audience: "platform-creators"
mx-content-type: "prompt-template"
mx-state: "published"
ai-instruction: |
  These templates target SaaS founders, platform architects, and builders of
  tools that generate content (website builders, e-commerce platforms, etc.). Focus on:
  - MX compliance as platform-level infrastructure
  - Enabling end-users to be AI-discoverable
  - Competitive differentiation
  - Architecture and API considerations
variables:
  - name: prospect_name
    description: "Founder/architect name"
    example: "Jordan Lee"
  - name: prospect_company
    description: "Their platform"
    example: "BuilderPlatform"
  - name: prospect_role
    description: "Their position"
    example: "CTO"
  - name: platform_type
    description: "Type of platform"
    example: "website builder"
  - name: end_user_type
    description: "Their customers"
    example: "small businesses"
  - name: sender_name
    description: "Your name"
    example: "Tom Cranstoun"
  - name: meeting_link
    description: "Calendar booking URL"
    example: "https://calendly.com/tomcranstoun"
---

# Platform Creator Outreach Templates

Templates for reaching SaaS and platform creators about MX compliance.

---

## Cold Email

### Subject Lines

1. `Making {{prospect_company}} users AI-discoverable`
2. `Platform-level AI readiness for {{platform_type}}`
3. `Quick architecture question about {{prospect_company}}`
4. `Competitive moat: AI-agent compatibility`
5. `Your {{end_user_type}} need this (even if they don't know it)`

### Body Template

```text
Hi {{prospect_name}},

When your {{end_user_type}} ask AI assistants about their business, do they appear?

For most {{platform_type}} users, the answer is no. AI agents can't parse content without structured metadata - and most platforms don't generate it.

I've developed the MX specification - metadata patterns that make content AI-discoverable. For platforms like {{prospect_company}}, it's an infrastructure-level opportunity:

- **Differentiation**: "AI-ready websites" as a platform feature
- **Lock-in**: Content investment creates switching costs
- **Premium tier**: Compliance features for paid plans

Would you be open to exploring how this fits {{prospect_company}}'s architecture?

{{sender_name}}
```

### Call to Action Options

- "Would a technical deep-dive be useful?"
- "Can I share the architecture patterns?"
- "Should I send the API design spec?"
- "Want to see how other platforms are implementing this?"

---

## Follow-up Email

### Subject Lines

1. `Re: AI-readiness for {{prospect_company}}`
2. `Architecture patterns for {{platform_type}}`
3. `Competitor platform just shipped this`

### Body Template

```text
Hi {{prospect_name}},

Following up on MX compliance for {{prospect_company}}.

The architecture is straightforward for {{platform_type}}:

1. **Metadata-first content model** - mx_metadata field on all content objects
2. **Schema.org generation** - Template-level JSON-LD based on content type
3. **State exposure** - data-* attributes in generated HTML

The implementation sits at your template/rendering layer, not in user code.

Happy to walk through the patterns in detail.

{{sender_name}}

{{meeting_link}}
```

---

## Event Invite

### Subject Lines

1. `Workshop: MX Compliance for Platform Builders [{{event_date}}]`
2. `Invite: AI-Readiness as Platform Infrastructure`
3. `Architecture session: Enabling AI-discoverable content`

### Body Template

```text
Hi {{prospect_name}},

I'm running a workshop for platform builders on {{event_date}} about implementing MX compliance as infrastructure.

We'll cover:
- Metadata-first content model design
- Schema.org generation patterns
- API design for MX metadata
- UI/UX for end-user metadata editing
- Premium tier and certification opportunities
- Live Q&A with platforms already implementing

Specifically designed for {{platform_type}} and similar platforms.

Interested?

Register: {{event_link}}

{{sender_name}}
```

---

## LinkedIn Message

### Connection Request Note

```text
Hi {{prospect_name}} - I work on AI-agent compatibility standards for platforms. Given {{prospect_company}}'s position in the {{platform_type}} space, thought the MX specification might be relevant as platform infrastructure. Happy to share the architecture patterns.
```

### Follow-up Message

```text
Thanks for connecting!

Quick pitch: your {{end_user_type}} will increasingly need AI-discoverability. You can wait for them to ask, or you can build it as a platform feature now.

The architecture is straightforward - mostly template-level metadata generation.

Worth a 20-minute technical discussion? {{meeting_link}}
```

---

## Descriptions

### One-liner

```text
MX compliance is platform infrastructure that makes your {{end_user_type}} AI-discoverable - a differentiation opportunity for {{platform_type}} platforms.
```

### Elevator Pitch (30 seconds)

```text
AI assistants are becoming how people find businesses, but most {{platform_type}} platforms generate content that AI agents can't parse. MX compliance fixes this at the platform level - metadata patterns in your templates that make all user content AI-discoverable. For platforms like {{prospect_company}}, it's differentiation (AI-ready websites as a feature), lock-in (content investment creates switching costs), and premium opportunity (compliance for paid tiers). The architecture is template-level, not user-facing complexity.
```

### Technical Brief

```text
## MX Compliance for {{platform_type}} Platforms

### The Opportunity
AI assistants are becoming a primary discovery channel. Websites without structured metadata are invisible to these agents. Platforms that generate compliant output enable their users to be discovered.

### Architecture Overview

**1. Content Model Extension**
Add mx_metadata to all content objects:
\`\`\`json
{
  "mx_metadata": {
    "mx_id": "uuid",
    "mx_content_type": "product",
    "mx_state": "published",
    "mx_description": "...",
    "mx_keywords": ["..."]
  }
}
\`\`\`

**2. Template-Level Generation**
Generate MX output at the rendering layer:
- Schema.org JSON-LD based on content type
- MX meta tags in <head>
- data-* attributes for state

**3. User Interface**
Optional metadata editing for end users:
- Auto-generated defaults
- Override capability for advanced users
- Compliance indicator showing AI-readiness

### Investment
- Architecture changes: 1-2 sprints
- Template updates: 1-2 sprints
- UI additions: 1 sprint
- Total: 3-5 sprints for basic compliance

### Competitive Positioning
First-mover advantage in "AI-ready {{platform_type}}" positioning.
```

---

## Architecture Review Prompt

```text
Generate an architecture review for implementing MX compliance in a
{{platform_type}} platform.

Current architecture:
- Content stored in {{database_type}}
- Rendered via {{template_system}}
- API-driven frontend

Include:
- Content model changes needed
- Template/rendering layer changes
- API endpoint additions
- Migration strategy for existing content
- Performance considerations
- Estimated effort

Format: Technical architecture document for engineering review.
```

---

## Competitive Analysis Prompt

```text
Generate a competitive analysis of MX compliance implementation
across {{platform_type}} platforms.

Include:
- Current state of MX compliance in the market
- Which competitors are moving on this
- Positioning opportunity for {{prospect_company}}
- First-mover vs fast-follower trade-offs
- Risk of waiting

Context: {{prospect_company}} is evaluating strategic investment in AI-readiness.
```

---

## Objection Handling Prompts

### "Our users don't need this yet"

```text
Generate a response about platform-led feature development, including:
- Why platforms should lead on infrastructure capabilities
- The timeline for user demand (it's coming)
- Competitive dynamics of waiting
Context: {{prospect_name}} prioritises based on user requests.
```

### "This adds complexity for users"

```text
Generate a response explaining how MX compliance can be transparent to users:
- Auto-generated metadata from existing content
- Sensible defaults that don't require user input
- Optional advanced controls for power users
Context: {{platform_type}} focused on simplicity.
```

### "How does this fit our pricing model?"

```text
Generate pricing strategy options for MX compliance features:
- Free tier: Basic compliance (auto-generated)
- Paid tier: Advanced controls, custom Schema.org
- Enterprise: API access, custom metadata fields
- Certification badge for compliant sites
Context: {{prospect_company}} has freemium model.
```
