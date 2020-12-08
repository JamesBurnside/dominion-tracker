import { getLogLinesFromContainer } from "./logHelpers";

describe("Log helper tests", () => {
	test("Successfully gets logs from log container", () => {
		expect(getLogLinesFromContainer(undefined)).toEqual([]);
	});
});