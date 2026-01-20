# Writing Style Checklist

This checklist extracts key rules from [docs/for-ai/writing-style.md](docs/for-ai/writing-style.md) for quick reference during document review.

## Section 3: Core Writing Rules

### Language

- [ ] British English spelling throughout
  - organise (not organize)
  - colour (not color)
  - whilst (not while in formal contexts)
  - centre (not center)
  - programme (not program)
  - licence (noun, not license)
  - defence (not defense)

### Tone

- [ ] Concise - no unnecessary words
- [ ] Calm - no exaggeration or superlatives
- [ ] Concrete - specific examples, not theoretical

### Voice

- [ ] Active voice is default
- [ ] Third person for analysis and technical explanation
- [ ] First person ("I") only for specific personal insights

### Formatting

- [ ] No colons in headers
- [ ] Use short dashes (-) only, not em-dashes

## Section 4: Audience & Technical Segmentation

### Main Chapters (1-11)

- [ ] Focus on business problem and high-level solution
- [ ] Use analogies rather than code
- [ ] Direct readers to Appendices for the "How"

### Technical Content Locations

Deep technical content (code, specific implementation patterns) is **only** permitted in:

- Chapter 12: Technical Advice
- Chapter 13: What Agent Creators Must Build
- Appendices A-L: (Cookbooks, HTML Guides, Patterns)
- "Code-Ex" Blocks: Distinct, isolated blocks of code examples within other chapters (kept brief)

## Section 5: Forbidden Vocabulary

**Never** use these words. Find a simpler or more specific alternative.

- [ ] align → connect, match, fit
- [ ] crucial / pivotal → important, critical, central
- [ ] cutting-edge → advanced, new
- [ ] delve → explore, examine, look at
- [ ] elaborate → explain, detail
- [ ] emphasise / highlight / underscore → note, point out, stress
- [ ] empower / foster → enable, help, let
- [ ] endure / enduring → lasting, long-term
- [ ] enhance / optimise → improve, fix, make better
- [ ] garner → gather, get
- [ ] holistic / comprehensive → full, complete, total
- [ ] intricate → complex, detailed
- [ ] interplay → mix, connection
- [ ] leverage / utilize → use
- [ ] myriad / plethora → many, numerous
- [ ] robust → strong, reliable
- [ ] seamless → smooth, fluid
- [ ] showcase → show, demonstrate
- [ ] streamline → simplify
- [ ] tapestry → mix, collection
- [ ] the lens → the focus, the perspective

## Section 6: Forbidden Constructs

Avoid these specific phrases and patterns:

- [ ] "It's not just X, it's Y"
- [ ] "Think about..." / "Think of..."
- [ ] "Not only... but also..."
- [ ] "From X to Y" flourishes
- [ ] Rule-of-three padding (e.g., "fast, scalable, and secure")
- [ ] "Despite these challenges..."
- [ ] "In conclusion / In summary / Overall"
- [ ] "Challenges and future prospects"
- [ ] "Let's walk through..."
- [ ] "It is important to remember..."

### Headings starting with "The..."

- [ ] Generally, remove "The" from headings for a more concise, business-like tone
  - Example: "The Security Maze" → "Security Maze"

**Exceptions:**

- **ALWAYS** preserve "The" in the book title: **"The Invisible Users"**
- Preserve "The" if removing it makes the heading grammatically incorrect or awkward
  - Example: "The Web We Built", "The Price That Grew"

## Section 7: Style Corrections

Use natural phrasing instead of academic or marketing variations.

- [ ] "Building on our exploration..." → "Following our look at..."
- [ ] "Reveals compelling insights" → "Shows interesting things"
- [ ] "Collectively represent a complete reimagining" → "Together completely rethink"
- [ ] "Transcends traditional X" → "Goes well beyond traditional X"
- [ ] "Perhaps the most radical departure" → "Makes perhaps the biggest break"
- [ ] "Demonstrates remarkable viability" → "Shows how well this works"
- [ ] "Illustrates a broader industry pattern" → "Shows a broader industry trend"
- [ ] "Cannot simply evaluate" → "Can't just evaluate"
- [ ] "Provides a template" → "Provides a good example"

## Section 8: Terminology & Standards

### Capitalization & Spelling

- [ ] **AI agent:** Lowercase 'a' in agent (unless starting a sentence)
- [ ] **the web:** Lowercase 'w' (not "The Web")
- [ ] **LLM:** Acronym for Large Language Model (define on first use if necessary)
- [ ] **Currency:** Use **GBP (£)** as the primary currency for examples. Use USD ($) only for US-specific case studies.

### Markdown Mechanics

- [ ] **Headings:** Use ATX style (`# Heading`) only
- [ ] **Never** use bold text (`**Heading**`) as a heading (prevents linting errors)
- [ ] **Duplicate Headings:** Avoid using the exact same heading text multiple times in the same file
- [ ] **Lists:** Ensure blank lines surround all lists

### Alerts

Use GitHub-style alerts for side notes or warnings. Do not use generic blockquotes.

```markdown
> [!NOTE]
> Use this for neutral info or additional context.

> [!IMPORTANT]
> Use this for critical information the user must not miss.

> [!WARNING]
> Use this for dangerous actions or breaking changes.
```

