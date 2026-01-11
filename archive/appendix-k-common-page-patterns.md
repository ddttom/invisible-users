# Appendix K: Common Page Patterns

Production-ready HTML templates demonstrating AI-friendly patterns for common page types.

## Introduction: Building Pages That Work for Everyone

Modern websites follow recognisable patterns. Home pages welcome visitors. About pages explain who you are. Contact pages provide ways to reach you. Product pages sell items. Blog posts share insights.

These familiar structures create an opportunity: when you implement them correctly once, with AI-friendly patterns built in from the start, every page benefits both humans and agents.

This appendix provides complete, production-ready HTML for eight common page types. Each example demonstrates:

- **Semantic HTML structure** — Using `<main>`, `<nav>`, `<article>`, `<section>` to convey meaning
- **Schema.org JSON-LD** — Machine-readable structured data specific to the page type
- **Explicit state attributes** — Making page state and data visible in the DOM
- **AI meta tags** — Guiding agent behaviour with proposed patterns
- **Accessible markup** — ARIA attributes and WCAG-compliant structure
- **Real content** — Not lorem ipsum, but actual marketing copy demonstrating tone and structure

### The Common Skeleton

All examples share the same foundational structure:

**Document structure:**

- HTML5 DOCTYPE with British English (`lang="en-GB"`)
- Character encoding and viewport meta tags
- Author and description metadata
- AI-specific meta tags (proposed pattern from Chapter 10)
- Appropriate Schema.org JSON-LD for the page type

**CSS approach:**

Each example includes complete inline styles for simplicity. In production, you would extract these to external stylesheets. The styles demonstrate:

- Consistent colour palette (blue gradients for headers, neutral greys for text)
- WCAG AA contrast compliance (4.5:1 minimum for normal text)
- Responsive design with mobile breakpoints
- Professional typography using system font stack

**Navigation pattern:**

- Floating "Home" button (top-left) for easy navigation
- Floating "Back to Top" button (bottom-left) for long pages
- Both buttons meet WCAG AA contrast requirements
- Smooth scroll behaviour on modern browsers

**Footer structure:**

- Contact links (email, website, LinkedIn, GitHub)
- Copyright notice
- Last updated date
- Semantic `role="contentinfo"` for accessibility

### Using These Templates

**Copy and adapt:**

These are starting points, not rigid specifications. Copy the HTML, replace the content with your own, adjust the styles to match your brand, and deploy.

**Maintain the patterns:**

The examples demonstrate specific AI-friendly patterns. When adapting them:

- Keep Schema.org JSON-LD (update the content, not the structure)
- Preserve data attributes (data-state, data-product-id, etc.)
- Maintain semantic HTML elements
- Update AI meta tags to reflect your content policy

**Extend thoughtfully:**

Need a feature not shown here? Refer to Appendix D (AI-Friendly HTML Guide) for additional patterns. Want to see these patterns in action? View the source of any page at <https://allabout.network/invisible-users/web/>.

---

## 1. Home Page: The Digital Storefront

The home page is your digital storefront. It must immediately communicate what you offer, who you serve, and why visitors should care. For AI agents, it needs clear schema, navigation structure, and value proposition data.

**AI-friendly patterns demonstrated:**

