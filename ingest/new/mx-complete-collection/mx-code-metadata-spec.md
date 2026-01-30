---
title: "MX Code Metadata Specification"
date: 2026-01-28
ld:
  "@type": TechArticle
  headline: "MX Code Metadata Specification"
  proficiencyLevel: Intermediate
  author:
    "@type": Person
    name: Tom Ledger
    jobTitle: Principal Consultant
    worksFor:
      "@type": Organization
      name: Digital Domain Technologies Ltd
  publisher:
    "@type": Organization
    name: MX Community
  isPartOf:
    "@type": CreativeWorkSeries
    name: "MX: The Bible"
  inLanguage: en-GB
  mx:audience: both
  mx:status: draft
  mx:source: ai-assisted
  mx:verifiedBy:
    "@type": Person
    name: Tom Ledger
  mx:volatility: periodic
  mx:reviewDate: 2026-04-02
  mx:chunkBoundary: heading
  mx:chunkSize: 500
  mx:standalone: true
  mx:canonicalFor: https://mx.community/spec/code-metadata
  mx:accessLevel: public
  mx:licenseType: attribution
  mx:citationRequired: true
  mx:completeness: 0.9
  mx:accuracy: 0.85
  mx:confidence: 0.8
  mx:prerequisites:
    - /spec/structured-data/
  mx:inheritable:
    - author
    - publisher
    - inLanguage
    - mx:accessLevel
    - mx:licenseType
---

# MX Code Metadata Specification

Version: 1.0.0-draft
Status: Draft
Last Updated: January 2026

---

## Introduction

This specification defines how code repositories, files, and inline code declare metadata for machine processors. The approach enables AI agents to understand code context, constraints, and intent without parsing implementation details.

This specification extends the **MX Base Specification** (`mx.community/spec/base`) and inherits all core properties defined there.

The specification covers:

- Repository-level metadata
- File-level metadata
- Inline code annotations
- Function and class documentation
- Dependency and environment declarations
- Inheritance from directory to file to function
- Extensions for tooling integration
- AI agent interpretation guidance

### Relationship to Base Specification

This specification inherits from MX Base:

- All core properties (`mx:audience`, `mx:status`, `mx:volatility`, etc.)
- All inheritance properties (`mx:inheritable`, `mx:inherit`, etc.)
- All AI properties (`ai.training`, `ai.extraction`, etc.)
- All classification properties (`classification.sensitivity`, `classification.pii`, etc.)
- Extension framework

This specification adds:

- Repository, directory, file, and function-level metadata
- Inline annotation format (`@mx:begin`, `@mx:end`, `@mx:ai`)
- Code-specific AI properties (`ai.editable`, `ai.context_required`, etc.)
- Stability declarations
- Test and API metadata

---

## Repository Metadata

Repository-level metadata declares project-wide context. This metadata lives in a dedicated file at the repository root.

### File Location

Repository metadata MUST be stored in one of these locations (in order of precedence):

1. `mx.yaml` or `mx.yml`
2. `.mx/config.yaml`
3. `package.json` under an `mx` key (for Node.js projects)
4. `pyproject.toml` under `[tool.mx]` (for Python projects)

### Repository Schema

```yaml
# mx.yaml
mx:
  version: "1.0"
  
  project:
    name: "My Project"
    description: "Brief description of what this project does"
    repository: https://github.com/example/my-project
    documentation: https://docs.example.com/my-project
    
  audience:
    primary: machine
    languages: [en]
    
  context:
    domain: "e-commerce"
    purpose: "API backend for order processing"
    constraints:
      - "Must handle 10,000 requests per second"
      - "GDPR compliant"
      - "No external API calls in hot path"
    
  stack:
    language: typescript
    runtime: node
    version: "20.x"
    framework: express
    
  conventions:
    style: prettier
    testing: jest
    documentation: jsdoc
    
  ai:
    assistance: welcome
    training: permitted
    generation:
      allowed: true
      review_required: true
    sensitive_paths:
      - "src/auth/**"
      - "config/secrets/**"
```

### Project Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | Text | Project name |
| `description` | Text | Brief description of project purpose |
| `repository` | URL | Source repository location |
| `documentation` | URL | Documentation site |

### Audience Properties

| Property | Type | Description |
|----------|------|-------------|
| `primary` | Text | Primary audience: `human`, `machine`, or `both` |
| `languages` | Array | Human languages used in comments and documentation |

### Context Properties

| Property | Type | Description |
|----------|------|-------------|
| `domain` | Text | Business or technical domain |
| `purpose` | Text | What the project does |
| `constraints` | Array | Non-functional requirements and constraints |

### Stack Properties

| Property | Type | Description |
|----------|------|-------------|
| `language` | Text | Primary programming language |
| `runtime` | Text | Execution environment |
| `version` | Text | Language or runtime version |
| `framework` | Text | Primary framework |

### Convention Properties

| Property | Type | Description |
|----------|------|-------------|
| `style` | Text | Code style tool or guide |
| `testing` | Text | Testing framework |
| `documentation` | Text | Documentation format |

### AI Properties

| Property | Type | Description |
|----------|------|-------------|
| `assistance` | Text | AI assistance stance: `welcome`, `cautious`, `prohibited` |
| `training` | Text | Training data permission: `permitted`, `prohibited`, `conditional` |
| `generation.allowed` | Boolean | Whether AI-generated code is accepted |
| `generation.review_required` | Boolean | Whether AI-generated code requires human review |
| `sensitive_paths` | Array | Glob patterns for sensitive files AI should handle carefully |

---

## File Metadata

File-level metadata declares context for individual source files. This metadata appears at the top of the file in a comment block.

### Format by Language

**JavaScript / TypeScript:**

```javascript
/**
 * @mx
 * audience: machine
 * purpose: "Validates user input against schema"
 * stability: stable
 * dependencies:
 *   - zod
 * ai:
 *   editable: true
 *   context_required: ["src/types/user.ts"]
 */
```

**Python:**

```python
"""
@mx
audience: machine
purpose: "Validates user input against schema"
stability: stable
dependencies:
  - pydantic
ai:
  editable: true
  context_required: ["src/types/user.py"]
"""
```

**Go:**

```go
/*
@mx
audience: machine
purpose: "Validates user input against schema"
stability: stable
ai:
  editable: true
  context_required: ["types/user.go"]
*/
```

**Rust:**

```rust
//! @mx
//! audience: machine
//! purpose: "Validates user input against schema"
//! stability: stable
//! ai:
//!   editable: true
//!   context_required: ["src/types/user.rs"]
```

