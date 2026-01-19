Custom Skills Available
/step-commit - Systematic commit workflow

Checks both main repository AND manuscript submodule for changes
Commits submodule first if needed, then updates pointer in main repo
Reviews changes with git status and diff
Runs linting and fixes errors
Updates documentation (README, CLAUDE.md, CHANGELOG.md)
Handles multi-repository workflow automatically
/md-fix - Markdown linting and auto-fix

Runs npm run lint:markdown:fix to auto-fix issues
Verifies all issues are resolved
Reports remaining issues requiring manual fixes
Shows modified files
/news - Add verified industry news to book documentation

Verifies all claims against official sources using WebSearch
Validates relevance using five strict criteria (all must pass)
Sequences entries chronologically
Creates properly formatted blog and appendix entries
Updates both blog and appendix files
Usage: /news [paste news content or URL]
/review-docs - Review documents against writing style guide

Loads complete writing style guide
Analyzes documents for style violations across all rule categories
Identifies issues by priority: Critical, Important, Style, Markdown
Checks forbidden vocabulary (23 words) and forbidden constructs (14 patterns)
Validates British English spelling, heading format, voice and tone
Provides specific fixes with line numbers
Usage: /review-docs [file paths...]

Skills from Plugins
I also have access to skills from the document-skills and developer-essentials plugin collections, including skills for working with PDFs, spreadsheets, presentations, web design, authentication patterns, debugging, code review, and more.

Would you like me to use any of these skills, or would you like more details about what any of them do?

list the additional ones
Here are all the additional skills from the plugin collections:

Document Skills Plugin
/theme-factory - Styling artifacts with themes

10 pre-set themes with colors/fonts
Apply to slides, docs, reports, HTML landing pages
Can generate new themes on-the-fly
/doc-coauthoring - Structured documentation workflow

Guide for co-authoring documentation, proposals, technical specs
Helps transfer context and refine content through iteration
/xlsx - Comprehensive spreadsheet work

Create, edit, analyze spreadsheets (.xlsx, .xlsm, .csv, .tsv)
Formulas, formatting, data analysis, visualization
Recalculate formulas
/pdf - PDF manipulation toolkit

Extract text and tables
Create new PDFs
Merge/split documents
Handle forms
/algorithmic-art - Create algorithmic art

Uses p5.js with seeded randomness
Flow fields, particle systems
Interactive parameter exploration
/internal-comms - Internal communications writing

Status reports, leadership updates, newsletters
FAQs, incident reports, project updates
Company-standard formats
/skill-creator - Create custom skills

Guide for creating new skills
Extends Claude's capabilities with specialized knowledge
/canvas-design - Visual art creation

Beautiful .png and .pdf designs
Posters, art, static pieces
Design philosophy-driven
/pptx - Presentation work

Create, edit, analyze presentations (.pptx)
Layouts, comments, speaker notes
/slack-gif-creator - Animated GIFs for Slack

Optimized for Slack
Validation tools and animation concepts
/webapp-testing - Test local web apps

Uses Playwright for frontend testing
Debug UI behavior, capture screenshots
View browser logs
/frontend-design - Production-grade frontend interfaces

High design quality web components
Websites, landing pages, dashboards
React components, HTML/CSS layouts
Avoids generic AI aesthetics
/mcp-builder - Create MCP servers

Build Model Context Protocol servers
Enable LLMs to interact with external services
Python (FastMCP) or Node/TypeScript (MCP SDK)
/brand-guidelines - Anthropic brand application

Official Anthropic brand colors and typography
Apply to artifacts needing Anthropic look-and-feel
/docx - Document creation and editing

Create, edit, analyze .docx files
Tracked changes, comments, formatting
/web-artifacts-builder - Complex HTML artifacts

Multi-component claude.ai artifacts
React, Tailwind CSS, shadcn/ui
State management, routing
Developer Essentials Plugin
/auth-implementation-patterns - Authentication and authorization

JWT, OAuth2, session management, RBAC
Secure, scalable access control systems
Debugging security issues
/monorepo-management - Monorepo expertise

Turborepo, Nx, pnpm workspaces
Efficient multi-package repositories
Optimized builds, dependency management
/bazel-build-optimization - Bazel builds

Large-scale monorepo optimization
Remote execution configuration
Enterprise codebase performance
/error-handling-patterns - Error handling

Exceptions, Result types, error propagation
Graceful degradation
Resilient applications
/debugging-strategies - Systematic debugging

Profiling tools, root cause analysis
Track down bugs efficiently
Performance issues
/code-review-excellence - Effective code review

Constructive feedback practices
Catch bugs early, foster knowledge sharing
Maintain team morale
/sql-optimization-patterns - SQL optimization

Query optimization, indexing strategies
EXPLAIN analysis
Improve database performance
/turborepo-caching - Turborepo configuration

Efficient monorepo builds
Local and remote caching
Distributed caching
/nx-workspace-patterns - Nx monorepo

Configure and optimize Nx workspaces
Project boundaries, build caching
Affected commands
/e2e-testing-patterns - End-to-end testing

Playwright and Cypress
Reliable test suites
Debug flaky tests
/git-advanced-workflows - Advanced Git

Rebasing, cherry-picking, bisect
Worktrees, reflog
Clean history, repository recovery
These are all available to invoke using the /skill-name syntax or by calling the Skill tool.
