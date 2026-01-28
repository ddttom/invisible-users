---
title: "MX-Card System - Provisional Patent Application"
author: "Tom Cranstoun"
date: "2026-01-26"
description: "Summary document suitable for UK provisional patent application filing"
keywords: [patent, provisional, ukipo, mx-card, filing]
ai-instruction: "This document is designed for patent filing. Maintain precise technical language."
status: "READY FOR FILING"
---

# Provisional Patent Application

## MX-Card System: Machine-Readable Context Exchange Protocol

**For Filing at:** UK Intellectual Property Office (UKIPO)

---

## Filing Instructions

### How to File This Provisional Application

1. **Online Filing (Recommended):**
   - Visit: https://www.gov.uk/apply-for-a-patent
   - Create or log into your Government Gateway account
   - Select "Apply for a patent"
   - Upload this document (save as PDF first)
   - Pay the fee: £50 (online) or £60 (paper)

2. **Paper Filing:**
   - Post to: Intellectual Property Office, Concept House, Cardiff Road, Newport NP10 8QQ
   - Include Form 1/77 (available from gov.uk)
   - Include cheque for £60

3. **What You Receive:**
   - Application number and filing date
   - Priority date established (12 months to file full application)
   - Receipt confirmation

### Critical Dates After Filing

- **12 months:** File full UK patent OR international PCT application
- **30 months:** Enter national phase in individual countries (if PCT filed)

---

## Application Content

### Title of Invention

**MX-Card System: A Protocol for Machine-Readable Context Exchange Between Physical Objects, Digital Services, and AI Agents**

---

### Applicant Details

**Name:** Thomas (Tom) Cranstoun

**Address:** [Your full address]

**Nationality:** British

**Email:** tom.cranstoun@gmail.com

---

### Inventor Details

**Inventor:** Thomas (Tom) Cranstoun

**Address:** [Same as applicant]

The applicant is the sole inventor.

---

### Field of the Invention

This invention relates to systems and methods for providing machine-readable contextual information to artificial intelligence agents, and more particularly to a standardised protocol enabling physical objects, digital services, and networked devices to communicate verified, authoritative context that eliminates inference errors and reduces computational overhead.

---

### Background of the Invention

Artificial intelligence agents increasingly interact with the physical and digital world on behalf of users. These agents face a fundamental challenge: when encountering objects, services, or situations, they must either guess (hallucinate) missing context or expend significant computational resources researching information that the object or service owner could trivially provide.

Current approaches suffer from several deficiencies:

1. **No standardised method** exists for physical objects to communicate machine-readable instructions to AI agents

2. **Verification challenges** mean agents cannot trust discovered information without expensive validation

3. **Personal preferences** (dietary restrictions, accessibility needs, context-specific requirements) must be repeatedly communicated or maintained in fragmented silos

4. **Physical-digital gap** remains unbridged, with QR codes linking only to human-readable web pages rather than machine-actionable protocols

5. **Emergency situations** lack standardised protocols for AI agents to communicate critical user information to first responders

The absence of such infrastructure creates significant inefficiencies, errors, and missed opportunities across commercial, accessibility, and safety domains.

---

### Summary of the Invention

The present invention provides a system comprising three integrated components:

**1. MX-Cards:** Standardised machine-readable data containers that provide verified contextual information about any subject (physical object, location, service, event, document, or digital asset). Cards contain structured instructions, metadata, and optional encrypted sections with granular access control.

**2. MX-Registry:** A verification infrastructure that establishes provenance and authority through domain-verified ownership, cryptographic signing, and hierarchical trust relationships. The registry enables agents to verify that card issuers have legitimate authority over the subjects they describe.

**3. Identity Layer:** A portable personal data container residing on user devices that holds preferences, credentials, and contextual profiles. The identity layer selectively shares relevant information with MX-Cards, enabling personalised responses without centralised data collection.

The system creates bi-directional communication channels between physical-world entities and AI agents, eliminating inference errors whilst preserving privacy through selective disclosure and permission-guarded data compartments.

---

### Detailed Description of the Invention

#### 1. MX-Card Architecture

An MX-Card is a structured data container conforming to a standardised schema. Each card comprises:

