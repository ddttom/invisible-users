---
title: "MX Specifications: Chapter 8"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "Database Metadata"
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

# Chapter 8: Database Metadata

Databases are black boxes to most AI systems.

An AI assistant can see your documentation about users and orders and products. It can read your API specifications. It can understand your content. But when it comes to your actual database — the schema, the relationships, the meaning of each column — it's working blind.

This creates a gap. Users ask questions that require database knowledge. "How many orders did we ship last month?" "What's the average customer lifetime value?" "Show me users who signed up but never purchased." These questions have answers in your data, but AI can't find them without understanding your schema.

The MX Database Metadata Specification describes database structures in ways AI can understand. It covers schemas, tables, columns, relationships, and queries — not the data itself, but the meaning and context that makes data useful.

---

## The Problem of Schema Blindness

Consider a simple users table:

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    pwd_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    last_login TIMESTAMP,
    status INTEGER,
    tier_id INTEGER REFERENCES tiers(id)
);
```

A human database administrator understands this instantly. `pwd_hash` is a password hash — sensitive, never expose it. `status` is probably an enum — 1 might mean active, 2 might mean suspended. `tier_id` links to a pricing tier.

An AI sees column names and types. It might guess that `email` contains email addresses. It might guess that `pwd_hash` is sensitive. But it can't know what `status: 3` means, or whether `tier_id` should be joined to display meaningful information.

Database metadata fills this gap. It tells AI what each column means, how tables relate, what's sensitive, and how to write safe, useful queries.

---

## Sidecar Files for Databases

Like media files, databases can't embed YAML metadata directly. MX uses sidecar files that describe database objects.

```
/database/
  acme_production.mx.yaml       # Database-level metadata
  schemas/
    public.mx.yaml              # Schema-level metadata
  tables/
    users.mx.yaml               # Table-level metadata
    orders.mx.yaml
    products.mx.yaml
  views/
    monthly_revenue.mx.yaml
  queries/
    active_users.mx.yaml        # Documented queries
```

This structure mirrors your database organisation. Each object gets its own metadata file.

---

## Database-Level Metadata

Start at the top with database-wide settings:

```yaml
# /database/acme_production.mx.yaml
mx:
  version: "1.0"

database:
  name: acme_production
  description: "Primary production database for Acme platform"
  
  engine: postgresql
  version: "15.2"
  
  environment: production
  
  owner:
    team: data-engineering
    contact: data-team@acme.example.com
    
  classification:
    sensitivity: confidential
    pii_present: true
    regulatory:
      gdpr: true
      ccpa: true
      
  ai:
    query_allowed: true
    training_allowed: false
    
    restrictions:
      - "Never expose pwd_hash or similar credential columns"
      - "Always filter deleted records unless specifically requested"
      - "Limit result sets to 1000 rows by default"

mx:status: published
mx:audience: machine
```

### Database Properties

| Property | Description |
|----------|-------------|
| `name` | Database identifier |
| `description` | What this database contains |
| `engine` | Database system (postgresql, mysql, etc.) |
| `version` | Engine version |
| `environment` | production, staging, development |
| `owner` | Responsible team |
| `classification` | Security classification |
| `ai` | AI access permissions |

---

## Schema-Level Metadata

Schemas group related tables. Schema metadata sets defaults for tables within:

```yaml
# /database/schemas/public.mx.yaml
mx:
  version: "1.0"

schema:
  name: public
  description: "Core application tables"
  
  domains:
    - users
    - orders
    - products
    - payments
    
  tables:
    - users
    - user_preferences
    - orders
    - order_items
    - products
    - product_categories
    - payments
    - payment_methods
    
  defaults:
    classification:
      sensitivity: internal
    ai:
      query_allowed: true
      
mx:inheritable:
  - classification
  - ai
```

---

## Table-Level Metadata

Table metadata is where most detail lives. It describes what the table contains, who owns it, and how AI should interact with it.

### Basic Table Metadata

```yaml
# /database/tables/users.mx.yaml
mx:
  version: "1.0"

