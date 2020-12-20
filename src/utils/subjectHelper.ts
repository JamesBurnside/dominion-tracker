import { DominionSubject, DominionSubjectType } from "@types";
import { extractActionFromLogLine } from "./actionHelper";
import logger from "logger";
import { cardDictionary, cardPluralsDictionary } from "./cardDictionary"

const unsupportedCard: DominionSubject = {
	type: DominionSubjectType.Unsupported
};

export function extractSubjectsFromLogLine(logLine: string): DominionSubject {
	// To be incredibly trivial and assume everything after the known action is of format `a`, `an`, INT <card>
	// TODO: support multi subjects, e.g. L trashes 3 coppers and an estate.
	const action = extractActionFromLogLine(logLine);

	if (!action) return unsupportedCard;

	const subjectStart = logLine.indexOf(action) + action.length + 1;
	let subjectLine = logLine.substr(subjectStart);

	// remove known endings. Order of endings array matters here
	const endings = [".", " from trash"];
	for (const ending of endings) {
		if (subjectLine.endsWith(ending)) {
			subjectLine = subjectLine.substr(0, subjectLine.length - ending.length);
		}
	}
	if(!subjectLine.includes(" and ")){
		//we have a single subject in this logline, proceed directly to our subject extracting function
		return  extractIndividualSubject(subjectLine, logLine);
	}

	//TODO: deal with lists
	//assume each list uses a non-oxford comma ending in "and", ex "an estate, 2 duchies and a province"
	//check for the string "_and_" - this denotes we have multiple subjects.

	//we have a list!
	//Split by the keyword "_and_"
	let cardList: string[] = subjectLine.split(" and ")
	if(cardList.length > 2){
		//we have too many "ands"
		logger.error(`Subject has multiple "ands", subjectline: ${subjectLine}`, true);
		return unsupportedCard;
	}
	//pull out last subject
	const lastCard: string = cardList[1]

	//Split by commas
	cardList = [...cardList[0].split(", ")]

	//rebuild our list
	cardList.push(lastCard)

	//deal with each card in cardListArray...
	for(const cards of cardList){
		extractIndividualSubject(cards, logLine)
	}

	//throw error if multiple cards in line
	//TODO: replace this with logic that returns the cardStack array. This probably involves rewriting all the tests types where this function is used...
	logger.error(`Multiple cards found, logline: ${logLine}`, true);
	return unsupportedCard;

}

export const extractIndividualSubject = (card: string, logLine: string) : DominionSubject => {
	//find the number leading the card
	const qualifier = card.substring(0, card.indexOf(" "))
	const amount = parseQualifierToInt(qualifier)

	// remove the qualifier ("an" or "a" or INT)
	card = card.substring(card.indexOf(" ") + 1)

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
	//check if card is in dictionary as is (i.e. plural form matches singular form, e.g. horse traders)
	if(isCardNameOfficial(cardToSearchFor)) return cardToSearchFor

	//check if card is a known plural of another card (e.g. platina --> platinum)
	if (cardPluralsDictionary.has(cardToSearchFor)) return cardPluralsDictionary.get(cardToSearchFor);

	//next, try removing an "s" then look again
	//note: this assumes that no card names in dominion differ only by a trailing "s"
	if(cardToSearchFor.substring(cardToSearchFor.length -1) === "s"){
		const cardWithoutS = cardToSearchFor.substring(0, cardToSearchFor.length -1)
		if(isCardNameOfficial(cardWithoutS)) return cardWithoutS
	}

	logger.error(`Card not found in dictionary, card: ${cardToSearchFor}`, true);
	return undefined;
}

export const isCardNameOfficial = (cardToSearchFor: string): boolean => cardDictionary.has(cardToSearchFor);