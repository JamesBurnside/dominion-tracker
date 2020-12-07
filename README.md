# Dominion Deck Tracker

## What

Quick deck tracker for https://dominion.games/. Actively parses the log to determine what is in a given players deck.

## Instructions

Clone repo:

```
git clone <url> dominion-tracker
cd dominion-tracker
```

Build repo:

```
npm run watch
```

Add extension to Edge Chromium:

```
In Edge:
Settings > Extensions > "Load Packed"
...choose project dist folder
```

Changes should be retranspiled and reloaded automatically. In edge you may have to click `reload` under the extension in the Edge Extensions page. The official docs don't actually say when this is necessarry ¯\\\_(ツ)\_\/¯

### How Tested

Oh not at all currently. But you can run tests with:

```
npm run test
```
