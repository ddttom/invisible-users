# Web Audit Suite Architecture

**Last updated:** 18 January 2026

## Overview

The Web Audit Suite is a Node.js application that analyzes websites for AI agent compatibility, accessibility, performance, and SEO. It implements the patterns described in "The Invisible Users" book to help website owners understand how well their sites work for both human users and AI agents.

## Core Design Principles

### 1. Single Source of Truth

**CRITICAL PRINCIPLE:** `results/results.json` is the single source of truth for all analysis data.

- **Phase 0:** robots.txt compliance check
- **Phase 1-2:** Collect and store data in `results.json`
- **Phase 3:** Read from `results.json` to generate reports
- **Never:** Fetch data during report generation

This separation ensures:

- Reports can be regenerated without re-crawling
- Data collection and presentation are decoupled
- Multiple report formats can be generated from the same data
- Debugging is easier (inspect the JSON file directly)

### 2. Four-Phase Pipeline

The application follows a strict four-phase architecture:

```text
Phase 0: robots.txt Compliance
    ↓
Phase 1: URL Collection
    ↓
Phase 2: Data Collection
    ↓
Phase 3: Report Generation
```

Each phase is independent and sequential. Phases never overlap.

### 3. Dependency Injection

All functions receive an `AuditContext` object containing shared state:

```javascript
const context = {
  logger: winston.Logger,
  options: Object,
  browser: puppeteer.Browser,
  // ... other shared resources
}
```

No global state. No `global.auditcore`. Context is passed explicitly through the call stack.

### 4. ES Modules

The project uses ES Modules (`"type": "module"` in package.json):

- All imports must include `.js` extension: `import { foo } from './utils/bar.js'`
- No CommonJS `require()` or `module.exports`
- Consistent modern JavaScript throughout

## Four-Phase Pipeline Details

### Phase 0: robots.txt Compliance

**Purpose:** Verify ethical scraping permissions before crawling

**Entry point:** `src/main.js::fetchRobotsTxt()`

**Process:**

1. Fetch robots.txt from domain root
2. HTTP fetch with Puppeteer fallback for Cloudflare sites
3. Parse robots.txt directives (user-agents, rules, sitemaps)
4. Evaluate quality (100-point scoring system)
5. Store in context for URL validation
6. Graceful fallback if robots.txt unavailable

**Key files:**

- `src/utils/robotsFetcher.js` - Fetching with fallback
- `src/utils/robotsCompliance.js` - Rule matching, prompts
- `src/utils/robotsTxtParser.js` - Quality analysis

**Quality Scoring Criteria:**

1. **AI-specific user agents** (30 points) - GPTBot, ClaudeBot, CCBot, ChatGPT-User, PerplexityBot
2. **Sitemap references** (20 points) - Sitemap: directives for discovery
3. **Sensitive path protection** (25 points) - /admin, /cart, /account, /checkout, /api blocking
4. **llms.txt references** (15 points) - Comments referencing llms.txt for AI guidance
5. **Helpful comments** (10 points) - Explanatory comments for maintainability
6. **Completeness bonus** (10 points) - Multiple user-agent blocks, comprehensive rules

**Quality Levels:**

- **Excellent (80+):** Professional-grade AI agent guidance
- **Good (60-79):** Solid foundation, minor improvements needed
- **Fair (40-59):** Basic compliance, significant gaps
- **Poor (<40):** Critical issues, immediate action needed

**Interactive Prompts:**

If URLs are blocked by robots.txt:

1. Display blocked URL and matching rule
2. Offer choices: Skip URL, Skip all blocked, Force scrape this URL, Force scrape all
3. Store decision in context for remaining URLs
4. Continue analysis based on user choice

**Output:**

- robots.txt data stored in context
- Quality score and recommendations
- Compliance rules for Phase 1 URL validation

### Phase 1: URL Collection

**Purpose:** Discover all URLs to analyze

**Entry point:** `src/utils/sitemap.js::getUrlsFromSitemap()`

