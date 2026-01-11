# Schema.org Analysis Report: faq.html

## Current Implementation

**Schema Type:** FAQPage

**Properties:** name, description, mainEntity array with Question/Answer objects

## Key Findings

### Strengths
- Perfect FAQPage implementation
- Proper Question/Answer structure
- Each question has acceptedAnswer
- Clean, straightforward schema

### Improvements Needed

1. **Expand Q&A Coverage**: Currently only 4 questions. Should have 10-20 for comprehensive FAQ

2. **Add datePublished/Modified**: FAQ pages need freshness signals

3. **Add inLanguage**: "en-GB"

4. **Enhance Answer Objects**:
   ```json
   "acceptedAnswer": {
     "@type": "Answer",
     "text": "Answer text here",
     "dateCreated": "2026-01-11",
     "author": {
       "@type": "Person",
       "name": "Tom Cranstoun"
     },
     "upvoteCount": 0
   }
   ```

5. **Add mainEntityOfPage**: Reference back to page

6. **Add breadcrumb**: Navigation context

7. **Add potentialAction**: AskAction for submitting questions

8. **Consider adding suggestedAnswer**: If multiple answers exist

9. **Add keywords**: Help discovery of FAQ topics

10. **Add about**: What topics the FAQ covers
    ```json
    "about": {
      "@type": "Thing",
      "name": "AI-friendly web design and implementation"
    }
    ```

11. **Add speakable**: For voice assistants to read aloud

## Additional Questions to Add

Based on the project, should include:
- "How much does the Web Audit Suite cost?"
- "What programming languages are the examples in?"
- "Does this work for my CMS/framework?"
- "How long does implementation take?"
- "What's the difference between served and rendered HTML?"
- "Do I need to know JavaScript?"
- "Can I use these patterns with React/Vue/Angular?"
- "How do I validate my implementation?"
- "What's the ROI of implementing these patterns?"
- "How do I test for AI agent compatibility?"

## Priority Recommendations
- **High**: Add more Q&A pairs (10-20 total), add datePublished/Modified, add inLanguage
- **Medium**: Enhance Answer objects with dateCreated, add breadcrumb, add about
- **Low**: Add speakable, potentialAction for asking questions

## References
- [Schema.org FAQPage](https://schema.org/FAQPage)
- [Google FAQ Guidelines](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
