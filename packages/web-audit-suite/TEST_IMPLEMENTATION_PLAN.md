# Web Audit Suite Test Implementation Plan

Comprehensive plan to address critical test coverage gaps identified in the documentation reconciliation review.

## Executive Summary

**Current State:**

- 53 passing tests across 8 test files
- ~40% feature coverage estimate
- 7 major features with ZERO test coverage
- 5 features partially tested (30-60% coverage)

**Goal State:**

- 150+ tests across 20+ test files
- ~85% feature coverage
- All critical path features tested
- CI/CD integration validated

**Timeline:** 3 phases over 6-8 weeks

---

## Priority 1: Critical Features (Weeks 1-3)

These features have ZERO test coverage and are heavily documented as core functionality.

### 1.1 Pattern Extraction Test Suite

**File:** `test/utils/patternExtraction.test.js`

**Estimated:** 25 tests, ~400 lines

**Test Categories:**

#### Page Filtering (5 tests)

- ✅ Should identify pages with served score ≥70
- ✅ Should identify pages with rendered score ≥70
- ✅ Should skip pages below threshold
- ✅ Should handle mixed scores (one above, one below)
- ✅ Should handle missing score data gracefully

#### Pattern Category Extraction (12 tests)

- ✅ **Structured Data (JSON-LD)**: Extract Schema.org implementations
  - Should extract Product schema examples
  - Should extract Article schema examples
  - Should limit to 5 examples per pattern
- ✅ **Semantic HTML**: Extract `<main>`, `<nav>`, `<article>` usage
  - Should extract semantic structure examples
  - Should capture context (surrounding elements)
- ✅ **Form Field Naming**: Extract standard field names
  - Should extract email, firstName, lastName patterns
  - Should identify non-standard fields
- ✅ **Error Messages**: Extract persistent error patterns
  - Should extract role="alert" usage
  - Should extract aria-live regions
- ✅ **State Attributes**: Extract explicit state patterns
  - Should extract data-state attributes
  - Should extract data-validation-state patterns
- ✅ **llms.txt**: Extract llms.txt implementations
  - Should extract llms.txt content examples
  - Should validate llms.txt quality

#### Priority and Effort Rating (4 tests)

- ✅ Should assign Critical priority to ESSENTIAL_SERVED patterns
- ✅ Should assign High priority to ESSENTIAL_RENDERED patterns
- ✅ Should assign Low effort to simple patterns (semantic HTML)
- ✅ Should assign Moderate effort to complex patterns (Schema.org)

#### Pattern Library Report Generation (4 tests)

- ✅ Should generate pattern_library.md with all sections
- ✅ Should include up to 5 examples per pattern
- ✅ Should include implementation guidance
- ✅ Should include validation tool links

**Test Data Requirements:**

- Mock `results.json` with 10+ pages, varied scores
- Sample HTML snippets for each pattern category
- Expected pattern_library.md output fixture

**Dependencies to Mock:**

- File system operations (fs.readFileSync, fs.writeFileSync)
- Logger output

---

### 1.2 Regression Detection Test Suite

**File:** `test/utils/historicalComparison.test.js`

**Estimated:** 35 tests, ~600 lines

**Test Categories:**

#### Historical Storage (5 tests)

- ✅ Should create history/ directory if missing
- ✅ Should store timestamped results-`<timestamp>`.json
- ✅ Should establish baseline if no history exists
- ✅ Should preserve existing baseline
- ✅ Should handle file system errors gracefully

#### Baseline Comparison (8 tests)

- ✅ Should load baseline from history/baseline.json
- ✅ Should compare against most recent baseline
- ✅ Should handle missing baseline gracefully
- ✅ Should detect score increases (improvements)
- ✅ Should detect score decreases (regressions)
- ✅ Should calculate percentage changes accurately
- ✅ Should compare URL counts
- ✅ Should handle new/removed URLs

#### Regression Detection - Performance (5 tests)

- ✅ **Critical**: Should detect >30% increase in load time
- ✅ **Critical**: Should detect >30% increase in LCP
- ✅ **Critical**: Should detect >30% increase in FCP
- ✅ **Critical**: Should detect >30% increase in CLS
- ✅ **Warning**: Should detect 15-30% increase

#### Regression Detection - Accessibility (3 tests)

