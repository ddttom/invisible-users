# Writing Style Guide: The Invisible Users

**Book Purpose:** "The Invisible Users" examines how modern web interfaces fail AI agents and proposes solutions that benefit both automated and human users. **It is not a book about AI, HTML, or coding; it is for business first, though technical roles are catered for.** The central thesis is the **Convergence Principle**: patterns that break AI agents also harm humans with accessibility needs. Solving for agents improves the web for everyone.

**Primary Audience:**

- **The Full Digital Team**: Developers, System Architects, Product Owners, Project Managers, UX Designers, Content Strategists, and QA Engineers.
- **Business Leaders**: CTOs, CMOs.

The narrative must address the "Why" and "What" at a strategic level whilst providing the "How" for the execution team.

**Technical Scope:** High-level strategic explanation for the main text; deep technical implementation details are restricted to specific sections (see below).

This guide defines the voice, tone, and technical standards for the manuscript.

---

## 1. Collaborative Instructions

We are writing this book together.

- **Follow Instructions:** If code is present, keep it exact.
- **Adaptability:** Allow for user prompts to guide content generation.
- **Technical Stack:** JavaScript, HTML5, JSON-LD, Playwright. Keep code simple with minimal dependencies.
- **Linting:** After creating or editing any markdown file, always run `markdownlint` with the project config file: `npx markdownlint -c config/.markdownlint.json <file.md>` or use npm scripts: `npm run lint:markdown` / `npm run lint:markdown:fix`

---

## 2. Content Integration Rules

**Rule:** When new topics (e.g., SEO, security) are introduced via prompt:

1. **Integrate, Don't Expand:** Weave the content into existing sections naturally. Do **not** add extra "value" or fluff. Keep it proportional.
2. **No New Chapters:** Do **not** create a new chapter unless the prompt explicitly requests it. Find the best existing home.
3. **Update Glossary:** Always check and update `packages/bible/Glossary.md` with any new terms discovered or definitions created during the process.

---

## 3. Core Writing Rules

- **British English:** Use British spelling and phrasing (e.g., *optimisation*, *centre*, *programme*).
- **Tone:** Concise, calm, concrete. Speak as a domain expert.
- **Voice:**
  - **Active voice** is the default.
  - **Third person** for analysis and technical explanation.
  - **First person ("I")** only for specific personal insights.
- **Formatting:** No colons in headers. Use short dashes (-) only.

---

## 4. Audience & Technical Segmentation

**Rule:** Write for a **Business Leader / Strategic** audience by default. Focus on commercial impact, risk, and opportunity. Avoid getting bogged down in implementation details in the main narrative.

**Technical Depth Locations:**
Deep technical content (code, specific implementation patterns) is **only** permitted in:

- **Chapter 12:** Technical Advice
- **Chapter 13:** What Agent Creators Must Build
- **Appendices A-L:** (Cookbooks, HTML Guides, Patterns)
- **"Code-Ex" Blocks:** Distinct, isolated blocks of code examples within other chapters (kept brief).

**Main Chapters (1-11):**

- Focus on the *business problem* and *high-level solution*.
- Use analogies rather than code.
- Direct readers to the Appendices for the "How".

---

## 5. Forbidden Vocabulary

**Never** use these words. Find a simpler or more specific alternative.

| Forbidden Word | Replacement |
| :--- | :--- |
| align | connect, match, fit |
| crucial / pivotal | important, critical, central |
| cutting-edge | advanced, new |
| delve | explore, examine, look at |
| elaborate | explain, detail |
| emphasise / highlight / underscore | note, point out, stress |
| empower / foster | enable, help, let |
| endure / enduring | lasting, long-term |
| enhance / optimise | improve, fix, make better |
| garner | gather, get |
| holistic / comprehensive | full, complete, total |
| intricate | complex, detailed |
| interplay | mix, connection |
| leverage / utilize | use |
| myriad / plethora | many, numerous |
| robust | strong, reliable |
| seamless | smooth, fluid |
| showcase | show, demonstrate |
| streamline | simplify |
| tapestry | mix, collection |
| the lens | the focus, the perspective |

