---
title: "MX Database Metadata Specification"
date: 2026-01-28
ld:
  "@type": TechArticle
  headline: "MX Database Metadata Specification"
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
  mx:canonicalFor: https://mx.community/spec/database-metadata
  mx:accessLevel: public
  mx:licenseType: attribution
  mx:citationRequired: true
  mx:completeness: 0.9
  mx:accuracy: 0.85
  mx:confidence: 0.8
  mx:prerequisites:
    - /spec/structured-data/
    - /spec/code-metadata/
  mx:inheritable:
    - author
    - publisher
    - inLanguage
    - mx:accessLevel
    - mx:licenseType
---

# MX Database Metadata Specification

Version: 1.0.0-draft
Status: Draft
Last Updated: January 2026

---

## Introduction

This specification defines how database schemas, tables, columns, and queries declare metadata for machine processors. Database metadata sidecars enable AI agents to understand data semantics, relationships, constraints, and appropriate use without direct database access.

This specification extends the **MX Base Specification** (`mx.community/spec/base`) and inherits all core properties defined there.

The specification covers:

- Database and schema metadata
- Table and view metadata
- Column metadata and semantics
- Relationship and constraint metadata
- Query metadata and documentation
- Data classification and governance
- AI agent interpretation guidance
- Inheritance and extensions

### Relationship to Base Specification

This specification inherits from MX Base:

- All core properties (`mx:audience`, `mx:status`, `mx:volatility`, etc.)
- All inheritance properties (`mx:inheritable`, `mx:inherit`, etc.)
- All AI properties (`ai.training`, `ai.extraction`, etc.)
- All classification properties (`classification.sensitivity`, `classification.pii`, etc.)
- Semantic type definitions (`mx:semantic.type`, `mx:semantic.entity`, etc.)
- Extension framework

This specification adds:

- Database hierarchy metadata (database → schema → table → column)
- Column-level semantic types and PII classification
- Relationship and constraint documentation
- Query and stored procedure metadata
- Database-specific AI properties (`ai.query_allowed`, `ai.schema_visible`, `ai.mask_in_responses`)
- Data dictionary and naming conventions
- Compliance extensions (GDPR, PCI-DSS, etc.)

---

## Sidecar File Structure

Database metadata lives in sidecar files alongside database definitions or in a dedicated metadata directory.

### File Organisation

```
/database/
├── mx.database.yaml           # Database-level metadata
├── schemas/
│   ├── public.schema.yaml     # Schema-level metadata
│   └── analytics.schema.yaml
├── tables/
│   ├── users.table.yaml       # Table-level metadata
│   ├── orders.table.yaml
│   └── products.table.yaml
├── views/
│   └── order_summary.view.yaml
├── queries/
│   ├── active_users.query.yaml
│   └── revenue_report.query.yaml
└── _mx.yaml                   # Directory defaults
```

### Alternative: Single File

For smaller databases, all metadata can live in one file:

```yaml
# database.mx.yaml
mx:
  version: "1.0"
  
database:
  name: ecommerce
  # ...
  
schemas:
  - name: public
    # ...
    
tables:
  - name: users
    schema: public
    # ...
```

### Alternative: Inline with Migrations

Metadata can be embedded in migration files:

```sql
-- migrations/001_create_users.sql
-- @mx
-- table: users
-- purpose: "Store user account information"
-- owner: identity-team
-- pii: true
-- @mx:end

CREATE TABLE users (
  -- ...
);
```

---

## Database Metadata

### Database Definition

```yaml
# mx.database.yaml
mx:
  version: "1.0"
  
database:
  name: ecommerce
  description: "E-commerce platform primary database"
  
  engine: postgresql
  version: "15.4"
  
  environment: production
  
  owner: platform-team
  steward: data-governance@example.com
  
  classification:
    sensitivity: confidential
    contains_pii: true
    contains_financial: true
    regulatory:
      - gdpr
      - pci-dss
      
  retention:
    default_days: 2555        # 7 years
    policy: regulatory-compliance
    
  access:
    authentication: iam
    encryption:
      at_rest: true
      in_transit: true
      key_management: aws-kms
      
  ai:
    query_allowed: false
    schema_access: true
    sample_data: prohibited
    training_data: prohibited
    reason: "Contains PII and financial data"
    
  documentation:
    wiki: https://wiki.example.com/ecommerce-db
    runbook: https://runbooks.example.com/ecommerce
    schema_diagram: /docs/ecommerce-erd.png
```

