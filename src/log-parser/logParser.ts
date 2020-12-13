import { DominionLogs } from "@types";
import logger from "logger";
import { getLogContainer, getLogsFromContainer } from "./logHelpers";

export default class LogParser {
	constructor(onLogsChanged?: (logs: DominionLogs) => void) {
		logger.log("LogParser ctor");

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
		this.updateLogsFromContainer();

		// TODO: callback should ideally only be called if the logs actually have changed.
		// Currently it will always be called even if there are no new logs.
		if (this.logsUpdatedCallback) {
			this.logsUpdatedCallback(this._logs);
		}
	}

	private updateLogsFromContainer(): void {
		if (!this.logContainer) logger.error("Log Container is null!", true);
		this._logs = getLogsFromContainer(this.logContainer);
	}

	private updateLogContainer(): void {
		logger.log("Updating log container");
		if (this.logContainer && this.logObserver) {
			this.unSubscribeToLogContainerChanges();
		}

		this.logContainer = getLogContainer();
		this.updateLogsFromContainer();
		this.subscribeToLogContainerChanges();
	}

	private logUpdated(/*mutationsList: MutationRecord[], observer: MutationObserver*/): void {
		logger.log("New log callback");
		this.forceRefreshLogs();
	}

	private documentObserverCallback(): void {
		logger.log("Document changed callback");
		if (getLogContainer()) {
			this.updateLogContainer();
			this.unsubscribeFromDocumentChanges();
		}
	}

	private listenForLogContainerCreation(): void {
		logger.log("Listening for document changes");
		this.documentObserver = new MutationObserver(this.documentObserverCallback);
		this.documentObserver.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: false,
			characterData: false
		});
	}

	private unsubscribeFromDocumentChanges(): void {
		logger.log("Unsubscribing from document changes");
		this.documentObserver.disconnect();
		this.documentObserver = null;
	}

	private subscribeToLogContainerChanges(): void {
		if (!this.logContainer) logger.error("Log Container is null!", true);
		if (this.logObserver) logger.error("Log Observer has already been set!", true);

		logger.log("Listening for log container changes");
		this.logObserver = new MutationObserver(this.logUpdated);
		this.logObserver.observe(this.logContainer);
	}

	private unSubscribeToLogContainerChanges(): void {
		logger.log("Unsubscribing from log container changes");
		this.logObserver.disconnect();
		this.logObserver = null;
	}

	// used to wait for the log-container to be created
	private documentObserver: MutationObserver = null;

	// used to track when log-container contains new logs
	private logObserver: MutationObserver = null;

	private logContainer: HTMLElement = null;
	private logsUpdatedCallback: (allLogs: DominionLogs) => void = null;
	private _logs: DominionLogs = [];
}
