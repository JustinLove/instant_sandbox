define([
  'instant_sandbox/system',
  'instant_sandbox/game',
  'instant_sandbox/config',
  'instant_sandbox/dialog',
  'instant_sandbox/pastats',
  'text!instant_sandbox/button.html'
], function(system, game, config, dialog, pastats, html) {
  "use strict";

  var instantSandboxReady = ko.observable(false)

  var originalFinishRegionSetup = model.finishRegionSetup
  var regionSetupContinuation = originalFinishRegionSetup
  model.finishRegionSetup = function() {
    model.uberNetRegion(model.selectedUberNetRegion());

    if (!model.uberNetRegion())
        return; /* do nothing */

    var cont = regionSetupContinuation
    regionSetupContinuation = originalFinishRegionSetup
    model.inRegionSetup(false)
    cont()
  }

  var selectRegion = function(continuation) {
    regionSetupContinuation = continuation
    model.inRegionSetup(true)
    $("#regionDlg").dialog('open');
  }

  var viewModel = {
    instantSandboxEnabled: ko.computed(function() {
      return model.allowNewOrJoinGame() && instantSandboxReady()
    }),
    startInstantSandbox: function() {
      if (!viewModel.instantSandboxEnabled()) return

      if ((model['useLocalServer'] && model.useLocalServer()) || (model.uberNetRegion() && model.isUberNetRegionAvailable())) {
        dialog.open('Making Sandbox')
        game.publish(gameConfiguration)
      } else {
        selectRegion(viewModel.startInstantSandbox)
      }
    }
  }

  var gameConfiguration = function(msg) {
    dialog.progress("lobby: configure planets...");

    pastats.setLobby(model.lobbyId())

    game.configure(config.settings)

    //making assumptions about how AI ids are assigned
    var aiIdOffset = 0
    if (!config.armies[0].player) {
      model.send_message('leave_army');
      aiIdOffset = 1
    }

    pastats.setSystem(config.system)
    system.convertClientToServer(config.system)
    game.setSystem(config.system)

    pastats.setArmies(config.armies)
    game.resetArmies(config.armies)

    dialog.progress("lobby: configuring players...");
    config.armies.forEach(function(army, army_index) {
      if (army.player) {
        game.joinSlot(army_index, army, msg.data.players[0].id);
        pastats.setPlayer(army_index, msg.data.players[0])
      } else {
        game.addAI(army_index, army, army_index + aiIdOffset);
      }
    })

    game.enableServerMods()

    dialog.progress("Generating Planets")

    if (config.action == 'LOBBY') {
      return game.navToLobby
    } else {
      return game.startGame
    }
  }

  dialog.progress.subscribe(function(message) {console.log(message)})

  return {
    ready: function() {
      var $button = $(html)
      $('#navigation_items').append($button)
      ko.applyBindings(viewModel, $button[0])
      game.textStatus.subscribe(dialog.progress)
      setTimeout(function() {instantSandboxReady(true)}, 1000)
    }
  }
})
