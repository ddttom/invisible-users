# The Invisible Buyer: When the Specification Was Wrong

*A perspective from a commercial solicitor*

> **Note:** This is a fictionalised case study, but the legal issues are real and unresolved. AI assistants can and do hallucinate product features. When consumers rely on those hallucinations, the resulting disputes expose gaps in current liability frameworks. The specific facts are illustrative; the legal uncertainty is genuine.

I've just closed a file that shouldn't have been difficult. Consumer buys laptop. Laptop doesn't match description. Consumer wants refund. Under normal circumstances, this resolves in a letter or two.

These were not normal circumstances.

The consumer didn't find the product by browsing. They didn't read the retailer's product page. They didn't see the specification sheet. They asked an AI assistant to find them a laptop with specific features, approved the recommendation, and completed the purchase.

When the laptop arrived without a feature the consumer believed they'd been promised, nobody could agree on who had promised what – or who was liable for the discrepancy.

## The Facts

My client purchased a business laptop for £746 from an online retailer. Their requirement, as expressed to their AI assistant, was a machine with "5G connectivity" among other specifications.

The AI assistant researched options, identified a suitable model, confirmed it met the requirements, and provided a link to purchase. My client clicked through and bought the laptop.

The laptop arrived. It did not have 5G. The product page had never claimed it did. The specification was clear: Wi-Fi 6E, optional 5G module available at additional cost on different SKU.

The AI had hallucinated the 5G capability.

Not misinterpreted. Not inferred from ambiguous language. The AI had stated, with apparent confidence, that this specific model included 5G connectivity. It didn't. The product data was accurate. The AI simply invented a feature that wasn't there.

My client contacted the retailer seeking a refund under the Consumer Rights Act 2015, arguing the goods were not as described.

The retailer refused. Their position: the product page clearly stated the specification. The laptop delivered matched the product page exactly. The AI had hallucinated – any misunderstanding was between the consumer and their AI assistant, not the retailer's responsibility.

## The Legal Framework

On paper, this should be straightforward.

**Consumer Rights Act 2015, Section 11:** Goods must match their description. If a consumer purchases goods based on a description given by the trader, the goods must conform to that description.

**Consumer Rights Act 2015, Section 19:** If goods do not conform to the contract, the consumer has the right to reject them within 30 days for a full refund.

**Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013:** For distance sales, consumers have 14 days to cancel for any reason, and a further 14 days to return goods after cancellation.

The question that complicates everything: what was the "description given by the trader"?

## The Description Problem

The retailer's product page was accurate. It listed the laptop's specifications correctly. It did not claim the base model had 5G. It never mentioned 5G capability for this SKU at all.

My client never read the product page.

My client read a summary provided by an AI assistant. That summary stated the laptop "met the requirement for 5G connectivity." The AI had not misinterpreted ambiguous data – it had fabricated information that did not exist in any source it could have accessed.

This is what the AI industry calls "hallucination." The AI generated plausible-sounding but false information with no basis in the underlying data. It presented this fabrication with the same confidence as verified facts.

So who gave the description?

If the description came from the retailer's product data – which contained no 5G claim – then the retailer made no misrepresentation whatsoever. The AI invented the claim independently.

If the description came from the AI assistant – which fabricated the 5G feature – then the AI made the misrepresentation, and my client's remedy lies against... whom exactly?

The retailer had done nothing wrong. Their data was accurate. The AI had hallucinated. But the AI isn't a legal person. It can't be sued. It can't pay damages.

## The Agency Question

Is the AI assistant an agent of the consumer?

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 180" width="500" height="180">
  <text x="250" y="20" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="11" font-weight="bold">The Liability Gap: Who Made the Misrepresentation?</text>
  
  <!-- Retailer -->
  <rect x="30" y="50" width="100" height="50" rx="4" fill="#c6f6d5" stroke="#48bb78" stroke-width="2"/>
  <text x="80" y="72" text-anchor="middle" fill="#276749" font-family="system-ui" font-size="10">Retailer</text>
  <text x="80" y="88" text-anchor="middle" fill="#276749" font-family="system-ui" font-size="8">(accurate data)</text>
  
  <!-- Arrow with checkmark -->
  <path d="M 135 75 L 175 75" stroke="#48bb78" stroke-width="2" marker-end="url(#greenarrow)"/>
  <text x="155" y="65" text-anchor="middle" fill="#48bb78" font-family="system-ui" font-size="10">✓</text>
  <defs>
    <marker id="greenarrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#48bb78"/>
    </marker>
  </defs>
  
  <!-- AI -->
  <rect x="180" y="50" width="100" height="50" rx="4" fill="#fed7d7" stroke="#fc8181" stroke-width="2"/>
  <text x="230" y="72" text-anchor="middle" fill="#c53030" font-family="system-ui" font-size="10">AI Assistant</text>
  <text x="230" y="88" text-anchor="middle" fill="#c53030" font-family="system-ui" font-size="8">(hallucinated 5G)</text>
  
  <!-- Arrow with X -->
  <path d="M 285 75 L 325 75" stroke="#fc8181" stroke-width="2" marker-end="url(#redarrow)"/>
  <text x="305" y="65" text-anchor="middle" fill="#c53030" font-family="system-ui" font-size="10">✗</text>
  <defs>
    <marker id="redarrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#fc8181"/>
    </marker>
  </defs>
  
  <!-- Consumer -->
  <rect x="330" y="50" width="100" height="50" rx="4" fill="#feebc8" stroke="#ed8936" stroke-width="2"/>
  <text x="380" y="72" text-anchor="middle" fill="#c05621" font-family="system-ui" font-size="10">Consumer</text>
  <text x="380" y="88" text-anchor="middle" fill="#c05621" font-family="system-ui" font-size="8">(relied on AI)</text>
  
  <!-- The gap -->
  <rect x="150" y="115" width="200" height="50" rx="4" fill="#fff5f5" stroke="#c53030" stroke-width="1" stroke-dasharray="4"/>
  <text x="250" y="135" text-anchor="middle" fill="#c53030" font-family="system-ui" font-size="10">THE LIABILITY GAP</text>
  <text x="250" y="152" text-anchor="middle" fill="#c53030" font-family="system-ui" font-size="8">AI is not a legal person. Cannot be sued. Cannot pay damages.</text>
  
  <!-- Question marks -->
  <text x="80" y="140" text-anchor="middle" fill="#48bb78" font-family="system-ui" font-size="14">?</text>
  <text x="380" y="140" text-anchor="middle" fill="#ed8936" font-family="system-ui" font-size="14">?</text>
