---
title: "GitHub Repositories Inventory"
author: "Tom Cranstoun"
date: "2026-01-21"
description: "Complete inventory of all GitHub repositories from ddttom and Digital-Domain-Technologies-Ltd organizations"
keywords: [github, repositories, inventory, ddttom, digital-domain-technologies]
ai-instruction: |
  This file is an automatically generated inventory of GitHub repositories.

  To regenerate this file, use the following commands:

  1. Fetch repository data from both GitHub accounts:
     ```bash
     gh repo list ddttom --json name,description,updatedAt --limit 100 > /tmp/ddttom-repos.json
     gh repo list Digital-Domain-Technologies-Ltd --json name,description,updatedAt --limit 100 > /tmp/digital-domain-repos.json
     ```

  2. Combine, sort, and format as markdown table:
     ```bash
     node -e "
     const ddttom = $(cat /tmp/ddttom-repos.json);
     const digital = $(cat /tmp/digital-domain-repos.json);

     // Add owner info
     ddttom.forEach(r => r.owner = 'ddttom');
     digital.forEach(r => r.owner = 'Digital-Domain-Technologies-Ltd');

     // Combine and sort by updatedAt (newest first)
     const all = [...ddttom, ...digital].sort((a, b) =>
       new Date(b.updatedAt) - new Date(a.updatedAt)
     );

     // Format as markdown table with YAML frontmatter
     console.log('---');
     console.log('title: \"GitHub Repositories Inventory\"');
     console.log('author: \"Tom Cranstoun\"');
     console.log('date: \"' + new Date().toISOString().split('T')[0] + '\"');
     console.log('[... rest of frontmatter ...]');
     console.log('---');
     console.log('');
     console.log('Complete list of repositories from ddttom and Digital-Domain-Technologies-Ltd organizations, sorted by last modified date.');
     console.log('');
     console.log('');
     console.log('| Repository | Owner | Description | Last Modified |');
     console.log('|------------|-------|-------------|---------------|');

     all.forEach(repo => {
       const name = repo.name;
       const owner = repo.owner === 'Digital-Domain-Technologies-Ltd' ? 'DDT' : repo.owner;
       const desc = (repo.description || '').replace(/\|/g, '\\\\|').substring(0, 100);
       const date = new Date(repo.updatedAt).toISOString().split('T')[0];
       const url = \`https://github.com/\${repo.owner}/\${repo.name}\`;
       console.log(\`| [\${name}](\${url}) | \${owner} | \${desc} | \${date} |\`);
     });
     " > docs/scrapbook/github-repositories.md
     ```

  Requirements:
  - GitHub CLI (gh) must be installed and authenticated
  - Node.js must be available
  - User must have access to both GitHub accounts/organizations

  The script fetches live data from GitHub API, combines repositories from both accounts,
  sorts by last modified date (newest first), and generates a markdown table with clickable links.

  Total repositories will vary as repos are added/archived over time.
---

Complete list of repositories from ddttom and Digital-Domain-Technologies-Ltd organizations, sorted by last modified date.

