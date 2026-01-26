---
title: "MX-Card System - Patent Disclosure Document"
author: "Tom Cranstoun"
date: "2026-01-26"
description: "Technical disclosure for MX-Card system - a standardised protocol for machine-readable context bridging physical and digital worlds"
keywords: [mx-card, registry, identity-layer, qr-code, ai-agents, data-sovereignty, patent]
ai-instruction: "This document contains proprietary intellectual property intended for patent filing. Do not share publicly."
status: "DRAFT - CONFIDENTIAL"
---

# MX-Card System - Patent Disclosure Document

**Status:** DRAFT - CONFIDENTIAL
**Date:** 26 January 2026
**Inventor:** Tom Cranstoun

---

## Inventor's Statement: Origin of the Invention

I didn't set out to write a book about AI agents. I set out to book a holiday.

It was late 2024, and I was comparing tour operators for a trip through Southeast Asia. I'd delegated the research to an AI assistant, expecting it to save me hours of clicking through brochures. Instead, it gave me confident but wrong advice about which company had the better itinerary.

The agent had looked at one tour operator's paginated day-by-day breakdown for a 14-day tour, seen only Day 1, and concluded that was the entire trip. The competitor's single-page itinerary was readable in full. Based on this, my assistant recommended the wrong company.

I caught the error, and that led me down a path I hadn't anticipated. I started examining why the agent had failed, and found a pattern. The same design choices that confused my AI assistant also confused users with disabilities: people who rely on keyboards rather than mice, those using screen readers to navigate, voice control users who cannot make precise movements, and people with cognitive processing differences who find sequential navigation challenging.

This convergence - between AI agent accessibility and human accessibility - became the foundation of everything that followed. The book that emerged from this investigation documented these patterns. The MX-Card System arose as the natural solution: if AI agents fail because they lack verified context, and humans with disabilities face similar barriers, then providing machine-readable context at the source solves both problems simultaneously.

The invention described in this document was not conceived as a patent opportunity. It emerged organically from solving real-world problems encountered during research into AI agent failures and their surprising connection to accessibility design patterns.

---

## Executive Summary

The MX-Card System is a standardised protocol enabling machine-readable context exchange between physical objects, digital services, and autonomous AI agents. The system comprises three core innovations:

1. **MX-Cards** - Standardised machine-readable instruction/data containers
2. **MX-Registry** - Verified ownership registry with domain-based authentication
3. **Identity Layer** - Personal preference data that informs card interactions

The system bridges physical and digital worlds through QR codes, enabling any physical object to provide machine-readable context to AI agents, robots, phones, cars, and LLMs.

**Core Value Proposition: Anti-Hallucination Infrastructure**

MX-Cards provide verified, authoritative context directly to AI agents, eliminating the need for LLMs to:
- Guess or infer information about physical objects
- Spend tokens researching context that could be provided directly
- Risk hallucination when authoritative information is unavailable

By embedding verified context at the source, MX-Cards reduce both computational cost and error rates for AI agent interactions.

**Environmental Impact: Reducing AI Energy Consumption**

Every AI inference consumes energy. When agents must guess, research, or make multiple attempts to understand context, energy is wasted. MX-Cards provide a direct pathway to verified information, dramatically reducing:
- Inference cycles (no guessing, no retries)
- Web scraping and research operations
- Token generation for context-building prompts
- Failed interactions requiring human intervention

At scale, this represents significant energy savings - a critical consideration as AI usage grows exponentially.

---

## Universal Application

MX-Cards are designed for ubiquitous deployment across all contexts where machines need verified information:

| Domain | Applications |
|--------|-------------|
| **Cultural** | Artworks, museum exhibits, sculptures, monuments, blue plaques |
| **Commercial** | Shop fronts, product displays, point-of-sale, receipts |
| **Legal** | Contracts, certificates, licenses, permits, deeds |
| **Infrastructure** | Bus stops, street signs, parking meters, utilities |
| **Property** | Buildings, rooms, equipment, vehicles, assets |
| **Events** | Posters, tickets, programmes, schedules |
| **Documents** | Reports, invoices, warranties, manuals |

Every physical object that an AI agent might need to understand becomes a potential MX-Card location.

---

## Problem Statement

Current challenges in machine-agent interactions:

1. **AI hallucination risk** - LLMs forced to guess or infer information about physical objects, locations, and services when authoritative data is unavailable
2. **Token expenditure waste** - Agents spend computational resources researching context that could be provided directly at source
3. **No standardised format** for providing machine-readable instructions at physical locations
4. **No verification mechanism** to prove authority over a location or service
5. **No portable identity** allowing users to share preferences with services (menus, allergies, accessibility needs)
6. **No bridge** between physical objects and AI agent capabilities
7. **Data sovereignty concerns** when sharing personal information across jurisdictions

**The Hallucination Problem:**

