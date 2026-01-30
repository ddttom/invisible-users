# AllAbout.Network - Hosting Folder Structure (ASCII Sitemap)

Visual map of where HTML files are deployed on allabout.network

---

## Complete Hosting Structure

```text
allabout.network (Web Root)
│
├── index.html                              # Main site homepage
├── llms.txt                                # Root AI discovery file
├── sitemap.xml                             # Root sitemap
├── robots.txt                              # Root robots file
│
├── media_*/                                # Media assets (external/CDN)
│   └── *.png, *.jpg, *.svg                # Author photos, general media
│
├── images/                                 # Image assets (external/CDN)
│   └── invisible-users-og.jpg             # Social media card
│
├── blogs/                                  # Blog section
│   │
│   └── mx/                                 # MX series blog posts
│       ├── data-sovereignty.html
│       ├── data-sovereignty.css
│       ├── data-sovereignty-social.svg
│       ├── data-sovereignty-[diagram].svg
│       │
│       ├── machine-experience-adding-metadata.html
│       ├── machine-experience-adding-metadata.css
│       ├── machine-experience-adding-metadata-social.svg
│       ├── machine-experience-adding-metadata-[diagram].svg
│       │
│       ├── what-is-machine-experience.html
│       ├── what-is-machine-experience.css
│       ├── what-is-machine-experience-social.svg
│       │
│       ├── mx-a-new-role.html
│       ├── mx-a-new-role.css
│       ├── mx-a-new-role-social.svg
│       │
│       ├── about.tom.cranstoun.html
│       ├── about.tom.cranstoun.css
│       │
│       └── [future-blog-posts].html       # All future MX blog posts
│           [future-blog-posts].css
│           [future-blog-posts]-social.svg
│           [future-blog-posts]-*.svg      # Associated diagrams
│
└── invisible-users/                        # MX-Bible resources & appendices
    │
    ├── index.html                          # Landing page for MX resources
    ├── llms.txt                            # AI discovery file for this section
    ├── sitemap.xml                         # Sitemap for this section
    │
    ├── appendix-a.html                     # Appendix A: Implementation Cookbook
    ├── appendix-b.html                     # Appendix B: Battle-Tested Production Lessons
    ├── appendix-c.html                     # Appendix C: Web Audit Suite Guide
    ├── appendix-d.html                     # Appendix D: AI-Friendly HTML Guide
    ├── appendix-e.html                     # Appendix E: Quick Reference
    ├── appendix-f.html                     # Appendix F: Implementation Roadmap
    ├── appendix-g.html                     # Appendix G: Resource Directory
    ├── appendix-h.html                     # Appendix H: Example llms.txt
    ├── appendix-i.html                     # Appendix I: Case Studies
    ├── appendix-j.html                     # Appendix J: Industry Developments
    ├── appendix-k.html                     # Appendix K: Common Page Patterns
    ├── appendix-l.html                     # Appendix L: Proposed AI Metadata Patterns
    ├── appendix-index.html                 # Index of all appendices
    │
    ├── appendix.css                        # Shared CSS for appendices
    │
    ├── book.html                           # Book information page
    ├── book-product-page.html              # Book purchase/product page
    ├── book-product-page.css               # Book product page CSS
    ├── back-cover.html                     # Book back cover content
    │
    ├── news.html                           # Industry news (Appendix J content)
    ├── faq.html                            # Frequently asked questions
    │
    ├── for-reviewers.html                  # Reviewer access page
    ├── for-reviewers.css                   # Reviewer page CSS
    │
    └── site/                               # Common page pattern examples (Appendix K)
        │
        ├── index.html                      # Pattern examples index
        ├── llms.txt                        # AI discovery for patterns
        ├── sitemap.xml                     # Sitemap for patterns
        ├── README.md                       # Pattern documentation
        │
        ├── about.html                      # About page pattern
        ├── article.html                    # Article page pattern
        ├── author.html                     # Author page pattern
        ├── blog-post.html                  # Blog post pattern
        ├── checkout.html                   # Checkout page pattern
        ├── collection.html                 # Collection page pattern
        ├── consulting.html                 # Consulting page pattern
        ├── contact.html                    # Contact page pattern
        ├── event.html                      # Event page pattern
        ├── faq.html                        # FAQ page pattern
        ├── login.html                      # Login page pattern
        ├── portfolio.html                  # Portfolio page pattern
        ├── pricing.html                    # Pricing page pattern
        ├── privacy.html                    # Privacy page pattern
        ├── product.html                    # Product page pattern
        ├── sales.html                      # Sales page pattern
        ├── search.html                     # Search page pattern
        ├── team.html                       # Team page pattern
        ├── testimonials.html               # Testimonials page pattern
        └── 404.html                        # 404 error page pattern
```

