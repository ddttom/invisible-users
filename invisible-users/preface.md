# Preface

I didn't set out to write a book about AI agents. I set out to book a holiday.

It was late 2024, and I was comparing tour operators for a trip through Southeast Asia. I'd delegated the research to an AI assistant, expecting it to save me hours of clicking through brochures. Instead, it gave me confident but wrong advice about which company had the better itinerary.

The agent had looked at one tour operator's paginated day-by-day breakdown, seen only Day 1, and concluded that was the entire trip. The competitor's single-page itinerary was readable in full. Based on this, my assistant recommended the wrong company.

I caught the error. But I wondered: how many people wouldn't?

That question led me down a path I hadn't anticipated. I started examining why the agent had failed, and found a pattern. The same design choices that confused my AI assistant also confused screen reader users, people with cognitive disabilities, and anyone who processed pages sequentially rather than spatially.

We'd built a web that worked brilliantly for one specific type of user: someone with good vision, working on a desktop, with focused attention and plenty of time. Everyone else had been struggling quietly for years. Now AI agents were struggling loudly, and there was finally commercial pressure to fix the problems.

This book grew from that realisation. It's not a book about AI. It's a book about web design, and the assumptions we've embedded into it. AI agents are the lens, but the subject is broader: how do we build digital spaces that work for users we didn't anticipate?

---

## What This Book Is

This is a practical guide and a thinking framework. Each chapter addresses a specific aspect of the collision between agent capabilities and web design conventions, from technical failures to business model tensions to legal uncertainties.

**This is a theory book, not a research study.** The field of AI agent interaction with websites is too new for comprehensive empirical research. You won't find citations to academic papers proving the patterns I describe, because those papers don't exist yet. What you will find is a structured way to think about emerging problems and evaluate potential responses.

**The figures and examples are illustrative, not validated.** When I write "if agent traffic reaches 30% of visits with minimal ad revenue, a site could see revenue decline by roughly one-third," that's a logical calculation, not a proven outcome. I've avoided false precision - you'll see ranges and qualified language rather than specific percentages presented as facts.

**This book offers frameworks for decision-making, not proven solutions.** The patterns that appear to work for agent compatibility also align with accessibility best practices, which gives us confidence. But we don't yet know which approaches will become standard, which will evolve, and which will be superseded by better alternatives.

The first three chapters establish what's breaking and why. These are the foundations. Skip them and you'll miss the context that makes solutions make sense.

Chapters 4 through 8 address implications: business models, content economics, security concerns, legal landscape, and human costs. These might seem tangential to implementation, but they're not. The choices we make about agent compatibility are shaped by these pressures, and understanding them helps you prioritise.

Chapters 9 and 10 provide solutions. Strategic frameworks in Chapter 9. Working code in Chapter 10. If you're impatient to implement, you can start there and work backwards.

Throughout, I've tried to be honest about tensions that don't have clean resolutions. Some fixes for agent compatibility conflict with short-term business interests. Some accessibility improvements reduce engagement metrics. Some solutions create new problems. I've flagged these rather than pretending they don't exist.

---

## What This Book Isn't

This isn't speculation about a distant future. Agent traffic is real, growing, and affecting conversion rates right now. Most site owners don't know it's happening.

This isn't comprehensive coverage of AI capabilities. I've focused on the web interface patterns that matter, not the broader landscape of what AI can do.

This isn't a manifesto. There are genuine disagreements about how to handle agent access, and I've tried to present competing perspectives rather than advocating a single position on all matters.

---

## A Note on Timing

I'm writing this as the problem emerges, not so early that it seems speculative. Not so late that solutions are already standardised.

Standards are still forming. Best practices are still contested. The businesses and developers who engage now will shape what becomes normal. In five years, agent compatibility will be as routine as mobile responsiveness. The transition period - which we're in - is when advantage is gained or lost.

You can learn these lessons through months of failed conversions and support tickets. Or you can learn them from someone who's already documented the patterns.

**The market timing matters:** This knowledge is valuable now because it's scarce. You're reading this during the transition period - after the problem has emerged, before solutions have standardised. In two years, competitors will exist. In five years, agent compatibility will be as routine as mobile responsiveness, and this becomes commoditized knowledge. The window for gaining competitive advantage is limited.

---

## Who This Book Is For

This book is written for three distinct audiences, each of whom holds a piece of the solution:

**1. Web Professionals & Engineers**
Developers, architects, and product owners who build the web. You are the text's primary audience. You'll find technical patterns, code examples, and architectural discussions that explain exactly how to build agent-compatible interfaces. The [Web Audit Suite](../web-audit-suite/) included with this book is your toolset.

**2. Business Leaders & Decision Makers**
CTOs, CMOs, and executives who need to understand the strategic shift. You don't need to write the code, but you do need to understand why "silent conversion failures" are happening and how to resource the fix. Chapters 4, 5, and 9 are written specifically for you.

