---
title: "MX Importing: Chapter 4"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "Migration Strategy"
  author:
    "@type": Person
    name: Tom Ledger
  isPartOf:
    "@type": Book
    name: "MX: Importing"
  inLanguage: en-GB
  mx:audience: human
  mx:status: draft
  mx:confidence: 0.85
---

# Chapter 4: Migration Strategy

Migration is a programme, not a project. It touches content, technology, process, and people. Success requires strategy — clear goals, realistic plans, and deliberate choices about scope and approach.

This chapter covers migration planning: how to assess what you're migrating, decide what to include, choose a migration pattern, and build a programme that delivers.

---

## Defining Success

Before planning how to migrate, define what success looks like.

### Business Outcomes

Why are you migrating? Common drivers:

**Cost Reduction**
- Eliminate licensing fees
- Reduce infrastructure costs
- Lower specialist staffing needs
- Measure: Total cost of ownership reduction

**AI Enablement**
- Deploy AI assistants with accurate responses
- Enable semantic search
- Support RAG applications
- Measure: AI response quality, retrieval accuracy

**Operational Efficiency**
- Faster content publishing
- Easier multi-channel delivery
- Simplified development
- Measure: Time-to-publish, developer velocity

**Risk Reduction**
- Eliminate vendor lock-in
- Improve disaster recovery
- Reduce technical debt
- Measure: Recovery time, system dependencies

Be specific. "We want better content management" isn't measurable. "We want to reduce CMS licensing costs by 80% while enabling AI-powered customer support" is.

### Technical Success Criteria

What must be true for migration to succeed?

**Content Completeness**
- All published content migrates
- Relationships preserved
- Assets and metadata intact
- Measure: Content count reconciliation

**Functionality Parity**
- Users can perform essential tasks
- Integrations continue working
- Performance meets requirements
- Measure: Feature checklist, performance benchmarks

**Quality Standards**
- All content passes MX validation
- No broken references
- Metadata enrichment complete
- Measure: Validation pass rate, link check results

### Stakeholder Alignment

Who needs to agree, and on what?

| Stakeholder | Concerns | Success Criteria |
|-------------|----------|------------------|
| Executive sponsor | Business value, risk | ROI achieved, no major incidents |
| Content team | Usability, workflow | Can do their job effectively |
| IT operations | Stability, support | System runs without issues |
| Development | Maintainability | Codebase is manageable |
| Legal/Compliance | Data protection | Requirements met |

Document these early. Revisit when making trade-off decisions.

---

## Content Assessment

Before migrating content, understand what you have.

### Inventory

Build a complete picture:

**By Type**
- How many pages?
- How many content fragments?
- How many assets (images, videos, documents)?
- How many templates/models?
- How many taxonomies/tags?

**By Status**
- Published vs draft
- Active vs archived
- Current vs outdated

**By Language**
- How many languages?
- Which content is translated?
- What's the translation relationship?

**By Age**
- When was content created?
- When was it last modified?
- How much is stale?

### Quality Assessment

Not all content deserves migration:

**Relevance**
- Is this content still needed?
- Does anyone use it?
- When was it last accessed?

**Quality**
- Is the content accurate?
- Is it well-written?
- Does it meet brand standards?

**Completeness**
- Are required fields populated?
- Are relationships intact?
- Are assets available?

**Redundancy**
- Is this content duplicated?
- Are there multiple versions?
- Which is authoritative?

### The Migration Matrix

Plot content on a decision matrix:

```
                    High Quality
                         │
    MIGRATE              │              MIGRATE
    AS-IS                │              WITH ENHANCEMENT
                         │
    Low Value ───────────┼─────────── High Value
                         │
    ARCHIVE              │              REVIEW
    OR DELETE            │              AND DECIDE
                         │
                    Low Quality
```

**High Value, High Quality:** Migrate as-is. This is your priority content.

**High Value, Low Quality:** Migrate but enhance. Worth the investment to improve.

**Low Value, High Quality:** Migrate if easy, otherwise archive. Nice to have.

**Low Value, Low Quality:** Archive or delete. Don't waste effort migrating.

### Content Audit Report

Document your findings:

