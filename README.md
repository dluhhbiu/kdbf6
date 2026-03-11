# BF6 Stats Tracker

**[Live Demo](https://dluhhbiu.github.io/kdbf6/)**

Single-page web app for tracking Battlefield 6 player statistics in real-time.

## Features

- Multi-player stats lookup via tag chips input
- Dual K/D ratio: All (with bots) and Humans-only, with kills/deaths breakdown
- Revives split by Multiplayer and Redsec
- Top 3 weapons with kills, headshots (with diff indicators), and accuracy
- localStorage snapshots with diff indicators (green/red arrows) for K/D, kills, deaths, revives, and weapon stats
- Account creation date
- Configurable auto-refresh interval (10s, 30s, 1m, 5m) with error retry at 30s
- Persistent settings: player nicknames and refresh interval saved in localStorage across page reloads
- Card entrance animations

## Usage

Open `index.html` in a browser. Type a player nickname and press Enter to add it.

## API

Uses [GameTools API](https://api.gametools.network) for fetching player data.
