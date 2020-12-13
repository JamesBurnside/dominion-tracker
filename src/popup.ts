import { DominionLogs } from "@types";
import LogParser from "log-parser";
import logger from "logger";

function onLogsChanged(logs: DominionLogs) {
	logger.log(logs);
}

logger.log("creating log parser");
const logParser = new LogParser(onLogsChanged);
logger.log("log parser created");
logger.log(logParser.logs);