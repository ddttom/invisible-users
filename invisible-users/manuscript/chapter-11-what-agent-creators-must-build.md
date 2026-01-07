\newpage

# Chapter 11 - What Agent Creators Must Build

Implementation patterns, validation layers, and guardrails for reliable agent systems.

## Introduction

I've spent ten chapters explaining what websites should build to work for AI agents. Now we need to talk about the other side of this conversation.

Even perfectly designed websites cannot prevent all failures. An agent that scrapes a well-structured page can still extract wrong data, misinterpret numbers, or report confidence it shouldn't have. These aren't website design problems. These are agent implementation problems.

Chapter 9 showed what designers should build. Chapter 10 showed how developers should implement it. This chapter completes the picture by addressing what agent creators - the people building AI assistants, browser extensions, CLI tools, and API services - should build into their systems.

The difference matters. A website can provide clear, semantic HTML with perfect structured data. If the agent lacks validation layers, it will propagate errors anyway. The £203,000 cruise pricing mistake I'll examine in detail shortly happened because both sides failed: the website showed ambiguous pricing, and the agent lacked the guardrails to detect the error before reporting it.

Fixing this ecosystem requires work from both parties. That's what this chapter provides.

![What Agent Creators Must Build - validation pipeline and confidence scoring system](illustrations/chapter-11-what-agent-creators-must-build.png)

## The Three Failure Types

When an AI agent makes a mistake, we need to understand where the failure occurred. This taxonomy helps clarify responsibility and identify solutions.

### Website Design Failures

These are the patterns Chapter 2 explored in detail: toast notifications that vanish, content hidden behind pagination, single-page applications with invisible state changes, validation errors that appear too late, pricing hidden until checkout, and loading states without semantic information.

**Responsibility:** Website owner
**Solution:** Implement patterns from Chapters 9 and 10
**Impact:** Affects all users - agents and humans alike

When a form shows errors in a toast notification that disappears after three seconds, that's a website design failure. The agent cannot be expected to catch ephemeral content. The website needs to display persistent errors.

### Agent Reasoning Failures

The agent sees correct data but makes wrong decisions. It chooses the wrong product despite having complete specifications. It misunderstands requirements despite clear instructions. It recommends a solution that doesn't match the stated criteria.

**Responsibility:** Model provider (OpenAI, Anthropic, etc.)
**Solution:** Better training, improved reasoning capabilities
**Impact:** Affects decision quality, not data quality

When an agent correctly extracts that three river cruises cost £2,000-£6,000 and one costs £203,000, but recommends the £203,000 option anyway because "it must be the luxury choice," that's a reasoning failure. The data extraction worked. The decision-making failed.

### Pipeline Failures

The agent fails to detect, validate, or correctly parse data before acting on it. It extracts £203,000 when the actual price is £2,030. It reports pricing data without flagging that it's 100 times higher than market average. It never cross-references HTML content against structured data. It provides no confidence indicators, no warnings, no suggestion to verify.

**Responsibility:** Agent creator
**Solution:** Validation layers, confidence scoring, guardrails (this chapter)
**Impact:** Affects data reliability and user trust in the agent ecosystem

This is the category we haven't addressed yet. Website owners cannot fix it. Model improvements cannot fix it. Only agent creators can fix it by building better pipelines.

**The critical distinction:** Pipeline failures occur before reasoning begins. The agent never questions whether £203,000 is reasonable because it never had a validation layer that could flag the number as suspicious. By the time the reasoning engine sees the data, the error has already been accepted as truth.

A hospital triage system that accepts blood pressure readings without range validation would be negligent. If someone enters 1200/800, the system should reject it immediately - not pass it to the doctor for diagnosis. The same principle applies to agents: validate data at extraction, not at decision-making.

## Anatomy of the £203,000 Error

Let me show you a real pipeline failure in detail. This isn't theoretical. This happened.

An AI agent was researching river cruise options. It examined multiple operators and reported findings including pricing. For one operator, it reported: "Pricing ranges from £203,000 to £402,000 per person."

The actual pricing was £2,030 to £4,020 per person. The agent had multiplied by 100.

**This wasn't a reasoning failure.** The agent didn't think £203,000 was reasonable and recommend it anyway. It never questioned the data. It extracted a number, formatted it for output, and reported it with the same confidence as every other piece of information.

