# Review Docs Skill

**Command:** `/review-docs`

**Purpose:** Review documents against the writing style guide and propose amendments.

## What This Skill Does

When you provide one or more file paths, this skill:

1. **Loads Style Guide** - Reads the complete writing style guide
2. **Analyzes Content** - Checks document against all style rules
3. **Identifies Issues** - Categorizes violations by severity
4. **Plans Amendments** - Proposes specific fixes with line references
5. **Presents Report** - Shows prioritized, actionable recommendations

**CRITICAL:** This skill will refuse to review files in `.claude/` directory (skills, commands, hooks). These files have their own formatting requirements that conflict with the writing style guide.

## Understanding the Writing Style Guide

The writing style guide ([docs/for-ai/writing-style.md](docs/for-ai/writing-style.md)) defines standards for "MX-Bible" book manuscripts. The guide applies to all content in `packages/bible/`, `packages/dont-make-ai-think/`, and `packages/shared-appendices/` but can be used to review any document.

**Core Principles:**

- **British English** throughout (organise, colour, whilst)
- **Concise, calm, concrete** tone
- **Active voice** default, third person for analysis
- **No colons** in headings
- **No time estimates** (hours, days, weeks, months) - use priority levels instead
- **Forbidden vocabulary** must never be used
- **Forbidden constructs** must be avoided

## How to Use

```bash
# Review single file from MX-Bible
/review-docs packages/bible/chapter-01-what-you-will-learn.md

# Review single file from MX-Don't Make the AI Think
/review-docs packages/dont-make-ai-think/chapter-01-the-invisible-users.md

# Review single file from MX-Handbook
/review-docs packages/mx-handbook/chapter-01-dont-make-ai-think.md

# Review multiple files (space-separated)
/review-docs chapter-01.md chapter-02.md chapter-03.md

# Review with glob patterns (MX-Bible chapters)
/review-docs packages/bible/chapter-*.md

# Review any file (not limited to manuscript)
/review-docs packages/web-audit-suite/web-audit-architecture.md

# Review HTML files
/review-docs packages/shared-appendices/web/back-cover.html
```

## 5-Phase Workflow

### Phase 0: Validate File Paths (Pre-Check)

**Automatic actions:**

For each file path provided:

1. **Check if path contains `.claude/`**
2. **If yes, refuse to review:**
   ```
   ❌ Cannot review: [file path]
   Reason: Skill/command/hook files in .claude/ directory have their own
   formatting requirements that conflict with the writing style guide.
   ```
3. **Continue with remaining files** (if any)

**What I'll do:** Skip any `.claude/` files and proceed with valid files only

### Phase 1: Load Style Guide

**Automatic actions:**

- Read [docs/for-ai/writing-style.md](docs/for-ai/writing-style.md)
- Extract all rule categories:
  - Forbidden Vocabulary (Section 5)
  - Forbidden Constructs (Section 6)
  - Style Corrections (Section 7)
  - Terminology Standards (Section 8)
  - AI Pattern Detection and Humanization (Section 9)
  - Core Writing Rules (Section 3)
  - Audience & Technical Segmentation (Section 4)
- Build validation checklist
- Load checklist.md and examples.md for reference

**What I'll do:** Confirm style guide loaded successfully

### Phase 2: Analyze Documents

**Automatic actions:**

For each file provided:

1. **Read file contents**
2. **Check forbidden vocabulary** (Section 5)
   - Scan for all 23 forbidden words
   - Check context (ensure not in code blocks or quotes)
   - Note line numbers
3. **Check forbidden constructs** (Section 6)
   - Pattern match against 14 forbidden phrases
   - Include heading patterns (colons, "The..." prefix)
4. **Check style corrections** (Section 7)
   - Match against 8 academic/marketing patterns
   - Suggest natural phrasing alternatives
5. **Check terminology** (Section 8)
   - Verify capitalization (AI agent, LLM, the web)
   - Check currency usage (GBP primary)
   - Check markdown mechanics
