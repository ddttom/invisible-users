
/**
 * Audit Context
 * 
 * Encapsulates the runtime state of an audit, including configuration options
 * and the logger instance. This replaces the global.auditcore object.
 */
export class AuditContext {
  constructor(options, logger) {
    this.options = options;
    this.logger = logger;
  }
}
