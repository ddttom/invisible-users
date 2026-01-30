# Web Audit Suite User Manual

## Overview

Web Audit Suite is a comprehensive website analysis tool that generates detailed reports across multiple dimensions:

- **SEO Performance**: Title tags, meta descriptions, heading structure, structured data
- **Accessibility**: WCAG 2.1 compliance checking (A, AA, AAA levels)
- **Performance**: Load times, paint metrics, time to interactive, cumulative layout shift
- **Security**: HTTPS configuration, security headers (HSTS, CSP, X-Frame-Options)
- **Content Quality**: Content freshness, uniqueness, media richness, structure
- **LLM Suitability**: AI agent compatibility analysis for both served and rendered HTML
- **LLMS.txt**: Automatically detects and processes `llms.txt` at the domain root for AI agent compatibility checks.

## Target Audience

This manual is written for:

- **Developers**: Implementing fixes and integrating the suite into CI/CD pipelines.
- **QA Teams**: Running regular audits and validating releases.
- **SEO/Accessibility Specialists**: Analyzing site health and compliance.

## Getting Started

**Note:** Web Audit Suite is a commercial tool. Access to the repository requires a valid license. Contact <tom.cranstoun@gmail.com> for licensing information.

### Prerequisites

- Node.js version 20.0.0 or higher
- npm package manager
- Internet connection for web crawling
- Valid license agreement

### Installation

```bash
# Navigate to project directory (after receiving repository access)
cd web-audit-suite

# Install dependencies
npm install
```

## Basic Usage

```bash
# Basic analysis with default options
npm start -- -s https://example.com/sitemap.xml

# Analysis with custom output directory
npm start -- -s https://example.com/sitemap.xml -o custom-results

# Limit the number of URLs to analyze
npm start -- -s https://example.com/sitemap.xml -l 10

# Limit number of files to include in both passes
npm start -- -s https://example.com/sitemap.xml -c 50

# Test with small sample before full analysis
npm start -- -s https://example.com/sitemap.xml -c 10

# Enable historical tracking and generate dashboard
npm start -- -s https://example.com/sitemap.xml --enable-history --generate-dashboard

# Generate executive summary
npm start -- -s https://example.com/sitemap.xml --generate-executive-summary

# Full analysis with all enhanced features
npm start -- -s https://example.com/sitemap.xml \
  --enable-history \
  --generate-dashboard \
  --generate-executive-summary

# Use custom thresholds
npm start -- -s https://example.com/sitemap.xml --thresholds ./custom-thresholds.json
npm start -- -s https://example.com/sitemap.xml -l 10 -o test-results
# Review reports in test-results directory
# When satisfied, run full analysis:
npm start -- -s https://example.com/sitemap.xml -l -1 -o final-results

# Generate reports from existing results.json
npm start -- --cache-only -o reports-from-cache

# Include all language variants in analysis
npm start -- -s https://example.com/sitemap.xml --include-all-languages
```

## Configuration

The application accepts configuration via CLI arguments, environment variables, and a centralized default configuration file.

### Default Configuration

