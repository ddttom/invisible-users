# Schema.org Analysis Report: team.html

## Current Implementation

**Schema Type:** ProfilePage

**Properties:** mainEntity (Person) with name, jobTitle, email, url

## Key Findings

### Strengths
- Correct ProfilePage type
- Clean Person schema

### Improvements Needed

1. **Add image to Person**: Profile photos essential
   ```json
   "image": "https://allabout.network/images/tom-cranstoun.jpg"
   ```

2. **Expand Person details**:
   ```json
   {
     "@type": "Person",
     "name": "Tom Cranstoun",
     "givenName": "Tom",
     "familyName": "Cranstoun",
     "image": "https://allabout.network/images/tom.jpg",
     "jobTitle": "Author and Software Consultant",
     "email": "tom.cranstoun@gmail.com",
     "url": "https://allabout.network",
     "worksFor": {
       "@type": "Organization",
       "name": "Digital Domain Technologies Ltd"
     },
     "sameAs": [
       "https://www.linkedin.com/in/tom-cranstoun/",
       "https://github.com/Digital-Domain-Technologies-Ltd"
     ],
     "knowsAbout": ["Web Development", "AI Agents", "Accessibility"],
     "alumniOf": "TBD",
     "address": {
       "@type": "PostalAddress",
       "addressCountry": "GB"
     }
   }
   ```

3. **Add ProfilePage properties**:
   - dateCreated
   - dateModified
   - inLanguage: "en-GB"
   - breadcrumb

4. **Add Multiple Team Members**: If team expands
   ```json
   "mainEntity": [
     { Person 1 },
     { Person 2 }
   ]
   ```

5. **Consider Organization Schema**: For company team pages
   ```json
   {
     "@type": "Organization",
     "name": "Digital Domain Technologies Ltd",
     "employee": [
       { Person objects }
     ]
   }
   ```

6. **Add contactPoint**: Business contact info

7. **Add award/honor**: If applicable

8. **Add description**: What makes this person/team unique

## Priority Recommendations
- **High**: Add image to Person, add sameAs links, add dates
- **Medium**: Expand Person with worksFor and knowsAbout, add breadcrumb
- **Low**: Add awards, multiple team members structure

## References
- [Schema.org ProfilePage](https://schema.org/ProfilePage)
- [Schema.org Person](https://schema.org/Person)
