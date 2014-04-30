define(['text!instant_sandbox/dialog.html'], function(html) {
  "use strict"

  var viewModel = {
    instantSandboxProgress: ko.observable('')
  }

  return {
    open: function(message) {
      var $dialog = $(html)
      ko.applyBindings(viewModel, $dialog[0])
      $('body').append($dialog)

      $dialog.dialog({
        dialogClass: "no-close",
        closeOnEscape : false,
        draggable: false,
        resizable: false,
        height: 240,
        width: 600,
        modal: true,
        buttons: {}
      });
      viewModel.instantSandboxProgress(message || 'Working...')
    },
    progress: viewModel.instantSandboxProgress
  }
})
