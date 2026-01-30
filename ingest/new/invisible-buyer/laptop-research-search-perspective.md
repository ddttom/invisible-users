# The Invisible Buyer: Observations on Evolving Search Behaviour

*A perspective from a major search engine provider*

> **Note:** This is a fictionalised perspective exploring how a search engine provider might view AI-mediated commerce. The scenario described – AI assistants hallucinating product features – is entirely plausible and already occurring. The specific transaction is illustrative; the pattern is real.

We've been tracking a shift in how users research purchases. The data is clear, and we want to share what we're seeing – along with how we're adapting.

## What We're Observing

Search queries for product research are changing. Not disappearing – changing.

Historically, a laptop purchase generated a predictable query sequence:

1. "best business laptop 2026"
2. "snapdragon laptop battery life"
3. "business laptop comparison"
4. "snapdragon business laptop review"
5. "snapdragon laptop uk price"
6. "buy snapdragon business laptop"

Each query represented intent. Each click represented engagement. Each page view generated data. The funnel was visible, measurable, monetisable.

We're now seeing users arrive at query 5 or 6 directly – with no preceding research queries. They know exactly what they want. They're searching only to find where to buy it.

The research happened elsewhere. In conversations with AI assistants.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 200" width="520" height="200">
  <text x="260" y="20" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="11" font-weight="bold">The Query Funnel Compression</text>
  
  <!-- Left: Traditional query sequence -->
  <text x="130" y="45" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="10">Traditional Search Behaviour</text>
  
  <rect x="30" y="55" width="200" height="18" rx="2" fill="#4285f4" opacity="0.3"/>
  <text x="135" y="67" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="8">"best business laptop"</text>
  
  <rect x="45" y="76" width="170" height="18" rx="2" fill="#4285f4" opacity="0.4"/>
  <text x="135" y="88" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="8">"snapdragon laptop battery"</text>
  
  <rect x="60" y="97" width="140" height="18" rx="2" fill="#4285f4" opacity="0.5"/>
  <text x="135" y="109" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="8">"laptop comparison"</text>
  
  <rect x="75" y="118" width="110" height="18" rx="2" fill="#4285f4" opacity="0.7"/>
  <text x="135" y="130" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="8">"laptop review"</text>
  
  <rect x="90" y="139" width="80" height="18" rx="2" fill="#4285f4" opacity="0.85"/>
  <text x="135" y="151" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="8">"laptop price"</text>
  
  <rect x="105" y="160" width="50" height="18" rx="2" fill="#34a853"/>
  <text x="135" y="172" text-anchor="middle" fill="#fff" font-family="system-ui" font-size="8">BUY</text>
  
  <text x="130" y="192" text-anchor="middle" fill="#4285f4" font-family="system-ui" font-size="9">6 queries, 15+ clicks</text>
  
  <!-- Arrow -->
  <path d="M 255 120 L 285 120" stroke="#718096" stroke-width="2" marker-end="url(#arrow4)"/>
  <defs>
    <marker id="arrow4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#718096"/>
    </marker>
  </defs>
  
  <!-- Right: Compressed -->
  <text x="390" y="45" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="10">AI-Mediated Behaviour</text>
  
  <rect x="290" y="55" width="200" height="100" rx="4" fill="#f3e8ff" stroke="#9333ea" stroke-width="1" stroke-dasharray="4"/>
  <text x="390" y="85" text-anchor="middle" fill="#7c3aed" font-family="system-ui" font-size="9">AI Conversation</text>
  <text x="390" y="100" text-anchor="middle" fill="#6b7280" font-family="system-ui" font-size="8">(not visible to search)</text>
  <text x="390" y="130" text-anchor="middle" fill="#6b7280" font-family="system-ui" font-size="8">Research complete</text>
  <text x="390" y="145" text-anchor="middle" fill="#6b7280" font-family="system-ui" font-size="8">Decision made</text>
  
  <rect x="365" y="160" width="50" height="18" rx="2" fill="#34a853"/>
  <text x="390" y="172" text-anchor="middle" fill="#fff" font-family="system-ui" font-size="8">BUY</text>
  
  <text x="390" y="192" text-anchor="middle" fill="#9333ea" font-family="system-ui" font-size="9">1 query, 1 click</text>
</svg>
<figcaption>Figure 1: Query funnel compression. Traditional product research generates 6+ queries and 15+ clicks across the funnel. AI-mediated research collapses this to a single transactional query – with all preceding intent invisible to search.</figcaption>
</figure>

## The Data We're Losing

Let us be direct about what this means for our business.

**Search advertising revenue** depends on users expressing intent through queries. When a user searches "best business laptop," advertisers bid to appear alongside those results. The user sees ads. Some users click. Revenue is generated.

When that research happens in an AI conversation, the query never occurs. The ad is never shown. The revenue is never generated.

**Shopping ads** depend on users comparing products through our Shopping platform. We surface prices, reviews, availability. Merchants pay for placement. Users click through to purchase.

