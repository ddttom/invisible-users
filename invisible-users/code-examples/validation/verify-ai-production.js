#!/usr/bin/env node

/**
 * Production AI Manifest Health Check
 * Comprehensive validation with content checks and detailed error reporting
 *
 * Usage: node verify-ai-production.js
 */

const https = require('https');

// CHANGE THIS to your domain
const DOMAIN = 'yoursite.com';

const REQUIRED_FILES = [
  { path: '/llms.txt', type: 'markdown', checks: ['# ', '## '] },
  { path: '/ai-agents.md', type: 'markdown', checks: ['## Identity', '## Skills'] },
  { path: '/query-index.json', type: 'json', checks: ['total', 'data'] }
];

function fetchFile(path) {
  return new Promise((resolve, reject) => {
    https.get(`https://${DOMAIN}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({ status: res.statusCode, content: data });
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

async function validateMarkdown(content, requiredHeaders) {
  for (const header of requiredHeaders) {
    if (!content.includes(header)) {
      throw new Error(`Missing required header: ${header}`);
    }
  }
  return true;
}

async function validateJSON(content, requiredFields) {
  const parsed = JSON.parse(content);

  // Check top-level fields
  for (const field of requiredFields) {
    if (!(field in parsed)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Validate data array
  if (parsed.data && !Array.isArray(parsed.data)) {
    throw new Error('data field must be an array');
  }

  if (parsed.data && parsed.data.length === 0) {
    throw new Error('data array is empty');
  }

  // Check required fields in first entry
  if (parsed.data && parsed.data.length > 0) {
    const entry = parsed.data[0];
    const requiredEntryFields = ['path', 'title', 'description'];

    for (const field of requiredEntryFields) {
      if (!(field in entry)) {
        throw new Error(`Data entry missing required field: ${field}`);
      }
    }
  }

  return true;
}

async function runHealthCheck() {
  console.log('🤖 AI Manifest Health Check (Production)\n');
  console.log(`Domain: ${DOMAIN}\n`);

  let allPassed = true;
  const results = [];

  for (const file of REQUIRED_FILES) {
    process.stdout.write(`Checking ${file.path}... `);

    try {
      const { status, content } = await fetchFile(file.path);

      // Content validation
      if (file.type === 'markdown') {
        await validateMarkdown(content, file.checks);
      } else if (file.type === 'json') {
        await validateJSON(content, file.checks);
      }

      console.log('✅ PASS');
      results.push({ file: file.path, success: true });
    } catch (error) {
      console.log(`❌ FAIL: ${error.message}`);
      results.push({ file: file.path, success: false, error: error.message });
      allPassed = false;
    }
  }

  console.log('');

  // Summary
  if (allPassed) {
    console.log('✅ All AI manifest files are healthy!');
    process.exit(0);
  } else {
    console.log('❌ Some AI manifest files have issues:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.file}: ${r.error}`);
    });
    console.log('\nPlease fix these issues before deploying.');
    process.exit(1);
  }
}

runHealthCheck().catch(error => {
  console.error('Health check error:', error);
  process.exit(1);
});
