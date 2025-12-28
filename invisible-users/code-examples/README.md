# AI-Native Website Code Examples

This directory contains platform-specific code examples for implementing the patterns described in "The Complete Guide to Building an AI-Native Website" (AI-Native.blog).

## Directory Structure

```text
code-examples/
├── apache/           # Apache .htaccess configurations
├── nginx/            # Nginx configuration files
├── nextjs/           # Next.js implementations
├── wordpress/        # WordPress PHP functions
├── eds/              # Adobe Edge Delivery Services
├── static-site/      # Static site generators (Hugo, Jekyll, Gatsby)
├── html-examples/    # HTML patterns for AI-native design
├── validation/       # Health check scripts
└── monitoring/       # Analytics and log analysis
```

## Quick Start

### 1. Apache

Copy `.htaccess` to your website root:

```bash
cp apache/.htaccess /var/www/html/.htaccess
```

### 2. Nginx

Include configuration in your nginx.conf:

```nginx
include /path/to/code-examples/nginx/ai-headers.conf;
```

### 3. Next.js

Copy configuration to your project:

```bash
cp nextjs/next.config.js your-project/
cp nextjs/AIHandshake.jsx your-project/components/
```

### 4. WordPress

Add functions to your theme's `functions.php`:

```bash
cat wordpress/functions-headers.php >> your-theme/functions.php
cat wordpress/generate-query-index.php >> your-theme/functions.php
```

### 5. EDS (Adobe Edge Delivery Services)

Copy to your repository root:

```bash
cp eds/helix-query.yaml your-repo/helix-query.yaml
```

### 6. Static Site Generators

Run the index generator:

```bash
node static-site/generate-index.js
```

### 7. HTML Examples

Browse production-ready HTML patterns:

```bash
# View the HTML examples directory
ls html-examples/

# Open specific examples
open html-examples/forms/validation-form.html
open html-examples/ecommerce/product-page.html
```

The `html-examples/` directory contains complete HTML patterns organized by category (forms, state, ecommerce, navigation, structured-data, components). Each example demonstrates AI-native design principles with proper semantic HTML, data attributes, and accessibility features.

## Validation Scripts

### Simple Health Check

Quick verification that manifest files are accessible:

```bash
node validation/verify-ai-simple.js
```

### Production Health Check

Comprehensive validation with content checks:

```bash
node validation/verify-ai-production.js
```

### CI/CD Integration

Copy GitHub Actions workflow:

```bash
mkdir -p .github/workflows
cp validation/github-actions.yml .github/workflows/ai-health-check.yml
```

## Monitoring

### Analytics Tracking

Add to your JavaScript bundle:

```javascript
import { trackAIVisit } from './monitoring/analytics-tracking.js';
trackAIVisit();
```

### Server Log Analysis

Analyze Apache/Nginx logs for AI bot traffic:

```bash
./monitoring/server-log-analysis.sh /var/log/nginx/access.log
```

## Configuration

Before using any code example, update these placeholders:

- `yoursite.com` → Your actual domain
- `your-category` → Your blog/content category
- `Your Company Name` → Your organization name
- `your@email.com` → Your contact email

## Fixes Applied

All code examples include fixes for issues identified in the review:

- ✅ WordPress: Uses `posts_per_page` instead of deprecated `numberposts`
- ✅ Nginx: Fixed rate limiting syntax (uses `map` directive)
- ✅ AI agents: Updated user-agent list for 2025 (includes DeepSeek-Bot, Gemini-Bot)
- ✅ Validation: Simplified and production versions provided

## Standards Status

**Note:** These code examples implement both **established standards** (Schema.org, llms.txt) and **proposed patterns** (OASF, ai-agents.md). See AI-Native.blog for maturity labels.

## Support

For questions or issues:

- Read the full guide: `invisible-users/AI-Native.blog`
- Check the book manuscript: `invisible-users/chapter-*.md`
- Contact: Tom Cranstoun, Digital Domain Technologies

## License

Creative Commons BY-SA 4.0 (Attribution-ShareAlike)

Attribution: "AI-Native Website Code Examples by Digital Domain Technologies (allabout.network)"
