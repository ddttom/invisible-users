# News Relevance Checklist

## Purpose

Determine if industry news qualifies for inclusion in the book's blog updates and appendix. Only news that meets **ALL FIVE** criteria should be added.

## The Five Criteria

News must meet **all five** of these criteria to qualify:

### 1. Validates or Challenges Specific Book Chapters

**Requirement:** Must demonstrate patterns from specific chapters OR challenge assumptions made in the book.

**How to verify:**
- Read the relevant chapter files
- Find specific patterns, predictions, or assumptions
- Match news to chapter content using book's terminology

**Qualifies:**
- ✓ "Claude for Chrome inherits authenticated sessions" → Validates Chapter 6 "Session Inheritance Problem"
- ✓ "Microsoft Copilot processes real transactions" → Validates Chapter 4 "E-Commerce - Where Incentives Align"
- ✓ "Proprietary identity solution launched" → Challenges Chapter 4 assumption about standards negotiation

**Does not qualify:**
- ✗ "ChatGPT adds voice mode" → No chapter validation (unless it relates to agent-mediated commerce)
- ✗ "New AI model improves reasoning" → General AI advancement, not related to web design for agents
- ✗ "Claude Desktop bug fixes" → Product update, no chapter connection

### 2. Production Reality (Not Research or Beta)

**Requirement:** Must be available to real users NOW, not theoretical, experimental, or limited beta.

**How to verify:**
- Check if users can access it today
- Confirm it's not just research prototype
- Verify it's not invite-only or limited rollout

**Qualifies:**
- ✓ "Available to all paid subscribers" → Production reality
- ✓ "Partner retailers processing transactions" → Real business impact
- ✓ "Public launch, anyone can install" → Broadly accessible

**Does not qualify:**
- ✗ "Research paper demonstrates..." → Not production
- ✗ "Limited beta with waitlist" → Not broadly accessible yet
- ✗ "Demo shown at conference" → Not available to users
- ✗ "Coming soon, planned for Q3" → Future promise, not current reality

**Edge case - Beta in production:**
- ✓ "Beta release available to all paid users" → Qualifies if broadly accessible
- Example: Claude for Chrome was "beta" but available to millions of users

### 3. Commercial/Competitive Pressure

**Requirement:** Must affect decisions website owners or businesses need to make.

**How to verify:**
- Does this change competitive dynamics?
- Does this create urgency for action?
- Are businesses excluded if they don't adapt?

**Qualifies:**
- ✓ Creates first-mover advantage (Microsoft Copilot Checkout)
- ✓ Excludes non-compatible sites from transactions
- ✓ Changes conversion rates measurably
- ✓ Shifts platform power (AI companies mediating access)

**Does not qualify:**
- ✗ Feature update with no business impact
- ✗ Improvement that doesn't affect competitive positioning
- ✗ Internal tool not affecting external websites

### 4. Timeline Significance

**Requirement:** Must impact the book's "two years" projection or change strategic urgency.

**How to verify:**
- Does this accelerate adoption?
- Does this validate or challenge timeline assumptions?
- Does this change when businesses need to act?

**Qualifies:**
- ✓ Launches to millions of users (accelerates timeline)
- ✓ Processing real transactions now (validates "sooner than expected")
- ✓ Platform launches compete (compression of adoption window)

**Does not qualify:**
- ✗ Incremental feature improvements
- ✗ Updates to existing products (unless they dramatically expand reach)
- ✗ News that doesn't affect adoption timeline

### 5. Ecosystem Shift

**Requirement:** Must represent platform power dynamics, standards emergence, or business model innovation.

**How to verify:**
- Does this change who controls distribution?
- Does this represent new standards or protocols?
- Does this demonstrate new business models?

**Qualifies:**
- ✓ Platform power shift (AI companies mediating commerce)
- ✓ Standards emergence (llms.txt adoption)
- ✓ Business model innovation (identity delegation patterns)
- ✓ New agent capabilities (browser automation, session inheritance)

**Does not qualify:**
- ✗ Product updates within existing paradigm
- ✗ Feature parity (matching competitor features)
- ✗ Incremental improvements

## Evaluation Process

### Step 1: Quick Filter

Ask these questions in order:

1. **Is this production-ready and available now?**
   - If NO → Reject immediately

2. **Does this affect websites or web businesses?**
   - If NO → Reject immediately

3. **Can I identify specific chapters this validates or challenges?**
   - If NO → Flag for deeper investigation

### Step 2: Deep Analysis

For news that passes quick filter:

1. **Read relevant chapters** - Find exact patterns or assumptions
2. **Verify production status** - Check official sources
3. **Assess commercial impact** - Who benefits? Who's excluded?
4. **Evaluate timeline impact** - Accelerates or validates projections?
5. **Identify ecosystem shift** - What changes fundamentally?

### Step 3: Scoring

News must score YES on all five criteria:

| Criterion | Score | Notes |
| --------- | ----- | ----- |
| Chapter validation | YES / NO | Which chapter(s)? |
| Production reality | YES / NO | How accessible? |
| Commercial pressure | YES / NO | What urgency? |
| Timeline impact | YES / NO | Accelerates/validates? |
| Ecosystem shift | YES / NO | What changes? |