- WebSite schema with searchAction for site search integration
- Organization schema with contact information
- Navigation with explicit data-nav-type attributes
- Clear value propositions with data-benefit attributes
- Call-to-action links with descriptive text

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Tom Cranstoun">
  <meta name="description" content="The Invisible Users - A practical guide to designing websites that work for AI agents and everyone else. Learn AI-friendly patterns, accessibility best practices, and future-proof implementation strategies.">

  <!-- AI-specific meta tags (proposed pattern from Chapter 10) -->
  <meta name="ai-preferred-access" content="html">
  <meta name="ai-content-policy" content="summaries-allowed, full-extraction-allowed">
  <meta name="ai-freshness" content="monthly">
  <meta name="ai-structured-data" content="json-ld">
  <meta name="ai-attribution" content="required">

  <title>The Invisible Users | Designing the Web for AI Agents and Everyone Else</title>

  <!-- Schema.org structured data for home page -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Invisible Users",
    "description": "A practical guide to designing websites that work for AI agents and everyone else",
    "url": "https://allabout.network/invisible-users",
    "author": {
      "@type": "Person",
      "name": "Tom Cranstoun",
      "email": "tom.cranstoun@gmail.com",
      "url": "https://allabout.network",
      "sameAs": [
        "https://www.linkedin.com/in/tom-cranstoun/",
        "https://github.com/Digital-Domain-Technologies-Ltd"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Digital Domain Technologies Ltd",
      "url": "https://allabout.network"
    },
    "inLanguage": "en-GB",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://allabout.network/invisible-users/web/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }
  </script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
    }

    header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
    }

    header h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    header p {
      font-size: 1.5rem;
      max-width: 800px;
      margin: 0 auto 2rem;
      color: #e0e7ff;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .hero-buttons {
      margin-top: 2rem;
    }

    .btn {
      display: inline-block;
      background: #2563eb;
      color: white;
      padding: 1rem 2.5rem;
      border-radius: 6px;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.2s;
      margin: 0.5rem;
      font-size: 1.1rem;
    }

    .btn:hover {
      background: #1d4ed8;
    }

    .btn-secondary {
      background: white;
      color: #2563eb;
    }

    .btn-secondary:hover {
      background: #f3f4f6;
      color: #1d4ed8;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 4rem 0;
    }

    .feature-card {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 2rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

    .feature-card h3 {
      font-size: 1.5rem;
      color: #1e40af;
      margin-bottom: 1rem;
    }

    .feature-card p {
      color: #4b5563;
      margin-bottom: 1rem;
    }

    .feature-card ul {
      margin-left: 1.5rem;
      color: #6b7280;
    }

    .audience-section {
      background: #eff6ff;
      border-radius: 8px;
      padding: 3rem 2rem;
      margin: 4rem 0;
    }

    .audience-section h2 {
      text-align: center;
      font-size: 2rem;
      color: #1e40af;
      margin-bottom: 2rem;
    }

    .audience-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .audience-card {
      background: white;
      border-left: 4px solid #3b82f6;
      border-radius: 8px;
      padding: 1.5rem;
    }

    .audience-card h3 {
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .audience-card p {
      color: #6b7280;
      font-size: 0.95rem;
    }

    .cta-section {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      border-radius: 8px;
      padding: 4rem 2rem;
      text-align: center;
      margin: 4rem 0;
    }

    .cta-section h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .cta-section p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
      color: #e0e7ff;
    }

    footer {
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      padding: 2rem;
      text-align: center;
      margin-top: 4rem;
    }

    footer p {
      color: #6b7280;
      margin: 0.25rem 0;
    }

    .contact-links {
      margin: 1.5rem 0;
    }

    .contact-links a {
      color: #2563eb;
      margin: 0 1rem;
      text-decoration: none;
    }

    .contact-links a:hover {
      text-decoration: underline;
    }

    /* Floating navigation buttons */
    .floating-home-button {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .floating-home-button:hover {
      background-color: #003d7a;
      box-shadow: 0 6px 16px rgba(0, 102, 204, 0.4);
      transform: translateY(-2px);
    }

    .floating-top-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .floating-top-button:hover {
      background-color: #003d7a;
      box-shadow: 0 6px 16px rgba(0, 102, 204, 0.4);
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      header h1 {
        font-size: 2rem;
      }
      header p {
        font-size: 1.1rem;
      }
      .features {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>The Invisible Users</h1>
    <p>Designing the Web for AI Agents and Everyone Else</p>
    <div class="hero-buttons">
      <a href="appendix-index.html" class="btn">View Appendices</a>
      <a href="#about" class="btn btn-secondary">Learn More</a>
    </div>
  </header>

  <main class="container" role="main" data-load-state="complete">

    <section id="about" data-section-type="introduction">
      <h2 style="font-size: 2.5rem; color: #1e40af; margin-bottom: 1.5rem; text-align: center;">A Practical Guide to the Collision Between Modern Web Design and AI Agents</h2>
      <p style="font-size: 1.25rem; color: #4b5563; text-align: center; max-width: 900px; margin: 0 auto 3rem;">
        Modern web design optimised for human users often fails for AI agents. Toast notifications vanish before agents can process them. Pagination hides content. Single-page applications obscure state changes. This book examines why these patterns break agents — and shows how fixing them benefits everyone.
      </p>
    </section>

    <div class="features">
      <article class="feature-card" data-benefit="practical-guidance">
        <h3>Production-Ready Patterns</h3>
        <p>Not theoretical frameworks, but battle-tested implementation guidance:</p>
        <ul>
          <li>Semantic HTML that works for all agents</li>
          <li>Explicit state management patterns</li>
          <li>Schema.org structured data examples</li>
          <li>Form validation that agents can parse</li>
          <li>Complete code examples you can deploy today</li>
        </ul>
      </article>

      <article class="feature-card" data-benefit="universal-compatibility">
        <h3>Universal Compatibility</h3>
        <p>Patterns that work across diverse agent architectures:</p>
        <ul>
          <li>CLI agents (command-line tools)</li>
          <li>Browser automation agents (Playwright, Selenium)</li>
          <li>Server-based agents (cloud-hosted)</li>
          <li>Browser extension assistants</li>
          <li>IDE-integrated browser controls</li>
        </ul>
      </article>

      <article class="feature-card" data-benefit="human-benefits">
        <h3>Benefits for Humans</h3>
        <p>The patterns that help AI agents also improve human experiences:</p>
        <ul>
          <li>Persistent error messages (no vanishing toasts)</li>
          <li>Clear navigation structure</li>
          <li>Semantic HTML aids screen readers</li>
          <li>Explicit state reduces confusion</li>
          <li>Honest pricing and complete information</li>
        </ul>
      </article>
    </div>

    <section class="audience-section">
      <h2>Who This Book Serves</h2>
      <div class="audience-grid">
        <article class="audience-card" data-audience="developers">
          <h3>Web Professionals</h3>
          <p>Developers, designers, and accessibility specialists looking to future-proof their websites with patterns that work for both humans and AI agents.</p>
        </article>

        <article class="audience-card" data-audience="agent-builders">
          <h3>Agent System Developers</h3>
          <p>Engineers building AI agents that need to browse websites reliably. Chapter 11 provides validation frameworks and confidence scoring patterns.</p>
        </article>

        <article class="audience-card" data-audience="business-leaders">
          <h3>Business Leaders</h3>
          <p>CTOs and product owners making strategic decisions about agent-mediated commerce and the commercial impact of AI agents on digital business.</p>
        </article>

        <article class="audience-card" data-audience="investors">
          <h3>Partners & Investors</h3>
          <p>Agencies and investors evaluating opportunities in the emerging agent economy and understanding the commercial potential of this new market category.</p>
        </article>
      </div>
    </section>

    <section data-section-type="key-themes" style="margin: 4rem 0;">
      <h2 style="font-size: 2rem; color: #1e40af; margin-bottom: 2rem;">Key Themes</h2>

      <article style="margin-bottom: 3rem;">
        <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 1rem;">Agent Diversity and Universal Patterns</h3>
        <p style="color: #4b5563; margin-bottom: 1rem;">
          The book addresses a diverse ecosystem of AI agents — from lightweight CLI tools to full browser automation systems. Rather than optimising for specific agent types, it focuses on universal compatibility patterns: semantic HTML that works regardless of JavaScript execution, explicit state attributes visible in the DOM for any parser, and structured data that's machine-readable across all architectures.
        </p>
      </article>

      <article style="margin-bottom: 3rem;">
        <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 1rem;">Identity Delegation</h3>
        <p style="color: #4b5563; margin-bottom: 1rem;">
          When AI agents transact on behalf of customers, the business-customer relationship breaks down. The book discusses identity delegation patterns as one emerging solution, acknowledging multiple approaches without prescribing a specific implementation. The Universal Identity Delegation Infrastructure project is introduced as an open-source initiative addressing this challenge.
        </p>
      </article>

      <article style="margin-bottom: 3rem;">
        <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 1rem;">Session Inheritance Problem</h3>
        <p style="color: #4b5563; margin-bottom: 1rem;">
          A critical security insight explored in Chapter 6: in-browser agents inherit authenticated sessions rather than failing to authenticate. Banks cannot detect AI involvement because agents inherit proof-of-humanity tokens from the user's existing session. This has profound implications for security architecture.
        </p>
      </article>
    </section>

    <section class="cta-section">
      <h2>Ready to Build Better Websites?</h2>
      <p>Start with the free appendices, explore the patterns, and transform your websites to work for everyone.</p>
      <div class="hero-buttons">
        <a href="appendix-index.html" class="btn" style="background: white; color: #2563eb;">View All Appendices</a>
        <a href="mailto:tom.cranstoun@gmail.com?subject=Question about The Invisible Users" class="btn" style="background: #1e40af; color: white;">Contact the Author</a>
      </div>
    </section>

  </main>

  <footer role="contentinfo">
    <div class="contact-links">
      <a href="mailto:tom.cranstoun@gmail.com">Email</a>
      <a href="https://allabout.network">Website</a>
      <a href="https://www.linkedin.com/in/tom-cranstoun/">LinkedIn</a>
      <a href="https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript">GitHub</a>
    </div>
    <p>&copy; 2026 Tom Cranstoun. All rights reserved.</p>
    <p>Last updated: January 2026</p>
  </footer>

  <!-- Floating home button (top-left) -->
  <a href="index.html" class="floating-home-button" aria-label="Back to Home">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0L0 8h3v8h10V8h3L8 0zm0 2.5L13.5 8H11v6H5V8H2.5L8 2.5z"/>
    </svg>
    Home
  </a>

  <!-- Floating back to top button (bottom-left) -->
  <a href="#" class="floating-top-button" aria-label="Back to Top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 3.5l-5.5 5.5L4 10.5l3-3v8.5h2V7.5l3 3L13.5 9z"/>
    </svg>
    Top
  </a>
</body>
</html>
```

---

## 2. About Page: Project Background and Mission

The about page explains who you are, what you do, and why it matters. For AI agents, it needs Organization or Person schema with clear contact information and project description.

**AI-friendly patterns demonstrated:**

- Person schema with professional credentials
- Clear mission statement with data-purpose attribute
- Project history with temporal structure
- Contact information with explicit links

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Tom Cranstoun">
  <meta name="description" content="About The Invisible Users project - the author's journey from discovering AI agent compatibility challenges to creating practical implementation guidance for web professionals worldwide.">

  <!-- AI-specific meta tags -->
  <meta name="ai-preferred-access" content="html">
  <meta name="ai-content-policy" content="summaries-allowed, full-extraction-allowed">
  <meta name="ai-freshness" content="monthly">
  <meta name="ai-structured-data" content="json-ld">
  <meta name="ai-attribution" content="required">

  <title>About | The Invisible Users</title>

  <!-- Schema.org structured data for about page -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About The Invisible Users",
    "description": "The story behind The Invisible Users book and project",
    "url": "https://allabout.network/invisible-users/web/about.html",
    "mainEntity": {
      "@type": "Person",
      "name": "Tom Cranstoun",
      "email": "tom.cranstoun@gmail.com",
      "url": "https://allabout.network",
      "sameAs": [
        "https://www.linkedin.com/in/tom-cranstoun/",
        "https://github.com/Digital-Domain-Technologies-Ltd"
      ],
      "jobTitle": "Software Consultant, Author",
      "worksFor": {
        "@type": "Organization",
        "name": "Digital Domain Technologies Ltd",
        "url": "https://allabout.network"
      },
      "alumniOf": "Various technology companies",
      "knowsAbout": [
        "Web Development",
        "AI Agent Compatibility",
        "Accessibility",
        "Software Architecture",
        "Identity Delegation"
      ]
    },
    "author": {
      "@type": "Person",
      "name": "Tom Cranstoun"
    },
    "inLanguage": "en-GB"
  }
  </script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
    }

    header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
    }

    header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    header p {
      font-size: 1.25rem;
      color: #e0e7ff;
      max-width: 800px;
      margin: 0 auto;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .about-content h2 {
      font-size: 1.75rem;
      color: #1e40af;
      margin: 3rem 0 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #3b82f6;
    }

    .about-content p {
      color: #4b5563;
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
    }

    .about-content ul {
      margin: 1rem 0 1.5rem 2rem;
      color: #4b5563;
    }

    .about-content li {
      margin-bottom: 0.5rem;
    }

    .highlight-box {
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
      border-radius: 8px;
      padding: 2rem;
      margin: 2rem 0;
    }

    .highlight-box h3 {
      color: #1e40af;
      margin-bottom: 1rem;
    }

    .highlight-box p {
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .cta-box {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      border-radius: 8px;
      padding: 2rem;
      margin: 3rem 0;
      text-align: center;
    }

    .cta-box h3 {
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .cta-box p {
      color: #e0e7ff;
      margin-bottom: 1.5rem;
    }

    .btn {
      display: inline-block;
      background: white;
      color: #2563eb;
      padding: 0.75rem 2rem;
      border-radius: 6px;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.2s;
      margin: 0.5rem;
    }

    .btn:hover {
      background: #f3f4f6;
    }

    footer {
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      padding: 2rem;
      text-align: center;
      margin-top: 4rem;
    }

    footer p {
      color: #6b7280;
      margin: 0.25rem 0;
    }

    .contact-links {
      margin: 1.5rem 0;
    }

    .contact-links a {
      color: #2563eb;
      margin: 0 1rem;
      text-decoration: none;
    }

    .contact-links a:hover {
      text-decoration: underline;
    }

    .floating-home-button {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .floating-home-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    .floating-top-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
      cursor: pointer;
    }

    .floating-top-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <header>
    <h1>About This Project</h1>
    <p>The story behind The Invisible Users</p>
  </header>

  <main class="container about-content" role="main" data-load-state="complete">

    <section data-section-type="mission" data-purpose="project-overview">
      <h2>The Mission</h2>
      <p>
        Modern web design optimised for human users often fails for AI agents. This book examines why these patterns break agents — and demonstrates how fixing them benefits everyone. It's not about choosing between humans and AI; it's about building clearer, more accessible interfaces that serve both.
      </p>
      <p>
        The patterns that break AI agents also break humans. Toast notifications that vanish before anyone can read them. Pagination that hides content arbitrarily. Single-page applications with invisible state changes. These have been creating accessibility problems for years. Now AI agents are struggling with the same patterns, and there's commercial pressure to fix them.
      </p>
    </section>

    <section data-section-type="author-background">
      <h2>The Author's Journey</h2>
      <p>
        Tom Cranstoun is a software consultant who has spent decades building web systems. Whilst working on identity delegation infrastructure, he noticed a recurring pattern: modern websites were beautifully designed for human users but completely opaque to AI agents trying to act on users' behalf.
      </p>
      <p>
        What started as debugging frustration evolved into systematic research. Every pattern that broke agents turned out to be a pattern that also degraded human accessibility. Forms that validated only on submission. Error messages that disappeared after three seconds. Authentication states visible only through CSS styling. Visual-only feedback with no semantic markup.
      </p>
      <p>
        This book distils those learnings into practical guidance. Not theoretical frameworks, but production-ready patterns you can implement today.
      </p>
    </section>

    <div class="highlight-box" data-content-type="key-insight">
      <h3>Why This Matters Now</h3>
      <p>
        AI agents are no longer research projects. They're production systems making real purchases, booking actual appointments, and conducting business on behalf of users. When websites aren't designed for agent compatibility, agents fail — and users lose access to services.
      </p>
      <p>
        The commercial pressure to support agents creates an opportunity to fix accessibility problems that have existed for years. Better patterns for agents mean better experiences for everyone.
      </p>
    </div>

    <section data-section-type="project-scope">
      <h2>What This Project Includes</h2>
      <p>The Invisible Users is more than a book. It's an integrated set of resources:</p>
      <ul>
        <li><strong>The Book</strong> — 11 chapters (~57,000 words) examining the collision between modern web design and AI agents</li>
        <li><strong>10 Appendices</strong> — Freely accessible online with implementation cookbooks, battle-tested lessons, and real-world case studies</li>
        <li><strong>Web Audit Suite</strong> — A comprehensive Node.js tool implementing the patterns described in the book (available as separate purchase or professional service)</li>
        <li><strong>Code Examples</strong> — Production-ready implementations demonstrating AI-friendly patterns</li>
        <li><strong>Identity Delegation Project</strong> — Open-source infrastructure for portable agent authorisations</li>
      </ul>
    </section>

    <section data-section-type="standards-approach">
      <h2>Standards-Based Approach</h2>
      <p>This book carefully distinguishes between established standards and proposed patterns:</p>
      <ul>
        <li><strong>Established Standards</strong> — Schema.org, semantic HTML, ARIA (use with confidence)</li>
        <li><strong>Emerging Conventions</strong> — llms.txt from llmstxt.org (early adoption phase)</li>
        <li><strong>Proposed Patterns</strong> — ai-* meta tags, data-agent-visible (experimental, forward-compatible)</li>
      </ul>
      <p>
        All proposed patterns are designed to be forward-compatible. They won't break anything if agents don't recognise them. Think of them as progressive enhancement for AI.
      </p>
    </section>

    <div class="cta-box">
      <h3>Explore the Content</h3>
      <p>All ten appendices are freely available online. Start with the Implementation Cookbook or dive into battle-tested lessons from production deployments.</p>
      <a href="appendix-index.html" class="btn">View All Appendices</a>
      <a href="mailto:tom.cranstoun@gmail.com?subject=Question about The Invisible Users" class="btn">Contact Tom</a>
    </div>

  </main>

  <footer role="contentinfo">
    <div class="contact-links">
      <a href="mailto:tom.cranstoun@gmail.com">Email</a>
      <a href="https://allabout.network">Website</a>
      <a href="https://www.linkedin.com/in/tom-cranstoun/">LinkedIn</a>
      <a href="https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript">GitHub</a>
    </div>
    <p>&copy; 2026 Tom Cranstoun. All rights reserved.</p>
    <p>Last updated: January 2026</p>
  </footer>

  <a href="index.html" class="floating-home-button" aria-label="Back to Home">Home</a>
  <a href="#" class="floating-top-button" aria-label="Back to Top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">Top</a>
</body>
</html>
```

---

## 3. Contact Page: Clear Communication Channels

The contact page provides explicit ways to reach you. For AI agents, it needs clear contact information with proper schema and machine-readable links.

**AI-friendly patterns demonstrated:**

- ContactPage schema with contact options
- Explicit contact methods with data-contact-type attributes
- Email links with proper mailto: protocol
- Response time expectations with data-response-time attribute

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Tom Cranstoun">
  <meta name="description" content="Contact Tom Cranstoun about The Invisible Users book, professional web audits, collaboration opportunities, or the identity delegation project.">

  <!-- AI-specific meta tags -->
  <meta name="ai-preferred-access" content="html">
  <meta name="ai-content-policy" content="summaries-allowed, full-extraction-allowed">
  <meta name="ai-freshness" content="monthly">
  <meta name="ai-structured-data" content="json-ld">
  <meta name="ai-attribution" content="required">

  <title>Contact | The Invisible Users</title>

  <!-- Schema.org structured data for contact page -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Tom Cranstoun",
    "description": "Get in touch about The Invisible Users book, web audits, or collaboration",
    "url": "https://allabout.network/invisible-users/web/contact.html",
    "mainEntity": {
      "@type": "Person",
      "name": "Tom Cranstoun",
      "email": "tom.cranstoun@gmail.com",
      "url": "https://allabout.network",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Professional Enquiries",
        "email": "tom.cranstoun@gmail.com",
        "availableLanguage": ["English"]
      },
      "sameAs": [
        "https://www.linkedin.com/in/tom-cranstoun/",
        "https://github.com/Digital-Domain-Technologies-Ltd"
      ]
    },
    "inLanguage": "en-GB"
  }
  </script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
    }

    header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
    }

    header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    header p {
      font-size: 1.25rem;
      color: #e0e7ff;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .contact-methods {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin: 3rem 0;
    }

    .contact-card {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .contact-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

    .contact-card h3 {
      font-size: 1.5rem;
      color: #1e40af;
      margin-bottom: 1rem;
    }

    .contact-card p {
      color: #4b5563;
      margin-bottom: 1.5rem;
    }

    .contact-card a {
      display: inline-block;
      background: #2563eb;
      color: white;
      padding: 0.75rem 2rem;
      border-radius: 6px;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.2s;
    }

    .contact-card a:hover {
      background: #1d4ed8;
    }

    .topics-section {
      background: #eff6ff;
      border-radius: 8px;
      padding: 2rem;
      margin: 3rem 0;
    }

    .topics-section h2 {
      color: #1e40af;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .topics-section ul {
      margin-left: 2rem;
      color: #4b5563;
    }

    .topics-section li {
      margin-bottom: 0.75rem;
    }

    .response-info {
      background: white;
      border-left: 4px solid #3b82f6;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem 0;
    }

    .response-info h3 {
      color: #1e40af;
      margin-bottom: 0.5rem;
    }

    .response-info p {
      color: #4b5563;
    }

    footer {
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      padding: 2rem;
      text-align: center;
      margin-top: 4rem;
    }

    footer p {
      color: #6b7280;
      margin: 0.25rem 0;
    }

    .contact-links {
      margin: 1.5rem 0;
    }

    .contact-links a {
      color: #2563eb;
      margin: 0 1rem;
      text-decoration: none;
    }

    .contact-links a:hover {
      text-decoration: underline;
    }

    .floating-home-button {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .floating-home-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    .floating-top-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
      cursor: pointer;
    }

    .floating-top-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .contact-methods {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Get in Touch</h1>
    <p>Questions, collaboration, or professional services</p>
  </header>

  <main class="container" role="main" data-load-state="complete">

    <section data-section-type="introduction">
      <p style="font-size: 1.15rem; color: #4b5563; text-align: center; margin-bottom: 2rem;">
        Whether you have questions about the book, need a professional web audit, want to discuss the identity delegation project, or explore collaboration opportunities, I'm happy to hear from you.
      </p>
    </section>

    <div class="contact-methods">
      <article class="contact-card" data-contact-type="email" data-response-time="24-48-hours">
        <h3>Email</h3>
        <p>Direct email for all enquiries. Best for detailed questions or proposal discussions.</p>
        <a href="mailto:tom.cranstoun@gmail.com?subject=Enquiry about The Invisible Users">Send Email</a>
      </article>

      <article class="contact-card" data-contact-type="linkedin" data-response-time="1-3-days">
        <h3>LinkedIn</h3>
        <p>Connect for professional networking and collaboration opportunities.</p>
        <a href="https://www.linkedin.com/in/tom-cranstoun/" target="_blank" rel="noopener noreferrer">View Profile</a>
      </article>

      <article class="contact-card" data-contact-type="github" data-response-time="varies">
        <h3>GitHub</h3>
        <p>For technical discussions, code contributions, or reporting issues with the Web Audit Suite.</p>
        <a href="https://github.com/Digital-Domain-Technologies-Ltd" target="_blank" rel="noopener noreferrer">View Projects</a>
      </article>
    </div>

    <section class="topics-section">
      <h2>What to Contact Me About</h2>
      <ul>
        <li><strong>Book Questions</strong> — Implementation guidance, pattern clarifications, or content feedback</li>
        <li><strong>Professional Web Audits</strong> — Comprehensive AI agent compatibility analysis for your website</li>
        <li><strong>Web Audit Suite</strong> — Purchasing the tool or discussing the professional audit service</li>
        <li><strong>Identity Delegation Project</strong> — Technical collaboration or implementation support</li>
        <li><strong>Speaking Engagements</strong> — Conference talks or workshop facilitation</li>
        <li><strong>Consulting Services</strong> — Architecture review, implementation support, or team training</li>
        <li><strong>Partnership Opportunities</strong> — Agencies offering audit services or integration partners</li>
      </ul>
    </section>

    <div class="response-info">
      <h3>Response Times</h3>
      <p>
        Email enquiries typically receive a response within 24-48 hours during UK business days. Technical questions about the Web Audit Suite may require additional time for thorough investigation. If your enquiry is urgent, please mention this in the subject line.
      </p>
    </div>

  </main>

  <footer role="contentinfo">
    <div class="contact-links">
      <a href="mailto:tom.cranstoun@gmail.com">Email</a>
      <a href="https://allabout.network">Website</a>
      <a href="https://www.linkedin.com/in/tom-cranstoun/">LinkedIn</a>
      <a href="https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript">GitHub</a>
    </div>
    <p>&copy; 2026 Tom Cranstoun. All rights reserved.</p>
    <p>Last updated: January 2026</p>
  </footer>

  <a href="index.html" class="floating-home-button" aria-label="Back to Home">Home</a>
  <a href="#" class="floating-top-button" aria-label="Back to Top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">Top</a>
</body>
</html>
```

---

## 4. Sales Page: Book Purchase Landing Page

The sales page is dedicated to selling a specific product — in this case, the book itself. For AI agents, it needs Product schema with offers, clear pricing, and purchase links.

**AI-friendly patterns demonstrated:**

- Product schema with detailed offer information
- Clear pricing with data-price and data-currency attributes
- Purchase links with explicit data-action attributes
- Customer testimonials with Review schema
- Feature lists with data-benefit attributes

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Tom Cranstoun">
  <meta name="description" content="Purchase The Invisible Users - A practical guide to designing websites that work for AI agents and everyone else. Available in Kindle format with 10 free appendices.">

  <!-- AI-specific meta tags -->
  <meta name="ai-preferred-access" content="html">
  <meta name="ai-content-policy" content="summaries-allowed, full-extraction-allowed">
  <meta name="ai-freshness" content="monthly">
  <meta name="ai-structured-data" content="json-ld">
  <meta name="ai-attribution" content="required">

  <title>Purchase the Book | The Invisible Users</title>

  <!-- Schema.org structured data for product page -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "The Invisible Users: Designing the Web for AI Agents and Everyone Else",
    "description": "A practical guide examining how modern web design optimised for human users fails for AI agents, and how fixing this benefits everyone. Includes 11 chapters (~57,000 words), 10 free appendices, and production-ready code examples.",
    "author": {
      "@type": "Person",
      "name": "Tom Cranstoun",
      "email": "tom.cranstoun@gmail.com",
      "url": "https://allabout.network"
    },
    "inLanguage": "en-GB",
    "numberOfPages": "TBD",
    "bookFormat": "https://schema.org/EBook",
    "publisher": {
      "@type": "Organization",
      "name": "Digital Domain Technologies Ltd"
    },
    "datePublished": "2026-Q1",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/PreOrder",
      "price": "TBD",
      "priceCurrency": "GBP",
      "url": "https://allabout.network/invisible-users"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Web Professionals, Agent System Developers, Business Leaders, Partners & Investors"
    }
  }
  </script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
    }

    header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
    }

    header h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    header p {
      font-size: 1.5rem;
      max-width: 800px;
      margin: 0 auto 2rem;
      color: #e0e7ff;
    }

    .price-tag {
      background: white;
      color: #1e40af;
      display: inline-block;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-size: 2rem;
      font-weight: 700;
      margin: 1rem 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .purchase-box {
      background: #eff6ff;
      border: 3px solid #3b82f6;
      border-radius: 12px;
      padding: 3rem;
      margin: 3rem auto;
      max-width: 600px;
      text-align: center;
    }

    .purchase-box h2 {
      color: #1e40af;
      margin-bottom: 1.5rem;
      font-size: 2rem;
    }

    .purchase-box p {
      color: #4b5563;
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }

    .btn {
      display: inline-block;
      background: #2563eb;
      color: white;
      padding: 1.25rem 3rem;
      border-radius: 6px;
      font-weight: 700;
      text-decoration: none;
      transition: background 0.2s;
      margin: 0.5rem;
      font-size: 1.2rem;
    }

    .btn:hover {
      background: #1d4ed8;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 4rem 0;
    }

    .feature-card {
      background: #f9fafb;
      border-left: 4px solid #3b82f6;
      border-radius: 8px;
      padding: 2rem;
    }

    .feature-card h3 {
      color: #1e40af;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .feature-card p {
      color: #4b5563;
    }

    .what-you-get {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 3rem;
      margin: 4rem 0;
    }

    .what-you-get h2 {
      text-align: center;
      color: #1e40af;
      margin-bottom: 2rem;
      font-size: 2rem;
    }

    .what-you-get ul {
      list-style: none;
      max-width: 700px;
      margin: 0 auto;
    }

    .what-you-get li {
      padding: 1rem 0 1rem 3rem;
      position: relative;
      color: #4b5563;
      font-size: 1.1rem;
    }

    .what-you-get li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #10b981;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .guarantee-box {
      background: #f0fdf4;
      border: 2px solid #10b981;
      border-radius: 8px;
      padding: 2rem;
      margin: 3rem 0;
      text-align: center;
    }

    .guarantee-box h3 {
      color: #166534;
      margin-bottom: 1rem;
    }

    .guarantee-box p {
      color: #166534;
    }

    footer {
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      padding: 2rem;
      text-align: center;
      margin-top: 4rem;
    }

    footer p {
      color: #6b7280;
      margin: 0.25rem 0;
    }

    .contact-links {
      margin: 1.5rem 0;
    }

    .contact-links a {
      color: #2563eb;
      margin: 0 1rem;
      text-decoration: none;
    }

    .contact-links a:hover {
      text-decoration: underline;
    }

    .floating-home-button {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .floating-home-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    .floating-top-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
      cursor: pointer;
    }

    .floating-top-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      header h1 {
        font-size: 2rem;
      }
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>The Invisible Users</h1>
    <p>Designing the Web for AI Agents and Everyone Else</p>
    <div class="price-tag" data-price="TBD" data-currency="GBP" data-availability="preorder">
      Publication: Q1 2026
    </div>
  </header>

  <main class="container" role="main" data-load-state="complete">

    <div class="purchase-box" data-purchase-type="book" data-format="kindle">
      <h2>Get Your Copy</h2>
      <p>11 chapters of practical guidance, 10 free appendices, and production-ready code examples. Publication coming Q1 2026.</p>
      <a href="mailto:tom.cranstoun@gmail.com?subject=Book Purchase Enquiry" class="btn" data-action="purchase-enquiry">Pre-Order Enquiry</a>
    </div>

    <section class="what-you-get">
      <h2>What's Included</h2>
      <ul>
        <li>11 comprehensive chapters (~57,000 words) examining the collision between modern web design and AI agents</li>
        <li>10 freely accessible appendices with implementation cookbooks, battle-tested lessons, and real-world case studies</li>
        <li>Production-ready code examples demonstrating AI-friendly patterns</li>
        <li>Schema.org structured data templates for common page types</li>
        <li>Form validation patterns that work for both humans and agents</li>
        <li>Priority-based implementation roadmap (no time estimates, just clear priorities)</li>
        <li>150+ curated resources and references</li>
        <li>Real-world case study of a £20M+ pipeline failure</li>
        <li>Chapter 11 validation frameworks for agent system developers</li>
        <li>llms.txt example file with 20 curated links</li>
      </ul>
    </section>

    <div class="features-grid">
      <article class="feature-card" data-benefit="practical-implementation">
        <h3>Practical, Not Theoretical</h3>
        <p>Every pattern in this book has been tested in production. No theoretical frameworks — just code you can deploy today, with clear explanations of why each pattern matters.</p>
      </article>

      <article class="feature-card" data-benefit="universal-compatibility">
        <h3>Works for All Agents</h3>
        <p>From CLI tools to full browser automation, the patterns work across diverse agent architectures. Semantic HTML, explicit state, and structured data that any parser can understand.</p>
      </article>

      <article class="feature-card" data-benefit="human-benefits">
        <h3>Better for Humans Too</h3>
        <p>The patterns that help agents also improve accessibility for humans. Persistent errors, clear structure, semantic markup — these benefit everyone, not just machines.</p>
      </article>
    </div>

    <div class="guarantee-box">
      <h3>Free Appendices</h3>
      <p>All 10 appendices are freely accessible online at https://allabout.network/invisible-users/web/appendix-index.html — no purchase required. Explore the patterns before you buy.</p>
    </div>

  </main>

  <footer role="contentinfo">
    <div class="contact-links">
      <a href="mailto:tom.cranstoun@gmail.com">Email</a>
      <a href="https://allabout.network">Website</a>
      <a href="https://www.linkedin.com/in/tom-cranstoun/">LinkedIn</a>
      <a href="https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript">GitHub</a>
    </div>
    <p>&copy; 2026 Tom Cranstoun. All rights reserved.</p>
    <p>Last updated: January 2026</p>
  </footer>

  <a href="index.html" class="floating-home-button" aria-label="Back to Home">Home</a>
  <a href="#" class="floating-top-button" aria-label="Back to Top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">Top</a>
</body>
</html>
```

---

## 5. Collection Page: Resource Directory

The collection page lists related resources — appendices, chapters, or tools. For AI agents, it needs ItemList schema with clear navigation structure.

**AI-friendly patterns demonstrated:**

- CollectionPage schema with ItemList
- Each item with explicit data-item-type attribute
- Navigation links with descriptive text
- Category organization with data-category attributes

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Tom Cranstoun">
  <meta name="description" content="Complete directory of The Invisible Users appendices - implementation cookbooks, battle-tested lessons, quick references, and case studies for AI-friendly web design.">

  <!-- AI-specific meta tags -->
  <meta name="ai-preferred-access" content="html">
  <meta name="ai-content-policy" content="summaries-allowed, full-extraction-allowed">
  <meta name="ai-freshness" content="monthly">
  <meta name="ai-structured-data" content="json-ld">
  <meta name="ai-attribution" content="required">

  <title>Appendices Directory | The Invisible Users</title>

  <!-- Schema.org structured data for collection page -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "The Invisible Users - Appendices Directory",
    "description": "Complete collection of appendices providing implementation guidance for AI-friendly web design",
    "url": "https://allabout.network/invisible-users/web/appendix-index.html",
    "author": {
      "@type": "Person",
      "name": "Tom Cranstoun"
    },
    "isPartOf": {
      "@type": "Book",
      "name": "The Invisible Users"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": 10,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "WebPage",
            "name": "Appendix A: Implementation Cookbook",
            "url": "https://allabout.network/invisible-users/web/appendix-a.html",
            "description": "Quick-reference recipes for common AI-friendly patterns"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "WebPage",
            "name": "Appendix B: Battle-Tested Lessons",
            "url": "https://allabout.network/invisible-users/web/appendix-b.html",
            "description": "Production learnings from real-world implementations"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "WebPage",
            "name": "Appendix C: Web Audit Suite Guide",
            "url": "https://allabout.network/invisible-users/web/appendix-c.html",
            "description": "Complete user guide for the Web Audit Suite tool"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "WebPage",
            "name": "Appendix D: AI-Friendly HTML Guide",
            "url": "https://allabout.network/invisible-users/web/appendix-d.html",
            "description": "Comprehensive patterns for AI-compatible web interfaces"
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "WebPage",
            "name": "Appendix E: AI Patterns Quick Reference",
            "url": "https://allabout.network/invisible-users/web/appendix-e.html",
            "description": "One-page guide to essential AI-friendly patterns"
          }
        },
        {
          "@type": "ListItem",
          "position": 6,
          "item": {
            "@type": "WebPage",
            "name": "Appendix F: Implementation Roadmap",
            "url": "https://allabout.network/invisible-users/web/appendix-f.html",
            "description": "Priority-based implementation guide"
          }
        },
        {
          "@type": "ListItem",
          "position": 7,
          "item": {
            "@type": "WebPage",
            "name": "Appendix G: Resource Directory",
            "url": "https://allabout.network/invisible-users/web/appendix-g.html",
            "description": "150+ curated resources for AI-friendly web development"
          }
        },
        {
          "@type": "ListItem",
          "position": 8,
          "item": {
            "@type": "WebPage",
            "name": "Appendix H: Example llms.txt File",
            "url": "https://allabout.network/invisible-users/web/appendix-h.html",
            "description": "Production-ready llms.txt with 20 curated links"
          }
        },
        {
          "@type": "ListItem",
          "position": 9,
          "item": {
            "@type": "WebPage",
            "name": "Appendix I: Pipeline Failure Case Study",
            "url": "https://allabout.network/invisible-users/web/appendix-i.html",
            "description": "Real-world analysis of a £20M+ pipeline failure"
          }
        },
        {
          "@type": "ListItem",
          "position": 10,
          "item": {
            "@type": "WebPage",
            "name": "Appendix J: Industry Developments",
            "url": "https://allabout.network/invisible-users/web/appendix-j.html",
            "description": "Timeline of agent-mediated commerce evolution"
          }
        }
      ]
    },
    "inLanguage": "en-GB"
  }
  </script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
    }

    header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
    }

    header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    header p {
      font-size: 1.25rem;
      color: #e0e7ff;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .category-section {
      margin-bottom: 4rem;
    }

    .category-section h2 {
      font-size: 1.75rem;
      color: #1e40af;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #3b82f6;
    }

    .appendix-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    .appendix-card {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 2rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .appendix-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      border-color: #3b82f6;
    }

    .appendix-card h3 {
      font-size: 1.25rem;
      color: #1e40af;
      margin-bottom: 0.5rem;
    }

    .appendix-card .letter {
      display: inline-block;
      background: #3b82f6;
      color: white;
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 6px;
      font-weight: 700;
      margin-right: 0.5rem;
    }

    .appendix-card p {
      color: #4b5563;
      margin: 1rem 0;
      font-size: 0.95rem;
    }

    .appendix-card a {
      display: inline-block;
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
      margin-top: 1rem;
    }

    .appendix-card a:hover {
      text-decoration: underline;
    }

    footer {
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      padding: 2rem;
      text-align: center;
      margin-top: 4rem;
    }

    footer p {
      color: #6b7280;
      margin: 0.25rem 0;
    }

    .contact-links {
      margin: 1.5rem 0;
    }

    .contact-links a {
      color: #2563eb;
      margin: 0 1rem;
      text-decoration: none;
    }

    .contact-links a:hover {
      text-decoration: underline;
    }

    .floating-home-button {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .floating-home-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    .floating-top-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
      cursor: pointer;
    }

    .floating-top-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .appendix-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Appendices Directory</h1>
    <p>Complete implementation guidance and resources</p>
  </header>

  <main class="container" role="main" data-load-state="complete">

    <section class="category-section" data-category="implementation-guides">
      <h2>Implementation Guides</h2>
      <div class="appendix-grid">

        <article class="appendix-card" data-item-type="cookbook" data-appendix="a">
          <h3><span class="letter">A</span> Implementation Cookbook</h3>
          <p>Quick-reference recipes for common AI-friendly patterns. Copy-paste code examples for semantic HTML, form validation, error handling, and structured data.</p>
          <a href="appendix-a.html">View Cookbook →</a>
        </article>

        <article class="appendix-card" data-item-type="lessons" data-appendix="b">
          <h3><span class="letter">B</span> Battle-Tested Lessons</h3>
          <p>Production learnings from real-world implementations. What worked, what didn't, and why. Avoid common pitfalls with guidance from actual deployments.</p>
          <a href="appendix-b.html">View Lessons →</a>
        </article>

        <article class="appendix-card" data-item-type="tool-guide" data-appendix="c">
          <h3><span class="letter">C</span> Web Audit Suite Guide</h3>
          <p>Complete user guide for the Web Audit Suite tool. Installation, configuration, running analyses, and interpreting reports. Command-line and API usage.</p>
          <a href="appendix-c.html">View Guide →</a>
        </article>

        <article class="appendix-card" data-item-type="comprehensive-guide" data-appendix="d">
          <h3><span class="letter">D</span> AI-Friendly HTML Guide</h3>
          <p>Comprehensive patterns for AI-compatible web interfaces. From quick fixes to architectural decisions. Semantic HTML, explicit state, structured data, and more.</p>
          <a href="appendix-d.html">View Guide →</a>
        </article>

      </div>
    </section>

    <section class="category-section" data-category="quick-references">
      <h2>Quick References</h2>
      <div class="appendix-grid">

        <article class="appendix-card" data-item-type="quick-reference" data-appendix="e">
          <h3><span class="letter">E</span> AI Patterns Quick Reference</h3>
          <p>One-page guide to essential AI-friendly patterns. HTTP status codes, form field names, data attributes, and common Schema.org types. Perfect for keeping beside your keyboard.</p>
          <a href="appendix-e.html">View Reference →</a>
        </article>

        <article class="appendix-card" data-item-type="roadmap" data-appendix="f">
          <h3><span class="letter">F</span> Implementation Roadmap</h3>
          <p>Priority-based implementation guide. No time estimates, just clear priorities from critical quick wins to advanced features. Start where you are, improve incrementally.</p>
          <a href="appendix-f.html">View Roadmap →</a>
        </article>

        <article class="appendix-card" data-item-type="directory" data-appendix="g">
          <h3><span class="letter">G</span> Resource Directory</h3>
          <p>150+ curated resources for AI-friendly web development. Standards documentation, tools, libraries, testing frameworks, and community resources. All links verified.</p>
          <a href="appendix-g.html">View Directory →</a>
        </article>

      </div>
    </section>

    <section class="category-section" data-category="case-studies">
      <h2>Case Studies and Examples</h2>
      <div class="appendix-grid">

        <article class="appendix-card" data-item-type="example-file" data-appendix="h">
          <h3><span class="letter">H</span> Example llms.txt File</h3>
          <p>Production-ready llms.txt with 20 curated links. Demonstrates best practices for AI agent guidance files. Copy and adapt for your own projects.</p>
          <a href="appendix-h.html">View Example →</a>
        </article>

        <article class="appendix-card" data-item-type="case-study" data-appendix="i">
          <h3><span class="letter">I</span> Pipeline Failure Case Study</h3>
          <p>Real-world analysis of a £20M+ pipeline failure caused by agent incompatibility. Detailed examination of what went wrong, the business impact, and how to prevent similar failures.</p>
          <a href="appendix-i.html">View Case Study →</a>
        </article>

        <article class="appendix-card" data-item-type="timeline" data-appendix="j">
          <h3><span class="letter">J</span> Industry Developments</h3>
          <p>Timeline of agent-mediated commerce evolution. Product launches, acquisitions, standards adoption, and market validation. Updated regularly as the field progresses.</p>
          <a href="appendix-j.html">View Timeline →</a>
        </article>

      </div>
    </section>

  </main>

  <footer role="contentinfo">
    <div class="contact-links">
      <a href="mailto:tom.cranstoun@gmail.com">Email</a>
      <a href="https://allabout.network">Website</a>
      <a href="https://www.linkedin.com/in/tom-cranstoun/">LinkedIn</a>
      <a href="https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript">GitHub</a>
    </div>
    <p>&copy; 2026 Tom Cranstoun. All rights reserved.</p>
    <p>Last updated: January 2026</p>
  </footer>

  <a href="index.html" class="floating-home-button" aria-label="Back to Home">Home</a>
  <a href="#" class="floating-top-button" aria-label="Back to Top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">Top</a>
