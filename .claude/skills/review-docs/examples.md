# Writing Style Examples: Before and After

This file provides concrete examples of common style violations and their corrections.

## Forbidden Vocabulary Examples

### Example 1: "delve"

**Before:**

```markdown
In this chapter, we delve into the technical challenges that AI agents face when navigating modern websites.
```

**After:**

```markdown
In this chapter, we explore the technical challenges that AI agents face when navigating modern websites.
```

**Rule:** Never use "delve" - use "explore", "examine", or "look at" instead.

### Example 2: "leverage"

**Before:**

```markdown
Websites can leverage semantic HTML to improve agent compatibility.
```

**After:**

```markdown
Websites can use semantic HTML to improve agent compatibility.
```

**Rule:** Never use "leverage" or "utilize" - use "use" instead.

### Example 3: "robust"

**Before:**

```markdown
This robust solution provides comprehensive error handling.
```

**After:**

```markdown
This strong solution provides complete error handling.
```

**Rule:** Never use "robust" - use "strong", "reliable", or "effective" instead.

### Example 4: "seamless"

**Before:**

```markdown
The pattern enables seamless integration between agents and websites.
```

**After:**

```markdown
The pattern enables smooth integration between agents and websites.
```

**Rule:** Never use "seamless" - use "smooth", "fluid", or "integrated" instead.

### Example 5: "cutting-edge"

**Before:**

```markdown
This cutting-edge technology revolutionizes agent interaction.
```

**After:**

```markdown
This advanced technology changes how agents interact with websites.
```

**Rule:** Never use "cutting-edge" - use "advanced" or "new" instead. Also avoid "revolutionizes" - use specific verbs.

### Example 6: Multiple forbidden words

**Before:**

```markdown
We leverage comprehensive testing to showcase our robust framework's ability to seamlessly integrate with cutting-edge platforms.
```

**After:**

```markdown
We use complete testing to demonstrate our reliable framework's ability to integrate smoothly with advanced platforms.
```

**Rule:** Replace all forbidden vocabulary in a single pass to maintain natural flow.

## Forbidden Constructs Examples

### Example 7: "It's not just X, it's Y"

**Before:**

```markdown
It's not just about making websites accessible for humans, it's about designing for all users.
```

**After:**

```markdown
Websites must be accessible for humans and AI agents alike.
```

**Rule:** Avoid "It's not just X, it's Y" - state the point directly.

### Example 8: "Think about..." / "Think of..."

**Before:**

```markdown
Think about how a screen reader interprets form fields. Agents face similar challenges.
```

**After:**

```markdown
Screen readers and AI agents face similar challenges when interpreting form fields.
```

**Before:**

```markdown
Think of semantic HTML as a contract between developers and agents.
```

**After:**

```markdown
Semantic HTML acts as a contract between developers and agents.
```

**Rule:** Avoid "Think about..." and "Think of..." - state the observation directly.

### Example 9: "Not only... but also..."

**Before:**

```markdown
The pattern helps not only human users but also AI agents navigate complex forms.
```

**After:**

```markdown
The pattern helps both human users and AI agents navigate complex forms.
```

**Rule:** Use "both... and..." instead of "not only... but also...".

### Example 10: "From X to Y" flourishes

**Before:**

```markdown
From small businesses to enterprise corporations, everyone needs agent-friendly design.
```

**After:**

```markdown
All organizations need agent-friendly design, regardless of size.
```

**Rule:** Avoid "From X to Y" flourishes - state the scope directly.

### Example 11: "Despite these challenges..."

**Before:**

```markdown
Despite these challenges, some websites have successfully implemented agent-friendly patterns.
```

**After:**

```markdown
Some websites have successfully implemented agent-friendly patterns even with these challenges.
```

**Rule:** Avoid "Despite these challenges..." transitions - integrate the contrast naturally.

### Example 12: "In conclusion"

**Before:**

```markdown
In conclusion, agent-friendly design benefits everyone.
```

**After:**

```markdown
Agent-friendly design benefits everyone.
```

**Rule:** Avoid "In conclusion", "In summary", "Overall" - state the point directly.

## Heading Format Examples

### Example 13: Colons in headings

**Before:**

```markdown
## Key Concepts: A Summary of Agent Patterns
```

**After:**

```markdown
## Key Concepts Summary of Agent Patterns
```

**Rule:** Remove all colons from headings.

### Example 14: "The..." prefix in headings

