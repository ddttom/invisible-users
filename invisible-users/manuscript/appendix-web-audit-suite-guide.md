# Appendix C: Web Audit Suite User Guide

Complete guide to auditing your website for AI agent compatibility using Web Audit Suite.

## Installation

```bash
git clone https://github.com/ddttom/invisible-users.git
cd invisible-users/web-audit-suite
npm install
```

## Basic Usage

### Single Page Audit

```bash
# Audit your homepage
npm start -- -s https://example.com -c 10
```

### Full Site Audit

```bash
# Audit from sitemap (unlimited pages)
npm start -- -s https://example.com/sitemap.xml -c -1

# Audit specific number of pages
npm start -- -s https://example.com/sitemap.xml -c 50
```

### Complete Audit with All Reports

```bash
npm start -- -s https://example.com \
  --enable-history \
  --generate-dashboard \
  --generate-executive-summary
```

## Understanding Your Reports

### Core Reports (15 files)

#### 1. LLM General Suitability (`llm_general_suitability.csv`)

**Purpose:** Overall AI agent compatibility score

**Key Columns:**

- `url`: Page URL
- `served_score`: Score for served HTML (0-100) - works for ALL agents
- `rendered_score`: Score for rendered HTML (0-100) - works for browser agents
- `overall_score`: Weighted average emphasizing served HTML
- `issues_found`: Number of compatibility issues detected

**Interpreting Scores:**

| Score Range | Category | Meaning | Action Required |
| ----------- | -------- | ------- | --------------- |
| 0-40 | Low | Critical issues, agents fail frequently | Immediate action needed |
| 41-60 | Moderate-low | Basic functionality, many problems | Systematic improvements required |
| 61-80 | Moderate-high | Good implementation, minor gaps | Refinement and optimization |
| 81-100 | High | Excellent, professional-grade | Maintain and monitor |

**Priority Fixes Based on Score:**

- **Served score <40**: Focus immediately on:
  - Add structured data (JSON-LD)
  - Make pricing complete and visible
  - Ensure state is in HTML attributes
  - Fix error message persistence

- **Rendered score <60**: Focus on:
  - Add explicit state attributes
  - Implement inline validation
  - Add loading state indicators
  - Make dynamic content semantic

#### 2. robots.txt Quality Report (`robots_txt_quality.csv`)

**Purpose:** Evaluates robots.txt file for AI agent readiness

**Key Columns:**

- `score`: Overall quality (0-100)
- `has_ai_user_agents`: Declares AI bot user agents (boolean)
- `ai_user_agent_count`: Number of AI agents declared
- `has_sitemap`: Includes sitemap declaration (boolean)
- `has_sensitive_path_protection`: Protects admin/account paths (boolean)
- `protected_path_count`: Number of protected paths
- `has_llms_txt_reference`: References llms.txt file (boolean)
- `has_helpful_comments`: Includes explanatory comments (boolean)

**Scoring Breakdown:**

| Component | Max Points | Criteria |
| --------- | ---------- | -------- |
| AI User Agents | 30 | 3+ agents = 30pts, 1-2 agents = 15pts, 0 agents = 0pts |
| Sitemap Declaration | 20 | Present = 20pts, Missing = 0pts |
| Path Protection | 25 | 3+ paths = 25pts, 1-2 paths = 15pts, 0 paths = 0pts |
| llms.txt Reference | 15 | Present = 15pts, Missing = 0pts |
| Helpful Comments | 10 | 3+ comments = 10pts, 1-2 = 5pts, 0 = 0pts |

**Priority Fixes:**

1. **Score <50**: Add sitemap declaration and 2-3 AI user agents immediately
2. **Score 50-70**: Add protected paths and llms.txt reference
3. **Score 70-85**: Add more AI user agents and helpful comments
4. **Score 85-100**: Maintain and monitor

#### 3. llms.txt Quality Report (`llms_txt_quality.csv`)

**Purpose:** Evaluates llms.txt file quality

**Key Columns:**

- `score`: Overall quality (0-105, includes bonuses)
- `has_title`: Site title present (boolean)
- `has_description`: Description present (boolean)
- `has_contact`: Contact information present (boolean)
- `section_count`: Number of major sections
- `has_access_guidelines`: Access policies declared (boolean)
- `has_rate_limits`: Rate limits specified (boolean)
- `has_api_info`: API information provided (boolean)

**Scoring Breakdown:**

| Component | Points | Criteria |
| --------- | ------ | -------- |
| Core Elements | 40 | Title (10), Description (10), Contact (10), Last Updated (10) |
| Sections | 30 | 5+ sections (30), 3-4 sections (20), 1-2 sections (10) |
| Content Length | 15 | Substantial content (15), Moderate (10), Minimal (5) |
| External Links | 10 | 3+ links (10), 1-2 links (5), None (0) |
| Specificity | 5 | Detailed policies (5), Basic (3), Generic (0) |
| Bonus Points | 5 | Rate limits, API docs, attribution requirements |

**Priority Fixes:**