---

## 6. Forbidden Constructs

Avoid these specific phrases and patterns:

- "It's not just X, it's Y"
- "Think about..."
- "Not only... but also..."
- "From X to Y" flourishes
- Rule-of-three padding (e.g., "fast, scalable, and secure")
- "Despite these challenges..."
- "In conclusion / In summary / Overall"
- "Challenges and future prospects"
- "Let's walk through..."
- "It is important to remember..."
- **Headings starting with "The..."**: Generally, remove "The" from headings for a more concise, business-like tone (e.g., "The Security Maze" -> "Security Maze").
  - **Exceptions**:
    - **ALWAYS** preserve "The" in the book title: **"The Invisible Users"**.
    - Preserve "The" if removing it makes the heading grammatically incorrect or awkward (e.g., "The Web We Built", "The Price That Grew").

---

## 7. Style Corrections

Use natural phrasing instead of academic or marketing variations.

| Bad | Good |
| :--- | :--- |
| "Building on our exploration..." | "Following our look at..." |
| "Reveals compelling insights" | "Shows interesting things" |
| "Collectively represent a complete reimagining" | "Together completely rethink" |
| "Transcends traditional X" | "Goes well beyond traditional X" |
| "Perhaps the most radical departure" | "Makes perhaps the biggest break" |
| "Demonstrates remarkable viability" | "Shows how well this works" |
| "Illustrates a broader industry pattern" | "Shows a broader industry trend" |
| "Cannot simply evaluate" | "Can't just evaluate" |
| "Provides a template" | "Provides a good example" |

---

## 8. Terminology & Standards

**Capitalization & Spelling:**

- **AI agent:** Lowercase 'a' in agent (unless starting a sentence).
- **the web:** Lowercase 'w' (not "The Web").
- **LLM:** Acronym for Large Language Model (define on first use if necessary).
- **Currency:** Use **GBP (£)** as the primary currency for examples. Use USD ($) only for US-specific case studies.

**Markdown Mechanics:**

- **Headings:** Use ATX style (`# Heading`) only. **Never** use bold text (`**Heading**`) as a heading (prevents linting errors).
- **Duplicate Headings:** Avoid using the exact same heading text multiple times in the same file.
- **Lists:** Ensure blank lines surround all lists.

**Alerts:**
Use GitHub-style alerts for side notes or warnings. Do not use generic blockquotes.

> [!NOTE]
> Use this for neutral info or additional context.

<!-- -->

> [!IMPORTANT]
> Use this for critical information the user must not miss.

<!-- -->

> [!WARNING]
> Use this for dangerous actions or breaking changes.

**EDS Markdown Metadata Tables:**

EDS (Adobe Edge Delivery Services) metadata tables preserve structured metadata in markdown files. This repository uses the EDS convention for markdown files that need machine-readable metadata.

- **Format:** Table with `metadata` title row and key-value pairs
- **Placement:** Top (frontmatter for AI/build tools) or bottom (footnote for humans)
- **Linting:** MD060 warnings for `:----` alignment markers are intentional (EDS standard format)
- **Purpose:** Preserves metadata that would be lost in HTML-to-markdown conversion
- **Usage:** See Appendix L (Pattern 4) for complete implementation guide

**Example:**

```markdown
| metadata |  |
| :---- | :---- |
| title | Document Title |
| author | Tom Cranstoun |
| publication-date | 17/Jan/2026 |
| jsonld | article |
```

**When reviewing markdown files:** Recognize metadata tables and do not flag as formatting issues. These tables provide essential context for AI agents and build tools.

---

## 9. AI Pattern Detection and Humanization

This section identifies patterns commonly found in AI-generated text and provides guidance on creating writing with genuine human voice. The goal is twofold: **remove AI "slop"** (mechanical patterns) and **inject personality** (authentic human characteristics).

**Purpose:**

- Identify the 24 most common AI-generated writing patterns
- Replace sterile, algorithmic phrasing with natural alternatives
- Add voice, rhythm, and personality to text
- Preserve meaning whilst improving readability

