# Instant Sandbox

One click to start a game with neutered AI (economy rate -1)

I was always creating games against an AI x0 to test my mod, so borrowed a bunch of code from the PAStats matchmaker (after cross-referencing with the game code) to add an item to the main menu.

I've tried to concentrate the settings in once place, so if you're comfortable with text editors it is possible to change the number of players and planet used.

## CAUTION

This is at a proof of concept and still needs a lot of cleanup.  In particular it will NOT play nice with PAStats, so don't have both mods enabled at once - you probably don't want to report sandbox sessions anyway.

## Development

The project is set up to use combine files using [RequireJS](http://requirejs.org/) and [amdclean](https://github.com/gfranko/amdclean), with build automation through [Grunt](http://gruntjs.com/), which combines the JS, inlines HTML, copies files, and edits `modinfo.json` to fix up paths and names.

The generated project includes a `package.json` that lists the dependencies, but you'll need to run `npm install` to download them.

The repository expects to be in a mod folder named `instant_sandbox_dev`.  The default grunt task builds to `instant_sandbox_test`.  The 'production' build is through:

    grunt --target=instant_sandbox

The main mod file is `modinfo.dev.json` because PAMM rewrites `modinfo.json` when updating it.  `grunt copy:dev` is a convience task to update the live file from the formatted one.
