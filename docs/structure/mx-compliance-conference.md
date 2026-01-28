---
title: "MX-Compliant Conference Website Specification"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Specification for Machine Experience (MX) compliant conference and event websites. Defines metadata, Schema.org markup, and structural requirements for AI agent discoverability."
keywords: [mx-compliance, conference-website, events, schema-org, ai-agents, schedule, speakers]
ai-instruction: |
  This document defines compliance requirements for MX-certified conference and event websites.
  Conference sites have specific content types (events, sessions, speakers, venues) that require
  specialised Schema.org markup and metadata patterns.
---

# MX-Compliant Conference Website Specification

Requirements for Machine Experience (MX) certified conference and event websites.

## Overview

Conference websites serve a unique dual purpose: human attendees need to find sessions and plan their schedule, while AI agents increasingly help users discover relevant events, book attendance, and navigate conference content.

**Scope:** Websites for:

- Conferences and conventions
- Trade shows and exhibitions
- Seminars and workshops
- Meetups and community events
- Virtual and hybrid events
- Recurring event series

**Core Principle:** Conference data is highly structured. Leveraging Schema.org Event vocabulary and explicit metadata enables AI agents to help users find, compare, and register for relevant sessions.

## Why MX Compliance Matters for Conferences

### The AI Discovery Opportunity

```text
Traditional Conference Discovery:
User → Search "AI conferences 2026" → Browse results → Visit sites → Compare manually

AI-Assisted Conference Discovery:
User → "Find AI conferences in London, March 2026, under £500" → Agent returns options
```

MX-compliant conference sites are discoverable by AI agents, appearing in these queries.

### The Booking Assistant Trend

AI assistants increasingly handle:
- Conference research and comparison
- Registration on behalf of users
- Schedule building and reminders
- Travel and accommodation coordination

Sites without structured data are invisible to these assistants.

## Page Types and Requirements

### 1. Conference Landing Page

The main entry point for the event.

**Required MX Meta Tags:**
```html
<head>
  <meta name="mx-compliant" content="true">
  <meta name="mx-version" content="1.0">
  <meta name="mx-content-type" content="conference">
  <meta name="mx-state" content="published">
  <meta name="mx-event-status" content="scheduled">
</head>
```

**Required Schema.org (Event):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "MX Conference 2026",
  "description": "The premier conference for Machine Experience practitioners",
  "startDate": "2026-06-15T09:00:00+01:00",
  "endDate": "2026-06-17T18:00:00+01:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "ExCeL London",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Royal Victoria Dock",
      "addressLocality": "London",
      "postalCode": "E16 1XL",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5085,
      "longitude": 0.0294
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "MX Foundation",
    "url": "https://mx-foundation.org"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Early Bird Ticket",
      "price": "299.00",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01",
      "validThrough": "2026-03-31",
      "url": "https://example.com/register"
    },
    {
      "@type": "Offer",
      "name": "Standard Ticket",
      "price": "499.00",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-04-01",
      "url": "https://example.com/register"
    }
  ],
  "image": "https://example.com/images/conference-banner.jpg",
  "url": "https://example.com/conference-2026",
  "keywords": "machine experience, AI, accessibility, web development"
}
</script>
```

**Event Status Values:**

| Status | Schema.org Value | Usage |
|--------|------------------|-------|
| Scheduled | `EventScheduled` | Confirmed, happening as planned |
| Postponed | `EventPostponed` | Delayed, new date TBD |
| Rescheduled | `EventRescheduled` | Moved to new date |
| Cancelled | `EventCancelled` | No longer happening |
| Online | `MoveOnline` | Changed to virtual |

**Event Attendance Mode:**

| Mode | Schema.org Value |
|------|------------------|
| In-person | `OfflineEventAttendanceMode` |
| Virtual | `OnlineEventAttendanceMode` |
| Hybrid | `MixedEventAttendanceMode` |

### 2. Schedule/Agenda Page

Lists all sessions with times and tracks.

**Required MX Meta Tags:**
```html
<meta name="mx-content-type" content="schedule">
<meta name="mx-schedule-days" content="3">
<meta name="mx-total-sessions" content="45">
```

**Required Schema.org (EventSeries with sub-events):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "EventSeries",
  "name": "MX Conference 2026 Sessions",
  "subEvent": [
    {
      "@type": "Event",
      "name": "Keynote: The Future of MX",
      "startDate": "2026-06-15T09:30:00+01:00",
      "endDate": "2026-06-15T10:30:00+01:00",
      "location": {
        "@type": "Place",
        "name": "Main Hall"
      },
      "performer": {
        "@type": "Person",
        "name": "Jane Smith"
      },
      "about": {
        "@type": "Thing",
        "name": "Keynote"
      }
    },
    {
      "@type": "Event",
      "name": "Workshop: Implementing MX Compliance",
      "startDate": "2026-06-15T11:00:00+01:00",
      "endDate": "2026-06-15T12:30:00+01:00",
      "location": {
        "@type": "Place",
        "name": "Workshop Room A"
      },
      "performer": {
        "@type": "Person",
        "name": "Tom Cranstoun"
      },
      "about": {
        "@type": "Thing",
        "name": "Technical Workshop"
      }
    }
  ]
}
</script>
```

