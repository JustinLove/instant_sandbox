define([
  'text!instant_sandbox/instant_sandbox.html'
], function(html) {
  "use strict";

  return {
    ready: function() {
      var container = $(html)
      container.appendTo('body')
      ko.applyBindings(model, container)
    }
  }
})
