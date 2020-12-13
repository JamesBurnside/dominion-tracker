import { DominionAction, DominionLog, DominionLogs } from "@types";
import { extractActionFromLogLine } from "utils/actionHelper";
import { extractSubjectFromLogLine } from "utils/subjectHelper";

/**
 * TODO: Check if this is the correct ID name from dominion.
 */
export const getLogContainer = (): HTMLElement => document.getElementById("log-container");

export const getLogsFromContainer = (logContainer: HTMLElement): DominionLogs =>
	convertLogStringsToLogs(getLogsAsStringsFromContainer(logContainer));

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
 * TODO: Currently this fn just uses logContainer.innerHTML which won't work on the
 * real dominion.games html element. Text logs need extracted from the log container
 * html element. I envision the logs being extracted into one huge string with each
 * log line seperated by a newline but implementation can change depending on what
 * ends up being easiest.
 */
export const getLogsAsStringsFromContainer = (logContainer: HTMLElement): string[] => {
	const logs = logContainer.innerHTML;
	return logs.split(/\r?\n/).filter((logline) => isValidLogString(logline));
}

export const convertLogStringsToLogs = (logsAsStrings: string[]): DominionLogs =>
	logsAsStrings.map((logAsString) => convertLogStringToLog(logAsString));

/**
 * Converts a log that is a string to a usable DominionLog.
 */
export const convertLogStringToLog = (logAsString: string): DominionLog => {
	// Extract player - Be trivial about this for now and assume
	// players dont have spaces in their name.
	const playerName = logAsString.split(" ")[0];

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