---
title: "MX Compliance for Conference Organisers"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Guide for conference and event organisers on implementing MX compliance for AI-assisted event discovery, registration, and attendee experience."
keywords: [conference-organisers, mx-compliance, events, schema-org, ai-agents, registration, scheduling]
audience: "Conference Organisers"
ai-instruction: |
  This document is written for conference and event organisers who want their events
  to be discoverable by AI agents. Focus on practical implementation, attendee benefits,
  and the business case for MX compliance.
---

# MX Compliance for Conference Organisers

A guide to making your conference AI-discoverable.

## The 60-Second Summary

**What:** AI assistants now help people find and book conferences. If your event isn't structured for AI agents, you're invisible to this growing discovery channel.

**Why:** "Find me AI conferences in London under £500" - if an AI assistant can't parse your site, your event won't appear in results.

**How:** Add structured data (Schema.org) and consistent metadata to your conference website. Most changes are code additions, not redesigns.

**Investment:** 2-5 days of development time for basic compliance; ongoing benefits for discovery and accessibility.

## Why This Matters Now

### The Discovery Shift

```text
How People Found Conferences (2020):
├── Google search → Browse results → Visit sites
├── Industry newsletters
├── Word of mouth
└── Conference listing sites

How People Find Conferences (2026):
├── "Hey assistant, find relevant conferences for me"
├── AI-curated recommendations
├── Automated comparison and booking
└── Calendar integration with smart suggestions
```

### The Numbers

- 40% of knowledge workers use AI assistants for research (2025)
- AI-assisted booking is growing 200% year-over-year
- Events with structured data see 3x more organic discovery

### What Happens Without MX Compliance

```text
User: "Find web development conferences in Europe, June 2026"

AI Agent checks your site:
❌ No Schema.org Event data
❌ Dates not machine-readable
❌ Prices not structured
❌ Location not geocoded

Result: Your conference is NOT included in recommendations
```

## What MX Compliance Gives You

### For Attendees

| Benefit | How It Works |
|---------|--------------|
| AI-assisted discovery | "Find conferences about [topic]" works |
| Smart scheduling | Sessions add to calendar with one click |
| Comparison shopping | AI can compare your prices/value |
| Accessibility info | Clear accommodation details |
| Travel planning | Location data enables hotel/flight suggestions |

### For Your Organisation

| Benefit | Impact |
|---------|--------|
| Increased discovery | Appear in AI search results |
| Higher conversion | Structured data = easier registration |
| Better SEO | Schema.org improves Google ranking |
| Reduced support | Self-service schedule management |
| Accessibility compliance | Meet legal requirements |
| Future-proofing | Ready for AI-first discovery |

## What You Need to Do

### Level 1: Essential (Do This First)

**Time:** 1-2 days development

1. **Add Event Schema to your home page**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Your Conference Name 2026",
  "startDate": "2026-06-15T09:00:00+01:00",
  "endDate": "2026-06-17T18:00:00+01:00",
  "location": {
    "@type": "Place",
    "name": "Venue Name",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Conference Street",
      "addressLocality": "London",
      "postalCode": "EC1A 1AA",
      "addressCountry": "GB"
    }
  },
  "offers": {
    "@type": "Offer",
    "price": "299.00",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock",
    "url": "https://yoursite.com/register"
  },
  "organizer": {
    "@type": "Organization",
    "name": "Your Organisation"
  }
}
</script>
```

2. **Add MX meta tags**

```html
<meta name="mx-compliant" content="true">
<meta name="mx-content-type" content="conference">
```

3. **Ensure dates are machine-readable**

```html
<!-- Human readable AND machine readable -->
<time datetime="2026-06-15T09:00:00+01:00">
  Monday, June 15, 2026 at 9:00 AM BST
</time>
```

### Level 2: Standard (Full Compliance)

**Time:** 3-5 days development

4. **Add Schema.org to all page types**
   - Schedule page (EventSeries)
   - Each session (Event with performer)
   - Speaker profiles (Person)
   - Venue page (Place with geo)
   - Registration (OfferCatalog)

5. **Implement calendar downloads**
   - ICS files for full schedule
   - Individual session calendar links
   - "Add to Calendar" buttons

6. **Structure your schedule data**

```html
<article class="session"
         data-session-id="keynote-1"
         data-track="main"
         data-time="09:30"
         data-duration="60"
         data-room="main-hall">
  <!-- Session content -->