**Note:** Some patterns overlap with Sections 5-7 (Forbidden Vocabulary, Forbidden Constructs, Style Corrections). Cross-references are provided where applicable.

### Personality and Soul

Avoiding AI patterns is only half the work. Sterile, voiceless writing is just as obvious as slop. Good writing has a human behind it.

**Signs of soulless writing (even if technically "clean"):**

- Every sentence is the same length and structure
- No opinions, just neutral reporting
- No acknowledgment of uncertainty or mixed feelings
- No first-person perspective when appropriate
- No humour, no edge, no personality
- Reads like a Wikipedia article or press release

**How to add voice:**

1. **Have opinions.** Don't just report facts - react to them. "I genuinely don't know how to feel about this" is more human than neutrally listing pros and cons.

2. **Vary your rhythm.** Short punchy sentences. Then longer ones that take their time getting where they're going. Mix it up.

3. **Acknowledge complexity.** Real humans have mixed feelings. "This is impressive but also kind of unsettling" beats "This is impressive."

4. **Use "I" when it fits.** First person isn't unprofessional - it's honest. "I keep coming back to..." or "Here's what gets me..." signals a real person thinking.

5. **Let some mess in.** Perfect structure feels algorithmic. Tangents, asides, and half-formed thoughts are human.

6. **Be specific about feelings.** Not "this is concerning" but "there's something unsettling about agents churning away at 3am whilst nobody's watching."

**Example transformation:**

Before (clean but soulless):

> The experiment produced interesting results. The agents generated 3 million lines of code. Some developers were impressed whilst others were sceptical. The implications remain unclear.

After (has a pulse):

> I genuinely don't know how to feel about this one. 3 million lines of code, generated whilst the humans presumably slept. Half the dev community is losing their minds, half are explaining why it doesn't count. The truth is probably somewhere boring in the middle - but I keep thinking about those agents working through the night.

### Content Patterns

These patterns artificially inflate significance, add promotional language, or rely on vague attributions.

#### 1. Undue Emphasis on Significance, Legacy, and Broader Trends

**Words to watch:** stands/serves as, is a testament/reminder, vital/significant/key role/moment, reflects broader, symbolising its ongoing/enduring/lasting, contributing to the, setting the stage for, marking/shaping the, represents/marks a shift, key turning point, evolving landscape, focal point, indelible mark, deeply rooted

**Cross-reference:** See Section 5 (Forbidden Vocabulary) for "crucial/pivotal", "endure/enduring"

**Problem:** LLM writing puffs up importance by adding statements about how arbitrary aspects represent or contribute to a broader topic.

**Before:**

> The Statistical Institute of Catalonia was officially established in 1989, marking a pivotal moment in the evolution of regional statistics in Spain. This initiative was part of a broader movement across Spain to decentralise administrative functions and enhance regional governance.

**After:**

> The Statistical Institute of Catalonia was established in 1989 to collect and publish regional statistics independently from Spain's national statistics office.

---

#### 2. Undue Emphasis on Notability and Media Coverage

**Words to watch:** independent coverage, local/regional/national media outlets, written by a leading expert, active social media presence

**Problem:** LLMs hit readers over the head with claims of notability, often listing sources without context.

**Before:**

> Her views have been cited in The New York Times, BBC, Financial Times, and The Hindu. She maintains an active social media presence with over 500,000 followers.

**After:**

> In a 2024 New York Times interview, she argued that AI regulation should focus on outcomes rather than methods.

---

#### 3. Superficial Analyses with -ing Endings

**Words to watch:** highlighting/underscoring/emphasising..., ensuring..., reflecting/symbolising..., contributing to..., cultivating/fostering..., encompassing..., showcasing...

**Cross-reference:** See Section 5 (Forbidden Vocabulary) for "emphasise/underscore", "foster", "showcase"

**Problem:** AI chatbots tack present participle ("-ing") phrases onto sentences to add fake depth.

**Before:**

