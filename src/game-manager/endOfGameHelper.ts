import {GameResults, PlayerResults} from "../@types";
import logger from "../logger/logger";

const END_OF_GAME_SUMMARY = "ui-grid-render-container-body";
export const getScoreContainer = () => document.getElementsByClassName(END_OF_GAME_SUMMARY)[0] as HTMLElement

export const getScoreInfo = (scoreContainer: HTMLElement) : GameResults => {
    //turn the data into an array, remove the header information
    let scoreArray: string[] =  scoreContainer.innerText.split("\n").slice(6)

    const gameResults: GameResults = []


    for(let i = 0; scoreArray.length > 3 ; i ++){
        const playerName: string = scoreArray[1]
        const score: number = parseInt(scoreArray[2])
        const turns: number = parseInt(scoreArray[3])

        gameResults[i] ={
            playerName,
            score,
            turns,
            cardStack: undefined
        }
        scoreArray = scoreArray.slice(4)
    }

    //TODO: reconcile player names (search for player long name and use that if found)
    logger.log("Game Results:")
    logger.log(gameResults)
    return gameResults
}