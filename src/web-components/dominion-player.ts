import { DominionPlayer } from '@types';
import logger from 'logger';
import { DominionDeckHtmlElement } from './dominion-deck';

export class DominionPlayerHtmlElement extends HTMLElement {
  constructor(player: DominionPlayer) {
    super();

    if (!player) logger.error('Invalid player!', false);

    this.id = player.shortName;
    this._player = player;
  }

  connectedCallback(): void {
    const fullNameContainer = document.createElement('div');
    fullNameContainer.className = 'player-name';
    fullNameContainer.textContent = this._player.fullName;
    this.appendChild(fullNameContainer);

    //if score/turn data exists, add it!
    if (this._player.score) {
      const scoreContainer = document.createElement('div');
      scoreContainer.className = 'player-stats player-score';
      scoreContainer.textContent = `score: ${this._player.score.toString()}`;
      this.appendChild(scoreContainer);

      const turnContainer = document.createElement('div');
      turnContainer.className = 'player-stats player-turns';
      turnContainer.textContent = `turns: ${this._player.turns.toString()}`;
      this.appendChild(turnContainer);
    }

    const deckContainer = new DominionDeckHtmlElement(this._player.deck);
    this.appendChild(deckContainer);
  }

  private _player: DominionPlayer;
}