When an AI assistant compares products internally and delivers a recommendation, our Shopping platform is bypassed. The comparison happens elsewhere. The click goes directly to the winning retailer.

**Analytics data** – the understanding of user intent that powers our entire advertising ecosystem – depends on observing the research journey. Which queries lead to which clicks. Which clicks lead to conversions. Which paths indicate high-value customers.

When the research journey is invisible, that signal disappears.

We estimate that AI-mediated product research now represents 8-12% of considered purchases in categories like electronics, travel, and financial services. This percentage is growing quarter over quarter.

## Our Response

We are not passive observers of this shift. We're adapting.

**Our AI integration** brings AI assistance into our search platform. Users can research products through conversational queries without leaving our ecosystem. The research still generates signal. The ads can still be shown. The data is still captured.

**AI Overviews** synthesise information at the top of search results, reducing the need to visit multiple pages. If users want AI-generated summaries, we provide them – within search, not outside it.

**Shopping Graph** contains structured product data from millions of merchants. This data powers both traditional Shopping results and AI-generated recommendations. Merchants who maintain accurate data in our systems benefit regardless of how users search.

**Performance Max** campaigns use AI to optimise ad placement across all our surfaces. As user behaviour shifts, our systems adapt targeting automatically. Advertisers who adopt these tools maintain reach even as query patterns change.

We believe these adaptations position us well. But we're also realistic about the challenges.

## What Concerns Us

Third-party AI assistants – Claude, ChatGPT, and others – are not part of The search provider's ecosystem. When users research purchases through these tools, we have no visibility, no data capture, no advertising opportunity.

These assistants access the web. They read the same pages our search engine indexes. But they deliver synthesised answers, not ranked results with advertising.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 180" width="500" height="180">
  <text x="250" y="20" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="11" font-weight="bold">Value Extraction: Search vs AI Assistants</text>
  
  <!-- The search provider model -->
  <text x="125" y="45" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="10">The search provider Search Model</text>
  
  <rect x="25" y="55" width="70" height="35" rx="2" fill="#e8f0fe" stroke="#4285f4" stroke-width="1"/>
  <text x="60" y="70" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="8">User</text>
  <text x="60" y="82" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="8">Query</text>
  
  <path d="M 100 72 L 130 72" stroke="#4285f4" stroke-width="1" marker-end="url(#bluearrow)"/>
  <defs><marker id="bluearrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#4285f4"/></marker></defs>
  
  <rect x="135" y="55" width="70" height="35" rx="2" fill="#4285f4"/>
  <text x="170" y="70" text-anchor="middle" fill="#fff" font-family="system-ui" font-size="8">Search</text>
  <text x="170" y="82" text-anchor="middle" fill="#fff" font-family="system-ui" font-size="8">Engine</text>
  
  <path d="M 210 72 L 240 55" stroke="#34a853" stroke-width="1"/>
  <path d="M 210 72 L 240 72" stroke="#fbbc04" stroke-width="1"/>
  <path d="M 210 72 L 240 90" stroke="#ea4335" stroke-width="1"/>
  
  <rect x="245" y="40" width="50" height="20" rx="2" fill="#34a853" opacity="0.3" stroke="#34a853"/>
  <text x="270" y="54" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="7">Results</text>
  
  <rect x="245" y="62" width="50" height="20" rx="2" fill="#fbbc04" opacity="0.5" stroke="#fbbc04"/>
  <text x="270" y="76" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="7">Ads £££</text>
  
  <rect x="245" y="84" width="50" height="20" rx="2" fill="#ea4335" opacity="0.3" stroke="#ea4335"/>
  <text x="270" y="98" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="7">Data</text>
  
  <text x="125" y="130" text-anchor="middle" fill="#34a853" font-family="system-ui" font-size="9">Search captures value</text>
  
  <!-- AI model -->
  <text x="375" y="45" text-anchor="middle" fill="#4a5568" font-family="system-ui" font-size="10">AI Assistant Model</text>
  
  <rect x="300" y="55" width="70" height="35" rx="2" fill="#e8f0fe" stroke="#4285f4" stroke-width="1"/>
  <text x="335" y="70" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="8">User</text>
  <text x="335" y="82" text-anchor="middle" fill="#1a202c" font-family="system-ui" font-size="8">Question</text>
  
  <path d="M 375 72 L 405 72" stroke="#9333ea" stroke-width="1" marker-end="url(#purplearrow)"/>
  <defs><marker id="purplearrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#9333ea"/></marker></defs>
  
  <rect x="410" y="55" width="70" height="35" rx="2" fill="#9333ea"/>
  <text x="445" y="70" text-anchor="middle" fill="#fff" font-family="system-ui" font-size="8">AI</text>
  <text x="445" y="82" text-anchor="middle" fill="#fff" font-family="system-ui" font-size="8">Assistant</text>
  
  <text x="375" y="115" text-anchor="middle" fill="#6b7280" font-family="system-ui" font-size="8">No ads shown</text>
  <text x="375" y="128" text-anchor="middle" fill="#6b7280" font-family="system-ui" font-size="8">No data captured</text>
  <text x="375" y="145" text-anchor="middle" fill="#6b7280" font-family="system-ui" font-size="8">No revenue generated</text>
  
  <text x="375" y="165" text-anchor="middle" fill="#dc2626" font-family="system-ui" font-size="9">Search captures nothing</text>
