# Docker Usage Guide - Web Audit Suite

Run the Web Audit Suite in a containerized environment with all dependencies pre-installed.

## Quick Start

### Build the Docker image

```bash
# From the web-audit-suite directory
docker build -t web-audit-suite .

# Or from repository root
docker build -t web-audit-suite -f packages/web-audit-suite/Dockerfile packages/web-audit-suite
```

### Run a basic audit

```bash
# Audit a website and save results to local directory
docker run --rm \
  -v $(pwd)/results:/app/results \
  web-audit-suite \
  node index.js -s https://example.com/sitemap.xml -c 10
```

## Common Usage Patterns

### Full audit with all features

```bash
docker run --rm \
  -v $(pwd)/results:/app/results \
  web-audit-suite \
  node index.js \
    -s https://example.com/sitemap.xml \
    --enable-history \
    --generate-dashboard \
    --generate-executive-summary
```

### Audit with custom configuration

```bash
# Mount a custom thresholds file
docker run --rm \
  -v $(pwd)/results:/app/results \
  -v $(pwd)/my-thresholds.json:/app/thresholds.json \
  web-audit-suite \
  node index.js \
    -s https://example.com/sitemap.xml \
    --thresholds /app/thresholds.json
```

### Limited URL audit for testing

```bash
# Test with just 5 URLs
docker run --rm \
  -v $(pwd)/results:/app/results \
  web-audit-suite \
  node index.js -s https://example.com/sitemap.xml -c 5
```

### Bulk audit multiple domains

```bash
# Create domains.csv with your domains
docker run --rm \
  -v $(pwd)/results:/app/results \
  -v $(pwd)/domains.csv:/app/domains.csv \
  web-audit-suite \
  node index.js --bulk /app/domains.csv
```

## Advanced Configuration

### Environment variables

Create a `.env` file and mount it:

```bash
docker run --rm \
  -v $(pwd)/results:/app/results \
  -v $(pwd)/.env:/app/.env \
  web-audit-suite \
  node index.js -s https://example.com/sitemap.xml
```

Example `.env` file:

```env
SITEMAP_URL=https://example.com/sitemap.xml
OUTPUT_DIR=/app/results
URL_LIMIT=50
LOG_LEVEL=info
RATE_LIMIT_TOKENS=5
RATE_LIMIT_INTERVAL=second
```

### Agency white-labeling

```bash
docker run --rm \
  -v $(pwd)/results:/app/results \
  -v $(pwd)/agency-logo.png:/app/logo.png \
  web-audit-suite \
  node index.js \
    -s https://example.com/sitemap.xml \
    --agency-logo /app/logo.png \
    --agency-name "Your Agency Name"
```

### Custom cache directory

```bash
# Persist cache across runs
docker run --rm \
  -v $(pwd)/results:/app/results \
  -v $(pwd)/cache:/app/.cache \
  web-audit-suite \
  node index.js -s https://example.com/sitemap.xml
```

## Command Line Options

All standard CLI options work in Docker:

| Option | Description |
| ------ | ----------- |
| `-s, --sitemap <url>` | URL of sitemap to process |
| `-o, --output <dir>` | Output directory (default: /app/results) |
| `-c, --count <number>` | Number of URLs to audit |
| `--enable-history` | Enable historical tracking |
| `--generate-dashboard` | Generate interactive HTML dashboard |
| `--generate-executive-summary` | Generate executive summary |
| `--thresholds <file>` | Custom thresholds JSON file |
| `--bulk <file>` | CSV file with domains for bulk audit |
| `--agency-logo <path>` | Agency logo for white-labeling |
| `--agency-name <name>` | Agency name for white-labeling |
| `--log-level <level>` | Logging level (error, warn, info, debug) |
| `--no-puppeteer` | Skip Puppeteer (faster but less complete) |
| `--cache-only` | Use only cached data |
| `--no-cache` | Disable caching |

## Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  web-audit-suite:
    build: .
    volumes:
      - ./results:/app/results
      - ./cache:/app/.cache
      - ./.env:/app/.env
    environment:
      - NODE_ENV=production
    command: node index.js -s https://example.com/sitemap.xml
```

Run with:

```bash
docker-compose up
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Weekly Site Audit

