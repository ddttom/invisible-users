# Schema.org Analysis Summary

## Overview

This document summarizes the Schema.org analysis of all 20 HTML pages in the `/web/site/` directory. Each page has a detailed report in `{{filename}}.md`.

**Analysis Date:** 2026-01-11
**Pages Analyzed:** 20
**Total Issues Found:** 150+
**Critical Issues:** 25

---

## Executive Summary

### Overall Assessment

**Strengths:**
- All pages use appropriate Schema.org types
- Good basic implementation with essential properties
- Proper use of nested objects (Person, Organization)
- British English correctly specified where present

**Common Weaknesses:**
1. **Missing Images** (13/20 pages) - Critical for discovery and social sharing
2. **Missing Dates** (18/20 pages) - datePublished/dateModified needed
3. **Incomplete Offers** (5/5 pages) - Missing seller, itemCondition
4. **No Breadcrumbs** (19/20 pages) - Navigation context missing
5. **Limited Enhancement** - Many optional properties unused

---

## Critical Issues by Priority

### High Priority (Immediate Action Recommended)

1. **Add Images to Product/Content Pages**
   - Affects: index.html, sales.html, product.html, blog-post.html, article.html, event.html, team.html
   - Impact: Major reduction in visibility and social sharing
   - Fix: Add `image` property with appropriate URLs

2. **Add datePublished and dateModified**
   - Affects: 18/20 pages
   - Impact: Freshness signals missing, affects search rankings
   - Fix: Add both properties with ISO 8601 dates

3. **Enhance Offer Objects**
   - Affects: sales.html, consulting.html, pricing.html, product.html, checkout.html
   - Impact: E-commerce pages missing critical properties
   - Fix: Add `seller`, `itemCondition`, `validFrom`, `priceValidUntil`

4. **Fix Audience Properties**
   - Affects: sales.html
   - Impact: Improper audience specification
   - Fix: Use proper Audience objects instead of strings

5. **Add mainEntityOfPage**
   - Affects: Most pages
   - Impact: Missing self-reference canonical signal
   - Fix: Add reference to own URL

### Medium Priority (Important Improvements)

1. **Add Breadcrumb Navigation**
   - Affects: 19/20 pages
   - Impact: Missing site hierarchy signals
   - Fix: Add BreadcrumbList with proper structure

2. **Enhance Person/Organization Objects**
   - Add images, social links, detailed properties
   - Improves authority and trust signals

3. **Add keywords and inLanguage**
   - Helps with discoverability and localization
   - Quick wins for better categorization

4. **Add potentialAction**
   - SearchAction, BuyAction, ViewAction
   - Enables rich interactions

### Low Priority (Nice to Have)

1. Add aggregateRating when reviews available
2. Add speakable for voice assistants
3. Add detailed accessibility properties
4. Add video/audio content where applicable

---

## Page-by-Page Summary

### Navigation Pages

#### index.html (Home)
- **Type:** WebSite
- **Status:** Good foundation
- **Critical:** Add image, dates
- **Recommended:** Add mainEntity (Book), keywords, SearchAction validation

#### about.html
- **Type:** AboutPage
- **Status:** Well-structured
- **Critical:** Add dates, mainEntityOfPage, Person image
- **Recommended:** Breadcrumb, enhanced Organization details

#### contact.html
- **Type:** ContactPage
- **Status:** Solid ContactPoint implementation
- **Critical:** Add dates, mainEntityOfPage
- **Recommended:** Multiple ContactPoints, hoursAvailable, CommunicateAction

### Sales & Product Pages

#### sales.html
- **Type:** Product (Book)
- **Status:** Needs significant improvement
- **Critical:** Add image (HIGHEST PRIORITY), fix audience, enhance Offer, add SKU
- **Recommended:** Use ["Product", "Book"], add brand, category

#### product.html
- **Type:** Product
- **Status:** Basic implementation
- **Critical:** Add image (CRITICAL), enhance Offer with seller
- **Recommended:** Add category, additionalProperty, aggregateRating when available

