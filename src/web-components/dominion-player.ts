import { DominionPlayer } from "@types";
import logger from "logger";
import { DominionDeckHtmlElement } from "./dominion-deck";

export class DominionPlayerHtmlElement extends HTMLElement {
	constructor(player: DominionPlayer) {
		super();

		if (!player) logger.error("Invalid player!", false);

		this.id = player.shortName;
		this._player = player;
	}

	connectedCallback(): void {
		const fullNameContainer = document.createElement("div");
		fullNameContainer.className = "player-name";
		fullNameContainer.textContent = this._player.fullName;

		const deckContainer = new DominionDeckHtmlElement(this._player.deck);

		this.appendChild(fullNameContainer);
		this.appendChild(deckContainer);
	}

	private _player: DominionPlayer;
}