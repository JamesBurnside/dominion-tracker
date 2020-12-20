import { DominionAction, DominionCard, DominionLog, DominionLogs, DominionPlayer, DominionPlayerFullName, DominionPlayerShortName } from "@types";
import logger from "logger";

export interface IGameManager {
	onPlayerShortNamesFound: (players: DominionPlayerShortName[]) => void;
	onPlayerFullNamesFound: (players: DominionPlayerFullName[]) => void;
	onLogsChanged: (logs: DominionLogs) => void;
}

export class GameManager implements IGameManager {

	public onLogsChanged = (logs: DominionLogs): void => {
		logger.log("logs");
		logger.log(logs);

		// TODO: For now just wipe the players decks and recompute everything
		// We should really only return new logs and then update players' decks
		this.players.forEach(player => {
			player.deck = []
		});

		logs.forEach(log => this.computeLog(log));

		logger.log("players");
		logger.log(this.players);

	}

	public onPlayerFullNamesFound = (playerFullNames: DominionPlayerFullName[]): void => {
		playerFullNames.forEach((playerFullName) => this.addFullPlayerNamesToPlayers(playerFullName));
		logger.log("players");
		logger.log(this.players);
	}

	public onPlayerShortNamesFound = (playerShortNames: DominionPlayerFullName[]): void => {
		playerShortNames.forEach((playerShortName) => this.addShortPlayerNamesToPlayers(playerShortName));
		logger.log("players");
		logger.log(this.players);
	}

	private computeLog = (log: DominionLog): void => {
		// TODO: pull into helper function and write tests for it
		switch (log.action) {
		case DominionAction.Buys_And_Gains:
		case DominionAction.Gains:
			// TODO: add in multiple cards
			this.addCardToPlayer(log.subject.card, log.playerName);
		}
	}

	private addCardToPlayer = (card: DominionCard, shortName: DominionPlayerShortName): void => {
		// TODO: don't just add the card to the array, need to add to update the amount of that card owned.
		this.players.find((player) => player.shortName === shortName).deck.push(card);
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
			deck: []
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
