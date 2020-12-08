import { stringToSubject } from "./subjectHelper";

describe("Subject enum conversion tests", () => {
	test("stringToSubject should throw error if string is not recognized", () => {
		expect(() => { stringToSubject("turtles"); }).toThrowError();
	});
});