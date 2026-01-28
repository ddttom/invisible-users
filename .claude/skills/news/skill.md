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

## Understanding the Book's Scope

**IMPORTANT:** The book covers two types of developments:

### 1. Direct Agent-Website Patterns
Technical patterns where AI agents interact with websites:
- Browser automation tools (Claude for Chrome, ChatGPT browser features)
- Agent-mediated commerce (Copilot Checkout, Agentic Commerce Protocol)
- Session inheritance, EAL delegation, structured data
- Patterns from Chapters 2, 3, 6, 9, 10, 11

### 2. Ecosystem Maturity Signals
Broader shifts demonstrating AI adoption velocity and commercial pressure:
- **Behavioral shifts:** How humans delegate tasks to AI (developers using ChatGPT instead of Stack Overflow)
- **Adoption velocity:** How quickly AI displaces traditional platforms (76% decline in 2 years)
- **Platform dynamics:** How established platforms respond to AI disruption
- Validates urgency from Preface, Chapter 1, Chapter 8

**Key insight:** When developers (who build websites) experience AI-mediated workflows firsthand, this creates urgency and empathy. News about **developers experiencing the shift they're designing for** validates the book's core thesis even if it doesn't directly relate to agent-website compatibility.

## Publication Status and Propagation Strategy

**BOOK PUBLISHED: 12 January 2026**

**Before publication (historical):**

- Updates propagated to manuscript files (`marketing/blog/book-updates.md` and `manuscripts/shared-appendices/appendix-j-industry-developments.md`)
- Changes tracked in version control
- Book republished with latest news

**After publication (NOW):**

- Book manuscript frozen, but appendices are LIVE online documents kept up to date
- Post-publication news propagates to THREE locations:
  1. `manuscripts/shared-appendices/web/news.html` at `https://allabout.network/invisible-users/news.html` (public-facing HTML)
  2. `marketing/blog/book-updates.md` (changelog tracking additions to Appendix J)
  3. `manuscripts/shared-appendices/appendix-j-industry-developments.md` (LIVE comprehensive record, new entries added to existing content)
- All three files track developments that would have been in the book had they happened before publication
- The six categories define what qualifies as significant post-publication news

**Key categories for news.html (all must relate to book chapters):**

1. **AI agent platform launches and capabilities**
   - Examples: Browser automation tools, shopping agents, new agent platforms
   - Validates: Chapters 2, 6, 9 (platform race, session inheritance, capabilities)

2. **Commerce protocol developments (ACP, UCP, proprietary systems)**
   - Examples: New protocols, protocol updates, merchant integrations, proprietary launches
   - Validates: Chapters 4, 9, 12 (commerce incentives, platform race, EAL)

3. **Identity delegation and authentication standards**
   - Examples: OAuth developments, delegation protocols, authentication standards
   - Validates: Chapters 4, 6, 12 (EAL delegation, security, missing EAL)

4. **Legal and regulatory changes affecting agent access**
   - Examples: Bot detection laws, agent access regulations, liability frameworks
   - Validates: Chapter 7 (legal landscape, liability, copyright)

5. **Major website implementations of agent-friendly patterns**
   - Examples: Sites adopting llms.txt, semantic HTML improvements, explicit state patterns
   - Validates: Chapters 10, 11 (designing for both, technical advice)

6. **Standards evolution (llms.txt adoption, proposed patterns becoming standards)**
   - Examples: llms.txt adoption announcements, W3C standardization, ai-* meta tags becoming standards
   - Validates: Chapters 10, 11, Appendix L (proposed patterns, standards evolution)

**All news MUST still meet the five relevance criteria** (production reality, commercial pressure, timeline impact, ecosystem shift) - the categories are thematic groupings, not exceptions to the criteria.

The `/news` skill ensures the news page stays current in this fast-moving "rocket-fuel mode" market without requiring book republication.

## Integration with Opportunity Skill

**Relationship between `/news` and `/opportunity` skills:**

**News skill focuses on:** Industry developments validating book thesis (thought leadership, market education)

**Opportunity skill focuses on:** Business development and revenue opportunities (consulting, partnerships, services)

**Handoff pattern:**

When `/news` identifies a vendor launch that reveals a business gap:

```text
/news [vendor AI feature launch]
  → Verifies facts about the launch
  → Checks relevance to book chapters
  → Identifies if launch reveals vendor gap
  → If gap exists: Suggests "Run /opportunity to document business case"

User: /opportunity [vendor] [gap description]
  → Analyzes commercial opportunity
  → Updates business-opportunities.md
  → Generates vendor-specific materials
  → Prepares for outreach
```

**Example flow:**

```text
User: /news Kentico launches AIRA AI marketing assistant

News skill analyzes:
✓ Verified: AIRA launched March 2025
✓ Relevance: Productivity tool, not agent-accessible output
✗ Doesn't meet five criteria (no chapter validation)
→ Rejected for news.html

BUT news skill identifies:
→ Gap: Vendor builds "AI content creation" without "agent-compatible output"
→ Business opportunity: Product integration partnership
→ Suggests: "This reveals business opportunity. Run `/opportunity kentico AIRA lacks agent-output validation`"

User: /opportunity kentico AIRA lacks agent-output validation

Opportunity skill:
✓ Analyzes gap (Product Integration type)
✓ Updates packages/sales-enablement/business/business-opportunities.md
✓ Generates kentico-opportunity-analysis.md
✓ Generates kentico-email-templates.md
✓ Generates kentico-pitch-one-pager.md
→ Complete vendor package ready for outreach
```

