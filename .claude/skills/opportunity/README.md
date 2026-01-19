# Opportunity Skill - Business Development Automation

This skill automates business opportunity tracking and vendor-specific material generation.

## Quick Start

```bash
/opportunity [vendor/agency name] [brief description of gap]
```

**Example:**

```bash
/opportunity contentful headless CMS with AI features but no agent-output validation
```

## What This Skill Does

1. **Analyzes opportunity** - Identifies gap type, market timing, competitive window
2. **Updates database** - Adds structured entry to `docs/sales-enablement/business/business-opportunities.md`
3. **Generates materials** - Creates vendor-specific analysis, emails, pitch decks
4. **Estimates value** - Suggests pricing and engagement models
5. **Prepares outreach** - Ready-to-use materials for immediate action

## Files in This Directory

- `skill.md` - Main skill documentation (read this for complete workflow)
- `opportunity-types.md` - Reference guide for 5 opportunity types
- `README.md` - This file (quick reference)

## Five Opportunity Types

1. **Product Integration** (£50k-250k) - Vendor AI tool needs agent-compatible output layer
2. **Platform Validation** (£75k-150k+) - Customers need agent-readiness measurement
3. **Partner Training** (£25k-50k+) - Agency ecosystem needs certification/toolkit
4. **Enterprise Audit** (£25k-100k) - Multi-site agent-readiness assessment
5. **Strategic Advisory** (£150k-400k) - Competitive positioning and roadmap

See `opportunity-types.md` for detailed descriptions and decision tree.

## Integration with News Skill

The `/news` and `/opportunity` skills work together:

- **News skill** tracks industry developments validating book thesis (public thought leadership)
- **Opportunity skill** tracks business opportunities and generates sales materials (private business development)

**Handoff pattern:**

```text
/news [vendor launch]
  → Identifies vendor gap
  → Suggests running /opportunity

/opportunity [vendor] [gap]
  → Documents business case
  → Generates vendor materials
  → Prepares for outreach
```

## Generated Materials

When you run `/opportunity`, the skill creates:

1. **Database entry** in `docs/sales-enablement/business/business-opportunities.md`
2. **Opportunity analysis** in `docs/sales-enablement/outreach/[vendor]-opportunity-analysis.md` - 15-20 page detailed analysis
3. **Email templates** in `docs/sales-enablement/outreach/[vendor]-email-templates.md` - 5 templates + follow-up sequences
4. **One-page pitch** in `docs/sales-enablement/pitches/[vendor]-pitch-one-pager.md` - Executive summary for quick reference
5. **Partner materials** (if agency opportunity) in `docs/sales-enablement/partners/` - Relevant toolkit sections

## Typical Workflow

**Day 1: Identify opportunity**

```bash
# Via news monitoring
/news Sitecore launches AI content assistant
# News skill: Identifies gap, suggests opportunity

# Or direct observation
/opportunity sitecore AI assistant lacks structured data generation
```

**Day 2-3: Review materials**

- Read generated opportunity analysis
- Customize email templates with specific details
- Review pricing and engagement models

**Day 4-7: Research contacts**

- Identify decision-makers on LinkedIn
- Find warm connections if available
- Locate speaking/thought leadership opportunities

**Week 2: Initial outreach**

- Send personalized Email Template 1
- Reference recent launches or market developments
- Offer value (book, complimentary audit, strategic session)

**Week 3-4: Follow up**

- Use 3-stage follow-up sequence from email templates
- Adjust messaging based on responses (or lack thereof)
- Escalate to different contact if needed

**Month 2-3: Close engagement**

- Discovery calls and needs assessment
- Formal proposal using opportunity analysis
- Contract negotiation and project start

## Examples by Opportunity Type

### Product Integration (CMS Vendor)

```bash
/opportunity kentico AIRA content generation without Schema.org
```

**Generated materials:**

- Analysis of AIRA product integration opportunity
- 5 engagement options (AIRA output layer, KentiCopilot enhancement, etc.)
- Emails to Debbie Tuček (VP Product) and Dominik Pintér (CEO)
- Partner agency approach templates
- Estimated value: £50k-300k across 5 offerings

