#!/usr/bin/env node

/// TO USE
/// RUN ts-node bump_version.ts <bump-type>
/// @arg (OPTIONAL) bump-type - 'major' | 'minor' | 'patch'
/// e.g. ts-node bump_version.ts minor
/// 'patch' is the default when no bump-type supplied.

import { bump_type, bumpString, verifyBumpType } from "./bump";
import { getJsonFromFile, writeJsonToFile } from "./json-editor";

// Check if we should bump major, minor or patch verison (default to patch)
const args = process.argv.slice(2);
if (args.length > 1) {
	console.log(`Too many args, just using the first one: ${args[0]}`)
}

const bumpType = args[0] ?? "patch"; // Default to patch when no arg supplied
verifyBumpType(bumpType);

function performBumpOnFile(filename: string, bType: bump_type) {
	const json = getJsonFromFile(filename);
	const newVersionString = bumpString(json.version, bType);
	console.log(`New version number: ${newVersionString}`);
	json.version = newVersionString;
	writeJsonToFile(json, filename);
}

// Bump Package.json
console.log(`Bumping package.json`);
performBumpOnFile("./package.json", bumpType as bump_type);

// Bump manifest.json
console.log(`Bumping manifest.json`);
performBumpOnFile("./public/manifest.json", bumpType as bump_type);

process.exit(0);