---
author: "Tom Cranstoun"
date: "2026-01-22"
description: "Review of the January 21, 2026 Boye & Co member call exploring how AI agents and accessibility converge in modern web design"
keywords: [ai-agents, web-accessibility, boye-co, machine-experience, semantic-html, convergence-principle]
type: "conference-reflection"
event: "Boye & Co Member Call"
event_date: "2026-01-21"
audience: "Business leaders, UX designers, accessibility specialists"
ai-instruction: |
  This is a blog post reflecting on a past event. Write as if the event has already occurred.
  Use past tense for the presentation and discussion. Historical context about the subject matter
  (industry events, technical patterns) uses present tense when discussing ongoing principles.
---

# Websites That Work Perfectly - Until They Don't: Reflections on the Boye & Co Member Call

On January 21, 2026, I presented "MX-Bible: Designing the Web for AI Agents and Everyone Else" to the Boye & Company member community. The 30-minute session, moderated by Janus Boye, explored a critical challenge facing modern websites: how design decisions that rely solely on visual feedback quietly fail for both AI agents and users with disabilities.

## The Convergence Principle Resonated

The discussion revealed something encouraging: the convergence principle - that patterns helping AI agents also benefit accessibility users - struck a chord with technical practitioners. As one participant, David Strachan, observed: "I really like the relationship between agent readability and accessibility. That's quite thought-provoking." Another participant, Shannon Melhave, reinforced this connection throughout the discussion, consistently reminding the group: "not to mention accessibility ;-)"

This wasn't abstract theory. The conversation demonstrated that practitioners across the CMS and digital experience space are encountering these challenges in their daily work. The question isn't whether AI agents are visiting websites - they already are. The question is whether our websites work when they arrive.

## Toast Notifications and Terminology

An early exchange highlighted an important gap: not everyone recognises terminology that developers take for granted. When I mentioned toast notifications as a problematic pattern, Janus Boye asked: "I hadn't heard about toast before... another word for pop-up?" René Zoller provided historical context, linking to Bootstrap's toast documentation from 2018, whilst Markus Schork injected welcome humour: "Heheh Janus, make a Toast with Nano Banana.. It's a whole new world."

This exchange underscored a key point: if experienced digital practitioners don't universally recognise "toast notifications," how can we expect content creators, editors, and business stakeholders to identify and challenge these patterns? The technical debt isn't just in our code - it's in our shared vocabulary.

Daniel Amann raised a practical question: "Do agents read live regions?" - referring to ARIA live regions that announce dynamic content changes to screen readers. The answer reveals the complexity: some agents do (browser-based agents with full DOM access), others don't (server-side agents processing raw HTML). This diversity of agent capabilities requires semantic structure that works across all contexts.

## The Performance Question

Raf Winterpacht posed the challenge that inevitably surfaces in these discussions: "If all of the appropriate HTML is delivered to AI bots according to some of these best practices, do you sacrifice performance?"

Markus Schork provided the technically accurate answer: "You should really not loose any performance (web performance). It is the opposite. Good html structure and not some heavy js stuff should optimise performance."

Salva Morales reinforced this point: "It shouldn't. Semantic HTML is good for browser to build the DOM and therefore, build the page quicker. All of the mentioned are good practices in overall and should benefit performance and technical SEO."

This exchange highlights a persistent misconception: that accessibility, semantic structure, and machine-readability somehow conflict with performance. The reality is precisely the opposite. Server-side rendered semantic HTML loads faster than JavaScript-dependent interfaces. Explicit state attributes eliminate expensive client-side state management. Schema.org markup adds negligible bytes whilst dramatically improving discoverability.

The performance question isn't "Can we afford to make sites agent-friendly?" It's "Can we afford not to?"

## Real-World Implementations

Janus Boye shared relevant industry context: "Daria at Contentful also spoke about AI Experience (AIX) at CMS KickOff." This reference to Contentful's work demonstrates that major CMS platforms are already addressing these challenges. The conversation wasn't theoretical - participants were connecting the presentation's patterns to concrete implementations they're encountering in production systems.

Janus also shared an article about Drupal's approach to Markdown and AI, demonstrating how the CMS community is grappling with content formatting for machine readers. This sparked discussion about the risks of converting web pages to markdown before sending them to AI agents - a practice that strips all metadata, pricing information, geographical context, and document type indicators.

