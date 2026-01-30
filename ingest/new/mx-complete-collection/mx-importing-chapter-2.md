---
title: "MX Importing: Chapter 2"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "Understanding Legacy Systems"
  author:
    "@type": Person
    name: Tom Ledger
  isPartOf:
    "@type": Book
    name: "MX: Importing"
  inLanguage: en-GB
  mx:audience: human
  mx:status: draft
  mx:confidence: 0.85
---

# Chapter 2: Understanding Legacy Systems

Before you can migrate content, you need to understand where it lives. Legacy CMS platforms share common patterns but differ in crucial details. Those details determine how you extract content, what you can preserve, and what you'll need to reconstruct.

This chapter examines the architectures of major enterprise CMS platforms, focusing on how they store content and what that means for migration.

---

## Common CMS Patterns

Despite their differences, enterprise CMS platforms share structural patterns.

### The Repository

Every CMS has a content repository — the database or storage system holding all content. This might be:

- A relational database (MySQL, SQL Server, PostgreSQL)
- A document database (MongoDB)
- A specialised content repository (JCR, blob storage)
- A combination of the above

The repository stores not just content but metadata, relationships, versions, and system information. Understanding its structure is the first step in extraction.

### The Content Model

Content follows a model — templates, types, schemas that define what fields exist and how content is structured. A "Product" might have name, description, price, image. An "Article" might have headline, body, author, date.

Models vary in rigidity:

- **Strict schemas** — Content must conform exactly
- **Flexible schemas** — Optional fields, extensions allowed
- **Schemaless** — Anything goes (rare in enterprise systems)

Migration must preserve model semantics. A product in the old system should remain recognisable as a product in the new one.

### The Asset Layer

Binary files — images, videos, PDFs — typically live separately from structured content. The CMS tracks them, generates renditions, extracts metadata, but stores the actual bytes in a file system or blob storage.

Asset migration involves:

- The binary files themselves
- Generated renditions (thumbnails, web sizes)
- Metadata (EXIF, XMP, custom properties)
- Relationships to content that uses them

### The Relationship Graph

Content relates to other content. An article has an author. A product belongs to a category. A page links to other pages. These relationships form a graph.

Some relationships are:

- **Explicit** — Stored as references in the content model
- **Implicit** — Derived from taxonomy, tags, or content analysis
- **Structural** — Parent-child in a content hierarchy

Migration must preserve relationships or they'll break in the target system.

### The Version History

Enterprise CMS platforms track versions. Every edit creates a new version. You can roll back, compare, audit changes over time.

Version history is valuable but heavy. A page edited 500 times has 500 versions. Do you migrate all of them? Just the current? A selection?

This is a business decision with technical implications.

---

## Adobe Experience Manager

AEM is the most complex of the major CMS platforms. Understanding its architecture is essential for migration.

### The Java Content Repository

AEM stores everything in a JCR (Java Content Repository) — specifically, Apache Jackrabbit Oak. The JCR is a hierarchical database where:

- Everything is a **node**
- Nodes have **properties** (key-value pairs)
- Nodes have **child nodes** (forming a tree)
- Nodes have **types** defining allowed properties and children

The content tree looks like:

```
/
├── apps/                    # Code, components, templates
│   └── mysite/
│       └── components/
├── conf/                    # Configuration, policies
│   └── mysite/
│       └── settings/
├── content/                 # Authored content
│   ├── mysite/
│   │   └── en/
│   │       └── products/
│   │           └── widget-pro/
│   └── dam/                 # Digital assets
│       └── mysite/
│           └── products/
├── etc/                     # Legacy configuration
├── home/                    # Users and groups
├── oak:index/               # Search indexes
└── var/                     # Runtime data
```

### Pages

A page in AEM is a node of type `cq:Page` with a `jcr:content` child holding the actual content:

