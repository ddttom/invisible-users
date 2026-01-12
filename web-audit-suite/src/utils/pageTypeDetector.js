/**
 * Page Type Detection Module
 * Detects page types based on Schema.org JSON-LD structures
 */

/**
 * Page type categories with their associated schema types
 */
const PAGE_TYPE_PATTERNS = {
  'E-commerce Product': ['Product'],
  'E-commerce Collection': ['CollectionPage', 'ItemList'],
  'E-commerce Checkout': ['CheckoutPage', 'Order'],
  'Book/Publication': ['Book'],
  'Article/Blog Post': ['Article', 'BlogPosting', 'NewsArticle'],
  'Local Business': ['LocalBusiness', 'Restaurant', 'Store', 'Hotel'],
  'Event Page': ['Event'],
  'FAQ Page': ['FAQPage'],
  'About Page': ['AboutPage'],
  'Contact Page': ['ContactPage'],
  'Search Results': ['SearchResultsPage'],
  'Profile Page': ['ProfilePage'],
  'Service Page': ['Service'],
  'Home Page': ['WebSite'],
  'General Page': ['WebPage']
};

/**
 * Priority order for determining primary page type
 * (more specific types take precedence)
 */
const TYPE_PRIORITY = [
  'E-commerce Checkout',
  'E-commerce Product',
  'E-commerce Collection',
  'Book/Publication',
  'Article/Blog Post',
  'Event Page',
  'FAQ Page',
  'Local Business',
  'Service Page',
  'About Page',
  'Contact Page',
  'Search Results',
  'Profile Page',
  'Home Page',
  'General Page'
];

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
 * Detect page type from a single schema object
 * @param {Object} schema - Parsed JSON-LD object
 * @returns {string|null} Detected page type or null
 */
function detectTypeFromSchema(schema) {
  if (!schema['@type']) return null;

  const types = normalizeType(schema['@type']);

  // Check each type against patterns
  for (const [pageType, schemaTypes] of Object.entries(PAGE_TYPE_PATTERNS)) {
    for (const type of types) {
      if (schemaTypes.includes(type)) {
        return pageType;
      }
    }
  }

  return null;
}

/**
 * Detect page type from all schemas on a page
 * @param {Array} schemas - Array of parsed JSON-LD objects
 * @returns {Object} Detection results
 */
function detectPageType(schemas) {
  if (!schemas || schemas.length === 0) {
    return {
      primaryType: 'Unknown',
      allTypes: [],
      schemaTypes: [],
      confidence: 'none',
      hasMultipleTypes: false
    };
  }

  const detectedTypes = new Set();
  const schemaTypes = [];

  // Collect all detected types
  schemas.forEach(schema => {
    if (schema.error) return;

    const pageType = detectTypeFromSchema(schema);
    if (pageType) {
      detectedTypes.add(pageType);
    }

    if (schema['@type']) {
      const types = normalizeType(schema['@type']);
      schemaTypes.push(...types);
    }
  });

  const typesArray = Array.from(detectedTypes);

  // If no types detected, default to General Page
  if (typesArray.length === 0) {
    return {
      primaryType: 'General Page',
      allTypes: ['General Page'],
      schemaTypes,
      confidence: 'low',
      hasMultipleTypes: false
    };
  }

  // Determine primary type based on priority
  let primaryType = null;
  for (const priorityType of TYPE_PRIORITY) {
    if (typesArray.includes(priorityType)) {
      primaryType = priorityType;
      break;
    }
  }

  // Determine confidence level
  let confidence = 'high';
  if (typesArray.length > 2) {
    confidence = 'medium';
  } else if (typesArray.length === 0 || primaryType === 'General Page') {
    confidence = 'low';
  }

  return {
    primaryType: primaryType || typesArray[0],
    allTypes: typesArray,
    schemaTypes: [...new Set(schemaTypes)],
    confidence,
    hasMultipleTypes: typesArray.length > 1
  };
}

/**
 * Analyze page type with additional context
 * @param {Array} schemas - Array of parsed JSON-LD objects
 * @param {string} url - Page URL
 * @returns {Object} Enhanced detection results
 */
function analyzePageType(schemas, url) {
  const detection = detectPageType(schemas);

  // Add URL-based hints
  const urlHints = detectTypeFromUrl(url);

  // If no strong schema detection, use URL hints
  if (detection.confidence === 'low' && urlHints) {
    return {
      ...detection,
      primaryType: urlHints,
      allTypes: [urlHints, ...detection.allTypes],
      confidence: 'medium',
      source: 'url-hint'
    };
  }

  return {
    ...detection,
    source: 'schema'
  };
}

/**
 * Detect page type from URL patterns
 * @param {string} url - Page URL
 * @returns {string|null} Guessed page type or null
 */
function detectTypeFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname.toLowerCase();

    // URL pattern matching
    if (path.includes('/product/') || path.includes('/item/')) return 'E-commerce Product';
    if (path.includes('/checkout') || path.includes('/cart')) return 'E-commerce Checkout';
    if (path.includes('/collection/') || path.includes('/category/')) return 'E-commerce Collection';
    if (path.includes('/article/') || path.includes('/blog/') || path.includes('/post/')) return 'Article/Blog Post';
    if (path.includes('/event/')) return 'Event Page';
    if (path.includes('/faq')) return 'FAQ Page';
    if (path.includes('/about')) return 'About Page';
    if (path.includes('/contact')) return 'Contact Page';
    if (path.includes('/search')) return 'Search Results';
    if (path === '/' || path === '/index.html') return 'Home Page';

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Get statistics for page types across multiple pages
 * @param {Array} pageResults - Array of page analysis results
 * @returns {Object} Statistics by page type
 */
function getPageTypeStatistics(pageResults) {
  const stats = {};

  pageResults.forEach(result => {
    const pageType = result.pageType?.primaryType || 'Unknown';

    if (!stats[pageType]) {
      stats[pageType] = {
        count: 0,
        urls: [],
        schemaTypes: new Set(),
        totalSchemas: 0,
        totalIssues: 0,
        totalWarnings: 0
      };
    }

    stats[pageType].count++;
    stats[pageType].urls.push(result.url);

    if (result.schemaValidation) {
      stats[pageType].totalSchemas += result.schemaValidation.schemaCount || 0;
      stats[pageType].totalIssues += result.schemaValidation.totalIssues || 0;
      stats[pageType].totalWarnings += result.schemaValidation.totalWarnings || 0;

      // Collect schema types
      if (result.pageType?.schemaTypes) {
        result.pageType.schemaTypes.forEach(type => {
          stats[pageType].schemaTypes.add(type);
        });
      }
    }
  });

  // Convert Sets to Arrays
  Object.keys(stats).forEach(pageType => {
    stats[pageType].schemaTypes = Array.from(stats[pageType].schemaTypes);
  });

  return stats;
}

module.exports = {
  detectPageType,
  analyzePageType,
  detectTypeFromUrl,
  getPageTypeStatistics,
  PAGE_TYPE_PATTERNS,
  TYPE_PRIORITY
};
