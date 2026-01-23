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
4. Generate critique paragraph

**Check for robots.txt:**
1. Fetch `[URL]/robots.txt`
2. Analyze directives: User-agent, Disallow, Allow, Sitemap
3. Check for overly restrictive rules blocking agents
4. Identify any AI bot restrictions (GPTBot, ChatGPT-User, etc.)
5. Generate critique paragraph

### Step 5: Read Template

Read the template file: `packages/sales-enablement/outreach/web-audit-suite-template.md`

This template contains:
- Placeholder structure with `[BRACKET_NOTATION]`
- Section layout and formatting
- Instructions to remove before sending

### Step 6: Generate Client Report

**Extract client information:**
- Client name: Derive from domain
- Client short name: Lowercase slug (e.g., "cmscritic")
- Date: Today's date (YYYY-MM-DD format)
- Report ID: `[CLIENT_SHORT_NAME]-WEB-AUDIT-[YYYYMMDD]`

**Fill in all placeholders with actual audit data:**

Replace these key placeholders:
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

**Priority Classification:**
- 🔴 Priority 1: Issues scoring 0-30/100 or critical compliance failures
- 🟡 Priority 2: Issues scoring 30-70/100 or high impact improvements
- 🔵 Priority 3: Issues scoring 70-90/100 or medium impact enhancements

**Remove template instructions:**
- Delete the HTML comment block at the top
- Delete the "Usage Instructions for This Template" section at the bottom
- Remove all `[PLACEHOLDER]` notation comments

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

Report to user:
- ✅ Audit completed: [NUMBER] pages analyzed
- ✅ Report generated: `packages/sales-enablement/outreach/YYYY-MM-DD/[client-short-name]-report.md`
- 📊 Key findings:
  - Performance: [SCORE]/100
  - Accessibility: [SCORE]/100 ([NUMBER] issues)
  - SEO: [SCORE]/100
  - AI Agent Suitability: [SCORE]/100
- 💼 Engagement options: £18k-£85k (see report for details)
- 📁 Full audit results: `packages/web-audit-suite/results/`

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

User: "Run audit-site for https://cmscritic.com"

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
