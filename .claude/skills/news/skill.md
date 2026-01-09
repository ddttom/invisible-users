# News Update Skill

**Command:** `/news`

**Purpose:** Add verified, relevant industry news to the book's blog and appendix with proper date sequencing and validation.

## What This Skill Does

When you provide industry news about AI agents, web automation, or agent-mediated commerce, this skill:

1. **Verifies all claims** - Fact-checks against official sources
2. **Validates relevance** - Ensures news meets all five criteria for inclusion
3. **Sequences chronologically** - Places entries in correct order
4. **Creates entries** - Writes properly formatted blog and appendix entries
5. **Validates quality** - Checks markdown formatting and cross-references

## How to Use

```bash
/news [paste news content, article text, or URL]
```

**Examples:**

```bash
/news Google announces Shopping Agent with checkout capabilities, launching January 2025
```

```bash
/news https://techcrunch.com/2025/01/15/new-ai-shopping-assistant-launches
```

```bash
/news OpenAI announced browser automation features for ChatGPT, available to Plus subscribers
```

## 7-Phase Workflow

### Phase 1: Content Verification

**Automatic actions:**
- Read the news content you provided
- Extract key claims: product names, dates, companies, features
- Use WebSearch to verify against official sources
- Cross-reference multiple sources for consistency
- Check date consistency (announcement vs launch vs availability)

**Verification checklist:**
- ✓ Product/service name correct
- ✓ Company name accurate
- ✓ Launch date verified
- ✓ Availability details confirmed (beta/production, geographic limits)
- ✓ Partnership announcements real
- ⚠ Company-reported metrics flagged (if no independent validation)
- ✗ Contradictions identified

**What I'll do:** Present verification summary with ✓/⚠/✗ indicators

**What you'll do:** Confirm details or provide corrections if needed

**Reference:** See `verification-guidelines.md` for complete criteria

### Phase 2: Relevance Check

**Automatic actions:**
- Evaluate news against ALL FIVE criteria:
  1. **Chapter validation** - Does it demonstrate patterns from specific chapters?
  2. **Production reality** - Is it available to users NOW (not beta, research, or future)?
  3. **Commercial pressure** - Does it affect website owner decisions?
  4. **Timeline impact** - Does it accelerate adoption or validate projections?
  5. **Ecosystem shift** - Does it represent platform power dynamics or standards?

**For chapter validation:**
- Read relevant chapter files to verify connections
- Find specific patterns, predictions, or assumptions
- Use book's own terminology and quotes

**Scoring:**
- ALL YES → Qualifies for inclusion
- ANY NO → Does not qualify (will explain why)

**What I'll do:** Present relevance assessment with reasoning

**What you'll do:** Accept assessment or explain why override is justified

**Reference:** See `relevance-checklist.md` for complete criteria and examples

### Phase 3: Date Sequencing

**Automatic actions:**
- Extract launch/availability date (not just announcement)
- Read existing entries in both files
- Determine chronological placement within category
- Format dates properly:
  - **Blog:** Narrative integration or full date in heading
  - **Appendix:** British format (20 December 2024) in heading and metadata

**What I'll do:** Confirm date and placement

**What you'll do:** Verify date is correct if uncertain

### Phase 4: Fact-Check Summary and User Approval

**What I'll present:**

```markdown
## Verification Summary

### Product Details
- **Name:** [Verified name] ✓
- **Company:** [Verified company] ✓
- **Launch Date:** [Verified date] ✓

### Availability
- **Status:** [Beta/Production] ✓
- **Access:** [Who can use it] ✓
- **Geography:** [Where available] ✓

### Key Claims
- **Claim 1:** [Description] ✓
  - Source: [URL]
- **Claim 2:** [Description] ⚠ (unverified company metric)
  - Source: [URL]

### Relevance Assessment
✓ Chapter validation: Chapters 4, 6, 9
✓ Production reality: Available to all paid subscribers
✓ Commercial pressure: Creates urgency for website owners
✓ Timeline impact: Accelerates adoption timeline
✓ Ecosystem shift: Platform power dynamics

### Book Validation
- **Chapter 4:** "E-Commerce - Where Incentives Align" - [evidence]
- **Chapter 6:** "Session Inheritance Problem" - [evidence]
- **Chapter 9:** "Designing for Both" - [evidence]

### Recommendation
☑ Proceed - All criteria met, qualifiers noted for unverified metrics
```

