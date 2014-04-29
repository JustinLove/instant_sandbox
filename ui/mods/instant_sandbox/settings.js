(function() {
  var loadedSystem = ko.observable({}).extend({ session: 'loaded_system' });
  var instantSandboxSystem = ko.observable({}).extend({ local: 'instant_sandbox_system' })

  if (!$.isEmptyObject(loadedSystem())) {
    instantSandboxSystem(loadedSystem())
    loadedSystem({})
  }

  console.log(instantSandboxSystem())

  var system_name = 'Instant Sandbox System'
  if (instantSandboxSystem() && instantSandboxSystem().name) {
    system_name = instantSandboxSystem().name
  }

  var previousLastSceneUrl = ko.observable().extend({ session: 'previous_last_scene_url' });
  console.log(model.lastSceneUrl(), previousLastSceneUrl())

  if (previousLastSceneUrl()) {
    model.lastSceneUrl(previousLastSceneUrl())
    previousLastSceneUrl(null)
  }

  console.log(model.lastSceneUrl(), previousLastSceneUrl())


  var navToSystemLoad = function() {
    var nextSceneUrl = ko.observable().extend({ session: 'next_scene_url' });
    var previousLastSceneUrl = ko.observable().extend({ session: 'previous_last_scene_url' });

    previousLastSceneUrl(model.lastSceneUrl())
    model.lastSceneUrl('coui://ui/main/game/settings/settings.html');
    nextSceneUrl('coui://ui/main/game/settings/settings.html');

    localStorage.settings = encode(model.settings())

    window.location.href = 'coui://ui/main/game/load_planet/load_planet.html';
  }

  model.addSetting_Slider(
    'AI Economy x10', 'instant_standbox_ai_economy', 'UI',
    0, 20, 0,
    'Instant Sandbox')

  model.addSetting_Slider(
    'AI Armies', 'instant_standbox_ai_armies', 'UI',
    1, 9, 1,
    'Instant Sandbox')

  model.addSetting_Slider(
    'AI Commanders Per Army', 'instant_standbox_ai_slots', 'UI',
    1, 9, 1,
    'Instant Sandbox')

  model.addSetting_Button(
    'Set System', system_name, 'UI',
    navToSystemLoad,
    'Instant Sandbox')
})()
  
