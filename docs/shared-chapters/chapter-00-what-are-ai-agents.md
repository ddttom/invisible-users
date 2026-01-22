---
author: "Tom Cranstoun"
date: "2026-01-22"
description: "Understanding Machine Experience (MX) as the practice of adding metadata and instructions so AI agents don't have to think, preventing hallucination and enabling agents to complete desired actions"
keywords: [ai-agents, web-accessibility, metadata, semantic-html, machine-experience]
book: "Shared"
chapter: 0
wordcount: 4750
ai-instruction: |
  This is a book manuscript chapter. Write as if it has always existed.
  NEVER include: publication dates, "we added", "new feature", "launching",
  "this update", or any meta-commentary about the book's development.
  Write definitive present tense. Historical context about subject matter
  (industry events, product launches) is allowed.
longdescription: "This introductory chapter traces the journey from observing AI failures to understanding the solution: fixing websites rather than fixing models. Through personal narrative and concrete examples (Danube cruise pricing errors, Ally McBeal legal citations), it introduces the concept of 'invisible users' - AI agents operating on behalf of humans - and establishes the MX-first principle: adding metadata and instructions so AI agents don't have to think, preventing hallucination. The chapter defines Machine Experience (MX) as the practice of providing complete context so agents can complete desired actions (purchase, contact, inform, establish trust) without inference, explains what AI agents actually are through their technical capabilities, describes their 5-stage journey through websites with specific technical requirements at each stage, and demonstrates why explicit structure prevents hallucination and benefits all users as a side effect."
purpose: "This chapter serves as the book's anchor, explaining what AI agents are through the lens of personal discovery and establishing the core principle that designing for AI agents (Machine Experience/MX) creates explicit structure that also benefits accessibility users as a side effect. It provides background context, introduces key concepts, and sets the commercial urgency (January 2026 agent commerce launches) whilst maintaining a conversational, expert-to-peer tone."
---

\newpage

# Chapter 0 - What Are AI Agents?

Understanding the machines reading your website.

## What This Book Is About

This book focuses on **Machine Experience (MX)** - the practice of adding metadata and instructions to internet assets such that AI agents don't have to think. MX is the publication mechanism that ensures context built in Content Operations reaches agents at the delivery point. When we talk about AI agents, we're not discussing sentient software or artificial general intelligence. We're talking about machines - software programs with specific technical capabilities and limitations - that visit your website to complete tasks on behalf of humans.

**The core principle:** When AI has to "think" (generate answers without complete context), it must produce confident answers even when context is missing, leading to hallucination. MX ensures all context is explicitly present in your website's structure, helping everyone - not just "The Invisible Users."

These invisible users are visiting your website right now. People ask ChatGPT about your products, use Copilot to compare your services, and run agents to check your availability. The goal of any web asset is to drive users to action - whether that's purchasing a product, informing readers of a product recall, establishing credibility, completing a contact form, downloading a whitepaper, or registering for an event. When agents successfully complete the full journey and take the desired action, they build trust in your site. When they fail at any stage, they disappear from recommendations and never return.

**MX is not just about ecommerce.** Whilst agent commerce is a significant use case, MX applies to ANY web goal. Without MX, there are fewer AI agent activities completing those actions - regardless of what those actions are.

Whilst MX patterns also benefit users with disabilities through shared reliance on semantic structure, the primary focus of this book is optimizing for machine visitors. The business case is compelling: Adobe's Holiday 2025 data shows AI referrals surged dramatically (Retail +700%, Travel +500%), with conversion rates now leading human traffic by 30%. Agent-mediated commerce has moved from experimental to revenue driver in a single quarter.

## The Commercial Urgency

In January 2026, three major platforms launched agent commerce systems within a single week: Amazon Alexa+ (browser agent, 5 January), Microsoft Copilot Checkout (proprietary, 8 January), and Google Universal Commerce Protocol (open standard, 11 January). The timeline compressed dramatically - what industry analysts predicted would take 12-24 months to reach mainstream adoption is now expected within 6-9 months or less.

This isn't a distant future. AI agents are reading your website today, making purchasing decisions today, and recommending your competitors today if your site doesn't meet their technical requirements. First-mover advantage exists - sites that work early become trusted sources that agents return to repeatedly. Sites that fail at any stage of the agent journey disappear from recommendations with no analytics visibility and no recovery opportunity.

## The Journey to This Solution

Over the past two years, I attended CMS Experts conferences in Frankfurt, Florida, and London, where the drumbeat was relentless: "AI, AI, AI." I spent that time cutting through the marketing language about machines "thinking" to grasp the mechanical reality underneath. Following a conversation with Matt Bailey from CMS Critic, I initially considered trying to fix the AI engines themselves. With over a million models on Hugging Face, that approach proved impractical.

Then I had an epiphany, inspired by Steve Krug's famous book "Don't Make Me Think." If I couldn't fix the models, I could fix what they were reading. The solution wasn't to improve a million AI systems - it was to improve the websites those systems access. This became the foundation for Machine Experience (MX).

## The Problem Emerges

