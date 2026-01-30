# The Convergence: How Six Design Disciplines Point to Machine Experience

For 25 years, we've been designing websites for humans. We've developed sophisticated methodologies: usability testing, information architecture, structured content, accessibility guidelines, cognitive psychology, design principles. Each discipline has its own practices, its own vocabulary, its own community of experts.

But recently, I noticed something remarkable. When I examined these disciplines closely—not as separate fields but as complementary approaches to the same problem—I found they all converge on identical principles. The techniques we use to help humans find information are the same techniques that help machines parse content. The structures we create for human comprehension are the same structures that enable AI processing.

This isn't coincidence. It's because we've been optimising for the same underlying challenge all along: **how do you structure information so a processor—any processor—can extract meaning from it?**

Whether that processor is a human brain, a screen reader, or an AI system doesn't change the fundamental requirements. Clear structure enables understanding. Explicit relationships enable navigation. Semantic markup enables interpretation. Consistent patterns enable learning.

I call this convergence **Machine Experience (MX)**—not as a replacement for existing disciplines, but as recognition that when we design well for humans, we're already designing well for machines.

Let me show you what I mean.

## Six Disciplines, One Truth

I've written six essays exploring how established design disciplines relate to Machine Experience. Each examines a foundational text or methodology. Each demonstrates the same pattern: principles developed for human users work identically for machine processors.

### 1. Cognitive Science: Processing Under Constraints

[**"Two Sides of the Same Cognitive Coin: What Mindhacker Can Teach Us About Machine Experience"**](mindhacker-and-mx.md) ("Mindhacker and MX" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/mindhacker-and-mx.md>)

Ron and Marty Hale-Evans wrote "Mindhacker" to help humans optimise their cognitive performance. Their techniques address the limitations of human memory, attention, and processing: chunking information into manageable units, creating memorable patterns, using external memory aids, establishing consistent notation systems.

These techniques work because human cognition has constraints. Limited working memory (7±2 items). Serial processing bottlenecks. Pattern recognition instead of precise recall. Forgetting curves.

AI systems have different but parallel constraints. Context window limits. Sequential token processing. Pattern matching over rule execution. No persistent memory between sessions.

The solutions are identical. Chunk content into semantic units. Create hierarchical organisation that respects processing limits. Use explicit structure instead of implicit convention. Establish consistent patterns that enable learning.

Mindhacker optimises for human cognitive architecture. Machine Experience optimises for AI processing architecture. The techniques are the same because the challenge is the same: **how do you structure information for a processor with finite capacity?**

**The lesson**: When you chunk content semantically, use heading hierarchies, and create consistent patterns, you're not just helping humans remember—you're creating structure that any processor can navigate.

### 2. Usability: Don't Make Anyone Think

[**"Don't Make AI Think: How Steve Krug's Usability Principles Apply to Machine Experience"**](dont-make-me-think-and-mx.md) ("Don't Make Me Think and MX" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/dont-make-me-think-and-mx.md>)

Steve Krug's "Don't Make Me Think" established that good design makes interfaces self-evident. Users shouldn't have to puzzle out how things work. Affordances should be obvious. Actions should be clear. Structure should be intuitive.

Krug was writing about visual interfaces, but his principles apply directly to semantic interfaces. When he says "don't make me think," he means don't force users to infer structure, guess at relationships, or decode conventions.

AI systems face the same challenge. When markup is ambiguous, machines must infer meaning. When relationships are implicit, machines must guess connections. When structure only exists visually, machines must decode presentation.

The solution for both: make structure explicit. Use semantic HTML that declares what things are. Provide clear signifiers of function and relationship. Follow conventions that reduce interpretation overhead.

Krug's usability principles—clarity, consistency, conventional patterns—work for machines because they eliminate ambiguity. When you design for satisficing (finding "good enough" quickly) versus optimising (finding "perfect" eventually), you create structure that's easy to parse.

**The lesson**: The first book in the MX series is deliberately titled "Don't Make AI Think" as homage to Krug, because the principle is identical—structure should communicate meaning, not require inference.

### 3. Structured Content: Built for Reuse

[**"From Blobs to Bots: How Structured Content Predicted Machine Experience"**](structured-content-and-mx.md) ("Structured Content and MX" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/structured-content-and-mx.md>)

Carrie Hane and Mike Atherton wrote "Designing Connected Content" to solve multi-channel publishing. Content needed to work on websites, mobile apps, email, social media, printed materials. The solution: stop creating content blobs (entire pages) and start creating content chunks (reusable components).

