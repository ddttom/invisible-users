/**
 * Schema.org Validation Module
 * Validates JSON-LD structured data against Schema.org requirements
 */

/**
 * Critical properties that should be present on most schema types
 * @deprecated Currently unused but kept for future validation enhancements
 */
// const CRITICAL_PROPERTIES = {
//   common: ['@context', '@type'],
//   temporal: ['datePublished', 'dateModified'],
//   visual: ['image'],
//   localization: ['inLanguage'],
// };

/**
 * Required properties by schema type
 */
const REQUIRED_PROPERTIES = {
  Product: ['name', 'offers'],
  Book: ['name', 'author', 'bookFormat'],
  Article: ['headline', 'author', 'datePublished'],
  WebSite: ['name', 'url'],
  WebPage: ['name'],
  Person: ['name'],
  Organization: ['name'],
  Service: ['name', 'provider'],
  Event: ['name', 'startDate', 'location'],
  LocalBusiness: ['name', 'address'],
  Restaurant: ['name', 'address'],
  FAQPage: ['mainEntity'],
  BreadcrumbList: ['itemListElement'],
  Offer: ['price', 'priceCurrency'],
  Question: ['name', 'acceptedAnswer'],
  Answer: ['text'],
};

/**
 * Recommended properties by schema type
 */
const RECOMMENDED_PROPERTIES = {
  Product: ['image', 'description', 'sku', 'brand', 'aggregateRating'],
  Book: ['isbn', 'numberOfPages', 'publisher', 'datePublished'],
  Article: ['image', 'publisher', 'dateModified'],
  WebSite: ['image', 'datePublished', 'author', 'publisher'],
  Service: ['image', 'areaServed', 'offers'],
  Event: ['image', 'offers', 'endDate'],
  LocalBusiness: ['telephone', 'openingHours', 'priceRange'],
  Offer: ['availability', 'seller', 'itemCondition', 'url'],
  BreadcrumbList: [], // Position, name, item are already required in itemListElement
};

/**
 * Extract all JSON-LD scripts from page
 * @param {Page} page - Puppeteer page object
 * @returns {Promise<Array>} Array of parsed JSON-LD objects
 */
async function extractJsonLd(page) {
  try {
    const scripts = await page.$$eval('script[type="application/ld+json"]', (elements) => elements.map((el) => {
      try {
        return JSON.parse(el.textContent);
      } catch (e) {
        return { error: 'Parse error', content: el.textContent };
      }
    }));
    return scripts;
  } catch (error) {
    return [];
  }
}

/**
 * Normalize @type to array format
 * @param {string|Array} type - Schema.org type(s)
 * @returns {Array} Array of types
 */
function normalizeType(type) {
  if (Array.isArray(type)) return type;
  return [type];
}

/**
 * Validate a single schema object
 * @param {Object} schema - Parsed JSON-LD object
 * @returns {Object} Validation result with issues
 */
function validateSchema(schema) {
  const issues = [];
  const warnings = [];

  // Skip if parse error
  if (schema.error) {
    return {
      valid: false,
      type: 'Unknown',
      issues: [{ severity: 'error', message: 'JSON-LD parse error', property: '@context' }],
      warnings: [],
    };
  }

  // Check for @context
  if (!schema['@context']) {
    issues.push({ severity: 'error', message: 'Missing @context', property: '@context' });
  }

  // Check for @type
  if (!schema['@type']) {
    issues.push({ severity: 'error', message: 'Missing @type', property: '@type' });
    return {
      valid: false, type: 'Unknown', issues, warnings,
    };
  }

  const types = normalizeType(schema['@type']);
  const primaryType = types[0];

  // Validate required properties
  const requiredProps = REQUIRED_PROPERTIES[primaryType] || [];
  requiredProps.forEach((prop) => {
    if (!schema[prop]) {
      issues.push({
        severity: 'error',
        message: `Missing required property: ${prop}`,
        property: prop,
        type: primaryType,
      });
    }
  });

  // Check recommended properties
  const recommendedProps = RECOMMENDED_PROPERTIES[primaryType] || [];
  recommendedProps.forEach((prop) => {
    if (!schema[prop]) {
      warnings.push({
        severity: 'warning',
        message: `Missing recommended property: ${prop}`,
        property: prop,
        type: primaryType,
      });
    }
  });

  // Check critical common properties
  if (!schema.image && primaryType !== 'BreadcrumbList' && primaryType !== 'Offer') {
    warnings.push({
      severity: 'warning',
      message: 'Missing image property',
      property: 'image',
      type: primaryType,
    });
  }

  // Validate Offer objects if present
  if (schema.offers) {
    const offerValidation = validateOffer(schema.offers, primaryType);
    issues.push(...offerValidation.issues);
    warnings.push(...offerValidation.warnings);
  }

  // Validate BreadcrumbList structure
  if (primaryType === 'BreadcrumbList') {
    const breadcrumbValidation = validateBreadcrumbList(schema);
    issues.push(...breadcrumbValidation.issues);
    warnings.push(...breadcrumbValidation.warnings);
  }

  return {
    valid: issues.length === 0,
    type: types.join(', '),
    issues,
    warnings,
    schema,
  };
}

