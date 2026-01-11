# Schema.org Analysis Report: search.html

## Current Implementation

**Schema Type:** SearchResultsPage

**Properties:** name only

## Key Findings

### Strengths
- Correct SearchResultsPage type

### Critical Improvements Needed

1. **Add mainEntity (ItemList)**: List of search results
   ```json
   "mainEntity": {
     "@type": "ItemList",
     "numberOfItems": 3,
     "itemListElement": [
       {
         "@type": "ListItem",
         "position": 1,
         "item": {
           "@type": "WebPage",
           "name": "The Invisible Users - Home",
           "url": "index.html",
           "description": "A practical guide to designing websites..."
         }
       }
     ]
   }
   ```

2. **Add SearchAction**: For refined searches
   ```json
   "potentialAction": {
     "@type": "SearchAction",
     "target": {
       "@type": "EntryPoint",
       "urlTemplate": "https://allabout.network/invisible-users/web/search?q={search_term_string}"
     },
     "query-input": "required name=search_term_string"
   }
   ```

3. **Add about**: Search context
   ```json
   "about": {
     "@type": "Thing",
     "name": "Site content search results"
   }
   ```

4. **Add query**: Current search terms
   ```json
   "query": "AI agents"
   ```

5. **Add inLanguage**: "en-GB"

6. **Add breadcrumb**: Navigation

7. **Add datePublished/Modified**: Page dates

8. **Add url**: Canonical URL with query parameters
   ```json
   "url": "https://allabout.network/invisible-users/web/search?q=AI+agents"
   ```

9. **Enhance Individual Results**:
   ```json
   "item": {
     "@type": "WebPage",
     "name": "Page Title",
     "url": "page-url.html",
     "description": "Snippet text",
     "dateModified": "2026-01-11",
     "keywords": "relevant, keywords"
   }
   ```

10. **Add isBasedOn**: Original query
    ```json
    "isBasedOn": {
      "@type": "Question",
      "text": "AI agents"
    }
    ```

## Priority Recommendations
- **High**: Add mainEntity (ItemList) with search results, add SearchAction, add query property
- **Medium**: Add breadcrumb, url with query params, inLanguage
- **Low**: Add isBasedOn for query context

## References
- [Schema.org SearchResultsPage](https://schema.org/SearchResultsPage)
- [Schema.org SearchAction](https://schema.org/SearchAction)
