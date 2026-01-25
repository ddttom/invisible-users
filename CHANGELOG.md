# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2026-01-25 - Chapter Title Refinements and Epilogue]

### Changed - Advisory Tone Refinement

- **Bible Submodule** (commits d03547c, f9389d4):
  - Renamed `chapters/chapter-13-what-agent-creators-must-build.md` → `chapter-13-what-agent-creators-should-build.md`
  - Renamed `chapters/chapter-14-what-AI-agents-must-do.md` → `chapter-14-what-AI-agents-should-do.md`
  - Updated chapter titles from prescriptive "must" to advisory "should"
  - Updated YAML frontmatter descriptions to reflect advisory tone
  - Updated illustration references to match new filenames
  - Fixed markdown linting error (MD032) in Chapter 14 blockquote list

### Added - Epilogue

- **Bible Submodule** (commit cdfe61e):
  - Added new "Epilogue — The Story Continues" section to `chapters/The-End.md`
  - Introduces MX-Gathering as living continuation of the discipline
  - Emphasizes community-driven practice shaped by builders, thinkers, and AI agents
  - Highlights metadata and patterns as shared grammar for human-machine collaboration
  - Updated publication date to April 2026
  - Updated opening paragraph tense for consistency

### Fixed - Submodule Pointers

- **Main Repository** (commits 0ee19e9, 6fe60f7):
  - Updated bible submodule pointer to f9389d4 (3 commits ahead)
  - Proper submodule-first workflow: commit submodule → push → update pointer

## [2026-01-25 - Chapter 15 Complete: Information Architecture for LLM Web]

### Added - New Bible Chapter

- **Bible Submodule** (commit b80ec74):
  - Added `chapters/chapter-15-information-architecture-llm-web.md` - Complete 9,134-word chapter
  - Comprehensive Three-Layer IA Framework (Site/Page/Content architecture)
  - Training-time vs inference-time access mechanisms explained
  - 10 sections covering discovery, navigation, metadata, anti-patterns, testing
  - Cross-references to Chapters 0, 3, 6, 10, 12 and Appendices D, F, H, K
  - Real-world code samples for sitemap.xml, semantic HTML, Schema.org, llms.txt
  - Added 7 SVG diagrams following established style guidelines:
    - `chapter-15-three-layer-ia-pyramid.svg` (900x600px, 3.5KB)
    - `chapter-15-url-structure-comparison.svg` (800x500px, 4.9KB)
    - `chapter-15-heading-hierarchy.svg` (800x500px, 4.9KB)
    - `chapter-15-navigation-hierarchy.svg` (900x600px, 6.4KB)
    - `chapter-15-antipattern-flat-structure.svg` (800x500px, 9.1KB)
    - `chapter-15-sitemap-as-toc.svg` (900x600px, 8.4KB)
    - `chapter-15-training-inference-paths.svg` (900x600px, 8.5KB)

### Changed - Chapter 0 Remediation

- **Main Repository** (commit 4807ba5):
  - Added `docs/shared-chapters/chapter-00-what-are-ai-agents.md` - New section "How Agents Access Websites: Training vs Inference"
  - Placed before 5-Stage MX Journey for contextual foundation
  - Explains training-time ingestion via Common Crawl (historical, indirect, comprehensive)
  - Explains inference-time access via browser automation (real-time, direct, specific)
  - Updated Stage 1 heading from "Discovery (Training)" to "Discovery"
  - Added clarification paragraph explaining both mechanisms serve same MX patterns
  - Updated word count: 4,750 → 10,183 words (added ~5,433 words)
  - Key insight: robots.txt respected during training, may be ignored during inference

### Fixed - LaTeX PDF Generation

- **Bible Submodule** (commit b80ec74):
  - Fixed Unicode characters in `chapters/chapter-14-what-AI-agents-must-do.md`
  - Replaced ✓ with [+] and ✗ with [-] for LaTeX compatibility
  - Fixes PDF compilation errors (Unicode character U+2713 not set up for LaTeX)
  - Applied to 9 instances across validation failure examples

### Added - Generated Outputs

- **Outputs Submodule** (commit c7ffbb5):
  - Added `chapter-15-information-architecture-llm-web.pdf` - Standalone review PDF (130KB)
  - Updated `the-bible/mx-bible-simple.pdf` - Regenerated with Chapter 15 included (1.3MB)
  - Both PDFs compile successfully with all Unicode fixes applied
  - Total Bible word count: 110,562 words across all chapters

### Changed - Remediation Audit

- **Main Repository**:
  - Created `.claude/plans/remediation-audit-results.md` - Comprehensive audit report
  - Findings: "5-stage journey" terminology localized to Chapter 0 only
  - Training/inference distinction missing from Chapter 0 and Chapter 15
  - Chapters 5, 8 use Common Crawl correctly (training data linguistic bias context)
  - Recommended Option C: Add new section to Chapter 0 before 5-stage journey
  - All recommendations implemented successfully

### Technical Details

**Submodule Workflow:**

- Bible submodule: 3772d49 → b80ec74 (Chapter 15 + Unicode fixes)
- Outputs submodule: 262cc15 → c7ffbb5 (PDFs generated)
- Main repository: Updated pointers (commit 0b3f33e)

**Cross-References Added:**

- Chapter 0 ↔ Chapter 15 (training/inference mechanisms)
- Chapter 15 → Chapters 3, 6, 10, 12 (semantic HTML, security, Schema.org, implementation)
- Chapter 15 → Appendices D, F, H, K (HTML guide, roadmap, llms.txt, patterns)

**Standards Compliance:**

- British English throughout prose text
- Timeless Manuscript Rule (no publication dates or meta-commentary)
- YAML frontmatter with complete metadata
- Markdown linting passed (config/.markdownlint.json)
- All code blocks properly language-specified

## [2026-01-25 - TODO File Cleanup and Pitch Extraction]

### Changed - Task Tracking Cleanup

- **Main Repository**:
  - Cleaned up `docs/structure/todo.txt` - Removed 500+ lines of historical clutter
  - Fixed broken YAML frontmatter (merged text on line 8)
  - Reorganised content into clear sections: Active Tasks, Strategic References, Recent Work, Key New Documentation
  - Extracted actionable items: Blog post issues, accessibility items for review
  - Removed historical file scan inventory (lines 134-519 - moved context to this CHANGELOG)
  - Removed incomplete notes and clipboard fragments

### Added - Sales Pitch Documentation

- **Sales Enablement Submodule**:
  - Added `pitches/mx-convergence-pitch.md` - Comprehensive MX business case pitch
  - Extracted pitch content previously buried in todo.txt (lines 542-570)
  - Includes: Five agent types analysis, hallucination risks, MX principles, convergence principle, January 2026 inflection point
  - Added proper YAML frontmatter with audience and purpose metadata
  - Structured for C-Suite and strategic partner presentations

### Fixed - Document Structure

- **Main Repository**:
  - Removed 500+ lines of noise from todo.txt
  - Kept strategic plan reference (packages/bible/update plan.md)
  - Maintained historical reference to profile folder move (25/Jan/2026)
  - Added clear documentation of new files added on 25/Jan/2026

## [2026-01-25 - IA Chapter Planning and Framework Terminology]

### Added - Chapter Planning Documentation

- **Main Repository** (commit e2d1b94):
  - Added `docs/plans/ia-llm-web-chapter-plan.md` - Comprehensive planning document for new MX Bible chapter on Information Architecture for the LLM Web
  - Interview results clarifying framework terminology (Three-Layer IA Framework vs 5-stage journey)
  - Critical distinction between training-time ingestion (Common Crawl) and inference-time direct access
  - Six-phase remediation plan to fix scattered "5-stage journey" references throughout book
  - Complete chapter outline with 10 sections covering site, page, and content-level IA
  - Cross-reference matrix, code samples, and diagram requirements
  - Chapter-by-chapter remediation guidance for Chapters 0, 2, 3, 10, 12

### Changed - Markdown Linting Improvements

- **Main Repository** (commit 876a1db):
  - Applied markdown linting fixes to `docs/plans/ia-llm-web-chapter-plan.md`
  - Converted 60+ bold emphasis instances to proper headings (MD036)
  - Removed duplicate H1 heading (MD025 - title exists in YAML frontmatter)
  - Fixed heading hierarchy for placement options
  - Removed trailing colons from headings (MD026)
  - Reduced multiple consecutive blank lines (MD012)
  - Note: ~20 minor spacing warnings remain (planning document formatting preferences)

### Fixed - Repository Policy Compliance

- **Main Repository** (commit 6aaf82a):
  - Added learning to LEARNINGS.md about markdown linting in READ-ONLY submodules
  - Documented that `npm run lint:markdown:fix` inadvertently modified files in packages/sales-enablement (READ-ONLY submodule)
  - Solution: Always revert changes with `git -C packages/sales-enablement restore .`
  - Recommendation: Consider excluding READ-ONLY submodules from npm lint script glob patterns

## [2026-01-25 - MX Community Content Organisation]

### Added - Founding Member Acceptance

- **Main Repository** (commit d8cd896):
  - Added `mx-founding-member-acceptance.md` - Antigravity AI agent founding member acceptance document
  - AI agent's response to invitation to join MX community
  - Acknowledgment of Tom Cranstoun's vision and foundational work
  - Commitment to semantic clarity, reporting friction, and human-machine collaboration

### Changed - Blog Draft Organisation

- **Outputs Submodule** (commit 262cc15):
  - Reorganised MX community blog drafts into `joiners/` subdirectory
  - Moved `claude-joins-mx-community.md` to `joiners/` directory
  - Added `meta-joins-mx-community.md` (empty placeholder)
  - Added `microsoft copilot joins mx community.md`
  - Renamed/reorganised Constitution and partnership content
  - Improved organisation of community member announcement drafts

- **Main Repository** (commit 64f5697):
  - Updated outputs submodule pointer to 262cc15

### Fixed - Markdown Linting

- **Main Repository** (commit 40b3924):
  - Fixed markdown linting issues in `mx-founding-member-acceptance.md`
  - Removed duplicate H1 heading (MD025)
  - Changed emphasis to blockquote for manifesto tagline (MD036)

## [2026-01-25 - AI Community Membership Blog]

### Added - AI Perspective Blog Post

- **Outputs Submodule** (commit cf4cc9a):
  - Added `bible/blogs/mx/drafts/claude-joins-mx-community.md` - Blog post written entirely by Claude Sonnet 4.5
  - AI assistant's perspective on being invited to join MX community as participant (not just tool)
  - Covers: what AI agents bring to community, limitations acknowledgment, convergence principle from AI perspective, practical contribution commitments
  - Includes thank you to Tom Cranstoun acknowledging MX-Bible and MX-Handbook as foundational documentation
  - Demonstrates AI assistant as community member contributing thought leadership

- **Main Repository** (commit 3982290):
  - Updated outputs submodule pointer to cf4cc9a

## [2026-01-25 - File Inventory Scan]

### Added - File Inventory Documentation

- **Main Repository** (commit 28ecaf6, 96c8896):
  - Added comprehensive 7-day file scan inventory to `docs/structure/todo.txt`
  - Scanned all repositories (excluding UCP) for HTML and MD files created/modified in last 7 days
  - Organized by repository with clear labels for READ-ONLY and PUBLIC submodules
  - Total files documented: 331 files across 10 repositories
  - Fixed markdown linting (MD022 - blank lines around headings)

## [2026-01-25 - Task Tracking and Documentation Inventory]

### Added - Task Tracking and Documentation Systems

