#!/bin/bash

# Post-tool-use hook for automatic markdown linting and git workflow reminders
# This hook runs after certain tool uses

# Get the tool name and file path
TOOL_NAME="$1"
TOOL_OUTPUT="$2"
FILE_PATH="$3"

# Function to run markdown linting and fixing
lint_and_fix_markdown() {
    local file="$1"

    # Skip if file doesn't exist or isn't a markdown file
    if [ ! -f "$file" ] || [[ ! "$file" =~ \.md$ ]]; then
        return 0
    fi

    # Skip files in excluded directories
    if [[ "$file" =~ node_modules ]] || \
       [[ "$file" =~ packages/web-audit-suite/node_modules ]] || \
       [[ "$file" =~ packages/bible ]] || \
       [[ "$file" =~ packages/dont-make-ai-think ]] || \
       [[ "$file" =~ packages/shared-appendices ]] || \
       [[ "$file" =~ packages/shared-code-examples ]] || \
       [[ "$file" =~ outputs ]] || \
       [[ "$file" =~ CHANGELOG ]] || \
       [[ "$file" =~ CHANGELOG-FULL ]]; then
        return 0
    fi

    echo ""
    echo "📝 Auto-linting markdown file: $file"

    # Run markdownlint fix
    if npx markdownlint --fix "$file" 2>/dev/null; then
        # Check if there are still errors
        if npx markdownlint "$file" 2>/dev/null; then
            echo "✅ Markdown linting passed"
        else
            echo "⚠️  Some markdown issues require manual fixing"
            echo "   Run: npx markdownlint \"$file\" to see details"
        fi
    else
        echo "⚠️  Markdown linting encountered issues"
    fi
    echo ""
}

# Handle Edit and Write tool operations on markdown files
if [ "$TOOL_NAME" = "Edit" ] || [ "$TOOL_NAME" = "Write" ]; then
    if [ -n "$FILE_PATH" ]; then
        lint_and_fix_markdown "$FILE_PATH"
    fi
fi

# Handle Bash tool for git operations reminder
if [ "$TOOL_NAME" = "Bash" ]; then
    # Check if the command involved git commit
    if echo "$TOOL_OUTPUT" | grep -q "git commit"; then
        # Check if this looks like a step-commit workflow
        if ! echo "$TOOL_OUTPUT" | grep -q "step-commit" && ! echo "$TOOL_OUTPUT" | grep -q "LEARNINGS.md"; then
            echo ""
            echo "💡 TIP: Consider using the step-commit workflow for comprehensive commits:"
            echo "   /step-commit"
            echo ""
            echo "This ensures:"
            echo "  ✓ Proper linting"
            echo "  ✓ Documentation updates"
            echo "  ✓ Learning documentation"
            echo "  ✓ Proper attribution"
            echo ""
        fi
    fi
fi

exit 0