```yaml
audit:
  date: 2026-01-15
  source: AEM 6.5

  totals:
    pages: 12,450
    content_fragments: 3,200
    assets: 45,000
    templates: 85
    
  by_status:
    published: 8,200
    draft: 2,100
    archived: 2,150
    
  by_language:
    en-GB: 12,450
    de-DE: 8,200
    fr-FR: 6,100
    
  quality_assessment:
    high_value_high_quality: 4,500
    high_value_low_quality: 1,200
    low_value_high_quality: 3,800
    low_value_low_quality: 2,950
    
  recommendations:
    migrate_as_is: 4,500
    migrate_enhanced: 1,200
    archive: 3,800
    delete: 2,950
    
  estimated_effort:
    content_migration: "6 weeks"
    asset_migration: "3 weeks"
    enhancement: "4 weeks"
    validation: "2 weeks"
```

---

## Migration Patterns

How you migrate affects risk, complexity, and timeline.

### Big Bang

Migrate everything at once. Switch over on a single date.

```
Source System ─────────────────┬─── Decommission
                               │
                    Migration Weekend
                               │
Target System ─────────────────┴─── Go Live
```

**Advantages:**
- Clean cutover
- No dual maintenance
- Clear end date

**Disadvantages:**
- High risk — everything must work
- Large effort spike
- Limited rollback options

**Best for:**
- Smaller content sets
- Simple source systems
- Strong testing capability
- Clear deadlines

### Phased Migration

Migrate in stages. Run systems in parallel.

```
Phase 1: Products ────────────────────────────────
Phase 2: Articles ─────────────────────────────
Phase 3: Support docs ──────────────────────
Phase 4: Archive ─────────────────────

Source: ═══════════════════════════╗
                                   ╚═══ Decommission
Target:              ╔═════════════════════════════
                     ║
                 Go Live (progressive)
```

**Advantages:**
- Reduced risk — problems affect only one phase
- Learning between phases
- Parallel running allows validation

**Disadvantages:**
- Longer timeline
- Dual maintenance during transition
- Integration complexity

**Best for:**
- Large content sets
- Complex source systems
- Risk-averse organisations
- Available parallel resources

### Strangler Pattern

New content goes to target. Old content migrates gradually. Source system shrinks over time.

```
Source: ════════════════════════╲
                                 ╲
                                  ╲════ (eventual decommission)
Target:          ╱═══════════════════════════════
                ╱
           New content starts here
```

**Advantages:**
- Lowest risk
- Immediate value from new system
- Natural content review as you migrate

**Disadvantages:**
- Longest timeline
- Extended dual maintenance
- Complex routing logic

**Best for:**
- Very large or complex migrations
- When new content velocity is high
- When legacy system must stay operational

### Parallel Run

Run both systems with the same content. Compare results. Switch when confident.

```
Source: ════════════════════════════════════════
        │        │        │        │
        │ sync   │ sync   │ sync   │
        ▼        ▼        ▼        ▼
Target: ════════════════════════════════════════
                                         │
                                    Cutover when ready
```

**Advantages:**
- Highest confidence
- Direct comparison
- Flexible cutover timing

**Disadvantages:**
- Double the maintenance
- Sync complexity
- Expensive

**Best for:**
- Critical systems
- When accuracy is paramount
- When you need to prove equivalence

---

## Planning the Programme

### Work Breakdown

Migration work falls into categories:

**Discovery and Design (Weeks 1-4)**
- Content audit
- Source system analysis
- Target architecture design
- Mapping specifications
- Tool selection/development

**Infrastructure (Weeks 3-6)**
- Target environment setup
- Tooling installation
- Integration configuration
- Access provisioning

**Development (Weeks 4-12)**
- Extraction scripts
- Transformation logic
- Loading procedures
- Validation tools
- Enhancement pipelines

**Migration Execution (Weeks 8-16)**
- Test migrations
- Content enhancement
- Validation cycles
- Issue resolution
- Production migration

**Cutover and Stabilisation (Weeks 14-18)**
- Final sync
- DNS/routing changes
- Monitoring setup
- Issue response
- Source decommission

### Resource Requirements

