#!/bin/bash

# AI Bot Traffic Analysis from Server Logs
# Analyzes Apache/Nginx access logs for AI bot visits

# Usage: ./server-log-analysis.sh /path/to/access.log

if [ $# -eq 0 ]; then
    echo "Usage: $0 /path/to/access.log"
    exit 1
fi

LOG_FILE=$1

if [ ! -f "$LOG_FILE" ]; then
    echo "Error: Log file not found: $LOG_FILE"
    exit 1
fi

echo "🤖 AI Bot Traffic Analysis"
echo "Log file: $LOG_FILE"
echo ""

# Count visits by AI bot type
echo "Visits by AI Bot Type:"
echo "======================"
grep -E 'GPTBot|ClaudeBot|PerplexityBot|OAI-SearchBot|google-extended|anthropic-ai|DeepSeek-Bot|Gemini-Bot' "$LOG_FILE" | \
  awk '{
    if ($0 ~ /GPTBot|OAI-SearchBot/) print "OpenAI"
    else if ($0 ~ /ClaudeBot|anthropic-ai/) print "Anthropic"
    else if ($0 ~ /PerplexityBot/) print "Perplexity"
    else if ($0 ~ /google-extended|Gemini-Bot/) print "Google Gemini"
    else if ($0 ~ /DeepSeek-Bot/) print "DeepSeek"
    else if ($0 ~ /cohere-ai/) print "Cohere"
  }' | sort | uniq -c | sort -rn

echo ""

# Most accessed paths by AI bots
echo "Most Accessed Paths by AI Bots:"
echo "================================"
grep -E 'GPTBot|ClaudeBot|PerplexityBot|OAI-SearchBot|google-extended' "$LOG_FILE" | \
  awk '{print $7}' | sort | uniq -c | sort -rn | head -20

echo ""

# Check for 404 errors from AI bots
echo "404 Errors from AI Bots:"
echo "========================"
grep -E 'GPTBot|ClaudeBot|PerplexityBot|OAI-SearchBot|google-extended' "$LOG_FILE" | \
  grep ' 404 ' | awk '{print $7}' | sort | uniq -c | sort -rn

echo ""
echo "Analysis complete."
