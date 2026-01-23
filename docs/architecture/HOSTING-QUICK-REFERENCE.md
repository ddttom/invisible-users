# AllAbout.Network Hosting - Quick Reference

**One-page reference for deploying HTML files to allabout.network**

---

## Essential Path Mappings

```text
Repository                               →  Live Website
============================================================================
/packages/shared-appendices/web/         →  allabout.network/invisible-users/
/outputs/bible/blogs/mx/                 →  allabout.network/blogs/mx/
/packages/shared-appendices/web/site/    →  allabout.network/invisible-users/site/
```

---

## Common Files

### Appendices (MX-Bible Resources)

```
packages/shared-appendices/web/
├── index.html              → allabout.network/invisible-users/
├── appendix-a.html         → allabout.network/invisible-users/appendix-a.html
├── appendix-b.html         → allabout.network/invisible-users/appendix-b.html
├── appendix-c.html         → allabout.network/invisible-users/appendix-c.html
├── appendix-d.html         → allabout.network/invisible-users/appendix-d.html
├── appendix-e.html         → allabout.network/invisible-users/appendix-e.html
├── appendix-f.html         → allabout.network/invisible-users/appendix-f.html
├── appendix-g.html         → allabout.network/invisible-users/appendix-g.html
├── appendix-h.html         → allabout.network/invisible-users/appendix-h.html
├── appendix-i.html         → allabout.network/invisible-users/appendix-i.html
├── appendix-j.html         → allabout.network/invisible-users/appendix-j.html
├── appendix-k.html         → allabout.network/invisible-users/appendix-k.html
├── appendix-l.html         → allabout.network/invisible-users/appendix-l.html
├── news.html               → allabout.network/invisible-users/news.html
├── faq.html                → allabout.network/invisible-users/faq.html
├── book.html               → allabout.network/invisible-users/book.html
└── llms.txt                → allabout.network/invisible-users/llms.txt
```

### Blog Posts (MX Series)

```
outputs/bible/blogs/mx/
├── data-sovereignty.html                        → allabout.network/blogs/mx/data-sovereignty.html
├── data-sovereignty.css                         → allabout.network/blogs/mx/data-sovereignty.css
├── data-sovereignty-social.svg                  → allabout.network/blogs/mx/data-sovereignty-social.svg
├── machine-experience-adding-metadata.html      → allabout.network/blogs/mx/machine-experience-adding-metadata.html
├── machine-experience-adding-metadata.css       → allabout.network/blogs/mx/machine-experience-adding-metadata.css
├── what-is-machine-experience.html              → allabout.network/blogs/mx/what-is-machine-experience.html
└── [all blog files + assets]                    → allabout.network/blogs/mx/[filename]
```

### Pattern Examples (Reference)

```
packages/shared-appendices/web/site/
├── index.html              → allabout.network/invisible-users/site/index.html
├── product.html            → allabout.network/invisible-users/site/product.html
├── checkout.html           → allabout.network/invisible-users/site/checkout.html
├── blog-post.html          → allabout.network/invisible-users/site/blog-post.html
└── [all pattern files]     → allabout.network/invisible-users/site/[filename]
```

---

## URL Rules

✅ **Correct:**
- `https://allabout.network/blogs/mx/machine-experience-adding-metadata.html`
- `https://allabout.network/invisible-users/appendix-k.html`
- `https://allabout.network/invisible-users/`

❌ **Wrong:**
- ~~`Machine-Experience-Adding-Metadata.html`~~ (no uppercase)
- ~~`machine_experience_adding_metadata.html`~~ (hyphens not underscores)
- ~~`machine-experience-adding-metadata`~~ (include .html)
- ~~`appendix-k.html/`~~ (no trailing slash on files)

---

## Deployment Commands

### Upload Appendices

```bash
# FTP/SFTP
scp packages/shared-appendices/web/*.html user@server:/public_html/invisible-users/
scp packages/shared-appendices/web/*.css user@server:/public_html/invisible-users/

# rsync
rsync -avz packages/shared-appendices/web/ user@server:/public_html/invisible-users/
```

### Upload Blog Posts

```bash
# FTP/SFTP
scp outputs/bible/blogs/mx/*.html user@server:/public_html/blogs/mx/
scp outputs/bible/blogs/mx/*.css user@server:/public_html/blogs/mx/
scp outputs/bible/blogs/mx/*.svg user@server:/public_html/blogs/mx/

# rsync
rsync -avz outputs/bible/blogs/mx/ user@server:/public_html/blogs/mx/
```

---

## Quick Verification

```bash
# Test appendix URL
curl -I https://allabout.network/invisible-users/appendix-d.html

# Test blog post URL
curl -I https://allabout.network/blogs/mx/data-sovereignty.html

# Test llms.txt
curl https://allabout.network/invisible-users/llms.txt

# Test sitemap
curl https://allabout.network/invisible-users/sitemap.xml
```

---

## File Permissions

```bash
# HTML, CSS, TXT files
chmod 644 *.html *.css *.txt *.xml

# Directories
chmod 755 */

# Set ownership (if needed)
chown www-data:www-data -R /public_html/invisible-users/
```

---

## Need More Detail?

See [allabout-network-hosting-map.md](./allabout-network-hosting-map.md) for complete documentation including:
- Deployment workflows
- Troubleshooting
- MIME types
- Caching headers
- Canonical URL guidelines
- Asset management

---

**Last Updated:** January 2026
