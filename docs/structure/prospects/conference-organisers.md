---
title: "Conference Organiser Outreach Templates"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Prompt templates for outreach to conference and event organisers about MX compliance for AI-discoverable events."
keywords: [conference-organisers, outreach, email-templates, events, schema-org, discovery]
audience: "conference-organisers"
mx-content-type: "prompt-template"
mx-state: "published"
ai-instruction: |
  These templates target conference organisers, event planners, and meetup coordinators.
  Focus on:
  - AI-assisted event discovery
  - Schema.org Event markup benefits
  - Registration and attendance conversion
  - Practical implementation with existing tools
  Keep language accessible, avoid deep technical jargon.
variables:
  - name: prospect_name
    description: "Organiser's name"
    example: "Rachel Green"
  - name: event_name
    description: "Conference/event name"
    example: "TechConf 2026"
  - name: prospect_role
    description: "Their position"
    example: "Conference Director"
  - name: event_type
    description: "Type of event"
    example: "technology conference"
  - name: target_audience
    description: "Who attends"
    example: "software developers"
  - name: event_platform
    description: "Platform they use"
    example: "Eventbrite"
  - name: sender_name
    description: "Your name"
    example: "Tom Cranstoun"
  - name: meeting_link
    description: "Calendar booking URL"
    example: "https://calendly.com/tomcranstoun"
---

# Conference Organiser Outreach Templates

Templates for reaching event organisers about MX compliance.

---

## Cold Email

### Subject Lines

1. `Making {{event_name}} AI-discoverable`
2. `"Find {{event_type}} conferences" - does {{event_name}} appear?`
3. `Quick question about {{event_name}}'s website`
4. `AI assistants are recommending conferences. Yours?`
5. `The discovery gap for {{event_type}} events`

### Body Template

```text
Hi {{prospect_name}},

When someone asks their AI assistant "find {{event_type}} conferences for {{target_audience}}," does {{event_name}} appear?

For most events, the answer is no. AI agents can't parse unstructured event websites, so they skip them entirely.

This is fixable. It's called MX compliance - adding structured data (Schema.org) to your event website so AI assistants can understand and recommend {{event_name}}.

The investment is 1-2 days of web work, and the result is visibility in a growing discovery channel.

Would a 15-minute overview be useful?

{{sender_name}}
```

### Call to Action Options

- "Worth a 15-minute overview?"
- "Can I send you a sample audit?"
- "Would you like to test your site with an AI assistant?"
- "Should I share what other {{event_type}} events are doing?"

---

## Follow-up Email

### Subject Lines

1. `Re: AI discoverability for {{event_name}}`
2. `Tested {{event_name}} with an AI assistant`
3. `Quick update on event discovery`

### Body Template

```text
Hi {{prospect_name}},

Quick follow-up on making {{event_name}} AI-discoverable.

I tested asking an AI assistant about {{event_type}} conferences. {{event_name}} didn't appear in the recommendations - the AI couldn't parse your event data.

The fix is straightforward: adding Schema.org Event markup to your website. It tells AI assistants:
- What: {{event_name}} (conference name, description)
- When: Dates and times
- Where: Venue with address
- How much: Ticket pricing
- Who: Speakers and organisers

Most conference websites are missing this, which is why AI assistants skip them.

15 minutes to discuss?

{{sender_name}}

{{meeting_link}}
```

---

## Event Invite

### Subject Lines

1. `Workshop: AI-Discoverable Events [{{event_date}}]`
2. `Invite: Making Conference Websites AI-Ready`
3. `Session: Schema.org for Event Organisers`

### Body Template

```text
Hi {{prospect_name}},

I'm running a workshop on {{event_date}} specifically for conference and event organisers about making events AI-discoverable.

We'll cover:
- Why AI assistants can't find most events
- Schema.org Event markup (what it is, how to add it)
- Platform-specific implementation ({{event_platform}}, WordPress, custom sites)
- Testing your event with AI assistants
- Calendar integration and session data
- Q&A

No technical background needed - this is practical guidance for organisers.

Interested?

Register: {{event_link}}

{{sender_name}}
```

