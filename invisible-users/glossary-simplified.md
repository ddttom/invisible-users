# Simplified Glossary for Business Leaders

Essential terms for understanding AI agent interaction with websites, explained in plain language.

**Purpose:** This glossary provides business-friendly definitions without technical jargon. For comprehensive technical definitions, see [Glossary.md](Glossary.md).

---

## Agent (or AI Agent)

An artificial intelligence assistant that visits websites on behalf of human users. Examples include ChatGPT browsing the web, Claude with computer use, or similar tools. When users ask "find me the best hotel in Paris," the agent visits multiple hotel websites to research options.

## Agent-Friendly Design

Website design that works well for both human visitors and AI agents. Characterised by clear information, visible error messages, complete pricing, and straightforward navigation.

## API (Application Programming Interface)

A structured way for software programs to request information from your website. Think of it as a special entrance for computers, separate from the regular website humans see. APIs provide data in a format agents can reliably understand.

## Attribution

Crediting the source of information. When an agent summarises content from your website, attribution means citing your site as the source with a link back to the original.

## Bot Detection

Security systems that try to identify and block automated visitors. These systems aim to prevent spam and abuse but can also block legitimate AI agents.

## Conversion Rate

The percentage of visitors who complete a desired action (purchase, sign-up, booking). Agent compatibility matters because agents that fail to complete tasks represent lost conversions.

## Delegation Token

A secure credential that allows an AI agent to act on a user's behalf with specific, limited permissions. Unlike sharing passwords, tokens can be restricted to particular actions and set to expire automatically.

## Extraction

When an AI agent reads and summarises content from your website without directing traffic to your page. Particularly concerning for ad-funded content sites because agents consume information without generating ad impressions.

## Identity Delegation

The system that lets AI agents act on behalf of users whilst preserving customer relationships. Allows businesses to know which actual customer made a purchase, even when an agent completed the transaction.

## JSON-LD (Structured Data)

A way of adding machine-readable information to web pages. Tells search engines and AI agents exactly what information means (this is a price, this is an address, this is availability) rather than making them guess from visual formatting.

## llms.txt

A file (similar to robots.txt) that provides site-wide guidance to AI agents. Tells agents about your access policies, rate limits, API availability, and content usage rules.

## Loading State

Clear indication that content is currently loading. Agent-friendly loading states include estimated duration and explicit confirmation when loading completes, rather than just showing a spinner.

## Pagination

Splitting content across multiple pages. Forced pagination (requiring users to click "Next" repeatedly) creates problems for agents that may miss content or fail to navigate properly.

## Persistent Error

An error message that remains visible until resolved. Contrasts with temporary notifications that disappear after a few seconds. Agents and humans both need errors to stay visible whilst fixing problems.

## Rate Limiting

Controlling how many requests your website accepts from a single source within a time period. Prevents abuse whilst allowing reasonable access. Example: "100 requests per hour per visitor."

## Schema.org

A collaborative vocabulary for adding structured information to websites. Provides standardised ways to describe products, businesses, events, and other common content types. Widely supported by search engines and useful for AI agents.

## Screen Reader

Software that reads website content aloud for blind or visually impaired users. Design patterns that work for screen readers usually work for AI agents too, because both need to understand content sequentially rather than visually.

## Semantic HTML

HTML code that clearly indicates what different parts of a page mean (this is a heading, this is a list, this is a form). Helps both assistive technology and AI agents understand page structure and content.

## Session Inheritance

When browser-based AI agents automatically inherit your authenticated login session. Means the agent can access logged-in areas of websites without separately authenticating, which creates both convenience and security implications.

## SPA (Single Page Application)

Modern web applications that update content dynamically without loading new pages. Can create challenges for agents because state changes may not be reflected in URLs or page structure.

## State

The current condition of something on a web page (loading, complete, error, disabled, etc.). Agent-friendly design makes state explicit through attributes and text rather than relying solely on visual cues.

## Structured Data

Information formatted in a standardised, machine-readable way. Helps agents understand exactly what data means rather than trying to interpret visual layouts designed for humans.

## Terms of Service (ToS)

Legal agreement between website and users. Many ToS prohibit "automated access" in ways that are unclear about whether AI agents acting on behalf of real users are permitted.

## Toast Notification

Temporary message that appears briefly (often 2-5 seconds) then disappears automatically. Called "toast" because it pops up like toast from a toaster. Problematic for agents because the message may vanish before being read.

## User-Agent String

Text that browsers and other software send to websites identifying what they are. Example: "Mozilla/5.0..." helps websites know whether a visitor is Chrome on Windows, Safari on iPhone, or an AI agent.

## Validation

Checking whether form inputs meet requirements (correct email format, required fields filled, etc.). Synchronous validation checks immediately as users type; asynchronous validation waits until form submission.

---

**For detailed technical definitions:** See [Glossary.md](Glossary.md)

**For implementation guidance:** See [implementation-checklist.md](implementation-checklist.md)

**For strategic frameworks:** See [chapter-04-the-business-reality.md](chapter-04-the-business-reality.md) and [chapter-05-the-content-creators-dilemma.md](chapter-05-the-content-creators-dilemma.md)