</article>
```

7. **Make registration accessible**
   - Label all form fields
   - Capture accessibility requirements
   - Show clear pricing with Schema.org Offers

### Level 3: Advanced (Competitive Advantage)

**Time:** 1-2 weeks development

8. **Real-time availability**
   - Show remaining tickets
   - Session capacity limits
   - Waitlist functionality

9. **API access**
   - Public API for session data
   - Embed widgets for partners
   - Integration with conference apps

10. **Personalisation**
    - Schedule builder with conflict detection
    - Recommendations based on interests
    - Personal calendar sync

## Implementation by Platform

### WordPress with Event Plugins

**The Events Calendar:**
- Install Schema.org extension
- Enable JSON-LD output
- Add custom fields for MX meta tags

**EventOn:**
- Configure structured data settings
- Add Schema.org via theme customisation

**Custom Theme:**
```php
// Add to functions.php
function add_mx_conference_schema() {
  if (is_singular('event')) {
    $event = get_post();
    $schema = [
      '@context' => 'https://schema.org',
      '@type' => 'Event',
      'name' => get_the_title(),
      'startDate' => get_post_meta($event->ID, 'event_start', true),
      // ... more fields
    ];
    echo '<script type="application/ld+json">' . json_encode($schema) . '</script>';
  }
}
add_action('wp_head', 'add_mx_conference_schema');
```

### Squarespace / Wix / Website Builders

Most don't support full Schema.org natively. Options:

1. **Code injection:** Add Schema.org JSON-LD via header code injection
2. **Third-party tools:** Use Yoast, Schema App, or similar
3. **Custom development:** Consider headless CMS for full control

### Conference-Specific Platforms

**Eventbrite:**
- Has built-in Schema.org (check it's enabled)
- Add custom MX meta via custom HTML
- Link to your main site for full compliance

**Hopin / Whova / Cvent:**
- Check platform's structured data settings
- Export data to your own site
- API integration for real-time data

### Custom Development

**Recommended Stack:**
- Headless CMS (Strapi, Contentful) for content
- Next.js / Nuxt.js for rendering
- Schema.org generated at build time
- API endpoints for dynamic data

```javascript
// Next.js example: pages/schedule.js
export async function getStaticProps() {
  const sessions = await fetchSessions();

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'EventSeries',
    'subEvent': sessions.map(session => ({
      '@type': 'Event',
      'name': session.title,
      'startDate': session.startTime,
      // ... more fields
    }))
  };

  return { props: { sessions, schemaOrg } };
}
```

## Measuring Success

### Before/After Metrics

Track these before and after implementing MX compliance:

| Metric | How to Measure |
|--------|----------------|
| Organic traffic | Google Analytics |
| Registration conversion | Funnel analysis |
| Search appearance | Google Search Console |
| Rich results | Google Rich Results Test |
| Time on schedule page | Analytics engagement |
| Support tickets | Help desk volume |

### Testing Your Implementation

**1. Google Rich Results Test**
```
https://search.google.com/test/rich-results
```
Paste your URL - should show Event rich results.

**2. Schema.org Validator**
```
https://validator.schema.org/
```
Validates your JSON-LD structure.

**3. Manual AI Test**
Ask an AI assistant:
- "What are the dates for [Your Conference]?"
- "How much does [Your Conference] cost?"
- "Where is [Your Conference] located?"

If the AI can answer accurately, your structured data is working.

## Common Mistakes to Avoid

### ❌ Dates Without Timezone

```html
<!-- WRONG: No timezone -->
<time datetime="2026-06-15">June 15, 2026</time>

<!-- RIGHT: With timezone -->
<time datetime="2026-06-15T09:00:00+01:00">June 15, 2026, 9:00 AM BST</time>
```

### ❌ Prices Without Currency

```html
<!-- WRONG: Just a number -->
"price": "299"

<!-- RIGHT: With currency -->
"price": "299.00",
"priceCurrency": "GBP"
```

### ❌ Location Without Full Address

```html
<!-- WRONG: Just venue name -->
"location": "ExCeL London"

<!-- RIGHT: Full structured address -->
"location": {
  "@type": "Place",
  "name": "ExCeL London",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Royal Victoria Dock",
    "addressLocality": "London",
    "postalCode": "E16 1XL",
    "addressCountry": "GB"
  }
}
```

### ❌ Sessions Without Parent Event Link

```html
<!-- WRONG: Orphaned session -->
{
  "@type": "Event",
  "name": "Workshop Session"
}

