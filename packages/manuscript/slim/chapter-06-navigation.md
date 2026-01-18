# Chapter 6: The Navigation Problem

## How AI discovers your content

Before AI can read your content, it needs to find it. This seems obvious but is often overlooked. You might have perfectly structured pages with excellent metadata, but if AI can't discover them or understand how they relate to each other, you've solved the wrong problem.

AI discovers content through three main mechanisms:

**1. Direct URL requests**  
Someone asks: "What does the Digital Domain Technologies service page say about Edge Delivery?" The AI already knows the URL (perhaps from previous searches or a sitemap) and fetches that specific page.

**2. Following links**  
AI starts at your homepage (or a known page) and follows links to discover other content. This is how search engine crawlers work, and many AI agents use similar patterns.

**3. Sitemaps**  
Your sitemap.xml provides a structured list of URLs. AI can parse this to understand your site's scope and priority pages.

Each mechanism has different requirements and failure modes. Let's look at how to support all three effectively.

## Pattern: The XML sitemap

Your sitemap.xml tells AI (and search engines) what pages exist and how they're organized. This is the foundation of discoverability.

**Minimal sitemap:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.example.com/</loc>
    <lastmod>2024-03-20</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.example.com/services</loc>
    <lastmod>2024-03-15</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.example.com/about</loc>
    <lastmod>2024-02-10</lastmod>
    <priority>0.6</priority>
  </url>
</urlset>
```

The elements that matter:

**loc** - The full URL (required)  
**lastmod** - When the page was last changed (ISO 8601 date)  
**priority** - Relative importance (0.0 to 1.0)  
**changefreq** - How often it changes (daily, weekly, monthly, yearly)

Forget `changefreq`. Google ignores it, and it's too hard to maintain accurately. Focus on `lastmod` and `priority`.

**Better sitemap with organization:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>https://www.example.com/</loc>
    <lastmod>2024-03-20</lastmod>
    <priority>1.0</priority>
  </url>
  
  <!-- Main sections -->
  <url>
    <loc>https://www.example.com/services</loc>
    <lastmod>2024-03-15</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.example.com/case-studies</loc>
    <lastmod>2024-03-18</lastmod>
    <priority>0.9</priority>
  </url>
  
  <!-- Service pages -->
  <url>
    <loc>https://www.example.com/services/edge-delivery</loc>
    <lastmod>2024-03-10</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.example.com/services/aem-consulting</loc>
    <lastmod>2024-03-12</lastmod>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog posts -->
  <url>
    <loc>https://www.example.com/blog/migrating-to-eds</loc>
    <lastmod>2024-03-20</lastmod>
    <priority>0.7</priority>
  </url>
  
  <!-- Supporting pages -->
  <url>
    <loc>https://www.example.com/about</loc>
    <lastmod>2024-02-10</lastmod>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://www.example.com/contact</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>0.6</priority>
  </url>
</urlset>
```

Notice the priority gradation:

- Homepage: 1.0
- Main sections: 0.9
- Service pages: 0.8
- Blog content: 0.7
- Supporting pages: 0.5-0.6

This tells AI which pages matter most when it's deciding what to crawl or recommend.

**Sitemap index for large sites:**

If you have hundreds or thousands of pages, split into multiple sitemaps:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.example.com/sitemap-pages.xml</loc>
    <lastmod>2024-03-20</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.example.com/sitemap-posts.xml</loc>
    <lastmod>2024-03-20</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.example.com/sitemap-products.xml</loc>
    <lastmod>2024-03-15</lastmod>
  </sitemap>
