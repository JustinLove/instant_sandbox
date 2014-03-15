require.config({
  baseUrl: "coui://ui/mods",
  paths: {
    text: 'instant_sandbox/text',
  }
})

// make the object keys exist for Panel.ready
var instant_sandbox_stub = function() {}
_.defaults(handlers, {
  connection_lost: instant_sandbox_stub,
  login_accepted: instant_sandbox_stub,
  login_rejected: instant_sandbox_stub,
  connection_disconnected: instant_sandbox_stub,
  server_state: instant_sandbox_stub,
  control: instant_sandbox_stub
})

require(['instant_sandbox/main'])
