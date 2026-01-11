# Schema.org Analysis Report: event.html

## Current Implementation

**Schema Type:** Event

**Properties:** name, startDate, endDate, eventStatus, eventAttendanceMode, location (VirtualLocation), organizer, offers

## Key Findings

### Strengths
- Excellent Event schema
- Proper virtual event handling
- Good date format (ISO 8601)
- Free event with offers

### Improvements Needed

1. **Add image**: Events should have promotional images
   ```json
   "image": [
     "https://allabout.network/invisible-users/webinar-promo.jpg"
   ]
   ```

2. **Add description**: Detailed event description
   ```json
   "description": "Learn the fundamentals of AI-friendly web design in this 90-minute live webinar. Includes live coding demonstrations and Q&A session."
   ```

3. **Enhance organizer**:
   ```json
   "organizer": {
     "@type": "Person",
     "name": "Tom Cranstoun",
     "email": "tom.cranstoun@gmail.com",
     "url": "https://allabout.network",
     "image": "https://allabout.network/images/tom.jpg"
   }
   ```

4. **Add performer/author**: Who's presenting
   ```json
   "performer": {
     "@type": "Person",
     "name": "Tom Cranstoun",
     "jobTitle": "Author and Software Consultant"
   }
   ```

5. **Enhance offers with registration details**:
   ```json
   "offers": {
     "@type": "Offer",
     "price": "0",
     "priceCurrency": "GBP",
     "availability": "https://schema.org/InStock",
     "url": "contact.html",
     "validFrom": "2026-01-11",
     "validThrough": "2026-02-15T14:00:00Z",
     "seller": {
       "@type": "Person",
       "name": "Tom Cranstoun"
     }
   }
   ```

6. **Add audience**: Target attendees
   ```json
   "audience": {
     "@type": "Audience",
     "audienceType": "Web Developers, Software Engineers"
   }
   ```

7. **Add duration**: Event length
   ```json
   "duration": "PT1H30M"
   ```

8. **Add inLanguage**: "en-GB"

9. **Add recordedIn**: If recording available later

10. **Add subEvent**: If multiple sessions

11. **Add maximumAttendeeCapacity**: If limited

12. **Add breadcrumb**: Navigation

## Priority Recommendations
- **High**: Add image, description, duration, enhance organizer/performer
- **Medium**: Add audience, enhance offers with validity dates, add breadcrumb
- **Low**: Add maximumAttendeeCapacity if limited, recordedIn for replay

## References
- [Schema.org Event](https://schema.org/Event)
- [Google Event Guidelines](https://developers.google.com/search/docs/appearance/structured-data/event)