## Common Markdown Linting Issues

### MD001: Heading Level Jumps

- [ ] Don't skip heading levels (e.g., # to ###)
- [ ] Increment by one level at a time

### MD024: Duplicate Headings

- [ ] Each heading must be unique within a file
- [ ] Add context to make duplicates distinct
  - Example: "Example Row" → "1. SEO Report - Example Row", "2. Performance Analysis - Example Row"

### MD036: Emphasis Used Instead of Heading

- [ ] Never use `**Bold Text**` on its own line as a heading
- [ ] Use proper ATX headings (`### Heading`) instead
- [ ] Dates and metadata should be plain text, not bold
  - Example: `Published: January 2025` not `**Published: January 2025**`

### MD022: Headings Must Be Surrounded by Blank Lines

- [ ] Blank line before heading
- [ ] Blank line after heading

### MD040: Code Blocks Must Have Language Specified

- [ ] Always specify language: `javascript`, `html`, `css`, `json`, `bash`, `text`
- [ ] Email templates and plain text should use `text` language

### MD047: Files Must End with Single Newline

- [ ] Ensure file ends with exactly one newline character

### MD060: Table Separators Need Proper Spacing

- [ ] Separator row must have spaces: `| ----- | ----- |` not `|-----|-----|`

### MD031: Code Blocks Must Have Blank Lines Before and After

- [ ] Blank line before code block
- [ ] Blank line after code block

### MD034: Bare URLs Should Be Wrapped

- [ ] Wrap bare URLs in angle brackets: `<https://example.com>`
- [ ] Or use markdown links: `[text](https://example.com)`

## Voice and Tone Checks

### Passive Voice Detection

Pattern: `(is|are|was|were|been|be) + past participle`

- [ ] "The form was filled by the agent" → "The agent filled the form"
- [ ] "Sessions are inherited from..." → "Sessions inherit from..."

### Superlatives and Exaggeration

- [ ] Avoid: best, worst, most, least, greatest, biggest
- [ ] Avoid: revolutionary, groundbreaking, game-changing, transformative
- [ ] Use with caution: always, never, all, none, every, impossible (context-dependent)
- [ ] Minimize: very, extremely, incredibly, absolutely, completely

### Marketing Language

- [ ] Avoid sales-oriented phrases
- [ ] Focus on facts and evidence
- [ ] Let the work speak for itself
- [ ] Professional objectivity over validation

## HTML-Specific Checks

When reviewing HTML files:

### Text Content

- [ ] Check paragraph content against style rules
- [ ] Check headings against style rules
- [ ] Check list items against style rules

### Skip Technical Content

- [ ] Don't flag Schema.org structured data
- [ ] Don't flag CSS styles
- [ ] Don't flag JavaScript code
- [ ] Don't flag HTML element names
- [ ] Don't flag meta tags and attributes

## Special Cases and Exceptions

### Code Blocks

- [ ] Never flag content inside code blocks (between ``` markers)
- [ ] Code examples can use any vocabulary

### Inline Code

- [ ] Never flag content in inline code (between ` markers)
- [ ] Technical references use their own vocabulary

### Citations

- [ ] Don't flag quoted external sources (in blockquotes with attribution)
- [ ] Flag original writing even in blockquotes

### URLs and File Paths

- [ ] Never flag words in URLs or file paths
- [ ] URLs use their own vocabulary

### Technical Terminology

Context-dependent exceptions:

- [ ] "robust encryption" - acceptable (industry term)
- [ ] "financial leverage" - acceptable (domain-specific)
- [ ] Flag with note if unsure

### Book Title Exceptions

Always preserve:

- [ ] "The Invisible Users" (book title)
- [ ] "The Web We Built" (grammatically required)
- [ ] "The Price That Grew" (grammatically required)

## Priority Levels

### Critical (Must Fix)

- Forbidden vocabulary
- Forbidden constructs
- Colons in headings
- Bold text as headings (MD036)

### Important (Should Fix)

- American spelling in British English document
- Incorrect "The..." heading usage
- Passive voice in main narrative
- Missing code block languages

### Style (Recommend Fix)

- Academic/marketing phrasing
- Tone improvements
- Superlatives and exaggeration
- Terminology inconsistencies

### Markdown (Technical)

- Duplicate headings (MD024)
- Bare URLs (MD034)
- Table formatting (MD060)
- List spacing (MD031)

## Quick Reference: Most Common Issues

1. **Forbidden vocabulary** - delve, leverage, robust, seamless (23 words total)
2. **Colons in headings** - Remove all colons from heading text
3. **"The..." in headings** - Remove unless grammatically incorrect
4. **American spelling** - color→colour, organize→organise, analyze→analyse
5. **Bold as heading** - Use proper ATX headings instead
6. **Passive voice** - Rewrite in active voice
7. **Duplicate headings** - Make unique with context
8. **Missing code language** - Add language tag to code blocks
9. **Bare URLs** - Wrap in angle brackets or use markdown links
10. **Marketing tone** - Replace with factual, objective language

---

**Source:** [docs/for-ai/writing-style.md](docs/for-ai/writing-style.md)