6. **Check language** (British English)
   - American spellings (color, organize, analyze)
   - American phrasings (gotten, while)
7. **Check voice and tone**
   - Passive voice detection
   - Superlatives and exaggeration
   - Marketing language
8. **Check heading format**
   - Colons in headings
   - "The..." prefix (check exceptions)
   - Bold text used as heading (MD036)
9. **Check for time estimates**
   - Hours (2 hours, 10 hours, 85 hours)
   - Days (3 days, 5 days)
   - Weeks (Week 1, Weeks 2-3, 12 weeks)
   - Months (3 months, 6-12 months when referring to implementation time)
   - Replace with priority levels (Priority 1-4, Foundation, Ongoing)
10. **Check markdown quality**
    - Code block language tags
    - Duplicate headings
    - Bare URLs
    - List spacing
    - Table formatting
11. **Check special characters** (Section 8 - Markdown Mechanics)
    - Unicode box-drawing characters (├ └ │ ─) → Replace with ASCII (`+`, `-`, `|`)
    - Checkmarks/crosses (✓ ✗) → Replace with `[PASS]`, `[FAIL]`
    - Stars/ratings (★★★★★) → Replace with text ("5 stars")
    - Reason: Prevents PDF font warnings and ensures cross-platform compatibility
12. **Check AI patterns** (Section 9)
    - Content patterns (significance inflation, promotional language, vague attributions)
    - Language/grammar patterns (AI vocabulary, copula avoidance, synonym cycling)
    - Style patterns (em dash overuse, boldface, emojis, curly quotes)
    - Communication patterns (chatbot artifacts, disclaimers, sycophantic tone)
    - Filler/hedging patterns (verbose constructions, excessive hedging)

**What I'll do:** Build comprehensive issue list for each file

### Phase 3: Identify Issues

**Automatic actions:**

Categorize all findings:

**Critical (Must Fix):**

- Forbidden vocabulary used
- Forbidden constructs found
- Colons in headings
- Bold text as headings (MD036)
- Time estimates present (hours, days, weeks, months)

**Important (Should Fix):**

- American spelling in British English document
- Incorrect "The..." heading usage
- Passive voice in main narrative
- Missing code block languages

**Style (Recommend Fix):**

- Academic/marketing phrasing
- Tone improvements
- Superlatives and exaggeration
- Terminology inconsistencies

**AI Patterns (Should Fix):**

- Content patterns (significance inflation, promotional language)
- Language patterns (AI vocabulary, copula avoidance, synonym cycling)
- Style patterns (em dash overuse, boldface abuse, emojis)
- Communication patterns (chatbot artifacts, disclaimers)
- Filler patterns (verbose constructions, excessive hedging)

**Markdown (Technical):**

- Duplicate headings
- Bare URLs
- Table formatting
- List spacing
- Unicode special characters (box-drawing, checkmarks, stars)

**What I'll do:** Sort issues by priority and line number

### Phase 4: Plan Amendments

**Automatic actions:**

For each issue:

1. **Quote context** - Show original text with line number
2. **Explain rule** - Reference specific section of style guide
3. **Propose fix** - Provide exact replacement text
4. **Categorize** - Assign to Critical/Important/Style/Markdown

**Amendment structure:**

```markdown
**Line XX:** "original text here"
- Rule: [Specific rule from style guide]
- Fix: "corrected text here"
- Category: Critical/Important/Style/Markdown
```

**What I'll do:** Create complete amendment plan organized by category

### Phase 5: Present Report

**Automatic actions:**

Generate comprehensive report:

**CRITICAL:** Statistics MUST accurately reflect actual findings. Never use placeholder values (XX). Count real issues found during Phase 2-3 analysis.