> The temple's colour palette of blue, green, and gold resonates with the region's natural beauty, symbolising Texas bluebonnets, the Gulf of Mexico, and the diverse Texan landscapes, reflecting the community's deep connection to the land.

**After:**

> The temple uses blue, green, and gold colours. The architect said these were chosen to reference local bluebonnets and the Gulf coast.

---

#### 4. Promotional and Advertisement-like Language

**Words to watch:** boasts a, vibrant, rich (figurative), profound, nestled, in the heart of, groundbreaking (figurative), renowned, breathtaking, must-visit, stunning

**Cross-reference:** See Section 5 (Forbidden Vocabulary) for "cutting-edge", Section 7 (Style Corrections) for academic/marketing language

**Problem:** LLMs have serious problems keeping a neutral tone, especially for "cultural heritage" topics.

**Before:**

> Nestled within the breathtaking region of Gonder in Ethiopia, Alamata Raya Kobo stands as a vibrant town with a rich cultural heritage and stunning natural beauty.

**After:**

> Alamata Raya Kobo is a town in the Gonder region of Ethiopia, known for its weekly market and 18th-century church.

---

#### 5. Vague Attributions and Weasel Words

**Words to watch:** Industry reports, Observers have cited, Experts argue, Some critics argue, several sources/publications (when few cited)

**Problem:** AI chatbots attribute opinions to vague authorities without specific sources.

**Before:**

> Due to its unique characteristics, the Haolai River is of interest to researchers and conservationists. Experts believe it plays a crucial role in the regional ecosystem.

**After:**

> The Haolai River supports several endemic fish species, according to a 2019 survey by the Chinese Academy of Sciences.

---

#### 6. Outline-like "Challenges and Future Prospects" Sections

**Words to watch:** Despite its... faces several challenges..., Despite these challenges, Challenges and Legacy, Future Outlook

**Cross-reference:** See Section 6 (Forbidden Constructs) for "Despite these challenges..."

**Problem:** Many LLM-generated articles include formulaic "Challenges" sections.

**Before:**

> Despite its industrial prosperity, Korattur faces challenges typical of urban areas, including traffic congestion and water scarcity. Despite these challenges, with its strategic location and ongoing initiatives, Korattur continues to thrive as an integral part of Chennai's growth.

**After:**

> Traffic congestion increased after 2015 when three new IT parks opened. The municipal corporation began a stormwater drainage project in 2022 to address recurring floods.

---

### Language and Grammar Patterns

These patterns reveal mechanical text generation through unnatural phrasing and excessive formality.

#### 7. Overused "AI Vocabulary" Words

**High-frequency AI words:** Additionally, align with, key (adjective), landscape (abstract noun), valuable

**Note:** Many AI vocabulary words are already covered in Section 5 (Forbidden Vocabulary): crucial/pivotal, delve, emphasise/highlight/underscore, endure/enduring, enhance/optimise, leverage/utilize, robust, seamless/streamline, showcase, holistic/comprehensive, tapestry, intricate, interplay, myriad/plethora, garner

**Problem:** These words appear far more frequently in post-2023 text. They often co-occur.

**Before:**

> Additionally, a distinctive feature of Somali cuisine is the incorporation of camel meat. An enduring testament to Italian colonial influence is the widespread adoption of pasta in the local culinary landscape, showcasing how these dishes have integrated into the traditional diet.

**After:**

> Somali cuisine also includes camel meat, which is considered a delicacy. Pasta dishes, introduced during Italian colonisation, remain common, especially in the south.

---

#### 8. Avoidance of "is"/"are" (Copula Avoidance)

**Words to watch:** serves as/stands as/marks/represents [a], boasts/features/offers [a]

**Problem:** LLMs substitute elaborate constructions for simple copulas.

**Before:**

> Gallery 825 serves as LAAA's exhibition space for contemporary art. The gallery features four separate spaces and boasts over 3,000 square feet.

**After:**

> Gallery 825 is LAAA's exhibition space for contemporary art. The gallery has four rooms totalling 3,000 square feet.

---

#### 9. Negative Parallelisms

**Pattern:** "Not only...but..." or "It's not just about..., it's..."