- ✅ **Critical**: Should detect ANY error count increase
- ✅ Should detect severity level changes
- ✅ Should detect new WCAG violation types

#### Regression Detection - SEO (3 tests)

- ✅ **Critical**: Should detect >10% score decrease
- ✅ **Warning**: Should detect 5-10% score decrease
- ✅ Should detect improvements (positive changes)

#### Regression Detection - LLM Suitability (4 tests)

- ✅ **Critical**: Should detect >10% served score decrease
- ✅ **Warning**: Should detect >10% rendered score decrease
- ✅ Should detect improvements in served scores
- ✅ Should detect improvements in rendered scores

#### Exit Codes (3 tests)

- ✅ Should return exit code 1 for critical regressions
- ✅ Should return exit code 0 for warnings only
- ✅ Should return exit code 0 for no regressions

#### Regression Report Generation (4 tests)

- ✅ Should generate regression_report.md
- ✅ Should include executive summary with counts
- ✅ Should list critical regressions first
- ✅ Should include recommendations section

**Test Data Requirements:**

- Baseline fixture (results.json from previous run)
- Current results with known regressions
- Expected regression_report.md output fixture

**Dependencies to Mock:**

- File system operations (fs.readFileSync, fs.writeFileSync, fs.existsSync)
- Logger output
- process.exit() calls

---

### 1.3 robots.txt Quality Scoring Test Suite

**File:** `test/utils/robotsQuality.test.js`

**Estimated:** 30 tests, ~500 lines

**Test Categories:**

#### Fetching and Parsing (5 tests)

- ✅ Should fetch robots.txt from domain root
- ✅ Should handle HTTP fetch success
- ✅ Should fall back to Puppeteer for Cloudflare sites
- ✅ Should handle missing robots.txt (404)
- ✅ Should handle malformed robots.txt gracefully

#### AI User Agents Scoring (6 tests)

- ✅ Should award 30 points for 3+ AI user agents
- ✅ Should award 15 points for 1-2 AI user agents
- ✅ Should award 0 points for no AI user agents
- ✅ Should detect GPTBot
- ✅ Should detect ClaudeBot
- ✅ Should detect other AI agents (GoogleBot-AI, etc.)

#### Sitemap Declaration Scoring (3 tests)

- ✅ Should award 20 points for sitemap declaration
- ✅ Should detect multiple sitemap declarations
- ✅ Should award 0 points for missing sitemap

#### Sensitive Path Protection Scoring (5 tests)