/**
 * Validate Offer object
 * @param {Object|Array} offers - Offer object(s)
 * @param {string} parentType - Parent schema type
 * @returns {Object} Validation results
 */
function validateOffer(offers, parentType) {
  const issues = [];
  const warnings = [];

  const offerArray = Array.isArray(offers) ? offers : [offers];

  offerArray.forEach((offer, index) => {
    if (!offer['@type'] || offer['@type'] !== 'Offer') {
      issues.push({
        severity: 'error',
        message: `Offer ${index + 1}: Missing or incorrect @type`,
        property: 'offers',
        type: parentType,
      });
    }

    // Required Offer properties
    if (!offer.price && offer.price !== 0) {
      issues.push({
        severity: 'error',
        message: `Offer ${index + 1}: Missing price`,
        property: 'offers.price',
        type: parentType,
      });
    }

    if (!offer.priceCurrency) {
      issues.push({
        severity: 'error',
        message: `Offer ${index + 1}: Missing priceCurrency`,
        property: 'offers.priceCurrency',
        type: parentType,
      });
    }

    // Recommended Offer properties
    if (!offer.availability) {
      warnings.push({
        severity: 'warning',
        message: `Offer ${index + 1}: Missing availability`,
        property: 'offers.availability',
        type: parentType,
      });
    }

    if (!offer.seller) {
      warnings.push({
        severity: 'warning',
        message: `Offer ${index + 1}: Missing seller`,
        property: 'offers.seller',
        type: parentType,
      });
    }

    if (!offer.itemCondition) {
      warnings.push({
        severity: 'warning',
        message: `Offer ${index + 1}: Missing itemCondition`,
        property: 'offers.itemCondition',
        type: parentType,
      });
    }
  });

  return { issues, warnings };
}

/**
 * Validate BreadcrumbList structure
 * @param {Object} schema - BreadcrumbList schema
 * @returns {Object} Validation results
 */
function validateBreadcrumbList(schema) {
  const issues = [];
  const warnings = [];

  if (!Array.isArray(schema.itemListElement)) {
    issues.push({
      severity: 'error',
      message: 'itemListElement must be an array',
      property: 'itemListElement',
      type: 'BreadcrumbList',
    });
    return { issues, warnings };
  }

  schema.itemListElement.forEach((item, index) => {
    if (item['@type'] !== 'ListItem') {
      issues.push({
        severity: 'error',
        message: `Item ${index + 1}: @type must be "ListItem"`,
        property: `itemListElement[${index}]`,
        type: 'BreadcrumbList',
      });
    }

    if (typeof item.position !== 'number' || item.position !== index + 1) {
      issues.push({
        severity: 'error',
        message: `Item ${index + 1}: position must be ${index + 1}`,
        property: `itemListElement[${index}].position`,
        type: 'BreadcrumbList',
      });
    }

    if (!item.name) {
      issues.push({
        severity: 'error',
        message: `Item ${index + 1}: Missing name`,
        property: `itemListElement[${index}].name`,
        type: 'BreadcrumbList',
      });
    }

    if (!item.item) {
      issues.push({
        severity: 'error',
        message: `Item ${index + 1}: Missing item URL`,
        property: `itemListElement[${index}].item`,
        type: 'BreadcrumbList',
      });
    }
  });

  return { issues, warnings };
}

/**
 * Analyze all schemas on a page
 * @param {Page} page - Puppeteer page object
 * @param {string} url - Page URL
 * @returns {Promise<Object>} Analysis results
 */
async function analyzeSchemas(page, url) {
  const schemas = await extractJsonLd(page);

  if (schemas.length === 0) {
    return {
      url,
      hasSchemas: false,
      schemaCount: 0,
      validSchemas: 0,
      invalidSchemas: 0,
      totalIssues: 0,
      totalWarnings: 0,
      schemas: [],
      summary: 'No Schema.org JSON-LD found on page',
    };
  }

  const validationResults = schemas.map((schema) => validateSchema(schema));

  const validCount = validationResults.filter((r) => r.valid).length;
  const totalIssues = validationResults.reduce((sum, r) => sum + r.issues.length, 0);
  const totalWarnings = validationResults.reduce((sum, r) => sum + r.warnings.length, 0);

  return {
    url,
    hasSchemas: true,
    schemaCount: schemas.length,
    validSchemas: validCount,
    invalidSchemas: schemas.length - validCount,
    totalIssues,
    totalWarnings,
    schemas: validationResults,
    summary: `Found ${schemas.length} schema(s): ${validCount} valid, ${schemas.length - validCount} invalid, ${totalIssues} issues, ${totalWarnings} warnings`,
  };
}

module.exports = {
  extractJsonLd,
  validateSchema,
  analyzeSchemas,
  REQUIRED_PROPERTIES,
  RECOMMENDED_PROPERTIES,
};
