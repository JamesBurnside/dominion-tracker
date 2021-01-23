import {getPlayersFromContentScript, messageContentScript, serializePlayers} from "../utils";
import logger from "../logger/logger";
import axios from "axios";

type UploadResult = {
	success: boolean;
	errorMessage?: string;
};

export const uploadHandler = async (): Promise<UploadResult> => {
	//get current data
	logger.log("upload button pressed");
	let isEndOfGame: boolean;

	try {
		isEndOfGame = !!JSON.parse(await messageContentScript("addScoresToPlayers"));
	} catch (e) {
		logger.error(e);
		return {
			success: false,
			errorMessage: "Could not talk to dominion game!"
		};
	}

	if(!isEndOfGame){
		return {
			success: false,
			errorMessage: "Can't upload game, not at end screen!"
		};
	}

	const players = serializePlayers(await getPlayersFromContentScript() );

	//get game number (used for the post location)
	const gameNumber = await messageContentScript("getGameNumber")

	try {
		await axios.put(`https://dominion-json-bin-default-rtdb.firebaseio.com/scores/${gameNumber}.json`, players);
		logger.log("game successfully saved!");
		return {
			success: true
		};
	} catch (e) {
		logger.log(e);
		return {
			success: false,
			errorMessage: "Unable to save game. Check your internet connection?"
		};
	}
};