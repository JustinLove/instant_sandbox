define(['instant_sandbox/defaults'], function(defaults) {
  if (defaults.config == 'code') {
    return defaults
  }

  var play = api.settings.isSet('ui', 'instant_sandbox_play', true) || 'PLAY'
  var armies = api.settings.isSet('ui', 'instant_sandbox_armies', true) || 2
  var playerEconomy = api.settings.isSet('ui', 'instant_sandbox_player_economy', true) || 5.0
  var aiEconomy = api.settings.isSet('ui', 'instant_sandbox_ai_economy', true) || 0.0

  var config = {
    settings: defaults.settings,
    armies: [],
    system: decode(localStorage.instant_sandbox_system) || defaults.system
  }

  var players = 1
  if (play == 'SPECTATE') {
    players = 0
  }

  for (var i = 0; i < players; i++) {
    config.armies.push({
      slots : 1,
      player: true,
      alliance: false,
      economy_factor: playerEconomy
    })
  }

  for (var i = players; i < armies; i++) {
    config.armies.push({
      slots: 1, //settings.instant_sandbox_ai_slots,
      alliance: false,
      economy_factor: aiEconomy
    })
  }

  return config
})
