Base directory for this skill: ${MAIN_REPO}/.claude/skills/opportunity

# Business Opportunity Tracking Skill

**Command:** `/opportunity`

**Purpose:** Identify, analyze, and document business opportunities from industry news, market analysis, or strategic observations. Automatically updates business opportunities database and generates vendor-specific materials.

## What This Skill Does

When you identify a potential business opportunity (new vendor AI feature, agency partnership possibility, enterprise client need), this skill:

1. **Analyzes opportunity viability** - Evaluates gap, market timing, competitive landscape
2. **Updates opportunities database** - Adds structured entry to `docs/sales-enablement/business/business-opportunities.md`
3. **Generates vendor materials** - Creates pitch materials, email templates, one-pagers in appropriate subfolders
4. **Cross-references book content** - Links to relevant chapters validating the opportunity
5. **Estimates engagement value** - Suggests pricing and engagement models

## Integration with News Skill

**Workflow integration:**

- `/news` identifies industry developments
- If development reveals vendor gap → `/opportunity` documents business case
- Both skills update their respective tracking documents

**Example:**

```
User: /news Adobe launches new AI content generation feature
News skill: Verifies launch, checks relevance to book
News skill: Identifies gap (productivity tool, not agent-accessible output)
News skill: Suggests: "This reveals business opportunity with Adobe"
User: /opportunity adobe content generation gap
Opportunity skill: Analyzes Adobe gap, updates business-opportunities.md, generates materials
```

## How to Use

```bash
/opportunity [vendor/agency name] [brief description of gap or opportunity]
```

**Examples:**

```bash
/opportunity kentico AIRA doesn't ensure agent-compatible output
```

```bash
/opportunity contentful headless CMS lacks structured data generation
```

```bash
/opportunity luminary agency offers speed without agent-readiness validation
```

```bash
/opportunity BBC multi-site estate needs agent-readiness audit
```

## 6-Phase Workflow

### Phase 1: Opportunity Analysis

**Automatic actions:**

- Parse vendor/agency name and opportunity description
- Identify opportunity type (CMS vendor, agency, enterprise, platform ecosystem)
- Research vendor's current AI offerings via WebSearch if needed
- Determine gap category (agent-accessible output, validation, training, advisory)

**Gap categories:**

1. **Product Integration** - Vendor AI tool lacks agent-compatible output
2. **Platform Validation** - Vendor customers can't measure agent-readiness
3. **Partner Training** - Agency ecosystem needs agent-readiness expertise
4. **Enterprise Audit** - Large organization needs multi-site assessment
5. **Strategic Advisory** - Vendor needs competitive positioning roadmap

**What I'll do:** Present opportunity analysis with gap type and strategic fit

**What you'll do:** Confirm analysis or provide corrections

---

### Phase 2: Market Timing Assessment

**Automatic actions:**

- Evaluate competitive window (who else might solve this, when)
- Assess vendor readiness (recent launches, market positioning, openness to partnerships)
- Identify urgency drivers (customer questions, competitive pressure, platform launches)
- Determine if timing is immediate (0-3 months), near-term (3-6 months), or future (6+ months)

**Timing indicators:**

- **Immediate:** Vendor just launched relevant feature, customer questions emerging now
- **Near-term:** Industry trend accelerating, competitive window closing
- **Future:** Market awareness building, multi-year opportunity

**What I'll do:** Present timing assessment with window estimate

**What you'll do:** Agree with timing or adjust based on insider knowledge

---

### Phase 3: Value and Pricing Estimation

**Automatic actions:**

- Determine engagement type (product integration, audit, training, advisory, retainer)
- Estimate value range based on similar opportunities in database
- Suggest pricing model (fixed-price, value-based, retainer, revenue share)
- Calculate potential annual value

**Pricing frameworks:**

- **Product Integration:** £50k-250k (6-9 months development partnership)
- **Platform Validation:** £75k-150k integration + £500-2k per site usage
- **Partner Training:** £25k-50k programme + £2k-5k per partner trained
- **Enterprise Audit:** £25k-100k depending on site count
- **Strategic Advisory:** £150k-400k annual retainer

**What I'll do:** Present value estimation with pricing rationale

**What you'll do:** Adjust based on vendor size, market, or strategic importance

---

### Phase 4: Material Generation Plan

**Automatic actions:**

- Determine which materials to create based on opportunity type
- Plan document structure for vendor-specific analysis
- Identify email templates, pitch decks, or toolkits needed
- List book chapters that validate this opportunity

