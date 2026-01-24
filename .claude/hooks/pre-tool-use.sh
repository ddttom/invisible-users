#!/bin/bash

# Pre-tool-use hook: Detect wrong-repository file path mistakes
# This hook prevents the common error of accessing .claude/ from submodule

# Get the tool being used and file path from environment
TOOL_NAME="${CLAUDE_TOOL_NAME:-}"
FILE_PATH="${CLAUDE_TOOL_PARAM_file_path:-}"

# Also check other path parameters
if [[ -z "$FILE_PATH" ]]; then
    FILE_PATH="${CLAUDE_TOOL_PARAM_notebook_path:-}"
fi
if [[ -z "$FILE_PATH" ]]; then
    FILE_PATH="${CLAUDE_TOOL_PARAM_path:-}"
fi

# File operation tools that require location awareness
FILE_TOOLS=("Read" "Edit" "Write" "NotebookEdit" "Glob" "Grep")

# Check if this is a file operation tool
is_file_tool=false
for tool in "${FILE_TOOLS[@]}"; do
    if [[ "$TOOL_NAME" == "$tool" ]]; then
        is_file_tool=true
        break
    fi
done

# If not a file tool, allow through
if [[ "$is_file_tool" == false ]]; then
    exit 0
fi

# CRITICAL CHECK: Detect .claude/ path access from wrong location
if [[ "$FILE_PATH" == .claude/* ]] || [[ "$FILE_PATH" == */.claude/* ]]; then
    CURRENT_DIR=$(pwd)

    # Check if we're in a submodule (path contains /packages/ or /outputs/)
    if [[ "$CURRENT_DIR" == */packages/* ]] || [[ "$CURRENT_DIR" == */outputs/* ]]; then
        # Extract main repo path by removing everything after /invisible-users/
        MAIN_REPO_PATH="${CURRENT_DIR%%/invisible-users/*}/invisible-users"

        echo "❌ CRITICAL ERROR: Attempting to access .claude/ from submodule directory!"
        echo ""
        echo "Current directory: $CURRENT_DIR"
        echo "Attempted path: $FILE_PATH"
        echo ""
        echo "The .claude/ directory ONLY exists in the main repository."
        echo ""
        echo "Fix options:"
        echo "  1. Use absolute path: ${MAIN_REPO_PATH}/.claude/..."
        echo "  2. Navigate to main repo: cd ${MAIN_REPO_PATH}"
        echo "  3. Use relative path from submodule (adjust ../ count based on depth)"
        echo ""

        # BLOCK this operation - it will definitely fail
        exit 1
    fi
fi

# MANUSCRIPT WRITING STYLE CHECK: Detect manuscript file operations
# Remind Claude to follow writing style guide when editing manuscript content
if [[ "$TOOL_NAME" == "Edit" ]] || [[ "$TOOL_NAME" == "Write" ]] || [[ "$TOOL_NAME" == "NotebookEdit" ]]; then
    if [[ "$FILE_PATH" == *"packages/manuscript/the-bible-of-mx"* ]]; then
        # Check file extension for text content (not images, PDFs, etc.)
        if [[ "$FILE_PATH" =~ \.(md|html|txt)$ ]]; then
            echo "📝 WRITING STYLE REMINDER: Manuscript content detected"
            echo ""
            echo "Consult writing style guide: docs/for-ai/writing-style.md"
            echo ""
            echo "Key requirements:"
            echo "  - British English (organise, colour, whilst)"
            echo "  - Avoid forbidden vocabulary (delve, leverage, robust, seamless, etc.)"
            echo "  - No colons in headings"
            echo "  - Active voice, third person default"
            echo "  - Concise, calm, concrete tone"
            echo ""
            echo "To review document against style guide: /review-docs [file path]"
            echo ""
            # Don't block - just inform
        fi
    fi
fi

# MARKDOWN WORKFLOW CHECK: Detect markdown file operations
# Remind Claude about YAML frontmatter and heading structure
if [[ "$TOOL_NAME" == "Edit" ]] || [[ "$TOOL_NAME" == "Write" ]]; then
    if [[ "$FILE_PATH" =~ \.md$ ]]; then
        echo "📝 MARKDOWN WORKFLOW REMINDER: Editing markdown file"
        echo ""
        echo "CRITICAL: Avoid title duplication in YAML frontmatter"
        echo ""
        echo "If markdown has H1 heading:"
        echo "  - DO NOT include 'title:' field in YAML frontmatter (redundant duplication)"
        echo "  - Choose ONE: H1 in content (preferred) OR title in frontmatter"
        echo "  - Duplication causes MD025 warnings and redundancy"
        echo ""
        echo "Use /md-workflow skill for comprehensive guidance"
        echo "Use npm run lint:markdown:fix after editing"
        echo ""
        # Don't block - just inform
    fi
fi

# MX-GATHERING HTML VALIDATION: Detect HTML file operations in MX-Gathering
# Remind Claude to follow AI-Friendly HTML Guide patterns (Appendix D)
if [[ "$TOOL_NAME" == "Edit" ]] || [[ "$TOOL_NAME" == "Write" ]]; then
    if [[ "$FILE_PATH" =~ \.html$ ]] && [[ "$FILE_PATH" == *"packages/mx-gathering"* ]]; then
        echo "🤖 MX-GATHERING HTML REMINDER: Creating/editing HTML for MX platform"
        echo ""
        echo "CRITICAL: Follow AI-Friendly HTML Guide patterns (Appendix D)"
        echo ""
        echo "Required patterns:"
        echo "  ✓ Schema.org JSON-LD structured data"
        echo "  ✓ Explicit state with data-* attributes"
        echo "  ✓ Semantic HTML elements (<main>, <article>, <section>)"
        echo "  ✓ ARIA attributes for accessibility"
        echo "  ✓ Language attribute on <html> element"
        echo "  ✓ Meta tags (charset, viewport)"
        echo "  ✓ Skip-to-content link"
        echo ""
        echo "Reference: packages/shared-appendices/appendix-d-ai-friendly-html-guide.md"
        echo ""
        echo "After editing, the pre-commit hook will validate these patterns."
        echo "Hook location: packages/mx-gathering/.githooks/pre-commit"
        echo ""
        # Don't block - just inform
    fi
fi

# Check if pwd has been run recently (within last 3 tool uses)
# Reduced threshold from 5 to 3 for more frequent reminders
# Dynamically determine main repo path
MAIN_REPO_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
STATE_FILE="${MAIN_REPO_PATH}/.claude/.pwd-check-state"
PWD_CHECK_THRESHOLD=3

# Initialize state file if it doesn't exist
if [[ ! -f "$STATE_FILE" ]]; then
    echo "0" > "$STATE_FILE"
fi

# Read current counter
COUNTER=$(cat "$STATE_FILE" 2>/dev/null || echo "999")

# If counter is above threshold, warn user
if [[ "$COUNTER" -ge "$PWD_CHECK_THRESHOLD" ]]; then
    echo "⚠️  REMINDER: Verify working directory before file operations"
    echo ""
    echo "This workspace has MULTIPLE repositories (1 hub + submodules):"
    echo "  Hub repo:  ${MAIN_REPO_PATH}/ (has .claude/)"
    echo "  Submodules: Located in packages/ and outputs/ (NO .claude/ in submodules)"
    echo ""
    echo "Current directory: $(pwd)"
    echo ""
    echo "Run 'pwd' if you're unsure of your location."
    echo ""

    # Reset counter since we're showing pwd
    echo "0" > "$STATE_FILE"

    # Don't block - just warn
    exit 0
fi

# Increment counter (pwd not checked recently)
NEW_COUNTER=$((COUNTER + 1))
echo "$NEW_COUNTER" > "$STATE_FILE"

# Allow operation to proceed
exit 0