#### pricing.html
- **Type:** Product (should be WebPage)
- **Status:** Wrong root type
- **Critical:** Restructure as WebPage with nested Product
- **Recommended:** Add comparison Table schema, enhance each Offer

#### checkout.html
- **Type:** CheckoutPage
- **Status:** Minimal implementation
- **Critical:** Add Order as mainEntity, dates
- **Recommended:** Add BuyAction, breadcrumb with steps, paymentAccepted

### Content Pages

#### collection.html (Appendices)
- **Type:** CollectionPage + ItemList
- **Status:** Excellent structure
- **Critical:** Add dates to page and each item
- **Recommended:** Add itemListOrder, breadcrumb, keywords to each item

#### blog-post.html
- **Type:** BlogPosting
- **Status:** Very good implementation
- **Critical:** Add image (for social sharing)
- **Recommended:** Enhance author with image/social, add breadcrumb

#### article.html
- **Type:** TechArticle
- **Status:** Excellent for technical content
- **Critical:** Add image
- **Recommended:** Add codeRepository, programmingLanguage, softwareRequirements

#### faq.html
- **Type:** FAQPage
- **Status:** Good Q&A structure
- **Critical:** Expand to 10-20 questions, add dates
- **Recommended:** Enhance Answer objects with dates/author, add breadcrumb

### Service Pages

#### consulting.html
- **Type:** Service
- **Status:** Basic service schema
- **Critical:** Split offers into array of specific Offer objects, add dates
- **Recommended:** Add serviceOutput, hasOfferCatalog, potentialAction

### Utility Pages

#### search.html
- **Type:** SearchResultsPage
- **Status:** Minimal implementation
- **Critical:** Add ItemList with results, SearchAction
- **Recommended:** Add query property, enhance result items

#### login.html
- **Type:** None
- **Status:** NO SCHEMA PRESENT
- **Critical:** Add basic WebPage schema
- **Recommended:** Keep minimal for security, add AuthenticateAction

#### 404.html
- **Type:** WebPage
- **Status:** Basic error page
- **Critical:** Add dates
- **Recommended:** Add SearchAction, relatedLink with helpful pages

### Portfolio & Social Pages

#### team.html
- **Type:** ProfilePage
- **Status:** Simple implementation
- **Critical:** Add Person image, dates
- **Recommended:** Expand Person details (sameAs, worksFor, knowsAbout)

#### portfolio.html
- **Type:** CollectionPage
- **Status:** Missing ItemList
- **Critical:** Add ItemList for case studies, dates
- **Recommended:** Use CreativeWork for case study items

#### event.html
- **Type:** Event
- **Status:** Good event schema
- **Critical:** Add image, description, duration
- **Recommended:** Enhance organizer, add performer, audience

#### testimonials.html
- **Type:** CreativeWork (should be WebPage)
- **Status:** Wrong root type
- **Critical:** Restructure as WebPage with about (Book), add aggregateRating
- **Recommended:** Enhance Review objects with dates, author details

#### privacy.html
- **Type:** WebPage
- **Status:** Basic legal document
- **Critical:** Add isPartOf, publisher, version
- **Recommended:** Add legislationIdentifier, legislationApplies

---

## Common Patterns to Implement

### 1. Standard Page Properties (All Pages)

```json
{
  "datePublished": "2026-01-11",
  "dateModified": "2026-01-11",
  "inLanguage": "en-GB",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "page-url"
  }
}
```

### 2. Breadcrumb Pattern (Most Pages)

```json
"breadcrumb": {
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://allabout.network/invisible-users/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Current Page",
      "item": "current-url"
    }
  ]
}
```

### 3. Enhanced Person Object (Multiple Pages)

```json
"author": {
  "@type": "Person",
  "name": "Tom Cranstoun",
  "email": "tom.cranstoun@gmail.com",
  "url": "https://allabout.network",
  "image": "https://allabout.network/images/tom.jpg",
  "jobTitle": "Software Consultant, Author",
  "sameAs": [
    "https://www.linkedin.com/in/tom-cranstoun/",
    "https://github.com/Digital-Domain-Technologies-Ltd"
  ]
}
```