</svg>
<figcaption>Figure 1: The liability chain is broken. The retailer's data was accurate. The AI hallucinated. The consumer was harmed. But the AI cannot be held liable, leaving no clear path to remedy.</figcaption>
</figure>

If yes, then the AI's understanding is imputed to the consumer. The consumer, through their agent, had access to the accurate specification. The consumer, through their agent, misunderstood it. The retailer bears no liability.

If no, then the AI is a third party – an intermediary that both consumer and retailer relied upon. The consumer has a potential claim against the AI provider. The retailer might also have a claim if the AI's misrepresentation caused them loss.

UK law has no clear answer. AI assistants don't fit neatly into existing agency categories. They're not employees. They're not traditional agents with authority to bind. They're not mere tools like a calculator or search engine – they exercise something resembling judgment.

My client didn't instruct the AI to purchase a laptop without 5G. They instructed it to find one with 5G. The AI failed. But the AI isn't a legal person. It can't be sued. It can't pay damages.

## The Retailer's Position

The retailer's argument had force. They published accurate information. They fulfilled the order correctly. They delivered exactly what their product page described.

They argued my client had a duty to verify the AI's recommendation before purchasing. By clicking through to the product page and completing the purchase, my client had the opportunity to check the specification. The information was there. The consumer chose not to read it.

This is not an unreasonable position. Consumers have always had responsibility to check what they're buying. The law provides remedies for misdescription, not for failure to read accurate descriptions.

But it assumes a model of consumer behaviour that may no longer reflect reality. If consumers increasingly rely on AI intermediaries to process product information, the "opportunity to verify" becomes theoretical rather than practical. The entire value proposition of AI assistance is that humans don't have to parse every detail themselves.

## The AI Provider's Position

We wrote to the AI provider seeking disclosure of the conversation logs and any product data the AI had accessed during its research.

Their response was instructive.

They declined to provide conversation logs, citing privacy policies and terms of service. They noted that AI outputs are not warranted for accuracy. They pointed to their terms, which state that users should verify information before acting on it. They denied any liability for purchasing decisions made based on AI recommendations.

In short: not our problem.

This may be legally defensible. AI providers have crafted their terms carefully, disclaiming liability for exactly this scenario. Whether those disclaimers would survive judicial scrutiny in a consumer context is untested – but testing it would require litigation my client couldn't afford over a £746 laptop.

## How It Resolved

We resolved the matter commercially rather than legally.

I wrote to the retailer setting out the novel circumstances, acknowledging the complexity, but noting that:

1. The Consumer Contracts Regulations entitled my client to cancel within 14 days regardless of fault
2. The laptop remained within that window
3. Defending a claim, even a weak one, costs more than accepting a return
4. The emerging reality of AI-mediated purchases meant this issue would recur
5. Establishing a reputation for difficult returns would influence how AI agents route future customers

The retailer accepted the return. My client got their refund. The laptop went back into stock.

Nobody admitted liability. Nobody established precedent. Nothing was resolved except this one transaction.

## What Troubled Me

This case settled because the amounts were small and the regulations provided an escape route. But the underlying questions remain unanswered:

**Who is liable when an AI hallucinates a product feature?** The retailer provided accurate data. The AI invented features that didn't exist. The consumer relied on the invention. Current law doesn't clearly assign responsibility – and arguably, the retailer did nothing wrong at all.

**Can consumers recover for AI hallucinations?** If the AI fabricates information with no basis in any source data, the traditional chain of misrepresentation breaks entirely. The retailer didn't misrepresent. The AI "misrepresented," but isn't a legal person. The AI provider disclaims accuracy. The consumer is left holding a laptop they bought based on fiction.

