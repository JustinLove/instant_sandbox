(function() {
  var loadedSystem = ko.observable({}).extend({ session: 'loaded_system' });
  var instantSandboxSystem = ko.observable({}).extend({ local: 'instant_sandbox_system' })

  if (!$.isEmptyObject(loadedSystem())) {
    instantSandboxSystem(loadedSystem())
    loadedSystem({})
  }

  model.instantSandboxSystemName = ko.observable('Instant Sandbox System')
  if (instantSandboxSystem() && instantSandboxSystem().name) {
    //console.log('resetting name')
    model.instantSandboxSystemName(instantSandboxSystem().name)
  }

  var previousLastSceneUrl = ko.observable().extend({ session: 'previous_last_scene_url' });
  //console.log(model.lastSceneUrl(), previousLastSceneUrl())

  if (previousLastSceneUrl()) {
    model.lastSceneUrl(previousLastSceneUrl())
    previousLastSceneUrl(null)
  }

  //console.log(model.lastSceneUrl(), previousLastSceneUrl())


  model.navToSystemLoad = function() {
    api.settings.save().then(function() {
      var nextSceneUrl = ko.observable().extend({ session: 'next_scene_url' });
      var previousLastSceneUrl = ko.observable().extend({ session: 'previous_last_scene_url' });

      previousLastSceneUrl(model.lastSceneUrl())
      model.lastSceneUrl('coui://ui/main/game/settings/settings.html');
      nextSceneUrl('coui://ui/main/game/settings/settings.html');

      window.location.href = 'coui://ui/main/game/load_planet/load_planet.html';
    })

  }

  model.resetInstantSandboxSystem = function() {
    var config = require.s.contexts._.config
    config.waitSeconds = 0
    config.paths.instant_sandbox = 'coui://ui/mods/instant_sandbox'
    config.paths.text = config.paths.text || 'coui://ui/mods/instant_sandbox/text'
    require(['instant_sandbox/defaults'], function(defaults) {
      console.log(defaults)
      instantSandboxSystem(defaults.system)
      model.instantSandboxSystemName(defaults.system.name)
    })

  }

  var instant_sandbox_settings = {
    instant_sandbox_play: {
      title: 'Play',
      type: 'select',
      options: ['PLAY', 'SPECTATE'],
      default: 'PLAY',
    },
    instant_sandbox_action: {
      title: 'Action',
      type: 'select',
      options: ['START', 'LOBBY'],
      default: 'START',
    },
    instant_sandbox_landing: {
      title: 'Landing',
      type: 'select',
      options: ['ANYWHERE', 'ZONE'],
      default: 'ANYWHERE',
    },
    instant_sandbox_player_economy: {
      title: 'Player Economy',
      type: 'slider',
      options: {
        min: 0,
        max: 5.0,
        step: 0.1
      },
      default: 1.0,
    },
    instant_sandbox_ai_economy: {
      title: 'AI Economy',
      type: 'slider',
      options: {
        min: 0,
        max: 5.0,
        step: 0.1
      },
      default: 1.0,
    },
    instant_sandbox_ai_personality: {
      title: 'AI Personality',
      type: 'select',
      options: ['Idle', 'Normal', 'Hard', 'Relentless', 'Absurd'],
      default: 'Idle',
    },
    instant_sandbox_armies: {
      title: 'Armies',
      type: 'slider',
      options: {
        min: 2,
        max: 10,
        step: 1
      },
      default: 1,
    },
    instant_sandbox_ai_slots: {
      title: 'AI Commanders Per Army',
      type: 'slider',
      options: {
        min: 1,
        max: 9,
        step: 1
      },
      default: 1,
    }
  }

  _.extend(api.settings.definitions.ui.settings, instant_sandbox_settings)

  // force model.settingsLists to update
  model.settingDefinitions(api.settings.definitions)

  $('<div class="sub-group-title">Instant Sandbox</div>').appendTo('.option-list.ui .form-group')
  var $group = $('<div class="sub-group top"></div>').appendTo('.option-list.ui .form-group')

  var $template = $('script#setting-template')
  $group.append($template[0].outerHTML.replace('setting-template', 'instant-sandbox-setting-template').replace('hide', 'show'))

  Object.keys(instant_sandbox_settings).forEach(function(setting) {
    $group.append('<div class="option" data-bind="template: { name: \'instant-sandbox-setting-template\', data: $root.settingsItemMap()[\'ui.' + setting + '\'] }"></div>')
  })

  $group.append(
    '<div class="option">' +
      '<div class="btn_std" id="instant_sandbox_system"' +
          'data-bind="click: navToSystemLoad, click_sound: \'default\', rollover_sound: \'default\'">'+
        '<div class="btn_label" style="">'+
          'Set System' +
        '</div>'+
      '</div>' +
      '<div class="btn_std" id="instant_sandbox_default_system"' +
          'data-bind="click: resetInstantSandboxSystem, click_sound: \'default\', rollover_sound: \'default\'">'+
        '<div class="btn_label" style="">'+
          'X' +
        '</div>'+
      '</div>' +
      '<div data-bind="text: instantSandboxSystemName"></div>' +
    '</div>')
})()
  