**3. Partners & Investors**
Agencies looking to offer new services and investors evaluating the next phase of web evolution. The methodology described here creates a new category of professional services—audit, remediation, and certification—that will likely dominate web development discussions for the next decade.

---

## A Critical Responsibility

This book addresses two audiences: developers who build websites, and people who use AI agents to interact with them. Both have responsibilities.

**For developers:** The technical patterns in this book - clear state, persistent errors, semantic structure - improve experiences for everyone. Fix what you can control.

**For users:** Not everything can be fixed with better design. When you instruct AI agents to interact with banking, legal services, or commercial transactions, you bear responsibility for the prompts you provide and the actions you authorise.

I discuss banking security (Chapter 6), legal liability (Chapter 7), and speculative commerce patterns like dark warehouses (Chapter 4) not because developers can fix these with HTML, but because we need to pay attention. The instructions you give to agents matter enormously when dealing with services where mistakes have serious consequences.

Agent-friendly design helps. But careful, considered use of agents is equally important. This book addresses both.

---

## Acknowledgements

This book exists because problems became visible when I looked closely at failures I'd typically have ignored. I'm grateful to everyone who has written about web accessibility over the past two decades; their work laid the foundations on which this analysis builds.

Thank you to the colleagues, clients, and collaborators who reviewed early drafts and asked uncomfortable questions. Several sections exist because someone said "but what about..." and I realised I hadn't thought it through.

I've worked on the web since its early days. Every project taught me something about what users actually do versus what we assume they'll do. Those lessons appear throughout this book, even when I can't trace them to specific sources.

---

## How to Use This Book

Read sequentially if you can. Each chapter builds on previous concepts, and forward references assume you've read the earlier material.

### Reading Path for Business Leaders

If you're a business leader evaluating whether this matters for your organisation, you don't need to read all the technical detail:

**Read these chapters in full:**

- Chapter 1: What You Will Learn (foundation and context)
- Chapter 4: The Business Reality (economics and incentives)
- Chapter 5: The Content Creator's Dilemma (advertising model implications)
- Chapter 7: The Legal Landscape (liability and policy questions)
- Chapter 8: The Human Cost (access and equity implications)
- Chapter 9: Designing for Both (first half - strategic frameworks)

**Skim these chapters for understanding:**

- Chapter 2: The Invisible Failure (understand the problem without technical depth)
- Chapter 3: The Architectural Conflict (understand why this is hard)

**Skip or delegate:**

- Chapter 6: The Security Maze (technical security details - delegate to your security team)
- Chapter 10: Technical Advice (implementation code - delegate to your development team)

Look for "Key Points for Business Leaders" boxes at the end of Chapters 2, 3, 4, 5, 7, and 8. These distill the essential business implications without requiring you to work through technical examples.

### Reading Path for Technical Implementers

If you need solutions immediately, start with Chapter 10 and work backwards when you encounter concepts that need context.

If you're making a business case for agent compatibility work, Chapters 4, 5, and 8 provide the commercial and human arguments. Chapter 2 identifies the technical failures.

If you're a designer, Chapter 3 will change how you see your work. Chapter 9 provides the patterns that serve both audiences.

There's a glossary at the end. Use it. Some terms have specific meanings in this context that differ from casual usage.

### Interactive Companion

An interactive notebook version of this book is available at [allabout.network/invisible-users.html](https://allabout.network/invisible-users.html). It presents key concepts through demonstrations and explorations, with:

- Visual comparisons of agent failures vs reality
- Interactive data tables showing business impact
- Real-world cost calculations
- Implementation priority visualizations
- Complete chapter index with direct links

The notebook serves as both an introduction to the book's themes and a navigation aid for finding specific topics. Use it to bookmark sections of interest, explore concepts interactively, or as an executive summary before diving into the full manuscript.

Time to complete: 60-75 minutes.

---

## About the Author

Tom Cranstoun has worked on web technology since the early days of the commercial internet. Over three decades, he's seen the web evolve from hand-coded HTML pages to the sophisticated application platforms we rely on today.

His career spans technical implementation, strategic consulting, and the difficult work of translating between what engineers can build and what businesses need. He's worked with organisations ranging from startups to enterprises, across sectors including finance, media, and retail.

This book grew from patterns he noticed across projects: the same accessibility problems appearing in different contexts, the same design assumptions failing for unexpected user types, the same commercial pressures shaping what gets fixed and what gets ignored.

Tom writes for allabout.network and is on LinkedIn. He's based in the UK and works with organisations internationally.

He remains convinced that the web we've built is less accessible than it should be, and that AI agents - demanding clarity for their own reasons - might finally force us to fix it.

---

December 2025

London
