import { DominionAction } from "./action";
import { DominionSubject } from "./subject";

/**
 * Dominion.online logs have a structured format:
 * <playerName> <primaryAction> <primarySubject> <secondaryAction> <secondarySubject>
 * e.g. todo
 * or
 * todo
 * For now, for simplicity, will we only support the primary actions and subjects.
 */
export interface DominionCommand {
	playerName: string;
	primaryAction: DominionAction,
	primarySubject: DominionSubject
}