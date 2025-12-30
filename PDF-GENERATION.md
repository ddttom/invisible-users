# PDF Generation Guide

This guide explains how to generate PDF versions of "The Invisible Users" book manuscript.

## Quick Start

### Method 1: HTML then Print to PDF (Recommended - No Setup Required)

This method works immediately without installing LaTeX:

```bash
npm run pdf:html
```

This generates `the-invisible-users.html` (706KB). Then:

1. Open the file in your browser
2. Press ⌘+P (Mac) or Ctrl+P (Windows/Linux)
3. Select "Save as PDF" as the destination
4. Adjust settings if desired (margins, headers/footers)
5. Save as `the-invisible-users.pdf`

**Advantages:**
- No additional software installation required
- Works immediately
- Good control over page breaks via browser print dialog
- Can preview before saving

**Disadvantages:**
- Manual step required (print dialog)
- Less control over typography

### Method 2: Direct PDF Generation (Requires LaTeX)

For automated, professional PDF generation:

```bash
npm run pdf:generate
```

This generates `the-invisible-users.pdf` with:
- Professional book layout
- Automatic table of contents
- Proper page numbering
- Book-class formatting
- A4 paper size
- 1-inch margins
- 11pt font size
- Clickable internal links (blue)

**Requirements:** BasicTeX or MacTeX must be installed first (see Installation section below).

## Available npm Scripts

| Script | Output | Description |
| ------ | ------ | ----------- |
| `npm run pdf:html` | `the-invisible-users.html` | Standalone HTML with TOC (print to PDF manually) |
| `npm run pdf:generate` | `the-invisible-users.pdf` | Professional book-format PDF (requires LaTeX) |
| `npm run pdf:simple` | `the-invisible-users-simple.pdf` | Simple article-format PDF (requires LaTeX) |

## Installation

### Pandoc (Required - Already Installed)

Pandoc is already installed via Homebrew. If you need to reinstall:

```bash
brew install pandoc
```

### BasicTeX (Optional - For Direct PDF Generation)

BasicTeX is required only if you want to use `npm run pdf:generate` or `npm run pdf:simple`.

**To install:**

```bash
brew install --cask basictex
```

**After installation, restart your terminal** or run:

```bash
eval "$(/usr/libexec/path_helper)"
```

**Note:** BasicTeX installation requires administrator password (sudo access).

**Alternative:** Use Method 1 (HTML then Print to PDF) which doesn't require LaTeX.

## What Gets Generated

All generated files are excluded from git (listed in `.gitignore`):

- `the-invisible-users.html` - Standalone HTML version with embedded styles
- `the-invisible-users.pdf` - Professional book-format PDF
- `the-invisible-users-simple.pdf` - Simple article-format PDF

## File Contents

All npm scripts include:

- **Preface** (`invisible-users/preface.md`)
- **10 Chapters** (`invisible-users/chapter-*.md`)
- **Glossary** (`invisible-users/Glossary.md`)
- **All illustrations** (embedded from `invisible-users/illustrations/*.png`)

## Customisation

### Modify PDF Settings

Edit the npm scripts in `package.json` to change:

- Paper size: `-V papersize=letter` (instead of `a4`)
- Margins: `-V geometry:margin=1.5in` (instead of `1in`)
- Font size: `-V fontsize=12pt` (instead of `11pt`)
- Document class: `-V documentclass=report` (instead of `book`)

### Custom Title Page

To add a custom title page, create `title.md`:

```markdown
---
title: The Invisible Users
subtitle: Designing the Web for AI Agents and Everyone Else
author: Tom Cranstoun
date: December 2025
---
```

Then modify the script to include it first:

```bash
pandoc title.md invisible-users/preface.md invisible-users/chapter-*.md ...
```

## Troubleshooting

### "pandoc: command not found"

Install pandoc:

```bash
brew install pandoc
```

### "xelatex not found"

Install BasicTeX (see Installation section above) or use Method 1 (HTML then Print to PDF).

