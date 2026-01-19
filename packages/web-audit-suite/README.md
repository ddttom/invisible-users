# Web Audit Suite

A comprehensive Node.js tool for analyzing websites across multiple dimensions: SEO, performance, accessibility, security, content quality, and AI agent compatibility.

**Note:** This is a private repository. Access is granted under commercial license terms.

The folder /docs contains prompts in .md format that are useful for extending this project.

## Target Audience

This tool is designed for:

- **Developers & Architects**: Building "Agent-Friendly" applications and ensuring compatibility with AI crawlers.
- **QA & SEO Specialists**: Auditing sites for accessibility, SEO, and LLM suitability in one pass.
- **Accessibility Advocates**: Verifying WCAG compliance alongside AI-readability.

## Key Features

- **SEO Analysis**: Detailed SEO metrics and scoring
- **Performance Metrics**: Comprehensive page load analysis
- **Accessibility Testing**: WCAG 2.1 compliance checking with Pa11y integration
  - Detailed markdown reports for better readability
- **Security Analysis**: Security headers and HTTPS configuration
- **Content Quality**: Structure and freshness analysis
- **LLM Suitability**: AI agent compatibility analysis (served vs rendered HTML)
  - llms.txt detection for AI agent guidance
  - Automatic `llms.txt` discovery at domain root
  - data-agent-visible attribute tracking
  - Social media meta tag validation (Open Graph, Twitter Card)
  - SEO meta tag analysis (robots, keywords, theme-color)
  - Reading time metadata validation (timeRequired, educationalLevel)
  - Dynamic content pattern detection (carousels, animations, autoplay media, visual dynamism via screenshot comparison)
  - Three specialized reports (general, frontend, backend)
- **Automatic Cache Management**: .cache directory creation and management
- **Robust Error Handling**: Network error recovery and retry mechanism
- **URL Processing Control**: Limit number of URLs processed using count parameter
- **Rate Limiting**: Configurable request throttling to respect server limits
- **Output Directory Preservation**: Existing output directory contents are preserved
- **Configurable Sampling**: Test with small samples before full analysis
- **Results File Detection**: Automatic detection of results.json for report generation
- **Iterative Testing**: Test reports with small samples, then run full analysis
- **Language Variant Filtering**: Skip non-English variants by default (only process /en and /us)
  - Enhanced URL extraction logic with automatic language variant detection
  - Centralized language variant checking in report generation
- **Historical Comparison**: Track changes over time with comparative analysis
  - Stores historical results in timestamped files
  - Compares current run with previous runs
  - Identifies improvements and regressions
- **Executive Summary**: Single-page overview with key insights
  - High-level status across all categories
  - Key findings and actionable recommendations
  - Pass/fail status based on configurable thresholds
- **Interactive Dashboard**: HTML dashboard with visual analytics
  - Embedded charts for performance, accessibility, SEO
  - Historical trend visualization
  - Comparison tables and pass/fail summaries
- **Configurable Thresholds**: Customize pass/fail criteria
  - JSON-based threshold configuration
  - Category-specific thresholds (performance, SEO, accessibility)
  - Warn and fail levels for each metric

**📊 Business Guide:** For business-focused information about benefits, reports, and recommendations, see [Web Audit Suite Business Guide](../../docs/sales-enablement/web-audit-suite-business-guide.md)

## Data Structure

The tool collects comprehensive data about each page and stores it in `results.json`. This file serves as the source of truth for all reports.

### Key Metrics Collected

#### Performance Metrics

- Load time and DOM content loaded
- First paint and first contentful paint
- Largest contentful paint
- Time to interactive
- Total blocking time
- Cumulative layout shift

#### Content Analysis

- Word count
- Heading structure (h1, h2, h3 counts)
- Image analysis (count, dimensions, alt text)
- Internal and external link counts
- Meta information (title, description)

#### Accessibility Metrics

