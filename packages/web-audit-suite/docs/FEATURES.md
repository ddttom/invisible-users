# Web Audit Suite - Features Overview

Complete guide to all features available in the Web Audit Suite.

## Table of Contents

- [Core Analysis Features](#core-analysis-features)
- [Enhanced Reporting Features](#enhanced-reporting-features)
- [Configuration Features](#configuration-features)
- [Integration Features](#integration-features)

## Core Analysis Features

### SEO Analysis

Comprehensive SEO metrics and scoring across multiple dimensions:

- **Title Optimization**: Length, presence, uniqueness
- **Meta Descriptions**: Length, presence, quality
- **Heading Structure**: H1-H6 hierarchy and organization
- **Content Analysis**: Word count, readability, keyword density
- **Link Structure**: Internal and external link quality
- **Structured Data**: Schema.org JSON-LD detection and validation
- **Social Tags**: Open Graph and Twitter Card detection
- **Technical SEO**: URL structure, canonicalization, redirects

**Reports Generated**:

- `seo_report.csv` - Page-level SEO metrics
- `seo_scores.csv` - Detailed SEO scoring

### Performance Analysis

Core Web Vitals and performance metrics:

- **Load Time**: Page load completion time
- **First Paint (FP)**: Time to first pixel render
- **First Contentful Paint (FCP)**: Time to first content render
- **Largest Contentful Paint (LCP)**: Time to largest content element
- **Time to Interactive (TTI)**: Time until page is fully interactive
- **Total Blocking Time (TBT)**: Sum of blocking time
- **Cumulative Layout Shift (CLS)**: Visual stability metric

**Thresholds**:

- Excellent: LCP < 2500ms, FCP < 1500ms, CLS < 0.1
- Good: LCP < 4000ms, FCP < 2500ms, CLS < 0.25
- Needs Improvement: Above good thresholds

**Reports Generated**:

- `performance_analysis.csv` - Detailed performance metrics

### Accessibility Testing

WCAG 2.1 compliance testing with Pa11y integration:

- **Compliance Levels**: A, AA, AAA
- **Issue Categorization**: Error, Warning, Notice
- **Severity Classification**: Critical, Serious, Moderate, Minor
- **WCAG Guidelines**: All Principles (Perceivable, Operable, Understandable, Robust)
- **Remediation Guidance**: Detailed fix suggestions

**Reports Generated**:

- `accessibility_report.csv` - Structured accessibility data
- `wcag_report.md` - Human-readable accessibility report with remediation guidance

### Security Analysis

Security headers and HTTPS configuration analysis:

- **HTTPS Detection**: Protocol validation
- **HSTS**: HTTP Strict Transport Security
- **CSP**: Content Security Policy
- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME type sniffing protection
- **Referrer-Policy**: Referrer information control

**Reports Generated**:

- `security_report.csv` - Security headers analysis

### Content Quality Analysis

Content structure and quality metrics:

- **Word Count**: Content length analysis
- **Heading Count**: H1-H6 distribution
- **Paragraph Count**: Content structure
- **List Usage**: Ordered and unordered lists
- **Media Richness**: Image and video presence
- **Content Freshness**: Last modified dates

**Reports Generated**:

- `content_quality.csv` - Content metrics

### Image Analysis

Image optimization and alt text analysis:

- **Image Count**: Total images per page
- **Alt Text Coverage**: Images with/without alt attributes
- **Alt Text Quality**: Descriptive vs generic alt text
- **Image Sizes**: File size analysis
- **Format Detection**: Image format identification
- **Loading Performance**: Image load time impact

**Reports Generated**:

- `image_optimization.csv` - Image analysis and optimization recommendations

### Link Analysis

Internal and external link structure:

- **Internal Links**: Count and quality
- **External Links**: Count and domains
- **Broken Links**: Detection of 404s and errors
- **Link Text Quality**: Descriptive vs generic
- **Navigation Structure**: Site hierarchy analysis

**Reports Generated**:

- `link_analysis.csv` - Link structure and quality

### LLM Suitability Analysis

AI agent compatibility analysis based on "The Invisible Users" patterns:

#### Two HTML States

1. **Served HTML** (Static) - For all agents
   - Semantic HTML structure
   - Heading hierarchy validation (h1 → h2 → h3 progression)
   - Form field naming conventions
   - Schema.org structured data
   - llms.txt file presence
   - HTTP status codes
   - Security headers
   - Social media meta tags (Open Graph, Twitter Card)
   - SEO meta tags (robots, keywords, theme-color)
   - Reading time metadata (timeRequired, educationalLevel)
   - Pre-rendering detection (Next.js, Nuxt.js, prerender.io)
   - PDF content accessibility (HTML alternatives)
   - SSR framework implementation (Next.js, Nuxt.js with content)

2. **Rendered HTML** (Dynamic) - For browser agents
   - Explicit state attributes
   - Agent visibility control
   - Persistent error messages
   - Dynamic validation feedback
   - Dynamic content patterns (carousels, animations, autoplay media)

#### Dynamic Content Detection

Detects timing-dependent UI patterns that confuse AI agents:

- **Carousels**: Distinguishes informational (product showcases, testimonials) vs decorative (hero banners)
  - Detects proper data attributes (data-slide-index, data-total-slides)
  - Checks for accessibility (aria-label on slides)
  - Validates static alternatives availability

- **Animations**: Identifies animation libraries and patterns
  - Typewriter effects (Typed.js, TypeIt)
  - Complex animations (GSAP, AOS, Animate.css)
  - CSS animations and keyframes
  - Animation control availability

- **Autoplay Media**: WCAG 2.2.2 compliance
  - Detects autoplay videos and audio
  - Validates pause controls presence
  - Checks muted state

- **Animated GIFs**: Accessibility validation
  - Counts animated GIF usage
  - Validates alt text presence
  - Checks for aria-describedby descriptions

#### Priority 1 Patterns (Critical)

These patterns have the highest impact on AI agent compatibility:

- **Heading Hierarchy Validation**: Logical heading progression
  - Validates h1 → h2 → h3 sequence (no level skipping)
  - Detects multiple h1 headings
  - Ensures single h1 per page for clear document outline
  - Awards +10 points for perfect hierarchy
  - Applies −5 points per heading level jump
  - Source: "Don't Make AI Think" Chapter 3

- **Pre-rendering Detection**: SPA framework SSR implementation
  - Detects Next.js (`#__NEXT_DATA__` or `_next/static`)
  - Detects Nuxt.js (`#__NUXT__` or `_nuxt`)
  - Validates content exists in served HTML
  - Awards +20 points for pre-rendered SPA content
  - Applies −20 points for empty SPA root
  - Source: "Don't Make AI Think" Chapter 7

- **PDF Content Accessibility**: HTML alternatives for PDFs
  - Identifies PDF-only content (inaccessible to agents)
  - Validates HTML alternatives exist
  - Awards +10 points for PDF + HTML option
  - Applies −20 points per PDF without alternative
  - Source: "Don't Make AI Think" Chapter 9

- **SSR Framework Implementation**: Next.js/Nuxt.js with content
  - Validates SSR framework is rendering content
  - Checks `<main>` element has children
  - Awards +20 points for SSR with content
  - Applies −20 points for SSR without content
  - Source: "Don't Make AI Think" Chapter 10

#### Priority 2 Patterns (Important)

These patterns have medium-high impact on AI agent compatibility:

- **DOM Order Problems**: Content order in DOM vs visual layout
  - Detects sidebar/navigation appearing before main content
  - Awards +5 points if main appears first
  - Applies −10 points if sidebar before main
  - Source: "Don't Make AI Think" Chapter 2

- **Pricing Tables with Schema**: Pricing grids with Schema.org Product
  - Validates pricing tables have Product/Offer markup
  - Awards +15 points for pricing with Schema.org
  - Applies −10 points for pricing without markup
  - Source: "Don't Make AI Think" Chapter 3

- **Product Variants**: Multiple offers for size/color options
  - Detects Product schema with offers array
  - Awards +10 points for variant offers
  - Source: "Don't Make AI Think" Chapter 5

- **AJAX Navigation**: Real URLs with progressive enhancement
  - Validates AJAX links use real URLs, not hash-based
  - Awards +10 points for AJAX with real URLs
  - Applies −10 points for hash-based SPA routing
  - Source: "Don't Make AI Think" Chapter 7

- **Table Abuse Detection**: Tables for data, not layout
  - Identifies tables used for layout (missing thead/tbody/th)
  - Applies −15 points per layout table
  - Awards +5 points for proper data tables
  - Source: "Don't Make AI Think" Chapter 9

- **Content in Iframes**: HTML alternatives for embedded content
  - Detects iframes without text alternatives
  - Awards +5 points for iframe with alternative
  - Applies −10 points per iframe without alternative
  - Source: "Don't Make AI Think" Chapter 9

#### Priority 3 Patterns (Nice to Have)

These patterns provide incremental improvements:

- **Definition Lists**: Using dl/dt/dd for product specifications
  - Detects definition lists in product contexts
  - Awards +5 points for progressive pattern
  - Source: "Don't Make AI Think" Chapter 3

- **Skeleton Content**: Meaningful placeholders during loading
  - Validates loading states have visible content
  - Awards +5 points for skeleton content
  - Applies −5 points for empty loading containers
  - Source: "Don't Make AI Think" Chapter 7

- **Progressive Enhancement Accordion**: Native details/summary elements
  - Detects use of HTML5 disclosure widgets
  - Awards +5 points for progressive accordion
  - Source: "Don't Make AI Think" Chapter 10

#### Priority 4 Patterns (Edge Cases)

These patterns apply to specific use cases:

- **Multiple Authors**: Article schema with author array
  - Validates Article schema supports multiple authors
  - Awards +3 points for multi-author support
  - Source: "Don't Make AI Think" Chapter 5

- **Content Separation**: Static product info + dynamic user context
  - Validates separation of public/private content
  - Awards +5 points for clear separation
  - Source: "Don't Make AI Think" Chapter 7

#### Scoring Categories

- **ESSENTIAL_SERVED** (230+ points max): Critical for all agents
  - **Priority 1** (60 points): Heading hierarchy (10), Pre-rendering (20), PDF content (10), SSR frameworks (20)
  - **Priority 2** (60 points): DOM order (5), Pricing tables (15), Product variants (10), AJAX navigation (10), Table abuse (5), Iframe content (5)
  - **Core patterns** (110 points): Semantic HTML (20), Form fields (25), Structured data (15), FAQ schema (13), llms.txt (10), Social media meta (20), SEO meta (5), Reading time (10), Tables (10), robots.txt (5)
  - **Priority 3** (15 points): Definition lists (5), Skeleton content (5), Progressive enhancement (5)
  - **Priority 4** (8 points): Multiple authors (3), Content separation (5)
- **ESSENTIAL_RENDERED** (30 points max): Critical for browser agents
  - Data attributes: 15 points (hasDataState, hasValidationState, hasLoadingIndicators)
  - Error handling: 15 points (hasPersistentErrors, hasAriaInvalid)
  - Dynamic content penalties: varies (carousels, autoplay, animations, pricing)
- **NICE_TO_HAVE** (bonus points): Helpful but not critical
  - Bot protection awareness, API discoverability, table enhancements

**Reports Generated**:

- `llm_general_suitability.csv` - Overall AI agent compatibility
- `llm_frontend_suitability.csv` - Frontend-specific patterns
- `llm_backend_suitability.csv` - Backend/server-side patterns

## Enhanced Reporting Features

### Historical Comparison

Track website changes over time with comparative analysis.

**Enable with**: `--enable-history`

**Features**:

- Stores timestamped results in `history/` directory
- Compares current run with previous runs
- Calculates percentage changes for all metrics
- Identifies improvements and regressions
- Generates trend data for visualization

**Use Cases**:

- Track performance improvements over time
- Monitor accessibility compliance trends
- Measure impact of SEO optimizations
- Validate deployment changes

### Executive Summary

Single-page overview with key insights and actionable recommendations.

**Enable with**: `--generate-executive-summary`

**Features**:

- Overall status across all categories (Performance, Accessibility, SEO, LLM)
- Key findings highlighting critical issues
- Actionable recommendations prioritized by severity
- Pass/fail status based on configurable thresholds
- Comparison with previous run (when history enabled)
- Both Markdown and JSON formats

**Output Files**:

- `executive_summary.md` - Human-readable format
- `executive_summary.json` - Machine-readable format for automation

**Use Cases**:

- Quick status overview for stakeholders
- CI/CD quality gate decisions
- Management reporting
- Automated quality checks

### Interactive Dashboard

HTML dashboard with visual analytics and embedded charts.

**Enable with**: `--generate-dashboard`

**Features**:

- **Performance Charts**: Bar charts for load time, LCP, FCP, TTI
- **Accessibility Charts**: Pie chart for issue breakdown
- **SEO Charts**: Distribution chart for score ranges
- **Content Charts**: Bar charts for content metrics
- **LLM Charts**: Comparison of served vs rendered scores
- **Trend Charts**: Line charts showing historical trends (when history enabled)
- **Comparison Tables**: Changes between runs
- **Pass/Fail Tables**: Color-coded status summaries

**Output File**:

- `dashboard.html` - Self-contained HTML file with embedded PNG charts

**Use Cases**:

- Visual presentations
- Team collaboration
- Trend visualization
- Progress tracking

### Configurable Thresholds

Customize pass/fail criteria for all metrics.

**Enable with**: `--thresholds <file>`

**Supported Categories**:

- **Performance**: Load time, LCP, FCP, CLS, TTI
- **Accessibility**: Max errors, max warnings, max total issues
- **SEO**: Min score, title length, meta description length
- **Content**: Min word count, min headings
- **LLM**: Min served score, min rendered score

**Threshold Levels**:

- **Pass**: Meets excellent standards
- **Warn**: Needs attention but not critical

**Example Configuration**:

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

**Use Cases**:

- Custom quality standards for different projects
- Stricter criteria for production sites
- Relaxed criteria for development environments
- Industry-specific compliance requirements

## Configuration Features

### Constants System

Centralized constants for all magic numbers and configuration values.

**Location**: `src/config/defaults.js`

**Categories**:

- HTTP status codes
- Timeouts and retry configuration
- Performance thresholds
- SEO limits
- LLM scoring values
- Colors and styling
- File names and paths
- Regex patterns

**Benefits**:

- Single source of truth
- Easy to modify thresholds
- Clear documentation of values
- Prevents magic number proliferation

### Configuration Validation

Type-safe configuration with schema validation.

**Location**: `src/config/validation.js`

**Features**:

- Type checking (string, number, boolean, object)
- Range validation (min/max values)
- Format validation (URLs, paths)
- Custom validation functions
- Threshold consistency checks
- Input sanitization
- Clear error messages

**Validates**:

- CLI options
- Environment variables
- Threshold configurations
- All user inputs

### Environment Variable Support

Flexible configuration via environment variables.

**Location**: `src/config/env.js`

**Supported Variables**:

- `NODE_ENV` - Application environment
- `LOG_LEVEL` - Logging verbosity
- `OUTPUT_DIR` - Output directory
- `SITEMAP_URL` - Default sitemap URL
- `CACHE_DIR` - Cache directory
- `MAX_RETRIES` - Maximum retry attempts
- `TIMEOUT` - Default timeout

### Rate Limiting

Configurable request throttling to respect server limits and avoid IP bans.

**Features**:

- **Token Bucket Algorithm**: Standard `limiter` implementation
- **Configurable Rate**: Requests per interval (second/minute/hour/day)
- **Environment Control**: `RATE_LIMIT_TOKENS` and `RATE_LIMIT_INTERVAL`
- **Global Application**: Applies to all network requests (sitemap fetching, crawling, assets)
- **Disable Option**: Can be disabled for testing or internal networks

**Configuration**:

```bash
RATE_LIMIT_TOKENS=1
RATE_LIMIT_INTERVAL=second
```

**Configuration Priority**:

1. CLI flags (highest)
2. Environment variables (medium)
3. Default values (lowest)

**`.env` File Support**:

```bash
NODE_ENV=production
LOG_LEVEL=info
OUTPUT_DIR=production-results
MAX_RETRIES=5
```

**Use Cases**:

- Docker deployments
- CI/CD pipelines
- Multi-environment setups
- Configuration management

### Comprehensive Documentation

Complete configuration reference and guides.

**Documentation Files**:

- `docs/CONFIGURATION.md` - Complete configuration guide
  - All CLI options with examples
  - Environment variable reference
  - Threshold configuration schema
  - Constants reference tables
  - Best practices
  - CI/CD examples
  - Docker deployment examples

- `README.md` - Quick start and overview
- `CLAUDE.md` - Developer guidance
- `docs/usermanual.md` - User-facing documentation

## Integration Features

### CI/CD Integration

Perfect for automated quality checks:

**Exit Codes**:

- `0` - Success
- `1` - Failure (validation errors, processing errors)

**Example CI Script**:

```bash
#!/bin/bash
export NODE_ENV=production
export LOG_LEVEL=warn

npm start -- \
  -s $SITEMAP_URL \
  --generate-executive-summary \
  --thresholds ./ci-thresholds.json

if [ $? -ne 0 ]; then
  echo "Audit failed"
  exit 1
fi

# Parse results and fail if critical issues
node scripts/check-results.js results/executive_summary.json
```

### Docker Support

Container-ready with environment variable configuration:

**Dockerfile Example**:

```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV OUTPUT_DIR=/app/results

CMD ["npm", "start"]
```

**Run in Docker**:

```bash
docker run -v $(pwd)/results:/app/results \
  -e SITEMAP_URL=https://example.com/sitemap.xml \
  -e GENERATE_DASHBOARD=true \
  web-audit-suite
```

### JSON Output

Machine-readable formats for automation:

- `results.json` - Complete raw data
- `summary.json` - High-level metrics
- `executive_summary.json` - Executive summary
- `history/results-*.json` - Historical data

**Use Cases**:

- Automated quality checks
- Data pipeline integration
- Custom reporting tools
- Trend analysis

### Language Variant Filtering

Control which language variants to analyze:

**Default Behavior**: Only process `/en` and `/us` URLs

**Override with**: `--include-all-languages`

**Benefits**:

- Avoids duplicate content analysis
- Faster processing times
- More focused reports
- Cost savings for multilingual sites

### Resume Capability

Resume interrupted analyses:

**How it Works**:

- Detects existing `results.json`
- Skips data collection phase
- Regenerates reports from cached data

**Use Cases**:

- Report regeneration with different thresholds
- Recovery from interruptions
- Testing report layouts

### Caching System

Improve performance with intelligent caching:

**Cache Locations**:

- `.cache/rendered/` - Rendered HTML cache
- `.cache/served/` - Served HTML cache

**Cache Options**:

- `--cache-only` - Use only cached data
- `--no-cache` - Disable caching
- `--force-delete-cache` - Clear cache before starting

**Cache TTL**: 15 minutes self-cleaning

## Feature Combinations

### Recommended Combinations

#### Development Workflow

```bash
# Quick test with 10 URLs
npm start -- -s https://example.com/sitemap.xml -c 10

# Full analysis with dashboard
npm start -- -s https://example.com/sitemap.xml --generate-dashboard
```

#### Production Monitoring

```bash
npm start -- \
  -s https://production.example.com/sitemap.xml \
  --enable-history \
  --generate-dashboard \
  --generate-executive-summary \
  --thresholds ./production-thresholds.json
```

#### CI/CD Quality Gate

```bash
npm start -- \
  -s $SITEMAP_URL \
  --generate-executive-summary \
  --thresholds ./ci-thresholds.json \
  --no-recursive \
  --log-level warn
```

#### Custom Quality Standards

```bash
npm start -- \
  -s https://example.com/sitemap.xml \
  --thresholds ./strict-thresholds.json \
  --generate-dashboard \
  --enable-history
```

## Feature Roadmap

Future features under consideration:

- Lighthouse integration
- Visual regression testing
- Progressive Web App analysis
- Mobile-specific testing
- Custom plugin system
- API endpoint for remote execution
- Real-time monitoring mode
- Scheduled analysis
- Alert system for threshold violations
- Multi-site comparison
