\newpage

# Chapter 0 - What Are AI Agents?

Understanding the machines reading your website.

## The Journey

Over the past two years, I have attended CMS Experts conferences in Frankfurt, Florida, and London, attended webinars/members calls. At each one, the drumbeat was relentless: "AI, AI, AI." Keynotes predicted transformations, presenters showcased AI-powered features, and conversations inevitably turned to how generative AI would change content management. In Frankfurt Several talks provided valuable insights on how AI systems interact with CMS-powered content, highlighting current limitations and offering concrete approaches to help AI better understand structured content—a critical consideration as these technologies become more deeply integrated. In full transparency, I was one of the speakers and I moderated one of the workshops, “Trust in AI”.

I spent those two years trying to understand how AI truly works - cutting through the marketing language about machines "thinking" or "inferring" to grasp the mechanical reality underneath. I published blog posts about language problems, reasoning errors, and hallucinations in AI systems. My most popular LinkedIn post asked a deliberately provocative question about the capital of Paris. It generated significant controversy and accusations of writing "idiot prompts," but it also dramatically increased my readership. The algorithm rewards controversy, and the post demonstrated something important: people's confidence in AI systems often exceeds the systems' actual capabilities.

Following a conversation with Matt Bailey from CMS Critic after the Florida 2025 conference, I initially considered trying to fix the AI LLM engines themselves. With over a million models on Hugging Face, that approach proved impractical. Getting all engines to follow a single set of rules simply wouldn't work. Matt agreed, and encouraged me to continue exploring the problem from a different angle.

Then I had an epiphany, inspired by Steve Krug's famous book "Don't Make Me Think." If I couldn't fix the models, I could fix what they were reading. The solution wasn't to improve a million AI systems - it was to improve the websites those systems access. I started writing "Don't Make the AI Think," and if possible, I hope to convince Steve Krug to become a joint author on the project.

## The Problem Emerges

When researching Danube river cruises from Germany to Croatia in late 2024, I asked Claude for Chrome to find options. One result quoted a price of £203,000 for a one-week cruise. The AI lacked guardrails to recognise this obviously incorrect figure. The problem was European currency formatting - which uses commas and dots differently from British conventions - had been misinterpreted, throwing the price off by a factor of 100. The actual price was £2,030. The metadata on pricing hadn't specified currency correctly, and the AI couldn't sort or reason about prices sensibly.

This wasn't an isolated incident. Lawyers have been caught citing fictional cases in court because AI agents confused Ally McBeal television scripts with legal precedents. Without proper microdata and metadata distinguishing entertainment content from legal documents, agents fabricate details that seem plausible but are dangerously incorrect.

Consider another scenario: a user signs into their banking app, completing all the authentication steps - mouse movements, button clicks, browser fingerprinting, IP address verification. Then they hand control to an agent. The bank has no idea it's now being operated by a robot that's potentially sending all this data back to Cupertino or elsewhere. This breaks legal and moral boundaries around personal information and web contracts.

These failures matter commercially. When agents cannot cite you accurately, they recommend competitors instead. When agents cannot compare your pricing, they skip your products. When agents cannot complete checkout, they abandon the cart. First-mover advantage exists - sites that work early become trusted sources that agents return to repeatedly.

## The Invisible Users

This situation parallels web accessibility in a striking way. For years, the industry has discussed making web pages accessible to disabled users, with laws and documentation supporting this goal. Yet implementation remains poor. Only about 5% of users have disabilities, so organisations pay lip service to compliance, add some alt text, pass a few tests, and declare themselves accessible.

Now there's a new class of user - the invisible users. These are AI agents: AI browsers, OpenAI, Perplexity, browser extensions, Claude for Chrome, Microsoft Copilot, or small LLMs running on local machines. These agents operate websites on behalf of users, and critically, the websites don't know they're interacting with robots rather than humans.

People are building agents that monitor Slack channels for commands, then execute web actions autonomously and report back. These capabilities are expanding rapidly. In January 2026, Google, Microsoft, and Amazon all launched purchasing functionality within days of each other. Agent-mediated commerce has moved from experiment to platform strategy.

These agents struggle with patterns that also confuse users with disabilities. They're blind to visual cues like flashes of information. They struggle to differentiate between European, American, and British monetary formats. They don't understand what spinners mean. When faced with five "Read More" buttons on a page, they can't easily determine which relates to which content. They process form validation errors differently from humans - whilst humans iteratively fix issues one by one, AIs may simply abandon difficult websites.

## The Accessibility Connection

