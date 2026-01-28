---
title: "Product Owner Outreach Templates"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Prompt templates for outreach to product owners and product managers about MX compliance features and roadmap prioritisation."
keywords: [product-owners, outreach, email-templates, product-managers, features, roadmap]
audience: "product-owners"
mx-content-type: "prompt-template"
mx-state: "published"
ai-instruction: |
  These templates target product owners and product managers. Focus on:
  - User stories and acceptance criteria
  - Roadmap prioritisation and sequencing
  - Metrics and success measurement
  - Stakeholder communication
  Keep language outcome-focused, avoid deep technical details.
variables:
  - name: prospect_name
    description: "Product owner's name"
    example: "Chris Taylor"
  - name: prospect_company
    description: "Their company"
    example: "ProductCo"
  - name: prospect_role
    description: "Their position"
    example: "Senior Product Manager"
  - name: product_type
    description: "Type of product they manage"
    example: "B2B SaaS platform"
  - name: user_persona
    description: "Their primary user type"
    example: "enterprise customers"
  - name: sender_name
    description: "Your name"
    example: "Tom Cranstoun"
  - name: meeting_link
    description: "Calendar booking URL"
    example: "https://calendly.com/tomcranstoun"
---

# Product Owner Outreach Templates

Templates for reaching product owners about MX compliance prioritisation.

---

## Cold Email

### Subject Lines

1. `User story: AI-agent discoverability for {{product_type}}`
2. `Feature request your {{user_persona}} haven't asked for yet`
3. `Quick product question about {{prospect_company}}`
4. `The AI-readiness gap in {{product_type}}`
5. `Roadmap consideration: MX compliance`

### Body Template

```text
Hi {{prospect_name}},

I've been working with product teams on a capability that's becoming increasingly relevant: AI-agent discoverability.

The user story: "As a potential customer, I want AI assistants to accurately describe and recommend {{prospect_company}} when I ask for {{product_type}} solutions."

Currently, most products fail this - AI agents can't parse unstructured web content, so they skip it or hallucinate.

The fix is a set of metadata patterns called MX compliance. It's a 2-4 sprint investment with measurable impact on discovery and conversion.

Would it be useful to walk through the user stories and acceptance criteria?

{{sender_name}}
```

### Call to Action Options

- "Want to see the user stories?"
- "Can I share how other PMs have prioritised this?"
- "Would a backlog refinement session be useful?"
- "Should I send metrics from early adopters?"

---

## Follow-up Email

### Subject Lines

1. `Re: AI-agent discoverability for {{product_type}}`
2. `User stories + acceptance criteria attached`
3. `Competitor intel: AI-readiness moves`

### Body Template

```text
Hi {{prospect_name}},

Following up on MX compliance for {{prospect_company}}.

I've drafted the key user stories with acceptance criteria:

**Story 1: AI Discovery**
"As a potential customer, I want AI assistants to find and accurately describe {{prospect_company}} when I search for {{product_type}} solutions."

**Acceptance criteria:**
- Schema.org JSON-LD present on all product pages
- Product descriptions parseable by AI agents
- Pricing and features in structured format

Happy to walk through the full epic breakdown and sprint planning approach.

15 minutes?

{{sender_name}}

{{meeting_link}}
```

---

## Event Invite

### Subject Lines

1. `Workshop: MX Compliance for Product Teams [{{event_date}}]`
2. `Invite: Prioritising AI-Readiness Features`
3. `Session: User Stories for AI-Agent Discoverability`

### Body Template

```text
Hi {{prospect_name}},

I'm running a workshop for product owners on {{event_date}} about prioritising MX compliance features.

We'll cover:
- User stories and acceptance criteria for AI discoverability
- Epic breakdown and sprint planning
- Metrics and KPIs to track
- Stakeholder communication templates
- Prioritisation frameworks (ROI, competitive, technical debt)

Designed for PMs - practical backlog content, not technical deep-dives.

Interested?

Register: {{event_link}}

{{sender_name}}
```

---

## LinkedIn Message

### Connection Request Note

