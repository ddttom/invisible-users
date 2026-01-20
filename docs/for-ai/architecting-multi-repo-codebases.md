# Architecting Multi-Repository GitHub Workspaces: A Comprehensive Guide

| metadata |  |
| :---- | :---- |
| title | Architecting Multi-Repository GitHub Workspaces: A Comprehensive Guide |
| author | Tom Cranstoun |
| creation-date | 19/Jan/2026 |
| publication-date | January 2026 |
| description | A comprehensive guide to architecting multi-repository GitHub workspaces using git submodules, with patterns for README delegation, metadata standards, and submodule-first workflows that scale from documentation projects to complex software systems. |
| longdescription | Strategic patterns for designing multi-repository codebases using git submodules, covering hub-and-spoke architecture, separation of concerns, access control, build workflows, AI assistant navigation patterns, and the complete LEARNINGS.md feedback loop for preventing recurring mistakes through automated enforcement. |
| purpose | Share architectural patterns and practical workflows for complex multi-repo projects |
| jsonld | BlogPosting |
| LinkedIn | <https://www.linkedin.com/in/tom-cranstoun/> |

**The monorepo vs multi-repo debate misses a critical middle ground.** When your project spans multiple concerns—documentation, code, generated outputs, private assets—you need the isolation of separate repositories with the coordination of a unified workspace. Git submodules provide this, but only if you architect them correctly.

This guide documents patterns refined through architecting complex multi-repository projects with multiple separate repositories, automated workflows, and AI-assisted tooling. These patterns apply equally to software projects, documentation systems, or any workspace requiring repository separation with unified workflows.

## The Automation Imperative

**Multi-repository architectures are deceptively complex.** Even experienced developers working with advanced AI IDEs make mistakes - wrong directory navigation, incorrect commit ordering, forgotten documentation updates. If AI-powered development environments like Google's Antigravity struggle to navigate multi-repository structures correctly, relying on human memory and discipline is doomed to fail.

**The solution isn't better documentation - it's automation.** Git hooks, pre-commit scripts, and workflow enforcement prevent mistakes before they happen. This isn't enterprise-grade infrastructure for large teams - it's essential scaffolding that makes multi-repository architectures practical for anyone.

Throughout this guide, automation patterns appear alongside architectural decisions. They're not optional enhancements - they're the infrastructure that makes these patterns work in practice.

## The Problem: When One Repository Isn't Enough

You start with a single repository. It works. Then requirements evolve:

- **Privacy boundaries:** Some content must be private whilst other parts are public
- **Ownership separation:** Different teams need independent commit access
- **Build isolation:** Generated outputs shouldn't pollute source history
- **Reuse patterns:** Shared resources need independent versioning
- **Access control:** Fine-grained permissions per repository

The monorepo answer: "Use one repo with access restrictions and careful .gitignore patterns." But that breaks down when:

1. You need truly separate git histories
2. Different repositories have different visibility requirements
3. Teams need to clone subsets without the full workspace
4. CI/CD pipelines target specific repositories independently

The pure multi-repo answer: "Just use separate repositories." But that breaks down when:

1. Workflows span multiple repositories
2. Build processes need coordinated access
3. Documentation references must stay synchronized
4. Version compatibility matters across repositories

## The Solution: Hub-and-Spoke Architecture

Think of your workspace as a hub (main repository) with spokes (submodules). The hub provides coordination, the spokes provide isolation.

### Core Principles

1. **Single source of truth:** Configuration, tooling, and workflows live only in the hub
2. **Submodules are assets:** They contain content, not infrastructure
3. **Explicit pointers:** The hub tracks specific commits, not floating branches
4. **Submodule-first workflow:** Always commit and push submodules before updating hub pointers

**The 80/20 Rule:**

Hub contains: Build scripts, CI/CD configuration, root documentation, tooling integration.

Spokes contain: Source content, generated outputs, reusable assets, private materials.

### Example Structure

```text
main-project/                           ← Hub (public)
├── .git/                               ← Hub git data
├── .github/workflows/                  ← CI/CD (hub only)
├── package.json                        ← Build orchestration
├── README.md                           ← Hub README (delegates to submodules)
├── docs/                               ← Hub-level documentation
│   ├── architecture/                   ← How the multi-repo works
│   └── workflows/                      ← Git workflow guides
├── packages/
│   ├── content/                        ← Submodule (public)
│   │   ├── .git/                       ← Spoke git data
│   │   ├── README.md                   ← Content-specific README
│   │   └── [source files]
│   ├── examples/                       ← Submodule (public)
│   │   ├── .git/
│   │   ├── README.md
│   │   └── [code examples]
│   └── shared-resources/               ← Submodule (private)
│       ├── .git/
│       ├── README.md
│       └── [reusable assets]
└── outputs/                            ← Submodule (private)
    ├── .git/
    ├── README.md
    └── [generated content]
```

## Repository Boundary Design Patterns

### Pattern 1: Content vs Control

Separate content creation from project control mechanisms:

```text
main-repo/              (Project control, build scripts, configuration)
├── .github/            (CI/CD workflows)
├── scripts/            (Build and deployment scripts)
├── config/             (Shared configuration)
└── content/            (Submodule: content repository)
    └── articles/
    └── media/
```

