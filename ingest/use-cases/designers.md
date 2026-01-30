---
title: "MX Compliance for Designers"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Guide for UX/UI designers on creating MX-compliant interfaces that work for both human users and AI agents."
keywords: [designers, mx-compliance, ux-design, ui-design, accessibility, wcag, semantic-design]
audience: "Designers"
ai-instruction: |
  This document is written for UX/UI designers creating interfaces for MX-compliant systems.
  Focus on design patterns, accessibility requirements, visual hierarchy, and component
  design that supports both human and AI agent users.
---

# MX Compliance for Designers

A guide for designing AI-ready, accessible interfaces.

## The Design Challenge

You're now designing for two audiences:

| Human Users | AI Agents |
|-------------|-----------|
| See visual hierarchy | Parse semantic structure |
| Infer meaning from layout | Read explicit metadata |
| Understand visual cues | Need data attributes |
| Adapt to ambiguity | Fail on ambiguity |

**The good news:** Designing for AI agents improves accessibility. The same patterns help screen reader users, keyboard navigators, and users with cognitive disabilities.

## The Convergence Principle

```text
Good for AI Agents = Good for Accessibility = Good for Everyone
```

When you design with explicit structure and clear semantics:

- AI agents can parse and understand content
- Screen readers can navigate effectively
- Keyboard users can interact efficiently
- All users benefit from clarity

## Semantic Visual Hierarchy

### Structure Must Match Appearance

Visual hierarchy must match HTML semantic structure:

```text
VISUAL DESIGN          HTML STRUCTURE
─────────────          ──────────────

┌─────────────────┐    <h1>
│ Page Title      │    Page Title
│ (largest)       │    </h1>
└─────────────────┘

┌─────────────────┐    <h2>
│ Section Heading │    Section Heading
│ (large)         │    </h2>
└─────────────────┘

┌─────────────────┐    <h3>
│ Subsection      │    Subsection
│ (medium)        │    </h3>
└─────────────────┘
```

**Anti-pattern:** Using font size for visual effect without semantic meaning.

```text
❌ WRONG: <p class="big-text">Not a real heading</p>
✓ RIGHT: <h2>Actual section heading</h2>
```

### One H1 Per Page

Every page needs exactly one H1 that describes the page content:

```text
┌─────────────────────────────────────┐
│ Site Logo        Navigation         │ ← header (not H1)
├─────────────────────────────────────┤
│                                     │
│  ╔═══════════════════════════════╗  │
│  ║   Product Name                ║  │ ← H1
│  ╚═══════════════════════════════╝  │
│                                     │
│  Description                        │ ← H2
│  ─────────────                      │
│  Product description text...        │
│                                     │
│  Features                           │ ← H2
│  ────────                           │
│  • Feature 1                        │
│  • Feature 2                        │
│                                     │
└─────────────────────────────────────┘
```

## Colour and Contrast

### WCAG 2.1 AA Requirements

| Text Type | Minimum Contrast | Example |
|-----------|-----------------|---------|
| Normal text (< 18px) | 4.5:1 | Body copy |
| Large text (≥ 18px or ≥ 14px bold) | 3:1 | Headings |
| UI components | 3:1 | Buttons, inputs |

### Colour Palette Design

Design your palette with contrast in mind:

```text
PRIMARY PALETTE
───────────────
Background: #FFFFFF
Text:       #1A1A1A  (16.7:1 on white) ✓
Links:      #0066CC  (7.3:1 on white)  ✓
Muted:      #666666  (5.7:1 on white)  ✓

SEMANTIC COLOURS
────────────────
Success: #008000 (5.1:1) ✓
Warning: #B36200 (4.5:1) ✓ (minimum)
Error:   #CC0000 (6.6:1) ✓

AVOID
─────
Light grey text: #999999 (2.8:1) ✗
Placeholder text: #CCCCCC (1.6:1) ✗
```

### Never Colour Alone

Don't use colour as the only indicator of meaning:

```text
❌ WRONG: Error shown only by red border
┌──────────────────────┐
│ Email: invalid@      │ (red border)
└──────────────────────┘

✓ RIGHT: Error shown by colour + icon + text
┌──────────────────────┐
│ Email: invalid@      │ (red border)
└──────────────────────┘
⚠ Please enter a valid email address
```

## Focus States

### Every Interactive Element Needs Focus

All interactive elements must have visible focus indicators:

```text
DEFAULT STATE          FOCUS STATE
─────────────          ───────────

┌────────────┐         ╔════════════╗
│  Button    │   →     ║  Button    ║ + outline
└────────────┘         ╚════════════╝

┌────────────┐         ┌────────────┐
│ Input      │   →     │ Input      │ + outline + glow
└────────────┘         └────────────┘

Link text        →     Link text + underline + outline
```

### Focus Indicator Specifications

```css
/* Minimum focus indicator */
:focus {
  outline: 2px solid #0066CC;
  outline-offset: 2px;
}

/* Enhanced focus (recommended) */
:focus-visible {
  outline: 3px solid #0066CC;
  outline-offset: 3px;
  box-shadow: 0 0 0 6px rgba(0, 102, 204, 0.25);
}
```

