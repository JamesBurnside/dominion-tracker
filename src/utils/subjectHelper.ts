import { DominionSubject } from "@types";
import { logError } from "./errorLogger";

export function stringToSubject(subjectString: string): DominionSubject {
	switch(subjectString) {
	default:
		logError(`Unknown subject: ${subjectString}!`, true);
		return undefined;
	}
}