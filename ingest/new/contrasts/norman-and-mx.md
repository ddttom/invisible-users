# Affordances for Algorithms: Don Norman's Design Principles and Machine Experience

In 1988, Don Norman published "[The Design of Everyday Things](https://en.wikipedia.org/wiki/The_Design_of_Everyday_Things)"—a book that changed how we think about design by introducing concepts like affordances, signifiers, and feedback. His central insight was that good design makes the relationship between user and object self-evident. A door handle affords pulling. A flat plate affords pushing. The design itself communicates how to interact with it.

Norman was writing about physical objects and, later, human-computer interfaces. But his principles apply with striking precision to Machine Experience. Because just as humans interact with doors and light switches, AI systems interact with web content. And just as physical design can create confusion for humans, digital design can create confusion for machines.

The question isn't whether Norman's principles apply to machine-readable design. It's how directly they translate.

## Affordances: What Actions Are Possible?

Norman borrowed the term "affordance" from psychologist James J. Gibson, defining it as ["the relationship between a physical object and a person (or for that matter, any interacting agent)"](https://www.amazon.com/Design-Everyday-Things-Revised-Expanded/dp/0465050654) that determines what actions are possible.

A chair affords sitting because of the relationship between the chair's properties (height, surface, stability) and human capabilities (ability to sit, weight, size). The affordance exists in the relationship, not in the chair alone.

For Machine Experience, we can extend this: markup affords processing. An HTML document affords parsing because of the relationship between the document's properties (structure, semantics, syntax) and AI capabilities (pattern matching, sequential processing, relationship inference).

But here's where it gets interesting: just as not all chairs afford sitting for all people (a child might be too small for a high stool), not all markup affords equal processing for all AI systems. The quality of the affordance depends on how well the structure matches the AI's processing patterns.

Consider a table of data. For humans, visual presentation creates the affordance—we see rows and columns and understand the relationships. For machines, semantic markup creates the affordance. A `<table>` element with proper `<th>` headers affords understanding the data structure. The same data in a `<div>` soup with CSS grid styling might look identical to humans but affords nothing to machines.

The affordance isn't in the data itself. It's in the relationship between the markup structure and the AI's ability to process it.

## Signifiers: Communicating What to Do

In the revised edition of his book, Norman introduced ["signifiers"](https://uxplanet.org/all-about-affordance-and-signifier-terms-by-don-norman-the-ux-pioneer-e0ea7b9b99f5) to clarify a crucial distinction. Affordances determine what actions are *possible*. Signifiers communicate where those actions should take *place*.

A door might afford both pushing and pulling (the physical possibility), but a flat plate signals "push" while a handle signals "pull." The signifier guides the user to the correct interaction.

For machines processing web content, semantic HTML elements are signifiers. They don't just enable processing—they signal intent and meaning.

A `<nav>` element doesn't just afford navigation parsing. It signals "this content is navigation." An `<article>` element signals "this is primary content." An `<aside>` signals "this is supplementary." 

Without these signifiers, machines must infer purpose from position, styling, or content—the equivalent of trying to figure out whether to push or pull a door that has no handle or plate.

Norman notes that ["when external signifiers have to be added to something as simple as a door, it indicates bad design."](https://tianpan.co/blog/2025-08-31-the-design-of-everyday-things) The classic "Norman door" needs a "Push" or "Pull" sign because the physical signifiers (handle vs. plate) conflict with the affordances.

The web equivalent: when you need ARIA labels to explain what `<div class="navigation">` is because you didn't use a `<nav>` element, that's a signifier failure. The semantic signifier should make the purpose self-evident.

## Mapping: Relationships Between Controls and Effects

[Norman defines mapping](https://www.nngroup.com/articles/two-ux-gulfs-evaluation-execution/) as "the relationship between controls and their effects." Good mapping is when the spatial arrangement of controls matches the spatial arrangement of what they control.

The classic example is a stovetop with burners arranged in a square and controls arranged in a line. Which knob controls which burner? You have to guess, remember, or check. Bad mapping creates cognitive load.

Good mapping: a car seat adjustment control shaped like the seat itself, where moving the control forward tilts the seat forward. The mapping is so obvious it requires no thought.

For Machine Experience, mapping is about the relationship between content structure and meaning structure. When document hierarchy matches semantic hierarchy, you have good mapping.

Consider breadcrumb navigation. For humans, visual presentation creates the mapping: "Home > Products > Widgets" shows the hierarchical path. But for machines, you need explicit structured data—[BreadcrumbList schema](https://schema.org/BreadcrumbList) that declares the relationships: item 1 contains item 2, which contains item 3.

When the visual hierarchy and the semantic hierarchy align, machines can understand the mapping immediately. When they diverge—visual breadcrumbs without structured data, or structured data that contradicts the visual presentation—you've created the machine equivalent of unintuitive stove controls.

Norman emphasizes that good mapping often derives from "[natural mappings](https://www.sharritt.com/CISHCIExam/norman.html)"—relationships that follow from physical or cultural standards. For machines, natural mappings are web standards: using heading levels (H1-H6) to indicate hierarchy, using list elements for collections, using table elements for tabular data.

These are "natural" not because they're intuitive to humans, but because they're conventional in the training data that AI systems learn from. When you follow these mappings, AI systems leverage millions of similar examples. When you deviate, you create mapping that requires inference.

## Feedback: Communicating Results

[Norman writes](https://medium.com/@gazdgabr/the-gulf-of-execution-and-evaluation-890fca716bb7): "Feedback is about sending back information about what action has been done and what has been accomplished, allowing the person to continue with the activity."

Press a button, see a light turn on. Turn a key, hear the lock click. Feedback confirms that your action had the intended effect.

For machine processing of web content, feedback is trickier because it's asynchronous. An AI doesn't interact with your content in real-time with immediate cause and effect. But the principle still applies: the structure should communicate what happened.

Consider form validation. For humans, visual feedback (red borders, error messages) communicates validation results. For machines, structured error responses communicate the same information.

Or consider search results. When an AI queries your content, structured responses with clear schemas provide feedback about what was found, what matched, and how results are organized.

The feedback loop for machines is: query → structured response → interpretation. When responses follow predictable schemas (JSON-LD, standard vocabularies), interpretation is straightforward. When responses are idiosyncratic or unstructured, the machine faces the equivalent of pressing a button and getting no indication whether anything happened.

## Conceptual Models: Mental Frameworks

One of Norman's most important concepts is the [conceptual model](https://melsatar.blog/2019/08/15/user-centric-design-principles/)—the mental representation of how something works. There are three models: the design model (designer's conception), the system image (what the device presents), and the user's model (what the user understands).

Good design ensures the system image clearly communicates the design model, allowing users to form accurate mental models.

For Machine Experience, AI systems form "conceptual models" through pattern recognition and training. When they encounter a webpage, they're building a model: this is the navigation, this is the main content, this is metadata, these are relationships between concepts.

The question is: does your content's "system image" (the actual markup and structure) clearly communicate the intended conceptual model?

If you use semantic HTML consistently, schema.org vocabularies appropriately, and clear document structure, you're presenting a system image that matches your design model. The AI's model aligns with your intent.

If you use generic `<div>` elements styled to look different, custom data attributes with non-standard meanings, and visual hierarchy that doesn't match semantic hierarchy, you've created a mismatch. The system image communicates one thing visually to humans but something different (or nothing) semantically to machines.

Norman emphasizes that ["when the design model and user model match, understanding is easy."](https://www.sharritt.com/CISHCIExam/norman.html) The same applies to machine processing: when the markup model (what you've coded) matches the semantic model (what concepts mean), processing is efficient and accurate.

## The Gulf of Execution: Can the Machine Do What You Intend?

[Norman's "gulf of execution"](https://www.nngroup.com/articles/two-ux-gulfs-evaluation-execution/) describes the gap between what a user wants to do and what the system allows them to do. Can you figure out how to accomplish your goal?

A VCR with a hidden or confusing record button creates a wide gulf of execution. The user knows what they want (record a show) but can't figure out how to execute that intent with the available controls.

For Machine Experience, the gulf of execution is the gap between what you want machines to understand from your content and what your markup allows them to extract.

You want AI systems to understand that Jane Smith is the author of this article, published on January 15, 2024, in the Technology category, related to three other articles, and citing five sources. But if that information exists only in visual presentation (author name in a styled span, date in a div with CSS formatting, relationships implied by proximity), you've created a wide gulf of execution.

The system can't "do" what you intend because the structure doesn't support the action.

Bridge the gulf by making actions explicit: use [Person schema](https://schema.org/Person) for the author, ISO 8601 dates in semantic elements, category taxonomies with clear relationships, explicit citation markup.

## The Gulf of Evaluation: Can the Machine Understand What Happened?

The ["gulf of evaluation"](https://www.nngroup.com/articles/two-ux-gulfs-evaluation-execution/) is the gap between the system's state and the user's ability to perceive and understand that state.

You flip a light switch—did the light turn on? Good feedback makes this obvious. Poor feedback (no sound, light not visible from switch position, delayed response) creates a gulf of evaluation.

For machines processing content, the gulf of evaluation is: after parsing your document, can the AI understand what it processed?

If your markup is ambiguous, the AI might successfully parse the syntax (no errors) but misunderstand the semantics. It "did something" but the result doesn't match intent.

Example: an AI parses a page and identifies text near an image as a caption. Is that correct? If you used `<figure>` and `<figcaption>` elements, yes—the relationship is explicit. If you used `<div class="image">` and `<p class="caption">`, maybe—it's inferring based on proximity and styling. The gulf of evaluation is the difference between "I know this is the caption" and "I think this might be the caption."

Norman writes that bridging the gulf of evaluation requires [feedback and a good conceptual model](https://medium.com/@gazdgabr/the-gulf-of-execution-and-evaluation-890fca716bb7). For machines: structured responses (feedback) and semantic clarity (conceptual model).

## The Seven Stages of Action: A Machine Processing Model

Norman describes a [seven-stage action cycle](https://www.simonwhatley.co.uk/writing/human-action-cycle-don-norman/) that humans go through when interacting with systems:

1. Goal formation
2. Planning the action
3. Specifying the action sequence
4. Executing the action
5. Perceiving the results
6. Interpreting the results
7. Comparing outcome to goal

We can map this to how AI systems process web content:

1. **Goal**: Extract information (e.g., find author, date, content)
2. **Planning**: Determine parsing strategy based on recognized patterns
3. **Specifying**: Identify which elements/attributes to examine
4. **Executing**: Parse HTML, extract content
5. **Perceiving**: Receive structured data from parsing
6. **Interpreting**: Map extracted data to semantic concepts
7. **Comparing**: Validate that extracted information makes sense

Each stage where your content structure is unclear or ambiguous creates friction. If the AI can't determine the parsing strategy (stage 2) because your structure doesn't match known patterns, the entire cycle becomes uncertain.

The design challenge is the same as for human interfaces: minimize cognitive load at each stage. Make goals achievable, actions obvious, and results interpretable.

## Design Principles for Machine Readers

Norman's design principles translate directly:

**[Visibility](https://figr.design/blog/the-design-of-everyday-things)**: Make functions discoverable. For machines: make structure visible through semantic markup, not just CSS.

**Good Conceptual Model**: Ensure the system image matches the design intent. For machines: ensure markup semantics match content meaning.

**Good Mapping**: Create clear relationships between structure and meaning. For machines: use standard schemas and conventional hierarchies.

**Feedback**: Communicate results of actions. For machines: provide structured responses and validation.

**Constraints**: Use limitations to guide correct actions. For machines: schema validation, required attributes, type enforcement.

These aren't new principles for MX—they're Norman's principles, applied to a different audience.

## Norman Doors and Norman Markup

Norman popularized the term "Norman door" for doors with confusing or contradictory affordances—handles that signal "pull" on doors that should be pushed, or vice versa.

We can coin "Norman markup": HTML that presents contradictory affordances to machines. A `<button>` that's actually a link. A `<div>` that functions as a navigation element. A table of data marked up as a list because it "looks better."

Just as Norman doors frustrate humans, Norman markup frustrates machines. The signifiers (element names) contradict the affordances (actual function).

The solution in both cases: use appropriate affordances and signifiers that align. For doors: handles that match the opening mechanism. For markup: semantic elements that match the content's purpose.

## Human-Centered Design, Machine-Centered Design

Norman introduced the term ["user-centered design"](https://en.wikipedia.org/wiki/The_Design_of_Everyday_Things) (later refined to "human-centered design")—designing based on the needs and capabilities of users rather than technical constraints or designer preferences.

Machine Experience is, fundamentally, machine-centered design. It means designing based on how machines actually process content, not on how we think they should process it or on what's easiest for developers.

Norman writes: ["Take people's difficulties as signifiers of where the product can be improved."](https://medium.com/10x-curiosity/don-norman-and-the-design-of-everyday-things-d187e6a81fd8)

For MX: take AI's difficulties as signifiers of where markup can be improved. When an AI system misinterprets your content, that's not an AI failure—it's a design failure. The structure didn't communicate clearly enough.

## The Paradox of Technology

Norman discusses the [paradox of technology](https://tianpan.co/blog/2025-08-31-the-design-of-everyday-things): adding features makes things more capable but also more complex. A smartphone can do thousands of things, making it immensely powerful but potentially overwhelming.

We face the same paradox with web content. Rich semantics, structured data, schema markup, ARIA attributes, microformats—these make content more capable (more machine-readable) but also more complex to implement.

Norman's solution: design for the way people actually are, not how we wish they were. Accept that complexity exists, but hide it through good interface design.

For MX: accept that semantic richness requires effort, but make it as simple as possible through conventions, patterns, and tools. Don't expect everyone to become schema.org experts. Create patterns that developers can follow mechanically.

## The Design of Everyday Markup

Norman's book is about everyday objects—doors, stovetops, telephones. Objects so common we don't think about their design until they frustrate us.

Web markup is our everyday object. We create it constantly, often without thinking deeply about whether it communicates clearly to machines. We focus on how it looks (visual design) more than what it means (semantic design).

But just as a poorly designed door handle frustrates every person who encounters it, poorly designed markup frustrates every AI system that processes it. The frustration is silent—machines don't complain—but it's real. Misinterpretation, incomplete extraction, failed relationships, incorrect assumptions.

Norman's insight was that design failures aren't user failures. When you can't figure out how to use a door, the problem isn't your intelligence—it's the door's design.

Similarly: when AI systems misunderstand your content, the problem usually isn't the AI's capability—it's the markup's design.

## Design for the Processor

The through-line in Norman's work is empathy for the user. Understand how people actually think, perceive, and act. Design for that reality, not for an idealized user who doesn't exist.

Machine Experience requires the same empathy for a different processor. Understand how AI systems actually parse, pattern-match, and process. Design for that reality, not for an idealized AI that perfectly understands human intent from any markup.

Norman's principles don't need translation for Machine Experience. They need application. The concepts remain the same:

- Make affordances clear
- Provide obvious signifiers
- Create good mappings
- Deliver feedback
- Support accurate conceptual models
- Bridge the gulfs of execution and evaluation

Whether your user is human or machine, these principles create better design. Because at their core, they're principles of clear communication—and that's valuable regardless of the receiver.

---

*Tom Hale is Principal Consultant at Digital Domain Technologies and is developing Machine Experience as a professional discipline for designing websites that serve both human and AI users.*

## Key Principles from The Design of Everyday Things

**On Affordances**: "An affordance is a relationship between the properties of an object and the capabilities of the agent that determines just how the object could possibly be used."

**On Signifiers**: "Affordances determine what actions are possible. Signifiers communicate where the action should take place. We need both."

**On Design Failures**: "When you have trouble with things—whether it's figuring out whether to push or pull a door or the arbitrary relationships between burners and controls on a stove—it's not your fault. Don't blame yourself: blame the designer."

**On User-Centered Design**: "Good design starts with an understanding of psychology and technology. Good design requires good communication, especially from machine to person, indicating what actions are possible, what is happening, and what is about to happen."

**On Conceptual Models**: "A good conceptual model allows us to predict the effects of our actions."

**The Seven Principles of Design**:
1. Discoverability - Can you figure out what actions are possible?
2. Feedback - Do you get continuous information about results?
3. Conceptual Model - Does the design project a good mental model?
4. Affordances - Are the proper affordances present?
5. Signifiers - Is it clear how to use the affordances?
6. Mappings - Are relationships clear between controls and effects?
7. Constraints - Do limitations guide correct behavior?

## Further Reading

**The Design of Everyday Things Resources:**
- [The Design of Everyday Things](https://www.amazon.com/Design-Everyday-Things-Revised-Expanded/dp/0465050654) by Don Norman (Revised Edition, 2013)
- [The Two UX Gulfs: Evaluation and Execution](https://www.nngroup.com/articles/two-ux-gulfs-evaluation-execution/) - Nielsen Norman Group
- [Norman's Seven Stages of Action](https://www.simonwhatley.co.uk/writing/human-action-cycle-don-norman/)
- [Nielsen Norman Group](https://www.nngroup.com/) - Don Norman's consultancy

**Affordances and Signifiers:**
- [Affordance and Signifier Explained](https://uxplanet.org/all-about-affordance-and-signifier-terms-by-don-norman-the-ux-pioneer-e0ea7b9b99f5) - UX Planet
- [James J. Gibson's Ecological Approach](https://en.wikipedia.org/wiki/Affordance) - Original affordance theory

**Machine Experience Resources:**
- [Schema.org](https://schema.org/) - Structured data vocabularies
- [Person Schema](https://schema.org/Person) - Structured author information
- [BreadcrumbList Schema](https://schema.org/BreadcrumbList) - Navigation hierarchy
- [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html) - MDN Web Docs
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) - Accessibility signifiers

**Related Concepts:**
- [Mental Models in UX](https://www.nngroup.com/articles/mental-models/) - Nielsen Norman Group
- [Mapping in Interface Design](https://www.interaction-design.org/literature/topics/mapping) - IxDF