/**
 * Audit Context
 *
 * Encapsulates the runtime state of an audit, including configuration options
 * and the logger instance. This replaces the global.auditcore object.
 *
 * @mx
 * audience: machine
 * purpose: "Provide audit runtime context and dependency injection"
 * stability: stable
 * pattern: context-object
 * state:
 *   - options: "Audit configuration options"
 *   - logger: "Winston logger instance"
 * invariants:
 *   - "Options must be valid before construction"
 *   - "Logger must be initialized"
 * ai:
 *   editable: true
 *   confidence: 1.0
 *   test_coverage: true
 *   modification_impact: "Core dependency - all collectors and analyzers use this"
 */
export class AuditContext {
  constructor(options, logger) {
    this.options = options;
    this.logger = logger;
  }
}
