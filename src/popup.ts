export function dummyFunction(): string {
	return "test";
}

function logError(message: string) {
	console.error(`[Dominion Tracker] ${message}`);
}

logError("Test new error");