**CSS / SCSS:**

```css
/*
@mx
audience: human
purpose: "Base typography styles"
stability: stable
ai:
  editable: cautious
  reason: "Design system tokens - changes affect entire application"
*/
```

### File Properties

| Property | Type | Description |
|----------|------|-------------|
| `audience` | Text | Primary audience: `human`, `machine`, or `both` |
| `purpose` | Text | What this file does |
| `stability` | Text | API stability: `experimental`, `unstable`, `stable`, `frozen` |
| `dependencies` | Array | Key dependencies this file relies on |
| `owner` | Text | Team or person responsible |
| `reviewers` | Array | Required reviewers for changes |

### File AI Properties

| Property | Type | Description |
|----------|------|-------------|
| `ai.editable` | Text or Boolean | AI edit permission: `true`, `false`, `cautious` |
| `ai.context_required` | Array | Files AI should read before editing this one |
| `ai.context_provides` | Array | Concepts this file defines that other files depend on |
| `ai.generation_notes` | Text | Guidance for AI generating similar code |
| `ai.reason` | Text | Explanation for restrictions |

---

## Function and Class Metadata

Function and class metadata provides granular context for individual code units.

### Function Metadata

**JavaScript / TypeScript:**

```typescript
/**
 * Calculates the total price including tax and discounts.
 * 
 * @mx
 * pure: true
 * complexity: O(n)
 * throws: [InvalidDiscountError, NegativePriceError]
 * ai:
 *   confidence: 0.9
 *   test_coverage: true
 *   edge_cases:
 *     - "Empty cart returns 0"
 *     - "Negative discounts are rejected"
 * 
 * @param items - Array of cart items
 * @param discountCode - Optional discount code
 * @returns Total price in smallest currency unit
 */
function calculateTotal(items: CartItem[], discountCode?: string): number {
  // ...
}
```

**Python:**

```python
def calculate_total(items: list[CartItem], discount_code: str | None = None) -> int:
    """
    Calculates the total price including tax and discounts.
    
    @mx
    pure: true
    complexity: O(n)
    raises: [InvalidDiscountError, NegativePriceError]
    ai:
      confidence: 0.9
      test_coverage: true
      edge_cases:
        - "Empty cart returns 0"
        - "Negative discounts are rejected"
    
    Args:
        items: List of cart items
        discount_code: Optional discount code
        
    Returns:
        Total price in smallest currency unit
    """
    # ...
```

### Function Properties

| Property | Type | Description |
|----------|------|-------------|
| `pure` | Boolean | Whether function has side effects |
| `idempotent` | Boolean | Whether repeated calls produce same result |
| `complexity` | Text | Time complexity (Big O notation) |
| `throws` / `raises` | Array | Exceptions this function may throw |
| `deprecated` | Boolean or Text | Deprecation status or replacement |
| `since` | Text | Version when function was introduced |
| `see` | Array | Related functions or documentation |

### Function AI Properties

| Property | Type | Description |
|----------|------|-------------|
| `ai.confidence` | Number | Confidence in implementation correctness (0-1) |
| `ai.test_coverage` | Boolean | Whether function has test coverage |
| `ai.edge_cases` | Array | Known edge cases and expected behaviour |
| `ai.refactor_notes` | Text | Guidance for refactoring |
| `ai.do_not_modify` | Boolean | Whether AI should avoid changing this function |
| `ai.reason` | Text | Explanation for restrictions |

### Class Metadata

**TypeScript:**

```typescript
/**
 * Manages user authentication state and token refresh.
 * 
 * @mx
 * pattern: singleton
 * thread_safe: false
 * state:
 *   - currentUser: "Authenticated user or null"
 *   - tokens: "Access and refresh tokens"
 * invariants:
 *   - "If currentUser is set, tokens must be valid"
 *   - "Token refresh happens before expiry"
 * ai:
 *   sensitive: true
 *   reason: "Handles authentication tokens"
 *   context_required: ["src/types/auth.ts", "src/config/oauth.ts"]
 */
class AuthManager {
  // ...
}
```

### Class Properties

| Property | Type | Description |
|----------|------|-------------|
| `pattern` | Text | Design pattern: `singleton`, `factory`, `observer`, etc. |
| `thread_safe` | Boolean | Whether class is safe for concurrent access |
| `state` | Object | Description of internal state |
| `invariants` | Array | Conditions that must always be true |
| `extends` | Text | Conceptual parent (beyond language inheritance) |
| `implements` | Array | Interfaces or contracts |

### Class AI Properties

| Property | Type | Description |
|----------|------|-------------|
| `ai.sensitive` | Boolean | Whether class handles sensitive data |
| `ai.reason` | Text | Explanation for sensitivity or restrictions |
| `ai.context_required` | Array | Files AI should understand before modifying |
| `ai.modification_impact` | Text | What might break if this class changes |

---

## Inline Annotations

Inline annotations provide context for specific code blocks or lines.

### Block Annotations

```typescript
// @mx:begin security-critical
// All code in this block handles authentication tokens.
// AI assistants should not modify without human review.
const token = await refreshToken(currentToken);
validateTokenSignature(token);
storeToken(token);
// @mx:end security-critical
```

```python
# @mx:begin performance-critical
# This loop processes 10M+ records. Do not add operations
# with complexity > O(1) inside the loop.
for record in records:
    process(record)
# @mx:end performance-critical
```

### Line Annotations

```typescript
const API_KEY = process.env.API_KEY; // @mx:sensitive no-log no-expose

await sleep(100); // @mx:intentional rate-limiting

// @mx:todo refactor Extract to separate function when auth module is complete
const result = complexOperation();

// @mx:ai do-not-remove This null check prevents crash in edge case #1234
if (value === null) {
  return defaultValue;
}
```

### Block Annotation Tags

| Tag | Description |
|-----|-------------|
| `security-critical` | Code handling authentication, authorisation, or secrets |
| `performance-critical` | Code on hot path requiring optimisation |
| `compatibility` | Code maintaining backward compatibility |
| `workaround` | Temporary fix for external issue |
| `generated` | AI or tool generated code |
| `legacy` | Old code pending refactor |

### Line Annotation Tags

| Tag | Description |
|-----|-------------|
| `@mx:sensitive` | Line contains or handles sensitive data |
| `@mx:intentional` | Unusual code that is deliberate |
| `@mx:todo` | Task to complete |
| `@mx:fixme` | Known issue to fix |
| `@mx:hack` | Temporary workaround |
| `@mx:ai` | Instruction for AI assistants |

### AI-Specific Line Annotations

