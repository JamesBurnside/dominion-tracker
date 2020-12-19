import { DominionSubjectType } from "@types";
import {extractSubjectFromLogLine, parseQualifierToInt} from "./subjectHelper";

const unsupportedCard = { type: DominionSubjectType.Unsupported };

describe("Subject helper tests", () => {
	test("extractSubjectFromLogLine should return expected subjects", () => {
		// falsey tests
		expect(extractSubjectFromLogLine("turtles")).toEqual(unsupportedCard);
		expect(extractSubjectFromLogLine("L buys and gains ")).toEqual(unsupportedCard);

		// thruthy tests
		expect(extractSubjectFromLogLine("L buys and gains a silver")).toEqual({
			type: DominionSubjectType.Card,
			card: "silver",
			amount: 1
		});
		expect(extractSubjectFromLogLine("L buys and gains a silver.")).toEqual({
			type: DominionSubjectType.Card,
			card: "silver",
			amount: 1
		});
		expect(extractSubjectFromLogLine("L buys and gains a silver from trash.")).toEqual({
			type: DominionSubjectType.Card,
			card: "silver",
			amount: 1
		});
	});
	test("parseQualifierToInt should return the correct number", () => {
		// "an" case
		expect(parseQualifierToInt("an")).toEqual(1);

		// "a" case
		expect(parseQualifierToInt("a")).toEqual(1);
		// number case
		expect(parseQualifierToInt("123")).toEqual(123);
		//null case
		expect(parseQualifierToInt("Incorrect Format")).toEqual(null);
	});
	test("extractSubjectFromLogLine handles basic numbers", () => {
		// gains
		expect(extractSubjectFromLogLine("L gains 2 silver")).toEqual({
			type: DominionSubjectType.Card,
			card: "silver",
			amount: 2
		});
		//trashes
		expect(extractSubjectFromLogLine("L trashes 51023 silver.")).toEqual({
			type: DominionSubjectType.Card,
			card: "silver",
			amount: 51023
		});
	});
});