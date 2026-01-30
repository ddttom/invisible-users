# Context-Preserving References Implementation Plan

---
mx:
  purpose: "Implementation plan for applying MX Principle 5 (Context-Preserving References) across all repositories in the workspace"
  audience: both
  stability: experimental
  version: "1.0.0"
  last_updated: "2026-01-30"
  ai:
    context_provides:
      - implementation-plan
      - context-preserving-references
      - cross-repository-updates
    editable: true
    assistance: welcome
    context_required:
      - ../../CLAUDE.md
      - ../for-ai/mx-principles-for-repos.md
      - ../../config/system/repo-philosophy.md
  related_files:
    - ../../CLAUDE.md
    - ../for-ai/mx-principles-for-repos.md
    - ../../config/system/repo-philosophy.md
---

## Objective

Apply **MX Principle 5: Context-Preserving References** across all repositories in the workspace to ensure links remain meaningful when documents are separated from their repository context.

## Current State

**Problem:** Relative-only links like `[file.md](../../path/file.md)` break when:
- Documents are extracted to PDF
- Files are downloaded or copied
- Content enters AI agent context windows
- Users need to mentally parse complex folder structures

**Cost:**
- Human cognitive load parsing relative paths
- AI token consumption reconstructing repository structure
- Broken links in extracted documents
- Reduced comprehension outside repository context

## Target Pattern

**Replace:**
```markdown
[filename](../../path/to/file.md)
```

**With:**
```markdown
[filename](../../path/to/file.md) ("Document Title" at <https://github.com/org/repo/blob/main/path/to/file.md>)
```

## Scope

### Repositories in Workspace

**Main Repository:**
- `invisible-users` (main hub)

**Content Submodules:**
- `packages/mx-the-bible/` → MX-Bible manuscript
- `packages/mx-handbook/` → MX-Handbook
- `packages/mx-gathering/` → Community resources (PUBLIC)
- `packages/mx-appendices/` → Shared appendices
- `packages/mx-code-examples/` → Pattern examples

**Private Submodules:**
- `packages/mx-outputs/` → Generated content (PRIVATE)
- `packages/business/mx-business/` → Business planning (PRIVATE)
- `packages/business/mx-sales-enablement/` → Sales enablement (PRIVATE)

**Reference Submodules:**
- `packages/external/ucp/` → Universal Commerce Protocol (external)
- `packages/notes/` → Development practices

### File Types to Update

**Priority 1 - Documentation:**
- README.md files
- CLAUDE.md / AGENTS.md / GEMINI.md
- All markdown files in `docs/` directories
- Contributing guides, licenses with documentation value

**Priority 2 - Content:**
- Book manuscript files (`manuscripts/`, `chapters/`)
- Appendix files
- Blog post markdown
- Specification documents

**Priority 3 - Code Documentation:**
- Code examples with embedded documentation
- Inline documentation referencing other files

## Implementation Phases

### Phase 1: Main Repository (Hub)

**Files to update:**
1. `CLAUDE.md` - Already has the pattern documented, check for compliance
2. `README.md` - Update any cross-document references
3. `LEARNINGS.md` - Update references to other docs
4. `docs/**/*.md` - All documentation files
5. `config/**/*.md` - Configuration documentation
6. `.claude/**/*.md` - Skill documentation

**Estimated files:** ~30-50 markdown files

**Approach:**
- Search for markdown links: `[text](path)`
- Identify cross-document references (not internal anchors)
- Add context-preserving suffix with document title and absolute URL
- Test that relative links still work in IDE
- Verify absolute URLs resolve correctly

### Phase 2: Public Content Submodules

**2a. MX-Gathering (PUBLIC, EDITABLE)**
- High priority - public-facing repository
- Community contribution guidelines
- README and documentation files
- Estimated files: ~15-20

**2b. MX-Bible Manuscript**
- Chapter cross-references
- Appendix references
- Documentation files
- Estimated files: ~20-30

**2c. MX-Handbook**
- Chapter cross-references
- Implementation guides
- Documentation
- Estimated files: ~15-25

**2d. MX-Appendices**
- Cross-references between appendices
- References to main content
- Estimated files: ~12-15

**2e. MX-Code-Examples**
- README and example documentation
- Cross-references to patterns
- Estimated files: ~10-15

### Phase 3: Private Submodules

**3a. MX-Outputs**
- Blog post markdown files
- Generated documentation
- Estimated files: ~20-40

**3b. MX-Business**
- Business planning documents
- Strategic documentation
- Estimated files: ~10-20

**3c. MX-Sales-Enablement**
- Sales materials
- Pitch documents
- Estimated files: ~10-15

### Phase 4: Reference Submodules

**4a. Notes (Development Practices)**
- Coding standards
- Development guides
- Estimated files: ~5-10

**4b. External/UCP**
- Decision: Update or leave as external reference?
- This is an external project - may not want to modify
- Estimated files: TBD

## Implementation Strategy

### Step-by-Step Process

**For each repository:**

1. **Identify cross-document references:**
   ```bash
   # Find markdown links (excluding external URLs and anchors)
   grep -r '\[.*\](\.\.*/.*\.md)' --include="*.md" .
   ```

2. **For each reference:**
   - Read the target file to get its title (H1 heading or YAML frontmatter title)
   - Construct absolute GitHub URL
   - Apply context-preserving pattern
   - Verify relative link still works
   - Verify absolute URL resolves

3. **Commit pattern:**
   - Commit each submodule individually
   - Use descriptive commit messages
   - Push submodule changes first
   - Update main repo pointer after

### Automation Considerations

**Option 1: Manual (Recommended for initial implementation)**
- Read each file individually
- Understand context
- Apply pattern with proper document titles
- Higher quality, lower risk

