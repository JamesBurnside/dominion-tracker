import { DominionAction } from "@types";

/** 
 * Extract action from log line.
 * Be trivial about this for now and just search for known actions
 */
export function extractActionFromLogLine(logLine: string): DominionAction {
	return logLine.includes(DominionAction.Buys_And_Gains) ? DominionAction.Buys_And_Gains : 
		logLine.includes(DominionAction.Gains) ? DominionAction.Gains :
			undefined;
}
