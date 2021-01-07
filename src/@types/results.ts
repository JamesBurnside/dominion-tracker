import {DominionDeck} from "./deck";

export interface PlayerResults {
    playerName: string,
    score: number,
    turns: number,
    deck: DominionDeck
}

export type GameResults = PlayerResults[];