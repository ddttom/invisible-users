---
title: "MX Specifications: Chapter 4"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "Code Metadata"
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

# Chapter 4: Code Metadata

Source code is a strange kind of content. It's written by humans, for humans to read and maintain — but it's also written for machines to execute. Comments explain intent. Variable names convey meaning. Function signatures describe contracts.

Yet when AI assistants encounter code, they face the same problem they face with any content: the meaning isn't explicit. They can parse syntax, identify patterns, even infer purpose. But they can't know which functions are safe to modify, which are performance-critical, which have hidden dependencies that aren't obvious from the code itself.

The MX Code Metadata Specification bridges this gap. It provides a vocabulary for describing code to machines — at the repository level, the file level, and down to individual functions and classes.

---

## Why Code Needs Metadata

Consider a simple function:

```javascript
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
```

An AI assistant can read this and understand what it does: it calculates a total by summing price times quantity for each item.

But the AI can't know:

- Is this function safe to modify, or is it part of a public API with external consumers?
- Is performance critical here, or is clarity more important?
- Are there edge cases the code doesn't handle that the AI should preserve?
- Does this function have tests, and where are they?
- Who owns this code and should review changes?

These questions matter enormously when AI assists with code. An AI that refactors a public API function without understanding its stability guarantees causes problems. An AI that optimises for performance when clarity matters makes code harder to maintain.

Code metadata makes this context explicit.

---

## Three Levels of Metadata

The Code Metadata Specification operates at three levels:

1. **Repository level** — metadata about the entire codebase
2. **File level** — metadata about individual source files
3. **Inline level** — metadata about specific functions, classes, or blocks

Each level serves different purposes. Repository metadata establishes defaults and context. File metadata overrides and extends for specific files. Inline metadata provides granular control over individual code elements.

---

## Repository Metadata

Repository metadata lives in a `.mx.yaml` file at the repository root. It establishes the baseline for all code in the repository.

### Basic Repository Metadata

```yaml
# /.mx.yaml
mx:
  version: "1.0"

repository:
  name: acme-platform
  description: "Core platform services for Acme Corporation"
  
  owner:
    team: platform-engineering
    contact: platform@acme.example.com
    
  languages:
    primary: typescript
    secondary:
      - python
      - sql
      
  frameworks:
    - express
    - react
    - prisma

mx:status: published
mx:audience: machine
mx:volatility: frequent
```

### AI Permissions

The most important repository-level metadata controls what AI assistants can do:

```yaml
repository:
  ai:
    # Can AI read and understand this code?
    read: true
    
    # Can AI suggest modifications?
    suggest: true
    
    # Can AI make direct edits (with approval)?
    edit: true
    
    # Can AI generate new code in this repository?
    generate: true
    
    # Can this code be used for AI training?
    training: false
    
    # Additional context for AI assistants
    context: |
      This is a production codebase serving 10M+ users.
      Prioritise stability and backwards compatibility.
      All changes require tests and documentation.
```

### Default Stability

Set repository-wide defaults for code stability:

```yaml
repository:
  defaults:
    stability: stable
    
    # Default owner for files without explicit ownership
    owner:
      team: platform-engineering
      
    # Default review requirements
    review:
      required: true
      approvers: 1
```

### Directory Structure

Document your directory structure so AI understands where things belong:

```yaml
repository:
  structure:
    src:
      description: "Application source code"
      contains: [typescript, react]
      
    src/api:
      description: "REST API endpoints"
      stability: stable
      ai:
        edit: false  # API changes need human review
        
    src/components:
      description: "React UI components"
      stability: unstable
      ai:
        edit: true
        
    src/utils:
      description: "Shared utility functions"
      stability: stable
      
    tests:
      description: "Test files"
      ai:
        generate: true  # AI can generate tests
        
    docs:
      description: "Documentation"
      ai:
        generate: true
```

---

## File-Level Metadata

Individual files can declare their own metadata, overriding repository defaults. File metadata appears in a header comment or companion file.

### Header Comment Format

For languages with multi-line comments:

```typescript
/**
 * @mx:status published
 * @mx:stability stable
 * @mx:owner platform-engineering
 * @mx:ai.edit false
 * @mx:ai.context Critical authentication logic - changes require security review
 */

import { verifyToken } from './crypto';

export function authenticate(token: string): User | null {
  // ...
}
```

### Companion File Format

For more detailed metadata, use a companion `.mx.yaml` file:

```yaml
# /src/auth/authenticate.mx.yaml
mx:
  version: "1.0"

file:
  path: authenticate.ts
  description: "User authentication and token verification"
  
  owner:
    team: security-engineering
    contact: security@acme.example.com
    
  stability: stable
  
  ai:
    read: true
    suggest: true
    edit: false
    context: |
      This file handles authentication for all platform services.
      Security-critical: any changes require security team review.
      Do not modify token verification logic without explicit approval.
      
  dependencies:
    internal:
      - ./crypto
      - ../config/auth
    external:
      - jsonwebtoken
      
  tests:
    location: /__tests__/authenticate.test.ts
    coverage: 94%
    
  documentation:
    - /docs/authentication.md
    - /docs/api/auth-endpoints.md
```

### File Properties

| Property | Description |
|----------|-------------|
| `path` | Relative path to the source file |
| `description` | What this file does |
| `owner` | Team or person responsible |
| `stability` | How stable the public interface is |
| `ai` | AI permission overrides |
| `dependencies` | Internal and external dependencies |
| `tests` | Location and coverage of tests |
| `documentation` | Related documentation files |

---

## Stability Levels

Stability indicates how much the public interface of code might change. This is crucial for AI assistants deciding whether modifications are safe.

### Stability Values

| Level | Meaning | AI Behaviour |
|-------|---------|--------------|
| `stable` | Public API, won't change | Preserve signatures exactly |
| `unstable` | May change without notice | Can suggest improvements |
| `experimental` | Actively evolving | Can refactor freely |
| `deprecated` | Being phased out | Suggest migration, don't extend |
| `internal` | Not for external use | Can modify for internal needs |

### Declaring Stability

At the file level:

```yaml
file:
  stability: stable
```

At the function level (inline):

```typescript
/**
 * @mx:stability stable
 * @mx:since 2.0.0
 */
export function processPayment(amount: number, currency: string): PaymentResult {
  // ...
}
```

### Stability and Versioning

For versioned APIs, track when interfaces were introduced:

```typescript
/**
 * @mx:stability stable
 * @mx:since 2.0.0
 * @mx:deprecated 3.0.0
 * @mx:supersededBy processPaymentV2
 */
export function processPayment(amount: number): PaymentResult {
  // ...
}

/**
 * @mx:stability stable
 * @mx:since 3.0.0
 */
export function processPaymentV2(request: PaymentRequest): PaymentResult {
  // ...
}
```

---

## Inline Annotations

For granular control, annotate individual functions, classes, or code blocks directly in the source.

### Function Annotations

```typescript
/**
 * Calculate the total price for a shopping cart.
 * 
 * @mx:stability stable
 * @mx:owner checkout-team
 * @mx:ai.edit false
 * @mx:ai.context Performance-critical hot path - called on every cart update
 * @mx:tests cart.test.ts#calculateTotal
 * 
 * @param items - Array of cart items with price and quantity
 * @returns Total price in the cart's currency
 */
export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
```

### Class Annotations

```typescript
/**
 * @mx:stability stable
 * @mx:owner data-team
 * @mx:ai.edit suggest-only
 * @mx:ai.context Core domain model - changes affect database schema
 */
export class User {
  /**
   * @mx:stability stable
   * @mx:ai.edit false
   */
  readonly id: string;
  
  /**
   * @mx:stability unstable
   * @mx:ai.edit true
   */
  preferences: UserPreferences;
}
```

### Block Annotations

For specific code blocks that need protection:

```typescript
function processOrder(order: Order): void {
  // Validate order
  validateOrder(order);
  
  // @mx:block-start critical
  // @mx:ai.edit false
  // @mx:ai.context Payment processing - PCI compliance requires exact implementation
  const paymentResult = chargePayment(order.payment);
  if (!paymentResult.success) {
    throw new PaymentFailedError(paymentResult.error);
  }
  recordTransaction(paymentResult.transactionId);
  // @mx:block-end
  
  // Fulfillment can be modified
  fulfillOrder(order);
}
```

---

## AI Context

The `ai.context` property deserves special attention. It's free-form text that helps AI assistants understand what they can't infer from code alone.

### Effective Context

Good context tells AI things the code doesn't:

```yaml
ai:
  context: |
    This service handles 50,000 requests per second at peak.
    The current implementation is optimised for throughput over latency.
    Memory allocation is carefully managed - avoid creating unnecessary objects.
    
    Historical note: We tried a reactive streams approach in 2024 but
    reverted due to debugging complexity. Don't suggest that pattern.
```

### Context Categories

Consider including:

**Performance context:**
```yaml
ai:
  context: |
    Hot path: called on every API request.
    Current p99 latency: 2ms. Budget: 5ms.
    Profile before suggesting changes.
```

