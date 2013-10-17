'use strict';

angular.module('ChatFrontendApp')
  .controller('ChatCtrl', function ($scope, $route, Chatservice) {
    // Received the resolved value of the promise defined in the route
    var resolved = $route.current.locals.register;
    if(resolved.success) {
      window.alert('You are now connected to the server with id ' + resolved.id);
      Chatservice.listUsers().then(function(data) {
        console.log(data);
      });
    } else {
      window.alert('Unable to connect to server');
      // TODO: Redirect
    }
  });