**Location**: `src/config/defaults.js` (see [Configuration Guide](CONFIGURATION.md) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>) ("Configuration Guide" at <https://github.com/ddttom/invisible-users/blob/main/packages/web-audit-suite/docs/CONFIGURATION.md>))

This file contains all default settings including:

- Pa11y options (timeout, viewport, ignore rules)
- Performance thresholds
- Sitemap processing limits

Modify this file to change the baseline behavior of the application that applies when no CLI flags or environment variables are provided.

### Environment Variables

You can configure the application using a `.env` file or environment variables. This is prioritized over default settings but overridden by **explicit** CLI flags.
**Note**: Implicit default values from CLI flags are ignored to allow environment variables to take precedence. You must explicitly provide a flag in the command line for it to override a value set in `.env`.

**Supported Variables:**

- **Core**: `SITEMAP_URL`, `OUTPUT_DIR`, `LOG_LEVEL` (`debug`, `info`, `warn`, `error`)
- **Limits**: `LIMIT`, `COUNT`
- **Features (true/false)**:
  - `ENABLE_HISTORY`
  - `GENERATE_DASHBOARD`
  - `GENERATE_EXECUTIVE_SUMMARY`
  - `INCLUDE_ALL_LANGUAGES`
  - `NO_RECURSIVE`
- **Cache**: `CACHE_ONLY`, `NO_CACHE`, `FORCE_DELETE_CACHE`
- **Rate Limiting**: `RATE_LIMIT_TOKENS`, `RATE_LIMIT_INTERVAL`
- **Other**: `NO_PUPPETEER`, `THRESHOLDS_FILE`

Example `.env`:

```bash
SITEMAP_URL=https://example.com/sitemap.xml
LOG_LEVEL=info
ENABLE_HISTORY=true
GENERATE_DASHBOARD=true
```

For detailed configuration documentation, see [Configuration Guide](CONFIGURATION.md).

## Command Line Options

### Required Options

- `-s, --sitemap <url>`: URL of sitemap or webpage to analyze
  - Accepts sitemap XML or webpage URL
  - Default: "<https://allabout.network/blogs/ddt/edge-delivery-services-knowledge-hub>"

### Optional Settings

- `-o, --output <directory>`: Output directory for results (default: "results")
  - Preserves existing contents if directory exists
  - Creates directory if it doesn't exist
- `-l, --limit <number>`: Maximum URLs to process (-1 for all)
- `-c, --count <number>`: Limit number of files to include in both passes (-1 for infinite)
- `--log-level <level>`: Set logging detail (error, warn, info, debug)
- `--include-all-languages`: Include all language variants in analysis
  - Overrides default behavior of only processing /en and /us variants
  - Uses enhanced URL extraction logic with automatic detection

### Performance Tuning

- `--browser-pool-size <number>`: Number of reusable browser instances (default: 3)
  - Maintains browser pool for 97% reduction in launch overhead
  - Set to 5-7 for large sites with powerful hardware
  - Set to 0 to disable pooling for debugging
- `--url-concurrency <number>`: Number of URLs to process simultaneously (default: 3)
  - Integrates with adaptive rate limiting
  - Set to 5-10 for fast servers
  - Set to 1 for sequential processing
- `--force-scrape`: Bypass robots.txt restrictions (use with caution)
  - Requires explicit user action
  - Use only with permission for sites you manage

### Cache Control

- `--cache-only`: Use only cached data
- `--no-cache`: Disable caching
- `--force-delete-cache`: Clear cache before starting

### Enhanced Features

- `--enable-history`: Enable historical tracking for comparative analysis
  - Stores timestamped results in `history/` directory
  - Enables comparison with previous runs
  - Tracks trends over time
- `--generate-dashboard`: Generate interactive HTML dashboard with charts
  - Visual analytics with embedded charts
  - Performance, accessibility, SEO, content, and LLM metrics
  - Historical trend charts (when history enabled)
  - Comparison tables and pass/fail summaries
- `--generate-executive-summary`: Generate executive summary report
  - Single-page overview with key insights
  - Generates both Markdown (`executive_summary.md`) and JSON formats
  - Key findings and actionable recommendations
  - Comparison with previous run (when history enabled)
- `--thresholds <file>`: Path to custom thresholds configuration (JSON)
  - Customize pass/fail criteria for all metrics
  - See [Configuration Guide](CONFIGURATION.md) for details
- `--extract-patterns`: Extract patterns from high-scoring pages (≥70 score)
  - Analyzes pages with served/rendered score ≥70
  - Extracts 6 pattern categories with real examples
  - Provides priority and effort ratings
  - Generates pattern_library.md report

### Pattern Extraction

The `--extract-patterns` flag enables automatic pattern extraction from your highest-scoring pages, helping you replicate success across your site.

**How it works:**

1. Identifies pages with served or rendered HTML score ≥70
2. Extracts patterns across 6 categories
3. Provides up to 5 real examples per pattern
4. Rates each pattern by priority and implementation effort

**Pattern Categories:**

- **Structured Data (JSON-LD)** - Schema.org implementations
- **Semantic HTML Structure** - Proper use of `<main>`, `<nav>`, `<article>`
- **Standard Form Field Naming** - email, firstName, lastName patterns
- **Persistent Error Messages** - role="alert", aria-live patterns
- **Explicit State Attributes** - data-state, data-validation-state
- **llms.txt Implementation** - Site-level AI agent guidance

**Priority Ratings:**

- **Critical + Low effort**: Implement immediately
- **High + Moderate effort**: Plan for next sprint
- **Critical + Moderate effort**: Prioritize over High/Low

**Use Cases:**

- Replicate success patterns from best pages
- Create training materials for developers
- Establish quality baselines for consistency
- Onboard new team members with real examples

**Example:**

```bash
npm start -- -s https://example.com --extract-patterns
# Generates: results/pattern_library.md
```

**Output:** The `pattern_library.md` report includes methodology, extracted patterns with real code examples, implementation guidance, and validation tool links.

### Regression Detection

The `--enable-history` flag enables comprehensive regression detection with CI/CD-ready exit codes.

**How it works:**

1. Stores timestamped results in `history/` directory
2. Compares current run with baseline (establishes if missing)
3. Detects regressions across 5 categories
4. Returns non-zero exit code for critical regressions

**Regression Categories:**

**Critical** (Exit code 1 - CI/CD fails):

- Performance: >30% increase in load time/LCP/FCP/CLS
- Accessibility: Any error count increase
- SEO: >10% score decrease
- LLM Suitability (Served): >10% score decrease

**Warning** (Exit code 0 - CI/CD passes with warnings):

- Performance: >15% increase
- SEO: >5% score decrease
- LLM Suitability (Rendered): >10% score decrease
- URL count: Significant change

**Informational**:

- Minor improvements or degradations
- Non-critical metric changes

**CI/CD Integration:**

```bash
# In your CI/CD pipeline
npm start -- -s https://staging.example.com --enable-history

# Returns exit code 1 if critical regressions found
# Pipeline fails, preventing deployment
```

**Generated Reports:**

- `regression_report.md` - Human-readable regression analysis
- `history/results-<timestamp>.json` - Historical results for trending

**Use Cases:**

- Catch breaking changes before deployment
- Track performance trends over time
- Validate releases against baselines
- Monitor for gradual degradation

### Agency & Partner Features

- `--bulk <file>`: Run audit on multiple domains from a CSV file
  - Input: CSV with `domain` column (e.g., `domain\nexample.com\nclient2.com`)
  - Output: `bulk_audit_summary.csv` master report
- `--agency-name <string>`: Agency name for white-labeling reports
  - Replaces "Web Audit Suite" in Dashboard footer/title
- `--agency-logo <path>`: Path or URL to agency logo
  - Adds logo to Dashboard header

## Generated Reports

### Core Reports

#### SEO Report (seo_report.csv)

Basic SEO metrics for each page including title, meta description, heading structure, image and link counts, and content length.

**Fields:**

- URL
- Title
- Description
- H1 Count
- Image Count
- Images Without Alt
- Internal Links
- External Links
- Page Size
- Word Count
- Title Length
- Description Length
- Has Structured Data
- Has Social Tags
- Last Modified

#### Performance Report (performance_analysis.csv)

Page loading speed metrics and Core Web Vitals measurements.

**Fields:**

- URL
- Load Time (ms)
- First Paint (ms)
- First Contentful Paint (ms)
- Largest Contentful Paint (ms)
- Time to Interactive (ms)
- Total Blocking Time (ms)
- Cumulative Layout Shift

#### SEO Scores Report (seo_scores.csv)

Detailed SEO scoring with subscores for different aspects.

**Fields:**

- URL
- Overall SEO Score
- Title Optimization Score
- Meta Description Score
- Content Quality Score
- Link Structure Score
- Technical SEO Score

#### Accessibility Report (accessibility_report.csv)

WCAG 2.1 compliance analysis with issues categorized by severity and guideline level.

**Fields:**

- URL
- Total Issues
- Critical Issues
- Serious Issues
- Moderate Issues
- Minor Issues
- WCAG A Issues
- WCAG AA Issues
- WCAG AAA Issues
- WCAG 2.1 Compliance Percentage
- Missing ARIA Labels
- Contrast Ratio Issues
- Keyboard Navigation Issues
- Required Manual Checks
- Remediation Suggestions

#### WCAG Markdown Report (wcag_report.md)

Human-readable accessibility report with path-by-path organization, unique issues with occurrence counts, detailed descriptions, and remediation suggestions.

### Enhanced Reports

#### Image Optimization Report (image_optimization.csv)

Image metrics, alt text quality analysis, and compression suggestions.

**Fields:**

- Page URL
- Image URL
- File Size (KB)
- Dimensions
- Format
- Alt Text
- Alt Text Quality Score
- Is Responsive
- Lazy Loaded
- Compression Level
- Optimization Score
- Recommendations

#### Link Analysis Report (link_analysis.csv)

Internal/external link structure, navigation analysis, and link quality metrics.

**Fields:**

- Source URL
- Target URL
- Link Text
- Link Type
- Follow Type
- HTTP Status
- Redirect Chain
- Content Type
- In Navigation
- Link Depth
- Link Quality Score

#### Content Quality Report (content_quality.csv)

Content analysis including freshness, uniqueness, and media richness.

**Fields:**

- URL
- Word Count
- Content Freshness Score
- Content Uniqueness Score
- Grammar Score
- Media Richness Score
- Top Keywords
- Overall Content Score

#### Security Report (security_report.csv)

Security headers analysis and HTTPS configuration.

**Fields:**

- URL
- HTTPS Status
- HSTS Header
- CSP Header
- X-Frame-Options
- X-Content-Type-Options
- Security Score
- Recommendations

### LLM Suitability Reports

These reports evaluate website compatibility with AI agents based on patterns from "The Invisible Users" book.

#### General LLM Suitability Report (llm_general_suitability.csv)

Overall AI-friendliness scores showing both served HTML (works for all agents) and rendered HTML (works for browser agents).

**Fields:**

- URL
- HTML Source (served/rendered)
- Served HTML Score (All Agents)
- Rendered HTML Score (Browser Agents)
- Has `<main>`
- Has `<nav>`
- Standard Form Fields %
- Has Schema.org
- Essential Issues Count
- Nice-to-Have Issues Count
- Top Essential Issue
- Top Recommendation

**Scoring:**

- **Served Score (0-100)**: Works for CLI agents, server-based agents, and browser agents
  - 30 points: Semantic HTML structure
  - 40 points: Form field naming and labels
  - 20 points: Schema.org structured data
  - 10 points: Proper table markup
- **Rendered Score (0-100)**: Adds bonus points for browser agents
  - Base served score + up to 30 bonus points for dynamic features

#### Frontend LLM Suitability Report (llm_frontend_suitability.csv)

Frontend-specific patterns separated into served (form patterns, semantic HTML) and rendered (dynamic state, persistent errors).

**Fields:**

- URL
- HTML Source (served/rendered)
- Served Score (All Agents)
- Form Count
- Standard Fields %
- Fields With Labels %
- Semantic Elements Count
- Rendered Score (Browser Agents)
- Explicit State Elements
- Persistent Errors
- Validation State Elements
- Essential Issues
- Key Recommendations

**Key Metrics:**

- **ESSENTIAL_SERVED**: Semantic HTML, form field naming, labels
- **ESSENTIAL_RENDERED**: Dynamic state attributes, persistent error messages
- **NICE_TO_HAVE**: Button explanations, auth state visibility

#### Backend LLM Suitability Report (llm_backend_suitability.csv)

Backend/server-side patterns focusing on served HTML only (HTTP codes, headers, structured data).

**Fields:**

- URL
- Backend Score (0-100)
- HTTP Status Code
- Status Code Appropriate
- HTTPS
- HSTS Header
- CSP Header
- X-Frame-Options
- Schema.org Structured Data
- JSON-LD Scripts
- Essential Issues
- Key Recommendations

**Scoring:**

- 30 points: Correct HTTP status codes
- 40 points: Security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options)
- 30 points: Schema.org structured data

