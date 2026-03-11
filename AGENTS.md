# BF6 Stats Tracker — Agent Guidelines

## Project Overview

Single-page HTML app (`index.html`) that fetches BF6 player stats from GameTools API and displays them.

## Architecture

- **Single file**: `index.html` — contains all HTML, CSS, and JS
- **API stats**: `https://api.gametools.network/bf6/stats/?platform=pc&name=`
- **API global**: `https://api.gametools.network/bfglobal/player/?platform=pc&skip_battlelog=false&name=` (for createdAt)
- **Dependencies**: Bootstrap 5.3.3 (CDN), Google Fonts (Chakra Petch, Rajdhani)

## Key API Data Notes

- `kills` / `deaths` at top level — humans only (PvP)
- `gameModeGroups` — "All" (includes bots), "Multiplayer", "Redsec", "Battle Royale", "Portal"
- K/D is calculated manually (`kills / deaths`) for precision, not taken from API's rounded `killDeath`
- Revives MP = `All.revives - Redsec.revives`
- Weapons sorted by kills, top 3 displayed; shown as: kills, headshots, accuracy (in that order)
- No level/rank fields in API, no human/bot revive distinction

## localStorage

- `bf6_{nickname}` — snapshot of displayed stats with `savedAt` timestamp; overwrites after 24 hours
- `bf6_tags` — JSON array of player nicknames (persists across reloads, defaults to `['dluhhbiu', 'just_kip', 'vladeskos']`)
- `bf6_refreshInterval` — selected refresh interval in ms (persists across reloads, default 300000)
- `bf6_created_{nickname}` — cached account creation date
- Diff indicators compare current API data vs saved snapshot (K/D, kills, deaths, revives, weapon kills, weapon headshots)

## Conventions

- All changes stay in `index.html` (single-file architecture)
- Bootstrap tooltips used for stat abbreviation hints
- Russian is the preferred language for communication
