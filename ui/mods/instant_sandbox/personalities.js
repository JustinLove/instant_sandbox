define(['coui://ui/main/game/new_game/js/ai.js'], function() {
  var personalities = ai_types()
  for (var name in personalities) {
    personalities[name].name = name
  }
  return personalities
})
