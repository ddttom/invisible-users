---
title: "MX-Compliant CSS Specification"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Specification for Machine Experience (MX) compliant CSS files. Defines documentation, WCAG compliance, naming conventions, and accessibility requirements."
keywords: [mx-compliance, css, wcag, accessibility, design-tokens, responsive-design]
ai-instruction: |
  This document defines compliance requirements for MX-certified CSS files.
  The specification covers accessibility, documentation, and maintainability.
  Use this as a checklist when writing or reviewing CSS.
---

# MX-Compliant CSS Specification

Requirements for Machine Experience (MX) certified CSS files.

## Overview

This specification defines the structure, documentation, and accessibility requirements for CSS files in an MX-compliant system. CSS directly impacts accessibility - from colour contrast to focus indicators to responsive design.

**Scope:** Any CSS file (.css) or preprocessor file (.scss, .less, .sass) that:

- Styles user interface components
- Defines visual appearance
- Controls layout and responsiveness
- Manages interactive states
- Supports accessibility features

**Core Principle:** CSS must ensure content is perceivable and operable for all users, including those using assistive technologies, and must not interfere with AI agent content extraction.

## File Header Documentation

Every CSS file must begin with a documentation header.

### Standard File Header

```css
/**
 * @file Component Styles
 * @description Styles for the navigation component including
 *              responsive behavior and accessibility states.
 * @author Author Name
 * @version 1.0.0
 *
 * @accessibility
 * - All interactive elements have visible focus states
 * - Colour contrast meets WCAG 2.1 AA (4.5:1 minimum)
 * - Motion respects prefers-reduced-motion
 *
 * @ai-instruction
 * These styles support semantic HTML structure.
 * State classes mirror data-* attributes for consistency.
 * Do not rely on visual appearance alone - check HTML attributes.
 *
 * Table of Contents:
 * 1. Custom Properties (Design Tokens)
 * 2. Base Styles
 * 3. Component Styles
 * 4. State Styles
 * 5. Responsive Styles
 * 6. Print Styles
 * 7. Accessibility Utilities
 */
```

### Required Header Fields

| Field | Required | Description |
|-------|----------|-------------|
| `@file` | Yes | File name or component name |
| `@description` | Yes | Purpose and scope of styles |
| `@author` | Yes | Author or team name |
| `@version` | Yes | Semantic version |
| `@accessibility` | Yes | Key accessibility features |
| `@ai-instruction` | Yes | Guidance for AI agents |

## Custom Properties (Design Tokens)

### Colour Tokens

Define colours as custom properties with documented contrast ratios:

```css
/**
 * Colour Design Tokens
 * All colours are WCAG 2.1 AA compliant when used as documented.
 *
 * @accessibility Contrast ratios documented for each pairing.
 */
:root {
  /* Primary Palette */
  --color-primary: #0066cc;        /* 7.3:1 on white */
  --color-primary-dark: #004d99;   /* 9.5:1 on white */
  --color-primary-light: #3399ff;  /* 3.1:1 on white (large text only) */

  /* Neutral Palette */
  --color-text: #1a1a1a;           /* 16.7:1 on white */
  --color-text-muted: #666666;     /* 5.7:1 on white */
  --color-background: #ffffff;
  --color-surface: #f5f5f5;
  --color-border: #cccccc;         /* 1.6:1 - decorative only */

  /* Semantic Colours */
  --color-success: #008000;        /* 5.1:1 on white */
  --color-warning: #b36200;        /* 4.5:1 on white */
  --color-error: #cc0000;          /* 6.6:1 on white */
  --color-info: #0066cc;           /* 7.3:1 on white */

  /* Focus Colour */
  --color-focus: #0066cc;          /* Used for focus outlines */
  --color-focus-ring: rgba(0, 102, 204, 0.25);
}
```

### Typography Tokens

```css
/**
 * Typography Design Tokens
 *
 * @accessibility
 * - Base font size is 16px (1rem) for readability
 * - Line heights ensure adequate spacing for readability
 * - Font weights include sufficient range for emphasis
 */
:root {
  /* Font Families */
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
               Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'Courier New', Consolas, Monaco, monospace;

  /* Font Sizes (rem-based for accessibility) */
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-base: 1rem;    /* 16px */
  --font-size-lg: 1.125rem;  /* 18px - large text threshold */
  --font-size-xl: 1.5rem;    /* 24px */
  --font-size-2xl: 2rem;     /* 32px */
  --font-size-3xl: 2.5rem;   /* 40px */

  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-base: 1.6;
  --line-height-relaxed: 1.75;

  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
}
```