table:
  name: users
  schema: public
  description: "Registered user accounts"
  
  purpose: |
    Stores all registered users of the platform.
    One row per user account. Users may have multiple
    associated records in orders, preferences, etc.
    
  owner:
    team: identity-team
    contact: identity@acme.example.com
    
  domain: users
  
  row_count_estimate: 2500000
  growth_rate: "~5000 new rows/day"
  
  classification:
    sensitivity: confidential
    pii_present: true
    pii_columns: [email, phone, address_id]
    
  retention:
    policy: legal_hold
    days: null  # Retained indefinitely
    
  sla:
    availability: 99.9
    max_query_time: 100ms

mx:status: published
mx:audience: machine
```

### Column Definitions

The heart of table metadata is column definitions:

```yaml
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
        display_name: "User ID"
        include_in_results: true
        
    - name: email
      type: varchar(255)
      nullable: false
      unique: true
      description: "User's email address, used for login"
      
      semantic:
        type: email
        role: contact
        
      classification:
        pii: true
        pii_type: email
        
      ai:
        display_name: "Email"
        searchable: true
        mask_in_responses: false
        safe_example: "user@example.com"
        
    - name: pwd_hash
      type: varchar(255)
      nullable: false
      description: "Bcrypt hash of user password"
      
      classification:
        pii: true
        pii_type: credential
        sensitivity: restricted
        
      ai:
        display_name: "Password Hash"
        include_in_results: false
        searchable: false
        never_expose: true
        
    - name: created_at
      type: timestamp
      nullable: false
      default: CURRENT_TIMESTAMP
      description: "When the user account was created"
      
      semantic:
        type: timestamp
        role: creation_time
        
      ai:
        display_name: "Created"
        sortable: true
        filterable: true
        
    - name: status
      type: integer
      nullable: false
      default: 1
      description: "Account status"
      
      semantic:
        type: status
        entity: user
        
      enum:
        values:
          1: active
          2: suspended
          3: deleted
          4: pending_verification
          
      ai:
        display_name: "Status"
        filterable: true
        default_filter: "status != 3"  # Exclude deleted by default
        
    - name: tier_id
      type: integer
      nullable: true
      description: "Reference to user's subscription tier"
      
      foreign_key:
        table: tiers
        column: id
        
      semantic:
        type: identifier
        entity: tier
        role: subscription
        
      ai:
        display_name: "Subscription Tier"
        join_recommended: true
        join_display: "tiers.name"
```

### Column Properties

| Property | Description |
|----------|-------------|
| `name` | Column name |
| `type` | SQL data type |
| `nullable` | Whether NULL is allowed |
| `primary_key` | Is this the primary key |
| `unique` | Must values be unique |
| `default` | Default value |
| `description` | What this column contains |
| `semantic` | Semantic meaning |
| `classification` | Security classification |
| `enum` | Enumerated values |
| `foreign_key` | Reference to another table |
| `ai` | AI-specific properties |

---

## Semantic Types

Semantic types tell AI what kind of data a column contains, beyond just the SQL type.

### Common Semantic Types

| Type | Description | Examples |
|------|-------------|----------|
| `identifier` | Unique ID | User ID, Order ID |
| `name` | Name of something | Product name, Company name |
| `email` | Email address | Contact email |
| `phone` | Phone number | Mobile, landline |
| `address` | Physical address | Shipping address |
| `country` | Country code | GB, US, DE |
| `currency` | Currency code | GBP, USD, EUR |
| `money` | Monetary amount | Price, total |
| `quantity` | Count or amount | Items, units |
| `percentage` | Percentage value | Discount rate |
| `timestamp` | Date and time | Created, modified |
| `date` | Date only | Birth date |
| `duration` | Time span | Subscription length |
| `status` | State or status | Order status |
| `category` | Classification | Product category |
| `description` | Free text description | Product description |
| `url` | Web address | Homepage, image URL |
| `json` | JSON data | Settings, metadata |

### Semantic Roles

Roles describe how the column functions:

```yaml
semantic:
  type: timestamp
  role: creation_time  # vs modification_time, deletion_time
  
semantic:
  type: identifier
  role: primary  # vs foreign, alternate
  