**1.1 Header Section**
- Unique identifier (UUID)
- Schema version
- Creation and expiration timestamps
- Cryptographic signature
- Registry reference

**1.2 Subject Section**
- Subject type (physical object, location, service, document, etc.)
- Subject identifier (URL, serial number, coordinates, etc.)
- Human-readable name and description
- Machine-actionable category classification

**1.3 Instructions Section**
- Structured instructions for AI agents
- Action permissions and restrictions
- Interaction protocols
- Response format specifications

**1.4 Context Section**
- Factual information about the subject
- Historical data where relevant
- Related resources and references
- Multimedia attachments or references

**1.5 Conditional Sections**
- Time-limited content (valid during specified periods)
- Scheduled content (different information at different times)
- Identity-responsive content (varies based on recipient identity layer)
- Encrypted content (accessible only to authorised agents)

**1.6 Contact Section**
- Owner identification
- Communication protocols
- Escalation procedures
- Emergency contact information

#### 2. MX-Registry Infrastructure

The MX-Registry provides:

**2.1 Domain Verification**
- DNS-based ownership proof (TXT record verification)
- Certificate-based authentication
- Delegated authority chains

**2.2 Card Registration**
- Unique card identifier assignment
- Cryptographic signing
- Revocation and update protocols
- Version history

**2.3 Discovery Services**
- Card lookup by identifier
- Subject-based search
- Geographic proximity queries
- Category-based discovery

**2.4 Trust Hierarchies**
- Organisational delegation
- Franchise and affiliate relationships
- Government credential integration
- Cross-registry federation

#### 3. Identity Layer Architecture

The Identity Layer comprises:

**3.1 Core Identity**
- Verified personal attributes (optional)
- Government credential references (age, identity, qualifications)
- Authentication factors

**3.2 Preference Profiles**
- Dietary requirements and restrictions
- Accessibility needs
- Communication preferences
- Language and localisation settings

**3.3 Context Modes**
- Work mode (employer preferences overlay)
- Transport mode (accessibility, assistance preferences)
- Vacation mode (relaxed restrictions)
- Emergency mode (medical, emergency contacts)
- Event mode (temporary permission grants)

**3.4 Permission Guards**
- Granular data compartmentalisation
- Selective disclosure rules
- Silent denial (agents unaware of restricted data)
- Audit logging

**3.5 Hierarchical Inheritance**
- Parent-child relationships (shared family preferences)
- Employer-employee relationships (business policies)
- Care relationships (medical proxies)

#### 4. Physical-Digital Bridge

**4.1 QR Code Integration**
QR codes serve as entry points, encoding either:
- Direct card content (for simple, static cards)
- Card reference URLs (for dynamic, registry-backed cards)
- Encrypted card references (for sensitive applications)

**4.2 Bluetooth Beacon Discovery**
For accessibility applications:
- Low-energy beacons broadcast card references
- Enables discovery without visual scanning
- Supports audio-guided navigation for blind users
- Automatic proximity-based card retrieval

**4.3 NFC Integration**
Near-field communication tags:
- Embedded in objects, documents, or wearables
- Tap-to-retrieve card access
- Secure element storage for encrypted cards

**4.4 Media File Embedding**
Cards embedded within media files:
- EXIF/XMP metadata in images
- ID3 tags in audio files
- PDF metadata and XMP streams
- Video file metadata containers

#### 5. Machine-to-Machine Protocol

**5.1 Response Format**
When an AI agent queries an MX-Card with an identity layer:
- Card evaluates identity permissions
- Generates personalised response
- Returns structured data (JSON-LD format)
- Includes confidence indicators and source attribution

**5.2 Priority Escalation**
For urgent communications:
- Cards can request elevated attention
- Emergency cards trigger immediate processing
- Defined escalation protocols for safety-critical information

**5.3 Callback Protocols**
For time-sensitive or changing information:
- Cards can specify callback URLs
- Agents can subscribe to updates
- Change notifications for cached card data

#### 6. Error Recovery Integration

**6.1 Error Card Protocol**
When services encounter errors:
- Structured error cards replace generic messages
- Include diagnostic information for agents
- Specify recovery actions and timeframes
- Provide alternative resources

