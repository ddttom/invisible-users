---
title: "GitHub Notes Application"
author: "Tom Cranstoun"
date: "2026-01-30"
description: "Product Requirements Document for a collaborative markdown notes application backed by GitHub"
keywords: [notes, github, markdown, collaboration, authentication]
ai-instruction: "This is a PRD for a notes application. Focus on technical requirements and user workflows."
status: "draft"
version: "1.0.0"
---

# GitHub Notes Application - Product Requirements Document

## Executive Summary

A web-based notes application that uses GitHub repositories as its storage backend. Users authenticate via GitHub, create and edit markdown notes with ownership metadata, and changes are automatically synchronised with the repository. User identity and permissions are managed through a separate GitHub repository, enabling decentralised access control.

## Problem Statement

Teams and individuals need a simple way to collaboratively manage markdown notes with:

- Version control and history
- Clear ownership and attribution
- Metadata tagging for organisation
- No vendor lock-in (data stored as plain markdown in GitHub)
- Familiar Git-based workflow without requiring Git expertise

## Target Users

1. **Individual note-takers** - Personal knowledge management with GitHub backup
2. **Small teams** - Collaborative documentation with clear ownership
3. **Open source projects** - Community-contributed documentation
4. **Technical writers** - Markdown-native editing with version control

## Core Requirements

### 1. Authentication and Identity

#### 1.1 User Authentication

- Users MUST log in via GitHub OAuth to use the system
- Authentication flow uses standard GitHub OAuth 2.0
- Session tokens are securely stored and refreshed as needed
- Users can log out, which clears local session data

#### 1.2 Identity Repository

- User identity and permissions are stored in a **separate GitHub repository** (identity repo)
- Identity repo contains a `users/` directory with one JSON file per user
- User file naming convention: `users/{github-username}.json`

**User identity file structure:**

```json
{
  "github_username": "johndoe",
  "github_id": 12345678,
  "display_name": "John Doe",
  "email": "john@example.com",
  "created_at": "2026-01-30T10:00:00Z",
  "last_login": "2026-01-30T14:30:00Z",
  "roles": ["editor"],
  "permissions": {
    "can_create": true,
    "can_edit_own": true,
    "can_edit_others": false,
    "can_delete_own": true,
    "can_delete_others": false
  }
}
```

#### 1.3 Role Definitions

| Role | Description | Permissions |
|------|-------------|-------------|
| `viewer` | Read-only access | View notes only |
| `editor` | Standard user | Create, edit own, delete own |
| `moderator` | Extended permissions | Edit and delete any note |
| `admin` | Full control | All permissions plus user management |

### 2. Notes Repository

#### 2.1 Repository Connection

- Application connects to a **public GitHub repository** (notes repo)
- Repository URL is configurable per deployment
- Application clones/pulls all markdown files on connection
- Only `.md` files are treated as notes

#### 2.2 Note Structure

All notes MUST include YAML frontmatter with required metadata:

```markdown
---
title: "Note Title"
owner: "github-username"
created_at: "2026-01-30T10:00:00Z"
updated_at: "2026-01-30T14:30:00Z"
updated_by: "github-username"
tags: ["project-x", "meeting-notes", "action-items"]
---

# Note Title

Note content in markdown format...
```

#### 2.3 Required Metadata Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Human-readable note title |
| `owner` | string | GitHub username of creator (immutable) |
| `created_at` | ISO 8601 | Creation timestamp (immutable) |
| `updated_at` | ISO 8601 | Last modification timestamp |
| `updated_by` | string | GitHub username of last editor |
| `tags` | array | User-defined metadata tags |

#### 2.4 Optional Metadata Fields

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Brief summary of note content |
| `category` | string | Primary categorisation |
| `related_notes` | array | Paths to related notes |
| `visibility` | string | `public` or `team` (default: `public`) |
| `locked` | boolean | Prevent edits (admin only) |

### 3. Note Operations

#### 3.1 Create Note

**Trigger:** User clicks "New Note" button

**Process:**

1. Display new note editor with empty content
2. User enters title and content
3. User optionally adds tags
4. On save:
   - Generate filename from title (slugified)
   - Add frontmatter with `owner` set to current user
   - Set `created_at` and `updated_at` to current timestamp
   - Commit to local repository
   - Push to GitHub

**Filename generation:**

- Convert title to lowercase
- Replace spaces with hyphens
- Remove special characters
- Ensure uniqueness (append number if collision)
- Example: "Meeting Notes Q1" → `meeting-notes-q1.md`

#### 3.2 Edit Note

**Trigger:** User opens existing note and modifies content

