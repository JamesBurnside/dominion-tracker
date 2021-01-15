import {DominionPlayer} from "@types";
import {messageContentScript, getPlayersFromContentScript, serializePlayers} from "utils";
import { DominionPlayerHtmlElement } from "./dominion-player";

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
		//Ask contentScript to addScoresToPlayers. ContentScript returns true if completed.
		const isEndOfGame = await messageContentScript("addScoresToPlayers");
		const players = await getPlayersFromContentScript();
		if (serializePlayers(players) === serializePlayers(this._players)) {
			// players have not changed since last update. ignore.
			return;
		}

		this._players = players;

		// clear current players in container
		this.innerHTML = "";

		for(const player of players) {
			this.appendChild(new DominionPlayerHtmlElement(player));
		}
	}

	private updateIntervalHandle: NodeJS.Timeout = undefined;
	private _players: DominionPlayer[] = [];
}