Justin Cook offered practical implementation guidance: "Use Astro, Remix or Next.js on the front-end, use SSG for performance. MCP-ui will allow us to then build and control the experience for 'agentic' interactions beyond a website."

This comment captured a key insight: modern frameworks already support the patterns we need. Server-side generation (SSG), semantic structure, and explicit state aren't new requirements - they're returning best practices that fell out of fashion during the single-page application era.

## The Organisational Challenge

Toni Wovitschek observed: "Websites will be more databases at some point." This crystallises the transformation underway: websites are evolving from visual interfaces designed for human eyes to structured data sources designed for machine parsing. The interface becomes optional; the data becomes essential.

This shift requires organisational change, not just technical fixes. During the presentation, I emphasised that Machine Experience (MX) needs dedicated roles - just as quality needs QA engineers and accessibility needs specialists. When "everyone's responsible," accountability vanishes. This principle, known as diffusion of responsibility, shows that as group size increases, individual accountability decreases.

The discussion didn't focus extensively on this organisational dimension, but the technical questions participants raised revealed the challenge: who audits toast notifications? Who validates that pricing includes proper Schema.org markup? Who ensures that served HTML contains core content before JavaScript decoration? Without clear ownership, these tasks become nobody's priority until AI-mediated commerce failures create business impact.

## The Seven-Day Platform Race

The timing of this discussion proved significant. I mentioned that January 2026 saw three major platforms launch agent commerce systems within a single week:

- **January 5:** Amazon Alexa+ (browser agent launch)
- **January 8:** Microsoft Copilot Checkout (proprietary)
- **January 11:** Google Universal Commerce Protocol (open standard)

The timeline compressed dramatically - what industry analysts predicted would take 12-24 months to reach mainstream adoption is now expected within 6-9 months or less. Agent-mediated commerce has moved from experiment to infrastructure.

This context explains the urgency in the room. First-mover advantage exists - sites that work early become trusted sources that agents return to repeatedly. Organisations treating MX as "everyone's responsibility" will fall behind competitors who assign clear accountability.

## The Token Economics Question

René Zoller raised a concern that deserves more attention: "(But) AI reading is token based, this could be a downside."

This observation touches on a critical technical constraint: AI agents process content through tokenisation, converting text into numerical representations. Semantic HTML and Schema.org markup do add tokens, but they add *meaningful* tokens that reduce hallucination and improve accuracy.

Consider the alternative: an agent encountering `<div class="price">£2,030</div>` must infer that this is a price through pattern-matching and context. But with proper markup:

```json
{
  "@type": "Offer",
  "price": "2030.00",
  "priceCurrency": "GBP"
}
```

The agent *knows* this is a price in British pounds. No inference required. No risk of misinterpreting European decimal formatting (€2.030,00) as £203,000. The additional tokens prevent errors that cost far more than the processing overhead.

The token economics question becomes: What's more expensive - a few extra tokens of structured data, or a 100x price error that destroys user trust?

## Practical Next Steps

Janus announced: "This next week will be a follow up to this conversation" with a link to an upcoming Boye & Co event about knowing your AI agents. This follow-up approach makes sense: the presentation raised questions that require ongoing exploration.

Participants also shared resources for deeper investigation. Janus linked to the W3C's accessibility resources ("if you have some time to waste, here is a rabbit hole"), acknowledging that this topic connects to decades of accessibility work. The patterns we need aren't new - they're patterns the accessibility community has been advocating for years.

## What Participants Took Away

The thank-you messages at the session's close revealed what resonated:

- **Casper van Amelvoort:** "Thank you for this insightful talk!"
- **Nej Gakenyi:** "Thank you @Tom - very useful and insightful"

But the real measure of impact wasn't the polite acknowledgements - it was the substantive technical questions throughout the discussion. Participants asked about ARIA live regions, performance trade-offs, token economics, and framework choices. They shared relevant implementations from Contentful, Drupal, and other platforms. They connected the presentation's patterns to their own work.

Janus Boye reflected: "...2026 already learned so much" - capturing the accelerating pace of change in this space.

## The Convergence Principle in Practice