**Process:**

1. Fetch sitemap XML or HTML page
2. Extract URLs (handles both XML sitemaps and HTML link extraction)
3. Use browser pool for Cloudflare-protected sites (Puppeteer fallback)
4. Validate URLs against robots.txt rules (from Phase 0)
5. Normalize URLs and apply count limit if specified (`-c` flag)
6. Return array of URLs to process

**Key files:**

- `src/utils/sitemap.js` - URL extraction logic
- `src/utils/networkUtils.js` - Fetch utilities with retry logic
- `src/utils/caching.js` - Cache management for fetched content

**Output:** Array of URL strings

### Phase 2: Data Collection

**Purpose:** Analyze each URL and store comprehensive data

**Entry point:** `src/main.js::processSitemapUrls()`

**Process:**

1. Initialize browser pool (3 reusable browsers by default)
2. Initialize adaptive rate limiter
3. Process URLs concurrently (default: 3 simultaneous):
   - Acquire browser from pool
   - Navigate to page
   - Collect page metrics (performance, SEO, content)
   - Run Pa11y for accessibility testing
   - Collect LLM suitability metrics
   - Detect technology stack (CMS, frameworks, libraries)
   - Check cache staleness (HTTP HEAD requests)
   - Store all data in `results.json`
   - Release browser back to pool
4. Update progress indicators
5. Handle errors gracefully (continue processing remaining URLs)
6. Monitor server responses (429/503) and adjust concurrency

**Key files:**

- `src/main.js` - Orchestrates data collection
- `src/utils/urlProcessor.js` - Concurrent URL processing
- `src/utils/browserPool.js` - Browser pooling
- `src/utils/rateLimiter.js` - Adaptive rate limiting
- `src/utils/pageAnalyzer.js` - Page content analysis
- `src/utils/pa11yRunner.js` - Accessibility testing
- `src/utils/llmMetrics.js` - LLM suitability metrics
- `src/utils/technologyDetection.js` - Technology stack detection
- `src/utils/caching.js` - Cache staleness checking
- `src/utils/metricsUpdater.js` - Updates results.json with collected data

**Performance Optimizations:**

**1. Browser Pooling** (`browserPool.js`):

- Pool of 3 reusable Puppeteer browsers (configurable via `--browser-pool-size`)
- **97% reduction in browser launch overhead** (eliminates 2-5 second delay per URL)
- Automatic restart after 50 pages to prevent memory leaks
- FIFO queue management for concurrent requests
- Graceful fallback to direct launch if pool initialization fails

**2. Concurrent URL Processing** (`urlProcessor.js`):

- Processes 3 URLs simultaneously by default (configurable via `--url-concurrency`)
- Uses `Promise.allSettled()` for batch processing
- **3-5x speedup** for URL processing phase
- Progress tracking and per-URL error handling
- Falls back to sequential for recursive crawling

**3. Adaptive Rate Limiting** (`rateLimiter.js`):

- Monitors 429 (Too Many Requests) and 503 (Service Unavailable) responses
- Dynamic concurrency adjustment based on server responses
- Exponential backoff with gradual recovery
- Server-friendly by design (avoids overwhelming servers)
- Comprehensive statistics logging

**4. Cache Staleness Checking** (`caching.js`):

- HTTP HEAD requests check Last-Modified headers
- Automatic cache invalidation when source pages change
- Conservative error handling (assumes fresh on failure)
- 5-second timeout on HEAD requests for responsiveness
- Ensures data freshness without full re-analysis

**5. Technology Detection** (`technologyDetection.js`):

- **CMS:** Adobe EDS, WordPress, Drupal, Shopify, Wix, Webflow, Squarespace, Joomla
- **Frameworks:** React, Vue.js, Angular, Svelte, Next.js, Nuxt.js
- **Libraries:** jQuery, Lodash, Moment.js, D3.js, Chart.js, GSAP, Alpine.js, HTMX, Three.js
- **Analytics:** Google Analytics, Adobe Analytics, Matomo, Hotjar, Mixpanel, Segment
- **CDNs:** Cloudflare, Akamai, Fastly, Amazon CloudFront
- Pattern-based detection with confidence scoring
- Results included in reports automatically