When an AI agent encounters a physical object (artwork, legal document, shop front, certificate), it currently has two options:
1. **Guess** based on training data → Risk of hallucination
2. **Research** by fetching web content → Token expenditure, latency, still may hallucinate

MX-Cards solve this by providing verified, authoritative context at the point of need.

---

## Technical Specification

### 1. MX-Card Architecture

An MX-Card is a structured data container with the following properties:

#### 1.1 Card Types

| Type | Description | Cost Model |
|------|-------------|------------|
| **Plain Card** | Basic machine-readable instructions | Free |
| **Time-Limited Card** | Expires after specified duration | Paid tier |
| **Scheduled Card** | Active only during specified time windows | Paid tier |
| **Encrypted Card** | Requires authorised token for decryption | Paid tier |
| **Identity Card** | Personal onboard card with identity layer | App included |

#### 1.2 Card Capabilities

- **Context provision** - Provide information about a location, service, or object
- **Instruction delivery** - Machine-readable instructions for AI agents
- **Feedback collection** - Enable structured feedback from discoverers
- **Owner contact routine** - Card can contain routine to contact owner before responding to discoverer
- **Access control** - Encrypted cards with authorised tokens and access levels
- **Scheduling** - Time-limited and scheduled activation windows

#### 1.3 Card Data Structure (Proposed)

```json
{
  "@context": "https://mx-registry.org/schema/v1",
  "@type": "MXCard",
  "cardId": "uuid-v4",
  "version": "1.0",
  "owner": {
    "registryId": "domain-verified-id",
    "domain": "example.com",
    "verificationToken": "..."
  },
  "metadata": {
    "created": "ISO-8601",
    "expires": "ISO-8601 | null",
    "schedule": {
      "activeWindows": [],
      "timezone": "IANA-timezone"
    }
  },
  "access": {
    "encryption": "none | aes-256-gcm",
    "requiredTokens": [],
    "accessLevels": ["public", "authenticated", "privileged"]
  },
  "content": {
    "type": "context | instruction | feedback | menu | identity",
    "payload": {},
    "contactRoutine": {
      "enabled": false,
      "method": "webhook | email | sms",
      "beforeResponse": true
    }
  },
  "sovereignty": {
    "dataResidency": "EU | US | UK | ...",
    "jurisdiction": "GDPR | CCPA | ...",
    "retentionPolicy": "..."
  }
}
```

### 2. MX-Registry System

The Registry provides verified ownership and discovery services.

#### 2.1 Registration Requirements

**Business Users:**
- Proof of domain ownership (DNS TXT record or meta tag)
- Signed account agreement
- Domain-bound verification token
- Annual fee: £100 per card per year

**Open Source Users:**
- Verification token on GitHub or similar public repository
- Reduced pricing to encourage adoption
- Community contribution requirements (optional)

#### 2.2 Verification Flow

```
1. User registers domain with Registry
2. Registry generates unique verification token
3. User places token at:
   - Business: DNS TXT record OR website meta tag
   - Open Source: GitHub repository file
4. Registry validates token placement
5. Domain ownership confirmed
6. Cards can be registered against verified domain
```

#### 2.3 Data Sovereignty Compliance

- Cards specify data residency requirements
- Registry routes data to appropriate jurisdiction
- GDPR, CCPA, and other regulatory compliance built-in
- User controls where their data is stored and processed

### 3. Identity Layer

A portable personal data container that travels with the user. Supports **context-switching** for different situations.

#### 3.1 Identity Layer Contents

| Category | Examples | Inheritance |
|----------|----------|-------------|
| **Dietary** | Allergies, intolerances, preferences | Informs Menu Cards |
| **Accessibility** | Mobility, vision, hearing needs | Informs Location Cards |
| **Communication** | Language, contact preferences | Informs All Cards |
| **Authentication** | Verified credentials, tokens | Access Control |
| **Interests** | Topics, hobbies, professional focus | Informs Discovery Alerts |
| **Context Mode** | Work, transport, vacation, event | Modifies All Responses |

#### 3.2 Context-Switching Identity Layers

Users can maintain **multiple identity layer profiles** and switch between them based on context:

| Context | Active Interests | Notifications |
|---------|------------------|---------------|
| **Work Mode** | Professional topics, industry news | Meeting rooms, office services |
| **Transport Mode** | Route info, accessibility | Arrivals, connections, delays |
| **Vacation Mode** | Tourism, restaurants, attractions | Local experiences, discounts |
| **Event Mode** | Event-specific (museum, sports, concert) | Exhibits, facilities, schedules |
| **Home Mode** | Local services, community | Neighbourhood updates |

**Event-Specific Temporary Layers:**

When visiting a museum, sports ground, or venue, the app can create a **temporary identity layer** exposing different interests than normal:

```
Normal Identity Layer:
  interests: [technology, cooking, cycling]

Museum Visit Layer (temporary):
  interests: [art history, impressionism, sculpture]
  accessibility: [audio descriptions preferred]
  expires: end of visit
```