```markdown
## Review Summary: [filename]

### Statistics
- Total issues: XX (MUST BE ACTUAL COUNT, NOT PLACEHOLDER)
- Critical: XX (forbidden vocabulary, constructs, heading format)
- Important: XX (language, voice, terminology)
- Style: XX (tone, phrasing)
- AI Patterns: XX (mechanical writing, chatbot artifacts)
- Markdown: XX (technical formatting)

### Critical Issues

[List all critical issues with line numbers, rules, and fixes]

### Important Issues

[List all important issues with line numbers, rules, and fixes]

### Style Improvements

[List all style recommendations with line numbers, rules, and fixes]

### AI Pattern Issues

[List all AI pattern issues with line numbers, rules, and fixes]

### Markdown Fixes

[List all markdown issues with line numbers, rules, and fixes]

## Recommended Action

1. Apply all Critical fixes (required)
2. Apply all Important fixes (strongly recommended)
3. Review Style improvements (optional but recommended)
4. Review AI Pattern issues (recommended for published content)
5. Fix Markdown issues (for linting compliance)

**What would you like to do?**

- "Apply all fixes" - I'll edit the file with all changes
- "Apply Critical only" - I'll edit only must-fix items
- "Show me specific sections" - I'll provide more detail on any category
- "Skip this file" - Move to next file (if multiple files)
```

**What I'll do:** Present report and await your decision

**What you'll do:** Choose action (apply fixes, review specific items, skip file)

## Multi-File Review

When multiple files are provided:

1. **Process each file sequentially**
2. **Present individual reports**
3. **Ask for action on each file** before proceeding
4. **Summarize totals at end** (total issues across all files)

**Example flow:**

```
File 1/3: chapter-01.md
[Full report]
Action? [Apply all/Apply critical/Review/Skip]

File 2/3: chapter-02.md
[Full report]
Action? [Apply all/Apply critical/Review/Skip]

File 3/3: chapter-03.md
[Full report]
Action? [Apply all/Apply critical/Review/Skip]

## Summary
Files reviewed: 3
Total issues: 67
- Critical: 23
- Important: 18
- Style: 15
- Markdown: 11

Files modified: 2 (chapter-01.md, chapter-03.md)
Files skipped: 1 (chapter-02.md)
```

### Example: Clean File (No Issues)

When a file passes all checks:

```markdown
## Review Summary: chapter-00-what-are-ai-agents.md

### Statistics
- Total issues: 0
- Critical: 0 (no forbidden vocabulary, constructs, or heading format issues)
- Important: 0 (correct British English and terminology throughout)
- Style: 0 (excellent voice and tone)
- AI Patterns: 0 (no mechanical writing patterns)
- Markdown: 0 (properly formatted)

### Analysis Performed

**Forbidden Vocabulary (Section 5):** ✓ None found
- Scanned all 23 forbidden words - none present

**Forbidden Constructs (Section 6):** ✓ None found
- No problematic phrase patterns detected

**British English:** ✓ Correct throughout
- Proper spellings: "organisations", "whilst", "optimiser"

**AI Patterns (Section 9):** ✓ None found
- No significance inflation, vague attributions, or chatbot artifacts
- Strong human voice with opinions and personality

**Markdown Quality:** ✓ Excellent
- Proper ATX headings, correct metadata table format

### Conclusion

**No changes needed.** The chapter meets all style guide requirements and demonstrates strong, authentic human voice throughout. The writing is publication-ready.
```

## Rule Detection Patterns

### Forbidden Vocabulary Detection

**Method:** Case-insensitive word boundary matching

**Pattern:** `\b(forbidden_word)\b` with exclusions:

- Skip if in code block (between ``` markers)
- Skip if in inline code (between ` markers)
- Skip if in blockquote citation
- Skip if in URL

**Example:**

```markdown
We need to leverage this solution.
         ^^^^^^^^^^^
Line 45: Forbidden word "leverage"
Fix: "We need to use this solution."
```

### Forbidden Constructs Detection

**Method:** Pattern matching with context awareness

**Patterns:**

