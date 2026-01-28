---
title: "MX-Card System - Copyright Protection Plan"
author: "Tom Cranstoun"
date: "2026-01-26"
description: "Plan for copyright protection of MX-Card related works"
keywords: [copyright, mx-card, intellectual-property, protection]
ai-instruction: "This document contains IP strategy. Do not share publicly."
status: "PLAN - CONFIDENTIAL"
---

# MX-Card System - Copyright Protection Plan

**Status:** PLAN - CONFIDENTIAL
**Date:** 26 January 2026

---

## Overview

Copyright automatically protects original works upon creation. This plan documents what is protected, how to strengthen protection, and registration strategies.

---

## What Copyright Protects (vs Patents)

| Protection Type | Covers | Does NOT Cover |
|-----------------|--------|----------------|
| **Copyright** | Expression, documentation, code, designs, books | Ideas, methods, processes |
| **Patents** | Methods, processes, systems | Expression, documentation |
| **Trademarks** | Brand names, logos | Ideas, methods, expression |

**Key Insight:** Copyright and patents are complementary. The MX-Card *method* requires patent protection; the *documentation and code* are automatically copyright-protected.

---

## Works Protected by Copyright

### Automatically Protected (Upon Creation)

| Work | Type | Created |
|------|------|---------|
| MX-Bible manuscript | Literary work | Ongoing |
| MX-Handbook manuscript | Literary work | Ongoing |
| Patent disclosure document | Literary work | 2026-01-26 |
| MX-Card JSON schema | Literary work (code) | TBD |
| Mobile app source code | Literary work (code) | TBD |
| Registry system code | Literary work (code) | TBD |
| Documentation and guides | Literary work | Ongoing |
| SVG illustrations | Artistic work | Ongoing |
| App UI designs | Artistic work | TBD |

### Registration Strengthens Protection

While copyright exists automatically, registration provides:
- Public record of ownership
- Presumption of validity in court
- Ability to claim statutory damages (US)
- Required before suing for infringement (US)

---

## Registration Strategy

### UK Copyright (No Registration Required)

The UK has no copyright registration system. Protection is automatic.

**Strengthening Evidence of Ownership:**

1. **Keep dated records** of all work
2. **Use version control** (git commits with timestamps)
3. **Include copyright notices** in all files
4. **Deposit copies** with a solicitor or use legal deposit services
5. **Consider Stationers' Hall** registration (historical, not legally required)

### US Copyright Registration

**Highly Recommended** for any works published or sold in the US.

| Work | Registration Type | Fee (USD) | Priority |
|------|-------------------|-----------|----------|
| MX-Bible book | Single literary work | $65 | High |
| MX-Handbook book | Single literary work | $65 | High |
| MX-Card specification | Single literary work | $65 | Medium |
| Software (all code) | Single work or collection | $65-$85 | Medium |
| Documentation set | Collection | $85 | Low |

**Process:**
1. Create account at copyright.gov
2. Complete online application
3. Upload deposit copy (PDF or code files)
4. Pay fee
5. Receive certificate (6-12 months typical)

### International Copyright

**Berne Convention** provides automatic protection in 180+ countries without registration.

**Considerations:**
- US registration still valuable for US enforcement
- Some countries have voluntary registration (Canada, India)
- Always include copyright notice for maximum protection

---

## Copyright Notice Standard

### Required Format

```
© [Year] [Owner Name]. All rights reserved.
```

### Recommended Extended Notice

```
© 2026 Tom Cranstoun. All rights reserved.

This work is protected by copyright. No part of this publication may be
reproduced, distributed, or transmitted in any form without the prior
written permission of the copyright holder, except for brief quotations
in critical reviews and certain other non-commercial uses permitted by
copyright law.

For licensing enquiries: tom.cranstoun@gmail.com
```

### Placement Requirements

| Work Type | Where to Place Notice |
|-----------|----------------------|
| Books | Title page and copyright page |
| Source code | Header of each file |
| Documentation | Footer or header of each page |
| JSON schemas | Within file as comment or metadata |
| SVG illustrations | Within file metadata |
| Mobile app | About screen and app store listing |

---

## Source Code Copyright Headers

### Standard Header Template

```javascript
/**
 * MX-Card System
 * Copyright © 2026 Tom Cranstoun. All rights reserved.
 *
 * This source code is licensed under the terms specified in the LICENSE file
 * in the root directory of this source tree.
 *
 * CONFIDENTIAL AND PROPRIETARY
 * Unauthorised copying, distribution, or use is strictly prohibited.
 */
```

