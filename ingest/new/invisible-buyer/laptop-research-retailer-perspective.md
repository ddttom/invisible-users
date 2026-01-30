# The Invisible Buyer: What We Learned When the Funnel Collapsed

*A perspective from a retailer who adapted*

> **Note:** This is a fictionalised perspective exploring how a retailer might experience AI-mediated commerce. The scenario described – customers researching via AI assistants and arriving with no visible journey – is already occurring. The specific details are illustrative; the pattern is real.

We noticed the change about eighteen months ago. Orders arriving with no preceding engagement. No browse history. No abandoned carts. No email signup. Just transactions appearing as if from nowhere.

At first, we thought it was a tracking problem. Our analytics team spent weeks checking pixels, auditing tag managers, investigating ad attribution. Everything was firing correctly. The customers simply weren't there – until suddenly they were.

Then we understood. The customers *were* there. They just weren't visible to us any more.

## The Pattern We Identified

The new orders shared characteristics:

- **No referral source** – or rather, direct traffic that didn't behave like direct traffic
- **Single-session purchases** – arrival, product page, basket, checkout, gone
- **Precise product selection** – no browsing related items, no "customers also viewed" clicks
- **Specification-led choices** – buyers who knew exactly what they wanted before they arrived
- **Price sensitivity** – we won when we were cheapest; we lost when we weren't

These weren't impulse buyers. They weren't browsers who got lucky. They were informed purchasers who'd done their research elsewhere and arrived ready to transact.

Elsewhere, it turned out, meant AI assistants.

## What We Did Right

We adapted. Not because we were visionary, but because we had no choice. Here's what worked:

**We fixed our product data.** Our specifications had been adequate for human browsers who could interpret fuzzy descriptions. They weren't adequate for machines that needed precise, structured, comparable data. We rebuilt our product information architecture from scratch – every attribute explicit, every specification standardised, every compatibility clearly stated.

**We exposed our inventory accurately.** We'd been guilty of "available to order" optimism – showing stock we could get rather than stock we had. When AI agents started comparing delivery reliability across suppliers, our creative stock management became a liability. We moved to real-time inventory with honest lead times.

**We made our pricing transparent.** No more "add to basket to see price" games. No more postcode-based pricing variations. No more hidden fees revealed at checkout. AI agents parse the total cost instantly; opacity just meant we weren't considered.

**We built an API.** Our website was designed for humans. Humans browse. Humans respond to imagery and persuasive copy. AI agents don't. They need structured endpoints that return clean data. We built them.

## What Keeps Us Awake at Night

We won the transaction. We're winning more transactions than before, in fact – our conversion rate from the traffic we *do* see has increased substantially. But winning the transaction is only the beginning.

### Returns

Here's the problem with an invisible buyer: we don't know who's really buying.

When a human browses our site, considers options, reads reviews, and makes a purchase, they've invested time and attention. That investment creates commitment. Returns from browsing customers run about 8% in our category.

When an AI agent delivers a purchase decision, the human behind it has invested nothing. They described a need; options appeared; they approved a recommendation. If the product doesn't match their mental image – an image we never saw and couldn't influence – it comes back. Returns from AI-mediated purchases are running closer to 15%.

That's a significant cost. Returns processing, restocking, potential damage, shipping both ways. On a £746 laptop, a return costs us perhaps £40-60 in pure handling, plus the margin erosion if we have to sell it as refurbished.

We're effectively subsidising the AI's learning curve. Every return teaches the agent something about specification accuracy, about which attributes matter, about where product data misleads. But we're paying for that education.

### Distance Selling Regulations

In the UK, the Consumer Contracts Regulations give buyers 14 days to return online purchases for any reason. No justification required. This made sense when it was designed – consumers couldn't physically inspect goods before buying, so they needed protection.

But what happens when the AI agent *could* have inspected the specifications perfectly, yet the human still returns the product because it's not what they imagined?

