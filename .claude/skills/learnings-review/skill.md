# Learnings Review and Cleanup Skill

Review LEARNINGS.md entries and implement the feedback loop: document → learn → automate → delete.

## Purpose

LEARNINGS.md should remain minimal (header only) as learnings migrate into permanent infrastructure (hooks, skills, CLAUDE.md). This skill implements the feedback loop that transforms temporary documentation into automated prevention.

**Target state:** LEARNINGS.md contains only the header:

```markdown
# Learnings

Critical insights for AI assistants working on this project. Focus: actionable guidance, not historical changelog.
```

## When to Use

Run this skill:

- Weekly when LEARNINGS.md has ANY entries beyond the header
- Immediately after implementing hooks or skills
- Never quarterly - act fast to keep LEARNINGS.md minimal

## What This Skill Does

1. **Reads LEARNINGS.md** - Analyzes all entries beyond the header
2. **Identifies patterns** - Which entries have repeated? Which have automation?
3. **Suggests automation** - Recommends hooks, skills, or CLAUDE.md updates
4. **Proposes deletion** - Shows which entries can be removed (all of them once automated)
5. **Implements changes** - Updates hooks, skills, CLAUDE.md, and empties LEARNINGS.md

## The LEARNINGS.md Feedback Loop

```text
1. AI assistant makes mistake → Error occurs
2. Mistake documented in LEARNINGS.md → Entry added temporarily
3. AI assistant reads LEARNINGS.md → Learns from documented mistake
4. Pattern repeated anyway → Documentation alone insufficient
5. Engineer implements enforcement → Git hook or skill created
6. Skills and CLAUDE.md updated → Permanent guidance added
7. LEARNINGS.md entry deleted → Git history preserves context
```

**Key principle:** Once automation exists, delete the entry. Git history is the archive.

## Review Criteria

For each LEARNINGS.md entry, assess:

### 1. Has This Pattern Repeated?

**Question:** Is this entry dated multiple times or references "repeated" errors?

**If YES:**
- Priority: HIGH - Needs automation
- Action: Implement hook or update skill to prevent pattern

**If NO:**
- Continue to next criterion

### 2. Is Automation Already Implemented?

**Question:** Does the entry reference hooks, skills, or CLAUDE.md sections?

**If YES:**
- Priority: DELETE - Entry should be removed
- Action: Delete the entry completely (git history preserves it)

**If NO:**
- Check if automation is feasible

### 3. Is This Entry Still Relevant?

**Question:** Does this pattern still occur in current codebase?

**If NO:**
- Priority: DELETE - Obsolete
- Action: Delete entry immediately

**If YES:**
- Check if it needs automation

### 4. Does CLAUDE.md Cover This?

**Question:** Is this pattern documented in CLAUDE.md or skills?

**If NO:**
- Priority: DOCUMENT - Add to CLAUDE.md
- Action: Create CLAUDE.md section, then delete LEARNINGS.md entry

**If YES:**
- Priority: DELETE - Entry duplicates permanent documentation
- Action: Delete the entry (CLAUDE.md is the source of truth)

## Automation Recommendations

Based on entry patterns, suggest:

### Git Hooks (.claude/hooks/)

**When to use:** Errors that happen during git operations

**Examples:**
- File path mistakes → pre-tool-use.sh blocks wrong paths
- Commit ordering errors → pre-commit.sh validates submodule state
- Missing documentation → post-tool-use.sh reminds about updates

### Skills (.claude/skills/)

**When to use:** Complex workflows with repeated mistakes

**Examples:**
- Git navigation errors → /step-commit uses `git -C` pattern
- Multi-repo commits → /step-commit handles submodule-first workflow
- Documentation updates → /review-docs validates writing style

### CLAUDE.md Sections

**When to use:** Architectural patterns that need clear explanation

**Examples:**
- Repository structure → CLAUDE.md documents dual-repo architecture
- File locations → CLAUDE.md explains pwd verification requirement
- Terminology → CLAUDE.md maintains consistency standards

## Deletion Format

**CRITICAL:** Once automation exists, DELETE the entire entry from LEARNINGS.md.

**Do NOT condense or summarize entries.** Delete them completely.

**Example progression:**

```markdown
# Day 1: Entry added
## Git Directory Navigation: Always Check pwd First

Navigation to submodule failed with "No such file or directory" errors...

# Day 3: Automation implemented
[Hook created: .claude/hooks/pre-tool-use.sh]
[Skill updated: /step-commit uses git -C pattern]
[CLAUDE.md updated: Git Directory Navigation section]

# Day 5: Entry deleted
[Entry completely removed from LEARNINGS.md]
[Git history preserves: "Remove git navigation entry - now prevented by hook"]
```

