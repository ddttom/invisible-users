# Preface

I didn't set out to write a book about AI agents. I set out to book a holiday.

It was late 2024, and I was comparing tour operators for a trip through Southeast Asia. I'd delegated the research to an AI assistant, expecting it to save me hours of clicking through brochures. Instead, it gave me confident but wrong advice about which company had the better itinerary.

The agent had looked at one tour operator's paginated day-by-day breakdown, seen only Day 1, and concluded that was the entire trip. The competitor's single-page itinerary was readable in full. Based on this, my assistant recommended the wrong company.

I caught the error, and that led me down a path I hadn't anticipated. I started examining why the agent had failed, and found a pattern. The same design choices that confused my AI assistant also confused screen reader users, people with cognitive disabilities, and anyone who processed pages sequentially rather than spatially.

We'd built a web that worked brilliantly for one specific type of user: someone with good vision, working on a desktop, with focused attention and plenty of time. Everyone else had been struggling quietly for years. Now AI agents were struggling loudly, and there was finally commercial pressure to fix the problems.

Since I began this research, the landscape has shifted dramatically. Browser extensions like Claude for Chrome and Microsoft Copilot now bring agents directly into your workflow. They operate within your browser, logged in with your credentials, seeing your screen, clicking buttons, filling forms, and working across multiple tabs whilst you handle other tasks. They schedule recurring workflows, remember shortcuts you create, and maintain context across your web sessions. This isn't agents fetching pages remotely anymore. This is agents working alongside you, in your context, on your actual work.

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

## Who This Book Is For

This book is written for four distinct audiences, each of whom holds a piece of the solution:

**1. Web Professionals & Engineers**
Developers, architects, and product owners who build the web. You are the text's primary audience. You'll find technical patterns, code examples, and architectural discussions that explain exactly how to build agent-compatible interfaces. The [Web Audit Suite](../web-audit-suite/) included with this book is your toolset.

**2. Agent System Developers**
Developers building AI agents, browser extensions, and agentic systems that interact with websites. Chapter 11 is written specifically for you. You'll find validation frameworks, confidence scoring patterns, and guardrails that prevent pipeline failures like the £203,000 cruise pricing error. Your agents need robust data quality controls.

**3. Business Leaders & Decision Makers**
CTOs, CMOs, and executives who need to understand the strategic shift. You don't need to write the code, but you do need to understand why "silent conversion failures" are happening and how to resource the fix. Chapters 4, 5, and 9 are written specifically for you.

**4. Partners & Investors**
Agencies looking to offer new services and investors evaluating the next phase of web evolution. The methodology described here creates a new category of professional services—audit, remediation, and certification—that will likely dominate web development discussions for the next decade.

---

## Acknowledgements

This book exists because problems became visible when I looked closely at failures I'd typically have ignored. I'm grateful to everyone who has written about web accessibility over the past two decades; their work laid the foundations on which this analysis builds.

Thank you to the colleagues, clients, and collaborators who reviewed early drafts and asked uncomfortable questions. Several sections exist because someone said "but what about..." and I realised I hadn't thought it through.

I've worked on the web since its early days. Every project taught me something about what users actually do versus what we assume they'll do. Those lessons appear throughout this book, even when I can't trace them to specific sources.

---

## How to Navigate This Book

The chapters build sequentially, but you don't need to read everything with equal depth.

### Reading Path for Business Leaders

You need strategic understanding without technical implementation details.

**Read in full:**

- Chapter 1: What You Will Learn (foundation and context)
- Chapter 4: The Business Reality (economics and incentives)
- Chapter 5: The Content Creator's Dilemma (advertising model implications)
- Chapter 7: The Legal Landscape (liability and policy questions)
- Chapter 8: The Human Cost (access and equity implications)
- Chapter 9: Designing for Both (first half - strategic frameworks)

**Skim for understanding:**

- Chapter 2: The Invisible Failure (understand the problem without technical depth)
- Chapter 3: The Architectural Conflict (understand why this is hard)

**Delegate to teams:**

- Chapter 6: The Security Maze (your security team)
- Chapter 10: Technical Advice (your development team)
- Chapter 11: What Agent Creators Must Build (if evaluating agent partnerships)

