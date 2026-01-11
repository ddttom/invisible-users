# Schema.org Analysis Report: portfolio.html

## Current Implementation

**Schema Type:** CollectionPage

**Properties:** name, description

## Key Findings

### Strengths
- Correct CollectionPage type for case studies

### Critical Improvements Needed

1. **Add ItemList for Case Studies**:
   ```json
   "mainEntity": {
     "@type": "ItemList",
     "numberOfItems": 1,
     "itemListElement": [
       {
         "@type": "ListItem",
         "position": 1,
         "item": {
           "@type": "CreativeWork",
           "name": "£20M+ Pipeline Failure Analysis",
           "description": "Case study of AI agent compatibility issues",
           "url": "article.html",
           "author": {
             "@type": "Person",
             "name": "Tom Cranstoun"
           }
         }
       }
     ]
   }
   ```

2. **Use More Specific Types for Case Studies**:
   - CreativeWork
   - ScholarlyArticle
   - TechArticle
   - Report

3. **Add breadcrumb**: Navigation hierarchy

4. **Add datePublished/Modified**: Page dates

5. **Add inLanguage**: "en-GB"

6. **Add about**: Portfolio focus
   ```json
   "about": {
     "@type": "Thing",
     "name": "AI Agent Compatibility Case Studies"
   }
   ```

7. **Add author**: Portfolio creator
   ```json
   "author": {
     "@type": "Person",
     "name": "Tom Cranstoun"
   }
   ```

8. **Add keywords**: "case studies, portfolio, examples"

9. **Enhance Individual Case Studies**:
   ```json
   {
     "@type": "CreativeWork",
     "name": "Case Study Title",
     "datePublished": "2026-01-11",
     "keywords": "AI agents, implementation",
     "workExample": {
       "@type": "WebSite",
       "name": "Client Website"
     },
     "result": "100% agent success rate"
   }
   ```

## Priority Recommendations
- **High**: Add ItemList with case studies, add dates, add author
- **Medium**: Add breadcrumb, enhance case study items with details
- **Low**: Add keywords, about property

## References
- [Schema.org CollectionPage](https://schema.org/CollectionPage)
- [Schema.org CreativeWork](https://schema.org/CreativeWork)