**Business context:**
```yaml
ai:
  context: |
    Implements GDPR Article 17 (right to erasure).
    Legal has approved this exact implementation.
    Any changes require legal review.
```

**Historical context:**
```yaml
ai:
  context: |
    The nested conditionals look like they could be simplified,
    but each branch handles a specific edge case discovered in production.
    See incident reports INC-1234, INC-1456, INC-1789.
```

**Architectural context:**
```yaml
ai:
  context: |
    This module is scheduled for replacement in Q3 2026.
    Don't invest in major refactoring.
    Bug fixes and minor improvements only.
```

---

## Dependencies and Relationships

Code doesn't exist in isolation. Documenting relationships helps AI understand impact.

### Internal Dependencies

```yaml
file:
  dependencies:
    internal:
      - path: ./utils/validation
        relationship: uses
        
      - path: ../models/user
        relationship: extends
        
      - path: ./legacy-adapter
        relationship: wraps
        note: "Adapter for legacy system, remove after migration"
```

### External Dependencies

```yaml
file:
  dependencies:
    external:
      - package: lodash
        version: "^4.17.0"
        functions: [debounce, throttle, groupBy]
        
      - package: axios
        version: "^1.0.0"
        note: "HTTP client - do not replace without team discussion"
```

### Dependents

What depends on this code:

```yaml
file:
  dependents:
    - path: ../api/users
      relationship: imports
      
    - path: ../workers/sync
      relationship: imports
      
    - external: true
      consumers: ["mobile-app", "partner-api"]
      note: "Public API - breaking changes require major version bump"
```

---

## Test Relationships

Linking code to its tests helps AI understand coverage and find relevant test files.

### Test Location

```yaml
file:
  tests:
    # Primary test file
    primary: ./__tests__/user-service.test.ts
    
    # Integration tests
    integration: ./tests/integration/user-flows.test.ts
    
    # End-to-end tests
    e2e: ./tests/e2e/user-journey.spec.ts
```

### Test Coverage

```yaml
file:
  tests:
    primary: ./__tests__/user-service.test.ts
    coverage:
      line: 94%
      branch: 87%
      function: 100%
    lastRun: 2026-01-27T14:30:00Z
```

### Inline Test References

Link specific functions to specific tests:

```typescript
/**
 * @mx:tests user-service.test.ts#shouldCreateUser
 * @mx:tests user-service.test.ts#shouldValidateEmail
 * @mx:tests user-service.test.ts#shouldHashPassword
 */
export async function createUser(data: CreateUserInput): Promise<User> {
  // ...
}
```

---

## Documentation Links

Connect code to its documentation:

```yaml
file:
  documentation:
    # API documentation
    api: /docs/api/users.md
    
    # Architecture decision records
    adr:
      - /docs/adr/003-user-model.md
      - /docs/adr/007-authentication-flow.md
      
    # External documentation
    external:
      - https://example.com/api-reference/users
      
    # Inline documentation (JSDoc, etc.)
    inline: true
    inlineQuality: good  # good, partial, minimal, none
```

---

## Language-Specific Patterns

Different languages have different conventions for metadata. The specification adapts to each.

### TypeScript/JavaScript

Use JSDoc comments with `@mx:` tags:

```typescript
/**
 * @mx:stability stable
 * @mx:owner auth-team
 * @mx:ai.edit false
 */
export function verifyToken(token: string): TokenPayload | null {
  // ...
}
```

### Python

Use module docstrings and function docstrings:

```python
"""
MX Metadata:
  stability: stable
  owner: data-team
  ai.edit: true
  ai.context: Data transformation utilities - safe to optimise
"""

def transform_records(records: list[dict]) -> pd.DataFrame:
    """
    Transform raw records into a DataFrame.
    
    MX:
      stability: stable
      tests: test_transform.py#test_transform_records
    """
    pass
```

### Go

Use structured comments:

```go
// mx:stability stable
// mx:owner platform-team
// mx:ai.edit false
// mx:ai.context Core routing logic - affects all API endpoints

func (r *Router) HandleRequest(w http.ResponseWriter, req *http.Request) {
    // ...
}
```

### Java

Use annotations or Javadoc:

```java
/**
 * @mx.stability stable
 * @mx.owner payments-team
 * @mx.ai.edit false
 * @mx.ai.context PCI-compliant payment processing
 */
@MXStability(Stability.STABLE)
@MXOwner("payments-team")
public class PaymentProcessor {
    // ...
}
```

### SQL

Use header comments:

```sql
-- mx:stability stable
-- mx:owner data-team
-- mx:ai.edit false
-- mx:ai.context Production schema - changes require DBA approval and migration plan

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Inheritance and Defaults

Code metadata cascades from repository to directory to file to function.

### Cascade Order

1. Repository defaults (`.mx.yaml` at root)
2. Directory overrides (`.mx.yaml` in directories)
3. File overrides (companion file or header)
4. Inline overrides (function/class annotations)

### Example Cascade

Repository default:
```yaml
# /.mx.yaml
repository:
  defaults:
    stability: stable
    ai:
      edit: true
```

Directory override:
```yaml
# /src/api/.mx.yaml
directory:
  stability: stable
  ai:
    edit: false  # API directory is more restricted
```

File override:
```yaml
# /src/api/internal.mx.yaml
file:
  ai:
    edit: true  # This specific file allows edits
```

Function override:
```typescript
/**
 * @mx:ai.edit false  // But this function is still protected
 */
export function criticalEndpoint() { }
```

---

## Integration with Development Tools

Code metadata becomes powerful when integrated with development workflows.

### IDE Integration

IDEs can display MX metadata inline:

- Show stability badges next to functions
- Warn when editing protected code
- Display ownership information
- Link to related tests and documentation

### CI/CD Integration

Build pipelines can enforce metadata:

```yaml
# Example CI check
- name: Verify MX Metadata
  run: |
    mx-lint check --require-owner --require-stability
    mx-lint verify-ai-permissions
```

### Code Review Integration

Pull request tools can use metadata:

- Auto-assign reviewers based on ownership
- Require additional approval for stable code changes
- Flag changes to AI-restricted files

### AI Assistant Integration

AI coding assistants use metadata to:

- Respect edit permissions
- Understand stability requirements
- Find relevant tests
- Locate documentation
- Apply appropriate code style

---

## Putting It Together

Here's a complete example showing all three levels working together:

**Repository level** (`.mx.yaml`):
```yaml
mx:
  version: "1.0"

repository:
  name: acme-checkout
  
  defaults:
    stability: stable
    ai:
      read: true
      suggest: true
      edit: false  # Default: AI cannot edit
      
  structure:
    src/utils:
      ai:
        edit: true  # Utils are safe to edit
```

**File level** (`src/cart/totals.mx.yaml`):
```yaml
file:
  path: totals.ts
  description: "Shopping cart total calculations"
  owner:
    team: checkout-team
  
  stability: stable
  
  ai:
    edit: true  # Override: this file allows edits
    context: |
      Core calculation logic. Well-tested and stable.
      Optimisation suggestions welcome.
      
  tests:
    primary: ./__tests__/totals.test.ts
    coverage:
      line: 98%
```

**Inline level** (in `totals.ts`):
```typescript
/**
 * Calculate cart total including tax and discounts.
 * 
 * @mx:stability stable
 * @mx:ai.edit true
 * @mx:tests totals.test.ts#calculateTotal
 */
export function calculateTotal(cart: Cart): Money {
  const subtotal = calculateSubtotal(cart.items);
  const discount = applyDiscounts(subtotal, cart.discounts);
  const tax = calculateTax(discount, cart.taxRate);
  return add(discount, tax);
}

/**
 * Apply promotional discounts.
 * 
 * @mx:stability unstable
 * @mx:ai.edit true
 * @mx:ai.context Discount logic changes frequently for promotions
 */
export function applyDiscounts(amount: Money, discounts: Discount[]): Money {
  // ...
}

/**
 * Tax calculation per jurisdiction.
 * 
 * @mx:stability stable
 * @mx:ai.edit false
 * @mx:ai.context Legal requirement - tax logic verified by accounting
 */
export function calculateTax(amount: Money, rate: TaxRate): Money {
  // ...
}
```

An AI assistant encountering this code knows:

- The repository defaults to AI-read but not AI-edit
- This particular file allows AI edits
- `calculateTotal` and `applyDiscounts` can be modified
- `calculateTax` must not be touched without human review
- Tests exist and have high coverage
- The checkout team owns this code

This context enables AI to help effectively while respecting boundaries.

---

## The Code as Content

Code is content. Like documentation, like media, like database schemas — it benefits from explicit metadata that tells machines what they can't infer from syntax alone.

The patterns in this chapter apply whether you're working with a personal project or an enterprise codebase with hundreds of contributors. Start with repository-level defaults. Add file-level metadata where it matters. Use inline annotations for critical sections.

As AI becomes a more active participant in software development, the metadata you provide shapes how effectively it can help — and how safely it can operate.

---

*The following chapter covers the Media Metadata Specification — how to describe images, video, audio, and documents for machine understanding.*