#### robots.txt Quality Report (robots_txt_quality.csv, robots_quality_report.md)

Evaluates robots.txt file for AI agent compatibility using a 100-point quality scoring system.

**Purpose:** Assess how well your robots.txt file guides AI agents and search crawlers.

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

**Quality Levels:**

- **80-100 (Excellent)**: Professional-grade AI agent guidance
- **60-79 (Good)**: Solid foundation, minor improvements needed
- **40-59 (Fair)**: Basic compliance, significant gaps
- **0-39 (Poor)**: Critical issues, immediate action needed

**Priority Fixes:**

1. **Score <40**: Add sitemap declaration and 2-3 AI user agents immediately
2. **Score 40-60**: Add protected paths and llms.txt reference
3. **Score 60-80**: Add more AI user agents and helpful comments
4. **Score 80-100**: Maintain and monitor

**What's Checked:**

- **AI-specific user agents** (30 pts): GPTBot, ClaudeBot, etc.
- **Sitemap references** (20 pts): Sitemap: directives
- **Sensitive path protection** (25 pts): /admin, /cart, /account
- **llms.txt references** (15 pts): Comments referencing llms.txt
- **Helpful comments** (10 pts): Explanatory notes for maintainability

**Generated Reports:**

- `robots_txt_quality.csv` - Machine-readable metrics
- `robots_quality_report.md` - Human-readable report with recommendations

