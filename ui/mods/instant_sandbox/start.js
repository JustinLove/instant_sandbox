define([
  'instant_sandbox/game_description',
  'instant_sandbox/game',
  'instant_sandbox/defaults',
  'text!instant_sandbox/button.html'
], function(description, game, defaults, html) {
  "use strict";

  var viewModel = {
    allowNewOrJoinGame: model.allowNewOrJoinGame,
    startInstantSandbox: function() {
      game.publish()

      app.hello(handlers.server_state, handlers.connection_disconnected);
    }
  }

  var states = {
    landing: function(msg) {
      window.location.href = msg.url;
    },
    lobby: function(msg) {
      console.log("lobby: join slot...");
      game.joinSlot(0);

      api.getWorldView(0).whenPlanetsReady().done(function() {
        game.toggleReady()
      });
    },
    config: function(msg) {
      console.log("config: configure planets...");
      var desc = description.createGame(defaults)
      description.convertClientToServer(desc)
      game.configure(desc)
      game.updateEconomyModifiers(defaults.economyModifiers)
    }
  }

  handlers.connection_failed = function (payload) {
    var message = loc("!LOC(connect_to_game:connection_to_server_failed.message):CONNECTION TO SERVER FAILED")
    console.log(payload, message)
    game.reset()
  };

  handlers.login_accepted = function (payload) {
    var message = loc('!LOC(connect_to_game:login_accepted.message):LOGIN ACCEPTED')
    console.log(message)
    app.hello(handlers.server_state, handlers.connection_disconnected);
  };

  handlers.login_rejected = function (payload) {
    var message = loc("!LOC(connect_to_game:login_to_server_rejected.message):LOGIN TO SERVER REJECTED")
    console.log(payload, message)
    game.reset()
  };

  handlers.connection_disconnected = function (payload) {
    var message = loc("!LOC(connect_to_game:connection_to_server_lost.message):CONNECTION TO SERVER LOST")
    console.log(payload, message)
    game.reset()
  };

  var state = ''
  handlers.server_state = function(msg) {
    if (msg.state != state) {
      state = msg.state
      states[msg.state] && states[msg.state](msg)
    }
  }

  return {
    ready: function() {
      var $button = $(html)
      $('#A3').parents('tr').before($button)
      ko.applyBindings(viewModel, $button[0])
    }
  }
})