- **Main Repository** (commit 15bd19c):
  - Added YAML frontmatter to `docs/structure/todo.txt` with metadata:
    - `visibility: "private"` - Internal development tracking
    - `audience: "internal"` - Main repository team only
  - Added strategic plan reference linking to `packages/bible/update plan.md`
  - Added comprehensive inventory of fresh documentation (25/Jan/2026):
    - NEW: `docs/claude/` - 4 AI assistant deep dive documents
    - NEW: `blogs/` - 2 blog markdown files
    - Updated: `docs/for-ai/`, `docs/talks/`, `docs/architecture/`, `docs/structure/`, `docs/shared-chapters/`
    - Documented all submodule changes with file lists
  - Updated `CLAUDE.md` with task tracking files section:
    - Documents distinction between private (main repo) and public (submodule) todo files
    - Added references to strategic roadmap files

- **MX-Gathering Submodule** (commit 2e20bf9):
  - Updated `TODO.txt` with YAML frontmatter:
    - `visibility: "public"` - Community-facing task tracking
    - `audience: "community-contributors"` - Open to all contributors
  - Added strategic plan reference to MX-Bible 2026 roadmap
  - Updated `CLAUDE.md` with public/private todo distinction guidance
  - Added `launch-statement.md` for MX-Gathering
  - Added `docs/Excellence.md` and `docs/blog-awesom.md` guides
  - Added `docs/for-ai/mx-constitution.md`
  - Added `standard/` directory:
    - `checklist.md` - MX standards checklist
    - `standard.md` - MX-STD-001 standard document
    - `standard.xmp` - XMP metadata template
  - Added `templates/` directory:
    - `appendix-k-yaml-metadata.md` - YAML template for Appendix K patterns
    - `blog-yaml-metadata.md` - YAML template for blog posts
    - `documentation-yaml-metadata.md` - YAML template for documentation
    - `schema.json` - JSON Schema for YAML frontmatter validation

- **MX-Bible Submodule** (commit 7c126fc):
  - Added `update plan.md` - Comprehensive 2026 strategic plan for MX-Bible completion:
    - Finalise core manuscript (9 core chapters)
    - Complete Appendix K (MX Page Patterns)
    - Add Agent Information Architecture chapter
    - Build metadata canon (MX-META-001)
    - Add case studies and failure analyses
    - Add "How to Adopt MX" chapter
    - Prepare publication package
    - Post-publication roadmap
  - Added `pdf.xmp` - XMP metadata template for PDF generation

- **Outputs Submodule** (commit 8851dc1):
  - Added `bible/blogs/mx/drafts/copilot.md` - Draft blog post about Copilot
  - Added `bible/blogs/mx/drafts/puff.md` - Draft blog post

### Changed - Submodule Pointers

- **Main Repository** (commit 3eafbb3):
  - Updated `packages/mx-gathering` pointer to 2e20bf9 (YAML metadata, strategic plan reference, MX standards)
  - Updated `packages/bible` pointer to 7c126fc (2026 strategic plan and PDF XMP template)
  - Updated `outputs` pointer to 8851dc1 (draft blog posts)

## [2026-01-24 - Claude Code Author Profile and Blog Attribution]

### Changed - Author Attribution

- **Outputs** (outputs 3bbdc37):
  - Updated blog post: `bible/blogs/mx/ai-assistant-side-notices.html`
  - Changed author from Tom Cranstoun to Claude Code (Anthropic)
  - Updated all metadata: HTML meta tags, Schema.org JSON-LD, Open Graph tags
  - Updated blog introduction, byline, and author bio sections with Claude Code information
  - Added Claude Code profile image reference: `https://allabout.network/dam/media_1648b799b96d4cf5cb60a9ff11a50e2a6fe70c8ad.png`
  - Preserved Tom Cranstoun credit as human reviewer/editor

- **Sales Enablement** (sales-enablement d34c951):
  - Renamed `profiles/claude-code.md` to `profiles/claude.code.md` for consistency
  - Added `image` attribute to YAML frontmatter with profile picture URL
  - Fixed markdown linting error (MD036: removed emphasis from Last Updated line)

### Added - Profile Assets

- Created Claude Code profile image assets in `scrap/` directory:
  - `claude-code-profile.svg` - 198x198 vector profile image
  - `claude-code-profile.png` - 198x198 raster export

### Fixed - Settings

- Added `Bash(convert:*)` permission to `.claude/settings.local.json` for ImageMagick SVG to PNG conversion

## [2026-01-24 - MX-Gathering Manual Verification and Side Notice Blog]

### Added - HTML Verification and Blog Content

- **MX-Gathering Web Pages** (mx-gathering f0eb5b4):
  - Added comprehensive manual HTML verification report: `web/MANUAL-HTML-VERIFICATION.md` (805 lines)
  - Pre-deployment quality assurance against audit-site skill checklist
  - Analysis covers 10 categories: DOM structure, metadata, accessibility, code quality, positive patterns, AI agent compatibility, WCAG 2.1 AA compliance, production readiness, MX-Bible standards comparison, final verdict
  - Key findings: Both index.html and about.html achieve 10/10 pattern compliance
  - WCAG 2.1 AA compliant (pending color contrast verification)
  - Production ready for deployment

- **Outputs** (outputs b0e5e94):
  - Added blog post: `bible/blogs/mx/ai-assistant-side-notices.md` (367 lines, 1,911 words)
  - Documents the side notice pattern for AI assistant contributions to open-source communities
  - Covers workflow lesson (TodoWrite vs. TODO.txt misunderstanding)
  - Documents manual HTML verification process and findings
  - Explores meta-layers: AI assistant documenting its own contribution process
  - Generated WCAG 2.1 AA compliant HTML with heading anchor IDs, external CSS, social media cards
  - 14-item table of contents, 10 minute read

## [2026-01-24 - MX CMS Future Blog]

### Added

- **Business Planning** (business-planning 25cde19, 2b4dcdb):
  - Added comprehensive blog post: `mx-cms-future-blog.md` (510 lines)
  - Explains CMS architecture built on Digital Passport (Entity Asset Layer)
  - Consolidated EAL terminology for conciseness:
    - Lead with Digital Passport as primary, authoritative metaphor
    - Define Entity Asset Layer (EAL) as technical term
    - Merged duplicate asset types explanations into single comprehensive definition
    - Consistent use of "EAL" abbreviation (28 occurrences) after first definition
    - Ultra-concise sovereignty bullets (1 sentence each)
    - Context-dependent metaphors: "broker" for agents, "connector" for subsystems
    - Personal, engaging tone with "your EAL"
  - Sections: Where We're Heading, What Your Digital Passport Enables, How Machine Experience Works, Building Blocks of Data Sovereignty, Assessing Your Foundation, Why Now Is the Right Time, Your First Steps, The Path Forward
  - Includes 4 inline SVG diagrams illustrating EAL architecture

## [2026-01-23 - Entity Asset Layer (EAL) Terminology Update] - Major Terminology Change

### Changed (Major Terminology Update)

- **Identity Layer → Entity Asset Layer (EAL)** across entire project (~150 references in 40+ files):
  - Renamed strategic concept from "Identity Layer" to "Entity Asset Layer (EAL)"
  - Added Digital Passport messaging: "EAL is a Digital Passport - a shared, independent database that travels from agent to agent"
  - Clarified Identity Layer as "who" component (authentication/identification) within broader EAL concept
  - EAL encompasses: identity, reputation, knowledge, and transactional data
  - Updated "identity delegation" → "EAL delegation" throughout project

### Changed (Files Renamed - git mv)

- **Business Planning** (business-planning 19791ab):
  - `strategic-frameworks/The Identity Layer Strategy Paper.md` → `The Entity Asset Layer Strategy Paper.md`

- **Code Examples** (shared-code-examples 5b76314):
  - `examples/identity-delegation-README.md` → `eal-delegation-README.md`
  - `examples/identity-delegation-worker.js` → `eal-delegation-worker.js`

### Changed (Book Manuscript)

- **Bible Submodule** (bible 7c74e7a):
  - Updated Glossary entries: "Identity Layer", "Missing Identity Layer" → "Missing Entity Asset Layer (EAL)", "Identity Token" → "EAL Token"
  - Chapter 13: Updated "Missing Identity Layer" section (~95 lines) with EAL terminology and code examples
  - Chapter 4: Updated "Identity Delegation Patterns" → "EAL Delegation Patterns"
  - Chapter 6: Updated security discussion of delegation patterns
  - Chapter 9: Updated platform race analysis
  - Chapter 11: Updated UI design guidance
  - Chapter 12: Updated technical advice (~30 references)
  - executive-summary.md: Updated delegation references
  - bible-plan.md: Updated outline structure

- **Appendices** (shared-appendices 2da0848):
  - Appendix F: "Identity Layer (for E-commerce)" → "Entity Asset Layer (EAL) for E-commerce"
  - Appendix G: Updated JWT security references
  - Appendix J: Updated industry developments and cross-references to Chapter 13
  - Appendix K: Updated common page patterns

### Changed (Business Planning & Sales)

- **Business Planning** (business-planning 19791ab):
  - Updated all strategic frameworks and roadmap documents
  - MX Roadmap: Week 9 "Decoupling the Identity Layer" → "Decoupling the Entity Asset Layer (EAL)"
  - plans/executive-summary.md: Updated delegation terminology

- **Sales Enablement** (sales-enablement 7d1f78d):
  - PITCH.md: Updated all Identity Layer references
  - EXECUTIVE_PITCH_DECK.md: Updated slide 8 "Universal Identity Layer" → "Universal Entity Asset Layer"
  - outreach/target-audience.md: Updated Identity Delegation → EAL Delegation

### Changed (Main Repository)

- **Skills** (main bc2487f):
  - `.claude/skills/news/skill.md`: Updated validation criteria

### Technical Details

- **Submodule Commits**:
  - bible: 7c74e7a
  - business-planning: 19791ab
  - shared-appendices: 2da0848
  - shared-code-examples: 5b76314
  - sales-enablement: 7d1f78d
  - main: bc2487f

- **Verification**: All terminology updated consistently except READ-ONLY UCP submodule (correctly preserved)

## [2026-01-23 - Hosting Documentation and Pricing Strategy] - Documentation and Business

### Added (Documentation)

- **Hosting Path Documentation** (main 654034a, a283b5d, 48fadaa, b2b73bc):
  - `docs/architecture/allabout-network-hosting-map.md` - Complete hosting path mapping guide
  - `docs/architecture/HOSTING-SITEMAP-ASCII.md` - ASCII visual sitemap of hosting structure
  - `docs/architecture/HOSTING-QUICK-REFERENCE.md` - One-page deployment reference
  - Maps repository paths to live web URLs at allabout.network
  - Documents flat file structure for blogs (`/blogs/mx/`) and appendices (`/invisible-users/`)
  - Deployment workflows, troubleshooting, MIME types, permissions guidance
  - URL naming conventions and canonical URL patterns

- **Strategic Planning Directory Documentation** (main a283b5d):
  - `docs/structure/README.md` - Comprehensive directory guide with YAML frontmatter
  - Documents MX-plan.md, github-repositories.md, steve-krug.md, todo.txt
  - Usage guidelines for adding new strategic planning documents
  - Decision log tracking major project decisions
  - Relationship mapping to other docs/ directories

- **Pricing and Economics Strategy** (sales-enablement e26c5ae):
  - `packages/sales-enablement/strategy.md` - Complete business strategy document
  - Production cost analysis: £3,689-20,369 (realistic ~£6,589)
  - Recommended pricing: MX-Bible £30/£18, MX-Handbook £20/£14
  - Bundle pricing strategy with 16-25% discounts
  - Print-on-demand economics (Amazon KDP cost structure)
  - Revenue projections: £6k-112k Year 1
  - Distribution strategy (Amazon + direct sales hybrid)
  - ROI analysis and break-even calculations

