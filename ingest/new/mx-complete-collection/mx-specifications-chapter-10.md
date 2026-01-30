---
title: "MX Specifications: Chapter 10"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "The Ecosystem"
  author:
    "@type": Person
    name: Tom Ledger
  isPartOf:
    "@type": Book
    name: "MX: Specifications"
  inLanguage: en-GB
  mx:audience: human
  mx:status: draft
  mx:confidence: 0.85
---

# Chapter 10: The Ecosystem

Specifications are just documents until tools bring them to life.

This chapter covers the MX ecosystem — the validators, generators, integrations, and community resources that turn metadata declarations into working systems. It's where theory meets practice, where the notes on the page become music you can hear.

---

## Core Tools

The MX community maintains reference implementations for essential operations.

### mx-validate

Validates metadata against specifications:

```bash
# Validate a single file
mx-validate structured-data page.md

# Validate a directory
mx-validate media /assets/products/

# Validate with composition checks
mx-validate composition /content/ \
  --check references \
  --check permissions \
  --check inheritance

# Output formats
mx-validate database /database/ --format json
mx-validate database /database/ --format junit  # For CI
```

Common validation rules:

| Rule | Checks |
|------|--------|
| `schema` | Properties match specification |
| `references` | Referenced content exists |
| `permissions` | AI permissions are consistent |
| `inheritance` | Inheritance chains resolve |
| `required` | Required properties are present |
| `types` | Values match expected types |

### mx-generate

Generates metadata from existing content:

```bash
# Generate structured data from HTML
mx-generate structured-data index.html --output index.md

# Generate media metadata from EXIF
mx-generate media /assets/photos/ --from-exif

# Generate database metadata from schema
mx-generate database --connection postgres://... --output /database/

# Generate with AI assistance
mx-generate media image.jpg --ai-describe --ai-model claude-3
```

### mx-transform

Converts between formats:

```bash
# YAML frontmatter to JSON-LD
mx-transform structured-data page.md --to json-ld

# Sidecar to embedded (where supported)
mx-transform media image.jpg.mx.yaml --embed-xmp

# Export for specific systems
mx-transform fragment product.fragment.yaml --to contentful
mx-transform database tables/ --to dbt
```

### mx-lint

Checks style and best practices:

```bash
# Lint for consistency
mx-lint /content/ --rules mx-community

# Custom rules
mx-lint /content/ --rules ./our-rules.yaml

# Auto-fix where possible
mx-lint /content/ --fix
```

---

## IDE Integration

Metadata is easier to write with editor support.

### VS Code Extension

The MX extension for VS Code provides:

- **Syntax highlighting** for MX YAML
- **Autocomplete** for properties and values
- **Validation** as you type
- **Hover documentation** for properties
- **Go to definition** for references
- **Snippets** for common patterns

```json
// settings.json
{
  "mx.validate.onSave": true,
  "mx.specifications": ["structured-data", "media", "fragments"],
  "mx.customRules": "./mx-rules.yaml"
}
```

### JetBrains Plugin

Similar features for IntelliJ, WebStorm, and other JetBrains IDEs.

### Language Server

For other editors, the MX Language Server Protocol implementation provides:

- Diagnostics
- Completions
- Hover information
- Code actions

```bash
# Start the language server
mx-lsp --stdio

# Or via TCP
mx-lsp --tcp --port 9257
```

---

## Build System Integration

MX metadata integrates with popular build tools.

### Static Site Generators

**Eleventy:**

```javascript
// .eleventy.js
const mxPlugin = require('@mx-community/eleventy-plugin');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(mxPlugin, {
    validateOnBuild: true,
    generateJsonLd: true,
    inheritanceRoot: './content/'
  });
};
```

**Hugo:**

```toml
# config.toml
[module]
[[module.imports]]
  path = "github.com/mx-community/hugo-mx"
  
[params.mx]
  validate = true
  jsonld = true
```

**Next.js:**

```javascript
// next.config.js
const withMX = require('@mx-community/next-plugin');

module.exports = withMX({
  mx: {
    contentDir: './content',
    mediaDir: './public/assets',
    generateSitemap: true
  }
});
```

### Bundlers

**Webpack:**

```javascript
// webpack.config.js
const MXPlugin = require('@mx-community/webpack-plugin');

module.exports = {
  plugins: [
    new MXPlugin({
      validate: true,
      transform: ['structured-data', 'media']
    })
  ]
};
```

**Vite:**