**HTML Structure for Schedule:**
```html
<main role="main">
  <h1>Conference Schedule</h1>

  <nav aria-label="Schedule days">
    <ul role="tablist">
      <li><a role="tab" aria-selected="true" href="#day-1">Day 1 - June 15</a></li>
      <li><a role="tab" aria-selected="false" href="#day-2">Day 2 - June 16</a></li>
      <li><a role="tab" aria-selected="false" href="#day-3">Day 3 - June 17</a></li>
    </ul>
  </nav>

  <section id="day-1" role="tabpanel" aria-labelledby="day-1-tab">
    <h2>Day 1 - Monday, June 15</h2>

    <article class="session" data-session-id="keynote-1" data-track="main" data-time="09:30">
      <h3>
        <a href="/sessions/future-of-mx">Keynote: The Future of MX</a>
      </h3>
      <p class="session-meta">
        <time datetime="2026-06-15T09:30:00+01:00">09:30</time> -
        <time datetime="2026-06-15T10:30:00+01:00">10:30</time> |
        <span class="location">Main Hall</span> |
        <span class="track">Keynote</span>
      </p>
      <p class="speaker">
        <a href="/speakers/jane-smith">Jane Smith</a>, CEO, MX Foundation
      </p>
    </article>

    <!-- More sessions... -->
  </section>
</main>
```

**Data Attributes for Sessions:**

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `data-session-id` | Unique identifier | `"keynote-1"` |
| `data-track` | Session track/category | `"technical"` |
| `data-time` | Start time (24hr) | `"09:30"` |
| `data-duration` | Length in minutes | `"60"` |
| `data-room` | Room/location | `"hall-a"` |
| `data-level` | Difficulty level | `"intermediate"` |

### 3. Session Detail Page

Individual session information.

