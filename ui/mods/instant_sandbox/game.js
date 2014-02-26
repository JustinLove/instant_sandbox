define([], function() {
  "use strict";

  var reset = function() {
    engine.call('reset_game_state');
  }

  var publish = function() {
    console.log("publish game...");
    console.log("use region: " + model.uberNetRegion());
    engine.asyncCall("ubernet.startGame", model.uberNetRegion(), 'Config').done(function (data) {
      console.log("ubernet created game, gonna connect now...");

      data = JSON.parse(data);
      lobbyIdObs(data.LobbyID);

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
        lobbyIdObs(lobbyId);
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
      String(JSON.stringify({ password: '' })));
  }

  var configure = function(desc) {
    model.send_message('game_config', desc, function(success) {
      if (!success) {
        console.log("setting planets failed");
        reset();
      }
    });
  }

  var updateEconomyModifiers = function(armies) {
    model.send_message('update_economy_modifiers', {armies: armies});
  }

  var joinSlot = function(slot) {
    var acu = '/pa/units/commanders/quad_base/quad_base.json'; // TODO make this cool and dynamic
    model.send_message("join_army", {army: slot, commander: acu})
  }

  var toggleReady = function() {
    model.send_message('toggle_ready', undefined, function(success) {
      console.log("Ready: waiting for other players...");
    });
  };

  return {
    reset: reset,
    publish: publish,
    joinGame: joinGame,
    connectToServer: connectToServer,
    configure: configure,
    updateEconomyModifiers: updateEconomyModifiers,
    joinSlot: joinSlot,
    toggleReady: toggleReady,
  }
})
