import { IGameManager, GameManager } from 'game-manager';
import LogParser from 'log-parser';
import logger from 'logger';
import { PlayerFullNameParser } from 'player-parser';
import { serializePlayers } from 'utils';

function recreateGameTracker() {
  gameManager?.reset();
  logParser?.reset();
  playerFullNameParser?.reset();
}

const gameManager: IGameManager = new GameManager();
const logParser = new LogParser(
  gameManager.onLogsChanged,
  gameManager.onPlayerShortNamesFound,
  () => recreateGameTracker()
);
const playerFullNameParser = new PlayerFullNameParser(
  gameManager.onPlayerFullNamesFound
);

// create initial instance of the game tracker
recreateGameTracker();

/**
 * Communicate with the popup.html.
 * Popup will request data from the contentScripts via runtime messaging service.
 */
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case 'resetGameTracker':
      recreateGameTracker();
      sendResponse(true);
      break;
    case 'getPlayers':
      sendResponse(serializePlayers(gameManager.getPlayers()));
      break;
    case 'getGameNumber':
      // logger.log("getGameNumber request received by content script")
      sendResponse(gameManager.getGameNumber());
      break;
    case 'addScoresToPlayers':
      // logger.log("addScoresToPlayers request received by content script")
      sendResponse(JSON.stringify(gameManager.addScoresToPlayers()));
      break;
    default:
      logger.error('Unrecognised message: ', message);
      sendResponse(undefined);
  }
});
