# audit-site

Run comprehensive web audit and generate executive sales report for a client website.

## When to Use

Use this skill when the user provides a client URL and wants to:

1. Run a complete web audit using the Web Audit Suite
2. Generate an executive sales report based on the findings
3. Create a customized report for business development

## Arguments

- **URL** (required): Client website URL to audit (e.g., `https://example.com`)
- **Max pages** (optional): Maximum number of pages to audit (default: 4)

## Workflow

When this skill is invoked, follow these steps systematically:

### Step 1: Validate Input and Setup

1. Extract the URL from the user's prompt
2. Validate URL format (must start with http:// or https://)
3. Create output directory: `packages/sales-enablement/outreach/YYYY-MM-DD/`
4. Extract client name from domain (e.g., `cmscritic.com` → `cmscritic`)

### Step 2: Run Web Audit

**CRITICAL:** Always clear cache before running audit to ensure fresh data.

1. Navigate to project root (verify with `pwd`)
2. Clear audit cache: `npm run audit:start -- -s [URL] -c [MAX_PAGES] --no-recursive --force-delete-cache`
3. Wait for audit to complete (may take 2-5 minutes)
4. Verify results generated in `packages/web-audit-suite/results/`

**Key result files to read:**

- `results/executive_summary.md` - Overall scores
- `results/accessibility_report.csv` - WCAG compliance issues
- `results/llm_general_suitability.csv` - AI agent compatibility
- `results/seo_scores.csv` - SEO metrics
- `results/image_optimization.csv` - Image analysis
- `results/performance_metrics.csv` - Performance data

### Step 3: Analyze Audit Results

Read ALL result files and extract key metrics:

**Performance Metrics:**

- Average load time
- First Contentful Paint (FCP)
- Cumulative Layout Shift (CLS)
- Overall performance score (0-100)

**Accessibility Issues:**

- Total WCAG AA errors (by page)
- Critical issues breakdown
- Color contrast failures
- Missing ARIA labels
- Alt text issues

**AI Agent Suitability:**

- Served HTML score
- Rendered HTML score
- Has `<main>` element?
- Has `<nav>` element?
- Schema.org present?
- Open Graph tags present?

**SEO Scores:**

- Page titles optimized?
- Meta descriptions present?
- Image alt text percentage

**Image Optimization:**

- Total images analyzed
- Images missing lazy loading
- Images missing alt text
- Images missing width/height

### Step 4: Check llms.txt and robots.txt

**Check for llms.txt:**

1. Attempt to fetch `[URL]/llms.txt`
2. If found, analyze structure and content quality
3. Note any issues: missing metadata, poor formatting, incomplete sections
4. Generate critique paragraph with this context:

   **IMPORTANT CONTEXT:** llms.txt is an emerging standard (not yet universal). Include this framing in reports:

   - llms.txt is a new standard for AI agent discovery
   - Not all agents currently read it (adoption is growing)
   - As Machine Experience (MX) practices spread in the industry, llms.txt adoption will increase
   - Early adopters gain first-mover advantage in AI agent visibility
   - The standard is documented at llmstxt.org and in MX-Bible Appendix H

   **Example framing for reports:**
   "The llms.txt standard is emerging as the preferred method for AI agent discovery. While not all agents currently read it, adoption is growing rapidly as Machine Experience (MX) best practices spread throughout the industry. Early implementation provides a first-mover advantage in AI agent visibility."

**Check for robots.txt:**

1. Fetch `[URL]/robots.txt`
2. Analyze directives: User-agent, Disallow, Allow, Sitemap
3. Check for overly restrictive rules blocking agents
4. Identify any AI bot restrictions (GPTBot, ChatGPT-User, etc.)
5. Generate critique paragraph

### Step 4.5: Manual HTML Verification

**CRITICAL:** This step adds manual verification to supplement automated audit findings.

**Skip Condition:** If URL ends with `.xml` (sitemap files), skip this entire step.

**Process:**

1. **Extract Homepage URL:**
   - Read `packages/web-audit-suite/results/results.json`
   - Use the first URL from the results
   - OR extract base domain from sitemap URL if provided

2. **Perform Manual HTML Analysis:**

   Use WebFetch tool with this comprehensive analysis prompt:

   ```text
   "Analyze this HTML page comprehensively for accessibility and AI agent compatibility:

   1. DOM Structure:
      - Heading hierarchy (H1-H6 presence, order, nesting)
      - Are there multiple H1s or skipped heading levels?
      - Semantic landmarks (<main>, <header>, <footer>, <nav>, <aside>, <article>, <section>)
      - Are any structural elements empty (header/footer with no content)?

   2. Metadata:
      - Does <html> tag have lang attribute?
      - Is character encoding declared (<meta charset>)?
      - Is viewport properly configured?

   3. Accessibility:
      - Navigation structure and skip links
      - Form accessibility (labels, fieldsets, ARIA, autocomplete attributes)
      - Interactive elements (proper button/link usage, ARIA states)
      - Keyboard navigation support

   4. Code Quality:
      - Redundant ARIA on semantic elements (e.g., <nav role='navigation'>)
      - Semantic violations (divs instead of buttons/links)
      - Heading structure issues

   5. Positive Patterns:
      - Well-implemented accessibility features
      - Good semantic structure
      - Proper ARIA usage
      - Image optimization (lazy loading, responsive images, WebP support)

   For each finding, provide:
   - Specific code examples (current HTML)
   - Fixed code examples (recommended implementation)
   - WCAG violation codes where applicable (e.g., WCAG 3.1.1 Level A)
   - User impact and AI agent impact

   Focus on issues that automated tools might miss."
   ```

3. **Structure Manual Findings:**

   Organize findings into a `manualFindings` object:

   ```javascript
   manualFindings = {
     critical: [
       {
         title: "Issue Title",
         wcagViolation: "WCAG X.X.X Level A/AA",
         description: "Clear description of the issue",
         currentHTML: "<!DOCTYPE html>\n<html>\n  <head>",
         fixedHTML: "<!DOCTYPE html>\n<html lang=\"es\">\n  <head>",
         impact: [
           "Screen readers use wrong pronunciation rules",
           "AI agents apply incorrect language models",
           "Search engines may misidentify content language"
         ],
         reference: "MX-Bible Chapter 3 (Semantic HTML Foundations)"
       }
     ],
     highPriority: [],
     medium: [],
     positivePatterns: [
       {
         title: "Strength Title",
         description: "Description of well-implemented pattern",
         codeExample: "<img src=\"image.webp\" loading=\"lazy\" width=\"800\" height=\"600\" alt=\"Description\">",
         impact: "Faster page loads, better mobile performance"
       }
     ]
   }
   ```

4. **Error Handling:**
   - If WebFetch times out or fails: Log warning, continue with automated data only
   - If homepage not found: Try `{baseURL}/index.html`, then `{baseURL}/`, then skip
   - If non-HTML content: Detect Content-Type, skip verification
   - If manual findings duplicate Pa11y issues: Cross-reference and enhance rather than duplicate

5. **Store for Report Generation:**
   - Keep `manualFindings` object available for Step 6
   - Flag manual verification as completed/skipped/failed for Step 13 summary

### Step 5: Select Report Template

**CRITICAL:** Template selection now depends on audit data quality and robots.txt availability.

**Decision Tree:**

1. **Read `packages/web-audit-suite/results/results.json`**

2. **Check for template selection criteria:**

   ```text
   IF robots.txt quality score = 0 OR robots.txt content missing:
      → Use: packages/sales-enablement/outreach/2026-01-23/manual-report-template.md
      → Reason: "robots.txt unavailable or invalid"
      → Type: "manual"

   ELSE IF pages analyzed < 3:
      → Use: packages/sales-enablement/outreach/2026-01-23/manual-report-template.md
      → Reason: "limited audit scope"
      → Type: "manual"

   ELSE IF Pa11y/performance/SEO/LLM metrics incomplete in results.json:
      → Use: packages/sales-enablement/outreach/2026-01-23/manual-report-template.md
      → Reason: "incomplete automated metrics"
      → Type: "manual"

   ELSE:
      → Use: packages/sales-enablement/outreach/web-audit-suite-template.md
      → Reason: "full automated audit data available"
      → Type: "automated"
   ```

3. **Store selection for later steps:**
   - `templateType` = "manual" or "automated"
   - `templateReason` = reason string for Step 13 summary
   - `templatePath` = full path to selected template file

4. **Read selected template file**

**Template Characteristics:**

**Automated Template** (`web-audit-suite-template.md`):

- Placeholder structure with `[BRACKET_NOTATION]`
- Designed for multi-page audits with complete metrics
- Business-focused executive sales report
- 610 lines, comprehensive analysis

**Manual Template** (`manual-report-template.md`):

- Technical audit report format
- Designed for single-page sites, preview environments, robots.txt blocked sites
- Focus on HTML structure, standards compliance, production readiness
- 339 lines, technical focus
- Manual findings will be primary content source

### Step 6: Generate Client Report

**ENHANCED:** This step now integrates manual verification findings based on template type.

**Extract client information:**

- Client name: Derive from domain
- Client short name: Lowercase slug (e.g., "cmscritic")
- Date: Today's date (YYYY-MM-DD format)
- Report ID: `[CLIENT_SHORT_NAME]-WEB-AUDIT-[YYYYMMDD]`

**Priority Classification:**

- 🔴 Priority 1: Issues scoring 0-30/100 or critical compliance failures
- 🟡 Priority 2: Issues scoring 30-70/100 or high impact improvements
- 🔵 Priority 3: Issues scoring 70-90/100 or medium impact enhancements

---

**IF templateType = "manual":**

**Manual Report Template Integration:**

1. **Fill Basic Placeholders:**
   - `[Site Name]` - Client name
   - `[Environment]` - Extract from URL (e.g., "Production", "Preview")
   - `[DD Month YYYY]` - Today's date formatted
   - `[SITE-NAME-WEB-AUDIT-YYYYMMDD]` - Report ID
   - `[Environment Description]` - Context about site type
   - `[Number]` - Counts for pages, images, issues
   - `[Language]` - Detected content language

2. **Insert Manual Findings into Priority 1 Section:**

   For each finding in `manualFindings.critical`, format as shown below (code examples should use actual HTML from findings):

3. **Insert Manual Findings into Priority 2/3 Sections:**

   Follow same structure for `manualFindings.highPriority` and `manualFindings.medium`

4. **Insert Positive Findings Section:**

   For each finding in `manualFindings.positivePatterns`:

   ```markdown
   ### [Number]. [Title]

   [Description with code examples]

   **Best practices observed:**

   - [Practice with code example from codeExample field]

   **Impact:** [Quantified benefit from impact field]
   ```

5. **Fill Automated Data (where available):**
   - Accessibility scores from Pa11y
   - Performance metrics if collected
   - SEO scores if available
   - Image optimization data

6. **Append Manual Analysis Methodology:**

   Add to Appendix section:

   ```markdown
   ### Appendix: Manual Analysis Methodology

   #### Audit Limitations

   This audit combined automated tooling with manual HTML inspection due to [templateReason].

   #### Analysis Process

   1. **Automated Analysis:** Web Audit Suite (Pa11y, performance metrics, SEO analysis)
   2. **Manual HTML Inspection:** DOM structure, accessibility patterns, code quality
   3. **robots.txt Analysis:** [Status and findings]
   4. **llms.txt Discovery:** [Status and findings]

   #### Metrics Summary

   - Pages analyzed: [NUMBER]
   - Analysis method: Hybrid (automated + manual verification)
   - robots.txt status: [STATUS]
   - llms.txt status: [STATUS]
   ```

---

**ELSE IF templateType = "automated":**

**Automated Report Template Integration:**

1. **Fill Standard Placeholders:**
   - `[CLIENT_NAME]` - Full client company name
   - `[DATE]` - Today's date
   - `[CLIENT_SHORT_NAME]` - Lowercase slug
   - `[PERFORMANCE_SCORE]` - From executive_summary.md
   - `[A11Y_SCORE]` - From accessibility_report.csv
   - `[SEO_SCORE]` - From seo_scores.csv
   - `[LLM_SCORE]` - From llm_general_suitability.csv
   - `[NUMBER_OF_ISSUES]` - Total accessibility errors
   - `[ELEVATOR_PITCH]` - Craft compelling 2-3 sentence summary
   - `[PRIMARY_FINDING_TITLE]` - Identify main opportunity
   - `[CLIENT_CONTEXT]` - Research and write 2-3 paragraphs about client
   - `[CRITICAL_ISSUE_X_TITLE]` - Specific issue titles
   - `[TIMEFRAME]` - Estimate based on scope
   - `[INVESTMENT]` - Price ranges (use template guidance)

2. **Enhance with Manual Verification Subsections:**

   Find relevant priority sections in template and add manual verification context:

   ```text
   #### [Existing Automated Finding Title]

   [Pa11y automated data and metrics]

   **Manual Verification:**

   [Insert specific code examples from manualFindings that relate to this issue]

   [Add context beyond what automation detected]

   [Cross-reference related manual findings]
   ```

   **Example:**

   ```markdown
   #### Missing ARIA Labels on Forms

   **Automated Detection:** Pa11y identified 12 form inputs without associated labels.

   **Manual Verification:**

   Current implementation shows forms using placeholder text instead of labels:

   ```html
   <input type="email" placeholder="Enter your email">
   ```

   This violates WCAG 3.3.2 because placeholders disappear on focus. Recommended fix:

   ```html
   <label for="email">Email Address</label>
   <input type="email" id="email" placeholder="example@domain.com">
   ```

   Additionally, manual inspection revealed the form lacks `autocomplete` attributes (recommended in WCAG 2.1.1):

   ```html
   <input type="email" id="email" autocomplete="email">
   ```

3. **Add Positive Patterns Section:**

   If manual verification found well-implemented patterns, add to "What's Working Well" section:

   ```markdown
   ### [Number]. [Positive Pattern Title]

   Manual code review identified excellent implementation of [pattern]:

   [Code example from manualFindings.positivePatterns]

   **Impact:** [Benefit description]
   ```

---

**FOR BOTH TEMPLATE TYPES:**

**Remove template instructions:**

- Delete any HTML comment blocks
- Delete "Usage Instructions" sections
- Remove all `[PLACEHOLDER]` notation comments
- Remove instructional text intended for template users

### Step 7: Add YAML Frontmatter

Add comprehensive YAML frontmatter at the very top of the report:

```yaml
---
title: "[Client Name]: Website Analysis & AI Agent Optimization Opportunity"
author: "Tom Cranstoun"
date: "YYYY-MM-DD"
client: "[Client Name]"
client-slug: "[client-short-name]"
client-url: "[URL]"
report-id: "[CLIENT_SHORT_NAME]-WEB-AUDIT-[YYYYMMDD]"
report-type: "executive-sales-report"
audit-tool: "web-audit-suite"
audit-date: "YYYY-MM-DD"
description: "Executive sales report analyzing website accessibility, performance, SEO, and AI agent compatibility for [Client Name]"
keywords: [web-audit, accessibility, wcag-aa, ai-agents, seo, performance, executive-report]
performance-score: [SCORE]
accessibility-score: [SCORE]
seo-score: [SCORE]
llm-suitability-score: [SCORE]
total-issues: [NUMBER]
pages-analyzed: [NUMBER]
images-analyzed: [NUMBER]
engagement-options:
  - name: "Critical Compliance Fix"
    duration: "4-6 weeks"
    investment: "£18k-£28k"
  - name: "Complete Agent Optimization"
    duration: "8-12 weeks"
    investment: "£42k-£62k"
  - name: "Strategic Partnership"
    duration: "12+ weeks + ongoing"
    investment: "£60k-£85k + £5k-£8k/month"
document-version: "1.0"
confidential: true
ai-instruction: "This is an executive sales report. Focus on business impact, ROI, and competitive advantage rather than technical implementation details."
---
```

### Step 8: Customize Business Context

**Research client (use web search if needed):**

- What industry are they in?
- Who is their target audience?
- What problems do they solve?
- Who are their main competitors?

**Write customized sections:**

- Executive Summary: Compelling 30-second pitch
- The Opportunity: Why this matters for their specific business
- Business Case: Industry-specific timing and competitive advantage
- Competitive Advantage: Research and name 2-3 actual competitors

**Tone adjustments:**

- B2B Enterprise: More formal, focus on compliance and risk mitigation
- B2C/Media: Focus on user experience and discovery
- SaaS/Technology: Emphasize innovation and first-mover advantage
- Publishing: Content discoverability and citation advantage

### Step 9: Verify Markdown Quality

Before writing, ensure:

- All lists have blank lines before and after
- All code blocks have language specifiers (use `text` for pseudo-code)
- All URLs are wrapped in angle brackets or markdown links
- No bare emphasis used as headings
- No duplicate heading text (add context to differentiate)

### Step 10: Write Report File

1. Construct filename: `[client-short-name]-report.md`
2. Full path: `packages/sales-enablement/outreach/YYYY-MM-DD/[client-short-name]-report.md`
3. Write complete report with:
   - YAML frontmatter at top
   - All placeholders replaced
   - Customized business context
   - llms.txt critique in Appendix (if found)
   - robots.txt critique in Appendix
   - All template instructions removed
4. Use Write tool (file doesn't exist yet)

### Step 11: Verify and Lint

1. Run markdownlint on generated report:

   ```bash
   npx markdownlint -c config/.markdownlint.json packages/sales-enablement/outreach/YYYY-MM-DD/[client-short-name]-report.md
   ```

2. Fix any linting errors automatically
3. Re-run lint to verify clean

### Step 12: Summary

**ENHANCED:** Summary now includes template selection and manual verification status.

Report to user:

- ✅ Template used: [templateType] - [templateReason]
- ✅ Audit completed: [NUMBER] pages analyzed
- ✅ Manual verification: [completed/skipped - sitemap.xml/failed - see note]
- ✅ Report generated: `packages/sales-enablement/outreach/YYYY-MM-DD/[client-short-name]-report.md`
- 📊 Key findings:
  - Performance: [SCORE]/100
  - Accessibility: [SCORE]/100 ([NUMBER] issues)
  - SEO: [SCORE]/100
  - AI Agent Suitability: [SCORE]/100
- 💼 Engagement options: £18k-£85k (see report for details)
- 📁 Full audit results: `packages/web-audit-suite/results/`

**IF templateType = "manual":**

Add conditional note:

- ℹ️  Note: Manual report template used due to [templateReason]

**Manual Verification Status:**

- **"completed"** - Manual HTML verification performed via WebFetch
- **"skipped - sitemap.xml"** - URL was sitemap.xml file (manual verification not applicable)
- **"failed - WebFetch timeout"** - Manual verification attempted but failed (automated data only)

## Important Notes

**Cache Management:**

- Always use `--force-delete-cache` to ensure fresh data
- Don't reuse cached results from previous audits

**URL Handling:**

- Always use `--no-recursive` flag to limit crawling
- Specify `-c [MAX_PAGES]` to control scope
- URLs must include protocol (https://)

**Investment Ranges:**

- Critical fixes only: £12k-£28k (4-6 weeks)
- Comprehensive optimization: £35k-£65k (8-12 weeks)
- Strategic partnership: £60k-£90k initial + £5k-£10k/month
- Adjust based on client size and complexity

**Template Customization:**

- NEVER send with `[PLACEHOLDERS]` unfilled
- ALWAYS remove instruction blocks
- ALWAYS customize business context
- ALWAYS research actual competitors

**Markdown Standards:**

- Use project markdownlint config: `config/.markdownlint.json`
- Fix all errors before committing
- Wrap URLs in angle brackets
- Add blank lines around lists

## Example Usage

User: "Run audit-site for <https://cmscritic.com>"

Expected actions:

1. Create `packages/sales-enablement/outreach/2026-01-23/`
2. Run: `npm run audit:start -- -s https://cmscritic.com -c 4 --no-recursive --force-delete-cache`
3. Read all result files
4. Check llms.txt and robots.txt
5. Fill template with actual data
6. Add YAML frontmatter
7. Write: `packages/sales-enablement/outreach/2026-01-23/cmscritic-report.md`
8. Lint and fix errors
9. Report summary to user

## Error Handling

**Audit fails:**

- Check URL accessibility (may be blocked)
- Verify network connection
- Check for robots.txt restrictions
- Try with fewer pages (`-c 2`)

**Missing result files:**

- Audit may have encountered errors
- Check console output for failures
- Some metrics may not be available for all sites

**Template placeholders remaining:**

- Review each section manually
- Some data may need to be inferred or researched
- Use "Unknown" or "Pending analysis" if data unavailable

## Related Skills

- `/step-commit` - Commit generated report to git
- `/md-fix` - Fix markdown linting issues
- `/review-docs` - Review report against writing style guide
