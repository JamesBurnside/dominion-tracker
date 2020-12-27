import { DominionPlayersHtmlElement } from "./player-container";
import { DominionPlayerHtmlElement } from "./dominion-player";
import { DominionDeckHtmlElement } from "./dominion-deck";

window.customElements.define("dominion-deck", DominionDeckHtmlElement);
window.customElements.define("dominion-player", DominionPlayerHtmlElement);
window.customElements.define("player-container", DominionPlayersHtmlElement);
