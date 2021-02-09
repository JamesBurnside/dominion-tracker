import { DominionLogs, DominionPlayerShortName } from "@types";
import logger from "logger";
import { documentObserver, logContainerObserver, getLogContainer } from "observers";
import { doNotThrow } from "utils";
import { getLogsFromContainer, getPlayerShortNamesFromContainer, isNewGame } from "./logHelpers";

export default class LogParser {
	constructor(
		onLogsChanged?: (logs: DominionLogs) => void,
		onPlayerShortNamesFound?: (shortNames: DominionPlayerShortName[]) => void,
		onNewGameFound?: () => void) {
		this.newLogsCallback = onLogsChanged;
		this.playerShortNamesFoundCallback = onPlayerShortNamesFound;
		this.newGameFoundCallback = onNewGameFound;
		this.listenForLogContainerCreateOrDestroy();
		this.initLogContainer();
	}

	private initLogContainer() {
		if (getLogContainer()) {
			this.updateLogContainer();
		}
	}

	/**
	 * This function should reset all private tracking variables and put the logger
	 * in the state of looking for a new log container.
	 * Do not reset callbacks.
	 */
	public reset(): void {
		doNotThrow(() => this.unSubscribeToLogContainerChanges());
		this.logContainer = null;
		this._logs = [];
		this._shortPlayerNames = [];
		this.observerId = `log-parser ${Math.random()}`;
		this.initLogContainer();
	}

	/** Public getter for the logs */
	public get logs() : DominionLogs
	{
		return this._logs;
	}

	private updatePlayerShortNamesFromContainer(): boolean {
		if (!this.logContainer) logger.error("Log Container is null!", true);
		const names = getPlayerShortNamesFromContainer(this.logContainer);

		const didNamesChange = JSON.stringify(names) !== JSON.stringify(this._shortPlayerNames);

		this._shortPlayerNames = names;

		return didNamesChange;
	}

	/**
	 * Update the _logs value with the most updated logs from the logContainer
	 * @returns boolean: true if the logs were actually updated.
	 */
	private updateLogsFromContainer(): boolean {
		if (!this.logContainer) logger.error("Log Container is null!", true);
		const newLogs = getLogsFromContainer(this.logContainer);

		const wasThereAnyNewLogs = JSON.stringify(newLogs) !== JSON.stringify(this.logs.length);

		this._logs = newLogs;
		return wasThereAnyNewLogs;
	}

	private updateLogContainer(): void {
		if (this.logContainer) {
			this.unSubscribeToLogContainerChanges();
		}

		this.logContainer = getLogContainer();
		this.updatePlayerShortNamesFromContainer();
		this.updateLogsFromContainer();
		this.subscribeToLogContainerChanges();

		if (this.newGameFoundCallback && isNewGame(this._logs)) {
			logger.log("new game found!");
			this.newGameFoundCallback();
		}

		if (this._shortPlayerNames) {
			this.playerShortNamesFoundCallback(this._shortPlayerNames);
			this.newLogsCallback(this._logs);
		}
	}

	private listenForLogContainerCreateOrDestroy(): void {
		documentObserver.subscribe(this.observerId, () => {
			if (getLogContainer()) {
				if (!this.logContainer) {
					this.updateLogContainer();
				}
			} else if (this.logContainer) {
				this.reset();
			}
		});
	}

	private unsubscribeFromDocumentChanges(): void {
		documentObserver.unsubscribe(this.observerId);
	}

	private subscribeToLogContainerChanges(): void {
		logContainerObserver.subscribe(this.observerId, () => {
			logger.log(`logContainerObserver called ${this.observerId}`);
			if (this.updatePlayerShortNamesFromContainer() && this.playerShortNamesFoundCallback) {
				this.playerShortNamesFoundCallback(this._shortPlayerNames);
			}

			if (this.updateLogsFromContainer()) {
				if (this.newGameFoundCallback && isNewGame(this._logs)) {
					logger.log("new game found!");
					this.newGameFoundCallback();
				}
				else if (this.newLogsCallback) {
					this.newLogsCallback(this._logs);
				}
			}
		});
	}

	private unSubscribeToLogContainerChanges(): void {
		logContainerObserver.unsubscribe(this.observerId);
	}

	private logContainer: HTMLElement = null;
	private _logs: DominionLogs = [];
	private _shortPlayerNames: DominionPlayerShortName[] = [];

	private newLogsCallback: (allLogs: DominionLogs) => void = null;
	private playerShortNamesFoundCallback: (players: DominionPlayerShortName[]) => void = null;
	private newGameFoundCallback: () => void = null;

	// This id could technically conflict with a second instance of a log parser but
	// meh there's only one currently and it still would be highly unlikely.
	private observerId = `log-parser ${Math.random()}`;
}
