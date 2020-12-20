import { DominionPlayerFullName } from "@types";
import { documentObserver } from "observers";
import { getPlayerNamesFromDocument } from "./playerParserHelper";

export default class PlayerFullNameParser {
	constructor(onPlayersFound?: (players: DominionPlayerFullName[]) => void) {
		this.playersFoundCallback = onPlayersFound;

		if (getPlayerNamesFromDocument().length === 0) {
			// player containers do not exist yet, watch DOM and wait for them to exist
			this.listenForLogContainerCreation();
		} else {
			// containers already exists, use straight away
			this.updatePlayers(getPlayerNamesFromDocument());
		}
	}

	/** Public getter for the player names */
	public get players() : string[]
	{
		return this._players;
	}

	private updatePlayers(newPlayers: string []) {
		if (JSON.stringify(newPlayers) !== JSON.stringify(this.players)) {
			this._players = newPlayers;
			this.playersFoundCallback(newPlayers);
		}
	}

	private listenForLogContainerCreation(): void {
		documentObserver.subscribe(this.observerId, () => {
			if (getPlayerNamesFromDocument().length > 0) {
				this.updatePlayers(getPlayerNamesFromDocument());
				this.unsubscribeFromDocumentChanges();
			}
		});
	}

	private unsubscribeFromDocumentChanges(): void {
		documentObserver.unsubscribe(this.observerId);
	}

	private observerId = `player-fullname-parser ${Math.random()}`
	private _players: DominionPlayerFullName[] = [];
	private playersFoundCallback: (players: DominionPlayerFullName[]) => void = null;
}