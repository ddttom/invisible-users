---
title: "The Invisible Users: Designing the Web for AI Agents and Everyone Else"
author: "Tom Cranstoun"
date: "2026-01-21"
version: "2.6.0"
description: "Google Apps Script themed 20-minute presentation deck"
audience: "Business leaders (CTOs, product owners)"
duration: "20 minutes + Q&A"
estimated_presentation_time: "24-27 minutes"
slides: 28
theme:
  background: "#1C1C1C"
  header: "#0046B5"
  text: "#FFFFFF"
  highlight: "#FF3300"
  fonts:
    title: "Georgia"
    body: "Roboto"
changes: "v2.6.0 - Added Ally McBeal case study, pricing JSON-LD example, Anthropic Cowork agentic era slide"
---

# The Invisible Users Presentation - 20 Minutes

---

## Slide 1: The Invisible Users

**Subtitle:** Designing the Web for AI Agents and Everyone Else

- Tom Cranstoun: Many years in Adobe CMS & AI innovation.
- Consultant at Digital Domain Technologies Ltd.
- Philosophy: "AI should amplify, not replace, human expertise."
- Focus: Building zero-dependency, agent-friendly web architectures.

*Footer: Tom Cranstoun | Due Q1 2026*

---

## Slide 2: Understanding Invisible Users

**Subtitle:** Two reasons they're called 'invisible'

- 1. Invisible to site owners - blend into analytics, come once and leave
- 2. Interface is invisible to them - can't see animations, color, toasts, spinners
- Not theoretical futures - happening today
- Same failures affect screen reader users (invisible to designers for 27 years)
- Visual feedback invisible to AI agents AND blind users
- Sites that work get preferred by both - first-mover advantage that's hard to claw back

---

## Slide 3: The Agent Journey

**Subtitle:** AI Agents Are Buying Things Right Now

- Your website has machine readers right now
- Stage 1: Discovery (Training) - If you're not in their knowledge base, you don't exist
- Stage 2: Citation (Recommendation) - Agents recommend sources they trust
- Stage 3: Search & Compare - Agents build comparison lists
- Stage 4: Price Understanding - Exact pricing or agents skip you
- Stage 5: Purchase Confidence - Can they complete checkout?
- Miss any stage → The entire commerce chain breaks
- If agents can't find you, you don't get a look in

---

## Slide 4: The AI Referral Surge and The £203,000 Mistake

**Subtitle:** Adobe Holiday 2025 Data Meets Real-World Agent Failure

- Triple-Digit Growth: AI referrals surged (Retail +700%, Travel +500%)
- Conversion Flip: AI referrals moved from lagging to leading (+30%)
- Engagement: AI users spend 50% longer on site, view more pages
- Real Example: Claude for Chrome researching Danube cruises (Jan 2025)
- Returned: £203,000-£402,000 per person. Actual: £2,030-£4,020
- 100x multiplication error from European formatting (€2.030,00)

**Highlight Box:**
**£203,000**
potential mistake
if auto-booked

*Footer: From experimental to revenue driver - but errors have consequences.*

---

## Slide 5: What Caused This?

**Subtitle:** The Error Chain

- Decimal separator confusion (€2.030,00 vs £2,030)
- No range validation (£203k > £15k maximum)
- No comparative checks (58x higher than peers)
- No cross-referencing against structured data
- No confidence scoring
- AI reformatting the content masked the problem
- Error presented with same confidence as verified data

---

## Slide 6: Who Are The Invisible Users?

**Subtitle:** AI Agents You Can't See or Track

- Most companies don't track AI bot traffic
- Some prohibit AI bots (robots.txt), some block them (Cloudflare Identity checks)
- Modern AI browsers DO identify as bots (ChatGPT, BrowserOps, Comet, Neo, DIA)
- BUT: User-Agent strings cannot be trusted
- Some agents are browser extensions, others are Playwright-driven automation
- Site owners can no longer reliably tell what is human, what is AI

---

## Slide 7: Four Types of AI Agents

**Subtitle:** Different Technical Constraints

