#!/bin/bash

# Pre-tool-use hook: Enforce pwd check before file operations
# This hook prevents file path errors in repos with submodules

# Get the tool being used from environment variable
TOOL_NAME="${CLAUDE_TOOL_NAME:-}"

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

# Check if pwd has been run recently (within last 5 tool uses)
# We track this in a state file
STATE_FILE=".claude/.pwd-check-state"
PWD_CHECK_THRESHOLD=5

# Initialize state file if it doesn't exist
if [[ ! -f "$STATE_FILE" ]]; then
    echo "0" > "$STATE_FILE"
fi

# Read current counter
COUNTER=$(cat "$STATE_FILE" 2>/dev/null || echo "999")

# If counter is above threshold, warn user
if [[ "$COUNTER" -ge "$PWD_CHECK_THRESHOLD" ]]; then
    echo "⚠️  WARNING: Working directory not verified recently"
    echo ""
    echo "This repository has TWO locations:"
    echo "  1. Main repo:  /Users/tomcranstoun/Documents/GitHub/invisible-users/"
    echo "  2. Submodule:  /Users/tomcranstoun/Documents/GitHub/invisible-users/invisible-users/manuscript/"
    echo ""
    echo "The .claude/ directory only exists in the main repo."
    echo ""
    echo "Before using $TOOL_NAME, you should verify location with:"
    echo "  pwd"
    echo ""
    echo "Current working directory is:"
    pwd
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
