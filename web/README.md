# The Invisible Users - Website

Professional marketing website for "The Invisible Users: Designing the Web for AI Agents and Everyone Else" by Tom Cranstoun.

## Overview

This is a conversion-optimised website built with semantic HTML, modern CSS, and vanilla JavaScript. The site demonstrates the principles taught in the book: agent-friendly patterns, accessibility best practices, and clear state management.

## Structure

```
web/
├── index.html              # Main landing page
├── services.html           # Consulting, training, speaking services
├── styles.css              # Complete stylesheet with responsive design
├── script.js               # JavaScript for interactivity and analytics
└── README.md              # This file
```

## Features

### Landing Page (index.html)

- **Hero Section**: Clear value proposition with book mockup
- **Problem Section**: Four key failure patterns with business impact
- **Statistics**: Market data and projections
- **Solution Section**: Code examples (before/after patterns)
- **Contents Section**: All 10 chapters with word counts
- **Audience Section**: Six target personas
- **Testimonials**: Social proof (to be populated)
- **Author Section**: Bio and credentials
- **Pricing Section**: Three tiers (Digital, Complete Package, Team License)
- **FAQ Section**: Common questions answered
- **Footer**: Navigation and legal links

### Services Page (services.html)

- **Consulting Services**:
  - Site Audit (£5k-15k)
  - Implementation Partnership (£25k-75k)
  - Retained Advisory (£5k-15k/month)

- **Training & Workshops**:
  - Half-Day Workshop (£2.5k-5k)
  - Full-Day Workshop (£5k-10k)
  - Executive Briefing (£3k-7.5k)

- **Corporate Solutions**:
  - Team License (£500-2k)
  - White-Label Partnership (£10k-25k/year)
  - Custom Research (£15k-50k)

- **Speaking**: Conference and corporate events
- **Contact Form**: Lead generation with validation

## Design Principles

### Agent-Friendly Patterns Implemented

1. **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<section>`, `<article>`
2. **ARIA Attributes**: Screen reader and agent compatibility
3. **Clear State**: Buttons use `disabled` attribute, not just CSS
4. **Persistent Messages**: No toast notifications - errors stay visible
5. **Explicit Structure**: Headings, labels, meta descriptions
6. **Responsive Design**: Mobile-first approach

### Accessibility Features

- Keyboard navigation support
- Focus management
- ARIA labels and roles
- Sufficient colour contrast
- Clear visual hierarchy
- Skip links (can be added)
- Alt text for images (when added)

### Performance

- Minimal dependencies (Google Fonts only)
- Vanilla JavaScript (no frameworks)
- CSS custom properties for theming
- Lazy loading support ready
- Optimised for Core Web Vitals

## Styling

### CSS Architecture

- **CSS Custom Properties**: Consistent design tokens
- **Mobile-First**: Responsive breakpoints at 480px, 768px, 1024px
- **Utility Classes**: Reusable button styles, spacing
- **Grid & Flexbox**: Modern layout techniques
- **Smooth Animations**: Subtle transitions and hover effects

### Colour Palette

- Primary: `#2563eb` (Blue)
- Secondary: `#10b981` (Green)
- Accent: `#f59e0b` (Amber)
- Text: `#111827` (Dark)
- Background: `#ffffff` (White)
- Alt Background: `#f9fafb` (Light Grey)

### Typography

- Sans: Inter (Google Fonts)
- Mono: Fira Code (Google Fonts)
- Base size: 16px
- Line height: 1.6

## JavaScript Features

### Core Functionality

1. **Mobile Navigation**: Hamburger menu with ARIA support
2. **Smooth Scrolling**: Section anchors with offset for fixed nav
3. **Form Validation**: Email validation with clear error messages
4. **Analytics Tracking**: Event tracking for CTAs, sections, scroll depth
5. **Exit Intent**: Detects user leaving (can trigger offers)
6. **External Link Handling**: Opens in new tab with indicators

### Analytics Events Tracked

- CTA button clicks
- Section visibility
- Form submissions
- Pricing card interactions
- Chapter card clicks
- Scroll depth (25%, 50%, 75%, 100%)
- Time on page milestones
- Copy events (content theft monitoring)

## Setup & Deployment

### Local Development

1. No build process required - pure HTML/CSS/JS
2. Open `index.html` in browser
3. Use a local server for full testing:

```bash
# Python 3
python -m http.server 8000

# PHP
php -S localhost:8000

# Node.js (if you have http-server)
npx http-server
```

4. Visit `http://localhost:8000`

### Production Deployment

**Recommended Platforms:**

- **Netlify**: Drag & drop deployment, free SSL, forms integration
- **Vercel**: Zero-config deployment, edge functions available
- **GitHub Pages**: Free hosting, custom domain support
- **Cloudflare Pages**: Fast CDN, built-in analytics

**Deployment Steps (Netlify example):**

1. Create account at netlify.com
2. Drag `web/` folder to Netlify dashboard
3. Configure custom domain
4. Add environment variables (if using forms)
5. Enable form notifications

### Domain Setup

1. Purchase domain (e.g., invisible-users.com)
2. Configure DNS:
   - A record: point to hosting provider
   - CNAME: www subdomain
3. Enable SSL certificate (automatic on Netlify/Vercel)
4. Update Open Graph URLs in HTML

