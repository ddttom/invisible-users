#!/usr/bin/env node

/**
 * Repository initialization script
 *
 * Verifies and creates symlinks and directory structures needed for the repository to function.
 * This ensures a consistent environment whether cloning from scratch or switching machines.
 *
 * Expected symlinks:
 * - blogs -> outputs/bible/blogs
 * - books/bible -> ../packages/bible (reduces cognitive load: books/ vs packages/)
 * - books/dont-make-ai-think -> ../packages/dont-make-ai-think
 * - books/appendices -> ../packages/shared-appendices
 * - books/code-examples -> ../packages/shared-code-examples
 * - books/outputs -> ../outputs
 * - GEMINI.md -> CLAUDE.md (AI tool compatibility)
 * - AGENTS.md -> CLAUDE.md (AI tool compatibility)
 *
 * Note: books/ symlinks reduce mental overhead - access books/bible instead of packages/bible/
 *       The books/ directory is listed in .gitignore but the symlinks are tracked in git
 *
 * Expected file permissions:
 * - .claude/skills/skill.md files must be executable (for Claude Code)
 * - scripts/*.sh files must be executable
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Track changes made
let changesMade = false;
const changes = [];

/**
 * Check if a path exists and is a symlink pointing to the expected target
 */
function checkSymlink(linkPath, expectedTarget) {
  const fullLinkPath = path.join(rootDir, linkPath);

  try {
    const stats = fs.lstatSync(fullLinkPath);

    if (!stats.isSymbolicLink()) {
      return { exists: true, isSymlink: false, target: null };
    }

    const actualTarget = fs.readlinkSync(fullLinkPath);
    return {
      exists: true,
      isSymlink: true,
      target: actualTarget,
      matches: actualTarget === expectedTarget
    };
  } catch (err) {
    if (err.code === 'ENOENT') {
      return { exists: false, isSymlink: false, target: null };
    }
    throw err;
  }
}

/**
 * Create a symlink, removing any existing file/directory if needed
 */
function createSymlink(linkPath, target, description) {
  const fullLinkPath = path.join(rootDir, linkPath);
  const check = checkSymlink(linkPath, target);

  if (check.exists) {
    if (check.isSymlink && check.matches) {
      // Already correct, nothing to do
      return false;
    }

    // Remove existing incorrect symlink or directory
    if (check.isSymlink) {
      fs.unlinkSync(fullLinkPath);
      changes.push(`Removed incorrect symlink: ${linkPath} (was pointing to ${check.target})`);
    } else {
      // It's a regular file or directory - don't remove automatically
      console.warn(`⚠️  ${linkPath} exists but is not a symlink. Please remove manually if needed.`);
      return false;
    }
  }

  // Create the symlink
  fs.symlinkSync(target, fullLinkPath);
  changes.push(`Created symlink: ${linkPath} -> ${target} (${description})`);
  changesMade = true;
  return true;
}

/**
 * Ensure a directory exists
 */
function ensureDirectory(dirPath, description) {
  const fullDirPath = path.join(rootDir, dirPath);

  try {
    const stats = fs.statSync(fullDirPath);
    if (!stats.isDirectory()) {
      console.warn(`⚠️  ${dirPath} exists but is not a directory. Please check manually.`);
      return false;
    }
    return false; // Already exists
  } catch (err) {
    if (err.code === 'ENOENT') {
      // Create directory
      fs.mkdirSync(fullDirPath, { recursive: true });
      changes.push(`Created directory: ${dirPath} (${description})`);
      changesMade = true;
      return true;
    }
    throw err;
  }
}

/**
 * Recursively find all skill.md files in .claude/skills/
 */