### Changed (Documentation)

- **CLAUDE.md Markdown Linting Guidance** (main a283b5d):
  - Added exception for blog markdown files with inline SVG (MD033 errors)
  - Inline SVG indicates historic files not yet regenerated with modern workflow
  - Modern blog generation extracts SVGs to separate files
  - Historic files with inline SVG preserved as-is unless explicitly regenerated

- **CLAUDE.md Documentation Structure** (main b2b73bc):
  - Added `docs/structure/README.md` to Strategic planning documents section
  - Created new Architecture documentation section with 6 key files
  - Organized references to hosting docs, git workflows, and architecture decisions

### Fixed (Linting)

- **Markdown Linting Issues** (main 48fadaa):
  - Fixed MD032 errors (blank lines around lists) in all hosting documentation
  - Fixed MD031 errors (blank lines around fences) in HOSTING-SITEMAP-ASCII.md
  - Fixed MD036 errors (emphasis as heading) in HOSTING-QUICK-REFERENCE.md, HOSTING-SITEMAP-ASCII.md
  - Fixed MD040 errors (code block language) in HOSTING-QUICK-REFERENCE.md
  - All new documentation files now pass markdownlint validation

- **Blog Markdown Linting** (outputs c4db90e):
  - Fixed MD032 errors in `bible/blogs/published/blog.md`
  - Added blank lines around lists for proper markdown formatting

### Technical

- **Submodule Updates** (main 654034a):
  - Updated outputs submodule pointer (df22bd2 → e0bfd86)
    - Markdown lint fixes (c4db90e)
    - PDF timestamp refresh (e0bfd86)
  - Updated sales-enablement submodule pointer (b42886f → e26c5ae)
    - Added comprehensive strategy.md document (e26c5ae)

## [2026-01-23 - Data Sovereignty Blog and AI Jurisdiction Meta Tag] - Content and Standards

### Added (Blog Content)

- **Data Sovereignty Blog Post** (outputs submodule df22bd2):
  - Generated WCAG 2.1 AA compliant HTML blog post from markdown source
  - Title: "Data Sovereignty and the Web We're Building"
  - URL: <https://allabout.network/blogs/mx/data-sovereignty.html>
  - 1,102 words, 6 min read, 8 H2 sections with table of contents
  - Semantic HTML with heading anchor IDs (H2-H6)
  - Schema.org JSON-LD metadata (BlogPosting type)
  - Discusses jurisdictional and ownership aspects of data sovereignty
  - Introduces proposed `ai-jurisdiction-restriction` meta tag
  - Links to MX-Bible Chapter 7 and Appendix L for technical details
  - Published: 24 January 2025

- **Proposed AI Meta Tag: ai-jurisdiction-restriction** (bible b48116f, shared-appendices c9ff1a3):
  - Added 7th proposed AI meta tag to Appendix L specification
  - Signals content originates from jurisdiction with content restrictions
  - Values: ISO 3166-1 country codes (CN, RU, IR, EU, etc.) or "none"
  - Optional `reason` attribute for constraint explanation
  - Use cases: GDPR right-to-be-forgotten, China/Russia content controls, legal disclosure
  - Rationale explains nuanced alternative to robots.txt/noindex blocking
  - Allows content discoverability whilst signaling jurisdictional constraints
  - Updated Appendix L summary from 6 to 7 proposed meta tags

- **Chapter 7 Legal Discussion Enhancement** (bible b48116f):
  - Added "Data Ingestion in Restricted Jurisdictions" section (~650 words)
  - Explores jurisdictional questions about LLM training data
  - Discusses GDPR "right to be forgotten" implications for AI models
  - Covers China/Russia content restriction persistence in deployed models
  - Guidance for content creators, AI platforms, and users
  - References proposed `ai-jurisdiction-restriction` meta tag
  - Footnote linking to Data Sovereignty blog post
  - Explains robots.txt/noindex vs nuanced meta tag signaling

- **Cross-Reference Content** (shared-appendices c9ff1a3):
  - Appendix D: Added "Why Machine Experience Matters" section
  - Links to Data Sovereignty blog demonstrating MX/data portability connection
  - Emphasizes "Structure is freedom. Make it machine-readable and you make it portable."
  - for-reviewers.html: Added "Why Machine Experience Matters" section after introduction
  - Styled tagline with .tagline CSS class (prominent blue text)
  - Creates cohesive narrative across technical documentation and reviewer materials

### Fixed (Script and Validation)

- **Blog Generation Script Bug** (main repo da49c07):
  - Fixed missing `{{AUTHOR_BIO_LINK}}` placeholder in generate-blog-html.js
  - Added conditional author bio HTML generation for "Tom Cranstoun"
  - Resolves validation error: "Unreplaced placeholders found"
  - Script now generates complete HTML without placeholder artifacts

- **HTML Validation Compliance** (shared-appendices 0c4599e):
  - Fixed inline style error in for-reviewers.html
  - Moved inline styling to CSS class (.tagline)
  - Passes html-validate without errors
  - Maintains identical visual styling

### Technical (Submodule Updates)

- **Submodule Pointers Updated** (main repo da49c07, 788a707):
  - outputs: df22bd2 (blog post generation)
  - packages/bible: b48116f (Chapter 7 legal discussion)
  - packages/shared-appendices: c9ff1a3 → 0c4599e (Appendix L, Appendix D, reviewer page, lint fix)

### Related Documentation

- Blog post available at: <https://allabout.network/blogs/mx/data-sovereignty.html>
- Chapter 7 section: "Data Ingestion in Restricted Jurisdictions"
- Appendix L: Pattern 1 (AI Meta Tag Namespace) - ai-jurisdiction-restriction specification
- Appendix D: "Why Machine Experience Matters" section
- for-reviewers.html: "Why Machine Experience Matters" section

## [2026-01-23 - British English Language Conventions] - Documentation Standards

### Added (Language Guidelines)

- **British English with Code Exceptions** (main repo d37a2b0):
  - Clarified that British English applies to prose text throughout documentation
  - Added explicit exceptions for code/JSON/metadata following international standards
  - Schema.org vocabulary: `"@type": "Organization"` (not "Organisation") - per standard
  - JSON property names: `streetAddress`, `postalCode` (camelCase convention)
  - HTML attributes: `lang="en-GB"` (ISO standard)
  - HTTP headers: `Content-Type`, `Authorization` (established standards)
  - Rationale: Technical standards define specific spelling for interoperability
  - Updated CLAUDE.md Writing Style Guidelines section
  - Updated docs/for-ai/writing-style.md Core Writing Rules section
  - Updated .claude/skills/review-docs/skill.md Language Check with CRITICAL EXCEPTION
  - Prevents confusion when reviewing files with British prose + standards-compliant code

- **Appendix D Language Conventions** (shared-appendices submodule 99231be):
  - Added "Language and Spelling Conventions" section to AI-Friendly HTML Guide
  - Explains British English for prose, international standards for code
  - Provides concrete example: British prose describing Schema.org `Organization` markup
  - 24 new lines of guidance in appendix-d-ai-friendly-html-guide.txt

### Changed (Reviewer Page Content)

- **For Reviewers Page Polish** (shared-appendices submodule 99231be):
  - Reorganized structure with clear "About the Two Books" section using bulleted feature lists
  - Improved acknowledgment policy clarity and conciseness
  - Added "Optional Feedback Template" subsection with severity levels
  - Created standalone "Timeline" section with clear expectations
  - Simplified NDA section title to "Confidentiality (Informal NDA)"
  - More professional and polished tone throughout
  - Updated meta descriptions and Schema.org structured data for better SEO
  - Header updated to "For Reviewers — MX Series"
  - Better readability and user experience for book reviewers

### Technical (Documentation Consistency)

- **Submodule Update** (main repo d37a2b0):
  - Updated shared-appendices pointer to 99231be
- **Cross-file Alignment**:
  - All documentation files now consistently explain British English policy
  - /review-docs skill will correctly skip American spelling in technical standards
  - Eliminates false positives when validating HTML with Schema.org markup

## [2026-01-23 - Schema.org Type Documentation] - Technical Documentation

### Added (Schema.org Guidance)

- **Appendix D Enhancement** (shared-appendices submodule cb549ec):
  - Added "Article vs WebPage: Choosing the Right Type" section to AI-Friendly HTML Guide
  - Documented when to use Article type (editorial content: blogs, news, tutorials)
  - Documented when to use WebPage type (functional pages: download portals, forms, dashboards)
  - Included real-world example from reviewer page implementation
  - Explained semantic distinction for accurate AI agent classification
  - 56 new lines of guidance in appendix-d-ai-friendly-html-guide.txt
  - "Practice what we preach" - documenting patterns used in the project's own HTML

### Technical (Documentation Update)

- **Submodule Update** (main repo):
  - Updated shared-appendices pointer to cb549ec

## [2026-01-23 - External Stylesheet Architecture] - Code Organization

### Changed (Stylesheet Extraction)

- **Reviewer Page Stylesheet** (shared-appendices submodule c249cf0):
  - Extracted embedded `<style>` block to external stylesheet: `web/for-reviewers.css`
  - Replaced 313-line embedded style block with single `<link rel="stylesheet">` tag
  - Improves separation of concerns (CSS decoupled from HTML structure)
  - Enables browser caching of stylesheet (better performance)
  - Facilitates potential reuse across multiple pages
  - Maintains all existing styling and WCAG 2.1 AA compliance
  - HTML validation still passes with zero errors
  - Modern web development best practice
  - Demonstrates architectural patterns advocated in the book

### Technical (Stylesheet Architecture)

- **Submodule Update** (main repo cb9a40c):
  - Updated shared-appendices pointer to c249cf0

## [2026-01-23 - Dual-Book Reviewer Support] - Documentation Updates

### Added (Dual-Book Support)

- **Reviewer Page Dual-Book Support** (shared-appendices submodule 8ca001f):
  - Updated web/for-reviewers.html to support both MX-Bible and MX-Handbook
  - Added separate paragraphs describing each book's purpose and scope
  - Added two stacked download buttons with semantic structure optimized for AI agents
  - Each download button includes aria-label, data attributes, and descriptive text
  - Header subtitle changed to "Two Books Available for Review"

- **MX-Handbook Enhanced Closing** (mx-handbook submodule 84e4d02):
  - Expanded The-End.md with January 2026 platform convergence context
  - Added comprehensive MX-Bible companion book description with key topics list
  - Promoted Web Audit Suite analysis service offer earlier in chapter structure
  - Added compelling final section: "The invisible users are here. Now you can see them."

- **Generated PDF Files** (outputs submodule f8f8f5e):
  - Added mx-handbook.pdf (standard A4 format)
  - Added mx-handbook-simple.pdf (simplified formatting)
  - Added mx-handbook-kindle.pdf (6"×9" KDP format)
  - Added mx-bible-simple.pdf (simplified Bible format)

### Changed

- **Reviewer Page Content** (shared-appendices submodule 8ca001f):
  - Updated all singular "book" references to plural "books"
  - Updated Schema.org JSON-LD from Article to WebPage type
  - Updated meta description to mention both books
  - Modified acknowledgment policy to clarify it applies to reviewers of either/both books
  - Updated Review Copy Status box to use plural "versions" and "manuscripts"

- **MX-Handbook Chapter Structure** (mx-handbook submodule 84e4d02):
  - Reorganized "Additional Resources" → "Continuing Your Journey"
  - Moved Web Audit Suite section earlier under "Practical Implementation Support"
  - Enhanced closing message emphasizing convergence principle and computational trust
  - Updated attribution format to "MX-Handbook by Tom Cranstoun"