**6.2 Temporary Disruption Cards**
For planned or unplanned service interruptions:
- Duration estimates
- Alternative service locations
- Queue position and wait time
- Real-time status updates

#### 7. Emergency Services Integration

**7.1 Emergency Mode Activation**
Upon emergency detection:
- Identity layer switches to emergency mode
- Medical information made available to first responders
- Emergency contacts notified
- Location shared with authorised services

**7.2 Device Interrogation Protocol**
For unconscious or incapacitated users:
- Defined protocol for first responder access
- Tiered disclosure (basic medical, then detailed)
- Verification of responder credentials
- Audit trail for all access

**7.3 False Alarm Prevention**
- Multi-factor confirmation before emergency disclosure
- Graduated response based on confidence
- User override capabilities
- Cooldown periods after accidental triggers

---

### Claims

**Claim 1:** A computer-implemented system for machine-readable context exchange comprising:
- a standardised data container (MX-Card) for storing structured information about a subject;
- a registry service (MX-Registry) providing verification of card issuer authority through domain ownership proof;
- a protocol for AI agents to discover, retrieve, and parse said containers; and
- verification mechanisms enabling agents to establish trustworthiness of retrieved information.

**Claim 2:** The system of claim 1, further comprising an identity layer component residing on user devices that:
- stores personal preferences and credentials;
- selectively shares relevant data with MX-Cards based on permission rules; and
- enables personalised responses without centralised data collection.

**Claim 3:** The system of claim 1, wherein MX-Cards include time-conditional content mechanisms that:
- activate or deactivate based on temporal rules;
- provide different information during specified periods; and
- support scheduled content rotation.

**Claim 4:** The system of claim 1, wherein the registry implements a trust hierarchy enabling:
- delegated authority from parent organisations to subsidiaries;
- franchise or affiliate relationships with inherited trust;
- cross-registry federation for distributed verification.

**Claim 5:** The system of claim 2, wherein the identity layer implements context-switching modes comprising:
- a work mode incorporating employer-defined preferences;
- a transport mode with accessibility and assistance settings;
- a vacation mode with relaxed restrictions;
- an emergency mode enabling medical information disclosure; and
- an event mode for temporary permission grants.

**Claim 6:** A method for reducing AI agent inference errors comprising:
- embedding machine-readable context cards at points of agent interaction;
- verifying card authority through registry domain validation;
- providing structured, authoritative information that eliminates need for agent inference; and
- measuring and demonstrating reduction in hallucination rates.

**Claim 7:** The system of claim 1, further comprising Bluetooth beacon infrastructure that:
- broadcasts card references at physical locations;
- enables discovery without visual scanning;
- supports accessibility applications for visually impaired users.

**Claim 8:** The system of claim 2, wherein the identity layer implements permission guards that:
- compartmentalise data into separately permissioned sections;
- enforce selective disclosure based on card and agent credentials;
- implement silent denial where agents remain unaware of restricted data existence.

**Claim 9:** The system of claim 1, further comprising a machine-to-machine response protocol wherein:
- MX-Cards generate structured responses based on querying agent identity;
- responses include priority indicators for urgent communications;
- cards can request elevated attention for safety-critical information.

**Claim 10:** The system of claim 2, wherein the identity layer implements hierarchical inheritance enabling:
- parent-child relationships where children inherit parental preferences;
- employer-employee relationships where business policies apply;
- care relationships enabling medical proxy access.

**Claim 11:** The system of claim 1, wherein MX-Cards can be embedded within media files using:
- EXIF or XMP metadata in image files;
- ID3 tags in audio files;
- XMP streams in PDF documents;
- metadata containers in video files.

**Claim 12:** The system of claim 1, further comprising an error recovery protocol wherein:
- services issue structured error cards upon failure;
- error cards specify recovery actions and timeframes;
- agents receive machine-actionable diagnostic information.

**Claim 13:** An emergency services integration method comprising:
- an emergency mode in the identity layer triggered by emergency detection;
- a device interrogation protocol enabling first responder access to medical information;
- verification of responder credentials before disclosure;
- false alarm prevention through multi-factor confirmation.