1. **No file**: Create basic llms.txt with title, description, contact
2. **Score <40**: Add access guidelines and rate limits
3. **Score 40-70**: Add API information and external links
4. **Score 70-90**: Increase detail and specificity
5. **Score 90-105**: Comprehensive, maintain and update

#### 4. SEO Reports (`seo_report.csv`, `seo_scores.csv`)

**Purpose:** SEO factors that also benefit AI agents

**Key Factors:**

- Meta descriptions present and adequate length
- Title tags optimized
- Heading hierarchy (H1, H2, H3)
- Image alt text
- Internal linking structure
- Canonical URLs

**Agent Relevance:**

SEO best practices align with agent needs:

- Clear titles help agents understand page purpose
- Structured headings provide content hierarchy
- Alt text makes images interpretable
- Internal links show relationships

#### 5. Accessibility Report (`accessibility_report.csv`, `wcag_report.md`)

**Purpose:** WCAG compliance (benefits agents and humans)

**Key Factors:**

- ARIA labels and roles
- Form field associations
- Semantic HTML structure
- Keyboard navigation
- Focus management

**Agent Benefits:**

- ARIA labels provide context
- Semantic structure aids parsing
- Form associations clarify relationships
- Role attributes indicate purpose

### Enhanced Reports (Optional)

#### Executive Summary (`executive_summary.md`, `executive_summary.json`)

**Generated with:** `--generate-executive-summary`

**Contains:**

- High-level overview of site health
- Critical issues requiring immediate attention
- Recommended priorities
- Score trends (if history enabled)

**Use for:** Stakeholder communication, quick status checks

#### Dashboard (`dashboard.html`)

**Generated with:** `--generate-dashboard`

**Contains:**

- Visual score representations
- Historical trends (if history enabled)
- Comparative analysis
- Actionable recommendations

**Use for:** Regular monitoring, team reviews, progress tracking

## Prioritizing Improvements

### Step 1: Run Initial Audit

```bash
npm start -- -s https://example.com/sitemap.xml -c -1 \
  --enable-history \
  --generate-dashboard \
  --generate-executive-summary
```

### Step 2: Review Executive Summary

Focus on:

- Overall LLM suitability score
- Critical issues flagged
- Quick wins identified

### Step 3: Categorize Issues by Priority

**Critical (Fix Immediately):**

- Served HTML score <40
- robots.txt score <30
- No structured data
- Errors vanish/non-persistent
- Incomplete pricing

**High Priority (Fix This Quarter):**

- Served HTML score 40-60
- robots.txt score 30-60
- Limited structured data
- Inconsistent state attributes
- Complex form validation issues

**Medium Priority (Fix This Year):**

- Rendered HTML score <60
- llms.txt missing or basic
- SEO issues affecting discoverability
- Accessibility improvements needed

**Low Priority (Ongoing):**

- Score optimization above 80
- Advanced features
- Competitive differentiation

### Step 4: Create Action Plan

Based on your scores:

```markdown
## Action Plan: [Your Site]

**Audit Date:** [Date]
**Overall Score:** [Score]/100
**Priority:** [Critical/High/Medium/Low]

### Immediate Actions (This Week)
1. [Issue from served HTML score]
2. [Issue from robots.txt]
3. [Issue from error persistence]

### Short Term (This Month)
1. [Structured data additions]
2. [State attribute improvements]
3. [Form validation fixes]

### Medium Term (This Quarter)
1. [robots.txt enhancement]
2. [llms.txt creation/improvement]
3. [Comprehensive structured data]

### Long Term (This Year)
1. [Advanced features]
2. [API development]
3. [Monitoring and analytics]
```

## Tracking Progress

### Run Monthly Audits

```bash
# Monthly audit with history
npm start -- -s https://example.com/sitemap.xml -c -1 \
  --enable-history \
  --generate-dashboard
```

### View Dashboard

```bash
open results/dashboard.html
```

**Dashboard shows:**

- Score trends over time
- Issue resolution tracking
- Improvement velocity
- Regression detection

### Key Metrics to Monitor

1. **Overall Score Trend**
   - Target: Steady upward trend
   - Warning: Declining or flat trend

2. **Issue Count**
   - Target: Decreasing over time
   - Warning: Increasing or stagnant

3. **Served HTML Score**
   - Target: >80 within 6 months
   - Critical: <40 requires immediate action

4. **robots.txt Quality**
   - Target: >70 within 3 months
   - Warning: <50 indicates gaps

## Common Scenarios

### Scenario 1: E-commerce Site (Low Score)

**Initial Audit Results:**

- Overall: 42/100
- Served: 38/100
- Rendered: 52/100
- robots.txt: 25/100

**Action Plan:**

Week 1:

- Add JSON-LD structured data to product pages
- Make pricing complete and visible
- Create comprehensive robots.txt

Month 1:

- Fix error message persistence
- Add state attributes to cart
- Implement inline form validation

Quarter 1:

- Create llms.txt file
- Add structured data to all pages
- Implement API endpoints

**Expected Results After Quarter 1:**

