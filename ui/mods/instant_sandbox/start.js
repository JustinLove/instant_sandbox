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
        game.publish().then(configureGame)
      } else {
        selectRegion(viewModel.startInstantSandbox)
      }
    }
  }

  var configureGame = function(msg, done) {
    dialog.progress("Configure Settings");

    pastats.setLobby(model.lobbyId())

    // mods may enable system types
    game.enableServerMods()

    game.configure(config.settings)

    configureSystem(msg)

    configurePlayers(msg)

    dialog.progress("Generating Planets")

    done().then(navToSandbox)
  }

  var configureSystem = function(msg) {
    dialog.progress("Configure Planets")

    pastats.setSystem(config.system)
    system.convertClientToServer(config.system)
    game.setSystem(config.system)
  }

  var configurePlayers = function(msg) {
    dialog.progress("Configure Armies");
    //making assumptions about how AI ids are assigned
    var aiIdOffset = 0
    if (!config.armies[0].player) {
      model.send_message('leave_army');
      aiIdOffset = 1
    }

    pastats.setArmies(config.armies)
    game.resetArmies(config.armies)

    dialog.progress("Configure Players");
    config.armies.forEach(function(army, army_index) {
      if (army.player) {
        game.joinSlot(army_index, army, msg.data.players[0].id);
        pastats.setPlayer(army_index, msg.data.players[0])
      } else {
        game.addAI(army_index, army, army_index + aiIdOffset);
      }
    })
  }

  var navToSandbox = function() {
    if (config.action == 'LOBBY') {
      game.navToLobby()
    } else {
      game.startGame()
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
