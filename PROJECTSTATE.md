# Project State

**Last Updated:** 2025-12-30

## Current Status: Complete ✅

The manuscript for "The Invisible Users: Designing the Web for AI Agents and Everyone Else" is complete and ready for publication. An interactive companion notebook is also available.

## Manuscript Statistics

- **Core Manuscript:** ~50,000 words (preface + 10 chapters)
- **Chapters:** 10 of 10 complete
- **Illustrations:** 10 of 10 complete
- **Target Range:** 30,000-50,000 words ✅

## Chapter Status

All chapters complete with business-focused updates:

| Chapter | Title | Words | Status | Updates |
| ------- | ----- | ----- | ------ | ------- |
| Preface | Author's Journey | ~1,700 | ✅ | Honest framing, reading paths |
| 1 | What You Will Learn | ~3,200 | ✅ | Agent diversity section added |
| 2 | The Invisible Failure | ~4,500 | ✅ | Key Points box, agent types note |
| 3 | The Architectural Conflict | ~4,150 | ✅ | Key Points box, architecture caveat |
| 4 | The Business Reality | ~6,200 | ✅ | Agent Exposure Assessment, Key Points |
| 5 | The Content Creator's Dilemma | ~5,600 | ✅ | Vulnerability Assessment, honest framing |
| 6 | The Security Maze | ~4,000 | ✅ | Agent types mapped to security problems |
| 7 | The Legal Landscape | ~4,400 | ✅ | Risk Categorization Framework |
| 8 | The Human Cost | ~3,650 | ✅ | Key Points box added |
| 9 | Designing for Both | ~4,400 | ✅ | Effort estimates, universal patterns note |
| 10 | Technical Advice | ~8,350 | ✅ | Effort estimates, architecture diversity note |

## Supporting Materials (December 2025 Updates)

- ✅ **executive-summary.md** - 2-page business briefing with decision tree (~1,100 words)
- ✅ **glossary-simplified.md** - 27 essential terms for business leaders (~900 words)
- ✅ **Key Points for Business Leaders** boxes in 6 chapters
- ✅ Qualitative effort estimates for all four priority levels
- ✅ Three major decision frameworks (Exposure, Vulnerability, Risk)

## Key Concepts Implemented

### Identity Delegation

- **Status:** Mentioned briefly as one emerging solution pattern
- **Coverage:** Chapters 4, 6, 9, and 10
- **Approach:** Multiple approaches acknowledged (retailer-specific tokens, centralised repositories, blockchain attestations, browser-native delegation)
- **Treatment:** Low-level practical mention without prescribing specific implementation
- **Note:** Detailed technical specification moved to separate identity-layer repository

### Session Inheritance Problem

- **Status:** Thoroughly covered in Chapter 6
- **Description:** In-browser agents inheriting authenticated sessions
- **Impact:** Critical security insight with no clear liability framework

## Technical Infrastructure

### Documentation

- ✅ README.md - Project overview
- ✅ CLAUDE.md - AI assistant guidance
- ✅ book-plan.md - Master plan with outlines
- ✅ book-svg-style.md - SVG illustration specifications
- ✅ CHANGELOG.md - Version history
- ✅ LEARNINGS.md - Actionable guidance for AI assistants (streamlined)
- ✅ PROJECTSTATE.md - This file
- ✅ advice.md - Standalone prescriptive guide for building AI-friendly HTML (referenced in Chapter 10)
- ✅ for-ai.md - Concise HTML patterns reference for AI assistants (referenced in Chapter 10)

### Development Tools

- ✅ Markdown linting (markdownlint)
- ✅ Link validation configuration
- ✅ Git pre-commit hooks
- ✅ npm scripts for validation and word counting
- ✅ Claude Code skills (step-commit, md-fix)

### Quality Standards

- ✅ British English throughout
- ✅ First-person narrative voice
- ✅ No colons in chapter titles
- ✅ All markdown files pass linting
- ✅ Consistent SVG illustration style (white backgrounds)
- ✅ Git commits without attribution

## Business Infrastructure

### Web Presence

✅ **Marketing Website** (`/web/`)

- Landing page with Schema.org structured data
- Free chapter lead generation page with synchronous validation
- Professional services page
- Blog announcement post (HTML)
- Agent-friendly patterns throughout (llms.txt, explicit state, persistent errors)
- Responsive design with mobile-first approach

✅ **Backend API** (`/backend/`)

