# The Invisible Buyer: An MX Compliance Review

> **Note:** This case study is fictionalised, but the scenario is entirely plausible. AI assistants can and do hallucinate product features, particularly when product data lacks explicit negative declarations. The specific transaction is illustrative; the technical solution is real and implementable.

I've reviewed the case files. A consumer bought a laptop based on an AI recommendation. The AI stated the laptop had 5G connectivity. It didn't. The AI hallucinated the feature.

The retailer's product data was accurate. The AI fabricated information that didn't exist in any source. The consumer relied on the fabrication. A dispute followed.

From a Machine Experience compliance perspective, this was preventable. Not by the consumer. Not by the lawyer. By the retailer – through proper MX design.

## The Hallucination Problem

AI hallucination occurs when a model generates plausible-sounding information that has no basis in its training data or retrieved sources. In this case, the AI stated the laptop had 5G. It didn't. The retailer never claimed it did.

The common response: "That's the AI's problem, not ours."

This is legally defensible but commercially naive. The retailer accepted a return, absorbed costs, and damaged their relationship with AI routing systems – all because of a hallucination they believe they couldn't control.

They're wrong. They could have controlled it. Not by fixing the AI, but by making hallucination harder.

## What MX Compliance Would Have Required

Machine Experience design treats AI agents as users of your content. Like human users, machine users can be helped or hindered by how information is structured. Unlike human users, machine users have specific failure modes – including hallucination.

MX-compliant product data would have included:

### 1. Explicit Feature Declarations

The retailer's product page listed features the laptop *had*. It did not explicitly list features the laptop *lacked*.

For human users, this is normal. Humans understand that unlisted features are absent. But AI models work differently. They predict plausible completions. If a user asks about 5G and the product page doesn't mention 5G at all, the model may infer – incorrectly – that the information is simply missing rather than that the feature is absent.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 200" width="520" height="200">
  <text x="260" y="20" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="11" font-weight="bold">How Explicit Negatives Prevent Hallucination</text>
  
  <!-- Left side: Implicit (no 5G mentioned) -->
  <text x="130" y="45" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="10">Implicit Data (Common)</text>
  
  <rect x="30" y="55" width="200" height="70" rx="4" fill="#f7fafc" stroke="#a0aec0" stroke-width="1"/>
  <text x="40" y="75" fill="#4a5568" font-family="system-ui" font-size="9" font-family="monospace">connectivity:</text>
  <text x="50" y="90" fill="#4a5568" font-family="system-ui" font-size="9" font-family="monospace">wifi: "Wi-Fi 6E"</text>
  <text x="50" y="105" fill="#4a5568" font-family="system-ui" font-size="9" font-family="monospace">bluetooth: "5.3"</text>
  <text x="50" y="120" fill="#a0aec0" font-family="system-ui" font-size="9" font-style="italic">(5G not mentioned)</text>
  
  <!-- AI interpretation -->
  <path d="M 130 130 L 130 150" stroke="#a0aec0" stroke-width="1" marker-end="url(#greyarrow)"/>
  <defs>
    <marker id="greyarrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#a0aec0"/>
    </marker>
  </defs>
  
  <rect x="40" y="155" width="180" height="35" rx="4" fill="#fed7d7" stroke="#fc8181" stroke-width="2"/>
  <text x="130" y="172" text-anchor="middle" fill="#c53030" font-family="system-ui" font-size="9">AI may infer: "5G info missing"</text>
  <text x="130" y="185" text-anchor="middle" fill="#c53030" font-family="system-ui" font-size="9">→ Risk of hallucination</text>
  
  <!-- Right side: Explicit -->
  <text x="390" y="45" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="10">Explicit Data (MX-Compliant)</text>
  
  <rect x="290" y="55" width="200" height="70" rx="4" fill="#f0fff4" stroke="#48bb78" stroke-width="1"/>
  <text x="300" y="75" fill="#276749" font-family="system-ui" font-size="9" font-family="monospace">connectivity:</text>
  <text x="310" y="90" fill="#276749" font-family="system-ui" font-size="9" font-family="monospace">wifi: "Wi-Fi 6E"</text>
  <text x="310" y="105" fill="#276749" font-family="system-ui" font-size="9" font-family="monospace">bluetooth: "5.3"</text>
  <text x="310" y="120" fill="#276749" font-family="system-ui" font-size="9" font-weight="bold" font-family="monospace">wwan_5g: false</text>
  
  <!-- AI interpretation -->
  <path d="M 390 130 L 390 150" stroke="#48bb78" stroke-width="1" marker-end="url(#greenarrow2)"/>
  <defs>
    <marker id="greenarrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#48bb78"/>
    </marker>
  </defs>
  
  <rect x="300" y="155" width="180" height="35" rx="4" fill="#c6f6d5" stroke="#48bb78" stroke-width="2"/>
  <text x="390" y="172" text-anchor="middle" fill="#276749" font-family="system-ui" font-size="9">AI knows: "No 5G"</text>
  <text x="390" y="185" text-anchor="middle" fill="#276749" font-family="system-ui" font-size="9">→ Hallucination blocked</text>