**This was a pipeline failure.** The agent lacked validation layers that should have caught the error before it became part of the output.

### Four Possible Failure Scenarios

Without access to the agent's internals, I cannot prove which scenario occurred. But these are the likely candidates:

#### Scenario 1: Decimal Separator Confusion

European number formatting uses periods as thousands separators and commas for decimals:

```text
€2.030,00 (European: two thousand thirty euros)
£203000 (British: two hundred three thousand pounds)
```

If the agent parsed the European format as British format, it would read "2.030" as "2.030" (two point zero three zero) and multiply to convert from euros to pounds, arriving at approximately £2,030. But if it misread the separator structure, it might have extracted "2030" and then applied currency conversion incorrectly, or worse, treated the period as a decimal point: "2.03" multiplied by 100 equals "203".

This is speculation, but it demonstrates how formatting ambiguity creates extraction errors.

#### Scenario 2: Number Concatenation Error

HTML might present pricing across multiple elements:

```html
<div class="price">
  <span class="currency">£</span>
  <span class="amount">2,030</span>
  <span class="decimal">.00</span>
</div>
```

If the agent concatenated without understanding structure, it might extract: "203000" (combining "2,030" and "00" whilst stripping the comma).

#### Scenario 3: Wrong Field Extraction

The agent might have extracted the wrong data field entirely. River cruise operators show multiple price points:

- Per person price: £2,030
- Total cabin price: £4,060 (two people)
- Total revenue for full boat: £203,000 (100 passengers)

If the agent scraped a summary table showing "Total voyage revenue: £203,000" and misidentified it as "Price per person," the error would be introduced at extraction, not calculation.

#### Scenario 4: HTML Parsing Without Separators

CSS formatting might visually separate elements that are adjacent in HTML:

```html
<td>£2,030</td><td>-</td><td>£4,020</td>
```

Rendered with CSS: `£2,030 - £4,020`

Parsed without CSS awareness: `£2,030-£4,020` or `£20304020`

Any of these scenarios share a common characteristic: the error occurred during data extraction, not during reasoning or decision-making. By the time the agent's language model processed the information, the wrong number was already established as fact.

### What Should Have Happened

A properly designed agent pipeline would have caught this error through multiple checkpoints:

```text
Step 1: Extract price → "203000"
Step 2: Range validation → FLAG: Price exceeds typical luxury cruise maximum (£15,000)
Step 3: Comparative analysis → FLAG: Price 100x higher than competitor average
Step 4: Structured data cross-reference → FLAG: HTML price conflicts with Schema.org price
Step 5: Confidence scoring → Result: Low confidence (40%)
Step 6: Output with warning → "Price data may be incorrect (significantly above market range). Verify at operator website before booking."
```

Instead, what actually happened:

```text
Step 1: Extract price → "203000"
Step 2: Format output → "£203,000"
Step 3: Report to user → (no warnings, no confidence indicators)
```

The agent had no validation layer. It reported the extracted data as truth. A human with domain knowledge spotted the error. That human knowledge should have been encoded as validation rules.

## The Validation Gap

Agent creators need to build validation layers between data extraction and output generation. Here are the critical checkpoints.

### Range Validation

Every data type has expected bounds. Prices, dates, quantities, percentages - they all have ranges where values are plausible and ranges where they indicate errors.

```javascript
class PriceValidator {
  constructor() {
    // Market knowledge: typical price ranges by category
    this.ranges = {
      'river-cruise': { min: 800, max: 15000, currency: 'GBP' },
      'hotel-night': { min: 40, max: 2000, currency: 'GBP' },
      'restaurant-meal': { min: 10, max: 300, currency: 'GBP' }
    };
  }

  validate(price, category) {
    const range = this.ranges[category];
    if (!range) {
      return { valid: true, confidence: 50, warnings: ['Unknown category'] };
    }

    const warnings = [];
    let confidence = 100;

    // Check if price is within expected range
    if (price < range.min) {
      confidence -= 30;
      warnings.push(`Price below typical minimum (£${range.min})`);
    }

    if (price > range.max) {
      confidence -= 40;
      warnings.push(`Price above typical maximum (£${range.max})`);
    }

    // Check for magnitude errors (common parsing mistakes)
    if (price > range.max * 10) {
      confidence -= 30;
      warnings.push('Price suggests magnitude error (10x above range)');
    }

    return {
      valid: confidence > 50,
      confidence,
      warnings
    };
  }
}

// Usage
const validator = new PriceValidator();
const result = validator.validate(203000, 'river-cruise');
// Returns: { valid: false, confidence: 0, warnings: [...] }
```

