# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2026-01-22b] - Don't Make AI Think Pattern Integration

### Added

- **Appendix N: Anti-Patterns Catalog** (shared-appendices 5810744): Comprehensive reference of 13 common mistakes that break AI agent compatibility
  - Visual-only information (pricing tiers without semantic markup)
  - Content in images (service infographics without alt text)
  - Generic link text ("Learn more" without context)
  - Broken heading hierarchy (h1→h3→h2 chaos)
  - JavaScript-only navigation (empty nav elements)
  - Hidden content with no fallback (display:none accordions)
  - No/outdated sitemap (404 or stale links)
  - Inconsistent Schema.org (markup doesn't match visible content)
  - Forms without labels (placeholder-only inputs)
  - Table abuse (layout tables, missing th elements)
  - Content in iframes (news widgets without fallbacks)
  - PDF-only content (brochure downloads without HTML alternatives)
  - Auto-playing content (carousels, testimonials without pause controls)
  - Each pattern includes: problem description, real-world example with code, what AI sees vs humans see, complete fix with before/after code
  - Quick Wins Summary: 5 fixes that solve 80% of problems in 6-8 hours
  - ~3,000 words

- **Chapter 10 Enhancements** (bible 48520d2): Added foundational AI reader concepts
  - "Understanding AI Reader Types" section: Three types taxonomy (Raw Parsers, Browser-Based Agents, Vision Models)
  - "Token Budgets and Content Priority" section: Context window limits (GPT-4: 128k, Claude: 200k, Gemini: 2M tokens)
  - DOM order optimization principle: main content before navigation/sidebar for token efficiency
  - Schema.org type prioritization: six essential types covering 90% of use cases
  - ~950 words added

- **Chapter 11 Enhancements** (bible 48520d2): Added design decision framework
  - "Four Guiding Principles" section: Semantic Clarity Over Visual Clarity, Structure Reveals Intent, Metadata Makes Promises Explicit, Redundancy Serves Different Consumers
  - Strategic Redundancy concept: why duplication across visual/semantic/metadata layers serves different consumers
  - ~1,100 words added

- **Chapter 12 Enhancements** (bible 48520d2): Added comprehensive testing and implementation guidance
  - "Testing for AI Readability" section: Five practical testing methodologies
    - The Morning-After Test (copy HTML, ask AI what's on page)
    - Disable JavaScript Test (site usability check)
    - View Source Test (content in served HTML)
    - Link Text Extraction Test (self-explanatory links)
    - Heading Hierarchy Validation (logical structure check)
  - 10-Point Quick Audit Checklist with scoring system (8-10 = excellent, 5-7 = moderate, 0-4 = significant problems)
  - "Progressive Enhancement for Agents" section: Skeleton content, modal/accordion handling, pagination, loading states, AJAX navigation
  - "Implementation Roadmap" section: Five-phase approach (Assessment → Quick Wins → Structural → Content Patterns → Testing & Validation)
  - Real ROI case study: Automotive client, £12k investment, 60% AI recommendation increase, 35% organic search increase
  - Cost/resource planning by site size (small: £8k-£12k, medium: £15k-£25k, large: £50k-£150k)
  - ~2,400 words added (Chapter 12 now ~9,900 words total)

- **Appendix M Enhancements** (shared-appendices 5810744): Added three new sections
  - Section 18: Testing Methodologies (5 testing methods with chapter references)
  - Section 19: Anti-Patterns Reference (complete list with cross-references to Appendix N)
  - Section 20: Terminology Framework (Strategic Redundancy, Token Budget, Three Types of AI Readers, Morning-After Test, DOM Order, Visual vs Semantic Clarity)
  - YAML frontmatter added for consistency with other appendices
  - Document updated from v1.0 to v1.1
  - ~450 words added

- **YAML Frontmatter Standardization** (shared-appendices 5810744): Added frontmatter to Appendices M and N
  - All 14 shared appendices now have consistent YAML frontmatter (author, date, description, keywords, ai-instruction)
  - Maintains consistency with Bible chapter structure

### Changed

- **Bible wordcounts** (bible 48520d2): Core manuscript increased from ~78,000 to ~82,300 words
  - Chapter 10: ~13,076 → ~14,026 words
  - Chapter 11: ~6,773 → ~7,873 words
  - Chapter 12: ~11,468 → ~13,868 words

- **Appendices wordcounts** (shared-appendices 5810744): Total increased from ~58,600 to ~61,600 words
  - Appendix M: ~5,000 → ~5,450 words
  - Appendix N: ~3,000 words (new)

- **Main repository documentation**: Updated README.md to reflect 13 appendices (was 12)

### Integration Strategy

- Patterns from "Don't Make AI Think" (practical guide) integrated into "The Bible" (comprehensive guide)
- Bible provides conceptual framework with full examples
- Don't Make AI Think remains focused on tactical implementation
- No unnecessary duplication - content adapted to Bible's voice and depth
- Clear distinction maintained: Bible = why/what, Don't Make AI Think = how/quickly

### Submodule Updates

- **packages/bible**: Updated to commit 48520d2 (pattern integration across Chapters 10, 11, 12)
- **packages/shared-appendices**: Updated to commit 5810744 (Appendix N creation, Appendix M enhancement, YAML frontmatter standardization)

### Cross-Project Consistency

- New terminology documented in Appendix M Section 20 (Terminology Framework)
- Bible remains authoritative source for all terminology and patterns
- All markdown linting checks pass for modified files

## [2026-01-22a] - Markdown Linting and Schema.org Documentation Enhancement

### Added

- **Appendix M: Index of Metadata** (shared-appendices d2c14f7): Comprehensive categorized reference covering 150+ metadata elements
  - Schema.org types (18 categories): Product, Article, TVEpisode, Restaurant, Event, etc.
  - ARIA attributes: Status communication, form states, labels, roles
  - Data attributes: State tracking, content classification, carousel/animation control
  - YAML frontmatter fields: Core metadata, ai-instruction field for manuscript enforcement
  - HTML meta tags: Established standards and proposed AI-specific patterns
  - JSON-LD, microdata, semantic HTML elements
  - Testing patterns, strategic decisions, error prevention patterns
  - Complete with 17 categorized sections and Priority 1/2/3 quick reference guide

- **scripts/update_invisible_users_presentation.py**: Python utility for programmatically modifying PowerPoint presentations
  - Comprehensive AI assistant guidance for customization
  - Common modification patterns and examples
  - Dependencies: python-pptx library

### Changed

- **Chapter 10 Schema.org Guidance** (bible 796e89d): Expanded disambiguation for court opinions vs TV legal dramas
  - Court opinions: Article type with `genre="Judicial Opinion"` and `articleSection="Case Law"`
  - TV shows: TVEpisode type with `genre="Legal Drama"` and `partOfSeries` markup
  - Documented Ally McBeal citation incident where lawyers cited fictional cases in real court proceedings
  - Explained how fan transcripts without proper `@type` markup appear identical to legal precedents to AI agents

- **Chapter 0** (docs/shared-chapters/): Applied same Schema.org guidance to Ally McBeal example for consistency
- **Presentation slides** (docs/talks/members-call/): Updated Ally McBeal slide with explicit Schema.org markup requirements

### Fixed

- **Markdown Linting**: Fixed MD040 violations in docs/sales-enablement/CLAUDE.md (4 code blocks missing language specifications)
- **Markdown Linting**: Fixed 26 violations in Appendix M (MD032 blank lines around lists, MD031 blank lines around fences, MD034 bare URLs, MD036 emphasis as heading)

### Changed - Configuration

- **.claude/settings.local.json**: Added `Bash(python:*)` permission for Python script execution

### Submodule Updates

- **packages/shared-appendices**: Updated to commit d2c14f7 (Appendix M addition with markdown linting fixes)
- **packages/bible**: Updated to commit 796e89d (Chapter 10 Schema.org disambiguation expansion)

### Cross-Project Consistency

- All Schema.org terminology consistent across Bible (Chapter 10), Appendices (Appendix M), Chapter 0, and presentation slides
- Book manuscript remains authoritative source for all terminology and patterns
- Terminology flow: Bible → Appendices → Shared Chapters → Presentations

## [2026-01-22] - Timeless Manuscript Rule and YAML Frontmatter Implementation

### Added

- **Timeless Manuscript Rule**: Comprehensive system to enforce "write as if features have always existed" across all book manuscripts
  - **docs/for-ai/writing-style.md**: Added Section 3 Timeless Manuscript Rule with forbidden patterns and required writing style
  - **CLAUDE.md**: Added CRITICAL WRITING REQUIREMENT section listing all affected directories and enforcement approach
  - **docs/for-ai/yaml-frontmatter-template.md**: Complete template with examples for Bible, Slim, and Appendices (420 lines)
  - **docs/repo/TIMELESS-MANUSCRIPT-RULE.md**: Implementation summary with remaining work checklist and verification commands

- **YAML Frontmatter to All Book Manuscripts**: Added Pandoc YAML frontmatter to 38 book files across three submodules
  - **Bible submodule (b88d099)**: 13 chapter files with complete metadata
  - **Don't Make AI Think submodule (1025705)**: 11 chapters + preface with complete metadata
  - **Shared Appendices submodule (4a837ce)**: 12 appendix files with complete metadata
  - **docs/shared-chapters/chapter-00-what-are-ai-agents.md**: Added YAML frontmatter, removed old table-based metadata

- **Three-Book Ecosystem Documentation**:
  - Added comprehensive three-book strategy section to Chapter 0 explaining MX Bible, Don't Make AI Think, and The MX Handbook
  - Documented different audiences (executives, practitioners, architects) and reading pathways
  - Explained shared appendices hosted at allabout.network

### Changed

- **docs/shared-chapters/chapter-00-what-are-ai-agents.md**: Removed temporal language "launching simultaneously on April 2, 2026" → "part of a three-book ecosystem"
- **packages/dont-make-ai-think/chapters/preface.md**: Removed temporal language "launching April 2, 2026" → "part of a three-book series"
- **YAML Frontmatter Structure**: H1 headings stay in markdown content (not duplicated in YAML `title` field)

### Key Implementation Details

- **Mandatory `ai-instruction` field** in all book manuscript YAML frontmatter:

  ```yaml
  ai-instruction: |
    This is a book manuscript chapter. Write as if it has always existed.
    NEVER include: publication dates, "we added", "new feature", "launching",
    "this update", or any meta-commentary about the book's development.
    Write definitive present tense. Historical context about subject matter
    (industry events, product launches) is allowed.
  ```

- **Submodule-first workflow**: All three submodules committed and pushed before updating pointers in main repository
- **Quality assurance**: All files pass markdown linting, word counts calculated accurately
- **Documentation standards**: Enforcement through CLAUDE.md, writing-style.md, and YAML frontmatter template

### Submodule Updates

- **packages/bible**: Updated to commit b88d099
- **packages/dont-make-ai-think**: Updated to commit 1025705
- **packages/shared-appendices**: Updated to commit 4a837ce

## [2026-01-20h] - Presentation Enhancement with Chapter 0 Insights

### Added

- **docs/talks/members-call/talk-slides.md**: New markdown representation of presentation for easy review (25 slides)
- **Slide 7 (Four Types of AI Agents)**: Added technical depth explaining Server-Side, In-Browser, Browser Automation, and Local/On-Device agent constraints
- **Slide 20 (Machine Experience - MX)**: Added organizational framing positioning MX as strategic discipline requiring dedicated roles and executive commitment
- **Invisible Users definition**: Comprehensive definition added to CLAUDE.md Key Conceptual Themes section
- **Terminology guidance**: Added "The Invisible Users" section to docs/for-ai/writing-style.md with clarification protocol

### Changed

- **docs/talks/members-call/talk-slides.js**: Enhanced from v2.4.0 to v2.5.0 (22 → 25 slides)
  - Slide 3: Added commerce chain emphasis ("Miss any stage → The entire commerce chain breaks")
  - Slide 8: Softened Adobe LLM Optimizer critique from "WRONG approach" to "understandable but suboptimal"
  - Reordered slides for better flow (Agent Journey earlier, MX after Quick Wins)
- **docs/talks/members-call/talk.md**: Reordered speaker notes to match canonical JavaScript slide order
- **docs/shared-chapters/chapter-00-what-are-ai-agents.md**: Expanded invisible users definition with technical details about agent types and tracking challenges
- **docs/sales-enablement/pitches/meet-with-matt.md**: Replaced imprecise "5%" disability statistic with "relatively small proportion of total visitors"

### Notes - Presentation Enhancement Strategy

**Strategic Additions:**

- Four agent types help CTOs understand WHY different technical constraints require semantic structure
- MX discipline positions this as organizational change requiring dedicated roles (parallels QA engineering)
- Agent Journey emphasis on commerce chain breakage strengthens business case
- Adobe LLM Optimizer example provides concrete negative case while maintaining professional tone

**Chapter 0 as Source:** All enhancements derived from Chapter 0 content, maintaining book as authoritative source for all concepts and terminology.

**Flow Improvements:** Presentation now flows: concept definition → agent journey urgency → problem with data → root cause → agent types → technical failures → solutions → organizational framing → urgency → convergence principle

## [2026-01-20g] - Sales Enablement Materials Updated with CMS Pioneer Positioning

### Changed - Sales Materials

- **docs/sales-enablement/profiles/tom-profile.md**: Rewritten to lead with 49-year CMS history (1977-present), emphasizing Superbase and BBC credentials before Adobe experience
- **docs/sales-enablement/publishers/oreilly-author-bio.md**: Major update to Professional Summary emphasizing historical perspective, added "1977-1990: CMS before the term existed" section, updated timeline references from 25 years to 49 years, clarified January 2026 platform convergence
- **docs/sales-enablement/business/executive-summary.md**: Updated Founder Commitment section with complete timeline (49 years, Superbase, BBC, 12 years AEM, 3 years EDS)

### Added

- **book-launch-strategy.md**: New file (untracked, added by user)
- **docs/sales-enablement/CLAUDE.md**: New file (untracked, added by user)

### Removed

- **docs/for-tom/the-skillset.md**: Deleted
- **docs/sales-enablement/profiles/linkedin-about.md**: Deleted (moved to docs/for-tom/)

### Notes - Positioning Strategy

**Positioning Strategy Applied:**

- Primary identity: CMS Pioneer (49 years, 1977-present, started coding at age 21)
- Origin: Co-authored Superbase (pre-CMS terminology), built BBC news distribution system
- Recent work: 12 years Adobe AEM (including world's largest deployment), 3 years Edge Delivery Services
- Insight: EDS showed pattern being solved throughout career
- Framework: Machine Experience (MX) - platform-agnostic discipline
- Credential: "The AEM Guy" repositioned as supporting credential, not primary identity

**Remaining Updates Identified:**

Lower-priority files still contain "25 years" references (TIER 2-3 files):

- docs/sales-enablement/content/book.md
- docs/sales-enablement/publishers/oreilly-toc.md
- docs/sales-enablement/publishers/oreilly-author-bio.md (minor references in skills section)
- Other partner and outreach materials

## [2026-01-20f] - Documentation updates for platform convergence

### Changed

- **README.md**: Added Industry Context section documenting January 2026 platform launches (Amazon Alexa+, Microsoft Copilot Checkout, Google UCP + Shopping Agent)
- **CLAUDE.md**: Updated Project Overview with market timing context
- **CLAUDE.md**: Added strategic messaging concepts (Silent Failures, Platform Race, Convergence Principle) to Key Conceptual Themes section
- **CLAUDE.md**: Documented UCP submodule as read-only reference material maintained by external UCP project
- **packages/bible/README.md**: Added Market Context section explaining January 2026 convergence and book's coverage in Chapter 9
- **packages/dont-make-ai-think/README.md**: Added market timing context to Overview section

### Notes

This update reflects factual industry developments (January 2026 platform launches) and strengthens strategic messaging consistency across repositories. Business materials (revenue models, partnerships, publication strategies) remain in docs/sales-enablement/ only. UCP repository is read-only reference material and should not be modified.

## [2026-01-20e] - Presentation Restructure Based on Transcript Feedback

### Changed

- **Presentation Slides Major Restructure** (docs/talks/members-call/talk-slides.js v2.0.0)
  - Merged slides 2-3: Combined Adobe Insights and cruise error into single opening hook with highlight box
  - Reordered slide 3: Moved "Understanding Invisible Users" earlier for better conceptual framing
  - Slide count: 25 → 24 slides (maintains ~20 minute timing at 50 sec/slide)
  - Updated header metadata: version 1.0.0 → 2.0.0, added changes documentation

- **New Content Added**
  - Slide 5: "Why Current Systems Fail" - addresses EDS/markup problems, LLM Optimizer critique
  - Slide 11: "Myth vs Reality: Why Markdown Fails" - explicit debunking of markdown for AI agents
  - Slide 21: "The Future of CMS" - paradigm shift from presentation management to data management
  - All new slides based on extensive transcript discussion (Tom's stutters/pauses indicated unclear content)

- **Consolidated Narrative Sections**
  - Slides 19-22: Merged "Why This Matters Now", "Our Responsibility", timeline into cohesive narrative
  - Slide 19: Now single "Why This Matters Now: The Seven-Day Platform Race" combining urgency themes
  - Removed duplicate Web Audit Suite slide (was at positions 17 and 23)
  - Removed duplicate Call to Action slide (was at positions 18 and 24)

- **Convergence Principle Elevated**
  - Slide 23: Created dedicated "One Solution Serves Everyone" closing slide
  - No longer buried as item #4 in takeaways - now headline message before contact
  - Added "27 years behind the times" and "inflection point" messaging from transcript
  - Emphasizes "within two years, machines will read websites, not humans"

- **Guardrails Section Expanded** (Slide 22)
  - Title changed: "VPNs and Hidden Guardrails" → "Why Guardrails Aren't Enough"
  - Added: "System prompts work at reasoning level, NOT data extraction"
  - Added: "£203k cruise error proves validation MUST happen in HTML"
  - Added: "Don't rely on AI to 'think' correctly - give it facts in markup"
  - Emphasizes enriched HTML with explicit validation over AI guesswork

### Added

- **File Rename** (docs/sales-enablement/profiles/)
  - Renamed profile.md → tom-profile.md for clarity
  - Used `git mv` to preserve file history

### Impact Notes - Video Feedback Integration

These updates address all critical issues identified in video transcript analysis (docs/sales-enablement/vid.txt). Tom explicitly stated he combined Adobe/cruise slides ("a bit silly" to keep separate), emphasized convergence principle repeatedly as "the key bit", and spent significant time discussing EDS failures and markdown misconceptions that weren't in original slides. Reordering puts conceptual framing before technical examples. Consolidation creates coherent narrative flow replacing scattered sections. All transcript feedback incorporated while maintaining presentation timing and professional tone.

## [2026-01-20d] - Talk Materials Platform Race and Accessibility Updates

### Changed

- **Presentation Competitive Framing** (docs/talks/members-call/)
  - Slide 19: Added Microsoft isolation context (proprietary vs open standards)
  - Slide 23: Reframed "What Comes Next" as "Open vs Closed Competition"
  - Author position stated: "I hope open wins for ecosystem health"
  - Fragmentation risk between ACP and UCP made explicit
  - Timeline urgency updated: 12 months → 6-9 months or LESS
  - Major Developments section: Added competitive landscape analysis
  - Protocol section renamed: "Protocol Convergence" → "Open vs Closed Competition"

- **Accessibility Convergence Emphasis** (docs/talks/members-call/)
  - Convergence principle made explicit: "What machines need = what disabled users need"
  - "Machines AND screen readers" pairing added throughout both files
  - Slide 5: Added screen reader parallels to invisible failures
  - Slide 9: Updated to "These patterns break AI agents AND screen readers"
  - Slide 10: Added "CLI agents, screen readers see this" for served HTML
  - Pattern #1: Added "Screen readers announce role='alert' immediately"
  - Pattern #2: Added "Voice assistants for blind users read same structured data"
  - Pattern #3: Added "role='status' announces updates to screen readers AND agents"
  - Slide 24: Key takeaways rewritten with convergence principle
  - "Why This Happens" section: Lead with convergence principle, context added "same patterns since 1999"
  - All three pattern sections: Added "How this helps multiple audiences" subsections

### Impact Notes - Strategic Positioning

These updates strengthen competitive positioning (Microsoft isolation, open vs closed) while making accessibility convergence explicit throughout. First-mover advantage language preserved as critical sales hook. Professional business tone maintained. Both files remain synchronized for 20-minute presentation format.

## [2026-01-20c] - Members Call Presentation Materials

### Added - Presentation Files

- **Presentation Files** (docs/talks/members-call/)
  - `talk.md`: 20-minute presentation script with Pandoc YAML frontmatter (v1.0.0)
  - `talk-slides.js`: Google Apps Script for generating themed slide deck (25 slides)
  - Version metadata: Author, date (2026-01-20), audience (business leaders), duration
  - Content: £203,000 cruise error example, five integration patterns, Adobe Holiday 2025 insights
  - Platform timeline: Amazon Alexa+ (Jan 5), Microsoft Copilot (Jan 8), Google UCP (Jan 11, 2026)
  - AI advocacy framing throughout (optimization vs problem language)

### Changed

- **Writing Style Alignment**
  - Applied AI advocacy positioning from writing style guide (Section 10)
  - Replaced "break/fail/problem" language with "optimization/integration" framing
  - Changed "The Problem: Invisible Failures" → "Understanding Invisible Users"
  - Changed "The Five Types of Invisible Failure" → "Five Integration Patterns"
  - Updated all references: "sites break for agents" → "sites need optimization for agents"
  - Removed "The" prefix from "The Solution" heading (follows Section 6 guidelines)
  - British English throughout: "optimised", "whilst", "colour"

### Impact Notes - Presentation Materials

These presentation materials position the speaker as an AI advocate focused on collaboration and optimization opportunities, consistent with the book's core message. The dual-file structure (markdown script + JavaScript generator) provides both human-readable content and automated slide generation. All content aligns with writing style guide requirements for forbidden vocabulary, AI advocacy positioning, and professional tone.

## [2026-01-20b] - Multi-Repository Workflow Automation

### Added - Permissions and Documentation

- **Claude Code Permissions** (.claude/settings.local.json)
  - Added `git -C:*` wildcard permission for all submodule git operations
  - Added pipeline tools: xargs, sed, awk, sort, uniq, head, tail, cut
  - Added path utilities: basename, dirname, realpath
  - Added file inspection tools: file, stat, diff, comm, jq
  - Added git commands: show, rev-parse, describe, tag, fetch, pull, for-each-ref, symbolic-ref
  - Added GitHub CLI permissions: gh pr, gh issue, gh api
  - Enables streamlined multi-repo automation without constant permission prompts

- **Multi-Repository Permissions Documentation** (docs/for-ai/architecting-multi-repo-codebases.md)
  - New section "Claude Code Permissions for Multi-Repository Workflows"
  - Recommended permissions configuration with JSON examples
  - Security warnings and considerations (critical warning about understanding permissions)
  - Before/after workflow examples showing automation benefits
  - Maintenance guidelines for quarterly permission review
  - Clear guidance on permissions to keep in "ask" mode and never auto-approve

### Changed - Dependencies

- **package-lock.json**: Automatic dependency resolution updates

### Impact Notes - Workflow Automation

These permissions eliminate repetitive approval prompts for multi-repo automation (git -C commands, linting pipelines, text processing) while maintaining security through ask-mode for destructive operations (git restore, git reset, bash scripts). The documentation ensures users understand security implications before adoption.

## [2026-01-20] - Replace EDS Metadata with Pandoc YAML Frontmatter

### Changed

- **Appendix L Pattern 4** (shared-appendices submodule)
  - Complete rewrite from "EDS Markdown Metadata Tables" to "Pandoc YAML Frontmatter for Markdown Metadata"
  - Updated status from "Proposed - Adobe EDS" to "Established Standard - Universal markdown frontmatter"
  - Replaced all table examples with YAML frontmatter format
  - Updated rationale, use cases, benefits, forward compatibility, adoption considerations
  - Added Pandoc documentation reference: <https://www.codestudy.net/blog/what-can-i-control-with-yaml-header-options-in-pandoc/>
  - Updated cross-references throughout appendix (lines 30, 885, 974)

- **Chapter 10** (bible submodule)
  - Updated markdown converter solution to reference Pandoc YAML frontmatter instead of EDS metadata tables
  - Maintains problem description about HTML-to-markdown metadata loss
  - Solution now recommends universal Pandoc standard

- **Chapter 12** (bible submodule)
  - Removed Adobe Edge Delivery Services code example reference (non-existent directory)

- **Chapter 5** (dont-make-ai-think submodule)
  - Updated all JSON-LD examples to remove Adobe/EDS references
  - Organization description: "Enterprise content management and web development consultancy"
  - Article headline: "How to Migrate from Legacy CMS to Modern Web Architecture"
  - HowTo example: "How to Install Node.js CLI Tools"

- **CLAUDE.md** (main repository)
  - Replaced "Markdown Metadata Tables (EDS Standard)" section with "Markdown Metadata (Pandoc YAML Frontmatter)"
  - Removed MD060 linting exception (no longer needed)
  - Updated examples to show YAML frontmatter format
  - Added standard fields documentation

- **docs/for-ai/architecting-multi-repo-codebases.md** (main repository)
  - Rewrote Pattern 2 from "EDS Metadata Tables" to "Pandoc YAML Frontmatter"
  - Complete section rewrite with YAML examples
  - Added build system integration examples
  - Updated all references throughout document

- **docs/for-ai/writing-style.md** (main repository)
  - Updated metadata section from "EDS Markdown Metadata Tables" to "Pandoc YAML Frontmatter"
  - Replaced table example with YAML format
  - Removed MD060 linting reference

### Added

- **Appendix H** (shared-appendices submodule)
  - New section "Markdown Metadata Standards for AI Agents"
  - Explains how YAML frontmatter complements llms.txt (site-wide vs per-document metadata)
  - Provides standard Pandoc fields (title, author, date, abstract, keywords)
  - Provides custom AI agent fields (description, ai-instruction, purpose, context)
  - Includes platform support details (Hugo, Jekyll, Gatsby, Quarto, Pandoc)
  - Added build system integration examples showing YAML-to-HTML-meta transformation
  - Links to Pandoc, Hugo, and Jekyll documentation

### Removed

- All references to "EDS metadata tables" as a proposed pattern (except historical records in PROJECTSTATE.md)
- Adobe Edge Delivery Services mentions from book content (retained only in Appendix H author bio/expertise section)
- MD060 linting exception from config (was specific to EDS `:----` table alignment)

### Submodules Updated

- packages/shared-appendices: d11b36f → b2368e8 (Appendix L Pattern 4 + Appendix H YAML section)
- packages/bible: b2c266b → 592701e (Chapter 10 and 12 updates)
- packages/dont-make-ai-think: 9dfc864 → 78c716b (Chapter 5 JSON-LD examples)

### Notes (2026-01-20)

- This change replaces the proposed Adobe-specific EDS metadata table pattern with the universal Pandoc YAML frontmatter standard
- YAML frontmatter is supported by all major static site generators (Hugo, Jekyll, Gatsby, Quarto) and the Pandoc document converter
- Adobe EDS expertise remains documented in Appendix H author bio section
- All cross-references updated to point to Pattern 4 as "Pandoc YAML Frontmatter"
- Verification confirmed zero "EDS metadata" or "metadata table" references in book content (excluding historical changelog entries)

## [2026-01-19g] - Fix PDF Footer and Update Step-Commit Workflow

### Fixed

- **PDF footer rendering** (dont-make-ai-think book)
  - The `-V footer-center` pandoc flag doesn't work with default LaTeX templates
  - Created metadata.yaml with fancyhdr LaTeX package configuration
  - Footer now displays: "Early Draft - Commercial Work - Do Not Distribute"
  - Page numbers appear on outer edges (left/right pages)
  - Same approach as Bible book for consistency

### Changed

- **PDF generation scripts** (main repository package.json)
  - Updated all four dont-make-ai-think scripts to include metadata.yaml
  - Removed redundant `-V footer-center` flags (don't work)
  - Removed redundant `--metadata` flags (now in YAML)
  - Cleaner, more maintainable script commands

- **Step-commit workflow** (.claude/commands/step-commit.md and .claude/skills/step-commit.json)
  - Removed Step 7 (Project State / PROJECTSTATE.md)
  - CHANGELOG.md now serves as both historical record AND current project state
  - Renumbered: Step 8 (Changelog) → Step 6, Step 9 (Final Steps) → Step 7
  - Enhanced Changelog step description with comprehensive entry guidelines

### Added

- **metadata.yaml** (dont-make-ai-think submodule)
  - LaTeX header configuration with fancyhdr and listings packages
  - Document metadata (title, subtitle, author, date)
  - Code listing formatting with automatic line breaks
  - Professional footer styling

### Submodules Updated

- packages/dont-make-ai-think: afd39a2 → 9dfc864 (metadata.yaml added)
- outputs: 5ba0746 → a2b6268 (regenerated PDFs with footer)

### Notes (2026-01-19g)

- PDFs now include proper footer on all pages
- Footer uses italic font styling for professional appearance
- Approach matches Bible book for consistency across publications
- Step-commit workflow simplified by eliminating redundant PROJECTSTATE.md

## [2026-01-19f] - Complete Don't Make AI Think Book

### Added

- **Preface for Don't Make AI Think book** (dont-make-ai-think submodule)
  - New preface: 684 words, practical tone matching slim book style
  - Two-directional reading guidance (business leaders start at back, developers at front)
  - Critical warning that developers must read Chapter 11 for justification
  - Cross-references to Bible and shared online resources
  - Role-based entry points (frontend dev, UX designer, QA, technical leads, business leaders)

- **Chapter 11: Business Imperative** (dont-make-ai-think submodule)
  - New chapter: 1,544 words abstracted from Bible's comprehensive Chapter 4
  - Platform race coverage (Amazon, Microsoft, Google - January 2026)
  - Revenue model collision mathematics (87% page view reduction)
  - Stack Overflow case study (28% workforce reduction)
  - E-commerce validation (Microsoft Copilot Checkout, 80%+ conversion)
  - First-mover advantage and network effects
  - Strategic assessment framework (4 exposure categories)
  - Implementation ROI with concrete 780% example
  - Protocol integration decisions (ACP vs UCP vs Copilot)
  - Industry-specific implications

- **Professional cover page** (dont-make-ai-think submodule)
  - LaTeX-formatted cover with title, subtitle, author, date
  - "EARLY DRAFT" notice and distribution warning
  - "Commercial Work - Do Not Distribute" footer

### Changed

- **Updated CHAPTERS-GUIDE.md** (dont-make-ai-think submodule)
  - Added Chapter 11 section with comprehensive bullet points
  - New "Reading Order" section emphasizing two-directional reading approach
  - Updated implementation paths for different roles (tech leads, developers, everyone)

- **Updated README.md** (dont-make-ai-think submodule)
  - Added "Front Matter" section (cover page, preface)
  - Added Chapter 11 to chapter list
  - New "Live Resources" section with allabout.network links
  - Expanded "Target Audience" with business leaders and reading guidance
  - Added two-directional reading concept to overview

- **PDF generation scripts** (main repository)
  - Updated all four dont-make-ai-think PDF scripts (generate, kindle, simple, all)
  - New file order: 00-cover.md → preface.md → chapter-*.md → CHAPTERS-GUIDE.md
  - Added universal footer: "Early Draft - Commercial Work - Do Not Distribute"
  - Updated chapter glob to include all 11 chapters

### Fixed

- **Unicode character replacements** (dont-make-ai-think submodule)
  - chapter-06-navigation.md: Box-drawing characters (├ └ │ ─) → ASCII (`+`, `-`, `|`)
  - chapter-08-testing.md: Checkmarks (✓ ✗) → `[PASS]` and `[FAIL]`
  - chapter-04-content-architecture.md: Stars (★★★★★) → "5 stars"
  - Result: Zero PDF font warnings, clean 587KB PDF generation

- **Documentation updates** (main repository)
  - docs/for-ai/writing-style.md: Added ASCII character guidelines (Section 8)
  - docs/for-ai/writing-style.md: Added "no time estimates" guidance
  - .claude/skills/review-docs/skill.md: Added special character check (item #11)
  - CLAUDE.md: Updated slim book description (10 → 11 chapters)

### Submodules Updated

- packages/dont-make-ai-think: c63fa7c → afd39a2
- packages/bible: 5ab5a86 → b2c266b (minor corrections)
- outputs: 7dc0705 → 5ba0746 (PDFs and blog rename)

### Notes (2026-01-19f)

- The slim book now has complete front matter, all 11 chapters, and professional formatting
- Two-directional reading approach serves both technical and business audiences
- ASCII-only approach eliminates PDF font warnings across all platforms
- Live resources at allabout.network provide continuously updated appendices and news

## [2026-01-19e] - Move SVG Style Guide and Complete Manuscript Cleanup

### Changed

- **Moved book-svg-style.md to config/ directory**
  - Relocated from `packages/manuscript/book-svg-style.md` to `config/book-svg-style.md`
  - The SVG style guide is a shared configuration resource used across multiple book submodules
  - Belongs in main repository's `config/` directory alongside `.markdownlint.json`

- **Updated all references to SVG style guide**
  - Updated CLAUDE.md: Repository structure diagrams and documentation reference list
  - Updated docs/repo/ONBOARDING.md: Directory tree structure
  - Updated .claude/commands/review-docs.md: Example paths updated to current submodules

- **Removed packages/manuscript/ directory**
  - Directory is now empty and has been removed
  - Completes the cleanup of legacy manuscript structure

### Notes

- All references to `packages/manuscript/` have been removed or updated
- SVG style guide is now in the correct location as a shared config file
- Legacy manuscript structure cleanup is complete

## [2026-01-19d] - Remove Legacy Manuscript Submodule References

### Changed

- **Documentation cleanup for current submodule structure**
  - Updated README.md: Replaced legacy `packages/manuscript/` reference with list of 5 current submodules (bible, dont-make-ai-think, shared-appendices, shared-code-examples, outputs)
  - Updated CLAUDE.md: Changed submodule update examples from `packages/manuscript/the-bible-of-mx` to `packages/bible`
  - Updated GIT-README.md: Replaced all 40+ occurrences of `packages/manuscript/the-bible-of-mx` with `packages/bible` in examples
  - Updated .claude/pwd-reminder.md: Replaced legacy example location with current submodule locations
  - Updated .claude/commands/step-commit.md: Generalized `packages/manuscript` references to generic `submodule`
  - Updated docs/sales-enablement/pitches/critique.md: Removed legacy archival recommendation, updated to reflect current structure

### Notes

- This cleanup removes confusion for contributors about the legacy manuscript structure
- All git workflow examples now use current submodule paths
- The `packages/manuscript/` directory was later removed completely in 2026-01-19e

## [2026-01-19c] - Chapter 8 Markdown Linting Fixes

### Fixed

- **Chapter 8 markdown linting errors** (dont-make-ai-think submodule)
  - Fixed MD040: Added language specification (`text`) to all 9 code blocks (conversation examples, error messages)
  - Fixed MD036: Converted 7 emphasis labels to proper headings (### Test 1-3, ### Phase 1-4)
  - Fixed MD034: Wrapped 3 bare URLs in angle brackets (auto-fixed)
  - Fixed MD032: Added blank lines around 6 lists (auto-fixed)
  - All 24 linting errors resolved, chapter now passes markdownlint validation

### Changed

- Updated dont-make-ai-think submodule pointer to commit a45fc8f

## [2026-01-19a] - Chapter 8 Addition and Git Workflow Enhancement

### Added

- **Chapter 8 to Don't Make AI Think book** (dont-make-ai-think submodule)
  - New chapter: "Testing with AI Agents" (785 lines)
  - Covers: morning-after test, testing with multiple AI tools, structured data validation, automated testing approaches, common testing mistakes, implementation roadmap
  - Updated README.md: Changed Chapter 8 from "(Chapter 8 content TBD)" to complete description
  - Updated CHAPTERS-GUIDE.md: Removed "(to be created)" marker and updated bullet points to match actual content
  - Updated chapters/README.md: Fixed author information (Tom Harris → Tom Cranstoun)

- **Git mv enforcement in CLAUDE.md**
  - Added rule #5 to Git Workflows: "Always use git mv for renaming tracked files"
  - Added file renaming examples showing correct (git mv) vs wrong (mv) approaches
  - Prevents loss of git history when renaming files
  - Includes examples for main repo and submodules using git -C

### Fixed

- **Chapter 5 filename** (dont-make-ai-think submodule)
  - Renamed 'chapter-05-metadata-that-works .md' to chapter-05-metadata-that-works.md
  - Removed trailing space from filename using git mv (preserves git history)

### Changed

- Updated .claude/settings.local.json with git mv permission patterns
- Fixed .claude/skills/humanizer/skill.md file permissions (mode change)
- Updated dont-make-ai-think submodule pointer to commit 74124a3 (later updated to a45fc8f after linting fixes)

## [2026-01-19b] - Repository Purpose Documentation

### Added

- **Repository Purpose Sections**: Added "Repository Purpose and Structure" sections to all five submodule READMEs
  - packages/bible/README.md - Clarifies content-only nature of manuscript repository
  - packages/dont-make-ai-think/README.md - Clarifies slim guide repository structure
  - packages/shared-appendices/README.md - Clarifies shared appendices repository purpose
  - packages/shared-code-examples/README.md - Emphasizes reference library nature
  - outputs/README.md - Clarifies storage-only purpose for generated content
  - All sections explain: no package.json, no dependencies, no scripts, no build tooling
  - Cross-references to parent repository CLAUDE.md and GIT-README.md

- **Main README Enhancement**: Added "Why Submodules Exist: Separation of Concerns" section
  - Documents key principles of multi-repository architecture
  - Lists 6 benefits: independent version control, no dependency sprawl, clean collaboration, reusability, access control, build isolation
  - Clarifies that submodules cannot be built independently
  - Updated repository structure diagram with [SUBMODULE] markers
  - Distinguishes between main repo only items (docs/, config/, scripts/, .claude/) and submodules

### Changed

- Repository structure diagram now clearly marks which directories are submodules
- Clarified that web-audit-suite/ is NOT a submodule
- Emphasized parent repository controls all build processes, PDF generation, and linting

### Documentation

- Enhanced understanding of separation of concerns across all repositories
- Improved clarity for both human contributors and AI assistants reading repository documentation
- All changes maintain British English style and professional tone

**Note**: This changelog tracks changes to the main repository. For bible submodule changes, see packages/bible repository. For Web Audit Suite changes, see packages/web-audit-suite/CHANGELOG.md.