#### llms.txt Quality Report (llms_txt_quality.csv)

Evaluates llms.txt file quality using a 105-point scoring system (includes bonuses).

**Purpose:** Assess how well your llms.txt file provides AI agent guidance.

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

**Generated Reports:**

- `llms_txt_quality.csv` - Machine-readable metrics

### Understanding LLM Scores

**Two HTML States:**

1. **SERVED HTML** (Static): What CLI agents and server-based agents see
   - No JavaScript execution
   - Essential for all agents
   - Focus: Semantic HTML, form names, structured data

2. **RENDERED HTML** (Dynamic): What browser-based agents see
   - After JavaScript execution
   - Additional features for browser agents
   - Focus: Dynamic state, persistent errors, validation feedback

**Importance Levels:**

- **ESSENTIAL_SERVED**: Critical for all agents (heavily weighted)
- **ESSENTIAL_RENDERED**: Critical for browser agents (moderately weighted)
- **NICE_TO_HAVE**: Helpful but not critical (lightly weighted)

## Output Files

All files are generated in the output directory (default: `results/`):

### Data Files

- `results.json` - Complete raw data (single source of truth)
- `summary.json` - High-level site-wide metrics

### CSV Reports

- `seo_report.csv`
- `performance_analysis.csv`
- `seo_scores.csv`
- `accessibility_report.csv`
- `image_optimization.csv`
- `link_analysis.csv`
- `content_quality.csv`
- `security_report.csv`
- `llm_general_suitability.csv`
- `llm_frontend_suitability.csv`
- `llm_backend_suitability.csv`