- Server-Side (ChatGPT, Claude) - Cannot see JavaScript/CSS, need semantic HTML
- In-Browser (Copilot, extensions) - See rendered pages, need explicit state in DOM
- Browser Automation (Perplexity, Playwright) - Full browser control + screenshots
- Local/On-Device (Ollama) - Run on user's PC, limited context windows
- Each type has different capabilities - but ALL need semantic structure
- Understanding constraints helps you design solutions that work for all

---

## Slide 8: Why Current Systems Fail

**Subtitle:** The Markup Problem

- Modern CMS creates divs without semantic meaning
- Content served as plain HTML - JavaScript decorates it later
- Example: Adobe's LLM Optimizer detects bots and forks experiences (understandable but suboptimal)
- Bots see different pages than browser-based agents see
- Solution: Fix HTML for everyone together, not separate bot experiences
- We are 27 years behind the times - should have fixed this for accessibility

---

## Slide 9: Mistake #1: Toast Notifications

**Subtitle:** The Pattern That Keeps Returning:

- Removed from forms (good!) -> Reintroduced in shopping cart (bad!)
- showToast('Item added!')
- Toast notifications vanish before agents read them.
- Form submission appears to fail silently.
- Agents abandon the flow.
- Solution: Persistent alerts that stay visible.

---

## Slide 10: Mistake #2: Hidden Checkout State

**Subtitle:** State Invisible to Agents:

- JavaScript-only state (let currentStep = 1)
- No URL reflection. No DOM attributes.
- Agents can't track progress. Refreshing loses state.
- Solution: data-state attributes in DOM.

---

## Slide 11: Why This Happens

**Subtitle:** Modern web design optimised for visual feedback:

- Single-page applications
- Client-side state management
- Loading spinners without context
- JavaScript-dependent navigation
- These patterns break AI agents AND screen readers - same problems, same solutions.

---

## Slide 11a: Real-World Consequences: The Ally McBeal Case

**Subtitle:** When metadata fails, AI agents hallucinate dangerously

- Lawyers caught citing fictional cases in court
- AI agents confused Ally McBeal TV scripts with legal precedents
- Without proper microdata/metadata distinguishing entertainment from legal docs
- Agents fabricate details that seem plausible but are dangerously incorrect
- Same problem affects pricing, product specs, contact info
- Solution: Proper metadata (Schema.org, semantic HTML) prevents these errors

---

## Slide 12: Two HTML States: The Gap

**Subtitle:** Critical Distinction:

- 1. Served HTML (static) - What server sends before JS
-    → CLI agents, screen readers see this
- 2. Rendered HTML (dynamic) - After JS execution
-    → Only browser-based agents see this
- Example: <div id='products'></div> then fetch()
- Product catalogue invisible to most agents AND some assistive tech

---

## Slide 13: Myth vs Reality: Why Markdown Fails

**Subtitle:** Common Misconception About AI Content

- MYTH: 'Send markdown to LLMs for clean parsing'
- REALITY: Markdown STRIPS all metadata and context
- What gets lost: Schema.org markup, JSON-LD, semantic HTML, ARIA attributes
- Agents need enriched HTML, not stripped-down markdown
- Context is data - don't make agents think, give them facts
- Solution: Enriched HTML with Schema.org + JSON-LD + semantic structure

---

## Slide 14: The Solution

**Subtitle:** Make Implicit State Explicit

- No rebuilding interfaces
- No special agent-only experiences
- Small, well-understood changes
- Improve accessibility for everyone
- Three concrete patterns with code and business value

---

## Slide 15: Pattern #1: Persistent Errors

**Subtitle:** Instead of vanishing toast notifications

- <form data-state='incomplete'> with <div role='alert'>
- Screen readers announce role='alert' immediately
- aria-invalid and aria-describedby work for agents AND users
- Business value: Conversion rates improve for everyone

---

## Slide 16: Pattern #2: Complete Pricing

**Subtitle:** Instead of 'From £99'

- Use Schema.org/Offer markup
- Voice assistants for blind users read same structured data
- Explicit price and currency (machines AND humans need clarity)
- <details> for fee breakdown (keyboard navigable)
- Business value: Builds trust, reduces cart abandonment for all users

---

## Slide 16a: Complete Pricing: JSON-LD Example

**Subtitle:** Machine-readable pricing with full cost breakdown