**Key distinction:**

- News = Public-facing thought leadership (validates book)
- Opportunity = Private business development (generates revenue)

**Both skills cross-reference:**
- News entries can mention "See business-opportunities.md for partnership implications"
- Opportunity entries reference news as market timing validation

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

## 8-Phase Workflow (Post-Publication - Updates All Three Files)

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

### Phase 5: Blog Changelog Entry Creation

**Automatic actions:**
- Create changelog entry noting addition to Appendix J
- Include date, headline, chapter validation
- Link to full entry in Appendix J
- Update footer timestamp

**Entry structure:**
```markdown
### [Date Added] - [Product/Development Name]

**Added to Appendix J:** [Full entry headline]

**Validates chapters:** X, Y, Z ([brief explanation])

**See:** Full 12-section entry in Appendix J: "[Entry title]"
```

**Insertion strategy:**
- Read current changelog file
- Add entry chronologically (most recent first)
- Keep it brief - full details are in Appendix J
- Update footer with today's date

**What I'll do:** Read blog file, create changelog entry, insert at top, update timestamp

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
- Ecosystem Maturity Signals (NEW: behavioral shifts, adoption velocity, platform displacement)

**What I'll do:** Read appendix, determine category, create structured entry, ADD to existing content (appendix is live document), insert chronologically within category, update timestamp

### Phase 7: News.html Entry Creation (POST-PUBLICATION ONLY)

**Automatic actions:**
- Read current news.html file
- Determine which of the six categories this news belongs to
- Create formatted HTML news entry
- Insert chronologically (most recent first)
- Update "Last updated" date in footer
- Preserve all HTML structure and styling

**Entry structure (HTML):**
```html
<article class="news-item" data-article-type="industry-update">
  <time class="news-date" datetime="YYYY-MM-DD">Month Year</time>
  <h2>[Headline]</h2>
  <p>[Introduction paragraph]</p>
  <p><strong>Key details:</strong></p>
  <ul>
    <li>[Bullet point]</li>
  </ul>
  <p><strong>Book validation:</strong> [Which chapters this validates/challenges]</p>
  <span class="tag">Category Tag</span>
</article>
```

**Category tags:**
- "Platform Launch" - AI agent platform launches and capabilities
- "Commerce Protocol" - ACP, UCP, proprietary systems
- "Identity Standards" - Identity delegation and authentication
- "Legal/Regulatory" - Legal and regulatory changes
- "Implementation" - Major website implementations
- "Standards Evolution" - llms.txt, proposed patterns

**What I'll do:** Read news.html, create entry, insert at top, update footer timestamp

### Phase 8: Final Verification

**Automatic actions:**
- Read all three updated files (news.html, blog, appendix)
- Verify HTML formatting in news.html:
  - Proper article structure
  - Valid datetime attributes
  - No unclosed tags
  - Consistent styling classes
- Verify markdown formatting in blog and appendix:
  - No MD024 (duplicate headings)
  - No MD040 (code blocks have language)
  - No MD034 (bare URLs)
- Check cross-references are accurate across all files
- Confirm date sequencing is correct

**What I'll do:** Validate all three files, report any issues

**What you'll do:** Review final entries

## File Locations

**POST-PUBLICATION targets (ALL THREE updated with each news item):**
- News page: `packages/shared-appendices/web/news.html` (public-facing HTML at https://allabout.network/invisible-users/news.html)
- Blog: `packages/manuscript/marketing/blog/book-updates.md` (changelog tracking additions to Appendix J)
- Appendix: `packages/shared-appendices/appendix-j-industry-developments.md` (LIVE comprehensive record, new entries ADDED to existing content)

**Reference files (read-only):**

- Chapters (MX-Bible): `packages/bible/chapter-*.md`
- Chapters (MX-Don't Make the AI Think): `packages/dont-make-ai-think/chapter-*.md`
- Chapters (MX-Handbook): `packages/mx-handbook/chapter-*.md`
- Book plan: `packages/bible/bible-plan.md`

**Supporting documentation:**
- `verification-guidelines.md` - Fact-checking process
- `relevance-checklist.md` - The five criteria
- `templates/appendix-entry.md` - Appendix 12-section structure

## Common Scenarios

### Scenario 1: Post-Publication News Qualifies

```
User: /news Anthropic announces new agent protocol with major retailers

Phase 1: ✓ Verified all claims via WebSearch
Phase 2: ✓ Meets all five criteria
Phase 3: ✓ Date after 12 Jan 2026 (post-publication)
Phase 4: User approves
Phase 5: Blog changelog entry created (notes addition to Appendix J)
Phase 6: Appendix entry created and ADDED to existing content (12-section format)
Phase 7: news.html entry created (HTML, public-facing)
  - Category: "Commerce Protocol"
  - Inserted at top (most recent)
  - Footer updated with today's date
Phase 8: ✓ All three files validated (HTML + markdown)

Result: New entry added to appendix-j.md, changelog entry added to blog, HTML entry added to news.html
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
Alternative: Document in CHANGELOG.md if desired
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
