# Learnings

Critical insights for AI assistants working on this book project. Focus: actionable guidance, not historical changelog.

---

## File Location: Always Check Root Directory First

**Rule** (2026-01-09): Tried to find LEARNINGS.md by searching subdirectories and checking if it existed in various locations, but the user pointed out "learnings.md is here @LEARNINGS.md this is one more eror to add, you did not look in the root." When looking for project-level files like LEARNINGS.md, README.md, CLAUDE.md, always check the root directory first before searching subdirectories. The root directory is where project-level documentation lives.

## Marketing Metrics from Company Announcements

**Rule** (2026-01-09): Tried using real Microsoft metrics (2x, 53%, 7x) from official announcements to demonstrate "measurable business impact," but CLAUDE.md explicitly forbids concrete percentages in marketing materials and the user correctly noted these "feel false to readers." Even when metrics come from real company announcements, they are unverifiable marketing claims, not independent research. Always replace specific percentages with qualitative statements like "Microsoft reports improved conversion rates (though unvalidated)" plus verifiable facts (dates, company names, partner retailers). Marketing percentages feel like hype regardless of source.

## Book Publication Status

**Rule** (2026-01-10): Updated publication date from "Due Q1 2026" to "Published January 2026" across materials, but the book is actually still in review, not yet published. Q1 2026 (Due Q1 2026) is correct. Never assume publication status - the book remains "Due Q1 2026" until the user explicitly confirms publication. Publication timing is the user's decision, not something to infer from current date.

## Git Directory Navigation: Always Check pwd First

**Rule** (2026-01-10): Made multiple errors trying to navigate to submodule directory with `cd packages/manuscript/manuscript` resulting in "No such file or directory" errors. The fix is simple: **always run `pwd` first** to check current working directory before attempting navigation. This repository has a git submodule at `packages/manuscript/manuscript/` which can be accessed from root, but if you're already inside the submodule directory, further `cd` attempts will fail. **Check `pwd`, then use correct relative or absolute paths.** When working with submodules, verify current location before every directory change.

**CRITICAL AVOIDANCE TACTIC** (2026-01-10): This error was repeated despite being documented in both LEARNINGS.md and CLAUDE.md. The mistake is attempting to access `.claude/skills/news/` files without first checking working directory. Two repositories exist in this workspace:

1. **Main repo:** `/Users/tomcranstoun/Documents/GitHub/invisible-users/` (contains `.claude/skills/news/`)
2. **Submodule:** `/Users/tomcranstoun/Documents/GitHub/invisible-users/packages/manuscript/manuscript/` (does NOT contain `.claude/skills/`)

**Before accessing ANY `.claude/` files:**

1. Run `pwd` FIRST
2. If in submodule (`/packages/manuscript/manuscript/`), use `../../../.claude/skills/news/`
3. If in root (`/invisible-users/`), use `.claude/skills/news/`

**Pattern to avoid:** Assuming file paths without checking location. Always verify with `pwd` before file operations in repos with submodules.

## Cross-Manuscript News Integration: Search All Relevant Chapters

**Rule** (2026-01-10): Added ACP (Agentic Commerce Protocol) news to blog and Appendix J through `/news` skill, but user asked "can acp fit anywhere else in the manuscript" - revealing that major developments should be cross-referenced throughout relevant chapters, not just added to news appendices. When adding verified industry news, search for all chapters that discuss related concepts (e.g., "identity delegation", "open standard", "proprietary platform") and update each location to acknowledge the development. Chapter 4 (business implications) and Chapter 11 (identity layer) both had "doesn't exist yet" statements that needed updating to "now exists as ACP". Major developments validate or challenge multiple chapters - cross-reference comprehensively.

## Duplicate Headings Cannot Be Ignored

**Rule** (2026-01-10): GitHub Actions failed with MD024 error: "Multiple headings with the same content" in CHANGELOG.md where two entries both used `### Added - 2026-01-10`. MD024 (no-duplicate-heading) is a critical linting rule that cannot be disabled or ignored - duplicate headings break CI/CD and must be fixed by making headings unique with contextual information. **Fix duplicate headings by adding descriptive context**, not by disabling linting rules. Example: Change both `### Added - 2026-01-10` to `### Added - Publication Status and Documentation (2026-01-10)` and `### Added - Web Pages and HTML Enhancement Pipeline (2026-01-10)`. This pattern applies to all documentation files: CHANGELOG.md, README.md, chapter files. Always make headings unique by adding what distinguishes them.

## Pre-Tool-Use Hook for Wrong Repository Detection

**Rule** (2026-01-10): Despite documentation in CLAUDE.md and LEARNINGS.md about checking `pwd` before file operations, the `.claude/` path error was repeated multiple times during the FAQ schema implementation session. The pattern: attempting to access `.claude/skills/news/` or other `.claude/` files without verifying current directory, resulting in "No such file or directory" errors when in the submodule.

**Solution Implemented**: Enhanced `.claude/hooks/pre-tool-use.sh` to:

1. **Detect .claude/ path mistakes** - If attempting to access `.claude/*` from submodule directory, the hook now BLOCKS the operation (exit 1) with clear error message showing:
   - Current directory
   - Attempted path
   - Fix options (absolute path, navigate to main repo, or relative path)

2. **Reduced reminder threshold** - Changed from 5 tool uses to 3 before showing pwd reminder, making location checks more frequent