| Annotation | Description |
|------------|-------------|
| `@mx:ai do-not-remove` | AI should not delete this code |
| `@mx:ai do-not-modify` | AI should not change this code |
| `@mx:ai preserve-logic` | AI may refactor but must preserve behaviour |
| `@mx:ai explain-before-changing` | AI should explain proposed changes first |
| `@mx:ai generated` | Code was AI-generated |
| `@mx:ai reviewed` | AI-generated code has been human reviewed |

---

## Dependency Metadata

Dependency metadata declares why dependencies exist and how they should be managed.

### Package.json Extension

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "zod": "^3.22.0"
  },
  "mx": {
    "dependencies": {
      "express": {
        "purpose": "HTTP server framework",
        "critical": true,
        "upgrade_policy": "conservative",
        "alternatives_considered": ["fastify", "koa"],
        "decision_date": "2024-06-15"
      },
      "zod": {
        "purpose": "Runtime type validation",
        "critical": true,
        "upgrade_policy": "latest",
        "ai": {
          "replacement_permitted": false,
          "reason": "Schema definitions throughout codebase"
        }
      }
    }
  }
}
```

### pyproject.toml Extension

```toml
[tool.mx.dependencies]

[tool.mx.dependencies.pydantic]
purpose = "Data validation and settings management"
critical = true
upgrade_policy = "conservative"
ai.replacement_permitted = false
ai.reason = "Model definitions throughout codebase"

[tool.mx.dependencies.httpx]
purpose = "Async HTTP client"
critical = false
upgrade_policy = "latest"
alternatives_considered = ["aiohttp", "requests"]
```

### Dependency Properties

| Property | Type | Description |
|----------|------|-------------|
| `purpose` | Text | Why this dependency is used |
| `critical` | Boolean | Whether project fails without it |
| `upgrade_policy` | Text | `conservative`, `latest`, `pinned`, `security-only` |
| `alternatives_considered` | Array | Other packages evaluated |
| `decision_date` | Date | When dependency was chosen |
| `review_date` | Date | When dependency should be re-evaluated |

### Dependency AI Properties

| Property | Type | Description |
|----------|------|-------------|
| `ai.replacement_permitted` | Boolean | Whether AI may suggest alternatives |
| `ai.upgrade_permitted` | Boolean | Whether AI may suggest upgrades |
| `ai.reason` | Text | Explanation for restrictions |

---

## Environment Metadata

Environment metadata declares runtime requirements and configuration.

### Environment File

```yaml
# .mx/environment.yaml
mx:
  environments:
    development:
      description: "Local development environment"
      requirements:
        node: ">=20.0.0"
        npm: ">=10.0.0"
      services:
        - postgres:15
        - redis:7
      env_vars:
        required:
          - DATABASE_URL
          - REDIS_URL
        optional:
          - DEBUG
          - LOG_LEVEL
      setup_commands:
        - npm install
        - npm run db:migrate
        
    production:
      description: "Production deployment"
      requirements:
        node: "20.x"
      services:
        - postgres:15
        - redis:7
      env_vars:
        required:
          - DATABASE_URL
          - REDIS_URL
          - API_KEY
          - JWT_SECRET
        sensitive:
          - API_KEY
          - JWT_SECRET
          - DATABASE_URL
      ai:
        access: prohibited
        reason: "Production secrets must not be exposed to AI assistants"
```

### Environment Properties

| Property | Type | Description |
|----------|------|-------------|
| `description` | Text | Environment purpose |
| `requirements` | Object | Runtime version requirements |
| `services` | Array | Required external services |
| `env_vars.required` | Array | Required environment variables |
| `env_vars.optional` | Array | Optional environment variables |
| `env_vars.sensitive` | Array | Variables containing secrets |
| `setup_commands` | Array | Commands to set up environment |

### Environment AI Properties

| Property | Type | Description |
|----------|------|-------------|
| `ai.access` | Text | AI access level: `full`, `limited`, `prohibited` |
| `ai.reason` | Text | Explanation for restrictions |
| `ai.safe_to_share` | Array | Variables safe to show AI |

---

## Test Metadata

Test metadata declares test context and requirements.

### Test File Metadata

```typescript
/**
 * @mx
 * test_type: unit
 * coverage_target: 90%
 * subject: src/utils/validation.ts
 * fixtures:
 *   - valid_users.json
 *   - invalid_users.json
 * ai:
 *   generation_permitted: true
 *   must_cover:
 *     - "Empty input"
 *     - "Invalid email format"
 *     - "Missing required fields"
 */

describe('validateUser', () => {
  // ...
});
```

### Test Properties

| Property | Type | Description |
|----------|------|-------------|
| `test_type` | Text | `unit`, `integration`, `e2e`, `performance`, `security` |
| `coverage_target` | Text | Minimum coverage percentage |
| `subject` | Text or Array | Files being tested |
| `fixtures` | Array | Test data files |
| `timeout` | Number | Test timeout in milliseconds |
| `requires` | Array | Services or conditions required |

### Test AI Properties

| Property | Type | Description |
|----------|------|-------------|
| `ai.generation_permitted` | Boolean | Whether AI may generate tests |
| `ai.must_cover` | Array | Scenarios tests must cover |
| `ai.edge_cases` | Array | Edge cases to include |
| `ai.do_not_mock` | Array | Components that should not be mocked |

---

## API Metadata

API metadata declares endpoint context for web services.

### OpenAPI Extension

```yaml
# openapi.yaml with MX extensions
paths:
  /users/{id}:
    get:
      summary: Get user by ID
      x-mx:
        audience: machine
        rate_limit: 100/minute
        cache:
          enabled: true
          ttl: 300
        ai:
          safe_to_call: true
          test_mode_available: true
          sensitive_response_fields:
            - email
            - phone
```

### Route Annotation

```typescript
/**
 * @mx
 * method: GET
 * path: /users/:id
 * audience: machine
 * auth: required
 * rate_limit: 100/minute
 * cache:
 *   enabled: true
 *   ttl: 300
 * response:
 *   success: User
 *   errors: [NotFoundError, UnauthorizedError]
 * ai:
 *   safe_to_call: true
 *   idempotent: true
 *   test_mode: "Add ?test=true for mock data"
 */