Look for "Key Points for Business Leaders" boxes at the end of Chapters 2, 3, 4, 5, 7, and 8.

**Expected time:** 3-4 hours

### Reading Path for Product Managers and Designers

You need to understand the problem deeply, grasp business context, and implement solutions.

**Read in full:**

- Chapter 1: What You Will Learn (foundation)
- Chapter 2: The Invisible Failure (specific patterns that break)
- Chapter 3: The Architectural Conflict (why design decisions matter)
- Chapter 4: The Business Reality (commercial implications)
- Chapter 5: The Content Creator's Dilemma (content strategy)
- Chapter 9: Designing for Both (solution patterns)
- Chapter 10: Technical Advice (implementation approaches)
- Chapter 11: What Agent Creators Must Build (if designing agent features)

**Skim for context:**

- Chapter 6: The Security Maze (understand constraints)
- Chapter 7: The Legal Landscape (understand boundaries)
- Chapter 8: The Human Cost (broader impact)

Focus on decision frameworks in Chapters 4, 5, and 7. Chapter 3 will change how you see design trade-offs.

**Expected time:** 5-6 hours

### Reading Path for Developers

You need implementation patterns and technical depth.

**Start with:**

- Chapter 10: Technical Advice (immediate patterns and code examples for websites)
- Chapter 11: What Agent Creators Must Build (validation layers and guardrails for agents)

**Then work backwards:**

- Chapter 9: Designing for Both (strategic patterns)
- Chapter 6: The Security Maze (authentication and access control)
- Chapter 2: The Invisible Failure (what's breaking and why)
- Chapter 3: The Architectural Conflict (design perspective)

**For business case:**

- Chapter 4: The Business Reality (commercial arguments)
- Chapter 5: The Content Creator's Dilemma (revenue model challenges)
- Chapter 8: The Human Cost (human impact)

Use the implementation checklist and code examples. There's a glossary at the end - some terms have specific meanings here.

**Expected time:** 4-5 hours

### Reading Path for Agent System Developers

You're building AI agents, browser extensions, or agentic systems that interact with websites. You need validation frameworks and guardrails.

**Start with:**

- Chapter 11: What Agent Creators Must Build (validation layers, confidence scoring, pipeline failure prevention)

**Essential context:**

- Chapter 2: The Invisible Failure (what breaks for agents and why)
- Chapter 3: The Architectural Conflict (website design patterns your agents will encounter)

**Implementation patterns:**

- Chapter 10: Technical Advice (website-side patterns your agents should expect)

**Business context:**

- Chapter 4: The Business Reality (commercial pressures affecting website design)
- Chapter 6: The Security Maze (authentication challenges for agents)

Focus on the £203,000 cruise pricing case study (Appendix I) - it demonstrates exactly why validation layers, comparative analysis, and confidence scoring are essential. Your agents will encounter malformed data, ambiguous HTML, and incomplete information. Chapter 11 provides the frameworks to handle these gracefully.

**Expected time:** 2-3 hours

### Reading Path for Small Business Owners

You need to determine if this matters for your business and what to do about it.

**Read in full:**

- Chapter 1: What You Will Learn (understand the problem)
- Chapter 4: The Business Reality (use the decision tree)

**Focus on:**

- Small business sections in Chapter 9 (practical actions)

**Optional:**

- Chapter 2 (if you want technical understanding)
- Chapter 8 (if you care about broader access implications)

Many relationship-based local businesses can safely deprioritise this. The decision tree in Chapter 4 and the Executive Summary will help you determine your priority level.

**Expected time:** 1-2 hours

### Other Navigation Aids

**Interactive Companion**: An interactive notebook version is available at [allabout.network/invisible-users.html](https://allabout.network/invisible-users.html) with visual comparisons, interactive data tables, and direct chapter links. Time to complete: 60-75 minutes.

**Glossary**: Technical terms are defined at the end of the book. Some terms have specific meanings in this context that differ from casual usage.

**Sequential Reading**: If you have time, read the chapters in order. Each builds on concepts introduced earlier.

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
