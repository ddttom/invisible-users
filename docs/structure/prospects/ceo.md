---
title: "CEO/Executive Outreach Templates"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Prompt templates for outreach to CEOs and executive leadership about MX compliance strategic investment."
keywords: [ceo, executives, outreach, email-templates, strategy, investment]
audience: "ceo"
mx-content-type: "prompt-template"
mx-state: "published"
ai-instruction: |
  These templates target CEOs and executive leadership. Focus on:
  - Strategic business impact, not technical details
  - ROI and competitive advantage
  - Risk of inaction
  - Market timing and first-mover advantage
  Keep messages brief and outcome-focused.
variables:
  - name: prospect_name
    description: "Executive's name"
    example: "James Wilson"
  - name: prospect_company
    description: "Their company"
    example: "TechCorp"
  - name: prospect_role
    description: "Their title"
    example: "CEO"
  - name: company_industry
    description: "Their industry"
    example: "B2B SaaS"
  - name: competitor_name
    description: "A known competitor"
    example: "RivalCo"
  - name: sender_name
    description: "Your name"
    example: "Tom Cranstoun"
  - name: meeting_link
    description: "Calendar booking URL"
    example: "https://calendly.com/tomcranstoun"
---

# CEO/Executive Outreach Templates

Templates for reaching executive leadership about MX compliance.

---

## Cold Email

### Subject Lines

1. `{{prospect_company}}'s AI discovery gap`
2. `Quick strategic question for {{prospect_company}}`
3. `Your competitors are visible to AI. Are you?`
4. `60-second read: the AI-agent opportunity`
5. `{{prospect_company}} + AI agents`

### Body Template

```text
{{prospect_name}},

When customers ask AI assistants to "find a {{company_industry}} company," does {{prospect_company}} appear?

For most businesses, the answer is no. AI agents can't parse unstructured websites, so they skip them entirely.

This is a strategic gap. The fix is straightforward (metadata standards), the investment is modest (weeks, not months), and the window for competitive advantage is 12-18 months.

Worth a 15-minute conversation to see if this is relevant for {{prospect_company}}?

{{sender_name}}
```

### Call to Action Options

- "Worth 15 minutes to explore?"
- "Should I send a one-page overview?"
- "Would your CTO be the right person to evaluate this?"
- "Can I share what {{competitor_name}} is doing?"

---

## Follow-up Email

### Subject Lines

1. `Re: AI discovery for {{prospect_company}}`
2. `One data point for {{prospect_company}}`
3. `Following up (with competitor intel)`

### Body Template

```text
{{prospect_name}},

Brief follow-up on AI-agent visibility.

One data point: 40% of knowledge workers now use AI assistants for research and recommendations. Websites without structured metadata don't appear in these queries.

For {{company_industry}} specifically, this affects lead generation, brand discovery, and competitive positioning.

Happy to share a 10-minute overview if useful.

{{sender_name}}

{{meeting_link}}
```

---

## Event Invite

### Subject Lines

1. `Executive Briefing: AI-Agent Readiness [{{event_date}}]`
2. `Invite: The AI Discovery Opportunity`
3. `30-min briefing for {{company_industry}} leaders`

### Body Template

```text
{{prospect_name}},

I'm hosting a 30-minute executive briefing on {{event_date}} about AI-agent readiness for {{company_industry}} companies.

Agenda:
- The shift: How AI assistants are changing discovery (5 min)
- The gap: Why most websites are invisible to agents (5 min)
- The fix: What "AI-ready" means practically (10 min)
- Q&A (10 min)

No sales pitch - just strategic context for decision-makers evaluating this space.

Register: {{event_link}}

{{sender_name}}
```

---

## LinkedIn Message

### Connection Request Note

```text
{{prospect_name}} - working on AI-agent readiness standards for {{company_industry}} companies. Given {{prospect_company}}'s market position, thought you might find this strategically relevant. Happy to share a brief overview.
```

### Follow-up Message

```text
Thanks for connecting.

One strategic question: when AI assistants recommend {{company_industry}} solutions, is {{prospect_company}} appearing?

For most companies, the answer is no - and the fix is surprisingly straightforward.

Worth a 15-minute call? {{meeting_link}}
```

---

## Descriptions

### One-liner

```text
MX compliance ensures {{prospect_company}} appears when AI assistants recommend {{company_industry}} solutions - a growing channel that most competitors are missing.
```

### Elevator Pitch (30 seconds)

```text
AI assistants are becoming how people find businesses. "Find me a {{company_industry}} solution" - if your website can't be parsed by AI agents, you don't appear. Most websites can't. MX compliance fixes this with structured metadata patterns. The investment is weeks of developer time, the window for competitive advantage is 12-18 months, and the risk of waiting is invisibility in a growing discovery channel.
```

### Paragraph Description

```text
Machine Experience (MX) compliance addresses a strategic gap in {{prospect_company}}'s digital presence: visibility to AI agents. As AI assistants become a primary discovery channel (40% of knowledge workers now use them for research), websites without structured metadata are systematically excluded from recommendations.

For {{company_industry}} companies, this affects lead generation, brand discovery, and competitive positioning. The fix involves implementing metadata standards that make content machine-readable - a modest investment (weeks, not months) with measurable impact on AI-assisted discovery.

Early adopters gain 12-18 months of competitive advantage before MX compliance becomes expected. The risk of waiting is simple: competitors who implement first will capture the AI-assistant discovery channel while others remain invisible.
```

---

## Board Presentation Prompt

```text
Generate a 3-slide executive summary on MX compliance for {{prospect_company}}'s board.

Slide 1: The Shift
- AI assistants as discovery channel
- Current gap (most sites invisible)
- Market timing window

Slide 2: The Opportunity
- What MX compliance enables
- Competitive positioning
- Investment vs return

Slide 3: Recommendation
- Implementation approach
- Timeline and resources
- Success metrics

Context: {{company_industry}} company, {{prospect_company}},
concerned about digital transformation and competitive positioning.
```

---

## Objection Handling Prompts

### "We have bigger priorities"

```text
Generate a response that acknowledges competing priorities while framing
MX compliance as a low-effort, high-optionality investment. Emphasise
the small team/time requirement and the risk of waiting.
Context: {{prospect_name}} at {{prospect_company}} has limited bandwidth.
```

### "Let's wait and see how this develops"

```text
Generate a response addressing the timing window for competitive advantage.
Include data on AI assistant adoption rates and the cost of being late.
Context: {{prospect_company}} in {{company_industry}} tends to be conservative.
```

### "What's the ROI?"

```text
Generate an ROI framework for MX compliance investment, including:
- Discovery channel value (lead generation)
- Competitive positioning value
- Future-proofing value
- Accessibility compliance value
Context: {{company_industry}} company evaluating a 2-4 week investment.
```