We're legally obligated to accept the return. We can't argue that the buyer's agent had access to complete information. The regulations don't distinguish between an uninformed human and an AI-assisted one.

The distance selling framework assumes information asymmetry between seller and buyer. AI agents are eliminating that asymmetry while the protections remain. We bear costs designed to compensate for ignorance that no longer exists.

### Warranty and Support

When someone buys through our website after reading our guides, watching our videos, and chatting with our support team, they understand what they're buying. They've self-selected into our customer base. They have realistic expectations.

When an AI agent routes a transaction to us because we had the best price, the buyer has no relationship with us at all. They might not know our name. They certainly don't know our support processes, our warranty terms, or our returns policy.

Then something goes wrong.

The customer doesn't contact us – they contact their AI assistant. "This laptop isn't working properly. Sort it out." The AI then contacts us, or worse, starts disputing charges, or simply tells the human to return it.

We're providing warranty support to customers who don't know they're our customers. We're explaining our processes to AI agents who may or may not relay that information accurately. We're building relationships with machines in the hope that good service will influence future routing decisions.

This is not what we signed up for.

## The Economics Are Brutal

Let me be specific about the numbers.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" width="500" height="200">
  <text x="250" y="20" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="11" font-weight="bold">Unit Economics: AI-Mediated vs Traditional Orders</text>
  
  <!-- Left bar: Traditional -->
  <text x="120" y="45" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="10">Traditional Order</text>
  
  <rect x="60" y="55" width="120" height="20" fill="#48bb78"/>
  <text x="120" y="69" text-anchor="middle" fill="#fff" font-family="system-ui" font-size="9">Margin: £80-100</text>
  
  <rect x="60" y="78" width="30" height="15" fill="#fc8181"/>
  <text x="145" y="89" text-anchor="start" fill="#4a5568" font-family="system-ui" font-size="8">Payment: £11-15</text>
  
  <rect x="60" y="96" width="25" height="15" fill="#fc8181"/>
  <text x="145" y="107" text-anchor="start" fill="#4a5568" font-family="system-ui" font-size="8">Shipping: £8-12</text>
  
  <rect x="60" y="114" width="15" height="15" fill="#fc8181"/>
  <text x="145" y="125" text-anchor="start" fill="#4a5568" font-family="system-ui" font-size="8">Handling: £3-5</text>
  
  <rect x="60" y="132" width="40" height="15" fill="#fc8181"/>
  <text x="145" y="143" text-anchor="start" fill="#4a5568" font-family="system-ui" font-size="8">Acquisition: £15-25</text>
  
  <rect x="60" y="150" width="18" height="15" fill="#fbd38d"/>
  <text x="145" y="161" text-anchor="start" fill="#4a5568" font-family="system-ui" font-size="8">Returns (8%): £8-12 avg</text>
  
  <line x1="60" y1="175" x2="180" y2="175" stroke="#1a202c" stroke-width="1"/>
  <text x="120" y="190" text-anchor="middle" fill="#276749" font-family="system-ui" font-size="10" font-weight="bold">Net: £20-35</text>
  
  <!-- Right bar: AI-mediated -->
  <text x="380" y="45" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="10">AI-Mediated Order</text>
  
  <rect x="320" y="55" width="120" height="20" fill="#48bb78"/>
  <text x="380" y="69" text-anchor="middle" fill="#fff" font-family="system-ui" font-size="9">Margin: £80-100</text>
  
  <rect x="320" y="78" width="30" height="15" fill="#fc8181"/>
  <text x="405" y="89" text-anchor="start" fill="#4a5568" font-family="system-ui" font-size="8">Payment: £11-15</text>
  
  <rect x="320" y="96" width="25" height="15" fill="#fc8181"/>
  <text x="405" y="107" text-anchor="start" fill="#4a5568" font-family="system-ui" font-size="8">Shipping: £8-12</text>
  
  <rect x="320" y="114" width="15" height="15" fill="#fc8181"/>
  <text x="405" y="125" text-anchor="start" fill="#4a5568" font-family="system-ui" font-size="8">Handling: £3-5</text>
  
  <rect x="320" y="132" width="4" height="15" fill="#c6f6d5" stroke="#48bb78" stroke-width="1"/>
  <text x="405" y="143" text-anchor="start" fill="#276749" font-family="system-ui" font-size="8">Acquisition: ~£0 ✓</text>
  
  <rect x="320" y="150" width="55" height="15" fill="#feb2b2"/>
  <text x="405" y="161" text-anchor="start" fill="#c53030" font-family="system-ui" font-size="8">Returns (15%): £35-45 avg ✗</text>
  
  <line x1="320" y1="175" x2="440" y2="175" stroke="#1a202c" stroke-width="1"/>
  <text x="380" y="190" text-anchor="middle" fill="#744210" font-family="system-ui" font-size="10" font-weight="bold">Net: £15-30</text>