**Beacon Interest Matching:**

When a beacon is detected, the system checks if the card matches the user's active identity layer interests:

```
1. Beacon detected → Card retrieved
2. Card topics: [impressionism, Monet, 19th century]
3. User interests: [impressionism, art history]
4. Match found → Notification: "Monet's Water Lilies ahead - audio guide available"
```

#### 3.3 Inheritance Model

```
Identity Layer (Personal)
    ↓ informs
Menu Preferences
    ↓ inherited by
Restaurant Menu Card
    ↓ filters
Personalised Menu Response
```

Example: User's allergy information in Identity Layer automatically filters menu options when interacting with a restaurant's Menu Card.

#### 3.3 Privacy Controls

- Identity Layer can remain on-device (never shared)
- Selective sharing: share only relevant portions
- Encrypted transmission when shared
- Revocable access tokens
- Audit trail of all shares

### 4. Discovery Mechanisms

MX-Cards can be discovered through multiple channels, not limited to visual interfaces.

#### 4.1 QR Code Discovery

QR codes serve as the primary visual physical-digital bridge.

| Location | Use Case |
|----------|----------|
| **Artworks** | Artist, provenance, context, interpretation, purchase info |
| **Legal Documents** | Verification, signing authority, amendment history |
| **Certificates** | Authenticity verification, issuer details, validity period |
| **Shop Fronts** | Business hours, services, accessibility, real-time availability |
| **Posters/Signs** | Event information, instructions, feedback |
| **Bus Stops** | Real-time arrivals, route information for agents |
| **Premises** | Business hours, services, accessibility info |
| **Blue Plaques** | Historical context, related information |
| **Vehicles** | Service information, booking, feedback |
| **Property** | Personalised visitor instructions |
| **Products** | Manuals, support, recycling instructions |
| **Receipts/Invoices** | Transaction verification, warranty activation |
| **Permits/Licenses** | Validity verification, authority details |

#### 4.2 QR Code Types

- **Static QR** - Links to fixed MX-Card
- **Dynamic QR** - Links to card that can be updated
- **Personalised QR** - Property-specific, owner-controlled
- **Temporary QR** - Time-limited for events

#### 4.3 Bluetooth Beacon Discovery

Bluetooth Low Energy (BLE) beacons broadcast MX-Card references for proximity-based discovery, enabling **accessibility without visual interaction**.

**How it works:**

```
1. Beacon broadcasts MX-Card identifier (UUID + card reference)
2. User's device detects beacon in range
3. App retrieves MX-Card from registry
4. Identity layer informs response (e.g., accessibility needs)
5. Personalised instructions delivered (audio, haptic, visual)
```

**Accessibility Use Case: Blind Users**

A blind user with the MX-Card app approaches a location (museum, shop, bus stop):

1. **Beacon detection** - Phone detects Bluetooth beacon
2. **Card retrieval** - App fetches the location's MX-Card
3. **Identity sharing** - User's identity layer indicates vision impairment
4. **Personalised response** - Card returns audio instructions tailored to their needs:
   - "You are entering the National Gallery. The information desk is 10 metres ahead. Touch screens have audio descriptions enabled."
   - "Bus 73 arrives in 4 minutes. Board at the front door. Tell the driver your destination."

**Key Innovation:** The same MX-Card serves both sighted users (visual info) and blind users (audio instructions) based on identity layer preferences.

#### 4.4 Other Discovery Methods

| Method | Use Case |
|--------|----------|
| **NFC Tap** | Close-proximity discovery (tap phone to object) |
| **URL/Deep Link** | Direct link in digital contexts |
| **Registry Lookup** | Search by location, domain, or category |
| **Geofencing** | Automatic discovery when entering area |
| **Voice Query** | "What MX-Card is at this location?" |

#### 4.5 Media File Metadata Embedding

MX-Card references can be embedded directly in media file metadata, enabling AI agents to understand content **without expensive analysis or guessing**.

**Supported Media Types:**

| File Type | Metadata Standard | MX-Card Field |
|-----------|-------------------|---------------|
| **Images** (JPEG, PNG, TIFF) | EXIF, XMP, IPTC | `XMP:MXCard` or custom EXIF tag |
| **PDF Documents** | PDF metadata, XMP | `pdf:MXCard` in document properties |
| **Videos** (MP4, MOV, WebM) | XMP, ID3, Matroska tags | `XMP:MXCard` sidecar or embedded |
| **Audio** (MP3, WAV, FLAC) | ID3v2, Vorbis comments | `TXXX:MXCard` frame |
| **Screenshots** | EXIF, PNG metadata | Automatic from source application |
| **Office Documents** | Custom properties | `MXCard` document property |

**How it Works:**

```
1. Creator embeds MX-Card URL/ID in file metadata
2. Browser agent encounters file (image, PDF, video)
3. Agent reads metadata BEFORE analysing content
4. MX-Card provides verified context about the file
5. No vision model inference, no guessing, no hallucination
```

