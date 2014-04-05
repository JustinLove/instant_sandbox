define([
  'instant_sandbox/system',
  'instant_sandbox/game',
  'instant_sandbox/config',
  'instant_sandbox/dialog',
  'text!instant_sandbox/button.html'
], function(system, game, config, dialog, html) {
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

    game.configure(config.settings)

    system.convertClientToServer(config.system)
    game.setSystem(config.system)

    game.resetArmies(config.armies)

    dialog.progress("lobby: join slot...");
    if (config.armies[0].ai == false) {
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
