#!/bin/bash

# Script to commit and push changes in both main repository and manuscript submodule
# Ensures proper handling of submodule commits and pointer updates

set -e  # Exit on error

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SUBMODULE_PATH="$REPO_ROOT/packages/manuscript/the-bible-of-mx"

echo "🔍 Checking for changes..."

# Check if submodule has changes
cd "$SUBMODULE_PATH"
SUBMODULE_CHANGES=$(git status --porcelain)

if [ -n "$SUBMODULE_CHANGES" ]; then
    echo ""
    echo "📝 Submodule has changes:"
    git status --short
    echo ""

    # Prompt for submodule commit message
    read -p "Enter commit message for manuscript submodule (or press Enter for 'tidy'): " SUBMODULE_MSG

    # Default to "tidy" if no message provided
    if [ -z "$SUBMODULE_MSG" ]; then
        SUBMODULE_MSG="tidy"
    fi

    echo "📦 Committing submodule changes..."
    git add -A
    git commit -m "$SUBMODULE_MSG"

    echo "⬆️  Pushing submodule to remote..."
    git push origin main
    echo "✅ Submodule committed and pushed"
else
    echo "✅ No changes in manuscript submodule"
fi

# Check main repository for changes
cd "$REPO_ROOT"
MAIN_CHANGES=$(git status --porcelain)

if [ -n "$MAIN_CHANGES" ]; then
    echo ""
    echo "📝 Main repository has changes:"
    git status --short
    echo ""

    # Prompt for main repo commit message
    read -p "Enter commit message for main repository (or press Enter for 'tidy'): " MAIN_MSG

    # Default to "tidy" if no message provided
    if [ -z "$MAIN_MSG" ]; then
        MAIN_MSG="tidy"
    fi

    echo "📦 Committing main repository changes..."
    git add -A
    git commit -m "$MAIN_MSG"

    echo "⬆️  Pushing main repository to remote..."
    git push origin main
    echo "✅ Main repository committed and pushed"
else
    echo "✅ No changes in main repository"
fi

echo ""
echo "🎉 All done!"
