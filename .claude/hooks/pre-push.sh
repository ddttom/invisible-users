#!/bin/bash

# Pre-push hook to update CHANGELOG.md and remind about documentation
# This hook runs before git push operations

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    exit 0
fi

# Get the root directory of the repository
REPO_ROOT=$(git rev-parse --show-toplevel)

# CRITICAL: Only run in main repository, not in submodules
if [ "$(basename "$REPO_ROOT")" != "invisible-users" ]; then
    exit 0
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  WARNING: You have uncommitted changes."
    echo "Consider using the step-commit workflow:"
    echo "  - Run: /step-commit"
    echo "  - Or use the step-commit skill"
    echo ""
    echo "This ensures proper documentation and attribution."
    echo ""
    read -p "Continue with push anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Update CHANGELOG.md automatically
CHANGELOG_FILE="${REPO_ROOT}/CHANGELOG.md"
if [ -f "$CHANGELOG_FILE" ]; then
    # Get the last commit message and hash
    LAST_COMMIT_MSG=$(git log -1 --pretty=%B)
    LAST_COMMIT_HASH=$(git log -1 --pretty=%h)
    LAST_COMMIT_DATE=$(date +%Y-%m-%d)

    # Check if CHANGELOG has been updated for this commit
    LAST_CHANGELOG_UPDATE=$(git log -1 --format=%ct -- CHANGELOG.md 2>/dev/null || echo 0)
    LAST_COMMIT_TIME=$(git log -1 --format=%ct)

    # If CHANGELOG wasn't updated in the last commit, prompt to update it
    if [ "$LAST_CHANGELOG_UPDATE" -lt "$LAST_COMMIT_TIME" ]; then
        echo ""
        echo "📝 CHANGELOG.md hasn't been updated for recent commits."
        echo ""
        echo "Last commit: [$LAST_COMMIT_HASH] $LAST_COMMIT_MSG"
        echo ""
        echo "REMINDER: CHANGELOG.md should document:"
        echo "  - What changed (Added/Changed/Fixed/Removed)"
        echo "  - Which submodules were updated (with commit hashes)"
        echo "  - Date and version identifier"
        echo "  - Impact notes explaining why the changes matter"
        echo ""
        echo "The CHANGELOG serves as both a historical record AND current project state."
        echo ""
        read -p "Update CHANGELOG.md before pushing? (Y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Nn]$ ]]; then
            echo ""
            echo "Please update CHANGELOG.md manually, then:"
            echo "  1. git add CHANGELOG.md"
            echo "  2. git commit -m \"Update CHANGELOG.md\""
            echo "  3. git push"
            echo ""
            exit 1
        fi
    fi
else
    echo "⚠️  WARNING: CHANGELOG.md not found in main repository."
    echo "CHANGELOG.md should exist at: $CHANGELOG_FILE"
    echo ""
fi

# Check if recent commits have proper attribution
recent_commits=$(git log -5 --format=%B)
if ! echo "$recent_commits" | grep -q "Claude Code"; then
    echo "ℹ️  NOTE: Recent commits may be missing AI attribution."
    echo "The step-commit workflow ensures proper attribution."
    echo ""
fi

# Check if documentation files need updates
last_code_change=$(git log -1 --format=%ct -- . ':!*.md')
last_readme_change=$(git log -1 --format=%ct -- README.md 2>/dev/null || echo 0)
last_claude_change=$(git log -1 --format=%ct -- CLAUDE.md 2>/dev/null || echo 0)

if [ "$last_code_change" -gt "$last_readme_change" ] || [ "$last_code_change" -gt "$last_claude_change" ]; then
    echo "ℹ️  NOTE: Code changes are newer than documentation."
    echo "Consider reviewing:"
    echo "  - README.md"
    echo "  - CLAUDE.md"
    echo ""
fi

# Check GitHub Actions workflow files for common issues
WORKFLOW_DIR="${REPO_ROOT}/.github/workflows"
if [ -d "$WORKFLOW_DIR" ]; then
    # Get actual submodule paths from .gitmodules
    if [ -f "${REPO_ROOT}/.gitmodules" ]; then
        ACTUAL_SUBMODULES=$(grep "path = " "${REPO_ROOT}/.gitmodules" | sed 's/.*path = //')

        # Check each workflow file
        WORKFLOW_ERRORS=0
        for workflow in "${WORKFLOW_DIR}"/*.yml "${WORKFLOW_DIR}"/*.yaml; do
            if [ -f "$workflow" ]; then
                workflow_name=$(basename "$workflow")

                # Check for old/incorrect submodule paths
                if grep -q "packages/bible\|packages/shared-appendices\|packages/shared-code-examples" "$workflow"; then
                    echo "❌ ERROR: $workflow_name contains outdated submodule paths"
                    echo "   Found old paths that should be updated:"
                    grep -n "packages/bible\|packages/shared-appendices\|packages/shared-code-examples" "$workflow" | sed 's/^/     /'
                    echo ""
                    WORKFLOW_ERRORS=1
                fi

                # Extract submodule references from workflow (git submodule update lines)
                WORKFLOW_SUBMODULES=$(grep -o "git submodule update.*packages/[^ ]*" "$workflow" 2>/dev/null | sed 's/.*packages\//packages\//' | sort -u)

                if [ -n "$WORKFLOW_SUBMODULES" ]; then
                    # Check if referenced submodules exist in .gitmodules
                    while IFS= read -r submod_path; do
                        if ! echo "$ACTUAL_SUBMODULES" | grep -q "^${submod_path}$"; then
                            echo "❌ ERROR: $workflow_name references non-existent submodule: $submod_path"
                            echo "   This submodule does not exist in .gitmodules"
                            echo ""
                            WORKFLOW_ERRORS=1
                        fi
                    done <<< "$WORKFLOW_SUBMODULES"
                fi

                # Basic YAML syntax check (if yq or python is available)
                if command -v python3 > /dev/null 2>&1; then
                    if ! python3 -c "import yaml, sys; yaml.safe_load(open('$workflow'))" 2>/dev/null; then
                        echo "❌ ERROR: $workflow_name has invalid YAML syntax"
                        echo ""
                        WORKFLOW_ERRORS=1
                    fi
                fi
            fi
        done

        if [ $WORKFLOW_ERRORS -eq 1 ]; then
            echo "🚨 GitHub Actions workflow validation failed!"
            echo ""
            echo "Please fix the workflow errors before pushing."
            echo "Workflow files are in: .github/workflows/"
            echo ""
            echo "Current submodules (from .gitmodules):"
            echo "$ACTUAL_SUBMODULES" | sed 's/^/  - /'
            echo ""
            exit 1
        fi
    fi
fi

exit 0