Throughout the discussion, a single insight kept recurring: what machines need equals what disabled users have needed for many years. This isn't a coincidence - both groups need semantic structure because both lack access to visual design cues.

**Semantic HTML:** Screen readers announce `<button>` as "button". AI agents parse `<button>` as clickable element. Both understand the element's purpose immediately.

**Structured Data:** Voice assistants for blind users read structured pricing. AI agents extract the same metadata for recommendations. Both need explicit, machine-readable information.

**Persistent Feedback:** Screen readers need `role="alert"` for important messages. AI agents need persistent DOM elements to confirm actions. Both miss toast notifications that vanish quickly.

**Explicit State:** Keyboard users need visible focus indicators. AI agents need `data-state` attributes in DOM. Both need state reflected in HTML, not just JavaScript variables.

One solution serves everyone: fix HTML for all audiences together, not separate bot experiences.

## Looking Forward

The Boye & Co member call demonstrated that practitioners across the digital experience space are encountering these challenges in production systems. The questions weren't theoretical ("Will this matter someday?") but practical ("How do we implement this now?").

The commercial imperative is clear. Adobe's Holiday 2025 data showed AI referrals surging dramatically (Retail +700%, Travel +500%), whilst conversion rates flipped from AI referrals lagging behind human traffic to leading by 30%. The technology has moved from experimental to revenue driver in a single quarter.

Sites that adapt early gain first-mover advantage. Sites that wait will find themselves invisible to the agents their customers are using.

The discussion also revealed that this isn't a problem requiring complete interface rebuilds or massive investments. The solution lies in making implicit state explicit through small, well-understood changes: persistent error messages instead of toast notifications, complete pricing with Schema.org markup, semantic HTML that works before JavaScript loads, explicit state attributes that reflect application status.

These patterns improve accessibility for everyone. They enhance SEO. They enable AI agents to cite, recommend, and purchase with confidence. One implementation serves multiple audiences.

## The Book and Beyond

Participants expressed interest in *MX-Bible: Designing the Web for AI Agents and Everyone Else*, scheduled for Q1 2026 release. The book examines the collision between modern web design and machine readers, exploring:

- Why websites fail for agents (and humans with disabilities)
- How agent failures expose accessibility problems
- What patterns work for both audiences
- How to implement these patterns practically
- What's coming next in agent-mediated commerce

The book is part of a two-book ecosystem:

- **"The MX Handbook"** - A practical implementation guide for developers and content strategists
- **"The MX Bible"** - The definitive technical reference for architects and serious practitioners

Both books share continuously updated appendices at allabout.network, tracking developments in this rapidly evolving field.

## Final Reflection

The Boye & Co member call confirmed what the past two years of research suggested: this isn't a future challenge - it's a current business imperative. AI agents are visiting websites now. They're struggling with patterns that also confuse users with disabilities. They're recommending competitors whose sites work better.

The solution isn't to build separate experiences for bots. It's to fix the underlying web pages so they work for everyone: server-side agents, browser-based agents, screen reader users, keyboard users, voice assistant users, and sighted mouse users.

The convergence principle means one solution serves everyone. The commercial urgency means organisations that act early gain lasting advantages. The technical patterns are well-understood and supported by modern frameworks.

The question isn't "Can we do this?" It's "Can we afford not to?"

Thank you to Janus Boye and the Boye & Company community for the thoughtful discussion. The questions raised during the session will inform ongoing work on the book and the Web Audit Suite.

For more information about Machine Experience patterns, visit [allabout.network](https://allabout.network). To discuss implementation challenges in your organisation, contact [tom.cranstoun@gmail.com](mailto:tom.cranstoun@gmail.com).

---

## About the Author

Tom Cranstoun is a consultant at Digital Domain Technologies Ltd with extensive experience in Adobe CMS and AI innovation. His philosophy: "AI should amplify, not replace, human expertise." He focuses on building zero-dependency, agent-friendly web architectures that serve both human and machine readers.

## Further Reading

- [Websites That Work Perfectly - Until They Don't](https://www.boye-co.com/blog/2026/1/websites-work-until-dont) (Original event announcement)
- [MX-Bible project page](https://allabout.network/invisible-users)
- [News updates](https://allabout.network/invisible-users/news.html)
- [LinkedIn profile](https://www.linkedin.com/in/tom-cranstoun/)