on:
  schedule:
    - cron: '0 0 * * 0'  # Every Sunday at midnight
  workflow_dispatch:

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build audit image
        run: |
          cd packages/web-audit-suite
          docker build -t web-audit-suite .

      - name: Run audit
        run: |
          docker run --rm \
            -v ${{ github.workspace }}/results:/app/results \
            web-audit-suite \
            node index.js \
              -s https://example.com/sitemap.xml \
              --generate-dashboard \
              --generate-executive-summary

      - name: Upload results
        uses: actions/upload-artifact@v3
        with:
          name: audit-results
          path: results/
```

### GitLab CI

```yaml
audit-site:
  image: docker:latest
  services:
    - docker:dind
  script:
    - cd packages/web-audit-suite
    - docker build -t web-audit-suite .
    - docker run --rm -v $(pwd)/results:/app/results web-audit-suite node index.js -s https://example.com/sitemap.xml
  artifacts:
    paths:
      - results/
    expire_in: 30 days
```

## What's Included

The Docker image includes:

- **Node.js 20**: Latest LTS runtime
- **Chromium**: For Puppeteer browser automation
- **Pa11y dependencies**: For accessibility testing
- **System fonts**: For proper rendering
- **Non-root user**: Security best practice

## Benefits

1. **No local setup**: No need to install Node.js, Chromium, or dependencies
2. **Consistent environment**: Same results across all machines
3. **Isolated execution**: Doesn't interfere with local system
4. **CI/CD ready**: Easy integration with automated pipelines
5. **Scalable**: Run multiple audits in parallel with different containers

## Troubleshooting

### Permission errors on results

```bash
# Fix ownership (Linux/macOS)
sudo chown -R $(whoami) results/

# Or run container with your user ID
docker run --rm \
  -v $(pwd)/results:/app/results \
  --user $(id -u):$(id -g) \
  web-audit-suite \
  node index.js -s https://example.com/sitemap.xml
```

### Puppeteer crashes

If Puppeteer fails, try:

```bash
# Increase shared memory size
docker run --rm \
  --shm-size=2gb \
  -v $(pwd)/results:/app/results \
  web-audit-suite \
  node index.js -s https://example.com/sitemap.xml
```

### Network issues

If the container can't reach external sites:

```bash
# Use host network (less isolated)
docker run --rm \
  --network host \
  -v $(pwd)/results:/app/results \
  web-audit-suite \
  node index.js -s https://example.com/sitemap.xml
```

### Rate limiting

If you're being rate-limited:

```bash
# Reduce request rate
docker run --rm \
  -v $(pwd)/results:/app/results \
  web-audit-suite \
  node index.js \
    -s https://example.com/sitemap.xml \
    -c 10 \
    --log-level debug
```

## Image Size

The Docker image is approximately 450MB due to:

- Node.js runtime (~200MB)
- Chromium browser (~200MB)
- System dependencies (~50MB)

## Maintenance

### Rebuild after updates

```bash
# Rebuild with latest code
docker build --no-cache -t web-audit-suite .
```

### Clean up old images

```bash
# Remove unused images
docker image prune -a

# Remove specific old version
docker rmi web-audit-suite:old
```

### Update base image

```bash
# Pull latest Node.js base
docker pull node:20-slim

# Rebuild
docker build -t web-audit-suite .
```

## Security Notes

1. **Non-root user**: Container runs as `auditor` user (UID 1000)
2. **Read-only filesystem**: Can be enforced with `--read-only` flag
3. **Network isolation**: Runs in isolated Docker network by default
4. **Minimal attack surface**: Only includes required dependencies

### Running with enhanced security

```bash
docker run --rm \
  --read-only \
  --tmpfs /app/.cache:rw,noexec,nosuid,size=100m \
  --tmpfs /app/results:rw,noexec,nosuid,size=500m \
  --cap-drop=ALL \
  --security-opt=no-new-privileges \
  web-audit-suite \
  node index.js -s https://example.com/sitemap.xml -c 10
```

## Performance Tips

1. **Use cache**: Mount cache volume for repeated audits
2. **Limit URLs**: Use `-c` flag for faster testing
3. **Skip Puppeteer**: Use `--no-puppeteer` for served-HTML-only analysis
4. **Parallel execution**: Run multiple containers for different sites
5. **Resource limits**: Set CPU/memory limits for predictable performance

```bash
# With resource limits
docker run --rm \
  --cpus=2 \
  --memory=2g \
  -v $(pwd)/results:/app/results \
  web-audit-suite \
  node index.js -s https://example.com/sitemap.xml
```
