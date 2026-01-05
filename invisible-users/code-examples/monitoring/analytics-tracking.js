/**
 * AI Agent Traffic Monitoring
 * Track AI bot visits with Google Analytics 4
 *
 * Add this to your site's JavaScript bundle or analytics configuration
 */

// Detect AI agent type from user-agent string
function detectAIAgent(userAgent) {
  if (/GPTBot|OAI-SearchBot/i.test(userAgent)) return 'OpenAI';
  if (/ClaudeBot|anthropic-ai/i.test(userAgent)) return 'Anthropic';
  if (/PerplexityBot/i.test(userAgent)) return 'Perplexity';
  if (/google-extended/i.test(userAgent)) return 'Google Gemini';
  if (/Gemini-Bot/i.test(userAgent)) return 'Google Gemini';
  if (/DeepSeek-Bot/i.test(userAgent)) return 'DeepSeek';
  if (/cohere-ai/i.test(userAgent)) return 'Cohere';
  return 'Unknown';
}

// Check if current visitor is an AI agent
function isAIAgent(userAgent) {
  return /GPTBot|ClaudeBot|PerplexityBot|OAI-SearchBot|google-extended|anthropic-ai|cohere-ai|DeepSeek-Bot|Gemini-Bot/i.test(userAgent);
}

// Track AI agent visit with Google Analytics 4
function trackAIVisit() {
  const userAgent = navigator.userAgent;

  if (isAIAgent(userAgent)) {
    // Send custom event to GA4
    if (typeof gtag === 'function') {
      gtag('event', 'ai_agent_visit', {
        'agent_type': detectAIAgent(userAgent),
        'page_path': window.location.pathname,
        'page_title': document.title
      });
    }

    // Optional: Log to console for debugging
    console.log('[AI Tracking] Agent visit:', detectAIAgent(userAgent));
  }
}

// Initialize tracking on page load
if (typeof window !== 'undefined') {
  trackAIVisit();
}

// Export for use in modules
export { detectAIAgent, isAIAgent, trackAIVisit };
