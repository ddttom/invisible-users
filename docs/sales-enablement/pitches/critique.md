# Repository Critique: `the-invisible-users`

**Date:** January 2026
**Scope:** Repository Root, `packages/bible`, `packages/dont-make-ai-think`

## 1. Executive Summary

This repository represents a sophisticated, mature, and highly structured project. It uniquely combines a publishing workflow (two book manuscripts) with a functional software product (`web-audit-suite`). The project demonstrates world-class documentation and "AI-Native" design principles. However, the package management architecture (specifically workspace integrity) and developer ergonomics (system dependencies) require attention to match the high quality of the content.

---

## 2. Repository Root & Architecture

### Strengths

* **World-Class Documentation**: The `README.md`, `LEARNINGS.md`, and `ONBOARDING.md` demonstrate high empathy for maintainers.
* **AI-Native**: `CLAUDE.md` and `AGENTS.md` effectively optimize the repo for AI consumption.
* **Modular Design**: Clear separation of concerns in `web-audit-suite` (`collectors`, `scorers`, `reporters`).
* **Testing Discipline**: Robust use of `mocha`, `chai`, `sinon`, and `esmock`.

### Critical Architecture Issues

* **Symlink & Submodule Complexity**:
  * Heavy use of symlinks (`books/` -> `packages/`) is fragile across different OS environments.
  * Submodules for `manuscript` and `outputs` raise the barrier to entry (risk of detached heads).
* **System Dependencies**: The build pipeline relies on host-system tools (`pandoc`, `imagemagick`), creating a "works on my machine" friction.
* **Lack of TypeScript**: The complex domain logic in `web-audit-suite` is written in plain JS, missing the safety of static analysis.

---

## 3. Package: `packages/bible` (The Bible)

### Status: Mature but technically incomplete

### Strengths (Bible)

* **Content Maturity**: Exceptional quality, future-dated consistency, and complete chapter files.
* **Naming Conventions**: Solid file numbering (`chapter-00`, `chapter-01`) ensures correct sorting.

### Critical Issues (Bible)

* **🔴 Missing `package.json`**: This directory is not a valid NPM workspace package.
* **Build Fragility**: Build scripts are hoisted to the root `package.json`. Running builds from within the directory is impossible, and dependency management is opaque.

---

## 4. Package: `packages/dont-make-ai-think` (Slim Guide)

### Status: Needs Remediation

### Critical Issues (Slim Guide)

* **🔴 Missing `package.json`**: Like the Bible package, this is not a valid workspace.
* **🔴 File Naming Typo**: `chapter-05-metadata-that-works .md` has a trailing space, which will break automation.
* **🔴 Missing Content**: The README claims "Complete and ready," but Chapter 8 is missing entirely, and files skip from 07 to 09.
* **Identity Crisis**: Chapter 1 is titled "The Invisible Users" (the wrong book title).

---

## 5. Consolidated Recommendations

1. **Formalize Workspaces**: Add `package.json` files to both book packages. Move book-specific build scripts into these packages.
2. **Containerize Builds**: Create a `Dockerfile` or `.devcontainer` that pre-installs `pandoc` and `imagemagick` to standardize the build environment.
3. **Fix "Slim" Guide**: Rename the Chapter 5 file, write or cut Chapter 8, and fix the Chapter 1 title.
4. **Consider TypeScript**: For the next major Refactor of `web-audit-suite`, adopt TypeScript to harden the implementation against regression.
