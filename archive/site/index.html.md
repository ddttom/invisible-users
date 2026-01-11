# Schema.org Analysis Report: index.html

## Current Implementation

**Schema Type:** WebSite

**Current Properties:**
- `name`: "The Invisible Users"
- `description`: Basic site description
- `url`: Site URL
- `author`: Person with name, email, URL, sameAs
- `publisher`: Organization
- `inLanguage`: "en-GB"
- `potentialAction`: SearchAction with target and query-input

## Analysis

### Strengths

1. **Comprehensive Person Schema**: The author object includes good social media links via `sameAs`
2. **SearchAction Implementation**: Properly implements site search discovery
3. **Language Declaration**: Correctly uses `inLanguage` for British English
4. **Publisher Information**: Includes organization details

### Opportunities for Improvement

1. **Add dateModified/datePublished**
   - Homepage should include `datePublished` and `dateModified` to signal freshness
   - Recommended: `"datePublished": "2026-01-11"` and update `dateModified` when content changes

2. **Enhance SearchAction**
   - Consider adding `actionStatus` to indicate the search is available
   - Current implementation points to a search URL that may not exist yet

3. **Add Breadcrumb List**
   - As a home page, could reference main navigation as BreadcrumbList
   - Helps agents understand site structure

4. **Consider WebPage + WebSite Combination**
   - Could nest WebPage within WebSite to provide both page-level and site-level metadata
   - WebSite describes the site, WebPage describes this specific page

5. **Add mainEntityOfPage**
   - Link back to this page's canonical URL

6. **Image Property Missing**
   - WebSite schema supports `image` property
   - Recommend adding book cover or project logo: `"image": "https://allabout.network/invisible-users/cover.jpg"`

7. **Add keywords**
   - Useful for agent discovery: `"keywords": "AI agents, web design, accessibility, semantic HTML"`

8. **Consider adding license**
   - `"license": "https://creativecommons.org/licenses/by/4.0/"` or appropriate license

## Recommended Schema Structure

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "The Invisible Users",
  "alternateName": "Designing the Web for AI Agents and Everyone Else",
  "description": "A practical guide to designing websites that work for AI agents and everyone else",
  "url": "https://allabout.network/invisible-users",
  "image": "https://allabout.network/invisible-users/cover.jpg",
  "datePublished": "2026-01-11",
  "dateModified": "2026-01-11",
  "inLanguage": "en-GB",
  "keywords": "AI agents, web design, accessibility, semantic HTML, Schema.org, structured data",
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
  "publisher": {
    "@type": "Organization",
    "name": "Digital Domain Technologies Ltd",
    "url": "https://allabout.network"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://allabout.network/invisible-users/web/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "mainEntity": {
    "@type": "Book",
    "name": "The Invisible Users",
    "bookFormat": "https://schema.org/EBook",
    "inLanguage": "en-GB",
    "numberOfPages": "TBD",
    "author": {
      "@type": "Person",
      "name": "Tom Cranstoun"
    }
  }
}
```

## Priority Recommendations

**High Priority:**
1. Add `datePublished` and `dateModified`
2. Add `image` property with book cover
3. Add `keywords` for better discoverability
4. Add `mainEntity` referencing the Book

**Medium Priority:**
1. Add `alternateName` for the full title
2. Verify SearchAction URL is functional
3. Consider adding BreadcrumbList for navigation

**Low Priority:**
1. Add `license` property
2. Consider separate WebPage + WebSite schemas

## References

- [Schema.org WebSite Documentation](https://schema.org/WebSite)
- [SearchAction Guidelines](https://schema.org/SearchAction)
- [Google's Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