function findSkillFiles(dir) {
  const skillFiles = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Recurse into subdirectories
        skillFiles.push(...findSkillFiles(fullPath));
      } else if (entry.isFile() && entry.name === 'skill.md') {
        skillFiles.push(fullPath);
      }
    }
  } catch (err) {
    // Silently skip directories that don't exist or can't be read
    if (err.code !== 'ENOENT' && err.code !== 'EACCES') {
      throw err;
    }
  }

  return skillFiles;
}

/**
 * Ensure file has executable permissions
 */
function ensureExecutable(filePath, description) {
  try {
    const stats = fs.statSync(filePath);
    const mode = stats.mode;

    // Check if file is already executable by owner (0o100)
    if ((mode & 0o100) !== 0) {
      return false; // Already executable
    }

    // Add execute permission for owner, group, and others
    // This preserves existing read/write permissions and adds execute
    const newMode = mode | 0o111;
    fs.chmodSync(filePath, newMode);

    const relativePath = path.relative(rootDir, filePath);
    changes.push(`Made executable: ${relativePath} (${description})`);
    changesMade = true;
    return true;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.warn(`⚠️  Could not update permissions for ${filePath}: ${err.message}`);
    }
    return false;
  }
}

/**
 * Check and fix file permissions for Claude Code skills and scripts
 */
function checkFilePermissions() {
  // Find all skill.md files in .claude/skills/
  const claudeSkillsDir = path.join(rootDir, '.claude', 'skills');
  const skillFiles = findSkillFiles(claudeSkillsDir);

  skillFiles.forEach(skillFile => {
    ensureExecutable(skillFile, 'Claude Code skill');
  });

  // Check shell scripts in scripts/ directory
  const scriptsDir = path.join(rootDir, 'scripts');
  try {
    const entries = fs.readdirSync(scriptsDir, { withFileTypes: true });

    entries.forEach(entry => {
      if (entry.isFile() && entry.name.endsWith('.sh')) {
        const fullPath = path.join(scriptsDir, entry.name);
        ensureExecutable(fullPath, 'Shell script');
      }
    });
  } catch (err) {
    // Scripts directory might not exist, that's OK
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }
}

/**
 * Main initialization function
 */
function initializeRepository() {
  console.log('🔍 Checking repository structure...\n');

  // Ensure books/ directory exists
  // Purpose: Reduces cognitive load when navigating - access books/bible instead of packages/bible/
  // Note: The books/ directory is listed in .gitignore, but the symlinks inside are tracked
  ensureDirectory('books', 'Convenient access to all book content');

  // Create symlinks in books/ directory
  // These symlinks eliminate the need to remember the packages/ prefix when accessing book content
  createSymlink('books/bible', '../packages/bible', 'The Bible book');
  createSymlink('books/dont-make-ai-think', '../packages/dont-make-ai-think', 'Slim practical guide');
  createSymlink('books/appendices', '../packages/shared-appendices', 'Shared appendices');
  createSymlink('books/code-examples', '../packages/shared-code-examples', 'Code examples');
  createSymlink('books/outputs', '../outputs', 'Generated outputs');

  // Create blogs symlink to outputs submodule
  createSymlink('blogs', 'outputs/bible/blogs', 'Blog posts (via outputs submodule)');

  // Create AI tool compatibility symlinks (GEMINI.md and AGENTS.md point to CLAUDE.md)
  createSymlink('GEMINI.md', 'CLAUDE.md', 'Gemini AI tool compatibility');
  createSymlink('AGENTS.md', 'CLAUDE.md', 'Generic AI agents compatibility');

  // Check and fix file permissions
  checkFilePermissions();

  // Report results
  console.log('');
  if (changesMade) {
    console.log('✅ Repository structure reconstructed\n');
    console.log('Changes made:');
    changes.forEach(change => console.log(`   - ${change}`));
  } else {
    console.log('✅ No changes needed - repository structure is correct');
  }
  console.log('');
}

// Run initialization
try {
  initializeRepository();
  process.exit(0);
} catch (err) {
  console.error('❌ Error during initialization:', err.message);
  process.exit(1);
}