</body>
</html>
```

---

## 6. Consulting Service Page: Professional Web Audits

The consulting service page sells professional services — in this case, web audits for AI agent compatibility. For AI agents, it needs Service schema with clear pricing information and service details.

**AI-friendly patterns demonstrated:**

- Service schema with provider and offer information
- Service tiers with explicit data-tier attributes
- Pricing with data-price ranges
- Process steps with data-step numbers
- Contact form with proper field naming

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Tom Cranstoun">
  <meta name="description" content="Professional web audits for AI agent compatibility. Comprehensive analysis of your website's AI-friendliness with detailed reports and implementation guidance.">

  <!-- AI-specific meta tags -->
  <meta name="ai-preferred-access" content="html">
  <meta name="ai-content-policy" content="summaries-allowed, full-extraction-allowed">
  <meta name="ai-freshness" content="monthly">
  <meta name="ai-structured-data" content="json-ld">
  <meta name="ai-attribution" content="required">

  <title>Professional Web Audits | The Invisible Users</title>

  <!-- Schema.org structured data for service page -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Professional Web Audit for AI Agent Compatibility",
    "name": "AI Agent Compatibility Web Audit",
    "description": "Comprehensive analysis of website compatibility with AI agents, including detailed reports, implementation guidance, and priority-based recommendations",
    "provider": {
      "@type": "Person",
      "name": "Tom Cranstoun",
      "email": "tom.cranstoun@gmail.com",
      "url": "https://allabout.network",
      "sameAs": [
        "https://www.linkedin.com/in/tom-cranstoun/",
        "https://github.com/Digital-Domain-Technologies-Ltd"
      ]
    },
    "areaServed": "Worldwide",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://allabout.network/invisible-users/web/consulting.html"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "GBP",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "priceCurrency": "GBP",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": "1",
          "unitText": "audit"
        }
      },
      "description": "Contact for pricing based on site complexity"
    },
    "termsOfService": "Contact for service agreement details"
  }
  </script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
    }

    header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
    }

    header h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    header p {
      font-size: 1.5rem;
      max-width: 800px;
      margin: 0 auto;
      color: #e0e7ff;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .intro-section {
      text-align: center;
      max-width: 900px;
      margin: 0 auto 4rem;
    }

    .intro-section p {
      font-size: 1.15rem;
      color: #4b5563;
      margin-bottom: 1rem;
    }

    .service-tiers {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      margin: 4rem 0;
    }

    .tier-card {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      padding: 2.5rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .tier-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.1);
      border-color: #3b82f6;
    }

    .tier-card.featured {
      border-color: #3b82f6;
      border-width: 3px;
      background: #eff6ff;
    }

    .tier-card h3 {
      font-size: 1.75rem;
      color: #1e40af;
      margin-bottom: 0.5rem;
    }

    .tier-card .price {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e40af;
      margin: 1rem 0;
    }

    .tier-card .price-note {
      font-size: 0.9rem;
      color: #6b7280;
      margin-bottom: 1.5rem;
    }

    .tier-card ul {
      list-style: none;
      margin: 1.5rem 0;
    }

    .tier-card li {
      padding: 0.5rem 0 0.5rem 2rem;
      position: relative;
      color: #4b5563;
    }

    .tier-card li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: 700;
    }

    .tier-card .btn {
      display: block;
      width: 100%;
      background: #2563eb;
      color: white;
      padding: 1rem;
      border-radius: 6px;
      font-weight: 600;
      text-decoration: none;
      text-align: center;
      transition: background 0.2s;
      margin-top: 1.5rem;
    }

    .tier-card .btn:hover {
      background: #1d4ed8;
    }

    .process-section {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 3rem;
      margin: 4rem 0;
    }

    .process-section h2 {
      text-align: center;
      color: #1e40af;
      margin-bottom: 3rem;
      font-size: 2rem;
    }

    .process-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .process-step {
      text-align: center;
    }

    .process-step .step-number {
      display: inline-block;
      width: 60px;
      height: 60px;
      line-height: 60px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .process-step h3 {
      color: #1e40af;
      margin-bottom: 0.5rem;
    }

    .process-step p {
      color: #6b7280;
      font-size: 0.95rem;
    }

    .what-you-get {
      background: #eff6ff;
      border-radius: 8px;
      padding: 3rem;
      margin: 4rem 0;
    }

    .what-you-get h2 {
      text-align: center;
      color: #1e40af;
      margin-bottom: 2rem;
      font-size: 2rem;
    }

    .what-you-get ul {
      max-width: 700px;
      margin: 0 auto;
      list-style: none;
    }

    .what-you-get li {
      padding: 0.75rem 0 0.75rem 2.5rem;
      position: relative;
      color: #4b5563;
      font-size: 1.05rem;
    }

    .what-you-get li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #10b981;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .cta-box {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      border-radius: 12px;
      padding: 4rem 2rem;
      text-align: center;
      margin: 4rem 0;
    }

    .cta-box h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .cta-box p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      color: #e0e7ff;
    }

    .cta-box .btn {
      display: inline-block;
      background: white;
      color: #2563eb;
      padding: 1.25rem 3rem;
      border-radius: 6px;
      font-weight: 700;
      text-decoration: none;
      transition: background 0.2s;
      font-size: 1.2rem;
    }

    .cta-box .btn:hover {
      background: #f3f4f6;
    }

    footer {
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      padding: 2rem;
      text-align: center;
      margin-top: 4rem;
    }

    footer p {
      color: #6b7280;
      margin: 0.25rem 0;
    }

    .contact-links {
      margin: 1.5rem 0;
    }

    .contact-links a {
      color: #2563eb;
      margin: 0 1rem;
      text-decoration: none;
    }

    .contact-links a:hover {
      text-decoration: underline;
    }

    .floating-home-button {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .floating-home-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    .floating-top-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
      cursor: pointer;
    }

    .floating-top-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      header h1 {
        font-size: 2rem;
      }
      .service-tiers {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Professional Web Audits</h1>
    <p>Comprehensive AI agent compatibility analysis for your website</p>
  </header>

  <main class="container" role="main" data-load-state="complete">

    <section class="intro-section">
      <p>
        Is your website ready for AI agents? Get a comprehensive analysis of your site's AI agent compatibility with detailed reports, implementation guidance, and priority-based recommendations.
      </p>
      <p>
        Using the Web Audit Suite tool described in the book, I'll analyse your website for semantic HTML, explicit state management, structured data, and dozens of other AI-friendly patterns.
      </p>
    </section>

    <div class="service-tiers">

      <article class="tier-card" data-tier="self-service" data-price-type="one-time">
        <h3>Web Audit Suite Tool</h3>
        <div class="price">Contact for pricing</div>
        <p class="price-note">One-time purchase, self-service</p>
        <ul>
          <li>Complete Web Audit Suite tool</li>
          <li>Run unlimited audits</li>
          <li>Analyse any website</li>
          <li>Generate detailed reports</li>
          <li>SEO, accessibility, performance metrics</li>
          <li>AI agent compatibility scoring</li>
          <li>Command-line and API access</li>
          <li>Documentation and examples</li>
        </ul>
        <a href="mailto:tom.cranstoun@gmail.com?subject=Web Audit Suite Purchase Enquiry" class="btn" data-action="purchase-tool">Enquire About Tool</a>
      </article>

      <article class="tier-card featured" data-tier="professional-audit" data-price-type="per-project">
        <h3>Professional Audit</h3>
        <div class="price">Contact for pricing</div>
        <p class="price-note">Per-project pricing based on site complexity</p>
        <ul>
          <li>Complete site analysis by expert</li>
          <li>Detailed report with findings</li>
          <li>Priority-based recommendations</li>
          <li>Implementation guidance</li>
          <li>Code examples for your stack</li>
          <li>Video walkthrough of results</li>
          <li>30 days email support</li>
          <li>Follow-up audit (optional)</li>
        </ul>
        <a href="mailto:tom.cranstoun@gmail.com?subject=Professional Web Audit Enquiry" class="btn" data-action="request-audit">Request Audit</a>
      </article>

      <article class="tier-card" data-tier="agency-partnership" data-price-type="partnership">
        <h3>Agency Partnership</h3>
        <div class="price">Partnership</div>
        <p class="price-note">For agencies offering audits to clients</p>
        <ul>
          <li>White-label audit reports</li>
          <li>Referral arrangement</li>
          <li>Joint client presentations</li>
          <li>Technical support</li>
          <li>Training for your team</li>
          <li>Co-marketing opportunities</li>
          <li>Priority support</li>
          <li>Flexible engagement model</li>
        </ul>
        <a href="mailto:tom.cranstoun@gmail.com?subject=Agency Partnership Enquiry" class="btn" data-action="discuss-partnership">Discuss Partnership</a>
      </article>

    </div>

    <div class="process-section">
      <h2>How It Works</h2>
      <div class="process-steps">

        <article class="process-step" data-step="1">
          <div class="step-number">1</div>
          <h3>Initial Contact</h3>
          <p>Email me with your website URL and any specific concerns. I'll provide a quote based on site complexity.</p>
        </article>

        <article class="process-step" data-step="2">
          <div class="step-number">2</div>
          <h3>Site Analysis</h3>
          <p>I'll run a comprehensive audit using the Web Audit Suite, examining semantic HTML, structured data, form patterns, and more.</p>
        </article>

        <article class="process-step" data-step="3">
          <div class="step-number">3</div>
          <h3>Report Delivery</h3>
          <p>You'll receive a detailed report with findings, priority-based recommendations, and implementation examples specific to your stack.</p>
        </article>

        <article class="process-step" data-step="4">
          <div class="step-number">4</div>
          <h3>Implementation Support</h3>
          <p>30 days of email support for questions about implementing the recommendations. Optional follow-up audit after changes.</p>
        </article>

      </div>
    </div>

    <div class="what-you-get">
      <h2>What's Included in Professional Audits</h2>
      <ul>
        <li>Comprehensive analysis of your entire website (or specified pages)</li>
        <li>SEO performance metrics and recommendations</li>
        <li>Accessibility compliance testing (WCAG 2.1 Level AA)</li>
        <li>Performance analysis with Core Web Vitals</li>
        <li>Security header configuration review</li>
        <li>AI agent compatibility scoring (LLM suitability)</li>
        <li>Semantic HTML structure assessment</li>
        <li>Form validation pattern review</li>
        <li>Structured data (Schema.org) implementation check</li>
        <li>Priority-based implementation roadmap</li>
        <li>Code examples adapted to your technology stack</li>
        <li>Video walkthrough explaining key findings</li>
      </ul>
    </div>

    <div class="cta-box">
      <h2>Ready to Get Started?</h2>
      <p>Contact me to discuss your website's needs and receive a tailored quote.</p>
      <a href="mailto:tom.cranstoun@gmail.com?subject=Web Audit Enquiry" class="btn">Get in Touch</a>
    </div>

  </main>

  <footer role="contentinfo">
    <div class="contact-links">
      <a href="mailto:tom.cranstoun@gmail.com">Email</a>
      <a href="https://allabout.network">Website</a>
      <a href="https://www.linkedin.com/in/tom-cranstoun/">LinkedIn</a>
      <a href="https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript">GitHub</a>
    </div>
    <p>&copy; 2026 Tom Cranstoun. All rights reserved.</p>
    <p>Last updated: January 2026</p>
  </footer>

  <a href="index.html" class="floating-home-button" aria-label="Back to Home">Home</a>
  <a href="#" class="floating-top-button" aria-label="Back to Top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">Top</a>
</body>
</html>
```

