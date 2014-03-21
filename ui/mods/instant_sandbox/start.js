define([
  'instant_sandbox/game_description',
  'instant_sandbox/game',
  'instant_sandbox/defaults',
  'instant_sandbox/dialog',
  'text!instant_sandbox/button.html'
], function(description, game, defaults, dialog, html) {
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
      dialog.open('Making Sandbox')
      game.publish(gameConfiguration)
    }
  }

  var gameConfiguration = function(msg) {
    dialog.progress("lobby: configure planets...");
    var desc = description.createGame(defaults)
    description.convertClientToServer(desc)
    game.configure(desc)
    game.resetArmies(defaults.armies)

    dialog.progress("lobby: join slot...");
    if (defaults.armies[0].ai == false) {
      game.joinSlot(0);
    }

    dialog.progress("Generating Planets")
  }

  dialog.progress.subscribe(function(message) {console.log(message)})

  return {
    ready: function() {
      if (hasPAStats()) return

      var $button = $(html)
      $('#navigation_items').append($button)
      ko.applyBindings(viewModel, $button[0])
      dialog.ready()
      game.textStatus.subscribe(dialog.progress)
    }
  }
})
