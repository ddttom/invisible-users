# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Note:** Full detailed changelog with 57 entries archived in [CHANGELOG-FULL.md](CHANGELOG-FULL.md)

## [Unreleased]

### Changed - Sales Enablement Directory Organization (2026-01-17)

Reorganized docs/sales-enablement/ from flat structure with 25 files into 8 logical subdirectories for improved navigation and discovery.

**New Folder Structure:**

- **business/** (4 files) - Business strategy documents (business plan, opportunities, executive summary, go-to-market plan)
- **pitches/** (3 files) - Pitch materials and ROI case studies
- **publishers/** (4 files) - O'Reilly submission materials (proposal, TOC, sample chapter, author bio)
- **partners/** (4 files) - Partner-focused materials (Kentico pitch, partner kits, toolkits)
- **outreach/** (4 files) - Communication templates (Adobe analysis, reviewer emails)
- **content/** (4 files) - Blog posts and promotional content
- **profiles/** (2 files) - Professional profiles (LinkedIn, general)
- **pricing/** (1 file) - Pricing strategy

**Documentation Updates:**

- Updated README.md with complete new folder structure showing all files by category
- Updated CLAUDE.md with organized subfolder descriptions
- Updated /opportunity skill documentation (README.md and skill.md) with new file paths for generated materials

**Git Tracking:**

- All 25 file moves tracked as renames with 100% similarity preserved
- Maintains full file history through git rename detection

**Benefits:**

- Improved discoverability - materials grouped by purpose (business strategy, pitches, outreach, etc.)
- Better organization for /opportunity skill which generates vendor-specific materials in appropriate subfolders
- Clearer separation between different types of sales enablement content

### Fixed - Carousel Array TypeError in Web Audit Suite (2026-01-17)

Fixed `TypeError: carousels.filter is not a function` crash during LLM metrics collection when analyzing pages with non-standard carousel implementations.

**Bug Details:**

- **Error:** Runtime TypeError when calling `.filter()` on carousels variable
- **Root Cause:** Code used `dynamicData.carousels || []` assuming it would ensure array type, but property could exist with non-array value (JavaScript's `||` operator doesn't validate types, only checks truthiness)
- **Impact:** Audit would crash mid-execution when encountering certain page structures

**Fix Implementation (llmCollector.js:865):**

- Changed: `const carousels = dynamicData.carousels || [];`
- To: `const carousels = Array.isArray(dynamicData.carousels) ? dynamicData.carousels : [];`
- Adds explicit type checking to guarantee array operations work correctly
- Prevents crashes while maintaining backward compatibility

### Added - npm Script and Documentation Updates (2026-01-17)

**npm script:**

- Added `audit:allabout` command for quick allabout.network audits with automatic cache clearing

**Documentation updates:**

- Updated word counts across all documentation files (CLAUDE.md, README.md, PROJECTSTATE.md, book-plan.md)
- Core manuscript: ~78,000 words (was showing ~57,000-62,000 previously)
- Web appendices: ~58,600 words (was showing ~44,600 previously)
- Total comprehensive content: ~140,000 words
- Updated chapter lists to reflect all 13 chapters with accurate word counts

**Sales enablement materials:**

- Added O'Reilly proposal package (5 new documents):
  - oreilly-proposal.md - Complete book proposal with market analysis
  - oreilly-toc.md - Detailed table of contents with chapter summaries
  - oreilly-sample-chapter.md - Full Chapter 2 as sample content
  - oreilly-author-bio.md - Comprehensive author biography and credentials
  - book-pricing.md - Pricing strategy and market positioning

**Submodule updates:**

- Updated manuscript submodule with talk materials and documentation corrections
- Added historical context slide to members call presentation
- Fixed word counts in manuscript repository documentation

### Added - Visual Dynamism Detection to Web Audit Suite (2026-01-17)

Added screenshot-based visual dynamism detection to complement library-based dynamic content detection, catching typewriter animations, rotating text, tickers, and other timing-dependent visual changes.

**Detection Implementation (caching.js):**

- Screenshot comparison logic added to capturePageData function (lines 755-772)
- Takes 3 screenshots at random 2-5 second intervals using Puppeteer page.screenshot
- Calculates MD5 hash of each screenshot buffer
- Compares hashes to detect unique visual states (Set size > 1 indicates dynamism)
- Returns visualDynamism object with detected boolean and uniqueStates count
- Works on homepage only (when url === baseUrl) to avoid false positives from lazy loading on deep pages

**Data Collection (llmCollector.js):**

- Added visualDynamism extraction in analyzeDynamicContent method (line 864)
- Metrics: visualDynamism.detected (boolean), visualDynamism.uniqueStates (count)
- Marked ESSENTIAL_RENDERED importance (browser-based agents only)

**Scoring and Feedback:**

- Added -5 point penalty for detected visual dynamism (scoringWeights.js line 81, llmScorer.js lines 214-217)
- Essential issue warning generated when detected (llmFeedback.js lines 310-321)
- Recommendations include exposing all text variations in served HTML, adding data-content-complete attribute, considering static alternatives

**Testing (dynamicContent.test.js):**

- Added 2 new tests for visual dynamism detection (lines 135-154, 446-474)
- Tests verify metrics collection, scoring penalties, and feedback generation
- Total 16 tests covering all dynamic content patterns

**Documentation Updates:**

- **Appendix C (appendix-c-web-audit-suite-guide.md)**: Added Visual Dynamism Detection section (lines 750-835) with:
  - New metrics: visualDynamismDetected, visualDynamismUniqueStates
  - Real-world example: Arbory Digital homepage with typewriter animation cycling through "AEM UPGRADE SPECIALISTS" → "AEM EXPERTS" → "SECURITY"
  - Troubleshooting guidance for typewriter animations, ticker-tape text, rotating hero content
  - Complete fix recommendations with static alternatives and data attributes
- **Sales Materials**: Updated business-opportunities.md, EXECUTIVE_PITCH_DECK.md with visual dynamism detection feature
- **ROI Case Studies (ROI_CASE_STUDIES.md)**: Added Case Study 4: Professional Services Firm demonstrating visual dynamism detection on Arbory Digital site

**Technical Implementation:**

Visual dynamism detection runs independently from library detection, merging results into single dynamicContent object. Random wait intervals (2-5 seconds) ensure typewriter animations complete between screenshots. MD5 hash comparison provides fast, reliable change detection without image analysis. Homepage-only restriction prevents false positives from progressive image loading on deep pages.

**Files Modified:**

Web Audit Suite (5 files):

- src/utils/caching.js (added screenshot comparison)
- src/collectors/llmCollector.js (added visualDynamism metrics)
- src/config/scoringWeights.js (added visualDynamismPenalty: -5)
- src/scorers/llmScorer.js (applied penalty logic)
- src/reporters/llmFeedback.js (added warnings and recommendations)

Testing and Documentation (5 files):

- test/utils/dynamicContent.test.js (added 2 visual dynamism tests)
- packages/manuscript/manuscript/appendix-c-web-audit-suite-guide.md (added Visual Dynamism Detection section)
- docs/sales-enablement/business-opportunities.md (updated Agent Readiness Score section)
- docs/sales-enablement/EXECUTIVE_PITCH_DECK.md (updated Week 1 audit and Month 1 fixes)
- docs/sales-enablement/ROI_CASE_STUDIES.md (added Case Study 4)

**Commits:** Manuscript submodule: 958d99a. Main repository: e3a5a23 (test golden output), 2ff64fc (implementation), b79d3b6 (sales materials), dfedf21 (lint fixes), 289e328 (README), 7c44094 (PROJECTSTATE).

### Added - Dynamic Content Patterns to Book and Web Audit Suite (2026-01-17)

Added comprehensive coverage of dynamic content patterns that confuse AI agents across both book manuscript and Web Audit Suite implementation.

**Book Manuscript Updates (packages/manuscript/manuscript/):**

Created detailed documentation of timing-dependent content patterns across multiple chapters and appendices:

- **Chapter 2**: Added "Dynamic Content Patterns" subsection (~1,100 words) covering three problematic patterns:
  - Carousels and Rotating Content (manual advance shows only first slide, auto-advance changes content mid-parse)
  - Animated Text and Progressive Reveals (ticker-tape, typewriter effects reveal content gradually)
  - Background Media and Decorative Motion (video, animated GIFs convey information agents cannot perceive)

- **Chapter 11**: Added "Static Alternatives for Dynamic Content" solution section (~1,300 words) with five pattern implementations:
  - Carousel Pattern: data attributes (data-total-slides, data-current-slide, data-slide-index) with static "View all" alternatives
  - Animated Text Pattern: full text in served HTML with animation as enhancement
  - Background Video and Media Patterns: data-video-role attribute distinguishing decorative from informational
  - Progressive Disclosure Pattern: server-side rendering with JavaScript enhancement
  - Animation Control: pause controls for WCAG 2.2.2 compliance (animations >5 seconds)

- **Chapter 12**: Added three new technical patterns (2a, 2b, 2c):
  - Pattern 2a: Carousel State Attributes with good/bad code examples
  - Pattern 2b: Animation Control Attributes (data-animation-state, data-animation-duration, data-animation-control)
  - Pattern 2c: Media Role Disambiguation (data-video-role="decorative" vs "informational")

- **Appendix D**: Added Part 13 "Dynamic Content Patterns" (~270 lines) to BOTH .txt and .md files (dual-file requirement) covering:
  - Carousel accessibility with informational vs decorative type distinction
  - Animated text implementation with served HTML visibility
  - Background media role attributes and transcripts
  - Autoplay stability with pause control requirements
  - Progressive disclosure with static fallbacks

- **Appendix E**: Enhanced quick reference with 8 new data attributes:
  - data-total-slides, data-current-slide, data-slide-index, data-autoplay (carousel state)
  - data-animation-state, data-animation-duration, data-animation-control (animation control)
  - data-video-role (media disambiguation)
  - Updated "Do Not" list: no auto-rotate carousels, no typewriter text without HTML, no informational video without descriptions, no autoplay without controls
  - Updated "Always" list: static carousel alternatives, complete text before animation, video role marking, transcripts for informational media, pause controls for animations

- **Appendix F**: Added priority-based implementation guidance:
  - Priority 1 (Critical Quick Wins): text alternatives for animated GIFs, mark background videos with data-video-role, add pause controls for autoplay media
  - Priority 2 (Essential Improvements): replace auto-rotating carousels with manual navigation, add "View all" options for carousel content, ensure animated text fully visible in served HTML

**Web Audit Suite Implementation (packages/web-audit-suite/):**

Implemented comprehensive detection, scoring, and reporting for dynamic content patterns following book's authoritative definitions:

- **Detection (caching.js)**: Added Puppeteer page.evaluate logic in browser context (lines 574-713):
  - Carousel detection with determineCarouselType helper function distinguishing informational (product, testimonial, review, portfolio, gallery classes) from decorative (hero, banner, masthead classes)
  - Data attribute validation (data-total-slides, data-current-slide, data-slide-index)
  - ARIA label validation (aria-label="Slide N of M")
  - Slide counting and static alternative detection
  - Animation library detection checking for Typed.js, TypeIt, GSAP, AOS, Animate.css presence via window objects and script tags
  - CSS animation detection via @keyframes rules in stylesheets
  - Autoplay media detection with controls validation (video[autoplay], audio[autoplay])
  - Animated GIF detection with alt text compliance (img[src$=".gif"])
  - Added dynamicContent object to pageData return value

- **Data Collection (llmCollector.js)**: Added analyzeDynamicContent method (lines 856-906):
  - Updated collect method signature to accept pageData parameter (line 26)
  - Carousel metrics: counts by type, attribute validation status, average slides, ARIA labels
  - Animation metrics: library presence flags, CSS animation detection, animated element counts
  - Autoplay media metrics: video/audio counts, controls presence, muted status
  - Animated GIF metrics: counts with alt text and aria-describedby validation
  - All metrics marked ESSENTIAL_RENDERED importance (browser-based agents only)

- **Data Flow Updates**: Modified llmMetrics.js and pageAnalyzer.js to pass pageData parameter through pipeline:
  - llmMetrics.js collectLLMMetrics accepts pageData (line 17)
  - llmMetrics.js updateLLMMetrics accepts and passes pageData (line 45)
  - pageAnalyzer.js runMetricsAnalysis accepts pageData (line 217)
  - pageAnalyzer.js analyzePageContent passes pageData to runMetricsAnalysis (line 163)

- **Scoring (llmScorer.js, scoringWeights.js)**: Added severity-based penalties in calculateRenderedScore (lines 167-213):
  - Informational carousels without attributes: -8 per carousel (high severity, hides critical content like product showcases)
  - Decorative carousels without attributes: -3 per carousel (medium severity, accessibility issue)
  - Autoplay media without controls: -8 per video (WCAG 2.2.2 violation, agent timing instability)
  - Animated GIFs without alt text: -3 per GIF (accessibility and agent comprehension issue)
  - Animation libraries detected: -2 informational warning (Typed.js, TypeIt, GSAP, AOS risk content invisibility)
  - Added DYNAMIC_CONTENT weight constants to scoringWeights.js (lines 75-81)

- **Reporting (llmReports.js)**: Added 9 new CSV columns to general LLM report (lines 72-80, 149-161):
  - carouselsTotal (count of all carousels detected)
  - carouselsInformational (product, testimonial, portfolio carousels)
  - carouselsDecorative (hero, banner, masthead carousels)
  - carouselsWithAttributes (proper data-slide-index implementation)
  - autoplayVideos (count of video[autoplay] elements)
  - autoplayWithControls (WCAG 2.2.2 compliant autoplay)
  - animatedGifs (count of .gif images)
  - gifsWithAltText (accessibility compliance)
  - hasAnimationLibraries (Yes/No for Typed.js, TypeIt, GSAP, AOS, Animate.css)

- **Feedback (llmFeedback.js)**: Added getDynamicContentFeedback method (lines 225-309):
  - Carousel warnings distinguish informational (high severity, content loss) from decorative (medium severity, accessibility)
  - Recommendations: add data-slide-index attributes, provide static "View all" alternatives, add aria-label attributes
  - Animation library warnings: Typed.js/TypeIt text invisibility risk, GSAP/AOS content revelation timing issues
  - Autoplay media warnings: WCAG 2.2.2 violation, agent page stability problems, add controls attribute
  - Animated GIF warnings: add alt attributes, use aria-describedby for longer descriptions
  - All feedback includes specific fixes, impact descriptions, and chapter references

**Documentation Updates:**

- **FEATURES.md**: Added "Dynamic Content Detection" subsection (lines 152-176) documenting carousel detection with type classification, animation library detection, autoplay WCAG compliance, and animated GIF alt text validation
- **CONFIGURATION.md**: Added dynamic content scoring penalties to LLM Scoring reference table (lines 513-517)
- **README.md**: Added dynamic content pattern detection to feature list (line 34)

**Technical Implementation:**

Data flow architecture: caching.js Puppeteer page.evaluate (browser context) → pageData object → llmMetrics.js → llmCollector.js analyzeDynamicContent → llmScorer.js calculateRenderedScore → llmReports.js CSV columns → llmFeedback.js recommendations. Carousel classification heuristic defaults to "informational" if class names ambiguous (safer assumption for penalization). All patterns align with book's authoritative definitions and terminology. Implementation passes ESLint validation with no errors.

**Files Modified:**

Book Manuscript (7 files, 796 insertions):

- chapter-02-the-invisible-failure.md
- chapter-11-designing-for-both.md
- chapter-12-technical-advice.md
- appendix-d-ai-friendly-html-guide.txt
- appendix-d-ai-friendly-html-guide.md
- appendix-e-ai-patterns-quick-reference.md
- appendix-f-implementation-roadmap.md

Web Audit Suite (11 files, 386 insertions):

- src/utils/caching.js
- src/collectors/llmCollector.js
- src/utils/llmMetrics.js
- src/utils/pageAnalyzer.js
- src/scorers/llmScorer.js
- src/config/scoringWeights.js
- src/utils/reportUtils/llmReports.js
- src/reporters/llmFeedback.js
- docs/FEATURES.md
- docs/CONFIGURATION.md
- README.md

**Commits:** Manuscript submodule: 8e99b64. Main repository: 5c12bff (book updates), 68a7f7c (Web Audit Suite implementation).

### Added - Professional Profile to Sales Enablement Materials (2026-01-17)

Created profile.md in docs/sales-enablement/ combining agent-ready infrastructure expertise with AEM/EDS strategic advisory positioning. Profile aligns with book's convergence principle (what AI agents need is mostly what everyone needs) while maintaining strategic advisor identity. Key elements: clarity infrastructure concept (explicit state, persistent feedback, complete information), agent-ready delivery architecture using Cloudflare edge network and Adobe EDS, strategic advisory services (plan reviews, architecture strategy, AI integration, team mentoring, audits), proven track record (Nissan-Renault 200+ sites, Ford, MediaMonks), industry authority signals (Boye & Company CMS Experts Group member, "The AEM Guy"). Profile positions work as universal design implementation serving both AI agents and humans through identical patterns, references January 2026 agent commerce launches (Amazon, Microsoft, Google) for business urgency context, and connects to Agent Ecosystem standardization efforts. Updated PROJECTSTATE.md to reflect new profile.md in sales enablement materials listing.

### Added - Article Integration: Multilingual Bias, AI Behavior, and RDF History (2026-01-17)

Integrated fresh material from three articles into manuscript (~2,800 words total, manuscript now 85,749 words): **Phase 1 - Multilingual Bias (CMS Summit 2025 article):** Added "The Double Extraction Problem for Non-English Content Creators" subsection to Chapter 5 (~800 words) documenting training data imbalance (44% English in Common Crawl, no other language exceeds 6%), Lars Trieloff and Angelika Gust observations on German language AI proficiency, systemic imbalances (English-centric RLHF, architectural bias in Common Crawl, cultural exclusion where models "think" in English, system-level constraints with English prompts and documentation), institutional contrast (UN 6 languages, EU 24 languages vs AI systems), and solution requirements (representative multilingual training datasets, evaluation frameworks accounting for linguistic diversity, inclusive governance, global human feedback systems). Enhanced Chapter 8 "Language Exclusion" section (~500 words) with concrete training data evidence, explanation of why bias exists and compounds, cross-reference to Chapter 5 double extraction problem. **Phase 2 - AI Behavior Framework (CMS Kickoff 2024 article):** Added eight-year-old analogy ("I WANT A TOY PLESIOSAURS") to Chapter 1 (~150 words) illustrating direct, goal-focused agent behavior that skips brand stories, promotional content, animations. Added AI-as-consumer framework to Chapter 4 (~550 words) with seven problems of AI-generated content (style guide enforcement, brand voice consistency, demographic bias avoidance, cultural nuance handling, training data limitations, incomplete responses, AI regulation navigation), Stack Overflow 28% workforce reduction example, traditional web analytics disruption. Added "AI Evangelist Role" subsection to Chapter 4 (~500 words) describing organizational coordination needs, responsibilities (champion AI adoption across departments, develop AI-centric content strategies, facilitate cross-team integration), skills required, strategic shift to designing for four device types (mobile, tablet, desktop, machine). **Phase 3 - RDF Historical Context (Janus Boye 1998 article):** Added "Historical Perspective: The 27-Year Pattern" subsection to Chapter 10 (~300 words) explaining RDF principles (explicit semantics, machine-readable relationships, standardised vocabularies) from 1998 directly underpin Schema.org structured data, JSON-LD as modern RDF implementation, theme that solution existed since 1998 but commercial pressure arrived with AI agents. Preface historical context section already corrected in previous session. **Additional updates:** geo-blog.md enhanced with eight-year-old analogy and multilingual dimension context (~230 words). Fixed duplicate heading in Chapter 4 (MD024 linting: renamed "Decision Framework" to "Protocol Integration Decision Framework" and "Priority Implementation Decision Framework"). All changes follow British English style, avoid superlatives, integrate naturally without narrative voice. Updated sales enablement documents (executive-summary.md, PITCH.md, book.md, business-plan.md, EXECUTIVE_PITCH_DECK.md, for-adobe.txt) with target audience messaging: book written for business leaders and managers (CEOs, product managers, marketing directors, technical managers like architects and lead developers), no programming knowledge required (code examples can be skipped), technical readers can read backwards (chapters 10-13 first for implementation patterns), convergence principle benefits both audiences. Updated platform launch information to reflect January 2026 launches (Amazon Alexa+, Microsoft Copilot Checkout, Google Universal Commerce Protocol). Added quick diagnostic for agent extraction (compare bounce rates for sessions under 10 seconds). Added first-mover citation advantage explanation (agents cite businesses they've successfully transacted with, successful interactions compound). Manuscript submodule commit: b748097. Main repository commits: 908674e (submodule pointer), a653bfe (sales docs and Web Audit Suite updates).

### Added - Web Audit Suite Schema Type Disambiguation and Inline CSS Detection (2026-01-17)

Added two new collectors to Web Audit Suite implementing Chapter 10 GEO patterns: Schema.org content type disambiguation and inline CSS detection. Schema Type Disambiguation collector validates that each JSON-LD block has exactly ONE @type value (multiple types create ambiguity for AI agents trained on entertainment scripts). Detects violations where blocks contain ["Article", "NewsArticle"] or similar multiple-type arrays. Scoring applies +5 bonus for proper disambiguation, -3 penalty per schema with multiple types. Inline CSS Detection collector identifies inline styles (style= attributes and `<style>` tags) that add noise for CLI agents (Claude Code, Cline) and server-based agents unable to execute JavaScript. Scoring applies +8 bonus for external-only stylesheets, ratio-based penalty (-10 × ratio) for inline styles prevalence. Both collectors integrated across complete three-phase pipeline: Phase 2 data collection (llmCollector.js analyzeSchemaTypeDisambiguation() and analyzeInlineCSS() methods), scoring configuration (scoringWeights.js SCHEMA_TYPE_DISAMBIGUATION and INLINE_CSS weights), score calculation (llmScorer.js calculateServedScore() applies weights), feedback generation (llmFeedback.js getSchemaDisambiguationFeedback() and getInlineCSSFeedback() methods with Chapter 10 references), and CSV reporting (llmReports.js general report adds 8 new columns: Schema Type Disambiguation, Total JSON-LD Schemas, Schemas With Multiple @types, Has Inline Styles, Elements With style= Attribute, `<style>` Tags, External Stylesheets, Inline CSS Ratio). All metrics stored in results.json with importance: ESSENTIAL_SERVED (works for all agents regardless of JavaScript execution capability). Implementation passes ESLint validation with no errors. Updated Appendix C (Web Audit Suite User Guide) with documentation for new columns in LLM General Suitability report, detailed explanations of scoring rules with code examples showing correct vs incorrect Schema.org type usage, inline CSS detection rationale, and two new sections in "Interpreting Specific Issues" covering multiple @type values and high inline CSS ratio with actionable fixes.

### Added - Content Type Disambiguation Guidance to Chapter 10 (2026-01-17)

Added new "Missing Content Type Disambiguation" section to Chapter 10 explaining how AI agents trained on entertainment scripts may confuse professional content with fictional dialogue. Section appears in "Common Implementation Mistakes" after "Incomplete Required Fields" (lines 596-693). Problem: AI systems trained on extensive scripted dialogue from films and TV episodes may treat legal arguments as fictional dialogue, academic papers as creative writing, or business analysis as entertainment scripts without explicit Schema.org type markup. Real examples include legal analysis confused with legal drama dialogue (Ally McBeal reference) and medical analysis misattributed to TV show scripts (Grey's Anatomy reference). Solution: Three complete JSON-LD examples demonstrating precise Schema.org types (legal content with Legislation type, medical/scientific content with MedicalScholarlyArticle type, business analysis with AnalysisNewsArticle type). Comprehensive list of 10 Schema.org types for disambiguation: Legislation, LegalDocument, ScholarlyArticle, MedicalScholarlyArticle, AnalysisNewsArticle, NewsArticle, TechArticle, Movie, TVSeries/TVEpisode, CreativeWork. Broader implication section explains AI training datasets include subtitles from DVDs, Blu-rays, and online streams uploaded to repositories like OpenSubtitles.org. Emphasizes using most specific type available (MedicalScholarlyArticle over Article, Legislation over CreativeWork). Fixed pre-existing markdown linting issues in Chapter 10: added language specification to code block (text), converted bold text emphasis to proper headings (#### level) for three "Issue:" subsections (Nested JSON-LD confusion, Currency symbol interpretation, Date format inconsistency). Manuscript submodule commits: 3e8b919 (content addition), d7f270b (linting fixes).

### Added - VAT Treatment and International Pricing Documentation (2026-01-17)

Updated comprehensive VAT treatment and international pricing documentation across manuscript with correct UK tax law implementation and multi-regional Schema.org patterns. Chapter 10: Added Regional Price Variations section (lines 833-992) demonstrating UK eBook pricing with 20% VAT included (£24.99 = £20.82 base + £4.17 VAT), UK printed book pricing zero-rated at 0% VAT (£34.99 with no VAT component per VAT Act 1994, Schedule 8, Group 3), USA pricing excluding sales tax (eBook $32.99, printed book $44.99), and complete multi-regional offer arrays using Schema.org eligibleRegion property. Enhanced Currency Handling section (lines 747-843) with multi-regional examples showing valueAddedTaxIncluded and eligibleRegion properties for proper international treatment. Appendix D: Replaced Honest Pricing Structure section (lines 1284-1365) with realistic pricing examples showing format-specific breakdowns using data-format, data-region, data-currency, and data-vat attributes for machine-readable pricing. Added complete VAT breakdown details element with separate eBook and paperback pricing structures. geo-blog.md: Updated pricing mismatch example (line 121) to use realistic eBook (£24.99) vs paperback (£34.99) pricing with emphasis on format clarity and eligibleRegion attributes for international treatment. book-product-page.html: Enhanced with international pricing section showing USA customers (eBook $32.99, paperback $44.99) and discovery precedes commerce principle documentation. Manuscript submodule commit: dc43402.

### Added - Convergence Principle and Assistive Technology Themes (2026-01-17)

Enhanced manuscript with comprehensive convergence principle and assistive technology themes across multiple documents. Updated preface.md with specific assistive technology examples (keyboard users, screen readers, voice control, cognitive disabilities) and JSON-LD metadata importance for agent citations. Added new Skip Links section to Chapter 10 (lines 470-530) explaining convergence principle with complete HTML/CSS implementation and assistive technology context. Enhanced Chapter 13 with convergence principle in introduction, new Skip Links Recognition subsection with implementation pattern, citation context for structured data, and accessibility connection in conclusion. Added semantic HTML parsing with skip link recognition to transparency manifest example. Updated talk-slides.js with new "Citation Problem" slide and convergence principle references across multiple slides. Enhanced talk.md with expanded assistive technology specifics, citation problem section with JSON-LD example, reordered patterns to emphasize skip links, and universal design patterns throughout. Updated sales materials (EXECUTIVE_PITCH_DECK.md, executive-summary.md, PITCH.md) with skip links in agent-ready architecture and convergence principle references. Manuscript submodule commit: 60740e0.

### Added - Chapter 10 GEO and Complete Chapter Renumbering (2026-01-16)

Created new Chapter 10 "Generative Engine Optimization" (~3,113 words) bridging gap between commercial urgency (Ch 9) and technical implementation (Ch 11-13). Explains GEO vs SEO distinction (citation vs ranking), three discovery layers (site-wide guidance with robots.txt + llms.txt, page-level metadata with JSON-LD, content structure with semantic HTML), business decision framework for when to emphasize discoverability vs limit exposure, and measuring GEO success metrics. Renamed chapters sequentially: chapter-10-designing-for-both.md → chapter-11-designing-for-both.md, chapter-11-technical-advice.md → chapter-12-technical-advice.md, chapter-12-what-agent-creators-must-build.md → chapter-13-what-agent-creators-must-build.md. Updated 50+ chapter references across 7 appendix files (A, D, G, I, J, K, L), 6 manuscript repository files (reading-guide.md, executive-summary.md, blog/agent-ecosystem-acceleration.md, blog/blog.md, code-examples/html-examples/README.md, code-examples/identity-delegation-README.md, web/site/README.md), 15 HTML files (12 regenerated appendices + 3 manually maintained: index.html, book.html, faq.html), plus chapter files themselves (chapter-05, chapter-09, new chapter-10, chapter-11, chapter-12, chapter-13). Updated metadata.yaml and metadata-kindle.yaml with Chapter 10 information. Updated all documentation (CLAUDE.md, README.md, PROJECTSTATE.md, book-plan.md, docs/sales-enablement/executive-summary.md) to reflect 13-chapter structure. Manuscript submodule commit: c35075c.

### Changed - Removed allaboutV2 Auto-Copy Feature (2026-01-16)

Removed automatic copying to allaboutV2 directory from scripts/generate-appendix-html.sh (lines 314-322 removed). The npm run pdf:appendix command no longer attempts to copy generated web files to `/Users/tomcranstoun/Documents/GitHub/allaboutV2/invisible-users` directory. Updated documentation in README.md, CLAUDE.md, and PROJECTSTATE.md to remove mentions of auto-copying behavior. Historical entries in PROJECTSTATE.md preserved for reference (dated 2026-01-13) but feature no longer active.

### Added - Web Audit Suite HTML Validation and Enhanced Meta Tag Scoring (2026-01-16)

Added HTML validation analysis to llmCollector.js checking for patterns that break AI agent parsing and accessibility (unencoded ampersands, redundant ARIA roles, ARIA misuse, non-semantic containers). Enhanced scoring for social media meta tags (+20 points to ESSENTIAL_SERVED: Open Graph +8, Twitter Card +5, completeness +7). Added SEO meta tag scoring (+5 points for robots, keywords, theme-color). Added reading time metadata scoring (+10 points: timeRequired +5, completeness +5 for timeRequired/educationalLevel/inLanguage). Total ESSENTIAL_SERVED category increased from 70 to 105 points maximum. Added htmlValidation object to llmCollector metrics output. Updated scoringWeights.js and llmScorer.js with new scoring calculations. Added permissions to .claude/settings.local.json for HTML validation testing scripts (test-html-validation.js, debug-cheerio.js, test-complex-case.js).

### Added - Back-Cover Generation Check and Profile Picture URL Documentation (2026-01-15)

Enhanced scripts/download-cover-images.js to check for back-cover.png after downloading cover images and display manual generation instructions if missing. back-cover.png must be generated by opening web/back-cover.html in browser and taking a full-page screenshot, saved to illustrations/. Added comprehensive "Illustration Generation Process" sections to CLAUDE.md (main repo and manuscript submodule), README.md (manuscript submodule), and ONBOARDING.md documenting the complete three-step workflow: download cover images → check back-cover.png → convert SVG to PNG. Updated all profile picture URL references to include .png extension (<https://allabout.network/media_126e99d56f06caf788bee715aff92281d2e31a206.png>). Added "Author Profile Resources" section to both CLAUDE.md files documenting profile picture location, format, and usage guidance for web pages and marketing materials. Updated back-cover.html with new profile picture URL. Manuscript submodule commit: 20aae80.

### Added - Cover Image Download Automation and todo.txt Documentation (2026-01-15)

Created scripts/download-cover-images.js to automatically download missing cover images (Profile.png, A4-Cover.png, Kindle-Cover.png) before SVG conversion. Script uses only Node.js built-in modules (fs, https, path) with no external dependencies, handles redirects and network errors gracefully, and safely skips existing files (idempotent operation). Enhanced illustrations:generate npm script to run download script first. Added comprehensive todo.txt usage guidelines to both CLAUDE.md files (main repo and manuscript submodule) explaining that todo.txt is user's personal task list and Claude must never execute tasks autonomously. Fixed all pre-existing markdown linting issues in manuscript CLAUDE.md (MD036, MD032). Submodule commit: 3dc05ff.

### Added - VS Code Workspace Configuration and Developer Onboarding (2026-01-15)

Created comprehensive VS Code workspace configuration for professional development environment. Added `.vscode/settings.json` with ESLint, Markdownlint, and Prettier integration plus auto-format on save. Added `.vscode/extensions.json` defining 24 recommended extensions (ESLint, Markdownlint, Prettier, Claude Code, GitLens, etc.) and marking 100+ unnecessary extensions as unwanted. Added `.vscode/tasks.json` with 15 quick-access tasks for book generation (PDF, Kindle, HTML appendices, illustrations), markdown linting, Web Audit Suite operations, and git workflow. Added `.vscode/launch.json` with 6 debug configurations for Web Audit Suite debugging (with example URL, custom URL input, test debugging). Added `.prettierrc` and `.prettierignore` for consistent code formatting (single quotes, 2-space tabs, 100-char line width). Added `.editorconfig` for cross-editor consistency. Created `ONBOARDING.md` (580 lines) as comprehensive developer onboarding guide covering 5-minute quickstart, repository structure, submodule workflows, common development tasks, VS Code integration, code quality standards, troubleshooting common issues, project principles, and next steps. Created `docs/vscode-extension-cleanup.md` identifying 100+ unnecessary extensions (Java, C#, PHP, Swift, Python, duplicate AI assistants) with performance optimization guidance. Updated README.md with Development Environment section explaining VS Code setup, quick task reference, debugging shortcuts, and extension management. Updated `.gitignore` to allow selective `.vscode/` configuration (commits recommended settings, ignores personal settings). Updated PROJECTSTATE.md documenting development environment setup.

### Changed - PDF Generation Uses Format-Specific Covers (2026-01-15)

Updated PDF generation metadata files to use appropriate cover images: A4 PDF (`npm run pdf:generate`) now uses A4-Cover.png (7.6MB), Kindle PDF (`npm run pdf:kindle`) now uses Kindle-Cover.png (231KB). Added eso-pic package and titlepage configuration to Kindle metadata for proper cover rendering. Submodule commit: 82195fd.

### Added - Commit and Push Command for All Repositories (2026-01-15)

Added `npm run commit-push` command with interactive script ([scripts/commit-and-push-all.sh](scripts/commit-and-push-all.sh)) to handle commits and pushes across both main repository and manuscript submodule. Script ensures proper workflow: commits and pushes submodule first, then updates submodule pointer in main repo. Interactive prompts for commit messages with "tidy" as default when Enter is pressed. Includes comprehensive documentation in CLAUDE.md with example usage.

### Added - Meta Tag Validation Scoring in Web Audit Suite (2026-01-15)

Web Audit Suite includes comprehensive meta tag validation and scoring in LLM suitability analysis. Social media meta tags (Open Graph, Twitter Card) contribute +20 points, SEO meta tags (robots, keywords, theme-color) contribute +5 points, and reading time metadata (timeRequired, educationalLevel, inLanguage) contributes +10 points to the ESSENTIAL_SERVED score. LLMCollector analyzes all meta tag types, scoring weights configure point allocation, LLMScorer calculates scores, and all three LLM reports (general, frontend, backend) include validation columns. Documentation covers Appendix A (Recipe 12 scoring breakdown), META-TAG-ENHANCEMENTS.md (section 11 with Web Audit Suite scoring details), IMPLEMENTATION-SUMMARY.md (scoring contribution summary), FEATURES.md (scoring categories), and README.md (feature list). ESSENTIAL_SERVED category: 105 points maximum.

### Added - Book Preview Page with Webinar Notice (2026-01-14)

Created new web/book.html as book teaser page featuring six chapter highlights with compelling excerpts, time-aware webinar announcement, Schema.org Book structured data, and AI-friendly meta tags. Updated navigation links in index.html, faq.html, and sitemap.xml. Page implements all Chapter 10 technical patterns with blue gradient design matching index.html and mobile responsiveness.

### Changed - Reviewer Notice on For Reviewers Page (2026-01-13)

Added "Review Copy Status" notice to for-reviewers.html informing reviewers that the PDF is frozen for review (except critical bugs). Directs them to news.html for industry updates and clarifies manuscript will be revised before publication.

### Changed - Git Workflow Guide for AI Agents (2026-01-13)

Created comprehensive GIT-README.md to help AI agents safely work with dual-repository structure (main repo + submodule). Addresses issues with agents corrupting git submodule pointers.

### Changed - Escaped HTML Tags in Code Examples (2026-01-13)

Fixed markdown code examples to prevent HTML rendering issues. Replaced literal `<details>` and `<summary>` tags with HTML entities in 6 files.

### Added - Automatic File Copying to Output Directory (2026-01-13)

Enhanced build scripts to automatically copy generated files to allaboutV2 output directory when it exists.

### Fixed - Code Review Issues (2026-01-13)

Fixed CI workflow paths, file count documentation, ESM/CommonJS conversion, regex bugs, and removed backwards compatibility code.

### Removed - Identity Delegation Project References (2026-01-13)

Removed all references to discontinued Identity Delegation Infrastructure Project.

### Changed - WCAG Accessibility Improvements (2026-01-13)

Fixed critical contrast violations in news.html - all UI elements now meet WCAG AA standards.

## Summary by Date

### January 15, 2026 (3 changes)

- PDF generation uses format-specific covers
- Commit and push command for all repositories
- Meta tag validation scoring in Web Audit Suite

### January 14, 2026 (1 change)

- Book preview page with webinar notice

### January 13, 2026 (7 changes)
- Reviewer notice on for-reviewers page
- Git workflow guide for AI agents
- HTML tag escaping
- Automatic file copying
- Code review fixes
- Identity Delegation removal
- WCAG accessibility improvements

### January 12, 2026 (19 changes)
Major repository restructure:
- Web files consolidation (for-reviewers, news, FAQ pages)
- Monorepo structure implementation
- Protocol landscape updates (ACP)
- HTML pattern audit tool
- Appendix L expansion
- CSS/meta tag standardization
- Platform vendor messaging

### January 11, 2026 (7 changes)
- `/news` skill with verification
- Perplexity Comet entry
- ACP additions
- Markdown linting
- Documentation updates

### January 10, 2026 (11 changes)
- Publication status corrections
- Git hooks enhancements
- New appendices (H: llms.txt, I: Darwin case study)
- Schema.org implementation
- FAQ improvements

### January 9, 2026 (8 changes)
- Chapter 9 "The Platform Race" (~5,700 words)
- Reading paths expansion
- Sitemap generation
- llms.txt additions

### January 8, 2026 (4 changes)
- Appendix automation
- HTML enhancement pipeline
- PDF improvements
- Chapter 11 refinements

### January 7, 2026 and earlier (2 changes)
- Chapter 10 restructure (~8,350 words)
- Initial repository setup

---

**For complete details, see [CHANGELOG-FULL.md](CHANGELOG-FULL.md) (108 KB, 1,890 lines)**
