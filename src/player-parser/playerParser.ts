import { DominionPlayer } from "@types";

export default class PlayerParser {
	constructor(onPlayersFound?: (players: DominionPlayer[]) => void) {
		this.playersFoundCallback = onPlayersFound;
	}

	private playersFoundCallback: (players: DominionPlayer[]) => void = null;
}