### Spacing Tokens

```css
/**
 * Spacing Design Tokens
 * Based on 4px (0.25rem) grid system.
 */
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.5rem;   /* 24px */
  --space-6: 2rem;     /* 32px */
  --space-8: 3rem;     /* 48px */
  --space-10: 4rem;    /* 64px */
}
```

## WCAG 2.1 AA Compliance

### Colour Contrast Requirements

```css
/**
 * WCAG 2.1 AA Contrast Requirements
 *
 * Normal text (< 18pt / < 14pt bold): 4.5:1 minimum
 * Large text (≥ 18pt / ≥ 14pt bold): 3:1 minimum
 * UI components and graphics: 3:1 minimum
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum
 */

/* Body text - 16.7:1 contrast ratio */
body {
  color: var(--color-text);           /* #1a1a1a */
  background-color: var(--color-background); /* #ffffff */
}

/* Links - 7.3:1 contrast ratio */
a {
  color: var(--color-primary);        /* #0066cc */
}

/* Muted text - only for non-essential content */
.text-muted {
  color: var(--color-text-muted);     /* #666666 - 5.7:1 */
}

/* Large text can use lower contrast (3:1 minimum) */
.heading-decorative {
  color: var(--color-primary-light);  /* #3399ff - 3.1:1 */
  font-size: var(--font-size-lg);     /* Must be ≥18px */
}
```

### Focus Indicators

All interactive elements must have visible focus indicators:

```css
/**
 * Focus Styles
 *
 * @accessibility
 * - Focus indicators are always visible (never display: none)
 * - Focus ring has minimum 3:1 contrast against adjacent colors
 * - Focus style is consistent across all interactive elements
 */

/* Base focus style - works on any background */
:focus {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* Enhanced focus for keyboard users */
:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
  box-shadow: 0 0 0 6px var(--color-focus-ring);
}

/* Remove default outline only when custom style provided */
:focus:not(:focus-visible) {
  outline: none;
}

/* Link focus */
a:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  text-decoration: underline;
}

/* Button focus */
button:focus-visible,
[role="button"]:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
  box-shadow: 0 0 0 6px var(--color-focus-ring);
}

/* Input focus */
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 0;
  border-color: var(--color-focus);
}

/* CRITICAL: Never do this */
/* :focus { outline: none; } ← WCAG failure */
```

### Motion and Animation

Respect user preferences for reduced motion:

```css
/**
 * Motion Preferences
 *
 * @accessibility
 * - All animations respect prefers-reduced-motion
 * - Essential animations (like loading spinners) use subtle alternatives
 * - No animations auto-play for more than 5 seconds
 */

/* Default transitions */
.animated {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Reduced motion: disable or minimize animations */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Keep essential state indicators, just remove motion */
  .loading-spinner {
    animation: none;
    /* Use pulsing opacity instead of rotation */
    opacity: 0.7;
  }
}

/* Safe animation example */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fade-in 0.3s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .fade-in {
    animation: none;
    opacity: 1;
  }
}
```

## State Styling

### Data Attribute States

Style states using `data-*` attributes that AI agents can read:

```css
/**
 * State Styles
 *
 * @ai-instruction
 * State is determined by data-* attributes, not CSS classes.
 * Always check the data attribute, not visual appearance.
 */

/* Loading state */
[data-loading="true"] {
  opacity: 0.6;
  pointer-events: none;
}

[data-loading="true"]::after {
  content: "";
  /* Loading spinner styles */
}

/* Error state */
[data-error="true"] {
  border-color: var(--color-error);
}

[data-error="true"]::before {
  content: "⚠";
  color: var(--color-error);
}

/* Success state */
[data-success="true"] {
  border-color: var(--color-success);
}

/* Disabled state */
[data-disabled="true"],
[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Expanded/collapsed state */
[data-expanded="true"] > .icon-chevron {
  transform: rotate(180deg);
}

[data-expanded="false"] > .content {
  display: none;
}

/* Form validation states */
[data-validation="valid"] {
  border-color: var(--color-success);
}

[data-validation="invalid"] {
  border-color: var(--color-error);
}

[data-validation="pending"] {
  border-color: var(--color-warning);
}
```

