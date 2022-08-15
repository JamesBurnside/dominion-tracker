export type DominionCard = string;

/**
 * Dominion deck is a mapping of cards to an amount of that card.
 * e.g. {
 * 	"Copper": 7,
 *  "Silver": 2
 * }
 */
export type DominionDeck = Map<DominionCard, number>;
