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
			subject: {
				type: DominionSubjectType.Card,
				card: "Ambassador",
				amount: 1,
			},
		});

		expect(convertLogStringToLog("C gains a Noble Brigand.")).toEqual({
			playerName: "C",
			action: DominionAction.Gains,
			subject: {
				type: DominionSubjectType.Card,
				card: "Noble Brigand",
				amount: 1,
			},
		});

		expect(convertLogStringToLog("Turtles gains a Silver from trash.")).toEqual(
			{
				playerName: "Turtles",
				action: DominionAction.Gains,
				subject: {
					type: DominionSubjectType.Card,
					card: "Silver",
					amount: 1,
				},
			}
		);

		expect(convertLogStringToLog("Turtles starts with 7 Coppers.")).toEqual({
			playerName: "Turtles",
			action: DominionAction.Starts_With,
			subject: {
				type: DominionSubjectType.Card,
				card: "Copper",
				amount: 7,
			},
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
          "playerName": "L",
          "subject": Object {
            "amount": 7,
            "card": "Copper",
            "type": 1,
          },
        },
        Object {
          "action": "starts with",
          "playerName": "L",
          "subject": Object {
            "amount": 3,
            "card": "Estate",
            "type": 1,
          },
        },
        Object {
          "action": "starts with",
          "playerName": "C",
          "subject": Object {
            "amount": 7,
            "card": "Copper",
            "type": 1,
          },
        },
        Object {
          "action": "starts with",
          "playerName": "C",
          "subject": Object {
            "amount": 3,
            "card": "Estate",
            "type": 1,
          },
        },
        Object {
          "action": "buys and gains",
          "playerName": "L",
          "subject": Object {
            "amount": 1,
            "card": "Militia",
            "type": 1,
          },
        },
        Object {
          "action": "buys and gains",
          "playerName": "C",
          "subject": Object {
            "amount": 1,
            "card": "Silver",
            "type": 1,
          },
        },
        Object {
          "action": "buys and gains",
          "playerName": "L",
          "subject": Object {
            "amount": 1,
            "card": "Silver",
            "type": 1,
          },
        },
        Object {
          "action": "buys and gains",
          "playerName": "C",
          "subject": Object {
            "amount": 1,
            "card": "Silver",
            "type": 1,
          },
        },
        Object {
          "action": "buys and gains",
          "playerName": "L",
          "subject": Object {
            "amount": 1,
            "card": "Silver",
            "type": 1,
          },
        },
        Object {
          "action": "buys and gains",
          "playerName": "C",
          "subject": Object {
            "amount": 1,
            "card": "Silver",
            "type": 1,
          },
        },
        Object {
          "action": "buys and gains",
          "playerName": "L",
          "subject": Object {
            "amount": 1,
            "card": "Council Room",
            "type": 1,
          },
        },
      ]
    `);
	});
});