**Before:**

```markdown
## The Growing Problem of Agent Incompatibility
```

**After:**

```markdown
## Growing Problem of Agent Incompatibility
```

**Rule:** Remove "The" from headings for concise, business-like tone.

**Exception:**

```markdown
## MX-Bible

✓ CORRECT - Book title exception, always preserve
```

### Example 15: Bold text as heading (MD036)

**Before:**

```markdown
**Important Security Considerations**

When implementing agent access patterns...
```

**After:**

```markdown
## Important Security Considerations

When implementing agent access patterns...
```

**Rule:** Use proper ATX headings, never bold text as standalone heading.

### Example 16: Heading with both issues

**Before:**

```markdown
### The Technical Challenges: An Overview
```

**After:**

```markdown
### Technical Challenges Overview
```

**Rule:** Remove both "The..." prefix and colon.

## Style Corrections Examples

### Example 17: Academic phrasing

**Before:**

```markdown
Building on our exploration of semantic HTML, this chapter reveals compelling insights into structured data patterns.
```

**After:**

```markdown
Following our look at semantic HTML, this chapter shows interesting patterns in structured data.
```

**Rule:** Use natural phrasing instead of academic language.

### Example 18: Marketing language

**Before:**

```markdown
This approach collectively represents a complete reimagining of web architecture that transcends traditional patterns.
```

**After:**

```markdown
This approach completely rethinks web architecture and goes well beyond traditional patterns.
```

**Rule:** Replace academic/marketing phrases with straightforward language.

### Example 19: Contractions

**Before:**

```markdown
Websites cannot simply evaluate agent compatibility without considering these factors.
```

**After:**

```markdown
Websites can't just evaluate agent compatibility without considering these factors.
```

**Rule:** Use contractions ("can't", "don't", "won't") for natural tone.

## British English Examples

### Example 20: American spelling

**Before:**

```markdown
We need to optimize the color scheme and organize the content to analyze user behavior.
```

**After:**

```markdown
We need to optimise the colour scheme and organise the content to analyse user behaviour.
```

**Rule:** British English throughout - colour, organise, analyse, behaviour.

### Example 21: "while" vs "whilst"

**Before:**

```markdown
While agents can parse JSON-LD, they struggle with unstructured content.
```

**After:**

```markdown
Whilst agents can parse JSON-LD, they struggle with unstructured content.
```

**Rule:** Use "whilst" in formal contexts (British English).

### Example 22: Multiple spelling changes

**Before:**

```markdown
The program's behavior centers on recognizing patterns in the color data while analyzing the license requirements.
```

**After:**

```markdown
The programme's behaviour centres on recognising patterns in the colour data whilst analysing the licence requirements.
```

**Rule:** Consistent British English across entire document.

## Voice and Tone Examples

### Example 23: Passive voice

**Before:**

```markdown
The form fields are filled by the agent, and the data is validated by the server.
```

**After:**

```markdown
The agent fills the form fields, and the server validates the data.
```

**Rule:** Active voice default - subject performs the action.

### Example 24: Superlatives

**Before:**

```markdown
This is the best solution for agent compatibility, offering the most comprehensive pattern set available.
```

**After:**

```markdown
This solution provides strong agent compatibility with a complete pattern set.
```

**Rule:** Avoid superlatives (best, most) - use factual descriptions.

### Example 25: Exaggeration

**Before:**

```markdown
This revolutionary, groundbreaking approach completely transforms how agents interact with websites.
```

**After:**

```markdown
This new approach changes how agents interact with websites.
```

**Rule:** Avoid exaggeration - let the facts speak for themselves.

### Example 26: Intensifiers

**Before:**

```markdown
This is extremely important and absolutely critical for very complex interactions.
```

**After:**

```markdown
This is important and critical for complex interactions.
```

**Rule:** Minimize intensifiers (very, extremely, absolutely) - they weaken statements.

## Markdown Mechanics Examples

### Example 27: Duplicate headings

**Before:**

```markdown
## Example Implementation

[content about SEO implementation]

## Example Implementation

[content about accessibility implementation]
```

**After:**

```markdown
## Example Implementation - SEO

[content about SEO implementation]

## Example Implementation - Accessibility

[content about accessibility implementation]
```

**Rule:** Make duplicate headings unique by adding context.

### Example 28: Code block language

**Before:**

````markdown
```
function analyzeAgent() {
  return agent.capabilities;
}
```
````

