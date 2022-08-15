import { DominionPlayerFullName } from '@types';

const PLAYER_NAME_CONTAINER_CLASS_NAME = 'opponent-name';

/**
 * Extract an array of players names from the HTML player container elements.
 */
export const getPlayerNamesFromDocument = (): DominionPlayerFullName[] =>
  Array
    // extract log html elements as array of HTMLElements
    .from(document.getElementsByClassName(PLAYER_NAME_CONTAINER_CLASS_NAME))
    // grab the name out of the element
    .map((c) => c.firstChild.textContent.trim());
