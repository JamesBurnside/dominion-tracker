import logger from "./logger";

describe("Error logging tests", () => {
	test("Error logger messages should be prefixed with [Dominion Tracker]", () => {
		const consoleSpy = jest.spyOn(console, "error").mockImplementation();
		const errorMessage = "turtles";
		logger.error(errorMessage);
		expect(consoleSpy).toHaveBeenLastCalledWith("[Dominion Tracker]", errorMessage);
	});

	test("Error logger should throw error if shouldThrow it true", () => {
		expect(() => { logger.error("turtles", true); }).toThrowError();
	});
});

describe("Regular logging tests", () => {
	test("Logger messages should be prefixed with [Dominion Tracker]", () => {
		const consoleSpy = jest.spyOn(console, "log").mockImplementation();
		const message = "turtles";
		logger.log(message);
		expect(consoleSpy).toHaveBeenLastCalledWith("[Dominion Tracker]", message);
	});
});