import { HTMLObserver } from "./HTMLObserver";

/**
 * Self managing document observer class.
 */
class DocumentObserver extends HTMLObserver {
	constructor() {
		super(() => document.body);
	}
}

// Export singleton for ease of use
export const documentObserver = new DocumentObserver();