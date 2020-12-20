import {DominionAction, DominionCommand, DominionLog, DominionLogs, KnownActions} from "@types";
import logger from "logger";
import { extractActionFromLogLine } from "utils/actionHelper";
import { extractSubjectsFromLogLine } from "utils/subjectHelper";

const LOG_CONTAINER_CLASS_NAME = "log-container";
const LOG_LINE_CLASS_NAME = "log-line";

/**
 * TODO: Check if this is the correct ID name from dominion.
 */
export const getLogContainer = (): HTMLElement => document.getElementsByClassName(LOG_CONTAINER_CLASS_NAME)[0] as HTMLElement;

/**
 * Extract an array of DominionLogs from the HTML log container element.
 */
export const getLogsFromContainer = (logContainer: HTMLElement): DominionLogs => Array
	// extract log html elements as array of HTMLElements
	.from(logContainer.getElementsByClassName(LOG_LINE_CLASS_NAME))
	// convert html elements to string
	.map(log => convertLogAsHTMLElementToString(log as HTMLElement))
	// filter logs to remove only the logs we care about
	.filter((log) => isValidLogString(log))
	// convert the log strings to a usable DominionLog type
	.map(log => convertLogStringToLog(log));

/**
 * Get the log text out of the html element.
 * TODO: For now just use .innerText. This likely won't cover all scenarios and may need updated.
 */
export const convertLogAsHTMLElementToString = (logElement: HTMLElement): string => logElement.innerText;


/**
 * Check if the log line contains any known action - supported or unsupported.
 * Also ignore some known log lines such as "Turn 1 - Player1"
 * TODO: these extra lines really should be filtered out before this function is called.
 */
export const hasKnownAction = (logString: string): boolean =>
	logString &&
		(
			logString.includes("Turn ") ||
			logString.startsWith("Game ") ||
			logString.startsWith("Kingdom generated with ") ||
			logString.includes("Between Turns")||
			KnownActions.some(action => logString.includes(action))
		);

/**
 * Currently a valid log is simply a logline that contains a known action.
 * This may need changed as more edge cases are discovered.
 */
export const isValidLogString = (logString: string): boolean => {
	// Quickly check that the log string contains a valid action
	const supportedActions = Object.values(DominionAction);

	if (!hasKnownAction(logString)) {
		logger.error(`Log contains no know action: ${logString}`);
	}

	return logString && supportedActions.some(action => logString.includes(action));
}

/**
 * Converts a log that is a string to a usable DominionLog.
 */
export const convertLogStringToLog = (logAsString: string): DominionCommand => {
	// Extract player - Be trivial about this for now and assume
	// players dont have spaces in their name.
	const playerName = logAsString.split(/\s/gm)[0];

	//slice player name from log string
	const logWithoutPlayerName = logAsString.slice(playerName.length).trim()

	// Extract action
	const action = extractActionFromLogLine(logWithoutPlayerName);

	// Extract subject
	const subject = extractSubjectsFromLogLine(logWithoutPlayerName);

	return {
		playerName,
		action,
		subject
	}
}