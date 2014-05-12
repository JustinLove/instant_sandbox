define(['instant_sandbox/defaults'], function(defaults) {
  if (defaults.config == 'code') {
    return defaults
  }

  initialSettingValue('instant_standbox_ai_armies', 1)
  initialSettingValue('instant_standbox_ai_slots', 1)
  initialSettingValue('instant_standbox_ai_economy', 0)
  var settings = decode(localStorage.settings)

  var config = {
    settings: defaults.settings,
    armies: [{ "slots" : 1, ai: false, alliance: false}],
    system: decode(localStorage.instant_sandbox_system) || defaults.system
  }

  for (var i = 0; i < settings.instant_standbox_ai_armies; i++) {
    config.armies.push({
      slots: settings.instant_standbox_ai_slots,
      ai: true,
      alliance: false,
      economy_factor: settings.instant_standbox_ai_economy / 10.0
    })
  }

  return config
})