```text
Hi {{prospect_name}} - I work with product teams on AI-agent discoverability features. Given your work on {{product_type}}, thought you might find the user stories and prioritisation approach useful. Happy to share.
```

### Follow-up Message

```text
Thanks for connecting!

Quick context: AI assistants are becoming a discovery channel, but most products aren't structured for them.

I've put together user stories and acceptance criteria that product teams can use. The investment is 2-4 sprints with measurable discovery impact.

Worth a 15-minute walkthrough? {{meeting_link}}
```

---

## Descriptions

### One-liner

```text
MX compliance is a feature set that makes {{product_type}} discoverable by AI assistants - a 2-4 sprint investment with measurable impact on organic discovery.
```

### Elevator Pitch (30 seconds)

```text
AI assistants are becoming how people discover products, but most products aren't structured for them. MX compliance fixes this with metadata patterns that make content machine-readable. For product owners, it's a backlog epic: user stories around AI discoverability, 2-4 sprints of implementation, and metrics you can track (discovery, conversion, reduced support tickets). The user need is emerging fast - early implementation provides competitive advantage.
```

### PRD Section

```text
## Feature: MX Compliance (AI-Agent Discoverability)

### Problem Statement
Potential customers increasingly use AI assistants to discover and evaluate {{product_type}} solutions. {{prospect_company}} is not currently visible to these AI agents because our web content lacks structured metadata.

### User Need
"As a potential customer, I want AI assistants to accurately find, describe, and recommend {{prospect_company}} when I ask for {{product_type}} solutions."

### Proposed Solution
Implement Machine Experience (MX) compliance - a set of metadata patterns that make content parseable by AI agents.

### Success Metrics
- AI-assisted discovery rate (trackable via referrer analysis)
- Structured data validation pass rate (100%)
- Time to first meaningful content (for AI agents)
- Organic discovery conversion rate

### Scope
- Schema.org JSON-LD on all product/feature pages
- MX meta tags for content classification
- Semantic HTML structure improvements
- State management for interactive components

### Investment
2-4 sprints (varies by codebase complexity)

### Dependencies
- Design: Component state specifications
- Engineering: Frontend metadata implementation
- Content: Structured descriptions and keywords
```

---

## Backlog Item Prompt

```text
Generate a detailed backlog item (user story) for implementing MX compliance
on {{product_type}} product pages.

Include:
- User story in standard format
- Acceptance criteria (5-7 specific, testable)
- Technical notes for developers
- Design considerations
- Story point estimate range
- Dependencies

Context: {{prospect_company}} uses {{tech_stack}} and serves {{user_persona}}.
```

---

## Stakeholder Update Prompt

```text
Generate a stakeholder update on MX compliance implementation progress.

Context:
- Sprint: 2 of 4
- Completed: Schema.org on product pages, MX meta tags
- In progress: Semantic HTML improvements
- Blocked: None
- Next sprint: State management, validation tooling

Include:
- Progress summary (executive level)
- Metrics if available
- Key accomplishments
- Next steps
- Risks/blockers

Audience: Executive stakeholders, not technical team.
```

---

## Objection Handling Prompts

### "Users haven't asked for this"

```text
Generate a response explaining why product teams should lead on emerging
needs rather than wait for explicit user requests. Include:
- Market timing and competitive dynamics
- How to validate the need (AI assistant testing)
- Examples of proactive feature development
Context: {{prospect_name}} prioritises based on user feedback.
```

### "We have other priorities"

```text
Generate a response that helps {{prospect_name}} evaluate MX compliance
against competing priorities. Include:
- ROI comparison framework
- Technical debt angle (it gets harder to add later)
- The "background task" approach (low-effort baseline)
Context: {{product_type}} team with full backlog.
```

### "How do we measure success?"

```text
Generate a metrics framework for MX compliance success, including:
- Leading indicators (implementation completion)
- Lagging indicators (discovery, conversion)
- How to track AI-assisted discovery
- Benchmark expectations
Context: Data-driven PM at {{prospect_company}}.
```