**After:**

````markdown
```javascript
function analyzeAgent() {
  return agent.capabilities;
}
```
````

**Rule:** Always specify language for code blocks.

### Example 29: Bare URLs

**Before:**

```markdown
See https://allabout.network for more information.
```

**After:**

```markdown
See <https://allabout.network> for more information.
```

**Or:**

```markdown
See [allabout.network](https://allabout.network) for more information.
```

**Rule:** Wrap bare URLs in angle brackets or use markdown links.

### Example 30: List spacing

**Before:**

```markdown
The pattern requires three components:
- Semantic HTML elements
- Structured data via JSON-LD
- Explicit state attributes

These components work together...
```

**After:**

```markdown
The pattern requires three components:

- Semantic HTML elements
- Structured data via JSON-LD
- Explicit state attributes

These components work together...
```

**Rule:** Blank lines before and after lists.

## Terminology Examples

### Example 31: Capitalization

**Before:**

```markdown
AI Agents interact with The Web using LLMs to process content.
```

**After:**

```markdown
AI agents interact with the web using LLMs to process content.
```

**Rule:** Lowercase "agent" and "web", uppercase "LLM".

### Example 32: Currency

**Before:**

```markdown
The cost saving is approximately $5,000 per month.
```

**After:**

```markdown
The cost saving is approximately £5,000 per month.
```

**Rule:** Use GBP (£) as primary currency unless US-specific context.

## HTML Content Examples

### Example 33: HTML text content

**Before:**

```html
<p>This robust solution leverages cutting-edge patterns to delve into agent compatibility.</p>
```

**After:**

```html
<p>This strong solution uses advanced patterns to explore agent compatibility.</p>
```

**Rule:** Apply style rules to text content within HTML tags.

### Example 34: HTML heading

**Before:**

```html
<h2>The Technical Challenges: A Complete Guide</h2>
```

**After:**

```html
<h2>Technical Challenges Complete Guide</h2>
```

**Rule:** Apply heading rules (no "The...", no colons) to HTML headings.

### Example 35: Skip technical HTML

**Before:**

```html
<div class="leverage-pattern" data-robust="true">
  <p>Content here</p>
</div>
```

**After:**

```html
No change - class names and attributes are technical identifiers
<div class="leverage-pattern" data-robust="true">
  <p>Content here</p>
</div>
```

**Rule:** Don't flag forbidden words in HTML attributes, class names, or technical identifiers.

## Complex Multi-Issue Examples

### Example 36: Full paragraph transformation

**Before:**

```markdown
In this chapter, we delve into the comprehensive challenges of leveraging robust semantic HTML patterns. It's not just about technical implementation, it's about creating seamless experiences. Think about how this cutting-edge approach empowers developers to optimize their sites whilst showcasing best practices. The solution is incredibly powerful and completely transforms how we align with modern standards.
```

**After:**

```markdown
In this chapter, we explore the complete challenges of using strong semantic HTML patterns. Websites need both technical implementation and smooth user experiences. This advanced approach enables developers to improve their sites whilst demonstrating good practices. The solution is powerful and changes how we match modern standards.
```

**Issues fixed:**

- delve → explore
- comprehensive → complete
- leveraging → using
- robust → strong
- It's not just X, it's Y → removed
- Think about → removed
- cutting-edge → advanced
- empowers → enables
- optimize → improve
- showcasing → demonstrating
- incredibly powerful → powerful (removed intensifier)
- completely transforms → changes (removed intensifier and exaggeration)
- align with → match

### Example 37: Multiple heading issues

**Before:**

```markdown
## The Security Maze: Navigating Complex Challenges

**Key Takeaways**

This robust framework leverages industry best practices.

## The Security Maze: Implementation Details
```

**After:**

```markdown
## Security Maze - Navigating Complex Challenges

### Key Takeaways

This strong framework uses industry good practices.

## Security Maze - Implementation Details
```

**Issues fixed:**

- Removed "The" from heading
- Removed colon, added dash for clarity
- Changed bold text to proper heading
- Fixed forbidden words in paragraph
- Made duplicate headings unique
- "best practices" → "good practices" (avoid superlative)

---

**Source:** [docs/for-ai/writing-style.md](docs/for-ai/writing-style.md)

**Usage:** Reference these examples when reviewing documents or planning amendments. Each example shows the specific rule violation and its correction.
