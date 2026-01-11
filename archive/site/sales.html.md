# Schema.org Analysis Report: sales.html

## Current Implementation

**Schema Type:** Product

**Current Properties:**
- Basic product information (name, description, author)
- `inLanguage`: "en-GB"
- `numberOfPages`: "TBD"
- `bookFormat`: EBook
- `publisher`: Organization
- `datePublished`: "2026-Q1"
- `offers`: Single Offer with availability PreOrder
- `audience`: Simple string

## Analysis

### Strengths

1. **Correct Primary Type**: Product is appropriate for a book sales page
2. **Book-Specific Properties**: Uses bookFormat and numberOfPages
3. **Publisher Information**: Includes organization details
4. **Offer Structure**: Basic Offer implementation with availability

### Critical Issues

1. **Offer Price is "TBD"**
   - While acceptable pre-launch, consider using PriceSpecification with validFrom date
   - Or use AggregateOffer if multiple pricing options exist

2. **audience Property Misused**
   - Current: Simple string "Web Professionals, Agent System Developers..."
   - Should be: Audience object or array of Audience objects
   - Recommended:
     ```json
     "audience": [
       {
         "@type": "ProfessionalAudience",
         "audienceType": "Web Developers",
         "name": "Web Professionals"
       },
       {
         "@type": "ProfessionalAudience",
         "audienceType": "Software Engineers",
         "name": "Agent System Developers"
       }
     ]
     ```

3. **Missing Book-Specific Type**
   - Should use `@type`: ["Product", "Book"] for multi-type
   - Or just "Book" as it's more specific

4. **Missing Critical Product Properties**
   - `isbn`: If available
   - `image`: Book cover image (important!)
   - `brand`: Publisher as brand
   - `sku` or `gtin`: Product identifier

5. **Incomplete Offer**
   - Missing `seller` property
   - Missing `itemCondition`: Should be "NewCondition"
   - Missing `priceValidUntil` if price is set
   - Consider adding `shippingDetails` for digital delivery

6. **Missing Review/AggregateRating**
   - Once reviews exist, add `review` or `aggregateRating`

7. **Missing potentialAction**
   - Should add BuyAction or ReadAction

## Recommended Schema Structure

```json
{
  "@context": "https://schema.org",
  "@type": ["Product", "Book"],
  "name": "The Invisible Users: Designing the Web for AI Agents and Everyone Else",
  "description": "A practical guide examining how modern web design optimised for human users fails for AI agents, and how fixing this benefits everyone. Includes 11 chapters (~57,000 words), 10 free appendices, and production-ready code examples.",
  "image": "https://allabout.network/invisible-users/cover.jpg",
  "sku": "INVISIBLE-USERS-2026",
  "author": {
    "@type": "Person",
    "name": "Tom Cranstoun",
    "email": "tom.cranstoun@gmail.com",
    "url": "https://allabout.network",
    "sameAs": [
      "https://www.linkedin.com/in/tom-cranstoun/",
      "https://github.com/Digital-Domain-Technologies-Ltd"
    ]
  },
  "inLanguage": "en-GB",
  "numberOfPages": "TBD",
  "bookFormat": "https://schema.org/EBook",
  "bookEdition": "First Edition",
  "publisher": {
    "@type": "Organization",
    "name": "Digital Domain Technologies Ltd",
    "url": "https://allabout.network"
  },
  "brand": {
    "@type": "Brand",
    "name": "Digital Domain Technologies Ltd"
  },
  "datePublished": "2026-Q1",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/PreOrder",
    "price": "TBD",
    "priceCurrency": "GBP",
    "url": "https://allabout.network/invisible-users/web/sales.html",
    "seller": {
      "@type": "Organization",
      "name": "Digital Domain Technologies Ltd"
    },
    "itemCondition": "https://schema.org/NewCondition",
    "validFrom": "2026-01-11",
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "Worldwide"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "businessDays": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Instant digital delivery"
        }
      }
    }
  },
  "audience": [
    {
      "@type": "ProfessionalAudience",
      "audienceType": "Web Developers",
      "name": "Web Professionals"
    },
    {
      "@type": "ProfessionalAudience",
      "audienceType": "Software Engineers",
      "name": "Agent System Developers"
    },
    {
      "@type": "Audience",
      "audienceType": "Business Leaders"
    },
    {
      "@type": "Audience",
      "audienceType": "Partners & Investors"
    }
  ],
  "category": "Computers / Web / Design",
  "keywords": "AI agents, web design, accessibility, semantic HTML, Schema.org",
  "potentialAction": {
    "@type": "BuyAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "mailto:tom.cranstoun@gmail.com?subject=Book Purchase Enquiry",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    }
  }
}
```

## Priority Recommendations

**High Priority:**
1. Add `image` property with book cover - **critical for visibility**
2. Fix `audience` to use proper Audience objects
3. Add `sku` or product identifier
4. Use `["Product", "Book"]` for @type
5. Add `seller` to Offer
6. Add `itemCondition` to Offer

**Medium Priority:**
1. Add `brand` property
2. Add `bookEdition`
3. Add `shippingDetails` for digital delivery
4. Add `category` and enhanced `keywords`
5. Add `potentialAction` for purchase

**Low Priority:**
1. Add `isbn` when available
2. Consider `aggregateRating` when reviews exist
3. Add `priceValidUntil` when price is set

## References

- [Schema.org Product Documentation](https://schema.org/Product)
- [Schema.org Book Documentation](https://schema.org/Book)
- [Schema.org Offer Documentation](https://schema.org/Offer)
- [Google Product Structured Data](https://developers.google.com/search/docs/appearance/structured-data/product)