| Repository | Owner | Description | Last Modified |
|------------|-------|-------------|---------------|
| [invisible-users-outputs](https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-outputs) | DDT | Generated content and materials for The Invisible Users book series - blogs, presentations, marketin | 2026-01-21 |
| [invisible-users](https://github.com/ddttom/invisible-users) | ddttom |  | 2026-01-21 |
| [MX-The-Handbook](https://github.com/Digital-Domain-Technologies-Ltd/MX-The-Handbook) | DDT | MX-The Handbook: Designing Web Interfaces for AI Agents - Practical implementation guide | 2026-01-21 |
| [invisible-users-slim](https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-slim) | DDT | Don't Make AI Think: Designing Web Interfaces for AI Agents - Practical implementation guide | 2026-01-21 |
| [invisible-users-bible](https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-bible) | DDT | The Invisible Users: Designing the Web for AI Agents and Everyone Else - Full comprehensive guide | 2026-01-21 |
| [invisible-users-appendices](https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-appendices) | DDT | Shared appendices for The Invisible Users book series - Implementation guides, patterns, resources | 2026-01-21 |
| [Notes](https://github.com/ddttom/Notes) | ddttom | My notes | 2026-01-21 |
| [invisible-users-code-examples](https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-code-examples) | DDT | AI-friendly web patterns - Code examples demonstrating good vs bad implementations | 2026-01-19 |
| [invisible-users-manuscript](https://github.com/Digital-Domain-Technologies-Ltd/invisible-users-manuscript) | DDT |  | 2026-01-19 |
| [allaboutv2](https://github.com/ddttom/allaboutv2) | ddttom | allabout | 2026-01-16 |
| [webcomponents-with-eds](https://github.com/ddttom/webcomponents-with-eds) | ddttom | A collection of lightweight, high-performance web components built with vanilla JavaScript and moder | 2026-01-14 |
| [ucp](https://github.com/ddttom/ucp) | ddttom | Specification and documentation for the Universal Commerce Protocol (UCP) | 2026-01-12 |
| [invisible-users-manuscript](https://github.com/ddttom/invisible-users-manuscript) | ddttom | Manuscript for invisible users book | 2026-01-09 |
| [my-pa11y-project](https://github.com/ddttom/my-pa11y-project) | ddttom | A11LY PROJECT | 2026-01-05 |
| [book](https://github.com/ddttom/book) | ddttom |  | 2025-12-28 |
| [identity-layer](https://github.com/ddttom/identity-layer) | ddttom |  | 2025-12-24 |
| [mac-blueprint](https://github.com/ddttom/mac-blueprint) | ddttom |  | 2025-12-19 |
| [saas-contractor](https://github.com/ddttom/saas-contractor) | ddttom |  | 2025-12-14 |
| [calendar-sidebar](https://github.com/ddttom/calendar-sidebar) | ddttom |  | 2025-12-14 |
| [bun-scripts](https://github.com/ddttom/bun-scripts) | ddttom |  | 2025-12-13 |
| [cloudflare-worker](https://github.com/ddttom/cloudflare-worker) | ddttom |  | 2025-12-13 |
| [ai-with-mac](https://github.com/ddttom/ai-with-mac) | ddttom | Introduction to AI with Mac | 2025-12-10 |
| [aem-worker](https://github.com/ddttom/aem-worker) | ddttom |  | 2025-12-09 |
| [helix-website](https://github.com/ddttom/helix-website) | ddttom | The Helix website https://www.aem.live/ | 2025-12-08 |
| [prompt-master](https://github.com/ddttom/prompt-master) | ddttom | master prompt library | 2025-12-07 |
| [bun-docs](https://github.com/ddttom/bun-docs) | ddttom | Incredibly fast JavaScript runtime, bundler, test runner, and package manager – all in one | 2025-12-05 |
| [fixEcalendar](https://github.com/ddttom/fixEcalendar) | ddttom |  | 2025-12-05 |
| [iCal](https://github.com/ddttom/iCal) | ddttom |  | 2025-12-03 |
| [Zettel](https://github.com/ddttom/Zettel) | ddttom | My zetteel repository  | 2025-11-30 |
| [plusplus](https://github.com/Digital-Domain-Technologies-Ltd/plusplus) | DDT | Helix/Frankline/Edge PlusPlus | 2025-11-29 |
| [edgeservices](https://github.com/ddttom/edgeservices) | ddttom | testing aem edge services | 2025-11-29 |
| [projectX](https://github.com/ddttom/projectX) | ddttom |  | 2025-11-29 |
| [usb-cleaner](https://github.com/ddttom/usb-cleaner) | ddttom |  USBCleaner is a lightweight macOS utility designed to help you keep your USB drives clean and free  | 2025-11-27 |
| [AI-Web-Browser](https://github.com/ddttom/AI-Web-Browser) | ddttom | macOS AI-enhanced web browser built with SwiftUI and Apple MLX | 2025-11-21 |
| [author-kit](https://github.com/ddttom/author-kit) | ddttom | Powerfully simple authoring for Edge Delivery | 2025-11-14 |
| [cc-trace](https://github.com/ddttom/cc-trace) | ddttom | Claude Code CLI skill: Interactive assistant for intercepting, debugging, analyzing and reviewing Cl | 2025-11-09 |
| [skills](https://github.com/ddttom/skills) | ddttom | Public repository for Skills | 2025-11-05 |
| [homehub](https://github.com/ddttom/homehub) | ddttom | A lightweight, no-login, self-hosted family utility for your home. | 2025-10-07 |
| [photoviewer](https://github.com/ddttom/photoviewer) | ddttom | photoviewer | 2025-10-06 |
| [advanced-cdn](https://github.com/ddttom/advanced-cdn) | ddttom |  | 2025-10-02 |
| [react-with-eds](https://github.com/ddttom/react-with-eds) | ddttom |  | 2025-09-09 |
| [geo-images](https://github.com/ddttom/geo-images) | ddttom |  | 2025-08-29 |
| [adjuster](https://github.com/ddttom/adjuster) | ddttom | A Photo Adjuster | 2025-08-05 |
| [mlx-llm-tutorial](https://github.com/ddttom/mlx-llm-tutorial) | ddttom | A tutorial on Apple MLX and LLM | 2025-08-02 |
| [spectrum-with-eds](https://github.com/ddttom/spectrum-with-eds) | ddttom |  | 2025-06-19 |
| [spa-with-eds](https://github.com/ddttom/spa-with-eds) | ddttom |  | 2025-06-10 |
| [vue-with-eds](https://github.com/ddttom/vue-with-eds) | ddttom |  | 2025-06-10 |
| [doc2web](https://github.com/ddttom/doc2web) | ddttom | create a web page from a docx | 2025-06-04 |
| [mirror](https://github.com/ddttom/mirror) | ddttom | flip images horizontally | 2025-05-28 |
| [mitm](https://github.com/ddttom/mitm) | ddttom |  | 2025-05-16 |
| [icann](https://github.com/ddttom/icann) | ddttom |  | 2025-05-15 |
| [scraper](https://github.com/ddttom/scraper) | ddttom | a simple web scraper that create a doc that collects data from specified websites and formats it int | 2025-05-13 |
| [CodeProject.AI-Server](https://github.com/ddttom/CodeProject.AI-Server) | ddttom | CodeProject.AI Server is a self contained service that software developers can include in, and distr | 2025-03-13 |
| [ContentID](https://github.com/ddttom/ContentID) | ddttom | Content ID POC | 2025-01-29 |
| [fzf-tab](https://github.com/ddttom/fzf-tab) | ddttom | Replace zsh's default completion selection menu with fzf! | 2025-01-07 |
| [pim](https://github.com/ddttom/pim) | ddttom | pim | 2024-12-31 |
| [parser](https://github.com/ddttom/parser) | ddttom | Text Parser | 2024-12-29 |
| [block-ai](https://github.com/ddttom/block-ai) | ddttom |  | 2024-12-18 |
| [ExpressServer](https://github.com/ddttom/ExpressServer) | ddttom | Express Server | 2024-12-13 |
| [bg-remove](https://github.com/ddttom/bg-remove) | ddttom | remove background | 2024-12-09 |
| [photo-show](https://github.com/ddttom/photo-show) | ddttom | photo show | 2024-11-29 |
| [aem-guides-wknd](https://github.com/ddttom/aem-guides-wknd) | ddttom | aem guides wknd project | 2024-11-16 |
| [custom-project](https://github.com/ddttom/custom-project) | ddttom | custom aem | 2024-11-09 |
| [claude-dev](https://github.com/ddttom/claude-dev) | ddttom | Autonomous coding agent right in your IDE, capable of creating/editing files, executing commands, an | 2024-10-09 |
| [myhelp](https://github.com/ddttom/myhelp) | ddttom | Rag Application | 2024-10-07 |
| [bff](https://github.com/Digital-Domain-Technologies-Ltd/bff) | DDT | Backend for FrontEnd | 2024-07-18 |
| [functree](https://github.com/ddttom/functree) | ddttom |  | 2024-07-12 |
| [csc](https://github.com/ddttom/csc) | ddttom |  | 2024-06-29 |
| [cors-anywhere](https://github.com/ddttom/cors-anywhere) | ddttom | CORS Anywhere is a NodeJS reverse proxy which adds CORS headers to the proxied request. | 2024-06-24 |
| [monoplusplus](https://github.com/Digital-Domain-Technologies-Ltd/monoplusplus) | DDT | The mono repo version of plusplus, all configuration done | 2024-06-18 |
| [plusplusconfig](https://github.com/Digital-Domain-Technologies-Ltd/plusplusconfig) | DDT | sample configuration for plusplus | 2024-06-16 |
| [universal-editor-sample-editable-app](https://github.com/ddttom/universal-editor-sample-editable-app) | ddttom |  | 2024-05-25 |
| [plusplustools](https://github.com/Digital-Domain-Technologies-Ltd/plusplustools) | DDT | toolset for plusplus | 2024-05-25 |
| [ABTestingV2](https://github.com/ddttom/ABTestingV2) | ddttom | Testing EDS Experiments | 2024-05-06 |
| [aem-experimentation](https://github.com/ddttom/aem-experimentation) | ddttom | A lightweight Franklin plugin for experimentation and segmentation. | 2024-05-04 |
| [Helix-Importer](https://github.com/ddttom/Helix-Importer) | ddttom | Helix Importer | 2024-05-01 |
| [kabi](https://github.com/ddttom/kabi) | ddttom |  | 2024-04-05 |
| [content-ops-v3-live](https://github.com/ddttom/content-ops-v3-live) | ddttom | content ops live site | 2024-02-26 |
| [contentopsv3](https://github.com/ddttom/contentopsv3) | ddttom | Content OPS v3 | 2024-02-14 |
| [DDT-Boilerplate](https://github.com/ddttom/DDT-Boilerplate) | ddttom | Tom Cranstouns Idel Boilerplate | 2024-02-07 |
| [htmlmaker](https://github.com/ddttom/htmlmaker) | ddttom | Make HTML From Helix | 2024-01-26 |
| [franklin-with-library](https://github.com/ddttom/franklin-with-library) | ddttom | Franklin with Library | 2024-01-26 |
| [GitChat](https://github.com/ddttom/GitChat) | ddttom | Chat with your git repo | 2024-01-23 |
| [wwwtemplator](https://github.com/ddttom/wwwtemplator) | ddttom | toms template engine | 2024-01-23 |
| [aem-ddt](https://github.com/ddttom/aem-ddt) | ddttom |  | 2024-01-23 |
| [try_git](https://github.com/ddttom/try_git) | ddttom |  | 2024-01-10 |
| [pantone](https://github.com/ddttom/pantone) | ddttom | Init Commit | 2023-11-28 |
| [my-s3-upload](https://github.com/ddttom/my-s3-upload) | ddttom | node js app for s3 uploading | 2023-10-04 |
| [starter](https://github.com/ddttom/starter) | ddttom | Sample project built on top of the Websight CMS | 2023-07-29 |
| [aem-guides-wknd-35](https://github.com/ddttom/aem-guides-wknd-35) | ddttom |  | 2022-04-27 |
| [PDFViewer](https://github.com/ddttom/PDFViewer) | ddttom | Created with CodeSandbox | 2022-03-25 |
| [photoInfo](https://github.com/ddttom/photoInfo) | ddttom |  | 2022-03-10 |
| [GPS](https://github.com/ddttom/GPS) | ddttom | Image GPS Settings | 2022-03-10 |
| [qvm-quote-reader](https://github.com/ddttom/qvm-quote-reader) | ddttom | Extract tesxt fromm qvm quote | 2022-01-31 |
| [flutter-folio](https://github.com/ddttom/flutter-folio) | ddttom | A platform adaptive Flutter app for desktop, mobile and web. | 2022-01-05 |
| [mapfollow](https://github.com/ddttom/mapfollow) | ddttom | Sample application to demonstrating the use of GeoLocator to stream your device location and update  | 2021-11-30 |
| [one-click-hugo-cms](https://github.com/ddttom/one-click-hugo-cms) | ddttom |  | 2021-11-24 |
| [pdfmaker5](https://github.com/ddttom/pdfmaker5) | ddttom | create a pdf from a template | 2021-09-28 |
| [json-server](https://github.com/ddttom/json-server) | ddttom | Get a full fake REST API with zero coding in less than 30 seconds (seriously) | 2021-09-18 |
| [ford-ev-accelerator](https://github.com/ddttom/ford-ev-accelerator) | ddttom | POC For ev-accelerator | 2021-09-14 |
| [hacker-stories](https://github.com/ddttom/hacker-stories) | ddttom |  | 2021-09-02 |
| [sling-org-apache-sling-app-cms](https://github.com/ddttom/sling-org-apache-sling-app-cms) | ddttom | Apache Sling - CMS Reference App | 2021-08-29 |
| [PDFMakerMaker](https://github.com/ddttom/PDFMakerMaker) | ddttom |  | 2021-08-04 |
| [PDFMaker4](https://github.com/ddttom/PDFMaker4) | ddttom | PDF Maker | 2021-08-04 |
| [ccp-json-aem](https://github.com/ddttom/ccp-json-aem) | ddttom |  | 2021-07-26 |
| [ccp-json](https://github.com/ddttom/ccp-json) | ddttom | CCP Json | 2021-07-26 |
| [kafka-mocker](https://github.com/ddttom/kafka-mocker) | ddttom |  | 2021-07-14 |
| [PDFMaker](https://github.com/ddttom/PDFMaker) | ddttom | Node js project to make PDFs | 2021-07-09 |
| [MyOrchardCoreCMS](https://github.com/ddttom/MyOrchardCoreCMS) | ddttom | Toms experiment | 2020-12-08 |
| [EfCoreInAction](https://github.com/ddttom/EfCoreInAction) | ddttom | Supporting code to go with the book "Entity Framework Core in Action" | 2020-07-15 |
| [learnjs](https://github.com/ddttom/learnjs) | ddttom | Prepared Workspace for "Serverless Single Page Apps" @ Pragprog | 2019-08-21 |
| [aem-wknd](https://github.com/ddttom/aem-wknd) | ddttom | Aem Weekend Journal | 2018-05-16 |
