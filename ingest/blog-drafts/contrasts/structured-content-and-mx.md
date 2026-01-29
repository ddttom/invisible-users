# From Blobs to Bots: How Structured Content Predicted Machine Experience

In 2017, Carrie Hane and Mike Atherton published "[Designing Connected Content: Plan and Model Digital Products for Today and Tomorrow](https://www.amazon.com/Designing-Connected-Content-Products-Tomorrow/dp/0134763386)", a guide to creating content that works across any channel or device. Their central insight—that content should be structured as discrete, meaningful chunks rather than monolithic blobs—was aimed at solving a human problem: how to publish the same content efficiently across websites, mobile apps, voice interfaces, and whatever comes next.

But in making content "future-friendly" for humans across multiple channels, Hane and Atherton inadvertently created the blueprint for Machine Experience. Because content structured for flexibility and reuse is, by definition, content structured for machine understanding.

The content strategists were building for AI before AI was the obvious use case.

## Blobs Versus Chunks: A Tale of Two Architectures

Hane describes the traditional approach to web content as ["blobs"](https://www.tanzenconsulting.com/blog/2016/10/13/3-reasons-you-need-structured-content-now)—everything dumped into a single WYSIWYG body field. A typical blog post might include the title, author bio, publication date, body text, images, captions, and related links all mashed together in one undifferentiated mass.

For humans viewing a designed page, this works. The visual presentation implies relationships: the byline sits under the headline, the image caption appears below the image, the author bio is in a sidebar. Humans infer structure from layout.

But try to reuse that content elsewhere—say, in a mobile app or voice interface—and you're stuck. The structure exists only in the visual presentation, not in the content itself. Want just the headline for a notification? It's buried in the blob. Need the publication date for sorting? It's mixed in with everything else. Want to pull all articles by a specific author? Good luck parsing that.

This is where Hane and Atherton's "chunks" come in. Instead of one blob, content is broken into discrete, meaningful pieces: headline (text field), author (relationship to person entity), publication date (date field), body paragraphs (structured text), images (media objects with their own metadata), and so on.

Each chunk is defined, typed, and explicitly related to other chunks. As Hane notes, ["the chunks of content became data, with the relationships explicitly described in a way that both people and robots can understand."](https://medium.com/@carriehd/designing-future-friendly-content-modeling-structure-for-every-user-interface-7737c3952edd)

Notice that phrase: "both people and robots."

## Domain Modeling: Teaching Machines the Truth

The structured content methodology begins with [domain modeling](https://theinformed.life/2023/02/26/episode-108-carrie-hane/)—mapping out the real-world concepts and relationships in your subject area before considering how they'll be presented.

If you're building a conference website, your domain model might include concepts like Sessions, Speakers, Venues, Sponsors, and Time Slots. Before you design a single page, you map out how these concepts relate: a Session has one or more Speakers, takes place in a Venue, occupies a Time Slot, and might have zero or more Sponsors.

This isn't about web design—it's about modelling reality. You're creating what Hane calls "the truth of the domain."

For Machine Experience, this is gold. When you explicitly model domain concepts and relationships, you're creating exactly what AI systems need: a semantic map of meaning. You're not asking the AI to infer that "Jane Smith" appearing under "Speaker" probably means Jane is speaking at this session. You're declaring the relationship explicitly in your content model.

Domain modeling for humans translates directly to semantic clarity for machines.

## Content Types: Structured Data by Another Name

Once you have a domain model, Hane and Atherton advocate creating "content types"—templates that define what information a piece of content contains and how it's structured. A Session content type might include fields for title, description, speaker(s), time slot, venue, and sponsors.

Sound familiar? This is [structured data](https://schema.org/). A Session content type is functionally identical to schema.org's [Event](https://schema.org/Event) type. Both define a template for representing a real-world concept with specific properties and relationships.

The difference is audience. Hane and Atherton were thinking about content management efficiency and multi-channel publishing. Schema.org was thinking about search engines and knowledge graphs. But they converged on the same solution: explicit, structured representation of concepts and relationships.

When you build content types following structured content principles, you're simultaneously building machine-readable structured data. The methodologies are identical because the underlying problem is the same: how do you represent meaning explicitly rather than implicitly?

## COPE: Create Once, Publish Everywhere—Including to AI

A core principle of structured content is COPE: [Create Once, Publish Everywhere](https://gathercontent.com/blog/content-101-structured-content). Write your content as structured chunks, then assemble and present those chunks differently for different contexts—website, mobile app, email, print, voice interface.

The BBC famously adopted this approach, creating a structure that supports [1,500 new shows being added every day](https://www.tanzenconsulting.com/blog/2016/10/13/3-reasons-you-need-structured-content-now). Each show is defined once as structured data, then presented across dozens of different interfaces and experiences.

For Machine Experience, COPE extends naturally to: Create Once, Publish to Humans and Machines. The same structured content that enables efficient multi-channel human publishing also enables AI systems to understand, process, and reuse that content.

When content is properly chunked and structured, an AI can:
- Extract specific facts without parsing visual layout
- Understand relationships between concepts
- Reuse content in different contexts
- Aggregate information across many sources
- Generate accurate summaries and responses

The content strategy community solved this problem years ago. They just solved it for human channels first.

## Metadata: Making Meaning Explicit

Hane emphasises applying [metadata to chunks](https://gathercontent.com/blog/content-101-structured-content) to "embed meaning so that computers can understand what it is, what it is about, and how it relates to other chunks."

This is the essence of Machine Experience. Don't rely on context, position, or visual styling to convey meaning. Make it explicit through metadata and structured relationships.

A byline that appears visually under a headline might be understood by humans as "this person wrote this article." But to a machine, it's just text in a certain position unless you explicitly mark it up with authorship metadata or a relationship to a Person entity.

Structured content advocates learned this lesson in the context of content management systems and multi-channel publishing. MX applies the same principle to machine readability: explicit is better than implicit. Always.

## Future-Friendly Content Is Machine-Friendly Content

The phrase "future-friendly" appears throughout Hane and Atherton's work. The idea is that you can't predict what devices, channels, or interfaces will exist in five years, but you can structure your content so it's ready for them.

How? By separating content from presentation. By chunking content into meaningful units. By explicitly declaring relationships. By modelling concepts and meaning rather than just visual layout.

These principles create future-friendly content because they create *flexible* content—content that doesn't depend on a specific presentation context to be understood.

But flexibility for unpredictable future human interfaces is the same as readability for current AI systems. Both require structure. Both require explicit relationships. Both require separation of content and presentation.

AI systems are, in a sense, the ultimate future interface that structured content was preparing for. They're channel-agnostic by nature. They process meaning, not layout. They need explicit relationships, not visual inference.

Content structured according to Hane and Atherton's principles is inherently AI-ready, even though AI wasn't the primary consideration when those principles were developed.

## The Implicit Becomes Explicit

Hane notes that in traditional web content, ["relationships between the speakers, their sessions, and the session's time, duration, and location are only implied on this one page."](https://uxpamagazine.org/designing-future-friendly-content/) Visual layout creates the impression of relationship, but the structure isn't actually there.

In structured content, those relationships are explicit. A Session entity has a declared relationship to Speaker entities, Venue entities, and TimeSlot entities. The relationships exist at the data level, not just the presentation level.

For humans, this enables efficient content reuse across channels. For machines, this enables accurate understanding without inference.

This is the core parallel between structured content and Machine Experience: both recognize that implicit relationships (conveyed through position, styling, or context) are fragile and context-dependent. Explicit relationships (declared in data structure) are robust and context-independent.

## Chunks Are Parseable Units

The "chunk" concept in structured content maps directly to processing efficiency in AI systems. When content is broken into well-defined, typed units, each chunk can be processed independently and recombined as needed.

For content strategists, this means you can pull the headline for a notification, the excerpt for an email, the full text for a webpage, and the audio version for a podcast—all from the same structured source.

For AI systems, it means you can process discrete units of meaning without having to parse and separate them from surrounding content first. The chunking is already done. The boundaries are explicit. The types are declared.

Just as chunked content makes multi-channel publishing efficient, it makes AI processing efficient. Same principle, different application.

## Content Is Data

Hane emphasises that ["content is data"](https://indiecontentstrategy.com/2019/08/08/create-future-friendly-content-with-content-modeling/)—a simple but profound reframing. When you treat content as data, you think about structure, types, relationships, and schemas. You think about how pieces fit together, not just how they look.

This is exactly the mindset shift required for Machine Experience. Stop thinking about content as text on a page. Think about it as structured data that can be queried, analyzed, and processed.

The content strategy community made this shift to enable better content management and multi-channel publishing. The same shift enables better machine readability.

## The Five-Step Framework Maps to MX

Hane and Atherton's framework for structured content includes:
1. **Domain modeling** - Model the truth of your subject area
2. **Content modeling** - Define content types and their properties  
3. **Content design** - Design content based on structure
4. **CMS implementation** - Build the content repository
5. **Interface design** - Design templates and navigation

For Machine Experience, we can map this almost directly:
1. **Semantic modeling** - Define concepts and relationships
2. **Data schema definition** - Use schema.org or custom schemas
3. **Semantic markup** - Structure content with meaningful HTML
4. **Content architecture** - Organize for both storage and retrieval
5. **Presentation layer** - Design interfaces (human and machine)

The methodologies parallel because the underlying challenges parallel: how do you represent complex information in ways that can be understood, reused, and presented flexibly?

## The Convergence

What's striking about structured content and Machine Experience is how they arrived at similar solutions from different starting points.

Structured content began with the problem of content proliferation across channels. How do you manage thousands of pieces of content that need to appear on websites, apps, emails, print materials, and voice interfaces—without creating separate versions for each?

Machine Experience begins with the problem of AI comprehension. How do you structure content so machine systems can understand, process, and use it accurately?

The solutions converge because both problems ultimately require the same thing: explicit structure, declared relationships, separation of content and presentation, and semantic clarity.

Hane and Atherton were optimizing for content management efficiency and multi-channel publishing. But in doing so, they created the architecture AI systems need.

## What Content Strategists Can Teach MX Practitioners

The structured content community has years of experience with the practical challenges of implementing these principles:

**Getting organizational buy-in**: Hane addresses this in her ["Convincing Your Boss"](https://www.oreilly.com/library/view/designing-connected-content/9780134764061/) chapter. The same arguments work for MX: better SEO, improved findability, reduced duplication, future-proofing.

**Incremental implementation**: You don't have to restructure everything at once. Start with new content types. [Model content without immediate CMS changes](https://www.tanzenconsulting.com/blog/2016/10/13/3-reasons-you-need-structured-content-now). Work one section at a time.

**Involving stakeholders**: Domain modeling requires subject matter experts. Content modeling requires collaboration between strategists, designers, and developers. The same cross-functional approach works for MX.

**Balancing structure and flexibility**: Too much structure becomes rigid. Too little becomes chaos. The structured content community has developed methods for finding the right balance.

MX practitioners can learn from these battle-tested approaches rather than reinventing them.

## The Content Strategy Precedent

Perhaps the most valuable insight from the structured content movement is simply this: it proves the approach works.

The BBC, NPR, and countless other organizations have demonstrated that content structured this way is manageable, scalable, and genuinely future-friendly. It works across channels. It enables personalization. It reduces duplication. It makes content findable.

All of these benefits exist before you consider AI. They're valuable for purely human content management and publishing.

But the structured content that enables these benefits is also, inherently, machine-readable. The architecture that makes content future-friendly for unpredictable human interfaces also makes it comprehensible to current AI systems.

This isn't accidental. It's evidence that explicit structure, declared relationships, and semantic clarity are fundamental principles of information architecture—whether you're optimizing for content managers, mobile devices, or language models.

## The Unified Principle

Carrie Hane and Mike Atherton's work on structured content and the emerging discipline of Machine Experience share a unified principle: meaning should be explicit, not implicit.

For structured content, this enables efficient content management and multi-channel publishing.

For Machine Experience, this enables accurate AI understanding and processing.

But at a deeper level, both are simply arguing for better information architecture. Content should be structured according to what it means, not just how it looks. Relationships should be declared, not inferred. Concepts should be modelled, not assumed.

These principles create better content for humans *and* machines. They enable both multi-channel publishing *and* AI processing. They're future-friendly *and* machine-friendly because, ultimately, they're just well-designed information.

The content strategists figured this out first. Machine Experience is, in many ways, just extending their work to a new audience.

---

*Tom Hale is Principal Consultant at Digital Domain Technologies and is developing Machine Experience as a professional discipline for designing websites that serve both human and AI users.*

## Key Principles from Designing Connected Content

**Structure as Liberation**: "Structure creates more flexibility than amorphous blobs of text that stand alone unless manually linked together."

**Content is Data**: "Content is data. A piece of information does not need to be recreated for every channel and interface and delivery method."

**Explicit Relationships**: "The chunks of content became data, with the relationships explicitly described in a way that both people and robots can understand."

**Future-Friendly**: "Content structured properly can be reusable. You can turn a webinar into a blog post, 3 five-minute videos, and a downloadable slide deck."

**Domain Truth**: "Domain modeling is modeling the truth of the domain and the subject area that you're working in."

## Further Reading

**Designing Connected Content Resources:**
- [Designing Connected Content](https://www.amazon.com/Designing-Connected-Content-Products-Tomorrow/dp/0134763386) by Carrie Hane and Mike Atherton
- [Carrie Hane's Content Strategy Articles](https://www.tanzenconsulting.com/blog/)
- [Designing Future-Friendly Content](https://uxpamagazine.org/designing-future-friendly-content/) (UX Magazine article)
- [The Informed Life Podcast with Carrie Hane](https://theinformed.life/2023/02/26/episode-108-carrie-hane/)

**Structured Content Principles:**
- [3 Reasons You Need Structured Content Now](https://www.tanzenconsulting.com/blog/2016/10/13/3-reasons-you-need-structured-content-now)
- [Content 101: How to use Structured Content](https://gathercontent.com/blog/content-101-structured-content)
- [COPE: Create Once, Publish Everywhere](https://www.programmableweb.com/news/cope-create-once-publish-everywhere/2009/10/13)

**Machine Experience Resources:**
- [Schema.org](https://schema.org/) - Structured data vocabularies
- [Schema.org Event Type](https://schema.org/Event) - Example of structured content type
- [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html) - MDN Web Docs
- [Structured Data Testing Tool](https://search.google.com/test/rich-results) - Google's validator

**Content Strategy & IA:**
- [Information Architecture for the Web and Beyond](https://www.oreilly.com/library/view/information-architecture-for/9781491913529/) by Rosenfeld, Morville & Arango
- [Content Strategy for the Web](https://www.contentstrategy.com/) by Kristina Halvorson