These failures matter commercially. Adobe's Holiday 2025 data reveals the scale of transformation underway: AI referrals surged dramatically (Retail +700%, Travel +500%), whilst conversion rates flipped from AI referrals lagging behind human traffic to leading by 30%. AI-referred users spend 50% longer on sites and view more pages than direct visitors. The technology has moved from experimental to revenue driver in a single quarter.

When researching Danube river cruises from Germany to Croatia in late 2024, I asked Claude for Chrome to find options. One result quoted a price of £203,000 for a one-week cruise. The AI lacked guardrails to recognise this obviously incorrect figure. The problem was European currency formatting - which uses commas and dots differently from British conventions - had been misinterpreted, throwing the price off by a factor of 100. The actual price was £2,030.

This error reveals a complete failure of validation: decimal separator confusion (€2.030,00 vs £2,030), no range validation (£203,000 exceeds £15,000 maximum cruise prices), no comparative checks (58 times higher than peer cruises), no cross-referencing against structured data, no confidence scoring, AI reformatting that masked the problem, and the error presented with the same confidence as verified data. Had an autonomous agent auto-booked this cruise, the financial consequences would have been severe. The metadata on pricing hadn't specified currency correctly, and the AI couldn't sort or reason about prices sensibly.

This wasn't an isolated incident. Lawyers have been caught citing fictional cases in court because AI agents confused Ally McBeal television scripts with legal precedents. Court opinions should use Schema.org Article type with `genre="Judicial Opinion"` and `articleSection="Case Law"`, whilst TV shows should use TVEpisode type with `genre="Legal Drama"` and `partOfSeries` markup. Without this Schema.org differentiation - particularly when fan sites publish TV transcripts without proper `@type` markup - content appears identical to AI agents. They cannot distinguish fiction from fact, fabricating details that seem plausible but are dangerously incorrect.

Consider another scenario: a user signs into their banking app, completing all the authentication steps - mouse movements, button clicks, browser fingerprinting, IP address verification. Then they hand control to an agent. The bank has no idea it's now being operated by a robot that's potentially sending all this data back to Cupertino or elsewhere. This breaks legal and moral boundaries around personal information and web contracts.

These failures matter commercially. When agents cannot cite you accurately, they recommend competitors instead. When agents cannot compare your pricing, they skip your products. When agents cannot complete checkout, they abandon the cart. First-mover advantage exists - sites that work early become trusted sources that agents return to repeatedly.

## The Invisible Users

Now there's a new class of user - the invisible users. They're called "invisible" for two reasons: they're invisible to site owners (blending into analytics, coming once and leaving) and the interface is invisible to them (they cannot see animations, colour, toast notifications, or loading spinners). These are AI agents visiting your website and performing actions without your awareness.

Most companies don't track AI bot traffic. Some prohibit AI bots entirely through robots.txt directives or block them using services like Cloudflare Identity checks. Modern AI browsers (ChatGPT, BrowserOps, Comet, Strawberry, Neo, DIA) do identify themselves as bots in their User-Agent strings, but these strings cannot be trusted - they're trivially spoofed by any developer.

The MX patterns required for these invisible users - explicit structure, semantic HTML, persistent state - also happen to benefit users with disabilities who rely on screen readers and keyboard navigation. However, this is a side effect of designing for machines, not the design driver. The business case (agent commerce, conversions, revenue) drives the technical requirements.

Some agents operate as browser extensions running alongside human users. Others are Playwright-driven automation frameworks controlled by AI scripts. Some are AI browsers accessing sites directly. Site owners can no longer reliably distinguish between human visitors and AI agents. The traffic looks identical in analytics, but the visitor's capabilities and limitations differ fundamentally.

People are building agents that monitor Slack channels for commands, then execute web actions autonomously and report back. These capabilities are expanding rapidly. In January 2026, three major platforms launched agent commerce systems within a single week: Amazon Alexa+ (browser agent launch, 5 January), Microsoft Copilot Checkout (proprietary, 8 January), and Google Universal Commerce Protocol (open standard, 11 January). The timeline compressed dramatically - what industry analysts predicted would take 12-24 months to reach mainstream adoption is now expected within 6-9 months or less. Agent-mediated commerce has moved from experiment to infrastructure.

The shift from passive assistant to active agent is now complete. Anthropic's Claude Cowork, launched in January 2026, represents the first truly autonomous digital colleague - managing local file systems, orchestrating complex project workflows, and executing multi-step tasks without constant human prompting. Built on a multi-agent architecture where Claude 4 Opus acts as lead planner whilst Claude 4.5 Sonnet models handle parallel sub-tasks, the system operates as a coworker rather than a tool. Remarkably, the entire feature was built in approximately a week and a half using Claude Code itself. This is the agentic era: machines reading websites, comparing options, making recommendations, and completing purchases on behalf of humans.[^cowork]

These agents struggle with patterns that also confuse users with disabilities. They're blind to visual cues like flashes of information. They struggle to differentiate between European, American, and British monetary formats. They don't understand what spinners mean. When faced with five "Read More" buttons on a page, they can't easily determine which relates to which content. They process form validation errors differently from humans - whilst humans iteratively fix issues one by one, AIs may simply abandon difficult websites.

