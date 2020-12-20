import { DominionLogs } from "@types";
import logger from "logger";
import { documentObserver, logContainerObserver, getLogContainer } from "observers";
import { getLogsFromContainer } from "./logHelpers";

export default class LogParser {
	constructor(onLogsChanged?: (logs: DominionLogs) => void) {
		this.logsUpdatedCallback = onLogsChanged;

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

	/**
	 * Update the _logs value with the most updated logs from the logContainer
	 * @returns boolean: true if the logs were actually updated.
	 */
	private updateLogsFromContainer(): boolean {
		if (!this.logContainer) logger.error("Log Container is null!", true);
		const newLogs = getLogsFromContainer(this.logContainer);

		// TODO: for now just trivially check if the log lengths match, we should
		// really be checking each log to see if anything has changed.
		const wasThereAnyNewLogs = newLogs.length !== this.logs.length;

		this._logs = newLogs;
		return wasThereAnyNewLogs;
	}

	private updateLogContainer(): void {
		if (this.logContainer) {
			this.unSubscribeToLogContainerChanges();
		}

		this.logContainer = getLogContainer();
		this.updateLogsFromContainer();
		this.subscribeToLogContainerChanges();
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
			const logsUpdated = this.updateLogsFromContainer();

			if (logsUpdated && this.logsUpdatedCallback) {
				this.logsUpdatedCallback(this._logs);
			}
		});
	}

	private unSubscribeToLogContainerChanges(): void {
		logContainerObserver.unsubscribe(this.observerId);
	}

	private logContainer: HTMLElement = null;
	private logsUpdatedCallback: (allLogs: DominionLogs) => void = null;
	private _logs: DominionLogs = [];

	// This id could technically conflict with a second instance of a log parser but
	// meh there's only one currently and it still would be highly unlikely.
	private observerId = `log-parser ${Math.random()}`
}