**Example: Image with Embedded MX-Card**

```
Photo: museum_exhibit_47.jpg
EXIF Metadata:
  MXCard: mx://registry.mx-card.org/cards/nat-gallery-exhibit-47

Agent reads metadata → retrieves card:
  "Exhibit 47: Water Lilies by Claude Monet, 1906.
   Oil on canvas, 89.9 × 94.1 cm.
   Acquired 1927. Conservation status: Excellent.
   Photography permitted, no flash."
```

**Example: PDF Document with Embedded MX-Card**

```
Contract: lease-agreement-2026.pdf
PDF Metadata:
  MXCard: mx://registry.mx-card.org/cards/legal/lease-12345

Agent reads metadata → retrieves card:
  "Commercial lease agreement between ABC Ltd and XYZ Corp.
   Property: 123 High Street, London.
   Term: 5 years from 1 Jan 2026.
   Status: Executed. Amendments: None.
   Governing law: England and Wales."
```

**Benefits:**

| Without MX-Card | With MX-Card |
|-----------------|--------------|
| Vision model analyses image (expensive) | Metadata read (cheap) |
| OCR extracts text from PDF (error-prone) | Structured data retrieved (accurate) |
| Agent guesses video content (hallucination risk) | Verified description provided |
| Multiple inference cycles | Single metadata lookup |

**Key Innovation:** Media files become self-describing to AI agents through embedded MX-Card references, eliminating the need for expensive content analysis.

### 5. Mobile Application

Native app for card creation, management, and discovery.

#### 5.1 Core Features

- **Onboard Identity Card** - Personal identity layer storage
- **QR Scanner** - Discover and interact with MX-Cards
- **Card Creator** - Design and publish cards
- **Personalised QR Generator** - Property and personal QR codes
- **Sharing Controls** - Manage what's shared with agents/chatbots

#### 5.2 Agent/Chatbot Integration

- Cards shareable with AI agents via API
- Encrypted sharing with access tokens
- Access level management (read-only, interactive, full)
- Revocation capabilities

### 6. Error Recovery and Assistance

Humans struggle with websites. What does a spinner mean? What does 404 mean? MX-Cards provide help at the point of confusion.

#### 6.1 Error Screen Cards

Every error screen can include an MX-Card QR code providing contextual help:

| Error Type | Card Content |
|------------|--------------|
| **404 Not Found** | "Page moved to [new location]. Try [alternatives]. Contact support: [link]" |
| **Spinner/Loading** | "Processing your request. Expected time: 30 seconds. If longer, [troubleshooting steps]" |
| **500 Server Error** | "Technical issue. Status page: [link]. Try again in [time]. Save your work." |
| **Form Validation** | "Required: valid email format. Example: name@example.com" |
| **Payment Failed** | "Card declined. Reason: [specific]. Alternative payment options: [list]" |
| **Session Timeout** | "For security, you've been logged out. Your cart is saved. Log in to continue." |

**Example: 404 Error with MX-Card**
```
┌────────────────────────────────────────┐
│  404 - Page Not Found                  │
│                                        │
│  The page you requested doesn't exist. │
│                                        │
│  ┌──────┐  Scan for help              │
│  │ QR   │  or visit:                  │
│  │ CODE │  example.com/help/404       │
│  └──────┘                              │
└────────────────────────────────────────┘

QR links to MX-Card:
  "You tried to access /old-product-page.
   This product was discontinued in 2025.
   Similar products: [links]
   Search our catalog: [link]
   Contact support: [phone, email, chat]"
```

#### 6.2 Product Assistance Beacons

Physical products can include QR codes or Bluetooth beacons for assistance:

| Product Type | Assistance Card Content |
|--------------|------------------------|
| **Appliances** | Setup guide, troubleshooting, warranty registration |
| **Electronics** | Pairing instructions, firmware updates, support |
| **Furniture** | Assembly video, missing parts request, care instructions |
| **Medications** | Dosage, interactions, pharmacy contact |
| **Equipment** | Safety procedures, maintenance schedule, parts ordering |

**Key Innovation:** The responder to an assistance beacon might not be a human - it could be a household robot or MX-compliant computer system.

### 7. Machine-to-Machine Response Protocol

When a device broadcasts an assistance beacon, the responder's identity layer determines the response.

#### 7.1 Responder Types

| Responder | Identity Layer | Response Capability |
|-----------|----------------|---------------------|
| **Human with App** | Personal preferences, language | Full interaction, decision-making |
| **Household Robot** | Device capabilities, permissions | Physical assistance, task execution |
| **Smart Home Hub** | Connected devices, automation rules | System coordination, alerts |
| **Business System** | Service parameters, operating hours | Automated responses, escalation |
| **Emergency Services** | Authority level, jurisdiction | Priority response, interrogation rights |

