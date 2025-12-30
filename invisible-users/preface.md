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

This is a practical guide. Each chapter addresses a specific aspect of the collision between agent capabilities and web design conventions, from technical failures to business model tensions to legal uncertainties.

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
