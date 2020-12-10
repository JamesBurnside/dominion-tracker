export enum DominionSubjectType {
	Unsupported = 0,
	Card,
	Deck,
	Discard,
}

export interface DominionSubject {
	type: DominionSubjectType
	card?: string;
	amount?: number;
} 