#### 7.2 Priority-Based Escalation

Cards can specify response priorities with automatic escalation:

```
Assistance Request Card:
  priority_chain:
    1. human_first: true
       timeout: 5 minutes
    2. household_robot: true
       timeout: 2 minutes
    3. emergency_services: false
       conditions: [fire, medical, security]
```

**Example: Elderly Person Needs Help**
```
1. Beacon activated (fall detected or button pressed)
2. Card specifies: "Call human family member first"
3. No response in 5 minutes
4. Card escalates: "Alert household robot for physical check"
5. Robot confirms situation requires help
6. Card escalates: "Contact emergency services"
```

### 8. Emergency Services Integration

MX-Cards enable automated emergency response with verified identity and location.

#### 8.1 Emergency Card Structure

```json
{
  "@type": "EmergencyCard",
  "location": {
    "address": "123 High Street, London, W1A 1AA",
    "coordinates": {"lat": 51.5074, "lng": -0.1278},
    "access_instructions": "Blue door, code 4521, flat 3B"
  },
  "occupants": {
    "registered": ["John Smith (82, mobility impaired)", "Jane Smith (79)"],
    "pets": ["Dog - friendly", "Cat"]
  },
  "hazards": ["Gas heating", "Oxygen equipment in bedroom"],
  "emergency_contacts": [
    {"name": "Son - Michael", "phone": "+44..."},
    {"name": "Neighbour - Mrs Jones", "phone": "+44..."}
  ],
  "alerting_device": {
    "device_id": "smoke-detector-kitchen-001",
    "type": "smoke_detector",
    "last_test": "2026-01-15",
    "battery_status": "good"
  }
}
```

#### 8.2 Emergency Flow

```
1. FIRE DETECTED
   Smoke detector activates emergency card

2. IMMEDIATE ALERT
   Card sends to fire brigade agent:
   - Location (address + coordinates + access instructions)
   - Occupant details (elderly, mobility issues)
   - Known hazards (oxygen equipment)
   - Alerting device ID

3. SYNCHRONIZATION
   Fire brigade system acknowledges receipt
   Household system confirms: "Alert received by [Fire Station X]"

4. AUTHORIZATION CHECK
   Fire brigade can interrogate alerting device:
   - "Confirm smoke detection?" → "Yes, kitchen sensor, high reading"
   - "Other sensors?" → "No smoke in other rooms"
   - "Occupant status?" → "Motion detected in living room 2 mins ago"

5. FALSE ALARM PREVENTION
   Household system can:
   - Cancel alert within 60 seconds (burnt toast scenario)
   - Require confirmation from second sensor
   - Allow authorized occupant to dismiss with code

6. RESPONSE DISPATCH
   Fire brigade dispatches with full context:
   - Exact location and access
   - Vulnerable occupants known
   - Hazards pre-identified
   - Contact numbers ready
```

#### 8.3 Authorization and Verification

| Action | Authorization Required |
|--------|----------------------|
| **Raise alarm** | Device registration + active status |
| **Cancel alarm** | Occupant authentication (code, voice, app) |
| **Interrogate device** | Emergency services credential |
| **Access location data** | Emergency services credential |
| **Contact occupants** | Any authorized responder |
| **Dispatch response** | Emergency services internal |

#### 8.4 False Alarm Mitigation

- **Confirmation window:** 60-second cancel period for accidental triggers
- **Multi-sensor verification:** Require 2+ sensors before emergency escalation
- **Pattern detection:** Learn normal patterns (cooking smoke vs fire)
- **Human checkpoint:** "Press button to confirm emergency" before dispatch
- **Interrogation protocol:** Emergency services can query device state before dispatch

---

## Card Consumers (Humans and Machines)

MX-Cards serve **all types of consumers equally** - humans and machines are first-class citizens in the system.

### Human Consumers

| User Type | Use Case | Identity Layer Focus |
|-----------|----------|---------------------|
| **General Public** | Museums, shops, transport, events | Interests, accessibility, language |
| **Blind/Low Vision** | Audio navigation, spoken instructions | Vision accessibility, audio preferences |
| **Deaf/Hard of Hearing** | Visual alerts, text instructions | Hearing accessibility, visual preferences |
| **Mobility Impaired** | Accessible routes, facility locations | Mobility needs, assistance requirements |
| **Tourists** | Local information, translation | Language, vacation mode interests |
| **Workers** | Professional context, office services | Work mode, professional interests |

### Machine Consumers

| Machine Type | Examples | Primary Use |
|--------------|----------|-------------|
| **Robots** | Service robots, delivery bots, warehouse automation | Navigation, task instructions, obstacle info |
| **Phones** | Smartphones, tablets, wearables | Personal assistant integration |
| **Cars** | Autonomous vehicles, connected cars | Location context, services, charging |
| **LLMs** | ChatGPT, Claude, Gemini | Context for user queries |
| **IoT Devices** | Smart home, industrial sensors | Automated responses |
| **Drones** | Delivery drones, inspection drones | Landing zones, no-fly areas, delivery points |

