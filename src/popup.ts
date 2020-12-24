import { DominionDeck, DominionPlayer } from "@types";
import logger from "logger";
import { cardDictionary, deserializePlayers } from "utils";

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

function playersToCSV(players: DominionPlayer[]): string {
	let csv = "data:text/csv;charset=utf-8,";

	const header = `Player, ${Array.from(cardDictionary.keys()).join(",")} \r\n`;
	csv += header;

	players.forEach(function(player) {
		let row = `${player.fullName}`;
		for (const card of cardDictionary.keys()) {
			row += "," + (player.deck.get(card) ?? "0");
		}
		csv += row + "\r\n";
	});

	return csv;
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

document.getElementById("csv-button").onclick = async () => {
	const players = await getPlayers();
	const csvString = playersToCSV(players);
	const encodedUri = encodeURI(csvString);

	const downloadLink = document.createElement("a");
	downloadLink.href = encodedUri;

	const filename = `dominion - ${(new Date()).toISOString()}.csv`;
	downloadLink.download = filename;

	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}
