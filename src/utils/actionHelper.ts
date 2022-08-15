import { DominionAction } from '@types';

/**
 * Extract action from log line.
 * Be trivial about this for now and just search for known actions
 * Assumes that each line contains only one action type
 */
export function extractActionFromLogLine(logLine: string): DominionAction {
  const supportedActions = Object.values(DominionAction);
  for (const action of supportedActions) {
    if (logLine.includes(action)) return action;
  }
  return undefined;
}
