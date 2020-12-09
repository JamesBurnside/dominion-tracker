import { DominionLog, DominionLogs } from "@types";

export const getLogContainer = (): HTMLElement => document.getElementById("log-container");

export const getLogsFromContainer = (logContainer: HTMLElement): DominionLogs =>
	convertLogStringsToLogs(getLogsAsStringsFromContainer(logContainer));

export const getLogsAsStringsFromContainer = (logContainer: HTMLElement): string[] => {
	return [];
}

export const convertLogStringsToLogs = (logsAsStrings: string[]): DominionLogs =>
	logsAsStrings.map((logAsString) => convertLogStringToLog(logAsString));

export const convertLogStringToLog = (logAsString: string): DominionLog => {
	return null;
}