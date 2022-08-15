import { messageContentScript } from '../utils';

export class DominionGameNumberHtmlElement extends HTMLElement {
  constructor() {
    super();
    this.updateGameNumber = this.updateGameNumber.bind(this);
  }

  async updateGameNumber(gameNumberContainer: HTMLElement): Promise<void> {
    const gameNumber = await messageContentScript('getGameNumber');
    this._gameNumber = gameNumber;
    gameNumberContainer.textContent = `Game # ${this._gameNumber}`;
  }

  connectedCallback(): void {
    const gameNumberContainer = document.createElement('h5');
    gameNumberContainer.className = 'game-number';
    gameNumberContainer.textContent = `Game # (loading)`;

    this.updateGameNumber(gameNumberContainer);

    this.appendChild(gameNumberContainer);
  }

  private _gameNumber: string;
}
