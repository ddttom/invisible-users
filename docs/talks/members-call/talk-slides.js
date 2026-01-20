/**
 * The Invisible Users - Google Slides Presentation Generator
 *
 * @title       The Invisible Users: Designing the Web for AI Agents and Everyone Else
 * @author      Tom Cranstoun
 * @date        2026-01-20
 * @version     2.0.0
 * @description Google Apps Script to generate themed 20-minute presentation deck
 * @audience    Business leaders (CTOs, product owners)
 * @duration    20 minutes + Q&A
 * @slides      24 slides with themed layout (dark grey/cobalt blue/neon red)
 * @changes     v2.0.0 - Merged duplicate slides, added CMS/Markdown/Convergence content
 * @usage       Run createInvisibleUsersDeck() in Google Apps Script editor
 */

function createInvisibleUsersDeck() {
  var deck = SlidesApp.create('The Invisible Users Presentation - 20 Minutes (Themed)');
  
  // -------------------------------------------------------------------------
  // THEME CONFIGURATION
  // -------------------------------------------------------------------------
  var THEME = {
    colors: {
      background: '#1C1C1C', // Dark Grey/Black
      header: '#0046B5',     // Cobalt Blue
      textMain: '#FFFFFF',   // White
      highlightBorder: '#FF3300' // Neon Red/Orange
    },
    fonts: {
      title: 'Georgia',
      body: 'Roboto'
    }
  };

  // -------------------------------------------------------------------------
  // SLIDE DATA (Structured for specific layouts)
  // -------------------------------------------------------------------------
  // Structure: 
  // {
  //   type: 'standard' | 'highlight' | 'title',
  //   title: "String",
  //   subtitle: "String" (optional),
  //   body: ["String", "String"] (array of bullets),
  //   highlightBox: { title: "String", text: "String" } (only for 'highlight' type)
  // }
  
  var slideData = [
    // 1. Title Slide
    {
      type: 'title',
      title: "The Invisible Users",
      subtitle: "Designing the Web for AI Agents and Everyone Else",
      body: [
        "Tom Cranstoun: Many years in Adobe CMS & AI innovation.",
        "Consultant at Digital Domain Technologies Ltd.",
        "Philosophy: \"AI should amplify, not replace, human expertise.\"",
        "Focus: Building zero-dependency, agent-friendly web architectures."
      ],
      footer: "Tom Cranstoun | Due Q1 2026"
    },
    
    // 2. Opening Hook - MERGED Adobe Insights + Cruise Error
    {
      type: 'highlight',
      title: "The AI Referral Surge and The £203,000 Mistake",
      subtitle: "Adobe Holiday 2025 Data Meets Real-World Agent Failure",
      body: [
        "Triple-Digit Growth: AI referrals surged (Retail +693%, Travel +539%)",
        "Conversion Flip: AI referrals moved from lagging to leading (+31%)",
        "Engagement: AI users spend 45% longer on site, view 13% more pages",
        "Real Example: Claude for Chrome researching Danube cruises (Jan 2025)",
        "Returned: £203,000-£402,000 per person. Actual: £2,030-£4,020",
        "100x multiplication error from European formatting (€2.030,00)"
      ],
      highlightBox: {
        title: "£201,000",
        text: "potential mistake\nif auto-booked"
      },
      footer: "From experimental to revenue driver - but errors have consequences."
    },

    // 3. Understanding Invisible Users - MOVED EARLIER
    {
      type: 'standard',
      title: "Understanding Invisible Users",
      subtitle: "Two reasons they're called 'invisible'",
      body: [
        "1. Invisible to site owners - blend into analytics, come once and leave",
        "2. Interface is invisible to them - can't see animations, color, toasts, spinners",
        "Not theoretical futures - happening today",
        "Same failures affect screen reader users (invisible to designers for 27 years)",
        "Visual feedback invisible to AI agents AND blind users",
        "Sites that work get preferred by both - first-mover advantage that's hard to claw back"
      ]
    },

    // 4. What Makes Users Invisible
    {
      type: 'standard',
      title: "What Makes Users Invisible",
      subtitle: "Five Integration Patterns",
      body: [
        "AI agents are invisible to site owners:",
        "  - Unless tracking agent traffic, you have no idea they're there",
        "  - They blend into analytics or bounce immediately",
        "Interface is invisible to agents:",
        "  - Can't see animations, color changes, toast notifications, loading spinners",
        "  - Must rely on HTML structure and explicit state",
        "Exploring optimization opportunities for agent-friendly patterns"
      ]
    },

    // 5. NEW: Why Current Systems Fail
    {
      type: 'standard',
      title: "Why Current Systems Fail",
      subtitle: "The Markup Problem",
      body: [
        "Modern CMS creates divs without semantic meaning",
        "Content served as plain HTML - JavaScript decorates it later",
        "LLM Optimizer forks bot vs human experiences (WRONG approach)",
        "Bots see different pages than browser-based agents see",
        "Solution: Fix HTML for everyone together, not separate bot experiences",
        "We are 27 years behind the times - should have fixed this for accessibility"
      ]
    },

    // 6. What Caused The £203,000 Error?
    {
      type: 'standard',
      title: "What Caused This?",
      subtitle: "The Error Chain",
      body: [
        "Decimal separator confusion (€2.030,00 vs £2,030)",
        "No range validation (£203k > £15k maximum)",
        "No comparative checks (58x higher than peers)",
        "No cross-referencing against structured data",
        "No confidence scoring",
        "AI reformatting the content masked the problem",
        "Error presented with same confidence as verified data"
      ]
    },

    // 7. Mistake #1
    {
      type: 'standard',
      title: "Mistake #1: Toast Notifications",
      subtitle: "The Pattern That Keeps Returning:",
      body: [
        "Removed from forms (good!) -> Reintroduced in shopping cart (bad!)",
        "showToast('Item added!')",
        "Toast notifications vanish before agents read them.",
        "Form submission appears to fail silently.",
        "Agents abandon the flow.",
        "Solution: Persistent alerts that stay visible."
      ]
    },

    // 8. Mistake #2
    {
      type: 'standard',
      title: "Mistake #2: Hidden Checkout State",
      subtitle: "State Invisible to Agents:",
      body: [
        "JavaScript-only state (let currentStep = 1)",
        "No URL reflection. No DOM attributes.",
        "Agents can't track progress. Refreshing loses state.",
        "Solution: data-state attributes in DOM."
      ]
    },

    // 9. Why This Happens
    {
      type: 'standard',
      title: "Why This Happens",
      subtitle: "Modern web design optimised for visual feedback:",
      body: [
        "Single-page applications",
        "Client-side state management",
        "Loading spinners without context",
        "JavaScript-dependent navigation",
        "These patterns break AI agents AND screen readers - same problems, same solutions."
      ]
    },

    // 10. The Gap
    {
      type: 'standard',
      title: "Two HTML States: The Gap",
      subtitle: "Critical Distinction:",
      body: [
        "1. Served HTML (static) - What server sends before JS",
        "   → CLI agents, screen readers see this",
        "2. Rendered HTML (dynamic) - After JS execution",
        "   → Only browser-based agents see this",
        "Example: <div id='products'></div> then fetch()",
        "Product catalogue invisible to most agents AND some assistive tech"
      ]
    },

    // 11. NEW: Myth vs Reality - Markdown
    {
      type: 'standard',
      title: "Myth vs Reality: Why Markdown Fails",
      subtitle: "Common Misconception About AI Content",
      body: [
        "MYTH: 'Send markdown to LLMs for clean parsing'",
        "REALITY: Markdown STRIPS all metadata and context",
        "What gets lost: Schema.org markup, JSON-LD, semantic HTML, ARIA attributes",
        "Agents need enriched HTML, not stripped-down markdown",
        "Context is data - don't make agents think, give them facts",
        "Solution: Enriched HTML with Schema.org + JSON-LD + semantic structure"
      ]
    },

    // 12. The Solution
    {
      type: 'standard',
      title: "The Solution",
      subtitle: "Make Implicit State Explicit",
      body: [
        "No rebuilding interfaces",
        "No special agent-only experiences",
        "Small, well-understood changes",
        "Improve accessibility for everyone",
        "Three concrete patterns with code and business value"
      ]
    },

    // 13. Pattern 1
    {
      type: 'standard',
      title: "Pattern #1: Persistent Errors",
      subtitle: "Instead of vanishing toast notifications",
      body: [
        "<form data-state='incomplete'> with <div role='alert'>",
        "Screen readers announce role='alert' immediately",
        "aria-invalid and aria-describedby work for agents AND users",
        "Business value: Conversion rates improve for everyone"
      ]
    },

    // 14. Pattern 2
    {
      type: 'standard',
      title: "Pattern #2: Complete Pricing",
      subtitle: "Instead of 'From £99'",
      body: [
        "Use Schema.org/Offer markup",
        "Voice assistants for blind users read same structured data",
        "Explicit price and currency (machines AND humans need clarity)",
        "<details> for fee breakdown (keyboard navigable)",
        "Business value: Builds trust, reduces cart abandonment for all users"
      ]
    },

    // 15. Pattern 3
    {
      type: 'standard',
      title: "Pattern #3: Explicit State",
      subtitle: "Make cart state visible",
      body: [
        "DOM attributes: data-state='active', data-item-count='3'",
        "role='status' announces updates to screen readers AND agents",
        "Same state visibility benefits assistive technology users",
        "Business value: State persists. Debugging easier. Accessible to all"
      ]
    },

    // 16. Small Business Case
    {
      type: 'standard',
      title: "Small Business Case",
      subtitle: "You don't need complex infrastructure",
      body: [
        "Simple restaurant site example",
        "Semantic HTML (<nav>, <main>, <article>)",
        "Schema.org markup (Restaurant, Menu, MenuItem)",
        "Minimal effort",
        "Completely agent-friendly"
      ]
    },

    // 17. Quick Wins
    {
      type: 'standard',
      title: "Quick Wins: Start Here",
      subtitle: "Critical Priority 1 Changes",
      body: [
        "Add persistent error messages",
        "Display complete pricing (no hidden fees)",
        "Ensure served HTML contains core content",
        "Add basic Schema.org structured data",
        "Start with highest impact, lowest effort"
      ]
    },

    // 18. Web Audit Suite (moved from later position)
    {
      type: 'standard',
      title: "Web Audit Suite",
      subtitle: "Professional audit service",
      body: [
        "Implements patterns from the book",
        "Generates detailed reports",
        "Shows exactly where sites need optimization for agents",
        "Provides specific fix recommendations",
        "Measure what you can't see"
      ]
    },
    
    // 19. MERGED: Why This Matters Now - The 7-Day Platform Race
    {
      type: 'standard',
      title: "Why This Matters Now: The Seven-Day Platform Race",
      subtitle: "January 2026 - Three platforms launched in one week",
      body: [
        "Jan 5: Amazon Alexa+ (browser agent launch)",
        "Jan 8: Microsoft Copilot Checkout (proprietary)",
        "Jan 11: Google Universal Commerce Protocol (open standard, like ACP)",
        "Timeline compressed: 12 months → 6-9 months or LESS to mainstream",
        "Agent commerce is now infrastructure, not experimental",
        "Designers/Devs must ensure agents navigate successfully",
        "Sites that adapt early gain first-mover advantage"
      ]
    },

    // 20. Open vs Closed Competition
    {
      type: 'standard',
      title: "Open vs Closed Competition",
      subtitle: "Two Open Protocols vs One Proprietary System",
      body: [
        "Two chose open: OpenAI/Stripe (ACP), Google (UCP)",
        "One chose closed: Microsoft (Copilot Checkout)",
        "Microsoft isolated - competing against TWO open protocols",
        "Fragmentation risk: Will ACP and UCP converge or compete?",
        "Retailers must choose: integrate both, wait, or pick one?"
      ]
    },

    // 21. NEW: The Future of CMS
    {
      type: 'standard',
      title: "The Future of CMS: From Presentation to Data Management",
      subtitle: "A paradigm shift is happening",
      body: [
        "Old paradigm: CMS manages presentation + content together",
        "New paradigm: Separate concerns",
        "  - Data lake with descriptions, metadata, JSON-LD",
        "  - Ontology that describes relationships",
        "  - Dynamic serving layer adapts to user/agent type",
        "Content management becomes pure data management",
        "HTML generation happens at request time, tailored to consumer needs"
      ]
    },

    // 22. EXPANDED: Why Guardrails Aren't Enough
    {
      type: 'standard',
      title: "Why Guardrails Aren't Enough",
      subtitle: "System prompts are insufficient",
      body: [
        "Browser extensions inherit network config (VPN affects location detection)",
        "System prompts exist but work at reasoning level, NOT data extraction",
        "The £203k cruise error proves validation MUST happen in HTML",
        "Guardrails can't catch formatting errors or missing context",
        "Don't rely on AI to 'think' correctly - give it facts in markup",
        "Solution: Enriched HTML with explicit validation, not AI guesswork"
      ]
    },

    // 23. REFRAMED: Convergence Principle - The Headline Message
    {
      type: 'standard',
      title: "One Solution Serves Everyone: The Convergence Principle",
      subtitle: "This is the key insight",
      body: [
        "What machines need = What disabled users have needed for 27 years",
        "No trade-offs between accessibility and AI readiness",
        "Fix HTML for everyone together, not separate bot experiences",
        "First-mover advantage for sites that implement patterns now",
        "This is the inflection point - like ChatGPT launch in 2022",
        "Within two years, machines will read websites, not humans",
        "One solution. Everyone benefits. No exceptions."
      ]
    },

    // 24. Book & Contact
    {
      type: 'title',
      title: "Book & Contact",
      subtitle: "The Invisible Users",
      body: [
        "Tom Cranstoun",
        "tom.cranstoun@gmail.com | https://allabout.network",
        "LinkedIn: https://www.linkedin.com/in/tom-cranstoun/",
        "",
        "Project Pages:",
        "Book: https://allabout.network/invisible-users",
        "News: https://allabout.network/invisible-users/news.html"
      ],
      footer: "Questions? Discussion? Your challenges?"
    }

  ];

  // -------------------------------------------------------------------------
  // DECK CREATION
  // -------------------------------------------------------------------------

  // Remove the default initial slide
  var slides = deck.getSlides();
  if (slides.length > 0) {
    slides[0].remove();
  }
  
  // Set Master Master Background
  deck.getMasters()[0].getBackground().setSolidFill(THEME.colors.background);
  
  var pageWidth = deck.getPageWidth();
  var pageHeight = deck.getPageHeight();

  slideData.forEach(function(item) {
    var slide = deck.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    slide.getBackground().setSolidFill(THEME.colors.background);

    // 1. HEADER (Blue Background)
    // -------------------------------------------------
    // Header takes up top 140 pixels approx
    var headerHeight = 140;
    var headerShape = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, 0, 0, pageWidth, headerHeight);
    headerShape.getFill().setSolidFill(THEME.colors.header);
    headerShape.getBorder().setTransparent();

    // 2. TITLE
    // -------------------------------------------------
    var titleBox = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 20, 10, pageWidth - 40, 60);
    var titleText = titleBox.getText();
    
    // Automatic Font Scaling for Long Titles
    // If title is > 32 chars, shrink font to avoid wrapping
    var fontSize = 36;
    if (item.title.length > 32) {
      fontSize = 28; 
    }
    // If title is > 45 chars, shrink even more
    if (item.title.length > 45) {
      fontSize = 24;
    }

    titleText.setText(item.title);
    titleText.getTextStyle()
             .setFontFamily(THEME.fonts.title)
             .setFontSize(fontSize)
             .setForegroundColor(THEME.colors.textMain)
             .setBold(true);
    titleText.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);

    // 3. SUBTITLE (in Header)
    // -------------------------------------------------
    if (item.subtitle) {
      var subtitleBox = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 20, 70, pageWidth - 40, 40);
      var subText = subtitleBox.getText();
      subText.setText(item.subtitle);
      subText.getTextStyle()
             .setFontFamily(THEME.fonts.body)
             .setFontSize(18)
             .setForegroundColor('#E0E0E0'); // Slightly dimmer white
      subText.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
    }

    // 4. BODY LAYOUT
    // -------------------------------------------------
    var contentTop = headerHeight + 30; // 170
    var contentLeft = 50;
    var contentWidth = 620;

    // Adjust width if there is a highlight box (Split view)
    if (item.type === 'highlight' && item.highlightBox) {
      contentWidth = 350; // Left column width
    } else {
      contentWidth = 620; // Full width
    }

    // Render Body Bullets
    if (item.body && item.body.length > 0) {
      // Create a single text box for bullets
      var bodyBox = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, contentLeft, contentTop, contentWidth, 300);
      var bodyText = bodyBox.getText();
      
      // Add bullets with custom "compass" look (simulated with unicode)
      var bulletString = "";
      var isHighlight = (item.type === 'highlight' && item.highlightBox);
      
      item.body.forEach(function(line) {
        // Use single spacing for highlight slides to save space, double for others
        var separator = isHighlight ? "\n" : "\n\n"; 
        bulletString += line + separator; 
      });
      
      bodyText.setText(bulletString);

      // Adjust Font Size for Highlight slides (dense content)
      var bodyFontSize = isHighlight ? 14 : 18;

      bodyText.getTextStyle()
              .setFontFamily(THEME.fonts.body)
              .setFontSize(bodyFontSize)
              .setForegroundColor(THEME.colors.textMain);
      bodyText.getParagraphStyle().setLineSpacing(115); // Add breathing room
    }

    // 5. HIGHLIGHT BOX (Right Column)
    // -------------------------------------------------
    if (item.type === 'highlight' && item.highlightBox) {
      var highlightLeft = 430;
      var highlightTop = contentTop + 20;
      var highlightWidth = 260;
      var highlightHeight = 150;

      var box = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, highlightLeft, highlightTop, highlightWidth, highlightHeight);
      box.getFill().setSolidFill('#000000'); // Blacker background for contrast
      box.getBorder().setWeight(3);
      box.getBorder().getLineFill().setSolidFill(THEME.colors.highlightBorder);
      
      // Highlight Title (The Big Number)
      var boxTitle = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, highlightLeft, highlightTop + 10, highlightWidth, 60);
      var btRange = boxTitle.getText();
      btRange.setText(item.highlightBox.title);
      btRange.getTextStyle()
             .setFontFamily(THEME.fonts.title)
             .setFontSize(48)
             .setBold(true)
             .setForegroundColor(THEME.colors.highlightBorder); // Color match border
      btRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);

      // Highlight Text (The description)
      var boxText = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, highlightLeft, highlightTop + 70, highlightWidth, 70);
      var btxtRange = boxText.getText();
      btxtRange.setText(item.highlightBox.text);
      btxtRange.getTextStyle()
             .setFontFamily(THEME.fonts.title)
             .setFontSize(24)
             .setBold(true)
             .setForegroundColor(THEME.colors.textMain);
      btxtRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
    }
    
    // 6. FOOTER (No Bar)
    // -------------------------------------------------
    if (item.footer) {
      var footerMargin = 50; 
      // If highlight slide, push it even lower (25px from bottom)
      if (item.type === 'highlight') { footerMargin = 25; }
      
      var lineY = pageHeight - footerMargin - 20;
      
      var footerBox = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 50, lineY + 10, 620, 50);
      var fText = footerBox.getText();
      fText.setText(item.footer);
      fText.getTextStyle().setFontSize(14).setForegroundColor('#CCCCCC');
    }

  });

  Logger.log('Deck created: ' + deck.getUrl());
}