**When to use:** Projects where content creators shouldn't need to understand build tooling, or where content needs stricter access control than infrastructure code.

**Benefits:** Content contributors work in a clean repository without build complexity. Infrastructure changes don't trigger unnecessary content repo activity.

### Pattern 2: Public Shell, Private Core

Maintain a public repository that references private implementation details:

```text
public-repo/            (Open source framework, documentation)
├── docs/
├── examples/
└── implementation/     (Submodule: private implementation)
    └── proprietary/
```

**When to use:** Commercial products with open APIs, educational content with proprietary source material, or projects balancing transparency with intellectual property protection.

**Benefits:** Community can see interfaces and documentation whilst proprietary code remains protected. Public repository can be forked without exposing private details.

### Pattern 3: Monorepo with Modular Content

Use a monorepo for tooling with submodules for distinct content domains:

```text
monorepo/
├── packages/
│   ├── tool-a/
│   ├── tool-b/
│   └── content/
│       ├── book-1/     (Submodule)
│       ├── book-2/     (Submodule)
│       └── shared/     (Submodule)
```

**When to use:** Projects generating multiple outputs from shared tooling, or where different content types have different collaboration models.

**Benefits:** Single build pipeline processes multiple content sources. Content repositories can be independently versioned and shared across projects.

## Pattern 1: README Delegation

**Problem:** Users cloning individual submodules need context about the overall project without duplicating documentation across repositories.

**Solution:** Each repository has a self-contained README that provides just enough context to be useful standalone, whilst referring to the hub for complete documentation.

### Hub README Structure

```markdown
# Project Name

## Overview
[Brief description of the overall project]

## Repository Structure

This workspace contains multiple repositories:

- **Hub (this repo):** Build orchestration, workflows, tooling
- **content/:** [Link to submodule] - Source material
- **examples/:** [Link to submodule] - Code examples
- **outputs/:** [Link to submodule] - Generated assets

## Quick Start
[Build commands, setup instructions]

## Documentation
- [Architecture Guide](docs/architecture/)
- [Git Workflow](docs/workflows/git-workflow.md)
- [Contributing Guide](CONTRIBUTING.md)
```

### Spoke README Structure

```markdown
# Content Repository

## Context

This repository is part of [Project Name](link-to-hub). It contains [specific purpose].

**Hub repository:** [Link] - Build orchestration and complete documentation

## Overview
[What this specific repository contains]

## Structure
[Directory layout for this repository]

## Usage

### Standalone
[How to use this repository independently]

### Within Workspace
[How this integrates with the hub]

## Contributing
See [Hub Contributing Guide](link) for complete workflow.
```

**Key Insight:**

The README answers: "If I cloned just this one repository, what do I need to know?" Don't duplicate hub documentation—provide minimal context and link to the source of truth.

## Pattern 2: Pandoc YAML Frontmatter

**Problem:** Content files need machine-readable metadata for build processes, AI agents, and search engines without proprietary tooling.

**Solution:** Use Pandoc YAML frontmatter—the universal standard for markdown metadata across all static site generators.

### The YAML Frontmatter Format

```yaml
---
title: "Document Title"
author: "Author Name"
date: "2026-01-15"
description: "Brief summary for humans"
abstract: "Extended context for AI agents"
keywords: [markdown, metadata, yaml, frontmatter]
ai-instruction: "Instructions for AI agents parsing this"
purpose: "Why this document exists"
---
```

### Standard Implementation

YAML frontmatter appears at the very top of the file, delimited by triple dashes:

```markdown
---
title: "API Reference"
author: "Technical Team"
date: "2026-01-15"
description: "Complete API documentation"
keywords: [api, reference, documentation]
---

# API Reference

Content begins...
```

### Why YAML Frontmatter?

1. **Universal standard:** Pandoc, Hugo, Jekyll, Gatsby, Quarto all support natively
2. **Machine-readable:** Structured YAML format with full type support
3. **Build-tool integrated:** Automatic conversion to HTML meta tags
4. **AI-friendly:** Standard format AI agents recognize
5. **Rich features:** Access to full Pandoc metadata capabilities
6. **No vendor lock-in:** Industry-standard format, not platform-specific

### Standard Pandoc Fields

**Core metadata:**

- `title` - Document title
- `author` - Author name(s)
- `date` - Publication or update date
- `abstract` - Extended summary
- `keywords` - Array of topic tags

**Custom fields for AI agents:**

- `description` - SEO-style summary
- `ai-instruction` - Agent parsing guidance
- `purpose` - Document intent
- `context` - Background information

### Integration with Build Systems

Static site generators automatically process YAML frontmatter:

```yaml
---
title: "User Guide"
description: "How to use the system"
keywords: [guide, tutorial, documentation]
---
```

When built, this becomes:

```html
<head>
  <title>User Guide</title>
  <meta name="description" content="How to use the system">
  <meta name="keywords" content="guide, tutorial, documentation">
</head>
```

## Commit Workflow Architecture

Multi-repository architectures require careful thought about commit ordering and pointer updates.

### The Submodule Pointer Problem

A submodule reference is a pointer to a specific commit SHA. When you modify submodule content, you create a two-step workflow:

1. **Commit to submodule:** Changes are committed in the submodule repository
2. **Update pointer in parent:** Parent repository commits the new submodule SHA