This validation would have caught the £203,000 error immediately. The price exceeds the typical maximum by more than 10x, triggering multiple warnings and reducing confidence to zero.

### Comparative Analysis

When examining multiple similar items, outliers deserve scrutiny. If three river cruises cost £2,000-£6,000 and one costs £203,000, the outlier is suspect.

```javascript
class ComparativeValidator {
  analyseOutliers(prices) {
    const sorted = prices.sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    const outliers = [];

    prices.forEach((price, index) => {
      const ratio = price / median;

      if (ratio > 5) {
        outliers.push({
          index,
          price,
          ratio: ratio.toFixed(1),
          warning: `Price ${ratio.toFixed(1)}x higher than median`
        });
      }
    });

    return outliers;
  }
}

// Usage
const prices = [2030, 3450, 5200, 203000];
const validator = new ComparativeValidator();
const outliers = validator.analyseOutliers(prices);
// Returns: [{ index: 3, price: 203000, ratio: "58.8", warning: "..." }]
```

When one price is 58 times higher than the median, that's a red flag. Either it's a genuinely different product (luxury suite vs standard cabin), or it's a data error. Either way, it deserves explicit attention and user notification.

#### The Incomplete Data Problem

**Critical insight from the £203k error**: The agent retrieved pricing for only one of three operators. This incomplete data pattern should itself have triggered warnings and reduced confidence.

When comparative data is missing, that's a red flag. If you're researching three competitors and only one returns pricing data, you cannot perform meaningful comparative validation. The absence of data is information.

```javascript
class ComparativeValidator {
  analyseCompleteness(results) {
    const total = results.length;
    const withPricing = results.filter(r => r.price !== null).length;
    const completeness = (withPricing / total) * 100;

    let confidence = 100;
    const warnings = [];

    if (completeness < 50) {
      confidence -= 40;
      warnings.push(
        `Unable to provide comparative pricing - only ${withPricing} of ${total} operators returned price data`
      );
    } else if (completeness < 80) {
      confidence -= 20;
      warnings.push(
        `Limited comparative data - ${withPricing} of ${total} operators have pricing`
      );
    }

    return {
      completeness: completeness.toFixed(0) + '%',
      confidence,
      warnings,
      recommendation: completeness < 50
        ? 'Manual verification required'
        : 'Cross-check recommended'
    };
  }
}

// Usage with the £203k scenario
const results = [
  { operator: 'A', price: null },       // No pricing data
  { operator: 'B', price: 203000 },     // Erroneous pricing
  { operator: 'C', price: null }        // No pricing data
];

const validator = new ComparativeValidator();
const analysis = validator.analyseCompleteness(results);
// Returns: {
//   completeness: '33%',
//   confidence: 60,
//   warnings: ['Unable to provide comparative pricing - only 1 of 3 operators...'],
//   recommendation: 'Manual verification required'
// }
```

**What should have happened**: When the agent discovered pricing for only one operator, confidence should have dropped to 60% or lower. The output should have included an explicit warning: "Only 1 of 3 operators provided pricing data. Comparative analysis not possible. Recommend checking operator websites directly."

Instead, the agent presented the single (erroneous) price with full confidence, as if it were validated.

**Best practice**: Always track data completeness. When gathering comparative information (prices, features, ratings), log what percentage of sources returned usable data. Incomplete data reduces confidence, even if the data you do have seems internally consistent.

### Structured Data Cross-Reference

Websites increasingly provide structured data using Schema.org vocabularies. This data should be treated as authoritative truth. If HTML content conflicts with structured data, flag the inconsistency.

