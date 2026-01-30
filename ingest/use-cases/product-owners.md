---
title: "MX Compliance for Product Owners"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Guide for product owners on prioritising MX compliance in product roadmaps and measuring its business impact."
keywords: [product-owners, mx-compliance, product-management, roadmap, user-stories, ai-readiness]
audience: "Product Owners"
ai-instruction: |
  This document is written for product owners and product managers responsible for
  feature prioritisation and roadmap decisions. Focus on business value, user stories,
  acceptance criteria, and metrics.
---

# MX Compliance for Product Owners

A guide for prioritising and delivering MX compliance.

## Executive Summary

**What:** MX compliance ensures your product's content is accessible to AI agents - a rapidly growing user segment.

**Why:** AI agents are becoming significant traffic sources and conversion drivers. Products that ignore them lose market share.

**How:** Treat MX compliance as a feature set with clear user stories, acceptance criteria, and measurable outcomes.

## Understanding the User Segment

### AI Agents as Users

AI agents are a new user type with specific characteristics:

| Characteristic | Human Users | AI Agents |
|----------------|-------------|-----------|
| Navigation | Visual, intuitive | Structured, semantic |
| Content parsing | Flexible, contextual | Literal, metadata-driven |
| State understanding | Inferred from UI | Requires explicit data attributes |
| Error recovery | Adaptive | Fails without guidance |
| Volume | Individual sessions | Potentially massive scale |

### Business Impact

```text
Traffic Sources Evolution:
├── Direct: 20% (stable)
├── Search: 40% → 30% (declining)
├── Social: 15% (stable)
├── Referral: 10% (stable)
└── AI Agents: 5% → 25% (growing rapidly)
```

Products without MX compliance will miss the fastest-growing traffic segment.

## Roadmap Integration

### Where MX Fits

MX compliance is **infrastructure** that enables multiple business outcomes:

```text
MX Compliance (Foundation)
├── AI Discovery (Traffic)
│   └── AI search results
│   └── AI recommendations
│   └── Voice assistant answers
├── AI Commerce (Revenue)
│   └── AI shopping agents
│   └── Automated purchasing
│   └── Comparison queries
├── Accessibility (Compliance)
│   └── WCAG 2.1 AA
│   └── Legal requirements
│   └── Inclusive design
└── Content Quality (Operations)
    └── Structured metadata
    └── Consistent workflows
    └── Automated validation
```

### Prioritisation Framework

**Priority 1: Foundation (Must Have)**
- MX metadata fields in content model
- Basic state tracking
- Core HTML output compliance

**Priority 2: Discovery (Should Have)**
- Schema.org implementation
- AI instruction fields
- Semantic HTML structure

**Priority 3: Excellence (Nice to Have)**
- Compliance scoring dashboard
- AI preview mode
- Automated recommendations

## User Stories

### Epic: MX Metadata Infrastructure

**Story 1: Content Metadata**
```text
As a content creator
I want to add MX metadata to my content
So that AI agents can understand and categorise it

Acceptance Criteria:
- [ ] MX metadata panel available in content editor
- [ ] Required fields: description, keywords, content type
- [ ] Optional fields: AI instruction, schema type
- [ ] Metadata persists across saves
- [ ] Metadata accessible via API
```

**Story 2: Content Lifecycle**
```text
As a content manager
I want content to follow a defined lifecycle
So that only approved content is published to AI agents

Acceptance Criteria:
- [ ] States: draft, edit, preview, stage, published, archived
- [ ] State visible in content list and editor
- [ ] Transition requires appropriate permissions
- [ ] State change logged with timestamp and user
- [ ] Bulk state change available
```

**Story 3: Validation Gate**
```text
As a quality manager
I want content validated before publishing
So that published content meets MX standards

Acceptance Criteria:
- [ ] Compliance score calculated before publish
- [ ] Missing required fields block publishing
- [ ] Warnings shown for recommended fields
- [ ] Override available for administrators
- [ ] Validation results logged
```

### Epic: Compliant Output

**Story 4: HTML Meta Tags**
```text
As an AI agent
I want MX meta tags in page HTML
So that I can identify MX-compliant content

Acceptance Criteria:
- [ ] mx-compliant meta tag present
- [ ] mx-content-type reflects content type
- [ ] mx-state shows publication state
- [ ] Timestamps in ISO 8601 format
- [ ] All pages validated before deploy
```

**Story 5: Schema.org Markup**
```text
As an AI agent
I want Schema.org JSON-LD in pages
So that I can extract structured data

Acceptance Criteria:
- [ ] JSON-LD script tag in head
- [ ] @type matches content type
- [ ] Required fields populated (name, description, dates)
- [ ] Author/publisher information included
- [ ] Validates at schema.org/validate
```

**Story 6: Semantic Structure**
```text
As an assistive technology user
I want semantic HTML structure
So that I can navigate content efficiently

Acceptance Criteria:
- [ ] ARIA landmarks present (header, nav, main, footer)
- [ ] Single H1 per page
- [ ] Heading hierarchy (no skipped levels)
- [ ] Skip link to main content
- [ ] All images have alt text
```

### Epic: Monitoring and Reporting

**Story 7: Compliance Dashboard**
```text
As a product owner
I want to see compliance metrics
So that I can track MX adoption

Acceptance Criteria:
- [ ] Overall compliance score displayed
- [ ] Breakdown by content type
- [ ] Trend over time
- [ ] List of non-compliant content
- [ ] Export capability
```