**Critical rule:** Always commit and push submodule changes before updating the pointer in the parent repository. If you update the parent pointer to a SHA that doesn't exist on the remote, collaborators will be unable to check out that commit.

### Automated Commit Scripts

For repositories with multiple submodules, create commit automation that enforces correct ordering:

```bash
#!/bin/bash
# Check submodule first
cd submodule-path
if [[ -n $(git status -s) ]]; then
    git add -A
    git commit -m "Update content"
    git push
fi

# Then update parent
cd ..
git add submodule-path
git commit -m "Update submodule pointer"
git push
```

This pattern prevents the common error of pushing parent commits that reference non-existent submodule SHAs.

### Automated CHANGELOG.md Enforcement

Multi-repository projects need comprehensive changelogs documenting changes across all submodules. Manual CHANGELOG maintenance is error-prone - developers forget, skip it under deadline pressure, or document inconsistently.

**The complexity problem:** Multi-repository workflows are deceptively difficult. Even experienced developers working with AI assistants make mistakes navigating between repositories, updating submodule pointers in the wrong order, or forgetting documentation steps. If seasoned engineers with AI coding assistants struggle with this, relying on memory and discipline is futile.

**The only solution: Automation.** Git hooks enforce correct behavior automatically, catching mistakes before they become problems. This isn't optional infrastructure for large teams - it's essential scaffolding that makes multi-repository architectures practical for anyone.

**Problem:** CHANGELOG.md updates are often forgotten during the commit workflow, resulting in incomplete project history.

**Solution:** Automate CHANGELOG.md enforcement using git pre-push hooks that detect missing updates and block pushes until documentation is complete.

#### Pre-Push Hook Implementation

Place this hook in `.claude/hooks/pre-push.sh` (or `.git/hooks/pre-push`):

```bash
#!/bin/bash

# Pre-push hook to update CHANGELOG.md and remind about documentation
# This hook runs before git push operations

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    exit 0
fi

# Get the root directory of the repository
REPO_ROOT=$(git rev-parse --show-toplevel)

# CRITICAL: Only run in main repository, not in submodules
if [ "$(basename "$REPO_ROOT")" != "invisible-users" ]; then
    exit 0
fi

# Update CHANGELOG.md automatically
CHANGELOG_FILE="${REPO_ROOT}/CHANGELOG.md"
if [ -f "$CHANGELOG_FILE" ]; then
    # Get the last commit message and hash
    LAST_COMMIT_MSG=$(git log -1 --pretty=%B)
    LAST_COMMIT_HASH=$(git log -1 --pretty=%h)
    LAST_COMMIT_DATE=$(date +%Y-%m-%d)

    # Check if CHANGELOG has been updated for this commit
    LAST_CHANGELOG_UPDATE=$(git log -1 --format=%ct -- CHANGELOG.md 2>/dev/null || echo 0)
    LAST_COMMIT_TIME=$(git log -1 --format=%ct)

    # If CHANGELOG wasn't updated in the last commit, prompt to update it
    if [ "$LAST_CHANGELOG_UPDATE" -lt "$LAST_COMMIT_TIME" ]; then
        echo ""
        echo "📝 CHANGELOG.md hasn't been updated for recent commits."
        echo ""
        echo "Last commit: [$LAST_COMMIT_HASH] $LAST_COMMIT_MSG"
        echo ""
        echo "REMINDER: CHANGELOG.md should document:"
        echo "  - What changed (Added/Changed/Fixed/Removed)"
        echo "  - Which submodules were updated (with commit hashes)"
        echo "  - Date and version identifier"
        echo "  - Impact notes explaining why the changes matter"
        echo ""
        echo "The CHANGELOG serves as both a historical record AND current project state."
        echo ""
        read -p "Update CHANGELOG.md before pushing? (Y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Nn]$ ]]; then
            echo ""
            echo "Please update CHANGELOG.md manually, then:"
            echo "  1. git add CHANGELOG.md"
            echo "  2. git commit -m \"Update CHANGELOG.md\""
            echo "  3. git push"
            echo ""
            exit 1
        fi
    fi
else
    echo "⚠️  WARNING: CHANGELOG.md not found in main repository."
    echo "CHANGELOG.md should exist at: $CHANGELOG_FILE"
    echo ""
fi

exit 0
```

#### Hook Behavior

**When developer runs `git push`:**

1. Hook checks if CHANGELOG.md was modified in the last commit
2. If not modified, displays prompt showing:
   - Last commit hash and message
   - What should be documented
   - Clear update instructions
3. If user chooses to update (default), hook blocks push
4. Developer updates CHANGELOG.md, commits it, then pushes again

**Key features:**

- **Main repository only:** Hook only runs in hub repository, not in submodules
- **Timestamp comparison:** Compares CHANGELOG modification time vs last commit time
- **Context-aware:** Shows developer the commit message for context
- **User override:** Developer can bypass if CHANGELOG update isn't needed (Y/n prompt)
- **Clear guidance:** Explains what should be documented and how

#### CHANGELOG.md Format

Multi-repository projects should document submodule updates with commit hashes:

