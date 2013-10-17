'use strict';

angular.module('ChatFrontendApp')
  .controller('ChatCtrl', function ($scope, $route, Chatservice) {
    var self = this;
    // Received the resolved value of the promise defined in the route
    var resolved = $route.current.locals.register;
    if(resolved.success) {
      // window.alert('You are now connected to the server with id ' + resolved.id);
      Chatservice.listUsers().then(function(data) {
        self.users = data;
      });
    } else {
      // window.alert('Unable to connect to server');
      // TODO: Redirect
    }

    // Use scope to gain access to the clicked user
    // Alternatively we could use $index to find out which user was clicked on
    // this.activate = function(i) {
    //   console.log(this, i); // this will be the controller
    //   Chatservice.activate(this.user);
    // }
    $scope.activate = function() {
      console.log(this); // this will be the scope
      Chatservice.activate(this.user);
      self.messages = Chatservice.messages;
    }

    this.send = function() {

      Chatservice.sendMessage(self.msg);
      this.msg = '';
    };
  });