Structured content separates meaning from presentation. Instead of "article as formatted HTML," you have "article as title + author + date + body + category + tags." Each element is discrete, semantic, and reusable.

This enables COPE: Create Once, Publish Everywhere. Write content once in a structured format, then present it differently for different contexts.

But structured content also enables something Hane and Atherton recognised early: it makes content machine-readable. When content is chunked semantically with explicit metadata, "both people and robots can understand" it. They were designing for multi-channel publishing but creating structure that works for AI.

**The lesson**: Structured content practitioners solved machine readability years ago while addressing human multi-channel needs. MX is the recognition that this structure serves both audiences.

### 4. Design Principles: Affordances for Algorithms

[**"Affordances for Algorithms: Don Norman's Design Principles and Machine Experience"**](norman-and-mx.md) ("Norman and MX" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/norman-and-mx.md>)

Don Norman's "The Design of Everyday Things" introduced affordances, signifiers, mapping, feedback, and conceptual models as core design principles. A door handle affords pulling. A flat plate affords pushing. Good design makes these relationships self-evident.

Norman was describing physical and digital interfaces for humans. But his principles apply with remarkable precision to how AI interacts with content.

Affordances: what actions are possible? For humans, a chair affords sitting. For machines, semantic markup affords parsing.

Signifiers: what communicates the action? For humans, a handle signals "pull." For machines, a `<nav>` element signals "navigation."

Mapping: what's the relationship between controls and effects? For humans, a car seat control shaped like a seat. For machines, breadcrumb structure matching page hierarchy.

Feedback: what happened? For humans, a light turning on. For machines, a structured response confirming extraction.

The gulf of execution (can I do what I intend?) and gulf of evaluation (can I understand what happened?) apply equally to machine processing. When markup is unclear, machines face execution gaps. When structure is ambiguous, machines face evaluation gaps.

**The lesson**: Norman's human-centred design principles are processor-centred design principles. They work for any agent interacting with a system.

### 5. Accessibility: The Same Parsing Path

[**"Accessibility Is Machine Readability"**](accessibility-is-machine-readability.md) ("Accessibility Is Machine Readability" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/accessibility-is-machine-readability.md>)

The Web Content Accessibility Guidelines (WCAG) exist to ensure content works for people with disabilities. Screen readers for blind users. Keyboard navigation for motor-impaired users. Clear language for cognitive disabilities.

But here's what's remarkable: screen readers are programmatic processors. They parse HTML, build accessibility trees, extract semantic meaning, and traverse document structure. They can't see visual design. They rely entirely on markup.

This is exactly what AI systems do.

When WCAG requires that information be "programmatically determined," it means readable by code. When it requires that content be "robust enough for interpretation by user agents, including assistive technologies," it means machine-processable.

The POUR principles (Perceivable, Operable, Understandable, Robust) apply to any programmatic processor:

- Perceivable: Can machines detect it? (alt text, semantic structure)
- Operable: Can machines navigate it? (keyboard access, landmarks)
- Understandable: Can machines interpret it? (clear labels, consistent patterns)
- Robust: Can machines parse it reliably? (valid markup, exposed semantics)

Screen reader users need semantic HTML. AI systems need semantic HTML. Screen reader users need text alternatives. AI systems need text alternatives. Screen reader users need explicit structure. AI systems need explicit structure.

**The lesson**: If you're implementing WCAG, you're already implementing Machine Experience. Accessibility and machine readability are the same thing.

### 6. Information Architecture: Findability for All

[**"Finding the Findable: Information Architecture for Machine Navigation"**](ia-and-mx.md) ("Information Architecture and MX" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/ia-and-mx.md>)

Lou Rosenfeld, Peter Morville, and Jorge Arango established Information Architecture as the discipline of organising content so people can find it. Their framework has four components: organisation systems, labelling systems, navigation systems, and search systems.

Each component addresses human findability. Each also addresses machine discoverability.

Organisation: How is content grouped? Humans see hierarchical categories. Machines parse document structure.

Labelling: What are things called? Humans rely on consistent terminology. Machines rely on controlled vocabularies.

Navigation: How do users move? Humans follow visual paths. Machines traverse semantic landmarks.

Search: How do users query? Both humans and machines use the same indexing, matching, and ranking mechanisms.

Information architects create taxonomies, metadata schemas, and navigation hierarchies to help humans find content. These same structures help machines find content. A site map for humans becomes a sitemap.xml for machines. A content model for humans becomes a schema for machines.

**The lesson**: Human findability and machine discoverability are the same challenge. Structure content for one, you've structured it for both.

## The Pattern: Structure Enables Understanding

Six disciplines. Six methodologies. Six sets of best practices. All converging on the same insight:

**Explicit structure enables understanding, regardless of who—or what—is doing the understanding.**

Chunk content semantically because processors have capacity limits.  
Make affordances clear because processors need to know what's possible.  
Structure content for reuse because processors access it in different contexts.  
Use semantic markup because processors can't see visual design.  
Implement accessibility because processors need programmatic access.  
Organise for findability because processors need navigable paths.

Whether the processor is a human brain, a screen reader, or an AI system doesn't change these requirements. The techniques remain the same.

## Why This Matters Now

AI systems are becoming major consumers of web content. They scrape, index, extract, process, and generate based on existing information. Your content is being read by machines whether you designed for it or not.

You have two choices:

**Option 1**: Ignore this reality. Create content that looks good to humans but is ambiguous to machines. Hope AI systems infer your meaning correctly. Accept that much of your content's value is invisible to programmatic processors.

**Option 2**: Recognise that the best practices you already know—usability, accessibility, structured content, information architecture—serve both audiences. Apply these practices intentionally. Make structure explicit, relationships clear, and semantics accessible.

Machine Experience isn't a new discipline requiring new techniques. It's the recognition that established best practices serve a broader audience than we realised.

## What You're Already Doing

If you're following modern web development best practices, you're already doing Machine Experience:

**Using semantic HTML?** You're making structure programmatically determinable.  
**Writing alt text?** You're making visual content textual for processors.  
**Creating heading hierarchies?** You're exposing document structure.  
**Implementing ARIA?** You're declaring component semantics.  
**Building taxonomies?** You're creating controlled vocabularies.  
**Defining content models?** You're establishing structured schemas.  
**Testing accessibility?** You're verifying machine readability.  

Every accessibility improvement makes content more machine-readable. Every structured content technique makes information more extractable. Every information architecture decision makes navigation more programmatic.

You don't need to learn Machine Experience from scratch. You need to recognise that what you already do serves both human and machine users.

## The MX Synthesis

Machine Experience synthesises insights from multiple disciplines:

From **cognitive science**: Structure information for processors with finite capacity  
From **usability**: Make affordances explicit, reduce inference overhead  
From **structured content**: Separate meaning from presentation, chunk semantically  
From **design principles**: Create clear signifiers, provide feedback, bridge gulfs  
From **accessibility**: Expose semantics programmatically, follow standards  
From **information architecture**: Organise for findability, label consistently, enable navigation  

These aren't separate practices. They're complementary approaches to the same goal: creating information that's accessible to any processor.

## The Three Books

I'm launching Machine Experience with three books, all publishing on 2 April 2026:

**"Don't Make AI Think"** - The principles and practices of Machine Experience, showing how to structure content for both human and machine users.

**"The Handbook"** - A practical guide to implementing MX, with concrete techniques for semantic markup, structured data, and machine-readable content.

**"The MX Bible"** - The complete reference work, covering every aspect of designing for machine processors alongside human users.

But before writing these books, I needed to establish the intellectual foundations. That's what these six essays do. They demonstrate that MX isn't revolutionary—it's the recognition of a convergence that's been happening for decades.

## A Call to the Community

To usability practitioners: The clarity you create for humans creates parsability for machines.

To accessibility specialists: The standards you implement enable all programmatic processors.

To content strategists: The structures you design serve both human and machine consumers.

To information architects: The findability you enable works for any navigation mechanism.

To designers: The affordances you create communicate to any agent, human or artificial.

To developers: The semantic markup you write is read by more than browsers.

You're all doing Machine Experience. You've been doing it all along. What changes is recognising that your work serves a broader audience, understanding how machines process what you create, and designing intentionally for both.

## The Future Is Inclusive

The web was built on machine-readable markup. HTML was designed to be both human-viewable and machine-processable. We've spent 25 years refining how to make that markup serve humans better through usability, accessibility, and good information architecture.

Now we're recognising that the same refinements serve machines. The semantic structures we create for human understanding enable machine processing. The accessible markup we write for assistive technologies works for AI systems. The organised content we design for human navigation enables machine traversal.

This is not a paradigm shift. It's a perspective shift. We're not changing what we do. We're expanding our understanding of who we do it for.

The future of the web is inclusive. Inclusive of humans with different abilities, different devices, and different contexts. And inclusive of different processors—human brains, assistive technologies, and artificial intelligence.

Machine Experience is how we get there. Not by inventing new practices, but by applying established ones with the recognition that good design serves everyone—and everything—that consumes content.

## The Journey Begins Here

Start with any of the six foundational essays. Each stands alone as an exploration of how an established discipline relates to Machine Experience. Together, they demonstrate the convergence.