- ✅ Should award 25 points for 3+ protected paths
- ✅ Should award 15 points for 1-2 protected paths
- ✅ Should award 0 points for no protected paths
- ✅ Should detect /admin, /cart, /account protection
- ✅ Should detect wildcard patterns (e.g., /admin/*)

#### llms.txt Reference Scoring (3 tests)

- ✅ Should award 15 points for llms.txt reference
- ✅ Should detect llms.txt in comments
- ✅ Should award 0 points for missing reference

#### Helpful Comments Scoring (3 tests)

- ✅ Should award 10 points for 3+ comments
- ✅ Should award 5 points for 1-2 comments
- ✅ Should award 0 points for no comments

#### Quality Level Classification (4 tests)

- ✅ Should classify 80-100 as Excellent
- ✅ Should classify 60-79 as Good
- ✅ Should classify 40-59 as Fair
- ✅ Should classify 0-39 as Poor

#### Report Generation (1 test)

- ✅ Should generate robots_quality_report.md with recommendations

**Test Data Requirements:**

- Sample robots.txt files (excellent, good, fair, poor examples)
- Expected scoring for each example
- Expected report output fixtures

**Dependencies to Mock:**

- HTTP fetch operations
- Puppeteer browser operations
- File system operations

---

### 1.4 llms.txt Quality Scoring Test Suite

**File:** `test/utils/llmsQuality.test.js`

**Estimated:** 25 tests, ~400 lines

**Test Categories:**

#### Fetching and Parsing (4 tests)

- ✅ Should fetch llms.txt from domain root
- ✅ Should handle HTTP fetch success
- ✅ Should handle missing llms.txt (404)
- ✅ Should parse llms.txt structure

#### Core Elements Scoring (5 tests)

- ✅ Should award 10 points for title
- ✅ Should award 10 points for description
- ✅ Should award 10 points for contact
- ✅ Should award 10 points for last updated date
- ✅ Should award 0 points for missing elements

#### Sections Scoring (4 tests)

- ✅ Should award 30 points for 5+ sections
- ✅ Should award 20 points for 3-4 sections
- ✅ Should award 10 points for 1-2 sections
- ✅ Should detect major sections (# headers)

#### Content Length Scoring (3 tests)

- ✅ Should award 15 points for substantial content (>2000 chars)
- ✅ Should award 10 points for moderate content (1000-2000 chars)
- ✅ Should award 5 points for minimal content (<1000 chars)

#### External Links Scoring (3 tests)

- ✅ Should award 10 points for 3+ external links
- ✅ Should award 5 points for 1-2 external links
- ✅ Should award 0 points for no external links

#### Specificity Scoring (3 tests)

- ✅ Should award 5 points for detailed policies
- ✅ Should award 3 points for basic policies
- ✅ Should award 0 points for generic content

#### Bonus Points (3 tests)

- ✅ Should award bonus for rate limits declared
- ✅ Should award bonus for API documentation
- ✅ Should award bonus for attribution requirements

**Test Data Requirements:**

- Sample llms.txt files (comprehensive, moderate, minimal examples)
- Expected scoring for each example (0-105 points)

**Dependencies to Mock:**

- HTTP fetch operations
- File system operations

---

### 1.5 Bulk Auditing Test Suite

**File:** `test/features/bulkAudit.test.js`

**Estimated:** 15 tests, ~300 lines

**Test Categories:**

#### CSV Parsing (4 tests)

- ✅ Should parse CSV with domain column
- ✅ Should skip header row
- ✅ Should handle empty rows
- ✅ Should handle malformed CSV gracefully

#### Multi-Domain Auditing (5 tests)

- ✅ Should audit all domains from CSV
- ✅ Should generate individual reports per domain
- ✅ Should generate bulk_audit_summary.csv
- ✅ Should handle domain failures gracefully
- ✅ Should continue processing after domain error

#### White-Labeling (3 tests)

- ✅ Should replace "Web Audit Suite" with agency name
- ✅ Should add agency logo to dashboard header
- ✅ Should preserve all other report content

#### Output Organization (3 tests)

- ✅ Should create domain-specific output directories
- ✅ Should organize reports by domain
- ✅ Should generate master summary report

**Test Data Requirements:**

- Sample CSV with 3-5 test domains
- Mock domain responses
- Expected bulk_audit_summary.csv output

**Dependencies to Mock:**

- Entire audit pipeline (main.js)
- File system operations
- Network requests

---

### 1.6 Network Error Handling Test Suite

**File:** `test/features/networkErrors.test.js`

**Estimated:** 20 tests, ~350 lines

**Test Categories:**

#### Error Type Detection (7 tests)

- ✅ Should detect DNS failures (ENOTFOUND)
- ✅ Should detect connection timeouts (ETIMEDOUT)
- ✅ Should detect host unreachable (EHOSTUNREACH)
- ✅ Should detect SSL/TLS failures (CERT_HAS_EXPIRED)
- ✅ Should detect rate limiting (429 status)
- ✅ Should detect server unavailable (503 status)
- ✅ Should detect Cloudflare challenges

#### Retry Mechanism (6 tests)

- ✅ Should retry up to 3 times on failure
- ✅ Should pause between retries (exponential backoff)
- ✅ Should display error details to user
- ✅ Should prompt for user retry decision
- ✅ Should cancel operation if user declines
- ✅ Should succeed on retry if error resolved

#### Cloudflare Bypass (3 tests)

- ✅ Should detect Cloudflare challenge
- ✅ Should attempt stealth mode bypass
- ✅ Should report bypass success/failure

#### Error Recovery (4 tests)

- ✅ Should continue processing other URLs after single URL failure
- ✅ Should log failed URLs to error.log
- ✅ Should include failed URLs in final report
- ✅ Should not exit process on single URL failure

**Test Data Requirements:**

- Mock network error responses for each error type
- Expected retry sequences
- Expected error log output

**Dependencies to Mock:**

- HTTP/HTTPS requests (axios, fetch)
- Puppeteer navigation
- User input (readline)
- Logger output

**Note:** These tests should use real network error simulation, NOT just mocks. Use nock or similar to simulate actual error conditions.

---

## Priority 2: Enhance Existing Tests (Week 4)

Improve test coverage for partially tested features.

### 2.1 Adaptive Rate Limiting Enhancement

**File:** `test/utils/rateLimiter.test.js` (enhance existing)

**Add:** 10 tests, ~200 lines

**New Test Categories:**

#### Behavior Tests (6 tests)

- ✅ Should reduce concurrency on 429 response
- ✅ Should reduce concurrency on 503 response
- ✅ Should use exponential backoff (1s, 2s, 4s, 8s)
- ✅ Should gradually increase concurrency when stable
- ✅ Should track server response patterns
- ✅ Should respect minimum concurrency (1)

#### Integration Tests (4 tests)

- ✅ Should integrate with URL processing pipeline
- ✅ Should monitor actual server responses
- ✅ Should adjust real-time during processing
- ✅ Should log rate limit events

---

### 2.2 Cache Management Enhancement

**File:** `test/features/cacheManagement.test.js` (new)

**Add:** 12 tests, ~250 lines

**Test Categories:**

#### Cache-Only Mode (3 tests)

- ✅ Should use only cached data when --cache-only
- ✅ Should skip URL fetching in cache-only mode
- ✅ Should generate reports from cache

#### No-Cache Mode (2 tests)

- ✅ Should disable caching when --no-cache
- ✅ Should fetch all URLs fresh

#### Force Delete Cache (2 tests)

- ✅ Should clear cache before starting when --force-delete-cache
- ✅ Should recreate cache directory

#### Cache Staleness Validation (5 tests)

- ✅ Should send HTTP HEAD request for cached URLs
- ✅ Should compare Last-Modified headers
- ✅ Should invalidate cache if source newer
- ✅ Should use cache if source unchanged
- ✅ Should handle HEAD request failures gracefully

---

### 2.3 Browser Pool Memory Management

**File:** `test/utils/browserPool.test.js` (enhance existing)

**Add:** 8 tests, ~150 lines

**New Test Categories:**

#### Memory Management (4 tests)

- ✅ Should restart browser after 50 pages
- ✅ Should reset page counter after restart
- ✅ Should preserve browser pool size during restart
- ✅ Should handle restart failures gracefully

#### Stress Testing (4 tests)

- ✅ Should handle 100+ consecutive acquire/release cycles
- ✅ Should maintain pool integrity under high concurrency
- ✅ Should not leak browsers
- ✅ Should recover from browser crashes

---

### 2.4 Concurrent URL Processing

**File:** `test/features/concurrentProcessing.test.js` (new)

**Add:** 10 tests, ~200 lines

**Test Categories:**

#### Concurrency Boundaries (5 tests)

- ✅ Should process URLs with concurrency=1 (sequential)
- ✅ Should process URLs with concurrency=3 (default)
- ✅ Should process URLs with concurrency=5
- ✅ Should process URLs with concurrency=10
- ✅ Should respect maximum concurrency limit

#### Performance Validation (5 tests)

- ✅ Should complete faster with higher concurrency
- ✅ Should maintain accuracy regardless of concurrency
- ✅ Should not overwhelm server
- ✅ Should integrate with rate limiter
- ✅ Should handle URL failures without blocking queue

---

## Priority 3: Integration Tests (Weeks 5-6)

Test feature combinations and full pipeline scenarios.

### 3.1 Feature Combination Tests

**File:** `test/integration/featureCombinations.test.js`

**Estimated:** 15 tests, ~400 lines

**Test Categories:**

#### Full Feature Stack (5 tests)

- ✅ Should run with all flags: --extract-patterns --enable-history --generate-dashboard --generate-executive-summary
- ✅ Should generate all expected reports
- ✅ Should create all output directories
- ✅ Should preserve historical data
- ✅ Should complete without errors

#### Performance + History (3 tests)

- ✅ Should combine browser pooling with history tracking
- ✅ Should combine concurrency with regression detection
- ✅ Should maintain performance with all features enabled

#### Agency + History (2 tests)

- ✅ Should combine bulk auditing with historical tracking
- ✅ Should white-label regression reports

#### Cache + Pattern Extraction (2 tests)

- ✅ Should extract patterns from cached data
- ✅ Should regenerate pattern library from cache-only mode

#### Error Handling + Retry (3 tests)

- ✅ Should retry failed URLs during full pipeline
- ✅ Should continue pattern extraction after URL failures
- ✅ Should track regression despite missing URLs

---

### 3.2 Large Site Processing Tests

**File:** `test/integration/largeSiteProcessing.test.js`

**Estimated:** 8 tests, ~300 lines

**Test Categories:**

#### Scale Tests (4 tests)

- ✅ Should process 100 URLs successfully
- ✅ Should process 500 URLs successfully
- ✅ Should maintain memory under load (no leaks)
- ✅ Should complete within reasonable time

#### Batching Tests (2 tests)

- ✅ Should process large sites in batches (1000 URLs, batches of 100)
- ✅ Should preserve results across batches

#### Performance Validation (2 tests)

- ✅ Should demonstrate 3-5x speedup with optimizations
- ✅ Should maintain accuracy at scale

---

### 3.3 CI/CD Integration Tests

**File:** `test/integration/cicdIntegration.test.js`

**Estimated:** 10 tests, ~250 lines

**Test Categories:**

#### Exit Code Validation (5 tests)

- ✅ Should exit with code 0 on success
- ✅ Should exit with code 1 on critical regression
- ✅ Should exit with code 0 on warnings only
- ✅ Should exit with code 1 on accessibility regression
- ✅ Should exit with code 0 on improvements

#### Pipeline Integration (5 tests)

- ✅ Should run in non-interactive mode
- ✅ Should generate machine-readable reports
- ✅ Should output JSON summary for parsing
- ✅ Should handle baseline establishment automatically
- ✅ Should detect regressions between runs

---

## Test Infrastructure Improvements

### Test Data Management

**Create:** `test/fixtures/` directory structure

```text
test/fixtures/
├── results/
│   ├── baseline-good.json          # Baseline with good scores
│   ├── baseline-fair.json          # Baseline with fair scores
│   ├── regression-performance.json # Performance regression
│   ├── regression-accessibility.json
│   └── regression-seo.json
├── robots/
│   ├── excellent.txt               # 100-point robots.txt
│   ├── good.txt                    # 70-point robots.txt
│   ├── fair.txt                    # 50-point robots.txt
│   └── poor.txt                    # 20-point robots.txt
├── llms/
│   ├── comprehensive.txt           # 105-point llms.txt
│   ├── moderate.txt                # 70-point llms.txt
│   └── minimal.txt                 # 40-point llms.txt
├── html/
│   ├── semantic-good.html          # Good semantic structure
│   ├── semantic-poor.html          # Poor semantic structure
│   ├── forms-standard.html         # Standard field names
│   ├── forms-custom.html           # Custom field names
│   ├── schema-product.html         # Product schema example
│   └── schema-article.html         # Article schema example
└── csv/
    └── bulk-domains.csv            # Sample bulk audit CSV
```

### Test Helpers

**Create:** `test/helpers/` directory

```javascript
// test/helpers/mockResults.js
export function createMockResults(options = {}) {
  // Generate realistic results.json for testing
}

// test/helpers/mockNetworkErrors.js
export function simulateNetworkError(errorType) {
  // Simulate real network error conditions
}

// test/helpers/assertions.js
export function assertReportGenerated(reportPath) {
  // Common assertion for report generation
}

export function assertExitCode(code, expectedCode) {
  // Common assertion for exit codes
}
```

### CI/CD Configuration

**Update:** `.github/workflows/test.yml`

```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm test
      - run: npm run test:integration
      - run: npm run test:coverage

  coverage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

---

## Test Execution Strategy

### Phase 1: Critical Features (Weeks 1-3)

**Week 1:**

- Day 1-2: Pattern Extraction test suite (25 tests)
- Day 3-4: Regression Detection test suite (35 tests)
- Day 5: Test fixtures and helpers

**Week 2:**

- Day 1-2: robots.txt Quality Scoring test suite (30 tests)
- Day 3-4: llms.txt Quality Scoring test suite (25 tests)
- Day 5: Test fixtures and documentation

**Week 3:**

- Day 1-2: Bulk Auditing test suite (15 tests)
- Day 3-4: Network Error Handling test suite (20 tests)
- Day 5: Review, refine, document

**Deliverables:**

- 150 new tests
- 6 new test files
- Test fixtures repository
- Updated documentation

### Phase 2: Enhancements (Week 4)

**Days 1-2:** Rate Limiter enhancement (10 tests)
**Days 3-4:** Cache Management suite (12 tests)
**Day 5:** Browser Pool + Concurrent Processing enhancements (18 tests)

**Deliverables:**

- 40 new tests
- 3 enhanced/new test files
- Performance benchmarks

### Phase 3: Integration (Weeks 5-6)

**Week 5:**

- Day 1-2: Feature Combination tests (15 tests)
- Day 3-4: Large Site Processing tests (8 tests)
- Day 5: CI/CD Integration tests (10 tests)

**Week 6:**

- Day 1-2: End-to-end testing with real sites (optional)
- Day 3-4: Performance regression tests
- Day 5: Documentation and final review

**Deliverables:**

- 33 integration tests
- CI/CD pipeline configuration
- Performance benchmarks
- Complete test documentation

---

## Success Metrics

### Coverage Targets

**By End of Phase 1:**

- Unit test coverage: 65%
- Critical path coverage: 80%
- All Priority 1 features tested

**By End of Phase 2:**

- Unit test coverage: 75%
- Critical path coverage: 90%
- All partially tested features enhanced

**By End of Phase 3:**

- Unit test coverage: 85%
- Integration coverage: 75%
- All feature combinations validated

### Test Count Targets

- **Current:** 53 tests
- **Phase 1:** 203 tests (+150)
- **Phase 2:** 243 tests (+40)
- **Phase 3:** 276 tests (+33)
- **Total:** 276 tests (5.2x increase)

### Test File Targets

- **Current:** 8 test files
- **Target:** 25 test files
- **New directories:** fixtures/, helpers/, integration/, features/

---

## Implementation Guidelines

### Test Writing Standards

1. **Descriptive Test Names:**
   - ✅ Good: "Should award 30 points for 3+ AI user agents"
   - ❌ Bad: "Test AI agents"

2. **AAA Pattern:**
   - Arrange: Set up test data and mocks
   - Act: Execute the function under test
   - Assert: Verify expected outcomes

3. **One Assertion Per Concept:**
   - Test one behavior per test
   - Multiple assertions OK if testing same concept

4. **Isolated Tests:**
   - No test dependencies
   - No shared state between tests
   - Clean up after each test

5. **Mock External Dependencies:**
   - File system (fs)
   - Network requests (axios, fetch)
   - Logger (winston)
   - process.exit()

6. **Use Fixtures for Complex Data:**
   - Don't inline 500-line JSON objects
   - Create fixtures in test/fixtures/
   - Load with helper functions

### Code Review Checklist

For each new test file:

- [ ] All documented features tested
- [ ] Test names are descriptive
- [ ] AAA pattern followed
- [ ] External dependencies mocked
- [ ] Fixtures used for complex data
- [ ] Error cases tested
- [ ] Edge cases covered
- [ ] Tests run in isolation
- [ ] No console.log statements
- [ ] Documentation updated

---

## Risk Mitigation

### Potential Issues

#### Issue 1: Test Suite Too Slow

- **Risk:** 276 tests may take too long to run
- **Mitigation:**
  - Run unit tests first (fast)
  - Run integration tests separately (slower)
  - Use parallel test execution
  - Mock expensive operations (Puppeteer)

#### Issue 2: Flaky Tests

- **Risk:** Network/timing-dependent tests may be unreliable
- **Mitigation:**
  - Use fixed timeouts
  - Mock network operations
  - Use deterministic fixtures
  - Avoid real browser operations in unit tests

#### Issue 3: Maintenance Burden

- **Risk:** More tests = more maintenance
- **Mitigation:**
  - Write clear, maintainable tests
  - Use helper functions for common operations
  - Keep test data in fixtures
  - Document test intentions

#### Issue 4: Breaking Existing Tests

- **Risk:** New tests may reveal bugs in existing code
- **Mitigation:**
  - This is a good thing!
  - Fix bugs as discovered
  - Add regression tests
  - Update documentation

---

## Resources Required

### Developer Time

- **Phase 1:** 15 days (3 weeks)
- **Phase 2:** 5 days (1 week)
- **Phase 3:** 10 days (2 weeks)
- **Total:** 30 days (6 weeks) of focused development

### Infrastructure

- Test fixtures storage (~50MB)
- CI/CD pipeline time (estimated +5 minutes per run)
- Code coverage reporting (CodeCov or similar)

### Documentation

- Test documentation (this file)
- Updated README with test instructions
- Contributing guidelines for test writing
- Test fixtures documentation

---

## Acceptance Criteria

This test implementation plan is complete when:

1. ✅ All 7 Priority 1 features have ≥80% test coverage
2. ✅ All 5 Priority 2 features have ≥90% test coverage
3. ✅ Integration tests validate full pipeline
4. ✅ CI/CD pipeline runs all tests automatically
5. ✅ Test coverage ≥85% across codebase
6. ✅ All tests passing consistently
7. ✅ Test execution time <5 minutes for unit tests
8. ✅ Test execution time <15 minutes for full suite
9. ✅ Documentation updated
10. ✅ Code review completed

---

## Next Steps

1. **Review this plan** with team/stakeholders
2. **Approve test fixtures** structure and content
3. **Set up test infrastructure** (fixtures, helpers, CI/CD)
4. **Begin Phase 1** with Pattern Extraction tests
5. **Track progress** weekly against success metrics

---

## Appendix A: Test Naming Conventions

### File Naming

- Unit tests: `test/utils/<module>.test.js`
- Feature tests: `test/features/<feature>.test.js`
- Integration tests: `test/integration/<scenario>.test.js`

### Test Description Format

```javascript
describe('Pattern Extraction', () => {
  describe('Page Filtering', () => {
    it('should identify pages with served score ≥70', () => {
      // Test implementation
    });
  });
});
```

### Test Organization

```javascript
// 1. Imports
import { extractPatterns } from '../../src/utils/patternExtraction.js';
import { createMockResults } from '../helpers/mockResults.js';

// 2. Test suite
describe('Pattern Extraction', () => {
  // 3. Setup/teardown
  let mockResults;

  beforeEach(() => {
    mockResults = createMockResults();
  });

  afterEach(() => {
    // Cleanup
  });

  // 4. Test groups
  describe('Page Filtering', () => {
    // Tests here
  });
});
```

---

## Appendix B: Mock Strategy

### What to Mock

- File system operations (fs.readFileSync, fs.writeFileSync, fs.existsSync)
- Network requests (axios, fetch)
- Logger output (winston.info, winston.error)
- process.exit() calls
- Puppeteer browser operations (for unit tests)

### What NOT to Mock

- Pure functions (calculations, string manipulation)
- Internal utility functions
- Data transformations
- Validation logic

### Mocking Libraries

- **jest.mock()**: For module-level mocks
- **jest.spyOn()**: For function-level spies
- **nock**: For HTTP request mocking (with real error simulation)
- **mock-fs**: For file system mocking (if needed)

---

## Appendix C: Sample Test Implementation

```javascript
// test/utils/patternExtraction.test.js
import { extractPatterns } from '../../src/utils/patternExtraction.js';
import fs from 'fs';

jest.mock('fs');

describe('Pattern Extraction', () => {
  describe('Page Filtering', () => {
    it('should identify pages with served score ≥70', () => {
      // Arrange
      const mockResults = {
        pages: [
          { url: 'https://example.com/page1', servedScore: 75, renderedScore: 60 },
          { url: 'https://example.com/page2', servedScore: 65, renderedScore: 80 },
          { url: 'https://example.com/page3', servedScore: 85, renderedScore: 90 }
        ]
      };

      fs.readFileSync.mockReturnValue(JSON.stringify(mockResults));

      // Act
      const result = extractPatterns('/fake/results.json', '/fake/output');

      // Assert
      expect(result.pagesAnalyzed).toEqual([
        mockResults.pages[0], // served ≥70
        mockResults.pages[2]  // served ≥70
      ]);
      expect(result.pagesAnalyzed).toHaveLength(2);
    });
  });
});
```

---

**Document Version:** 1.0
**Last Updated:** 2026-01-18
**Author:** Claude Code (Sonnet 4.5)
**Status:** Ready for Review