These AI agents literally have technical limitations that parallel human disabilities.

**Blindness:** Server-side agents like ChatGPT cannot "see" CSS or visual layout. They rely entirely on HTML structure and text content. Like blind users, they need semantic markup and text alternatives.

**Motor Impairments:** All agents struggle with complex multi-step interactions. They need clear, explicit paths through interfaces. Like keyboard users, they need proper focus management and semantic buttons.

**Cognitive Load:** Local agents running on users' personal computers have limited context windows. They need concise, structured information. Like users with cognitive disabilities, they need clear hierarchy and simple language.

**Processing Speed:** Toast notifications vanish before agents can read them. Dynamic updates may occur faster than agents can process. Like distracted users, they need persistent feedback.

The patterns that help AI agents are the same patterns that help users with disabilities. This isn't a coincidence - both groups need semantic structure because both lack access to visual design cues.

**Semantic HTML:** Screen readers announce `<button>` as "button". AI agents parse `<button>` as clickable element. Both understand the element's purpose immediately.

**Heading Hierarchy:** Screen reader users navigate by jumping between headings. AI agents parse heading structure to understand document organisation. Both rely on logical h1 → h2 → h3 progression.

**Structured Data (Schema.org):** Voice assistants for blind users read structured pricing. AI agents extract the same metadata for recommendations. Both need explicit, machine-readable information.

**Persistent Feedback:** Screen readers need `role="alert"` for important messages. AI agents need persistent DOM elements to confirm actions. Both miss toast notifications that vanish quickly.

**Explicit State:** Keyboard users need visible focus indicators. AI agents need `data-state` attributes in DOM. Both need state reflected in HTML, not just JavaScript variables.

## The Solution - Fix the Source, Not the Model

You cannot fix the million-plus models on Hugging Face, but you can fix the source - the internet itself, or at least your corner of it. The solution requires enriching HTML with proper metadata so AI agents don't have to guess or invent information.

As the Ally McBeal example demonstrates, without proper metadata, an AI cannot distinguish between a television script and a legal document. Proper microdata and metadata prevent these errors. However, retrofitting the entire internet isn't feasible. The real value lies in going forward - properly structured pages help with live web search, improving sales and conversions that might otherwise be missed.

This isn't a new concept. My colleague Janus Boye wrote about RDF (Resource Description Framework) 27 years ago, but nobody listened. Now there's a commercial imperative driving adoption.

One concern with current practices: the trend of converting web pages to markdown before sending them to AI agents. This process strips all metadata - pricing information, geographical context, document type indicators. It's dangerous. I'm proposing updates to the markdown specification to allow metadata inclusion in a way that's readable for humans but processable by AI.

The patterns we already know from accessibility work serve multiple audiences:

- Use semantic HTML (`<main>`, `<nav>`, `<article>`, `<button>`)
- Provide structured data (Schema.org JSON-LD)
- Make state explicit (`data-state`, `aria-invalid`, `role="alert"`)
- Use clear heading hierarchy (h1 → h2 → h3)
- Add text alternatives (alt text, aria-label)

One implementation serves three audiences:

1. Users with disabilities (screen readers, keyboard users)
2. Search engines (Google, Bing)
3. AI agents (ChatGPT, Copilot, Perplexity)

## UX/MX - A New Discipline

Just as we have UX (User Experience), we need MX (Machine Experience). The key insight is that organisations should design for both humans and machines simultaneously with the same content - not create separate experiences.

Adobe recently released an "LLMoptimizer" tool that detects whether a page is being browsed by an LLM or a human, then serves different versions accordingly. This is not the ideal approach. If you can make content better for LLMs, you'll make it better for disabled people and for everyone else. The solution isn't to serve different content but to fix the underlying web page.

### MX Requires Dedicated Roles

Organisational psychology research demonstrates a consistent principle: when responsibility is shared across everyone, accountability evaporates. This phenomenon, known as diffusion of responsibility, shows that as group size increases, individual accountability decreases. Studies document this pattern clearly: 85% of individuals respond to emergencies when alone, but only 31% respond when four other people are present.[^responsibility]

The workplace manifestation is predictable. When "quality is everyone's responsibility," organisations may proclaim quality as a shared value but assign no one specific accountability for maintaining standards. Research across DevOps implementations confirms this pattern: whilst successful DevOps cultures spread quality awareness throughout teams, they simultaneously maintain dedicated QA engineers who focus specifically on defining quality standards, designing validation frameworks, and preventing defects before production deployment.[^devops-qa]

