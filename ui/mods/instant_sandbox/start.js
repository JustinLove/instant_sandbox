define([
  'instant_sandbox/system',
  'instant_sandbox/game',
  'instant_sandbox/config',
  'instant_sandbox/dialog',
  'instant_sandbox/pastats',
  'text!instant_sandbox/button.html'
], function(system, game, config, dialog, pastats, html) {
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

  // gave up on race condition
  model.startInstantSandbox = viewModel.startInstantSandbox

  var gameConfiguration = function(msg) {
    dialog.progress("lobby: configure planets...");

    pastats.setLobby(model.lobbyId())

    game.configure(config.settings)

    pastats.setSystem(config.system)
    system.convertClientToServer(config.system)
    game.setSystem(config.system)

    pastats.setArmies(config.armies)
    game.resetArmies(config.armies)

    dialog.progress("lobby: join slot...");
    if (config.armies[0].ai == false) {
      game.joinSlot(0);
      pastats.setPlayer(0, msg.data.players[0])
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