```
/content/mysite/en/products/widget-pro/
  jcr:primaryType = "cq:Page"
  jcr:content/
    jcr:primaryType = "cq:PageContent"
    jcr:title = "Widget Pro"
    jcr:description = "Professional-grade widget"
    cq:template = "/conf/mysite/templates/product-page"
    sling:resourceType = "mysite/components/pages/product"
    root/
      sling:resourceType = "mysite/components/container"
      hero/
        sling:resourceType = "mysite/components/hero"
        title = "Widget Pro"
        image = "/content/dam/mysite/products/widget-hero.jpg"
      content/
        sling:resourceType = "mysite/components/container"
        text/
          sling:resourceType = "mysite/components/text"
          text = "<p>Professional-grade widget for...</p>"
```

Key observations:

- Content and structure are intertwined
- Component instances are nodes in the tree
- Properties can be single values or arrays
- References (like images) are paths to other nodes

### Content Fragments

AEM Content Fragments are structured, model-driven content stored in the DAM:

```
/content/dam/mysite/content-fragments/products/widget-pro/
  jcr:primaryType = "dam:Asset"
  jcr:content/
    jcr:primaryType = "dam:AssetContent"
    data/
      cq:model = "/conf/mysite/dam/cfm/models/product"
      name = "Widget Pro"
      sku = "WGT-PRO-001"
      shortDescription = "Professional-grade widget"
      price = 299.99
    metadata/
      dc:title = "Widget Pro"
```

Content Fragment Models define the schema:

```
/conf/mysite/dam/cfm/models/product/
  jcr:primaryType = "cq:Template"
  jcr:title = "Product"
  model/
    cq:dialog/
      content/
        items/
          name/
            fieldLabel = "Name"
            name = "./name"
            required = true
          sku/
            fieldLabel = "SKU"
            name = "./sku"
```

### Experience Fragments

Experience Fragments are reusable content blocks with variations:

```
/content/experience-fragments/mysite/en/product-hero/widget-pro/
  jcr:primaryType = "cq:Page"
  master/                    # Master variation
    jcr:content/
      sling:resourceType = "mysite/components/xf/product-hero"
      title = "Widget Pro"
  web/                       # Web variation
    jcr:content/
      sling:resourceType = "mysite/components/xf/product-hero-web"
  email/                     # Email variation
    jcr:content/
      sling:resourceType = "mysite/components/xf/product-hero-email"
```

### DAM Assets

Digital assets live under `/content/dam`:

```
/content/dam/mysite/products/widget-hero.jpg/
  jcr:primaryType = "dam:Asset"
  jcr:content/
    jcr:primaryType = "dam:AssetContent"
    metadata/
      dc:title = "Widget Hero Image"
      dc:description = "Product shot on white"
      dc:creator = "Sarah Chen"
      tiff:ImageWidth = 2400
      tiff:ImageHeight = 1600
      xmp:CreateDate = "2026-01-10T14:30:00"
    renditions/
      original/
        jcr:primaryType = "nt:file"
        jcr:content/
          jcr:data = [binary]
          jcr:mimeType = "image/jpeg"
      cq5dam.thumbnail.48.48.png/
      cq5dam.thumbnail.140.100.png/
      cq5dam.web.1280.1280.jpeg/
```

### Tags

AEM uses a taxonomy system:

```
/content/cq:tags/mysite/
  products/
    jcr:title = "Products"
    electronics/
      jcr:title = "Electronics"
    featured/
      jcr:title = "Featured"
```

Content references tags via the `cq:tags` property:

```
cq:tags = ["mysite:products/electronics", "mysite:products/featured"]
```

### Extraction Approaches

**Package Export:**

AEM packages (`.zip` files) contain vault-serialised JCR content. The XML format preserves node structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0"
    xmlns:cq="http://www.day.com/jcr/cq/1.0"
    jcr:primaryType="cq:Page">
  <jcr:content
      jcr:primaryType="cq:PageContent"
      jcr:title="Widget Pro"
      cq:template="/conf/mysite/templates/product-page">
  </jcr:content>
