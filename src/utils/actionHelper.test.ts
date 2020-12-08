import { DominionAction } from "../@types";
import { stringToAction } from "./actionHelper";

describe("Action enum conversion tests", () => {
	test("stringToAction should provide known action if string is recognized", () => {
		expect(stringToAction("buys")).toEqual(DominionAction.Buy);
	});

	test("stringToAction should throw error if string is not recognized", () => {
		expect(() => { stringToAction("turtles"); }).toThrowError();
	});
});