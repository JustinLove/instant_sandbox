module.exports = function(grunt) {
  var target = grunt.option('target') || 'instant_sandbox_test'
  var title = 'Instant Sandbox Test'
  if (target == 'instant_sandbox') {
    title = 'Instant Sandbox'
  }

  // Project configuration.
  grunt.initConfig({
    target: target,
    requirejs: {
      target: {
        options: {
          baseUrl: 'ui/mods',
          mainConfigFile: 'ui/mods/instant_sandbox/bootstrap.js',
          skipDirOptimize: true,
          optimize: 'none',
          stubModules: ['text'],

          //name: 'lib/ext/almond',
          name: 'instant_sandbox/main',
          out: '../<%= target %>/ui/mods/instant_sandbox/bootstrap.js',

          skipModuleInsertion: true,
          onBuildWrite: function( name, path, contents ) {
            return require('amdclean').clean({
              code: contents,
              globalObject: true,
              globalObjectName: 'instant_sandbox',
            });
          },
        }
      }
    },
    copy: {
      simple: {
        files: [
          {
            src: [
              'LICENSE.txt',
              'README.md',
              'CHANGELOG.md',
              'ui/mods/instant_sandbox/panhandler.js',
              'ui/mods/instant_sandbox/*.css'
            ],
            dest: '../<%= target %>/',
          },
        ],
      },
      modinfo: {
        files: [
          {
            src: 'modinfo.dev.json',
            dest: '../<%= target %>/modinfo.json',
          },
        ],
        options: {
          process: function(content, srcpath) {
            var info = JSON.parse(content)
            info.date = require('dateformat')(new Date(), 'yyyy/mm/dd')
            info.display_name = title
            info.id = target
            info.identifier = "pa.wondible." + target
            for (var scene in info.scenes) {
              if (info.scenes[scene][0].match('require.js')) {
                info.scenes[scene].shift()
              }
            }
            console.log(info.version, info.date)
            return JSON.stringify(info, null, 2)
          }
        }
      },
      dev: {
        files: [
          {
            src: 'modinfo.dev.json',
            dest: 'modinfo.json',
          },
        ],
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['requirejs', 'copy:simple', 'copy:modinfo']);

};
