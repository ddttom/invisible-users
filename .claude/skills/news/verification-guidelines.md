# News Verification Guidelines

## Purpose

Before adding any industry news to the book documentation, verify all factual claims to protect the book's credibility and ensure accuracy.

## Verification Requirements

### Factual Claims to Verify

1. **Product/Service Names**
   - Exact spelling and capitalization
   - Official product name vs media variations
   - Example: "Claude for Chrome" not "Chrome Claude"

2. **Company Names**
   - Accurate company attribution
   - Parent company vs subsidiary
   - Example: "Anthropic" not "Anthropic AI" or "Claude AI"

3. **Launch Dates**
   - Announcement date vs launch date vs availability date
   - Geographic rollout differences
   - Beta vs production release dates

4. **Availability Details**
   - Who can access: all users, paid users, specific tiers, invite-only
   - Geographic restrictions: US-only, global, specific regions
   - Platform restrictions: Chrome-only, all browsers, specific OS

5. **Partnership Announcements**
   - Confirm both partners acknowledge the relationship
   - Verify scope: exclusive, non-exclusive, pilot, full partnership

6. **Statistics and Metrics**
   - Source of data: company-reported, third-party validated, analyst estimates
   - Time period covered
   - Methodology (if available)

## Verification Methods

### 1. Official Sources (Primary)

**Search patterns:**
- `"[Product Name]" official announcement [Company Name]`
- `site:[company-domain] "[Product Name]" launch`
- `"[Product Name]" press release [Company Name]`

**Sources to check:**
- Company blog posts
- Official press releases
- Product documentation pages
- Official social media accounts (verified accounts only)

### 2. Direct Product Links

**Verification points:**
- Chrome Web Store listing (for browser extensions)
- App Store / Play Store listings (for mobile apps)
- Official product landing pages
- GitHub repositories (for open source)

### 3. Reputable Tech Media

**Acceptable sources:**
- TechCrunch, The Verge, Ars Technica, Wired
- Company blogs (Anthropic, Microsoft, Google)
- Industry-specific publications (VentureBeat, etc.)

**Red flags:**
- Unnamed sources
- "Reportedly" or "allegedly" without attribution
- Single-source reporting with no confirmation
- Blog posts or social media without official confirmation

### 4. Cross-Reference Multiple Sources

**Minimum requirement:**
- At least 2 independent sources for major claims
- Official source + reputable media for launch announcements
- Multiple sources for statistics or metrics

**Check for consistency:**
- Do all sources agree on dates?
- Do availability details match?
- Are feature descriptions consistent?

## Date Consistency Checks

### Common Date Types

1. **Announcement Date** - When company announces the product
2. **Launch Date** - When product becomes available
3. **Availability Date** - When users can actually access it

**Example timeline:**
- Announced: December 1, 2024
- Launched: December 20, 2024 (for US users)
- Available globally: January 15, 2025

### What to Use

**For chronological sequencing:**
Use the **launch/availability date** (when users can access it)

**For narrative context:**
Note announcement date if significantly different from launch

## Verification Status Labels

Use these labels when presenting verification results:

### ✓ Verified

- Confirmed from official source
- Cross-referenced in multiple sources
- Dates and details are consistent
- Direct product link available

### ⚠ Unverified

- Only single source available
- Company-reported metrics without independent validation
- Details are incomplete but core facts are confirmed
- "Reportedly" or similar qualifier needed

### ✗ Contradiction

- Different sources report conflicting information
- Dates don't match across sources
- Availability details conflict
- Official source contradicts media reports

### ❓ Unclear

- Cannot find official source
- Dates are ambiguous or missing
- Availability details not specified
- Need user to provide clarification

## Red Flags: Do Not Proceed

### Automatic Rejection

1. **No official source found**
   - Cannot verify product name or company attribution
   - No press release, blog post, or documentation

2. **Contradictory information unresolved**
   - Sources fundamentally disagree on key facts
   - Cannot determine which source is authoritative

3. **Speculation or rumors**
   - "Reportedly working on..."
   - "Sources say..."
   - "Expected to launch..."
   - Unless user explicitly wants to add as rumor with qualifiers

4. **Outdated information**
   - Announcement of something that never launched
   - Beta that was cancelled
   - Product that has since been discontinued