**What you'll do:** Approve to proceed, or request corrections

### Phase 5: Blog Entry Creation

**Automatic actions:**
- Use narrative template from `templates/blog-entry.md`
- Write conversational introduction with urgency
- Create "What This Validates" and "What This Challenges" sections
- Add audience-specific action items
- Include qualifiers for unverified claims
- Update footer timestamp

**Entry structure:**
```markdown
### [Product Name] ([Date])

[Narrative paragraph with context and urgency]

**Key capabilities:**
- [Bullet points]

**What this validates:**
- **Chapter X ([Name]):** [Explanation]

**What this challenges:**
[Or note if fully aligns]

### What This Means for [Audience]
[Action items]
```

**Insertion strategy:**
- Read current blog file
- Determine insertion point (chronological narrative)
- May restructure section headings if needed
- Update footer with today's date

**What I'll do:** Read blog file, create entry, insert properly, update timestamp

### Phase 6: Appendix Entry Creation

**Automatic actions:**
- Use structured 12-section template from `templates/appendix-entry.md`
- Extract technical details into metadata format
- Write systematic validation against chapters
- Include cross-references and sources
- Maintain chronological order within thematic category

**12-section structure:**
1. Overview
2. Key Details (metadata)
3. Key Capabilities
4. Significance for This Book
5. Technical Implementation Insights
6. Business Model Implications
7. What This Validates
8. What This Challenges
9. Architectural Insights
10. Questions Raised
11. Strategic Implications for Readers
12. Cross-References
13. Sources

**Thematic categories:**
- Browser-Based Agent Tools
- Retail and Commerce Agents
- Platform Integration Developments
- Standards and Protocol Announcements
- Business Model Innovations
- Security and Identity Solutions

**What I'll do:** Read appendix, determine category, create structured entry, insert chronologically, update timestamp

### Phase 7: Final Verification

**Automatic actions:**
- Read both updated files
- Verify markdown formatting:
  - No MD024 (duplicate headings)
  - No MD040 (code blocks have language)
  - No MD034 (bare URLs)
  - Tables properly formatted
- Check cross-references are accurate
- Confirm date sequencing is correct

**What I'll do:** Run markdown linting checks, report any issues

**What you'll do:** Review final entries

## File Locations

**Primary targets:**
- Blog: `invisible-users/manuscript/blog/book-updates.md`
- Appendix: `invisible-users/manuscript/appendix-j-industry-developments.md`

**Reference files (read-only):**
- Chapters: `invisible-users/manuscript/chapter-*.md`
- Book plan: `invisible-users/book-plan.md`

**Supporting documentation:**
- `verification-guidelines.md` - Fact-checking process
- `relevance-checklist.md` - The five criteria
- `templates/blog-entry.md` - Blog format and style
- `templates/appendix-entry.md` - Appendix structure

## Common Scenarios

### Scenario 1: News Qualifies

```
User: /news Microsoft Copilot Checkout launches with partner retailers

Phase 1: ✓ Verified all claims
Phase 2: ✓ Meets all five criteria
Phase 3: ✓ Date sequenced
Phase 4: User approves
Phase 5: Blog entry created
Phase 6: Appendix entry created
Phase 7: ✓ Markdown valid

Result: Entries added to both files successfully
```

### Scenario 2: News Doesn't Qualify

```
User: /news Claude Desktop adds new keyboard shortcut

Phase 1: ✓ Verified (minor feature update)
Phase 2: ✗ Does not meet criteria
  - No chapter validation
  - No commercial pressure
  - No timeline impact
  - No ecosystem shift

Result: Rejected with explanation
Alternative: Document in PROJECTSTATE.md if desired
```

### Scenario 3: Verification Fails

```
User: /news New AI shopping tool launching next month

Phase 1: ✗ Verification issues
  - Cannot find official source
  - Launch date is future promise, not current reality
  - Conflicting information in sources

Result: Cannot proceed
Request: User provide official source or wait for actual launch
```

### Scenario 4: Unverified Metrics

