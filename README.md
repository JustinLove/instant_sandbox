# Instant Sandbox

One click to start a game with AI x0

## Features

- Rainbows
- Unicorns

## Development

The project is set up to use combine files using [RequireJS](http://requirejs.org/) and [amdclean](https://github.com/gfranko/amdclean), with build automation through [Grunt](http://gruntjs.com/), which combines the JS, inlines HTML, copies files, and edits `modinfo.json` to fix up paths and names.

The repository expects to be in a mod folder named `instant_sandbox`.  The default grunt task builds to `instant_sandbox_test`.  The 'production' build is through:

    grunt --target=instant_sandbox

The main mod file is `modinfo.dev.json` because PAMM rewrites `modinfo.json` when updating it.  `grunt copy:dev` is a convience task to update the live file from the formatted one.
