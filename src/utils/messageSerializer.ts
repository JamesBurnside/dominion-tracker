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