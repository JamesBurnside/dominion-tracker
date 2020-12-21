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
			player.deck = new Map();
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
		case DominionAction.Starts_With:
			// TODO: add in multiple cards
			this.addCardStackToPlayer(log.subject.card, log.subject.amount, log.playerName);
			break;
		case DominionAction.Trashes:
			this.removeCardStackFromPlayer(log.subject.card, log.subject.amount, log.playerName);
			break;
		default:
			logger.log(`Game manager cannot compute log, action not known: ${log.action}`);
		}
	}

	private addCardStackToPlayer = (card: DominionCard, amount: number, shortName: DominionPlayerShortName): void => {
		// TODO: pull into helper function and write tests for it
		const player = this.players.find((player) => player.shortName === shortName);
		const newAmount = (player.deck.get(card) ?? 0) + amount;
		player.deck.set(card, newAmount);
	}

	private removeCardStackFromPlayer = (card: DominionCard, amount: number, shortName: DominionPlayerShortName): void => {
		// TODO: pull into helper function and write tests for it
		const player = this.players.find((player) => player.shortName === shortName)
		const newAmount = (player.deck.get(card) ?? 0) - amount;
		if (newAmount <= 0) player.deck.delete(card);
		else player.deck.set(card, newAmount);
	}

	private addFullPlayerNamesToPlayers(fullPlayerName: string): void {
		// TODO: pull into helper function and write tests for it
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
			deck: new Map()
		});
	}

	private addShortPlayerNamesToPlayers(shortPlayerName: string): void {
		// TODO: pull into helper function and write tests for it
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
			deck: new Map()
		})
	}

	private players: DominionPlayer[] = [];
}