router.get('/users/:id', getUser);
```

### API Properties

| Property | Type | Description |
|----------|------|-------------|
| `method` | Text | HTTP method |
| `path` | Text | URL path |
| `audience` | Text | Primary consumer: `human`, `machine`, `both` |
| `auth` | Text | Authentication requirement: `none`, `optional`, `required` |
| `rate_limit` | Text | Rate limit specification |
| `cache.enabled` | Boolean | Whether response is cacheable |
| `cache.ttl` | Number | Cache duration in seconds |
| `response.success` | Text | Success response type |
| `response.errors` | Array | Possible error types |

### API AI Properties

| Property | Type | Description |
|----------|------|-------------|
| `ai.safe_to_call` | Boolean | Whether AI may call this endpoint |
| `ai.idempotent` | Boolean | Whether repeated calls are safe |
| `ai.test_mode` | Text | How to use test mode |
| `ai.test_mode_available` | Boolean | Whether test mode exists |
| `ai.sensitive_request_fields` | Array | Request fields containing sensitive data |
| `ai.sensitive_response_fields` | Array | Response fields containing sensitive data |
| `ai.side_effects` | Array | What calling this endpoint changes |

---

## Inheritance

Code metadata supports inheritance at multiple levels: repository to directory, directory to file, file to function/class. This reduces repetition and ensures consistency.

### Inheritance Model

Metadata flows downward through the hierarchy:

```
mx.yaml (repository)
  → src/ (directory)
    → src/payments/ (directory)
      → src/payments/stripe.ts (file)
        → processPayment() (function)
```

Child levels inherit from parents unless explicitly overridden.

### Directory Config Recognition

Directory-level configuration is recognised by the presence of specific files within a directory. Build systems MUST check for these files in order of precedence:

1. `mx.yaml` or `mx.yml` in the directory
2. `.mx/config.yaml` or `.mx/config.yml` in the directory
3. `package.json` with an `mx` key (for Node.js directories)
4. `pyproject.toml` with `[tool.mx]` section (for Python directories)

A directory without any of these files inherits directly from its nearest ancestor that has configuration.

```
/project
├── mx.yaml                      # Repository config
├── src/
│   ├── mx.yaml                  # src/ has its own config
│   ├── utils/                   # No config - inherits from src/
│   │   └── helpers.ts
│   └── payments/
│       ├── mx.yaml              # payments/ has its own config
│       └── stripe.ts
└── scripts/                     # No config - inherits from repository
    └── deploy.sh
```

In this example:
- `src/utils/helpers.ts` inherits from `/src/mx.yaml`
- `src/payments/stripe.ts` inherits from `/src/payments/mx.yaml`
- `scripts/deploy.sh` inherits from `/mx.yaml`

### Directory Config Scope

Directory configs apply to:

1. All files directly in that directory
2. All subdirectories without their own config
3. All files in those subdirectories

Directory configs do NOT apply to:

1. Parent directories
2. Sibling directories
3. Subdirectories that have their own config (though those may inherit)

### Minimal Directory Config

A directory config can be minimal, existing only to override specific properties:

```yaml
# /src/payments/mx.yaml
mx:
  ai:
    sensitive: true
```

All other properties inherit from the nearest ancestor.

### Directory Config Discovery

Build systems discovering configuration for a file MUST:

1. Start at the file's directory
2. Check for directory config files (in precedence order)
3. If found, use as immediate parent config
4. If not found, move to parent directory and repeat
5. Stop at repository root (identified by repository-level `mx.yaml` or VCS root)

```
Resolving config for /project/src/payments/stripe.ts:

1. Check /project/src/payments/
   → Found mx.yaml ✓ (immediate parent)
   
2. Check /project/src/
   → Found mx.yaml ✓ (grandparent)
   
3. Check /project/
   → Found mx.yaml ✓ (repository root)
   
Inheritance chain: stripe.ts → payments/mx.yaml → src/mx.yaml → mx.yaml
```

### Repository Root Detection

The repository root is identified by (in order of precedence):

1. Presence of `mx.yaml` with `mx.version` property
2. Presence of version control directory (`.git` for Git, `.hg` for Mercurial, `.svn` for Subversion)
3. Presence of `package.json` with `mx` key containing `version`
4. Presence of `pyproject.toml` with `[tool.mx]` containing `version`

Build systems MUST NOT traverse above the repository root when resolving inheritance. This prevents configuration from a parent directory outside the project affecting files within it.

```
/home/user/
├── mx.yaml                      # User's personal config (should NOT affect projects)
└── projects/
    └── order-service/
        ├── .git/                # Git directory marks repository root
        ├── mx.yaml              # Repository config
        └── src/
            └── payments/
                └── stripe.ts
```

In this example, `/home/user/mx.yaml` is never consulted when resolving config for `stripe.ts` because `.git` marks `/home/user/projects/order-service/` as the repository boundary.

### Repository to Directory Inheritance

Directories can have their own `mx.yaml` or `.mx/config.yaml` that inherits from the repository root:

```yaml
# /mx.yaml (repository root)
mx:
  version: "1.0"
  project:
    name: "Order Service"
  ai:
    assistance: welcome
    generation:
      review_required: true
  conventions:
    style: prettier
    testing: jest
```

```yaml
# /src/payments/mx.yaml (directory override)
mx:
  inherits: /mx.yaml  # explicit, but also default behaviour
  ai:
    assistance: cautious  # overrides repository setting
    sensitive: true       # adds new property
    # generation.review_required inherited as true
  # conventions inherited entirely
```

### Directory Inheritance Properties

| Property | Type | Description |
|----------|------|-------------|
| `inherits` | Path | Parent config to inherit from (default: nearest ancestor) |
| `mx:inherit` | Boolean | Whether to inherit (default: true) |
| `mx:inherit_except` | Array | Properties to not inherit |

### Declaring Inheritable Properties

Repository or directory configs declare which properties children inherit:

```yaml
# /mx.yaml
mx:
  version: "1.0"
  
  ai:
    assistance: welcome
    generation:
      review_required: true
      
  conventions:
    style: prettier
    testing: jest
    
  mx:inheritable:
    - ai.assistance
    - ai.generation
    - conventions
    - context.domain
```

Properties not in `mx:inheritable` are not inherited by default.

### Directory to File Inheritance

Files inherit from their directory's `mx.yaml`:

```yaml
# /src/payments/mx.yaml
mx:
  ai:
    sensitive: true
    editable: cautious
    context_required:
      - src/types/payment.ts
  owner: payments-team
  reviewers: [security-team]
  mx:inheritable:
    - ai.sensitive
    - ai.editable
    - owner
    - reviewers
```

```typescript
// /src/payments/stripe.ts
/**
 * @mx
 * purpose: "Stripe payment integration"
 * # ai.sensitive: true (inherited)
 * # ai.editable: cautious (inherited)
 * # owner: payments-team (inherited)
 * ai:
 *   context_required:  # extends inherited value
 *     - src/config/stripe.ts
 */
