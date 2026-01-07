# Appendix G: Resource Directory

Curated resources referenced in *The Invisible Users: Designing the Web for AI Agents and Everyone Else*

---

## Interactive Companion

### The Invisible Users - Interactive Notebook

- Website: <https://allabout.network/invisible-users.html>
- Time to complete: 60-75 minutes
- Interactive demonstrations of key concepts with visual comparisons, data tables, and real-world calculations
- Complete chapter index with direct navigation links
- Serves as both an executive summary and bookmarking tool for specific topics

---

## Standards and Specifications

### Schema.org

- Website: <https://schema.org>
- Documentation: <https://schema.org/docs/documents.html>
- Getting Started: <https://schema.org/docs/gs.html>
- Provides structured data vocabularies for products, businesses, events, recipes, and more

### JSON-LD

- Specification: <https://json-ld.org>
- W3C Standard: <https://www.w3.org/TR/json-ld/> (JSON-LD 1.1 current standard)
- Playground: <https://json-ld.org/playground/> (supports JSON-LD 1.1)
- Format for linking data on the web in a machine-readable format

### Microdata

- HTML5 Specification: <https://html.spec.whatwg.org/multipage/microdata.html>
- Introduction: <https://developer.mozilla.org/en-US/docs/Web/HTML/Microdata>
- Alternative to JSON-LD for embedding structured data

### Web Content Accessibility Guidelines (WCAG)

- WCAG 2.1: <https://www.w3.org/WAI/WCAG21/quickref/>
- WCAG 3.0 (W3C Accessibility Guidelines): <https://www.w3.org/TR/wcag-3.0/> (Provisional status as of 2026, formerly "Project Silver")
- Understanding WCAG: <https://www.w3.org/WAI/WCAG21/Understanding/>
- Essential for accessible and agent-friendly design
- Note: WCAG 3.0 introduces a score-based conformance model, moving away from the A/AA/AAA levels used in WCAG 2.x

### OAuth 2.0

- Specification: <https://oauth.net/2/>
- RFC 6749: <https://tools.ietf.org/html/rfc6749>
- PKCE (RFC 7636): <https://tools.ietf.org/html/rfc7636>
- Authorisation framework being explored for agent delegation scenarios

### JWT (JSON Web Tokens)

- Website: <https://jwt.io>
- RFC 7519: <https://tools.ietf.org/html/rfc7519>
- JWS (RFC 7515): <https://tools.ietf.org/html/rfc7515>
- JWKS (RFC 7517): <https://tools.ietf.org/html/rfc7517>
- Token format widely used in authentication and authorisation systems

### DPoP (Demonstration of Proof-of-Possession)

- RFC 9449: <https://datatracker.ietf.org/doc/html/rfc9449>
- Specification for binding tokens to specific clients
- **Status:** Recommended practice for high-security agent delegations (as of 2026)
- Prevents token replay attacks in agent authentication scenarios
- Critical for secure agent-to-service authentication

### WebAuthn / FIDO2

- WebAuthn Specification: <https://www.w3.org/TR/webauthn/>
- FIDO Alliance: <https://fidoalliance.org>
- Hardware authentication standard (YubiKeys, etc.)

---

## Testing and Validation Tools

### Structured Data Testing

### Google Rich Results Test

- Tool: <https://search.google.com/test/rich-results>
- Tests structured data markup for Google Search compatibility

### Schema Markup Validator

- Tool: <https://validator.schema.org>
- Validates Schema.org markup syntax and structure

### Google Search Console

- Console: <https://search.google.com/search-console>
- Monitors structured data errors and rich result performance

### Accessibility Testing

### WAVE Web Accessibility Evaluation Tool

- Tool: <https://wave.webaim.org>
- Browser Extension: <https://wave.webaim.org/extension/>
- Identifies accessibility issues

### axe DevTools

- Website: <https://www.deque.com/axe/devtools/>
- Browser extension for accessibility testing
- Free and open source: <https://github.com/dequelabs/axe-core>

### Lighthouse

- Documentation: <https://developers.google.com/web/tools/lighthouse>
- Built into Chrome DevTools
- Test performance, accessibility, SEO, and best practices

### NVDA Screen Reader

- Download: <https://www.nvaccess.org>
- Free Windows screen reader for testing

### VoiceOver

- Built into macOS and iOS
- Guide: <https://support.apple.com/guide/voiceover/welcome/mac>

### Automation Testing

### Playwright

- Website: <https://playwright.dev>
- Documentation: <https://playwright.dev/docs/intro>
- Modern browser automation for testing agent-like behaviour

### Selenium

- Website: <https://www.selenium.dev>
- Documentation: <https://www.selenium.dev/documentation/>
- Established browser automation framework

### Puppeteer

- GitHub: <https://github.com/puppeteer/puppeteer>
- Documentation: <https://pptr.dev>
- Node.js library for Chrome/Chromium automation