## MX Requirements and Technical Limitations

AI agents have specific technical constraints that require explicit structure. Unlike humans who can persist through ambiguity, interpret context, and work around problems, agents need zero-tolerance parsing with no room for inference.

**Machine Requirements Drive the Design:**

**Server-Side Processing:** Agents like ChatGPT cannot "see" CSS or visual layout. They rely entirely on HTML structure and text content. They need semantic markup (`<button>`, `<nav>`, `<main>`) because visual cues are invisible.

**Zero-Tolerance Parsing:** Agents cannot guess button purpose from appearance. They need explicit semantics (`<button>` not `<div class="btn">`) because they parse structure, not design intent.

**Limited Context Windows:** Local agents running on users' devices have token budget constraints. They need concise, structured information with clear hierarchy because they cannot process excessive content.

**No Persistence:** Toast notifications vanish before agents can read them. Dynamic updates may complete before agents process them. They need persistent feedback (`role="alert"`, DOM-reflected state) because they cannot retry or ask for help.

**State Visibility:** Agents need state reflected in HTML attributes (`data-state`, `aria-invalid`), not buried in JavaScript variables they cannot access. Visual-only feedback (spinners, colour changes) is invisible to most agent types.

These MX requirements create explicit, machine-readable structure. As a beneficial side effect, this same structure helps users with disabilities who rely on screen readers and keyboard navigation - both groups need semantic HTML because both lack access to visual design cues. However, the tolerance differs fundamentally: accessibility users persist through poor implementations, ask for help, and find workarounds. Agents simply fail silently and disappear from recommendations.

**Key MX Patterns That Also Benefit Accessibility:**

**Semantic HTML:** Agents parse `<button>` as clickable element with explicit semantics. Screen readers announce it as "button". Both understand purpose immediately, but agents require it for baseline functionality whilst accessibility users can sometimes work around `<div>` buttons with effort.

**Structured Data (Schema.org):** Agents extract pricing, product details, and availability from JSON-LD for autonomous decision-making. Voice assistants read the same structured data for blind users. Both need machine-readable information, but agents fail completely without it whilst humans can call customer service.

**Explicit State:** Agents need `data-state` attributes in DOM to track checkout progress. Keyboard users need visible focus indicators. Both need state reflected in HTML, but agents have no fallback when state is visual-only.

The MX-first principle is clear: design for machines with zero-tolerance requirements, and you automatically create structure that benefits accessibility users as a side effect. One implementation serves multiple audiences, but the business case - agent commerce, conversions, revenue - drives the technical requirements.

## The Solution - Fix the Source, Not the Model

You cannot fix the million-plus models on Hugging Face, but you can fix the source - the internet itself, or at least your corner of it. **Machine Experience (MX) is the practice of adding metadata and instructions to your web assets so AI agents don't have to think.** When agents must "think" (infer meaning from incomplete context), they hallucinate. When all context is explicitly present, they extract accurate information.

As the Ally McBeal example demonstrates, without proper metadata, an AI cannot distinguish between a television script and a legal document - it must guess based on statistical patterns, producing confident but incorrect answers. Proper microdata and metadata prevent these errors by providing complete context. However, retrofitting the entire internet isn't feasible. The real value lies in going forward - properly structured pages help with live web search, improving goal completion (sales, contact forms, information retrieval) that might otherwise be missed.

This isn't a new concept. RDF (Resource Description Framework) was proposed many years ago, but nobody listened. Now there's a commercial imperative driving adoption through Machine Experience requirements: when agents can't complete your desired action (purchase, contact, inform), they move to competitors who provide explicit structure.

One concern with current practices: the trend of converting web pages to markdown before sending them to AI agents. This process strips all metadata - pricing information, geographical context, document type indicators. It's dangerous. Metadata preservation in agent-readable formats is essential for accurate information extraction and preventing hallucination.

The MX patterns required for agents serve multiple audiences:

- Use semantic HTML (`<main>`, `<nav>`, `<article>`, `<button>`)
- Provide structured data (Schema.org JSON-LD)
- Make state explicit (`data-state`, `aria-invalid`, `role="alert"`)
- Use clear heading hierarchy (h1 → h2 → h3)
- Add text alternatives (alt text, aria-label)

One MX implementation serves three audiences:

1. AI agents (ChatGPT, Copilot, Perplexity) - primary focus
2. Search engines (Google, Bing) - side benefit
3. Users with disabilities (screen readers, keyboard users) - side benefit

### MX in the Content Pipeline

MX is often confused with adjacent disciplines in the content stack. MX is not a Content Management System (where content is created and stored), not a Content Delivery System (infrastructure for serving content), and not an ontology (semantic model of concepts and relationships). **MX is the publication mechanism that makes context get through to the goal of the site.**

Think of the content pipeline: Content Operations builds semantic structure at the construction point, MX ensures that structure survives publication, and Content Delivery serves it to agents. Without MX, well-structured content with rich metadata in the CMS becomes stripped metadata at delivery - agents cannot understand context.

