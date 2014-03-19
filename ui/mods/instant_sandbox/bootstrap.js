require.config({
  baseUrl: "coui://ui/mods",
  paths: {
    text: 'instant_sandbox/text',
  }
})

// make the object keys exist for Panel.ready
panhandler.stub([
  'connection_lost',
  'login_accepted',
  'login_rejected',
  'connection_disconnected',
  'server_state',
  'control'
])

require(['instant_sandbox/main'])
