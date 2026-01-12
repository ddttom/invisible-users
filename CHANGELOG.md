# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed - CSS and Meta Tag Standardization (2026-01-12)

**CSS Linting Improvements:**

- Removed empty CSS rulesets from `web/appendix.css` (`div.sourceCode`, `code span.ex`)
- Added vendor prefixes for broader browser compatibility:
  - `-webkit-hyphens` for Safari iOS < 17 support (body and code rules)
  - `-moz-text-size-adjust` for Firefox compatibility
  - Follows progressive enhancement with standard properties
- Resolved Microsoft Edge Tools CSS validation warnings
- No functional changes, purely cleanup and compatibility

**Meta Tag Naming Standardization:**

- Standardized meta tag name from `llms-section` to `llms-txt` throughout documentation
- Updated Appendix D (AI-Friendly HTML Guide) - all 404 page examples now use `llms-txt`
- Updated Appendix K (Common Page Patterns) - 404 page pattern with comprehensive server-side examples
- Added Express.js and Nginx configuration examples showing `X-llms-txt` header usage
- Consistent with Web Audit Suite implementation (`meta[name="llms-txt"]`)
- No breaking changes - purely documentation consistency

**Chapter Structure Updates:**

- Updated `web/index.html` to reflect current 12-chapter book structure (was showing 11)
- Updated appendix count from 10 to 11 appendices
- Added reference to new Chapter 9 (The Platform Race) in table of contents

### Added - Canonical Href Tags (2026-01-12)

**Canonical URL Implementation:**

- Enhanced `scripts/enhance-appendix-html.js` to automatically generate canonical tags
- Canonical tags now added to all generated appendix HTML files (appendix-a through appendix-k, appendix-index)
- Format: `https://allabout.network/invisible-users/[filename].html`

**Manuscript Web Pages (4 files):**

- Added canonical tags to web/index.html, web/appendix-index.html, web/faq.html, web/news.html
- Follows established SEO and AI agent compatibility patterns

**HTML Code Examples (16 files):**

- Added contextual canonical URLs to all examples in code-examples/html-examples/
- E-commerce examples: product-page.html, shopping-cart.html, order-confirmation.html, shipping-options.html
- Form examples: validation-form.html, multi-step-wizard.html, disabled-button.html
- Navigation examples: breadcrumbs.html, filters.html, search-results.html
- Component examples: data-tables.html, dialog-modal.html, pricing-display.html
- State examples: authentication.html, error-display.html, loading-state.html
- Uses `https://example.com/` with realistic contextual paths for teaching examples

**Agent-Friendly Starter Kit:**

- Added canonical tag to agent-friendly-starter-kit/good/index.html
- Demonstrates established pattern alongside AI-specific meta tags
- Bad example intentionally NOT updated (demonstrates anti-patterns)

**Standards Classification:**

- Canonical href tags are an **established standard** (not proposed pattern)
- Already detected and scored by Web Audit Suite
- Documented in AI-Native.blog as part of SEO/AI agent compatibility patterns

### Added - AI-Friendly Meta Tags and External CSS (2026-01-12)

**Meta Tag Enhancement:**

- Added `llms-txt` meta tag to all appendix HTML files to indicate llms.txt file availability
- Added `llms-txt` meta tag to manuscript/web/index.html (book main page)
- Added `llms-txt` meta tag to web/news.html
- Added complete AI-specific meta tags to agent-friendly-starter-kit/good/index.html example
- Meta tag follows proposed pattern from Chapter 10: `<meta name="llms-txt" content="/llms.txt">`

**CSS Externalization:**

- Created appendix.css (12KB, 553 lines) containing all Pandoc and enhancement styles
- Updated enhance-appendix-html.js to replace embedded styles with external CSS link
- Removed ~220 lines of embedded CSS from each appendix HTML file
- Maintained WCAG 2.1 AA contrast compliance throughout
- Preserved inline JavaScript for copy-to-clipboard functionality
- Improved page load performance through CSS caching across 12 appendix pages

**Web Directory Files:**

- Created web/llms.txt for root web directory discovery
- Created web/sitemap.xml for search engine discovery (4 URLs)
- Removed identity-layer.html references from all scripts (file deleted intentionally)

**Script Updates:**

- scripts/enhance-appendix-html.js: Added llms-txt meta tag, externalized CSS
- scripts/generate-appendix-html.sh: Removed identity-layer.html copying logic
- scripts/generate-sitemap.js: Removed identity-layer.html from sitemap

### Added - Platform Blog Integration and Business Decision Frameworks (2026-01-12)

**Manuscript Enhancement:**

Integrated business decision-making guidance from `docs/sales-enablement/platforms-blog.md` into manuscript chapters and appendices. Added approximately 2,800 words of practical merchant guidance addressing critical gaps in protocol integration decision-making.

Chapter 4: The Business Reality

- **New Section: "Making Protocol Integration Decisions"** (~1,100 words)
  - Decision framework for choosing ACP, UCP, both, or wait
  - Risk analysis: early adoption vs. wait-and-see
  - Protocol choice guidance by exposure level (critical/high/medium/low)
  - Small business simplified path (Shopify/Etsy automatic integration)
  - Enterprise integration considerations (protocol abstraction layers, dual-protocol support)
- **New Section: "The Invisible Failure Problem Drives Platform Urgency"** (~400 words)
  - Connection between invisible failures (Chapter 2) and January 2026 platform race
  - Explains why Amazon/Microsoft/Google launched simultaneously (merchant failures created platform opportunity)
  - Target/Walmart cooperation as signal of industry consensus
  - Links protocol integration necessity to underlying pattern fixes

Chapter 9: The Platform Race

- **Enhanced: "Microsoft's Isolation Problem" section** (~700 words added)
  - New subsection: "What Forces Microsoft's Hand?"
  - Four forces compelling Microsoft to abandon proprietary approach:
    1. Merchant adoption thresholds (trigger: <15% adoption by Q3 2026)
    2. Agent creator defection (trigger: no third-party adoption by Q2 2026)
    3. Enterprise vs. consumer dynamics (split market scenario)
    4. Internal cost of maintaining isolation
  - Timeline estimate with quarterly milestones (Q1-Q4 2026)
  - Face-saving "interoperability" framing prediction
- **New Section: "Integration Reality for Merchants"** (~800 words)
  - Technical implementation burden (single vs. dual protocol effort estimates)
  - Testing and QA multiplication factor (2.5x for dual protocols, not 2x)
  - Security surface expansion analysis
  - Migration strategies and protocol abstraction patterns
  - Developer experience and learning curves
  - Cost-benefit analysis by business size (enterprise/mid-size/small)

Appendix F: Implementation Roadmap

- **New Section: "Priority 1.5: Protocol Integration Strategy"** (~600 words)
  - Integration timeline by exposure level (Critical/High/Medium/Low)
  - Single vs. dual protocol decision framework
  - Small business simplified path (platform provider guidance)
  - Enterprise considerations (abstraction layers, agent testing, identity delegation)
  - Testing and validation requirements checklist
  - Platform-agnostic patterns before protocol-specific integration
  - When to evaluate professional audit services

Appendix J: Industry Developments

- **Enhanced ACP Section: "ACP/UCP Convergence Prospects"** (~500 words)
  - Current state analysis (ACP first mover vs. UCP Google-backed)
  - Best outcome: unified standard within 6 months
  - Convergence triggers (merchant pressure, regulatory intervention, market consolidation)
  - Convergence barriers (competitive positioning, revenue implications, governance control)
  - Timeline assessment (Q1-Q4 2026 milestones)
  - What happens if convergence fails (permanent fragmentation costs)
- **Enhanced Google UCP Section: "Why Competitors Are Cooperating"** (~700 words)
  - Analysis of Target/Walmart cooperation significance
  - Signal interpretation: "inevitable not possible" shift
  - Strategic calculation (compete independently vs. cooperate on standards)
  - Historical technology transitions comparison (credit cards, Internet protocols, mobile payments)
  - Implications for smaller merchants
  - Why retailers chose UCP over ACP (search leverage, governance, payment neutrality)
  - Timeline for convergence pressure

**Content Approach:**

- Maintained British English and professional tone throughout
- Removed promotional language (webinar references, LinkedIn follow requests)
- Added cross-references between related sections
- Preserved sequential reading structure (each addition builds on prior chapters)
- Excluded Amazon position speculation (maintaining "position unclear" approach)
- Focused on actionable business decision frameworks, not just platform announcements

**Word Count Impact:**

- Chapter 4: +1,500 words (Protocol Decision Framework + Invisible Failures connection)
- Chapter 9: +1,500 words (Microsoft Force Analysis + Integration Reality)
- Appendix F: +600 words (Protocol Integration Strategy)
- Appendix J: +1,200 words (Convergence prospects + Competitor cooperation analysis)
- Total addition: ~2,800 words

**Verification:**

