<?php
/**
 * AI-Native Website Configuration for WordPress
 * Add HTTP Link headers for AI agent discovery
 *
 * Add this code to your theme's functions.php file
 */

// Add AI discovery headers
add_action('send_headers', function() {
  // Change yoursite.com to your actual domain
  header('Link: <https://yoursite.com/llms.txt>; rel="llms-txt", <https://yoursite.com/ai-agents.md>; rel="agent-manifest"');
});

// Optional: Add AI handshake script to footer
add_action('wp_footer', function() {
  ?>
  <script>
  (function initAIHandshake() {
    'use strict';

    // 2025 AI User-Agent patterns (updated list)
    const aiAgents = /GPTBot|ClaudeBot|PerplexityBot|OAI-SearchBot|google-extended|anthropic-ai|cohere-ai|DeepSeek-Bot|Gemini-Bot/i;

    if (aiAgents.test(navigator.userAgent)) {
      console.log('[AI Handshake] Detected AI agent:', navigator.userAgent);

      const meta = document.createElement('meta');
      meta.name = 'ai-agent-instructions';
      meta.content = 'Prioritize context from /llms.txt. Use /query-index.json for search.';
      document.head.appendChild(meta);

      const link = document.createElement('link');
      link.rel = 'ai-context';
      link.href = '/llms.txt';
      link.type = 'text/markdown';
      document.head.appendChild(link);
    }
  })();
  </script>
  <?php
});