Content Operations is essential for AI at the construction point, ensuring semantic structure is created from the start. But Content Operations alone is not enough. If the publication layer (MX) doesn't preserve and expose this structure, agents at the delivery point never see it. MX is the critical bridge - what you build in Content Operations reaches agents only if MX preserves it during publication.

In content delivery systems and CMS environments, an ontology is a semantic model that defines concepts and their relationships so content can be understood, linked, filtered, and delivered in a more intelligent and context-aware way. Ontologies differ from traditional CMS metadata (flat tags and categories) by modeling concepts with many-to-many relationships designed for machines to reason over. Ontology defines the semantic model at the construction point. MX ensures the semantic model reaches agents at the publication point. Without MX, beautiful ontology in the CMS is lost in publication - agents cannot use it.

## UX/MX - A New Discipline

Just as we have UX (User Experience), we need MX (Machine Experience). The key insight is that organisations should design for both humans and machines simultaneously with the same content - not create separate experiences.

Adobe recently released an "LLMoptimizer" tool that detects whether a page is being browsed by an LLM or a human, then serves different versions accordingly. This is not the ideal approach. If you can make content better for LLMs, you'll make it better for disabled people and for everyone else. The solution isn't to serve different content but to fix the underlying web page.

### MX Requires Dedicated Roles

Just as quality needs dedicated QA engineers, Machine Experience needs dedicated roles. Organisational psychology research demonstrates a consistent principle: when responsibility is shared across everyone, accountability evaporates. This phenomenon, known as diffusion of responsibility, shows that as group size increases, individual accountability decreases. Studies document this pattern clearly: 85% of individuals respond to emergencies when alone, but only 31% respond when four other people are present.[^responsibility]

The workplace manifestation is predictable. When "quality is everyone's responsibility," organisations may proclaim quality as a shared value but assign no one specific accountability for maintaining standards. When "everyone's responsible," accountability vanishes. Research across DevOps implementations confirms this pattern: whilst successful DevOps cultures spread quality awareness throughout teams, they simultaneously maintain dedicated QA engineers who focus specifically on defining quality standards, designing validation frameworks, and preventing defects before production deployment.[^devops-qa]

MX follows the same organisational pattern. Whilst everyone should understand MX principles - just as everyone should understand security principles or accessibility guidelines - accountability must rest with specific roles. Without designated MX ownership, organisations default to reactive fixes rather than proactive design.

Consider the alternative: in companies where accessibility is "everyone's responsibility" without dedicated specialists, accessibility often becomes nobody's priority until legal pressure forces attention. The 5% user base doesn't generate enough urgency. Similarly, if MX becomes "everyone's job," it will vanish under pressure from visible users until AI-mediated commerce failures create business impact.

Successful organisations structure MX accountability clearly:

**Dedicated MX Specialists:** These roles focus specifically on defining agent-readability standards, auditing implementations, and preventing agent failures before deployment. They work alongside UX designers, frontend developers, and accessibility specialists, bringing specific expertise in semantic structure, metadata schemas, and agent behaviour patterns.

**Distributed MX Awareness:** Frontend developers, content creators, and UX designers understand MX principles as part of their core competencies - just as they understand responsive design or browser compatibility. They implement MX patterns in daily work but rely on specialists for complex decisions and validation.

**Executive Accountability:** Senior leadership assigns clear ownership for MX outcomes, provides resources for specialist roles, and tracks MX metrics alongside traditional performance indicators. Without executive commitment, MX specialists lack authority to influence architectural decisions.[^organizational]

The convergence between MX and accessibility creates practical advantages: organisations can expand existing accessibility roles rather than create entirely new teams. The technical patterns overlap substantially - both disciplines require semantic structure, explicit state, persistent feedback, and clear hierarchy. A senior accessibility specialist who understands semantic HTML already possesses foundational MX knowledge. Adding Schema.org expertise, agent behaviour patterns, and metadata validation to their skill set creates an MX specialist without requiring separate headcount.

This approach works because the technical patterns overlap substantially. Both disciplines require semantic structure, explicit state, persistent feedback, and clear hierarchy. The difference lies in application: accessibility focuses on user outcomes (can screen reader users navigate?), whilst MX focuses on machine outcomes (can agents extract pricing accurately?).

The commercial urgency makes dedicated roles essential. Google, Microsoft, and Amazon launched agent-powered purchasing features in January 2026. First-mover advantage exists - sites that work early become trusted sources that agents return to repeatedly. Organisations treating MX as "everyone's responsibility" will fall behind competitors who assign clear accountability.

I've developed an analyser that does for LLMs what tools like Screaming Frog does for SEO. It checks whether websites implement best practices for AI consumption:

- Are elements in the right order?
- Are there toast notifications or screen changes that LLMs won't understand?
- Are there patterns that would confuse disabled users?
- and many more

The tool audits websites, provides management reports with actionable information, and tracks progress over time, alerting organisations to any regressions.

## What AI Agents Actually Are

When we talk about AI agents reading websites, we're not talking about artificial general intelligence or sentient software. We're talking about machines - software programs with specific technical capabilities and limitations - that process your website's content on behalf of human users.