### ARIA State Styling

Style ARIA attributes for accessibility:

```css
/**
 * ARIA State Styles
 *
 * @accessibility
 * These styles reflect ARIA state attributes for consistency
 * between visual appearance and assistive technology.
 */

/* Busy/loading state */
[aria-busy="true"] {
  opacity: 0.7;
  cursor: wait;
}

/* Disabled state */
[aria-disabled="true"] {
  opacity: 0.5;
  pointer-events: none;
}

/* Expanded/collapsed */
[aria-expanded="true"] .expand-icon {
  transform: rotate(180deg);
}

/* Selected state */
[aria-selected="true"] {
  background-color: var(--color-primary);
  color: white;
}

/* Current page/step */
[aria-current="page"],
[aria-current="step"] {
  font-weight: var(--font-weight-bold);
  border-bottom: 2px solid var(--color-primary);
}

/* Invalid input */
[aria-invalid="true"] {
  border-color: var(--color-error);
  box-shadow: 0 0 0 1px var(--color-error);
}

/* Hidden content (don't display) */
[aria-hidden="true"] {
  display: none;
}
```

## Responsive Design

### Breakpoint System

```css
/**
 * Responsive Breakpoints
 *
 * Mobile-first approach: base styles for mobile,
 * progressively enhanced for larger screens.
 *
 * @accessibility
 * Content remains readable at 200% zoom.
 * Touch targets are minimum 44x44px on mobile.
 */
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}

/* Mobile first (base styles) */
.container {
  padding: var(--space-4);
  max-width: 100%;
}

/* Small screens and up */
@media (min-width: 640px) {
  .container {
    padding: var(--space-5);
  }
}

/* Medium screens and up */
@media (min-width: 768px) {
  .container {
    padding: var(--space-6);
    max-width: 720px;
    margin-inline: auto;
  }
}

/* Large screens and up */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}

/* Extra large screens and up */
@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
}
```

### Touch Target Sizes

```css
/**
 * Touch Target Sizes
 *
 * @accessibility
 * WCAG 2.1 requires 44x44px minimum touch targets.
 * We use 48x48px for better usability.
 */

/* Ensure minimum touch target size */
button,
[role="button"],
a,
input[type="checkbox"],
input[type="radio"],
select {
  min-height: 44px;
  min-width: 44px;
}

/* Icon buttons need explicit sizing */
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 0;
}

/* Small text links need larger tap area */
.nav-link {
  display: inline-block;
  padding: var(--space-3) var(--space-4);
  /* Creates larger touch target without visual change */
}
```

## Print Styles

```css
/**
 * Print Styles
 *
 * @accessibility
 * Print styles ensure content is readable when printed,
 * with appropriate contrast and removed interactive elements.
 */
@media print {
  /* Reset colors for print */
  * {
    color: #000 !important;
    background: #fff !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }

  /* Show link URLs */
  a[href]::after {
    content: " (" attr(href) ")";
    font-size: 0.875em;
    color: #666;
  }

  /* Don't show URLs for internal links */
  a[href^="#"]::after,
  a[href^="javascript:"]::after {
    content: "";
  }

  /* Hide non-essential elements */
  nav,
  aside,
  .no-print,
  button,
  [role="button"],
  input,
  select,
  textarea {
    display: none !important;
  }

  /* Prevent page breaks inside important elements */
  h1, h2, h3, h4, h5, h6,
  img, figure, table, pre {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Keep headings with following content */
  h1, h2, h3, h4, h5, h6 {
    page-break-after: avoid;
    break-after: avoid;
  }

  /* Ensure images fit on page */
  img {
    max-width: 100% !important;
    height: auto !important;
  }
}
```

## Accessibility Utilities

### Screen Reader Only

```css
/**
 * Screen Reader Utilities
 *
 * @accessibility
 * Content hidden visually but available to screen readers.
 */

/* Visually hidden but accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Allow element to be focusable when navigated to */
.sr-only-focusable:focus,
.sr-only-focusable:active {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: inherit;
}

/* Skip link pattern */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: var(--space-2) var(--space-4);
  z-index: 100;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}
```

