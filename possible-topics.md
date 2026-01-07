# Possible Topics for Future Content

This list contains potential topics that were previously in appendix-live-llms.txt but don't yet have corresponding articles. These could serve as ideas for future blog posts, guides, or documentation.

## Core AI & LLM Topics

- **AI Agents & Context Delivery**: Building AI-native websites that agents can discover, understand, and interact with. Covers llms.txt, OASF, and programmable indexes.
- **LLM Integration Patterns**: Best practices for delivering context to Large Language Models. Token optimization, semantic chunking, and retrieval-augmented generation.
- **Model Context Protocol (MCP)**: Enterprise AI integration using Anthropic's MCP standard. Server implementation, security, and tool definitions.
- **AI-Native Content Architecture**: Designing information architectures for both humans and AI agents. Structured data, metadata strategies, and discovery protocols.
- **Token Efficiency Strategies**: Reducing LLM costs through intelligent context delivery. Compression techniques, relevance scoring, and caching patterns.

## Developer Documentation

- **EDS Block Development Guide**: Comprehensive tutorial on building vanilla JavaScript blocks for Adobe Edge Delivery Services. Covers lifecycle, styling, and Web Components.
- **Performance Optimization**: Achieving sub-100ms response times. Lazy loading, code splitting, image optimization, and Core Web Vitals.
- **JavaScript Best Practices**: Modern vanilla JavaScript patterns for EDS. No framework overhead, semantic HTML, progressive enhancement.
- **Testing & Quality Assurance**: CI/CD for EDS projects. Unit testing, integration testing, visual regression, and performance monitoring.
- **Debugging EDS Applications**: Tools and techniques for troubleshooting EDS implementations. Browser DevTools, network analysis, and logging strategies.
- **CSS Architecture for EDS**: Maintainable styling patterns. BEM methodology, CSS custom properties, and responsive design.
- **API Integration Patterns**: Connecting EDS to external services. Fetch API, error handling, authentication, and caching.

## Architecture Guides

- **Enterprise Migration Planning**: Roadmap for migrating from AEM Sites to Adobe Edge Delivery Services. Multi-phase approach, content transformation, and team training.
- **High-Speed Architecture**: Document-based authoring patterns for sub-second page loads. Static generation, edge caching, and CDN optimization.
- **Multi-Site Management**: Managing 200+ sites with EDS. Shared components, configuration management, and deployment orchestration.
- **Security Best Practices**: Securing EDS deployments. Content Security Policy, authentication, authorization, and vulnerability management.
- **Scalability Patterns**: Architecting for high-traffic scenarios. Load balancing, database optimization, and cache strategies.
- **Microservices Integration**: Building composable architectures. API gateways, service mesh, and event-driven patterns.

## Integration Patterns

- **AEM to EDS Migration**: Detailed guide to content transformation from AEM. Component mapping, asset migration, and redirect strategies.
- **Third-Party CMS Integration**: Connecting EDS to Contentful, Strapi, or headless CMS. Content synchronization and preview modes.
- **E-commerce Integration**: Building shopping experiences with EDS. Product catalogs, cart management, and payment processing.
- **Analytics & Personalization**: Adobe Analytics, Google Analytics 4, and personalization engines. Event tracking and audience segmentation.
- **Search Integration**: Implementing site search with Algolia, Elasticsearch, or custom solutions. Indexing strategies and relevance tuning.
- **DAM Integration**: Connecting to Digital Asset Management systems. Adobe Experience Manager Assets, Cloudinary, and media optimization.

## Performance Optimization

- **Core Web Vitals Optimization**: Achieving perfect Lighthouse scores. LCP, FID, CLS optimization techniques.
- **Image Optimization Guide**: WebP, AVIF, responsive images, and lazy loading. CDN configuration and srcset strategies.
- **JavaScript Performance**: Reducing bundle sizes, tree shaking, and code splitting. Avoiding render-blocking scripts.
- **CSS Performance**: Critical CSS, unused CSS removal, and efficient selectors. Avoiding layout thrashing.
- **Caching Strategies**: Browser caching, service workers, and CDN cache control. Stale-while-revalidate patterns.
- **Mobile Optimization**: Performance on low-end devices and slow networks. Adaptive loading and connection-aware code.

