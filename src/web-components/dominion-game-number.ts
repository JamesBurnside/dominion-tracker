import {DominionDeckHtmlElement} from "./dominion-deck";
import logger from "../logger/logger";
import {getGameNumberFromContentScript} from "../utils";

export class DominionGameNumber extends HTMLElement {
    constructor(gameNumber: string) {
        super();
        this.updateGameNumber = this.updateGameNumber.bind(this)
    }

    async updateGameNumber(gameNumberContainer: HTMLElement): Promise<void> {
        const gameNumber = await getGameNumberFromContentScript()
        this._gameNumber = gameNumber
        gameNumberContainer.textContent = `Game # ${this._gameNumber}`;
    }

    connectedCallback(): void {

        const gameNumberContainer = document.createElement("h5");
        gameNumberContainer.className = "game-number";
        gameNumberContainer.textContent = `Game # (loading)`;

        this.updateGameNumber(gameNumberContainer)

        this.appendChild(gameNumberContainer);
        this.appendChild(gameNumberContainer);
    }

    private _gameNumber : string;
}