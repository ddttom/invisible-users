# MX Use Case: QR Code First Contact

## Overview

This use case demonstrates Machine Experience (MX) principles in a common scenario: a visitor scans a QR code from a physical business card. The implementation shows how to build a structured interaction model that enables contextual responses without complex user-facing interfaces.

## The Interaction Flow

```
[QR Scan] → [Landing Page] → [Self-identification] → [Contact Preference] → [Follow-up]
```

Each step generates events that update the visitor's MX state.

## Data Model

### Visitor State

```javascript
const visitorState = {
  id: 'v_abc123',
  status: 'known', // anonymous | identified | known
  type: 'accountant',
  intent: 'professional_services',
  stage: 'first_contact',
  
  contact: {
    source: 'physical_card',
    medium: 'qr',
    device: 'mobile',
    timestamp: '2024-03-15T14:32:00Z',
    location: null // optional, if consented
  },
  
  identity: {
    channel: 'whatsapp',
    value: '+447xxxxxxxxx',
    consent: {
      contact: true,
      timestamp: '2024-03-15T14:32:45Z'
    }
  },
  
  behaviour: {
    visits: 1,
    lastSeen: '2024-03-15T14:32:45Z',
    events: ['qr_scan', 'type_selected', 'channel_selected']
  }
};
```

### Event Structure

Each interaction generates an event:

```javascript
const event = {
  id: 'evt_xyz789',
  visitorId: 'v_abc123',
  type: 'type_selected',
  data: {
    value: 'accountant',
    options_shown: ['accountant', 'solicitor', 'business_owner', 'other']
  },
  timestamp: '2024-03-15T14:32:30Z',
  context: {
    page: '/welcome',
    sessionDuration: 12000 // ms since first event
  }
};
```

## Implementation

### Landing Page

A minimal page that captures context without friction:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome</title>
</head>
<body>
  <main id="app"></main>
  <script type="module" src="/welcome.js"></script>
</body>
</html>
```

```javascript
// welcome.js

const state = {
  visitorId: null,
  step: 'type'
};

const types = [
  { id: 'accountant', label: 'Accountant' },
  { id: 'solicitor', label: 'Solicitor' },
  { id: 'business_owner', label: 'Business Owner' },
  { id: 'other', label: 'Something else' }
];

const channels = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone call' }
];

async function init() {
  state.visitorId = await initVisitor();
  render();
}

async function initVisitor() {
  const response = await fetch('/api/visitor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source: 'physical_card',
      medium: 'qr',
      device: detectDevice(),
      referrer: document.referrer
    })
  });
  const data = await response.json();
  return data.visitorId;
}

function detectDevice() {
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) return 'mobile';
  if (/tablet/i.test(ua)) return 'tablet';
  return 'desktop';
}

async function selectType(typeId) {
  await trackEvent('type_selected', { value: typeId });
  state.step = 'channel';
  render();
}

async function selectChannel(channelId) {
  await trackEvent('channel_selected', { value: channelId });
  state.step = 'contact';
  render();
}

async function trackEvent(type, data) {
  await fetch('/api/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      visitorId: state.visitorId,
      type,
      data,
      timestamp: new Date().toISOString()
    })
  });
}

function render() {
  const app = document.getElementById('app');
  
  if (state.step === 'type') {
    app.innerHTML = `
      <h1>What brings you here?</h1>
      <div class="options">
        ${types.map(t => `
          <button data-type="${t.id}">${t.label}</button>
        `).join('')}
      </div>
    `;
    app.querySelectorAll('[data-type]').forEach(btn => {
      btn.addEventListener('click', () => selectType(btn.dataset.type));
    });
  }
  
  if (state.step === 'channel') {
    app.innerHTML = `
      <h1>How would you like to hear from me?</h1>
      <div class="options">
        ${channels.map(c => `
          <button data-channel="${c.id}">${c.label}</button>
        `).join('')}
      </div>
    `;
    app.querySelectorAll('[data-channel]').forEach(btn => {
      btn.addEventListener('click', () => selectChannel(btn.dataset.channel));
    });
  }
  
  if (state.step === 'contact') {
    app.innerHTML = `
      <h1>Thanks</h1>
      <p>I'll be in touch shortly.</p>
    `;
  }
}

init();
```

### API Endpoints

```javascript
// api/visitor.js (Cloudflare Worker or similar)

export async function onRequestPost({ request, env }) {
  const body = await request.json();
  const visitorId = `v_${crypto.randomUUID().slice(0, 12)}`;
  
  const visitor = {
    id: visitorId,
    status: 'anonymous',
    contact: {
      source: body.source,
      medium: body.medium,
      device: body.device,
      timestamp: new Date().toISOString()
    },
    behaviour: {
      visits: 1,
      events: ['session_started']
    }
  };
  
  await env.MX_STATE.put(visitorId, JSON.stringify(visitor));
  
  return Response.json({ visitorId });
}
```

```javascript
// api/event.js

export async function onRequestPost({ request, env }) {
  const body = await request.json();
  const { visitorId, type, data, timestamp } = body;
  
  // Retrieve current state
  const visitor = JSON.parse(await env.MX_STATE.get(visitorId));
  
  // Update state based on event type
  if (type === 'type_selected') {
    visitor.type = data.value;
    visitor.intent = inferIntent(data.value);
    visitor.stage = 'first_contact';
  }
  
  if (type === 'channel_selected') {
    visitor.identity = {
      channel: data.value,
      consent: { contact: true, timestamp }
    };
    visitor.status = 'identified';
  }
  
  // Record event
  visitor.behaviour.events.push(type);
  visitor.behaviour.lastSeen = timestamp;
  
  // Persist updated state
  await env.MX_STATE.put(visitorId, JSON.stringify(visitor));
  
  // Trigger downstream actions if appropriate
  if (type === 'channel_selected') {
    await env.FOLLOW_UP_QUEUE.send({
      visitorId,
      channel: data.value,
      context: visitor
    });
  }
  
  return Response.json({ ok: true });
}

