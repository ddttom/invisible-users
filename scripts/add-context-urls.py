#!/usr/bin/env python3
"""
Add context-preserving URLs to markdown links.

Pattern: [file](path) ("Title" at <URL>)

This script:
1. Finds all markdown files
2. Identifies links to .md files
3. Checks if they already have context-preserving URLs
4. Adds URLs using the pattern if missing
"""

import os
import re
import sys
from pathlib import Path
from typing import List, Tuple

# Repository base URL
BASE_URL = "https://github.com/ddttom/invisible-users/blob/main/"

def extract_title_from_md(filepath: str) -> str:
    """Extract title from markdown file (first H1 or YAML frontmatter)."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check for YAML frontmatter title
        yaml_match = re.match(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
        if yaml_match:
            yaml_content = yaml_match.group(1)
            title_match = re.search(r'^title:\s*["\']?(.*?)["\']?\s*$', yaml_content, re.MULTILINE)
            if title_match:
                return title_match.group(1).strip()

        # Check for first H1
        h1_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        if h1_match:
            return h1_match.group(1).strip()

        # Fallback to filename
        return Path(filepath).stem.replace('-', ' ').replace('_', ' ').title()
    except Exception as e:
        print(f"Warning: Could not extract title from {filepath}: {e}", file=sys.stderr)
        return Path(filepath).stem.replace('-', ' ').replace('_', ' ').title()

def find_md_links(content: str) -> List[Tuple[str, str, str]]:
    """Find all markdown links to .md files.

    Returns list of tuples: (full_match, link_text, link_path)
    """
    # Pattern: [text](path.md) but NOT [text](path.md) ("Title" at <URL>)
    pattern = r'\[([^\]]+)\]\(([^)]+\.md)\)(?!\s*\([^)]*at\s*<[^>]+>\))'
    matches = []

    # Skip placeholder/example patterns
    skip_patterns = [
        'path/to/',
        'path/file',
        r'\.\*\\\.md',
        r'\\\.',
        'http://',
        'https://',
        'example.md',
        '../../path/',
    ]

    for match in re.finditer(pattern, content):
        full_match = match.group(0)
        link_text = match.group(1)
        link_path = match.group(2)

        # Skip if it's a placeholder/example
        if any(skip in link_path for skip in skip_patterns):
            continue

        matches.append((full_match, link_text, link_path))

    return matches

def resolve_path(current_file: str, link_path: str, repo_root: str) -> str:
    """Resolve relative path to absolute repository path."""
    current_dir = os.path.dirname(current_file)

    # Handle absolute paths (starting with /)
    if link_path.startswith('/'):
        abs_path = os.path.join(repo_root, link_path.lstrip('/'))
    else:
        # Try relative to current directory first
        abs_path = os.path.normpath(os.path.join(current_dir, link_path))

        # If that doesn't exist, try relative to repo root
        if not os.path.exists(abs_path):
            abs_path_from_root = os.path.join(repo_root, link_path)
            if os.path.exists(abs_path_from_root):
                abs_path = abs_path_from_root

    # Get path relative to repo root
    try:
        rel_path = os.path.relpath(abs_path, repo_root)
        return rel_path
    except ValueError:
        # Path is outside repo
        return link_path

def process_file(filepath: str, repo_root: str, dry_run: bool = False) -> Tuple[int, int]:
    """Process a single markdown file.

    Returns: (files_read, links_updated)
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}", file=sys.stderr)
        return 0, 0

    links = find_md_links(content)
    if not links:
        return 0, 0

    updated_content = content
    links_updated = 0
    files_read = 0

    for full_match, link_text, link_path in links:
        # Resolve the linked file path
        resolved_path = resolve_path(filepath, link_path, repo_root)
        linked_file = os.path.join(repo_root, resolved_path)

        # Check if file exists
        if not os.path.exists(linked_file):
            print(f"Warning: Linked file not found: {link_path} in {filepath}", file=sys.stderr)
            continue

        # Extract title from linked file
        title = extract_title_from_md(linked_file)
        files_read += 1

        # Create GitHub URL
        github_url = BASE_URL + resolved_path

        # Create new link with context-preserving URL
        new_link = f'{full_match} ("{title}" at <{github_url}>)'

        # Replace in content
        updated_content = updated_content.replace(full_match, new_link, 1)
        links_updated += 1

        if not dry_run:
            print(f"  Updated: {link_text} -> {title}")

    if links_updated > 0 and not dry_run:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f"✓ Updated {filepath} ({links_updated} links)")
        except Exception as e:
            print(f"Error writing {filepath}: {e}", file=sys.stderr)
            return files_read, 0

    return files_read, links_updated

def main():
    repo_root = "/Users/tomcranstoun/Documents/GitHub/invisible-users"

    # Get all markdown files
    md_files = []
    for root, dirs, files in os.walk(repo_root):
        # Skip certain directories
        skip_dirs = {'.git', 'node_modules', '.vscode'}
        dirs[:] = [d for d in dirs if d not in skip_dirs]

        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))

    print(f"Found {len(md_files)} markdown files")
    print(f"Processing files...\n")

    total_files_processed = 0
    total_files_read = 0
    total_links_updated = 0

    for md_file in sorted(md_files):
        rel_path = os.path.relpath(md_file, repo_root)
        files_read, links_updated = process_file(md_file, repo_root)

        if links_updated > 0:
            total_files_processed += 1
            total_files_read += files_read
            total_links_updated += links_updated

    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Files with updates: {total_files_processed}")
    print(f"  Files read for titles: {total_files_read}")
    print(f"  Links updated: {total_links_updated}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
