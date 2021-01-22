/* eslint-disable indent */
import {getPlayersFromContentScript, messageContentScript, serializePlayers} from "../utils";
import logger from "../logger/logger";
import axios from "axios";


export class UploadContainerHtmlElement extends HTMLElement {
    constructor() {
        super();
    }

    uploadHandler = async (): Promise<void> => {
        //get current data
        logger.log("upload button pressed");
        const isEndOfGame = JSON.parse(await messageContentScript("addScoresToPlayers"));
        if(!isEndOfGame){
            this.prompt("Can't upload game, not at end screen!", "red")
            logger.log("Can't upload game, not at end screen!")
            return
        }
        const players = serializePlayers(await getPlayersFromContentScript() );

        //get game number (we need this for the post location
        const gameNumber = await messageContentScript("getGameNumber")


        axios.put(`https://dominion-json-bin-default-rtdb.firebaseio.com/scores/${gameNumber}.json`, players)
            .then(response => {
                logger.log("game successfully saved!")
                this.prompt("Game successfully saved - see you on the leaderboard!", "mediumseagreen")
            })
            .catch(error => {
                this.prompt("Unable to save game. Check your internet connection?", "tomato")
                logger.log(error)
            })
    };

    prompt = (text: string, colour: string): void =>{

        //clean up old warnings messages
        const oldWarning = document.getElementsByClassName("uploadMessage")
        if(oldWarning) {
            for(const items of oldWarning){
                items.innerHTML = ""
                logger.log("old warning discarded")
            }
        }

        //post a new message
        const uploadMessage = document.createElement("div")
        uploadMessage.className += "uploadMessage"
        uploadMessage.innerText += text
        uploadMessage.style.color = colour
        // uploadMessage.style.backgroundColor = "lightblue"
        uploadMessage.style.margin ="2px"
        uploadMessage.style.marginTop ="10px"
        this.appendChild(uploadMessage)
        setTimeout( () => {
            this.removeChild(uploadMessage)
        }, 3000)

    }

    connectedCallback(): void {
        const uploadButton = document.createElement("button");
        uploadButton.className += "waves-effect waves-light btn-small";
        uploadButton.innerText = "Upload";
        uploadButton.onclick = this.uploadHandler;
        this.appendChild(uploadButton)
    }

}