import dedent from "dedent";

const buttonStyles = dedent`
	button {
		display: block;
		width: 100%;
		margin-bottom: 10px;
	}
`;

const buttonClasses = "waves-effect waves-light btn-small";

// const buttonExternals = dedent`
// 	<link rel="stylesheet" href="">
// 	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
// `;

// const buttonHTMLTemplate = dedent`
// 	${buttonExternals}
// 	<button class=${buttonClasses} style=${buttonStyles}>
// 		<i></i>
// 	</button>
// `;

export class CustomButtonHtmlElement extends HTMLElement {

	constructor() {
		super();
	}

	connectedCallback(): void {
		const shadow = this.attachShadow({ mode: "open" });

		// Create button
		const htmlButton = document.createElement("button");
		htmlButton.textContent = this.getAttribute("text");
		htmlButton.setAttribute("class", buttonClasses);

		// Add button icon to button
		const buttonIcon = document.createElement("i");
		buttonIcon.setAttribute("class", "material-icons right");
		this.getAttribute("icon");
		buttonIcon.textContent = this.getAttribute("icon");
		htmlButton.appendChild(buttonIcon);

		// Add externals to shadow dom
		const iconsLink = createExternalsLink("stylesheet", "https://fonts.googleapis.com/icon?family=Material+Icons");
		const materializeLink = createExternalsLink("stylesheet", "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css");
		shadow.appendChild(iconsLink);
		shadow.appendChild(materializeLink);

		// Add styles to shadow dom
		const styles = document.createElement("style");
		styles.textContent = buttonStyles;
		shadow.appendChild(styles);

		// Attach button to shadow dom
		shadow.appendChild(htmlButton);

		this.onclick = () => { this.onClickFn && this.onClickFn(); }
	}

	protected onClickFn: () => void = null;
}

const createExternalsLink = (rel: string, href: string): HTMLLinkElement => {
	const link = document.createElement("link");
	link.setAttribute("rel", rel);
	link.setAttribute("href", href);
	return link;
}