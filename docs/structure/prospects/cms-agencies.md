---
title: "CMS Agency Outreach Templates"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Prompt templates for outreach to digital agencies and web consultancies about MX compliance services."
keywords: [cms-agencies, outreach, email-templates, digital-agencies, web-consultancies]
audience: "cms-agencies"
mx-content-type: "prompt-template"
mx-state: "published"
ai-instruction: |
  These templates target digital agencies and web consultancies. Focus on:
  - New service offering / revenue stream opportunity
  - Client value proposition and differentiation
  - Upsell to existing clients
  - Competitive positioning vs other agencies
variables:
  - name: prospect_name
    description: "Contact person's name"
    example: "Sarah Johnson"
  - name: agency_name
    description: "The agency's name"
    example: "Blue Sky Digital"
  - name: prospect_role
    description: "Their position"
    example: "Managing Director"
  - name: primary_platform
    description: "CMS they primarily work with"
    example: "WordPress"
  - name: client_industry
    description: "Industry they serve"
    example: "e-commerce"
  - name: sender_name
    description: "Your name"
    example: "Tom Cranstoun"
  - name: meeting_link
    description: "Calendar booking URL"
    example: "https://calendly.com/tomcranstoun"
---

# CMS Agency Outreach Templates

Templates for reaching digital agencies about MX compliance services.

---

## Cold Email

### Subject Lines

1. `New service line for {{agency_name}}: AI-ready websites`
2. `Your {{primary_platform}} clients are invisible to AI agents`
3. `Quick question about {{agency_name}}'s AI strategy`
4. `Competitor agencies are already doing this`
5. `£5-15k service add-on for existing clients`

### Body Template

```text
Hi {{prospect_name}},

AI assistants are becoming a primary way people find websites. When someone asks "find me a {{client_industry}} company in [location]," sites without structured metadata don't appear.

Most {{primary_platform}} sites you've built are currently invisible to these agents.

I've developed the Machine Experience (MX) specification - a set of patterns that fixes this. For agencies, it's a new service offering:

- **Audit service**: £500-1,500 per site
- **Implementation**: £2,000-8,000 depending on complexity
- **Ongoing maintenance**: Monthly retainer

Several agencies have added this to their pitch decks. Would you be interested in a quick call to see if it fits {{agency_name}}'s offerings?

Best,
{{sender_name}}
```

### Call to Action Options

- "Would a 20-minute call make sense?"
- "Can I send you a sample audit report?"
- "Would you like to see the implementation checklist?"
- "Should I share pricing benchmarks from other agencies?"

---

## Follow-up Email

### Subject Lines

1. `Re: AI-ready websites for {{agency_name}}`
2. `Following up + client case study`
3. `Thought of {{agency_name}} when I saw this`

### Body Template

```text
Hi {{prospect_name}},

Quick follow-up on MX compliance as a service offering.

Just completed an audit for a {{client_industry}} site - found 23 issues that were making it invisible to AI agents. The fix took 2 days of dev time. Client paid £3,500.

This could be an easy upsell for your existing {{primary_platform}} clients. Happy to walk you through the audit process.

15 minutes?

{{sender_name}}

Book directly: {{meeting_link}}
```

---

## Event Invite

### Subject Lines

1. `Workshop: Adding MX Compliance to Your Agency Services`
2. `Invite: How agencies are monetising AI-readiness`
3. `Webinar: The £5-15k service your clients need`

### Body Template

```text
Hi {{prospect_name}},

I'm running a workshop for agency leaders on {{event_date}} about adding MX compliance services.

We'll cover:
- What MX compliance is and why clients need it
- How to audit and price these services
- Implementation patterns for {{primary_platform}}
- Client pitch deck and proposal templates
- Q&A with agencies already offering this

This is specifically for agencies like {{agency_name}} - implementers, not platform vendors.

Interested?

Register: {{event_link}}

{{sender_name}}
```

---

## LinkedIn Message

### Connection Request Note

```text
Hi {{prospect_name}} - I work with agencies on AI-readiness services for websites. Given {{agency_name}}'s focus on {{primary_platform}}, thought you might find the Machine Experience (MX) specification useful as a new service line. Happy to share details.
```

### Follow-up Message

```text
Thanks for connecting!

Quick context: AI agents can't parse most {{primary_platform}} sites. This is creating demand for "AI-ready" website services.

I've been working with agencies to add this as a £5-15k service offering. Happy to share the approach if useful?

{{meeting_link}}
```

---

## Descriptions

### One-liner

```text
MX compliance is a new service line for agencies - auditing and implementing metadata patterns that make client websites discoverable by AI agents.
```

### Elevator Pitch (30 seconds)

```text
AI assistants are becoming how people find businesses, but most websites are invisible to them. MX compliance fixes this with structured metadata patterns. For agencies, it's a new service line: audits at £500-1,500, implementations at £2-8k, plus ongoing retainers. Several agencies are already pitching this to clients. The spec is open, the demand is growing, and the work is straightforward for teams who know {{primary_platform}}.
```

### Paragraph Description

```text
Machine Experience (MX) compliance represents a significant service opportunity for digital agencies. As AI assistants become a primary discovery channel, websites without structured metadata are invisible to these agents - creating urgent client demand for "AI-ready" websites.

For agencies like {{agency_name}}, MX compliance services include: auditing existing sites for AI-agent compatibility (£500-1,500), implementing metadata patterns and semantic structure (£2,000-8,000), and ongoing compliance maintenance (monthly retainer). The work builds on existing {{primary_platform}} expertise - it's metadata and HTML structure, not new technology.

Early-adopter agencies are already differentiating on this capability. The specification is open and documented, making it straightforward to train teams and productise the offering.
```

---

## Client Pitch Prompt

Use this to generate client-facing content:

```text
Generate a pitch for {{agency_name}} to present MX compliance services to a
{{client_industry}} client. Include:
- Why AI-agent visibility matters for their business
- What the audit and implementation involves
- Pricing options (audit only, full implementation, retainer)
- Timeline and deliverables
- ROI framing (discovery, conversion, future-proofing)

Context: Client uses {{primary_platform}}, has approximately 50 pages,
and is concerned about declining organic traffic.
```

---

## Objection Handling Prompts

### "Our clients haven't asked for this"

```text
Generate a response explaining why agencies should lead with this service
rather than waiting for client demand. Include: market timing, competitive
positioning, and upsell opportunity framing.
```

### "We don't have the technical expertise"

```text
Generate a response explaining the skill requirements for MX compliance
implementation. Emphasise that it builds on existing {{primary_platform}}
skills - metadata, Schema.org, HTML structure. Offer training resources.
```

### "How do we price this?"

```text
Generate pricing guidance for MX compliance services, including:
- Audit-only pricing by site size
- Implementation pricing by complexity
- Retainer structures
- Value-based pricing considerations
Context: Agency primarily serves {{client_industry}} clients.
```
