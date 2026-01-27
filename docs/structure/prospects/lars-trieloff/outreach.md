---
title: "Lars Trieloff - MX + Edge Delivery Services"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Technical outreach for Lars Trieloff, Principal at Adobe and architect of Edge Delivery Services."
keywords: [lars-trieloff, adobe, edge-delivery-services, aem, helix, mx, structured-data]
mx-content-type: "personal-outreach"
mx-state: "published"
relationship: "professional-friend"
ai-instruction: |
  Lars Trieloff is a Principal at Adobe, architect of Edge Delivery Services
  (Project Helix), and has 20+ years in CMS/DXP. This is deeply technical
  outreach focused on how MX patterns could integrate with EDS architecture.
prospect:
  name: "Lars Trieloff"
  title: "Principal"
  company: "Adobe"
  location: "Potsdam, Germany"
  linkedin: "https://www.linkedin.com/in/trieloff/"
  github: "https://github.com/trieloff"
  medium: "https://medium.com/@trieloff"
  slideshare: "https://www.slideshare.net/lars3loff"
  adapt_to: "https://adapt.to/speakers/lars-trieloff"
  education: "MSc Software Systems Engineering, Hasso Plattner Institute"
  background:
    - "Principal at Adobe (Edge Delivery Services)"
    - "Former Director of Product Management, Blue Yonder"
    - "Product Management at Adobe and Day Software"
    - "Apache Cocoon Committer"
    - "Developer at SAP"
    - "20+ years CMS/DXP experience"
  current_focus:
    - "Edge Delivery Services (EDS)"
    - "Project Helix"
    - "Cloud-native architectures"
    - "API-first approaches"
  achievements:
    - "300+ websites launched on EDS including Adobe.com"
    - "Key architect of AEM evolution"
    - "Industry conference speaker"
---

# Lars Trieloff - MX + Edge Delivery Services

**Principal at Adobe, architect of Edge Delivery Services, 20+ years shaping content management.**

---

## Why This Conversation Matters

Lars Trieloff is one of the people who decides how Adobe Experience Manager evolves. Edge Delivery Services - his current focus - represents Adobe's vision for the next generation of content delivery.

**MX patterns at the edge could make EDS-powered sites the most AI-discoverable on the web.**

This isn't about selling anything. It's a technical conversation about where content delivery and AI discoverability intersect.

---

## Lars's Profile

| Attribute | Detail |
|-----------|--------|
| **Role** | Principal, Adobe |
| **Focus** | Edge Delivery Services (Project Helix) |
| **Location** | Potsdam, Germany |
| **Education** | MSc Software Systems Engineering, Hasso Plattner Institute |
| **Background** | Day Software → Adobe → Blue Yonder → Adobe |
| **Open Source** | Apache Cocoon Committer |

### Current Work: Edge Delivery Services

Edge Delivery Services (EDS) is Adobe's serverless, edge-first approach to content delivery:

- **Serverless functions** for content processing and rendering
- **Fastly edge platform** for request processing, caching, optimisation
- **Performance-first** architecture
- **300+ sites launched** including Adobe.com

EDS represents the future of AEM - cloud-native, API-first, performance-optimised.

### Why He Matters for MX

1. **Architecture influence** - He shapes how AEM delivers content
2. **Edge computing expertise** - MX metadata could be generated/injected at the edge
3. **API-first thinking** - Aligns with structured, machine-readable content
4. **Standards background** - Apache committer understands open standards value
5. **Technical depth** - Can evaluate MX patterns at implementation level

---

## The Technical Opportunity

### Edge + MX = AI-Discoverable Performance

Edge Delivery Services optimises for **speed**. MX optimises for **discoverability**.

Combined:

```
Content authored in AEM
         ↓
Edge functions process content
         ↓
MX metadata generated/injected at edge
         ↓
Response includes Schema.org + semantic HTML + MX tags
         ↓
Fast delivery + AI parseable
```

**The edge is the perfect place to add MX compliance:**

- No origin server overhead
- Consistent application across all content
- Can be toggled per-site or globally
- Cacheable structured data

