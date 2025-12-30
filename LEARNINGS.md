# Learnings

Critical insights for AI assistants working on this book project. Focus: actionable guidance, not historical changelog.

---

## Working with Jupyter Notebooks

### NotebookEdit Tool Usage

When editing Jupyter notebook cells:

- Use `NotebookEdit` tool, not `Edit` tool
- Notebooks are JSON files with special structure
- Each cell has an ID that must be referenced
- The `new_source` parameter replaces entire cell content

**Correct approach:**

```python
NotebookEdit(
    notebook_path="/path/to/file.ipynb",
    cell_id="cell-19",
    new_source="// Updated JavaScript code..."
)
```

**Incorrect approach:** Using `Edit` tool on .ipynb files results in error message about using NotebookEdit instead.

## Priority-Based vs Time-Based Implementation Guidance

### Critical Rule from CLAUDE.md

**NEVER use time estimates** in implementation guidance. Always use priority levels instead:

- ❌ Wrong: "1-2 weeks", "1-3 months", "3-6 months"
- ✅ Correct: "Priority 1: Critical Quick Wins", "Priority 2: Essential Improvements", "Priority 3: Core Infrastructure"

This applies to ALL documents including:

- implementation-checklist.md
- chapter-10-technical-advice.md
- advice.md
- Interactive notebooks

**Rationale:** Time estimates vary wildly by team size, resources, and context. Priority levels allow teams to assess their own capacity.

## Adding Structured Tables to Chapters

### Table Formatting Requirements

Markdown tables must have:

1. Proper spacing around pipes: `| Column |` not `|Column|`
2. Separator row with proper spacing: `| ----- |` not `|-----|`
3. Blank lines before and after table
4. Consistent alignment

**Common linting error:**

```text
MD060/table-column-style: Table pipe is missing space
```

**Fix:** Ensure separator row matches header format exactly with spaces.

### Table Enhancement Pattern

When adding tables from interactive content to chapters:

1. **Read the chapter first** - Understand existing structure and find best insertion point
2. **Create contextual tables** - Don't just copy notebook tables; adapt them to chapter flow
3. **Add "Key insight" paragraphs** - Every table should have a summary paragraph explaining broader implications
4. **Match chapter tone** - Maintain British English, professional tone, avoid superlatives

**Example structure:**

```markdown
### Section Title

Explanatory paragraph introducing the table.

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Data 1   | Data 2   | Data 3   |

**Key insight:** Summary paragraph explaining what the table demonstrates and why it matters.
```

## Cross-Document Consistency

### When Adding Interactive Companion References

Must update these files simultaneously:

1. **preface.md** - Add "Interactive Companion" section under "How to Use This Book"
2. **chapter-10-technical-advice.md** - Add "Explore Further" section at end
3. **resource-links.md** - Add at top as primary resource
4. **README.md** - Add prominent section after chapter status
5. **PROJECTSTATE.md** - Add under "Supporting Materials" → "Interactive Materials"

### URL Consistency

All references must use same URL format:

- `https://allabout.network/invisible-users.html`
- Not shortened, not with www, not with trailing slash variations

## Markdown Linting Best Practices

### Running Lints

**For specific files:**

```bash
npx markdownlint --fix path/to/file.md
```

**For all markdown:**

```bash
npm run lint:markdown        # Check only
npm run lint:markdown:fix    # Fix automatically
```

**File-specific npm scripts DO NOT EXIST** - Don't try `npm run lint:md:fix:preface`

### Auto-fix Limitations

Some issues can't be auto-fixed and require manual correction:

- Heading level jumps (MD001)
- Emphasis used instead of heading (MD036)
- Table formatting with complex content

**Solution:** Read the error message, identify the line number, fix manually.

## Git Commit Guidelines

### Critical: No Attribution

From CLAUDE.md:

> **CRITICAL: Never add co-author attribution or "Generated with Claude Code" messages**

**Correct commit:**

```text
Add interactive notebook and enhance chapters

- Added Jupyter notebook with demonstrations
- Enhanced chapters with structured tables
```

**Incorrect commit:**

```text
Add interactive notebook

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Using Heredoc for Multi-line Commits

Best practice for readability:

```bash
git commit -m "$(cat <<'EOF'
Summary line

- Bullet point 1
- Bullet point 2
- Bullet point 3
EOF
)"
```

The `'EOF'` syntax prevents variable expansion in commit messages.

## Task Management with TodoWrite

### When to Use TodoWrite

Use for:

- Complex multi-step tasks (3+ distinct steps)
- Non-trivial work requiring tracking
- Tasks the user explicitly requests tracking for

Don't use for:

- Single straightforward tasks
- Trivial operations
- Purely conversational interactions

### Todo Status Management

**Critical rules:**

1. **Exactly ONE todo must be in_progress at any time** - Not less, not more
2. **Mark completed immediately** - Don't batch completions
3. **Keep todos current** - Remove irrelevant items, don't let list grow stale
4. **Provide both forms** - `content` (imperative) and `activeForm` (present continuous)

**Example:**

```json
{
  "content": "Fix markdown linting issues",
  "activeForm": "Fixing markdown linting issues",
  "status": "in_progress"
}
```

## Reading Files Before Editing

### Critical Tool Requirement

The Edit tool **requires** that you read a file before editing it. This is a hard requirement, not a suggestion.

**Correct workflow:**

1. `Read(file_path="path/to/file.md")`
2. Analyze content
3. `Edit(file_path="path/to/file.md", old_string="...", new_string="...")`

**Incorrect workflow:**

1. `Edit(file_path="path/to/file.md", ...)` ← Will fail with error

**Rationale:** Prevents editing files blindly without understanding current state.

---