</jcr:root>
```

**Query APIs:**

AEM exposes several APIs:

- QueryBuilder (AEM-specific, powerful)
- JCR-SQL2 (SQL-like queries)
- Assets HTTP API
- Content Fragment API
- GraphQL (AEM as a Cloud Service)

**Direct Repository Access:**

With repository access, you can use JCR APIs directly or export via Oak tooling.

---

## Sitecore

Sitecore uses a different architecture — .NET-based with a SQL Server backend.

### The Item Tree

Sitecore content is "items" in a tree structure:

```
/sitecore
├── content/
│   └── Home/
│       └── Products/
│           └── Widget Pro
├── media library/
│   └── Products/
│       └── Widget Hero
├── templates/
│   └── Product/
└── system/
```

Each item has:

- **ID** — A GUID (globally unique)
- **Name** — Display name
- **Template** — Defines fields
- **Fields** — Content values
- **Versions** — Per-language versions

### Templates

Templates define item structure:

```
Template: Product
├── Field: Title (Single-Line Text)
├── Field: Description (Rich Text)
├── Field: SKU (Single-Line Text)
├── Field: Price (Number)
├── Field: Image (Image)
└── Field: Category (Droplink → Category template)
```

Fields have types:

| Type | Description |
|------|-------------|
| Single-Line Text | Plain text |
| Rich Text | HTML content |
| Image | Reference to media |
| Droplink | Reference to another item |
| Multilist | Multiple references |
| Checkbox | Boolean |
| Number | Numeric |
| Date | Date value |

### Versioning and Language

Sitecore versions content per language:

```
Widget Pro (Item)
├── en (Language)
│   ├── Version 1
│   ├── Version 2
│   └── Version 3 (current)
└── de (Language)
    ├── Version 1
    └── Version 2 (current)
```

This is more sophisticated than AEM's approach and requires careful handling in migration.

### Media Library

Media items are similar to content items but store binary data:

```
/sitecore/media library/Products/Widget Hero/
  Template: Image
  Fields:
    Alt: "Widget Pro device"
    Width: 2400
    Height: 1600
  Blob: [binary data]
```

### Extraction Approaches

**Sitecore Package:**

`.zip` packages with serialised items. The format is Sitecore-specific XML.

**Item Service / REST:**

```
GET /sitecore/api/ssc/item/{id}
GET /sitecore/api/ssc/item?path=/sitecore/content/Home/Products
```

**GraphQL (Sitecore XM Cloud):**

Modern Sitecore uses GraphQL for headless delivery.

**Database Direct:**

Sitecore uses SQL Server. The `Items` table contains all content. Complex but complete.

---

## WordPress

WordPress is simpler but extremely common. Many migrations start here.

### Database Structure

WordPress uses MySQL with a straightforward schema:

**wp_posts:**
```sql
ID          BIGINT
post_author BIGINT
post_date   DATETIME
post_content LONGTEXT
post_title  VARCHAR(255)
post_status VARCHAR(20)    -- publish, draft, etc.
post_type   VARCHAR(20)    -- post, page, attachment, custom
post_parent BIGINT         -- For hierarchy
```

**wp_postmeta:**
```sql
meta_id    BIGINT
post_id    BIGINT
meta_key   VARCHAR(255)
meta_value LONGTEXT
```

**wp_terms, wp_term_taxonomy, wp_term_relationships:**
Categories and tags in a taxonomy system.

### Content Types

Default types:

- `post` — Blog posts
- `page` — Static pages
- `attachment` — Media files
- Custom post types via plugins

### Media

Attachments are posts with `post_type = 'attachment'`:

```sql
SELECT * FROM wp_posts WHERE post_type = 'attachment';

ID: 123
post_title: "Widget Hero"
post_mime_type: "image/jpeg"
guid: "https://example.com/wp-content/uploads/2026/01/widget-hero.jpg"
```

Metadata in wp_postmeta:

```sql
meta_key: "_wp_attachment_metadata"
meta_value: 'a:5:{s:5:"width";i:2400;s:6:"height";i:1600;...}'
```

### Extraction Approaches

**WordPress Export (WXR):**

Built-in export creates XML:

```xml
<item>
  <title>Widget Pro</title>
  <link>https://example.com/products/widget-pro/</link>
  <pubDate>Mon, 15 Jan 2026 10:30:00 +0000</pubDate>
  <content:encoded><![CDATA[<p>Professional-grade...</p>]]></content:encoded>
  <wp:post_type>product</wp:post_type>
  <category domain="product_cat">Electronics</category>