function inferIntent(type) {
  const intents = {
    accountant: 'professional_services',
    solicitor: 'professional_services',
    business_owner: 'business_services',
    other: 'general_enquiry'
  };
  return intents[type] || 'unknown';
}
```

### Decision Engine

The follow-up worker consumes from the queue and makes contextual decisions:

```javascript
// workers/follow-up.js

export default {
  async queue(batch, env) {
    for (const message of batch.messages) {
      const { visitorId, channel, context } = message.body;
      
      const template = selectTemplate(context);
      const timing = calculateTiming(context);
      
      await scheduleMessage({
        visitorId,
        channel,
        template,
        sendAt: timing,
        env
      });
      
      message.ack();
    }
  }
};

function selectTemplate(context) {
  // Template selection based on visitor type and stage
  const templates = {
    accountant: {
      first_contact: 'accountant-intro',
      returning: 'accountant-followup'
    },
    solicitor: {
      first_contact: 'solicitor-intro',
      returning: 'solicitor-followup'
    },
    default: {
      first_contact: 'general-intro',
      returning: 'general-followup'
    }
  };
  
  const typeTemplates = templates[context.type] || templates.default;
  return typeTemplates[context.stage] || typeTemplates.first_contact;
}

function calculateTiming(context) {
  const now = new Date();
  const hour = now.getHours();
  
  // If outside business hours, schedule for next morning
  if (hour < 9 || hour >= 17) {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + (hour >= 17 ? 1 : 0));
    tomorrow.setHours(9, 0, 0, 0);
    return tomorrow.toISOString();
  }
  
  // During business hours, short delay feels more natural than instant
  const delay = 5 * 60 * 1000; // 5 minutes
  return new Date(now.getTime() + delay).toISOString();
}
```

## State Transitions

```
[anonymous] → type_selected → [anonymous + typed]
           → channel_selected → [identified]
           → contact_provided → [known]
           → visit_2+ → [returning]
           → engaged → [qualified]
```

Each transition can trigger appropriate actions. The state machine is implicit in the event handlers rather than formally defined, keeping the implementation simple while maintaining clear progression.

## Storage Options

The example uses Cloudflare KV for simplicity. Alternatives:

| Storage | Use Case |
|---------|----------|
| KV | Simple key-value state, low latency reads |
| D1 | Relational queries, reporting, aggregation |
| Durable Objects | Real-time state, WebSocket connections |
| R2 | Event archives, audit logs |

For production, consider D1 for queryable visitor records with KV as a cache layer.

## MX Principles in Code

**State accumulates meaningfully** — each event adds to the visitor model rather than replacing it.

**Decisions derive from state** — template selection and timing emerge from what the system knows, not hardcoded rules.

**Events are immutable** — the behaviour array provides an audit trail; state represents current understanding.

**Complexity stays server-side** — the client is minimal; intelligence lives in the API and workers.

## Testing

```javascript
// test/visitor-flow.test.js

import { describe, it, expect } from 'vitest';
import { createVisitor, trackEvent, getVisitor } from '../api';

describe('visitor flow', () => {
  it('progresses through states correctly', async () => {
    // Initial creation
    const { visitorId } = await createVisitor({
      source: 'physical_card',
      medium: 'qr',
      device: 'mobile'
    });
    
    let visitor = await getVisitor(visitorId);
    expect(visitor.status).toBe('anonymous');
    
    // Type selection
    await trackEvent(visitorId, 'type_selected', { value: 'accountant' });
    visitor = await getVisitor(visitorId);
    expect(visitor.type).toBe('accountant');
    expect(visitor.intent).toBe('professional_services');
    
    // Channel selection
    await trackEvent(visitorId, 'channel_selected', { value: 'whatsapp' });
    visitor = await getVisitor(visitorId);
    expect(visitor.status).toBe('identified');
    expect(visitor.identity.channel).toBe('whatsapp');
  });
  
  it('infers intent from visitor type', async () => {
    const cases = [
      ['accountant', 'professional_services'],
      ['solicitor', 'professional_services'],
      ['business_owner', 'business_services'],
      ['other', 'general_enquiry']
    ];
    
    for (const [type, expectedIntent] of cases) {
      const { visitorId } = await createVisitor({ source: 'test' });
      await trackEvent(visitorId, 'type_selected', { value: type });
      const visitor = await getVisitor(visitorId);
      expect(visitor.intent).toBe(expectedIntent);
    }
  });
});
```

## Extending the Model

The basic structure supports extension:

```javascript
// Adding engagement scoring
visitor.engagement = {
  score: calculateScore(visitor.behaviour.events),
  signals: ['multiple_visits', 'downloaded_asset', 'long_session']
};

// Adding segmentation
visitor.segments = deriveSegments(visitor);
// e.g., ['high_intent', 'professional', 'mobile_user']

// Adding prediction
visitor.prediction = {
  likelihood: 0.72,
  nextAction: 'schedule_call',
  confidence: 'medium'
};
```

Each extension follows the same pattern: derive understanding from accumulated events, store it as state, use it to inform decisions.

---

*This use case is part of the Machine Experience (MX) framework.*
*For more information: [machineexperience.org](https://machineexperience.org)*
