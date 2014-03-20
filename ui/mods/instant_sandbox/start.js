define([
  'instant_sandbox/game_description',
  'instant_sandbox/game',
  'instant_sandbox/defaults',
  'text!instant_sandbox/button.html'
], function(description, game, defaults, html) {
  "use strict";

  var hasPAStats = function() {
    for (var i in scene_mod_list.start) {
      if (scene_mod_list.start[i].match('pastats/scenes/ranked_matcher')) {
        return true
      }
    }
    return false
  }

  var viewModel = {
    allowNewOrJoinGame: model.allowNewOrJoinGame,
    startInstantSandbox: function() {
      game.publish(gameConfiguration)
    }
  }

  var gameConfiguration = function(msg) {
    console.log("lobby: configure planets...");
    var desc = description.createGame(defaults)
    description.convertClientToServer(desc)
    game.configure(desc)
    game.resetArmies(defaults.armies)

    console.log("lobby: join slot...");
    if (defaults.armies[0].ai == false) {
      game.joinSlot(0);
    }
  }

  return {
    ready: function() {
      if (hasPAStats()) return

      var $button = $(html)
      $('#navigation_items').append($button)
      ko.applyBindings(viewModel, $button[0])
    }
  }
})
