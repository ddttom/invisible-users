# Schema.org Analysis Report: checkout.html

## Current Implementation

**Schema Type:** CheckoutPage

**Properties:** name only

## Key Findings

### Strengths
- Correct CheckoutPage type

### Critical Improvements Needed

1. **Add Order Details**:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "CheckoutPage",
     "name": "Checkout",
     "description": "Complete your purchase",
     "url": "https://allabout.network/invisible-users/web/site/checkout.html",
     "datePublished": "2026-01-11",
     "dateModified": "2026-01-11",
     "inLanguage": "en-GB",
     "mainEntity": {
       "@type": "Order",
       "orderStatus": "https://schema.org/OrderProcessing",
       "orderDate": "2026-01-11",
       "orderedItem": {
         "@type": "Product",
         "name": "The Invisible Users",
         "sku": "INVISIBLE-USERS-2026"
       },
       "seller": {
         "@type": "Organization",
         "name": "Digital Domain Technologies Ltd"
       },
       "paymentMethod": "http://purl.org/goodrelations/v1#ByBankTransferInAdvance"
     }
   }
   ```

2. **Add BuyAction**:
   ```json
   "potentialAction": {
     "@type": "BuyAction",
     "target": {
       "@type": "EntryPoint",
       "urlTemplate": "/checkout",
       "httpMethod": "POST"
     },
     "price": "TBD",
     "priceCurrency": "GBP"
   }
   ```

3. **Add CheckoutForm Schema**: Document form structure
   - Consider using about to describe form sections

4. **Add paymentAccepted**: Supported payment methods
   ```json
   "paymentAccepted": [
     "Cash",
     "Credit Card",
     "Invoice",
     "PayPal"
   ]
   ```

5. **Add breadcrumb**: Checkout flow position
   ```json
   "breadcrumb": {
     "@type": "BreadcrumbList",
     "itemListElement": [
       { "position": 1, "name": "Home" },
       { "position": 2, "name": "Product" },
       { "position": 3, "name": "Checkout" }
     ]
   }
   ```

6. **Add step indicators**:
   ```json
   "step": {
     "@type": "HowToStep",
     "position": 1,
     "name": "Billing Information",
     "url": "#billing"
   }
   ```

7. **Add isPartOf**: Link to parent site

8. **Security Considerations**:
   - Don't expose payment details in schema
   - Don't include customer PII
   - Keep minimal for security

## Priority Recommendations
- **High**: Add mainEntity (Order), add paymentAccepted methods, add dates
- **Medium**: Add breadcrumb with checkout steps, add potentialAction (BuyAction)
- **Low**: Add step indicators, detailed form structure

## Important Notes
- Keep checkout schema minimal for security
- Don't expose sensitive customer or payment data
- Focus on process flow, not data

## References
- [Schema.org CheckoutPage](https://schema.org/CheckoutPage)
- [Schema.org Order](https://schema.org/Order)
- [Schema.org BuyAction](https://schema.org/BuyAction)
