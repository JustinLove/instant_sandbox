define(['instant_sandbox/planet'], function(planet) {
  "use strict";

  var template = {
    "blocked" : [],
    "public": false,
    "friends" : [],
    "password" : undefined,
    "spectators" : 0,
    "type" : '0',
  }

  return {
    teamTypes: ['FreeForAll', 'TeamArmies', 'Alliance', 'VersusAI'],
    convertClientToServer: function(system) {
      system.planets.forEach(planet.convertClientToServer)
    },
    convertServerToClient: function(system) {
      system.planets.forEach(planet.convertServerToClient)
    },
    createGame: function(config) {
      var desc = Object.create(template)
      desc.type = config.type
      desc.spectators = config.spectators
      return desc
    }
  }
})
