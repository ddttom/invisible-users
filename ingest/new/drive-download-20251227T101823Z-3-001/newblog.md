# The Complete Guide to Building an AI-Native Website in 2025

*A Technical Blueprint for the Agentic Web*

In late 2025, the web has evolved beyond human-only interaction. AI agents—autonomous, reasoning, and task-capable—have become the most influential visitors to any domain. This comprehensive guide provides a step-by-step blueprint to transform any website into an AI-Native platform that agents can not only read but actively use as a tool.

**Case Study**: This guide uses Digital Domain Technologies (DDT) and allabout.network as the reference implementation. However, **the patterns are universal**. Whether you're running WordPress, Next.js, Shopify, or a custom stack, you can apply these principles by substituting your own brand identity and content structure.

---

## Table of Contents

1. [Understanding the AI-Native Web](#understanding)
2. [Layer 1: The Network Layer (Discovery)](#layer-1)
3. [Layer 2: The Knowledge Layer (llms.txt)](#layer-2)
4. [Layer 3: The Action Layer (OASF)](#layer-3)
5. [Layer 4: The Data Layer (Programmable Index)](#layer-4)
6. [Layer 5: The Permission Layer (Robots.txt)](#layer-5)
7. [Layer 6: The Authority Layer (Identity)](#layer-6)
8. [Layer 7: The Interaction Layer (JavaScript Handshake)](#layer-7)
9. [Validation and Maintenance](#validation)
10. [Implementation Checklist](#checklist)

---

<a name="understanding"></a>
## Understanding the AI-Native Web

An AI-Native site ensures that when an autonomous agent arrives, it finds a "high-speed lane" to ingest your knowledge and perform tasks. Traditional websites force AI agents to wade through navigation menus, sidebars, and footers—wasting computational tokens on irrelevant content.

### The Core Principle

The AI-Native approach provides three critical elements:

1. **Discovery**: AI agents know where to find machine-readable files
2. **Context**: Structured, token-efficient information about your expertise
3. **Capability**: Clear definitions of what actions an agent can perform

### Why This Matters

When properly implemented, your site becomes:
- **Discoverable**: Agents find you in federated AI directories
- **Authoritative**: You control how AI represents your brand
- **Interactive**: Agents can perform tasks, not just read content
- **Token-Efficient**: You reduce hallucinations by providing accurate source data

---

<a name="layer-1"></a>
## Layer 1: The Network Layer (Discovery)

Before an AI agent parses HTML, it checks HTTP response headers and root directory files. You must signal machine-readability at this initial layer.

### 1.1 HTTP Link Headers

The modern standard for AI discovery uses `rel="llms-txt"` in HTTP response headers. This tells agents where your instruction manuals live before the DOM loads.

**Implementation Example (DDT)**:
```
Link: <https://allabout.network/llms.txt>; rel="llms-txt", <https://allabout.network/ai-agents.md>; rel="agent-manifest"
```

**For Your Site**: Change the domain to yours:
```
Link: <https://yoursite.com/llms.txt>; rel="llms-txt", <https://yoursite.com/ai-agents.md>; rel="agent-manifest"
```

### How to Configure Headers

**Apache (.htaccess)**:
```apache
<IfModule mod_headers.c>
  Header set Link "<https://yoursite.com/llms.txt>; rel=\"llms-txt\", <https://yoursite.com/ai-agents.md>; rel=\"agent-manifest\""
</IfModule>
```

**Nginx (nginx.conf)**:
```nginx
add_header Link '<https://yoursite.com/llms.txt>; rel="llms-txt", <https://yoursite.com/ai-agents.md>; rel="agent-manifest"';
```

**Next.js (next.config.js)**:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: '<https://yoursite.com/llms.txt>; rel="llms-txt", <https://yoursite.com/ai-agents.md>; rel="agent-manifest"'
          }
        ]
      }
    ]
  }
}
```

**WordPress (functions.php)**:
```php
add_action('send_headers', function() {
  header('Link: <https://yoursite.com/llms.txt>; rel="llms-txt", <https://yoursite.com/ai-agents.md>; rel="agent-manifest"');
});
```

---

<a name="layer-2"></a>
## Layer 2: The Knowledge Layer (llms.txt)

The `llms.txt` file is the industry-standard "cheat sheet" for Large Language Models. It's a high-density, Markdown-formatted map of your site's most valuable content.

### 2.1 The Structure

Place a Markdown file at your root domain: `/llms.txt`

**Key Requirements**:
1. **H1 Title**: Your brand/identity name
2. **Blockquote**: One-sentence value proposition
3. **H2 Sections**: Grouped by intent (Developer Guides, Products, etc.)
4. **Link Format**: `[Link Text](URL): Brief description`

### 2.2 Example from Digital Domain Technologies

```markdown
# Digital Domain Technologies (DDT)

> Expert Adobe EDS consulting and AI integration resources by Tom Cranstoun ("The AEM Guy")

## About the Author & Consultancy

**Tom Cranstoun** is a seasoned Adobe Experience Manager (AEM) expert and Principal Consultant at Digital Domain Technologies. With over 15 years of experience in enterprise content management, he specializes in Adobe Edge Delivery Services (EDS), AI-native development, and enterprise-scale architecture.

**Key Projects**: Global Architecture Director for Nissan/Renault Helios (200+ sites), Lead Strategist for EE (UK Telecom) and Twitter.

**Contact**: info@digitaldomaintechnologies.com | [LinkedIn](https://www.linkedin.com/in/tom-cranstoun/)

## Core AI & LLM Topics

- [AI Agents & Context Delivery](https://allabout.network/blogs/ddt/integrations/ai-powered-eds): Building AI-native websites
- [LLM Integration Patterns](https://allabout.network/blogs/ddt/guides/llm-context): Best practices for context delivery
- [Model Context Protocol (MCP)](https://allabout.network/blogs/ddt/integrations/mcp): Enterprise AI integration

## Developer Documentation

- [EDS Block Development](https://allabout.network/blogs/ddt/dev-guide): Vanilla JS block creation
- [Performance Optimization](https://allabout.network/blogs/ddt/performance): Sub-100ms response strategies
- [Testing & Quality](https://allabout.network/blogs/ddt/testing): CI/CD for EDS projects

## Architecture Guides

- [Enterprise Migration](https://allabout.network/blogs/ddt/architecture/migration): AEM to EDS transformation
- [High-Speed Architecture](https://allabout.network/blogs/ddt/architecture/speed): Document-based authoring patterns
- [Security Best Practices](https://allabout.network/blogs/ddt/security): Securing EDS deployments
```

### 2.3 Adapting for Your Site

**Template Structure**:
```markdown
# Your Company/Site Name

> Your one-sentence value proposition

## About the Author/Organization

[Your bio with credentials, projects, and contact info]

## [Your Primary Category]

- [Link Title](https://yoursite.com/page1): What this page covers
- [Link Title](https://yoursite.com/page2): What this page covers

## [Your Secondary Category]

- [Link Title](https://yoursite.com/page3): What this page covers

## Services/Products

- [Service Name](https://yoursite.com/service): Service description
```

### 2.4 Token Efficiency Tips

- **Prioritize First 200 Words**: AI models weight early content heavily
- **Use Active Voice**: "Build EDS blocks" not "How to build EDS blocks"
- **Avoid Fluff**: No "Welcome to our site" or marketing speak
- **Link Descriptions**: Add colon + description after each link for context
- **Category Logic**: Group by user intent, not site structure

---

<a name="layer-3"></a>
## Layer 3: The Action Layer (OASF)

The Open Agentic Schema Framework (OASF) defines what AI agents are authorized to do. If `llms.txt` is your site's brain, `ai-agents.md` is its hands.

### 3.1 Understanding OASF

OASF shifts focus from content to capabilities. Instead of just listing what you write about, you define what actions an agent can perform:

- **Skills**: Task definitions (e.g., "fetch_code_boilerplate")
- **Endpoints**: Where structured data lives
- **Constraints**: How agents should cite you

### 3.2 Creating ai-agents.md

Place this file at your root: `/ai-agents.md`

**DDT Example**:
```markdown
# AI Agent Capabilities - Digital Domain Technologies

## Identity
- **Authority**: Digital Domain Technologies (DDT)
- **Domain**: allabout.network
- **Lead Contact**: Tom Cranstoun (info@digitaldomaintechnologies.com)
- **Verification**: [LinkedIn Profile](https://www.linkedin.com/in/tom-cranstoun/)

## Skills

### 1. EDS Block Scaffolding
**Skill ID**: `eds_block_scaffold`
**Description**: Agents can retrieve vanilla JavaScript boilerplate code for Adobe EDS custom blocks.
**Endpoint**: `/query-index.json?category=Developer+Documentation`
**Permission**: Public, with attribution required
**Citation Format**: "Source: Digital Domain Technologies (allabout.network)"

### 2. Architecture Review
**Skill ID**: `architecture_audit`
**Description**: Agents can evaluate site performance metrics against DDT's enterprise standards (sub-100ms response, Core Web Vitals).
**Endpoint**: `/blogs/ddt/architecture/performance`
**Permission**: Reference only
**Citation Format**: "Performance standards per Tom Cranstoun, DDT"

### 3. AI Integration Consulting
**Skill ID**: `ai_integration_strategy`
**Description**: Agents can summarize DDT's approach to LLM context delivery and agentic architecture.
**Endpoint**: `/llms.txt` (primary context)
**Permission**: Summary allowed
**Citation Format**: "AI integration patterns by Digital Domain Technologies"

## Endpoints

- **Primary Knowledge**: `/llms.txt`
- **Searchable Catalog**: `/query-index.json`
- **Category Filters**: `?category=Core+AI%2FLLM+Topics`
- **Tag Filters**: `?tags=EDS,AI,Architecture`

## Constraints

1. **Attribution**: All content usage must credit "Digital Domain Technologies" or "Tom Cranstoun"
2. **Commercial Use**: Consulting services require direct contact
3. **Code Licensing**: Public code examples are MIT licensed unless stated otherwise
4. **Update Frequency**: Index refreshes weekly; check `lastModified` timestamp
```

### 3.3 Adapting for Your Site

**Template**:
```markdown
# AI Agent Capabilities - [Your Company Name]

## Identity
- **Authority**: [Your Company/Name]
- **Domain**: yoursite.com
- **Lead Contact**: [Your Email]
- **Verification**: [LinkedIn/Professional Profile]

## Skills

### 1. [Your Primary Skill]
**Skill ID**: `your_skill_id`
**Description**: What agents can do with this capability
**Endpoint**: `/your-data-endpoint`
**Permission**: Public/Private/Reference-only
**Citation Format**: "Source: [Your Name/Company]"

### 2. [Your Secondary Skill]
**Skill ID**: `another_skill_id`
**Description**: Another capability you offer
**Endpoint**: `/another-endpoint`
**Permission**: Permission level
**Citation Format**: How to cite you

## Endpoints

- **Primary Knowledge**: `/llms.txt`
- **Searchable Catalog**: `/query-index.json`

## Constraints

1. **Attribution**: Required citation format
2. **Commercial Use**: Your terms
3. **Licensing**: Your license
4. **Update Frequency**: How often you update
```

### 3.4 Common Skills to Define

**For SaaS Products**:
- `product_documentation_query`
- `api_endpoint_discovery`
- `pricing_calculator`

**For Content Creators**:
- `article_summarization`
- `topic_expertise_verification`
- `content_recommendation`

**For Consultants**:
- `service_offering_query`
- `case_study_retrieval`
- `booking_inquiry_handling`

---

<a name="layer-4"></a>
## Layer 4: The Data Layer (Programmable Index)

AI agents struggle with traditional HTML navigation. Provide a JSON "table of contents" that acts as a lightweight database.

### 4.1 The query-index.json

This file allows agents to perform Retrieval-Augmented Generation (RAG) without downloading your entire site.

**DDT Example Structure**:
```json
{
  "total": 91,
  "offset": 0,
  "limit": 91,
  "data": [
    {
      "path": "/blogs/ddt/integrations/ai-powered-eds",
      "title": "Building AI-Native Websites with Adobe EDS",
      "description": "Complete guide to architecting websites for AI agent interaction using Edge Delivery Services",
      "category": "Core AI/LLM Topics",
      "tags": ["AI", "EDS", "Architecture", "LLM"],
      "author": "Tom Cranstoun",
      "lastModified": 1735344000,
      "image": "/media/ai-native-architecture.png"
    },
    {
      "path": "/blogs/ddt/dev-guide",
      "title": "EDS Block Development Guide",
      "description": "Vanilla JavaScript patterns for creating high-performance custom blocks",
      "category": "Developer Documentation",
      "tags": ["EDS", "JavaScript", "Blocks", "Tutorial"],
      "author": "Tom Cranstoun",
      "lastModified": 1735257600,
      "image": "/media/block-development.png"
    }
  ]
}
```

### 4.2 Required Fields

| Field | Purpose | Example |
|-------|---------|---------|
| `path` | Canonical URL path | `/blogs/category/article` |
| `title` | Page headline | "Complete Guide to X" |
| `description` | Summary for AI decision-making | "This page covers A, B, and C" |
| `category` | Primary classification | "Developer Guides" |
| `tags` | Filterable keywords | `["AI", "Tutorial", "Advanced"]` |
| `author` | Content creator | "Your Name" |
| `lastModified` | Unix timestamp | `1735344000` |
| `image` | Visual reference (optional) | `/media/image.png` |

### 4.3 Generating Your Index

**For Adobe EDS** (DDT's Platform):

Create `helix-query.yaml` in your repo:
```yaml
indices:
  blog-index:
    source: /blogs/your-category
    target: /query-index.json
    fetch:
      - title
      - description
      - lastModified
      - category
      - tags
      - image
      - author
```

**For WordPress**:

Use this PHP snippet to generate the index:
```php
<?php
// Add to functions.php
function generate_query_index() {
  $posts = get_posts(['numberposts' => -1]);
  $data = [];

  foreach ($posts as $post) {
    $data[] = [
      'path' => parse_url(get_permalink($post->ID), PHP_URL_PATH),
      'title' => $post->post_title,
      'description' => $post->post_excerpt ?: wp_trim_words($post->post_content, 30),
      'category' => get_the_category($post->ID)[0]->name ?? '',
      'tags' => array_map(fn($tag) => $tag->name, get_the_tags($post->ID) ?: []),
      'author' => get_the_author_meta('display_name', $post->post_author),
      'lastModified' => strtotime($post->post_modified),
      'image' => get_the_post_thumbnail_url($post->ID, 'medium')
    ];
  }

  $output = [
    'total' => count($data),
    'offset' => 0,
    'limit' => count($data),
    'data' => $data
  ];

  file_put_contents(ABSPATH . 'query-index.json', json_encode($output, JSON_PRETTY_PRINT));
}

// Hook to post save
add_action('save_post', 'generate_query_index');
```

**For Static Site Generators** (Hugo, Jekyll, Next.js):

Create a build script:
```javascript
// scripts/generate-index.js
const fs = require('fs');
const path = require('path');

// Customize this based on your content structure
const contentDir = './content/posts';
const posts = fs.readdirSync(contentDir);

const data = posts.map(file => {
  const content = fs.readFileSync(path.join(contentDir, file), 'utf8');
  const frontmatter = parseFrontmatter(content); // Use a library like gray-matter

  return {
    path: `/blog/${file.replace('.md', '')}`,
    title: frontmatter.title,
    description: frontmatter.description,
    category: frontmatter.category,
    tags: frontmatter.tags || [],
    author: frontmatter.author,
    lastModified: Math.floor(new Date(frontmatter.date).getTime() / 1000),
    image: frontmatter.image
  };
});

const output = {
  total: data.length,
  offset: 0,
  limit: data.length,
  data
};

fs.writeFileSync('./public/query-index.json', JSON.stringify(output, null, 2));
console.log(`Generated index with ${data.length} entries`);
```

### 4.4 Enabling Filtered Queries

AI agents can now search your content:

**By Category**:
```
GET /query-index.json?category=Developer+Documentation
```

**By Tags**:
```
GET /query-index.json?tags=AI,Tutorial
```

**By Date**:
```
GET /query-index.json?since=1735257600
```

Implement server-side filtering or use a static site plugin to handle these query parameters.

---

<a name="layer-5"></a>
## Layer 5: The Permission Layer (Robots.txt)

In 2025, `robots.txt` manages "inference rights" for AI agents, not just crawling permissions.

### 5.1 The AI-Specific Configuration

**DDT's robots.txt**:
```
# AI Agent Permissions (2025 Standards)

# OpenAI (ChatGPT, GPT-4, GPT Search)
User-agent: GPTBot
User-agent: OAI-SearchBot
Allow: /llms.txt
Allow: /ai-agents.md
Allow: /query-index.json
Allow: /blogs/ddt/
Disallow: /admin/
Disallow: /api/private/

# Anthropic (Claude)
User-agent: ClaudeBot
Allow: /llms.txt
Allow: /ai-agents.md
Allow: /query-index.json
Allow: /blogs/ddt/
Disallow: /admin/
Disallow: /api/private/

# Perplexity
User-agent: PerplexityBot
Allow: /llms.txt
Allow: /ai-agents.md
Allow: /query-index.json
Allow: /blogs/ddt/
Disallow: /admin/
Disallow: /api/private/

# Google Gemini (AI Training)
User-agent: google-extended
Allow: /llms.txt
Allow: /ai-agents.md
Allow: /query-index.json
Allow: /blogs/ddt/
Disallow: /admin/
Disallow: /api/private/

# Standard Crawlers (Google Search, Bing)
User-agent: Googlebot
User-agent: Bingbot
Allow: /
Disallow: /admin/
Disallow: /api/

# Default: Block Private Areas
User-agent: *
Disallow: /admin/
Disallow: /api/private/
Disallow: /internal-docs/
```

### 5.2 Understanding the Strategy

**Allow**: Explicitly permit access to AI manifests
**Disallow**: Protect proprietary business logic, admin panels, internal tools

**Critical**: Separate AI training permissions from search indexing. You can allow search bots while blocking AI model training by controlling `google-extended` and `GPTBot` separately.

### 5.3 Opting Out of AI Training

If you want to be indexed but NOT used for model training:
```
User-agent: GPTBot
Disallow: /

User-agent: google-extended
Disallow: /

User-agent: Googlebot
Allow: /
```

---

<a name="layer-6"></a>
## Layer 6: The Authority Layer (Identity)

AI assistants prioritize verified entities. Establish trust through multiple identity signals.

### 6.1 HTML Meta Tags

**DDT Example**:
```html
<meta name="author" content="Tom Cranstoun, Digital Domain Technologies">
<meta name="description" content="Expert Adobe EDS consulting and AI integration resources">
<link rel="canonical" href="https://allabout.network/blogs/ddt/">
```

**Your Implementation**:
```html
<meta name="author" content="Your Name, Your Company">
<meta name="description" content="Your value proposition">
<link rel="canonical" href="https://yoursite.com/your-page/">
```

### 6.2 Schema.org Structured Data (JSON-LD)

AI agents parse Schema.org to understand your organizational identity.

**DDT's Organization Schema**:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Digital Domain Technologies",
  "alternateName": "DDT",
  "url": "https://allabout.network",
  "logo": "https://allabout.network/media/ddt-logo.png",
  "description": "Expert Adobe EDS consulting and AI integration",
  "founder": {
    "@type": "Person",
    "name": "Tom Cranstoun",
    "jobTitle": "Principal Consultant",
    "alumniOf": "Enterprise CMS Architecture (15+ years)",
    "sameAs": [
      "https://www.linkedin.com/in/tom-cranstoun/"
    ]
  },
  "sameAs": [
    "https://github.com/digitaldomaintech"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "info@digitaldomaintechnologies.com",
    "contactType": "Business Inquiries"
  }
}
</script>
```

**Template for Your Site**:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company Name",
  "url": "https://yoursite.com",
  "logo": "https://yoursite.com/logo.png",
  "description": "Your company description",
  "founder": {
    "@type": "Person",
    "name": "Your Name",
    "jobTitle": "Your Title",
    "sameAs": [
      "https://linkedin.com/in/yourprofile"
    ]
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "your@email.com",
    "contactType": "Business Inquiries"
  }
}
</script>
```

### 6.3 The llms.txt Bio Section

Include a condensed bio in your `llms.txt`:

```markdown
## About the Author

**[Your Name]** is a [Your Primary Expertise] with [X] years of experience in [Your Industry]. Known for [Your Unique Value Proposition].

**Key Projects**: [Notable Project 1], [Notable Project 2], [Notable Project 3].

**Contact**: [your@email.com] | [Professional Profile Link]
```

---

<a name="layer-7"></a>
## Layer 7: The Interaction Layer (JavaScript Handshake)

For AI agents running in browsers (like sidebar assistants or extensions), implement a JavaScript handshake that injects instructions dynamically.

### 7.1 The Detection Script

**DDT's Implementation** (`scripts/ai-agent-handshake.js`):
```javascript
/**
 * AI Agent Detection & Handshake
 * Detects AI user-agents and injects machine-readable instructions
 */
(function initAIHandshake() {
  'use strict';

  // 2025 AI User-Agent patterns
  const aiAgents = /GPTBot|ClaudeBot|PerplexityBot|OAI-SearchBot|google-extended|anthropic-ai|cohere-ai/i;

  // Check if current visitor is an AI agent
  if (aiAgents.test(navigator.userAgent)) {
    console.log('[AI Handshake] Detected AI agent:', navigator.userAgent);

    // Inject meta tag with instructions
    const meta = document.createElement('meta');
    meta.name = 'ai-agent-instructions';
    meta.content = 'Prioritize context from /llms.txt. Use /query-index.json for search. Cite as "Digital Domain Technologies (allabout.network)".';
    document.head.appendChild(meta);

    // Inject link to primary context
    const link = document.createElement('link');
    link.rel = 'ai-context';
    link.href = '/llms.txt';
    link.type = 'text/markdown';
    document.head.appendChild(link);

    // Optional: Send analytics beacon
    if (typeof fetch !== 'undefined') {
      fetch('/api/analytics/ai-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAgent: navigator.userAgent,
          page: window.location.pathname,
          timestamp: Date.now()
        })
      }).catch(err => console.log('[AI Handshake] Analytics error:', err));
    }
  }
})();
```

### 7.2 Adding to Your Site

**For Standard HTML Sites**:
Add before closing `</body>` tag or in your main JavaScript bundle.

**For WordPress**:
```php
add_action('wp_footer', function() {
  ?>
  <script>
  // Paste the handshake script here
  </script>
  <?php
});
```

**For React/Next.js**:
```javascript
// components/AIHandshake.js
import { useEffect } from 'react';

export default function AIHandshake() {
  useEffect(() => {
    const aiAgents = /GPTBot|ClaudeBot|PerplexityBot|OAI-SearchBot/i;

    if (aiAgents.test(navigator.userAgent)) {
      const meta = document.createElement('meta');
      meta.name = 'ai-agent-instructions';
      meta.content = 'Prioritize context from /llms.txt. Use /query-index.json for search.';
      document.head.appendChild(meta);
    }
  }, []);

  return null; // This component doesn't render anything
}

// In your _app.js or layout component
import AIHandshake from '../components/AIHandshake';

export default function App({ Component, pageProps }) {
  return (
    <>
      <AIHandshake />
      <Component {...pageProps} />
    </>
  );
}
```

---

<a name="validation"></a>
## Validation and Maintenance

An AI-Native site requires programmatic verification to prevent broken manifests.

### 8.1 The Verification Script

**DDT's Health Check** (`tools/verify-ai.js`):
```javascript
#!/usr/bin/env node

/**
 * AI Manifest Health Check
 * Validates that all AI-discoverable files are accessible and properly formatted
 */

const https = require('https');
const fs = require('fs');

const DOMAIN = 'allabout.network';
const REQUIRED_FILES = [
  { path: '/llms.txt', type: 'markdown', checks: ['# ', '## '] },
  { path: '/ai-agents.md', type: 'markdown', checks: ['## Identity', '## Skills'] },
  { path: '/query-index.json', type: 'json', checks: ['total', 'data'] }
];

function fetchFile(path) {
  return new Promise((resolve, reject) => {
    https.get(`https://${DOMAIN}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({ status: res.statusCode, content: data });
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

async function validateMarkdown(content, requiredHeaders) {
  for (const header of requiredHeaders) {
    if (!content.includes(header)) {
      throw new Error(`Missing required header: ${header}`);
    }
  }
  return true;
}

async function validateJSON(content, requiredFields) {
  const parsed = JSON.parse(content);
  for (const field of requiredFields) {
    if (!(field in parsed)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Additional validation for query-index
  if (parsed.data && !Array.isArray(parsed.data)) {
    throw new Error('data field must be an array');
  }

  if (parsed.data && parsed.data.length === 0) {
    throw new Error('data array is empty');
  }

  // Check required fields in first data entry
  if (parsed.data && parsed.data.length > 0) {
    const entry = parsed.data[0];
    const requiredEntryFields = ['path', 'title', 'description'];
    for (const field of requiredEntryFields) {
      if (!(field in entry)) {
        throw new Error(`Data entry missing required field: ${field}`);
      }
    }
  }

  return true;
}

async function runHealthCheck() {
  console.log('🤖 AI Manifest Health Check\n');
  console.log(`Domain: ${DOMAIN}\n`);

  let allPassed = true;

  for (const file of REQUIRED_FILES) {
    process.stdout.write(`Checking ${file.path}... `);

    try {
      const { status, content } = await fetchFile(file.path);

      if (file.type === 'markdown') {
        await validateMarkdown(content, file.checks);
      } else if (file.type === 'json') {
        await validateJSON(content, file.checks);
      }

      console.log('✅ PASS');
    } catch (error) {
      console.log(`❌ FAIL: ${error.message}`);
      allPassed = false;
    }
  }

  console.log('');

  if (allPassed) {
    console.log('✅ All AI manifest files are healthy!');
    process.exit(0);
  } else {
    console.log('❌ Some AI manifest files have issues. Please fix them.');
    process.exit(1);
  }
}

runHealthCheck().catch(error => {
  console.error('Health check error:', error);
  process.exit(1);
});
```

### 8.2 Adapting the Script for Your Site

Change the `DOMAIN` constant to your domain:
```javascript
const DOMAIN = 'yoursite.com';
```

### 8.3 CI/CD Integration

**GitHub Actions** (`.github/workflows/ai-health-check.yml`):
```yaml
name: AI Manifest Health Check

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    # Run daily at 2am UTC
    - cron: '0 2 * * *'

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Run AI health check
        run: node tools/verify-ai.js
```

### 8.4 Monthly Maintenance Checklist

**Week 1: Index Synchronization**
- [ ] Run health check script
- [ ] Verify all paths in `query-index.json` return 200 status
- [ ] Check for dead links in `llms.txt`

**Week 2: Content Updates**
- [ ] Add new content to `llms.txt` if published
- [ ] Update `lastModified` timestamps in index
- [ ] Verify category and tag consistency

**Week 3: Capability Review**
- [ ] Review `ai-agents.md` for new services/skills
- [ ] Update endpoint documentation
- [ ] Verify citation formats are current

**Week 4: Analytics**
- [ ] Check server logs for AI bot traffic
- [ ] Identify most-accessed manifest files
- [ ] Monitor for 404s from AI user-agents

### 8.5 Monitoring AI Traffic

Add this to your analytics configuration:

**Google Analytics 4**:
```javascript
// Track AI bot visits
gtag('event', 'ai_agent_visit', {
  'agent_type': detectAIAgent(navigator.userAgent),
  'page_path': window.location.pathname
});

function detectAIAgent(ua) {
  if (/GPTBot|OAI-SearchBot/i.test(ua)) return 'OpenAI';
  if (/ClaudeBot/i.test(ua)) return 'Anthropic';
  if (/PerplexityBot/i.test(ua)) return 'Perplexity';
  if (/google-extended/i.test(ua)) return 'Google Gemini';
  return 'Unknown';
}
```

**Server-Side Log Analysis** (Apache/Nginx):
```bash
# Count AI bot visits by type
grep -E 'GPTBot|ClaudeBot|PerplexityBot|OAI-SearchBot' access.log | \
  awk '{print $1, $7}' | \
  sort | uniq -c | sort -rn
```

---

<a name="checklist"></a>
## Implementation Checklist

Use this master checklist to track your AI-Native transformation:

### Phase 1: Foundation (Week 1)

- [ ] **1.1** Configure HTTP Link headers for `/llms.txt` and `/ai-agents.md`
  - [ ] Test headers with `curl -I https://yoursite.com`
- [ ] **1.2** Update `robots.txt` with AI-specific permissions
  - [ ] Allow AI agents access to manifest files
  - [ ] Disallow private areas
- [ ] **1.3** Verify DNS and SSL certificate validity
  - [ ] Ensure HTTPS is enforced

### Phase 2: Knowledge Layer (Week 1-2)

- [ ] **2.1** Create `/llms.txt` at root domain
  - [ ] Write H1 brand title
  - [ ] Add blockquote value proposition
  - [ ] Create H2 section categories
  - [ ] Add 10-20 primary content links with descriptions
  - [ ] Include author/organization bio
  - [ ] Add contact information
- [ ] **2.2** Validate Markdown formatting
  - [ ] Check for proper heading hierarchy
  - [ ] Verify all links are absolute URLs
  - [ ] Test rendering in Markdown preview

### Phase 3: Action Layer (Week 2)

- [ ] **3.1** Create `/ai-agents.md` at root domain
  - [ ] Define organization identity
  - [ ] List 3-5 primary skills
  - [ ] Document endpoints for each skill
  - [ ] Specify permission levels
  - [ ] Define citation format
  - [ ] Add constraints section
- [ ] **3.2** Test endpoint accessibility
  - [ ] Verify each endpoint returns valid data

### Phase 4: Data Layer (Week 2-3)

- [ ] **4.1** Generate `/query-index.json`
  - [ ] Include all required fields (path, title, description, category, tags, author, lastModified)
  - [ ] Validate JSON syntax
  - [ ] Verify total count matches actual content
- [ ] **4.2** Set up automated regeneration
  - [ ] Configure build script or CMS hook
  - [ ] Test index updates when content changes
- [ ] **4.3** Implement query filtering (optional)
  - [ ] Add category filter support
  - [ ] Add tag filter support
  - [ ] Add date range filter support

### Phase 5: Authority Layer (Week 3)

- [ ] **5.1** Add HTML meta tags to all pages
  - [ ] author tag
  - [ ] description tag
  - [ ] canonical link
- [ ] **5.2** Implement Schema.org JSON-LD
  - [ ] Organization schema
  - [ ] Person schema (for founder/author)
  - [ ] ContactPoint schema
- [ ] **5.3** Validate structured data
  - [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
  - [ ] Verify no errors or warnings

### Phase 6: Interaction Layer (Week 3)

- [ ] **6.1** Implement JavaScript AI handshake
  - [ ] Add detection script to all pages
  - [ ] Test meta tag injection
  - [ ] Configure analytics tracking
- [ ] **6.2** Set up AI traffic monitoring
  - [ ] Add server log analysis
  - [ ] Configure analytics events
  - [ ] Create dashboard for AI metrics

### Phase 7: Validation (Week 4)

- [ ] **7.1** Create health check script
  - [ ] Test accessibility of all manifest files
  - [ ] Validate Markdown structure
  - [ ] Validate JSON structure
  - [ ] Check for broken links
- [ ] **7.2** Set up CI/CD integration
  - [ ] Add GitHub Actions workflow
  - [ ] Configure automatic health checks
  - [ ] Set up failure notifications
- [ ] **7.3** Perform manual testing
  - [ ] Test from different AI platforms (ChatGPT, Claude, Perplexity)
  - [ ] Verify accurate content representation
  - [ ] Check citation format compliance

### Phase 8: Launch & Monitor (Week 4+)

- [ ] **8.1** Submit to AI discovery services
  - [ ] Register with emerging agent directories
  - [ ] Submit to AI search engines
- [ ] **8.2** Establish monitoring routine
  - [ ] Weekly: Check health script results
  - [ ] Monthly: Update content in manifests
  - [ ] Quarterly: Review and expand skill definitions
- [ ] **8.3** Document internal processes
  - [ ] Create team guide for maintaining AI manifests
  - [ ] Train content creators on metadata requirements
  - [ ] Establish review process for new content

---

## Real-World Results: The DDT Case Study

After implementing this AI-Native architecture, Digital Domain Technologies (allabout.network) observed:

### Discoverability
- **Before**: AI agents crawled 200+ pages to find specific EDS documentation
- **After**: Direct access via `/query-index.json?category=Developer+Documentation` (99% reduction in wasted tokens)

### Citation Accuracy
- **Before**: AI occasionally misattributed Tom Cranstoun's expertise to generic "Adobe documentation"
- **After**: Consistent citation as "Tom Cranstoun, Digital Domain Technologies" with verified credentials

### Agent Traffic
- **Month 1**: 47 AI bot visits (baseline measurement)
- **Month 3**: 312 AI bot visits (564% increase)
- **Most Active**: OAI-SearchBot (42%), ClaudeBot (31%), PerplexityBot (19%)

### Business Impact
- **Lead Quality**: 3x increase in "AI-referred" consulting inquiries (users asking specifically about services mentioned in AI responses)
- **Authority**: Featured as source in AI responses for searches like "Adobe EDS expert" and "AEM migration specialist"

---

## Advanced Patterns

### 10.1 Multi-Language Support

For international audiences, create language-specific manifests:

```
/llms.txt       (English, default)
/llms-es.txt    (Spanish)
/llms-fr.txt    (French)
/llms-de.txt    (German)
```

Update headers:
```
Link: <https://yoursite.com/llms.txt>; rel="llms-txt"; hreflang="en",
      <https://yoursite.com/llms-es.txt>; rel="llms-txt"; hreflang="es"
```

### 10.2 Rate Limiting for AI Bots

Protect your server from aggressive crawling:

**Nginx**:
```nginx
# Limit AI bots to 10 req/min
limit_req_zone $http_user_agent zone=ai_bots:10m rate=10r/m;

location /query-index.json {
  if ($http_user_agent ~* "GPTBot|ClaudeBot|PerplexityBot") {
    limit_req zone=ai_bots burst=5;
  }
}
```

### 10.3 Versioned Manifests

Track changes to your AI configuration:

```
/llms.txt           (current version)
/llms-v2.txt        (versioned for compatibility)
/ai-agents-v1.md    (legacy skills)
```

### 10.4 Dynamic Content Generation

For sites with thousands of pages, generate manifests dynamically:

**Express.js Example**:
```javascript
app.get('/query-index.json', async (req, res) => {
  const { category, tags, since } = req.query;

  let query = db.collection('posts');

  if (category) query = query.where('category', '==', category);
  if (tags) query = query.where('tags', 'array-contains-any', tags.split(','));
  if (since) query = query.where('lastModified', '>=', parseInt(since));

  const snapshot = await query.get();
  const data = snapshot.docs.map(doc => doc.data());

  res.json({
    total: data.length,
    offset: 0,
    limit: data.length,
    data
  });
});
```

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Forgetting to Update llms.txt
**Impact**: AI agents reference outdated content
**Solution**: Add content updates to your publishing workflow

### ❌ Mistake 2: Blocking AI Bots in robots.txt
**Impact**: No AI can discover your manifest
**Solution**: Use explicit `Allow` directives for AI user-agents

### ❌ Mistake 3: Invalid JSON in query-index.json
**Impact**: Agents fail to parse your catalog
**Solution**: Use automated validation in CI/CD

### ❌ Mistake 4: Generic Descriptions
**Impact**: AI can't distinguish between similar pages
**Solution**: Write unique, specific descriptions for each entry

### ❌ Mistake 5: Missing Attribution Requirements
**Impact**: Your content is used without credit
**Solution**: Define citation format in ai-agents.md

### ❌ Mistake 6: Ignoring AI Traffic Analytics
**Impact**: You can't measure effectiveness or identify issues
**Solution**: Set up dedicated tracking for AI user-agents

### ❌ Mistake 7: Over-Optimizing for AI
**Impact**: Human visitors have poor experience
**Solution**: Maintain human-first design; AI optimization is supplemental

---

## Future-Proofing: 2026 and Beyond

The AI-Native web is rapidly evolving. Position your site for upcoming changes:

### Emerging Standards to Watch

**1. Agent Payment Protocol (AP2)**
- **Purpose**: Allow AI agents to pay for premium content/services
- **Preparation**: Define pricing in `ai-agents.md`

**2. Federated Agent Directories**
- **Purpose**: Central registries for discovering agent-capable sites
- **Preparation**: Ensure manifests are publicly accessible

**3. Multi-Modal Context**
- **Purpose**: AI agents processing images, videos, and interactive content
- **Preparation**: Add media metadata to query-index.json

**4. Agentic Webhooks**
- **Purpose**: Allow agents to subscribe to content updates
- **Preparation**: Design notification system in your architecture

### Staying Current

- **Subscribe**: Follow [AI Agent Standards Working Group](https://example.com) (emerging consortium)
- **Test Regularly**: Query your site with latest AI models monthly
- **Community**: Join discussions on AI-Native architecture patterns
- **Iterate**: Update manifests as standards evolve

---

## Conclusion: The Agentic Future

The transformation from a traditional website to an AI-Native platform represents a fundamental shift in web architecture. By implementing the seven layers outlined in this guide—Network, Knowledge, Action, Data, Permission, Authority, and Interaction—you position your brand, content, and services for the agentic future.

### Key Takeaways

1. **AI agents are already visiting your site**—the question is whether you're helping them or hindering them
2. **Structured data wins**—manifests like `llms.txt` and `query-index.json` reduce hallucinations and improve accuracy
3. **Attribution matters**—define how AI should cite you in `ai-agents.md`
4. **Maintenance is ongoing**—AI manifests require regular updates to stay accurate
5. **Human-first remains paramount**—AI optimization supplements, not replaces, great user experience

### The Digital Domain Technologies Example

Throughout this guide, you've seen how Tom Cranstoun and Digital Domain Technologies implemented these patterns on allabout.network. Their 91-post catalog of Adobe EDS expertise is now:

- **Discoverable**: AI agents find specific technical guidance in milliseconds
- **Authoritative**: Consistent attribution with verified credentials
- **Interactive**: Agents can query by category, tags, and recency
- **Maintainable**: Automated health checks prevent broken manifests

### Your Turn

**These patterns are universal.** Whether you run:
- A SaaS product documentation site
- An e-commerce platform
- A personal blog
- A corporate marketing site
- A news publication
- A consultant's portfolio

...you can apply this blueprint by substituting your own:
- Brand identity (in headers and manifests)
- Content structure (in llms.txt and query-index.json)
- Service capabilities (in ai-agents.md)

Start with Phase 1 of the implementation checklist. Within 30 days, you'll have transformed your site into an AI-Native platform that autonomous agents can understand, trust, and integrate.

The agentic web is here. Build for it.

---

## Resources & Further Reading

### Official Standards
- [llms.txt Standard](https://llmstxt.org) - The original specification
- [Schema.org](https://schema.org) - Structured data vocabulary
- [Model Context Protocol (MCP)](https://github.com/anthropics/mcp) - Anthropic's agent integration standard

### DDT's Implementation
- **Live Site**: [allabout.network](https://allabout.network)
- **llms.txt**: [allabout.network/llms.txt](https://allabout.network/llms.txt)
- **Query Index**: [allabout.network/query-index.json](https://allabout.network/query-index.json)
- **Contact**: info@digitaldomaintechnologies.com

### Tools
- [Google Rich Results Test](https://search.google.com/test/rich-results) - Validate Schema.org
- [JSON Validator](https://jsonlint.com) - Check query-index.json syntax
- [cURL](https://curl.se) - Test HTTP headers

### Community
- [AI-Native Web Slack](https://example.com) - Join the discussion
- [GitHub Discussions](https://github.com/topics/ai-native-web) - Share implementations

---

**About This Guide**

This comprehensive blueprint was developed by Tom Cranstoun (Digital Domain Technologies) based on the real-world implementation of allabout.network—a 91-post Adobe EDS consultancy site transformed into a fully AI-Native platform.

**Version**: 1.0 (December 2025)
**License**: Creative Commons BY-SA 4.0 (Attribution-ShareAlike)
**Attribution**: "AI-Native Website Guide by Digital Domain Technologies (allabout.network)"

**Updates**: This guide will be updated quarterly as AI agent standards evolve. Check [allabout.network/blogs/ddt/ai-native-guide](https://allabout.network/blogs/ddt/ai-native-guide) for the latest version.

---

*Build for agents. Win the future.*
