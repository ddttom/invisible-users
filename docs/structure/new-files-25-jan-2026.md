---
title: "New Files Summary - 25 January 2026"
author: "Tom Cranstoun"
creation-date: "25/Jan/2026"
last-updated: "25/Jan/2026"
description: "Summary of new documentation and files added on 25 January 2026"
purpose: "Review and awareness of new workspace additions"
---

# New Files Summary - 25 January 2026

This document highlights the significant new files and directories added to the workspace on 25 January 2026. Review these additions to understand the expanded documentation and resources now available.

## Main Repository - New Directories

### ingest/ (NEW - AI Assistant Deep Dives)

Four new technical documents providing deep analysis of AI agent constraints and MX principles:

- **[ai-dynamic-challenges.md](../../ingest/ai-dynamic-challenges.md) ("AI-Dynamic Meta Tag: Challenges and Open Questions" at <https://github.com/ddttom/invisible-users/blob/main/ingest/ai-dynamic-challenges.md>)** - Challenges AI agents face with dynamic content
- **[ai-dynamic-examples-and-implementation.md](../../ingest/ai-dynamic-examples-and-implementation.md) ("AI-Dynamic Meta Tag: Examples and Implementation" at <https://github.com/ddttom/invisible-users/blob/main/ingest/ai-dynamic-examples-and-implementation.md>)** - Practical implementation examples
- **[machine-experience-manifesto.md](../../ingest/machine-experience-manifesto.md) ("The Machine Experience Manifesto" at <https://github.com/ddttom/invisible-users/blob/main/ingest/machine-experience-manifesto.md>)** - Core MX principles and philosophy
- **[why-llms-dont-execute-javascript.md](../../ingest/why-llms-dont-execute-javascript.md) ("Why LLMs Don't Execute JavaScript (But Google Does)" at <https://github.com/ddttom/invisible-users/blob/main/ingest/why-llms-dont-execute-javascript.md>) ("Why LLMs Don't Execute JavaScript (But Google Does)" at <https://github.com/ddttom/invisible-users/blob/main/ingest/why-llms-dont-execute-javascript.md>)** - Technical constraints explanation

**Purpose:** Technical reference material explaining why AI agents need specific patterns.

**Recommendation:** Review these for technical accuracy and alignment with book chapters.

**Note:** Files moved to root-level ingest/ directory (January 2026).

---

### docs/talks/ (NEW - Presentation Materials)

Structured presentation resources with templates and historical archives:

**template/**
- **[talk.md](../talks/template/talk.md) ("MX-Bible: Designing the Web for AI Agents and Everyone Else" at <https://github.com/ddttom/invisible-users/blob/main/docs/talks/template/talk.md>)** - Reusable presentation markdown template
- **[talk-slides.md](../talks/template/talk-slides.md) ("MX-Bible: Designing the Web for AI Agents and Everyone Else" at <https://github.com/ddttom/invisible-users/blob/main/docs/talks/template/talk-slides.md>)** - Slide deck format template

**historical/members-call-21-jan-26/** (Boye & Co Member Call)
- **[boye-co-member-call-review.md](../talks/historical/members-call-21-jan-26/boye-co-member-call-review.md) ("Websites That Work Perfectly - Until They Don't: Reflections on the Boye & Co Member Call" at <https://github.com/ddttom/invisible-users/blob/main/docs/talks/historical/members-call-21-jan-26/boye-co-member-call-review.md>)** - Post-call analysis
- **[talk.md](../talks/historical/members-call-21-jan-26/talk.md) ("MX-Bible: Designing the Web for AI Agents and Everyone Else" at <https://github.com/ddttom/invisible-users/blob/main/docs/talks/historical/members-call-21-jan-26/talk.md>)** - Full presentation content
- **[talk-slides.md](../talks/historical/members-call-21-jan-26/talk-slides.md) ("MX-Bible: Designing the Web for AI Agents and Everyone Else" at <https://github.com/ddttom/invisible-users/blob/main/docs/talks/historical/members-call-21-jan-26/talk-slides.md>)** - Slide deck version

**Purpose:** Reusable presentation framework for conferences, talks, and partner meetings.

**Recommendation:** Verify Boye & Co materials are appropriate for archiving (may contain confidential context).

---

### docs/for-ai/ (Updated)

New project template directory and additional AI guidance:

- **[architecting-multi-repo-codebases.md](../for-ai/architecting-multi-repo-codebases.md)** - Multi-repository architecture patterns
- **[yaml-frontmatter-template.md](../for-ai/yaml-frontmatter-template.md) ("YAML Frontmatter Template for Book Manuscripts" at <https://github.com/ddttom/invisible-users/blob/main/docs/for-ai/yaml-frontmatter-template.md>)** - Standard YAML frontmatter template
- **new-project/** - Full project template directory
  - PULL_REQUEST_TEMPLATE.md
  - Contributing.md
  - Plan.md
  - planned.md

**Purpose:** Templates and patterns for AI assistants managing complex codebases.

---

## Submodules - New Content

### packages/bible/ (MX-Bible Submodule)

- **[update plan.md](../../packages/bible/update%20plan.md)** - Comprehensive 2026 strategic plan for MX-Bible completion

**Purpose:** Master roadmap for book finalization, Appendix K completion, and publication preparation.

**Recommendation:** This is your primary strategic reference for 2026. Review priorities and timelines.

---

### packages/mx-gathering/ (PUBLIC Submodule)

**templates/** (NEW - YAML Metadata Templates)
- **appendix-k-yaml-metadata.md** - Template for Appendix K pattern files
- **blog-yaml-metadata.md** - Template for blog posts
- **documentation-yaml-metadata.md** - Template for documentation files

**profiles/** (MOVED from sales-enablement)
- **claude.code.md** - Claude Code AI assistant profile
- **tom.cranstoun.md** - Your profile
- **unknown.md** - Placeholder profile

**Purpose:** Public-facing templates and community member profiles.

**Note:** Profile folder was moved from packages/sales-enablement to packages/mx-gathering on 25/Jan/2026 (see [docs/structure/todo.txt](todo.txt) Recent Work section).

---

### packages/sales-enablement/ (NEW Pitch)

- **[pitches/mx-convergence-pitch.md](../../packages/sales-enablement/pitches/mx-convergence-pitch.md)** - Comprehensive MX business case pitch

**Purpose:** C-Suite and strategic partner presentation covering five agent types, convergence principle, and January 2026 inflection point.

**Note:** Extracted from todo.txt and properly structured with YAML frontmatter.

---

### outputs/ (PRIVATE Submodule)

**bible/blogs/mx/drafts/**
- **copilot.md** - Draft blog post about Microsoft Copilot
- **puff.md** - Draft blog post

**Purpose:** Work-in-progress blog content.

**Recommendation:** Review drafts for completion status and publication readiness.

---

## Active Items Requiring Your Attention

### 1. Blog Post Issues

**SVG Fallback Pattern** - Review `.claude/skills/create-blog/skill.md`
- Issue: "Your browser does not support SVG" message is confusing
- Resolution: Empty fallback (figcaption provides context)
- Status: Needs verification

**Published Blog Post** - Review `outputs/bible/blogs/mx/machine-experience-adding-metadata.html`
- Status: Ready for publication
- Screenshot: `/Users/tomcranstoun/Desktop/Dumps2/CleanShot 2026-01-22 at 18.03.12@2x.png`

### 2. Accessibility Items

**Table Caption Accessibility**
- Issue: Text appearing as table description but not using `<caption>` element
- Action: Audit generated HTML files for proper table structure

**Contrast Ratio Compliance**
- Issue: Some colour combinations may not meet WCAG 2.1 AA standards
- Action: Run contrast checker on blog post colour schemes

---

## Next Steps

1. **Review new documentation** - Especially ingest/ for technical accuracy
2. **Verify presentation materials** - Check Boye & Co content for confidentiality
3. **Complete blog post review** - Address SVG fallback and publish machine-experience-adding-metadata.html
4. **Audit accessibility** - Table captions and contrast ratios across generated HTML
5. **Review strategic plan** - packages/bible/update plan.md for 2026 priorities

---

## Related References

- **[CHANGELOG.md](../../CHANGELOG.md) ("Changelog" at <https://github.com/ddttom/invisible-users/blob/main/CHANGELOG.md>)** - Complete version history
- **[docs/structure/todo.txt](todo.txt)** - Active task tracking
- **[packages/bible/update plan.md](../../packages/bible/update%20plan.md)** - 2026 strategic roadmap