</sitemapindex>
```

Each individual sitemap should stay under 50,000 URLs and 50MB uncompressed.

**Dynamic sitemap generation:**

For sites with changing content, generate sitemaps dynamically:

```javascript
// Example: Express.js sitemap route
app.get('/sitemap.xml', async (req, res) => {
  const pages = await getPages();
  const posts = await getBlogPosts();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Homepage
  xml += '  <url>\n';
  xml += `    <loc>https://www.example.com/</loc>\n`;
  xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += '  </url>\n';
  
  // Dynamic pages
  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>https://www.example.com${page.url}</loc>\n`;
    xml += `    <lastmod>${page.modified.toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <priority>${page.priority || 0.8}</priority>\n`;
    xml += '  </url>\n';
  });
  
  // Blog posts
  posts.forEach(post => {
    xml += '  <url>\n';
    xml += `    <loc>https://www.example.com/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${post.modified.toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});
```

This ensures your sitemap is always current without manual updates.

## Link text matters

When AI follows links, the link text provides critical context. The href tells AI where the link goes, but the link text tells AI why it goes there and what to expect.

**Bad link text:**

```html
<p>
  We offer Edge Delivery Services consulting. 
  <a href="/services/eds">Click here</a> for more information.
</p>

<p>
  Read our latest blog post 
  <a href="/blog/migration-guide">here</a>.
</p>

<nav>
  <a href="/services">Services</a>
  <a href="/services/web">More</a>
  <a href="/services/consulting">Details</a>
</nav>
```

Problems:

- "Click here" and "here" are meaningless out of context
- "More" and "Details" don't indicate what they link to
- AI can't build useful mental model from these links

**Better link text:**

```html
<p>
  We offer Edge Delivery Services consulting. 
  <a href="/services/eds">Learn about our EDS consulting services</a>.
</p>

<p>
  Read our latest blog post: 
  <a href="/blog/migration-guide">Migrating from AEM Classic to Edge Delivery Services</a>.
</p>

<nav>
  <a href="/services">Our Services</a>
  <a href="/services/web">Web Development</a>
  <a href="/services/consulting">Strategic Consulting</a>
</nav>
```

Each link text:

- Describes the destination
- Makes sense when read aloud
- Provides value even without surrounding context

This matters because AI (and screen readers) often process links separately from surrounding text. The link text needs to be self-explanatory.

**The link text test:**

Extract all links from your page and read just the link text in a list. Does each one make sense? Can you tell where it goes?

**Your page:**

- Click here
- Read more
- Learn more
- See details
- More information

**Better:**

- EDS consulting services
- Migration guide: AEM to Edge Delivery
- Case study: Automotive industry transformation
- Contact our team
- Download pricing guide

The second list works without any surrounding context.

## Internal linking strategy

Internal links serve two purposes for AI:

**1. Discovery:** AI finds new pages by following links  
**2. Context:** Links establish relationships between topics

Your internal linking should create a semantic web that helps AI understand how your content relates.

**Hub and spoke pattern:**

```
Homepage
  ├── Services (hub page)
  │   ├── Edge Delivery Services
  │   ├── AEM Consulting
  │   └── Training
  ├── Case Studies (hub page)
  │   ├── Automotive Industry
  │   ├── Financial Services
  │   └── Retail Sector
  └── Blog (hub page)
      ├── Latest Posts
      ├── Guides
      └── Technical Articles
```

Each hub page links to its spokes. Each spoke links back to its hub and to related spokes.

**Example hub page:**

```html
<main>
  <h1>Our Services</h1>
  <p>
    We provide consultancy across Adobe Experience Manager and 
    Edge Delivery Services implementations.
  </p>
  
  <section>
    <h2>Edge Delivery Services</h2>
    <p>
      Modern web delivery using Adobe's Edge Delivery Services platform.
      <a href="/services/edge-delivery">Explore EDS consulting</a>
    </p>
  </section>
  
  <section>
    <h2>AEM Consulting</h2>
    <p>
      Strategic advisory for Adobe Experience Manager implementations.
      <a href="/services/aem-consulting">Learn about AEM consulting</a>
    </p>
  </section>
  
  <section>
    <h2>Training and Support</h2>
    <p>
      Upskill your team with hands-on training and ongoing support.
      <a href="/services/training">View training programmes</a>
    </p>
  </section>
  
  <aside>
    <h2>Related Resources</h2>
    <ul>
      <li><a href="/case-studies">View our case studies</a></li>
      <li><a href="/blog/guides">Read our implementation guides</a></li>
      <li><a href="/contact">Discuss your requirements</a></li>
    </ul>
  </aside>
</main>
```

This creates multiple paths for discovery:

- From homepage to services hub
- From services hub to specific services
- From services to case studies and guides
- Cross-links between related content

**Contextual links in content:**

```html
<article>
  <h1>Migrating from AEM Classic to Edge Delivery Services</h1>
  
  <p>
    The migration process involves several stages. First, you'll need to 
    <a href="/guides/content-audit">audit your existing content</a> to 
    determine what can be migrated automatically versus what needs manual 
    restructuring.
  </p>
  
  <p>
    Once your content is organized, the next step is 
    <a href="/guides/block-development">developing custom blocks</a> for 
    any unique functionality your site requires.
  </p>
  
  <p>
    Throughout this process, understanding 
    <a href="/guides/eds-architecture">EDS architecture fundamentals</a> 
    will help you make better decisions about implementation approach.
  </p>
</article>
```

These contextual links:

- Help AI understand topic relationships
- Provide natural discovery paths
- Show which topics are prerequisites or related concepts

## Breadcrumb navigation

Breadcrumbs are more than a UX nicety—they tell AI exactly where a page sits in your information hierarchy.

**Basic breadcrumbs:**

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/services/edge-delivery">Edge Delivery Services</a></li>
    <li aria-current="page">Implementation Guide</li>
  </ol>
</nav>
```

**With Schema.org markup:**

```html
<nav aria-label="Breadcrumb">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/">
        <span itemprop="name">Home</span>
      </a>
      <meta itemprop="position" content="1">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/services">
        <span itemprop="name">Services</span>
      </a>
      <meta itemprop="position" content="2">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/services/edge-delivery">
        <span itemprop="name">Edge Delivery Services</span>
      </a>
      <meta itemprop="position" content="3">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span itemprop="name">Implementation Guide</span>
      <meta itemprop="position" content="4">
    </li>
  </ol>
</nav>
```

This creates explicit parent-child relationships. AI now knows:

- Implementation Guide is under Edge Delivery Services
- Edge Delivery Services is under Services
- Services is under Home

When someone asks "Does Digital Domain offer EDS consulting?" AI can navigate from the homepage to services to EDS to find detailed information.

## Site structure patterns

How you organize your site affects AI's ability to understand it. Here are patterns that work:

**Topical clusters:**

```
/services/edge-delivery/
  - index.html (overview)
  - /implementation
  - /migration
  - /support
  - /case-studies

/services/aem-consulting/
  - index.html (overview)
  - /strategy
  - /architecture
  - /training
```

Each topic has a hub page with related sub-pages. The URL structure makes relationships explicit.

**Content by type:**

```
/blog/
  - /guides/ (how-to content)
  - /case-studies/ (client work)
  - /news/ (company updates)
  - /technical/ (deep dives)
```

Clear categorization helps AI understand content purpose.

**Date-based for news:**

```
/blog/2024/03/migration-guide
/blog/2024/02/release-notes
```

Date in URL signals recency. AI can prioritize recent content for time-sensitive queries.

**Flat vs. nested:**

```
<!-- Too flat -->
/services-edge-delivery-implementation
/services-edge-delivery-migration
/services-aem-consulting-strategy

<!-- Too nested -->
/services/consulting/adobe/experience-manager/implementation/enterprise/
```

Aim for 2-4 levels deep. Flat enough for clarity, nested enough to show hierarchy.

## The navigation menu structure

Your main navigation creates the mental model AI builds of your site organization.

**Simple but effective:**

```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li>
      <a href="/services">Services</a>
      <ul>
        <li><a href="/services/edge-delivery">Edge Delivery Services</a></li>
        <li><a href="/services/aem-consulting">AEM Consulting</a></li>
        <li><a href="/services/training">Training</a></li>
      </ul>
    </li>
    <li><a href="/case-studies">Case Studies</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

This tells AI:

- You have six main sections
- Services has three sub-categories
- The structure is relatively flat

**With added semantic information:**

```html
<nav aria-label="Main navigation" role="navigation">
  <h2 class="visually-hidden">Main menu</h2>
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li>
      <a href="/services" aria-expanded="false" aria-haspopup="true">Services</a>
      <ul aria-label="Services submenu">
        <li>
          <a href="/services/edge-delivery">
            Edge Delivery Services
            <span class="nav-description">Modern web delivery platform</span>
          </a>
        </li>
        <li>
          <a href="/services/aem-consulting">
            AEM Consulting
            <span class="nav-description">Strategic advisory and implementation</span>
          </a>
        </li>
        <li>
          <a href="/services/training">
            Training
            <span class="nav-description">Upskill your team</span>
          </a>
        </li>
      </ul>
    </li>
    <!-- Additional menu items -->
  </ul>
</nav>
```

The `nav-description` class can be visually hidden but provides context for AI and screen readers. AI now knows what each service offering involves.

## Footer navigation

Don't neglect footer links. They often contain important pages that aren't in main navigation:

```html
<footer>
  <nav aria-label="Footer navigation">
    <h2>Quick Links</h2>
    <ul>
      <li><a href="/sitemap">Sitemap</a></li>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
      <li><a href="/accessibility">Accessibility Statement</a></li>
    </ul>
  </nav>
  
  <nav aria-label="Legal information">
    <h2>Company</h2>
    <ul>
      <li><a href="/about/company">About Us</a></li>
      <li><a href="/about/team">Our Team</a></li>
      <li><a href="/careers">Careers</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</footer>
```

Notice:

- Separate `nav` elements with `aria-label` to distinguish them
- Headings for each section
- Links to utility pages (privacy, terms, etc.)

AI can now find your privacy policy, contact information, and other important pages even if they're not in main navigation.

## Related content links

Within your content, suggest related pages:

```html
<article>
  <h1>Migrating from AEM Classic to Edge Delivery Services</h1>
  <!-- Article content -->
  
  <aside class="related-content">
    <h2>Related Guides</h2>
    <ul>
      <li>
        <a href="/guides/eds-architecture">
          Understanding EDS Architecture
        </a>
        <p>Learn the fundamentals before migrating</p>
      </li>
      <li>
        <a href="/guides/content-modeling">
          Content Modeling for Edge Delivery
        </a>
        <p>Structure your content for optimal performance</p>
      </li>
      <li>
        <a href="/case-studies/automotive-migration">
          Case Study: Automotive Industry Migration
        </a>
        <p>See how we migrated a major automotive site</p>
      </li>
    </ul>
  </aside>
</article>
```

This provides:

- Discovery paths to related content
- Context about what each link offers
- Semantic grouping of related resources

AI can follow these links to build a more complete picture of your expertise and offerings.

## The robots.txt consideration

Your robots.txt file tells crawlers what they can and can't access:

```
User-agent: *
Allow: /

Sitemap: https://www.example.com/sitemap.xml

# Block admin and utility pages
Disallow: /admin/
Disallow: /login/
Disallow: /checkout/
Disallow: /api/
```

Keep it simple. Only block:

- Admin interfaces
- Authentication pages
- Payment processing
- API endpoints not meant for crawling

Don't block:

- CSS or JavaScript files (some crawlers need them)
- Images (AI may need to fetch them)
- Public documentation
- Any content you want AI to discover

**Common mistake:**

```
User-agent: *
Disallow: /services/  # Oops, blocking all services pages
```

Test your robots.txt with Google's robots.txt Tester or similar tools before deploying.

## Navigation and understanding

Good navigation doesn't just help AI find pages—it helps AI understand your business:

**What you do:** Clear service pages linked from main navigation  
**Your expertise:** Case studies and guides showing depth  
**Your priorities:** What you link to most prominently  
**Content relationships:** How topics connect to each other

Poor navigation creates confusion:

- AI can't determine what you specialize in
- Pages seem unrelated to each other
- No clear entry points for different topics
- Important pages are hidden or hard to find

Good navigation creates clarity:

- Primary services are obvious
- Content relationships are explicit
- Entry points match common queries
- Everything is discoverable within 3-4 clicks from homepage

## Testing navigation effectiveness

**The discovery test:**

1. Start at your homepage HTML
2. Extract all links
3. Follow each link and extract their links
4. Repeat for 3-4 levels
5. Map what's discoverable

Can AI reach all your important pages? Are there orphaned pages with no inbound links?

**The context test:**

Read all your link text in isolation. Does each link clearly indicate its destination and purpose?

**The structure test:**

Draw your site as a tree diagram based on navigation structure. Does the hierarchy make sense? Are there sections that seem misplaced?

## Real-world example

I worked with a financial services client whose navigation was organized around internal departments:

```
- Corporate Solutions
- Retail Banking
- Investment Management
- Operations
```

This made sense internally but not to AI or customers. When someone asked "Does CompanyX offer mortgages?" AI couldn't find the information because mortgages were under "Retail Banking."

We restructured to customer-facing categories:

```
- Personal Banking
  - Current Accounts
  - Savings
  - Mortgages
  - Loans
- Business Banking
  - Business Accounts
  - Business Loans
  - Merchant Services
- Investments
  - ISAs
  - Pensions
  - Investment Portfolios
```

Same content, different organization. AI could now answer "Does CompanyX offer mortgages?" by navigating to Personal Banking > Mortgages.

The lesson: organize navigation around how people (and AI) think about your offerings, not around how your company is structured internally.

## What's next

We've covered how AI discovers content and navigates sites. But even well-structured, easily discovered content can be undermined by one thing: JavaScript that hides content from parsers.

The next chapter tackles the JavaScript challenge—when client-side rendering helps, when it hurts, and how to make JavaScript-heavy sites work for AI.

---

**Coming up in Chapter 7:** The JavaScript challenge—making modern web apps readable by AI without sacrificing interactivity.
