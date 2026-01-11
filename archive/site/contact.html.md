# Schema.org Analysis Report: contact.html

## Current Implementation

**Schema Type:** ContactPage

**Current Properties:**
- `name`: "Contact Tom Cranstoun"
- `description`: Contact description
- `url`: Page URL
- `mainEntity`: Person with ContactPoint
- `inLanguage`: "en-GB"

## Analysis

### Strengths

1. **Correct Schema Type**: ContactPage is appropriate
2. **Proper ContactPoint**: Nested within Person with contactType
3. **Available Language**: Specifies English availability
4. **Social Links**: sameAs array for LinkedIn and GitHub

### Opportunities for Improvement

1. **Enhance ContactPoint Details**
   - Add `telephone`: Currently missing phone contact
   - Add `hoursAvailable`: Specify business hours
     ```json
     "hoursAvailable": {
       "@type": "OpeningHoursSpecification",
       "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
       "opens": "09:00",
       "closes": "17:00"
     }
     ```
   - Add `areaServed`: Geographic areas served
   - Add `availableLanguage`: More explicit than just "English"

2. **Add Multiple Contact Methods**
   - Current schema only shows email in ContactPoint
   - Could add array of ContactPoints for different methods:
     - Email (professional enquiries)
     - LinkedIn (networking)
     - GitHub (technical)

3. **Missing Date Properties**
   - Add `datePublished` and `dateModified`

4. **Add Response Time Information**
   - Custom data attribute mentions "24-48 hours"
   - Consider encoding this in schema using `serviceType` or `description`

5. **Add breadcrumb**
   - Link to site navigation structure

6. **Missing mainEntityOfPage**
   - Should reference this page

7. **Consider Organization Schema**
   - If representing company contact, could use Organization with `contactPoint` instead of Person

8. **Add potentialAction**
   - CommunicateAction for initiating contact:
     ```json
     "potentialAction": {
       "@type": "CommunicateAction",
       "target": {
         "@type": "EntryPoint",
         "urlTemplate": "mailto:tom.cranstoun@gmail.com",
         "actionPlatform": "http://schema.org/DesktopWebPlatform"
       }
     }
     ```

## Recommended Schema Structure

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Tom Cranstoun",
  "description": "Get in touch about The Invisible Users book, web audits, or collaboration",
  "url": "https://allabout.network/invisible-users/web/contact.html",
  "datePublished": "2026-01-11",
  "dateModified": "2026-01-11",
  "inLanguage": "en-GB",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://allabout.network/invisible-users/web/contact.html"
  },
  "mainEntity": {
    "@type": "Person",
    "name": "Tom Cranstoun",
    "email": "tom.cranstoun@gmail.com",
    "url": "https://allabout.network",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Professional Enquiries",
        "email": "tom.cranstoun@gmail.com",
        "availableLanguage": ["en-GB", "en-US"],
        "areaServed": "Worldwide",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "17:00",
          "timeZone": "Europe/London"
        },
        "serviceType": "Responds within 24-48 hours"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Professional Networking",
        "url": "https://www.linkedin.com/in/tom-cranstoun/",
        "serviceType": "LinkedIn connection requests"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Technical Support",
        "url": "https://github.com/Digital-Domain-Technologies-Ltd",
        "serviceType": "GitHub issues and discussions"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/in/tom-cranstoun/",
      "https://github.com/Digital-Domain-Technologies-Ltd"
    ]
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
        "name": "Contact",
        "item": "https://allabout.network/invisible-users/web/contact.html"
      }
    ]
  },
  "potentialAction": {
    "@type": "CommunicateAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "mailto:tom.cranstoun@gmail.com",
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
1. Add multiple ContactPoint objects for different contact methods
2. Add `hoursAvailable` with business hours and timezone
3. Add `datePublished` and `dateModified`
4. Add `mainEntityOfPage`

**Medium Priority:**
1. Add breadcrumb navigation
2. Add `areaServed` and `availableLanguage` details
3. Add `potentialAction` for initiating contact

**Low Priority:**
1. Consider adding telephone if available
2. Add `serviceType` descriptions for response times

## References

- [Schema.org ContactPage Documentation](https://schema.org/ContactPage)
- [Schema.org ContactPoint Documentation](https://schema.org/ContactPoint)
- [OpeningHoursSpecification Guidelines](https://schema.org/OpeningHoursSpecification)
- [Google Contact Info Guidelines](https://developers.google.com/search/docs/appearance/structured-data/contact-information)
