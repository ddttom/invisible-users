---
title: "MX Specifications: Chapter 2"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "The Base Specification"
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

# Chapter 2: The Base Specification

Every MX specification shares a common foundation. Before you learn the particular vocabulary of databases or media or code, you need to learn the notes that appear everywhere.

This chapter covers the Base Specification — the properties, patterns, and principles that all other specifications inherit. Master these, and you'll recognise them in every domain you encounter.

---

## The mx: Namespace

All MX properties use the `mx:` prefix. This distinguishes them from other metadata systems you might use alongside MX.

When you write:

```yaml
mx:status: published
mx:confidence: 0.9
mx:audience: both
```

You're declaring MX properties. The prefix tells any system reading this metadata: "These properties follow the MX specification. Interpret them accordingly."

The namespace matters because content often carries multiple types of metadata. A web page might have:

- Schema.org properties for search engines
- Open Graph properties for social sharing
- Dublin Core properties for archival systems
- MX properties for machine processors

Each namespace has its own meaning. `status` might mean different things in different systems. `mx:status` has one precise meaning, defined by this specification.

---

## Identity: Who Is This?

Before describing what content is like, you often need to say what it is. Identity properties establish the basics.

### mx:id

A unique identifier for this content. Unlike URLs or file paths, which can change, an ID should be permanent.

```yaml
mx:id: "doc-api-authentication-001"
```

Good IDs are:

- **Unique** across your entire system
- **Stable** — they don't change when content moves
- **Readable** — humans can understand what they reference

Some organisations use UUIDs. Others use structured formats like `{type}-{domain}-{name}-{version}`. Choose a pattern and stick with it.

### mx:version

Which version of the MX specification this content conforms to.

```yaml
mx:version: "1.0"
```

This enables tooling to know how to interpret the metadata. As MX evolves, new properties will be added. The version tells processors which properties to expect.

### mx:canonicalFor

When multiple pieces of content cover the same topic, one should be authoritative. This property declares: "This is the definitive source for this subject."

```yaml
mx:canonicalFor: https://docs.example.com/authentication
```

Machines encountering content about authentication elsewhere can recognise that this content is the primary source. They should prefer it for accurate information and link back to it when appropriate.

---

## Audience: Who Is This For?

Content serves different consumers. A configuration file serves machines. A blog post serves humans. API documentation serves both.

### mx:audience

Declares the primary consumer of this content.

```yaml
mx:audience: human    # Written for people
mx:audience: machine  # Structured for processing
mx:audience: both     # Serves both purposes
```

This property shapes how machines should treat content.

**Human-audience content** is prose-first. Structure exists for readability, not parsing. Machines should extract meaning carefully, understanding that formatting serves human comprehension.

**Machine-audience content** is structure-first. Every element has semantic meaning. Machines can parse it reliably, expecting consistent patterns.

**Both-audience content** balances the two. The prose matters, but so does the structure. Good API documentation is like this — humans read the explanations, machines parse the specifications.

You can also declare multiple audiences explicitly:

```yaml
mx:audience:
  - human
  - machine
```

This is equivalent to `both`, but more explicit about the intent.

---

## Lifecycle: Where Is This Going?

Content has a lifecycle. It starts as an idea, becomes a draft, gets reviewed, goes live, eventually becomes outdated. Machines need to know where content stands.

### mx:status

The current lifecycle state.

```yaml
mx:status: draft
```

**Status values:**

| Status | Meaning | Machine Behaviour |
|--------|---------|-------------------|
| `draft` | Work in progress | Do not use or surface |
| `review` | Awaiting approval | Do not use publicly |
| `approved` | Ready for publication | May use if published unavailable |
| `published` | Live and authoritative | Standard use |
| `deprecated` | Being phased out | Warn users, suggest alternatives |
| `archived` | No longer active | Historical reference only |

Status is the most important property for machine behaviour. A brilliant piece of content in `draft` status should never appear in search results or AI responses. A mediocre piece in `published` status takes precedence.