- Cross-references validated (Chapter 4 → Chapter 9, Appendix F → both chapters)
- No duplication of existing seven-day launch narrative
- Business decision focus maintained throughout
- Markdown formatting follows project guidelines

### Added - Boye Webinar Event Page and Appendix K Expansion (2026-01-12)

**Event Page Update:**

- Updated [web/site/event.html](invisible-users/manuscript/web/site/event.html) with real Boye & Company webinar details
  - Event: "The Platform Race: How Three Tech Giants Launched Agent Commerce in Seven Days"
  - Date: Wednesday, 21 January 2026
  - Times: 14:00 GMT (15:00 CET, 09:00 EST)
  - Format: 20-minute presentation + Q&A
  - Registration: <https://www.boye-co.com/blog/2026/1/websites-work-until-dont>
  - Free registration with recording provided to attendees
- Complete content replacement from placeholder to production event
- Schema.org Event structured data with proper timezone handling
- Added platform race context section explaining Amazon/Google/Microsoft competition
- Professional tone without urgency messaging

**Appendix K Major Expansion:**

- Grew from 8 to 20 documented page patterns (+615 lines, +77% content increase)
- Added 7 new complete pattern sections with full HTML examples:
  - **Pattern #14: Event/Webinar Page** - Using real Boye webinar with Schema.org Event, VirtualLocation, timezone information
  - **Pattern #15: Login Page** - Authentication with autocomplete attributes, proper field naming (email, password)
  - **Pattern #16: Checkout Page** - E-commerce with explicit state management (data-state, data-cart-items)
  - **Pattern #17: Search Results Page** - Search functionality with result positioning (data-result-position)
  - **Pattern #18: Portfolio/Case Studies Page** - Professional work showcase with CollectionPage schema
  - **Pattern #19: Team Page** - Person profiles with ProfilePage schema and structured metadata
  - **Pattern #20: Testimonials Page** - Social proof with Review schema and rating attributes
- Each pattern includes:
  - Complete production-ready HTML code example
  - "AI-friendly patterns demonstrated" section
  - Schema.org structured data explanation
  - Data attribute usage guidance
- Updated introduction and conclusion from "eight common page types" to "twenty common page types"
- All patterns follow Chapter 10 technical guidance (semantic HTML, explicit state, structured data)

**Documentation Updates:**

- Updated PROJECTSTATE.md with comprehensive change documentation
- Updated CHANGELOG.md with this entry
- All markdown linting passes (0 errors)

**Result:** Appendix K now provides comprehensive coverage of all 21 HTML files in the web/site/ directory, serving as complete reference documentation for AI-friendly page patterns. Event page ready for production use with real webinar details.

**Commits:**

- Manuscript submodule: 3 commits (event.html update, Appendix K expansion, markdown cleanup)
- Main repository: 2 commits (submodule pointer updates, documentation)

### Added - Platform Race Chapter and Google UCP Integration (2026-01-12)

**Version:** 2.9.0 (up from 2.8.2)
**Word Count:** ~60,500 words (up from ~57,000)
**Chapter Count:** 12 chapters (up from 11)

**NEW Chapter 9: The Platform Race:**

- Created comprehensive new chapter (~5,200 words) documenting the January 2026 seven-day acceleration:
  - Amazon Alexa+ (January 5, 2026)
  - Microsoft Copilot Checkout expansion (January 8, 2026)
  - Google UCP + Business Agent (January 11, 2026)
- Eight sections covering competitive landscape, Microsoft isolation, fragmentation risk, ecosystem maturity
- Timeline compression analysis: 12 months → 6-9 months for meaningful adoption
- Two open protocols (ACP, UCP) vs one closed system (Microsoft Copilot Checkout)

**Chapter Renumbering (ALL files updated):**

- Previous Chapter 9 (Designing for Both) → Chapter 10
- Previous Chapter 10 (Technical Advice) → Chapter 11
- Previous Chapter 11 (What Agent Creators Must Build) → Chapter 12
- Updated 60+ files with cross-references across manuscript, appendices, blog, sales materials

**Google UCP Documentation:**

