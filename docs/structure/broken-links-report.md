---
title: "Broken Links Report - Context-Preserving References Implementation"
author: "Tom Cranstoun"
date: "2026-01-30"
description: "Comprehensive report of 85 broken markdown links requiring manual review and fixes"
keywords: [broken-links, maintenance, documentation-quality]
ai-instruction: "This report documents broken markdown links found during context-preserving references implementation. Each broken link requires human judgment about whether to fix path, create missing file, or remove reference."
---

# Broken Links Report

**Generated:** 2026-01-30
**Total Broken Links:** 85
**Source:** Context-preserving references implementation script
**Status:** Requires manual review and remediation

## Executive Summary

During the systematic application of context-preserving URLs to markdown links across all repositories, the automated script identified **85 broken links** that point to non-existent files or have incorrect paths. These links have been categorized below with recommended actions.

## Categories and Recommendations

### 1. Pattern Examples (Keep As-Is) - 7 Links

These are example links in documentation ABOUT the context-preserving pattern itself. They should NOT be "fixed" as they are intentional placeholders demonstrating the pattern.

**Files:**
- `docs/for-ai/context-preserving-references-guide.md` (3 examples)
- `docs/structure/context-preserving-refs-implementation-plan.md` (2 examples)
- `docs/structure/context-preserving-urls-progress.md` (2 examples)

**Patterns:**
- `*.md`, `.*\.md`, `\.\./.*\.md` - Regex patterns used as examples

**Action:** ✅ No action needed - these are intentional examples

---

### 2. Missing Documentation Files (Create or Remove) - 12 Links

These reference files that should exist but don't. Requires decision: create the file or remove the reference.

#### High Priority (Create Files)

**docs/structure/MX-plan.md** (1 link)
- Referenced in: `README.md`
- Description: "Machine Experience (MX) Strategic Review"
- **Recommendation:** Create file or update README.md to point to existing strategic docs
- **Priority:** HIGH (main README references this)

**docs/vscode-extension-cleanup.md** (1 link)
- Referenced in: `ONBOARDING.md`
- Description: Extension recommendations
- **Recommendation:** Create file with VSCode extension recommendations or remove reference
- **Priority:** MEDIUM

**architecture.md** (1 link)
- Referenced in: `packages/mx-handbook/chapters/chapter-09-anti-patterns.md`
- Context: MX-Handbook architecture doc
- **Recommendation:** Create if needed or fix path to existing architecture doc
- **Priority:** LOW (handbook internal reference)

#### Patent/Legal Files (Low Priority - Consider Removing)

**mx-card-system-patent-disclosure.md** (3 links)
- Referenced in: `mx-card-book-update-plan.md`, `mx-card-copyright-plan.md`, `mx-card-provisional-application.md`
- **Recommendation:** Create if patent documentation is active, otherwise remove references
- **Priority:** LOW (patent-related docs)

**mx-card-patent-plan.md** (3 links)
- Referenced in: Same files as above
- **Recommendation:** Same as above
- **Priority:** LOW

**mx-card-nda-template.md** (1 link)
- Referenced in: `mx-card-provisional-application.md`
- **Recommendation:** Create if needed for patent process, otherwise remove
- **Priority:** LOW

**mx-card-patent-plan.md** (duplicate references tracked above)

#### Web Audit Suite Documentation

**IMPROVEMENT_PLAN.md** (2 links)
- Referenced in: `packages/web-audit-suite/CODE_REVIEW_CHECKLIST.md`, `PROJECTSTATE.md`
- **Recommendation:** Create file with improvement roadmap or remove references
- **Priority:** MEDIUM

**appendix-battle-tested-lessons.md** (1 link)
- Referenced in: `packages/web-audit-suite/CODE_REVIEW_CHECKLIST.md`
- **Recommendation:** Create or remove reference
- **Priority:** LOW

---

### 3. Incorrect Relative Paths (Fix Paths) - 34 Links

