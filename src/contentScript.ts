import { IGameManager, GameManager } from "game-manager";
import LogParser from "log-parser";
import logger from "logger";
import PlayerFullNameParser from "player-parser/playerFullNameParser";

logger.log("start")
const gameManager: IGameManager = new GameManager();
new PlayerFullNameParser(gameManager.onPlayerFullNamesFound);
new LogParser(gameManager.onLogsChanged, gameManager.onPlayerShortNamesFound);
