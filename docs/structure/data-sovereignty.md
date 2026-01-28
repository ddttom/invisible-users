---
title: "Data Sovereignty and the Web We're Building"
author: "Tom Cranstoun"
date: "2026-01-26"
blog-state: "draft"
blog-filename: "data-sovereignty-web-building"
blog-url: ""
publication-date: ""
description: "Understanding the two meanings of data sovereignty - jurisdiction and control - and why both matter for modern web development"
keywords: [data-sovereignty, GDPR, CCPA, web-development, content-ownership, platform-lock-in]
ai-instruction: "This blog post explains data sovereignty from both jurisdictional (legal/geographic) and control (ownership) perspectives. Focus on practical implications for web developers and content creators."
---

| bio |  |
| :---- | :---- |
| Picture Here | The term "data sovereignty" appears in two very different conversations, and if you're building websites or managing content systems, you need to understand both. |

| index |
| :---- |

## Two Meanings

First meaning: where your data lives determines which laws apply to it. Store customer data on servers in Germany, and German law governs it regardless of where your company operates. Keep it in California, and you're subject to CCPA. This is data sovereignty as jurisdiction.

Second meaning: who controls your data. Can you export it? Can you move it to another platform? Who decides what happens to it? This is data sovereignty as ownership.

Both matter, but for different reasons.

## Jurisdiction Matters More Than You Think

The jurisdictional question isn't just for lawyers. If you're running an e-commerce site or handling customer information, server location affects everything from GDPR compliance to how law enforcement can access your data.

The US CLOUD Act lets American authorities demand data from US companies regardless of where it's stored. GDPR gives EU regulators power over any data about EU citizens. China, Russia, and India require certain data types to stay within their borders.

Cloud providers now offer region-specific data centres specifically for this reason. You choose where data lives, not just for performance but for legal protection.

This gets complicated fast. Medical data in the UK follows NHS requirements. Financial records face different rules in different countries. Most organisations need legal advice here, not technical expertise.

## Control Problem

But the second meaning - who controls your data - hits closer to home for most web professionals.

When you store content in someone else's platform, you accept their terms. They can change pricing. They can modify features. They can shut down entirely. Your data exists at their discretion.

Getting data out can be deliberately difficult. Many platforms make it easy to import content but provide minimal export functionality. Some use proprietary formats that lock you in. Others limit what you can extract through their APIs.

This creates real business risk. What happens when your CMS vendor doubles their prices? What if they drop a feature your site depends on? What if they go bankrupt?

The answer should be: you move to another platform. But if your data is trapped in proprietary formats or scattered across multiple systems with no clean export path, you're stuck.

## Self-Hosting Response

This has driven renewed interest in self-hosting and open source. Run your own servers, control your own data, answer to nobody but yourself.

It works. You own the infrastructure. You set the backup schedule. You choose when to upgrade. Nobody can change the rules on you.

But it requires resources. Someone needs to manage those servers, handle security updates, ensure backups run properly, deal with hardware failures. For many organisations, the overhead isn't worth it.

The middle ground is choosing platforms that respect data portability. Look for:

- Standard export formats
- Well-documented APIs
- Clear data ownership terms
- No vendor lock-in through proprietary formats
- Ability to run backups independently

GDPR actually mandates this for EU citizens. The right to data portability means platforms must provide your data in a structured, machine-readable format that works with other services.

## What This Means for Machine Experience

Here's where this connects to how we build websites.

Machine Experience - designing for AI agents as well as humans - has implications for data sovereignty. When you structure content properly, when you use semantic markup, when you make data machine-readable, you're making it portable.

An AI agent that can parse your content structure can also help you migrate that content. A well-structured website using standard HTML, proper schema markup, and clear data relationships is far easier to move than a proprietary system with custom formats.

If Claude or ChatGPT can understand your site structure well enough to answer questions about it, that same structure makes data extraction straightforward. Good MX is good data portability.

The docs/for-ai approach I've been developing works both ways. Documentation that helps AI assistants understand your system also helps humans migrate away from it if needed. Clear structure, explicit relationships, semantic markup - these serve both purposes.

## AI Sovereignty Question

There's a third aspect emerging: who controls the AI models that process your data?

When you send content to ChatGPT or Claude, where does that data go? Who has access? What happens to it? These are sovereignty questions too.

Some organisations now require AI processing to happen locally or within specific jurisdictions. They want models running on their infrastructure, not external services. This is digital sovereignty extended to AI.

The recent launches from companies like IBM Sovereign Core and similar initiatives show this isn't theoretical. Organisations want AI capabilities without losing control over where processing happens or who can access the data.

For web developers and content managers, this means considering:

- Where AI-enhanced features send data
- Whether you can run equivalent processing locally
- What data you're sharing with third-party AI services
- Who has access to the results

## Practical Steps

If data sovereignty matters to your organisation - and increasingly, it does - here's where to start:

Know where your data lives. Not just which provider, but which physical region. This determines legal jurisdiction.

Understand your export options before you need them. Can you get a complete backup in usable formats? Test the process.

Read the contracts. Who owns the data? What rights does the platform claim? What happens when you leave?

Choose platforms that support standard formats. Proprietary systems create lock-in whether intentional or not.

Build with portability in mind. Even if you're not planning to move platforms, structure content and data so that migration would be possible.

For AI features, understand the data flow. Where does processing happen? Can you run it locally if needed? What data leaves your control?

## Connection to MX

I'm finishing two books on Machine Experience that launch in April. One of the patterns I keep seeing: websites built for machine comprehension are also built for data sovereignty.

When you make structure explicit, when you use standard semantic markup, when you document relationships clearly - you're not just helping AI agents understand your content. You're making your data portable, accessible, and yours.

Good MX means Claude or ChatGPT can help users find information on your site. It also means you can extract, migrate, and control that information when you need to.

Data sovereignty and Machine Experience aren't separate concerns. They're two aspects of building systems that work well in a world where both humans and AI agents interact with your content.

The websites that handle this well will have clean structure, semantic markup, clear documentation, and straightforward data models. They'll work for screen readers, search engines, AI agents, and migration tools - all for the same reason.

Structure is freedom. Make it machine-readable and you make it portable.

---

| fragment |
| :---- |
| /fragments/ddt/proposition |

| Section metadata |  |
| :---- | :---- |
| style | bg-dark |

---

Related Articles

| Blogroll |
| :---- |

##

| Blogroll (compact) |
| :---- |

|remove-icon-styles|
| :---- |

| code-expander |
| :---- |

| returntotop |
| :---- |
| Back to Top |

| metadata |  |
| :---- | :---- |
| title | Data Sovereignty and the Web We're Building |
| description | Understanding jurisdictional and ownership aspects of data sovereignty for web professionals building modern content systems. |
| jsonld | article |
| image |  |
| author | Tom Cranstoun |
| longdescription | Data sovereignty has two distinct meanings that matter for web professionals. The first concerns jurisdiction - where your data lives determines which laws apply to it. The second concerns control - who decides what happens to your data and whether you can move it. This article explores both aspects, examining how they connect to Machine Experience design, AI processing sovereignty, and practical steps for maintaining data portability. As AI agents become more involved in content management, the relationship between machine-readable structure and data sovereignty becomes increasingly important for anyone building or managing web systems. |
| LinkedIn | <https://www.linkedin.com/in/tom-cranstoun/> |
| publication-date | 24/Jan/2025 |