</svg>
<figcaption>Figure 1: Implicit vs explicit data. When 5G is simply not mentioned, AI models may hallucinate its presence. When 5G is explicitly marked as absent (wwan_5g: false), hallucination requires contradicting stated facts – substantially harder.</figcaption>
</figure>

MX-compliant data includes explicit negatives:

```
connectivity:
  wifi: "Wi-Fi 6E (802.11ax)"
  bluetooth: "Bluetooth 5.3"
  ethernet: "RJ-45 Gigabit"
  wwan_5g: false
  wwan_5g_optional: true
  wwan_5g_optional_sku: "9M4J1AT#ABU"
```

The explicit `wwan_5g: false` makes hallucination harder. The model has clear information that 5G is not present. It's not inferring from absence; it's reading a definitive statement.

### 2. Structured Data for Machine Consumption

The retailer's product information was designed for humans. Prose descriptions. Marketing language. Feature lists formatted for visual scanning.

AI agents don't scan. They parse. Unstructured prose invites interpretation. Structured data constrains it.

MX-compliant product pages include machine-readable specifications:

```json
{
  "product_id": "9M4H6AT#ABU",
  "model": "Business Laptop Model X",
  "connectivity": {
    "cellular": {
      "included": false,
      "available_as_option": true,
      "option_sku": "9M4J1AT#ABU",
      "option_technology": "5G",
      "option_price_increment_gbp": 850
    }
  }
}
```

This isn't ambiguous. An AI parsing this data knows – with certainty – that cellular connectivity is not included in this SKU. Hallucination requires the model to contradict explicit structured data, which is substantially harder than filling gaps in prose.

### 3. Canonical Source Identification

When the AI researched laptops, it accessed multiple sources: the retailer's website, review sites, comparison engines, possibly cached data of unknown age.

If the retailer's own structured data had been marked as the canonical source – with clear versioning and timestamps – an AI could prioritise it over secondary sources. The hallucination might have originated from stale data elsewhere; canonical source marking would have provided a correction mechanism.

MX-compliant data includes provenance:

```json
{
  "source": "manufacturer_direct",
  "canonical": true,
  "last_verified": "2026-01-15T09:30:00Z",
  "supersedes": ["retailer_feed_v2", "comparison_api_v1"]
}
```

### 4. Contradiction Flags

The laptop in question had a variant with 5G. Same model name, different SKU. This is a hallucination risk – the model might conflate variants.

MX-compliant data explicitly flags potential confusion:

```json
{
  "disambiguation": {
    "commonly_confused_with": "9M4J1AT#ABU",
    "key_differences": [
      {
        "feature": "5G WWAN",
        "this_sku": false,
        "confused_sku": true
      }
    ],
    "warning": "Multiple variants exist. Verify SKU before confirming connectivity features."
  }
}
```

This doesn't just help AI agents. It helps human support staff, comparison engines, and anyone else who might conflate the variants.

## The Cost of Non-Compliance

The retailer in this case absorbed:

- Return shipping and processing: ~£40-60
- Restocking and potential refurbishment: £20-50
- Staff time on dispute: £50-100
- Damage to AI routing reputation: unquantified but real

Call it £150-200 for this single transaction.

Now multiply by the hallucination rate. If AI agents are researching thousands of products and hallucinating features on 1-2% of recommendations, the costs scale quickly. For a retailer processing 10,000 AI-mediated orders monthly, even a 1% hallucination-driven return rate represents £15,000-20,000 in monthly losses.

MX compliance isn't a theoretical nicety. It's cost control.

## The Compliance Framework