**Performance Impact:**

- **Before optimization:** 100 URLs in ~45 minutes
- **After optimization:** 100 URLs in ~10 minutes
- **Overall speedup:** 3-5x faster execution

**Data collected for each URL:**

- HTTP status code
- Performance metrics (load time, resource counts)
- SEO data (title, meta descriptions, headings)
- Accessibility issues (WCAG 2.1 violations)
- Content quality metrics
- LLM suitability metrics (semantic HTML, structured data, etc.)
- Security headers
- Form field names and patterns
- JavaScript framework detection

**Output:** `results/results.json` containing all analysis data

**Structure of results.json:**

```json
{
  "analysisDate": "2026-01-12T10:30:00.000Z",
  "baseUrl": "https://example.com",
  "totalPages": 50,
  "pages": [
    {
      "url": "https://example.com/page1",
      "statusCode": 200,
      "performance": { ... },
      "seo": { ... },
      "accessibility": { ... },
      "llmMetrics": { ... },
      "security": { ... }
    }
  ]
}
```

### Phase 3: Report Generation

**Purpose:** Generate human-readable reports from collected data

**Entry point:** `src/main.js::generateReports()`

**Process:**

1. Read `results.json` (single file read)
2. Generate Phase 3a reports (standard)
3. Generate Phase 3b reports (if `--extract-patterns` enabled)
4. Generate Phase 3c reports (if `--enable-history` enabled)
5. Write all reports to `results/` directory

**Key files:**

- `src/utils/reports.js` - Report coordination
- `src/utils/reportUtils/reportGenerators.js` - All CSV and markdown generators
- `src/utils/reportUtils/llmReports.js` - LLM suitability specific reports
- `src/utils/patternExtraction.js` - Pattern extraction (Phase 3b)
- `src/utils/historicalComparison.js` - Regression detection (Phase 3c)

#### Phase 3a: Standard Reports

**Report types generated:**

1. **seo_report.csv** - SEO metrics for all pages
2. **performance_report.csv** - Performance metrics
3. **accessibility_report.csv** - WCAG violations
4. **llm_suitability_report.csv** - AI agent compatibility
5. **robots_quality_report.md** - robots.txt quality analysis
6. **technology_report.csv** - Detected CMS, frameworks, libraries
7. **summary_report.md** - Overall analysis summary
8. **executive_summary.md** - High-level overview (if `--generate-executive-summary`)
9. **dashboard.html** - Interactive dashboard (if `--generate-dashboard`)

#### Phase 3b: Pattern Extraction (--extract-patterns)

**Purpose:** Learn from high-scoring pages to replicate success

**Entry point:** `src/utils/patternExtraction.js::extractPatterns()`

**Trigger:** `--extract-patterns` CLI flag

**Process:**

1. Filter pages by score threshold (default: served score ≥70 OR rendered score ≥70)
2. Extract 6 pattern categories with real examples from analyzed pages
3. Calculate priority (Critical/High) and effort (Low/Moderate) ratings
4. Generate `pattern_library.md` report

**Pattern Categories Extracted:**

1. **Structured Data (JSON-LD):**
   - Schema.org types used (Product, Article, BreadcrumbList, etc.)
   - Example implementations from high-scoring pages
   - Priority: Critical, Effort: Moderate

2. **Semantic HTML Structure:**
   - Use of `<main>`, `<nav>`, `<header>`, `<article>`, `<section>`
   - Heading hierarchy (h1-h6)
   - Priority: Critical, Effort: Low

3. **Standard Form Field Naming:**
   - Conventional names (email, firstName, lastName, phone, etc.)
   - Autocomplete attributes
   - Priority: High, Effort: Low

