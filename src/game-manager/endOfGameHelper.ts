import {DominionPlayer} from "../@types";

const END_OF_GAME_SUMMARY = "ui-grid-render-container-body";
export const getScoreContainer = (): HTMLElement => document.getElementsByClassName(END_OF_GAME_SUMMARY)[0] as HTMLElement

export const isEndOfGameScreen = () : boolean => {
	return getScoreContainer() !== undefined;
}

//TODO: Write a test
//adds scores to players or returns false if not at end-of-game screen.
export const addEndOfGameScoresToPlayers = (scoreContainer: HTMLElement, players: DominionPlayer[], gameNumber: string, gameDuration: number | undefined) : boolean => {
	//turn the data into an array, remove the header information
	let scoreArray: string[] =  scoreContainer.innerText.split("\n").slice(6)
	const date: Date = new Date()

	for(let i = 0; scoreArray.length > 3 ; i ++){
		let playerName: string = scoreArray[1]
		const score: number = parseInt(scoreArray[2])
		const turns: number = parseInt(scoreArray[3])

		//remove " (resigned)" from playerName string
		if(playerName.includes(" (resigned)")){
			playerName = playerName.slice(0, playerName.indexOf(" (resigned)"))
		}

		for (const player of players){
			if (player.fullName === playerName) {
				player.score = score
				player.turns = turns
				player.gameNumber = gameNumber
				player.date = date
				// This won't be known if a game was joined part-way through.
				player.gameDuration = gameDuration
				break
			}
		}

		scoreArray = scoreArray.slice(4)
	}

	return true
}