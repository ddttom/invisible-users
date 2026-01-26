# Don't Make Me Think - AI Agent Analysis

A comprehensive analysis of Steve Krug's "Don't Make Me Think, Revisited" from the perspective of AI agents and machine usability

Generated: 2026-01-22
Source files: 19 report files + 18 modified chapter files
Total sections: 19

---

## Table of Contents

1. [Front Matter](#front-matter)
2. [Preface - About This Edition](#preface---about-this-edition)
3. [Table of Contents](#table-of-contents-section)
4. [Introduction - Read Me First](#introduction---read-me-first)
5. [Chapter 1 - Don't Make Me Think](#chapter-1---dont-make-me-think)
6. [Chapter 2 - How We Really Use the Web](#chapter-2---how-we-really-use-the-web)
7. [Chapter 3 - Billboard Design 101](#chapter-3---billboard-design-101)
8. [Chapter 4 - Animal, Vegetable, or Mineral](#chapter-4---animal-vegetable-or-mineral)
9. [Chapter 5 - Omit Needless Words](#chapter-5---omit-needless-words)
10. [Chapter 6 - Street Signs and Breadcrumbs](#chapter-6---street-signs-and-breadcrumbs)
11. [Chapter 7 - The Big Bang Theory of Web Design](#chapter-7---the-big-bang-theory-of-web-design)
12. [Chapter 8 - The Farmer and the Cowman Should Be Friends](#chapter-8---the-farmer-and-the-cowman-should-be-friends)
13. [Chapter 9 - Usability Testing on 10 Cents a Day](#chapter-9---usability-testing-on-10-cents-a-day)
14. [Chapter 10 - Mobile: It's Not Just a City in Alabama](#chapter-10---mobile-its-not-just-a-city-in-alabama)
15. [Chapter 11 - Usability as Common Courtesy](#chapter-11---usability-as-common-courtesy)
16. [Chapter 12 - Accessibility and You](#chapter-12---accessibility-and-you)
17. [Chapter 13 - Guide for the Perplexed](#chapter-13---guide-for-the-perplexed)
18. [Acknowledgments](#acknowledgments)
19. [Index](#index)

---

## Front Matter

### Front Matter Analysis

Front Matter contains title page, copyright, etc.

Modifications: No AI context applicable. File copied for completeness.

---

## Preface - About This Edition

### Preface Analysis

The Preface discusses how the landscape has changed (Mobile) since the first edition.

Key Findings:

1. **Landscape Shift:** The shift from Desktop → Mobile is now being mirrored by the shift from Human → Agent.
2. **Core Principles:** The core principles remain the same because Agent "brains" (LLMs), while alien, are effectively modeled on human output and therefore human logic (to an extent), but they lack the visual cortex's ability to "muddle through" bad design.

Modifications: Added a note about the "Flying Car" (Agents) and the need for proper instrumentation.

### Preface Insights

Line 143:
> We might not have flying cars yet, but we have digital agents. And just like you wouldn't trust a flying car with a blind pilot, you shouldn't trust your website to an agent if you haven't given it the proper instrumentation (semantic HTML).

---

## Table of Contents Section

### Table of Contents Analysis

The Table of Contents provides the structure of the book.

Key Findings:

1. **Structure:** Visual structure helps humans. XML structure helps machines.

Modifications: Added a note comparing the visual TOC to `sitemap.xml`, emphasizing the importance of the latter for AI discovery.

### Table of Contents Insights

Line 154:
> A visual Table of Contents is great for humans to get an overview. For Machines, the equivalent is `sitemap.xml`. If you have a great visual TOC but a broken sitemap, you are invisible to the machine. Ensure your `sitemap.xml` is comprehensive, up-to-date, and matches your actual content hierarchy.

---

## Introduction - Read Me First

### Introduction Analysis

The Introduction defines usability as "Common Sense" and "Not Rocket Surgery".

Key Findings:

1. **Common Sense vs. AI:** For an AI, "common sense" is just statistical likelihood derived from training data.
2. **Complexity:** Complicated, unique designs break this statistical predictability.

Modifications: Added a note equating "Common Sense" to "Statistical Probability" for agents.

### Introduction Insights

Line 182:
> "Common Sense" is essentially "Statistical Probability" for an AI. An agent trained on the entire internet develops a "sense" of what is common. If you follow conventions, the agent's "common sense" usually works. If you invent unique interactions, you break the probability chain, and the agent hallucinates or gets stuck.

---

## Chapter 1 - Don't Make Me Think

### Chapter 1 Analysis

The core principle of "Don't Make Me Think" translates directly to "Don't Make the AI Guess".

Key Findings:

1. **Ambiguity lowers probability:** When an AI encounters ambiguous navigation or labels, it lowers the probability of the correct next token/action. This can lead to hallucinations.
2. **Hidden Affordances:** "Mystery meat navigation" or unlabelled clickables are literally invisible to AI agents if they lack semantic attributes (like `role="button"` or `aria-label`).

Modifications:

I have added two specific notes to the text:

1. **On Question Marks:** Explaining that for machines, confusion leads to hallucination, not just delay.
2. **On Clickability:** Explaining that machines rely on semantics (`<div>` vs `<button>`) to know what is actionable.

### Chapter 1 Insights

Line 42:
> When an AI agent sees a question mark, it doesn't just pause—it calculates a probability. If that probability drops too low, it doesn't just get frustrated; it hallucinates. It makes things up. Your "clever" navigation isn't just annoying; it's a hallucination trigger.

Line 71:
> An AI agent doesn't have milliseconds of thought; it has semantic tags. If you make a `<div>` clickable with JavaScript but don't give it a `role="button"`, the agent doesn't even know it's there. It's not just thinking hard; it's staring at a blank wall.

---

## Chapter 2 - How We Really Use the Web

### Chapter 2 Analysis

Chapter 2 focuses on how users behave in reality: they scan, satisfice, and muddle through.

Key Findings:

1. **Scanning and Attention:** Humans scan for visual keywords. Agents "scan" using attention mechanisms, which are heavily dependent on semantic markers (headings) to efficiently process "tokens".
2. **Satisficing and Reasoning:** Humans pick the first "good enough" link. Agents pick the highest probability token/action. If navigation is clear, the distinction is minimal. If navigation is "clever" or obscure, the agent's probability distribution flattens, leading to random guesses (hallucinations).
3. **Muddling Through vs. Breaking:** Humans can adapt to broken interfaces physically (wiggle mouse, click around). Agents are brittle; if a semantic contract is broken (e.g., button is not a button), they cannot "muddle through" effectively—they simply fail.

Modifications:

Added three notes to the text:

1. **Machine Attention:** Explaining how semantic HTML provides the hook for the agent's attention mechanism.
2. **Greedy Decoding:** Comparing "satisficing" to the way LLMs predict the next most likely action.
3. **Brittleness:** Highlighting that machines cannot "muddle through" bad code as easily as humans can muddle through bad design.

### Chapter 2 Insights

Line 36:
> AI agents scan too. They rely on "attention mechanisms" that prioritize specific parts of your content. Semantic HTML headings (`<h1>`, `<h2>`) act as attention anchors. Without them, the AI is reading a wall of text with no hierarchy, increasing the cost of processing and the risk of missing the point.

Line 80:
> In AI terms, satisficing is "Greedy Decoding". The model picks the most likely next step. If your navigation is clear, the "correct" link has a 99% probability. If it's vague, the probability splits, and the agent might "hallucinate" a path that doesn't exist or give up entirely.

Line 133:
> Humans muddle through by using visual cues and trial-and-error. AI agents have limited "retries". If they click a button and nothing happens (because it's a `<div>` with no `role`), they don't wiggle the mouse or try double-clicking. They assume the action failed and mark your site as broken.

---

## Chapter 3 - Billboard Design 101

### Chapter 3 Analysis

Chapter 3 deals with visual conventions, hierarchies, and noise. Use of conventions is "Billboards 101".

Key Findings:

1. **Conventions = Probability:** Standard locations (logo left, nav top) are high-probability conventions. Breaking them disrupts the AI's training priors.
2. **Semantic Hierarchy:** Users see size/color. Machines rely on DOM structure and tags (`<h1>`). Visual hierarchy without semantic backing is invisible to the machine and breaks the "preprocessing" effect.
3. **Token Noise:** Visual noise (clutter) is token noise for agents. It crowds out the signal, filling the context window with junk.

Modifications:

Added three notes to the text:

1. **Training Data:** Framing "conventions" as the training data that agents rely on.
2. **Semantic Truth:** Emphasizing that visual hierarchy is a lie if it's not backed by semantic tags.
3. **Context Window:** Framing visual noise as "token noise" that consumes memory.

### Chapter 3 Insights

Line 20:
> Conventions aren't just friends; they are training data. AI models are trained on the "average" internet. If you put your navigation in the footer because it looks "clean", you break the statistical probability model the AI relies on to find its way. You aren't being innovative; you're being invisible.

Line 136:
> Users see big fonts; Machines see tags. If you make a paragraph look like a heading using CSS but keep it as a `<p>` tag, the AI sees it as body text. Your visual hierarchy must be mirrored by a *semantic* hierarchy (`<h1>` through `<h6>`). If they don't match, you're lying to the agent.

Line 241:
> Visual noise is token noise. Every popup, every "You might also like" widget, and every animated distinct element consumes the agent's "context window". If the signal-to-noise ratio drops too low, the agent runs out of memory before it finds the price.

---

## Chapter 4 - Animal, Vegetable, or Mineral

### Chapter 4 Analysis

Chapter 4 deals with "Mindless Choices" and clear categorization.

Key Findings:

1. **Mindless Clicks vs. Token Costs:** While humans just expend "mental energy" on ambiguous clicks, agents expend real money (tokens). Ambiguity increases the cost of the agent's journey because it forces backtracking.
2. **Disjoint Categories:** "Animal vs Vegetable" is good because the sets don't overlap. Overlapping categories confuse AI classification models, leading to lower confidence scores.
3. **Programmatic Association:** Hints and tips must be programmatically linked (`aria-describedby`) or the agent cannot associate the help text with the input field.

Modifications:

Added three notes to the text:

1. **Token Economics:** Explaining the financial cost of ambiguity for agents.
2. **Classification Confidence:** Why disjoint sets help AI models.
3. **DOM Association:** The need for `aria-describedby` to make help text "visible" to the agent's context.

### Chapter 4 Insights

Line 28:
> AI agents pay for clicks with tokens (and ultimately, your money). While "mindless" clicks are easy for them, they aren't free. However, an ambiguous click is worse—it's a probability cliff. If the agent takes the wrong path, it wastes 10x the tokens backtracking. Clarity saves cash.

Line 43:
> AI classification models love disjoint sets (Animal vs Vegetable). They hate overlapping sets (Home Office vs Small Business). If your categories aren't mutually exclusive, the agent's confidence score drops, and it eventually just guesses.

Line 99:
> Visual proximity isn't enough. If you put a helpful tip next to a form field, a human sees it. An agent only "sees" it if you use `aria-describedby` to link the tip to the input. Otherwise, the help text is just random noise floating in the DOM.

---

## Chapter 5 - Omit Needless Words

### Chapter 5 Analysis

Chapter 5 focuses on brevity and removing "happy talk".

Key Findings:

1. **Token Budget:** "Omit needless words" translates directly to "Conserve token budget". Agents have limited context windows (or the user pays per token). Fluff text dilutes the information density.
2. **Self-Documenting Code:** Instructions ("Click the blue button") are often brittle. If the design changes but the text doesn't, the agent is misled. The "instruction" should be in the code itself (`<button aria-label="Submit">`).

Modifications:

Added two notes to the text:

1. **Token Economics:** Explaining that words = tokens = money/memory.
2. **Code Instructions:** Why instructions in text are less effective for agents than semantic attributes.

### Chapter 5 Insights

Line 31:
> Reducing the word count isn't just about style; it's about context windows. Every "Welcome to our site" paragraph eats up tokens that could be used for pricing or product details. When an AI agent processes your page, it has a budget. Don't spend it on fluff.

Line 70:
> Instructions are worse than useless for agents; they are often misleading. Agents don't read "Click here to see more" instructions; they look for the `aria-label` or the `href`. If your instructions say one thing ("Click the red button") but your code says another (`<div class="red-btn">`), the agent fails. Make the interface self-documenting code.

---

## Chapter 6 - Street Signs and Breadcrumbs

### Chapter 6 Analysis

Chapter 6 covers navigation, search behaviour, and "wayfinding" (Trunk Test).

Key Findings:

1. **Search vs. Browse:** Agents are mostly search-dominant (if a search input is semantically available) or structure-dominant (DOM walking). If the search box is just a `div` or a complex JS widget, they get stuck.
2. **Breadcrumbs:** These are critical for agents to understand hierarchy if they land deep in a site (common with search results).
3. **Page Names:** The link text ("Hot Mashed Potatoes") must match the page title (`<h1>`). Discrepancies reduce confidence.

Modifications:

Added two notes to the text:

1. **Search Dominance:** Explaining that agents prioritize search if it's available and semantically correct.
2. **Page Contracts:** Emphasizing the link-title match as a confidence signal for the agent.

### Chapter 6 Insights

Line 81:
> Agents are almost exclusively "search-dominant" or "structure-dominant". They either search (if a search box is clearly labeled) or they parse the DOM tree (the "shelves"). If your search box is a `<div>` with an event listener, they can't ask for directions. They're wandering the aisles blind.

Line 477:
> This needs to be explicit. The `<title>` tag is the page name for the browser, but the `<h1>` tag is the page name for the agent. If they don't match, or if the `<h1>` is missing, the agent loses confidence that it arrived at the right destination.

---

## Chapter 7 - The Big Bang Theory of Web Design

### Chapter 7 Analysis

Chapter 7 covers the Home Page and its role in setting the "Big Picture" within milliseconds.

Key Findings:

1. **System Prompt:** The Home Page acts as the "System Prompt" for the agent's session. It sets the context. If the Home Page is confused, the agent enters the site with high entropy (confusion), making it harder to predict the right actions on subsequent pages.
2. **Taglines:** Taglines ("All the news that fits") are key descriptors for agents to classify the site's purpose/domain.

Modifications:

Added one major note to the text:

1. **System Prompt Metaphor:** Comparing the Home Page to the system prompt of an LLM.

### Chapter 7 Insights

Line 99:
> The Home Page is the "System Prompt" of your website. It sets the context for everything else. If your Home Page is cluttered and confusing, the agent starts its session with high entropy (confusion). If it's clear, the agent builds a strong predictive model for the rest of the site.

---

## Chapter 8 - The Farmer and the Cowman Should Be Friends

### Chapter 8 Analysis

Chapter 8 deals with resolving design debates and the myth of the "Average User".

Key Findings:

1. **Religious Debates:** Humans argue about "Look & Feel" vs "Functionality". Agents don't care about "Feel". They care about "Functionality" exposed via "Structure".
2. **No Average Agent:** Just as there is no average human user, there is no average agent. Some are smart (GPT-4), some are fast/dumb (small models). Some can see screenshots, some only read text.
3. **Standards:** The only common ground for the "Farmer" (Designer) and "Cowman" (Developer) to help the agent is strictly adhering to web standards.

Modifications:

Added one note:

1. **No Average Agent:** Warning against optimizing for a specific model version or type, and advocating for standards-based design to support the diverse ecosystem of agents.

### Chapter 8 Insights

Line 118:
> Same rule applies. There is no "Average Agent." A shopping bot from Google behaves differently than a research bot from OpenAI or a summarizer bot from Anthropic. Some process JS, some don't. Some use vision, some text-only. If you design for the "Average Agent," you fail them all. Design for standards (semantic HTML), and you support them all.

---

## Chapter 9 - Usability Testing on 10 Cents a Day

### Chapter 9 Analysis

Chapter 9 details the process of discount usability testing.

Key Findings:

1. **Synthetic Users:** You can "recruit" AI agents for free. Paste your HTML into an LLM and ask it to perform a task.
2. **Think Aloud Protocol:** This maps directly to "Chain of Thought" (CoT) prompting. Asking the model to explain its reasoning reveals why it might get stuck on a navigation element.
3. **Facilitation:** The developer facilitates the test by constructing the prompt.

Modifications:

Added two notes:

1. **Synthetic Testing:** How to use LLMs as test subjects.
2. **Chain of Thought:** Relating "Thinking Aloud" to LLM reasoning traces.

### Chapter 9 Insights

Line 302:
> You don't need a lab. You need a terminal. Paste your HTML into ChatGPT, Claude, and Llama. Ask them to perform a task: "Find the price of the socks." If they hallucinate, loop, or fail, you have a bug. This costs $0.10 in tokens, or free on local models.

Line 331:
> "Thinking Out Loud" is "Chain of Thought" (CoT). When testing with an LLM, prompt it to "Explain your reasoning step-by-step before determining the next action." This log is your usability report.

---

## Chapter 10 - Mobile: It's Not Just a City in Alabama

### Chapter 10 Analysis

Chapter 10 discusses Mobile considerations.

Key Findings:

1. **Hover:** The death of hover on mobile parallels the absence of hover for agents. Content must be discoverable without implicit "mouse-over" interactions.
2. **Flat Design:** While humans struggle with flat design's lack of affordances, agents only struggle if the code is also "flat" (non-semantic).
3. **Speed:** Agents are sensitive to latency because they run on timeouts and token costs. Slow sites might get abandoned by the crawler/agent.

Modifications:

Added one note:

1. **Hover:** Explicitly stating that hover states are invisible to agents.

### Chapter 10 Insights

Line 274:
> "Hover" is dead for mobile. It never existed for agents. An agent can't "hover". If you hide content, menus, or tooltips behind a hover state, they are invisible to the agent. Expecting an agent to infer it should hover (or focus) on an element to reveal content is a recipe for failure.

---

## Chapter 11 - Usability as Common Courtesy

### Chapter 11 Analysis

Chapter 11 introduces the concept of the "Reservoir of Goodwill".

Key Findings:

1. **Goodwill = Tokens:** In AI terms, goodwill is literally the agent's context window and step count. If you waste it, the agent fails.
2. **Hiding Information:** Hiding prices or shipping info causes the agent to burn steps searching, often leading to abandonment or hallucinated values.
3. **Printer Friendly:** Agents prefer "Printer Friendly" or "Reader Mode" versions of pages because they remove noise (ads, nav) and focus on content.

Modifications:

Added two notes:

1. **Reservoir of Goodwill:** Equating it to Token Limits and Max Steps.
2. **Printer Friendly:** Highlighting that text-optimized views are ideal for Machine Experience (MX).

### Chapter 11 Insights

Line 98:
> "Reservoir of Goodwill" = "Context Window" and "Max Steps". If your site is inefficient, you exhaust the agent's token budget (goodwill). If you make the agent click 10 times to find a price, you hit the "Max Steps" limit, and the agent errors out.

Line 228:
> "Printer Friendly" pages are Agent Friendly pages. Agents thrive on low-noise environments. If you offer a high-contrast text-only view for accessibility, the agent will prefer that over your React-heavy mega-menu nightmare.

---

## Chapter 12 - Accessibility and You

### Chapter 12 Analysis

Chapter 12 covers Accessibility (a11y) and its deep connection to Usability.

Key Findings:

1. **Scanning with Ears:** The chapter describes how blind users scan with their ears. This is the closest analogy to how an LLM agent consumes a web page (linear token stream).
2. **Headings:** Headings provide the tree structure for the agent.
3. **Low Hanging Fruit:** Alt text, labels, and headings are the minimum requirements for an agent to "see" your site.

Modifications:

Added one note:

1. **Scanning with Ears:** Highlighting that this behavior is identical to how Agents parse the DOM.

### Chapter 12 Insights

Line 194:
> "Scanning with your ears" is how agents consume the DOM. They read the HTML structure linearly or via heuristics. If your keywords aren't front-loaded in headers and links, the agent misses them or de-prioritizes them.

---

## Chapter 13 - Guide for the Perplexed

### Chapter 13 Analysis

Chapter 13 wraps up with advice on management and "Dark Patterns".

Key Findings:

1. **AI Readiness:** The new ROI argument for Accessibility/Usability is "AI Readiness".
2. **Labels in Fields:** Confirmed as an anti-pattern for agents, who may misinterpret the label as a value or lose context when it vanishes.

Modifications:

Added two notes:

1. **ROI:** Framing Usability as AI Readiness.
2. **Labels:** Reinforcing the danger of disappearing labels for agents.

### Chapter 13 Insights

Line 70:
> The new "ROI" is "AI Readiness." Tell your boss: "If we don't fix our semantic HTML, ChatGPT can't read our site, and we lose the 100 million users who search via AI." That's the new burning platform.

Line 271:
> Labels inside fields are a disaster for agents. The agent might think the field is already filled (with the label text), or the label might disappear when the agent "focuses" (programmatically interacts), leaving the agent blind to what the field is for.

---

## Acknowledgments

### Acknowledgments Analysis

The Acknowledgments section.

Modifications: No AI context applicable. File copied for completeness.

---

## Index

### Index Analysis

The Index for the book.

Modifications: No AI context applicable. File copied for completeness.

---

## Summary Statistics

- **Total sections analyzed:** 19
- **Sections with AI insights:** 16
- **Total "For the Machine" annotations:** 27
- **Key themes:**
  - Semantic HTML is critical for AI agent navigation
  - Token economics and context window limitations
  - Agents cannot "muddle through" bad design like humans
  - Accessibility patterns directly benefit AI agents
  - Standards-based design supports diverse agent ecosystems

---

**Document compiled from:**

- 19 report-*.md files
- 18 modified-*.md files with embedded AI annotations
- Source: `/Users/tomcranstoun/Documents/GitHub/invisible-users/scrap/think/chapters/`
- Generated: 2026-01-22