```javascript
// vite.config.js
import mx from '@mx-community/vite-plugin';

export default {
  plugins: [
    mx({
      contentDir: 'content',
      outputJsonLd: true
    })
  ]
};
```

### CI/CD

**GitHub Actions:**

```yaml
# .github/workflows/validate.yml
name: Validate MX Metadata

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Validate metadata
        uses: mx-community/validate-action@v1
        with:
          paths: |
            content/
            assets/
            database/
          fail-on-warning: true
```

**GitLab CI:**

```yaml
# .gitlab-ci.yml
mx-validate:
  image: mx-community/cli:latest
  script:
    - mx-validate content/ assets/ database/
  rules:
    - changes:
        - "**/*.mx.yaml"
        - "**/*.md"
```

---

## CMS Integration

MX metadata works with content management systems.

### Headless CMS Adapters

**Contentful:**

```javascript
const { ContentfulMXAdapter } = require('@mx-community/contentful');

const adapter = new ContentfulMXAdapter({
  spaceId: 'your-space-id',
  accessToken: 'your-token'
});

// Export MX metadata from Contentful
await adapter.export('./fragments/');

// Import MX metadata to Contentful
await adapter.import('./fragments/');
```

**Sanity:**

```javascript
// sanity.config.js
import { mxPlugin } from '@mx-community/sanity-plugin';

export default defineConfig({
  plugins: [
    mxPlugin({
      schemaMapping: {
        product: 'product',
        article: 'article'
      }
    })
  ]
});
```

**Strapi:**

```javascript
// config/plugins.js
module.exports = {
  mx: {
    enabled: true,
    config: {
      exportPath: './mx-export',
      syncOnPublish: true
    }
  }
};
```

### Traditional CMS

**WordPress:**

```php
// wp-content/plugins/mx-metadata/mx-metadata.php
/*
Plugin Name: MX Metadata
Description: Export WordPress content with MX metadata
*/

add_action('save_post', 'mx_generate_metadata');
add_filter('the_content', 'mx_inject_jsonld');
```

**Drupal:**

```yaml
# mx_metadata.info.yml
name: 'MX Metadata'
type: module
description: 'MX metadata integration for Drupal'
core_version_requirement: ^10
```

---

## AI Platform Integration

MX metadata enhances AI system capabilities.

### Vector Databases

**Pinecone:**

```python
from mx_community import MXPineconeLoader

loader = MXPineconeLoader(
    index_name="content",
    mx_content_path="./fragments/"
)

# Load with MX metadata as vector metadata
loader.upsert_with_metadata(
    include_fields=["mx:status", "mx:confidence", "mx:audience"],
    chunk_strategy="semantic"
)
```

**Weaviate:**

```python
from mx_community import MXWeaviateSchema

schema = MXWeaviateSchema.from_fragment_model("./models/product.model.yaml")
client.schema.create_class(schema.to_weaviate())
```

### RAG Frameworks

**LangChain:**

```python
from langchain.document_loaders import MXLoader
from mx_community.langchain import MXRetriever

# Load documents with MX metadata
loader = MXLoader("./fragments/", respect_status=True)
documents = loader.load()

# Retrieve with MX-aware filtering
retriever = MXRetriever(
    vectorstore=vectorstore,
    filter_by_status="published",
    boost_by_confidence=True
)
```

**LlamaIndex:**

```python
from llama_index import MXReader

reader = MXReader(
    content_path="./fragments/",
    respect_permissions=True,
    chunk_by_mx_hints=True
)

documents = reader.load_data()
```

### AI Assistants

**Claude:**

```python
# Provide MX-enriched context to Claude
from mx_community import MXContextBuilder

context = MXContextBuilder()
context.add_fragment("./fragments/products/widget-pro.fragment.yaml")
context.add_related(depth=1)

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    system=context.to_system_prompt(),
    messages=[{"role": "user", "content": "Tell me about Widget Pro"}]
)
```

---

## Database Integration

### Schema Sync

```bash
# Generate MX metadata from live database
mx-database sync \
  --connection postgres://localhost/acme \
  --output ./database/ \
  --infer-semantics \
  --infer-pii

# Apply MX metadata as comments
mx-database annotate \
  --connection postgres://localhost/acme \
  --source ./database/
```

### Query Builders

```python
from mx_community.database import MXQueryBuilder

# Load table metadata
builder = MXQueryBuilder("./database/tables/")

# Generate safe queries
query = builder.select("orders") \
    .join("users", auto=True) \
    .filter_status("active") \
    .limit_results() \
    .build()

# Query respects MX metadata:
# - Joins based on relationship metadata
# - Applies default status filters
# - Respects max_results limits
# - Excludes never_expose columns
```

