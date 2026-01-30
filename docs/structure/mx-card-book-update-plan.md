---
title: "MX-Card System - Book Update Plan"
author: "Tom Cranstoun"
date: "2026-01-26"
description: "Plan for incorporating MX-Card content into MX-Bible and MX-Handbook"
keywords: [mx-card, book-update, mx-bible, mx-handbook, chapters]
ai-instruction: "This document outlines book content updates. Follow Timeless Manuscript Rule."
status: "PLAN"
---

# MX-Card System - Book Update Plan

**Status:** PLAN
**Date:** 26 January 2026

---

## Overview

This plan outlines how to incorporate the MX-Card System concept into the existing book manuscripts (MX-Bible and MX-Handbook) to provide comprehensive coverage of this innovation.

---

## Content Integration Strategy

### MX-Bible (Comprehensive Guide)

The MX-Bible provides thorough coverage of concepts. MX-Card content should be:
- **Dedicated chapter** explaining the full system
- **Integrated references** in relevant existing chapters
- **Appendix entries** for technical specifications

### MX-Handbook (Implementation Guide)

The MX-Handbook focuses on practical implementation. MX-Card content should be:
- **Implementation patterns** for creating and consuming cards
- **Code examples** demonstrating card integration
- **Quick reference** for developers

---

## New Chapter: MX-Cards

### Proposed Chapter Outline (MX-Bible)

**Chapter Title:** "MX-Cards: Giving Physical Objects a Voice"

**Target Length:** 5,000-7,000 words

**Structure:**

```
1. Introduction: The Silent World Problem
   - Physical objects have no machine-readable voice
   - AI agents forced to guess or research
   - The hallucination cost

2. What Are MX-Cards?
   - Standardised machine-readable containers
   - The physical-digital bridge
   - Universal application (artworks to legal documents)

3. The Anti-Hallucination Value Proposition
   - How verified context reduces errors
   - Token expenditure savings
   - Trust through verification

4. Card Types and Capabilities
   - Plain cards (free)
   - Time-limited and scheduled cards
   - Encrypted cards with access levels
   - Owner contact routines

5. The MX-Registry
   - Domain-verified ownership
   - Business vs open-source tiers
   - Data sovereignty compliance

6. The Identity Layer
   - Personal preferences that travel with you
   - Inheritance model (allergies → menu filtering)
   - Privacy controls and selective sharing

7. QR Codes as the Bridge
   - Universal deployment
   - Static vs dynamic codes
   - Personalised property codes

8. Implementation Patterns
   - Creating your first MX-Card
   - Registering with the registry
   - Consuming cards as an agent

9. Case Studies
   - Museum artwork cards
   - Restaurant menu cards with identity layer
   - Legal document verification
   - Property visitor instructions

10. Future Directions
    - Agent-to-agent card sharing
    - Federated registries
    - Industry-specific card types
```

### Proposed Section (MX-Handbook)

**Section Title:** "Implementing MX-Cards"

**Target Length:** 2,500-3,500 words

**Structure:**

```
1. Quick Start: Your First MX-Card
   - Minimal card structure
   - QR code generation
   - Testing with an agent

2. Card Schema Reference
   - Required fields
   - Optional capabilities
   - Validation rules

3. Registry Integration
   - Domain verification
   - Token management
   - API endpoints

4. Identity Layer Patterns
   - Receiving identity data
   - Filtering responses
   - Privacy-preserving interactions

5. Code Examples
   - JavaScript/TypeScript implementation
   - Python implementation
   - Mobile SDK usage

6. Testing and Debugging
   - Card validators
   - Agent simulation
   - Common issues
```

---

## Existing Chapter Updates

### MX-Bible Updates

| Chapter | Update Required | Content to Add |
|---------|-----------------|----------------|
| Chapter 1 (Introduction) | Reference | Mention MX-Cards as emerging solution |
| Chapter 3 (Agent Capabilities) | Section | How agents discover and parse MX-Cards |
| Chapter 5 (Structured Data) | Section | MX-Cards as structured data extension |
| Chapter 8 (Physical World) | Major | Integrate MX-Card as primary solution |
| Chapter 10 (Implementation) | Section | MX-Card implementation patterns |
| Chapter 13 (Future) | Section | MX-Card ecosystem vision |

### MX-Handbook Updates

| Chapter | Update Required | Content to Add |
|---------|-----------------|----------------|
| Chapter 2 (Semantic HTML) | Reference | MX-Cards for physical object context |
| Chapter 4 (Structured Data) | Section | MX-Card JSON-LD integration |
| Chapter 7 (Implementation) | Section | Card creation and consumption |
| Chapter 10 (Testing) | Checklist | MX-Card validation steps |

---

## Appendix Additions

### New Appendix: MX-Card Technical Specification

**Appendix Title:** "Appendix M: MX-Card Technical Specification"

**Contents:**
- Complete JSON schema
- Field definitions and constraints
- API endpoint specifications
- Error codes and handling
- Registry protocol

### Updates to Existing Appendices

| Appendix | Update |
|----------|--------|
| Appendix D (AI-Friendly HTML) | Add MX-Card QR placement patterns |
| Appendix F (Implementation Roadmap) | Add MX-Card adoption phases |
| Appendix H (llms.txt) | Reference MX-Cards as complementary |
| Appendix L (Patterns) | Add MX-Card patterns |

---

## Code Examples Required

### New Code Examples (packages/shared-code-examples)

