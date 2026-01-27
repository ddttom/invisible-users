---
title: "MX-Compliant JavaScript Specification"
author: "Tom Cranstoun"
date: "2026-01-27"
description: "Specification for Machine Experience (MX) compliant JavaScript files. Defines documentation, structure, state management, and AI agent compatibility requirements."
keywords: [mx-compliance, javascript, jsdoc, state-management, accessibility, ai-agents]
ai-instruction: |
  This document defines compliance requirements for MX-certified JavaScript files.
  The specification applies to any JavaScript/TypeScript code in an MX-compliant system.
  Use this as a checklist when writing or reviewing JavaScript code.
---

# MX-Compliant JavaScript Specification

Requirements for Machine Experience (MX) certified JavaScript files.

## Overview

This specification defines the structure, documentation, and patterns required for JavaScript files in an MX-compliant system. JavaScript directly impacts how AI agents interact with web applications - from exposing state to handling dynamic content.

**Scope:** Any JavaScript file (.js, .mjs, .cjs) or TypeScript file (.ts, .tsx) that:

- Manipulates the DOM
- Manages application state
- Handles user interactions
- Communicates with APIs
- Controls dynamic content

**Core Principle:** JavaScript should expose application state explicitly, handle errors gracefully, and never create situations where AI agents cannot determine what's happening.

## File Header Documentation

Every JavaScript file must begin with a documentation header.

### Standard File Header

```javascript
/**
 * @fileoverview Brief description of what this file does
 * @author Author Name
 * @version 1.0.0
 * @license MIT
 *
 * @description
 * Extended description explaining the module's purpose,
 * its role in the application, and key functionality.
 *
 * @requires dependency-name
 * @requires another-dependency
 *
 * @example
 * // How to use this module
 * import { functionName } from './module.js';
 * const result = functionName(params);
 *
 * @ai-instruction
 * Guidance for AI agents about this module's purpose,
 * patterns used, and any special considerations.
 */

'use strict';

// Module code follows...
```

### Required Header Fields

| Field | Required | Description |
|-------|----------|-------------|
| `@fileoverview` | Yes | One-line summary of file purpose |
| `@author` | Yes | Author or team name |
| `@version` | Yes | Semantic version (major.minor.patch) |
| `@description` | Yes | Extended explanation of functionality |
| `@ai-instruction` | Yes | Guidance for AI agents |

### Optional Header Fields

| Field | Description |
|-------|-------------|
| `@license` | License identifier (MIT, Apache-2.0, etc.) |
| `@requires` | Dependencies this file needs |
| `@example` | Usage example |
| `@see` | Related files or documentation |
| `@todo` | Planned improvements |
| `@deprecated` | Deprecation notice with migration path |

## Function Documentation

All exported functions must have JSDoc documentation.

### Function Documentation Pattern

```javascript
/**
 * Brief description of what the function does.
 *
 * Extended description with more details about behavior,
 * edge cases, and important considerations.
 *
 * @param {string} paramName - Description of parameter
 * @param {Object} options - Configuration options
 * @param {boolean} [options.flag=false] - Optional flag with default
 * @param {number} [options.limit] - Optional limit (no default)
 * @returns {Promise<ResultType>} Description of return value
 * @throws {TypeError} When paramName is not a string
 * @throws {RangeError} When limit is negative
 *
 * @example
 * const result = await functionName('value', { flag: true });
 * console.log(result);
 *
 * @since 1.0.0
 * @see relatedFunction
 */
async function functionName(paramName, options = {}) {
  // Implementation
}
```

### Required Function Documentation

| Element | Required For | Description |
|---------|--------------|-------------|
| Brief description | All functions | One-line summary |
| `@param` | Functions with parameters | Type and description for each |
| `@returns` | Functions that return values | Type and description |
| `@throws` | Functions that throw errors | Error types and conditions |
| `@example` | Exported/public functions | Usage demonstration |

