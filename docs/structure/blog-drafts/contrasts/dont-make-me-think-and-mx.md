# Don't Make AI Think: How Steve Krug's Usability Principles Apply to Machine Experience

When Steve Krug published "[Don't Make Me Think: A Common Sense Approach to Web Usability](https://sensible.com/dont-make-me-think/)" in 2000, he established principles that have guided web design for over two decades. His central insight—that web pages should be self-evident and require minimal cognitive effort—changed how we think about designing for humans.

Now, as we develop Machine Experience (MX) as a discipline, we're applying remarkably similar principles. But instead of asking "does this make humans think?", we're asking "does this make AI systems work harder than necessary?"

The title of my first MX book, "Don't Make AI Think," is a deliberate homage to Krug's work. Because the fundamental insight is identical: good design minimises cognitive load, whether that load is borne by a human brain or a language model.

## Krug's First Law, Reconsidered

Krug's First Law of Usability states: "Don't make me think!" The premise is straightforward—web pages should be so obvious that users can navigate them without stopping to puzzle things out. Links should look like links. Navigation should be where users expect it. Labels should mean what they say.

For Machine Experience, the equivalent principle is: "Don't make AI infer!" 

When a human encounters ambiguous navigation, they can use context, common sense, and visual cues to work it out. AI systems have to process the same information differently. They don't see a page as a visual whole—they parse structure, semantics, and relationships sequentially. Ambiguity doesn't just slow them down; it can lead to complete misinterpretation.

Consider a simple example. A human sees a row of text links at the top of a page and instantly recognises it as navigation, even if it's not marked up as such. A machine parser sees unsemanticated text. Without a `<nav>` element or [ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles), the AI has to infer purpose from position and content—adding processing overhead and introducing potential for error.

Just as Krug advocated for self-evident design for humans, MX advocates for self-declaring design for machines. Don't make the AI guess what something is. Tell it explicitly.

## Scanning Versus Sequential Processing

One of Krug's most important observations is that users don't read web pages—they scan them. Humans look for visual anchors: headings, bold text, list items. They [skim content in an F-pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/), focusing on the top and left side of the page. Good design accommodates this by creating clear visual hierarchies.

AI systems don't scan visually, but they do process hierarchically. When a language model encounters a document, heading structure matters. The hierarchy created by H1, H2, and H3 tags provides a roadmap. Properly nested headings tell the AI what's important, what's subordinate, and how concepts relate to each other.

But here's where it gets interesting: humans can compensate for poor hierarchy through visual design. You can make something look like a heading with CSS even if it's marked up as a paragraph. Humans see the 24pt bold text and treat it as a heading.

AI systems can't do this. They rely on semantic markup, not visual presentation. A `<p>` styled to look like a heading is still a paragraph to a machine parser. The visual hierarchy and the semantic hierarchy must align—or you're making the AI think.

This is why MX emphasises semantic HTML. Not for aesthetic reasons, but because it's the difference between self-evident structure and structure that requires inference.

## Satisficing and Pattern Matching

Krug describes how users "[satisfice](https://en.wikipedia.org/wiki/Satisficing)"—a portmanteau of "satisfy" and "suffice". When faced with choices, users don't evaluate all options to find the optimal one. They click the first thing that seems like it might work.

AI systems exhibit similar behaviour, though for different reasons. Language models work through pattern matching and probability. When parsing content, they look for recognisable patterns—schema markup they've seen before, familiar document structures, standard HTML patterns.

