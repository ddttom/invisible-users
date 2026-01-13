# Git Workflow Guide for AI Agents

**⚠️ CRITICAL: This repository has TWO separate git repositories that must be managed carefully.**

This guide explains how to work with the dual-repository structure without corrupting the git submodule pointers.

## Repository Structure

```text
/Users/tomcranstoun/Documents/GitHub/invisible-users/           ← Main Repository
├── .git/                                                        ← Main repo git data
├── packages/
│   └── manuscript/
│       └── manuscript/                                          ← Submodule Repository
│           ├── .git/                                            ← Submodule git data
│           └── [chapter files, appendices, etc.]
└── [other files]
```

### Two Repositories

1. **Main Repository:** `ddttom/invisible-users`
   - URL: <https://github.com/ddttom/invisible-users>
   - Contains: Web Audit Suite, documentation, sales materials, build scripts
   - Location: `/Users/tomcranstoun/Documents/GitHub/invisible-users/`

2. **Submodule Repository:** `Digital-Domain-Technologies-Ltd/invisible-users-manuscript`
   - URL: <https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript>
   - Contains: Book manuscript (chapters, appendices, illustrations)
   - Location: `/Users/tomcranstoun/Documents/GitHub/invisible-users/packages/manuscript/manuscript/`

## The Critical Rule: Check Location First

**ALWAYS run `pwd` before ANY git command or file operation.**

```bash
# STEP 1: Check where you are (MANDATORY)
pwd

# STEP 2: Use appropriate commands based on location
```

## Common Mistakes That Corrupt Git

### Mistake 1: Navigating to Submodule During Git Operations

```bash
# ❌ WRONG - This breaks everything
cd packages/manuscript/manuscript && git add -A

# ✅ CORRECT - Use git from current location
pwd                  # Check location first
git add -A           # Git handles submodule automatically
```

**Why this fails:** If you're already IN the submodule directory, attempting to `cd packages/manuscript/manuscript` will fail with "No such file or directory" because that relative path doesn't exist from within the submodule.

### Mistake 2: Using Wrong Repository Commands

```bash
# ❌ WRONG - Mixing up which repo you're in
pwd                              # Shows: /packages/manuscript/manuscript/
git push origin main            # Pushes submodule changes to WRONG repo

# ✅ CORRECT - Always verify location
pwd                              # Shows: /packages/manuscript/manuscript/
# You're in submodule, so this IS correct
git push origin main            # Pushes to manuscript repo
```

### Mistake 3: Forgetting to Update Submodule Pointer

```bash
# ❌ WRONG - Push submodule but forget to update pointer
cd packages/manuscript/manuscript
git add -A && git commit -m "Update manuscript"
git push origin main
# STOPPED HERE - main repo still points to old commit!

# ✅ CORRECT - Always update pointer after submodule push
cd packages/manuscript/manuscript
git add -A && git commit -m "Update manuscript"
git push origin main
cd ../../..                      # Return to main repo
git add packages/manuscript/manuscript
git commit -m "Update manuscript submodule pointer"
git push origin main
```

## Safe Git Workflows

### Workflow 1: Commit Changes in Main Repository Only

When you've only changed files outside the submodule:

```bash
# 1. Check location
pwd
# Output: /Users/tomcranstoun/Documents/GitHub/invisible-users

# 2. Check status
git status

# 3. Stage and commit
git add -A
git commit -m "Your commit message"

# 4. Push
git push origin main
```

### Workflow 2: Commit Changes in Submodule Only

When you've only changed manuscript files:

```bash
# 1. Check location
pwd
# Output: /Users/tomcranstoun/Documents/GitHub/invisible-users

# 2. Check submodule status
git status
# Shows: modified: packages/manuscript/manuscript (modified content)

# 3. Commit in submodule (use git -C to avoid navigation)
git -C packages/manuscript/manuscript add -A
git -C packages/manuscript/manuscript commit -m "Update manuscript content"
git -C packages/manuscript/manuscript push origin main

# 4. Update pointer in main repo
git add packages/manuscript/manuscript
git commit -m "Update manuscript submodule pointer"
git push origin main
```

### Workflow 3: Commit Changes in Both Repositories

When you've changed files in both locations:

```bash
# 1. Check location
pwd
# Output: /Users/tomcranstoun/Documents/GitHub/invisible-users

# 2. Check what changed
git status
# Shows both main repo changes AND submodule changes

# 3. Commit submodule changes FIRST
git -C packages/manuscript/manuscript add -A
git -C packages/manuscript/manuscript commit -m "Update manuscript content"
git -C packages/manuscript/manuscript push origin main

# 4. Commit main repo changes (including submodule pointer)
git add -A
git commit -m "Update main repo and manuscript submodule pointer"
git push origin main
```

## Using git -C to Avoid Navigation Issues

The `git -C <path>` flag runs git commands in a different directory without changing your current location. This prevents navigation errors.

```bash
# ❌ RISKY - Requires navigation
cd packages/manuscript/manuscript
git add -A
cd ../../..

# ✅ SAFE - No navigation needed
git -C packages/manuscript/manuscript add -A
```

### Common git -C Commands

```bash
# Check submodule status
git -C packages/manuscript/manuscript status

# Show submodule changes
git -C packages/manuscript/manuscript diff

# Stage changes in submodule
git -C packages/manuscript/manuscript add -A

# Commit in submodule
git -C packages/manuscript/manuscript commit -m "Message"

# Push submodule
git -C packages/manuscript/manuscript push origin main

# View submodule log
git -C packages/manuscript/manuscript log -3 --oneline
```

## Understanding Submodule Pointers

The main repository doesn't store the submodule's files. It only stores a **pointer** (git commit hash) to a specific commit in the submodule repository.

