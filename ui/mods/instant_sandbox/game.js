define([], function() {
  "use strict";

  // make the object keys exist for Panel.ready
  panhandler.stub([
    'connection_lost',
    'login_accepted',
    'login_rejected',
    'connection_disconnected',
    'connection_failed',
    'server_state',
    'control'
  ])

  var state = ''
  var callerConfiguration = function() {}
  var textStatus = ko.observable('')

  textStatus.subscribe(function(message) {console.log(message)})

  var reset = function() {
    removeHandlers()
    engine.call('reset_game_state');
    state = ''
    callerConfiguration = function() {}
  }

  var publish = function(config) {
    reset();
    textStatus("publish game...");
    console.log("use region: " + model.uberNetRegion());
    engine.asyncCall("ubernet.startGame", model.uberNetRegion(), 'Config').done(function (data) {
      textStatus("ubernet created game, gonna connect now...");

      data = JSON.parse(data);
      model.lobbyId(data.LobbyID);

      installHandlers(config)
      connectToServer(data);
    }).fail(function (data) {
      textStatus("failed to start ubernet game");
      reset();
    });
  }

  var joinGame = function(lobbyId) {
    textStatus("join ubernet game... ");

    engine.asyncCall("ubernet.joinGame", lobbyId).done(function (data) {
      data = JSON.parse(data);

      if (data.PollWaitTimeMS) {
        console.log('poll', data.PollWaitTimeMS)
        window.setTimeout(function() {
          joinGame(lobbyId);
        }, 5000);
      } else {
        textStatus("ubernet game join successful, will connect now");
        model.lobbyId(lobbyId);
        connectToServer();
      }
    }).fail(function (data) {
      textStatus("failed to join ubernet game");
      reset();
    });
  }

  var connectToServer = function(data) {
    model.isLocalGame(false);
    model.gameTicket(data.Ticket);
    model.gameHostname(data.ServerHostname);
    model.gamePort(data.ServerPort);
    textStatus("connecting to game...");
    engine.call('join_game',
      String(data.ServerHostname),
      Number(data.ServerPort),
      String(model.displayName()),
      String(data.Ticket),
      String(JSON.stringify({ password: undefined })));
  }

  var configure = function(desc) {
    model.send_message('update_game_config', desc, function(success) {
      if (!success) {
        textStatus("setting planets failed");
        reset();
      }
    });
  }

  var resetArmies = function(armies) {
    model.send_message('reset_armies', armies,function(success) {
      if (!success) {
        textStatus("reset armies failed");
        reset();
      }
    })
  }

  var joinSlot = function(slot) {
    model.send_message('join_army', {
      army: slot,
      commander: { ObjectName: model.preferredCommander().ObjectName }
    });
  }

  var startGame = function() {
    textStatus('starting game')
    model.send_message('start_game', undefined, function(success) {
      if (!success) {
        textStatus('start_game failed')
        reset()
      }
    });
  };

  var states = {
    landing: function(msg) {
      removeHandlers()
      window.location.href = msg.url;
    },
    playing: function(msg) { // spectating, still buggy
      removeHandlers()
      window.location.href = msg.url;
    },
    lobby: function(msg) {
      callerConfiguration(msg)
    }
  }

  var installHandlers = function(config) {
    callerConfiguration = config
    Object.keys(gameHandlers).forEach(function(handler) {
      panhandler.on(handler, gameHandlers[handler])
    })
  }

  var removeHandlers = function() {
    Object.keys(gameHandlers).forEach(function(handler) {
      panhandler.off(handler, gameHandlers[handler])
    })
  }

  var gameHandlers = {
    server_state: function(msg) {
      console.log('server_state')
      console.log(msg)
      if (msg.state != state) {
        state = msg.state
        states[msg.state] && states[msg.state](msg)
      }
    },
    control: function(msg) {
      console.log('control')
      console.log(msg)
      if (msg.sim_ready) {
        startGame()
      }
    },
    connection_disconnected: function (payload) {
      var message = loc("!LOC(connect_to_game:connection_to_server_lost.message):CONNECTION TO SERVER LOST")
      textStatus(message)
      console.log(payload)
      reset()
    },
    connection_failed: function (payload) {
      var message = loc("!LOC(connect_to_game:connection_to_server_failed.message):CONNECTION TO SERVER FAILED")
      textStatus(message)
      console.log(payload)
      reset()
    },
    login_accepted: function (payload) {
      var message = loc('!LOC(connect_to_game:login_accepted.message):LOGIN ACCEPTED')
      textStatus(message)
      app.hello(gameHandlers.server_state, gameHandlers.connection_disconnected);
    },
    login_rejected: function (payload) {
      var message = loc("!LOC(connect_to_game:login_to_server_rejected.message):LOGIN TO SERVER REJECTED")
      textStatus(message)
      console.log(payload)
      reset()
    }
  }

  return {
    reset: reset,
    publish: publish,
    joinGame: joinGame,
    connectToServer: connectToServer,
    configure: configure,
    resetArmies: resetArmies,
    joinSlot: joinSlot,
    startGame: startGame,
    textStatus: textStatus
  }
})