Based on this case and others like it, I propose the following MX compliance requirements for product data:

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="500" height="220">
  <text x="250" y="20" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="11" font-weight="bold">MX Compliance Levels: Effort vs Hallucination Resistance</text>
  
  <!-- Axis labels -->
  <text x="30" y="120" text-anchor="middle" fill="#718096" font-family="system-ui" font-size="9" transform="rotate(-90, 30, 120)">Hallucination Resistance</text>
  <text x="270" y="210" text-anchor="middle" fill="#718096" font-family="system-ui" font-size="9">Implementation Effort</text>
  
  <!-- Axes -->
  <line x1="60" y1="185" x2="480" y2="185" stroke="#cbd5e0" stroke-width="1"/>
  <line x1="60" y1="185" x2="60" y2="40" stroke="#cbd5e0" stroke-width="1"/>
  
  <!-- Level 1 -->
  <circle cx="120" cy="155" r="25" fill="#bee3f8" stroke="#3182ce" stroke-width="2"/>
  <text x="120" y="152" text-anchor="middle" fill="#2c5282" font-family="system-ui" font-size="10" font-weight="bold">L1</text>
  <text x="120" y="165" text-anchor="middle" fill="#2c5282" font-family="system-ui" font-size="7">Basic</text>
  
  <!-- Level 2 -->
  <circle cx="220" cy="110" r="30" fill="#c6f6d5" stroke="#48bb78" stroke-width="2"/>
  <text x="220" y="107" text-anchor="middle" fill="#276749" font-family="system-ui" font-size="10" font-weight="bold">L2</text>
  <text x="220" y="120" text-anchor="middle" fill="#276749" font-family="system-ui" font-size="7">Resistant</text>
  
  <!-- Level 3 -->
  <circle cx="340" cy="75" r="32" fill="#faf089" stroke="#d69e2e" stroke-width="2"/>
  <text x="340" y="72" text-anchor="middle" fill="#975a16" font-family="system-ui" font-size="10" font-weight="bold">L3</text>
  <text x="340" y="85" text-anchor="middle" fill="#975a16" font-family="system-ui" font-size="7">Optimised</text>
  
  <!-- Level 4 -->
  <circle cx="440" cy="55" r="28" fill="#e9d8fd" stroke="#805ad5" stroke-width="2"/>
  <text x="440" y="52" text-anchor="middle" fill="#553c9a" font-family="system-ui" font-size="10" font-weight="bold">L4</text>
  <text x="440" y="65" text-anchor="middle" fill="#553c9a" font-family="system-ui" font-size="7">Full</text>
  
  <!-- Break-even line -->
  <line x1="180" y1="40" x2="180" y2="185" stroke="#e53e3e" stroke-width="1" stroke-dasharray="4"/>
  <text x="180" y="195" text-anchor="middle" fill="#c53030" font-family="system-ui" font-size="8">Break-even</text>
  <text x="175" y="35" text-anchor="end" fill="#c53030" font-family="system-ui" font-size="7">← Most retailers stop here</text>
  
  <!-- Annotations -->
  <text x="120" y="185" text-anchor="middle" fill="#718096" font-family="system-ui" font-size="7">1-2 days</text>
  <text x="220" y="145" text-anchor="middle" fill="#718096" font-family="system-ui" font-size="7">2-4 weeks</text>
  <text x="340" y="115" text-anchor="middle" fill="#718096" font-family="system-ui" font-size="7">2-4 weeks dev</text>
  <text x="440" y="90" text-anchor="middle" fill="#718096" font-family="system-ui" font-size="7">Ongoing</text>
</svg>
<figcaption>Figure 2: The four compliance levels. Level 2 (Hallucination Resistant) offers the best return on investment for most retailers – 2-4 weeks of effort for substantial reduction in AI-driven returns. Most retailers currently operate below Level 1.</figcaption>
</figure>

### Level 1: Basic Machine Readability

- Structured data (JSON-LD, schema.org markup) for all product specifications
- Explicit boolean flags for presence/absence of key features
- Version timestamps on all product data

### Level 2: Hallucination Resistance

- Explicit negative declarations for commonly-expected features not present
- Disambiguation flags for product variants
- Canonical source marking with provenance metadata

### Level 3: AI Agent Optimisation

- API endpoints returning structured product data
- Real-time inventory and pricing feeds
- Contradiction detection for cross-source verification
- Feedback mechanisms for AI agents to report data discrepancies

### Level 4: Full MX Compliance

- Human-readable and machine-readable content parity
- Automated testing of AI interpretation accuracy
- Monitoring of AI-mediated purchase outcomes
- Continuous improvement based on hallucination incident analysis

## Who Bears the Burden?