**Never do this:**
```css
/* ❌ WCAG failure */
:focus { outline: none; }
```

## Touch Targets

### Minimum Size Requirements

All interactive elements need adequate touch targets:

```text
MINIMUM: 44×44px
RECOMMENDED: 48×48px

┌──────────────────────────────────────────┐
│                                          │
│   ┌────────┐                             │
│   │ 48×48  │  ← Good: Easy to tap        │
│   │  Icon  │                             │
│   └────────┘                             │
│                                          │
│   ┌──┐                                   │
│   │24│  ← Bad: Too small, hard to tap    │
│   └──┘                                   │
│                                          │
└──────────────────────────────────────────┘
```

### Spacing Between Targets

Maintain adequate spacing to prevent mis-taps:

```text
✓ GOOD: 8px minimum gap

┌────────┐   ┌────────┐   ┌────────┐
│ Button │   │ Button │   │ Button │
└────────┘   └────────┘   └────────┘
         8px         8px

❌ BAD: No gap

┌────────┐┌────────┐┌────────┐
│ Button ││ Button ││ Button │
└────────┘└────────┘└────────┘
```

## Form Design

### Labels and Inputs

Every input needs a visible, associated label:

```text
✓ CORRECT PATTERN

Email Address              ← Label above input
┌────────────────────────┐
│ user@example.com       │
└────────────────────────┘
Enter your email address   ← Help text below

❌ WRONG PATTERNS

┌────────────────────────┐
│ Email Address          │ ← Placeholder as label (disappears)
└────────────────────────┘

┌────────────────────────┐
│                        │ ← No visible label
└────────────────────────┘
```

### Error States

Design clear, accessible error states:

```text
ERROR STATE DESIGN

Label (now in error colour)
┌────────────────────────┐
│ invalid-email          │ ← Red border (3:1 contrast)
└────────────────────────┘
⚠ Please enter a valid email address
   ↑ Icon    ↑ Descriptive error text

Components:
1. Label colour change (optional)
2. Input border colour (3:1 contrast)
3. Error icon (not colour alone)
4. Error message text (specific, actionable)
```

### Required Fields

Indicate required fields clearly:

```text
Email Address *            ← Asterisk
┌────────────────────────┐
│                        │
└────────────────────────┘

─────────────────────────
* Required fields          ← Legend explaining asterisk
```

## Component Design Patterns

### Buttons

```text
PRIMARY BUTTON
──────────────
┌─────────────────────┐
│    Add to Cart      │  Background: #0066CC
└─────────────────────┘  Text: #FFFFFF (13:1 contrast)
                         Min-height: 44px
                         Padding: 12px 24px

SECONDARY BUTTON
────────────────
┌─────────────────────┐
│    Learn More       │  Background: transparent
└─────────────────────┘  Border: #0066CC (2px)
                         Text: #0066CC
                         Min-height: 44px

DISABLED BUTTON
───────────────
┌─────────────────────┐
│    Unavailable      │  Background: #CCCCCC
└─────────────────────┘  Text: #666666
                         Cursor: not-allowed
                         (Still needs visible state)
```

### Cards

```text
CARD COMPONENT
──────────────

┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  │        Image (with alt)     │    │ ← Informative image needs alt
│  │                             │    │
│  └─────────────────────────────┘    │
│                                      │
│  Product Name                        │ ← H3 or appropriate heading
│  ─────────────                       │
│  Brief description of the product.   │ ← Descriptive text
│                                      │
│  £29.99                              │ ← Clear price
│                                      │
│  ┌───────────────────────┐           │
│  │    View Details       │           │ ← Accessible button/link
│  └───────────────────────┘           │
└─────────────────────────────────────┘

Whole card clickable: OK if focus state covers entire card
Individual link only: Preferred for clarity
```

### Navigation

```text
MAIN NAVIGATION
───────────────

┌─────────────────────────────────────────────────────┐
│  Logo    Home   Products ▼   About   Contact        │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
           ┌─────────────────┐
           │ Category 1      │  ← Dropdown with
           │ Category 2      │     keyboard support
           │ Category 3      │     and focus management
           └─────────────────┘

Requirements:
- Skip link at page start
- Current page indicated (not just colour)
- Dropdown accessible via keyboard
- Focus trapped in dropdown when open
```

### Modal/Dialog

```text
MODAL DIALOG
────────────

╔═════════════════════════════════════════════════╗
║  Dialog Title                              [×]  ║ ← Heading + close button
╠═════════════════════════════════════════════════╣
║                                                 ║
║  Dialog content with clear, readable text.      ║
║                                                 ║
║  Focus trapped inside modal while open.         ║
║                                                 ║
║  ┌─────────────┐  ┌─────────────┐              ║
║  │   Cancel    │  │   Confirm   │              ║ ← Clear action buttons
║  └─────────────┘  └─────────────┘              ║
╚═════════════════════════════════════════════════╝

Background: Dimmed (but not purely visual)

Requirements:
- Focus moves to modal on open
- Focus trapped inside modal
- Escape key closes modal
- Focus returns to trigger on close
- aria-modal="true" and role="dialog"
```