---

### Partner Training (Agency)

```bash
/opportunity luminary agency six-week launches without agent-readiness
```

**Generated materials:**

- Partner training programme proposal
- White-label audit services offer
- Revenue share model (20-30%)
- Certification and toolkit structure
- Estimated value: £50k-150k + ongoing revenue share

---

### Enterprise Audit (In-House Team)

```bash
/opportunity barclays financial services multi-site estate audit
```

**Generated materials:**

- Enterprise audit methodology
- Executive summary with compliance considerations
- Multi-site pricing (£75k-200k for 100+ sites)
- Implementation roadmap structure
- Optional retainer for ongoing monitoring

---

### Strategic Advisory (Vendor Leadership)

```bash
/opportunity adobe Experience Cloud agent-readiness strategy
```

**Generated materials:**

- 12-month advisory engagement proposal
- Competitive positioning vs Contentful/Contentstack
- Product roadmap input framework
- Thought leadership opportunities
- Estimated value: £200k-400k annually

## Cross-References

**Book chapters validated by opportunities:**

- Chapter 3: Why productivity tools don't ensure agent-accessible output
- Chapter 4: Business model implications for vendors and clients
- Chapter 9: Platform race and first-mover advantage
- Chapter 10-11: Patterns vendors should adopt

**Tools referenced in proposals:**

- Web Audit Suite for validation
- Pattern library from book appendices
- Enterprise implementations (BBC, Twitter, Nissan-Renault)

**Related documents:**

- `docs/sales-enablement/business/business-opportunities.md` - Master database (updated by this skill)
- `docs/sales-enablement/partners/partner-toolkit-template.md` - Agency partnership materials
- News skill files (cross-referenced for market timing)

## Success Metrics

Track in database entry:

- **Outreach:** Emails sent, responses received, calls scheduled
- **Conversion:** Proposals submitted, contracts signed, revenue generated
- **Timeline:** From opportunity identification to contract close
- **Value:** Actual revenue vs estimated value

## Tips for Best Results

1. **Be specific about gap** - "AI content without Schema.org" beats "needs agent help"
2. **Note warm contacts** - Changes approach from cold to warm outreach
3. **Link to recent launches** - Creates urgency and relevance
4. **Identify opportunity type early** - Helps generate most relevant materials
5. **Update database after outreach** - Track progress in vendor-specific appendix

## Common Questions

**Q: When should I use `/news` vs `/opportunity`?**
A: Use `/news` for industry developments validating book thesis (public). Use `/opportunity` for business development and revenue opportunities (private).

**Q: Can I run `/opportunity` without running `/news` first?**
A: Yes. `/opportunity` works independently when you directly observe a vendor gap or receive a referral.

**Q: What if opportunity already exists in database?**
A: Skill will detect duplicate and offer to update existing entry instead of creating new one.

**Q: How do I track multiple opportunities with same vendor?**
A: Each vendor gets one database entry with multiple engagement types listed (Product Integration + Partner Training + Advisory, etc.)

**Q: Can I customize generated materials?**
A: Yes. All generated files are markdown and can be edited. The skill provides templates you refine.

**Q: What's the typical close rate?**
A: Track in your database, but expect: Warm contacts 30-50%, Cold outreach 5-15%, Thought leadership inbound 40-60%.

## Related Skills

- `/news` - Industry developments and thought leadership tracking
- `/step-commit` - Systematic commit workflow (use after updating materials)
- `/md-fix` - Markdown linting for generated files

## Support

If you need to modify templates or adjust the opportunity type framework, edit:

- `skill.md` - Main workflow and phase descriptions
- `opportunity-types.md` - Type definitions and pricing guidance

All generated materials go to organized subfolders in `docs/sales-enablement/`:

- Business strategy → `business/`
- Pitch materials → `pitches/`
- Outreach materials → `outreach/`
- Partner materials → `partners/`

---

*Last updated: 2026-01-17*
