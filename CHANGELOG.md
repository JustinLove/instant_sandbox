# Instant Sandbox Changelog

## 1.0.0

- Use sandbox biome for builtin planet
- Change GUI settings multiplier from 100x to 10x
- Add icon
- Now compatible with PA Stats
- Release to PAM

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
