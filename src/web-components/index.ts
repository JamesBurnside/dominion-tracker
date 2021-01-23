import { DominionPlayersHtmlElement } from "./player-container";
import { DominionPlayerHtmlElement } from "./dominion-player";
import { DominionDeckHtmlElement } from "./dominion-deck";
import { CustomButtonHtmlElement } from "./custom-button";
import { ResetButtonHtmlElement } from "./reset-button";
import { DownloadButtonHtmlElement } from "./download-button";
import { UploadButtonHtmlElement } from "./upload-button";
import { DominionGameNumberHtmlElement } from "./dominion-game-number";
import { SelfDestructPromptHtmlElement } from "./self-destruct-prompt";

window.customElements.define("dominion-deck", DominionDeckHtmlElement);
window.customElements.define("dominion-player", DominionPlayerHtmlElement);
window.customElements.define("player-container", DominionPlayersHtmlElement);
window.customElements.define("custom-button", CustomButtonHtmlElement);
window.customElements.define("reset-button", ResetButtonHtmlElement);
window.customElements.define("download-button", DownloadButtonHtmlElement);
window.customElements.define("upload-button", UploadButtonHtmlElement);
window.customElements.define("game-number", DominionGameNumberHtmlElement);
window.customElements.define("self-destruct-prompt", SelfDestructPromptHtmlElement);