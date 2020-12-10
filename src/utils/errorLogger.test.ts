import { logError } from "./errorLogger";

describe("Error logger tests", () => {
	test("Error logger messages should be prefixed with [Dominion Tracker]", () => {
		const consoleSpy = jest.spyOn(console, "error").mockImplementation();
		const errorMessage = "turtles";
		logError(errorMessage);
		expect(consoleSpy).toHaveBeenLastCalledWith(`[Dominion Tracker] ${errorMessage}`);
	});

	test("Error logger should throw error if shouldThrow it true", () => {
		expect(() => { logError("turtles", true); }).toThrowError();
	});
});