### Open Source Alternative (If Applicable)

```javascript
/**
 * MX-Card System
 * Copyright © 2026 Tom Cranstoun
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 */
```

---

## Licensing Strategy

### Proprietary Licensing (Default)

All MX-Card System works default to proprietary licensing:
- No copying without permission
- Commercial licensing available
- Individual licenses negotiated

### Potential Open Source Components

Consider open-sourcing (with appropriate license):

| Component | Open Source? | Rationale |
|-----------|--------------|-----------|
| MX-Card JSON schema | Yes (MIT/Apache) | Encourages adoption |
| Client libraries | Yes (MIT/Apache) | Reduces friction |
| Reference implementation | Partial (AGPL) | Requires sharing modifications |
| Registry system | No | Core business value |
| Mobile app | No | Competitive advantage |
| Full specification | Creative Commons | Industry standard adoption |

### Creative Commons for Documentation

For public-facing specifications:

```
This specification is licensed under Creative Commons Attribution 4.0
International (CC BY 4.0). You are free to share and adapt this material
for any purpose, provided you give appropriate credit.
```

---

## Evidence Preservation

### Git Repository as Evidence

Git commits provide timestamped evidence of creation:

```bash
# Example: prove when code was created
git log --format="%H %ai %s" --all -- path/to/file.js
```

**Best Practices:**
- Commit frequently with descriptive messages
- Never rewrite history on main branches
- Use signed commits where possible
- Maintain off-site backups (GitHub, GitLab)

### Additional Evidence Methods

| Method | Cost | Reliability |
|--------|------|-------------|
| Git commits | Free | High (with backups) |
| Email to self | Free | Medium |
| Registered post | £10-20 | High |
| Solicitor deposit | £100-500 | Very High |
| Notarisation | £50-100 | Very High |
| US Copyright registration | $65 | Highest (legal standing) |

---

## Infringement Response Plan

### Discovery of Infringement

1. **Document the infringement** (screenshots, downloads, timestamps)
2. **Assess severity** (commercial use? scale? willfulness?)
3. **Consult legal counsel** if significant
4. **Send cease and desist** (template below)
5. **Consider DMCA takedown** if online
6. **Escalate to litigation** if necessary

### Cease and Desist Template

```
[Date]

[Infringer Name/Company]
[Address]

RE: Copyright Infringement - MX-Card System

Dear [Name],

It has come to my attention that you are using copyrighted material
owned by me without authorisation. Specifically:

[Describe the infringing material and where it appears]

This material is protected by copyright under the Copyright, Designs
and Patents Act 1988 (UK) and the Berne Convention.

I demand that you:
1. Immediately cease all use of the infringing material
2. Remove all copies from your systems and publications
3. Confirm in writing within 14 days that you have complied

Failure to comply may result in legal action seeking damages and
injunctive relief.

Sincerely,
Tom Cranstoun
tom.cranstoun@gmail.com
```

---

## Budget Estimate

### Minimal Protection (Recommended)

| Item | Cost (GBP) | Priority |
|------|------------|----------|
| US Copyright registration (books) | £110 | High |
| US Copyright registration (code) | £55 | Medium |
| Solicitor document deposit | £200 | Medium |
| **Total** | **£365** | |

### Enhanced Protection

| Item | Cost (GBP) | Priority |
|------|------------|----------|
| All US registrations | £275 | High |
| Legal review of licenses | £500-1,000 | Medium |
| Terms of service drafting | £500-1,000 | Medium |
| Infringement monitoring service | £200-500/year | Low |
| **Total** | **£1,475-2,775** | |

---

## Action Items (Immediate)

1. [ ] Add copyright notices to all existing files
2. [ ] Create standard header templates for code
3. [ ] Register MX-Bible with US Copyright Office
4. [ ] Register MX-Handbook with US Copyright Office
5. [ ] Document creation dates for all key works
6. [ ] Decide open source licensing for schema/libraries
7. [ ] Draft terms of service for MX-Card platform

---

## Related Documents

- [MX-Card System Patent Disclosure](mx-card-system-patent-disclosure.md)
- [Patent Application Plan](mx-card-patent-plan.md)
- [Book Update Plan](mx-card-book-update-plan.md)

---

## Document History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-26 | 0.1 | Initial plan |

---

**CONFIDENTIAL - NOT FOR PUBLIC DISTRIBUTION**