- Node.js/Express server with agent-friendly error responses
- Email subscription endpoint (ConvertKit/Mailchimp integration)
- Contact form processing
- Stripe payment integration
- Rate limiting with Retry-After headers
- Comprehensive llms_guidance in error responses

### Business Documentation

✅ **business-plan.md** (~18,000 words)

- 7 revenue streams with financial projections
- Market analysis (£6.3T opportunity)
- Year 1 projections: £939k-£3.3M
- Complete go-to-market strategy

✅ **executive-summary.md** (~2,900 words)

- Condensed partnership pitch (8 pages)
- One-sentence opportunity statement
- Revenue model overview
- 4 partnership models
- Investment ask options

✅ **pitch.md** (~19,000 words)

- Comprehensive partnership deck (30+ pages)
- Market opportunity and timing analysis
- What's been built (complete foundation)
- Partnership opportunities (4 models)
- Financial projections
- Risk mitigation strategies

✅ **plan-to-market.md** (~8,500 words)

- Complete launch timeline (pre-launch through post-launch)
- Target audience segmentation
- Channel strategy (owned, earned, paid)
- 10 production-ready email templates
- Content calendar (Month 1-4+)
- Partnership outreach strategy
- Metrics and KPIs

## Supporting Materials

All supporting materials are complete ✅:

### Interactive Materials

1. ✅ **invisible-users.ipynb** - Interactive Jupyter notebook with visual demonstrations, data tables, and calculations
   - Hosted at: [allabout.network/invisible-users.html](https://allabout.network/invisible-users.html)
   - Time to complete: 60-75 minutes
   - Features: Chapter index, visual comparisons, cost impact tables, priority roadmaps

### Front Matter

1. ✅ **preface.md** - Book introduction, author bio, usage guide, acknowledgements, interactive companion section

### Promotional Materials

1. ✅ **blog.md** - Broad-appeal blog post (~3,000 words) targeting multiple audiences
2. ✅ **blog.svg** - Visual illustration of human vs agent perception (900×600)

### Documentation

1. ✅ **Glossary.md** - Technical terms with simplified identity delegation definitions
2. ✅ **implementation-checklist.md** - Priority-based implementation roadmap
3. ✅ **resource-links.md** - 150+ curated resources organized by category
4. ✅ **cover-design.svg** - Professional book cover design (600×900)

### Standalone Guides

✅ **advice.md** (~8,400 words) - Comprehensive prescriptive guide for building AI-friendly HTML:

- 12-part structure from quick reference tables to implementation priorities
- Complete examples (Luigi's Pizza template, e-commerce product page)
- 14 Playwright tests for agent compatibility
- Server-side patterns and testing strategies

✅ **for-ai.md** (~1,200 words) - Concise HTML patterns quick-reference for AI assistants:

- Data attribute standards and form field naming conventions
- Ready-to-use HTML snippets for common patterns
- Authentication state, forms, products, carts, search results, confirmations

## Recent Updates (v2.6.0)

- Added interactive Jupyter notebook with visual demonstrations
- Enhanced all chapters with structured data tables for clarity
- Converted implementation roadmaps to priority-based system
- Added Interactive Companion sections to preface, Chapter 10, and resource-links
- Added PDF generation capabilities with pandoc
  - Three npm scripts: pdf:html, pdf:generate, pdf:simple
  - Fixed illustration paths using --resource-path flag
- Added market timing urgency messaging
  - Preface: "A Note on Timing" section
  - Blog: Market timing and scarcity value
  - Interactive notebook: "The Market Timing Matters" section
- Added user responsibility framework
  - Preface: "A Critical Responsibility" section
  - Dual responsibility for developers and users
  - Emphasis on careful AI agent use with banking, legal, commercial services
- Restructured all chapter openings with new format
  - Added page breaks (\newpage) for PDF generation
  - Moved chapter heading to top
  - Added brief chapter summary after heading
  - Removed CHAPTER X line and sections list
  - Added ## Introduction subheading before body text
  - Consistent structure across all 10 chapters
- All changes maintain British English and professional tone

## Notes

- All chapters are designed to be read sequentially
- Cross-references between chapters have been verified
- Technical examples use simple JavaScript with minimal dependencies
- All illustrations use consistent visual language and styling
- Identity delegation mentioned as one emerging solution without detailed implementation
- Book focuses on design principles that work for both humans and AI agents
- Interactive notebook serves as both introduction and navigation tool
