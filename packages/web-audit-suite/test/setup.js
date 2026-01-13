import sinon from 'sinon';
import { AuditContext } from '../src/core/AuditContext.js';

// Create a test context with stubbed logger for use in tests
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