**Cross-reference:** See Section 6 (Forbidden Constructs) for "Not only... but also..." and "It's not just X, it's Y"

**Problem:** Constructions like "Not only...but..." are overused.

**Before:**

> It's not just about the beat riding under the vocals; it's part of the aggression and atmosphere. It's not merely a song, it's a statement.

**After:**

> The heavy beat adds to the aggressive tone.

---

#### 10. Rule of Three Overuse

**Pattern:** Forcing ideas into groups of three to appear comprehensive

**Cross-reference:** See Section 6 (Forbidden Constructs) for "Rule-of-three padding"

**Problem:** LLMs force ideas into groups of three to appear comprehensive.

**Before:**

> The event features keynote sessions, panel discussions, and networking opportunities. Attendees can expect innovation, inspiration, and industry insights.

**After:**

> The event includes talks and panels. There's also time for informal networking between sessions.

---

#### 11. Elegant Variation (Synonym Cycling)

**Problem:** AI has repetition-penalty code causing excessive synonym substitution.

**Before:**

> The protagonist faces many challenges. The main character must overcome obstacles. The central figure eventually triumphs. The hero returns home.

**After:**

> The protagonist faces many challenges but eventually triumphs and returns home.

---

#### 12. False Ranges

**Pattern:** Using "from X to Y" constructions where X and Y aren't on a meaningful scale

**Cross-reference:** See Section 6 (Forbidden Constructs) for "'From X to Y' flourishes"

**Problem:** LLMs use "from X to Y" constructions where X and Y aren't on a meaningful scale.

**Before:**

> Our journey through the universe has taken us from the singularity of the Big Bang to the grand cosmic web, from the birth and death of stars to the enigmatic dance of dark matter.

**After:**

> The book covers the Big Bang, star formation, and current theories about dark matter.

---

### Style Patterns

These patterns reveal mechanical formatting choices and over-reliance on specific punctuation or emphasis.

#### 13. Em Dash Overuse

**Problem:** LLMs use em dashes (—) more than humans, mimicking "punchy" sales writing.

**Cross-reference:** See Section 3 (Core Writing Rules) which specifies "Use short dashes (-) only"

**Before:**

> The term is primarily promoted by Dutch institutions—not by the people themselves. You don't say "Netherlands, Europe" as an address—yet this mislabelling continues—even in official documents.

**After:**

> The term is primarily promoted by Dutch institutions, not by the people themselves. You don't say "Netherlands, Europe" as an address, yet this mislabelling continues in official documents.

---

#### 14. Overuse of Boldface

**Problem:** AI chatbots emphasise phrases in boldface mechanically.

**Before:**

> It blends **OKRs (Objectives and Key Results)**, **KPIs (Key Performance Indicators)**, and visual strategy tools such as the **Business Model Canvas (BMC)** and **Balanced Scorecard (BSC)**.

**After:**

> It blends OKRs, KPIs, and visual strategy tools like the Business Model Canvas and Balanced Scorecard.

---

#### 15. Inline-Header Vertical Lists

**Problem:** AI outputs lists where items start with bolded headers followed by colons.

**Before:**

> - **User Experience:** The user experience has been significantly improved with a new interface.
> - **Performance:** Performance has been enhanced through optimised algorithms.
> - **Security:** Security has been strengthened with end-to-end encryption.

**After:**

> The update improves the interface, speeds up load times through optimised algorithms, and adds end-to-end encryption.

---

#### 16. Title Case in Headings

**Problem:** AI chatbots capitalise all main words in headings.

**Cross-reference:** See Section 8 (Terminology & Standards) for markdown mechanics

**Before:**

> ## Strategic Negotiations And Global Partnerships

**After:**

> ## Strategic negotiations and global partnerships

---

#### 17. Emojis

**Problem:** AI chatbots often decorate headings or bullet points with emojis.

**Before:**

> 🚀 **Launch Phase:** The product launches in Q3
> 💡 **Key Insight:** Users prefer simplicity
> ✅ **Next Steps:** Schedule follow-up meeting

**After:**

