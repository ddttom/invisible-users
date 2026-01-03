# The Book I'm Writing About Websites That Work Perfectly - Until They Don't

I'm writing a book called "The Invisible Users: Designing the Web for AI Agents and Everyone Else." I expect to finish it in Q1 2026. This is what it's about, and why I think it matters.

---

## How It Started

Late 2024. I was planning a trip to Southeast Asia and did what most of us do now: I asked an AI assistant to research tour operators for me.

It gave me confident recommendations. Clear comparisons. Specific advice about which company offered the better itinerary.

The advice was wrong.

Not wrong because the AI hallucinated. Wrong because it had only seen Day 1 of a 14-day tour. One operator had put their itinerary on multiple pages. The other had put everything on a single page. My assistant had compared a single day against a full fortnight and concluded the shorter trip was better value.

I caught the mistake because I double-checked. But I realised: most people wouldn't. They'd trust the recommendation, make a booking, and only discover the problem later.

That's when I started paying attention to what was actually happening when AI agents visited websites.

## What I Found

AI agents are already browsing the web. But they're not all doing it the same way.

**ChatGPT and cloud-based AI services** fetch your pages from their servers. They see static HTML, no JavaScript execution, no authenticated sessions. They're like search engines, but trying to understand and interact rather than just index.

**Browser-based AI agents** run full browsers with JavaScript. They can click buttons, fill forms, see dynamic content. But they still can't see visual feedback - colour changes, animations, toast notifications. They parse the DOM, not the rendered pixels.

**Local AI assistants** running on your device might have network access, might not. Some can execute JavaScript, some can't. They're working with whatever your machine can provide, which might be less than you think.

**Browser extension AI assistants** like the ChatGPT sidebar or Claude extension inherit your authenticated session. They can see everything you can see as a logged-in user. But they still can't interpret visual design cues. They read attributes and text content, not colours and positioning.

Each type has different capabilities. Each fails in different ways. And you need to design for all of them, because you can't predict which type your users will choose.

That's the uncomfortable reality: we're no longer designing for one type of user with one type of browser. We're designing for humans with eyes, screen reader users without sight, and multiple species of AI agents with varying capabilities.

They all fail constantly.

Not loudly. Not with error messages. They just... quietly get things wrong, misunderstand what they're seeing, or give up and report success when they've actually failed.

Your analytics won't show it. Your error logs won't catch it. Your users might not even notice until something goes wrong later.

## It's Not the AI's Fault

Here's the thing: your website works perfectly for humans. The form looks great. The checkout flow is smooth. The product comparison is clear. You've done everything right.

But you've done everything right for people with eyes.

**What a human sees:**

- Button turns from grey to blue when form is complete
- Green checkmark appears next to validated fields
- Toast notification confirms "Item added to cart"
- Progress bar shows "Step 2 of 3"

**What an AI agent sees:**

- HTML button element (no information about colour)
- HTML input field (no indication validation passed)
- Page that looks identical to previous page
- Page that looks identical to previous page

The visual feedback that makes your interface intuitive for humans is invisible to agents. They're parsing HTML and attributes. They can't see that the button changed colour. They don't know the checkmark appeared. They can't tell whether the action succeeded.

## The Uncomfortable Connection

As I researched this problem, I kept finding the same pattern: the design choices that confused AI agents were the exact same choices that had been creating problems for disabled users for years.

- Toast notifications that vanish before screen readers announce them
- Pagination that hides content from search engines
- Progress indicators shown only through visual design
- Error messages that appear and disappear without persisting in the HTML
- State changes communicated through CSS classes but not through attributes

Accessibility advocates have been pointing out these problems for decades. We didn't fix them because there wasn't enough commercial pressure.

Now AI agents are struggling with the same patterns, and suddenly there's business pressure to fix things.

That's both frustrating and hopeful.

## Why This Matters for Businesses

You might think: "AI agents are a tiny fraction of my traffic. Why should I care?"

Three reasons.

**First:** That fraction is growing fast. Companies are building agent-first products right now. Shopping assistants that compare prices. Booking agents that handle travel. Task automation that completes repetitive workflows. If your competitors make their sites work for agents first, they get those transactions. All of them.

