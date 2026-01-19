#!/usr/bin/env node

/**
 * Download cover images if they don't exist
 * No external dependencies - uses only Node.js built-in modules
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

// Configuration
const OUTPUT_DIR = path.join(__dirname, '..', 'packages', 'manuscript', 'manuscript', 'illustrations');

// Image definitions - add or modify URLs here
const IMAGES = [
  {
    filename: 'Profile.png',
    url: 'https://allabout.network/dam/media_126e99d56f06caf788bee715aff92281d2e31a206.png',
    description: 'Profile image'
  },
  {
    filename: 'A4-Cover.png',
    url: 'https://allabout.network/dam/media_1f892fe947de031bcd3da71e54220726833215931.png',
    description: 'A4 cover'
  },
  {
    filename: 'Kindle-Cover.png',
    url: 'https://allabout.network/dam/media_1aed1e2d07ff4d2a6b7f0d5215a9a08b7d4524a0a.png',
    description: 'Kindle cover'
  }
];

/**
 * Download a file from URL to target path
 * Follows redirects automatically
 */
function downloadFile(url, targetPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(targetPath);

    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(targetPath);
        downloadFile(response.headers.location, targetPath)
          .then(resolve)
          .catch(reject);
        return;
      }

      // Handle non-200 responses
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(targetPath);
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        return;
      }

      // Pipe response to file
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });

      file.on('error', (err) => {
        file.close();
        fs.unlinkSync(targetPath);
        reject(err);
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath);
      }
      reject(err);
    });
  });
}

/**
 * Main function to download missing cover images
 */
async function downloadCoverImages() {
  console.log('Checking cover images...');

  // Check and download each image
  let downloadedCount = 0;
  let existingCount = 0;
  let errorCount = 0;

  for (const image of IMAGES) {
    const targetPath = path.join(OUTPUT_DIR, image.filename);

    // Check if file already exists
    if (fs.existsSync(targetPath)) {
      console.log(`✓ ${image.filename} already exists`);
      existingCount++;
      continue;
    }

    // Download missing file
    try {
      console.log(`Downloading ${image.filename}...`);
      await downloadFile(image.url, targetPath);
      console.log(`✓ Downloaded ${image.filename}`);
      downloadedCount++;
    } catch (error) {
      console.error(`✗ Failed to download ${image.filename}: ${error.message}`);
      errorCount++;
    }
  }

  // Check for back-cover.png (generated manually, not downloaded)
  const backCoverPath = path.join(OUTPUT_DIR, 'back-cover.png');
  if (!fs.existsSync(backCoverPath)) {
    console.log('');
    console.log('⚠️  back-cover.png is missing');
    console.log('');
    console.log('To generate back-cover.png:');
    console.log('  1. Open packages/manuscript/the-bible-of-mx/web/back-cover.html in a browser');
    console.log('  2. Take a screenshot (full page screenshot recommended)');
    console.log('  3. Save as back-cover.png in packages/manuscript/the-bible-of-mx/illustrations/');
    console.log('');
  } else {
    console.log(`✓ back-cover.png exists`);
  }

  // Summary
  console.log('');
  console.log(`Summary: ${existingCount} existing, ${downloadedCount} downloaded, ${errorCount} failed`);

  // Exit with error only if all downloads failed
  if (errorCount > 0 && downloadedCount === 0 && existingCount === 0) {
    console.error('All downloads failed');
    process.exit(1);
  }

  return true;
}

// Run if called directly
if (require.main === module) {
  downloadCoverImages()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(`Fatal error: ${error.message}`);
      process.exit(1);
    });
}

module.exports = { downloadCoverImages };
