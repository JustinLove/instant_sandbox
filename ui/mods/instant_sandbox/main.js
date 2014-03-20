define(['instant_sandbox/start'], function(start) {
  "use strict";

  // async loading appears to allow a timeout event to fire before
  // the game has finished mod loading and done its own binding
  setTimeout(start.ready, 200)
})