| Role | Responsibility | Typical Allocation |
|------|----------------|-------------------|
| Programme Manager | Overall coordination | 50-100% |
| Technical Lead | Architecture, decisions | 100% |
| Source System Expert | Extraction, mapping | 50-100% |
| MX Developer | Transform, load, validate | 100-200% |
| Content Strategist | Audit, enhancement decisions | 50% |
| QA Engineer | Validation, testing | 50-100% |
| Operations | Infrastructure, cutover | 25-50% |

### Timeline Template

For a medium-complexity migration (10,000 content items):

| Phase | Duration | Key Activities |
|-------|----------|----------------|
| Discovery | 3 weeks | Audit, analysis, planning |
| Design | 2 weeks | Architecture, mappings, tools |
| Setup | 2 weeks | Infrastructure, access, tooling |
| Development | 4 weeks | Extract, transform, load, validate |
| Test Migration | 2 weeks | Full dry run, issue resolution |
| Enhancement | 3 weeks | MX enrichment, quality improvements |
| Production Migration | 1 week | Final extraction, load, verify |
| Cutover | 1 week | Switch traffic, monitor, stabilise |
| Stabilisation | 2 weeks | Issue response, cleanup |

**Total: ~20 weeks / 5 months**

Scale based on content volume and complexity.

### Risk Management

Identify risks early:

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Content more complex than expected | Medium | High | Thorough discovery, buffer time |
| Source system access issues | Medium | High | Early access testing, escalation path |
| Data quality problems | High | Medium | Automated validation, manual review budget |
| Resource availability | Medium | Medium | Clear commitments, backup plans |
| Scope creep | High | Medium | Clear scope document, change control |
| Integration failures | Medium | High | Early integration testing, fallback options |

---

## Decision Framework

Migration involves many decisions. Here's how to approach common ones.

### What to Migrate

**Decision:** Which content makes the cut?

**Criteria:**
- Is it actively used? (Check analytics)
- Is it legally required? (Check retention policies)
- Is it brand-appropriate? (Check content standards)
- Is it accurate? (Check subject matter experts)

**Default:** When in doubt, archive rather than delete. Storage is cheap; recreating content is expensive.

### Version History

**Decision:** How much history to preserve?

**Options:**
1. Current version only
2. Current plus last N versions
3. All versions
4. Versions within date range

**Recommendation:** Migrate current version to MX content store. Archive version history separately (as a package or export file) for reference if needed.

### Translation Relationships

**Decision:** How to handle multilingual content?

**Options:**
1. Separate files per language
2. Variations within single fragment
3. Master with translation references

**Recommendation:** Use MX variations for closely-related translations. Separate files for significantly different localisations.

### Enhancement Scope

**Decision:** How much to enhance during migration?

**Options:**
1. Minimal — just convert format
2. Standard — add basic MX properties
3. Full — add RAG hints, embeddings, quality review

**Recommendation:** Standard for all content. Full for high-value content. Budget enhancement effort explicitly.

### Cutover Strategy

**Decision:** How to switch from old to new?

**Factors:**
- Can you afford downtime?
- How critical is the content?
- What's your rollback capability?
- How confident are you in the migration?

**Options:**

| Strategy | Downtime | Risk | Complexity |
|----------|----------|------|------------|
| Instant switch | Minutes | High | Low |
| Staged rollout | None | Medium | Medium |
| Parallel with sync | None | Low | High |
| Gradual redirect | None | Low | Medium |

---

## Communication Plan

Migration affects stakeholders. Keep them informed.

### Regular Updates

**Weekly status:**
- Progress against plan
- Issues and blockers
- Decisions needed
- Next week's focus

**Monthly summary:**
- Milestone achievements
- Budget status
- Risk changes
- Timeline outlook

### Key Communications

| Milestone | Audience | Message |
|-----------|----------|---------|
| Kickoff | All stakeholders | What we're doing, why, timeline |
| Audit complete | Leadership, content team | What we found, recommendations |
| Test migration | Technical team | Results, issues, confidence level |
| Go/no-go | Leadership | Readiness assessment, recommendation |
| Cutover | All users | What's changing, what to expect |
| Complete | All stakeholders | Results, lessons learned |

### Escalation Path

