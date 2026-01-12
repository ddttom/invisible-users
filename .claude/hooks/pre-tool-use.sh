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

    # Check if we're in the submodule (path contains packages/manuscript/manuscript/)
    if [[ "$CURRENT_DIR" == */packages/manuscript/manuscript* ]]; then
        echo "❌ CRITICAL ERROR: Attempting to access .claude/ from submodule directory!"
        echo ""
        echo "Current directory: $CURRENT_DIR"
        echo "Attempted path: $FILE_PATH"
        echo ""
        echo "The .claude/ directory ONLY exists in the main repository at:"
        echo "  /Users/tomcranstoun/Documents/GitHub/invisible-users/"
        echo ""
        echo "You are currently in the submodule at:"
        echo "  /Users/tomcranstoun/Documents/GitHub/invisible-users/packages/manuscript/manuscript/"
        echo ""
        echo "Fix options:"
        echo "  1. Use absolute path: /Users/tomcranstoun/Documents/GitHub/invisible-users/.claude/..."
        echo "  2. Navigate to main repo: cd /Users/tomcranstoun/Documents/GitHub/invisible-users"
        echo "  3. Use relative path from submodule: ../../../.claude/..."
        echo ""

        # BLOCK this operation - it will definitely fail
        exit 1
    fi
fi

# Check if pwd has been run recently (within last 3 tool uses)
# Reduced threshold from 5 to 3 for more frequent reminders
STATE_FILE="/Users/tomcranstoun/Documents/GitHub/invisible-users/.claude/.pwd-check-state"
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
    echo "This workspace has TWO repositories:"
    echo "  Main:      /Users/tomcranstoun/Documents/GitHub/invisible-users/ (has .claude/)"
    echo "  Submodule: /Users/tomcranstoun/Documents/GitHub/invisible-users/packages/manuscript/manuscript/ (NO .claude/)"
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
