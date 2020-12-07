import { dummyFunction } from "./popup";

describe("popup tests", () => {
	test("dummy test", () => {
		expect(dummyFunction()).toEqual("test");
	});
})