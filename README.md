# Instant Sandbox

One click to start a game with neutered AI (economy rate -1)

I was always creating games against an AI x0 to test my mod, so borrowed a bunch of code from the PAStats matchmaker (after cross-referencing with the game code) to add an item to the main menu.

Some of the most common settings can be changed in the game settings:

- Load a system
- AI economy rate
- Number of AI armies and commanders

I've tried to concentrate the settings in once place, so if you're comfortable with text editors it is possible to fully customize things.  Changing the `config` property of the `defaults` object to Code will cause it to use the defaults object instead of the user settings.