- WCAG 2.1 compliance levels (A, AA, AAA)
- Issue severity tracking (Critical, Serious, Moderate, Minor)
- Required manual checks
- Remediation suggestions
- Human-readable markdown reports

#### Technical Metrics

- Page size in bytes
- Resource counts (scripts, stylesheets)
- Form and table counts
- JavaScript errors
- Accessibility issues count

#### Detailed Data

- Complete image inventory with dimensions
- Accessibility issues with recommendations
- HTML validation results
- SEO scores with subscores

### Example Data Structure

```json
{
  "url": "https://example.com/page",
  "lastmod": "2025-01-16T15:30:45.892Z",
  "loadTime": 115.79,
  "firstPaint": 700.39,
  "wordCount": 3153,
  "h1Count": 2,
  "imagesCount": 2,
  "images": [
    {
      "src": "./media_1.png",
      "alt": "Description",
      "width": "1087",
      "height": "486"
    }
  ],
  "pageSize": 43104,
  "pa11yIssuesCount": 5,
  "wcagCompliance": {
    "A": 0,
    "AA": 2,
    "AAA": 1
  }
}
```

## Documentation

- [Quick Start Guide](QUICKSTART.md) - Get started in 5 minutes
- [User Manual](docs/usermanual.md) - Complete user documentation
- [Configuration Guide](docs/CONFIGURATION.md) - Detailed configuration reference
- [Features Overview](docs/FEATURES.md) - All available features
- [Report Layout](docs/report-layout.md) - Understanding report structure and data
- [CI/CD Integration Guide](docs/CI-CD-INTEGRATION.md) - GitHub Actions and CI/CD setup
- [Example Thresholds](examples/README.md) - Threshold configuration examples

## Project Structure

```bash
web-audit-suite/
├── docs/           # Documentation files
│   ├── CONFIGURATION.md    # Configuration guide
│   ├── FEATURES.md         # Feature overview
│   ├── report-layout.md    # Report structure documentation
│   ├── usermanual.md       # User guide
│   └── AI-design-rules/    # AI assistant extension prompts
│       ├── comment.md          # Commenting guidelines
│       ├── modification.md     # Code modification templates
│       └── system.md           # Development standards
├── results/        # Generated reports and analysis
│   ├── seo_report.csv
│   ├── performance_analysis.csv
│   ├── seo_scores.csv
│   ├── virtual_sitemap.xml
│   ├── final_sitemap.xml
│   ├── results.json
│   ├── wcag_report.md
│   └── summary.json
├── src/           # Source code
│   ├── main.js
│   └── utils/     # Utility functions
│       ├── reportUtils/  # Report generation modules
│       │   ├── formatUtils.js        # Formatting utilities
│       │   ├── accessibilityAnalysis.js # Accessibility analysis
│       │   ├── imageAnalysis.js      # Image analysis
│       │   ├── linkAnalysis.js       # Link analysis
│       │   ├── contentAnalysis.js    # Content quality analysis
│       │   └── reportGenerators.js   # Report generation functions
│       ├── networkUtils.js # Network error handling
│       └── reports.js    # Main report coordination
├── .cache/        # Cache directory (automatically created)
├── index.js       # Entry point
├── README.md
├── combined.log   # Complete activity log
└── error.log      # Error tracking
```

## Features

- Smart content detection (XML sitemap or HTML)
- Recursive link discovery from HTML pages
- Robust URL handling (absolute, relative, protocol-relative)
- Internal/external link analysis
- SEO score calculation
- Performance metrics
- WCAG 2.1 accessibility testing (Pa11y)
  - Detailed markdown reports for better review
- Virtual and final sitemap generation
- Graceful error recovery
- Enhanced network error handling with retry mechanism
- Automatic cache directory management
- URL processing control with count parameter
- Preserved output directory contents
- Configurable sampling limits for testing
- Results file detection for report generation
- Iterative testing workflow:
  - Test with small samples (e.g., 10 pages)
  - Review and adjust reports
  - Run full analysis when satisfied