### Type Annotations

Use JSDoc types or TypeScript for all parameters and returns:

```javascript
/**
 * @param {string} name - User's name
 * @param {number} age - User's age in years
 * @param {boolean} active - Whether user is active
 * @param {string[]} tags - Array of tag strings
 * @param {Object.<string, number>} scores - Map of score names to values
 * @param {?string} nickname - Nullable string (can be null)
 * @param {string|number} id - Union type (string or number)
 * @param {*} data - Any type
 * @returns {Promise<User>} Resolved user object
 */
```

## State Management

### Explicit State Exposure

Application state must be exposed to the DOM for AI agent inspection:

```javascript
/**
 * State manager with DOM exposure for AI agent compatibility.
 * @ai-instruction State is always reflected in data-* attributes.
 */
class StateManager {
  #state = {
    loading: false,
    error: null,
    data: null
  };

  /**
   * Updates state and reflects changes to DOM.
   * @param {Partial<State>} updates - State updates to apply
   */
  setState(updates) {
    this.#state = { ...this.#state, ...updates };
    this.#reflectToDOM();
  }

  /**
   * Reflects current state to DOM data attributes.
   * AI agents can read these attributes to understand state.
   * @private
   */
  #reflectToDOM() {
    const root = document.querySelector('[data-app-root]');
    if (!root) return;

    root.dataset.loading = String(this.#state.loading);
    root.dataset.hasError = String(this.#state.error !== null);
    root.dataset.hasData = String(this.#state.data !== null);

    if (this.#state.error) {
      root.dataset.errorMessage = this.#state.error.message;
    }
  }
}
```

### State Data Attributes

Expose state through `data-*` attributes on relevant elements:

```javascript
// Form state
form.dataset.formState = 'idle'; // idle, submitting, success, error
form.dataset.validationState = 'valid'; // valid, invalid, pending

// Loading state
container.dataset.loading = 'true';
container.dataset.loadingMessage = 'Fetching results...';

// Content state
article.dataset.contentState = 'loaded'; // loading, loaded, error, empty
article.dataset.lastUpdated = new Date().toISOString();

// Interactive element state
button.dataset.busy = 'false';
button.dataset.expanded = 'true';
```

### State Change Events

Dispatch custom events when state changes:

```javascript
/**
 * Dispatches a state change event for AI agent observation.
 * @param {string} stateName - Name of the state that changed
 * @param {*} oldValue - Previous state value
 * @param {*} newValue - New state value
 */
function dispatchStateChange(stateName, oldValue, newValue) {
  const event = new CustomEvent('mx-state-change', {
    bubbles: true,
    detail: {
      state: stateName,
      from: oldValue,
      to: newValue,
      timestamp: Date.now()
    }
  });

  document.dispatchEvent(event);
}
```

## Error Handling

### Error Handling Pattern

```javascript
/**
 * Fetches data with comprehensive error handling.
 * Errors are exposed to DOM for AI agent awareness.
 *
 * @param {string} url - API endpoint URL
 * @returns {Promise<Object>} Fetched data
 * @throws {NetworkError} When network request fails
 * @throws {APIError} When API returns error response
 *
 * @ai-instruction
 * Errors are reflected to [data-error-state] attribute.
 * Check data-error-message for human-readable error.
 */
async function fetchData(url) {
  const container = document.querySelector('[data-fetch-container]');

  try {
    container.dataset.fetchState = 'loading';
    container.dataset.errorState = 'none';

    const response = await fetch(url);

    if (!response.ok) {
      throw new APIError(`API returned ${response.status}`, response.status);
    }

    const data = await response.json();
    container.dataset.fetchState = 'success';

    return data;

  } catch (error) {
    container.dataset.fetchState = 'error';
    container.dataset.errorState = categorizeError(error);
    container.dataset.errorMessage = error.message;

    // Log for debugging but don't swallow
    console.error('[fetchData]', error);

    throw error;
  }
}

/**
 * Categorizes error for data attribute exposure.
 * @param {Error} error - The error to categorize
 * @returns {string} Error category
 */
function categorizeError(error) {
  if (error instanceof TypeError) return 'type-error';
  if (error instanceof NetworkError) return 'network-error';
  if (error instanceof APIError) return 'api-error';
  if (error instanceof ValidationError) return 'validation-error';
  return 'unknown-error';
}
```

