# AI-Native Website Implementation Guide

## 📦 Files Created

You now have a complete AI-Native website implementation package based on Digital Domain Technologies' real-world architecture. Here's what was created:

### Core Blog Post
- **newblog.md** (41KB) - The comprehensive blog post explaining the entire AI-native architecture

### AI Discovery Files
- **llms.txt** (13KB) - Primary knowledge base for LLMs with all your content organized
- **ai-agents.md** (9KB) - OASF capability manifest defining what AI agents can do
- **query-index.json** (10KB) - Searchable content catalog with 21 sample entries

### Permission & Access
- **robots.txt** (6KB) - AI-specific crawling permissions for 2025 agents

### Validation & Monitoring
- **verify-ai.js** (10KB) - Node.js health check script to validate all manifests
- **ai-agent-handshake.js** (10KB) - Browser-side JavaScript for detecting AI visitors

### Build Configuration
- **helix-query.yaml** (3KB) - Adobe EDS indexing configuration
- **github-actions-ai-health.yml** (8KB) - Automated CI/CD health checks

### Documentation
- **README.md** (10KB) - Complete repository documentation with AI-native standards

---

## 🚀 Quick Start: Deploying to YOUR Site

### Step 1: Copy Files to Your Website Root

```bash
# Copy core AI files
cp llms.txt /your-website-root/
cp ai-agents.md /your-website-root/
cp robots.txt /your-website-root/
cp query-index.json /your-website-root/
```

### Step 2: Customize for Your Brand

#### Update llms.txt
```bash
# Replace all instances of DDT branding with yours
sed -i 's/Digital Domain Technologies/YOUR COMPANY NAME/g' llms.txt
sed -i 's/allabout.network/yoursite.com/g' llms.txt
sed -i 's/Tom Cranstoun/YOUR NAME/g' llms.txt
sed -i 's/info@digitaldomaintechnologies.com/your@email.com/g' llms.txt
```

Then manually edit:
- Replace the "About" section with your bio
- Update all article links with your actual content
- Adjust categories to match your site structure

#### Update ai-agents.md
```bash
# Replace branding
sed -i 's/Digital Domain Technologies/YOUR COMPANY NAME/g' ai-agents.md
sed -i 's/allabout.network/yoursite.com/g' ai-agents.md
sed -i 's/Tom Cranstoun/YOUR NAME/g' ai-agents.md
sed -i 's/info@digitaldomaintechnologies.com/your@email.com/g' ai-agents.md
```

Then manually edit:
- Define your actual skills/capabilities
- Update endpoints to match your site structure
- Customize citation requirements

#### Update robots.txt
```bash
# Replace domain
sed -i 's/allabout.network/yoursite.com/g' robots.txt
```

Review and adjust:
- Which AI bots you want to allow
- Which directories to protect
- Rate limiting preferences

#### Update query-index.json
**Important**: This file should be generated from your actual content. The provided file has 21 sample entries. You need to:

**For WordPress**:
```php
// Use the PHP script from the blog post
// Place in functions.php and run
generate_query_index();
```

**For Static Sites**:
```bash
# Use the Node.js script from the blog post
node scripts/generate-index.js
```

**For Adobe EDS**:
```bash
# Copy helix-query.yaml to your repo root
cp helix-query.yaml /your-eds-repo/
# Commit and push - EDS will generate the index automatically
```

### Step 3: Configure HTTP Headers

Add the Link header to your server configuration:

**Apache (.htaccess)**:
```apache
<IfModule mod_headers.c>
  Header set Link "<https://yoursite.com/llms.txt>; rel=\"llms-txt\", <https://yoursite.com/ai-agents.md>; rel=\"agent-manifest\""
</IfModule>
```

**Nginx**:
```nginx
add_header Link '<https://yoursite.com/llms.txt>; rel="llms-txt", <https://yoursite.com/ai-agents.md>; rel="agent-manifest"';
```

**Next.js**:
```javascript
// In next.config.js
module.exports = {
  async headers() {
    return [{
      source: '/:path*',
      headers: [{
        key: 'Link',
        value: '<https://yoursite.com/llms.txt>; rel="llms-txt", <https://yoursite.com/ai-agents.md>; rel="agent-manifest"'
      }]
    }]
  }
}
```

