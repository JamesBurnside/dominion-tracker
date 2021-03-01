import fs from "fs";
import { resolve } from "path";

/** Get a log file as a string for testing. */
const getLogFileAsString = (path: string): string => {
	return fs.readFileSync(resolve(__dirname, path), "utf8");
};

export const log1 = getLogFileAsString("./textLog1.txt");
export const log2 = getLogFileAsString("./textLog2.txt");
export const log3 = getLogFileAsString("./textLog3.txt");
export const log4 = getLogFileAsString("./textLog4.txt");
export const log5 = getLogFileAsString("./textLog5.txt");
export const logReceivesReturns = getLogFileAsString("./textLogReceivesReturns.txt");

export const htmlLog1 = getLogFileAsString("./htmlLog1.html");