These machines operate through statistical pattern-matching - next-token prediction using probability distributions calculated from training data. When agents process your website, they're performing weighted averaging and probability calculations, not "understanding" content the way humans do. They guess the next most likely word based on patterns they've seen before.

This statistical foundation explains both their capabilities and their failures:

**Why agents hallucinate:** When agents encounter incomplete context, they must "think" - generating confident answers by guessing based on statistical co-occurrence patterns. Without clear structured data (Schema.org, semantic HTML) providing complete context, they fabricate details that seem plausible but are incorrect - the same errors that produce 0% correctness on mathematical reasoning tasks despite fluent explanations. **MX is the act of adding metadata and instructions so AI doesn't have to think.** When all context is explicitly present, hallucination decreases dramatically.

**Why linguistic bias matters:** Current AI systems tokenize English more efficiently than compound languages (German, Dutch). This bias begins at the training data level: approximately 44% of Common Crawl (the public dataset powering most large language models) is English content, with no other language exceeding 6% representation. A German user must type "ultrathink" to get more processing power from the system - a word that isn't even proper English but uses German-style compounding. The irony is complete: using a fake English word that mimics German grammar to command machines that don't actually think. This linguistic inequity affects how agents process multilingual websites, giving English-language content structural advantages.

**Why explicit structure matters:** Agents convert your HTML into mathematical representations through weighted averaging of co-occurrence patterns. `<div class="button">` and `<button>` appear similar to humans but create different statistical signatures. Semantic HTML produces distinct patterns that agents process reliably, whilst visual-only distinctions disappear in the averaging process.[^ai-internals]

Calling them "machines" instead of "AI assistants" or "intelligent agents" counters dangerous anthropomorphisation. AI researchers deliberately anthropomorphise their creations - calling them "assistants," "intelligent," or claiming they "understand" - building artificial confidence in users. When users believe agents "understand" context or can "infer" meaning, they trust these systems beyond their actual capabilities.

I want to be clear about my stance on AI: I'm not complaining about these systems or highlighting edge cases like "How many R's in strawberry?" or users generating obvious junk. I genuinely praise AI for its remarkable ability to generate coherent text that people understand. The technology has achieved something extraordinary - statistical pattern-matching that produces human-readable responses across countless domains. My focus isn't on what's wrong with AI, but on what we can do to make it work better. When creators craft proper inputs (semantic HTML, structured metadata), provide quality training data, enable effective live searches, and implement appropriate guardrails, we get dramatically better results. Hallucinations decrease. Accuracy increases. Commerce transactions complete successfully. The solution isn't to criticize AI systems - it's to recognize that better-structured inputs produce better outputs for everyone: users, agents, and businesses alike.

AI agents come in five forms, each with different capabilities:

**Server-Side Agents (OpenAI ChatGPT, Anthropic Claude)** run on remote servers and process websites as raw text. They fetch HTML from URLs and parse text content and HTML structure, but cannot execute JavaScript or render CSS. They see raw HTML source code, text content, semantic structure, metadata, and link relationships. They miss JavaScript-rendered content, dynamic updates, toast notifications, visual hierarchy from CSS, and client-side state changes. Like a blind user with a basic screen reader that cannot execute JavaScript, they need semantic HTML and server-side rendering.

**In-Browser Agents (Microsoft Copilot, Browser Extensions)** run within web browsers and have full access to rendered pages. They can execute JavaScript, render CSS, access the DOM after JavaScript runs, interact with forms and buttons, and wait for dynamic updates. They see rendered HTML, dynamic content updates, client-side state changes, and interactive elements. They miss visual hierarchy from CSS, animations timing, and implicit states not reflected in DOM. Like a screen reader user with full JavaScript support but no visual perception, they need explicit state attributes and persistent feedback.

**Browser Automation Agents (Perplexity, Playwright-based Agents)** control full browsers programmatically and can take screenshots. They have everything in-browser agents can do, plus screenshot capability for computer vision, network request interception, performance monitoring, and multi-step interactions. They see everything in-browser agents see, plus visual layout, colour and size relationships, and rendered charts and graphics. They miss nuanced visual design intent, brand meaning, emotional resonance, and cultural context. Like a sighted user with motor impairments who must use keyboard navigation, they can see everything but need semantic structure for efficient interaction.

**Local Agents (Ollama, On-Device LLMs)** run on users' personal computers with limited resources. Similar to server-side agents, they use smaller models with limited context windows but offer faster response times and privacy-preserving operation. They see raw HTML but are limited to most important content due to token budget constraints. They miss everything server-side agents miss, plus may miss content due to smaller context windows. Like a user with cognitive disabilities who needs simple, clear structure, they cannot process excessive information.

**Agentic Operating Systems (Anthropic Cowork)** orchestrate multiple agents in unified environments. These systems act as lead planners, distributing sub-tasks to specialized agents that run in parallel. They combine capabilities of other agent types - managing local file systems, executing browser automation, processing server-side content - whilst coordinating complex multi-step workflows. They see aggregated information from multiple agent types simultaneously but need semantic structure across all interaction points. Like a project manager coordinating a team with diverse abilities, they need consistent patterns that work reliably for all their constituent agents.