```markdown
## [2026-01-20] - Feature Name

### Changed

- **Main repository**
  - Updated build scripts to support new output format
  - Modified CI/CD pipeline for parallel builds

- **Content submodule** (packages/content)
  - Updated: abc123f → def456a
  - Added three new chapters
  - Revised introduction for clarity

- **Examples submodule** (packages/examples)
  - Updated: 789xyz1 → 234abc5
  - Added code examples for new patterns

### Notes

This change improves build performance by 3x and enables
parallel processing of multiple content sources.
```

#### Integration with Commit Workflows

Remove CHANGELOG maintenance from manual commit workflows (like `/step-commit` skills):

**Before (manual workflow):**

```markdown
## Step 6: Update CHANGELOG
- Update CHANGELOG.md with all changes
- Document submodule updates with commit hashes
- Commit with message: "Update CHANGELOG.md"

## Step 7: Final Steps
- Push all commits
```

**After (automated workflow):**

```markdown
## Step 6: Final Steps
- Push all commits
- Pre-push hook will prompt for CHANGELOG.md if needed
```

#### Benefits

1. **Never forgotten:** Automatic reminder before every push
2. **Reduced cognitive load:** One fewer manual step in workflow
3. **Consistent format:** Hook provides template guidance
4. **Hub-only enforcement:** Only runs where CHANGELOG lives
5. **Flexible:** User can bypass when appropriate
6. **Fail-safe for complexity:** Catches human error in workflows too complex to manage manually

**Why automation is essential:** Multi-repository architectures create workflows complex enough that even experienced developers with AI assistants make mistakes. Documentation alone cannot prevent errors - humans forget, AI agents hallucinate paths, and deadline pressure overrides best intentions. Git hooks enforce correct behavior automatically, making multi-repository architectures practical instead of theoretical.

#### Testing the Hook

```bash
# Make a commit without updating CHANGELOG
git commit -m "Add new feature"

# Attempt to push - hook will trigger
git push

# Output:
# 📝 CHANGELOG.md hasn't been updated for recent commits.
#
# Last commit: [abc123f] Add new feature
#
# REMINDER: CHANGELOG.md should document:
#   - What changed (Added/Changed/Fixed/Removed)
#   - Which submodules were updated (with commit hashes)
#   ...
#
# Update CHANGELOG.md before pushing? (Y/n)
```

## Pattern 3: Submodule-First Git Workflow

**Problem:** Git submodule pointers are fragile. Incorrect commit order breaks everything.

**Solution:** Always commit submodules before updating hub pointers. Never navigate during git commands.

### The Safe Workflow

```bash
# STEP 1: Always check location first
pwd
# Output: /path/to/hub

# STEP 2: Commit submodule changes FIRST
cd packages/content
git add -A
git commit -m "Update content"
git push origin main

# STEP 3: Return to hub
cd ../..

# STEP 4: Update submodule pointer in hub
git add packages/content
git commit -m "Update content submodule pointer"
git push origin main
```

### Using git -C for Safety

Avoid navigation errors entirely:

```bash
# From hub directory, commit submodule without navigating
git -C packages/content add -A
git -C packages/content commit -m "Update content"
git -C packages/content push origin main

# Then update pointer
git add packages/content
git commit -m "Update content submodule pointer"
git push origin main
```

### Common Mistakes to Avoid

| Mistake | Why It Fails | Solution |
|---------|--------------|----------|
| `cd submodule && git add` | If already in submodule, cd fails | Run `pwd` first, or use `git -C` |
| Forgetting pointer update | Hub points to old commit | Always `git add submodule-path` after submodule push |
| Pushing hub before submodule | Pointer references unpushed commit | Submodule-first workflow always |

## AI Assistant Navigation Patterns

Modern development involves AI coding assistants that must navigate your repository structure. Multi-repository architectures create navigation challenges that require architectural consideration.

### The Working Directory Problem

AI assistants maintain a working directory context. In multi-repository projects, the assistant may be working in the parent repository or within a submodule. This creates path ambiguity:

```bash
# From parent repository
.claude/skills/commit.md

# From within submodule
../../.claude/skills/commit.md
```

**Real-world experience with Claude Code:** Even Claude Code - Anthropic's official CLI tool designed for repository navigation - occasionally loses track of which repository it's operating in. When this happens, Claude Code runs `pwd` to verify location and resets to the root directory when needed. If a purpose-built AI coding assistant requires explicit location checks, expecting other tools or developers to remember their location without automation is unrealistic.

**Architectural solution:** Implement working directory verification as a required workflow step. Git hooks can enforce this:

```bash
# .claude/hooks/pre-tool-use.sh
pwd  # Always verify location before file operations
```

**Why this matters:** If Claude Code - which has deep integration with repository structures and was designed specifically for code navigation - needs `pwd` checks and automated resets, manual workflows without this safeguard will fail. The complexity isn't a training problem or a documentation gap - it's inherent to multi-repository architectures.

### The Dual-Repository Awareness Problem

Some directories exist only in the parent repository (configuration, CI/CD, build scripts) whilst others exist only in submodules (content, implementation). AI assistants need architectural guidance about which repository owns which concerns.

**Documentation pattern:** Create a navigation guide that explicitly documents repository ownership:

```markdown
## Repository Architecture

**Parent repository contains:**
- .claude/ (AI assistant configuration)
- config/ (Build configuration)
- scripts/ (Build automation)

**Submodule contains:**
- content/ (Source material)
- media/ (Assets)
```

