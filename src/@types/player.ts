import { DominionDeck } from "./deck";

/**
 * TODO: Update name to shortName, and fullName
 */
export default interface DominionPlayer {
	name: string;
	deck: DominionDeck;
}