**Required Schema.org:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Implementing MX Compliance in Enterprise CMS",
  "description": "A hands-on workshop covering MX compliance implementation...",
  "startDate": "2026-06-15T14:00:00+01:00",
  "endDate": "2026-06-15T15:30:00+01:00",
  "duration": "PT1H30M",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Workshop Room B",
    "containedInPlace": {
      "@type": "Place",
      "name": "ExCeL London"
    }
  },
  "performer": [
    {
      "@type": "Person",
      "name": "Tom Cranstoun",
      "jobTitle": "MX Architect",
      "worksFor": {
        "@type": "Organization",
        "name": "Digital Domain Technologies"
      }
    }
  ],
  "about": [
    { "@type": "Thing", "name": "Machine Experience" },
    { "@type": "Thing", "name": "CMS" },
    { "@type": "Thing", "name": "Web Development" }
  ],
  "audience": {
    "@type": "Audience",
    "audienceType": "Developers, Technical Architects"
  },
  "typicalAgeRange": "18-",
  "isAccessibleForFree": false,
  "maximumAttendeeCapacity": 50,
  "remainingAttendeeCapacity": 12,
  "superEvent": {
    "@type": "Event",
    "name": "MX Conference 2026",
    "url": "https://example.com/conference-2026"
  }
}
</script>
```

**Session Metadata:**
```html
<meta name="mx-content-type" content="session">
<meta name="mx-session-track" content="technical">
<meta name="mx-session-level" content="intermediate">
<meta name="mx-session-format" content="workshop">
<meta name="mx-session-capacity" content="50">
<meta name="mx-session-available" content="12">
```

### 4. Speaker Profile Page

Individual speaker information.

**Required Schema.org (Person):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Tom Cranstoun",
  "jobTitle": "MX Architect",
  "description": "Author of 'The Invisible Users' and advocate for Machine Experience...",
  "image": "https://example.com/speakers/tom-cranstoun.jpg",
  "url": "https://example.com/speakers/tom-cranstoun",
  "sameAs": [
    "https://linkedin.com/in/tomcranstoun",
    "https://twitter.com/tomcranstoun",
    "https://github.com/ddttom"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Digital Domain Technologies",
    "url": "https://digitaldomain.tech"
  },
  "knowsAbout": ["Machine Experience", "Web Accessibility", "AI Agents"],
  "performerIn": [
    {
      "@type": "Event",
      "name": "Implementing MX Compliance in Enterprise CMS",
      "url": "https://example.com/sessions/mx-compliance-cms"
    },
    {
      "@type": "Event",
      "name": "Panel: The Future of Web Development",
      "url": "https://example.com/sessions/future-panel"
    }
  ]
}
</script>
```

**Speaker Metadata:**
```html
<meta name="mx-content-type" content="speaker">
<meta name="mx-speaker-id" content="tom-cranstoun">
<meta name="mx-speaker-sessions" content="2">
```

### 5. Speakers Directory Page

List of all speakers.

**Required Schema.org (ItemList):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "MX Conference 2026 Speakers",
  "numberOfItems": 32,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Person",
        "name": "Jane Smith",
        "url": "https://example.com/speakers/jane-smith"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Person",
        "name": "Tom Cranstoun",
        "url": "https://example.com/speakers/tom-cranstoun"
      }
    }
  ]
}
</script>
```

### 6. Venue Page

Location and logistics information.

**Required Schema.org (Place):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Place",
  "name": "ExCeL London",
  "description": "Europe's largest exhibition and convention centre",
  "image": "https://example.com/venue/excel-exterior.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Royal Victoria Dock, 1 Western Gateway",
    "addressLocality": "London",
    "postalCode": "E16 1XL",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.5085,
    "longitude": 0.0294
  },
  "hasMap": "https://maps.google.com/?q=ExCeL+London",
  "telephone": "+44 20 7069 5000",
  "url": "https://excel.london",
  "publicAccess": true,
  "isAccessibleForFree": false,
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Wheelchair Access", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Parking", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Catering", "value": true }
  ],
  "containsPlace": [
    { "@type": "MeetingRoom", "name": "Main Hall", "maximumAttendeeCapacity": 2000 },
    { "@type": "MeetingRoom", "name": "Workshop Room A", "maximumAttendeeCapacity": 50 },
    { "@type": "MeetingRoom", "name": "Workshop Room B", "maximumAttendeeCapacity": 50 }
  ]
}
</script>
```

**Venue Metadata:**
```html
<meta name="mx-content-type" content="venue">
<meta name="mx-venue-capacity" content="2000">
<meta name="mx-venue-accessibility" content="full">
```

### 7. Registration Page

Ticket purchase and registration.