And here's what most people don't realise: agents learn. When an agent successfully completes a task on your site, it remembers that your site works. When it fails on a competitor's site, it remembers that too. The agent won't keep trying sites that have failed before. It'll return to the sites that worked.

This creates a first-mover advantage that's difficult to overcome. Fix your site now, and agents will prefer you. Wait until your competitors have fixed theirs, and you're fighting to be reconsidered by agents that have already learned to avoid you.

**Second:** When an agent makes a purchase on someone's behalf, you lose your customer relationship. The loyalty points go to the agent. The purchase history doesn't exist. The warranty becomes unregistrable. Your customer acquisition cost goes to zero value.

**Third:** Everything that breaks for agents also breaks for some humans. You're not just optimising for AI. You're fixing problems that have been affecting real people all along.

## What I'm Writing About

The book covers the technical failures, business implications, and practical solutions. Early chapters explain what's breaking and why. Middle chapters explore the consequences - what happens to business models, content creators, security assumptions, legal frameworks, and who gets left behind. Final chapters provide working solutions and implementation code.

But more than that, it's about understanding the assumptions we've built into web design, and recognising that those assumptions don't serve everyone equally. AI agents are just the lens that makes existing problems visible.

I'm not writing about distant possibilities. I'm writing about what's happening right now, whilst it's still early enough to fix things before they become serious problems.

## The Solutions Are Simpler Than You Think

You don't need to rebuild everything. You don't need a separate mobile-style interface for agents. You don't need to detect and route traffic differently.

You just need to make implicit state explicit.

Instead of communicating form validity through button colour, add a `disabled` attribute and a `data-form-state` attribute. Same visual design. Same user experience. But now the state is machine-readable.

Instead of showing errors in toast notifications that vanish after three seconds, show them in a persistent error summary at the top of the page. Screen readers can announce it. Agents can see it. Users have time to read it.

Instead of hiding pricing behind multiple clicks, show the complete price upfront. This isn't dumbing down your interface. It's making your excellent design work for more people.

## Who This Is For

If you build websites, this book will show you which patterns create invisible barriers and how to fix them without compromising design.

If you make product decisions, this book will help you understand the business implications and strategic choices around agent compatibility.

If you use AI agents, this book will help you understand when and where they're reliable, and when you need to verify what they've done.

If you care about accessibility, this book will make the case that commercial pressure from AI agents might finally force fixes that benefit everyone.

## Why I'm Writing It Now

I'm writing this during the transition period. After the problem has emerged, before solutions have standardised.

In two years, there will be more competition. In five years, agent compatibility will be as routine as mobile responsiveness. The knowledge will be commoditised.

But right now, it's not. Right now, most businesses don't know this is affecting them. Most developers haven't thought about it. Most users don't realise the advice they're getting from AI agents is sometimes based on misunderstandings.

This is the window when understanding the problem creates advantage. This is when you can fix things whilst they're still simple, before they become expensive technical debt.

## The Window Is Closing

I expect to finish the book in Q1 2026. By then, agent traffic will be more visible. More businesses will be aware of the problem. More solutions will be standardised.

But you don't need to wait for the finished book to start thinking about this. You can:

- Check your most important conversion paths with a screen reader (if they don't work there, they won't work for agents)
- Look for state changes that are only communicated visually
- Ask whether your forms provide explicit feedback about validation
- Consider whether your pricing is hidden behind clicks
- Think about what happens to your customer relationship when agents transact on behalf of users

These aren't theoretical problems. They're affecting conversion rates right now. Your competitors are probably unaware too, which means there's advantage in acting early.

## What Happens Next

The book is nearly complete. I'm refining chapters, adding examples, and making sure the technical advice is practical and implementable.

I'll share more as I get closer to publication. If you want to know when it's available, or if you'd like to be involved in early review, let me know.

In the meantime: look at your website through the lens of someone who can only see the HTML. What information are you communicating through colour, position, animation, or timing? What assumptions are you making about how users perceive your interface?

Those assumptions are probably breaking things for more people than you realise.

---

Tom Cranstoun

Writing from York, England

December 2025

If you'd like to follow progress on this book or discuss agent-compatible design, you can find me at allabout.network or on LinkedIn.