4. **Persistent Error Messages:**
   - role="alert", aria-live="polite"
   - Visible error text in DOM
   - Priority: High, Effort: Moderate

5. **Explicit State Attributes:**
   - data-state, data-validation-state
   - data-loading, data-error
   - Priority: High, Effort: Moderate

6. **llms.txt Implementation:**
   - Presence and quality of llms.txt file
   - Content structure and completeness
   - Priority: Critical, Effort: Low

**Output:**

- `pattern_library.md` - Up to 5 examples per pattern with implementation guidance

**Use Cases:**

- Identify what works on your best pages
- Replicate patterns across lower-scoring pages
- Training material for development teams
- Quality baseline for consistency

#### Phase 3c: Regression Detection (--enable-history)

**Purpose:** CI/CD-ready regression detection for preventing breaking changes

**Entry point:** `src/utils/historicalComparison.js::detectRegressions()`

**Trigger:** `--enable-history` CLI flag

**Process:**

1. Load baseline from `results/baseline.json` (or establish if missing)
2. Compare current results with baseline across 5 categories
3. Classify regressions by severity (critical/warning/info)
4. Generate `regression_report.md` with actionable recommendations
5. Return exit code (non-zero for critical regressions)

**Regression Categories:**

**1. Performance Regressions:**

- **Critical** (>30% increase): Load time, LCP, FCP, CLS
- **Warning** (>15% increase): Any performance metric degradation
- Impact: User experience degradation

**2. Accessibility Regressions:**

- **Critical:** Any increase in error count
- **Warning:** >10 total issue increase
- Impact: WCAG compliance violations

**3. SEO Regressions:**

- **Critical:** >10% score decrease
- **Warning:** >5% score decrease
- Impact: Search engine visibility

**4. LLM Suitability Regressions:**

- **Critical:** >10% served score decrease (affects ALL agents)
- **Warning:** >10% rendered score decrease (affects browser agents)
- Impact: AI agent compatibility

**5. URL Count Changes:**

- **Warning:** Significant URL count change (may indicate crawl issues)
- Impact: Completeness of analysis

**Output:**

- `regression_report.md` - Detailed regression analysis with severity classifications
- Exit code 1 if critical regressions found (fails CI/CD pipeline)
- Exit code 0 otherwise (passes with warnings logged)

**CI/CD Integration:**

```bash
# In CI/CD pipeline
npm start -- -s https://staging.example.com --enable-history

# Returns exit code 1 if critical regressions found
# Pipeline fails, preventing deployment
```

**Baseline Management:**

- First run with `--enable-history` establishes baseline
- Baseline stored in `results/baseline.json`
- Update baseline after deploying intentional improvements
- Timestamp-specific baselines supported for rollback testing

**CRITICAL:** Report generation functions must:

- Accept `context` parameter with logger
- Accept `results` object (parsed JSON data)
- Accept `outputDir` for where to write files
- NEVER fetch URLs directly
- NEVER make network requests
- NEVER use Puppeteer

Example correct signature:

```javascript
export function generateSeoReport(context, results, outputDir) {
  // Read data from results object
  // Write report to outputDir
}
```

Example INCORRECT approach:

```javascript
export async function generateSeoReport(context, outputDir) {
  // ❌ WRONG: Fetching URLs during report generation
  const pages = await fetchPages(context.options.sitemap)
}
```

## LLM Suitability Analysis

The Web Audit Suite implements the AI agent compatibility patterns from the book.

### Two HTML States

**Critical distinction:** AI agents see different HTML depending on their architecture:

1. **SERVED HTML** (static) - What CLI agents and server-based agents see
   - No JavaScript execution
   - Only initial HTML response from server
   - Examples: Claude CLI, basic web scrapers

2. **RENDERED HTML** (dynamic) - What browser-based agents see
   - After JavaScript execution
   - Fully hydrated DOM
   - Examples: Claude for Chrome, Playwright-based agents

The tool analyzes BOTH states and reports metrics for each.

### Metric Categories

Metrics are classified by importance:

**ESSENTIAL_SERVED** (works for ALL agents):

- Semantic HTML structure
- Form field naming conventions
- Schema.org structured data
- llms.txt file presence
- HTTP status codes
- Security headers

**ESSENTIAL_RENDERED** (works for browser agents):

- Explicit state attributes (data-state, data-validation-state)
- Agent visibility control (data-agent-visible)
- Persistent error messages
- Dynamic validation feedback

**NICE_TO_HAVE** (speculative, not critical):

- Table data attributes (data-price, data-currency)
- Button disabled explanations (data-disabled-reason)
- Auth state attributes (data-authenticated)

### LLM Metrics Collection

**File:** `src/utils/llmMetrics.js`

**Key functions:**

- `collectLlmMetrics(page, url, context)` - Main collection orchestrator
- `checkSemanticHtml(page)` - Analyzes semantic HTML patterns
- `checkStructuredData(page)` - Validates Schema.org JSON-LD
- `checkFormFieldNaming(page)` - Validates form field names
- `checkExplicitState(page)` - Detects state attributes
- `checkLlmsTxt(url)` - Verifies llms.txt file presence

**Metrics collected:**

```javascript
{
  served: {
    semanticHtml: { score, details },
    formFieldNaming: { score, details },
    structuredData: { score, details },
    llmsTxt: { present, quality },
    httpStatus: { code, acceptable },
    securityHeaders: { score, headers }
  },
  rendered: {
    explicitState: { score, patterns },
    agentVisibility: { score, usage },
    persistentErrors: { score, patterns },
    validationFeedback: { score, patterns }
  },
  niceToHave: {
    tableDataAttributes: { score },
    buttonExplanations: { score },
    authState: { score }
  }
}
```

## Configuration System

**File:** `src/config/defaults.js`

Default configuration values for all analysis parameters:

```javascript
export const DEFAULT_CONFIG = {
  // Crawling
  maxPages: 100,
  crawlDelay: 1000,
  timeout: 30000,

  // Analysis
  enableAccessibility: true,
  enablePerformance: true,
  enableSeo: true,
  enableLlmMetrics: true,

  // Reporting
  generateDashboard: false,
  generateExecutiveSummary: false,

  // Output
  outputDir: './results',
  cacheDir: './.cache'
}
```

Configuration can be overridden via:

1. Command-line flags
2. Configuration file
3. Environment variables

Priority: CLI flags > config file > environment > defaults

## Entry Point and CLI

**File:** `index.js`

**Process:**

1. Parse command-line arguments
2. Initialize Winston logger
3. Create audit context object
4. Call `main()` from `src/main.js`
5. Handle errors and cleanup

**Key command-line flags:**

- `-s, --sitemap <url>` - Sitemap URL or starting page
- `-o, --output <dir>` - Output directory
- `-c, --count <num>` - Limit number of pages
- `--enable-history` - Enable historical comparisons and regression detection
- `--generate-dashboard` - Generate interactive dashboard
- `--generate-executive-summary` - Generate executive summary
- `--extract-patterns` - Extract patterns from high-scoring pages
- `--force-scrape` - Bypass robots.txt restrictions (use with caution)
- `--browser-pool-size <number>` - Configure browser pool size (default: 3, set 0 to disable)
- `--url-concurrency <number>` - Configure concurrent URL processing (default: 3)

## Main Orchestration

**File:** `src/main.js`

**Function:** `main(context)`

**Process:**

1. **Phase 0:** robots.txt Compliance

   ```javascript
   const robotsData = await fetchRobotsTxt(context, baseUrl)
   context.robotsData = robotsData
   ```

2. **Phase 1:** URL Collection

   ```javascript
   const urls = await getUrlsFromSitemap(context, sitemapUrl)
   ```

3. **Phase 2:** Data Collection

   ```javascript
   // Initialize performance optimizations
   const browserPool = await initializeBrowserPool(context)
   const rateLimiter = new AdaptiveRateLimiter(context)

   try {
     await processSitemapUrls(context, urls)
   } finally {
     await browserPool.shutdown()
     rateLimiter.logStatistics()
   }
   ```