```javascript
class StructuredDataValidator {
  crossReference(htmlPrice, jsonLDPrice) {
    const warnings = [];
    let confidence = 100;

    if (!jsonLDPrice) {
      confidence -= 20;
      warnings.push('No structured data available for verification');
      return { confidence, warnings, source: 'html-only' };
    }

    const difference = Math.abs(htmlPrice - jsonLDPrice);
    const percentDiff = (difference / jsonLDPrice) * 100;

    if (percentDiff > 5) {
      confidence -= 40;
      warnings.push(
        `HTML price (£${htmlPrice}) conflicts with structured data (£${jsonLDPrice})`
      );
    }

    return {
      confidence,
      warnings,
      source: confidence > 70 ? 'structured-data' : 'conflict-detected'
    };
  }
}

// Usage
const htmlPrice = 203000; // Extracted from HTML table
const jsonLDPrice = 2030;  // From Schema.org structured data

const validator = new StructuredDataValidator();
const result = validator.crossReference(htmlPrice, jsonLDPrice);
// Returns: { confidence: 60, warnings: [...], source: 'conflict-detected' }
```

If the website provides `"price": "2030"` in JSON-LD but your HTML parser extracted "203000", you've found a data extraction error. Trust the structured data. It was explicitly marked up for machine consumption.

### Confidence Accumulation

These validation checks shouldn't operate in isolation. Each check contributes to an overall confidence score.

```javascript
class ValidationPipeline {
  constructor() {
    this.rangeValidator = new PriceValidator();
    this.comparativeValidator = new ComparativeValidator();
    this.structuredDataValidator = new StructuredDataValidator();
  }

  validate(data) {
    let confidence = 100;
    const warnings = [];

    // Range validation
    const rangeResult = this.rangeValidator.validate(
      data.price,
      data.category
    );
    confidence = Math.min(confidence, rangeResult.confidence);
    warnings.push(...rangeResult.warnings);

    // Comparative analysis (if peer data available)
    if (data.competitorPrices && data.competitorPrices.length > 2) {
      const allPrices = [...data.competitorPrices, data.price];
      const outliers = this.comparativeValidator.analyseOutliers(allPrices);

      if (outliers.length > 0) {
        confidence -= 25;
        warnings.push(...outliers.map(o => o.warning));
      }
    }

    // Structured data cross-reference
    if (data.jsonLDPrice) {
      const structuredResult = this.structuredDataValidator.crossReference(
        data.price,
        data.jsonLDPrice
      );
      confidence = Math.min(confidence, structuredResult.confidence);
      warnings.push(...structuredResult.warnings);
    }

    return {
      confidence,
      warnings,
      recommendation: this.getRecommendation(confidence)
    };
  }

  getRecommendation(confidence) {
    if (confidence >= 90) return 'HIGH_CONFIDENCE';
    if (confidence >= 70) return 'MEDIUM_CONFIDENCE';
    if (confidence >= 50) return 'LOW_CONFIDENCE_PROCEED_WITH_CAUTION';
    return 'VERY_LOW_CONFIDENCE_REQUIRE_HUMAN_VERIFICATION';
  }
}
```

For the £203,000 cruise error, this pipeline would return:

```javascript
{
  confidence: 0,
  warnings: [
    'Price above typical maximum (£15,000)',
    'Price suggests magnitude error (10x above range)',
    'Price 58.8x higher than median',
    'HTML price (£203,000) conflicts with structured data (£2,030)'
  ],
  recommendation: 'VERY_LOW_CONFIDENCE_REQUIRE_HUMAN_VERIFICATION'
}
```

Zero confidence. Multiple warnings. Clear recommendation. The agent should not report this price without explicit user verification.

## Confidence Thresholds and Decision Points

Not all agent actions carry the same risk. Reading information has different requirements than making purchases. The confidence threshold should match the action's consequences.

### The Confidence Spectrum

**High Confidence (90%+):** Act autonomously without user confirmation.

Use cases: Reading public information, formatting data, generating summaries, answering factual questions from reliable sources.

**Medium Confidence (70-89%):** Act with caveats and clear sourcing.

Use cases: Recommendations based on multiple data points, comparisons where some data is incomplete, information synthesis from mixed-quality sources.

**Low Confidence (50-69%):** Flag for review before acting.

Use cases: Extracting data with ambiguous formatting, information from sites without structured data, calculations based on inferred values.

