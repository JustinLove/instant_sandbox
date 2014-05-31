require.config({
  baseUrl: "coui://ui/mods",
  paths: {
    text: 'instant_sandbox/text',
  }
})

// make the object keys exist for Panel.ready
panhandler.stub([
  'mount_mod_file_data',
  'server_mod_info_updated',
  'connection_lost',
  'login_accepted',
  'login_rejected',
  'connection_disconnected',
  'connection_failed',
  'server_state',
  'control'
])

require(['instant_sandbox/main'])