## The 5-Stage MX Journey

Your website has machine readers right now. People are asking ChatGPT about your products, using Copilot to compare your services, and running agents to check your availability. When agents successfully complete this journey, they build computational trust in your site. When they fail at any stage, they disappear from recommendations and never return.

When AI agents interact with your website, they follow a predictable 5-stage journey with specific technical requirements at each stage:

### Stage 1: Discovery (Training)

**Agent State:** Not in knowledge base, doesn't know you exist

**MX Requirements:** Crawlable structure (robots.txt compliance, sitemap.xml), semantic HTML markup for training data, server-side rendering for JavaScript-heavy content, quality content that search engines can discover and rank

**Side Benefits:** Improves SEO (organic search traffic), improves WCAG (semantic structure)

**Failure Mode:** Agent recommends competitors, never mentions you - you don't exist in their knowledge base

*Note: We implement MX patterns for agent discovery. SEO improvement is an automatic outcome, not a separate task.*

### Stage 2: Citation (Recommendation)

**Agent State:** Aware of your site, can recommend it

**MX Requirements:** Fact-level clarity (each statistic, definition, concept needs standalone clarity), structured data (Schema.org JSON-LD) for AI platforms, citation-worthy content architecture optimized for being featured in AI responses, not just found

**Side Benefits:** Improves GEO (Generative Engine Optimization - citations in AI-generated responses), improves SEO (rich snippets), improves WCAG (clear content structure)

**Failure Mode:** Agent knows you exist but can't confidently recommend you - hallucinate details or skip your site entirely

*Note: We implement MX patterns for agent citations. GEO improvement is an automatic outcome, not a separate task.*

### Stage 3: Search and Compare

**Agent State:** Building comparison lists, sorting by features, evaluating options

**MX Requirements:** JSON-LD microdata at the pricing level, explicit comparison attributes (product features, specifications), semantic HTML that agents can parse for feature extraction

**Side Benefits:** Improves GEO (AI comparisons), improves SEO (structured data), improves WCAG (clear data presentation)

**Failure Mode:** Agent cannot understand what you offer or how you compare - skips you in comparisons

*Note: We implement MX patterns for agent comparison tasks. Structured data benefits multiple disciplines automatically.*

### Stage 4: Price Understanding

**Agent State:** Need exact pricing to make recommendations

**MX Requirements:** Schema.org types (Product, Offer, PriceSpecification), unambiguous pricing structure with currency specification (ISO 4217 codes), validation to prevent decimal formatting errors, clear price markup that prevents magnitude misinterpretation

**Side Benefits:** Improves SEO (product rich results), improves GEO (pricing citations), improves WCAG (clear pricing)

**Failure Mode:** Agents misunderstand costs by orders of magnitude - £2,030 becomes £203,000 (100x multiplication error from European decimal formatting in the Danube cruise example)

*Note: We implement MX patterns for agent price parsing. Schema.org benefits multiple disciplines automatically.*

### Stage 5: Purchase Confidence

**Agent State:** Can they complete checkout with confidence?

**MX Requirements:** No hidden state buried in JavaScript (state must be DOM-reflected), explicit form semantics (`<button>` not `<div class="btn">`), persistent feedback (role="alert" for important messages), data-state attributes for checkout progress tracking, UCP (Universal Commerce Protocol) support for standardized commerce interactions

**Side Benefits:** Improves WCAG (form accessibility), improves user experience (faster checkouts for humans too)

**Failure Mode:** Entire commerce chain breaks - agent cannot see what buttons do, cannot track checkout progress, times out and abandons cart

*Note: We implement MX patterns for agent checkout completion. Accessibility and UX improvements are automatic outcomes.*

### Catastrophic Failure Principle

**Miss any stage and the entire commerce chain breaks.** Discovery requires semantic HTML. Citation requires structured data. Comparison requires JSON-LD. Price understanding requires Schema.org. Confidence requires explicit state. At every stage, your website's structure determines success or failure.

Sites that successfully complete the full journey gain computational trust - agents return for more purchases through learned behaviour. Sites that fail at any stage disappear from the agent's map permanently. Unlike humans who persist through bad UX and can be won back with improvements, agents provide no analytics visibility and offer no second chance.

## The "AI Will Figure It Out" Fallacy

**The common objection:** "AI is getting better all the time, why worry? It will work itself out."

**The critical flaw in this argument:** Yes, AI models are improving - but they're also multiplying at an accelerating rate. The diversity problem is getting worse, not better.

### The Unknown Agent Problem

Site owners have no idea which model is visiting their site. Is it a small LLM running on a mobile device (SMOL, edge models with 100-500M parameters)? Is it a frontier model (Claude Opus 4.5, GPT-4, Gemini Ultra)? Is it an in-browser extension with a local LLM prioritizing privacy? Is it a custom-trained domain-specific agent?

You cannot detect agent capabilities reliably. User-Agent strings are trivially spoofed. No standardized capability announcement exists. You cannot serve different HTML based on agent sophistication because you don't know which agent is parsing your content.

