# Schema.org Analysis Report: about.html

## Current Implementation

**Schema Type:** AboutPage

**Current Properties:**
- `name`: "About The Invisible Users"
- `description`: Story description
- `url`: Page URL
- `mainEntity`: Person (Tom Cranstoun) with extensive details
- `author`: Person reference
- `inLanguage`: "en-GB"

## Analysis

### Strengths

1. **Appropriate Schema Type**: AboutPage is correct for this content
2. **Rich Person Schema**: Comprehensive details including jobTitle, worksFor, alumniOf, knowsAbout
3. **Good Social Linking**: sameAs properly links to LinkedIn and GitHub
4. **Clear Subject**: mainEntity correctly identifies Tom Cranstoun as the primary subject

### Opportunities for Improvement

1. **Add Date Properties**
   - Missing `datePublished` and `dateModified`
   - Recommended: Add both to signal content freshness

2. **Enhance knowsAbout Array**
   - Current list is good but could use URLs to definitions
   - Consider using Thing with `@id` and `url` properties:
   ```json
   "knowsAbout": [
     {
       "@type": "Thing",
       "name": "Web Development",
       "url": "https://en.wikipedia.org/wiki/Web_development"
     }
   ]
   ```

3. **Add image Property to Person**
   - Person schema supports `image` for profile photos
   - Recommended: `"image": "https://allabout.network/images/tom-cranstoun.jpg"`

4. **Enhance worksFor Organization**
   - Could add more details to the Organization:
     - `logo`
     - `foundingDate`
     - `description`

5. **Add breadcrumb Property**
   - AboutPage can link to BreadcrumbList showing Home > About

6. **Consider Adding alumniOf Details**
   - Current value "Various technology companies" is vague
   - Could use array of Organization objects with specific companies (if appropriate)

7. **Missing mainEntityOfPage**
   - Should reference back to this page: `"mainEntityOfPage": {"@type": "WebPage", "@id": "url"}`

8. **Add potentialAction**
   - Could add ContactAction for contacting the person

## Recommended Schema Structure

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About The Invisible Users",
  "description": "The story behind The Invisible Users book and project",
  "url": "https://allabout.network/invisible-users/web/about.html",
  "datePublished": "2026-01-11",
  "dateModified": "2026-01-11",
  "inLanguage": "en-GB",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://allabout.network/invisible-users/web/about.html"
  },
  "mainEntity": {
    "@type": "Person",
    "name": "Tom Cranstoun",
    "email": "tom.cranstoun@gmail.com",
    "url": "https://allabout.network",
    "image": "https://allabout.network/images/tom-cranstoun.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/tom-cranstoun/",
      "https://github.com/Digital-Domain-Technologies-Ltd"
    ],
    "jobTitle": "Software Consultant, Author",
    "worksFor": {
      "@type": "Organization",
      "name": "Digital Domain Technologies Ltd",
      "url": "https://allabout.network",
      "logo": "https://allabout.network/images/logo.png",
      "description": "Software consulting and AI agent compatibility services"
    },
    "knowsAbout": [
      {
        "@type": "Thing",
        "name": "Web Development"
      },
      {
        "@type": "Thing",
        "name": "AI Agent Compatibility"
      },
      {
        "@type": "Thing",
        "name": "Accessibility"
      },
      {
        "@type": "Thing",
        "name": "Software Architecture"
      },
      {
        "@type": "Thing",
        "name": "Identity Delegation"
      }
    ]
  },
  "author": {
    "@type": "Person",
    "name": "Tom Cranstoun"
  },
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
        "name": "About",
        "item": "https://allabout.network/invisible-users/web/about.html"
      }
    ]
  }
}
```

## Priority Recommendations

**High Priority:**
1. Add `datePublished` and `dateModified`
2. Add `mainEntityOfPage` reference
3. Add `image` to Person schema

**Medium Priority:**
1. Add breadcrumb navigation
2. Enhance Organization details in worksFor
3. Expand knowsAbout to Thing objects with URLs

**Low Priority:**
1. Consider adding specific companies to alumniOf
2. Add ContactAction for contacting

## References

- [Schema.org AboutPage Documentation](https://schema.org/AboutPage)
- [Schema.org Person Documentation](https://schema.org/Person)
- [BreadcrumbList Guidelines](https://schema.org/BreadcrumbList)
