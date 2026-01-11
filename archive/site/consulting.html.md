# Schema.org Analysis Report: consulting.html

## Current Implementation

**Schema Type:** Service

**Properties:** serviceType, name, description, provider (Person), areaServed, availableChannel, offers (AggregateOffer), termsOfService

## Key Findings

### Strengths
- Correct Service schema type
- Comprehensive provider information with social links
- AggregateOffer for multiple pricing options
- Worldwide areaServed

### Critical Improvements Needed

1. **Offer Structure**: Current has generic "Contact for pricing". Should use multiple specific Offer objects for each tier:
   ```json
   "offers": [
     {
       "@type": "Offer",
       "name": "Self-Service Tool",
       "priceCurrency": "GBP",
       "availability": "https://schema.org/InStock"
     },
     {
       "@type": "Offer",
       "name": "Professional Audit",
       "priceCurrency": "GBP",
       "availability": "https://schema.org/InStock"
     },
     {
       "@type": "Offer",
       "name": "Agency Partnership",
       "priceCurrency": "GBP",
       "availability": "https://schema.org/InStock"
     }
   ]
   ```

2. **Add serviceOutput**: What deliverables clients receive
3. **Add serviceType as category**: More specific categorization
4. **Add hasOfferCatalog**: Link to detailed service catalog
5. **Add aggregateRating**: When reviews available
6. **Add potentialAction**: BuyAction or OrderAction
7. **Missing dates**: datePublished, dateModified
8. **Add providerMobility**: "static" or "dynamic"

## Priority Recommendations
- **High**: Split offers into array of specific Offer objects, add datePublished/Modified, add serviceOutput
- **Medium**: Add hasOfferCatalog, breadcrumb, potentialAction
- **Low**: Add aggregateRating when available

## References
- [Schema.org Service](https://schema.org/Service)
- [Service Offers Best Practices](https://developers.google.com/search/docs/appearance/structured-data/service)
