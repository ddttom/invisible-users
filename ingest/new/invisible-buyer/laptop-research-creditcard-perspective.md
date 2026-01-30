# The Invisible Buyer: When the Chargeback Lands on Our Desk

*A perspective from a credit card provider's disputes team*

> **Note:** This is a fictionalised perspective exploring how financial services might handle AI-mediated commerce disputes. The scenario – AI hallucinating product features and consumers seeking Section 75 redress – is entirely plausible. The legal analysis reflects genuine uncertainty in current frameworks.

We received the claim last Tuesday. A consumer purchased a laptop for £746 using their credit card. The laptop arrived. It didn't have 5G connectivity. The consumer believed it should have 5G because their AI assistant told them it did.

They want their money back under Section 75.

We've seen thousands of Section 75 claims. Goods not as described. Services not provided. Trader went bust. The framework is clear, the process is established, the outcomes are predictable.

This one is different. And we suspect it's the first of many.

## The Section 75 Framework

For those unfamiliar: Section 75 of the Consumer Credit Act 1974 makes credit card providers jointly liable with traders for misrepresentation or breach of contract on purchases between £100 and £30,000.

If you buy something with a credit card and it's not as described, you can claim against us as well as (or instead of) the trader. We pay you. We then pursue the trader for recovery.

It's a powerful consumer protection. It's one reason people use credit cards for significant purchases. It works.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 200" width="520" height="200">
  <text x="260" y="20" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="11" font-weight="bold">Traditional Section 75 Claim Flow</text>
  
  <!-- Consumer -->
  <rect x="30" y="60" width="80" height="45" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="70" y="80" text-anchor="middle" fill="#1e40af" font-family="system-ui" font-size="9" font-weight="bold">Consumer</text>
  <text x="70" y="95" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="8">Claims refund</text>
  
  <!-- Arrow to card provider -->
  <path d="M 115 82 L 155 82" stroke="#3b82f6" stroke-width="2" marker-end="url(#bluearrow2)"/>
  <defs><marker id="bluearrow2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3b82f6"/></marker></defs>
  
  <!-- Card provider -->
  <rect x="160" y="50" width="100" height="65" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="210" y="72" text-anchor="middle" fill="#b45309" font-family="system-ui" font-size="9" font-weight="bold">Card Provider</text>
  <text x="210" y="87" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="8">Assesses claim</text>
  <text x="210" y="100" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="8">Pays consumer</text>
  
  <!-- Arrow to trader -->
  <path d="M 265 82 L 305 82" stroke="#f59e0b" stroke-width="2" marker-end="url(#orangearrow)"/>
  <defs><marker id="orangearrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#f59e0b"/></marker></defs>
  
  <!-- Trader -->
  <rect x="310" y="60" width="80" height="45" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
  <text x="350" y="80" text-anchor="middle" fill="#dc2626" font-family="system-ui" font-size="9" font-weight="bold">Trader</text>
  <text x="350" y="95" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="8">Made error</text>
  
  <!-- Recovery arrow -->
  <path d="M 350 110 L 350 140 L 210 140 L 210 120" stroke="#22c55e" stroke-width="2" marker-end="url(#greenarrow3)"/>
  <defs><marker id="greenarrow3" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto-start-reverse"><polygon points="0 0, 8 3, 0 6" fill="#22c55e"/></marker></defs>
  <text x="280" y="155" text-anchor="middle" fill="#22c55e" font-family="system-ui" font-size="8">Recovery from trader</text>
  
  <!-- Outcome -->
  <rect x="420" y="60" width="80" height="45" rx="4" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
  <text x="460" y="80" text-anchor="middle" fill="#166534" font-family="system-ui" font-size="9" font-weight="bold">Outcome</text>
  <text x="460" y="95" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="8">Trader bears cost</text>
</svg>
<figcaption>Figure 1: Traditional Section 75 flow. Consumer claims from card provider. Card provider pays. Card provider recovers from trader who made the error. The party at fault bears the cost.</figcaption>
</figure>

## The Problem With This Claim

The laptop claim breaks our process.

**The consumer's position:** "I was told the laptop had 5G. It doesn't. The goods are not as described. I want a refund under Section 75."

**The trader's position:** "Our product listing was accurate. We never claimed this model had 5G. The consumer's AI assistant made an error. We did nothing wrong."

**Our position:** We're caught in the middle of a dispute where the consumer has a legitimate grievance but the trader isn't at fault.

Section 75 requires misrepresentation or breach of contract *by the trader*. If the trader's description was accurate, there's no misrepresentation by the trader. The misrepresentation was by the AI assistant – which isn't a party to the transaction and isn't covered by Section 75.

Strictly interpreted, this claim should fail. The trader described the goods accurately. The goods matched the trader's description. There's no breach.

But we also have a consumer who relied on information they reasonably believed to be accurate, purchased a product that doesn't meet their needs, and is now out £746.

## How We're Handling It