---

## Repository → Hosting Mapping

```text
LOCAL REPOSITORY                                  →  LIVE WEB HOSTING
================================================================================

packages/shared-appendices/web/                   →  allabout.network/invisible-users/
├── index.html                                    →  /invisible-users/index.html
├── appendix-[a-l].html                           →  /invisible-users/appendix-[a-l].html
├── appendix-index.html                           →  /invisible-users/appendix-index.html
├── book.html                                     →  /invisible-users/book.html
├── news.html                                     →  /invisible-users/news.html
├── faq.html                                      →  /invisible-users/faq.html
├── llms.txt                                      →  /invisible-users/llms.txt
├── sitemap.xml                                   →  /invisible-users/sitemap.xml
└── *.css                                         →  /invisible-users/*.css

packages/shared-appendices/web/site/              →  allabout.network/invisible-users/site/
├── index.html                                    →  /invisible-users/site/index.html
├── about.html                                    →  /invisible-users/site/about.html
├── product.html                                  →  /invisible-users/site/product.html
├── [all pattern files]                           →  /invisible-users/site/[pattern].html
├── llms.txt                                      →  /invisible-users/site/llms.txt
└── sitemap.xml                                   →  /invisible-users/site/sitemap.xml

outputs/bible/blogs/mx/                           →  allabout.network/blogs/mx/
├── data-sovereignty.html                         →  /blogs/mx/data-sovereignty.html
├── data-sovereignty.css                          →  /blogs/mx/data-sovereignty.css
├── data-sovereignty-social.svg                   →  /blogs/mx/data-sovereignty-social.svg
├── data-sovereignty-*.svg                        →  /blogs/mx/data-sovereignty-*.svg
├── [all other blog posts]                        →  /blogs/mx/[blog-post].html
└── [all blog assets]                             →  /blogs/mx/[blog-post].*
```

---

## Visual Hierarchy by Content Type

### 1. Appendices (Reference Material)

```text
allabout.network/invisible-users/
│
├── appendix-a.html ────┐
├── appendix-b.html     │
├── appendix-c.html     │
├── appendix-d.html     ├─── 12 Comprehensive Appendices
├── appendix-e.html     │    (A through L)
├── appendix-f.html     │
├── appendix-g.html     │
├── appendix-h.html     │
├── appendix-i.html     │
├── appendix-j.html     │
├── appendix-k.html     │
└── appendix-l.html ────┘
```

### 2. Blog Posts (Thought Leadership)

```text
allabout.network/blogs/mx/
│
├── [blog-post-1].html ────┐
├── [blog-post-1].css      ├─── Blog Post 1 (all assets together)
├── [blog-post-1]-*.svg ───┘
│
├── [blog-post-2].html ────┐
├── [blog-post-2].css      ├─── Blog Post 2 (all assets together)
├── [blog-post-2]-*.svg ───┘
│
└── [blog-post-n].html ────┐
    [blog-post-n].css      ├─── Blog Post N (all assets together)
    [blog-post-n]-*.svg ───┘
```

### 3. Pattern Examples (Reference Code)

```text
allabout.network/invisible-users/site/
│
├── about.html ────────────┐
├── article.html           │
├── author.html            │
├── blog-post.html         │
├── checkout.html          ├─── 20+ Common Page Patterns
├── collection.html        │    (Real-world examples)
├── contact.html           │
├── event.html             │
├── product.html           │
└── [more patterns] ───────┘
```

---

## Flat Structure Rules

### Blog Posts - All Files at Same Level

✅ **CORRECT:**

```text
/blogs/mx/
├── data-sovereignty.html
├── data-sovereignty.css
├── data-sovereignty-social.svg
├── data-sovereignty-diagram-1.svg
├── machine-experience-adding-metadata.html
├── machine-experience-adding-metadata.css
└── machine-experience-adding-metadata-social.svg
```

