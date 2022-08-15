const LOG_PREFIX = '[Dominion Tracker]';

class Logger {
  /**
   * Quick console logging function - USE THIS INSTEAD OF CONSOLE.LOG
   * This prefixes all error messages with [Dominion Tracker].
   * It also allows for easy mocking in tests.
   */
  public log(message: unknown): void {
    console.log(LOG_PREFIX, message);
  }

  /**
   * Quick console logging function - USE THIS INSTEAD OF CONSOLE.WARN
   * This prefixes all error messages with [Dominion Tracker].
   * It also allows for easy mocking in tests.
   */
  public warn(message: unknown): void {
    console.warn(LOG_PREFIX, message);
  }

  /**
   * Quick error logging function - USE THIS INSTEAD OF CONSOLE.ERROR and THROW NEW ERROR.
   * This prefixes all error messages with [Dominion Tracker].
   * It also allows for easy mocking in tests.
   * @param message error message
   * @param shouldThrow throw an error instead instead of logging to console.error
   */
  public error(message: unknown, shouldThrow = false): void {
    if (shouldThrow) {
      throw new Error(`${LOG_PREFIX} ${message}`);
    } else {
      console.error(LOG_PREFIX, message);
    }
  }
}

export default new Logger();