```bash
# Main repo shows submodule as single entry
git diff
# Output: -Subproject commit abc123
#         +Subproject commit def456

# This means the pointer moved from commit abc123 to def456
```

### When to Update the Pointer

You MUST update the submodule pointer in the main repository whenever:

1. You push new commits to the submodule
2. Someone else pushes commits to the submodule and you pull them
3. You want the main repository to reference a different submodule commit

### How to Update the Pointer

```bash
# After pushing submodule changes:
git add packages/manuscript/manuscript
git commit -m "Update manuscript submodule pointer to [brief description]"
git push origin main
```

## Checking Repository State

### Quick Status Check

```bash
# Check main repo
pwd
git status

# Check submodule
git -C packages/manuscript/manuscript status

# Check if submodule pointer needs updating
git status
# Look for: modified: packages/manuscript/manuscript (new commits)
```

### Detailed Status Check

```bash
# Main repo commits ahead of origin
git status
# Output: Your branch is ahead of 'origin/main' by N commits

# Submodule commits ahead of origin
git -C packages/manuscript/manuscript status
# Output: Your branch is ahead of 'origin/main' by N commits

# View unpushed commits in main repo
git log origin/main..HEAD --oneline

# View unpushed commits in submodule
git -C packages/manuscript/manuscript log origin/main..HEAD --oneline
```

## Recovering from Common Errors

### Error: "No such file or directory" when using cd

```bash
# You're probably already in the submodule
pwd
# Output: /Users/tomcranstoun/Documents/GitHub/invisible-users/packages/manuscript/manuscript/

# Solution: Use absolute path or navigate back to root first
cd /Users/tomcranstoun/Documents/GitHub/invisible-users
# Now you can navigate correctly
```

### Error: Submodule pointer is "dirty"

```bash
git status
# Output: modified: packages/manuscript/manuscript (modified content)

# This means submodule has uncommitted changes
# Solution: Commit them first
git -C packages/manuscript/manuscript add -A
git -C packages/manuscript/manuscript commit -m "Commit submodule changes"
```

### Error: Main repo shows submodule changes but you didn't change anything

```bash
git status
# Output: modified: packages/manuscript/manuscript (new commits)

# Someone else pushed to the submodule
# Solution: Update pointer to track their changes
git add packages/manuscript/manuscript
git commit -m "Update manuscript submodule pointer to latest"
git push origin main
```

### Error: Pushed submodule but forgot to update pointer

```bash
# You pushed to submodule but main repo still points to old commit
# Solution: Update the pointer now
git add packages/manuscript/manuscript
git commit -m "Update manuscript submodule pointer after recent changes"
git push origin main
```

## The Safe Commit Checklist

Before committing and pushing, verify:

- [ ] Run `pwd` to confirm current location
- [ ] Check `git status` in main repo
- [ ] Check `git -C packages/manuscript/manuscript status` for submodule
- [ ] If submodule changed: commit and push submodule FIRST
- [ ] If submodule pushed: update pointer in main repo
- [ ] Push main repo changes
- [ ] Verify both repos show "up to date with origin/main"

## Quick Reference Commands

```bash
# Location check (ALWAYS FIRST)
pwd

# Status checks
git status                                          # Main repo
git -C packages/manuscript/manuscript status        # Submodule

# Commit workflow (submodule changes)
git -C packages/manuscript/manuscript add -A
git -C packages/manuscript/manuscript commit -m "Message"
git -C packages/manuscript/manuscript push origin main
git add packages/manuscript/manuscript
git commit -m "Update submodule pointer"
git push origin main

# Commit workflow (main repo only)
git add -A
git commit -m "Message"
git push origin main

# View recent commits
git log -3 --oneline                                # Main repo
git -C packages/manuscript/manuscript log -3 --oneline  # Submodule

# View changes
git diff                                            # Main repo
git -C packages/manuscript/manuscript diff          # Submodule
```

## For AI Agents: Step-by-Step Safe Workflow

When asked to commit changes:

```bash
# STEP 1: Determine location
pwd
# Store this - you'll need it for all subsequent commands

# STEP 2: Check what changed
git status

# STEP 3: Identify which repository has changes
# Look for:
# - "modified: packages/manuscript/manuscript" = submodule has changes
# - Other files = main repo has changes

# STEP 4: If submodule has changes, commit it FIRST
git -C packages/manuscript/manuscript status        # Verify changes
git -C packages/manuscript/manuscript diff          # Review changes
git -C packages/manuscript/manuscript add -A
git -C packages/manuscript/manuscript commit -m "Clear description"
git -C packages/manuscript/manuscript push origin main

# STEP 5: Commit main repo (including submodule pointer if needed)
git add -A
git commit -m "Clear description"
git push origin main

# STEP 6: Verify both are clean
git status                                          # Should show "working tree clean"
git -C packages/manuscript/manuscript status        # Should show "working tree clean"
```

## Why This Structure Exists

The manuscript is maintained in a separate public repository because:

1. **Independent versioning:** The manuscript has its own release cycle
2. **Public access:** The manuscript repository is public for GitHub Actions
3. **Separate CI/CD:** Each repository has independent continuous integration
4. **Clear ownership:** Different teams can manage different repositories

The main repository integrates the manuscript as a submodule, allowing the book and tool to be developed together while maintaining separation.

## Additional Resources

- [CLAUDE.md](CLAUDE.md) - Full project documentation
- [README.md](README.md) - Project overview and setup
- [LEARNINGS.md](LEARNINGS.md) - Documented mistakes and lessons learned
- Git Submodule Documentation: <https://git-scm.com/book/en/v2/Git-Tools-Submodules>
