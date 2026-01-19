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
- **Linting:** After creating or editing any markdown file, always run `markdownlint` to ensure compliance.

---

## 2. Content Integration Rules

**Rule:** When new topics (e.g., SEO, security) are introduced via prompt:

1. **Integrate, Don't Expand:** Weave the content into existing sections naturally. Do **not** add extra "value" or fluff. Keep it proportional.
2. **No New Chapters:** Do **not** create a new chapter unless the prompt explicitly requests it. Find the best existing home.
3. **Update Glossary:** Always check and update `packages/manuscript/the-bible-of-mx/Glossary.md` with any new terms discovered or definitions created during the process.

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
