import { DominionSubject } from "@types";
import { logError } from "utils";

export function stringToSubject(subjectString: string): DominionSubject {
	switch(subjectString) {
	default:
		logError(`Unknown subject: ${subjectString}!`, true);
		return undefined;
	}
}