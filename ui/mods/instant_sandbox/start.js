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

    configurePlayers(msg)

    configureSystem(msg).then(function() {
      dialog.progress("Generating Planets")
      done().then(navToSandbox)
    })
  }

  var configureSystem = function(msg) {
    dialog.progress("Loading System")

    var ready = $.Deferred()

    console.log(config.system, config.system.name)
    system.loadSystem(config.system.name).then(function(loaded) {
      console.log('system spec loaded')
      setSystem(loaded)
      ready.resolve()
    }).fail(function() {
      console.log('system spec not found, using saved copy')
      setSystem(config.system)
      ready.resolve()
    })

    return ready.promise()
  }

  var setSystem = function(sys) {
    pastats.setSystem(sys)
    system.convertClientToServer(sys)
    game.setSystem(sys)
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
