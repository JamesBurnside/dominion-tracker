import { DominionLogs, DominionPlayer, DominionPlayerFullName, DominionPlayerShortName } from "@types";
import logger from "logger";

export interface IGameManager {
	onPlayerShortNamesFound: (players: DominionPlayerShortName[]) => void;
	onPlayerFullNamesFound: (players: DominionPlayerFullName[]) => void;
	onLogsChanged: (logs: DominionLogs) => void;
}

export class GameManager implements IGameManager {

	public onLogsChanged(logs: DominionLogs): void {
		logger.log(logs);
	}

	public onPlayerFullNamesFound(players: DominionPlayerFullName[]): void {
		logger.log(players);
	}

	public onPlayerShortNamesFound(players: DominionPlayerFullName[]): void {
		logger.log(players);
	}

	private players: DominionPlayer[] = [];
}