**Process:**

1. Validate user has permission to edit (owner or moderator/admin)
2. Load note content into editor
3. User makes changes
4. On save:
   - Update `updated_at` timestamp
   - Update `updated_by` to current user
   - Preserve `owner` and `created_at` (immutable)
   - Commit with message: `Update: {note-title}`
   - Push to GitHub

#### 3.3 Delete Note

**Trigger:** User clicks "Delete" on a note

**Process:**

1. Validate user has permission (owner or moderator/admin)
2. Display confirmation dialog
3. On confirm:
   - Remove file from repository
   - Commit with message: `Delete: {note-title}`
   - Push to GitHub

#### 3.4 Rename Note

**Trigger:** User selects "Rename" option

**Process:**

1. Validate user has permission (owner or moderator/admin)
2. Display rename dialog with current title
3. User enters new title
4. On confirm:
   - Generate new filename from title
   - Update `title` in frontmatter
   - Update `updated_at` and `updated_by`
   - Use `git mv` to rename file (preserves history)
   - Commit with message: `Rename: {old-title} → {new-title}`
   - Push to GitHub

#### 3.5 Copy Note

**Trigger:** User selects "Copy" option

**Process:**

1. Any authenticated user can copy any note
2. Display copy dialog with suggested title: "{original-title} (Copy)"
3. User can modify title
4. On confirm:
   - Create new file with new filename
   - Set `owner` to current user (copy creator becomes owner)
   - Set `created_at` to current timestamp
   - Optionally add `copied_from` field referencing original
   - Commit with message: `Copy: {original-title} → {new-title}`
   - Push to GitHub

#### 3.6 Move Note

**Trigger:** User selects "Move" option to change directory location

**Process:**

1. Validate user has permission (owner or moderator/admin)
2. Display directory picker
3. User selects target directory
4. On confirm:
   - Use `git mv` to move file
   - Update `updated_at` and `updated_by`
   - Commit with message: `Move: {note-title} to {directory}`
   - Push to GitHub

### 4. Synchronisation

#### 4.1 Push Strategy

Changes are pushed to GitHub immediately after each operation:

- Create → Push
- Edit/Save → Push
- Delete → Push
- Rename → Push
- Copy → Push
- Move → Push

#### 4.2 Pull Strategy

- On application load: Full pull of notes repository
- Periodic background sync: Every 5 minutes (configurable)
- Manual refresh: User can trigger pull
- Before edit: Check for remote changes, warn if conflict

#### 4.3 Conflict Resolution

If remote changes exist when user attempts to save:

1. Fetch latest changes
2. Attempt automatic merge
3. If conflict:
   - Display diff view showing local vs remote changes
   - User chooses: Keep local, Keep remote, or Manual merge
4. After resolution, push merged result

### 5. User Interface

#### 5.1 Main Views

**Note List View:**

- Display all notes as cards or list items
- Show: title, owner avatar, last updated, tags
- Sort by: updated date, created date, title, owner
- Filter by: tags, owner, date range

**Note Editor View:**

- Split view: Markdown editor (left) + Preview (right)
- Toolbar: Bold, italic, headings, lists, links, images
- Tag editor with autocomplete from existing tags
- Save button with keyboard shortcut (Ctrl/Cmd+S)
- Status indicator: Saved, Unsaved changes, Syncing

**Settings View:**

- Connected repository information
- User profile (from identity repo)
- Sync preferences
- Theme selection (light/dark)

#### 5.2 Navigation

- Sidebar with folder tree (mirrors repository structure)
- Search bar with full-text search
- Recent notes quick access
- Favourites/pinned notes

### 6. Technical Architecture

#### 6.1 Technology Stack

**Frontend:**

- React or Vue.js for UI framework
- Monaco Editor or CodeMirror for markdown editing
- Marked or Remark for markdown rendering
- TailwindCSS for styling

**Backend:**

- Node.js with Express or Fastify
- isomorphic-git for Git operations
- GitHub OAuth integration
- Optional: Redis for session caching

**Storage:**

- Notes: Public GitHub repository
- Identity: Separate GitHub repository
- Local: IndexedDB for offline cache

#### 6.2 API Endpoints

```text
POST   /auth/github              # Initiate GitHub OAuth
GET    /auth/github/callback     # OAuth callback
POST   /auth/logout              # End session

GET    /api/notes                # List all notes
GET    /api/notes/:path          # Get single note
POST   /api/notes                # Create note
PUT    /api/notes/:path          # Update note
DELETE /api/notes/:path          # Delete note
POST   /api/notes/:path/copy     # Copy note
POST   /api/notes/:path/move     # Move note
POST   /api/notes/:path/rename   # Rename note

GET    /api/sync/status          # Get sync status
POST   /api/sync/pull            # Trigger pull
POST   /api/sync/push            # Trigger push

GET    /api/user/me              # Current user profile
GET    /api/user/:username       # Get user by username
```

