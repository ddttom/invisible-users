Execute the systematic "step commit" workflow:

1. Initial Commit
   - Review all current changes with git status and git diff
   - **CRITICAL**: Check if git status shows `modified: packages/manuscript/manuscript (modified content, untracked content)` - this indicates submodule has uncommitted changes
   - If submodule has changes, handle it FIRST (see step 1a below)
   - Commit all current code changes with a clear, descriptive commit message
   - Do NOT add attribution or "Generated with" messages

1a. Submodule Handling (if submodule shows modified content)
   - Navigate to submodule: `cd packages/manuscript/manuscript`
   - Run git status and git diff in submodule
   - Stage and commit submodule changes
   - Push submodule commits to remote
   - Return to main repository: `cd /Users/tomcranstoun/Documents/GitHub/invisible-users`
   - Stage submodule pointer update: `git add packages/manuscript/manuscript`
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
   - Check if changes affect synchronized files: docs/sales-enablement/PITCH.md, BLOG.md, CLAUDE.md, README.md

4. Cross-Project Consistency Check (CRITICAL)
   - If changes affect terminology, patterns, or concepts:
     - Verify book manuscript (packages/manuscript/manuscript/) is the authoritative source
     - Check if tool (packages/web-audit-suite/) needs updates to match book
     - Ensure all documentation uses consistent terminology
   - Terminology changes MUST flow: book → tool → documentation
   - Verify alignment across both projects:
     - Book manuscript (packages/manuscript/manuscript/)
     - Web Audit Suite (packages/web-audit-suite/)
   - Check shared terminology standards (see CLAUDE.md "Cross-Project Consistency")

5. Documentation Updates
   - Update any necessary documentation files
   - Verify docs/sales-enablement/PITCH.md and BLOG.md reflect current features and approach
   - Ensure contact information is consistent (<tom.cranstoun@gmail.com>)
   - Commit documentation changes

6. Learning Documentation
   - CRITICAL: LEARNINGS.md is ONLY for mistakes or misunderstandings
   - Read LEARNINGS.md first to see the required format
   - Ask: "Did something break? Did I misunderstand? Did I learn the hard way?"
   - Required format: "**Rule** (YYYY-MM-DD): Tried X, but this breaks Y. Always do Z."
   - NEVER add: project knowledge, documentation refs, "We added X", architecture
   - If nothing broke or was misunderstood, SKIP this step entirely

7. Project State
   - Update or create PROJECTSTATE.md
   - Document current state only (not historical)
   - Keep this as a snapshot of current implementation status

8. Changelog
   - Update CHANGELOG.md with all changes made in this session
   - This is where historical "what we did" content goes
   - Follow chronological order (newest first)

9. Final Steps
   - Commit changelog updates
   - Ask user if they want to push all commits to remote

Execute each step methodically, reporting progress after each stage is complete.
