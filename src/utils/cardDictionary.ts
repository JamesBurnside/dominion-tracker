import { DominionCard } from "@types";

type CardProperties = {
	Set: string;
	Types: string;
}

/**
 * Dictionary that maps a string representsing the plural form a card to the singular form of the Dominion Card.
 * This should be updated when cards that have non-standard plural forms exist (either end with an s, or have the same name in plural form)
 * For example:
 * 	Platina --> Platinum
 * But not:
 * 	Coppers --> Copper
 * 	Horse Traders --> Horse Traders
 */
export const cardPluralsDictionary = new Map<string, DominionCard>([
	["Platina", "Platinum"],
	["Feodum", "Feoda"]
]);

/**
 * Dictionary of all known cards in dominion.
 */
export const cardDictionary = new Map<DominionCard, CardProperties>([
	["Cellar", {
		Set: "Base",
		Types: "Action",
	}],
	["Chapel", {
		Set: "Base",
		Types: "Action",
	}],
	["Moat", {
		Set: "Base",
		Types: "Action - Reaction",
	}],
	["Chancellor", {
		Set: "Base, 1E",
		Types: "Action",
	}],
	["Harbinger", {
		Set: "Base, 2E",
		Types: "Action",
	}],
	["Merchant", {
		Set: "Base, 2E",
		Types: "Action",
	}],
	["Vassal", {
		Set: "Base, 2E",
		Types: "Action",
	}],
	["Village", {
		Set: "Base",
		Types: "Action",
	}],
	["Woodcutter", {
		Set: "Base, 1E",
		Types: "Action",
	}],
	["Workshop", {
		Set: "Base",
		Types: "Action",
	}],
	["Bureaucrat", {
		Set: "Base",
		Types: "Action - Attack",
	}],
	["Feast", {
		Set: "Base, 1E",
		Types: "Action",
	}],
	["Gardens", {
		Set: "Base",
		Types: "Victory",
	}],
	["Militia", {
		Set: "Base",
		Types: "Action - Attack",
	}],
	["Moneylender", {
		Set: "Base",
		Types: "Action",
	}],
	["Poacher", {
		Set: "Base, 2E",
		Types: "Action",
	}],
	["Remodel", {
		Set: "Base",
		Types: "Action",
	}],
	["Smithy", {
		Set: "Base",
		Types: "Action",
	}],
	["Spy", {
		Set: "Base, 1E",
		Types: "Action - Attack",
	}],
	["Thief", {
		Set: "Base, 1E",
		Types: "Action - Attack",
	}],
	["Throne Room", {
		Set: "Base",
		Types: "Action",
	}],
	["Bandit", {
		Set: "Base, 2E",
		Types: "Action - Attack",
	}],
	["Council Room", {
		Set: "Base",
		Types: "Action",
	}],
	["Festival", {
		Set: "Base",
		Types: "Action",
	}],
	["Laboratory", {
		Set: "Base",
		Types: "Action",
	}],
	["Library", {
		Set: "Base",
		Types: "Action",
	}],
	["Market", {
		Set: "Base",
		Types: "Action",
	}],
	["Mine", {
		Set: "Base",
		Types: "Action",
	}],
	["Sentry", {
		Set: "Base, 2E",
		Types: "Action",
	}],
	["Witch", {
		Set: "Base",
		Types: "Action - Attack",
	}],
	["Adventurer", {
		Set: "Base, 1E",
		Types: "Action",
	}],
	["Artisan", {
		Set: "Base, 2E",
		Types: "Action",
	}],
	["Copper", {
		Set: "Base",
		Types: "Treasure",
	}],
	["Silver", {
		Set: "Base",
		Types: "Treasure",
	}],
	["Gold", {
		Set: "Base",
		Types: "Treasure",
	}],
	["Estate", {
		Set: "Base",
		Types: "Victory",
	}],
	["Duchy", {
		Set: "Base",
		Types: "Victory",
	}],
	["Province", {
		Set: "Base",
		Types: "Victory",
	}],
	["Curse", {
		Set: "Base",
		Types: "Curse",
	}],
	["Courtyard", {
		Set: "Intrigue",
		Types: "Action",
	}],
	["Lurker", {
		Set: "Intrigue, 2E",
		Types: "Action",
	}],
	["Pawn", {
		Set: "Intrigue",
		Types: "Action",
	}],
	["Secret Chamber", {
		Set: "Intrigue, 1E",
		Types: "Action - Reaction",
	}],
	["Great Hall", {
		Set: "Intrigue, 1E",
		Types: "Action - Victory",
	}],
	["Masquerade", {
		Set: "Intrigue",
		Types: "Action",
	}],
	["Shanty Town", {
		Set: "Intrigue",
		Types: "Action",
	}],
	["Steward", {
		Set: "Intrigue",
		Types: "Action",
	}],
	["Swindler", {
		Set: "Intrigue",
		Types: "Action - Attack",
	}],
	["Wishing Well", {
		Set: "Intrigue",
		Types: "Action",
	}],
	["Baron", {
		Set: "Intrigue",
		Types: "Action",
	}],
	["Bridge", {
		Set: "Intrigue",
		Types: "Action",
	}],
	["Conspirator", {
		Set: "Intrigue",
		Types: "Action",
	}],
	["Coppersmith", {
		Set: "Intrigue, 1E",
		Types: "Action",
	}],
	["Diplomat", {
		Set: "Intrigue, 2E",
		Types: "Action - Reaction",
	}],
	["Ironworks", {
		Set: "Intrigue",
		Types: "Action",
	}],
	["Mill", {
		Set: "Intrigue, 2E",
		Types: "Action - Victory",
	}],
	["Mining Village", {
		Set: "Intrigue",
		Types: "Action",
	}],
	["Scout", {
		Set: "Intrigue, 1E",
		Types: "Action",
	}],
	["Secret Passage", {
		Set: "Intrigue, 2E",
		Types: "Action",
	}],
	["Courtier", {
		Set: "Intrigue, 2E",
		Types: "Action",
	}],
	["Duke", {
		Set: "Intrigue",
		Types: "Victory",
	}],
	["Minion", {
		Set: "Intrigue",
		Types: "Action - Attack",
	}],
	["Patrol", {
		Set: "Intrigue, 2E",
		Types: "Action",
	}],
	["Replace", {
		Set: "Intrigue, 2E",
		Types: "Action - Attack",
	}],
	["Saboteur", {
		Set: "Intrigue, 1E",
		Types: "Action - Attack",
	}],
	["Torturer", {
		Set: "Intrigue",
		Types: "Action - Attack",
	}],
	["Trading Post", {
		Set: "Intrigue",
		Types: "Action",
	}],
	["Tribute", {
		Set: "Intrigue, 1E",
		Types: "Action",
	}],
	["Upgrade", {
		Set: "Intrigue",
		Types: "Action",
	}],
	["Harem", {
		Set: "Intrigue",
		Types: "Treasure - Victory",
	}],
	["Nobles", {
		Set: "Intrigue",
		Types: "Action - Victory",
	}],
	["Embargo", {
		Set: "Seaside",
		Types: "Action",
	}],
	["Haven", {
		Set: "Seaside",
		Types: "Action - Duration",
	}],
	["Lighthouse", {
		Set: "Seaside",
		Types: "Action - Duration",
	}],
	["Native Village", {
		Set: "Seaside",
		Types: "Action",
	}],
	["Pearl Diver", {
		Set: "Seaside",
		Types: "Action",
	}],
	["Ambassador", {
		Set: "Seaside",
		Types: "Action - Attack",
	}],
	["Fishing Village", {
		Set: "Seaside",
		Types: "Action - Duration",
	}],
	["Lookout", {
		Set: "Seaside",
		Types: "Action",
	}],
	["Smugglers", {
		Set: "Seaside",
		Types: "Action",
	}],
	["Warehouse", {
		Set: "Seaside",
		Types: "Action",
	}],
	["Caravan", {
		Set: "Seaside",
		Types: "Action - Duration",
	}],
	["Cutpurse", {
		Set: "Seaside",
		Types: "Action - Attack",
	}],
	["Island", {
		Set: "Seaside",
		Types: "Action - Victory",
	}],
	["Navigator", {
		Set: "Seaside",
		Types: "Action",
	}],
	["Pirate Ship", {
		Set: "Seaside",
		Types: "Action - Attack",
	}],
	["Salvager", {
		Set: "Seaside",
		Types: "Action",
	}],
	["Sea Hag", {
		Set: "Seaside",
		Types: "Action - Attack",
	}],
	["Treasure Map", {
		Set: "Seaside",
		Types: "Action",
	}],
	["Bazaar", {
		Set: "Seaside",
		Types: "Action",
	}],
	["Explorer", {
		Set: "Seaside",
		Types: "Action",
	}],
	["Ghost Ship", {
		Set: "Seaside",
		Types: "Action - Attack",
	}],
	["Merchant Ship", {
		Set: "Seaside",
		Types: "Action - Duration",
	}],
	["Outpost", {
		Set: "Seaside",
		Types: "Action - Duration",
	}],
	["Tactician", {
		Set: "Seaside",
		Types: "Action - Duration",
	}],
	["Treasury", {
		Set: "Seaside",
		Types: "Action",
	}],
	["Wharf", {
		Set: "Seaside",
		Types: "Action - Duration",
	}],
	["Transmute", {
		Set: "Alchemy",
		Types: "Action",
	}],
	["Vineyard", {
		Set: "Alchemy",
		Types: "Victory",
	}],
	["Herbalist", {
		Set: "Alchemy",
		Types: "Action",
	}],
	["Apothecary", {
		Set: "Alchemy",
		Types: "Action",
	}],
	["Scrying Pool", {
		Set: "Alchemy",
		Types: "Action - Attack",
	}],
	["University", {
		Set: "Alchemy",
		Types: "Action",
	}],
	["Alchemist", {
		Set: "Alchemy",
		Types: "Action",
	}],
	["Familiar", {
		Set: "Alchemy",
		Types: "Action - Attack",
	}],
	["Philosopher's Stone", {
		Set: "Alchemy",
		Types: "Treasure",
	}],
	["Golem", {
		Set: "Alchemy",
		Types: "Action",
	}],
	["Apprentice", {
		Set: "Alchemy",
		Types: "Action",
	}],
	["Possession", {
		Set: "Alchemy",
		Types: "Action",
	}],
	["Potion", {
		Set: "Alchemy",
		Types: "Treasure",
	}],
	["Loan", {
		Set: "Prosperity",
		Types: "Treasure",
	}],
	["Trade Route", {
		Set: "Prosperity",
		Types: "Action",
	}],
	["Watchtower", {
		Set: "Prosperity",
		Types: "Action - Reaction",
	}],
	["Bishop", {
		Set: "Prosperity",
		Types: "Action",
	}],
	["Monument", {
		Set: "Prosperity",
		Types: "Action",
	}],
	["Quarry", {
		Set: "Prosperity",
		Types: "Treasure",
	}],
	["Talisman", {
		Set: "Prosperity",
		Types: "Treasure",
	}],
	["Worker's Village", {
		Set: "Prosperity",
		Types: "Action",
	}],
	["City", {
		Set: "Prosperity",
		Types: "Action",
	}],
	["Contraband", {
		Set: "Prosperity",
		Types: "Treasure",
	}],
	["Counting House", {
		Set: "Prosperity",
		Types: "Action",
	}],
	["Mint", {
		Set: "Prosperity",
		Types: "Action",
	}],
	["Mountebank", {
		Set: "Prosperity",
		Types: "Action - Attack",
	}],
	["Rabble", {
		Set: "Prosperity",
		Types: "Action - Attack",
	}],
	["Royal Seal", {
		Set: "Prosperity",
		Types: "Treasure",
	}],
	["Vault", {
		Set: "Prosperity",
		Types: "Action",
	}],
	["Venture", {
		Set: "Prosperity",
		Types: "Treasure",
	}],
	["Goons", {
		Set: "Prosperity",
		Types: "Action - Attack",
	}],
	["Grand Market", {
		Set: "Prosperity",
		Types: "Action",
	}],
	["Hoard", {
		Set: "Prosperity",
		Types: "Treasure",
	}],
	["Bank", {
		Set: "Prosperity",
		Types: "Treasure",
	}],
	["Expand", {
		Set: "Prosperity",
		Types: "Action",
	}],
	["Forge", {
		Set: "Prosperity",
		Types: "Action",
	}],
	["King's Court", {
		Set: "Prosperity",
		Types: "Action",
	}],
	["Peddler", {
		Set: "Prosperity",
		Types: "Action",
	}],
	["Platinum", {
		Set: "Prosperity",
		Types: "Treasure",
	}],
	["Colony", {
		Set: "Prosperity",
		Types: "Victory",
	}],
	["Hamlet", {
		Set: "Cornucopia",
		Types: "Action",
	}],
	["Fortune Teller", {
		Set: "Cornucopia",
		Types: "Action - Attack",
	}],
	["Menagerie", {
		Set: "Cornucopia",
		Types: "Action",
	}],
	["Farming Village", {
		Set: "Cornucopia",
		Types: "Action",
	}],
	["Horse Traders", {
		Set: "Cornucopia",
		Types: "Action - Reaction",
	}],
	["Remake", {
		Set: "Cornucopia",
		Types: "Action",
	}],
	["Tournament", {
		Set: "Cornucopia",
		Types: "Action",
	}],
	["Young Witch", {
		Set: "Cornucopia",
		Types: "Action - Attack",
	}],
	["Harvest", {
		Set: "Cornucopia",
		Types: "Action",
	}],
	["Horn of Plenty", {
		Set: "Cornucopia",
		Types: "Treasure",
	}],
	["Hunting Party", {
		Set: "Cornucopia",
		Types: "Action",
	}],
	["Jester", {
		Set: "Cornucopia",
		Types: "Action - Attack",
	}],
	["Fairgrounds", {
		Set: "Cornucopia",
		Types: "Victory",
	}],
	["Bag of Gold", {
		Set: "Cornucopia",
		Types: "Action - Prize",
	}],
	["Diadem", {
		Set: "Cornucopia",
		Types: "Treasure - Prize",
	}],
	["Followers", {
		Set: "Cornucopia",
		Types: "Action - Attack - Prize",
	}],
	["Princess", {
		Set: "Cornucopia",
		Types: "Action - Prize",
	}],
	["Trusty Steed", {
		Set: "Cornucopia",
		Types: "Action - Prize",
	}],
	["Crossroads", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Duchess", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Fool's Gold", {
		Set: "Hinterlands",
		Types: "Treasure - Reaction",
	}],
	["Develop", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Oasis", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Oracle", {
		Set: "Hinterlands",
		Types: "Action - Attack",
	}],
	["Scheme", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Tunnel", {
		Set: "Hinterlands",
		Types: "Victory - Reaction",
	}],
	["Jack of All Trades", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Noble Brigand", {
		Set: "Hinterlands",
		Types: "Action - Attack",
	}],
	["Nomad Camp", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Silk Road", {
		Set: "Hinterlands",
		Types: "Victory",
	}],
	["Spice Merchant", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Trader", {
		Set: "Hinterlands",
		Types: "Action - Reaction",
	}],
	["Cache", {
		Set: "Hinterlands",
		Types: "Treasure",
	}],
	["Cartographer", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Embassy", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Haggler", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Highway", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Ill-Gotten Gains", {
		Set: "Hinterlands",
		Types: "Treasure",
	}],
	["Inn", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Mandarin", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Margrave", {
		Set: "Hinterlands",
		Types: "Action - Attack",
	}],
	["Stables", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Border Village", {
		Set: "Hinterlands",
		Types: "Action",
	}],
	["Farmland", {
		Set: "Hinterlands",
		Types: "Victory",
	}],
	["Poor House", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Beggar", {
		Set: "Dark Ages",
		Types: "Action - Reaction",
	}],
	["Squire", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Vagrant", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Forager", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Hermit", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Market Square", {
		Set: "Dark Ages",
		Types: "Action - Reaction",
	}],
	["Sage", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Storeroom", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Urchin", {
		Set: "Dark Ages",
		Types: "Action - Attack",
	}],
	["Armory", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Death Cart", {
		Set: "Dark Ages",
		Types: "Action - Looter",
	}],
	["Feodum", {
		Set: "Dark Ages",
		Types: "Victory",
	}],
	["Fortress", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Ironmonger", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Marauder", {
		Set: "Dark Ages",
		Types: "Action - Attack - Looter",
	}],
	["Procession", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Rats", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Scavenger", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Wandering Minstrel", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Band of Misfits", {
		Set: "Dark Ages",
		Types: "Action - Command",
	}],
	["Bandit Camp", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Catacombs", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Count", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Counterfeit", {
		Set: "Dark Ages",
		Types: "Treasure",
	}],
	["Cultist", {
		Set: "Dark Ages",
		Types: "Action - Attack - Looter",
	}],
	["Graverobber", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Junk Dealer", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Mystic", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Pillage", {
		Set: "Dark Ages",
		Types: "Action - Attack",
	}],
	["Rebuild", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Rogue", {
		Set: "Dark Ages",
		Types: "Action - Attack",
	}],
	["Altar", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Hunting Grounds", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Abandoned Mine", {
		Set: "Dark Ages",
		Types: "Action - Ruins",
	}],
	["Ruined Library", {
		Set: "Dark Ages",
		Types: "Action - Ruins",
	}],
	["Ruined Market", {
		Set: "Dark Ages",
		Types: "Action - Ruins",
	}],
	["Ruined Village", {
		Set: "Dark Ages",
		Types: "Action - Ruins",
	}],
	["Survivors", {
		Set: "Dark Ages",
		Types: "Action - Ruins",
	}],
	["Dame Anna", {
		Set: "Dark Ages",
		Types: "Action - Attack - Knight",
	}],
	["Dame Josephine", {
		Set: "Dark Ages",
		Types: "Action - Attack - Victory - Knight",
	}],
	["Dame Molly", {
		Set: "Dark Ages",
		Types: "Action - Attack - Knight",
	}],
	["Dame Natalie", {
		Set: "Dark Ages",
		Types: "Action - Attack - Knight",
	}],
	["Dame Sylvia", {
		Set: "Dark Ages",
		Types: "Action - Attack - Knight",
	}],
	["Sir Bailey", {
		Set: "Dark Ages",
		Types: "Action - Attack - Knight",
	}],
	["Sir Destry", {
		Set: "Dark Ages",
		Types: "Action - Attack - Knight",
	}],
	["Sir Martin", {
		Set: "Dark Ages",
		Types: "Action - Attack - Knight",
	}],
	["Sir Michael", {
		Set: "Dark Ages",
		Types: "Action - Attack - Knight",
	}],
	["Sir Vander", {
		Set: "Dark Ages",
		Types: "Action - Attack - Knight",
	}],
	["Madman", {
		Set: "Dark Ages",
		Types: "Action",
	}],
	["Mercenary", {
		Set: "Dark Ages",
		Types: "Action - Attack",
	}],
	["Spoils", {
		Set: "Dark Ages",
		Types: "Treasure",
	}],
	["Hovel", {
		Set: "Dark Ages",
		Types: "Reaction - Shelter",
	}],
	["Necropolis", {
		Set: "Dark Ages",
		Types: "Action - Shelter",
	}],
	["Overgrown Estate", {
		Set: "Dark Ages",
		Types: "Victory - Shelter",
	}],
	["Candlestick Maker", {
		Set: "Guilds",
		Types: "Action",
	}],
	["Stonemason", {
		Set: "Guilds",
		Types: "Action",
	}],
	["Doctor", {
		Set: "Guilds",
		Types: "Action",
	}],
	["Masterpiece", {
		Set: "Guilds",
		Types: "Treasure",
	}],
	["Advisor", {
		Set: "Guilds",
		Types: "Action",
	}],
	["Herald", {
		Set: "Guilds",
		Types: "Action",
	}],
	["Plaza", {
		Set: "Guilds",
		Types: "Action",
	}],
	["Taxman", {
		Set: "Guilds",
		Types: "Action - Attack",
	}],
	["Baker", {
		Set: "Guilds",
		Types: "Action",
	}],
	["Butcher", {
		Set: "Guilds",
		Types: "Action",
	}],
	["Journeyman", {
		Set: "Guilds",
		Types: "Action",
	}],
	["Merchant Guild", {
		Set: "Guilds",
		Types: "Action",
	}],
	["Soothsayer", {
		Set: "Guilds",
		Types: "Action - Attack",
	}],
	["Coin of the Realm", {
		Set: "Adventures",
		Types: "Treasure - Reserve",
	}],
	["Page", {
		Set: "Adventures",
		Types: "Action - Traveller",
	}],
	["Peasant", {
		Set: "Adventures",
		Types: "Action - Traveller",
	}],
	["Ratcatcher", {
		Set: "Adventures",
		Types: "Action - Reserve",
	}],
	["Raze", {
		Set: "Adventures",
		Types: "Action",
	}],
	["Amulet", {
		Set: "Adventures",
		Types: "Action - Duration",
	}],
	["Caravan Guard", {
		Set: "Adventures",
		Types: "Action - Duration - Reaction",
	}],
	["Dungeon", {
		Set: "Adventures",
		Types: "Action - Duration",
	}],
	["Gear", {
		Set: "Adventures",
		Types: "Action - Duration",
	}],
	["Guide", {
		Set: "Adventures",
		Types: "Action - Reserve",
	}],
	["Duplicate", {
		Set: "Adventures",
		Types: "Action - Reserve",
	}],
	["Magpie", {
		Set: "Adventures",
		Types: "Action",
	}],
	["Messenger", {
		Set: "Adventures",
		Types: "Action",
	}],
	["Miser", {
		Set: "Adventures",
		Types: "Action",
	}],
	["Port", {
		Set: "Adventures",
		Types: "Action",
	}],
	["Ranger", {
		Set: "Adventures",
		Types: "Action",
	}],
	["Transmogrify", {
		Set: "Adventures",
		Types: "Action - Reserve",
	}],
	["Artificer", {
		Set: "Adventures",
		Types: "Action",
	}],
	["Bridge Troll", {
		Set: "Adventures",
		Types: "Action - Attack - Duration",
	}],
	["Distant Lands", {
		Set: "Adventures",
		Types: "Action - Reserve - Victory",
	}],
	["Giant", {
		Set: "Adventures",
		Types: "Action - Attack",
	}],
	["Haunted Woods", {
		Set: "Adventures",
		Types: "Action - Attack - Duration",
	}],
	["Lost City", {
		Set: "Adventures",
		Types: "Action",
	}],
	["Relic", {
		Set: "Adventures",
		Types: "Treasure - Attack",
	}],
	["Royal Carriage", {
		Set: "Adventures",
		Types: "Action - Reserve",
	}],
	["Storyteller", {
		Set: "Adventures",
		Types: "Action",
	}],
	["Swamp Hag", {
		Set: "Adventures",
		Types: "Action - Attack - Duration",
	}],
	["Treasure Trove", {
		Set: "Adventures",
		Types: "Treasure",
	}],
	["Wine Merchant", {
		Set: "Adventures",
		Types: "Action - Reserve",
	}],
	["Hireling", {
		Set: "Adventures",
		Types: "Action - Duration",
	}],
	["Alms", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Borrow", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Quest", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Save", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Scouting Party", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Travelling Fair", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Bonfire", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Expedition", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Ferry", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Plan", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Mission", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Pilgrimage", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Ball", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Raid", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Seaway", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Trade", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Lost Arts", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Training", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Inheritance", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Pathfinding", {
		Set: "Adventures",
		Types: "Event",
	}],
	["Soldier", {
		Set: "Adventures",
		Types: "Action - Attack - Traveller",
	}],
	["Fugitive", {
		Set: "Adventures",
		Types: "Action - Traveller",
	}],
	["Disciple", {
		Set: "Adventures",
		Types: "Action - Traveller",
	}],
	["Teacher", {
		Set: "Adventures",
		Types: "Action - Reserve",
	}],
	["Treasure Hunter", {
		Set: "Adventures",
		Types: "Action - Traveller",
	}],
	["Warrior", {
		Set: "Adventures",
		Types: "Action - Attack - Traveller",
	}],
	["Hero", {
		Set: "Adventures",
		Types: "Action - Traveller",
	}],
	["Champion", {
		Set: "Adventures",
		Types: "Action - Duration",
	}],
	["Engineer", {
		Set: "Empires",
		Types: "Action",
	}],
	["City Quarter", {
		Set: "Empires",
		Types: "Action",
	}],
	["Royal Blacksmith", {
		Set: "Empires",
		Types: "Action",
	}],
	["Overlord", {
		Set: "Empires",
		Types: "Action - Command",
	}],
	["Encampment", {
		Set: "Empires",
		Types: "Action",
	}],
	["Patrician", {
		Set: "Empires",
		Types: "Action",
	}],
	["Settlers", {
		Set: "Empires",
		Types: "Action",
	}],
	["Catapult", {
		Set: "Empires",
		Types: "Action - Attack",
	}],
	["Chariot Race", {
		Set: "Empires",
		Types: "Action",
	}],
	["Enchantress", {
		Set: "Empires",
		Types: "Action - Attack - Duration",
	}],
	["Farmers' Market", {
		Set: "Empires",
		Types: "Action - Gathering",
	}],
	["Gladiator", {
		Set: "Empires",
		Types: "Action",
	}],
	["Rocks", {
		Set: "Empires",
		Types: "Treasure",
	}],
	["Sacrifice", {
		Set: "Empires",
		Types: "Action",
	}],
	["Temple", {
		Set: "Empires",
		Types: "Action - Gathering",
	}],
	["Villa", {
		Set: "Empires",
		Types: "Action",
	}],
	["Archive", {
		Set: "Empires",
		Types: "Action - Duration",
	}],
	["Bustling Village", {
		Set: "Empires",
		Types: "Action",
	}],
	["Capital", {
		Set: "Empires",
		Types: "Treasure",
	}],
	["Charm", {
		Set: "Empires",
		Types: "Treasure",
	}],
	["Crown", {
		Set: "Empires",
		Types: "Action - Treasure",
	}],
	["Emporium", {
		Set: "Empires",
		Types: "Action",
	}],
	["Forum", {
		Set: "Empires",
		Types: "Action",
	}],
	["Groundskeeper", {
		Set: "Empires",
		Types: "Action",
	}],
	["Legionary", {
		Set: "Empires",
		Types: "Action - Attack",
	}],
	["Plunder", {
		Set: "Empires",
		Types: "Treasure",
	}],
	["Wild Hunt", {
		Set: "Empires",
		Types: "Action - Gathering",
	}],
	["Fortune", {
		Set: "Empires",
		Types: "Treasure",
	}],
	["Humble Castle", {
		Set: "Empires",
		Types: "Treasure - Victory - Castle",
	}],
	["Crumbling Castle", {
		Set: "Empires",
		Types: "Victory - Castle",
	}],
	["Small Castle", {
		Set: "Empires",
		Types: "Action - Victory - Castle",
	}],
	["Haunted Castle", {
		Set: "Empires",
		Types: "Victory - Castle",
	}],
	["Opulent Castle", {
		Set: "Empires",
		Types: "Action - Victory - Castle",
	}],
	["Sprawling Castle", {
		Set: "Empires",
		Types: "Victory - Castle",
	}],
	["Grand Castle", {
		Set: "Empires",
		Types: "Victory - Castle",
	}],
	["King's Castle", {
		Set: "Empires",
		Types: "Victory - Castle",
	}],
	["Triumph", {
		Set: "Empires",
		Types: "Event",
	}],
	["Annex", {
		Set: "Empires",
		Types: "Event",
	}],
	["Donate", {
		Set: "Empires",
		Types: "Event",
	}],
	["Advance", {
		Set: "Empires",
		Types: "Event",
	}],
	["Delve", {
		Set: "Empires",
		Types: "Event",
	}],
	["Tax", {
		Set: "Empires",
		Types: "Event",
	}],
	["Banquet", {
		Set: "Empires",
		Types: "Event",
	}],
	["Ritual", {
		Set: "Empires",
		Types: "Event",
	}],
	["Salt the Earth", {
		Set: "Empires",
		Types: "Event",
	}],
	["Wedding", {
		Set: "Empires",
		Types: "Event",
	}],
	["Windfall", {
		Set: "Empires",
		Types: "Event",
	}],
	["Conquest", {
		Set: "Empires",
		Types: "Event",
	}],
	["Dominate", {
		Set: "Empires",
		Types: "Event",
	}],
	["Aqueduct", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Arena", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Bandit Fort", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Basilica", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Battlefield", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Baths", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Colonnade", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Defiled Shrine", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Fountain", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Keep", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Labyrinth", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Mountain Pass", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Museum", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Obelisk", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Orchard", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Palace", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Tomb", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Tower", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Triumphal Arch", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Wall", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Wolf Den", {
		Set: "Empires",
		Types: "Landmark",
	}],
	["Druid", {
		Set: "Nocturne",
		Types: "Action - Fate",
	}],
	["Faithful Hound", {
		Set: "Nocturne",
		Types: "Action - Reaction",
	}],
	["Guardian", {
		Set: "Nocturne",
		Types: "Night - Duration",
	}],
	["Monastery", {
		Set: "Nocturne",
		Types: "Night",
	}],
	["Pixie", {
		Set: "Nocturne",
		Types: "Action - Fate",
	}],
	["Tracker", {
		Set: "Nocturne",
		Types: "Action - Fate",
	}],
	["Changeling", {
		Set: "Nocturne",
		Types: "Night",
	}],
	["Fool", {
		Set: "Nocturne",
		Types: "Action - Fate",
	}],
	["Ghost Town", {
		Set: "Nocturne",
		Types: "Night - Duration",
	}],
	["Leprechaun", {
		Set: "Nocturne",
		Types: "Action - Doom",
	}],
	["Night Watchman", {
		Set: "Nocturne",
		Types: "Night",
	}],
	["Secret Cave", {
		Set: "Nocturne",
		Types: "Action - Duration",
	}],
	["Bard", {
		Set: "Nocturne",
		Types: "Action - Fate",
	}],
	["Blessed Village", {
		Set: "Nocturne",
		Types: "Action - Fate",
	}],
	["Cemetery", {
		Set: "Nocturne",
		Types: "Victory",
	}],
	["Conclave", {
		Set: "Nocturne",
		Types: "Action",
	}],
	["Devil's Workshop", {
		Set: "Nocturne",
		Types: "Night",
	}],
	["Exorcist", {
		Set: "Nocturne",
		Types: "Night",
	}],
	["Necromancer", {
		Set: "Nocturne",
		Types: "Action",
	}],
	["Shepherd", {
		Set: "Nocturne",
		Types: "Action",
	}],
	["Skulk", {
		Set: "Nocturne",
		Types: "Action - Attack - Doom",
	}],
	["Cobbler", {
		Set: "Nocturne",
		Types: "Night - Duration",
	}],
	["Crypt", {
		Set: "Nocturne",
		Types: "Night - Duration",
	}],
	["Cursed Village", {
		Set: "Nocturne",
		Types: "Action - Doom",
	}],
	["Den of Sin", {
		Set: "Nocturne",
		Types: "Night - Duration",
	}],
	["Idol", {
		Set: "Nocturne",
		Types: "Treasure - Attack - Fate",
	}],
	["Pooka", {
		Set: "Nocturne",
		Types: "Action",
	}],
	["Sacred Grove", {
		Set: "Nocturne",
		Types: "Action - Fate",
	}],
	["Tormentor", {
		Set: "Nocturne",
		Types: "Action - Attack - Doom",
	}],
	["Tragic Hero", {
		Set: "Nocturne",
		Types: "Action",
	}],
	["Vampire", {
		Set: "Nocturne",
		Types: "Night - Attack - Doom",
	}],
	["Werewolf", {
		Set: "Nocturne",
		Types: "Action - Night - Attack - Doom",
	}],
	["Raider", {
		Set: "Nocturne",
		Types: "Night - Duration - Attack",
	}],
	["Will-o'-Wisp", {
		Set: "Nocturne",
		Types: "Action - Spirit",
	}],
	["Wish", {
		Set: "Nocturne",
		Types: "Action",
	}],
	["Bat", {
		Set: "Nocturne",
		Types: "Night",
	}],
	["Imp", {
		Set: "Nocturne",
		Types: "Action - Spirit",
	}],
	["Ghost", {
		Set: "Nocturne",
		Types: "Night - Duration - Spirit",
	}],
	["Zombie Apprentice", {
		Set: "Nocturne",
		Types: "Action - Zombie",
	}],
	["Zombie Mason", {
		Set: "Nocturne",
		Types: "Action - Zombie",
	}],
	["Zombie Spy", {
		Set: "Nocturne",
		Types: "Action - Zombie",
	}],
	["Haunted Mirror", {
		Set: "Nocturne",
		Types: "Treasure - Heirloom",
	}],
	["Magic Lamp", {
		Set: "Nocturne",
		Types: "Treasure - Heirloom",
	}],
	["Goat", {
		Set: "Nocturne",
		Types: "Treasure - Heirloom",
	}],
	["Pasture", {
		Set: "Nocturne",
		Types: "Treasure - Victory - Heirloom",
	}],
	["Pouch", {
		Set: "Nocturne",
		Types: "Treasure - Heirloom",
	}],
	["Cursed Gold", {
		Set: "Nocturne",
		Types: "Treasure - Heirloom",
	}],
	["Lucky Coin", {
		Set: "Nocturne",
		Types: "Treasure - Heirloom",
	}],
	["The Earth's Gift", {
		Set: "Nocturne",
		Types: "Boon",
	}],
	["The Field's Gift", {
		Set: "Nocturne",
		Types: "Boon",
	}],
	["The Flame's Gift", {
		Set: "Nocturne",
		Types: "Boon",
	}],
	["The Forest's Gift", {
		Set: "Nocturne",
		Types: "Boon",
	}],
	["The Moon's Gift", {
		Set: "Nocturne",
		Types: "Boon",
	}],
	["The Mountain's Gift", {
		Set: "Nocturne",
		Types: "Boon",
	}],
	["The River's Gift", {
		Set: "Nocturne",
		Types: "Boon",
	}],
	["The Sea's Gift", {
		Set: "Nocturne",
		Types: "Boon",
	}],
	["The Sky's Gift", {
		Set: "Nocturne",
		Types: "Boon",
	}],
	["The Sun's Gift", {
		Set: "Nocturne",
		Types: "Boon",
	}],
	["The Swamp's Gift", {
		Set: "Nocturne",
		Types: "Boon",
	}],
	["The Wind's Gift", {
		Set: "Nocturne",
		Types: "Boon",
	}],
	["Bad Omens", {
		Set: "Nocturne",
		Types: "Hex",
	}],
	["Delusion", {
		Set: "Nocturne",
		Types: "Hex",
	}],
	["Envy", {
		Set: "Nocturne",
		Types: "Hex",
	}],
	["Famine", {
		Set: "Nocturne",
		Types: "Hex",
	}],
	["Fear", {
		Set: "Nocturne",
		Types: "Hex",
	}],
	["Greed", {
		Set: "Nocturne",
		Types: "Hex",
	}],
	["Haunting", {
		Set: "Nocturne",
		Types: "Hex",
	}],
	["Locusts", {
		Set: "Nocturne",
		Types: "Hex",
	}],
	["Misery", {
		Set: "Nocturne",
		Types: "Hex",
	}],
	["Plague", {
		Set: "Nocturne",
		Types: "Hex",
	}],
	["Poverty", {
		Set: "Nocturne",
		Types: "Hex",
	}],
	["War", {
		Set: "Nocturne",
		Types: "Hex",
	}],
	["Deluded", {
		Set: "Nocturne",
		Types: "State",
	}],
	["Envious", {
		Set: "Nocturne",
		Types: "State",
	}],
	["Lost in the Woods", {
		Set: "Nocturne",
		Types: "State",
	}],
	["Miserable", {
		Set: "Nocturne",
		Types: "State",
	}],
	["Twice Miserable", {
		Set: "Nocturne",
		Types: "State",
	}],
	["Border Guard", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Ducat", {
		Set: "Renaissance",
		Types: "Treasure",
	}],
	["Lackeys", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Acting Troupe", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Cargo Ship", {
		Set: "Renaissance",
		Types: "Action - Duration",
	}],
	["Experiment", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Improve", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Flag Bearer", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Hideout", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Inventor", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Mountain Village", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Patron", {
		Set: "Renaissance",
		Types: "Action - Reaction",
	}],
	["Priest", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Research", {
		Set: "Renaissance",
		Types: "Action - Duration",
	}],
	["Silk Merchant", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Old Witch", {
		Set: "Renaissance",
		Types: "Action - Attack",
	}],
	["Recruiter", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Scepter", {
		Set: "Renaissance",
		Types: "Treasure",
	}],
	["Scholar", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Sculptor", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Seer", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Spices", {
		Set: "Renaissance",
		Types: "Treasure",
	}],
	["Swashbuckler", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Treasurer", {
		Set: "Renaissance",
		Types: "Action",
	}],
	["Villain", {
		Set: "Renaissance",
		Types: "Action - Attack",
	}],
	["Flag", {
		Set: "Renaissance",
		Types: "Artifact",
	}],
	["Horn", {
		Set: "Renaissance",
		Types: "Artifact",
	}],
	["Key", {
		Set: "Renaissance",
		Types: "Artifact",
	}],
	["Lantern", {
		Set: "Renaissance",
		Types: "Artifact",
	}],
	["Treasure Chest", {
		Set: "Renaissance",
		Types: "Artifact",
	}],
	["Cathedral", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["City Gate", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Pageant", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Sewers", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Star Chart", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Exploration", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Fair", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Silos", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Sinister Plot", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Academy", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Capitalism", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Fleet", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Guildhall", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Piazza", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Road Network", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Barracks", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Crop Rotation", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Innovation", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Canal", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Citadel", {
		Set: "Renaissance",
		Types: "Project",
	}],
	["Black Cat", {
		Set: "Menagerie",
		Types: "Action - Attack - Reaction",
	}],
	["Sleigh", {
		Set: "Menagerie",
		Types: "Action - Reaction",
	}],
	["Supplies", {
		Set: "Menagerie",
		Types: "Treasure",
	}],
	["Horse", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Camel Train", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Goatherd", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Scrap", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Sheepdog", {
		Set: "Menagerie",
		Types: "Action - Reaction",
	}],
	["Snowy Village", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Stockpile", {
		Set: "Menagerie",
		Types: "Treasure",
	}],
	["Bounty Hunter", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Cardinal", {
		Set: "Menagerie",
		Types: "Action - Attack",
	}],
	["Cavalry", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Groom", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Hostelry", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Village Green", {
		Set: "Menagerie",
		Types: "Action - Duration - Reaction",
	}],
	["Fisherman", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Hunting Lodge", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Barge", {
		Set: "Menagerie",
		Types: "Action - Duration",
	}],
	["Coven", {
		Set: "Menagerie",
		Types: "Action - Attack",
	}],
	["Displace", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Falconer", {
		Set: "Menagerie",
		Types: "Action - Reaction",
	}],
	["Gatekeeper", {
		Set: "Menagerie",
		Types: "Action - Duration - Attack",
	}],
	["Kiln", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Livery", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Mastermind", {
		Set: "Menagerie",
		Types: "Action - Duration",
	}],
	["Paddock", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Sanctuary", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Destrier", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Wayfarer", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Animal Fair", {
		Set: "Menagerie",
		Types: "Action",
	}],
	["Delay", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Desperation", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Gamble", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Pursue", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Ride", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Toil", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Enhance", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["March", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Transport", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Banish", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Bargain", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Invest", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Seize the Day", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Commerce", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Demand", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Stampede", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Reap", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Enclave", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Alliance", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Populate", {
		Set: "Menagerie",
		Types: "Event",
	}],
	["Way of the Butterfly", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Camel", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Chameleon", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Frog", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Goat", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Horse", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Mole", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Monkey", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Mouse", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Mule", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Otter", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Ox", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Owl", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Pig", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Rat", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Seal", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Sheep", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Squirrel", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Turtle", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Way of the Worm", {
		Set: "Menagerie",
		Types: "Way",
	}],
	["Black Market", {
		Set: "Promo",
		Types: "Action",
	}],
	["Church", {
		Set: "Promo",
		Types: "Action - Duration",
	}],
	["Dismantle", {
		Set: "Promo",
		Types: "Action",
	}],
	["Envoy", {
		Set: "Promo",
		Types: "Action",
	}],
	["Sauna", {
		Set: "Promo",
		Types: "Action",
	}],
	["Walled Village", {
		Set: "Promo",
		Types: "Action",
	}],
	["Avanto", {
		Set: "Promo",
		Types: "Action",
	}],
	["Governor", {
		Set: "Promo",
		Types: "Action",
	}],
	["Stash", {
		Set: "Promo",
		Types: "Treasure",
	}],
	["Summon", {
		Set: "Promo",
		Types: "Event",
	}],
	["Captain", {
		Set: "Promo",
		Types: "Action - Duration - Command",
	}],
	["Prince", {
		Set: "Promo",
		Types: "Action",
	}],
]);