**Story 8: Content Audit**
```text
As a content manager
I want to audit existing content
So that I can identify compliance gaps

Acceptance Criteria:
- [ ] Bulk audit of all content
- [ ] Issues categorised by severity
- [ ] Quick fix suggestions provided
- [ ] Progress tracking as issues resolved
- [ ] Scheduled audit capability
```

## Acceptance Criteria Patterns

### For MX Features

Every MX-related story should include:

```text
Given [precondition]
When [action]
Then [expected outcome]
And [MX-specific validation]
```

**Example:**
```text
Given a published blog post
When an AI agent requests the page
Then the response includes MX meta tags
And Schema.org JSON-LD is valid
And all required metadata fields are populated
And the page passes automated accessibility check
```

### Definition of Done

MX features are done when:

- [ ] Code complete and tested
- [ ] MX metadata fully populated
- [ ] HTML output validated
- [ ] Schema.org validates
- [ ] Accessibility checked (WCAG 2.1 AA)
- [ ] Documentation updated
- [ ] Metrics tracking enabled

## Metrics and KPIs

### Compliance Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Metadata completion | 95% | Required fields populated |
| Schema.org validity | 100% | Zero validation errors |
| Accessibility score | 90+ | Lighthouse/Pa11y score |
| Content with AI instruction | 80% | Optional field usage |

### Business Metrics

| Metric | Baseline | Target | Measurement |
|--------|----------|--------|-------------|
| AI agent traffic | Measure | +50% | Analytics AI bot segment |
| AI-assisted conversions | Measure | +25% | Attribution tracking |
| Accessibility compliance | Current | 100% | WCAG audit results |
| Content workflow efficiency | Measure | +20% | Time to publish |

### Leading Indicators

- MX feature adoption rate (users using MX fields)
- Time to compliance (new content reaching compliant state)
- Validation error rate (errors per content item)
- Schema.org coverage (% of content with valid markup)

## Sprint Planning

### Sample Sprint: MX Foundation

**Sprint Goal:** Enable MX metadata capture and storage

**Stories:**
1. Add MX metadata schema to database (5 points)
2. Create MX metadata API endpoints (5 points)
3. Build MX metadata UI panel (8 points)
4. Implement basic validation (3 points)
5. Add MX fields to content list view (2 points)

**Total:** 23 points

### Sample Sprint: MX Output

**Sprint Goal:** Generate MX-compliant HTML output

**Stories:**
1. Add MX meta tags to templates (3 points)
2. Generate Schema.org JSON-LD (5 points)
3. Implement semantic HTML components (8 points)
4. Build accessibility validation (5 points)
5. Create compliance report (5 points)

**Total:** 26 points

## Stakeholder Communication

### Executive Summary

> "MX compliance ensures our content is accessible to AI agents - the fastest-growing segment of web traffic. It also delivers WCAG accessibility compliance. Investment: [X] sprints. Expected ROI: [Y]% increase in AI-driven traffic within 6 months."

### Progress Updates

```text
MX Compliance Progress: Week 4

Completed:
✓ Metadata infrastructure (100%)
✓ State management (100%)
✓ Basic validation (100%)

In Progress:
◐ Schema.org output (60%)
◐ Accessibility audit (40%)

Upcoming:
○ Compliance dashboard
○ AI preview mode

Metrics:
- 78% of content has complete metadata
- 45% of pages have valid Schema.org
- Accessibility score: 72 → 85

Risks:
- Legacy content migration taking longer than expected
- Need additional accessibility testing resources
```

### Demo Script

1. Show content editor with MX metadata panel
2. Fill in MX fields, show validation
3. Preview content with Schema.org highlighted
4. Show compliance score calculation
5. Demonstrate AI agent accessing content
6. Display dashboard metrics

## Risk Management

### Technical Risks

| Risk | Mitigation |
|------|------------|
| Schema migration complexity | Incremental rollout, feature flags |
| Performance impact | Caching, lazy loading |
| Integration challenges | API-first design, documentation |

### Business Risks

| Risk | Mitigation |
|------|------------|
| Low adoption by content teams | Training, gamification, requirements |
| Unclear ROI | Baseline metrics, phased measurement |
| Competing priorities | Executive sponsorship, quick wins |

## Quick Reference

### MX Compliance Checklist

**Content has:**
- [ ] Description (max 155 chars)
- [ ] Keywords (3-5)
- [ ] Content type classification
- [ ] Lifecycle state

**Page includes:**
- [ ] MX meta tags
- [ ] Schema.org JSON-LD
- [ ] Semantic HTML structure
- [ ] ARIA landmarks

**Validation passes:**
- [ ] HTML validation
- [ ] Schema.org validation
- [ ] Accessibility check
- [ ] Link validation

## Related Documentation

- [CMS Compliance Specification](../cms-compliance.md) - Technical requirements
- [Webpage Compliance](../mx-compliance.md) - Output requirements
- [CLAUDE.md](../CLAUDE.md) - MX concepts for technical understanding
- [CEO Use Case](./ceo.md) ("MX Compliance for CEOs" at <https://github.com/ddttom/invisible-users/blob/main/ingest/use-cases/ceo.md>) - Executive perspective
