/**
 * All known dominion actions.
 */
export enum DominionAction {
	Unknown = 0,
	Buy = "buy",
	Gain = "gain",
	Buy_And_Gain = "buy_and_gain",
	// todo, more of these..
}

/**
 * Known actions that have implementations.
 * This enum should grow as more actions are implemented.
 */
export enum SupportedAction {
	Unknown = DominionAction.Unknown
}
