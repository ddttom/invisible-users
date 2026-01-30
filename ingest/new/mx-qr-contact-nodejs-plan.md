# MX QR Contact: Node.js + Cloudflare Implementation

## Project Overview

Build a Node.js server application that implements the Machine Experience (MX) pattern for QR code first-contact scenarios. Cloudflare sits in front as an edge layer, enriching requests with MX decoration (device detection, geolocation, timing context) before they reach the Node.js backend.

## Architecture

```
[QR Scan] → [Cloudflare Worker] → [Node.js Server] → [Database]
                  ↓
            MX Decoration
            - Device type
            - Location (country/city)
            - Time context
            - Request fingerprint
```

Cloudflare handles what it's good at (edge detection, geolocation, request enrichment). Node.js handles what it's good at (business logic, database operations, integrations).

## Reference Documentation

The developer use case document (`mx-use-case-qr-contact-developer.md`) contains the data models, event structures, and logic patterns to implement.

## Technical Decisions

### Node.js Server
- Express for HTTP
- better-sqlite3 for local database
- ES modules throughout
- No build step

### Cloudflare Layer
- Worker for MX decoration
- Passes enriched headers to origin
- Optional: KV for rate limiting or session hints

### Storage
- SQLite on the Node.js server
- Simple, portable, easy to inspect

## Project Structure

```
mx-qr-contact/
├── server/                    # Node.js application
│   ├── package.json
│   ├── .env.example
│   ├── src/
│   │   ├── index.js           # Entry point
│   │   ├── config.js          # Environment config
│   │   ├── db/
│   │   │   ├── connection.js  # SQLite connection
│   │   │   └── schema.sql     # Table definitions
│   │   ├── routes/
│   │   │   ├── visitor.js     # POST /api/visitor
│   │   │   ├── event.js       # POST /api/event
│   │   │   └── health.js      # GET /health
│   │   ├── services/
│   │   │   ├── visitor.js     # Visitor state management
│   │   │   ├── event.js       # Event processing
│   │   │   ├── decision.js    # Template and timing logic
│   │   │   └── followup.js    # Follow-up scheduling
│   │   ├── middleware/
│   │   │   └── mx-context.js  # Extract MX headers from Cloudflare
│   │   └── utils/
│   │       ├── id.js          # ID generation
│   │       └── time.js        # Timing calculations
│   ├── public/
│   │   ├── index.html         # Landing page
│   │   └── welcome.js         # Client-side interaction
│   └── test/
│       └── *.test.js
│
└── cloudflare/                # Cloudflare Worker
    ├── wrangler.toml
    └── src/
        └── mx-decorator.js    # Request enrichment worker
```

## Cloudflare MX Decorator Worker

The worker intercepts requests and adds MX context headers before forwarding to origin:

```javascript
// cloudflare/src/mx-decorator.js

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Extract MX context from Cloudflare's request data
    const mxContext = {
      // Device detection from User-Agent
      device: detectDevice(request.headers.get('user-agent')),
      
      // Geolocation from Cloudflare
      country: request.cf?.country || null,
      city: request.cf?.city || null,
      timezone: request.cf?.timezone || null,
      
      // Connection info
      asn: request.cf?.asn || null,
      colo: request.cf?.colo || null,
      
      // Request timing
      timestamp: new Date().toISOString(),
      
      // Bot detection
      botScore: request.cf?.botManagement?.score || null,
      
      // TLS version (indicator of device age)
      tlsVersion: request.cf?.tlsVersion || null
    };
    
    // Create new request with MX headers
    const modifiedRequest = new Request(request);
    modifiedRequest.headers.set('X-MX-Context', JSON.stringify(mxContext));
    modifiedRequest.headers.set('X-MX-Device', mxContext.device);
    modifiedRequest.headers.set('X-MX-Country', mxContext.country || '');
    modifiedRequest.headers.set('X-MX-City', mxContext.city || '');
    modifiedRequest.headers.set('X-MX-Timezone', mxContext.timezone || '');
    modifiedRequest.headers.set('X-MX-Timestamp', mxContext.timestamp);
    
    // Forward to origin (Node.js server)
    return fetch(modifiedRequest);
  }
};

function detectDevice(userAgent) {
  if (!userAgent) return 'unknown';
  const ua = userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad|phone/i.test(ua)) {
    if (/tablet|ipad/i.test(ua)) return 'tablet';
    return 'mobile';
  }
  return 'desktop';
}
```

