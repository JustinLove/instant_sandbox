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
      "name": "Small Moon",
      "planets": [
        {
          "name": "Small Moon",
          "mass": 2500,
          "position_x": 20135.1,
          "position_y": -24.0562,
          "velocity_x": 0.188263,
          "velocity_y": 157.582,
          "planet": {
             "seed": 7846,
             "radius": 720,
             "heightRange": 77,
             "waterHeight": 40,
             "temperature": 100,
             "metalDensity": 50,
             "metalClusters": 50,
             "biomeScale": 23,
             "biome": "lava"
          }
        }
      ]
    }
  }
})
