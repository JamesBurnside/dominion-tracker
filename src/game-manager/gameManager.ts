import { DominionLogs, DominionPlayer, DominionPlayerFullName, DominionPlayerShortName } from "@types";
import logger from "logger";
import {addFullPlayerNamesToPlayers, addShortPlayerNamesToPlayers, computeLog, players} from "./gameHelper";

export interface IGameManager {
	getPlayers: () => DominionPlayer[];
	onPlayerShortNamesFound: (players: DominionPlayerShortName[]) => void;
	onPlayerFullNamesFound: (players: DominionPlayerFullName[]) => void;
	onLogsChanged: (logs: DominionLogs) => void;
}

export class GameManager implements IGameManager {

	/** Public getter for players */
	public getPlayers = (): DominionPlayer[] => players;

	public onLogsChanged = (logs: DominionLogs): void => {
		logger.log("logs");
		logger.log(logs);

		// TODO: For now just wipe the players decks and recompute everything
		// We should really only return new logs and then update players' decks
		players.forEach(player => {
			player.deck = new Map();
		});

		logs.forEach(log => computeLog(log));

		logger.log("players");
		logger.log(players);

	}

	public onPlayerFullNamesFound = (playerFullNames: DominionPlayerFullName[]): void => {
		playerFullNames.forEach((playerFullName) => addFullPlayerNamesToPlayers(playerFullName));
		logger.log("players");
		logger.log(players);
	}

	public onPlayerShortNamesFound = (playerShortNames: DominionPlayerFullName[]): void => {
		playerShortNames.forEach((playerShortName) => addShortPlayerNamesToPlayers(playerShortName));
		logger.log("players");
		logger.log(players);
	}
}