3. **Absolute state file path** - Changed from relative `.claude/.pwd-check-state` to absolute `/Users/tomcranstoun/Documents/GitHub/invisible-users/.claude/.pwd-check-state` to work from any directory

**Key insight**: Documentation alone is insufficient for preventing repeated mistakes. Automated enforcement through hooks is necessary for complex repository structures with submodules. The hook now catches the mistake BEFORE it happens rather than relying on post-error documentation.

## Step-Commit Submodule Path Error

**Rule** (2026-01-12): During the `/step-commit` workflow, attempted to navigate to submodule with `cd packages/manuscript/manuscript && pwd && git add -A`, which failed with "No such file or directory" error. This repeated the submodule path mistake AGAIN despite:

1. Existing documentation in LEARNINGS.md (entries above)
2. Existing documentation in CLAUDE.md ("Git Directory Navigation" section)
3. Automated enforcement in `.claude/hooks/pre-tool-use.sh`

**What happened**: During the commit phase of `/step-commit`, I tried to stage manuscript changes by changing directory to the submodule. The working directory was already at `/Users/tomcranstoun/Documents/GitHub/invisible-users` and the path `packages/manuscript/manuscript` doesn't exist as a relative path when already inside the submodule because the submodule is already initialized and appears as a normal directory.

**Correct approach**: Simply use `git add -A` from the current directory without attempting to navigate. Git is already aware of the submodule and will stage changes correctly from the root.

**Pattern**: This error occurs specifically during git workflows (commits, staging) when trying to "navigate to" the submodule instead of treating it as part of the current repository tree. The fix is always: check `pwd` first, then use git commands from current location.

**Enforcement needed**: The hooks catch `.claude/` file access mistakes but do NOT catch incorrect navigation attempts during git operations. Consider adding detection for `cd packages/manuscript/manuscript` patterns during git workflows.

## Submodule Pointer Update After Push

**Rule** (2026-01-12): After successfully pushing submodule commits to the manuscript repository, attempted to push main repository changes, but forgot the critical step of committing the updated submodule pointer in the main repository. User correctly identified: "i think the submodule pointer needs commit and push". When you push commits to a submodule, the parent repository still points to the old submodule commit hash. You MUST:

1. Push submodule commits first: `cd packages/manuscript/manuscript && git push origin main`
2. Return to main repository: `cd /path/to/main/repo`
3. Commit submodule pointer update: `git add packages/manuscript/manuscript && git commit -m "Update manuscript submodule pointer"`
4. Push main repository: `git push origin <branch>`

**Pattern**: After ANY submodule push, the parent repository needs a commit to update the pointer. Git shows this as `modified: packages/manuscript/manuscript (new commits)` in git status. The hooks remind about this, but you still need to execute the steps. This is a two-step process that cannot be skipped.

## Accessibility: WCAG Contrast Requirements Keep Being Violated

**Rule** (2026-01-12): Created news.html page with a "Subscribe to Updates" button that had poor contrast - blue text (`#2563eb`) on blue background (`#eff6ff` box), making it nearly invisible to users. User provided screenshot showing the button was unreadable and noted "You are not following the guidance about readability or contrast." This violates WCAG AA requirements that the book itself emphasizes throughout (especially in preface and Chapter 8).

**The pattern of repeated violations**:

1. **Preface example** (lines 19-21): Book explicitly warns about using `opacity: 0.9` on header text - it failed WCAG contrast for sighted humans while working fine for agents
2. **News.html button**: Used `#2563eb` blue text on light blue background - insufficient contrast, nearly invisible
3. **This keeps happening**: Despite the book being about accessibility and agent compatibility, I repeatedly create interfaces that fail basic WCAG contrast requirements

**WCAG AA contrast minimums**:
- Normal text: 4.5:1 contrast ratio
- Large text (18pt+ or 14pt+ bold): 3:1 contrast ratio
- UI components: 3:1 contrast ratio

**Common violations to avoid**:
- Blue text on blue backgrounds (any shade variation)
- Light grey text on white backgrounds
- Colored text on colored backgrounds without checking contrast
- Using opacity for visual effects without verifying final contrast

**Fix pattern**: Always use explicit colors meeting contrast ratios:
- Button: Dark background (`#1e40af`) + white text (`#ffffff`) = good contrast
- Links: Use darker blue (`#2563eb`) on white background = good contrast
- Never assume color combinations are accessible - verify with contrast checker

**Why this matters for THIS book**: The entire preface uses the `opacity: 0.9` mistake as a teaching example - "I'd built an AI-friendly interface that excluded people with low vision, exactly the pattern the book warns against." The book explicitly states "Both matter. Neither is optional. We can't optimise for one group whilst neglecting another." Yet I keep violating this principle when creating web pages for the book project itself.

**Enforcement needed**: Before creating any HTML/CSS, verify all text/background color combinations meet WCAG AA contrast requirements. Use browser DevTools or online contrast checkers. This applies to buttons, links, headers, body text, and all UI components.

**Hook implemented** (2026-01-12): Created `.claude/hooks/check-html-contrast.sh` that runs during pre-commit to detect common contrast violations:
- Blue text on blue backgrounds
- Light grey text (may fail 4.5:1 ratio)
- Opacity usage (known to reduce contrast)
- Buttons without explicit background/color

The hook blocks commits with violations and provides guidance on fixing them, including links to contrast checkers and references to the book's own examples. Integrated into `.claude/hooks/pre-commit.sh` to run automatically.
