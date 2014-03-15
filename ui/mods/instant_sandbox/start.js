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
    }
  }

  var states = {
    landing: function(msg) {
      window.location.href = msg.url;
    },
    playing: function(msg) { // spectating, still buggy
      window.location.href = msg.url;
    },
    lobby: function(msg) {
      console.log("lobby: configure planets...");
      var desc = description.createGame(defaults)
      description.convertClientToServer(desc)
      game.configure(desc)
      game.resetArmies(defaults.armies)

      console.log("lobby: join slot...");
      if (defaults.armies[0].ai == false) {
        game.joinSlot(0);
      }
    },
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
    console.log('server_state')
    console.log(msg)
    if (msg.state != state) {
      state = msg.state
      states[msg.state] && states[msg.state](msg)
    }
  }

  handlers.control = function(msg) {
    console.log('control')
    console.log(msg)
    if (msg.sim_ready) {
      game.startGame()
    }
  }

  return {
    ready: function() {
      var $button = $(html)
      $('#navigation_items').append($button)
      ko.applyBindings(viewModel, $button[0])
    }
  }
})
