import { DominionLog, DominionLogs, DominionPlayer, DominionPlayerFullName, DominionPlayerShortName } from "@types";
import logger from "logger";

export interface IGameManager {
	onPlayerShortNamesFound: (players: DominionPlayerShortName[]) => void;
	onPlayerFullNamesFound: (players: DominionPlayerFullName[]) => void;
	onLogsChanged: (logs: DominionLogs) => void;
}

export class GameManager implements IGameManager {

	public onLogsChanged = (logs: DominionLogs): void => {
		logger.log(logs);
		logs.forEach(log => this.computeLog(log));
	}

	public onPlayerFullNamesFound = (playerFullNames: DominionPlayerFullName[]): void => {
		playerFullNames.forEach((playerFullName) => this.addFullPlayerNamesToPlayers(playerFullName));
		logger.log(`Players: ${JSON.stringify(this.players)}`);
	}

	public onPlayerShortNamesFound = (playerShortNames: DominionPlayerFullName[]): void => {
		playerShortNames.forEach((playerShortName) => this.addShortPlayerNamesToPlayers(playerShortName));
		logger.log(`Players: ${JSON.stringify(this.players)}`);
		logger.log(this.players);
	}

	private computeLog(log: DominionLog): void {
		// logger.log(log);
	}

	private addFullPlayerNamesToPlayers(fullPlayerName: string): void {
		// Check if it already exists
		for (const player of this.players) {
			if (player.fullName === fullPlayerName) return;
		}

		// Check if shortname exists, if so add it to that player
		for (const player of this.players) {
			if (fullPlayerName.startsWith(player.shortName)) {
				player.fullName = fullPlayerName;
				return;
			}
		}

		// Else create a new player
		this.players.push({
			fullName: fullPlayerName,
			shortName: null,
			deck: undefined
		});
	}

	private addShortPlayerNamesToPlayers(shortPlayerName: string): void {
		// Check if it already exists
		for (const player of this.players) {
			if (player.shortName === shortPlayerName) return;
		}

		// Check if shortname exists, if so add it to that player
		for (const player of this.players) {
			if (player.fullName.startsWith(shortPlayerName)) {
				player.shortName = shortPlayerName;
				return;
			}
		}

		// Else create a new player
		this.players.push({
			fullName: null,
			shortName: shortPlayerName,
			deck: undefined
		})
	}

	private players: DominionPlayer[] = [];
}