```

### File to Function Inheritance

Functions and classes inherit from their file's metadata:

```typescript
/**
 * @mx
 * audience: machine
 * stability: stable
 * ai:
 *   editable: cautious
 *   confidence: 0.9
 * mx:inheritable:
 *   - audience
 *   - stability
 *   - ai.editable
 */

/**
 * @mx
 * purpose: "Process payment"
 * # audience: machine (inherited)
 * # stability: stable (inherited)
 * # ai.editable: cautious (inherited)
 * ai:
 *   confidence: 0.95  # overrides file-level default
 */
function processPayment() {
  // ...
}

/**
 * @mx
 * purpose: "Refund payment"
 * ai:
 *   editable: false  # overrides inherited value
 *   reason: "Critical financial operation"
 */
function refundPayment() {
  // ...
}
```

### Override Behaviour

Child configs override inherited properties by declaring them explicitly:

```yaml
# /src/payments/mx.yaml
mx:
  ai:
    assistance: cautious  # overrides repository's "welcome"
```

To explicitly block inheritance:

```yaml
# /src/experimental/mx.yaml
mx:
  mx:inherit: false  # no inheritance from parent
  ai:
    assistance: welcome
    generation:
      review_required: false
```

To inherit most but exclude specific properties:

```yaml
# /src/scripts/mx.yaml
mx:
  mx:inherit_except:
    - ai.generation.review_required  # scripts don't need review
    - conventions.testing            # scripts may not have tests
```

### Inheritance Resolution Order

When resolving properties, build systems MUST apply this precedence (highest to lowest):

1. Explicitly declared in the current level
2. Inherited from immediate parent
3. Inherited from grandparent
4. Inherited from ancestors (continuing up the tree)
5. Repository-level defaults
6. Specification defaults

### Array Property Inheritance

Array properties can be inherited in three ways:

**Replace (default):**
```yaml
# Parent
ai:
  context_required: [types.ts, config.ts]

# Child - replaces entirely
ai:
  context_required: [other.ts]
# Result: [other.ts]
```

**Extend:**
```yaml
# Child - extends parent
ai:
  context_required:
    mx:extend: true
    values: [stripe.ts]
# Result: [types.ts, config.ts, stripe.ts]
```

**Remove:**
```yaml
# Child - removes from parent
ai:
  context_required:
    mx:remove: [config.ts]
# Result: [types.ts]
```

### Inline Annotation Inheritance

Inline block annotations inherit file-level metadata:

```typescript
/**
 * @mx
 * ai:
 *   editable: true
 *   confidence: 0.8
 */

// @mx:begin security-critical
// Inherits file's ai.confidence: 0.8
// But block adds implicit ai.editable: cautious
const secret = process.env.SECRET;
// @mx:end security-critical

// Outside block: ai.editable: true (file level)
const config = loadConfig();
```

Block annotations implicitly set certain properties:

| Block Tag | Implicit Properties |
|-----------|---------------------|
| `security-critical` | `ai.editable: cautious`, `ai.sensitive: true` |
| `performance-critical` | `ai.preserve_performance: true` |
| `generated` | `ai.generated: true`, `ai.review_required: true` |
| `legacy` | `ai.editable: cautious`, `ai.refactor_candidate: true` |

### Cross-File Inheritance

Files can explicitly inherit from other files:

```typescript
// /src/payments/refund.ts
/**
 * @mx
 * mx:inherits: ./stripe.ts
 * purpose: "Handle refunds"
 * # Inherits ai settings from stripe.ts
 */
```

This is useful for related files that share context:

```typescript
// /src/payments/types.ts
/**
 * @mx
 * audience: machine
 * stability: frozen
 * ai:
 *   editable: false
 *   reason: "Shared types - changes break consumers"
 * mx:inheritable:
 *   - audience
 *   - stability
 */
```

```typescript
// /src/payments/stripe.ts
/**
 * @mx
 * mx:inherits: ./types.ts
 * # audience: machine (inherited)
 * # stability: frozen (inherited)
 * ai:
 *   editable: cautious  # overrides inherited false
 */
```

### Processing Requirements

Build systems implementing inheritance MUST:

1. Resolve inheritance before validation
2. Process inheritance top-down (repository → directory → file → function)
3. Handle circular inheritance references as errors
4. Log resolved inheritance in debug mode
5. Handle missing parent configs gracefully

Build systems SHOULD:

1. Cache resolved inheritance for performance
2. Provide CLI to preview resolved metadata:

```bash
mx inspect src/payments/stripe.ts
# Shows fully resolved metadata with inheritance
```

3. Warn when inheritance creates unexpected combinations

### Inheritance Visualisation

For debugging, tools MAY show inheritance provenance:

```yaml
# mx inspect src/payments/stripe.ts --show-inheritance
mx:
  audience: machine
    # inherited from: /src/payments/mx.yaml
  ai:
    sensitive: true
      # inherited from: /src/payments/mx.yaml
    editable: cautious
      # inherited from: /src/payments/mx.yaml
    context_required:
      - src/types/payment.ts
        # inherited from: /src/payments/mx.yaml
      - src/config/stripe.ts
        # declared in: /src/payments/stripe.ts
```

---

## Extensions

Organisations and tools can extend MX code metadata with custom properties. Extensions allow domain-specific metadata without polluting the core specification.

### Extension Namespaces

Custom properties use a namespace prefix to avoid conflicts with core MX properties and other extensions.

**Format:** `{namespace}:{property}`

```yaml
# mx.yaml with extensions
mx:
  version: "1.0"
  
  project:
    name: "Order Service"
    
  ai:
    assistance: welcome
    
  # Acme Corp extension
  acme:compliance:
    pci_dss: true
    gdpr: true
    review_cycle: quarterly
    
  # Security team extension  
  security:classification: internal
  security:data_types: [pii, financial]
  security:retention_days: 90
```

### Namespace Registration

Namespaces SHOULD be registered to avoid collisions. The MX community maintains a registry of known namespaces.

**Reserved namespaces:**

| Namespace | Owner | Purpose |
|-----------|-------|---------|
| `mx` | MX Community | Core specification properties |
| `ai` | MX Community | AI-specific properties |
| `schema` | Schema.org | Schema.org vocabulary alignment |

**Registering a namespace:**

Organisations can register namespaces at `mx.community/extensions/register`. Registration is optional but recommended for public extensions.

**Namespace conventions:**

- Use lowercase
- Use organisation name or tool name as prefix
- Keep namespaces short but recognisable
- Avoid generic terms (`custom`, `extra`, `misc`)

### Extension Definition

Extensions SHOULD be defined in a schema file that documents properties, types, and validation rules.

```yaml
# .mx/extensions/acme-compliance.yaml
extension:
  namespace: acme
  name: "Acme Compliance Extension"
  version: "1.0"
  description: "Compliance metadata for Acme Corp projects"
  maintainer: compliance-team@acme.com
  
