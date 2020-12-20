import { DominionLogs, DominionPlayer, DominionPlayerFullName } from "@types";
import logger from "logger";

export interface IGameManager {
	onPlayerFullNamesFound: (players: DominionPlayerFullName[]) => void;
	onLogsChanged: (logs: DominionLogs) => void;
}

export class GameManager implements IGameManager {

	public onLogsChanged(logs: DominionLogs): void {
		logger.log(logs);
	}

	public onPlayerFullNamesFound(players: DominionPlayerFullName[]): void {
		logger.log(players);
		// this.players = players;
	}

	private players: DominionPlayer[] = [];
}