**Result:**
- ALL YES → Qualifies for inclusion
- ANY NO → Does not qualify (explain why and suggest alternatives)

## Common Rejection Scenarios

### Scenario 1: AI Tool Not Related to Web

**Example:** "ChatGPT adds advanced reasoning mode"

**Analysis:**
- ✗ Chapter validation: No web design patterns demonstrated
- ✓ Production reality: Available to users
- ✗ Commercial pressure: Doesn't affect website owners
- ✗ Timeline impact: Not related to agent-mediated web interaction
- ✗ Ecosystem shift: Not about web commerce or browser automation

**Verdict:** Reject - Not related to the book's focus on web design for agents

### Scenario 2: Research Not Production

**Example:** "Research paper shows agents can navigate complex websites"

**Analysis:**
- ✓ Chapter validation: Relates to Chapter 2 navigation patterns
- ✗ Production reality: Academic research, not available product
- ✗ Commercial pressure: No immediate business impact
- ✗ Timeline impact: Theoretical advancement only
- ✗ Ecosystem shift: Not changing platform dynamics

**Verdict:** Reject - Interesting but not production reality

### Scenario 3: Incremental Feature Update

**Example:** "Claude Desktop adds new keyboard shortcut"

**Analysis:**
- ✗ Chapter validation: No chapter patterns validated
- ✓ Production reality: Available to users
- ✗ Commercial pressure: No business impact
- ✗ Timeline impact: Doesn't affect adoption timeline
- ✗ Ecosystem shift: Minor feature, not paradigm shift

**Verdict:** Reject - Too minor, no strategic significance

### Scenario 4: Future Promise

**Example:** "Google announces AI shopping assistant coming in Q3 2025"

**Analysis:**
- ✓ Chapter validation: Would relate to Chapter 4 commerce patterns
- ✗ Production reality: Not available yet, just announcement
- ⚠ Commercial pressure: Potential future impact
- ⚠ Timeline impact: Signals competitive response
- ⚠ Ecosystem shift: Could be significant when launched

**Verdict:** Reject for now - Re-evaluate when actually launched
**Alternative:** Note in PROJECTSTATE.md as "watching"

### Scenario 5: Qualifies - Good Example

**Example:** "Microsoft Copilot Checkout processes real transactions with partner retailers"

**Analysis:**
- ✓ Chapter validation: Chapter 4 e-commerce benefits, Chapter 9 structured data
- ✓ Production reality: Processing transactions now
- ✓ Commercial pressure: Partner retailers see improved conversion, others excluded
- ✓ Timeline impact: Validates "two years" timeline, possibly accelerates
- ✓ Ecosystem shift: Platform power shift to AI companies mediating commerce

**Verdict:** Accept - Meets all five criteria

## Edge Cases

### Beta But Broadly Available

**Question:** Product is labeled "beta" but available to millions of users. Qualify?

**Answer:** YES - If broadly accessible (e.g., all paid subscribers), consider it production reality.

**Example:** Claude for Chrome - "beta" but available to all paid Claude users

### Company-Reported Metrics Only

**Question:** News includes metrics but no independent validation. Qualify?

**Answer:** YES with qualifier - Include the news but note: "though these figures have not been independently validated"

**Example:** Microsoft Copilot conversion rate claims

### Partial Chapter Validation

**Question:** News validates one chapter but doesn't meet other criteria. Qualify?

**Answer:** NO - Must meet all five criteria. Suggest alternative documentation:
- Add to PROJECTSTATE.md as supporting evidence for chapter
- Reference in chapter revision if updating book
- Not suitable for blog/appendix

### Regional Launch

**Question:** Product launches in US only, global rollout planned. Qualify?

**Answer:** Depends on impact:
- If US market is substantial (millions of users) → YES, note geographic restriction
- If limited pilot (one city) → NO, wait for broader launch

## Presenting Rejection to User

When news doesn't qualify, explain clearly:

```markdown
## Relevance Assessment: [News Title]

### Analysis

✓ Production reality: [Explanation]
✗ Chapter validation: Could not identify specific chapters this validates or challenges
✗ Commercial pressure: No immediate business impact for website owners
✗ Timeline impact: Doesn't affect adoption timeline
✗ Ecosystem shift: Incremental feature, not paradigm shift

### Verdict

Does not meet inclusion criteria (requires ALL five criteria).

### Reason

This news is interesting but doesn't demonstrate the patterns discussed in the book or create urgency for website owners to adapt their designs.

### Alternative

- Document in PROJECTSTATE.md as industry watching
- Consider for social media mention
- Revisit if future developments make it more relevant
```

## User Override

User can override rejection if they can explain:

1. **Which chapters it validates** (with specific references)
2. **Why it creates commercial pressure** (who's affected and how)
3. **How it impacts timeline** (accelerates or validates projections)

**Require verification first:** Even with override, must pass fact-checking (verification-guidelines.md)

## Summary: The Bar is High

Better to reject 10 potentially relevant stories than to pollute the book documentation with one irrelevant story.

**When in doubt, reject and explain.**

The blog and appendix should contain only the most significant developments that:
- Validate the book's patterns in production
- Challenge assumptions with real-world evidence
- Create urgency for website owners to act
- Demonstrate ecosystem shifts in platform power

Anything less risks diluting the book's credibility and focus.
