import { DominionAction, DominionSubjectType } from "@types";
import { htmlLog1 } from "test-utils";
import {
	convertLogStringToLog,
	getLogsFromContainer,
	getPlayerShortNamesFromContainer,
	isValidLogString,
} from "./logHelpers";

describe("Log helper tests", () => {
	test("invalid log strings are correctly identified", () => {
		// falsy tests
		expect(isValidLogString(undefined)).toBeFalsy();
		expect(isValidLogString(null)).toBeFalsy();
		expect(isValidLogString("")).toBeFalsy();
		expect(isValidLogString("Game #61325495, unrated.")).toBeFalsy();
		expect(
			isValidLogString("Kingdom generated with these relative percentages:")
		).toBeFalsy();
		expect(isValidLogString("50%: Poacher and Bandit")).toBeFalsy();
		expect(isValidLogString("Turn 1 - Lord Rattington")).toBeFalsy();

		// truthy tests
		expect(isValidLogString("L starts with 7 Coppers.")).toBeTruthy();
		expect(isValidLogString("L buys and gains an Ambassador.")).toBeTruthy();
		expect(isValidLogString("C gains a Noble Brigand.")).toBeTruthy();
		expect(isValidLogString("C gains a Silver from trash.")).toBeTruthy();
	});

	test("Successfully converts log strings to dominion logs", () => {
		expect(convertLogStringToLog("L buys and gains an Ambassador.")).toEqual({
			playerName: "L",
			action: DominionAction.Buys_And_Gains,
			cardStack: [
				{
					type: DominionSubjectType.Card,
					card: "Ambassador",
					amount: 1,
				},
			],
		});

		expect(convertLogStringToLog("C gains a Noble Brigand.")).toEqual({
			playerName: "C",
			action: DominionAction.Gains,
			cardStack: [
				{
					type: DominionSubjectType.Card,
					card: "Noble Brigand",
					amount: 1,
				},
			],
		});

		expect(
			convertLogStringToLog("Turtles gains a Silver and a Copper from trash.")
		).toEqual({
			playerName: "Turtles",
			action: DominionAction.Gains,
			cardStack: [
				{
					type: DominionSubjectType.Card,
					card: "Silver",
					amount: 1,
				},
				{
					type: DominionSubjectType.Card,
					card: "Copper",
					amount: 1,
				},
			],
		});

		expect(
			convertLogStringToLog(
				"NextYear starts with a Death Cart, 13 Rats and 2020 Doctors."
			)
		).toEqual({
			playerName: "NextYear",
			action: DominionAction.Starts_With,
			cardStack: [
				{
					type: DominionSubjectType.Card,
					card: "Death Cart",
					amount: 1,
				},
				{
					type: DominionSubjectType.Card,
					card: "Rats",
					amount: 13,
				},
				{
					type: DominionSubjectType.Card,
					card: "Doctor",
					amount: 2020,
				},
			],
		});
	});

	test("Successfully get players short names", () => {
		// Arrange
		const mockDom = document.createElement("div");
		mockDom.innerHTML += htmlLog1;

		// Act
		const playerShortNames = getPlayerShortNamesFromContainer(mockDom);

		// Assert
		expect(playerShortNames).toEqual(["L", "C"]);
	});

	test("Successfully gets only valid logs from log container", async () => {
		// Arrange
		const mockDom = document.createElement("div");
		mockDom.innerHTML += htmlLog1;

		// Act
		const logs = getLogsFromContainer(mockDom);

		// Assert
		expect(logs).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "starts with",
          "cardStack": Array [
            Object {
              "amount": 7,
              "card": "Copper",
              "type": 1,
            },
          ],
          "playerName": "L",
        },
        Object {
          "action": "starts with",
          "cardStack": Array [
            Object {
              "amount": 3,
              "card": "Estate",
              "type": 1,
            },
          ],
          "playerName": "L",
        },
        Object {
          "action": "starts with",
          "cardStack": Array [
            Object {
              "amount": 7,
              "card": "Copper",
              "type": 1,
            },
          ],
          "playerName": "C",
        },
        Object {
          "action": "starts with",
          "cardStack": Array [
            Object {
              "amount": 3,
              "card": "Estate",
              "type": 1,
            },
          ],
          "playerName": "C",
        },
        Object {
          "action": "buys and gains",
          "cardStack": Array [
            Object {
              "amount": 1,
              "card": "Militia",
              "type": 1,
            },
          ],
          "playerName": "L",
        },
        Object {
          "action": "buys and gains",
          "cardStack": Array [
            Object {
              "amount": 1,
              "card": "Silver",
              "type": 1,
            },
          ],
          "playerName": "C",
        },
        Object {
          "action": "buys and gains",
          "cardStack": Array [
            Object {
              "amount": 1,
              "card": "Silver",
              "type": 1,
            },
          ],
          "playerName": "L",
        },
        Object {
          "action": "buys and gains",
          "cardStack": Array [
            Object {
              "amount": 1,
              "card": "Silver",
              "type": 1,
            },
          ],
          "playerName": "C",
        },
        Object {
          "action": "buys and gains",
          "cardStack": Array [
            Object {
              "amount": 1,
              "card": "Silver",
              "type": 1,
            },
          ],
          "playerName": "L",
        },
        Object {
          "action": "buys and gains",
          "cardStack": Array [
            Object {
              "amount": 1,
              "card": "Silver",
              "type": 1,
            },
          ],
          "playerName": "C",
        },
        Object {
          "action": "buys and gains",
          "cardStack": Array [
            Object {
              "amount": 1,
              "card": "Council Room",
              "type": 1,
            },
          ],
          "playerName": "L",
        },
      ]
    `);
	});
});