```bash
brew install --cask basictex
eval "$(/usr/libexec/path_helper)"
```

### "Could not fetch resource illustrations/chapter-XX.png"

This warning appears when pandoc cannot find illustration files. The npm scripts have been updated to fix this issue using `--resource-path=invisible-users`.

If you still see this warning:

1. **Ensure PNG files exist:**

   ```bash
   npm run illustrations:generate
   ```

   This converts all SVG files in `invisible-users/illustrations/` to PNG format.

2. **Verify the npm scripts include `--resource-path=invisible-users`:**

   Check `package.json` - all three PDF scripts should include this flag to help pandoc locate images correctly.

3. **Check file paths in markdown:**

   Chapter files should reference illustrations as `illustrations/chapter-XX.png` (relative to the chapter file location), not with full paths.

### Illustrations Missing in Generated PDF

If images don't appear in the final PDF:

1. Generate PNG illustrations from SVG sources:

   ```bash
   npm run illustrations:generate
   ```

2. Verify PNG files exist:

   ```bash
   ls -la invisible-users/illustrations/*.png
   ```

   You should see 10 PNG files (chapter-01 through chapter-10).

3. Regenerate the PDF:

   ```bash
   npm run pdf:html
   # or
   npm run pdf:generate
   ```

### File Too Large

The complete book with all illustrations is approximately:

- HTML: ~700KB
- PDF: ~2-3MB (estimated)

If file size is an issue, you can generate individual chapters:

```bash
pandoc invisible-users/chapter-01-what-you-will-learn.md -o chapter-01.pdf --pdf-engine=xelatex
```

## Advanced Usage

### Generate Specific Chapters Only

```bash
pandoc invisible-users/chapter-01-what-you-will-learn.md invisible-users/chapter-02-the-invisible-failure.md -o chapters-1-2.pdf --pdf-engine=xelatex --toc
```

### Generate EPUB (e-book format)

```bash
pandoc invisible-users/preface.md invisible-users/chapter-*.md invisible-users/Glossary.md -o the-invisible-users.epub --toc --toc-depth=2 --metadata title="The Invisible Users" --metadata author="Tom Cranstoun"
```

### Generate DOCX (Microsoft Word)

```bash
pandoc invisible-users/preface.md invisible-users/chapter-*.md invisible-users/Glossary.md -o the-invisible-users.docx --toc --toc-depth=2
```

## Quality Checks

Before distributing generated PDFs:

1. **Check table of contents** - ensure all chapters appear correctly
2. **Verify images** - all illustrations should be embedded and readable
3. **Test links** - internal cross-references should work
4. **Review page breaks** - adjust if needed using LaTeX commands
5. **Check metadata** - title, author, date should be correct

## Technical Notes

### Resource Path Configuration

All npm scripts include `--resource-path=invisible-users` to help pandoc locate illustration files correctly. This is necessary because:

1. Pandoc runs from the repository root directory
2. Chapter markdown files reference images as `illustrations/chapter-XX.png` (relative to chapter location)
3. Without `--resource-path`, pandoc looks for images in the wrong location

The `--resource-path` flag tells pandoc to also search in the `invisible-users/` directory when resolving relative image paths, allowing it to find `invisible-users/illustrations/*.png` files correctly.

### Image Format

- **Source format:** SVG (tracked in git)
- **Output format:** PNG at 300 DPI (generated locally, not tracked in git)
- **Reason:** PDF generation works more reliably with PNG raster images than SVG vector graphics

## Version Information

- **Pandoc version:** 3.8.3 (installed)
- **Book version:** 2.6.0
- **Total word count:** ~43,800 words
- **Chapters:** 10 complete chapters plus preface and glossary
- **Illustrations:** 10 PNG images (generated from SVG)

## Support

For issues with:

- **Pandoc:** https://pandoc.org/
- **BasicTeX:** https://www.tug.org/mactex/morepackages.html
- **Book manuscript:** See README.md or CLAUDE.md for project documentation
