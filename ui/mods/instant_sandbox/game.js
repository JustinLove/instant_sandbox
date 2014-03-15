define([], function() {
  "use strict";

  var reset = function() {
    engine.call('reset_game_state');
  }

  var publish = function() {
    reset();
    console.log("publish game...");
    console.log("use region: " + model.uberNetRegion());
    engine.asyncCall("ubernet.startGame", model.uberNetRegion(), 'Config').done(function (data) {
      console.log("ubernet created game, gonna connect now...");

      data = JSON.parse(data);
      model.lobbyId(data.LobbyID);

      connectToServer(data);
    }).fail(function (data) {
      console.log("failed to start ubernet game");
      reset();
    });
  }

  var joinGame = function(lobbyId) {
    console.log("join ubernet game... ");

    engine.asyncCall("ubernet.joinGame", lobbyId).done(function (data) {
      data = JSON.parse(data);

      if (data.PollWaitTimeMS) {
        console.log('poll', data.PollWaitTimeMS)
        window.setTimeout(function() {
          joinGame(lobbyId);
        }, 5000);
      } else {
        console.log("ubernet game join successful, will connect now");
        model.lobbyId(lobbyId);
        connectToServer();
      }
    }).fail(function (data) {
      console.log("failed to join ubernet game");
      reset();
    });
  }

  var connectToServer = function(data) {
    model.isLocalGame(false);
    model.gameTicket(data.Ticket);
    model.gameHostname(data.ServerHostname);
    model.gamePort(data.ServerPort);
    console.log("connecting to game...");
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
        console.log("setting planets failed");
        reset();
      }
    });
  }

  var resetArmies = function(armies) {
    model.send_message('reset_armies', armies,function(success) {
      if (!success) {
        console.log("reset armies failed");
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
    console.log('starting game')
    model.send_message('start_game', undefined, function(success) {
      if (!success) {
        console.log('start_game failed')
        reset()
      }
    });
  };

  return {
    reset: reset,
    publish: publish,
    joinGame: joinGame,
    connectToServer: connectToServer,
    configure: configure,
    resetArmies: resetArmies,
    joinSlot: joinSlot,
    startGame: startGame,
  }
})
