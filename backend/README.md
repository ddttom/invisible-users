# The Invisible Users - Backend API

Node.js/Express backend for The Invisible Users book website. Handles email subscriptions, contact forms, and Stripe payment processing.

## Features

- **Email Subscriptions**: Free chapter download with ConvertKit integration
- **Contact Forms**: Service inquiries with email notifications
- **Payment Processing**: Stripe Checkout for book purchases
- **Webhooks**: Stripe webhook handling for order fulfillment
- **Security**: Rate limiting, CORS, Helmet, input validation
- **Email Service**: Transactional emails via Nodemailer

## Prerequisites

- Node.js 18+
- npm or yarn
- Stripe account (for payments)
- ConvertKit account (for email marketing) OR Mailchimp
- SMTP server (Gmail, SendGrid, Postmark, etc.)

## Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

## Configuration

### Required Environment Variables

```bash
# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=tom@allabout.network
EMAIL_TO=tom@allabout.network

# ConvertKit
CONVERTKIT_API_KEY=your_api_key
CONVERTKIT_FORM_ID=your_form_id

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Gmail SMTP Setup

1. Go to Google Account settings
2. Enable 2-factor authentication
3. Generate App Password: Security → 2-Step Verification → App Passwords
4. Use the generated password in `SMTP_PASS`

### ConvertKit Setup

1. Create account at convertkit.com
2. Get API key: Settings → Advanced → API
3. Create a form for free chapter downloads
4. Copy Form ID from form settings

### Stripe Setup

1. Create account at stripe.com
2. Get API keys: Developers → API keys
3. Create webhook: Developers → Webhooks
   - Endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy webhook secret

## Running the Server

### Development

```bash
npm run dev
```

Server runs on `http://localhost:3001`

### Production

```bash
npm start
```

## API Endpoints

### Health Check

```bash
GET /api/health
```

Returns server status and service availability.

### Email Subscription

```bash
POST /api/email/subscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "source": "website",
  "tags": ["free-chapter"]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Check your email for Chapter 1!",
  "subscriber": {
    "email": "user@example.com",
    "status": "subscribed"
  }
}
```

### Contact Form

```bash
POST /api/contact/submit
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john@example.com",
  "company": "Acme Corp",
  "role": "CTO",
  "service": "site-audit",
  "message": "I'd like to discuss a site audit",
  "timeline": "urgent"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Thank you! We'll respond within 24 hours.",
  "reference": "CONTACT-1234567890"
}
```

### Create Checkout Session

```bash
POST /api/payment/create-checkout-session
Content-Type: application/json

{
  "productType": "digital",
  "email": "customer@example.com",
  "successUrl": "https://invisible-users.com/success",
  "cancelUrl": "https://invisible-users.com/cancel"
}
```

**Response:**

```json
{
  "success": true,
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

### Stripe Webhook

```bash
POST /api/webhooks/stripe
Content-Type: application/json
Stripe-Signature: t=...,v1=...

[Stripe event payload]
```

Handles `checkout.session.completed` events automatically.

### Verify Payment Session

```bash
GET /api/payment/verify-session/:sessionId
```

Returns payment confirmation details for success page.

## Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Email submissions**: 5 requests per hour per IP
- **Contact forms**: 5 requests per hour per IP

## Email Templates

Email templates are defined in `services/emailService.js`:

- `sendChapterEmail()` - Welcome email with Chapter 1
- `sendContactNotification()` - Contact form to admin
- `sendContactAutoReply()` - Auto-reply to submitter
- `sendPurchaseConfirmation()` - Order confirmation with downloads

Customize templates by editing the HTML in each method.

## Webhook Testing

### Using Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3001/api/webhooks/stripe

# Trigger test events
stripe trigger checkout.session.completed
```

### Manual Testing

Use cURL or Postman:

```bash
curl -X POST http://localhost:3001/api/email/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Deployment

### Vercel (Serverless)

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard.

### Heroku

```bash
heroku create invisible-users-api
heroku config:set SMTP_HOST=smtp.gmail.com
heroku config:set STRIPE_SECRET_KEY=sk_live_...
git push heroku main
```

### DigitalOcean App Platform

1. Connect GitHub repository
2. Select Node.js environment
3. Add environment variables
4. Deploy

### Railway

```bash
railway init
railway up
```

Configure environment variables in Railway dashboard.

## Frontend Integration

### Update Website Forms

In `/web/preview.html` and `/web/services.html`, update form handlers:

```javascript
// Replace this:
console.log('Email submitted:', email);

// With this:
const response = await fetch('https://your-api-domain.com/api/email/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source: 'preview-page' })
});

const data = await response.json();

if (data.success) {
    // Show success message
} else {
    // Show error
}
```

### Stripe Checkout Integration

```javascript
// In web/index.html pricing section
async function checkout(productType) {
    const response = await fetch('https://your-api-domain.com/api/payment/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            productType,
            email: userEmail, // Optional
            successUrl: window.location.origin + '/success.html',
            cancelUrl: window.location.origin + '/#buy'
        })
    });

    const data = await response.json();

    if (data.success) {
        window.location.href = data.url; // Redirect to Stripe Checkout
    }
}
```

## Monitoring

### Logs

```bash
# Development
npm run dev

# Production (PM2)
pm2 start server.js --name invisible-users-api
pm2 logs invisible-users-api
pm2 monit
```

### Health Checks

Set up uptime monitoring:

- UptimeRobot: Check `/api/health` every 5 minutes
- Pingdom
- Better Uptime

### Error Tracking

Integrate Sentry for error monitoring:

```bash
npm install @sentry/node
```

Add to `server.js`:

```javascript
const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN });
```

## Security Checklist

- [x] HTTPS only (handled by hosting platform)
- [x] CORS configured
- [x] Helmet security headers
- [x] Rate limiting
- [x] Input validation
- [x] Environment variables for secrets
- [x] Webhook signature verification
- [ ] Add authentication for admin routes (if needed)
- [ ] Add request logging/audit trail
- [ ] Add GDPR compliance features

## Troubleshooting

### Emails not sending

1. Check SMTP credentials in `.env`
2. Verify SMTP port (587 for TLS, 465 for SSL)
3. Check Gmail "Less secure app access" or use App Password
4. Review server logs for specific errors

### Stripe webhooks not working

1. Verify webhook secret in `.env`
2. Check webhook signature in Stripe dashboard
3. Test with Stripe CLI: `stripe listen`
4. Ensure endpoint is publicly accessible

### ConvertKit errors

1. Verify API key and form ID
2. Check subscriber doesn't already exist
3. Review ConvertKit API logs in dashboard

### CORS errors

1. Add frontend domain to `ALLOWED_ORIGINS` in `.env`
2. Ensure credentials are included in fetch requests
3. Check browser console for specific error

## Database (Optional)

To persist leads and orders, add database integration:

### PostgreSQL

```bash
npm install pg
```

Create tables:

```sql
CREATE TABLE subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    source VARCHAR(100),
    subscribed_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    product_type VARCHAR(50),
    amount INTEGER,
    stripe_session_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### MongoDB

```bash
npm install mongodb
```

## Support

For issues or questions:

- Email: <tom@allabout.network>
- Website: allabout.network

## License

Copyright © 2025 Tom Cranstoun. All rights reserved.
