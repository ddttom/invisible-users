# Learnings

Critical insights for AI assistants working on this book project. Focus: actionable guidance, not historical changelog.

---

## Suppressing Sections from Pandoc TOC

**Rule** (2026-01-08): To completely remove a section and its subsections from the pandoc table of contents requires BOTH pandoc attributes AND LaTeX commands. Tried using only `{.unnumbered .unlisted}` which removed the main heading but left subsections (A, B, C, etc.) visible in TOC. The complete solution for Glossary suppression is:

```markdown
# Glossary of Terms {.unnumbered .unlisted}

\addtocontents{toc}{\protect\setcounter{tocdepth}{0}}
```

The pandoc attributes remove the main heading from TOC, but the `\addtocontents` command is required to suppress subsections. This took multiple attempts to discover the correct combination.

## Pandoc Resource Paths

**Rule** (2026-01-07): When moving manuscript files to subdirectories, pandoc's `--resource-path` must be updated to match the new location. After moving chapters from `invisible-users/` to `invisible-users/manuscript/`, the PDF build failed to find illustrations because `--resource-path=invisible-users` was looking at the wrong level. Always update `--resource-path` to point to the directory containing the manuscript files when restructuring directories.
