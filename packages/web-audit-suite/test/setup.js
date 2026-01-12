import sinon from 'sinon';

// Mock global auditcore
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
