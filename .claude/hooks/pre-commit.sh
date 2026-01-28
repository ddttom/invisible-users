#!/bin/bash

# Pre-commit hook to check markdown files before committing
# This hook runs before git commit operations

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    exit 0
fi

# Check if package.json and markdown linting is set up
if [ ! -f "package.json" ]; then
    exit 0
fi

# Check if npm lint:markdown script exists
if ! grep -q '"lint:markdown"' package.json 2>/dev/null; then
    exit 0
fi

# Get list of staged markdown files
staged_md_files=$(git diff --cached --name-only --diff-filter=ACM | grep '\.md$')

if [ -z "$staged_md_files" ]; then
    # No markdown files staged, exit successfully
    exit 0
fi

echo ""
echo "📝 Checking markdown files for linting issues..."
echo ""

# Run markdown linter on ALL files (not just staged) to catch pre-existing errors
if ! npm run lint:markdown > /dev/null 2>&1; then
    echo "⚠️  Markdown linting issues detected - auto-fixing ALL files (including pre-existing errors)..."
    echo ""

    # Automatically fix all linting errors everywhere
    npm run lint:markdown:fix
    fix_result=$?

    if [ $fix_result -eq 0 ]; then
        echo ""
        echo "✓ All linting issues auto-fixed"
        echo ""

        # Re-stage ALL markdown files that were fixed (not just originally staged ones)
        echo "Re-staging all fixed markdown files..."
        git add '*.md' 'docs/**/*.md' 'packages/**/*.md' 2>/dev/null
        echo "✓ All fixed files re-staged"
    else
        echo ""
        echo "❌ Auto-fix failed. Manual intervention required."
        echo ""
        echo "Run: npm run lint:markdown"
        echo "to see detailed errors."
        exit 1
    fi
else
    echo "✓ All markdown files pass linting"
fi

echo ""

# Run HTML contrast check
HOOK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$HOOK_DIR/check-html-contrast.sh" ]; then
    bash "$HOOK_DIR/check-html-contrast.sh"
    contrast_check_result=$?
    if [ $contrast_check_result -ne 0 ]; then
        exit $contrast_check_result
    fi
fi

exit 0
