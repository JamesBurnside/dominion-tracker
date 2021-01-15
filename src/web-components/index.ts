import { DominionPlayersHtmlElement } from "./player-container";
import { DominionPlayerHtmlElement } from "./dominion-player";
import { DominionDeckHtmlElement } from "./dominion-deck";
import { DownloadButtonHtmlElement } from "./download-button";
import { DominionGameNumberHtmlElement } from "./dominion-game-number";
import {UploadButtonHtmlElement} from "./upload-button";

window.customElements.define("dominion-deck", DominionDeckHtmlElement);
window.customElements.define("dominion-player", DominionPlayerHtmlElement);
window.customElements.define("player-container", DominionPlayersHtmlElement);
window.customElements.define("download-button", DownloadButtonHtmlElement);
window.customElements.define("game-number", DominionGameNumberHtmlElement);
window.customElements.define("upload-button", UploadButtonHtmlElement);