### 4. Enhanced Offer Pattern (E-commerce Pages)

```json
"offers": {
  "@type": "Offer",
  "price": "TBD",
  "priceCurrency": "GBP",
  "availability": "https://schema.org/PreOrder",
  "url": "page-url",
  "seller": {
    "@type": "Organization",
    "name": "Digital Domain Technologies Ltd"
  },
  "itemCondition": "https://schema.org/NewCondition",
  "validFrom": "2026-01-11",
  "priceValidUntil": "2026-12-31"
}
```

---

## Implementation Roadmap

### Phase 1: Critical Fixes (Week 1)
1. Add images to all product/content pages (7 pages)
2. Add datePublished/dateModified to all pages (18 pages)
3. Fix Offer objects (5 pages)
4. Fix audience property (sales.html)
5. Add Schema.org to login.html

### Phase 2: Important Enhancements (Week 2)
1. Add breadcrumbs to all pages
2. Enhance Person/Organization objects
3. Add mainEntityOfPage references
4. Add keywords and enhanced descriptions

### Phase 3: Optimization (Week 3)
1. Add potentialAction to interactive pages
2. Add ItemList to collection pages
3. Enhance Review/Rating objects
4. Add multimedia properties

### Phase 4: Polish (Week 4)
1. Add speakable for voice
2. Add aggregateRating when available
3. Add video/audio where applicable
4. Validate all schemas

---

## Validation & Testing

### Tools to Use

1. **Google Rich Results Test**
   - https://search.google.com/test/rich-results
   - Test each page for errors/warnings

2. **Schema.org Validator**
   - https://validator.schema.org/
   - Comprehensive validation

3. **JSON-LD Playground**
   - https://json-ld.org/playground/
   - Visualize and debug

4. **Bing Markup Validator**
   - https://www.bing.com/toolbox/markup-validator
   - Test Bing compatibility

### Validation Checklist

- [ ] All @context URLs correct
- [ ] All @type values from Schema.org vocabulary
- [ ] Required properties present for each type
- [ ] Date formats ISO 8601
- [ ] URLs absolute (not relative)
- [ ] Enum values use full URLs (e.g., https://schema.org/InStock)
- [ ] No undefined custom properties
- [ ] Proper nesting of objects
- [ ] No circular references

---

## Measurement & Success Criteria

### KPIs to Track

1. **Search Console Metrics**
   - Rich result appearances
   - Click-through rates
   - Average position

2. **Social Sharing**
   - Proper image/title in shares
   - Rich previews working

3. **AI Agent Compatibility**
   - Agent success rates
   - Data extraction accuracy

### Success Targets

- 100% of pages with valid schema (0 errors)
- <5 warnings per page on average
- Images present on all product/content pages
- Dates on all pages
- Breadcrumbs on 18+ pages

---

## Resources

### Official Documentation
- [Schema.org](https://schema.org/)
- [Google Structured Data](https://developers.google.com/search/docs/appearance/structured-data)
- [JSON-LD Specification](https://json-ld.org/)

### Specific Guides
- [Product Schema](https://schema.org/Product)
- [Article Schema](https://schema.org/Article)
- [Event Schema](https://schema.org/Event)
- [Service Schema](https://schema.org/Service)
- [FAQ Schema](https://schema.org/FAQPage)

### Testing Tools
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Structured Data Linter](http://linter.structured-data.org/)

---

## Conclusion

The current Schema.org implementation provides a solid foundation but has significant room for improvement. The most critical issues are:

1. Missing images on key pages (impacts visibility)
2. Missing date properties (impacts freshness signals)
3. Incomplete offer objects (impacts e-commerce functionality)

Implementing the recommended changes will significantly improve:
- Search engine visibility
- Rich result eligibility
- AI agent compatibility
- Social media sharing
- User discovery

**Estimated Implementation Time:** 4-6 hours for all critical fixes, 8-12 hours for complete implementation.

**ROI:** High - improves discoverability, trust signals, and provides better information to both search engines and AI agents.