- **Appendix J:** Added comprehensive 12-section technical entry (~280 lines)
  - Complete announcement details (January 11, 2026)
  - 20+ retail partners (Target, Walmart, Macy's, Best Buy, The Home Depot)
  - Technical capabilities, business implications, architectural insights
  - Competitive analysis vs ACP and Microsoft
- **Blog:** Added narrative entry to book-updates.md emphasizing platform competition urgency
- **Glossary:** Added Agentic Commerce Protocol (ACP) and Universal Commerce Protocol (UCP) entries with Chapter 9 cross-references

**Chapter Content Updates:**

- **Chapter 10 (Designing for Both):** Added Commerce Protocol Fragmentation subsection
- **Chapter 11 (Technical Advice):** Added Platform Competition and Protocol Fragmentation with 4-step integration framework
- **Chapter 12 (What Agent Creators Must Build):** Replaced obsolete "What Comes Next" identity layer proposal with "Open Protocol Reality" documenting actual platform launches

**Sales Enablement Materials:**

- Created [platforms-blog.md](docs/sales-enablement/platforms-blog.md) - comprehensive LinkedIn blog post (268 lines)
  - Balanced analysis of all three platforms (including Microsoft's strategic rationale)
  - Technical deep-dive on Google UCP capabilities
  - "The Invisible Failure Problem" concept (silent agent failures)
  - Prominent Boye & Company members call promotion (January 21st, 2026)
  - Author positioning and book promotion with LinkedIn follow CTAs
  - Urgency messaging throughout (6-9 month timeline)

**Web Page Cleanup:**

- Deleted obsolete `web/identity-layer.html` (Universal Identity Delegation Infrastructure project page)
  - Superseded by real platform launches (ACP, UCP, Copilot Checkout)
  - Project proposal no longer relevant with production commerce protocols live

**Tone Corrections:**

- Fixed inappropriate "Timeline update: This chapter was written before..." messaging in Chapters 10, 11, 12
- Changed to "As of January 2026:" throughout (appropriate for pre-publication manuscript)
- Book remains in review status (due Q1 2026), not yet published

**Result:** The book now documents the dramatic January 2026 platform race as it happened, with comprehensive analysis of competitive dynamics, protocol fragmentation risks, and timeline compression. The new Chapter 9 bridges the problem chapters (1-8) with the solution chapters (10-12) by establishing urgency. All materials updated with consistent messaging emphasizing immediate need for agent-friendly patterns.

**Commits:**

- 3 commits in main repository (sales materials, PROJECTSTATE.md)
- 17 commits in manuscript submodule (NEW chapter, renumbering, content updates, tone corrections)

### Changed - Schema.org Person Entity Updates (2026-01-12)

**Person Schema Standardization:**

- **Added canonical author URL** to all Tom Cranstoun Person schemas:
  - Updated 14 HTML tutorial files with `"url": "https://allabout.network/tom-cranstoun.html"`
  - Establishes proper entity linking for AI agents and search engines
  - Files: author.html, about.html, index.html, consulting.html, pricing.html, sales.html, article.html, blog-post.html, collection.html, contact.html, event.html, privacy.html, product.html, team.html
- **Removed incorrect alumniOf property:**
  - Deleted `alumniOf` educational institution references from author.html and about.html
  - Updated about.html.md and team.html.md to remove university-specific examples
  - Maintains generic biographical information without specific institutional claims

**Appendix K Enhancement:**

- **Added example #12: Author/Profile Page**
  - 255 lines of production-ready HTML demonstrating ProfilePage schema
  - Complete Person entity with givenName, familyName, jobTitle, email, url
  - Educational credentials (hasCredential with EducationalOccupationalCredential)
  - Professional expertise (knowsAbout array with 7 areas)
  - Organization affiliation (worksFor with Digital Domain Technologies)
  - Social profiles (sameAs array with LinkedIn and GitHub)
  - Breadcrumb navigation for site structure
  - Data attributes for machine-readable expertise areas (data-expertise)
  - Follows external CSS/JS architecture pattern established in v2.8.1

**Result:** All Person schemas now consistently reference the author profile page, providing a single canonical URL for author identity across all pages. Appendix K now includes 12 complete page pattern examples (up from 11).

**Commits:**

- 66f95e7 "Update Person schemas and add author page to Appendix K" (manuscript submodule)
- da15188 "Update manuscript submodule pointer (Person schema updates)"
- db8bc98 "Fix markdown linting errors in SCHEMA-VALIDATION.md"

### Added - Appendix K (2026-01-11)

- Added Appendix K: Common Page Patterns (~14,200 words)
- Production-ready HTML templates for 8 common page types
- Updated all documentation to reference 11 appendices
- Updated npm scripts and generation templates
- Updated word counts and file counts throughout repository
- Updated navigation links in HTML generation script (A-K)
- Updated regex pattern in enhance-appendix-html.js to support Appendix K
- Total appendices word count increased from ~27,400 to ~41,600 words

### Changed - FAQ Page Integration into Generation Scripts (2026-01-10)

**FAQ Page Generation Integration:**

- **Updated `scripts/generate-sitemap.js`:**
  - Added FAQ page entry to sitemap generation
  - Priority: 0.9 (high priority, same as news and identity layer pages)
  - Change frequency: monthly
  - Description: "Frequently Asked Questions"
- **Updated `scripts/generate-appendix-html.sh`:**
  - Added FAQ entry to llms.txt template generation
  - Placed in Main Pages section between Project News and Identity Delegation Project
  - Ensures FAQ appears in generated llms.txt when running `npm run pdf:appendix`
- **Restored FAQ references:**
  - Re-added FAQ to `web/llms.txt` main pages section (was incorrectly removed)
  - Re-added FAQ to `web/sitemap.xml` with priority 0.9 (was incorrectly removed)

**Result:** The FAQ page is now properly integrated into both manual (web/ directory) and automated (generation scripts) workflows, ensuring consistent discovery by AI agents and search engines.

**Commits:**

- e1c2e19 "Restore FAQ page references to llms.txt and sitemap.xml" (submodule)
- 3eb2d5a "Update manuscript submodule (restore FAQ references)"
- 08c9130 "Add FAQ page to appendix generation scripts"

### Added - Pre-Tool-Use Hook for Repository Navigation (2026-01-10)

**Hook Enhancement for Wrong Repository Detection:**

- **Enhanced `.claude/hooks/pre-tool-use.sh`** to prevent recurring file path errors in submodule structure:
  - **Critical error detection:** BLOCKS operations attempting to access `.claude/*` paths from submodule directory (exit 1)
  - Shows clear error message with current directory, attempted path, and three fix options
  - **Reduced reminder threshold:** Changed from 5 to 3 tool uses before pwd reminder (more frequent location checks)
  - **Absolute state file path:** Uses `/Users/tomcranstoun/Documents/GitHub/invisible-users/.claude/.pwd-check-state` to work from any directory
- **Documentation updates:**
  - Added comprehensive entry to LEARNINGS.md documenting the recurring error pattern and solution
  - Key insight: Documentation alone is insufficient for preventing repeated mistakes in complex repository structures
  - Automated enforcement through hooks catches errors BEFORE they happen

**Problem Solved:** Despite clear documentation in CLAUDE.md and LEARNINGS.md, the `.claude/` path error was repeated multiple times during FAQ schema implementation. The hook now provides proactive enforcement rather than reactive documentation.

**Commits:**

- 63ff775 "Add pre-tool-use hook to detect wrong-repository file path mistakes"

### Added - FAQ Schema Detection and Appendix D Section (2026-01-10)

**Manuscript Updates:**

- **Appendix D additions:**
  - Added comprehensive FAQPage (Schema.org) section with JSON-LD examples
  - Explained why dual-format (JSON-LD + microdata) should be avoided
  - Documented required properties and implementation approach
  - Referenced book's FAQ page as real-world example
  - Cited 41% LLM citation rate improvement research (FAQPage vs no structured data)
- **FAQ page cleanup:**
  - Removed all microdata markup (itemscope, itemprop, itemtype attributes) from faq.html
  - Maintained JSON-LD FAQPage schema in head (single source of truth)
  - Preserved semantic HTML structure and styling
  - Demonstrates JSON-LD only best practice (2024-2025 guidance)

**Web Audit Suite Enhancements:**

- **FAQ Schema Detection (llmCollector.js):**
  - Detects FAQPage schema in JSON-LD structured data
  - Counts FAQ items and calculates completeness ratio (items with answers / total items)
  - Identifies dual-format duplication (JSON-LD + microdata)
  - Returns metrics: hasFAQPage, faqCount, completenessRatio, hasDuplicateMarkup
- **Scoring System (scoringWeights.js, llmScorer.js):**
  - Awards 8 points for FAQPage presence
  - Awards 0-5 points based on completeness ratio
  - Deducts 3 points for dual-format duplication (encourages best practices)
  - Net scoring range: -3 to +13 points
- **Feedback Generation (llmFeedback.js):**
  - Validates FAQ quality when FAQPage markup is present
  - Flags missing answers and empty FAQ structures
  - Warns about dual-format redundancy
  - References Appendix D for implementation guidance
- **Reporting (llmReports.js, executiveSummary.js):**
  - Added FAQ columns to all three CSV reports (general, frontend, backend)
  - Added FAQ section to executive summary with status, coverage, completeness metrics
  - Shows duplication warnings when dual-format markup detected

**Configuration:**

- Updated .gitignore to exclude external FAQ wrapper files (allabout-faq.html, allabout-faq-wrapped.html)

**Cross-Project Consistency:**

- Book (Appendix D) is authoritative source for FAQ schema best practices
- Web Audit Suite implements and enforces patterns described in book
- Tool penalizes dual-format approach that book recommends avoiding
- Feedback references Appendix D for implementation guidance

**Purpose:** Establishes comprehensive FAQ schema guidance in book and tooling to detect, score, and provide actionable feedback on FAQ implementation quality.

**Commits:**

- 7cd76de "Add FAQ Schema.org guidance and clean up faq.html" (submodule)
- 28e4c59 "Add FAQ schema detection and scoring to Web Audit Suite"
- 9b8c2fa "Fix ESLint operator-linebreak error in executiveSummary"

### Added - FAQ Page (2026-01-10)

**New FAQ page:**

- **Created faq.html** in `invisible-users/manuscript/web/`:
  - Schema.org FAQPage structured data with 10 common questions
  - Three sections: About the Book, Technical Concepts, Implementation and Resources
  - Questions cover book purpose, target audiences, AI agents, accessibility differences, implementation guidance, Web Audit Suite, identity delegation, code examples, and contact information
  - Follows all AI-friendly patterns from Appendix D (meta tags, semantic HTML, data attributes)
  - Floating navigation buttons (Home and Back to Top)
  - WCAG AA contrast compliance with dark grey text on light blue backgrounds
  - Explicit `!important` flags on button styles to ensure proper display
- **Integration:**
  - Added FAQ resource card to index.html main page
  - Added FAQ link to footer navigation on index.html
  - Updated sitemap.xml with FAQ entry (priority 0.9, monthly change frequency)
  - Updated llms.txt to include FAQ in main pages section
  - Updated PROJECTSTATE.md web pages list

**Purpose:** Provides comprehensive answers to common questions about the book, improving discoverability for both humans and AI agents.

### Added - Code Block Copy Buttons and Semantic Attributes (2026-01-10)

**Code Block Enhancements:**

- **Copy-to-clipboard functionality:**
  - Added copy button to top-right corner of all code blocks
  - Handles both syntax-highlighted (HTML, JavaScript) and plain text (robots.txt, llms.txt) blocks
  - Visual feedback: button turns green with checkmark for 2 seconds on successful copy
  - Extracts raw text content, removing syntax highlighting markup and line numbers
  - Fully accessible with aria-label and keyboard navigation
  - Uses modern `navigator.clipboard` API with graceful error handling
- **Visual styling:**
  - Black 2px border around all code blocks
  - Light grey (#f5f5f5) background for better readability
  - Rounded corners (4px border-radius) and proper padding (1rem)
  - Targets both `div.sourceCode` (wrapped blocks) and `pre.text` (standalone blocks)
  - High-specificity CSS selectors with !important to override Pandoc defaults
- **Semantic data attributes:**
  - Added `data-role="code-container"` to div.sourceCode wrappers
  - Added `data-role="code-block"` to pre elements
  - Added `data-role="code-content"` to code elements
  - Added `data-language` attribute with programming language
  - Clarifies ambiguous HTML structure where same class appears on multiple levels
  - Helps AI agents distinguish container from content
- **New documentation example:**
  - Added "Clarify Ambiguous Structure with Data Attributes" section to Appendix D
  - Demonstrates using data-role attributes to resolve duplicate class name ambiguity
  - Book's own appendices serve as working reference implementation
  - Shows pattern for making implicit structure explicit for AI agents

**Results:**

- All code blocks have consistent visual appearance with copy functionality
- Resolves duplicate `.sourceCode` class name ambiguity for AI agent parsing
- Self-referential documentation - appendices demonstrate the pattern they describe
- Enhanced user experience with one-click code copying

**Commits:**

- 2dcf56d "Add code block styling and copy-to-clipboard functionality to appendix HTML" (submodule)
- 632e360 "Add code block styling and copy-to-clipboard functionality to appendix HTML"
- fd610ff "Update documentation for code block copy button feature"

### Added - Appendix HTML Enhancements (2026-01-10)

**Sitemap Generation and Styling Improvements:**

- **Sitemap.xml generation:**
  - Created `scripts/generate-sitemap.js` to generate SEO-friendly sitemap
  - Integrated into `npm run pdf:appendix` command
  - Includes 12 URLs (index, llms.txt URL, 10 appendix pages)
  - Configured priorities (1.0 for index, 0.9-0.7 for appendices)
  - Set appropriate change frequencies (weekly for Appendices G and J, monthly/yearly for others)
  - Documentation updated in CLAUDE.md and README.md
- **Responsive margin styling:**
  - Enhanced `scripts/enhance-appendix-html.js` to inject custom CSS
  - Overrides Pandoc's default wide margins (36em, 50px padding)
  - Desktop: 900px max-width with 2rem padding
  - Mobile: 1rem padding for better mobile experience
  - Uses !important flags to ensure styles override Pandoc defaults
  - Matches styling in `web/news.html` and `web/identity-layer.html`
- **Comprehensive pricing JSON-LD example:**
  - Added to Appendix F (Implementation Roadmap)
  - Shows complete pricing breakdown: Product £99 + Delivery £15 + Service £5 = Total £119
  - Demonstrates Schema.org `priceSpecification` array
  - Includes `UnitPriceSpecification`, `DeliveryChargeSpecification`, `PaymentChargeSpecification`
  - Added `shippingDetails` with explicit rate and destination
  - Four key implementation points for AI agent transparency

**Results:**

- Appendix HTML generation now produces 13 files (was 12)
- All appendix pages have consistent, readable margins
- Complete pricing example demonstrates transparency patterns from Priority 1 guidance
- SEO-friendly sitemap for search engine discovery

**Commits:**

- c404ae3 "Fix markdown linting errors in CHANGELOG.md"
- cfed630 "Add sitemap.xml generation to appendix HTML pipeline"
- fd56abf "Update manuscript submodule to latest version"
- 6597238 "Fix appendix HTML margins to match web pages" (submodule)
- 969b2d2 "Add responsive margin CSS to appendix HTML enhancement"
- 6506cf2 "Add comprehensive pricing JSON-LD example to Appendix F" (submodule)
- 0f74a65 "Update manuscript submodule with pricing JSON-LD example"
- b936859 "Update project state with latest enhancements"

### Changed - Content Duplication Resolution (2026-01-10)

**Manuscript Structure Reorganization:**

- **New reading-guide.md file created:**
  - Extracted all navigation guidance from Preface into dedicated file
  - 148 lines of comprehensive reading paths for 5 audience types
  - Business Leaders, Product Managers/Designers, Developers, Agent System Developers, Small Business Owners
  - Includes "Other Navigation Aids" section with glossary and sequential reading guidance
- **Preface.md condensed:**
  - Reduced from 238 to 103 lines (135 lines removed)
  - Removed entire "How to Navigate This Book" section → moved to reading-guide.md
  - Condensed platform launch details (Claude for Chrome, Copilot Checkout) to single sentence
  - Replaced with brief reference: "For reading paths tailored to your role and time constraints, see the Reading Guide"
  - Kept: personal discovery story, "What This Book Is/Isn't", audience description, author bio, acknowledgements
- **Chapter 1 cross-references updated:**
  - Changed reference from "navigation guide in the Preface (page X)" to "see the Reading Guide"
  - Removed "14 paginated screens" specific detail from accessibility example
  - Added forward reference to Preface for discovery story
  - 221 lines (minimal change from 222)
- **Executive Summary verified clean:**
  - No duplication found (already clean from previous work)
  - No changes needed
- **Documentation updates:**
  - Added reading-guide.md to book-plan.md Front Matter table
  - Added reading-guide.md to repository structure diagram
  - All cross-references functional and tested

**Results:**

- All content preserved and relocated appropriately
- Clear purpose boundaries established between files
- Markdown linting passes for all modified files
- Total reduction: 135 lines removed through consolidation

**Commits:**

- 88197ad "Resolve content duplication across Preface, Executive Summary, and Chapter 1" (submodule)
- fa4809a "Update book-plan.md to include reading-guide.md"
- 4f12883 "Update manuscript submodule to latest version"

### Added - News Skill Ecosystem Signals and Documentation (2026-01-10)

**News Skill Enhancement and Documentation Quality:**

- **News skill scope expansion:**
  - Updated `/news` skill to understand book's broader scope includes ecosystem maturity signals
  - Enhanced `.claude/skills/news/relevance-checklist.md` with ecosystem signal examples throughout all 5 criteria
  - Added "Understanding the Book's Scope" section to `.claude/skills/news/skill.md`
  - Added Scenario 6 example: Stack Overflow decline as qualifying ecosystem maturity signal
  - Clarified two types of qualifying news: (1) Direct agent-website patterns, (2) Ecosystem maturity signals
  - Key insight: Developers experiencing AI-mediated workflows creates urgency for website owners
- **Manuscript updates:**
  - Added Stack Overflow 76% decline entry to blog and Appendix J (developers shifting to AI tools)
  - Blog entry: Narrative style focused on developers experiencing the shift they're designing for
  - Appendix J entry: Technical 12-section analysis validating Chapter 1 urgency, Chapter 8 capability gaps, 2-year timeline
  - Demonstrates adoption velocity creating indirect commercial pressure
- **Documentation quality improvements:**
  - Fixed CHANGELOG.md duplicate heading errors (MD024: "Added - 2026-01-10" appeared twice)
  - Changed to unique headings with context: "Publication Status and Documentation" and "Web Pages and HTML Enhancement Pipeline"
  - Added duplicate heading guidance to LEARNINGS.md (MD024 cannot be disabled, must fix by adding context)
  - Enhanced CLAUDE.md markdown linting section with MD024 guidance and concrete examples
  - Created `.claude/pwd-reminder.md` for working directory reference
  - Added `.claude/hooks/pre-tool-use.sh` for pwd checking reminders
  - Enhanced CLAUDE.md with prominent pwd checking warning box at top
  - Enhanced LEARNINGS.md with "CRITICAL AVOIDANCE TACTIC" section for pwd checking

**Commits:**

- 96691da "Update /news skill to include ecosystem maturity signals and fix duplicate headings"
- c7dab97 "Add Stack Overflow usage decline as ecosystem maturity signal" (submodule)
- 49c1801 "Update manuscript submodule (Stack Overflow ecosystem signal entry)"
- 2024192 "Fix markdown linting error in LEARNINGS.md (MD032)"

### Added - Publication Status and Documentation (2026-01-10)

**Publication Status and Documentation Improvements:**

- **Publication status clarification:**
  - Added explicit "Publication Status" sections to CLAUDE.md (main and manuscript)
  - Status: "IN REVIEW (Pre-Publication)"
  - Clearly states publication date as "Due Q1 2026"
  - Prevents AI assistants from assuming published status based on current date
  - User will explicitly confirm when published
- **Git directory navigation guidance:**
  - Added "Git Directory Navigation: Always Check pwd First" rule to LEARNINGS.md
  - Added "Common Mistakes to Avoid" section to README.md with git navigation guidance
  - Added "Git Directory Navigation" sections to CLAUDE.md (main and manuscript)
  - Documents the submodule navigation issue: always check `pwd` before attempting directory changes
  - Prevents "No such file or directory" errors when already inside submodule
- **News propagation strategy:**
  - Updated `/news` skill documentation with "Publication Status and Propagation Strategy"
  - Pre-publication: News updates propagate to manuscript files (blog/book-updates.md, appendix-j-industry-developments.md)
  - Post-publication: News updates propagate to online appendices only (via `npm run pdf:appendix`)
  - Ensures online appendices remain current without requiring book republication

**Commits:**

- fa9d5fb "Add publication status, propagation strategy, and git navigation guidance"
- ae3a4b8 "Fix markdown linting errors in CLAUDE.md"

### Added - Web Pages and HTML Enhancement Pipeline (2026-01-10)

**Web Pages and Appendix HTML Enhancement Pipeline:**

- **Project web pages created:**
  - `web/identity-layer.html` - Universal Identity Delegation Infrastructure project landing page with roadmap, technical details, collaboration opportunities
  - `web/news.html` - Project news and updates page with book announcement and identity delegation project roadmap
  - Both pages follow Chapter 10 technical patterns (British English, AI-specific meta tags, Schema.org JSON-LD, semantic HTML with ARIA roles)
  - Book website URL established: <https://allabout.network/invisible-users>
- **Appendix HTML enhancement pipeline:**
  - Created `scripts/enhance-appendix-html.js` (Node.js post-processor, ~140 lines) to add Chapter 10 patterns to Pandoc HTML
  - Updated `scripts/generate-appendix-html.sh` to call enhancement script after Pandoc conversion
  - Created `scripts/README-appendix-enhancements.md` documenting pipeline flow, usage, testing
  - Enhancement adds: AI-specific meta tags (ai-preferred-access, ai-content-policy, ai-freshness, ai-structured-data, ai-attribution), Schema.org JSON-LD (TechArticle, CollectionPage types), semantic HTML roles (role="main", role="navigation", role="contentinfo"), British English lang attributes (en-GB)
  - Pipeline is idempotent - can be run multiple times safely
  - Aligns with Chapter 10 technical patterns (lines 1186-1214 for AI meta tags, lines 541-564 for Schema.org)
- **Documentation updates:**
  - CLAUDE.md: Added web/ directory to repository structure, documented HTML appendix enhancement
  - README.md: Added "Project Web Pages" section with links and descriptions
  - PROJECTSTATE.md: Added web pages and HTML enhancement pipeline sections
- **Code examples updated:**
  - identity-delegation-worker.js and identity-delegation-README.md updated with correct book website URLs

**Commits:**

- 264af97 "Add Chapter 10 patterns to appendix HTML generation pipeline"
- b17c8c2 "Fix markdown linting issues in appendix enhancements README"
- d37ddb7 "Update documentation for web pages and appendix HTML enhancements"
- fff32bc "Update project state with web pages and appendix enhancement pipeline"

### Changed - 2026-01-10

**Book Restructured: Appendices Published Separately Online:**

- **Book structure change:** Book now ends with The-End.md directing readers to online appendices at <https://allabout.network/invisible-users/web/>
  - Core manuscript: ~57,000 words (preface + 11 chapters + The End + Glossary)
  - Web appendices: ~27,400 words (10 appendices: A-J) published separately online
  - Rationale: Fast-moving field requires appendices remain current; online publication allows updates without republishing book
- **HTML generation infrastructure added:**
  - Created `npm run pdf:appendix` command for generating HTML appendices
  - Added `scripts/generate-appendix-html.sh` bash script using Pandoc
  - Generates 12 files: index.html, llms.txt, and appendix-{a-j}.html
  - Each appendix page includes: navigation footer, TOC (2 levels), responsive design, semantic HTML
  - Added .gitignore entries for temporary template files (appendix-nav-footer.html, appendix-index-template.md)
- **PDF generation commands updated:**
  - All PDF commands (pdf:html, pdf:generate, pdf:kindle, pdf:simple) now exclude appendices
  - All commands now include The-End.md as final chapter
- **Manuscript updates (submodule commit 40a3c95):**
  - Added The-End.md: Final page with appendix descriptions, online URL, contact info, copyright
  - Added web/ directory with 12 generated HTML files
  - Updated chapter references: Chapters 4, 9, 10 now link to online Appendix J URLs
  - Updated blog files: blog.md, book-updates.md, agent-ecosystem-acceleration.md with online appendix references
- **Documentation updates:**
  - book-plan.md: Complete restructure showing web appendices section, updated word counts
  - CLAUDE.md: Added pdf:appendix command documentation
  - README.md: Added web appendices section with generation instructions
  - llms.txt: Added web appendices section with links to all 10 online pages
  - PROJECTSTATE.md: Updated to version 2.8.0 with new structure
- **Sales enablement updates:**
  - Updated word counts from "65,500-69,300" to "~57,000 core + 10 appendices online" across:
    - business-plan.md, PITCH.md (expanded to show all 10 appendices), executive-summary.md
    - plan-to-market.md, reviewer-email.md (all 4 email versions), new-blog.md
- **Consistency verification:** Ensured all references updated across book, tools, and documentation

**Commits:**

- Main repository: 659e1df "Restructure book to publish appendices separately online"
- Manuscript submodule: 40a3c95 "Add The-End.md and web appendices; update chapter references"
- Main repository: 4b2d154 "Update manuscript submodule to latest version with The-End.md and web appendices"
- Main repository: 24e499b "Fix markdown linting: wrap bare URLs in angle brackets"
- Main repository: 174b54d "Update PROJECTSTATE.md and remaining word count references"

### Changed - 2026-01-09 (Very Late Night)

**Platform Claims Qualified + /news Skill Documentation:**

- **Qualified Google/Apple platform claims as expectations:** Changed all references from stating as verified fact ("Google and Apple building their own walled gardens") to qualifying as expected ("Google and Apple expected to build their own walled gardens"). Distinguishes between:
  - **Verified platforms:** Microsoft Copilot Checkout, Amazon Alexa+ (documented launches with dates and features)
  - **Expected platforms:** Google, Apple (logical inference but not yet verified)
- **Console capability corrections:** Updated from definitive "agents don't read console" to accurate "you cannot assume agents can read console" whilst noting Claude for Chrome CAN read console output but many agents cannot
- **Sales materials updated:**
  - EXECUTIVE_PITCH_DECK.md: Qualified platform claims, added multi-platform testing requirement
  - executive-summary.md: Added proprietary lock-in context with verified/expected distinction
  - PITCH.md: Fixed bare URL markdown linting issue
- **Manuscript submodule updated** (bed5610): Applied same platform claim qualifications and console capability corrections across 9 files (appendix-j, blog files, chapters 2-4, 9-10, preface)
- **CLAUDE.md documentation:** Added comprehensive /news skill documentation with usage guide, examples, verification workflow, and relevance criteria
- **/.claude/skills/news/ added:** Complete skill implementation files (skill.md, verification-guidelines.md, relevance-checklist.md, templates/)
- **PROJECTSTATE.md updated:** Corrected Claude Code configuration location, documented three custom skills, updated latest additions

**Rationale:**

User correctly identified that stating "Google and Apple building their own walled gardens" was unverified speculation. Platforms verified as building proprietary systems: Microsoft (Copilot Checkout, January 2026), Amazon (Alexa+, January 2026), Anthropic (Claude for Chrome session inheritance, August-December 2025). Google and Apple have logical incentive to follow but no verified launches yet.

Console capability correction addresses that some agents (Claude for Chrome) CAN read browser console whilst many cannot, requiring conditional language rather than definitive statements.

**Commits:**

- Manuscript submodule: bed5610 "Qualify Google/Apple walled garden claims as expectations"
- Parent repository: 96e9de9 "Qualify Google/Apple claims and document /news skill"
- Parent repository: ab6e697 "Fix markdown linting issues"
- Parent repository: cafb74d "Update PROJECTSTATE.md with latest changes"

### Added - 2026-01-09 (Late Night)

**Identity Layer and Agent Limitations Content:**

- Added "The Missing Identity Layer" section to Chapter 11 (~1,200 words, lines 693-794)
  - Explains why universal identity delegation layer is missing from AI agent ecosystem
  - Documents platform strategy: first-mover advantage through proprietary identity systems
  - Practical architecture guidance: support proprietary systems today whilst preparing for eventual standards
  - Code examples: Universal identity layer interface and abstraction pattern for agent creators
  - OAuth 2.0 delegation extension as standard specification reference
- Added agent limitation content distributed across four chapters (~800 words total):
  - **Chapter 4:** "The Location Detection Challenge" section - VPN/proxy implications for geolocation, fraud detection, pricing strategies
  - **Chapter 6:** "The System Prompt Illusion" section - Why hidden guardrails are necessary but insufficient, validation layers needed
  - **Chapter 9:** Professional responsibility paragraph - Clear obligation for designers/developers/product owners/executives
  - **Chapter 11:** Hallucinations paragraph in conclusion - Inherent characteristic of probabilistic systems, validation layers catch errors
- Updated blog post (agent-ecosystem-acceleration.md):
  - Added "VPNs and Hidden Guardrails" section
  - Added system prompts paragraph explaining limitations
- Updated presentation slides (talks/members-call/talk-slides.js):
  - Added "VPNs and Hidden Guardrails" slide
  - Added "Our Responsibility" slide

**Context:**

Platforms are racing to establish proprietary identity delegation systems before standards emerge, creating first-mover advantages through platform lock-in. When Microsoft establishes Copilot as the identity layer for e-commerce, or Apple builds agent authorization into their ecosystem, users face switching costs to move between competing agents. Agent creators need abstraction layers that support proprietary systems today whilst preparing for eventual open standards.

System prompts and guardrails exist in all agents but work at reasoning level, not data extraction. The £203,000 cruise pricing error occurred despite whatever guardrails the agent operated under. Validation layers (range checking, comparative analysis, cross-referencing) must be implemented as code, not just natural language instructions.

Browser extensions and smart AI browsers inherit user network configuration (VPNs, corporate proxies), making IP-based location detection unreliable. This affects fraud detection, pricing strategies, content delivery, and compliance requirements.

**Commits:**

- Manuscript submodule: 1320186 "Add identity layer section to Chapter 11"
- Manuscript submodule: 5e660a6 "Add VPN, system prompts, hallucinations, and responsibility content"
- Parent repository: Updated submodule pointers (319a697, 1136fd5)

### Added - 2026-01-09 (Night)

**Appendix J: Industry Developments - Major AI Agent Launches:**

- Added Appendix J: Industry Developments (~3,800 words) tracking major AI agent developments
  - **Claude for Chrome (20 December 2024):** Browser extension for complete web automation, available to all paid Claude subscribers. Particularly significant because it was used in the book's case studies whilst being written. Demonstrates session inheritance problem, prompt injection risks, makes agent detection nearly impossible.
  - **Microsoft Copilot Checkout (January 2025):** Complete purchase transactions within AI assistant. Partner retailers: Urban Outfitters, Anthropologie, Etsy, Shopify. Microsoft reports improved conversion rates (unvalidated by independent research).
- Created blog post: "Two Weeks That Changed Everything" (~2,700 words)
  - Covers both launches as ecosystem tipping point
  - Browser automation + commerce integration = mainstream adoption
  - Practical action steps, security reality, timeline acceleration
- Updated manuscript chapters with real-world validation:
  - **Chapter 4:** Added "Real-World Validation: Microsoft Copilot Checkout" subsection (~300 words) after e-commerce section
  - **Chapter 9:** Added production validation paragraph referencing both launches (~150 words)
  - **Chapter 10:** Added real-world context introduction about both implementations (~100 words)
- Updated documentation:
  - Updated book-plan.md: Added Appendix J entry, updated word counts (~69,300 total)
  - Updated status: "Complete with Phase 1-2 Enhancements + Chapter 11 + Industry Developments"

**Context:**

These two launches within weeks validate the book's core thesis with production implementations. Claude for Chrome validates security concerns (session inheritance, prompt injection, agent detection challenges). Microsoft Copilot Checkout validates business model predictions (platform power shift, identity preservation). Together they demonstrate agent-mediated commerce and browser automation are happening now, not in the future.

**Metrics Removal (same day):** Removed all unvalidated Microsoft metrics (2x, 53%, 7x) from manuscript per CLAUDE.md guidelines. Replaced with "Microsoft reports improved conversion rates (though unvalidated)" and verifiable facts only. Even real company announcements feel like marketing hype without independent validation.

**Significance:** Claude for Chrome was used in the manuscript's case studies whilst the book was being written, making it especially relevant to the narrative. The tool demonstrates the exact patterns and challenges discussed throughout the manuscript because it encounters them in production, right now.

### Changed - 2026-01-09 (Late Evening)

**Manuscript Repository Organization:**

- Consolidated all manuscript-related content in manuscript submodule
  - Moved blog materials (blog.md, blog.svg, AI-Native.blog) from docs/ to manuscript/blog/
  - Moved presentation materials (talk.md, talk1.md, talk-slides.js) from docs/sales-enablement/ to manuscript/talks/members-call/
  - Code examples (agent-friendly-starter-kit/, code-examples/) already in manuscript from earlier consolidation
- Added Claude Code configuration to manuscript repository
  - Created .claude/ directory with hooks, commands, skills, and settings
  - Adapted hooks for submodule context (no package.json in manuscript)
  - pre-commit.sh lists staged markdown files
  - pre-push.sh warns about uncommitted changes and reminds to update parent submodule pointer
  - post-tool-use.sh reminds to update parent after git push
  - settings.local.json pre-approves git operations and file inspection commands
- Created comprehensive documentation in manuscript repository
  - README.md: Complete repository overview, structure, content summary, submodule workflow, key themes
  - CLAUDE.md: AI assistant guidance with file listings (word counts), writing style guidelines, terminology standards, .claude documentation
- Updated main repository documentation for manuscript organization
  - Updated llms.txt with explicit code-examples link
  - Updated CLAUDE.md repository structure to show blog/ and talks/ in submodule
  - Updated book-plan.md structure diagrams
  - Updated AI-Native.blog with 15 path references to manuscript/code-examples/
  - Updated PROJECTSTATE.md to reflect manuscript organization and moved files
- Benefits: All manuscript-related content now in single repository, clearer separation of manuscript vs. business materials

### Changed - 2026-01-09 (Evening)

**Repository Structure - Manuscript Submodule Integration:**

- Moved manuscript to separate repository and integrated as git submodule
  - Created new repository: <https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript>
  - Added as submodule at `invisible-users/manuscript/` path
  - Configured to track main branch for easy updates
  - All 50 manuscript files (chapters, appendices, illustrations, metadata) now managed independently
- Updated documentation for submodule workflow
  - Added "Working with the Manuscript Submodule" section to README.md
  - Added "Working with Submodules" section to CLAUDE.md
  - Updated repository structure diagrams to show submodule
  - Documented initialization: `git submodule update --init --recursive`
  - Documented updates: `git submodule update --remote invisible-users/manuscript`
- Updated CI/CD workflows to support submodules
  - Added `submodules: recursive` to checkout actions in ci.yml and quality-gate.yml
  - Excluded manuscript submodule from markdown linting (handled in manuscript repo)
  - Updated package.json lint scripts: `--ignore invisible-users/manuscript`
  - Made manuscript repository public for GitHub Actions access
  - Disabled quality-gate workflow on push events (now only runs on PRs and manual dispatch)
- Updated PROJECTSTATE.md with repository structure details
- All npm scripts continue to work unchanged (wordcount, pdf generation, status, illustrations)
- Benefits: Independent manuscript versioning, cleaner separation of concerns, standard git workflow

### Changed - 2026-01-09 (Afternoon)

**Manuscript Content Improvements:**

- Reduced content duplication across Preface, Chapter 1, and Executive Summary
  - Streamlined chapter descriptions in Preface to avoid repeating Chapter 1 content
  - Added cross-references directing readers to detailed content locations
  - Added "14-day tour" detail to tour operator story for consistency with Executive Summary
  - Added reference from Preface to Chapter 1's accessibility connection section
  - Added reference from Chapter 1 to Chapter 4 for business timing implications
- Improved document navigation with explicit pointers between related sections

**Web Audit Suite Code Quality:**

- Fixed ESLint errors across codebase (24 errors resolved, 0 remaining)
  - Fixed default-param-last errors by moving context parameter before optional parameters
  - Updated function signatures in 11 files: caching.js, networkUtils.js, pageAnalyzer.js, rateLimiter.js, sitemap.js, dashboardGenerator.js, executiveSummary.js
  - Updated all function call sites to match new parameter order
  - Removed unused variables: loggerOptions in main.js, duplicate performanceMetrics key in caching.js
  - Prefixed unused context parameters with underscore in metricsUpdater.js (9 functions)
  - Fixed undefined context reference in dashboardGenerator.js
- Updated test files to match refactored function signatures
  - Fixed parameter order in sitemap.test.js (3 test cases)
  - Added eslint-disable comments for Mocha test patterns (beforeEach, describe)
  - Marked intentionally unused test variables in pipeline.test.js
- All linting now passes: ESLint 0 errors, markdownlint 0 errors
- All tests passing: 22/22 tests

### Added - 2026-01-09

**A4 PDF Review Footer:**

- Added review copy footer to A4 PDF format (`pdf:generate`)
  - Footer text: "Review Copy not for publication/distribution" on every page
  - Centered footer in italic, small font
  - Page numbers on outer margins (left on even pages, right on odd pages)
  - Uses fancyhdr LaTeX package for custom page styling
  - Kindle PDF (`pdf:kindle`) remains without footer for production use

**Kindle PDF Generation:**

- Added `npm run pdf:kindle` command for Kindle Direct Publishing (KDP) paperback format
  - 6" × 9" (152.4 × 228.6 mm) trade paperback trim size
  - KDP-compliant margins: inner 0.625", outer 0.5", top/bottom 0.625"
  - Print-friendly styling: black links (not blue), chapters start on right pages
  - Simplified title page (no embedded cover - KDP requires separate cover file)
- Created `metadata-kindle.yaml` with KDP-specific LaTeX configuration
  - Removed eso-pic package (no full-page background image)
  - Updated code block arrow color to black for print compatibility
  - Uses openright class option for proper chapter pagination
- Updated documentation:
  - CLAUDE.md: Added pdf:kindle to Book Manuscript Commands section
  - README.md: Added pdf:kindle to PDF generation options with KDP cover creation instructions
  - .gitignore: Excluded the-invisible-users-kindle.pdf from version control

### Added - 2026-01-08 (Evening)

**Sales Enablement: 20-Minute Talk Materials:**

- Created comprehensive talk.md (11k) - Complete 20-minute presentation script
  - Opening hook: £203,000 cruise pricing error case study (from Appendix I)
  - Real production mistakes: toast notifications, hidden checkout state (from Appendix B)
  - Three implementation patterns with code samples (from Appendix A):
    - Pattern #1: Persistent error messages
    - Pattern #2: Complete pricing display
    - Pattern #3: Explicit state attributes
  - Priority-based action roadmap (Priority 1-3)
  - Discussion prompts for audience engagement
  - Speaker notes for timing and adaptation
  - Tailored for business leaders (CTOs, product owners)
  - Follows marketing guidelines (no specific monetary/time claims)
  - British English throughout
- Created talk-slides.js - Google Apps Script to generate presentation
  - 19 slides optimized for 20-minute delivery (~63 seconds per slide)
  - Removed "Breaking the Baseline", discussion interstitials, and priority framework slides per user feedback
  - Integrated business value directly into pattern slides (no separate slides)
  - Code examples with clear ROI implications
  - Sections: Opening Hook (2 slides), Problem (3 slides), Why (2 slides), Solution (6 slides), Action (3 slides), Closing (2 slides)
  - Run createInvisibleUsersDeck() in Google Apps Script to generate full deck
- Added talk1.md - Original outline for reference (1.9k)
- Updated PROJECTSTATE.md to document new sales enablement materials

### Changed - 2026-01-08 (Morning)

**PDF Generation Improvements and Appendix H Refinement:**

- Refined appendix-h-live-llms.txt from 91 links to 20 curated links (78% reduction)
  - Kept only the most representative resources from each category
  - Reduced Developer Documentation from 13 to 4 key links
  - Consolidated EDS & Integrations from 20 to 4 links
  - Reduced Core AI/LLM Topics from 18 to 5 key articles
  - Reduced AI Development Tools & Practices from 20 to 3 links
  - Reduced AEM/CMS Resources from 6 to 2 links
  - Reduced Content Author Resources from 3 to 2 links
  - Updated version to 2.0 (January 2026)
  - Restored full "For Human Visitors" section with all 5 contact links
  - Retained essential metadata (Site Type, Purpose, Technology Stack)
- Created appendix-h-live-llms.md wrapper file to display llms.txt as code example in PDF
  - Provides introduction text explaining the example
  - Wraps .txt content in markdown code block for proper formatting
  - Allows PDF to show "here's what an llms.txt file looks like" as formatted example
- Created metadata.yaml for PDF generation configuration
  - Added cover image (cover-design.png) as first page using eso-pic package
  - Configured title page with title, subtitle, author, date
  - Added listings package for code block line wrapping
  - Configured line breaking with red arrow indicators for long lines
- Fixed PNG illustration format for XeLaTeX compatibility
  - Updated illustrations:generate script in package.json
  - Added ImageMagick parameters: -alpha remove -alpha off -depth 8
  - Converts PNG from 16-bit RGBA to 8-bit RGB format
  - Resolves XeLaTeX rendering issues with 16-bit PNG files
- Suppressed Glossary from table of contents
  - Added {.unnumbered .unlisted} pandoc attributes to Glossary heading
  - Added \addtocontents{toc}{\protect\setcounter{tocdepth}{0}} to suppress subsections
  - Keeps Glossary in PDF but excludes from TOC completely
- Updated package.json PDF generation commands
  - pdf:generate now uses metadata.yaml for title page and cover configuration
  - Excludes appendix-*.txt files (uses appendix-*.md instead)
  - Added --listings flag for enhanced code formatting
- Documented Appendix H dual-file structure
  - Updated README.md with explanation of .txt (source) and .md (wrapper) files
  - Updated CLAUDE.md with detailed explanation of why both files are needed
  - Clarified that .txt is source of truth, .md is PDF presentation wrapper

### Changed - 2026-01-07 (Late Evening)

**Time-Based Estimates Removed Across Documentation:**

- Systematically removed all time-based implementation estimates (hours, days, weeks, months) from documentation across 9 files
- Replaced specific time estimates with qualitative descriptions to avoid misleading claims (implementation time varies by site size and complexity)
- Book manuscript updates:
  - executive-summary.md: Removed time estimates from Priority headers (1-2 hours, days to weeks, months) and reading path guidance (3-4 hours → "Focused reading", etc.)
  - preface.md: Updated all reading path time estimates to qualitative descriptions (Expected time: 3-4 hours → Reading approach: Focused reading)
  - chapter-09-designing-for-both.md: Changed narrative time references (A few hours → Minimal, A developer-week or two → Moderate development work)
  - chapter-11-what-agent-creators-must-build.md: Replaced implementation time examples with scope descriptions (2-3 days → Quick prototype, 1-2 weeks → Core feature)
- Marketing materials updates:
  - docs/blog.md: Removed time claims about research savings and implementation effort
  - docs/sales-enablement/ROI_CASE_STUDIES.md: Changed "2 developer days" to "minimal development effort", "within 2 weeks" to "quickly after implementation"
  - docs/sales-enablement/reviews.md: Removed time duration claims (6 months, weeks, months)
  - docs/sales-enablement/reviewer-email.md: Replaced specific review time estimates with flexible language (2-3 hours → focused reading, 7-10 days → reasonable period)
- Tool documentation updates:
  - web-audit-suite/BLOG.md: Changed implementation time estimates to effort levels (1-2 hours → Minimal effort, 1-2 days → Moderate work, 1-2 weeks → Significant refactoring)
  - Removed "48 hours" delivery promise from contact section
- Rationale: Per CLAUDE.md guidelines, time estimates are misleading because implementation varies by site size, organizational context, and complexity
- Total: 36 time-based references removed/replaced across core documentation, marketing, and tool docs
- Business planning updates (additional 3 files):
  - docs/sales-enablement/executive-summary.md: Partnership timelines converted to phase-based language (Early profitability target → Early/Growth/Maturity phases), Success Metrics restructured, removed response time commitments (within 24 hours, within 30 days)
  - docs/sales-enablement/plan-to-market.md: Changed "within 3 weeks" delivery to comprehensive delivery, "< 1 hour implementation" to minimal effort (preserved operational sales cadences for process timing)
  - docs/sales-enablement/business-plan.md: Changed "2-3 week turnaround" to comprehensive timeframe for audit delivery
- **Final total: 47 time-based references removed/replaced across 12 files**
- All markdown linting passes

### Added - 2026-01-07 (Evening)

**Executive Summary Decision Tree Illustration:**

- Created professional SVG flowchart for agent compatibility assessment decision tree
- Visual diagram shows five-question decision path with YES/NO arrows
- Color-coded priority outcomes: LOW (green), MEDIUM (yellow), HIGH (red), CRITICAL (deep red)
- Replaced text-based decision tree in executive-summary.md with illustration reference
- Added usage instructions explaining how to follow the decision path
- Follows book illustration style guidelines (900x600 viewbox, white background, clear visual hierarchy)
- Updated illustration count from 11 to 13 (11 chapters + cover design + decision tree)
- Updated PITCH.md and PROJECTSTATE.md with accurate illustration inventory

### Changed - 2026-01-07 (Late PM)

**Marketing Materials Policy Documentation:**

- CLAUDE.md: Added "Marketing Materials Guidelines" section documenting policy against fixed costs, concrete percentages, and time commitments in marketing materials
- Rationale: Field too new for validated ROI data; every site is different
- Guidelines include what to avoid (£500, 67%, "2-3 weeks") and what to use instead (qualitative language, phase-based progression)
- All marketing materials previously updated to comply with this policy
- appendix-live-llms.txt: Enhanced with access guidelines, rate limits, attribution requirements, and author metadata

### Added - 2026-01-07 (PM)

**Agent System Developers as Fourth Primary Audience:**

- Updated manuscript to explicitly include Agent System Developers as distinct fourth audience alongside Web Professionals, Business Leaders, and Partners/Investors
- Executive Summary: Added Agent System Developers to "Navigate This Book" section with recommended reading path (Chapter 11 core focus, Chapters 2-3 for failure modes, Chapter 10 for website patterns, 2-3 hours)
- Preface: Updated "Who This Book Is For" from three to four audiences
- Preface: Created comprehensive "Reading Path for Agent System Developers" section highlighting Chapter 11 and Appendix I (£203k case study) as essential resources
- Blog: Updated audience section and chapter list to reflect 11 chapters and four audiences
- PITCH.md: Updated target audience from three to four segments
- reviews.md: Added comprehensive Agent System Developers persona review with technical reactions and suggested improvements
- README.md: Updated repository audience description to include Agent System Developers
- PROJECTSTATE.md: Updated to reflect v2.6.0, 11 chapters, 9 appendices, and four target audiences
- Focus: Chapter 11's validation frameworks, confidence scoring patterns, and guardrails are specifically designed for developers building AI agents and browser extensions

### Added - 2026-01-07 (AM)

**Chapter 11: What Agent Creators Must Build (~5,000 words):**

- New chapter completing the solutions arc by addressing agent creator responsibilities
- Establishes "Pipeline Failures" as seventh failure category (distinct from website design failures and reasoning failures)
- Detailed case study: £203,000 cruise pricing error showing data extraction/parsing failure
- Five specific guardrails with JavaScript code examples:
  - Multi-source verification
  - Audit trails for debugging
  - Comparative context and outlier detection
  - Graceful degradation patterns
  - Human-in-the-loop options
- Confidence scoring framework (0-100%) with action-dependent thresholds
- Validation layers: range validation, comparative analysis, incomplete data detection, structured data cross-reference
- Incomplete data detection pattern: validates data completeness when gathering comparative information (e.g., pricing for only 1 of 3 operators should reduce confidence)
- Agent architecture considerations: browser extensions, CLI agents, server-based agents
- Priority-based validation roadmap (4 priority levels)
- Chapter 11 SVG illustration: "The Validation Pipeline" showing multi-gate validation checkpoint
- Cross-references added in Chapters 1, 2, 9, 10
- Updated preface navigation paths for all reader types
- Updated book-plan.md with Chapter 11 outline and word counts
- Core manuscript now ~57,000 words (was ~52,000)
- With appendices: ~65,500 words total (was ~58,000)

**Appendix I: Pipeline Failure Case Study (~2,500 words):**

- Moved ai-error-analysis.md into manuscript as formal appendix
- Complete analysis of £203,000 cruise pricing error (six-stage error chain)
- Source attribution: Claude for Chrome (early beta version) error from December 2024
- Anonymized operator names (Saga Cruises, Uniworld River Cruises, Viking River Cruises)
- Actual agent output showing incomplete data pattern (pricing for 1 of 3 operators)
- Four failure scenarios: decimal separator confusion, number concatenation, wrong field extraction, HTML/CSS parsing error
- Prevention strategies with JavaScript code examples for AI systems
- Technical root cause analysis of number parsing in LLMs
- Seven lessons learned about data pipeline failures vs reasoning failures
- Critical teaching point: Incomplete data itself is a warning sign (integrated into Chapter 11)
- Cross-referenced with Chapter 11 validation framework
- Original file preserved as ai-error-analysis.md.original

**Web Audit Suite Improvements:**

- **Golden Master Test:** Added `test/goldenMaster.test.js` to ensure regression protection across the full audit pipeline.
- **Dependency Injection:** Implemented `AuditContext` pattern to replace global state.

**New Appendix H:**

- **appendix-live-llms.txt:** Added comprehensive Digital Domain Technologies (DDT) reference document for LLM context delivery. Contains author bio, Adobe EDS consulting resources, AI integration topics, and contact information. Formatted with proper markdown spacing for optimal LLM parsing.
- Integrated as Appendix H in manuscript structure
- Updated documentation: book-plan.md, CLAUDE.md, PROJECTSTATE.md
- Total appendices now: 8 (A-H)

### Changed - 2026-01-07

**Web Audit Suite Refactoring:**

- **Removed Global State:** Eliminated `global.auditcore` in favor of passing explicit `context` objects.
- **Updated Core Utilities:** Refactored `caching.js`, `networkUtils.js`, `seoScoring.js`, `sitemapUtils.js`, and `results.js` to accept `context`.
- **Main Entry Point:** Updated `index.js`, `main.js`, and `bulk-audit.js` to initialize and propagate `AuditContext`.

### Changed - 2026-01-22 (January 2026 AI Landscape Updates)

**Updated manuscript for current AI agent landscape:**

- **Appendix G (Resource Directory):**
  - Updated AI platforms: ChatGPT (GPT-5/o-series, native SearchGPT), Claude (Computer Use emphasis, Chrome extension), Gemini (2.0/Ultra)
  - Updated emerging standards: llms.txt (de facto standard), DPoP (recommended practice for high-security delegations)
  - Updated WCAG 3.0 to Provisional status with score-based conformance model
  - Added Agent-Specific Testing section: Agent Protocol, LangSmith, LangFuse
  - Updated EU AI Act to final legislation status (implementation phase 2026)
  - Added JSON-LD 1.1 specification notes
  - Added Baseline to Can I Use section for cross-browser support tracking
  - Added caveat to Amazon example about bot-blocking and WAF protection
  - Removed redundant headings, fixed duplicate GitHub headings with contextual prefixes
  - Updated verification date to 2026-01-22
- **Executive Summary:**
  - Added browser extension context (Claude for Chrome, Microsoft Copilot)
  - Emphasized shift from fetching pages to working within user's browser with credentials and permissions
  - Described visual interface navigation across multiple tabs in user's context
- **Preface:**
  - Added paragraph describing browser extensions bringing agents into workflows
  - Explained scheduling, shortcuts, and context maintenance capabilities
  - Distinguished between remote page fetching and working alongside users
- **Removed amend.md** (no longer needed after consistency fixes)

### Fixed - 2026-01-07 (Manuscript Consistency)

**Resolved Internal Inconsistencies:**

- **Chapter 2:** Updated pattern count from five to six consolidated patterns
  - Changed heading to "The Six Types of Invisible Failure"
  - Updated figure caption to generic wording (no number until illustration regenerated)
  - Expanded summary table to include all 6 patterns:
    - Toast Notifications
    - Hidden Content (consolidated: pagination, tabs, below-the-fold)
    - Single-Page Applications
    - Delayed Validation (newly added to table)
    - Hidden Pricing
    - Loading States (newly added to table)
  - Updated Key Points section to reference six patterns
  - Added explanatory note about Hidden Content consolidation
- **Chapter 9:** Added comprehensive "The Structured Data Dilemma" section
  - Addresses contradiction between Schema.org benefits (Chapter 9) and extraction risks (Chapter 5)
  - Distinguishes transactional sites (beneficial) vs. content sites (risky)
  - Provides strategic decision framework for when to use Schema.org
  - Suggests mitigation strategies for content creators
  - 8 paragraphs, ~550 words
- **Appendix G:** Removed fictional Identity Layer version references
  - Removed "Identity Layer v2.0" from OAuth 2.0 entry
  - Removed "Identity Layer v2.5.1" from DPoP entry
  - Rewrote descriptions to reflect emerging/exploratory status
  - Now consistent with Chapter 4's "no standard exists yet" statement
- **Executive Summary:** Updated priority assessment to reference six patterns
- **amend.md:** Fixed markdown linting errors (duplicate headings, spacing)

### Changed - 2026-01-07 (Phase 2)

**Complete Manuscript Consolidation:**

- Moved reference materials into manuscript as appendices D-G
  - advice.md → appendix-ai-friendly-html-guide.md (Appendix D)
  - AI-design-rules.md → appendix-ai-patterns-quick-reference.md (Appendix E)
  - implementation-checklist.md → appendix-implementation-roadmap.md (Appendix F)
  - resource-links.md → appendix-resource-directory.md (Appendix G)
- Updated all documentation references (13 files):
  - CLAUDE.md, README.md, book-plan.md
  - Chapter 10, code examples, blog posts
  - agent-friendly-starter-kit documentation
- Fixed PDF build scripts:
  - Updated `--resource-path` from `invisible-users` to `invisible-users/manuscript`
  - Resolves illustration path errors (chapters now correctly find illustrations/ subdirectory)
- All manuscript content now in `invisible-users/manuscript/`:
  - Core chapters, preface, executive summary, glossary
  - Seven appendices (A-G)
  - Planning files (book-plan.md, book-svg-style.md) remain at root

### Changed - 2026-01-07 (Phase 1)

**Manuscript Reorganization:**

- Moved all core manuscript files into `invisible-users/manuscript/` subdirectory
  - Chapters 01-10
  - preface.md, executive-summary.md
  - Glossary.md
  - Appendices A-C (implementation-cookbook, battle-tested-lessons, web-audit-suite-guide)
  - All illustrations (SVG files)
- Planning materials remain in `invisible-users/` root:
  - book-plan.md, book-svg-style.md
  - agent-friendly-starter-kit/, code-examples/

**File Deletions:**

- Deleted `invisible-users/invisible-users.ipynb` (interactive notebook - no longer maintained)
- Deleted `invisible-users/glossary-simplified.md` (consolidated into main Glossary)

**Documentation Updates:**

- Updated all npm scripts in `package.json` to reference manuscript/ paths
- Updated repository structure diagrams in CLAUDE.md and README.md
- Updated llms.txt to remove interactive notebook references
- Updated book-plan.md to remove deleted file references
- Updated PROJECTSTATE.md with current structure

**Manuscript Improvements:**

- Enhanced navigation guide in preface.md with detailed reading paths for all audiences
- Streamlined navigation section in executive-summary.md
- Improved chapter flow in chapter-01-what-you-will-learn.md

### Changed - 2026-01-07 (Earlier)

- Renamed `invisible-users/for-ai.md` to `invisible-users/AI-design-rules.md` for clearer naming
- Updated all 12 files with references to the new filename:
  - CLAUDE.md (3 references in structure diagrams and documentation)
  - README.md (1 reference in repository structure)
  - llms.txt (1 reference in core guides section)
  - invisible-users/book-plan.md (3 references in materials table, changelog, and structure)
  - invisible-users/chapter-10-technical-advice.md (2 references in Further Resources section)
  - invisible-users/llms.txt (1 reference in blog post)
  - docs/blog.md (1 reference in practical guidance section)
  - web-audit-suite/README.md (1 reference in project structure)
  - invisible-users/agent-friendly-starter-kit/README.md (1 reference)
  - invisible-users/agent-friendly-starter-kit/DIFF_GUIDE.md (1 reference)
  - invisible-users/code-examples/html-examples/README.md (1 reference)
- Preserved generic folder pattern examples (`docs/for-ai/`) in advice.md as conceptual examples
