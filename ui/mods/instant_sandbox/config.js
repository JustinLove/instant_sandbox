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

  var myprimarycolour
  var mysecondarycolour
  var myaltprimarycolour
  var myaltsecondarycolour
  if (window.dFavouriteColour_colourtable) {
    if(!_.isUndefined(api.settings.isSet('ui','dFavouriteColour_primary', true)) && api.settings.value('ui','dFavouriteColour_primary') in dFavouriteColour_colourtable)
      myprimarycolour = dFavouriteColour_colourtable[api.settings.value('ui','dFavouriteColour_primary')];
    if(!_.isUndefined(api.settings.isSet('ui','dFavouriteColour_secondary', true)) && api.settings.value('ui','dFavouriteColour_secondary') in dFavouriteColour_colourtable)
      mysecondarycolour = dFavouriteColour_colourtable[api.settings.value('ui','dFavouriteColour_secondary')];
    if(!_.isUndefined(api.settings.isSet('ui','dFavouriteColour_primary_alternative', true)) && api.settings.value('ui','dFavouriteColour_primary_alternative') in dFavouriteColour_colourtable)
      myaltprimarycolour = dFavouriteColour_colourtable[api.settings.value('ui','dFavouriteColour_primary_alternative')];
    if(!_.isUndefined(api.settings.isSet('ui','dFavouriteColour_secondary_alternative', true)) && api.settings.value('ui','dFavouriteColour_secondary_alternative') in dFavouriteColour_colourtable)
      myaltsecondarycolour = dFavouriteColour_colourtable[api.settings.value('ui','dFavouriteColour_secondary_alternative')];
  }

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
      economy_factor: playerEconomy,
      primary_color: myprimarycolour && myprimarycolour.primary_index,
      secondary_color: mysecondarycolour && mysecondarycolour.primary_index,
    })
  }

  for (var i = players; i < armies; i++) {
    config.armies.push({
      slots: ai_slots,
      alliance: false,
      economy_factor: aiEconomy,
      personality: aiPersonality,
      primary_color: i == players && myaltprimarycolour && myaltprimarycolour.primary_index,
      secondary_color: i == players && myaltsecondarycolour && myaltsecondarycolour.primary_index,
    })
  }

  return config
})