properties:
  acme:compliance:
    type: object
    description: "Compliance requirements for this code"
    properties:
      pci_dss:
        type: boolean
        description: "Subject to PCI-DSS requirements"
      gdpr:
        type: boolean
        description: "Processes EU personal data"
      hipaa:
        type: boolean
        description: "Subject to HIPAA requirements"
      review_cycle:
        type: string
        enum: [monthly, quarterly, annually]
        description: "Required compliance review frequency"
        
  acme:data_owner:
    type: string
    description: "Team responsible for data governance"
```

### Using Extensions

**Repository level:**

```yaml
# mx.yaml
mx:
  version: "1.0"
  extensions:
    - .mx/extensions/acme-compliance.yaml
    - https://security.acme.com/mx-extension.yaml
    
  project:
    name: "Order Service"
    
  acme:compliance:
    pci_dss: true
    gdpr: true
```

**File level:**

```typescript
/**
 * @mx
 * purpose: "Process payments"
 * acme:compliance:
 *   pci_dss: true
 * acme:data_owner: payments-team
 */
```

**Inline:**

```typescript
const cardNumber = input.card; // @mx:acme:pii cardholder-data
```

### Extension Inheritance

Extension properties follow the same inheritance rules as core properties:

```yaml
# /mx.yaml
mx:
  acme:compliance:
    gdpr: true
  mx:inheritable:
    - acme:compliance
```

```yaml
# /src/payments/mx.yaml
mx:
  acme:compliance:
    pci_dss: true  # adds to inherited gdpr: true
```

Child inherits `gdpr: true` and adds `pci_dss: true`.

### Tool-Specific Extensions

Tools can define their own extensions for metadata they consume:

**IDE extensions:**

```yaml
# VS Code extension
vscode:folding:
  regions: [security-critical, performance-critical]
  
vscode:lens:
  show_inheritance: true
  show_ai_permissions: true
```

**CI/CD extensions:**

```yaml
# GitHub Actions extension
github:required_checks:
  - security-scan
  - compliance-review
  
github:codeowners:
  pattern: "src/payments/**"
  owners: ["@payments-team", "@security-team"]
```

**Linter extensions:**

```yaml
# ESLint extension
eslint:override:
  rules:
    no-console: off  # allowed in this directory
    
eslint:ignore: false  # do not skip linting
```

### AI Tool Extensions

AI assistants can define extensions for their specific capabilities:

```yaml
# Claude extension
claude:context_window: 200000
claude:prefer_explanations: true
claude:code_style:
  comments: detailed
  variable_names: descriptive

# Copilot extension  
copilot:suggestions: enabled
copilot:inline_completions: true
copilot:test_generation: enabled

