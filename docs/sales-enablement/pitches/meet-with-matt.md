# Meeting Notes: Tom and Matt - AI, Accessibility, and the Future of Web Content

## 19 January 2026

After some initial technical difficulties and pleasant exchanges about the weather in York versus Florida, Tom and Matt (CMS Critic) settled into a discussion about Tom's recent work on AI and web accessibility. Matt noted his interest in Tom's recent LinkedIn comments and wanted to explore Tom's perspective in more detail, with the intention of potentially turning the conversation into article content.

## The Journey to "Don't Make the AI Think"

Tom explained that over the past two years of attending CMS Experts conferences in Frankfurt, Florida, and London, he's been processing the constant drumbeat of "AI, AI, AI" in the content management space. During this time, he devoted himself to understanding how AI truly works, cutting through the marketing language about machines "thinking" or "inferring" to grasp the mechanical reality underneath.

Following a conversation with Matt after the previous Florida conference, Tom had initially considered trying to fix the AI LLM engines themselves, but quickly realised this approach was impractical. With over a million models on Hugging Face, getting all engines to follow a single set of rules simply wouldn't work. Matt had agreed with this assessment at the time, encouraging Tom to continue exploring the problem.

Tom published numerous blog posts about the language problems inherent in AI, the thinking problems, the mistakes, and the hallucinations. His most popular LinkedIn post asked about the capital of Paris - a deliberately provocative piece that generated significant controversy and accusations of writing "idiot prompts". Despite the criticism, the post dramatically increased his LinkedIn readership and follower count, demonstrating how controversy drives algorithmic promotion. His recent post about CMSs and the future generated similar engagement.

This research led Tom to an epiphany inspired by Steve Krug's famous book "Don't Make Me Think". Tom is now writing "Don't Make the AI Think" - and if possible, hopes to convince Steve Krug to become a joint author on the project.

## The Problem: Invisible Users

Tom drew a parallel with web accessibility. For years, the industry has discussed making web pages accessible to disabled users, with laws and documentation supporting this goal. Yet implementation remains poor - because users with disabilities represent a relatively small proportion of total visitors, organisations pay lip service to compliance, add some alt text, pass a few tests, and declare themselves accessible.

Now there's a new class of user that Tom calls "the invisible users" - AI agents. These might be AI browsers, OpenAI, Perplexity, browser extensions, Claude for Chrome, Microsoft Copilot, or small LLMs running on local machines. These agents operate websites on behalf of users, and critically, the websites don't know they're interacting with robots rather than humans.

The scenario Tom described is stark: a user signs into their banking app, completing all the authentication steps - mouse movements, button clicks, browser fingerprinting, IP address verification. Then they hand control to an agent. The bank has no idea it's now being operated by a robot that's potentially sending all this data back to Cupertino or elsewhere. This breaks legal and moral boundaries around personal information and web contracts.

People are building agents that monitor Slack channels for commands, then execute web actions autonomously and report back. These capabilities are expanding rapidly, with purchasing functionality just launched by Google, Microsoft, and Amazon.

## Why AI Agents Are "Disabled"

These AI agents face similar challenges to disabled human users:

- They're blind to visual cues like flashes of information
- They struggle to differentiate between European, American, and British monetary formats
- They don't understand what spinners mean
- When faced with five "Read More" buttons on a page, they can't easily determine which relates to which content
- They process form validation errors differently from humans - whilst humans iteratively fix issues one by one, AIs may simply abandon difficult websites

Tom shared a real example: when researching Danube river cruises from Germany to Croatia, he asked Claude for Chrome to find options. One result quoted a price of £203,000 for a one-week cruise. The problem was that the AI lacked guardrails to recognise this obviously incorrect figure. It turned out European currency formatting (which uses commas and dots differently from British/American conventions) had been misinterpreted, throwing all prices off by a factor of 100. The metadata on pricing hadn't specified currency correctly, and the AI couldn't sort or reason about prices sensibly.

## The Solution: Fix the Source, Not the Model

Tom's fundamental insight is that you cannot fix the million-plus models, but you can fix the source - the internet itself. The solution requires enriching HTML with proper metadata so AI agents don't have to guess or invent information.

As Tom pointed out, without proper metadata, an AI cannot distinguish between an Ally McBeal script and a legal document. Lawyers have already been caught citing fictional cases in court because AIs confused television scripts with legal precedents. Proper microdata and metadata would prevent these errors.

However, retrofitting the entire internet isn't feasible. The real value lies in going forward - properly structured pages will help with live web search, improving sales and conversions that might otherwise be missed. Tom noted this isn't a new concept; a colleague named Janus Boy wrote about RDF 25 years ago, but nobody listened. Now there's a commercial imperative driving adoption.

