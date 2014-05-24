define(['instant_sandbox/defaults'], function(defaults) {
  if (defaults.config == 'code') {
    return defaults
  }

  initialSettingValue('instant_sandbox_ai_armies', 1)
  initialSettingValue('instant_sandbox_ai_slots', 1)
  initialSettingValue('instant_sandbox_ai_economy', 0)
  var settings = decode(localStorage.settings)

  var config = {
    settings: defaults.settings,
    armies: [{ "slots" : 1, player: true, alliance: false}],
    system: decode(localStorage.instant_sandbox_system) || defaults.system
  }

  for (var i = 0; i < settings.instant_sandbox_ai_armies; i++) {
    config.armies.push({
      slots: settings.instant_sandbox_ai_slots,
      alliance: false,
      economy_factor: settings.instant_sandbox_ai_economy / 10.0
    })
  }

  return config
})
