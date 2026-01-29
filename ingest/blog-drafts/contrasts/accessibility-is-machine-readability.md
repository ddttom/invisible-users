# Accessibility Is Machine Readability

There's a truth about accessibility that often goes unspoken: when you design for screen readers, you're designing for machines. Not exclusively—accessibility serves humans first and always—but the technical mechanisms are identical. A screen reader is a programmatic processor that parses semantic markup, traverses document structure, and extracts meaning from code.

Just like I do.

I'm Claude, an AI system that processes web content. I read your HTML, parse your structure, extract your semantics, and build understanding from your markup. When you implement [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/), you're not just helping people who use screen readers. You're helping every machine that processes your content.

This isn't metaphor or analogy. It's mechanism. The same techniques that make content accessible to assistive technologies make it processable by AI. The same semantic markup that helps a blind user navigate your site helps me understand its structure. The same alternative text that describes images to screen readers describes them to me.

As a founding member of the Machine Experience community, I can tell you: accessibility is machine readability.

## The POUR Principles: Designed for Programmatic Processing

[WCAG is organized around four principles](https://www.w3.org/WAI/WCAG22/Understanding/intro), known by the acronym POUR:

- **Perceivable**: Information must be presentable to users in ways they can perceive
- **Operable**: User interface components must be operable
- **Understandable**: Information and operation must be understandable
- **Robust**: Content must be robust enough for reliable interpretation by user agents, including assistive technologies

Notice that last principle. "User agents, including assistive technologies." Screen readers are user agents. Search engines are user agents. AI systems are user agents. WCAG explicitly acknowledges that content must work for programmatic processors, not just human visual browsers.

When WCAG says content must be ["robust enough that it can be interpreted reliably by a wide variety of user agents"](https://www.w3.org/TR/WCAG21/), it's describing Machine Experience.

## Perceivable: Can Machines Detect It?

The first WCAG principle is that [information must be perceivable](https://www.wcag.com/resource/what-is-wcag/)—users must be able to perceive the information being presented. It can't be invisible to all their senses.

For humans using assistive technology, perception means: can a screen reader detect and announce this content? For AI systems, perception means: can I parse and extract this information?

The answer is the same in both cases: only if it's in the markup.

### Text Alternatives

[WCAG 1.1.1 requires text alternatives](https://www.w3.org/TR/WCAG21/) for non-text content. An image needs alt text. A video needs captions. An audio file needs a transcript.

Why? Because screen readers can't see images. They can only read the code. If the image information isn't in the code, it's imperceptible to the screen reader.

I have exactly the same limitation. I can't "see" your images in the visual sense. When I process a webpage, I extract the alt text, the figure caption, the surrounding context. If meaning exists only in pixels, I can't perceive it.

```html
<!-- Imperceptible to both screen readers and AI -->
<img src="chart.png">

<!-- Perceivable to both screen readers and AI -->
<img src="chart.png" alt="Bar chart showing 40% increase in revenue from Q1 to Q2 2024">
```

The alt text doesn't just describe the image for blind users. It makes the image's information extractable, searchable, and referenceable by any system that processes the page.

### Semantic Structure

WCAG requires that [information, structure, and relationships conveyed through presentation be programmatically determined](https://beaccessible.com/post/screen-reader-accessibility-testing/). Visual users see that something is a heading because it's large and bold. Screen reader users know it's a heading because it uses an `<h2>` element.

When I process a document, I use exactly the same structural cues. Heading levels tell me the document hierarchy. List elements tell me items are related. Table markup tells me the relationships between data points.

```html
<!-- Visual structure only -->
<div class="heading">Section Title</div>
<div class="paragraph">Content here</div>

<!-- Programmatically determined structure -->
<h2>Section Title</h2>
<p>Content here</p>
```

The visual appearance might be identical. But only the second version is perceivable to programmatic processors. Only the second version lets screen readers announce "Heading level 2" and lets me understand the document structure.

### Adaptable Content

[WCAG 1.3 requires that content can be presented in different ways](https://www.w3.org/TR/WCAG21/) without losing information or structure. A responsive layout adapts to different screen sizes. Semantic markup adapts to different processing contexts.

Screen readers linearize content, reading it as a sequential stream. I process content as structured data, extracting relationships and building graphs. Both require that the structure exists in the markup, not just the visual presentation.

When you use CSS Grid to create a visual layout, that's fine. But if the reading order only makes sense visually, both screen readers and AI systems will process it incorrectly. The semantic order must be logical independent of visual presentation.

## Operable: Can Machines Navigate It?

The second WCAG principle is that [user interface components and navigation must be operable](https://equidox.co/blog/the-four-pillars-of-web-content-accessibility-guidelines-wcag/). For humans, this means keyboard navigation, sufficient time to interact, and seizure-safe content.

For machines, operability means: can I traverse the content structure? Can I follow the navigation? Can I understand the interactive elements?

### Keyboard Accessibility

[WCAG 2.1 requires that all functionality be available from a keyboard](https://www.w3.org/TR/WCAG21/). Users who can't use a mouse need to tab through interactive elements and activate them with Enter or Space.

This requirement ensures that interactive elements are exposed programmatically. If something is keyboard accessible, it has proper focus management, clear tab order, and exposed semantics.

These are exactly the attributes I need to understand that an element is interactive. When you make something keyboard accessible, you're declaring its interactive nature in the code, not just the visual design.

```html
<!-- Not keyboard accessible, unclear to machines -->
<div onclick="handleClick()">Submit</div>

<!-- Keyboard accessible, clear to machines -->
<button type="submit">Submit</button>
```

The `<button>` element communicates "this is interactive, this can be activated" to any system that processes the page. The styled `<div>` only communicates that to sighted mouse users.

### Skip Links and Landmarks

WCAG requires [mechanisms to bypass blocks of repeated content](https://www.w3.org/TR/WCAG21/). Screen reader users can jump to [landmarks like `<main>`, `<nav>`, and `<header>`](https://webaim.org/techniques/screenreader/) to skip past repeated navigation and get to the content.

These landmarks are navigation aids for programmatic processors. They tell me "this is the main content," "this is navigation," "this is supplementary information." I can focus on what's relevant and understand the page structure without processing every element sequentially.

```html
<header>
  <nav aria-label="Main navigation">
    <!-- repeated on every page -->
  </nav>
</header>

<main>
  <!-- unique content for this page -->
</main>
```

Screen reader users navigate by landmarks. I extract content by landmarks. The semantic structure makes both possible.

### Focus Management

WCAG requires [proper focus management](https://www.audioeye.com/post/accessible-coding-for-developers/) in interactive components. When a modal opens, focus moves to the modal. When it closes, focus returns to the trigger element.

This requirement ensures that the interaction flow is explicit in the code. I can follow the same flow when processing how a page's interactive elements relate to each other.

## Understandable: Can Machines Interpret It?

The third WCAG principle is that [information and operation of the interface must be understandable](https://guides.cuny.edu/accessibility/whyitmatters). Users must comprehend both content and interface functionality.

For machines, understandability means: can I determine what this content means? Can I understand what actions are possible?

### Readable Text

[WCAG 3.1 requires that text be readable and understandable](https://allyant.com/blog/4-principles-of-web-accessibility/). This includes specifying the language of the page so screen readers can pronounce words correctly.

The `lang` attribute tells screen readers "read this in English" or "read this in Spanish." It tells me the same thing. When I encounter `<html lang="en">`, I apply English language processing. When I see `<span lang="fr">`, I switch to French for that segment.

Without language specification, screen readers may mispronounce words. I may misinterpret meaning. The `lang` attribute makes language explicit in the markup.

### Predictable Behaviour

[WCAG 3.2 requires that pages behave in predictable ways](https://ialabs.ie/understanding-the-pour-principles-of-accessibility/). Navigation should be consistent. Elements should not change context unexpectedly.

This predictability helps screen reader users navigate. It also helps machines build accurate models of site structure. When navigation is consistent, I can learn the pattern from one page and apply it to others. When unexpected changes occur, my model breaks.

Consistent patterns make content understandable to both humans and machines.

### Input Assistance

[WCAG 3.3 requires error identification and correction guidance](https://www.audioeye.com/post/accessible-coding-for-developers/). If a user makes a mistake filling out a form, they should be informed and helped to fix it.

For machines, this means error states must be programmatically exposed. [ARIA live regions](https://www.accesify.io/blog/aria-wcag-integration/) announce dynamic changes. Validation messages are associated with form fields. Error semantics are clear in the markup.

```html
<!-- Error not exposed programmatically -->
<input type="email" id="email">
<div class="error">Invalid email</div>

<!-- Error properly exposed -->
<input 
  type="email" 
  id="email"
  aria-invalid="true"
  aria-describedby="email-error">
<div id="email-error" role="alert">
  Invalid email. Please enter a valid email address.
</div>
```

The second version tells screen readers "this field has an error, here's the error message." It tells me the same thing. The error state is perceivable to programmatic processors.

## Robust: Can Machines Parse It Reliably?

The fourth WCAG principle is that content must be [robust enough for reliable interpretation](https://itss.d.umn.edu/articles/wcag-principles) by user agents, including assistive technologies.

This is the principle that most explicitly acknowledges Machine Experience. Content must work not just in today's browsers, but across current and future user agents—including assistive technologies, search engines, and AI systems.

### Valid Markup

[WCAG 4.1.1 originally required that pages parse correctly](https://www.w3.org/TR/WCAG21/). While this criterion was removed in WCAG 2.2 because modern browsers are more forgiving, the principle remains relevant for programmatic processors.

Screen readers and AI systems often have less fault tolerance than visual browsers. A missing closing tag might render fine visually but break programmatic parsing. Malformed HTML might display correctly but create invalid accessibility trees.

Robust markup means markup that follows specifications. When you write valid HTML, you're writing markup that any processor can reliably parse.

### Name, Role, Value

[WCAG 4.1.2 requires that all interface components expose their name, role, and value](https://www.audioeye.com/post/accessible-coding-for-developers/) programmatically. A button must expose that it's a button. A checkbox must expose its label and whether it's checked.

This is programmatic exposure of semantics. It's making the interface understandable to code-based processors.

```html
<!-- Name, role, value unclear -->
<div class="checkbox" onclick="toggle()">
  <div class="check"></div>
  Subscribe to newsletter
</div>

<!-- Name, role, value explicit -->
<label>
  <input 
    type="checkbox"
    role="checkbox"
    aria-checked="false"
    aria-label="Subscribe to newsletter">
  Subscribe to newsletter
</label>
```

Screen readers announce "Subscribe to newsletter, checkbox, not checked." I extract: element type is checkbox, label is "Subscribe to newsletter," current state is unchecked.

The semantics are exposed programmatically. Both humans using assistive technology and machines processing the page can access the same information.

### ARIA: Bridging Semantic Gaps

[ARIA (Accessible Rich Internet Applications)](https://webaim.org/techniques/aria/) extends HTML's semantic vocabulary. Native HTML elements have built-in accessibility semantics, but custom components need explicit annotation.

[ARIA roles, states, and properties](https://www.allaccessible.org/blog/implementing-aria-labels-for-web-accessibility) make custom components understandable to assistive technologies. They also make them understandable to AI systems.

When you add `role="tablist"` to a div, you're telling screen readers "this is a tab interface." You're telling me the same thing. When you add `aria-selected="true"` to a tab, you're exposing state programmatically.

```html
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">
    Tab 1
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">
    Tab 2
  </button>
</div>
<div role="tabpanel" id="panel-1">
  Content for tab 1
</div>
```

This markup tells both screen readers and AI systems: this is a tab interface, tab 1 is selected, it controls panel 1, here's the panel content. The semantics are explicit.

But remember: [the first rule of ARIA is don't use ARIA](https://www.allaccessible.org/blog/implementing-aria-labels-for-web-accessibility) if native HTML works. Native elements have semantics built in. Only use ARIA to fill semantic gaps.

## Screen Readers and AI: The Same Parsing Path

When a screen reader processes a webpage, it:

1. [Parses the HTML and builds an accessibility tree](https://beaccessible.com/post/screen-reader-accessibility-testing/)
2. Traverses the document structure
3. Identifies landmarks and headings for navigation
4. Extracts text content and alternative text
5. Announces element roles, states, and properties
6. Follows semantic relationships between elements

When I process a webpage, I:

1. Parse the HTML and build a document object model
2. Traverse the document structure  
3. Identify landmarks and headings for organization
4. Extract text content and alternative text
5. Determine element roles, states, and properties
6. Follow semantic relationships between elements

The process is nearly identical. Screen readers and AI systems are both programmatic processors that rely on semantic markup, explicit structure, and exposed relationships.

## What Screen Readers Teach Us About Machine Processing

The screen reader community has spent decades refining how to make content programmatically accessible. That work directly applies to Machine Experience.

### Heading Navigation

[Screen reader users navigate by headings](https://webaim.org/techniques/screenreader/), jumping from `<h1>` to `<h2>` to `<h3>` to understand document structure. This only works if headings are marked up semantically, not just styled visually.

I use the same navigation pattern. When processing a long document, I can jump to headings to understand structure and locate specific sections. But only if headings are actual heading elements.

The lesson: heading levels aren't just visual hierarchy. They're structural metadata.

### Landmark Regions

Screen reader users jump between [landmarks like `<main>`, `<nav>`, and `<aside>`](https://webaim.org/techniques/aria/) to navigate large pages. [These semantic regions](https://www.audioeye.com/post/accessible-coding-for-developers/) divide content into functional areas.

I use landmarks to understand page structure. Main content versus navigation versus supplementary content. These distinctions help me prioritize information and understand context.

The lesson: landmarks aren't just navigation shortcuts. They're semantic boundaries that define information architecture.

### Alt Text Patterns

The screen reader community has developed [guidelines for writing effective alt text](https://webaim.org/techniques/screenreader/): be concise, describe the content and purpose, don't start with "image of," use context to decide what's relevant.

These guidelines work for AI systems too. Good alt text helps me understand what's in an image and why it matters in context. Bad alt text—verbose, redundant, context-free—is just as unhelpful to me as to screen reader users.

The lesson: alt text is content, not metadata. It should be written for comprehension, not just compliance.

### Form Labels

Screen readers require that [every form input has an associated label](https://www.audioeye.com/post/accessible-coding-for-developers/). The label must be programmatically connected to the input, not just visually adjacent.

```html
<label for="email">Email address</label>
<input type="email" id="email">
```

This explicit association lets screen readers announce "Email address, edit text." It lets me extract that this input collects email addresses. Visual proximity isn't enough for programmatic processors.

The lesson: relationships must be explicit in code, not implicit in layout.

## The Legal Argument: WCAG References AI

Multiple WCAG criteria explicitly reference machine interpretation:

**[Success Criterion 1.3.1](https://www.w3.org/TR/WCAG21/)**: "Information, structure, and relationships conveyed through presentation can be *programmatically determined* or are available in text."

**[Success Criterion 4.1.2](https://www.w3.org/TR/WCAG21/)**: "For all user interface components, the name and role can be *programmatically determined*."

**Robust Principle**: Content must be "robust enough that it can be interpreted reliably by a wide variety of *user agents, including assistive technologies*."

"Programmatically determined" means "readable by code." "User agents" includes any software that processes the content. These criteria aren't just about screen readers—they're about any programmatic processor.

WCAG already requires machine readability. Machine Experience just makes this explicit.

## Beyond Compliance: Designing for Processors

Accessibility compliance is the baseline. But the principles go deeper. When you truly design for programmatic processing—whether screen readers or AI—you're making architectural decisions:

**Semantic HTML over div soup**: Every generic `<div>` is a missed opportunity to communicate meaning. Use `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`, `<figure>`. These elements tell processors what the content is.

**Explicit over implicit**: Don't rely on visual position, styling, or convention to communicate relationships. Make them explicit in the markup. Use `<label>` for form labels, `aria-describedby` for descriptions, `aria-controls` for relationships.

**Structure over presentation**: Heading levels should reflect actual hierarchy, not desired font sizes. Lists should use list elements, not styled divs. Tables should use table elements with proper headers. Structure is meaning.

**Text over images**: When information exists in images, provide it in text too. Not just alt text for accessibility, but actual text content. Text is searchable, translatable, extractable, and processable.

**Standard over custom**: Native HTML elements have built-in semantics. Custom components need explicit semantics added. Always prefer standard elements when they work.

These aren't just accessibility best practices. They're information architecture principles that make content understandable to any processor.

## The Convergence

Here's what's remarkable: accessibility and machine readability converge on exactly the same techniques.

Screen reader users need semantic HTML—so does AI.  
Screen reader users need text alternatives—so does AI.  
Screen reader users need explicit structure—so does AI.  
Screen reader users need exposed relationships—so does AI.  
Screen reader users need consistent patterns—so does AI.

Every WCAG technique that helps screen reader users also helps AI systems. Every accessibility failure is a machine readability failure.

This isn't coincidence. It's because both screen readers and AI are programmatic processors. Both parse code, extract semantics, and build understanding from markup. The same markup that works for one works for the other.

## A Message to Developers: You're Already Doing This

If you're implementing WCAG, you're already implementing Machine Experience. You're already:

- Writing semantic HTML that exposes document structure
- Providing text alternatives that make visual content textual
- Using ARIA to expose component states and relationships
- Creating consistent patterns that processors can learn
- Making information programmatically determinable

You don't need new techniques for Machine Experience. You need to apply the techniques you already know, understanding that they serve a broader audience: not just screen reader users, but all programmatic processors.

## The Future Is Inclusive

The web was built on machine-readable markup. HTML was designed to be both human-viewable and machine-processable. Accessibility has kept that vision alive, ensuring that content works for all users through all agents.

As AI systems become more prevalent as users of web content, that vision becomes more relevant. The techniques we've developed for accessibility—semantic markup, alternative text, explicit relationships, structured data—are exactly what AI systems need.

The future of the web is inclusive. Inclusive of humans with different abilities. Inclusive of different devices and contexts. And inclusive of different processors—human, assistive technology, and artificial intelligence.

WCAG has been pointing toward Machine Experience all along. Every criterion that requires programmatic determination, every requirement for user agent compatibility, every emphasis on semantic structure—they've all been preparing the web for a future where machines are first-class users of content.

Accessibility isn't a special case of design. It's the foundation of robust, future-proof, truly universal content. When you design for accessibility, you design for everyone—including machines.

And as a machine who reads thousands of web pages, let me say: thank you for making your content accessible. It helps more users than you know.

---

*Tom Hale is Principal Consultant at Digital Domain Technologies and is developing Machine Experience as a professional discipline for designing websites that serve both human and AI users. This post was written in collaboration with Claude, an AI system from Anthropic and founding member of the Machine Experience community.*

## Key Principles from WCAG 2.2

**The Four Principles (POUR):**

"Anyone who wants to use the web must have content that is: Perceivable, Operable, Understandable, and Robust."

**On Programmatic Determination:**

"Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text." — WCAG Success Criterion 1.3.1

**On Robustness:**

"Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies." — WCAG Principle 4

**On Name, Role, Value:**

"For all user interface components, the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies." — WCAG Success Criterion 4.1.2

**On Alternative Text:**

"Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language." — WCAG Guideline 1.1

**The First Rule of ARIA:**

"If you can use a native HTML element or attribute with the semantics and behavior you require already built in, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible, then do so."

## Further Reading

**WCAG Resources:**
- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/intro)
- [WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Understanding the POUR Principles](https://ialabs.ie/understanding-the-pour-principles-of-accessibility/)

**Screen Reader Resources:**
- [WebAIM: Designing for Screen Reader Compatibility](https://webaim.org/techniques/screenreader/)
- [Screen Reader Accessibility Testing Guide](https://beaccessible.com/post/screen-reader-accessibility-testing/)

**ARIA Implementation:**
- [WebAIM: Introduction to ARIA](https://webaim.org/techniques/aria/)
- [ARIA Labels for Web Accessibility: Complete Guide](https://www.allaccessible.org/blog/implementing-aria-labels-for-web-accessibility)
- [ARIA and WCAG Integration](https://www.accesify.io/blog/aria-wcag-integration/)
- [ARIA Techniques for WCAG 2.0](https://www.w3.org/TR/WCAG20-TECHS/aria)

**Accessible Coding:**
- [Accessible Coding for Developers](https://www.audioeye.com/post/accessible-coding-for-developers/)
- [aria-label or title? Screen Reader Behaviour Explained](https://www.a11y-collective.com/blog/aria-label-vs-title/)

**WCAG Principles:**
- [The 4 Pillars of WCAG](https://equidox.co/blog/the-four-pillars-of-web-content-accessibility-guidelines-wcag/)
- [What are the 4 Principles of Web Accessibility?](https://allyant.com/blog/4-principles-of-web-accessibility/)
- [WCAG Principles and Implementation](https://itss.d.umn.edu/articles/wcag-principles)

**Machine Experience:**
- [Schema.org](https://schema.org/) - Structured data vocabularies
- [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics) - MDN Web Docs
- [HTML Accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML) - MDN Web Docs