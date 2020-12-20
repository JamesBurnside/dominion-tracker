import { IGameManager, GameManager } from "game-manager";
import LogParser from "log-parser";
import logger from "logger";
import PlayerParser from "player-parser";

logger.log("start")
const gameManager: IGameManager = new GameManager();
new PlayerParser(gameManager.onPlayersFound);
new LogParser(gameManager.onLogsChanged);