---

## LinkedIn Message

### Connection Request Note

```text
Hi {{prospect_name}} - I work on AI discoverability for events. Given your work on {{event_name}}, thought you might be interested in how to make conferences findable by AI assistants. Happy to share a quick overview.
```

### Follow-up Message

```text
Thanks for connecting!

Quick question: when someone asks an AI assistant for {{event_type}} recommendations, does {{event_name}} appear?

Most events don't - AI agents can't parse unstructured event pages. The fix is Schema.org markup (1-2 days of web work).

Worth a quick chat? {{meeting_link}}
```

---

## Descriptions

### One-liner

```text
MX compliance makes {{event_name}} discoverable by AI assistants - when {{target_audience}} ask for {{event_type}} recommendations, your event appears.
```

### Elevator Pitch (30 seconds)

```text
AI assistants are becoming how people discover events. "Find me a {{event_type}} conference" - if your website can't be parsed by AI agents, you don't appear. Most event websites can't. MX compliance fixes this by adding Schema.org Event markup - structured data that tells AI assistants what your event is, when it is, where it is, and how much it costs. It's 1-2 days of web work with immediate impact on a growing discovery channel.
```

### Speaker Bio Addition

```text
[Speaker name] will present at {{event_name}}, an MX-compliant {{event_type}} conference that has implemented structured data for AI-agent discoverability. When attendees ask AI assistants for {{event_type}} recommendations, {{event_name}} appears with accurate details about sessions, speakers, and registration.
```

---

## Audit Offer Prompt

```text
Generate a brief audit summary of {{event_name}}'s website for MX compliance.

Check for:
- Schema.org Event markup (likely missing)
- Machine-readable dates (ISO 8601)
- Structured pricing/offers
- Venue with address and geo coordinates
- Speaker information
- Session schedule structure

Format: Executive summary with specific issues and recommendations.
Tone: Helpful, not critical. Focus on opportunities.

Context: {{event_type}} conference targeting {{target_audience}}.
```

---

## Platform-Specific Guidance Prompt

```text
Generate implementation guidance for adding MX compliance to a conference
website built on {{event_platform}}.

Include:
- Platform capabilities and limitations
- Specific steps to add Schema.org Event
- Session/schedule structured data
- Speaker profiles
- Registration/offer data
- Testing and validation

Context: {{event_name}} uses {{event_platform}} for their {{event_type}} event.
Format: Step-by-step guide for non-technical users.
```

---

## Sponsor Pitch Addition Prompt

```text
Generate a sponsor pitch addition about {{event_name}}'s AI discoverability.

Include:
- What MX compliance means for sponsor visibility
- How AI assistants recommend events (and therefore sponsors)
- Value of structured sponsor data
- Differentiation vs events without MX compliance

Context: {{event_name}} is pitching to sponsors for {{event_type}} conference.
Tone: Professional, value-focused.
```

---

## Objection Handling Prompts

### "We already have an event listing site"

```text
Generate a response explaining why listing sites aren't sufficient for
AI discoverability, including:
- AI agents read your site, not aggregators
- Control over your own structured data
- Rich results in search engines
Context: {{prospect_name}} relies on {{event_platform}} for discovery.
```

### "Our website is managed by someone else"

```text
Generate a response that can be shared with the website manager:
- What Schema.org Event markup is
- Why it matters for discovery
- Specific changes needed
- Testing approach
Format: Brief for technical implementer, commissioned by event organiser.
```

### "Will this really make a difference?"

```text
Generate a response demonstrating the impact of MX compliance for events:
- AI assistant usage statistics
- How AI agents select recommendations
- Testing approach to verify improvement
- Other events seeing results
Context: Skeptical {{event_type}} organiser.
```

### "We don't have budget for this"

```text
Generate a low-cost implementation approach for MX compliance:
- DIY with free tools
- Minimum viable compliance (just Event markup)
- Volunteer/intern project scope
- ROI justification for future budget
Context: {{event_name}} has limited web budget.
```
