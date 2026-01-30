# The Invisible Buyer: A Credit Card Provider Reads the Manual

*A follow-up perspective from a credit card issuer's risk and strategy teams*

> **Note:** This is a fictionalised perspective exploring how financial services might evolve their thinking after engaging with prevention-focused frameworks. The scenario is illustrative; the strategic shift from absorbing costs to enabling prevention represents a genuine opportunity for the payments industry.

Three weeks ago, we published our perspective on AI-mediated disputes. We described the laptop claim. We explained why Section 75 didn't apply. We absorbed the investigation costs and moved on.

Then someone sent us "MX: The Bible."

We've now read it. We've discussed it with our risk team, our merchant services team, and our product development team. We have thoughts.

Some of them are uncomfortable. We may have been looking at this problem from entirely the wrong angle.

## What We Got Wrong

Our previous analysis focused on liability. Who caused the hallucination? Who should pay? How do we protect ourselves from claims we didn't cause?

These are valid questions. But they're reactive. They assume hallucinations are inevitable and debate who cleans up afterwards.

MX proposes something different: prevent the hallucinations in the first place.

The framework is straightforward. If retailers provide structured, machine-readable product data with explicit declarations of what features products do *and do not* have, AI assistants can't hallucinate those features. The laptop that caused our dispute didn't have 5G. If the retailer's data had explicitly stated `wwan_5g: false`, the AI couldn't have invented 5G capability. There would have been no dispute. No claim. No cost for anyone.

We were arguing about who should pay for the bucket while ignoring the hole in the roof.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 180" width="520" height="180">
  <text x="260" y="20" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="11" font-weight="bold">Reactive vs Preventive Approach</text>
  
  <!-- Reactive side -->
  <text x="130" y="45" text-anchor="middle" fill="#dc2626" font-family="system-ui" font-size="10" font-weight="bold">Reactive (Our Previous View)</text>
  
  <rect x="30" y="55" width="200" height="100" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="1"/>
  
  <text x="130" y="75" text-anchor="middle" fill="#991b1b" font-family="system-ui" font-size="9">Hallucination occurs</text>
  <text x="130" y="90" text-anchor="middle" fill="#991b1b" font-family="system-ui" font-size="9">↓</text>
  <text x="130" y="105" text-anchor="middle" fill="#991b1b" font-family="system-ui" font-size="9">Consumer harmed</text>
  <text x="130" y="120" text-anchor="middle" fill="#991b1b" font-family="system-ui" font-size="9">↓</text>
  <text x="130" y="135" text-anchor="middle" fill="#991b1b" font-family="system-ui" font-size="9">Argue about liability</text>
  <text x="130" y="150" text-anchor="middle" fill="#991b1b" font-family="system-ui" font-size="9">↓</text>
  <text x="130" y="165" text-anchor="middle" fill="#7f1d1d" font-family="system-ui" font-size="8" font-style="italic">Someone absorbs cost</text>
  
  <!-- Arrow -->
  <path d="M 245 105 L 275 105" stroke="#4b5563" stroke-width="2" marker-end="url(#arrowmx)"/>
  <defs><marker id="arrowmx" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#4b5563"/></marker></defs>
  
  <!-- Preventive side -->
  <text x="390" y="45" text-anchor="middle" fill="#166534" font-family="system-ui" font-size="10" font-weight="bold">Preventive (MX Approach)</text>
  
  <rect x="290" y="55" width="200" height="100" rx="4" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/>
  
  <text x="390" y="75" text-anchor="middle" fill="#166534" font-family="system-ui" font-size="9">Structured data provided</text>
  <text x="390" y="90" text-anchor="middle" fill="#166534" font-family="system-ui" font-size="9">↓</text>
  <text x="390" y="105" text-anchor="middle" fill="#166534" font-family="system-ui" font-size="9">AI reads explicit specs</text>
  <text x="390" y="120" text-anchor="middle" fill="#166534" font-family="system-ui" font-size="9">↓</text>
  <text x="390" y="135" text-anchor="middle" fill="#166534" font-family="system-ui" font-size="9">Hallucination blocked</text>
  <text x="390" y="150" text-anchor="middle" fill="#166534" font-family="system-ui" font-size="9">↓</text>
  <text x="390" y="165" text-anchor="middle" fill="#14532d" font-family="system-ui" font-size="8" font-style="italic">No dispute to resolve</text>
</svg>
<figcaption>Figure 1: Two approaches to the same problem. We were focused on liability after the fact. MX focuses on preventing the error that creates the liability in the first place.</figcaption>
</figure>

## The Business Case We Missed

