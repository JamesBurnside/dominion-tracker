export enum DominionSubjectType {
	Unsupported = 0,
	Card,
	Deck,
	Discard,
	Hand
}

/**
 * TODO: Update to support multiple cards with multiple amounts
 * e.g. L gains "2 coppers, one silver and a turtle".
 * would be:
 * 	type: DominionSubjectType.Card
 * 	cards: [{copper, 2}, {silver, 1}, {turtle 1}]
 */
export interface DominionSubject {
	type: DominionSubjectType
	card?: string;
	amount?: number;
}

export type CardStack = DominionSubject [];