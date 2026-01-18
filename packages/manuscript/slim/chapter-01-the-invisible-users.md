# Chapter 1: The Invisible Users

## A visitor you'll never see

Right now, while you're reading this, an AI agent is probably visiting your website. You won't see it in your analytics as a conversion. It won't fill out your contact form. It won't click your call-to-action button. But it might be deciding whether your company gets recommended to its user—or your competitor does.

These visitors don't behave like humans. They don't admire your hero image, they don't notice your carefully crafted colour scheme, and they definitely don't appreciate that clever JavaScript animation you spent three days perfecting. They're reading your site in ways you never designed for, making decisions based on information you didn't realize you were publishing.

Welcome to the era of invisible users.

## Who are they?

When I talk about AI agents, I'm not describing some distant future. I'm talking about systems working right now:

**ChatGPT, Claude, and other conversational AI** that answer questions by searching and reading web content. When someone asks "Which accountancy firm in Manchester specializes in construction companies?" these systems are reading multiple websites and choosing which ones to recommend.

**Voice assistants** that need to extract specific information from your site. "Alexa, what are the opening hours for the museum?" requires structured, parseable content to answer correctly.

**Browser automation agents** that can interact with websites on behalf of users. These can fill forms, make purchases, and compare prices across multiple sites without human intervention.

**Search engine crawlers** that increasingly use AI to understand context and intent. Google's not just counting keywords anymore—it's trying to understand what your page actually means.

**Specialized agents** for travel booking, price comparison, research assistance, and hundreds of other tasks. Each one reading your site differently, looking for different signals.

The critical point: these aren't all the same type of visitor. Some fetch your raw HTML and parse it without ever executing JavaScript. Others run full browsers and can see your site as humans do. Some take screenshots and use vision models to extract information. Many use combinations of these approaches.

## Why this matters (the economic bit)

Let me give you a concrete example from my consulting work.

A client—a global automotive company—spent £2 million on a website redesign. Beautiful work. Won design awards. But when I tested it with AI agents, they couldn't find basic information like dealer locations or service pricing. The data was there, hidden in JavaScript state and visual layouts, but structured in ways that made it invisible to parsers.

Meanwhile, their smaller competitors had basic sites with proper semantic HTML. When someone asked an AI "Where can I get my Land Rover serviced near Birmingham?" the AI confidently recommended the competitors. Not because their sites looked better—they didn't—but because their content was readable.

My client was losing enquiries to companies they should have been beating easily. The invisible users were choosing the competitors.

This pattern repeats across industries:

A law firm with a gorgeous site couldn't get mentioned when AI was asked for "employment lawyers in London" because their practice areas were rendered client-side with no semantic structure.

An e-commerce site lost product comparison visibility because their specifications lived in a JavaScript object, not in marked-up HTML.

A SaaS company's documentation—beautiful to look at—was useless to AI agents trying to help developers integrate their API.

## The shift in traffic sources

For the past 25 years, we've optimized for two sources of traffic: search engines and direct visits. We've built entire industries around SEO and paid search. We've A/B tested our way to better conversion rates for human visitors.

Now there's a third source that's growing rapidly: **AI recommendations**.

When someone asks an AI for help, they're not clicking through ten blue links and comparing options. They're getting one answer, maybe three recommendations. If you're not in that answer, you don't exist.

This isn't speculative. The data is already showing the shift:

- Conversational AI queries are growing exponentially
- Traditional search traffic is plateauing for many sectors
- Voice search (which relies heavily on AI parsing) accounts for increasing mobile queries
- Browser automation is handling routine tasks like price comparison and appointment booking

The visitors you see in your analytics are becoming less representative of the decisions being made about your business.

## The visibility paradox

Here's the strange part: making your site work for AI often makes it better for humans too.

When you structure content semantically—proper headings, meaningful lists, clear relationships between elements—you're not just helping AI parsers. You're helping:

- Screen reader users who navigate by heading structure
- Mobile users who need scannable content
- Busy users who want to find information quickly
- Search engines that reward clarity
- Your own development team who maintain the site

The techniques that make content AI-readable aren't tricks or hacks. They're often just good web development practices that we've been ignoring because we could get away with it. Humans are forgiving. They'll click around, use browser search, even view page source if desperate. AI agents won't. They'll move on to a site that makes information accessible.

## What this book will do

I'm not going to tell you to rebuild your site from scratch. I'm not going to insist you abandon modern frameworks or stop using JavaScript. I'm going to show you how to make your existing site work for both human and AI visitors, because the two audiences have more overlap than you might think.

We'll look at:

- How AI agents actually read and interpret web content
- Practical patterns that work for both audiences
- Simple tests you can run today to see how AI sees your site
- Common mistakes that make you invisible to AI
- Real examples of sites doing this well (and badly)

Most importantly, I'll show you that this isn't another item on an endless checklist of web best practices. This is about remaining visible to users who are increasingly making decisions about your business without you knowing.

## The morning-after test

Steve Krug taught us to watch humans use our sites to find usability problems. I'm suggesting something simpler for AI readability: feed your page to ChatGPT or Claude and ask it questions.

Try this right now:

1. View source on your most important page
2. Copy the HTML (not the rendered version, the actual source)
3. Paste it into ChatGPT or Claude
4. Ask: "What is this page about? What are the main services or products offered? What actions can I take?"

If the AI can't answer accurately, neither can the invisible users visiting your site.

I tested this with a corporate client's homepage. The AI's response: "This appears to be a website but I cannot determine what the company does or what services they offer. I can see some navigation elements and what might be placeholder text."

The actual rendered page was clear to humans. But the content was loaded via JavaScript, the headings were div elements with CSS classes, and the semantic structure was non-existent. To a parser, it was gibberish.

That's a £50 million revenue company, invisible to AI.

## What's next

The rest of this book breaks down into practical sections:

- **Understanding how AI reads** (spoiler: very differently to humans)
- **Content architecture patterns** that work for both audiences
- **Testing and validation** you can do without specialist tools
- **Common problems and solutions** from real sites

Each chapter is short. Each has examples you can implement. And each assumes you're working on a real site with real constraints—budgets, deadlines, legacy code, and stakeholders who care about design.

Because here's the thing: the invisible users don't care about your constraints. They're visiting your site right now, reading it in ways you never intended, and making decisions that affect your business.

It's time to design for them.

---

**Coming up in Chapter 2:** How AI actually reads web pages—and why your beautiful design might be making you invisible.
