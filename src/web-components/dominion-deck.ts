import { DominionDeck } from "@types";

export class DominionDeckHtmlElement extends HTMLElement {
	constructor(deck: DominionDeck) {
		super();
		this._deck = deck;
	}

	connectedCallback(): void {
		if (!this._deck) {
			this.className += "no-deck";
			this.textContent = "no deck :(";
		} else {
			let total = 0;
			for (const [card, amount] of this._deck.entries()) {
				const cardAmountElement = document.createElement("div");
				cardAmountElement.className = "card-amount";
				cardAmountElement.textContent = `${card}: ${amount}`;
				this.appendChild(cardAmountElement);

				total += amount;
			}

			const totalElement = document.createElement("div");
			totalElement.className = "card-amount total-amount";
			totalElement.textContent = `Total: ${total}`;
			this.appendChild(totalElement);
		}
	}

	private _deck: DominionDeck;
}