### Database Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | Text | Database name |
| `description` | Text | Purpose and overview |
| `engine` | Text | Database engine (postgresql, mysql, etc.) |
| `version` | Text | Engine version |
| `environment` | Text | Environment (production, staging, etc.) |
| `owner` | Text | Owning team |
| `steward` | Text | Data steward contact |

### Database AI Properties

| Property | Type | Description |
|----------|------|-------------|
| `ai.query_allowed` | Boolean | Can AI execute queries |
| `ai.schema_access` | Boolean | Can AI read schema |
| `ai.sample_data` | Text | Sample data access: `allowed`, `anonymised`, `prohibited` |
| `ai.training_data` | Text | Use for training: `permitted`, `anonymised`, `prohibited` |
| `ai.reason` | Text | Explanation for restrictions |

---

## Schema Metadata

### Schema Definition

```yaml
# schemas/public.schema.yaml
mx:
  version: "1.0"
  
schema:
  name: public
  database: ecommerce
  description: "Core business entities"
  
  owner: platform-team
  
  purpose: |
    Contains primary business entities including users, orders,
    and products. This is the main schema for application data.
    
  domains:
    - identity
    - commerce
    - inventory
    
  classification:
    sensitivity: confidential
    
  ai:
    query_allowed: false
    description_confidence: 0.95
    
  tables:
    - users
    - orders
    - order_items
    - products
    - categories
    
  views:
    - order_summary
    - product_inventory
```

---

## Table Metadata

### Table Definition

```yaml
# tables/users.table.yaml
mx:
  version: "1.0"
  
table:
  name: users
  schema: public
  database: ecommerce
  
  description: "User account records for all registered users"
  
  purpose: |
    Stores core user identity and account information. This table
    is the authoritative source for user data across the platform.
    Linked to orders, preferences, and authentication records.
    
  owner: identity-team
  steward: identity-data@example.com
  
  domain: identity
  subdomain: accounts
  
  classification:
    sensitivity: confidential
    contains_pii: true
    pii_types:
      - name
      - email
      - phone
      - address
    gdpr_lawful_basis: contract
    
  lifecycle:
    created: 2020-03-15
    status: active
    deprecation_date: null
    
  volume:
    row_count_estimate: 2500000
    growth_rate: "10000/day"
    size_estimate: "4GB"
    
  access:
    read:
      - identity-service
      - order-service
      - analytics-readonly
    write:
      - identity-service
    admin:
      - dba-team
      
  quality:
    completeness: 0.98
    validity: 0.995
    freshness: real-time
    
  sla:
    availability: 99.99%
    latency_p99: 50ms
    
  ai:
    query_allowed: false
    schema_visible: true
    sample_data: prohibited
    training_data: prohibited
    
    semantic_description: |
      This table contains user account information including
      personal identifiers, contact details, and account status.
      Each row represents one registered user.
      
    common_queries:
      - "Find user by email"
      - "Get user profile"
      - "List active users"
      - "Count users by country"
      
    joins_with:
      - table: orders
        relationship: "users.id = orders.user_id"
        description: "User's order history"
      - table: addresses
        relationship: "users.id = addresses.user_id"
        description: "User's saved addresses"
        
  documentation:
    wiki: https://wiki.example.com/tables/users
    data_dictionary: https://dictionary.example.com/users
```

### Table Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | Text | Table name |
| `schema` | Text | Schema name |
| `description` | Text | Brief description |
| `purpose` | Text | Detailed purpose |
| `owner` | Text | Owning team |
| `steward` | Text | Data steward |
| `domain` | Text | Business domain |
| `subdomain` | Text | Business subdomain |

### Table Classification Properties

| Property | Type | Description |
|----------|------|-------------|
| `sensitivity` | Text | Data sensitivity level |
| `contains_pii` | Boolean | Contains personal data |
| `pii_types` | Array | Types of PII present |
| `contains_financial` | Boolean | Contains financial data |
| `gdpr_lawful_basis` | Text | GDPR processing basis |
| `regulatory` | Array | Applicable regulations |

### Table AI Properties

