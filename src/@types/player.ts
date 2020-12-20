import { DominionDeck } from "./deck";

export type DominionPlayerFullName = string;
export type DominionPlayerShortName = string;

/**
 * TODO: Update name to shortName, and fullName
 */
export interface DominionPlayer {
	fullName: DominionPlayerFullName;
	shortName: DominionPlayerShortName;
	deck: DominionDeck;
}
