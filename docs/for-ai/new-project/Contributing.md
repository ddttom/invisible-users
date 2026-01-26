# **CONTRIBUTING.md**

*Standards and workflow for contributing MX‑compatible content.*

Thank you for contributing to this project.
Our goal is to ensure every page we publish is **AI‑discoverable, AI‑citable, AI‑comparable, and AI‑actionable**.
This document explains how to contribute content, code, or fixes while maintaining full **Machine Experience (MX)** compatibility.

---

# **1. Roles & Responsibilities**

## **1.1 Developers**

Responsible for:

- Semantic HTML structure
- JSON‑LD and metadata
- Crawlability (robots.txt, llms.txt, sitemap)
- UCP markers and DOM state
- Accessibility and ARIA roles

## **1.2 Content Editors**

Responsible for:

- Clear structure and headings
- Agent‑friendly writing
- Definitions, summaries, and lists
- Metadata consistency
- Internal linking

## **1.3 Reviewers / Maintainers**

Responsible for:

- Enforcing MX checklist
- Validating JSON‑LD
- Ensuring accessibility
- Approving pull requests
- Maintaining publishing standards

---

# **2. Contribution Workflow**

## **2.1 Fork & Branch**

- Fork the repository
- Create a feature branch:
  `feature/add-new-article`
  `fix/schema-updates`
  `content/mx-updates`

## **2.2 Make Changes**

Follow the **MX Publishing Checklist** in the README.
Every page must meet **Stage 1 (Discovery)** and **Stage 2 (Citation)** before merging.

## **2.3 Validate**

Before submitting a PR:

### **Run these checks:**

- [ ] JSON‑LD validated in Schema.org validator
- [ ] HTML landmarks present (`<main>`, `<article>`)
- [ ] AI metadata present
- [ ] Open Graph + Twitter metadata present
- [ ] Headings match JSON‑LD `articleSection`
- [ ] No ambiguous pronouns
- [ ] Lists used where appropriate
- [ ] Canonical URL correct
- [ ] Internal links working

### **If applicable:**

- [ ] UCP markers added
- [ ] Price schema validated
- [ ] Comparison tables structured

## **2.4 Submit Pull Request**

Your PR must include:

### **PR Template**

```
## Summary
Brief description of the change.

## MX Impact
- Discovery: (what changed)
- Citation: (what changed)
- Search & Compare: (what changed)
- Goal Completion: (what changed)

## Validation
- [ ] JSON-LD validated
- [ ] MX checklist completed
- [ ] Internal links tested
- [ ] Accessibility checked

## Notes
Anything reviewers should know.
```

---

# **3. Writing Guidelines**

## **3.1 Structure**

- Use a single H1
- Use clear H2/H3 hierarchy
- Include a table of contents
- Add section summaries

## **3.2 Agent‑Friendly Writing**

- Use short, atomic sentences
- Avoid ambiguous pronouns
- Define terms with `<dfn>`
- Use `<abbr>` for acronyms
- Prefer lists over long paragraphs

## **3.3 Metadata**

Every page must include:

- Canonical URL
- Description
- Keywords
- JSON‑LD
- Open Graph
- Twitter metadata
- AI metadata

---

# **4. Code Standards**

## **4.1 HTML**

- Semantic elements required
- ARIA roles where appropriate
- No empty headings
- No duplicated IDs

## **4.2 JSON‑LD**

- Must use Schema.org
- Must match page content
- Must include `dateModified` on updates

## **4.3 CSS & JS**

- Keep minimal
- Avoid blocking rendering
- Avoid client‑side rendering for core content

---

# **5. MX Governance**

## **5.1 Required MX Levels**

All pages must meet:

| Stage | Requirement |
|-------|-------------|
| **1. Discovery** | Required |
| **2. Citation** | Required |
| **3. Search & Compare** | Recommended |
| **4. Price Understanding** | If applicable |
| **5. Goal Completion** | Recommended |

## **5.2 Publishing Rules**

- No page may be published without passing the MX checklist
- All metadata must be validated
- All pages must be accessible (WCAG‑aligned)
- All pages must be agent‑friendly

---

# **6. Updating Existing Pages**

When modifying a page:

- Update `dateModified`
- Update `ai-freshness` if needed
- Revalidate JSON‑LD
- Re‑submit to AI indexers if changes are significant

---

# **7. Questions or Help**

If you’re unsure about MX requirements, open an issue with the label:
`mx-guidance-needed`

---

If you want, I can also generate a **PULL_REQUEST_TEMPLATE.md** so contributors automatically follow the MX workflow.