These files likely exist but the relative path is wrong. Need to find correct path and update.

#### Use Cases Directory (ingest/use-cases/) - 24 Links

All files in `ingest/use-cases/` have broken links to compliance specs and other docs:

**Broken paths:**
- `../CLAUDE.md` (7 files) - Should be `../../CLAUDE.md`
- `../README.md` (1 file) - Should be `../../README.md`
- `../cms-compliance.md` (7 files) - Should be `../../docs/structure/cms-compliance.md`
- `../mx-compliance.md` (8 files) - Should be `../../docs/structure/mx-compliance.md`
- `../mx-compliance-css.md` (3 files) - Should be `../../docs/structure/mx-compliance-css.md`
- `../mx-compliance-javascript.md` (3 files) - Should be `../../docs/structure/mx-compliance-javascript.md`
- `../mx-compliance-markdown.md` (2 files) - Should be `../../docs/structure/mx-compliance-markdown.md`
- `../mx-compliance-conference.md` (1 file) - Should be `../../docs/structure/mx-compliance-conference.md`

**Affected files:**
1. `ingest/use-cases/README.md`
2. `ingest/use-cases/ceo.md`
3. `ingest/use-cases/cms-agencies.md`
4. `ingest/use-cases/cms-vendors.md`
5. `ingest/use-cases/conference-organisers.md`
6. `ingest/use-cases/designers.md`
7. `ingest/use-cases/developers.md`
8. `ingest/use-cases/platform-creators.md`
9. `ingest/use-cases/product-owners.md`

**Action:** 🔧 Fix all paths in use-cases directory (batch operation possible)
**Priority:** MEDIUM (ingest directory is draft content)

#### Config/System Directory - 2 Links

**config/system/GIT-README.md:**
- Broken: `../repo/LEARNINGS.md`
- Should be: `../../LEARNINGS.md`
- **Action:** 🔧 Fix path
- **Priority:** HIGH (critical git workflow doc)

**config/system/doc-architecture.md:**
- Broken: `../structure/blog-metadata-schema.md`
- Should be: `../../docs/structure/blog-metadata-schema.md`
- **Action:** 🔧 Fix path
- **Priority:** HIGH (key architecture doc)

#### Cross-Repository References - 8 Links

**packages/mx-gathering/.githooks/README.md:**
- Broken: `../packages/shared-appendices/appendix-d-ai-friendly-html-guide.md` (cross-repo)
- Broken: `../packages/shared-appendices/appendix-l-proposed-ai-metadata-patterns.md` (cross-repo)
- **Action:** ❌ Remove (cross-repo references violate repository-scoped principle)
- **Priority:** LOW

**packages/mx-gathering/profiles/claude.code.md:**
- Broken: `../../.claude/skills/humanizer/skill.md` (cross-repo to main)
- **Action:** ❌ Remove (cross-repo reference)
- **Priority:** LOW

**packages/mx-gathering/contributors/style-guide-summary.md:**
- Broken: `../../docs/for-ai/writing-style.md` (cross-repo to main)
- **Action:** ❌ Remove or create style guide in mx-gathering repo
- **Priority:** LOW

