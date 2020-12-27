import { DominionDeck, DominionPlayer } from "@types";
// import logger from "logger";
import { getPlayersFromContentScript } from "utils";

// move to dominion-deck web component
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

// move to dominion-single-player web component
function getPlayerAsHtmlElement(player: DominionPlayer): HTMLElement {
	const playerContainer = document.createElement("div");
	playerContainer.className = "player-container";
	playerContainer.id = player?.shortName;

	const fullNameContainer = document.createElement("div");
	fullNameContainer.className = "player-name";
	fullNameContainer.textContent = player?.fullName;

	const deckContainer = deckToHtmlElement(player?.deck);

	playerContainer.appendChild(fullNameContainer);
	playerContainer.appendChild(deckContainer);

	return playerContainer;
}

export class DominionPlayersHtmlElement extends HTMLElement {
	constructor() {
		super();

		// Ensure class functions access the correct "this"
		this.updatePlayers = this.updatePlayers.bind(this);
	}

	connectedCallback(): void {
		this.updatePlayers();
		this.updateIntervalHandle = setInterval(this.updatePlayers, 500);
	}

	disconnectedCallback(): void {
		clearInterval(this.updateIntervalHandle);
	}

	private async updatePlayers(): Promise<void> {
		const players = await getPlayersFromContentScript();

		// clear current players in container
		this.innerHTML = "";

		for(const player of players) {
			this.appendChild(getPlayerAsHtmlElement(player));
		}
	}

	private updateIntervalHandle: NodeJS.Timeout = undefined;
}
