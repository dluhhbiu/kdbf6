# BF6 Stats Tracker — Agent Guidelines

## Project Overview

Single-page HTML app (`index.html`) that fetches BF6 player stats from GameTools API and displays them.

## Architecture

- **Single file**: `index.html` — contains all HTML, CSS, and JS
- **API**: `https://api.gametools.network/bf6/stats/?platform=pc&name=`
- **Dependencies**: Bootstrap 5.3.3 (CDN)

## Key API Data Notes

- `kills` / `deaths` at top level — humans only (PvP)
- `gameModeGroups[0]` (gamemodeName: "All") — includes bot kills
- K/D is calculated manually (`kills / deaths`) for precision, not taken from API's rounded `killDeath`
- `dividedKills.human` — confirmed human kills
- Weapon stats include: kills, accuracy, headshots

## Conventions

- All changes stay in `index.html` (single-file architecture)
- Bootstrap tooltips used for stat abbreviation hints
- Russian is the preferred language for communication