```
User: /news Company X reports 300% conversion increase with AI agent

Phase 1: ⚠ Product verified, metrics unverified
Phase 2: ✓ Meets criteria (with caveats)
Phase 4: User approves with qualifiers
Phase 5-6: Entries include: "Company X reports [metric], though these figures have not been independently validated"

Result: Added with appropriate qualifiers
```

## Edge Cases

### Multiple News Items

If you provide multiple news items:
- Process each separately through verification
- Show verification summary for all
- You can approve/reject each individually
- Add only approved items

### Contradictory Information

If sources conflict:
- Present both versions
- Ask which source is authoritative
- Include qualifier in entry if unresolved
- Example: "Sources vary on launch date between [X] and [Y]"

### News Updates Existing Entry

If news expands existing entry (e.g., "Copilot Checkout expands to UK"):
- Detect existing entry
- Offer to update vs create new entry
- Maintain chronological records

### Breaking News Without Complete Details

If critical news lacks some details:
- Create entry with available information
- Mark incomplete sections: "[Details pending]"
- Plan follow-up update when details emerge

### New Thematic Category Needed

If news doesn't fit existing categories:
- Suggest new category name
- Ask for confirmation
- Add to appendix structure section

## Quality Standards

### Verification is Mandatory

- Never skip fact-checking, even if you seem confident
- Use WebSearch to find official sources
- Cross-reference multiple sources
- Read chapters to verify validation claims

### Relevance is Strict

- Better to reject than pollute documentation
- All five criteria must be met
- You can override with strong justification
- Must still pass verification even with override

### Writing Quality

**Blog entries:**
- Conversational, urgent tone
- British English (whilst, organise, colour)
- No exaggeration or superlatives
- Personal context where relevant

**Appendix entries:**
- Technical reference style
- Objective, balanced reporting
- Complete 12-section structure
- Systematic chapter validation

### Markdown Compliance

- No bare URLs (wrap in angle brackets)
- Unique headings (add context to avoid MD024)
- Code blocks specify language
- Tables properly formatted
- British date format (20 December 2024)

## Success Indicators

✓ All claims verified against official sources
✓ All five relevance criteria met
✓ Dates accurate and sequenced correctly
✓ Chapter validation verified by reading chapters
✓ Blog entry matches conversational tone
✓ Appendix entry follows 12-section template
✓ Markdown linting passes
✓ Cross-references accurate
✓ Timestamps updated

## Failure Indicators (Will Not Proceed)

✗ Cannot verify key claims
✗ Missing official sources
✗ Contradictory information unresolved
✗ Fails any of five relevance criteria
✗ Future promise, not current reality
✗ No chapter validation possible

## What You Control

**You decide:**
- Whether to provide additional sources
- Whether to override relevance rejection (with justification)
- Whether to proceed with unverified metrics (with qualifiers)
- Whether to wait for more information

**I handle:**
- Fact verification via WebSearch
- Reading chapter files to verify validation
- Creating properly formatted entries
- Maintaining chronological order
- Ensuring markdown quality
- Updating timestamps

## Tips for Best Results

1. **Provide URLs when possible** - Easier to verify from source
2. **Include launch dates** - Saves time in verification
3. **Note which chapters you think it validates** - I'll verify this
4. **Mention if metrics are unverified** - I'll add appropriate qualifiers
5. **Be specific about availability** - Beta vs production, geography, user tiers

## After Completion

Once entries are added successfully:

1. **Review the entries** - Check they accurately represent the news
2. **Commit changes** - Use `/step-commit` or manual commit
3. **Consider updates** - Does this affect other documentation?
4. **Share if desired** - Blog updates can be shared with readers

## Questions?

If you're unsure whether news qualifies, just provide it - I'll evaluate and explain the assessment.

If verification reveals issues, I'll present them clearly so you can decide how to proceed.

The goal is to maintain the book's credibility by including only verified, relevant developments that demonstrate the patterns discussed throughout the manuscript.

---

## Quick Reference: The Five Criteria

1. **Chapter Validation** - Demonstrates patterns from specific chapters
2. **Production Reality** - Available to users NOW (not research/future)
3. **Commercial Pressure** - Affects website owner decisions
4. **Timeline Impact** - Accelerates adoption or validates projections
5. **Ecosystem Shift** - Platform power dynamics or standards

**All five must be YES to qualify.**
