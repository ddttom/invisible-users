# Two Sides of the Same Cognitive Coin: What Mindhacker Can Teach Us About Machine Experience

When Ron and Marty Hale-Evans published "[Mindhacker: 60 Tips, Tricks, and Games to Take Your Mind to the Next Level](https://www.wiley.com/en-us/Mindhacker:+60+Tips,+Tricks,+and+Games+to+Take+Your+Mind+to+the+Next+Level-p-9781118007525)" in 2011, they were addressing a fundamental challenge: how do we optimise human cognitive performance? More than a decade later, as we develop Machine Experience (MX) as a discipline, we're asking a remarkably similar question from the opposite direction: how do we optimise information for machine cognition?

The parallels are worth exploring.

## The Processor Problem

Mindhacker starts from a simple premise: the human brain is a processor with specific capabilities and limitations. To get better performance, you need to understand those constraints and work with them rather than against them. The book offers 60 techniques that do exactly that—from memory palaces that exploit our spatial reasoning abilities to spaced repetition that works with how we consolidate information over time.

Machine Experience begins from an identical premise. AI systems are processors with specific capabilities and limitations. To enable better machine understanding, we need to structure information in ways that work with how these systems process, parse, and interpret content.

Both disciplines recognise that throwing raw information at a processor—human or machine—and hoping for the best is inefficient. The solution in both cases is the same: understand the architecture, then optimise accordingly.

## Memory and Retrieval Architecture

Consider how Mindhacker approaches memory. The "memory dungeon" technique (also known as the [method of loci](https://en.wikipedia.org/wiki/Method_of_loci)) doesn't try to force the brain to remember arbitrary lists through brute repetition. Instead, it exploits something the human brain already does well: spatial navigation and visual memory. You create a structured mental space, place information in specific locations, and then retrieve it by mentally walking through that space.

Now consider how MX approaches information architecture. We don't expect AI systems to somehow intuit document structure from walls of undifferentiated text. Instead, we create explicit hierarchies with semantic HTML, structured data with JSON-LD, and clear relationships between concepts. We're building the machine equivalent of a memory palace—a structured space that the AI can navigate to find what it needs.

The principle is identical: create structured models that align with how the processor naturally works.

## Notation Systems and Semantic Clarity

Mindhacker advocates for personal notation systems—shorthand methods that make information processing more efficient for the individual. These systems reduce cognitive overhead by representing complex ideas in compact, easily processed forms. The [NATO phonetic alphabet](https://en.wikipedia.org/wiki/NATO_phonetic_alphabet), mathematical notation, even emoji, all serve this function: they're standardised symbols that convey meaning more efficiently than verbose alternatives.

MX is essentially the development of notation systems for machines. [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html) tags aren't just decoration—they're meaningful symbols that convey structure. A `<nav>` element doesn't just look different from a `<div>`; it means something different to a machine parser. [JSON-LD](https://json-ld.org/) schema markup is notation that makes relationships explicit. Even the "docs/for-ai" approach is a notation system—a way of signalling "this content is structured for machine consumption."

Both human and machine notation systems serve the same purpose: reducing processing overhead through semantic clarity.

## Chunking and Hierarchical Organisation

One of Mindhacker's recurring themes is chunking—breaking information into manageable units that fit within [working memory limitations](https://en.wikipedia.org/wiki/Working_memory#Capacity). Humans can typically hold 7±2 items in working memory, so effective information design respects that constraint.

AI systems have different but equally real constraints. Context windows have limits. Attention mechanisms work better with clear hierarchical structure. Token processing is more efficient when information is properly chunked and organised.

MX principles like clear heading hierarchies, logical document structure, and explicit content divisions aren't arbitrary aesthetic choices. They're chunking strategies for machines, making content easier to process, understand, and retrieve.

## The Efficiency Principle

At their core, both Mindhacker and Machine Experience are about the same thing: information efficiency. 

Mindhacker asks: given the architecture of human cognition, how should we structure and present information to minimise processing overhead and maximise understanding?

Machine Experience asks: given the architecture of machine cognition, how should we structure and present information to minimise processing overhead and maximise understanding?

The techniques differ because the processors differ. Humans benefit from spatial metaphors, narrative structure, and visual hierarchy. Machines benefit from explicit semantics, structured data, and clear relationships. But the underlying principle—understand your processor, respect its constraints, optimise accordingly—remains constant.

## Design for Your Audience

Perhaps the most useful insight from this parallel is simply this: design is always about understanding your audience's cognitive architecture.

When Mindhacker teaches techniques for improving human memory, it's really teaching empathy for human cognitive constraints. When we develop MX principles for machine-readable content, we're practising empathy for machine cognitive constraints.

Neither approach is about dumbing down information or artificially limiting what can be expressed. Rather, both are about presenting information in forms that the intended processor can handle efficiently. That's not a constraint—it's good design.

## Where They Diverge

There is one significant difference worth noting. Mindhacker is about making humans adapt to optimise their own performance. MX is about making content adapt to enable machine performance. We're not trying to "improve" the AI—we're improving our information architecture to work better with AI as it exists.

This is an important distinction. Humans can learn new notation systems and develop new cognitive strategies. AI systems, at least in their current form, process information according to their training and architecture. MX therefore puts the burden of adaptation on content creators rather than on the systems consuming that content.

## The Practical Takeaway

If you're working on Machine Experience, it's worth studying how Mindhacker approaches human cognitive optimisation. Ron Hale-Evans's [Mentat Wiki](http://www.ludism.org/mentat) offers additional resources for exploring these techniques. The techniques won't transfer directly—your memory palace won't help a language model—but the methodology will. 

Both disciplines start by asking: what is the processor actually good at? What are its natural patterns? What are its limitations? Then they build systems that work with those answers rather than against them.

That's the essence of good information design, whether your audience is human or machine.

---

*Tom Hale is Principal Consultant at Digital Domain Technologies and is developing Machine Experience as a professional discipline for designing websites that serve both human and AI users.*

## Further Reading

**Mindhacker Resources:**
- [Mindhacker on Wiley](https://www.wiley.com/en-us/Mindhacker:+60+Tips,+Tricks,+and+Games+to+Take+Your+Mind+to+the+Next+Level-p-9781118007525)
- [Mentat Wiki](http://www.ludism.org/mentat) - Ron Hale-Evans's collaborative environment for exploring better thinking
- [Method of Loci](https://en.wikipedia.org/wiki/Method_of_loci) - The ancient memory technique

**Machine Experience Resources:**
- [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html) - MDN Web Docs
- [JSON-LD](https://json-ld.org/) - JSON for Linking Data
- [Schema.org](https://schema.org/) - Structured data vocabularies
- [Working Memory](https://en.wikipedia.org/wiki/Working_memory#Capacity) - Understanding cognitive limitations
