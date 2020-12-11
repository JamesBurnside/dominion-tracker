import { DominionSubjectType } from "@types";
import { extractSubjectFromLogLine } from "./subjectHelper";

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
});