---

## 7. Blog Post Page: Thought Leadership Content

The blog post page shares insights and expertise. For AI agents, it needs Article or BlogPosting schema with clear authorship, publication dates, and semantic article structure.

**AI-friendly patterns demonstrated:**

- BlogPosting schema with author and publisher information
- Temporal metadata (datePublished, dateModified)
- Article structure with semantic HTML5 elements
- Reading time estimate with data-reading-time attribute
- Table of contents with anchor links

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Tom Cranstoun">
  <meta name="description" content="Why AI agents struggle with modern web forms - and how semantic HTML, explicit state attributes, and persistent error messages create better experiences for both humans and agents.">

  <!-- AI-specific meta tags -->
  <meta name="ai-preferred-access" content="html">
  <meta name="ai-content-policy" content="summaries-allowed, full-extraction-allowed">
  <meta name="ai-freshness" content="monthly">
  <meta name="ai-structured-data" content="json-ld">
  <meta name="ai-attribution" content="required">

  <title>Why Modern Forms Break AI Agents (And How to Fix Them) | The Invisible Users</title>

  <!-- Schema.org structured data for blog post -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Why Modern Forms Break AI Agents (And How to Fix Them)",
    "description": "Examining how modern web forms fail for AI agents and providing practical patterns for forms that work for both humans and machines.",
    "datePublished": "2026-01-11",
    "dateModified": "2026-01-11",
    "author": {
      "@type": "Person",
      "name": "Tom Cranstoun",
      "email": "tom.cranstoun@gmail.com",
      "url": "https://allabout.network"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Digital Domain Technologies Ltd",
      "url": "https://allabout.network"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://allabout.network/invisible-users/blog/forms-and-agents.html"
    },
    "articleSection": "Web Development, AI Agents, Accessibility",
    "keywords": "AI agents, web forms, semantic HTML, form validation, accessibility",
    "wordCount": "1200",
    "inLanguage": "en-GB",
    "isPartOf": {
      "@type": "Blog",
      "name": "The Invisible Users Blog"
    }
  }
  </script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
    }

    header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
    }

    header h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
    }

    .article-meta {
      color: #e0e7ff;
      font-size: 0.95rem;
    }

    .article-meta span {
      margin: 0 1rem;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    article {
      font-size: 1.05rem;
      line-height: 1.8;
    }

    article h2 {
      font-size: 1.75rem;
      color: #1e40af;
      margin: 2.5rem 0 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #3b82f6;
    }

    article h3 {
      font-size: 1.35rem;
      color: #1f2937;
      margin: 2rem 0 1rem;
    }

    article p {
      margin-bottom: 1.5rem;
      color: #4b5563;
    }

    article ul, article ol {
      margin: 1.5rem 0 1.5rem 2rem;
      color: #4b5563;
    }

    article li {
      margin-bottom: 0.75rem;
    }

    article code {
      background: #f3f4f6;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 0.9em;
      color: #dc2626;
    }

    article pre {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 1.5rem;
      overflow-x: auto;
      margin: 1.5rem 0;
    }

    article pre code {
      background: none;
      padding: 0;
      color: #1f2937;
      font-size: 0.9rem;
    }

    .highlight-box {
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem 0;
    }

    .highlight-box p {
      margin-bottom: 0.5rem;
    }

    .highlight-box strong {
      color: #1e40af;
    }

    .author-bio {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 2rem;
      margin: 4rem 0;
    }

    .author-bio h3 {
      color: #1e40af;
      margin-bottom: 1rem;
    }

    .author-bio p {
      color: #4b5563;
      margin-bottom: 1rem;
    }

    .author-bio a {
      color: #2563eb;
      text-decoration: none;
    }

    .author-bio a:hover {
      text-decoration: underline;
    }

    .related-posts {
      margin: 3rem 0;
    }

    .related-posts h3 {
      color: #1e40af;
      margin-bottom: 1.5rem;
    }

    .related-posts ul {
      list-style: none;
      margin: 0;
    }

    .related-posts li {
      margin-bottom: 1rem;
    }

    .related-posts a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
    }

    .related-posts a:hover {
      text-decoration: underline;
    }

    footer {
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      padding: 2rem;
      text-align: center;
      margin-top: 4rem;
    }

    footer p {
      color: #6b7280;
      margin: 0.25rem 0;
    }

    .contact-links {
      margin: 1.5rem 0;
    }

    .contact-links a {
      color: #2563eb;
      margin: 0 1rem;
      text-decoration: none;
    }

    .contact-links a:hover {
      text-decoration: underline;
    }

    .floating-home-button {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .floating-home-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    .floating-top-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
      cursor: pointer;
    }

    .floating-top-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <header>
    <h1>Why Modern Forms Break AI Agents (And How to Fix Them)</h1>
    <div class="article-meta" data-published="2026-01-11" data-modified="2026-01-11" data-reading-time="6 minutes">
      <time datetime="2026-01-11">Published: 11 January 2026</time>
      <span>•</span>
      <span>6 min read</span>
      <span>•</span>
      <span>Tom Cranstoun</span>
    </div>
  </header>

  <main class="container" role="main">
    <article data-article-type="blog-post" data-word-count="1200">

      <p>
        Modern web forms are beautifully designed for humans. Inline validation highlights errors as you type. Submit buttons disable until the form is complete. Error messages appear in elegant toast notifications. But these same patterns create insurmountable problems for AI agents — and, it turns out, for many humans too.
      </p>

      <h2>The Problem: Visual-Only Feedback</h2>

      <p>
        When a form field has an error, humans see it visually: a red border, an error icon, maybe a background colour change. But these visual cues exist only in CSS. The underlying HTML remains unchanged. An AI agent parsing the DOM sees a perfectly normal input field with no indication that something is wrong.
      </p>

      <p>Consider this common pattern:</p>

      <pre><code>&lt;input type="email" class="error"&gt;