Our previous piece estimated £2-5 million annually in AI-related dispute costs across our portfolio. We framed this as an unavoidable cost to be minimised through strict liability interpretation.

MX reframes the question: what if merchants could eliminate most of these disputes by investing in better product data?

The economics are compelling:

**Merchant perspective:** A retailer processing 10,000 AI-influenced orders annually might see 100 hallucination-driven disputes (1% rate). At £50-150 per dispute in processing costs, chargebacks, and returns handling, that's £5,000-15,000 annually. MX Level 2 compliance – explicit negative declarations, structured specifications – costs perhaps £5,000 one-time plus modest ongoing maintenance. Payback in under a year.

**Our perspective:** If merchants reduce hallucination-driven disputes by 80%, our costs fall proportionally. We don't need to fight about liability if there's nothing to fight about.

**Consumer perspective:** They get accurate recommendations. Products match expectations. Returns decrease. Trust in AI-assisted shopping increases.

Everyone wins. Nobody needs to absorb costs that don't exist.

## What We're Now Considering

Our strategy team has been exploring options we wouldn't have considered before reading MX.

### Option 1: MX Compliance in Merchant Onboarding

When we onboard merchants for card acceptance, we assess risk factors: business type, chargeback history, financial stability. We price our services accordingly.

We could add MX compliance to that assessment. Merchants with structured product data and explicit negative declarations present lower dispute risk. Lower risk could mean:

- Reduced interchange fees
- Faster settlement terms
- Preferred placement in any shopping features we develop
- Lower reserves held against chargebacks

This creates financial incentive for MX adoption without requiring regulatory mandate.

### Option 2: Dispute Resolution Enhancement

Currently, when we investigate a "not as described" dispute, we request evidence from the merchant: product pages, specifications, order confirmations. This is manual, slow, and often inconclusive.

If merchants provided MX-compliant structured data, dispute resolution becomes faster:

1. Consumer claims product lacks Feature X
2. We query merchant's structured data feed
3. Feed shows `feature_x: false` with timestamp predating purchase
4. Claim declined automatically – merchant never claimed Feature X
5. Processing time: minutes, not days

This reduces our costs and provides merchants with stronger defence against spurious claims.

### Option 3: AI Shopping Partnership

Several AI providers are developing shopping assistants. They need accurate product data to avoid hallucinations. We have merchant relationships and data infrastructure.

There may be a partnership opportunity: we help merchants achieve MX compliance, aggregate their structured data feeds, and provide that data to AI assistants. The AI assistants reduce hallucinations. Disputes decrease. We take a margin on the data service.

This transforms us from passive dispute absorber to active data infrastructure provider. It's a different business model, but the capabilities align.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 200" width="520" height="200">
  <text x="260" y="20" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="11" font-weight="bold">Potential Role: Data Infrastructure Provider</text>
  
  <!-- Merchants -->
  <rect x="30" y="60" width="100" height="50" rx="4" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/>
  <text x="80" y="82" text-anchor="middle" fill="#4338ca" font-family="system-ui" font-size="9" font-weight="bold">Merchants</text>
  <text x="80" y="97" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="8">MX-compliant data</text>
  
  <!-- Arrow to us -->
  <path d="M 135 85 L 175 85" stroke="#6366f1" stroke-width="2" marker-end="url(#purparr)"/>
  <defs><marker id="purparr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#6366f1"/></marker></defs>
  
  <!-- Us in the middle -->
  <rect x="180" y="50" width="120" height="70" rx="4" fill="#7c3aed" stroke="#5b21b6" stroke-width="2"/>
  <text x="240" y="75" text-anchor="middle" fill="#fff" font-family="system-ui" font-size="9" font-weight="bold">Card Provider</text>
  <text x="240" y="92" text-anchor="middle" fill="#ddd6fe" font-family="system-ui" font-size="8">Aggregates &</text>
  <text x="240" y="105" text-anchor="middle" fill="#ddd6fe" font-family="system-ui" font-size="8">validates data</text>
  
  <!-- Arrow to AI -->
  <path d="M 305 85 L 345 85" stroke="#7c3aed" stroke-width="2" marker-end="url(#violarr)"/>
  <defs><marker id="violarr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#7c3aed"/></marker></defs>
  
  <!-- AI providers -->
  <rect x="350" y="60" width="100" height="50" rx="4" fill="#fae8ff" stroke="#c026d3" stroke-width="2"/>
  <text x="400" y="82" text-anchor="middle" fill="#a21caf" font-family="system-ui" font-size="9" font-weight="bold">AI Assistants</text>
  <text x="400" y="97" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="8">Accurate recs</text>
  
  <!-- Benefits flowing down -->
  <rect x="120" y="145" width="240" height="40" rx="4" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/>
  <text x="240" y="162" text-anchor="middle" fill="#166534" font-family="system-ui" font-size="9">Fewer disputes → Lower costs → Better margins</text>
  <text x="240" y="177" text-anchor="middle" fill="#166534" font-family="system-ui" font-size="8">New revenue stream from data services</text>
  
  <path d="M 240 120 L 240 140" stroke="#22c55e" stroke-width="1" marker-end="url(#greenarr2)"/>
  <defs><marker id="greenarr2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#22c55e"/></marker></defs>