When issues arise:

1. **Technical issues** → Technical Lead → Programme Manager
2. **Content decisions** → Content Strategist → Business Owner
3. **Resource issues** → Programme Manager → Executive Sponsor
4. **Timeline impacts** → Programme Manager → Steering Committee

---

## Success Metrics

Track progress with measurable metrics.

### Migration Progress

```
Content Migration Progress
─────────────────────────
Pages:     ████████████████████░░░░░  8,200 / 10,000 (82%)
Fragments: ██████████████████████░░░  2,800 / 3,200  (87%)
Assets:    ████████████████░░░░░░░░░  32,000 / 45,000 (71%)
Overall:   █████████████████░░░░░░░░  43,000 / 58,200 (74%)
```

### Quality Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Validation pass rate | >99% | 97.2% |
| Broken references | 0 | 23 |
| Missing required fields | 0 | 156 |
| MX enrichment complete | 100% | 78% |

### Post-Migration

| Metric | Baseline | Target | Actual |
|--------|----------|--------|--------|
| Page load time | 2.1s | <2.0s | 1.4s |
| Content publish time | 45min | <10min | 8min |
| AI response accuracy | N/A | >90% | 92% |
| Monthly CMS cost | £45,000 | <£10,000 | £7,500 |

---

## Governance

### Decision Authority

| Decision Type | Authority |
|---------------|-----------|
| Scope changes | Steering Committee |
| Technical approach | Technical Lead |
| Content inclusion | Content Strategist |
| Timeline changes | Programme Manager |
| Budget changes | Executive Sponsor |
| Go/no-go | Steering Committee |

### Change Control

Changes to scope, timeline, or budget require:

1. Written change request
2. Impact assessment
3. Approval from appropriate authority
4. Updated documentation

Don't let scope creep through informal decisions.

### Quality Gates

Migration proceeds through gates:

| Gate | Criteria | Approver |
|------|----------|----------|
| Design complete | Architecture signed off | Technical Lead |
| Development complete | Tools tested, documented | Technical Lead |
| Test migration pass | <1% error rate | QA Engineer |
| Production ready | All issues resolved | Programme Manager |
| Go-live | Business sign-off | Executive Sponsor |

---

## Common Pitfalls

Learn from others' mistakes:

**Underestimating content complexity**
The audit found 10,000 pages. But 500 have custom components. 200 have broken references. 50 have encoding issues. Budget for surprises.

**Insufficient source system access**
"We'll get API access next week" becomes next month. Test access early. Have backup extraction plans.

**Ignoring content quality**
Migration exposes quality issues. Budget time for cleanup, or you'll ship garbage to a new home.

**Skipping dry runs**
"We'll do a test migration if we have time." You won't have time after production fails. Test migrations are mandatory.

**Forgetting the long tail**
90% of content migrates in 10% of the time. The remaining 10% takes 90%. Plan for the edge cases.

**Declaring victory too early**
Production migration complete ≠ success. Monitor for weeks. Have support ready.

---

## The Strategy Document

Capture your strategy in a document that stakeholders can review:

```markdown
# Migration Strategy: Acme.com AEM to MX

## Executive Summary
- What we're doing
- Why we're doing it
- Timeline and cost
- Expected benefits

## Scope
- In scope: [specific content types, languages, etc.]
- Out of scope: [what we're not migrating]

## Approach
- Migration pattern: [phased/big bang/etc.]
- Key milestones
- Risk mitigation

## Resources
- Team structure
- Budget allocation
- External dependencies

## Success Criteria
- Business outcomes
- Technical requirements
- Quality standards

## Governance
- Decision authority
- Change control
- Escalation path

## Timeline
- Phase breakdown
- Key dates
- Dependencies

## Risks
- Identified risks
- Mitigation strategies
- Contingency plans
```

---

## From Strategy to Execution

Strategy without execution is just a plan. The following chapters cover the execution: how to extract content from specific platforms, transform it to MX format, enrich it with machine-readable metadata, and load it into the target system.

But strategy comes first. Know what you're doing and why before you write the first line of extraction code.

---

*The following chapter covers AEM content extraction — the detailed process of getting content out of Adobe Experience Manager.*
