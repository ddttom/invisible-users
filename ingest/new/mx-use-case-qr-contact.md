# MX Use Case: QR Code First Contact

## Overview

This use case demonstrates Machine Experience (MX) principles applied to a common business scenario: a potential client scanning a QR code from a physical business card. It illustrates how MX creates a structured internal model of an interaction, enabling contextually appropriate responses without requiring visible complexity on the human side.

## The Scenario

An accountant meets a consultant at a networking event and scans the QR code on their business card.

## The Human Experience (UX)

From the visitor's perspective:

1. Scan a QR code
2. Land on a clean, simple page
3. Select their profession from a short list
4. Choose a preferred contact method
5. Receive a relevant, well-timed follow-up

The interaction feels smooth and uncluttered.

## The Machine Experience (MX)

While the human sees simplicity, the system builds a structured model of the interaction.

### Stage 1: Initial Contact

**Event:** QR code scanned

**MX records:**
- `source`: physical card
- `medium`: QR
- `device`: mobile
- `timestamp`: 2024-03-15T14:32:00Z
- `context`: networking event (inferred from time/location pattern)

### Stage 2: Self-Identification

**Event:** Visitor selects "Accountant"

**MX state updates:**
- `visitor.type`: accountant
- `visitor.intent`: professional_services
- `visitor.stage`: first_contact
- `visitor.status`: anonymous

### Stage 3: Contact Preference

**Event:** Visitor chooses WhatsApp

**MX state updates:**
- `identity.channel`: whatsapp
- `identity.value`: +447xxxxxxxxx
- `visitor.status`: known
- `consent.contact`: true

### Stage 4: System Decision

Based on the accumulated MX state, the system determines:

- **Message template:** Professional services introduction
- **Tone:** Business-appropriate, low-pressure
- **Assets:** Relevant case studies or service overview
- **Timing:** Prompt but not immediate (respects business hours)
- **Escalation:** Flag for human review if engagement continues

## MX State Summary

```json
{
  "visitor": {
    "type": "accountant",
    "intent": "professional_services",
    "stage": "first_contact",
    "status": "known"
  },
  "contact": {
    "source": "physical_card",
    "medium": "qr",
    "device": "mobile",
    "timestamp": "2024-03-15T14:32:00Z"
  },
  "identity": {
    "channel": "whatsapp",
    "consent": true
  },
  "behaviour": {
    "engaged": true,
    "return_visits": 0
  }
}
```

## Benefits of the MX Approach

### For the Human

- **Simplicity:** No forms to fill, no complexity visible
- **Relevance:** Follow-up content matches their actual context
- **Respect:** Communication arrives through their preferred channel
- **Timing:** Responses feel well-judged, not automated

### For the System

- **Structured knowledge:** Every interaction builds a coherent model
- **Contextual decisions:** Responses based on actual state, not assumptions
- **Memory:** The relationship has history from the first moment
- **Adaptability:** Behaviour adjusts as the model develops

### For the Business

- **Better conversion:** Relevant responses improve engagement
- **Efficiency:** Automated decisions reduce manual triage
- **Insight:** Patterns emerge from structured data
- **Consistency:** Every contact receives appropriate treatment

## Key MX Principles Demonstrated

1. **The system experiences the interaction** — it's not passive data collection but active model-building

2. **State accumulates meaningfully** — each event adds to a coherent picture

3. **Decisions derive from state** — responses emerge from what the system knows, not from rigid rules

4. **Complexity stays internal** — the human sees simplicity; the machine handles nuance

5. **Memory enables relationship** — the system knows this person next time

## What MX Is Not

- **Not surveillance:** The system records what the person chooses to share
- **Not manipulation:** Decisions serve relevance, not exploitation
- **Not magic:** Every inference has a clear basis in recorded events

## Technical Implementation Notes

This use case could be implemented with:

- A simple landing page with progressive disclosure
- Event tracking to a structured data store
- A decision engine (rules-based or ML-assisted)
- Integration with messaging platforms (WhatsApp Business API)
- A lightweight CRM or state management system

The MX layer sits between raw events and business actions, providing the "situational awareness and memory" that makes interactions feel intelligent.

---

*This use case is part of the Machine Experience (MX) framework documentation.*
*For more information: [machineexperience.org](https://machineexperience.org)*