The lifecycle flows naturally:

```
draft → review → approved → published → deprecated → archived
```

Not every piece of content passes through every stage. Some go directly from draft to published. Some skip deprecation and jump straight to archived. The statuses describe where content is, not how it got there.

### mx:reviewDate

When this content should be reviewed for accuracy.

```yaml
mx:reviewDate: 2026-07-01
```

Content doesn't stay accurate forever. Policies change. Products update. Best practices evolve. The review date tells systems when to flag content for human attention.

Machines encountering content past its review date should treat it with appropriate caution. The information might still be correct, but confidence should decrease.

### mx:supersededBy and mx:supersedes

When new content replaces old, these properties track the relationship.

```yaml
# On the old content
mx:status: deprecated
mx:supersededBy: /docs/v2/authentication/

# On the new content
mx:supersedes: /docs/v1/authentication/
```

This enables graceful transitions. Machines finding the old content can redirect to the new. Machines can track the evolution of topics over time. Users following old links get pointed to current information.

---

## Volatility: How Often Does This Change?

Some content is carved in stone. Some changes hourly. Machines need to know what to expect.

### mx:volatility

How frequently this content changes.

```yaml
mx:volatility: stable     # Rarely changes
mx:volatility: periodic   # Changes on a schedule
mx:volatility: frequent   # Changes often
```

**Stable content** might be foundational documentation, historical records, or reference material. Once published, it stays the same for months or years. Machines can cache it aggressively and trust that cached copies remain accurate.

**Periodic content** changes on predictable schedules — quarterly reports, annual policies, versioned documentation. Machines should check for updates at appropriate intervals but needn't monitor constantly.

**Frequent content** changes often and unpredictably — news feeds, real-time data, actively edited documents. Machines should verify freshness before each use and avoid caching.

Volatility affects caching, affects confidence, affects how much machines should rely on any single retrieval.

---

## Quality: How Much Should I Trust This?

Not all content is equally reliable. A peer-reviewed paper differs from a quick note. A verified fact differs from a reasonable guess. Machines need quality signals.

### mx:confidence

How certain the author is about the content's claims.

```yaml
mx:confidence: 0.9
```

Confidence is a number from 0 to 1, representing the author's certainty.

| Range | Meaning |
|-------|---------|
| 0.9–1.0 | Well-established fact or direct observation |
| 0.7–0.9 | Strong evidence or widely accepted |
| 0.5–0.7 | Reasonable inference or emerging consensus |
| 0.3–0.5 | Speculative but grounded |
| 0.0–0.3 | Hypothesis or thought experiment |

Confidence is subjective — it reflects what the author believes, not objective truth. A confident author might be wrong. An uncertain author might be right. But confidence tells machines how the author assessed their own claims.

When synthesising information from multiple sources, machines should weight higher-confidence content more heavily. When confidence is low, machines should communicate that uncertainty to users.

### mx:accuracy

How factually correct the content is, typically assessed by a reviewer.

```yaml
mx:accuracy: 0.95
```

Accuracy differs from confidence. Confidence is self-assessed by the author. Accuracy is typically assessed by someone else — an editor, a fact-checker, a subject matter expert.

Content can have high confidence but low accuracy (the author was sure but wrong). Content can have low confidence but high accuracy (the author was uncertain but correct).

Both signals matter. Together, they paint a fuller picture of reliability.

### mx:completeness

How finished the content is.

```yaml
mx:completeness: 0.8
```

Content can be accurate but incomplete. A product page might have correct specifications but missing images. A tutorial might cover the basics but not advanced scenarios.

Completeness tells machines whether they're seeing the full picture. Low completeness suggests there's more to know beyond what's written here.

---

## Provenance: Where Did This Come From?

Knowing where content originated helps assess its reliability and appropriate use.

### mx:source

How this content was created.