### Universal Consumer Principle

The same MX-Card serves a robot navigating a museum and a blind person touring the same space. Both receive context appropriate to their capabilities:

```
Museum Exhibit Card:
  → Robot: "Exhibit 47. Clearance: 2.1m. No touch. Photography permitted."
  → Blind User: "You're approaching Monet's Water Lilies. Audio description available. Touch prohibited."
  → Sighted Tourist: "Claude Monet, Water Lilies, 1906. Tap for more information."
```

---

## Business Model

### Pricing Tiers

| Tier | Features | Price |
|------|----------|-------|
| **Free** | Plain cards, basic discovery | £0 |
| **Open Source** | Verified cards, GitHub integration | Reduced rate |
| **Business** | Full features, SLA, support | £100/card/year |
| **Enterprise** | Custom integration, dedicated support | Custom |

### Revenue Streams

1. Annual card registration fees
2. Premium features (encryption, scheduling)
3. Enterprise API access
4. White-label solutions
5. Analytics and insights

---

## Patent Claims (Draft)

### Claim 1: MX-Card System
A method and system for providing machine-readable context through standardised data containers (MX-Cards) that can be:
- Discovered via QR codes on physical objects
- Verified through domain-based ownership registry
- Encrypted with access-level controls
- Time-limited and scheduled for activation
- Enhanced with contact routines for owner notification

### Claim 2: Identity Layer Inheritance
A method for personal preference data (Identity Layer) to automatically inform and filter responses from discovered cards, including:
- Dietary preferences informing menu cards
- Accessibility needs informing location cards
- Hierarchical inheritance model
- Selective sharing with privacy controls

### Claim 3: Domain-Verified Card Registry
A system for registering and verifying ownership of machine-readable cards comprising:
- Domain-based verification tokens
- DNS or repository-based proof of ownership
- Tiered access for business and open-source users
- Data sovereignty compliance routing

### Claim 4: Physical-Digital Context Bridge
A method for providing machine-readable context to autonomous agents through:
- QR codes on physical objects linking to MX-Cards
- Bluetooth Low Energy (BLE) beacons broadcasting card references
- NFC tags for tap-based discovery
- Real-time card updates without physical medium changes
- Personalised codes for property owners
- Temporary codes for time-limited events

### Claim 5: Agent-to-Card Communication Protocol
A protocol enabling AI agents to:
- Discover and parse MX-Cards via QR codes or registry lookup
- Authenticate using access tokens
- Receive filtered responses based on shared identity layer
- Trigger owner contact routines before receiving responses

### Claim 6: Anti-Hallucination Context Provision
A method for reducing AI agent hallucination and token expenditure comprising:
- Embedding verified, authoritative context at physical locations via QR-linked cards
- Providing structured data that eliminates need for inference or web research
- Registry verification ensuring context authenticity and ownership authority
- Direct context injection reducing computational overhead for AI agents
- Applicable to: artworks, legal documents, certificates, shop fronts, infrastructure, and any physical object requiring machine understanding

### Claim 7: Accessibility-Informed Context Delivery
A method for delivering personalised, accessible information to users with disabilities comprising:
- Bluetooth beacon broadcast of MX-Card references for non-visual discovery
- Identity layer containing accessibility preferences (vision, hearing, mobility, cognitive)
- Automatic format adaptation based on user needs:
  - Audio instructions for blind/low-vision users
  - Visual/text for deaf/hard-of-hearing users
  - Simplified content for cognitive accessibility
  - Navigation assistance for mobility needs
- Same MX-Card serving multiple accessibility formats based on identity layer
- Real-time, location-aware assistance without requiring visual scanning
- Integration with screen readers, voice assistants, and assistive devices

**Example Flow (Blind User):**
```
Beacon broadcasts → Phone detects → App retrieves card →
Identity layer shares "vision: blind" → Card returns audio:
"You are at Platform 3. The 10:15 to Edinburgh departs in 6 minutes.
Board the third carriage for accessible seating."
```

### Claim 8: Context-Switching Identity Layers
A method for maintaining and switching between multiple identity layer profiles comprising:
- Multiple named identity profiles per user (work, transport, vacation, event, home)
- Automatic or manual context switching based on location, time, or user action
- Event-specific temporary identity layers with automatic expiration
- Interest matching between identity layer and discovered cards
- Notification when beacon/card matches active identity interests
- Profile inheritance (base preferences inherited by context-specific layers)

**Example:**
```
User enters museum → App suggests "Museum Mode"
→ Activates temporary identity layer with art interests
→ Beacons now trigger notifications for matching exhibits
→ Layer expires when user leaves venue
```

