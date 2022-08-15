import sanitizeHtml from 'sanitize-html';

// Jest does not support .innerHtml, use this as a workaround.
// For more information see: https://github.com/jsdom/jsdom/issues/1245
Object.defineProperty(global.Element.prototype, 'innerText', {
  get() {
    return sanitizeHtml(this.textContent, {
      allowedTags: [], // remove all tags and return text content only
      allowedAttributes: {}, // remove all tags and return text content only
    }).trim();
  },
  configurable: true, // make it so that it doesn't blow chunks on re-running tests with things like --watch
});

// Do not perform logging during tests. Tests should fail when the expect() fails.
jest.mock('logger', () => ({
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}));