**Required Schema.org (Offer):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "name": "MX Conference 2026 Tickets",
  "itemListElement": [
    {
      "@type": "Offer",
      "name": "Early Bird Full Conference",
      "description": "Access to all sessions, workshops, and networking events",
      "price": "299.00",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock",
      "inventoryLevel": {
        "@type": "QuantitativeValue",
        "value": 150
      },
      "validFrom": "2026-01-01T00:00:00Z",
      "validThrough": "2026-03-31T23:59:59Z",
      "eligibleQuantity": {
        "@type": "QuantitativeValue",
        "maxValue": 5
      },
      "itemOffered": {
        "@type": "Event",
        "name": "MX Conference 2026"
      }
    },
    {
      "@type": "Offer",
      "name": "Day Pass",
      "description": "Single day access",
      "price": "149.00",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Virtual Access",
      "description": "Live stream and recordings",
      "price": "99.00",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock"
    }
  ]
}
</script>
```

**Registration Form Requirements:**

```html
<form action="/api/register" method="POST" data-form-state="idle">
  <fieldset>
    <legend>Attendee Information</legend>

    <div class="field">
      <label for="name">Full Name *</label>
      <input type="text" id="name" name="name" required
             aria-required="true"
             autocomplete="name">
    </div>

    <div class="field">
      <label for="email">Email Address *</label>
      <input type="email" id="email" name="email" required
             aria-required="true"
             autocomplete="email">
    </div>

    <div class="field">
      <label for="company">Company/Organisation</label>
      <input type="text" id="company" name="company"
             autocomplete="organization">
    </div>
  </fieldset>

  <fieldset>
    <legend>Ticket Selection</legend>

    <div class="field">
      <input type="radio" id="ticket-early" name="ticket" value="early-bird"
             data-price="299" data-currency="GBP">
      <label for="ticket-early">
        Early Bird Full Conference - £299
        <span class="availability">(150 remaining)</span>
      </label>
    </div>

    <div class="field">
      <input type="radio" id="ticket-standard" name="ticket" value="standard"
             data-price="499" data-currency="GBP">
      <label for="ticket-standard">
        Standard Full Conference - £499
      </label>
    </div>
  </fieldset>

  <fieldset>
    <legend>Accessibility Requirements</legend>

    <div class="field">
      <input type="checkbox" id="wheelchair" name="accessibility[]" value="wheelchair">
      <label for="wheelchair">Wheelchair access required</label>
    </div>

    <div class="field">
      <input type="checkbox" id="hearing" name="accessibility[]" value="hearing-loop">
      <label for="hearing">Hearing loop required</label>
    </div>

    <div class="field">
      <label for="dietary">Dietary requirements</label>
      <select id="dietary" name="dietary">
        <option value="">None</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="halal">Halal</option>
        <option value="kosher">Kosher</option>
        <option value="gluten-free">Gluten-free</option>
        <option value="other">Other (specify below)</option>
      </select>
    </div>
  </fieldset>

  <button type="submit" data-loading="false">
    Complete Registration
  </button>
</form>
```

## iCalendar Integration

Provide downloadable calendar files with proper metadata.

**ICS File Requirements:**

```text
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MX Conference//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:MX Conference 2026
X-WR-TIMEZONE:Europe/London

BEGIN:VEVENT
UID:session-keynote-1@example.com
DTSTAMP:20260115T090000Z
DTSTART;TZID=Europe/London:20260615T093000
DTEND;TZID=Europe/London:20260615T103000
SUMMARY:Keynote: The Future of MX
DESCRIPTION:Opening keynote by Jane Smith exploring the future of Machine Experience
LOCATION:Main Hall, ExCeL London
URL:https://example.com/sessions/future-of-mx
ORGANIZER;CN="MX Conference":mailto:info@example.com
CATEGORIES:Keynote
STATUS:CONFIRMED
END:VEVENT

END:VCALENDAR
```

**HTML Download Links:**

```html
<a href="/schedule.ics"
   download="mx-conference-2026.ics"
   aria-label="Download full conference schedule as calendar file">
  Add to Calendar (All Sessions)
</a>

<a href="/sessions/keynote-1.ics"
   download="keynote-future-of-mx.ics"
   aria-label="Add this session to your calendar">
  Add to Calendar
</a>
```

## Navigation Requirements

### Breadcrumb Navigation

```html
<nav aria-label="Breadcrumb">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/"><span itemprop="name">Home</span></a>
      <meta itemprop="position" content="1">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/schedule"><span itemprop="name">Schedule</span></a>
      <meta itemprop="position" content="2">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span itemprop="name">Keynote: The Future of MX</span>
      <meta itemprop="position" content="3">
    </li>
  </ol>
</nav>
```

### Main Navigation

```html
<nav role="navigation" aria-label="Main">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/schedule">Schedule</a></li>
    <li><a href="/speakers">Speakers</a></li>
    <li><a href="/venue">Venue</a></li>
    <li><a href="/register" class="cta">Register</a></li>
  </ul>