### Custom Error Classes

Define typed errors for clear categorisation:

```javascript
/**
 * Error thrown when API request fails.
 * @extends Error
 */
class APIError extends Error {
  /**
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @param {Object} [response] - API response body
   */
  constructor(message, statusCode, response = null) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.response = response;
  }
}

/**
 * Error thrown when network request fails.
 * @extends Error
 */
class NetworkError extends Error {
  /**
   * @param {string} message - Error message
   * @param {Error} [cause] - Original error
   */
  constructor(message, cause = null) {
    super(message);
    this.name = 'NetworkError';
    this.cause = cause;
  }
}
```

## DOM Manipulation

### Accessible DOM Updates

When modifying the DOM, maintain accessibility:

```javascript
/**
 * Updates content area with new HTML.
 * Maintains accessibility and AI agent compatibility.
 *
 * @param {HTMLElement} container - Container element
 * @param {string} html - HTML content to insert
 * @param {Object} options - Update options
 * @param {string} [options.announceMessage] - Screen reader announcement
 *
 * @ai-instruction
 * Content updates are signaled via data-content-updated attribute
 * with ISO timestamp of last update.
 */
function updateContent(container, html, options = {}) {
  // Update content
  container.innerHTML = html;

  // Mark update time for AI agents
  container.dataset.contentUpdated = new Date().toISOString();

  // Announce to screen readers if message provided
  if (options.announceMessage) {
    announceToScreenReader(options.announceMessage);
  }
}

/**
 * Announces message to screen readers via live region.
 * @param {string} message - Message to announce
 * @param {string} [priority='polite'] - 'polite' or 'assertive'
 */
function announceToScreenReader(message, priority = 'polite') {
  let announcer = document.getElementById('sr-announcer');

  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'sr-announcer';
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
  }

  // Clear and set to trigger announcement
  announcer.textContent = '';
  requestAnimationFrame(() => {
    announcer.textContent = message;
  });
}
```

### Element Creation Pattern

Create elements with proper attributes:

```javascript
/**
 * Creates a button element with full accessibility support.
 *
 * @param {Object} config - Button configuration
 * @param {string} config.text - Button text
 * @param {string} config.action - Action identifier
 * @param {Function} config.onClick - Click handler
 * @param {boolean} [config.disabled=false] - Disabled state
 * @returns {HTMLButtonElement} Configured button element
 */
function createButton({ text, action, onClick, disabled = false }) {
  const button = document.createElement('button');

  // Core attributes
  button.type = 'button';
  button.textContent = text;

  // Accessibility
  button.setAttribute('aria-label', text);

  // AI agent data
  button.dataset.action = action;
  button.dataset.busy = 'false';

  // State
  button.disabled = disabled;
  button.dataset.disabled = String(disabled);

  // Event handling
  button.addEventListener('click', async (event) => {
    if (button.dataset.busy === 'true') return;

    button.dataset.busy = 'true';
    button.setAttribute('aria-busy', 'true');

    try {
      await onClick(event);
    } finally {
      button.dataset.busy = 'false';
      button.setAttribute('aria-busy', 'false');
    }
  });

  return button;
}
```

## Async Operations

### Promise Documentation

Document async operations clearly:

```javascript
/**
 * Loads user data from API.
 *
 * @async
 * @param {string} userId - User ID to load
 * @returns {Promise<User>} Resolves with user object
 * @throws {NotFoundError} When user doesn't exist
 * @throws {NetworkError} When request fails
 *
 * @example
 * try {
 *   const user = await loadUser('user-123');
 *   console.log(user.name);
 * } catch (error) {
 *   if (error instanceof NotFoundError) {
 *     showUserNotFound();
 *   }
 * }
 */
async function loadUser(userId) {
  // Implementation
}
```

### Loading State Pattern

Always expose loading state:

```javascript
/**
 * Wrapper for async operations that exposes loading state.
 *
 * @param {HTMLElement} element - Element to update with state
 * @param {Function} operation - Async operation to perform
 * @returns {Promise<*>} Result of operation
 *
 * @ai-instruction
 * During operation, element has data-loading="true".
 * After completion, data-loading="false" with either
 * data-success="true" or data-error="true".
 */
async function withLoadingState(element, operation) {
  element.dataset.loading = 'true';
  element.dataset.success = 'false';
  element.dataset.error = 'false';
  element.setAttribute('aria-busy', 'true');

  try {
    const result = await operation();
    element.dataset.success = 'true';
    return result;

  } catch (error) {
    element.dataset.error = 'true';
    element.dataset.errorMessage = error.message;
    throw error;

  } finally {
    element.dataset.loading = 'false';
    element.setAttribute('aria-busy', 'false');
  }
}
```

## Event Handling

### Event Handler Documentation

```javascript
/**
 * Handles form submission with validation.
 *
 * @param {SubmitEvent} event - Form submit event
 * @returns {Promise<void>}
 *
 * @fires form-submitted - When submission succeeds
 * @fires form-error - When submission fails
 *
 * @listens submit - On form element
 */
async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  form.dataset.formState = 'submitting';

  try {
    const data = new FormData(form);
    await submitForm(data);

    form.dataset.formState = 'success';
    form.dispatchEvent(new CustomEvent('form-submitted'));

  } catch (error) {
    form.dataset.formState = 'error';
    form.dataset.errorMessage = error.message;
    form.dispatchEvent(new CustomEvent('form-error', {
      detail: { error }
    }));
  }
}
```

### Custom Event Patterns

Define and document custom events:

```javascript
/**
 * Custom events dispatched by this module.
 *
 * @event mx-state-change
 * @type {CustomEvent}
 * @property {Object} detail
 * @property {string} detail.state - State name
 * @property {*} detail.from - Previous value
 * @property {*} detail.to - New value
 *
 * @event mx-content-loaded
 * @type {CustomEvent}
 * @property {Object} detail
 * @property {string} detail.contentId - Loaded content ID
 * @property {number} detail.loadTime - Load time in ms
 */

// Dispatch example
element.dispatchEvent(new CustomEvent('mx-content-loaded', {
  bubbles: true,
  detail: {
    contentId: 'article-123',
    loadTime: 245
  }
}));
```

## Module Structure

### ES Module Pattern

```javascript
/**
 * @fileoverview User management module
 * @module user
 * @author Team Name
 * @version 1.0.0
 *
 * @ai-instruction
 * This module handles user authentication and profile management.
 * All state changes are reflected to DOM via data attributes.
 */

// Private module state
let currentUser = null;

// Private functions (not exported)
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Public API
/**
 * Gets the current authenticated user.
 * @returns {User|null} Current user or null if not authenticated
 */
export function getCurrentUser() {
  return currentUser;
}

/**
 * Authenticates user with credentials.
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<User>} Authenticated user
 */
export async function login(email, password) {
  // Implementation
}

/**
 * Logs out current user.
 * @returns {Promise<void>}
 */
export async function logout() {
  // Implementation
}

// Default export for convenience
export default {
  getCurrentUser,
  login,
  logout
};
```

### CommonJS Pattern

