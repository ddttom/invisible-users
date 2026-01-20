/**
 * The Invisible Users - Google Slides Presentation Generator
 *
 * @title       The Invisible Users: Designing the Web for AI Agents and Everyone Else
 * @author      Tom Cranstoun
 * @date        2026-01-20
 * @version     1.0.0
 * @description Google Apps Script to generate themed 20-minute presentation deck
 * @audience    Business leaders (CTOs, product owners)
 * @duration    20 minutes + Q&A
 * @slides      25 slides with themed layout (dark grey/cobalt blue/neon red)
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
    
    // 2. Adobe Insights: Holiday 2025
    {
      type: 'standard',
      title: "Adobe Insights: Holiday 2025",
      subtitle: "AI Referrals Surge Triple-Digits Across Sectors",
      body: [
        "Triple-Digit Growth: AI referrals surged (Retail +693%, Travel +539%)",
        "Conversion Flip: AI referrals moved from lagging to leading (+31% vs non-AI)",
        "Engagement: AI users spend 45% longer on site, view 13% more pages",
        "Trust: 81% reported improved shopping experience with AI Assistants",
        "Seismic Shift: From experimental to primary revenue driver in 12 months."
      ]
    },

    // 2. Opening Hook
    {
      type: 'standard',
      title: "Real Example from Claude For Chrome",
      subtitle: "January 2025: Testing Claude for Chrome whilst writing the book.",
      body: [
        "Multiple Danube cruises ending in Budapest (May 2026):",
        "'Scenic Gems of the Danube 2026' - Vienna to Budapest (7 nights)",
        "'Delightful Danube' - Various starting points to Budapest",
        "'Romantic Danube' - Multiple options ending in Budapest",
        "One cruise showed: 'From £203,000-£402,000'",
        "Actual price: £2,030-£4,020",
        "100x multiplication error from European formatting (€2.030,00)."
      ]
    },

    // 3. The Highlight Slide (Matches the user image)
    {
      type: 'highlight',
      title: "The £203,000 Cruise",
      subtitle: "Real example: January 2025",
      body: [
        "AI assistant researching Danube cruises",
        "Returned: £203,000-£402,000 per person",
        "Actual price: £2,030-£4,020 per person",
        "100x multiplication error (using a European site with €2.030,00)"
      ],
      highlightBox: {
        title: "£201,000",
        text: "potential mistake\nif booking."
      },
      footer: "For Agent Creators, validation layers are essential, not optional."
    },

    // 4. What Caused This
    {
      type: 'standard',
      title: "What Caused This?",
      subtitle: "The Error Chain:",
      body: [
        "Decimal separator confusion (€2.030,00 vs £2,030)",
        "No range validation (£203k > £15k maximum)",
        "No comparative checks (58x higher than peers)",
        "No cross-referencing against structured data",
        "No confidence scoring",
        "Professional formatting masked the problem.",
        "Error presented with same confidence as verified data."
      ]
    },



    // 5. Understanding Invisible Users (Swapped order as requested)
    {
      type: 'standard',
      title: "Understanding Invisible Users",
      subtitle: "Websites need optimization for AI agents:",
      body: [
        "Not theoretical futures - happening today",
        "Agents browsing, comparing, transacting now",
        "Sites that work get preferred",
        "Sites optimized for agents get preferred",
        "First-mover advantage that's hard to claw back.",
        "Two real examples..."
      ]
    },

    // 6. What Makes Users Invisible
    {
      type: 'standard',
      title: "What Makes Users Invisible",
      subtitle: "What Makes Users \"Invisible\"?",
      body: [
        "AI agents are called \"invisible users\" for two reasons:",
        "1. Invisible to site owners — Unless tracking agent traffic, you have no idea they are there. They blend into analytics.",
        "2. Interface is invisible to them — They can't see animations, color changes, toast notifications, or loading spinners.",
        "Five Integration Patterns: Exploring optimization opportunities."
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
        "Toast notifications and modals",
        "Loading spinners without context",
        "JavaScript-dependent navigation",
        "These patterns need optimization for agents and screen readers."
      ]
    },

    // 10. The Gap
    {
      type: 'standard',
      title: "Two HTML States: The Gap",
      subtitle: "Critical Distinction:",
      body: [
        "1. Served HTML (static) - What server sends before JS. Most agents see only this.",
        "2. Rendered HTML (dynamic) - After JS execution. Only browser-based agents see this.",
        "Example: <div id='products'></div> then fetch().",
        "Your product catalogue is invisible to most agents."
      ]
    },

    // 11. The Solution
    {
      type: 'standard',
      title: "The Solution",
      subtitle: "Make Implicit State Explicit",
      body: [
        "No rebuilding interfaces",
        "No special agent-only experiences",
        "Small, well-understood changes",
        "Improve accessibility for everyone",
        "Three concrete patterns with code and business value."
      ]
    },

    // 12. Pattern 1
    {
      type: 'standard',
      title: "Pattern #1: Persistent Errors",
      subtitle: "Instead of vanishing toast notifications:",
      body: [
        "<form data-state='incomplete'> with <div role='alert'>",
        "Use aria-invalid and aria-describedby",
        "Business value: Conversion rates improve for everyone."
      ]
    },

    // 13. Pattern 2
    {
      type: 'standard',
      title: "Pattern #2: Complete Pricing",
      subtitle: "Instead of 'From £99':",
      body: [
        "Use Schema.org/Offer markup",
        "Explicit price and currency meta tags",
        "<details> for fee breakdown",
        "Business value: No hidden fees. Agent-readable. Builds trust."
      ]
    },

    // 14. Pattern 3
    {
      type: 'standard',
      title: "Pattern #3: Explicit State",
      subtitle: "Make cart state visible:",
      body: [
        "DOM attributes: data-state='active', data-item-count='3'",
        "Role='status' for live updates",
        "Business value: State persists. Debugging easier. Integration testing reliable."
      ]
    },

    // 15. Small Business Case
    {
      type: 'standard',
      title: "Small Business Case",
      subtitle: "You don't need complex infrastructure.",
      body: [
        "Simple restaurant site example",
        "Semantic HTML (<nav>, <main>, <article>)",
        "Schema.org markup (Restaurant, Menu, MenuItem)",
        "Minimal effort",
        "Completely agent-friendly"
      ]
    },

    // 16. Quick Wins
    {
      type: 'standard',
      title: "Quick Wins: Start Here",
      subtitle: "Critical Priority 1 Changes:",
      body: [
        "Add persistent error messages",
        "Display complete pricing (no hidden fees)",
        "Ensure served HTML contains core content",
        "Add basic Schema.org structured data",
        "Start with highest impact, lowest effort."
      ]
    },

    // 17. Web Audit Suite
    {
      type: 'standard',
      title: "Web Audit Suite",
      subtitle: "Professional audit service",
      body: [
        "Implements patterns from the book",
        "Generates detailed reports",
        "Shows exactly where sites need optimization for agents",
        "Provides specific fix recommendations",
        "Measure what you can't see."
      ]
    },

    // 18. Call to Action
    {
      type: 'standard',
      title: "Call to Action",
      subtitle: "Start with one pattern:",
      body: [
        "1. Pick highest-impact, lowest-effort change",
        "2. Implement it",
        "3. Measure the improvement",
        "4. Tackle the next one",
        "Sites that adapt early gain advantage."
      ]
    },
    
    // 19. Major Developments
    {
      type: 'standard',
      title: "The Seven-Day Platform Race (Jan 2026)",
      subtitle: "Three major platforms in one week:",
      body: [
        "Jan 5: Amazon Alexa+ (browser agent launch)",
        "Jan 8: Microsoft expands Copilot Checkout",
        "Jan 11: Google Universal Commerce Protocol (UCP)",
        "Timeline compressed: 12 months -> 6-9 months"
      ]
    },

    // 20. VPNs
    {
      type: 'standard',
      title: "VPNs and Hidden Guardrails",
      subtitle: "Two realities affecting every agent:",
      body: [
        "Browser extensions inherit network config (VPN exit nodes affect location)",
        "System prompts exist but are insufficient",
        "Guardrails work at reasoning level, not data extraction",
        "Hallucinations will continue - validation catches them"
      ]
    },

    // 21. Why This Matters Now
    {
      type: 'standard',
      title: "Why This Matters Now",
      subtitle: "Timeline acceleration is dramatic:",
      body: [
        "Dec 2024: Claude for Chrome",
        "Jan 2025: ACP launches",
        "Jan 2026: Three platforms in seven days",
        "Agent commerce is infrastructure.",
        "Implement Priority 1-2 patterns urgently."
      ]
    },

    // 22. Responsibility
    {
      type: 'standard',
      title: "Our Responsibility",
      subtitle: "Clear professional obligation:",
      body: [
        "Designers/Devs must ensure agents navigate successfully",
        "When agents encounter integration gaps, these affect everyone",
        "Integration gaps often reveal issues that affect humans too."
      ]
    },

    // 23. Next
    {
      type: 'standard',
      title: "What Comes Next",
      subtitle: "Protocol Convergence vs Fragmentation",
      body: [
        "Agentic Commerce Protocol (ACP) - OpenAI/Stripe",
        "Universal Commerce Protocol (UCP) - Google",
        "Identity delegation patterns emerging",
        "Multiple approaches under development"
      ]
    },

    // 24. Takeaways
    {
      type: 'standard',
      title: "Key Takeaways",
      subtitle: "Five Essential Messages:",
      body: [
        "1. This is happening now",
        "2. Commercial pressure exists",
        "3. Solutions are accessible",
        "4. Universal benefit",
        "5. Start with quick wins"
      ]
    },

    // 25. Book
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