# Dominion Deck Tracker

[![CI](https://github.com/JamesBurnside/dominion-tracker/workflows/CI/badge.svg)](https://github.com/JamesBurnside/dominion-tracker/actions?query=workflow%3ACI)
[![codecov](https://codecov.io/gh/JamesBurnside/dominion-tracker/branch/main/graph/badge.svg?token=PXTivJVNbk)](https://codecov.io/gh/JamesBurnside/dominion-tracker)
![badge-joke](https://img.shields.io/badge/number%20of%20contributions%20from%20jakob-0-red)

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
npm run watch
```

Add the extension you have just built to Edge Chromium or Chrome browsers:

```
In browser:
Settings > Extensions > "Load unpacked"
Choose project dist folder (<repo root>/dist)
```

Changes should be retranspiled and reloaded automatically. In edge and chrome you may have to click `reload` under the extension in the Extensions page. The official [docs](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading) don't actually say when this is necessarry ¯\\\_(ツ)\_\/¯

### How Tested

Oh, barely. But you can run tests with:

```
npm run test
```