- `It's not just X, it's Y` → Flag entire phrase
- `Think about...` → Flag at sentence start
- `Not only... but also...` → Flag entire construct
- `From X to Y` → Flag flourish usage (not literal directions)
- `Despite these challenges...` → Flag transition phrase
- `In conclusion|In summary|Overall` → Flag at section start

**Example:**

```markdown
Think about how agents interact with forms.
^^^^^^^^^^^
Line 67: Forbidden construct "Think about..."
Fix: "Consider how agents interact with forms."
   or "Agents interact with forms in specific ways."
```

### Heading Format Detection

**Method:** Regex matching on markdown headings

**Checks:**

1. **Colons:** `^#{1,6}\s+.*:.*$`
   - Exception: None (all colons forbidden)
2. **"The..." prefix:** `^#{1,6}\s+The\s+[A-Z]`
   - Exceptions: "MX-Bible", "The Web We Built", "The Price That Grew"
   - Rule: Remove unless grammatically incorrect without it
3. **Bold as heading:** `^\*\*[^*]+\*\*$` on its own line
   - Always forbidden (use proper ATX headings)

**Examples:**

```markdown
## Key Concepts: A Summary
                ^
Line 23: Colon in heading
Fix: "## Key Concepts Summary"

## The Growing Problem
   ^^^^
Line 45: "The" prefix in heading
Fix: "## Growing Problem"

**Important Note**
^^^^^^^^^^^^^^^^^^
Line 67: Bold text used as heading (MD036)
Fix: "## Important Note"
```

### Language Check (British English)

**Method:** Dictionary-based replacement with code/metadata exceptions

**Common American → British:**

- color → colour
- organize → organise
- optimize → optimise
- analyze → analyse
- center → centre
- license → licence (noun)
- defense → defence
- gotten → got
- while → whilst (in formal contexts)

**CRITICAL EXCEPTION - Code/JSON/Metadata:**

Do NOT flag American spelling in:

- Code blocks (between ``` markers or ` inline code)
- Schema.org vocabulary: `"@type": "Organization"` (standard)
- HTML attributes: `lang="en-GB"` (ISO standard)
- JSON property names: `streetAddress`, `postalCode` (camelCase convention)
- HTTP headers: `Content-Type`, `Authorization` (established standards)

**Rationale:** Technical standards define specific spelling for interoperability. Prose uses British English; code follows international standards.

**Example (prose text):**

```markdown
We need to optimize the color scheme.
         ^^^^^^^^       ^^^^^
Line 89: American spelling detected
Fix: "We need to optimise the colour scheme."
```

**Example (code - no change):**

```html
<!-- Prose uses British English, code follows Schema.org standard -->
<div itemscope itemtype="https://schema.org/Organization">
  <span itemprop="name">Digital Domain Technologies</span>
</div>
```

**Action:** Skip "Organization" in Schema.org markup - this is correct per international standard.

### Time Estimate Check

**Method:** Pattern matching for time-based implementation estimates

**Why forbidden:** Implementation time depends on site size, team capacity, and existing infrastructure. Time estimates create false expectations and don't apply universally. Use priority levels instead.

**Patterns to detect:**

- Hours: `\b\d+(-\d+)?\s*hours?\b` (2 hours, 10 hours, 85-115 hours)
- Days: `\b\d+\s*days?\b` (3 days, 5 days)
- Weeks: `\b(Week|Weeks)\s*\d+(-\d+)?\b` (Week 1, Weeks 2-3, 12 weeks)
- Months: `\b\d+(-\d+)?\s*months?\b` (when referring to implementation time)
- Time phrases: `Time investment:`, `Expected time:`, `Duration:`

**Replacement guidance:**

- Replace with priority levels: Priority 1-4, Foundation, Ongoing
- Use qualitative descriptions: "quick", "substantial", "ongoing"
- Focus on dependencies, not duration

**Examples:**