semantic:
  type: money
  role: price  # vs cost, discount, total
```

---

## Relationships

Relationships describe how tables connect. AI needs this to write correct joins.

### Foreign Keys

```yaml
table:
  name: orders
  
  columns:
    - name: user_id
      type: uuid
      nullable: false
      
      foreign_key:
        table: users
        column: id
        on_delete: CASCADE
        on_update: CASCADE
        
      semantic:
        type: identifier
        entity: user
        
      ai:
        join_recommended: true
        join_display: "users.email"
```

### Relationship Metadata

Beyond foreign keys, describe the relationship semantically:

```yaml
table:
  name: orders
  
  relationships:
    - name: order_user
      type: many-to-one
      from_column: user_id
      to_table: users
      to_column: id
      description: "The user who placed this order"
      
      ai:
        always_join: false
        join_when: "user information needed"
        traversal_allowed: true
        
    - name: order_items
      type: one-to-many
      from_column: id
      to_table: order_items
      to_column: order_id
      description: "Items in this order"
      
      ai:
        aggregate_recommended: true
        common_aggregates:
          - "COUNT(*) as item_count"
          - "SUM(quantity) as total_items"
          - "SUM(price * quantity) as order_total"
```

### Join Guidance

Help AI write efficient joins:

```yaml
table:
  name: orders
  
  joins:
    common:
      - tables: [orders, users]
        on: "orders.user_id = users.id"
        purpose: "Get user details for orders"
        
      - tables: [orders, order_items, products]
        on: |
          orders.id = order_items.order_id
          AND order_items.product_id = products.id
        purpose: "Get product details for order items"
        
    avoid:
      - tables: [orders, audit_log]
        reason: "audit_log is very large, use specific queries instead"
```

---

## Indexes

Index metadata helps AI write performant queries:

```yaml
table:
  name: orders
  
  indexes:
    - name: idx_orders_user_id
      columns: [user_id]
      type: btree
      purpose: "Fast lookup of orders by user"
      
      ai:
        use_when: "Filtering or joining on user_id"
        
    - name: idx_orders_created_at
      columns: [created_at]
      type: btree
      purpose: "Time-based queries"
      
      ai:
        use_when: "Date range queries on orders"
        note: "Prefer this over full table scans for date filters"
        
    - name: idx_orders_status_created
      columns: [status, created_at]
      type: btree
      purpose: "Status queries with date ordering"
      
      ai:
        use_when: "Filtering by status with date range"
        query_pattern: "WHERE status = ? AND created_at > ?"
```

---

## Views

Views often provide the right abstraction for common queries:

```yaml
# /database/views/monthly_revenue.mx.yaml
mx:
  version: "1.0"

view:
  name: monthly_revenue
  schema: public
  description: "Monthly revenue aggregation by product category"
  
  source_tables:
    - orders
    - order_items
    - products
    - product_categories
    
  definition: |
    SELECT 
      DATE_TRUNC('month', o.created_at) as month,
      pc.name as category,
      SUM(oi.quantity * oi.price) as revenue,
      COUNT(DISTINCT o.id) as order_count
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    JOIN product_categories pc ON p.category_id = pc.id
    WHERE o.status = 1  -- completed orders only
    GROUP BY 1, 2
    
  materialized: false
  refresh_schedule: null
  
  columns:
    - name: month
      description: "First day of the month"
      ai:
        display_name: "Month"
        format: "YYYY-MM"
        
    - name: category
      description: "Product category name"
      ai:
        display_name: "Category"
        
    - name: revenue
      description: "Total revenue for the month/category"
      ai:
        display_name: "Revenue"
        format: "currency"
        
    - name: order_count
      description: "Number of orders"
      ai:
        display_name: "Orders"
        
  ai:
    purpose: "Use for revenue reporting and trend analysis"
    prefer_over: "Complex joins of orders/items/products"
    limitations:
      - "Only includes completed orders"
      - "Excludes refunds and cancellations"

mx:status: published
```

---

## Documented Queries

Some queries are common enough to document explicitly. This helps AI reuse proven patterns:

```yaml
# /database/queries/active_users_last_30_days.mx.yaml
mx:
  version: "1.0"