The lawyer's post asked who should be liable for AI hallucinations. From an MX compliance perspective, the question is different: who can most efficiently prevent them?

**AI providers** can improve model accuracy, but they're processing millions of products across thousands of retailers. They can't manually verify every claim.

**Consumers** can verify recommendations, but this defeats the purpose of AI assistance. Telling users to check everything themselves is an admission that the system doesn't work.

**Retailers** can structure their data to resist hallucination. They control their product information. They have commercial incentive to reduce returns. They can implement MX compliance unilaterally, without waiting for AI providers to improve.

The burden should fall where it can be most effectively discharged. That's the retailer.

This isn't blame. The retailer in this case did nothing legally wrong. But they could have done something that would have prevented the problem entirely. MX compliance is that something.

## The Audit

If I were auditing the retailer's product data for MX compliance, I would check:

1. **Is connectivity explicitly specified?** Not just listed features, but explicit confirmation of what's included and what isn't.

2. **Are product variants clearly distinguished?** Where multiple SKUs exist for the same model, are the differences machine-readable?

3. **Is there structured data?** Can an AI parse the specification without interpreting prose?

4. **Are there explicit negatives?** For features consumers commonly expect (5G, Thunderbolt, touchscreen), is absence explicitly stated?

5. **Is there canonical source marking?** Can an AI identify this data as authoritative versus secondary sources?

6. **Is there version control?** Can an AI verify it has current data?

The retailer in this case would have failed on points 1, 4, 5, and 6. Their data was accurate but not MX-compliant. The hallucination exploited gaps that proper MX design would have closed.

## Implementation Cost

Retailers often resist new compliance requirements on cost grounds. What does MX compliance actually require?

**Level 1** (Basic Machine Readability): For most retailers, this means adding JSON-LD structured data to existing product pages. Many e-commerce platforms support this natively. Implementation: 1-2 days of developer time per product category, plus template updates. Ongoing: minimal, as it becomes part of the product data workflow.

**Level 2** (Hallucination Resistance): This requires a product data review to identify commonly-expected features and add explicit negatives. Implementation: 2-4 weeks for a product catalogue of 1,000+ items. Ongoing: incorporated into new product onboarding.

**Level 3** (AI Agent Optimisation): API development for structured data access. Implementation: 2-4 weeks of development, depending on existing infrastructure. Ongoing: API maintenance and monitoring.

**Level 4** (Full Compliance): Automated testing, monitoring, and continuous improvement. Implementation: ongoing operational investment. Ongoing: 0.5-1 FTE depending on catalogue size.

For a retailer absorbing £15,000-20,000 monthly in hallucination-driven returns, Level 2 compliance pays for itself within the first month.

## The Broader Implication

This case involved a laptop. The principles apply everywhere.

- A consumer asks an AI for a hotel with airport shuttle. The AI hallucinates shuttle service. The consumer arrives and pays £60 for a taxi.
- A consumer asks an AI for a medication without a specific allergen. The AI hallucinates safety. The consumer has a reaction.
- A consumer asks an AI for a financial product with certain terms. The AI hallucinates favourable conditions. The consumer signs a contract they didn't understand.

In each case, the provider's data might be accurate. The AI might hallucinate regardless. The consumer might suffer harm.

MX compliance doesn't eliminate hallucination. But it makes hallucination harder, less frequent, and easier to detect. It shifts the baseline from "AI might say anything" to "AI has explicit data to contradict."

That shift matters.

## Conclusion

The laptop dispute resolved commercially. The consumer got a refund. The retailer absorbed a loss. Nobody established precedent.

But the underlying pattern will recur. AI agents are mediating more purchases. Hallucinations will cause more disputes. The costs will accumulate.

Retailers can wait for AI providers to solve the problem. They can wait for regulators to assign liability. They can wait for courts to establish precedent.

Or they can implement MX compliance now, reduce hallucination-driven returns, and gain competitive advantage with the AI agents routing purchasing decisions.

The retailer who does this first wins twice: lower costs today, better AI relationships tomorrow.

The laptop cost £746. The return cost perhaps £200. MX compliance for the entire product category might cost £5,000.

The arithmetic is straightforward.

---

*This post examines a consumer dispute from a Machine Experience compliance perspective – the discipline of designing digital content for AI intermediaries as well as human users.*

*To understand MX compliance in depth, read Tom Brennan's books "MX: The Handbook" and "MX: The Bible" – available from 2nd April 2026.*
