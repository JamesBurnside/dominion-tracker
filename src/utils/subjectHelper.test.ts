import { stringToSubject } from "./subjectHelper";

describe("Subject enum conversion tests", () => {
	test("stringToSubject should throw error or return undefined if string is not recognized", () => {
		expect(stringToSubject("turtles")).toBeUndefined();
	});
});