4. **Phase 3:** Report Generation

   ```javascript
   // Phase 3a: Standard reports
   await generateReports(context)

   // Phase 3b: Pattern extraction (if --extract-patterns)
   if (context.options.extractPatterns) {
     await extractPatterns(results, outputDir, context)
   }

   // Phase 3c: Regression detection (if --enable-history)
   if (context.options.enableHistory) {
     const regressions = await detectRegressions(results, outputDir, context)
     if (regressions.critical.length > 0) {
       process.exit(1) // Fail CI/CD pipeline
     }
   }
   ```

Each phase is sequential. No overlap. No phase jumps ahead. Cleanup occurs in finally blocks.

## Error Handling

### Graceful Degradation

If a single page fails:

- Log the error
- Continue processing remaining pages
- Include error status in results.json
- Don't fail entire analysis

### Network Resilience

**File:** `src/utils/networkUtils.js`

Implements retry logic:

- Exponential backoff
- Maximum retry attempts (3)
- Timeout handling
- User-agent rotation for blocked requests

### Browser Cleanup

Puppeteer browser instances are properly cleaned up:

```javascript
try {
  await browser.newPage()
  // ... analysis
} finally {
  await page.close()
  await browser.close()
}
```

## Caching Strategy

**File:** `src/utils/caching.js`

Puppeteer cache stored in `.cache/` directory:

- Speeds up repeated analyses
- Reduces bandwidth usage
- Automatically managed (no manual cleanup needed)

The cache is gitignored and regenerated as needed.

## Testing Approach

### Manual Testing

Run against known sites with expected patterns:

```bash
npm run audit:start -- -s https://example.com -c 10
```

Verify:

- `results.json` contains expected data
- All reports are generated
- No errors in logs

### Validation Checklist

Before deployment:

1. ✓ URLs collected correctly
2. ✓ All pages analyzed
3. ✓ `results.json` contains complete data
4. ✓ Reports generated from JSON only
5. ✓ No network calls during report generation
6. ✓ Error handling works gracefully
7. ✓ Browser cleanup successful

## Common Mistakes to Avoid

### ❌ WRONG: Fetching data during report generation

```javascript
export async function generateReport(context, outputDir) {
  // DON'T DO THIS
  const pages = await fetchPages(context.options.sitemap)
}
```

### ✓ CORRECT: Reading from results.json

```javascript
export function generateReport(context, results, outputDir) {
  // Do this instead
  const pages = results.pages
}
```

### ❌ WRONG: Using global state

```javascript
// DON'T DO THIS
global.auditcore = { logger, options }

function someFunction() {
  global.auditcore.logger.info('message')
}
```

### ✓ CORRECT: Using dependency injection

```javascript
// Do this instead
function someFunction(context) {
  context.logger.info('message')
}
```

### ❌ WRONG: Missing .js extension in imports

```javascript
// DON'T DO THIS
import { foo } from './utils/bar'
```

### ✓ CORRECT: Including .js extension

```javascript
// Do this instead
import { foo } from './utils/bar.js'
```

## Performance Considerations

### Browser Pooling

**Resource Optimization:**

- Pool of 3 reusable browsers eliminates 97% of launch overhead
- Each browser serves multiple pages before restart
- Automatic restart after 50 pages prevents memory leaks
- FIFO queue management ensures fair resource allocation

**Memory Usage:**

- 3 concurrent browsers: ~600-900 MB total
- Monitor memory with `--browser-pool-size 1` if constrained
- Disable pooling with `--browser-pool-size 0` for debugging

### Concurrent URL Processing

**Parallelization Implemented:**

- Default: 3 URLs processed simultaneously
- Adaptive rate limiting prevents server overwhelming
- Promise.allSettled() ensures errors don't block batches

**Configuration Guidance:**