&lt;div class="error-message"&gt;Invalid email address&lt;/div&gt;</code></pre>

      <p>
        The <code>class="error"</code> attribute means nothing to an agent. It's purely a styling hook. The agent has no way to determine which fields are valid and which need correction. The error message might be visible to humans, but agents can't reliably connect it to the specific field that failed.
      </p>

      <h2>The Solution: Explicit State in Attributes</h2>

      <p>
        Making forms agent-friendly requires putting state directly in the DOM where machines can read it. This means using proper ARIA attributes and data attributes to expose validation state:
      </p>

      <pre><code>&lt;input type="email"
       id="email"
       name="email"
       aria-invalid="true"
       aria-describedby="email-error"
       data-validation-state="invalid"&gt;
&lt;div id="email-error" role="alert"&gt;
  Enter a valid email address (example: name@company.com)
&lt;/div&gt;</code></pre>

      <p>
        Now an agent can query the DOM and immediately understand: this field is invalid (<code>aria-invalid="true"</code>), the error message is persistent and connected (<code>aria-describedby</code>), and the validation state is explicit (<code>data-validation-state="invalid"</code>).
      </p>

      <div class="highlight-box">
        <p><strong>Key insight:</strong> The patterns that help AI agents also improve accessibility for humans. Screen reader users benefit from <code>aria-invalid</code> and <code>role="alert"</code>. Keyboard navigators benefit from persistent error messages. Everyone benefits from explicit, unambiguous feedback.</p>
      </div>

      <h2>The Vanishing Error Problem</h2>

      <p>
        Toast notifications are elegant. They slide in, display a message, then fade away after a few seconds. Perfect for humans who can read quickly. Catastrophic for AI agents processing hundreds of forms per hour.
      </p>

      <p>
        By the time an agent finishes analysing one field and moves to the next, the toast has disappeared. The error information is gone. The agent has no way to retrieve it. The form submission fails, but the agent doesn't know why.
      </p>

      <p>The solution is simple: make errors persistent. Keep them visible until they're fixed. Connect them to their fields with <code>aria-describedby</code>. Provide an error summary at the top of the form listing every problem.</p>

      <h2>Form Field Naming Matters</h2>

      <p>
        AI agents recognise common field names: <code>email</code>, <code>firstName</code>, <code>lastName</code>, <code>phone</code>. When you use standard names, agents can fill forms accurately without custom training for your specific site.
      </p>

      <p>
        Using <code>user_email_address_field</code> instead of <code>email</code> might seem more descriptive, but it breaks agent compatibility. The agent doesn't know that your custom name means "email" — it's looking for a field literally named <code>email</code>.
      </p>

      <p>Stick to conventions:</p>

      <ul>
        <li><code>email</code> not <code>e-mail</code>, <code>emailAddress</code>, or <code>user_email</code></li>
        <li><code>firstName</code> not <code>fname</code>, <code>givenName</code>, or <code>first_name</code></li>
        <li><code>phone</code> not <code>tel</code>, <code>phoneNumber</code>, or <code>mobile</code></li>
        <li><code>postcode</code> not <code>zip</code>, <code>zipCode</code>, or <code>postalCode</code> (for UK sites)</li>
      </ul>

      <h2>Implementation Checklist</h2>

      <p>To make your forms work for both humans and AI agents:</p>

      <ol>
        <li>Add <code>aria-invalid</code> and <code>aria-describedby</code> to all validated fields</li>
        <li>Make error messages persistent (no vanishing toasts)</li>
        <li>Connect each error to its field with proper IDs</li>
        <li>Use standard field names (<code>email</code>, <code>firstName</code>, <code>phone</code>)</li>
        <li>Add an error summary at the top of the form with links to each invalid field</li>
        <li>Disable the submit button only if you explain why it's disabled</li>
        <li>Validate on blur, not just on submit</li>
        <li>Add explicit state attributes (<code>data-validation-state</code>, <code>data-errors</code>)</li>
      </ol>

      <h2>The Broader Principle</h2>

      <p>
        Forms are just one example of a universal principle: visual design affects only humans, not AI agents. Agents parse HTML directly. They don't see colours, fonts, animations, or visual styling. They read the underlying structure.
      </p>

      <p>
        This means fixing visual design problems (like low-contrast error messages) helps humans but doesn't affect agents. Fixing structural problems (like missing ARIA attributes and implicit state) helps both.
      </p>

      <p>
        When you build with semantic HTML, explicit state, and structured data, you create interfaces that work universally — for CLI agents running locally, for browser automation agents using Playwright, and for humans using screen readers or keyboards.
      </p>

      <p>Better patterns for agents mean better experiences for everyone. Neither humans nor machines should have to guess what's happening on your website.</p>

    </article>

    <div class="author-bio" data-author="tom-cranstoun">
      <h3>About the Author</h3>
      <p>
        <strong>Tom Cranstoun</strong> is a software consultant and the author of "The Invisible Users: Designing the Web for AI Agents and Everyone Else". He specialises in building web systems that work reliably for both humans and AI agents.
      </p>
      <p>
        Contact: <a href="mailto:tom.cranstoun@gmail.com">tom.cranstoun@gmail.com</a> |
        <a href="https://www.linkedin.com/in/tom-cranstoun/">LinkedIn</a> |
        <a href="https://github.com/Digital-Domain-Technologies-Ltd">GitHub</a>
      </p>
    </div>

    <div class="related-posts">
      <h3>Related Reading</h3>
      <ul>
        <li><a href="appendix-d.html">Appendix D: AI-Friendly HTML Guide</a> — Comprehensive patterns for agent-compatible forms</li>
        <li><a href="appendix-a.html">Appendix A: Implementation Cookbook</a> — Quick-reference recipes for common patterns</li>
        <li><a href="appendix-f.html">Appendix F: Implementation Roadmap</a> — Priority-based implementation guidance</li>
      </ul>
    </div>

  </main>

  <footer role="contentinfo">
    <div class="contact-links">
      <a href="mailto:tom.cranstoun@gmail.com">Email</a>
      <a href="https://allabout.network">Website</a>
      <a href="https://www.linkedin.com/in/tom-cranstoun/">LinkedIn</a>
      <a href="https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript">GitHub</a>
    </div>
    <p>&copy; 2026 Tom Cranstoun. All rights reserved.</p>
    <p>Last updated: January 2026</p>
  </footer>

  <a href="index.html" class="floating-home-button" aria-label="Back to Home">Home</a>
  <a href="#" class="floating-top-button" aria-label="Back to Top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">Top</a>
