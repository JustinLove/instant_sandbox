define(['instant_sandbox/planet'], function(planet) {
  "use strict";

  var template = {
    "armies" : [],
    "blocked" : [],
    "enable_lan" : false,
    "friends" : [],
    "password" : '',
    "spectators" : 0,
    "system" : null,
    "type" : 0
  }

  return {
    teamTypes: ['FreeForAll', 'TeamArmies', 'Alliance', 'VersusAI']
    convertClientToServer: function(desc) {
      desc.system.planets.forEach(planet.convertClientToServer)
    },
    convertServerToClient: function(desc) {
      desc.system.planets.forEach(planet.convertServerToClient)
    },
    createGame: function(config) {
      var desc = Object.clone(template)
      desc.armies = config.armies
      desc.type = config.type
      desc.system = config.system
      return desc
    }
  }
})