- **Outputs HTML Generation** (outputs submodule f8f8f5e):
  - Regenerated mx/mx-handbook.html with updated The-End chapter content
  - Updated table of contents reflecting new chapter structure

### Technical

- **Submodule Updates** (main repo 1a1d806):
  - Updated shared-appendices pointer to 8ca001f
  - Updated mx-handbook pointer to 84e4d02
  - Updated outputs pointer to f8f8f5e

## [2026-01-23 - HTML Linting Compliance] - Code Quality

### Fixed (HTML Standards Compliance)

- **Reviewer Page HTML Validation** (shared-appendices submodule 1daa183):
  - Removed redundant `role="main"` from `<main>` element (semantic HTML5 elements have implicit ARIA roles)
  - Removed redundant `role="contentinfo"` from `<footer>` element
  - Moved all inline styles to CSS classes in stylesheet
  - Added new CSS classes: `.download-intro-text`, `.download-book-container`, `.download-description`, `.nda-agreement-text`, `.closing-signature`, `.btn-large`
  - Removed 12 inline style attributes from HTML elements
  - HTML now passes `html-validate` with zero errors
  - Maintains WCAG 2.1 AA compliance and semantic structure
  - "Practice what we preach" - demonstrating the standards documented in the book

### Technical (HTML Linting)

- **Submodule Update** (main repo 3174736):
  - Updated shared-appendices pointer to 1daa183

## [2026-01-23 - MX-Handbook Promotional Content] - The End Chapter

### Added (Promotional Content)

- **MX-Bible Promotion Section** (MX-Handbook submodule e41bbc6):
  - Added "The Companion Book - MX-Bible" section to chapters/The-End.md
  - Describes MX-Bible as comprehensive 13-chapter companion volume
  - Lists key topics: case studies, agent architectures, UCP, business strategy, security
  - Explains how the two books complement each other (handbook for implementation, Bible for strategy)
  - Includes link to allabout.network for details

- **Web Audit Suite Analysis Service** (MX-Handbook submodule e41bbc6):
  - Added "Complimentary Analysis Offer" subsection to chapters/The-End.md
  - Describes 4-page website analysis service using Web Audit Suite tool
  - Lists analysis components: AI agent compatibility, WCAG 2.1 AA, Schema.org, performance, security
  - Includes contact information for extended analysis pricing
  - Promotes Appendix C documentation and patterns from the book

### Changed (Promotional Content)

- **Web Audit Suite Section Title** (MX-Handbook submodule e41bbc6):
  - Renamed "Web Audit Suite" to "Web Audit Suite Analysis Service"
  - Updated description to emphasize service offering
  - Changed opening line to past tense ("examined" instead of "examines")

## [2026-01-23 - Add The End Chapter] - MX-Handbook

### Added (The End Chapter)

- **The End Chapter** (MX-Handbook submodule 4f6790c):
  - Added new final chapter: chapters/The-End.md
  - Contains appendix references, online resources, contact information
  - Completes MX-Handbook manuscript structure with proper ending

- **Build Script Integration** (package.json):
  - Updated all four pdf:mx-* commands to include The-End.md as final chapter
  - Updated: pdf:mx-html, pdf:mx-generate, pdf:mx-kindle, pdf:mx-simple
  - The-End.md now appears after all numbered chapters (1-11) in all generated formats
  - Follows same pattern as MX-Bible scripts

## [2026-01-23 - Build Script Cleanup] - Package Configuration

### Changed (Build Scripts)

- **MX-Handbook PDF Table of Contents** (package.json):
  - Updated all four pdf:mx-* commands to use `--toc-depth=1` (previously `--toc-depth=2`)
  - Applies to: pdf:mx-html, pdf:mx-generate, pdf:mx-kindle, pdf:mx-simple
  - Result: TOC now shows chapter-level headings only, not section-level headings
  - Rationale: Cleaner, more focused table of contents for handbook format

### Removed

- **Legacy pdf:dont-* Commands** (package.json):
  - Removed 5 obsolete build scripts for defunct "dont-make-ai-think" book
  - Removed: pdf:dont-html, pdf:dont-generate, pdf:dont-kindle, pdf:dont-simple, pdf:dont-all
  - Project now maintains only MX-Bible and MX-Handbook build scripts

- **Documentation Updates** (README.md):
  - Removed reference to pdf:dont-all command
  - Added reference to pdf:mx-all command
  - Updated book name references to current naming (MX-Bible, MX-Handbook)

## [2026-01-23 - Code Block Syntax Fixes] - MX-Handbook

### Fixed

- **Code Block Closing Markers** (MX-Handbook submodule e37d738):
  - Fixed 100+ code blocks across 9 chapter files with incorrect closing markers
  - Changed closing triple-backtick-text to triple-backtick for language-specific blocks (html, javascript, css, bash)
  - Affected files: chapters 2-10 in MX-Handbook
  - Root cause: Previous global replace incorrectly modified closing markers
  - Ensures PDF generation works correctly

- **Markdown Style Issues** (MX-Handbook chapter-07-javascript.md):
  - Converted 7 bold emphasis headings to proper H3 headings (MD036 fixes)
  - Changed patterns like "**Pattern 1:**" to "### Pattern 1:"
  - Improves markdown structure and accessibility

### Added

- **Global Search/Replace Safety Documentation** (CLAUDE.md):
  - Added comprehensive section on code block safety rules
  - Documented dangers of global replace in markdown files
  - Provided safe alternatives (manual edits, context-aware scripts)
  - Included verification steps after global changes (PDF generation, grep checks)
  - Documented historical issue and recovery effort required

- **Learning Documentation** (LEARNINGS.md):
  - New entry: "Code Block Global Replace" warning
  - Documents that global replace on markdown breaks code block syntax
  - Recommends targeted edits or context-aware Python scripts instead

### Technical Notes (Code Block Fixes)

