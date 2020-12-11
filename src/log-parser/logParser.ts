import { DominionLogs } from "@types";
import { logError } from "utils";
import { getLogContainer, getLogsFromContainer } from "./logHelpers";

export default class LogParser {
	constructor(onLogsChanged?: (logs: DominionLogs) => void) {
		this.logsUpdatedCallback = onLogsChanged;
		this.updateLogContainer();
	}

	// Public getter for the logs
	public get logs() : DominionLogs
	{
		return this._logs;
	}

	public forceRefreshLogs(): void {
		this.updateLogsFromContainer();

		if (this.logsUpdatedCallback) {
			this.logsUpdatedCallback(this._logs);
		}
	}

	private updateLogsFromContainer(): void {
		if (!this.logContainer) logError("Log Container is null!", true);
		this._logs = getLogsFromContainer(this.logContainer);
	}

	private updateLogContainer(): void {
		if (this.logContainer && this.logObserver) {
			this.unSubscribeToLogContainerChanges();
		}

		this.logContainer = getLogContainer();
		this.updateLogsFromContainer();
		this.subscribeToLogContainerChanges();
	}

	private logUpdated(/*mutationsList: MutationRecord[], observer: MutationObserver*/): void {
		this.forceRefreshLogs();
	}

	private subscribeToLogContainerChanges(): void {
		if (!this.logContainer) logError("Log Container is null!", true);
		if (this.logObserver) logError("Log Observer has already been set!", true);

		this.logObserver = new MutationObserver(this.logUpdated);
		this.logObserver.observe(this.logContainer);
	}

	private unSubscribeToLogContainerChanges(): void {
		this.logObserver.disconnect();
		this.logObserver = null;
	}

	private logObserver: MutationObserver = null;
	private logContainer: HTMLElement = null;
	private logsUpdatedCallback: (allLogs: DominionLogs) => void = null;
	private _logs: DominionLogs = [];
}
