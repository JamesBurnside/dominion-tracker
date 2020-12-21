import { DominionPlayer } from "@types";
import logger from "logger";
// import { deserializePlayers } from "utils";

/**
 * WEBPACK IS BEING VERY PROBLEMATIC SO COPYING THIS HERE.
 * Basically when this is exported form utils\messageSerializer the contentScript no longer works.
 * The problem lies somewhere in webpacks loading modules code but I haven't got to the bottom of it.
 * Keep this function the same as the one in messageSerializer.test.ts.
 */
function deserializePlayers(serializedPlayers: string): DominionPlayer[] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return JSON.parse(serializedPlayers, function (this: any, key: string, value: any) {
		if(typeof value === "object" && value !== null) {
			if (value.dataType === "Map") {
				return new Map(value.value);
			}
		}
		return value;
	});
}

async function getPlayers(): Promise<DominionPlayer[]> {
	return new Promise((resolve) => {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {type: "getPlayers"}, function(players) {
				resolve(deserializePlayers(players));
			});
		});
	});
}

async function updatePlayers(): Promise<void> {
	const players = await getPlayers();
	logger.log("Players received from content script:");
	logger.log(players);
}

updatePlayers();