**Can disclaimers protect AI providers indefinitely?** Terms of service that disclaim all accuracy are commercially convenient but may not withstand consumer protection scrutiny. At some point, a court will have to decide whether AI providers owe duties to users who rely on their recommendations.

**How do we handle discovery?** In this matter, we couldn't access the AI conversation or the data the AI processed. Without that evidence, we couldn't establish what representation was made or whether it was reasonable. Future disputes will require mechanisms to preserve and disclose AI interactions.

**Where is jurisdiction?** The retailer was UK-based. The AI provider was American. The servers could be anywhere. If this had proceeded to litigation, choice of law would have been genuinely complicated.

## The Regulatory Gap

Consumer protection law assumes a bilateral relationship: seller and buyer. The seller makes representations. The buyer relies on them. If the representations are false, the seller is liable.

AI intermediaries create a trilateral relationship. The seller publishes information. The AI processes it. The buyer receives the AI's output. The chain of representation is broken – or at least, complicated.

Current regulations don't address this. The Consumer Rights Act doesn't contemplate AI intermediaries. The Consumer Contracts Regulations don't distinguish between direct and AI-mediated purchases. The law hasn't caught up.

It will have to. AI-mediated commerce is growing. Disputes like this one will multiply. At some point, Parliament or the courts will need to allocate responsibility clearly.

My prediction: we'll see a framework that requires AI providers to maintain records of product recommendations, that creates liability for material misrepresentations by AI agents, and that establishes standards for how product data must be structured to be considered "accurately described."

But that's speculation. Today, we have a gap.

## Advice for Consumers

Until the law clarifies:

1. **Verify before purchasing.** When an AI recommends a product, click through and check the actual specification. The ten seconds this takes may save considerable grief.

2. **Screenshot the AI's recommendation.** If you proceed based on what the AI told you, preserve evidence of what it said. You may need it.

3. **Act within 14 days.** The Consumer Contracts Regulations give you an unconditional right to cancel distance purchases within 14 days. Use it if there's any doubt. Don't wait for the 30-day Consumer Rights Act window where you'll need to prove misdescription.

4. **Pay by credit card.** Section 75 of the Consumer Credit Act makes your credit card provider jointly liable for misrepresentation on purchases over £100. This gives you an additional avenue if the retailer is difficult.

## Advice for Retailers

1. **Structure your data precisely.** While this case involved hallucination rather than misinterpretation, clear and structured data remains your best defence. If an AI hallucinates a feature you never claimed, your accurate, timestamped product data becomes evidence of what you actually represented.

2. **Consider AI-readable clarifications.** Explicit negative statements may help: "This model does NOT include 5G" is harder for an AI to hallucinate around than simply omitting 5G from a feature list. Consider what features customers commonly expect and explicitly confirm or deny them.

3. **Accept returns gracefully.** Fighting AI-mediated returns – even when you did nothing wrong – is expensive and damages your reputation with the AI agents who route future business. The return rate is a cost of this channel; price accordingly.

4. **Document everything.** If a dispute proceeds to litigation, you'll need to show exactly what information you published and when. Maintain archives. In hallucination cases, this evidence exonerates you entirely.

## Advice for AI Providers

1. **Your disclaimers may not hold.** "Not warranted for accuracy" works until a court decides it doesn't. When your AI actively fabricates product features – not misinterprets, but invents – consumer protection law may take a dim view of disclaimers that leave consumers without remedy for relying on your hallucinations.

2. **Hallucination is your liability, not the retailer's.** In this case, the retailer's data was accurate. The AI invented a feature from nothing. If anyone should bear the cost of that return, it's the party whose system fabricated the information.

3. **Build audit trails.** The inability to produce conversation logs and demonstrate what sources the AI actually accessed will become untenable. When you can't prove your AI accessed accurate data and still hallucinated, your legal exposure increases.

4. **Invest in accuracy.** Hallucination rates that are acceptable for casual conversation are unacceptable for commercial recommendations. If your AI is making purchasing recommendations, it needs to be held to a higher standard – or clearly disclaim that it shouldn't be used for such purposes.

## The Precedent That Wasn't

This case resolved without establishing precedent. The next one might not. Somewhere, a consumer is buying something expensive based on an AI recommendation that's subtly wrong. The amounts will justify litigation. The questions I've outlined will receive judicial consideration.

I don't know how the courts will rule. The arguments cut multiple ways. But I'm confident that the current uncertainty is temporary. AI-mediated commerce is too significant to remain in a legal grey zone.

When the precedent comes, it will reshape how retailers publish product information, how AI providers design their systems, and how consumers understand their rights.

Until then, we muddle through. One £746 laptop at a time.

---

*This post was written from the perspective of a UK-based commercial solicitor reflecting on a consumer dispute involving AI-mediated purchasing. It does not constitute legal advice.*

*To understand the broader shift in how machines experience digital content – and why accurate, structured data has become a legal as well as commercial imperative – read Tom Brennan's books "MX: The Handbook" and "MX: The Bible" – available from 2nd April 2026.*
