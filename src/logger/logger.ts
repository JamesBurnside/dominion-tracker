class Logger {
	/**
	 * Quick console logging function - USE THIS INSTEAD OF CONSOLE.LOG
	 * This prefixes all error messages with [Dominion Tracker].
	 * It also allows for easy mocking in tests.
	 */
	public log(message: unknown): void {
		console.log(`[Dominion Tracker] ${message}`);
	}

	/**
	 * Quick error logging function - USE THIS INSTEAD OF CONSOLE.ERROR and THROW NEW ERROR.
	 * This prefixes all error messages with [Dominion Tracker].
	 * It also allows for easy mocking in tests.
	 * @param message error message
	 * @param shouldThrow throw an error instead instead of logging to console.error
	 */
	public error(message: unknown, shouldThrow = false): void {
		const errorMessage = `[Dominion Tracker] ${message}`;

		if (shouldThrow) {
			throw new Error(errorMessage);
		} else {
			console.error(errorMessage);
		}
	}
}

export default new Logger();