This documentation becomes part of the AI assistant's context, reducing navigation errors.

### Claude Code Navigation Pattern

Real workflow observed with Claude Code in production multi-repository environments:

```bash
# Typical session progression
User: "Update the content in packages/bible/"
Claude: [Runs pwd to verify location]
        # Output: /Users/username/projects/invisible-users

Claude: [Operates on packages/bible/ submodule]
        # Makes changes, commits to submodule

# Later in same session
User: "Now update the README"
Claude: [Runs pwd again - may have lost context]
        # Output: /Users/username/projects/invisible-users/packages/bible

Claude: [Resets to root when needed]
        cd /Users/username/projects/invisible-users
```

**Key observation:** Claude Code understands multi-repository architecture and navigates correctly, but occasionally needs to verify location mid-session. This isn't a bug - it's the correct defensive pattern. When uncertainty exists about working directory, explicit verification prevents cascading errors.

**Implementation lesson:** If Claude Code - built specifically for repository navigation - runs `pwd` checks multiple times per session, your git hooks should enforce the same pattern. Don't rely on maintained context across operations.

## Pattern 4: Navigation Map for AI Agents

**Problem:** AI agents (and developers) get lost in multi-repo structures. File paths become ambiguous.

**Solution:** Document the complete structure with absolute paths in your hub's CLAUDE.md, README.md, or ARCHITECTURE.md.

### Example Navigation Map

```markdown
## Repository Navigation Map

```text
/Users/username/projects/main-project/  ← HUB
├── .github/workflows/                  ← CI/CD (hub only)
├── packages/
│   ├── content/                        ← SUBMODULE
│   │   └── /Users/username/projects/main-project/packages/content/
│   │       ├── chapters/
│   │       ├── README.md               ← Content README
│   │       └── NO .github/ directory
│   └── examples/                       ← SUBMODULE
│       └── /Users/username/projects/main-project/packages/examples/
│           └── NO .github/ directory
└── outputs/                            ← SUBMODULE
    └── /Users/username/projects/main-project/outputs/
        └── NO .github/ directory
```

### Key Navigation Rules

1. **Accessing hub files:**
   - FROM HUB: `.github/workflows/build.yml`
   - FROM SUBMODULE: `../../.github/workflows/build.yml`

2. **Git operations:**
   - Always run `pwd` first
   - Commit submodule changes before hub pointer updates

3. **Path construction:**
   - Use relative paths from current location
   - When in doubt, use absolute paths
```

**For AI Agents:**

Include explicit markers like "NO .github/ directory" to help AI agents understand what exists where. This prevents attempts to access files that don't exist in submodules.

## Pattern 5: Build Orchestration

**Problem:** Build processes need to run across multiple repositories with proper dependency order.

**Solution:** Use npm workspaces or similar tooling in the hub to coordinate builds.

### Hub package.json

```json
{
  "name": "main-project",
  "private": true,
  "workspaces": [
    "packages/content",
    "packages/examples"
  ],
  "scripts": {
    "build": "npm run build:content && npm run build:examples",
    "build:content": "cd packages/content && npm run build",
    "build:examples": "cd packages/examples && npm run build",
    "lint": "npm run lint --workspaces",
    "test": "npm run test --workspaces"
  }
}
```

### Submodule package.json

```json
{
  "name": "@project/content",
  "scripts": {
    "build": "node scripts/build.js",
    "lint": "markdownlint *.md"
  }
}
```

## Pattern 6: Symlinks for Convenience

**Problem:** Deep paths like `packages/content/chapters/` are cumbersome for frequent access.

**Solution:** Create a convenience directory with symlinks in the hub.

```bash
# In hub root
mkdir -p shortcuts
cd shortcuts
ln -s ../packages/content content
ln -s ../packages/examples examples
ln -s ../outputs outputs
```

Result:

```text
main-project/
├── packages/               ← Actual submodules
│   ├── content/
│   └── examples/
├── outputs/
└── shortcuts/              ← Convenience symlinks
    ├── content -> ../packages/content
    ├── examples -> ../packages/examples
    └── outputs -> ../outputs
```

## Build Output Architecture

Where should generated artefacts live in a multi-repository architecture?

### Pattern 1: Build Outputs as Private Submodule

Generated content (PDFs, compiled binaries, processed media) can be tracked in a separate private repository:

```text
main-repo/
├── source/             (Submodule: source content)
└── outputs/            (Submodule: generated content, private)
    ├── pdfs/
    ├── html/
    └── reports/
```

**Benefits:** Generated content is versioned without cluttering source repositories. Access control can differ (public source, private outputs). Build history is preserved for audit purposes.

**Trade-offs:** Adds complexity to build workflows. Requires additional repository maintenance.

### Pattern 2: Outputs in .gitignore

The traditional approach: generated content is excluded from version control entirely.

**When to use:** Reproducible builds where outputs can be regenerated from source at any time.

**When to avoid:** Generated content that's expensive to recreate, outputs that require manual review before publication, or workflows where output history matters.

## Dependency Management Patterns

Multi-repository architectures create dependency management challenges.

### Shared Configuration Files

Configuration that applies to both parent and submodules creates duplication risk:

```text
parent-repo/
├── .markdownlint.json  (Shared config)
└── content/            (Submodule)
    └── .markdownlint.json  (Duplicate? Reference?)
```

