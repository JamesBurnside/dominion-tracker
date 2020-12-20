import { DominionAction, DominionLog, DominionLogs, DominionSubject } from "@types";
import { extractActionFromLogLine } from "utils/actionHelper";
import { extractSubjectsFromLogLine } from "utils/subjectHelper";

export const getLogContainer = (): HTMLElement => document.getElementById("log-container");

export const getLogsFromContainer = (logContainer: HTMLElement): DominionLogs =>
	convertLogStringsToLogs(getLogsAsStringsFromContainer(logContainer));

export const isValidLogString = (logString: string): boolean => {
	// Quickly check that the log string contains a valid action
	const validActions = Object.values(DominionAction);
	return logString && validActions.some(action => logString.includes(action));

	// Check if there was an unknown action and log an error
	// !(logString.startsWith("Game ") && logString.endsWith("rated.")) &&
	// !(logString.startsWith("Kingdom generated with")) &&
	// !(logString.match((new VerEx()).startOfLine().digit().oneOrMore().then("%").then(":"))) &&
	// !(logString.match((new VerEx()).startOfLine().then("Turn ").digit().then(" - ")));
}

export const getLogsAsStringsFromContainer = (logContainer: HTMLElement): string[] => {
	const logs = logContainer.innerHTML;
	return logs.split(/\r?\n/).filter((logline) => isValidLogString(logline));
}

export const convertLogStringsToLogs = (logsAsStrings: string[]): DominionLogs =>
	logsAsStrings.map((logAsString) => convertLogStringToLog(logAsString));

export const convertLogStringToLog = (logAsString: string): DominionLog => {
	// Extract player - Be trivial about this for now and assume
	// players dont have spaces in their name.
	const playerName = logAsString.split(" ")[0];

	// Extract action
	const primaryAction = extractActionFromLogLine(logAsString);

	// Extract subject
<<<<<<< Updated upstream
	const primarySubject = extractSubjectFromLogLine(logAsString);
=======
	const subject = extractSubjectsFromLogLine(logWithoutPlayerName);
>>>>>>> Stashed changes

	return {
		playerName,
		primaryAction,
		primarySubject
	}
}