### Step 4: Add JavaScript Handshake

**Option A: Include in your main bundle**
```bash
# Copy to your scripts directory
cp ai-agent-handshake.js /your-site/js/
```

Then import in your main JavaScript:
```javascript
import './ai-agent-handshake.js';
```

**Option B: Add to HTML**
```html
<!-- Before closing </body> tag -->
<script src="/ai-agent-handshake.js"></script>
```

Update the configuration in the file:
```javascript
const SITE_CONFIG = {
  domain: 'yoursite.com',
  llmsUrl: '/llms.txt',
  manifestUrl: '/ai-agents.md',
  indexUrl: '/query-index.json',
  citation: 'Your Company Name (yoursite.com)',
  enableAnalytics: true,
  analyticsEndpoint: '/api/analytics/ai-visit'
};
```

### Step 5: Set Up Validation

#### Local Testing
```bash
# Install Node.js if not already installed
# Then run verification
node verify-ai.js --domain=yoursite.com
```

#### Automated CI/CD
```bash
# For GitHub
mkdir -p .github/workflows
cp github-actions-ai-health.yml .github/workflows/ai-health-check.yml

# Edit the file and update domain
sed -i 's/allabout.network/yoursite.com/g' .github/workflows/ai-health-check.yml

# Commit and push
git add .github/workflows/ai-health-check.yml
git commit -m "Add AI manifest health checks"
git push
```

### Step 6: Verify Everything Works

1. **Check file accessibility**:
```bash
curl https://yoursite.com/llms.txt
curl https://yoursite.com/ai-agents.md
curl https://yoursite.com/query-index.json
```

2. **Check headers**:
```bash
curl -I https://yoursite.com | grep Link
```

3. **Run health check**:
```bash
node verify-ai.js --domain=yoursite.com
```

4. **Test with AI**:
   - Ask ChatGPT: "What does [yoursite.com] offer?"
   - Ask Claude: "Summarize the content at [yoursite.com]"
   - Check if they reference your llms.txt content

---

## 📋 Customization Checklist

Use this checklist to track your implementation:

### Phase 1: File Preparation
- [ ] Copy all files to your website root
- [ ] Replace "Digital Domain Technologies" with your company name (all files)
- [ ] Replace "allabout.network" with your domain (all files)
- [ ] Replace "Tom Cranstoun" with your name (all files)
- [ ] Replace email addresses with yours (all files)

### Phase 2: Content Customization
- [ ] **llms.txt**: Write your bio in "About" section
- [ ] **llms.txt**: Update all article links with your actual content
- [ ] **llms.txt**: Adjust categories to match your site
- [ ] **ai-agents.md**: Define your actual skills/services
- [ ] **ai-agents.md**: Update endpoints to match your URLs
- [ ] **ai-agents.md**: Customize citation requirements
- [ ] **query-index.json**: Generate from your actual content
- [ ] **robots.txt**: Review and adjust AI bot permissions

### Phase 3: Technical Integration
- [ ] Add HTTP Link headers to server configuration
- [ ] Deploy ai-agent-handshake.js to your site
- [ ] Update handshake configuration with your domain
- [ ] Configure analytics endpoint (if tracking AI visits)
- [ ] Test script execution in browser console

### Phase 4: Validation Setup
- [ ] Test verify-ai.js script locally
- [ ] Set up GitHub Actions (if using GitHub)
- [ ] Configure domain secret in GitHub repository settings
- [ ] Verify automated checks are running
- [ ] Set up failure notifications (optional)

### Phase 5: Testing & Verification
- [ ] Verify llms.txt is accessible via browser
- [ ] Verify ai-agents.md is accessible via browser
- [ ] Verify query-index.json is accessible and valid JSON
- [ ] Check HTTP Link headers are present
- [ ] Run verify-ai.js health check
- [ ] Test with actual AI assistants (ChatGPT, Claude)
- [ ] Check server logs for AI bot traffic

### Phase 6: Ongoing Maintenance
- [ ] Schedule weekly query-index.json regeneration
- [ ] Schedule monthly llms.txt content review
- [ ] Monitor AI bot traffic in analytics
- [ ] Update ai-agents.md when adding new services
- [ ] Review and update citation formats quarterly

