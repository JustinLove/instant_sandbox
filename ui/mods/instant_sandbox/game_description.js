define(['instant_sandbox/planet'], function(planet) {
  "use strict";

  var template = {
    "armies" : [],
    "blocked" : [],
    "enable_lan" : false,
    "public": false,
    "friends" : [],
    "password" : undefined,
    "spectators" : 0,
    "system" : null,
    "type" : '0',
  }

  return {
    teamTypes: ['FreeForAll', 'TeamArmies', 'Alliance', 'VersusAI'],
    convertClientToServer: function(desc) {
      desc.system.planets.forEach(planet.convertClientToServer)
    },
    convertServerToClient: function(desc) {
      desc.system.planets.forEach(planet.convertServerToClient)
    },
    createGame: function(config) {
      var desc = Object.create(template)
      desc.type = config.type
      desc.system = config.system
      desc.spectators = config.spectators
      return desc
    }
  }
})
