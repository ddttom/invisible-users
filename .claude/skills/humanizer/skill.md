# Humanizer Skill

**Command:** `/humanizer`

**Purpose:** Remove AI-generated writing patterns and inject authentic human voice into text.

## What This Skill Does

This skill transforms AI-generated or sterile text into writing that sounds genuinely human. It goes beyond pattern removal to actively inject personality, rhythm, and soul.

**Two-phase approach:**

1. **Remove AI "slop"** - Identify and eliminate 24 mechanical patterns
2. **Inject personality** - Add voice, opinions, rhythm, and authentic human characteristics

**When to use:**

- Marketing copy that sounds too algorithmic
- Blog posts lacking personality
- Documentation that's technically correct but lifeless
- Any text that needs to sound more human

## How to Use

```bash
# Humanize text in a file
/humanizer path/to/file.md

# Humanize multiple files
/humanizer file1.md file2.md file3.md

# Common use cases
/humanizer outputs/bible/blogs/blog-post-draft.md
/humanizer packages/sales-enablement/pitches/pitch-deck-copy.md
/humanizer packages/bible/chapters/chapter-intro.md
```

## 5-Phase Workflow

### Phase 1: Load AI Pattern Detection Rules

**Automatic actions:**

- Read [docs/for-ai/writing-style.md](docs/for-ai/writing-style.md) ("Writing Style Guide: MX Series" at <https://github.com/ddttom/invisible-users/blob/main/docs/for-ai/writing-style.md>) Section 9
- Load all 24 AI pattern types:
  - 6 content patterns
  - 5 language/grammar patterns
  - 6 style patterns
  - 3 communication patterns
  - 4 filler/hedging patterns
- Prepare detection checklist
- Load voice injection guidelines

**What I'll do:** Confirm rules loaded successfully

### Phase 2: Analyze and Detect AI Patterns

**Automatic actions:**

For the provided file:

1. **Read file contents completely**
2. **Scan for all 24 AI patterns:**
   - Content patterns: significance inflation, media coverage emphasis, superficial -ing analyses, promotional language, vague attributions, formulaic challenges sections
   - Language patterns: AI vocabulary, copula avoidance, negative parallelisms, rule of three forcing, elegant variation, false ranges
   - Style patterns: em dash overuse, boldface abuse, inline-header lists, title case headings, emojis, curly quotes
   - Communication patterns: chatbot artifacts, knowledge disclaimers, sycophantic tone
   - Filler patterns: verbose constructions, excessive hedging, generic conclusions
3. **Identify soulless writing indicators:**
   - Uniform sentence length/structure
   - No opinions or personality
   - No acknowledgment of uncertainty
   - Missing first-person perspective
   - Flat, Wikipedia-like tone
4. **Note line numbers for all violations**
5. **Assess overall voice level** (0-10 scale where 0 = pure AI, 10 = authentic human)

**What I'll do:** Build comprehensive pattern detection report

### Phase 3: Plan Humanization Strategy

**Automatic actions:**

1. **Prioritize fixes:**
   - Critical: Communication patterns (make text unusable)
   - High: Content and language patterns (damage credibility)
   - Medium: Style patterns (look mechanical)
   - Low: Filler patterns (reduce clarity)
2. **Plan voice injection:**
   - Identify opportunities for opinions/reactions
   - Find places to vary sentence rhythm
   - Locate moments to acknowledge complexity
   - Spot appropriate first-person usage
   - Find places to inject specific feelings
3. **Map section-by-section rewrites:**
   - Quote original text with line numbers
   - Propose humanized version
   - Explain changes (pattern removal + voice added)

**What I'll do:** Present humanization strategy for approval

### Phase 4: Execute Humanization

**Automatic actions:**

For each section requiring humanization:

1. **Remove AI patterns** (systematic pattern replacement)
2. **Inject voice elements:**
   - Add opinions and reactions where appropriate
   - Vary sentence length (short punchy + longer flowing)
   - Include acknowledgment of complexity/uncertainty
   - Use first person when honest and appropriate
   - Add specific feelings over generic statements
   - Let in some controlled "mess" (tangents, asides)
3. **Preserve meaning** (don't change facts or core message)
4. **Maintain appropriate tone** (match context: technical, casual, formal)
5. **Track changes** (before/after for each section)

**What I'll do:** Execute rewrites section by section, showing progress

### Phase 5: Present Results

**Automatic actions:**

Generate comprehensive humanization report:

```markdown
## Humanization Results: [filename]

### Statistics
- AI patterns detected: XX
  - Content patterns: XX
  - Language patterns: XX
  - Style patterns: XX
  - Communication patterns: XX
  - Filler patterns: XX
- Voice score before: X/10
- Voice score after: X/10
- Sections rewritten: XX

### Key Improvements

1. **Pattern Removal**
   - [List main AI patterns eliminated]

2. **Voice Injection**
   - [List voice elements added: opinions, rhythm, first person, etc.]

### Before/After Examples

**Section 1 (Lines XX-XX):**

Before:
> [Original text with AI patterns]

After:
> [Humanized version with voice]

Changes made:
- Removed [specific patterns]
- Added [specific voice elements]

[Repeat for each major section]

### Complete Rewritten File

[Show full humanized version or offer to write to file]

## What would you like to do?

- "Apply changes" - Write humanized version to file
- "Show more examples" - See additional before/after sections
- "Adjust tone" - Make it more/less formal, casual, technical
- "Skip this file" - Move to next file (if multiple)
```

**What I'll do:** Present results and await your decision

## Humanization Principles

### What Makes Writing Sound Human

1. **Varied rhythm:** Mix short punchy sentences with longer flowing ones
2. **Opinions:** React to facts, don't just report them
3. **Uncertainty:** Acknowledge complexity and mixed feelings
4. **First person:** Use "I" when honest and appropriate
5. **Specific feelings:** "Unsettling" beats "concerning"
6. **Controlled mess:** Tangents and asides show real thinking

### What to Avoid

1. **Over-correction:** Don't swing from sterile to overly casual
2. **Forced personality:** Opinions must feel natural, not tacked on
3. **Inappropriate tone:** Match context (technical doc ≠ blog post)
4. **Meaning drift:** Never change facts or core message
5. **Pattern trading:** Don't replace AI patterns with other AI patterns

## Pattern Detection Reference

### Content Patterns (6)

1. **Significance inflation:** stands/serves as, testament, vital role, marking/shaping, represents a shift
2. **Media coverage emphasis:** independent coverage, leading expert, active social media presence
3. **Superficial -ing:** highlighting, ensuring, reflecting, symbolising, contributing
4. **Promotional language:** boasts, vibrant, nestled, breathtaking, renowned, stunning
5. **Vague attributions:** Industry reports, Observers, Experts argue, several sources
6. **Formulaic challenges:** Despite these challenges, Future Outlook, Challenges and Legacy

### Language Patterns (5)

7. **AI vocabulary:** Additionally, align with, key (adj), landscape (abstract), valuable
8. **Copula avoidance:** serves as/stands as/marks instead of is/are
9. **Negative parallelisms:** "It's not just X, it's Y", "Not only... but also..."
10. **Rule of three forcing:** Artificial grouping into threes
11. **Elegant variation:** Excessive synonym cycling (protagonist → main character → central figure → hero)
12. **False ranges:** "from X to Y" where X and Y aren't on a scale

### Style Patterns (6)

13. **Em dash overuse:** Using — instead of commas
14. **Boldface abuse:** Mechanical emphasis on every term
15. **Inline-header lists:** **Label:** Description format
16. **Title case headings:** All Main Words Capitalised
17. **Emojis:** 🚀 💡 ✅ decorating content
18. **Curly quotes:** "..." instead of "..."

### Communication Patterns (3)

19. **Chatbot artifacts:** "I hope this helps", "Of course!", "Would you like..."
20. **Knowledge disclaimers:** "as of [date]", "based on available information"
21. **Sycophantic tone:** "Great question!", "You're absolutely right!"

### Filler/Hedging (4)

22. **Verbose constructions:** "in order to" → "to", "due to the fact that" → "because"
23. **Excessive hedging:** "could potentially possibly be argued that" → "may"
24. **Generic conclusions:** "exciting times lie ahead", "the future looks bright"

## Example Transformations

### Example 1: Blog Post Opening

**Before (AI-generated, voice score 2/10):**

> Additionally, the platform serves as a robust solution for modern enterprises. Industry reports suggest it represents a pivotal moment in the evolution of digital transformation, showcasing cutting-edge features that enhance productivity. Despite challenges, the future looks bright for this groundbreaking technology.

**After (humanized, voice score 8/10):**

> I've spent three weeks testing this platform, and here's what surprised me: it actually works. No marketing fluff this time. The tool does what it promises - speeds up our deployment by about 40%. That's real time saved, not "enhanced productivity" nonsense. Is it perfect? No. The UI still feels clunky in spots. But for the price point, I'm genuinely impressed.

**Changes made:**
- Removed: Additionally, serves as, robust, Industry reports, represents a pivotal moment, showcasing, cutting-edge, enhance, Despite challenges, future looks bright, groundbreaking
- Added: First person perspective ("I"), specific metric (40%), honest opinion ("actually works"), acknowledgment of flaws ("UI still feels clunky"), mixed feelings structure

### Example 2: Technical Documentation

**Before (sterile, voice score 3/10):**

> The system features a comprehensive authentication mechanism. It leverages JWT tokens to ensure secure access. The implementation showcases best practices for modern web applications. It is important to note that the system has the ability to handle multiple authentication providers.

**After (humanized, voice score 7/10):**

> Authentication uses JWT tokens. The implementation follows standard OAuth 2.0 patterns - nothing fancy, but solid. Supports multiple providers (Google, GitHub, email). Setup takes about 10 minutes if you've done it before. The token refresh logic is worth reading if you're debugging login issues.

**Changes made:**
- Removed: features, comprehensive, leverages, ensure, showcases, best practices, it is important to note, has the ability to
- Added: Specific examples (Google, GitHub), practical context (10 minutes), helpful tip (token refresh), conversational structure
- Maintained: Technical accuracy, key information

### Example 3: Marketing Copy

**Before (promotional AI slop, voice score 1/10):**

> Our vibrant platform boasts cutting-edge technology that empowers teams to achieve groundbreaking results. From streamlined workflows to enhanced collaboration, we're revolutionising how modern enterprises operate. Join us on this exciting journey towards excellence!

**After (humanized with personality, voice score 9/10):**

> Look, project management tools are boring. We know this. But here's the thing - ours actually cuts meeting time by about 30% because your team can see everything in one place. No more "quick sync" hell. We tested it with 50 companies last quarter. The feedback? "Finally, something that doesn't make us want to quit our jobs."

**Changes made:**
- Removed: vibrant, boasts, cutting-edge, empowers, groundbreaking, From X to Y, streamlined, enhanced, revolutionising, exciting journey towards excellence
- Added: Candid admission ("boring"), specific benefit (30% fewer meetings), real test data (50 companies), genuine feedback quote, humour ("quit our jobs")
- Tone shift: From generic hype to honest, relatable pitch

## Multi-File Processing

When multiple files are provided:

1. **Process each file sequentially**
2. **Present individual reports** with statistics and key improvements
3. **Ask for action on each file** before proceeding
4. **Summarize totals at end:**
   - Total AI patterns removed across all files
   - Average voice score improvement
   - Total sections rewritten

**Example summary:**

```
## Multi-File Humanization Summary

Files processed: 3
- blog-post-draft.md: 23 patterns removed, voice 2/10 → 8/10
- pitch-deck-copy.md: 31 patterns removed, voice 1/10 → 9/10
- chapter-intro.md: 15 patterns removed, voice 4/10 → 7/10

Total AI patterns eliminated: 69
Average voice improvement: +6.0 points
Files modified: 3
```

## Edge Cases and Special Handling

### Technical Documentation

- Maintain technical accuracy (don't simplify correct terminology)
- Voice injection is subtle (practical tips, honest assessments)
- First person acceptable for troubleshooting guidance
- Don't add humour where inappropriate

### Academic/Professional Content

- Remove AI patterns but keep professional tone
- Voice comes from clear structure and confident assertions
- Avoid casual language
- First person only for methodology or conclusions

### Marketing/Blog Content

- Full voice injection appropriate
- Humour and personality welcome
- Honest reactions over hype
- Specific details beat generic praise

### Code Comments

- Don't humanize code examples or technical identifiers
- Can humanize surrounding prose
- Keep comments concise and clear

## Quality Standards

### Accuracy

- Never change facts or core message
- Maintain technical accuracy
- Preserve important nuances
- Don't invent information

### Appropriateness

- Match tone to context
- Don't force personality where inappropriate
- Respect professional boundaries
- Consider audience expectations

### Effectiveness

- Actual voice improvement (not pattern swapping)
- Readable and engaging result
- Meaning preserved or enhanced
- Appropriate level of personality for context

### Transformation Quality Checklist

Ensure the revised text:

- **Sounds natural when read aloud** - Read the result out loud. Does it flow like speech?
- **Varies sentence structure naturally** - Mix short and long sentences. Avoid uniform rhythm
- **Uses specific details over vague claims** - Replace "many companies" with "50 companies in Q3 2024"
- **Maintains appropriate tone for context** - Technical docs stay professional, blog posts can be casual
- **Uses simple constructions (is/are/has) where appropriate** - Prefer "is" over "serves as", "has" over "features"

## Success Indicators

✓ All 24 AI patterns detected accurately
✓ Pattern removal complete
✓ Voice elements successfully injected
✓ Meaning and facts preserved
✓ Tone appropriate for context
✓ Voice score improved significantly (target: +4 points minimum)
✓ Result sounds authentically human
✓ Changes are trackable and reversible

## Failure Indicators (Will Not Proceed)

✗ Cannot read file
✗ File format not supported (binary files)
✗ No AI patterns detected but file clearly has them (detection failed)
✗ Unable to preserve meaning during rewrite

## Comparison with /review-docs

**`/review-docs` (comprehensive style check):**
- Checks all 9 sections of style guide
- Identifies violations
- Proposes fixes
- Reports issues by category
- You decide what to fix

**`/humanizer` (focused transformation):**
- Focuses on Section 9 (AI patterns) + voice injection
- Automatically rewrites text
- Presents before/after transformations
- Actively adds personality
- You approve final result

**When to use which:**

- Use `/review-docs` for manuscript chapters, appendices, formal documentation (catches all style issues)
- Use `/humanizer` for blog posts, marketing copy, anything needing personality (focused on voice)

## Tips for Best Results

1. **Start with one file** - Understand the transformation style before batch processing
2. **Review before applying** - Check that voice matches your expectations
3. **Provide context** - Tell me if tone should be casual, professional, technical
4. **Iterate if needed** - Ask for tone adjustments if first pass isn't right
5. **Combine with /review-docs** - Run full style check after humanization for comprehensive quality

## After Completion

Once humanization is complete:

1. **Review changes** - Read humanized version carefully
2. **Verify voice** - Does it sound like you/your brand?
3. **Check facts** - Ensure no information was changed
4. **Apply if satisfied** - Write changes to file
5. **Run /review-docs** - Catch any remaining style issues
6. **Commit** - Use `/step-commit` or manual commit with clear message

---

**Ready to humanize your text? Provide a file path and I'll transform AI slop into authentic human voice.**