| Property | Type | Description |
|----------|------|-------------|
| `ai.query_allowed` | Boolean | Can AI query this table |
| `ai.schema_visible` | Boolean | Can AI see schema |
| `ai.sample_data` | Text | Sample data access level |
| `ai.training_data` | Text | Training data permission |
| `ai.semantic_description` | Text | AI-friendly description |
| `ai.common_queries` | Array | Typical query patterns |
| `ai.joins_with` | Array | Common join relationships |

---

## Column Metadata

### Column Definition

```yaml
# tables/users.table.yaml (columns section)
table:
  name: users
  
  columns:
    - name: id
      type: uuid
      nullable: false
      primary_key: true
      
      description: "Unique user identifier"
      
      semantic:
        type: identifier
        entity: user
        
      ai:
        searchable: false
        facetable: false
        display_name: "User ID"
        
    - name: email
      type: varchar(255)
      nullable: false
      unique: true
      
      description: "User's primary email address"
      
      semantic:
        type: email
        entity: user
        role: contact
        
      classification:
        pii: true
        pii_type: email
        sensitivity: confidential
        
      validation:
        format: email
        
      ai:
        searchable: true
        facetable: false
        display_name: "Email Address"
        mask_in_responses: true
        example: "user@example.com"
        
    - name: first_name
      type: varchar(100)
      nullable: false
      
      description: "User's first/given name"
      
      semantic:
        type: name
        entity: user
        role: given_name
        
      classification:
        pii: true
        pii_type: name
        sensitivity: confidential
        
      ai:
        searchable: true
        facetable: false
        display_name: "First Name"
        mask_in_responses: false
        
    - name: last_name
      type: varchar(100)
      nullable: false
      
      description: "User's last/family name"
      
      semantic:
        type: name
        entity: user
        role: family_name
        
      classification:
        pii: true
        pii_type: name
        sensitivity: confidential
        
      ai:
        searchable: true
        facetable: false
        display_name: "Last Name"
        
    - name: phone
      type: varchar(20)
      nullable: true
      
      description: "User's phone number in E.164 format"
      
      semantic:
        type: phone
        entity: user
        role: contact
        
      classification:
        pii: true
        pii_type: phone
        sensitivity: confidential
        
      validation:
        format: e164
        
      ai:
        searchable: false
        mask_in_responses: true
        example: "+44XXXXXXXXXX"
        
    - name: country_code
      type: char(2)
      nullable: false
      
      description: "ISO 3166-1 alpha-2 country code"
      
      semantic:
        type: country
        entity: user
        role: residence
        standard: iso-3166-1-alpha-2
        
      classification:
        pii: false
        
      ai:
        searchable: true
        facetable: true
        display_name: "Country"
        
    - name: status
      type: varchar(20)
      nullable: false
      default: "active"
      
      description: "Account status"
      
      semantic:
        type: status
        entity: user
        
      enum:
        values:
          - value: active
            description: "Active account"
          - value: suspended
            description: "Temporarily suspended"
          - value: closed
            description: "Permanently closed"
            
      ai:
        searchable: true
        facetable: true
        display_name: "Account Status"
        
    - name: created_at
      type: timestamp with time zone
      nullable: false
      default: "now()"
      
      description: "Account creation timestamp"
      
      semantic:
        type: timestamp
        role: created
        
      ai:
        searchable: false
        facetable: true
        sortable: true
        display_name: "Created"
        
    - name: updated_at
      type: timestamp with time zone
      nullable: false
      
      description: "Last update timestamp"
      
      semantic:
        type: timestamp
        role: modified
        
      ai:
        searchable: false
        sortable: true
        display_name: "Updated"
        
    - name: deleted_at
      type: timestamp with time zone
      nullable: true
      
      description: "Soft delete timestamp (null if not deleted)"
      
      semantic:
        type: timestamp
        role: deleted
        
      soft_delete: true
      
      ai:
        searchable: false
        display_name: "Deleted"
```

### Column Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | Text | Column name |
| `type` | Text | Data type |
| `nullable` | Boolean | Allows null values |
| `primary_key` | Boolean | Is primary key |
| `unique` | Boolean | Has unique constraint |
| `default` | Any | Default value |
| `description` | Text | Column description |

### Column Semantic Properties

| Property | Type | Description |
|----------|------|-------------|
| `semantic.type` | Text | Semantic type (see Semantic Types) |
| `semantic.entity` | Text | Entity this describes |
| `semantic.role` | Text | Role in entity |
| `semantic.standard` | Text | Standard conformed to |

