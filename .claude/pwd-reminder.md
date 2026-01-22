# Working Directory Reminder

## CRITICAL: Multiple Repositories in This Workspace

This workspace contains MULTIPLE git repositories (1 hub + submodules):

### 1. Hub Repository (Main)
**Location:** `${MAIN_REPO}/` (e.g., `/path/to/invisible-users/`)

**Contains:**
- `.claude/` directory (skills, hooks, settings)
- `packages/` directory with all workspace packages
- `docs/` directory
- `CLAUDE.md`, `LEARNINGS.md`, `README.md`
- All project-level configuration

### 2. Submodule Repositories (Multiple)

**Example locations:**

- `${MAIN_REPO}/packages/bible/` (full book chapters and illustrations)
- `${MAIN_REPO}/packages/shared-appendices/` (appendices A-L)
- `${MAIN_REPO}/outputs/` (generated content: blogs, PDFs, presentations)

**Contains:**

- Book chapters (`chapter-*.md`)
- Appendices (`appendix-*.md`)
- Illustrations, generated content

**Does NOT contain:**
- `.claude/` directory (this is only in hub repo)

**Note:** Number of submodules may vary as project evolves. Current submodules: outputs/, bible/, shared-appendices/, shared-code-examples/

## Before Any File Operation

**MANDATORY FIRST STEP:**

```bash
pwd
```

Then use the correct path:
- If you're in hub repo → `.claude/skills/news/skill.md`
- If you're in any submodule → `../../.claude/skills/news/skill.md` or similar

## Common Mistake Pattern

```bash
❌ WRONG: Assuming location
Read(file_path=".claude/skills/news/skill.md")
# Fails with "No such file or directory" if in submodule

✅ CORRECT: Check first
pwd  # Verify location
Read(file_path="../../.claude/skills/news/skill.md")  # If in submodule
```

## Why This Matters

When you're editing book content (chapters, appendices, blog), you're likely in the **submodule**.
When you need to access `.claude/` files, you need to go **up two directories**.

The submodule structure makes path assumptions unreliable. Always verify with `pwd`.