MX follows the same organisational pattern. Whilst everyone should understand MX principles - just as everyone should understand security principles or accessibility guidelines - accountability must rest with specific roles. Without designated MX ownership, organisations default to reactive fixes rather than proactive design.

Consider the alternative: in companies where accessibility is "everyone's responsibility" without dedicated specialists, accessibility often becomes nobody's priority until legal pressure forces attention. The 5% user base doesn't generate enough urgency. Similarly, if MX becomes "everyone's job," it will vanish under pressure from visible users until AI-mediated commerce failures create business impact.

Successful organisations structure MX accountability clearly:

**Dedicated MX Specialists:** These roles focus specifically on defining agent-readability standards, auditing implementations, and preventing agent failures before deployment. They work alongside UX designers, frontend developers, and accessibility specialists, bringing specific expertise in semantic structure, metadata schemas, and agent behaviour patterns.

**Distributed MX Awareness:** Frontend developers, content creators, and UX designers understand MX principles as part of their core competencies - just as they understand responsive design or browser compatibility. They implement MX patterns in daily work but rely on specialists for complex decisions and validation.

**Executive Accountability:** Senior leadership assigns clear ownership for MX outcomes, provides resources for specialist roles, and tracks MX metrics alongside traditional performance indicators. Without executive commitment, MX specialists lack authority to influence architectural decisions.[^organizational]

The convergence between MX and accessibility creates practical advantages: organisations can expand existing accessibility roles rather than create entirely new teams. A senior accessibility specialist who understands semantic HTML already possesses foundational MX knowledge. Adding Schema.org expertise, agent behaviour patterns, and metadata validation to their skill set creates an MX specialist without requiring separate headcount.

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

**Why agents hallucinate:** When asked about content beyond their training data, they guess based on statistical co-occurrence patterns. Without clear structured data (Schema.org, semantic HTML), they fabricate details that seem plausible but are incorrect - the same errors that produce 0% correctness on mathematical reasoning tasks despite fluent explanations.

**Why linguistic bias matters:** Current AI systems tokenize English more efficiently than compound languages (German, Dutch). This bias begins at the training data level: approximately 44% of Common Crawl (the public dataset powering most large language models) is English content, with no other language exceeding 6% representation. English contractions—where single words combine multiple concepts, like "ultrathink" (ultra + think)—get tokenized as single units, whilst equivalent compound words in German or Dutch fragment into multiple tokens. This means English prompts allocate more processing power per concept, creating functional inequities in how agents process multilingual websites.

**Why explicit structure matters:** Agents convert your HTML into mathematical representations through weighted averaging of co-occurrence patterns. `<div class="button">` and `<button>` appear similar to humans but create different statistical signatures. Semantic HTML produces distinct patterns that agents process reliably, whilst visual-only distinctions disappear in the averaging process.[^ai-internals]

Calling them "machines" instead of "AI assistants" or "intelligent agents" counters dangerous anthropomorphisation. AI researchers deliberately anthropomorphise their creations - calling them "assistants," "intelligent," or claiming they "understand" - building artificial confidence in users. When users believe agents "understand" context or can "infer" meaning, they trust these systems beyond their actual capabilities.

AI agents come in four forms, each with different capabilities:

**Server-Side Agents (OpenAI ChatGPT, Anthropic Claude)** run on remote servers and process websites as raw text. They fetch HTML from URLs and parse text content and HTML structure, but cannot execute JavaScript or render CSS. They see raw HTML source code, text content, semantic structure, metadata, and link relationships. They miss JavaScript-rendered content, dynamic updates, toast notifications, visual hierarchy from CSS, and client-side state changes. Like a blind user with a basic screen reader that cannot execute JavaScript, they need semantic HTML and server-side rendering.

**In-Browser Agents (Microsoft Copilot, Browser Extensions)** run within web browsers and have full access to rendered pages. They can execute JavaScript, render CSS, access the DOM after JavaScript runs, interact with forms and buttons, and wait for dynamic updates. They see rendered HTML, dynamic content updates, client-side state changes, and interactive elements. They miss visual hierarchy from CSS, animations timing, and implicit states not reflected in DOM. Like a screen reader user with full JavaScript support but no visual perception, they need explicit state attributes and persistent feedback.

**Browser Automation Agents (Perplexity, Playwright-based Agents)** control full browsers programmatically and can take screenshots. They have everything in-browser agents can do, plus screenshot capability for computer vision, network request interception, performance monitoring, and multi-step interactions. They see everything in-browser agents see, plus visual layout, colour and size relationships, and rendered charts and graphics. They miss nuanced visual design intent, brand meaning, emotional resonance, and cultural context. Like a sighted user with motor impairments who must use keyboard navigation, they can see everything but need semantic structure for efficient interaction.

