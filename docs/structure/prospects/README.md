---
title: "MX Compliance Prospect Outreach Templates"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Prompt templates for generating personalised outreach content (emails, invites, descriptions) for MX compliance prospects across different audience types."
keywords: [prospects, outreach, email-templates, prompts, sales-enablement, mx-compliance]
mx-content-type: "template-collection"
mx-state: "published"
ai-instruction: |
  This folder contains prompt templates for generating prospect outreach content.
  Each file is structured with YAML frontmatter containing the prompt templates.

  To use these templates:
  1. Select the appropriate audience file
  2. Choose the content type (email, invite, description)
  3. Fill in the variables (marked with {{variable_name}})
  4. Use the prompt with an AI assistant to generate personalised content

  The templates follow MX principles:
  - Structured metadata in frontmatter
  - Clear variable placeholders
  - Consistent formatting across audiences
  - AI-parseable structure
---

# MX Compliance Prospect Outreach Templates

Prompt templates for generating personalised outreach content.

## Overview

This folder contains structured prompt templates for creating outreach content targeting different audience types interested in MX compliance. Each template is designed to be used with AI assistants to generate personalised emails, event invites, and promotional descriptions.

## How to Use These Templates

### 1. Select Your Audience

| Audience | File | Best For |
|----------|------|----------|
| CMS Vendors | [cms-vendors.md](./cms-vendors.md) ("CMS Vendor Outreach Templates" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/prospects/cms-vendors.md>) | WordPress, Drupal, Ghost teams |
| CMS Agencies | [cms-agencies.md](./cms-agencies.md) ("CMS Agency Outreach Templates" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/prospects/cms-agencies.md>) | Digital agencies, web consultancies |
| Platform Creators | [platform-creators.md](./platform-creators.md) ("Platform Creator Outreach Templates" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/prospects/platform-creators.md>) | SaaS founders, platform architects |
| Conference Organisers | [conference-organisers.md](./conference-organisers.md) ("Conference Organiser Outreach Templates" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/prospects/conference-organisers.md>) | Event planners, conference teams |
| CEOs | [ceo.md](./ceo.md) ("CEO/Executive Outreach Templates" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/prospects/ceo.md>) | Executive leadership |
| Product Owners | [product-owners.md](./product-owners.md) ("Product Owner Outreach Templates" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/prospects/product-owners.md>) | Product managers |
| Developers | [developers.md](./developers.md) ("Developer Outreach Templates" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/prospects/developers.md>) | Software engineers |
| Designers | [designers.md](./designers.md) ("Designer Outreach Templates" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/prospects/designers.md>) | UX/UI designers |

### 2. Choose Content Type

Each file contains templates for:

- **Cold Email** - Initial outreach to new prospects
- **Follow-up Email** - Second touch after no response
- **Event Invite** - Invitation to webinar, workshop, or meeting
- **LinkedIn Message** - Short-form professional outreach
- **One-liner Description** - Elevator pitch for this audience
- **Paragraph Description** - Longer promotional copy

### 3. Fill Variables

Templates use `{{variable_name}}` placeholders:

```text
Common Variables:
{{prospect_name}}      - Recipient's name
{{prospect_company}}   - Their company/organisation
{{prospect_role}}      - Their job title
{{prospect_platform}}  - Their technology platform (if known)
{{sender_name}}        - Your name
{{sender_company}}     - Your company
{{sender_role}}        - Your job title
{{meeting_link}}       - Calendar booking link
{{resource_link}}      - Link to relevant resource
{{event_date}}         - Event date/time
{{event_title}}        - Event name
```

### 4. Generate Content

Use the prompt with an AI assistant:

```text
Using the following template, generate a cold email for:
- Prospect: Jane Smith, CTO at TechCorp
- Their platform: Custom React application
- Pain point: Poor SEO performance

[Paste template here]
```

## Template Structure

Each audience file follows this structure:

```yaml
---
title: "Audience Name Outreach Templates"
audience: "audience-type"
ai-instruction: "Context for AI generating content"
variables:
  - name: "variable_name"
    description: "What this variable represents"
    example: "Example value"
---

## Cold Email

### Subject Lines
[Multiple options]

### Body Template
[Email body with {{variables}}]

### Call to Action Options
[Multiple CTA options]

---

## Follow-up Email
[Similar structure]

---

## Event Invite
[Similar structure]

---

## LinkedIn Message
[Similar structure]

---

## Descriptions
[One-liner and paragraph versions]
```

## Best Practices

### Personalisation

- Always research the prospect before sending
- Reference specific challenges they face
- Mention their technology stack if known
- Note recent news or achievements

### Tone by Audience

| Audience | Tone | Focus |
|----------|------|-------|
| CEOs | Strategic, ROI-focused | Business outcomes |
| Developers | Technical, practical | Code examples, implementation |
| Designers | Visual, accessibility-focused | UX patterns, WCAG |
| Product Owners | Feature-focused, metrics | User stories, KPIs |
| Agencies | Partnership, revenue | Service opportunities |
| Vendors | Competitive, feature | Platform differentiation |

### Subject Line Tips

- Keep under 50 characters
- Personalise when possible
- Create curiosity without clickbait
- A/B test different approaches

### Email Length Guidelines

| Type | Length | Paragraphs |
|------|--------|------------|
| Cold email | 100-150 words | 3-4 short |
| Follow-up | 50-75 words | 2-3 |
| Event invite | 75-100 words | 3 |
| LinkedIn | 50-75 words | 2-3 |

## Tracking and Iteration

### Metrics to Track

- Open rate (subject line effectiveness)
- Reply rate (message resonance)
- Meeting conversion (CTA effectiveness)
- Time to response

### Template Versioning

When updating templates:
1. Note the change in the file's version history
2. Track performance differences
3. Keep high-performing variants

## Related Documentation

- [Use Cases](../use-cases/) - Detailed audience guides
- [CMS Compliance](../cms-compliance.md) ("MX-Compliant CMS Metadata Specification" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/cms-compliance.md>) - Technical specification
- [CLAUDE.md](../CLAUDE.md) ("MX Concepts for AI Assistants" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/CLAUDE.md>) - MX concepts overview

## MX Compliance of This Folder

This folder follows MX principles:

- **YAML Frontmatter**: All files have structured metadata
- **AI Instruction**: Each file includes guidance for AI assistants
- **Consistent Structure**: Templates follow predictable patterns
- **Variable Schema**: Documented placeholders with examples
- **Machine-Parseable**: Content can be programmatically processed
