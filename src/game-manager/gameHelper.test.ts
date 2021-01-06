import {
	addCardStackToPlayer,
	addFullPlayerNamesToPlayers,
	addShortPlayerNamesToPlayers,
	computeLog,
	removeCardStackFromPlayer
} from "./gameHelper";
import {DominionAction, DominionLog, DominionPlayer, DominionSubjectType} from "../@types";


describe("Log parser tests", () => {
	//create new players
	test("addShortPlayerNamesToPlayers returns results", () => {
		const players: DominionPlayer[] = []
		const shortName1 = "J"
		const shortName2 = "Zzz"
		const fullName3 = "JakeTheSnake"
		const shortName3= "Ja"
		expect(addShortPlayerNamesToPlayers(shortName1, players))
		expect(players).toEqual([
			{
				fullName: null,
				shortName: shortName1,
				deck: new Map()
			}
		]);
		//adding a second name
		expect(addShortPlayerNamesToPlayers(shortName2, players))
		expect(players).toEqual([
			{
				fullName: null,
				shortName: shortName1,
				deck: new Map()
			},
			{
				fullName: null,
				shortName: shortName2,
				deck: new Map()
			}
		]);
		//adding a duplicate name
		const playersCopy: DominionPlayer[] = [...players]
		expect(addShortPlayerNamesToPlayers(shortName2, players))
		expect(players).toEqual(playersCopy)

		//finding a full name
		players.push({
			fullName: fullName3,
			shortName: null,
			deck: new Map()
		})
		expect(addShortPlayerNamesToPlayers(shortName3, players))
		expect(players).toEqual([
			{
				fullName: null,
				shortName: shortName1,
				deck: new Map()
			},
			{
				fullName: null,
				shortName: shortName2,
				deck: new Map()
			},
			{
				fullName: fullName3,
				shortName: shortName3,
				deck: new Map()
			}
		]);
	});

	test("addFullPlayerNamesToPlayers returns results", () => {
		const players: DominionPlayer[] = []
		const fullName1 = "Jakiezar"
		const fullName2 = "Jimmypoo"
		const fullName3 = "JakeTheSnake"
		const shortName3 = "Jake"
		expect(addFullPlayerNamesToPlayers(fullName1, players))
		expect(players).toEqual([
			{
				fullName: fullName1,
				shortName: null,
				deck: new Map()
			}
		]);
		expect(addFullPlayerNamesToPlayers(fullName2, players))
		expect(players).toEqual([
			{
				fullName: fullName1,
				shortName: null,
				deck: new Map()
			},
			{
				fullName: fullName2,
				shortName: null,
				deck: new Map()
			}
		]);
		const playersCopy = [...players]
		expect(addFullPlayerNamesToPlayers(fullName2, players))
		expect(players).toEqual(playersCopy);

		//finding a short name
		players.push({
			fullName: null,
			shortName: shortName3,
			deck: new Map()
		})
		expect(addFullPlayerNamesToPlayers(fullName3, players))
		expect(players).toEqual([
			{
				fullName: fullName1,
				shortName: null,
				deck: new Map()
			},
			{
				fullName: fullName2,
				shortName: null,
				deck: new Map()
			},
			{
				fullName: fullName3,
				shortName: shortName3,
				deck: new Map()
			}
		]);
	});

	//AddStack
	test("addCardStackToPlayer returns results", () => {
		const players: DominionPlayer[] = []
		const shortName = "BYU"
		const fullName = "BobsYourUncle"
		players.push({
			fullName: fullName,
			shortName: shortName,
			deck: new Map()
		})
		const card = "estate"
		const amount = 2
		expect(addCardStackToPlayer(card, amount, shortName, players))
		expect(players[0].fullName).toEqual(fullName)
		expect(players[0].shortName).toEqual(shortName)
		expect(players[0].deck.get(card)).toEqual(2)
		//add more estates!
		expect(addCardStackToPlayer(card, amount, shortName, players))
		expect(players[0].deck.get(card)).toEqual(amount * 2)
		expect(removeCardStackFromPlayer(card, amount, shortName, players))
		expect(players[0].deck.get(card)).toEqual(amount)
	});

	//RemoveStack
	test("removeCardStackToPlayer returns results", () => {
		const players: DominionPlayer[] = []
		const shortName = "BYU"
		const fullName = "BobsYourUncle"
		players.push({
			fullName: fullName,
			shortName: shortName,
			deck: new Map()
		})
		players[0].deck.set("luftballons",99)
		const card = "luftballons"
		const amount = 98
		//remove cards
		expect(removeCardStackFromPlayer(card, amount, shortName, players))
		expect(players[0].deck.get(card)).toEqual(1)
		//if card => 0, delete from map
		expect(removeCardStackFromPlayer(card, 1, shortName, players))
		expect(players[0].deck.has(card)).toEqual(false)
	});

	//computeLog (Integration test!)
	test("computeLog returns results", () => {
		const players: DominionPlayer[] = []
		const shortName = "TomRiddle"
		const fullName = "LordVoldemort"
		const action: DominionAction = DominionAction.Gains
		const card = "horcruxes"
		const amount = 6
		players.push({
			fullName: fullName,
			shortName: shortName,
			deck: new Map()
		})
		players[0].deck.set("horcruxes",60)
		const cardStack = [{
			type: DominionSubjectType.Card,
			card,
			amount
		}]
		const log: DominionLog = {
			playerName: shortName,
			action,
			cardStack
		}

		//gain
		let expected = 60 + amount
		expect(computeLog(log, players))
		expect(players[0].deck.get(card)).toBe(expected)

		//trash
		expected = expected - amount
		log.action = DominionAction.Trashes
		expect(computeLog(log, players))
		expect(players[0].deck.get(card)).toBe(expected)

		//throw error (and do nothing to player deck)
		log.action = DominionAction.Error_Test
		expect(computeLog(log, players))
		expect(players[0].deck.get(card)).toBe(expected)
	});

	

});