# Cursor extension
cursor:composer_context:
  - src/types/**
  - docs/architecture.md
```

### Extension Validation

Build systems SHOULD validate extension properties against their schemas when available:

```bash
mx validate --extensions
# Validates all extension properties against registered schemas
```

Unknown extensions (no schema available) SHOULD generate warnings, not errors:

```
WARNING: Unknown extension namespace 'acme' in src/payments/mx.yaml
  Consider registering at mx.community/extensions/register
```

### Extension Discovery

Tools discovering extensions SHOULD:

1. Check `mx.extensions` array for schema locations
2. Load and parse extension schemas
3. Validate properties against schemas
4. Pass through unknown namespaced properties without error

```yaml
mx:
  extensions:
    # Local schema
    - .mx/extensions/acme-compliance.yaml
    
    # Remote schema (cached locally)
    - https://security.acme.com/mx-extension.yaml
    
    # NPM package
    - npm:@acme/mx-compliance-extension
    
    # Well-known location (convention)
    # Tool checks mx.community/extensions/acme.yaml
```

### Creating Extensions

To create an extension:

1. **Choose a namespace** — use your organisation or tool name
2. **Define properties** — document types, descriptions, and validation
3. **Create a schema file** — YAML or JSON Schema format
4. **Publish the schema** — host publicly or distribute with your tool
5. **Register (optional)** — add to MX community registry for discoverability

**Minimal extension schema:**

```yaml
extension:
  namespace: myorg
  name: "My Organisation Extension"
  version: "1.0"
  
properties:
  myorg:team:
    type: string
    description: "Owning team identifier"
    
  myorg:cost_center:
    type: string
    description: "Cost center for billing"
```

### Extension Best Practices

1. **Namespace everything** — never add unnamespaced properties
2. **Document thoroughly** — unclear extensions won't be used correctly
3. **Version your schema** — allow evolution without breaking consumers
4. **Validate gracefully** — warn on unknown properties, don't fail
5. **Consider inheritance** — mark which properties should be inheritable
6. **Align with core** — follow MX conventions for consistency
7. **Keep it focused** — one extension per domain, not a grab-bag

### Core Extension Points

Some core properties are designed as extension points:

**`ai.tools`** — tool-specific AI configuration:

```yaml
ai:
  tools:
    claude:
      prefer_explanations: true
    copilot:
      suggestions: enabled
    cursor:
      composer_context: [src/types/**]
```

**`conventions.custom`** — organisation-specific conventions:

```yaml
conventions:
  style: prettier
  testing: jest
  custom:
    code_review: two_approvers
    branch_naming: feature/{ticket}-{description}
```

**`context.tags`** — arbitrary classification tags:

```yaml
context:
  domain: e-commerce
  tags:
    - payments
    - pci-scope
    - tier-1-critical
```

---

## Interpretation by AI Agents

This section describes how AI agents SHOULD interpret MX code metadata.

### Repository-Level Interpretation

Before working with any code, agents SHOULD:

1. Check for `mx.yaml` or equivalent at repository root
2. Read project context, constraints, and conventions
3. Respect `ai.assistance` and `ai.training` settings
4. Note `sensitive_paths` for special handling
5. Resolve inheritance chain for current file location

When `ai.assistance: prohibited`:
- Do not offer code suggestions
- Do not analyse code for improvements
- Limit interaction to explaining existing code if asked

When `ai.generation.review_required: true`:
- Mark all generated code clearly
- Remind user that review is required
- Do not present generated code as production-ready

### Extension Interpretation

AI agents encountering extension properties SHOULD:

1. Recognise namespaced properties as extensions
2. Check for extension schemas in `mx.extensions`
3. Apply extension semantics when schema is available
4. Pass through unknown extensions without error

**Known extension handling:**

When an agent recognises an extension namespace (e.g., its own tool-specific extension):

```yaml
claude:prefer_explanations: true
claude:code_style:
  comments: detailed
```

The agent SHOULD apply these preferences to its behaviour.

**Unknown extension handling:**

When an agent encounters an unrecognised namespace:

```yaml
acme:compliance:
  pci_dss: true
```

The agent SHOULD:
- Note the extension exists
- Not fail or warn excessively
- Consider the property name for hints (e.g., `compliance`, `pci_dss` suggest security sensitivity)
- When uncertain, err toward caution

**Security-suggestive extensions:**

Extensions with names suggesting security or compliance (`security:`, `compliance:`, `pci:`, `gdpr:`, `hipaa:`) SHOULD trigger cautious behaviour even if the agent doesn't understand the specific properties.

### Inheritance Interpretation

Before processing any code, agents SHOULD:

1. Resolve full inheritance chain from repository to current scope
2. Apply inherited properties before evaluating permissions
3. Respect overrides at each level
4. Cache resolved inheritance for the session

When inheritance creates conflicts:

- More specific (closer to code) wins
- Explicit declarations override inherited values
- When uncertain, use the more restrictive setting

Example resolution:

```
Repository: ai.assistance: welcome
Directory:  ai.assistance: cautious
File:       (not declared)
Function:   ai.editable: false

Resolved for function:
  ai.assistance: cautious (from directory)
  ai.editable: false (from function)
```

When `mx:inherit: false` is set:
- Do not apply parent properties
- Only use explicitly declared properties
- Treat missing properties as unspecified (use defaults)

### File-Level Interpretation

Before editing a file, agents SHOULD:

1. Read file-level `@mx` block if present
2. Check `ai.editable` permission
3. Load files listed in `ai.context_required`
4. Understand file's `purpose` and `stability`

When `ai.editable: false`:
- Do not suggest edits
- Explain restrictions if asked

When `ai.editable: cautious`:
- Explain proposed changes before making them
- Highlight potential impact
- Suggest human review

When `stability: frozen`:
- Do not suggest changes
- This API is locked for backward compatibility

### Function-Level Interpretation

When working with functions, agents SHOULD:

1. Respect `pure` and `idempotent` declarations
2. Preserve `complexity` characteristics
3. Maintain documented `throws`/`raises` behaviour
4. Check `ai.confidence` before suggesting changes

When `ai.do_not_modify: true`:
- Do not suggest changes to this function
- Explain why if asked

When `ai.test_coverage: false`:
- Suggest adding tests before modifying
- Be cautious about changes

When `ai.edge_cases` are documented:
- Ensure any changes handle all listed cases
- Do not remove edge case handling

### Inline Annotation Interpretation

Agents MUST respect inline annotations:

| Annotation | Agent Behaviour |
|------------|-----------------|
| `@mx:begin security-critical` | Extra caution; suggest human review for changes |
| `@mx:begin performance-critical` | Preserve performance characteristics |
| `@mx:sensitive` | Do not log, expose, or include in responses |
| `@mx:ai do-not-remove` | Never remove this code |
| `@mx:ai do-not-modify` | Never change this code |
| `@mx:ai preserve-logic` | May refactor but must preserve behaviour |
| `@mx:ai generated` | Code was AI-generated; may need review |
| `@mx:ai reviewed` | AI code has been human reviewed |
| `@mx:intentional` | Unusual code is deliberate; do not "fix" |

### Dependency Interpretation

When suggesting dependency changes, agents SHOULD:

1. Check `ai.replacement_permitted` before suggesting alternatives
2. Respect `upgrade_policy` when suggesting updates
3. Understand `purpose` to suggest appropriate replacements
4. Note `critical` dependencies that need extra care

When `ai.replacement_permitted: false`:
- Do not suggest replacing this dependency
- Explain why if asked

### Environment Interpretation

Agents MUST respect environment restrictions:

When `ai.access: prohibited`:
- Do not request or display environment variables
- Do not include environment values in responses
- Note that production environments are restricted

When variables are in `sensitive`:
- Never include values in responses
- Never log or expose
- Use placeholder notation: `[REDACTED]`

### API Interpretation

When working with APIs, agents SHOULD:

1. Check `ai.safe_to_call` before making requests
2. Use test mode when available (`ai.test_mode_available`)
3. Redact `ai.sensitive_response_fields` in responses
4. Note `ai.side_effects` before calling non-idempotent endpoints

When `ai.safe_to_call: false`:
- Do not call this endpoint
- Explain what the endpoint does without calling it
- Suggest user make the call manually

---

## Migration Guidance

For existing codebases, add MX metadata incrementally.

### Phase 1: Repository Metadata

Start with repository-level configuration:

1. Create `mx.yaml` at repository root
2. Document project context and constraints
3. Set AI assistance preferences
4. Identify sensitive paths

### Phase 2: Critical Files

Add file metadata to:

1. Security-critical files (auth, encryption, secrets)
2. Performance-critical files (hot paths, data processing)
3. Complex files (business logic, algorithms)
4. Entry points (main, index, app)

### Phase 3: API Documentation

For web services:

1. Add MX extensions to OpenAPI spec
2. Or add route annotations to handlers
3. Document sensitive fields and side effects

### Phase 4: Incremental Expansion

When editing files:

1. Add file-level `@mx` block
2. Add function metadata to modified functions
3. Add inline annotations where relevant

### Automation

Consider tooling to:

1. Generate initial `mx.yaml` from existing config
2. Infer `stability` from git history
3. Detect sensitive patterns and suggest annotations
4. Validate MX metadata in CI

---

## Appendix A: Quick Reference

### Repository Metadata Location

| Project Type | Location |
|--------------|----------|
| Any | `mx.yaml` or `.mx/config.yaml` |
| Node.js | `package.json` under `mx` key |
| Python | `pyproject.toml` under `[tool.mx]` |

### Directory Config Location

Directory configs use the same file patterns as repository configs. Precedence order:

| Priority | File |
|----------|------|
| 1 | `mx.yaml` or `mx.yml` |
| 2 | `.mx/config.yaml` or `.mx/config.yml` |
| 3 | `package.json` with `mx` key |
| 4 | `pyproject.toml` with `[tool.mx]` |

Directories without config files inherit from nearest ancestor.

### File Annotation Format

| Language | Format |
|----------|--------|
| JavaScript/TypeScript | `/** @mx ... */` |
| Python | `""" @mx ... """` |
| Go | `/* @mx ... */` |
| Rust | `//! @mx ...` |
| CSS/SCSS | `/* @mx ... */` |