### Column Classification Properties

| Property | Type | Description |
|----------|------|-------------|
| `pii` | Boolean | Contains PII |
| `pii_type` | Text | Type of PII |
| `sensitivity` | Text | Sensitivity level |
| `encrypted` | Boolean | Encrypted at rest |
| `hashed` | Boolean | Value is hashed |
| `tokenised` | Boolean | Value is tokenised |

### Column AI Properties

| Property | Type | Description |
|----------|------|-------------|
| `ai.searchable` | Boolean | Include in search |
| `ai.facetable` | Boolean | Use for filtering |
| `ai.sortable` | Boolean | Enable sorting |
| `ai.display_name` | Text | Human-friendly name |
| `ai.mask_in_responses` | Boolean | Mask value in AI responses |
| `ai.example` | Any | Safe example value |
| `ai.description` | Text | AI-friendly description |

### Semantic Types

| Type | Description | Examples |
|------|-------------|----------|
| `identifier` | Unique identifier | id, uuid, sku |
| `name` | Name field | first_name, company_name |
| `email` | Email address | email, contact_email |
| `phone` | Phone number | phone, mobile |
| `address` | Address component | street, city, postcode |
| `country` | Country reference | country_code, nationality |
| `currency` | Currency value | price, total |
| `quantity` | Numeric quantity | count, quantity |
| `percentage` | Percentage value | discount_rate, tax_rate |
| `timestamp` | Date/time | created_at, event_time |
| `date` | Date only | birth_date, start_date |
| `duration` | Time duration | session_length |
| `status` | Status field | order_status, account_status |
| `category` | Category/type | product_type, user_role |
| `description` | Free text | notes, description |
| `url` | URL/URI | website, profile_url |
| `json` | JSON data | metadata, preferences |
| `binary` | Binary data | avatar, document |

---

## Relationship Metadata

### Relationship Definition

```yaml
# tables/orders.table.yaml (relationships section)
table:
  name: orders
  
  relationships:
    - name: order_user
      type: many_to_one
      
      from:
        table: orders
        column: user_id
        
      to:
        table: users
        column: id
        
      constraint:
        name: fk_orders_user
        on_delete: restrict
        on_update: cascade
        
      semantic:
        description: "The user who placed this order"
        relationship_name: "placed_by"
        inverse_name: "orders"
        
      ai:
        traverse: true
        include_in_context: true
        description: "Links order to the customer who placed it"
        
    - name: order_items
      type: one_to_many
      
      from:
        table: orders
        column: id
        
      to:
        table: order_items
        column: order_id
        
      semantic:
        description: "Items included in this order"
        relationship_name: "contains"
        inverse_name: "order"
        
      ai:
        traverse: true
        include_in_context: true
        max_items: 10
```

### Relationship Types

| Type | Description |
|------|-------------|
| `one_to_one` | Single record to single record |
| `one_to_many` | Single record to multiple records |
| `many_to_one` | Multiple records to single record |
| `many_to_many` | Multiple records to multiple records (via junction) |

### Relationship AI Properties

| Property | Type | Description |
|----------|------|-------------|
| `ai.traverse` | Boolean | Can AI traverse this relationship |
| `ai.include_in_context` | Boolean | Include related data in context |
| `ai.max_items` | Number | Maximum items to include |
| `ai.description` | Text | AI-friendly description |

---

## Index Metadata

### Index Definition

```yaml
# tables/users.table.yaml (indexes section)
table:
  name: users
  
  indexes:
    - name: idx_users_email
      columns: [email]
      unique: true
      
      purpose: "Fast lookup by email for authentication"
      
      ai:
        recommended_for:
          - "Find user by email"
          - "Check email exists"
          
    - name: idx_users_country_status
      columns: [country_code, status]
      unique: false
      
      purpose: "Filtering users by country and status"
      
      ai:
        recommended_for:
          - "List active users by country"
          - "Count users per country"
          
    - name: idx_users_created
      columns: [created_at]
      unique: false
      
      purpose: "Chronological queries and reporting"
      
      ai:
        recommended_for:
          - "New user signups over time"
          - "Recent registrations"
```

---

## View Metadata

### View Definition

