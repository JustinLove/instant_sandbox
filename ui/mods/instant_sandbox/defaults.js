define([], function() {
  var FreeForAll = 0
  var TeamArmies = 1
  var Alliance = 2
  var VersusAi = 3

  return {
    type: VersusAi,
    armies: [
      { "slots" : [ "player" ] },
      { "slots" : [ "ai" ] }
    ],
    economyModifiers: [
      {
        starting_metal_override: 2000.0, // ignored
        starting_energy_override: 2000.0, // ignored
        economy_rate_override: 1.0,
      },
      {
        starting_metal_override: 2000.0, // ignored
        starting_energy_override: 2000.0, // ignored
        economy_rate_override: 0.0,
      },
    ],
    system: {
      "name": "Just a Small Moon",
      "planets": [
        {
          "name": "Small Moon",
          "mass": 10000,
          "position_x": 20135.1,
          "position_y": -24.0562,
          "velocity_x": 0.188263,
          "velocity_y": 157.582,
          "planet": {
             "seed": 784462,
             "radius": 400,
             "heightRange": 75,
             "waterHeight": 0,
             "temperature": 0,
             "metalDensity": 50,
             "metalClusters": 50,
             "biomeScale": 50,
             "biome": "moon"
          }
        }
      ]
    }
  }
})
