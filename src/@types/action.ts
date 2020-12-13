/**
 * All known dominion actions.
 * TODO: this list will grow as more actions are supported.
 */
export enum DominionAction {
	Gains = "gains",
	Buys_And_Gains = "buys and gains",
}

/**
 * Known actions that are not currently supported.
 * TODO: this is not an exhaustive list and this list
 * will grow as more actions are discovered.
 */
export enum UnsupportedAction {
	Plays = "plays",
	Buys = "buys",
	Starts_With = "starts with",
	Shuffles = "shuffles",
	Draws = "draws",
	TopDecks = "topdecks"
}