❌ **WRONG (Don't create subdirectories):**

```text
/blogs/mx/
├── data-sovereignty/
│   ├── index.html
│   ├── style.css
│   └── images/
└── machine-experience-adding-metadata/
    ├── index.html
    └── style.css
```

### Appendices - All Files at Same Level

✅ **CORRECT:**

```text
/invisible-users/
├── appendix-a.html
├── appendix-b.html
├── appendix-c.html
├── appendix.css         # Shared CSS
└── index.html           # Landing page
```

❌ **WRONG (Don't create subdirectories):**

```text
/invisible-users/
├── appendices/
│   ├── a.html
│   ├── b.html
│   └── c.html
└── css/
    └── appendix.css
```

---

## URL Structure Examples

### Appendix URLs

```text
https://allabout.network/invisible-users/appendix-a.html
https://allabout.network/invisible-users/appendix-d.html
https://allabout.network/invisible-users/appendix-k.html
https://allabout.network/invisible-users/news.html
https://allabout.network/invisible-users/faq.html
https://allabout.network/invisible-users/llms.txt
```

### Blog Post URLs

```text
https://allabout.network/blogs/mx/data-sovereignty.html
https://allabout.network/blogs/mx/machine-experience-adding-metadata.html
https://allabout.network/blogs/mx/what-is-machine-experience.html
```

### Pattern Example URLs

```text
https://allabout.network/invisible-users/site/product.html
https://allabout.network/invisible-users/site/checkout.html
https://allabout.network/invisible-users/site/blog-post.html
https://allabout.network/invisible-users/site/about.html
```

---

## File Count Summary

```text
allabout.network/
│
├── blogs/mx/                   (~50-100 files)
│   └── [blog-posts × 4-5 files each]
│       - HTML
│       - CSS
│       - Social card SVG
│       - Diagram SVGs (0-5 per blog)
│
└── invisible-users/            (~35-40 files)
    │
    ├── Root files              (20 files)
    │   - 12 appendix HTML files
    │   - index.html
    │   - book.html, news.html, faq.html, etc.
    │   - CSS files
    │   - llms.txt, sitemap.xml
    │
    └── site/                   (~25 files)
        - 20+ pattern HTML examples
        - README.md
        - llms.txt, sitemap.xml
```

---

## Growth Pattern (Future)

```text
allabout.network/
│
├── blogs/
│   ├── mx/                     # Current: MX series
│   │   └── [50+ posts over time]
│   │
│   ├── tech/                   # Future: General tech blog
│   │   └── [posts]
│   │
│   └── case-studies/           # Future: Client case studies
│       └── [studies]
│
├── invisible-users/            # Current: MX-Bible resources
│   ├── [appendices]
│   └── site/
│       └── [patterns]
│
├── books/                      # Future: Other book projects
│   ├── mx-bible/
│   ├── mx-handbook/
│   └── [other-books]/
│
└── services/                   # Future: Service pages
    ├── consulting.html
    ├── training.html
    └── audit.html
```

**Current Focus:** `/invisible-users/` and `/blogs/mx/`

---

## Deployment Checklist

When deploying new content, ensure files go to correct location:

### New Blog Post

- [ ] `outputs/bible/blogs/mx/[name].html` → `/blogs/mx/[name].html`
- [ ] `outputs/bible/blogs/mx/[name].css` → `/blogs/mx/[name].css`
- [ ] `outputs/bible/blogs/mx/[name]-social.svg` → `/blogs/mx/[name]-social.svg`
- [ ] `outputs/bible/blogs/mx/[name]-*.svg` → `/blogs/mx/[name]-*.svg`

### Updated Appendix

- [ ] `packages/shared-appendices/web/appendix-[x].html` → `/invisible-users/appendix-[x].html`
- [ ] Verify canonical URL in HTML matches deployment path
- [ ] Update sitemap if needed: `/invisible-users/sitemap.xml`

### New Pattern Example

- [ ] `packages/shared-appendices/web/site/[type].html` → `/invisible-users/site/[type].html`
- [ ] Update Appendix K to reference new pattern
- [ ] Update sitemap: `/invisible-users/site/sitemap.xml`

---

## Quick Navigation

```text
Need to find where a file goes?

1. Is it an appendix (A-L)?
   → /invisible-users/appendix-[letter].html

2. Is it a blog post?
   → /blogs/mx/[lowercase-title-with-hyphens].html

3. Is it a pattern example?
   → /invisible-users/site/[page-type].html

4. Is it book-related content?
   → /invisible-users/book*.html

5. Is it site metadata?
   → /invisible-users/llms.txt or sitemap.xml
```

---

**Last Updated:** January 2026
**For detailed deployment instructions, see:** [allabout-network-hosting-map.md](./allabout-network-hosting-map.md) ("AllAbout.Network Hosting Path Map" at <https://github.com/ddttom/invisible-users/blob/main/config/system/allabout-network-hosting-map.md>)
