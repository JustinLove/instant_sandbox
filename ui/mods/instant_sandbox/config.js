define(['instant_sandbox/defaults'], function(defaults) {
  if (defaults.config == 'code') {
    return defaults
  }

  var aiArmies = api.settings.isSet('ui', 'instant_sandbox_ai_armies', true) || 1
  var playerEconomy = api.settings.isSet('ui', 'instant_sandbox_player_economy', true) || 5.0
  var aiEconomy = api.settings.isSet('ui', 'instant_sandbox_ai_economy', true) || 0.0

  var config = {
    settings: defaults.settings,
    armies: [{
      "slots" : 1,
      player: true,
      alliance: false,
      economy_factor: playerEconomy
    }],
    system: decode(localStorage.instant_sandbox_system) || defaults.system
  }

  for (var i = 0; i < aiArmies; i++) {
    config.armies.push({
      slots: 1, //settings.instant_sandbox_ai_slots,
      alliance: false,
      economy_factor: aiEconomy
    })
  }

  return config
})