**Pattern: Configuration in Parent, References in Submodules**

Place authoritative configuration in the parent repository. Submodules reference parent configuration in their npm scripts:

```json
{
  "scripts": {
    "lint": "markdownlint --config ../../config/.markdownlint.json '**/*.md'"
  }
}
```

This maintains single source of truth whilst allowing submodules to be tested independently.

### Shared Dependencies

When parent and submodule both need the same npm packages:

**Pattern: npm Workspaces with Submodules**

Define submodules as workspaces in parent package.json:

```json
{
  "workspaces": [
    "packages/*",
    "content/submodule"
  ]
}
```

This allows npm to hoist shared dependencies to the root whilst maintaining independent package.json files in each submodule.

## Documentation Architecture

Multi-repository projects require layered documentation strategy.

### Three Documentation Layers

1. **Parent README:** Project overview, architecture diagram, getting started
2. **Submodule README:** Submodule-specific setup, contribution guidelines
3. **Shared CLAUDE.md:** AI assistant guidance covering both repositories
4. **LEARNINGS.md:** Battle-tested rules from actual AI assistant mistakes

The AI assistant guidance file should explicitly document the multi-repository architecture:

```markdown
## Repository Architecture

This workspace contains two git repositories:

1. **Parent repository:** /path/to/parent/
   - Contains: CI/CD, configuration, build scripts

2. **Content submodule:** /path/to/parent/content/
   - Contains: Source material

**CRITICAL:** Check pwd before file operations.
```

### The Role of LEARNINGS.md

Multi-repository architectures create recurring mistakes that documentation alone cannot prevent. A LEARNINGS.md file serves as a temporary capture mechanism for problems that need to migrate into automation.

**The minimal LEARNINGS.md:**

```markdown
# Learnings

Critical insights for AI assistants working on this project. Focus: actionable guidance, not historical changelog.
```

**Why keep LEARNINGS.md minimal:**

- **Git is the archive:** All historical context lives in git history, not in working files
- **Automation is the solution:** Learnings should become hooks, skills, and CLAUDE.md sections, not documentation entries
- **Temporary capture only:** When a mistake happens, document it temporarily, then implement enforcement
- **Zero is the goal:** An empty LEARNINGS.md means the project has mature infrastructure

**LEARNINGS.md vs CLAUDE.md distinction:**

- **CLAUDE.md:** How the project works (architecture, commands, patterns) - permanent documentation
- **LEARNINGS.md:** Temporary capture for mistakes awaiting automation - empties as infrastructure hardens

**The LEARNINGS.md feedback loop:**

LEARNINGS.md serves as temporary documentation that triggers infrastructure improvements:

1. **AI assistant makes mistake** → Error occurs (e.g., "No such file or directory" from wrong pwd)
2. **User adds entry to LEARNINGS.md** → Create new section describing the problem, what happened, and immediate fix
3. **AI assistant reads LEARNINGS.md** → On next session, learns from documented mistake
4. **Pattern repeated anyway** → Documentation alone proves insufficient
5. **User implements enforcement** → Create git hook to block the problematic pattern
6. **User updates skills and CLAUDE.md** → Add permanent guidance to prevent future occurrences
7. **User deletes LEARNINGS.md entry** → Once automated prevention exists, delete the entry completely (git history preserves context)

**Example progression:**

```markdown
# Day 1: AI assistant makes mistake
[Claude Code attempts: cd packages/content/submodule]
[Error: "No such file or directory"]
[User diagnoses: Working in parent repo, submodule is at packages/content/]

# Day 1: User adds entry to LEARNINGS.md
## Git Directory Navigation: Always Check pwd First

AI assistant tried to navigate to submodule directory with `cd packages/content/submodule`
resulting in "No such file or directory" errors. The fix: always run `pwd` first to check
current working directory, then use correct relative paths from that location.

# Day 3: User implements automation
[Hook created: .claude/hooks/pre-tool-use.sh blocks wrong directory access]
[Skill updated: /step-commit uses git -C instead of cd navigation]
[CLAUDE.md updated: Git Directory Navigation section added]

# Day 5: User deletes entry
[Entry completely deleted from LEARNINGS.md]
[Git commit message: "Remove git navigation entry - now prevented by hook"]
```

**Real progression in practice:**

```bash
# LEARNINGS.md starts at 159 lines (13 entries)
git log LEARNINGS.md  # Shows: "Add git directory navigation warning"

# Engineer implements hooks, updates skills
git log .claude/hooks/pre-tool-use.sh  # "Block .claude/ access from wrong directory"
git log .claude/commands/step-commit.md  # "Use git -C instead of cd navigation"

# LEARNINGS.md cleaned to header only (3 lines)
git log LEARNINGS.md  # Shows: "Remove entries - automation now prevents these errors"
```

**This feedback loop means:**

- **LEARNINGS.md captures emergent problems** - Immediate documentation when mistakes happen
- **Patterns that repeat trigger systematic fixes** - If it happens twice, automate prevention
- **Once automation exists, LEARNINGS.md empties** - Delete entries, rely on git history
- **New contributors benefit from hardened infrastructure** - Hooks prevent mistakes before they see them
- **The file stays minimal** - Zero entries is the ideal state

**Maintenance cadence:**