- Language variant filtering:
  - Skip non-English variants by default
  - Only process /en and /us variants
  - Enhanced URL extraction logic with automatic detection
  - Centralized language variant checking in report generation
  - Override with --include-all-languages flag

## Network Error Handling

The tool includes robust network error handling that:

1. Detects network-related errors automatically
2. Provides clear console messages about the issue
3. Allows the user to retry after fixing the problem
4. Handles both regular network requests and browser operations
5. Implements automatic retries with user confirmation
6. Provides detailed error classification for:
   - DNS failures
   - Connection timeouts
   - Host unreachable errors
   - Browser network errors
7. Includes Cloudflare challenge bypass capability with:
   - Automatic detection of Cloudflare challenges
   - Randomized browser fingerprinting
   - Human-like behavior simulation
   - Fallback to visible browser mode when needed
   - Detailed logging of bypass attempts
   - Configurable retry logic for persistent challenges

## Requirements

- Node.js >= 20.0.0
- npm

## Installation

### Local Installation

```bash
npm install
```

### Docker Installation

No local installation required! Run audits in a containerized environment with all dependencies included:

```bash
# Build the Docker image
docker build -t web-audit-suite .

# Run an audit
docker run --rm -v $(pwd)/results:/app/results \
  web-audit-suite node index.js -s https://example.com/sitemap.xml -c 10
```

See [DOCKER.md](DOCKER.md) for comprehensive Docker usage guide including:

- Quick start examples
- CI/CD integration
- Advanced configuration
- Troubleshooting tips

## Usage

```bash
npm start -- -s <url> -o <output-dir> [options]
```

### Configuration Methods

You can configure the tool using:

1. **CLI Arguments** (Highest priority, explicit flags only)
2. **Environment Variables** / `.env` file
3. **Default Configuration** (Lowest priority)

**Note**: CLI flags are only prioritized if explicitly provided. Default values from the CLI help text do NOT override environment variables.