We could decline the claim. The legal basis is defensible. The trader didn't misrepresent. Section 75 doesn't apply to AI hallucinations.

We're not going to do that.

Here's why: the consumer used their credit card partly *because* of Section 75 protection. They trusted that if something went wrong, they'd have recourse. Telling them "sorry, the AI hallucinated, not our problem" may be legally correct but it's commercially destructive.

We're going to pay the claim. £746 plus our processing costs. We'll absorb it.

We're not going to pursue the trader. They did nothing wrong. Pursuing them would damage our merchant relationship and likely fail anyway.

We're going to flag this internally as an "AI-mediated dispute" – a new category we've just created. We're going to track how many of these we see. We're going to analyse the patterns.

And we're going to start thinking very carefully about what happens when this scales.

## The Numbers That Worry Us

One claim for £746? Absorbable. Cost of doing business. Customer retention investment.

But consider the trajectory.

AI-assisted shopping is growing. Estimates suggest 8-12% of considered purchases in electronics now involve AI research. As AI assistants improve and trust increases, that percentage will grow.

If hallucination rates are 1-2% of AI recommendations – and that may be optimistic for complex product categories – and if even half of those hallucinations result in purchases that disappoint, we're looking at a meaningful volume of disputes.

Let's model it conservatively:

- UK credit card spending on electronics: approximately £15 billion annually
- AI-mediated purchases: 10% = £1.5 billion
- Hallucination-affected purchases: 1% = £15 million
- Disputes filed: 30% of affected = £4.5 million in disputed transactions
- Section 75 claims to card providers: perhaps £2-3 million annually

That's not catastrophic. But it's growing. And it's cost we can't recover from anyone.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="500" height="220">
  <text x="250" y="20" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="11" font-weight="bold">AI-Mediated Section 75 Claims: The Recovery Problem</text>
  
  <!-- Consumer -->
  <rect x="30" y="70" width="80" height="45" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="70" y="90" text-anchor="middle" fill="#1e40af" font-family="system-ui" font-size="9" font-weight="bold">Consumer</text>
  <text x="70" y="105" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="8">Claims refund</text>
  
  <!-- Arrow to card provider -->
  <path d="M 115 92 L 155 92" stroke="#3b82f6" stroke-width="2" marker-end="url(#bluearrow3)"/>
  <defs><marker id="bluearrow3" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3b82f6"/></marker></defs>
  
  <!-- Card provider -->
  <rect x="160" y="60" width="100" height="65" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="210" y="82" text-anchor="middle" fill="#b45309" font-family="system-ui" font-size="9" font-weight="bold">Card Provider</text>
  <text x="210" y="97" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="8">Pays consumer</text>
  <text x="210" y="110" text-anchor="middle" fill="#dc2626" font-family="system-ui" font-size="8">Cannot recover</text>
  
  <!-- Trader - crossed out recovery -->
  <rect x="310" y="40" width="80" height="45" rx="4" fill="#f3f4f6" stroke="#9ca3af" stroke-width="1" stroke-dasharray="4"/>
  <text x="350" y="60" text-anchor="middle" fill="#6b7280" font-family="system-ui" font-size="9">Trader</text>
  <text x="350" y="75" text-anchor="middle" fill="#6b7280" font-family="system-ui" font-size="8">(not at fault)</text>
  <line x1="265" y1="75" x2="305" y2="62" stroke="#9ca3af" stroke-width="1" stroke-dasharray="4"/>
  <text x="285" y="55" text-anchor="middle" fill="#dc2626" font-family="system-ui" font-size="10">✗</text>
  
  <!-- AI - crossed out recovery -->
  <rect x="310" y="100" width="80" height="45" rx="4" fill="#f3f4f6" stroke="#9ca3af" stroke-width="1" stroke-dasharray="4"/>
  <text x="350" y="120" text-anchor="middle" fill="#6b7280" font-family="system-ui" font-size="9">AI Provider</text>
  <text x="350" y="135" text-anchor="middle" fill="#6b7280" font-family="system-ui" font-size="8">(no liability)</text>
  <line x1="265" y1="105" x2="305" y2="118" stroke="#9ca3af" stroke-width="1" stroke-dasharray="4"/>
  <text x="285" y="125" text-anchor="middle" fill="#dc2626" font-family="system-ui" font-size="10">✗</text>
  
  <!-- Cost absorbed -->
  <rect x="160" y="150" width="100" height="50" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
  <text x="210" y="170" text-anchor="middle" fill="#dc2626" font-family="system-ui" font-size="9" font-weight="bold">Cost absorbed</text>
  <text x="210" y="185" text-anchor="middle" fill="#dc2626" font-family="system-ui" font-size="8">by card provider</text>
  
  <path d="M 210 125 L 210 145" stroke="#ef4444" stroke-width="2" marker-end="url(#redarrow2)"/>
  <defs><marker id="redarrow2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#ef4444"/></marker></defs>
  
  <!-- Question -->
  <rect x="320" y="165" width="160" height="40" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
  <text x="400" y="182" text-anchor="middle" fill="#92400e" font-family="system-ui" font-size="8">Who should bear this cost?</text>
  <text x="400" y="195" text-anchor="middle" fill="#92400e" font-family="system-ui" font-size="8">The framework has no answer.</text>
