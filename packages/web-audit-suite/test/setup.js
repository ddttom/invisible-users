import sinon from 'sinon';
import { AuditContext } from '../src/core/AuditContext.js';

// Create a default test context for legacy tests that don't explicitly create one
// This provides a fallback for tests that haven't been updated to use AuditContext
export function createTestContext(options = {}) {
  const defaultOptions = {
    includeAllLanguages: false,
    output: 'test-output',
    ...options,
  };

  const logger = {
    info: sinon.stub(),
    debug: sinon.stub(),
    warn: sinon.stub(),
    error: sinon.stub(),
  };

  return new AuditContext(defaultOptions, logger);
}

// For backwards compatibility with tests that expect global.auditcore
// This should be removed once all tests are updated
global.auditcore = {
  logger: {
    info: sinon.stub(),
    debug: sinon.stub(),
    warn: sinon.stub(),
    error: sinon.stub(),
  },
  options: {
    includeAllLanguages: false,
    output: 'test-output',
  },
};
