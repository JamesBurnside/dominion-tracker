import { DominionDeck } from "./deck";

export default interface DominionPlayer {
	name: string;
	deck: DominionDeck;
}