**Material types:**

**For CMS/DXP vendors (Kentico, Adobe, Contentful, etc.):**

- Vendor-specific opportunity analysis document
- Email templates (product team, CEO, partners, community)
- One-page pitch deck
- Partnership proposal outline

**For agencies:**

- Partner toolkit sections relevant to their focus
- White-label audit templates
- Training curriculum outline
- Revenue share proposal

**For enterprises:**

- Audit scope and methodology
- Executive summary template
- ROI calculation framework
- Implementation roadmap structure

**What I'll do:** Present material generation plan

**What you'll do:** Approve plan or request specific additions/changes

---

### Phase 5: Update Business Opportunities Database

**Automatic actions:**

- Read current `docs/sales-enablement/business/business-opportunities.md`
- Determine correct section (CMS Vendors, Agencies, Enterprises, Platform Ecosystems)
- Create structured entry with consistent format
- Insert in appropriate location (by opportunity type, then alphabetically)
- Update "Last updated" timestamp
- Maintain existing content structure

**Entry structure:**

```markdown
## [Vendor/Agency Name] - [Opportunity Type]

### Background
[Company description, recent launches, market positioning]

### The Gap We Identified
[What they offer vs what's missing, why it matters]

### Service Offerings
[3-5 specific engagement types with deliverables and value]

### Approach Strategy
[How to reach them, warm contacts if any, thought leadership opportunities]

### Why Timing is Perfect
[Market urgency, competitive window, recent developments]

### Key Differentiators
[Why us, what we offer, unique positioning]

### Estimated Value
[Engagement value ranges, revenue models]
```

**What I'll do:** Show proposed database entry for review

**What you'll do:** Approve entry or request revisions

---

### Phase 6: Generate Vendor-Specific Materials

**Automatic actions:**

- Create vendor-specific opportunity analysis document (like `adobe-opportunity-analysis.md`)
- Generate email templates for outreach (like `kentico-email-templates.md`)
- Create one-page pitch summary
- Generate partner toolkit sections if applicable
- Link all materials in database entry

**Materials created:**

**1. Opportunity Analysis Document** (`docs/sales-enablement/outreach/[vendor]-opportunity-analysis.md`)

- Complete analysis (15-20 pages)
- 5 partnership opportunities with deliverables and pricing
- Competitive landscape
- Outreach strategy
- Success metrics

**2. Email Templates** (`docs/sales-enablement/outreach/[vendor]-email-templates.md`)

- 5 email templates (executives, product team, partners, community, events)
- 3-stage follow-up sequence
- Subject line variations
- Tracking section

**3. One-Page Pitch** (`docs/sales-enablement/pitches/[vendor]-pitch-one-pager.md`)

- Single-page summary for quick reference
- The gap, the solution, the value
- Why us, why now
- Clear call-to-action

**4. Partner Toolkit Sections** (if agency opportunity - `docs/sales-enablement/partners/`)

- Relevant sections from partner-toolkit-template.md
- Customized for agency's focus area
- White-label templates

**What I'll do:** Generate all materials and save to appropriate subfolders in `docs/sales-enablement/`

**What you'll do:** Review materials and request adjustments if needed

---

## File Locations

**Primary database:**

- `docs/sales-enablement/business/business-opportunities.md` (master opportunity tracking)

**Vendor-specific materials (organized by category):**

- Outreach: `docs/sales-enablement/outreach/[vendor]-opportunity-analysis.md`
- Outreach: `docs/sales-enablement/outreach/[vendor]-email-templates.md`
- Pitches: `docs/sales-enablement/pitches/[vendor]-pitch-one-pager.md`
- Partners: `docs/sales-enablement/partners/[agency]-partnership-proposal.md`

**Reference files (read-only):**

