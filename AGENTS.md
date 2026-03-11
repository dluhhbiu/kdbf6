# BF6 Stats Tracker — Agent Guidelines

## Project Overview

Single-page HTML app (`index.html`) that fetches BF6 player stats from GameTools API and displays them. Desktop widget version via Electron.

## Architecture

- **Single file**: `index.html` — contains all HTML, CSS, and JS (both web and widget UI)
- **Desktop widget**: Electron (`electron/main.js`, `electron/preload.js`) — transparent frameless always-on-top window with tray icon
- **API stats**: `https://api.gametools.network/bf6/stats/?platform=pc&name=`
- **API global**: `https://api.gametools.network/bfglobal/player/?platform=pc&skip_battlelog=false&name=` (for createdAt)
- **Dependencies**: Bootstrap 5.3.3 (CDN), Google Fonts (Chakra Petch, Rajdhani), Electron, electron-builder

## Electron Widget

- `electron/main.js` — main process: frameless transparent window, always-on-top, tray icon (show/hide, quit), drag via IPC
- `electron/preload.js` — exposes `window.electronWidget` bridge (drag, close)
- Widget mode detected by `!!window.electronWidget` in index.html
- Close button and X hide to tray, quit only from tray menu
- Build: `npm run build` → portable .exe via electron-builder
- CI generates 256x256 icon from favicon.png (225x225) via ImageMagick

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