### Warning: Proceed with Caution

1. **Company-reported metrics only**
   - Example: "Microsoft reports conversion rate doubled"
   - Add qualifier: "though these figures have not been independently validated"

2. **Partial availability**
   - Example: "US-only launch, global rollout planned"
   - Note geographic restrictions clearly

3. **Beta vs production ambiguity**
   - Some sources say beta, others say production
   - Ask user for clarification, note current status

## Verifying Book Chapter Validation

### Critical Step: Read Chapter Content

**Don't assume** - Always read the actual chapter to verify validation claims:

1. **Search chapter for relevant patterns:**
   - Look for specific technical patterns (session inheritance, explicit state, etc.)
   - Find business implications (conversion rates, customer relationships)
   - Identify security concerns mentioned

2. **Match news to chapter content:**
   - Does the news demonstrate the pattern?
   - Does it validate the prediction?
   - Does it challenge an assumption?

3. **Use book's own language:**
   - Quote from the chapter when describing validation
   - Use the book's terminology
   - Reference specific section headings if applicable

**Example verification:**

News: "Claude for Chrome inherits user's authenticated session"
Chapter 6 search: "session inheritance problem"
Result: ✓ Validates - Chapter 6 lines 145-178 discuss this exact pattern

## Verification Checklist Template

Use this template when presenting verification results:

```markdown
## Verification Summary

### Product Details
- **Name:** [Verified name] ✓
- **Company:** [Verified company] ✓
- **Launch Date:** [Verified date] ✓ / ⚠ / ✗

### Availability
- **Status:** [Beta / Production / Invite-only] ✓ / ⚠
- **Access:** [Who can use it] ✓
- **Geography:** [Where available] ✓ / ⚠

### Key Claims
- **Claim 1:** [Description] ✓ / ⚠ / ✗
  - Source: [URL]
- **Claim 2:** [Description] ✓ / ⚠ / ✗
  - Source: [URL]

### Book Validation
- **Chapter X:** [Pattern validated] ✓
  - Evidence: [Quote or reference from chapter]
- **Chapter Y:** [Assumption challenged] ✓
  - Evidence: [Quote or reference from chapter]

### Sources
1. Official: [URL]
2. Media: [URL]
3. Direct link: [URL]

### Recommendation
[ ] Proceed - All critical facts verified
[ ] Proceed with caveats - Note unverified claims: [list]
[ ] Do not proceed - Contradictions unresolved: [explain]
[ ] Need clarification - Questions for user: [list]
```

## Post-Verification Actions

### If Verification Passes

1. Present summary to user
2. Note any caveats (unverified metrics, geographic restrictions)
3. Request explicit approval: "Proceed with these findings?"
4. Move to entry creation phase

### If Verification Fails

1. Present contradictions or missing information
2. Ask user for clarification or additional sources
3. Offer to search for more information
4. Do not proceed without resolution

### If Partial Verification

1. Present what's verified vs unverified
2. Suggest qualifiers for unverified claims
3. Ask if user wants to proceed with caveats
4. If yes, ensure entries include appropriate qualifiers

## Example: Good vs Bad Verification

### Good Verification Example

```
✓ Claude for Chrome - Verified
- Official source: Anthropic blog post (Dec 20, 2024)
- Chrome Web Store: https://chromewebstore.google.com/...
- TechCrunch coverage confirms all details
- Availability: All paid subscribers (Pro, Team, Enterprise)
- Status: Beta release in production
- Chapter validation confirmed: Read Chapter 6, lines 145-178

Proceed? Yes ✓
```

### Bad Verification Example (Do Not Proceed)

```
✗ "ChatGPT Shopping" - Issues Found
- No official announcement found
- TechCrunch article says "reportedly working on"
- No product page exists
- Sources conflict on timeline (Q1 2025 vs Q3 2025)
- Cannot verify chapter validation - which chapter does this relate to?

Proceed? No ✗
Need: Official source or user clarification
```

## Notes

- **Verification is mandatory** - Never skip this phase
- **Be conservative** - When in doubt, ask for clarification
- **Document sources** - Always include URLs in verification summary
- **Read chapters** - Don't assume validation, verify it
- **User can override** - But only after seeing verification results