---

## 🎯 Platform-Specific Guides

### WordPress

1. **Install files**:
```bash
# Via FTP or SSH
cp llms.txt /wp-content/uploads/
cp ai-agents.md /wp-content/uploads/
```

2. **Add headers** (functions.php):
```php
add_action('send_headers', function() {
  header('Link: <https://yoursite.com/llms.txt>; rel="llms-txt"');
});
```

3. **Generate index** (functions.php):
```php
// Add the generate_query_index() function from the blog post
// Then run via WP-CLI:
wp eval-file generate-index.php
```

4. **Add handshake script** (functions.php):
```php
add_action('wp_footer', function() {
  wp_enqueue_script('ai-handshake', get_template_directory_uri() . '/js/ai-agent-handshake.js', [], '1.0', true);
});
```

### Next.js

1. **Place files in /public**:
```bash
cp llms.txt /your-nextjs-app/public/
cp ai-agents.md /your-nextjs-app/public/
cp query-index.json /your-nextjs-app/public/
```

2. **Add headers** (next.config.js):
```javascript
// See Step 3 above for full configuration
```

3. **Add handshake** (pages/_app.js):
```javascript
import { useEffect } from 'react';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script src="/ai-agent-handshake.js" strategy="afterInteractive" />
      <Component {...pageProps} />
    </>
  );
}
```

4. **Generate index** (scripts/generate-index.js):
```javascript
// Use the script from the blog post
// Run as part of build process:
// "build": "node scripts/generate-index.js && next build"
```

### Shopify

1. **Add files via theme editor**:
   - Upload to Assets folder
   - Create snippet for each file

2. **Add headers** (theme.liquid):
```liquid
{% assign link_header = '<https://yourstore.myshopify.com/llms.txt>; rel="llms-txt"' %}
<meta http-equiv="Link" content="{{ link_header }}">
```

3. **Add handshake** (theme.liquid, before </body>):
```liquid
{{ 'ai-agent-handshake.js' | asset_url | script_tag }}
```

### Adobe Experience Manager (AEM)

1. **Create component**: /apps/yoursite/components/ai-manifests
2. **Add files** to component resources
3. **Configure dispatcher** to allow .txt and .md files
4. **Add headers** via Apache/Dispatcher configuration

### Static Sites (Hugo, Jekyll, 11ty)

