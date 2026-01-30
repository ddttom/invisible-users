---
title: "MX Compliance for CMS Agencies"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Guide for digital agencies on delivering MX-compliant websites and offering AI-readiness as a service to clients."
keywords: [cms-agencies, mx-compliance, digital-agencies, client-services, ai-readiness]
audience: "CMS Agencies"
ai-instruction: |
  This document is written for digital agencies that build and maintain websites for clients.
  Focus on service offerings, client communication, and practical implementation across
  different CMS platforms.
---

# MX Compliance for CMS Agencies

A practical guide for digital agencies delivering AI-ready websites.

## Executive Summary

**The Opportunity:** Your clients are asking about AI compatibility. MX compliance offers a structured, sellable service that differentiates your agency and creates ongoing revenue.

**The Approach:** Layer MX compliance onto existing CMS implementations through metadata, templates, and content governance.

**The Value:** New service line, higher project values, recurring audit and maintenance revenue.

## Why Your Clients Need MX Compliance

### Client Questions You're Already Hearing

- "How do we show up in AI search results?"
- "Can ChatGPT find information on our website?"
- "Are we optimised for voice assistants?"
- "What about AI shopping agents?"

### The Business Case for Clients

| Without MX | With MX |
|------------|---------|
| Content may be invisible to AI | Content discoverable by AI agents |
| No competitive advantage | Early adopter positioning |
| Accessibility as afterthought | Accessibility built-in |
| Technical debt accumulates | Future-proofed architecture |

## Service Offerings

### 1. MX Compliance Audit

**Deliverable:** Assessment report with compliance score and recommendations

**Scope:**
- Evaluate current metadata completeness
- Assess semantic HTML structure
- Test Schema.org implementation
- Check WCAG 2.1 AA compliance
- Review content workflow

**Pricing Model:** Fixed fee based on site size

**Timeline:** 1-2 weeks

**Output Example:**
```text
MX Compliance Audit Report
==========================
Overall Score: 47/100 (Basic)

Metadata:     35/100 - Missing descriptions, no AI instructions
Structure:    55/100 - Good headings, missing landmarks
Schema.org:   40/100 - Basic, missing author/publisher
Accessibility: 60/100 - Contrast issues, focus states missing
Workflow:     N/A     - No state tracking implemented

Priority Recommendations:
1. Add meta descriptions to all pages
2. Implement Schema.org Article/Product markup
3. Fix colour contrast on buttons
4. Add MX metadata fields to CMS
```

### 2. MX Implementation

**Deliverable:** MX-compliant website with documentation

**Scope:**
- Add MX metadata fields to CMS
- Create compliant templates/themes
- Implement Schema.org markup
- Configure workflow states
- Train content team

**Pricing Model:** Project-based, typically 20-40% premium on standard builds

**Timeline:** Included in project timeline or 4-8 weeks for retrofit

### 3. MX Content Migration

**Deliverable:** Existing content enhanced with MX metadata

**Scope:**
- Audit existing content inventory
- Generate/enhance descriptions
- Add keywords and AI instructions
- Implement Schema.org for each content type
- Validate and quality check

**Pricing Model:** Per-page or per-content-type pricing

**Timeline:** Varies by content volume

### 4. Ongoing MX Maintenance

**Deliverable:** Monthly compliance monitoring and optimisation

**Scope:**
- Monthly compliance score tracking
- New content review
- Schema.org updates
- Accessibility monitoring
- Quarterly recommendations report

**Pricing Model:** Monthly retainer

**Timeline:** Ongoing

## Implementation by CMS Platform

### WordPress

**Metadata Storage:**
```php
// Add MX metadata to posts
function add_mx_metadata($post_id) {
    $mx_metadata = [
        'mx_id' => wp_generate_uuid4(),
        'mx_version' => 1,
        'mx_content_type' => get_post_type($post_id),
        'mx_state' => 'draft',
        'mx_description' => '',
        'mx_keywords' => [],
        'mx_ai_instruction' => ''
    ];
    update_post_meta($post_id, 'mx_metadata', $mx_metadata);
}
```

**Template Output:**
```php
// In theme header.php
<?php
$mx = get_post_meta(get_the_ID(), 'mx_metadata', true);
if ($mx): ?>
<meta name="mx-compliant" content="true">
<meta name="mx-content-type" content="<?php echo esc_attr($mx['mx_content_type']); ?>">
<meta name="mx-state" content="<?php echo esc_attr($mx['mx_state']); ?>">
<?php endif; ?>
```

**Recommended Plugins:**
- Yoast SEO (enhance with MX fields)
- Advanced Custom Fields (MX metadata panel)
- Schema Pro (JSON-LD generation)

### Drupal

**Metadata Storage:**
- Create custom fields on content types
- Use Paragraphs for structured MX data
- Leverage Entity API for state management

**Template Output:**
- Twig templates with MX meta tags
- JSON-LD block in page templates
- Preprocess functions for Schema.org

### Headless CMS (Contentful, Strapi, Sanity)

**Metadata Storage:**
- Add MX fields to content models
- Create MX validation rules
- Use webhooks for state transitions

**Template Output:**
- Frontend framework handles output
- Provide MX component library
- SSR/SSG with meta tag injection

### Static Site Generators (Hugo, Jekyll, Eleventy)

**Metadata Storage:**
- YAML frontmatter in markdown
- Data files for global MX config
- Build-time validation

**Template Output:**
- Partial templates for MX meta tags
- Shortcodes for Schema.org
- Build pipeline validation

## Client Communication

### Explaining MX to Clients

