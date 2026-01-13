# Web Audit Suite Architecture

**Last updated:** 12 January 2026

## Overview

The Web Audit Suite is a Node.js application that analyzes websites for AI agent compatibility, accessibility, performance, and SEO. It implements the patterns described in "The Invisible Users" book to help website owners understand how well their sites work for both human users and AI agents.

## Core Design Principles

### 1. Single Source of Truth

**CRITICAL PRINCIPLE:** `results/results.json` is the single source of truth for all analysis data.

- **Phase 1-2:** Collect and store data in `results.json`
- **Phase 3:** Read from `results.json` to generate reports
- **Never:** Fetch data during report generation

This separation ensures:

- Reports can be regenerated without re-crawling
- Data collection and presentation are decoupled
- Multiple report formats can be generated from the same data
- Debugging is easier (inspect the JSON file directly)

### 2. Three-Phase Pipeline

The application follows a strict three-phase architecture:

```text
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

## Three-Phase Pipeline Details

### Phase 1: URL Collection

**Purpose:** Discover all URLs to analyze

**Entry point:** `src/utils/sitemap.js::getUrlsFromSitemap()`

**Process:**

1. Fetch sitemap XML or HTML page
2. Extract URLs (handles both XML sitemaps and HTML link extraction)
3. Use Puppeteer fallback for Cloudflare-protected sites
4. Validate and normalize URLs
5. Apply count limit if specified (`-c` flag)
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

1. For each URL:
   - Launch Puppeteer browser
   - Navigate to page
   - Collect page metrics (performance, SEO, content)
   - Run Pa11y for accessibility testing
   - Collect LLM suitability metrics
   - Store all data in `results.json`
2. Update progress indicators
3. Handle errors gracefully (continue processing remaining URLs)

**Key files:**

- `src/main.js` - Orchestrates data collection
- `src/utils/pageAnalyzer.js` - Page content analysis
- `src/utils/pa11yRunner.js` - Accessibility testing
- `src/utils/llmMetrics.js` - LLM suitability metrics
- `src/utils/metricsUpdater.js` - Updates results.json with collected data

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
2. Generate multiple report formats:
   - CSV reports (SEO, performance, accessibility, LLM suitability)
   - Markdown summary reports
   - Executive summary (if enabled)
   - Dashboard HTML (if enabled)
3. Write reports to `results/` directory

**Key files:**

- `src/utils/reports.js` - Report coordination
- `src/utils/reportUtils/reportGenerators.js` - All CSV and markdown generators
- `src/utils/reportUtils/llmReports.js` - LLM suitability specific reports

**Report types generated:**

1. **seo_report.csv** - SEO metrics for all pages
2. **performance_report.csv** - Performance metrics
3. **accessibility_report.csv** - WCAG violations
4. **llm_suitability_report.csv** - AI agent compatibility
5. **summary_report.md** - Overall analysis summary
6. **executive_summary.md** - High-level overview (optional)
7. **dashboard.html** - Interactive dashboard (optional)

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
- `--enable-history` - Enable historical comparisons
- `--generate-dashboard` - Generate interactive dashboard
- `--generate-executive-summary` - Generate executive summary

## Main Orchestration

**File:** `src/main.js`

**Function:** `main(context)`

**Process:**

1. **Phase 1:** URL Collection

   ```javascript
   const urls = await getUrlsFromSitemap(context, sitemapUrl)
   ```

2. **Phase 2:** Data Collection

   ```javascript
   await processSitemapUrls(context, urls)
   ```

3. **Phase 3:** Report Generation

   ```javascript
   await generateReports(context)
   ```

Each phase is sequential. No overlap. No phase jumps ahead.

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

### Puppeteer Resource Usage

Browser automation is resource-intensive:

- Each page analysis launches a browser instance
- Memory usage can be significant for large sites
- Use `-c` flag to limit pages during development

### Parallelization

Current implementation is sequential (one page at a time).

Future enhancement: Parallel processing with concurrency limit (e.g., 5 pages simultaneously).

### Report Generation Speed

Report generation is fast because:

- Single file read (`results.json`)
- No network requests
- Pure data transformation
- CSV writing is efficient

Typical timing:

- Phase 1: 1-5 seconds (URL collection)
- Phase 2: 30-60 seconds per page (analysis)
- Phase 3: 1-3 seconds (report generation)

## Future Enhancements

### Historical Comparison

Track changes over time:

- Store previous `results.json` files
- Compare metrics between runs
- Generate trend reports

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

## File Structure Reference

```text
packages/web-audit-suite/
├── index.js                    # CLI entry point
├── package.json                # Dependencies and scripts
├── src/
│   ├── main.js                 # Pipeline orchestration
│   ├── config/
│   │   └── defaults.js         # Default configuration
│   └── utils/
│       ├── sitemap.js          # Phase 1: URL collection
│       ├── pageAnalyzer.js     # Phase 2: Page analysis
│       ├── pa11yRunner.js      # Phase 2: Accessibility testing
│       ├── llmMetrics.js       # Phase 2: LLM metrics collection
│       ├── metricsUpdater.js   # Phase 2: Results.json updates
│       ├── reports.js          # Phase 3: Report coordination
│       ├── reportUtils/
│       │   ├── reportGenerators.js  # Phase 3: All reports
│       │   └── llmReports.js        # Phase 3: LLM reports
│       ├── networkUtils.js     # Network utilities
│       └── caching.js          # Cache management
├── results/                    # Generated output (gitignored)
│   ├── results.json           # Single source of truth
│   ├── seo_report.csv
│   ├── performance_report.csv
│   ├── accessibility_report.csv
│   ├── llm_suitability_report.csv
│   └── summary_report.md
└── .cache/                     # Puppeteer cache (gitignored)
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

**Architecture Document Version:** 1.0.0 (12 January 2026)

**Related Documentation:**

- `packages/web-audit-suite/README.md` - User guide
- `packages/web-audit-suite/QUICKSTART.md` - Quick start guide
- `packages/web-audit-suite/docs/usermanual.md` - Complete manual
- `CLAUDE.md` - AI assistant guidance
