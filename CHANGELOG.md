# Instant Sandbox Changelog

## 2.8.2

- Fix mounting server mods in certain circumstances

## 2.8.1

- Fix using preferred commander

## 2.8.0

- "Idle" available for personality setting (new default), which doesn't affect eco rate since 84088-pte
- Default eco rates set to 1.0

## 2.7.0

- Start the game in the current active-product/expansion/content mode (e.g. Titans)

## 2.6.0

- Enable sandbox/cheat mode (80404-pte+)

## 2.5.1

- Update menu button style circa 76456
- Remove disable timeout since it doesn't shift the quit button anymore

## 2.5.0

- Game has a new busy spinner
- Attempt to load current definition of system by same name
- Go-to-lobby works with local server
- Updated defaults.settings object to current structure
- Bring back AI Commanders Per Army
- AI personality can be fully set in defaults
- Stock personalities can be selected in settings
- Setting to land anywhere, on by default

## 2.4.3

- Defer setting of planets until after server mods to enable custom biomes

## 2.4.2

- Remove obsolete incompatibility check for PAStats matchmaking
- Add hasOwnProperty guard to array enumeration

## 2.4.1

- Don't show region dialog when offline

## 2.4.0

- Use a local server when appropriate

## 2.3.3

- Gracefully handle undefined commander preference

## 2.3.2

- Disable Require.js timeout due to longer game load times with default render process limit.

## 2.3.1

- Fix the slider tooltips

## 2.3.0

- Update to settings layout circa 71378
- Replace engine calls with api.net where available

## 2.2.1

- Set the lobby id in session, which is now used by live_game

## 2.2.0

- Fix the set-system button in settings screen
- Option to spectate
- "AI Armies" (1-9) replaced with "Armies" (2-10)
- Option to go to configured lobby instead of starting
- Update README

## 2.1.0

- Add a one second delay to button enable to avoid accidental clicks when appearing
- Add a region check before starting

## 2.0.1

- Patch to make mod settings appear Settings
- Only respond to the start button when it's enabled.

## 2.0

- If unpacked RequireJS is good enough for Galactic War, it's good enough for me. (And it dances around the KO double-bind issue circa 67998)
- Without a build process, removed Grunt
- Remove depreciated fields from modinfo

## 1.3

- Update for new settings system, no longer depends on rSettingsManager

## 1.2

- Load server mods (in builds that support server mods)

## 1.1

- Galactic War Update
- Settings manager sliders not working, fields changed to text boxes temporarily
- Set player economy rate (server limited to 5.0 (50 at x10))
- AI Commanders-per-army is currently not supported
- If start game fails, switch to normal lobby for manual correction.

## 1.0.2

- Use a default system if none set
- Fix typo in setting names

## 1.0.1

- Accidentally shipped 1.0.0 with code-controlled configuration.

## 1.0.0

- Use sandbox biome for builtin planet
- Change GUI settings multiplier from 100x to 10x
- Add icon
- Now compatible with PA Stats
- Release to PAMM

## 0.6.0

- Most common parameters are available under the game settings, UI tab.  To switch back to code driven games, change the config property of the defaults object to Code (alias for 'code')
- Tweaked start button insertion again

## 0.5.0

- Compatible with 63180
- Defaults object now has a settings subobject
- Changed the system name in case it ever shows in a server browser

## 0.4.0

- No longer blindly overwrites handlers
- Only listens to events while trying to start a game
- Still incompatible with PAStats matchmaking.  Button will not be added to menu if PAStats is detected.
- PAStats-inspired progress dialog

## 0.3.0

- Move button to bottom
- Some support for spectating, appears to be vision issues
- Update protocol for 62857

## 0.2.0

- Support 'scenes' key in modinfo
- Update protocol for 62165