```toml
# cloudflare/wrangler.toml

name = "mx-decorator"
main = "src/mx-decorator.js"
compatibility_date = "2024-01-01"

# Route all traffic through this worker
# Configure in Cloudflare dashboard or via:
# routes = [{ pattern = "yourdomain.com/*", zone_name = "yourdomain.com" }]
```

## Node.js Middleware

Extract the MX context from Cloudflare headers:

```javascript
// server/src/middleware/mx-context.js

export function mxContext(req, res, next) {
  // Parse full context if available
  const contextHeader = req.headers['x-mx-context'];
  if (contextHeader) {
    try {
      req.mx = JSON.parse(contextHeader);
    } catch {
      req.mx = {};
    }
  } else {
    // Fall back to individual headers
    req.mx = {
      device: req.headers['x-mx-device'] || 'unknown',
      country: req.headers['x-mx-country'] || null,
      city: req.headers['x-mx-city'] || null,
      timezone: req.headers['x-mx-timezone'] || null,
      timestamp: req.headers['x-mx-timestamp'] || new Date().toISOString()
    };
  }
  
  next();
}
```

## Database Schema

```sql
-- server/src/db/schema.sql

-- visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id TEXT PRIMARY KEY,
  status TEXT DEFAULT 'anonymous',
  type TEXT,
  intent TEXT,
  stage TEXT DEFAULT 'first_contact',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- visitor_contact table (how they arrived, enriched by Cloudflare)
CREATE TABLE IF NOT EXISTS visitor_contact (
  visitor_id TEXT PRIMARY KEY,
  source TEXT,
  medium TEXT,
  device TEXT,
  country TEXT,
  city TEXT,
  timezone TEXT,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (visitor_id) REFERENCES visitors(id)
);

-- visitor_identity table (how to reach them)
CREATE TABLE IF NOT EXISTS visitor_identity (
  visitor_id TEXT PRIMARY KEY,
  channel TEXT,
  value TEXT,
  consent_contact INTEGER DEFAULT 0,
  consent_timestamp TEXT,
  FOREIGN KEY (visitor_id) REFERENCES visitors(id)
);

-- events table (immutable log)
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  visitor_id TEXT,
  type TEXT NOT NULL,
  data TEXT,
  mx_context TEXT,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (visitor_id) REFERENCES visitors(id)
);

-- scheduled_messages table
CREATE TABLE IF NOT EXISTS scheduled_messages (
  id TEXT PRIMARY KEY,
  visitor_id TEXT,
  channel TEXT NOT NULL,
  template TEXT NOT NULL,
  send_at TEXT NOT NULL,
  sent_at TEXT,
  status TEXT DEFAULT 'pending',
  FOREIGN KEY (visitor_id) REFERENCES visitors(id)
);

-- indexes
CREATE INDEX IF NOT EXISTS idx_visitors_status ON visitors(status);
CREATE INDEX IF NOT EXISTS idx_events_visitor ON events(visitor_id);
CREATE INDEX IF NOT EXISTS idx_messages_pending ON scheduled_messages(status, send_at);
```

## API Endpoints

### POST /api/visitor
Creates a new visitor record. MX context from Cloudflare is automatically included.

Request (from client):
```json
{
  "source": "physical_card",
  "medium": "qr"
}
```

Server receives this plus `req.mx` containing:
```json
{
  "device": "mobile",
  "country": "GB",
  "city": "London",
  "timezone": "Europe/London",
  "timestamp": "2024-03-15T14:32:00Z"
}
```

Response:
```json
{
  "visitorId": "v_abc123def456"
}
```

### POST /api/event
Records an interaction event and updates visitor state.

Request:
```json
{
  "visitorId": "v_abc123def456",
  "type": "type_selected",
  "data": { "value": "accountant" }
}
```

Response:
```json
{
  "ok": true
}
```

### GET /api/visitor/:id
Retrieves current visitor state (for debugging/admin).

### GET /health
Returns server status.

## Node.js Server Entry Point