</nav>
```

## Virtual/Hybrid Event Extensions

For events with online components.

**Virtual Event Schema:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "MX Conference 2026",
  "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
  "location": [
    {
      "@type": "Place",
      "name": "ExCeL London",
      "address": { /* physical address */ }
    },
    {
      "@type": "VirtualLocation",
      "url": "https://example.com/live-stream",
      "name": "MX Conference Live Stream"
    }
  ]
}
</script>
```

**Virtual Session Requirements:**
```html
<meta name="mx-session-format" content="hybrid">
<meta name="mx-stream-url" content="https://example.com/live/session-1">
<meta name="mx-recording-available" content="true">
```

## Accessibility Requirements

### Physical Accessibility Information

Clearly document venue accessibility:

```html
<section aria-labelledby="accessibility-heading">
  <h2 id="accessibility-heading">Accessibility Information</h2>

  <h3>Mobility</h3>
  <ul>
    <li>All areas wheelchair accessible</li>
    <li>Accessible parking available (pre-book required)</li>
    <li>Accessible toilets on all floors</li>
    <li>Lift access to all levels</li>
  </ul>

  <h3>Hearing</h3>
  <ul>
    <li>Hearing loops in all session rooms</li>
    <li>Sign language interpretation (pre-book required)</li>
    <li>Live captioning on main stage sessions</li>
  </ul>

  <h3>Visual</h3>
  <ul>
    <li>Guide dogs welcome</li>
    <li>Large print materials available</li>
    <li>High contrast signage</li>
  </ul>

  <h3>Request Accommodations</h3>
  <p>
    Contact <a href="mailto:accessibility@example.com">accessibility@example.com</a>
    at least 14 days before the event.
  </p>
</section>
```

### Digital Accessibility

- All pages WCAG 2.1 AA compliant
- Schedule filterable by accessibility features
- Registration form captures accessibility needs
- Virtual content has captions and transcripts

## Validation Checklist

### Conference Landing Page
- [ ] MX meta tags present
- [ ] Schema.org Event with all required fields
- [ ] Event status clearly indicated
- [ ] Dates in ISO 8601 format with timezone
- [ ] Location with full address and geo coordinates
- [ ] At least one Offer (ticket type)
- [ ] Organizer information

### Schedule Page
- [ ] MX meta tags with session count
- [ ] Schema.org EventSeries with sub-events
- [ ] Each session has unique ID
- [ ] Times in both human-readable and datetime
- [ ] Track/category data attributes
- [ ] Accessible day/tab navigation

### Session Pages
- [ ] Schema.org Event with performer(s)
- [ ] Duration in ISO 8601 format
- [ ] Capacity and availability
- [ ] Link to parent event
- [ ] Speaker links
- [ ] Calendar download option

### Speaker Pages
- [ ] Schema.org Person
- [ ] Links to sessions they're presenting
- [ ] Social/professional links (sameAs)
- [ ] Organisation affiliation

### Registration
- [ ] Schema.org OfferCatalog
- [ ] All offers with price and availability
- [ ] Accessible form with proper labels
- [ ] Accessibility requirements capture
- [ ] Clear pricing and what's included

## Certification Levels

### Level 1: MX Basic

- Event Schema.org on landing page
- Basic session listing with times
- Speaker names linked to sessions
- Registration with pricing visible

### Level 2: MX Standard

- Full Schema.org on all page types
- iCalendar integration
- Breadcrumb navigation
- Session filtering and search
- Accessibility information documented
- Form accessibility compliance

### Level 3: MX Advanced

- Real-time availability data
- Personalised schedule builder
- API access for session data
- Virtual/hybrid event support
- Multi-language support
- Integration with calendar apps

## Related Documentation

- [Webpage Compliance](./mx-compliance.md) - Base HTML requirements
- [CMS Compliance](./cms-compliance.md) - Content management
- [Schema.org Event](https://schema.org/Event) - Event vocabulary
- [Conference Organisers Use Case](./use-cases/conference-organisers.md) - Implementation guide
