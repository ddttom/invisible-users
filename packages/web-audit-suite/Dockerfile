# Dockerfile for Web Audit Suite
# Provides a containerized environment for running website audits

FROM node:20-slim

# Install system dependencies for Puppeteer and Pa11y
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Set Puppeteer to use installed Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source
COPY . .

# Create directories for cache and results
RUN mkdir -p .cache/rendered .cache/served results

# Set non-root user for security
RUN useradd -m -u 1000 auditor && \
    chown -R auditor:auditor /app
USER auditor

# Expose volume for results
VOLUME ["/app/results"]

# Default command shows help
CMD ["node", "index.js", "--help"]

# Example usage:
# docker run --rm -v $(pwd)/results:/app/results web-audit-suite \
#   node index.js -s https://example.com/sitemap.xml