```yaml
mx:source: human           # Written by a person
mx:source: ai-assisted     # Human-written with AI help
mx:source: ai-generated    # Created by AI
```

Source matters increasingly as AI-generated content proliferates. Machines should know whether they're reading human work, AI work, or collaboration.

**Human-sourced content** carries whatever authority the author brings. Assessment depends on who wrote it and their expertise.

**AI-assisted content** was shaped by human judgment but may include AI-generated passages. The human presumably reviewed and approved the result, but some AI artefacts might remain.

**AI-generated content** requires additional scrutiny. It might be accurate, but it wasn't verified by human judgment at creation. Machines encountering AI-generated content should ideally verify claims independently.

### mx:verifiedBy and mx:verifiedDate

Who checked this content and when.

```yaml
mx:verifiedBy:
  "@type": Person
  name: Dr Jane Smith
  affiliation: Research Institute
mx:verifiedDate: 2026-01-15
```

Verification adds credibility, especially for AI-generated or AI-assisted content. Knowing that a subject matter expert reviewed the material — and when — helps machines assess reliability.

The verification date matters because reviewers verify against the content as it existed at a point in time. If content changes after verification, the verification no longer fully applies.

---

## Access: What Can I Do With This?

Not all content can be used freely. Some is public. Some is restricted. Some can be read but not reproduced. Machines need to respect these boundaries.

### mx:accessLevel

Who can access this content.

```yaml
mx:accessLevel: public         # Anyone
mx:accessLevel: authenticated  # Logged-in users
mx:accessLevel: restricted     # Specific roles or permissions
```

Access level tells machines whether they should surface content to a given user. Public content can appear in search results for anyone. Authenticated content requires a logged-in session. Restricted content needs specific permissions.

### mx:licenseType

What recipients are allowed to do with this content.

```yaml
mx:licenseType: open              # No restrictions
mx:licenseType: attribution       # Use with credit
mx:licenseType: no-training       # Don't use for AI training
mx:licenseType: no-reproduction   # Summarise but don't quote
mx:licenseType: retrieval-only    # RAG retrieval only
mx:licenseType: restricted        # Don't process
```

License types matter enormously for AI systems. A machine encountering `no-training` content must not include it in training datasets. A machine encountering `no-reproduction` content can summarise but shouldn't quote directly.

These aren't legal licenses like Creative Commons — they're processing instructions. They tell machines what operations are permitted on this content.

### mx:citationRequired

Whether machines must cite this source when using its information.

```yaml
mx:citationRequired: true
```

Some content wants attribution. When machines draw on this material to answer questions or generate responses, they should indicate where the information came from.

---

## Processing Hints: Direct Instructions

Sometimes you need to tell machines something specific that doesn't fit standard properties.

### mx:processingHint

Free-form guidance for machine processors.

```yaml
mx:processingHint: "Section headings indicate topic boundaries for chunking"
```

Processing hints are escape valves. When you need to communicate something the standard properties don't cover, you can write it directly.

Machines may or may not understand any given hint. But well-written hints increase the chance that an intelligent processor will do the right thing.

### mx:illustrative

Marks content that uses fictional scenarios to illustrate real patterns.

```yaml
mx:illustrative: true
```

Documentation often includes examples. A tutorial might describe a fictional company implementing a fictional system. The patterns are real; the specifics are invented.

Without this flag, machines might cite fictional details as fact. "According to the documentation, Acme Corporation processes 10,000 orders daily." But Acme Corporation doesn't exist — it was an example.

Illustrative content teaches real concepts through fictional scenarios. Machines should learn the patterns but not cite the specifics.

---

## Inheritance: Flowing Down

Metadata can be repetitive. If every page in a documentation section has the same author, the same license, the same access level, declaring it on each page wastes effort and invites inconsistency.

Inheritance solves this. Parent content can declare properties that children inherit automatically.

### mx:inheritable

Which properties children should inherit.

