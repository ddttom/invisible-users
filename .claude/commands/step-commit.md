Execute the systematic "step commit" workflow:

**IMPORTANT**: This repository has dual git repositories (main + submodule). For comprehensive git workflow guidance, see GIT-README.md which explains safe patterns using `git -C` to avoid navigation errors.

1. Initial Commit
   - Review all current changes with git status and git diff
   - **CRITICAL**: Check if git status shows `modified: submodule (modified content, untracked content)` - this indicates submodule has uncommitted changes
   - If submodule has changes, handle it FIRST (see step 1a below)
   - Commit all current code changes with a clear, descriptive commit message
   - Do NOT add attribution or "Generated with" messages

1a. Submodule Handling (if submodule shows modified content)
   - **See GIT-README.md "Workflow 3: Commit Changes in Both Repositories" for detailed guidance**
   - Use `git -C submodule` commands to avoid navigation issues
   - Run git status and git diff in submodule: `git -C submodule status`
   - Stage and commit submodule changes: `git -C submodule add -A && git -C submodule commit -m "Message"`
   - Push submodule commits to remote: `git -C submodule push origin main`
   - Stage submodule pointer update: `git add submodule`
   - Commit pointer update: `git commit -m "Update manuscript submodule with [description]"`
   - Continue with main repository workflow

2. Linting
   - Run lint on all changed files
   - Fix all linting errors
   - Commit lint fixes separately

3. Documentation Review
   - Check last modification dates of README.md, CLAUDE.md, and CHANGELOG.md
   - Review if these files need updates based on recent changes
   - Use CHANGELOG.md to understand past changes if needed
   - Review all project documents mentioned in CLAUDE.md
   - Check if changes affect synchronized files: packages/sales-enablement/pitches/PITCH.md, BLOG.md, CLAUDE.md, README.md

4. Cross-Project Consistency Check (CRITICAL)
   - If changes affect terminology, patterns, or concepts:
     - Verify book manuscript (submodule/) is the authoritative source
     - Check if tool (packages/web-audit-suite/) needs updates to match book
     - Ensure all documentation uses consistent terminology
   - Terminology changes MUST flow: book → tool → documentation
   - Verify alignment across both projects:
     - Book manuscript (submodule/)
     - Web Audit Suite (packages/web-audit-suite/)
   - Check shared terminology standards (see CLAUDE.md "Cross-Project Consistency")

5. Documentation Updates
   - Update any necessary documentation files
   - Verify packages/sales-enablement/pitches/PITCH.md and BLOG.md reflect current features and approach
   - Ensure contact information is consistent (<tom.cranstoun@gmail.com>)
   - Commit documentation changes

6. Learning Documentation
   - CRITICAL: LEARNINGS.md is ONLY for mistakes or misunderstandings
   - Read LEARNINGS.md first to see the required format
   - Ask: "Did something break? Did I misunderstand? Did I learn the hard way?"
   - Required format: "**Rule** (YYYY-MM-DD): Tried X, but this breaks Y. Always do Z."
   - NEVER add: project knowledge, documentation refs, "We added X", architecture
   - If nothing broke or was misunderstood, SKIP this step entirely

7. Changelog
   - Update CHANGELOG.md with all changes made in this session
   - CHANGELOG.md serves as both historical record AND current project state
   - Follow chronological order (newest first)
   - Include: Added, Changed, Fixed sections as appropriate
   - Document submodule updates with commit hashes

8. Final Steps
   - Commit changelog updates
   - Ask user if they want to push all commits to remote

Execute each step methodically, reporting progress after each stage is complete.
