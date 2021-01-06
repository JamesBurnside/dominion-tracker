import { DominionLogs, DominionPlayer, DominionPlayerFullName, DominionPlayerShortName } from "@types";
import logger from "logger";
import {addFullPlayerNamesToPlayers, addShortPlayerNamesToPlayers, computeLog} from "./gameHelper";
import {getGameNumberFromContainer} from "../log-parser/logHelpers";

export interface IGameManager {
	getPlayers: () => DominionPlayer[];
	getGameNumber: () => string;
	onPlayerShortNamesFound: (players: DominionPlayerShortName[]) => void;
	onPlayerFullNamesFound: (players: DominionPlayerFullName[]) => void;
	onLogsChanged: (logs: DominionLogs) => void;
}

export class GameManager implements IGameManager {
	private players: DominionPlayer[] = [];
	private gameNumber: string = undefined;

	/** Public getter for players */
	public getPlayers = (): DominionPlayer[] => this.players;

	public getGameNumber = (): string => this.gameNumber;

	public onLogsChanged = (logs: DominionLogs): void => {
		logger.log("logs");
		logger.log(logs);

		// TODO: For now just wipe the players decks and recompute everything
		// We should really only return new logs and then update players' decks
		this.players.forEach(player => {
			player.deck = new Map();
		});
		this.gameNumber = getGameNumberFromContainer()

		logger.log(`Game # ${this.gameNumber}`)
		logs.forEach(log => computeLog(log, this.players));

		logger.log("players");
		logger.log(this.players);

	}

	public onPlayerFullNamesFound = (playerFullNames: DominionPlayerFullName[]): void => {
		playerFullNames.forEach((playerFullName) => addFullPlayerNamesToPlayers(playerFullName, this.players));
		logger.log("players");
		logger.log(this.players);
	}

	public onPlayerShortNamesFound = (playerShortNames: DominionPlayerFullName[]): void => {
		playerShortNames.forEach((playerShortName) => addShortPlayerNamesToPlayers(playerShortName, this.players));
		logger.log("players");
		logger.log(this.players);
	}
}