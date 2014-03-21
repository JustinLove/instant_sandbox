define(['instant_sandbox/planet'], function(planet) {
  "use strict";

  return {
    convertClientToServer: function(system) {
      system.planets.forEach(planet.convertClientToServer)
    },
    convertServerToClient: function(system) {
      system.planets.forEach(planet.convertServerToClient)
    }
  }
})
