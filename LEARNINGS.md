# Learnings

Critical insights for AI assistants working on this project. Focus: actionable guidance, not historical changelog.

---

## WCAG Accessibility

**Redundant ARIA Roles** (2026-01-22): Tried adding `role="complementary"` to `<aside>` element, but this breaks HTML validation with "Redundant role" error. Always omit explicit roles on semantic HTML5 elements that have implicit ARIA roles (`<aside>` already has `role="complementary"` implicitly).

**Link Color Contrast** (2026-01-22): Tried using `#3498db` for link color, but this fails WCAG AA contrast requirement (3.14:1 ratio on white background). Always use `#0066cc` or darker for links on white backgrounds (4.58:1 ratio, passes AA). Test all colors with contrast checkers before deployment.
