import {CardStack, DominionSubjectType} from "@types";
import {
	extractSubjectsFromLogLine,
	parseQualifierToInt,
	isCardNameOfficial,
	cardDepluralizer,
	extractIndividualSubject
} from "./subjectHelper";

const unsupportedCard = { type: DominionSubjectType.Unsupported };
const unsupportedStack: CardStack = [{
	type: DominionSubjectType.Unsupported
}]

describe("Subject helper tests", () => {
	test("extractSubjectFromLogLine should return expected subjects", () => {
		// falsey tests
		expect(extractSubjectsFromLogLine("turtles")).toEqual(unsupportedStack);
		expect(extractSubjectsFromLogLine("L buys and gains ")).toEqual(unsupportedStack);
		expect(extractSubjectsFromLogLine("L gains 2 ESSTATIES")).toEqual(unsupportedStack);

		// thruthy tests
		expect(extractSubjectsFromLogLine("L buys and gains a Silver")).toEqual([{
			type: DominionSubjectType.Card,
			card: "Silver",
			amount: 1
		}]);
		expect(extractSubjectsFromLogLine("L buys and gains a Silver.")).toEqual([{
			type: DominionSubjectType.Card,
			card: "Silver",
			amount: 1
		}]);
		expect(extractSubjectsFromLogLine("L buys and gains a Silver from trash.")).toEqual([{
			type: DominionSubjectType.Card,
			card: "Silver",
			amount: 1
		}]);
		expect(extractSubjectsFromLogLine("L gains 2 Silvers from trash.")).toEqual([{
			type: DominionSubjectType.Card,
			card: "Silver",
			amount: 2
		}]);
	});
	//Handling Individual Actions
	test("extractIndividualSubject handles individual subjects", () => {
		// error
		expect(extractIndividualSubject("a ", "a garbage logline for testing")).toEqual(unsupportedCard);
		// success
		expect(extractIndividualSubject("a Duchy", "another garbage logline for testing")).toEqual({
			type: DominionSubjectType.Card,
			card: "Duchy",
			amount: 1
		});
		//two-word subjects
		expect(extractIndividualSubject("a Death Cart", "another articulately written logline for testing")).toEqual({
			type: DominionSubjectType.Card,
			card: "Death Cart",
			amount: 1
		});
	});
	//Lists of subjects
	test("extractSubjectsFromLogLine should return lists of subjects", () => {
		// error
		expect(extractSubjectsFromLogLine("Jam gains a Duchy, 2 Estates and a Province")).toEqual([
			{
				type: DominionSubjectType.Card,
				card: "Duchy",
				amount: 1
			},
			{
				type: DominionSubjectType.Card,
				card: "Estate",
				amount: 2
			},
			{
				type: DominionSubjectType.Card,
				card: "Province",
				amount: 1
			}
		]);
	});
	//Parsing numbers in front of subject
	test("parseQualifierToInt should return the correct number", () => {
		// "an" case
		expect(parseQualifierToInt("an")).toEqual(1);
		// "a" case
		expect(parseQualifierToInt("a")).toEqual(1);
		// number case
		expect(parseQualifierToInt("123")).toEqual(123);
		//null case
		expect(parseQualifierToInt("Incorrect Format")).toBeNull();
	});
	//handling numbers in core function
	test("extractSubjectsFromLogLine handles basic numbers", () => {
		// gains
		expect(extractSubjectsFromLogLine("L gains 2 Silver")).toEqual([{
			type: DominionSubjectType.Card,
			card: "Silver",
			amount: 2
		}]);
		//trashes
		expect(extractSubjectsFromLogLine("L trashes 51023 Silvers.")).toEqual([{
			type: DominionSubjectType.Card,
			card: "Silver",
			amount: 51023
		}]);
	});
	//throw an error on multiple "ands"
	test("extractSubjectsFromLogLine doesn't handle multiple 'ands'", () => {
		// error
		expect(extractSubjectsFromLogLine("Jak gains a Duchy and 2 Estates and a Province")).toEqual(unsupportedStack);
	});
	//look in the card dictionary for common typos
	test("isCardNameOfficial, should find cards in dictionary", () => {
		// truthy
		expect(isCardNameOfficial("Copper")).toBeTruthy();
		//falsey
		expect(isCardNameOfficial("Coppers")).toBeFalsy();
		expect(isCardNameOfficial("NotaRealDominionCard")).toBeFalsy()
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
		expect(cardDepluralizer("CopperssZss")).toBeUndefined();
	});
});