```javascript
/**
 * @fileoverview Configuration loader
 * @author Team Name
 * @version 1.0.0
 */

'use strict';

/**
 * Loads configuration from file.
 * @param {string} path - Config file path
 * @returns {Object} Configuration object
 */
function loadConfig(path) {
  // Implementation
}

/**
 * Validates configuration object.
 * @param {Object} config - Configuration to validate
 * @returns {boolean} True if valid
 */
function validateConfig(config) {
  // Implementation
}

module.exports = {
  loadConfig,
  validateConfig
};
```

## Constants and Configuration

### Constants Documentation

```javascript
/**
 * Application constants.
 * @constant
 * @ai-instruction These values are compile-time constants, not runtime config.
 */
export const CONSTANTS = {
  /**
   * Maximum items per page in listings.
   * @type {number}
   */
  MAX_PAGE_SIZE: 100,

  /**
   * API request timeout in milliseconds.
   * @type {number}
   */
  API_TIMEOUT_MS: 30000,

  /**
   * Valid content states.
   * @type {string[]}
   */
  CONTENT_STATES: ['draft', 'review', 'published', 'archived'],

  /**
   * Supported languages.
   * @type {Object.<string, string>}
   */
  LANGUAGES: {
    'en-GB': 'English (UK)',
    'en-US': 'English (US)',
    'fr-FR': 'French',
    'de-DE': 'German'
  }
};

// Freeze to prevent modification
Object.freeze(CONSTANTS);
Object.freeze(CONSTANTS.CONTENT_STATES);
Object.freeze(CONSTANTS.LANGUAGES);
```

## Validation Checklist

### File-Level Requirements

- [ ] File header with `@fileoverview` present
- [ ] `@author` specified
- [ ] `@version` specified (semantic versioning)
- [ ] `@description` with extended explanation
- [ ] `@ai-instruction` providing AI agent guidance
- [ ] `'use strict'` directive (for non-modules)

### Function-Level Requirements

- [ ] All exported functions have JSDoc
- [ ] `@param` for each parameter with type
- [ ] `@returns` with type and description
- [ ] `@throws` for functions that throw errors
- [ ] `@example` for public API functions
- [ ] Descriptive function names (verb + noun)

### State Management Requirements

- [ ] State exposed via `data-*` attributes
- [ ] Loading states reflected to DOM
- [ ] Error states reflected to DOM
- [ ] State changes dispatch custom events
- [ ] ARIA attributes updated with state

### Error Handling Requirements

- [ ] Try/catch for async operations
- [ ] Errors categorised with custom classes
- [ ] Error messages exposed to DOM
- [ ] Errors logged with context
- [ ] Errors re-thrown (not swallowed)

### Accessibility Requirements

- [ ] Screen reader announcements for dynamic content
- [ ] `aria-busy` for loading states
- [ ] `aria-live` regions for updates
- [ ] Keyboard event handlers include Enter/Space
- [ ] Focus management for modal/dialog content

## Certification Levels

### Level 1: MX Basic

- File headers with required fields
- JSDoc on exported functions
- Basic error handling
- State reflected to at least one `data-*` attribute

### Level 2: MX Standard

- All Level 1 requirements
- Complete JSDoc with types and examples
- Custom error classes
- Full state exposure via `data-*` attributes
- ARIA attributes for accessibility
- Custom events for state changes

### Level 3: MX Advanced

- All Level 2 requirements
- TypeScript with strict mode
- Comprehensive test coverage
- Performance annotations (`@performance`)
- Security annotations (`@security`)
- Automated documentation generation

## Related Documentation

- **[mx-compliance.md](./mx-compliance.md)** - Webpage output requirements
- **[mx-compliance-css.md](./mx-compliance-css.md)** - CSS requirements
- **[mx-compliance-markdown.md](./mx-compliance-markdown.md)** - Markdown source requirements
- **JSDoc Reference** - https://jsdoc.app/
- **ARIA Practices** - https://www.w3.org/WAI/ARIA/apg/

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-27 | Initial specification |
