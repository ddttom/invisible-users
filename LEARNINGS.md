# Learnings

Critical insights for AI assistants working on this book project. Focus: actionable guidance, not historical changelog.

---

## Pandoc Resource Paths

**Rule** (2026-01-07): When moving manuscript files to subdirectories, pandoc's `--resource-path` must be updated to match the new location. After moving chapters from `invisible-users/` to `invisible-users/manuscript/`, the PDF build failed to find illustrations because `--resource-path=invisible-users` was looking at the wrong level. Always update `--resource-path` to point to the directory containing the manuscript files when restructuring directories.