**Very Low Confidence (<50%):** Refuse to act without human verification.

Use cases: Financial transactions, booking commitments, data that conflicts across sources, outliers that suggest errors.

### Action-Dependent Thresholds

The same confidence score means different things for different actions:

| Action Type | Minimum Confidence | Failure Cost | Example |
| ----------- | ------------------ | ------------ | ------- |
| Reading/Research | 50% | Low - human can verify later | "I found three articles mentioning this topic" |
| Recommendations | 80% | Medium - influences decisions | "Based on specifications, Product A matches your requirements" |
| Booking/Purchase | 95% | High - financial commitment | "I've booked the £2,030 cruise" |
| Medical/Legal Advice | Refuse | Critical - potential harm | "You should always consult qualified professionals" |

When I encounter £203,000 for a river cruise, my confidence drops below the booking threshold. I should output:

> "Warning: Price data may be incorrect (100x higher than market average: £2,000-£6,000). I found conflicting information: HTML shows £203,000 but structured data indicates £2,030. Verify pricing at [operator website] before proceeding."

This is honest. It acknowledges uncertainty. It explains why confidence is low. It tells the human what to do next.

## Guardrails Agent Creators Should Build

Let me be specific about implementation patterns. These are the guardrails every agent should have.

### Guardrail 1: Multi-Source Verification

Never rely on a single data point for critical decisions.

```javascript
class DataExtractor {
  async extractPrice(url) {
    const sources = {
      html: null,
      jsonLD: null,
      microdata: null,
      api: null
    };

    // Extract from multiple sources
    sources.html = await this.parseHTMLPrice(url);
    sources.jsonLD = await this.parseJSONLD(url);
    sources.microdata = await this.parseMicrodata(url);

    // If site provides API, check it too
    if (this.hasPublicAPI(url)) {
      sources.api = await this.fetchAPIPrice(url);
    }

    // Compare sources
    const prices = Object.values(sources).filter(p => p !== null);

    if (prices.length === 0) {
      return {
        price: null,
        confidence: 0,
        error: 'No price data found'
      };
    }

    if (prices.length === 1) {
      return {
        price: prices[0],
        confidence: 60,
        warning: 'Single source only - could not verify'
      };
    }

    // Check if sources agree
    const uniquePrices = [...new Set(prices)];

    if (uniquePrices.length === 1) {
      return {
        price: uniquePrices[0],
        confidence: 95,
        note: 'Verified across multiple sources'
      };
    }

    // Sources conflict
    return {
      price: null,
      confidence: 30,
      error: 'Price data conflicts across sources',
      details: sources
    };
  }
}
```

If HTML says £203,000 but JSON-LD says £2,030, you have a conflict. Don't guess which is correct. Report the conflict and ask the human to verify.

### Guardrail 2: Audit Trails

Log every data extraction with full context. When humans spot errors, you need to debug what went wrong.

```javascript
class AuditLogger {
  logExtraction(data) {
    const entry = {
      timestamp: new Date().toISOString(),
      url: data.url,
      field: data.field,
      extractedValue: data.value,
      confidence: data.confidence,
      method: data.extractionMethod,
      sourceLocation: data.domPath,
      warnings: data.warnings,
      context: {
        surroundingText: data.context,
        alternativeSources: data.alternatives
      }
    };

    this.writeToLog(entry);
  }
}

// Usage after extraction
logger.logExtraction({
  url: 'https://operator.example/cruise',
  field: 'price',
  value: 203000,
  confidence: 40,
  extractionMethod: 'html-table-parse',
  domPath: 'table.pricing > tbody > tr:nth-child(3) > td:nth-child(2)',
  warnings: ['Price exceeds typical range', 'Conflicts with JSON-LD'],
  context: 'Total revenue: £203,000 | Per person: £2,030',
  alternatives: { jsonLD: 2030, microdata: null }
});
```

This log tells you exactly what happened. The agent extracted from the wrong table cell ("Total revenue" instead of "Per person"). The context field captured enough surrounding text to diagnose the error. Next time, you can fix the extraction selector.

### Guardrail 3: Comparative Context

Maintain market knowledge for common domains. This doesn't require a massive database. Simple ranges suffice.