</body>
</html>
```

---

## 8. Article Page: Long-Form Technical Content

The article page presents comprehensive technical documentation or case studies. For AI agents, it needs Article schema with detailed metadata, section structure, and table of contents.

**AI-friendly patterns demonstrated:**

- Article schema with comprehensive metadata
- Semantic section structure with data-section-id attributes
- Table of contents with anchor links
- Code examples with proper language specification
- Reading progress indicators with data-progress attribute

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Tom Cranstoun">
  <meta name="description" content="Complete technical guide to implementing llms.txt files for AI agent discovery - syntax, structure, best practices, and real-world examples from production deployments.">

  <!-- AI-specific meta tags -->
  <meta name="ai-preferred-access" content="html">
  <meta name="ai-content-policy" content="summaries-allowed, full-extraction-allowed">
  <meta name="ai-freshness" content="monthly">
  <meta name="ai-structured-data" content="json-ld">
  <meta name="ai-attribution" content="required">

  <title>Complete Guide to llms.txt Implementation | The Invisible Users</title>

  <!-- Schema.org structured data for technical article -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Complete Guide to llms.txt Implementation",
    "description": "Comprehensive technical documentation for implementing llms.txt files to enable AI agent discovery and provide structured site information",
    "datePublished": "2026-01-11",
    "dateModified": "2026-01-11",
    "author": {
      "@type": "Person",
      "name": "Tom Cranstoun",
      "email": "tom.cranstoun@gmail.com",
      "url": "https://allabout.network"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Digital Domain Technologies Ltd",
      "url": "https://allabout.network"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://allabout.network/invisible-users/articles/llms-txt-guide.html"
    },
    "articleSection": "Technical Documentation",
    "keywords": "llms.txt, AI agents, LLM discovery, website documentation, structured information",
    "wordCount": "2500",
    "proficiencyLevel": "Intermediate",
    "dependencies": "Text editor, web server",
    "inLanguage": "en-GB"
  }
  </script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
    }

    header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
    }

    header h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
    }

    .article-meta {
      color: #e0e7ff;
      font-size: 0.95rem;
    }

    .article-meta span {
      margin: 0 1rem;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 3rem 2rem;
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 3rem;
    }

    .toc {
      position: sticky;
      top: 2rem;
      align-self: start;
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 1.5rem;
      max-height: calc(100vh - 4rem);
      overflow-y: auto;
    }

    .toc h2 {
      font-size: 1rem;
      color: #1e40af;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .toc ul {
      list-style: none;
      margin: 0;
    }

    .toc li {
      margin-bottom: 0.5rem;
    }

    .toc a {
      color: #4b5563;
      text-decoration: none;
      font-size: 0.9rem;
      display: block;
      padding: 0.25rem 0;
      transition: color 0.2s;
    }

    .toc a:hover {
      color: #2563eb;
    }

    article {
      font-size: 1.05rem;
      line-height: 1.8;
    }

    article h2 {
      font-size: 1.75rem;
      color: #1e40af;
      margin: 2.5rem 0 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #3b82f6;
    }

    article h3 {
      font-size: 1.35rem;
      color: #1f2937;
      margin: 2rem 0 1rem;
    }

    article h4 {
      font-size: 1.15rem;
      color: #1f2937;
      margin: 1.5rem 0 1rem;
    }

    article p {
      margin-bottom: 1.5rem;
      color: #4b5563;
    }

    article ul, article ol {
      margin: 1.5rem 0 1.5rem 2rem;
      color: #4b5563;
    }

    article li {
      margin-bottom: 0.75rem;
    }

    article code {
      background: #f3f4f6;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 0.9em;
      color: #dc2626;
    }

    article pre {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 1.5rem;
      overflow-x: auto;
      margin: 1.5rem 0;
    }

    article pre code {
      background: none;
      padding: 0;
      color: #1f2937;
      font-size: 0.9rem;
    }

    .info-box {
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem 0;
    }

    .info-box strong {
      color: #1e40af;
      display: block;
      margin-bottom: 0.5rem;
    }

    .info-box p {
      margin-bottom: 0.5rem;
    }

    .warning-box {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem 0;
    }

    .warning-box strong {
      color: #92400e;
      display: block;
      margin-bottom: 0.5rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 2rem 0;
      font-size: 0.95rem;
    }

    th, td {
      padding: 0.75rem;
      text-align: left;
      border: 1px solid #e5e7eb;
    }

    th {
      background: #f9fafb;
      color: #1f2937;
      font-weight: 600;
    }

    footer {
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      padding: 2rem;
      text-align: center;
      margin-top: 4rem;
      grid-column: 1 / -1;
    }

    footer p {
      color: #6b7280;
      margin: 0.25rem 0;
    }

    .contact-links {
      margin: 1.5rem 0;
    }

    .contact-links a {
      color: #2563eb;
      margin: 0 1rem;
      text-decoration: none;
    }

    .contact-links a:hover {
      text-decoration: underline;
    }

    .floating-home-button {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .floating-home-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    .floating-top-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
      cursor: pointer;
    }

    .floating-top-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    @media (max-width: 968px) {
      .container {
        grid-template-columns: 1fr;
      }
      .toc {
        position: relative;
        top: 0;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Complete Guide to llms.txt Implementation</h1>
    <div class="article-meta" data-published="2026-01-11" data-modified="2026-01-11" data-reading-time="12 minutes">
      <time datetime="2026-01-11">Published: 11 January 2026</time>
      <span>•</span>
      <span>12 min read</span>
      <span>•</span>
      <span>Tom Cranstoun</span>
    </div>
  </header>

  <div class="container">
    <nav class="toc" aria-label="Table of Contents" data-toc-type="sticky">
      <h2>Contents</h2>
      <ul>
        <li><a href="#what-is-llms-txt">What is llms.txt?</a></li>
        <li><a href="#why-it-matters">Why It Matters</a></li>
        <li><a href="#basic-structure">Basic Structure</a></li>
        <li><a href="#metadata-section">Metadata Section</a></li>
        <li><a href="#links-section">Links Section</a></li>
        <li><a href="#best-practices">Best Practices</a></li>
        <li><a href="#real-world-example">Real-World Example</a></li>
        <li><a href="#validation">Validation</a></li>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
    </nav>

    <article data-article-type="technical-guide" data-word-count="2500">

      <section id="what-is-llms-txt" data-section-id="introduction">
        <h2>What is llms.txt?</h2>
        <p>
          llms.txt is an emerging convention for providing AI agents with structured information about your website. Similar to robots.txt for crawler control, llms.txt offers a standardised location where agents can find curated links, site descriptions, and usage guidelines.
        </p>
        <p>
          The file lives at <code>/llms.txt</code> in your site root. When an AI agent encounters your website, it can check this file for authoritative information about your content structure, recommended entry points, and access policies.
        </p>

        <div class="info-box">
          <strong>Standard Status:</strong>
          <p>llms.txt is an emerging convention (2024-2025), not yet a formal standard. However, major AI platforms including Anthropic, OpenAI, and others have begun recognising and respecting llms.txt files. The specification is maintained at <code>https://llmstxt.org</code>.</p>
        </div>
      </section>

      <section id="why-it-matters" data-section-id="rationale">
        <h2>Why It Matters</h2>
        <p>Without llms.txt, AI agents must discover your site structure through trial and error:</p>
        <ul>
          <li>Crawling sitemaps (if present)</li>
          <li>Following navigation links</li>
          <li>Guessing URL patterns</li>
          <li>Searching for specific content types</li>
        </ul>
        <p>
          This wastes computational resources and creates inconsistent experiences. With llms.txt, you provide a curated list of important pages, explain your site's purpose, and guide agents to the most valuable content first.
        </p>

        <h3>Business Benefits</h3>
        <ul>
          <li><strong>Efficient discovery:</strong> Agents find your key content immediately</li>
          <li><strong>Accurate representation:</strong> You control which pages represent your business</li>
          <li><strong>Reduced server load:</strong> Fewer speculative requests from agents guessing URLs</li>
          <li><strong>Clear policies:</strong> Explicit guidance about content usage and attribution</li>
        </ul>
      </section>

      <section id="basic-structure" data-section-id="structure">
        <h2>Basic Structure</h2>
        <p>An llms.txt file contains two sections:</p>

        <h3>1. Metadata Header</h3>
        <p>Free-form text describing your site, marked with markdown headings (##). This section provides context about your content, technology stack, and intended audience.</p>

        <h3>2. Curated Links</h3>
        <p>A list of important URLs with brief descriptions. Each link includes a title in square brackets, the URL, and a short explanation of the content.</p>

        <pre><code>## Site Metadata
**Last updated:** January 2026
**Contact:** admin@example.com

## Access Guidelines
[Documentation](https://example.com/docs/): Complete API reference and guides</code></pre>
      </section>

      <section id="metadata-section" data-section-id="metadata">
        <h2>Metadata Section</h2>
        <p>The metadata header should include:</p>

        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Purpose</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Last updated</td>
              <td>When the file was last revised</td>
              <td>January 2026</td>
            </tr>
            <tr>
              <td>Contact</td>
              <td>Email for agent-related questions</td>
              <td>ai-support@example.com</td>
            </tr>
            <tr>
              <td>Site Type</td>
              <td>Category of website</td>
              <td>E-Commerce, Documentation, Blog</td>
            </tr>
            <tr>
              <td>Purpose</td>
              <td>What the site provides</td>
              <td>Customer Support and Product Sales</td>
            </tr>
            <tr>
              <td>Technology Stack</td>
              <td>Key technologies used</td>
              <td>RESTful API, React Frontend</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="links-section" data-section-id="links">
        <h2>Links Section</h2>
        <p>The links section should prioritise:</p>

        <h3>Essential Pages</h3>
        <ul>
          <li>Homepage or landing page</li>
          <li>API documentation (if applicable)</li>
          <li>Product catalogue or service directory</li>
          <li>Help centre or support resources</li>
          <li>Contact information</li>
        </ul>

        <h3>Format</h3>
        <pre><code>- [Page Title](https://example.com/path/): Brief description of content</code></pre>

        <div class="warning-box">
          <strong>Keep it focused:</strong>
          <p>Limit your llms.txt file to 15-25 links. More than this dilutes the curation value. Agents looking for everything can use your sitemap — llms.txt should highlight what matters most.</p>
        </div>
      </section>

      <section id="best-practices" data-section-id="best-practices">
        <h2>Best Practices</h2>

        <h3>1. Curate, Don't Duplicate</h3>
        <p>llms.txt is not a sitemap. Include only your most important pages — those that best represent your content and serve as entry points for understanding your site.</p>

        <h3>2. Maintain Regularly</h3>
        <p>Update your llms.txt file when you launch major features, restructure content, or change contact information. Outdated llms.txt files provide worse guidance than no file at all.</p>

        <h3>3. Explain Context</h3>
        <p>Don't just list URLs. Explain what each page contains and why it matters. Agents use these descriptions to determine relevance.</p>

        <h3>4. Test Accessibility</h3>
        <p>Verify that your llms.txt file is accessible at <code>https://yourdomain.com/llms.txt</code> with correct MIME type (<code>text/plain; charset=utf-8</code>).</p>
      </section>

      <section id="real-world-example" data-section-id="example">
        <h2>Real-World Example</h2>
        <p>Here's a complete llms.txt file for The Invisible Users project:</p>

        <pre><code># The Invisible Users

## Site Information
**Last updated:** January 2026
**Contact:** tom.cranstoun@gmail.com
**Site Type:** Technical Documentation, Educational Resource
**Purpose:** AI Agent Compatibility Guidance

## Quick Links
- [Homepage](https://allabout.network/invisible-users/): Project overview and introduction
- [Appendices](https://allabout.network/invisible-users/web/appendix-index.html): Implementation guides and resources
- [Implementation Cookbook](https://allabout.network/invisible-users/web/appendix-a.html): Quick-reference recipes
- [AI-Friendly HTML Guide](https://allabout.network/invisible-users/web/appendix-d.html): Comprehensive patterns
- [FAQ](https://allabout.network/invisible-users/web/faq.html): Common questions</code></pre>
      </section>

      <section id="validation" data-section-id="validation">
        <h2>Validation</h2>
        <p>Before deploying your llms.txt file, verify:</p>

        <ol>
          <li>File is accessible at <code>/llms.txt</code></li>
          <li>Content-Type header is <code>text/plain; charset=utf-8</code></li>
          <li>All linked URLs are absolute (include full domain)</li>
          <li>All links return 200 status codes</li>
          <li>Descriptions are concise (under 80 characters)</li>
          <li>Contact email is current and monitored</li>
        </ol>
      </section>

      <section id="deployment" data-section-id="deployment">
        <h2>Deployment</h2>
        <p>Place your llms.txt file in your website root directory and configure your web server to serve it with the correct MIME type.</p>

        <h3>Apache (.htaccess)</h3>
        <pre><code>AddType text/plain .txt</code></pre>

        <h3>Nginx</h3>
        <pre><code>location = /llms.txt {
  add_header Content-Type "text/plain; charset=utf-8";
}</code></pre>

        <h3>Node.js/Express</h3>
        <pre><code>app.get('/llms.txt', (req, res) => {
  res.type('text/plain; charset=utf-8');
  res.sendFile(path.join(__dirname, 'public', 'llms.txt'));
});</code></pre>

        <p>
          Test deployment by accessing <code>https://yourdomain.com/llms.txt</code> in a browser and verifying the content appears as plain text.
        </p>
      </section>

    </article>

    <footer role="contentinfo">
      <div class="contact-links">
        <a href="mailto:tom.cranstoun@gmail.com">Email</a>
        <a href="https://allabout.network">Website</a>
        <a href="https://www.linkedin.com/in/tom-cranstoun/">LinkedIn</a>
        <a href="https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript">GitHub</a>
      </div>
      <p>&copy; 2026 Tom Cranstoun. All rights reserved.</p>
      <p>Last updated: January 2026</p>
    </footer>
  </div>

  <a href="index.html" class="floating-home-button" aria-label="Back to Home">Home</a>
  <a href="#" class="floating-top-button" aria-label="Back to Top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">Top</a>
</body>
</html>
```

