import { DominionLogs, DominionPlayer } from "@types";
import logger from "logger";

export interface IGameManager {
	onPlayersFound: (players: DominionPlayer[]) => void;
	onLogsChanged: (logs: DominionLogs) => void;
}

export class GameManager implements IGameManager {

	public onLogsChanged(logs: DominionLogs): void {
		logger.log(logs);
	}

	public onPlayersFound(players: DominionPlayer[]): void {
		logger.log(players);
		this.players = players;
	}

	private players: DominionPlayer[] = [];
}