1. **Place files in root** (they'll be copied to output):
```bash
cp llms.txt /your-static-site/static/
cp ai-agents.md /your-static-site/static/
```

2. **Generate index** as part of build:
```yaml
# In build script
- node scripts/generate-index.js
- hugo build
```

3. **Add handshake** to footer partial/template

---

## 🔍 Testing Your Implementation

### Manual Tests

1. **File Accessibility**:
```bash
# Should return 200 OK
curl -I https://yoursite.com/llms.txt
curl -I https://yoursite.com/ai-agents.md
curl -I https://yoursite.com/query-index.json
```

2. **Header Verification**:
```bash
# Should show Link header
curl -I https://yoursite.com | grep -i link
```

3. **JSON Validation**:
```bash
# Should parse without errors
curl https://yoursite.com/query-index.json | python3 -m json.tool
```

4. **Markdown Structure**:
```bash
# Should show H1 and H2 headers
curl https://yoursite.com/llms.txt | grep "^#"
```

### Automated Health Check

```bash
# Run verification script
node verify-ai.js --domain=yoursite.com

# Expected output:
# ✓ llms.txt - PASS
# ✓ ai-agents.md - PASS
# ✓ query-index.json - PASS
```

### AI Assistant Testing

1. **ChatGPT Test**:
```
Ask: "What expertise does [yoursite.com] offer?"
Expected: Should reference your llms.txt content
```

2. **Claude Test**:
```
Ask: "Summarize the services at [yoursite.com]"
Expected: Should cite your domain and list your services
```

3. **Perplexity Test**:
```
Search: "[yoursite.com] capabilities"
Expected: Should show up in results with proper attribution
```

### Browser Testing

1. Open browser console
2. Check for AI detection log:
```
[AI Handshake] Detected AI agent: (if visiting with AI)
```
3. Verify meta tags injected:
```javascript
document.querySelector('meta[name="ai-agent-instructions"]')
```

---

## 📊 Monitoring & Analytics

### Track AI Bot Visits

**Server-side (Apache/Nginx)**:
```bash
# Count AI bot visits
grep -E 'GPTBot|ClaudeBot|PerplexityBot' access.log | wc -l

# See which pages AI bots visit most
grep -E 'GPTBot|ClaudeBot|PerplexityBot' access.log | awk '{print $7}' | sort | uniq -c | sort -rn | head -10
```

**Google Analytics 4**:
```javascript
// Already included in ai-agent-handshake.js
// View in GA4: Events > ai_agent_visit
```

### Health Monitoring

Set up a cron job to check manifest health:

```bash
# Add to crontab
0 2 * * * /usr/bin/node /path/to/verify-ai.js --domain=yoursite.com >> /var/log/ai-health.log 2>&1
```

---

## 🆘 Troubleshooting

### Common Issues

#### Issue: llms.txt returns 404
**Solution**: Ensure file is in webroot and server allows .txt files
```bash
# Check file location
ls -la /var/www/html/llms.txt

# Test with absolute path
curl https://yoursite.com/llms.txt
```

#### Issue: No Link header showing
**Solution**: Verify header configuration is loaded
```bash
# Apache: Check if mod_headers is enabled
apache2ctl -M | grep headers

# Nginx: Verify nginx.conf syntax
nginx -t
```

#### Issue: query-index.json has invalid JSON
**Solution**: Validate and fix syntax
```bash
# Find syntax errors
python3 -m json.tool query-index.json

# Common issues:
# - Trailing commas
# - Unescaped quotes in descriptions
# - Missing closing brackets
```

#### Issue: AI agents not citing my content
**Solution**:
1. Verify llms.txt is accessible
2. Check robots.txt allows AI bots
3. Wait 1-2 weeks for indexing
4. Submit to AI search engines manually

#### Issue: verify-ai.js fails
**Solution**: Check Node.js version and network access
```bash
# Check Node.js version (need 18+)
node --version

# Test network connectivity
curl https://yoursite.com/llms.txt

# Run with debug output
node verify-ai.js --domain=yoursite.com 2>&1 | tee debug.log
```

---

## 📚 Additional Resources

### Documentation
- **Main Blog Post**: See newblog.md for the complete guide
- **llms.txt Standard**: https://llmstxt.org
- **OASF Specification**: (Emerging standard, 2025)
- **Model Context Protocol**: https://github.com/anthropics/mcp

### Community
- Share your implementation! Tag #AINaviveWeb
- Join discussions about AI-native architecture
- Submit improvements via pull request

### Need Help?

For Digital Domain Technologies consulting:
- **Email**: info@digitaldomaintechnologies.com
- **LinkedIn**: https://www.linkedin.com/in/tom-cranstoun/

For general questions:
- Review the blog post (newblog.md)
- Check troubleshooting section above
- Search existing GitHub issues

---

## 🎉 Success Metrics

After implementation, you should see:

**Week 1**:
- [ ] All manifest files accessible (200 OK)
- [ ] Health check passing
- [ ] AI bot visits in server logs

**Month 1**:
- [ ] AI assistants citing your content
- [ ] Increased AI-referred traffic
- [ ] Proper attribution in AI responses

**Quarter 1**:
- [ ] 3x+ increase in AI bot traffic
- [ ] Featured in AI search results
- [ ] Lead quality improvement from AI referrals

---

## 📝 Final Notes

**This is a complete, production-ready implementation** based on Digital Domain Technologies' real-world AI-native architecture that manages 91 articles across 7 categories.

**Remember**:
1. Customize all branding and content for your site
2. Generate query-index.json from YOUR actual content
3. Test thoroughly before going live
4. Monitor AI traffic and iterate
5. Keep manifests updated as you add content

**The patterns are universal** - this works for any website, regardless of platform or industry. You're not just optimizing for search engines anymore; you're building for the agentic web.

Good luck! 🚀

---

**Version**: 1.0
**Last Updated**: December 27, 2025
**Based On**: Digital Domain Technologies (allabout.network) implementation