</svg>
<figcaption>Figure 2: The recovery gap. In AI-mediated disputes, the card provider pays the consumer but cannot recover from either the trader (not at fault) or the AI provider (no legal liability). The cost sits with the card provider – an outcome the framework never anticipated.</figcaption>
</figure>

## What We're Seeing Across the Industry

We've spoken with counterparts at other card providers. This isn't isolated.

Common patterns emerging:

**Specification disputes:** Consumer believes product has feature X based on AI recommendation. Product doesn't have feature X. AI misinterpreted or hallucinated. These are the cleanest cases – the trader's listing is accurate, the AI was wrong.

**Comparison failures:** AI recommends Product A over Product B based on criteria. Consumer buys Product A. Product B would have been better for their needs. Consumer wants to return Product A. Technically this isn't a Section 75 matter – the product is as described – but consumers frame it as "I was misled."

**Price disputes:** AI states product is available at price X. Consumer clicks through, sees price Y (higher), but completes purchase assuming error will be corrected. It isn't. Consumer claims they were promised price X. Trader has no record of price X ever being offered.

**Compatibility claims:** AI states Product A is compatible with Consumer's existing Product B. It isn't. Consumer claims misrepresentation. Trader's listing made no compatibility claims – the AI inferred compatibility incorrectly.

In almost all cases, the trader's own materials are accurate. The AI introduced the error. And in almost all cases, we have no viable recovery path.

## The Fraud Concern

We have another worry: fraud.

Section 75 claims require us to take the consumer's word for what they were told by their AI assistant. We can't verify it. The AI conversation isn't recorded by us. The AI provider won't (or can't) provide transcripts. The consumer could fabricate the AI's statements.

We're not suggesting consumers are routinely lying. Most claims are genuine. But the structure is vulnerable.

Consider: a consumer buys a laptop. It works fine but they have buyer's remorse. They claim their AI told them it had a feature it doesn't have. We can't verify. We either pay or fight.

If we pay every claim: we're exposed to abuse.
If we decline claims we can't verify: we alienate legitimate customers.
If we require evidence of the AI conversation: we create friction and consumers don't record their AI chats.

This is a difficult position. And it will get more difficult as bad actors realise the vulnerability.

## What We Need

We're not asking for regulatory intervention – yet. But we are asking for the ecosystem to recognise the problem.

**From AI providers:** Record recommendations. Make transcripts available (with consumer consent) for dispute resolution. Take some responsibility for the costs your hallucinations create. If your AI tells someone a product has 5G and it doesn't, that error has consequences – consequences you currently externalise to others.

**From traders:** Maintain clear, timestamped records of your product information. When we investigate a claim, we need to establish what you actually said versus what the AI claimed you said. Make this easy.

**From consumers:** Understand that your AI assistant is not infallible. For significant purchases, verify critical features on the trader's own website. Your Section 75 rights protect you, but they're not designed to insure against AI errors.

**From regulators:** Consider whether Section 75 needs updating for the AI age. The current framework assumes misrepresentation by the trader. A new framework might need to address misrepresentation by AI intermediaries – potentially creating direct liability for AI providers when their recommendations cause consumer harm.

## Our Position

We're going to continue paying legitimate claims, even when the strict legal basis is uncertain. Consumer trust in credit card protection matters more than the cost of individual disputes.

But we're going to track these claims carefully. We're going to build data on patterns, costs, and recovery rates. We're going to share that data with regulators when they ask.

If AI-mediated dispute costs grow to the point where they materially affect our economics, we'll have to respond. That response might include:

- Higher interchange fees to cover dispute costs
- Revised Section 75 claim criteria explicitly addressing AI-mediated purchases
- Industry advocacy for AI provider liability
- Exclusions for purchases where AI intermediation is evident

None of these are good outcomes. They either raise costs for consumers and merchants, or reduce consumer protection. We'd prefer the ecosystem fix itself.

## The Laptop

The consumer gets their £746 back. The laptop goes back to the trader. The trader didn't do anything wrong but deals with a return they didn't cause. We absorb the claim cost. The AI provider continues operating, unaware that their hallucination created real costs for real parties.

This isn't sustainable. Something has to change.

For now, we'll keep paying. But we're watching the numbers. And when they get big enough, this quiet problem will become a loud one.

---

*This post represents a hypothetical perspective from a credit card provider's disputes team. It is a thought exercise exploring how financial services might view AI-mediated commerce disputes – not an official statement from any financial institution.*

*For a comprehensive framework on designing content that reduces AI hallucination risk, see Tom Brennan's books "MX: The Handbook" and "MX: The Bible" – available from 2nd April 2026.*
