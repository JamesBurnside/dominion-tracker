# Dominion Deck Tracker

[![CI](https://github.com/JamesBurnside/dominion-tracker/workflows/CI/badge.svg)](https://github.com/JamesBurnside/dominion-tracker/actions?query=workflow%3ACI)
[![codecov](https://codecov.io/gh/JamesBurnside/dominion-tracker/branch/main/graph/badge.svg?token=PXTivJVNbk)](https://codecov.io/gh/JamesBurnside/dominion-tracker)
![badge-joke](https://img.shields.io/badge/number%20of%20contributions%20from%20jakob-2-brightgreen)

## What

Quick deck tracker for https://dominion.games/. Actively parses the log to determine what is in a given players deck.

## Instructions

Prerequisites:

- Ensure git is installed: https://git-scm.com/
- Ensure latest node & npm is installed: https://nodejs.org/
- (Recommended) install vscode: https://code.visualstudio.com/

Clone and setup repo:

```
git clone <url> dominion-tracker
cd dominion-tracker
npm i
```

Build extension:

```
npm run dev
```

Add the extension you have just built to Edge Chromium or Chrome browsers:

```
In browser:
Settings > Extensions > "Load unpacked"
Choose project dist folder (<repo root>/dist)
```

Changes are retranspiled under `npm run dev`. If only UI has changed the browser seems to pick this up automatically. If any typescript or javascript is updated, in edge/chrome, you will have to click `reload` under the extension in the Extensions page and refresh the browser page. The official [docs](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading) don't actually say when this is necessarry but I found it is often needed ¯\\\_(ツ)\_\/¯

### Run Tests

Oh, barely. But you can run tests with:

```
npm run test
```

### Create production zip to upload to chrome extension store

```
npm run package
```