query:
  name: active_users_last_30_days
  description: "Count of users who logged in within the last 30 days"
  
  sql: |
    SELECT COUNT(DISTINCT id) as active_users
    FROM users
    WHERE last_login >= NOW() - INTERVAL '30 days'
      AND status = 1
      
  parameters: []
  
  returns:
    - name: active_users
      type: integer
      description: "Number of active users"
      
  tables_accessed:
    - users
    
  estimated_cost: low
  typical_runtime: "<100ms"
  
  ai:
    use_for:
      - "Questions about active user count"
      - "User engagement metrics"
      - "Monthly active users (MAU)"
    variations:
      - question: "How many users logged in last week?"
        modification: "Change INTERVAL to '7 days'"
      - question: "Active users by tier"
        modification: "Add GROUP BY tier_id and JOIN tiers"
        
mx:status: published
```

### Query Library

Build a library of documented queries:

```yaml
# /database/queries/customer_lifetime_value.mx.yaml
query:
  name: customer_lifetime_value
  description: "Calculate lifetime value for customers"
  
  sql: |
    SELECT 
      u.id as user_id,
      u.email,
      u.created_at as signup_date,
      COUNT(DISTINCT o.id) as total_orders,
      SUM(oi.quantity * oi.price) as lifetime_value,
      AVG(oi.quantity * oi.price) as avg_order_value
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id AND o.status = 1
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE u.status != 3  -- exclude deleted users
    GROUP BY u.id, u.email, u.created_at
    
  parameters: []
  
  ai:
    use_for:
      - "Customer lifetime value"
      - "CLV analysis"
      - "Customer value metrics"
    notes:
      - "Uses LEFT JOIN so users with no orders show 0 value"
      - "Only counts completed orders (status = 1)"
```

---

## AI Query Safety

Database metadata can define safety rules for AI-generated queries:

### Query Restrictions

```yaml
database:
  ai:
    query_restrictions:
      # Never allow these operations
      forbidden_operations:
        - DELETE
        - DROP
        - TRUNCATE
        - UPDATE
        - INSERT
        
      # Always include these conditions
      required_conditions:
        users: "status != 3"  # Exclude deleted users
        orders: "status != 5"  # Exclude cancelled orders
        
      # Maximum rows to return
      max_results: 1000
      
      # Timeout for queries
      max_runtime: 30s
      
      # Tables AI cannot query
      forbidden_tables:
        - audit_log
        - system_config
        - api_keys
```

### Safe Examples

Provide safe example values for testing:

```yaml
columns:
  - name: email
    ai:
      safe_example: "user@example.com"
      safe_pattern: "*@example.com"
      
  - name: phone
    ai:
      safe_example: "+44 7700 900000"
      
  - name: credit_card_last4
    ai:
      safe_example: "4242"
```

---

## Inheritance

Database metadata supports inheritance like other MX specifications:

### Database to Schema

```yaml
# Database level
database:
  defaults:
    classification:
      sensitivity: internal
    ai:
      query_allowed: true
      
  mx:inheritable:
    - classification
    - ai
```

### Schema to Table

```yaml
# Schema level
schema:
  name: public
  
  defaults:
    ai:
      query_allowed: true
      max_results: 1000
      
  mx:inheritable:
    - ai
```

### Table to Column

```yaml
# Table level
table:
  name: users
  
  defaults:
    ai:
      include_in_results: true
      
  # Columns inherit defaults unless overridden
  columns:
    - name: pwd_hash
      ai:
        include_in_results: false  # Override default
```

---

## Putting It Together

Here's a complete table metadata example:

```yaml
# /database/tables/orders.mx.yaml
mx:
  version: "1.0"

