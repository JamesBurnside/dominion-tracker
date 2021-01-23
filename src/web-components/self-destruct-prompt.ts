import dedent from "dedent";
import logger from "logger";

export const NewPrompt = (promptContainer: HTMLElement, text: string, colour: string): void => {
	//clean up old warnings messages
	const oldPrompts = promptContainer.getElementsByClassName("prompt");
	for (const prompt of oldPrompts) {
		promptContainer.removeChild(prompt);
	}

	//post a new prompt
	const selfDestructPrompt = new SelfDestructPromptHtmlElement();
	selfDestructPrompt.setAttribute("text", text);
	selfDestructPrompt.setAttribute("color", colour);
	selfDestructPrompt.setAttribute("time", "3000");
	selfDestructPrompt.setAttribute("class", "prompt");

	promptContainer.appendChild(selfDestructPrompt);
}

export class SelfDestructPromptHtmlElement extends HTMLElement {
	constructor() {
		super();
		this.destroySelf = this.destroySelf.bind(this);
	}

	connectedCallback(): void {
		const shadow = this.attachShadow({ mode: "open" });

		// create prompt
		const prompt = document.createElement("div");
		prompt.textContent = this.getAttribute("text");

		const styles = document.createElement("style");
		const promptStyles = dedent`
		div {
			margin: 10px 2px 2px 2px;
			color: ${this.getAttribute("color") ?? "black"}
		}
		`;
		styles.textContent = promptStyles;

		// add to shadow dom
		shadow.appendChild(styles);
		shadow.appendChild(prompt);

		// set self destruct
		let timeToDetonation = parseInt(this.getAttribute("time"));
		if(isNaN(timeToDetonation)) timeToDetonation = 3000;
		setTimeout(() => {
			logger.log("Self destructing");
			this.destroySelf();
		}, timeToDetonation)
	}

	public destroySelf(): void {
		this.parentNode.removeChild(this);
	}
}