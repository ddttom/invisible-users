---
title: "Developer Outreach Templates"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Prompt templates for outreach to software developers and engineers about MX compliance implementation."
keywords: [developers, outreach, email-templates, engineers, technical, implementation]
audience: "developers"
mx-content-type: "prompt-template"
mx-state: "published"
ai-instruction: |
  These templates target software developers and engineers. Focus on:
  - Technical specifics and code examples
  - Implementation practicality
  - Open standards and specifications
  - Developer experience and tooling
  Keep tone peer-to-peer, avoid marketing speak.
variables:
  - name: prospect_name
    description: "Developer's name"
    example: "Alex Chen"
  - name: prospect_company
    description: "Their company/project"
    example: "StartupCo"
  - name: tech_stack
    description: "Their technology stack"
    example: "React/Next.js"
  - name: project_type
    description: "Type of project"
    example: "e-commerce platform"
  - name: sender_name
    description: "Your name"
    example: "Tom Cranstoun"
  - name: github_link
    description: "Link to MX resources"
    example: "https://github.com/ddttom/invisible-users"
---

# Developer Outreach Templates

Templates for reaching developers about MX compliance implementation.

---

## Cold Email

### Subject Lines

1. `Making {{tech_stack}} apps visible to AI agents`
2. `Open spec: Machine Experience (MX) compliance`
3. `Quick technical question about {{project_type}}`
4. `Schema.org + state management for AI agents`
5. `Your {{tech_stack}} project + AI discoverability`

### Body Template

```text
Hey {{prospect_name}},

Working on something I think you'd find technically interesting: a specification for making web apps parseable by AI agents.

The problem: AI assistants (Claude, ChatGPT, etc.) struggle to understand most web content - dynamic state, implicit navigation, missing metadata. They fail silently.

The fix: A set of patterns (Schema.org, data-* attributes, semantic HTML, explicit state) that make content machine-readable.

For {{tech_stack}} specifically, it's mostly about:
- JSON-LD generation in your head
- data-* attributes for state
- Proper ARIA for interactive components

The spec is open: {{github_link}}

Interested in your thoughts, especially on the {{tech_stack}} implementation patterns.

{{sender_name}}
```

### Call to Action Options

- "Would love your feedback on the spec"
- "Happy to pair on implementation if you want to try it"
- "Want to see the TypeScript interfaces?"
- "Can I share the validation tooling?"

---

## Follow-up Email

### Subject Lines

1. `Re: MX compliance for {{tech_stack}}`
2. `Added {{tech_stack}} examples to the spec`
3. `Quick implementation question`

### Body Template

```text
Hey {{prospect_name}},

Following up on MX compliance.

I've been adding {{tech_stack}} examples to the spec. The core implementation is pretty minimal:

```typescript
// Minimal MX metadata
const mxMetadata = {
  'mx-compliant': 'true',
  'mx-content-type': 'product',
  'mx-state': 'published'
};
```

Plus Schema.org JSON-LD and semantic HTML structure you probably already have.

Happy to walk through the {{tech_stack}} patterns if useful.

{{sender_name}}
```

---

## Event Invite

### Subject Lines

1. `Workshop: MX Compliance Implementation [{{event_date}}]`
2. `Hands-on: Making {{tech_stack}} AI-agent ready`
3. `Live coding: AI-agent compatible patterns`

### Body Template

```text
Hey {{prospect_name}},

Running a hands-on workshop on {{event_date}} about implementing MX compliance.

Format: Live coding session, not slides. We'll build a compliant {{tech_stack}} app from scratch.

Covering:
- Schema.org JSON-LD generation
- State management with data-* attributes
- TypeScript interfaces for MX metadata
- Validation tooling and testing
- Common gotchas and fixes

Bring your laptop, or just watch. Either way, you'll leave with working code.

Register: {{event_link}}

{{sender_name}}
```

---

## LinkedIn/Twitter DM

### Short Message

```text
Hey {{prospect_name}} - been working on a spec for making web apps parseable by AI agents. Given your {{tech_stack}} work, thought you might find it useful: {{github_link}}

No pitch, just looking for technical feedback.
```

### Follow-up

```text
Thanks for checking it out!

The {{tech_stack}} implementation is mostly:
- Schema.org in <head>
- data-* for state
- Semantic HTML you probably already do

Happy to pair on implementation if you want to try it on {{project_type}}.
```

---

## Descriptions

### One-liner

```text
MX compliance is an open spec for making {{tech_stack}} apps parseable by AI agents - Schema.org, semantic HTML, and explicit state management.
```

### Technical Summary (30 seconds)

```text
AI agents can't parse most web apps - they need explicit structure. MX compliance is a spec that fixes this: Schema.org JSON-LD for content typing, data-* attributes for state, semantic HTML for structure, and ARIA for interactivity. For {{tech_stack}}, the implementation is straightforward - mostly metadata and HTML patterns, plus some TypeScript interfaces for type safety. The spec is open and the tooling includes validators and generators.
```

### README Description

```text
## MX Compliance

Machine Experience (MX) compliance makes your {{tech_stack}} application parseable by AI agents.

### Why?
AI assistants (Claude, ChatGPT, browser agents) can't understand dynamic web apps. They need explicit structure.

### What?
- Schema.org JSON-LD in your `<head>`
- `data-*` attributes for state management
- Semantic HTML (proper headings, landmarks, lists)
- ARIA attributes for interactive components

### Quick Start
\`\`\`typescript
import { generateMXMetadata } from 'mx-compliance';

const metadata = generateMXMetadata({
  contentType: 'product',
  state: 'published',
  description: 'Product description'
});
\`\`\`

### Spec
Full specification: {{github_link}}
```

---

## Code Review Comment Prompt

```text
Generate a constructive code review comment suggesting MX compliance
improvements for a {{tech_stack}} component.

The component:
- Renders product information
- Has loading/error/success states
- Uses CSS classes for state indication
- Missing Schema.org markup
- Missing data-* attributes for state

Tone: Helpful peer review, not criticism. Include code suggestions.
```

---

## Documentation Contribution Prompt

```text
Generate documentation for implementing MX compliance in {{tech_stack}}.

Include:
- Installation/setup steps
- TypeScript interfaces for MX metadata
- Component patterns (with code examples)
- State management approach
- Testing and validation
- Common mistakes to avoid

Format: Technical README style, minimal prose, maximum code examples.
Context: Developers familiar with {{tech_stack}} but new to MX compliance.
```