**Simple Explanation:**
> "MX compliance means your website content is structured so AI assistants can understand it, find it, and take action on it. Think of it like making your website fluent in the language AI speaks."

**Business Explanation:**
> "AI agents like ChatGPT, Google's AI, and shopping assistants are increasingly how people find and interact with businesses. MX compliance ensures your content is discoverable and usable by these systems - similar to how SEO made you visible in search engines."

**Technical Explanation:**
> "MX compliance adds structured metadata to your content - descriptions, keywords, Schema.org markup, and AI-specific instructions. This metadata helps AI agents understand what your content is about, how reliable it is, and what actions are possible."

### Handling Objections

**"We already have SEO"**
> "SEO optimises for search engine crawlers. MX optimises for AI agents that actually read and understand your content. They work together - MX builds on good SEO practices."

**"Is this really necessary now?"**
> "AI agents are already visiting websites. By implementing MX now, you're ahead of competitors and prepared for the shift. It's also an accessibility improvement, which may be legally required."

**"What's the ROI?"**
> "Direct ROI comes from: increased AI discovery (new traffic source), accessibility compliance (risk reduction), improved content governance (operational efficiency). Indirect ROI: competitive positioning and future-proofing."

### Proposal Language

**Scope Section:**
> "MX Compliance Implementation: Structure website content for AI agent compatibility including metadata infrastructure, Schema.org markup, and WCAG 2.1 AA accessibility compliance."

**Benefits Section:**
> "AI-Ready Content: Ensure content is discoverable and actionable by AI assistants, voice agents, and automated systems. Future-proof against evolving AI capabilities."

## Quality Assurance Checklist

### Pre-Launch MX Validation

**Metadata:**
- [ ] All pages have MX meta tags
- [ ] Descriptions under 155 characters
- [ ] Keywords present (3-5 per page)
- [ ] AI instructions for key content

**Structure:**
- [ ] Single H1 per page
- [ ] Heading hierarchy (no skipping)
- [ ] ARIA landmarks present
- [ ] Skip link implemented

**Schema.org:**
- [ ] JSON-LD validates (schema.org/validate)
- [ ] Appropriate type for content
- [ ] Author/publisher present
- [ ] Dates in ISO 8601 format

**Accessibility:**
- [ ] Colour contrast passes (4.5:1)
- [ ] Focus indicators visible
- [ ] Images have alt text
- [ ] Forms have labels

### Tools for Validation

- **HTML Validation:** `npx html-validate`
- **Accessibility:** Pa11y, WAVE, Lighthouse
- **Schema.org:** Google Rich Results Test
- **Contrast:** WebAIM Contrast Checker

## Training Content Teams

### MX Author Training (1 hour)

**Topics:**
1. Why MX matters (10 min)
2. Required fields walkthrough (20 min)
3. Writing descriptions and keywords (15 min)
4. AI instructions guidance (10 min)
5. Q&A (5 min)

**Materials:**
- Field-by-field guide
- Example content with good MX
- Common mistakes to avoid
- Quick reference card

### MX Administrator Training (2 hours)

**Topics:**
1. MX compliance overview (15 min)
2. CMS configuration (30 min)
3. Workflow management (30 min)
4. Validation and monitoring (30 min)
5. Troubleshooting (15 min)

**Materials:**
- Admin configuration guide
- Workflow documentation
- Validation checklist
- Support escalation process

## Pricing Strategy

### Project Pricing

| Service | Small Site (<50 pages) | Medium Site (50-200) | Large Site (200+) |
|---------|----------------------|---------------------|------------------|
| MX Audit | £1,500 - £2,500 | £2,500 - £5,000 | £5,000 - £10,000 |
| MX Implementation | £3,000 - £8,000 | £8,000 - £20,000 | £20,000+ |
| Content Migration | £30-50/page | £25-40/page | £20-30/page |

### Retainer Pricing

| Tier | Monthly Fee | Includes |
|------|-------------|----------|
| Basic | £500 | Monthly audit, compliance report |
| Standard | £1,000 | + Content review, recommendations |
| Premium | £2,000 | + Implementation support, training |

## Case Study Template

### Client Challenge
> [Client name] needed to ensure their [industry] website was discoverable by AI agents while maintaining [specific requirement].

### Our Approach
> We implemented MX compliance across [number] pages, including [specific implementations].

### Results
> - MX Compliance Score: [Before] → [After]
> - [Specific metric improvement]
> - [Business outcome]

### Client Quote
> "[Quote about AI-readiness and agency value]"

## Next Steps for Your Agency

1. **Build internal expertise** - Review MX specifications, implement on agency site
2. **Create service packages** - Define audit, implementation, and maintenance offerings
3. **Update proposals** - Add MX compliance to standard project scope
4. **Train team** - Ensure developers and content strategists understand MX
5. **Market the service** - Blog posts, case studies, client communications

## Related Documentation

- [CMS Compliance Specification](../../docs/structure/cms-compliance.md) ("MX-Compliant CMS Metadata Specification" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/cms-compliance.md>) - Technical requirements
- [Webpage Compliance Specification](../../docs/structure/mx-compliance.md) ("MX-Compliant Webpage Specification" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/mx-compliance.md>) - Output requirements
- [Markdown Compliance](../../docs/structure/mx-compliance-markdown.md) ("MX-Compliant Markdown Specification" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/mx-compliance-markdown.md>) - Content authoring
- [CLAUDE.md](../../CLAUDE.md) ("CLAUDE.md" at <https://github.com/ddttom/invisible-users/blob/main/CLAUDE.md>) - MX concepts overview