> The product launches in Q3. User research showed a preference for simplicity. Next step: schedule a follow-up meeting.

---

#### 18. Curly Quotation Marks

**Problem:** ChatGPT uses curly quotes ("...") instead of straight quotes ("...").

**Before:**

> He said "the project is on track" but others disagreed.

**After:**

> He said "the project is on track" but others disagreed.

---

### Communication Patterns

These patterns reveal text written as chatbot correspondence rather than standalone content.

#### 19. Collaborative Communication Artifacts

**Words to watch:** I hope this helps, Of course!, Certainly!, You're absolutely right!, Would you like..., let me know, here is a...

**Problem:** Text meant as chatbot correspondence gets pasted as content.

**Before:**

> Here is an overview of the French Revolution. I hope this helps! Let me know if you'd like me to expand on any section.

**After:**

> The French Revolution began in 1789 when financial crisis and food shortages led to widespread unrest.

---

#### 20. Knowledge-Cutoff Disclaimers

**Words to watch:** as of [date], Up to my last training update, Whilst specific details are limited/scarce..., based on available information...

**Problem:** AI disclaimers about incomplete information get left in text.

**Before:**

> Whilst specific details about the company's founding are not extensively documented in readily available sources, it appears to have been established sometime in the 1990s.

**After:**

> The company was founded in 1994, according to its registration documents.

---

#### 21. Sycophantic/Servile Tone

**Problem:** Overly positive, people-pleasing language.

**Before:**

> Great question! You're absolutely right that this is a complex topic. That's an excellent point about the economic factors.

**After:**

> The economic factors you mentioned are relevant here.

---

### Filler and Hedging

These patterns add unnecessary words without adding meaning.

#### 22. Filler Phrases

**Common patterns:**

- "In order to achieve this goal" → "To achieve this"
- "Due to the fact that it was raining" → "Because it was raining"
- "At this point in time" → "Now"
- "In the event that you need help" → "If you need help"
- "The system has the ability to process" → "The system can process"
- "It is important to note that the data shows" → "The data shows"

**Problem:** Verbose constructions that can be shortened without losing meaning.

**Before:**

> In order to achieve optimal results, it is important to note that the system has the ability to process data in the event that additional resources are available at this point in time.

**After:**

> To achieve optimal results, the system can process data if additional resources are available now.

---

#### 23. Excessive Hedging

**Problem:** Over-qualifying statements.

**Before:**

> It could potentially possibly be argued that the policy might have some effect on outcomes.

**After:**

> The policy may affect outcomes.

---

#### 24. Generic Positive Conclusions

**Problem:** Vague upbeat endings.

**Before:**

> The future looks bright for the company. Exciting times lie ahead as they continue their journey towards excellence. This represents a major step in the right direction.

**After:**

> The company plans to open two more locations next year.

---

## Summary: Using This Section

**When to check for AI patterns:**

- Reviewing AI-drafted content before publication
- Editing marketing copy or blog posts
- Checking documentation for sterile, algorithmic language
- Adding voice to technically correct but lifeless text

**Priority levels:**

1. **Critical**: Communication patterns (19-21) - Makes text unusable
2. **High**: Content patterns (1-6), Language patterns (7-12) - Damages credibility
3. **Medium**: Style patterns (13-18) - Looks mechanical
4. **Low**: Filler patterns (22-24) - Reduces clarity but doesn't scream "AI"

**Detection workflow:**

1. Read text aloud - Does it sound like a human talking?
2. Check for pattern clusters - AI rarely uses just one pattern
3. Scan for forbidden vocabulary (Section 5) - Often co-occurs with AI patterns
4. Look for missing personality - No opinions, rhythm, or voice?
5. Apply fixes systematically - Don't just remove patterns, add soul

**Related sections:**

- Section 3 (Core Writing Rules) - Voice and tone guidance
- Section 5 (Forbidden Vocabulary) - Overlaps with AI vocabulary
- Section 6 (Forbidden Constructs) - Overlaps with several patterns
- Section 7 (Style Corrections) - Natural phrasing alternatives