```yaml
# views/order_summary.view.yaml
mx:
  version: "1.0"
  
view:
  name: order_summary
  schema: public
  database: ecommerce
  
  description: "Aggregated order information with user and item details"
  
  purpose: |
    Provides a denormalised view of orders combining user information,
    order details, and aggregated item counts/totals. Optimised for
    reporting and analytics queries.
    
  source_tables:
    - orders
    - users
    - order_items
    
  materialized: false
  
  refresh:
    strategy: null          # For materialised views
    
  owner: analytics-team
  
  classification:
    sensitivity: confidential
    contains_pii: true
    
  columns:
    - name: order_id
      source: orders.id
      description: "Order identifier"
      
    - name: order_date
      source: orders.created_at
      description: "When order was placed"
      
    - name: user_email
      source: users.email
      description: "Customer email"
      classification:
        pii: true
        
    - name: item_count
      source: "COUNT(order_items.id)"
      description: "Number of items in order"
      
    - name: total_amount
      source: "SUM(order_items.quantity * order_items.unit_price)"
      description: "Order total"
      
  ai:
    query_allowed: false
    schema_visible: true
    
    semantic_description: |
      A summary view showing each order with customer email,
      item count, and total amount. One row per order.
      
    recommended_for:
      - "Order reporting"
      - "Customer order history"
      - "Revenue analysis"
      
    not_recommended_for:
      - "Real-time order status"
      - "Inventory queries"
```

---

## Query Metadata

### Query Definition

```yaml
# queries/active_users_by_country.query.yaml
mx:
  version: "1.0"
  
query:
  name: active_users_by_country
  
  description: "Count of active users grouped by country"
  
  purpose: |
    Provides user counts by country for geographic analysis
    and regional planning. Excludes suspended and closed accounts.
    
  author: analytics-team
  created: 2025-06-15
  modified: 2026-01-10
  
  classification:
    sensitivity: internal
    contains_pii: false
    
  sql: |
    SELECT 
      country_code,
      COUNT(*) as user_count
    FROM users
    WHERE status = 'active'
      AND deleted_at IS NULL
    GROUP BY country_code
    ORDER BY user_count DESC
    
  parameters: []
  
  tables_accessed:
    - name: users
      access_type: read
      columns: [country_code, status, deleted_at]
      
  performance:
    typical_execution_time: 250ms
    rows_scanned_estimate: 2500000
    uses_indexes:
      - idx_users_country_status
      
  output:
    columns:
      - name: country_code
        type: char(2)
        description: "ISO country code"
        
      - name: user_count
        type: bigint
        description: "Number of active users"
        
  ai:
    safe_to_run: true
    returns_pii: false
    
    description: |
      Returns a list of countries with their active user counts,
      sorted by count descending. Does not include any personal data.
      
    example_output:
      - { country_code: "US", user_count: 850000 }
      - { country_code: "GB", user_count: 420000 }
      - { country_code: "DE", user_count: 280000 }
      
    use_cases:
      - "Geographic distribution of users"
      - "Regional growth analysis"
      - "Market sizing"
```

### Parameterised Query

```yaml
# queries/user_orders.query.yaml
query:
  name: user_orders
  
  description: "Retrieve orders for a specific user"
  
  sql: |
    SELECT 
      o.id,
      o.created_at,
      o.status,
      o.total_amount
    FROM orders o
    WHERE o.user_id = :user_id
      AND o.created_at >= :start_date
    ORDER BY o.created_at DESC
    LIMIT :limit
    
  parameters:
    - name: user_id
      type: uuid
      required: true
      description: "User identifier"
      
      ai:
        source: "Must be provided by authenticated context"
        never_infer: true
        
    - name: start_date
      type: date
      required: false
      default: "now() - interval '1 year'"
      description: "Start date for order history"
      
      ai:
        source: "User request or default"
        
    - name: limit
      type: integer
      required: false
      default: 50
      constraints:
        min: 1
        max: 100
      description: "Maximum orders to return"
      
  ai:
    safe_to_run: false
    reason: "Requires authenticated user context"
    returns_pii: false
    
    when_to_use: |
      Use when user asks about their order history.
      Requires user_id from authenticated session.
```

### Query AI Properties

| Property | Type | Description |
|----------|------|-------------|
| `ai.safe_to_run` | Boolean | Can AI execute this query |
| `ai.returns_pii` | Boolean | Results contain PII |
| `ai.reason` | Text | Explanation for restrictions |
| `ai.description` | Text | AI-friendly description |
| `ai.example_output` | Array | Safe example results |
| `ai.use_cases` | Array | When to use this query |
| `ai.when_to_use` | Text | Detailed usage guidance |