```markdown
Time investment: 28 hours
^^^^^^^^^^^^^^^^^^^^^^^^^
Line 194: Time estimate detected
Fix: Remove line or replace with "Priority 1: Critical Quick Win"

Phase 1: Quick Wins (Weeks 2-3)
                     ^^^^^^^^^^^
Line 111: Time estimate in heading
Fix: "Phase 1: Quick Wins"

Expected results after 2-3 weeks
                        ^^^^^^^^^
Line 197: Time estimate detected
Fix: "Expected results:" (remove time reference)
```

### Voice Check (Active vs Passive)

**Method:** Passive voice pattern matching

**Pattern:** `(is|are|was|were|been|be)\s+(being\s+)?\w+ed\b`

**Examples:**

```markdown
The form was filled by the agent.
         ^^^^^^^^^^^^^^
Line 34: Passive voice detected
Fix: "The agent filled the form."

Sessions are inherited from the authenticated user.
         ^^^^^^^^^^^^^
Line 56: Passive voice detected
Fix: "Sessions inherit from the authenticated user."
   or "Agents inherit sessions from the authenticated user."
```

### Tone Check (Superlatives and Exaggeration)

**Method:** Pattern matching for marketing language

**Patterns:**

- Superlatives: `\b(best|worst|most|least|greatest|biggest)\b`
- Exaggeration: `\b(revolutionary|groundbreaking|game-changing|transformative)\b`
- Absolutes: `\b(always|never|all|none|every|impossible)\b` (context-dependent)
- Intensifiers: `\b(very|extremely|incredibly|absolutely|completely)\b`

**Example:**

```markdown
This is the best solution for agent compatibility.
         ^^^^^^^^
Line 78: Superlative detected (marketing tone)
Fix: "This solution works well for agent compatibility."
   or "This solution provides strong agent compatibility."
```

### AI Pattern Detection

**Method:** Pattern matching combined with context analysis for 24 AI-generated writing patterns

**Categories:**

1. **Content Patterns** (6 patterns)
   - Significance inflation: stands/serves as, testament/reminder, vital/significant role
   - Media coverage emphasis: independent coverage, leading expert, social media presence
   - Superficial -ing analyses: highlighting, ensuring, reflecting, symbolising
   - Promotional language: boasts, vibrant, nestled, breathtaking, renowned
   - Vague attributions: Industry reports, Observers, Experts argue
   - Formulaic challenges sections: Despite these challenges, Future Outlook

2. **Language/Grammar Patterns** (5 patterns)
   - AI vocabulary: Additionally, align with, key (adj), landscape (abstract), valuable
   - Copula avoidance: serves as/stands as instead of "is/are"
   - Negative parallelisms: "It's not just X, it's Y"
   - Rule of three forcing: grouping into threes artificially
   - Elegant variation: excessive synonym cycling
   - False ranges: "from X to Y" where X and Y aren't on a scale

3. **Style Patterns** (6 patterns)
   - Em dash overuse: using — instead of commas
   - Boldface abuse: mechanical emphasis
   - Inline-header lists: bolded labels followed by colons
   - Title case headings: All Main Words Capitalised
   - Emojis: decorative emojis in content
   - Curly quotes: "..." instead of "..."

4. **Communication Patterns** (3 patterns)
   - Chatbot artifacts: "I hope this helps", "Of course!", "Would you like..."
   - Knowledge disclaimers: "as of [date]", "based on available information"
   - Sycophantic tone: "Great question!", "You're absolutely right!"

5. **Filler/Hedging** (4 patterns)
   - Verbose constructions: "in order to", "due to the fact that"
   - Excessive hedging: "could potentially possibly be argued"
   - Generic conclusions: "exciting times lie ahead"

**Detection Strategy:**

- Scan for pattern clusters (AI rarely uses just one)
- Check context (some patterns acceptable in technical writing)
- Look for missing personality markers (no opinions, flat rhythm)
- Cross-check with Section 5-7 violations (often co-occur)

**Example:**

