import { DominionAction, DominionLog, DominionLogs } from "@types";
import { extractActionFromLogLine } from "utils/actionHelper";
import { extractSubjectFromLogLine } from "utils/subjectHelper";

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
 * Currently a valid log is simply a logline that contains a known action.
 * This may need changed as more edge cases are discovered.
 */
export const isValidLogString = (logString: string): boolean => {
	// Quickly check that the log string contains a valid action
	const validActions = Object.values(DominionAction);
	return logString && validActions.some(action => logString.includes(action));

	// TODO: Check if there was an unknown action and log an error.
	// !(logString.startsWith("Game ") && logString.endsWith("rated.")) &&
	// !(logString.startsWith("Kingdom generated with")) &&
	// !(logString.match((new VerEx()).startOfLine().digit().oneOrMore().then("%").then(":"))) &&
	// !(logString.match((new VerEx()).startOfLine().then("Turn ").digit().then(" - ")));
}

/**
 * Converts a log that is a string to a usable DominionLog.
 */
export const convertLogStringToLog = (logAsString: string): DominionLog => {
	// Extract player - Be trivial about this for now and assume
	// players dont have spaces in their name.
	const playerName = logAsString.split(/\s/gm)[0];

	// Extract action
	const action = extractActionFromLogLine(logAsString);

	// Extract subject
	const subject = extractSubjectFromLogLine(logAsString);

	return {
		playerName,
		action,
		subject
	}
}