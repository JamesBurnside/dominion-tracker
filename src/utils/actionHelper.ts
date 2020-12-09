import { DominionAction, SupportedAction } from "@types";
import { logError } from ".";

export function stringToAction(actionAsString: string): DominionAction {
	switch(actionAsString) {
	case "buys": return DominionAction.Buy;
	case "gains": return DominionAction.Gain;
	case "buys and gains": return DominionAction.Buy_And_Gain;
	default:
		logError(`Unknown action: ${actionAsString}!`, true);
		return DominionAction.Unknown;
	}
}

export function actionIsSupported(action: DominionAction): boolean {
	return (Object.values(SupportedAction).includes(action as string));
}