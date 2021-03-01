import { DominionAction, DominionLogs, DominionPlayer, DominionPlayerFullName, DominionPlayerShortName } from "@types";
import logger from "logger";
import {addFullPlayerNamesToPlayers, addShortPlayerNamesToPlayers, computeLog} from "./gameHelper";
import {getGameNumberFromContainer} from "../log-parser/logHelpers";
import {addEndOfGameScoresToPlayers, getScoreContainer, isEndOfGameScreen} from "./endOfGameHelper";
import { documentObserver } from "observers";

export interface IGameManager {
	reset: () => void;
	getPlayers: () => DominionPlayer[];
	getGameNumber: () => string;
	onPlayerShortNamesFound: (players: DominionPlayerShortName[]) => void;
	onPlayerFullNamesFound: (players: DominionPlayerFullName[]) => void;
	onLogsChanged: (logs: DominionLogs) => void;
	addScoresToPlayers: () => boolean;
}

export class GameManager implements IGameManager {
	private players: DominionPlayer[] = [];
	private gameNumber: string = undefined;
	private gameStartTime: number | undefined = undefined;
	private gameEndTime: number | undefined = undefined;
	private isEndOfGame = false;
	private observerId = `log-parser ${Math.random()}`;

	constructor() {
		documentObserver.subscribe(this.observerId, () => {
			const wasEndOfGame = this.isEndOfGame;
			this.isEndOfGame = isEndOfGameScreen();

			// If we just hit the end screen, record the end game time
			if (!wasEndOfGame && this.isEndOfGame) {
				this.gameEndTime = Date.now();

				const gameDuration = (this.gameEndTime && this.gameStartTime) ? (this.gameEndTime - this.gameStartTime) : undefined;
				logger.log(`End of game! Game was ${Math.floor(gameDuration/1000/60)} minutes and ${Math.floor(gameDuration/1000)} seconds`);
			}
		});
	}

	/** Public getter for players */
	public getPlayers = (): DominionPlayer[] => this.players;

	public getGameNumber = (): string => this.gameNumber;

	public reset = (): void => {
		this.players = [];
		this.gameNumber = undefined;
		this.gameStartTime = undefined;
		this.gameEndTime = undefined;
	}

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

		// If the only logs are the "starts with", lets assume its a new game here and start the new game timer.
		// Save this to local storage for to help track across refreshes.
		if (this.gameStartTime === undefined && this.gameNumber.length > 1) {
			const timeFromLocalStorage = localStorage.getItem(`${this.gameNumber} -- startTime`);
			if (timeFromLocalStorage) {
				this.gameStartTime = Number(timeFromLocalStorage);
			} else if (logs.length > 0 && (logs.filter(log => log.action !== DominionAction.Starts_With)).length === 0) {
				this.gameStartTime = Date.now();
				localStorage.setItem(`${this.gameNumber} -- startTime`, this.gameStartTime+"");
			}
			logger.log(`Set game start time: ${this.gameStartTime}`);
		}

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

	public addScoresToPlayers = (): boolean => {
		const gameDuration = (this.gameEndTime && this.gameStartTime) ? (this.gameEndTime - this.gameStartTime) : undefined;
		return this.isEndOfGame &&
			addEndOfGameScoresToPlayers(getScoreContainer(), this.players, this.gameNumber, gameDuration);
	}
}