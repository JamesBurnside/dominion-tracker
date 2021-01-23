import { DominionLogs, DominionPlayerShortName } from "@types";
import logger from "logger";
import { documentObserver, logContainerObserver, getLogContainer } from "observers";
import { getLogsFromContainer, getPlayerShortNamesFromContainer } from "./logHelpers";

export default class LogParser {
	constructor(onLogsChanged?: (logs: DominionLogs) => void, onPlayerShortNamesFound?: (shortNames: DominionPlayerShortName[]) => void) {
		this.newLogsCallback = onLogsChanged;
		this.playerShortNamesFoundCallback = onPlayerShortNamesFound;

		if (!getLogContainer()) {
			// log container does not exist yet, watch DOM and wait for it to exist
			this.listenForLogContainerCreation();
		} else {
			// log container exists already, use straight away
			this.updateLogContainer();
		}
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

		if (this._shortPlayerNames) {
			this.playerShortNamesFoundCallback(this._shortPlayerNames);
			this.newLogsCallback(this._logs);
		}
	}

	private listenForLogContainerCreation(): void {
		documentObserver.subscribe(this.observerId, () => {
			if (getLogContainer()) {
				this.updateLogContainer();
				this.unsubscribeFromDocumentChanges();
			}
		});
	}

	private unsubscribeFromDocumentChanges(): void {
		documentObserver.unsubscribe(this.observerId);
	}

	private subscribeToLogContainerChanges(): void {
		logContainerObserver.subscribe(this.observerId, () => {
			if (this.updatePlayerShortNamesFromContainer() && this.playerShortNamesFoundCallback) {
				this.playerShortNamesFoundCallback(this._shortPlayerNames);
			}

			if (this.updateLogsFromContainer() && this.newLogsCallback) {
				this.newLogsCallback(this._logs);
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

	// This id could technically conflict with a second instance of a log parser but
	// meh there's only one currently and it still would be highly unlikely.
	private observerId = `log-parser ${Math.random()}`
}