- **Small sites (<100 URLs):** Default settings (3/3)
- **Medium sites (100-500 URLs):** Increase to 5/5
- **Large sites (500+ URLs):** Use 7/7 with monitoring
- **Slow servers:** Reduce to 2/2 to avoid 429 responses

### Adaptive Rate Limiting

**Server-Friendly Design:**

- Monitors 429 (Too Many Requests) and 503 (Service Unavailable)
- Exponential backoff when server struggles
- Gradual recovery when server stabilizes
- Statistics logged at end of analysis

**No Manual Tuning Required:**

- System automatically finds optimal rate
- Respects server capacity dynamically
- Prevents IP blocking through conservative limits

### Cache Staleness Checking

**HTTP HEAD Request Efficiency:**

- 5-second timeout prevents hanging
- Conservative error handling (assume fresh on failure)
- Validates freshness without full page download
- Automatic invalidation when source changes

### Report Generation Speed

Report generation remains fast:

- Single file read (`results.json`)
- No network requests
- Pure data transformation
- CSV writing is efficient

### Performance Impact Summary

**Typical timing (100 URLs):**

**Before optimization:**

- Phase 0: N/A
- Phase 1: 1-5 seconds (URL collection)
- Phase 2: ~45 minutes (sequential, browser launches per page)
- Phase 3: 1-3 seconds (report generation)
- **Total: ~45 minutes**

**After optimization:**

- Phase 0: 1-2 seconds (robots.txt check)
- Phase 1: 1-5 seconds (URL collection with browser pool)
- Phase 2: ~10 minutes (concurrent with browser pooling)
- Phase 3a: 1-3 seconds (standard reports)
- Phase 3b: 2-5 seconds (pattern extraction, if enabled)
- Phase 3c: 1-2 seconds (regression detection, if enabled)
- **Total: ~10 minutes (3-5x faster)**

**Scalability:**

- 500 URLs: ~50 minutes (was ~3.75 hours)
- 1000 URLs: ~100 minutes (was ~7.5 hours)
- Performance gain increases with site size

## Future Enhancements

### Custom Metrics

Allow users to define custom analysis patterns:

- Plugin system for metric collectors
- Custom report generators
- Extensible architecture

### API Mode

Run as a service:

- REST API for triggering analyses
- Webhook notifications on completion
- Multiple concurrent analyses

### Enhanced Regression Detection

Expand regression detection capabilities:

- Custom threshold configuration
- Machine learning-based anomaly detection
- Trend analysis across multiple baselines
- Automated rollback recommendations

### Advanced Pattern Library

Enhance pattern extraction:

- Pattern confidence scoring
- Pattern adoption tracking over time
- Pattern recommendation engine
- Automated pattern application

## File Structure Reference

