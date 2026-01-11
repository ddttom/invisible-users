# Schema.org Analysis Report: pricing.html

## Current Implementation

**Schema Type:** Product (with multiple Offer objects)

**Properties:** name, description, offers (array of 3 Offers)

## Key Findings

### Strengths
- Uses array of Offer objects for different tiers
- Each offer has name, description, availability

### Critical Improvements Needed

1. **Wrong Root Type**: Should be WebPage or PriceSpecification page, not Product
   ```json
   {
     "@type": "WebPage",
     "name": "Web Audit Suite Pricing",
     "about": {
       "@type": "Product",
       "name": "Web Audit Suite",
       "offers": [...]
     }
   }
   ```

2. **Enhance Each Offer**:
   ```json
   {
     "@type": "Offer",
     "name": "Professional Audit",
     "description": "Expert analysis with detailed report",
     "priceCurrency": "GBP",
     "availability": "https://schema.org/InStock",
     "seller": {
       "@type": "Person",
       "name": "Tom Cranstoun"
     },
     "category": "Professional Services",
     "eligibleCustomerType": "Business",
     "itemOffered": {
       "@type": "Service",
       "name": "Professional Web Audit",
       "serviceType": "Website Analysis"
     }
   }
   ```

3. **Add Comparison Table Schema**: Use Table type
   ```json
   "mainEntity": {
     "@type": "Table",
     "about": "Service tier comparison"
   }
   ```

4. **Add datePublished/Modified**: Pricing page dates

5. **Add inLanguage**: "en-GB"

6. **Add breadcrumb**: Navigation

7. **Add potentialAction**: BuyAction or OrderAction

8. **Add eligibleRegion**: Geographic availability

9. **Consider AggregateOffer**: At page level summarizing all options

## Priority Recommendations
- **High**: Fix root type to WebPage, nest Product with offers, enhance each Offer with seller and itemOffered
- **Medium**: Add comparison Table schema, dates, breadcrumb
- **Low**: Add potentialAction, eligibleRegion details

## References
- [Schema.org Offer](https://schema.org/Offer)
- [Pricing Page Best Practices](https://developers.google.com/search/docs/appearance/structured-data/product#pricing)