### Markdown Reports

- `wcag_report.md` - Human-readable accessibility report

### Enhanced Reports (Optional)

Generated when corresponding CLI flags are used:

- `executive_summary.md` - Executive summary report (--generate-executive-summary)
  - Overall status across all categories
  - Key findings and recommendations
  - Pass/fail status with configurable thresholds
  - Comparison with previous run (if history enabled)

- `executive_summary.json` - Machine-readable executive summary
  - Structured data format for automation
  - Integration-ready format

- `dashboard.html` - Interactive HTML dashboard (--generate-dashboard)
  - Visual analytics with embedded charts
  - Performance, accessibility, SEO, content, and LLM metrics
  - Historical trend charts (if multiple runs tracked)
  - Comparison tables showing changes over time
  - Pass/fail summary tables

### Historical Data

Created when `--enable-history` is used:

- `history/` directory - Timestamped historical results
  - `results-<timestamp>.json` - Complete results from each run
  - Enables comparative analysis and trend tracking

### Sitemaps

- `virtual_sitemap.xml` - Initial crawl results
- `final_sitemap.xml` - Complete discovered URLs

## Log Files

- `combined.log`: Complete activity log
  - All processing steps
  - Information messages
  - Warning messages

- `error.log`: Error-only log file
  - Processing errors
  - Connection issues
  - Validation failures

## Cache Management

The tool maintains a cache to improve performance:

- Cache location: `.cache` directory (automatically created)
- Cache format: JSON files
- Cache naming: MD5 hash of URLs

### Cache Control Options

- `--cache-only`: Use only cached data
- `--no-cache`: Disable caching
- `--force-delete-cache`: Clear existing cache

## Network Error Handling

The tool includes robust network error handling:

1. Automatically detects network-related errors
2. Provides clear console messages about the issue
3. Allows retrying after fixing the problem
4. Handles both regular network requests and browser operations