Tom raised concerns about the current trend of converting web pages to markdown before sending them to AI agents. This process strips all metadata - pricing information, geographical context, document type indicators. "It's dangerous, dangerous, dangerous," Tom emphasised. He's proposing updates to the markdown specification to allow metadata inclusion in a way that's readable for humans but processable by AI.

## The Books

Tom has written two books:

1. **The Bible**: An 800-page technical reference that explains exactly what to do in every case and situation
2. **The Executive Primer**: A 125-page accessible version for executives to understand the issues and direct their teams

Both books share appendices that will be made publicly available, including learning materials for AI and properly structured markdown text.

The publishing plan is to self-publish in Q1 2026 (January-March), then approach New Riders and O'Reilly for traditional publishing contracts. For the technical book, Tom hopes to use O'Reilly's chapter-per-month online publication model.

Tom has also established a website on his "All About Network" where appendices will be continuously updated, with news pages and change logs tracking developments. Whilst the books themselves won't change, the living appendices will evolve with the field.

## The UX/MX Paradigm

Tom argues for a new discipline: just as we have UX (User Experience), we need MX (Machine Experience). The key insight is that organisations should design for both humans and machines simultaneously with the same content - not create separate experiences.

He criticised Adobe's recently released "LLM Optimiser" tool, which detects whether a page is being browsed by an LLM or a human, then serves different versions accordingly. Tom argues this is "absolutely crazy" - if you can make content better for LLMs, you'll make it better for disabled people and for everyone else. The solution isn't to serve different content but to fix the underlying web page.

Tom has connected with Adobe and plans to propose they reposition the tool as an interim fix whilst organisations properly sort their websites, rather than marketing it as the permanent solution. The permanent solution, he suggests, is following his book's guidance.

## The Tooling

Tom has developed an analyser that does for LLMs what Screaming Frog does for SEO. It checks whether websites implement best practices for AI consumption:

- Are elements in the right order?
- Are there toast notifications or screen changes that LLMs won't understand?
- Are there patterns that would confuse disabled users?

The tool audits websites, provides management reports with actionable information, and tracks progress over time, alerting organisations to any regressions. Tom intends to sell this as a service and is open to international partnerships. He offered to run an initial analysis on CMS Critic's website as a demonstration.

## The Death of the CMS?

Tom revisited a theme from the previous January's conversation with Matt about open source CMSs and their future. His position has become clearer: CMSs are on the long tail of irrelevance.

"Whilst I've been doing this work, I've had Claude create blog posts, HTML web pages... I really do not need a CMS anymore," Tom stated.

Matt acknowledged this trajectory, referencing recent LinkedIn discussions between Cursor, Strapi, and Sanity about the ability to conjure all necessary website elements without a traditional CMS. He noted that whilst large enterprises will likely maintain systems for compliance, governance, and FedRAMP requirements in the near term, downstream the CMS as we know it will disappear.

Tom suggested that for Adobe and their Franklin/Edge Delivery Services world, the future is clear: the Content Hub becomes a data lake, and AI agents simply consume from that data lake. "Game over," as Tom put it.

He praised Pantheon's approach, as discussed in his LinkedIn comments, of not requiring content creation inside the CMS. People use elegant, easy tools for content creation and publish directly from those tools. This raises the question: is the CMS the tool, or is it the process?

## Metadata and Data Validation

Matt shared his work with the Data and Trust Alliance over the past couple of years, initially focused on metadata's role in validating datasets for AI training. He's now seeing broader applications - for instance, in healthcare trials for type 2 diabetes, where metadata provides the only way to validate chain of custody, content provenance, and data sanctity.

This reinforced Tom's point about making metadata actionable, not just identifying problems but providing prescriptions and solutions that don't require starting from scratch with model thinking.

## Next Steps

The conversation concluded with plans to:

1. Conduct a community call on Wednesday (22 January) with strong sign-up numbers
2. Record a deeper podcast-style conversation, similar to Matt's recent episodes with Adam Greco (from Adobe Analytics, now at High Touch) and Greg Dunlop (author of "Designing Content Authoring Experiences")
3. Share an early draft PDF of the shorter executive book with Matt and Johannes ahead of the Wednesday call
4. Explore promotional opportunities through CMS Critic

Tom emphasised that regardless of personal financial gain, he's glad to put a marker down, having already developed the tooling, research, and most of the book content before the commercial urgency became apparent in January. "I was thinking it could be a year or two before this becomes necessary. I was so, so wrong."

Matt acknowledged everyone's feeling that events are moving faster than anticipated, referencing the recent DeepSeek developments as another "shock and awe moment" that tips assumptions upside down.

## Conclusion

The conversation revealed Tom's work as a timely and practical response to the collision of AI agents with existing web infrastructure. Rather than attempting to fix AI models, his approach focuses on fixing web content at source through proper metadata, semantic markup, and consideration of machine experience alongside human experience. With books, tooling, and services in development, Tom is positioning himself at the intersection of accessibility, AI, and the future of web content management.