If your content follows conventions—using standard [schema.org vocabularies](https://schema.org/), conventional HTML patterns, familiar metadata structures—the AI can process it efficiently. It's seen these patterns millions of times in training. Recognition is fast and reliable.

If your content uses custom structures, non-standard vocabularies, or unusual patterns, the AI has to work harder. It can still process the content, but it's essentially "satisficing" its way through unfamiliar territory. The results are less reliable.

This is why MX advocates for following web standards and using established vocabularies. Not because custom solutions don't work, but because conventional solutions work better. They align with patterns AI systems already know.

## Visual Hierarchies and Structural Hierarchies

Krug advocates for "billboard design"—creating clear visual hierarchies that communicate information at a glance. Use contrast, size, and position to establish importance. Break content into scannable chunks. Make the structure visible.

MX applies identical principles to semantic structure. Create clear information hierarchies using proper heading levels. Break content into logical sections with [semantic HTML5 elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) (`<article>`, `<section>`, `<aside>`). Use lists for collections of items. Make the structure explicit in markup, not just in visual presentation.

The parallel is direct: visual hierarchy helps humans process pages efficiently. Semantic hierarchy helps machines process documents efficiently. Both reduce cognitive load. Both prevent misinterpretation. Both enable faster, more accurate processing.

The difference is that humans can bridge gaps in visual hierarchy through inference and context. Machines can't bridge gaps in semantic hierarchy without making assumptions—assumptions that might be wrong.

## Conventions Are Your Friend

Krug emphasises using web conventions. Don't reinvent the wheel. Users expect links to be underlined (or at least distinguished by colour). They expect logos to link to the home page. They expect navigation to be in standard locations.

Why? Because conventions reduce cognitive load. Users don't have to learn your unique system. They can apply knowledge from thousands of other sites.

The same principle applies to Machine Experience. Use semantic HTML conventions. Use standard schema.org vocabularies. Use conventional metadata formats. Follow established patterns for structured data.

AI systems are trained on millions of web pages. They've learned patterns: how articles are typically structured, how product information is usually presented, how relationships are commonly expressed. When you follow these conventions, AI systems can leverage that training. Processing is faster and more accurate.

When you deviate from conventions—using custom schemas, non-standard markup, unusual patterns—you're asking the AI to learn your unique approach. It's possible, but it adds overhead. You're making the AI think.

## Clear Navigation for Clear Traversal

Krug dedicates an entire chapter to navigation design. Navigation should answer key questions: Where am I? Where can I go? How do I get there? Good navigation is consistent, clear, and comprehensive.

For humans, this is about visual design and interaction patterns. For machines, it's about semantic clarity and explicit relationships.

Consider breadcrumb navigation. For humans, it's a visual affordance showing the path from homepage to current page. For machines, it's structured data—ideally marked up with [BreadcrumbList schema](https://schema.org/BreadcrumbList)—that explicitly declares the hierarchical relationship between pages.

A human can infer breadcrumb function from position and appearance. A machine needs explicit markup. The visual presentation says "I look like breadcrumbs." The semantic markup says "I am breadcrumbs, and here's the exact relationship between these items."

Same principle, different implementation. Both aim to make navigation self-evident.

## Mindless Choices and Unambiguous Structure

Krug's Second Law states: "It doesn't matter how many times I have to click, as long as each click is a mindless, unambiguous choice."

Users don't mind clicking if each click is obvious. What frustrates them is uncertainty—not knowing which option is right, what will happen when they click, or whether they're heading in the right direction.

For AI systems processing documents, the equivalent is traversal cost. It doesn't matter how many elements the AI has to process, as long as each element's purpose and relationship is unambiguous.

A deeply nested document structure isn't inherently problematic for machines. What's problematic is ambiguity—unclear heading hierarchy, mixed semantic signals, inconsistent patterns. When each element clearly declares what it is and how it relates to other elements, processing is straightforward regardless of depth.

This is why MX advocates for consistent patterns and explicit relationships. Don't make the AI guess whether a `<div>` is a container, a component, or a content block. Use semantic elements that declare their purpose.

## Omit Needless Complexity

Krug's chapter on writing for the web can be summarised in three words: "Omit needless words." Get rid of happy talk, introductory text, and instructions. Reduce text to its essential meaning.

For Machine Experience, the principle is: "Omit needless markup." Don't wrap content in seven layers of divs when one semantic element will do. Don't use JavaScript to generate content that could be static HTML. Don't create elaborate custom structures when standard HTML elements convey the same information.

Every unnecessary element is overhead. Every non-semantic wrapper is noise. Every custom solution where a standard one exists is an inference burden.

This doesn't mean minimalism for its own sake. It means using exactly the markup necessary to convey structure and meaning clearly—no more, no less.

## Testing: The Reality Check

Krug advocates for [simple, regular usability testing](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/). Watch real users interact with your site. You'll quickly discover where your "obvious" design makes people think.

MX requires the same discipline. Test your content with AI systems. Use the actual tools you're designing for—language models, search engines, AI assistants. Don't assume your structure is clear. Verify it.

Just as usability testing reveals where humans get confused, AI testing reveals where machines misinterpret structure, miss relationships, or make incorrect inferences. The solution is the same: observe, identify problems, and fix them.

## The Core Insight

Steve Krug's fundamental insight was that good usability isn't about following design rules—it's about understanding how users actually behave and designing accordingly. Users scan, they satisfice, they follow familiar patterns. Design for that reality.

Machine Experience applies the same logic. Good machine-readable design isn't about following markup rules—it's about understanding how AI systems actually process content and structuring accordingly. AI systems parse hierarchically, they rely on semantic signals, they match patterns from training data. Design for that reality.

Both disciplines share a common foundation: empathy for the processor. Krug encouraged designers to put themselves in users' shoes. MX encourages content creators to understand AI processing patterns.

Both disciplines reach the same conclusion: clarity trumps cleverness. Self-evidence beats inference. Conventions enable efficiency.

## Why This Matters Now

When Krug wrote ["Don't Make Me Think"](https://en.wikipedia.org/wiki/Don%27t_Make_Me_Think) in 2000, the web was young and many designers were still learning that users don't behave like designers imagine. Twenty-five years later, web usability principles are well established.

Now we're at a similar inflection point with AI. Many content creators assume AI systems will "figure out" their content structure, just as designers once assumed users would "figure out" their clever navigation schemes.

They won't. Or rather, they will—but with more errors, more processing overhead, and less reliable results than if you'd structured content clearly in the first place.

Just as Krug's principles helped designers create better experiences for humans, Machine Experience principles help content creators build better experiences for AI systems. And just as better human usability benefits everyone—users, designers, businesses—better machine usability creates value across the board.

The web serves two audiences now: humans and machines. Krug taught us how to serve one well. Machine Experience applies those same principles to serve the other.

Don't make them think. Either of them.

---

*Tom Hale is Principal Consultant at Digital Domain Technologies and is developing Machine Experience as a professional discipline for designing websites that serve both human and AI users.*

## Key Principles from Don't Make Me Think

**Krug's First Law of Usability:** "Don't make me think!"  
Web pages should be self-evident. Users shouldn't have to pause and figure things out.

**Krug's Second Law:** "It doesn't matter how many times I have to click, as long as each click is a mindless, unambiguous choice."  
Navigation depth matters less than navigation clarity.

**Krug's Third Law:** "Get rid of half the words on each page, then get rid of half of what's left."  
Omit needless words to reduce cognitive load and improve scannability.

**On User Behaviour:** Users don't read pages—they scan them. Users don't make optimal choices—they satisfice. Users don't figure out how things work—they muddle through.

**On Testing:** "Testing one user is 100 percent better than testing none."  
Simple, frequent testing beats elaborate, infrequent testing every time.

## Further Reading

**Don't Make Me Think Resources:**
- [Don't Make Me Think, Revisited](https://sensible.com/dont-make-me-think/) (3rd Edition, 2014)
- [Steve Krug's Website](https://sensible.com/) - Usability resources and workshops
- [Rocket Surgery Made Easy](https://sensible.com/rocket-surgery-made-easy/) - Krug's guide to usability testing

**Machine Experience Resources:**
- [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html) - MDN Web Docs
- [Schema.org](https://schema.org/) - Structured data vocabularies
- [BreadcrumbList Schema](https://schema.org/BreadcrumbList) - Structured breadcrumb navigation
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/) - Many accessibility principles align with machine readability

**Understanding User Behaviour:**
- [Satisficing](https://en.wikipedia.org/wiki/Satisficing) - Herbert Simon's decision-making concept
- [F-Shaped Pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/) - How users scan web content