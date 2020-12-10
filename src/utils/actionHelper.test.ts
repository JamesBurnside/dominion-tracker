import { DominionAction } from "@types";
import { extractActionFromLogLine } from "./actionHelper";

describe("Action enum conversion tests", () => {
	test("stringToAction should provide known action if string is recognized", () => {
		expect(extractActionFromLogLine("A buys and gains a turtle")).toEqual(DominionAction.Buys_And_Gains);
		expect(extractActionFromLogLine("A gains a turtle")).toEqual(DominionAction.Gains);
	});

	// test("stringToAction should throw error if string is not recognized", () => {
	// 	expect(() => { stringToAction("turtles"); }).toThrowError();
	// });
});