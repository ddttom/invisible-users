Absolutely — here is a polished, contributor‑friendly **PULL_REQUEST_TEMPLATE.md** that fits perfectly with your MX README and CONTRIBUTING workflow. It guides contributors to think in MX terms and ensures every PR is review‑ready.

---

# **PULL_REQUEST_TEMPLATE.md**

## **Summary**

Explain what this PR changes and why.
Keep it short and focused.

---

## **MX Impact**

Describe how this change affects Machine Experience (MX):

### **Discovery**

- What changed in semantic HTML, crawlability, or structure?

### **Citation**

- What changed in JSON‑LD, metadata, or attribution?

### **Search & Compare**

- Any new structured data, tables, or extractable attributes?

### **Goal Completion**

- Any new CTAs, DOM state attributes, or UCP markers?

---

## **Validation Checklist**

Before requesting review, confirm the following:

### **Metadata & Schema**

- [ ] JSON‑LD validated in Schema.org validator
- [ ] `dateModified` updated
- [ ] Canonical URL correct
- [ ] Open Graph + Twitter metadata present
- [ ] AI metadata present (`ai-preferred-access`, etc.)

### **HTML & Structure**

- [ ] `<main>` and `<article>` landmarks present
- [ ] ARIA roles applied
- [ ] Headings follow H1 → H2 → H3 hierarchy
- [ ] Table of contents updated (if applicable)

### **Content Quality**

- [ ] Section summaries added
- [ ] Definitions marked with `<dfn>`
- [ ] Acronyms marked with `<abbr>`
- [ ] Lists used where appropriate
- [ ] No ambiguous pronouns

### **Links & Navigation**

- [ ] Internal links tested
- [ ] External links verified
- [ ] Anchor links working

### **Optional (If Applicable)**

- [ ] UCP markers added
- [ ] Price schema validated
- [ ] Comparison tables structured
- [ ] Machine‑readable equivalents for diagrams added

---

## **Screenshots / Examples**

If the PR affects layout, structure, or metadata, include screenshots or code snippets.

---

## **Notes for Reviewers**

Add any context reviewers should know — edge cases, trade‑offs, or follow‑up tasks.

---

If you want, I can also generate a **/docs folder structure** for your repo, including MX guidelines, examples, and schema templates.
