define([], function() {

  "use strict";

  // make the object keys exist for Panel.ready
  panhandler.stub([
    'mount_mod_file_data',
    'server_mod_info_updated',
    'set_cheat_config',
    'connection_lost',
    'login_accepted',
    'login_rejected',
    'connection_disconnected',
    'connection_failed',
    'server_state',
    'control'
  ])

  var state = ''
  var readyAction = function() {}
  var callerConfiguration = function() {}
  var pendingSystem = null
  var textStatus = ko.observable('')
  var simReady = ko.observable(false)
  var clientReady = ko.observable(false)
  var modsReady = ko.observable(true)
  var region = ko.computed(function() {
    if (model['useLocalServer']) {
      return model.useLocalServer() ? 'Local' : (model.uberNetRegion() || "USCentral");
    } else {
      return (model.uberNetRegion() || "USCentral");
    }
  })

  // picked up by live game
  var cheatAllowChangeVision = ko.observable(false).extend({ session: 'cheat_allow_change_vision' });
  var cheatAllowChangeControl = ko.observable(false).extend({ session: 'cheat_allow_change_control' });
  var cheatAllowCreateUnit = ko.observable(false).extend({ session: 'cheat_allow_create_unit' });
  var cheatAllowModDataUpdates = ko.observable(false).extend({ session: 'cheat_allow_mod_data_updates' });

  var setCheatsFromCheatConfig = function(config) {
    console.log("setCheatsFromCheatConfig: " + JSON.stringify(config));
    cheatAllowChangeVision(config.cheat_flags.allow_change_vision);
    cheatAllowChangeControl(config.cheat_flags.allow_change_control);
    cheatAllowCreateUnit(config.cheat_flags.allow_create_unit);
    cheatAllowModDataUpdates(config.cheat_flags.allow_mod_data_updates);
  }

  var reset = function() {
    removeHandlers()
    engine.call('reset_game_state');
    state = ''
    callerConfiguration = function() {}
    simReady(false)
    clientReady(false)
    modsReady(true)
  }

  var testLoading = function() {
    var worldView = api.getWorldView(0);
    if (worldView) {
      worldView.arePlanetsReady().then(function(ready) { 
        clientReady(ready)
        if (!ready) setTimeout(testLoading, 500);
      });
    }
    else {
      setTimeout(testLoading, 500);
    }
  };

  var publish = function(config) {
    reset();
    textStatus("publish game...");
    console.log("use region: " + region());
    api.net.startGame(region(), 'Config').done(function (data) {
      textStatus("created game, gonna connect now...");

      model.lobbyId(data.LobbyID);
      sessionStorage.setItem('lobbyId', encode(model.lobbyId()));

      installHandlers(config)
      connectToServer(data);
    }).fail(function (data) {
      textStatus("failed to start game");
      reset();
      //model.joinGame(model.lobbyId());
    });
  }

  var joinGame = function(lobbyId) {
    textStatus("join game... ");

    api.net.joinGame({lobbyId: lobbyId}).done(function (data) {
      if (data.PollWaitTimeMS) {
        console.log('poll', data.PollWaitTimeMS)
        window.setTimeout(function() {
          joinGame(lobbyId);
        }, 5000);
      } else {
        textStatus("game join successful, will connect now");
        model.lobbyId(lobbyId);
        sessionStorage.setItem('lobbyId', encode(lobbyId));
        connectToServer();
      }
    }).fail(function (data) {
      textStatus("failed to join game");
      reset();
    });
  }

  var connectToServer = function(data) {
    model.isLocalGame(false);
    model.gameTicket(data.Ticket);
    model.gameHostname(data.ServerHostname);
    model.gamePort(data.ServerPort);
    textStatus("connecting to game...");
    return api.net.connect({
      host: model.gameHostname(),
      port: model.gamePort(),
      displayName: model.displayName() || 'Player',
      ticket: model.gameTicket(),
      clientData: {password: undefined, uberid: api.net.uberId()}
    });
  }

  var configure = function(desc) {
    model.send_message('modify_settings', desc, function(success) {
      if (!success) {
        textStatus("modify_settings failed");
        reset();
      }
    });
  }

  var enableServerMods = function() {
    model.send_message('mod_data_available', {}, function (success, response) {
      if (success) {
        console.log("Server mods requested: " + JSON.stringify(response));
        api.mods.sendModFileDataToServer(response.auth_token);
        modsReady(false)
      }
    });
  }

  var setSystem = function(system) {
    pendingSystem = null
    model.send_message('modify_system', system, function(success) {
      if (!success) {
        textStatus("modify_system failed");
        reset();
      }
    });
  }

  var delayedSetSystem = function(system) {
    pendingSystem = system
  }

  var resetArmies = function(armies) {
    model.send_message('reset_armies', armies,function(success) {
      if (!success) {
        textStatus("reset armies failed");
        reset();
      }
    })
  }

  var joinSlot = function(slot, army, playerId) {
    model.send_message('join_army', {
      army: slot,
      commander: { ObjectName: model.preferredCommander() && model.preferredCommander().ObjectName }
    });
    model.send_message('set_econ_factor', {
        id: playerId,
        economy_factor: army.economy_factor
    });
  }

  var addAI = function(slot, army, aiId) {
    model.send_message('add_ai', {
        army_index: slot,
        slot_index: 0,
        options: { 'ai': true }
    });
    model.send_message('set_econ_factor', {
        id: aiId.toString(),
        economy_factor: army.economy_factor
    });
  }

  var checkReady = function() {
    if (modsReady() && pendingSystem) setSystem(pendingSystem)

    if (!simReady() || !clientReady() || !modsReady()) return

    readyAction()
  }

  var navToLobby = function() {
    model.joinGame(model.lobbyId());
  }

  var startGame = function() {
    textStatus('Starting Game')
    model.send_message('start_game', undefined, function(success, errorMessage) {
      if (!success) {
        textStatus('start_game failed: ' + errorMessage)
        model.joinGame(model.lobbyId());
      }
    });
  };

  simReady.subscribe(checkReady)
  clientReady.subscribe(checkReady)
  modsReady.subscribe(checkReady)

  var states = {
    landing: function(msg) {
      removeHandlers()
      window.location.href = msg.url;
    },
    playing: function(msg) { // spectating
      removeHandlers()
      window.location.href = msg.url;
    },
    lobby: function(msg) {
      readyAction = callerConfiguration(msg)
      testLoading()
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
      simReady(msg.sim_ready)
    },
    mount_mod_file_data: function (payload) {
      console.log("Mounting mod file data: " + JSON.stringify(payload));
      api.mods.mountModFileData();
    },
    server_mod_info_updated: function (payload) {
      console.log('server_mod_info_updated', payload)
      modsReady(true)
    },
    set_cheat_config: function (payload) {
      setCheatsFromCheatConfig(payload);
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
    enableServerMods: enableServerMods,
    setSystem: delayedSetSystem,
    resetArmies: resetArmies,
    joinSlot: joinSlot,
    addAI: addAI,
    checkReady: checkReady,
    navToLobby: navToLobby,
    startGame: startGame,
    simReady: simReady,
    clientReady: clientReady,
    textStatus: textStatus,
    region: region
  }
})
