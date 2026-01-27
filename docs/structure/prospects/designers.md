---
title: "Designer Outreach Templates"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Prompt templates for outreach to UX/UI designers about MX compliance and accessible design patterns."
keywords: [designers, outreach, email-templates, ux, ui, accessibility, wcag]
audience: "designers"
mx-content-type: "prompt-template"
mx-state: "published"
ai-instruction: |
  These templates target UX/UI designers. Focus on:
  - Visual design that supports accessibility
  - Design patterns that work for AI agents and humans
  - The convergence principle (AI + accessibility)
  - Practical component specifications
  Avoid overly technical language; focus on design outcomes.
variables:
  - name: prospect_name
    description: "Designer's name"
    example: "Maya Patel"
  - name: prospect_company
    description: "Their company"
    example: "DesignStudio"
  - name: prospect_role
    description: "Their position"
    example: "Senior UX Designer"
  - name: design_tool
    description: "Their primary design tool"
    example: "Figma"
  - name: project_context
    description: "Type of project they work on"
    example: "e-commerce interfaces"
  - name: sender_name
    description: "Your name"
    example: "Tom Cranstoun"
  - name: meeting_link
    description: "Calendar booking URL"
    example: "https://calendly.com/tomcranstoun"
---

# Designer Outreach Templates

Templates for reaching UX/UI designers about MX compliance.

---

## Cold Email

### Subject Lines

1. `Design patterns that work for AI and humans`
2. `The convergence principle: AI + accessibility`
3. `Quick question about {{project_context}} design`
4. `Designing for the invisible users`
5. `Visual hierarchy meets machine readability`

### Body Template

```text
Hi {{prospect_name}},

I've been working on something that bridges AI-agent compatibility and accessibility - and I think designers are the key to getting it right.

Here's the insight: the same design patterns that help AI agents understand interfaces also help screen reader users, keyboard navigators, and people with cognitive disabilities. It's called the convergence principle.

For example:
- Clear visual hierarchy = proper heading structure
- Visible focus states = keyboard accessibility
- Explicit state indicators = machine-readable attributes

I've put together design specifications for MX-compliant interfaces. Would you be interested in reviewing them? I'd value a designer's perspective.

{{sender_name}}
```

### Call to Action Options

- "Would you review the design specs?"
- "Can I send you the component patterns?"
- "Would a 20-minute walkthrough be useful?"
- "Want to see the {{design_tool}} component library?"

---

## Follow-up Email

### Subject Lines

1. `Re: Design patterns for AI + accessibility`
2. `Added {{design_tool}} resources`
3. `Thought you'd appreciate this convergence example`

### Body Template

```text
Hi {{prospect_name}},

Quick follow-up on MX-compliant design patterns.

I put together a visual showing the convergence principle:

**Same pattern, multiple benefits:**
- Button with visible focus state
- → AI agents: can identify interactive elements
- → Screen readers: clear focus indication
- → Keyboard users: know where they are
- → All users: better visual feedback

I'd love your input on the {{design_tool}} components I'm building. Your {{project_context}} experience would be valuable.

20 minutes?

{{sender_name}}

{{meeting_link}}
```

---

## Event Invite

### Subject Lines

1. `Workshop: Designing for AI Agents and Accessibility`
2. `Invite: The Convergence Design Principles`
3. `Design session: Patterns that work for everyone`

### Body Template

```text
Hi {{prospect_name}},

I'm hosting a design workshop on {{event_date}} about creating interfaces that work for both AI agents and accessibility users.

We'll cover:
- The convergence principle (why AI and accessibility align)
- Colour contrast requirements that benefit everyone
- Focus state patterns
- Component specifications for handoff
- How to document designs for MX compliance

This is specifically for designers - practical patterns, not technical implementation.

Interested?

Register: {{event_link}}

{{sender_name}}
```

---

## LinkedIn Message

### Connection Request Note

```text
Hi {{prospect_name}} - I'm working on design patterns that serve both AI agents and accessibility users (what I call the convergence principle). Given your {{project_context}} work, thought you might find it interesting. Happy to share the specs.
```

### Follow-up Message

```text
Thanks for connecting!

The core idea: patterns that help AI agents understand interfaces also help screen reader users, keyboard navigators, and others.

I've been putting together {{design_tool}} components and design specs. Would love a designer's perspective.

Worth a quick chat? {{meeting_link}}
```

---

## Descriptions

### One-liner

```text
MX compliance is a set of design patterns that make interfaces understandable to both AI agents and accessibility users - the convergence principle in action.
```

### Elevator Pitch (30 seconds)

```text
AI agents and accessibility users face the same challenge: understanding interfaces designed primarily for visual consumption. MX compliance addresses both with converging patterns - clear visual hierarchy that maps to semantic structure, visible state indicators that are also machine-readable, focus states that serve keyboard users and AI parsers alike. For designers, it's about specifications that serve multiple audiences without compromise.
```

### Portfolio Description

```text
**MX-Compliant Design Patterns**

This design system implements Machine Experience (MX) compliance - a specification for creating interfaces that work for both AI agents and accessibility users.

Key principles:
- **Convergence**: Patterns that serve multiple audiences (AI, screen readers, keyboard users)
- **Explicit state**: Visual indicators that are also machine-readable
- **Semantic hierarchy**: Visual design that matches content structure
- **WCAG 2.1 AA**: Colour contrast, focus indicators, touch targets

Components include specifications for:
- Colour system with documented contrast ratios
- Typography scale with semantic mapping
- Focus state patterns
- State indicators (loading, error, success)
- Touch target sizing
- Design-to-development handoff documentation
```

---

## Design Critique Prompt

```text
Generate constructive design feedback for a {{project_context}} interface
from an MX compliance perspective.

Issues to address:
- Low contrast text (decorative)
- Missing visible focus states
- State indicated only by colour
- Small touch targets on mobile
- Visual hierarchy doesn't match heading structure

Tone: Constructive peer feedback, focus on solutions not problems.
Include specific fixes and WCAG references where relevant.
```

---

## Component Spec Prompt

```text
Generate a design specification for an MX-compliant button component.

Include:
- All states (default, hover, focus, active, disabled, loading)
- Colour values with contrast ratios
- Size variants with touch target compliance
- Focus indicator specifications
- State attribute documentation for developers
- Accessibility considerations

Format: Design spec that a developer can implement directly.
Tool context: {{design_tool}} component documentation style.
```

---

## Objection Handling Prompts

### "This sounds like accessibility, which we already do"

```text
Generate a response explaining the relationship between MX compliance
and accessibility, including:
- How they overlap (the convergence principle)
- What MX adds beyond WCAG (AI agent parsing, explicit state)
- Why both matter for {{project_context}}
Tone: Collaborative, not corrective.
```

### "Won't this make designs look boring/constrained?"

```text
Generate a response showing how MX compliance constraints actually
improve design quality, including:
- Examples of beautiful, compliant designs
- How constraints drive creativity
- The professional credibility of accessible design
Context: Designer concerned about creative freedom.
```

### "Developers handle the technical stuff"

```text
Generate a response explaining why designers need to understand MX compliance,
including:
- Design decisions that affect compliance (hierarchy, contrast, states)
- Handoff documentation requirements
- Collaboration benefits when designers understand constraints
Tone: Partnership, not criticism.
```
