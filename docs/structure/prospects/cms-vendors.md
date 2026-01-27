---
title: "CMS Vendor Outreach Templates"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Prompt templates for outreach to CMS vendors (WordPress, Drupal, Ghost, etc.) about MX compliance integration."
keywords: [cms-vendors, outreach, email-templates, wordpress, drupal, ghost]
audience: "cms-vendors"
mx-content-type: "prompt-template"
mx-state: "published"
ai-instruction: |
  These templates target CMS platform vendors (WordPress core team, Drupal maintainers,
  Ghost developers, etc.). Focus on:
  - Platform differentiation and competitive advantage
  - Developer ecosystem benefits
  - Implementation as a platform feature
  - Market positioning for AI-readiness
variables:
  - name: prospect_name
    description: "Contact person's name"
    example: "Matt Mullenweg"
  - name: prospect_company
    description: "CMS platform name"
    example: "Automattic/WordPress"
  - name: prospect_role
    description: "Their position"
    example: "CEO"
  - name: platform_name
    description: "The CMS platform"
    example: "WordPress"
  - name: competitor_platform
    description: "A competing platform"
    example: "Drupal"
  - name: sender_name
    description: "Your name"
    example: "Tom Cranstoun"
  - name: meeting_link
    description: "Calendar booking URL"
    example: "https://calendly.com/tomcranstoun"
---

# CMS Vendor Outreach Templates

Templates for reaching CMS platform vendors about MX compliance.

---

## Cold Email

### Subject Lines

Choose one based on context:

1. `{{platform_name}} + AI agents: a platform opportunity`
2. `Making {{platform_name}} AI-agent ready`
3. `Quick question about {{platform_name}}'s AI strategy`
4. `{{competitor_platform}} is moving on this - {{platform_name}}?`
5. `The metadata gap in {{platform_name}}`

### Body Template

```text
Hi {{prospect_name}},

AI assistants are becoming a primary way people discover and interact with websites. Sites built on {{platform_name}} are currently invisible to these agents because they lack structured metadata.

I've developed the Machine Experience (MX) specification - a set of metadata and structural patterns that make content discoverable by AI agents. Several {{competitor_platform}} agencies are already implementing this for clients.

For {{platform_name}}, this could be:
- A core feature differentiator
- A plugin/extension ecosystem opportunity
- A certification programme for themes/developers

Would you be open to a 20-minute call to explore how this could fit {{platform_name}}'s roadmap?

Best,
{{sender_name}}

P.S. Happy to share the technical spec in advance: [link]
```

### Call to Action Options

- "Would you be open to a 20-minute call?"
- "Can I send you the technical specification?"
- "Would this be worth discussing with your platform team?"
- "Should I connect with someone on your developer relations team?"

---

## Follow-up Email

### Subject Lines

1. `Re: {{platform_name}} + AI agents`
2. `Following up: MX compliance for {{platform_name}}`
3. `Thought you might find this relevant`

### Body Template

```text
Hi {{prospect_name}},

Following up on my previous note about making {{platform_name}} AI-agent ready.

Since I wrote, I've seen two more agencies launch "AI-ready website" services - both recommending clients migrate away from platforms without structured metadata support.

The window for {{platform_name}} to own this space is narrowing. I'd love to share how the specification works and explore implementation options.

15 minutes this week?

{{sender_name}}

Book directly: {{meeting_link}}
```

---

## Event Invite

### Subject Lines

1. `Invite: MX Compliance for CMS Platforms [{{event_date}}]`
2. `Workshop: Making {{platform_name}} AI-ready`
3. `Webinar: The future of CMS in an AI-agent world`

### Body Template

```text
Hi {{prospect_name}},

I'm hosting a workshop on Machine Experience (MX) compliance for CMS platforms on {{event_date}}.

We'll cover:
- Why AI agents can't parse most CMS-generated content
- The metadata patterns that fix this (Schema.org, semantic HTML, state attributes)
- Implementation approaches for different CMS architectures
- Live demo of AI agent interaction with compliant vs non-compliant sites

This is specifically relevant for {{platform_name}} given your market position and developer ecosystem.

Interested in joining or sending someone from your team?

Register here: {{event_link}}

{{sender_name}}
```

---

## LinkedIn Message

### Connection Request Note

```text
Hi {{prospect_name}} - I've been working on AI-agent compatibility standards for CMS platforms. Given your role at {{prospect_company}}, thought you might find the Machine Experience (MX) specification relevant. Would love to connect.
```

### Follow-up Message

```text
Thanks for connecting, {{prospect_name}}!

Quick context: AI assistants are becoming a major discovery channel, but most CMS-generated sites are invisible to them.

I've developed a specification (MX compliance) that addresses this. It could be a differentiator for {{platform_name}}.

Worth a 15-min call to explore? {{meeting_link}}
```

---

## Descriptions

### One-liner

```text
MX compliance is a platform feature that makes {{platform_name}} sites discoverable by AI agents - a growing segment that currently can't parse CMS-generated content.
```

### Elevator Pitch (30 seconds)

```text
AI assistants are becoming how people find websites, but they can't understand most CMS-generated content. MX compliance is a set of metadata patterns that fixes this. For {{platform_name}}, it's an opportunity to differentiate - either as a core feature, a plugin ecosystem, or a developer certification. Several agencies are already implementing this manually; the question is whether {{platform_name}} wants to own it at the platform level.
```

### Paragraph Description

```text
Machine Experience (MX) compliance addresses a growing gap in the CMS market: AI agents can't effectively parse content generated by platforms like {{platform_name}}. As AI assistants become a primary discovery channel, sites without structured metadata are invisible to these agents.

The MX specification defines metadata patterns (Schema.org integration, semantic HTML requirements, state attributes) that make content machine-readable while maintaining human usability. For CMS vendors, this represents a platform-level opportunity: native MX support would differentiate {{platform_name}} in an increasingly AI-driven market, create ecosystem value through certified themes and plugins, and position the platform for the next generation of web interaction.

Early implementation provides first-mover advantage before MX compliance becomes table stakes.
```

---

## Objection Handling Prompts

Use these to generate responses to common objections:

### "We already have Schema.org support"

```text
Generate a response explaining why basic Schema.org isn't sufficient for full MX compliance,
including: state management, AI instruction fields, and metadata completeness requirements.
Context: {{platform_name}} has basic Schema.org but lacks comprehensive MX support.
```

### "This sounds like an accessibility thing"

```text
Generate a response differentiating MX compliance from accessibility, while noting
the convergence benefits. Emphasise the AI-agent discovery angle.
Context: {{prospect_name}} at {{platform_name}} thinks this is just WCAG compliance.
```

### "We'll wait to see if this becomes a standard"

```text
Generate a response addressing the first-mover advantage of early implementation,
competitive dynamics, and the cost of waiting.
Context: {{platform_name}} wants to wait for industry consensus.
```
