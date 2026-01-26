Below is a clean, publication‑ready **Markdown blog post with proper metadata**, written so you can drop it straight into any MX‑aligned publishing system, static site generator, or Git‑based workflow.

I’ve kept the metadata intentionally universal: YAML frontmatter, JSON‑LD, and a lightweight XMP block. You can extend or adapt it to your MX standards whenever you like.

---

```markdown
---
title: "Installing Clawdbot on macOS Without Losing Your Mind"
subtitle: "A human-friendly guide to getting Clawdbot + Ollama running locally"
author: "Tom Cranstoun"
date: "2026-01-25"
version: "1.0.0"
tags:
  - clawdbot
  - ollama
  - macos
  - agents
  - local-ai
  - mx
description: "A simple, frustration-free guide to installing Clawdbot on macOS, connecting it to Ollama, and getting your first local agent running."
canonical_url: "https://example.com/blog/clawdbot-macos-install"
license: "CC BY-SA 4.0"
---

<!--
XMP Metadata (for PDFs or MX publishing pipelines)
<rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/">
  <dc:title>Installing Clawdbot on macOS Without Losing Your Mind</dc:title>
  <dc:creator>Tom Cranstoun</dc:creator>
  <dc:description>A simple, frustration-free guide to installing Clawdbot on macOS, connecting it to Ollama, and getting your first local agent running.</dc:description>
  <dc:subject>Clawdbot, Ollama, macOS, Local AI, Agents, MX</dc:subject>
</rdf:Description>
-->

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Installing Clawdbot on macOS Without Losing Your Mind",
  "author": {
    "@type": "Person",
    "name": "Tom Cranstoun"
  },
  "datePublished": "2026-01-25",
  "description": "A simple, frustration-free guide to installing Clawdbot on macOS, connecting it to Ollama, and getting your first local agent running.",
  "keywords": ["clawdbot", "ollama", "macos", "local ai", "agents", "mx"]
}
</script>

# Installing Clawdbot on macOS Without Losing Your Mind

Clawdbot is powerful, local‑first, and wonderfully hackable — but the installation experience can feel like you’ve accidentally joined a secret engineering cult. This guide cuts through the noise and gets you from *zero* to *“my agent is alive”* with the least possible friction.

If you’re using **Ollama** on macOS, this is the smoothest path you’ll find.

---

## 1. Install Clawdbot

Open your terminal and run:

```sh
curl -fsSL https://get.clawd.bot | sh
```

Confirm it installed:

```sh
clawdbot --version
```

If you see a version number, you’re good.

---

## 2. Start the onboarding wizard

Run:

```sh
clawdbot onboard
```

This wizard sets up:

- your workspace  
- your gateway  
- your model configuration  
- optional messaging channels  

You’ll see a lot of options, but here’s the trick that saves you 20 minutes of confusion.

---

## 3. When asked for a “Model/Auth Provider,” choose:

```
Skip for now
```

Why?  
Because you’re going to use **Ollama**, not a cloud provider.

This step is only for OpenAI, Anthropic, Groq, etc.

---

## 4. Ignore the giant list of cloud models

Clawdbot will show you a huge list of Amazon Bedrock, OpenAI, and Anthropic models.

Choose:

```
Keep current (default)
```

This is just a placeholder. You’ll switch to your local model later.

---

## 5. Finish onboarding

Clawdbot will:

- create your config  
- open the dashboard  
- attempt to start the gateway  

If you see a “gateway closed (1006)” message, don’t worry — it’s normal on macOS.

---

## 6. Start the gateway manually

Run:

```sh
clawdbot gateway --force
```

You’ll know it’s working when you see:

```
listening on ws://127.0.0.1:18789
```

Your dashboard tab will now connect properly.

---

## 7. Switch to your local Ollama model

Open the Terminal UI:

```sh
clawdbot tui
```

Inside the TUI:

- press **m** for Models  
- choose **Local (Ollama)**  
- select your model (e.g., `llama3`, `mistral`)  
- set it as default  

Your header should now show something like:

```
local/llama3
```

You’re now running fully local.

---

## 8. Start chatting with your agent

You can talk to your agent in two ways:

### Terminal UI  
```sh
clawdbot tui
```

### Dashboard  
Refresh the tab Clawdbot opened during onboarding.

---

## 9. Optional: connect WhatsApp, Telegram, or iMessage

Clawdbot can live inside your messaging apps.

To add a channel:

```sh
clawdbot channels login
```

Follow the prompts.

---

## 10. Optional: enable web search

If you want your agent to search the web, you’ll need a Brave Search API key.

Configure it with:

```sh
clawdbot configure --section web
```

Paste your key when prompted.

---

# 🎉 You’re done

You now have:

- a running Clawdbot gateway  
- a local Ollama model powering your agent  
- a working dashboard  
- a TUI for fast interaction  
- optional messaging channels  

And you didn’t have to decipher a single Node stack trace.

---

If you want, I can also prepare a **short “Quick Start” version**, a **diagram of the architecture**, or a **version tailored for the MX Bible**.