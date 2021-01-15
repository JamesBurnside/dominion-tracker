/* eslint-disable indent */
import { messageContentScript } from "../utils";
import logger from "../logger/logger";

//TODO: Write a little test script
export class UploadButtonHtmlElement extends HTMLElement {
  uploadHandler = (): void => {
    //get current data
    logger.log("upload button pressed");
    messageContentScript("addScoresToPlayers").then((response) => logger.log(response));

    //TODO: add axios command to send data to server
    //axios request to POST data to server

  };

  connectedCallback(): void {
    const uploadButton = document.createElement("button");
    uploadButton.className += "waves-effect waves-light btn-small";
    uploadButton.innerText = this.getAttribute("type");
    uploadButton.onclick = this.uploadHandler;
    this.appendChild(uploadButton)
  }

}
