import logger from "logger";
import { HTMLObserver } from "./HTMLObserver";

const LOG_CONTAINER_CLASS_NAME = "log-container";

export const getLogContainer = (): HTMLElement => document.getElementsByClassName(LOG_CONTAINER_CLASS_NAME)[0] as HTMLElement;

/**
 * Self managing log container observer class.
 */
class LogContainerObserver extends HTMLObserver {
	constructor() {
		const logContainer = getLogContainer();

		if (!logContainer) {
			logger.error("No log container found", true);
		}

		super(logContainer);
	}
}

// Export singleton for ease of use
export const logContainerObserver = new LogContainerObserver();