### BI Tools

**dbt:**

```yaml
# dbt_project.yml
vars:
  mx_metadata_path: ./database/

# Use MX metadata in model descriptions
# models/products.yml generated from MX
```

**Metabase:**

```bash
# Sync MX metadata to Metabase
mx-metabase sync \
  --mx-path ./database/ \
  --metabase-url https://metabase.example.com \
  --api-key $METABASE_API_KEY
```

---

## Extensions

MX is extensible. When the core specifications don't cover your needs, create extensions.

### Extension Structure

```yaml
# /extensions/acme-compliance/extension.yaml
mx:
  version: "1.0"

extension:
  name: acme-compliance
  namespace: acme
  version: "1.0.0"
  description: "Acme Corporation compliance metadata"
  
  extends:
    - base
    - database
    - fragments
    
  properties:
    acme:compliance_level:
      type: string
      enum: [public, internal, regulated, restricted]
      description: "Acme compliance classification"
      
    acme:data_owner:
      type: string
      description: "Business owner for data governance"
      
    acme:retention_policy:
      type: string
      enum: [standard, extended, legal_hold, ephemeral]
      description: "Data retention policy"
      
  rules:
    - name: regulated_requires_owner
      condition: "acme:compliance_level == 'regulated'"
      requires: ["acme:data_owner"]
      message: "Regulated content must have a data owner"
```

### Using Extensions

```yaml
# Content using the extension
mx:
  version: "1.0"
  extensions:
    - acme-compliance@1.0.0

fragment:
  id: "frag-customer-data-001"
  
# Extension properties
acme:compliance_level: regulated
acme:data_owner: "compliance-team@acme.example.com"
acme:retention_policy: legal_hold

mx:status: published
```

### Publishing Extensions

Share extensions with the community:

```bash
# Validate extension
mx-extension validate ./extensions/acme-compliance/

# Publish to registry
mx-extension publish ./extensions/acme-compliance/ \
  --registry https://mx.community/extensions
```

---

## The MX Community

The specifications in this book are maintained by the MX community at mx.community.

### Getting Involved

**Discord:** Real-time discussion, questions, and support

**GitHub:** Specification development, issue tracking, contributions

**Forum:** Long-form discussions, proposals, case studies

**Blog:** Updates, tutorials, best practices

### Contributing

Contributions are welcome at every level:

- **Report issues** when specifications are unclear
- **Suggest improvements** through proposals
- **Write documentation** and tutorials
- **Build tools** and integrations
- **Share patterns** from your implementations

### Governance

The MX specifications follow a community governance model:

- **Working groups** develop each specification
- **Proposals** go through RFC process
- **Major changes** require community consensus
- **Releases** follow semantic versioning

### Resources

| Resource | URL |
|----------|-----|
| Specifications | mx.community/spec/ |
| Tools | mx.community/tools/ |
| Extensions | mx.community/extensions/ |
| Documentation | mx.community/docs/ |
| GitHub | github.com/mx-community |
| Discord | discord.gg/mx-community |

---

## Building Your Practice

Tools and community resources support you, but building an MX practice requires more than software.

### Start Small

Don't try to implement every specification at once:

1. Pick one content type that would benefit most
2. Add basic MX metadata
3. Validate and iterate
4. Expand to related content
5. Add more specifications as needed

### Build Incrementally

Metadata quality improves over time:

```
Week 1: Basic status and audience
Week 2: Add confidence and volatility
Week 3: Add AI permissions
Week 4: Add relationships
Week 5: Add data lake properties
...
```

### Measure Value

Track what MX metadata enables:

- AI assistant accuracy before/after
- Search relevance improvements
- Content reuse across channels
- Compliance audit efficiency
- Documentation currency

### Share Learnings

Your experience helps others:

- Document patterns that work
- Share challenges and solutions
- Contribute to community resources
- Help newcomers get started

---

## The Journey Continues

You've learned the specifications. You've seen the tools. You've met the community.

Now the real work begins.

MX specifications describe a vision: content that carries its own meaning, that machines can understand as well as humans do, that flows seamlessly across channels and systems and AI assistants.

Realising that vision happens one metadata declaration at a time. Every `mx:status` you add. Every relationship you document. Every AI permission you declare. Each one moves the ecosystem forward.

The orchestra is assembling. The choir is warming up. The music is about to begin.

Welcome to Machine Experience.

---

*The appendices provide quick reference guides for each specification, along with the complete specification documents for detailed consultation.*