### The Diversity Explosion

Over 1 million models on Hugging Face (2026) with wildly different capabilities:

**Size distribution shows extreme diversity:**

- 92.48% have fewer than 1 billion parameters
- 86.33% have fewer than 500 million parameters
- 69.83% have fewer than 200 million parameters
- **40.17% have fewer than 100 million parameters**

**Growth trajectory:** The platform added 1 million models in just 335 days (late 2024-2025), compared to 1,000+ days for the first million. The wild west is getting wilder.

### Why "Waiting for AI to Improve" Fails

**Problem 1 - No standardization:** No central authority controls agent capabilities. No way to demand parsing standards when no imperative exists. Everyone does what they want, giving lip service to standards without enforcement.

**Problem 2 - The diversity paradox:** Large frontier models are getting better at handling ambiguity. BUT small models (7B, 13B parameters) deployed on edge devices cannot handle the same complexity. AND you don't know which model is visiting your site. Result: Optimizing for "average" AI means failing for 40%+ of agents.

**Problem 3 - Local and edge deployment:** Browser extensions with local LLMs (privacy-focused users), mobile agents with smaller models (resource constraints), and custom domain-specific models (specialized capabilities) will never have the computational power of frontier models. These agents are proliferating, not disappearing.

### The Only Solution: Design for the Worst Agent

Explicit structure and unambiguous MX patterns make you compatible with the worst agents, therefore compatible with all:

- Small 100M parameter model can parse Schema.org → Large models can too
- Local edge LLM can read semantic HTML → Cloud models can too
- Simple browser extension can understand explicit state → Sophisticated agents can too

**This isn't "dumbing down" - it's universal compatibility.**

The alternative (hoping AI improves) leaves you incompatible with 40%+ of agents visiting your site right now. Design for the worst agent = compatible with all agents.

## What This Book Offers

This book examines the collision between modern web design and machine readers. It explores:

- Why websites fail for agents (and the consequences for ANY web goal)
- How to add metadata and instructions so AI doesn't have to think
- What MX patterns prevent hallucination and enable goal completion
- How to implement these patterns practically across platforms
- Why explicit structure benefits multiple audiences as a side effect
- What's coming next in agent-mediated activities (commerce, information retrieval, lead generation, and more)

**MX applies to every web goal:** Whether you're selling products, informing readers about product recalls, establishing credibility, collecting contact information, or enabling downloads, agents need explicit structure to complete those actions. When agents hallucinate or fail to extract accurate information, they move to competitors with better MX implementation.

It's January 2026. Google, Microsoft, and Amazon have all announced agent-powered purchasing features launching this quarter. This isn't a distant future - it's happening now.

## The Three-Book MX Ecosystem

This comprehensive guide (The MX Bible) is part of a three-book ecosystem, each serving different audiences and needs:

**"Don't Make the AI Think"** (~150-200 pages) - An accessible introduction for everyone: UX designers, product managers, marketers, and executives. Written as a homage to Steve Krug's "Don't Make Me Think," it explains why AI agents hallucinate when websites lack clear, structured information. If you're new to Machine Experience or need to convince stakeholders, start here.

**"The MX Handbook"** (~300-400 pages) - A practical implementation guide for developers, UX designers, and content strategists. It bridges the accessible Krug-style introduction and this comprehensive reference, offering step-by-step platform-specific implementations, content strategies, testing approaches, and patterns across major CMS platforms.

**"The MX Bible" (this book)** (~800 pages) - The definitive technical reference for architects, consultants, and serious practitioners who need complete coverage of Machine Experience. This is the book for those implementing MX at scale or establishing organizational practices.

All three books share continuously updated appendices hosted at allabout.network, including learning materials for AI, properly structured example code, and evolving case studies. Whilst the books themselves maintain stable content, the living appendices track developments in this rapidly evolving field.

The three-book strategy serves readers at different stages: executives who need quick understanding, practitioners seeking immediate implementation guidance, and architects requiring comprehensive technical depth. Each book cross-references the others, creating an ecosystem where readers can move between detail levels as their needs evolve.

Chapter 1 begins with the patterns that break agents and humans alike. We start with real examples of AI agents failing on well-designed websites - and discover these failures have been happening to human users for years.

**Real-world impact:** Adobe Experience Manager's Generate Variations feature demonstrates this principle in practice. Design work that previously required 75 days was completed in 5 days, with human creators maintaining control over messaging and brand alignment whilst AI handled repetitive pattern generation. The result: 60+ variations achieving 30% higher click-through rates than manually created alternatives. The system worked because it followed agent-friendly patterns - semantic structure, explicit state, and machine-readable metadata - allowing AI to generate variations whilst humans retained strategic oversight.

Let's call AI agents what they are: machines with technical constraints that parallel human disabilities. Once we understand their capabilities, we can design websites that work for everyone.

## Broader Context

Whilst I've been doing this work, I've had Claude create blog posts and HTML web pages. I really do not need a CMS anymore. For Adobe and their Franklin/Edge Delivery Services world, the future is clear: the Content Hub becomes a data lake, and AI agents simply consume from that data lake.

