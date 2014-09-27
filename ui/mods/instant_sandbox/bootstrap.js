(function() {
  var config = require.s.contexts._.config
  config.waitSeconds = 0
  config.paths.instant_sandbox = 'coui://ui/mods/instant_sandbox'
  config.paths.text = config.paths.text || 'coui://ui/mods/instant_sandbox/text'
})()

// make the object keys exist for Panel.ready
panhandler.stub([
  'mount_mod_file_data',
  'server_mod_info_updated',
  'set_cheat_config',
  'connection_lost',
  'login_accepted',
  'login_rejected',
  'connection_disconnected',
  'connection_failed',
  'server_state',
  'control'
])

require(['instant_sandbox/start'], function(start) {
  "use strict";

  start.ready()
})