```markdown
Additionally, the platform serves as a robust solution, showcasing
cutting-edge features. Industry reports suggest it represents a
pivotal moment in the evolution of digital tools.
^^^^^^^^^^      ^^^^^^^^^^    ^^^^^^           ^^^^^^^^^^ ^^^^^^^^^^^^
Line 12: Multiple AI patterns detected
- "Additionally" → remove or use "Also"
- "serves as" → "is"
- "robust" → "strong" or "reliable"
- "showcasing" → "showing"
- "cutting-edge" → "advanced"
- "Industry reports suggest" → cite specific source
- "represents a pivotal moment" → remove inflated significance

Fix: "The platform is a strong solution with advanced features.
According to Gartner's 2024 report, adoption increased 40% last year."
```

**Priority:** Treat as "Should Fix" (same level as Style improvements) unless Communication Patterns detected (then Critical)

### AI Advocacy Positioning Check

**Method:** Pattern matching for negative framing about AI systems

**Purpose:** Ensure the book positions the author as an AI advocate focused on practical improvements through collaboration, not as a critic pointing out AI failures.

**Patterns to detect (negative framing):**

1. **"Break/fail" language about AI:**
   - "patterns that **break** AI agents"
   - "websites **fail** for agents"
   - "AI agents **fail** silently"
   - "when websites **break** for AI agents"

2. **"Problem/crisis" framing:**
   - "**creates the problem**"
   - "**threatens** existing business models"
   - "what's **broken** and why it matters"
   - "the **problem** is..."

3. **Negative chapter subtitles:**
   - "How X **creates the problem**"
   - "How AI **threatens** Y"
   - "When websites **break** for Z"

**Required AI advocacy elements:**

1. **Explicit advocacy statement:**

   **Where the full template applies:**
   - **Required:** Chapter 1 (or Chapter 01, or any variation meaning "Introduction")
   - Use the complete template below exactly as written

   **Where adapted versions appear:**
   - **Recommended:** Book preface, Chapter 0
   - **Sales materials:** Executive summary, proposals, pitches
   - Adapt to context whilst maintaining same advocacy positioning

   **Standard template (Chapter 1):**

   ```markdown
   I want to be clear about my stance on AI: I'm not complaining about
   these systems or highlighting edge cases. I genuinely praise/admire AI
   for its remarkable ability to generate coherent text that people understand.
   The technology has achieved something extraordinary...
   ```

2. **Opportunity framing** instead of problem framing:

   | Negative Framing | AI Advocacy Framing |
   | ---------------- | ------------------- |
   | "break/fail" | "need optimization/integration" |
   | "problem/crisis" | "opportunity/transformation" |
   | "threatens" | "transforms" |
   | "what's broken" | "what needs optimization" |
   | "how to fix it" | "how to implement solutions" |
   | "patterns that fail" | "patterns needing optimization" |
   | "invisible failures" | "integration gaps/optimization opportunities" |
   | "sites that don't work" | "sites needing optimization" |
   | "creates the problem" | "evolved separately from agent needs" |

3. **Collaboration emphasis:**
   - "The opportunity lies in collaboration"
   - "When we provide well-structured inputs... results improve"
   - "Better-structured inputs produce better outputs for everyone"

**Detection examples:**

```markdown
The patterns that break AI agents are the same...
                 ^^^^^
Line 9: Negative framing about AI
Fix: "The patterns that need optimization for AI agents are the same..."

## How modern web architecture creates the problem
                                ^^^^^^^^^^^^^^^^^
Line 5: Problem-focused chapter subtitle
Fix: "## How modern web architecture evolved separately from agent needs"

I've spent nine chapters explaining what's broken and why it matters.
                                            ^^^^^^
Line 9: Negative framing
Fix: "I've spent nine chapters explaining what needs optimization and why it creates opportunity."
```

**Required checks:**

