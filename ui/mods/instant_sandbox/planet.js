define([], function() {
  return {
    convertClientToServer: function(planet) {
      if (planet.hasOwnProperty('position_x'))
      {
        planet.position = [planet.position_x, planet.position_y];
        delete planet.position_x;
        delete planet.position_y;
      }
      if (planet.hasOwnProperty('velocity_x'))
      {
        planet.velocity = [planet.velocity_x, planet.velocity_y];
        delete planet.velocity_x;
        delete planet.velocity_y;
      }
      if (planet.hasOwnProperty('planet'))
      {
        planet.generator = planet.planet;
        delete planet.planet;
      }
    },
    convertServerToClient: function (planet) {
      if (planet.hasOwnProperty('position'))
      {
        planet.position_x = planet.position[0];
        planet.position_y = planet.position[1];
        delete planet.position;
      }
      if (planet.hasOwnProperty('velocity'))
      {
        planet.velocity_x = planet.velocity[0];
        planet.velocity_y = planet.velocity[1];
        delete planet.velocity;
      }
      if (planet.hasOwnProperty('generator'))
      {
        planet.planet = planet.generator;
        delete planet.generator;
      }
    }
  }
})
