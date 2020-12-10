/**
 * All known dominion actions.
 */
export enum DominionAction {
	Gains = "gains",
	Buys_And_Gains = "buys and gains",
}

/**
 * Known actions that are not currently supported.
 */
export enum UnsupportedAction {
	Plays = "plays",
	Buys = "buys",
	Starts_With = "starts with",
	Shuffles = "shuffles",
	Draws = "draws",
	TopDecks = "topdecks"
}