**packages/mx-handbook/chapters/chapter-09-anti-patterns.md:**
- Broken: `../../README.md`, `../../CLAUDE.md` (cross-repo to main)
- Broken: `../development/ENVIRONMENTS.md` (doesn't exist in handbook)
- **Action:** ❌ Remove cross-repo references
- **Priority:** MEDIUM

**packages/mx-handbook/README.md:**
- Broken: `../shared-appendices/appendix-f-implementation-roadmap.md`
- **Action:** 🔧 Fix to `../mx-appendices/appendix-f-implementation-roadmap.md` if file exists
- **Priority:** MEDIUM

#### Renamed Directories

**docs/structure/quick-start-card-examples.md:**
- Broken: `../../packages/shared-appendices/appendix-o-pattern-templates.md`
- Should be: `../../packages/mx-appendices/appendix-o-pattern-templates.md`
- **Action:** 🔧 Fix directory name (shared-appendices → mx-appendices)
- **Priority:** LOW

**packages/mx-appendices/appendix-o-pattern-templates.md:**
- Broken: `../../structure/plan-1-extract-patterns-to-bible.md`
- Broken: `../../structure/plan-2-mx-patterns-book-structure.md`
- Broken: `../../structure/project-roadmap-mx-patterns.md`
- **Action:** 🔧 Check if files exist in docs/structure/ and fix paths
- **Priority:** LOW

#### Other Path Issues

**docs/structure/new-files-25-jan-2026.md:**
- Broken: `../../packages/bible/update%20plan.md` (URL encoded space, old directory name)
- Broken: `../../packages/sales-enablement/pitches/mx-convergence-pitch.md` (path issue)
- Broken: `../for-ai/architecting-multi-repo-codebases.md` (doesn't exist)
- **Action:** 🔧 Fix paths or remove dead links
- **Priority:** LOW (historical tracking doc)

**docs/structure/project-roadmap-mx-patterns.md:**
- Broken: `../architecture/GIT-README.md`
- Should be: `../../config/system/GIT-README.md`
- **Action:** 🔧 Fix path
- **Priority:** LOW

**docs/structure/mx-compliance-conference.md:**
- Broken: `./use-cases/conference-organisers.md`
- Should be: `../../ingest/use-cases/conference-organisers.md` (maybe)
- **Action:** 🔧 Check if file exists and fix path
- **Priority:** LOW

---

### 4. Template/Example Links (Keep As-Is) - 7 Links

These are placeholder examples in template documentation showing how links should be formatted.

**docs/structure/mx-compliance-markdown.md:**
- `./CONTRIBUTING.md`
- `./docs/api-reference.md`
- `./docs/configuration.md`
- `./docs/getting-started.md`
- `./related-document.md`
- `./related-one.md`
- `./related-two.md`

**Action:** ✅ No action needed - these are template examples
**Priority:** N/A

---

### 5. External Repository Links (Cannot Fix) - 4 Links

These reference files in external repositories or legacy projects that don't exist.

**packages/external/ucp/CONTRIBUTING.md:**
- Broken: `../../issues/new?template=enhancement-proposal.md`
- **Action:** ⚠️ External UCP repo - do not modify (READ-ONLY)
- **Priority:** N/A

**packages/web-audit-suite/RECONCILIATION-STATUS.md:**
- Broken: `../../my-pa11y-project/CLAUDE.md`
- Broken: `../../my-pa11y-project/fix-fox.md`
- **Action:** ❌ Remove references to non-existent my-pa11y-project
- **Priority:** LOW

**packages/business/mx-business/products/web-audit-suite-business-guide.md:**
- Broken: `../../packages/web-audit-suite/README.md`
- Should be: `../../../web-audit-suite/README.md`
- **Action:** 🔧 Fix path
- **Priority:** MEDIUM (business docs)

**packages/web-audit-suite/README.md:**
- Broken: `../../docs/sales-enablement/web-audit-suite-business-guide.md`
- Should be: `../../packages/business/mx-sales-enablement/web-audit-suite-business-guide.md` (maybe)
- **Action:** 🔧 Check if file exists and fix path
- **Priority:** MEDIUM

**packages/web-audit-suite/PROJECTSTATE.md:**
- Broken: `.github/CI_CD_INTEGRATION.md`
- Should be: `../../.github/CI_CD_INTEGRATION.md` (maybe)
- **Action:** 🔧 Check if file exists and fix path
- **Priority:** LOW

---

### 6. Code Examples References - 2 Links

**packages/mx-appendices/appendix-d-ai-friendly-html-guide.md:**
**packages/mx-the-bible/manuscripts/shared-appendices/appendix-d-ai-friendly-html-guide.md:**
- Broken: `code-examples/README.md`
- Should be: `../mx-code-examples/README.md`
- **Action:** 🔧 Fix path
- **Priority:** LOW

---

## Summary by Action Type

| Action | Count | Priority |
|--------|-------|----------|
| ✅ Keep as-is (examples/templates) | 14 | N/A |
| 🔧 Fix incorrect paths | 34 | HIGH: 2, MEDIUM: 15, LOW: 17 |
| ❌ Remove dead links | 12 | MEDIUM: 1, LOW: 11 |
| 📝 Create missing files | 12 | HIGH: 1, MEDIUM: 2, LOW: 9 |
| ⚠️ Cannot fix (external repos) | 1 | N/A |
| **TOTAL** | **85** | **Manual review required** |

## Immediate Action Items (High Priority)

1. **Fix config/system/GIT-README.md** - Incorrect path to LEARNINGS.md
2. **Fix config/system/doc-architecture.md** - Incorrect path to blog-metadata-schema.md
3. **Create or fix docs/structure/MX-plan.md** - Referenced in main README.md
4. **Batch fix ingest/use-cases/*.md** - All 9 files have same path issues (can be scripted)

## Recommended Workflow

### Phase 1: Quick Wins (Estimated: 30 minutes)
1. Fix high-priority incorrect paths (2 files)
2. Batch fix use-cases directory paths (9 files)
3. Remove cross-repo references (8 files)

### Phase 2: File Creation Decisions (Estimated: 1-2 hours)
1. Decide on MX-plan.md - create or redirect
2. Decide on patent documentation - keep or remove
3. Create or remove Web Audit Suite improvement docs

### Phase 3: Cleanup (Estimated: 30 minutes)
1. Remove obsolete my-pa11y-project references
2. Fix renamed directory references (shared-appendices → mx-appendices)
3. Clean up historical tracking docs

### Phase 4: Re-run Script
After fixing broken links, re-run the context-preserving URLs script to add URLs to newly-fixed links:

```bash
python3 scripts/add-context-urls.py
```

## Validation Commands

```bash
# Count remaining broken links
python3 scripts/add-context-urls.py 2>&1 | grep "Warning: Linked file not found" | wc -l

# List broken links by category
grep "Warning: Linked file not found: \.\." /tmp/broken-links.txt | wc -l  # Relative paths
grep "Warning: Linked file not found: [^/.]" /tmp/broken-links.txt | wc -l  # Missing files

# Find files with most broken links
python3 scripts/add-context-urls.py 2>&1 | grep "Warning" | cut -d: -f2 | sort | uniq -c | sort -rn
```

## Related Documentation

- [Context-Preserving URLs Progress Report](./context-preserving-urls-progress.md) ("Context-Preserving URLs Progress Report" at <https://github.com/ddttom/invisible-users/blob/main/docs/structure/context-preserving-urls-progress.md>)
- [Context-Preserving References Guide](../for-ai/context-preserving-references-guide.md) ("Context-Preserving References Implementation Guide" at <https://github.com/ddttom/invisible-users/blob/main/docs/for-ai/context-preserving-references-guide.md>)
- [Anti-Pattern 14: Context-Free References](../../packages/mx-appendices/appendix-n-anti-patterns-catalog.md) ("Appendix N: Anti-Patterns Catalog" at <https://github.com/ddttom/invisible-users/blob/main/packages/mx-appendices/appendix-n-anti-patterns-catalog.md>)

## Notes

- All example/template links (21 total) are intentional and should NOT be "fixed"
- Cross-repo references should be removed per repository-scoped principle
- Batch operations possible for use-cases directory (all 9 files have same issues)
- After fixes, re-run script to add context-preserving URLs to newly-fixed links

---

**Last Updated:** 2026-01-30
**Status:** Awaiting manual review and remediation
**Next Step:** Execute Phase 1 quick wins
