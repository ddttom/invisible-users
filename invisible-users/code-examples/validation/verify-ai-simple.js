#!/usr/bin/env node

/**
 * Simple AI Manifest Health Check
 * Validates that all AI-discoverable files are accessible
 *
 * Usage: node verify-ai-simple.js
 */

const https = require('https');

// CHANGE THIS to your domain
const DOMAIN = 'yoursite.com';

const REQUIRED_FILES = [
  '/llms.txt',
  '/ai-agents.md',
  '/query-index.json',
  '/robots.txt'
];

function checkFile(path) {
  return new Promise((resolve, reject) => {
    https.get(`https://${DOMAIN}${path}`, (res) => {
      if (res.statusCode === 200) {
        resolve({ path, status: res.statusCode, success: true });
      } else {
        resolve({ path, status: res.statusCode, success: false });
      }
    }).on('error', (err) => {
      resolve({ path, status: 0, success: false, error: err.message });
    });
  });
}

async function runHealthCheck() {
  console.log(`🤖 AI Manifest Health Check for ${DOMAIN}\n`);

  const results = await Promise.all(
    REQUIRED_FILES.map(file => checkFile(file))
  );

  let allPassed = true;

  results.forEach(result => {
    const icon = result.success ? '✅' : '❌';
    const status = result.success ? 'PASS' : `FAIL (${result.status})`;
    console.log(`${icon} ${result.path} - ${status}`);

    if (!result.success) {
      allPassed = false;
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    }
  });

  console.log('');

  if (allPassed) {
    console.log('✅ All AI manifest files are accessible!');
    process.exit(0);
  } else {
    console.log('❌ Some AI manifest files have issues.');
    process.exit(1);
  }
}

runHealthCheck().catch(error => {
  console.error('Health check error:', error);
  process.exit(1);
});
