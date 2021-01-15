import { DominionPlayer } from "@types";

export function serializePlayers(players: DominionPlayer[]): string {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return JSON.stringify(players, function (this: any, key: string, value: any) {
		const originalObject = this[key];
		// Maps are not supported in JSON stringify, so convert to array
		if(originalObject instanceof Map) {
			return {
				dataType: "Map",
				value: [...originalObject],
			};
		} else {
			return value;
		}
	});
}

export function deserializePlayers(serializedPlayers: string): DominionPlayer[] {
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

export async function getPlayersFromContentScript(): Promise<DominionPlayer[]> {
	return new Promise((resolve) => {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {type: "getPlayers"}, function(serializedPlayers) {
				const players = deserializePlayers(serializedPlayers);
				// logger.log("Players received from content script:");
				// logger.log(players);

				resolve(players);
			});
		});
	});
}

export async function messageContentScript(request: string): Promise<string> {
	return new Promise((resolve) => {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {type: request}, (response) => {
				// logger.log('messageSerializer reached, message sent: ' + request)
				// logger.log('messageSerielizer received a response of: ' + response)

				resolve(JSON.parse(response));
			});
		});
	});
}