table:
  name: orders
  schema: public
  description: "Customer orders"
  
  purpose: |
    Records all customer orders. One row per order.
    Order items are in the order_items table.
    Status tracks the order lifecycle from pending to completed.
    
  owner:
    team: commerce-team
    contact: commerce@acme.example.com
    
  domain: orders
  
  row_count_estimate: 15000000
  growth_rate: "~10000 new rows/day"
  
  classification:
    sensitivity: confidential
    pii_present: true
    pii_columns: [shipping_address_id, billing_address_id]
    
  columns:
    - name: id
      type: uuid
      nullable: false
      primary_key: true
      description: "Unique order identifier"
      semantic:
        type: identifier
        entity: order
      ai:
        display_name: "Order ID"
        
    - name: user_id
      type: uuid
      nullable: false
      description: "Customer who placed the order"
      foreign_key:
        table: users
        column: id
      semantic:
        type: identifier
        entity: user
      ai:
        display_name: "Customer"
        join_recommended: true
        join_display: "users.email"
        
    - name: status
      type: integer
      nullable: false
      default: 1
      description: "Order status"
      semantic:
        type: status
        entity: order
      enum:
        values:
          1: pending
          2: processing
          3: shipped
          4: delivered
          5: cancelled
          6: refunded
      ai:
        display_name: "Status"
        filterable: true
        common_filters:
          - "status IN (1, 2, 3)"  # Active orders
          - "status = 4"           # Delivered
          - "status NOT IN (5, 6)" # Not cancelled/refunded
          
    - name: total
      type: decimal(10,2)
      nullable: false
      description: "Order total including tax and shipping"
      semantic:
        type: money
        role: total
      ai:
        display_name: "Total"
        format: "currency"
        aggregate_functions: [SUM, AVG, MIN, MAX]
        
    - name: created_at
      type: timestamp
      nullable: false
      default: CURRENT_TIMESTAMP
      description: "When the order was placed"
      semantic:
        type: timestamp
        role: creation_time
      ai:
        display_name: "Order Date"
        sortable: true
        filterable: true
        date_range_queries: true
        
    - name: shipped_at
      type: timestamp
      nullable: true
      description: "When the order was shipped"
      semantic:
        type: timestamp
        role: milestone
      ai:
        display_name: "Shipped Date"
        note: "NULL if not yet shipped"
        
  relationships:
    - name: order_user
      type: many-to-one
      from_column: user_id
      to_table: users
      to_column: id
      ai:
        always_join: false
        join_when: "Customer details needed"
        
    - name: order_items
      type: one-to-many
      to_table: order_items
      to_column: order_id
      ai:
        aggregate_recommended: true
        common_aggregates:
          - "COUNT(*) as item_count"
          - "SUM(quantity) as total_units"
          
  indexes:
    - name: idx_orders_user_id
      columns: [user_id]
      ai:
        use_when: "Looking up orders for a specific user"
        
    - name: idx_orders_status_created
      columns: [status, created_at]
      ai:
        use_when: "Filtering by status with date range"
        
    - name: idx_orders_created_at
      columns: [created_at]
      ai:
        use_when: "Date range queries"
        
  ai:
    purpose: "Order history, sales analysis, fulfillment tracking"
    common_queries:
      - "Orders by customer"
      - "Orders in date range"
      - "Orders by status"
      - "Revenue by period"
    query_tips:
      - "Join order_items for product details"
      - "Filter status != 5 to exclude cancelled"
      - "Use created_at index for date range queries"
    avoid:
      - "Full table scans without date filters"
      - "Joining audit tables"

mx:status: published
mx:audience: machine
mx:volatility: stable
```

This metadata gives AI everything it needs:

- What the table contains and why it exists
- What each column means and how to display it
- How status values translate to meaningful states
- How to join to related tables
- What indexes to use for performance
- Common query patterns and tips
- What to avoid

An AI assistant can now write correct, efficient, safe queries against this table — because it understands the table, not just its structure.

---

## The Schema as Documentation

Database metadata serves two audiences. For AI, it enables query generation and data understanding. For humans, it's living documentation that stays with the schema.

Traditional database documentation lives in wikis, gets out of date, and disconnects from the actual schema. MX database metadata lives alongside the schema definition. When the schema changes, the metadata is right there to update.

This dual benefit — AI enablement and human documentation — makes database metadata valuable even before AI touches it.

---

*The following chapter covers Composition — how to combine multiple specifications for real-world implementations.*
