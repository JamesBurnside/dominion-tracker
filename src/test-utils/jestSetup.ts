// Do not perform this error logging during tests. Tests should
// fail when the expect() fails.
jest.mock("utils", () => ({
	...(jest.requireActual("utils")),
	logError: jest.fn()
}));