Read about [cognitive optimisation](mindhacker-and-mx.md) ("Mindhacker and MX" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/mindhacker-and-mx.md>) and see how human memory techniques inform AI context management.

Read about [usability principles](dont-make-me-think-and-mx.md) ("Don't Make AI Think: How Steve Krug's Usability Principles Apply to Machine Experience" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/dont-make-me-think-and-mx.md>) and see how removing human inference removes machine ambiguity.

Read about [structured content](structured-content-and-mx.md) ("Structured Content and MX" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/structured-content-and-mx.md>) and see how multi-channel publishing predicted multi-processor consumption.

Read about [design principles](norman-and-mx.md) ("Affordances for Algorithms: Don Norman's Design Principles and Machine Experience" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/norman-and-mx.md>) and see how affordances work for algorithms.

Read about [accessibility](accessibility-is-machine-readability.md) ("Accessibility Is Machine Readability" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/accessibility-is-machine-readability.md>) and see how WCAG already requires machine readability.

Read about [information architecture](ia-and-mx.md) ("Finding the Findable: Information Architecture for Machine Navigation" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/ia-and-mx.md>) and see how human findability enables machine discoverability.

Then recognise: you already have the skills. You already know the practices. You already create content that serves both audiences.

Machine Experience is the name for what you're already doing when you do it well.

---

*Tom Hale is Principal Consultant at Digital Domain Technologies. For 25 years, he's specialised in content management systems and digital experience platforms, working with major corporate clients including Nissan, Ford, Jaguar Land Rover, and Twitter. Known in the industry as "The AEM Guy" for his work with Adobe Experience Manager, Tom is now developing Machine Experience as a professional discipline for designing websites that serve both human and AI users. The three MX books launch 2 April 2026.*

## The Six Foundational Essays

1. **[Two Sides of the Same Cognitive Coin: What Mindhacker Can Teach Us About Machine Experience](mindhacker-and-mx.md) ("Two Sides of the Same Cognitive Coin: What Mindhacker Can Teach Us About Machine Experience" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/mindhacker-and-mx.md>)**  
   How cognitive optimisation techniques for humans apply to AI processing constraints

2. **[Don't Make AI Think: How Steve Krug's Usability Principles Apply to Machine Experience](dont-make-me-think-and-mx.md) ("Don't Make AI Think: How Steve Krug's Usability Principles Apply to Machine Experience" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/dont-make-me-think-and-mx.md>)**  
   Why reducing human inference overhead reduces machine ambiguity

3. **[From Blobs to Bots: How Structured Content Predicted Machine Experience](structured-content-and-mx.md) ("From Blobs to Bots: How Structured Content Predicted Machine Experience" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/structured-content-and-mx.md>)**  
   How content strategists solved machine readability while addressing multi-channel publishing

4. **[Affordances for Algorithms: Don Norman's Design Principles and Machine Experience](norman-and-mx.md) ("Affordances for Algorithms: Don Norman's Design Principles and Machine Experience" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/norman-and-mx.md>)**  
   How affordances, signifiers, and feedback work for any agent that interacts with systems

5. **[Accessibility Is Machine Readability](accessibility-is-machine-readability.md) ("Accessibility Is Machine Readability" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/accessibility-is-machine-readability.md>)**  
   Why WCAG compliance makes content work for all programmatic processors

6. **[Finding the Findable: Information Architecture for Machine Navigation](ia-and-mx.md) ("Finding the Findable: Information Architecture for Machine Navigation" at <https://github.com/ddttom/invisible-users/blob/main/ingest/new/contrasts/ia-and-mx.md>)**  
   How human findability and machine discoverability are the same challenge

## Further Reading

**Machine Experience Resources:**
- [Schema.org](https://schema.org/) - Structured data vocabularies
- [WHATWG HTML Standard](https://html.spec.whatwg.org/) - Semantic HTML specification
- [MDN Web Docs: Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)

**The Source Works:**
- "Mindhacker" by Ron and Marty Hale-Evans
- "Don't Make Me Think" by Steve Krug  
- "Designing Connected Content" by Carrie Hane and Mike Atherton
- "The Design of Everyday Things" by Don Norman
- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- "Information Architecture: For the Web and Beyond" by Rosenfeld, Morville, and Arango

**Professional Communities:**
- [Nielsen Norman Group](https://www.nngroup.com/) - UX and IA research
- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/) - Accessibility standards
- [Content Strategy Alliance](https://www.contentstrategyalliance.com/) - Content strategy resources
- Information Architecture Institute - IA community