```
shared-code-examples/
├── mx-cards/
│   ├── basic-card/
│   │   ├── good/
│   │   │   ├── minimal-card.json
│   │   │   ├── artwork-card.json
│   │   │   └── menu-card.json
│   │   └── bad/
│   │       ├── missing-verification.json
│   │       └── invalid-schema.json
│   ├── identity-layer/
│   │   ├── good/
│   │   │   ├── dietary-preferences.json
│   │   │   └── accessibility-needs.json
│   │   └── bad/
│   │       └── oversharing-identity.json
│   ├── registry-integration/
│   │   ├── domain-verification.js
│   │   ├── card-registration.js
│   │   └── card-lookup.js
│   └── qr-generation/
│       ├── static-qr.js
│       ├── dynamic-qr.js
│       └── personalised-qr.js
```

---

## Illustration Requirements

### New SVG Illustrations

| Illustration | Description | Chapter |
|--------------|-------------|---------|
| mx-card-ecosystem.svg | Overview of card, registry, agent flow | New chapter |
| identity-layer-inheritance.svg | Preferences flowing to card responses | New chapter |
| qr-physical-bridge.svg | Physical object → QR → Card → Agent | New chapter |
| card-types-comparison.svg | Plain vs scheduled vs encrypted | New chapter |
| anti-hallucination-flow.svg | Before/after MX-Cards | New chapter |

### Style Guide

Follow existing book SVG style:
- Clean, minimal design
- Consistent colour palette
- Accessible contrast ratios
- See `config/book/book-svg-style.md`

---

## Writing Schedule

### Phase 1: New Chapter Draft (Priority 1)

| Task | Target | Effort |
|------|--------|--------|
| Chapter outline finalisation | Week 1 | 2 hours |
| Introduction and problem statement | Week 1 | 4 hours |
| Core sections (2-6) | Week 2 | 8 hours |
| Implementation and case studies | Week 3 | 6 hours |
| Review and revision | Week 4 | 4 hours |
| **Total for new chapter** | **4 weeks** | **24 hours** |

### Phase 2: Existing Chapter Updates (Priority 2)

| Task | Target | Effort |
|------|--------|--------|
| MX-Bible chapter updates | Week 5-6 | 8 hours |
| MX-Handbook section updates | Week 6-7 | 6 hours |
| Cross-reference verification | Week 7 | 2 hours |
| **Total for updates** | **3 weeks** | **16 hours** |

### Phase 3: Technical Appendix (Priority 3)

| Task | Target | Effort |
|------|--------|--------|
| JSON schema documentation | Week 8 | 4 hours |
| API specification | Week 8-9 | 4 hours |
| Code examples | Week 9-10 | 6 hours |
| **Total for appendix** | **3 weeks** | **14 hours** |

### Phase 4: Illustrations (Parallel)

| Task | Target | Effort |
|------|--------|--------|
| Ecosystem overview SVG | Week 2 | 2 hours |
| Identity layer SVG | Week 3 | 2 hours |
| Physical bridge SVG | Week 4 | 2 hours |
| Remaining illustrations | Week 5-6 | 4 hours |
| **Total for illustrations** | **5 weeks** | **10 hours** |

---

## Quality Checklist

### Before Integration

- [ ] Content follows Timeless Manuscript Rule
- [ ] British English spelling throughout
- [ ] No publication dates or "new in this version" language
- [ ] Cross-references verified
- [ ] Code examples tested
- [ ] SVGs meet accessibility requirements
- [ ] Markdown linting passes

### After Integration

- [ ] Word count updated
- [ ] Table of contents updated
- [ ] Index entries added
- [ ] PDF generation tested
- [ ] Cross-book consistency verified

---

## Glossary Additions

Add to `packages/bible/chapters/Glossary.md`:

| Term | Definition |
|------|------------|
| **MX-Card** | A standardised machine-readable data container that provides verified context about physical objects to AI agents |
| **MX-Registry** | A verification service that confirms domain ownership and manages MX-Card registration |
| **Identity Layer** | A portable personal data container holding preferences that inform MX-Card responses |
| **Anti-Hallucination** | The reduction of AI inference errors through provision of verified, authoritative context |
| **Card Discovery** | The process by which an AI agent locates and parses an MX-Card, typically via QR code scan |

---

## Dependencies

### Before Writing Can Begin

1. [ ] Patent disclosure document finalised
2. [ ] JSON schema draft completed
3. [ ] Key terminology agreed
4. [ ] Example use cases documented

### Before Publication

1. [ ] Patent provisional filed (protects disclosure)
2. [ ] Copyright notices added
3. [ ] Technical review completed
4. [ ] Legal review of claims

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Premature disclosure before patent | File provisional before publishing |
| Technical details change | Write conceptually first, details in appendix |
| Book publication delayed | MX-Card content is additive, not blocking |
| Concept not validated | Include "emerging pattern" framing |

---

## Success Metrics

| Metric | Target |
|--------|--------|
| New chapter word count | 5,000-7,000 words |
| Code examples created | 10+ files |
| Illustrations created | 5 SVGs |
| Existing chapters updated | 10+ |
| Glossary terms added | 5+ |

---

## Action Items (Immediate)

1. [ ] Finalise chapter outline with Tom
2. [ ] Create placeholder files in book repos
3. [ ] Draft introduction section
4. [ ] Begin ecosystem illustration
5. [ ] Create code example directory structure
6. [ ] Review existing chapters for integration points

---

## Related Documents

- [MX-Card System Patent Disclosure](mx-card-system-patent-disclosure.md)
- [Patent Application Plan](mx-card-patent-plan.md)
- [Copyright Protection Plan](mx-card-copyright-plan.md) ("MX-Card System - Copyright Protection Plan" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/mx-card-copyright-plan.md>)

---

## Document History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-26 | 0.1 | Initial plan |