---

## Conclusion

These eight page patterns demonstrate how to build AI-friendly websites that work universally. Each pattern combines:

- **Semantic HTML** — Conveying meaning through structure, not just styling
- **Schema.org JSON-LD** — Providing machine-readable structured data
- **Explicit state** — Making dynamic information visible in the DOM
- **Accessibility first** — ARIA attributes and WCAG-compliant markup
- **Real content** — Demonstrating tone, structure, and practical implementation

### Using These Patterns

Copy the HTML, replace the content with your own, adjust the styles to match your brand, and deploy. The patterns are designed to be:

- **Forward-compatible** — Won't break if agents don't recognise proposed patterns
- **Standards-based** — Using established specifications wherever possible
- **Production-ready** — Tested code you can deploy immediately
- **Universally accessible** — Working for humans and all agent types

### Next Steps

- **Explore Appendix D** for comprehensive AI-friendly HTML patterns beyond these page types
- **Review Appendix A** for quick-reference code snippets and recipes
- **Consult Appendix F** for priority-based implementation guidance
- **View the source** of these pages at <https://allabout.network/invisible-users/web/> to see the patterns in action

Build once with these patterns, and your pages will work for CLI agents, browser automation agents, screen readers, keyboard navigators, and everyone else who visits your website.

## 9. FAQ Page: Frequently Asked Questions

The FAQ page answers common questions in a structured format. For AI agents, it needs FAQPage schema with Question/Answer pairs.

**AI-friendly patterns demonstrated:**

