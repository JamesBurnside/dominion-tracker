import {CardStack} from "./subject";

export interface PlayerResults {
    playerName: string,
    score: number,
    turns: number,
    cardStack: CardStack
}

export type GameResults = PlayerResults[];