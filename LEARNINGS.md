# Learnings

Critical insights for AI assistants working on this project. Focus: actionable guidance, not historical changelog.

---

## WCAG Accessibility

**Redundant ARIA Roles** (2026-01-22): Tried adding `role="complementary"` to `<aside>` element, but this breaks HTML validation with "Redundant role" error. Always omit explicit roles on semantic HTML5 elements that have implicit ARIA roles (`<aside>` already has `role="complementary"` implicitly).

**Link Color Contrast** (2026-01-22): Tried using `#3498db` for link color, but this fails WCAG AA contrast requirement (3.14:1 ratio on white background). Always use `#0066cc` or darker for links on white backgrounds (4.58:1 ratio, passes AA). Test all colors with contrast checkers before deployment.

**Object Alternative Text** (2026-01-22): Tried using `aria-label` attribute on `<object>` elements for SVG diagrams, but this triggers html-validate's "aria-label-misuse" warning. Always use native HTML `title` attribute on `<object>` elements to provide alternative text for screen readers (satisfies Deque object-alt rule without validation warnings).

## HTML Post-Processing

**Table Caption Processing Order** (2026-01-22): Tried processing table captions before converting SVG placeholders to `<figure>` elements, but Pattern 3 (extract figcaption for table caption) failed because figcaptions didn't exist yet in the HTML. Always process SVG placeholder conversion BEFORE table caption extraction - the order matters for patterns that depend on generated HTML structure.

## Markdown Editing

**Code Block Global Replace** (2026-01-23): Tried using global search/replace to modify text in markdown files, but this broke code block syntax by changing closing triple-backtick markers to triple-backtick-text for language-specific blocks (html, javascript, etc.). This broke PDF generation and required manual fixes across 100+ code blocks in 15 files. Always use targeted edits with Edit tool or context-aware Python scripts that track code block state. Never use sed/awk global replace on markdown files without code block awareness.

**Markdown Lint Auto-Fix in Submodules** (2026-01-25): Tried running `npm run lint:markdown:fix` which modified files in READ-ONLY submodules (packages/sales-enablement), violating repository policy. The npm script includes `packages/sales-enablement/**/*.md` in its glob pattern without respecting the READ-ONLY policy. Always revert auto-fix changes in READ-ONLY submodules using `git -C packages/sales-enablement restore .` after running linter. Consider updating npm script to exclude READ-ONLY submodules from markdown linting.
