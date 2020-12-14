module.exports = {
	roots: [
		"src"
	],
	transform: {
		"^.+\\.(ts)x?$": "ts-jest",
	},
	modulePaths: ["<rootDir>/src/"],
	setupFiles: ["<rootDir>/src/test-utils/jestSetup.ts"],
};