---

## Stored Procedure Metadata

### Procedure Definition

```yaml
# procedures/archive_old_orders.procedure.yaml
mx:
  version: "1.0"
  
procedure:
  name: archive_old_orders
  schema: public
  
  description: "Archives orders older than specified retention period"
  
  purpose: |
    Moves orders older than the retention period to the archive schema
    and deletes associated data from the main tables. Used for GDPR
    compliance and database maintenance.
    
  author: dba-team
  created: 2024-01-15
  modified: 2025-08-20
  
  parameters:
    - name: retention_days
      type: integer
      direction: in
      default: 2555
      description: "Number of days to retain orders"
      
    - name: batch_size
      type: integer
      direction: in
      default: 1000
      description: "Number of orders per batch"
      
    - name: archived_count
      type: integer
      direction: out
      description: "Number of orders archived"
      
  tables_modified:
    - name: orders
      operations: [delete]
    - name: order_items
      operations: [delete]
    - name: archive.orders
      operations: [insert]
    - name: archive.order_items
      operations: [insert]
      
  side_effects:
    - "Deletes data from orders and order_items"
    - "Inserts data to archive schema"
    - "Logs operation to audit_log"
    
  ai:
    safe_to_run: false
    reason: "Destructive operation requiring DBA approval"
    
    description: |
      This procedure archives old orders for compliance and maintenance.
      It is a destructive operation that should only be run by DBAs
      during scheduled maintenance windows.
      
    never_suggest: true
```

---

## Data Dictionary

### Dictionary Overview

```yaml
# dictionary/overview.dictionary.yaml
mx:
  version: "1.0"
  
dictionary:
  database: ecommerce
  
  description: |
    Data dictionary for the ecommerce database, providing
    standardised definitions for business terms and data elements.
    
  glossary:
    - term: user
      definition: "A registered account holder on the platform"
      aliases: [customer, member, account holder]
      tables: [users]
      
    - term: order
      definition: "A purchase transaction initiated by a user"
      aliases: [purchase, transaction]
      tables: [orders, order_items]
      
    - term: product
      definition: "An item available for purchase"
      aliases: [item, SKU]
      tables: [products]
      
    - term: active user
      definition: "A user with status='active' and no deletion timestamp"
      formula: "status = 'active' AND deleted_at IS NULL"
      
    - term: order total
      definition: "Sum of item prices including tax, excluding discounts"
      formula: "SUM(order_items.quantity * order_items.unit_price)"
      
  data_standards:
    - name: country_codes
      standard: ISO 3166-1 alpha-2
      columns: [users.country_code, addresses.country]
      
    - name: currency_codes
      standard: ISO 4217
      columns: [orders.currency, products.currency]
      
    - name: timestamps
      standard: ISO 8601
      timezone: UTC
      columns: ["*_at", "*_date"]
      
  naming_conventions:
    tables:
      style: snake_case
      plural: true
      examples: [users, order_items, product_categories]
      
    columns:
      style: snake_case
      timestamp_suffix: "_at"
      boolean_prefix: "is_"
      foreign_key_suffix: "_id"
      
    indexes:
      pattern: "idx_{table}_{columns}"
      examples: [idx_users_email, idx_orders_user_id]
```

---

## Data Classification

### Classification Levels

```yaml
# classification/levels.yaml
mx:
  version: "1.0"
  
classification:
  levels:
    - name: public
      description: "Data that can be freely shared"
      ai:
        query_allowed: true
        training_allowed: true
        
    - name: internal
      description: "Data for internal use only"
      ai:
        query_allowed: true
        training_allowed: false
        
    - name: confidential
      description: "Sensitive business data"
      ai:
        query_allowed: false
        training_allowed: false
        schema_visible: true
        
    - name: restricted
      description: "Highly sensitive data requiring special handling"
      ai:
        query_allowed: false
        training_allowed: false
        schema_visible: false
        
  pii_types:
    - type: name
      description: "Personal name"
      gdpr_category: personal_data
      handling: encrypt_at_rest
      
    - type: email
      description: "Email address"
      gdpr_category: personal_data
      handling: encrypt_at_rest
      
    - type: phone
      description: "Phone number"
      gdpr_category: personal_data
      handling: encrypt_at_rest
      
    - type: address
      description: "Physical address"
      gdpr_category: personal_data
      handling: encrypt_at_rest
      
    - type: dob
      description: "Date of birth"
      gdpr_category: personal_data
      handling: encrypt_at_rest
      
    - type: ssn
      description: "Social security / national ID number"
      gdpr_category: sensitive_personal_data
      handling: tokenize
      
    - type: financial
      description: "Financial account information"
      gdpr_category: personal_data
      handling: tokenize
      pci_scope: true
      
    - type: health
      description: "Health information"
      gdpr_category: sensitive_personal_data
      handling: encrypt_at_rest
      hipaa_scope: true
```

