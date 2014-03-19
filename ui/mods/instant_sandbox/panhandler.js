(function() {
  var hooked = {}
  var actions = {}

  var stub = function(names) {
    names.forEach(hook)
  }

  var hook = function(event) {
    if (hooked[event]) return

    actions[event] = []
    hooked[event] = true
    var prior = handlers[event]
    handlers[event] = function() {
      //console.log('panhandler', event, arguments)
      for (var i in actions[event]) {
        actions[event][i].apply(window, arguments)
      }
      if (prior) prior.apply(window, arguments)
    }
  }

  var on = function(event, f) {
    if (!hooked[event]) hook(event)

    actions[event].push(f)
  }

  var off = function(event, f) {
    if (!actions[event]) return

    var i = actions[event].indexOf(f)
    if (i >= 0) {
      actions[event].splice(i, 1)
    }
  }

  window.panhandler = {
    stub: stub,
    hook: hook,
    on: on,
    off: off
  }
})()