</svg>
<figcaption>Figure 1: The acquisition-return trade-off. AI-mediated orders eliminate customer acquisition costs but increase return rates. The net effect is roughly neutral – but the retailer loses the customer relationship and all associated data.</figcaption>
</figure>

A laptop we sell for £746 might have a margin of £80-100. That's before:
- Payment processing (1.5-2%): £11-15
- Shipping: £8-12
- Warehouse handling: £3-5
- Customer acquisition: historically £15-25, now essentially zero for AI-routed orders

So AI-mediated orders look attractive – no acquisition cost. Except:
- Return rate is 7 percentage points higher: £35-45 additional cost per order on average
- Support queries are higher (customers don't know us): £5-10 per order
- Warranty claims are marginally higher (less self-selection): £3-5 per order

The acquisition cost saving is roughly offset by the increased post-purchase costs. We're not losing money on AI-mediated orders, but we're not making significantly more either.

And we're losing something we used to have: a relationship. Data. Understanding. The ability to predict demand, to cross-sell, to build loyalty.

## What We Need From the AI Providers

We've adapted to the new reality. We'll continue adapting. But we need the AI providers to meet us halfway:

**Share the return risk.** If an AI agent recommends a product and it gets returned, that agent made a poor recommendation. There should be consequences – reputational if not financial. Build feedback loops that make agents accountable for their advice.

**Help us understand the buyer.** Not personal data – we understand privacy constraints. But context. "This buyer needs the laptop for consultancy work involving presentations." That single sentence would let us include the right accessories, set appropriate expectations, provide relevant setup guides.

**Route warranty properly.** When something goes wrong, the AI should direct the customer to us with context, not leave us to discover a return in progress. We can often solve problems that would otherwise become returns.

**Recognise good service.** If we provide excellent warranty support, if our returns process is painless, if our delivery is reliable – that should influence routing. Not just price. Build quality metrics into the recommendation engine.

## We're Not Going Back

I want to be clear: we're not complaining about the shift. We can't uninvent AI assistants. We can't force customers to browse our website. We can't recreate the funnel by wishing it back.

The invisible buyer is our new reality. We've adapted our operations, our systems, our expectations.

But the current equilibrium is unstable. Retailers are bearing costs that AI providers are generating. Regulations designed for one world are being applied to another. Customer relationships are being intermediated without consent or compensation.

Something will have to give. Either AI providers will start sharing the costs they create, or retailers will start pricing them in, or regulations will evolve to reflect the new reality.

We survived the shift because we saw it early and moved fast. Many of our competitors didn't. But survival isn't the same as thriving.

We're waiting to see what comes next.

---

*This post was written from the perspective of a UK-based electronics retailer who adapted successfully to AI-mediated commerce. It reflects operational realities as of early 2026.*

*To understand the broader shift in how machines experience digital content, read Tom Brennan's books "MX: The Handbook" and "MX: The Bible" – available from 2nd April 2026.*