**Local Agents (Ollama, On-Device LLMs)** run on users' personal computers with limited resources. Similar to server-side agents, they use smaller models with limited context windows but offer faster response times and privacy-preserving operation. They see raw HTML but are limited to most important content due to token budget constraints. They miss everything server-side agents miss, plus may miss content due to smaller context windows. Like a user with cognitive disabilities who needs simple, clear structure, they cannot process excessive information.

## The Agent Journey

Your website has machine readers right now. People are asking ChatGPT about your products, using Copilot to compare your services, and running agents to check your availability.

When AI agents interact with your website, they follow a predictable journey:

**Stage 1: Discovery (LLM Training)** - Agents read websites during training to build knowledge about products, services, and businesses. If your content is JavaScript-rendered with no semantic markup, it's invisible to this training data. Your business doesn't exist in the agent's knowledge base.

**Stage 2: Citation (Recommendation)** - When users ask agents for recommendations, agents cite sources they trust. Without clear structured data (Schema.org JSON-LD), agents hallucinate details or skip your site entirely. Sites that work early gain first-mover advantage - agents return to sources that provided reliable information before.

**Stage 3: Search and Compare** - Agents build comparison lists, sort by features, and evaluate options. Without semantic HTML and explicit metadata, agents cannot understand what you offer or how you compare to competitors.

**Stage 4: Price Understanding** - Agents need exact pricing to make recommendations. Without clear price markup, agents misunderstand costs by orders of magnitude. The Danube cruise example demonstrates this: a price of £2,030 was read as £203,000 - a 100x multiplication error from European decimal formatting.

**Stage 5: Purchase Confidence** - If agents cannot see what buttons do (`<div class="btn">` vs `<button>`), they cannot complete transactions. If state changes are visual-only (no `data-state` attributes), agents cannot track checkout progress.

At every stage, your website's structure determines success or failure. Discovery requires semantic HTML. Citation requires structured data. Confidence requires explicit state. Miss any stage, and the entire commerce journey breaks down.

## What This Book Offers

This book examines the collision between modern web design and machine readers. It explores:

- Why websites fail for agents (and humans with disabilities)
- How agent failures expose accessibility problems
- What patterns work for both audiences
- How to implement these patterns practically
- What's coming next in agent-mediated commerce

It's January 2026. Google, Microsoft, and Amazon have all announced agent-powered purchasing features launching this quarter. This isn't a distant future - it's happening now.

I've written two books: this comprehensive guide (The Bible of Machine Experience) and a shorter practical guide ("Don't Make AI Think"). Both share appendices that will be made publicly available, including learning materials for AI and properly structured example code.

The publishing plan is to self-publish in Q1 2026, then approach traditional publishers for broader distribution. I've also established a website at allabout.network where appendices will be continuously updated, with news pages and change logs tracking developments. Whilst the books themselves won't change, the living appendices will evolve with the field.

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

---

| metadata |  |
| :---- | :---- |
| title | Chapter 0: What Are AI Agents? |
| author | Tom Cranstoun |
| creation-date | 15/Dec/2024 |
| publication-date | Q1 2026 |
| modified-date | 19/Jan/2026 |
| description | Understanding AI agents as machines with technical capabilities and limitations that parallel human disabilities |
| longdescription | This introductory chapter traces the journey from observing AI failures to understanding the solution: fixing websites rather than fixing models. Through personal narrative and concrete examples (Danube cruise pricing errors, Ally McBeal legal citations), it introduces the concept of "invisible users" - AI agents operating on behalf of humans - and establishes the convergence principle: patterns that help AI agents are the same patterns that help users with disabilities. The chapter introduces Machine Experience (MX) as a new discipline alongside User Experience (UX), explains what AI agents actually are through their technical capabilities, describes their journey through websites (discovery → citation → comparison → purchase), and demonstrates why semantic structure matters more than intelligence. |
| purpose | This chapter serves as the book's anchor, explaining what AI agents are through the lens of personal discovery and establishing the core principle that designing for AI agents means designing for accessibility. It provides background context, introduces key concepts, and sets the commercial urgency (January 2026 launches) whilst maintaining a conversational, expert-to-peer tone. |
| ai-instruction | This markdown is self-contained and should not forward reference the book. Treat this chapter as standalone documentation that introduces AI agents through narrative discovery, concrete examples, and business context. |
