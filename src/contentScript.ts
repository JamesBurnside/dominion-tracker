import { IGameManager, GameManager } from "game-manager";
import LogParser from "log-parser";
import logger from "logger";
import { PlayerFullNameParser } from "player-parser";
import { serializePlayers } from "utils";

logger.log("start")
const gameManager: IGameManager = new GameManager();
new PlayerFullNameParser(gameManager.onPlayerFullNamesFound);
new LogParser(gameManager.onLogsChanged, gameManager.onPlayerShortNamesFound);

/**
 * Communicate with the popup.html.
 * Popup will request data from the contentScripts via runtime messaging service.
 */
chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		switch(message.type) {
		case "getPlayers":
			sendResponse(serializePlayers(gameManager.getPlayers()));
			break;
		default:
			logger.error("Unrecognised message: ", message);
			sendResponse(undefined);
		}
	}
);