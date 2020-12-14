module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		"ecmaVersion": 2020,
		"sourceType": "module"
	},
	plugins: [
		"@typescript-eslint"
	],
	rules: {
		eqeqeq: "warn",
		indent: ["warn", "tab"],
		quotes: ["warn", "double", { "allowTemplateLiterals": true }],
		"no-trailing-spaces": "warn"
	},
	ignorePatterns: [
		"node_modules/",
		"dist/"
	],
	overrides: [
		{
			files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
			env: {
				jest: true
			}
		},
		{
			files: ["webpack/**/*"],
			rules: {
				"@typescript-eslint/no-var-requires": "off",
			}
		}
	]
};