### Column Classification Rules

```yaml
classification:
  auto_rules:
    - pattern: "*_email"
      pii_type: email
      sensitivity: confidential
      
    - pattern: "*_phone"
      pii_type: phone
      sensitivity: confidential
      
    - pattern: "first_name|last_name|full_name"
      pii_type: name
      sensitivity: confidential
      
    - pattern: "*_ssn|*_nin|*_tax_id"
      pii_type: ssn
      sensitivity: restricted
      
    - pattern: "*_card_*|*_payment_*"
      pii_type: financial
      sensitivity: restricted
```

---

## Inheritance

### Database to Schema Inheritance

```yaml
# mx.database.yaml
database:
  name: ecommerce
  
  defaults:
    classification:
      sensitivity: internal
    ai:
      query_allowed: false
      
  mx:inheritable:
    - classification
    - ai
    - owner
```

Schemas inherit unless overridden:

```yaml
# schemas/public.schema.yaml
schema:
  name: public
  
  classification:
    sensitivity: confidential    # Override
  # ai inherited from database
```

### Schema to Table Inheritance

```yaml
# schemas/public.schema.yaml
schema:
  name: public
  
  defaults:
    classification:
      sensitivity: confidential
    ai:
      query_allowed: false
      
  mx:inheritable:
    - classification
    - ai
    - owner
    - steward
```

### Table to Column Inheritance

```yaml
# tables/users.table.yaml
table:
  name: users
  
  defaults:
    columns:
      ai:
        searchable: true
        
  mx:inheritable:
    - classification.sensitivity
    - ai.searchable
```

### Inheritance Resolution

```
Database defaults
  → Schema defaults
    → Table defaults
      → Column declaration
```

---

## Extensions

### Analytics Extension

```yaml
mx:
  analytics:
    warehouse_sync:
      enabled: true
      destination: snowflake
      schedule: "0 * * * *"
      
    metrics:
      row_count: 2500000
      distinct_values:
        country_code: 195
        status: 3
      null_percentage:
        phone: 0.15
        
    usage:
      queries_per_day: 15000
      top_queries:
        - query: "SELECT by email"
          count: 8500
        - query: "SELECT by id"
          count: 4200
```

### Data Quality Extension

```yaml
mx:
  quality:
    rules:
      - name: email_valid
        column: email
        check: "email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z]{2,}$'"
        severity: error
        
      - name: phone_format
        column: phone
        check: "phone ~* '^\\+[1-9]\\d{1,14}$'"
        severity: warning
        
      - name: status_valid
        column: status
        check: "status IN ('active', 'suspended', 'closed')"
        severity: error
        
    monitoring:
      freshness:
        column: updated_at
        max_age: 24h
        
      volume:
        min_rows: 2000000
        max_rows: 5000000
```

### Lineage Extension

```yaml
mx:
  lineage:
    upstream:
      - source: crm_system
        table: contacts
        sync: real-time
        transformation: "Merge on email"
        
    downstream:
      - destination: data_warehouse
        table: dim_users
        sync: hourly
        
      - destination: search_index
        table: users
        sync: real-time
```

### Compliance Extension

```yaml
mx:
  compliance:
    gdpr:
      lawful_basis: contract
      retention_days: 2555
      erasure_supported: true
      portability_supported: true
      
    ccpa:
      sale_of_data: false
      opt_out_supported: true
      
    audit:
      enabled: true
      log_table: audit_log
      logged_operations: [insert, update, delete]
```

---

## Interpretation by AI Agents

### Database Access Decisions

AI agents MUST check permissions before any database interaction:

```
1. Check database.ai.query_allowed
2. Check schema.ai.query_allowed (if inherited)
3. Check table.ai.query_allowed
4. Check column.ai.mask_in_responses for each column
```