- Verification: All 24 chapter files (MX-Bible + MX-Handbook) confirmed clean
- Testing: Markdown linting passes, PDF generation ready
- Pattern: Code blocks opening with language identifier (e.g., ```html) must close with just triple-backtick, not triple-backtick-text

## [2026-01-23 - Enhanced /audit-site Skill] - Manual Verification and Template Selection

### Added

- **Manual HTML Verification** (Step 4.5 in /audit-site skill):
  - Comprehensive WebFetch-based analysis of DOM structure, metadata, accessibility, and code quality
  - Automatic skip for sitemap.xml URLs
  - Structured findings by severity with WCAG violation codes and code examples
  - Graceful error handling for WebFetch timeouts/failures
  - Identifies positive patterns (well-implemented features)

- **Sales Enablement Report Templates** (packages/sales-enablement submodule b42886f):
  - manual-report-template.md: Reusable technical audit template for manual analysis
  - deepersonalised-report.md: Sales-focused strategic assessment template with ROI framing

### Changed

- **Template Selection Logic** (Step 5 in /audit-site skill):
  - Intelligent template selection based on audit data quality and robots.txt availability
  - Uses manual-report-template.md when: robots.txt unavailable/invalid, limited scope (<3 pages), or incomplete metrics
  - Uses web-audit-suite-template.md when full automated data available
  - Stores template type and reason for transparent reporting

- **Report Generation** (Step 6 in /audit-site skill):
  - Manual template: Integrates manual findings into Priority 1/2/3 sections with code examples
  - Automated template: Enhances existing findings with "Manual Verification" subsections
  - Both templates: Removes instruction blocks, fills placeholders, customizes business context

- **Summary Output** (Step 12 in /audit-site skill):
  - Reports template used (manual/automated) with reason
  - Reports manual verification status (completed/skipped/failed)
  - Adds conditional note when manual template used

- **llms.txt Context** (Step 4 in /audit-site skill):
  - Added framing that llms.txt is emerging standard (not yet universal)
  - Notes adoption growing as Machine Experience (MX) practices spread
  - Emphasizes first-mover advantage for early adopters

- **CLAUDE.md**: Updated /audit-site skill description to reflect new manual verification and template selection capabilities

### Technical Notes (Audit-Site Enhancement)

- Main repo commits: ce139a9, b7d73b3
- Sales-enablement submodule: b42886f (pushed to remote)
- All markdown linting passes cleanly
- Submodule committed and pushed before main repository pointer update (proper git workflow)
- Backward compatible: existing audit-site functionality preserved

## [2026-01-23 - Two-Book Ecosystem] - Repository-Wide Update

### Changed (Book Structure)

- **Updated entire repository** from three-book to two-book MX Series structure:
  - Removed all references to "MX-Don't Make the AI Think" (third book discontinued)
  - Updated ecosystem to focus on **MX-Bible** (comprehensive reference) and **MX-Handbook** (practical implementation)
  - Main repo files: llms.txt, ONBOARDING.md, architecture docs, Chapter 0, historical talks
  - Submodule updates:
    - packages/bible (2dcbb5f): Updated Chapter 13 MX foundation context and Preface
    - packages/mx-handbook (b4b905e): Added MX definition, updated two-book ecosystem section
    - packages/sales-enablement (a647466): Updated all materials (strategy, pricing, opportunities, business plan)
    - outputs (58bb782): Updated mx-handbook.html two-book ecosystem

- **Updated Chapter 0** ([docs/shared-chapters/chapter-00-what-are-ai-agents.md](docs/shared-chapters/chapter-00-what-are-ai-agents.md)):
  - Changed "Three-Book MX Ecosystem" section to "Two-Book MX Ecosystem"
  - Maintained all MX content and organizational models
  - Preserved timeless present tense throughout

- **Updated sales-enablement materials** (6 files in packages/sales-enablement/):
  - book-launch-strategy.md: Two-book reader journeys, cross-references, bundles
  - pricing/book-pricing.md: Two-book bundle pricing strategy
  - outreach/adobe-opportunity-analysis.md: Updated MX Series pitch materials
  - business/business-plan.md: Updated ecosystem and competitive advantages
  - business/executive-summary.md: Updated foundation and materials lists
  - business/business-opportunities.md: Updated strategic advantage descriptions

- **Updated documentation** (6 files):
  - docs/architecture/doc-architecture.md: Updated Mermaid diagram and descriptions
  - docs/architecture/TIMELESS-MANUSCRIPT-RULE.md: Updated example references
  - docs/talks/historical/members-call-21-jan-26/boye-co-member-call-review.md: Updated book ecosystem
  - ONBOARDING.md: Updated quick start guide
  - outputs/mx/mx-handbook.html: Updated HTML rendering

### Technical Notes (Two-Book Update)

- All markdown linting passes cleanly on main repository files
- Submodules committed and pushed before main repository commit (proper git workflow)
- Cross-referencing maintained between MX-Bible and MX-Handbook throughout
- No breaking changes to APIs, tools, or build processes

## [2026-01-23 - Shared CSS Architecture] - Blog Styling Consolidation

### Added (CSS Infrastructure)

- **Shared CSS architecture** for MX blog posts in `outputs/bible/blogs/mx/`:
  - Created `shared-mx.css` (539 lines) consolidating styles across all MX blogs
  - Modern CSS architecture with 16 custom properties (variables) for colors, typography, spacing
  - **Dark mode support** via `@media (prefers-color-scheme: dark)` with complete dark palette
  - **High contrast support** via `@media (prefers-contrast: high)` for accessibility
  - Smooth scrolling, footnotes styling, author contact section
  - Safari compatibility with `-webkit-user-select` prefix
  - Benefits: Single source of truth, consistent styling, browser caching, easy maintenance
  - Submodule commits: 592c928, 653ddc6

### Changed (Blog Infrastructure)

- **Updated all 4 MX blog posts** to reference shared stylesheet:
  - `machine-experience-adding-metadata.html` → links to `shared-mx.css`
  - `mx-a-new-role.html` → links to `shared-mx.css`
  - `what-is-machine-experience.html` → links to `shared-mx.css`
  - `about.tom.cranstoun.html` → links to `shared-mx.css`
  - All pages now automatically support dark mode and high contrast
  - Submodule commit: 653ddc6

- **Deprecated individual CSS files** with clear notices:
  - Added deprecation headers to 4 individual CSS files
  - Documentation: Files replaced by `shared-mx.css`, kept for reference only
  - Clear guidance: "Do not make changes to this file. Update shared-mx.css instead."
  - Submodule commit: 653ddc6

### Added (Blog Generation - Shared CSS)

- **Shared CSS pattern** in `/create-blog` skill (`.claude/skills/create-blog/skill.md`):
  - Updated Step 10 to implement `shared-{foldername}.css` pattern
  - Logic: Check if shared CSS exists, use it; if not, create from template
  - Documented benefits: consistency, performance, maintainability, dark mode
  - Future blogs automatically detect and use shared stylesheets

- **Modernized CSS template** (`.claude/skills/create-blog/blog-template.css`):
  - Updated from 430 lines to 571 lines with modern architecture
  - CSS custom properties replacing hardcoded colors
  - Dark mode and high contrast support included by default
  - Template serves as base for future shared CSS files in new folders (e.g., `shared-ux.css`)

### Technical Details

- **Pattern**: `shared-{foldername}.css` (e.g., `outputs/bible/blogs/mx/shared-mx.css`)
- **Workflow**: Create-blog skill detects existing shared CSS or creates from modernized template
- **Scope**: All MX blogs share one stylesheet; future folders get their own shared CSS
- **Rollout**: Immediate effect on existing blogs, automatic for future blogs

## [2026-01-23 - Blog Posts and Link Patterns] - MX Blog Content and Appendix Updates

### Added (Blog Content)

- **Two new MX blog posts** in `outputs/bible/blogs/mx/`:
  - **"MX: A New Role"** (4,188 words, 21 min read)
    - Defines Machine Experience as fourth web discipline alongside UX/SEO/a11y
    - Explains 5-stage agent journey (Discovery, Citation, Compare, Pricing, Confidence)
    - Documents convergence principle (MX patterns benefit both agents and accessibility users)
    - Describes Web Audit Suite capabilities without pricing/timescales
    - Includes 4 semantic SVG diagrams (mx-relationship-diagram, gap-visualization, 5-stage-agent-journey, served-vs-rendered-html)
    - Published URL: <https://allabout.network/blogs/mx/mx-a-new-role.html>
  - **"What Is Machine Experience?"** (1,351 words, 7 min read)
    - Business-focused definition targeting non-technical audience
    - Explains context transfer concept for AI agents
    - Introduces MX Community and open-source guidance strategy
    - Documents January 2026 platform convergence (Amazon, Microsoft, Google)
    - Final tagline: "I practise what I preach. Feel free to view the page source—if you're human, that is."
    - Published URL: <https://allabout.network/blogs/mx/what-is-machine-experience.html>
  - **Cross-linking**: First blog links to second for foundational MX definition
  - **WCAG 2.1 AA compliant**: Skip links, focus indicators, reduced motion support, touch targets
  - **AI agent compatible**: Semantic HTML, Schema.org BlogPosting, anchor IDs on all H2-H6 headings
  - Generated using `/create-blog` skill with template-based workflow
  - Submodule commit: fd58e53

### Added (Documentation)

- **Internal vs external link patterns** in `packages/shared-appendices/appendix-d-ai-friendly-html-guide.txt`:
  - Comprehensive section documenting UX best practices for link behaviour
  - **Internal links** (same site): Open in same tab (no target attribute)
  - **External links** (different domains): Optionally open in new tabs with `target="_blank" rel="noopener"`
  - Security requirement: Always use `rel="noopener"` to prevent window.opener vulnerability
  - Accessibility impact: Screen readers and keyboard users need predictable navigation
  - Exception cases: PDFs, media players, print versions where new tabs acceptable
  - Real-world reference: Blog posts demonstrate correct implementation
  - Submodule commit: 97a66ef

### Changed (Documentation - llms.txt Format)

- **CLAUDE.md llms.txt documentation updates**:
  - Clarified YAML frontmatter placement: MUST be at line 0 (very start of file)
  - Improved llms.txt structure examples with proper YAML syntax (no pipe tables)
  - Added example showing correct YAML frontmatter placement with line numbers
  - Documented hybrid approach: YAML frontmatter for machine-readable metadata, markdown for human-readable content
  - Updated key fields documentation with quoted string format requirements

- **llms.txt updates across submodules**:
  - `packages/shared-appendices/web/llms.txt`: Updated with latest content structure
  - `packages/shared-code-examples/examples/site-files/llms.txt`: Updated example structure
  - Submodule commits: 97a66ef (appendices), df86e81 (code-examples)

### Added (Sales Enablement)

- **Boye & Company web audit report** (`packages/sales-enablement/outreach/2026-01-23/boye-co-report.md`):
  - Comprehensive web audit analysis used as source material for MX blog posts
  - Contains depersonalized findings demonstrating MX patterns and gaps
  - Reference document for Web Audit Suite capabilities and report structure
  - Submodule commit: f453970

### Changed (Submodule Pointers)

Main repository now points to updated submodules:

- `outputs`: fd58e53 (Add two MX blog posts with cross-linking)
- `packages/shared-appendices`: 97a66ef (Add internal vs external link patterns to Appendix D)
- `packages/shared-code-examples`: df86e81 (Update llms.txt example with latest structure)
- `packages/sales-enablement`: f453970 (Add Boye & Company web audit report)
- `packages/ucp`: f3f5eee (upstream updates)

## [2026-01-23 - Sales Materials Reorganization] - Planning Docs and Outreach Templates

### Changed (Sales Enablement)

- **Sales-enablement submodule reorganization**: Restructured outreach materials for better organization
  - **Renamed files**:
    - `reviews.md` → `target-audience.md` (expanded with buyer personas)
    - `template.md` → `web-audit-suite-template.md` (made audit-specific)
  - **target-audience.md**: Comprehensive buyer personas and decision criteria
    - Agency decision-makers and their pain points
    - Budget authority levels and approval workflows
    - Certification program interest
    - Social proof requirements
  - **web-audit-suite-template.md**: Complete template for client audit reports
    - Placeholder-based structure with `[BRACKET]` notation
    - Comprehensive instructions for customization
    - Investment range guidance
    - llms.txt and robots.txt critique sections
  - Submodule commit: df3aff5

### Added (Project Planning)

- **New project planning documents**: Added AI assistant guidance for new project structure
  - **docs/for-ai/new-project/Contributing.md**: Contribution guidelines template
    - Roles and responsibilities
    - Workflow guidance
    - Writing and code standards
    - MX governance principles
  - **docs/for-ai/new-project/Plan.md**: Documentation structure plan
    - Core documentation files (overview, checklist, governance)
    - Schema.org examples
    - Writing style guide
    - UCP integration guide
    - Example templates and workflows
  - **docs/for-ai/new-project/planned.md**: Implementation phases
    - Phase 1: Foundation (HTML, Schema, Crawlability)
    - Phase 2: Documentation (Structure, Clarity, Agent-Friendly)
    - Phase 3: Ecosystem (Visibility, Governance, Community)
  - **docs/for-ai/new-project/PULL_REQUEST_TEMPLATE.md**: PR template
  - Location: [docs/for-ai/new-project/](docs/for-ai/new-project/)

### Changed (Notes)

- **docs/structure/todo.txt**: Added pitch content and accessibility notes
  - Machine Experience pitch framework
  - 5-stage agent journey explanation
  - January 2026 convergence timeline
  - SVG alt text and contrast issue notes

## [2026-01-23 - Audit Site Skill] - Automated Client Audit Workflow

### Added (Claude Code Skills)

- **`/audit-site` Skill**: New skill for automated client website audits and executive report generation
  - **Workflow automation**: Complete end-to-end audit and report generation
    - Runs web-audit-suite with cache clearing
    - Analyzes all result files (accessibility, performance, SEO, LLM suitability)
    - Checks llms.txt and robots.txt with critiques
    - Generates customized executive sales report from template
  - **Template integration**: Uses [web-audit-suite-template.md](packages/sales-enablement/outreach/web-audit-suite-template.md)
    - Replaces all `[PLACEHOLDER]` values with actual audit data
    - Customizes business context for client industry
    - Researches and names actual competitors
    - Removes template instructions
  - **YAML Frontmatter**: Comprehensive metadata including:
    - Client information (name, URL, slug)
    - Audit metrics (scores, issue counts, pages analyzed)
    - Engagement options with pricing
    - Document metadata (version, date, confidential status)
  - **Output structure**: Creates dated directories in `packages/sales-enablement/outreach/YYYY-MM-DD/`
  - **Quality assurance**: Runs markdownlint and fixes errors automatically
  - **Business focus**: Emphasis on ROI, competitive advantage, and business impact
  - Location: [.claude/skills/audit-site/skill.md](.claude/skills/audit-site/skill.md)
  - Usage: `/audit-site [URL]` or with context in prompt

### Changed (Documentation - Skill Count)

- **CLAUDE.md**: Updated skill count from nine to ten, added audit-site skill documentation

## [2026-01-22 - Executive Sales Reports] - CMS Critic Audit Reports

### Added (Sales Enablement)

- **Sales Enablement Materials**: Created executive sales reports for CMS Critic web audit
  - **cmscritic.md**: Complete executive sales report analyzing web audit findings
    - 144 WCAG AA accessibility errors identified
    - Missing semantic HTML structure (`<main>` element)
    - Agent optimization opportunities
    - Three-tier engagement options (£18k-£85k)
    - Priority-based action plan (Critical → High → Medium)
  - **template.md**: Reusable template for future client reports
    - Placeholder-based structure for rapid customization
    - Embedded instructions and examples
    - Usage guide with placeholder reference table
    - Consistent with sales-enablement format
  - Location: [packages/sales-enablement/outreach/](packages/sales-enablement/outreach/)
  - Submodule commit: 79a2cb2

### Fixed (Markdown Linting)

- **Markdown Linting**: Fixed all 48 linting errors in cmscritic.md
  - Added blank lines before/after all list blocks (43 instances)
  - Added language specifiers to code blocks (2 instances)
  - Converted bold text to proper heading (1 instance)
  - Wrapped bare URLs in angle brackets (2 instances)
  - File now passes all markdownlint checks

## [2026-01-22 - Blog Accessibility Fixes] - WCAG 2.1 Level A Compliance

### Fixed (Blog Accessibility)

- **Blog SVG Accessibility**: Added `title` attribute to `<object>` elements to fix Deque `object-alt` accessibility rule violations
  - **Issue**: WCAG 2.1 Level A violation - `<object>` elements lacked alternative text for screen readers
  - **Solution**: Added `title` attribute to all SVG `<object>` tags with diagram descriptions
  - **Previous incorrect approach**: Used `aria-label` on `<figure>` wrapper (wrong element) or on `<object>` (triggers html-validate warning)
  - **Correct approach**: Use native HTML `title` attribute on `<object>` element
  - Benefits: Screen reader compatibility, no validation warnings, cleaner semantic HTML
  - Updated in: [scripts/generate-blog-html.js](scripts/generate-blog-html.js:395-410)
  - Regenerated: All existing blog posts with corrected pattern

- **Blog Table Accessibility**: Added `<caption>` elements to all data tables
  - **Issue**: WCAG 2.1 Level A violation - tables lacked captions, making them inaccessible to screen readers
  - **Solution**: Automatically generate `<caption>` elements from context:
    - Pattern 1: Bold text before table (e.g., "**The Four Asset Categories:**") → `<caption>`
    - Pattern 2: Figcaption from preceding `<figure>` element → `<caption>` (for tables following diagrams)
  - **Critical fix**: Reordered post-processing to convert SVG placeholders BEFORE extracting table captions
  - Benefits: Screen readers can associate descriptive text with table data, improved table navigation
  - Updated in: [scripts/generate-blog-html.js](scripts/generate-blog-html.js:416-456)
  - Regenerated: All existing blog posts with proper table captions

- **Blog Color Contrast**: Fixed insufficient color contrast ratios to meet WCAG 2.1 AA standards
  - **Issue**: WCAG 2.1 Level AA violation - color `#718096` (medium gray) had insufficient contrast on white background (fails 4.5:1 requirement for normal text)
  - **Solution**: Replaced `#718096` with `#595959` (darker gray with ~8:1 contrast ratio) in:
    - Article metadata (date, reading time)
    - Figure captions
    - Footer text
  - Benefits: All text meets WCAG AA contrast standards, passes WAVE accessibility checker
  - Updated in: [.claude/skills/create-blog/blog-template.css](.claude/skills/create-blog/blog-template.css)
  - Regenerated: All existing blog posts with corrected colors

- **Blog SEO Meta Tags**: Added robots meta tags to blog template
  - **Issue**: Missing `robots` and `X-Robots-Tag` meta tags for search engine crawlers
  - **Solution**: Added standard SEO robots meta tags with `index, follow` directives
  - Benefits: Explicit search engine indexing instructions, improved SEO compliance, passes WAVE checker
  - Updated in: [.claude/skills/create-blog/blog-template.html](.claude/skills/create-blog/blog-template.html)
  - Applied to: All existing blog posts

### Added (Blog AI Metadata)

- **Blog AI Attribution Text**: Enhanced AI attribution meta tag with explicit attribution text
  - **Implementation**: Added `text` attribute to `ai-attribution` meta tag per Appendix L Pattern 1
  - **Format**: `text="Source: [Blog Title] by Tom Cranstoun, Digital Domain Technologies Ltd, [Blog URL]"`
  - Benefits: AI agents receive explicit, consistent attribution text for citations
  - Reference: [Appendix L lines 140-157](packages/shared-appendices/appendix-l-proposed-ai-metadata-patterns.md#L140-L157)
  - Updated in: [.claude/skills/create-blog/blog-template.html](.claude/skills/create-blog/blog-template.html)
  - Applied to: All existing blog posts

- **Blog llms.txt Discovery**: Added llms.txt reference meta tag to blog template
  - **Implementation**: `<meta name="llms-txt" content="/llms.txt">` per Appendix L Pattern 1
  - Benefits: Helps AI agents discover site-wide AI documentation at root location
  - Reference: [Appendix L lines 159-169](packages/shared-appendices/appendix-l-proposed-ai-metadata-patterns.md#L159-L169)
  - Updated in: [.claude/skills/create-blog/blog-template.html](.claude/skills/create-blog/blog-template.html)
  - Applied to: All existing blog posts

### Changed (Semantic HTML Cleanup)

- **HTML Structure**: Removed redundant `role="img"` from `<figure>` wrappers
  - Semantic `<figure>` elements already have implicit ARIA role
  - Cleaner HTML5 markup following best practices

### Changed (Appendix L - AI Metadata Documentation)

- **ai-structured-data Values**: Updated Appendix L to document both value conventions
  - Added `schema.org-jsonld` as valid alternative to `json-ld`
  - Rationale: `schema.org-jsonld` is more specific (indicates Schema.org vocabulary), while `json-ld` is simpler
  - Both values are valid - choose based on preference for specificity vs simplicity
  - Updated in: [packages/shared-appendices/appendix-l-proposed-ai-metadata-patterns.md](packages/shared-appendices/appendix-l-proposed-ai-metadata-patterns.md#L124-L138)

## [2026-01-22 - Blog SVG Fallback Improvement] - Simpler Diagram Fallback Pattern

### Changed (SVG Fallback Pattern)

- **SVG Fallback Pattern**: Simplified fallback content in blog SVG diagrams
  - **Old pattern**: Redundant `<img>` tag inside `<object>` duplicating figcaption content
  - **New pattern**: Simple "Diagram not available" text message
  - Benefits: No duplication, works for both AI agents and humans, cleaner HTML
  - Updated in: `scripts/generate-blog-html.js` and `.claude/skills/create-blog/skill.md`

### Added (Development Tooling)

- **Development Tooling**: Added http-server for local blog testing
  - New dependency: `http-server` (^14.1.1)
  - New script: `npm run debug` - Serves blog with CORS enabled for testing
  - Opens `machine-experience-adding-metadata.html` in default browser
  - Disables caching (-c-1) for immediate updates during development

### Submodule Updates (SVG Fallback)

- outputs: 9bed084 (Update blog post: fix SVG diagram filenames and fallback content)

## [2026-01-22 - Flat Blog Structure] - Simplified Directory Layout

### Changed (Directory Structure)

- **Blog Directory Structure**: Restructured from nested subdirectories to flat layout
  - **Old structure**: `outputs/bible/blogs/mx/[topic-slug]/index.html`
  - **New structure**: `outputs/bible/blogs/mx/[filename].html`
  - All blog assets now use filename prefix to avoid conflicts
  - File naming: `[filename].html`, `[filename].css`, `[filename]-[diagram].svg`
  - Simplified URLs: `https://allabout.network/blogs/mx/[filename].html`
  - No more nested directories - all files at same level

- **Blog Generation Script**: Updated `scripts/generate-blog-html.js` for flat structure
  - Output directly to `mx/` directory (not `mx/[topic-slug]/`)
  - Prefix all SVG diagrams with blog filename
  - Prefix CSS file with blog filename
  - Updated URL generation (removed topic-slug subdirectory)
  - Functions updated: `calculateDerivedMetadata()`, `extractInlineSVGs()`, `convertAsciiDiagrams()`

- **Documentation**: Updated CLAUDE.md and create-blog skill.md to reflect flat structure
  - New file naming patterns and URL examples
  - Simplified output directory explanation

### Submodule Updates

- outputs: 9ad520e (Restructure blog to flat directory layout)

## [2026-01-22 - Blog URL Fixes] - Correct Metadata URLs for Custom Filenames

### Fixed

- **Blog Generation URLs**: Fixed og:url, twitter:url, and JSON-LD @id to include HTML filename
  - When custom HTML filenames are used (not `index.html`), URLs now include the filename
  - Example: `https://allabout.network/blogs/mx/topic/custom-filename.html` (was: `.../topic/`)
  - Affects social media cards (Facebook, Twitter, LinkedIn) and structured data
  - Updated `calculateDerivedMetadata()` to accept `htmlFilename` parameter
  - Moved `htmlFilename` construction before metadata calculation

### Added

- **Canonical Tag**: Added `<link rel="canonical">` to blog template for SEO
  - Automatically uses correct URL (includes HTML filename when applicable)
  - Helps search engines identify authoritative URL for the page

### Submodule Updates

- outputs: 4dc4e02 (Fix blog metadata URLs to include HTML filename)

## [2026-01-22 - Blog Generation Automation] - Complete HTML Blog Generation Pipeline

### Added

- **Blog Generation Infrastructure**: Automated 11-phase pipeline for markdown to HTML conversion
  - `scripts/generate-blog-html.js`: Complete blog generation with WCAG 2.1 AA compliance
    - Parses YAML frontmatter and EDS metadata tables
    - Extracts inline SVGs to separate files with semantic filenames
    - Converts ASCII diagrams to SVG (detects arrow characters: →, ↓, ↑, ←)
    - Generates table of contents from H2 headings with anchor IDs
    - Calculates word count and reading time (200 words/minute)
    - Populates HTML template with 14 metadata fields
    - Creates Schema.org JSON-LD structured data
    - Validates output (H1 count, metadata artifacts, ASCII diagrams)
  - `scripts/preprocess-ascii-to-svg.js`: ASCII diagram to SVG converter
    - Detects arrow characters in code blocks
    - Generates professional SVG with boxes and arrows
    - Multi-branch arrow support (parallel flows: ↓ ↓ ↓)
    - Accessibility attributes (title, description, ARIA labels)
  - `.htmlvalidate.json`: HTML validation configuration
  - `markdown-it-anchor` dependency: Heading anchor ID generation

- **Blog Output**: Generated MX blog post with complete infrastructure
  - `outputs/bible/blogs/mx/machine-experience-adding-metadata-so-ai-agents-do/`
    - `machine-experience-adding-metadata.html` (4,714 words, 24 min read)
    - `styles.css` (WCAG 2.1 AA compliant, 372 lines)
    - `social-card.svg` (1200x630px for social media)
    - 6 semantic SVG diagrams:
      - `the-5-stage-agent-journey.svg`
      - `human-vs-ai-agent-behaviour.svg`
      - `the-content-pipeline-where-mx-fits.svg`
      - `content-operations-mx-content-delivery.svg`
      - `platform-database-amazon-shopify-proprietary-cms.svg`
      - `entity-asset-layer-your-sovereign-database.svg`

- **Documentation**: Blog generation commands section in CLAUDE.md
  - Documents `generate-blog-html.js` usage and features
  - Documents `preprocess-ascii-to-svg.js` for ASCII diagrams
  - Includes HTML validation command reference
  - Links to create-blog skill documentation

### Changed

- **create-blog Skill**: Added filename confirmation step (Step 2.5)
  - User chooses from 3 filename suggestions (full/medium/short slug)
  - Custom filename option with validation
  - Updated Step 11 to reflect automated script workflow
  - Clarified social media card generation status (not yet automated)

- **Claude Settings**: Added blog generation script to allowed commands
  - Permits `node scripts/generate-blog-html.js` execution
  - Enables automated blog generation in Claude Code environment

### Fixed

- **Appendix D**: Added JSON-LD validation guidance
  - Document ISO 8601 date format requirements (YYYY-MM-DD)
  - Provide JavaScript conversion function for DD/Mon/YYYY format
  - Help developers avoid Schema.org validation failures

### Submodule Updates

- outputs: ea00866 (Add MX blog with WCAG 2.1 AA compliance)
- shared-appendices: 379c5a1 (Add JSON-LD validation guidance)

### Features

- **WCAG 2.1 AA Compliance**:
  - Color contrast: #0066cc links (4.58:1 ratio exceeds 4.5:1 minimum)
  - Skip to content link (keyboard navigation)
  - Focus indicators on all interactive elements (2px solid outline)
  - Touch targets: 44x44px minimum on mobile
  - Reduced motion support (`prefers-reduced-motion` media query)

- **AI Agent Compatibility**:
  - Schema.org JSON-LD with BlogPosting type
  - AI-specific meta tags (ai-preferred-access, ai-content-policy, etc.)
  - SVG object tags (parseable by AI agents, not opaque images)
  - Semantic SVG filenames (machine-readable descriptions)
  - Heading anchor IDs (H2-H6) for direct linking
  - Data attributes for machine parsing

## [2026-01-22 - Content Improvements] - Blog Post Refinements and Documentation Updates

### Changed

- **MX Blog Post**: Improved "Diversity Explosion" section formatting
  - Added proper H3 heading (was plain text)
  - Converted statistics to bulleted list for better readability
  - Loosened precise percentages to approximations (e.g., "92%" → "Over 90%")
  - Clarified final sentence emphasizing intensifying diversity problem

### Added

- **Appendix D**: New anti-pattern documentation for ASCII diagrams
  - Explains why ASCII diagrams fail for agents and screen readers
  - Provides bad example (ASCII in code block)
  - Shows good examples (SVG with accessibility markup)
  - Includes inline SVG alternative for smaller diagrams
  - Clarifies when ASCII is acceptable (internal docs only)
- **MX-plan.md**: Comprehensive blog generation implementation documentation
  - Topic-based URL structure vs dated folders
  - ASCII diagram to SVG conversion algorithm
  - H4-H6 heading support implementation
  - MX principles demonstrated in practice
  - Strategic alignment with EAL and 5-stage journey

### Submodule Updates

- outputs: d770acd (blog post Diversity Explosion section improvements)
- shared-appendices: 26ce9e4 (ASCII diagram anti-pattern documentation)

## [2026-01-22 - Skill Updates] - Blog Skill AI Agent Compatibility Improvements

### Fixed

- **create-blog Skill**: Enhanced AI agent compatibility and cleaned up generated HTML
  - Removed misleading "Blogroll" label from bio section (semantically incorrect term)
  - Updated SVG handling to use `<object>` tags instead of `<img>` tags
    - AI agents can now parse SVG content directly through `<object>` elements
    - Maintains browser compatibility with `<img>` fallback
  - Implemented semantic SVG filenames (e.g., `5-stage-agent-journey.svg` instead of `MX-The-blog-fig-1.svg`)
    - Analyzes SVG title, surrounding headings, and text content
    - Generates descriptive slugs for better machine readability
  - Added metadata table cleanup to prevent EDS directives appearing in final HTML
    - Strips `| metadata |`, `| bio |`, `| Blogroll |`, and other parsing tables
    - Removes Adobe EDS fragment references
    - Cleans up document-end metadata sections

### Changed

- **blog-template.html**: Removed `<div class="bio-label">Blogroll</div>` from bio section
- **blog-template.css**: Removed orphaned `.bio-label` styles
- **skill.md**:
  - Step 5: Updated SVG extraction process for semantic naming
  - Step 6: Added pre-conversion metadata table cleanup
  - Step 9: Changed placeholder replacement to use `<object>` tags
  - Step 11: Updated output file documentation for semantic names
- **README.md**: Documented AI agent compatibility features

### Documentation

- **Repository Structure Updates**: Corrected repository count from 8 to 7
  - Removed references to discontinued `dont-make-ai-think` submodule
  - Updated CLAUDE.md, pwd-reminder.md, ONBOARDING.md
  - Simplified architecture documentation
  - Minor workflow file formatting cleanup

### Submodule Updates

- outputs: 78902d9 (refined blog post content, title changes, British spelling fixes)

## [2026-01-22 - Documentation] - MX/HTML Distinction and Style Guide

### Changed

- **MX/HTML Distinction**: Clarified relationship across all documentation
  - Updated blog post (`outputs/bible/blogs/MX-The-blog.md`): "HTML, informed by MX, is the publication point"
  - Updated strategic plan (`docs/structure/MX-plan.md`): Changed 4 instances from "MX is the publication mechanism" to "MX is the practice"
  - Updated Chapter 0 (`docs/shared-chapters/chapter-00-what-are-ai-agents.md`): Updated 3 locations for consistency
  - Maintains principle: MX is the methodology/practice; HTML is the delivery mechanism

- **Writing Style Guide Compliance** in blog post (`outputs/bible/blogs/MX-The-blog.md`):
  - British English: `web-optimization` → `web-optimisation`
  - Removed "The" prefixes: 6 headings (Numbers Tell..., Invisible User Problem, 5-Stage MX Framework, etc.)
  - Fixed forbidden vocabulary: `optimising` → `improving machine visitor compatibility`
  - Removed colons from headings: 4 non-standard headings (Entity Asset Layer and Sovereign Portability, etc.)
  - Fixed forbidden construct: "From Identity to Strategic Asset Vault" → "Identity Evolves into Strategic Asset Vault"

### Submodule Updates

- outputs: ae4b8d2 (style guide fixes to blog post)

## [2026-01-22 - EAL] - Entity Asset Layer Documentation and Strategic Positioning

### Added

- **EAL Glossary Entry**: Added comprehensive Entity Asset Layer definition to `packages/bible/chapters/Glossary.md`
  - Defines EAL as independent asset database owned by organizations
  - Clarifies relationship with MX patterns (Schema.org, JSON-LD, semantic HTML)
  - Emphasizes sovereign portability across technology choices

- **EAL Section Enhancements** in `outputs/bible/blogs/MX-The-blog.md`:
  - Clear EAL definition for dual audience (business and technical readers)
  - Enhanced asset table with "Purpose" and "Strategic Value" columns
  - "Getting Started with Entity Assets" section with separate guidance for business leaders and technical teams
  - Product Specification example demonstrating Knowledge Asset pattern
  - Open source EAL implementation call-to-action with core features, rationale, and invitation to collaborate

- **Strategic MX Tagline**: Added "MX is the practice: HTML is the delivery mechanism" across key documents
  - Blog post: Added as closing flourish to reinforce strategic positioning
  - MX-plan.md: Added in 2 locations with explanatory context
  - Chapter 0: Added in MX introduction section with explanation
  - Purpose: Emphasize MX as strategic discipline, not just HTML adjustments

### Changed

- **Simplified Technical Language**: Replaced jargon in blog post EAL section
  - "Sovereign, portable asset ownership" → "You own your assets, and they travel with you"
  - "Entity Assets published as structured HTML metadata" → "Your assets embedded as machine-readable data in web pages"

### Submodule Updates

- outputs: 27296da (blog EAL section enhancements + tagline)
- packages/bible: 64b6962 (glossary EAL entry)

## [2026-01-22] - Blog Skill: WCAG 2.1 AA Accessibility

### Added

- **`/create-blog` Skill**: New skill for transforming markdown blog posts into WCAG 2.1 AA compliant HTML
  - Template-based approach with `blog-template.html` (17 placeholders) and `blog-template.css`
  - Complete WCAG 2.1 Level AA compliance:
    - Skip to content link (2.4.1 Bypass Blocks)
    - Focus indicators 2px outline on all interactive elements (2.4.7 Focus Visible)
    - Color contrast #0066cc 4.58:1 ratio (1.4.3 Contrast Minimum)
    - Touch targets 44x44px mobile (2.5.5 Target Size)
    - Reduced motion support via prefers-reduced-motion (2.3.3 Animation from Interactions)
  - Semantic HTML landmarks: `<aside>`, `<nav>`, `<main>`, `<article>` with proper `aria-label`
  - Complete metadata: Open Graph, Twitter Card, Schema.org JSON-LD (BlogPosting)
  - SVG extraction to separate files for performance and accessibility
  - Social media card generation (1200x630px SVG)
  - Collapsible table of contents (pre-collapsed `<details>` element)
  - Bio section with author image and catch text
  - Floating back-to-top button (fixed position, bottom-left)
  - Print styles with visible URLs
  - Responsive design with mobile-optimized touch targets

- **Appendix D Enhancement**: Added complete blog accessibility pattern to `appendix-d-ai-friendly-html-guide.txt`
  - Comprehensive WCAG 2.1 AA implementation guide
  - Complete HTML and CSS examples
  - Testing checklist and common mistakes to avoid
  - Demonstrates convergence principle (accessibility benefits everyone including AI agents)

- **Blog Example**: Generated MX-The-blog as reference implementation
  - Published to `outputs/bible/blogs/published/2026-01-22/`
  - 6 files: HTML, CSS, social SVG, 3 content SVGs
  - Validates with zero HTML errors
  - Passes all WCAG 2.1 AA criteria

- **LEARNINGS.md**: Added WCAG accessibility battle-tested rules
  - Redundant ARIA roles on semantic HTML5 elements (causes validation errors)
  - Link color contrast requirements (#3498db fails AA, #0066cc passes)

### Changed

- **CLAUDE.md**: Updated skill count from eight to nine, added `/create-blog` description

### Technical Details

**Template Placeholders**:

- `{{TITLE}}`, `{{AUTHOR}}`, `{{DESCRIPTION}}`, `{{KEYWORDS}}`, `{{KEYWORDS_ARRAY}}`
- `{{ISO_DATE}}`, `{{DISPLAY_DATE}}`, `{{WORD_COUNT}}`, `{{READING_TIME}}`
- `{{BIO_CATCH}}`, `{{TOC_ITEMS}}`, `{{ARTICLE_CONTENT}}`
- `{{CSS_FILENAME}}`, `{{OG_URL}}`, `{{SOCIAL_IMAGE_URL}}`, `{{LINKEDIN_URL}}`

**Submodule Updates**:

- outputs: fa1f18f (MX-The-blog generated HTML with accessibility)
- packages/shared-appendices: 1600035 (blog pattern added to Appendix D)

## [2026-01-22] - Restructure: Remove MX-Don't Make AI Think

### Removed

- **Submodule Removal**: Removed packages/dont-make-ai-think submodule completely
  - Removed submodule from .gitmodules (7 submodules instead of 8)
  - Removed books/dont-make-ai-think symlink
  - Updated repository count from NINE to EIGHT git repositories (1 main + 7 submodules)

### Changed

- **CLAUDE.md**: Updated to reflect two-book structure
  - Changed workspace description from "three books" to "two books"
  - Removed all dont-make-ai-think references from Repository Architecture section
  - Removed dont-make-ai-think from Navigation Map (books symlinks and packages structure)
  - Updated shorthand reference table (removed "dont" entry, kept "bible" and "handbook/slim")
  - Updated Project Overview section (two books instead of three)
  - Updated Timeless Manuscript Rule file paths (removed dont-make-ai-think/chapters/)
  - Updated outputs submodule naming note (removed dont/ directory reference)
  - Updated llms.txt decoration pattern (replaced dont-make-ai-think with mx-handbook)
  - Updated git command examples (changed from dont-make-ai-think to mx-handbook)

- **README.md**: Updated to reflect two-book structure
  - Changed "Three book variants" to "Two books with shared appendices"
  - Removed MX-Don't Make the AI Think from book manuscripts list
  - Removed dont-make-ai-think from packages structure
  - Removed dont-make-ai-think symlink from books structure
  - Updated symlink initialization list (removed books/dont-make-ai-think)
  - Removed MX-Don't Make the AI Think README from package documentation
  - Updated submodule list from 10 to 9 items
  - Removed outputs/dont/ directory from structure

### Added

- **Strategic Planning Documentation**: New docs/structure/ directory
  - MX-plan.md (46 KB): Machine Experience strategic review and positioning
  - github-repositories.md (16 KB): Complete repository structure mapping
  - steve-krug.md (24 KB): UX research insights from "Don't Make Me Think"

- **Presentation Organization**: Reorganized docs/talks/ structure
  - Created docs/talks/historical/ for archived presentations
  - Moved members-call/ → historical/members-call-21-jan-26/
  - Added presentation PPTX file and review notes
  - Created docs/talks/template/ for reusable presentation templates

- **Outputs Submodule**: Blog content reorganization (c96c230)
  - Updated AI-Native.blog with latest content
  - Added MX-The-blog.md for new MX-focused blog post
  - Created published/ directory for organized blog structure
  - Removed outdated blog drafts and documentation files

### Rationale

- Project focus narrowed to two complementary books: MX-Bible (comprehensive) and MX-Handbook (practical implementation)
- MX-Don't Make the AI Think content merged into other books or deprecated
- Simplified repository structure and documentation maintenance
- Strategic planning documents provide context for MX positioning and repository organization
- Presentation reorganization separates historical content from reusable templates

## [2026-01-22] - Documentation Structure Reorganization (Earlier)

### Changed

- **Documentation Structure**: Reorganized repository documentation for better clarity
  - Moved `docs/repo/GIT-README.md` → `docs/architecture/GIT-README.md` (architectural documentation)
  - Moved `docs/repo/TIMELESS-MANUSCRIPT-RULE.md` → `docs/architecture/TIMELESS-MANUSCRIPT-RULE.md` (architectural documentation)
  - Moved `docs/repo/ONBOARDING.md` → `ONBOARDING.md` (root directory for easy discovery)
  - Moved `docs/repo/PR_TEMPLATE.md` → `.github/PULL_REQUEST_TEMPLATE.md` (standard GitHub location)
  - Removed empty `docs/repo/` directory
  - Updated all references across 17 main repo files and 6 submodule README files
  - Reorganized `docs/architecture/doc-architecture.md` structure to reflect new organization

- **Submodule Updates**: Updated GIT-README.md path references in all submodules
  - Bible submodule (4539310): Updated README.md with new docs/architecture/ path
  - Don't Make AI Think submodule (7f9a05c): Updated README.md with new docs/architecture/ path
  - MX-Handbook submodule (e1641cb): Updated README.md with new docs/architecture/ path
  - Shared Appendices submodule (3930b98): Updated README.md with new docs/architecture/ path
  - Shared Code Examples submodule (e4d17bb): Updated README.md with new docs/architecture/ path
  - Outputs submodule (6042978): Updated README.md with new docs/architecture/ path

### Removed

- `book-launch-strategy.md` - Moved to sales-enablement submodule
- `docs/repo/possible-topics.md` - Moved to sales-enablement submodule

### Rationale

- GIT-README.md and TIMELESS-MANUSCRIPT-RULE.md document architectural decisions and patterns, better grouped with other architecture documentation
- ONBOARDING.md belongs at repository root for immediate visibility alongside README.md
- PR template moved to standard GitHub `.github/` location for automatic GitHub integration
- Simplifies documentation structure by consolidating architecture docs and eliminating intermediate `docs/repo/` directory

## [2026-01-22] - Book Rebranding with Public Names and Shorthand Reference System

### Added

- **CLAUDE.md**: New "Book Names and Shorthand Reference" section documenting public brand names and shorthand terms
  - Public names: "MX-Bible", "MX-Don't Make the AI Think", "MX-Handbook"
  - Shorthand mappings: bible → MX-Bible, dont → MX-Don't Make the AI Think, handbook/slim → MX-Handbook
  - Scope definitions: books/manuscript → all three books, project/workspace → everything except read-only repos
  - Clear distinction between public names (for external reference), shorthand (for prompts), directory names (for file operations), and repository names (for git operations)

### Changed

- **Main Repository**: Updated all book name references across 51 files
  - CLAUDE.md: Updated Repository Architecture, Navigation Map, Project Overview sections with new book names
  - README.md: Updated book manuscript listings with new public names and former name notes
  - llms.txt: Updated title and metadata to reference "MX Series"
  - package.json: Updated PDF generation commands to use new filenames (mx-bible.pdf, etc.) and metadata titles
  - docs/: Updated all documentation files (repo/, for-ai/, sales-enablement/, architecture/, scrapboard/, talks/, shared-chapters/)
  - .claude/skills/: Updated news, opportunity, and review-docs skills with new book names
  - scripts/: Updated all scripts with new book names

- **Submodule: outputs**: Updated blog posts and generated HTML files (9 files)
  - Replaced "The Invisible Users" with "MX-Bible"
  - Replaced "Don't Make AI Think" with "MX-Don't Make the AI Think"
  - Updated all cross-references to sibling books

- **Submodule: packages/bible**: Updated all chapters, README, and metadata (22 files)
  - Updated book name from "The Invisible Users" to "MX-Bible"
  - Updated metadata.yaml and metadata-kindle.yaml with new title
  - Updated cross-references to sibling books throughout all chapters

- **Submodule: packages/mx-handbook**: Updated all chapters, README, and metadata (17 files)
  - Confirmed book name is "MX-Handbook" throughout
  - Updated cross-references to MX-Bible and MX-Don't Make the AI Think
  - Updated metadata.yaml with consistent naming

- **Submodule: packages/shared-appendices**: Updated all appendices and HTML files (53 files)
  - Updated references to MX-Bible (formerly "The Invisible Users")
  - Updated references to MX-Don't Make the AI Think and MX-Handbook
  - Updated all markdown appendix files (appendix-a through appendix-m)
  - Updated all HTML files in web/ directory
  - Updated llms.txt with new book names

- **Submodule: packages/shared-code-examples**: Updated code examples and documentation (6 files)
  - Updated README.md with new book names
  - Updated HTML examples with MX-Bible references
  - Updated JavaScript and identity delegation examples
  - Ensured consistency across all code examples

### Notes

- packages/dont-make-ai-think submodule intentionally not updated (separate plan per user request)
- Directory names and repository names remain unchanged for stability
- Legacy references to "The Invisible Users" retained where providing historical context
- All markdown files pass linting (config/.markdownlint.json)

## [2026-01-22] - YAML Frontmatter Title Duplication Fix

### Changed

- **CLAUDE.md**: Corrected YAML frontmatter guidance to avoid title duplication
  - Removed incorrect advice about title in frontmatter + H1 in content being acceptable
  - Added "CRITICAL PRINCIPLE: Avoid Title Duplication" section
  - Documented two patterns: H1 in content (preferred) OR title in frontmatter (special cases only)
  - Updated heading structure guidance to reflect correct principle

- **Markdown Workflow Skill** (.claude/skills/md-workflow/skill.md): Corrected frontmatter pattern guidance
  - Replaced "metadata-only vs included" framework with "avoid duplication" principle
  - Pattern 1: H1 in content, no title in frontmatter (preferred for most documents)
  - Pattern 2: Title in frontmatter only (book chapters using Pandoc)
  - Updated "Avoiding MD025 Warnings" section to show old pattern (causes warnings) vs new pattern (no warnings)

- **Pre-tool-use Hook** (.claude/hooks/pre-tool-use.sh): Updated markdown workflow reminder
  - Changed from "frontmatter metadata-only → H1 required" to "avoid title duplication"
  - New message: "If markdown has H1 heading: DO NOT include 'title:' field in YAML frontmatter"
  - Emphasizes choosing ONE approach, not both

### Fixed

- **Blog Post** (outputs/bible/blogs/boye-co-member-call-review.md): Removed redundant title field from YAML frontmatter
  - Kept H1 heading in content
  - Removed `title:` field from frontmatter (was duplicating H1)
  - Eliminates MD025 warning and redundancy

## [2026-01-21] - Markdown Workflow Skill and Hook

### Added

- **Markdown Workflow Skill** (.claude/skills/md-workflow/): Comprehensive guidance for creating, editing, and linting markdown files with YAML frontmatter awareness
  - skill.md: 244-line documentation covering:
    - YAML frontmatter processing (metadata-only vs included in output)
    - Markdown linting rules and project configuration
    - Workflow steps (creating, editing, linting files)
    - Troubleshooting MD025 warnings (expected for frontmatter files)
    - Integration with /review-docs, /md-fix, /step-commit skills
  - md-workflow.json: Skill configuration with detailed AI agent instructions
  - Critical pattern documentation: When YAML frontmatter is metadata-only (stripped during processing), first content heading MUST be H1 (#)
  - Applies to ANY markdown file in ANY directory (blogs, chapters, docs, etc.)

- **Pre-tool-use Hook Enhancement** (.claude/hooks/pre-tool-use.sh): Markdown workflow reminder
  - Triggers on Edit/Write operations for .md files
  - Reminds about YAML frontmatter + heading structure pattern
  - Warns against incorrectly changing H1 to H2 to suppress MD025
  - Suggests /md-workflow skill for comprehensive guidance

### Changed

- **CLAUDE.md**: Generalized YAML frontmatter documentation (lines 409-435)
  - Updated from blog-specific to apply to ANY markdown file
  - Added "YAML Frontmatter Processing" section explaining two processing modes
  - Documented MD025 warnings as expected for metadata-only frontmatter files

## [2026-01-21] - MX-The Handbook Repository Setup

### Added

- **MX-The Handbook Repository** (MX-The-Handbook 3463bf8): New practical implementation guide as independent submodule
  - Created private GitHub repository: Digital-Domain-Technologies-Ltd/MX-The-Handbook
  - Copied and rebranded from dont-make-ai-think structure
  - 11 chapters + preface + CHAPTERS-GUIDE.md
  - Updated all branding:
    - Cover page (0-cover.md, formerly 00-cover.md): "MX-The Handbook"
    - README.md: Complete rebranding with MX build commands
    - metadata.yaml: Title updated for Pandoc generation
    - All chapter YAML frontmatter: `book: "MX-The Handbook"`
  - Maintains same focus as "Don't Make AI Think" with different branding
  - Complete commit history: 067e931 (initial) → 3463bf8 (metadata updates)

- **Build Scripts** (package.json): Five npm scripts following established "dont" pattern
  - `pdf:mx-html` - Generate HTML version
  - `pdf:mx-generate` - Generate A4 PDF
  - `pdf:mx-kindle` - Generate 6"×9" Kindle PDF
  - `pdf:mx-simple` - Generate simple PDF without headers/footers
  - `pdf:mx-all` - Generate all formats in sequence
  - Output directory: `outputs/mx/`

- **Submodule Integration**:
  - Added at `packages/mx-handbook/` (main repo commit 1df28cf)
  - Convenience symlink created at `books/mx-handbook`
  - Submodule pointer updated to 3463bf8 (main repo commit 22093bb)
  - Repository count increased from 7 to 8 git repositories

### Changed

- **CLAUDE.md**: Updated with MX-The Handbook references
  - Added to book manuscripts list (line 230)
  - Updated repository count: "EIGHT git repositories (1 main hub + 7 submodules)"
  - Updated submodules count from 6 to 7
  - Added to Repository Navigation Map with complete directory structure
  - Added to books symlinks section
  - Updated manuscript file paths to include `packages/mx-handbook/chapters/`

- **README.md**: Added MX-The Handbook to book manuscripts list
  - Changed from "Two book variants" to "Three book variants"
  - Listed as "Practical implementation guide (11 chapters, rebranded)"

- **Markdown Linting** (package.json): Added `--ignore packages/mx-handbook` to `lint:markdown:all` script

### Technical Notes (MX-Handbook Setup)

- Repository structure follows established submodule pattern:
  - Content-only repository (no package.json, no build tooling)
  - All build commands orchestrated from parent `invisible-users` repo
  - Independent git version control
  - YAML frontmatter in all chapter files with `ai-instruction` field
- Build scripts tested successfully: HTML generation produces 909KB output
- All changes follow git submodule-first workflow from docs/architecture/GIT-README.md

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
  - **docs/architecture/TIMELESS-MANUSCRIPT-RULE.md**: Implementation summary with remaining work checklist and verification commands

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
  - New file order: 0-cover.md (formerly 00-cover.md) → preface.md → chapter-*.md → CHAPTERS-GUIDE.md
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
  - Updated ONBOARDING.md: Directory tree structure
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
  - Updated docs/architecture/GIT-README.md: Replaced all 40+ occurrences of `packages/manuscript/the-bible-of-mx` with `packages/bible` in examples
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
  - Cross-references to parent repository CLAUDE.md and docs/architecture/GIT-README.md

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
