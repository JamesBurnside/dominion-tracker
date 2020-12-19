import { DominionSubject, DominionSubjectType } from "@types";
import { extractActionFromLogLine } from "./actionHelper";
import logger from "logger";
import { cardDictionary } from "./cardDictionary"

const unsupportedCard: DominionSubject = {
	type: DominionSubjectType.Unsupported
};

export function extractSubjectFromLogLine(logLine: string): DominionSubject {
	// To be incredibly trivial and assume everything after the known action is of format `a`, `an`, INT <card>
	// TODO: support multi subjects, e.g. L trashes 3 coppers and an estate.
	const action = extractActionFromLogLine(logLine);

	if (!action) return unsupportedCard;

	const subjectStart = logLine.indexOf(action) + action.length + 1;
	const subjectLine = logLine.substr(subjectStart);

	//find the number leading the card
	const qualifier = subjectLine.substring(0, subjectLine.indexOf(" "))
	const amount = parseQualifierToInt(qualifier)

	// remove the qualifier ("an" or "a" or INT)
	let card = subjectLine.substring(subjectLine.indexOf(" ") + 1)

	// remove known endings. Order of endings array matters here
	const endings = [".", " from trash"];
	for (const ending of endings) {
		if (card.endsWith(ending)) {
			card = card.substr(0, card.length - ending.length);
		}
	}

	//TODO: deal with plural words.
	//deal with plural cards
	if(amount > 1){
		card = cardDepluralizer(card)
		if(card === undefined){
			logger.error(`Card not found in dictionary, logline: ${logLine}`, true);
			return unsupportedCard;
		}
	}

	if (!card || card.length < 1) {
		logger.error(`Card not parsed as subject succesfully, logline: ${logLine}`, true);
		return unsupportedCard;
	}

	return {
		type: DominionSubjectType.Card,
		card,
		amount
	};
}

export const parseQualifierToInt = (qualifier: string): number => {
	//try to make an integer out of the qualifier
	//if integer exists = use it
	const qualifierInt = parseInt(qualifier)
	if(qualifierInt) return qualifierInt

	//check for "a" or "an"
	if(qualifier === "a" || qualifier === "an") return 1

	//something must be wrong
	return null
}


export const cardDepluralizer = (cardToSearchFor: string): string => {
	//check if card is in dictionary
	if(isCardNameOfficial(cardToSearchFor)) return cardToSearchFor

	//if not, try removing an "s" and look again
	//(this is assuming that no card names in dominion are identical except for a trailing "s")
	if(cardToSearchFor.substring(cardToSearchFor.length -1) === "s"){
		const cardWithoutS = cardToSearchFor.substring(0, cardToSearchFor.length -1)
		if(isCardNameOfficial(cardWithoutS)) return cardWithoutS
	}

	//TODO: add functionality for catching pluralizations that don't end in "s" (are there any?)

	logger.error(`Card not found in dictionary, card: ${cardToSearchFor}`, true);
	return undefined;
}

//TODO: teach Jakob how to create a type for cardDictionary
export const isCardNameOfficial = (cardToSearchFor: string): boolean => {
	for(const cards of cardDictionary) {
		if(cardToSearchFor === cards.Name){
			return true
		}
	}
	return false
}