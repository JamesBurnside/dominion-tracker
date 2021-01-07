import {DominionPlayer, GameResults, PlayerResults} from "../@types";
import logger from "../logger/logger";

const END_OF_GAME_SUMMARY = "ui-grid-render-container-body";
export const getScoreContainer = () => document.getElementsByClassName(END_OF_GAME_SUMMARY)[0] as HTMLElement


//TODO: Write a test
export const getScoreInfo = (scoreContainer: HTMLElement, players: DominionPlayer[]) : GameResults => {
    //turn the data into an array, remove the header information
    let scoreArray: string[] =  scoreContainer.innerText.split("\n").slice(6)

    const gameResults: GameResults = []

    for(let i = 0; scoreArray.length > 3 ; i ++){
        let playerName: string = scoreArray[1]
        const score: number = parseInt(scoreArray[2])
        const turns: number = parseInt(scoreArray[3])
        let deck = undefined

        for (const player of players){
            if (player.fullName === playerName) {
                deck = player.deck
                break
            }
            //Check if name has been extended (i.e. "JakobTheSnake (Resigned)") and rename with just the player name
            if(playerName.startsWith(player.fullName)){
                playerName = player.fullName
                deck = player.deck
                break
            }
        }

        gameResults[i] ={
            playerName,
            score,
            turns,
            deck
        }
        scoreArray = scoreArray.slice(4)
    }

    logger.log("Game Results:")
    logger.log(gameResults)
    return gameResults
}