- { "@type": "Product", "name": "Laptop", "offers": {
-   "@type": "Offer", "price": "999.99", "priceCurrency": "GBP",
-   "priceSpecification": [
-     { "@type": "UnitPriceSpecification", "price": "899.99", "name": "Base Price" },
-     { "@type": "DeliveryChargeSpecification", "price": "50.00", "name": "Delivery" },
-     { "@type": "PaymentChargeSpecification", "price": "50.00", "name": "Commission" }
-   ] } }
- Agents can now extract: Base price + Delivery + Commission = Total
- Same data powers voice assistants for blind users

---

## Slide 17: Pattern #3: Explicit State

**Subtitle:** Make cart state visible

- DOM attributes: data-state='active', data-item-count='3'
- role='status' announces updates to screen readers AND agents
- Same state visibility benefits assistive technology users
- Business value: State persists. Debugging easier. Accessible to all

---

## Slide 18: Small Business Case

**Subtitle:** You don't need complex infrastructure

- Simple restaurant site example
- Semantic HTML (<nav>, <main>, <article>)
- Schema.org markup (Restaurant, Menu, MenuItem)
- Minimal effort
- Completely agent-friendly

---

## Slide 19: Quick Wins: Start Here

**Subtitle:** Critical Priority 1 Changes

- Add persistent error messages
- Display complete pricing (no hidden fees)
- Ensure served HTML contains core content
- Add basic Schema.org structured data
- Start with highest impact, lowest effort

---

## Slide 20: Machine Experience (MX): A New Discipline

**Subtitle:** Alongside UX, We Need MX

- UX = User Experience. MX = Machine Experience.
- Just as quality needs dedicated QA engineers, MX needs dedicated roles
- When 'everyone's responsible,' accountability vanishes (diffusion of responsibility)
- MX specialists define agent-readability standards, audit implementations
- Can expand existing accessibility roles - technical patterns overlap substantially
- Executive commitment essential - this requires organizational change, not just tech fixes

---

## Slide 21: Why This Matters Now: The Seven-Day Platform Race

**Subtitle:** January 2026 - Three platforms launched in one week

- Jan 5: Amazon Alexa+ (browser agent launch)
- Jan 8: Microsoft Copilot Checkout (proprietary)
- Jan 11: Google Universal Commerce Protocol (open standard, like ACP)
- Timeline compressed: 12 months → 6-9 months or LESS to mainstream
- Agent commerce is now infrastructure, not experimental
- Designers/Devs must ensure agents navigate successfully
- Sites that adapt early gain first-mover advantage

---

## Slide 22: One Solution Serves Everyone: The Convergence Principle

**Subtitle:** This is the key insight

- What machines need = What disabled users have needed for 27 years
- No trade-offs between accessibility and AI readiness
- Fix HTML for everyone together, not separate bot experiences
- First-mover advantage for sites that implement patterns now
- This is the inflection point - like ChatGPT launch in 2022
- Within two years, machines will read websites, not humans
- One solution. Everyone benefits. No exceptions.

---

## Slide 22a: The Agentic Era: Anthropic's Claude Cowork

**Subtitle:** From Chatbot to Digital Colleague (January 2026)

- Jan 12, 2026: Anthropic launches Claude Cowork research preview
- First truly autonomous digital colleague - manages files, orchestrates workflows
- Multi-agent architecture: Claude 4 Opus leads, Claude 4.5 Sonnet executes sub-tasks
- Built in 1.5 weeks using Claude Code itself
- Now available to $20/month Pro subscribers
- This IS the agentic era - agents are already coworkers, not just assistants

**Highlight Box:**
**1.5 weeks**
to build Cowork
using Claude Code

*Footer: The shift from passive assistant to active agent is complete.*

---

## Slide 23: Book & Contact

**Subtitle:** The Invisible Users

- Tom Cranstoun
- tom.cranstoun@gmail.com | https://allabout.network
- LinkedIn: https://www.linkedin.com/in/tom-cranstoun/
-
- Project Pages:
- Book: https://allabout.network/invisible-users
- News: https://allabout.network/invisible-users/news.html

*Footer: Questions? Discussion? Your challenges?*