</svg>
<figcaption>Figure 2: A potential new role. Instead of passively absorbing dispute costs, we could actively facilitate MX compliance and provide data infrastructure that reduces hallucinations across the ecosystem.</figcaption>
</figure>

### Option 4: Consumer Education

Our cardholders trust us for financial advice. We send them guidance on fraud prevention, spending management, credit building. We could add guidance on AI-assisted purchasing:

- How to verify AI recommendations before buying
- Why checking the retailer's own description matters
- How to use the 14-day cancellation right effectively
- What Section 75 does and doesn't cover

Better-informed consumers make fewer claims. Fewer claims mean lower costs. Consumer education is cheap and scales well.

## What We're Actually Doing

Theory is interesting. Action matters more. Here's what we've committed to:

**Immediate (Q1 2026):**
- Adding "AI-mediated" as a dispute category in our tracking systems
- Training dispute handlers to identify and flag AI-related claims
- Building baseline data on volumes, patterns, and outcomes

**Near-term (Q2-Q3 2026):**
- Piloting MX compliance assessment for new merchant onboarding in electronics category
- Developing automated dispute resolution for merchants with structured data feeds
- Engaging with AI shopping assistant providers about data partnership opportunities

**Medium-term (2026-2027):**
- Rolling out compliance-based pricing tiers if pilot shows measurable dispute reduction
- Launching consumer education campaign on AI-assisted purchasing
- Evaluating data infrastructure business model

We're not betting the company on this. We're running experiments, measuring results, and scaling what works.

## The Uncomfortable Realisation

Reading MX forced us to confront something uncomfortable: we were part of the problem.

Our previous stance – "Section 75 doesn't apply, not our problem" – was legally defensible but commercially shortsighted. By refusing to engage with AI-mediated disputes, we pushed cardholders toward the 14-day cancellation route. The retailer still got a return. The supply chain still bore costs. The AI provider still faced no consequences. Nothing improved.

We had market power to influence merchant behaviour. We chose not to use it. We could have encouraged structured data adoption years ago. We didn't. We waited until the disputes hit our desk and then complained about them.

MX makes clear that prevention is possible, affordable, and beneficial for everyone. We should have been advocating for this, not waiting for someone else to solve it.

## A Note to Other Financial Services

We're not the only ones affected. Banks processing direct debits. Payment processors handling refunds. Insurance providers covering delivery disputes. Consumer credit companies financing purchases.

All of us face exposure to AI-mediated commerce errors. All of us have been treating symptoms rather than causes.

MX offers a framework that works. Structured data. Explicit declarations. Machine-readable specifications. It's not complicated. It just requires someone to lead.

Financial services have leverage. We process the transactions. We underwrite the risk. We can make MX compliance economically attractive for merchants in ways that individual AI providers cannot.

If we coordinate – if we collectively recognise that preventing hallucinations serves our interests better than arguing about liability afterwards – we can accelerate adoption across the entire ecosystem.

We're starting conversations with counterparts at other institutions. If you're reading this and you're in a similar position, we should talk.

## Conclusion

Three weeks ago, we published a piece about why AI-mediated disputes weren't our problem.

We were wrong. Not about the law – Section 75 still doesn't cover AI hallucinations – but about the strategy. Focusing on liability is focusing on the wrong thing.

The right question isn't "who pays when AI gets it wrong?" The right question is "how do we stop AI getting it wrong?"

MX answers that question. Structured data. Explicit negatives. Machine-readable truth.

We're not going to wait for regulators to mandate it. We're not going to wait for AI providers to demand it. We're going to use our market position to encourage it, measure the results, and scale what works.

The invisible buyer is still invisible to retailers. But we see them in our transaction data, our dispute queues, our customer service logs. We have information others don't.

We're going to use it. Not to assign blame. To prevent harm.

That's a better business than processing refunds.

---

*This post represents a hypothetical follow-up perspective from a credit card issuer's strategy team after engaging with the Machine Experience framework. It is a thought exercise, not an official statement from any financial institution.*

*"MX: The Handbook" and "MX: The Bible" are available from 2nd April 2026.*
