define(['text!instant_sandbox/dialog.html'], function(html) {
  var viewModel = {
    instantSandboxProgress: ko.observable('')
  }

  return {
    ready: function() {
      $dialog = $(html)
      ko.applyBindings(viewModel, $dialog[0])
      $('body').append($dialog)
    },
    open: function(message) {
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