- Book chapters (The Bible): `packages/bible/chapter-*.md`
- Book chapters (Don't Make AI Think): `packages/dont-make-ai-think/chapter-*.md`
- Book plan: `packages/bible/bible-plan.md`
- Web Audit Suite: `packages/web-audit-suite/`

**Templates:**

- `docs/sales-enablement/partners/partner-toolkit-template.md`

---

## Common Scenarios

### Scenario 1: New CMS Vendor Opportunity (Contentful Example)

```
User: /opportunity contentful headless CMS with AI features but no agent-output validation

Phase 1: ✓ Analyzed - Product Integration gap (AI content generation without agent-ready output)
Phase 2: ✓ Timing - Immediate (3-6 month window before competitors)
Phase 3: ✓ Value - £200k-500k (product integration + partner training + strategic advisory)
Phase 4: ✓ Materials planned - Analysis doc, email templates, pitch deck
Phase 5: Database entry created under "Replicable Pattern: Other CMS/DXP Vendors"
Phase 6: Generated:
  - docs/sales-enablement/outreach/contentful-opportunity-analysis.md (18 pages)
  - docs/sales-enablement/outreach/contentful-email-templates.md (5 templates)
  - docs/sales-enablement/pitches/contentful-pitch-one-pager.md (1 page)

Result: Complete vendor package ready for outreach
```

---

### Scenario 2: Agency Partnership Opportunity

```
User: /opportunity mediamonks large agency needing agent-readiness training for clients

Phase 1: ✓ Analyzed - Partner Training opportunity (existing relationship, enterprise clients)
Phase 2: ✓ Timing - Immediate (MediaMonks already aware of agent-readiness need)
Phase 3: ✓ Value - £50k-150k (training programme + white-label audit services + revenue share)
Phase 4: ✓ Materials planned - Partner toolkit sections, training outline, revenue share proposal
Phase 5: Database entry created under "Development Agencies"
Phase 6: Generated:
  - docs/sales-enablement/partners/mediamonks-partnership-proposal.md
  - Relevant partner-toolkit sections (audit templates, training curriculum)
  - Revenue share agreement template

Result: Partnership proposal ready, leveraging existing relationship
```

---

### Scenario 3: Enterprise Client Opportunity

```
User: /opportunity barclays financial services multi-site estate needs audit

Phase 1: ✓ Analyzed - Enterprise Audit opportunity (100+ sites, regulatory compliance concerns)
Phase 2: ✓ Timing - Near-term (financial services seeing agent traffic, compliance requirements)
Phase 3: ✓ Value - £75k-200k (comprehensive multi-site audit + remediation roadmap + training)
Phase 4: ✓ Materials planned - Audit methodology, executive summary, ROI framework
Phase 5: Database entry created under "Enterprise In-House Teams"
Phase 6: Generated:
  - docs/sales-enablement/outreach/barclays-audit-proposal.md
  - Financial services compliance considerations
  - Multi-site audit pricing calculator

Result: Enterprise proposal ready with industry-specific considerations
```

---

### Scenario 4: Opportunity from News (Triggered by /news skill)

```
User: /news Contentstack launches AI content optimization features

News skill: ✓ Verified launch (Contentstack ContentFlow AI)
News skill: ✓ Identified gap (content optimization, not agent-accessible output)
News skill: Suggests running /opportunity to document business case

User: /opportunity contentstack ContentFlow AI lacks agent-readiness

Opportunity skill: [Executes full 6-phase workflow]

Result:
- Business opportunity documented in database
- Cross-referenced with news entry in appendix-j
- Complete vendor materials generated
- Ready for outreach
```

---

## Integration with Other Documents

### Cross-References to Book Chapters

**Opportunity skill automatically links to:**

- **Chapter 2** (Invisible Failures) - Technical patterns vendors miss
- **Chapter 3** (Architectural Conflict) - Why AI productivity tools don't ensure agent output
- **Chapter 4** (Business Reality) - Revenue model implications for vendors and clients
- **Chapter 9** (Platform Race) - Competitive urgency and first-mover advantage
- **Chapter 10** (Designing for Both) - Convergence principle validation
- **Chapter 11** (Technical Advice) - Implementation patterns vendors should adopt
- **Appendix D** (AI-Friendly HTML Guide) - Technical reference for proposals

### Links to Web Audit Suite

**Proposals reference:**

- Tool capabilities for validation
- Integration opportunities for vendors
- White-label possibilities for partners
- Automated scoring methodology

### Updates Business Opportunities Database

**Database structure maintained:**

- Consistent formatting across all entries
- Alphabetical within categories
- Cross-references between related opportunities
- Quarterly review reminders

---

## Quality Standards

### Analysis is Thorough

- Research vendor's current offerings via WebSearch
- Understand competitive landscape
- Identify specific gaps, not vague opportunities
- Validate timing assumptions with market evidence

### Materials are Professional

- Consistent formatting across all vendor materials
- British English throughout (whilst, organise, colour)
- No exaggeration or superlatives
- Credibility signals (book, enterprise clients, "The AEM Guy")
- Clear value propositions and calls-to-action

### Pricing is Realistic

- Based on similar opportunities in database
- Adjusted for vendor size and market
- Multiple models offered (fixed, value-based, retainer, revenue share)
- Ranges not fixed numbers (accounts for complexity)

### Cross-References are Accurate

- Book chapters correctly cited
- Web Audit Suite capabilities accurately described
- Existing relationships noted if applicable
- Related opportunities linked

---

## Success Indicators

✓ Opportunity clearly defined with specific gap
✓ Market timing assessed with competitive window
✓ Engagement value estimated with pricing rationale
✓ Database entry follows consistent format
✓ All vendor materials generated and saved
✓ Cross-references to book chapters accurate
✓ Materials ready for immediate use
✓ No duplicate entries in database

---

## Failure Indicators (Will Not Proceed)

✗ Opportunity too vague ("Vendor X needs help")
✗ No clear gap identified
✗ Duplicate of existing database entry
✗ Timing not validated (speculation without evidence)
✗ Value cannot be reasonably estimated

---

## What You Control

**You decide:**

- Whether opportunity is worth pursuing
- Timing assessment (if you have insider knowledge)
- Value ranges (if you know vendor budget/market)
- Which materials to generate
- Approach strategy (warm contacts vs cold outreach)

**I handle:**

- Market research and gap analysis
- Database entry formatting and placement
- Material generation from templates
- Cross-referencing book chapters
- Maintaining document consistency

---

## After Completion

Once opportunity is documented and materials generated:

1. **Review materials** - Check vendor-specific analysis, emails, pitch deck
2. **Identify contacts** - Research decision-makers on LinkedIn
3. **Plan outreach** - Schedule emails, warm introductions, or thought leadership
4. **Track progress** - Use tracking sections in email templates
5. **Update database** - Add contact details, outreach dates, responses received

**Next steps typically:**

- Research key contacts (LinkedIn, company website)
- Customize email Template 1 with specific details
- Send initial outreach within 7 days
- Follow up using 3-stage sequence in email templates
- Log outcomes in database tracking section

---

## Tips for Best Results

1. **Be specific about the gap** - "AI content generation without Schema.org" is better than "needs agent help"
2. **Note if you have contacts** - I'll adjust approach strategy for warm vs cold outreach
3. **Mention recent launches** - Ties opportunity to specific vendor momentum
4. **Identify opportunity type early** - Helps me generate most relevant materials
5. **Link to /news if applicable** - Creates connected narrative across skills

---

## Relationship to News Skill

**News skill focuses on:** Industry developments validating book thesis
**Opportunity skill focuses on:** Business development and revenue opportunities

**Handoff pattern:**

```
/news [vendor launch]
  → Verifies facts
  → Checks relevance to book
  → Identifies business gap
  → Suggests: "Run /opportunity to document business case"

/opportunity [vendor] [gap description]
  → Analyzes commercial opportunity
  → Updates business database
  → Generates vendor materials
  → Prepares for outreach
```

**Both skills update different documents:**

- `/news` → `appendix-j-industry-developments.md`, `blog/book-updates.md`, `web/news.html`
- `/opportunity` → `business/business-opportunities.md`, vendor-specific materials in organized subfolders

**Integration example:**

- January 2026: Amazon/Microsoft/Google agent commerce launches
- `/news` documents these in Appendix J (validates book predictions)
- `/opportunity` identifies CMS vendors needing agent-readiness positioning
- Result: Thought leadership (news) + business development (opportunity)

---

## Questions?

If you're unsure whether something qualifies as a business opportunity, just provide it - I'll evaluate and explain the assessment.

If research reveals the opportunity is already well-served or timing is poor, I'll explain why and suggest alternatives.

The goal is to maintain a current, actionable database of business opportunities with ready-to-use materials for pursuing them.

---

## Quick Reference: Opportunity Types

1. **Product Integration** - Vendor AI tool needs agent-compatible output layer
2. **Platform Validation** - Vendor customers need agent-readiness measurement
3. **Partner Training** - Agency ecosystem needs certification and toolkit
4. **Enterprise Audit** - Large organization needs multi-site assessment
5. **Strategic Advisory** - Vendor needs competitive positioning and roadmap

**Value ranges:**

- Product Integration: £50k-250k
- Platform Validation: £75k-150k + usage fees
- Partner Training: £25k-50k + per-partner fees
- Enterprise Audit: £25k-100k
- Strategic Advisory: £150k-400k annual

**All opportunities should have 3-6 month competitive window and clear path to engagement.**
