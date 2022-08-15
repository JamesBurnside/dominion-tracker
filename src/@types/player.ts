import { DominionDeck } from './deck';

export type DominionPlayerFullName = string;
export type DominionPlayerShortName = string;

export interface DominionPlayer {
  fullName: DominionPlayerFullName;
  shortName: DominionPlayerShortName;
  deck: DominionDeck;
  score?: number;
  turns?: number;
  gameNumber?: string;
  date?: Date;
  gameDuration?: number;
}