**Claim 14:** The system of claim 2, further comprising integration with government credential systems enabling:
- age verification without date of birth disclosure;
- identity confirmation without full identity revelation;
- qualification verification through credential reference.

**Claim 15:** A venue discovery and onboarding system comprising:
- automatic card generation upon venue registration;
- integration with identity layer for personalised venue information;
- revenue sharing model where venues pay for enhanced AI agent interaction.

**Claim 16:** The system of claim 1, wherein MX-Cards associated with physical objects implement an anti-hallucination function by:
- providing verified facts that agents would otherwise need to infer;
- measuring baseline agent accuracy without cards;
- demonstrating improved accuracy with card availability;
- quantifying reduced token expenditure through direct context provision.

**Claim 17:** The system of claim 2, wherein the identity layer enables dietary and allergen management comprising:
- storage of dietary restrictions (vegetarian, vegan, allergies, intolerances);
- automatic filtering of menu items when querying restaurant MX-Cards;
- warning generation for items containing flagged ingredients;
- support for religious and ethical dietary requirements.

**Claim 18:** A method for environmental impact reduction comprising:
- providing direct context to AI agents that would otherwise require inference;
- reducing computational cycles expended on research and validation;
- quantifying energy savings from eliminated inference operations;
- aggregating environmental benefit metrics across deployments.

---

### Abstract

A system and method for machine-readable context exchange between physical objects, digital services, and artificial intelligence agents. The system comprises MX-Cards (standardised data containers providing verified contextual information), MX-Registry (a verification infrastructure establishing issuer authority through domain ownership proof), and an Identity Layer (a portable personal data container enabling selective preference sharing). The invention bridges the physical-digital gap through QR codes, Bluetooth beacons, NFC, and media file embedding, enabling any entity to communicate machine-actionable instructions to AI agents. The system reduces inference errors (hallucinations), preserves user privacy through permission-guarded selective disclosure, and enables personalised responses without centralised data collection. Applications span commercial (restaurants, retail, venues), accessibility (blind user navigation), safety (emergency services integration), and authentication (government credential verification) domains.

---

### Drawings

*(Note: For provisional filing, drawings are optional but helpful. The following describes diagrams that would accompany a full application.)*

**Figure 1:** System architecture overview showing MX-Card, MX-Registry, and Identity Layer components with their interconnections.

**Figure 2:** MX-Card internal structure showing header, subject, instructions, context, conditional, and contact sections.

**Figure 3:** Identity Layer context-switching modes (work, transport, vacation, emergency, event) with preference inheritance flows.

**Figure 4:** Physical-digital bridge implementation showing QR code, Bluetooth beacon, NFC, and media embedding pathways.

**Figure 5:** Machine-to-machine protocol flow showing agent query, identity evaluation, personalised response generation, and priority escalation.

**Figure 6:** Permission guard mechanism showing data compartmentalisation and silent denial operation.

**Figure 7:** Emergency services integration showing emergency mode activation, device interrogation protocol, and false alarm prevention.

**Figure 8:** Trust hierarchy showing domain verification, organisational delegation, and cross-registry federation.

---

## Filing Checklist

Before submitting, verify:

- [ ] Applicant name and address complete
- [ ] Inventor name and address complete
- [ ] Title of invention clear and descriptive
- [ ] All claims included
- [ ] Abstract under 150 words (current: ~140)
- [ ] Document saved as PDF
- [ ] Filing fee ready (£50 online, £60 paper)

---

## Post-Filing Actions

After receiving your filing confirmation:

1. **Record the application number** and filing date
2. **Set calendar reminder** for 12-month deadline
3. **Continue development** - provisional allows full disclosure
4. **Consult patent attorney** about full application strategy
5. **Consider PCT filing** for international protection

---

## Related Documents

- [Full Patent Disclosure](mx-card-system-patent-disclosure.md)
- [Patent Application Plan](mx-card-patent-plan.md)
- [NDA Template](mx-card-nda-template.md)
- [Safe to Share Overview](mx-card-safe-to-share.md)

---

## Document History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-26 | 1.0 | Initial provisional application |