1. **Introduction/opening sections** - Should include advocacy statement
2. **Chapter subtitles** - Should use opportunity/optimization language
3. **Section headings** - Should avoid "problem/crisis/threat" framing
4. **Tone throughout** - Should emphasize collaboration over criticism

**Priority:** Important (Should Fix) - This is a book-wide positioning requirement

## HTML Content Handling

When reviewing HTML files (e.g., `web/back-cover.html`, `web/news.html`):

**Check text content only:**

- Extract text from HTML tags
- Check paragraph content, headings, list items
- Skip HTML attributes, JSON-LD data, meta tags

**Apply same rules:**

- Forbidden vocabulary
- Forbidden constructs
- British English
- Tone and voice

**Ignore technical content:**

- Schema.org structured data
- CSS styles
- JavaScript code
- HTML element names

**Example:**

```html
<p>This robust solution leverages cutting-edge technology.</p>
      ^^^^^^           ^^^^^^^^^    ^^^^^^^^^^^^
Line 45: Multiple violations
- "robust" → "strong" or "reliable"
- "leverages" → "uses"
- "cutting-edge" → "advanced" or "new"
Fix: "<p>This strong solution uses advanced technology.</p>"
```

## Edge Cases

### Code Blocks

**Rule:** Never flag content inside code blocks

```markdown
```javascript
// This code leverages the API to delve into data
```
```

**Action:** Skip - code blocks can use any vocabulary

### Inline Code

**Rule:** Never flag content in inline code

```markdown
The `leverage` function calls the API.
```

**Action:** Skip - inline code is technical reference

### Blockquote Citations

**Rule:** Context-dependent - if quoting external source, skip

```markdown
> "We need to leverage this robust platform." - External Source
```

**Action:** Skip if clearly cited, flag if original writing

### URLs and File Paths

**Rule:** Never flag words in URLs or file paths

```markdown
See <https://example.com/leverage-api> for details.
```

**Action:** Skip - URLs use their own vocabulary

### Technical Terminology

**Rule:** Some "forbidden" words are acceptable in technical contexts

**Examples:**

- "robust" in "robust encryption" (industry term)
- "leverage" in "financial leverage" (domain-specific)
- "delve" in "delve into databases" (rare but acceptable)

**Action:** Context-dependent - flag with note if unsure

### Markdown Metadata Tables (EDS Standard)

**Rule:** Never flag MD060 linting errors in metadata tables

**Recognition pattern:**

```markdown
| metadata |  |
| :---- | :---- |
| title | Document Title |
| author | Tom Cranstoun |
```

**What to do when encountering metadata tables:**

1. **Read and understand the metadata** - Provides context about file purpose, author, dates, AI instructions
2. **Revise analysis based on metadata** - Use `ai-instruction` field to guide review
   - Example: If `ai-instruction` says "self-contained, no forward references", check for chapter cross-references
3. **Ask user for confirmation** - If metadata suggests different treatment than standard review
4. **Never fix MD060 errors** - The `:----` alignment markers are intentional EDS standard format
5. **Respect special instructions** - If `purpose` or `ai-instruction` indicates special handling

**Common metadata fields:**

- **title:** Document title
- **author:** Content creator (usually Tom Cranstoun)
- **creation-date:** When originally created
- **publication-date:** When published or planned
- **modified-date:** Last modification
- **description:** Short summary
- **longdescription:** Extended description for AI context
- **purpose:** Why this document exists
- **ai-instruction:** Instructions for AI agents (e.g., "self-contained, no forward references")
- **jsonld:** Schema.org type (BlogPosting, Article, etc.)

**Example handling:**

```markdown
| metadata |  |
| :---- | :---- |
| ai-instruction | This markdown is self-contained and should not forward reference the book |

Line 2: MD060 table formatting warning
Action: SKIP - EDS metadata table uses standard `:----` format

During review: Check for forward references to book chapters
If found: Flag as violation of ai-instruction metadata
```

**Where metadata tables appear:**

