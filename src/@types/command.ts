import { DominionAction } from './action';
import { CardStack } from './subject';

/**
 * Currently we are saying that Dominion.online logs have a structured format like so:
 * <playerName> <action> <subject>
 * e.g. C reveals 2 Estates, 2 Coppers and a Shanty Town.
 * 	playname = C
 * 	action = reveals
 * 	subject = 2 Estates, 2 Coppers and a Shanty Town
 * We will almost certainly be proved wrong about this format but we can update as we discover new information.
 */
export interface DominionCommand {
  playerName: string;
  action: DominionAction;
  cardStack: CardStack;
}
