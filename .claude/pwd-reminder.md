# Working Directory Reminder

## CRITICAL: Two Repositories in This Workspace

This workspace contains TWO separate git repositories:

### 1. Main Repository
**Location:** `/Users/tomcranstoun/Documents/GitHub/invisible-users/`

**Contains:**
- `.claude/` directory (skills, hooks, settings)
- `packages/` directory with all workspace packages
- `docs/` directory
- `CLAUDE.md`, `LEARNINGS.md`, `README.md`
- All project-level configuration

### 2. Submodule Repository
**Location:** `/Users/tomcranstoun/Documents/GitHub/invisible-users/packages/manuscript/manuscript/`

**Contains:**
- All book chapters (`chapter-*.md`)
- All appendices (`appendix-*.md`)
- Blog files (`blog/`)
- Illustrations

**Does NOT contain:**
- `.claude/` directory (this is only in main repo)

## Before Any File Operation

**MANDATORY FIRST STEP:**

```bash
pwd
```

Then use the correct path:
- If you're in main repo → `.claude/skills/news/skill.md`
- If you're in submodule → `../../.claude/skills/news/skill.md`

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