- Overall: 75-80/100
- Served: 70-75/100
- Rendered: 75-80/100
- robots.txt: 80-85/100

### Scenario 2: Content Publisher (Medium Score)

**Initial Audit Results:**

- Overall: 65/100
- Served: 72/100
- Rendered: 61/100
- robots.txt: 55/100
- llms.txt: Missing

**Action Plan:**

Week 1:

- Create llms.txt with attribution requirements
- Enhance robots.txt with AI user agents

Month 1:

- Add article structured data
- Improve meta descriptions
- Fix heading hierarchy

Quarter 1:

- Optimize content extraction policies
- Implement rate limiting headers
- Add API documentation

**Expected Results After Quarter 1:**

- Overall: 80-85/100
- Served: 85-88/100
- Rendered: 75-80/100
- robots.txt: 80-85/100
- llms.txt: 75-80/105

### Scenario 3: SaaS Application (High Score, Maintenance)

**Initial Audit Results:**

- Overall: 82/100
- Served: 85/100
- Rendered: 80/100
- robots.txt: 85/100
- llms.txt: 78/105

**Action Plan:**

Monthly:

- Run audits to detect regressions
- Monitor for new issues
- Update AI user agent list

Quarterly:

- Optimize low-scoring pages
- Review and update llms.txt
- Benchmark against competitors

Annually:

- Comprehensive review
- Implement advanced features
- Update documentation

**Maintenance Goals:**

- Keep scores above 80
- Detect regressions immediately
- Stay current with standards

## Advanced Usage

### Custom Configuration

Create `.web-audit-config.json`:

```json
{
  "concurrency": 10,
  "timeout": 30000,
  "userAgent": "Web-Audit-Suite/2.0",
  "viewport": {
    "width": 1920,
    "height": 1080
  },
  "thresholds": {
    "llm_suitability": {
      "low": 40,
      "medium": 60,
      "high": 80
    }
  }
}
```

### CI/CD Integration

Add to `.github/workflows/audit.yml`:

```yaml
name: Web Audit

on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday
  workflow_dispatch:

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Web Audit Suite
        run: |
          git clone https://github.com/ddttom/invisible-users.git
          cd invisible-users/web-audit-suite
          npm install

      - name: Run Audit
        run: |
          cd invisible-users/web-audit-suite
          npm start -- -s https://example.com/sitemap.xml -c -1 \
            --enable-history \
            --generate-dashboard

      - name: Check Thresholds
        run: |
          # Fail if score drops below threshold
          SCORE=$(jq '.overall_score' results/executive_summary.json)
          if (( $(echo "$SCORE < 70" | bc -l) )); then
            echo "Score $SCORE below threshold 70"
            exit 1
          fi

      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: audit-results
          path: invisible-users/web-audit-suite/results/
```

## Interpreting Specific Issues

### "Served HTML score significantly lower than rendered"

**Meaning:** Your site relies heavily on JavaScript for critical content

**Impact:** Most agents (CLI, API-based) cannot access your content

**Fix:**

1. Server-side render critical content
2. Use progressive enhancement
3. Ensure HTML contains data before JavaScript runs

### "Error messages non-persistent"

**Meaning:** Errors vanish or are only shown briefly

**Impact:** Agents miss errors, retry without fixing issues

**Fix:**

1. Remove toast notifications
2. Add persistent error summary at top of forms
3. Keep errors visible until user corrects them

### "Missing structured data"

**Meaning:** No JSON-LD, microdata, or schema.org markup

**Impact:** Agents cannot reliably extract product/article information

**Fix:**

1. Add JSON-LD script tags to pages
2. Use schema.org vocabulary
3. Start with Product, Article, or LocalBusiness types

### "Incomplete pricing information"

**Meaning:** Shows "From £99" but actual price is hidden

**Impact:** Agents compare wrong prices, users surprised at checkout

**Fix:**

1. Display total price upfront
2. Include VAT status
3. Show delivery costs
4. Use structured data for machine-readable prices

## Getting Help

- **Documentation:** <https://github.com/ddttom/invisible-users/blob/main/web-audit-suite/README.md>
- **Issues:** <https://github.com/ddttom/invisible-users/issues>
- **Examples:** See `web-audit-suite/examples` directory in repository

## Summary Workflow

1. **Initial Audit**: Run full site audit with all reports
2. **Review Dashboard**: Understand current state
3. **Prioritize Issues**: Critical → High → Medium → Low
4. **Implement Fixes**: Start with highest impact, lowest effort
5. **Re-audit**: Verify improvements
6. **Monitor**: Monthly audits to track progress and catch regressions
7. **Maintain**: Keep scores above thresholds

**Target Timeline:**

- Week 1: Critical issues fixed
- Month 1: High priority issues addressed
- Quarter 1: Medium priority improvements complete
- Year 1: Comprehensive AI agent readiness achieved

---

Web Audit Suite provides the measurement framework. The Implementation Cookbook (Appendix A) provides the fixes. Together, they transform your site from theory to measurable AI agent compatibility.
