'use strict';

angular.module('ChatFrontendApp')
  .controller('ChatCtrl', function ($scope, $route) {
    this.title = $route.current.someParameter;
    // Received the resolved value of the promise defined in the route
    var resolved = $route.current.locals.socket;
    if(resolved.success) {
      window.alert('You are now connected to the server with id ' + resolved.id);
    } else {
      window.alert('Unable to connect to server');
    }
  });
