# Learnings

Critical insights for AI assistants working on this project. Focus: actionable guidance, not historical changelog.

---

## Repository Count References Must Be Generic

**Mistake discovered** (2026-01-19): Initially hardcoded specific repository counts ("TWO repositories", "5 submodules", "6 repositories") throughout documentation. This creates maintenance burden when repository structure evolves.

**What went wrong:** When discussing multi-repository architecture, used exact counts like "This workspace has TWO repositories" or "5 submodules". Repository structure will change over time (adding/removing submodules), requiring updates across many files.

**Correct approach:** Use generic, flexible terminology:

- ✅ "This workspace has MULTIPLE repositories (1 hub + submodules)"
- ✅ "Submodule repositories (currently 5, may change)"
- ✅ "Located in packages/ and outputs/"
- ❌ "This workspace has TWO repositories"
- ❌ "This workspace has 6 repositories"
- ❌ "5 submodule repositories"

**General principle:** Never be dogmatic about counts when discussing repositories, books, folders, or any evolving architecture. Use "multiple", "various", "several" with flexibility indicators like "currently N" or "may change".

**Applies to:**

- Repository structure (main + submodules)
- Book variants (Bible, Slim, future editions)
- Appendix counts (currently 12, may expand)
- Package structure (currently in packages/, may reorganize)

**Why this matters:** Documentation should be resilient to architectural evolution. Generic terminology prevents documentation debt.

---

## Skill Files Exclusion from Linting

CLAUDE.md explicitly states: "Never fix markdown linting issues in `.claude/skills/` files." Skill files have their own formatting requirements that may conflict with standard markdown rules. When you encounter linting warnings in skill files during manual editing, ignore them. The npm scripts exclude `.claude/` directory from linting via `--ignore .claude` flag.
