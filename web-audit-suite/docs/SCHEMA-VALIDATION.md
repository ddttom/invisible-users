# Schema.org Validation Feature

The Web Audit Suite now includes comprehensive Schema.org validation and page type detection capabilities.

## Overview

This feature analyzes JSON-LD structured data on websites and validates it against Schema.org requirements, helping you ensure your pages are properly marked up for search engines and AI agents.

## Features

### 1. Schema.org Validation

Validates all JSON-LD scripts on each page against Schema.org requirements:

- **Required Properties:** Checks for mandatory properties per schema type
- **Recommended Properties:** Identifies missing recommended properties
- **Offer Validation:** Validates Offer objects for e-commerce pages
- **BreadcrumbList Validation:** Ensures proper navigation hierarchy
- **Multi-type Support:** Handles schemas with multiple types (e.g., `["Product", "Book"]`)

### 2. Page Type Detection

Automatically detects page types based on Schema.org markup:

- E-commerce Product
- E-commerce Collection
- E-commerce Checkout
- Book/Publication
- Article/Blog Post
- Local Business
- Event Page
- FAQ Page
- Service Page
- Home Page
- General Page

### 3. Comprehensive Reports

Generates 5 detailed reports:

1. **schema-validation.csv** - Overview of schemas found on each page
2. **schema-issues.csv** - Detailed list of all validation issues and warnings
3. **page-types.csv** - Page type classification for each URL
4. **page-type-stats.csv** - Statistics grouped by page type
5. **schema-summary.md** - Human-readable markdown summary

## Usage

### Basic Usage

Run the audit with default settings:

```bash
npm run audit:start -- -s https://example.com
```

Schema.org validation runs automatically as part of the standard audit process.

### Integration Points

The Schema.org validation integrates with the existing pipeline:

1. **Data Collection Phase:** Extracts and validates JSON-LD during page analysis
2. **Report Generation Phase:** Creates Schema.org-specific reports
3. **LLM Metrics:** Schema presence counts toward AI agent compatibility scores

## Validation Rules

### Required Properties by Type

**Product:**
- name
- offers (with price, priceCurrency)

**Book:**
- name
- author
- bookFormat

**Article:**
- headline
- author
- datePublished

**BreadcrumbList:**
- itemListElement (array of ListItem with position, name, item)

**Offer:**
- price
- priceCurrency

### Recommended Properties

**All Types:**
- image
- datePublished
- dateModified
- inLanguage

**Product:**
- description
- sku
- brand
- aggregateRating

**Offer:**
- availability
- seller
- itemCondition
- validFrom
- priceValidUntil

## Report Formats

### schema-validation.csv

Summary view of Schema.org implementation:

```csv
URL,Has Schemas,Schema Count,Valid Schemas,Invalid Schemas,Total Issues,Total Warnings,Schema Types,Summary
"https://example.com/product/123",Yes,2,1,1,3,2,"Product, BreadcrumbList","Found 2 schemas: 1 valid, 1 invalid"
```

### schema-issues.csv

Detailed issue tracking:

```csv
URL,Schema Type,Schema Index,Severity,Issue Type,Property,Message
"https://example.com/product/123",Product,1,Error,Validation,offers.seller,"Missing seller property"
"https://example.com/product/123",Product,1,Warning,Recommendation,image,"Missing image property"
```

### page-types.csv

Page classification:

```csv
URL,Primary Type,All Types,Schema Types,Confidence,Source,Has Multiple Types
"https://example.com/product/123","E-commerce Product","E-commerce Product","Product, BreadcrumbList",high,schema,Yes
```

### page-type-stats.csv

Aggregated statistics:

```csv
Page Type,Count,Total Schemas,Total Issues,Total Warnings,Schema Types Used,Example URLs
"E-commerce Product",45,90,12,23,"Product, Offer, BreadcrumbList","https://example.com/product/123; ..."
```

### schema-summary.md

Human-readable summary with:
- Overall statistics
- Page type distribution
- Most common issues
- Actionable recommendations
- List of pages without schemas

## Modules

### schemaValidator.js

Core validation logic:

```javascript
const { analyzeSchemas, validateSchema } = require('./utils/schemaValidator.js');

// Analyze all schemas on a page
const results = await analyzeSchemas(page, url);

// Validate a single schema
const validation = validateSchema(jsonLdObject);
```

### pageTypeDetector.js

Page type classification:

```javascript
const { detectPageType, analyzePageType } = require('./utils/pageTypeDetector.js');

// Detect page type from schemas
const pageType = detectPageType(schemasArray);

// Enhanced detection with URL hints
const enhanced = analyzePageType(schemasArray, url);
```

### schemaAnalysis.js

Integration with audit pipeline:

```javascript
const { analyzePageSchemas } = require('./utils/schemaAnalysis.js');

// Analyze schemas during page crawl
const analysis = await analyzePageSchemas(page, url, results, context);
```

### schemaReports.js

Report generation:

```javascript
const { generateAllSchemaReports } = require('./utils/reportUtils/schemaReports.js');

// Generate all Schema.org reports
await generateAllSchemaReports(results, outputDir, context);
```

## Common Issues

### Missing Required Properties

**Issue:** `Missing required property: offers`

**Fix:** Add an Offer object to your Product schema:

```json
{
  "@type": "Product",
  "name": "Example Product",
  "offers": {
    "@type": "Offer",
    "price": "29.99",
    "priceCurrency": "GBP"
  }
}
```

### Missing Recommended Properties

**Warning:** `Missing recommended property: seller`

**Fix:** Enhance your Offer with seller information:

```json
{
  "@type": "Offer",
  "price": "29.99",
  "priceCurrency": "GBP",
  "seller": {
    "@type": "Organization",
    "name": "Your Store"
  },
  "itemCondition": "https://schema.org/NewCondition",
  "availability": "https://schema.org/InStock"
}
```

### BreadcrumbList Validation Errors

**Issue:** `Item 2: position must be 2`

**Fix:** Ensure positions are sequential starting from 1:

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://example.com/products"
    }
  ]
}
```

## Best Practices

### 1. Include Critical Properties

Always add these to every schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "image": "https://example.com/image.jpg",
  "datePublished": "2026-01-11",
  "dateModified": "2026-01-11",
  "inLanguage": "en-GB"
}
```

### 2. Use Multi-type for Books

Combine Product and Book types for commercial publications:

```json
{
  "@type": ["Product", "Book"],
  "name": "Book Title",
  "author": { "@type": "Person", "name": "Author Name" },
  "isbn": "978-1-234567-89-0",
  "offers": { /* ... */ }
}
```

### 3. Add BreadcrumbList to All Pages

Except the homepage, every page should have breadcrumb navigation:

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [ /* ... */ ]
}
```

### 4. Enhance Offer Objects

Don't just provide price - add all recommended properties:

```json
{
  "@type": "Offer",
  "price": "29.99",
  "priceCurrency": "GBP",
  "availability": "https://schema.org/InStock",
  "seller": { "@type": "Organization", "name": "Store" },
  "itemCondition": "https://schema.org/NewCondition",
  "validFrom": "2026-01-01",
  "priceValidUntil": "2026-12-31"
}
```

## Reference

- [Schema.org Documentation](https://schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [The Invisible Users Book - Chapter 10](https://allabout.network/invisible-users/)

## Support

For issues or questions about Schema.org validation:
- Check the [Web Audit Suite documentation](./usermanual.md)
- Review [example implementations](../examples/)
- See [The Invisible Users book](https://allabout.network/invisible-users/) for comprehensive patterns
