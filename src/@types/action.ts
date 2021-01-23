/**
 * All known dominion actions.
 * Order matters (should be ordered from longest to shortest if a string contains a substring of other actions)
 * TODO: this list will grow as more actions are supported.
 * 	Log contains no know action: C returns a Page.
 * 	Log contains no know action: C receives a Treasure Hunter.
 */
export enum DominionAction {
	Buys_And_Gains = "buys and gains",
	Gains = "gains",
	Trashes = "trashes",
	Starts_With = "starts with",
	Error_Test ="error"
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
	Sets = "sets",
	Blocks = "blocks",
	Starts = "starts", // e.g. C starts their turn
	Puts = "puts",
	Takes = "takes",
	Moves = "moves", // e.g. C moves their deck to their discard pile
	Uses = "uses", // e.g. C uses 1 Coffers. (+$1)
	Ends = "ends", // e.g. C ends their buy phase
	Loses = "loses", // e.g. C loses 1 Coin.
	Reveals = "reveals",
	Chooses = "chooses" // e.g. Obelisk chooses the Bridge pile.
}

export const KnownActions = [...Object.values(DominionAction), ...Object.values(UnsupportedAction)];