## Security & Compliance

- **Content Security Policy**: Implementing CSP headers for EDS. Nonce-based scripts and strict-dynamic patterns.
- **Authentication Patterns**: OAuth, SAML, and JWT integration. Session management and token security.
- **GDPR Compliance**: Cookie consent, data privacy, and user rights. Technical implementations for compliance.
- **Accessibility (WCAG)**: Building inclusive EDS sites. ARIA patterns, keyboard navigation, and screen reader support.
- **Vulnerability Management**: Dependency scanning, penetration testing, and security audits. Common EDS attack vectors.

## Enterprise Case Studies

- **Nissan/Renault Helios**: Managing 200+ global automotive sites. Multi-brand architecture, localization, and governance.
- **EE (UK Telecom)**: High-traffic consumer site optimization. Performance under load and promotional campaigns.
- **Twitter Enterprise CMS**: Content management at scale. Real-time updates and API-driven publishing.
- **Financial Services Migration**: Compliance-focused AEM to EDS migration. Security requirements and audit trails.
- **Retail Multi-Brand Platform**: Shared component libraries across brands. Theme management and white-labeling.

## Tools & Utilities

- **EDS CLI Tools**: Command-line utilities for EDS development. Scaffolding, linting, and deployment automation.
- **Block Library**: Production-ready EDS blocks. Carousel, accordion, hero, form, and more.
- **Migration Scripts**: Automated content transformation tools. AEM to EDS converters and validation scripts.
- **Performance Monitoring**: Real User Monitoring (RUM) and synthetic testing. Custom dashboards and alerting.
- **Development Environment**: Docker-based local development setup. Hot reloading and debugging configuration.

## Team & Process

- **Agile for EDS Projects**: Sprint planning, estimation, and velocity tracking. Adapting Scrum for EDS development.
- **Code Review Standards**: Establishing review criteria and checklists. Automated checks and manual review guidelines.
- **Documentation Practices**: Technical writing for developers. README templates, API documentation, and runbooks.
- **Onboarding Programs**: Training new team members on EDS. Week-by-week curriculum and hands-on projects.
- **Quality Metrics**: Defining and tracking success. Performance budgets, code coverage, and user satisfaction.

## Emerging Technologies

- **Edge Computing with EDS**: Leveraging Fastly edge workers. Server-side logic at the edge and personalization.
- **Web Components & EDS**: Custom Elements API integration. Encapsulation and reusability patterns.
- **Progressive Web Apps**: Building PWAs with EDS. Service workers, offline support, and app-like experiences.
- **WebAssembly Integration**: High-performance computations in the browser. Use cases and integration patterns.
- **AI-Powered Authoring**: LLMs for content generation and optimization. Automated metadata and SEO suggestions.

## Key Concepts Reference

### Document-Based Authoring

Content in Google Docs/SharePoint, not a traditional CMS UI

### Edge Delivery

Content served from CDN edge locations for <100ms response

### Vanilla JavaScript

No React/Vue/Angular - pure Web Standards

### Web Components

Encapsulated, reusable custom elements

### Semantic HTML

Proper HTML5 elements for accessibility and SEO

## Performance Targets (DDT Standards)

- **First Contentful Paint**: <1.0s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **First Input Delay**: <100ms
- **Time to Interactive**: <3.5s
- **Lighthouse Score**: >95/100

## Browser Support Standards

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Android Chrome (last 2 versions)

---

**Note:** These topics represent potential content ideas. Some may already be covered in existing articles under different titles, while others could be developed as new content. This list serves as a content planning resource for Digital Domain Technologies.

**Last Updated:** January 2026