### Permission Interpretation

| Property | If False |
|----------|----------|
| `ai.query_allowed` | Do not execute queries |
| `ai.schema_visible` | Do not reveal schema details |
| `ai.sample_data` | Do not request or show sample data |
| `ai.training_data` | Do not use for training |

### Query Generation

When generating queries, agents SHOULD:

1. Use `ai.common_queries` patterns as templates
2. Prefer tables/views marked `ai.query_allowed: true`
3. Exclude columns with `ai.mask_in_responses: true`
4. Use `ai.example` values for safe demonstrations
5. Respect `ai.joins_with` for relationship traversal

### Semantic Understanding

Agents SHOULD use semantic metadata:

1. `semantic.type` — understand data meaning
2. `semantic.entity` — identify business entities
3. `semantic.role` — understand column purpose
4. `semantic.standard` — apply correct formatting

### PII Handling

When encountering PII:

1. Never include in training data
2. Mask in responses if `ai.mask_in_responses: true`
3. Use `ai.example` for demonstrations
4. Note sensitivity in any data handling

### Query Metadata Usage

When executing predefined queries:

1. Check `ai.safe_to_run`
2. Validate parameters against constraints
3. Never infer values for `ai.never_infer: true` parameters
4. Use `ai.example_output` for demonstrations

---

## Migration Guidance

### Phase 1: Database Inventory

```bash
# Extract schema information
pg_dump --schema-only ecommerce > schema.sql

# Generate initial metadata
mx-database extract --source schema.sql --output /database/
```

### Phase 2: Classification

1. Identify PII columns using auto-rules
2. Review and adjust classifications
3. Set AI permissions based on sensitivity

### Phase 3: Semantic Enrichment

1. Add semantic types to columns
2. Document relationships
3. Create data dictionary entries

### Phase 4: Query Documentation

1. Document common queries
2. Add safe-to-run flags
3. Create parameterised query templates

### Phase 5: Validation

```bash
# Validate metadata against live database
mx-database validate --metadata /database/ --connection $DATABASE_URL

# Check for undocumented tables/columns
mx-database audit --metadata /database/ --connection $DATABASE_URL
```

---

## Appendix A: Quick Reference

### File Naming

| Type | Pattern |
|------|---------|
| Database | `mx.database.yaml` |
| Schema | `{name}.schema.yaml` |
| Table | `{name}.table.yaml` |
| View | `{name}.view.yaml` |
| Query | `{name}.query.yaml` |
| Procedure | `{name}.procedure.yaml` |

### Classification Levels

| Level | AI Query | AI Training | Schema Visible |
|-------|----------|-------------|----------------|
| `public` | Yes | Yes | Yes |
| `internal` | Yes | No | Yes |
| `confidential` | No | No | Yes |
| `restricted` | No | No | No |

### Common Semantic Types

| Type | PII | Example Columns |
|------|-----|-----------------|
| `identifier` | No | id, uuid, sku |
| `name` | Yes | first_name, company_name |
| `email` | Yes | email, contact_email |
| `phone` | Yes | phone, mobile |
| `address` | Yes | street, city |
| `country` | No | country_code |
| `currency` | No | price, total |
| `timestamp` | No | created_at |
| `status` | No | order_status |

### AI Properties Summary

| Property | Level | Purpose |
|----------|-------|---------|
| `ai.query_allowed` | Database/Table | Execute queries |
| `ai.schema_visible` | Database/Table | Reveal structure |
| `ai.sample_data` | Database/Table | Show sample data |
| `ai.training_data` | Database/Table | Use for training |
| `ai.searchable` | Column | Include in search |
| `ai.facetable` | Column | Use for filtering |
| `ai.mask_in_responses` | Column | Hide in responses |
| `ai.safe_to_run` | Query | Execute query |

---

## Appendix B: References

- MX Base Specification: https://mx.community/spec/base
- MX Structured Data Specification: https://mx.community/spec/structured-data
- MX Code Metadata Specification: https://mx.community/spec/code-metadata
- ISO 3166-1: https://www.iso.org/iso-3166-country-codes.html
- ISO 4217: https://www.iso.org/iso-4217-currency-codes.html
- GDPR: https://gdpr.eu/
- PCI DSS: https://www.pcisecuritystandards.org/

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0-draft | January 2026 | Initial draft |
