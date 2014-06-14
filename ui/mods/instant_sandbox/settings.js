(function() {
  var loadedSystem = ko.observable({}).extend({ session: 'loaded_system' });
  var instantSandboxSystem = ko.observable({}).extend({ local: 'instant_sandbox_system' })

  if (!$.isEmptyObject(loadedSystem())) {
    instantSandboxSystem(loadedSystem())
    loadedSystem({})
  }

  instantSandboxSystemName = 'Instant Sandbox System'
  if (instantSandboxSystem() && instantSandboxSystem().name) {
    console.log('resetting name')
    instantSandboxSystemName = instantSandboxSystem().name
  }

  var previousLastSceneUrl = ko.observable().extend({ session: 'previous_last_scene_url' });
  console.log(model.lastSceneUrl(), previousLastSceneUrl())

  if (previousLastSceneUrl()) {
    model.lastSceneUrl(previousLastSceneUrl())
    previousLastSceneUrl(null)
  }

  console.log(model.lastSceneUrl(), previousLastSceneUrl())


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

  $('.slider').attr('data-slider-tooltip', 'show')

  _.extend(api.settings.definitions.ui.settings, {
    instant_sandbox_player_economy: {
      title: 'Instant Sandbox - Player Economy',
      type: 'slider',
      options: {
        formater: function(v) {return v.toPrecision(2)},
        tooltip: 'show',
        min: 0,
        max: 5.0,
        step: 0.1
      },
      default: 5.0,
    },
    instant_sandbox_ai_economy: {
      title: 'Instant Sandbox - AI Economy',
      type: 'slider',
      options: {
        min: 0,
        max: 5.0,
        step: 0.1
      },
      default: 0,
    },
    instant_sandbox_ai_armies: {
      title: 'Instant Sandbox - AI Armies',
      type: 'slider',
      options: {
        min: 1,
        max: 9,
        step: 1
      },
      default: 1,
    }
  })

/*
  model.addSetting_Slider(
    'AI Commanders Per Army', 'instant_sandbox_ai_slots', 'UI',
    1, 9, 1,
    'Instant Sandbox')
    */


  $('#sidebar .content').append(
    '<div>' + 
      '<div class="btn_std" id="command" style="margin-left:-6px;" ' +
          'data-bind="click: navToSystemLoad, click_sound: \'default\', rollover_sound: \'default\'">'+
        '<div class="btn_label" style="width: 270px; margin:8px 0px;">'+
          'Set Instant Sandbox System' +
        '</div>'+
        '<label>' + instantSandboxSystemName + '</label>' +
      '</div>'+
    '</div>')
})()
  
