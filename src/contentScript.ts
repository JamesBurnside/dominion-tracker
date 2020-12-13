import { DominionLogs } from "@types";
import LogParser from "log-parser";
import logger from "logger";

function onLogsChanged(logs: DominionLogs) {
	logger.log(logs);
}

new LogParser(onLogsChanged);