**Option 2: Semi-Automated**
- Script to find all cross-document references
- Generate list for manual review
- Apply changes with assistance
- Review before commit

**Option 3: Fully Automated (Not recommended initially)**
- Risk of incorrect document title extraction
- Risk of breaking valid references
- Risk of missing context
- Better for second pass after manual review

## Quality Assurance

### Validation Checks

**For each updated file:**
- [ ] Relative link still works in IDE
- [ ] Absolute URL resolves correctly
- [ ] Document title matches target file
- [ ] Pattern syntax is correct
- [ ] No broken links introduced

**For each repository:**
- [ ] All cross-document references updated
- [ ] No internal anchors accidentally modified
- [ ] No external links accidentally modified
- [ ] Markdown linting passes
- [ ] Build/generation scripts still work

### Testing Approach

1. **IDE Testing:** Click relative links in VS Code/IDE to verify they work
2. **URL Testing:** Visit absolute URLs in browser to verify they resolve
3. **Extraction Testing:** Copy markdown to external file and verify URLs work
4. **Build Testing:** Run any build scripts to ensure no breakage

## Rollout Strategy

### Approach A: Sequential (Lower Risk)

**Week 1:**
- Phase 1: Main repository
- Validate approach, refine process

**Week 2:**
- Phase 2a-2c: Public content submodules (MX-Gathering, MX-Bible, MX-Handbook)
- High-value, high-visibility repos

**Week 3:**
- Phase 2d-2e: Remaining public submodules (Appendices, Code Examples)
- Phase 3: Private submodules

**Week 4:**
- Phase 4: Reference submodules
- Final validation and cleanup

### Approach B: Parallel (Faster)

**All phases in parallel:**
- Multiple agents/sessions working simultaneously
- Higher coordination overhead
- Faster completion
- Higher risk of conflicts

### Approach C: Priority-Driven (Recommended)

**Prioritize by impact:**
1. **Critical:** CLAUDE.md, MX-Principles, main documentation (Phase 1)
2. **High:** Public repositories (MX-Gathering, MX-Bible, MX-Handbook)
3. **Medium:** Other content submodules
4. **Low:** Private/reference submodules

Complete critical and high priority, then evaluate remaining effort.

## Risks and Mitigation

### Risk 1: Broken Links

**Risk:** Incorrectly constructed absolute URLs don't resolve
**Mitigation:**
- Test each URL before committing
- Use consistent GitHub URL pattern
- Verify repository names and paths

### Risk 2: Wrong Document Titles

**Risk:** Extracted document titles don't match actual content
**Mitigation:**
- Read target files to extract actual titles
- Use H1 heading or YAML frontmatter title
- Verify title makes sense in context

### Risk 3: Build Script Breakage

**Risk:** Changes break PDF generation or other build processes
**Mitigation:**
- Test build scripts after changes
- Verify markdown processors handle the pattern
- Keep relative links intact

### Risk 4: Submodule Pointer Issues

**Risk:** Forgetting to update main repo pointers after submodule changes
**Mitigation:**
- Use submodule-first workflow (documented in GIT-README.md)
- Commit submodules before main repo
- Use git -C commands to avoid navigation errors

### Risk 5: Scope Creep

**Risk:** Attempting to fix all references becomes overwhelming
**Mitigation:**
- Focus on priority repositories first
- Accept incremental progress
- Document remaining work for future sessions

## Success Criteria

### Phase 1 Success (Main Repository)

- [ ] All cross-document references in main repo use context-preserving pattern
- [ ] All relative links still work in IDE
- [ ] All absolute URLs resolve correctly
- [ ] Documentation updated and committed
- [ ] No build script breakage

### Complete Success (All Repositories)

- [ ] All repositories updated with context-preserving references
- [ ] Pattern applied consistently across workspace
- [ ] All validation checks pass
- [ ] Documentation reflects new standard
- [ ] Future contributions follow pattern (enforced by CLAUDE.md guidance)

## Effort Estimation

### Time Requirements

**Phase 1 (Main Repository):**
- Analysis: 30-60 minutes
- Implementation: 2-4 hours
- Testing/validation: 1-2 hours
- Total: 3.5-7 hours

**Phase 2 (Public Content):**
- Per repository: 1-3 hours
- Total: 6-12 hours

**Phase 3 (Private Submodules):**
- Per repository: 1-2 hours
- Total: 3-6 hours

**Phase 4 (Reference):**
- Per repository: 30 minutes - 2 hours
- Total: 1-4 hours

**Overall Estimate:** 13.5-29 hours total effort

**Note:** Actual time depends on:
- Number of cross-document references found
- Complexity of repository structure
- Automation approach chosen
- Interruptions and context switching

## Next Steps

### Pre-Implementation

1. **Review this plan** with stakeholders
2. **Clarify decisions** via questions:
   - Which rollout approach? (Sequential / Parallel / Priority-Driven)
   - Include external/UCP or skip?
   - Manual or semi-automated approach?
   - All repositories or subset?
3. **Get approval** to proceed
4. **Set up tracking** for progress monitoring

### Implementation Kickoff

1. Start with Phase 1 (Main Repository)
2. Document learnings and refine process
3. Apply learnings to subsequent phases
4. Regular checkpoints for progress review

## Open Questions

**To be clarified before implementation:**

1. **Scope:** Update all repositories or prioritize subset?
2. **External repos:** Include packages/external/ucp/ or skip as external reference?
3. **Approach:** Manual, semi-automated, or mix?
4. **Rollout:** Sequential phases or priority-driven?
5. **Resources:** Single implementation session or multiple sessions?
6. **Timeline:** Complete in one go or incremental over multiple sessions?

---

**Plan Status:** Draft for Review
**Next Action:** Clarify open questions and get approval to proceed
