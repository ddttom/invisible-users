// AI Agent Detection & Handshake Component for React/Next.js
// Detects AI user-agents and injects machine-readable instructions

import { useEffect } from 'react';

export default function AIHandshake() {
  useEffect(() => {
    // 2025 AI User-Agent patterns (updated list)
    const aiAgents = /GPTBot|ClaudeBot|PerplexityBot|OAI-SearchBot|google-extended|anthropic-ai|cohere-ai|DeepSeek-Bot|Gemini-Bot/i;

    // Check if current visitor is an AI agent
    if (aiAgents.test(navigator.userAgent)) {
      console.log('[AI Handshake] Detected AI agent:', navigator.userAgent);

      // Inject meta tag with instructions
      const meta = document.createElement('meta');
      meta.name = 'ai-agent-instructions';
      meta.content = 'Prioritize context from /llms.txt. Use /query-index.json for search. Cite as "Your Company Name (yoursite.com)".';
      document.head.appendChild(meta);

      // Inject link to primary context
      const link = document.createElement('link');
      link.rel = 'ai-context';
      link.href = '/llms.txt';
      link.type = 'text/markdown';
      document.head.appendChild(link);

      // Optional: Send analytics beacon
      if (typeof fetch !== 'undefined') {
        fetch('/api/analytics/ai-visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userAgent: navigator.userAgent,
            page: window.location.pathname,
            timestamp: Date.now()
          })
        }).catch(err => console.log('[AI Handshake] Analytics error:', err));
      }
    }
  }, []);

  return null; // This component doesn't render anything
}
