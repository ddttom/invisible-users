# Dockerfile for building "The Invisible Users" book PDFs
# This provides a reproducible build environment with all required dependencies

FROM node:20-slim

# Install LaTeX and Pandoc dependencies
RUN apt-get update && apt-get install -y \
    pandoc \
    texlive-xetex \
    texlive-fonts-recommended \
    texlive-fonts-extra \
    texlive-latex-extra \
    imagemagick \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Copy package files
COPY package*.json ./

# Install Node.js dependencies (only root-level, not workspace packages)
RUN npm install --ignore-scripts

# Copy the entire repository
# Note: .dockerignore will exclude unnecessary files
COPY . .

# Initialize git submodule (manuscript content)
RUN git submodule update --init --recursive || echo "Warning: Could not initialize submodules. Ensure manuscript content is available."

# Set the default command to generate all PDF formats
CMD ["npm", "run", "pdf:all"]

# Alternative commands available:
# - npm run pdf:generate    # A4 PDF with cover
# - npm run pdf:kindle      # 6"×9" Kindle format
# - npm run pdf:simple      # Simple PDF without cover
# - npm run pdf:html        # HTML version (print to PDF in browser)
# - npm run pdf:appendix    # Generate appendix HTML pages
