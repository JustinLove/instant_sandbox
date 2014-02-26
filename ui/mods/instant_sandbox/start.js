define([
  'game_description',
  'game',
  'defaults',
  'text!instant_sandbox/button.html'
], function(description, game, defaults, html) {
  "use strict";

  var viewModel = {
    allowNewOrJoinGame: model.allowNewOrJoinGame,
    startInstantSandbox: function() {
      console.log(model, desc)
      game.publish()
    }
  }

  var states = {
    landing: function(msg) {
      window.location.href = msg.url;
    },
    lobby: function(msg) {
      console.log("join slot...");
      joinSlot(0);

      api.getWorldView(0).whenPlanetsReady().done(function() {
        game.toggleReady()
      });
    },
    config: function(msg) {
      console.log("configure planets...");
      var desc = description.createGame(defaults)
      description.convertClientToServer(desc)
      game.configure(desc)
      game.updateEconomyModifiers(defaults.economyModifiers)
    }
  }

  handlers.server_state = function(msg) {
    console.log('server state', msg)
    states[msg.state] && states[msg.state](msg)
  }

  return {
    ready: function() {
      var $button = $(html)
      $('#A3').parents('tr').before($button)
      ko.applyBindings(viewModel, $button[0])
    }
  }
})
