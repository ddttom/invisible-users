/**
 * Common test assertions for Web Audit Suite tests
 */

import fs from 'fs';

/**
 * Assert that a report file was generated
 */
export function assertReportGenerated(reportPath) {
  if (!fs.existsSync(reportPath)) {
    throw new Error(`Report not generated: ${reportPath}`);
  }

  const stats = fs.statSync(reportPath);
  if (stats.size === 0) {
    throw new Error(`Report is empty: ${reportPath}`);
  }

  return true;
}

/**
 * Assert that exit code matches expected value
 */
export function assertExitCode(actualCode, expectedCode, message = '') {
  if (actualCode !== expectedCode) {
    throw new Error(
      `Expected exit code ${expectedCode} but got ${actualCode}. ${message}`,
    );
  }
  return true;
}

/**
 * Assert that a score is within expected range
 */
export function assertScoreInRange(score, min, max, label = 'Score') {
  if (score < min || score > max) {
    throw new Error(
      `${label} ${score} is outside expected range [${min}, ${max}]`,
    );
  }
  return true;
}

/**
 * Assert that a report contains expected sections
 */
export function assertReportHasSections(reportContent, expectedSections) {
  const missingSections = expectedSections.filter(
    (section) => !reportContent.includes(section),
  );

  if (missingSections.length > 0) {
    throw new Error(
      `Report missing expected sections: ${missingSections.join(', ')}`,
    );
  }

  return true;
}

/**
 * Assert that JSON file contains expected structure
 */
export function assertJsonStructure(jsonPath, requiredKeys) {
  const content = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  const missingKeys = requiredKeys.filter((key) => !(key in content));

  if (missingKeys.length > 0) {
    throw new Error(
      `JSON missing required keys: ${missingKeys.join(', ')}`,
    );
  }

  return true;
}

/**
 * Assert that an array has expected length
 */
export function assertArrayLength(array, expectedLength, label = 'Array') {
  if (array.length !== expectedLength) {
    throw new Error(
      `${label} has ${array.length} items, expected ${expectedLength}`,
    );
  }
  return true;
}

/**
 * Assert that a value matches expected pattern
 */
export function assertMatchesPattern(value, pattern, label = 'Value') {
  if (!pattern.test(value)) {
    throw new Error(
      `${label} "${value}" does not match pattern ${pattern}`,
    );
  }
  return true;
}
