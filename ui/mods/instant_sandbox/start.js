define([
  'text!instant_sandbox/button.html'
], function(html) {
  "use strict";

  var viewModel = {
    allowNewOrJoinGame: model.allowNewOrJoinGame,
    startInstantSandbox: function() {
      console.log(model)
    }
  }

  return {
    ready: function() {
      var $button = $(html)
      $('#A3').parents('tr').before($button)
      ko.applyBindings(viewModel, $button[0])
    }
  }
})