### Forms Setup

The contact form requires backend integration. Options:

1. **Netlify Forms**: Enable in site settings (easiest)
2. **Formspree**: Add action URL to form
3. **ConvertKit**: Email marketing integration
4. **Custom API**: Build with Serverless functions

### Analytics Setup

Replace placeholder tracking in `script.js`:

```javascript
// Google Analytics
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>

// Plausible Analytics (privacy-friendly alternative)
<script defer data-domain="invisible-users.com" src="https://plausible.io/js/script.js"></script>
```

## Customisation

### Update Pricing

Edit pricing in:
- `index.html` (lines 500-600)
- `services.html` (throughout service cards)

### Add Images

1. Create `images/` directory
2. Add:
   - `book-cover.jpg` (600x900px)
   - `og-image.jpg` (1200x630px for social sharing)
   - `author-photo.jpg` (400x400px)
3. Update image paths in HTML
4. Add `alt` attributes for accessibility

### Modify Content

- **Hero text**: Edit `index.html` lines 50-80
- **Problem cards**: Lines 150-250
- **Testimonials**: Lines 400-500 (replace placeholders)
- **Services**: Edit `services.html` throughout

### Add Pages

Create new HTML files following the template:

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
    <!-- Copy <head> from index.html -->
</head>
<body>
    <!-- Copy <nav> from index.html -->

    <!-- Your content here -->

    <!-- Copy <footer> from index.html -->
    <script src="script.js"></script>
</body>
</html>
```

## SEO Optimisation

### Current Implementation

- Semantic HTML structure
- Meta descriptions
- Open Graph tags
- Twitter Card tags
- Descriptive headings
- Internal linking

### To Add

1. **Sitemap**: Generate `sitemap.xml`
2. **robots.txt**: Create with:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://invisible-users.com/sitemap.xml
   ```
3. **Schema.org Markup**: Add Book schema
4. **Blog**: Add content marketing section
5. **Case Studies**: Add real implementation examples

## Performance Checklist

- [ ] Compress images (use WebP format)
- [ ] Minify CSS and JS for production
- [ ] Add `loading="lazy"` to images
- [ ] Implement service worker for offline support
- [ ] Enable Brotli compression on server
- [ ] Add preload hints for critical resources
- [ ] Optimise font loading (font-display: swap)

## Conversion Optimisation

### A/B Testing Opportunities

1. Hero CTA button text ("Get the Book" vs "Buy Now" vs "Start Reading")
2. Pricing display (show savings vs not)
3. Testimonial placement (above vs below fold)
4. Form length (short vs detailed)
5. Social proof (testimonials vs statistics)

### Tools to Integrate

- **Hotjar**: Heatmaps and session recordings
- **Google Optimize**: A/B testing
- **Crazy Egg**: Click tracking
- **Microsoft Clarity**: Free session replay

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS 12+, Android 8+

## Maintenance

### Regular Updates

- Add new testimonials as received
- Update statistics (market data)
- Add speaking engagements
- Publish case studies
- Update FAQ based on questions received

### Monitoring

- Check forms working monthly
- Review analytics for drop-off points
- Test on multiple devices quarterly
- Validate HTML/CSS annually
- Security updates for any dependencies

## Legal Pages Needed

Create these additional pages:

1. `terms.html` - Terms of Service
2. `privacy.html` - Privacy Policy (GDPR compliant)
3. `refunds.html` - Refund Policy
4. `cookies.html` - Cookie Policy (if using analytics)

Templates available at: iubenda.com, termly.io

## Email Marketing Integration

Recommended platforms:

1. **ConvertKit**: Best for creators, automation
2. **Mailchimp**: Free tier, easy templates
3. **Drip**: E-commerce focused
4. **ActiveCampaign**: Advanced automation

Add email signup forms to:
- Footer
- After blog posts
- Exit intent popup
- Free chapter download

## Payment Integration

For direct book sales:

1. **Gumroad**: Easiest, 10% fee + payment processing
2. **LemonSqueezy**: EU VAT handling, 5% fee
3. **Stripe**: Most control, requires backend
4. **PayPal**: Widest acceptance, 3.4% + £0.20

Add "Buy Now" buttons linking to checkout pages.

## TODO Before Launch

- [ ] Add real author photo
- [ ] Add book cover image
- [ ] Create og-image for social sharing
- [ ] Set up email marketing platform
- [ ] Set up payment processing (Gumroad/LemonSqueezy)
- [ ] Write legal pages (terms, privacy, refunds)
- [ ] Configure analytics (GA or Plausible)
- [ ] Set up contact form backend (Netlify Forms)
- [ ] Add testimonials (replace placeholders)
- [ ] Create favicon set (16x16, 32x32, 180x180)
- [ ] Test all links
- [ ] Proofread all copy
- [ ] Test checkout flows
- [ ] Set up email autoresponders
- [ ] Configure custom domain and SSL
- [ ] Submit sitemap to Google Search Console

## Support

For questions or issues:

- Email: tom@allabout.network
- Website: allabout.network
- LinkedIn: linkedin.com/in/tomcranstoun

---

Built with semantic HTML, modern CSS, and vanilla JavaScript.
Demonstrates the agent-friendly principles taught in the book.

Copyright © 2025 Tom Cranstoun. All rights reserved.