Review LEARNINGS.md weekly (not quarterly - act fast):

- **Any entries exist?** → Implement automation immediately
- **Automation implemented?** → Delete the entry, commit with clear message
- **Pattern still occurring?** → Hook or skill needs strengthening

**The goal:** An empty LEARNINGS.md (header only) means the project has mature infrastructure that prevents mistakes automatically. Git history preserves all context. If LEARNINGS.md is growing, you're documenting problems instead of preventing them.

**When all automation is complete**, the file should contain only:

```markdown
# Learnings

Critical insights for AI assistants working on this project. Focus: actionable guidance, not historical changelog.
```

Delete all entries - every single one. The header stays, the content goes. Git history preserves everything that was learned and automated.

### README Delegation Pattern

Multi-repository projects face a documentation challenge: should the root README contain all information, or should it delegate to submodule READMEs?

**Anti-pattern: Duplicating content in root README**

```markdown
# Root README

## Book Contents

### The Bible
- Chapter 1: Introduction
- Chapter 2: Architecture
- Chapter 3: Implementation
... (50 lines of chapter descriptions)

### Don't Make AI Think
- Chapter 1: Principles
- Chapter 2: Patterns
... (30 lines of chapter descriptions)
```

**Problems:**

- Root README becomes massive (500+ lines)
- Duplication between root and submodule READMEs
- Updates require editing multiple files
- No single source of truth for package details

**Pattern: README delegation with pointers**

```markdown
# Root README

## Book Manuscripts

Two book variants derived from shared manuscript source:

- **[The Bible](packages/bible/)** - Full comprehensive guide
- **[Don't Make AI Think](packages/dont-make-ai-think/)** - Slim practical guide
- **[Shared Appendices](packages/shared-appendices/)** - Implementation guides

See individual package READMEs for chapter lists, word counts, and build commands.
```

**Benefits:**

- Root README stays focused on project overview (100-200 lines)
- Each submodule owns its documentation
- Single source of truth per package
- Clear navigation hierarchy

### README Hierarchy Rules

**Root README should contain:**

- Project overview and purpose
- Repository structure diagram
- Quick start commands that work from root
- Links to package-specific READMEs
- Cross-project principles (terminology, workflow)

**Package READMEs should contain:**

- Package-specific details (contents, structure)
- Build commands that work within package
- Package dependencies and requirements
- Package-specific usage examples

**Root README should NOT contain:**

- Detailed chapter lists (link to package README)
- Package-specific build instructions (delegate)
- Content that duplicates package READMEs
- Details that only matter within a specific package

### CLAUDE.md Integration with Package READMEs

The root CLAUDE.md file (AI assistant guidance) should follow the same delegation pattern:

```markdown
## Documentation Structure

### Package-Specific Documentation

Each package has its own README with complete information:

- [packages/bible/README.md](packages/bible/README.md)
  - Chapter list, word counts, build commands
- [packages/dont-make-ai-think/README.md](packages/dont-make-ai-think/README.md)
  - Implementation focus, priority-based approach
```

This ensures AI assistants:

- Know where to find detailed information
- Follow the documentation hierarchy
- Read package READMEs when working in that package
- Don't duplicate content across files

### Verification Workflow

When implementing README delegation:

1. **Audit current root README** - What content belongs in packages?
2. **Create package READMEs** - Comprehensive, self-contained
3. **Replace root detail with links** - Point to package READMEs
4. **Update CLAUDE.md** - Document the hierarchy
5. **Test navigation** - Can users find information easily?

The test: If someone asks "How do I build the Bible PDF?" you should be able to answer "See packages/bible/README.md" without needing to look it up yourself.

## Pattern 7: AI Agent Compatibility

**Problem:** AI agents reading your repository need to understand the multi-repo structure.

**Solution:** Add explicit context in READMEs, use YAML frontmatter, and provide navigation maps.

### AI-Friendly README Context

```markdown
## Context for AI Agents

This repository is part of a multi-repository workspace:

- **Hub repository:** [Link] - Orchestration and tooling
- **This repository:** Content assets
- **Related repositories:** [Links to other submodules]

**Navigation:** Use relative paths `../../` to access hub files.
Configuration lives in hub only.
```

### Metadata for Machine Parsing

```markdown
| metadata |  |
| :---- | :---- |
| repository-type | submodule |
| hub-repository | https://github.com/org/main-project |
| purpose | Content storage for documentation project |
| ai-instruction | This is a submodule. Configuration and build scripts are in hub. |
```

## CI/CD Pipeline Architecture

Continuous integration for multi-repository projects requires workflow coordination.

### Submodule Update Triggers

Should parent CI/CD pipelines run when submodule content changes?

**Pattern: Selective triggers**

```yaml
# .github/workflows/build.yml
on:
  push:
    branches: [ main ]
    paths:
      - 'submodule-path/**'  # Trigger on submodule pointer updates
```

This runs parent builds only when the submodule pointer changes, not on every submodule commit.

### Recursive Checkout

CI/CD runners must check out submodules explicitly:

```yaml
- name: Checkout repository
  uses: actions/checkout@v4
  with:
    submodules: recursive
```

Without this, workflows will fail when attempting to access submodule content.

## When to Use This Architecture

### Good Use Cases

