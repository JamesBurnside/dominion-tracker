/**
 * All known dominion actions.
 * Order matters (should be ordered from longest to shortest if a string contains a substring of other actions)
 * TODO: this list will grow as more actions are supported.
 */
export enum DominionAction {
	Buys_And_Gains = "buys and gains",
	Gains = "gains",
	Trashes = "trashes",
	Starts_With = "starts with",
}

/**
 * Known actions that are not currently supported.
 * TODO: this is not an exhaustive list and this list
 * will grow as more actions are discovered.
 */
export enum UnsupportedAction {
	Plays = "plays",
	Buys = "buys",
	Shuffles = "shuffles",
	Draws = "draws",
	TopDecks = "topdecks",
	Gets = "gets",
	Discards = "discards",
	Looks_At = "looks at",
	Sets = "sets"
}

export const KnownActions = [...Object.values(DominionAction), ...Object.values(UnsupportedAction)];