```text
packages/web-audit-suite/
├── index.js                    # CLI entry point
├── package.json                # Dependencies and scripts
├── src/
│   ├── main.js                 # Pipeline orchestration (4 phases)
│   ├── config/
│   │   └── defaults.js         # Default configuration
│   └── utils/
│       ├── robotsFetcher.js    # Phase 0: robots.txt fetching
│       ├── robotsCompliance.js # Phase 0: Compliance checking
│       ├── robotsTxtParser.js  # Phase 0: Quality analysis
│       ├── sitemap.js          # Phase 1: URL collection
│       ├── urlProcessor.js     # Phase 2: Concurrent URL processing
│       ├── browserPool.js      # Phase 2: Browser pooling
│       ├── rateLimiter.js      # Phase 2: Adaptive rate limiting
│       ├── pageAnalyzer.js     # Phase 2: Page analysis
│       ├── pa11yRunner.js      # Phase 2: Accessibility testing
│       ├── llmMetrics.js       # Phase 2: LLM metrics collection
│       ├── technologyDetection.js  # Phase 2: Technology detection
│       ├── metricsUpdater.js   # Phase 2: Results.json updates
│       ├── reports.js          # Phase 3a: Report coordination
│       ├── reportUtils/
│       │   ├── reportGenerators.js  # Phase 3a: All reports
│       │   └── llmReports.js        # Phase 3a: LLM reports
│       ├── patternExtraction.js    # Phase 3b: Pattern extraction
│       ├── historicalComparison.js # Phase 3c: Regression detection
│       ├── networkUtils.js     # Network utilities
│       └── caching.js          # Cache management with staleness checking
├── results/                    # Generated output (gitignored)
│   ├── results.json           # Single source of truth
│   ├── baseline.json          # Regression baseline (if --enable-history)
│   ├── seo_report.csv
│   ├── performance_report.csv
│   ├── accessibility_report.csv
│   ├── llm_suitability_report.csv
│   ├── robots_quality_report.md
│   ├── technology_report.csv
│   ├── pattern_library.md     # If --extract-patterns
│   ├── regression_report.md   # If --enable-history
│   └── summary_report.md
├── .cache/                     # Puppeteer cache (gitignored)
├── LEARNINGS.md                # Battle-tested rules and patterns
├── PROJECTSTATE.md             # Complete implementation snapshot
├── IMPROVEMENT_PLAN.md         # Comprehensive improvement roadmap
└── CODE_REVIEW_CHECKLIST.md   # Quality assurance guide
```

## Dependencies

Key production dependencies:

- **puppeteer** - Browser automation for page analysis
- **pa11y** - Accessibility testing (WCAG 2.1)
- **winston** - Logging
- **commander** - CLI argument parsing
- **cheerio** - HTML parsing
- **csv-writer** - CSV report generation

Dev dependencies:

- **eslint** - Code linting
- **prettier** - Code formatting

## Logging Strategy

Winston logger with multiple levels:

- **error** - Critical failures requiring attention
- **warn** - Issues that don't stop analysis
- **info** - Progress updates and key milestones
- **debug** - Detailed analysis information

Log output:

- Console (formatted for readability)
- File (`results/audit.log` if enabled)

Example log output:

```text
[INFO] Phase 1: Collecting URLs from sitemap...
[INFO] Found 47 URLs to analyze
[INFO] Phase 2: Analyzing pages (1/47)...
[INFO] Phase 2: Analyzing pages (47/47)...
[INFO] Phase 3: Generating reports...
[INFO] Generated SEO report: results/seo_report.csv
[INFO] Generated LLM suitability report: results/llm_suitability_report.csv
[INFO] Analysis complete!
```

## Integration with "The Invisible Users" Book

The Web Audit Suite directly implements patterns from the book:

- **Chapter 10** - Designing for Both (semantic HTML, explicit state)
- **Chapter 11** - Technical Advice (implementation patterns)
- **Appendix D** - AI-Friendly HTML Guide (comprehensive patterns)
- **Appendix E** - AI Patterns Quick Reference (data attribute reference)

The tool validates that websites implement these patterns correctly.

## Support and Troubleshooting

### Common Issues

**Issue:** "Cannot find module" errors

**Solution:** Ensure all imports include `.js` extension

**Issue:** Browser fails to launch

**Solution:** Check Puppeteer installation, ensure Chrome/Chromium is available

**Issue:** Analysis hangs on specific pages

**Solution:** Use timeout flag, check network connectivity, verify page loads manually

**Issue:** Reports missing data

**Solution:** Check `results.json` was generated, verify Phase 2 completed successfully

### Debug Mode

Enable verbose logging:

```bash
DEBUG=* npm run audit:start -- -s https://example.com
```

### Contact

For issues or questions:

- Email: <tom.cranstoun@gmail.com>
- Website: <https://allabout.network>

---

**Architecture Document Version:** 2.0.0 (18 January 2026)

**Related Documentation:**

- `packages/web-audit-suite/README.md` - User guide
- `packages/web-audit-suite/QUICKSTART.md` - Quick start guide
- `packages/web-audit-suite/docs/usermanual.md` - Complete manual
- `CLAUDE.md` - AI assistant guidance
