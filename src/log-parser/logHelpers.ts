import {DominionAction, DominionCommand, DominionLogs, DominionPlayerShortName, KnownActions} from "@types";
import logger from "logger";
import { extractActionFromLogLine } from "utils/actionHelper";
import { extractSubjectsFromLogLine } from "utils/subjectHelper";
import {getLogContainer} from "../observers";

const LOG_LINE_CLASS_NAME = "log-line";

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
	const cardStack = extractSubjectsFromLogLine(logWithoutPlayerName);

	return {
		playerName,
		action,
		cardStack
	}
}

export const getPlayerShortNamesFromContainer = (logContainer: HTMLElement): DominionPlayerShortName[] => {
	const playersNames = Array
		// extract log html elements as array of HTMLElements
		.from(logContainer.getElementsByClassName(LOG_LINE_CLASS_NAME))
		// convert html elements to string
		.map(log => convertLogAsHTMLElementToString(log as HTMLElement))
		// filter logs to remove only the logs we care about. For simplicity use the "starts with" log lines
		.filter(log => log.includes("starts with"))
		// extract player names
		.map(log => log.trim().split(/\s/gm)[0]);

	// Quickly throw into a set to remove duplicates and convert back to array cause I am writing this fast
	return Array.from(new Set(playersNames));
}

/**
 * Extract Game number from the HTML log container element.
 */
export const getGameNumberFromContainer = (): string => {
	const logString: string = convertLogAsHTMLElementToString(getLogContainer())
	let logStringArray = logString.split("Game #")
	if(logStringArray.length > 1){
		logStringArray = logStringArray[1].split(",")
	}
	return logStringArray[0]
}

// Hackily just store previous logs for new game checking in global space cause that can be future James's problem.
let previousLogs: DominionLogs = [];

/**
 * Trivially assume its a new game if the only logs are "Starts With" logs.
 */
export const isNewGame = (logs: DominionLogs): boolean => {
	if (JSON.stringify(logs) === JSON.stringify(previousLogs)) {
		// Logs didn't change so return early.
		// This is a quick, hacky fix to prevent a constant cycle that a new game is triggered, so
		// the log parser is reset, which triggers a new game, which resets the log parser etc. etc.
		return false;
	}

	previousLogs = logs;

	return (logs.filter(log => log.action !== DominionAction.Starts_With)).length > 0;
}