```javascript
// server/src/index.js

import express from 'express';
import { mxContext } from './middleware/mx-context.js';
import { createVisitorRoutes } from './routes/visitor.js';
import { createEventRoutes } from './routes/event.js';
import { initDatabase } from './db/connection.js';
import { config } from './config.js';

const app = express();

app.use(express.json());
app.use(express.static('public'));

// Extract MX context from Cloudflare headers
app.use('/api', mxContext);

// Routes
app.use('/api/visitor', createVisitorRoutes());
app.use('/api/event', createEventRoutes());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialise database and start server
initDatabase();
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
```

## Implementation Phases

### Phase 1: Node.js Core
1. Project setup (package.json, folder structure)
2. Database connection and schema
3. Visitor creation endpoint (without MX enrichment initially)
4. Event recording endpoint
5. Basic state updates

### Phase 2: Cloudflare Layer
1. Create MX decorator worker
2. Deploy and route traffic through it
3. Add middleware to extract MX headers
4. Store enriched context with visitor records

### Phase 3: Decision Logic
1. Intent inference from visitor type
2. Template selection (can now use location/timezone)
3. Timing calculations (respect visitor's timezone)
4. Follow-up scheduling

### Phase 4: Static Files and Frontend
1. Landing page served from /public
2. Client-side JavaScript for interaction flow
3. Connect frontend to API

### Phase 5: Follow-up Dispatch
1. Polling loop or cron for due messages
2. Channel integrations (console logging initially)
3. Status tracking

### Phase 6: Testing and Polish
1. Unit tests for services
2. Integration tests with mocked MX headers
3. Error handling
4. Logging

## Benefits of This Architecture

### Cloudflare handles:
- **Geolocation** — country, city, timezone without third-party APIs
- **Device detection** — at the edge, before your server sees the request
- **Bot filtering** — bot score available if needed
- **DDoS protection** — built in
- **SSL termination** — handled at the edge

### Node.js handles:
- **Business logic** — visitor state, decision rules
- **Database** — SQLite, simple and local
- **Integrations** — WhatsApp, email, webhooks
- **Long-running processes** — follow-up scheduling

### Clean separation:
- Cloudflare does enrichment, Node.js does processing
- MX context travels as headers — easy to log, debug, test
- Can test Node.js locally by manually setting X-MX headers
- Can swap either layer independently

## Environment Variables

```bash
# server/.env.example
PORT=3000
DATABASE_PATH=./data/mx.db
NODE_ENV=development
```

## Local Development

Test without Cloudflare by simulating MX headers:

```bash
# Create visitor with simulated MX context
curl -X POST http://localhost:3000/api/visitor \
  -H "Content-Type: application/json" \
  -H "X-MX-Device: mobile" \
  -H "X-MX-Country: GB" \
  -H "X-MX-City: London" \
  -H "X-MX-Timezone: Europe/London" \
  -d '{"source": "physical_card", "medium": "qr"}'
```

## Dependencies

### Node.js Server
```json
{
  "type": "module",
  "dependencies": {
    "express": "^4.18.2",
    "better-sqlite3": "^9.4.3",
    "nanoid": "^5.0.5",
    "dotenv": "^16.4.1"
  }
}
```

### Cloudflare Worker
No npm dependencies — uses Web APIs only.

## Handoff Checklist

Before starting implementation, confirm:

- [ ] Node.js version (recommend 20 LTS)
- [ ] Server hosting location (VPS, cloud, local?)
- [ ] Domain name (needed for Cloudflare routing)
- [ ] Cloudflare account ready?
- [ ] Any additional visitor types beyond accountant/solicitor/business owner/other?
- [ ] Follow-up channel priority (WhatsApp, email, or logging only for now?)

## Commands to Start

```bash
# Create project structure
mkdir -p mx-qr-contact/{server,cloudflare}
cd mx-qr-contact/server

# Initialise Node.js project
npm init -y
npm install express better-sqlite3 nanoid dotenv

# Create folder structure
mkdir -p src/{db,routes,services,middleware,utils} public test data

# Create Cloudflare worker
cd ../cloudflare
npm init -y
npm install -D wrangler

# Begin building
# Start with server/src/index.js and server/src/db/schema.sql
```

---

*This plan implements the MX QR Contact use case with Node.js for business logic and Cloudflare for edge-based MX decoration.*
