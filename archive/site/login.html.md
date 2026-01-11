# Schema.org Analysis Report: login.html

## Current Implementation

**Schema Type:** None - No JSON-LD present

## Key Findings

### Critical Issue
- **No Schema.org markup at all**

### Recommended Implementation

1. **Add WebPage Schema**:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "WebPage",
     "name": "Sign In",
     "description": "User authentication page",
     "url": "https://allabout.network/invisible-users/web/site/login.html",
     "datePublished": "2026-01-11",
     "dateModified": "2026-01-11",
     "inLanguage": "en-GB",
     "isPartOf": {
       "@type": "WebSite",
       "name": "The Invisible Users",
       "url": "https://allabout.network/invisible-users"
     }
   }
   ```

2. **Add potentialAction (AuthenticateAction)**:
   ```json
   "potentialAction": {
     "@type": "AuthenticateAction",
     "target": {
       "@type": "EntryPoint",
       "urlTemplate": "/login",
       "httpMethod": "POST",
       "encodingType": "application/x-www-form-urlencoded"
     },
     "object": {
       "@type": "DigitalDocument",
       "name": "User Credentials"
     }
   }
   ```

3. **Add breadcrumb**: Navigation context

4. **Add mainEntityOfPage**: Self-reference

5. **Consider InteractApplicationAction**:
   ```json
   "potentialAction": {
     "@type": "InteractAction",
     "actionStatus": "https://schema.org/PotentialActionStatus",
     "target": {
       "@type": "EntryPoint",
       "urlTemplate": "/login"
     }
   }
   ```

## Important Notes

- Login pages typically have minimal schema
- Focus on security over discoverability
- Don't expose sensitive information in schema
- Keep it simple: WebPage + basic properties

## Priority Recommendations
- **High**: Add basic WebPage schema with dates and inLanguage
- **Medium**: Add isPartOf linking to WebSite, add breadcrumb
- **Low**: Add potentialAction for authentication

## References
- [Schema.org WebPage](https://schema.org/WebPage)
- [Schema.org AuthenticateAction](https://schema.org/AuthenticateAction)
