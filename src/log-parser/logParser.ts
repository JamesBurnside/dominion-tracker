import { DominionLogs } from "@types";
import logger from "logger";
import { documentObserver, logContainerObserver, getLogContainer } from "observers";
import { getLogsFromContainer } from "./logHelpers";
import { v4 as uuidv4 } from "uuid";

export default class LogParser {
	constructor(onLogsChanged?: (logs: DominionLogs) => void) {
		console.log("lor parser ctor");
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

	/** Reparse all logs from the log container. */
	public forceRefreshLogs(): void {
		const logsUpdated = this.updateLogsFromContainer();

		if (logsUpdated && this.logsUpdatedCallback) {
			this.logsUpdatedCallback(this._logs);
		}
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
		console.log("sub to doc changes");
		documentObserver.subscribe(this.observerId, () => {
			if (getLogContainer()) {
				this.updateLogContainer();
				this.unsubscribeFromDocumentChanges();
			}
		});
	}

	private unsubscribeFromDocumentChanges(): void {
		console.log("unsub to doc changes");
		documentObserver.unsubscribe(this.observerId);
	}

	private subscribeToLogContainerChanges(): void {
		console.log("sub to log container changes");
		logContainerObserver.subscribe(this.observerId, this.forceRefreshLogs);
	}

	private unSubscribeToLogContainerChanges(): void {
		logContainerObserver.unsubscribe(this.observerId);
	}

	private logContainer: HTMLElement = null;
	private logsUpdatedCallback: (allLogs: DominionLogs) => void = null;
	private _logs: DominionLogs = [];
	private observerId = uuidv4();
}
