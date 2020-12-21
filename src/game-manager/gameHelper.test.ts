import {addShortPlayerNamesToPlayers} from "./gameHelper";

describe("Log parser tests", () => {
    //test each function
    test("addShortPlayerNamesToPlayers adds player name", () => {
        expect(addShortPlayerNamesToPlayers("j")).toEqual(true);
    });

    //create a snapshot test
});