- **Documentation projects:** Separate sources, outputs, and shared resources
- **Microservices:** Shared libraries as submodules, services as separate repos
- **Generated content:** Keep build outputs in separate private repo
- **Privacy boundaries:** Public source code with private configuration
- **Multi-tenant systems:** Shared core with tenant-specific customisations

### Poor Use Cases

- **Tightly coupled code:** If changes require synchronised commits across repos
- **Rapid iteration:** Submodule overhead slows down fast-moving projects
- **Simple projects:** Single repository is simpler if you don't need separation
- **Team unfamiliarity:** Git submodules have a learning curve

## Practical Patterns for Common Scenarios

### Scenario 1: Documentation Site with Private Content

**Architecture:**

- Public repository: Documentation framework, build scripts, public examples
- Private submodule: Proprietary content, internal examples
- Output submodule: Generated static site (private)

**Workflow:** Contributors with access to private submodule can build complete site. Public contributors can build public subset.

### Scenario 2: Multi-Book Publishing Platform

**Architecture:**

- Parent repository: Build tooling, pandoc templates, CI/CD
- Book submodules: Independent repositories for each book title
- Shared resources submodule: Common appendices, code examples, media

**Workflow:** Authors work in book-specific repositories. Publisher updates build tooling in parent. Books can reference shared resources without duplication.

### Scenario 3: Tool + Implementation Examples

**Architecture:**

- Parent repository: Tool source code, tests, documentation
- Examples submodule: Real-world implementations (may be private)
- Public examples submodule: Open source examples for documentation

**Workflow:** Tool developers work in parent. Customer implementations in private submodule inform feature development without exposing client code.

## Common Anti-Patterns

### Anti-Pattern 1: Too Many Submodules

**Problem:** Every logical component becomes a separate repository.

**Result:** Overwhelming git submodule update complexity, unclear ownership boundaries, excessive overhead for small changes.

**Solution:** Use submodules for genuine access control or versioning needs, not for logical organization. Directories are sufficient for most modularization.

### Anti-Pattern 2: Circular Dependencies

**Problem:** Repository A includes B as submodule, B includes A as submodule.

**Result:** Impossible to clone, infinite recursion, confusion about source of truth.

**Solution:** Establish clear parent-child relationships. If two repositories need to share code, extract shared code to a third repository that both reference.

### Anti-Pattern 3: Ignoring Submodule Updates

**Problem:** Parent repository never updates submodule pointers, remaining pinned to outdated content.

**Result:** Stale content, confusion about which version is canonical, wasted effort when contributors update submodule without updating parent.

**Solution:** Establish update cadence. Automate submodule updates where appropriate. Document update workflow clearly.

## Implementation Checklist

1. **Create hub repository**
   - Initialise git repository
   - Add .gitmodules configuration
   - Create hub README with delegation pattern

2. **Create spoke repositories**
   - Initialise separate git repositories
   - Add spoke READMEs with context
   - Push to GitHub/GitLab

3. **Add submodules to hub**
   - `git submodule add <repo-url> <local-path>`
   - Commit .gitmodules and submodule pointers

4. **Document navigation**
   - Create architecture documentation
   - Add navigation map with absolute paths
   - Document git workflows

5. **Add metadata standards**
   - Define YAML frontmatter format
   - Add to documentation files
   - Document in style guide

6. **Configure CI/CD**
   - Set up workflows in hub only
   - Configure submodule checkout in CI
   - Test build orchestration

## Advanced: Automated Submodule Updates

For mature projects, automate submodule pointer updates:

```yaml
# .github/workflows/update-submodules.yml
name: Update Submodules

on:
  repository_dispatch:
    types: [submodule-updated]

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
          token: ${{ secrets.PAT }}

      - name: Update submodule
        run: |
          git submodule update --remote --merge
          git add .
          git commit -m "Auto-update submodule pointers" || exit 0
          git push
```

## Architectural Decision Framework

When designing a multi-repository architecture, consider:

1. **Access control requirements:** Do different parts need different permissions?
2. **Versioning requirements:** Do components need independent release cycles?
3. **Collaboration model:** Do different teams own different components?
4. **Build complexity:** Can components be built independently?
5. **CI/CD needs:** What triggers rebuilds? What needs testing together?

If the answer to most questions is "no," a monorepo may be simpler. Submodules add complexity that must be justified by genuine architectural needs.

## Conclusion

Multi-repository architectures using git submodules provide the isolation of separate repositories with the coordination of a unified workspace. The patterns documented here—README delegation, metadata standards, submodule-first workflows, and navigation maps—scale from documentation projects to complex software systems.

The key insight: **treat the hub as orchestration and the spokes as assets.** Configuration, tooling, and workflows live once in the hub. Content, code, and outputs live in isolated submodules. This separation provides:

- Privacy boundaries without access control complexity
- Independent versioning with coordinated workflows
- Reusable components across multiple projects
- Clear ownership and responsibility separation

Start simple. Add one submodule. Document it well. Build the patterns incrementally. Your future self (and your AI agents) will thank you.

---

**About the author:** Tom Cranstoun architects web systems and documentation infrastructures that work for both human users and machine readers. He specialises in AI-friendly patterns, accessibility compliance, and scalable documentation architectures. Connect on [LinkedIn](https://www.linkedin.com/in/tom-cranstoun/).