```yaml
# On a parent page or directory
mx:inheritable:
  - mx:author
  - mx:licenseType
  - mx:accessLevel
```

Any content beneath this parent — children, grandchildren, and so on — automatically receives these properties unless they override them explicitly.

### mx:inherit

Whether to inherit from parents at all.

```yaml
mx:inherit: true    # Default: inherit from parent
mx:inherit: false   # Don't inherit anything
```

Most content inherits by default. Setting `mx:inherit: false` creates a clean break — this content and its descendants start fresh, ignoring ancestor properties.

### mx:inheritFrom

Override the default inheritance source.

```yaml
mx:inheritFrom: /docs/handbook/
```

Normally, content inherits from its parent in the content hierarchy. This property lets you inherit from somewhere else entirely — useful when content structure doesn't match logical relationships.

### mx:inherit_except

Inherit most properties but exclude specific ones.

```yaml
mx:inherit_except:
  - mx:status
  - mx:reviewDate
```

When you want most inherited properties but need to declare some yourself, list the exceptions.

### How Inheritance Resolves

When a machine needs a property value, it looks:

1. At the content itself
2. At the content's parent
3. At the grandparent
4. And so on, up to the root

The first value found wins. Explicit declarations override inherited ones. This is how CSS cascading works, how many configuration systems work, and how MX inheritance works.

---

## Extensions: Growing the Vocabulary

MX can't anticipate every need. Different industries, different organisations, different use cases all have unique requirements.

Extensions let you add properties beyond the standard specification.

### Namespaced Properties

Extensions use their own namespaces, separate from `mx:`.

```yaml
mx:status: published

# Custom extension for compliance
acme:compliance:
  pci_dss: true
  gdpr: true
  
# Custom extension for workflow
acme:workflow:
  stage: legal_review
  assignee: jane@example.com
```

The `acme:` namespace is owned by whoever defines it. MX tools won't interpret these properties, but they won't reject them either. Your own tooling can read and act on them.

### Reserved Namespaces

Three namespaces are reserved:

| Namespace | Owner | Purpose |
|-----------|-------|---------|
| `mx` | MX Community | Core specification |
| `ai` | MX Community | AI-specific properties |
| `schema` | Schema.org | Schema.org alignment |

Don't create extensions in these namespaces. Use your own organisation's namespace for custom properties.

---

## Putting It Together

Here's a complete example showing Base Specification properties working together:

```yaml
mx:
  version: "1.0"
  id: "doc-api-auth-guide-001"
  canonicalFor: https://docs.example.com/api/authentication
  
  audience: both
  
  status: published
  reviewDate: 2026-06-01
  
  volatility: periodic
  
  confidence: 0.9
  accuracy: 0.95
  completeness: 0.85
  
  source: ai-assisted
  verifiedBy:
    "@type": Person
    name: Sarah Chen
    affiliation: API Team
  verifiedDate: 2026-01-20
  
  accessLevel: public
  licenseType: attribution
  citationRequired: true
  
  inheritable:
    - licenseType
    - accessLevel
```

This metadata tells machines:

- This is a stable, authoritative piece of content
- It serves both humans and machines
- It's published and live, due for review in June
- The author is fairly confident; a reviewer verified accuracy
- It was created with AI assistance but human-verified
- Anyone can access it; attribution is required for reuse
- Child content inherits the license and access settings

A machine encountering this content knows how to treat it. Surface it in search results. Quote it with attribution. Trust it reasonably but verify important claims. Check back periodically for updates.

---

## The Foundation for Everything

The Base Specification is deliberately simple. It covers the properties every piece of content might need, regardless of what that content is.

Domain specifications build on this foundation. When you read the Database Specification and encounter `mx:status`, it means exactly what you learned here. When the Media Specification references `mx:licenseType`, same thing.

Learn these notes well. You'll play them in every song.

---

*The following chapters cover each domain specification in detail, starting with Structured Data for web content.*