### Network Error Types

- DNS failures
- Connection timeouts
- Host unreachable errors
- Browser network errors
- SSL/TLS handshake failures
- Rate limiting errors
- Cloudflare challenges (automatic bypass attempt)

### Retry Mechanism

When a network error occurs:

1. The tool pauses and displays error details
2. You're prompted to retry after fixing the issue
3. Automatic retry up to 3 times
4. You can cancel the operation if needed

### Example Network Error Flow

```bash
[ERROR] Network error: Could not connect to example.com
Reason: ETIMEDOUT
Would you like to retry? (yes/no): yes
Retrying connection... (attempt 1/3)
```

## Language Variant Filtering

By default, the tool skips non-English language variants to avoid duplicate content analysis:

- **Processed by default**: `/en`, `/us`
- **Skipped by default**: `/fr`, `/es`, `/de`, etc.
- **Override**: Use `--include-all-languages` flag

This filtering applies to:

- URL extraction from sitemaps
- Report generation
- Content analysis

## Troubleshooting

### Common Issues

#### Connection Timeouts

```bash
Error: ETIMEDOUT
```

Solution: Check internet connection and try again

#### Invalid URLs

```bash
Error: Invalid URL format
```

Solution: Ensure URL includes protocol (http:// or https://)

#### Memory Issues

```bash
JavaScript heap out of memory
```

Solution: Reduce number of URLs using `-l` or `-c` options

#### Cloudflare Protection

```bash
Error: Cloudflare challenge detected
```

Solution: Tool will automatically attempt bypass using stealth mode

### Error Messages

- `Invalid sitemap format`: Check if URL points to valid sitemap
- `Failed to parse HTML`: Check if URL returns valid HTML
- `Network error`: Check internet connection
- `Permission denied`: Check directory permissions
- `Pa11y timeout`: Large pages may need longer timeout (adjust `pa11y.timeout` in `src/config/defaults.js`)

## Best Practices

### 1. Start Small

Test with few URLs first using `-l` or `-c` options:

```bash
# Test with 10 URLs
npm start -- -s https://example.com/sitemap.xml -l 10 -o test
```

### 2. Iterative Testing

1. Run small sample (10-20 pages)
2. Review reports for correctness
3. Adjust configuration if needed
4. Run full analysis

### 3. Monitor Logs

- Check `error.log` for issues
- Use `--log-level debug` for detailed troubleshooting
- **Note**: Startup parameters are always printed to the terminal regardless of log level for verification.
- Watch for patterns in failures

### 4. Regular Cache Cleanup

Clear cache periodically to ensure fresh data:

```bash
npm start -- -s <url> --force-delete-cache
```

### 5. Handle Network Issues

- Check internet connection before starting
- Use retry mechanism when network errors occur
- Monitor network stability during long runs
- Consider rate limiting for large sites

### 6. Optimize for Large Sites

For sites with >500 pages:

- Use `-c` to limit concurrent processing
- Consider running analysis in batches
- Monitor memory usage
- Use `--cache-only` for report regeneration

### 7. Understand LLM Scores

- **Served Score**: Most important (works for all agents)
- **Essential Issues**: Fix these first
- **Nice-to-Have Issues**: Lower priority
- Browser agents get higher rendered scores

## Workflow Examples

### Basic Site Audit

```bash
# Full analysis of a website
npm start -- -s https://example.com/sitemap.xml -o example-audit
```

### Iterative Testing

```bash
# Step 1: Test with small sample
npm start -- -s https://example.com/sitemap.xml -l 10 -o test

# Step 2: Review reports in test/ directory

# Step 3: Run full analysis
npm start -- -s https://example.com/sitemap.xml -o full-audit
```

### Resume from Cache

```bash
# Step 1: Initial analysis (may be interrupted)
npm start -- -s https://example.com/sitemap.xml -o results

# Step 2: Resume using cache
npm start -- --cache-only -o results
```

### Compare Language Variants

```bash
# Analyze only English pages (default)
npm start -- -s https://example.com/sitemap.xml -o english-only

# Analyze all language variants
npm start -- -s https://example.com/sitemap.xml --include-all-languages -o all-languages
```

### Agency Workflow (Bulk & White-Label)

```bash
# Auditing 50 prospect domains for "TechAudit Agency"
npm start -- \
  --bulk prospects.csv \
  --agency-name "TechAudit Agency" \
  --agency-logo "https://techaudit.com/logo.png" \
  --output ./client-audits
```

## Reading LLM Reports

### Interpreting Scores

#### Served HTML Score (0-100)

- **80-100**: Excellent - Works well for all AI agents
- **60-79**: Good - Minor improvements needed
- **40-59**: Fair - Several essential issues to fix
- **0-39**: Poor - Major issues preventing AI agent compatibility

#### Rendered HTML Score (0-100)

- **80-100**: Excellent - Works well for browser-based agents
- **60-79**: Good - Some dynamic features could improve
- **40-59**: Fair - Essential rendered features missing
- **0-39**: Poor - Significant issues for browser agents

### Priority Framework

1. **Fix Essential_Served Issues First**
   - Add `<main>` and `<nav>` elements
   - Use standard form field names
   - Add Schema.org structured data
   - Fix HTTP status codes

2. **Fix Essential_Rendered Issues Second**
   - Add explicit state attributes for dynamic content
   - Implement persistent error messages
   - Add validation state indicators

3. **Consider Nice-to-Have Features Last**
   - Add data attributes to tables
   - Add button disabled explanations
   - Add auth state attributes

## Performance Optimization

The Web Audit Suite includes production-tested performance optimizations that reduce analysis time by 3-5x.

### Performance Features Overview

**Before optimization**: 100 URLs in ~45 minutes
**After optimization**: 100 URLs in ~10 minutes

### Browser Pooling

**What it does:** Maintains reusable Puppeteer browser instances

**Benefits:**

- 97% reduction in browser launch overhead
- Eliminates 2-5 second delay per URL
- Automatic restart after 50 pages to prevent memory leaks

**Configuration:**

```bash
# Default (3 browsers)
npm start -- -s https://example.com

# Larger pool for faster analysis
npm start -- -s https://example.com --browser-pool-size 5

# Disable pooling
npm start -- -s https://example.com --browser-pool-size 0
```

**When to adjust:**

- **Increase (5-7)**: Large sites (1000+ URLs), powerful hardware
- **Decrease (1-2)**: Limited memory, unstable sites, debugging
- **Disable (0)**: Troubleshooting browser issues

### Concurrent URL Processing

**What it does:** Processes multiple URLs simultaneously

**Benefits:**

- 3-5x speedup for URL processing phase
- Efficient use of browser pool
- Integrates with adaptive rate limiting

**Configuration:**

```bash
# Default (3 concurrent)
npm start -- -s https://example.com

# Higher concurrency for large sites
npm start -- -s https://example.com --url-concurrency 5

# Sequential processing
npm start -- -s https://example.com --url-concurrency 1
```

**When to adjust:**

- **Increase (5-10)**: Fast servers, large sites, powerful hardware
- **Decrease (1-2)**: Slow servers, rate limiting issues, debugging

### Adaptive Rate Limiting

**What it does:** Monitors server responses and adjusts concurrency

**Benefits:**

- Server-friendly (avoids overwhelming servers)
- Automatic backoff on 429/503 responses
- Gradual recovery when server stabilizes

**How it works:**

- Starts with configured concurrency (default: 3)
- Monitors for 429 (Too Many Requests) or 503 (Service Unavailable)
- Reduces concurrency on errors (exponential backoff)
- Gradually increases when server recovers
- No configuration needed - works automatically

### Cache Staleness Checking

**What it does:** Validates cache freshness with HTTP HEAD requests

**Benefits:**

- Ensures data accuracy without re-analysis
- Automatic invalidation when source changes
- Minimal overhead (HEAD requests only)

**How it works:**

- Checks Last-Modified header on cached pages
- Compares with cache creation time
- Invalidates cache if source is newer
- Falls back to cache if HEAD request fails
- No configuration needed - works automatically

### Recommended Configurations

**Small sites (<100 URLs):**

```bash
npm start -- -s https://example.com
# Defaults work well
```

**Medium sites (100-500 URLs):**

```bash
npm start -- -s https://example.com --browser-pool-size 5 --url-concurrency 5
```

**Large sites (500-5000 URLs):**

```bash
npm start -- -s https://example.com --browser-pool-size 7 --url-concurrency 7
```

**Very large sites (5000+ URLs):**

```bash
# Process in batches
npm start -- -s https://example.com -c 1000 --browser-pool-size 7 --url-concurrency 7
```

**Slow or rate-limited servers:**

```bash
npm start -- -s https://example.com --browser-pool-size 2 --url-concurrency 2
```

## Interpreting Specific Issues

This section provides detailed explanations of common issues found during audits and how to fix them.

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

### "Multiple @type values in Schema.org blocks"

**Meaning:** JSON-LD blocks contain arrays like `["Article", "NewsArticle"]`

**Impact:** AI agents trained on entertainment scripts may confuse professional content with fictional dialogue. Multiple types create ambiguity.

**Fix:**

1. Use exactly ONE `@type` per JSON-LD block
2. Choose the most specific type: `MedicalScholarlyArticle` over `Article`
3. For legal content: use `Legislation` or `LegalDocument`
4. For business analysis: use `AnalysisNewsArticle`
5. For medical content: use `MedicalScholarlyArticle`

### "High inline CSS ratio"

**Meaning:** Many elements have `style=` attributes or inline `<style>` tags

**Impact:** CLI agents and server-based agents cannot execute inline styles. Inline CSS adds noise to DOM structure without providing semantic value.

**Fix:**

1. Move all styling to external CSS files
2. Remove `style=` attributes from HTML elements
3. Remove inline `<style>` tags from document
4. Use semantic HTML structure (proper elements, clear hierarchy)
5. Keep styling separate from content for maximum agent compatibility

### "Carousels without proper attributes"

**Meaning:** Product carousels, testimonial sliders, or portfolio galleries lack data-slide-index and aria-label attributes

**Impact:** Agents see only the first slide. Manual advance requires user interaction. Auto-advance changes content mid-parse causing timing failures.

**Fix:**

1. Add data-total-slides="5" to carousel container
2. Add data-slide-index="1", data-slide-index="2" to each slide
3. Add aria-label="Slide 1 of 5" to each slide
4. Provide static "View all" alternative using `<details>` element with data-agent-visible="true"
5. Distinguish informational (product, testimonial) from decorative (hero, banner) carousels

### "Animation libraries detected"

**Meaning:** Typed.js, TypeIt, GSAP, AOS, or Animate.css libraries present on page

**Impact:** Animated text may be invisible in served HTML. Content reveals gradually, causing agents to miss information.

**Fix:**

1. Ensure all text content exists in served HTML before JavaScript enhancement
2. Use animation as progressive enhancement, not as primary content delivery
3. Add data-animation-state="complete" after animation finishes
4. Provide pause controls for animations >5 seconds (WCAG 2.2.2)

### "Visual content changes detected"

**Meaning:** Screenshot comparison revealed page content changing over time (typewriter animations, rotating text, tickers)

**Impact:** Agents snapshot page at random moments, missing content that hasn't appeared yet or has already cycled away.

**Fix:**

1. Ensure ALL text variations exist in served HTML before JavaScript enhancement
2. Add data-content-variations="variant1|variant2|variant3" attribute
3. Add data-content-complete="true" after animation cycle completes
4. Provide static `<noscript>` alternative showing all content
5. Consider showing all variations in a list format for agents

### "JavaScript-dependent pricing"

**Meaning:** Price information only appears after JavaScript execution, making it invisible to CLI agents

**Impact:** E-commerce agents cannot make purchase recommendations without visible pricing

**Fix:**

1. Server-side rendering: Render initial price in HTML
2. Schema.org structured data: Add JSON-LD with Product schema including price
3. Meta tags: Include `<meta itemprop="price" content="99.99">`
4. Data attributes: Add `data-price="99.99"` and `data-currency="USD"`
5. Noscript fallback: Provide `<noscript><span class="price">$99.99</span></noscript>`

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

## Support

For issues and questions:

1. Check error logs first (`error.log`)
2. Verify input parameters
3. Review this documentation
4. Submit issue with:
   - Full error message
   - Command used
   - URL being analyzed
   - Node.js version
   - Relevant log excerpts

## Version Information

- Node.js: >= 20.0.0
- Package Version: 1.0.0
- Last Updated: January 2026