- **Top placement (frontmatter):** Blog posts, chapters meant for AI agent consumption
- **Bottom placement (footnote-style):** Chapters meant for human readers in raw markdown

**Pattern documented in:** CLAUDE.md section "Markdown Metadata Tables (EDS Standard)"

### Book Title and Exceptions

**Rule:** Preserve exact book title and approved exceptions

**Always preserve:**

- "MX-Bible" (book title)
- "The Web We Built" (grammatically required)
- "The Price That Grew" (grammatically required)

**Example:**

```markdown
## MX-Bible

Line 1: "The" prefix in heading
Action: SKIP - Book title exception
```

## Quality Standards

### Accuracy

- Never flag content incorrectly (false positives)
- Always explain rule with style guide section reference
- Provide context-appropriate fixes
- **CRITICAL:** Statistics MUST match actual findings - never report placeholder numbers

### Completeness

- Check all sections of style guide
- Don't skip any categories
- Review entire document (not just first issues)
- Count ALL actual issues found before presenting statistics

### Clarity

- Line numbers for all issues
- Quote enough context (not just single word)
- Explain why rule exists when not obvious
- If no issues found, report "0 issues" - never fake statistics

### Prioritization

- Critical issues must be addressed
- Important issues should be addressed
- Style improvements are optional
- Markdown fixes for linting compliance
- **When zero issues found:** Celebrate! Report accurate "0" counts across all categories

## Success Indicators

✓ All forbidden vocabulary detected
✓ All forbidden constructs identified
✓ All heading format issues found
✓ Language (British English) validated
✓ Voice and tone checked
✓ AI patterns identified (24 pattern types)
✓ Markdown quality verified
✓ Line numbers accurate
✓ Fixes are specific and actionable
✓ Report is clear and organized

## Failure Indicators (Will Not Proceed)

✗ Cannot read file
✗ Cannot load style guide
✗ File format not supported (binary files)
✗ No issues found but file clearly violates rules (detection failed)

## What You Control

**You decide:**

- Which files to review
- Whether to apply all fixes or selective fixes
- Whether to skip style improvements
- Whether to proceed file-by-file or batch process

**I handle:**

- Loading and parsing style guide
- Detecting all violations
- Categorizing by severity
- Proposing specific fixes
- Applying edits if requested

## Tips for Best Results

1. **Review one file first** - Understand issue patterns before batch processing
2. **Apply Critical fixes immediately** - These are requirements
3. **Discuss Style improvements** - These may need judgment calls
4. **Run markdown linting after** - Verify fixes don't break formatting
5. **Commit after each file** - Don't mix multiple file changes

## After Completion

Once review and amendments are complete:

1. **Verify changes** - Read edited file to confirm fixes are correct
2. **Run linting** - Use `/md-fix` or `npm run lint:markdown:fix`
3. **Check git diff** - Review all changes before committing
4. **Commit** - Use `/step-commit` or manual commit with clear message
5. **Consider batch review** - Run same check on similar files

## Questions?

If you're unsure whether a document needs review, just provide the path - I'll analyze and report findings.

If you disagree with any flagged issue, let me know - some rules have context-dependent exceptions.

The goal is to maintain consistent, professional writing style across all manuscript content while preserving technical accuracy and authorial voice.

---

## Quick Reference: Style Guide Sections

1. **Collaborative Instructions** - Technical stack, linting
2. **Content Integration Rules** - How to add new topics
3. **Core Writing Rules** - Language, tone, voice, formatting
4. **Audience & Technical Segmentation** - Business vs technical content
5. **Forbidden Vocabulary** - 23 words to never use
6. **Forbidden Constructs** - 14 phrases to avoid
7. **Style Corrections** - Natural phrasing over academic/marketing
8. **Terminology & Standards** - Capitalization, markdown mechanics
9. **AI Pattern Detection and Humanization** - 24 AI-generated writing patterns to avoid, adding personality and voice

**Source:** [docs/for-ai/writing-style.md](docs/for-ai/writing-style.md)
