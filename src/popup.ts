import { DominionPlayer } from "@types";
import { cardDictionary, getPlayersFromContentScript } from "utils";

function playersToCSV(players: DominionPlayer[]): string {
	let csv = "data:text/csv;charset=utf-8,";

	const header = `Player, ${Array.from(cardDictionary.keys()).join(",")} \r\n`;
	csv += header;

	players.forEach(function(player) {
		let row = `${player.fullName}`;
		for (const card of cardDictionary.keys()) {
			row += "," + (player.deck.get(card) ?? "0");
		}
		csv += row + "\r\n";
	});

	return csv;
}

document.getElementById("csv-button").onclick = async () => {
	const players = await getPlayersFromContentScript();
	const csvString = playersToCSV(players);
	const encodedUri = encodeURI(csvString);

	const downloadLink = document.createElement("a");
	downloadLink.href = encodedUri;

	const filename = `dominion - ${(new Date()).toISOString()}.csv`;
	downloadLink.download = filename;

	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}
