# Docker Build Instructions

This repository includes a Dockerfile for building the book PDFs in a reproducible containerized environment. This eliminates the need to install LaTeX and Pandoc on your local machine.

## Prerequisites

- Docker installed on your system
- Git submodules initialized (`git submodule update --init --recursive`)

## Quick Start

### Build all PDF formats

```bash
# Build the Docker image
docker build -t invisible-users-builder .

# Generate all PDFs
docker run --rm -v $(pwd):/workspace invisible-users-builder

# PDFs will be in the root directory:
# - the-invisible-users.pdf (A4 format with cover)
# - the-invisible-users-kindle.pdf (6"×9" KDP format)
# - the-invisible-users-simple.pdf (basic format)
# - the-invisible-users.html (HTML version)
```

### Build specific PDF format

```bash
# A4 PDF with cover (for review/distribution)
docker run --rm -v $(pwd):/workspace invisible-users-builder npm run pdf:generate

# Kindle format (6"×9" paperback for KDP)
docker run --rm -v $(pwd):/workspace invisible-users-builder npm run pdf:kindle

# Simple PDF (basic formatting)
docker run --rm -v $(pwd):/workspace invisible-users-builder npm run pdf:simple

# HTML version (open in browser and print to PDF)
docker run --rm -v $(pwd):/workspace invisible-users-builder npm run pdf:html

# Generate appendix HTML pages
docker run --rm -v $(pwd):/workspace invisible-users-builder npm run pdf:appendix
```

## What's Included

The Docker image includes:

- Node.js 20
- Pandoc (for Markdown → PDF conversion)
- XeLaTeX (for PDF rendering)
- TeX Live fonts (for professional typography)
- ImageMagick (for SVG → PNG conversion)

## Benefits

1. **Reproducibility**: Same build environment for everyone
2. **No local dependencies**: No need to install LaTeX (~2GB) on your machine
3. **Clean builds**: Each build starts fresh in a clean container
4. **CI/CD ready**: Can be used in GitHub Actions or other CI systems

## Troubleshooting

### Submodule not initialized

If you see "Warning: Could not initialize submodules", ensure you've run:

```bash
git submodule update --init --recursive
```

### Permission errors

If you get permission errors on generated files:

```bash
# Fix ownership (Linux/macOS)
sudo chown -R $(whoami) *.pdf *.html
```

### Build fails

Check that Docker has enough memory allocated:

- Open Docker Desktop settings
- Increase memory limit to at least 4GB
- Restart Docker

## Advanced Usage

### Custom output directory

```bash
# Mount a different output directory
docker run --rm \
  -v $(pwd):/workspace \
  -v $(pwd)/output:/output \
  invisible-users-builder npm run pdf:generate
```

### Interactive shell for debugging

```bash
# Start an interactive shell in the container
docker run --rm -it \
  -v $(pwd):/workspace \
  invisible-users-builder /bin/bash

# Then run commands manually
npm run wordcount
npm run pdf:generate
```

## Image Size

The Docker image is approximately 800MB due to TeX Live and fonts. This is much smaller than installing LaTeX locally (~2GB+).

## Maintenance

### Rebuild image after changes

```bash
# Rebuild if Dockerfile or dependencies change
docker build --no-cache -t invisible-users-builder .
```

### Clean up old images

```bash
# Remove all unused images
docker image prune -a
```