<!-- RIGHT: Linked to parent -->
{
  "@type": "Event",
  "name": "Workshop Session",
  "superEvent": {
    "@type": "Event",
    "name": "Main Conference 2026",
    "url": "https://example.com"
  }
}
```

### ❌ Registration Form Without Labels

```html
<!-- WRONG: Placeholder only -->
<input type="email" placeholder="Email">

<!-- RIGHT: Proper label -->
<label for="email">Email Address *</label>
<input type="email" id="email" name="email" required aria-required="true">
```

## Budget and Timeline

### Minimum Viable MX (Level 1)

**Cost:** £500-1,500 or 1-2 days internal dev time

**Timeline:** 1 week

**Deliverables:**
- Schema.org Event on landing page
- MX meta tags
- Machine-readable dates
- Basic ticket pricing in structured data

### Full Compliance (Level 2)

**Cost:** £2,000-5,000 or 3-5 days internal dev time

**Timeline:** 2-3 weeks

**Deliverables:**
- Schema.org on all page types
- Speaker and session structured data
- iCalendar integration
- Accessible registration form
- Venue with geo coordinates

### Advanced Implementation (Level 3)

**Cost:** £5,000-15,000 or 1-3 weeks internal dev time

**Timeline:** 4-8 weeks

**Deliverables:**
- Real-time availability
- Public API
- Schedule builder
- Mobile app integration
- Multi-language support

## Communicating to Stakeholders

### For Your Board/Leadership

> "AI assistants are becoming a primary way people discover events. Without structured data on our website, our conference won't appear when someone asks their AI assistant to 'find relevant conferences.' This is a 2-5 day investment that positions us for the AI-discovery era while also improving our Google search rankings and accessibility compliance."

### For Your Marketing Team

> "MX compliance makes our event discoverable by AI agents. When someone says 'find tech conferences in London,' we want to appear in those results. It also enables rich results in Google search - showing our dates, prices, and location directly in search results."

### For Your Technical Team

> "We need to add Schema.org JSON-LD to our event pages - Event type on the main page, EventSeries on schedule, Person on speaker pages, Place on venue. Plus consistent data-* attributes on session elements and proper datetime formatting."

## Checklist: Quick Start

### Week 1: Foundation

- [ ] Add Schema.org Event to landing page
- [ ] Add MX meta tags to all pages
- [ ] Ensure all dates use `<time datetime="">` format
- [ ] Test with Google Rich Results Test

### Week 2: Expansion

- [ ] Add Schema.org to schedule page (EventSeries)
- [ ] Add Schema.org to speaker pages (Person)
- [ ] Add Schema.org to venue page (Place)
- [ ] Implement calendar download (ICS)

### Week 3: Polish

- [ ] Structure session data with data-* attributes
- [ ] Add OfferCatalog to registration page
- [ ] Review registration form accessibility
- [ ] Test with AI assistants

### Ongoing

- [ ] Update Schema.org when event details change
- [ ] Monitor Google Search Console for errors
- [ ] Track discovery metrics
- [ ] Collect attendee feedback on AI discovery

## Getting Help

### DIY Resources

- [MX Conference Specification](../../docs/structure/mx-compliance-conference.md) ("MX-Compliant Conference Website Specification" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/mx-compliance-conference.md>) ("MX-Compliant Conference Website Specification" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/mx-compliance-conference.md>) ("MX-Compliant Conference Website Specification" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/mx-compliance-conference.md>) - Technical spec
- [Schema.org Event](https://schema.org/Event) - Official documentation
- [Google Event Guide](https://developers.google.com/search/docs/data-types/event) - Implementation guide

### Agency Support

Look for agencies that offer:
- Schema.org implementation
- Accessibility audits
- Conference website development
- MX compliance certification

### Platform Vendors

Ask your conference platform vendor:
- "Do you support Schema.org Event markup?"
- "Can I add custom meta tags?"
- "Do you have an API for session data?"
- "Is the registration form WCAG 2.1 AA compliant?"

## Related Documentation

- [MX Conference Specification](../../docs/structure/mx-compliance-conference.md) - Full technical requirements
- [Webpage Compliance](../../docs/structure/mx-compliance.md) ("MX-Compliant Webpage Specification" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/mx-compliance.md>) - Base HTML requirements
- [Developers Guide](./developers.md) ("MX Compliance for Developers" at <https://github.com/ddttom/invisible-users/blob/main/ingest/use-cases/developers.md>) - Implementation patterns
- [CLAUDE.md](../../CLAUDE.md) ("CLAUDE.md" at <https://github.com/ddttom/invisible-users/blob/main/CLAUDE.md>) - MX concepts overview