### High Contrast Mode

```css
/**
 * High Contrast Mode Support
 *
 * @accessibility
 * Supports Windows High Contrast Mode and forced-colors.
 */
@media (forced-colors: active) {
  /* Ensure focus is visible */
  :focus {
    outline: 3px solid CanvasText;
  }

  /* Preserve important borders */
  button,
  input,
  select,
  textarea {
    border: 1px solid CanvasText;
  }

  /* Mark required fields */
  [aria-required="true"] {
    border-color: Highlight;
  }

  /* Error states */
  [aria-invalid="true"] {
    border-color: LinkText;
    border-width: 2px;
  }
}
```

## Naming Conventions

### BEM-Style Classes

```css
/**
 * Naming Convention: BEM (Block Element Modifier)
 *
 * Block: .component-name
 * Element: .component-name__element
 * Modifier: .component-name--modifier
 *
 * @ai-instruction
 * Class names follow BEM convention for predictable structure.
 * State is expressed via data-* attributes, not class modifiers.
 */

/* Block */
.card {
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: var(--space-4);
}

/* Element */
.card__header {
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-4);
}

.card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.card__body {
  line-height: var(--line-height-base);
}

.card__footer {
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}

/* Modifier */
.card--featured {
  border-color: var(--color-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card--compact {
  padding: var(--space-2);
}

/* State via data attributes (preferred over class modifiers) */
.card[data-loading="true"] {
  opacity: 0.6;
}
```

## Validation Checklist

### File-Level Requirements

- [ ] File header with `@file` and `@description`
- [ ] `@author` and `@version` specified
- [ ] `@accessibility` section documenting key features
- [ ] `@ai-instruction` for AI agent guidance
- [ ] Table of contents for files > 200 lines
- [ ] Custom properties section at top of file

### Colour and Contrast

- [ ] All text colours have documented contrast ratios
- [ ] Normal text: 4.5:1 minimum contrast
- [ ] Large text: 3:1 minimum contrast
- [ ] UI components: 3:1 minimum contrast
- [ ] No colour as sole indicator of state

### Focus and Interaction

- [ ] All focusable elements have visible focus indicator
- [ ] Focus indicator has 3:1 contrast minimum
- [ ] No `outline: none` without replacement style
- [ ] `:focus-visible` used for keyboard focus
- [ ] Touch targets minimum 44x44px

### Motion and Animation

- [ ] `prefers-reduced-motion` media query present
- [ ] Animations disabled or reduced for reduced motion
- [ ] No auto-playing animations > 5 seconds
- [ ] Essential animations have non-motion alternative

### State and Data Attributes

- [ ] States styled via `data-*` attributes
- [ ] ARIA states (`aria-expanded`, etc.) styled
- [ ] Loading states have visual indicator
- [ ] Error states use more than just colour

### Responsive and Print

- [ ] Mobile-first breakpoint approach
- [ ] Content readable at 200% zoom
- [ ] Print styles hide interactive elements
- [ ] Print styles show link URLs

## Certification Levels

### Level 1: MX Basic

- File header with required fields
- Custom properties for colours
- Basic focus styles
- WCAG 2.1 AA contrast compliance

### Level 2: MX Standard

- All Level 1 requirements
- Complete design token system
- `prefers-reduced-motion` support
- Data attribute state styling
- Print stylesheet
- BEM or consistent naming convention

### Level 3: MX Advanced

- All Level 2 requirements
- Comprehensive accessibility utilities
- High contrast mode support
- Dark mode support with `prefers-color-scheme`
- CSS custom properties for theming
- Automated accessibility testing integration

## Related Documentation

- **[mx-compliance.md](./mx-compliance.md) ("MX-Compliant Webpage Specification" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/mx-compliance.md>)** - Webpage output requirements
- **[mx-compliance-javascript.md](./mx-compliance-javascript.md) ("MX-Compliant JavaScript Specification" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/mx-compliance-javascript.md>)** - JavaScript requirements
- **WCAG 2.1 Guidelines** - https://www.w3.org/WAI/WCAG21/quickref/
- **Contrast Checker** - https://webaim.org/resources/contrastchecker/
- **CSS Custom Properties** - https://developer.mozilla.org/en-US/docs/Web/CSS/--*

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-27 | Initial specification |
