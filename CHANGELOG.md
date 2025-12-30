# Changelog

All notable changes to "The Invisible Users" book project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [2.7.1] - 2025-12-30

### Added

- **Agent Diversity and Universal Patterns** - Comprehensive guidance on designing for diverse AI agent architectures:
  - **CLAUDE.md** - New "Agent Diversity and Universal Patterns" section explaining 6 agent types (CLI, local, server-based, browser, browser extensions, IDE-integrated) with varying capabilities
  - **Chapter 1** - Added extensive "A Diverse Ecosystem" section (~500 words) describing each agent type, their capabilities, and the critical insight about universal design patterns
  - **Chapter 2** - Added note on how different agent architectures experience failures differently
  - **Chapter 3** - Added caveat about how architectural constraints vary by agent type
  - **Chapter 6** - Mapped security challenges to specific agent architectures, distinguishing external agents (Problem 1) from browser extensions (Problem 2)
  - **Chapter 9** - Added note on universal patterns working across entire agent ecosystem
  - **Chapter 10** - Added architecture diversity note explaining how implementations work regardless of agent type
  - **Jupyter notebook** - Added "Understanding Agent Diversity" cell introducing agent types before discussing failures

### Changed

- **Word Count Updates** - Verified against actual files and updated to nearest 50:
  - Core manuscript: ~50,000 words (includes preface + 10 chapters, was ~47,450)
  - Chapter 1: ~3,200 words (was ~2,700) - reflects agent diversity content addition
  - Chapter 2: ~4,500 words (was ~4,400)
  - Chapter 3: ~4,150 words (was ~4,050)
  - Chapter 6: ~4,000 words (was ~3,850)
  - Chapter 9: ~4,400 words (was ~4,350)
  - Chapter 10: ~8,350 words (was ~8,250)
  - Updated book-plan.md, README.md, and PROJECTSTATE.md with verified counts
  - Manuscript now at upper end of 30,000-50,000 target range

### Fixed

- Table alignment in chapter-07-the-legal-landscape.md (Legal Risk Matrix)

## [2.7.0] - 2025-12-30

### Added

- **Business-Focused Framework Transformation** - Major manuscript revision to improve credibility and usability for business leaders:
  - **executive-summary.md** - 2-page business briefing with "What's happening", "Why it matters", "Who's affected", and "What to do" sections. Includes one-page decision tree and role-based reading guidance (~1,100 words)
  - **glossary-simplified.md** - 27 essential terms for business leaders in plain language without technical jargon (~900 words)
  - **Key Points for Business Leaders** boxes added to Chapters 2, 3, 4, 5, 7, and 8 - distill essential business implications without requiring technical detail

- **Decision Frameworks for Strategic Assessment:**
  - **Agent Exposure Assessment** (Chapter 4) - 4-category framework with exposure risk matrix (Critical/High/Medium/Low), strategic response options by exposure level, and decision matrix for embrace vs resist approaches
  - **Revenue Model Vulnerability Assessment** (Chapter 5) - 5-category vulnerability checklist, 4-level vulnerability matrix, and diversification options matrix with capital requirements, time to revenue, and success rates for 8 different options
  - **Risk Categorization Framework** (Chapter 7) - Legal risk matrix with 4 categories (Liability, Copyright, ToS, Privacy), deep dive sections for each risk with likelihood/impact factors and mitigation options, 14 questions for legal counsel, and risk prioritization by business type

- **Implementation Guidance with Qualitative Effort Estimates:**
  - Priority 1: "A single developer can implement these changes in a focused session. No architectural changes required, minimal risk, immediate deployment."
  - Priority 2: "Requires coordinated work across multiple developers or sustained focus from a small team. Systematic changes to existing code, testing across multiple pages."
  - Priority 3: "Multi-person project requiring planning, architectural decisions, and cross-functional collaboration. Changes to core application structure."
  - Priority 4: "Ongoing programme, not a one-time project. Requires dedicated resources, sustained organizational commitment, and strategic business alignment."
  - Applied to Chapters 9, 10, and implementation-checklist.md

### Changed

- **Honest Framing Throughout Manuscript:**
  - Preface updated with explicit statement: "This is a theory book, not a research study"
  - Acknowledged figures are illustrative, not validated: "When I write 'if agent traffic reaches 30% of visits with minimal ad revenue, a site could see revenue decline by roughly one-third,' that's a logical calculation, not a proven outcome"
  - Replaced false precision with qualified language: "roughly", "approximately", "likely", "could", "~" (tilde) prefix
  - Added honest framing to Chapter 5: "This chapter describes a structural problem without a clear solution... Some content types may not have viable paths forward under agent-mediated consumption"
  - Added speculation labels to future-looking sections (e.g., "Future Models That Might Work" in Chapter 5, "Dark Warehouses" section reduced and labeled as **SPECULATIVE** in Chapter 4)

