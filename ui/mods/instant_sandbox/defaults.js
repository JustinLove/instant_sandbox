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
          "position_x": 53567.4,
          "position_y": 8786.55,
          "velocity_x": -15.5348,
          "velocity_y": 94.7081,
          "planet": {
             "seed": 78462,
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