### Claim 9: Energy-Efficient AI Context Provision
A method for reducing energy consumption in AI systems comprising:
- Direct provision of verified context eliminating inference cycles
- Reduced token generation through pre-structured information
- Elimination of web scraping and research operations for context building
- Prevention of failed interactions requiring retry or human intervention
- Measurable reduction in computational resources per interaction
- Scalable energy savings as deployment increases

**Environmental Impact:**
At scale, the reduction in AI inference cycles represents significant energy savings:
- Each eliminated inference cycle saves computational resources
- Reduced web scraping eliminates redundant data transfer
- Verified context prevents retry loops from failed understanding
- Direct context injection replaces multi-step research processes

### Claim 10: Universal Consumer Protocol
A protocol enabling identical MX-Cards to serve both human and machine consumers comprising:
- Single card definition serving multiple consumer types
- Consumer-type detection (human app, robot, LLM, IoT device)
- Automatic response format adaptation based on consumer capabilities
- Consistent information across all consumer types
- Machine-specific metadata (clearances, permissions, technical specs)
- Human-specific formatting (language, accessibility, presentation)

### Claim 11: Media File Metadata Embedding
A method for embedding MX-Card references in digital media file metadata comprising:
- Standardised metadata fields for MX-Card URLs/identifiers across file formats:
  - EXIF/XMP for images (JPEG, PNG, TIFF)
  - PDF document properties
  - ID3/XMP for audio and video files
  - Custom properties for office documents
- Enabling AI agents to retrieve verified context before content analysis
- Eliminating need for expensive vision/audio model inference
- Preventing hallucination by providing authoritative file descriptions
- Supporting screenshots, PDFs, images, videos, audio files, and documents
- Automatic metadata inheritance from source applications

**Example Flow:**
```
Browser agent encounters image file
→ Reads EXIF metadata: MXCard: mx://registry/card-id
→ Retrieves card: "Photo of Exhibit 47, Monet's Water Lilies"
→ No vision model needed, verified context provided
```

**Anti-Hallucination for Media:**
| Without MX-Card | With MX-Card |
|-----------------|--------------|
| Vision model: "appears to be a painting" | Verified: "Monet's Water Lilies, 1906" |
| OCR: partial text extraction | Complete document summary |
| Audio transcription: error-prone | Verified audio description |

### Claim 12: Error Recovery Context Cards
A method for providing contextual assistance to users encountering errors comprising:
- QR codes embedded in error screens (404, 500, timeouts, validation errors)
- MX-Cards containing specific recovery instructions for each error type
- Contextual help based on what the user was attempting
- Alternative pathways and escalation options
- Multi-format delivery (visual, audio, simplified) based on identity layer
- Applicable to: websites, applications, physical products, kiosks, and any user interface

**Key Innovation:** Transforms confusing error states into actionable assistance.

### Claim 13: Machine-to-Machine Response Protocol
A protocol enabling automated response chains between MX-Card-enabled devices comprising:
- Responder identity layer determining response capability
- Priority-based escalation chains (human first → robot → emergency services)
- Configurable timeout-based automatic escalation
- Responder type detection (human app, household robot, smart hub, business system)
- Bi-directional communication between alerting device and responder
- Authorization levels determining permissible actions per responder type

**Example Flow:**
```
Assistance needed → Human notified (5 min timeout)
→ No response → Household robot alerted (2 min timeout)
→ Robot confirms emergency → Emergency services contacted
```

### Claim 14: Emergency Services Integration Protocol
A method for automated emergency response with verified context comprising:
- Emergency cards containing location, occupant details, hazards, and access instructions
- Automatic alert transmission to emergency services with full context
- Device interrogation capability allowing emergency services to query alerting devices
- Synchronization protocol confirming alert receipt
- False alarm mitigation through confirmation windows, multi-sensor verification, and cancellation codes
- Authorization hierarchy (occupant cancel, emergency services interrogate, dispatch authority)
- Household/business identity layer providing address and access details to responders

**Authorization Controls:**
| Action | Required Authorization |
|--------|----------------------|
| Raise alarm | Registered device |
| Cancel alarm | Occupant authentication |
| Interrogate device | Emergency services credential |
| Access location data | Emergency services credential |
| Dispatch response | Emergency services internal |

**False Alarm Prevention:**
- 60-second confirmation window
- Multi-sensor verification requirement
- Pattern learning (cooking smoke vs fire)
- Human checkpoint option
- Device state interrogation before dispatch

---

## Prior Art Considerations

### Existing Technologies (Differentiation Required)

