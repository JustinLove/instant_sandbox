define([], function() {
  var FreeForAll = '0'
  var TeamArmies = '1'
  var Alliance = '2'
  var VersusAi = '3'

  var Code = 'code'
  var Settings = 'settings'

  return {
    config: Settings,
    //config: Code,
    settings: {
      type: FreeForAll,
      spectators: 0,
      blocked : [],
      public: false,
      friends : [],
      password : undefined,
    },
    armies: [
      { "slots" : 1, ai: false, alliance: false /* not working ,economy_factor: 1 */ },
      { "slots" : 1, ai: true, alliance: false, economy_factor: -1 },
      //{ "slots" : 1, ai: true, alliance: false, economy_factor: -1 },
    ],
    system: {
      "name": "Instant Sandbox System",
      "planets": [
        {
          "name": "Small Moon",
          "mass": 10000,
          "position_x": 53567.4,
          "position_y": 8786.55,
          "velocity_x": -15.5348,
          "velocity_y": 94.7081,
          "required_thrust_to_move": 0,
          "starting_planet": true,
          "planet": {
             "seed": 78462,
             "radius": 400,
             "heightRange": 75,
             "waterHeight": 0,
             "temperature": 0,
             "metalDensity": 50,
             "metalClusters": 50,
             "biomeScale": 50,
             "biome": "sandbox"
          }
        }
      ]
    }
  }
})