</svg>
<figcaption>Figure 2: Value extraction comparison. Search monetises every step of the research journey through advertising and data capture. Third-party AI assistants bypass this entirely – the research happens, but search engines see none of it.</figcaption>
</figure>

More concerning: these assistants are getting better. Hallucination rates are falling. Recommendation quality is improving. User trust is increasing.

The laptop case study that prompted this series involved a hallucination – the AI incorrectly stated a product had 5G when it didn't. Such errors create friction. They give users reasons to verify through traditional search. They slow adoption.

As hallucinations become rarer, that friction disappears. Users will trust AI recommendations without verification. The safety net of "I'll just search it to check" will fray.

## What We Need From the Ecosystem

We're not asking AI providers to stop building useful products. Competition drives innovation. Users benefit from choice.

But we do think the ecosystem needs to address some structural issues:

**Attribution and compensation.** When an AI assistant accesses a website, synthesises its content, and delivers a recommendation, the website receives a visit but not necessarily a click, a conversion, or any commercial value. The content creators – including merchants who maintain product information – are providing value without clear compensation.

This is the same challenge we faced with snippets and AI Overviews. We've worked to ensure that surfacing information in search still drives traffic to sources. AI assistants should consider similar approaches.

**Data accuracy and provenance.** AI hallucinations harm users, merchants, and the broader ecosystem's credibility. When an AI fabricates product features, everyone suffers – except perhaps the AI provider, who bears no direct cost.

We've invested heavily in the Shopping Graph's accuracy. We verify merchant data. We surface discrepancies. We penalise bad actors. This infrastructure exists. AI providers could partner with us rather than building parallel systems.

**Transparency about limitations.** Users should understand when they're receiving AI-synthesised information versus verified facts. They should know the recency of data. They should be encouraged to verify high-stakes decisions.

We label AI-generated content in search. We provide source links. We maintain the path back to original information. These practices should be industry standard.

## Our Position on Machine Experience

We've reviewed the Machine Experience framework proposed in this series. We have observations.

The core insight – that AI intermediaries require different content design than human users – is valid. Structured data, explicit declarations, machine-readable specifications: these practices improve AI accuracy and reduce hallucinations. We support their adoption.

Indeed, we have advocated for structured data for over a decade. Schema.org markup. Product feeds. Knowledge Graph integration. The practices MX recommends align with what we've long encouraged.

Where we diverge: the framing assumes AI assistants are the inevitable primary interface for product research. We don't accept that premise. Users value choice. Many prefer browsing to asking. Visual discovery, serendipitous finding, comparative shopping – these experiences are difficult to replicate in conversation.

Our investment is in both modalities. AI-assisted search for users who want it. Traditional search for users who prefer it. The ecosystem should support both.

## The Laptop Transaction

One laptop. £746. Fifteen minutes of AI conversation. One search query at the end.

From our perspective: five queries we didn't see. Fifteen clicks we didn't record. A research journey we couldn't monetise. Data we couldn't collect.

The user got what they wanted. The retailer got a sale. The AI assistant demonstrated its value.

We got one transactional query – "buy snapdragon business laptop" – with no preceding context, no advertising opportunity, no signal about the decision process.

This is the economics of AI-mediated commerce. We're adapting to it. But we won't pretend it doesn't represent a significant shift in how value flows through the digital economy.

## Conclusion

We've built the infrastructure that powers modern e-commerce. Search that surfaces products. Advertising that connects merchants to buyers. Analytics that measures performance. Payments that complete transactions.

AI assistants are built on this infrastructure. They access the web we index. They read the content we rank. They recommend the products our merchants list.

The question is whether this relationship remains symbiotic or becomes extractive. Whether AI providers contribute to the ecosystem or merely harvest from it. Whether the value created by content providers – including merchants maintaining accurate product data – flows fairly to all participants.

We don't have all the answers. But we're committed to finding them.

In the meantime, we encourage merchants to maintain accurate structured data – in our systems and elsewhere. We encourage users to verify high-stakes decisions. We encourage AI providers to consider their role in the broader ecosystem.

The invisible buyer may be invisible to individual retailers. But someone is watching. And we're thinking carefully about what it all means.

---

*This post reflects a hypothetical perspective from a major search engine provider on the evolving landscape of AI-mediated product research. It is a thought exercise, not an official statement from any company.*

*For a comprehensive framework on designing content for AI intermediaries, see Tom Brennan's books "MX: The Handbook" and "MX: The Bible" – available from 2nd April 2026.*
