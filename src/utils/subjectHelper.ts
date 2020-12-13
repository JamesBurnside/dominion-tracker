import { DominionSubject, DominionSubjectType } from "@types";
import { extractActionFromLogLine } from "./actionHelper";
import { logError } from "utils";

const unsupportedCard: DominionSubject = {
	type: DominionSubjectType.Unsupported
};

export function extractSubjectFromLogLine(logLine: string): DominionSubject {
	// To be incredibly trivial and assume everything after the known action is a `a` or `an` <card>
	// TODO: support multi subjects, e.g. L trashes 3 coppers and an estate.
	const action = extractActionFromLogLine(logLine);

	if (!action) return unsupportedCard;

	const subjectStart = logLine.indexOf(action) + action.length + 1;
	const subjectLine = logLine.substr(subjectStart);

	// remove a or an:
	let card = subjectLine.startsWith("an ") ?
		subjectLine.substr(3) : subjectLine.substr(2);

	// remove known endings. Order of endings array matters here
	const endings = [".", " from trash"];
	for (const ending of endings) {
		if (card.endsWith(ending)) {
			card = card.substr(0, card.length - ending.length);
		}
	}

	if (!card || card.length < 1) {
		logError(`Card not parsed as subject succesfully, logline: ${logLine}`, true);
		return unsupportedCard;
	}

	return {
		type: DominionSubjectType.Card,
		card,
		amount: 1
	};
}