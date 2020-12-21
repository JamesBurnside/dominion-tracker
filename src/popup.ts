import { DominionDeck, DominionPlayer } from "@types";
import logger from "logger";
import { PlayerFullNameParser } from "player-parser";
// import { deserializePlayers } from "utils";

/**
 * WEBPACK IS BEING VERY PROBLEMATIC SO COPYING THIS HERE.
 * Basically when this is exported form utils\messageSerializer the contentScript no longer works.
 * The problem lies somewhere in webpacks loading modules code but I haven't got to the bottom of it.
 * Keep this function the same as the one in messageSerializer.test.ts.
 */
function deserializePlayers(serializedPlayers: string): DominionPlayer[] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return JSON.parse(serializedPlayers, function (this: any, key: string, value: any) {
		if(typeof value === "object" && value !== null) {
			if (value.dataType === "Map") {
				return new Map(value.value);
			}
		}
		return value;
	});
}

async function getPlayers(): Promise<DominionPlayer[]> {
	return new Promise((resolve) => {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {type: "getPlayers"}, function(serializedPlayers) {
				const players = deserializePlayers(serializedPlayers);
				logger.log("Players received from content script:");
				logger.log(players);

				resolve(players);
			});
		});
	});
}

function deckToHtmlElement(deck: DominionDeck): HTMLElement {
	const deckContainer = document.createElement("div");
	deckContainer.className = "player-deck";

	if (!deck) {
		deckContainer.className += "no-deck";
		deckContainer.textContent = "no deck :(";
		return deckContainer;
	}

	for (const [card, amount] of deck.entries()) {
		const cardAmountElement = document.createElement("div");
		cardAmountElement.className = "card-amount";
		cardAmountElement.textContent = `${card}: ${amount}`;
		deckContainer.appendChild(cardAmountElement)
	}

	return deckContainer;
}

// TODO: Try out web components and turn a player container into a web component!
// Wait for this before writing tests.
function getPlayerAsHtmlElement(player: DominionPlayer): HTMLElement {
	const playerContainer = document.createElement("div");
	playerContainer.className = "player-container";

	const fullNameContainer = document.createElement("div");
	fullNameContainer.className = "player-name";
	fullNameContainer.textContent = player?.fullName;

	const deckContainer = deckToHtmlElement(player?.deck);

	playerContainer.appendChild(fullNameContainer);
	playerContainer.appendChild(deckContainer);

	return playerContainer;
}

async function updatePlayers(): Promise<void> {
	const players = await getPlayers();

	const playerContainerDiv = document.getElementById("players-container");

	for(const player of players) {
		playerContainerDiv.appendChild(getPlayerAsHtmlElement(player));
	}
}

updatePlayers();
