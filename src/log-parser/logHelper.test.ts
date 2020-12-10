import { DominionAction } from "@types";
import { convertLogStringToLog, getLogsFromContainer, isValidLogString } from "./logHelpers";

describe("Log helper tests", () => {
	test("invalid log strings are correctly identified", () => {
		// falsy tests
		expect(isValidLogString(undefined)).toBeFalsy();
		expect(isValidLogString(null)).toBeFalsy();
		expect(isValidLogString("")).toBeFalsy();
		expect(isValidLogString("Game #61325495, unrated.")).toBeFalsy();
		expect(isValidLogString("Kingdom generated with these relative percentages:")).toBeFalsy();
		expect(isValidLogString("50%: Poacher and Bandit")).toBeFalsy();
		expect(isValidLogString("Turn 1 - Lord Rattington")).toBeFalsy();
		expect(isValidLogString("L starts with 7 Coppers.")).toBeFalsy();

		// truthy tests
		expect(isValidLogString("L buys and gains an Ambassador.")).toBeTruthy();
		expect(isValidLogString("C gains a Noble Brigand.")).toBeTruthy();
		expect(isValidLogString("C gains a Silver from trash.")).toBeTruthy();
	});

	test("Successfully converts log strings to dominion logs", () => {
		expect(convertLogStringToLog("L buys and gains an Ambassador.")).toEqual({
			playerName: "L",
			primaryAction: DominionAction.Buys_And_Gains,
			primarySubject: undefined
			// primarySubject: {
			// 	type: DominionSubjectType.Card,
			// 	card: "Ambassador",
			// 	amount: 1
			// }
		});

		expect(convertLogStringToLog("C gains a Noble Brigand.")).toEqual({
			playerName: "C",
			primaryAction: DominionAction.Gains,
			primarySubject: undefined
			// primarySubject: {
			// 	type: DominionSubjectType.Card,
			// 	card: "Noble Brigand",
			// 	amount: 1
			// }
		});

		expect(convertLogStringToLog("C gains a Silver from trash.")).toEqual({
			playerName: "C",
			primaryAction: DominionAction.Gains,
			primarySubject: undefined
			// primarySubject: {
			// 	type: DominionSubjectType.Card,
			// 	card: "Silver",
			// 	amount: 1
			// }
		});
	})

	test("Successfully gets only valid logs from log container", () => {
		// Arrange
		const mockContainer = document.createElement("div");
		const mockLog = `Game #61325495, unrated.

			Kingdom generated with these relative percentages:
			0%: Treasure Map
			50%: Poacher and Bandit
			200%: Wandering Minstrel

			L starts with 7 Coppers.
			L starts with 3 Estates.
			C starts with 7 Coppers.
			C starts with 3 Estates.
			L shuffles their deck.
			L draws 5 cards.
			C shuffles their deck.
			C draws 3 Coppers and 2 Estates.

			Turn 1 - Lord Rattington
			L plays 5 Coppers. (+$5)
			L buys and gains an Ambassador.
			L draws 5 cards.

			Turn 1 - Cl0bBer123
			C plays 3 Coppers. (+$3)
			C buys and gains an Ambassador.
			C draws 4 Coppers and an Estate.`;

		mockContainer.innerHTML += mockLog

		// Act
		const logs = getLogsFromContainer(mockContainer);

		// Assert
		expect(logs).toHaveLength(2);
	});
});