```javascript
const marketRanges = {
  'river-cruise-europe': {
    typical: { min: 800, max: 6000 },
    luxury: { min: 5000, max: 15000 },
    currency: 'GBP'
  },
  'hotel-london': {
    typical: { min: 80, max: 300 },
    luxury: { min: 250, max: 1000 },
    currency: 'GBP'
  },
  'flight-europe': {
    typical: { min: 40, max: 300 },
    business: { min: 200, max: 1200 },
    currency: 'GBP'
  }
};

function categorisePrice(price, category, subcategory = 'typical') {
  const range = marketRanges[category]?.[subcategory];

  if (!range) return 'UNKNOWN_CATEGORY';
  if (price < range.min) return 'BELOW_RANGE';
  if (price <= range.max) return 'WITHIN_RANGE';
  if (price <= range.max * 3) return 'ABOVE_RANGE';
  return 'MAGNITUDE_ERROR_LIKELY';
}

// Check extracted price
const result = categorisePrice(203000, 'river-cruise-europe', 'luxury');
// Returns: 'MAGNITUDE_ERROR_LIKELY'
```

When a price falls into `MAGNITUDE_ERROR_LIKELY`, treat it as suspicious. Require verification before using it.

### Guardrail 4: Graceful Degradation

Define what happens when confidence is low. Never fail silently.

```javascript
class ResponseGenerator {
  generateOutput(data, confidence) {
    if (confidence >= 95) {
      return `River cruise pricing: £${data.price} per person`;
    }

    if (confidence >= 80) {
      return `River cruise pricing: approximately £${data.price} per person (${confidence}% confidence, based on ${data.sourceCount} sources)`;
    }

    if (confidence >= 60) {
      return `River cruise pricing information is uncertain. I found £${data.price} but confidence is low (${confidence}%). Recommend verifying at ${data.url}`;
    }

    // Low confidence: refuse to report without warnings
    return `Unable to reliably extract pricing. I found conflicting data: HTML suggests £${data.htmlPrice}, structured data shows £${data.jsonLDPrice}. Please verify directly at ${data.url} before making decisions.`;
  }
}
```

The output explicitly communicates uncertainty. Humans can make informed decisions about whether to trust the data.

### Guardrail 5: Human-in-the-Loop Options

For browser extensions and interactive agents, prompt users before proceeding with low-confidence actions.

```javascript
// Browser extension: prompt before acting on uncertain data
async function handleLowConfidenceData(data, confidence) {
  if (confidence < 70) {
    const userChoice = await showConfirmationDialog({
      title: 'Uncertain Data Detected',
      message: `I found pricing data but confidence is low (${confidence}%).

                Extracted: £${data.price}
                Concerns: ${data.warnings.join(', ')}

                How would you like to proceed?`,
      options: [
        'Verify manually first',
        'Proceed with caution',
        'Cancel this action'
      ]
    });

    if (userChoice === 'Cancel this action') {
      return null;
    }

    if (userChoice === 'Verify manually first') {
      openInNewTab(data.url);
      return null;
    }

    // User chose to proceed - log this decision
    logUserOverride(data, confidence, 'user-accepted-risk');
  }

  return data;
}
```

This pattern acknowledges that humans have domain knowledge agents lack. A travel agent might know that £203,000 for a luxury around-the-world cruise is plausible, even though it's 100x higher than typical river cruises. The agent shouldn't refuse - it should seek confirmation.

## Agent Architecture Considerations

Different agent types have different resource constraints. The level of validation sophistication should match the agent's capabilities and use case.

### Browser Extensions (Limited Resources)

Running in users' browsers with minimal computational overhead. Must be fast and lightweight.

**Minimum viable guardrails:**

- Range validation for common data types
- Structured data cross-reference (if JSON-LD present)
- Flag anomalies for user review
- No complex comparative analysis (requires external data)

**Implementation approach:**

```javascript
// Lightweight validator for browser extension
class LightweightValidator {
  validate(price, category) {
    // Simple range checks only
    const ranges = {
      'cruise': 15000,
      'hotel': 2000,
      'flight': 5000
    };

    const max = ranges[category] || 10000;

    if (price > max) {
      return {
        warning: `Price (£${price}) exceeds typical maximum (£${max})`,
        requiresVerification: true
      };
    }

    return { requiresVerification: false };
  }
}
```

