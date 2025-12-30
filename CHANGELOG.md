# Changelog

All notable changes to "The Invisible Users" book project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Changed

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
  - README.md: Added Interactive Companion section with hosted link, PDF-GENERATION.md reference
  - PROJECTSTATE.md: Listed notebook under "Interactive Materials", PDF generation status
  - LEARNINGS.md: Comprehensive session learnings documentation
- PDF generation capabilities:
  - PDF-GENERATION.md: Comprehensive guide for generating book PDFs
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
- Fixed markdown linting errors in PDF-GENERATION.md:
  - MD032: Added blank lines around all lists
  - MD034: Wrapped bare URLs in angle brackets
