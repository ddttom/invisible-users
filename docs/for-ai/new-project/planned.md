
# **Machine Experience (MX) Publishing Checklist**

*A reusable template for ensuring every page you publish is fully AI‑compatible.*

Machine Experience (MX) is the practice of adding metadata, structure, and explicit instructions so AI agents can **discover, cite, compare, understand, and act** on your content without hallucination or guesswork.
This checklist ensures every new page you publish meets MX standards.

---

## **1. Developer Layer**

*HTML, Schema, Crawlability*

### **1.1 Discovery**

- [ ] `<html lang="…">` set correctly
- [ ] `<main>` and `<article>` semantic landmarks
- [ ] ARIA roles (`role="main"`, `role="navigation"`, etc.)
- [ ] `robots.txt` allows AI agents
- [ ] `llms.txt` published with clear opt‑in
- [ ] Page included in `sitemap.xml`
- [ ] Server‑side rendering confirmed
- [ ] Speculation rules added (`prefetch` / `prerender`)

### **1.2 Citation**

- [ ] JSON‑LD added using correct schema (`BlogPosting`, `TechArticle`, `HowTo`, etc.)
- [ ] JSON‑LD includes:
  - `headline`
  - `description`
  - `author`
  - `publisher`
  - `mainEntityOfPage`
  - `keywords`
  - `wordCount`
  - `inLanguage`
  - `datePublished` / `dateModified`
- [ ] Open Graph + Twitter metadata
- [ ] AI metadata:
  - `ai-preferred-access`
  - `ai-content-policy`
  - `ai-freshness`
  - `ai-structured-data`
  - `ai-attribution`

### **1.3 Search & Compare**

- [ ] `DefinedTerm` schema for key concepts
- [ ] `HowTo` or `TechArticle` schema for instructional sections
- [ ] Structured tables with `itemprop` attributes
- [ ] Inline microdata for extractable attributes
- [ ] Machine‑readable equivalents for diagrams (JSON, lists, tables)

### **1.4 Goal Completion**

- [ ] Semantic CTA button (`<button>` or `<a role="button">`)
- [ ] DOM‑visible state attributes (`data-state="ready"`)
- [ ] UCP markers (`data-ucp-action="…"`)

---

## **2. Content Ops Layer**

*Structure, Clarity, Agent‑Friendliness*

### **2.1 Structure**

- [ ] Clear H1, H2, H3 hierarchy
- [ ] Table of contents with anchor links
- [ ] Section summaries at top of each major block
- [ ] `<aside>` used for metadata blocks (author, dates, reading time)

### **2.2 Agent Clarity**

- [ ] Definitions marked with `<dfn>`
- [ ] Acronyms marked with `<abbr>`
- [ ] Lists used instead of long paragraphs
- [ ] Key facts expressed in short, atomic sentences
- [ ] Avoid ambiguous pronouns (“it”, “this”, “they”)

### **2.3 Metadata Consistency**

- [ ] Headings match JSON‑LD `articleSection`
- [ ] Keywords appear in headings and body text
- [ ] Canonical URL matches published URL

---

## **3. Leadership Layer**

*Visibility, Governance, Ecosystem*

### **3.1 Visibility**

- [ ] Page linked from relevant hubs (homepage, category pages)
- [ ] Shared on LinkedIn with canonical link
- [ ] Submitted to AI indexers (OpenAI, Anthropic, Perplexity)

### **3.2 Governance**

- [ ] MX checklist completed before publishing
- [ ] JSON‑LD validated in Schema.org validator
- [ ] Page tested in AI crawlers (Perplexity, Bing, Brave)

### **3.3 Ecosystem**

- [ ] Page added to MX resource library
- [ ] Internal linking to related MX concepts
- [ ] External linking to authoritative sources

---

## **4. Versioning**

When updating a page:

- [ ] Increment `dateModified` in JSON‑LD
- [ ] Update `ai-freshness` if needed
- [ ] Add change notes to repo or CMS
- [ ] Re‑submit to AI indexers if changes are significant

---

## **5. MX Maturity Targets**

Aim for:

| Stage | Goal | Status |
|-------|------|--------|
| **1. Discovery** | Agents can find you | 🟩 Required |
| **2. Citation** | Agents can quote you | 🟩 Required |
| **3. Search & Compare** | Agents can extract attributes | 🟨 Recommended |
| **4. Price Understanding** | Agents parse pricing | 🟦 If applicable |
| **5. Goal Completion** | Agents can act | 🟨 Recommended |

---

## **6. Purpose of This Checklist**

This README ensures every page you publish is:

- AI‑discoverable
- AI‑citable
- AI‑comparable
- AI‑actionable
- Hallucination‑resistant
- Future‑proof

It standardises MX across your entire content ecosystem.

---

If you want, I can also generate a **CONTRIBUTING.md** to go alongside this, defining roles, workflows, and publishing rules.