Simple, fast, catches major errors like the £203,000 cruise. Won't catch subtle errors, but prevents catastrophic failures.

### CLI Agents (Local Execution)

More resources available, users accept longer processing times for better accuracy.

**Viable guardrails:**

- Full range validation
- Comparative analysis using cached market data
- Multi-source verification
- Confidence scoring
- Audit trails

**Implementation approach:**

Store market knowledge locally. Update weekly. Perform comprehensive validation before returning results to user.

### Server-Based Agents (API Access)

High resources, can maintain extensive market knowledge and query external validation services.

**Expected guardrails:**

- Comprehensive validation
- Real-time market data queries
- Multi-source verification with API fallbacks
- Detailed audit trails
- Confidence scoring with explanation
- Collaborative validation (agents sharing error reports)

**Implementation approach:**

```javascript
// Server-based validator with external services
class ComprehensiveValidator {
  async validate(data) {
    const results = await Promise.all([
      this.rangeValidation(data),
      this.comparativeAnalysis(data),
      this.structuredDataCheck(data),
      this.externalAPIVerification(data),
      this.historicalDataComparison(data)
    ]);

    return this.aggregateResults(results);
  }

  async externalAPIVerification(data) {
    // Query external pricing APIs for verification
    const response = await fetch(
      `https://pricing-api.example/verify?item=${data.id}`
    );
    return response.json();
  }
}
```

Server-based agents should have the most sophisticated validation because they have the resources and the responsibility. They're often used for business-critical tasks.

### The Naive Browser Extension Problem

A simple browser extension that just scrapes and reports has no validation layer. It will propagate errors like the £203,000 pricing mistake. This is a quality problem for the agent ecosystem.

When users encounter failures from poorly implemented agents, they lose trust in all agents. The damage extends beyond that single tool.

**This is why guardrails matter.** Every agent that operates without validation degrades trust in the entire category. Agent creators have a responsibility to implement minimum viable validation, even in constrained environments.

A browser extension might not be able to perform sophisticated comparative analysis, but it can check if a price exceeds £50,000 and prompt the user: "This seems unusually high. Please verify before proceeding."

That single check would have prevented the £203,000 error.

## Learning from Production Failures

The £203,000 error is valuable because it's real. Most pipeline failures happen silently - users never report them. This one was caught and analysed. Let me extract the lessons.

### Post-Mortem Analysis

**What the error revealed:**

- No range validation was present
- No comparative analysis was performed
- No cross-referencing against structured data
- Agent reported price with same confidence as verified data
- Human domain knowledge caught the error

**What should have caught it:**

Any single guardrail would have worked:

1. Range validation: "Price exceeds £15,000 maximum for river cruises"
2. Comparative analysis: "Price 100x higher than competitors"
3. Structured data check: "HTML price conflicts with JSON-LD"
4. Confidence scoring: "Low confidence due to magnitude anomaly"

The agent had none of these. That's why the error propagated.

### Other Common Pipeline Failures

The pricing error isn't unique. Similar patterns occur across domains:

**Date formatting errors:**

- US format (MM/DD/YYYY) vs UK format (DD/MM/YYYY)
- Agent books hotel for 3rd December instead of 12th March
- **Prevention:** Validate dates against ISO 8601, cross-reference multiple sources

**Currency confusion:**

- USD vs GBP vs EUR without explicit markers
- Agent reports $500 as £500 (25% error)
- **Prevention:** Require explicit currency symbols, check structured data

**Quantity vs unit price:**

- Extracting "£50 for pack of 10" as "£50 each"
- Agent reports 10x wrong price
- **Prevention:** Parse quantity indicators, verify against Schema.org `price` property

**Availability misinterpretation:**

- "Expected in stock March 2025" shown as "In stock"
- Agent attempts to order unavailable items
- **Prevention:** Parse temporal qualifiers, check Schema.org `availability` property

Each of these represents a category of pipeline failure. Each can be prevented with appropriate validation layers.

### Systematic Prevention

Pipeline failures should inform validation rules. The £203,000 error teaches us: always validate prices against market ranges. The date formatting error teaches us: never assume date format without explicit verification.

Build a feedback loop:

```text
Production failure → Post-mortem analysis → New validation rule → Deploy → Monitor
```

Over time, your validation layers become more sophisticated. You're encoding human domain knowledge as machine-checkable rules.

This is how agent quality improves. Not through better language models (though that helps), but through better pipelines that catch errors before they reach the reasoning engine.

## The Validation Roadmap

If you're building an agent, here's how to prioritise validation implementation.

### Priority 1: Critical Safety Checks

Implement these immediately. They prevent catastrophic failures.

**Range validation for financial data:**

- Prices, costs, fees, refunds
- Flag anything outside expected bounds
- Require verification for outliers

**Structured data cross-referencing:**

- Compare HTML extraction against JSON-LD
- Trust structured data when conflicts arise
- Flag pages without structured data as lower confidence

**Explicit confidence scoring:**

- Every extraction gets a confidence number
- Display confidence to users
- Use confidence thresholds for action gates

**Implementation scope:** Quick prototype for basic version

### Priority 2: Comparative Analysis

Add context-aware validation using market knowledge.

**Market range databases:**

- Build simple ranges for common categories
- Update quarterly based on actual data
- Use for outlier detection

**Multi-source verification:**

- Check HTML, JSON-LD, microdata, API
- Increase confidence when sources agree
- Flag conflicts prominently

**Audit trails:**

- Log all extractions with context
- Enable post-mortem debugging
- Track confidence over time

**Implementation scope:** Core feature for comprehensive version

### Priority 3: Advanced Features

Build sophisticated validation as resources allow.

**Real-time validation APIs:**

- Query external services for verification
- Use third-party pricing data
- Cross-reference availability

**Machine learning anomaly detection:**

- Train models on historical extractions
- Flag unusual patterns automatically
- Improve over time with feedback

**Collaborative validation:**

- Agents share error reports
- Build collective knowledge base
- Warn others about problematic sites

**Implementation scope:** Major infrastructure depending on scope

### Priority 4: Ecosystem Standards

Work towards industry-wide validation patterns.

**Shared validation services:**

- Community-maintained range databases
- Collaborative anomaly detection
- Standard confidence indicators

**Error reporting protocols:**

- Standardised format for sharing failures
- Industry-wide learning from mistakes
- Transparency about agent limitations

**Certification programmes:**

- Third-party validation testing
- Agent quality standards
- User trust signals

**Implementation scope:** Industry coordination required (extended timeline)

You don't need to implement everything at once. Priority 1 guardrails prevent the worst failures. Priority 2 improves reliability substantially. Priority 3 and 4 are aspirational - they represent where the ecosystem should move over time.

The key insight: start with basic validation immediately. Don't deploy agents without it. The £203,000 error occurred because the agent had no validation whatsoever. Even rudimentary range checking would have caught it.

## Conclusion

Chapters 9 and 10 showed website builders what to build. This chapter shows agent creators what to build. Both sides need to improve.

Websites need to provide clear, semantic HTML with explicit state and persistent feedback. Agents need to validate data extraction, score confidence, and refuse to act when certainty is low.

The £203,000 pricing error occurred because neither side had sufficient safeguards. The website showed ambiguous pricing information. The agent lacked validation layers. Both failures combined to produce the error that a human eventually caught.

**Fixing this requires work on both sides.**

Website owners: implement patterns from Chapters 9 and 10. Provide structured data. Make state explicit. Display persistent errors. Use semantic HTML.

Agent creators: implement the validation layers described in this chapter. Check ranges. Compare sources. Cross-reference structured data. Score confidence. Build audit trails.

**The convergence is clear.** Good websites provide structured, explicit, semantic content. Good agents validate that content before acting on it. Together, they create reliable agent-mediated experiences.

Neither side can fix the ecosystem alone. Websites that provide perfect structured data still fail if agents don't use it for validation. Agents with sophisticated validation still fail if websites hide information or show ephemeral errors.

**This is the complete picture this book provides.**

Ten chapters diagnosed what's broken and why it matters. Chapter 11 completes the solutions by showing what agent creators must build to create reliable, trustworthy systems that serve users well.

The technology is new. The failures are real. The solutions exist. Both sides need to implement them.

That's how we build a web that works for everyone - human and machine alike.