### Extension Format

| Element | Format | Example |
|---------|--------|---------|
| Namespaced property | `{namespace}:{property}` | `acme:compliance` |
| Nested property | `{namespace}:{group}:{property}` | `security:classification:level` |
| Schema location | URL, path, or package | `https://example.com/ext.yaml` |

### Reserved Namespaces

| Namespace | Owner |
|-----------|-------|
| `mx` | MX Community (core spec) |
| `ai` | MX Community (AI properties) |
| `schema` | Schema.org alignment |

### Inheritance Properties

| Property | Level | Description |
|----------|-------|-------------|
| `inherits` | Directory/File | Explicit parent to inherit from |
| `mx:inherit` | Any | Whether to inherit (default: true) |
| `mx:inherit_except` | Any | Properties to exclude from inheritance |
| `mx:inheritable` | Any | Properties children may inherit |
| `mx:extend` | Array | Extend parent array rather than replace |
| `mx:remove` | Array | Remove items from inherited array |

### Common AI Properties

| Property | Values | Purpose |
|----------|--------|---------|
| `ai.editable` | `true`, `false`, `cautious` | Edit permission |
| `ai.safe_to_call` | Boolean | API call permission |
| `ai.sensitive` | Boolean | Contains sensitive data |
| `ai.context_required` | Array | Files to read first |
| `ai.do_not_modify` | Boolean | Prevent changes |
| `ai.do_not_remove` | Boolean | Prevent deletion |
| `ai.generation_permitted` | Boolean | May generate code/tests |
| `ai.review_required` | Boolean | Human review needed |
| `ai.confidence` | 0-1 | Implementation confidence |

### Inline Annotation Tags

| Tag | Purpose |
|-----|---------|
| `@mx:begin`/`@mx:end` | Block annotation |
| `@mx:sensitive` | Sensitive data |
| `@mx:intentional` | Deliberate unusual code |
| `@mx:todo` | Task to complete |
| `@mx:ai` | AI-specific instruction |

---

## Appendix B: Full Examples

### Complete mx.yaml

```yaml
mx:
  version: "1.0"
  
  project:
    name: "Order Service"
    description: "Microservice handling order processing and fulfilment"
    repository: https://github.com/example/order-service
    documentation: https://docs.example.com/order-service
    
  audience:
    primary: machine
    languages: [en]
    
  context:
    domain: "e-commerce"
    purpose: "Process customer orders, manage inventory, handle payments"
    constraints:
      - "Must process orders within 500ms"
      - "Must be idempotent for retry safety"
      - "PCI-DSS compliant for payment handling"
      - "GDPR compliant for customer data"
    
  stack:
    language: typescript
    runtime: node
    version: "20.x"
    framework: express
    database: postgres
    cache: redis
    queue: rabbitmq
    
  conventions:
    style: prettier
    linting: eslint
    testing: jest
    documentation: typedoc
    commits: conventional
    branching: github-flow
    
  ai:
    assistance: welcome
    training: conditional
    training_conditions:
      - "Exclude files in sensitive_paths"
      - "Exclude test fixtures containing real data"
    generation:
      allowed: true
      review_required: true
      permitted_areas:
        - "tests/**"
        - "docs/**"
      prohibited_areas:
        - "src/payments/**"
        - "src/auth/**"
    sensitive_paths:
      - "src/payments/**"
      - "src/auth/**"
      - "config/secrets/**"
      - "*.pem"
      - "*.key"
```

### Complete Annotated Source File

```typescript
/**
 * @mx
 * audience: machine
 * purpose: "Handles payment processing via Stripe"
 * stability: stable
 * owner: payments-team
 * reviewers: [security-team, payments-team]
 * dependencies:
 *   - stripe
 * ai:
 *   editable: cautious
 *   sensitive: true
 *   reason: "Handles payment credentials and financial transactions"
 *   context_required:
 *     - src/types/payment.ts
 *     - src/config/stripe.ts
 *   do_not_log:
 *     - cardNumber
 *     - cvv
 *     - stripeToken
 */

import Stripe from 'stripe';
import { PaymentRequest, PaymentResult } from './types/payment';
import { stripeConfig } from './config/stripe';

// @mx:begin security-critical
// Payment credentials initialisation. Do not modify without security review.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { // @mx:sensitive
  apiVersion: '2023-10-16',
});
// @mx:end security-critical

/**
 * Processes a payment through Stripe.
 * 
 * @mx
 * pure: false
 * idempotent: true
 * complexity: O(1)
 * throws: [PaymentFailedError, InvalidCardError, StripeError]
 * ai:
 *   confidence: 0.95
 *   test_coverage: true
 *   edge_cases:
 *     - "Duplicate payment requests return existing result"
 *     - "Expired cards throw InvalidCardError"
 *     - "Insufficient funds throw PaymentFailedError"
 *   side_effects:
 *     - "Creates charge in Stripe"
 *     - "Updates order status in database"
 * 
 * @param request - Payment request details
 * @returns Payment result with transaction ID
 */
export async function processPayment(request: PaymentRequest): Promise<PaymentResult> {
  // @mx:ai preserve-logic Idempotency check prevents duplicate charges
  const existing = await findExistingPayment(request.orderId);
  if (existing) {
    return existing;
  }

  // @mx:begin security-critical
  const charge = await stripe.charges.create({
    amount: request.amount,
    currency: request.currency,
    source: request.stripeToken, // @mx:sensitive
    idempotency_key: request.orderId,
    metadata: {
      orderId: request.orderId,
    },
  });
  // @mx:end security-critical

  return {
    success: charge.status === 'succeeded',
    transactionId: charge.id,
    orderId: request.orderId,
  };
}
```

---

## Appendix C: Validators and Tools

- **Schema Validator:** Validate mx.yaml against specification
- **Annotation Linter:** Check file and function annotations
- **IDE Extensions:** Syntax highlighting and validation for MX annotations
- **CI Integration:** Validate MX metadata in pull requests

---

## Appendix D: References

- MX Base Specification: https://mx.community/spec/base
- MX Structured Data Specification: https://mx.community/spec/structured-data
- MX Community: https://mx.community/
- JSDoc: https://jsdoc.app/
- OpenAPI Specification: https://spec.openapis.org/oas/latest.html

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0-draft | January 2026 | Initial draft |