## State Communication

### Visual + Programmatic State

Every visual state needs a programmatic equivalent:

```text
LOADING STATE
─────────────

Visual: Spinner + "Loading..."
HTML:   <div aria-busy="true" aria-live="polite">
          Loading...
        </div>
Data:   data-loading="true"

SUCCESS STATE
─────────────

Visual: Green checkmark + "Saved"
HTML:   <div role="status" aria-live="polite">
          ✓ Saved successfully
        </div>
Data:   data-state="success"

ERROR STATE
───────────

Visual: Red X + error message
HTML:   <div role="alert" aria-live="assertive">
          ⚠ Error: Unable to save
        </div>
Data:   data-state="error"
```

### Progress Indicators

```text
DETERMINATE PROGRESS
────────────────────

Uploading... 45%
[████████░░░░░░░░░░░░] 45%

HTML: <progress value="45" max="100" aria-label="Upload progress">
        45%
      </progress>

INDETERMINATE PROGRESS
──────────────────────

Processing...
[░░░░░░░░░░░░░░░░░░░░] (animated)

HTML: <progress aria-label="Processing"></progress>
      (no value attribute = indeterminate)
```

## Responsive Design

### Breakpoint Strategy

```text
MOBILE FIRST
────────────

Base styles: 320px+
├── Small (sm):    640px+
├── Medium (md):   768px+
├── Large (lg):    1024px+
└── XL (xl):       1280px+

Content adapts, meaning stays clear at all sizes.
```

### Touch vs Mouse

Design for both input methods:

```text
HOVER STATES
────────────
- Optional enhancement, never required
- Touch devices don't have hover
- Information must be accessible without hover

CLICK/TAP TARGETS
─────────────────
- 44×44px minimum (touch)
- Adequate spacing between targets
- No hover-only menus on mobile
```

## Design Handoff

### What Developers Need

Include in your design specs:

**For every component:**
- Semantic HTML element to use
- ARIA attributes required
- Keyboard interaction pattern
- Focus management rules

**For colours:**
- Hex values with contrast ratios
- Approved colour pairings
- What each colour means (not just how it looks)

**For states:**
- All interactive states (default, hover, focus, active, disabled)
- Loading and error states
- Data attributes for each state

### Documentation Template

```text
COMPONENT: Primary Button
═════════════════════════

HTML Element: <button type="button">

States:
├── Default:  bg:#0066CC, text:#FFFFFF
├── Hover:    bg:#0052A3, text:#FFFFFF
├── Focus:    + outline:3px #0066CC, offset:3px
├── Active:   bg:#004080, text:#FFFFFF
├── Disabled: bg:#CCCCCC, text:#666666, cursor:not-allowed
└── Loading:  + spinner, aria-busy="true", text:"Loading..."

Accessibility:
├── Min touch target: 44×44px
├── Contrast: 13:1 (exceeds 4.5:1)
├── Focus visible: Always
└── Disabled: aria-disabled="true" (not just disabled attribute)

Data Attributes:
├── data-loading="true|false"
├── data-variant="primary|secondary|danger"
└── data-size="sm|md|lg"
```

## Checklist for Designers

### Before Handoff

**Colour and Contrast:**
- [ ] All text meets contrast requirements (4.5:1 / 3:1)
- [ ] UI components meet 3:1 contrast
- [ ] Colour is not the only indicator of meaning
- [ ] Colour palette documented with ratios

**Structure:**
- [ ] Clear visual hierarchy matches semantic structure
- [ ] One H1 per page identified
- [ ] Heading levels don't skip
- [ ] Landmarks identified (header, nav, main, footer)

**Interactive Elements:**
- [ ] All states designed (default, hover, focus, active, disabled)
- [ ] Focus indicators visible and high-contrast
- [ ] Touch targets 44×44px minimum
- [ ] Spacing between targets adequate

**Forms:**
- [ ] All inputs have visible labels
- [ ] Required fields indicated
- [ ] Error states designed with icon + text
- [ ] Success/confirmation states designed

**Components:**
- [ ] Semantic HTML specified
- [ ] ARIA attributes documented
- [ ] Keyboard interaction defined
- [ ] Data attributes for states specified

## Related Documentation

- [CSS Compliance](../../docs/structure/mx-compliance-css.md) ("MX-Compliant CSS Specification" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/mx-compliance-css.md>) - CSS implementation details
- [Webpage Compliance](../../docs/structure/mx-compliance.md) ("MX-Compliant Webpage Specification" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/mx-compliance.md>) - HTML output requirements
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/) - Full guidelines
- [CLAUDE.md](../../CLAUDE.md) ("CLAUDE.md" at <https://github.com/ddttom/invisible-users/blob/main/CLAUDE.md>) - MX concepts overview