#### 6.3 Security Considerations

- All API endpoints require authentication (except OAuth flow)
- GitHub tokens are encrypted at rest
- HTTPS required for all connections
- Rate limiting on API endpoints
- Input sanitisation on all user content
- XSS prevention in markdown rendering

### 7. Non-Functional Requirements

#### 7.1 Performance

- Note list loads in under 2 seconds
- Editor opens in under 1 second
- Save operation completes in under 3 seconds
- Search returns results in under 500ms

#### 7.2 Reliability

- Offline mode: Edit locally, sync when online
- Auto-save drafts every 30 seconds
- Retry failed pushes with exponential backoff
- Clear error messages for sync failures

#### 7.3 Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation throughout
- Screen reader compatible
- High contrast mode support

#### 7.4 Scalability

- Support repositories with up to 10,000 notes
- Handle concurrent edits by multiple users
- Efficient incremental sync (not full clone each time)

### 8. Future Considerations

Items not in initial scope but may be added later:

- Real-time collaborative editing (CRDT-based)
- Comments and discussions on notes
- Note templates
- Export to PDF/DOCX
- Mobile application
- Webhooks for external integrations
- Private repository support (with user's token)
- Multiple notes repositories per deployment

### 9. Success Metrics

- User can create, edit, and delete notes within 30 seconds
- Sync failures occur in less than 1% of operations
- 95% of users complete onboarding without support
- Average session length exceeds 10 minutes

### 10. Glossary

| Term | Definition |
|------|------------|
| Notes repo | The public GitHub repository storing markdown notes |
| Identity repo | Separate GitHub repository storing user profiles and permissions |
| Owner | The GitHub user who originally created a note |
| Frontmatter | YAML metadata block at the start of a markdown file |
| Slug | URL-safe version of a title (lowercase, hyphens) |

---

## Appendix A: Example Workflows

### A.1 First-Time User Onboarding

1. User visits application URL
2. Clicks "Sign in with GitHub"
3. Redirected to GitHub OAuth consent screen
4. Grants permission to application
5. Redirected back to application
6. Application checks identity repo for user profile
7. If new user: Creates profile with default `editor` role
8. User sees note list (may be empty on first visit)

### A.2 Creating a Team Knowledge Base

1. Admin creates new GitHub repository for notes
2. Admin configures application to use this repository
3. Admin adds team members to identity repo with appropriate roles
4. Team members sign in and begin creating notes
5. Notes automatically sync across all team members

### A.3 Handling Merge Conflicts

1. User A opens "Project Plan" note
2. User B opens same note simultaneously
3. User A saves changes (pushes to GitHub)
4. User B saves changes
5. Application detects conflict
6. User B sees conflict resolution UI
7. User B reviews diff, chooses to merge both changes
8. Merged version is pushed to GitHub

---

## Appendix B: Identity Repository Structure

```text
identity-repo/
├── README.md
├── users/
│   ├── johndoe.json
│   ├── janesmith.json
│   └── ...
├── roles/
│   └── definitions.json
└── config/
    └── settings.json
```

**roles/definitions.json:**

```json
{
  "roles": {
    "viewer": {
      "description": "Read-only access",
      "permissions": ["read"]
    },
    "editor": {
      "description": "Standard user",
      "permissions": ["read", "create", "edit_own", "delete_own"]
    },
    "moderator": {
      "description": "Extended permissions",
      "permissions": ["read", "create", "edit_any", "delete_any"]
    },
    "admin": {
      "description": "Full control",
      "permissions": ["read", "create", "edit_any", "delete_any", "manage_users"]
    }
  }
}
```

---

## Appendix C: Note Frontmatter Schema

```yaml
# Required fields
title: string          # Human-readable title
owner: string          # GitHub username (immutable after creation)
created_at: datetime   # ISO 8601 timestamp (immutable)
updated_at: datetime   # ISO 8601 timestamp
updated_by: string     # GitHub username of last editor
tags: array[string]    # User-defined tags

# Optional fields
description: string    # Brief summary
category: string       # Primary category
related_notes: array[string]  # Relative paths to related notes
visibility: enum[public, team]  # Default: public
locked: boolean        # Prevents edits (admin only)
copied_from: string    # Path to original if this is a copy
```