See [User Manual](docs/usermanual.md#environment-variables) for full `.env` options.

### Options

- `-s, --sitemap <url>`: URL of the sitemap or webpage to process (default: "<https://allabout.network/blogs/ddt/edge-delivery-services-knowledge-hub>")
- `-o, --output <directory>`: Output directory for results (default: "results")
  - Preserves existing contents if directory exists
  - Creates directory if it doesn't exist
- `-l, --limit <number>`: Limit the number of URLs to test (-1 for all)
- `-c, --count <number>`: Limit number of files to include in both passes (-1 for infinite)
- `--cache-only`: Use only cached data
- `--no-cache`: Disable caching
- `--force-delete-cache`: Force delete existing cache
- `--log-level <level>`: Set logging level (error, warn, info, debug)
- `--include-all-languages`: Include all language variants in analysis (default: only /en and /us)
- `--enable-history`: Enable historical tracking (stores results for comparison over time)
- `--generate-dashboard`: Generate interactive HTML dashboard with charts
- `--generate-executive-summary`: Generate executive summary report
- `--thresholds <file>`: Path to custom thresholds configuration file (JSON)

### Output Files

- `seo_report.csv`: Page-level SEO analysis
  - URL
  - Title presence and content
  - Meta description presence and content
  - H1 tag count
  - Image count and alt text usage
  - Internal/external link counts

- `performance_analysis.csv`: Page performance metrics
  - Load time
  - First paint timing
  - First contentful paint timing
  - Largest contentful paint
  - Time to interactive
  - Total blocking time
  - Cumulative layout shift

- `accessibility_report.csv`: WCAG 2.1 compliance analysis
  - Total issues by severity
  - WCAG compliance levels
  - Required manual checks
  - Remediation suggestions

- `wcag_report.md`: Human-readable WCAG issues report
  - Path-by-path organization
  - Unique issues with occurrence counts
  - Detailed issue descriptions
  - Remediation suggestions
  - Required manual checks

- `seo_scores.csv`: Detailed SEO scoring
  - Overall score
  - Title optimization score
  - Meta description score
  - Content quality score
  - Link structure score

- `virtual_sitemap.xml`: Initial crawl results
  - URLs discovered during first pass
  - Last modification dates
  - Change frequency
  - Priority values

- `final_sitemap.xml`: Complete site structure
  - All unique internal URLs
  - Updated modification dates
  - Consolidated priorities

- `summary.json`: Site-wide metrics
  - Total URLs processed
  - Internal/external URL counts
  - Average SEO score
  - Timestamp

- `results.json`: Complete analysis data
  - Performance metrics
  - SEO scores
  - Accessibility results
  - URL metrics
  - Response codes

### Log Files

- `combined.log`: Complete activity log
  - All processing steps
  - Debug information
  - Warnings and notices

- `error.log`: Error tracking
  - Processing failures
  - Invalid URLs
  - Connection issues

- `executive_summary.md`: Executive summary report (generated with --generate-executive-summary)
  - Overall status across all categories
  - Key findings and recommendations
  - Pass/fail status with configurable thresholds
  - Comparison with previous run (if historical tracking enabled)

- `executive_summary.json`: Machine-readable executive summary
  - Structured data format
  - Integration-ready format

- `dashboard.html`: Interactive HTML dashboard (generated with --generate-dashboard)
  - Visual analytics with embedded charts
  - Performance, accessibility, SEO, content, and LLM metrics
  - Historical trend charts (if multiple runs tracked)
  - Comparison tables showing changes over time
  - Pass/fail summary tables

- `history/`: Historical results directory (created with --enable-history)
  - `results-<timestamp>.json`: Timestamped historical results
  - Enables comparative analysis and trend tracking

### Usage Examples

#### Basic Analysis

```bash
# Run basic analysis on a sitemap
npm start -- -s https://example.com/sitemap.xml

# Limit to 10 pages for testing
npm start -- -s https://example.com/sitemap.xml -c 10
```

#### Advanced Features

```bash
# Generate dashboard with historical tracking
npm start -- -s https://example.com/sitemap.xml --enable-history --generate-dashboard

# Generate executive summary only
npm start -- -s https://example.com/sitemap.xml --generate-executive-summary

# Full analysis with all enhanced features
npm start -- -s https://example.com/sitemap.xml \
  --enable-history \
  --generate-dashboard \
  --generate-executive-summary

# Use custom thresholds
npm start -- -s https://example.com/sitemap.xml \
  --thresholds ./custom-thresholds.json \
  --generate-dashboard
```

#### Custom Thresholds Configuration

Create a JSON file with your custom pass/fail criteria. Several examples are provided:

**Example Files** (in `examples/` directory):

- `strict-thresholds.json` - High-quality production sites
- `relaxed-thresholds.json` - Development/staging environments
- `ci-thresholds.json` - CI/CD quality gates
- See `examples/README.md` for detailed documentation

**Create Your Own**:

```bash
# Copy the example template
cp custom-thresholds.example.json my-thresholds.json

# Edit and customize
# Then use it:
npm start -- -s https://example.com/sitemap.xml --thresholds ./my-thresholds.json
```

**Example Format**:

```json
{
  "performance": {
    "loadTime": { "pass": 2000, "warn": 4000 },
    "lcp": { "pass": 2000, "warn": 3500 }
  },
  "accessibility": {
    "maxErrors": { "pass": 0, "warn": 3 }
  },
  "seo": {
    "minScore": { "pass": 85, "warn": 70 }
  }
}
```

#### Historical Tracking Workflow

```bash
# First run - establishes baseline
npm start -- -s https://example.com/sitemap.xml --enable-history --generate-dashboard

# Subsequent runs - automatically compares with previous
npm start -- -s https://example.com/sitemap.xml --enable-history --generate-dashboard

# Dashboard will show:
# - Comparison tables with previous run
# - Trend charts across all runs
# - Improvements and regressions
```