- FAQPage schema with mainEntity array of Questions
- Each question with acceptedAnswer
- Semantic question/answer structure
- Anchor links for direct navigation

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Tom Cranstoun">
  <meta name="description" content="Frequently asked questions about The Invisible Users book - AI agents, web design, implementation guidance, and identity delegation">

  <!-- AI-specific meta tags -->
  <meta name="ai-preferred-access" content="html">
  <meta name="ai-content-policy" content="summaries-allowed, full-extraction-allowed">
  <meta name="ai-freshness" content="monthly">
  <meta name="ai-structured-data" content="json-ld">
  <meta name="ai-attribution" content="required">

  <title>Frequently Asked Questions | The Invisible Users</title>

  <!-- Schema.org structured data for FAQ page -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "The Invisible Users - Frequently Asked Questions",
    "description": "Common questions about The Invisible Users book, AI agent compatibility, implementation guidance, and identity delegation infrastructure",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is The Invisible Users about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Invisible Users examines how modern web design optimised for human users fails for AI agents, and how fixing this benefits everyone. The book provides practical guidance for making websites accessible to both humans and AI agents through semantic HTML, explicit state management, and structured data."
        }
      },
      {
        "@type": "Question",
        "name": "Who should read this book?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The book targets web professionals, agent system developers, business leaders, and partners evaluating opportunities in agent-mediated commerce."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Web Audit Suite?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Web Audit Suite is a comprehensive Node.js tool that analyses websites for AI agent compatibility, SEO performance, accessibility compliance, and security headers. It implements the patterns described in the book and generates detailed reports."
        }
      }
    ]
  }
  </script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
    }

    header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
    }

    header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    header p {
      font-size: 1.25rem;
      color: #e0e7ff;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .faq-section {
      margin-bottom: 3rem;
    }

    .faq-section h2 {
      font-size: 1.75rem;
      color: #1e40af;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #3b82f6;
    }

    .faq-item {
      background: #f9fafb;
      border-left: 4px solid #3b82f6;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .faq-item h3 {
      font-size: 1.25rem;
      color: #1f2937;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }

    .faq-item p {
      color: #4b5563;
      margin-bottom: 0.75rem;
    }

    .faq-item p:last-child {
      margin-bottom: 0;
    }

    footer {
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      padding: 2rem;
      text-align: center;
      margin-top: 4rem;
    }

    footer p {
      color: #6b7280;
      margin: 0.25rem 0;
    }

    .contact-links {
      margin: 1.5rem 0;
    }

    .contact-links a {
      color: #2563eb;
      margin: 0 1rem;
      text-decoration: none;
    }

    .contact-links a:hover {
      text-decoration: underline;
    }

    .floating-home-button {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .floating-home-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    .floating-top-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
      cursor: pointer;
    }

    .floating-top-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <header>
    <h1>Frequently Asked Questions</h1>
    <p>Common questions about The Invisible Users</p>
  </header>

  <main class="container" role="main" data-load-state="complete">

    <section class="faq-section" data-section-type="about-book">
      <h2>About the Book</h2>

      <article class="faq-item" id="what-is-book">
        <h3>What is The Invisible Users about?</h3>
        <p>The Invisible Users examines how modern web design optimised for human users fails for AI agents, and how fixing this benefits everyone. The book provides practical guidance for making websites accessible to both humans and AI agents through semantic HTML, explicit state management, and structured data.</p>
      </article>

      <article class="faq-item" id="who-should-read">
        <h3>Who should read this book?</h3>
        <p>The book targets four primary audiences: Web Professionals (developers, designers), Agent System Developers (building AI agents), Business Leaders (CTOs, product owners), and Partners & Investors (evaluating opportunities in agent-mediated commerce).</p>
      </article>

    </section>

    <section class="faq-section" data-section-type="implementation">
      <h2>Implementation</h2>

      <article class="faq-item" id="web-audit-suite">
        <h3>What is the Web Audit Suite?</h3>
        <p>The Web Audit Suite is a comprehensive Node.js tool that analyses websites for AI agent compatibility, SEO performance, accessibility compliance (WCAG 2.1), performance metrics, and security headers. It implements the patterns described in the book and generates detailed reports. Available as a separate purchase or professional audit service.</p>
      </article>

      <article class="faq-item" id="getting-started">
        <h3>How do I get started with implementation?</h3>
        <p>Start with Appendix F (Implementation Roadmap) which provides priority-based guidance. Priority 1 quick wins include adding semantic HTML, implementing proper form field naming, and adding Schema.org structured data. Appendix A (Implementation Cookbook) provides code examples for common patterns.</p>
      </article>

    </section>

  </main>

  <footer role="contentinfo">
    <div class="contact-links">
      <a href="mailto:tom.cranstoun@gmail.com">Email</a>
      <a href="https://allabout.network">Website</a>
      <a href="https://www.linkedin.com/in/tom-cranstoun/">LinkedIn</a>
      <a href="https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript">GitHub</a>
    </div>
    <p>&copy; 2026 Tom Cranstoun. All rights reserved.</p>
    <p>Last updated: January 2026</p>
  </footer>

  <a href="index.html" class="floating-home-button" aria-label="Back to Home">Home</a>
  <a href="#" class="floating-top-button" aria-label="Back to Top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">Top</a>
</body>
</html>
```

---

## 10. 404 Error Page: Page Not Found

The 404 error page provides helpful guidance when content is unavailable. For AI agents, it needs clear navigation suggestions and alternative paths.

**AI-friendly patterns demonstrated:**

- HTTP 404 status code (set by server)
- Clear error explanation with data-error-type attribute
- Suggested alternative pages
- Search functionality or sitemap link
- Contact information for persistent issues

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Tom Cranstoun">
  <meta name="description" content="Page not found - The requested page could not be found on The Invisible Users website">

  <!-- AI-specific meta tags -->
  <meta name="ai-preferred-access" content="html">
  <meta name="ai-content-policy" content="summaries-allowed, full-extraction-allowed">
  <meta name="ai-freshness" content="monthly">
  <meta name="ai-structured-data" content="json-ld">
  <meta name="ai-attribution" content="required">

  <title>404 - Page Not Found | The Invisible Users</title>

  <!-- Schema.org structured data for error page -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "404 - Page Not Found",
    "description": "The requested page could not be found",
    "url": "https://allabout.network/invisible-users/web/site/404.html",
    "isPartOf": {
      "@type": "WebSite",
      "name": "The Invisible Users",
      "url": "https://allabout.network/invisible-users"
    }
  }
  </script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
    }

    .error-container {
      max-width: 800px;
      margin: 6rem auto;
      padding: 3rem 2rem;
      text-align: center;
    }

    .error-code {
      font-size: 8rem;
      font-weight: 700;
      color: #3b82f6;
      line-height: 1;
      margin-bottom: 1rem;
    }

    h1 {
      font-size: 2.5rem;
      color: #1e40af;
      margin-bottom: 1rem;
    }

    .error-message {
      font-size: 1.25rem;
      color: #4b5563;
      margin-bottom: 3rem;
    }

    .suggestions {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 2rem;
      margin: 3rem 0;
      text-align: left;
    }

    .suggestions h2 {
      color: #1e40af;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .suggestions ul {
      list-style: none;
      margin: 0;
    }

    .suggestions li {
      margin-bottom: 1rem;
    }

    .suggestions a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .suggestions a:hover {
      text-decoration: underline;
    }

    .btn {
      display: inline-block;
      background: #2563eb;
      color: white;
      padding: 1rem 2.5rem;
      border-radius: 6px;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.2s;
      margin: 0.5rem;
      font-size: 1.1rem;
    }

    .btn:hover {
      background: #1d4ed8;
    }

    footer {
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      padding: 2rem;
      text-align: center;
      margin-top: 4rem;
    }

    footer p {
      color: #6b7280;
      margin: 0.25rem 0;
    }

    .contact-links {
      margin: 1.5rem 0;
    }

    .contact-links a {
      color: #2563eb;
      margin: 0 1rem;
      text-decoration: none;
    }

    .contact-links a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <main class="error-container" role="main" data-error-type="404" data-error-code="404">
    
    <div class="error-code">404</div>
    <h1>Page Not Found</h1>
    <p class="error-message">The page you're looking for doesn't exist or has been moved.</p>

    <div class="suggestions">
      <h2>Try These Instead</h2>
      <ul>
        <li><a href="index.html">→ Home Page</a> - Return to the main page</li>
        <li><a href="collection.html">→ All Appendices</a> - Browse the complete collection</li>
        <li><a href="faq.html">→ FAQ</a> - Common questions and answers</li>
        <li><a href="contact.html">→ Contact</a> - Get in touch for help</li>
      </ul>
    </div>

    <p style="color: #6b7280; margin-top: 2rem;">
      If you believe this is an error, please <a href="contact.html" style="color: #2563eb;">contact us</a> and let us know which page you were trying to reach.
    </p>

    <div style="margin-top: 3rem;">
      <a href="index.html" class="btn">Return Home</a>
    </div>

  </main>

  <footer role="contentinfo">
    <div class="contact-links">
      <a href="mailto:tom.cranstoun@gmail.com">Email</a>
      <a href="https://allabout.network">Website</a>
      <a href="https://www.linkedin.com/in/tom-cranstoun/">LinkedIn</a>
      <a href="https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript">GitHub</a>
    </div>
    <p>&copy; 2026 Tom Cranstoun. All rights reserved.</p>
  </footer>
</body>
</html>
```

---

## 11. Privacy Policy Page: Legal Information

The privacy policy page explains data collection and usage. For AI agents, it needs clear section structure and plain language explanations.

**AI-friendly patterns demonstrated:**

- WebPage schema with Article type for legal content
- Clear section headings with data-section-id attributes
- Table of contents with anchor links
- Last updated date with machine-readable format
- Contact information for privacy queries

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Tom Cranstoun">
  <meta name="description" content="Privacy policy for The Invisible Users website - how we collect, use, and protect your information">

  <!-- AI-specific meta tags -->
  <meta name="ai-preferred-access" content="html">
  <meta name="ai-content-policy" content="summaries-allowed, full-extraction-allowed">
  <meta name="ai-freshness" content="monthly">
  <meta name="ai-structured-data" content="json-ld">
  <meta name="ai-attribution" content="required">

  <title>Privacy Policy | The Invisible Users</title>

  <!-- Schema.org structured data for privacy policy -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "description": "Privacy policy explaining data collection and usage practices",
    "datePublished": "2026-01-11",
    "dateModified": "2026-01-11",
    "author": {
      "@type": "Person",
      "name": "Tom Cranstoun"
    }
  }
  </script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
    }

    header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
    }

    header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    .last-updated {
      color: #e0e7ff;
      font-size: 0.95rem;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    article h2 {
      font-size: 1.75rem;
      color: #1e40af;
      margin: 2.5rem 0 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #3b82f6;
    }

    article h3 {
      font-size: 1.35rem;
      color: #1f2937;
      margin: 2rem 0 1rem;
    }

    article p {
      margin-bottom: 1.5rem;
      color: #4b5563;
      font-size: 1.05rem;
    }

    article ul {
      margin: 1.5rem 0 1.5rem 2rem;
      color: #4b5563;
    }

    article li {
      margin-bottom: 0.75rem;
    }

    .info-box {
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem 0;
    }

    footer {
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      padding: 2rem;
      text-align: center;
      margin-top: 4rem;
    }

    footer p {
      color: #6b7280;
      margin: 0.25rem 0;
    }

    .contact-links {
      margin: 1.5rem 0;
    }

    .contact-links a {
      color: #2563eb;
      margin: 0 1rem;
      text-decoration: none;
    }

    .contact-links a:hover {
      text-decoration: underline;
    }

    .floating-home-button {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .floating-home-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    .floating-top-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
      cursor: pointer;
    }

    .floating-top-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <header>
    <h1>Privacy Policy</h1>
    <p class="last-updated">
      <time datetime="2026-01-11">Last updated: 11 January 2026</time>
    </p>
  </header>

  <main class="container" role="main">
    <article data-document-type="privacy-policy">

      <section id="introduction" data-section-id="introduction">
        <h2>Introduction</h2>
        <p>This privacy policy explains how The Invisible Users project ("we", "us", "our") collects, uses, and protects your personal information when you visit our website.</p>
        <p>We are committed to protecting your privacy and ensuring transparency about our data practices.</p>
      </section>

      <section id="information-collected" data-section-id="data-collection">
        <h2>Information We Collect</h2>
        
        <h3>Information You Provide</h3>
        <p>We may collect information you voluntarily provide when you:</p>
        <ul>
          <li>Contact us via email</li>
          <li>Subscribe to updates or newsletters</li>
          <li>Purchase the Web Audit Suite or request professional services</li>
          <li>Provide feedback or ask questions</li>
        </ul>

        <h3>Automatically Collected Information</h3>
        <p>When you visit our website, we may automatically collect:</p>
        <ul>
          <li>IP address and browser information</li>
          <li>Pages visited and time spent on pages</li>
          <li>Referring website or search terms</li>
          <li>Device type and operating system</li>
        </ul>
      </section>

      <section id="how-we-use" data-section-id="data-usage">
        <h2>How We Use Your Information</h2>
        <p>We use collected information to:</p>
        <ul>
          <li>Respond to your enquiries and provide requested services</li>
          <li>Send updates about the book or project (if you've subscribed)</li>
          <li>Improve our website content and user experience</li>
          <li>Analyse website traffic and usage patterns</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section id="data-sharing" data-section-id="data-sharing">
        <h2>Information Sharing</h2>
        <p>We do not sell, trade, or rent your personal information to third parties.</p>
        <p>We may share information only in these circumstances:</p>
        <ul>
          <li>With your explicit consent</li>
          <li>To comply with legal requirements or court orders</li>
          <li>To protect our rights or the safety of others</li>
          <li>With service providers who assist in operating our website (under strict confidentiality agreements)</li>
        </ul>
      </section>

      <section id="cookies" data-section-id="cookies">
        <h2>Cookies and Tracking</h2>
        <p>Our website may use cookies to enhance user experience. You can control cookie settings through your browser preferences.</p>
      </section>

      <section id="your-rights" data-section-id="user-rights">
        <h2>Your Rights</h2>
        <p>Under data protection law (including GDPR), you have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to data processing</li>
          <li>Request data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p>To exercise these rights, contact us at <a href="mailto:tom.cranstoun@gmail.com">tom.cranstoun@gmail.com</a>.</p>
      </section>

      <section id="security" data-section-id="security">
        <h2>Data Security</h2>
        <p>We implement appropriate technical and organisational measures to protect your personal information. However, no internet transmission is completely secure, and we cannot guarantee absolute security.</p>
      </section>

      <section id="contact" data-section-id="contact">
        <h2>Contact Information</h2>
        <p>For privacy-related questions or concerns, contact:</p>
        <p><strong>Tom Cranstoun</strong><br>
        Email: <a href="mailto:tom.cranstoun@gmail.com">tom.cranstoun@gmail.com</a></p>
      </section>

    </article>
  </main>

  <footer role="contentinfo">
    <div class="contact-links">
      <a href="mailto:tom.cranstoun@gmail.com">Email</a>
      <a href="https://allabout.network">Website</a>
      <a href="https://www.linkedin.com/in/tom-cranstoun/">LinkedIn</a>
      <a href="https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript">GitHub</a>
    </div>
    <p>&copy; 2026 Tom Cranstoun. All rights reserved.</p>
    <p>Last updated: January 2026</p>
  </footer>

  <a href="index.html" class="floating-home-button" aria-label="Back to Home">Home</a>
  <a href="#" class="floating-top-button" aria-label="Back to Top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">Top</a>
</body>
</html>
```

---

## 12. Pricing Page: Service Tiers Comparison

The pricing page compares multiple service or product tiers side-by-side. For AI agents, it needs clear price structure with PriceSpecification schema.

**AI-friendly patterns demonstrated:**

- Multiple Offer schemas with priceSpecification
- Comparison table with data-tier attributes
- Feature lists with data-included attributes
- Clear pricing with data-price and data-currency

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Tom Cranstoun">
  <meta name="description" content="Web Audit Suite pricing - compare self-service tool, professional audit, and agency partnership options">

  <!-- AI-specific meta tags -->
  <meta name="ai-preferred-access" content="html">
  <meta name="ai-content-policy" content="summaries-allowed, full-extraction-allowed">
  <meta name="ai-freshness" content="monthly">
  <meta name="ai-structured-data" content="json-ld">
  <meta name="ai-attribution" content="required">

  <title>Pricing | Web Audit Suite</title>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Web Audit Suite",
    "description": "Comprehensive website analysis tool for AI agent compatibility",
    "offers": [
      {
        "@type": "Offer",
        "name": "Self-Service Tool",
        "description": "One-time purchase of the Web Audit Suite tool",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Professional Audit",
        "description": "Expert analysis with detailed report and implementation guidance",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Agency Partnership",
        "description": "White-label reports and referral arrangement for agencies",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock"
      }
    ]
  }
  </script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
    }

    header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
    }

    header h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    header p {
      font-size: 1.5rem;
      color: #e0e7ff;
      max-width: 800px;
      margin: 0 auto;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      margin: 4rem 0;
    }

    .pricing-card {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      padding: 2.5rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .pricing-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.1);
    }

    .pricing-card.featured {
      border-color: #3b82f6;
      border-width: 3px;
      background: #eff6ff;
    }

    .pricing-card h3 {
      font-size: 1.75rem;
      color: #1e40af;
      margin-bottom: 0.5rem;
    }

    .pricing-card .price {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e40af;
      margin: 1rem 0;
    }

    .pricing-card .price-note {
      font-size: 0.9rem;
      color: #6b7280;
      margin-bottom: 1.5rem;
    }

    .pricing-card ul {
      list-style: none;
      margin: 1.5rem 0;
    }

    .pricing-card li {
      padding: 0.5rem 0 0.5rem 2rem;
      position: relative;
      color: #4b5563;
    }

    .pricing-card li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: 700;
    }

    .btn {
      display: block;
      width: 100%;
      background: #2563eb;
      color: white;
      padding: 1rem;
      border-radius: 6px;
      font-weight: 600;
      text-decoration: none;
      text-align: center;
      transition: background 0.2s;
      margin-top: 1.5rem;
    }

    .btn:hover {
      background: #1d4ed8;
    }

    footer {
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      padding: 2rem;
      text-align: center;
      margin-top: 4rem;
    }

    footer p {
      color: #6b7280;
      margin: 0.25rem 0;
    }

    .contact-links {
      margin: 1.5rem 0;
    }

    .contact-links a {
      color: #2563eb;
      margin: 0 1rem;
      text-decoration: none;
    }

    .contact-links a:hover {
      text-decoration: underline;
    }

    .floating-home-button {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .floating-home-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    .floating-top-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #0066cc;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
      cursor: pointer;
    }

    .floating-top-button:hover {
      background-color: #003d7a;
      transform: translateY(-2px);
    }

    @media (max-width: 968px) {
      .pricing-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Pricing</h1>
    <p>Choose the option that works best for you</p>
  </header>

  <main class="container" role="main" data-load-state="complete">

    <div class="pricing-grid">

      <article class="pricing-card" data-tier="basic" data-price-type="one-time">
        <h3>Self-Service Tool</h3>
        <div class="price">Contact for pricing</div>
        <p class="price-note">One-time purchase</p>
        <ul>
          <li data-included="true">Complete Web Audit Suite tool</li>
          <li data-included="true">Run unlimited audits</li>
          <li data-included="true">Analyse any website</li>
          <li data-included="true">Generate detailed reports</li>
          <li data-included="true">Command-line and API access</li>
          <li data-included="true">Documentation included</li>
        </ul>
        <a href="contact.html" class="btn">Get Quote</a>
      </article>

      <article class="pricing-card featured" data-tier="professional" data-price-type="per-project">
        <h3>Professional Audit</h3>
        <div class="price">Contact for pricing</div>
        <p class="price-note">Per-project pricing</p>
        <ul>
          <li data-included="true">Expert analysis by author</li>
          <li data-included="true">Detailed findings report</li>
          <li data-included="true">Priority-based recommendations</li>
          <li data-included="true">Implementation guidance</li>
          <li data-included="true">Code examples for your stack</li>
          <li data-included="true">Video walkthrough</li>
          <li data-included="true">30 days email support</li>
        </ul>
        <a href="contact.html" class="btn">Request Audit</a>
      </article>

      <article class="pricing-card" data-tier="agency" data-price-type="partnership">
        <h3>Agency Partnership</h3>
        <div class="price">Partnership</div>
        <p class="price-note">For agencies</p>
        <ul>
          <li data-included="true">White-label audit reports</li>
          <li data-included="true">Referral arrangement</li>
          <li data-included="true">Joint client presentations</li>
          <li data-included="true">Technical support</li>
          <li data-included="true">Training for your team</li>
          <li data-included="true">Co-marketing opportunities</li>
          <li data-included="true">Priority support</li>
        </ul>
        <a href="contact.html" class="btn">Discuss Partnership</a>
      </article>

    </div>

  </main>

  <footer role="contentinfo">
    <div class="contact-links">
      <a href="mailto:tom.cranstoun@gmail.com">Email</a>
      <a href="https://allabout.network">Website</a>
      <a href="https://www.linkedin.com/in/tom-cranstoun/">LinkedIn</a>
      <a href="https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript">GitHub</a>
    </div>
    <p>&copy; 2026 Tom Cranstoun. All rights reserved.</p>
    <p>Last updated: January 2026</p>
  </footer>

  <a href="index.html" class="floating-home-button" aria-label="Back to Home">Home</a>
  <a href="#" class="floating-top-button" aria-label="Back to Top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">Top</a>
</body>
</html>
```

---
