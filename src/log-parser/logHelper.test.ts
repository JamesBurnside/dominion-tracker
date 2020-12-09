import { getLogsFromContainer } from "./logHelpers";

describe("Log helper tests", () => {
	test("Successfully gets logs from log container", () => {
		expect(getLogsFromContainer(undefined)).toEqual([]);
	});
});