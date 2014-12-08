define([], function() {
  var Code = 'code'
  var Settings = 'settings'

  return {
    config: Settings,
    //config: Code,
    action: 'START',
    //action: 'LOBBY',
    settings: {
      spectators: 0,
      password : undefined,
      friends : [],
      public: false,
      blocked : [],
      tag: 'Testing',
      game_name: 'Instant Sandbox',
      game_options: {
        game_type: 'FreeForAll', /* FreeForAll, TeamArmies, VersusAI ?, Ladder1v1 */
        listen_to_spectators: true,
        land_anywhere: true,
        dynamic_alliances: false,
        dynamic_alliance_victory: false,
      }
    },
    armies: [
      { "slots" : 1, alliance: false, economy_factor: 5, player: true },
      { "slots" : 1, alliance: false, economy_factor: 0 },
      //{ "slots" : 1, alliance: false },
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
