import { messageContentScript } from "utils";
import { CustomButtonHtmlElement } from "./custom-button";

export class ResetButtonHtmlElement extends CustomButtonHtmlElement {
	onClickFn = (): void => {
		messageContentScript("resetGameTracker");
	};
}