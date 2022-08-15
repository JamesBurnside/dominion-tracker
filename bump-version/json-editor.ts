/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

import fs from 'fs';

export function getJsonFromFile(filename: string): any {
  console.log(`Reading json from ${filename}`);
  const rawFileData = fs.readFileSync(filename);
  const json = JSON.parse(rawFileData as any);
  return json;
}

export function writeJsonToFile(json: any, filename: string): void {
  console.log(`Writing json to ${filename}`);
  fs.writeFileSync(filename, JSON.stringify(json, null, 2));
  console.log(`Successfully written to ${filename}`);
}