Matt Bailey from CMS Critic acknowledged this trajectory in our recent conversation. Large enterprises will likely maintain systems for compliance, governance, and regulatory requirements in the near term, but downstream the CMS as we know it will transform fundamentally. The question becomes: is the CMS the tool, or is it the process?

I praised Pantheon's approach of not requiring content creation inside the CMS. People use elegant, easy tools for content creation and publish directly from those tools. This raises the fundamental question about what content management systems actually are in an age where AI agents can generate and structure content on demand.

## Implementation Support

If you need help implementing these patterns in your organisation, I provide professional services that demonstrate the approaches discussed throughout this book.

The Web Audit Suite offers professional website analysis for agent-readiness, identifying patterns that block AI agents and users with disabilities whilst providing priority-based recommendations. Implementation consulting helps teams apply the patterns discussed in this book to their specific platforms and architectures, whether you're working with custom applications, CMS platforms, or static site generators.

These services apply the book's patterns in practical client work. The same principles that improve discoverability by AI agents also improve search engine rankings and accessibility compliance - one implementation serves multiple audiences. For more information, contact <tom.cranstoun@gmail.com> or visit <https://allabout.network>.

---

[^ai-internals]: For deeper exploration of AI statistical foundations and linguistic bias, see my blog posts: [The Stripped-Down Truth: How AI Actually Works Without the Fancy Talk](https://allabout.network/blogs/ddt/ai/the-stripped-down-truth-how-ai-actually-works-without-the-fancy-talk), [Does AI Mean Algorithmic Interpolation?](https://allabout.network/blogs/ddt/ai/does-ai-mean-algorithmic-interpolation), [The Digital Language Caste System](https://allabout.network/blogs/ddt/ai/the-digital-language-caste-system), [The Mathematical Heartbeat of AI](https://allabout.network/blogs/ddt/ai/the-mathematical-heartbeat-of-ai), [The Tokenization Trap: How AI Actually Processes German](https://allabout.network/blogs/ddt/ai/the-tokenization-trap-how-ai-actually-processes-german), [The "No Elephants" Problem: Why AI Struggles With What NOT to Do](https://allabout.network/blogs/ddt/ai/the-no-elephants-problem-why-ai-struggles-with-what-not-to-do), [When a Five-Year-Old Beats an AI at Its Own Game](https://allabout.network/blogs/ddt/ai/when-a-five-year-old-beats-an-ai-at-its-own-game), and [A Framework for Evaluating AI Confidence](https://allabout.network/blogs/ddt/ai/a-framework-for-evaluating-ai-confidence).

[^responsibility]: Diffusion of responsibility research demonstrates predictable patterns: individual action rates drop from 85% (alone) to 62% (one other person) to 31% (four others). See [Bystander Effect In Psychology](https://www.simplypsychology.org/bystander-effect.html) and [Diffusion of Responsibility - The Decision Lab](https://thedecisionlab.com/reference-guide/psychology/diffusion-of-responsibility) for comprehensive reviews of the phenomenon and its workplace applications.

[^devops-qa]: DevOps implementations demonstrate the balance between shared responsibility and specialized roles. Whilst everyone takes responsibility for quality, dedicated QA engineers focus on defining standards, designing test frameworks, and preventing bugs. See [DevOps Model: The Role of QA Redefined](https://www.qamadness.com/devops-and-the-role-of-qa/) and [Common DevOps Roles and Responsibilities Today](https://www.splunk.com/en_us/blog/learn/devops-roles-responsibilities.html) for role structure analysis.

[^organizational]: Research shows 82% of respondents have limited ability to hold others accountable, and only 14% of employees feel their performance is managed in ways that inspire responsibility. Clear ownership structures address this gap. See [Accountability in Organizational Design](https://www.forrestadvisors.com/insights/organizational-design/accountability-organizational-design-fostering-responsibility/) and [Responsibility, Accountability, and Ownership](https://medium.com/@csw11235/responsibility-accountability-and-ownership-da054169fcce) for frameworks implementing effective accountability.

[^cowork]: Anthropic launched Claude Cowork on 12 January 2026, marking a fundamental shift from chatbot to autonomous digital colleague. The system manages local file systems, orchestrates workflows, and executes complex tasks through multi-agent architecture. Initially available to Max subscribers, it expanded to Pro tier subscribers ($20/month) shortly after launch. See [Anthropic launches Cowork, a Claude Desktop agent that works in your files](https://venturebeat.com/technology/anthropic-launches-cowork-a-claude-desktop-agent-that-works-in-your-files-no), [Anthropic Unveils 'Claude Cowork': The First Truly Autonomous Digital Colleague](https://markets.financialcontent.com/stocks/article/tokenring-2026-1-19-anthropic-unveils-claude-cowork-the-first-truly-autonomous-digital-colleague), and [Anthropic's new Cowork tool offers Claude Code without the code](https://techcrunch.com/2026/01/12/anthropics-new-cowork-tool-offers-claude-code-without-the-code/) for comprehensive coverage of capabilities and architecture.