### Specific Integration Points

#### 1. Schema.org Generation at Edge

```javascript
// Edge function pseudocode
async function handleRequest(request, content) {
  const contentType = detectContentType(content);
  const schemaOrg = generateSchemaOrg(content, contentType);

  return injectStructuredData(content, schemaOrg);
}
```

Content type detection → Schema.org generation → injection. All at the edge.

#### 2. Semantic HTML Transformation

EDS already transforms content. Adding semantic landmarks:

```javascript
// Ensure semantic structure
function ensureSemanticHTML(html) {
  // Add main landmark if missing
  // Ensure heading hierarchy
  // Add ARIA landmarks for sections
  return transformedHTML;
}
```

#### 3. MX Meta Tag Injection

```html
<!-- Injected by edge function -->
<meta name="mx-compliant" content="true">
<meta name="mx-version" content="1.0">
<meta name="mx-content-type" content="article">
<meta name="mx-generated" content="edge">
```

#### 4. State Exposure for Dynamic Content

For interactive components, edge-side state initialisation:

```html
<div data-component="product-selector"
     data-state="ready"
     data-product-count="12"
     aria-live="polite">
```

---

## Conversation Angles

### Angle 1: Performance + Discoverability

> "Lars, Edge Delivery Services nails performance. But there's a complementary dimension: AI discoverability. When someone asks Claude 'recommend a good CMS,' do EDS-powered sites appear? They should - they're fast, modern, well-architected. But AI agents can't parse unstructured content. MX patterns could make EDS sites the most AI-discoverable on the web."

### Angle 2: Edge as MX Layer

> "The edge is actually the ideal place to add MX compliance. No origin overhead, consistent application, cacheable. You're already transforming content at the edge - adding Schema.org and semantic structure is a natural extension. Have you thought about structured data generation as an edge function?"

### Angle 3: Competitive Differentiation

> "Every DXP is chasing performance now. EDS is ahead, but others will catch up. AI discoverability is the next differentiator. If AEM sites are automatically MX-compliant through EDS, that's a genuine competitive advantage. 'Your content, delivered fast AND AI-parseable.'"

### Angle 4: Standards Alignment

> "You've got Apache background - you understand the value of open standards. MX is built entirely on established standards: Schema.org, semantic HTML, ARIA. No proprietary lock-in. It's the kind of approach that could become an industry baseline, and Adobe could help set that baseline."

### Angle 5: The January 2026 Context

> "In January 2026, Amazon, Microsoft, and Google all launched agent commerce systems within a week. AI-mediated interaction is becoming infrastructure. The CMS platforms that make content agent-readable will win the next decade. EDS is already positioned for performance - adding discoverability completes the picture."

---

## Technical Deep Dive Topics

### For a Technical Conversation

1. **Edge function architecture for MX**
   - Where in the EDS pipeline would Schema.org generation fit?
   - Caching implications for structured data
   - Content type detection heuristics

2. **Schema.org mapping for AEM content types**
   - Page → WebPage
   - Article → Article
   - Product → Product
   - How does EDS currently handle content typing?

3. **Semantic HTML in Helix/EDS**
   - Current landmark usage
   - Heading hierarchy enforcement
   - ARIA integration points

4. **State management at the edge**
   - Initial state exposure
   - Hydration considerations
   - Server-side vs client-side state

5. **Performance impact analysis**
   - Edge function latency for MX generation
   - Response size increase from structured data
   - Cache efficiency with metadata

### Questions Lars Might Ask

#### "What's the performance overhead?"

> "Minimal. Schema.org JSON-LD adds ~1-2KB to response size. Edge function processing adds microseconds. The structured data is highly cacheable. Net impact on Core Web Vitals should be negligible - and the discoverability benefit is significant."

#### "Doesn't Google already handle Schema.org?"

> "For search, yes. But AI agents aren't Google. Claude, ChatGPT, Perplexity - they're parsing content directly, not using search indexes. Schema.org gives them explicit typing and relationships. It's the same vocabulary, different consumer."

#### "Why should Adobe care about AI discoverability?"

