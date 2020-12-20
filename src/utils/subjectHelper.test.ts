import { DominionSubjectType } from "@types";
import {extractSubjectFromLogLine, parseQualifierToInt, isCardNameOfficial, cardDepluralizer} from "./subjectHelper";

const unsupportedCard = { type: DominionSubjectType.Unsupported };

describe("Subject helper tests", () => {
	test("extractSubjectFromLogLine should return expected subjects", () => {
		// falsey tests
		expect(extractSubjectFromLogLine("turtles")).toEqual(unsupportedCard);
		expect(extractSubjectFromLogLine("L buys and gains ")).toEqual(unsupportedCard);
		expect(extractSubjectFromLogLine("L gains 2 ESSTATIES")).toEqual(unsupportedCard);

		// thruthy tests
		expect(extractSubjectFromLogLine("L buys and gains a Silver")).toEqual({
			type: DominionSubjectType.Card,
			card: "Silver",
			amount: 1
		});
		expect(extractSubjectFromLogLine("L buys and gains a Silver.")).toEqual({
			type: DominionSubjectType.Card,
			card: "Silver",
			amount: 1
		});
		expect(extractSubjectFromLogLine("L buys and gains a Silver from trash.")).toEqual({
			type: DominionSubjectType.Card,
			card: "Silver",
			amount: 1
		});
		expect(extractSubjectFromLogLine("L gains 2 Silvers from trash.")).toEqual({
			type: DominionSubjectType.Card,
			card: "Silver",
			amount: 2
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
	//TODO: expand this test to include plural numbers
	test("extractSubjectFromLogLine handles basic numbers", () => {
		// gains
		expect(extractSubjectFromLogLine("L gains 2 Silver")).toEqual({
			type: DominionSubjectType.Card,
			card: "Silver",
			amount: 2
		});
		//trashes
		expect(extractSubjectFromLogLine("L trashes 51023 Silver.")).toEqual({
			type: DominionSubjectType.Card,
			card: "Silver",
			amount: 51023
		});
	});
	//look in the card dictionary for common typos
	test("isCardNameOfficial, should find cards in dictionary", () => {
		// truthy
		expect(isCardNameOfficial("Copper")).toEqual(true);
		//falsey
		expect(isCardNameOfficial("Coppers")).toEqual(false);
		expect(isCardNameOfficial("NotaRealDominionCard")).toEqual(false);
	});
	//depluralize card names
	test("cardDepluralizer, should depluralize cards", () => {
		// simple
		expect(cardDepluralizer("Copper")).toEqual("Copper");
		//plural
		expect(cardDepluralizer("Coppers")).toEqual("Copper");
		//exists in the plurals map
		expect(cardDepluralizer("Platina")).toEqual("Platinum");
		//undefined
		expect(cardDepluralizer("CopperssZss")).toEqual(undefined);
	});
});