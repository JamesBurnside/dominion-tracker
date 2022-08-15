import { cardDictionary } from 'utils';
import {
  DominionAction,
  DominionCard,
  DominionLog,
  DominionPlayer,
  DominionPlayerShortName,
} from '../@types';
import logger from '../logger';

export const computeLog = (
  log: DominionLog,
  players: DominionPlayer[]
): void => {
  // Dont deal with logs containing boons and hexes
  log.cardStack = log.cardStack.filter((cardStack) => {
    const matchingKnownCard = cardDictionary.get(cardStack.card);
    return (
      !matchingKnownCard ||
      (matchingKnownCard.Types !== 'Hex' && matchingKnownCard.Types !== 'Boon')
    );
  });

  switch (log.action) {
    case DominionAction.Buys_And_Gains:
    case DominionAction.Gains:
    case DominionAction.Starts_With:
    case DominionAction.Receives:
      log.cardStack.forEach((cardStack) =>
        addCardStackToPlayer(
          cardStack.card,
          cardStack.amount,
          log.playerName,
          players
        )
      );
      break;
    case DominionAction.Trashes:
    case DominionAction.Returns:
      log.cardStack.forEach((cardStack) =>
        removeCardStackFromPlayer(
          cardStack.card,
          cardStack.amount,
          log.playerName,
          players
        )
      );
      break;
    default:
      logger.log(
        `Game manager cannot compute log, action not known: ${log.action}`
      );
  }
};

export const addCardStackToPlayer = (
  card: DominionCard,
  amount: number,
  shortName: DominionPlayerShortName,
  players: DominionPlayer[]
): void => {
  const player = players.find((player) => player.shortName === shortName);
  const newAmount = (player.deck.get(card) ?? 0) + amount;
  player.deck.set(card, newAmount);
};

export const removeCardStackFromPlayer = (
  card: DominionCard,
  amount: number,
  shortName: DominionPlayerShortName,
  players: DominionPlayer[]
): void => {
  const player = players.find((player) => player.shortName === shortName);
  const newAmount = (player.deck.get(card) ?? 0) - amount;
  if (newAmount <= 0) player.deck.delete(card);
  else player.deck.set(card, newAmount);
};

export const addFullPlayerNamesToPlayers = (
  fullPlayerName: string,
  players: DominionPlayer[]
): void => {
  // Check if it already exists
  for (const player of players) {
    if (player.fullName === fullPlayerName) return;
  }

  // Check if shortname exists, if so add it to that player
  for (const player of players) {
    if (fullPlayerName.startsWith(player.shortName)) {
      player.fullName = fullPlayerName;
      return;
    }
  }

  // Else create a new player
  players.push({
    fullName: fullPlayerName,
    shortName: null,
    deck: new Map(),
  });
};

export const addShortPlayerNamesToPlayers = (
  shortPlayerName: string,
  players: DominionPlayer[]
): void => {
  // Check if it already exists
  for (const player of players) {
    if (player.shortName === shortPlayerName) return;
  }

  // Check if shortname exists, if so add it to that player
  for (const player of players) {
    if (player.fullName === null) continue;
    if (player.fullName.startsWith(shortPlayerName)) {
      player.shortName = shortPlayerName;
      return;
    }
  }

  // Else create a new player
  players.push({
    fullName: null,
    shortName: shortPlayerName,
    deck: new Map(),
  });
};