> "Because AI-assisted discovery is becoming a primary channel. When someone asks an AI 'what CMS should I use,' the AI synthesises from content it can parse. Adobe's documentation, customer sites, partner content - if it's machine-readable, Adobe appears in those conversations. If not, competitors do."

#### "How does this fit with Adobe's AI strategy?"

> "Adobe's building AI into products - Firefly, Sensei, generative features. MX addresses the complementary challenge: making Adobe-powered content visible to external AI. Internal AI + external discoverability = complete AI story."

#### "Is there an open standard here?"

> "MX is built entirely on open standards - Schema.org, HTML5 semantics, ARIA. The MX specification documents how to combine them for AI discoverability. No proprietary components. Adobe could adopt, extend, or contribute to the specification."

---

## What Tom Could Offer

### Technical Collaboration

- **Architecture review** of MX integration with EDS
- **Prototype edge functions** for Schema.org generation
- **Content type mapping** from AEM types to Schema.org
- **Performance benchmarking** methodology

### Documentation

- **AEM-specific MX implementation guide**
- **Edge Delivery Services + MX patterns**
- **Migration path for existing AEM sites**

### Visibility

- **Case study** if Adobe pilots MX in EDS
- **Conference presentations** (adaptTo(), Adobe Summit)
- **CMS Critic coverage** (existing relationship with Matt Garrepy)

---

## Potential Outcomes

### Best Case

- Adobe evaluates MX for Edge Delivery Services
- Pilot implementation on select EDS sites
- Lars provides technical feedback on MX specification
- Path to native MX support in AEM

### Good Case

- Technical conversation shapes MX architecture thinking
- Lars connects Tom with relevant Adobe teams
- Input on how large-scale CMS platforms could adopt MX
- adaptTo() speaking opportunity on MX

### Minimum Case

- Valuable technical perspective from someone building next-gen CMS
- Understanding of enterprise-scale implementation challenges
- Relationship for future collaboration

---

## Conversation Preparation

### Opening

> "Lars, I wanted to talk through something that I think connects with Edge Delivery Services. You've built the performance layer for modern content delivery. I've been working on the discoverability layer - making that content parseable by AI agents. I'm curious how these might fit together."

### The Core Idea (90 seconds)

> "AI agents are becoming a primary way people discover content. But they can't parse most web content - it's built for human eyes. MX is a set of patterns that make content machine-readable: Schema.org for typing, semantic HTML for structure, explicit state for dynamics.
>
> The interesting architecture question: the edge is the perfect place to add this. You're already transforming content there. Schema.org generation, semantic structure enforcement - it's a natural extension of what EDS does.
>
> The result: fast sites that are also AI-discoverable. Performance plus discoverability."

### The Ask

> "I'd love your technical perspective. Does this make sense architecturally? Where would it fit in the EDS pipeline? What am I missing from an enterprise CMS standpoint?"

Listen more than talk. His experience with large-scale content systems will surface considerations you haven't thought of.

---

## Personal Notes

- **Builds exotic bicycles** in his workshop - genuine craftsman mindset
- **Potsdam-based** - Hasso Plattner Institute connection suggests rigorous engineering background
- **Long Adobe tenure** via Day Software - deep institutional knowledge
- **Apache committer** - values open source and standards

---

## References

- [Lars Trieloff - LinkedIn](https://www.linkedin.com/in/trieloff/)
- [Lars Trieloff - adaptTo()](https://adapt.to/speakers/lars-trieloff)
- [Lars Trieloff - GitHub](https://github.com/trieloff)
- [Adobe Tech Blog - Lars's Articles](https://blog.developer.adobe.com/fantastic-aem-configurations-and-how-to-code-them-edb5663e983f)
- [Edge Delivery Services - One Year In](https://experienceleague.adobe.com/en/docs/events/adobe-developers-live-recordings/2024/nov2024/aem-sites/edge-delivery-services)
- [Lessons in Innovation - Seerene Interview](https://www.seerene.com/news-research/lessons-in-innovation-insights-from-adobes-lars-trieloff)
- [aem.live Community](https://www.aem.live/community)
