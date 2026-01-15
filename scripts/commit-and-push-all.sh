#!/bin/bash

# Script to commit and push changes in both main repository and manuscript submodule
# Ensures proper handling of submodule commits and pointer updates

set -e  # Exit on error

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SUBMODULE_PATH="$REPO_ROOT/packages/manuscript/manuscript"

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
    read -p "Enter commit message for manuscript submodule (or press Enter to skip): " SUBMODULE_MSG

    if [ -n "$SUBMODULE_MSG" ]; then
        echo "📦 Committing submodule changes..."
        git add -A
        git commit -m "$SUBMODULE_MSG"

        echo "⬆️  Pushing submodule to remote..."
        git push origin main
        echo "✅ Submodule committed and pushed"
    else
        echo "⏭️  Skipping submodule commit"
    fi
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
    read -p "Enter commit message for main repository (or press Enter to skip): " MAIN_MSG

    if [ -n "$MAIN_MSG" ]; then
        echo "📦 Committing main repository changes..."
        git add -A
        git commit -m "$MAIN_MSG"

        echo "⬆️  Pushing main repository to remote..."
        git push origin main
        echo "✅ Main repository committed and pushed"
    else
        echo "⏭️  Skipping main repository commit"
    fi
else
    echo "✅ No changes in main repository"
fi

echo ""
echo "🎉 All done!"
