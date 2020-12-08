export function logError(message: string, shouldThrow = false): void {
	const errorMessage = `[Dominion Tracker] ${message}`;

	if (shouldThrow) {
		throw new Error(errorMessage);
	} else {
		console.error(errorMessage);
	}
}