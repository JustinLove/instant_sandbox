# Instant Sandbox

One click to start a game with neutered AI (economy rate -1)

I was always creating games against an AI x0 to test my mod, so borrowed a bunch of code from the PAStats matchmaker (after cross-referencing with the game code) to add an item to the main menu.

Some of the most common settings can be changed in the game settings:

- Load a system
- AI economy rate
- Number of AI armies and commanders

I've tried to concentrate the settings in once place, so if you're comfortable with text editors it is possible to fully customize things.  Changing the `config` property of the `defaults` object to Code will cause it to use the defaults object instead of the user settings.

## Development

The project is set up to use combine files using [RequireJS](http://requirejs.org/) and [amdclean](https://github.com/gfranko/amdclean), with build automation through [Grunt](http://gruntjs.com/), which combines the JS, inlines HTML, copies files, and edits `modinfo.json` to fix up paths and names.

The generated project includes a `package.json` that lists the dependencies, but you'll need to run `npm install` to download them.

The repository expects to be in a mod folder named `instant_sandbox_dev`.  The default grunt task builds to `instant_sandbox_test`.  The 'production' build is through:

    grunt --target=instant_sandbox

The main mod file is `modinfo.dev.json` because PAMM rewrites `modinfo.json` when updating it.  `grunt copy:dev` is a convience task to update the live file from the formatted one.