- **Reading Paths and Navigation:**
  - Added separate reading guidance for business leaders vs technical implementers in preface
  - Business leader path: read Chapters 1, 4, 5, 7, 8, 9 (first half); skim 2, 3; skip/delegate 6, 10
  - Updated invisible-users.ipynb to reflect all new content with "NEW" tags and updated chapter descriptions

- **Word Count Updates:**
  - Core manuscript: ~47,300 words (increased from ~43,800 due to new frameworks)
  - Total content: ~67,200 words (including supporting materials)
  - Updated Chapter 4: ~5,550 words (was ~5,350)
  - Updated Chapter 5: ~5,700 words (was ~4,600)
  - Updated Chapter 7: ~4,100 words (was ~3,300)

- Restructured all chapter openings (chapters 1-10) with new format:
  - Added `\newpage` command for PDF page breaks
  - Moved chapter heading to top position
  - Added brief chapter summary directly after heading
  - Removed "CHAPTER X" line and sections bullet list
  - Added "## Introduction" subheading before body text
  - Consistent structure across all 10 chapters
  - Improves PDF generation and reading flow

## [2.6.0] - 2025-12-30

### Added

- Interactive Jupyter notebook (invisible-users.ipynb) with visual demonstrations
  - Hosted at allabout.network/invisible-users.html
  - 60-75 minute interactive experience
  - Visual comparisons of agent failures vs reality
  - Interactive data tables showing business impact
  - Real-world cost calculations
  - Implementation priority visualizations
  - Complete chapter index with direct navigation links
- Structured data tables across all chapters for enhanced clarity:
  - Chapter 2: Five failure patterns summary table
  - Chapter 4: Real-world cost impact scenarios (£2,000, £150, £50k examples)
  - Chapter 5: Revenue impact calculator showing viability thresholds
  - Chapter 6: Security indistinguishability comparison (User/Agent/Malware)
  - Chapter 7: Legal grey zone scenarios table
  - Chapter 8: Access barriers matrix (5 barrier types)
  - Chapter 9: Priority-based implementation roadmap
  - Chapter 10: Pattern comparison (before/after) table
- Interactive Companion sections in:
  - Preface: Added under "How to Use This Book"
  - Chapter 10: Added "Explore Further" sign-off section
  - resource-links.md: Added as primary companion resource
- Documentation updates:
  - README.md: Added Interactive Companion section with hosted link
  - PROJECTSTATE.md: Listed notebook under "Interactive Materials", PDF generation status
  - LEARNINGS.md: Comprehensive session learnings documentation
- PDF generation capabilities:
  - Three npm scripts in package.json:
    - `pdf:html` - Generate standalone HTML (print to PDF manually)
    - `pdf:generate` - Direct PDF generation with professional book layout (requires LaTeX)
    - `pdf:simple` - Simple article-format PDF (requires LaTeX)
  - Pandoc 3.8.3 installed and configured
  - Resource path configuration (--resource-path=invisible-users) for illustration embedding
  - Troubleshooting guide with common issues and solutions
  - Technical notes explaining pandoc configuration choices
- Market timing urgency messaging:
  - Preface: "A Note on Timing" section with scarcity value emphasis
  - Blog: Market timing paragraph highlighting 2-5 year commoditization window
  - Interactive notebook: "The Market Timing Matters" section before closing
- User responsibility framework:
  - Preface: "A Critical Responsibility" section addressing dual audience
  - Developers: Fix technical patterns (clear state, persistent errors, semantic structure)
  - Users: Exercise care with prompts for banking, legal, commercial transactions
  - Emphasis that not everything can be fixed with HTML design
  - Coverage of banking security, legal liability, dark warehouses as attention areas

### Changed

- Converted all time-based implementation roadmaps to priority-based system
  - Removed "1-2 weeks", "1-3 months", "3-6 months" references
  - Replaced with "Priority 1: Critical Quick Wins", "Priority 2: Essential Improvements", "Priority 3: Core Infrastructure"
  - Applied across notebook, Chapter 9, and all implementation guidance
- Enhanced all tables with "Key insight" paragraphs explaining broader implications
- Updated PROJECTSTATE.md date to 2025-12-30
- Added v2.6.0 recent updates section to PROJECTSTATE.md

### Technical

- All markdown files pass linting with proper table formatting
- Maintained British English and professional tone throughout
- No attribution added to any commits
- Cross-document consistency maintained across 5 files for interactive companion references
- Fixed pandoc illustration path resolution:
  - Added --resource-path=invisible-users to all PDF generation scripts
  - Resolves "Could not fetch resource" warnings for chapter illustrations
  - Allows pandoc to find invisible-users/illustrations/*.png files correctly
- Updated .gitignore to exclude generated book files:
  - the-invisible-users.html
  - the-invisible-users.pdf
  - the-invisible-users-simple.pdf