**Why delete, not condense:**

- Git history preserves all context
- CLAUDE.md is the permanent documentation
- Condensed entries create maintenance burden
- Goal is empty LEARNINGS.md (header only)

## Execution Workflow

### Phase 1: Analysis

1. Read LEARNINGS.md
2. Count total lines
3. Identify entries by heading (##)
4. For each entry, extract:
   - Date (first occurrence)
   - Pattern description
   - Frequency indicators (mentions of "repeated", "again", multiple dates)
   - References to hooks/skills/CLAUDE.md

### Phase 2: Categorization

Categorize each entry:

- **HIGH PRIORITY - Needs Automation:** Repeated patterns without automation
- **DELETE - Has Automation:** Has automation, delete entire entry
- **DOCUMENT - Add to CLAUDE.md:** Not covered in CLAUDE.md, then delete
- **DELETE - Obsolete:** No longer relevant, delete immediately

### Phase 3: Recommendations

Present report:

```markdown
## LEARNINGS.md Review Report

**Current state:**
- Total lines: XXX (target: 3 lines - header only)
- Total entries: XX (target: 0 entries)
- Goal: Empty LEARNINGS.md with only header

**Categorization:**
- HIGH PRIORITY (needs automation): X entries
- DELETE (has automation): X entries
- DOCUMENT (add to CLAUDE.md, then delete): X entries
- DELETE (obsolete): X entries

**Recommendations:**

### HIGH PRIORITY - Implement Automation

1. **Entry: Pattern Name**
   - Pattern repeated multiple times
   - Recommendation: Create pre-tool-use hook to block [specific pattern]
   - Then: Delete entry from LEARNINGS.md

[List all high-priority items]

### DELETE - Has Automation

1. **Entry: Pattern Name**
   - Has automation: pre-commit.sh, /step-commit skill
   - Recommendation: Delete entire entry
   - Context preserved in git history

[List all deletion items]

### DOCUMENT - Add to CLAUDE.md

1. **Entry: Pattern Name**
   - Not in CLAUDE.md
   - Recommendation: Add section "Pattern Name" to CLAUDE.md
   - Then: Delete entry from LEARNINGS.md

[List all documentation items]

### DELETE - Obsolete Entries

1. **Entry: Pattern Name**
   - Pattern no longer occurs
   - Recommendation: Delete entry immediately

[List all obsolete items]
```

### Phase 4: Implementation

Ask user which recommendations to implement, then:

1. **For automation:**
   - Create or update hook file
   - Test hook with example scenario
   - Update CLAUDE.md to reference hook
   - Delete LEARNINGS.md entry completely

2. **For deletion (has automation):**
   - Verify automation exists and works
   - Delete entire entry from LEARNINGS.md
   - Commit with clear message referencing automation

3. **For documentation:**
   - Add section to CLAUDE.md
   - Verify CLAUDE.md is complete
   - Delete LEARNINGS.md entry completely

4. **For deletion (obsolete):**
   - Delete entry immediately
   - Commit with clear message explaining why obsolete

### Phase 5: Verification

After changes:

1. Verify LEARNINGS.md has only header (3 lines)
2. Report: "LEARNINGS.md now empty (header only) - all entries deleted"
3. Verify all automation exists and works
4. Test any new hooks created
5. Commit with message: "Remove [entries] - now prevented by [automation]"

## Example Usage

```bash
# Run weekly review
/learnings-review

# Review and implement all recommendations (delete all entries)
/learnings-review --auto-implement

# Review only (no changes)
/learnings-review --dry-run
```

## Success Criteria

After running this skill:

- ✅ LEARNINGS.md contains ONLY header (3 lines)
- ✅ All entries deleted
- ✅ High-priority patterns have automation
- ✅ CLAUDE.md updated with new sections
- ✅ Git history preserves all context
- ✅ Commit message explains what was deleted and why

## Important Notes

- **Delete, don't condense** - Git history preserves context, LEARNINGS.md should be empty
- **Test automation** - Always verify hooks/skills work before deleting entries
- **No dates in LEARNINGS.md** - Historical context belongs in git history
- **CLAUDE.md is permanent** - LEARNINGS.md is temporary capture only

## File Locations

- **LEARNINGS.md** - Root directory
- **Hooks** - `.claude/hooks/`
- **Skills** - `.claude/skills/`
- **CLAUDE.md** - Root directory
- **Archive** - `learnings-archive.md` (if created, in root directory)
