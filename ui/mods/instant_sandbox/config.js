define([
  'instant_sandbox/defaults',
  'instant_sandbox/personalities'
], function(defaults, personalities) {
  if (defaults.config == 'code') {
    return defaults
  }

  var play = api.settings.isSet('ui', 'instant_sandbox_play', true) || 'PLAY'
  var action = api.settings.isSet('ui', 'instant_sandbox_action', true) || 'START'
  var landing = api.settings.isSet('ui', 'instant_sandbox_landing', true) || 'ANYWHERE'
  var armies = api.settings.isSet('ui', 'instant_sandbox_armies', true) || 2
  var ai_slots = api.settings.isSet('ui', 'instant_sandbox_ai_slots', true) || 1
  var playerEconomy = api.settings.isSet('ui', 'instant_sandbox_player_economy', true) || 5.0
  var aiEconomy = api.settings.isSet('ui', 'instant_sandbox_ai_economy', true) || 0.0
  var aiPersonalityName = api.settings.isSet('ui', 'instant_sandbox_ai_personality', true)
  var aiPersonality = personalities[aiPersonalityName] || personalities.Normal

  var config = {
    action: action,
    settings: defaults.settings,
    armies: [],
    system: decode(localStorage.instant_sandbox_system) || defaults.system
  }

  config.settings.game_options.land_anywhere = (landing == 'ANYWHERE')

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
      slots: ai_slots,
      alliance: false,
      economy_factor: aiEconomy,
      personality: aiPersonality
    })
  }

  return config
})