</item>
```

**REST API:**

```
GET /wp-json/wp/v2/posts
GET /wp-json/wp/v2/pages
GET /wp-json/wp/v2/media
```

**Database Direct:**

SQL queries against the WordPress tables.

---

## Drupal

Drupal uses an entity-based model with fields attached to content types.

### Entities and Bundles

Content types are "bundles" of the "node" entity:

```
Entity: Node
├── Bundle: Article
│   ├── Field: Title
│   ├── Field: Body
│   └── Field: Image
└── Bundle: Product
    ├── Field: Title
    ├── Field: Description
    ├── Field: Price
    └── Field: SKU
```

### Database Structure

Drupal stores fields in separate tables:

```sql
-- Base node data
SELECT * FROM node;          -- nid, type, uuid, langcode
SELECT * FROM node_field_data; -- title, status, created

-- Field values
SELECT * FROM node__field_description;  -- entity_id, field_description_value
SELECT * FROM node__field_price;        -- entity_id, field_price_value
```

### Extraction Approaches

**Drupal Export Modules:**

Various modules provide export functionality.

**JSON:API / REST:**

Drupal 8+ has built-in REST:

```
GET /jsonapi/node/product
GET /jsonapi/node/product/{uuid}
```

**Database Direct:**

Complex due to field distribution across tables, but complete.

---

## Common Challenges

Regardless of source system, certain challenges appear repeatedly.

### Rich Text Content

Every CMS stores rich text differently:

- AEM: HTML in properties, sometimes with component markers
- Sitecore: HTML with Sitecore-specific tokens
- WordPress: HTML with shortcodes
- Drupal: HTML with filters and tokens

All need cleaning and normalisation during migration.

### Internal Links

Content references other content via links. These links use system-specific formats:

- AEM: `/content/mysite/en/products/widget-pro.html`
- Sitecore: `~/link.aspx?_id=A1B2C3&_z=z`
- WordPress: `https://example.com/products/widget-pro/`
- Drupal: `/node/123` or `/products/widget-pro`

Links must be transformed to target system paths.

### Embedded Components

CMS platforms embed components in content:

- AEM: Parsys with component nodes
- Sitecore: Renderings in placeholders
- WordPress: Shortcodes `[gallery ids="1,2,3"]`
- Drupal: Embedded entities

These need mapping to target system equivalents or conversion to standard formats.

### Multilingual Content

Each system handles languages differently:

- AEM: Language copies as separate content trees
- Sitecore: Versions per language on same item
- WordPress: Plugins (WPML, Polylang) with varied approaches
- Drupal: Built-in translation with entity references

Language handling significantly impacts migration complexity.

### Permissions and Workflow

Content often has:

- Publication status (draft, published, archived)
- Access restrictions (public, authenticated, role-based)
- Workflow state (pending review, approved)

These concepts may not map directly to MX properties and need careful consideration.

---

## Assessment Checklist

Before starting migration, assess the source system:

**Content Inventory:**
- [ ] How many pages/items?
- [ ] How many assets?
- [ ] How many content types/templates?
- [ ] What languages?
- [ ] How many versions per item?

**Structure Analysis:**
- [ ] What content models exist?
- [ ] How are relationships represented?
- [ ] What taxonomies are in use?
- [ ] How deep is the content hierarchy?

**Technical Access:**
- [ ] What export options exist?
- [ ] What APIs are available?
- [ ] Can you access the database directly?
- [ ] What authentication is required?

**Quality Issues:**
- [ ] Is there orphaned content?
- [ ] Are there broken links?
- [ ] Is metadata complete?
- [ ] Are there duplicate items?

**Business Decisions:**
- [ ] What content is worth migrating?
- [ ] How much version history to preserve?
- [ ] What's the cutover strategy?
- [ ] Who approves the migration?

---

## From Understanding to Action

Knowing your source system is prerequisite to migration. The JCR node structure of AEM, the item tree of Sitecore, the post tables of WordPress — each presents different challenges and opportunities.

The next chapter examines the target: MX-native content. Understanding both ends of the journey lets you plan the transformation between them.

---

*The following chapter describes the MX target architecture — what you're building toward.*