| Technology | Overlap | MX-Card Differentiation |
|------------|---------|-------------------------|
| QR Codes | Physical linking | Standardised machine-readable format, not just URLs |
| vCard | Contact sharing | Machine instructions, not just contact data |
| Schema.org | Structured data | Registry verification, access control, identity layer |
| OAuth | Authentication | Domain-verified card ownership, not just user auth |
| Digital Business Cards | Contact exchange | AI agent consumption, context provision, routines |
| iBeacon/Eddystone | Proximity broadcast | Identity-informed adaptive responses, not just URLs |
| Screen Readers | Accessibility | Proactive context delivery, not reactive page reading |
| Wayfinding Apps | Navigation | Universal card format with personalised instructions |
| EXIF/XMP Metadata | File descriptions | Structured card reference, not free-text descriptions |
| PDF Metadata | Document properties | Verified context, not just author/title |
| Smart Home Systems | Device automation | Universal protocol, identity layer, priority escalation |
| Emergency Alert Systems | Fire/medical alerts | Device interrogation, false alarm mitigation, context delivery |
| Error Pages | User notification | Contextual help cards, recovery instructions, accessibility |
| Home Robots | Physical assistance | Identity-aware responses, escalation chains, authorization |

### Novel Elements (No Known Prior Art)

1. **Anti-hallucination infrastructure** - Verified context eliminating AI inference/guessing
2. **Token expenditure reduction** - Direct context provision vs. web research
3. **Machine-readable instruction cards** with owner contact routines
4. **Identity layer inheritance** for automatic preference filtering
5. **Domain-verified registry** for physical location authority
6. **Encrypted scheduled cards** with access level tokens
7. **Physical-to-agent context bridge** via QR-linked cards
8. **Universal application** - Single standard for artworks to legal documents
9. **Bluetooth beacon discovery** - Non-visual MX-Card discovery for accessibility
10. **Accessibility-informed responses** - Same card, multiple formats based on user needs
11. **Multi-modal delivery** - Audio, visual, haptic output from single card source
12. **Context-switching identity layers** - Work, transport, vacation, event modes
13. **Event-specific temporary layers** - Auto-expiring interest profiles for venues
14. **Interest-beacon matching** - Notifications when cards match active interests
15. **Energy-efficient AI operations** - Reduced inference cycles, environmental benefit
16. **Universal consumer protocol** - Humans and machines as equal card consumers
17. **Media metadata embedding** - MX-Card references in EXIF, XMP, PDF, ID3 metadata
18. **Content analysis elimination** - Verified context replaces vision/audio model inference
19. **Error recovery cards** - QR codes on error screens providing contextual help
20. **Machine-to-machine response** - Robots and systems as first-class responders
21. **Priority-based escalation** - Timeout-triggered response chain (human → robot → emergency)
22. **Emergency services integration** - Automated alerts with verified location and context
23. **Device interrogation protocol** - Emergency services querying alerting devices
24. **False alarm mitigation** - Multi-sensor verification, confirmation windows, cancellation codes

---

## Implementation Roadmap

### Phase 1: Foundation
- MX-Card schema specification
- Registry MVP with domain verification
- Plain card support
- Basic QR generation

### Phase 2: Identity
- Identity layer specification
- Mobile app MVP
- On-device storage
- Selective sharing

### Phase 3: Advanced Features
- Encrypted cards
- Scheduled/time-limited cards
- Owner contact routines
- Access level tokens

### Phase 4: Accessibility & Discovery
- Bluetooth beacon SDK
- Multi-modal response formats (audio, visual, haptic)
- Screen reader integration
- Accessibility identity layer profiles
- NFC tag support

### Phase 5: Ecosystem
- Enterprise API
- Third-party integrations
- Analytics platform
- White-label solutions
- Beacon hardware partnerships

---

## Appendices

### A. Technical Standards References
- Schema.org structured data
- JSON-LD format
- QR Code ISO/IEC 18004
- AES-256-GCM encryption
- OAuth 2.0 / OpenID Connect
- Bluetooth Low Energy (BLE) / iBeacon / Eddystone
- NFC Forum specifications
- WCAG 2.1 accessibility guidelines

### B. Regulatory Compliance
- GDPR (EU)
- CCPA (California)
- UK Data Protection Act
- International data transfer mechanisms

### C. Related Book Chapters
- Chapter [TBD]: MX-Cards and the Physical-Digital Bridge
- Chapter [TBD]: The Identity Layer
- Chapter [TBD]: Registry and Verification

---

## Document History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-26 | 0.1 | Initial draft from concept notes |
| 2026-01-26 | 0.2 | Added anti-hallucination value proposition, universal application scope, Claim 6 |
| 2026-01-26 | 0.3 | Added Bluetooth beacon discovery, accessibility use cases, Claim 7 |
| 2026-01-26 | 0.4 | Added context-switching identity layers, environmental benefits, universal consumer protocol, Claims 8-10 |
| 2026-01-26 | 0.5 | Added media file metadata embedding (EXIF, XMP, PDF, ID3), Claim 11 |
| 2026-01-26 | 0.6 | Added Inventor's Statement documenting problem-driven origin of invention |
| 2026-01-26 | 0.7 | Added error recovery, M2M response protocol, emergency services integration, Claims 12-14 |

---

**CONFIDENTIAL - NOT FOR PUBLIC DISTRIBUTION**
