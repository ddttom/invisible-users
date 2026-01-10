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

**Rule** (2026-01-10): Made multiple errors trying to navigate to submodule directory with `cd invisible-users/manuscript` resulting in "No such file or directory" errors. The fix is simple: **always run `pwd` first** to check current working directory before attempting navigation. This repository has a git submodule at `invisible-users/manuscript/` which can be accessed from root, but if you're already inside the submodule directory, further `cd` attempts will fail. **Check `pwd`, then use correct relative or absolute paths.** When working with submodules, verify current location before every directory change.
