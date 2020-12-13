import { DominionLogs } from "@types";
import LogParser from "log-parser";
import logger from "logger";

console.log("contentScript.ts");

function onLogsChanged(logs: DominionLogs) {
	logger.log("onLogsChanged event received");
	logger.log(logs);
}

const logParser = new LogParser(onLogsChanged);
logger.log(logParser);