### Agent-Specific Testing

### Agent Protocol

- Website: <https://agentprotocol.ai>
- Standard communication protocol for AI agents
- Defines how agents interact with systems and services
- Essential for testing agent compatibility

### LangSmith

- Website: <https://www.langchain.com/langsmith>
- Tracing and observability for AI agent interactions
- Tracks how agents parse and interact with DOM elements
- Debug agent behaviour and interaction patterns

### LangFuse

- Website: <https://langfuse.com>
- Open-source observability platform for LLM applications
- Agent interaction analysis and debugging
- Track agent decision-making and DOM navigation

---

## AI Agent Platforms

### Current Agent Platforms

### ChatGPT (OpenAI)

- Website: <https://chat.openai.com>
- Models: GPT-5 and o-series reasoning models with native SearchGPT integration
- Browsing: Natively integrated web search and browsing capabilities (legacy Bing integration documentation: <https://help.openai.com/en/articles/8077698-how-do-i-use-chatgpt-browse-with-bing-to-search-the-web>)
- API: <https://platform.openai.com/docs/api-reference>

### Claude (Anthropic)

- Website: <https://claude.ai>
- Computer Use: <https://docs.anthropic.com/claude/docs/computer-use> (enables direct UI interaction, making inclusive design principles critical)
- Chrome Extension: <https://support.claude.com/en/articles/12431227-simplify-your-browsing-experience-with-claude-in-chrome> (in-browser assistant for web interaction)
- API: <https://docs.anthropic.com/claude/reference/getting-started-with-the-api>
- Claude's Computer Use capability allows agents to interact directly with user interfaces, making the accessibility and semantic patterns discussed in this book essential for reliable agent operation

### Gemini (Google)

- Website: <https://gemini.google.com>
- API: <https://ai.google.dev/docs> (Gemini 2.0/Ultra documentation)

### Microsoft Copilot

- Website: <https://copilot.microsoft.com>
- Documentation: <https://learn.microsoft.com/en-us/microsoft-365-copilot/>

### AI Frameworks

### LangChain

- Website: <https://www.langchain.com>
- Documentation: <https://python.langchain.com/docs/get_started/introduction>
- Framework for building AI agent applications

### AutoGPT

- GitHub: <https://github.com/Significant-Gravitas/AutoGPT>
- Autonomous agent framework

---

## Web Development Resources

### Documentation

### MDN Web Docs

- Website: <https://developer.mozilla.org>
- HTML Reference: <https://developer.mozilla.org/en-US/docs/Web/HTML>
- CSS Reference: <https://developer.mozilla.org/en-US/docs/Web/CSS>
- JavaScript Reference: <https://developer.mozilla.org/en-US/docs/Web/JavaScript>
- Comprehensive web development documentation

### Google Search Central

- Website: <https://developers.google.com/search>
- SEO Starter Guide: <https://developers.google.com/search/docs/fundamentals/seo-starter-guide>
- Structured Data Guidelines: <https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data>

### Can I Use

- Website: <https://caniuse.com>
- Browser compatibility tables for web technologies
- Baseline: <https://web.dev/baseline> (Web Platform Tests initiative for tracking cross-browser support, modern standard for feature adoption tracking)

### APIs and Standards

### REST API Tutorial

- Tutorial: <https://restfulapi.net>
- Best practices for RESTful API design

### GraphQL

- Website: <https://graphql.org>
- Documentation: <https://graphql.org/learn/>
- Alternative API query language

### OpenAPI Specification

- Website: <https://www.openapis.org>
- Specification: <https://swagger.io/specification/>
- Standard for describing REST APIs

---

## Privacy and Security

### Regulations

### GDPR (General Data Protection Regulation)

- Official Text: <https://gdpr-info.eu>
- ICO Guide: <https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/>
- European privacy regulation

### CCPA (California Consumer Privacy Act)

- Official Text: <https://oag.ca.gov/privacy/ccpa>
- Guide: <https://oag.ca.gov/privacy/ccpa/regs>
- California privacy regulation

### EU AI Act

- Final Act Text: <https://artificialintelligenceact.eu>
- European Commission: <https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai>
- AI regulation framework (law as of 2024, implementation phase in 2026)
- Establishes risk-based approach to AI system regulation

### Security Standards

### OWASP (Open Web Application Security Project)

- Website: <https://owasp.org>
- Top 10: <https://owasp.org/www-project-top-ten/>
- Security best practices
- XSS Prevention Cheat Sheet: <https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html>
- SQL Injection Prevention: <https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html>

### Content Security Policy (CSP)

- MDN Guide: <https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP>
- Specification: <https://www.w3.org/TR/CSP3/>
- Protection against XSS and data injection

### JWT Security Best Practices

- JWT Best Practices (RFC 8725): <https://datatracker.ietf.org/doc/html/rfc8725>
- OWASP JWT Guide: <https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html>
- Critical for Identity Layer implementations

---

## AI and Ethics

### Research Organisations

### Partnership on AI

- Website: <https://partnershiponai.org>
- Research on responsible AI development

### AI Now Institute

- Website: <https://ainowinstitute.org>
- Research on social implications of AI

### Future of Humanity Institute

- Website: <https://www.fhi.ox.ac.uk>
- AI safety and ethics research

### Guidelines

### IEEE Ethically Aligned Design

- Website: <https://ethicsinaction.ieee.org>
- Ethics guidelines for autonomous systems

### Montreal Declaration for Responsible AI

- Website: <https://www.montrealdeclaration-responsibleai.com>
- Ethical principles for AI development

---

## Books and Further Reading

### Web Development and Design

**Don't Make Me Think** by Steve Krug

- Classic usability guide
- Principles apply to both human and agent design

**Inclusive Design Patterns** by Heydon Pickering

- Accessible web design patterns
- Strong overlap with agent-friendly design

**Designing Web Interfaces** by Bill Scott and Theresa Neil

- Interface design patterns
- Many concepts relevant to agent interaction

### AI and Machine Learning

**Life 3.0** by Max Tegmark

- Future of AI and humanity
- Context for AI agent development

**The Alignment Problem** by Brian Christian

- AI safety and ethics
- Relevant to agent behaviour and trust

**Human Compatible** by Stuart Russell

- AI alignment and safety
- Framework for beneficial AI systems

### Books - Web Standards

**HTML and CSS: Design and Build Websites** by Jon Duckett

- Visual guide to web fundamentals
- Foundation for semantic markup

**Web Form Design** by Luke Wroblewski

- Form design best practices
- Critical for agent-accessible forms

---

## Example Sites (Referenced in Chapter 9)

### Well-Designed for Agents

### Stripe

- Website: <https://stripe.com>
- API Docs: <https://stripe.com/docs/api>
- Excellent API-first design

### GitHub (Example Site)

- Website: <https://github.com>
- API: <https://docs.github.com/en/rest>
- GraphQL: <https://docs.github.com/en/graphql>
- Consistent structure and excellent API

### Amazon

- Website: <https://amazon.com>
- Comprehensive structured data implementation
- Note: While Amazon implements rich structured data, they employ strict rate-limiting and web application firewalls (WAF) that may block automated agent access. For a more collaborative approach to agent access, see the llms.txt emerging standard in the Emerging Standards section

### Calendly

- Website: <https://calendly.com>
- Clear, explicit booking flow

### Wikipedia

- Website: <https://wikipedia.org>
- Wikidata: <https://www.wikidata.org>
- Structured knowledge with machine-readable data

---

## Community and Discussion

### Forums and Communities

### WebAIM Mailing List

- Website: <https://webaim.org/discussion/>
- Accessibility discussion

### A11y Slack

- Signup: <https://web-a11y.slack.com>
- Accessibility community

### dev.to

- Website: <https://dev.to>
- Web development community
- Tag: <https://dev.to/t/accessibility>

### Stack Overflow

- Website: <https://stackoverflow.com>
- Technical Q&A
- Tags: [accessibility], [schema.org], [json-ld]

### Web Directions

- Website: <https://webdirections.org>
- Web standards and best practices

---

## Browser Developer Tools

### Chrome DevTools

- Documentation: <https://developer.chrome.com/docs/devtools/>
- Network panel for analysing requests
- Lighthouse for auditing

### Firefox Developer Tools

- Documentation: <https://firefox-source-docs.mozilla.org/devtools-user/>
- Accessibility inspector
- Network analysis

### Safari Web Inspector

- Documentation: <https://webkit.org/web-inspector/>
- macOS/iOS debugging

---

## Emerging Standards

### llms.txt

### Concept

- Official Specification: <https://llmstxt.org>
- Example implementation in code-examples repository
- **Status:** De facto standard (widely adopted as of 2026)
- Similar to robots.txt but for language models
- Adopted by major platforms including Stack Overflow, documentation sites, and enterprise applications
- Optimises content for RAG (Retrieval-Augmented Generation) systems

### Real-World Example

- Digital Domain Technologies llms.txt: <https://allabout.network/llms.txt>
- Comprehensive documentation structure for Adobe Edge Delivery Services and AI development
- Demonstrates practical implementation with many posts across six major categories
- Shows how to organise technical documentation, developer guides, and AI integration resources
- Includes structured access guidelines, rate limits, and attribution requirements

### Discussion

- Various blog posts and proposals are emerging
- Not yet formally standardised
- Community-driven development

### Global Privacy Control (GPC)

### Specification

- Website: <https://globalprivacycontrol.org>
- Specification: <https://globalprivacycontrol.github.io/gpc-spec/>
- Privacy signal for user preferences

---

## Tools for Implementation

### Code Editors

### Visual Studio Code

- Download: <https://code.visualstudio.com>
- Extensions for accessibility, HTML validation, etc.

### Sublime Text

- Download: <https://www.sublimetext.com>
- Fast, lightweight code editor

### Version Control

### Git

- Website: <https://git-scm.com>
- Documentation: <https://git-scm.com/doc>

### GitHub (Version Control)

- Website: <https://github.com>
- Repository hosting and collaboration

### Package Managers

### npm (Node.js)

- Website: <https://www.npmjs.com>
- JavaScript package manager

### yarn

- Website: <https://yarnpkg.com>
- Alternative JavaScript package manager

---

## Analytics and Monitoring

### Web Analytics

### Google Analytics

- Website: <https://analytics.google.com>
- User behaviour tracking (segment agent vs human traffic)

### Plausible Analytics

- Website: <https://plausible.io>
- Privacy-friendly analytics alternative

### Matomo

- Website: <https://matomo.org>
- Open source analytics platform

### Error Monitoring

### Sentry

- Website: <https://sentry.io>
- Error tracking and monitoring

### LogRocket

- Website: <https://logrocket.com>
- Session replay and monitoring

---

## Accessibility Organisations

### W3C Web Accessibility Initiative (WAI)

- Website: <https://www.w3.org/WAI/>

### WebAIM (Web Accessibility in Mind)

- Website: <https://webaim.org>

### The A11Y Project

- Website: <https://www.a11yproject.com>
- Community-driven accessibility resources

### Deque Systems

- Website: <https://www.deque.com>
- Accessibility tools and training

---

## Legal Resources

### Electronic Frontier Foundation (EFF)

- Website: <https://www.eff.org>
- Digital rights and internet law

### Creative Commons

- Website: <https://creativecommons.org>
- Open content licensing

### Copyright Alliance

- Website: <https://copyrightalliance.org>
- Copyright information and advocacy

---

## Related Reading from the Book

See also:

- [Implementation Checklist](implementation-checklist.md) - Step-by-step guide
- [Glossary](Glossary.md) - Terms and definitions (includes OAuth2, JWT, DPoP, PKCE)
- [Agent-Friendly Starter Kit](agent-friendly-starter-kit/) - Good vs Bad implementation examples

---

## Staying Current

### Blogs and News

### A List Apart

- Website: <https://alistapart.com>
- Web design and development articles

### CSS-Tricks

- Website: <https://css-tricks.com>
- Frontend development guides

### Smashing Magazine

- Website: <https://www.smashingmagazine.com>
- Web design and development

### Web.dev

- Website: <https://web.dev>
- Google's web development best practices

### Newsletters

### JavaScript Weekly

- Website: <https://javascriptweekly.com>

### Frontend Focus

- Website: <https://frontendfoc.us>

### Accessibility Weekly

- Website: <https://a11yweekly.com>

---

## Contributing

Found a broken link or have a resource to add? This is a living document intended to stay current as the web and AI agent landscape evolves.

Particularly welcome:

- Updated links for changed URLs
- New tools and frameworks
- Emerging standards and specifications
- Research papers and case studies
- Practical implementation examples

---

## Notes

- **Link validity:** All links verified as of 2025-01-22
- **No affiliate links:** All resources listed on merit only
- **Open standards preferred:** Free, open-source, and standardised resources prioritised
- **Accessibility:** All listed tools and resources chosen with accessibility in mind

---

## Quick Reference by Chapter

### Chapter 1-2 (Introduction, Failure Patterns)

- Accessibility testing tools (WAVE, axe)
- Browser developer tools
- Playwright for testing

### Chapter 3 (Architecture)

- MDN Web Docs
- WCAG guidelines
- Schema.org

### Chapter 4-5 (Business, Content)

- Google Analytics
- Privacy regulations (GDPR, CCPA)
- Content licensing resources

### Chapter 6 (Security)

- OAuth 2.0 specification (RFC 6749, PKCE RFC 7636)
- JWT specification (RFC 7519, JWT Best Practices RFC 8725)
- DPoP specification (RFC 9449)
- WebAuthn/FIDO2
- OWASP guidelines (XSS prevention, SQL injection prevention)
- jose library for JWT operations

### Chapter 7 (Legal)

- GDPR resources
- Copyright information
- EU AI Act

### Chapter 8 (Human Cost)

- Accessibility organisations
- W3C WAI resources
- Inclusive design materials

### Chapter 9-10 (Implementation)

- Schema.org documentation
- JSON-LD tools
- Playwright testing
- [Agent-Friendly Starter Kit](agent-friendly-starter-kit/) - Good vs Bad implementation examples

---

**Last verified:** 2026-01-22
**Next review:** Quarterly (April 2026)
